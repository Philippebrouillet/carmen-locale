<script lang="ts">
  import { goto } from "$app/navigation";

  import { PUBLIC_CARDEN_API, PUBLIC_STRIPE_KEY } from "$env/static/public";
  import { Button } from "$lib/components/ui/button";

  import * as Drawer from "$lib/components/ui/drawer";

  import { clock } from "$lib/stores/clock.svelte";
  import CloseIcon from "$lib/assets/icons/CloseIcon.svelte";

  import FormInput from "$lib/components/FormInput.svelte";
  import PhoneInput from "$lib/components/PhoneInput.svelte";
  import { displayPriceInDollars } from "$lib/formater";
  import { shopStore } from "$lib/stores/basketStore";

  import * as m from "$lib/paraglide/messages.js";
  import type { CountryCode, E164Number } from "svelte-tel-input/types";
  import { nextAvailableTime } from "$src/services/QueueLine";
  import { location } from "$src/lib/stores/location.store";

  import {
    loadStripe,
    type Stripe,
    type StripeCardElement,
    type PaymentMethod,
  } from "@stripe/stripe-js";

  import { onDestroy, onMount } from "svelte";
  import type { PaymentMethod as LocationPaymentMethod } from "$src/types/Location";
  import { buildUrl } from "$src/services/buildNavigationUrl";
  import { languageTag } from "$src/lib/paraglide/runtime";

  enum PaymentStatus {
    Succeeded = "succeeded",
    RequiresPaymentMethod = "requiresPaymentMethod",
    RequiresConfirmation = "requiresConfirmation",
    RequiresAction = "requiresAction",
    Processing = "processing",
    Canceled = "canceled",
  }

  export let paymentMethod: LocationPaymentMethod;
  export let finalPriceToPay: number;
  export let isCreatingTicket: boolean = false;

  const handlePaymentTextErrorByPaymentStatus = (status: Exclude<PaymentStatus, "succeded">) => {
    switch (status) {
      case "requiresPaymentMethod":
        return {
          title: m.paymentRequiresPaymentMethodTitle(),
          description: m.paymentRequiresPaymentMethodDescription(),
        };
      case "requiresAction":
        return {
          title: m.paymentRequiresActionTitle(),
          description: m.paymentRequiresActionDescription(),
        };
      case "canceled":
        return { title: m.paymentCanceledTitle(), description: m.paymentCanceledDescription() };
      default:
        return { title: m.paymentDefaultTitle(), description: m.paymentDefaultDescription() };
    }
  };

  let card: StripeCardElement;
  let disableButton = true;
  let isCardElementCompleted = false;
  let checkoutPaymentMethod: PaymentMethod | undefined = undefined;
  let stripe: Stripe | null = null;
  let now = new Date($clock);
  let eventSource: EventSource | null = null;
  $: now = new Date($clock);
  let workerId = $shopStore.selectedProfessional?.id;
  let servicesId = $shopStore.selectedService?.id;
  let rdv = $shopStore.bookingType == "appointment" ? true : false;
  let delay = $shopStore.bookingDelay;
  let checkoutPaymentAvailable = false;
  let cardError = "";
  let errorPaymentStatus: Exclude<PaymentStatus, "succeeded"> | undefined;

  $: paymentErrorTexts = errorPaymentStatus
    ? handlePaymentTextErrorByPaymentStatus(errorPaymentStatus)
    : null;
  // let services = $location.services.filter((s) => servicesId.includes(s.id.toString()));
  let worker = $location.workers.find((w) => w.id.toString() === workerId?.toString());
  let workerTickets =
    worker?.tickets?.filter((t) => t.doneTime == null && t.canceledTime == null) || [];
  // let firstStart = rdv != null ? new Date(+rdv) : new Date(now.getTime() + +(delay ?? "0") * 60000);
  // keep this as first info and let a new one be computed after
  // let firstInfo = nextAvailableTime(workerTickets, now, firstStart);
  // let firstIsFree = firstInfo.isFirstSlot && !(rdv != null && firstInfo.createHole);
  let userExist: boolean | null = null;

  let formData: { name: string; phone: E164Number | null; email: string } = {
    name: "",
    phone: "",
    email: "",
  };
  let phoneValid = true;
  let selectedCountry: CountryCode = "FR";
  let errorMessage = "";

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // let cardenFeeAccept = false;

  async function createPaymentIntent(ticketId: number) {
    const response = await fetch(`${PUBLIC_CARDEN_API}/api/v4/stripe/test/payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticketId: Number(ticketId),
        clientChoice:
          $location.config.payment_mode === "CLIENT_CHOICE"
            ? paymentMethod === "credit-card"
              ? "ONLINE_FULL"
              : "ONSITE_FULL"
            : undefined,
      }),
    });

    return await response.json();
  }

  const handlePaymentStatus = (status: PaymentStatus | undefined, successUrl: string) => {
    if (status !== undefined) {
      switch (status) {
        case PaymentStatus.Succeeded: {
          goto(successUrl);
          break;
        }
        default: {
          isCreatingTicket = false;
          errorPaymentStatus = status;
          break;
        }
      }
    }
  };

  const connectEventSourceToPaymentIntent = async (paymentIntentId: string, slug: string) => {
    if (eventSource != null) {
      eventSource.close();
      eventSource = null;
    }
    const successUrl = buildUrl(`ticket/${slug}`);

    eventSource = new EventSource(
      `${PUBLIC_CARDEN_API}/api/v3/stripe/payment-status?payment_intent_id=${paymentIntentId}`,
    );

    eventSource.onopen = async () => {
      const res = await pay(paymentIntentId);
      handlePaymentStatus(res?.status, successUrl);
    };
    eventSource.onmessage = async (e) => {
      const parsedData = JSON.parse(e.data);
      console.log("Received SSE message:", parsedData);
      handlePaymentStatus(parsedData?.status, successUrl);
    };
    eventSource.onerror = (err) => {
      console.error(`[!] sse error ${err}`);
    };
  };

  async function pay(paymentIntentId: string): Promise<{ status: PaymentStatus } | undefined> {
    if (!stripe || !paymentIntentId) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    let _paymentMethod = checkoutPaymentMethod;

    if (!_paymentMethod) {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: card,
      });

      if (error) errorMessage = error.message || "Payment method creation failed";

      _paymentMethod = paymentMethod;
    }

    if (_paymentMethod) {
      const response = await fetch(`${PUBLIC_CARDEN_API}/api/v4/stripe/test/pay`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntentId,
          paymentMethodId: _paymentMethod.id,
          locationId: $location.location.id,
        }),
      });

      return await response.json();
    }
  }

  async function handleSubmit() {
    if ($location.location.id == null) {
      console.error("location id not defined");
      return;
    }

    if (!formData.name || formData.name.trim() === "") {
      errorMessage = "Name is required";
      return;
    }

    if (!formData.phone || !phoneValid) {
      errorMessage = "Phone is required and must be valid";
      return;
    }

    if (!formData.email || !isValidEmail(formData.email)) {
      errorMessage = "Email is required and must be valid";
      return;
    }

    if (formData.email == null) {
      errorMessage = "Email is required";
      return;
    }

    if (servicesId == null) {
      errorMessage = "Services ID is required";
      return;
    }

    isCreatingTicket = true;

    try {
      const resp = await fetch(`${PUBLIC_CARDEN_API}/api/v2/ticket`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          locationId: $location.location.id,
          queueId: workerId,
          services: [servicesId],
          expectedTime: $shopStore.bookingDate?.toISOString() || info.next.toISOString(),
          eticket: true,
          ticketOrigin: "WEB",
        }),
      });

      if (resp.ok) {
        const body = await resp.json();

        if (paymentMethod === "credit-card" && stripe) {
          const clientSecret = await createPaymentIntent(body.payload.id);

          if (clientSecret.error) {
            errorMessage = "Failed to create payment intent. " + clientSecret.error;
            isCreatingTicket = false;
            return;
          }
          connectEventSourceToPaymentIntent(clientSecret.id, body.payload.slug);
          return;
        }

        const slug = body.payload.slug;
        const url = buildUrl(`ticket/${slug}`);
        goto(url);
      }
      isCreatingTicket = false;
    } catch (err) {
      isCreatingTicket = false;
    }
  }

  onMount(async () => {
    if (paymentMethod === "credit-card") {
      const stripeKey = PUBLIC_STRIPE_KEY;
      if (stripeKey) {
        stripe = await loadStripe(stripeKey, {
          locale: languageTag().split("-")[0] as any,
          stripeAccount: $location.location.connectAccount || undefined,
        });

        if (!stripe) {
          console.error("Stripe failed to load");
          return;
        }

        const elements = stripe.elements();

        card = elements.create("card", {
          style: {
            base: {
              color: "#32325d",
              fontFamily: "Inter, sans-serif",
              fontSmoothing: "antialiased",
              fontSize: "16px",
              "::placeholder": {
                color: "#32325d",
              },
            },
            invalid: {
              fontFamily: "Inter, sans-serif",
              color: "#fa755a",
              iconColor: "#fa755a",
            },
          },
          hidePostalCode: true,
          classes: {
            base: "w-full h-11 px-3 py-3 rounded-lg bg-white border border-gray-200 transition duration-200 ease-in-out",
            focus: "outline-none ring-2 ring-accent ring-opacity-50",
          },
        });
        // Stripe injects an iframe into the DOM

        card.on("change", function (event) {
          // Disable the Pay button if there are no card details in the Element
          isCardElementCompleted = event.complete && !event.error ? true : false;
          cardError = event.error ? event.error.message : "";
        });

        card.mount("#card-element");

        card.on("focus", () => {
          const el = document.getElementById("card-element");
          if (!el) return;

          setTimeout(() => {
            el.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 300);
        });

        // 2️⃣ créer PaymentRequest pour Apple Pay
        const paymentRequest = stripe.paymentRequest({
          country: "FR",
          currency: "eur",
          total: { label: "Total", amount: finalPriceToPay },
          requestPayerName: true,
          requestPayerEmail: true,
        });
        if (!paymentRequest) {
          console.error("Payment Request creation failed");
          return;
        }
        const canPay = await paymentRequest.canMakePayment();

        if (!canPay || (!canPay.applePay && !canPay.googlePay)) return;
        checkoutPaymentAvailable = true;

        const prButton = elements.create("paymentRequestButton", { paymentRequest });

        paymentRequest.on("paymentmethod", (detail) => {
          checkoutPaymentMethod = detail.paymentMethod;
          if (checkoutPaymentMethod) {
            detail.complete("success");
            handleSubmit();
          } else {
            detail.complete("fail");
          }
        });
        prButton.mount("#apple-pay-button");
      }
    }
  });

  // $: carden = $page.url.searchParams.get("carden") == "true" ?? false;
  // $: locationPayUrl = setParam($page.url, 'carden', false.toString());
  // $: cardenPayUrl = setParam($page.url, 'carden', true.toString());
  $: {
    if (userExist == null && formData.phone != null && formData.phone.length == 10) {
      // checkClient(phone).catch((err) => { console.error(err); userExist = false; });
    }
  }
  $: start = rdv != null ? new Date(+rdv) : new Date(now.getTime() + +(delay ?? "0") * 60000);
  $: info = nextAvailableTime(workerTickets, now, start);
  // $: isFree = info.isFirstSlot && !(rdv != null && info.createHole);
  // $: finalPrice = $shopStore.selectedService?.discountedPrice
  //   ? $shopStore.selectedService.discountedPrice + ($shopStore.cardenFee || 0)
  //   : ($shopStore.selectedService?.price || 0) + ($shopStore.cardenFee || 0);

  const setDisableButton = () => {
    if (paymentMethod === "credit-card") {
      disableButton = isCardElementCompleted && isValidForm ? false : true;
    } else {
      disableButton = isValidForm ? false : true;
    }
  };
  $: isValidForm = formData.name.trim() !== "" && phoneValid && isValidEmail(formData.email);
  $: isCardElementCompleted, isValidForm, setDisableButton();

  onDestroy(() => {
    if (stripe && card) {
      card.destroy();
    }
    if (eventSource != null) {
      eventSource.close();
      eventSource = null;
    }
  });
</script>

<div
  class="flex flex-col p-4 pt-4 lg:p-8 gap-6 w-full overflow-y-scroll min-h-screen h-full md:h-[80vh] pb-[400px]"
>
  {#if paymentErrorTexts}
    <div class="bg-[#DFE5E7] bg-opacity-30 rounded-xl text-[#A03203] p-4 w-full">
      <h2 class="uppercase font-bold">{paymentErrorTexts?.title}.</h2>
      <p>{paymentErrorTexts?.description}</p>
    </div>
  {/if}

  <div class="flex flex-row justify-between">
    <h1 class="font-bold text-2xl">{m.confirmBooking()}</h1>

    <Drawer.Close>
      <CloseIcon />
    </Drawer.Close>
  </div>

  <form class="flex flex-col gap-6 h-fit md:h-fit py-6" on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col gap-3 w-full">
      <div class=" w-full">
        <FormInput
          label={m.firstName()}
          placeholder="John"
          id="first-name"
          bind:value={formData.name}
        />
      </div>
      <div class=" flex flex-col gap-1">
        <label for="phone" class="text-xs text-gray-400 font-bold uppercase">{m.phone()}</label>

        <PhoneInput
          bind:value={formData.phone}
          bind:valid={phoneValid}
          bind:selectedCountry
          options={{ format: "national" }}
        />
      </div>

      <FormInput
        label={m.email()}
        placeholder="example@mail.com"
        id="email"
        type="email"
        bind:value={formData.email}
      />
    </div>

    <div class="flex justify-center items-center py-2">
      <p class="text-xs text-primary text-center max-w-[80%]">
        {m.basketOnClick()},<br />
        {m.youAccept()}
        <a class="text-[#0073FF]" href="https://www.carden.app/cgu-cgv">{m.termsAndConditions()}</a>
        {m.andThe()}
        <a class="text-[#0073FF]" href="https://www.carden.app/privacy-carden"
          >{m.privacyPolicy()}</a
        >.
      </p>
    </div>

    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <p class="font-bold text-lg">{m.total()}</p>
        <!-- <p class="text-xs opacity-60 -z-10">{m.priceIncludingVAT()}</p> -->
      </div>

      <p class="font-bold text-lg whitespace-nowrap">
        {displayPriceInDollars(finalPriceToPay)}
      </p>
    </div>

    {#if cardError}
      <p id="card-error" role="alert" class=" font-bold text-red-500 text-center text-sm">
        {cardError}
      </p>
    {/if}

    {#if errorMessage}
      <p class="text-red-500 text-sm">{errorMessage}</p>
    {/if}

    {#if paymentMethod === "credit-card"}
      <div class="flex flex-col gap-3 mb-3">
        <div id="apple-pay-button"></div>
        {#if checkoutPaymentAvailable}
          <p class="text-center text-[#616163]">{m.orPayWithCard()}</p>
        {/if}
        <div id="card-element"></div>
      </div>
    {/if}

    {#if isCreatingTicket}
      <div class="flex items-center justify-center h-full">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    {:else}
      <Button disabled={disableButton} type="submit" class="rounded-lg min-h-12 disabled:opacity-50"
        >{isCreatingTicket ? "..." : m.makeReservation()}</Button
      >
    {/if}
  </form>
</div>

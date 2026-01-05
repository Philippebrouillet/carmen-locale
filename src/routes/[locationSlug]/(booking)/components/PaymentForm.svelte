<script lang="ts">
  import { goto } from "$app/navigation";

  import { PUBLIC_CARDEN_API, PUBLIC_STRIPE_KEY } from "$env/static/public";
  import { Button } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
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

  import { CardCvc, CardExpiry, CardNumber, Elements } from "svelte-stripe";

  import { loadStripe, type Stripe, type StripeElementBase } from "@stripe/stripe-js";

  import { onMount } from "svelte";

  export let paymentMethod: "credit-card" | "in-store";
  export let finalPriceToPay: number;

  let cardElement: StripeElementBase | undefined = undefined;
  let stripe: Stripe | null = null;
  let now = new Date($clock);
  let workerId = $shopStore.selectedProfessional?.id;
  let servicesId = $shopStore.selectedService?.id;
  let rdv = $shopStore.bookingType == "appointment" ? true : false;
  let delay = $shopStore.bookingDelay;
  // let services = $location.services.filter((s) => servicesId.includes(s.id.toString()));
  let worker = $location.workers.find((w) => w.id.toString() === workerId?.toString());
  let workerTickets =
    worker?.tickets?.filter((t) => t.doneTime == null && t.canceledTime == null) || [];
  // let firstStart = rdv != null ? new Date(+rdv) : new Date(now.getTime() + +(delay ?? "0") * 60000);
  // keep this as first info and let a new one be computed after
  // let firstInfo = nextAvailableTime(workerTickets, now, firstStart);
  // let firstIsFree = firstInfo.isFirstSlot && !(rdv != null && firstInfo.createHole);
  let userExist: boolean | null = null;
  let userName: string;
  let phone: E164Number | null = "";
  let email: string;
  let phoneValid = true;
  let selectedCountry: CountryCode = "FR";
  let isCreatingTicket = false;

  // let cardenFeeAccept = false;

  async function createPaymentIntent(ticketId: number) {
    const response = await fetch(`${PUBLIC_CARDEN_API}/api/v3/stripe/test/payment-intent`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ticketId }),
    });

    return await response.json();
  }

  async function pay() {
    if (!stripe || !cardElement) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    if (!cardElement) {
      console.error("Card element not found.");
      return;
    }

    // const paymentRequest: PaymentRequestOptions = {
    //   country: "US",
    //   currency: "usd",
    //   total: { label: "Demo total", amount: 1099 },
    //   requestPayerName: true,
    //   requestPayerEmail: true,
    // };
    // const clientSecret = await createPaymentIntent();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: userName,
          email: email,
          phone: phone,
        },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.error(result.error.message);
      return false;
    } else {
      // The payment has been processed!
      if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        // Show a success message to your customer
        console.log("Payment succeeded!");
        return true;
      }
    }
  }

  async function handleSubmit() {
    if ($location.location.id == null) {
      console.error("location id not defined");
      return;
    }

    if (workerId == null) {
      console.error("worker id not defined");
      return;
    }

    if (userName == null) {
      console.error("userName not defined");
      return;
    }

    if (phone == null) {
      console.error("phone not defined");
      return;
    }

    if (servicesId == null) {
      console.error("servicesId not defined");
      return;
    }

    // if (info.next.toISOString() == null) {
    //   console.error("undefined expected time");
    //   return;
    // }

    isCreatingTicket = true;
    try {
      const resp = await fetch(`${PUBLIC_CARDEN_API}/api/v2/ticket`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationId: $location.location.id,
          queueId: workerId,
          name: userName,
          phone: phone,
          services: [servicesId],
          expected_time: info.next.toISOString(),
          eticket: true,
        }),
      });
      isCreatingTicket = false;

      if (resp.ok) {
        const body = await resp.json();

        if (paymentMethod === "credit-card" && stripe) {
          const clientSecret = await createPaymentIntent(body.payload.id);

          // await confirmCardPayment(clientSecret)
          // const isPaid = await pay();
          // if (!isPaid) {
          //   return;
          // }
        }

        const slug = body.payload.slug;
        await goto(`/ticket/${slug}`);
      }
    } catch (err) {
      isCreatingTicket = false;
    }
  }

  onMount(async () => {
    if (paymentMethod === "credit-card") {
      const stripeKey = PUBLIC_STRIPE_KEY;
      if (stripeKey) {
        stripe = await loadStripe(stripeKey);
      }
    }
  });

  // $: carden = $page.url.searchParams.get("carden") == "true" ?? false;
  // $: locationPayUrl = setParam($page.url, 'carden', false.toString());
  // $: cardenPayUrl = setParam($page.url, 'carden', true.toString());
  $: {
    if (userExist == null && phone != null && phone.length == 10) {
      // checkClient(phone).catch((err) => { console.error(err); userExist = false; });
    }
  }
  $: start = rdv != null ? new Date(+rdv) : new Date(now.getTime() + +(delay ?? "0") * 60000);
  $: info = nextAvailableTime(workerTickets, now, start);
  // $: isFree = info.isFirstSlot && !(rdv != null && info.createHole);
  // $: finalPrice = $shopStore.selectedService?.discountedPrice
  //   ? $shopStore.selectedService.discountedPrice + ($shopStore.cardenFee || 0)
  //   : ($shopStore.selectedService?.price || 0) + ($shopStore.cardenFee || 0);
</script>

<div
  class="flex flex-col p-4 pt-4 lg:p-8 gap-6 w-full overflow-y-auto max-h-screen md:h-[80vh] bg-[#F8FAFD]"
>
  <div class="flex flex-row justify-between">
    <!-- <h1 class="font-bold text-2xl">{m.confirmBooking()}</h1> -->
    <h1 class="font-bold text-2xl">Confirmer votre réservation</h1>
    <Drawer.Close>
      <CloseIcon />
    </Drawer.Close>
  </div>

  <form class="flex flex-col gap-6 h-fit md:h-fit py-6" on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col gap-3 w-full">
      <div class=" w-full">
        <FormInput label={""} placeholder="John" id="first-name" bind:value={userName} />
      </div>
      <div class=" flex flex-col gap-1">
        <label for="phone" class="text-xs text-gray-400 font-bold uppercase">{m.phone()}</label>
        <PhoneInput
          bind:value={phone}
          bind:valid={phoneValid}
          bind:selectedCountry
          options={{ format: "national" }}
        />
      </div>

      <FormInput label={m.email()} placeholder="example@mail.com" id="email" bind:value={email} />
    </div>
    {#if stripe}
      <Elements {stripe}>
        {#if paymentMethod === "credit-card"}
          <div class=" bg-white py-3 px-2 rounded-lg">
            <CardNumber bind:element={cardElement} />
          </div>
          <div class=" bg-white py-3 px-2 rounded-lg"><CardExpiry /></div>

          <div class=" bg-white py-3 px-2 rounded-lg"><CardCvc /></div>
        {/if}
      </Elements>
    {/if}

    <!-- <div class="flex space-x-2">
      <Checkbox
        id="carden-fee"
        bind:checked={cardenFeeAccept}
        aria-labelledby="carden-fee"
        required
      />
      <label
        id="carden-fee"
        for="terms"
        class="text-xs font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {#if paymentMethod == "credit-card"}
          {m.termsCard({ value: "€1.50" })}
        {:else}
          {m.termsOnSite({ value: "€1.50", name: $location.location.name })}
        {/if}
      </label>
    </div> -->

    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <p class="font-bold text-lg">{m.total()}</p>
        <p class="text-xs opacity-60 -z-10">{m.priceIncludingVAT()}</p>
      </div>

      <p class="font-bold text-lg whitespace-nowrap">
        {displayPriceInDollars(finalPriceToPay)}
      </p>
    </div>

    <Button type="submit" class="rounded-lg min-h-12"
      >{isCreatingTicket ? "..." : m.makeReservation()}</Button
    >
  </form>
</div>

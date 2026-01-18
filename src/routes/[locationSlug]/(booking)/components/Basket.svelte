<script lang="ts">
  import { PUBLIC_STRIPE_KEY } from "$env/static/public";
  import { Button } from "$lib/components/ui/button";
  import { displayPriceInDollars } from "$lib/formater";
  import { loadStripe, type Stripe } from "@stripe/stripe-js";
  import { onMount } from "svelte";
  // import type { CountryCode } from "svelte-tel-input/types";
  import * as Drawer from "$lib/components/ui/drawer";
  import BookingServiceBox from "./BookingServiceBox.svelte";

  import { languageTag } from "$lib/paraglide/runtime";
  import lottie from "lottie-web";
  import * as m from "$lib/paraglide/messages.js";

  import { shopStore } from "$lib/stores/basketStore";
  import { location } from "$src/lib/stores/location.store";
  import BookingHeader from "./BookingHeader.svelte";
  import type { LocationPaymentMode, LocationTheme, PaymentMethod } from "$src/types/Location";
  import {
    Clock3,
    Dock,
    InfoIcon,
    ShieldCheck,
    StoreIcon,
    Tag,
    TrendingUp,
    Wallet,
  } from "lucide-svelte";

  import type { PopupType } from "$src/types/PopupInfos";
  import Popup from "$src/lib/components/popup/Popup.svelte";
  import PaymentForm from "./PaymentForm.svelte";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  let paymentMode: LocationPaymentMode = $location.config.payment_mode;
  let isCreatingTicket = false;

  $: minimumServiceFeeInCents = $location.config.minimum_service_fee; // 90 // 0.90
  $: accomptePrice =
    $location.config.upfront_fee_mode === "CONSTANT"
      ? $location.config.upfront_fee_eur
      : (priceWithDiscountPrice * $location.config.upfront_fee_percent) / 100;

  $: cardenFee =
    $location.config.service_fee_mode === "CONSTANT"
      ? $location.config.service_fee_eur
      : (priceWithDiscountPrice * $location.config.service_fee_percent) / 100;

  const iconColorByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "text-primary",
    PINK: "text-pink",
    CARDEN: "text-blue",
  };

  const backgroundByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "bg-[#F8FAFD]",
    PINK: "bg-[#FFF5FA]",
    CARDEN: "bg-[#F8FAFD]",
  };

  const backgroundColorFeeByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "bg-[#DFE5E7]",
    PINK: "bg-[#E5CEF7]",
    CARDEN: "bg-[#C7E0FF]",
  };

  let isPaymentPopupOpen = false;
  let stripe: Stripe | null = null;
  let popupTypeOpen: PopupType | null = null;
  let paymentMethod: PaymentMethod = ["ONLINE_FULL", "ONLINE_UPFRONT_FEE"].includes(paymentMode)
    ? "credit-card"
    : "in-store";

  const openPopupInfo = (type: PopupType) => {
    popupTypeOpen = type;
  };

  onMount(async () => {
    if (!$shopStore.bookingDate) goto("/" + $location.location.id);

    const stripeKey = PUBLIC_STRIPE_KEY;
    if (stripeKey) {
      stripe = await loadStripe(stripeKey);
    }
  });

  $: bookingTime = $shopStore.bookingDate;

  $: selectedProfessional = $shopStore.selectedProfessional;
  $: selectedService = $shopStore.selectedService;
  $: theme = $location.location.theme;
  $: iconColor = iconColorByTheme[theme];
  $: isOnlinePayment =
    (paymentMode === "CLIENT_CHOICE" && paymentMethod === "credit-card") ||
    paymentMode === "ONLINE_FULL" ||
    paymentMode === "ONLINE_UPFRONT_FEE";
  $: priceWithDiscountPrice = selectedService?.discountedPrice
    ? selectedService.discountedPrice
    : selectedService?.price || 0;
  $: isDefaultFees = cardenFee < minimumServiceFeeInCents;
  $: finalCardenFees = isDefaultFees ? minimumServiceFeeInCents : cardenFee;
  $: isSuperiorDiscounted = (selectedService?.discountedPrice || 0) > selectedService?.price;
  $: feesWithAccompte = finalCardenFees + accomptePrice;
  $: totalToPayInPlace = displayPriceInDollars(
    priceWithDiscountPrice + finalCardenFees - feesWithAccompte,
  );
  $: haveModifiedPrice = selectedService?.discountedPrice;
  $: haveToPayFees =
    paymentMode === "ONLINE_UPFRONT_FEE" || paymentMode === "ONLINE_FULL" ? true : false;

  const calculateFinalPrice = () => {
    if (isOnlinePayment) {
      if (paymentMode === "ONLINE_UPFRONT_FEE") return feesWithAccompte;
      else {
        if (paymentMode === "ONLINE_FULL") return priceWithDiscountPrice + finalCardenFees;
        else return priceWithDiscountPrice;
      }
    } else {
      return priceWithDiscountPrice;
    }
  };

  let finalPriceToPay = 0;
  $: paymentMode,
    isOnlinePayment,
    priceWithDiscountPrice,
    (finalPriceToPay = calculateFinalPrice());

  const setLottieLoader = () => {
    if (browser) {
      const container = document.getElementById("loader");
      if (container) {
        if (isCreatingTicket && !container.hasChildNodes()) {
          setTimeout(() => {
            const drawer = document.querySelector('[data-vaul-drawer-visible="true"]');
            drawer?.classList.add("hidden");
            lottie.loadAnimation({
              container: container,
              renderer: "svg",
              loop: true,
              autoplay: true,
              path: "$lib/assets/json/loader.json",
            });
          });
        } else if (!isCreatingTicket && container.hasChildNodes()) {
          const drawer = document.querySelector('[data-vaul-drawer-visible="false"]');
          drawer?.classList.remove("hidden");
          lottie.destroy("loader");
        }
      }
    }
  };

  $: isCreatingTicket, setLottieLoader();
</script>

<div
  class="bg-black fixed inset-0 z-[99999999999999999999999] flex justify-center items-center {isCreatingTicket
    ? 'block'
    : 'hidden'}"
>
  <div id="loader" class="h-[200px]"></div>
</div>

{#if selectedService && selectedProfessional}
  <div class="flex">
    <div
      class="relative {backgroundByTheme[
        theme
      ]} flex flex-col border lg:w-1/2 w-full overflow-y-auto h-screen pb-[200px]"
    >
      <div class="px-6 md:px-8">
        <BookingHeader text={m.bookingBasketTitle()} />

        <div class="pb-2 md:pb-6 md:mt-6">
          <h1 class="font-bold text-lg">{m.yourSelection()}</h1>
        </div>
        <div class="flex flex-col justify-between w-full h-full">
          <div
            class="flex flex-col gap-4 bg-white rounded-lg p-4 md:p-6 border border-[#DFE5E7] mb-4"
          >
            <BookingServiceBox {selectedProfessional} {selectedService} {openPopupInfo} />

            <div class="flex text-sm flex-row justify-between text-primary font-bold items-center">
              <p class=" text-sm flex gap-1">
                <Clock3 class={iconColor} size={18} />
                {m.today()}
              </p>

              <p class="text-lg">
                {bookingTime?.toLocaleTimeString(languageTag(), {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
          </div>

          <div class="pb-2 md:pb-6 md:mt-6">
            <h1 class="font-bold text-lg">{m.priceDetail()}</h1>
          </div>
          <div class="flex flex-col gap-4 bg-white rounded-lg py-6 md:py-8 border border-[#DFE5E7]">
            <div
              class="flex justify-between items-center text-primary font-normal text-sm px-6 md:px-8"
            >
              <p>{m.servicePrice()}</p>
              <p>
                {haveModifiedPrice
                  ? displayPriceInDollars(selectedService.price)
                  : displayPriceInDollars(priceWithDiscountPrice)}
              </p>
            </div>

            <!-- // DISCOUNTED / SUPERIOR PRICE DETAIL  // -->
            {#if haveModifiedPrice}
              <div
                class="flex justify-between items-center text-primary font-normal text-sm mx-4 md:mx-6 py-2 rounded-[3px] px-2 {isSuperiorDiscounted
                  ? 'bg-[#7832DC] bg-opacity-15'
                  : 'bg-[#23BBAC] bg-opacity-20'}"
              >
                <p class="flex gap-1.5 items-center">
                  {isSuperiorDiscounted ? m.surcharge() : m.discount()}
                  <button
                    on:click={() => {
                      const type = isSuperiorDiscounted ? "MAJORATION" : "REDUCTIONWITHDISCOUNT";
                      openPopupInfo(type);
                    }}
                  >
                    <InfoIcon size={12} />
                  </button>
                </p>
                <p
                  class="flex gap-1.5 items-center {isSuperiorDiscounted
                    ? 'text-[#7832DC]'
                    : 'text-[#23BBAC]'}"
                >
                  <span class=" {isSuperiorDiscounted ? '' : 'rotate-90'}">
                    {#if isSuperiorDiscounted}
                      <TrendingUp size={16} />
                    {:else}
                      <Tag size={16} />
                    {/if}</span
                  >

                  <span class="text-sm font-bold"
                    >{isSuperiorDiscounted ? "+" : "-"}{displayPriceInDollars(
                      isSuperiorDiscounted
                        ? selectedService.discountedPrice - selectedService.price
                        : selectedService.price - selectedService.discountedPrice,
                    )}</span
                  >
                </p>
              </div>
            {/if}

            <!-- // CARDEN FEE DETAIL  // -->
            {#if haveToPayFees}
              <div
                class="flex justify-between items-center font-normal text-sm text-[#616163] px-6 md:px-8"
              >
                <p
                  class="flex gap-1.5 items-center underline underline-offset-4 decoration-dashed decoration-[#DFE5E7]"
                >
                  Frais de service <button
                    on:click={() => {
                      openPopupInfo(isDefaultFees ? "FEES90" : "FEES30");
                    }}><InfoIcon size={12} /></button
                  >
                </p>
                <p>{displayPriceInDollars(finalCardenFees)}</p>
              </div>
            {/if}

            <!-- // TOTAL DETAIL  // -->
            {#if haveToPayFees || haveModifiedPrice}
              <div
                class="flex justify-between items-center text-primary text-sm font-bold px-6 md:px-8"
              >
                <span class="font-bold">{m.total()}</span>

                <span>
                  {displayPriceInDollars(
                    haveToPayFees
                      ? priceWithDiscountPrice + finalCardenFees
                      : priceWithDiscountPrice,
                  )}</span
                >
              </div>
            {/if}

            <!-- // ONLINE_UPFRONT_FEE DETAIL  // -->
            {#if paymentMode === "ONLINE_UPFRONT_FEE"}
              <div class="py-2 {backgroundColorFeeByTheme[theme]} bg-opacity-30 px-6 md:px-8">
                <div class="flex justify-between items-center text-primary font-bold text-sm">
                  <p class="text-primary flex items-center gap-1.5">
                    <Wallet class={iconColor} size={18} />
                    <span class="font-bold">{m.acompte()} + {m.frais()}</span>
                    <button
                      on:click={() => {
                        openPopupInfo("ACOMPTE");
                      }}><InfoIcon class={iconColor} size={12} /></button
                    >
                  </p>
                  <p class="text-lg">
                    {displayPriceInDollars(finalCardenFees + accomptePrice)}
                  </p>
                </div>

                <span class="text-xs text-[#616163]"
                  >{displayPriceInDollars(accomptePrice)} + {displayPriceInDollars(
                    finalCardenFees,
                  )}</span
                >
              </div>
            {/if}

            <!-- FINAL PAYMENT DETAIL  -->
            {#if paymentMode !== "CLIENT_CHOICE"}
              <div
                class="flex justify-between items-center text-primary text-sm font-bold px-6 md:px-8"
              >
                <p class="flex items-center gap-1.5">
                  {#if paymentMode === "ONLINE_UPFRONT_FEE" || paymentMode === "ONSITE_FULL"}
                    <StoreIcon size={18} />
                  {:else if paymentMode === "ONLINE_FULL"}
                    <Dock size={18} />
                  {/if}

                  <span
                    >{paymentMode === "ONLINE_UPFRONT_FEE"
                      ? m.remaindToPayInPlace()
                      : paymentMode === "ONLINE_FULL"
                        ? m.toBePaidOnline()
                        : paymentMode === "ONSITE_FULL"
                          ? m.toBePaidOnSite()
                          : ""}</span
                  >
                </p>

                <span
                  >{paymentMode === "ONLINE_UPFRONT_FEE"
                    ? totalToPayInPlace
                    : paymentMode === "ONLINE_FULL"
                      ? displayPriceInDollars(priceWithDiscountPrice + finalCardenFees)
                      : paymentMode === "ONSITE_FULL"
                        ? displayPriceInDollars(priceWithDiscountPrice)
                        : ""}</span
                >
              </div>
            {/if}
          </div>

          <!-- // PAYMENT METHOD CHOICE  // -->
          {#if paymentMode === "CLIENT_CHOICE"}
            <div class="pb-2 mt-4 md:pb-6 md:mt-6">
              <h1 class="font-bold text-lg">{m.paymentMethod()}</h1>
            </div>
            <div
              class="flex flex-col gap-4 bg-white rounded-lg p-4 py-5 md:p-8 border border-[#DFE5E7]"
            >
              <div class="flex gap-2 text-sm font-bold mb-2">
                <button
                  type="button"
                  class="rounded-lg w-full max-h-[2.7rem] h-[2.7rem] border px-2 flex items-center justify-center transition-all duration-300 ease-in-out {paymentMethod ==
                  'in-store'
                    ? 'bg-black text-primary-foreground'
                    : ''}"
                  on:click={() => {
                    paymentMethod = "in-store";
                  }}
                >
                  {m.paymentOnSite()}
                </button>
                <button
                  type="button"
                  class="rounded-lg w-full max-h-[2.7rem] h-[2.7rem] border px-3 flex items-center justify-center transition-all duration-300 ease-in-out {paymentMethod ==
                  'credit-card'
                    ? 'bg-black text-primary-foreground'
                    : ''}"
                  on:click={() => {
                    paymentMethod = "credit-card";
                  }}
                >
                  {m.onlinePayment()}
                </button>
              </div>

              <div
                class="flex justify-between items-center text-primary font-bold text-sm px-6 md:px-8"
              >
                <p class="flex gap-1.5">
                  {#if paymentMethod === "in-store"}<StoreIcon size={18} />{:else}
                    <Dock size={18} />
                  {/if}

                  {paymentMethod === "in-store" ? m.remaindToPayInPlace() : m.toBePaidOnline()}
                </p>
                <p>{displayPriceInDollars(priceWithDiscountPrice)}</p>
              </div>
            </div>
          {/if}
          <div class="flex-1 pt-10" />
        </div>
      </div>

      <div
        class="bg-white py-4 px-6 fixed bottom-0 left-0 right-0 flex items-center justify-center flex-col gap-1 lg:w-1/2"
      >
        {#if isOnlinePayment}
          <div class="flex gap-1.5 text-xs text-[#616163] mb-2 justify-center items-center">
            <ShieldCheck size={12} />
            {m.securePayment()}
          </div>
        {/if}

        <Button
          type="button"
          on:click={() => {
            isPaymentPopupOpen = true;
          }}
          class="rounded-lg min-h-[61px] w-full  bg-primary  "
        >
          {#if isOnlinePayment}
            <div class="ml-2">
              {#if paymentMode === "ONLINE_UPFRONT_FEE"}
                <div class="flex flex-col">
                  {m.bookSlot()}
                  {displayPriceInDollars(feesWithAccompte)}
                  <span class="text-[#DFE5E7] text-xs"
                    >{m.remaindToPayInPlace()} {totalToPayInPlace}</span
                  >
                </div>
              {:else}
                {m.pay()}
                {#if paymentMode === "ONLINE_FULL"}
                  {displayPriceInDollars(priceWithDiscountPrice + finalCardenFees)}
                {:else}
                  {displayPriceInDollars(priceWithDiscountPrice)}
                {/if}
              {/if}
            </div>
          {:else}
            {m.confirmBooking()}
          {/if}
        </Button>
      </div>

      <Drawer.Root bind:open={isPaymentPopupOpen}>
        <Drawer.Content class=" z-[120] lg:w-1/2 h-full {isCreatingTicket ? 'hidden' : 'block'}">
          <PaymentForm {paymentMethod} {finalPriceToPay} bind:isCreatingTicket />
        </Drawer.Content>
      </Drawer.Root>
    </div>
    <div class="hidden lg:block h-screen w-1/2 lg:relative">
      <img src={$location.location.banner} alt="banner" class="h-full w-full object-cover" />
      <div class="absolute inset-0 bg-black opacity-20" />
    </div>
  </div>
{/if}

<Popup bind:popupTypeOpen />

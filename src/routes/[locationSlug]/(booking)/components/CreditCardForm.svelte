<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import CloseIcon from "$lib/assets/icons/CloseIcon.svelte";
  import { type Stripe, type StripeElementLocale } from "@stripe/stripe-js";

  import {
    Elements,
    LinkAuthenticationElement,
    PaymentElement,
    PaymentRequestButton,
  } from "svelte-stripe";

  import * as Drawer from "$lib/components/ui/drawer";
  import { languageTag } from "$lib/paraglide/runtime";
  import * as m from "$lib/paraglide/messages.js";

  export let stripe: Stripe | null;
  export let clientSecret: string | null;
  export let paymentRequest;
  export let pay;

  const stripeLocale: StripeElementLocale = languageTag() as StripeElementLocale;
</script>

<div
  class="flex flex-col p-4 pt-8 lg:p-8 gap-6 h-fit w-full overflow-y-auto max-h-screen md:h-[80vh] bg-white"
>
  <div class="flex flex-row justify-between">
    <h1 class="font-bold text-2xl">{m.cardDetails()}</h1>
    <Drawer.Close>
      <CloseIcon />
    </Drawer.Close>
  </div>

  <form class="flex flex-col gap-6 h-full">
    {#if stripe && clientSecret}
      <Elements {stripe} {clientSecret} locale={stripeLocale}>
        <PaymentRequestButton {paymentRequest} on:paymentmethod={pay} />
        <LinkAuthenticationElement />
        <PaymentElement />
      </Elements>
    {:else}
      <p class="text-black">Loading...</p>
    {/if}

    <Button type="submit" class="rounded-lg min-h-12 text-lg">{m.saveCard()}</Button>
  </form>
</div>

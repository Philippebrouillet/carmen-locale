<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";

  import { type Stripe } from "@stripe/stripe-js";
  import CreditCardForm from "./CreditCardForm.svelte";

  export let stripe: Stripe | null;
  export let clientSecret: string | null;
  export let paymentRequest;
  export let pay;
  export let open: boolean;
</script>

<Drawer.Root bind:open>
  <Drawer.Content class="z-[200]  lg:w-1/2  h-full">
    <CreditCardForm {stripe} {clientSecret} {paymentRequest} {pay} />
  </Drawer.Content>
</Drawer.Root>

<!-- <div class="md:inline-block hidden">
  <DrawerDesktop.Root bind:open>
    <DrawerDesktop.Content class="z-[200]">
      <CreditCardForm {stripe} {clientSecret} {paymentRequest} {pay} />
    </DrawerDesktop.Content>
  </DrawerDesktop.Root>
</div> -->

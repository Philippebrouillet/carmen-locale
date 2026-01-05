<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";

  import PaymentForm from "./PaymentForm.svelte";

  export let open = false;
  export let finalPriceToPay: number;
  export let paymentMethod: "credit-card" | "in-store";
</script>

<Drawer.Root bind:open>
  <Drawer.Content class=" z-[120] lg:w-1/2  h-full">
    <PaymentForm {paymentMethod} {finalPriceToPay} />
  </Drawer.Content>
</Drawer.Root>

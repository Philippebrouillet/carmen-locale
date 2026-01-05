<script lang="ts">
  import { goto } from "$app/navigation";
  import TicketIcon from "$lib/assets/icons/TicketIcon.svelte";
  import WalletIcon from "$lib/assets/icons/WalletIcon.svelte";
  import { Button } from "$lib/components/ui/button";
  import GiftBox from "$lib/components/GiftBox.svelte";
  import * as m from "$lib/paraglide/messages.js";

  export let locationSlug;
</script>

<div class="flex flex-col w-full gap-6 lg:max-w-md">
  <GiftBox />
  <div class="flex flex-col gap-4 md:py-4 w-full 2xl:text-lg">
    <Button variant="outline" class="w-full gap-2"><WalletIcon />{m.addToWallet()}</Button>
    <Button
      on:click={() => {
        goto(`/${locationSlug}/professional`);
      }}
      class="w-full gap-2 flex items-center"
    >
      <TicketIcon />
      {m.reserve()}
    </Button>
  </div>
</div>

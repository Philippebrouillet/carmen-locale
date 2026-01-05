<script lang="ts">
  import { getBackgroundColorByStatusHeader } from "$src/services/Location";
  import type { LocationStatus, LocationTheme } from "$src/types/Location";
  import * as m from "$lib/paraglide/messages.js";
  import { fly } from "svelte/transition";

  export let locationStatus: LocationStatus = "open";
  export let theme: LocationTheme = "NEUTRAL";

  const textByStatus: Record<LocationStatus, string> = {
    open: m.shopOpen(),
    full: m.shopFull(),
    closed: m.shopClosed(),
  };

  $: backgroundColor = getBackgroundColorByStatusHeader(locationStatus, theme);
</script>

<div in:fly={{ y: -100, duration: 300 }} class="w-full flex z-10">
  <div
    class="text-white {backgroundColor} flex flex-row items-center gap-2 rounded-full text-[0.875rem] py-2 px-4"
  >
    <div class="size-2 rounded-full bg-white"></div>
    {textByStatus[locationStatus]}
  </div>
</div>

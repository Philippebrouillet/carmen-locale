<script lang="ts">
  import type { LocationInfo, LocationStatus, LocationTheme } from "$src/types/Location";
  import * as m from "$lib/paraglide/messages.js";
  export let theme: LocationTheme;
  export let locationStatus: LocationStatus;
  export let externalCalendarLink: LocationInfo["externalCalendarLink"];

  const backgroundColorByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "bg-[#DFE5E7]",
    PINK: "bg-[#E5CEF7]",
    CARDEN: "bg-[#C7E0FF]",
  };
</script>

<div class="mx-4 md:hidden mt-4 bg-opacity-30 rounded-[12px] {backgroundColorByTheme[theme]}">
  <p class="text-sm font-normal text-[#616163] p-3">
    {#if locationStatus === "closed"}
      {#if externalCalendarLink}
        {m.avaibilityTextCloseWithExternalLink()}
      {:else}
        {m.avaibilityTextCloseWithoutExternalLink()}
      {/if}
    {:else if locationStatus === "full"}
      {#if externalCalendarLink}
        {m.avaibilityTextFullWithExternalLink()}
      {:else}
        {m.avaibilityTextFullWithoutExternalLink()}
      {/if}
    {:else if locationStatus === "open"}
      {m.avaibilityTextOpen()} 😉
    {/if}
  </p>
</div>

<script lang="ts">
  import CalendarIcon from "$src/lib/assets/icons/CalendarIcon.svelte";
  import FlashIcon from "$src/lib/assets/icons/FlashIcon.svelte";
  import BadgeTarifMode from "$src/lib/components/BadgeTarifMode.svelte";
  import { backgroundColorByTheme } from "$src/services/Location";
  import type { LocationInfo, LocationStatus, LocationTheme } from "$src/types/Location";
  import { ChevronRight, ExternalLink } from "lucide-svelte";
  import * as m from "$lib/paraglide/messages.js";

  export let locationSlug: string;
  export let location: LocationInfo;
  export let locationStatus: LocationStatus;
  export let theme: LocationTheme;

  $: isDisabledProButton = locationStatus !== "open";
  $: isHiddenProButton = locationStatus === "closed" && location?.externalCalendarLink;

  const secondaryBackgroundColorByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "bg-[#616163] bg-opacity-20",
    PINK: "bg-pale-pink",
    CARDEN: "bg-pale-blue",
  };

  const backgroundBadgeColorByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "bg-[#DFE5E7]",
    PINK: "bg-pale-pink",
    CARDEN: "bg-pale-blue",
  };

  const textColorByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "text-black",
    PINK: "text-pink",
    CARDEN: "text-blue",
  };
</script>

<div class="flex flex-col gap-4 md:py-4 w-full">
  <button
    class:hidden={isHiddenProButton}
    disabled={isDisabledProButton}
    class="disabled:opacity-30 bg-white"
  >
    <a
      on:click={(e) => {
        if (isDisabledProButton) {
          e.preventDefault();
        }
      }}
      href="/{locationSlug}/professional"
      class="w-full p-2.5 flex flex-col px-4 rounded-xl border border-[#E5E7EB] bg-transparent text-primary shadow-sm"
    >
      <BadgeTarifMode />

      <div class="w-full gap-2 flex items-center justify-between">
        <div class=" flex flex-col">
          <div class="flex items-center gap-3">
            <div
              class=" min-w-10 w-10 h-10 {backgroundColorByTheme[
                theme
              ]} rounded-xl flex justify-center items-center"
            >
              <FlashIcon />
            </div>
            <div class="flex flex-col justify-start items-start self-start text-left">
              <p class="text-lg font-bold">{m.comToday()}</p>
              <p class="text-xs font-normal">{m.lastMinute()}</p>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-center {backgroundBadgeColorByTheme[
            theme
          ]} rounded-full bg-opacity-20 min-w-10 w-10 h-10"
        >
          <ChevronRight size={18} class={textColorByTheme[theme]} />
        </div>
      </div>
    </a>
  </button>

  {#if location?.externalCalendarLink}
    <button class="bg-white">
      <a
        href={location.externalCalendarLink}
        class="w-full gap-2 flex items-center p-2.5 justify-between px-4 rounded-xl border border-[#E5E7EB] bg-transparent text-primary shadow-sm relative"
      >
        <div class="flex items-center gap-3">
          <div
            class="min-w-10 w-10 h-10 {isHiddenProButton || isDisabledProButton
              ? backgroundColorByTheme[theme]
              : `${secondaryBackgroundColorByTheme[theme]}`} rounded-xl flex justify-center items-center"
          >
            <CalendarIcon />
          </div>
          <div class="flex flex-col justify-start items-start self-start text-left">
            <span class="text-lg font-bold">{m.scheduleVisit()}</span>
            <span class="text-xs font-normal">{m.scheduleVisitDescription()}</span>
          </div>
        </div>

        <div
          class="flex items-center justify-center {backgroundBadgeColorByTheme[
            theme
          ]} rounded-full bg-opacity-20 min-w-10 w-10 h-10"
        >
          <ExternalLink size={18} class={textColorByTheme[theme]} />
        </div>
      </a>
    </button>
  {/if}
</div>

<script lang="ts">
  import type { LocationTheme } from "$src/types/Location";
  import { AlarmClock, BarChart, ThumbsUp } from "lucide-svelte";
  import { location as locationStore } from "../stores/location.store";
  import * as m from "$lib/paraglide/messages.js";

  const textColorByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "text-black",
    PINK: "text-pink",
    CARDEN: "text-blue",
  };
  const backgroundBadgeColorByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "bg-[#DFE5E7]",
    PINK: "bg-pale-pink",
    CARDEN: "bg-pale-blue",
  };

  const dataByTarifMode: Record<string, { icon: any; text: string }> = {
    RARE: { icon: AlarmClock, text: m.lastPlace() },
    LOW_DEMAND: { icon: ThumbsUp, text: m.smartRate() },
    HGH_DEMAND: { icon: BarChart, text: m.highDemand() },
  };

  $: location = $locationStore.location;
  $: theme = location.theme;
  $: data = dataByTarifMode[location.tarifMode];
</script>

{#if data}
  <div
    class="rounded-full {backgroundBadgeColorByTheme[
      theme
    ]} bg-opacity-20 h-6 px-2 flex items-center gap-1.5 mb-1 max-w-fit uppercase font-extrabold text-xs {textColorByTheme[
      theme
    ]}"
  >
    <svelte:component this={data.icon} size={16} />
    {data.text}
  </div>
{/if}

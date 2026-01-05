<script lang="ts">
  import Section from "$lib/components/Section.svelte";
  import Map from "$lib/components/Map.svelte";
  import * as m from "$lib/paraglide/messages.js";
  import type { LocationInfo } from "$src/types/Location";
  export let fullAddress: string;
  export let location: LocationInfo;
</script>

<Section title={m.comeSeeUs()}>
  <p class="-mt-4 text-left self-start text-sm text-[#616163]">{fullAddress}</p>
  <div class="-mt-1 w-full">
    {#if location}
      <Map {location} />
    {/if}
  </div>
</Section>

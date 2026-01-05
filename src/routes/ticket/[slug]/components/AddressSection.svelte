<script lang="ts">
  import Section from "$lib/components/Section.svelte";
  import { Button } from "$lib/components/ui/button";
  import Map from "$lib/components/Map.svelte";
  import * as m from "$lib/paraglide/messages.js";
</script>

<Section title={m.practicalInformation()}>
  <div class="border rounded-3xl shadow-xl py-6 px-6 md:py-8 md:px-8 flex flex-col bg-white gap-3 w-full">
    <div class="flex flex-row justify-between items-center">
      <h2 class="font-bold text-xl">{m.address()}</h2>
      <Button size="sm" variant="outline">{m.guidance()}</Button>
    </div>
    <div class="flex flex-col gap-1">
      <p>23 Rue Simone Veil</p>
      <p>95870 Bezons</p>
    </div>
    <Map />
  </div>
</Section>

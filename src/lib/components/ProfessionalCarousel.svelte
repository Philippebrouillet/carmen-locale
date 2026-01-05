<script lang="ts">
  import type { CarouselAPI } from "$lib/components/ui/carousel/context.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import ProfessionalCard from "$lib/components/ProfessionalCard.svelte";
  import * as m from "$lib/paraglide/messages.js";
  import { backgroundColorByTheme } from "$src/services/Location";
  import type { LocationInfo, LocationTheme } from "$src/types/Location";
  import type { QueueInfo } from "$src/types/QueueLine";

  export let workers: QueueInfo[];
  export let locationSlug: LocationInfo["slug"];
  export let theme: LocationTheme;

  let api: CarouselAPI;
  let count = 0;
  let current = 0;

  $: if (api) {
    count = api.scrollSnapList().length;
    current = api.selectedScrollSnap() + 1;
    api.on("select", () => {
      current = api.selectedScrollSnap() + 1;
    });
  }

  $: background = backgroundColorByTheme[theme];
</script>

<div class="flex flex-col items-center w-full">
  <h2 class="font-bold text-lg md:text-2xl w-full tex-left mt-8">{m.teamAtYourService()}</h2>
  <Carousel.Root bind:api class="max-w-full">
    <Carousel.Content class="py-4 pb-4">
      {#each workers as worker}
        <Carousel.Item class="md:basis-auto">
          <ProfessionalCard
            {worker}
            href="/{locationSlug}/services/?workerFilter={worker.id}"
            {background}
            {theme}
          />
        </Carousel.Item>
      {/each}
    </Carousel.Content>
  </Carousel.Root>
  {#if api}
    <div class="flex flex-row gap-4">
      <div class="flex items-center gap-1.5">
        {#each Array.from({ length: count }) as _, i}
          <button
            on:click={() => api.scrollTo(i)}
            class="rounded-full {i + 1 === current
              ? `w-3 ${background}`
              : 'w-3 bg-muted-foreground/25'} h-3"
          />
        {/each}
      </div>
    </div>
  {/if}
</div>

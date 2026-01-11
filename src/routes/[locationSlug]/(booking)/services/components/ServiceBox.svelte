<script lang="ts">
  import { displayPriceInDollars } from "$lib/formater";
  import { fly } from "svelte/transition";
  import type { LocationTheme, ServiceInfo } from "$src/types/Location";
  import { location } from "$src/lib/stores/location.store";
  import { Info, Tag, TrendingUp } from "lucide-svelte";

  export let selected: boolean = false;
  export let service: ServiceInfo;
  export let index;
  export let href;
  export let backgroundColor; // by theme

  const imageBackgroundColorByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "bg-[#F7F7F7]",
    PINK: "bg-[#FFF5FA]",
    CARDEN: "bg-[#F8FAFD]",
  };

  let isOpenFullDescription = ["nouveau", "evenement", "combo"].includes(
    service.tag
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""),
  );
</script>

<a
  {href}
  in:fly|global={{ delay: 100 * index, y: 20, duration: 400 }}
  class="border relative border-[#E5E7EB] rounded-xl shadow-sm w-full p-2 flex {isOpenFullDescription
    ? 'flex-col'
    : 'justify-between'} gap-2 transition-all duration-300 ease-in-out hover:shadow-xl bg-white"
  class:bg-muted={selected}
  class:text-muted-foreground={selected}
>
  <button
    class="absolute top-2 right-2"
    on:click|preventDefault={() => (isOpenFullDescription = !isOpenFullDescription)}
  >
    <Info
      class="text-[#DFE5E7] hover:text-gray-400 transition-all transform duration-100"
      size="16"
    />
  </button>
  <div class="flex gap-2">
    <img
      class="rounded-lg border aspect-square object-cover transition-all duration-100 {isOpenFullDescription
        ? ' h-[190px] w-[190px]'
        : ' h-[75px] w-[75px]'} {imageBackgroundColorByTheme[$location.location.theme]}"
      src={service.image}
      alt={service.image ? service.name : ""}
    />

    <div class="flex flex-col w-full items-start">
      <h3 class="font-bold text-left text-primary">{service.name}</h3>
      <span class="text-xs text-secondary">
        {service.durationS / 60} - {service.durationS / 60 + 5}
        min
      </span>
      <p
        class="text-xs text-left text-secondary break-all transition-all duration-100 {!isOpenFullDescription
          ? 'line-clamp-2'
          : ''}"
      >
        {service.description}
      </p>
    </div>
  </div>
  <div
    class="flex {isOpenFullDescription
      ? ''
      : 'min-h-full pt-5'} flex-col items-end justify-end gap-1"
  >
    {#if service.discountedPrice}
      <div
        class="flex items-center gap-1.5 {service.discountedPrice > service.price
          ? 'text-[#7832DC]'
          : 'text-[#23BBAC]'}"
      >
        {#if service.discountedPrice > service.price}
          <div><TrendingUp size="16" /></div>
        {:else}
          <div class=" rotate-90"><Tag size="14" /></div>
        {/if}
        <div class="rounded-l-md text-sm font-semibold whitespace-nowrap">
          {displayPriceInDollars(service.discountedPrice)}
        </div>
      </div>
    {/if}

    <div
      class:line-through={service.discountedPrice}
      class="rounded-l-md text-sm font-semibold whitespace-nowrap"
    >
      {displayPriceInDollars(service.price)}
    </div>

    {#if service.tag}
      <div
        class="text-white text-xs uppercase font-extrabold {backgroundColor} p-1 px-2 rounded-[5px] whitespace-nowrap"
      >
        {service.tag}
      </div>
    {/if}
  </div>
</a>

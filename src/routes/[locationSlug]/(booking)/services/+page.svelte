<script lang="ts">
  import { location } from "$lib/stores/location.store";
  import * as m from "$lib/paraglide/messages.js";
  import BookingHeader from "../components/BookingHeader.svelte";
  import ServiceBox from "./components/ServiceBox.svelte";
  import { page } from "$app/stores";
  import { backgroundColorByTheme } from "$src/services/Location";
  import { Tag, TrendingUp } from "lucide-svelte";
  import type { LocationTheme } from "$src/types/Location";

  import type { PopupType } from "$src/types/PopupInfos";
  import Popup from "$src/lib/components/popup/Popup.svelte";

  export let data;

  let popupTypeOpen: PopupType | null = null;
  let selectedServiceID: number | null = null;

  function createServiceUrl(serviceId: number) {
    let url = new URL(`/${$location.location.id}/schedule`, $page.url.origin);

    if (data.workerFilter) {
      url.searchParams.set("workerFilter", data.workerFilter);
    }
    url.searchParams.set("serviceId", serviceId.toString());

    return url.toString();
  }

  const backgroundColorSurchageByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "bg-[#DFE5E7]",
    PINK: "bg-[#E5CEF7]",
    CARDEN: "bg-[#C7E0FF]",
  };

  $: services = $location.services;
  $: categories = $location.location.categories;
  $: theme = $location.location.theme;
  $: backgroundColor = backgroundColorByTheme[theme];
  $: haveUpPrice = services.some((s) => s.discountedPrice && s.discountedPrice > s.price);
  $: haveDownPrice = services.some((s) => s.discountedPrice && s.discountedPrice < s.price);
  $: servicesWithoutCategory = services.filter((s) => !s.categoryId);
</script>

<main class="w-full flex flex-col">
  <div class="px-4">
    <BookingHeader text={m.chooseService()} />
  </div>

  <div
    class="flex gap-2 overflow-x-auto mb-2 md:mt-2 px-4 py-2 sticky top-0 z-10 transform transition-all duration-100"
  >
    {#each categories as category}
      <button
        on:click={() => {
          const _category = document.getElementById(category.id.toString());
          if (_category) {
            const offset = 50;
            const elementPosition = _category.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }}
        class="flex justify-center items-center px-4 py-2 border hover:{backgroundColor} focus:{backgroundColor} bg-white rounded-2xl group transition-all duration-100"
      >
        <h2 class="text-xs font-normal text-[#616163] group-hover:text-white whitespace-nowrap">
          {category.name}
        </h2>
      </button>
    {/each}
  </div>

  <!-- SURCHAGES  -->
  <div class="mb-6 flex flex-col gap-2 px-4">
    {#if haveUpPrice}
      <div
        class="{backgroundColorSurchageByTheme[
          theme
        ]} bg-opacity-30 p-2 flex gap-2 items-center rounded-xl"
      >
        <div
          class="text-[#7832DC] bg-[#7832DC] bg-opacity-15 flex justify-center items-center p-2 rounded-xl"
        >
          <TrendingUp />
        </div>

        <p class="text-secondary text-sm">
          {m.lastMinuteText()}
          <button
            on:click={() => (popupTypeOpen = "MAJORATION")}
            class="underline underline-offset-2">{m.moreInfo()}</button
          >
        </p>
      </div>
    {/if}
    {#if haveDownPrice && !haveUpPrice}
      <div
        class="{backgroundColorSurchageByTheme[
          theme
        ]} bg-opacity-30 p-2 flex gap-2 items-center rounded-xl"
      >
        <div
          class="text-[#23BBAC] bg-[#23BBAC] bg-opacity-20 flex justify-center items-center p-2 rounded-xl transform rotate-90"
        >
          <Tag />
        </div>

        <p class="text-secondary text-sm">
          {m.lowerPriceText()}
          <button
            on:click={() => (popupTypeOpen = "REDUCTION")}
            class="underline underline-offset-2">{m.moreInfo()}</button
          >
        </p>
      </div>
    {/if}
  </div>
  <div class="px-4">
    {#each categories as category}
      <h2 id={String(category.id)} class="col-span-full font-bold text-primary">
        {category.name}
      </h2>

      <p class="text-xs text-[#616163] mb-3">{category.description || ""}</p>

      <div
        class="grid grid-cols-1 md:grid-cols-2 w-full gap-4 justify-center md:justify-start mb-8"
      >
        {#each services.filter((s) => s.categoryId === category.id) as service, i}
          <ServiceBox
            {backgroundColor}
            href={createServiceUrl(service.id)}
            {service}
            index={i}
            selected={selectedServiceID == service.id}
          />
        {/each}
      </div>
    {/each}

    {#if servicesWithoutCategory.length > 0}
      <div class="mt-6 border-t pt-6">
        <div
          class="grid grid-cols-1 md:grid-cols-2 w-full gap-4 justify-center md:justify-start mb-8"
        >
          {#each servicesWithoutCategory as service, i}
            <ServiceBox
              {backgroundColor}
              href={createServiceUrl(service.id)}
              {service}
              index={i}
              selected={selectedServiceID == service.id}
            />
          {/each}
        </div>
      </div>
    {/if}
  </div>
</main>

<Popup bind:popupTypeOpen />

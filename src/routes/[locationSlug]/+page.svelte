<script lang="ts">
  import { page } from "$app/stores";
  import WorkerAvatar from "$lib/components/WorkerAvatar.svelte";
  import { clock } from "$lib/stores/clock.svelte";
  import { location as locationResponseApi } from "$lib/stores/location.store";
  import ProfessionalCarousel from "$lib/components/ProfessionalCarousel.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import LocationHeader from "./components/LocationHeader.svelte";
  import LocationSection from "./components/LocationSection.svelte";

  import { computeQueue } from "../../services/QueueLine";
  import ActionButtons from "./components/ActionButtons.svelte";
  import AvaibilityTextCard from "./components/AvaibilityTextCard.svelte";

  import { getLocationStatus } from "$src/services/Location";
  import { onMount } from "svelte";
  import { resetShopStore } from "$src/lib/stores/basketStore";
  import ExternalLinks from "$src/lib/components/ExternalLinks.svelte";

  const locationSlug = $page.params.locationSlug;
  let location = $locationResponseApi.location;

  // All reactive statements because locationResponseApi is SSE connected to have real time updates
  $: location = $locationResponseApi.location;
  $: theme = location.theme;
  $: now = new Date($clock);
  $: start = new Date(now.getTime() + 5 * 60 * 1000);
  $: workers = computeQueue($locationResponseApi, now, start);
  $: locationStatus = getLocationStatus(workers);
  $: headerCover = location.banner ?? "/location-cover.webp";
  $: fullAddress = `${location.address}, ${location.zipCode}
        ${location.city}`;

  onMount(() => {
    resetShopStore();
  });
</script>

<div class="w-full">
  <LocationHeader {location} {locationStatus} {headerCover} {theme} {fullAddress} />

  <div class="w-full flex flex-col md:px-12 lg:pr-[33%]">
    <div class="flex gap-8 px-6 py-2 overflow-x-auto">
      {#each workers as w (w.id)}
        <WorkerAvatar queue={w} {theme} />
      {/each}
    </div>

    <AvaibilityTextCard
      {theme}
      externalCalendarLink={location.externalCalendarLink}
      {locationStatus}
    />

    <div class="lg:absolute lg:right-0 lg:h-[165%] lg:w-1/3 px-4">
      <div
        class="w-full flex flex-col items-center py-6 px-0 gap-6 lg:border lg:rounded-3xl lg:shadow-xl lg:py-8 lg:px-8 lg:sticky lg:top-10"
      >
        <img
          src={location.avatar}
          alt="logo"
          class="hidden lg:inline-block w-28 h-28 rounded-full"
        />
        <h2 class="hidden lg:inline-block font-bold text-[1.125rem] md:text-[1.75rem]">
          {location.name}
        </h2>

        <ActionButtons {locationSlug} {location} {locationStatus} {theme} />

        <ExternalLinks {location} mode="desktop" />
      </div>
    </div>

    <ExternalLinks {location} mode="mobile" />

    <div class="px-4">
      <LocationSection {fullAddress} {location} />
      <ProfessionalCarousel {workers} {locationSlug} {theme} />
    </div>
  </div>
</div>

<Footer />

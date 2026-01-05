<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import LocationButtons from "$lib/components/LocationButtons.svelte";
  import SideSection from "$lib/components/SideSection.svelte";
  import SocialButtons from "$lib/components/SocialButtons.svelte";
  import { clock } from "$src/lib/stores/clock.svelte";
  import LocationHeader from "$src/routes/[locationSlug]/components/LocationHeader.svelte";
  import { getLocationStatus } from "$src/services/Location";
  import type { LocationInfoResp } from "$src/types/Location";
  import { computeQueue } from "$src/services/QueueLine";

  import AddressSection from "./components/AddressSection.svelte";
  import GiftSection from "./components/GiftSection.svelte";
  import MessageSection from "./components/MessageSection.svelte";
  import OverviewSection from "./components/OverviewSection.svelte";
  import ScheduleSection from "./components/ScheduleSection.svelte";
  import SelectionSection from "./components/SelectionSection.svelte";
  import SmsSection from "./components/SmsSection.svelte";
  import TicketViewHeader from "./components/TicketViewHeader.svelte";
  import { Button } from "$src/lib/components/ui/button";
  import ExternalLinks from "$src/lib/components/ExternalLinks.svelte";
  import LocationSection from "$src/routes/[locationSlug]/components/LocationSection.svelte";

  export let data;

  const ticket = data.ticket;
  const locationSlug = data.location.location.id;

  $: location = data.location.location as LocationInfoResp["location"];
  $: theme = location.theme;
  $: now = new Date($clock);
  $: start = new Date(now.getTime() + 5 * 60 * 1000);
  $: workers = computeQueue(data.location, now, start);
  $: locationStatus = getLocationStatus(workers);
  $: headerCover = location.banner ?? "/location-cover.webp";
  $: fullAddress = `${location.address}, ${location.zipCode}
        ${location.city}`;
  $: prestation = ticket.details.prestations[0];
</script>

<main class="">
  <LocationHeader {headerCover} {location} {locationStatus} {theme} {fullAddress} />
  <div class="flex flex-row justify-between max-w-screen md:px-8 lg:px-12 xl:px-16 2xl:px-40 gap-8">
    <div
      class="w-full flex flex-col gap-8 md:gap-16 max-w-screen lg:max-w-lg xl:max-w-2xl 2xl:max-w-3xl px-4 mt-4"
    >
      <div class="rounded-lg bg-[#DFE5E7] bg-opacity-30 p-4 text-[#616163] text-sm">
        <p>Réservation confirmée.</p>
        <p>Merci de votre confiance et de votre patience.</p>
      </div>

      <!-- {#if false}
        <SmsSection />
      {/if} -->
      <div class="lg:hidden w-full">
        <ScheduleSection {ticket} {prestation} />
      </div>

      <div class="flex justify-center flex-col items-center gap-4">
        <Button
          size="sm"
          variant="outline"
          class="border border-primary w-3/4 bg-primary text-white "
        >
          <!-- {m.cancel()} -->
          Annuler la réservation
        </Button>

        <Button
          href="/{locationSlug}"
          size="sm"
          variant="outline"
          class=" w-3/4 bg-transparent  text-primary border border-primary "
        >
          <!-- {m.cancel()} -->
          Nouvelle réservation
        </Button>
      </div>

      <OverviewSection
        {prestation}
        queueLen={data.queueLen}
        queueInfo={data.queueInfo}
        queuePosition={data.queuePosition}
      />

      <ExternalLinks {location} mode="mobile" />

      <LocationSection {fullAddress} {location} />

      <!-- <div class="lg:hidden w-full">
        <GiftSection {locationSlug} />
      </div> -->
      <!-- <SelectionSection {ticket} /> -->
      <!-- <AddressSection /> -->
      <!-- <LocationButtons /> -->
      <!-- <SocialButtons /> -->
      <!-- <MessageSection {ticket} /> -->
    </div>
    <SideSection sticky={false}>
      <ScheduleSection {ticket} {prestation} />
      <GiftSection {locationSlug} />
    </SideSection>
  </div>
</main>

<Footer />

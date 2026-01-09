<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import LocationButtons from "$lib/components/LocationButtons.svelte";
  import SideSection from "$lib/components/SideSection.svelte";
  import SocialButtons from "$lib/components/SocialButtons.svelte";
  import { clock } from "$src/lib/stores/clock.svelte";
  import LocationHeader from "$src/routes/[locationSlug]/components/LocationHeader.svelte";
  import { getLocationStatus } from "$src/services/Location";
  import type { LocationInfoResp, TicketInfo } from "$src/types/Location";
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
  import Popup from "$src/lib/components/popup/Popup.svelte";
  import type { PopupType } from "$src/types/PopupInfos";
  import { PUBLIC_CARDEN_API } from "$env/static/public";
  import { goto } from "$app/navigation";
  import type { TicketStatus } from "$src/types/Ticket";
  import { displayPriceInDollars } from "$src/lib/formater";
  import { Store } from "lucide-svelte";
  import EvaluationSection from "./components/EvaluationSection.svelte";
  import { onDestroy, onMount } from "svelte";

  export let data;
  $: console.log("data", data);
  let ticket = data.ticket;

  const locationSlug = data.location.location.id;

  let popupType: PopupType | null = null;
  let showThanksText = false;

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
  $: console.log("ticket ", ticket);
  $: isTicketGeneratedByClient = ticket.details.eticket;
  $: isTicketGeneratedByPro = !isTicketGeneratedByClient;

  const evaluateTicketStatus = () => {
    let status: TicketStatus = "coming";

    if (ticket.doneTime) {
      status = "done";
      return status;
    }

    if (ticket.canceledTime) {
      if (ticket.canceledByPro) {
        status = "cancelledByPro";
      } else {
        status = "cancelled";
      }
      return status;
    }

    if (
      ticket.expectedTime &&
      new Date(ticket.expectedTime).getTime() < now.getTime() &&
      data.queuePosition > 0
    ) {
      status = "isLate";
      return status;
    }

    if (data.queuePosition > 1) status = "coming";
    else if (data.queuePosition === 1) {
      if (nextUserTicketProgress && nextUserTicketProgress > 75) {
        status = "iminent";
      } else {
        status = "youAreNext";
      }
    } else if (data.queuePosition === 0) {
      if (userTicketProgress > 0 && ticket.startedTime) {
        status = "inProgress";
      } else {
        status = "yourTurn";
      }
    }

    return status;
  };

  const calculateProgressTicket = (ticket: TicketInfo) => {
    if (!now || !ticket || !ticket.startedTime || (!ticket.durationS && !ticket.duration)) {
      return 0;
    }

    const currentTicket = ticket;

    const startTime = new Date(currentTicket.startedTime);
    const durationSeconds = currentTicket.durationS || currentTicket.duration;

    const elapsedSeconds = (now.getTime() - startTime.getTime()) / 1000;

    const progress = Math.min((elapsedSeconds / durationSeconds) * 100, 100);
    if (progress < 0) return 0;
    return progress;
  };

  let ticketStatus: TicketStatus;
  $: userTicketProgress,
    nextUserTicketProgress,
    data.queuePositio,
    (ticketStatus = evaluateTicketStatus());

  let userTicketProgress: number = 0;
  let nextUserTicketProgress: number = 0;

  $: nextTicket = data.queueLen[data.queuePosition - 1];
  $: $clock,
    (userTicketProgress = calculateProgressTicket(ticket)),
    (nextUserTicketProgress = calculateProgressTicket(nextTicket));

  $: disabledDeleteButton = ["yourTurn", "inProgress"].includes(ticketStatus);

  $: scheduleSectionProps = {
    ticketStatus,
    ticket,
    prestation,
    isTicketGeneratedByPro,
    isTicketGeneratedByClient,
  };

  const onSyncEvent = (event: MessageEvent) => {
    const parsedData = JSON.parse(event.data);

    if (parsedData.type === "sync") {
      const queueLines = parsedData.queueLines;
      const tickets = queueLines.flatMap((item) => item.tickets);
      const newTicketData = tickets.find((item) => item.id === ticket.id);
      const otherTicketsOnLocation = tickets.filter(
        (item) =>
          item.id !== ticket.id &&
          item.locationId === ticket.locationId &&
          item.startedTime &&
          new Date(item.startedTime).toDateString() === now.toDateString() &&
          !item.doneTime &&
          !item.canceledTime &&
          !item.deletedTime &&
          new Date(item.expectedTime).getTime() < new Date(newTicketData.expectedTime).getTime(),
      );

      if (newTicketData) {
        ticket = newTicketData;
        ticket = ticket;
      }

      if (otherTicketsOnLocation.length) {
        const newQueueLen = [];

        for (const otherTicket of otherTicketsOnLocation) {
          newQueueLen.push({
            duration: otherTicket.durationS,
            expectedTime: otherTicket.expectedTime,
            id: otherTicket.id,
            startedTime: otherTicket.startedTime,
            number: otherTicket.details.number,
          });
        }

        data.queueLen = newQueueLen;
        data.queuePosition = newQueueLen.length;
        data.data = data;
      } else {
        data.queueLen = [];
        data.queuePosition = 0;
      }
    }
  };

  let eventSource: EventSource | null = null;
  onMount(() => {
    if (eventSource == null) {
      // if (eventSource != null) {
      //   eventSource.close();
      //   eventSource = null;
      // }
      eventSource = new EventSource(
        //`${PUBLIC_CARDEN_API}/api/v5/events/sse?locations=[${data.location.slug}]`
        `${PUBLIC_CARDEN_API}/api/v2/location/events?token=${location.id}`,
      );

      eventSource.onopen = () => {};
      eventSource.onmessage = onSyncEvent;
      eventSource.onerror = (err) => {
        console.error(`[!] sse error ${err}`);
      };
    }
  });

  onDestroy(() => {
    if (eventSource != null) {
      eventSource.close();
      eventSource = null;
    }
  });
</script>

<main class="">
  <LocationHeader {headerCover} {location} {locationStatus} {theme} {fullAddress} />
  <div class="flex flex-row justify-between max-w-screen md:px-8 lg:px-12 xl:px-16 2xl:px-40 gap-8">
    <div
      class="w-full flex flex-col gap-8 md:gap-16 max-w-screen lg:max-w-lg xl:max-w-2xl 2xl:max-w-3xl px-4 mt-4"
    >
      {#if ticketStatus !== "done" && ticketStatus !== "yourTurn" && ticketStatus !== "coming" && ticketStatus !== "youAreNext" && ticketStatus !== "iminent"}
        <div class="rounded-lg bg-[#DFE5E7] bg-opacity-30 p-4 text-[#616163] text-sm">
          {#if showThanksText}
            <p>Réservation confirmée.</p>
            <p>Merci de votre confiance et de votre patience.</p>
          {:else if ticketStatus === "inProgress"}
            Informez vos proches de votre progression et horaire de fin en partageant votre ticket.
          {:else if ticketStatus === "cancelled"}
            Vous avez annulé votre réservation.
          {:else if ticketStatus === "cancelledByPro"}
            Le professionnel a annulé votre réservation. Contactez-le pour obtenir des explications.
          {:else if ticketStatus === "proAbsent"}
            Le professionnel a indiqué que vous êtiez absent. Contactez-le directement pour obtenir
            de l’aide ou des explications.
          {:else if ticketStatus === "isLate"}
            Une prestation a pris plus de temps que prévu, nous avons ajusté votre horaire de
            passage pour éviter de vous faire attendre sur place.
            <span class="uppercase text-[#A03203]">NOUVELLE ESTIMATION <span>14:30</span> </span>
          {/if}
        </div>
      {/if}

      {#if data.queuePosition < 2}
        <OverviewSection
          {ticketStatus}
          queueInfo={data.queueInfo}
          queuePosition={data.queuePosition}
          ticketProgress={data.queuePosition === 0 ? userTicketProgress : nextUserTicketProgress}
        />
      {/if}

      {#if ticketStatus === "done"}
        <EvaluationSection {location} ticketModules={data.queueInfo.ticketModules} />
      {/if}

      <!-- {#if false}
        <SmsSection />
      {/if} -->
      <div class="lg:hidden w-full">
        <ScheduleSection {...scheduleSectionProps} bind:popupType />
      </div>

      <div class="flex justify-center flex-col items-center gap-4">
        {#if !["done", "cancelled", "cancelledByPro", "proAbsent"].includes(ticketStatus)}
          <Button
            on:click={(e) => {
              if (disabledDeleteButton) {
                e.preventDefault();
                return;
              }
              popupType = "CANCEL_RESERVATION";
            }}
            size="sm"
            variant="outline"
            class="border border-primary w-3/4 {disabledDeleteButton
              ? 'bg-[#DFE5E7] cursor-not-allowed border-[#DFE5E7]'
              : 'bg-primary'}  text-white"
          >
            <!-- {m.cancel()} -->
            Annuler la réservation
          </Button>
        {/if}

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

      {#if data.queuePosition > 1}
        <OverviewSection
          {ticketStatus}
          queueInfo={data.queueInfo}
          queuePosition={data.queuePosition}
        />
      {/if}

      <!-- Prestation section -->
      {#if prestation}
        <div class="bg-white p-4 flex items-center rounded-2xl shadow-sm -mt-2">
          <div class="flex justify-between gap-2 w-full font-bold text-sm text-primary">
            <div class="flex gap-2">
              <Store size="18" /><span class="">Reste à payer sur place</span>
            </div>
            {displayPriceInDollars(
              prestation.discountedPrice ? prestation.discountedPrice : prestation.price,
            )}
          </div>
        </div>
      {/if}

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
    <SideSection sticky={true}>
      <ScheduleSection {...scheduleSectionProps} bind:popupType />
      <!-- <GiftSection {locationSlug} /> -->
    </SideSection>
  </div>
</main>

<Popup
  bind:popupTypeOpen={popupType}
  on:confirmAction={async () => {
    if (popupType === "CANCEL_RESERVATION") {
      // const deletedTicket = await fetch(`${PUBLIC_CARDEN_API}/api/v2/ticket/${ticket.id}`, {
      //   method: "DELETE",
      //   // credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // console.log("deletedTicket", deletedTicket);
      // goto(`/${locationSlug}`);
    }
  }}
/>

<Footer />

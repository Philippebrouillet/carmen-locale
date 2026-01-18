<script lang="ts">
  import SuccessIcon from "$lib/assets/icons/SuccessIcon.svelte";
  import { displayWaitingTime } from "$lib/formater";
  import * as m from "$lib/paraglide/messages.js";
  import { languageTag } from "$src/lib/paraglide/runtime";
  import type { LocationTheme } from "$src/types/Location";
  import type { PopupType } from "$src/types/PopupInfos";
  import type { TicketPaymentType, TicketStatus } from "$src/types/Ticket";
  import { Bell, Clock3, Dock, InfoIcon, Store, Wallet } from "lucide-svelte";

  export let ticket;
  export let isTicketGeneratedByClient;
  export let prestation;
  export let ticketStatus: TicketStatus;
  export let popupType: PopupType | null;
  export let isCancelledOrProAbsent: boolean = false;
  export let theme: LocationTheme;
  export let timeWithLateTime: Date | null = null;
  export let isExpectedTimeClose: boolean = false;

  $: ticketNumber = ticket.details.number;
  $: expectedTime = timeWithLateTime
    ? displayWaitingTime(timeWithLateTime)
    : displayWaitingTime(new Date(ticket.expectedTime));

  const defaultStatusBadge: TicketPaymentType = !ticket.details.left_to_pay
    ? "paid"
    : ticket.details.already_paid > 0
      ? "acompte_verse"
      : "toPayOnPlace";

  let badgePaymentStatus: TicketPaymentType = defaultStatusBadge;

  $: badgePaymentStatus = ticket.status || defaultStatusBadge;

  const dataBadgePaiementByPaymentType = {
    acompte_verse: {
      text: "Acompte versé",
      icon: Wallet,
    },
    toPayOnPlace: {
      text: "À regler sur place",
      icon: Store,
    },
    paid: {
      text: "Déjà payé en ligne",
      icon: Dock,
      bg: "bg-[#23BBAC]",
    },
  } satisfies Record<TicketPaymentType, { text: string; icon: typeof Wallet; bg?: string }>;

  const dataBadgeInfosByStatus = {
    coming: { text: "Heure estimée", icon: Clock3 },
    youAreNext: {
      text: "C'est bientôt à vous",
      icon: Clock3,
      bg: "bg-[#00D4AA]",
      textColor: "text-white",
    },
    iminent: { text: "Passage imminent", icon: Bell, bg: "bg-[#00D4AA]", textColor: "text-white" },
    inProgress: { text: "Heure de fin estimée", icon: Clock3 },
    yourTurn: null,

    isLate: { text: "Retard signalé", icon: Clock3, textColor: "text-[#FF834D]" },
  } satisfies Record<
    TicketStatus,
    { text: string; icon: typeof Clock3; bg?: string; textColor?: string } | null
  >;

  const bgByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "bg-primary",
    PINK: "bg-[#CF95FB]",
    CARDEN: "bg-[#0073FF]",
  };

  const borderCardByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "border-primary",
    PINK: "border-[#CF95FB]",
    CARDEN: "border-[#0073FF]",
  };

  const textColorByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "text-[#616163]",
    PINK: "text-[#CF95FB]",
    CARDEN: "text-[#0073FF]",
  };

  const bgTicketNumberByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "bg-[#F7F7F7]",
    PINK: "bg-[#FFF5FA]",
    CARDEN: "bg-[#F8FAFD]",
  };

  $: isShowTextStatus =
    ticketStatus === "done" ||
    ticketStatus === "cancelled" ||
    ticketStatus === "cancelledByPro" ||
    ticketStatus === "inProgress" ||
    ticketStatus === "yourTurn";
  $: badgePaymentInfos = dataBadgePaiementByPaymentType[badgePaymentStatus];

  let badgeInfosByStatus = dataBadgeInfosByStatus[ticketStatus];
  $: badgeInfosByStatus =
    ticketStatus === "iminent" && !isExpectedTimeClose
      ? dataBadgeInfosByStatus["coming"]
      : dataBadgeInfosByStatus[ticketStatus];
</script>

<div
  class="rounded-2xl shadow-sm bg-white overflow-clip w-full border-b-[6px] {borderCardByTheme[
    theme
  ]} p-4 md:p-6"
>
  <div class="flex justify-between text-secondary-foreground items-center mb-4">
    <p
      class="font-bold text-xs px-2 py-1 {bgTicketNumberByTheme[theme]} {textColorByTheme[
        theme
      ]} rounded-[5px]"
    >
      #{ticketNumber}
    </p>

    <!-- Payment Badge -->
    {#if isTicketGeneratedByClient && badgePaymentInfos && !isCancelledOrProAbsent}
      <div
        class="py-1 px-2 rounded-lg flex flex-row gap-1.5 items-center text-white {'bg' in
        badgePaymentInfos
          ? badgePaymentInfos.bg
          : bgByTheme[theme]}"
      >
        <svelte:component this={badgePaymentInfos.icon} size="14" />
        <p class="font-bold uppercase text-xs">{badgePaymentInfos.text}</p>
      </div>
    {/if}
  </div>

  <div class="flex flex-col items-center gap-6">
    <div class="flex flex-col gap-2 items-center">
      <p class="font-bold text-secondary uppercase text-sm">
        {new Date(ticket.expectedTime).toDateString() === new Date().toDateString()
          ? "Aujourd'hui"
          : new Date(ticket.expectedTime).toLocaleDateString(languageTag(), {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
      </p>
      <div class="font-bold text-primary flex items-center justify-center gap-2 max-h-[60px] mb-2">
        <span class=" {isShowTextStatus ? 'text-[2.875rem]' : 'text-6xl'}">
          {#if ticketStatus === "done"}
            Terminé
          {:else if isCancelledOrProAbsent}
            Annulé
          {:else if ticketStatus === "inProgress"}
            En cours
          {:else if ticketStatus === "yourTurn"}
            Maintenant
          {:else}
            {expectedTime}
          {/if}
        </span>
        {#if ticketStatus === "coming" || ticketStatus === "youAreNext" || ticketStatus === "iminent"}
          <div class="relative self-start">
            <div
              class="pulse-ring border {theme === 'NEUTRAL'
                ? 'border-[#616163]'
                : borderCardByTheme[theme]}"
            ></div>

            <div class="p-1">
              <div
                class=" min-h-2 min-w-2 rounded-full {theme === 'NEUTRAL'
                  ? 'bg-[#616163]'
                  : bgByTheme[theme]}"
              />
            </div>
          </div>
        {/if}
      </div>
      {#if isTicketGeneratedByClient}
        {#if badgeInfosByStatus}
          <div
            class=" py-1 px-2 rounded-2xl {'bg' in badgeInfosByStatus
              ? `${badgeInfosByStatus.bg} `
              : 'bg-[#DFE5E7] bg-opacity-30 '} {'textColor' in badgeInfosByStatus
              ? badgeInfosByStatus.textColor
              : textColorByTheme[theme]}   flex items-center gap-1"
          >
            <svelte:component this={badgeInfosByStatus.icon} size="14" />

            <p class="text-xs font-extrabold uppercase {badgeInfosByStatus.textColor}">
              {badgeInfosByStatus.text}
            </p>

            {#if ticketStatus === "inProgress"}
              <span class="text-xs font-extrabold">
                {new Date(ticket.expectedTime).toLocaleTimeString(languageTag(), {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            {/if}
          </div>
        {/if}
      {:else}
        <p class="font-bold text-secondary uppercase text-sm">Horaire prévue</p>
      {/if}
    </div>

    {#if isTicketGeneratedByClient && ticketStatus !== "yourTurn" && ticketStatus !== "inProgress" && ticketStatus !== "done" && !isCancelledOrProAbsent}
      <p class="text-[#616163] text-xs flex items-center gap-1">
        Estimation dynamique liée à l’activité sur place <button
          on:click={() => (popupType = "HOUR_CHANGE")}
        >
          <InfoIcon size="11" class="min-w-[11px] cursor-pointer" />
        </button>
      </p>
    {/if}

    <div class="border w-full border-dashed border-[#DFE5E7]"></div>
    {#if prestation}
      <div class="flex flex-col gap-2 items-center">
        <span class="text-primary">{prestation.name}</span>
        <span class="text-secondary">{prestation.duration} minutes</span>
      </div>
    {/if}
  </div>
</div>

<style>
  .pulse-wrapper {
    align-self: flex-start;
    position: relative;
  }

  .pulse-ring {
    position: absolute;
    inset: 0;
    border-radius: 100%;
    animation: pulse-border 2.3s ease-out infinite;
    pointer-events: none;
  }

  @keyframes pulse-border {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    70% {
      transform: scale(2.2);
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
</style>

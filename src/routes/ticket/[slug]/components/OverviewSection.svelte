<script lang="ts">
  import * as m from "$lib/paraglide/messages.js";
  import type { LocationStatus, LocationTheme } from "$src/types/Location";
  import type { TicketStatus } from "$src/types/Ticket";

  export let queuePosition;
  export let queueInfo;
  // export let queueLen;
  export let ticketStatus: TicketStatus;
  export let ticketProgress: number = 0;

  const proInfosByTicketStatus = {
    coming: { title: `${queueInfo.name} est occupé`, description: "Service en cours" },
    youAreNext: {
      title: "Vous êtes le prochain",
      description: "Merci de vous rendre au salon et de rester à proximité immédiate.",
    },
    iminent: {
      title: "Vous êtes le prochain",
      description: "Merci de vous rendre au salon et de rester à proximité immédiate.",
    },
    yourTurn: { title: "C’est à vous.", description: `${queueInfo.name} vous attends sur place.` },

    inProgress: {
      title: "Service en cours",
      description: "Installez-vous confortablement et détendez-vous.",
    },
    done: {
      title: "Merci de votre confiance",
      description: "À très bientôt !",
    },
    isLate: {
      title: "Votre tour approche",
      description: "Service en cours",
    },
  } satisfies Record<TicketStatus, { title: string; description: string }>;

  // const calculateTotalWait = (queueLen: any) => {
  //   let totalDurationSeconds = queueLen.reduce((total: any, item: any) => {
  //     return total + item.duration;
  //   }, 0);

  //   let totalDurationMinutes = totalDurationSeconds / 60;

  //   return totalDurationMinutes;
  // };

  //   const badgePaymentBgByTheme: Record<LocationTheme, string> = {
  // 'NEUTRAL':'bg-primary'
  //   };
  console.log("ticketStatus", ticketStatus);
  $: proInfos = proInfosByTicketStatus[ticketStatus];
  $: isBlackBackground = ticketStatus === "yourTurn" || ticketStatus === "done";
</script>

<div
  class=" {isBlackBackground
    ? 'bg-primary '
    : 'bg-white'}  p-4 flex rounded-2xl shadow-sm flex-col gap-2 w-full"
>
  <div class="flex gap-2">
    <img src={queueInfo.avatar} class="rounded-full w-14 h-14" alt="profile" />
    <div class="flex flex-col w-full">
      <p class="font-bold text-lg {isBlackBackground ? 'text-white' : 'text-primary'} ">
        {proInfos?.title}
      </p>

      <div class="flex gap-4 items-center justify-between w-full">
        <p class="text-xs {isBlackBackground ? 'text-white' : 'text-secondary'}">
          {proInfos?.description}
        </p>

        <!-- WALK IN SVG -->
        {#if ticketStatus === "youAreNext" || ticketStatus === "iminent"}
          <div class="rounded-full px-2.5 py-1.5 bg-neutral-200 flex justify-center items-center">
            <svg
              width="13"
              height="20"
              viewBox="0 0 13 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.16794 4C8.27254 4 9.16794 3.10457 9.16794 2C9.16794 0.89543 8.27254 0 7.16794 0C6.06344 0 5.16794 0.89543 5.16794 2C5.16794 3.10457 6.06344 4 7.16794 4ZM5.22074 4.60557C5.55204 4.43992 5.94784 4.47097 6.24924 4.68627L7.24924 5.40056C7.56734 5.6278 7.72384 6.01959 7.64994 6.40348L6.60114 11.847L11 18.4453C11.3063 18.9048 11.1822 19.5257 10.7226 19.8321C10.2631 20.1384 9.64224 20.0142 9.33594 19.5547L4.70954 12.6152L3.89405 11.3919C3.7513 11.1778 3.6966 10.9169 3.74132 10.6634L4.33784 7.28309L2.55258 8.1757L1.98076 11.0334C1.87239 11.575 1.34553 11.9261 0.80398 11.8178C0.26243 11.7094 -0.0887299 11.1825 0.0196301 10.641L0.68741 7.30379C0.74795 7.00123 0.94478 6.74356 1.22076 6.60557L5.22074 4.60557ZM10.8517 10.9487L7.97724 9.9905L8.35884 8.0096L11.4842 9.0513C12.0081 9.226 12.2913 9.7923 12.1166 10.3162C11.942 10.8402 11.3757 11.1234 10.8517 10.9487ZM0.29638 18.5097L3.56431 12.7001L3.87752 13.1699L4.80894 14.5669L2.03953 19.4903C1.76877 19.9716 1.15905 20.1423 0.6777 19.8716C0.19634 19.6008 0.0256201 18.9911 0.29638 18.5097Z"
                fill="black"
              />
            </svg>
          </div>
        {/if}
      </div>
    </div>
  </div>

  {#if ticketStatus !== "done" && ticketStatus !== "yourTurn"}
    <div class="flex flex-col w-full justify-center bg-[#F7F7F7] rounded-lg p-4 gap-2">
      <div
        class="font-bold text-[#616163] flex gap-2 justify-between text-sm {ticketProgress
          ? 'mb-2'
          : ''} "
      >
        {#if ticketStatus === "inProgress"}
          Progression
        {:else}
          <span class=" text-[1.875rem] text-primary">{queuePosition}</span>
          <span class="self-end">{m.queueProgress()}</span>
          <span></span>
        {/if}
      </div>

      {#if ticketProgress > -1}
        <div class="h-4 w-full rounded-[6px] bg-[#DFE5E7] overflow-hidden">
          <div class="h-4 bg-[#616163]" style="width: {ticketProgress}%"></div>
        </div>
        <p class=" md:text-md text-xs text-secondary">
          {#if ticketStatus === "inProgress"}
            {queueInfo.name} débute sont service
          {:else if ticketProgress > 75}
            Le client devant vous a bientôt fini
          {:else}
            Progression du client devant vous
          {/if}
        </p>
      {/if}
    </div>
  {/if}
</div>

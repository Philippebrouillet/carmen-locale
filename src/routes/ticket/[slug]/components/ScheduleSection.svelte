<script lang="ts">
  import SuccessIcon from "$lib/assets/icons/SuccessIcon.svelte";
  import { displayWaitingTime } from "$lib/formater";
  import * as m from "$lib/paraglide/messages.js";
  import { Dock, Store, Wallet } from "lucide-svelte";

  export let ticket;
  export let prestation;

  const ticketNumber = ticket.details.number;
  const expectedTime = displayWaitingTime(new Date(ticket.expectedTime));
  $: badgeStatus = ticket.status || "paid";
  const dataBadgeByStatus = {
    acompte_verse: {
      text: "Acompte versé",
      icon: Wallet,
    },
    toPayOnPlace: {
      text: "À payer sur place",
      icon: Store,
    },
    paid: {
      text: "Déjà payé en ligne",
      icon: Dock,
      bg: "bg-[#23BBAC]",
    },
  };
  $: badgeInfo = dataBadgeByStatus[badgeStatus];
</script>

<div
  class="rounded-2xl shadow-sm bg-white overflow-clip w-full border-b-[6px] border-black p-4 md:p-6"
>
  <div class="flex justify-between text-secondary-foreground items-center mb-4">
    <p class="font-bold text-xs px-2 py-1 bg-[#F7F7F7] text-[#616163] rounded-[5px]">
      #{ticketNumber}
    </p>
    <div
      class="py-1 px-2 rounded-lg flex flex-row gap-1.5 items-center text-white {badgeInfo.bg
        ? badgeInfo.bg
        : 'bg-black'}"
    >
      <svelte:component this={badgeInfo.icon} size="14" />
      <p class="font-bold uppercase text-xs">{badgeInfo.text}</p>
    </div>
  </div>
  <div class="flex flex-col items-center gap-6">
    <div class="flex flex-col gap-2 items-center">
      <p class="font-bold text-secondary uppercase text-sm">
        {new Date(ticket.expectedTime).toLocaleDateString("fr-FR", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </p>
      <div class="font-bold text-primary flex items-center justify-center gap-2 max-h-[60px]">
        <span class="text-[3.75rem]">{expectedTime} </span>
        <div class="border rounded-full p-1.5 self-start border-[#616163]">
          <div class=" h-2 w-2 rounded-full bg-[#616163]" />
        </div>
      </div>
      <p class="font-bold text-secondary uppercase text-sm">Horaire prévue</p>
    </div>

    <div class="border w-full border-dashed border-[#DFE5E7]"></div>
    {#if prestation}
      <div class="flex flex-col gap-2 items-center">
        <span class="text-primary">{prestation.name}</span>
        <span class="text-secondary">{prestation.duration} minutes</span>
      </div>
    {/if}
  </div>
</div>

<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import PlaceholderAvatar from "$lib/components/PlaceholderAvatar.svelte";
  import { displayWaitingTime } from "$lib/formater";
  import * as m from "$lib/paraglide/messages.js";
  import { languageTag } from "$src/lib/paraglide/runtime";
  import { shopStore } from "$src/lib/stores/basketStore";
  import { location } from "$src/lib/stores/location.store";
  import type { QueueInfo } from "$src/types/QueueLine";
  import { fly } from "svelte/transition";

  export let worker: QueueInfo;
  export let showInfo: boolean | undefined;
  export let index: number; //Needed for animation
  export let selectedWorkerId: number | null;
  export let selectedSlotTime: Date | undefined;
  // export let isFree: boolean | undefined;

  function createRecapUrl() {
    const newUrl =
      languageTag().split("-")[0] !== "fr"
        ? `/${languageTag().split("-")[0]}/${$location.location.id}/recap`
        : `/${$location.location.id}/recap`;
    const url = new URL(newUrl, $page.url.origin);
    url.searchParams.set("workerFilter", selectedWorkerId!.toString());
    url.searchParams.set("serviceId", $page.url.searchParams.get("serviceId")!);
    return url.toString();
  }

  $: theme = $location.location.theme;
</script>

<button
  in:fly|global={{ x: 40, duration: 300, delay: 100 * index }}
  on:click={() => {
    selectedWorkerId = worker.id;
    selectedSlotTime = worker.nextAvailable?.next;
    const _worker = $location.workers.find((w) => w.id === worker.id);
    shopStore.update((store) => {
      return { ...store, selectedProfessional: _worker, bookingDate: selectedSlotTime };
    });

    const href = createRecapUrl();
    goto(href);
  }}
  class="flex flex-col w-full bg-white box-border p-3 px-4 rounded-lg transition-all duration-300 ease-in-out border border-[#E5E7EB] {`${theme}FOCUSHOVER`}"
>
  <div class="flex flex-row items-center gap-4 w-full h-fit">
    {#if worker.avatar != null}
      <img src={worker.avatar} alt={worker.name} class="w-16 rounded-full aspect-square" />
    {:else}
      <PlaceholderAvatar shape="mini-circle" name={worker.name} />
    {/if}
    <div class="flex flex-col items-start">
      <p class="text-lg font-bold text-primary">{worker.name}</p>

      {#if worker.nextAvailable?.ticketBefore == 0}
        <span class="text-[#00D4AA] text-left text-sm font-bold">{m.available()}</span>
      {:else}
        <span
          class="{$location.location.theme === 'PINK'
            ? 'text-pink'
            : 'text-blue'} text-left text-sm font-bold"
        >
          {m.peopleInQueue({ number: worker.nextAvailable?.ticketBefore || 0 })}
        </span>
      {/if}
    </div>
    <div class="flex-1" />
    <div class="flex flex-col">
      <p class="flex flex-row gap-2 justify-end items-center text-lg font-bold">
        <!-- {#if worker.nextAvailable?.createHole}
          <img src={calendar} alt="calendar" />
        {:else}
          <img src={lightning} alt="lightning" />
        {/if} -->
        {worker.nextAvailable?.next ? displayWaitingTime(worker.nextAvailable?.next) : null}
      </p>
      <!-- {#if !isFree}
        <p class="text-right">
          +{displayPriceInDollars(150)}
        </p>
      {/if} -->
    </div>
  </div>

  {#if worker.nextAvailable?.isFirstSlot && !worker.nextAvailable?.createHole && showInfo}
    <p class="info text-left md:text-center w-full">
      {m.workerAvailable()}
    </p>
  {/if}
</button>

<style>
  .CARDENFOCUSHOVER:hover {
    background-color: #c7e0ff30;
  }

  .NEUTRALFOCUSHOVER:hover {
    background-color: #dfe5e730;
  }

  .PINKFOCUSHOVER:hover {
    background-color: #e5cef730;
  }

  .p .info {
    grid-area: info;
    border-radius: 4px;
    background: rgba(184, 254, 201, 0.5);
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    margin-top: 1rem;
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 4px;
  }
</style>

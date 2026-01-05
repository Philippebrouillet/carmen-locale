<script lang="ts">
  import { clock } from "$lib/stores/clock.svelte";
  import PlaceholderAvatar from "$lib/components/PlaceholderAvatar.svelte";
  import { displayDurationMs, displayWaitingTime } from "$lib/formater";
  import * as m from "$lib/paraglide/messages.js";
  import type { QueueInfo } from "$src/types/QueueLine";
  import { proBackgroundColorByFormatedStatus } from "$src/services/Location";
  import { location } from "$src/lib/stores/location.store";

  export let worker: QueueInfo;

  $: now = new Date($clock);
  $: next = worker?.nextAvailable?.next ? new Date(worker.nextAvailable.next) : new Date();
  $: duration = Math.floor(next.getTime() - now.getTime());
  $: isPinkThemeAndWaiting =
    $location.location.theme === "PINK" && worker.formatedStatus === "waiting";
  $: nextAvailableTime = worker.nextAvailable?.next;
</script>

{#if worker.avatar}
  <img src={worker.avatar} alt={worker.name} class="w-full aspect-square rounded-t-xl" />
{:else}
  <PlaceholderAvatar name={worker.name} shape="square" />
{/if}

<div class="flex flex-col mb-2 w-full mt-2">
  <h3 class="font-bold w-full text-primary">{worker.name}</h3>
  <div class="flex flex-row items-center gap-1">
    <!-- BULLET -->
    <!-- <div
      class="min-w-[0.35rem] w-[0.35rem] h-[0.35rem] aspect-square rounded-full {isPinkThemeAndWaiting
        ? 'bg-pink'
        : proBackgroundColorByFormatedStatus[worker.formatedStatus]}"
    /> -->

    {#if worker.formatedStatus === "unavailable" || nextAvailableTime == null}
      <p class=" text-[#DFE5E7] text-sm font-bold w-full">{m.unavailableShort()}</p>
    {:else if worker.formatedStatus == "available"}
      <p class="text-[#00D4AA] text-sm font-bold w-full">{m.availableNow()}</p>
    {:else if worker.formatedStatus == "waiting"}
      <p
        class={`text-sm font-bold w-full ${isPinkThemeAndWaiting ? "text-pink" : "text-[#0073FF]"}`}
      >
        {m.peopleInQueue({ number: worker.nextAvailable?.ticketBefore || 0 })}
      </p>
    {/if}
  </div>
</div>
<div class="relative flex flex-row items-center justify-between gap-2 w-full">
  <p class="text-xs text-[#616163]">{m.estimated_abrv()} {displayDurationMs(duration)}</p>

  <div class="rounded-l-md bg-[#DFE5E7] text-sm font-bold p-1 px-2 -mr-4">
    {displayWaitingTime(next)}
  </div>
</div>

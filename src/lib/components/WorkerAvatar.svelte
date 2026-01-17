<script lang="ts">
  import { displayWaitingTime } from "$lib/formater";
  import PlaceholderAvatar from "./PlaceholderAvatar.svelte";
  import * as m from "$lib/paraglide/messages.js";
  import type { QueueInfo } from "$src/types/QueueLine";
  import type { LocationTheme } from "$src/types/Location";
  import { proBackgroundColorByFormatedStatus } from "$src/services/Location";

  export let queue: QueueInfo;
  export let theme: LocationTheme;

  const workerBorderByStatus = {
    available: `border-[#00D4AA]`,
    waiting: `border-[#0073FF]`,
    unavailable: "border-[#DFE5E7]",
  };

  const workerBgByStatus = {
    available: `bg-[#00D4AA]`,
    waiting: `bg-[#0073FF]`,
    unavailable: "bg-[#DFE5E7]",
  };

  $: nextAvailableTime = queue.nextAvailable?.next;
  $: status = queue.formatedStatus;
  $: isPinkThemeAndWaiting = theme === "PINK" && status === "waiting";
</script>

<div class="flex flex-col gap-1 items-center flex-1">
  <div class="w-fit relative rounded-full {status}">
    {#if queue.avatar}
      <img
        alt={queue.name}
        src={queue.avatar}
        class="min-w-16 w-16 md:w-28 aspect-square rounded-full border-[3px] border-opacity-60 z-10 relative {isPinkThemeAndWaiting
          ? 'border-pink'
          : workerBorderByStatus[status]} "
      />
    {:else}
      <PlaceholderAvatar name={queue.name} />
    {/if}
    <div
      class:pulse-ring={status !== "unavailable"}
      class="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full bg-opacity-20 {workerBgByStatus[
        status
      ]}  pointer-events-none z-0"
    ></div>
    <div
      class:floating-ball={status === "available"}
      class="absolute bottom-[0.02rem] -right-[0.2rem] md:right-4 w-4 h-4 rounded-full border-2 border-white z-20
      {isPinkThemeAndWaiting ? 'bg-pink' : proBackgroundColorByFormatedStatus[status]}
    "
    />
  </div>

  <div class="whitespace-nowrap font-bold text-sm text-center md:text-xl mt-0.5">
    {queue.name}
  </div>

  <div class="status {status} text-xs font-normal md:text-md text-center">
    {#if queue.status == "STOPED" || status === "unavailable" || nextAvailableTime == null}
      <p class=" text-[#DFE5E7]">{m.unavailableShort()}</p>
    {:else if status == "available"}
      <p class="text-[#00D4AA]">{m.availableNow()}</p>
    {:else}
      <p class=" {isPinkThemeAndWaiting ? 'text-pink' : 'text-[#0073FF]'}">
        {displayWaitingTime(nextAvailableTime)}
      </p>
    {/if}
  </div>
</div>

<style>
  .floating-ball {
    animation: floating-ball 2s ease-in-out infinite;
  }
  .pulse-ring {
    animation: ring-pulse 2.2s ease-in-out infinite;
  }
  @keyframes ring-pulse {
    0% {
      transform: scale(1);
    }

    35% {
      transform: scale(1.07);
    }

    55% {
      transform: scale(1.03);
    }

    75% {
      transform: scale(1.05);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes floating-ball {
    0%,
    20% {
      transform: translateY(0) scale(1);
    }

    50% {
      transform: translateY(-8px) scale(1.12);
    }

    90%,
    100% {
      transform: translateY(0) scale(1);
    }
  }
</style>

<script lang="ts">
  import { displayWaitingTime } from "$lib/formater";
  import PlaceholderAvatar from "./PlaceholderAvatar.svelte";
  import * as m from "$lib/paraglide/messages.js";
  import type { QueueInfo } from "$src/types/QueueLine";
  import type { LocationTheme } from "$src/types/Location";
  import { proBackgroundColorByFormatedStatus } from "$src/services/Location";

  export let queue: QueueInfo;
  export let theme: LocationTheme;

  const wokerBorderByStatus = {
    available: `border-[#00D4AA]`,
    waiting: `border-[#0073FF]`,
    unavailable: "border-[#DFE5E7]",
  };

  const workerRingByStatus = {
    available: `ring-[#00D4AA]`,
    waiting: `ring-[#0073FF]`,
    unavailable: "ring-[#DFE5E7]",
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
        class="min-w-16 w-16 md:w-28 aspect-square rounded-full border-[3px] border-opacity-60 {isPinkThemeAndWaiting
          ? 'bg-pink'
          : wokerBorderByStatus[status]} ring-[3.5px] ring-opacity-20 {isPinkThemeAndWaiting
          ? 'ring-pink'
          : workerRingByStatus[status]}"
      />
    {:else}
      <PlaceholderAvatar name={queue.name} />
    {/if}
    <div
      class="absolute bottom-[0.02rem] -right-[0.2rem] md:right-4 w-4 h-4 rounded-full border-2 border-white
      {isPinkThemeAndWaiting ? 'bg-pink' : proBackgroundColorByFormatedStatus[status]}
    "
      class:animate-pulse={status === "available"}
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

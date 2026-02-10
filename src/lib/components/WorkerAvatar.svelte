<script lang="ts">
  import { displayWaitingTime } from "$lib/formater";
  import * as m from "$lib/paraglide/messages.js";
  import type { QueueInfo } from "$src/types/QueueLine";
  import type { LocationTheme } from "$src/types/Location";
  import { location } from "../stores/location.store";
  import WorkerPicture from "./WorkerPicture.svelte";

  export let queue: QueueInfo;
  export let theme: LocationTheme;

  $: nextAvailableTime = queue.nextAvailable?.next;
  $: status = queue.formatedStatus;
  $: isPinkThemeAndWaiting = theme === "PINK" && status === "waiting";
  $: link =
    status === "unavailable" ? "" : `/${$location.location.id}/services/?workerFilter=${queue.id}`;
</script>

<a href={link} class="flex flex-col gap-1 items-center flex-1">
  <WorkerPicture worker={queue} {status} />

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
</a>

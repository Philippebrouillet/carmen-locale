<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { clock } from "$lib/stores/clock.svelte";
  import { displayDuration, displayWaitingTime } from "$lib/formater";
  import PlaceholderAvatar from "./PlaceholderAvatar.svelte";
  import * as m from "$lib/paraglide/messages.js";
  import type { LocationTheme } from "$src/types/Location";
  import type { QueueInfo } from "$src/types/QueueLine";
  import { proBackgroundColorByFormatedStatus } from "$src/services/Location";

  export let worker: QueueInfo;
  export let href;
  export let background: string;
  export let theme: LocationTheme;

  $: now = new Date($clock);
  $: next = worker?.nextAvailable?.next ? new Date(worker.nextAvailable.next) : new Date();
  $: duration = Math.floor((next.getTime() - now.getTime()) / 1000);
  $: isPinkThemeAndWaiting = theme === "PINK" && status === "waiting";
  $: status = worker.formatedStatus;
  $: nextAvailableTime = worker.nextAvailable?.next;
  $: disabled = worker.formatedStatus === "unavailable";
</script>

<div
  class:opacity-90={disabled}
  class=" w-full rounded-[1.28rem] shadow-md overflow-hidden bg-white mx-auto"
>
  <div class="w-full aspect-square">
    {#if worker.avatar}
      <img
        class=" pointer-events-none w-full h-full md:w-[350px] md:h-[350px]"
        src={worker.avatar}
        alt={worker.name}
      />
    {:else}
      <PlaceholderAvatar name={worker.name} shape="square" />
    {/if}
  </div>

  <div class="flex flex-col p-4 md:p-6 gap-1">
    <div class="flex flex-row justify-between px-2">
      <h3 class="text-[1.38rem] font-bold">{worker.name}</h3>
      {#if status !== "unavailable"}
        <p class="text-[1.38rem] font-bold">{displayWaitingTime(next)}</p>
      {/if}
    </div>
    <div class="flex flex-row justify-between text-sm text-gray-600 font-semibold px-2">
      <div class="font-semibold flex flex-row items-center gap-1.5 md:text-md">
        <div
          class="min-w-4 w-4 h-4 aspect-square rounded-full {isPinkThemeAndWaiting
            ? 'bg-pink'
            : proBackgroundColorByFormatedStatus[status]}"
        />

        {#if status === "unavailable" || nextAvailableTime == null}
          <p class=" text-[#DFE5E7]">{m.unavailableShort()}</p>
        {:else if status == "available"}
          <p class="text-[#00D4AA]">{m.availableNow()}</p>
        {:else if status == "waiting"}
          <p class={isPinkThemeAndWaiting ? "text-pink" : "text-[#0073FF]"}>
            {m.peopleInQueue({ number: worker.nextAvailable?.ticketBefore || 0 })}
          </p>
        {/if}
      </div>

      {#if status === "waiting"}
        <p class="">{displayDuration(duration)}</p>
      {/if}
    </div>
    <Button
      {href}
      class="hover:scale-[0.96] w-full mt-4 {disabled
        ? 'opacity-20 cursor-not-allowed'
        : ''} {background}"
      on:click={(e) => {
        if (disabled) e.preventDefault();
      }}
    >
      {m.bookWith({ name: worker.name })}
    </Button>
  </div>
</div>

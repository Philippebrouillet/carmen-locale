<script lang="ts">
  import { proBackgroundColorByFormatedStatus } from "$src/services/Location";
  import type { FormatedProStatus } from "$src/types/Location";
  import { location } from "../stores/location.store";
  import PlaceholderAvatar from "./PlaceholderAvatar.svelte";

  export let worker: any;
  export let status: FormatedProStatus;
  export let withPointer = true;
  export let forceAnimation = false;
  export let isForceAnimationContext = false;

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

  $: isPinkThemeAndWaiting = $location?.location?.theme === "PINK" && status === "waiting";
  $: isForcingAnimation = isForceAnimationContext && forceAnimation;
  $: pulseRingEnabled =
    isForcingAnimation || (!isForceAnimationContext && status !== "unavailable");
</script>

<div class="w-fit relative rounded-full {status}">
  {#if worker.avatar}
    <img
      alt={worker.name}
      src={worker.avatar}
      class="min-w-16 w-16 md:w-28 aspect-square rounded-full border-[3px] border-opacity-60 z-10 relative {isPinkThemeAndWaiting
        ? 'border-pink'
        : workerBorderByStatus[status]} "
    />
  {:else}
    <PlaceholderAvatar name={worker.name} />
  {/if}
  <div
    class:pulse-ring={pulseRingEnabled}
    class="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full bg-opacity-20 {workerBgByStatus[
      status
    ]}  pointer-events-none z-0"
  ></div>

  {#if withPointer}
    <div
      class:floating-ball={status === "available"}
      class="absolute bottom-[0.02rem] -right-[0.2rem] md:right-4 w-4 h-4 rounded-full border-2 border-white z-20
      {isPinkThemeAndWaiting ? 'bg-pink' : proBackgroundColorByFormatedStatus[status]}
    "
    />
  {/if}
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

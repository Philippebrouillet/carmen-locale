<script lang="ts">
  import { Progress } from "$lib/components/ui/progress";
  import * as m from "$lib/paraglide/messages.js";
  import { displayPriceInDollars } from "$src/lib/formater";
  import { Store } from "lucide-svelte";

  export let queuePosition;
  export let queueInfo;
  export let queueLen;
  export let prestation;

  let ticketProgress: number = 60;

  const calculateTotalWait = (queueLen: any) => {
    let totalDurationSeconds = queueLen.reduce((total: any, item: any) => {
      return total + item.duration;
    }, 0);

    let totalDurationMinutes = totalDurationSeconds / 60;

    return totalDurationMinutes;
  };
</script>

<!-- <div class="bg-card border rounded-3xl shadow-xl py-6 px-6 md:py-8 md:px-8 flex flex-col gap-6">
  <h2 class="font-bold text-left text-xl md:text-2xl">
    {m.overviewTitle({ name: queueInfo.name })}
  </h2>
  <div class="flex flex-row items-center gap-4">
    <img src={queueInfo.avatar} class="rounded-full w-12 h-12" alt="profile" />
    <Progress value={ticketProgress}></Progress>
  </div>
  <div class="flex flex-row justify-between">
    <div class="flex flex-col">
      <p class="font-semibold text-lg">{queuePosition} {m.queueProgress()}</p>
      <p class="text-sm md:text-md opacity-50">
        {m.waitInfo({ duration: calculateTotalWait(queueLen) })}
      </p>
    </div>
    <div class="flex flex-row gap-1">
      {#each Array(5) as _}
        <div class="w-2 h-2 bg-gray-700 rounded-full" />
      {/each}
    </div>
  </div>
</div> -->
<div class="bg-white p-4 flex items-center rounded-2xl shadow-sm">
  <div class="flex gap-2">
    <img src={queueInfo.avatar} class="rounded-full w-14 h-14" alt="profile" />
    <div class="flex flex-col">
      <p class="font-bold text-lg text-primary">{queueInfo.name}</p>
      <p class="text-xs text-secondary">Le professionnel à votre service</p>
    </div>
  </div>
</div>
{#if prestation}
  <div class="bg-white p-4 flex items-center rounded-2xl shadow-sm -mt-2">
    <div class="flex justify-between gap-2 w-full font-bold text-sm text-primary">
      <div class="flex gap-2"><Store size="18" /><span class="">Reste à payer sur place</span></div>
      {displayPriceInDollars(
        prestation.discountedPrice ? prestation.discountedPrice : prestation.price,
      )}
    </div>
  </div>
{/if}

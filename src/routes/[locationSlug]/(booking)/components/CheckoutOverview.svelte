<script lang="ts">
  import PlaceholderAvatar from "$lib/components/PlaceholderAvatar.svelte";
  import { displayPriceInDollars } from "$lib/formater";

  import { fly } from "svelte/transition";
  import * as m from "$lib/paraglide/messages.js";
  import { languageTag } from "$lib/paraglide/runtime";
  import type { ServiceInfo, WorkerInfo } from "$src/types/Location";

  export let selectedProfessional: WorkerInfo;
  export let selectedService: ServiceInfo;
  export let bookingTime: Date;
  export let tipPercent: number | null;
  export let totalBill: number;
</script>

<div
  class="flex flex-col gap-4 justify-between bg-primary text-primary-foreground w-full h-fit p-4 rounded-2xl"
>
  <div class="flex flex-row justify-between">
    <div class="flex flex-row w-full gap-4">
      {#if selectedProfessional?.avatar}
        <img
          src={selectedProfessional ? selectedProfessional.avatar : null}
          alt="avatar"
          class="w-12 h-12 min-w-12 rounded-full object-cover {selectedProfessional
            ? 'visible'
            : 'hidden'} rounded-full"
        />
      {:else}
        <PlaceholderAvatar name={selectedProfessional?.name ?? "Null"} shape="mini-circle" />
      {/if}
      <div class="flex text-sm flex-col gap-1 w-full">
        <div class="w-full flex flex-row justify-between">
          <p in:fly={{ y: 5, duration: 400 }} class="text-lg font-bold">
            {selectedProfessional ? selectedProfessional.name : "Any Professional"}
          </p>
          <p class="text-lg font-bold">{displayPriceInDollars(totalBill)}</p>
        </div>

        {#if selectedService}
          <div class="w-full flex flex-row justify-between">
            <p>{selectedService.name}</p>
            <p>{displayPriceInDollars(selectedService.price)}</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div transition:fly={{ y: 20, duration: 400 }} class="flex text-md flex-row justify-between">
    <p class="font-bold">
      {bookingTime?.toLocaleDateString(languageTag(), {
        day: "numeric",
        month: "long",
      })} at {bookingTime?.toLocaleTimeString(languageTag(), {
        hour: "numeric",
        minute: "numeric",
      })}
    </p>
    <p>{(selectedService?.durationS ?? 0) / 60} min</p>
  </div>
</div>

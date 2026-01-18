<script lang="ts">
  import PlaceholderAvatar from "$lib/components/PlaceholderAvatar.svelte";

  import * as m from "$lib/paraglide/messages.js";
  import type { ServiceInfo, WorkerInfo } from "$src/types/Location";
  import type { PopupType } from "$src/types/PopupInfos";
  import { InfoIcon } from "lucide-svelte";

  import { fly } from "svelte/transition";

  export let selectedProfessional: WorkerInfo | null;
  export let selectedService: ServiceInfo | null;
  export let openPopupInfo: (type: PopupType) => void;
</script>

<div class="flex flex-row justify-between">
  <div class="flex flex-col w-full gap-4">
    <div class="w-10 h-10 min-w-10">
      {#if selectedProfessional?.avatar}
        <img
          in:fly={{ y: 5, duration: 400 }}
          src={selectedProfessional ? selectedProfessional.avatar : null}
          alt="avatar"
          class="w-full h-full object-cover {selectedProfessional
            ? 'visible'
            : 'hidden'} rounded-full"
        />
      {:else}
        <PlaceholderAvatar name={selectedProfessional?.name ?? "Null"} shape="mini-square" />
      {/if}
    </div>
    <div class="flex text-sm flex-col gap-4 w-full">
      <div
        in:fly={{ y: 5, duration: 400 }}
        class="flex flex-row justify-between items-center w-full text-sm text-primary font-normal"
      >
        <span>Professionnel</span>

        <span>
          {selectedProfessional ? selectedProfessional.name : m.anyProfessional()}
        </span>
      </div>

      {#if selectedService}
        <div
          transition:fly={{ y: 30 }}
          class="w-full flex flex-row justify-between items-center text-sm text-primary font-normal"
        >
          <p>{selectedService.name}</p>
          <p>{selectedService?.durationS / 60}min</p>
        </div>
      {/if}

      <div class="w-full border-t bg-[#DFE5E7]"></div>

      <button
        on:click={() => openPopupInfo("HOURS")}
        class="text-[#616163] text-sm flex gap-1 items-center underline underline-offset-4 decoration-dashed decoration-[#DFE5E7]"
      >
        Heure de passage estimée <span><InfoIcon size={12} /></span>
      </button>
    </div>
  </div>
</div>

<script lang="ts">
  import type { QueueInfo } from "$src/types/QueueLine";
  import { backgroundColorByTheme } from "$src/services/Location";
  import { location } from "$src/lib/stores/location.store";

  export let workers: QueueInfo[];
  export let selectedWorkerId: number | null;

  const backgroundColor = backgroundColorByTheme[$location.location.theme];
  $: _workers = [{ name: "Tous", id: -1 }, ...workers];
</script>

<div class="flex gap-2 overflow-x-auto md:mt-2 py-2">
  {#each _workers as worker}
    <button
      on:click={() => {
        selectedWorkerId = worker.id === -1 ? null : worker.id;
      }}
      class="flex justify-center items-center px-4 border py-2 hover:{backgroundColor} hover:text-white focus:{backgroundColor} {selectedWorkerId ===
        worker.id ||
      (selectedWorkerId === null && worker.id === -1)
        ? `${backgroundColor} text-white`
        : 'bg-white text-[#616163]'} rounded-2xl transition-all duration-100"
    >
      <h2 class="text-sm font-bold whitespace-nowrap">
        {worker.name}
      </h2>
    </button>
  {/each}
</div>

<script lang="ts">
  type TimeFilter = "morning" | "afternoon";

  export let selectedTimeFilter: TimeFilter = "morning";
  export let bgByTheme: string;
  const timeFilters: TimeFilter[] = ["morning", "afternoon"];

  const nameByFilter = {
    morning: "Matin",
    afternoon: "Après-midi",
  };
</script>

<div class="flex flex-row rounded-lg border overflow-hidden">
  {#each timeFilters as time, i}
    {@const isSelected = selectedTimeFilter === time}
    <button
      class=" p-2 px-3 w-full flex-1 items-start text-center relative {isSelected
        ? bgByTheme
        : 'bg-[#DFE5E7]'} transition-all duration-200 ease-in-out text-bold text-sm first-letter:uppercase"
      class:text-primary-foreground={isSelected}
      on:click={() => {
        selectedTimeFilter = time;
      }}
    >
      {nameByFilter[time]}
    </button>
  {/each}
</div>

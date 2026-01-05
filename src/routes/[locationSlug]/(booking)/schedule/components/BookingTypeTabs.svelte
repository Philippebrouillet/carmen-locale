<script lang="ts">
  import { setBookingType, shopStore } from "$lib/stores/basketStore";
  import { bookingTypes } from "$lib/types/bookingTypes";
</script>

<div class="flex flex-row rounded-lg border overflow-hidden">
  {#each bookingTypes as type, i}
    <button
      class=" p-2 px-3 w-full flex-1 items-start relative transition-all duration-300 ease-in-out {$shopStore.bookingType ===
      type.mode
        ? 'bg-primary text-primary-foreground'
        : 'bg-white'} "
      on:click={() => {
        setBookingType(type.mode);
      }}
    >
      <h3 class="flex flex-row items-center whitespace-nowrap gap-1 font-bold text-xs md:text-sm">
        <div class="scale-[0.8]">
          <svelte:component this={type.icon} />
        </div>
        {type.title}
      </h3></button
    >
  {/each}
</div>

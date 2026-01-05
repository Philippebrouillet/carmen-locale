<script lang="ts">
  import SuccessIcon from "$lib/assets/icons/SuccessIcon.svelte";
  import { fly } from "svelte/transition";

  export let index: number;
  export let icon: any;
  export let title: string;
  export let text1: string;
  export let text2: string;
  export let badge: string;
  export let href: string;
</script>

<a
  {href}
  in:fly|global={{ delay: 100 * index, y: 20, duration: 400 }}
  class="border bg-white rounded-xl p-4 md:p-6 flex flex-col gap-2 flex-1 items-start relative transition-all duration-300 ease-in-out hover:shadow-xl text-left"
>
  <h3 class="flex flex-row gap-2 font-bold text-lg text-left">
    <svelte:component this={icon} />
    {title}
  </h3>
  <p class="tile-subtitle">{text1}</p>
  <p class="tile-subtitle">{text2}</p>
  <div class="flex-1" />
  <div
    class="bg-[#23BBAC] text-primary-foreground text-sm font-semibold p-1 px-2 rounded-md ml-auto flex flex-row items-center gap-1"
  >
    <SuccessIcon />
    <p class="mb-[0.1rem]">{badge}</p>
  </div>
</a>

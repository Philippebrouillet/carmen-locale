<script lang="ts">
  import { fly } from "svelte/transition";

  export let sticky = true;
  export let style = "";
</script>

<div in:fly={{ y: 100, duration: 300 }} class="hidden lg:flex flex-col gap-6 items-center">
  <div
    class="flex flex-col items-center gap-12 min-w-72 border rounded-3xl shadow-xl py-6 px-6 md:py-8 md:px-8 {style}"
    class:sticky
    class:top-16={sticky}
  >
    <slot />
  </div>
</div>

<script lang="ts">
  export let title: string;
</script>

<div class="flex flex-col items-center gap-4 w-full my-2">
  <!-- <h2 class="font-bold text-xl md:text-2xl w-full tex-left mt-4">{title}</h2> -->
  <h2 class="font-bold text-lg md:text-2xl w-full text-left">{title}</h2>

  <div class="flex flex-col items-center gap-4 w-full">
    <slot />
  </div>
</div>

<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";
  import { fly } from "svelte/transition";

  type $$Props = HTMLAttributes<HTMLSpanElement> & {
    el?: HTMLSpanElement;
  };

  export let el: $$Props["el"] = undefined;
  export let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<span
  in:fly={{ y: 10, duration: 200 }}
  bind:this={el}
  role="link"
  aria-disabled="true"
  aria-current="page"
  class={cn("font-normal text-foreground", className)}
  {...$$restProps}
>
  <slot />
</span>

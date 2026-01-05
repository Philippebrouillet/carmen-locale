<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";
  import { fly } from "svelte/transition";

  type $$Props = HTMLAttributes<HTMLDivElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div
  in:fly={{ delay: 400, y: -20, duration: 400 }}
  out:fly={{ y: -20, duration: 400 }}
  class={cn("mt-4 px-2 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0", className)}
  {...$$restProps}
>
  <slot />
</div>

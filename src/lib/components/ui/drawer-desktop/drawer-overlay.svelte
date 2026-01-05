<script lang="ts">
  import { Drawer as DrawerPrimitive } from "vaul-svelte";
  import { cn } from "$lib/utils.js";

  type $$Props = DrawerPrimitive.OverlayProps;

  export let el: $$Props["el"] = undefined;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<DrawerPrimitive.Overlay
  bind:el
  class={cn("fixed left-0 bottom-0 right-0 top-0 h-screen   z-49 bg-black/40", className)}
  {...$$restProps}
>
  <slot />
</DrawerPrimitive.Overlay>

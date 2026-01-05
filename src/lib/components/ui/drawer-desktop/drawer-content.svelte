<script lang="ts">
  import { Drawer as DrawerPrimitive } from "vaul-svelte";
  import DrawerOverlay from "./drawer-overlay.svelte";
  import { cn } from "$lib/utils.js";

  type $$Props = DrawerPrimitive.ContentProps;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div class="absolute bottom-0 left-0 right-0 max-h-full">
  <DrawerOverlay />
  <DrawerPrimitive.Content
    class={cn(" z-50 flex h-fit flex-col rounded-t-[10px] border bg-white", className)}
    {...$$restProps}
  >
    <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"></div>
    <slot />
  </DrawerPrimitive.Content>
</div>

<script lang="ts">
  import { Progress as ProgressPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";
  import * as m from "$lib/paraglide/messages.js";

  type $$Props = ProgressPrimitive.Props;

  let className: $$Props["class"] = undefined;
  export let max: $$Props["max"] = 100;
  export let value: $$Props["value"] = undefined;
  export { className as class };
</script>

<ProgressPrimitive.Root
  class={cn("relative h-10 w-full  overflow-hidden rounded-lg bg-[#23BBAC]", className)}
  {...$$restProps}
>
  <div
    class="h-full w-full flex-1 bg-white/50 transition-all"
    style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
  ></div>
  <p class="absolute left-4 font-bold text-lg md:text-2xl text-white top-1 bottom-auto z-[50]">
    {m.ticketProgress()}
  </p>
</ProgressPrimitive.Root>

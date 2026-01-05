<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";

  import { Checkbox } from "$lib/components/ui/checkbox";
  import * as m from "$lib/paraglide/messages.js";
</script>

<div class="bg-white border rounded-3xl shadow-xl py-6 px-6 md:py-8 md:px-8 flex flex-col gap-4">
  <div class="flex gap-4 items-center">
    <Checkbox />
    <p class="text-sm md:text-md">
      {m.smsAlert()}
    </p>
  </div>
  <Button variant="outline" class=" w-full">{m.validateSms()}</Button>
  <p class="text-sm md:text-md">
    {m.loyaltyProgram()}
  </p>
  <Button class="w-full">{m.receiveSmsAlert()}</Button>
</div>

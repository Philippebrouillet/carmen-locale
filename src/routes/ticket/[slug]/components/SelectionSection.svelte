<script lang="ts">
  import Section from "$lib/components/Section.svelte";
  import { Button } from "$lib/components/ui/button";
  import { displayPriceInDollars } from "$lib/formater";
  import * as m from "$lib/paraglide/messages.js";

  export let ticket;
</script>

<Section title={m.yourSelection()}>
  <div class="border rounded-3xl shadow-xl py-6 px-6 md:py-8 md:px-8 bg-white w-full flex flex-col gap-4">
    <div class="flex flex-row justify-between items-center">
      <h2 class="font-bold text-xl">{m.benefit()}</h2>
      <Button size="sm" variant="outline">{m.change()}</Button>
    </div>
    <div class="flex flex-col gap-1">
      <p>
        {ticket.details.prestations[0].name}: {displayPriceInDollars(
          ticket.details.prestations[0].price,
        )}
      </p>
      <p>{m.duration()} : {ticket.details.prestations[0].duration} min</p>
    </div>
  </div>
</Section>

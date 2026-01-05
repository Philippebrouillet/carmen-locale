<script lang="ts">
  import Section from "$lib/components/Section.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as m from "$lib/paraglide/messages.js";

  export let ticket;
</script>

<Section title={m.buyCoffee()}>
  <div class="bg-white border rounded-3xl shadow-xl py-6 px-6 md:py-8 md:px-8 h-fit flex flex-row gap-6 w-full">
    <div class="grow w-full bg-gray-400 hidden md:inline-block rounded-sm" />
    <div class="gap-3 h-fit flex flex-col">
      <p class="mb-4">
        {m.messageBoxGreeting()}
        {ticket.details.name},
        <br />
        <br />
        {m.messageBox1()}
        <br />
        <br />
        {m.messageBox2()}
      </p>
      <Button class="w-full gap-2 flex items-center">{m.donate()}</Button>
      <Button variant="outline" class="w-full gap-2">{m.rateApp()}</Button>
      <Button variant="outline" class="w-full gap-2">{m.joinSocialNetworks()}</Button>
    </div>
  </div>
</Section>

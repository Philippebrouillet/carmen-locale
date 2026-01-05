<script lang="ts">
  import { displayPriceInDollars } from "$lib/formater.js";
  import type { TicketInfo } from "$src/types/Location";

  export let ticket: TicketInfo;
</script>

<div class="ticket">
  {#if ticket.details && ticket.details.tickettype == "BREAK"}
    <div>PAUSE</div>
  {:else}
    <div class="number">{(ticket.details.number ?? "").toString().padStart(2, "0")}</div>
    <div>
      <div>{ticket.details.name ?? "Ticket X"}</div>
      {#each ticket.details.prestations ?? [] as service}
        <div>{service.name} {displayPriceInDollars(service.price)}</div>
      {/each}
    </div>
    <div>
      <div>time</div>
      <div>duration</div>
      {#if ticket.rdvTime != null}
        <div>RDV</div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .ticket {
    display: flex;
    flex: row;
    border-radius: 5px;
    background-color: lightgray;
    overflow: hidden;
  }
  .number {
    background-color: black;
    color: white;
    padding: 0.3rem;
  }
</style>

<script lang="ts">
  import placeholder from "$lib/assets/avatar.svg";

  import { clock } from "$lib/stores/clock.svelte";
  import { location } from "$lib/stores/location.store";
  import type { LocationInfoResp, TicketInfo } from "$src/types/Location";
  import Ticket from "./Ticket.svelte";

  let now = new Date($clock);

  $: queues = computeQueuelines($location);

  function isTicketDone(ticket: TicketInfo) {
    return ticket.doneTime != null || ticket.canceledTime != null;
  }

  function computeQueuelines(location: LocationInfoResp) {
    let res = [];
    for (let worker of location.workers) {
      res.push({
        id: worker.id,
        avatar: worker.avatar ?? placeholder,
        name: worker.name,
        tickets: location.tickets.filter(
          (t) =>
            !isTicketDone(t) &&
            t.workerId != null &&
            t.workerId.toString() === worker.id.toString(),
        ),
      });
    }
    res.sort((a, b) => (a.name > b.name ? 1 : -1));

    res.push({
      id: `${location.location.slug}-waiting`,
      avatar: location.location.avatar,
      name: "En attente",
      tickets: location.tickets.filter((t) => !isTicketDone(t) && t.workerId == null),
    });

    res.push({
      id: `${location.location.slug}-waiting`,
      name: "Terminer",
      tickets: location.tickets.filter(isTicketDone),
    });

    return res;
  }
</script>

<div class="queue-lines">
  {#each queues as q (q.id)}
    <div id={q.id.toString()} class="queue">
      <header>
        <img src={q.avatar} alt={q.name} width="32" height="32" />
        <h3>{q.name}</h3>
      </header>
      <div class="started"></div>
      <button>Suivant</button>

      <ul>
        {#each q.tickets as ticket (ticket.id)}
          <Ticket {ticket} />
        {/each}
      </ul>
    </div>
  {/each}
</div>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  header img {
    border-radius: 50%;
  }
  .queue-lines {
    display: flex;
    flex-direction: row;
  }
  .queue {
    flex: 1;
    margin: 1rem;
    min-width: 300px;
    display: flex;
    flex-direction: column;
  }
  .queue button {
    padding: 0.3rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .queue ul {
    margin: 0;
    padding: 0;
  }

  .started {
    min-width: 100%;
    height: 50px;
    border: 2px solid blue;
    border-radius: 5px;
  }
</style>

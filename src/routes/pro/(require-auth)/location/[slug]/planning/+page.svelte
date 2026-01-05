<script lang="ts">
  import { PUBLIC_CARDEN_API } from "$env/static/public";
  import Calendar from "$lib/components/Calendar.svelte";
  import Progress from "$lib/components/Progress.svelte";
  import WorkerTimeInput from "$lib/components/WorkerTimeInput.svelte";
  import { clock } from "$lib/stores/clock.svelte.js";
  import { getOrdinalDay, toUtcDate } from "$lib/formater.js";
  import type { LocationInfo, Planning, TicketInfo, WorkerInfo } from "$src/types/Location.js";

  export let data;

  let selected = new Date($clock);

  let workers: WorkerInfo[] = [];

  $: workers = data.locationInfo.workers;
  $: planning = data.planning;
  $: tickets = data.tickets;

  $: selectedPlanning =
    planning.filter(
      (p) => p.day[0] == toUtcDate(selected)[0] && p.day[1] == toUtcDate(selected)[1],
    ) ?? [];

  let workerWithPlanning: {
    worker: WorkerInfo;
    planning: Planning | null;
    tickets: TicketInfo[];
  }[] = [];

  $: workerWithPlanning = workers
    .map((w) => {
      let workerPlanning = selectedPlanning.find((p) => p.workerId == w.id) ?? null;
      return {
        worker: w,
        planning: workerPlanning,
        tickets: filterWorkerTickets(tickets, w, selected),
      };
    })
    .filter((wp) => (wp.planning && wp.planning.enabled) || wp.tickets.length > 0);

  $: startTimes = workerWithPlanning
    .map((w) => (w.planning ? new Date(w.planning.startTime).getTime() : null))
    .filter((t) => t != null);
  $: endTimes = workerWithPlanning
    .map((w) => (w.planning ? new Date(w.planning.endTime).getTime() : null))
    .filter((t) => t != null);
  $: start = new Date(Math.min(...startTimes));
  $: end = new Date(Math.max(...endTimes));
  $: hours = computeHours(start, end);

  function filterWorkerTickets(tickets: TicketInfo[], worker: WorkerInfo, selectedDate: Date) {
    let selectedTickets = tickets.filter((t) => t.workerId == worker.id);
    return selectedTickets;
  }

  function computeHours(start: Date, end: Date) {
    let hours: Date[] = [];
    if (start == null || end == null) {
      return hours;
    }

    const msPerHour = 3600 * 1000;

    for (let i = start.getTime(); i < end.getTime(); i += msPerHour / 2) {
      let slot = new Date(i);
      slot.setSeconds(0);
      hours.push(slot);
    }
    return hours;
  }

  async function updateWorkerTime(
    calendarId: number,
    selectedDate: Date,
    startTime: string,
    endTime: string,
  ) {
    if (startTime == null || endTime == null) {
      return;
    }

    let day = toUtcDate(selectedDate);

    let [startHour, startMinute] = startTime.split(":");
    let [endHour, endMinute] = endTime.split(":");

    let start = new Date(selected);
    start.setHours(+startHour, +startMinute);
    let end = new Date(selected);
    end.setHours(+endHour, +endMinute);

    fetch(`${PUBLIC_CARDEN_API}/admin/calendars/${calendarId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startTime: Math.floor(start.getTime() / 1000),
        endTime: Math.floor(end.getTime() / 1000),
      }),
    });
    // refresh plannings
  }

  async function createCalendar(location: LocationInfo, worker: WorkerInfo, selectedDate: Date) {
    let year = selectedDate.getUTCFullYear();
    let day = getOrdinalDay(selectedDate);

    let start = new Date(selectedDate);
    start.setHours(9, 0, 0, 0);
    let end = new Date(selectedDate);
    end.setHours(18, 0, 0, 0);

    fetch(`${PUBLIC_CARDEN_API}/admin/calendars`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workerId: worker.id,
        locationId: location.id,
        day: [year, day],
        startTime: Math.floor(start.getTime() / 1000),
        endTime: Math.floor(end.getTime() / 1000),
        enabled: true,
      }),
    });
  }

  async function toggleCalendar(calendarId: number, enabled: boolean) {
    fetch(`${PUBLIC_CARDEN_API}/admin/calendars/${calendarId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enabled }),
    });
  }
</script>

<main>
  <div class="column">
    <Calendar bind:selected />
    {#each workers as worker (worker.id)}
      <WorkerTimeInput
        {worker}
        planning={selectedPlanning.find((p) => p.workerId == worker.id) ?? null}
        on:create={(e) => createCalendar(data.locationInfo.location, e.detail.worker, selected)}
        on:statusChange={(e) => toggleCalendar(e.detail.planning.id, e.detail.enabled)}
        on:timeChange={(e) =>
          updateWorkerTime(e.detail.planning.id, selected, e.detail.startTime, e.detail.endTime)}
      />
    {/each}
  </div>
  {#if workerWithPlanning.length == 0}
    <div>FERMER</div>
  {:else}
    <table>
      <thead>
        <tr>
          <th class="range"></th>
          {#each workerWithPlanning as wp}
            <th class="worker">{wp.worker.name}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each hours as hour}
          <tr>
            <td class="range">
              {hour.toLocaleTimeString("FR", { hour: "2-digit", minute: "2-digit" })}
            </td>
            {#each workerWithPlanning as worker}
              {#if worker.planning && new Date(worker.planning.startTime).getTime() <= hour.getTime()}
                <td class="worker"><Progress value={0} /></td>
              {:else}
                <td class="worker disabled"><Progress disabled /></td>
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: row;
  }
  .column {
    display: flex;
    flex-direction: column;
    height: fit-content;
  }
  .range {
    width: 5em;
  }
  table {
    flex: 1;
  }
  tr {
    display: flex;
  }

  td:first-child {
    background-color: rgba(0, 0, 100, 0.1);
    text-align: center;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
  }
  td.worker,
  th.worker {
    flex: 1;
    text-align: center;
  }
  .worker.disabled {
    border-radius: 5px;
    padding: 3px;
  }
</style>

<script lang="ts">
  import { page } from "$app/stores";
  import { PUBLIC_CARDEN_API } from "$env/static/public";
  import { location } from "$src/lib/stores/location.store.js";
  import { formatLocationResponse, mainBackgroundColorByTheme } from "$src/services/Location.js";
  import type { QueueLineSSEvent } from "$src/types/QueueLine.js";
  import { onDestroy, onMount, setContext } from "svelte";

  export let data;

  let eventSource: EventSource | null = null;

  location.set(data);

  async function refreshLocation() {
    const slug = $page.params.locationSlug;
    const resp = await fetch(`${PUBLIC_CARDEN_API}/api/v2/location/${slug}`);
    if (resp.ok) {
      const json = await resp.json();
      const locationInfo = formatLocationResponse(json);
      location.set(locationInfo);
    }
  }

  function onSyncEvent(mess: MessageEvent<any>) {
    const parsed = JSON.parse(mess.data);

    if (parsed.type == "sync-v2") {
      refreshLocation();
    } else if (parsed.type == "updateWorkerTime") {
      location.update((l) => {
        const copy = JSON.parse(JSON.stringify(l));
        return {
          ...copy,
          workers: copy.workers.map((w) => {
            if (w.id === parsed.workerId) {
              return {
                ...w,
                startHour: parsed.startHour,
                startMinute: parsed.startMinute,
                endHour: parsed.endHour,
                endMinute: parsed.endMinute,
              };
            }
            return w;
          }),
        };
      });
    } else if (parsed.type == "sync") {
      const queues: QueueLineSSEvent[] = parsed.queueLines ?? [];
      const tickets = queues
        .flatMap((q) => q.tickets)
        .map((t) => {
          return {
            id: t.id,
            workerId: t.doctorId,
            durationS: t.durationS,
            expectedTime: new Date(t.expectedTime),
            canceledTime: t.canceledTime ? new Date(t.canceledTime) : null,
            doneTime: t.doneTime ? new Date(t.doneTime) : null,
            rdvTime: t.rdvTime ? new Date(t.rdvTime) : null,
            startedTime: t.startedTime ? new Date(t.startedTime) : null,
            details: null,
          };
        });

      const workers = queues
        .filter((q) => q.doctorId != null) // only keep queues with doctorId // worker with doctorId is worker showable
        .map((w) => ({
          id: w.id,
          name: w.name,
          avatar: w.avatar,
          status: w.status,
          tickets: tickets.filter((t) => t.workerId == w.id),
        }));

      location.update((l) => {
        const copy = JSON.parse(JSON.stringify(l));

        copy.workers = l.workers.map((w) => {
          return {
            ...w,
            ...workers.find((newW) => newW.id == w.id),
            // nextAvailableTime: null,
          };
        });

        return copy;
      });
    }
  }

  onMount(() => {
    if ($location == undefined || $location == null) {
      location.set(data);
      return;
    }
    if ($location.location.slug != data.location.slug || eventSource == null) {
      if (eventSource != null) {
        eventSource.close();
        eventSource = null;
      }
      eventSource = new EventSource(
        //`${PUBLIC_CARDEN_API}/api/v5/events/sse?locations=[${data.location.slug}]`
        `${PUBLIC_CARDEN_API}/api/v2/location/events?token=${data.location.id}`,
      );

      eventSource.onopen = () => {};
      eventSource.onmessage = onSyncEvent;
      eventSource.onerror = (err) => {
        console.error(`[!] sse error ${err}`);
      };
    }
    location.set(data);
  });

  onDestroy(() => {
    if (eventSource != null) {
      eventSource.close();
      eventSource = null;
    }
  });
</script>

<svelte:head>
  <script src="https://js.stripe.com/v3" async></script>
</svelte:head>
<main class={mainBackgroundColorByTheme[$location.location.theme]}>
  <slot />
</main>

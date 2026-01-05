import { PUBLIC_CARDEN_API } from "$env/static/public";
import { clock } from "$lib/stores/clock.svelte";
import { toUtcDate } from "$lib/formater";
import type { Planning, ServerTicketInfo } from "$src/types/Location";

export async function load({ fetch, params, parent }) {
  let locationSlug = params.slug;
  let data = await parent();
  let start = new Date();
  clock.subscribe((v) => (start = new Date(v)));
  start.setDate(1);

  let end = new Date(start);
  end.setMonth(start.getMonth() + 1);

  let start_day = toUtcDate(start);
  let end_day = toUtcDate(end);

  let location = data.locationInfo.location;
  let planningUrl = `${PUBLIC_CARDEN_API}/admin/calendars?location=${location.id}`;

  let resp = await fetch(planningUrl, { credentials: "include" });

  if (!resp.ok) {
    return { planning: [], tickets: [] };
  }

  let json = await resp.json();

  let tickets: ServerTicketInfo[] = data.locationInfo.tickets ?? [];

  let planning: Planning[] = json;

  return {
    planning,
    tickets: tickets.map((t) => {
      return {
        id: t.id,
        workerId: t.workerId,
        durationS: t.durationS,
        canceledTime: t.canceledTime ? new Date(t.canceledTime * 1000) : null,
        doneTime: t.doneTime ? new Date(t.doneTime * 1000) : null,
        rdvTime: t.rdvTime ? new Date(t.rdvTime * 1000) : null,
        startedTime: t.startedTime ? new Date(t.startedTime * 1000) : null,
        details: t.details,
      };
    }),
  };
}

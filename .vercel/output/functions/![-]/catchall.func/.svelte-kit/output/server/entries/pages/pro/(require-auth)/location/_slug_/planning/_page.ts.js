import { P as PUBLIC_CARDEN_API } from "../../../../../../../chunks/public.js";
import { c as clock } from "../../../../../../../chunks/clock.svelte.js";
import { t as toUtcDate } from "../../../../../../../chunks/formater.js";
async function load({ fetch, params, parent }) {
  params.slug;
  let data = await parent();
  let start = /* @__PURE__ */ new Date();
  clock.subscribe((v) => start = new Date(v));
  start.setDate(1);
  let end = new Date(start);
  end.setMonth(start.getMonth() + 1);
  toUtcDate(start);
  toUtcDate(end);
  let location = data.locationInfo.location;
  let planningUrl = `${PUBLIC_CARDEN_API}/admin/calendars?location=${location.id}`;
  let resp = await fetch(planningUrl, { credentials: "include" });
  if (!resp.ok) {
    return { planning: [], tickets: [] };
  }
  let json = await resp.json();
  let tickets = data.locationInfo.tickets ?? [];
  let planning = json;
  return {
    planning,
    tickets: tickets.map((t) => {
      return {
        id: t.id,
        workerId: t.workerId,
        durationS: t.durationS,
        canceledTime: t.canceledTime ? new Date(t.canceledTime * 1e3) : null,
        doneTime: t.doneTime ? new Date(t.doneTime * 1e3) : null,
        rdvTime: t.rdvTime ? new Date(t.rdvTime * 1e3) : null,
        startedTime: t.startedTime ? new Date(t.startedTime * 1e3) : null,
        details: t.details
      };
    })
  };
}
export {
  load
};

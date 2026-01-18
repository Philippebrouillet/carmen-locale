import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, e as escape, d as each, a as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import { c as clock } from "../../../../chunks/clock.svelte.js";
import { l as location } from "../../../../chunks/location.store.js";
import { d as displayPriceInDollars } from "../../../../chunks/formater.js";
const placeholder = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIEdlbmVyYXRvcjogU1ZHIFJlcG8gTWl4ZXIgVG9vbHMgLS0+Cjxzdmcgd2lkdGg9IjgwMHB4IiBoZWlnaHQ9IjgwMHB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPGcgY29sb3I9IiMwMDAwMDAiIGZvbnQtd2VpZ2h0PSI0MDAiIGZvbnQtZmFtaWx5PSJVYnVudHUiIGxldHRlci1zcGFjaW5nPSIwIiB3b3JkLXNwYWNpbmc9IjAiIHdoaXRlLXNwYWNlPSJub3JtYWwiIGZpbGw9ImdyYXkiPg0KICAgICAgICA8cGF0aCBkPSJNOCAyYTIuODQgMi44NCAwIDAgMC0xLjEyLjIyMWMtLjM0NS4xNDEtLjY1MS4zNDgtLjkwNi42MTV2LjAwM2wtLjAwMS4wMDJjLS4yNDguMjY5LS40NC41OTItLjU3NC45Ni0uMTM3LjM2Ny0uMjAzLjc2OS0uMjAzIDEuMiAwIC40MzUuMDY1Ljg0MS4yMDMgMS4yMDkuMTM1LjM2MS4zMjcuNjguNTc0Ljk1bC4wMDEuMDAyYy4yNTQuMjY3LjU1OC40NzcuOTAxLjYyNHYuMDAzYy4zNDYuMTQxLjcyMy4yMSAxLjEyLjIxLjM5NSAwIC43Ny0uMDY5IDEuMTE3LS4yMXYtLjAwMmMuMzQzLS4xNDcuNjQ0LS4zNTcuODkyLS42MjUuMjU1LS4yNjguNDUtLjU5LjU4Ni0uOTUyLjEzOC0uMzY4LjIwNC0uNzc0LjIwNC0xLjIxaC4wMWMwLS40My0uMDY1LS44MzEtLjIwMy0xLjE5OGEyLjc3MSAyLjc3MSAwIDAgMC0uNTg1LS45NjMgMi41IDIuNSAwIDAgMC0uODk3LS42MThBMi44MzUgMi44MzUgMCAwIDAgNy45OTkgMnpNOC4wMjQgMTAuMDAyYy0yLjMxNyAwLTMuNTYxLjIxMy00LjQ4Ni45MS0uNDYyLjM1LS43NjcuODI1LS45MzkgMS4zNzgtLjE3Mi41NTMtLjIyNi45NzUtLjIyOCAxLjcxTDggMTQuMDAyaDUuNjI5Yy0uMDAxLS43MzYtLjA1Mi0xLjE1OS0uMjI1LTEuNzEyLS4xNzItLjU1My0uNDc3LTEuMDI3LS45NC0xLjM3Ni0uOTIzLS42OTctMi4xMjQtLjkxMi00LjQ0LS45MTJ6IiBzdHlsZT0ibGluZS1oZWlnaHQ6MTI1JTstaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOidVYnVudHUsIE5vcm1hbCc7Zm9udC12YXJpYW50LWxpZ2F0dXJlczpub3JtYWw7Zm9udC12YXJpYW50LXBvc2l0aW9uOm5vcm1hbDtmb250LXZhcmlhbnQtY2Fwczpub3JtYWw7Zm9udC12YXJpYW50LW51bWVyaWM6bm9ybWFsO2ZvbnQtdmFyaWFudC1hbHRlcm5hdGVzOm5vcm1hbDtmb250LWZlYXR1cmUtc2V0dGluZ3M6bm9ybWFsO3RleHQtaW5kZW50OjA7dGV4dC1hbGlnbjpzdGFydDt0ZXh0LWRlY29yYXRpb24tbGluZTpub25lO3RleHQtZGVjb3JhdGlvbi1zdHlsZTpzb2xpZDt0ZXh0LWRlY29yYXRpb24tY29sb3I6IzAwMDAwMDt0ZXh0LXRyYW5zZm9ybTpub25lO3RleHQtb3JpZW50YXRpb246bWl4ZWQ7c2hhcGUtcGFkZGluZzowO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbCIgb3ZlcmZsb3c9InZpc2libGUiLz4NCiAgICA8L2c+DQo8L3N2Zz4=";
const css$1 = {
  code: ".ticket.svelte-woksiy{display:flex;flex:row;border-radius:5px;background-color:lightgray;overflow:hidden}.number.svelte-woksiy{background-color:black;color:white;padding:0.3rem}",
  map: '{"version":3,"file":"Ticket.svelte","sources":["Ticket.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { displayPriceInDollars } from \\"$lib/formater.js\\";\\nexport let ticket;\\n<\/script>\\n\\n<div class=\\"ticket\\">\\n  {#if ticket.details && ticket.details.tickettype == \\"BREAK\\"}\\n    <div>PAUSE</div>\\n  {:else}\\n    <div class=\\"number\\">{(ticket.details.number ?? \\"\\").toString().padStart(2, \\"0\\")}</div>\\n    <div>\\n      <div>{ticket.details.name ?? \\"Ticket X\\"}</div>\\n      {#each ticket.details.prestations ?? [] as service}\\n        <div>{service.name} {displayPriceInDollars(service.price)}</div>\\n      {/each}\\n    </div>\\n    <div>\\n      <div>time</div>\\n      <div>duration</div>\\n      {#if ticket.rdvTime != null}\\n        <div>RDV</div>\\n      {/if}\\n    </div>\\n  {/if}\\n</div>\\n\\n<style>\\n  .ticket {\\n    display: flex;\\n    flex: row;\\n    border-radius: 5px;\\n    background-color: lightgray;\\n    overflow: hidden;\\n  }\\n  .number {\\n    background-color: black;\\n    color: white;\\n    padding: 0.3rem;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA0BE,qBAAQ,CACN,OAAO,CAAE,IAAI,CACb,IAAI,CAAE,GAAG,CACT,aAAa,CAAE,GAAG,CAClB,gBAAgB,CAAE,SAAS,CAC3B,QAAQ,CAAE,MACZ,CACA,qBAAQ,CACN,gBAAgB,CAAE,KAAK,CACvB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,MACX"}'
};
const Ticket = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { ticket } = $$props;
  if ($$props.ticket === void 0 && $$bindings.ticket && ticket !== void 0) $$bindings.ticket(ticket);
  $$result.css.add(css$1);
  return `<div class="ticket svelte-woksiy">${ticket.details && ticket.details.tickettype == "BREAK" ? `<div data-svelte-h="svelte-8houmo">PAUSE</div>` : `<div class="number svelte-woksiy">${escape((ticket.details.number ?? "").toString().padStart(2, "0"))}</div> <div><div>${escape(ticket.details.name ?? "Ticket X")}</div> ${each(ticket.details.prestations ?? [], (service) => {
    return `<div>${escape(service.name)} ${escape(displayPriceInDollars(service.price))}</div>`;
  })}</div> <div><div data-svelte-h="svelte-w85nr7">time</div> <div data-svelte-h="svelte-1lgoeh0">duration</div> ${ticket.rdvTime != null ? `<div data-svelte-h="svelte-1blc4yy">RDV</div>` : ``}</div>`} </div>`;
});
const css = {
  code: "header.svelte-16ssirq.svelte-16ssirq{display:flex;flex-direction:row;align-items:center}header.svelte-16ssirq img.svelte-16ssirq{border-radius:50%}.queue-lines.svelte-16ssirq.svelte-16ssirq{display:flex;flex-direction:row}.queue.svelte-16ssirq.svelte-16ssirq{flex:1;margin:1rem;min-width:300px;display:flex;flex-direction:column}.queue.svelte-16ssirq button.svelte-16ssirq{padding:0.3rem;margin-top:1rem;margin-bottom:1rem}.queue.svelte-16ssirq ul.svelte-16ssirq{margin:0;padding:0}.started.svelte-16ssirq.svelte-16ssirq{min-width:100%;height:50px;border:2px solid blue;border-radius:5px}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import placeholder from \\"$lib/assets/avatar.svg\\";\\nimport { clock } from \\"$lib/stores/clock.svelte\\";\\nimport { location } from \\"$lib/stores/location.store\\";\\nimport Ticket from \\"./Ticket.svelte\\";\\nlet now = new Date($clock);\\n$: queues = computeQueuelines($location);\\nfunction isTicketDone(ticket) {\\n  return ticket.doneTime != null || ticket.canceledTime != null;\\n}\\nfunction computeQueuelines(location2) {\\n  let res = [];\\n  for (let worker of location2.workers) {\\n    res.push({\\n      id: worker.id,\\n      avatar: worker.avatar ?? placeholder,\\n      name: worker.name,\\n      tickets: location2.tickets.filter(\\n        (t) => !isTicketDone(t) && t.workerId != null && t.workerId.toString() === worker.id.toString()\\n      )\\n    });\\n  }\\n  res.sort((a, b) => a.name > b.name ? 1 : -1);\\n  res.push({\\n    id: `${location2.location.slug}-waiting`,\\n    avatar: location2.location.avatar,\\n    name: \\"En attente\\",\\n    tickets: location2.tickets.filter((t) => !isTicketDone(t) && t.workerId == null)\\n  });\\n  res.push({\\n    id: `${location2.location.slug}-waiting`,\\n    name: \\"Terminer\\",\\n    tickets: location2.tickets.filter(isTicketDone)\\n  });\\n  return res;\\n}\\n<\/script>\\n\\n<div class=\\"queue-lines\\">\\n  {#each queues as q (q.id)}\\n    <div id={q.id.toString()} class=\\"queue\\">\\n      <header>\\n        <img src={q.avatar} alt={q.name} width=\\"32\\" height=\\"32\\" />\\n        <h3>{q.name}</h3>\\n      </header>\\n      <div class=\\"started\\"></div>\\n      <button>Suivant</button>\\n\\n      <ul>\\n        {#each q.tickets as ticket (ticket.id)}\\n          <Ticket {ticket} />\\n        {/each}\\n      </ul>\\n    </div>\\n  {/each}\\n</div>\\n\\n<style>\\n  header {\\n    display: flex;\\n    flex-direction: row;\\n    align-items: center;\\n  }\\n  header img {\\n    border-radius: 50%;\\n  }\\n  .queue-lines {\\n    display: flex;\\n    flex-direction: row;\\n  }\\n  .queue {\\n    flex: 1;\\n    margin: 1rem;\\n    min-width: 300px;\\n    display: flex;\\n    flex-direction: column;\\n  }\\n  .queue button {\\n    padding: 0.3rem;\\n    margin-top: 1rem;\\n    margin-bottom: 1rem;\\n  }\\n  .queue ul {\\n    margin: 0;\\n    padding: 0;\\n  }\\n\\n  .started {\\n    min-width: 100%;\\n    height: 50px;\\n    border: 2px solid blue;\\n    border-radius: 5px;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAyDE,oCAAO,CACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MACf,CACA,qBAAM,CAAC,kBAAI,CACT,aAAa,CAAE,GACjB,CACA,0CAAa,CACX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAClB,CACA,oCAAO,CACL,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAClB,CACA,qBAAM,CAAC,qBAAO,CACZ,OAAO,CAAE,MAAM,CACf,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IACjB,CACA,qBAAM,CAAC,iBAAG,CACR,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CACX,CAEA,sCAAS,CACP,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,aAAa,CAAE,GACjB"}'
};
function isTicketDone(ticket) {
  return ticket.doneTime != null || ticket.canceledTime != null;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let queues;
  let $location, $$unsubscribe_location;
  let $$unsubscribe_clock;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_clock = subscribe(clock, (value) => value);
  function computeQueuelines(location2) {
    let res = [];
    for (let worker of location2.workers) {
      res.push({
        id: worker.id,
        avatar: worker.avatar ?? placeholder,
        name: worker.name,
        tickets: location2.tickets.filter((t) => !isTicketDone(t) && t.workerId != null && t.workerId.toString() === worker.id.toString())
      });
    }
    res.sort((a, b) => a.name > b.name ? 1 : -1);
    res.push({
      id: `${location2.location.slug}-waiting`,
      avatar: location2.location.avatar,
      name: "En attente",
      tickets: location2.tickets.filter((t) => !isTicketDone(t) && t.workerId == null)
    });
    res.push({
      id: `${location2.location.slug}-waiting`,
      name: "Terminer",
      tickets: location2.tickets.filter(isTicketDone)
    });
    return res;
  }
  $$result.css.add(css);
  queues = computeQueuelines($location);
  $$unsubscribe_location();
  $$unsubscribe_clock();
  return `<div class="queue-lines svelte-16ssirq">${each(queues, (q) => {
    return `<div${add_attribute("id", q.id.toString(), 0)} class="queue svelte-16ssirq"><header class="svelte-16ssirq"><img${add_attribute("src", q.avatar, 0)}${add_attribute("alt", q.name, 0)} width="32" height="32" class="svelte-16ssirq"> <h3>${escape(q.name)}</h3></header> <div class="started svelte-16ssirq"></div> <button class="svelte-16ssirq" data-svelte-h="svelte-x84lcy">Suivant</button> <ul class="svelte-16ssirq">${each(q.tickets, (ticket) => {
      return `${validate_component(Ticket, "Ticket").$$render($$result, { ticket }, {}, {})}`;
    })}</ul> </div>`;
  })} </div>`;
});
export {
  Page as default
};

import { s as subscribe } from "../../../../../../../chunks/utils.js";
import { c as create_ssr_component, e as escape, d as each, b as createEventDispatcher, a as add_attribute, v as validate_component } from "../../../../../../../chunks/ssr.js";
import { c as clock } from "../../../../../../../chunks/clock.svelte.js";
import { t as toUtcDate } from "../../../../../../../chunks/formater.js";
const css$4 = {
  code: "nav.svelte-1hma2ik.svelte-1hma2ik{display:flex;flex-direction:row;width:-moz-fit-content;width:fit-content}nav.svelte-1hma2ik .date.svelte-1hma2ik{flex:1;margin-left:0.3rem;margin-right:0.3rem;min-width:10em;text-align:center}nav.svelte-1hma2ik .today.svelte-1hma2ik{margin-left:1rem}.calendar.svelte-1hma2ik.svelte-1hma2ik{display:grid;grid-template-columns:repeat(7, 1fr);padding:1rem}.week-day.svelte-1hma2ik.svelte-1hma2ik{text-align:center}.day.svelte-1hma2ik.svelte-1hma2ik{border:none;background:none;aspect-ratio:1;padding:5px;color:lightslategray;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.3s;border-radius:50%}.day.enabled.svelte-1hma2ik.svelte-1hma2ik{color:black}.day.svelte-1hma2ik.svelte-1hma2ik:hover{background-color:lightblue}.day.active.svelte-1hma2ik.svelte-1hma2ik{background-color:blue;color:white}",
  map: '{"version":3,"file":"Calendar.svelte","sources":["Calendar.svelte"],"sourcesContent":["<script>\\n  import { clock } from \\"$lib/stores/clock.svelte\\";\\n\\n  const msPerDay = 24 * 3600 * 1000;\\n  const week = [\\"L\\", \\"M\\", \\"M\\", \\"J\\", \\"V\\", \\"S\\", \\"D\\"];\\n\\n  export let selected = new Date($clock);\\n  let monthOffset = 0;\\n  let date = new Date(selected);\\n\\n  /** @type Date[] */\\n  $: days = computeDays(monthOffset);\\n\\n  /** @param {number} offset */\\n  function computeDays(offset) {\\n    monthOffset = offset;\\n    date.setFullYear(selected.getFullYear(), selected.getMonth() + monthOffset);\\n    date = date;\\n\\n    let monthFirstDay = new Date(date);\\n    monthFirstDay.setDate(1);\\n    // Sunday is 0\\n    let monthFirstWeekDay = monthFirstDay.getDay();\\n    // we start at monday\\n    let distFirst = (monthFirstWeekDay + 6) % 7;\\n    let firstDay = new Date(monthFirstDay.getTime() - distFirst * msPerDay);\\n\\n    let days = [];\\n    for (let i = 0; i < 7 * 6; i++) {\\n      let d = new Date(firstDay.getTime() + i * msPerDay);\\n      days.push(d);\\n    }\\n    return days;\\n  }\\n\\n  /**\\n   *\\n   * @param {Date} a\\n   * @param {Date} b\\n   */\\n  function isSameDay(a, b) {\\n    return Math.floor(a.getTime() / msPerDay) == Math.floor(b.getTime() / msPerDay);\\n  }\\n<\/script>\\n\\n<nav>\\n  <button on:click={() => (monthOffset = monthOffset - 1)}>{\\"<\\"}</button>\\n  <div class=\\"date\\">{date.toLocaleString(\\"default\\", { month: \\"long\\", year: \\"numeric\\" })}</div>\\n  <button on:click={() => (monthOffset = monthOffset + 1)}>{\\">\\"}</button>\\n  <button\\n    class=\\"today\\"\\n    on:click={() => {\\n      monthOffset = 0;\\n      selected = new Date($clock);\\n    }}>today</button\\n  >\\n</nav>\\n<div class=\\"calendar\\">\\n  {#each week as d}\\n    <div class=\\"week-day\\">{d}</div>\\n  {/each}\\n  {#each days as day}\\n    <button\\n      class=\\"day\\"\\n      class:enabled={day.getMonth() == date.getMonth()}\\n      class:active={isSameDay(day, selected)}\\n      on:click={() => (selected = day)}\\n    >\\n      <span>{day.getDate().toString().padStart(2, \\"0\\")}</span>\\n    </button>\\n  {/each}\\n</div>\\n\\n<style>\\n  nav {\\n    display: flex;\\n    flex-direction: row;\\n    width: -moz-fit-content;\\n    width: fit-content;\\n  }\\n  nav .date {\\n    flex: 1;\\n    margin-left: 0.3rem;\\n    margin-right: 0.3rem;\\n    min-width: 10em;\\n    text-align: center;\\n  }\\n  nav .today {\\n    margin-left: 1rem;\\n  }\\n  .calendar {\\n    display: grid;\\n    grid-template-columns: repeat(7, 1fr);\\n    padding: 1rem;\\n  }\\n  .week-day {\\n    text-align: center;\\n  }\\n  .day {\\n    border: none;\\n    background: none;\\n    aspect-ratio: 1;\\n    padding: 5px;\\n    color: lightslategray;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    cursor: pointer;\\n    transition: all 0.3s;\\n    border-radius: 50%;\\n  }\\n  .day.enabled {\\n    color: black;\\n  }\\n  .day:hover {\\n    background-color: lightblue;\\n  }\\n  .day.active {\\n    background-color: blue;\\n    color: white;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA0EE,iCAAI,CACF,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,KAAK,CAAE,gBAAgB,CACvB,KAAK,CAAE,WACT,CACA,kBAAG,CAAC,oBAAM,CACR,IAAI,CAAE,CAAC,CACP,WAAW,CAAE,MAAM,CACnB,YAAY,CAAE,MAAM,CACpB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,MACd,CACA,kBAAG,CAAC,qBAAO,CACT,WAAW,CAAE,IACf,CACA,uCAAU,CACR,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CACrC,OAAO,CAAE,IACX,CACA,uCAAU,CACR,UAAU,CAAE,MACd,CACA,kCAAK,CACH,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,YAAY,CAAE,CAAC,CACf,OAAO,CAAE,GAAG,CACZ,KAAK,CAAE,cAAc,CACrB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,GAAG,CAAC,IAAI,CACpB,aAAa,CAAE,GACjB,CACA,IAAI,sCAAS,CACX,KAAK,CAAE,KACT,CACA,kCAAI,MAAO,CACT,gBAAgB,CAAE,SACpB,CACA,IAAI,qCAAQ,CACV,gBAAgB,CAAE,IAAI,CACtB,KAAK,CAAE,KACT"}'
};
const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let days;
  let $clock, $$unsubscribe_clock;
  $$unsubscribe_clock = subscribe(clock, (value) => $clock = value);
  const msPerDay = 24 * 3600 * 1e3;
  const week = ["L", "M", "M", "J", "V", "S", "D"];
  let { selected = new Date($clock) } = $$props;
  let monthOffset = 0;
  let date = new Date(selected);
  function computeDays(offset) {
    monthOffset = offset;
    date.setFullYear(selected.getFullYear(), selected.getMonth() + monthOffset);
    date = date;
    let monthFirstDay = new Date(date);
    monthFirstDay.setDate(1);
    let monthFirstWeekDay = monthFirstDay.getDay();
    let distFirst = (monthFirstWeekDay + 6) % 7;
    let firstDay = new Date(monthFirstDay.getTime() - distFirst * msPerDay);
    let days2 = [];
    for (let i = 0; i < 7 * 6; i++) {
      let d = new Date(firstDay.getTime() + i * msPerDay);
      days2.push(d);
    }
    return days2;
  }
  function isSameDay(a, b) {
    return Math.floor(a.getTime() / msPerDay) == Math.floor(b.getTime() / msPerDay);
  }
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
  $$result.css.add(css$4);
  days = computeDays(monthOffset);
  $$unsubscribe_clock();
  return `<nav class="svelte-1hma2ik"><button>${escape("<")}</button> <div class="date svelte-1hma2ik">${escape(date.toLocaleString("default", { month: "long", year: "numeric" }))}</div> <button>${escape(">")}</button> <button class="today svelte-1hma2ik" data-svelte-h="svelte-lqvkty">today</button></nav> <div class="calendar svelte-1hma2ik">${each(week, (d) => {
    return `<div class="week-day svelte-1hma2ik">${escape(d)}</div>`;
  })} ${each(days, (day) => {
    return `<button class="${[
      "day svelte-1hma2ik",
      (day.getMonth() == date.getMonth() ? "enabled" : "") + " " + (isSameDay(day, selected) ? "active" : "")
    ].join(" ").trim()}"><span>${escape(day.getDate().toString().padStart(2, "0"))}</span> </button>`;
  })} </div>`;
});
const css$3 = {
  code: ":root{--progress:rgba(0, 184, 148, 0.5);--full:#e17055}.progressbar-wrapper.svelte-82b5r{background-color:#dfe6e9;color:white;border-radius:5px;width:100%}.progressbar.svelte-82b5r{color:white;padding:0.3rem;text-align:right;border-radius:5px;background-color:var(--progress)}.progressbar.full.svelte-82b5r{background-color:var(--full)}",
  map: '{"version":3,"file":"Progress.svelte","sources":["Progress.svelte"],"sourcesContent":["<script>\\n  export let value = 0;\\n  export let disabled = false;\\n\\n  let display = Math.floor(value * 100);\\n<\/script>\\n\\n<div class=\\"progressbar-wrapper\\">\\n  {#if !disabled}\\n    <div class=\\"progressbar\\" class:full={value == 1} style=\\"whidth:{display}%\\">{display}%</div>\\n  {/if}\\n</div>\\n\\n<style>\\n  :root {\\n    --progress: rgba(0, 184, 148, 0.5);\\n    --full: #e17055;\\n  }\\n\\n  .progressbar-wrapper {\\n    background-color: #dfe6e9;\\n    color: white;\\n    border-radius: 5px;\\n    width: 100%;\\n  }\\n\\n  .progressbar {\\n    color: white;\\n    padding: 0.3rem;\\n    text-align: right;\\n    border-radius: 5px;\\n    background-color: var(--progress);\\n  }\\n\\n  .progressbar.full {\\n    background-color: var(--full);\\n  }\\n</style>\\n"],"names":[],"mappings":"AAcE,KAAM,CACJ,UAAU,CAAE,sBAAsB,CAClC,MAAM,CAAE,OACV,CAEA,iCAAqB,CACnB,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,KAAK,CACZ,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,IACT,CAEA,yBAAa,CACX,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,MAAM,CACf,UAAU,CAAE,KAAK,CACjB,aAAa,CAAE,GAAG,CAClB,gBAAgB,CAAE,IAAI,UAAU,CAClC,CAEA,YAAY,kBAAM,CAChB,gBAAgB,CAAE,IAAI,MAAM,CAC9B"}'
};
const Progress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = 0 } = $$props;
  let { disabled = false } = $$props;
  let display = Math.floor(value * 100);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  $$result.css.add(css$3);
  return `<div class="progressbar-wrapper svelte-82b5r">${!disabled ? `<div class="${["progressbar svelte-82b5r", value == 1 ? "full" : ""].join(" ").trim()}" style="${"whidth:" + escape(display, true) + "%"}">${escape(display)}%</div>` : ``} </div>`;
});
const css$2 = {
  code: '.switch.svelte-1fqr7n.svelte-1fqr7n{position:relative;display:inline-block;width:60px;height:34px}.switch.svelte-1fqr7n input.svelte-1fqr7n{opacity:0;width:0;height:0}.slider.svelte-1fqr7n.svelte-1fqr7n{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:0.4s}.slider.svelte-1fqr7n.svelte-1fqr7n:before{position:absolute;content:"";height:26px;width:26px;left:4px;bottom:4px;background-color:white;transition:0.4s}input.svelte-1fqr7n:checked+.slider.svelte-1fqr7n{background-color:#2196f3}input.svelte-1fqr7n:focus+.slider.svelte-1fqr7n{box-shadow:0 0 1px #2196f3}input.svelte-1fqr7n:checked+.slider.svelte-1fqr7n:before{transform:translateX(26px)}.slider.round.svelte-1fqr7n.svelte-1fqr7n{border-radius:34px}.slider.round.svelte-1fqr7n.svelte-1fqr7n:before{border-radius:50%}',
  map: '{"version":3,"file":"ToggleSwitch.svelte","sources":["ToggleSwitch.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let value;\\n<\/script>\\n\\n<label class=\\"switch\\">\\n  <input type=\\"checkbox\\" checked={value} on:change />\\n  <span class=\\"slider round\\"></span>\\n</label>\\n\\n<style>\\n  /* The switch - the box around the slider */\\n  .switch {\\n    position: relative;\\n    display: inline-block;\\n    width: 60px;\\n    height: 34px;\\n  }\\n\\n  /* Hide default HTML checkbox */\\n  .switch input {\\n    opacity: 0;\\n    width: 0;\\n    height: 0;\\n  }\\n\\n  /* The slider */\\n  .slider {\\n    position: absolute;\\n    cursor: pointer;\\n    top: 0;\\n    left: 0;\\n    right: 0;\\n    bottom: 0;\\n    background-color: #ccc;\\n    transition: 0.4s;\\n  }\\n\\n  .slider:before {\\n    position: absolute;\\n    content: \\"\\";\\n    height: 26px;\\n    width: 26px;\\n    left: 4px;\\n    bottom: 4px;\\n    background-color: white;\\n    transition: 0.4s;\\n  }\\n\\n  input:checked + .slider {\\n    background-color: #2196f3;\\n  }\\n\\n  input:focus + .slider {\\n    box-shadow: 0 0 1px #2196f3;\\n  }\\n\\n  input:checked + .slider:before {\\n    transform: translateX(26px);\\n  }\\n\\n  /* Rounded sliders */\\n  .slider.round {\\n    border-radius: 34px;\\n  }\\n\\n  .slider.round:before {\\n    border-radius: 50%;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAUE,mCAAQ,CACN,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,CACrB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV,CAGA,qBAAO,CAAC,mBAAM,CACZ,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CACV,CAGA,mCAAQ,CACN,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,OAAO,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,gBAAgB,CAAE,IAAI,CACtB,UAAU,CAAE,IACd,CAEA,mCAAO,OAAQ,CACb,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,IAAI,CAAE,GAAG,CACT,MAAM,CAAE,GAAG,CACX,gBAAgB,CAAE,KAAK,CACvB,UAAU,CAAE,IACd,CAEA,mBAAK,QAAQ,CAAG,qBAAQ,CACtB,gBAAgB,CAAE,OACpB,CAEA,mBAAK,MAAM,CAAG,qBAAQ,CACpB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,OACtB,CAEA,mBAAK,QAAQ,CAAG,qBAAO,OAAQ,CAC7B,SAAS,CAAE,WAAW,IAAI,CAC5B,CAGA,OAAO,kCAAO,CACZ,aAAa,CAAE,IACjB,CAEA,OAAO,kCAAM,OAAQ,CACnB,aAAa,CAAE,GACjB"}'
};
const ToggleSwitch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  $$result.css.add(css$2);
  return `<label class="switch svelte-1fqr7n"><input type="checkbox" ${value ? "checked" : ""} class="svelte-1fqr7n"> <span class="slider round svelte-1fqr7n"></span> </label>`;
});
const css$1 = {
  code: ".worker-times.svelte-18lcvct.svelte-18lcvct{display:grid;grid-template-columns:auto 1fr;margin-right:1rem}.worker-times.svelte-18lcvct label.svelte-18lcvct{margin-right:1rem}.worker-status.svelte-18lcvct.svelte-18lcvct{flex:1;display:flex;flex-direction:row;align-items:center;padding:0.3rem}.worker-status.svelte-18lcvct img.svelte-18lcvct{border-radius:50%}.worker-status.svelte-18lcvct .name.svelte-18lcvct{flex:1;margin-left:1rem;margin-right:1rem}",
  map: '{"version":3,"file":"WorkerTimeInput.svelte","sources":["WorkerTimeInput.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { createEventDispatcher } from \\"svelte\\";\\nimport ToggleSwitch from \\"./ToggleSwitch.svelte\\";\\nexport let worker;\\nexport let planning = null;\\nlet startTime = (planning && dateToTime(new Date(planning.startTime))) ?? null;\\nlet endTime = (planning && dateToTime(new Date(planning.endTime))) ?? null;\\nlet enabled = planning?.enabled ?? false;\\nconst dispatch = createEventDispatcher();\\nfunction dateToTime(date) {\\n  let hh = date.getHours().toString().padStart(2, \\"0\\");\\n  let mm = date.getMinutes().toString().padStart(2, \\"0\\");\\n  return `${hh}:${mm}`;\\n}\\nfunction onTimeChange() {\\n  dispatch(\\"timeChange\\", {\\n    planning,\\n    startTime,\\n    endTime\\n  });\\n}\\nfunction onToggle() {\\n  dispatch(\\"statusChange\\", { planning, enabled });\\n}\\nfunction onCreate() {\\n  dispatch(\\"create\\", { worker });\\n}\\n<\/script>\\n\\n<div class=\\"worker-status\\">\\n  <img alt={worker.name} src={worker.avatar} height=\\"40\\" width=\\"40\\" />\\n  <div class=\\"name\\">{worker.name}</div>\\n  <div class=\\"worker-times\\">\\n    <label for=\\"start\\">Début : </label>\\n    <input\\n      id=\\"start\\"\\n      type=\\"time\\"\\n      value={startTime}\\n      disabled={planning == null}\\n      on:change={(e) => {\\n        if (e.currentTarget.value == null) {\\n          return;\\n        }\\n        startTime = e.currentTarget.value;\\n        onTimeChange();\\n      }}\\n      step=\\"120\\"\\n    />\\n    <label for=\\"end\\">Fin : </label>\\n    <input\\n      id=\\"end\\"\\n      type=\\"time\\"\\n      disabled={planning == null}\\n      value={endTime}\\n      on:change={(e) => {\\n        if (e.currentTarget.value == null) {\\n          return;\\n        }\\n        endTime = e.currentTarget.value;\\n        onTimeChange();\\n      }}\\n      step=\\"120\\"\\n    />\\n  </div>\\n  <ToggleSwitch\\n    value={enabled}\\n    on:change={(e) => {\\n      if (planning == null) {\\n        onCreate();\\n        return;\\n      }\\n      enabled = !enabled;\\n      onToggle();\\n    }}\\n  />\\n</div>\\n\\n<style>\\n  .worker-times {\\n    display: grid;\\n    grid-template-columns: auto 1fr;\\n    margin-right: 1rem;\\n  }\\n  .worker-times label {\\n    margin-right: 1rem;\\n  }\\n\\n  .worker-status {\\n    flex: 1;\\n    display: flex;\\n    flex-direction: row;\\n    align-items: center;\\n\\n    padding: 0.3rem;\\n  }\\n  .worker-status img {\\n    border-radius: 50%;\\n  }\\n  .worker-status .name {\\n    flex: 1;\\n    margin-left: 1rem;\\n    margin-right: 1rem;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA6EE,2CAAc,CACZ,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,CAAC,GAAG,CAC/B,YAAY,CAAE,IAChB,CACA,4BAAa,CAAC,oBAAM,CAClB,YAAY,CAAE,IAChB,CAEA,4CAAe,CACb,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,MAAM,CAEnB,OAAO,CAAE,MACX,CACA,6BAAc,CAAC,kBAAI,CACjB,aAAa,CAAE,GACjB,CACA,6BAAc,CAAC,oBAAM,CACnB,IAAI,CAAE,CAAC,CACP,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IAChB"}'
};
function dateToTime(date) {
  let hh = date.getHours().toString().padStart(2, "0");
  let mm = date.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
}
const WorkerTimeInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { worker } = $$props;
  let { planning = null } = $$props;
  let startTime = (planning && dateToTime(new Date(planning.startTime))) ?? null;
  let endTime = (planning && dateToTime(new Date(planning.endTime))) ?? null;
  let enabled = planning?.enabled ?? false;
  createEventDispatcher();
  if ($$props.worker === void 0 && $$bindings.worker && worker !== void 0) $$bindings.worker(worker);
  if ($$props.planning === void 0 && $$bindings.planning && planning !== void 0) $$bindings.planning(planning);
  $$result.css.add(css$1);
  return `<div class="worker-status svelte-18lcvct"><img${add_attribute("alt", worker.name, 0)}${add_attribute("src", worker.avatar, 0)} height="40" width="40" class="svelte-18lcvct"> <div class="name svelte-18lcvct">${escape(worker.name)}</div> <div class="worker-times svelte-18lcvct"><label for="start" class="svelte-18lcvct" data-svelte-h="svelte-doxqqm">Début :</label> <input id="start" type="time"${add_attribute("value", startTime, 0)} ${planning == null ? "disabled" : ""} step="120"> <label for="end" class="svelte-18lcvct" data-svelte-h="svelte-1wblno2">Fin :</label> <input id="end" type="time" ${planning == null ? "disabled" : ""}${add_attribute("value", endTime, 0)} step="120"></div> ${validate_component(ToggleSwitch, "ToggleSwitch").$$render($$result, { value: enabled }, {}, {})} </div>`;
});
const css = {
  code: "main.svelte-530vro{display:flex;flex-direction:row}.column.svelte-530vro{display:flex;flex-direction:column;height:-moz-fit-content;height:fit-content}.range.svelte-530vro{width:5em}table.svelte-530vro{flex:1}tr.svelte-530vro{display:flex}td.svelte-530vro:first-child{background-color:rgba(0, 0, 100, 0.1);text-align:center;font-weight:bold;display:flex;align-items:center;justify-content:center;margin:5px}td.worker.svelte-530vro,th.worker.svelte-530vro{flex:1;text-align:center}.worker.disabled.svelte-530vro{border-radius:5px;padding:3px}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { PUBLIC_CARDEN_API } from \\"$env/static/public\\";\\nimport Calendar from \\"$lib/components/Calendar.svelte\\";\\nimport Progress from \\"$lib/components/Progress.svelte\\";\\nimport WorkerTimeInput from \\"$lib/components/WorkerTimeInput.svelte\\";\\nimport { clock } from \\"$lib/stores/clock.svelte.js\\";\\nimport { getOrdinalDay, toUtcDate } from \\"$lib/formater.js\\";\\nexport let data;\\nlet selected = new Date($clock);\\nlet workers = [];\\n$: workers = data.locationInfo.workers;\\n$: planning = data.planning;\\n$: tickets = data.tickets;\\n$: selectedPlanning = planning.filter(\\n  (p) => p.day[0] == toUtcDate(selected)[0] && p.day[1] == toUtcDate(selected)[1]\\n) ?? [];\\nlet workerWithPlanning = [];\\n$: workerWithPlanning = workers.map((w) => {\\n  let workerPlanning = selectedPlanning.find((p) => p.workerId == w.id) ?? null;\\n  return {\\n    worker: w,\\n    planning: workerPlanning,\\n    tickets: filterWorkerTickets(tickets, w, selected)\\n  };\\n}).filter((wp) => wp.planning && wp.planning.enabled || wp.tickets.length > 0);\\n$: startTimes = workerWithPlanning.map((w) => w.planning ? new Date(w.planning.startTime).getTime() : null).filter((t) => t != null);\\n$: endTimes = workerWithPlanning.map((w) => w.planning ? new Date(w.planning.endTime).getTime() : null).filter((t) => t != null);\\n$: start = new Date(Math.min(...startTimes));\\n$: end = new Date(Math.max(...endTimes));\\n$: hours = computeHours(start, end);\\nfunction filterWorkerTickets(tickets2, worker, selectedDate) {\\n  let selectedTickets = tickets2.filter((t) => t.workerId == worker.id);\\n  return selectedTickets;\\n}\\nfunction computeHours(start2, end2) {\\n  let hours2 = [];\\n  if (start2 == null || end2 == null) {\\n    return hours2;\\n  }\\n  const msPerHour = 3600 * 1e3;\\n  for (let i = start2.getTime(); i < end2.getTime(); i += msPerHour / 2) {\\n    let slot = new Date(i);\\n    slot.setSeconds(0);\\n    hours2.push(slot);\\n  }\\n  return hours2;\\n}\\nasync function updateWorkerTime(calendarId, selectedDate, startTime, endTime) {\\n  if (startTime == null || endTime == null) {\\n    return;\\n  }\\n  let day = toUtcDate(selectedDate);\\n  let [startHour, startMinute] = startTime.split(\\":\\");\\n  let [endHour, endMinute] = endTime.split(\\":\\");\\n  let start2 = new Date(selected);\\n  start2.setHours(+startHour, +startMinute);\\n  let end2 = new Date(selected);\\n  end2.setHours(+endHour, +endMinute);\\n  fetch(`${PUBLIC_CARDEN_API}/admin/calendars/${calendarId}`, {\\n    method: \\"PATCH\\",\\n    credentials: \\"include\\",\\n    headers: {\\n      \\"Content-Type\\": \\"application/json\\"\\n    },\\n    body: JSON.stringify({\\n      startTime: Math.floor(start2.getTime() / 1e3),\\n      endTime: Math.floor(end2.getTime() / 1e3)\\n    })\\n  });\\n}\\nasync function createCalendar(location, worker, selectedDate) {\\n  let year = selectedDate.getUTCFullYear();\\n  let day = getOrdinalDay(selectedDate);\\n  let start2 = new Date(selectedDate);\\n  start2.setHours(9, 0, 0, 0);\\n  let end2 = new Date(selectedDate);\\n  end2.setHours(18, 0, 0, 0);\\n  fetch(`${PUBLIC_CARDEN_API}/admin/calendars`, {\\n    method: \\"POST\\",\\n    credentials: \\"include\\",\\n    headers: {\\n      \\"Content-Type\\": \\"application/json\\"\\n    },\\n    body: JSON.stringify({\\n      workerId: worker.id,\\n      locationId: location.id,\\n      day: [year, day],\\n      startTime: Math.floor(start2.getTime() / 1e3),\\n      endTime: Math.floor(end2.getTime() / 1e3),\\n      enabled: true\\n    })\\n  });\\n}\\nasync function toggleCalendar(calendarId, enabled) {\\n  fetch(`${PUBLIC_CARDEN_API}/admin/calendars/${calendarId}`, {\\n    method: \\"PATCH\\",\\n    credentials: \\"include\\",\\n    headers: {\\n      \\"Content-Type\\": \\"application/json\\"\\n    },\\n    body: JSON.stringify({ enabled })\\n  });\\n}\\n<\/script>\\n\\n<main>\\n  <div class=\\"column\\">\\n    <Calendar bind:selected />\\n    {#each workers as worker (worker.id)}\\n      <WorkerTimeInput\\n        {worker}\\n        planning={selectedPlanning.find((p) => p.workerId == worker.id) ?? null}\\n        on:create={(e) => createCalendar(data.locationInfo.location, e.detail.worker, selected)}\\n        on:statusChange={(e) => toggleCalendar(e.detail.planning.id, e.detail.enabled)}\\n        on:timeChange={(e) =>\\n          updateWorkerTime(e.detail.planning.id, selected, e.detail.startTime, e.detail.endTime)}\\n      />\\n    {/each}\\n  </div>\\n  {#if workerWithPlanning.length == 0}\\n    <div>FERMER</div>\\n  {:else}\\n    <table>\\n      <thead>\\n        <tr>\\n          <th class=\\"range\\"></th>\\n          {#each workerWithPlanning as wp}\\n            <th class=\\"worker\\">{wp.worker.name}</th>\\n          {/each}\\n        </tr>\\n      </thead>\\n      <tbody>\\n        {#each hours as hour}\\n          <tr>\\n            <td class=\\"range\\">\\n              {hour.toLocaleTimeString(\\"FR\\", { hour: \\"2-digit\\", minute: \\"2-digit\\" })}\\n            </td>\\n            {#each workerWithPlanning as worker}\\n              {#if worker.planning && new Date(worker.planning.startTime).getTime() <= hour.getTime()}\\n                <td class=\\"worker\\"><Progress value={0} /></td>\\n              {:else}\\n                <td class=\\"worker disabled\\"><Progress disabled /></td>\\n              {/if}\\n            {/each}\\n          </tr>\\n        {/each}\\n      </tbody>\\n    </table>\\n  {/if}\\n</main>\\n\\n<style>\\n  main {\\n    display: flex;\\n    flex-direction: row;\\n  }\\n  .column {\\n    display: flex;\\n    flex-direction: column;\\n    height: -moz-fit-content;\\n    height: fit-content;\\n  }\\n  .range {\\n    width: 5em;\\n  }\\n  table {\\n    flex: 1;\\n  }\\n  tr {\\n    display: flex;\\n  }\\n\\n  td:first-child {\\n    background-color: rgba(0, 0, 100, 0.1);\\n    text-align: center;\\n    font-weight: bold;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    margin: 5px;\\n  }\\n  td.worker,\\n  th.worker {\\n    flex: 1;\\n    text-align: center;\\n  }\\n  .worker.disabled {\\n    border-radius: 5px;\\n    padding: 3px;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAuJE,kBAAK,CACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,GAClB,CACA,qBAAQ,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,MAAM,CAAE,gBAAgB,CACxB,MAAM,CAAE,WACV,CACA,oBAAO,CACL,KAAK,CAAE,GACT,CACA,mBAAM,CACJ,IAAI,CAAE,CACR,CACA,gBAAG,CACD,OAAO,CAAE,IACX,CAEA,gBAAE,YAAa,CACb,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACtC,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,IAAI,CACjB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,GACV,CACA,EAAE,qBAAO,CACT,EAAE,qBAAQ,CACR,IAAI,CAAE,CAAC,CACP,UAAU,CAAE,MACd,CACA,OAAO,uBAAU,CACf,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,GACX"}'
};
function filterWorkerTickets(tickets2, worker, selectedDate) {
  let selectedTickets = tickets2.filter((t) => t.workerId == worker.id);
  return selectedTickets;
}
function computeHours(start2, end2) {
  let hours2 = [];
  if (start2 == null || end2 == null) {
    return hours2;
  }
  const msPerHour = 3600 * 1e3;
  for (let i = start2.getTime(); i < end2.getTime(); i += msPerHour / 2) {
    let slot = new Date(i);
    slot.setSeconds(0);
    hours2.push(slot);
  }
  return hours2;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let planning;
  let tickets;
  let selectedPlanning;
  let startTimes;
  let endTimes;
  let start;
  let end;
  let hours;
  let $clock, $$unsubscribe_clock;
  $$unsubscribe_clock = subscribe(clock, (value) => $clock = value);
  let { data } = $$props;
  let selected = new Date($clock);
  let workers = [];
  let workerWithPlanning = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    workers = data.locationInfo.workers;
    planning = data.planning;
    tickets = data.tickets;
    selectedPlanning = planning.filter((p) => p.day[0] == toUtcDate(selected)[0] && p.day[1] == toUtcDate(selected)[1]) ?? [];
    workerWithPlanning = workers.map((w) => {
      let workerPlanning = selectedPlanning.find((p) => p.workerId == w.id) ?? null;
      return {
        worker: w,
        planning: workerPlanning,
        tickets: filterWorkerTickets(tickets, w)
      };
    }).filter((wp) => wp.planning && wp.planning.enabled || wp.tickets.length > 0);
    startTimes = workerWithPlanning.map((w) => w.planning ? new Date(w.planning.startTime).getTime() : null).filter((t) => t != null);
    endTimes = workerWithPlanning.map((w) => w.planning ? new Date(w.planning.endTime).getTime() : null).filter((t) => t != null);
    start = new Date(Math.min(...startTimes));
    end = new Date(Math.max(...endTimes));
    hours = computeHours(start, end);
    $$rendered = `<main class="svelte-530vro"><div class="column svelte-530vro">${validate_component(Calendar, "Calendar").$$render(
      $$result,
      { selected },
      {
        selected: ($$value) => {
          selected = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${each(workers, (worker) => {
      return `${validate_component(WorkerTimeInput, "WorkerTimeInput").$$render(
        $$result,
        {
          worker,
          planning: selectedPlanning.find((p) => p.workerId == worker.id) ?? null
        },
        {},
        {}
      )}`;
    })}</div> ${workerWithPlanning.length == 0 ? `<div data-svelte-h="svelte-1crgedd">FERMER</div>` : `<table class="svelte-530vro"><thead><tr class="svelte-530vro"><th class="range svelte-530vro"></th> ${each(workerWithPlanning, (wp) => {
      return `<th class="worker svelte-530vro">${escape(wp.worker.name)}</th>`;
    })}</tr></thead> <tbody>${each(hours, (hour) => {
      return `<tr class="svelte-530vro"><td class="range svelte-530vro">${escape(hour.toLocaleTimeString("FR", { hour: "2-digit", minute: "2-digit" }))}</td> ${each(workerWithPlanning, (worker) => {
        return `${worker.planning && new Date(worker.planning.startTime).getTime() <= hour.getTime() ? `<td class="worker svelte-530vro">${validate_component(Progress, "Progress").$$render($$result, { value: 0 }, {}, {})}</td>` : `<td class="worker disabled svelte-530vro">${validate_component(Progress, "Progress").$$render($$result, { disabled: true }, {}, {})}</td>`}`;
      })} </tr>`;
    })}</tbody></table>`} </main>`;
  } while (!$$settled);
  $$unsubscribe_clock();
  return $$rendered;
});
export {
  Page as default
};

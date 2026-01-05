<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ToggleSwitch from "./ToggleSwitch.svelte";
  import type { Planning, WorkerInfo } from "$src/types/Location";

  export let worker: WorkerInfo;
  export let planning: Planning | null = null;

  let startTime = (planning && dateToTime(new Date(planning.startTime))) ?? null;
  let endTime = (planning && dateToTime(new Date(planning.endTime))) ?? null;
  let enabled = planning?.enabled ?? false;

  const dispatch = createEventDispatcher();

  function dateToTime(date: Date) {
    let hh = date.getHours().toString().padStart(2, "0");
    let mm = date.getMinutes().toString().padStart(2, "0");

    return `${hh}:${mm}`;
  }

  function onTimeChange() {
    dispatch("timeChange", {
      planning,
      startTime,
      endTime,
    });
  }

  function onToggle() {
    dispatch("statusChange", { planning, enabled });
  }

  function onCreate() {
    dispatch("create", { worker });
  }
</script>

<div class="worker-status">
  <img alt={worker.name} src={worker.avatar} height="40" width="40" />
  <div class="name">{worker.name}</div>
  <div class="worker-times">
    <label for="start">Début : </label>
    <input
      id="start"
      type="time"
      value={startTime}
      disabled={planning == null}
      on:change={(e) => {
        if (e.currentTarget.value == null) {
          return;
        }
        startTime = e.currentTarget.value;
        onTimeChange();
      }}
      step="120"
    />
    <label for="end">Fin : </label>
    <input
      id="end"
      type="time"
      disabled={planning == null}
      value={endTime}
      on:change={(e) => {
        if (e.currentTarget.value == null) {
          return;
        }
        endTime = e.currentTarget.value;
        onTimeChange();
      }}
      step="120"
    />
  </div>
  <ToggleSwitch
    value={enabled}
    on:change={(e) => {
      if (planning == null) {
        onCreate();
        return;
      }
      enabled = !enabled;
      onToggle();
    }}
  />
</div>

<style>
  .worker-times {
    display: grid;
    grid-template-columns: auto 1fr;
    margin-right: 1rem;
  }
  .worker-times label {
    margin-right: 1rem;
  }

  .worker-status {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0.3rem;
  }
  .worker-status img {
    border-radius: 50%;
  }
  .worker-status .name {
    flex: 1;
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>

<script>
  import { clock } from "$lib/stores/clock.svelte";

  const msPerDay = 24 * 3600 * 1000;
  const week = ["L", "M", "M", "J", "V", "S", "D"];

  export let selected = new Date($clock);
  let monthOffset = 0;
  let date = new Date(selected);

  /** @type Date[] */
  $: days = computeDays(monthOffset);

  /** @param {number} offset */
  function computeDays(offset) {
    monthOffset = offset;
    date.setFullYear(selected.getFullYear(), selected.getMonth() + monthOffset);
    date = date;

    let monthFirstDay = new Date(date);
    monthFirstDay.setDate(1);
    // Sunday is 0
    let monthFirstWeekDay = monthFirstDay.getDay();
    // we start at monday
    let distFirst = (monthFirstWeekDay + 6) % 7;
    let firstDay = new Date(monthFirstDay.getTime() - distFirst * msPerDay);

    let days = [];
    for (let i = 0; i < 7 * 6; i++) {
      let d = new Date(firstDay.getTime() + i * msPerDay);
      days.push(d);
    }
    return days;
  }

  /**
   *
   * @param {Date} a
   * @param {Date} b
   */
  function isSameDay(a, b) {
    return Math.floor(a.getTime() / msPerDay) == Math.floor(b.getTime() / msPerDay);
  }
</script>

<nav>
  <button on:click={() => (monthOffset = monthOffset - 1)}>{"<"}</button>
  <div class="date">{date.toLocaleString("default", { month: "long", year: "numeric" })}</div>
  <button on:click={() => (monthOffset = monthOffset + 1)}>{">"}</button>
  <button
    class="today"
    on:click={() => {
      monthOffset = 0;
      selected = new Date($clock);
    }}>today</button
  >
</nav>
<div class="calendar">
  {#each week as d}
    <div class="week-day">{d}</div>
  {/each}
  {#each days as day}
    <button
      class="day"
      class:enabled={day.getMonth() == date.getMonth()}
      class:active={isSameDay(day, selected)}
      on:click={() => (selected = day)}
    >
      <span>{day.getDate().toString().padStart(2, "0")}</span>
    </button>
  {/each}
</div>

<style>
  nav {
    display: flex;
    flex-direction: row;
    width: fit-content;
  }
  nav .date {
    flex: 1;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    min-width: 10em;
    text-align: center;
  }
  nav .today {
    margin-left: 1rem;
  }
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 1rem;
  }
  .week-day {
    text-align: center;
  }
  .day {
    border: none;
    background: none;
    aspect-ratio: 1;
    padding: 5px;
    color: lightslategray;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 50%;
  }
  .day.enabled {
    color: black;
  }
  .day:hover {
    background-color: lightblue;
  }
  .day.active {
    background-color: blue;
    color: white;
  }
</style>

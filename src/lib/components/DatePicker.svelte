<script>
  import Calendar from "./Calendar.svelte";

  /** @type Date */
  export let rdvDate;
  export let locale = "fr-Fr";

  let calendarOpen = false;

  /**
   * @param {Date} date
   */
  function toDay(date) {
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  }
</script>

<div class="calendar">
  <h2>{new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(rdvDate)}</h2>
  <div class="week">
    {#each [0, 1, 2, 3, 4, 5, 6] as day, i}
      <button
        class="day"
        on:click={() => {
          rdvDate = new Date(rdvDate.getTime() + day * 24 * 3600 * 1000);
        }}
      >
        <div class="day-num" class:selected={i == 0}>
          {(rdvDate.getDate() + day).toString().padStart(2, "0")}
        </div>
        <div>
          {toDay(new Date(rdvDate.getTime() + day * 24 * 3600 * 1000))}
        </div>
      </button>
    {/each}
    <div class="drop-down">+</div>
  </div>
  {#if calendarOpen}
    <Calendar bind:selected={rdvDate} />
  {/if}
</div>

<style>
  .calendar {
    max-width: 360px;
    display: flex;
    flex-direction: column;
  }

  button {
    border: none;
    background: none;
  }
  .drop-down {
    border-radius: 50%;
    border: black solid 2px;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: auto;
    width: 2em;
    height: 2em;
  }
  .week {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
    margin: 1rem;
  }
  .day {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .week .day-num {
    border-radius: 50%;
    border: black solid 2px;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
  }
  .day-num.selected {
    background-color: black;
    color: white;
  }
</style>

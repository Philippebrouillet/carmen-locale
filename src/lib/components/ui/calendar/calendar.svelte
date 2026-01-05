<script lang="ts">
  import { Calendar as CalendarPrimitive } from "bits-ui";
  import * as Calendar from "./index.js";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button";
  import { CalendarDate, getLocalTimeZone, toCalendarDate, today } from "@internationalized/date";
  import { fly } from "svelte/transition";
  import { languageTag } from "$lib/paraglide/runtime.js";
  import * as m from "$lib/paraglide/messages.js";

  type $$Events = CalendarPrimitive.Events;

  const todayDate = today(getLocalTimeZone());

  export let value: CalendarDate;

  let selectedDay = todayDate;
  let showFullCalendar: boolean = false;
  $: currentWeek = updateCurrentWeek(selectedDay);

  const getWeekdayName = (date: CalendarDate, locale: string): string => {
    const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
    return weekdayFormatter.format(date.toDate(getLocalTimeZone()));
  };

  const updateCurrentWeek = (date: CalendarDate) => {
    const week: CalendarDate[] = [];
    for (let i = 0; i < 6; i++) {
      week.push(toCalendarDate(date).add({ days: i }));
    }
    return week;
  };

  const onValueChange = (newValue: CalendarDate | undefined) => {
    if (newValue != undefined) {
      selectedDay = newValue;
      value = newValue;
      showFullCalendar = false;
    }
  };
</script>

<CalendarPrimitive.Root
  locale={languageTag()}
  value={selectedDay}
  {onValueChange}
  weekdayFormat="short"
  isDateDisabled={(date) => {
    return todayDate.compare(date) > 0;
  }}
  class="border-none rounded-md border"
  on:keydown
  let:months
  let:weekdays
>
  <Calendar.Header>
    <Calendar.Heading />
    <div
      transition:fly={{ y: -20, delay: 400, duration: 400 }}
      class=" flex-row items-center gap-4"
      class:flex={showFullCalendar}
      class:hidden={!showFullCalendar}
    >
      <Button
        on:click={() => onValueChange(today)}
        variant="outline"
        size="sm"
        class="border text-xs h-8 px-3"
      >
        {m.today()}
      </Button>
      <Calendar.PrevButton />
      <Calendar.NextButton />
    </div>
  </Calendar.Header>

  {#if !showFullCalendar}
    <div
      in:fly={{ y: 20, delay: 400, duration: 400 }}
      out:fly={{ y: 20, duration: 400 }}
      class="grid grid-cols-7 py-4 gap-2 w-full justify-between"
    >
      {#each currentWeek as day, i}
        <div
          in:fly|global={{ y: 10, duration: 200, delay: 60 * i }}
          class="flex flex-col w-fit gap-2 items-center"
        >
          <Button
            on:click={() => {
              value = day;
            }}
            size="icon"
            variant="outline"
            class="mx-2 text-xs font-medium border transition-all duration-300 {value?.day ==
              day.day && value?.month == day.month
              ? ' bg-primary text-white ring-2  ring-primary ring-offset-1 border-none'
              : ''}"
          >
            {day.day}
          </Button>
          <p class="text-xs">{getWeekdayName(day, languageTag())}</p>
        </div>
      {/each}
      <div
        in:fly|global={{ y: 10, duration: 200, delay: 60 * 7 }}
        class="flex flex-col w-fit gap-2 items-center"
      >
        <Button
          on:click={() => {
            showFullCalendar = true;
          }}
          size="icon"
          variant="outline"
          class="border text-xs font-medium "
        >
          +
        </Button>
        <p class="text-xs">{m.more()}</p>
      </div>
    </div>
  {/if}
  {#if showFullCalendar}
    <Calendar.Months>
      {#each months as month}
        <Calendar.Grid>
          <Calendar.GridHead>
            <Calendar.GridRow class="flex">
              {#each weekdays as weekday}
                <Calendar.HeadCell>
                  {weekday.slice(0, 2)}
                </Calendar.HeadCell>
              {/each}
            </Calendar.GridRow>
          </Calendar.GridHead>
          <Calendar.GridBody class="">
            {#each month.weeks as weekDates}
              <Calendar.GridRow class="mt-3 w-full ">
                {#each weekDates as date}
                  <Calendar.Cell {date}>
                    <Calendar.Day {date} month={month.value} />
                  </Calendar.Cell>
                {/each}
              </Calendar.GridRow>
            {/each}
          </Calendar.GridBody>
        </Calendar.Grid>
      {/each}
    </Calendar.Months>
  {/if}
</CalendarPrimitive.Root>

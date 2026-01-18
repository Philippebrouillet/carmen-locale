<script lang="ts">
  import { setBookingDate, setBookingDelay, shopStore } from "$lib/stores/basketStore";
  import { clock } from "$lib/stores/clock.svelte";
  import { location } from "$src/lib/stores/location.store";
  import { computeAppointmentTimes } from "$lib/utils/appointmentTime";
  import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
  import { fly, slide } from "svelte/transition";
  import BookingHeader from "../components/BookingHeader.svelte";
  import ProfessionalSelect from "./components/ProfessionalSelect.svelte";
  import Worker from "./components/Worker.svelte";
  import * as m from "$lib/paraglide/messages.js";
  import { languageTag } from "$lib/paraglide/runtime";
  import TimeFilterTabs from "./components/TimeFilterTabs.svelte";
  import { computeQueue } from "$src/services/QueueLine";
  import { onMount } from "svelte";
  import Lightning from "$src/lib/assets/icons/Lightning.svelte";
  import { ChevronDown } from "lucide-svelte";
  import BadgeTarifMode from "$src/lib/components/BadgeTarifMode.svelte";
  import { backgroundColorByTheme } from "$src/services/Location";
  import type { BookingMode } from "$src/types/Location";

  export let data;

  let selectedDay: CalendarDate = today(getLocalTimeZone());
  let now = new Date($clock);
  let filterWorkerId: number | null = data.workerFilter ? Number(data.workerFilter) : null;
  let selectedWorkerId: number | null = filterWorkerId;
  let selectedSlotTime: Date | undefined;
  let selectedTimeFilter: "morning" | "afternoon" = "morning";
  let isOpenAfterOptions = false;

  const bookingMode: BookingMode = $location.config.booking_window;

  let bookingDelays = [
    { time: "5", haveWorkerAvailable: false },
    { time: "15", haveWorkerAvailable: false },
    { time: "30", haveWorkerAvailable: false },
    { time: "45", haveWorkerAvailable: false },
    { time: "60", haveWorkerAvailable: false },
    { time: "90", haveWorkerAvailable: false },
    { time: "120", haveWorkerAvailable: false },
    { time: "180", haveWorkerAvailable: false },
  ];

  // const slotsTimes = setBookingType(data.mode == "appointment" ? "appointment" : "waitlist");
  // const formatter = new Intl.DateTimeFormat(languageTag(), {
  //   day: "numeric",
  //   weekday: "long",
  // });

  const parseTimeString = (time: string): { hour: number; minutes: number } => {
    const [hourStr, minuteStr] = time.split(":");
    return { hour: parseInt(hourStr, 10), minutes: parseInt(minuteStr || "0", 10) };
  };

  const createSlotDate = (
    start: string,
    end: string,
  ): { date: Date; haveWorkerAvailable: boolean }[] => {
    const slots: { date: Date; haveWorkerAvailable: boolean }[] = [];
    const { hour: startHour, minutes: startMinutes } = parseTimeString(start);
    const { hour: endHour, minutes: endMinutes } = parseTimeString(end);

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes of [0, 30]) {
        // Commence à l'heure de départ
        if (hour === startHour && minutes < startMinutes) continue;
        // Arrête à l'heure de fin
        if (hour === endHour && minutes > endMinutes) break;

        const date = new Date();
        date.setHours(hour, minutes, 0, 0);
        slots.push({ date, haveWorkerAvailable: haveWorkerAvailableForDate(date) });
      }
    }

    return slots;
  };

  let morningSlots: { date: Date; haveWorkerAvailable: boolean }[] = [];
  let afternoonSlots: { date: Date; haveWorkerAvailable: boolean }[] = [];

  const getTimeString = (date: Date): string => {
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  $: if (bookingMode === "DAY") {
    const soonerStartWorker = allWorkers.reduce((acc, w) => {
      if (!acc || (w.startWorkerDate && w.startWorkerDate < acc)) {
        return w.startWorkerDate;
      }
      return acc;
    }, null);

    const laterEndWorker = allWorkers.reduce((acc, w) => {
      if (!acc || (w.endWorkerDate && w.endWorkerDate > acc)) {
        return w.endWorkerDate;
      }
      return acc;
    }, null);

    const soonerStartWorkerTime = soonerStartWorker ? getTimeString(soonerStartWorker) : null;
    const laterEndWorkerTime = laterEndWorker ? getTimeString(laterEndWorker) : null;

    morningSlots = createSlotDate(soonerStartWorkerTime, "12:00");
    afternoonSlots = createSlotDate("12:00", laterEndWorkerTime);
  }

  const filterShowableWorkers = (workers, date) => {
    return workers.filter((w) => {
      const haveTicketInConflict = w.tickets.find((t) => {
        if (!t.rdvTime || !t.durationS) return false;
        const rdvDate = new Date(t.rdvTime);
        const end = rdvDate.getTime() + t.durationS * 1000;
        return date.getTime() > rdvDate.getTime() && date.getTime() < end;
      });

      return w.formatedStatus !== "unavailable" && !haveTicketInConflict;
    });
  };

  const haveWorkerAvailableForDate = (date: Date) => {
    const haveWorkerAvailable = filterShowableWorkers(
      computeQueue($location, new Date($clock), date),
      date,
    );
    return haveWorkerAvailable.length > 0 ? true : false;
  };

  const setShowableBookingDelays = () => {
    for (const delay of bookingDelays) {
      const date = new Date(now.getTime() + Number(delay.time) * 60000);
      delay.haveWorkerAvailable = haveWorkerAvailableForDate(date);
    }
    bookingDelays = bookingDelays;
  };

  onMount(() => {
    if (["DAY", "3H"].includes(bookingMode)) {
      setShowableBookingDelays();
      const firstAvailableDelay = bookingDelays.find((d) => d.haveWorkerAvailable)?.time;
      if (firstAvailableDelay) {
        setBookingDelay(Number(firstAvailableDelay));
      }
    }
    if (filterWorkerId) {
      const selectedWorker = workers.find((w) => w.id == filterWorkerId);
      if (selectedWorker?.nextAvailable?.next)
        shopStore.update((store) => {
          return {
            ...store,
            bookingDate: selectedWorker.nextAvailable?.next,
          };
        });
    }
  });

  $: appointmentTimes = computeAppointmentTimes(now, selectedDay, $location.planning);
  $: afterSlots = selectedTimeFilter === "afternoon" ? afternoonSlots : morningSlots;
  // $: filteredAppointmentTimes = selectedTimeFilter === "morning" ? morningSlots : afternoonSlots;
  $: bookingDelay = $shopStore.bookingDelay ?? 0;
  $: appointmentOptionSelected = $shopStore.bookingType == "appointment" ? true : false;
  $: selectedTime =
    appointmentOptionSelected && appointmentTimes.length > 0
      ? appointmentTimes[0].getTime().toString()
      : null;
  // $: serviceDuration = $shopStore.selectedService?.durationS;
  $: start = selectedTime
    ? new Date(+selectedTime)
    : new Date(now.getTime() + Number(bookingDelay) * 60000);

  // $: start = new Date(now.getTime() + 5 * 60 * 1000);
  // $: workers = computeQueue($locationResponseApi, now, start);
  // $location, new Date($clock), start, serviceDuration
  // $: workers = computeQueue($location, new Date($clock), start, serviceDuration).filter(
  //   (w) => !["DISABLED", "STOPED"].includes(w.status),
  // );

  $: $location, $clock, setShowableBookingDelays();
  $: allWorkers = computeQueue($location, new Date($clock), start);
  $: workers = filterShowableWorkers(allWorkers, start);

  $: if (appointmentOptionSelected == false) {
    setBookingDate(today(getLocalTimeZone()).toDate(getLocalTimeZone()));
  }
  $: otherWorkers = workers
    .filter((w) => w.id != filterWorkerId)
    .filter((w) => start < w.endWorkerDate);
  $: selectedWorker = workers
    .filter((w) => w.id == filterWorkerId)
    .filter((w) => start < w.endWorkerDate);
  // $: {
  //   let locationPlanning = getLocationPlaning($location);
  //   console.log(locationPlanning);
  //   console.log("Selected date : ", selectedDay);
  // }

  $: bookingDelayBg = backgroundColorByTheme[$location.location.theme];
</script>

<main class="w-full flex flex-col items-center md:items-start px-4">
  <BookingHeader text={m.chooseArrivalTime()} />

  <div class="flex flex-col items-start md:items-start gap-4 w-full lg:w-[90%] xl:[60%] md:mt-0">
    <div class="w-full overflow-x-auto">
      <ProfessionalSelect {workers} bind:selectedWorkerId={filterWorkerId} />
    </div>

    {#if ["DAY", "3H"].includes(bookingMode)}
      <div in:fly={{ x: -100, duration: 300 }} class="flex flex-col gap-4 py-4 w-full">
        <div class="flex flex-col md:flex-row w-full gap-2 justify-between">
          <h2 class="text-lg font-bold">{m.yourArrivalTime()}</h2>
        </div>
        <div class="grid grid-cols-4 gap-2">
          {#each bookingDelays as delay, i}
            {@const numberDelay = Number(delay.time)}
            <button
              disabled={!delay.haveWorkerAvailable}
              in:fly|global={{ y: 20, duration: 300, delay: 100 * i }}
              on:click={() => {
                bookingDelay = delay.time;
                setBookingDelay(numberDelay);
                setBookingDate(new Date(now.getTime() + numberDelay * 60000));
                selectedTime = null;
              }}
              class="flex gap-2 justify-between disabled:opacity-30 disabled:cursor-not-allowed p-3 border rounded-xl transition-all duration-200 ease-in-out font-bold h-[69px] {bookingDelay ==
              delay.time
                ? `${bookingDelayBg} text-primary-foreground `
                : 'bg-white hover:bg-gray-100'}  "
            >
              {numberDelay >= 60
                ? `${Math.floor(numberDelay / 60)}h${numberDelay % 60 > 0 ? `${numberDelay % 60}` : ""}`
                : `${numberDelay} min`}

              {#if i === 0}
                <Lightning />
              {/if}
            </button>
          {/each}
        </div>
      </div>

      {#if bookingMode === "DAY"}
        <span class="text-sm text-[#616163] text-center w-full">{m.or()}</span>

        <div
          class:bg-white={isOpenAfterOptions}
          class="border rounded-xl w-full transition-colors duration-100"
        >
          <button
            on:click={() => {
              isOpenAfterOptions = !isOpenAfterOptions;
            }}
            class="flex items-center justify-between p-4 w-full"
          >
            <p class="text-[#616163] text-xs lg:text-sm">{m.laterInTheDay()}</p>
            <div
              class="text-[#09051A] transform duration-150 {isOpenAfterOptions ? 'rotate-180' : ''}"
            >
              <ChevronDown size={18}></ChevronDown>
            </div>
          </button>
          {#if isOpenAfterOptions}
            <div
              transition:slide={{ duration: 300 }}
              class="flex flex-col gap-4 w-full py-6 pt-2 px-4 pb-4"
            >
              <TimeFilterTabs bind:selectedTimeFilter />
              <div class="grid grid-cols-3 md:grid-cols-6 w-full gap-4">
                {#each afterSlots as value}
                  {@const stringValue = value.date.getTime().toString()}
                  {@const isSelectedTime = selectedTime == stringValue}
                  <button
                    disabled={value.date.getTime() <= now.getTime() || !value.haveWorkerAvailable}
                    class="w-full p-2 text-sm border rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-primary disabled:opacity-10"
                    class:bg-primary={isSelectedTime}
                    class:text-primary-foreground={isSelectedTime}
                    on:click={() => {
                      selectedTime = stringValue;
                      setBookingDate(value.date);
                      setBookingDelay(0);
                    }}
                  >
                    {value.date.toLocaleTimeString(languageTag(), { timeStyle: "short" })}
                  </button>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/if}
    {:else if bookingMode == "ASAP"}
      <div
        class="flex justify-center items-center w-full bg-[#DFE5E7] bg-opacity-30 rounded-xl p-4 text-sm text-[#616163] font-normal"
      >
        <p>{m.bookingAsapText()}</p>
      </div>
    {/if}

    <div class="mb-2">
      <h2 class="text-lg font-bold lowercase first-letter:uppercase">{m.bestOffers()}</h2>
      <p class="text-sm text-[#616163]">({m.bestOffersCalculationInfos()})</p>
    </div>

    <div class="flex items-center justify-center w-full">
      <BadgeTarifMode />
    </div>

    {#if selectedWorker.length || otherWorkers.length}
      <div class="flex flex-col gap-4 w-full overflow-hidden">
        {#if filterWorkerId}
          <!-- SELECTED WORKER  -->
          {#each selectedWorker as w, i}
            <Worker
              bind:selectedWorkerId
              bind:selectedSlotTime
              worker={w}
              showInfo={appointmentOptionSelected}
              isFree={w.nextAvailable?.isFirstSlot &&
                !(appointmentOptionSelected && w.nextAvailable?.createHole)}
              index={i}
            />
          {/each}
          {#if otherWorkers.length && selectedWorker.length}
            <div class="mb-2 mt-4">
              <h2 class="text-lg font-bold">{m.otherAvaiblePro()}</h2>
            </div>
          {/if}
        {/if}

        {#if otherWorkers.length}
          <!-- OTHER WORKERS  -->
          {#key selectedTime}
            {#key bookingDelay}
              {#each otherWorkers as w, i}
                <Worker
                  bind:selectedWorkerId
                  bind:selectedSlotTime
                  worker={w}
                  showInfo={appointmentOptionSelected}
                  index={i}
                  isFree={false}
                />
              {/each}
            {/key}
          {/key}
        {/if}
      </div>
    {:else}
      {m.noAvailableProfessionalsMessage()}
    {/if}
  </div>
</main>

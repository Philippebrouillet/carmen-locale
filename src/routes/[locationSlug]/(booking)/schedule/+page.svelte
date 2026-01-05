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

  type BookingMode = "ASAP" | "AFTER" | "3HOURS";

  export let data;

  let selectedDay: CalendarDate = today(getLocalTimeZone());
  let now = new Date($clock);
  let filterWorkerId: number | null = data.workerFilter ? Number(data.workerFilter) : null;
  let selectedWorkerId: number | null = filterWorkerId;
  let selectedSlotTime: Date | undefined;
  let selectedTimeFilter: "morning" | "afternoon" = "morning";
  let isOpenAfterOptions = false;

  const bookingMode: BookingMode = $location.location?.mode || "3HOURS";
  const bookingDelays = ["5", "15", "30", "45", "60", "90", "120", "180"];

  // const slotsTimes = setBookingType(data.mode == "appointment" ? "appointment" : "waitlist");

  const createSlotDate = (start: number, end: number) => {
    const slots: Date[] = [];
    for (let hour = start; hour < end; hour++) {
      for (let minutes of [0, 30]) {
        const date = new Date();
        date.setHours(hour, minutes, 0, 0);
        slots.push(date);
      }
    }
    return slots;
  };

  const morningSlots: Date[] = createSlotDate(8, 12);
  const afternoonSlots: Date[] = createSlotDate(12, 19);

  // const formatter = new Intl.DateTimeFormat(languageTag(), {
  //   day: "numeric",
  //   weekday: "long",
  // });

  onMount(() => {
    if (["AFTER", "3HOURS"].includes(bookingMode)) {
      setBookingDelay(Number(bookingDelays[0]));
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
  $: bookingDelay = $shopStore.bookingDelay ?? "10";
  $: appointmentOptionSelected = $shopStore.bookingType == "appointment" ? true : false;
  $: selectedTime =
    appointmentOptionSelected && appointmentTimes.length > 0
      ? appointmentTimes[0].getTime().toString()
      : null;
  $: serviceDuration = $shopStore.selectedService?.durationS;
  $: start = selectedTime
    ? new Date(+selectedTime)
    : new Date(now.getTime() + Number(bookingDelay) * 60000);
  $: workers = computeQueue($location, new Date($clock), start, serviceDuration);
  $: if (appointmentOptionSelected == false) {
    setBookingDate(today(getLocalTimeZone()).toDate(getLocalTimeZone()));
  }

  // $: {
  //   let locationPlanning = getLocationPlaning($location);
  //   console.log(locationPlanning);
  //   console.log("Selected date : ", selectedDay);
  // }
</script>

<main class="w-full flex flex-col items-center md:items-start px-4">
  <BookingHeader text={m.chooseArrivalTime()} />

  <div class="flex flex-col items-start md:items-start gap-4 w-full lg:w-[90%] xl:[60%] md:mt-0">
    <div class="w-full overflow-x-auto">
      <ProfessionalSelect {workers} bind:selectedWorkerId={filterWorkerId} />
    </div>

    {#if ["AFTER", "3HOURS"].includes(bookingMode)}
      <div in:fly={{ x: -100, duration: 300 }} class="flex flex-col gap-4 py-4 w-full">
        <div class="flex flex-col md:flex-row w-full gap-2 justify-between">
          <h2 class="text-lg font-bold">{m.yourArrivalTime()}</h2>
        </div>
        <div class="grid grid-cols-3 gap-2">
          {#each bookingDelays as delay, i}
            {@const numberDelay = Number(delay)}
            <button
              in:fly|global={{ y: 20, duration: 300, delay: 100 * i }}
              on:click={() => {
                bookingDelay = delay;
                setBookingDelay(numberDelay);
                setBookingDate(new Date(now.getTime() + numberDelay * 60000));
                selectedTime = null;
              }}
              class="flex gap-2 justify-between p-3 border rounded-xl transition-all duration-200 ease-in-out font-bold h-[69px] {bookingDelay ==
              delay
                ? 'bg-primary text-primary-foreground '
                : 'bg-white hover:bg-gray-100'} "
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

      {#if bookingMode === "AFTER"}
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
                  {@const stringValue = value.getTime().toString()}
                  {@const isSelectedTime = selectedTime == stringValue}
                  <button
                    disabled={value.getTime() <= now.getTime()}
                    class="w-full p-2 text-sm border rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-primary disabled:opacity-10"
                    class:bg-primary={isSelectedTime}
                    class:text-primary-foreground={isSelectedTime}
                    on:click={() => {
                      selectedTime = stringValue;
                      setBookingDate(value);
                      setBookingDelay(0);
                    }}
                  >
                    {value.toLocaleTimeString(languageTag(), { timeStyle: "short" })}
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

    <!-- SELECTED WORKER  -->
    {#each workers.filter((w) => w.id == filterWorkerId) as w, i}
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

    <!-- OTHER WORKERS  -->
    <!-- {#key selectedTime}
      {#key bookingDelay} -->
    {#each workers.filter((w) => w.id != filterWorkerId) as w, i}
      <Worker
        bind:selectedWorkerId
        bind:selectedSlotTime
        worker={w}
        showInfo={appointmentOptionSelected}
        index={i}
        isFree={false}
      />
    {/each}
    <!-- {/key}
    {/key} -->
  </div>
</main>

<script lang="ts">
  import { location } from "$lib/stores/location.store";
  import RandomIcon from "$lib/assets/icons/RandomIcon.svelte";
  import BookingHeader from "../components/BookingHeader.svelte";
  import { fly } from "svelte/transition";

  import { clock } from "$lib/stores/clock.svelte";
  import * as m from "$lib/paraglide/messages.js";
  import WorkerCardItem from "../components/WorkerCardItem.svelte";
  import { computeQueue } from "$src/services/QueueLine";

  $: start = new Date(new Date($clock).getTime() + 5 * 60 * 1000);
  $: workers = computeQueue($location, new Date($clock), start).filter(
    (w) => w.formatedStatus !== "unavailable",
  );
  $: theme = $location.location.theme;

  const randomIconBackGroundColorsByTheme = {
    NEUTRAL: "bg-[#F7F7F7]",
    PINK: "bg-[#FFF5FA]",
    CARDEN: "bg-[#F8FAFD]",
  };
</script>

<main class="w-full flex flex-col md:items-start">
  <BookingHeader text={m.chooseProfessional()} />
  <div
    class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-fit md:w-full px-2 lg:px-0 lg:mt-4"
  >
    <a
      in:fly|global={{ delay: 0, y: 20, duration: 400 }}
      class="border bg-white rounded-xl p-4 flex flex-col flex-1 items-center h-full transition-all duration-300 ease-in-out hover:shadow-xl"
      href="services"
    >
      <div
        class="w-full aspect-square rounded-t-xl {randomIconBackGroundColorsByTheme[
          theme
        ]} mb-2 flex justify-center items-center"
      >
        <RandomIcon {theme} />
      </div>
      <h3 class=" font-bold text-left w-full text-primary mt-2">{m.anyProfessional()}</h3>
    </a>
    {#each workers as worker, i}
      <a
        in:fly|global={{ delay: 100 * i, y: 20, duration: 400 }}
        class="relative bg-white border rounded-xl p-4 flex flex-col flex-1 gap-2 items-center h-full transition-all duration-300 ease-in-out hover:shadow-xl text-left"
        href="services/?workerFilter={worker.id}"
      >
        <WorkerCardItem {worker} />
      </a>
    {/each}
  </div>
</main>

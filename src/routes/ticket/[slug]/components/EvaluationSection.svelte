<script lang="ts">
  import type { LocationInfo, TicketInfo } from "$src/types/Location";

  export let ticket: TicketInfo;
  export let location: LocationInfo;
  export let ticketModules: any;
  export let googlePlaceId: string | null = null;
  export let satisfactionLink: string | null = null;
  let selectedStars = 0;
</script>

<div class="flex flex-col p-4 justify-center bg-white rounded-2xl">
  <h3 class="font-bold text-lg">Évaluez votre expérience</h3>
  <span class="text-xs text-seoncdary">
    {location.name}
  </span>

  <div class="flex gap-1 mt-4 bg-[#F7F7F7] py-2 justify-center items-center rounded-lg">
    {#each Array(5) as _, i}
      <button
        on:click={() => {
          selectedStars = i + 1;

          if (selectedStars > 3) {
            window.open(
              "https://search.google.com/local/writereview?placeid=" +
                (googlePlaceId || "ChIJwQ4iCehx5kcRpmDUrceh7ao"),
              "_blank",
            );
          } else {
            if (satisfactionLink) {
              window.open(satisfactionLink, "_blank");
            } else {
              const newUrl = new URL("https://tally.so/r/WOEgWJ");
              newUrl.searchParams.set("rating", String(selectedStars));
              newUrl.searchParams.set("locationName", location.name);
              newUrl.searchParams.set("ticketId", String(ticket.id));
              newUrl.searchParams.set("locationId", String(location.id));
              window.open(newUrl.toString(), "_blank");
            }
          }
        }}
        class="text-2xl transition-colors"
        class:text-yellow-400={i < selectedStars}
        class:text-[#D9D9D9]={i >= selectedStars}
      >
        ★
      </button>
    {/each}
  </div>
</div>

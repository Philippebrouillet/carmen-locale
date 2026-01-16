<script lang="ts">
  import { goto } from "$app/navigation";
  import type { LocationInfo, TicketInfo } from "$src/types/Location";

  export let ticket: TicketInfo;
  export let location: LocationInfo;
  export let ticketModules: any;
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
              "https://www.google.com/search?hl=fr-FR&gl=fr&q=Barber+Connect+%7C+Logiciel+de+gestion,+130+Rue+de+Lourmel,+75015+Paris&ludocid=12316678434915115174&lsig=AB86z5WiN0REQdWz-5bnG7IETHq2#lrd=0x47e671e809220ec1:0xaaeda1c7add460a6,3",
              "_blank",
            );
          } else {
            const newUrl = new URL("https://tally.so/r/WOEgWJ");
            newUrl.searchParams.set("rating", String(selectedStars));
            newUrl.searchParams.set("locationName", location.name);
            newUrl.searchParams.set("ticketId", String(ticket.id));
            newUrl.searchParams.set("locationId", String(location.id));
            window.open(newUrl.toString(), "_blank");
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

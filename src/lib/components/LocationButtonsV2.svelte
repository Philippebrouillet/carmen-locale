<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as m from "$lib/paraglide/messages.js";
  import { location } from "../stores/location.store";
  export let fullAddress: string;
  const responsiveIconButton =
    "flex flex-col md:flex-row items-center text-sm flex-1  h-10 border bg-white/20 border-white/30 px-3 rounded-[16px] backdrop-blur-sm hover:scale-[1.04] transition-all duration-300 ease-in-out hover:bg-white/20";
  const responsiveLabel = "";
</script>

<div class="flex justify-between w-full flex-wrap gap-4">
  <Button
    on:click={() => {
      window.open(`tel:${$location.location.phone}`, "_blank");
    }}
    class={responsiveIconButton}
  >
    <span class={responsiveLabel}>
      {m.callButton()}
    </span>
  </Button>

  <Button
    on:click={() => {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${fullAddress}`, "_blank");
    }}
    class={responsiveIconButton}
  >
    <span class={responsiveLabel}>
      {m.itineraryButton()}
    </span>
  </Button>

  <Button
    class={responsiveIconButton}
    on:click={() => {
      const url = "https://carden.app/" + $location.location.id;
      if (window.navigator.share) {
        window.navigator.share({
          title: "Reservez avec carden",
          text: "Reservez votre place sur carden",
          url: url,
        });
      } else {
        navigator.clipboard.writeText(url);
      }
    }}
  >
    <span class={responsiveLabel}>
      {m.shareButton()}
    </span>
  </Button>
</div>

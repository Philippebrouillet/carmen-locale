<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import ClockIcon from "$lib/assets/icons/ClockIcon.svelte";
  import LocationIcon from "$lib/assets/icons/LocationIcon.svelte";
  import PhoneIcon from "$lib/assets/icons/PhoneIcon.svelte";
  import ShareIcon from "$lib/assets/icons/ShareIcon.svelte";
  import * as m from "$lib/paraglide/messages.js";

  const responsiveIconButton = "flex flex-col md:flex-row items-center text-sm flex-1 gap-2 h-14";
  const responsiveLabel =
    "relative -bottom-10 -mt-7 text-primary md:text-primary-foreground md:inline-block md:my-auto md:bottom-0 font-semibold text-sm";

  export let phone = "";
</script>

<div class="grid grid-cols-4 justify-between gap-1 w-full">
  <Button href="services/type" class={responsiveIconButton}>
    <PhoneIcon />
    <span class={responsiveLabel}>
      {m.callButton()}
    </span>
  </Button>

  <Button href="services/type" class={responsiveIconButton}>
    <ClockIcon />
    <span class={responsiveLabel}>
      {m.scheduleButton()}
    </span>
  </Button>

  <Button href="services/type" class={responsiveIconButton}>
    <LocationIcon />
    <span class={responsiveLabel}>
      {m.itineraryButton()}
    </span>
  </Button>

  <Button
    class={responsiveIconButton}
    on:click={() => {
      if (window.navigator.share) {
        window.navigator.share({
          title: "Reservez avec carden",
          text: "Reservez votre place sur carden",
          url: "https://carden.app/demo",
        });
      } else {
        navigator.clipboard.writeText("https://carden.app/demo");
      }
    }}
  >
    <ShareIcon />
    <span class={responsiveLabel}>
      {m.shareButton()}
    </span>
  </Button>
</div>

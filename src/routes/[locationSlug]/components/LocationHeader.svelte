<script lang="ts">
  import * as m from "$lib/paraglide/messages.js";
  import { fly } from "svelte/transition";
  import LanguageButton from "$lib/components/LanguageButton.svelte";
  import ShopStatus from "./ShopStatus.svelte";
  import MarkerIcon from "$lib/assets/icons/Marker.svelte";
  import LocationButtonsV2 from "$src/lib/components/LocationButtonsV2.svelte";
  import type { LocationInfo, LocationStatus, LocationTheme } from "$src/types/Location";

  export let headerCover: string;
  export let location: LocationInfo;
  export let locationStatus: LocationStatus;
  export let theme: LocationTheme = location.theme;
  export let fullAddress: string;

  const gradientByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "from-[#09051A] via-[#1616163D] to-[#09051A7D]",
    CARDEN: "from-[#0073FF3D] via-[#001A395D] to-[#0F172A0D]",
    PINK: "from-[#581C876D] via-[#8318432D] to-[#8318430D]",
  };
</script>

<header
  style={`background-image: url(${headerCover})`}
  class="relative flex-1 flex max-h-[72vh] flex-col gap-10 justify-between w-full py-4 md:py-6 bg-center bg-cover aspect-[16/9] bg-no-repeat mb-5 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-40"
>
  <div class="flex justify-between items-center w-full">
    <ShopStatus {locationStatus} {theme} />
    <LanguageButton />
  </div>
  <h2
    in:fly={{ x: -100, duration: 300 }}
    class="font-bold text-primary-foreground text-[3rem] z-10 mt-8 w-full text-left hidden lg:block"
  >
    {m.title({ name: location.name })}
  </h2>

  <div class=" lg:hidden z-10 flex flex-col gap-2 justify-center items-center">
    <div
      class="w-[4.38rem] h-[4.38rem] rounded-[19.86px] border border-white/30 bg-white/20 py-2 flex justify-center items-center backdrop-blur-sm"
    >
      <img src={location.avatar} alt="avatar" class="w-[3.5rem] h-[3.5rem] rounded-[18.27px]" />
    </div>

    <h2 class="font-light text-[1.5rem] text-white/80 text-nowrap">{location.name}</h2>
  </div>

  <div class="z-10 flex flex-col gap-4">
    <div class=" flex gap-1 items-center">
      <MarkerIcon />
      <p class="text-white/80 text-[0.875rem]">
        {fullAddress}
      </p>
    </div>

    <LocationButtonsV2 {fullAddress} />
  </div>

  <!-- GRADIENT BACKGROUND -->
  <div class="w-full h-full bg-gradient-to-t {gradientByTheme[theme]}  absolute top-0 left-0" />
</header>

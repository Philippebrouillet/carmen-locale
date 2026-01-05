<script lang="ts">
  import LanguageButton from "$lib/components/LanguageButton.svelte";
  import * as m from "$lib/paraglide/messages.js";
  import { fly } from "svelte/transition";

  export let locationAvatar;
</script>

<header
  class="relative flex-1 flex flex-col items-center min-h-[10rem] w-full py-4 md:py-6 bg-[url('/location-cover.webp')] bg-cover bg-no-repeat mb-10 rounded-b-[1.8rem] px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-40 "
>
  <div class="flex justify-end items-center w-full">
    <!-- <ShopStatus {status} /> -->
    <LanguageButton />
  </div>
  <h2
    in:fly={{ x: -100, duration: 300 }}
    class="font-bold text-primary-foreground text-3xl z-10 mt-8 w-full text-left hidden lg:block"
  >
    {m.congratulations()}
    {m.registrationMessage()}
  </h2>
  <img
    src={locationAvatar}
    alt="logo"
    class="absolute left-auto right-auto -bottom-10 lg:hidden w-28 h-28 z-10 rounded-full border-[3px]"
  />
  <div
    class="w-full h-full bg-[#150B3DB2] bg-opacity-50 rounded-b-[1.8rem] absolute top-0 left-0"
  />
</header>

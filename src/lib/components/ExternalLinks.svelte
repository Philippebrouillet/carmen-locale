<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import type { LocationInfo, LocationTheme } from "$src/types/Location";
  import { GlobeIcon } from "lucide-svelte";
  import InstagramIcon from "../assets/icons/InstagramIcon.svelte";
  import ShopIcon from "../assets/icons/ShopIcon.svelte";
  import TikTokIcon from "../assets/icons/TikTokIcon.svelte";
  import * as m from "$lib/paraglide/messages.js";

  export let location: LocationInfo;
  export let mode: "mobile" | "desktop" = "desktop";

  const externalLinks = [
    { name: "instagram", link: location.instagramLink, icon: InstagramIcon },
    { name: "tiktok", link: location.tiktokLink, icon: TikTokIcon },
    { name: "shop", link: location.onlineShopLink, icon: ShopIcon },
    { name: "website", link: location.website, icon: GlobeIcon },
  ];

  const externalLinksButtonsCssByTheme: Record<LocationTheme, string> = {
    NEUTRAL: "text-primary border-primary hover:bg-primary hover:text-primary ",
    PINK: "text-pink border-pink hover:bg-pink hover:text-pink ",
    CARDEN: "text-blue border-blue hover:bg-blue hover:text-blue ",
  };

  $: haveSomeExternalLinks = externalLinks.some((item) => item.link);
  $: theme = location.theme;
</script>

{#if mode === "mobile"}
  <!--  EXTERNAL LINKS MOBILE -->
  {#if haveSomeExternalLinks}
    <div class="lg:hidden px-4 w-full flex flex-col gap-6 mt-1">
      <h2 class="font-bold text-lg md:text-2xl">{m.externalLinksTitle()}</h2>
      <div class="flex flex-col gap-4 w-full pb-4 items-center">
        {#each externalLinks as item}
          {#if item.link}
            <Button
              href={item.link}
              variant="outline"
              class="w-full gap-2 bg-transparent {externalLinksButtonsCssByTheme[
                theme
              ]} hover:bg-opacity-30  transition-all duration-150 hover:scale-[0.99] w-4/5 flex justify-start pl-14"
            >
              <svelte:component this={item.icon} />
              {item.name}
            </Button>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
{:else}
  <!-- EXTERNAL LINKS DESKTOP -->
  <div class="hidden lg:flex flex-row gap-6 w-full text-primary justify-center mt-4">
    {#if haveSomeExternalLinks}
      {#each externalLinks as item}
        {#if item.link}
          <Button
            href={item.link}
            variant="outline"
            class="p-2 w-11 h-11 rounded-full {externalLinksButtonsCssByTheme[
              theme
            ]} hover:bg-opacity-30 transition-all duration-150 hover:scale-[0.99]"
          >
            <svelte:component this={item.icon} />
          </Button>
        {/if}
      {/each}
    {/if}
  </div>
{/if}

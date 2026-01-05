<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { displayPriceInDollars } from "$src/lib/formater";
  import { shopStore } from "$src/lib/stores/basketStore";
  import { location } from "$src/lib/stores/location.store";
  import {
    BadgeEuro,
    CircleAlert,
    CircleCheck,
    Clock4,
    Tag,
    TrendingUp,
    Wallet,
  } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button";
  import * as m from "$lib/paraglide/messages.js";

  type PopupType = "ACOMPTE" | "FEES90" | "FEES30" | "HOURS" | "REDUCTION" | "MAJORATION";

  export let popupInfosOpen: PopupType | null = null;

  let openPopup = false;

  const popupDataByType = {
    ACOMPTE: {
      icon: Wallet,
      title: m.popupInfosTitleAcompte(),
      description: m.popupInfosTextAcompte(),
      infoList: [m.popupInfosListInfosAcompte1(), m.popupInfosListInfosAcompte2()],
    },
    FEES90: {
      icon: BadgeEuro,
      title: m.popupInfosTitleFees(),
      description: m.popupInfosTextFees90(),
      warning: m.popupInfosWarningNotRefundable(),
    },
    FEES30: {
      icon: BadgeEuro,
      title: m.popupInfosTitleFees(),
      description: m.popupInfosTextFees30(),
      warning: m.popupInfosWarningNotRefundable(),
    },
    HOURS: {
      icon: Clock4,
      title: m.popupInfosTitleHours(),
      description: m.popupInfosTextHours(),
      infoList: [m.popupInfosListInfosHours1(), m.popupInfosListInfosHours2()],
    },
    REDUCTION: {
      icon: Tag,
      title: m.popupInfosTitleReduction(),
      description: m.popupInfosTextReduction(),
      warning: m.popupInfosWarningNotRefundable(),
    },
    MAJORATION: {
      icon: TrendingUp,
      title: m.popupInfosTitleMajoration(),
      description: m.popupInfosTextMajoration(),
      warning: m.popupInfosWarningMajoration(),
    },
  } satisfies {
    [key in PopupType]: {
      icon: typeof TrendingUp;
      title: string;
      description: string;
      infoList?: string[];
      warning?: string;
    };
  };

  $: theme = $location.location.theme;
  $: popupData = popupInfosOpen ? popupDataByType[popupInfosOpen] : null;
  $: selectedService = $shopStore.selectedService;

  $: if (popupInfosOpen) {
    openPopup = true;
  }
</script>

<Drawer.Root bind:open={openPopup} onClose={() => (popupInfosOpen = null)}>
  <Drawer.Content class=" z-[120] lg:w-1/2">
    {#if popupData}
      <div class="p-6 py-4 px-8">
        <div class="flex flex-col items-center justify-center gap-4 text-center mb-6">
          <div
            class="rounded-full w-10 h-10 flex items-center justify-center {theme === 'PINK'
              ? 'bg-pink/10'
              : theme === 'NEUTRAL'
                ? 'bg-primary/10'
                : theme === 'CARDEN'
                  ? 'bg-blue/10'
                  : ''}"
          >
            <svelte:component
              this={popupData.icon}
              class="{popupInfosOpen === 'REDUCTION'
                ? 'text-[#23BBAC]'
                : popupInfosOpen === 'MAJORATION'
                  ? 'text-[#7832DC]'
                  : theme === 'PINK'
                    ? 'text-pink'
                    : theme === 'NEUTRAL'
                      ? 'text-primary'
                      : theme === 'CARDEN'
                        ? 'text-blue'
                        : ''}
                    
                    {popupInfosOpen === 'REDUCTION' ? 'rotate-90' : ''}
                
                    "
              size={24}
            />
          </div>

          <h2 class="font-bold text-lg">{popupData.title}</h2>
          <p class="text-sm text-secondary font-normal text-left mb-2">
            {popupData.description}
          </p>
        </div>

        {#if "infoList" in popupData}
          <ul class=" text-sm text-secondary font-normal mb-6">
            {#each popupData.infoList as info}
              <li class="flex gap-2">
                <CircleCheck class="text-[#00D4AA]" size="16"></CircleCheck>
                {info}
              </li>
            {/each}
          </ul>
        {/if}

        {#if popupInfosOpen === "REDUCTION"}
          <div
            class="flex justify-between items-center text-primary font-normal text-sm w-full py-3 rounded-[3px] px-2 bg-[#23BBAC] bg-opacity-20 mb-6"
          >
            <p>{m.popupInfosEconomy()}</p>
            <span class="text-sm font-bold text-[#23BBAC]"
              >-{displayPriceInDollars(
                selectedService.price - selectedService.discountedPrice,
              )}</span
            >
          </div>
        {/if}

        {#if "warning" in popupData}
          <p class="text-sm text-secondary flex gap-2 mb-6">
            <CircleAlert size="16" />
            {popupData.warning}
          </p>
        {/if}

        {#if popupInfosOpen === "ACOMPTE"}
          <div class="p-4 text-[#616163] rounded-xl bg-[#DFE5E7] bg-opacity-30 text-xs mb-6">
            {m.popupInfosAcompteNote()}
          </div>
        {/if}

        <div class="flex justify-center items-center">
          <Button
            type="button"
            on:click={() => {
              popupInfosOpen = null;
              openPopup = false;
            }}
            class="rounded-lg min-h-[61px] w-full bg-primary "
          >
            {m.popupInfosButtonGotIt()}
          </Button>
        </div>
      </div>
    {/if}
  </Drawer.Content>
</Drawer.Root>

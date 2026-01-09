<script lang="ts">
  import type { PopupType } from "$src/types/PopupInfos";
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
  import { displayPriceInDollars } from "$src/lib/formater";
  import * as m from "$lib/paraglide/messages.js";
  import { location as locationStore } from "$src/lib/stores/location.store";
  import { shopStore } from "$src/lib/stores/basketStore";
  import type { LocationInfo } from "$src/types/Location";
  import { createEventDispatcher } from "svelte";

  export let popupTypeOpen: PopupType | null;
  export let location: LocationInfo | null;

  const dispatch = createEventDispatcher();

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
    REDUCTIONWITHDISCOUNT: {
      icon: Tag,
      title: m.popupInfosTitleReduction(),
      description: m.popupInfosTextReduction(),
      warning: m.popupInfosWarningNotRefundable(),
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
    CANCEL_RESERVATION: {
      title: m.popupInfosTitleCancelReservation(),
      description: m.popupInfosTextCancelReservation1(),
      description2: m.popupInfosTextCancelReservation2(),
      actionContext: {
        textConfirm: m.popupInfosButtonConfirmCancelReservation(),
        textCancel: m.popupInfosButtonCancelCancelReservation(),
      },
    },
    HOUR_CHANGE: {
      icon: Clock4,
      title: m.popupInfosTitleHourChange(),
      description: m.popupInfosTextHourChange(),
      description2: m.popupInfosTextHourChange2(),
      infoList: [m.popupInfosListInfosHourChange()],
    },
  } satisfies {
    [key in PopupType]: {
      icon?: typeof TrendingUp;
      title: string;
      description: string;
      description2?: string;
      infoList?: string[];
      warning?: string;
      actionContext?: {
        textConfirm: string;
        textCancel: string;
      };
    };
  };

  const close = () => {
    dispatch("close");
  };

  const confirmAction = () => {
    dispatch("confirmAction");
  };

  $: selectedService = $shopStore.selectedService;
  $: popupData = popupTypeOpen ? popupDataByType[popupTypeOpen] : null;
  $: theme = location?.theme || $locationStore?.location?.theme || "NEUTRAL";
</script>

{#if popupData && popupTypeOpen}
  <div class="p-6 py-4 px-8">
    <div class="flex flex-col items-center justify-center gap-4 text-center mb-6">
      {#if "icon" in popupData && popupData?.icon}
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
            class="{popupTypeOpen === 'REDUCTION'
              ? 'text-[#23BBAC]'
              : popupTypeOpen === 'MAJORATION'
                ? 'text-[#7832DC]'
                : theme === 'PINK'
                  ? 'text-pink'
                  : theme === 'NEUTRAL'
                    ? 'text-primary'
                    : theme === 'CARDEN'
                      ? 'text-blue'
                      : ''}

                    {['REDUCTIONWITHDISCOUNT', 'REDUCTION'].includes(popupTypeOpen)
              ? 'rotate-90'
              : ''}
                "
            size={24}
          />
        </div>
      {/if}

      <h2 class="font-bold text-lg">{popupData.title}</h2>
      <p class:mb-2={!popupData?.description2} class="text-sm text-secondary font-normal text-left">
        {popupData.description}
      </p>

      {#if "description2" in popupData}
        <p class="text-sm text-secondary font-normal text-left mb-2">
          {popupData.description2}
        </p>
      {/if}
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

    {#if popupTypeOpen === "REDUCTIONWITHDISCOUNT"}
      <div
        class="flex justify-between items-center text-primary font-normal text-sm w-full py-3 rounded-[3px] px-2 bg-[#23BBAC] bg-opacity-20 mb-6"
      >
        <p class="">{m.popupInfosEconomy()}</p>
        <span class="text-sm font-bold text-[#23BBAC]"
          >-{displayPriceInDollars(selectedService.price - selectedService.discountedPrice)}</span
        >
      </div>
    {/if}

    {#if "warning" in popupData}
      <p class="text-sm text-secondary flex gap-2 mb-6">
        <CircleAlert size="16" />
        {popupData.warning}
      </p>
    {/if}

    {#if popupTypeOpen === "ACOMPTE"}
      <div class="p-4 text-[#616163] rounded-xl bg-[#DFE5E7] bg-opacity-30 text-xs mb-6">
        {m.popupInfosAcompteNote()}
      </div>
    {/if}

    {#if "actionContext" in popupData}
      <div class="flex justify-center items-center gap-2 mb-6">
        <Button
          type="button"
          variant="outline"
          on:click={close}
          class="rounded-full max-h-[35px] max-w-[250px] min-w-2 px-2  w-full border border-primary text-primary flex justify-center items-center "
        >
          {popupData.actionContext.textCancel}
        </Button>

        <Button
          type="button"
          on:click={confirmAction}
          class=" max-h-[35px] max-w-[250px] min-w-2 px-2  w-full bg-primary rounded-full flex justify-center items-center "
        >
          {popupData.actionContext.textConfirm}
        </Button>
      </div>
    {:else}
      <div class="flex justify-center items-center">
        <Button type="button" on:click={close} class="rounded-lg min-h-[61px] w-full bg-primary ">
          {m.popupInfosButtonGotIt()}
        </Button>
      </div>
    {/if}
  </div>
{/if}

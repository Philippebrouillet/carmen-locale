<script lang="ts">
  import { browser } from "$app/environment";
  import * as Drawer from "$lib/components/ui/drawer";
  import type { PopupType } from "$src/types/PopupInfos";
  import { fade, fly } from "svelte/transition";
  import PopupContent from "./PopupContent.svelte";
  import type { LocationInfo } from "$src/types/Location";
  import { createEventDispatcher } from "svelte";

  export let popupTypeOpen: PopupType | null = null;
  export let location: LocationInfo | null = null;

  let openPopup = false;
  let openPopupMobile = false;
  let clientWidth = browser ? window.innerWidth : 1024;

  const dispatch = createEventDispatcher();

  const closePopup = () => {
    popupTypeOpen = null;
    openPopup = false;
    openPopupMobile = false;
  };

  const confirmAction = () => {
    dispatch("confirmAction");
    closePopup();
  };

  $: if (popupTypeOpen) {
    if (clientWidth > 800) {
      openPopup = true;
      openPopupMobile = false;
    } else {
      openPopupMobile = true;
      openPopup = false;
    }
  }

  $: dataProps = { popupTypeOpen, location };
</script>

{#if popupTypeOpen}
  <div bind:clientWidth class="w-full">
    {#if openPopup}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        in:fade
        class="fixed inset-0 z-[120] bg-black/50 flex items-center justify-center"
        on:click={closePopup}
        on:keydown
        on:keypress
      >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          in:fly|global={{ x: 50 }}
          class="bg-white rounded-xl max-w-lg w-full mx-4 shadow-xl"
          on:click|stopPropagation
        >
          <PopupContent on:close={closePopup} on:confirmAction={confirmAction} {...dataProps} />
        </div>
      </div>
    {:else}
      <Drawer.Root bind:open={openPopupMobile} onClose={closePopup}>
        <Drawer.Content class=" z-[120]">
          <PopupContent on:close={closePopup} on:confirmAction={confirmAction} {...dataProps} />
        </Drawer.Content>
      </Drawer.Root>
    {/if}
  </div>
{/if}

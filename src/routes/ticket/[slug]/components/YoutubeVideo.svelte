<script lang="ts">
  import type { LocationConfig } from "$src/types/Location";
  import * as m from "$lib/paraglide/messages.js";

  export let config: LocationConfig;

  let play = false;

  $: idYoutubeVideo = getYoutubeVideoId(config.youtube_video_url);

  const getYoutubeVideoId = (url?: string | null) => {
    if (!url) return null;
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
</script>

{#if config.youtube_video_on_ticket_enabled}
  <div class="mt-4">
    <h2 class="font-bold text-lg md:text-2xl">{m.youtubeVideoTitle()}</h2>

    <div class="relative aspect-video w-full rounded-lg overflow-hidden bg-black mt-4">
      {#if !play}
        <button class="w-full h-full relative" on:click={() => (play = true)}>
          <img
            src={`https://img.youtube.com/vi/${idYoutubeVideo}/maxresdefault.jpg`}
            class="w-full h-full object-cover"
            alt="video preview"
          />

          <div class="absolute inset-0 flex items-center justify-center">
            <div class="bg-white rounded-full w-16 h-16 flex items-center justify-center text-2xl">
              ▶
            </div>
          </div>
        </button>
      {:else}
        <iframe
          title="YouTube video player"
          class="w-full h-full"
          src={`https://www.youtube.com/embed/${idYoutubeVideo}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media"
          allowfullscreen
        />
      {/if}
    </div>
  </div>
{/if}

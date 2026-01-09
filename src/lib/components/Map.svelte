<script lang="ts">
  import type { LocationInfo } from "$src/types/Location";

  export let location: LocationInfo;

  const query = encodeURIComponent(
    `${location.address}, ${location.zipCode} ${location.city}, France`,
  );

  let retry = 0;
  const MAX_RETRY = 3;

  $: mapSrc = `https://www.google.com/maps?q=${query}&output=embed&retry=${retry}`;

  function handleError() {
    console.log("Map load error, retrying...", retry);
    if (retry < MAX_RETRY) {
      retry += 1;
    }
  }
</script>

<iframe
  title="map"
  class="aspect-[16/9] w-full max-h-96 shadow-lg rounded-2xl"
  src={mapSrc}
  loading="lazy"
  on:error={handleError}
/>

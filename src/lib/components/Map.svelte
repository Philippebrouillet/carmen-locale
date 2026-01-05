<script lang="ts">
  import type { LocationInfo } from "$src/types/Location";

  export let location: LocationInfo;

  const query = encodeURIComponent(
    `${location.address}, ${location.zipCode} ${location.city}, France`,
  );
  const mapSrc = `https://www.google.com/maps?q=${query}&output=embed`;
</script>

<iframe
  title="map"
  class="aspect-[16/9] w-full max-h-96 shadow-lg rounded-2xl"
  src={mapSrc}
  loading="lazy"
/>

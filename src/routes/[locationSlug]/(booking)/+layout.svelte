<script>
  import Footer from "$lib/components/Footer.svelte";
  import { shopStore } from "$src/lib/stores/basketStore";
  import { page } from "$app/stores";
  import { location } from "$src/lib/stores/location.store";

  $: bookingTime = $page.url.searchParams.get("bookingTime");
  $: workerFilterId = $page.url.searchParams.get("workerFilter");
  $: serviceId = $page.url.searchParams.get("serviceId");
  $: selectedService = $location.services.find((s) => s.id == serviceId);
  $: selectedProfessional = $location.workers.find((w) => w.id == workerFilterId);

  $: shopStore.update((prev) => ({
    ...prev,
    selectedService: selectedService,
    selectedProfessional: selectedProfessional,
    bookingTime: bookingTime,
  }));
</script>

<div class="flex h-full flex-col gap-2 pb-16 md:pb-0 md:px-8 lg:px-12 xl:px-16 2xl:px-40">
  <div class="flex flex-col md:flex-row items-center md:items-start w-full">
    <div class="w-full flex-[11] {$shopStore.selectedService ? 'md:pr-10' : ''}">
      <slot />
    </div>
  </div>
  <Footer />
</div>

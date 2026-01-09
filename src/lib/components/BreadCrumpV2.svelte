<script lang="ts">
  import { page } from "$app/stores";
  import { location } from "../stores/location.store";
  import * as m from "$lib/paraglide/messages.js";
  import { languageTag } from "../paraglide/runtime";
  import { browser } from "$app/environment";

  const STEP_DEFINITION = [
    { key: "", label: m.home() },
    { key: "professional", label: m.professional() },
    { key: "services", label: m.services() },
    { key: "schedule", label: m.schedule() },
    { key: "recap", label: m.recap() },
  ];

  $: pathParts = $page.url.pathname.split("/").filter(Boolean);
  $: locationId = $location.location.id;
  $: isFrench = languageTag().split("-")[0] === "fr";
  $: currentStep = isFrench ? pathParts[1] : pathParts[2];

  $: steps = STEP_DEFINITION.filter((step) => {
    if (step.key === "") return true;
    return (
      STEP_DEFINITION.findIndex((s) => s.key === step.key) <=
      STEP_DEFINITION.findIndex((s) => s.key === currentStep)
    );
  });

  function buildHref(stepKey: string) {
    if (!browser) return "#";
    // Récupère les query params actuels
    const searchParams = new URLSearchParams(window?.location?.search);

    // Construit le nouveau path
    const path = stepKey ? `/${locationId}/${stepKey}` : `/${locationId}`;

    // Retourne path + query params
    const queryString = searchParams.toString();
    return queryString ? `${path}?${queryString}` : path;
  }
</script>

<nav class="flex items-center text-sm text-gray-400">
  {#each steps as step, index}
    <a
      href={buildHref(step.key)}
      class="hover:text-primary font-medium"
      class:text-gray-900={step.key === currentStep}
    >
      {step.label}
    </a>

    {#if index < steps.length - 1}
      <span class="mx-1.5">›</span>
    {/if}
  {/each}
</nav>

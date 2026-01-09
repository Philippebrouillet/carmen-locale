<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { getBreadcrumbs } from "$lib/utils/breadcrumb";
  import { onMount } from "svelte";
  import { tick } from "svelte";
  import * as m from "$lib/paraglide/messages.js";
  import { writable } from "svelte/store";
  import { browser } from "$app/environment";
  import { location } from "../stores/location.store";

  let path: string = "";
  let breadcrumbs = [];

  export const currentPath = writable("");

  // FIXME: should be in loader
  if (browser) {
    currentPath.set(window.location.pathname);
    window.addEventListener("popstate", () => {
      currentPath.set(window.location.pathname);
    });
  }

  $: breadcrumbs = getBreadcrumbs(path);

  // Update breadcrumbs when the currentPath changes
  $: {
    currentPath.subscribe((value) => {
      path = value;
    });
  }

  onMount(async () => {
    await tick();
    path = window.location.pathname;
  });
</script>

<Breadcrumb.Root class="hidden md:block">
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href={`/${$location.location.id}`}>{m.home()}</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />

    {#each breadcrumbs.filter((b) => Number.isNaN(Number(b.name))) as { name, href }, i}
      {@const isFirst = i === 0}
      {@const isLast = i === breadcrumbs.length - 1}

      {#if !isFirst}
        <Breadcrumb.Separator />
      {/if}
      <Breadcrumb.Item>
        {#if !isLast}
          <Breadcrumb.Link {href}>{name}</Breadcrumb.Link>
        {:else}
          <Breadcrumb.Page>{name}</Breadcrumb.Page>
        {/if}
      </Breadcrumb.Item>
    {/each}
  </Breadcrumb.List>
</Breadcrumb.Root>

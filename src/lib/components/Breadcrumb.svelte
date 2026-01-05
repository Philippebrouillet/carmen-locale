<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { getBreadcrumbs } from "$lib/utils/breadcrumb";
  import { onMount } from "svelte";
  import { tick } from "svelte";
  import * as m from "$lib/paraglide/messages.js";
  import { writable } from "svelte/store";
  import { browser } from "$app/environment";

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
      <Breadcrumb.Link href="/">{m.home()}</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />

    {#each breadcrumbs as { name, href }, i}
      {#if i > 0}
        <Breadcrumb.Separator />
      {/if}
      <Breadcrumb.Item>
        {#if i < breadcrumbs.length - 1}
          <Breadcrumb.Link {href}>{name}</Breadcrumb.Link>
        {:else}
          <Breadcrumb.Page>{name}</Breadcrumb.Page>
        {/if}
      </Breadcrumb.Item>
    {/each}
  </Breadcrumb.List>
</Breadcrumb.Root>

<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import BackIcon from "$lib/assets/icons/BackIcon.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";

  import type { Page } from "@sveltejs/kit";
  import { derived } from "svelte/store";

  export let text: string;

  // const parentRoute = derived(page, ($page: Page) => {
  //   const segments = $page.url.pathname.split("/").filter(Boolean);
  //   segments.pop();
  //   return "/" + segments.join("/");
  // });

  const navigateBack = (): void => {
    history.back();
  };
</script>

<div class="hidden md:flex flex-col items-start justify-center gap-10 pt-4">
  <Breadcrumb />
  <h2 class="font-bold text-2xl md:-mt-4 hidden md:block">
    {text == "Choisissez votre pro." ? "Choisissez votre professional" : text}
  </h2>
</div>

<header
  class="w-full flex-1 flex flex-col items-center justify-center min-h-[6rem] rounded-b-[1.8rem] md:hidden mb-2"
>
  <div class="flex-1 w-full h-full flex justify-center items-center">
    <div class="flex justify-between w-full items-center px-2">
      <button on:click={navigateBack}>
        <BackIcon />
      </button>
      <h1 class="font-bold text-[1.5rem] text-center text-primary">{text}</h1>
      <div></div>
    </div>
  </div>
</header>

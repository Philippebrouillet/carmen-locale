<script>
  import Footer from "$lib/components/Footer.svelte";
  import { fly } from "svelte/transition";
  import { languageTag } from "$lib/paraglide/runtime.js";
  import { availableLanguageTags } from "$lib/paraglide/runtime";
  import { i18n } from "$lib/i18n";
  import { page } from "$app/stores";

  import * as m from "$lib/paraglide/messages.js";
  import BackIcon from "$src/lib/assets/icons/BackIcon.svelte";
  import { languages } from "./language";
</script>

<main class="w-full">
  <header
    class="w-full flex-1 flex flex-col items-center justify-center min-h-[6rem] rounded-b-[1.8rem] mb-2"
  >
    <div class="flex-1 w-full h-full flex justify-center items-center">
      <div class="flex justify-between w-full items-center px-2">
        <button on:click={() => history.back()}>
          <BackIcon />
        </button>
        <h1 class="font-bold text-[1.5rem] text-center text-primary">{m.chooseYourLanguage()}</h1>
        <div></div>
      </div>
    </div>
  </header>
  <div class="flex flex-col items-center py-6 pb-8">
    <div class="grid grid-cols-3 md:grid-cols-5 gap-2 justify-between w-full md:gap-4 mt-6 px-2">
      {#each availableLanguageTags as lang, index}
        {@const fullname = languages.find((l) => l.code.includes(lang))?.name}
        {@const selectedLanguage = languageTag() == lang}
        <a
          class="hover:shadow-lg cursor-pointer flex flex-col gap-2 items-center rounded-lg p-2 md:p-4 transition-all duration-300 ease-in-out"
          class:bg-secondary={selectedLanguage}
          class:bg-opacity-40={selectedLanguage}
          in:fly|global={{ y: 25, duration: 400, delay: index * 90 }}
          href={i18n.route($page.data.redirect ?? "/")}
          hreflang={lang}
        >
          <img
            src={`/flags/${lang.split("-")[0]}.png`}
            alt={lang}
            class=" w-16 aspect-square object-cover rounded-full"
          />

          <!-- Note: indentation may look off but the code structure is correct -->
          <p class:text-white={selectedLanguage} class="text-[1rem] font-medium capitalize">
            {fullname ? m[fullname]?.() : fullname}
          </p>
        </a>
      {/each}
    </div>
  </div>
</main>

<Footer />

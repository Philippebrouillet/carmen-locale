<script>
  import Footer from "$lib/components/Footer.svelte";
  import { fly } from "svelte/transition";
  import { languageTag } from "$lib/paraglide/runtime.js";
  import { availableLanguageTags } from "$lib/paraglide/runtime";
  import { i18n } from "$lib/i18n";
  import { page } from "$app/stores";
</script>

<main class="w-full">
  <header
    class="relative flex-1 flex flex-col items-center min-h-[13rem] md:h-[13rem] w-full p-4 md:py-6 md:px-16 bg-[url('/location-cover.webp')] bg-cover bg-no-repeat mb-10 rounded-b-[1.8rem]"
  >
    <div class="w-fit flex flex-col text-primary-foreground z-10 items-center">
      <h2 class="font-bold text-[3rem]">Carden</h2>
      <p class="-mt-2 text-[1.25rem]">Your Care Garden</p>
    </div>
    <img
      in:fly={{ y: 25, duration: 400 }}
      src="/logo.png"
      alt="logo"
      class="absolute left-auto right-auto -bottom-10 w-28 h-28 z-10 rounded-full border-[1px] border-white shadow-md"
    />
    <div
      class="w-full h-full bg-[#150B3DB2] bg-opacity-50 rounded-b-[1.8rem] absolute top-0 left-0"
    />
  </header>
  <div class="flex flex-col items-center py-6 pb-8">
    <h2 class="text-[1.25rem] md:text-[1.5rem] md:leading-[1.5rem] font-bold">WELCOME</h2>
    <h1 class="text-[1rem] md:text-[1.25rem] font-bold">Please choose your language</h1>
    <h3 class="text-sm opacity-60">Oneclick experience for your booking & payment</h3>
    <div class="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mt-6">
      {#each availableLanguageTags as lang, index}
        <a
          class="hover:shadow-lg cursor-pointer flex flex-col gap-2 items-center rounded-lg p-2 md:p-4 transition-all duration-300 ease-in-out"
          class:shadow-lg={languageTag() == lang}
          in:fly|global={{ y: 25, duration: 400, delay: index * 90 }}
          href={i18n.route($page.data.redirect ?? "/")}
          hreflang={lang}
        >
          <img
            src={`/flags/${lang.split("-")[0]}.png`}
            alt={lang}
            class=" w-16 aspect-square object-cover rounded-full"
          />
          <p class="text-[1rem] font-medium capitalize">{lang}</p>
        </a>
      {/each}
    </div>
  </div>
</main>

<Footer />

import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, d as each, v as validate_component, a as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { g as getTranslationFunctions } from "../../../chunks/index3.js";
import { F as Footer } from "../../../chunks/Footer.js";
import { l as languageTag, a as availableLanguageTags } from "../../../chunks/runtime.js";
import { i as i18n } from "../../../chunks/i18n.js";
import { p as page } from "../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  $$unsubscribe_page();
  return `<main class="w-full"><header class="relative flex-1 flex flex-col items-center min-h-[13rem] md:h-[13rem] w-full p-4 md:py-6 md:px-16 bg-[url('/location-cover.webp')] bg-cover bg-no-repeat mb-10 rounded-b-[1.8rem]"><div class="w-fit flex flex-col text-primary-foreground z-10 items-center" data-svelte-h="svelte-1xxtg0y"><h2 class="font-bold text-[3rem]">Carden</h2> <p class="-mt-2 text-[1.25rem]">Your Care Garden</p></div> <img src="/logo.png" alt="logo" class="absolute left-auto right-auto -bottom-10 w-28 h-28 z-10 rounded-full border-[1px] border-white shadow-md"> <div class="w-full h-full bg-[#150B3DB2] bg-opacity-50 rounded-b-[1.8rem] absolute top-0 left-0"></div></header> <div class="flex flex-col items-center py-6 pb-8"><h2 class="text-[1.25rem] md:text-[1.5rem] md:leading-[1.5rem] font-bold" data-svelte-h="svelte-1mxyds9">WELCOME</h2> <h1 class="text-[1rem] md:text-[1.25rem] font-bold" data-svelte-h="svelte-c8kg40">Please choose your language</h1> <h3 class="text-sm opacity-60" data-svelte-h="svelte-ore9eu">Oneclick experience for your booking &amp; payment</h3> <div class="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mt-6">${each(availableLanguageTags, (lang, index) => {
    return `<a class="${[
      "hover:shadow-lg cursor-pointer flex flex-col gap-2 items-center rounded-lg p-2 md:p-4 transition-all duration-300 ease-in-out",
      languageTag() == lang ? "shadow-lg" : ""
    ].join(" ").trim()}"${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(i18n.route($page.data.redirect ?? "/"), lang), 0)}${add_attribute("hreflang", lang, 0)}><img${add_attribute("src", `/flags/${lang.split("-")[0]}.png`, 0)}${add_attribute("alt", lang, 0)} class="w-16 aspect-square object-cover rounded-full"> <p class="text-[1rem] font-medium capitalize">${escape(lang)}</p> </a>`;
  })}</div></div></main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

// file initialized by the Paraglide-SvelteKit CLI - Feel free to edit it
import { createI18n } from "@inlang/paraglide-sveltekit";
import * as runtime from "$lib/paraglide/runtime.js";

type LanguageTag = (typeof runtime.availableLanguageTags)[number];
function getDefaultLanguage(): LanguageTag {
  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.split("-")[0] as LanguageTag;
    if (runtime.availableLanguageTags.includes(browserLang)) {
      return browserLang;
    }
  }
  return "fr";
}

export const i18n = createI18n(runtime, {
  defaultLanguageTag: getDefaultLanguage(),
});

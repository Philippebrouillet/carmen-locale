import { s as subscribe } from "./utils.js";
import { c as create_ssr_component, d as each, a as add_attribute, e as escape, v as validate_component } from "./ssr.js";
import { p as page } from "./stores.js";
import "clsx";
import { l as location } from "./location.store.js";
import { g as getTranslationFunctions } from "./index3.js";
import { l as languageTag } from "./runtime.js";
import { c as clock } from "./clock.svelte.js";
import { c as computeQueue } from "./QueueLine.js";
const home$a = /* @__NO_SIDE_EFFECTS__ */ () => `Accueil`;
const home$9 = /* @__NO_SIDE_EFFECTS__ */ () => `بيت`;
const home$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Home`;
const home$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Hogar`;
const home$6 = /* @__NO_SIDE_EFFECTS__ */ () => `घर`;
const home$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Casa`;
const home$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Thuis`;
const home$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Lar`;
const home$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Дом`;
const home$1 = /* @__NO_SIDE_EFFECTS__ */ () => `家`;
const home = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: home$9,
    en: home$8,
    es: home$7,
    fr: home$a,
    hi: home$6,
    it: home$5,
    nl: home$4,
    pt: home$3,
    ru: home$2,
    zh: home$1
  }[options.languageTag ?? languageTag()]();
};
const professional$a = /* @__NO_SIDE_EFFECTS__ */ () => `Professionnel`;
const professional$9 = /* @__NO_SIDE_EFFECTS__ */ () => `احترافي`;
const professional$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Professional`;
const professional$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Profesional`;
const professional$6 = /* @__NO_SIDE_EFFECTS__ */ () => `पेशेवर`;
const professional$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Professionale`;
const professional$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Professioneel`;
const professional$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Profissional`;
const professional$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Профессиональный`;
const professional$1 = /* @__NO_SIDE_EFFECTS__ */ () => `专业的`;
const professional = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: professional$9,
    en: professional$8,
    es: professional$7,
    fr: professional$a,
    hi: professional$6,
    it: professional$5,
    nl: professional$4,
    pt: professional$3,
    ru: professional$2,
    zh: professional$1
  }[options.languageTag ?? languageTag()]();
};
const services$a = /* @__NO_SIDE_EFFECTS__ */ () => `Services`;
const services$9 = /* @__NO_SIDE_EFFECTS__ */ () => `خدمات`;
const services$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Services`;
const services$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Servicios`;
const services$6 = /* @__NO_SIDE_EFFECTS__ */ () => `सेवाएं`;
const services$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Servizi`;
const services$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Diensten`;
const services$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Serviços`;
const services$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Услуги`;
const services$1 = /* @__NO_SIDE_EFFECTS__ */ () => `服务`;
const services = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: services$9,
    en: services$8,
    es: services$7,
    fr: services$a,
    hi: services$6,
    it: services$5,
    nl: services$4,
    pt: services$3,
    ru: services$2,
    zh: services$1
  }[options.languageTag ?? languageTag()]();
};
const schedule$a = /* @__NO_SIDE_EFFECTS__ */ () => `Horaire`;
const schedule$9 = /* @__NO_SIDE_EFFECTS__ */ () => `جدول`;
const schedule$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Schedule`;
const schedule$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Cronograma`;
const schedule$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अनुसूची`;
const schedule$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Programma`;
const schedule$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Schema`;
const schedule$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Agendar`;
const schedule$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Расписание`;
const schedule$1 = /* @__NO_SIDE_EFFECTS__ */ () => `日程`;
const schedule = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: schedule$9,
    en: schedule$8,
    es: schedule$7,
    fr: schedule$a,
    hi: schedule$6,
    it: schedule$5,
    nl: schedule$4,
    pt: schedule$3,
    ru: schedule$2,
    zh: schedule$1
  }[options.languageTag ?? languageTag()]();
};
const recap$a = /* @__NO_SIDE_EFFECTS__ */ () => `Récapitulatif`;
const recap$9 = /* @__NO_SIDE_EFFECTS__ */ () => `ملخص`;
const recap$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Summary`;
const recap$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Resumen`;
const recap$6 = /* @__NO_SIDE_EFFECTS__ */ () => `सारांश`;
const recap$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Riepilogo`;
const recap$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Samenvatting`;
const recap$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Resumo`;
const recap$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Краткое содержание`;
const recap$1 = /* @__NO_SIDE_EFFECTS__ */ () => `概括`;
const recap = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: recap$9,
    en: recap$8,
    es: recap$7,
    fr: recap$a,
    hi: recap$6,
    it: recap$5,
    nl: recap$4,
    pt: recap$3,
    ru: recap$2,
    zh: recap$1
  }[options.languageTag ?? languageTag()]();
};
const BackIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76"></path></svg>`;
});
const BreadCrumpV2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pathParts;
  let isFrench;
  let currentStep;
  let steps;
  let $location, $$unsubscribe_location;
  let $page, $$unsubscribe_page;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const STEP_DEFINITION = [
    { key: "", label: /* @__PURE__ */ home() },
    {
      key: "professional",
      label: /* @__PURE__ */ professional()
    },
    { key: "services", label: /* @__PURE__ */ services() },
    { key: "schedule", label: /* @__PURE__ */ schedule() },
    { key: "recap", label: /* @__PURE__ */ recap() }
  ];
  function buildHref(stepKey) {
    return "#";
  }
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  pathParts = $page.url.pathname.split("/").filter(Boolean);
  $location.location.id;
  isFrench = languageTag().split("-")[0] === "fr";
  currentStep = isFrench ? pathParts[1] : pathParts[2];
  steps = STEP_DEFINITION.filter((step) => {
    if (step.key === "") return true;
    return STEP_DEFINITION.findIndex((s) => s.key === step.key) <= STEP_DEFINITION.findIndex((s) => s.key === currentStep);
  });
  $$unsubscribe_location();
  $$unsubscribe_page();
  return `<nav class="flex items-center text-sm text-gray-400">${each(steps, (step, index) => {
    return `<a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(buildHref(step.key), void 0), 0)} class="${[
      "hover:text-primary font-medium",
      step.key === currentStep ? "text-gray-900" : ""
    ].join(" ").trim()}">${escape(step.label)}</a> ${index < steps.length - 1 ? `<span class="mx-1.5" data-svelte-h="svelte-y0bfjl">›</span>` : ``}`;
  })}</nav>`;
});
const BookingHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let start;
  let $$unsubscribe_page;
  let $clock, $$unsubscribe_clock;
  let $location, $$unsubscribe_location;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_clock = subscribe(clock, (value) => $clock = value);
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  let { text } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0) $$bindings.text(text);
  start = new Date(new Date($clock).getTime() + 5 * 60 * 1e3);
  computeQueue($location, new Date($clock), start);
  $$unsubscribe_page();
  $$unsubscribe_clock();
  $$unsubscribe_location();
  return `<div class="hidden md:flex flex-col items-start justify-center gap-10 pt-4"> ${validate_component(BreadCrumpV2, "BreadCrumpV2").$$render($$result, {}, {}, {})} <h2 class="font-bold text-2xl md:-mt-4 hidden md:block">${escape(text == "Choisissez votre pro." ? "Choisissez votre professional" : text)}</h2></div> <header class="w-full flex-1 flex flex-col items-center justify-center min-h-[6rem] rounded-b-[1.8rem] md:hidden mb-2"><div class="flex-1 w-full h-full flex justify-center items-center"><div class="flex justify-between w-full items-center px-2"><button>${validate_component(BackIcon, "BackIcon").$$render($$result, {}, {}, {})}</button> <h1 class="font-bold text-[1.5rem] text-center text-primary">${escape(text)}</h1> <div></div></div></div></header>`;
});
export {
  BookingHeader as B
};

import { s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component, a as add_attribute, v as validate_component, e as escape, d as each } from "../../../../../chunks/ssr.js";
import { g as getTranslationFunctions } from "../../../../../chunks/index3.js";
import { l as location } from "../../../../../chunks/location.store.js";
import { B as BookingHeader } from "../../../../../chunks/BookingHeader.js";
import { c as clock } from "../../../../../chunks/clock.svelte.js";
import { l as languageTag } from "../../../../../chunks/runtime.js";
import { a as anyProfessional } from "../../../../../chunks/anyProfessional.js";
import { P as PlaceholderAvatar } from "../../../../../chunks/PlaceholderAvatar.js";
import { b as displayDurationMs, a as displayWaitingTime } from "../../../../../chunks/formater.js";
import { u as unavailableShort, a as availableNow } from "../../../../../chunks/unavailableShort.js";
import { p as peopleInQueue } from "../../../../../chunks/peopleInQueue.js";
import { c as computeQueue } from "../../../../../chunks/QueueLine.js";
const chooseProfessional$a = /* @__NO_SIDE_EFFECTS__ */ () => `Choisissez votre pro.`;
const chooseProfessional$9 = /* @__NO_SIDE_EFFECTS__ */ () => `اختر المحترف الخاص بك.`;
const chooseProfessional$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Choose your pro.`;
const chooseProfessional$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Elige tu profesional.`;
const chooseProfessional$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अपना समर्थक चुनें.`;
const chooseProfessional$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Scegli il tuo professionista.`;
const chooseProfessional$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Kies uw professional.`;
const chooseProfessional$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Escolha o seu profissional.`;
const chooseProfessional$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Выберите своего профессионала.`;
const chooseProfessional$1 = /* @__NO_SIDE_EFFECTS__ */ () => `选择您的专业人士。`;
const chooseProfessional = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: chooseProfessional$9,
    en: chooseProfessional$8,
    es: chooseProfessional$7,
    fr: chooseProfessional$a,
    hi: chooseProfessional$6,
    it: chooseProfessional$5,
    nl: chooseProfessional$4,
    pt: chooseProfessional$3,
    ru: chooseProfessional$2,
    zh: chooseProfessional$1
  }[options.languageTag ?? languageTag()]();
};
const estimated_abrv$a = /* @__NO_SIDE_EFFECTS__ */ () => `Env.`;
const estimated_abrv$9 = /* @__NO_SIDE_EFFECTS__ */ () => `EST.`;
const estimated_abrv$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Est.`;
const estimated_abrv$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Est.`;
const estimated_abrv$6 = /* @__NO_SIDE_EFFECTS__ */ () => `ईएसटी।`;
const estimated_abrv$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Est.`;
const estimated_abrv$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Est.`;
const estimated_abrv$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Husa.`;
const estimated_abrv$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Стандартное восточное время.`;
const estimated_abrv$1 = /* @__NO_SIDE_EFFECTS__ */ () => `美东时间。`;
const estimated_abrv = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: estimated_abrv$9,
    en: estimated_abrv$8,
    es: estimated_abrv$7,
    fr: estimated_abrv$a,
    hi: estimated_abrv$6,
    it: estimated_abrv$5,
    nl: estimated_abrv$4,
    pt: estimated_abrv$3,
    ru: estimated_abrv$2,
    zh: estimated_abrv$1
  }[options.languageTag ?? languageTag()]();
};
const RandomIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { theme = "NEUTRAL" } = $$props;
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  return `${theme === "NEUTRAL" ? `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 57C41.6274 57 47 51.6274 47 45C47 38.3726 41.6274 33 35 33C28.3726 33 23 38.3726 23 45C23 51.6274 28.3726 57 35 57Z" fill="#DFE5E7"></path><path d="M15 85C15 65 55 65 55 85H15Z" fill="#DFE5E7"></path><path d="M65 57C71.6274 57 77 51.6274 77 45C77 38.3726 71.6274 33 65 33C58.3726 33 53 38.3726 53 45C53 51.6274 58.3726 57 65 57Z" fill="#DFE5E7"></path><path d="M45 85C45 65 85 65 85 85H45Z" fill="#DFE5E7"></path><path d="M50 54C57.732 54 64 47.732 64 40C64 32.268 57.732 26 50 26C42.268 26 36 32.268 36 40C36 47.732 42.268 54 50 54Z" fill="#616163"></path><path d="M25 85C25 60 75 60 75 85H25Z" fill="#616163"></path></svg>` : ``} ${theme === "CARDEN" ? `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 57C41.6274 57 47 51.6274 47 45C47 38.3726 41.6274 33 35 33C28.3726 33 23 38.3726 23 45C23 51.6274 28.3726 57 35 57Z" fill="#C7E0FF"></path><path d="M15 85C15 65 55 65 55 85H15Z" fill="#C7E0FF"></path><path d="M65 57C71.6274 57 77 51.6274 77 45C77 38.3726 71.6274 33 65 33C58.3726 33 53 38.3726 53 45C53 51.6274 58.3726 57 65 57Z" fill="#C7E0FF"></path><path d="M45 85C45 65 85 65 85 85H45Z" fill="#C7E0FF"></path><path d="M50 54C57.732 54 64 47.732 64 40C64 32.268 57.732 26 50 26C42.268 26 36 32.268 36 40C36 47.732 42.268 54 50 54Z" fill="#0073FF"></path><path d="M25 85C25 60 75 60 75 85H25Z" fill="#0073FF"></path></svg>` : ``} ${theme === "PINK" ? `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 57C41.6274 57 47 51.6274 47 45C47 38.3726 41.6274 33 35 33C28.3726 33 23 38.3726 23 45C23 51.6274 28.3726 57 35 57Z" fill="#E5CEF7"></path><path d="M15 85C15 65 55 65 55 85H15Z" fill="#E5CEF7"></path><path d="M65 57C71.6274 57 77 51.6274 77 45C77 38.3726 71.6274 33 65 33C58.3726 33 53 38.3726 53 45C53 51.6274 58.3726 57 65 57Z" fill="#E5CEF7"></path><path d="M45 85C45 65 85 65 85 85H45Z" fill="#E5CEF7"></path><path d="M50 54C57.732 54 64 47.732 64 40C64 32.268 57.732 26 50 26C42.268 26 36 32.268 36 40C36 47.732 42.268 54 50 54Z" fill="#CF95FB"></path><path d="M25 85C25 60 75 60 75 85H25Z" fill="#CF95FB"></path></svg>` : ``}`;
});
const WorkerCardItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let now;
  let next;
  let duration;
  let isPinkThemeAndWaiting;
  let nextAvailableTime;
  let $location, $$unsubscribe_location;
  let $clock, $$unsubscribe_clock;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_clock = subscribe(clock, (value) => $clock = value);
  let { worker } = $$props;
  if ($$props.worker === void 0 && $$bindings.worker && worker !== void 0) $$bindings.worker(worker);
  now = new Date($clock);
  next = worker?.nextAvailable?.next ? new Date(worker.nextAvailable.next) : /* @__PURE__ */ new Date();
  duration = Math.floor(next.getTime() - now.getTime());
  isPinkThemeAndWaiting = $location.location.theme === "PINK" && worker.formatedStatus === "waiting";
  nextAvailableTime = worker.nextAvailable?.next;
  $$unsubscribe_location();
  $$unsubscribe_clock();
  return `${worker.avatar ? `<img${add_attribute("src", worker.avatar, 0)}${add_attribute("alt", worker.name, 0)} class="w-full aspect-square rounded-t-xl">` : `${validate_component(PlaceholderAvatar, "PlaceholderAvatar").$$render($$result, { name: worker.name, shape: "square" }, {}, {})}`} <div class="flex flex-col mb-2 w-full mt-2"><h3 class="font-bold w-full text-primary">${escape(worker.name)}</h3> <div class="flex flex-row items-center gap-1">  ${worker.formatedStatus === "unavailable" || nextAvailableTime == null ? `<p class="text-[#DFE5E7] text-sm font-bold w-full">${escape(unavailableShort())}</p>` : `${worker.formatedStatus == "available" ? `<p class="text-[#00D4AA] text-sm font-bold w-full">${escape(availableNow())}</p>` : `${worker.formatedStatus == "waiting" ? `<p${add_attribute("class", `text-sm font-bold w-full ${isPinkThemeAndWaiting ? "text-pink" : "text-[#0073FF]"}`, 0)}>${escape(peopleInQueue({
    number: worker.nextAvailable?.ticketBefore || 0
  }))}</p>` : ``}`}`}</div></div> <div class="relative flex flex-row items-center justify-between gap-2 w-full"><p class="text-xs text-[#616163]">${escape(/* @__PURE__ */ estimated_abrv())} ${escape(displayDurationMs(duration))}</p> <div class="rounded-l-md bg-[#DFE5E7] text-sm font-bold p-1 px-2 -mr-4">${escape(displayWaitingTime(next))}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let start;
  let workers;
  let theme;
  let $location, $$unsubscribe_location;
  let $clock, $$unsubscribe_clock;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_clock = subscribe(clock, (value) => $clock = value);
  const randomIconBackGroundColorsByTheme = {
    NEUTRAL: "bg-[#F7F7F7]",
    PINK: "bg-[#FFF5FA]",
    CARDEN: "bg-[#F8FAFD]"
  };
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  start = new Date(new Date($clock).getTime() + 5 * 60 * 1e3);
  workers = computeQueue($location, new Date($clock), start).filter((w) => w.formatedStatus !== "unavailable");
  theme = $location.location.theme;
  $$unsubscribe_location();
  $$unsubscribe_clock();
  return `<main class="w-full flex flex-col md:items-start">${validate_component(BookingHeader, "BookingHeader").$$render($$result, { text: /* @__PURE__ */ chooseProfessional() }, {}, {})} <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-fit md:w-full px-2 lg:px-0 lg:mt-4"><a class="border bg-white rounded-xl p-4 flex flex-col flex-1 items-center h-full transition-all duration-300 ease-in-out hover:shadow-xl"${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`services`, void 0), 0)}><div class="${"w-full aspect-square rounded-t-xl " + escape(randomIconBackGroundColorsByTheme[theme], true) + " mb-2 flex justify-center items-center"}">${validate_component(RandomIcon, "RandomIcon").$$render($$result, { theme }, {}, {})}</div> <h3 class="font-bold text-left w-full text-primary mt-2">${escape(anyProfessional())}</h3></a> ${each(workers, (worker, i) => {
    return `<a class="relative bg-white border rounded-xl p-4 flex flex-col flex-1 gap-2 items-center h-full transition-all duration-300 ease-in-out hover:shadow-xl text-left"${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`services/?workerFilter=${worker.id}`, void 0), 0)}>${validate_component(WorkerCardItem, "WorkerCardItem").$$render($$result, { worker }, {}, {})} </a>`;
  })}</div></main>`;
});
export {
  Page as default
};

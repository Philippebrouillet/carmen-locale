import { s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component, a as add_attribute, e as escape, v as validate_component, d as each } from "../../../../../chunks/ssr.js";
import { l as location } from "../../../../../chunks/location.store.js";
import { l as languageTag } from "../../../../../chunks/runtime.js";
import { B as BookingHeader } from "../../../../../chunks/BookingHeader.js";
import { g as getTranslationFunctions } from "../../../../../chunks/index3.js";
import { d as displayPriceInDollars } from "../../../../../chunks/formater.js";
import { I as Info, T as Trending_up, a as Tag, P as Popup } from "../../../../../chunks/Popup.js";
import { p as page } from "../../../../../chunks/stores.js";
import { b as backgroundColorByTheme } from "../../../../../chunks/Location.js";
const chooseService$a = /* @__NO_SIDE_EFFECTS__ */ () => `Choisissez votre service`;
const chooseService$9 = /* @__NO_SIDE_EFFECTS__ */ () => `اختر الخدمة الخاصة بك`;
const chooseService$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Choose your service`;
const chooseService$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Elige tu servicio`;
const chooseService$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अपनी सेवा चुनें`;
const chooseService$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Scegli il tuo servizio`;
const chooseService$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Kies uw dienst`;
const chooseService$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Escolha seu serviço`;
const chooseService$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Выберите свой сервис`;
const chooseService$1 = /* @__NO_SIDE_EFFECTS__ */ () => `选择您的服务`;
const chooseService = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: chooseService$9,
    en: chooseService$8,
    es: chooseService$7,
    fr: chooseService$a,
    hi: chooseService$6,
    it: chooseService$5,
    nl: chooseService$4,
    pt: chooseService$3,
    ru: chooseService$2,
    zh: chooseService$1
  }[options.languageTag ?? languageTag()]();
};
const lastMinuteText$a = /* @__NO_SIDE_EFFECTS__ */ () => `Les tarifs ajustés en dernière minute sont signalés par ce symbole.`;
const lastMinuteText$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يشير هذا الرمز إلى تعديلات الأسعار في اللحظات الأخيرة.`;
const lastMinuteText$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Last-minute price adjustments are indicated by this symbol.`;
const lastMinuteText$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Los ajustes de precios de último momento se indican con este símbolo.`;
const lastMinuteText$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अंतिम समय में कीमतों में होने वाले बदलावों को इस चिह्न द्वारा दर्शाया गया है।`;
const lastMinuteText$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Gli adeguamenti di prezzo dell'ultimo minuto sono indicati da questo simbolo.`;
const lastMinuteText$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Prijsaanpassingen op het laatste moment worden aangegeven met dit symbool.`;
const lastMinuteText$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Ajustes de preço de última hora são indicados por este símbolo.`;
const lastMinuteText$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Этим символом обозначаются корректировки цен в последнюю минуту.`;
const lastMinuteText$1 = /* @__NO_SIDE_EFFECTS__ */ () => `此符号表示价格在最后一刻进行了调整。`;
const lastMinuteText = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: lastMinuteText$9,
    en: lastMinuteText$8,
    es: lastMinuteText$7,
    fr: lastMinuteText$a,
    hi: lastMinuteText$6,
    it: lastMinuteText$5,
    nl: lastMinuteText$4,
    pt: lastMinuteText$3,
    ru: lastMinuteText$2,
    zh: lastMinuteText$1
  }[options.languageTag ?? languageTag()]();
};
const moreInfo$a = /* @__NO_SIDE_EFFECTS__ */ () => `Plus d’infos`;
const moreInfo$9 = /* @__NO_SIDE_EFFECTS__ */ () => `للمزيد من المعلومات`;
const moreInfo$8 = /* @__NO_SIDE_EFFECTS__ */ () => `More information`;
const moreInfo$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Más información`;
const moreInfo$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अधिक जानकारी`;
const moreInfo$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Ulteriori informazioni`;
const moreInfo$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Meer informatie`;
const moreInfo$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Mais informações`;
const moreInfo$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Более подробная информация`;
const moreInfo$1 = /* @__NO_SIDE_EFFECTS__ */ () => `更多信息`;
const moreInfo = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: moreInfo$9,
    en: moreInfo$8,
    es: moreInfo$7,
    fr: moreInfo$a,
    hi: moreInfo$6,
    it: moreInfo$5,
    nl: moreInfo$4,
    pt: moreInfo$3,
    ru: moreInfo$2,
    zh: moreInfo$1
  }[options.languageTag ?? languageTag()]();
};
const lowerPriceText$a = /* @__NO_SIDE_EFFECTS__ */ () => `Offres du moment : Profitez de tarifs réduits sur une sélection de services.`;
const lowerPriceText$9 = /* @__NO_SIDE_EFFECTS__ */ () => `العروض الحالية: استفد من الأسعار المخفضة على مجموعة مختارة من الخدمات.`;
const lowerPriceText$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Current offers: Take advantage of reduced rates on a selection of services.`;
const lowerPriceText$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Ofertas vigentes: Aprovecha tarifas reducidas en una selección de servicios.`;
const lowerPriceText$6 = /* @__NO_SIDE_EFFECTS__ */ () => `वर्तमान ऑफर: चुनिंदा सेवाओं पर कम दरों का लाभ उठाएं।`;
const lowerPriceText$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Offerte attuali: Approfitta delle tariffe scontate su una selezione di servizi.`;
const lowerPriceText$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Actuele aanbiedingen: Profiteer van gereduceerde tarieven voor diverse diensten.`;
const lowerPriceText$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Ofertas atuais: Aproveite as tarifas reduzidas em uma seleção de serviços.`;
const lowerPriceText$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Актуальные предложения: Воспользуйтесь сниженными ценами на ряд услуг.`;
const lowerPriceText$1 = /* @__NO_SIDE_EFFECTS__ */ () => `当前优惠：部分服务可享折扣价。`;
const lowerPriceText = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: lowerPriceText$9,
    en: lowerPriceText$8,
    es: lowerPriceText$7,
    fr: lowerPriceText$a,
    hi: lowerPriceText$6,
    it: lowerPriceText$5,
    nl: lowerPriceText$4,
    pt: lowerPriceText$3,
    ru: lowerPriceText$2,
    zh: lowerPriceText$1
  }[options.languageTag ?? languageTag()]();
};
const ServiceBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $location, $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  let { selected = false } = $$props;
  let { service } = $$props;
  let { index } = $$props;
  let { href } = $$props;
  let { backgroundColor } = $$props;
  const imageBackgroundColorByTheme = {
    NEUTRAL: "bg-[#F7F7F7]",
    PINK: "bg-[#FFF5FA]",
    CARDEN: "bg-[#F8FAFD]"
  };
  let isOpenFullDescription = ["nouveau", "evenement", "combo"].includes(service.tag?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
  if ($$props.service === void 0 && $$bindings.service && service !== void 0) $$bindings.service(service);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.backgroundColor === void 0 && $$bindings.backgroundColor && backgroundColor !== void 0) $$bindings.backgroundColor(backgroundColor);
  $$unsubscribe_location();
  return `<a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(href, void 0), 0)} class="${[
    "border relative border-[#E5E7EB] rounded-xl shadow-sm w-full p-2 flex " + escape(isOpenFullDescription ? "flex-col" : "justify-between", true) + " gap-2 transition-all duration-300 ease-in-out hover:shadow-xl bg-white",
    (selected ? "bg-muted" : "") + " " + (selected ? "text-muted-foreground" : "")
  ].join(" ").trim()}"><button class="absolute top-2 right-2">${validate_component(Info, "Info").$$render(
    $$result,
    {
      class: "text-[#DFE5E7] hover:text-gray-400 transition-all transform duration-100",
      size: "16"
    },
    {},
    {}
  )}</button> <div class="flex gap-2"><img class="${"rounded-lg border aspect-square object-cover transition-all duration-100 " + escape(
    isOpenFullDescription ? " h-[190px] w-[190px]" : " h-[75px] w-[75px]",
    true
  ) + " " + escape(imageBackgroundColorByTheme[$location.location.theme], true)}"${add_attribute("src", service.image, 0)}${add_attribute("alt", service.image ? service.name : "", 0)}> <div class="flex flex-col w-full items-start"><h3 class="font-bold text-left text-primary">${escape(service.name)}</h3> <span class="text-xs text-secondary">${escape(service.durationS / 60)} - ${escape(service.durationS / 60 + 5)}
        min</span> <p class="${"text-xs text-left text-secondary break-all transition-all duration-100 " + escape(!isOpenFullDescription ? "line-clamp-2" : "", true)}">${escape(service.description)}</p></div></div> <div class="${"flex " + escape(isOpenFullDescription ? "" : "min-h-full pt-5", true) + " flex-col items-end justify-end gap-1"}">${service.discountedPrice ? `<div class="${"flex items-center gap-1.5 " + escape(
    service.discountedPrice > service.price ? "text-[#7832DC]" : "text-[#23BBAC]",
    true
  )}">${service.discountedPrice > service.price ? `<div>${validate_component(Trending_up, "TrendingUp").$$render($$result, { size: "16" }, {}, {})}</div>` : `<div class="rotate-90">${validate_component(Tag, "Tag").$$render($$result, { size: "14" }, {}, {})}</div>`} <div class="rounded-l-md text-sm font-semibold whitespace-nowrap">${escape(displayPriceInDollars(service.discountedPrice))}</div></div>` : ``} <div class="${[
    "rounded-l-md text-sm font-semibold whitespace-nowrap",
    service.discountedPrice ? "line-through" : ""
  ].join(" ").trim()}">${escape(displayPriceInDollars(service.price))}</div> ${service.tag ? `<div class="${"text-white text-xs uppercase font-extrabold " + escape(backgroundColor, true) + " p-1 px-2 rounded-[5px] whitespace-nowrap"}">${escape(service.tag)}</div>` : ``}</div></a>`;
});
let selectedServiceID = null;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let services;
  let categories;
  let theme;
  let backgroundColor;
  let haveUpPrice;
  let haveDownPrice;
  let servicesWithoutCategory;
  let $location, $$unsubscribe_location;
  let $page, $$unsubscribe_page;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let popupTypeOpen = null;
  function createServiceUrl(serviceId) {
    let url = new URL(`/${$location.location.id}/schedule`, $page.url.origin);
    if (data.workerFilter) {
      url.searchParams.set("workerFilter", data.workerFilter);
    }
    url.searchParams.set("serviceId", serviceId.toString());
    return url.toString();
  }
  const backgroundColorSurchageByTheme = {
    NEUTRAL: "bg-[#DFE5E7]",
    PINK: "bg-[#E5CEF7]",
    CARDEN: "bg-[#C7E0FF]"
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    services = $location.services;
    categories = $location.location.categories;
    theme = $location.location.theme;
    backgroundColor = backgroundColorByTheme[theme];
    haveUpPrice = services.some((s) => s.discountedPrice && s.discountedPrice > s.price);
    haveDownPrice = services.some((s) => s.discountedPrice && s.discountedPrice < s.price);
    servicesWithoutCategory = services.filter((s) => !s.categoryId);
    $$rendered = `<main class="w-full flex flex-col"><div class="px-4">${validate_component(BookingHeader, "BookingHeader").$$render($$result, { text: /* @__PURE__ */ chooseService() }, {}, {})}</div> <div class="flex gap-2 overflow-x-auto mb-2 md:mt-2 px-4 py-2 sticky top-0 z-10 transform transition-all duration-100">${each(categories, (category) => {
      return `<button class="${"flex justify-center items-center px-4 py-2 border hover:" + escape(backgroundColor, true) + " focus:" + escape(backgroundColor, true) + " bg-white rounded-2xl group transition-all duration-100"}"><h2 class="text-xs font-normal text-[#616163] group-hover:text-white whitespace-nowrap">${escape(category.name)}</h2> </button>`;
    })}</div>  <div class="mb-6 flex flex-col gap-2 px-4">${haveUpPrice ? `<div class="${escape(backgroundColorSurchageByTheme[theme], true) + " bg-opacity-30 p-2 flex gap-2 items-center rounded-xl"}"><div class="text-[#7832DC] bg-[#7832DC] bg-opacity-15 flex justify-center items-center p-2 rounded-xl">${validate_component(Trending_up, "TrendingUp").$$render($$result, {}, {}, {})}</div> <p class="text-secondary text-sm">${escape(/* @__PURE__ */ lastMinuteText())} <button class="underline underline-offset-2">${escape(/* @__PURE__ */ moreInfo())}</button></p></div>` : ``} ${haveDownPrice && !haveUpPrice ? `<div class="${escape(backgroundColorSurchageByTheme[theme], true) + " bg-opacity-30 p-2 flex gap-2 items-center rounded-xl"}"><div class="text-[#23BBAC] bg-[#23BBAC] bg-opacity-20 flex justify-center items-center p-2 rounded-xl transform rotate-90">${validate_component(Tag, "Tag").$$render($$result, {}, {}, {})}</div> <p class="text-secondary text-sm">${escape(/* @__PURE__ */ lowerPriceText())} <button class="underline underline-offset-2">${escape(/* @__PURE__ */ moreInfo())}</button></p></div>` : ``}</div> <div class="px-4">${each(categories, (category) => {
      return `<h2${add_attribute("id", String(category.id), 0)} class="col-span-full font-bold text-primary">${escape(category.name)}</h2> <p class="text-xs text-[#616163] mb-3">${escape(category.description || "")}</p> <div class="grid grid-cols-1 md:grid-cols-2 w-full gap-4 justify-center md:justify-start mb-8">${each(services.filter((s) => s.categoryId === category.id), (service, i) => {
        return `${validate_component(ServiceBox, "ServiceBox").$$render(
          $$result,
          {
            backgroundColor,
            href: createServiceUrl(service.id),
            service,
            index: i,
            selected: selectedServiceID == service.id
          },
          {},
          {}
        )}`;
      })} </div>`;
    })} ${servicesWithoutCategory.length > 0 ? `<div class="mt-6 border-t pt-6"><div class="grid grid-cols-1 md:grid-cols-2 w-full gap-4 justify-center md:justify-start mb-8">${each(servicesWithoutCategory, (service, i) => {
      return `${validate_component(ServiceBox, "ServiceBox").$$render(
        $$result,
        {
          backgroundColor,
          href: createServiceUrl(service.id),
          service,
          index: i,
          selected: selectedServiceID == service.id
        },
        {},
        {}
      )}`;
    })}</div></div>` : ``}</div></main> ${validate_component(Popup, "Popup").$$render(
      $$result,
      { popupTypeOpen },
      {
        popupTypeOpen: ($$value) => {
          popupTypeOpen = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_location();
  $$unsubscribe_page();
  return $$rendered;
});
export {
  Page as default
};

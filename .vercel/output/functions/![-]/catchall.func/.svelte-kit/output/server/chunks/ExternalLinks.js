import { c as create_ssr_component, a as add_attribute, e as escape, v as validate_component, d as each, m as missing_component } from "./ssr.js";
import { l as languageTag } from "./runtime.js";
import { s as subscribe } from "./utils.js";
import { g as getTranslationFunctions } from "./index3.js";
import { p as page } from "./stores.js";
import { a as getBackgroundColorByStatusHeader } from "./Location.js";
import { B as Button } from "./button.js";
import { l as location } from "./location.store.js";
import { I as Icon } from "./Icon.js";
const title$a = /* @__NO_SIDE_EFFECTS__ */ (params) => `Bienvenue chez ${params.name}`;
const title$9 = /* @__NO_SIDE_EFFECTS__ */ (params) => `مرحبًا بك في ديمو كاردين`;
const title$8 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Welcome to Demo Carden`;
const title$7 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Bienvenido a Demo Carden`;
const title$6 = /* @__NO_SIDE_EFFECTS__ */ (params) => `डेमो कार्डेन में आपका स्वागत है`;
const title$5 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Benvenuti a Demo Carden`;
const title$4 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Welkom bij Demo Carden`;
const title$3 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Bem-vindo à demonstração Carden`;
const title$2 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Добро пожаловать в Демо Карден`;
const title$1 = /* @__NO_SIDE_EFFECTS__ */ (params) => `欢迎来到演示卡登`;
const title = /* @__NO_SIDE_EFFECTS__ */ (params, options = {}) => {
  return {
    ar: title$9,
    en: title$8,
    es: title$7,
    fr: title$a,
    hi: title$6,
    it: title$5,
    nl: title$4,
    pt: title$3,
    ru: title$2,
    zh: title$1
  }[options.languageTag ?? languageTag()](params);
};
const callButton$a = /* @__NO_SIDE_EFFECTS__ */ () => `Appeler`;
const callButton$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يتصل`;
const callButton$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Call`;
const callButton$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Llamar`;
const callButton$6 = /* @__NO_SIDE_EFFECTS__ */ () => `पुकारना`;
const callButton$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Chiamata`;
const callButton$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Telefoongesprek`;
const callButton$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Chamar`;
const callButton$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Вызов`;
const callButton$1 = /* @__NO_SIDE_EFFECTS__ */ () => `称呼`;
const callButton = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: callButton$9,
    en: callButton$8,
    es: callButton$7,
    fr: callButton$a,
    hi: callButton$6,
    it: callButton$5,
    nl: callButton$4,
    pt: callButton$3,
    ru: callButton$2,
    zh: callButton$1
  }[options.languageTag ?? languageTag()]();
};
const itineraryButton$a = /* @__NO_SIDE_EFFECTS__ */ () => `Itinéraire`;
const itineraryButton$9 = /* @__NO_SIDE_EFFECTS__ */ () => `مسار الرحلة`;
const itineraryButton$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Itinerary`;
const itineraryButton$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Itinerario`;
const itineraryButton$6 = /* @__NO_SIDE_EFFECTS__ */ () => `यात्रा कार्यक्रम`;
const itineraryButton$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Itinerario`;
const itineraryButton$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Routebeschrijving`;
const itineraryButton$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Itinerário`;
const itineraryButton$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Маршрут`;
const itineraryButton$1 = /* @__NO_SIDE_EFFECTS__ */ () => `行程`;
const itineraryButton = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: itineraryButton$9,
    en: itineraryButton$8,
    es: itineraryButton$7,
    fr: itineraryButton$a,
    hi: itineraryButton$6,
    it: itineraryButton$5,
    nl: itineraryButton$4,
    pt: itineraryButton$3,
    ru: itineraryButton$2,
    zh: itineraryButton$1
  }[options.languageTag ?? languageTag()]();
};
const shareButton$a = /* @__NO_SIDE_EFFECTS__ */ () => `Partager`;
const shareButton$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يشارك`;
const shareButton$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Share`;
const shareButton$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Compartir`;
const shareButton$6 = /* @__NO_SIDE_EFFECTS__ */ () => `शेयर करना`;
const shareButton$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Condividere`;
const shareButton$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Deel`;
const shareButton$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Compartilhar`;
const shareButton$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Делиться`;
const shareButton$1 = /* @__NO_SIDE_EFFECTS__ */ () => `分享`;
const shareButton = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: shareButton$9,
    en: shareButton$8,
    es: shareButton$7,
    fr: shareButton$a,
    hi: shareButton$6,
    it: shareButton$5,
    nl: shareButton$4,
    pt: shareButton$3,
    ru: shareButton$2,
    zh: shareButton$1
  }[options.languageTag ?? languageTag()]();
};
const shopOpen$a = /* @__NO_SIDE_EFFECTS__ */ () => `Salon ouvert`;
const shopOpen$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يوم مفتوح`;
const shopOpen$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Open house`;
const shopOpen$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Casa abierta`;
const shopOpen$6 = /* @__NO_SIDE_EFFECTS__ */ () => `खुला घर`;
const shopOpen$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Casa aperta`;
const shopOpen$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Open huis`;
const shopOpen$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Casa aberta`;
const shopOpen$2 = /* @__NO_SIDE_EFFECTS__ */ () => `День открытых дверей`;
const shopOpen$1 = /* @__NO_SIDE_EFFECTS__ */ () => `开放日`;
const shopOpen = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: shopOpen$9,
    en: shopOpen$8,
    es: shopOpen$7,
    fr: shopOpen$a,
    hi: shopOpen$6,
    it: shopOpen$5,
    nl: shopOpen$4,
    pt: shopOpen$3,
    ru: shopOpen$2,
    zh: shopOpen$1
  }[options.languageTag ?? languageTag()]();
};
const shopFull$a = /* @__NO_SIDE_EFFECTS__ */ () => `Complet pour le moment`;
const shopFull$9 = /* @__NO_SIDE_EFFECTS__ */ () => `جميع الحجوزات مكتملة حاليًا`;
const shopFull$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Currently fully booked`;
const shopFull$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Actualmente completamente reservado`;
const shopFull$6 = /* @__NO_SIDE_EFFECTS__ */ () => `फिलहाल पूरी तरह से बुक हो चुका है`;
const shopFull$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Attualmente completamente prenotato`;
const shopFull$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Momenteel volgeboekt`;
const shopFull$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Atualmente com lotação esgotada.`;
const shopFull$2 = /* @__NO_SIDE_EFFECTS__ */ () => `В настоящее время все места забронированы.`;
const shopFull$1 = /* @__NO_SIDE_EFFECTS__ */ () => `目前已全部预订`;
const shopFull = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: shopFull$9,
    en: shopFull$8,
    es: shopFull$7,
    fr: shopFull$a,
    hi: shopFull$6,
    it: shopFull$5,
    nl: shopFull$4,
    pt: shopFull$3,
    ru: shopFull$2,
    zh: shopFull$1
  }[options.languageTag ?? languageTag()]();
};
const shopClosed$a = /* @__NO_SIDE_EFFECTS__ */ () => `Salon fermé`;
const shopClosed$9 = /* @__NO_SIDE_EFFECTS__ */ () => `صالة مغلقة`;
const shopClosed$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Closed lounge`;
const shopClosed$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Salón cerrado`;
const shopClosed$6 = /* @__NO_SIDE_EFFECTS__ */ () => `बंद लाउंज`;
const shopClosed$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Salotto chiuso`;
const shopClosed$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Gesloten lounge`;
const shopClosed$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Sala fechada`;
const shopClosed$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Закрытый зал ожидания`;
const shopClosed$1 = /* @__NO_SIDE_EFFECTS__ */ () => `封闭式休息室`;
const shopClosed = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: shopClosed$9,
    en: shopClosed$8,
    es: shopClosed$7,
    fr: shopClosed$a,
    hi: shopClosed$6,
    it: shopClosed$5,
    nl: shopClosed$4,
    pt: shopClosed$3,
    ru: shopClosed$2,
    zh: shopClosed$1
  }[options.languageTag ?? languageTag()]();
};
const externalLinksTitle$a = /* @__NO_SIDE_EFFECTS__ */ () => `Découvrez le salon`;
const externalLinksTitle$9 = /* @__NO_SIDE_EFFECTS__ */ () => `اكتشف غرفة المعيشة`;
const externalLinksTitle$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Discover the living room`;
const externalLinksTitle$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Descubre la sala de estar`;
const externalLinksTitle$6 = /* @__NO_SIDE_EFFECTS__ */ () => `लिविंग रूम को देखें`;
const externalLinksTitle$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Scopri il soggiorno`;
const externalLinksTitle$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Ontdek de woonkamer`;
const externalLinksTitle$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Descubra a sala de estar`;
const externalLinksTitle$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Откройте для себя гостиную`;
const externalLinksTitle$1 = /* @__NO_SIDE_EFFECTS__ */ () => `探索客厅`;
const externalLinksTitle = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: externalLinksTitle$9,
    en: externalLinksTitle$8,
    es: externalLinksTitle$7,
    fr: externalLinksTitle$a,
    hi: externalLinksTitle$6,
    it: externalLinksTitle$5,
    nl: externalLinksTitle$4,
    pt: externalLinksTitle$3,
    ru: externalLinksTitle$2,
    zh: externalLinksTitle$1
  }[options.languageTag ?? languageTag()]();
};
const comeSeeUs$a = /* @__NO_SIDE_EFFECTS__ */ () => `Venir nous voir`;
const comeSeeUs$9 = /* @__NO_SIDE_EFFECTS__ */ () => `تفضل بزيارتنا`;
const comeSeeUs$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Come see us`;
const comeSeeUs$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Ven a vernos`;
const comeSeeUs$6 = /* @__NO_SIDE_EFFECTS__ */ () => `हमसे मिलने आइए`;
const comeSeeUs$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Venite a trovarci`;
const comeSeeUs$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Kom ons bezoeken`;
const comeSeeUs$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Venha nos visitar!`;
const comeSeeUs$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Приходите к нам!`;
const comeSeeUs$1 = /* @__NO_SIDE_EFFECTS__ */ () => `欢迎光临`;
const comeSeeUs = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: comeSeeUs$9,
    en: comeSeeUs$8,
    es: comeSeeUs$7,
    fr: comeSeeUs$a,
    hi: comeSeeUs$6,
    it: comeSeeUs$5,
    nl: comeSeeUs$4,
    pt: comeSeeUs$3,
    ru: comeSeeUs$2,
    zh: comeSeeUs$1
  }[options.languageTag ?? languageTag()]();
};
const LanguageButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  $$unsubscribe_page();
  return `<a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/select-language?redirect=${$page.url.pathname}`, void 0), 0)} class="z-10 hover:scale-[1.04] transition-all duration-300 ease-in-out uppercase border bg-white/20 border-white/30 backdrop-blur-sm rounded-2xl text-white py-2 px-2.5 text-sm font-normal">${escape(languageTag().split("-")[0])}</a>`;
});
const ShopStatus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let backgroundColor;
  let { locationStatus = "open" } = $$props;
  let { theme = "NEUTRAL" } = $$props;
  const textByStatus = {
    open: /* @__PURE__ */ shopOpen(),
    full: /* @__PURE__ */ shopFull(),
    closed: /* @__PURE__ */ shopClosed()
  };
  if ($$props.locationStatus === void 0 && $$bindings.locationStatus && locationStatus !== void 0) $$bindings.locationStatus(locationStatus);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  backgroundColor = getBackgroundColorByStatusHeader(locationStatus, theme);
  return `<div class="w-full flex z-10"><div class="${"text-white " + escape(backgroundColor, true) + " flex flex-row items-center gap-2 rounded-full text-[0.875rem] py-2 px-4"}"><div class="size-2 rounded-full bg-white"></div> ${escape(textByStatus[locationStatus])}</div></div>`;
});
const Marker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3327 6.66671C13.3327 9.99537 9.64002 13.462 8.40002 14.5327C8.2845 14.6196 8.14388 14.6665 7.99935 14.6665C7.85482 14.6665 7.7142 14.6196 7.59868 14.5327C6.35868 13.462 2.66602 9.99537 2.66602 6.66671C2.66602 5.25222 3.22792 3.89567 4.22811 2.89547C5.22831 1.89528 6.58486 1.33337 7.99935 1.33337C9.41384 1.33337 10.7704 1.89528 11.7706 2.89547C12.7708 3.89567 13.3327 5.25222 13.3327 6.66671Z" stroke="white" stroke-opacity="0.8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 8.66663C9.10457 8.66663 10 7.7712 10 6.66663C10 5.56206 9.10457 4.66663 8 4.66663C6.89543 4.66663 6 5.56206 6 6.66663C6 7.7712 6.89543 8.66663 8 8.66663Z" stroke="white" stroke-opacity="0.8" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
});
const responsiveIconButton = "flex flex-col md:flex-row items-center text-sm flex-1  h-10 border bg-white/20 border-white/30 px-3 rounded-[16px] backdrop-blur-sm hover:scale-[1.04] transition-all duration-300 ease-in-out hover:bg-white/20";
const responsiveLabel = "";
const LocationButtonsV2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => value);
  let { fullAddress } = $$props;
  if ($$props.fullAddress === void 0 && $$bindings.fullAddress && fullAddress !== void 0) $$bindings.fullAddress(fullAddress);
  $$unsubscribe_location();
  return `<div class="flex justify-between w-full flex-wrap gap-4">${validate_component(Button, "Button").$$render($$result, { class: responsiveIconButton }, {}, {
    default: () => {
      return `<span${add_attribute("class", responsiveLabel, 0)}>${escape(/* @__PURE__ */ callButton())}</span>`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, { class: responsiveIconButton }, {}, {
    default: () => {
      return `<span${add_attribute("class", responsiveLabel, 0)}>${escape(/* @__PURE__ */ itineraryButton())}</span>`;
    }
  })} ${validate_component(Button, "Button").$$render($$result, { class: responsiveIconButton }, {}, {
    default: () => {
      return `<span${add_attribute("class", responsiveLabel, 0)}>${escape(/* @__PURE__ */ shareButton())}</span>`;
    }
  })}</div>`;
});
const LocationHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { headerCover } = $$props;
  let { location: location2 } = $$props;
  let { locationStatus } = $$props;
  let { theme = location2.theme } = $$props;
  let { fullAddress } = $$props;
  const gradientByTheme = {
    NEUTRAL: "from-[#09051A] via-[#1616163D] to-[#09051A7D]",
    CARDEN: "from-[#0073FF3D] via-[#001A395D] to-[#0F172A0D]",
    PINK: "from-[#581C876D] via-[#8318432D] to-[#8318430D]"
  };
  if ($$props.headerCover === void 0 && $$bindings.headerCover && headerCover !== void 0) $$bindings.headerCover(headerCover);
  if ($$props.location === void 0 && $$bindings.location && location2 !== void 0) $$bindings.location(location2);
  if ($$props.locationStatus === void 0 && $$bindings.locationStatus && locationStatus !== void 0) $$bindings.locationStatus(locationStatus);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  if ($$props.fullAddress === void 0 && $$bindings.fullAddress && fullAddress !== void 0) $$bindings.fullAddress(fullAddress);
  return `<header${add_attribute("style", `background-image: url(${headerCover})`, 0)} class="relative flex-1 flex max-h-[72vh] flex-col gap-10 justify-between w-full py-4 md:py-6 bg-center bg-cover aspect-[16/9] bg-no-repeat mb-5 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-40"><div class="flex justify-between items-center w-full">${validate_component(ShopStatus, "ShopStatus").$$render($$result, { locationStatus, theme }, {}, {})} ${validate_component(LanguageButton, "LanguageButton").$$render($$result, {}, {}, {})}</div> <h2 class="font-bold text-primary-foreground text-[3rem] z-10 mt-8 w-full text-left hidden lg:block">${escape(/* @__PURE__ */ title({ name: location2.name }))}</h2> <div class="lg:hidden z-10 flex flex-col gap-2 justify-center items-center"><div class="w-[4.38rem] h-[4.38rem] rounded-[19.86px] border border-white/30 bg-white/20 py-2 flex justify-center items-center backdrop-blur-sm"><img${add_attribute("src", location2.avatar, 0)} alt="avatar" class="w-[3.5rem] h-[3.5rem] rounded-[18.27px]"></div> <h2 class="font-light text-[1.5rem] text-white/80 text-nowrap">${escape(location2.name)}</h2></div> <div class="z-10 flex flex-col gap-4"><div class="flex gap-1 items-center">${validate_component(Marker, "MarkerIcon").$$render($$result, {}, {}, {})} <p class="text-white/80 text-[0.875rem]">${escape(fullAddress)}</p></div> ${validate_component(LocationButtonsV2, "LocationButtonsV2").$$render($$result, { fullAddress }, {}, {})}</div>  <div class="${"w-full h-full bg-gradient-to-t " + escape(gradientByTheme[theme], true) + " absolute top-0 left-0"}"></div></header>`;
});
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title: title2 } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title2 !== void 0) $$bindings.title(title2);
  return `<div class="flex flex-col items-center gap-4 w-full my-2"> <h2 class="font-bold text-lg md:text-2xl w-full text-left">${escape(title2)}</h2> <div class="flex flex-col items-center gap-4 w-full">${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Map = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mapSrc;
  let { location: location2 } = $$props;
  const query = encodeURIComponent(`${location2.address}, ${location2.zipCode} ${location2.city}, France`);
  let retry = 0;
  if ($$props.location === void 0 && $$bindings.location && location2 !== void 0) $$bindings.location(location2);
  mapSrc = `https://www.google.com/maps?q=${query}&output=embed&retry=${retry}`;
  return `<iframe title="map" class="aspect-[16/9] w-full max-h-96 shadow-lg rounded-2xl"${add_attribute("src", mapSrc, 0)} loading="lazy"></iframe>`;
});
const LocationSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { fullAddress } = $$props;
  let { location: location2 } = $$props;
  if ($$props.fullAddress === void 0 && $$bindings.fullAddress && fullAddress !== void 0) $$bindings.fullAddress(fullAddress);
  if ($$props.location === void 0 && $$bindings.location && location2 !== void 0) $$bindings.location(location2);
  return `${validate_component(Section, "Section").$$render($$result, { title: /* @__PURE__ */ comeSeeUs() }, {}, {
    default: () => {
      return `<p class="-mt-4 text-left self-start text-sm text-[#616163]">${escape(fullAddress)}</p> <div class="-mt-1 w-full">${location2 ? `${validate_component(Map, "Map").$$render($$result, { location: location2 }, {}, {})}` : ``}</div>`;
    }
  })}`;
});
const Globe = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    [
      "path",
      {
        "d": "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
      }
    ],
    ["path", { "d": "M2 12h20" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "globe" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const InstagramIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path></svg>`;
});
const ShopIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg class="stroke-current" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_408_4568)"><path d="M19.5586 10.1288L18.0377 17.7909C17.85 18.7361 17.7563 19.2088 17.5114 19.5623C17.2953 19.874 16.998 20.1196 16.6523 20.2718C16.2602 20.4445 15.7818 20.4445 14.8251 20.4445H7.91107C6.95435 20.4445 6.47598 20.4445 6.0839 20.2718C5.73813 20.1196 5.44085 19.874 5.22487 19.5623C4.97994 19.2088 4.88613 18.7361 4.6985 17.7909L3.17762 10.1288M19.5586 10.1288H17.511M19.5586 10.1288H20.5824M3.17762 10.1288H2.15381M3.17762 10.1288H5.22524M17.511 10.1288H5.22524M17.511 10.1288L14.4395 3.93945M5.22524 10.1288L8.29667 3.93945M8.29667 13.2235V16.3182M11.3681 13.2235V16.3182M14.4395 13.2235V16.3182" stroke-width="1.73737" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_408_4568"><rect width="21" height="21" fill="white" transform="translate(0.956055)"></rect></clipPath></defs></svg>`;
});
const TikTokIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"></path></svg>`;
});
const ExternalLinks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let haveSomeExternalLinks;
  let theme;
  let { location: location2 } = $$props;
  let { mode = "desktop" } = $$props;
  const externalLinks = [
    {
      name: "instagram",
      link: location2.instagramLink,
      icon: InstagramIcon
    },
    {
      name: "tiktok",
      link: location2.tiktokLink,
      icon: TikTokIcon
    },
    {
      name: "shop",
      link: location2.onlineShopLink,
      icon: ShopIcon
    },
    {
      name: "website",
      link: location2.website,
      icon: Globe
    }
  ];
  const externalLinksButtonsCssByTheme = {
    NEUTRAL: "text-primary border-primary hover:bg-primary hover:text-primary ",
    PINK: "text-pink border-pink hover:bg-pink hover:text-pink ",
    CARDEN: "text-blue border-blue hover:bg-blue hover:text-blue "
  };
  if ($$props.location === void 0 && $$bindings.location && location2 !== void 0) $$bindings.location(location2);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
  haveSomeExternalLinks = externalLinks.some((item) => item.link);
  theme = location2.theme;
  return `${mode === "mobile" ? ` ${haveSomeExternalLinks ? `<div class="lg:hidden px-4 w-full flex flex-col gap-6 mt-1"><h2 class="font-bold text-lg md:text-2xl">${escape(/* @__PURE__ */ externalLinksTitle())}</h2> <div class="flex flex-col gap-4 w-full pb-4 items-center">${each(externalLinks, (item) => {
    return `${item.link ? `${validate_component(Button, "Button").$$render(
      $$result,
      {
        href: item.link,
        variant: "outline",
        class: "w-full gap-2 bg-transparent " + externalLinksButtonsCssByTheme[theme] + " hover:bg-opacity-30  transition-all duration-150 hover:scale-[0.99] w-4/5 flex justify-start pl-14"
      },
      {},
      {
        default: () => {
          return `${validate_component(item.icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})} ${escape(item.name)} `;
        }
      }
    )}` : ``}`;
  })}</div></div>` : ``}` : ` <div class="hidden lg:flex flex-row gap-6 w-full text-primary justify-center mt-4">${haveSomeExternalLinks ? `${each(externalLinks, (item) => {
    return `${item.link ? `${validate_component(Button, "Button").$$render(
      $$result,
      {
        href: item.link,
        variant: "outline",
        class: "p-2 w-11 h-11 rounded-full " + externalLinksButtonsCssByTheme[theme] + " hover:bg-opacity-30 transition-all duration-150 hover:scale-[0.99]"
      },
      {},
      {
        default: () => {
          return `${validate_component(item.icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})} `;
        }
      }
    )}` : ``}`;
  })}` : ``}</div>`}`;
});
export {
  ExternalLinks as E,
  LocationHeader as L,
  LocationSection as a
};

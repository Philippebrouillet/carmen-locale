import { s as subscribe } from "./utils.js";
import { c as create_ssr_component, v as validate_component, e as escape, m as missing_component } from "./ssr.js";
import { l as location } from "./location.store.js";
import { l as languageTag } from "./runtime.js";
import { I as Icon } from "./Icon.js";
const lastPlace$a = /* @__NO_SIDE_EFFECTS__ */ () => `Dernières places`;
const lastPlace$9 = /* @__NO_SIDE_EFFECTS__ */ () => `المقاعد الأخيرة`;
const lastPlace$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Last seats`;
const lastPlace$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Últimos asientos`;
const lastPlace$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अंतिम सीटें`;
const lastPlace$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Ultimi posti`;
const lastPlace$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Laatste stoelen`;
const lastPlace$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Últimos lugares`;
const lastPlace$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Последние места`;
const lastPlace$1 = /* @__NO_SIDE_EFFECTS__ */ () => `最后几个座位`;
const lastPlace = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: lastPlace$9,
    en: lastPlace$8,
    es: lastPlace$7,
    fr: lastPlace$a,
    hi: lastPlace$6,
    it: lastPlace$5,
    nl: lastPlace$4,
    pt: lastPlace$3,
    ru: lastPlace$2,
    zh: lastPlace$1
  }[options.languageTag ?? languageTag()]();
};
const smartRate$a = /* @__NO_SIDE_EFFECTS__ */ () => `Tarif malin`;
const smartRate$9 = /* @__NO_SIDE_EFFECTS__ */ () => `سعر ذكي`;
const smartRate$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Smart price`;
const smartRate$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Precio inteligente`;
const smartRate$6 = /* @__NO_SIDE_EFFECTS__ */ () => `स्मार्ट कीमत`;
const smartRate$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Prezzo intelligente`;
const smartRate$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Slimme prijs`;
const smartRate$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Preço inteligente`;
const smartRate$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Умная цена`;
const smartRate$1 = /* @__NO_SIDE_EFFECTS__ */ () => `智能价格`;
const smartRate = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: smartRate$9,
    en: smartRate$8,
    es: smartRate$7,
    fr: smartRate$a,
    hi: smartRate$6,
    it: smartRate$5,
    nl: smartRate$4,
    pt: smartRate$3,
    ru: smartRate$2,
    zh: smartRate$1
  }[options.languageTag ?? languageTag()]();
};
const highDemand$a = /* @__NO_SIDE_EFFECTS__ */ () => `Forte demande`;
const highDemand$9 = /* @__NO_SIDE_EFFECTS__ */ () => `طلب مرتفع`;
const highDemand$8 = /* @__NO_SIDE_EFFECTS__ */ () => `High demand`;
const highDemand$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Alta demanda`;
const highDemand$6 = /* @__NO_SIDE_EFFECTS__ */ () => `उच्च मांग`;
const highDemand$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Alta domanda`;
const highDemand$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Grote vraag`;
const highDemand$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Alta demanda`;
const highDemand$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Высокий спрос`;
const highDemand$1 = /* @__NO_SIDE_EFFECTS__ */ () => `需求量高`;
const highDemand = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: highDemand$9,
    en: highDemand$8,
    es: highDemand$7,
    fr: highDemand$a,
    hi: highDemand$6,
    it: highDemand$5,
    nl: highDemand$4,
    pt: highDemand$3,
    ru: highDemand$2,
    zh: highDemand$1
  }[options.languageTag ?? languageTag()]();
};
const Alarm_clock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "13", "r": "8" }],
    ["path", { "d": "M12 9v4l2 2" }],
    ["path", { "d": "M5 3 2 6" }],
    ["path", { "d": "m22 6-3-3" }],
    ["path", { "d": "M6.38 18.7 4 21" }],
    ["path", { "d": "M17.64 18.67 20 21" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "alarm-clock" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Bar_chart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "20",
        "y2": "10"
      }
    ],
    [
      "line",
      {
        "x1": "18",
        "x2": "18",
        "y1": "20",
        "y2": "4"
      }
    ],
    [
      "line",
      {
        "x1": "6",
        "x2": "6",
        "y1": "20",
        "y2": "16"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "bar-chart" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Thumbs_up = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M7 10v12" }],
    [
      "path",
      {
        "d": "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "thumbs-up" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const BadgeTarifMode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let location$1;
  let theme;
  let data;
  let $locationStore, $$unsubscribe_locationStore;
  $$unsubscribe_locationStore = subscribe(location, (value) => $locationStore = value);
  const textColorByTheme = {
    NEUTRAL: "text-black",
    PINK: "text-pink",
    CARDEN: "text-blue"
  };
  const backgroundBadgeColorByTheme = {
    NEUTRAL: "bg-[#DFE5E7]",
    PINK: "bg-pale-pink",
    CARDEN: "bg-pale-blue"
  };
  const dataByTarifMode = {
    RARE: { icon: Alarm_clock, text: /* @__PURE__ */ lastPlace() },
    LOW_DEMAND: { icon: Thumbs_up, text: /* @__PURE__ */ smartRate() },
    HGH_DEMAND: { icon: Bar_chart, text: /* @__PURE__ */ highDemand() }
  };
  location$1 = $locationStore.location;
  theme = location$1.theme;
  data = dataByTarifMode[location$1.tarifMode];
  $$unsubscribe_locationStore();
  return `${data ? `<div class="${"rounded-full " + escape(backgroundBadgeColorByTheme[theme], true) + " bg-opacity-20 h-6 px-2 flex items-center gap-1.5 mb-1 max-w-fit uppercase font-extrabold text-xs " + escape(textColorByTheme[theme], true)}">${validate_component(data.icon || missing_component, "svelte:component").$$render($$result, { size: 16 }, {}, {})} ${escape(data.text)}</div>` : ``}`;
});
export {
  BadgeTarifMode as B
};

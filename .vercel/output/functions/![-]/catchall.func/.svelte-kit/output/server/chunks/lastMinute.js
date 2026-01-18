import { l as languageTag } from "./runtime.js";
const lastMinute$a = /* @__NO_SIDE_EFFECTS__ */ () => `Réserver une place de dernière minute`;
const lastMinute$9 = /* @__NO_SIDE_EFFECTS__ */ () => `آخر دقيقة`;
const lastMinute$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Last minute`;
const lastMinute$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Último minuto`;
const lastMinute$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अंतिम मिनट`;
const lastMinute$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Ultimo minuto`;
const lastMinute$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Laatste minuut`;
const lastMinute$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Último minuto`;
const lastMinute$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Последняя минута`;
const lastMinute$1 = /* @__NO_SIDE_EFFECTS__ */ () => `最后一分钟`;
const lastMinute = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: lastMinute$9,
    en: lastMinute$8,
    es: lastMinute$7,
    fr: lastMinute$a,
    hi: lastMinute$6,
    it: lastMinute$5,
    nl: lastMinute$4,
    pt: lastMinute$3,
    ru: lastMinute$2,
    zh: lastMinute$1
  }[options.languageTag ?? languageTag()]();
};
export {
  lastMinute as l
};

import { l as languageTag } from "./runtime.js";
const availableNow$a = /* @__NO_SIDE_EFFECTS__ */ () => `Maintenant`;
const availableNow$9 = /* @__NO_SIDE_EFFECTS__ */ () => `متاح الآن.`;
const availableNow$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Now`;
const availableNow$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Ahora`;
const availableNow$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अब उपलब्ध।`;
const availableNow$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Ora disponibile`;
const availableNow$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Nu beschikbaar`;
const availableNow$3 = /* @__NO_SIDE_EFFECTS__ */ () => ` Agora disponível.`;
const availableNow$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Сейчас`;
const availableNow$1 = /* @__NO_SIDE_EFFECTS__ */ () => `现在`;
const availableNow = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: availableNow$9,
    en: availableNow$8,
    es: availableNow$7,
    fr: availableNow$a,
    hi: availableNow$6,
    it: availableNow$5,
    nl: availableNow$4,
    pt: availableNow$3,
    ru: availableNow$2,
    zh: availableNow$1
  }[options.languageTag ?? languageTag()]();
};
const unavailableShort$a = /* @__NO_SIDE_EFFECTS__ */ () => `Indisp.`;
const unavailableShort$9 = /* @__NO_SIDE_EFFECTS__ */ () => `غير مجدي.`;
const unavailableShort$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Unavail.`;
const unavailableShort$7 = /* @__NO_SIDE_EFFECTS__ */ () => `No disponible.`;
const unavailableShort$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अनुपयोगी.`;
const unavailableShort$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Non disponibile.`;
const unavailableShort$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Niet beschikbaar.`;
const unavailableShort$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Indisponível.`;
const unavailableShort$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Недоступно.`;
const unavailableShort$1 = /* @__NO_SIDE_EFFECTS__ */ () => `無效。`;
const unavailableShort = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: unavailableShort$9,
    en: unavailableShort$8,
    es: unavailableShort$7,
    fr: unavailableShort$a,
    hi: unavailableShort$6,
    it: unavailableShort$5,
    nl: unavailableShort$4,
    pt: unavailableShort$3,
    ru: unavailableShort$2,
    zh: unavailableShort$1
  }[options.languageTag ?? languageTag()]();
};
export {
  availableNow as a,
  unavailableShort as u
};

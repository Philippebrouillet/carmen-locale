import { l as languageTag } from "./runtime.js";
const anyProfessional$a = /* @__NO_SIDE_EFFECTS__ */ () => `Sans préférence`;
const anyProfessional$9 = /* @__NO_SIDE_EFFECTS__ */ () => `بدون تفضيل`;
const anyProfessional$8 = /* @__NO_SIDE_EFFECTS__ */ () => `No preference`;
const anyProfessional$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Sin preferencias`;
const anyProfessional$6 = /* @__NO_SIDE_EFFECTS__ */ () => `कोई वरीयता नहीं`;
const anyProfessional$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Nessuna preferenza`;
const anyProfessional$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Geen voorkeur`;
const anyProfessional$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Sem preferência`;
const anyProfessional$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Нет предпочтений`;
const anyProfessional$1 = /* @__NO_SIDE_EFFECTS__ */ () => `没有偏好`;
const anyProfessional = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: anyProfessional$9,
    en: anyProfessional$8,
    es: anyProfessional$7,
    fr: anyProfessional$a,
    hi: anyProfessional$6,
    it: anyProfessional$5,
    nl: anyProfessional$4,
    pt: anyProfessional$3,
    ru: anyProfessional$2,
    zh: anyProfessional$1
  }[options.languageTag ?? languageTag()]();
};
export {
  anyProfessional as a
};

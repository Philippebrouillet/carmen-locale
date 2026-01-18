import { l as languageTag } from "./runtime.js";
const peopleInQueue$a = /* @__NO_SIDE_EFFECTS__ */ (params) => `${params.number} pers. dans la file`;
const peopleInQueue$9 = /* @__NO_SIDE_EFFECTS__ */ (params) => `${params.number} الأشخاص في قائمة الانتظار`;
const peopleInQueue$8 = /* @__NO_SIDE_EFFECTS__ */ (params) => `${params.number} people in queue`;
const peopleInQueue$7 = /* @__NO_SIDE_EFFECTS__ */ (params) => `${params.number} personas en la cola`;
const peopleInQueue$6 = /* @__NO_SIDE_EFFECTS__ */ (params) => `कतार में ${params.number} लोग`;
const peopleInQueue$5 = /* @__NO_SIDE_EFFECTS__ */ (params) => `${params.number} persone in coda`;
const peopleInQueue$4 = /* @__NO_SIDE_EFFECTS__ */ (params) => `${params.number} mensen in de wachtrij`;
const peopleInQueue$3 = /* @__NO_SIDE_EFFECTS__ */ (params) => `${params.number} pessoas na fila`;
const peopleInQueue$2 = /* @__NO_SIDE_EFFECTS__ */ (params) => `${params.number} человек в очереди`;
const peopleInQueue$1 = /* @__NO_SIDE_EFFECTS__ */ (params) => `队列中${params.number}人`;
const peopleInQueue = /* @__NO_SIDE_EFFECTS__ */ (params, options = {}) => {
  return {
    ar: peopleInQueue$9,
    en: peopleInQueue$8,
    es: peopleInQueue$7,
    fr: peopleInQueue$a,
    hi: peopleInQueue$6,
    it: peopleInQueue$5,
    nl: peopleInQueue$4,
    pt: peopleInQueue$3,
    ru: peopleInQueue$2,
    zh: peopleInQueue$1
  }[options.languageTag ?? languageTag()](params);
};
export {
  peopleInQueue as p
};

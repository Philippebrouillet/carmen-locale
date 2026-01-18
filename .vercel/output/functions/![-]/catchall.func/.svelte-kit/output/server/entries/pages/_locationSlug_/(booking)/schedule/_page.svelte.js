import { s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, d as each, e as escape, a as add_attribute } from "../../../../../chunks/ssr.js";
import { s as shopStore, a as setBookingDate } from "../../../../../chunks/basketStore.js";
import { c as clock } from "../../../../../chunks/clock.svelte.js";
import { l as location } from "../../../../../chunks/location.store.js";
import { s as sameDay, c as computeQueue } from "../../../../../chunks/QueueLine.js";
import { today, getLocalTimeZone } from "@internationalized/date";
import { B as BookingHeader } from "../../../../../chunks/BookingHeader.js";
import { b as backgroundColorByTheme } from "../../../../../chunks/Location.js";
import { p as page } from "../../../../../chunks/stores.js";
import { P as PlaceholderAvatar } from "../../../../../chunks/PlaceholderAvatar.js";
import { a as displayWaitingTime } from "../../../../../chunks/formater.js";
import { l as languageTag } from "../../../../../chunks/runtime.js";
import { p as peopleInQueue } from "../../../../../chunks/peopleInQueue.js";
import { L as Lightning } from "../../../../../chunks/Lightning.js";
import { B as BadgeTarifMode } from "../../../../../chunks/BadgeTarifMode.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
const available$a = /* @__NO_SIDE_EFFECTS__ */ () => `Disponible`;
const available$9 = /* @__NO_SIDE_EFFECTS__ */ () => `متاح`;
const available$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Available`;
const available$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Disponible`;
const available$6 = /* @__NO_SIDE_EFFECTS__ */ () => `उपलब्ध`;
const available$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Disponibile`;
const available$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Beschikbaar`;
const available$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Disponível`;
const available$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Доступный`;
const available$1 = /* @__NO_SIDE_EFFECTS__ */ () => `可用的`;
const available = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: available$9,
    en: available$8,
    es: available$7,
    fr: available$a,
    hi: available$6,
    it: available$5,
    nl: available$4,
    pt: available$3,
    ru: available$2,
    zh: available$1
  }[options.languageTag ?? languageTag()]();
};
const chooseArrivalTime$a = /* @__NO_SIDE_EFFECTS__ */ () => `Votre horaire de passage`;
const chooseArrivalTime$9 = /* @__NO_SIDE_EFFECTS__ */ () => `وقت وصولك`;
const chooseArrivalTime$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Your arrival time`;
const chooseArrivalTime$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Tu hora de llegada`;
const chooseArrivalTime$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आपके आगमन का समय`;
const chooseArrivalTime$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Il tuo orario di arrivo`;
const chooseArrivalTime$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Uw aankomsttijd`;
const chooseArrivalTime$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Sua hora de chegada`;
const chooseArrivalTime$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Время вашего прибытия`;
const chooseArrivalTime$1 = /* @__NO_SIDE_EFFECTS__ */ () => `您的抵达时间`;
const chooseArrivalTime = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: chooseArrivalTime$9,
    en: chooseArrivalTime$8,
    es: chooseArrivalTime$7,
    fr: chooseArrivalTime$a,
    hi: chooseArrivalTime$6,
    it: chooseArrivalTime$5,
    nl: chooseArrivalTime$4,
    pt: chooseArrivalTime$3,
    ru: chooseArrivalTime$2,
    zh: chooseArrivalTime$1
  }[options.languageTag ?? languageTag()]();
};
const bestOffers$a = /* @__NO_SIDE_EFFECTS__ */ () => `Nos Meilleures Propositions`;
const bestOffers$9 = /* @__NO_SIDE_EFFECTS__ */ () => `أفضل العروض لدينا`;
const bestOffers$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Our Best Offers`;
const bestOffers$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Nuestras mejores ofertas`;
const bestOffers$6 = /* @__NO_SIDE_EFFECTS__ */ () => `हमारे सर्वोत्तम ऑफर`;
const bestOffers$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Le nostre migliori offerte`;
const bestOffers$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Onze beste aanbiedingen`;
const bestOffers$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Nossas melhores ofertas`;
const bestOffers$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Наши лучшие предложения`;
const bestOffers$1 = /* @__NO_SIDE_EFFECTS__ */ () => `我们的最佳优惠`;
const bestOffers = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: bestOffers$9,
    en: bestOffers$8,
    es: bestOffers$7,
    fr: bestOffers$a,
    hi: bestOffers$6,
    it: bestOffers$5,
    nl: bestOffers$4,
    pt: bestOffers$3,
    ru: bestOffers$2,
    zh: bestOffers$1
  }[options.languageTag ?? languageTag()]();
};
const workerAvailable$a = /* @__NO_SIDE_EFFECTS__ */ () => `Vous avez de la chance, le créneau séléctionné correspond à la prochaine disponibilité`;
const workerAvailable$9 = /* @__NO_SIDE_EFFECTS__ */ () => `أنت محظوظ، فالفتحة المحددة تطابق الفتحة التالية المتاحة`;
const workerAvailable$8 = /* @__NO_SIDE_EFFECTS__ */ () => `You're in luck, the selected slot matches the next available slot`;
const workerAvailable$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Estás de suerte, el espacio seleccionado coincide con el siguiente espacio disponible`;
const workerAvailable$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आप भाग्यशाली हैं, चयनित स्लॉट अगले उपलब्ध स्लॉट से मेल खाता है`;
const workerAvailable$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Sei fortunato, lo slot selezionato corrisponde al prossimo slot disponibile`;
const workerAvailable$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Je hebt geluk, het geselecteerde slot komt overeen met het volgende beschikbare slot`;
const workerAvailable$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Você está com sorte, o slot selecionado corresponde ao próximo slot disponível`;
const workerAvailable$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Вам повезло, выбранный слот соответствует следующему доступному слоту.`;
const workerAvailable$1 = /* @__NO_SIDE_EFFECTS__ */ () => `您很幸运，所选的插槽与下一个可用插槽匹配`;
const workerAvailable = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: workerAvailable$9,
    en: workerAvailable$8,
    es: workerAvailable$7,
    fr: workerAvailable$a,
    hi: workerAvailable$6,
    it: workerAvailable$5,
    nl: workerAvailable$4,
    pt: workerAvailable$3,
    ru: workerAvailable$2,
    zh: workerAvailable$1
  }[options.languageTag ?? languageTag()]();
};
const yourArrivalTime$a = /* @__NO_SIDE_EFFECTS__ */ () => `Vous arrivez dans`;
const yourArrivalTime$9 = /* @__NO_SIDE_EFFECTS__ */ () => `تصل إلى`;
const yourArrivalTime$8 = /* @__NO_SIDE_EFFECTS__ */ () => `You arrive in`;
const yourArrivalTime$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Llegas a`;
const yourArrivalTime$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आप पहुंचते हैं`;
const yourArrivalTime$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Arrivi in`;
const yourArrivalTime$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Je komt aan in`;
const yourArrivalTime$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Você chega em`;
const yourArrivalTime$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Вы прибываете в`;
const yourArrivalTime$1 = /* @__NO_SIDE_EFFECTS__ */ () => `你到达`;
const yourArrivalTime = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: yourArrivalTime$9,
    en: yourArrivalTime$8,
    es: yourArrivalTime$7,
    fr: yourArrivalTime$a,
    hi: yourArrivalTime$6,
    it: yourArrivalTime$5,
    nl: yourArrivalTime$4,
    pt: yourArrivalTime$3,
    ru: yourArrivalTime$2,
    zh: yourArrivalTime$1
  }[options.languageTag ?? languageTag()]();
};
const or$a = /* @__NO_SIDE_EFFECTS__ */ () => `où alors`;
const or$9 = /* @__NO_SIDE_EFFECTS__ */ () => `أين`;
const or$8 = /* @__NO_SIDE_EFFECTS__ */ () => `where`;
const or$7 = /* @__NO_SIDE_EFFECTS__ */ () => `dónde`;
const or$6 = /* @__NO_SIDE_EFFECTS__ */ () => `कहाँ`;
const or$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Dove`;
const or$4 = /* @__NO_SIDE_EFFECTS__ */ () => `waar`;
const or$3 = /* @__NO_SIDE_EFFECTS__ */ () => `onde`;
const or$2 = /* @__NO_SIDE_EFFECTS__ */ () => `где`;
const or$1 = /* @__NO_SIDE_EFFECTS__ */ () => `在哪里`;
const or = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: or$9,
    en: or$8,
    es: or$7,
    fr: or$a,
    hi: or$6,
    it: or$5,
    nl: or$4,
    pt: or$3,
    ru: or$2,
    zh: or$1
  }[options.languageTag ?? languageTag()]();
};
const laterInTheDay$a = /* @__NO_SIDE_EFFECTS__ */ () => `Planifiez plus tard dans la journée`;
const laterInTheDay$9 = /* @__NO_SIDE_EFFECTS__ */ () => `خطط لوقت لاحق من اليوم`;
const laterInTheDay$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Plan for later in the day`;
const laterInTheDay$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Plan para más tarde en el día`;
const laterInTheDay$6 = /* @__NO_SIDE_EFFECTS__ */ () => `दिन में बाद के लिए योजना बनाएं`;
const laterInTheDay$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Pianifica per più tardi nel corso della giornata`;
const laterInTheDay$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Plan dit voor later op de dag.`;
const laterInTheDay$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Planeje para mais tarde.`;
const laterInTheDay$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Запланируйте на более позднее время дня.`;
const laterInTheDay$1 = /* @__NO_SIDE_EFFECTS__ */ () => `为当天晚些时候做准备`;
const laterInTheDay = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: laterInTheDay$9,
    en: laterInTheDay$8,
    es: laterInTheDay$7,
    fr: laterInTheDay$a,
    hi: laterInTheDay$6,
    it: laterInTheDay$5,
    nl: laterInTheDay$4,
    pt: laterInTheDay$3,
    ru: laterInTheDay$2,
    zh: laterInTheDay$1
  }[options.languageTag ?? languageTag()]();
};
const bookingAsapText$a = /* @__NO_SIDE_EFFECTS__ */ () => `Prenez la prochaine place disponible avec le professionnel de votre choix`;
const bookingAsapText$9 = /* @__NO_SIDE_EFFECTS__ */ () => `احجز موعدك التالي المتاح مع الأخصائي الذي تختاره.`;
const bookingAsapText$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Take the next available appointment with the professional of your choice.`;
const bookingAsapText$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Toma la próxima cita disponible con el profesional de tu elección.`;
const bookingAsapText$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अपनी पसंद के पेशेवर से अगली उपलब्ध अपॉइंटमेंट लें।`;
const bookingAsapText$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Fissa il prossimo appuntamento disponibile con il professionista di tua scelta.`;
const bookingAsapText$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Maak de eerstvolgende beschikbare afspraak met de professional van uw keuze.`;
const bookingAsapText$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Agende a próxima consulta disponível com o profissional de sua escolha.`;
const bookingAsapText$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Запишитесь на прием к выбранному вами специалисту в ближайшее свободное время.`;
const bookingAsapText$1 = /* @__NO_SIDE_EFFECTS__ */ () => `预约你选择的专业人士，选择下一个可预约的时间。`;
const bookingAsapText = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: bookingAsapText$9,
    en: bookingAsapText$8,
    es: bookingAsapText$7,
    fr: bookingAsapText$a,
    hi: bookingAsapText$6,
    it: bookingAsapText$5,
    nl: bookingAsapText$4,
    pt: bookingAsapText$3,
    ru: bookingAsapText$2,
    zh: bookingAsapText$1
  }[options.languageTag ?? languageTag()]();
};
const bestOffersCalculationInfos$a = /* @__NO_SIDE_EFFECTS__ */ () => `Calculées selon l’arrivé choisie`;
const bestOffersCalculationInfos$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يتم حسابها وفقًا لوقت الوصول المختار`;
const bestOffersCalculationInfos$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Calculated according to the chosen arrival time`;
const bestOffersCalculationInfos$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Calculado según la hora de llegada elegida`;
const bestOffersCalculationInfos$6 = /* @__NO_SIDE_EFFECTS__ */ () => `चुने गए आगमन समय के अनुसार गणना की गई`;
const bestOffersCalculationInfos$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Calcolato in base all'orario di arrivo scelto`;
const bestOffersCalculationInfos$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Berekend op basis van de gekozen aankomsttijd.`;
const bestOffersCalculationInfos$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Calculado de acordo com o horário de chegada escolhido.`;
const bestOffersCalculationInfos$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Рассчитывается в соответствии с выбранным временем прибытия.`;
const bestOffersCalculationInfos$1 = /* @__NO_SIDE_EFFECTS__ */ () => `根据所选到达时间计算`;
const bestOffersCalculationInfos = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: bestOffersCalculationInfos$9,
    en: bestOffersCalculationInfos$8,
    es: bestOffersCalculationInfos$7,
    fr: bestOffersCalculationInfos$a,
    hi: bestOffersCalculationInfos$6,
    it: bestOffersCalculationInfos$5,
    nl: bestOffersCalculationInfos$4,
    pt: bestOffersCalculationInfos$3,
    ru: bestOffersCalculationInfos$2,
    zh: bestOffersCalculationInfos$1
  }[options.languageTag ?? languageTag()]();
};
const otherAvaiblePro$a = /* @__NO_SIDE_EFFECTS__ */ () => `Les autres professionnels disponibles`;
const otherAvaiblePro$9 = /* @__NO_SIDE_EFFECTS__ */ () => `المهنيون الآخرون المتاحون`;
const otherAvaiblePro$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Other available professionals`;
const otherAvaiblePro$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Otros profesionales disponibles`;
const otherAvaiblePro$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अन्य उपलब्ध पेशेवर`;
const otherAvaiblePro$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Altri professionisti disponibili`;
const otherAvaiblePro$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Andere beschikbare professionals`;
const otherAvaiblePro$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Outros profissionais disponíveis`;
const otherAvaiblePro$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Другие доступные специалисты`;
const otherAvaiblePro$1 = /* @__NO_SIDE_EFFECTS__ */ () => `其他可用的专业人员`;
const otherAvaiblePro = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: otherAvaiblePro$9,
    en: otherAvaiblePro$8,
    es: otherAvaiblePro$7,
    fr: otherAvaiblePro$a,
    hi: otherAvaiblePro$6,
    it: otherAvaiblePro$5,
    nl: otherAvaiblePro$4,
    pt: otherAvaiblePro$3,
    ru: otherAvaiblePro$2,
    zh: otherAvaiblePro$1
  }[options.languageTag ?? languageTag()]();
};
const noAvailableProfessionalsMessage$a = /* @__NO_SIDE_EFFECTS__ */ () => `Désolé nous n’avons de proposition pour vos préférences d’horaire…`;
const noAvailableProfessionalsMessage$9 = /* @__NO_SIDE_EFFECTS__ */ () => `معذرةً، ليس لدينا أي اقتراحات بشأن الفترة الزمنية التي تفضلها...`;
const noAvailableProfessionalsMessage$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Sorry, we don't have any suggestions for your preferred time slot…`;
const noAvailableProfessionalsMessage$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Lo sentimos, no tenemos ninguna sugerencia para tu franja horaria preferida…`;
const noAvailableProfessionalsMessage$6 = /* @__NO_SIDE_EFFECTS__ */ () => `क्षमा करें, आपके पसंदीदा समय के लिए हमारे पास कोई सुझाव नहीं है…`;
const noAvailableProfessionalsMessage$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Siamo spiacenti, non abbiamo suggerimenti per la fascia oraria che preferisci...`;
const noAvailableProfessionalsMessage$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Sorry, we hebben geen suggesties voor uw gewenste tijdslot…`;
const noAvailableProfessionalsMessage$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Desculpe, não temos nenhuma sugestão para o horário de sua preferência…`;
const noAvailableProfessionalsMessage$2 = /* @__NO_SIDE_EFFECTS__ */ () => `К сожалению, у нас нет предложений по удобному для вас времени…`;
const noAvailableProfessionalsMessage$1 = /* @__NO_SIDE_EFFECTS__ */ () => `抱歉，我们没有您首选时间段的建议……`;
const noAvailableProfessionalsMessage = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: noAvailableProfessionalsMessage$9,
    en: noAvailableProfessionalsMessage$8,
    es: noAvailableProfessionalsMessage$7,
    fr: noAvailableProfessionalsMessage$a,
    hi: noAvailableProfessionalsMessage$6,
    it: noAvailableProfessionalsMessage$5,
    nl: noAvailableProfessionalsMessage$4,
    pt: noAvailableProfessionalsMessage$3,
    ru: noAvailableProfessionalsMessage$2,
    zh: noAvailableProfessionalsMessage$1
  }[options.languageTag ?? languageTag()]();
};
const Chevron_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
function computeAppointmentTimes(now, selectedDay, plannings) {
  if (sameDay(now, selectedDay.toDate("UTC"))) {
    let nowHour = new Date(now.getTime());
    nowHour.setHours(nowHour.getHours());
    nowHour.setMilliseconds(0);
    nowHour.setSeconds(0);
    nowHour.setMinutes(0);
    return [
      new Date(nowHour.getTime() + 1 * 3600 * 1e3),
      new Date(nowHour.getTime() + 2 * 3600 * 1e3),
      new Date(nowHour.getTime() + 3 * 3600 * 1e3),
      new Date(nowHour.getTime() + 4 * 3600 * 1e3),
      new Date(nowHour.getTime() + 5 * 3600 * 1e3),
      new Date(nowHour.getTime() + 6 * 3600 * 1e3)
    ];
  }
  let start = selectedDay.toDate("UTC");
  start.setHours(9, 0);
  return [
    new Date(start.setHours(9, 0)),
    new Date(start.setHours(10, 0)),
    new Date(start.setHours(11, 0)),
    new Date(start.setHours(12, 0)),
    new Date(start.setHours(13, 0)),
    new Date(start.setHours(14, 0)),
    new Date(start.setHours(15, 0)),
    new Date(start.setHours(16, 0)),
    new Date(start.setHours(17, 0)),
    new Date(start.setHours(18, 0)),
    new Date(start.setHours(19, 0))
  ];
}
const ProfessionalSelect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let _workers;
  let $location, $$unsubscribe_location;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  let { workers } = $$props;
  let { selectedWorkerId } = $$props;
  const backgroundColor = backgroundColorByTheme[$location.location.theme];
  if ($$props.workers === void 0 && $$bindings.workers && workers !== void 0) $$bindings.workers(workers);
  if ($$props.selectedWorkerId === void 0 && $$bindings.selectedWorkerId && selectedWorkerId !== void 0) $$bindings.selectedWorkerId(selectedWorkerId);
  _workers = [{ name: "Tous", id: -1 }, ...workers];
  $$unsubscribe_location();
  return `<div class="flex gap-2 overflow-x-auto md:mt-2 py-2">${each(_workers, (worker) => {
    return `<button class="${"flex justify-center items-center px-4 border py-2 hover:" + escape(backgroundColor, true) + " hover:text-white focus:" + escape(backgroundColor, true) + " " + escape(
      selectedWorkerId === worker.id || selectedWorkerId === null && worker.id === -1 ? `${backgroundColor} text-white` : "bg-white text-[#616163]",
      true
    ) + " rounded-2xl transition-all duration-100"}"><h2 class="text-sm font-bold whitespace-nowrap">${escape(worker.name)}</h2> </button>`;
  })}</div>`;
});
const css = {
  code: ".CARDENFOCUSHOVER.svelte-1bqopyy.svelte-1bqopyy:hover{background-color:#c7e0ff30}.NEUTRALFOCUSHOVER.svelte-1bqopyy.svelte-1bqopyy:hover{background-color:#dfe5e730}.PINKFOCUSHOVER.svelte-1bqopyy.svelte-1bqopyy:hover{background-color:#e5cef730}.p.svelte-1bqopyy .info.svelte-1bqopyy{grid-area:info;border-radius:4px;background:rgba(184, 254, 201, 0.5);padding-left:8px;padding-right:8px;padding-top:0.3rem;padding-bottom:0.3rem;margin-top:1rem;margin-left:4px;margin-right:4px;margin-bottom:4px}",
  map: '{"version":3,"file":"Worker.svelte","sources":["Worker.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { goto } from \\"$app/navigation\\";\\nimport { page } from \\"$app/stores\\";\\nimport PlaceholderAvatar from \\"$lib/components/PlaceholderAvatar.svelte\\";\\nimport { displayWaitingTime } from \\"$lib/formater\\";\\nimport * as m from \\"$lib/paraglide/messages.js\\";\\nimport { languageTag } from \\"$src/lib/paraglide/runtime\\";\\nimport { shopStore } from \\"$src/lib/stores/basketStore\\";\\nimport { location } from \\"$src/lib/stores/location.store\\";\\nexport let worker;\\nexport let showInfo;\\nexport let index;\\nexport let selectedWorkerId;\\nexport let selectedSlotTime;\\nfunction createRecapUrl() {\\n  const newUrl = languageTag().split(\\"-\\")[0] !== \\"fr\\" ? `/${languageTag().split(\\"-\\")[0]}/${$location.location.id}/recap` : `/${$location.location.id}/recap`;\\n  const url = new URL(newUrl, $page.url.origin);\\n  url.searchParams.set(\\"workerFilter\\", selectedWorkerId.toString());\\n  url.searchParams.set(\\"serviceId\\", $page.url.searchParams.get(\\"serviceId\\"));\\n  return url.toString();\\n}\\n$: theme = $location.location.theme;\\n<\/script>\\n\\n<!-- in:fly|global={{ x: 40, duration: 300, delay: 100 * index }} -->\\n<button\\n  on:click={() => {\\n    selectedWorkerId = worker.id;\\n    selectedSlotTime = worker.nextAvailable?.next;\\n    const _worker = $location.workers.find((w) => w.id === worker.id);\\n    shopStore.update((store) => {\\n      return { ...store, selectedProfessional: _worker, bookingDate: selectedSlotTime };\\n    });\\n\\n    const href = createRecapUrl();\\n    goto(href);\\n  }}\\n  class=\\"flex flex-col w-full bg-white box-border p-3 px-4 rounded-lg transition-all duration-300 ease-in-out border border-[#E5E7EB] {`${theme}FOCUSHOVER`}\\"\\n>\\n  <div class=\\"flex flex-row items-center gap-4 w-full h-fit\\">\\n    {#if worker.avatar != null}\\n      <img src={worker.avatar} alt={worker.name} class=\\"w-16 rounded-full aspect-square\\" />\\n    {:else}\\n      <PlaceholderAvatar shape=\\"mini-circle\\" name={worker.name} />\\n    {/if}\\n    <div class=\\"flex flex-col items-start\\">\\n      <p class=\\"text-lg font-bold text-primary\\">{worker.name}</p>\\n\\n      {#if worker.nextAvailable?.ticketBefore == 0}\\n        <span class=\\"text-[#00D4AA] text-left text-sm font-bold\\">{m.available()}</span>\\n      {:else}\\n        <span\\n          class=\\"{$location.location.theme === \'PINK\'\\n            ? \'text-pink\'\\n            : \'text-blue\'} text-left text-sm font-bold\\"\\n        >\\n          {m.peopleInQueue({ number: worker.nextAvailable?.ticketBefore || 0 })}\\n        </span>\\n      {/if}\\n    </div>\\n    <div class=\\"flex-1\\" />\\n    <div class=\\"flex flex-col\\">\\n      <p class=\\"flex flex-row gap-2 justify-end items-center text-lg font-bold\\">\\n        <!-- {#if worker.nextAvailable?.createHole}\\n          <img src={calendar} alt=\\"calendar\\" />\\n        {:else}\\n          <img src={lightning} alt=\\"lightning\\" />\\n        {/if} -->\\n        {worker.nextAvailable?.next ? displayWaitingTime(worker.nextAvailable?.next) : null}\\n      </p>\\n      <!-- {#if !isFree}\\n        <p class=\\"text-right\\">\\n          +{displayPriceInDollars(150)}\\n        </p>\\n      {/if} -->\\n    </div>\\n  </div>\\n\\n  {#if worker.nextAvailable?.isFirstSlot && !worker.nextAvailable?.createHole && showInfo}\\n    <p class=\\"info text-left md:text-center w-full\\">\\n      {m.workerAvailable()}\\n    </p>\\n  {/if}\\n</button>\\n\\n<style>\\n  .CARDENFOCUSHOVER:hover {\\n    background-color: #c7e0ff30;\\n  }\\n\\n  .NEUTRALFOCUSHOVER:hover {\\n    background-color: #dfe5e730;\\n  }\\n\\n  .PINKFOCUSHOVER:hover {\\n    background-color: #e5cef730;\\n  }\\n\\n  .p .info {\\n    grid-area: info;\\n    border-radius: 4px;\\n    background: rgba(184, 254, 201, 0.5);\\n    padding-left: 8px;\\n    padding-right: 8px;\\n    padding-top: 0.3rem;\\n    padding-bottom: 0.3rem;\\n    margin-top: 1rem;\\n    margin-left: 4px;\\n    margin-right: 4px;\\n    margin-bottom: 4px;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAqFE,+CAAiB,MAAO,CACtB,gBAAgB,CAAE,SACpB,CAEA,gDAAkB,MAAO,CACvB,gBAAgB,CAAE,SACpB,CAEA,6CAAe,MAAO,CACpB,gBAAgB,CAAE,SACpB,CAEA,iBAAE,CAAC,oBAAM,CACP,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACpC,YAAY,CAAE,GAAG,CACjB,aAAa,CAAE,GAAG,CAClB,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,GAAG,CAChB,YAAY,CAAE,GAAG,CACjB,aAAa,CAAE,GACjB"}'
};
const Worker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let theme;
  let $location, $$unsubscribe_location;
  let $$unsubscribe_page;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { worker } = $$props;
  let { showInfo } = $$props;
  let { index } = $$props;
  let { selectedWorkerId } = $$props;
  let { selectedSlotTime } = $$props;
  if ($$props.worker === void 0 && $$bindings.worker && worker !== void 0) $$bindings.worker(worker);
  if ($$props.showInfo === void 0 && $$bindings.showInfo && showInfo !== void 0) $$bindings.showInfo(showInfo);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.selectedWorkerId === void 0 && $$bindings.selectedWorkerId && selectedWorkerId !== void 0) $$bindings.selectedWorkerId(selectedWorkerId);
  if ($$props.selectedSlotTime === void 0 && $$bindings.selectedSlotTime && selectedSlotTime !== void 0) $$bindings.selectedSlotTime(selectedSlotTime);
  $$result.css.add(css);
  theme = $location.location.theme;
  $$unsubscribe_location();
  $$unsubscribe_page();
  return ` <button class="${"flex flex-col w-full bg-white box-border p-3 px-4 rounded-lg transition-all duration-300 ease-in-out border border-[#E5E7EB] " + escape(`${theme}FOCUSHOVER`, true) + " svelte-1bqopyy"}"><div class="flex flex-row items-center gap-4 w-full h-fit">${worker.avatar != null ? `<img${add_attribute("src", worker.avatar, 0)}${add_attribute("alt", worker.name, 0)} class="w-16 rounded-full aspect-square">` : `${validate_component(PlaceholderAvatar, "PlaceholderAvatar").$$render($$result, { shape: "mini-circle", name: worker.name }, {}, {})}`} <div class="flex flex-col items-start"><p class="text-lg font-bold text-primary">${escape(worker.name)}</p> ${worker.nextAvailable?.ticketBefore == 0 ? `<span class="text-[#00D4AA] text-left text-sm font-bold">${escape(/* @__PURE__ */ available())}</span>` : `<span class="${escape(
    $location.location.theme === "PINK" ? "text-pink" : "text-blue",
    true
  ) + " text-left text-sm font-bold"}">${escape(peopleInQueue({
    number: worker.nextAvailable?.ticketBefore || 0
  }))}</span>`}</div> <div class="flex-1"></div> <div class="flex flex-col"><p class="flex flex-row gap-2 justify-end items-center text-lg font-bold"> ${escape(worker.nextAvailable?.next ? displayWaitingTime(worker.nextAvailable?.next) : null)}</p> </div></div> ${worker.nextAvailable?.isFirstSlot && !worker.nextAvailable?.createHole && showInfo ? `<p class="info text-left md:text-center w-full svelte-1bqopyy">${escape(/* @__PURE__ */ workerAvailable())}</p>` : ``} </button>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots$1) => {
  let appointmentTimes;
  let bookingDelay;
  let appointmentOptionSelected;
  let selectedTime;
  let start;
  let allWorkers;
  let workers;
  let otherWorkers;
  let selectedWorker;
  let bookingDelayBg;
  let $location, $$unsubscribe_location;
  let $clock, $$unsubscribe_clock;
  let $shopStore, $$unsubscribe_shopStore;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_clock = subscribe(clock, (value) => $clock = value);
  $$unsubscribe_shopStore = subscribe(shopStore, (value) => $shopStore = value);
  let { data } = $$props;
  let selectedDay = today(getLocalTimeZone());
  let now = new Date($clock);
  let filterWorkerId = data.workerFilter ? Number(data.workerFilter) : null;
  let selectedWorkerId = filterWorkerId;
  let selectedSlotTime;
  const bookingMode = $location.config.booking_window;
  let bookingDelays = [
    { time: "5", haveWorkerAvailable: false },
    { time: "15", haveWorkerAvailable: false },
    { time: "30", haveWorkerAvailable: false },
    { time: "45", haveWorkerAvailable: false },
    { time: "60", haveWorkerAvailable: false },
    { time: "90", haveWorkerAvailable: false },
    { time: "120", haveWorkerAvailable: false },
    { time: "180", haveWorkerAvailable: false }
  ];
  const parseTimeString = (time) => {
    const [hourStr, minuteStr] = time.split(":");
    return {
      hour: parseInt(hourStr, 10),
      minutes: parseInt(minuteStr || "0", 10)
    };
  };
  const createSlotDate = (start2, end) => {
    const slots = [];
    const { hour: startHour, minutes: startMinutes } = parseTimeString(start2);
    const { hour: endHour, minutes: endMinutes } = parseTimeString(end);
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes of [0, 30]) {
        if (hour === startHour && minutes < startMinutes) continue;
        if (hour === endHour && minutes > endMinutes) break;
        const date = /* @__PURE__ */ new Date();
        date.setHours(hour, minutes, 0, 0);
        slots.push({
          date,
          haveWorkerAvailable: haveWorkerAvailableForDate(date)
        });
      }
    }
    return slots;
  };
  const getTimeString = (date) => {
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };
  const filterShowableWorkers = (workers2, date) => {
    return workers2.filter((w) => {
      const haveTicketInConflict = w.tickets.find((t) => {
        if (!t.rdvTime || !t.durationS) return false;
        const rdvDate = new Date(t.rdvTime);
        const end = rdvDate.getTime() + t.durationS * 1e3;
        return date.getTime() > rdvDate.getTime() && date.getTime() < end;
      });
      return w.formatedStatus !== "unavailable" && !haveTicketInConflict;
    });
  };
  const haveWorkerAvailableForDate = (date) => {
    const haveWorkerAvailable = filterShowableWorkers(computeQueue($location, new Date($clock), date), date);
    return haveWorkerAvailable.length > 0 ? true : false;
  };
  const setShowableBookingDelays = () => {
    for (const delay of bookingDelays) {
      const date = new Date(now.getTime() + Number(delay.time) * 6e4);
      delay.haveWorkerAvailable = haveWorkerAvailableForDate(date);
    }
    bookingDelays = bookingDelays;
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    appointmentOptionSelected = $shopStore.bookingType == "appointment" ? true : false;
    appointmentTimes = computeAppointmentTimes(now, selectedDay, $location.planning);
    selectedTime = appointmentOptionSelected && appointmentTimes.length > 0 ? appointmentTimes[0].getTime().toString() : null;
    bookingDelay = $shopStore.bookingDelay ?? 0;
    start = selectedTime ? /* @__PURE__ */ new Date(+selectedTime) : new Date(now.getTime() + Number(bookingDelay) * 6e4);
    allWorkers = computeQueue($location, new Date($clock), start);
    {
      if (bookingMode === "DAY") {
        const soonerStartWorker = allWorkers.reduce(
          (acc, w) => {
            if (!acc || w.startWorkerDate && w.startWorkerDate < acc) {
              return w.startWorkerDate;
            }
            return acc;
          },
          null
        );
        const laterEndWorker = allWorkers.reduce(
          (acc, w) => {
            if (!acc || w.endWorkerDate && w.endWorkerDate > acc) {
              return w.endWorkerDate;
            }
            return acc;
          },
          null
        );
        const soonerStartWorkerTime = soonerStartWorker ? getTimeString(soonerStartWorker) : null;
        const laterEndWorkerTime = laterEndWorker ? getTimeString(laterEndWorker) : null;
        createSlotDate(soonerStartWorkerTime, "12:00");
        createSlotDate("12:00", laterEndWorkerTime);
      }
    }
    {
      setShowableBookingDelays();
    }
    workers = filterShowableWorkers(allWorkers, start);
    {
      if (appointmentOptionSelected == false) {
        setBookingDate(today(getLocalTimeZone()).toDate(getLocalTimeZone()));
      }
    }
    otherWorkers = workers.filter((w) => w.id != filterWorkerId).filter((w) => start < w.endWorkerDate);
    selectedWorker = workers.filter((w) => w.id == filterWorkerId).filter((w) => start < w.endWorkerDate);
    bookingDelayBg = backgroundColorByTheme[$location.location.theme];
    $$rendered = `<main class="w-full flex flex-col items-center md:items-start px-4">${validate_component(BookingHeader, "BookingHeader").$$render($$result, { text: /* @__PURE__ */ chooseArrivalTime() }, {}, {})} <div class="flex flex-col items-start md:items-start gap-4 w-full lg:w-[90%] xl:[60%] md:mt-0"><div class="w-full overflow-x-auto">${validate_component(ProfessionalSelect, "ProfessionalSelect").$$render(
      $$result,
      {
        workers,
        selectedWorkerId: filterWorkerId
      },
      {
        selectedWorkerId: ($$value) => {
          filterWorkerId = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${["DAY", "3H"].includes(bookingMode) ? `<div class="flex flex-col gap-4 py-4 w-full"><div class="flex flex-col md:flex-row w-full gap-2 justify-between"><h2 class="text-lg font-bold">${escape(/* @__PURE__ */ yourArrivalTime())}</h2></div> <div class="grid grid-cols-4 gap-2">${each(bookingDelays, (delay, i) => {
      let numberDelay = Number(delay.time);
      return ` <button ${!delay.haveWorkerAvailable ? "disabled" : ""} class="${"flex gap-2 justify-between disabled:opacity-30 disabled:cursor-not-allowed p-3 border rounded-xl transition-all duration-200 ease-in-out font-bold h-[69px] " + escape(
        bookingDelay == delay.time ? `${bookingDelayBg} text-primary-foreground ` : "bg-white hover:bg-gray-100",
        true
      )}">${escape(numberDelay >= 60 ? `${Math.floor(numberDelay / 60)}h${numberDelay % 60 > 0 ? `${numberDelay % 60}` : ""}` : `${numberDelay} min`)} ${i === 0 ? `${validate_component(Lightning, "Lightning").$$render($$result, {}, {}, {})}` : ``} </button>`;
    })}</div></div> ${bookingMode === "DAY" ? `<span class="text-sm text-[#616163] text-center w-full">${escape(/* @__PURE__ */ or())}</span> <div class="${[
      "border rounded-xl w-full transition-colors duration-100",
      ""
    ].join(" ").trim()}"><button class="flex items-center justify-between p-4 w-full"><p class="text-[#616163] text-xs lg:text-sm">${escape(/* @__PURE__ */ laterInTheDay())}</p> <div class="${"text-[#09051A] transform duration-150 " + escape("", true)}">${validate_component(Chevron_down, "ChevronDown").$$render($$result, { size: 18 }, {}, {})}</div></button> ${``}</div>` : ``}` : `${bookingMode == "ASAP" ? `<div class="flex justify-center items-center w-full bg-[#DFE5E7] bg-opacity-30 rounded-xl p-4 text-sm text-[#616163] font-normal"><p>${escape(/* @__PURE__ */ bookingAsapText())}</p></div>` : ``}`} <div class="mb-2"><h2 class="text-lg font-bold lowercase first-letter:uppercase">${escape(/* @__PURE__ */ bestOffers())}</h2> <p class="text-sm text-[#616163]">(${escape(/* @__PURE__ */ bestOffersCalculationInfos())})</p></div> <div class="flex items-center justify-center w-full">${validate_component(BadgeTarifMode, "BadgeTarifMode").$$render($$result, {}, {}, {})}</div> ${selectedWorker.length || otherWorkers.length ? `<div class="flex flex-col gap-4 w-full overflow-hidden">${filterWorkerId ? ` ${each(selectedWorker, (w, i) => {
      return `${validate_component(Worker, "Worker").$$render(
        $$result,
        {
          worker: w,
          showInfo: appointmentOptionSelected,
          isFree: w.nextAvailable?.isFirstSlot && !(appointmentOptionSelected && w.nextAvailable?.createHole),
          index: i,
          selectedWorkerId,
          selectedSlotTime
        },
        {
          selectedWorkerId: ($$value) => {
            selectedWorkerId = $$value;
            $$settled = false;
          },
          selectedSlotTime: ($$value) => {
            selectedSlotTime = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })} ${otherWorkers.length && selectedWorker.length ? `<div class="mb-2 mt-4"><h2 class="text-lg font-bold">${escape(/* @__PURE__ */ otherAvaiblePro())}</h2></div>` : ``}` : ``} ${otherWorkers.length ? ` ${each(otherWorkers, (w, i) => {
      return `${validate_component(Worker, "Worker").$$render(
        $$result,
        {
          worker: w,
          showInfo: appointmentOptionSelected,
          index: i,
          isFree: false,
          selectedWorkerId,
          selectedSlotTime
        },
        {
          selectedWorkerId: ($$value) => {
            selectedWorkerId = $$value;
            $$settled = false;
          },
          selectedSlotTime: ($$value) => {
            selectedSlotTime = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}` : ``}</div>` : `${escape(/* @__PURE__ */ noAvailableProfessionalsMessage())}`}</div></main>`;
  } while (!$$settled);
  $$unsubscribe_location();
  $$unsubscribe_clock();
  $$unsubscribe_shopStore();
  return $$rendered;
});
export {
  Page as default
};

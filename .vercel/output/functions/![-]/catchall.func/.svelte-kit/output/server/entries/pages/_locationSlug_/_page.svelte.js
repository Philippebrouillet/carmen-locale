import { c as compute_rest_props, s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, e as escape, a as add_attribute, v as validate_component, s as setContext, l as hasContext, g as getContext, o as onDestroy, f as spread, i as escape_attribute_value, h as escape_object, d as each } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { a as displayWaitingTime, c as displayDuration } from "../../../chunks/formater.js";
import { P as PlaceholderAvatar } from "../../../chunks/PlaceholderAvatar.js";
import { u as unavailableShort, a as availableNow } from "../../../chunks/unavailableShort.js";
import { p as proBackgroundColorByFormatedStatus, b as backgroundColorByTheme, g as getLocationStatus } from "../../../chunks/Location.js";
import { c as clock } from "../../../chunks/clock.svelte.js";
import { l as location } from "../../../chunks/location.store.js";
import { w as writable } from "../../../chunks/index2.js";
import { c as cn, B as Button } from "../../../chunks/button.js";
import "clsx";
import { l as languageTag } from "../../../chunks/runtime.js";
import { p as peopleInQueue } from "../../../chunks/peopleInQueue.js";
import { F as Footer } from "../../../chunks/Footer.js";
import { L as LocationHeader, E as ExternalLinks, a as LocationSection } from "../../../chunks/ExternalLinks.js";
import { c as computeQueue } from "../../../chunks/QueueLine.js";
import { g as getTranslationFunctions } from "../../../chunks/index3.js";
import { B as BadgeTarifMode } from "../../../chunks/BadgeTarifMode.js";
import { l as lastMinute } from "../../../chunks/lastMinute.js";
import { I as Icon } from "../../../chunks/Icon.js";
import "../../../chunks/basketStore.js";
const bookWith$a = /* @__NO_SIDE_EFFECTS__ */ (params) => `Réservez avec ${params.name}`;
const bookWith$9 = /* @__NO_SIDE_EFFECTS__ */ (params) => `احجز مع`;
const bookWith$8 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Book with`;
const bookWith$7 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Reserva con`;
const bookWith$6 = /* @__NO_SIDE_EFFECTS__ */ (params) => `बुक करें`;
const bookWith$5 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Prenota con`;
const bookWith$4 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Boek met`;
const bookWith$3 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Reserve com`;
const bookWith$2 = /* @__NO_SIDE_EFFECTS__ */ (params) => `Забронируйте с`;
const bookWith$1 = /* @__NO_SIDE_EFFECTS__ */ (params) => `预订`;
const bookWith = /* @__NO_SIDE_EFFECTS__ */ (params, options = {}) => {
  return {
    ar: bookWith$9,
    en: bookWith$8,
    es: bookWith$7,
    fr: bookWith$a,
    hi: bookWith$6,
    it: bookWith$5,
    nl: bookWith$4,
    pt: bookWith$3,
    ru: bookWith$2,
    zh: bookWith$1
  }[options.languageTag ?? languageTag()](params);
};
const avaibilityTextCloseWithExternalLink$a = /* @__NO_SIDE_EFFECTS__ */ () => `Envie de prévoir votre passage ? Réservez votre RDV directement sur la plateforme partenaire.`;
const avaibilityTextCloseWithExternalLink$9 = /* @__NO_SIDE_EFFECTS__ */ () => `هل ترغب في التخطيط لزيارتك؟ احجز موعدك مباشرة على منصة الشريك.`;
const avaibilityTextCloseWithExternalLink$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Want to plan your visit? Book your appointment directly on the partner platform.`;
const avaibilityTextCloseWithExternalLink$7 = /* @__NO_SIDE_EFFECTS__ */ () => `¿Quieres planificar tu visita? Reserva tu cita directamente en la plataforma de socios.`;
const avaibilityTextCloseWithExternalLink$6 = /* @__NO_SIDE_EFFECTS__ */ () => `क्या आप अपनी यात्रा की योजना बनाना चाहते हैं? पार्टनर प्लेटफॉर्म पर सीधे अपनी अपॉइंटमेंट बुक करें।`;
const avaibilityTextCloseWithExternalLink$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Vuoi pianificare la tua visita? Prenota il tuo appuntamento direttamente sulla piattaforma partner.`;
const avaibilityTextCloseWithExternalLink$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Wilt u uw bezoek plannen? Boek uw afspraak direct via het partnerplatform.`;
const avaibilityTextCloseWithExternalLink$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Deseja planejar sua visita? Agende sua consulta diretamente na plataforma do parceiro.`;
const avaibilityTextCloseWithExternalLink$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Хотите спланировать свой визит? Запишитесь на прием напрямую на партнерской платформе.`;
const avaibilityTextCloseWithExternalLink$1 = /* @__NO_SIDE_EFFECTS__ */ () => `想安排您的行程？请直接在合作平台上预约。`;
const avaibilityTextCloseWithExternalLink = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: avaibilityTextCloseWithExternalLink$9,
    en: avaibilityTextCloseWithExternalLink$8,
    es: avaibilityTextCloseWithExternalLink$7,
    fr: avaibilityTextCloseWithExternalLink$a,
    hi: avaibilityTextCloseWithExternalLink$6,
    it: avaibilityTextCloseWithExternalLink$5,
    nl: avaibilityTextCloseWithExternalLink$4,
    pt: avaibilityTextCloseWithExternalLink$3,
    ru: avaibilityTextCloseWithExternalLink$2,
    zh: avaibilityTextCloseWithExternalLink$1
  }[options.languageTag ?? languageTag()]();
};
const avaibilityTextCloseWithoutExternalLink$a = /* @__NO_SIDE_EFFECTS__ */ () => `Nous ne prenons aucun enregistrement en ligne actuellement. Merci de consulter nos horaires.`;
const avaibilityTextCloseWithoutExternalLink$9 = /* @__NO_SIDE_EFFECTS__ */ () => `لا نقبل حاليًا تسجيل الوصول عبر الإنترنت. يرجى مراجعة ساعات العمل.`;
const avaibilityTextCloseWithoutExternalLink$8 = /* @__NO_SIDE_EFFECTS__ */ () => `We are not currently accepting online check-ins. Please check our opening hours.`;
const avaibilityTextCloseWithoutExternalLink$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Actualmente no aceptamos check-in en línea. Por favor, consulte nuestro horario de apertura.`;
const avaibilityTextCloseWithoutExternalLink$6 = /* @__NO_SIDE_EFFECTS__ */ () => `हम फिलहाल ऑनलाइन चेक-इन स्वीकार नहीं कर रहे हैं। कृपया हमारे खुलने का समय देख लें।`;
const avaibilityTextCloseWithoutExternalLink$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Al momento non accettiamo check-in online. Si prega di controllare i nostri orari di apertura.`;
const avaibilityTextCloseWithoutExternalLink$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Momenteel accepteren we geen online check-ins. Raadpleeg onze openingstijden.`;
const avaibilityTextCloseWithoutExternalLink$3 = /* @__NO_SIDE_EFFECTS__ */ () => `No momento, não estamos aceitando check-ins online. Por favor, verifique nosso horário de funcionamento.`;
const avaibilityTextCloseWithoutExternalLink$2 = /* @__NO_SIDE_EFFECTS__ */ () => `В настоящее время мы не принимаем онлайн-регистрацию. Пожалуйста, уточните часы работы.`;
const avaibilityTextCloseWithoutExternalLink$1 = /* @__NO_SIDE_EFFECTS__ */ () => `我们目前不接受在线办理入住。请查看我们的营业时间。`;
const avaibilityTextCloseWithoutExternalLink = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: avaibilityTextCloseWithoutExternalLink$9,
    en: avaibilityTextCloseWithoutExternalLink$8,
    es: avaibilityTextCloseWithoutExternalLink$7,
    fr: avaibilityTextCloseWithoutExternalLink$a,
    hi: avaibilityTextCloseWithoutExternalLink$6,
    it: avaibilityTextCloseWithoutExternalLink$5,
    nl: avaibilityTextCloseWithoutExternalLink$4,
    pt: avaibilityTextCloseWithoutExternalLink$3,
    ru: avaibilityTextCloseWithoutExternalLink$2,
    zh: avaibilityTextCloseWithoutExternalLink$1
  }[options.languageTag ?? languageTag()]();
};
const avaibilityTextFullWithExternalLink$a = /* @__NO_SIDE_EFFECTS__ */ () => `Aucune disponibilité pour le moment. Merci de patienter ou de prendre un RDV pour un autre jour.`;
const avaibilityTextFullWithExternalLink$9 = /* @__NO_SIDE_EFFECTS__ */ () => `لا توجد مواعيد متاحة حاليًا. يُرجى الانتظار أو حجز موعد ليوم آخر.`;
const avaibilityTextFullWithExternalLink$8 = /* @__NO_SIDE_EFFECTS__ */ () => `No appointments are currently available. Please wait or book an appointment for another day.`;
const avaibilityTextFullWithExternalLink$7 = /* @__NO_SIDE_EFFECTS__ */ () => `No hay citas disponibles por el momento. Espere o reserve una cita para otro día.`;
const avaibilityTextFullWithExternalLink$6 = /* @__NO_SIDE_EFFECTS__ */ () => `फिलहाल कोई अपॉइंटमेंट उपलब्ध नहीं है। कृपया प्रतीक्षा करें या किसी अन्य दिन के लिए अपॉइंटमेंट बुक करें।`;
const avaibilityTextFullWithExternalLink$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Al momento non ci sono appuntamenti disponibili. Si prega di attendere o prenotare un appuntamento per un altro giorno.`;
const avaibilityTextFullWithExternalLink$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Er zijn momenteel geen afspraken beschikbaar. Wacht alstublieft even of maak een afspraak voor een andere dag.`;
const avaibilityTextFullWithExternalLink$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Não há horários disponíveis no momento. Por favor, aguarde ou agende uma consulta para outro dia.`;
const avaibilityTextFullWithExternalLink$2 = /* @__NO_SIDE_EFFECTS__ */ () => `В настоящее время свободных мест для записи нет. Пожалуйста, подождите или запишитесь на прием на другой день.`;
const avaibilityTextFullWithExternalLink$1 = /* @__NO_SIDE_EFFECTS__ */ () => `目前没有可预约时间。请稍候或预约其他日期。`;
const avaibilityTextFullWithExternalLink = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: avaibilityTextFullWithExternalLink$9,
    en: avaibilityTextFullWithExternalLink$8,
    es: avaibilityTextFullWithExternalLink$7,
    fr: avaibilityTextFullWithExternalLink$a,
    hi: avaibilityTextFullWithExternalLink$6,
    it: avaibilityTextFullWithExternalLink$5,
    nl: avaibilityTextFullWithExternalLink$4,
    pt: avaibilityTextFullWithExternalLink$3,
    ru: avaibilityTextFullWithExternalLink$2,
    zh: avaibilityTextFullWithExternalLink$1
  }[options.languageTag ?? languageTag()]();
};
const avaibilityTextFullWithoutExternalLink$a = /* @__NO_SIDE_EFFECTS__ */ () => `Aucune disponibilité pour le moment. Merci de patienter ou de revenir vers nous plus tard.`;
const avaibilityTextFullWithoutExternalLink$9 = /* @__NO_SIDE_EFFECTS__ */ () => `لا يوجد توافر في الوقت الحالي. يرجى الانتظار أو الاتصال بنا مرة أخرى لاحقاً.`;
const avaibilityTextFullWithoutExternalLink$8 = /* @__NO_SIDE_EFFECTS__ */ () => `No availability at the moment. Please wait or contact us again later.`;
const avaibilityTextFullWithoutExternalLink$7 = /* @__NO_SIDE_EFFECTS__ */ () => `No hay disponibilidad en este momento. Espere o contáctenos más tarde.`;
const avaibilityTextFullWithoutExternalLink$6 = /* @__NO_SIDE_EFFECTS__ */ () => `फिलहाल उपलब्धता नहीं है। कृपया प्रतीक्षा करें या बाद में हमसे दोबारा संपर्क करें।`;
const avaibilityTextFullWithoutExternalLink$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Nessuna disponibilità al momento. Attendi o contattaci più tardi.`;
const avaibilityTextFullWithoutExternalLink$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Momenteel niet beschikbaar. Wacht alstublieft even of neem later opnieuw contact met ons op.`;
const avaibilityTextFullWithoutExternalLink$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Não há disponibilidade no momento. Por favor, aguarde ou entre em contato conosco novamente mais tarde.`;
const avaibilityTextFullWithoutExternalLink$2 = /* @__NO_SIDE_EFFECTS__ */ () => `В данный момент нет в наличии. Пожалуйста, подождите или свяжитесь с нами позже.`;
const avaibilityTextFullWithoutExternalLink$1 = /* @__NO_SIDE_EFFECTS__ */ () => `目前暂无空房。请稍候或稍后再联系我们。`;
const avaibilityTextFullWithoutExternalLink = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: avaibilityTextFullWithoutExternalLink$9,
    en: avaibilityTextFullWithoutExternalLink$8,
    es: avaibilityTextFullWithoutExternalLink$7,
    fr: avaibilityTextFullWithoutExternalLink$a,
    hi: avaibilityTextFullWithoutExternalLink$6,
    it: avaibilityTextFullWithoutExternalLink$5,
    nl: avaibilityTextFullWithoutExternalLink$4,
    pt: avaibilityTextFullWithoutExternalLink$3,
    ru: avaibilityTextFullWithoutExternalLink$2,
    zh: avaibilityTextFullWithoutExternalLink$1
  }[options.languageTag ?? languageTag()]();
};
const avaibilityTextOpen$a = /* @__NO_SIDE_EFFECTS__ */ () => `Une disponibilité aujourd’hui ? On a bloqué des créneaux rien que pour vous `;
const avaibilityTextOpen$9 = /* @__NO_SIDE_EFFECTS__ */ () => `هل يوجد مكان شاغر اليوم؟ لقد حجزنا بعض الأماكن خصيصاً لك. `;
const avaibilityTextOpen$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Is there an opening today? We've reserved some slots just for you. `;
const avaibilityTextOpen$7 = /* @__NO_SIDE_EFFECTS__ */ () => `¿Hay algún lugar disponible hoy? Hemos reservado algunos espacios solo para ti. `;
const avaibilityTextOpen$6 = /* @__NO_SIDE_EFFECTS__ */ () => `क्या आज कोई सीट खाली है? हमने आपके लिए कुछ सीटें आरक्षित कर रखी हैं। `;
const avaibilityTextOpen$5 = /* @__NO_SIDE_EFFECTS__ */ () => `C'è posto libero oggi? Abbiamo riservato alcuni posti solo per te. `;
const avaibilityTextOpen$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Is er vandaag nog plek? We hebben een aantal plekken voor u gereserveerd. `;
const avaibilityTextOpen$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Tem algum horário disponível hoje? Reservamos alguns horários só para você. `;
const avaibilityTextOpen$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Есть ли сегодня свободные места? Мы зарезервировали несколько мест специально для вас. `;
const avaibilityTextOpen$1 = /* @__NO_SIDE_EFFECTS__ */ () => `今天有空位吗？我们已经为您预留了一些名额。 `;
const avaibilityTextOpen = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: avaibilityTextOpen$9,
    en: avaibilityTextOpen$8,
    es: avaibilityTextOpen$7,
    fr: avaibilityTextOpen$a,
    hi: avaibilityTextOpen$6,
    it: avaibilityTextOpen$5,
    nl: avaibilityTextOpen$4,
    pt: avaibilityTextOpen$3,
    ru: avaibilityTextOpen$2,
    zh: avaibilityTextOpen$1
  }[options.languageTag ?? languageTag()]();
};
const comToday$a = /* @__NO_SIDE_EFFECTS__ */ () => `Venir aujourd'hui`;
const comToday$9 = /* @__NO_SIDE_EFFECTS__ */ () => `تعال اليوم`;
const comToday$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Come today`;
const comToday$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Ven hoy`;
const comToday$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आज आओ`;
const comToday$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Vieni oggi`;
const comToday$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Kom vandaag nog!`;
const comToday$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Venha hoje`;
const comToday$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Приходите сегодня!`;
const comToday$1 = /* @__NO_SIDE_EFFECTS__ */ () => `今天就来吧`;
const comToday = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: comToday$9,
    en: comToday$8,
    es: comToday$7,
    fr: comToday$a,
    hi: comToday$6,
    it: comToday$5,
    nl: comToday$4,
    pt: comToday$3,
    ru: comToday$2,
    zh: comToday$1
  }[options.languageTag ?? languageTag()]();
};
const scheduleVisit$a = /* @__NO_SIDE_EFFECTS__ */ () => `Planifier une visite`;
const scheduleVisit$9 = /* @__NO_SIDE_EFFECTS__ */ () => `خطط لزيارة`;
const scheduleVisit$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Plan a visit`;
const scheduleVisit$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Planifique una visita`;
const scheduleVisit$6 = /* @__NO_SIDE_EFFECTS__ */ () => `यात्रा की योजना बनाएं`;
const scheduleVisit$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Pianifica una visita`;
const scheduleVisit$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Plan een bezoek`;
const scheduleVisit$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Planeje uma visita`;
const scheduleVisit$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Запланируйте визит`;
const scheduleVisit$1 = /* @__NO_SIDE_EFFECTS__ */ () => `计划一次参观`;
const scheduleVisit = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: scheduleVisit$9,
    en: scheduleVisit$8,
    es: scheduleVisit$7,
    fr: scheduleVisit$a,
    hi: scheduleVisit$6,
    it: scheduleVisit$5,
    nl: scheduleVisit$4,
    pt: scheduleVisit$3,
    ru: scheduleVisit$2,
    zh: scheduleVisit$1
  }[options.languageTag ?? languageTag()]();
};
const scheduleVisitDescription$a = /* @__NO_SIDE_EFFECTS__ */ () => `Réserver pour demain ou plus tard`;
const scheduleVisitDescription$9 = /* @__NO_SIDE_EFFECTS__ */ () => `احجز لليوم غداً أو في وقت لاحق`;
const scheduleVisitDescription$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Book for tomorrow or later`;
const scheduleVisitDescription$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Reserva para mañana o más tarde`;
const scheduleVisitDescription$6 = /* @__NO_SIDE_EFFECTS__ */ () => `कल या बाद के लिए बुकिंग करें`;
const scheduleVisitDescription$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Prenota per domani o più tardi`;
const scheduleVisitDescription$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Reserveer voor morgen of later.`;
const scheduleVisitDescription$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Reserve para amanhã ou mais tarde.`;
const scheduleVisitDescription$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Забронируйте на завтра или позже.`;
const scheduleVisitDescription$1 = /* @__NO_SIDE_EFFECTS__ */ () => `预订明天或之后的时间`;
const scheduleVisitDescription = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: scheduleVisitDescription$9,
    en: scheduleVisitDescription$8,
    es: scheduleVisitDescription$7,
    fr: scheduleVisitDescription$a,
    hi: scheduleVisitDescription$6,
    it: scheduleVisitDescription$5,
    nl: scheduleVisitDescription$4,
    pt: scheduleVisitDescription$3,
    ru: scheduleVisitDescription$2,
    zh: scheduleVisitDescription$1
  }[options.languageTag ?? languageTag()]();
};
const teamAtYourService$a = /* @__NO_SIDE_EFFECTS__ */ () => `L’équipe à votre service`;
const teamAtYourService$9 = /* @__NO_SIDE_EFFECTS__ */ () => `فريقنا في خدمتكم`;
const teamAtYourService$8 = /* @__NO_SIDE_EFFECTS__ */ () => `The team at your service`;
const teamAtYourService$7 = /* @__NO_SIDE_EFFECTS__ */ () => `El equipo a su servicio`;
const teamAtYourService$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आपकी सेवा में हमारी टीम`;
const teamAtYourService$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Il team al tuo servizio`;
const teamAtYourService$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Het team staat tot uw dienst.`;
const teamAtYourService$3 = /* @__NO_SIDE_EFFECTS__ */ () => `A equipe ao seu dispor`;
const teamAtYourService$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Команда к вашим услугам`;
const teamAtYourService$1 = /* @__NO_SIDE_EFFECTS__ */ () => `我们的团队随时为您服务`;
const teamAtYourService = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: teamAtYourService$9,
    en: teamAtYourService$8,
    es: teamAtYourService$7,
    fr: teamAtYourService$a,
    hi: teamAtYourService$6,
    it: teamAtYourService$5,
    nl: teamAtYourService$4,
    pt: teamAtYourService$3,
    ru: teamAtYourService$2,
    zh: teamAtYourService$1
  }[options.languageTag ?? languageTag()]();
};
const css = {
  code: ".floating-ball.svelte-1jzz6xg{animation:svelte-1jzz6xg-floating-ball 2s ease-in-out infinite}.pulse-ring.svelte-1jzz6xg{animation:svelte-1jzz6xg-ring-pulse 2.2s ease-in-out infinite}@keyframes svelte-1jzz6xg-ring-pulse{0%{transform:scale(1)}35%{transform:scale(1.07)}55%{transform:scale(1.03)}75%{transform:scale(1.05)}100%{transform:scale(1)}}@keyframes svelte-1jzz6xg-floating-ball{0%,20%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.12)}90%,100%{transform:translateY(0) scale(1)}}",
  map: '{"version":3,"file":"WorkerAvatar.svelte","sources":["WorkerAvatar.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { displayWaitingTime } from \\"$lib/formater\\";\\nimport PlaceholderAvatar from \\"./PlaceholderAvatar.svelte\\";\\nimport * as m from \\"$lib/paraglide/messages.js\\";\\nimport { proBackgroundColorByFormatedStatus } from \\"$src/services/Location\\";\\nexport let queue;\\nexport let theme;\\nconst workerBorderByStatus = {\\n  available: `border-[#00D4AA]`,\\n  waiting: `border-[#0073FF]`,\\n  unavailable: \\"border-[#DFE5E7]\\"\\n};\\nconst workerBgByStatus = {\\n  available: `bg-[#00D4AA]`,\\n  waiting: `bg-[#0073FF]`,\\n  unavailable: \\"bg-[#DFE5E7]\\"\\n};\\n$: nextAvailableTime = queue.nextAvailable?.next;\\n$: status = queue.formatedStatus;\\n$: isPinkThemeAndWaiting = theme === \\"PINK\\" && status === \\"waiting\\";\\n<\/script>\\n\\n<div class=\\"flex flex-col gap-1 items-center flex-1\\">\\n  <div class=\\"w-fit relative rounded-full {status}\\">\\n    {#if queue.avatar}\\n      <img\\n        alt={queue.name}\\n        src={queue.avatar}\\n        class=\\"min-w-16 w-16 md:w-28 aspect-square rounded-full border-[3px] border-opacity-60 z-10 relative {isPinkThemeAndWaiting\\n          ? \'border-pink\'\\n          : workerBorderByStatus[status]} \\"\\n      />\\n    {:else}\\n      <PlaceholderAvatar name={queue.name} />\\n    {/if}\\n    <div\\n      class:pulse-ring={status !== \\"unavailable\\"}\\n      class=\\"absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full bg-opacity-20 {workerBgByStatus[\\n        status\\n      ]}  pointer-events-none z-0\\"\\n    ></div>\\n    <div\\n      class:floating-ball={status === \\"available\\"}\\n      class=\\"absolute bottom-[0.02rem] -right-[0.2rem] md:right-4 w-4 h-4 rounded-full border-2 border-white z-20\\n      {isPinkThemeAndWaiting ? \'bg-pink\' : proBackgroundColorByFormatedStatus[status]}\\n    \\"\\n    />\\n  </div>\\n\\n  <div class=\\"whitespace-nowrap font-bold text-sm text-center md:text-xl mt-0.5\\">\\n    {queue.name}\\n  </div>\\n\\n  <div class=\\"status {status} text-xs font-normal md:text-md text-center\\">\\n    {#if queue.status == \\"STOPED\\" || status === \\"unavailable\\" || nextAvailableTime == null}\\n      <p class=\\" text-[#DFE5E7]\\">{m.unavailableShort()}</p>\\n    {:else if status == \\"available\\"}\\n      <p class=\\"text-[#00D4AA]\\">{m.availableNow()}</p>\\n    {:else}\\n      <p class=\\" {isPinkThemeAndWaiting ? \'text-pink\' : \'text-[#0073FF]\'}\\">\\n        {displayWaitingTime(nextAvailableTime)}\\n      </p>\\n    {/if}\\n  </div>\\n</div>\\n\\n<style>\\n  .floating-ball {\\n    animation: floating-ball 2s ease-in-out infinite;\\n  }\\n  .pulse-ring {\\n    animation: ring-pulse 2.2s ease-in-out infinite;\\n  }\\n  @keyframes ring-pulse {\\n    0% {\\n      transform: scale(1);\\n    }\\n\\n    35% {\\n      transform: scale(1.07);\\n    }\\n\\n    55% {\\n      transform: scale(1.03);\\n    }\\n\\n    75% {\\n      transform: scale(1.05);\\n    }\\n\\n    100% {\\n      transform: scale(1);\\n    }\\n  }\\n\\n  @keyframes floating-ball {\\n    0%,\\n    20% {\\n      transform: translateY(0) scale(1);\\n    }\\n\\n    50% {\\n      transform: translateY(-8px) scale(1.12);\\n    }\\n\\n    90%,\\n    100% {\\n      transform: translateY(0) scale(1);\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAkEE,6BAAe,CACb,SAAS,CAAE,4BAAa,CAAC,EAAE,CAAC,WAAW,CAAC,QAC1C,CACA,0BAAY,CACV,SAAS,CAAE,yBAAU,CAAC,IAAI,CAAC,WAAW,CAAC,QACzC,CACA,WAAW,yBAAW,CACpB,EAAG,CACD,SAAS,CAAE,MAAM,CAAC,CACpB,CAEA,GAAI,CACF,SAAS,CAAE,MAAM,IAAI,CACvB,CAEA,GAAI,CACF,SAAS,CAAE,MAAM,IAAI,CACvB,CAEA,GAAI,CACF,SAAS,CAAE,MAAM,IAAI,CACvB,CAEA,IAAK,CACH,SAAS,CAAE,MAAM,CAAC,CACpB,CACF,CAEA,WAAW,4BAAc,CACvB,EAAE,CACF,GAAI,CACF,SAAS,CAAE,WAAW,CAAC,CAAC,CAAC,MAAM,CAAC,CAClC,CAEA,GAAI,CACF,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,MAAM,IAAI,CACxC,CAEA,GAAG,CACH,IAAK,CACH,SAAS,CAAE,WAAW,CAAC,CAAC,CAAC,MAAM,CAAC,CAClC,CACF"}'
};
const WorkerAvatar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let nextAvailableTime;
  let status;
  let isPinkThemeAndWaiting;
  let { queue } = $$props;
  let { theme } = $$props;
  const workerBorderByStatus = {
    available: `border-[#00D4AA]`,
    waiting: `border-[#0073FF]`,
    unavailable: "border-[#DFE5E7]"
  };
  const workerBgByStatus = {
    available: `bg-[#00D4AA]`,
    waiting: `bg-[#0073FF]`,
    unavailable: "bg-[#DFE5E7]"
  };
  if ($$props.queue === void 0 && $$bindings.queue && queue !== void 0) $$bindings.queue(queue);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  $$result.css.add(css);
  nextAvailableTime = queue.nextAvailable?.next;
  status = queue.formatedStatus;
  isPinkThemeAndWaiting = theme === "PINK" && status === "waiting";
  return `<div class="flex flex-col gap-1 items-center flex-1"><div class="${"w-fit relative rounded-full " + escape(status, true) + " svelte-1jzz6xg"}">${queue.avatar ? `<img${add_attribute("alt", queue.name, 0)}${add_attribute("src", queue.avatar, 0)} class="${"min-w-16 w-16 md:w-28 aspect-square rounded-full border-[3px] border-opacity-60 z-10 relative " + escape(
    isPinkThemeAndWaiting ? "border-pink" : workerBorderByStatus[status],
    true
  ) + " svelte-1jzz6xg"}">` : `${validate_component(PlaceholderAvatar, "PlaceholderAvatar").$$render($$result, { name: queue.name }, {}, {})}`} <div class="${[
    "absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full bg-opacity-20 " + escape(workerBgByStatus[status], true) + " pointer-events-none z-0 svelte-1jzz6xg",
    status !== "unavailable" ? "pulse-ring" : ""
  ].join(" ").trim()}"></div> <div class="${[
    "absolute bottom-[0.02rem] -right-[0.2rem] md:right-4 w-4 h-4 rounded-full border-2 border-white z-20 " + escape(
      isPinkThemeAndWaiting ? "bg-pink" : proBackgroundColorByFormatedStatus[status],
      true
    ) + " svelte-1jzz6xg",
    status === "available" ? "floating-ball" : ""
  ].join(" ").trim()}"></div></div> <div class="whitespace-nowrap font-bold text-sm text-center md:text-xl mt-0.5">${escape(queue.name)}</div> <div class="${"status " + escape(status, true) + " text-xs font-normal md:text-md text-center svelte-1jzz6xg"}">${queue.status == "STOPED" || status === "unavailable" || nextAvailableTime == null ? `<p class="text-[#DFE5E7]">${escape(unavailableShort())}</p>` : `${status == "available" ? `<p class="text-[#00D4AA]">${escape(availableNow())}</p>` : `<p class="${"" + escape(isPinkThemeAndWaiting ? "text-pink" : "text-[#0073FF]", true)}">${escape(displayWaitingTime(nextAvailableTime))}</p>`}`}</div> </div>`;
});
const EMBLA_CAROUSEL_CONTEXT = Symbol("EMBLA_CAROUSEL_CONTEXT");
function setEmblaContext(config) {
  setContext(EMBLA_CAROUSEL_CONTEXT, config);
  return config;
}
function getEmblaContext(name = "This component") {
  if (!hasContext(EMBLA_CAROUSEL_CONTEXT)) {
    throw new Error(`${name} must be used within a <Carousel.Root> component`);
  }
  return getContext(EMBLA_CAROUSEL_CONTEXT);
}
const Carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["opts", "plugins", "api", "orientation", "class"]);
  let { opts = {} } = $$props;
  let { plugins = [] } = $$props;
  let { api = void 0 } = $$props;
  let { orientation = "horizontal" } = $$props;
  let { class: className = void 0 } = $$props;
  const apiStore = writable(void 0);
  const orientationStore = writable(orientation);
  const canScrollPrev = writable(false);
  const canScrollNext = writable(false);
  const optionsStore = writable(opts);
  const pluginStore = writable(plugins);
  const scrollSnapsStore = writable([]);
  const selectedIndexStore = writable(0);
  function scrollPrev() {
    api?.scrollPrev();
  }
  function scrollNext() {
    api?.scrollNext();
  }
  function scrollTo(index, jump) {
    api?.scrollTo(index, jump);
  }
  function onSelect(api2) {
    if (!api2) return;
    canScrollPrev.set(api2.canScrollPrev());
    canScrollNext.set(api2.canScrollNext());
  }
  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  }
  setEmblaContext({
    api: apiStore,
    scrollPrev,
    scrollNext,
    orientation: orientationStore,
    canScrollNext,
    canScrollPrev,
    handleKeyDown,
    options: optionsStore,
    plugins: pluginStore,
    onInit,
    scrollSnaps: scrollSnapsStore,
    selectedIndex: selectedIndexStore,
    scrollTo
  });
  function onInit(event) {
    api = event.detail;
    apiStore.set(api);
    scrollSnapsStore.set(api.scrollSnapList());
  }
  onDestroy(() => {
    api?.off("select", onSelect);
  });
  if ($$props.opts === void 0 && $$bindings.opts && opts !== void 0) $$bindings.opts(opts);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0) $$bindings.plugins(plugins);
  if ($$props.api === void 0 && $$bindings.api && api !== void 0) $$bindings.api(api);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  {
    orientationStore.set(orientation);
  }
  {
    pluginStore.set(plugins);
  }
  {
    optionsStore.set(opts);
  }
  {
    if (api) {
      onSelect(api);
      api.on("select", onSelect);
      api.on("reInit", onSelect);
    }
  }
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("relative", className))
      },
      { role: "region" },
      { "aria-roledescription": "carousel" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Carousel_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $$unsubscribe_options;
  let $orientation, $$unsubscribe_orientation;
  let $$unsubscribe_plugins;
  let { class: className = void 0 } = $$props;
  const { orientation, options, plugins, onInit } = getEmblaContext("<Carousel.Content/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_options = subscribe(options, (value) => value);
  $$unsubscribe_plugins = subscribe(plugins, (value) => value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  $$unsubscribe_options();
  $$unsubscribe_orientation();
  $$unsubscribe_plugins();
  return `<div class="overflow-hidden"><div${spread(
    [
      {
        class: escape_attribute_value(cn(
          "flex",
          $orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ))
      },
      { "data-embla-container": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Carousel_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $orientation, $$unsubscribe_orientation;
  let { class: className = void 0 } = $$props;
  const { orientation } = getEmblaContext("<Carousel.Item/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  $$unsubscribe_orientation();
  return `<div${spread(
    [
      { role: "group" },
      { "aria-roledescription": "slide" },
      {
        class: escape_attribute_value(cn("min-w-0 shrink-0 grow-0 basis-full", $orientation === "horizontal" ? "pl-4" : "pt-4", className))
      },
      { "data-embla-slide": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const ProfessionalCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let now;
  let next;
  let duration;
  let isPinkThemeAndWaiting;
  let status;
  let nextAvailableTime;
  let disabled;
  let $clock, $$unsubscribe_clock;
  $$unsubscribe_clock = subscribe(clock, (value) => $clock = value);
  let { worker } = $$props;
  let { href } = $$props;
  let { background } = $$props;
  let { theme } = $$props;
  if ($$props.worker === void 0 && $$bindings.worker && worker !== void 0) $$bindings.worker(worker);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.background === void 0 && $$bindings.background && background !== void 0) $$bindings.background(background);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  now = new Date($clock);
  next = worker?.nextAvailable?.next ? new Date(worker.nextAvailable.next) : /* @__PURE__ */ new Date();
  duration = Math.floor((next.getTime() - now.getTime()) / 1e3);
  status = worker.formatedStatus;
  isPinkThemeAndWaiting = theme === "PINK" && status === "waiting";
  nextAvailableTime = worker.nextAvailable?.next;
  disabled = worker.formatedStatus === "unavailable";
  $$unsubscribe_clock();
  return `<div class="${[
    "w-full rounded-[1.28rem] shadow-md overflow-hidden bg-white mx-auto",
    disabled ? "opacity-90" : ""
  ].join(" ").trim()}"><div class="w-full aspect-square">${worker.avatar ? `<img class="pointer-events-none w-full h-full md:w-[350px] md:h-[350px]"${add_attribute("src", worker.avatar, 0)}${add_attribute("alt", worker.name, 0)}>` : `${validate_component(PlaceholderAvatar, "PlaceholderAvatar").$$render($$result, { name: worker.name, shape: "square" }, {}, {})}`}</div> <div class="flex flex-col p-4 md:p-6 gap-1"><div class="flex flex-row justify-between px-2"><h3 class="text-[1.38rem] font-bold">${escape(worker.name)}</h3> ${status !== "unavailable" ? `<p class="text-[1.38rem] font-bold">${escape(displayWaitingTime(next))}</p>` : ``}</div> <div class="flex flex-row justify-between text-sm text-gray-600 font-semibold px-2"><div class="font-semibold flex flex-row items-center gap-1.5 md:text-md"><div class="${"min-w-4 w-4 h-4 aspect-square rounded-full " + escape(
    isPinkThemeAndWaiting ? "bg-pink" : proBackgroundColorByFormatedStatus[status],
    true
  )}"></div> ${status === "unavailable" || nextAvailableTime == null ? `<p class="text-[#DFE5E7]">${escape(unavailableShort())}</p>` : `${status == "available" ? `<p class="text-[#00D4AA]">${escape(availableNow())}</p>` : `${status == "waiting" ? `<p${add_attribute("class", isPinkThemeAndWaiting ? "text-pink" : "text-[#0073FF]", 0)}>${escape(peopleInQueue({
    number: worker.nextAvailable?.ticketBefore || 0
  }))}</p>` : ``}`}`}</div> ${status === "waiting" ? `<p class="">${escape(displayDuration(duration))}</p>` : ``}</div> ${validate_component(Button, "Button").$$render(
    $$result,
    {
      href,
      class: "hover:scale-[0.96] w-full mt-4 " + (disabled ? "opacity-20 cursor-not-allowed" : "") + " " + background
    },
    {},
    {
      default: () => {
        return `${escape(/* @__PURE__ */ bookWith({ name: worker.name }))}`;
      }
    }
  )}</div></div>`;
});
const ProfessionalCarousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let background;
  let { workers } = $$props;
  let { locationSlug } = $$props;
  let { theme } = $$props;
  let api;
  let count = 0;
  let current = 0;
  if ($$props.workers === void 0 && $$bindings.workers && workers !== void 0) $$bindings.workers(workers);
  if ($$props.locationSlug === void 0 && $$bindings.locationSlug && locationSlug !== void 0) $$bindings.locationSlug(locationSlug);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (api) {
        count = api.scrollSnapList().length;
        current = api.selectedScrollSnap() + 1;
        api.on("select", () => {
          current = api.selectedScrollSnap() + 1;
        });
      }
    }
    background = backgroundColorByTheme[theme];
    $$rendered = `<div class="flex flex-col items-center w-full"><h2 class="font-bold text-lg md:text-2xl w-full tex-left mt-8">${escape(/* @__PURE__ */ teamAtYourService())}</h2> ${validate_component(Carousel, "Carousel.Root").$$render(
      $$result,
      { class: "max-w-full", api },
      {
        api: ($$value) => {
          api = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, { class: "py-4 pb-4" }, {}, {
            default: () => {
              return `${each(workers, (worker) => {
                return `${validate_component(Carousel_item, "Carousel.Item").$$render($$result, { class: "md:basis-auto" }, {}, {
                  default: () => {
                    return `${validate_component(ProfessionalCard, "ProfessionalCard").$$render(
                      $$result,
                      {
                        worker,
                        href: "/" + locationSlug + "/services/?workerFilter=" + worker.id,
                        background,
                        theme
                      },
                      {},
                      {}
                    )} `;
                  }
                })}`;
              })}`;
            }
          })}`;
        }
      }
    )} ${api ? `<div class="flex flex-row gap-4"><div class="flex items-center gap-1.5">${each(Array.from({ length: count }), (_, i) => {
      return `<button class="${"rounded-full " + escape(
        i + 1 === current ? `w-3 ${background}` : "w-3 bg-muted-foreground/25",
        true
      ) + " h-3"}"></button>`;
    })}</div></div>` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const CalendarIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.91992 1.72766V5.18248" stroke="white" stroke-width="1.72741" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.8242 1.72766V5.18248" stroke="white" stroke-width="1.72741" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.413 3.45447H4.32116C3.36714 3.45447 2.59375 4.22786 2.59375 5.18188V17.2738C2.59375 18.2278 3.36714 19.0012 4.32116 19.0012H16.413C17.3671 19.0012 18.1404 18.2278 18.1404 17.2738V5.18188C18.1404 4.22786 17.3671 3.45447 16.413 3.45447Z" stroke="white" stroke-width="1.72741" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.59375 8.63684H18.1404" stroke="white" stroke-width="1.72741" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
});
const FlashIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7484 1.54385L4.49023 14.2222H10.4785L9.00437 22.3265C9.00156 22.3424 9.00228 22.3587 9.00647 22.3743C9.01066 22.3899 9.01821 22.4044 9.02861 22.4167C9.039 22.4291 9.05198 22.439 9.06662 22.4458C9.08127 22.4526 9.09723 22.4561 9.11337 22.4561C9.13055 22.456 9.14749 22.452 9.16284 22.4443C9.17819 22.4366 9.19153 22.4254 9.2018 22.4116L19.4609 9.73096H13.4727L14.9538 1.62573C14.9558 1.60958 14.9543 1.59319 14.9495 1.57765C14.9447 1.56212 14.9366 1.54779 14.9258 1.53562C14.915 1.52345 14.9017 1.51372 14.8869 1.50707C14.872 1.50042 14.8559 1.49701 14.8397 1.49707C14.8219 1.49714 14.8043 1.50142 14.7885 1.50954C14.7726 1.51767 14.7589 1.52943 14.7484 1.54385Z" stroke="white" stroke-width="1.49707" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
});
const Chevron_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const External_link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M15 3h6v6" }],
    ["path", { "d": "M10 14 21 3" }],
    [
      "path",
      {
        "d": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "external-link" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ActionButtons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isDisabledProButton;
  let isHiddenProButton;
  let { locationSlug } = $$props;
  let { location: location2 } = $$props;
  let { locationStatus } = $$props;
  let { theme } = $$props;
  let { workers } = $$props;
  const secondaryBackgroundColorByTheme = {
    NEUTRAL: "bg-[#616163] bg-opacity-20",
    PINK: "bg-pale-pink",
    CARDEN: "bg-pale-blue"
  };
  const backgroundBadgeColorByTheme = {
    NEUTRAL: "bg-[#DFE5E7]",
    PINK: "bg-pale-pink",
    CARDEN: "bg-pale-blue"
  };
  const textColorByTheme = {
    NEUTRAL: "text-black",
    PINK: "text-pink",
    CARDEN: "text-blue"
  };
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.locationSlug === void 0 && $$bindings.locationSlug && locationSlug !== void 0) $$bindings.locationSlug(locationSlug);
  if ($$props.location === void 0 && $$bindings.location && location2 !== void 0) $$bindings.location(location2);
  if ($$props.locationStatus === void 0 && $$bindings.locationStatus && locationStatus !== void 0) $$bindings.locationStatus(locationStatus);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  if ($$props.workers === void 0 && $$bindings.workers && workers !== void 0) $$bindings.workers(workers);
  isDisabledProButton = locationStatus !== "open";
  isHiddenProButton = locationStatus === "closed" && location2?.externalCalendarLink;
  return `<div class="flex flex-col gap-4 md:py-4 w-full"><button ${isDisabledProButton ? "disabled" : ""} class="${["disabled:opacity-30 bg-white", isHiddenProButton ? "hidden" : ""].join(" ").trim()}"><a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/${locationSlug}/professional`, void 0), 0)} class="w-full p-2.5 flex flex-col px-4 rounded-xl border border-[#E5E7EB] bg-transparent text-primary shadow-sm">${validate_component(BadgeTarifMode, "BadgeTarifMode").$$render($$result, {}, {}, {})} <div class="w-full gap-2 flex items-center justify-between"><div class="flex flex-col"><div class="flex items-center gap-3"><div class="${"min-w-10 w-10 h-10 " + escape(backgroundColorByTheme[theme], true) + " rounded-xl flex justify-center items-center"}">${validate_component(FlashIcon, "FlashIcon").$$render($$result, {}, {}, {})}</div> <div class="flex flex-col justify-start items-start self-start text-left"><p class="text-lg font-bold">${escape(/* @__PURE__ */ comToday())}</p> <p class="text-xs font-normal">${escape(lastMinute())}</p></div></div></div> <div class="${"flex items-center justify-center " + escape(backgroundBadgeColorByTheme[theme], true) + " rounded-full bg-opacity-20 min-w-10 w-10 h-10"}">${validate_component(Chevron_right, "ChevronRight").$$render($$result, { size: 18, class: textColorByTheme[theme] }, {}, {})}</div></div></a></button> ${location2?.externalCalendarLink ? `<button class="bg-white"><a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(location2.externalCalendarLink, void 0), 0)} class="w-full gap-2 flex items-center p-2.5 justify-between px-4 rounded-xl border border-[#E5E7EB] bg-transparent text-primary shadow-sm relative"><div class="flex items-center gap-3"><div class="${"min-w-10 w-10 h-10 " + escape(
    isHiddenProButton || isDisabledProButton ? backgroundColorByTheme[theme] : `${secondaryBackgroundColorByTheme[theme]}`,
    true
  ) + " rounded-xl flex justify-center items-center"}">${validate_component(CalendarIcon, "CalendarIcon").$$render($$result, {}, {}, {})}</div> <div class="flex flex-col justify-start items-start self-start text-left"><div class="flex gap-2 items-center"><span class="text-lg font-bold">${escape(/* @__PURE__ */ scheduleVisit())}</span> ${location2.overpriceExternalCalendar ? `<div class="bg-black rounded-xl px-1.5 text-white whitespace-nowrap max-h-[18px] py-1.5 h-full flex justify-center items-center text-xs font-bold">+ ${escape(location2.overpriceExternalCalendar)}€</div>` : ``}</div> <span class="text-xs font-normal">${escape(/* @__PURE__ */ scheduleVisitDescription())}</span></div></div> <div class="${"flex items-center justify-center " + escape(backgroundBadgeColorByTheme[theme], true) + " rounded-full bg-opacity-20 min-w-10 w-10 h-10"}">${validate_component(External_link, "ExternalLink").$$render($$result, { size: 18, class: textColorByTheme[theme] }, {}, {})}</div></a></button>` : ``}</div>`;
});
const AvaibilityTextCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { theme } = $$props;
  let { locationStatus } = $$props;
  let { externalCalendarLink } = $$props;
  const backgroundColorByTheme2 = {
    NEUTRAL: "bg-[#DFE5E7]",
    PINK: "bg-[#E5CEF7]",
    CARDEN: "bg-[#C7E0FF]"
  };
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  if ($$props.locationStatus === void 0 && $$bindings.locationStatus && locationStatus !== void 0) $$bindings.locationStatus(locationStatus);
  if ($$props.externalCalendarLink === void 0 && $$bindings.externalCalendarLink && externalCalendarLink !== void 0) $$bindings.externalCalendarLink(externalCalendarLink);
  return `<div class="${"mx-4 md:hidden mt-4 bg-opacity-30 rounded-[12px] " + escape(backgroundColorByTheme2[theme], true)}"><p class="text-sm font-normal text-[#616163] p-3">${locationStatus === "closed" ? `${externalCalendarLink ? `${escape(/* @__PURE__ */ avaibilityTextCloseWithExternalLink())}` : `${escape(/* @__PURE__ */ avaibilityTextCloseWithoutExternalLink())}`}` : `${locationStatus === "full" ? `${externalCalendarLink ? `${escape(/* @__PURE__ */ avaibilityTextFullWithExternalLink())}` : `${escape(/* @__PURE__ */ avaibilityTextFullWithoutExternalLink())}`}` : `${locationStatus === "open" ? `${escape(/* @__PURE__ */ avaibilityTextOpen())} 😉` : ``}`}`}</p></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let theme;
  let now;
  let start;
  let workers;
  let locationStatus;
  let headerCover;
  let fullAddress;
  let $page, $$unsubscribe_page;
  let $locationResponseApi, $$unsubscribe_locationResponseApi;
  let $clock, $$unsubscribe_clock;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_locationResponseApi = subscribe(location, (value) => $locationResponseApi = value);
  $$unsubscribe_clock = subscribe(clock, (value) => $clock = value);
  const locationSlug = $page.params.locationSlug;
  let location$1 = $locationResponseApi.location;
  location$1 = $locationResponseApi.location;
  theme = location$1.theme;
  now = new Date($clock);
  start = new Date(now.getTime() + 5 * 60 * 1e3);
  workers = computeQueue($locationResponseApi, now, start);
  locationStatus = getLocationStatus(workers);
  headerCover = location$1.banner ?? "/location-cover.webp";
  fullAddress = `${location$1.address}, ${location$1.zipCode}
        ${location$1.city}`;
  $$unsubscribe_page();
  $$unsubscribe_locationResponseApi();
  $$unsubscribe_clock();
  return `<div class="w-full">${validate_component(LocationHeader, "LocationHeader").$$render(
    $$result,
    {
      location: location$1,
      locationStatus,
      headerCover,
      theme,
      fullAddress
    },
    {},
    {}
  )} <div class="w-full flex flex-col md:px-12 lg:pr-[33%]"><div class="flex gap-8 px-6 py-2 overflow-x-auto">${each(workers, (w) => {
    return `${validate_component(WorkerAvatar, "WorkerAvatar").$$render($$result, { queue: w, theme }, {}, {})}`;
  })}</div> ${validate_component(AvaibilityTextCard, "AvaibilityTextCard").$$render(
    $$result,
    {
      theme,
      externalCalendarLink: location$1.externalCalendarLink,
      locationStatus
    },
    {},
    {}
  )} <div class="lg:absolute lg:right-0 lg:h-[169.8%] lg:w-1/3 px-4"><div class="w-full flex flex-col items-center py-6 px-0 gap-6 lg:border lg:rounded-3xl lg:shadow-xl lg:py-8 lg:px-8 lg:sticky lg:top-10"><img${add_attribute("src", location$1.avatar, 0)} alt="logo" class="hidden lg:inline-block w-28 h-28 rounded-full"> <h2 class="hidden lg:inline-block font-bold text-[1.125rem] md:text-[1.75rem]">${escape(location$1.name)}</h2> ${validate_component(ActionButtons, "ActionButtons").$$render(
    $$result,
    {
      locationSlug,
      location: location$1,
      locationStatus,
      theme,
      workers
    },
    {},
    {}
  )} ${validate_component(ExternalLinks, "ExternalLinks").$$render($$result, { location: location$1, mode: "desktop" }, {}, {})}</div></div> ${validate_component(ExternalLinks, "ExternalLinks").$$render($$result, { location: location$1, mode: "mobile" }, {}, {})} <div class="px-4">${validate_component(LocationSection, "LocationSection").$$render($$result, { fullAddress, location: location$1 }, {}, {})} ${validate_component(ProfessionalCarousel, "ProfessionalCarousel").$$render($$result, { workers, locationSlug, theme }, {}, {})}</div></div></div> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

import { s as subscribe } from "../../../../../chunks/utils.js";
import { c as create_ssr_component, e as escape, a as add_attribute, v as validate_component, m as missing_component } from "../../../../../chunks/ssr.js";
import { L as Lightning } from "../../../../../chunks/Lightning.js";
import { l as languageTag } from "../../../../../chunks/runtime.js";
import { l as lastMinute } from "../../../../../chunks/lastMinute.js";
import { g as getTranslationFunctions } from "../../../../../chunks/index3.js";
import { B as BookingHeader } from "../../../../../chunks/BookingHeader.js";
import { p as page } from "../../../../../chunks/stores.js";
const appointmentType$a = /* @__NO_SIDE_EFFECTS__ */ () => `Votre prise en charge`;
const appointmentType$9 = /* @__NO_SIDE_EFFECTS__ */ () => `موعدك`;
const appointmentType$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Your appointment`;
const appointmentType$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Su cita`;
const appointmentType$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आपका अपॉइंटमेंट`;
const appointmentType$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Il tuo appuntamento`;
const appointmentType$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Jouw afspraak`;
const appointmentType$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Seu compromisso`;
const appointmentType$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Ваша встреча`;
const appointmentType$1 = /* @__NO_SIDE_EFFECTS__ */ () => `您的预约`;
const appointmentType = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: appointmentType$9,
    en: appointmentType$8,
    es: appointmentType$7,
    fr: appointmentType$a,
    hi: appointmentType$6,
    it: appointmentType$5,
    nl: appointmentType$4,
    pt: appointmentType$3,
    ru: appointmentType$2,
    zh: appointmentType$1
  }[options.languageTag ?? languageTag()]();
};
const withoutAppointment$a = /* @__NO_SIDE_EFFECTS__ */ () => `Sans rendez-vous`;
const withoutAppointment$9 = /* @__NO_SIDE_EFFECTS__ */ () => `بدون موعد`;
const withoutAppointment$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Without appointment`;
const withoutAppointment$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Sin cita previa`;
const withoutAppointment$6 = /* @__NO_SIDE_EFFECTS__ */ () => `बिना अपॉइंटमेंट के`;
const withoutAppointment$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Senza appuntamento`;
const withoutAppointment$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Zonder afspraak`;
const withoutAppointment$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Sem hora marcada`;
const withoutAppointment$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Без предварительной записи`;
const withoutAppointment$1 = /* @__NO_SIDE_EFFECTS__ */ () => `无需预约`;
const withoutAppointment = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: withoutAppointment$9,
    en: withoutAppointment$8,
    es: withoutAppointment$7,
    fr: withoutAppointment$a,
    hi: withoutAppointment$6,
    it: withoutAppointment$5,
    nl: withoutAppointment$4,
    pt: withoutAppointment$3,
    ru: withoutAppointment$2,
    zh: withoutAppointment$1
  }[options.languageTag ?? languageTag()]();
};
const withoutAppointmentDescription$a = /* @__NO_SIDE_EFFECTS__ */ () => `Venez aujourd’hui en prenant la prochaine place disponible dans la file d’attente du professionnel de votre choix.`;
const withoutAppointmentDescription$9 = /* @__NO_SIDE_EFFECTS__ */ () => `تعال اليوم واحصل على المكان التالي المتاح في قائمة الانتظار للمحترف الذي تختاره.`;
const withoutAppointmentDescription$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Come today by taking the next available spot in the queue of the professional of your choice.`;
const withoutAppointmentDescription$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Ven hoy ocupando el siguiente lugar disponible en la cola del profesional de tu elección.`;
const withoutAppointmentDescription$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आज ही अपनी पसंद के पेशेवर की कतार में अगला उपलब्ध स्थान लेकर आइये।`;
const withoutAppointmentDescription$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Vieni oggi occupando il prossimo posto disponibile nella coda del professionista di tua scelta.`;
const withoutAppointmentDescription$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Kom vandaag nog door de eerstvolgende beschikbare plek in de wachtrij van de professional van uw keuze in te nemen.`;
const withoutAppointmentDescription$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Venha hoje mesmo ocupando a próxima vaga disponível na fila do profissional de sua preferência.`;
const withoutAppointmentDescription$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Приходите сегодня, заняв следующее свободное место в очереди к выбранному вами профессионалу.`;
const withoutAppointmentDescription$1 = /* @__NO_SIDE_EFFECTS__ */ () => `今天就来吧，在您选择的专业人士的队列中占据下一个可用位置。`;
const withoutAppointmentDescription = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: withoutAppointmentDescription$9,
    en: withoutAppointmentDescription$8,
    es: withoutAppointmentDescription$7,
    fr: withoutAppointmentDescription$a,
    hi: withoutAppointmentDescription$6,
    it: withoutAppointmentDescription$5,
    nl: withoutAppointmentDescription$4,
    pt: withoutAppointmentDescription$3,
    ru: withoutAppointmentDescription$2,
    zh: withoutAppointmentDescription$1
  }[options.languageTag ?? languageTag()]();
};
const withoutAppointmentDescription2$a = /* @__NO_SIDE_EFFECTS__ */ () => `Votre horaire est donné à titre indicatif pour améliorer votre confort, il est succeptible d’être modifié.`;
const withoutAppointmentDescription2$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يتم إعطاء الجدول الزمني الخاص بك كمؤشر لتحسين راحتك، وهو عرضة للتغيير.`;
const withoutAppointmentDescription2$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Your schedule is given as an indication to improve your comfort, it is subject to change.`;
const withoutAppointmentDescription2$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Su horario se da como indicación para mejorar su comodidad, está sujeto a cambios.`;
const withoutAppointmentDescription2$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आपका शेड्यूल आपके आराम को बेहतर बनाने के संकेत के रूप में दिया गया है, यह परिवर्तन के अधीन है।`;
const withoutAppointmentDescription2$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Il tuo programma è fornito a titolo indicativo per migliorare il tuo comfort, è soggetto a modifiche.`;
const withoutAppointmentDescription2$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Uw schema wordt gegeven ter indicatie om uw comfort te verbeteren en is onder voorbehoud.`;
const withoutAppointmentDescription2$3 = /* @__NO_SIDE_EFFECTS__ */ () => `O seu horário é dado como indicação para melhorar o seu conforto, está sujeito a alterações.`;
const withoutAppointmentDescription2$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Ваше расписание приведено в качестве ориентира для повышения вашего комфорта; оно может быть изменено.`;
const withoutAppointmentDescription2$1 = /* @__NO_SIDE_EFFECTS__ */ () => `您的日程安排仅作为指示以提高您的舒适度，但可能会发生变化。`;
const withoutAppointmentDescription2 = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: withoutAppointmentDescription2$9,
    en: withoutAppointmentDescription2$8,
    es: withoutAppointmentDescription2$7,
    fr: withoutAppointmentDescription2$a,
    hi: withoutAppointmentDescription2$6,
    it: withoutAppointmentDescription2$5,
    nl: withoutAppointmentDescription2$4,
    pt: withoutAppointmentDescription2$3,
    ru: withoutAppointmentDescription2$2,
    zh: withoutAppointmentDescription2$1
  }[options.languageTag ?? languageTag()]();
};
const withAppointment$a = /* @__NO_SIDE_EFFECTS__ */ () => `Rendez-vous`;
const withAppointment$9 = /* @__NO_SIDE_EFFECTS__ */ () => `ميعاد`;
const withAppointment$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Appointment`;
const withAppointment$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Cita`;
const withAppointment$6 = /* @__NO_SIDE_EFFECTS__ */ () => `नियुक्ति`;
const withAppointment$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Appuntamento`;
const withAppointment$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Afspraak`;
const withAppointment$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Encontro`;
const withAppointment$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Встреча`;
const withAppointment$1 = /* @__NO_SIDE_EFFECTS__ */ () => `预约`;
const withAppointment = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: withAppointment$9,
    en: withAppointment$8,
    es: withAppointment$7,
    fr: withAppointment$a,
    hi: withAppointment$6,
    it: withAppointment$5,
    nl: withAppointment$4,
    pt: withAppointment$3,
    ru: withAppointment$2,
    zh: withAppointment$1
  }[options.languageTag ?? languageTag()]();
};
const withAppointmentDescription$a = /* @__NO_SIDE_EFFECTS__ */ () => `Choisissez le jour et l’horaire qui vous convient le mieux pour votre rendez-vous.`;
const withAppointmentDescription$9 = /* @__NO_SIDE_EFFECTS__ */ () => `اختر اليوم والوقت الذي يناسبك لموعدك.`;
const withAppointmentDescription$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Choose the day and time that suits you best for your appointment.`;
const withAppointmentDescription$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Elige el día y hora que más te convenga para tu cita.`;
const withAppointmentDescription$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अपनी नियुक्ति के लिए वह दिन और समय चुनें जो आपको सबसे उपयुक्त लगे।`;
const withAppointmentDescription$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Scegli il giorno e l'orario più adatto a te per il tuo appuntamento.`;
const withAppointmentDescription$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Kies de dag en tijd die u het beste uitkomt voor uw afspraak.`;
const withAppointmentDescription$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Escolha o dia e horário que melhor lhe convier para a sua consulta.`;
const withAppointmentDescription$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Выберите день и время, которые подходят вам лучше всего для встречи.`;
const withAppointmentDescription$1 = /* @__NO_SIDE_EFFECTS__ */ () => `选择最适合您预约的日期和时间。`;
const withAppointmentDescription = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: withAppointmentDescription$9,
    en: withAppointmentDescription$8,
    es: withAppointmentDescription$7,
    fr: withAppointmentDescription$a,
    hi: withAppointmentDescription$6,
    it: withAppointmentDescription$5,
    nl: withAppointmentDescription$4,
    pt: withAppointmentDescription$3,
    ru: withAppointmentDescription$2,
    zh: withAppointmentDescription$1
  }[options.languageTag ?? languageTag()]();
};
const withAppointmentDescription2$a = /* @__NO_SIDE_EFFECTS__ */ () => `Le professionnel fera son maximum pour respecter votre horaire de passage.`;
const withAppointmentDescription2$9 = /* @__NO_SIDE_EFFECTS__ */ () => `سيبذل المحترف قصارى جهده لاحترام الوقت المحدد لك.`;
const withAppointmentDescription2$8 = /* @__NO_SIDE_EFFECTS__ */ () => `The professional will do their best to respect your scheduled time.`;
const withAppointmentDescription2$7 = /* @__NO_SIDE_EFFECTS__ */ () => `El profesional hará todo lo posible para respetar su horario programado.`;
const withAppointmentDescription2$6 = /* @__NO_SIDE_EFFECTS__ */ () => `पेशेवर आपके निर्धारित समय का सम्मान करने की पूरी कोशिश करेंगे।`;
const withAppointmentDescription2$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Il professionista farà del suo meglio per rispettare l'orario previsto.`;
const withAppointmentDescription2$4 = /* @__NO_SIDE_EFFECTS__ */ () => `De professional zal zijn best doen om uw geplande tijd te respecteren.`;
const withAppointmentDescription2$3 = /* @__NO_SIDE_EFFECTS__ */ () => `O profissional fará o possível para respeitar o horário agendado.`;
const withAppointmentDescription2$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Профессионал сделает все возможное, чтобы уважать ваше запланированное время.`;
const withAppointmentDescription2$1 = /* @__NO_SIDE_EFFECTS__ */ () => `专业人员将尽力尊重您的预定时间。`;
const withAppointmentDescription2 = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: withAppointmentDescription2$9,
    en: withAppointmentDescription2$8,
    es: withAppointmentDescription2$7,
    fr: withAppointmentDescription2$a,
    hi: withAppointmentDescription2$6,
    it: withAppointmentDescription2$5,
    nl: withAppointmentDescription2$4,
    pt: withAppointmentDescription2$3,
    ru: withAppointmentDescription2$2,
    zh: withAppointmentDescription2$1
  }[options.languageTag ?? languageTag()]();
};
const comfort$a = /* @__NO_SIDE_EFFECTS__ */ () => `Comfort`;
const comfort$9 = /* @__NO_SIDE_EFFECTS__ */ () => `راحة`;
const comfort$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Comfort`;
const comfort$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Comodidad`;
const comfort$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आराम`;
const comfort$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Comfort`;
const comfort$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Comfort`;
const comfort$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Conforto`;
const comfort$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Комфорт`;
const comfort$1 = /* @__NO_SIDE_EFFECTS__ */ () => `舒适`;
const comfort = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: comfort$9,
    en: comfort$8,
    es: comfort$7,
    fr: comfort$a,
    hi: comfort$6,
    it: comfort$5,
    nl: comfort$4,
    pt: comfort$3,
    ru: comfort$2,
    zh: comfort$1
  }[options.languageTag ?? languageTag()]();
};
const CalenderIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { style = "" } = $$props;
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  return `<svg class="${"stroke-current " + escape(style, true)}" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.59082 20.7271H6.59082C5.52995 20.7271 4.51254 20.3056 3.76239 19.5555C3.01225 18.8053 2.59082 17.7879 2.59082 16.7271V7.72705C2.59082 6.66618 3.01225 5.64877 3.76239 4.89862C4.51254 4.14848 5.52995 3.72705 6.59082 3.72705H17.5908C18.6517 3.72705 19.6691 4.14848 20.4192 4.89862C21.1694 5.64877 21.5908 6.66618 21.5908 7.72705V10.7271M8.59082 2.72705V4.72705M15.5908 2.72705V4.72705M2.59082 8.72705H21.5908M19.0908 16.3701L17.5908 17.8701" stroke-width="1.82954" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5908 22.727C20.3522 22.727 22.5908 20.4885 22.5908 17.7271C22.5908 14.9656 20.3522 12.7271 17.5908 12.7271C14.8294 12.7271 12.5908 14.9656 12.5908 17.7271C12.5908 20.4885 14.8294 22.727 17.5908 22.727Z" stroke-width="1.82954" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
});
const SuccessIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg class="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.00016 14.6667C4.31816 14.6667 1.3335 11.682 1.3335 8C1.3335 4.318 4.31816 1.33333 8.00016 1.33333C11.6822 1.33333 14.6668 4.318 14.6668 8C14.6668 11.682 11.6822 14.6667 8.00016 14.6667ZM7.3355 10.6667L12.0488 5.95266L11.1062 5.00999L7.3355 8.78133L5.4495 6.89533L4.50683 7.838L7.3355 10.6667Z"></path></svg>`;
});
const AppointmentTypeCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { index } = $$props;
  let { icon } = $$props;
  let { title } = $$props;
  let { text1 } = $$props;
  let { text2 } = $$props;
  let { badge } = $$props;
  let { href } = $$props;
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.text1 === void 0 && $$bindings.text1 && text1 !== void 0) $$bindings.text1(text1);
  if ($$props.text2 === void 0 && $$bindings.text2 && text2 !== void 0) $$bindings.text2(text2);
  if ($$props.badge === void 0 && $$bindings.badge && badge !== void 0) $$bindings.badge(badge);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  return `<a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(href, void 0), 0)} class="border bg-white rounded-xl p-4 md:p-6 flex flex-col gap-2 flex-1 items-start relative transition-all duration-300 ease-in-out hover:shadow-xl text-left"><h3 class="flex flex-row gap-2 font-bold text-lg text-left">${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})} ${escape(title)}</h3> <p class="tile-subtitle">${escape(text1)}</p> <p class="tile-subtitle">${escape(text2)}</p> <div class="flex-1"></div> <div class="bg-[#23BBAC] text-primary-foreground text-sm font-semibold p-1 px-2 rounded-md ml-auto flex flex-row items-center gap-1">${validate_component(SuccessIcon, "SuccessIcon").$$render($$result, {}, {}, {})} <p class="mb-[0.1rem]">${escape(badge)}</p></div></a>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let waitlist = new URL(`schedule`, $page.url);
  for (let [k, v] of $page.url.searchParams) {
    waitlist.searchParams.set(k, v);
  }
  waitlist.searchParams.set("mode", "waitlist");
  let appointment = new URL(`schedule`, $page.url);
  for (let [k, v] of $page.url.searchParams) {
    appointment.searchParams.set(k, v);
  }
  appointment.searchParams.set("mode", "appointment");
  $$unsubscribe_page();
  return `<main class="w-full flex flex-col md:items-start gap-6">${validate_component(BookingHeader, "BookingHeader").$$render($$result, { text: /* @__PURE__ */ appointmentType() }, {}, {})} <div class="flex flex-col lg:flex-row gap-4 md:mt-0 px-4">${validate_component(AppointmentTypeCard, "AppointmentTypeCard").$$render(
    $$result,
    {
      index: 0,
      icon: Lightning,
      title: /* @__PURE__ */ withoutAppointment(),
      text1: /* @__PURE__ */ withoutAppointmentDescription(),
      text2: /* @__PURE__ */ withoutAppointmentDescription2(),
      badge: lastMinute(),
      href: waitlist.toString()
    },
    {},
    {}
  )} ${validate_component(AppointmentTypeCard, "AppointmentTypeCard").$$render(
    $$result,
    {
      index: 1,
      icon: CalenderIcon,
      title: /* @__PURE__ */ withAppointment(),
      text1: /* @__PURE__ */ withAppointmentDescription(),
      text2: /* @__PURE__ */ withAppointmentDescription2(),
      badge: /* @__PURE__ */ comfort(),
      href: appointment.toString()
    },
    {},
    {}
  )}</div></main>`;
});
export {
  Page as default
};

import { c as create_ssr_component, f as spread, h as escape_object, a as add_attribute, v as validate_component, e as escape, b as createEventDispatcher, i as escape_attribute_value } from "../../../../../chunks/ssr.js";
import { c as compute_rest_props, s as subscribe } from "../../../../../chunks/utils.js";
import { B as Button } from "../../../../../chunks/button.js";
import { d as displayPriceInDollars } from "../../../../../chunks/formater.js";
import "@stripe/stripe-js";
import "dequal";
import "../../../../../chunks/create.js";
import { g as getCtx, b as getCtx$1, I as Info, T as Trending_up, a as Tag, W as Wallet, D as Drawer, c as Drawer_content, P as Popup } from "../../../../../chunks/Popup.js";
import "clsx";
import { P as PlaceholderAvatar } from "../../../../../chunks/PlaceholderAvatar.js";
import { a as anyProfessional } from "../../../../../chunks/anyProfessional.js";
import { l as languageTag } from "../../../../../chunks/runtime.js";
import { s as shopStore } from "../../../../../chunks/basketStore.js";
import { l as location } from "../../../../../chunks/location.store.js";
import { B as BookingHeader } from "../../../../../chunks/BookingHeader.js";
import { g as getTranslationFunctions } from "../../../../../chunks/index3.js";
import "../../../../../chunks/stores.js";
import { c as createDispatcher } from "../../../../../chunks/events.js";
import { c as clock } from "../../../../../chunks/clock.svelte.js";
import { getExampleNumber, AsYouType, getCountryCallingCode, Metadata, parsePhoneNumberWithError, ParseError } from "libphonenumber-js/max";
import { n as nextAvailableTime } from "../../../../../chunks/QueueLine.js";
import { C as Clock_3, S as Store, D as Dock } from "../../../../../chunks/store.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
const Dialog_close = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $close, $$unsubscribe_close;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { close }, getAttrs } = getCtx();
  $$unsubscribe_close = subscribe(close, (value) => $close = value);
  createDispatcher();
  const attrs = getAttrs("close");
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $close;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_close();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread(
    [
      escape_object(paraglide_sveltekit_translate_attribute_pass_handle_attributes(
        {
          ...builder,
          "type": `button`,
          ...$$restProps
        },
        [{ attribute_name: "formaction" }]
      ))
    ],
    {}
  )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const yourSelection$a = /* @__NO_SIDE_EFFECTS__ */ () => `Votre sélection`;
const yourSelection$9 = /* @__NO_SIDE_EFFECTS__ */ () => `اختيارك`;
const yourSelection$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Your selection`;
const yourSelection$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Tu seleccion`;
const yourSelection$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आपका चयन`;
const yourSelection$5 = /* @__NO_SIDE_EFFECTS__ */ () => `La tua selezione`;
const yourSelection$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Jouw selectie`;
const yourSelection$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Sua seleção`;
const yourSelection$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Ваш выбор`;
const yourSelection$1 = /* @__NO_SIDE_EFFECTS__ */ () => `您的选择`;
const yourSelection = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: yourSelection$9,
    en: yourSelection$8,
    es: yourSelection$7,
    fr: yourSelection$a,
    hi: yourSelection$6,
    it: yourSelection$5,
    nl: yourSelection$4,
    pt: yourSelection$3,
    ru: yourSelection$2,
    zh: yourSelection$1
  }[options.languageTag ?? languageTag()]();
};
const confirmBooking$a = /* @__NO_SIDE_EFFECTS__ */ () => `Confirmer la réservation`;
const confirmBooking$9 = /* @__NO_SIDE_EFFECTS__ */ () => `تأكيد الحجز`;
const confirmBooking$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Confirm booking`;
const confirmBooking$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Reserva confirmada`;
const confirmBooking$6 = /* @__NO_SIDE_EFFECTS__ */ () => `बुकिंग की पुष्टि करें`;
const confirmBooking$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Conferma la prenotazione`;
const confirmBooking$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Bevestig boeking`;
const confirmBooking$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Confirmar reserva`;
const confirmBooking$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Подтвердить бронирование`;
const confirmBooking$1 = /* @__NO_SIDE_EFFECTS__ */ () => `确认预订`;
const confirmBooking = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: confirmBooking$9,
    en: confirmBooking$8,
    es: confirmBooking$7,
    fr: confirmBooking$a,
    hi: confirmBooking$6,
    it: confirmBooking$5,
    nl: confirmBooking$4,
    pt: confirmBooking$3,
    ru: confirmBooking$2,
    zh: confirmBooking$1
  }[options.languageTag ?? languageTag()]();
};
const firstName$a = /* @__NO_SIDE_EFFECTS__ */ () => `Prénom`;
const firstName$9 = /* @__NO_SIDE_EFFECTS__ */ () => `الاسم الأول`;
const firstName$8 = /* @__NO_SIDE_EFFECTS__ */ () => `First Name`;
const firstName$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Nombre de pila`;
const firstName$6 = /* @__NO_SIDE_EFFECTS__ */ () => `पहला नाम`;
const firstName$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Nome di battesimo`;
const firstName$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Voornaam`;
const firstName$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Primeiro nome`;
const firstName$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Имя`;
const firstName$1 = /* @__NO_SIDE_EFFECTS__ */ () => `名`;
const firstName = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: firstName$9,
    en: firstName$8,
    es: firstName$7,
    fr: firstName$a,
    hi: firstName$6,
    it: firstName$5,
    nl: firstName$4,
    pt: firstName$3,
    ru: firstName$2,
    zh: firstName$1
  }[options.languageTag ?? languageTag()]();
};
const email$a = /* @__NO_SIDE_EFFECTS__ */ () => `Email`;
const email$9 = /* @__NO_SIDE_EFFECTS__ */ () => `بريد إلكتروني`;
const email$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Email`;
const email$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Correo electrónico`;
const email$6 = /* @__NO_SIDE_EFFECTS__ */ () => `ईमेल`;
const email$5 = /* @__NO_SIDE_EFFECTS__ */ () => `E-mail`;
const email$4 = /* @__NO_SIDE_EFFECTS__ */ () => `E-mail`;
const email$3 = /* @__NO_SIDE_EFFECTS__ */ () => `E-mail`;
const email$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Электронная почта`;
const email$1 = /* @__NO_SIDE_EFFECTS__ */ () => `电子邮件`;
const email = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: email$9,
    en: email$8,
    es: email$7,
    fr: email$a,
    hi: email$6,
    it: email$5,
    nl: email$4,
    pt: email$3,
    ru: email$2,
    zh: email$1
  }[options.languageTag ?? languageTag()]();
};
const phone$a = /* @__NO_SIDE_EFFECTS__ */ () => `Téléphone`;
const phone$9 = /* @__NO_SIDE_EFFECTS__ */ () => `هاتف`;
const phone$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Phone`;
const phone$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Teléfono`;
const phone$6 = /* @__NO_SIDE_EFFECTS__ */ () => `फ़ोन`;
const phone$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Telefono`;
const phone$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Telefoon`;
const phone$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Telefone`;
const phone$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Телефон`;
const phone$1 = /* @__NO_SIDE_EFFECTS__ */ () => `电话`;
const phone = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: phone$9,
    en: phone$8,
    es: phone$7,
    fr: phone$a,
    hi: phone$6,
    it: phone$5,
    nl: phone$4,
    pt: phone$3,
    ru: phone$2,
    zh: phone$1
  }[options.languageTag ?? languageTag()]();
};
const paymentOnSite$a = /* @__NO_SIDE_EFFECTS__ */ () => `Paiement sur place`;
const paymentOnSite$9 = /* @__NO_SIDE_EFFECTS__ */ () => `الدفع في الموقع`;
const paymentOnSite$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Payment on site`;
const paymentOnSite$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Pago en sitio`;
const paymentOnSite$6 = /* @__NO_SIDE_EFFECTS__ */ () => `साइट पर भुगतान`;
const paymentOnSite$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Pagamento sul posto`;
const paymentOnSite$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Betaling ter plaatse`;
const paymentOnSite$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Pagamento no local`;
const paymentOnSite$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Оплата на месте`;
const paymentOnSite$1 = /* @__NO_SIDE_EFFECTS__ */ () => `现场付款`;
const paymentOnSite = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: paymentOnSite$9,
    en: paymentOnSite$8,
    es: paymentOnSite$7,
    fr: paymentOnSite$a,
    hi: paymentOnSite$6,
    it: paymentOnSite$5,
    nl: paymentOnSite$4,
    pt: paymentOnSite$3,
    ru: paymentOnSite$2,
    zh: paymentOnSite$1
  }[options.languageTag ?? languageTag()]();
};
const total$a = /* @__NO_SIDE_EFFECTS__ */ () => `Total`;
const total$9 = /* @__NO_SIDE_EFFECTS__ */ () => `المجموع`;
const total$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Total`;
const total$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Total`;
const total$6 = /* @__NO_SIDE_EFFECTS__ */ () => `कुल`;
const total$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Totale`;
const total$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Totaal`;
const total$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Total`;
const total$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Общий`;
const total$1 = /* @__NO_SIDE_EFFECTS__ */ () => `全部的`;
const total = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: total$9,
    en: total$8,
    es: total$7,
    fr: total$a,
    hi: total$6,
    it: total$5,
    nl: total$4,
    pt: total$3,
    ru: total$2,
    zh: total$1
  }[options.languageTag ?? languageTag()]();
};
const priceIncludingVAT$a = /* @__NO_SIDE_EFFECTS__ */ () => `Prix TTC (taxes et frais inclus)`;
const priceIncludingVAT$9 = /* @__NO_SIDE_EFFECTS__ */ () => `السعر شامل ضريبة القيمة المضافة (شامل الضريبة والرسوم)`;
const priceIncludingVAT$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Price including VAT (tax and fees included)`;
const priceIncludingVAT$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Precio con IVA incluido (impuestos y tasas incluidos)`;
const priceIncludingVAT$6 = /* @__NO_SIDE_EFFECTS__ */ () => `मूल्य वैट सहित (कर और शुल्क शामिल)`;
const priceIncludingVAT$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Prezzo IVA inclusa (tasse e spese incluse)`;
const priceIncludingVAT$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Prijs inclusief BTW (belasting en kosten inbegrepen)`;
const priceIncludingVAT$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Preço incluindo IVA (impostos e taxas incluídos)`;
const priceIncludingVAT$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Цена включает НДС (включая налоги и сборы)`;
const priceIncludingVAT$1 = /* @__NO_SIDE_EFFECTS__ */ () => `含增值税价格（含税费）`;
const priceIncludingVAT = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: priceIncludingVAT$9,
    en: priceIncludingVAT$8,
    es: priceIncludingVAT$7,
    fr: priceIncludingVAT$a,
    hi: priceIncludingVAT$6,
    it: priceIncludingVAT$5,
    nl: priceIncludingVAT$4,
    pt: priceIncludingVAT$3,
    ru: priceIncludingVAT$2,
    zh: priceIncludingVAT$1
  }[options.languageTag ?? languageTag()]();
};
const makeReservation$a = /* @__NO_SIDE_EFFECTS__ */ () => `Valider la réservation`;
const makeReservation$9 = /* @__NO_SIDE_EFFECTS__ */ () => `تأكيد الحجز`;
const makeReservation$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Confirm reservation`;
const makeReservation$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Confirmar reservación`;
const makeReservation$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आरक्षण पुष्टी करना`;
const makeReservation$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Conferma la prenotazione`;
const makeReservation$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Bevestig reservering`;
const makeReservation$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Confirmar reserva`;
const makeReservation$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Подтвердить бронирование`;
const makeReservation$1 = /* @__NO_SIDE_EFFECTS__ */ () => `确认预订`;
const makeReservation = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: makeReservation$9,
    en: makeReservation$8,
    es: makeReservation$7,
    fr: makeReservation$a,
    hi: makeReservation$6,
    it: makeReservation$5,
    nl: makeReservation$4,
    pt: makeReservation$3,
    ru: makeReservation$2,
    zh: makeReservation$1
  }[options.languageTag ?? languageTag()]();
};
const today$a = /* @__NO_SIDE_EFFECTS__ */ () => `Aujourd'hui`;
const today$9 = /* @__NO_SIDE_EFFECTS__ */ () => `اليوم`;
const today$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Today`;
const today$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Hoy`;
const today$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आज`;
const today$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Oggi`;
const today$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Vandaag`;
const today$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Hoje`;
const today$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Сегодня`;
const today$1 = /* @__NO_SIDE_EFFECTS__ */ () => `今天`;
const today = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: today$9,
    en: today$8,
    es: today$7,
    fr: today$a,
    hi: today$6,
    it: today$5,
    nl: today$4,
    pt: today$3,
    ru: today$2,
    zh: today$1
  }[options.languageTag ?? languageTag()]();
};
const priceDetail$a = /* @__NO_SIDE_EFFECTS__ */ () => `Détail du prix`;
const priceDetail$9 = /* @__NO_SIDE_EFFECTS__ */ () => `تفاصيل السعر`;
const priceDetail$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Price details`;
const priceDetail$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Detalles de precios`;
const priceDetail$6 = /* @__NO_SIDE_EFFECTS__ */ () => `मूल्य विवरण`;
const priceDetail$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Dettagli del prezzo`;
const priceDetail$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Prijsdetails`;
const priceDetail$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Detalhes do preço`;
const priceDetail$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Информация о ценах`;
const priceDetail$1 = /* @__NO_SIDE_EFFECTS__ */ () => `价格详情`;
const priceDetail = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: priceDetail$9,
    en: priceDetail$8,
    es: priceDetail$7,
    fr: priceDetail$a,
    hi: priceDetail$6,
    it: priceDetail$5,
    nl: priceDetail$4,
    pt: priceDetail$3,
    ru: priceDetail$2,
    zh: priceDetail$1
  }[options.languageTag ?? languageTag()]();
};
const servicePrice$a = /* @__NO_SIDE_EFFECTS__ */ () => `Tarif de la prestation`;
const servicePrice$9 = /* @__NO_SIDE_EFFECTS__ */ () => `رسوم الخدمة`;
const servicePrice$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Service fee`;
const servicePrice$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Tarifa de servicio`;
const servicePrice$6 = /* @__NO_SIDE_EFFECTS__ */ () => `सेवा शुल्क`;
const servicePrice$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Commissione di servizio`;
const servicePrice$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Servicekosten`;
const servicePrice$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Taxa de serviço`;
const servicePrice$2 = /* @__NO_SIDE_EFFECTS__ */ () => `сервисный сбор`;
const servicePrice$1 = /* @__NO_SIDE_EFFECTS__ */ () => `服务费`;
const servicePrice = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: servicePrice$9,
    en: servicePrice$8,
    es: servicePrice$7,
    fr: servicePrice$a,
    hi: servicePrice$6,
    it: servicePrice$5,
    nl: servicePrice$4,
    pt: servicePrice$3,
    ru: servicePrice$2,
    zh: servicePrice$1
  }[options.languageTag ?? languageTag()]();
};
const surcharge$a = /* @__NO_SIDE_EFFECTS__ */ () => `Majoration`;
const surcharge$9 = /* @__NO_SIDE_EFFECTS__ */ () => `رسوم إضافية`;
const surcharge$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Surcharge`;
const surcharge$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Recargo`;
const surcharge$6 = /* @__NO_SIDE_EFFECTS__ */ () => `अधिभार`;
const surcharge$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Supplemento`;
const surcharge$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Toeslag`;
const surcharge$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Sobretaxa`;
const surcharge$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Доплата`;
const surcharge$1 = /* @__NO_SIDE_EFFECTS__ */ () => `附加费`;
const surcharge = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: surcharge$9,
    en: surcharge$8,
    es: surcharge$7,
    fr: surcharge$a,
    hi: surcharge$6,
    it: surcharge$5,
    nl: surcharge$4,
    pt: surcharge$3,
    ru: surcharge$2,
    zh: surcharge$1
  }[options.languageTag ?? languageTag()]();
};
const discount$a = /* @__NO_SIDE_EFFECTS__ */ () => `Réduction`;
const discount$9 = /* @__NO_SIDE_EFFECTS__ */ () => `تخفيض`;
const discount$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Reduction`;
const discount$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Reducción`;
const discount$6 = /* @__NO_SIDE_EFFECTS__ */ () => `कमी`;
const discount$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Riduzione`;
const discount$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Afname`;
const discount$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Redução`;
const discount$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Снижение`;
const discount$1 = /* @__NO_SIDE_EFFECTS__ */ () => `减少`;
const discount = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: discount$9,
    en: discount$8,
    es: discount$7,
    fr: discount$a,
    hi: discount$6,
    it: discount$5,
    nl: discount$4,
    pt: discount$3,
    ru: discount$2,
    zh: discount$1
  }[options.languageTag ?? languageTag()]();
};
const bookingBasketTitle$a = /* @__NO_SIDE_EFFECTS__ */ () => `Récapitulatif`;
const bookingBasketTitle$9 = /* @__NO_SIDE_EFFECTS__ */ () => `ملخص`;
const bookingBasketTitle$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Summary`;
const bookingBasketTitle$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Resumen`;
const bookingBasketTitle$6 = /* @__NO_SIDE_EFFECTS__ */ () => `सारांश`;
const bookingBasketTitle$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Riepilogo`;
const bookingBasketTitle$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Samenvatting`;
const bookingBasketTitle$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Resumo`;
const bookingBasketTitle$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Краткое содержание`;
const bookingBasketTitle$1 = /* @__NO_SIDE_EFFECTS__ */ () => `概括`;
const bookingBasketTitle = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: bookingBasketTitle$9,
    en: bookingBasketTitle$8,
    es: bookingBasketTitle$7,
    fr: bookingBasketTitle$a,
    hi: bookingBasketTitle$6,
    it: bookingBasketTitle$5,
    nl: bookingBasketTitle$4,
    pt: bookingBasketTitle$3,
    ru: bookingBasketTitle$2,
    zh: bookingBasketTitle$1
  }[options.languageTag ?? languageTag()]();
};
const acompte$a = /* @__NO_SIDE_EFFECTS__ */ () => `Accompte`;
const acompte$9 = /* @__NO_SIDE_EFFECTS__ */ () => `إيداع`;
const acompte$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Deposit`;
const acompte$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Depósito`;
const acompte$6 = /* @__NO_SIDE_EFFECTS__ */ () => `जमा`;
const acompte$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Depositare`;
const acompte$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Borg`;
const acompte$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Depósito`;
const acompte$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Вклад`;
const acompte$1 = /* @__NO_SIDE_EFFECTS__ */ () => `订金`;
const acompte = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: acompte$9,
    en: acompte$8,
    es: acompte$7,
    fr: acompte$a,
    hi: acompte$6,
    it: acompte$5,
    nl: acompte$4,
    pt: acompte$3,
    ru: acompte$2,
    zh: acompte$1
  }[options.languageTag ?? languageTag()]();
};
const frais$a = /* @__NO_SIDE_EFFECTS__ */ () => `Frais`;
const frais$9 = /* @__NO_SIDE_EFFECTS__ */ () => `التكاليف`;
const frais$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Costs`;
const frais$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Costos`;
const frais$6 = /* @__NO_SIDE_EFFECTS__ */ () => `लागत`;
const frais$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Costi`;
const frais$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Kosten`;
const frais$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Custos`;
const frais$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Расходы`;
const frais$1 = /* @__NO_SIDE_EFFECTS__ */ () => `成本`;
const frais = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: frais$9,
    en: frais$8,
    es: frais$7,
    fr: frais$a,
    hi: frais$6,
    it: frais$5,
    nl: frais$4,
    pt: frais$3,
    ru: frais$2,
    zh: frais$1
  }[options.languageTag ?? languageTag()]();
};
const remaindToPayInPlace$a = /* @__NO_SIDE_EFFECTS__ */ () => `Reste à payer sur place`;
const remaindToPayInPlace$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يجب دفع المبلغ في الموقع`;
const remaindToPayInPlace$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Payment is due on site`;
const remaindToPayInPlace$7 = /* @__NO_SIDE_EFFECTS__ */ () => `El pago se realizará en el lugar.`;
const remaindToPayInPlace$6 = /* @__NO_SIDE_EFFECTS__ */ () => `भुगतान मौके पर ही करना होगा।`;
const remaindToPayInPlace$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Il pagamento è dovuto in loco`;
const remaindToPayInPlace$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Betaling dient ter plaatse te geschieden.`;
const remaindToPayInPlace$3 = /* @__NO_SIDE_EFFECTS__ */ () => `O pagamento deverá ser efetuado no local.`;
const remaindToPayInPlace$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Оплата производится на месте.`;
const remaindToPayInPlace$1 = /* @__NO_SIDE_EFFECTS__ */ () => `现场支付。`;
const remaindToPayInPlace = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: remaindToPayInPlace$9,
    en: remaindToPayInPlace$8,
    es: remaindToPayInPlace$7,
    fr: remaindToPayInPlace$a,
    hi: remaindToPayInPlace$6,
    it: remaindToPayInPlace$5,
    nl: remaindToPayInPlace$4,
    pt: remaindToPayInPlace$3,
    ru: remaindToPayInPlace$2,
    zh: remaindToPayInPlace$1
  }[options.languageTag ?? languageTag()]();
};
const toBePaidOnline$a = /* @__NO_SIDE_EFFECTS__ */ () => `À régler en ligne`;
const toBePaidOnline$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يتم الدفع عبر الإنترنت`;
const toBePaidOnline$8 = /* @__NO_SIDE_EFFECTS__ */ () => `To be paid online`;
const toBePaidOnline$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Para pagar en línea`;
const toBePaidOnline$6 = /* @__NO_SIDE_EFFECTS__ */ () => `ऑनलाइन भुगतान किया जाएगा`;
const toBePaidOnline$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Da pagare online`;
const toBePaidOnline$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Online betaald worden`;
const toBePaidOnline$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Para receber o pagamento online`;
const toBePaidOnline$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Оплата производится онлайн.`;
const toBePaidOnline$1 = /* @__NO_SIDE_EFFECTS__ */ () => `在线支付`;
const toBePaidOnline = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: toBePaidOnline$9,
    en: toBePaidOnline$8,
    es: toBePaidOnline$7,
    fr: toBePaidOnline$a,
    hi: toBePaidOnline$6,
    it: toBePaidOnline$5,
    nl: toBePaidOnline$4,
    pt: toBePaidOnline$3,
    ru: toBePaidOnline$2,
    zh: toBePaidOnline$1
  }[options.languageTag ?? languageTag()]();
};
const toBePaidOnSite$a = /* @__NO_SIDE_EFFECTS__ */ () => `À régler sur place`;
const toBePaidOnSite$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يتم الدفع في الموقع`;
const toBePaidOnSite$8 = /* @__NO_SIDE_EFFECTS__ */ () => `To be paid on site`;
const toBePaidOnSite$7 = /* @__NO_SIDE_EFFECTS__ */ () => `A pagar en el lugar`;
const toBePaidOnSite$6 = /* @__NO_SIDE_EFFECTS__ */ () => `भुगतान मौके पर ही किया जाएगा`;
const toBePaidOnSite$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Da pagare in loco`;
const toBePaidOnSite$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Ter plaatse te betalen`;
const toBePaidOnSite$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Pagamento no local.`;
const toBePaidOnSite$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Оплата производится на месте.`;
const toBePaidOnSite$1 = /* @__NO_SIDE_EFFECTS__ */ () => `现场支付`;
const toBePaidOnSite = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: toBePaidOnSite$9,
    en: toBePaidOnSite$8,
    es: toBePaidOnSite$7,
    fr: toBePaidOnSite$a,
    hi: toBePaidOnSite$6,
    it: toBePaidOnSite$5,
    nl: toBePaidOnSite$4,
    pt: toBePaidOnSite$3,
    ru: toBePaidOnSite$2,
    zh: toBePaidOnSite$1
  }[options.languageTag ?? languageTag()]();
};
const paymentMethod$a = /* @__NO_SIDE_EFFECTS__ */ () => `Moyen de paiement`;
const paymentMethod$9 = /* @__NO_SIDE_EFFECTS__ */ () => `طريقة الدفع`;
const paymentMethod$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Payment method`;
const paymentMethod$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Método de pago`;
const paymentMethod$6 = /* @__NO_SIDE_EFFECTS__ */ () => `भुगतान विधि`;
const paymentMethod$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Metodo di pagamento`;
const paymentMethod$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Betaalmethode`;
const paymentMethod$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Método de pagamento`;
const paymentMethod$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Способ оплаты`;
const paymentMethod$1 = /* @__NO_SIDE_EFFECTS__ */ () => `付款方式`;
const paymentMethod = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: paymentMethod$9,
    en: paymentMethod$8,
    es: paymentMethod$7,
    fr: paymentMethod$a,
    hi: paymentMethod$6,
    it: paymentMethod$5,
    nl: paymentMethod$4,
    pt: paymentMethod$3,
    ru: paymentMethod$2,
    zh: paymentMethod$1
  }[options.languageTag ?? languageTag()]();
};
const onlinePayment$a = /* @__NO_SIDE_EFFECTS__ */ () => `Paiement en ligne`;
const onlinePayment$9 = /* @__NO_SIDE_EFFECTS__ */ () => `الدفع عبر الإنترنت`;
const onlinePayment$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Online payment`;
const onlinePayment$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Pago en línea`;
const onlinePayment$6 = /* @__NO_SIDE_EFFECTS__ */ () => `ऑनलाइन भुगतान`;
const onlinePayment$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Pagamento online`;
const onlinePayment$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Online betaling`;
const onlinePayment$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Pagamento online`;
const onlinePayment$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Онлайн-оплата`;
const onlinePayment$1 = /* @__NO_SIDE_EFFECTS__ */ () => `在线支付`;
const onlinePayment = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: onlinePayment$9,
    en: onlinePayment$8,
    es: onlinePayment$7,
    fr: onlinePayment$a,
    hi: onlinePayment$6,
    it: onlinePayment$5,
    nl: onlinePayment$4,
    pt: onlinePayment$3,
    ru: onlinePayment$2,
    zh: onlinePayment$1
  }[options.languageTag ?? languageTag()]();
};
const securePayment$a = /* @__NO_SIDE_EFFECTS__ */ () => `Paiement sécurisé`;
const securePayment$9 = /* @__NO_SIDE_EFFECTS__ */ () => `دفع آمن`;
const securePayment$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Secure payment`;
const securePayment$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Pago seguro`;
const securePayment$6 = /* @__NO_SIDE_EFFECTS__ */ () => `भुगतान सुरक्षित`;
const securePayment$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Pagamento sicuro`;
const securePayment$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Veilige betaling`;
const securePayment$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Pagamento seguro`;
const securePayment$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Безопасная оплата`;
const securePayment$1 = /* @__NO_SIDE_EFFECTS__ */ () => `安全支付`;
const securePayment = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: securePayment$9,
    en: securePayment$8,
    es: securePayment$7,
    fr: securePayment$a,
    hi: securePayment$6,
    it: securePayment$5,
    nl: securePayment$4,
    pt: securePayment$3,
    ru: securePayment$2,
    zh: securePayment$1
  }[options.languageTag ?? languageTag()]();
};
const bookSlot$a = /* @__NO_SIDE_EFFECTS__ */ () => `Réserver mon créneau pour`;
const bookSlot$9 = /* @__NO_SIDE_EFFECTS__ */ () => `احجز موعدي لـ`;
const bookSlot$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Reserve my time slot for`;
const bookSlot$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Reservar mi franja horaria para`;
const bookSlot$6 = /* @__NO_SIDE_EFFECTS__ */ () => `मेरे लिए समय आरक्षित करें`;
const bookSlot$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Prenota il mio intervallo di tempo per`;
const bookSlot$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Reserveer mijn tijdslot voor`;
const bookSlot$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Reserve meu horário para`;
const bookSlot$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Зарезервировать для меня время`;
const bookSlot$1 = /* @__NO_SIDE_EFFECTS__ */ () => `请帮我预留时间段`;
const bookSlot = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: bookSlot$9,
    en: bookSlot$8,
    es: bookSlot$7,
    fr: bookSlot$a,
    hi: bookSlot$6,
    it: bookSlot$5,
    nl: bookSlot$4,
    pt: bookSlot$3,
    ru: bookSlot$2,
    zh: bookSlot$1
  }[options.languageTag ?? languageTag()]();
};
const pay$a = /* @__NO_SIDE_EFFECTS__ */ () => `Payer`;
const pay$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يدفع`;
const pay$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Pay`;
const pay$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Pagar`;
const pay$6 = /* @__NO_SIDE_EFFECTS__ */ () => `वेतन`;
const pay$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Paga`;
const pay$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Betalen`;
const pay$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Pagar`;
const pay$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Платить`;
const pay$1 = /* @__NO_SIDE_EFFECTS__ */ () => `支付`;
const pay = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: pay$9,
    en: pay$8,
    es: pay$7,
    fr: pay$a,
    hi: pay$6,
    it: pay$5,
    nl: pay$4,
    pt: pay$3,
    ru: pay$2,
    zh: pay$1
  }[options.languageTag ?? languageTag()]();
};
const Shield_check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { "d": "m9 12 2 2 4-4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "shield-check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Close_wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let _;
  let rest;
  let { meltBuilder } = $$props;
  const { methods: { closeDrawer } } = getCtx$1();
  const wrappedAction = (node) => {
    const handleKeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeDrawer(true);
      }
    };
    const handleClick = () => {
      closeDrawer();
    };
    node.addEventListener("keydown", handleKeydown);
    node.addEventListener("click", handleClick);
    return () => {
      node.removeEventListener("keydown", handleKeydown);
      node.removeEventListener("click", handleClick);
    };
  };
  if ($$props.meltBuilder === void 0 && $$bindings.meltBuilder && meltBuilder !== void 0) $$bindings.meltBuilder(meltBuilder);
  ({ _, ...rest } = meltBuilder);
  {
    Object.assign(rest, { action: wrappedAction });
  }
  return `${slots.default ? slots.default({ newBuilder: rest }) : ``}`;
});
const Close$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["el", "asChild"]);
  let { el = void 0 } = $$props;
  let { asChild = false } = $$props;
  getCtx$1();
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${asChild ? `${validate_component(Dialog_close, "DialogPrimitive.Close").$$render(
      $$result,
      Object.assign({}, $$restProps, { asChild }, { el }),
      {
        el: ($$value) => {
          el = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ builder }) => {
          return `${validate_component(Close_wrapper, "CloseWrapper").$$render($$result, { meltBuilder: builder }, {}, {
            default: ({ newBuilder }) => {
              return `${slots.default ? slots.default({ builder: newBuilder }) : ``}`;
            }
          })}`;
        }
      }
    )}` : `${validate_component(Dialog_close, "DialogPrimitive.Close").$$render(
      $$result,
      Object.assign({}, $$restProps, { asChild }, { el }),
      {
        el: ($$value) => {
          el = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ builder }) => {
          return `${slots.default ? slots.default({ builder }) : ``}`;
        }
      }
    )}`}`;
  } while (!$$settled);
  return $$rendered;
});
const Close = Close$1;
const BookingServiceBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectedProfessional } = $$props;
  let { selectedService } = $$props;
  let { openPopupInfo } = $$props;
  if ($$props.selectedProfessional === void 0 && $$bindings.selectedProfessional && selectedProfessional !== void 0) $$bindings.selectedProfessional(selectedProfessional);
  if ($$props.selectedService === void 0 && $$bindings.selectedService && selectedService !== void 0) $$bindings.selectedService(selectedService);
  if ($$props.openPopupInfo === void 0 && $$bindings.openPopupInfo && openPopupInfo !== void 0) $$bindings.openPopupInfo(openPopupInfo);
  return `<div class="flex flex-row justify-between"><div class="flex flex-col w-full gap-4"><div class="w-10 h-10 min-w-10">${selectedProfessional?.avatar ? `<img${add_attribute(
    "src",
    selectedProfessional ? selectedProfessional.avatar : null,
    0
  )} alt="avatar" class="${"w-full h-full object-cover " + escape(selectedProfessional ? "visible" : "hidden", true) + " rounded-full"}">` : `${validate_component(PlaceholderAvatar, "PlaceholderAvatar").$$render(
    $$result,
    {
      name: selectedProfessional?.name ?? "Null",
      shape: "mini-square"
    },
    {},
    {}
  )}`}</div> <div class="flex text-sm flex-col gap-4 w-full"><div class="flex flex-row justify-between items-center w-full text-sm text-primary font-normal"><span data-svelte-h="svelte-1ouwc15">Professionnel</span> <span>${escape(selectedProfessional ? selectedProfessional.name : anyProfessional())}</span></div> ${selectedService ? `<div class="w-full flex flex-row justify-between items-center text-sm text-primary font-normal"><p>${escape(selectedService.name)}</p> <p>${escape(selectedService?.durationS / 60)}min</p></div>` : ``} <div class="w-full border-t bg-[#DFE5E7]"></div> <p class="text-[#616163] text-sm flex gap-1 items-center underline underline-offset-4 decoration-dashed decoration-[#DFE5E7]">Heure de passage estimée <button>${validate_component(Info, "InfoIcon").$$render($$result, { size: 12 }, {}, {})}</button></p></div></div></div>`;
});
const CloseIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_414_14525)"><rect width="24" height="24" fill="#F7F7F7"></rect><path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F7F7F7"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.17583 15.9705C7.12009 16.0263 7.07587 16.0925 7.0457 16.1653C7.01553 16.2381 7 16.3162 7 16.395C7 16.4739 7.01553 16.5519 7.0457 16.6248C7.07587 16.6976 7.12009 16.7638 7.17583 16.8195C7.23158 16.8753 7.29776 16.9195 7.3706 16.9497C7.44343 16.9798 7.5215 16.9954 7.60033 16.9954C7.67917 16.9954 7.75724 16.9798 7.83007 16.9497C7.90291 16.9195 7.96909 16.8753 8.02483 16.8195L11.9998 12.8455L15.9748 16.8195C16.0874 16.9321 16.2401 16.9954 16.3993 16.9954C16.5586 16.9954 16.7112 16.9321 16.8238 16.8195C16.9364 16.707 16.9997 16.5543 16.9997 16.395C16.9997 16.2358 16.9364 16.0831 16.8238 15.9705L12.8488 11.9975L16.8238 8.02354C16.8803 7.96796 16.9251 7.90176 16.9558 7.82875C16.9865 7.75574 17.0025 7.67738 17.0028 7.59818C17.003 7.51897 16.9876 7.4405 16.9574 7.36728C16.9272 7.29406 16.8828 7.22755 16.8268 7.17158C16.7708 7.11561 16.7042 7.07128 16.6309 7.04117C16.5577 7.01105 16.4792 6.99573 16.4 6.9961C16.3208 6.99647 16.2424 7.01251 16.1695 7.04331C16.0965 7.07411 16.0303 7.11905 15.9748 7.17554L11.9998 11.1485L8.02483 7.17554C7.91207 7.06446 7.75998 7.00244 7.60169 7.00299C7.44341 7.00354 7.29175 7.06662 7.17976 7.17848C7.06777 7.29033 7.00452 7.44192 7.00378 7.6002C7.00305 7.75848 7.06489 7.91065 7.17583 8.02354L11.1508 11.9975L7.17583 15.9705Z" fill="#616163"></path></g><defs><clipPath id="clip0_414_14525"><rect width="24" height="24" fill="white"></rect></clipPath></defs></svg>`;
});
const FormInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label } = $$props;
  let { id } = $$props;
  let { type = "text" } = $$props;
  let { value } = $$props;
  let { placeholder } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  return `<div class="flex flex-col gap-1"><label for="first-name" class="text-xs text-gray-400 font-bold uppercase">${escape(label)}</label> <input${add_attribute("id", id, 0)} required class="w-full text-xs bg-white placeholder-gray-400 text-black/90 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition duration-200 ease-in-out"${add_attribute("placeholder", placeholder, 0)}${add_attribute("value", value, 0)}></div>`;
});
const allCountries = [
  ["Afghanistan (‫افغانستان‬‎)", "af", "93"],
  ["Albania (Shqipëri)", "al", "355"],
  ["Algeria (‫الجزائر‬‎)", "dz", "213"],
  ["American Samoa", "as", "1", 5, ["684"]],
  ["Andorra", "ad", "376"],
  ["Angola", "ao", "244"],
  ["Anguilla", "ai", "1", 6, ["264"]],
  ["Antigua and Barbuda", "ag", "1", 7, ["268"]],
  ["Argentina", "ar", "54"],
  ["Armenia (Հայաստան)", "am", "374"],
  ["Aruba", "aw", "297"],
  ["Ascension Island", "ac", "247"],
  ["Australia", "au", "61", 0],
  ["Austria (Österreich)", "at", "43"],
  ["Azerbaijan (Azərbaycan)", "az", "994"],
  ["Bahamas", "bs", "1", 8, ["242"]],
  ["Bahrain (‫البحرين‬‎)", "bh", "973"],
  ["Bangladesh (বাংলাদেশ)", "bd", "880"],
  ["Barbados", "bb", "1", 9, ["246"]],
  ["Belarus (Беларусь)", "by", "375"],
  ["Belgium (België)", "be", "32"],
  ["Belize", "bz", "501"],
  ["Benin (Bénin)", "bj", "229"],
  ["Bermuda", "bm", "1", 10, ["441"]],
  ["Bhutan (འབྲུག)", "bt", "975"],
  ["Bolivia", "bo", "591"],
  ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"],
  ["Botswana", "bw", "267"],
  ["Brazil (Brasil)", "br", "55"],
  ["British Indian Ocean Territory", "io", "246"],
  ["British Virgin Islands", "vg", "1", 11, ["284"]],
  ["Brunei", "bn", "673"],
  ["Bulgaria (България)", "bg", "359"],
  ["Burkina Faso", "bf", "226"],
  ["Burundi (Uburundi)", "bi", "257"],
  ["Cambodia (កម្ពុជា)", "kh", "855"],
  ["Cameroon (Cameroun)", "cm", "237"],
  [
    "Canada",
    "ca",
    "1",
    1,
    [
      "204",
      "226",
      "236",
      "249",
      "250",
      "289",
      "306",
      "343",
      "365",
      "387",
      "403",
      "416",
      "418",
      "431",
      "437",
      "438",
      "450",
      "506",
      "514",
      "519",
      "548",
      "579",
      "581",
      "587",
      "604",
      "613",
      "639",
      "647",
      "672",
      "705",
      "709",
      "742",
      "778",
      "780",
      "782",
      "807",
      "819",
      "825",
      "867",
      "873",
      "902",
      "905"
    ]
  ],
  ["Cape Verde (Kabu Verdi)", "cv", "238"],
  ["Caribbean Netherlands", "bq", "599", 1, ["3", "4", "7"]],
  ["Cayman Islands", "ky", "1", 12, ["345"]],
  ["Central African Republic (République centrafricaine)", "cf", "236"],
  ["Chad (Tchad)", "td", "235"],
  ["Chile", "cl", "56"],
  ["China (中国)", "cn", "86"],
  ["Christmas Island", "cx", "61", 2, ["89164"]],
  ["Cocos (Keeling) Islands", "cc", "61", 1, ["89162"]],
  ["Colombia", "co", "57"],
  ["Comoros (‫جزر القمر‬‎)", "km", "269"],
  ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"],
  ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"],
  ["Cook Islands", "ck", "682"],
  ["Costa Rica", "cr", "506"],
  ["Côte d’Ivoire", "ci", "225"],
  ["Croatia (Hrvatska)", "hr", "385"],
  ["Cuba", "cu", "53"],
  ["Curaçao", "cw", "599", 0],
  ["Cyprus (Κύπρος)", "cy", "357"],
  ["Czech Republic (Česká republika)", "cz", "420"],
  ["Denmark (Danmark)", "dk", "45"],
  ["Djibouti", "dj", "253"],
  ["Dominica", "dm", "1", 13, ["767"]],
  ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]],
  ["Ecuador", "ec", "593"],
  ["Egypt (‫مصر‬‎)", "eg", "20"],
  ["El Salvador", "sv", "503"],
  ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"],
  ["Eritrea", "er", "291"],
  ["Estonia (Eesti)", "ee", "372"],
  ["Eswatini", "sz", "268"],
  ["Ethiopia", "et", "251"],
  ["Falkland Islands (Islas Malvinas)", "fk", "500"],
  ["Faroe Islands (Føroyar)", "fo", "298"],
  ["Fiji", "fj", "679"],
  ["Finland (Suomi)", "fi", "358", 0],
  ["France", "fr", "33"],
  ["French Guiana (Guyane française)", "gf", "594"],
  ["French Polynesia (Polynésie française)", "pf", "689"],
  ["Gabon", "ga", "241"],
  ["Gambia", "gm", "220"],
  ["Georgia (საქართველო)", "ge", "995"],
  ["Germany (Deutschland)", "de", "49"],
  ["Ghana (Gaana)", "gh", "233"],
  ["Gibraltar", "gi", "350"],
  ["Greece (Ελλάδα)", "gr", "30"],
  ["Greenland (Kalaallit Nunaat)", "gl", "299"],
  ["Grenada", "gd", "1", 14, ["473"]],
  ["Guadeloupe", "gp", "590", 0],
  ["Guam", "gu", "1", 15, ["671"]],
  ["Guatemala", "gt", "502"],
  ["Guernsey", "gg", "44", 1, ["1481", "7781", "7839", "7911"]],
  ["Guinea (Guinée)", "gn", "224"],
  ["Guinea-Bissau (Guiné Bissau)", "gw", "245"],
  ["Guyana", "gy", "592"],
  ["Haiti", "ht", "509"],
  ["Honduras", "hn", "504"],
  ["Hong Kong (香港)", "hk", "852"],
  ["Hungary (Magyarország)", "hu", "36"],
  ["Iceland (Ísland)", "is", "354"],
  ["India (भारत)", "in", "91"],
  ["Indonesia", "id", "62"],
  ["Iran (‫ایران‬‎)", "ir", "98"],
  ["Iraq (‫العراق‬‎)", "iq", "964"],
  ["Ireland", "ie", "353"],
  ["Isle of Man", "im", "44", 2, ["1624", "74576", "7524", "7924", "7624"]],
  ["Israel (‫ישראל‬‎)", "il", "972"],
  ["Italy (Italia)", "it", "39", 0],
  ["Jamaica", "jm", "1", 4, ["876", "658"]],
  ["Japan (日本)", "jp", "81"],
  ["Jersey", "je", "44", 3, ["1534", "7509", "7700", "7797", "7829", "7937"]],
  ["Jordan (‫الأردن‬‎)", "jo", "962"],
  ["Kazakhstan (Казахстан)", "kz", "7", 1, ["33", "7"]],
  ["Kenya", "ke", "254"],
  ["Kiribati", "ki", "686"],
  ["Kosovo", "xk", "383"],
  ["Kuwait (‫الكويت‬‎)", "kw", "965"],
  ["Kyrgyzstan (Кыргызстан)", "kg", "996"],
  ["Laos (ລາວ)", "la", "856"],
  ["Latvia (Latvija)", "lv", "371"],
  ["Lebanon (‫لبنان‬‎)", "lb", "961"],
  ["Lesotho", "ls", "266"],
  ["Liberia", "lr", "231"],
  ["Libya (‫ليبيا‬‎)", "ly", "218"],
  ["Liechtenstein", "li", "423"],
  ["Lithuania (Lietuva)", "lt", "370"],
  ["Luxembourg", "lu", "352"],
  ["Macau (澳門)", "mo", "853"],
  ["North Macedonia (Македонија)", "mk", "389"],
  ["Madagascar (Madagasikara)", "mg", "261"],
  ["Malawi", "mw", "265"],
  ["Malaysia", "my", "60"],
  ["Maldives", "mv", "960"],
  ["Mali", "ml", "223"],
  ["Malta", "mt", "356"],
  ["Marshall Islands", "mh", "692"],
  ["Martinique", "mq", "596"],
  ["Mauritania (‫موريتانيا‬‎)", "mr", "222"],
  ["Mauritius (Moris)", "mu", "230"],
  ["Mayotte", "yt", "262", 1, ["269", "639"]],
  ["Mexico (México)", "mx", "52"],
  ["Micronesia", "fm", "691"],
  ["Moldova (Republica Moldova)", "md", "373"],
  ["Monaco", "mc", "377"],
  ["Mongolia (Монгол)", "mn", "976"],
  ["Montenegro (Crna Gora)", "me", "382"],
  ["Montserrat", "ms", "1", 16, ["664"]],
  ["Morocco (‫المغرب‬‎)", "ma", "212", 0],
  ["Mozambique (Moçambique)", "mz", "258"],
  ["Myanmar (Burma) (မြန်မာ)", "mm", "95"],
  ["Namibia (Namibië)", "na", "264"],
  ["Nauru", "nr", "674"],
  ["Nepal (नेपाल)", "np", "977"],
  ["Netherlands (Nederland)", "nl", "31"],
  ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"],
  ["New Zealand", "nz", "64"],
  ["Nicaragua", "ni", "505"],
  ["Niger (Nijar)", "ne", "227"],
  ["Nigeria", "ng", "234"],
  ["Niue", "nu", "683"],
  ["Norfolk Island", "nf", "672"],
  ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"],
  ["Northern Mariana Islands", "mp", "1", 17, ["670"]],
  ["Norway (Norge)", "no", "47", 0],
  ["Oman (‫عُمان‬‎)", "om", "968"],
  ["Pakistan (‫پاکستان‬‎)", "pk", "92"],
  ["Palau", "pw", "680"],
  ["Palestine (‫فلسطين‬‎)", "ps", "970"],
  ["Panama (Panamá)", "pa", "507"],
  ["Papua New Guinea", "pg", "675"],
  ["Paraguay", "py", "595"],
  ["Peru (Perú)", "pe", "51"],
  ["Philippines", "ph", "63"],
  ["Poland (Polska)", "pl", "48"],
  ["Portugal", "pt", "351"],
  ["Puerto Rico", "pr", "1", 3, ["787", "939"]],
  ["Qatar (‫قطر‬‎)", "qa", "974"],
  ["Réunion (La Réunion)", "re", "262", 0],
  ["Romania (România)", "ro", "40"],
  ["Russia (Россия)", "ru", "7", 0],
  ["Rwanda", "rw", "250"],
  ["Saint Barthélemy", "bl", "590", 1],
  ["Saint Helena", "sh", "290"],
  ["Saint Kitts and Nevis", "kn", "1", 18, ["869"]],
  ["Saint Lucia", "lc", "1", 19, ["758"]],
  ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2],
  ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"],
  ["Saint Vincent and the Grenadines", "vc", "1", 20, ["784"]],
  ["Samoa", "ws", "685"],
  ["San Marino", "sm", "378"],
  ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"],
  ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"],
  ["Senegal (Sénégal)", "sn", "221"],
  ["Serbia (Србија)", "rs", "381"],
  ["Seychelles", "sc", "248"],
  ["Sierra Leone", "sl", "232"],
  ["Singapore", "sg", "65"],
  ["Sint Maarten", "sx", "1", 21, ["721"]],
  ["Slovakia (Slovensko)", "sk", "421"],
  ["Slovenia (Slovenija)", "si", "386"],
  ["Solomon Islands", "sb", "677"],
  ["Somalia (Soomaaliya)", "so", "252"],
  ["South Africa", "za", "27"],
  ["South Korea (대한민국)", "kr", "82"],
  ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"],
  ["Spain (España)", "es", "34"],
  ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"],
  ["Sudan (‫السودان‬‎)", "sd", "249"],
  ["Suriname", "sr", "597"],
  ["Svalbard and Jan Mayen", "sj", "47", 1, ["79"]],
  ["Sweden (Sverige)", "se", "46"],
  ["Switzerland (Schweiz)", "ch", "41"],
  ["Syria (‫سوريا‬‎)", "sy", "963"],
  ["Taiwan (台灣)", "tw", "886"],
  ["Tajikistan", "tj", "992"],
  ["Tanzania", "tz", "255"],
  ["Thailand (ไทย)", "th", "66"],
  ["Timor-Leste", "tl", "670"],
  ["Togo", "tg", "228"],
  ["Tokelau", "tk", "690"],
  ["Tonga", "to", "676"],
  ["Trinidad and Tobago", "tt", "1", 22, ["868"]],
  ["Tristan da Cunha", "ta", "290"],
  ["Tunisia (‫تونس‬‎)", "tn", "216"],
  ["Turkey (Türkiye)", "tr", "90"],
  ["Turkmenistan", "tm", "993"],
  ["Turks and Caicos Islands", "tc", "1", 23, ["649"]],
  ["Tuvalu", "tv", "688"],
  ["U.S. Virgin Islands", "vi", "1", 24, ["340"]],
  ["Uganda", "ug", "256"],
  ["Ukraine (Україна)", "ua", "380"],
  ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"],
  ["United Kingdom", "gb", "44", 0],
  ["United States", "us", "1", 0],
  ["Uruguay", "uy", "598"],
  ["Uzbekistan (Oʻzbekiston)", "uz", "998"],
  ["Vanuatu", "vu", "678"],
  ["Vatican City (Città del Vaticano)", "va", "39", 1, ["06698"]],
  ["Venezuela", "ve", "58"],
  ["Vietnam (Việt Nam)", "vn", "84"],
  ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"],
  ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, ["5288", "5289"]],
  ["Yemen (‫اليمن‬‎)", "ye", "967"],
  ["Zambia", "zm", "260"],
  ["Zimbabwe", "zw", "263"],
  ["Åland Islands", "ax", "358", 1, ["18"]]
];
const normalizedCountries = allCountries.map((country) => {
  return {
    id: country[1].toUpperCase(),
    label: `${country[0]} +${country[2]}`,
    name: country[0],
    iso2: country[1].toUpperCase(),
    dialCode: country[2],
    priority: country[3] || 0,
    areaCodes: country[4] || null
  };
});
const examplePhoneNumbers = { "AC": "40123", "AD": "312345", "AE": "501234567", "AF": "701234567", "AG": "2684641234", "AI": "2642351234", "AL": "672123456", "AM": "77123456", "AO": "923123456", "AR": "91123456789", "AS": "6847331234", "AT": "664123456", "AU": "412345678", "AW": "5601234", "AX": "412345678", "AZ": "401234567", "BA": "61123456", "BB": "2462501234", "BD": "1812345678", "BE": "470123456", "BF": "70123456", "BG": "43012345", "BH": "36001234", "BI": "79561234", "BJ": "90011234", "BL": "690001234", "BM": "4413701234", "BN": "7123456", "BO": "71234567", "BQ": "3181234", "BR": "11961234567", "BS": "2423591234", "BT": "17123456", "BW": "71123456", "BY": "294911911", "BZ": "6221234", "CA": "5062345678", "CC": "412345678", "CD": "991234567", "CF": "70012345", "CG": "061234567", "CH": "781234567", "CI": "0123456789", "CK": "71234", "CL": "221234567", "CM": "671234567", "CN": "13123456789", "CO": "3211234567", "CR": "83123456", "CU": "51234567", "CV": "9911234", "CW": "95181234", "CX": "412345678", "CY": "96123456", "CZ": "601123456", "DE": "15123456789", "DJ": "77831001", "DK": "32123456", "DM": "7672251234", "DO": "8092345678", "DZ": "551234567", "EC": "991234567", "EE": "51234567", "EG": "1001234567", "EH": "650123456", "ER": "7123456", "ES": "612345678", "ET": "911234567", "FI": "412345678", "FJ": "7012345", "FK": "51234", "FM": "3501234", "FO": "211234", "FR": "612345678", "GA": "06031234", "GB": "7400123456", "GD": "4734031234", "GE": "555123456", "GF": "694201234", "GG": "7781123456", "GH": "231234567", "GI": "57123456", "GL": "221234", "GM": "3012345", "GN": "601123456", "GP": "690001234", "GQ": "222123456", "GR": "6912345678", "GT": "51234567", "GU": "6713001234", "GW": "955012345", "GY": "6091234", "HK": "51234567", "HN": "91234567", "HR": "921234567", "HT": "34101234", "HU": "201234567", "ID": "812345678", "IE": "850123456", "IL": "502345678", "IM": "7924123456", "IN": "8123456789", "IO": "3801234", "IQ": "7912345678", "IR": "9123456789", "IS": "6111234", "IT": "3123456789", "JE": "7797712345", "JM": "8762101234", "JO": "790123456", "JP": "9012345678", "KE": "712123456", "KG": "700123456", "KH": "91234567", "KI": "72001234", "KM": "3212345", "KN": "8697652917", "KP": "1921234567", "KR": "1020000000", "KW": "50012345", "KY": "3453231234", "KZ": "7710009998", "LA": "2023123456", "LB": "71123456", "LC": "7582845678", "LI": "660234567", "LK": "712345678", "LR": "770123456", "LS": "50123456", "LT": "61234567", "LU": "628123456", "LV": "21234567", "LY": "912345678", "MA": "650123456", "MC": "612345678", "MD": "62112345", "ME": "67622901", "MF": "690001234", "MG": "321234567", "MH": "2351234", "MK": "72345678", "ML": "65012345", "MM": "92123456", "MN": "88123456", "MO": "66123456", "MP": "6702345678", "MQ": "696201234", "MR": "22123456", "MS": "6644923456", "MT": "96961234", "MU": "52512345", "MV": "7712345", "MW": "991234567", "MX": "12221234567", "MY": "123456789", "MZ": "821234567", "NA": "811234567", "NC": "751234", "NE": "93123456", "NF": "381234", "NG": "8021234567", "NI": "81234567", "NL": "612345678", "NO": "40612345", "NP": "9841234567", "NR": "5551234", "NU": "8884012", "NZ": "211234567", "OM": "92123456", "PA": "61234567", "PE": "912345678", "PF": "87123456", "PG": "70123456", "PH": "9051234567", "PK": "3012345678", "PL": "512345678", "PM": "551234", "PR": "7872345678", "PS": "599123456", "PT": "912345678", "PW": "6201234", "PY": "961456789", "QA": "33123456", "RE": "692123456", "RO": "712034567", "RS": "601234567", "RU": "9123456789", "RW": "720123456", "SA": "512345678", "SB": "7421234", "SC": "2510123", "SD": "911231234", "SE": "701234567", "SG": "81234567", "SH": "51234", "SI": "31234567", "SJ": "41234567", "SK": "912123456", "SL": "25123456", "SM": "66661212", "SN": "701234567", "SO": "71123456", "SR": "7412345", "SS": "977123456", "ST": "9812345", "SV": "70123456", "SX": "7215205678", "SY": "944567890", "SZ": "76123456", "TA": "8999", "TC": "6492311234", "TD": "63012345", "TG": "90112345", "TH": "812345678", "TJ": "917123456", "TK": "7290", "TL": "77212345", "TM": "66123456", "TN": "20123456", "TO": "7715123", "TR": "5012345678", "TT": "8682911234", "TV": "901234", "TW": "912345678", "TZ": "621234567", "UA": "501234567", "UG": "712345678", "US": "2015550123", "UY": "94231234", "UZ": "912345678", "VA": "3123456789", "VC": "7844301234", "VE": "4121234567", "VG": "2843001234", "VI": "3406421234", "VN": "912345678", "VU": "5912345", "WF": "821234", "WS": "7212345", "XK": "43201234", "YE": "712345678", "YT": "639012345", "ZA": "711234567", "ZM": "955123456", "ZW": "712345678" };
const normalizeTelInput = (input) => {
  const filteredResult = Object.fromEntries(Object.entries({
    countryCode: input ? input.country : null,
    isValid: input ? input.isValid() : false,
    isPossible: input ? input.isPossible() : false,
    phoneNumber: input ? input.number : null,
    countryCallingCode: input ? input.countryCallingCode : null,
    formattedNumber: input ? input.formatInternational() : null,
    nationalNumber: input ? input.nationalNumber : null,
    formatInternational: input ? input.formatInternational() : null,
    formatOriginal: input ? input.formatInternational().slice(input.countryCallingCode.length + 1).trim() : null,
    formatNational: input ? input.formatNational() : null,
    uri: input ? input.getURI() : null,
    e164: input ? input.number : null
  }).filter(([, value]) => value !== null));
  return filteredResult;
};
const generatePlaceholder = (country, { format, spaces } = {
  format: "national",
  spaces: true
}) => {
  const examplePhoneNumber = getExampleNumber(country, examplePhoneNumbers);
  if (examplePhoneNumber) {
    switch (format) {
      case "international":
        return spaces ? examplePhoneNumber.formatInternational() : examplePhoneNumber.number;
      default:
        return spaces ? examplePhoneNumber.formatInternational().slice(examplePhoneNumber.countryCallingCode.length + 1).trim() : examplePhoneNumber.nationalNumber;
    }
  } else {
    throw new Error(`No country found with this country code: ${country}`);
  }
};
const getInternationalPhoneNumberPrefix = (country) => {
  const ONLY_DIGITS_REGEXP = /^\d+$/;
  let prefix = "+" + getCountryCallingCode(country);
  const newMetadata = new Metadata();
  const leadingDigits = newMetadata.numberingPlan?.leadingDigits();
  if (leadingDigits && ONLY_DIGITS_REGEXP.test(leadingDigits)) {
    prefix += leadingDigits;
  }
  return prefix;
};
const getCountryForPartialE164Number = (partialE164Number, { country, countries, required } = {}) => {
  if (partialE164Number === "+") {
    return country;
  }
  const derived_country = getCountryFromPossiblyIncompleteInternationalPhoneNumber(partialE164Number);
  if (derived_country && (!countries || countries.indexOf(derived_country) >= 0)) {
    return derived_country;
  } else if (country && !required && !couldNumberBelongToCountry(partialE164Number, country)) {
    return void 0;
  }
  return country;
};
const getCountryFromPossiblyIncompleteInternationalPhoneNumber = (number) => {
  const formatter = new AsYouType();
  formatter.input(number);
  return formatter.getCountry();
};
const couldNumberBelongToCountry = (number, country) => {
  const intlPhoneNumberPrefix = getInternationalPhoneNumberPrefix(country);
  let i = 0;
  while (i < number.length && i < intlPhoneNumberPrefix.length) {
    if (number[i] !== intlPhoneNumberPrefix[i]) {
      return false;
    }
    i++;
  }
  return true;
};
const TelInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let getPlaceholder;
  let $$restProps = compute_rest_props($$props, [
    "autocomplete",
    "class",
    "disabled",
    "id",
    "name",
    "placeholder",
    "readonly",
    "required",
    "size",
    "value",
    "country",
    "detailedValue",
    "valid",
    "options",
    "el",
    "updateValue"
  ]);
  const dispatch = createEventDispatcher();
  const defaultOptions = {
    autoPlaceholder: true,
    spaces: true,
    invalidateOnCountryChange: false,
    format: "national"
  };
  let { autocomplete = null } = $$props;
  let { class: classes = "" } = $$props;
  let { disabled = false } = $$props;
  let { id = "phone-input-" + /* @__PURE__ */ (/* @__PURE__ */ new Date()).getTime().toString(36) + Math.random().toString(36).slice(2) } = $$props;
  let { name = null } = $$props;
  let { placeholder = null } = $$props;
  let { readonly = null } = $$props;
  let { required = null } = $$props;
  let { size = null } = $$props;
  let { value } = $$props;
  let { country = void 0 } = $$props;
  let { detailedValue = null } = $$props;
  let { valid = true } = $$props;
  let { options = defaultOptions } = $$props;
  let { el = void 0 } = $$props;
  let inputValue = value;
  let prevCountry = country;
  const combinedOptions = { ...defaultOptions, ...options };
  const updateCountry = (countryCode) => {
    if (countryCode !== country) {
      country = countryCode;
      prevCountry = country;
      dispatch("updateCountry", country);
    }
    return country;
  };
  const handleParsePhoneNumber = (rawInput, currCountry = null) => {
    const input = rawInput;
    if (input !== null) {
      const numberHasCountry = getCountryForPartialE164Number(input);
      if (numberHasCountry && numberHasCountry !== prevCountry) {
        updateCountry(numberHasCountry);
      }
      try {
        detailedValue = normalizeTelInput(parsePhoneNumberWithError(input, numberHasCountry ?? currCountry ?? void 0));
      } catch (err) {
        if (err instanceof ParseError) {
          detailedValue = { isValid: false, error: err.message };
          dispatch("parseError", err.message);
        } else {
          throw err;
        }
      }
      const formatOption = combinedOptions.format === "national" ? "nationalNumber" : "e164";
      const formattedValue = combinedOptions.format === "national" ? "formatOriginal" : "formatInternational";
      if (combinedOptions.spaces && detailedValue?.[formattedValue]) {
        inputValue = detailedValue[formattedValue] ?? null;
      } else if (detailedValue?.[formatOption]) {
        inputValue = detailedValue[formatOption] ?? null;
      }
      value = detailedValue?.e164 ?? input ?? null;
      valid = detailedValue?.isValid ?? false;
      dispatch("updateValid", valid);
      dispatch("updateValue", value);
      dispatch("updateDetailedValue", detailedValue);
    } else if (input === null && currCountry !== null) {
      if (currCountry !== prevCountry) {
        prevCountry = currCountry;
        valid = !options.invalidateOnCountryChange;
        value = null;
        inputValue = null;
        detailedValue = null;
        dispatch("updateValid", valid);
        dispatch("updateValue", value);
        dispatch("updateDetailedValue", detailedValue);
      }
    } else {
      valid = true;
      value = null;
      detailedValue = null;
      prevCountry = currCountry;
      dispatch("updateValid", valid);
      dispatch("updateDetailedValue", detailedValue);
      inputValue = null;
    }
  };
  let countryWatchInitRun = true;
  const countryChangeWatchFunction = (current) => {
    if (!countryWatchInitRun) {
      handleParsePhoneNumber(null, current);
    }
    countryWatchInitRun = false;
  };
  const updateValue = (newValue, newCountry) => {
    const castedValue = newValue;
    if (castedValue) {
      handleParsePhoneNumber(castedValue, getCountryForPartialE164Number(castedValue) || newCountry);
    }
  };
  if ($$props.autocomplete === void 0 && $$bindings.autocomplete && autocomplete !== void 0) $$bindings.autocomplete(autocomplete);
  if ($$props.class === void 0 && $$bindings.class && classes !== void 0) $$bindings.class(classes);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.country === void 0 && $$bindings.country && country !== void 0) $$bindings.country(country);
  if ($$props.detailedValue === void 0 && $$bindings.detailedValue && detailedValue !== void 0) $$bindings.detailedValue(detailedValue);
  if ($$props.valid === void 0 && $$bindings.valid && valid !== void 0) $$bindings.valid(valid);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  if ($$props.updateValue === void 0 && $$bindings.updateValue && updateValue !== void 0) $$bindings.updateValue(updateValue);
  {
    countryChangeWatchFunction(country);
  }
  getPlaceholder = combinedOptions.autoPlaceholder && country ? generatePlaceholder(country, {
    format: combinedOptions.format,
    spaces: combinedOptions.spaces
  }) : placeholder;
  {
    if (value === null && inputValue !== null && detailedValue !== null) {
      inputValue = null;
      detailedValue = null;
      dispatch("updateDetailedValue", detailedValue);
    }
  }
  return `<input${spread(
    [
      escape_object($$restProps),
      {
        autocomplete: escape_attribute_value(autocomplete)
      },
      { class: escape_attribute_value(classes) },
      { disabled: disabled || null },
      { id: escape_attribute_value(id) },
      { name: escape_attribute_value(name) },
      { readonly: readonly || null },
      { required: required || null },
      { size: escape_attribute_value(size) },
      {
        placeholder: escape_attribute_value(getPlaceholder)
      },
      { type: "tel" },
      {
        value: escape_attribute_value(inputValue)
      }
    ],
    {}
  )}${add_attribute("this", el, 0)}>`;
});
const PhoneInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedCountryDialCode;
  let { clickOutside = true } = $$props;
  let { closeOnClick = true } = $$props;
  let { disabled = false } = $$props;
  let { detailedValue = null } = $$props;
  let { value } = $$props;
  let { searchPlaceholder = "Search" } = $$props;
  let { selectedCountry } = $$props;
  let { valid } = $$props;
  let { options = {} } = $$props;
  createEventDispatcher();
  if ($$props.clickOutside === void 0 && $$bindings.clickOutside && clickOutside !== void 0) $$bindings.clickOutside(clickOutside);
  if ($$props.closeOnClick === void 0 && $$bindings.closeOnClick && closeOnClick !== void 0) $$bindings.closeOnClick(closeOnClick);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.detailedValue === void 0 && $$bindings.detailedValue && detailedValue !== void 0) $$bindings.detailedValue(detailedValue);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.searchPlaceholder === void 0 && $$bindings.searchPlaceholder && searchPlaceholder !== void 0) $$bindings.searchPlaceholder(searchPlaceholder);
  if ($$props.selectedCountry === void 0 && $$bindings.selectedCountry && selectedCountry !== void 0) $$bindings.selectedCountry(selectedCountry);
  if ($$props.valid === void 0 && $$bindings.valid && valid !== void 0) $$bindings.valid(valid);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    selectedCountryDialCode = normalizedCountries.find((el) => el.iso2 === selectedCountry)?.dialCode || null;
    $$rendered = `<div class="${"flex relative rounded-lg " + escape(
      valid ? `` : ` ring-pink-500 dark:ring-pink-500 ring-1 focus-within:ring-offset-1 focus-within:ring-offset-pink-500/50 focus-within:ring-1`,
      true
    )}"><div class="flex"><button id="states-button" data-dropdown-toggle="dropdown-states" class="relative flex-shrink-0 overflow-hidden whitespace-nowrap inline-flex bg-white items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 rounded-l-lg hover:bg-gray-200 focus:outline-none" type="button" role="combobox" aria-controls="dropdown-countries" aria-expanded="false" aria-haspopup="false">${selectedCountry && selectedCountry !== null ? `<div class="inline-flex items-center text-left"><span class="${"flag flag-" + escape(selectedCountry.toLowerCase(), true) + " flex-shrink-0 mr-3"}"></span> ${options.format === "national" ? `<span class="text-xs text-gray-600">+${escape(selectedCountryDialCode)}</span>` : ``}</div>` : `Please select`} <svg aria-hidden="true" class="${"ml-1 w-4 h-4 " + escape("", true)}" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button> ${``}</div> ${validate_component(TelInput, "TelInput").$$render(
      $$result,
      {
        options,
        required: true,
        class: "text-xs bg-white rounded-r-lg block w-full p-2.5 focus:outline-none text-gray-900",
        country: selectedCountry,
        detailedValue,
        value,
        valid
      },
      {
        country: ($$value) => {
          selectedCountry = $$value;
          $$settled = false;
        },
        detailedValue: ($$value) => {
          detailedValue = $$value;
          $$settled = false;
        },
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        },
        valid: ($$value) => {
          valid = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const PaymentForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let start;
  let $shopStore, $$unsubscribe_shopStore;
  let $location, $$unsubscribe_location;
  let $clock, $$unsubscribe_clock;
  $$unsubscribe_shopStore = subscribe(shopStore, (value) => $shopStore = value);
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_clock = subscribe(clock, (value) => $clock = value);
  let { paymentMethod: paymentMethod2 } = $$props;
  let { finalPriceToPay } = $$props;
  let { isCreatingTicket = false } = $$props;
  let disableButton = true;
  let now = new Date($clock);
  let workerId = $shopStore.selectedProfessional?.id;
  $shopStore.selectedService?.id;
  let rdv = $shopStore.bookingType == "appointment" ? true : false;
  let delay = $shopStore.bookingDelay;
  let worker = $location.workers.find((w) => w.id.toString() === workerId?.toString());
  let workerTickets = worker?.tickets?.filter((t) => t.doneTime == null && t.canceledTime == null) || [];
  let formData = { name: "", phone: "", email: "" };
  let phoneValid = true;
  let selectedCountry = "FR";
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.paymentMethod === void 0 && $$bindings.paymentMethod && paymentMethod2 !== void 0) $$bindings.paymentMethod(paymentMethod2);
  if ($$props.finalPriceToPay === void 0 && $$bindings.finalPriceToPay && finalPriceToPay !== void 0) $$bindings.finalPriceToPay(finalPriceToPay);
  if ($$props.isCreatingTicket === void 0 && $$bindings.isCreatingTicket && isCreatingTicket !== void 0) $$bindings.isCreatingTicket(isCreatingTicket);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if (formData.phone != null && formData.phone.length == 10) ;
      }
    }
    start = rdv != null ? /* @__PURE__ */ new Date(+rdv) : new Date(now.getTime() + +(delay ?? "0") * 6e4);
    nextAvailableTime(workerTickets, now, start);
    $$rendered = `<div class="flex flex-col p-4 pt-4 lg:p-8 gap-6 w-full overflow-y-auto min-h-screen h-full md:h-[80vh] bg-[#F8FAFD]"><div class="flex flex-row justify-between"> <h1 class="font-bold text-2xl" data-svelte-h="svelte-1nm87dh">Confirmer votre réservation</h1> ${validate_component(Close, "Drawer.Close").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(CloseIcon, "CloseIcon").$$render($$result, {}, {}, {})}`;
      }
    })}</div> <form class="flex flex-col gap-6 h-fit md:h-fit py-6"><div class="flex flex-col gap-3 w-full"><div class="w-full">${validate_component(FormInput, "FormInput").$$render(
      $$result,
      {
        label: /* @__PURE__ */ firstName(),
        placeholder: "John",
        id: "first-name",
        value: formData.name
      },
      {
        value: ($$value) => {
          formData.name = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col gap-1"><label for="phone" class="text-xs text-gray-400 font-bold uppercase">${escape(/* @__PURE__ */ phone())}</label> ${validate_component(PhoneInput, "PhoneInput").$$render(
      $$result,
      {
        options: { format: "national" },
        value: formData.phone,
        valid: phoneValid,
        selectedCountry
      },
      {
        value: ($$value) => {
          formData.phone = $$value;
          $$settled = false;
        },
        valid: ($$value) => {
          phoneValid = $$value;
          $$settled = false;
        },
        selectedCountry: ($$value) => {
          selectedCountry = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${validate_component(FormInput, "FormInput").$$render(
      $$result,
      {
        label: /* @__PURE__ */ email(),
        placeholder: "example@mail.com",
        id: "email",
        type: "email",
        value: formData.email
      },
      {
        value: ($$value) => {
          formData.email = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div id="apple-pay-button"></div> <div id="card-element" class="w-full h-11 px-3 py-3 rounded-lg bg-white border border-gray-200"></div> <div class="flex flex-row justify-between"><div class="flex flex-col"><p class="font-bold text-lg">${escape(/* @__PURE__ */ total())}</p> <p class="text-xs opacity-60 -z-10">${escape(/* @__PURE__ */ priceIncludingVAT())}</p></div> <p class="font-bold text-lg whitespace-nowrap">${escape(displayPriceInDollars(finalPriceToPay))}</p></div> <p id="card-error" role="alert" class="pt-2 font-bold text-red-500 text-center text-sm"></p> ${``} ${isCreatingTicket ? `<div class="flex items-center justify-center h-full" data-svelte-h="svelte-1rtwltx"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>` : `${validate_component(Button, "Button").$$render(
      $$result,
      {
        disabled: disableButton,
        type: "submit",
        class: "rounded-lg min-h-12 disabled:opacity-50"
      },
      {},
      {
        default: () => {
          return `${escape(isCreatingTicket ? "..." : /* @__PURE__ */ makeReservation())}`;
        }
      }
    )}`} <div class="flex justify-center items-center"><p class="text-xs text-primary text-center max-w-[80%]">En cliquant sur le bouton ci-dessus,<br> vous acceptez les
        <a class="text-[#0073FF]"${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`https://www.carden.app/cgu-cgv`, void 0), 0)}>conditions générales de vente</a>
        et la
        <a class="text-[#0073FF]"${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`https://www.carden.app/privacy-carden`, void 0), 0)}>Politique de Confidentialité</a>.</p></div></form></div>`;
  } while (!$$settled);
  $$unsubscribe_shopStore();
  $$unsubscribe_location();
  $$unsubscribe_clock();
  return $$rendered;
});
const Basket = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let minimumServiceFeeInCents;
  let accomptePrice;
  let cardenFee;
  let bookingTime;
  let selectedProfessional;
  let selectedService;
  let theme;
  let iconColor;
  let isOnlinePayment;
  let priceWithDiscountPrice;
  let isDefaultFees;
  let finalCardenFees;
  let isSuperiorDiscounted;
  let feesWithAccompte;
  let totalToPayInPlace;
  let haveModifiedPrice;
  let haveToPayFees;
  let $location, $$unsubscribe_location;
  let $shopStore, $$unsubscribe_shopStore;
  $$unsubscribe_location = subscribe(location, (value) => $location = value);
  $$unsubscribe_shopStore = subscribe(shopStore, (value) => $shopStore = value);
  let paymentMode = $location.config.payment_mode;
  let isCreatingTicket = false;
  const iconColorByTheme = {
    NEUTRAL: "text-primary",
    PINK: "text-pink",
    CARDEN: "text-blue"
  };
  const backgroundByTheme = {
    NEUTRAL: "bg-[#F8FAFD]",
    PINK: "bg-[#FFF5FA]",
    CARDEN: "bg-[#F8FAFD]"
  };
  const backgroundColorFeeByTheme = {
    NEUTRAL: "bg-[#DFE5E7]",
    PINK: "bg-[#E5CEF7]",
    CARDEN: "bg-[#C7E0FF]"
  };
  let isPaymentPopupOpen = false;
  let popupTypeOpen = null;
  let paymentMethod$12 = ["ONLINE_FULL", "ONLINE_UPFRONT_FEE"].includes(paymentMode) ? "credit-card" : "in-store";
  const openPopupInfo = (type) => {
    popupTypeOpen = type;
  };
  const calculateFinalPrice = () => {
    if (isOnlinePayment) {
      if (paymentMode === "ONLINE_UPFRONT_FEE") return feesWithAccompte;
      else {
        if (paymentMode === "ONLINE_FULL") return priceWithDiscountPrice + finalCardenFees;
        else return priceWithDiscountPrice;
      }
    } else {
      return priceWithDiscountPrice;
    }
  };
  let finalPriceToPay = 0;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    minimumServiceFeeInCents = $location.config.minimum_service_fee;
    selectedService = $shopStore.selectedService;
    priceWithDiscountPrice = selectedService?.discountedPrice ? selectedService.discountedPrice : selectedService?.price || 0;
    accomptePrice = $location.config.upfront_fee_mode === "CONSTANT" ? $location.config.upfront_fee_eur : priceWithDiscountPrice * $location.config.upfront_fee_percent / 100;
    cardenFee = $location.config.service_fee_mode === "CONSTANT" ? $location.config.service_fee_eur : priceWithDiscountPrice * $location.config.service_fee_percent / 100;
    bookingTime = $shopStore.bookingDate;
    selectedProfessional = $shopStore.selectedProfessional;
    theme = $location.location.theme;
    iconColor = iconColorByTheme[theme];
    isOnlinePayment = paymentMode === "CLIENT_CHOICE" && paymentMethod$12 === "credit-card" || paymentMode === "ONLINE_FULL" || paymentMode === "ONLINE_UPFRONT_FEE";
    isDefaultFees = cardenFee < minimumServiceFeeInCents;
    finalCardenFees = isDefaultFees ? minimumServiceFeeInCents : cardenFee;
    isSuperiorDiscounted = (selectedService?.discountedPrice || 0) > selectedService?.price;
    feesWithAccompte = finalCardenFees + accomptePrice;
    totalToPayInPlace = displayPriceInDollars(priceWithDiscountPrice + finalCardenFees - feesWithAccompte);
    haveModifiedPrice = selectedService?.discountedPrice;
    haveToPayFees = paymentMode === "ONLINE_UPFRONT_FEE" || paymentMode === "ONLINE_FULL" ? true : false;
    {
      finalPriceToPay = calculateFinalPrice();
    }
    $$rendered = `<div class="${"bg-black fixed inset-0 z-[99999999999999999999999] flex justify-center items-center " + escape(isCreatingTicket ? "block" : "hidden", true)}"><div id="loader" class="h-[200px]"></div></div> ${selectedService && selectedProfessional ? `<div class="flex"><div class="${"relative " + escape(backgroundByTheme[theme], true) + " flex flex-col border lg:w-1/2 w-full overflow-y-auto h-screen pb-[200px]"}"><div class="px-6 md:px-8">${validate_component(BookingHeader, "BookingHeader").$$render($$result, { text: /* @__PURE__ */ bookingBasketTitle() }, {}, {})} <div class="pb-2 md:pb-6 md:mt-6"><h1 class="font-bold text-lg">${escape(/* @__PURE__ */ yourSelection())}</h1></div> <div class="flex flex-col justify-between w-full h-full"><div class="flex flex-col gap-4 bg-white rounded-lg p-4 md:p-6 border border-[#DFE5E7] mb-4">${validate_component(BookingServiceBox, "BookingServiceBox").$$render(
      $$result,
      {
        selectedProfessional,
        selectedService,
        openPopupInfo
      },
      {},
      {}
    )} <div class="flex text-sm flex-row justify-between text-primary font-bold items-center"><p class="text-sm flex gap-1">${validate_component(Clock_3, "Clock3").$$render($$result, { class: iconColor, size: 18 }, {}, {})} ${escape(/* @__PURE__ */ today())}</p> <p class="text-lg">${escape(bookingTime?.toLocaleTimeString(languageTag(), { hour: "numeric", minute: "numeric" }))}</p></div></div> <div class="pb-2 md:pb-6 md:mt-6"><h1 class="font-bold text-lg">${escape(/* @__PURE__ */ priceDetail())}</h1></div> <div class="flex flex-col gap-4 bg-white rounded-lg py-6 md:py-8 border border-[#DFE5E7]"><div class="flex justify-between items-center text-primary font-normal text-sm px-6 md:px-8"><p>${escape(/* @__PURE__ */ servicePrice())}</p> <p>${escape(haveModifiedPrice ? displayPriceInDollars(selectedService.price) : displayPriceInDollars(priceWithDiscountPrice))}</p></div>  ${haveModifiedPrice ? `<div class="${"flex justify-between items-center text-primary font-normal text-sm mx-4 md:mx-6 py-2 rounded-[3px] px-2 " + escape(
      isSuperiorDiscounted ? "bg-[#7832DC] bg-opacity-15" : "bg-[#23BBAC] bg-opacity-20",
      true
    )}"><p class="flex gap-1.5 items-center">${escape(isSuperiorDiscounted ? /* @__PURE__ */ surcharge() : /* @__PURE__ */ discount())} <button>${validate_component(Info, "InfoIcon").$$render($$result, { size: 12 }, {}, {})}</button></p> <p class="${"flex gap-1.5 items-center " + escape(
      isSuperiorDiscounted ? "text-[#7832DC]" : "text-[#23BBAC]",
      true
    )}"><span class="${"" + escape(isSuperiorDiscounted ? "" : "rotate-90", true)}">${isSuperiorDiscounted ? `${validate_component(Trending_up, "TrendingUp").$$render($$result, { size: 16 }, {}, {})} ` : `${validate_component(Tag, "Tag").$$render($$result, { size: 16 }, {}, {})} `}</span> <span class="text-sm font-bold">${escape(isSuperiorDiscounted ? "+" : "-")}${escape(displayPriceInDollars(isSuperiorDiscounted ? selectedService.discountedPrice - selectedService.price : selectedService.price - selectedService.discountedPrice))}</span></p></div>` : ``}  ${haveToPayFees ? `<div class="flex justify-between items-center font-normal text-sm text-[#616163] px-6 md:px-8"><p class="flex gap-1.5 items-center underline underline-offset-4 decoration-dashed decoration-[#DFE5E7]">Frais de service <button>${validate_component(Info, "InfoIcon").$$render($$result, { size: 12 }, {}, {})}</button></p> <p>${escape(displayPriceInDollars(finalCardenFees))}</p></div>` : ``}  ${haveToPayFees || haveModifiedPrice ? `<div class="flex justify-between items-center text-primary text-sm font-bold px-6 md:px-8"><span class="font-bold">${escape(/* @__PURE__ */ total())}</span> <span>${escape(displayPriceInDollars(haveToPayFees ? priceWithDiscountPrice + finalCardenFees : priceWithDiscountPrice))}</span></div>` : ``}  ${paymentMode === "ONLINE_UPFRONT_FEE" ? `<div class="${"py-2 " + escape(backgroundColorFeeByTheme[theme], true) + " bg-opacity-30 px-6 md:px-8"}"><div class="flex justify-between items-center text-primary font-bold text-sm"><p class="text-primary flex items-center gap-1.5">${validate_component(Wallet, "Wallet").$$render($$result, { class: iconColor, size: 18 }, {}, {})} <span class="font-bold">${escape(/* @__PURE__ */ acompte())} + ${escape(/* @__PURE__ */ frais())}</span> <button>${validate_component(Info, "InfoIcon").$$render($$result, { class: iconColor, size: 12 }, {}, {})}</button></p> <p class="text-lg">${escape(displayPriceInDollars(finalCardenFees + accomptePrice))}</p></div> <span class="text-xs text-[#616163]">${escape(displayPriceInDollars(accomptePrice))} + ${escape(displayPriceInDollars(finalCardenFees))}</span></div>` : ``}  ${paymentMode !== "CLIENT_CHOICE" ? `<div class="flex justify-between items-center text-primary text-sm font-bold px-6 md:px-8"><p class="flex items-center gap-1.5">${paymentMode === "ONLINE_UPFRONT_FEE" || paymentMode === "ONSITE_FULL" ? `${validate_component(Store, "StoreIcon").$$render($$result, { size: 18 }, {}, {})}` : `${paymentMode === "ONLINE_FULL" ? `${validate_component(Dock, "Dock").$$render($$result, { size: 18 }, {}, {})}` : ``}`} <span>${escape(paymentMode === "ONLINE_UPFRONT_FEE" ? /* @__PURE__ */ remaindToPayInPlace() : paymentMode === "ONLINE_FULL" ? /* @__PURE__ */ toBePaidOnline() : paymentMode === "ONSITE_FULL" ? /* @__PURE__ */ toBePaidOnSite() : "")}</span></p> <span>${escape(paymentMode === "ONLINE_UPFRONT_FEE" ? totalToPayInPlace : paymentMode === "ONLINE_FULL" ? displayPriceInDollars(priceWithDiscountPrice + finalCardenFees) : paymentMode === "ONSITE_FULL" ? displayPriceInDollars(priceWithDiscountPrice) : "")}</span></div>` : ``}</div>  ${paymentMode === "CLIENT_CHOICE" ? `<div class="pb-2 mt-4 md:pb-6 md:mt-6"><h1 class="font-bold text-lg">${escape(/* @__PURE__ */ paymentMethod())}</h1></div> <div class="flex flex-col gap-4 bg-white rounded-lg p-4 py-5 md:p-8 border border-[#DFE5E7]"><div class="flex gap-2 text-sm font-bold mb-2"><button type="button" class="${"rounded-lg w-full max-h-[2.7rem] h-[2.7rem] border px-2 flex items-center justify-center transition-all duration-300 ease-in-out " + escape(
      paymentMethod$12 == "in-store" ? "bg-black text-primary-foreground" : "",
      true
    )}">${escape(/* @__PURE__ */ paymentOnSite())}</button> <button type="button" class="${"rounded-lg w-full max-h-[2.7rem] h-[2.7rem] border px-3 flex items-center justify-center transition-all duration-300 ease-in-out " + escape(
      paymentMethod$12 == "credit-card" ? "bg-black text-primary-foreground" : "",
      true
    )}">${escape(/* @__PURE__ */ onlinePayment())}</button></div> <div class="flex justify-between items-center text-primary font-bold text-sm px-6 md:px-8"><p class="flex gap-1.5">${paymentMethod$12 === "in-store" ? `${validate_component(Store, "StoreIcon").$$render($$result, { size: 18 }, {}, {})}` : `${validate_component(Dock, "Dock").$$render($$result, { size: 18 }, {}, {})}`} ${escape(paymentMethod$12 === "in-store" ? /* @__PURE__ */ remaindToPayInPlace() : /* @__PURE__ */ toBePaidOnline())}</p> <p>${escape(displayPriceInDollars(priceWithDiscountPrice))}</p></div></div>` : ``} <div class="flex-1 pt-10"></div></div></div> <div class="bg-white py-4 px-6 fixed bottom-0 left-0 right-0 flex items-center justify-center flex-col gap-1 lg:w-1/2">${isOnlinePayment ? `<div class="flex gap-1.5 text-xs text-[#616163] mb-2 justify-center items-center">${validate_component(Shield_check, "ShieldCheck").$$render($$result, { size: 12 }, {}, {})} ${escape(/* @__PURE__ */ securePayment())}</div>` : ``} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "button",
        class: "rounded-lg min-h-[61px] w-full  bg-primary  "
      },
      {},
      {
        default: () => {
          return `${isOnlinePayment ? `<div class="ml-2">${paymentMode === "ONLINE_UPFRONT_FEE" ? `<div class="flex flex-col">${escape(/* @__PURE__ */ bookSlot())} ${escape(displayPriceInDollars(feesWithAccompte))} <span class="text-[#DFE5E7] text-xs">${escape(/* @__PURE__ */ remaindToPayInPlace())} ${escape(totalToPayInPlace)}</span></div>` : `${escape(/* @__PURE__ */ pay())} ${paymentMode === "ONLINE_FULL" ? `${escape(displayPriceInDollars(priceWithDiscountPrice + finalCardenFees))}` : `${escape(displayPriceInDollars(priceWithDiscountPrice))}`}`}</div>` : `${escape(/* @__PURE__ */ confirmBooking())}`}`;
        }
      }
    )}</div> ${validate_component(Drawer, "Drawer.Root").$$render(
      $$result,
      { open: isPaymentPopupOpen },
      {
        open: ($$value) => {
          isPaymentPopupOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Drawer_content, "Drawer.Content").$$render(
            $$result,
            {
              class: " z-[120] lg:w-1/2 h-full " + (isCreatingTicket ? "hidden" : "block")
            },
            {},
            {
              default: () => {
                return `${validate_component(PaymentForm, "PaymentForm").$$render(
                  $$result,
                  {
                    paymentMethod: paymentMethod$12,
                    finalPriceToPay,
                    isCreatingTicket
                  },
                  {
                    isCreatingTicket: ($$value) => {
                      isCreatingTicket = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )}`;
              }
            }
          )}`;
        }
      }
    )}</div> <div class="hidden lg:block h-screen w-1/2 lg:relative"><img${add_attribute("src", $location.location.banner, 0)} alt="banner" class="h-full w-full object-cover"> <div class="absolute inset-0 bg-black opacity-20"></div></div></div>` : ``} ${validate_component(Popup, "Popup").$$render(
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
  $$unsubscribe_shopStore();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="fixed left-0 right-0 z-[100]">${validate_component(Basket, "Basket").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};

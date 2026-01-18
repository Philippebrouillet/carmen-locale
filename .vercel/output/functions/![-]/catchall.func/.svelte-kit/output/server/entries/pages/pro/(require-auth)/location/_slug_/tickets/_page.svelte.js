import { s as setContext, g as getContext, c as create_ssr_component, f as spread, h as escape_object, a as add_attribute, e as escape, v as validate_component, d as each } from "../../../../../../../chunks/ssr.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import "dequal";
import { n as noop, i as isHTMLElement, u as useEscapeKeydown, e as executeCallbacks, w as withGet, h as isBrowser, s as styleToString$1, j as isNull, l as isNumberString, k as kbd, o as omit, m as makeElement, a as addMeltEventListener, p as createHiddenInput, q as effect, c as createElHelpers, r as safeOnMount, t as portalAttr, f as isElement } from "../../../../../../../chunks/create.js";
import { g as get_store_value, c as compute_rest_props, s as subscribe } from "../../../../../../../chunks/utils.js";
import { t as toWritableStores, o as overridable, c as createBitAttrs, r as removeUndefined, g as getOptionUpdater } from "../../../../../../../chunks/updater.js";
import { CalendarDateTime, CalendarDate, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, toCalendar, getLocalTimeZone, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameMonth, isSameDay, isToday } from "@internationalized/date";
import { u as usePortal, c as createFocusTrap, a as useModal, b as chunk, g as generateIds, s as sleep, h as handleFocus, t as tick, d as getPortalDestination, r as removeScroll, i as isValidIndex } from "../../../../../../../chunks/action.js";
import { d as derived, w as writable } from "../../../../../../../chunks/index2.js";
import { flip, offset, shift, arrow, size, autoUpdate, computePosition } from "@floating-ui/dom";
import { g as getTranslationFunctions } from "../../../../../../../chunks/index3.js";
import { c as createDispatcher } from "../../../../../../../chunks/events.js";
function derivedVisible(obj) {
  const { open, forceVisible, activeTrigger } = obj;
  return derived([open, forceVisible, activeTrigger], ([$open, $forceVisible, $activeTrigger]) => ($open || $forceVisible) && $activeTrigger !== null);
}
const defaultConfig$1 = {
  strategy: "absolute",
  placement: "top",
  gutter: 5,
  flip: true,
  sameWidth: false,
  overflowPadding: 8
};
const ARROW_TRANSFORM = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference || opts === null)
    return {
      destroy: noop
    };
  const options = { ...defaultConfig$1, ...opts };
  const arrowEl = floating.querySelector("[data-arrow=true]");
  const middleware = [];
  if (options.flip) {
    middleware.push(flip({
      boundary: options.boundary,
      padding: options.overflowPadding
    }));
  }
  const arrowOffset = isHTMLElement(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
  if (options.gutter || options.offset) {
    const data = options.gutter ? { mainAxis: options.gutter } : options.offset;
    if (data?.mainAxis != null) {
      data.mainAxis += arrowOffset;
    }
    middleware.push(offset(data));
  }
  middleware.push(shift({
    boundary: options.boundary,
    crossAxis: options.overlap,
    padding: options.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow({ element: arrowEl, padding: 8 }));
  }
  middleware.push(size({
    padding: options.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      if (options.sameWidth) {
        Object.assign(floating.style, {
          width: `${Math.round(rects.reference.width)}px`,
          minWidth: "unset"
        });
      }
      if (options.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute() {
    if (!reference || !floating)
      return;
    if (isHTMLElement(reference) && !reference.ownerDocument.documentElement.contains(reference))
      return;
    const { placement, strategy } = options;
    computePosition(reference, floating, {
      placement,
      middleware,
      strategy
    }).then((data) => {
      const x = Math.round(data.x);
      const y = Math.round(data.y);
      const [side, align] = getSideAndAlignFromPlacement(data.placement);
      floating.setAttribute("data-side", side);
      floating.setAttribute("data-align", align);
      Object.assign(floating.style, {
        position: options.strategy,
        top: `${y}px`,
        left: `${x}px`
      });
      if (isHTMLElement(arrowEl) && data.middlewareData.arrow) {
        const { x: x2, y: y2 } = data.middlewareData.arrow;
        const dir = data.placement.split("-")[0];
        arrowEl.setAttribute("data-side", dir);
        Object.assign(arrowEl.style, {
          position: "absolute",
          left: x2 != null ? `${x2}px` : "",
          top: y2 != null ? `${y2}px` : "",
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: "inherit",
          zIndex: "inherit"
        });
      }
      return data;
    });
  }
  Object.assign(floating.style, {
    position: options.strategy
  });
  return {
    destroy: autoUpdate(reference, floating, compute)
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
const defaultConfig = {
  floating: {},
  focusTrap: {},
  modal: {},
  escapeKeydown: {},
  portal: "body"
};
const usePopper = (popperElement, args) => {
  popperElement.dataset.escapee = "";
  const { anchorElement, open, options } = args;
  if (!anchorElement || !open || !options) {
    return { destroy: noop };
  }
  const opts = { ...defaultConfig, ...options };
  const callbacks = [];
  if (opts.portal !== null) {
    callbacks.push(usePortal(popperElement, opts.portal).destroy);
  }
  callbacks.push(useFloating(anchorElement, popperElement, opts.floating).destroy);
  if (opts.focusTrap !== null) {
    const { useFocusTrap } = createFocusTrap({
      immediate: true,
      escapeDeactivates: false,
      allowOutsideClick: true,
      returnFocusOnDeactivate: false,
      fallbackFocus: popperElement,
      ...opts.focusTrap
    });
    callbacks.push(useFocusTrap(popperElement).destroy);
  }
  if (opts.modal !== null) {
    callbacks.push(useModal(popperElement, {
      onClose: () => {
        if (isHTMLElement(anchorElement)) {
          open.set(false);
          anchorElement.focus();
        }
      },
      shouldCloseOnInteractOutside: (e) => {
        if (e.defaultPrevented)
          return false;
        if (isHTMLElement(anchorElement) && anchorElement.contains(e.target)) {
          return false;
        }
        return true;
      },
      ...opts.modal
    }).destroy);
  }
  if (opts.escapeKeydown !== null) {
    callbacks.push(useEscapeKeydown(popperElement, {
      enabled: open,
      handler: () => {
        open.set(false);
      },
      ...opts.escapeKeydown
    }).destroy);
  }
  const unsubscribe = executeCallbacks(...callbacks);
  return {
    destroy() {
      unsubscribe();
    }
  };
};
const defaultDateDefaults = {
  defaultValue: void 0,
  defaultPlaceholder: void 0,
  granularity: "day"
};
function getDefaultDate(props) {
  const withDefaults = { ...defaultDateDefaults, ...props };
  const { defaultValue, defaultPlaceholder, granularity } = withDefaults;
  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue[defaultValue.length - 1];
  }
  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue;
  } else if (defaultPlaceholder) {
    return defaultPlaceholder;
  } else {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const calendarDateTimeGranularities = ["hour", "minute", "second"];
    if (calendarDateTimeGranularities.includes(granularity ?? "day")) {
      return new CalendarDateTime(year, month, day, 0, 0, 0);
    }
    return new CalendarDate(year, month, day);
  }
}
function parseStringToDateValue(dateStr, referenceVal) {
  let dateValue;
  if (referenceVal instanceof ZonedDateTime) {
    dateValue = parseZonedDateTime(dateStr);
  } else if (referenceVal instanceof CalendarDateTime) {
    dateValue = parseDateTime(dateStr);
  } else {
    dateValue = parseDate(dateStr);
  }
  return dateValue.calendar !== referenceVal.calendar ? toCalendar(dateValue, referenceVal.calendar) : dateValue;
}
function toDate(dateValue, tz = getLocalTimeZone()) {
  if (dateValue instanceof ZonedDateTime) {
    return dateValue.toDate();
  } else {
    return dateValue.toDate(tz);
  }
}
function isCalendarDateTime(dateValue) {
  return dateValue instanceof CalendarDateTime;
}
function isZonedDateTime(dateValue) {
  return dateValue instanceof ZonedDateTime;
}
function hasTime(dateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
function getDaysInMonth(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  } else {
    return date.set({ day: 100 }).day;
  }
}
function isBefore(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) < 0;
}
function isAfter(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) > 0;
}
function isBeforeOrSame(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) <= 0;
}
function isAfterOrSame(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) >= 0;
}
function isBetweenInclusive(date, start, end) {
  return isAfterOrSame(date, start) && isBeforeOrSame(date, end);
}
function getLastFirstDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek });
  }
  if (firstDayOfWeek === day) {
    return date;
  }
  return date.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  if (day === lastDayOfWeek) {
    return date;
  }
  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek });
  }
  return date.add({ days: lastDayOfWeek - day });
}
function areAllDaysBetweenValid(start, end, isUnavailable, isDisabled) {
  if (isUnavailable === void 0 && isDisabled === void 0) {
    return true;
  }
  let dCurrent = start.add({ days: 1 });
  if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
    return false;
  }
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    dCurrent = dCurrent.add({ days: 1 });
    if (isDisabled?.(dCurrent) || isUnavailable?.(dCurrent)) {
      return false;
    }
  }
  return true;
}
function createFormatter(initialLocale) {
  let locale = initialLocale;
  function setLocale(newLocale) {
    locale = newLocale;
  }
  function getLocale() {
    return locale;
  }
  function custom(date, options) {
    return new DateFormatter(locale, options).format(date);
  }
  function selectedDate(date, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), {
        dateStyle: "long",
        timeStyle: "long"
      });
    } else {
      return custom(toDate(date), {
        dateStyle: "long"
      });
    }
  }
  function fullMonthAndYear(date) {
    return new DateFormatter(locale, { month: "long", year: "numeric" }).format(date);
  }
  function fullMonth(date) {
    return new DateFormatter(locale, { month: "long" }).format(date);
  }
  function fullYear(date) {
    return new DateFormatter(locale, { year: "numeric" }).format(date);
  }
  function toParts(date, options) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale, {
        ...options,
        timeZone: date.timeZone
      }).formatToParts(toDate(date));
    } else {
      return new DateFormatter(locale, options).formatToParts(toDate(date));
    }
  }
  function dayOfWeek(date, length = "narrow") {
    return new DateFormatter(locale, { weekday: length }).format(date);
  }
  function dayPeriod(date) {
    const parts = new DateFormatter(locale, {
      hour: "numeric",
      minute: "numeric"
    }).formatToParts(date);
    const value = parts.find((p) => p.type === "dayPeriod")?.value;
    if (value === "PM") {
      return "PM";
    }
    return "AM";
  }
  const defaultPartOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  function part(dateObj, type, options = {}) {
    const opts = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, opts);
    const part2 = parts.find((p) => p.type === type);
    return part2 ? part2.value : "";
  }
  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek
  };
}
function dateStore(store, defaultValue) {
  const { set, update, subscribe: subscribe2, get } = withGet(store);
  function add(duration) {
    update((d) => {
      return d.add(duration);
    });
  }
  function nextPage(amount) {
    update((d) => {
      return d.set({ day: 1 }).add({ months: amount });
    });
  }
  function prevPage(amount) {
    update((d) => {
      return d.set({ day: 1 }).subtract({ months: amount });
    });
  }
  function subtract(duration) {
    update((d) => {
      return d.subtract(duration);
    });
  }
  function setDate(fields, disambiguation) {
    if (disambiguation) {
      update((d) => {
        return d.set(fields, disambiguation);
      });
      return;
    }
    update((d) => {
      return d.set(fields);
    });
  }
  function reset() {
    update(() => {
      return defaultValue;
    });
  }
  function toWritable() {
    return {
      set,
      subscribe: subscribe2,
      update,
      get
    };
  }
  return {
    get,
    set,
    update,
    subscribe: subscribe2,
    add,
    subtract,
    setDate,
    reset,
    toWritable,
    nextPage,
    prevPage
  };
}
const supportedLocales = [
  "ach",
  "af",
  "am",
  "an",
  "ar",
  "ast",
  "az",
  "be",
  "bg",
  "bn",
  "br",
  "bs",
  "ca",
  "cak",
  "ckb",
  "cs",
  "cy",
  "da",
  "de",
  "dsb",
  "el",
  "en",
  "eo",
  "es",
  "et",
  "eu",
  "fa",
  "ff",
  "fi",
  "fr",
  "fy",
  "ga",
  "gd",
  "gl",
  "he",
  "hr",
  "hsb",
  "hu",
  "ia",
  "id",
  "it",
  "ja",
  "ka",
  "kk",
  "kn",
  "ko",
  "lb",
  "lo",
  "lt",
  "lv",
  "meh",
  "ml",
  "ms",
  "nl",
  "nn",
  "no",
  "oc",
  "pl",
  "pt",
  "rm",
  "ro",
  "ru",
  "sc",
  "scn",
  "sk",
  "sl",
  "sr",
  "sv",
  "szl",
  "tg",
  "th",
  "tr",
  "uk",
  "zh-CN",
  "zh-TW"
];
const placeholderFields = ["year", "month", "day"];
const placeholders = {
  ach: { year: "mwaka", month: "dwe", day: "nino" },
  af: { year: "jjjj", month: "mm", day: "dd" },
  am: { year: "ዓዓዓዓ", month: "ሚሜ", day: "ቀቀ" },
  an: { year: "aaaa", month: "mm", day: "dd" },
  ar: { year: "سنة", month: "شهر", day: "يوم" },
  ast: { year: "aaaa", month: "mm", day: "dd" },
  az: { year: "iiii", month: "aa", day: "gg" },
  be: { year: "гггг", month: "мм", day: "дд" },
  bg: { year: "гггг", month: "мм", day: "дд" },
  bn: { year: "yyyy", month: "মিমি", day: "dd" },
  br: { year: "bbbb", month: "mm", day: "dd" },
  bs: { year: "gggg", month: "mm", day: "dd" },
  ca: { year: "aaaa", month: "mm", day: "dd" },
  cak: { year: "jjjj", month: "ii", day: "q'q'" },
  ckb: { year: "ساڵ", month: "مانگ", day: "ڕۆژ" },
  cs: { year: "rrrr", month: "mm", day: "dd" },
  cy: { year: "bbbb", month: "mm", day: "dd" },
  da: { year: "åååå", month: "mm", day: "dd" },
  de: { year: "jjjj", month: "mm", day: "tt" },
  dsb: { year: "llll", month: "mm", day: "źź" },
  el: { year: "εεεε", month: "μμ", day: "ηη" },
  en: { year: "yyyy", month: "mm", day: "dd" },
  eo: { year: "jjjj", month: "mm", day: "tt" },
  es: { year: "aaaa", month: "mm", day: "dd" },
  et: { year: "aaaa", month: "kk", day: "pp" },
  eu: { year: "uuuu", month: "hh", day: "ee" },
  fa: { year: "سال", month: "ماه", day: "روز" },
  ff: { year: "hhhh", month: "ll", day: "ññ" },
  fi: { year: "vvvv", month: "kk", day: "pp" },
  fr: { year: "aaaa", month: "mm", day: "jj" },
  fy: { year: "jjjj", month: "mm", day: "dd" },
  ga: { year: "bbbb", month: "mm", day: "ll" },
  gd: { year: "bbbb", month: "mm", day: "ll" },
  gl: { year: "aaaa", month: "mm", day: "dd" },
  he: { year: "שנה", month: "חודש", day: "יום" },
  hr: { year: "gggg", month: "mm", day: "dd" },
  hsb: { year: "llll", month: "mm", day: "dd" },
  hu: { year: "éééé", month: "hh", day: "nn" },
  ia: { year: "aaaa", month: "mm", day: "dd" },
  id: { year: "tttt", month: "bb", day: "hh" },
  it: { year: "aaaa", month: "mm", day: "gg" },
  ja: { year: " 年 ", month: "月", day: "日" },
  ka: { year: "წწწწ", month: "თთ", day: "რრ" },
  kk: { year: "жжжж", month: "аа", day: "кк" },
  kn: { year: "ವವವವ", month: "ಮಿಮೀ", day: "ದಿದಿ" },
  ko: { year: "연도", month: "월", day: "일" },
  lb: { year: "jjjj", month: "mm", day: "dd" },
  lo: { year: "ປປປປ", month: "ດດ", day: "ວວ" },
  lt: { year: "mmmm", month: "mm", day: "dd" },
  lv: { year: "gggg", month: "mm", day: "dd" },
  meh: { year: "aaaa", month: "mm", day: "dd" },
  ml: { year: "വർഷം", month: "മാസം", day: "തീയതി" },
  ms: { year: "tttt", month: "mm", day: "hh" },
  nl: { year: "jjjj", month: "mm", day: "dd" },
  nn: { year: "åååå", month: "mm", day: "dd" },
  no: { year: "åååå", month: "mm", day: "dd" },
  oc: { year: "aaaa", month: "mm", day: "jj" },
  pl: { year: "rrrr", month: "mm", day: "dd" },
  pt: { year: "aaaa", month: "mm", day: "dd" },
  rm: { year: "oooo", month: "mm", day: "dd" },
  ro: { year: "aaaa", month: "ll", day: "zz" },
  ru: { year: "гггг", month: "мм", day: "дд" },
  sc: { year: "aaaa", month: "mm", day: "dd" },
  scn: { year: "aaaa", month: "mm", day: "jj" },
  sk: { year: "rrrr", month: "mm", day: "dd" },
  sl: { year: "llll", month: "mm", day: "dd" },
  sr: { year: "гггг", month: "мм", day: "дд" },
  sv: { year: "åååå", month: "mm", day: "dd" },
  szl: { year: "rrrr", month: "mm", day: "dd" },
  tg: { year: "сссс", month: "мм", day: "рр" },
  th: { year: "ปปปป", month: "ดด", day: "วว" },
  tr: { year: "yyyy", month: "aa", day: "gg" },
  uk: { year: "рррр", month: "мм", day: "дд" },
  "zh-CN": { year: "年", month: "月", day: "日" },
  "zh-TW": { year: "年", month: "月", day: "日" }
};
function getPlaceholderObj(locale) {
  if (!isSupportedLocale(locale)) {
    const localeLanguage = getLocaleLanguage(locale);
    if (!isSupportedLocale(localeLanguage)) {
      return placeholders.en;
    } else {
      return placeholders[localeLanguage];
    }
  } else {
    return placeholders[locale];
  }
}
function getPlaceholder(field, value, locale) {
  if (isPlaceholderField(field)) {
    return getPlaceholderObj(locale)[field];
  }
  if (isDefaultField(field)) {
    return value;
  }
  if (isTimeField(field)) {
    return "––";
  }
  return "";
}
function isSupportedLocale(locale) {
  return supportedLocales.includes(locale);
}
function isPlaceholderField(field) {
  return placeholderFields.includes(field);
}
function isTimeField(field) {
  return field === "hour" || field === "minute" || field === "second";
}
function isDefaultField(field) {
  return field === "era" || field === "dayPeriod";
}
function getLocaleLanguage(locale) {
  if (Intl.Locale) {
    return new Intl.Locale(locale).language;
  }
  return locale.split("-")[0];
}
function initAnnouncer() {
  if (!isBrowser)
    return null;
  let el = document.querySelector("[data-melt-announcer]");
  if (!isHTMLElement(el)) {
    const div = document.createElement("div");
    div.style.cssText = styleToString$1({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    div.setAttribute("data-melt-announcer", "");
    div.appendChild(createLog("assertive"));
    div.appendChild(createLog("polite"));
    el = div;
    document.body.insertBefore(el, document.body.firstChild);
  }
  function createLog(kind) {
    const log = document.createElement("div");
    log.role = "log";
    log.ariaLive = kind;
    log.setAttribute("aria-relevant", "additions");
    return log;
  }
  function getLog(kind) {
    if (!isHTMLElement(el))
      return null;
    const log = el.querySelector(`[aria-live="${kind}"]`);
    if (!isHTMLElement(log))
      return null;
    return log;
  }
  return {
    getLog
  };
}
function getAnnouncer() {
  const announcer = initAnnouncer();
  function announce(value, kind = "assertive", timeout = 7500) {
    if (!announcer || !isBrowser)
      return;
    const log = announcer.getLog(kind);
    const content = document.createElement("div");
    if (typeof value === "number") {
      value = value.toString();
    } else if (value === null) {
      value = "Empty";
    } else {
      value = value.trim();
    }
    content.innerText = value;
    if (kind === "assertive") {
      log?.replaceChildren(content);
    } else {
      log?.appendChild(content);
    }
    return setTimeout(() => {
      content.remove();
    }, timeout);
  }
  return {
    announce
  };
}
const DATE_SEGMENT_PARTS = ["day", "month", "year"];
const TIME_SEGMENT_PARTS = ["hour", "minute", "second", "dayPeriod"];
const NON_EDITABLE_SEGMENT_PARTS = ["literal", "timeZoneName"];
const EDITABLE_SEGMENT_PARTS = [...DATE_SEGMENT_PARTS, ...TIME_SEGMENT_PARTS];
const ALL_SEGMENT_PARTS = [
  ...EDITABLE_SEGMENT_PARTS,
  ...NON_EDITABLE_SEGMENT_PARTS
];
function initializeSegmentValues(granularity) {
  const calendarDateTimeGranularities = ["hour", "minute", "second"];
  const initialParts = EDITABLE_SEGMENT_PARTS.map((part) => {
    if (part === "dayPeriod") {
      return [part, "AM"];
    }
    return [part, null];
  }).filter(([key]) => {
    if (key === "literal" || key === null)
      return false;
    if (granularity === "day") {
      return !calendarDateTimeGranularities.includes(key);
    } else {
      return true;
    }
  });
  return Object.fromEntries(initialParts);
}
function createContentObj(props) {
  const { segmentValues, formatter, locale, dateRef } = props;
  const content = Object.keys(segmentValues).reduce((obj, part) => {
    if (!isSegmentPart(part))
      return obj;
    if ("hour" in segmentValues && part === "dayPeriod") {
      const value = segmentValues[part];
      if (!isNull(value)) {
        obj[part] = value;
      } else {
        obj[part] = getPlaceholder(part, "AM", locale);
      }
    } else {
      obj[part] = getPartContent(part);
    }
    return obj;
  }, {});
  function getPartContent(part) {
    if ("hour" in segmentValues) {
      const value = segmentValues[part];
      if (!isNull(value)) {
        return formatter.part(dateRef.set({ [part]: value }), part, {
          hourCycle: props.hourCycle === 24 ? "h24" : void 0
        });
      } else {
        return getPlaceholder(part, "", locale);
      }
    } else {
      if (isDateSegmentPart(part)) {
        const value = segmentValues[part];
        if (!isNull(value)) {
          return formatter.part(dateRef.set({ [part]: value }), part);
        } else {
          return getPlaceholder(part, "", locale);
        }
      }
      return "";
    }
  }
  return content;
}
function createContentArr(props) {
  const { granularity, dateRef, formatter, contentObj, hideTimeZone, hourCycle } = props;
  const parts = formatter.toParts(dateRef, getOptsByGranularity(granularity, hourCycle));
  const segmentContentArr = parts.map((part) => {
    const defaultParts = ["literal", "dayPeriod", "timeZoneName", null];
    if (defaultParts.includes(part.type) || !isSegmentPart(part.type)) {
      return {
        part: part.type,
        value: part.value
      };
    }
    return {
      part: part.type,
      value: contentObj[part.type]
    };
  }).filter((segment) => {
    if (isNull(segment.part) || isNull(segment.value))
      return false;
    if (segment.part === "timeZoneName" && (!isZonedDateTime(dateRef) || hideTimeZone)) {
      return false;
    }
    return true;
  });
  return segmentContentArr;
}
function createContent(props) {
  const contentObj = createContentObj(props);
  const contentArr = createContentArr({
    contentObj,
    ...props
  });
  return {
    obj: contentObj,
    arr: contentArr
  };
}
function getOptsByGranularity(granularity, hourCycle) {
  const opts = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    hourCycle: hourCycle === 24 ? "h24" : void 0,
    hour12: hourCycle === 24 ? false : void 0
  };
  if (granularity === "day") {
    delete opts.second;
    delete opts.hour;
    delete opts.minute;
    delete opts.timeZoneName;
  }
  if (granularity === "hour") {
    delete opts.minute;
  }
  if (granularity === "minute") {
    delete opts.second;
  }
  return opts;
}
function initSegmentStates() {
  return EDITABLE_SEGMENT_PARTS.reduce((acc, key) => {
    acc[key] = {
      lastKeyZero: false,
      hasLeftFocus: true,
      hasTouched: false
    };
    return acc;
  }, {});
}
function isDateSegmentPart(part) {
  return DATE_SEGMENT_PARTS.includes(part);
}
function isSegmentPart(part) {
  return EDITABLE_SEGMENT_PARTS.includes(part);
}
function isAnySegmentPart(part) {
  return ALL_SEGMENT_PARTS.includes(part);
}
function getUsedSegments(id) {
  if (!isBrowser)
    return [];
  const usedSegments = getSegments(id).map((el) => el.dataset.segment).filter((part) => {
    return EDITABLE_SEGMENT_PARTS.includes(part);
  });
  return usedSegments;
}
function getValueFromSegments(props) {
  const { segmentObj, id, dateRef } = props;
  const usedSegments = getUsedSegments(id);
  let date = dateRef;
  usedSegments.forEach((part) => {
    if ("hour" in segmentObj) {
      const value = segmentObj[part];
      if (isNull(value))
        return;
      date = date.set({ [part]: segmentObj[part] });
      return;
    } else if (isDateSegmentPart(part)) {
      const value = segmentObj[part];
      if (isNull(value))
        return;
      date = date.set({ [part]: segmentObj[part] });
      return;
    }
  });
  return date;
}
function areAllSegmentsFilled(segmentValues, id) {
  const usedSegments = getUsedSegments(id);
  return usedSegments.every((part) => {
    if ("hour" in segmentValues) {
      return segmentValues[part] !== null;
    } else if (isDateSegmentPart(part)) {
      return segmentValues[part] !== null;
    }
  });
}
function getPartFromNode(node) {
  const part = node.dataset.segment;
  if (!isAnySegmentPart(part))
    return null;
  return part;
}
function isDateAndTimeSegmentObj(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  return Object.entries(obj).every(([key, value]) => {
    const validKey = TIME_SEGMENT_PARTS.includes(key) || DATE_SEGMENT_PARTS.includes(key);
    const validValue = key === "dayPeriod" ? value === "AM" || value === "PM" || value === null : typeof value === "number" || value === null;
    return validKey && validValue;
  });
}
function inferGranularity(value, granularity) {
  if (granularity) {
    return granularity;
  }
  if (hasTime(value)) {
    return "minute";
  }
  return "day";
}
function isAcceptableSegmentKey(key) {
  const acceptableSegmentKeys = [
    kbd.ENTER,
    kbd.ARROW_UP,
    kbd.ARROW_DOWN,
    kbd.ARROW_LEFT,
    kbd.ARROW_RIGHT,
    kbd.BACKSPACE,
    kbd.SPACE
  ];
  if (acceptableSegmentKeys.includes(key))
    return true;
  if (isNumberString(key))
    return true;
  return false;
}
function syncSegmentValues(props) {
  const { value, updatingDayPeriod, segmentValues, formatter } = props;
  const dateValues = DATE_SEGMENT_PARTS.map((part) => {
    return [part, value[part]];
  });
  if ("hour" in value) {
    const timeValues = TIME_SEGMENT_PARTS.map((part) => {
      if (part === "dayPeriod") {
        const $updatingDayPeriod = get_store_value(updatingDayPeriod);
        if ($updatingDayPeriod) {
          return [part, $updatingDayPeriod];
        } else {
          return [part, formatter.dayPeriod(toDate(value))];
        }
      }
      return [part, value[part]];
    });
    const mergedSegmentValues = [...dateValues, ...timeValues];
    segmentValues.set(Object.fromEntries(mergedSegmentValues));
    updatingDayPeriod.set(null);
    return;
  }
  segmentValues.set(Object.fromEntries(dateValues));
}
function isFirstSegment(id, fieldId) {
  if (!isBrowser)
    return false;
  const segments = getSegments(fieldId);
  return segments.length ? segments[0].id === id : false;
}
function setDescription(id, formatter, value) {
  if (!isBrowser)
    return;
  const valueString = formatter.selectedDate(value);
  const el = document.getElementById(id);
  if (!el) {
    const div = document.createElement("div");
    div.style.cssText = styleToString$1({
      display: "none"
    });
    div.id = id;
    div.innerText = `Selected Date: ${valueString}`;
    document.body.appendChild(div);
  } else {
    el.innerText = `Selected Date: ${valueString}`;
  }
}
function removeDescriptionElement$1(id) {
  if (!isBrowser)
    return;
  const el = document.getElementById(id);
  if (!el)
    return;
  document.body.removeChild(el);
}
function handleSegmentNavigation(e, fieldId) {
  const currentTarget = e.currentTarget;
  if (!isHTMLElement(currentTarget))
    return;
  const { prev, next } = getPrevNextSegments(currentTarget, fieldId);
  if (e.key === kbd.ARROW_LEFT) {
    if (!prev)
      return;
    prev.focus();
  } else if (e.key === kbd.ARROW_RIGHT) {
    if (!next)
      return;
    next.focus();
  }
}
function getNextSegment(node, segments) {
  const index = segments.indexOf(node);
  if (index === segments.length - 1 || index === -1)
    return null;
  const nextIndex = index + 1;
  const nextSegment = segments[nextIndex];
  return nextSegment;
}
function getPrevSegment(node, segments) {
  const index = segments.indexOf(node);
  if (index === 0 || index === -1)
    return null;
  const prevIndex = index - 1;
  const prevSegment = segments[prevIndex];
  return prevSegment;
}
function getPrevNextSegments(node, fieldId) {
  const segments = getSegments(fieldId);
  if (!segments.length) {
    return {
      next: null,
      prev: null
    };
  }
  return {
    next: getNextSegment(node, segments),
    prev: getPrevSegment(node, segments)
  };
}
function moveToNextSegment(e, fieldId) {
  const node = e.currentTarget;
  if (!isHTMLElement(node))
    return;
  const { next } = getPrevNextSegments(node, fieldId);
  if (!next)
    return;
  next.focus();
}
function isSegmentNavigationKey(key) {
  if (key === kbd.ARROW_RIGHT || key === kbd.ARROW_LEFT)
    return true;
  return false;
}
function getSegments(id) {
  const inputContainer = document.getElementById(id);
  if (!isHTMLElement(inputContainer))
    return [];
  const segments = Array.from(inputContainer.querySelectorAll("[data-segment]")).filter((el) => {
    if (!isHTMLElement(el))
      return false;
    const segment = el.dataset.segment;
    if (segment === "trigger")
      return true;
    if (!isAnySegmentPart(segment) || segment === "literal")
      return false;
    return true;
  });
  return segments;
}
function getFirstSegment(id) {
  const segments = getSegments(id);
  return segments[0];
}
function isCalendarCell(node) {
  if (!isHTMLElement(node))
    return false;
  if (!node.hasAttribute("data-melt-calendar-cell"))
    return false;
  return true;
}
function getDaysBetween(start, end) {
  const days = [];
  let dCurrent = start.add({ days: 1 });
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    days.push(dCurrent);
    dCurrent = dCurrent.add({ days: 1 });
  }
  return days;
}
function createMonth(props) {
  const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
  const daysInMonth = getDaysInMonth(dateObj);
  const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);
  const lastSunday = getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, locale);
  const nextSaturday = getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, locale);
  const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
  const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
  const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;
  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;
    let startFrom = nextMonthDays[nextMonthDays.length - 1];
    if (!startFrom) {
      startFrom = dateObj.add({ months: 1 }).set({ day: 1 });
    }
    const extraDaysArray = Array.from({ length: extraDays }, (_, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });
    nextMonthDays.push(...extraDaysArray);
  }
  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
  const weeks = chunk(allDays, 7);
  return {
    value: dateObj,
    dates: allDays,
    weeks
  };
}
function createMonths(props) {
  const { numberOfMonths, dateObj, ...monthProps } = props;
  const months = [];
  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(createMonth({
      ...monthProps,
      dateObj
    }));
    return months;
  }
  months.push(createMonth({
    ...monthProps,
    dateObj
  }));
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(createMonth({
      ...monthProps,
      dateObj: nextMonth
    }));
  }
  return months;
}
function getSelectableCells(calendarId) {
  const node = document.getElementById(calendarId);
  if (!node)
    return [];
  const selectableSelector = `[data-melt-calendar-cell]:not([data-disabled]):not([data-outside-visible-months])`;
  return Array.from(node.querySelectorAll(selectableSelector)).filter((el) => isHTMLElement(el));
}
function setPlaceholderToNodeValue(node, placeholder) {
  const cellValue = node.getAttribute("data-value");
  if (!cellValue)
    return;
  placeholder.set(parseStringToDateValue(cellValue, get_store_value(placeholder)));
}
const defaults$4 = {
  isDateUnavailable: void 0,
  value: void 0,
  hourCycle: void 0,
  locale: "en",
  granularity: void 0,
  hideTimeZone: false,
  disabled: false,
  readonly: false,
  readonlySegments: void 0,
  name: void 0,
  required: false,
  minValue: void 0,
  maxValue: void 0
};
const prefix = "dateField";
const { name: name$3 } = createElHelpers(prefix);
const dateFieldIdParts = [
  "field",
  "label",
  "description",
  "validation",
  "day",
  "month",
  "year",
  "hour",
  "minute",
  "second",
  "dayPeriod",
  "timeZoneName"
];
function createDateField(props) {
  const withDefaults = { ...defaults$4, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "placeholder", "ids"));
  const { locale, granularity, hourCycle, hideTimeZone, isDateUnavailable, disabled, readonly, readonlySegments, name: nameStore, required, minValue, maxValue } = options;
  const defaultDate = getDefaultDate({
    defaultPlaceholder: withDefaults.defaultPlaceholder,
    granularity: withDefaults.granularity,
    defaultValue: withDefaults.defaultValue
  });
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults.onValueChange);
  const isInvalid = derived([value, isDateUnavailable, minValue, maxValue], ([$value, $isDateUnavailable, $minValue, $maxValue]) => {
    if (!$value)
      return false;
    if ($isDateUnavailable?.($value))
      return true;
    if ($minValue && isBefore($value, $minValue))
      return true;
    if ($maxValue && isBefore($maxValue, $value))
      return true;
    return false;
  });
  const placeholderWritable = withDefaults.placeholder ?? writable(withDefaults.defaultPlaceholder ?? defaultDate);
  const placeholder = dateStore(overridable(placeholderWritable, withDefaults.onPlaceholderChange), withDefaults.defaultPlaceholder ?? defaultDate);
  const inferredGranularity = withGet.derived([placeholder, granularity], ([$placeholder, $granularity]) => {
    if ($granularity) {
      return $granularity;
    } else {
      return inferGranularity($placeholder, $granularity);
    }
  });
  const formatter = createFormatter(locale.get());
  const initialSegments = initializeSegmentValues(inferredGranularity.get());
  const segmentValues = withGet.writable(structuredClone(initialSegments));
  let announcer = getAnnouncer();
  const updatingDayPeriod = writable(null);
  const readonlySegmentsSet = withGet(derived(readonlySegments, ($readonlySegments) => new Set($readonlySegments)));
  const ids = toWritableStores({ ...generateIds(dateFieldIdParts), ...withDefaults.ids });
  const idValues = derived([
    ids.field,
    ids.label,
    ids.description,
    ids.validation,
    ids.day,
    ids.month,
    ids.year,
    ids.hour,
    ids.minute,
    ids.second,
    ids.dayPeriod,
    ids.timeZoneName
  ], ([$fieldId, $labelId, $descriptionId, $validationId, $dayId, $monthId, $yearId, $hourId, $minuteId, $secondId, $dayPeriodId, $timeZoneNameId]) => {
    return {
      field: $fieldId,
      label: $labelId,
      description: $descriptionId,
      validation: $validationId,
      day: $dayId,
      month: $monthId,
      year: $yearId,
      hour: $hourId,
      minute: $minuteId,
      second: $secondId,
      dayPeriod: $dayPeriodId,
      timeZoneName: $timeZoneNameId
    };
  });
  const defaultSegmentAttrs = {
    role: "spinbutton",
    contenteditable: true,
    tabindex: 0,
    spellcheck: false,
    inputmode: "numeric",
    autocorrect: "off",
    enterkeyhint: "next",
    style: styleToString$1({
      "caret-color": "transparent"
    })
  };
  const states = initSegmentStates();
  const allSegmentContent = derived([segmentValues, locale, inferredGranularity, hideTimeZone, hourCycle], ([$segmentValues, $locale, $inferredGranularity, $hideTimeZone, $hourCycle]) => {
    return createContent({
      segmentValues: $segmentValues,
      formatter,
      locale: $locale,
      granularity: $inferredGranularity,
      dateRef: placeholder.get(),
      hideTimeZone: $hideTimeZone,
      hourCycle: $hourCycle
    });
  });
  const segmentContents = derived(allSegmentContent, ($allSegmentContent) => $allSegmentContent.arr);
  const segmentContentsObj = derived(allSegmentContent, ($allSegmentContent) => $allSegmentContent.obj);
  const label = makeElement(name$3("label"), {
    stores: [isInvalid, disabled, ids.label],
    returned: ([$isInvalid, $disabled, $labelId]) => {
      return {
        id: $labelId,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const firstSegment = getFirstSegment(ids.field.get());
        if (!firstSegment)
          return;
        sleep(1).then(() => firstSegment.focus());
      }), addMeltEventListener(node, "mousedown", (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const validation = makeElement(name$3("validation"), {
    stores: [isInvalid, ids.validation],
    returned: ([$isInvalid, $validationId]) => {
      const validStyle = styleToString$1({
        display: "none"
      });
      return {
        id: $validationId,
        "data-invalid": $isInvalid ? "" : void 0,
        style: $isInvalid ? void 0 : validStyle
      };
    }
  });
  const hiddenInput = createHiddenInput({
    prefix,
    value: derived(value, ($value) => $value?.toString() ?? ""),
    name: nameStore,
    disabled,
    required
  });
  const fieldIdDeps = derived([ids.field, ids.label, ids.description, ids.label], ([$fieldId, $labelId, $descriptionId, $validationId]) => {
    return {
      field: $fieldId,
      label: $labelId,
      description: $descriptionId,
      validation: $validationId
    };
  });
  const field = makeElement(name$3("field"), {
    stores: [value, isInvalid, disabled, readonly, fieldIdDeps],
    returned: ([$value, $isInvalid, $disabled, $readonly, $ids]) => {
      const describedBy = $value ? `${$ids.description}${$isInvalid ? ` ${$ids.validation}` : ""}` : `${$ids.description}`;
      return {
        role: "group",
        id: $ids.field,
        "aria-labelledby": $ids.label,
        "aria-describedby": describedBy,
        "aria-disabled": $disabled ? "true" : void 0,
        "aria-readonly": $readonly ? "true" : void 0,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0
      };
    },
    // even if we don't need the element we need to specify it
    // or TS will complain when svelte tries to pass it
    action: (_node) => {
      announcer = getAnnouncer();
      return {
        destroy() {
          removeDescriptionElement$1(ids.description.get());
        }
      };
    }
  });
  const segmentBuilders = {
    day: {
      attrs: daySegmentAttrs,
      action: daySegmentAction
    },
    month: {
      attrs: monthSegmentAttrs,
      action: monthSegmentAction
    },
    year: {
      attrs: yearSegmentAttrs,
      action: yearSegmentAction
    },
    hour: {
      attrs: hourSegmentAttrs,
      action: hourSegmentAction
    },
    minute: {
      attrs: minuteSegmentAttrs,
      action: minuteSegmentAction
    },
    second: {
      attrs: secondSegmentAttrs,
      action: secondSegmentAction
    },
    dayPeriod: {
      attrs: dayPeriodSegmentAttrs,
      action: dayPeriodSegmentAction
    },
    literal: {
      attrs: literalSegmentAttrs,
      action: literalSegmentAction
    },
    timeZoneName: {
      attrs: timeZoneSegmentAttrs,
      action: timeZoneSegmentAction
    }
  };
  const segment = makeElement(name$3("segment"), {
    stores: [
      segmentValues,
      hourCycle,
      placeholder,
      value,
      isInvalid,
      disabled,
      readonly,
      readonlySegmentsSet,
      idValues,
      locale
    ],
    returned: ([$segmentValues, $hourCycle, $placeholder, $value, $isInvalid, $disabled, $readonly, $readonlySegmentsSet, $idValues, _]) => {
      const props2 = {
        segmentValues: $segmentValues,
        hourCycle: $hourCycle,
        placeholder: $placeholder,
        ids: $idValues
      };
      return (part) => {
        const inReadonlySegments = $readonlySegmentsSet.has(part);
        const defaultAttrs = {
          ...getSegmentAttrs(part, props2),
          "aria-invalid": $isInvalid ? "true" : void 0,
          "aria-disabled": $disabled ? "true" : void 0,
          "aria-readonly": $readonly || inReadonlySegments ? "true" : void 0,
          "data-invalid": $isInvalid ? "" : void 0,
          "data-disabled": $disabled ? "" : void 0,
          "data-segment": `${part}`
        };
        if (part === "literal") {
          return defaultAttrs;
        }
        const id = $idValues[part];
        const hasDescription = isFirstSegment(id, $idValues.field) || $value;
        const describedBy = hasDescription ? `${hasDescription} ${$isInvalid ? $idValues.validation : ""}` : void 0;
        return {
          ...defaultAttrs,
          id: $idValues[part],
          "aria-labelledby": getLabelledBy(part),
          contenteditable: $readonly || inReadonlySegments || $disabled ? false : true,
          "aria-describedby": describedBy,
          tabindex: $disabled ? void 0 : 0
        };
      };
    },
    action: (node) => getSegmentAction(node)
  });
  function updateSegment(part, cb) {
    if (disabled.get() || readonly.get() || readonlySegmentsSet.get().has(part))
      return;
    segmentValues.update((prev) => {
      const dateRef = placeholder.get();
      if (isDateAndTimeSegmentObj(prev)) {
        const pVal = prev[part];
        const castCb = cb;
        if (part === "month") {
          const next2 = castCb(pVal);
          if (part === "month" && next2 !== null && prev.day !== null) {
            const date = dateRef.set({ month: next2 });
            const daysInMonth = getDaysInMonth(toDate(date));
            if (prev.day > daysInMonth) {
              prev.day = daysInMonth;
            }
          }
          return {
            ...prev,
            [part]: next2
          };
        } else if (part === "dayPeriod") {
          const next2 = castCb(pVal);
          updatingDayPeriod.set(next2);
          const date = placeholder.get();
          if ("hour" in date) {
            const trueHour = date.hour;
            if (next2 === "AM") {
              if (trueHour >= 12) {
                prev.hour = trueHour - 12;
              }
            } else if (next2 === "PM") {
              if (trueHour < 12) {
                prev.hour = trueHour + 12;
              }
            }
          }
          return {
            ...prev,
            [part]: next2
          };
        } else if (part === "hour") {
          const next2 = castCb(pVal);
          if (next2 !== null && prev.dayPeriod !== null) {
            const dayPeriod = formatter.dayPeriod(toDate(dateRef.set({ hour: next2 })));
            if (dayPeriod === "AM" || dayPeriod === "PM") {
              prev.dayPeriod = dayPeriod;
            }
          }
          return {
            ...prev,
            [part]: next2
          };
        }
        const next = castCb(pVal);
        return {
          ...prev,
          [part]: next
        };
      } else if (isDateSegmentPart(part)) {
        const pVal = prev[part];
        const castCb = cb;
        const next = castCb(pVal);
        if (part === "month" && next !== null && prev.day !== null) {
          const date = dateRef.set({ month: next });
          const daysInMonth = getDaysInMonth(toDate(date));
          if (prev.day > daysInMonth) {
            prev.day = daysInMonth;
          }
        }
        return {
          ...prev,
          [part]: next
        };
      }
      return prev;
    });
    const $segmentValues = segmentValues.get();
    const $fieldId = ids.field.get();
    if (areAllSegmentsFilled($segmentValues, $fieldId)) {
      value.set(getValueFromSegments({
        segmentObj: $segmentValues,
        id: $fieldId,
        dateRef: placeholder.get()
      }));
      updatingDayPeriod.set(null);
    } else {
      value.set(void 0);
      segmentValues.set($segmentValues);
    }
  }
  function handleSegmentKeydown(e, part) {
    const $disabled = disabled.get();
    if (e.key !== kbd.TAB) {
      e.preventDefault();
    }
    if ($disabled)
      return;
    const segmentKeydownHandlers = {
      day: handleDaySegmentKeydown,
      month: handleMonthSegmentKeydown,
      year: handleYearSegmentKeydown,
      hour: handleHourSegmentKeydown,
      minute: handleMinuteSegmentKeydown,
      second: handleSecondSegmentKeydown,
      dayPeriod: handleDayPeriodSegmentKeydown,
      timeZoneName: handleTimeZoneSegmentKeydown
    };
    segmentKeydownHandlers[part](e);
  }
  function handleSegmentClick(e) {
    const $disabled = disabled.get();
    if ($disabled) {
      e.preventDefault();
      return;
    }
  }
  function daySegmentAttrs(props2) {
    const { segmentValues: segmentValues2, placeholder: placeholder2, ids: ids2 } = props2;
    const isEmpty = segmentValues2.day === null;
    const date = segmentValues2.day ? placeholder2.set({ day: segmentValues2.day }) : placeholder2;
    const valueNow = date.day;
    const valueMin = 1;
    const valueMax = getDaysInMonth(toDate(date));
    const valueText = isEmpty ? "Empty" : `${valueNow}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.day,
      "aria-label": `day,`,
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function daySegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "day")), addMeltEventListener(node, "focusout", () => states.day.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleDaySegmentKeydown(e) {
    if (!isAcceptableSegmentKey(e.key)) {
      return;
    }
    const $segmentMonthValue = segmentValues.get().month;
    const $placeholder = placeholder.get();
    const daysInMonth = $segmentMonthValue ? getDaysInMonth($placeholder.set({ month: $segmentMonthValue })) : getDaysInMonth($placeholder);
    if (e.key === kbd.ARROW_UP) {
      updateSegment("day", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.day;
          announcer.announce(next2);
          return next2;
        }
        const next = $placeholder.set({ day: prev }).cycle("day", 1).day;
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("day", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.day;
          announcer.announce(next2);
          return next2;
        }
        const next = $placeholder.set({ day: prev }).cycle("day", -1).day;
        announcer.announce(next);
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      const num = parseInt(e.key);
      let moveToNext = false;
      updateSegment("day", (prev) => {
        const max = daysInMonth;
        const maxStart = Math.floor(max / 10);
        if (states.day.hasLeftFocus) {
          prev = null;
          states.day.hasLeftFocus = false;
        }
        if (prev === null) {
          if (num === 0) {
            states.day.lastKeyZero = true;
            return null;
          }
          if (states.day.lastKeyZero || num > maxStart) {
            moveToNext = true;
          }
          states.day.lastKeyZero = false;
          return num;
        }
        const digits = prev.toString().length;
        const total = parseInt(prev.toString() + num.toString());
        if (digits === 2 || total > max) {
          if (num > maxStart || total > max) {
            moveToNext = true;
          }
          announcer.announce(num);
          return num;
        }
        moveToNext = true;
        announcer.announce(total);
        return total;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      const currentTarget = e.currentTarget;
      if (!isHTMLElement(currentTarget))
        return;
      updateSegment("day", (prev) => {
        if (prev === null)
          return null;
        const str = prev.toString();
        if (str.length === 1)
          return null;
        return parseInt(str.slice(0, -1));
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function monthSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, placeholder: placeholder2, ids: ids2 } = props2;
    const isEmpty = segmentValues2.month === null;
    const date = segmentValues2.month ? placeholder2.set({ month: segmentValues2.month }) : placeholder2;
    const valueNow = date.month;
    const valueMin = 1;
    const valueMax = 12;
    const valueText = isEmpty ? "Empty" : `${valueNow} - ${formatter.fullMonth(toDate(date))}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.month,
      "aria-label": "month, ",
      contenteditable: true,
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function monthSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "month")), addMeltEventListener(node, "focusout", () => states.month.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleMonthSegmentKeydown(e) {
    if (!isAcceptableSegmentKey(e.key)) {
      return;
    }
    const $placeholder = placeholder.get();
    function getMonthAnnouncement(month) {
      return `${month} - ${formatter.fullMonth(toDate($placeholder.set({ month })))}`;
    }
    const max = 12;
    states.month.hasTouched = true;
    if (e.key === kbd.ARROW_UP) {
      updateSegment("month", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.month;
          announcer.announce(getMonthAnnouncement(next2));
          return next2;
        }
        const next = $placeholder.set({ month: prev }).cycle("month", 1);
        announcer.announce(getMonthAnnouncement(next.month));
        return next.month;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("month", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.month;
          announcer.announce(getMonthAnnouncement(next2));
          return next2;
        }
        const next = $placeholder.set({ month: prev }).cycle("month", -1).month;
        announcer.announce(getMonthAnnouncement(next));
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      const num = parseInt(e.key);
      let moveToNext = false;
      updateSegment("month", (prev) => {
        const maxStart = Math.floor(max / 10);
        if (states.month.hasLeftFocus) {
          prev = null;
          states.month.hasLeftFocus = false;
        }
        if (prev === null) {
          if (num === 0) {
            states.month.lastKeyZero = true;
            announcer.announce(null);
            return null;
          }
          if (states.month.lastKeyZero || num > maxStart) {
            moveToNext = true;
          }
          states.month.lastKeyZero = false;
          announcer.announce(num);
          return num;
        }
        const digits = prev.toString().length;
        const total = parseInt(prev.toString() + num.toString());
        if (digits === 2 || total > max) {
          if (num > maxStart) {
            moveToNext = true;
          }
          announcer.announce(num);
          return num;
        }
        moveToNext = true;
        announcer.announce(total);
        return total;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      states.month.hasLeftFocus = false;
      updateSegment("month", (prev) => {
        if (prev === null) {
          announcer.announce(null);
          return null;
        }
        const str = prev.toString();
        if (str.length === 1) {
          announcer.announce(null);
          return null;
        }
        const next = parseInt(str.slice(0, -1));
        announcer.announce(getMonthAnnouncement(next));
        return next;
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function yearSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, placeholder: placeholder2, ids: ids2 } = props2;
    const isEmpty = segmentValues2.year === null;
    const date = segmentValues2.year ? placeholder2.set({ year: segmentValues2.year }) : placeholder2;
    const valueMin = 1;
    const valueMax = 9999;
    const valueNow = date.year;
    const valueText = isEmpty ? "Empty" : `${valueNow}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.year,
      "aria-label": "year, ",
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function yearSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "year")), addMeltEventListener(node, "focusout", () => states.year.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleYearSegmentKeydown(e) {
    if (!isAcceptableSegmentKey(e.key)) {
      return;
    }
    states.year.hasTouched = true;
    const $placeholder = placeholder.get();
    if (e.key === kbd.ARROW_UP) {
      updateSegment("year", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.year;
          announcer.announce(next2);
          return next2;
        }
        const next = $placeholder.set({ year: prev }).cycle("year", 1).year;
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("year", (prev) => {
        if (prev === null) {
          const next2 = $placeholder.year;
          announcer.announce(next2);
          return next2;
        }
        const next = $placeholder.set({ year: prev }).cycle("year", -1).year;
        announcer.announce(next);
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      let moveToNext = false;
      const num = parseInt(e.key);
      updateSegment("year", (prev) => {
        if (states.year.hasLeftFocus) {
          prev = null;
          states.year.hasLeftFocus = false;
        }
        if (prev === null) {
          announcer.announce(num);
          return num;
        }
        const str = prev.toString() + num.toString();
        if (str.length > 4) {
          announcer.announce(num);
          return num;
        }
        if (str.length === 4) {
          moveToNext = true;
        }
        const int = parseInt(str);
        announcer.announce(int);
        return int;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      updateSegment("year", (prev) => {
        if (prev === null) {
          announcer.announce(null);
          return null;
        }
        const str = prev.toString();
        if (str.length === 1) {
          announcer.announce(null);
          return null;
        }
        const next = parseInt(str.slice(0, -1));
        announcer.announce(next);
        return next;
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function hourSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, hourCycle: hourCycle2, placeholder: placeholder2, ids: ids2 } = props2;
    if (!("hour" in segmentValues2) || !("hour" in placeholder2))
      return {};
    const isEmpty = segmentValues2.hour === null;
    const date = segmentValues2.hour ? placeholder2.set({ hour: segmentValues2.hour }) : placeholder2;
    const valueMin = hourCycle2 === 12 ? 1 : 0;
    const valueMax = hourCycle2 === 12 ? 12 : 23;
    const valueNow = date.hour;
    const valueText = isEmpty ? "Empty" : `${valueNow} ${segmentValues2.dayPeriod ?? ""}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.hour,
      "aria-label": "hour, ",
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function hourSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "hour")), addMeltEventListener(node, "focusout", () => states.hour.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleHourSegmentKeydown(e) {
    const dateRef = placeholder.get();
    if (!isAcceptableSegmentKey(e.key) || !("hour" in dateRef)) {
      return;
    }
    states.hour.hasTouched = true;
    const $hourCycle = hourCycle.get();
    if (e.key === kbd.ARROW_UP) {
      updateSegment("hour", (prev) => {
        if (prev === null) {
          const next2 = dateRef.cycle("hour", 1, { hourCycle: $hourCycle }).hour;
          announcer.announce(next2);
          return next2;
        }
        const next = dateRef.set({ hour: prev }).cycle("hour", 1, { hourCycle: $hourCycle }).hour;
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("hour", (prev) => {
        if (prev === null) {
          const next2 = dateRef.cycle("hour", -1, { hourCycle: $hourCycle }).hour;
          announcer.announce(next2);
          return next2;
        }
        const next = dateRef.set({ hour: prev }).cycle("hour", -1, { hourCycle: $hourCycle }).hour;
        announcer.announce(next);
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      const num = parseInt(e.key);
      let moveToNext = false;
      updateSegment("hour", (prev) => {
        const maxStart = Math.floor(24 / 10);
        if (states.hour.hasLeftFocus) {
          prev = null;
          states.hour.hasLeftFocus = false;
        }
        if (prev === null) {
          if (num === 0) {
            states.hour.lastKeyZero = true;
            announcer.announce(null);
            return null;
          }
          if (states.hour.lastKeyZero || num > maxStart) {
            moveToNext = true;
          }
          states.hour.lastKeyZero = false;
          announcer.announce(num);
          return num;
        }
        const digits = prev.toString().length;
        const total = parseInt(prev.toString() + num.toString());
        if (digits === 2 || total > 24) {
          if (num > maxStart) {
            moveToNext = true;
          }
          announcer.announce(num);
          return num;
        }
        moveToNext = true;
        announcer.announce(total);
        return total;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      states.hour.hasLeftFocus = false;
      updateSegment("hour", (prev) => {
        if (prev === null) {
          announcer.announce(null);
          return null;
        }
        const str = prev.toString();
        if (str.length === 1) {
          announcer.announce(null);
          return null;
        }
        const next = parseInt(str.slice(0, -1));
        announcer.announce(next);
        return next;
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function minuteSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, placeholder: placeholder2, ids: ids2 } = props2;
    if (!("minute" in segmentValues2) || !("minute" in placeholder2))
      return {};
    const isEmpty = segmentValues2.minute === null;
    const date = segmentValues2.minute ? placeholder2.set({ minute: segmentValues2.minute }) : placeholder2;
    const valueNow = date.minute;
    const valueMin = 0;
    const valueMax = 59;
    const valueText = isEmpty ? "Empty" : `${valueNow}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.minute,
      "aria-label": "minute, ",
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function minuteSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "minute")), addMeltEventListener(node, "focusout", () => states.minute.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleMinuteSegmentKeydown(e) {
    const dateRef = placeholder.get();
    if (!isAcceptableSegmentKey(e.key) || !("minute" in dateRef)) {
      return;
    }
    states.minute.hasTouched = true;
    const min = 0;
    const max = 59;
    if (e.key === kbd.ARROW_UP) {
      updateSegment("minute", (prev) => {
        if (prev === null) {
          announcer.announce(min);
          return min;
        }
        const next = dateRef.set({ minute: prev }).cycle("minute", 1).minute;
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("minute", (prev) => {
        if (prev === null) {
          announcer.announce(max);
          return max;
        }
        const next = dateRef.set({ minute: prev }).cycle("minute", -1).minute;
        announcer.announce(next);
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      const num = parseInt(e.key);
      let moveToNext = false;
      updateSegment("minute", (prev) => {
        const maxStart = Math.floor(max / 10);
        if (states.minute.hasLeftFocus) {
          prev = null;
          states.minute.hasLeftFocus = false;
        }
        if (prev === null) {
          if (num === 0) {
            states.minute.lastKeyZero = true;
            announcer.announce(null);
            return 0;
          }
          if (states.minute.lastKeyZero || num > maxStart) {
            moveToNext = true;
          }
          states.minute.lastKeyZero = false;
          announcer.announce(num);
          return num;
        }
        const digits = prev.toString().length;
        const total = parseInt(prev.toString() + num.toString());
        if (digits === 2 || total > max) {
          if (num > maxStart) {
            moveToNext = true;
          }
          announcer.announce(num);
          return num;
        }
        moveToNext = true;
        announcer.announce(total);
        return total;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      states.minute.hasLeftFocus = false;
      updateSegment("minute", (prev) => {
        if (prev === null) {
          announcer.announce("Empty");
          return null;
        }
        const str = prev.toString();
        if (str.length === 1) {
          announcer.announce("Empty");
          return null;
        }
        const next = parseInt(str.slice(0, -1));
        announcer.announce(next);
        return next;
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function secondSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, placeholder: placeholder2, ids: ids2 } = props2;
    if (!("second" in segmentValues2) || !("second" in placeholder2))
      return {};
    const isEmpty = segmentValues2.second === null;
    const date = segmentValues2.second ? placeholder2.set({ second: segmentValues2.second }) : placeholder2;
    const valueNow = date.second;
    const valueMin = 0;
    const valueMax = 59;
    const valueText = isEmpty ? "Empty" : `${valueNow}`;
    return {
      ...defaultSegmentAttrs,
      id: ids2.second,
      "aria-label": "second, ",
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function secondSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "second")), addMeltEventListener(node, "focusout", () => states.second.hasLeftFocus = true), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleSecondSegmentKeydown(e) {
    const dateRef = placeholder.get();
    if (!isAcceptableSegmentKey(e.key)) {
      return;
    }
    states.second.hasTouched = true;
    const min = 0;
    const max = 59;
    if (!("second" in dateRef))
      return;
    if (e.key === kbd.ARROW_UP) {
      updateSegment("second", (prev) => {
        if (prev === null) {
          announcer.announce(min);
          return min;
        }
        const next = dateRef.set({ second: prev }).cycle("second", 1).second;
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.ARROW_DOWN) {
      updateSegment("second", (prev) => {
        if (prev === null) {
          announcer.announce(max);
          return max;
        }
        const next = dateRef.set({ second: prev }).cycle("second", -1).second;
        announcer.announce(next);
        return next;
      });
      return;
    }
    const $fieldId = ids.field.get();
    if (isNumberString(e.key)) {
      const num = parseInt(e.key);
      let moveToNext = false;
      updateSegment("second", (prev) => {
        const maxStart = Math.floor(max / 10);
        if (states.second.hasLeftFocus) {
          prev = null;
          states.second.hasLeftFocus = false;
        }
        if (prev === null) {
          if (num === 0) {
            states.second.lastKeyZero = true;
            announcer.announce(null);
            return 0;
          }
          if (states.second.lastKeyZero || num > maxStart) {
            moveToNext = true;
          }
          states.second.lastKeyZero = false;
          announcer.announce(num);
          return num;
        }
        const digits = prev.toString().length;
        const total = parseInt(prev.toString() + num.toString());
        if (digits === 2 || total > max) {
          if (num > maxStart) {
            moveToNext = true;
          }
          announcer.announce(num);
          return num;
        }
        moveToNext = true;
        announcer.announce(total);
        return total;
      });
      if (moveToNext) {
        moveToNextSegment(e, $fieldId);
      }
    }
    if (e.key === kbd.BACKSPACE) {
      states.second.hasLeftFocus = false;
      updateSegment("second", (prev) => {
        if (prev === null) {
          announcer.announce(null);
          return null;
        }
        const str = prev.toString();
        if (str.length === 1) {
          announcer.announce(null);
          return null;
        }
        const next = parseInt(str.slice(0, -1));
        announcer.announce(next);
        return next;
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, $fieldId);
    }
  }
  function dayPeriodSegmentAttrs(props2) {
    const { segmentValues: segmentValues2, ids: ids2 } = props2;
    if (!("dayPeriod" in segmentValues2))
      return {};
    const valueMin = 0;
    const valueMax = 12;
    const valueNow = segmentValues2.dayPeriod ?? 0;
    const valueText = segmentValues2.dayPeriod ?? "AM";
    return {
      ...defaultSegmentAttrs,
      inputmode: "text",
      id: ids2.dayPeriod,
      "aria-label": "AM/PM",
      "aria-valuemin": valueMin,
      "aria-valuemax": valueMax,
      "aria-valuenow": valueNow,
      "aria-valuetext": valueText
    };
  }
  function dayPeriodSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "dayPeriod")), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleDayPeriodSegmentKeydown(e) {
    if (!isAcceptableSegmentKey(e.key) && e.key !== kbd.A && e.key !== kbd.P) {
      return;
    }
    if (e.key === kbd.ARROW_UP || e.key === kbd.ARROW_DOWN) {
      updateSegment("dayPeriod", (prev) => {
        if (prev === "AM") {
          const next2 = "PM";
          announcer.announce(next2);
          return next2;
        }
        const next = "AM";
        announcer.announce(next);
        return next;
      });
      return;
    }
    if (e.key === kbd.BACKSPACE) {
      states.second.hasLeftFocus = false;
      updateSegment("dayPeriod", () => {
        const next = "AM";
        announcer.announce(next);
        return "AM";
      });
    }
    if (e.key === "a") {
      updateSegment("dayPeriod", () => {
        const next = "AM";
        announcer.announce(next);
        return "AM";
      });
    }
    if (e.key === "p") {
      updateSegment("dayPeriod", () => {
        const next = "PM";
        announcer.announce(next);
        return "PM";
      });
    }
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, ids.field.get());
    }
  }
  function literalSegmentAttrs(_) {
    return {
      "aria-hidden": true,
      "data-segment": "literal"
    };
  }
  function literalSegmentAction(_) {
    return {
      destroy: noop
    };
  }
  function timeZoneSegmentAttrs(_) {
    return {
      role: "textbox",
      "aria-label": "timezone, ",
      "data-readonly": true,
      "data-segment": "timeZoneName",
      tabindex: 0,
      style: styleToString$1({
        "caret-color": "transparent"
      })
    };
  }
  function timeZoneSegmentAction(node) {
    const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => handleSegmentKeydown(e, "timeZoneName")), addMeltEventListener(node, "click", handleSegmentClick));
    return {
      destroy() {
        unsubEvents();
      }
    };
  }
  function handleTimeZoneSegmentKeydown(e) {
    if (isSegmentNavigationKey(e.key)) {
      handleSegmentNavigation(e, ids.field.get());
    }
  }
  function getSegmentAttrs(part, props2) {
    return segmentBuilders[part]?.attrs(props2);
  }
  function getSegmentAction(node) {
    const part = getPartFromNode(node);
    if (!part) {
      throw new Error("No segment part found");
    }
    return segmentBuilders[part].action(node);
  }
  function getLabelledBy(part) {
    return `${ids[part].get()} ${ids.label.get()}`;
  }
  effect(locale, ($locale) => {
    if (formatter.getLocale() === $locale)
      return;
    formatter.setLocale($locale);
  });
  effect(value, ($value) => {
    if ($value) {
      setDescription(ids.description.get(), formatter, $value);
    }
    if ($value && placeholder.get() !== $value) {
      placeholder.set($value);
    }
  });
  effect([value, locale], ([$value, _]) => {
    if ($value) {
      syncSegmentValues({
        value: $value,
        segmentValues,
        formatter,
        updatingDayPeriod
      });
    } else {
      segmentValues.set(structuredClone(initialSegments));
    }
  });
  const _isDateUnavailable = derived(isDateUnavailable, ($isDateUnavailable) => {
    return (date) => $isDateUnavailable?.(date);
  });
  return {
    elements: {
      field,
      segment,
      label,
      hiddenInput,
      validation
    },
    states: {
      value,
      segmentValues,
      segmentContents,
      segmentContentsObj,
      placeholder: placeholder.toWritable(),
      isInvalid
    },
    helpers: {
      isDateUnavailable: _isDateUnavailable
    },
    options,
    ids
  };
}
function pickerOpenFocus(defaultEl) {
  const el = document.querySelector("[data-melt-calendar-cell][data-focused]");
  if (isHTMLElement(el)) {
    return el;
  }
  if (isHTMLElement(defaultEl)) {
    return defaultEl;
  }
  return null;
}
function removeDescriptionElement(id) {
  if (!isBrowser)
    return;
  const el = document.getElementById(id);
  if (!el)
    return;
  document.body.removeChild(el);
}
const defaults$3 = {
  isDateUnavailable: void 0,
  value: void 0,
  hourCycle: void 0,
  locale: "en",
  granularity: void 0,
  hideTimeZone: false,
  defaultValue: {
    start: void 0,
    end: void 0
  },
  startName: void 0,
  endName: void 0,
  disabled: false,
  readonly: false,
  readonlySegments: void 0,
  minValue: void 0,
  maxValue: void 0
};
const { name: name$2 } = createElHelpers("dateField");
const rangeFieldIdParts = ["field", "label", "description", "validation"];
function createDateRangeField(props) {
  const withDefaults = { ...defaults$3, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "placeholder"));
  const generatedIds = generateIds(rangeFieldIdParts);
  const ids = toWritableStores({ ...generatedIds, ...withDefaults.ids });
  const defaultDate = getDefaultDate({
    defaultValue: withDefaults.defaultValue?.start,
    defaultPlaceholder: withDefaults.defaultPlaceholder,
    granularity: withDefaults.granularity
  });
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults.onValueChange);
  const startValue = withGet.writable(value.get()?.start ?? withDefaults.defaultValue?.start);
  const endValue = withGet.writable(value.get()?.end ?? withDefaults.defaultValue?.end);
  const isCompleted = derived(value, ($value) => {
    return $value?.start && $value?.end;
  });
  const placeholderWritable = withDefaults.placeholder ?? writable(withDefaults.defaultPlaceholder ?? defaultDate);
  const placeholder = dateStore(overridable(placeholderWritable, withDefaults.onPlaceholderChange), withDefaults.defaultPlaceholder ?? defaultDate);
  const startField = createDateField({
    ...omit(withDefaults, "defaultValue", "onValueChange", "startName", "endName", "readonlySegments"),
    value: startValue,
    name: withDefaults.startName,
    readonlySegments: withDefaults.readonlySegments?.start,
    ids: {
      ...generatedIds,
      ...withDefaults.ids,
      ...withDefaults.startIds
    }
  });
  const endField = createDateField({
    ...omit(withDefaults, "defaultValue", "onValueChange", "endName", "startName", "readonlySegments"),
    value: endValue,
    name: withDefaults.endName,
    readonlySegments: withDefaults.readonlySegments?.end,
    ids: {
      ...generatedIds,
      ...withDefaults.ids,
      ...withDefaults.endIds
    }
  });
  const { elements: { segment: startSegment, hiddenInput: startHiddenInput }, states: { isInvalid: isStartInvalid, segmentContents: startSegmentContents, segmentValues: startSegmentValues }, options: { name: startName } } = startField;
  const { elements: { segment: endSegment, hiddenInput: endHiddenInput }, states: { isInvalid: isEndInvalid, segmentContents: endSegmentContents, segmentValues: endSegmentValues }, options: { name: endName } } = endField;
  const isInvalid = derived([value, isStartInvalid, isEndInvalid, options.isDateUnavailable], ([$value, $isStartInvalid, $isEndInvalid, $isDateUnavailable]) => {
    if ($isStartInvalid || $isEndInvalid) {
      return true;
    }
    if (!$value?.start || !$value?.end) {
      return false;
    }
    if (!isBeforeOrSame($value?.start, $value?.end)) {
      return true;
    }
    if ($isDateUnavailable !== void 0) {
      const allValid = areAllDaysBetweenValid($value?.start, $value?.end, $isDateUnavailable, void 0);
      if (!allValid) {
        return true;
      }
    }
    return false;
  });
  const label = makeElement(name$2("label"), {
    stores: [isInvalid, options.disabled, ids.label],
    returned: ([$isInvalid, $disabled, $labelId]) => {
      return {
        id: $labelId,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const firstSegment = getFirstSegment(ids.field.get());
        if (!firstSegment)
          return;
        sleep(1).then(() => firstSegment.focus());
      }), addMeltEventListener(node, "mousedown", (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const fieldIdDeps = derived([ids.field, ids.label, ids.description, ids.validation], ([$fieldId, $labelId, $descriptionId, $validationId]) => {
    return {
      field: $fieldId,
      label: $labelId,
      description: $descriptionId,
      validation: $validationId
    };
  });
  const field = makeElement(name$2("field"), {
    stores: [isCompleted, isInvalid, fieldIdDeps],
    returned: ([$isCompleted, $isInvalid, $ids]) => {
      const describedBy = $isCompleted ? `${$ids.description}${$isInvalid ? ` ${$ids.validation}` : ""}` : `${$ids.description}`;
      return {
        role: "group",
        id: $ids.field,
        "aria-labelledby": $ids.label,
        "aria-describedby": describedBy,
        "data-invalid": $isInvalid ? "" : void 0
      };
    },
    action: () => {
      getAnnouncer();
      return {
        destroy() {
          removeDescriptionElement(ids.description.get());
        }
      };
    }
  });
  const validation = makeElement(name$2("validation"), {
    stores: [isInvalid, ids.validation],
    returned: ([$isInvalid, $validationId]) => {
      const validStyle = styleToString$1({
        display: "none"
      });
      return {
        id: $validationId,
        "data-invalid": $isInvalid ? "" : void 0,
        style: $isInvalid ? void 0 : validStyle
      };
    }
  });
  const segmentContents = derived([startSegmentContents, endSegmentContents], ([$startSegmentContents, $endSegmentContents]) => {
    return {
      start: $startSegmentContents,
      end: $endSegmentContents
    };
  });
  effect([value], ([$value]) => {
    const $startValue = startValue.get();
    const $endValue = endValue.get();
    if ($value?.start && $value?.end) {
      if ($value.start !== $startValue) {
        startValue.set($value.start);
      }
      if ($value.end !== $endValue) {
        endValue.set($value.end);
      }
      return;
    }
  });
  effect([startValue, endValue], ([$startValue, $endValue]) => {
    const $value = value.get();
    if ($value && $value?.start === $startValue && $value?.end === $endValue)
      return;
    if ($startValue && $endValue) {
      value.update((prev) => {
        if (prev?.start === $startValue && prev?.end === $endValue) {
          return prev;
        }
        return {
          start: $startValue,
          end: $endValue
        };
      });
    } else if ($value && $value?.start && $value?.end) {
      value.set({
        start: void 0,
        end: void 0
      });
    }
  });
  effect([options.disabled], ([$disabled]) => {
    startField.options.disabled.set($disabled);
    endField.options.disabled.set($disabled);
  });
  effect([options.readonly], ([$readonly]) => {
    startField.options.readonly.set($readonly);
    endField.options.readonly.set($readonly);
  });
  effect([options.readonlySegments], ([$readonlySegments]) => {
    startField.options.readonlySegments.set($readonlySegments?.start);
    endField.options.readonlySegments.set($readonlySegments?.end);
  });
  effect([options.minValue], ([$minValue]) => {
    startField.options.minValue.set($minValue);
    endField.options.minValue.set($minValue);
  });
  effect([options.maxValue], ([$maxValue]) => {
    startField.options.maxValue.set($maxValue);
    endField.options.maxValue.set($maxValue);
  });
  effect([options.granularity], ([$granularity]) => {
    startField.options.granularity.set($granularity);
    endField.options.granularity.set($granularity);
  });
  effect([options.hideTimeZone], ([$hideTimeZone]) => {
    startField.options.hideTimeZone.set($hideTimeZone);
    endField.options.hideTimeZone.set($hideTimeZone);
  });
  effect([options.hourCycle], ([$hourCycle]) => {
    startField.options.hourCycle.set($hourCycle);
    endField.options.hourCycle.set($hourCycle);
  });
  effect([options.locale], ([$locale]) => {
    startField.options.locale.set($locale);
    endField.options.locale.set($locale);
  });
  return {
    elements: {
      field,
      label,
      startSegment,
      endSegment,
      startHiddenInput,
      endHiddenInput,
      validation
    },
    states: {
      value,
      placeholder: placeholder.toWritable(),
      segmentContents,
      endSegmentValues,
      startSegmentValues,
      isInvalid
    },
    options: {
      ...options,
      endName,
      startName
    },
    ids: {
      field: ids,
      start: startField.ids,
      end: endField.ids
    }
  };
}
const defaults$2 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  positioning: {
    placement: "bottom"
  },
  closeOnEscape: true,
  closeOnOutsideClick: true,
  preventScroll: false,
  forceVisible: false,
  locale: "en",
  granularity: void 0,
  disabled: false,
  readonly: false,
  minValue: void 0,
  maxValue: void 0,
  weekdayFormat: "narrow",
  onOutsideClick: void 0
};
function createDateRangePicker(props) {
  const withDefaults = { ...defaults$2, ...props };
  const rangeField = createDateRangeField(withDefaults);
  const { states: { value, placeholder: rfPlaceholder } } = rangeField;
  const calendar = createRangeCalendar({
    ...omit(withDefaults, "onValueChange"),
    placeholder: rfPlaceholder,
    value,
    ids: withDefaults.calendarIds
  });
  const popover = createPopover({
    positioning: withDefaults.positioning,
    arrowSize: withDefaults.arrowSize,
    defaultOpen: withDefaults.defaultOpen,
    open: withDefaults.open,
    disableFocusTrap: withDefaults.disableFocusTrap,
    closeOnEscape: withDefaults.closeOnEscape,
    preventScroll: withDefaults.preventScroll,
    onOpenChange: withDefaults.onOpenChange,
    closeOnOutsideClick: withDefaults.closeOnOutsideClick,
    portal: withDefaults.portal,
    forceVisible: withDefaults.forceVisible,
    openFocus: pickerOpenFocus,
    onOutsideClick: withDefaults.onOutsideClick
  });
  const options = toWritableStores({
    ...omit(withDefaults, "value", "placeholder")
  });
  const { locale } = options;
  const defaultDate = getDefaultDate({
    defaultValue: withDefaults.defaultValue?.start,
    defaultPlaceholder: withDefaults.defaultPlaceholder,
    granularity: withDefaults.granularity
  });
  const formatter = createFormatter(locale.get());
  const placeholder = dateStore(rfPlaceholder, withDefaults.defaultPlaceholder ?? defaultDate);
  const trigger = makeElement("popover-trigger", {
    stores: [popover.elements.trigger, options.disabled],
    returned: ([$trigger, $disabled]) => {
      return {
        ...omit($trigger, "action"),
        "aria-label": "Open date picker",
        "data-segment": "trigger",
        disabled: $disabled ? true : void 0
      };
    },
    action: (node) => {
      const unsubKeydown = addMeltEventListener(node, "keydown", handleTriggerKeydown);
      const { destroy } = popover.elements.trigger(node);
      return {
        destroy() {
          destroy?.();
          unsubKeydown();
        }
      };
    }
  });
  effect([options.locale], ([$locale]) => {
    rangeField.options.locale.set($locale);
    calendar.options.locale.set($locale);
    if (formatter.getLocale() === $locale)
      return;
    formatter.setLocale($locale);
  });
  effect([options.weekdayFormat], ([$weekdayFormat]) => {
    calendar.options.weekdayFormat.set($weekdayFormat);
  });
  effect([options.disabled], ([$disabled]) => {
    rangeField.options.disabled.set($disabled);
    calendar.options.disabled.set($disabled);
  });
  effect([options.readonly], ([$readonly]) => {
    rangeField.options.readonly.set($readonly);
    calendar.options.readonly.set($readonly);
  });
  effect([options.minValue], ([$minValue]) => {
    rangeField.options.minValue.set($minValue);
    calendar.options.minValue.set($minValue);
  });
  effect([options.maxValue], ([$maxValue]) => {
    rangeField.options.maxValue.set($maxValue);
    calendar.options.maxValue.set($maxValue);
  });
  effect([popover.states.open], ([$open]) => {
    if (!$open) {
      const $value = value.get();
      if ($value?.start) {
        placeholder.set($value.start);
      } else {
        placeholder.reset();
      }
    }
  });
  effect([options.onOutsideClick], ([$onOutsideClick]) => {
    popover.options.onOutsideClick.set($onOutsideClick);
  });
  const rangeFieldOptions = omit(rangeField.options, "locale", "disabled", "readonly", "minValue", "maxValue");
  const rangeCalendarOptions = omit(calendar.options, "locale", "disabled", "readonly", "minValue", "maxValue");
  function handleTriggerKeydown(e) {
    if (isSegmentNavigationKey(e.key)) {
      e.preventDefault();
      handleSegmentNavigation(e, rangeField.ids.field.field.get());
    }
  }
  return {
    elements: {
      ...calendar.elements,
      ...rangeField.elements,
      ...popover.elements,
      trigger
    },
    states: {
      ...rangeField.states,
      ...calendar.states,
      placeholder: placeholder.toWritable(),
      value,
      ...popover.states
    },
    helpers: {
      ...calendar.helpers
    },
    options: {
      ...rangeFieldOptions,
      ...rangeCalendarOptions,
      ...options,
      ...popover.options
    },
    ids: {
      rangeField: rangeField.ids,
      calendar: calendar.ids,
      popover: popover.ids
    }
  };
}
const defaults$1 = {
  positioning: {
    placement: "bottom"
  },
  arrowSize: 8,
  defaultOpen: false,
  disableFocusTrap: false,
  closeOnEscape: true,
  preventScroll: false,
  onOpenChange: void 0,
  closeOnOutsideClick: true,
  portal: void 0,
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0
};
const { name: name$1 } = createElHelpers("popover");
const popoverIdParts = ["trigger", "content"];
function createPopover(args) {
  const withDefaults = { ...defaults$1, ...args };
  const options = toWritableStores(omit(withDefaults, "open", "ids"));
  const { positioning, arrowSize, disableFocusTrap, preventScroll, closeOnEscape, closeOnOutsideClick, portal, forceVisible, openFocus, closeFocus, onOutsideClick } = options;
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const activeTrigger = withGet.writable(null);
  const ids = toWritableStores({ ...generateIds(popoverIdParts), ...withDefaults.ids });
  safeOnMount(() => {
    activeTrigger.set(document.getElementById(ids.trigger.get()));
  });
  function handleClose() {
    open.set(false);
    const triggerEl = document.getElementById(ids.trigger.get());
    handleFocus({ prop: closeFocus.get(), defaultEl: triggerEl });
  }
  const isVisible = derivedVisible({ open, activeTrigger, forceVisible });
  const content = makeElement(name$1("content"), {
    stores: [isVisible, portal, ids.content],
    returned: ([$isVisible, $portal, $contentId]) => {
      return {
        hidden: $isVisible && isBrowser ? void 0 : true,
        tabindex: -1,
        style: styleToString$1({
          display: $isVisible ? void 0 : "none"
        }),
        id: $contentId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": portalAttr($portal)
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([
        isVisible,
        activeTrigger,
        positioning,
        disableFocusTrap,
        closeOnEscape,
        closeOnOutsideClick,
        portal
      ], ([$isVisible, $activeTrigger, $positioning, $disableFocusTrap, $closeOnEscape, $closeOnOutsideClick, $portal]) => {
        unsubPopper();
        if (!$isVisible || !$activeTrigger)
          return;
        tick().then(() => {
          unsubPopper();
          unsubPopper = usePopper(node, {
            anchorElement: $activeTrigger,
            open,
            options: {
              floating: $positioning,
              focusTrap: $disableFocusTrap ? null : {
                returnFocusOnDeactivate: false,
                clickOutsideDeactivates: $closeOnOutsideClick,
                allowOutsideClick: true,
                escapeDeactivates: $closeOnEscape
              },
              modal: {
                shouldCloseOnInteractOutside,
                onClose: handleClose,
                open: $isVisible,
                closeOnInteractOutside: $closeOnOutsideClick
              },
              escapeKeydown: $closeOnEscape ? {
                handler: () => {
                  handleClose();
                }
              } : null,
              portal: getPortalDestination(node, $portal)
            }
          }).destroy;
        });
      });
      return {
        destroy() {
          unsubDerived();
          unsubPopper();
        }
      };
    }
  });
  function toggleOpen(triggerEl) {
    open.update((prev) => {
      return !prev;
    });
    if (triggerEl && triggerEl !== activeTrigger.get()) {
      activeTrigger.set(triggerEl);
    }
  }
  function shouldCloseOnInteractOutside(e) {
    onOutsideClick.get()?.(e);
    if (e.defaultPrevented)
      return false;
    const target = e.target;
    const triggerEl = document.getElementById(ids.trigger.get());
    if (triggerEl && isElement(target)) {
      if (target === triggerEl || triggerEl.contains(target))
        return false;
    }
    return true;
  }
  const trigger = makeElement(name$1("trigger"), {
    stores: [isVisible, ids.content, ids.trigger],
    returned: ([$isVisible, $contentId, $triggerId]) => {
      return {
        role: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": $isVisible ? "true" : "false",
        "data-state": stateAttr($isVisible),
        "aria-controls": $contentId,
        id: $triggerId
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        toggleOpen(node);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen(node);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const overlay = makeElement(name$1("overlay"), {
    stores: [isVisible],
    returned: ([$isVisible]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString$1({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": "true",
        "data-state": stateAttr($isVisible)
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop;
      let unsubDerived = noop;
      let unsubPortal = noop;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            handleClose();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
      unsubDerived = effect([portal], ([$portal]) => {
        unsubPortal();
        if ($portal === null)
          return;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return;
        unsubPortal = usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubEscapeKeydown();
          unsubDerived();
          unsubPortal();
        }
      };
    }
  });
  const arrow2 = makeElement(name$1("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString$1({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const close = makeElement(name$1("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        if (e.defaultPrevented)
          return;
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.defaultPrevented)
          return;
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([open, activeTrigger, preventScroll], ([$open, $activeTrigger, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if ($open) {
      if (!$activeTrigger) {
        tick().then(() => {
          const triggerEl2 = document.getElementById(ids.trigger.get());
          if (!isHTMLElement(triggerEl2))
            return;
          activeTrigger.set(triggerEl2);
        });
      }
      if ($preventScroll) {
        unsubs.push(removeScroll());
      }
      const triggerEl = $activeTrigger ?? document.getElementById(ids.trigger.get());
      handleFocus({ prop: openFocus.get(), defaultEl: triggerEl });
    }
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  return {
    ids,
    elements: {
      trigger,
      content,
      arrow: arrow2,
      close,
      overlay
    },
    states: {
      open
    },
    options
  };
}
function stateAttr(open) {
  return open ? "open" : "closed";
}
const defaults = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  defaultValue: {
    start: void 0,
    end: void 0
  },
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
const { name } = createElHelpers("calendar");
const rangeCalendarIdParts = ["calendar", "accessibleHeading"];
function createRangeCalendar(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores({
    ...omit(withDefaults, "value", "placeholder")
  });
  const { preventDeselect, numberOfMonths, pagedNavigation, weekStartsOn, fixedWeeks, calendarLabel, locale, minValue, maxValue, disabled, readonly, weekdayFormat } = options;
  const ids = toWritableStores({ ...generateIds(rangeCalendarIdParts), ...withDefaults.ids });
  const defaultDate = getDefaultDate({
    defaultValue: withDefaults.defaultValue?.start,
    defaultPlaceholder: withDefaults.defaultPlaceholder
  });
  const formatter = createFormatter(locale.get());
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults.onValueChange);
  if (!value.get()) {
    value.set(withDefaults.defaultValue);
  }
  const startValue = withGet(writable(value.get().start ?? withDefaults.defaultValue?.start));
  const endValue = withGet(writable(value.get().end ?? withDefaults.defaultValue?.end));
  const placeholderWritable = withDefaults.placeholder ?? writable(withDefaults.defaultPlaceholder ?? defaultDate);
  const placeholder = dateStore(overridable(placeholderWritable, withDefaults.onPlaceholderChange), withDefaults.defaultPlaceholder ?? defaultDate);
  const focusedValue = withGet(writable(null));
  const lastPressedDateValue = withGet(writable(null));
  const months = withGet(writable(createMonths({
    dateObj: placeholder.get(),
    weekStartsOn: withDefaults.weekStartsOn,
    locale: withDefaults.locale,
    fixedWeeks: withDefaults.fixedWeeks,
    numberOfMonths: withDefaults.numberOfMonths
  })));
  const visibleMonths = withGet(derived([months], ([$months]) => {
    return $months.map((month) => {
      return month.value;
    });
  }));
  const isOutsideVisibleMonths = withGet(derived([visibleMonths], ([$visibleMonths]) => {
    return (date) => {
      return !$visibleMonths.some((month) => isSameMonth(date, month));
    };
  }));
  const isDateDisabled = withGet(derived([options.isDateDisabled, minValue, maxValue], ([$isDateDisabled, $minValue, $maxValue]) => {
    return (date) => {
      if ($isDateDisabled?.(date))
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isAfter(date, $maxValue))
        return true;
      return false;
    };
  }));
  const isDateUnavailable = withGet(derived([options.isDateUnavailable], ([$isDateUnavailable]) => {
    return (date) => {
      if ($isDateUnavailable?.(date))
        return true;
      return false;
    };
  }));
  const isStartInvalid = derived([startValue, isDateUnavailable, isDateDisabled], ([$startValue, $isDateUnavailable, $isDateDisabled]) => {
    if (!$startValue)
      return false;
    return $isDateUnavailable($startValue) || $isDateDisabled($startValue);
  });
  const isEndInvalid = derived([endValue, isDateUnavailable, isDateDisabled], ([$endValue, $isDateUnavailable, $isDateDisabled]) => {
    if (!$endValue)
      return false;
    return $isDateUnavailable($endValue) || $isDateDisabled($endValue);
  });
  const isInvalid = derived([startValue, endValue, isEndInvalid, isStartInvalid], ([$startValue, $endValue, $isEndInvalid, $isStartInvalid]) => {
    if ($isStartInvalid || $isEndInvalid) {
      return true;
    }
    if ($endValue && $startValue && isBefore($endValue, $startValue)) {
      return true;
    }
    return false;
  });
  const isNextButtonDisabled = withGet.derived([months, maxValue, disabled], ([$months, $maxValue, $disabled]) => {
    if (!$maxValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const lastMonthInView = $months[$months.length - 1].value;
    const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
    return isAfter(firstMonthOfNextPage, $maxValue);
  });
  const isPrevButtonDisabled = withGet.derived([months, minValue, disabled], ([$months, $minValue, $disabled]) => {
    if (!$minValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const firstMonthInView = $months[0].value;
    const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
    return isBefore(lastMonthOfPrevPage, $minValue);
  });
  let announcer = getAnnouncer();
  const headingValue = withGet.derived([months, locale], ([$months, $locale]) => {
    if (!$months.length)
      return "";
    if ($locale !== formatter.getLocale()) {
      formatter.setLocale($locale);
    }
    if ($months.length === 1) {
      const month = toDate($months[0].value);
      return `${formatter.fullMonthAndYear(month)}`;
    }
    const startMonth = toDate($months[0].value);
    const endMonth = toDate($months[$months.length - 1].value);
    const startMonthName = formatter.fullMonth(startMonth);
    const endMonthName = formatter.fullMonth(endMonth);
    const startMonthYear = formatter.fullYear(startMonth);
    const endMonthYear = formatter.fullYear(endMonth);
    const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
    return content;
  });
  const fullCalendarLabel = withGet.derived([headingValue, calendarLabel], ([$headingValue, $calendarLabel]) => {
    return `${$calendarLabel}, ${$headingValue}`;
  });
  const calendar = makeElement(name(), {
    stores: [fullCalendarLabel, isInvalid, ids.calendar, disabled, readonly],
    returned: ([$fullCalendarLabel, $isInvalid, $calendarId, $disabled, $readonly]) => {
      return {
        id: $calendarId,
        role: "application",
        "aria-label": $fullCalendarLabel,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0,
        "data-readonly": $readonly ? "" : void 0
      };
    },
    action: (node) => {
      createAccessibleHeading(node, fullCalendarLabel.get());
      announcer = getAnnouncer();
      const unsubKb = addMeltEventListener(node, "keydown", handleCalendarKeydown);
      return {
        destroy() {
          unsubKb();
        }
      };
    }
  });
  const heading = makeElement(name("heading"), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        "aria-hidden": true,
        "data-disabled": $disabled ? "" : void 0
      };
    }
  });
  const grid = makeElement(name("grid"), {
    stores: [readonly, disabled],
    returned: ([$readonly, $disabled]) => ({
      tabindex: -1,
      role: "grid",
      "aria-readonly": $readonly ? "true" : void 0,
      "aria-disabled": $disabled ? "true" : void 0,
      "data-readonly": $readonly ? "" : void 0,
      "data-disabled": $disabled ? "" : void 0
    })
  });
  const prevButton = makeElement(name("prevButton"), {
    stores: [isPrevButtonDisabled],
    returned: ([$isPrevButtonDisabled]) => {
      const disabled2 = $isPrevButtonDisabled;
      return {
        role: "button",
        type: "button",
        "aria-label": "Previous",
        "aria-disabled": disabled2 ? "true" : void 0,
        disabled: disabled2 ? true : void 0,
        "data-disabled": disabled2 ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        prevPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const nextButton = makeElement(name("nextButton"), {
    stores: [isNextButtonDisabled],
    returned: ([$isNextButtonDisabled]) => {
      const disabled2 = $isNextButtonDisabled;
      return {
        role: "button",
        type: "button",
        "aria-label": "Next",
        "aria-disabled": disabled2 ? "true" : void 0,
        disabled: disabled2 ? true : void 0,
        "data-disabled": disabled2 ? "" : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        nextPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const isSelectionStart = derived([startValue], ([$startValue]) => {
    return (date) => {
      if (!$startValue)
        return false;
      return isSameDay($startValue, date);
    };
  });
  const isSelectionEnd = derived([endValue], ([$endValue]) => {
    return (date) => {
      if (!$endValue)
        return false;
      return isSameDay($endValue, date);
    };
  });
  const isSelected = derived([startValue, endValue], ([$startValue, $endValue]) => {
    return (date) => {
      if ($startValue && isSameDay($startValue, date))
        return true;
      if ($endValue && isSameDay($endValue, date))
        return true;
      if ($endValue && $startValue) {
        return isBetweenInclusive(date, $startValue, $endValue);
      }
      return false;
    };
  });
  const highlightedRange = withGet.derived([startValue, endValue, focusedValue, isDateDisabled, isDateUnavailable], ([$startValue, $endValue, $focusedValue, $isDateDisabled, $isDateUnavailable]) => {
    if ($startValue && $endValue)
      return null;
    if (!$startValue || !$focusedValue)
      return null;
    const isStartBeforeFocused = isBefore($startValue, $focusedValue);
    const start = isStartBeforeFocused ? $startValue : $focusedValue;
    const end = isStartBeforeFocused ? $focusedValue : $startValue;
    if (isSameDay(start.add({ days: 1 }), end)) {
      return {
        start,
        end
      };
    }
    const isValid = areAllDaysBetweenValid(start, end, $isDateUnavailable, $isDateDisabled);
    if (isValid) {
      return {
        start,
        end
      };
    }
    return null;
  });
  const cell = makeElement(name("cell"), {
    stores: [
      isSelected,
      isSelectionEnd,
      isSelectionStart,
      highlightedRange,
      isDateDisabled,
      isDateUnavailable,
      placeholder,
      isOutsideVisibleMonths
    ],
    returned: ([$isSelected, $isSelectionEnd, $isSelectionStart, $highlightedRange, $isDateDisabled, $isDateUnavailable, $placeholder, $isOutsideVisibleMonths]) => {
      return (cellValue, monthValue) => {
        const cellDate = toDate(cellValue);
        const isDisabled = $isDateDisabled(cellValue);
        const isUnavailable = $isDateUnavailable(cellValue);
        const isDateToday = isToday(cellValue, getLocalTimeZone());
        const isOutsideMonth = !isSameMonth(cellValue, monthValue);
        const isFocusedDate = isSameDay(cellValue, $placeholder);
        const isOutsideVisibleMonths2 = $isOutsideVisibleMonths(cellValue);
        const isSelectedDate = $isSelected(cellValue);
        const isSelectionStart2 = $isSelectionStart(cellValue);
        const isSelectionEnd2 = $isSelectionEnd(cellValue);
        const isHighlighted = $highlightedRange ? isBetweenInclusive(cellValue, $highlightedRange.start, $highlightedRange.end) : false;
        const labelText = formatter.custom(cellDate, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        });
        return {
          role: "button",
          "aria-label": labelText,
          "aria-selected": isSelectedDate ? true : void 0,
          "aria-disabled": isOutsideMonth || isDisabled || isUnavailable ? true : void 0,
          "data-selected": isSelectedDate ? true : void 0,
          "data-selection-start": isSelectionStart2 ? true : void 0,
          "data-selection-end": isSelectionEnd2 ? true : void 0,
          "data-value": cellValue.toString(),
          "data-disabled": isDisabled || isOutsideMonth ? "" : void 0,
          "data-unavailable": isUnavailable ? "" : void 0,
          "data-today": isDateToday ? "" : void 0,
          "data-outside-month": isOutsideMonth ? "" : void 0,
          "data-outside-visible-months": isOutsideVisibleMonths2 ? "" : void 0,
          "data-focused": isFocusedDate ? "" : void 0,
          "data-highlighted": isHighlighted ? "" : void 0,
          tabindex: isFocusedDate ? 0 : isOutsideMonth || isDisabled ? void 0 : -1
        };
      };
    },
    action: (node) => {
      const getElArgs = () => {
        const value2 = node.getAttribute("data-value");
        const label = node.getAttribute("data-label");
        const disabled2 = node.hasAttribute("data-disabled");
        return {
          value: value2,
          label: label ?? node.textContent ?? null,
          disabled: disabled2 ? true : false
        };
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        handleCellClick(e, parseStringToDateValue(args.value, placeholder.get()));
      }), addMeltEventListener(node, "mouseenter", () => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        focusedValue.set(parseStringToDateValue(args.value, placeholder.get()));
      }), addMeltEventListener(node, "focusin", () => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        focusedValue.set(parseStringToDateValue(args.value, placeholder.get()));
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([locale], ([$locale]) => {
    if (formatter.getLocale() === $locale)
      return;
    formatter.setLocale($locale);
  });
  effect([placeholder], ([$placeholder]) => {
    if (!isBrowser || !$placeholder)
      return;
    const $visibleMonths = visibleMonths.get();
    if ($visibleMonths.some((month) => isSameMonth(month, $placeholder))) {
      return;
    }
    const $weekStartsOn = weekStartsOn.get();
    const $locale = locale.get();
    const $fixedWeeks = fixedWeeks.get();
    const $numberOfMonths = numberOfMonths.get();
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect([weekStartsOn, locale, fixedWeeks, numberOfMonths], ([$weekStartsOn, $locale, $fixedWeeks, $numberOfMonths]) => {
    const $placeholder = placeholder.get();
    if (!isBrowser || !$placeholder)
      return;
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect([fullCalendarLabel], ([$fullCalendarLabel]) => {
    if (!isBrowser)
      return;
    const node = document.getElementById(ids.accessibleHeading.get());
    if (!isHTMLElement(node))
      return;
    node.textContent = $fullCalendarLabel;
  });
  effect([startValue], ([$startValue]) => {
    if ($startValue && placeholder.get() !== $startValue) {
      placeholder.set($startValue);
    }
  });
  const weekdays = derived([months, weekdayFormat, locale], ([$months, $weekdayFormat, _]) => {
    if (!$months.length)
      return [];
    return $months[0].weeks[0].map((date) => {
      return formatter.dayOfWeek(toDate(date), $weekdayFormat);
    });
  });
  function createAccessibleHeading(node, label) {
    if (!isBrowser)
      return;
    const div = document.createElement("div");
    div.style.cssText = styleToString$1({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    const h2 = document.createElement("div");
    h2.textContent = label;
    h2.id = ids.accessibleHeading.get();
    h2.role = "heading";
    h2.ariaLevel = "2";
    node.insertBefore(div, node.firstChild);
    div.appendChild(h2);
  }
  function nextPage() {
    const $months = months.get();
    const $numberOfMonths = numberOfMonths.get();
    if (pagedNavigation.get()) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.add({ months: 1 }),
        weekStartsOn: weekStartsOn.get(),
        locale: locale.get(),
        fixedWeeks: fixedWeeks.get(),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function prevPage() {
    const $months = months.get();
    const $numberOfMonths = numberOfMonths.get();
    if (pagedNavigation.get()) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.subtract({ months: 1 }),
        weekStartsOn: weekStartsOn.get(),
        locale: locale.get(),
        fixedWeeks: fixedWeeks.get(),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function nextYear() {
    placeholder.add({ years: 1 });
  }
  function prevYear() {
    placeholder.subtract({ years: 1 });
  }
  const ARROW_KEYS = [kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.ARROW_LEFT, kbd.ARROW_RIGHT];
  function setYear(year) {
    placeholder.setDate({ year });
  }
  function setMonth(month) {
    if (month < 0 || month > 11)
      throw new Error("Month must be between 0 and 11");
    placeholder.setDate({ month });
  }
  function handleCellClick(e, date) {
    const $isDateDisabled = isDateDisabled.get();
    const $isDateUnavailable = isDateUnavailable.get();
    if ($isDateDisabled(date) || $isDateUnavailable(date))
      return;
    const $lastPressedDate = lastPressedDateValue.get();
    lastPressedDateValue.set(date);
    const $startValue = startValue.get();
    const $endValue = endValue.get();
    const $highlightedRange = highlightedRange.get();
    if ($startValue && $highlightedRange === null) {
      if (isSameDay($startValue, date) && !preventDeselect.get() && !$endValue) {
        startValue.set(void 0);
        placeholder.set(date);
        announcer.announce("Selected date is now empty.", "polite");
        return;
      } else if (!$endValue) {
        e.preventDefault();
        if ($lastPressedDate && isSameDay($lastPressedDate, date)) {
          startValue.set(date);
          announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        }
        return;
      }
    }
    if ($startValue && $endValue && isSameDay($endValue, date) && !preventDeselect.get()) {
      startValue.set(void 0);
      endValue.set(void 0);
      placeholder.set(date);
      announcer.announce("Selected date is now empty.", "polite");
      return;
    }
    if (!$startValue) {
      startValue.update(() => {
        announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    } else if (!$endValue) {
      endValue.update(() => {
        announcer.announce(`Selected Dates: ${formatter.selectedDate($startValue, false)} to ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    } else if ($endValue && $startValue) {
      endValue.set(void 0);
      startValue.update(() => {
        announcer.announce(`Selected Date: ${formatter.selectedDate(date, false)}`, "polite");
        return date;
      });
    }
  }
  const SELECT_KEYS = [kbd.ENTER, kbd.SPACE];
  function handleCalendarKeydown(e) {
    const currentCell = e.target;
    if (!isCalendarCell(currentCell))
      return;
    if (!ARROW_KEYS.includes(e.key) && !SELECT_KEYS.includes(e.key))
      return;
    e.preventDefault();
    if (e.key === kbd.ARROW_DOWN) {
      shiftFocus(currentCell, 7);
    }
    if (e.key === kbd.ARROW_UP) {
      shiftFocus(currentCell, -7);
    }
    if (e.key === kbd.ARROW_LEFT) {
      shiftFocus(currentCell, -1);
    }
    if (e.key === kbd.ARROW_RIGHT) {
      shiftFocus(currentCell, 1);
    }
    if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
      const cellValue = currentCell.getAttribute("data-value");
      if (!cellValue)
        return;
      handleCellClick(e, parseStringToDateValue(cellValue, placeholder.get()));
    }
  }
  function shiftFocus(node, add) {
    const $calendarId = ids.calendar.get();
    const candidateCells = getSelectableCells($calendarId);
    if (!candidateCells.length) {
      return;
    }
    const index = candidateCells.indexOf(node);
    const nextIndex = index + add;
    if (isValidIndex(nextIndex, candidateCells)) {
      const nextCell = candidateCells[nextIndex];
      setPlaceholderToNodeValue(nextCell, placeholder);
      return nextCell.focus();
    }
    if (nextIndex < 0) {
      if (isPrevButtonDisabled.get())
        return;
      const $months = months.get();
      const firstMonth = $months[0].value;
      const $numberOfMonths = numberOfMonths.get();
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells($calendarId);
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = newCandidateCells.length - Math.abs(nextIndex);
        if (isValidIndex(newIndex, newCandidateCells)) {
          const newCell = newCandidateCells[newIndex];
          setPlaceholderToNodeValue(newCell, placeholder);
          return newCell.focus();
        }
      });
    }
    if (nextIndex >= candidateCells.length) {
      if (isNextButtonDisabled.get())
        return;
      const $months = months.get();
      const firstMonth = $months[0].value;
      const $numberOfMonths = numberOfMonths.get();
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells($calendarId);
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = nextIndex - candidateCells.length;
        if (isValidIndex(newIndex, newCandidateCells)) {
          const nextCell = newCandidateCells[newIndex];
          return nextCell.focus();
        }
      });
    }
  }
  const _isDateDisabled = derived([isDateDisabled, placeholder, minValue, maxValue], ([$isDateDisabled, $placeholder, $minValue, $maxValue]) => {
    return (date) => {
      if ($isDateDisabled(date))
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isAfter(date, $maxValue))
        return true;
      if (!isSameMonth(date, $placeholder))
        return true;
      return false;
    };
  });
  effect([value], ([$value]) => {
    const $startValue = startValue.get();
    const $endValue = endValue.get();
    if ($value?.start && $value?.end) {
      if ($value.start !== $startValue) {
        startValue.set($value.start);
      }
      if ($value.end !== $endValue) {
        endValue.set($value.end);
      }
      return;
    }
  });
  effect([startValue, endValue], ([$startValue, $endValue]) => {
    const $value = value.get();
    if ($value && $value?.start === $startValue && $value?.end === $endValue)
      return;
    if ($startValue && $endValue) {
      value.update((prev) => {
        if (prev?.start === $startValue && prev?.end === $endValue) {
          return prev;
        }
        if (isBefore($endValue, $startValue)) {
          return {
            start: $endValue,
            end: $startValue
          };
        } else {
          return {
            start: $startValue,
            end: $endValue
          };
        }
      });
    } else if ($value && $value.start && $value.end) {
      value.set({
        start: void 0,
        end: void 0
      });
    }
  });
  return {
    elements: {
      calendar,
      heading,
      grid,
      cell,
      nextButton,
      prevButton
    },
    states: {
      placeholder: placeholder.toWritable(),
      months,
      weekdays,
      headingValue,
      value,
      startValue,
      endValue
    },
    helpers: {
      nextPage,
      prevPage,
      nextYear,
      prevYear,
      setYear,
      setMonth,
      isDateDisabled: _isDateDisabled,
      isDateUnavailable
    },
    options,
    ids
  };
}
function getCalendarData() {
  const NAME = "calendar";
  const PARTS = [
    "root",
    "prev-button",
    "next-button",
    "heading",
    "grid",
    "day",
    "header",
    "grid-head",
    "head-cell",
    "grid-body",
    "cell",
    "grid-row"
  ];
  return { NAME, PARTS };
}
function getPositioningUpdater(store) {
  return (props = {}) => {
    return updatePositioning$1(store, props);
  };
}
function updatePositioning$1(store, props) {
  const defaultPositioningProps = {
    side: "bottom",
    align: "center",
    sideOffset: 0,
    alignOffset: 0,
    sameWidth: false,
    avoidCollisions: true,
    collisionPadding: 8,
    fitViewport: false,
    strategy: "absolute",
    overlap: false
  };
  const withDefaults = { ...defaultPositioningProps, ...props };
  store.update((prev) => {
    return {
      ...prev,
      placement: joinPlacement(withDefaults.side, withDefaults.align),
      offset: {
        ...prev.offset,
        mainAxis: withDefaults.sideOffset,
        crossAxis: withDefaults.alignOffset
      },
      gutter: 0,
      sameWidth: withDefaults.sameWidth,
      flip: withDefaults.avoidCollisions,
      overflowPadding: withDefaults.collisionPadding,
      boundary: withDefaults.collisionBoundary,
      fitViewport: withDefaults.fitViewport,
      strategy: withDefaults.strategy,
      overlap: withDefaults.overlap
    };
  });
}
function joinPlacement(side, align) {
  if (align === "center")
    return side;
  return `${side}-${align}`;
}
function getDateFieldData() {
  const NAME = "date-field";
  const PARTS = ["label", "input", "segment"];
  return {
    NAME,
    PARTS
  };
}
function getPopoverData() {
  const NAME = "popover";
  const PARTS = ["arrow", "close", "content", "trigger"];
  return {
    NAME,
    PARTS
  };
}
function getDateRangePickerData() {
  const NAME = "date-range-picker";
  return {
    NAME
  };
}
function setCtx(props) {
  const { NAME } = getDateRangePickerData();
  const { NAME: CALENDAR_NAME, PARTS: CALENDAR_PARTS } = getCalendarData();
  const getCalendarAttrs = createBitAttrs(CALENDAR_NAME, CALENDAR_PARTS);
  const { NAME: FIELD_NAME, PARTS: FIELD_PARTS } = getDateFieldData();
  const getFieldAttrs = createBitAttrs(FIELD_NAME, FIELD_PARTS);
  const { NAME: POPOVER_NAME, PARTS: POPOVER_PARTS } = getPopoverData();
  const getPopoverAttrs = createBitAttrs(POPOVER_NAME, POPOVER_PARTS);
  const dateRangePicker = {
    ...createDateRangePicker({ ...removeUndefined(props), forceVisible: true }),
    getCalendarAttrs,
    getFieldAttrs,
    getPopoverAttrs
  };
  const updateOption = getOptionUpdater(dateRangePicker.options);
  setContext(NAME, { ...dateRangePicker, updateOption });
  return {
    ...dateRangePicker,
    updateOption
  };
}
function getCtx() {
  const { NAME } = getDateRangePickerData();
  return getContext(NAME);
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
const Date_range_picker_cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let $$restProps = compute_rest_props($$props, ["date", "asChild", "el"]);
  let $isDateDisabled, $$unsubscribe_isDateDisabled;
  let $isDateUnavailable, $$unsubscribe_isDateUnavailable;
  let { date } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { helpers: { isDateDisabled, isDateUnavailable }, getCalendarAttrs } = getCtx();
  $$unsubscribe_isDateDisabled = subscribe(isDateDisabled, (value) => $isDateDisabled = value);
  $$unsubscribe_isDateUnavailable = subscribe(isDateUnavailable, (value) => $isDateUnavailable = value);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0) $$bindings.date(date);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  attrs = {
    ...getCalendarAttrs("cell"),
    "aria-disabled": $isDateDisabled(date) || $isDateUnavailable(date),
    "data-disabled": $isDateDisabled(date) ? "" : void 0,
    role: "gridcell"
  };
  $$unsubscribe_isDateDisabled();
  $$unsubscribe_isDateUnavailable();
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<td${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</td>`}`;
});
const Date_range_picker_day = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let disabled;
  let unavailable;
  let $$restProps = compute_rest_props($$props, ["date", "month", "asChild", "el"]);
  let $isDateUnavailable, $$unsubscribe_isDateUnavailable;
  let $isDateDisabled, $$unsubscribe_isDateDisabled;
  let $cell, $$unsubscribe_cell;
  let { date } = $$props;
  let { month } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { cell }, helpers: { isDateDisabled, isDateUnavailable }, getCalendarAttrs } = getCtx();
  $$unsubscribe_cell = subscribe(cell, (value) => $cell = value);
  $$unsubscribe_isDateDisabled = subscribe(isDateDisabled, (value) => $isDateDisabled = value);
  $$unsubscribe_isDateUnavailable = subscribe(isDateUnavailable, (value) => $isDateUnavailable = value);
  const attrs = getCalendarAttrs("day");
  if ($$props.date === void 0 && $$bindings.date && date !== void 0) $$bindings.date(date);
  if ($$props.month === void 0 && $$bindings.month && month !== void 0) $$bindings.month(month);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $cell(date, month);
  {
    Object.assign(builder, attrs);
  }
  disabled = $isDateDisabled(date);
  unavailable = $isDateUnavailable(date);
  $$unsubscribe_isDateUnavailable();
  $$unsubscribe_isDateDisabled();
  $$unsubscribe_cell();
  return `${asChild ? `${slots.default ? slots.default({ builder, disabled, unavailable }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, disabled, unavailable }) : ` ${escape(date.day)} `}</div>`}`;
});
const Date_range_picker_heading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $heading, $$unsubscribe_heading;
  let $headingValue, $$unsubscribe_headingValue;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { heading }, states: { headingValue }, getCalendarAttrs } = getCtx();
  $$unsubscribe_heading = subscribe(heading, (value) => $heading = value);
  $$unsubscribe_headingValue = subscribe(headingValue, (value) => $headingValue = value);
  const attrs = getCalendarAttrs("heading");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $heading;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_heading();
  $$unsubscribe_headingValue();
  return `${asChild ? `${slots.default ? slots.default({ builder, headingValue: $headingValue }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, headingValue: $headingValue }) : ` ${escape($headingValue)} `}</div>`}`;
});
const Date_range_picker_next_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $nextButton, $$unsubscribe_nextButton;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { nextButton }, getCalendarAttrs } = getCtx();
  $$unsubscribe_nextButton = subscribe(nextButton, (value) => $nextButton = value);
  const attrs = getCalendarAttrs("next-button");
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $nextButton;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_nextButton();
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
const Date_range_picker_prev_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $prevButton, $$unsubscribe_prevButton;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { prevButton }, getCalendarAttrs } = getCtx();
  $$unsubscribe_prevButton = subscribe(prevButton, (value) => $prevButton = value);
  const attrs = getCalendarAttrs("prev-button");
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $prevButton;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_prevButton();
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
const Date_range_picker_calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $localMonths, $$unsubscribe_localMonths;
  let $calendar, $$unsubscribe_calendar;
  let $weekdays, $$unsubscribe_weekdays;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { calendar }, states: { months: localMonths, weekdays }, ids, getCalendarAttrs } = getCtx();
  $$unsubscribe_calendar = subscribe(calendar, (value) => $calendar = value);
  $$unsubscribe_localMonths = subscribe(localMonths, (value) => $localMonths = value);
  $$unsubscribe_weekdays = subscribe(weekdays, (value) => $weekdays = value);
  const attrs = getCalendarAttrs("root");
  let months = $localMonths;
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.calendar.calendar.set(id);
    }
  }
  builder = $calendar;
  {
    Object.assign(builder, attrs);
  }
  months = $localMonths;
  $$unsubscribe_localMonths();
  $$unsubscribe_calendar();
  $$unsubscribe_weekdays();
  return `${asChild ? `${slots.default ? slots.default({ builder, months, weekdays: $weekdays }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, months, weekdays: $weekdays }) : ``}</div>`}`;
});
const Date_range_picker_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el"
  ]);
  let $content, $$unsubscribe_content;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "bottom" } = $$props;
  let { align = "center" } = $$props;
  let { sideOffset = 0 } = $$props;
  let { alignOffset = 0 } = $$props;
  let { collisionPadding = 8 } = $$props;
  let { avoidCollisions = true } = $$props;
  let { collisionBoundary = void 0 } = $$props;
  let { sameWidth = false } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { content }, states: { open }, ids, getPopoverAttrs } = getCtx();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getPopoverAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.alignOffset === void 0 && $$bindings.alignOffset && alignOffset !== void 0) $$bindings.alignOffset(alignOffset);
  if ($$props.collisionPadding === void 0 && $$bindings.collisionPadding && collisionPadding !== void 0) $$bindings.collisionPadding(collisionPadding);
  if ($$props.avoidCollisions === void 0 && $$bindings.avoidCollisions && avoidCollisions !== void 0) $$bindings.avoidCollisions(avoidCollisions);
  if ($$props.collisionBoundary === void 0 && $$bindings.collisionBoundary && collisionBoundary !== void 0) $$bindings.collisionBoundary(collisionBoundary);
  if ($$props.sameWidth === void 0 && $$bindings.sameWidth && sameWidth !== void 0) $$bindings.sameWidth(sameWidth);
  if ($$props.fitViewport === void 0 && $$bindings.fitViewport && fitViewport !== void 0) $$bindings.fitViewport(fitViewport);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0) $$bindings.strategy(strategy);
  if ($$props.overlap === void 0 && $$bindings.overlap && overlap !== void 0) $$bindings.overlap(overlap);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.popover.content.set(id);
    }
  }
  builder = $content;
  {
    Object.assign(builder, attrs);
  }
  {
    updatePositioning({
      side,
      align,
      sideOffset,
      alignOffset,
      collisionPadding,
      avoidCollisions,
      collisionBoundary,
      sameWidth,
      fitViewport,
      strategy,
      overlap
    });
  }
  $$unsubscribe_content();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Date_range_picker_input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $field, $$unsubscribe_field;
  let $segmentContents, $$unsubscribe_segmentContents;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { field }, states: { segmentContents }, ids, getFieldAttrs } = getCtx();
  $$unsubscribe_field = subscribe(field, (value) => $field = value);
  $$unsubscribe_segmentContents = subscribe(segmentContents, (value) => $segmentContents = value);
  const attrs = getFieldAttrs("input");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.rangeField.field.field.set(id);
    }
  }
  builder = $field;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_field();
  $$unsubscribe_segmentContents();
  return `${asChild ? `${slots.default ? slots.default({ builder, segments: $segmentContents }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, segments: $segmentContents }) : ``}</div>`}`;
});
const Date_range_picker_label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $label, $$unsubscribe_label;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { label }, ids, getFieldAttrs } = getCtx();
  $$unsubscribe_label = subscribe(label, (value) => $label = value);
  if (id) {
    ids.rangeField.field.label.set(id);
  }
  const attrs = getFieldAttrs("label");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $label;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_label();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</span>`}`;
});
const Date_range_picker_segment = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "part", "type", "el"]);
  let $endSegment, $$unsubscribe_endSegment;
  let $startSegment, $$unsubscribe_startSegment;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { part } = $$props;
  let { type } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { startSegment, endSegment }, ids, getFieldAttrs } = getCtx();
  $$unsubscribe_startSegment = subscribe(startSegment, (value) => $startSegment = value);
  $$unsubscribe_endSegment = subscribe(endSegment, (value) => $endSegment = value);
  const attrs = getFieldAttrs("segment");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.part === void 0 && $$bindings.part && part !== void 0) $$bindings.part(part);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id && part !== "literal") {
      if (type === "start") {
        ids.rangeField.start[part].set(id);
      } else {
        ids.rangeField.end[part].set(id);
      }
    }
  }
  builder = type === "start" ? $startSegment(part) : $endSegment(part);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_endSegment();
  $$unsubscribe_startSegment();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Date_range_picker_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, ids, getPopoverAttrs } = getCtx();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getPopoverAttrs("trigger");
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.popover.trigger.set(id);
    }
  }
  builder = $trigger;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
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
const Date_range_picker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $localEndValue, $$unsubscribe_localEndValue;
  let $localStartValue, $$unsubscribe_localStartValue;
  let $localValue, $$unsubscribe_localValue;
  let $idValues, $$unsubscribe_idValues;
  let $localIsInvalid, $$unsubscribe_localIsInvalid;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { placeholder = void 0 } = $$props;
  let { onPlaceholderChange = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { isDateUnavailable = void 0 } = $$props;
  let { granularity = void 0 } = $$props;
  let { hideTimeZone = void 0 } = $$props;
  let { hourCycle = void 0 } = $$props;
  let { locale = void 0 } = $$props;
  let { maxValue = void 0 } = $$props;
  let { minValue = void 0 } = $$props;
  let { readonly = void 0 } = $$props;
  let { validationId = void 0 } = $$props;
  let { descriptionId = void 0 } = $$props;
  let { preventDeselect = void 0 } = $$props;
  let { pagedNavigation = void 0 } = $$props;
  let { weekStartsOn = void 0 } = $$props;
  let { isDateDisabled = void 0 } = $$props;
  let { fixedWeeks = void 0 } = $$props;
  let { calendarLabel = void 0 } = $$props;
  let { weekdayFormat = void 0 } = $$props;
  let { startValue = void 0 } = $$props;
  let { numberOfMonths = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { value: localValue, placeholder: localPlaceholder, isInvalid: localIsInvalid, startValue: localStartValue, endValue: localEndValue }, updateOption, ids } = setCtx({
    defaultValue: value,
    defaultPlaceholder: placeholder,
    preventDeselect,
    pagedNavigation,
    weekStartsOn,
    isDateDisabled,
    fixedWeeks,
    calendarLabel,
    disabled,
    granularity,
    hideTimeZone,
    hourCycle,
    locale,
    maxValue,
    minValue,
    readonly,
    weekdayFormat,
    numberOfMonths,
    isDateUnavailable,
    onOutsideClick,
    onValueChange: ({ next }) => {
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    },
    onPlaceholderChange: ({ next }) => {
      if (placeholder !== next) {
        onPlaceholderChange?.(next);
        placeholder = next;
      }
      return next;
    }
  });
  $$unsubscribe_localValue = subscribe(localValue, (value2) => $localValue = value2);
  $$unsubscribe_localIsInvalid = subscribe(localIsInvalid, (value2) => $localIsInvalid = value2);
  $$unsubscribe_localStartValue = subscribe(localStartValue, (value2) => $localStartValue = value2);
  $$unsubscribe_localEndValue = subscribe(localEndValue, (value2) => $localEndValue = value2);
  const startFieldIds = derived(
    [
      ids.rangeField.start.day,
      ids.rangeField.start.dayPeriod,
      ids.rangeField.start.field,
      ids.rangeField.start.hour,
      ids.rangeField.start.minute,
      ids.rangeField.start.month,
      ids.rangeField.start.second,
      ids.rangeField.start.year,
      ids.rangeField.start.timeZoneName
    ],
    ([
      $dayId,
      $dayPeriodId,
      $hourId,
      $minuteId,
      $monthId,
      $secondId,
      $yearId,
      $timeZoneNameId
    ]) => ({
      day: $dayId,
      dayPeriod: $dayPeriodId,
      hour: $hourId,
      minute: $minuteId,
      month: $monthId,
      second: $secondId,
      year: $yearId,
      timeZoneName: $timeZoneNameId
    })
  );
  const endFieldIds = derived(
    [
      ids.rangeField.end.day,
      ids.rangeField.end.dayPeriod,
      ids.rangeField.end.field,
      ids.rangeField.end.hour,
      ids.rangeField.end.minute,
      ids.rangeField.end.month,
      ids.rangeField.end.second,
      ids.rangeField.end.year,
      ids.rangeField.end.timeZoneName
    ],
    ([
      $dayId,
      $dayPeriodId,
      $hourId,
      $minuteId,
      $monthId,
      $secondId,
      $yearId,
      $timeZoneNameId
    ]) => ({
      day: $dayId,
      dayPeriod: $dayPeriodId,
      hour: $hourId,
      minute: $minuteId,
      month: $monthId,
      second: $secondId,
      year: $yearId,
      timeZoneName: $timeZoneNameId
    })
  );
  const idValues = derived(
    [
      ids.rangeField.field.field,
      ids.rangeField.field.description,
      ids.rangeField.field.label,
      ids.rangeField.field.validation,
      ids.calendar.calendar,
      ids.popover.content,
      ids.popover.trigger,
      startFieldIds,
      endFieldIds
    ],
    ([
      $fieldId,
      $descriptionId,
      $labelId,
      $validationId,
      $calendarId,
      $contentId,
      $triggerId,
      $startFieldIds,
      $endFieldIds
    ]) => ({
      field: $fieldId,
      description: $descriptionId,
      label: $labelId,
      validation: $validationId,
      calendar: $calendarId,
      content: $contentId,
      trigger: $triggerId,
      startField: $startFieldIds,
      endField: $endFieldIds
    })
  );
  $$unsubscribe_idValues = subscribe(idValues, (value2) => $idValues = value2);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.onPlaceholderChange === void 0 && $$bindings.onPlaceholderChange && onPlaceholderChange !== void 0) $$bindings.onPlaceholderChange(onPlaceholderChange);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.isDateUnavailable === void 0 && $$bindings.isDateUnavailable && isDateUnavailable !== void 0) $$bindings.isDateUnavailable(isDateUnavailable);
  if ($$props.granularity === void 0 && $$bindings.granularity && granularity !== void 0) $$bindings.granularity(granularity);
  if ($$props.hideTimeZone === void 0 && $$bindings.hideTimeZone && hideTimeZone !== void 0) $$bindings.hideTimeZone(hideTimeZone);
  if ($$props.hourCycle === void 0 && $$bindings.hourCycle && hourCycle !== void 0) $$bindings.hourCycle(hourCycle);
  if ($$props.locale === void 0 && $$bindings.locale && locale !== void 0) $$bindings.locale(locale);
  if ($$props.maxValue === void 0 && $$bindings.maxValue && maxValue !== void 0) $$bindings.maxValue(maxValue);
  if ($$props.minValue === void 0 && $$bindings.minValue && minValue !== void 0) $$bindings.minValue(minValue);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly !== void 0) $$bindings.readonly(readonly);
  if ($$props.validationId === void 0 && $$bindings.validationId && validationId !== void 0) $$bindings.validationId(validationId);
  if ($$props.descriptionId === void 0 && $$bindings.descriptionId && descriptionId !== void 0) $$bindings.descriptionId(descriptionId);
  if ($$props.preventDeselect === void 0 && $$bindings.preventDeselect && preventDeselect !== void 0) $$bindings.preventDeselect(preventDeselect);
  if ($$props.pagedNavigation === void 0 && $$bindings.pagedNavigation && pagedNavigation !== void 0) $$bindings.pagedNavigation(pagedNavigation);
  if ($$props.weekStartsOn === void 0 && $$bindings.weekStartsOn && weekStartsOn !== void 0) $$bindings.weekStartsOn(weekStartsOn);
  if ($$props.isDateDisabled === void 0 && $$bindings.isDateDisabled && isDateDisabled !== void 0) $$bindings.isDateDisabled(isDateDisabled);
  if ($$props.fixedWeeks === void 0 && $$bindings.fixedWeeks && fixedWeeks !== void 0) $$bindings.fixedWeeks(fixedWeeks);
  if ($$props.calendarLabel === void 0 && $$bindings.calendarLabel && calendarLabel !== void 0) $$bindings.calendarLabel(calendarLabel);
  if ($$props.weekdayFormat === void 0 && $$bindings.weekdayFormat && weekdayFormat !== void 0) $$bindings.weekdayFormat(weekdayFormat);
  if ($$props.startValue === void 0 && $$bindings.startValue && startValue !== void 0) $$bindings.startValue(startValue);
  if ($$props.numberOfMonths === void 0 && $$bindings.numberOfMonths && numberOfMonths !== void 0) $$bindings.numberOfMonths(numberOfMonths);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0) $$bindings.onOutsideClick(onOutsideClick);
  {
    if (validationId) {
      ids.rangeField.field.validation.set(validationId);
    }
  }
  {
    if (descriptionId) {
      ids.rangeField.field.description.set(descriptionId);
    }
  }
  startValue = $localStartValue;
  {
    if (value !== $localValue) {
      const nextValue = { start: value?.start, end: value?.end };
      if (nextValue.start !== $localStartValue) localStartValue.set(nextValue.start);
      if (nextValue.end !== $localEndValue) localEndValue.set(nextValue.end);
      localValue.set(nextValue);
    }
  }
  placeholder !== void 0 && localPlaceholder.set(placeholder);
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("isDateUnavailable", isDateUnavailable);
  }
  {
    updateOption("granularity", granularity);
  }
  {
    updateOption("hideTimeZone", hideTimeZone);
  }
  {
    updateOption("hourCycle", hourCycle);
  }
  {
    updateOption("locale", locale);
  }
  {
    updateOption("maxValue", maxValue);
  }
  {
    updateOption("minValue", minValue);
  }
  {
    updateOption("readonly", readonly);
  }
  {
    updateOption("fixedWeeks", fixedWeeks);
  }
  {
    updateOption("preventDeselect", preventDeselect);
  }
  {
    updateOption("pagedNavigation", pagedNavigation);
  }
  {
    updateOption("weekStartsOn", weekStartsOn);
  }
  {
    updateOption("isDateDisabled", isDateDisabled);
  }
  {
    updateOption("calendarLabel", calendarLabel);
  }
  {
    updateOption("weekdayFormat", weekdayFormat);
  }
  {
    updateOption("numberOfMonths", numberOfMonths);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_localEndValue();
  $$unsubscribe_localStartValue();
  $$unsubscribe_localValue();
  $$unsubscribe_idValues();
  $$unsubscribe_localIsInvalid();
  return `${slots.default ? slots.default({
    ids: $idValues,
    isInvalid: $localIsInvalid,
    startValue: $localStartValue,
    endValue: $localEndValue
  }) : ``}`;
});
const Date_range_picker_grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $grid, $$unsubscribe_grid;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { grid }, getCalendarAttrs } = getCtx();
  $$unsubscribe_grid = subscribe(grid, (value) => $grid = value);
  const attrs = getCalendarAttrs("grid");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $grid;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_grid();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<table${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</table>`}`;
});
const Date_range_picker_grid_body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getCalendarAttrs } = getCtx();
  const attrs = getCalendarAttrs("grid-body");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<tbody${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</tbody>`}`;
});
const Date_range_picker_grid_head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getCalendarAttrs } = getCtx();
  const attrs = {
    ...getCalendarAttrs("grid-head"),
    "aria-hidden": true
  };
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<thead${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</thead>`}`;
});
const Date_range_picker_grid_row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getCalendarAttrs } = getCtx();
  const attrs = getCalendarAttrs("grid-row");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<tr${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</tr>`}`;
});
const Date_range_picker_head_cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getCalendarAttrs } = getCtx();
  const attrs = getCalendarAttrs("head-cell");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<th${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</th>`}`;
});
const Date_range_picker_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { getCalendarAttrs } = getCtx();
  const attrs = getCalendarAttrs("header");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<header${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</header>`}`;
});
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0) return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function flyAndScale(node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;
  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;
    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;
    return valueB;
  };
  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);
      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
}
const css = {
  code: "main.svelte-1j3ogha{display:flex;flex-direction:column}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { flyAndScale, cn } from \\"$src/lib/utils/flyAndScale\\";\\nimport { DateRangePicker } from \\"bits-ui\\";\\nlet value = void 0;\\nexport let data;\\nlet tickets = data.tickets;\\n<\/script>\\n\\n<main>\\n  <div class=\\"control\\">\\n    <DateRangePicker.Root bind:value weekdayFormat=\\"short\\" fixedWeeks={true}>\\n      <div class=\\"flex w-full max-w-[320px] flex-col gap-1.5\\">\\n        <DateRangePicker.Label class=\\"block select-none text-sm font-medium\\">\\n          Periode\\n        </DateRangePicker.Label>\\n        <DateRangePicker.Input\\n          let:segments\\n          class=\\"flex h-input w-full max-w-[320px] select-none items-center rounded-input border border-border-input bg-background px-2 py-3 text-sm tracking-[0.01em] text-foreground focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover\\"\\n        >\\n          {#each segments.start as { part, value }}\\n            <div class=\\"inline-block select-none\\">\\n              {#if part === \\"literal\\"}\\n                <DateRangePicker.Segment type=\\"start\\" {part} class=\\"p-1 text-muted-foreground\\">\\n                  {value}\\n                </DateRangePicker.Segment>\\n              {:else}\\n                <DateRangePicker.Segment\\n                  type=\\"start\\"\\n                  {part}\\n                  class=\\"rounded-5px px-1 py-1 hover:bg-muted focus:bg-muted focus:text-foreground focus-visible:!ring-0 focus-visible:!ring-offset-0 aria-[valuetext=Empty]:text-muted-foreground\\"\\n                >\\n                  {value}\\n                </DateRangePicker.Segment>\\n              {/if}\\n            </div>\\n          {/each}\\n          <div aria-hidden class=\\"px-1 text-muted-foreground\\">–</div>\\n          {#each segments.end as { part, value }}\\n            <div class=\\"inline-block select-none\\">\\n              {#if part === \\"literal\\"}\\n                <DateRangePicker.Segment type=\\"end\\" {part} class=\\"p-1 text-muted-foreground\\">\\n                  {value}\\n                </DateRangePicker.Segment>\\n              {:else}\\n                <DateRangePicker.Segment\\n                  type=\\"end\\"\\n                  {part}\\n                  class=\\"rounded-5px px-1 py-1 hover:bg-muted focus:bg-muted focus:text-foreground focus-visible:!ring-0 focus-visible:!ring-offset-0 aria-[valuetext=Empty]:text-muted-foreground\\"\\n                >\\n                  {value}\\n                </DateRangePicker.Segment>\\n              {/if}\\n            </div>\\n          {/each}\\n          <DateRangePicker.Trigger\\n            class=\\"ml-auto inline-flex size-8 items-center justify-center rounded-[5px] text-foreground/60 transition-all hover:bg-muted active:bg-dark-10\\"\\n          >\\n            <!--<CalendarBlank class=\\"size-6\\" /> -->\\n          </DateRangePicker.Trigger>\\n        </DateRangePicker.Input>\\n        <DateRangePicker.Content sideOffset={6} transition={flyAndScale} class=\\"z-50 bg-slate-100\\">\\n          <DateRangePicker.Calendar\\n            class=\\"mt-6 rounded-15px border border-dark-10 bg-background-alt p-[22px] shadow-popover\\"\\n            let:months\\n            let:weekdays\\n          >\\n            <DateRangePicker.Header class=\\"flex items-center justify-between\\">\\n              <DateRangePicker.PrevButton\\n                class=\\"inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98\\"\\n              >\\n                <!--<CaretLeft class=\\"size-6\\" />-->\\n              </DateRangePicker.PrevButton>\\n              <DateRangePicker.Heading class=\\"text-[15px] font-medium\\" />\\n              <DateRangePicker.NextButton\\n                class=\\"inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98\\"\\n              >\\n                <!-- <CaretRight class=\\"size-6\\" />-->\\n              </DateRangePicker.NextButton>\\n            </DateRangePicker.Header>\\n            <div class=\\"flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0\\">\\n              {#each months as month}\\n                <DateRangePicker.Grid class=\\"w-full border-collapse select-none space-y-1\\">\\n                  <DateRangePicker.GridHead>\\n                    <DateRangePicker.GridRow class=\\"mb-1 flex w-full justify-between\\">\\n                      {#each weekdays as day}\\n                        <DateRangePicker.HeadCell\\n                          class=\\"w-10 rounded-md text-xs !font-normal text-muted-foreground\\"\\n                        >\\n                          <div>{day.slice(0, 2)}</div>\\n                        </DateRangePicker.HeadCell>\\n                      {/each}\\n                    </DateRangePicker.GridRow>\\n                  </DateRangePicker.GridHead>\\n                  <DateRangePicker.GridBody>\\n                    {#each month.weeks as weekDates}\\n                      <DateRangePicker.GridRow class=\\"flex w-full\\">\\n                        {#each weekDates as date}\\n                          <DateRangePicker.Cell\\n                            {date}\\n                            class=\\"relative m-0 size-10 overflow-visible !p-0 text-center text-sm focus-within:relative focus-within:z-20\\"\\n                          >\\n                            <DateRangePicker.Day\\n                              {date}\\n                              month={month.value}\\n                              class={cn(\\n                                \\"group relative inline-flex size-10 items-center justify-center overflow-visible whitespace-nowrap rounded-9px border border-transparent bg-background bg-transparent p-0 text-sm font-normal text-foreground transition-all hover:border-foreground  focus-visible:!ring-foreground data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none data-[highlighted]:rounded-none data-[selection-end]:rounded-9px data-[selection-start]:rounded-9px data-[highlighted]:bg-muted data-[selected]:bg-muted data-[selection-end]:bg-foreground data-[selection-start]:bg-foreground data-[selected]:font-medium data-[selection-end]:font-medium data-[selection-start]:font-medium data-[disabled]:text-foreground/30 data-[selected]:text-foreground data-[selection-end]:text-background data-[selection-start]:text-background data-[unavailable]:text-muted-foreground data-[unavailable]:line-through data-[selection-start]:focus-visible:ring-2 data-[selection-start]:focus-visible:!ring-offset-2 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:border-foreground data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:!ring-0 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:!ring-offset-0\\"\\n                              )}>\\n                              <div\\n                                class=\\"absolute top-[5px] hidden size-1 rounded-full bg-foreground transition-all group-data-[today]:block group-data-[selected]:bg-background\\"\\n                              />\\n                              {date.day}\\n                            </DateRangePicker.Day>\\n                          </DateRangePicker.Cell>\\n                        {/each}\\n                      </DateRangePicker.GridRow>\\n                    {/each}\\n                  </DateRangePicker.GridBody>\\n                </DateRangePicker.Grid>\\n              {/each}\\n            </div>\\n          </DateRangePicker.Calendar>\\n        </DateRangePicker.Content>\\n      </div>\\n    </DateRangePicker.Root>\\n  </div>\\n\\n  <table class=\\"table-auto min-w-full text-start text-sm font-light text-surface dark:text-white\\">\\n    <thead class=\\"border-b border-neutral-200 font-medium dark:border-white/10\\">\\n      <tr>\\n        <th scope=\\"col\\" class=\\"px-6 py-4\\">id</th>\\n        <th scope=\\"col\\" class=\\"px-6 py-4\\">creationTime</th>\\n        <th scope=\\"col\\" class=\\"px-6 py-4\\">number</th>\\n        <th scope=\\"col\\" class=\\"px-6 py-4\\">workerId</th>\\n        <th scope=\\"col\\" class=\\"px-6 py-4\\">name</th>\\n\\n        <th scope=\\"col\\" class=\\"px-6 py-4\\">rdvTime</th>\\n        <th scope=\\"col\\" class=\\"px-6 py-4\\">expectedTime</th>\\n        <th scope=\\"col\\" class=\\"px-6 py-4\\">startedTime</th>\\n        <th scope=\\"col\\" class=\\"px-6 py-4\\">doneTime</th>\\n        <th scope=\\"col\\" class=\\"px-6 py-4\\">canceledTime</th>\\n      </tr>\\n    </thead>\\n    <tbody>\\n      {#each tickets as ticket}\\n        <tr class=\\"border-b border-neutral-200 dark:border-white/10\\">\\n          <td class=\\"border-b border-neutral-200 dark:border-white/10\\">{ticket.id}</td>\\n          <td class=\\"border-b border-neutral-200 dark:border-white/10\\">{ticket.creationTime}</td>\\n          <td class=\\"border-b border-neutral-200 dark:border-white/10\\">{ticket.number}</td>\\n          <td class=\\"border-b border-neutral-200 dark:border-white/10\\">{ticket.workerId}</td>\\n          <td class=\\"border-b border-neutral-200 dark:border-white/10\\">{ticket.name}</td>\\n\\n          <td class=\\"border-b border-neutral-200 dark:border-white/10\\">{ticket.rdvTime}</td>\\n          <td class=\\"border-b border-neutral-200 dark:border-white/10\\">{ticket.expectedTime}</td>\\n          <td class=\\"border-b border-neutral-200 dark:border-white/10\\">{ticket.startedTime}</td>\\n          <td class=\\"border-b border-neutral-200 dark:border-white/10\\">{ticket.doneTime}</td>\\n          <td class=\\"border-b border-neutral-200 dark:border-white/10\\">{ticket.canceledTime}</td>\\n        </tr>\\n      {/each}\\n    </tbody>\\n  </table>\\n</main>\\n\\n<style>\\n  main {\\n    display: flex;\\n    flex-direction: column;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAkKE,mBAAK,CACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAClB"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let value = void 0;
  let { data } = $$props;
  let tickets = data.tickets;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<main class="svelte-1j3ogha"><div class="control">${validate_component(Date_range_picker, "DateRangePicker.Root").$$render(
      $$result,
      {
        weekdayFormat: "short",
        fixedWeeks: true,
        value
      },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="flex w-full max-w-[320px] flex-col gap-1.5">${validate_component(Date_range_picker_label, "DateRangePicker.Label").$$render(
            $$result,
            {
              class: "block select-none text-sm font-medium"
            },
            {},
            {
              default: () => {
                return `Periode`;
              }
            }
          )} ${validate_component(Date_range_picker_input, "DateRangePicker.Input").$$render(
            $$result,
            {
              class: "flex h-input w-full max-w-[320px] select-none items-center rounded-input border border-border-input bg-background px-2 py-3 text-sm tracking-[0.01em] text-foreground focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover"
            },
            {},
            {
              default: ({ segments }) => {
                return `${each(segments.start, ({ part, value: value2 }) => {
                  return `<div class="inline-block select-none">${part === "literal" ? `${validate_component(Date_range_picker_segment, "DateRangePicker.Segment").$$render(
                    $$result,
                    {
                      type: "start",
                      part,
                      class: "p-1 text-muted-foreground"
                    },
                    {},
                    {
                      default: () => {
                        return `${escape(value2)} `;
                      }
                    }
                  )}` : `${validate_component(Date_range_picker_segment, "DateRangePicker.Segment").$$render(
                    $$result,
                    {
                      type: "start",
                      part,
                      class: "rounded-5px px-1 py-1 hover:bg-muted focus:bg-muted focus:text-foreground focus-visible:!ring-0 focus-visible:!ring-offset-0 aria-[valuetext=Empty]:text-muted-foreground"
                    },
                    {},
                    {
                      default: () => {
                        return `${escape(value2)} `;
                      }
                    }
                  )}`} </div>`;
                })} <div aria-hidden class="px-1 text-muted-foreground" data-svelte-h="svelte-1mom471">–</div> ${each(segments.end, ({ part, value: value2 }) => {
                  return `<div class="inline-block select-none">${part === "literal" ? `${validate_component(Date_range_picker_segment, "DateRangePicker.Segment").$$render(
                    $$result,
                    {
                      type: "end",
                      part,
                      class: "p-1 text-muted-foreground"
                    },
                    {},
                    {
                      default: () => {
                        return `${escape(value2)} `;
                      }
                    }
                  )}` : `${validate_component(Date_range_picker_segment, "DateRangePicker.Segment").$$render(
                    $$result,
                    {
                      type: "end",
                      part,
                      class: "rounded-5px px-1 py-1 hover:bg-muted focus:bg-muted focus:text-foreground focus-visible:!ring-0 focus-visible:!ring-offset-0 aria-[valuetext=Empty]:text-muted-foreground"
                    },
                    {},
                    {
                      default: () => {
                        return `${escape(value2)} `;
                      }
                    }
                  )}`} </div>`;
                })} ${validate_component(Date_range_picker_trigger, "DateRangePicker.Trigger").$$render(
                  $$result,
                  {
                    class: "ml-auto inline-flex size-8 items-center justify-center rounded-[5px] text-foreground/60 transition-all hover:bg-muted active:bg-dark-10"
                  },
                  {},
                  {}
                )}`;
              }
            }
          )} ${validate_component(Date_range_picker_content, "DateRangePicker.Content").$$render(
            $$result,
            {
              sideOffset: 6,
              transition: flyAndScale,
              class: "z-50 bg-slate-100"
            },
            {},
            {
              default: () => {
                return `${validate_component(Date_range_picker_calendar, "DateRangePicker.Calendar").$$render(
                  $$result,
                  {
                    class: "mt-6 rounded-15px border border-dark-10 bg-background-alt p-[22px] shadow-popover"
                  },
                  {},
                  {
                    default: ({ months, weekdays }) => {
                      return `${validate_component(Date_range_picker_header, "DateRangePicker.Header").$$render(
                        $$result,
                        {
                          class: "flex items-center justify-between"
                        },
                        {},
                        {
                          default: () => {
                            return `${validate_component(Date_range_picker_prev_button, "DateRangePicker.PrevButton").$$render(
                              $$result,
                              {
                                class: "inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98"
                              },
                              {},
                              {}
                            )} ${validate_component(Date_range_picker_heading, "DateRangePicker.Heading").$$render($$result, { class: "text-[15px] font-medium" }, {}, {})} ${validate_component(Date_range_picker_next_button, "DateRangePicker.NextButton").$$render(
                              $$result,
                              {
                                class: "inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98"
                              },
                              {},
                              {}
                            )}`;
                          }
                        }
                      )} <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">${each(months, (month) => {
                        return `${validate_component(Date_range_picker_grid, "DateRangePicker.Grid").$$render(
                          $$result,
                          {
                            class: "w-full border-collapse select-none space-y-1"
                          },
                          {},
                          {
                            default: () => {
                              return `${validate_component(Date_range_picker_grid_head, "DateRangePicker.GridHead").$$render($$result, {}, {}, {
                                default: () => {
                                  return `${validate_component(Date_range_picker_grid_row, "DateRangePicker.GridRow").$$render(
                                    $$result,
                                    {
                                      class: "mb-1 flex w-full justify-between"
                                    },
                                    {},
                                    {
                                      default: () => {
                                        return `${each(weekdays, (day) => {
                                          return `${validate_component(Date_range_picker_head_cell, "DateRangePicker.HeadCell").$$render(
                                            $$result,
                                            {
                                              class: "w-10 rounded-md text-xs !font-normal text-muted-foreground"
                                            },
                                            {},
                                            {
                                              default: () => {
                                                return `<div>${escape(day.slice(0, 2))}</div> `;
                                              }
                                            }
                                          )}`;
                                        })} `;
                                      }
                                    }
                                  )} `;
                                }
                              })} ${validate_component(Date_range_picker_grid_body, "DateRangePicker.GridBody").$$render($$result, {}, {}, {
                                default: () => {
                                  return `${each(month.weeks, (weekDates) => {
                                    return `${validate_component(Date_range_picker_grid_row, "DateRangePicker.GridRow").$$render($$result, { class: "flex w-full" }, {}, {
                                      default: () => {
                                        return `${each(weekDates, (date) => {
                                          return `${validate_component(Date_range_picker_cell, "DateRangePicker.Cell").$$render(
                                            $$result,
                                            {
                                              date,
                                              class: "relative m-0 size-10 overflow-visible !p-0 text-center text-sm focus-within:relative focus-within:z-20"
                                            },
                                            {},
                                            {
                                              default: () => {
                                                return `${validate_component(Date_range_picker_day, "DateRangePicker.Day").$$render(
                                                  $$result,
                                                  {
                                                    date,
                                                    month: month.value,
                                                    class: cn("group relative inline-flex size-10 items-center justify-center overflow-visible whitespace-nowrap rounded-9px border border-transparent bg-background bg-transparent p-0 text-sm font-normal text-foreground transition-all hover:border-foreground  focus-visible:!ring-foreground data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none data-[highlighted]:rounded-none data-[selection-end]:rounded-9px data-[selection-start]:rounded-9px data-[highlighted]:bg-muted data-[selected]:bg-muted data-[selection-end]:bg-foreground data-[selection-start]:bg-foreground data-[selected]:font-medium data-[selection-end]:font-medium data-[selection-start]:font-medium data-[disabled]:text-foreground/30 data-[selected]:text-foreground data-[selection-end]:text-background data-[selection-start]:text-background data-[unavailable]:text-muted-foreground data-[unavailable]:line-through data-[selection-start]:focus-visible:ring-2 data-[selection-start]:focus-visible:!ring-offset-2 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:border-foreground data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:!ring-0 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:!ring-offset-0")
                                                  },
                                                  {},
                                                  {
                                                    default: () => {
                                                      return `<div class="absolute top-[5px] hidden size-1 rounded-full bg-foreground transition-all group-data-[today]:block group-data-[selected]:bg-background"></div> ${escape(date.day)} `;
                                                    }
                                                  }
                                                )} `;
                                              }
                                            }
                                          )}`;
                                        })} `;
                                      }
                                    })}`;
                                  })} `;
                                }
                              })} `;
                            }
                          }
                        )}`;
                      })}</div>`;
                    }
                  }
                )}`;
              }
            }
          )}</div>`;
        }
      }
    )}</div> <table class="table-auto min-w-full text-start text-sm font-light text-surface dark:text-white"><thead class="border-b border-neutral-200 font-medium dark:border-white/10" data-svelte-h="svelte-1af7eka"><tr><th scope="col" class="px-6 py-4">id</th> <th scope="col" class="px-6 py-4">creationTime</th> <th scope="col" class="px-6 py-4">number</th> <th scope="col" class="px-6 py-4">workerId</th> <th scope="col" class="px-6 py-4">name</th> <th scope="col" class="px-6 py-4">rdvTime</th> <th scope="col" class="px-6 py-4">expectedTime</th> <th scope="col" class="px-6 py-4">startedTime</th> <th scope="col" class="px-6 py-4">doneTime</th> <th scope="col" class="px-6 py-4">canceledTime</th></tr></thead> <tbody>${each(tickets, (ticket) => {
      return `<tr class="border-b border-neutral-200 dark:border-white/10"><td class="border-b border-neutral-200 dark:border-white/10">${escape(ticket.id)}</td> <td class="border-b border-neutral-200 dark:border-white/10">${escape(ticket.creationTime)}</td> <td class="border-b border-neutral-200 dark:border-white/10">${escape(ticket.number)}</td> <td class="border-b border-neutral-200 dark:border-white/10">${escape(ticket.workerId)}</td> <td class="border-b border-neutral-200 dark:border-white/10">${escape(ticket.name)}</td> <td class="border-b border-neutral-200 dark:border-white/10">${escape(ticket.rdvTime)}</td> <td class="border-b border-neutral-200 dark:border-white/10">${escape(ticket.expectedTime)}</td> <td class="border-b border-neutral-200 dark:border-white/10">${escape(ticket.startedTime)}</td> <td class="border-b border-neutral-200 dark:border-white/10">${escape(ticket.doneTime)}</td> <td class="border-b border-neutral-200 dark:border-white/10">${escape(ticket.canceledTime)}</td> </tr>`;
    })}</tbody></table> </main>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};

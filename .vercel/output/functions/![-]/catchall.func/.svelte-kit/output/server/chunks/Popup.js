import { s as setContext, g as getContext, c as create_ssr_component, f as spread, h as escape_object, a as add_attribute, v as validate_component, o as onDestroy, b as createEventDispatcher, e as escape, m as missing_component, d as each } from "./ssr.js";
import { I as Icon } from "./Icon.js";
import "dequal";
import { o as omit$1, w as withGet, m as makeElement, e as executeCallbacks, a as addMeltEventListener, k as kbd, s as styleToString$1, u as useEscapeKeydown, q as effect$1, n as noop$1, t as portalAttr, h as isBrowser$1, c as createElHelpers, i as isHTMLElement$1 } from "./create.js";
import { w as writable, d as derived, r as readable } from "./index2.js";
import { s as subscribe, c as compute_rest_props, g as get_store_value } from "./utils.js";
import { g as generateIds, t as tick, a as useModal, c as createFocusTrap, d as getPortalDestination, u as usePortal, r as removeScroll, h as handleFocus } from "./action.js";
import { t as toWritableStores$1, o as overridable$1, c as createBitAttrs, r as removeUndefined$1, g as getOptionUpdater$1 } from "./updater.js";
import { c as cn, B as Button } from "./button.js";
import "clsx";
import { d as displayPriceInDollars } from "./formater.js";
import { l as languageTag } from "./runtime.js";
import { l as location } from "./location.store.js";
import { s as shopStore } from "./basketStore.js";
const { name } = createElHelpers("dialog");
const defaults = {
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  role: "dialog",
  defaultOpen: false,
  portal: void 0,
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0
};
const dialogIdParts = ["content", "title", "description"];
function createDialog(props) {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores$1(omit$1(withDefaults, "ids"));
  const { preventScroll: preventScroll2, closeOnEscape, closeOnOutsideClick, role, portal, forceVisible, openFocus, closeFocus, onOutsideClick } = options;
  const activeTrigger = withGet.writable(null);
  const ids = toWritableStores$1({
    ...generateIds(dialogIdParts),
    ...withDefaults.ids
  });
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable$1(openWritable, withDefaults?.onOpenChange);
  const isVisible = derived([open, forceVisible], ([$open, $forceVisible]) => {
    return $open || $forceVisible;
  });
  let unsubScroll = noop$1;
  function handleOpen(e) {
    const el = e.currentTarget;
    const triggerEl = e.currentTarget;
    if (!isHTMLElement$1(el) || !isHTMLElement$1(triggerEl))
      return;
    open.set(true);
    activeTrigger.set(triggerEl);
  }
  function handleClose() {
    open.set(false);
    handleFocus({
      prop: closeFocus.get(),
      defaultEl: activeTrigger.get()
    });
  }
  const trigger = makeElement(name("trigger"), {
    stores: [open],
    returned: ([$open]) => {
      return {
        "aria-haspopup": "dialog",
        "aria-expanded": $open,
        type: "button"
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        handleOpen(e);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        handleOpen(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const overlay = makeElement(name("overlay"), {
    stores: [isVisible, open],
    returned: ([$isVisible, $open]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString$1({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": true,
        "data-state": $open ? "open" : "closed"
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop$1;
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
      return {
        destroy() {
          unsubEscapeKeydown();
        }
      };
    }
  });
  const content = makeElement(name("content"), {
    stores: [isVisible, ids.content, ids.description, ids.title, open],
    returned: ([$isVisible, $contentId, $descriptionId, $titleId, $open]) => {
      return {
        id: $contentId,
        role: role.get(),
        "aria-describedby": $descriptionId,
        "aria-labelledby": $titleId,
        "aria-modal": $isVisible ? "true" : void 0,
        "data-state": $open ? "open" : "closed",
        tabindex: -1,
        hidden: $isVisible ? void 0 : true,
        style: styleToString$1({
          display: $isVisible ? void 0 : "none"
        })
      };
    },
    action: (node) => {
      let activate = noop$1;
      let deactivate = noop$1;
      const destroy = executeCallbacks(effect$1([open, closeOnOutsideClick, closeOnEscape], ([$open, $closeOnOutsideClick, $closeOnEscape]) => {
        if (!$open)
          return;
        const focusTrap = createFocusTrap({
          immediate: false,
          escapeDeactivates: $closeOnEscape,
          clickOutsideDeactivates: $closeOnOutsideClick,
          allowOutsideClick: true,
          returnFocusOnDeactivate: false,
          fallbackFocus: node
        });
        activate = focusTrap.activate;
        deactivate = focusTrap.deactivate;
        const ac = focusTrap.useFocusTrap(node);
        if (ac && ac.destroy) {
          return ac.destroy;
        } else {
          return focusTrap.deactivate;
        }
      }), effect$1([closeOnOutsideClick, open], ([$closeOnOutsideClick, $open]) => {
        return useModal(node, {
          open: $open,
          closeOnInteractOutside: $closeOnOutsideClick,
          onClose() {
            handleClose();
          },
          shouldCloseOnInteractOutside(e) {
            onOutsideClick.get()?.(e);
            if (e.defaultPrevented)
              return false;
            return true;
          }
        }).destroy;
      }), effect$1([closeOnEscape], ([$closeOnEscape]) => {
        if (!$closeOnEscape)
          return noop$1;
        return useEscapeKeydown(node, { handler: handleClose }).destroy;
      }), effect$1([isVisible], ([$isVisible]) => {
        tick().then(() => {
          if (!$isVisible) {
            deactivate();
          } else {
            activate();
          }
        });
      }));
      return {
        destroy: () => {
          unsubScroll();
          destroy();
        }
      };
    }
  });
  const portalled = makeElement(name("portalled"), {
    stores: portal,
    returned: ($portal) => ({
      "data-portal": portalAttr($portal)
    }),
    action: (node) => {
      const unsubPortal = effect$1([portal], ([$portal]) => {
        if ($portal === null)
          return noop$1;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return noop$1;
        return usePortal(node, portalDestination).destroy;
      });
      return {
        destroy() {
          unsubPortal();
        }
      };
    }
  });
  const title = makeElement(name("title"), {
    stores: [ids.title],
    returned: ([$titleId]) => ({
      id: $titleId
    })
  });
  const description = makeElement(name("description"), {
    stores: [ids.description],
    returned: ([$descriptionId]) => ({
      id: $descriptionId
    })
  });
  const close = makeElement(name("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.SPACE && e.key !== kbd.ENTER)
          return;
        e.preventDefault();
        handleClose();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect$1([open, preventScroll2], ([$open, $preventScroll]) => {
    if (!isBrowser$1)
      return;
    if ($preventScroll && $open)
      unsubScroll = removeScroll();
    if ($open) {
      const contentEl = document.getElementById(ids.content.get());
      handleFocus({ prop: openFocus.get(), defaultEl: contentEl });
    }
    return () => {
      if (!forceVisible.get()) {
        unsubScroll();
      }
    };
  });
  return {
    ids,
    elements: {
      content,
      trigger,
      title,
      description,
      overlay,
      close,
      portalled
    },
    states: {
      open
    },
    options
  };
}
function getDialogData() {
  const NAME = "dialog";
  const PARTS = [
    "close",
    "content",
    "description",
    "overlay",
    "portal",
    "title",
    "trigger"
  ];
  return {
    NAME,
    PARTS
  };
}
function setCtx$1(props) {
  const { NAME, PARTS } = getDialogData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const dialog = {
    ...createDialog({ ...removeUndefined$1(props), role: "dialog", forceVisible: true }),
    getAttrs
  };
  setContext(NAME, dialog);
  return {
    ...dialog,
    updateOption: getOptionUpdater$1(dialog.options)
  };
}
function getCtx$1() {
  const { NAME } = getDialogData();
  return getContext(NAME);
}
const Dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { preventScroll: preventScroll2 = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { openFocus = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx$1({
    closeOnEscape,
    preventScroll: preventScroll2,
    closeOnOutsideClick,
    portal,
    forceVisible: true,
    defaultOpen: open,
    openFocus,
    closeFocus,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.content, ids.description, ids.title], ([$contentId, $descriptionId, $titleId]) => ({
    content: $contentId,
    description: $descriptionId,
    title: $titleId
  }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll2 !== void 0) $$bindings.preventScroll(preventScroll2);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0) $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0) $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0) $$bindings.portal(portal);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0) $$bindings.onOpenChange(onOpenChange);
  if ($$props.openFocus === void 0 && $$bindings.openFocus && openFocus !== void 0) $$bindings.openFocus(openFocus);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0) $$bindings.closeFocus(closeFocus);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0) $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("preventScroll", preventScroll2);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("openFocus", openFocus);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Dialog_portal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $portalled, $$unsubscribe_portalled;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { portalled }, getAttrs } = getCtx$1();
  $$unsubscribe_portalled = subscribe(portalled, (value) => $portalled = value);
  const attrs = getAttrs("portal");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $portalled;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_portalled();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Dialog_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { el = void 0 } = $$props;
  const { elements: { content }, states: { open }, ids, getAttrs } = getCtx$1();
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.content.set(id);
    }
  }
  builder = $content;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_content();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Dialog_overlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "el"
  ]);
  let $overlay, $$unsubscribe_overlay;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { overlay }, states: { open }, getAttrs } = getCtx$1();
  $$unsubscribe_overlay = subscribe(overlay, (value) => $overlay = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  const attrs = getAttrs("overlay");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $overlay;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_overlay();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${inTransition && outTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${inTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${outTransition && $open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${$open ? ` <div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : ``}`}`}`}`}`}`;
});
const popupInfosTitleAcompte$a = /* @__NO_SIDE_EFFECTS__ */ () => `Acompte de garantie`;
const popupInfosTitleAcompte$9 = /* @__NO_SIDE_EFFECTS__ */ () => `وديعة تأمين`;
const popupInfosTitleAcompte$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Security deposit`;
const popupInfosTitleAcompte$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Depósito de seguridad`;
const popupInfosTitleAcompte$6 = /* @__NO_SIDE_EFFECTS__ */ () => `सुरक्षा जमा राशि`;
const popupInfosTitleAcompte$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Deposito cauzionale`;
const popupInfosTitleAcompte$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Borgsom`;
const popupInfosTitleAcompte$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Depósito de segurança`;
const popupInfosTitleAcompte$2 = /* @__NO_SIDE_EFFECTS__ */ () => `залог`;
const popupInfosTitleAcompte$1 = /* @__NO_SIDE_EFFECTS__ */ () => `保证金`;
const popupInfosTitleAcompte = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTitleAcompte$9,
    en: popupInfosTitleAcompte$8,
    es: popupInfosTitleAcompte$7,
    fr: popupInfosTitleAcompte$a,
    hi: popupInfosTitleAcompte$6,
    it: popupInfosTitleAcompte$5,
    nl: popupInfosTitleAcompte$4,
    pt: popupInfosTitleAcompte$3,
    ru: popupInfosTitleAcompte$2,
    zh: popupInfosTitleAcompte$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTitleFees$a = /* @__NO_SIDE_EFFECTS__ */ () => `Frais de service`;
const popupInfosTitleFees$9 = /* @__NO_SIDE_EFFECTS__ */ () => `رسوم الخدمة`;
const popupInfosTitleFees$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Service fees`;
const popupInfosTitleFees$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Tarifas de servicio`;
const popupInfosTitleFees$6 = /* @__NO_SIDE_EFFECTS__ */ () => `सेवा शुल्क`;
const popupInfosTitleFees$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Commissioni di servizio`;
const popupInfosTitleFees$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Servicekosten`;
const popupInfosTitleFees$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Taxas de serviço`;
const popupInfosTitleFees$2 = /* @__NO_SIDE_EFFECTS__ */ () => `плата за услуги`;
const popupInfosTitleFees$1 = /* @__NO_SIDE_EFFECTS__ */ () => `服务费`;
const popupInfosTitleFees = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTitleFees$9,
    en: popupInfosTitleFees$8,
    es: popupInfosTitleFees$7,
    fr: popupInfosTitleFees$a,
    hi: popupInfosTitleFees$6,
    it: popupInfosTitleFees$5,
    nl: popupInfosTitleFees$4,
    pt: popupInfosTitleFees$3,
    ru: popupInfosTitleFees$2,
    zh: popupInfosTitleFees$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTitleHours$a = /* @__NO_SIDE_EFFECTS__ */ () => `Heure de passage estimée`;
const popupInfosTitleHours$9 = /* @__NO_SIDE_EFFECTS__ */ () => `الوقت المتوقع للوصول`;
const popupInfosTitleHours$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Estimated time of arrival`;
const popupInfosTitleHours$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Hora estimada de llegada`;
const popupInfosTitleHours$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आगमन का अनुमानित समय`;
const popupInfosTitleHours$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Orario di arrivo stimato`;
const popupInfosTitleHours$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Geschatte aankomsttijd`;
const popupInfosTitleHours$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Horário estimado de chegada`;
const popupInfosTitleHours$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Ориентировочное время прибытия`;
const popupInfosTitleHours$1 = /* @__NO_SIDE_EFFECTS__ */ () => `预计到达时间`;
const popupInfosTitleHours = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTitleHours$9,
    en: popupInfosTitleHours$8,
    es: popupInfosTitleHours$7,
    fr: popupInfosTitleHours$a,
    hi: popupInfosTitleHours$6,
    it: popupInfosTitleHours$5,
    nl: popupInfosTitleHours$4,
    pt: popupInfosTitleHours$3,
    ru: popupInfosTitleHours$2,
    zh: popupInfosTitleHours$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTitleReduction$a = /* @__NO_SIDE_EFFECTS__ */ () => `Réduction tarifaire`;
const popupInfosTitleReduction$9 = /* @__NO_SIDE_EFFECTS__ */ () => `تخفيض السعر`;
const popupInfosTitleReduction$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Price reduction`;
const popupInfosTitleReduction$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Reducción de precio`;
const popupInfosTitleReduction$6 = /* @__NO_SIDE_EFFECTS__ */ () => `मूल्य में कमी`;
const popupInfosTitleReduction$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Riduzione del prezzo`;
const popupInfosTitleReduction$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Prijsverlaging`;
const popupInfosTitleReduction$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Redução de preço`;
const popupInfosTitleReduction$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Снижение цены`;
const popupInfosTitleReduction$1 = /* @__NO_SIDE_EFFECTS__ */ () => `降价`;
const popupInfosTitleReduction = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTitleReduction$9,
    en: popupInfosTitleReduction$8,
    es: popupInfosTitleReduction$7,
    fr: popupInfosTitleReduction$a,
    hi: popupInfosTitleReduction$6,
    it: popupInfosTitleReduction$5,
    nl: popupInfosTitleReduction$4,
    pt: popupInfosTitleReduction$3,
    ru: popupInfosTitleReduction$2,
    zh: popupInfosTitleReduction$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTitleMajoration$a = /* @__NO_SIDE_EFFECTS__ */ () => `Majoration tarifaire`;
const popupInfosTitleMajoration$9 = /* @__NO_SIDE_EFFECTS__ */ () => `زيادة في الأسعار`;
const popupInfosTitleMajoration$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Price increase`;
const popupInfosTitleMajoration$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Aumento de precios`;
const popupInfosTitleMajoration$6 = /* @__NO_SIDE_EFFECTS__ */ () => `मूल्य वृद्धि`;
const popupInfosTitleMajoration$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Aumento dei prezzi`;
const popupInfosTitleMajoration$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Prijsverhoging`;
const popupInfosTitleMajoration$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Aumento de preço`;
const popupInfosTitleMajoration$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Повышение цен`;
const popupInfosTitleMajoration$1 = /* @__NO_SIDE_EFFECTS__ */ () => `价格上涨`;
const popupInfosTitleMajoration = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTitleMajoration$9,
    en: popupInfosTitleMajoration$8,
    es: popupInfosTitleMajoration$7,
    fr: popupInfosTitleMajoration$a,
    hi: popupInfosTitleMajoration$6,
    it: popupInfosTitleMajoration$5,
    nl: popupInfosTitleMajoration$4,
    pt: popupInfosTitleMajoration$3,
    ru: popupInfosTitleMajoration$2,
    zh: popupInfosTitleMajoration$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTextAcompte$a = /* @__NO_SIDE_EFFECTS__ */ () => `Le versement de l’acompte bloque définitivement votre réservation avec le professionnel.`;
const popupInfosTextAcompte$9 = /* @__NO_SIDE_EFFECTS__ */ () => `إن دفع العربون يضمن حجزك مع المحترف بشكل نهائي.`;
const popupInfosTextAcompte$8 = /* @__NO_SIDE_EFFECTS__ */ () => `The payment of the deposit definitively secures your reservation with the professional.`;
const popupInfosTextAcompte$7 = /* @__NO_SIDE_EFFECTS__ */ () => `El pago del depósito asegura definitivamente su reserva con el profesional.`;
const popupInfosTextAcompte$6 = /* @__NO_SIDE_EFFECTS__ */ () => `डिपॉजिट का भुगतान करने से पेशेवर के साथ आपकी बुकिंग पूरी तरह से सुनिश्चित हो जाती है।`;
const popupInfosTextAcompte$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Il pagamento della caparra conferma definitivamente la prenotazione presso il professionista.`;
const popupInfosTextAcompte$4 = /* @__NO_SIDE_EFFECTS__ */ () => `De betaling van de aanbetaling garandeert uw reservering bij de professional.`;
const popupInfosTextAcompte$3 = /* @__NO_SIDE_EFFECTS__ */ () => `O pagamento do depósito garante definitivamente a sua reserva com o profissional.`;
const popupInfosTextAcompte$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Внесение предоплаты гарантирует бронирование у специалиста.`;
const popupInfosTextAcompte$1 = /* @__NO_SIDE_EFFECTS__ */ () => `支付定金后，您的预订才能最终确认。`;
const popupInfosTextAcompte = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTextAcompte$9,
    en: popupInfosTextAcompte$8,
    es: popupInfosTextAcompte$7,
    fr: popupInfosTextAcompte$a,
    hi: popupInfosTextAcompte$6,
    it: popupInfosTextAcompte$5,
    nl: popupInfosTextAcompte$4,
    pt: popupInfosTextAcompte$3,
    ru: popupInfosTextAcompte$2,
    zh: popupInfosTextAcompte$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTextFees90$a = /* @__NO_SIDE_EFFECTS__ */ () => `Les frais de service couvre les frais de transaction bancaire et les frais de rappel SMS.`;
const popupInfosTextFees90$9 = /* @__NO_SIDE_EFFECTS__ */ () => `تغطي رسوم الخدمة رسوم المعاملات المصرفية ورسوم التذكير عبر الرسائل النصية القصيرة.`;
const popupInfosTextFees90$8 = /* @__NO_SIDE_EFFECTS__ */ () => `The service fee covers bank transaction fees and SMS reminder fees.`;
const popupInfosTextFees90$7 = /* @__NO_SIDE_EFFECTS__ */ () => `La tarifa del servicio cubre las tarifas de transacciones bancarias y las tarifas de recordatorio por SMS.`;
const popupInfosTextFees90$6 = /* @__NO_SIDE_EFFECTS__ */ () => `सेवा शुल्क में बैंक लेनदेन शुल्क और एसएमएस रिमाइंडर शुल्क शामिल हैं।`;
const popupInfosTextFees90$5 = /* @__NO_SIDE_EFFECTS__ */ () => `La commissione di servizio copre le commissioni sulle transazioni bancarie e quelle sui promemoria SMS.`;
const popupInfosTextFees90$4 = /* @__NO_SIDE_EFFECTS__ */ () => `De servicekosten dekken de banktransactiekosten en de kosten voor sms-herinneringen.`;
const popupInfosTextFees90$3 = /* @__NO_SIDE_EFFECTS__ */ () => `A taxa de serviço cobre as taxas de transação bancária e as taxas de lembrete por SMS.`;
const popupInfosTextFees90$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Сервисный сбор включает в себя комиссию за банковские транзакции и плату за SMS-уведомления.`;
const popupInfosTextFees90$1 = /* @__NO_SIDE_EFFECTS__ */ () => `服务费包含银行交易手续费和短信提醒手续费。`;
const popupInfosTextFees90 = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTextFees90$9,
    en: popupInfosTextFees90$8,
    es: popupInfosTextFees90$7,
    fr: popupInfosTextFees90$a,
    hi: popupInfosTextFees90$6,
    it: popupInfosTextFees90$5,
    nl: popupInfosTextFees90$4,
    pt: popupInfosTextFees90$3,
    ru: popupInfosTextFees90$2,
    zh: popupInfosTextFees90$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTextFees30$a = /* @__NO_SIDE_EFFECTS__ */ () => `Les frais de service sont calculés sur la base de 3% du montant total de la prestation (65.00€), ces frais couvrent la sécurisation bancaire et les services Carden.`;
const popupInfosTextFees30$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يتم احتساب رسوم الخدمة على أساس 3٪ من إجمالي مبلغ الخدمة (65.00 يورو)، وتغطي هذه الرسوم أمن البنك وخدمات كاردن.`;
const popupInfosTextFees30$8 = /* @__NO_SIDE_EFFECTS__ */ () => `The service fees are calculated on the basis of 3% of the total amount of the service (€65.00), these fees cover bank security and Carden services.`;
const popupInfosTextFees30$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Los honorarios del servicio se calculan sobre la base del 3% del importe total del servicio (65,00 €), estos honorarios cubren la seguridad bancaria y los servicios de Carden.`;
const popupInfosTextFees30$6 = /* @__NO_SIDE_EFFECTS__ */ () => `सेवा शुल्क की गणना सेवा की कुल राशि (€65.00) के 3% के आधार पर की जाती है, इन शुल्कों में बैंक सुरक्षा और कार्डन सेवाएं शामिल हैं।`;
const popupInfosTextFees30$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Le commissioni di servizio sono calcolate sulla base del 3% dell'importo totale del servizio (€ 65,00); queste commissioni coprono la sicurezza bancaria e i servizi Carden.`;
const popupInfosTextFees30$4 = /* @__NO_SIDE_EFFECTS__ */ () => `De servicekosten worden berekend op basis van 3% van het totale bedrag van de dienst (€65,00). Deze kosten dekken de bankbeveiliging en de diensten van Carden.`;
const popupInfosTextFees30$3 = /* @__NO_SIDE_EFFECTS__ */ () => `As taxas de serviço são calculadas com base em 3% do valor total do serviço (€65,00), e essas taxas cobrem a segurança bancária e os serviços da Carden.`;
const popupInfosTextFees30$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Комиссия за услуги рассчитывается из расчета 3% от общей суммы услуги (€65,00), эта комиссия покрывает банковскую безопасность и услуги Carden.`;
const popupInfosTextFees30$1 = /* @__NO_SIDE_EFFECTS__ */ () => `服务费按服务总额（65.00 欧元）的 3% 计算，这些费用涵盖银行安全和 Carden 服务。`;
const popupInfosTextFees30 = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTextFees30$9,
    en: popupInfosTextFees30$8,
    es: popupInfosTextFees30$7,
    fr: popupInfosTextFees30$a,
    hi: popupInfosTextFees30$6,
    it: popupInfosTextFees30$5,
    nl: popupInfosTextFees30$4,
    pt: popupInfosTextFees30$3,
    ru: popupInfosTextFees30$2,
    zh: popupInfosTextFees30$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTextHours$a = /* @__NO_SIDE_EFFECTS__ */ () => `Vous réservez une place dans l’agenda ou la file d’attente du professionnel. L’heure de passage est donnée à titre indicatif.`;
const popupInfosTextHours$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يمكنك حجز مكان في جدول مواعيد الأخصائي أو قائمة الانتظار. يُقدّم وقت الموعد كإشارة فقط.`;
const popupInfosTextHours$8 = /* @__NO_SIDE_EFFECTS__ */ () => `You reserve a place in the professional's schedule or waiting list. The appointment time is given as an indication only.`;
const popupInfosTextHours$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Reserva una plaza en la agenda del profesional o en la lista de espera. La hora de la cita es solo orientativa.`;
const popupInfosTextHours$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आप पेशेवर के अपॉइंटमेंट शेड्यूल या वेटिंग लिस्ट में अपना स्थान आरक्षित कर सकते हैं। अपॉइंटमेंट का समय केवल एक संकेत मात्र है।`;
const popupInfosTextHours$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Si prenota un posto nell'agenda del professionista o nella lista d'attesa. L'orario dell'appuntamento è fornito solo a titolo indicativo.`;
const popupInfosTextHours$4 = /* @__NO_SIDE_EFFECTS__ */ () => `U reserveert een plaats in de agenda of op de wachtlijst van de professional. De aangegeven tijd voor de afspraak is slechts een indicatie.`;
const popupInfosTextHours$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Você reserva um lugar na agenda ou lista de espera do profissional. O horário da consulta é apenas uma estimativa.`;
const popupInfosTextHours$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Вы резервируете место в расписании специалиста или в списке ожидания. Время приема указано лишь приблизительно.`;
const popupInfosTextHours$1 = /* @__NO_SIDE_EFFECTS__ */ () => `您将在专业人士的日程安排或候补名单中预留一个位置。预约时间仅供参考。`;
const popupInfosTextHours = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTextHours$9,
    en: popupInfosTextHours$8,
    es: popupInfosTextHours$7,
    fr: popupInfosTextHours$a,
    hi: popupInfosTextHours$6,
    it: popupInfosTextHours$5,
    nl: popupInfosTextHours$4,
    pt: popupInfosTextHours$3,
    ru: popupInfosTextHours$2,
    zh: popupInfosTextHours$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTextReduction$a = /* @__NO_SIDE_EFFECTS__ */ () => `Vous bénéficiez d’un tarif réduit suite à une promotion de votre professionnel. Ce tarif est accessible en ligne uniquement.`;
const popupInfosTextReduction$9 = /* @__NO_SIDE_EFFECTS__ */ () => `ستستفيد من سعر مخفّض بعد عرض ترويجي من مزوّد الخدمة. هذا السعر متاح عبر الإنترنت فقط.`;
const popupInfosTextReduction$8 = /* @__NO_SIDE_EFFECTS__ */ () => `You benefit from a reduced rate following a promotion from your service provider. This rate is only available online.`;
const popupInfosTextReduction$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Disfruta de una tarifa reducida gracias a una promoción de tu proveedor de servicios. Esta tarifa solo está disponible en línea.`;
const popupInfosTextReduction$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आपको अपने सेवा प्रदाता के प्रमोशन के बाद कम कीमत का लाभ मिलता है। यह कीमत केवल ऑनलाइन ही उपलब्ध है।`;
const popupInfosTextReduction$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Approfitta di una tariffa ridotta grazie a una promozione del tuo fornitore di servizi. Questa tariffa è disponibile solo online.`;
const popupInfosTextReduction$4 = /* @__NO_SIDE_EFFECTS__ */ () => `U profiteert van een gereduceerd tarief dankzij een actie van uw dienstverlener. Dit tarief is alleen online beschikbaar.`;
const popupInfosTextReduction$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Você se beneficia de uma tarifa reduzida após uma promoção do seu provedor de serviços. Essa tarifa está disponível apenas online.`;
const popupInfosTextReduction$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Вы получаете выгоду от сниженного тарифа в рамках акции вашего поставщика услуг. Этот тариф доступен только при оформлении заказа онлайн.`;
const popupInfosTextReduction$1 = /* @__NO_SIDE_EFFECTS__ */ () => `您的服务提供商推出促销活动，您将享受优惠价格。此优惠价格仅限在线使用。`;
const popupInfosTextReduction = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTextReduction$9,
    en: popupInfosTextReduction$8,
    es: popupInfosTextReduction$7,
    fr: popupInfosTextReduction$a,
    hi: popupInfosTextReduction$6,
    it: popupInfosTextReduction$5,
    nl: popupInfosTextReduction$4,
    pt: popupInfosTextReduction$3,
    ru: popupInfosTextReduction$2,
    zh: popupInfosTextReduction$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTextMajoration$a = /* @__NO_SIDE_EFFECTS__ */ () => `Vous réservez un créneau très demandé en dernière minute. Ce supplément garanti votre passage en priorité.`;
const popupInfosTextMajoration$9 = /* @__NO_SIDE_EFFECTS__ */ () => `أنت تحجز موعداً مرغوباً للغاية في اللحظة الأخيرة. هذه الرسوم الإضافية تضمن لك دخولاً ذا أولوية.`;
const popupInfosTextMajoration$8 = /* @__NO_SIDE_EFFECTS__ */ () => `You are booking a highly sought-after time slot at the last minute. This supplement guarantees your priority entry.`;
const popupInfosTextMajoration$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Estás reservando una hora muy solicitada a última hora. Este suplemento te garantiza acceso prioritario.`;
const popupInfosTextMajoration$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आप अंतिम समय में एक बेहद मांग वाले टाइम स्लॉट की बुकिंग कर रहे हैं। यह अतिरिक्त शुल्क आपकी प्राथमिकता के आधार पर प्रवेश सुनिश्चित करता है।`;
const popupInfosTextMajoration$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Stai prenotando all'ultimo minuto una fascia oraria molto richiesta. Questo supplemento ti garantisce l'ingresso prioritario.`;
const popupInfosTextMajoration$4 = /* @__NO_SIDE_EFFECTS__ */ () => `U boekt op het laatste moment een zeer gewild tijdslot. Deze toeslag garandeert uw voorrang bij de toegang.`;
const popupInfosTextMajoration$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Você está reservando um horário muito concorrido de última hora. Este suplemento garante sua entrada prioritária.`;
const popupInfosTextMajoration$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Вы бронируете очень востребованное время в последний момент. Эта доплата гарантирует вам приоритетный вход.`;
const popupInfosTextMajoration$1 = /* @__NO_SIDE_EFFECTS__ */ () => `您预订的是一个非常热门的时段，而且时间非常紧迫。支付此附加费可确保您优先入场。`;
const popupInfosTextMajoration = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTextMajoration$9,
    en: popupInfosTextMajoration$8,
    es: popupInfosTextMajoration$7,
    fr: popupInfosTextMajoration$a,
    hi: popupInfosTextMajoration$6,
    it: popupInfosTextMajoration$5,
    nl: popupInfosTextMajoration$4,
    pt: popupInfosTextMajoration$3,
    ru: popupInfosTextMajoration$2,
    zh: popupInfosTextMajoration$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosListInfosAcompte1$a = /* @__NO_SIDE_EFFECTS__ */ () => `Déduit du total à payer sur place`;
const popupInfosListInfosAcompte1$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يتم خصمها من إجمالي المبلغ المستحق في الموقع`;
const popupInfosListInfosAcompte1$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Deducted from the total amount payable on site`;
const popupInfosListInfosAcompte1$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Deducido del importe total a pagar en el lugar`;
const popupInfosListInfosAcompte1$6 = /* @__NO_SIDE_EFFECTS__ */ () => `साइट पर देय कुल राशि से कटौती की जाएगी`;
const popupInfosListInfosAcompte1$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Detratto dall'importo totale da pagare in loco`;
const popupInfosListInfosAcompte1$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Afgetrokken van het totale bedrag dat ter plaatse betaald moet worden`;
const popupInfosListInfosAcompte1$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Deduzido do valor total a pagar no local.`;
const popupInfosListInfosAcompte1$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Вычитается из общей суммы, подлежащей оплате на месте.`;
const popupInfosListInfosAcompte1$1 = /* @__NO_SIDE_EFFECTS__ */ () => `从现场应付总额中扣除`;
const popupInfosListInfosAcompte1 = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosListInfosAcompte1$9,
    en: popupInfosListInfosAcompte1$8,
    es: popupInfosListInfosAcompte1$7,
    fr: popupInfosListInfosAcompte1$a,
    hi: popupInfosListInfosAcompte1$6,
    it: popupInfosListInfosAcompte1$5,
    nl: popupInfosListInfosAcompte1$4,
    pt: popupInfosListInfosAcompte1$3,
    ru: popupInfosListInfosAcompte1$2,
    zh: popupInfosListInfosAcompte1$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosListInfosAcompte2$a = /* @__NO_SIDE_EFFECTS__ */ () => `Bloque le créneau instantanément`;
const popupInfosListInfosAcompte2$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يقفل الفتحة على الفور`;
const popupInfosListInfosAcompte2$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Locks the slot instantly`;
const popupInfosListInfosAcompte2$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Bloquea la ranura instantáneamente`;
const popupInfosListInfosAcompte2$6 = /* @__NO_SIDE_EFFECTS__ */ () => `स्लॉट को तुरंत लॉक कर देता है`;
const popupInfosListInfosAcompte2$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Blocca lo slot all'istante`;
const popupInfosListInfosAcompte2$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Vergrendelt de sleuf direct`;
const popupInfosListInfosAcompte2$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Trava a ranhura instantaneamente`;
const popupInfosListInfosAcompte2$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Мгновенно блокирует слот`;
const popupInfosListInfosAcompte2$1 = /* @__NO_SIDE_EFFECTS__ */ () => `立即锁定插槽`;
const popupInfosListInfosAcompte2 = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosListInfosAcompte2$9,
    en: popupInfosListInfosAcompte2$8,
    es: popupInfosListInfosAcompte2$7,
    fr: popupInfosListInfosAcompte2$a,
    hi: popupInfosListInfosAcompte2$6,
    it: popupInfosListInfosAcompte2$5,
    nl: popupInfosListInfosAcompte2$4,
    pt: popupInfosListInfosAcompte2$3,
    ru: popupInfosListInfosAcompte2$2,
    zh: popupInfosListInfosAcompte2$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosWarningNotRefundable$a = /* @__NO_SIDE_EFFECTS__ */ () => `Non remboursable en cas d’annulation`;
const popupInfosWarningNotRefundable$9 = /* @__NO_SIDE_EFFECTS__ */ () => `غير قابلة للاسترداد في حالة الإلغاء`;
const popupInfosWarningNotRefundable$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Non-refundable in case of cancellation`;
const popupInfosWarningNotRefundable$7 = /* @__NO_SIDE_EFFECTS__ */ () => `No reembolsable en caso de cancelación`;
const popupInfosWarningNotRefundable$6 = /* @__NO_SIDE_EFFECTS__ */ () => `रद्द करने की स्थिति में कोई रिफंड नहीं दिया जाएगा।`;
const popupInfosWarningNotRefundable$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Non rimborsabile in caso di cancellazione`;
const popupInfosWarningNotRefundable$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Niet-restitueerbaar in geval van annulering.`;
const popupInfosWarningNotRefundable$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Não reembolsável em caso de cancelamento.`;
const popupInfosWarningNotRefundable$2 = /* @__NO_SIDE_EFFECTS__ */ () => `В случае отмены бронирования возврат средств не производится.`;
const popupInfosWarningNotRefundable$1 = /* @__NO_SIDE_EFFECTS__ */ () => `取消订单不予退款`;
const popupInfosWarningNotRefundable = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosWarningNotRefundable$9,
    en: popupInfosWarningNotRefundable$8,
    es: popupInfosWarningNotRefundable$7,
    fr: popupInfosWarningNotRefundable$a,
    hi: popupInfosWarningNotRefundable$6,
    it: popupInfosWarningNotRefundable$5,
    nl: popupInfosWarningNotRefundable$4,
    pt: popupInfosWarningNotRefundable$3,
    ru: popupInfosWarningNotRefundable$2,
    zh: popupInfosWarningNotRefundable$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosWarningMajoration$a = /* @__NO_SIDE_EFFECTS__ */ () => `L’acompte versé au professionnel est définitivement acquis en cas d’annulation`;
const popupInfosWarningMajoration$9 = /* @__NO_SIDE_EFFECTS__ */ () => `لا يُسترد مبلغ التأمين المدفوع للمختص في حالة الإلغاء.`;
const popupInfosWarningMajoration$8 = /* @__NO_SIDE_EFFECTS__ */ () => `The deposit paid to the professional is non-refundable in case of cancellation`;
const popupInfosWarningMajoration$7 = /* @__NO_SIDE_EFFECTS__ */ () => `El depósito pagado al profesional no es reembolsable en caso de cancelación.`;
const popupInfosWarningMajoration$6 = /* @__NO_SIDE_EFFECTS__ */ () => `पेशेवर को दी गई अग्रिम राशि रद्द करने की स्थिति में वापस नहीं की जाएगी।`;
const popupInfosWarningMajoration$5 = /* @__NO_SIDE_EFFECTS__ */ () => `La caparra versata al professionista non è rimborsabile in caso di disdetta`;
const popupInfosWarningMajoration$4 = /* @__NO_SIDE_EFFECTS__ */ () => `De aan de professional betaalde aanbetaling wordt niet terugbetaald in geval van annulering.`;
const popupInfosWarningMajoration$3 = /* @__NO_SIDE_EFFECTS__ */ () => `O depósito pago ao profissional não é reembolsável em caso de cancelamento.`;
const popupInfosWarningMajoration$2 = /* @__NO_SIDE_EFFECTS__ */ () => `В случае отмены заказа внесенный специалисту депозит не возвращается.`;
const popupInfosWarningMajoration$1 = /* @__NO_SIDE_EFFECTS__ */ () => `取消预约的情况下，支付给专业人士的定金不予退还。`;
const popupInfosWarningMajoration = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosWarningMajoration$9,
    en: popupInfosWarningMajoration$8,
    es: popupInfosWarningMajoration$7,
    fr: popupInfosWarningMajoration$a,
    hi: popupInfosWarningMajoration$6,
    it: popupInfosWarningMajoration$5,
    nl: popupInfosWarningMajoration$4,
    pt: popupInfosWarningMajoration$3,
    ru: popupInfosWarningMajoration$2,
    zh: popupInfosWarningMajoration$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosListInfosHours1$a = /* @__NO_SIDE_EFFECTS__ */ () => `Actualisation selon l’avancée réelle au salon`;
const popupInfosListInfosHours1$9 = /* @__NO_SIDE_EFFECTS__ */ () => `تم التحديث وفقًا للتقدم الفعلي في المعرض`;
const popupInfosListInfosHours1$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Updated according to the actual progress at the show`;
const popupInfosListInfosHours1$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Actualizado según el progreso real en el show.`;
const popupInfosListInfosHours1$6 = /* @__NO_SIDE_EFFECTS__ */ () => `शो में हुई वास्तविक प्रगति के अनुसार अपडेट किया गया`;
const popupInfosListInfosHours1$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Aggiornato in base all'effettivo andamento della fiera`;
const popupInfosListInfosHours1$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Bijgewerkt op basis van de actuele voortgang van de show.`;
const popupInfosListInfosHours1$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Atualizado de acordo com o progresso real do evento.`;
const popupInfosListInfosHours1$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Информация обновляется в соответствии с фактическим ходом выставки.`;
const popupInfosListInfosHours1$1 = /* @__NO_SIDE_EFFECTS__ */ () => `根据展会实际进展情况更新`;
const popupInfosListInfosHours1 = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosListInfosHours1$9,
    en: popupInfosListInfosHours1$8,
    es: popupInfosListInfosHours1$7,
    fr: popupInfosListInfosHours1$a,
    hi: popupInfosListInfosHours1$6,
    it: popupInfosListInfosHours1$5,
    nl: popupInfosListInfosHours1$4,
    pt: popupInfosListInfosHours1$3,
    ru: popupInfosListInfosHours1$2,
    zh: popupInfosListInfosHours1$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosListInfosHours2$a = /* @__NO_SIDE_EFFECTS__ */ () => `Notification SMS avant votre passage`;
const popupInfosListInfosHours2$9 = /* @__NO_SIDE_EFFECTS__ */ () => `إشعار عبر الرسائل النصية القصيرة قبل زيارتك`;
const popupInfosListInfosHours2$8 = /* @__NO_SIDE_EFFECTS__ */ () => `SMS notification before your visit`;
const popupInfosListInfosHours2$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Notificación por SMS antes de tu visita`;
const popupInfosListInfosHours2$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आपकी यात्रा से पहले एसएमएस सूचना`;
const popupInfosListInfosHours2$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Notifica SMS prima della tua visita`;
const popupInfosListInfosHours2$4 = /* @__NO_SIDE_EFFECTS__ */ () => `SMS-melding voorafgaand aan uw bezoek.`;
const popupInfosListInfosHours2$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Notificação por SMS antes da sua visita.`;
const popupInfosListInfosHours2$2 = /* @__NO_SIDE_EFFECTS__ */ () => `SMS-уведомление перед вашим визитом`;
const popupInfosListInfosHours2$1 = /* @__NO_SIDE_EFFECTS__ */ () => `到访前短信通知`;
const popupInfosListInfosHours2 = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosListInfosHours2$9,
    en: popupInfosListInfosHours2$8,
    es: popupInfosListInfosHours2$7,
    fr: popupInfosListInfosHours2$a,
    hi: popupInfosListInfosHours2$6,
    it: popupInfosListInfosHours2$5,
    nl: popupInfosListInfosHours2$4,
    pt: popupInfosListInfosHours2$3,
    ru: popupInfosListInfosHours2$2,
    zh: popupInfosListInfosHours2$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosEconomy$a = /* @__NO_SIDE_EFFECTS__ */ () => `Économies réalisées`;
const popupInfosEconomy$9 = /* @__NO_SIDE_EFFECTS__ */ () => `الوفورات المحققة`;
const popupInfosEconomy$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Savings achieved`;
const popupInfosEconomy$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Ahorros logrados`;
const popupInfosEconomy$6 = /* @__NO_SIDE_EFFECTS__ */ () => `बचत हासिल हुई`;
const popupInfosEconomy$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Risparmi ottenuti`;
const popupInfosEconomy$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Besparingen gerealiseerd`;
const popupInfosEconomy$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Economias alcançadas`;
const popupInfosEconomy$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Достигнутая экономия`;
const popupInfosEconomy$1 = /* @__NO_SIDE_EFFECTS__ */ () => `节省金额`;
const popupInfosEconomy = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosEconomy$9,
    en: popupInfosEconomy$8,
    es: popupInfosEconomy$7,
    fr: popupInfosEconomy$a,
    hi: popupInfosEconomy$6,
    it: popupInfosEconomy$5,
    nl: popupInfosEconomy$4,
    pt: popupInfosEconomy$3,
    ru: popupInfosEconomy$2,
    zh: popupInfosEconomy$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosAcompteNote$a = /* @__NO_SIDE_EFFECTS__ */ () => `En cas de non présentation, cet acompte sera reversé au professionnel pour compenser la perte de temps`;
const popupInfosAcompteNote$9 = /* @__NO_SIDE_EFFECTS__ */ () => `في حالة عدم الحضور، سيتم رد هذا المبلغ المدفوع إلى المحترف لتعويض الوقت الضائع.`;
const popupInfosAcompteNote$8 = /* @__NO_SIDE_EFFECTS__ */ () => `In case of no-show, this deposit will be refunded to the professional to compensate for the lost time.`;
const popupInfosAcompteNote$7 = /* @__NO_SIDE_EFFECTS__ */ () => `En caso de no presentación, este depósito será devuelto al profesional para compensar el tiempo perdido.`;
const popupInfosAcompteNote$6 = /* @__NO_SIDE_EFFECTS__ */ () => `यदि आप उपस्थित नहीं होते हैं, तो यह जमा राशि पेशेवर को समय की हानि की भरपाई के लिए वापस कर दी जाएगी।`;
const popupInfosAcompteNote$5 = /* @__NO_SIDE_EFFECTS__ */ () => `In caso di mancata presentazione, la caparra verrà restituita al professionista per compensare il tempo perso.`;
const popupInfosAcompteNote$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Bij niet-verschijnen wordt de aanbetaling terugbetaald aan de professional ter compensatie van de verloren tijd.`;
const popupInfosAcompteNote$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Em caso de não comparecimento, o depósito será devolvido ao profissional para compensar o tempo perdido.`;
const popupInfosAcompteNote$2 = /* @__NO_SIDE_EFFECTS__ */ () => `В случае неявки, внесенный залог будет возвращен специалисту в качестве компенсации за потерянное время.`;
const popupInfosAcompteNote$1 = /* @__NO_SIDE_EFFECTS__ */ () => `如果未出现，这笔定金将退还给专业人士，以补偿其损失的时间。`;
const popupInfosAcompteNote = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosAcompteNote$9,
    en: popupInfosAcompteNote$8,
    es: popupInfosAcompteNote$7,
    fr: popupInfosAcompteNote$a,
    hi: popupInfosAcompteNote$6,
    it: popupInfosAcompteNote$5,
    nl: popupInfosAcompteNote$4,
    pt: popupInfosAcompteNote$3,
    ru: popupInfosAcompteNote$2,
    zh: popupInfosAcompteNote$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosButtonGotIt$a = /* @__NO_SIDE_EFFECTS__ */ () => `J'ai compris`;
const popupInfosButtonGotIt$9 = /* @__NO_SIDE_EFFECTS__ */ () => `فهمتها`;
const popupInfosButtonGotIt$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Got it`;
const popupInfosButtonGotIt$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Entiendo`;
const popupInfosButtonGotIt$6 = /* @__NO_SIDE_EFFECTS__ */ () => `समझ गया`;
const popupInfosButtonGotIt$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Fatto`;
const popupInfosButtonGotIt$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Begrepen.`;
const popupInfosButtonGotIt$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Entendi`;
const popupInfosButtonGotIt$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Понятно`;
const popupInfosButtonGotIt$1 = /* @__NO_SIDE_EFFECTS__ */ () => `知道了`;
const popupInfosButtonGotIt = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosButtonGotIt$9,
    en: popupInfosButtonGotIt$8,
    es: popupInfosButtonGotIt$7,
    fr: popupInfosButtonGotIt$a,
    hi: popupInfosButtonGotIt$6,
    it: popupInfosButtonGotIt$5,
    nl: popupInfosButtonGotIt$4,
    pt: popupInfosButtonGotIt$3,
    ru: popupInfosButtonGotIt$2,
    zh: popupInfosButtonGotIt$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTitleCancelReservation$a = /* @__NO_SIDE_EFFECTS__ */ () => `Annulation de réservation ? `;
const popupInfosTitleCancelReservation$9 = /* @__NO_SIDE_EFFECTS__ */ () => `إلغاء الحجز؟ `;
const popupInfosTitleCancelReservation$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Reservation cancellation? `;
const popupInfosTitleCancelReservation$7 = /* @__NO_SIDE_EFFECTS__ */ () => `¿Cancelación de reserva? `;
const popupInfosTitleCancelReservation$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आरक्षण रद्द करना? `;
const popupInfosTitleCancelReservation$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Annullamento della prenotazione? `;
const popupInfosTitleCancelReservation$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Reservering annuleren? `;
const popupInfosTitleCancelReservation$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Cancelamento de reserva? `;
const popupInfosTitleCancelReservation$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Отмена бронирования? `;
const popupInfosTitleCancelReservation$1 = /* @__NO_SIDE_EFFECTS__ */ () => `取消预订？ `;
const popupInfosTitleCancelReservation = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTitleCancelReservation$9,
    en: popupInfosTitleCancelReservation$8,
    es: popupInfosTitleCancelReservation$7,
    fr: popupInfosTitleCancelReservation$a,
    hi: popupInfosTitleCancelReservation$6,
    it: popupInfosTitleCancelReservation$5,
    nl: popupInfosTitleCancelReservation$4,
    pt: popupInfosTitleCancelReservation$3,
    ru: popupInfosTitleCancelReservation$2,
    zh: popupInfosTitleCancelReservation$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTextCancelReservation1$a = /* @__NO_SIDE_EFFECTS__ */ () => `Êtes-vous sûr de vouloir libérer le créneau ?`;
const popupInfosTextCancelReservation1$9 = /* @__NO_SIDE_EFFECTS__ */ () => `هل أنت متأكد من رغبتك في إخلاء المساحة؟`;
const popupInfosTextCancelReservation1$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Are you sure you want to free up the slot?`;
const popupInfosTextCancelReservation1$7 = /* @__NO_SIDE_EFFECTS__ */ () => `¿Estás seguro que deseas liberar el espacio?`;
const popupInfosTextCancelReservation1$6 = /* @__NO_SIDE_EFFECTS__ */ () => `क्या आप वाकई इस स्लॉट को खाली करना चाहते हैं?`;
const popupInfosTextCancelReservation1$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Sei sicuro di voler liberare lo slot?`;
const popupInfosTextCancelReservation1$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Weet je zeker dat je de plek wilt vrijmaken?`;
const popupInfosTextCancelReservation1$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Tem certeza de que deseja liberar o espaço?`;
const popupInfosTextCancelReservation1$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Вы уверены, что хотите освободить слот?`;
const popupInfosTextCancelReservation1$1 = /* @__NO_SIDE_EFFECTS__ */ () => `您确定要释放该插槽吗？`;
const popupInfosTextCancelReservation1 = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTextCancelReservation1$9,
    en: popupInfosTextCancelReservation1$8,
    es: popupInfosTextCancelReservation1$7,
    fr: popupInfosTextCancelReservation1$a,
    hi: popupInfosTextCancelReservation1$6,
    it: popupInfosTextCancelReservation1$5,
    nl: popupInfosTextCancelReservation1$4,
    pt: popupInfosTextCancelReservation1$3,
    ru: popupInfosTextCancelReservation1$2,
    zh: popupInfosTextCancelReservation1$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTextCancelReservation2$a = /* @__NO_SIDE_EFFECTS__ */ () => `L'acompte versé est définitivement acquis pour le professionnel.`;
const popupInfosTextCancelReservation2$9 = /* @__NO_SIDE_EFFECTS__ */ () => `يتم الحصول على مبلغ التأمين المدفوع بشكل نهائي من قبل المحترف.`;
const popupInfosTextCancelReservation2$8 = /* @__NO_SIDE_EFFECTS__ */ () => `The deposit paid is definitively acquired by the professional.`;
const popupInfosTextCancelReservation2$7 = /* @__NO_SIDE_EFFECTS__ */ () => `El depósito entregado queda definitivamente adquirido por el profesional.`;
const popupInfosTextCancelReservation2$6 = /* @__NO_SIDE_EFFECTS__ */ () => `भुगतान की गई जमा राशि पेशेवर द्वारा निश्चित रूप से प्राप्त कर ली जाती है।`;
const popupInfosTextCancelReservation2$5 = /* @__NO_SIDE_EFFECTS__ */ () => `La caparra versata viene definitivamente acquisita dal professionista.`;
const popupInfosTextCancelReservation2$4 = /* @__NO_SIDE_EFFECTS__ */ () => `De betaalde aanbetaling wordt definitief door de professional ontvangen.`;
const popupInfosTextCancelReservation2$3 = /* @__NO_SIDE_EFFECTS__ */ () => `O depósito pago é definitivamente recebido pelo profissional.`;
const popupInfosTextCancelReservation2$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Внесенный депозит окончательно закрепляется за специалистом.`;
const popupInfosTextCancelReservation2$1 = /* @__NO_SIDE_EFFECTS__ */ () => `所支付的定金最终归专业人士所有。`;
const popupInfosTextCancelReservation2 = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTextCancelReservation2$9,
    en: popupInfosTextCancelReservation2$8,
    es: popupInfosTextCancelReservation2$7,
    fr: popupInfosTextCancelReservation2$a,
    hi: popupInfosTextCancelReservation2$6,
    it: popupInfosTextCancelReservation2$5,
    nl: popupInfosTextCancelReservation2$4,
    pt: popupInfosTextCancelReservation2$3,
    ru: popupInfosTextCancelReservation2$2,
    zh: popupInfosTextCancelReservation2$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosButtonConfirmCancelReservation$a = /* @__NO_SIDE_EFFECTS__ */ () => `oui, annuler`;
const popupInfosButtonConfirmCancelReservation$9 = /* @__NO_SIDE_EFFECTS__ */ () => `نعم، إلغاء`;
const popupInfosButtonConfirmCancelReservation$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Yes, cancel`;
const popupInfosButtonConfirmCancelReservation$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Sí, cancelar`;
const popupInfosButtonConfirmCancelReservation$6 = /* @__NO_SIDE_EFFECTS__ */ () => `हाँ, रद्द करें`;
const popupInfosButtonConfirmCancelReservation$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Sì, annulla`;
const popupInfosButtonConfirmCancelReservation$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Ja, annuleren`;
const popupInfosButtonConfirmCancelReservation$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Sim, cancelar`;
const popupInfosButtonConfirmCancelReservation$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Да, отменить`;
const popupInfosButtonConfirmCancelReservation$1 = /* @__NO_SIDE_EFFECTS__ */ () => `是的，取消`;
const popupInfosButtonConfirmCancelReservation = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosButtonConfirmCancelReservation$9,
    en: popupInfosButtonConfirmCancelReservation$8,
    es: popupInfosButtonConfirmCancelReservation$7,
    fr: popupInfosButtonConfirmCancelReservation$a,
    hi: popupInfosButtonConfirmCancelReservation$6,
    it: popupInfosButtonConfirmCancelReservation$5,
    nl: popupInfosButtonConfirmCancelReservation$4,
    pt: popupInfosButtonConfirmCancelReservation$3,
    ru: popupInfosButtonConfirmCancelReservation$2,
    zh: popupInfosButtonConfirmCancelReservation$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosButtonCancelCancelReservation$a = /* @__NO_SIDE_EFFECTS__ */ () => `non, conserver`;
const popupInfosButtonCancelCancelReservation$9 = /* @__NO_SIDE_EFFECTS__ */ () => `لا، احتفظ`;
const popupInfosButtonCancelCancelReservation$8 = /* @__NO_SIDE_EFFECTS__ */ () => `no, keep`;
const popupInfosButtonCancelCancelReservation$7 = /* @__NO_SIDE_EFFECTS__ */ () => `No, quédate`;
const popupInfosButtonCancelCancelReservation$6 = /* @__NO_SIDE_EFFECTS__ */ () => `नहीं, रखो`;
const popupInfosButtonCancelCancelReservation$5 = /* @__NO_SIDE_EFFECTS__ */ () => `no, tieni`;
const popupInfosButtonCancelCancelReservation$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Nee, behouden.`;
const popupInfosButtonCancelCancelReservation$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Não, mantenha`;
const popupInfosButtonCancelCancelReservation$2 = /* @__NO_SIDE_EFFECTS__ */ () => `нет, продолжай`;
const popupInfosButtonCancelCancelReservation$1 = /* @__NO_SIDE_EFFECTS__ */ () => `不，继续`;
const popupInfosButtonCancelCancelReservation = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosButtonCancelCancelReservation$9,
    en: popupInfosButtonCancelCancelReservation$8,
    es: popupInfosButtonCancelCancelReservation$7,
    fr: popupInfosButtonCancelCancelReservation$a,
    hi: popupInfosButtonCancelCancelReservation$6,
    it: popupInfosButtonCancelCancelReservation$5,
    nl: popupInfosButtonCancelCancelReservation$4,
    pt: popupInfosButtonCancelCancelReservation$3,
    ru: popupInfosButtonCancelCancelReservation$2,
    zh: popupInfosButtonCancelCancelReservation$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTitleHourChange$a = /* @__NO_SIDE_EFFECTS__ */ () => `Pourquoi l’heure change ?`;
const popupInfosTitleHourChange$9 = /* @__NO_SIDE_EFFECTS__ */ () => `لماذا يتغير الوقت؟`;
const popupInfosTitleHourChange$8 = /* @__NO_SIDE_EFFECTS__ */ () => `Why does the time change?`;
const popupInfosTitleHourChange$7 = /* @__NO_SIDE_EFFECTS__ */ () => `¿Por qué cambia la hora?`;
const popupInfosTitleHourChange$6 = /* @__NO_SIDE_EFFECTS__ */ () => `समय क्यों बदलता है?`;
const popupInfosTitleHourChange$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Perché l'ora cambia?`;
const popupInfosTitleHourChange$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Waarom verandert de tijd?`;
const popupInfosTitleHourChange$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Por que o horário muda?`;
const popupInfosTitleHourChange$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Почему меняется время?`;
const popupInfosTitleHourChange$1 = /* @__NO_SIDE_EFFECTS__ */ () => `为什么时间会改变？`;
const popupInfosTitleHourChange = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTitleHourChange$9,
    en: popupInfosTitleHourChange$8,
    es: popupInfosTitleHourChange$7,
    fr: popupInfosTitleHourChange$a,
    hi: popupInfosTitleHourChange$6,
    it: popupInfosTitleHourChange$5,
    nl: popupInfosTitleHourChange$4,
    pt: popupInfosTitleHourChange$3,
    ru: popupInfosTitleHourChange$2,
    zh: popupInfosTitleHourChange$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTextHourChange$a = /* @__NO_SIDE_EFFECTS__ */ () => `Nous ajustons votre horaire en temps réel selon l’avancement du professionnel au salon.`;
const popupInfosTextHourChange$9 = /* @__NO_SIDE_EFFECTS__ */ () => `نقوم بتعديل جدولك الزمني في الوقت الفعلي وفقًا لتقدم المحترف في الصالون.`;
const popupInfosTextHourChange$8 = /* @__NO_SIDE_EFFECTS__ */ () => `We adjust your schedule in real time according to the professional's progress at the salon.`;
const popupInfosTextHourChange$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Ajustamos tu agenda en tiempo real según el progreso del profesional en el salón.`;
const popupInfosTextHourChange$6 = /* @__NO_SIDE_EFFECTS__ */ () => `हम सैलून में पेशेवर की प्रगति के अनुसार आपके शेड्यूल को वास्तविक समय में समायोजित करते हैं।`;
const popupInfosTextHourChange$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Adattiamo il tuo programma in tempo reale in base ai progressi del professionista nel salone.`;
const popupInfosTextHourChange$4 = /* @__NO_SIDE_EFFECTS__ */ () => `We passen uw planning in realtime aan op basis van de voortgang van de professional in de salon.`;
const popupInfosTextHourChange$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Ajustamos sua agenda em tempo real de acordo com o progresso do profissional no salão.`;
const popupInfosTextHourChange$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Мы корректируем ваше расписание в режиме реального времени в зависимости от хода работы специалиста в салоне.`;
const popupInfosTextHourChange$1 = /* @__NO_SIDE_EFFECTS__ */ () => `我们会根据沙龙专业人员的工作进度实时调整您的日程安排。`;
const popupInfosTextHourChange = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTextHourChange$9,
    en: popupInfosTextHourChange$8,
    es: popupInfosTextHourChange$7,
    fr: popupInfosTextHourChange$a,
    hi: popupInfosTextHourChange$6,
    it: popupInfosTextHourChange$5,
    nl: popupInfosTextHourChange$4,
    pt: popupInfosTextHourChange$3,
    ru: popupInfosTextHourChange$2,
    zh: popupInfosTextHourChange$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosTextHourChange2$a = /* @__NO_SIDE_EFFECTS__ */ () => `Cela vous évite l’attente supplémentaire sur place en cas de retard.`;
const popupInfosTextHourChange2$9 = /* @__NO_SIDE_EFFECTS__ */ () => `هذا يوفر عليك وقت انتظار إضافي في الموقع في حالة حدوث تأخيرات.`;
const popupInfosTextHourChange2$8 = /* @__NO_SIDE_EFFECTS__ */ () => `This saves you additional waiting time on site in case of delays.`;
const popupInfosTextHourChange2$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Esto le ahorra tiempo de espera adicional en el sitio en caso de retrasos.`;
const popupInfosTextHourChange2$6 = /* @__NO_SIDE_EFFECTS__ */ () => `इससे देरी होने की स्थिति में आपको घटनास्थल पर अतिरिक्त प्रतीक्षा समय की बचत होती है।`;
const popupInfosTextHourChange2$5 = /* @__NO_SIDE_EFFECTS__ */ () => `In questo modo si risparmia ulteriore tempo di attesa in loco in caso di ritardi.`;
const popupInfosTextHourChange2$4 = /* @__NO_SIDE_EFFECTS__ */ () => `Dit bespaart u extra wachttijd op locatie in geval van vertragingen.`;
const popupInfosTextHourChange2$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Isso evita tempo de espera adicional no local em caso de atrasos.`;
const popupInfosTextHourChange2$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Это позволит вам сэкономить дополнительное время ожидания на месте в случае задержек.`;
const popupInfosTextHourChange2$1 = /* @__NO_SIDE_EFFECTS__ */ () => `这样可以避免因延误而造成的现场额外等待时间。`;
const popupInfosTextHourChange2 = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosTextHourChange2$9,
    en: popupInfosTextHourChange2$8,
    es: popupInfosTextHourChange2$7,
    fr: popupInfosTextHourChange2$a,
    hi: popupInfosTextHourChange2$6,
    it: popupInfosTextHourChange2$5,
    nl: popupInfosTextHourChange2$4,
    pt: popupInfosTextHourChange2$3,
    ru: popupInfosTextHourChange2$2,
    zh: popupInfosTextHourChange2$1
  }[options.languageTag ?? languageTag()]();
};
const popupInfosListInfosHourChange$a = /* @__NO_SIDE_EFFECTS__ */ () => `Notification SMS avant votre passage`;
const popupInfosListInfosHourChange$9 = /* @__NO_SIDE_EFFECTS__ */ () => `إشعار عبر الرسائل النصية القصيرة قبل زيارتك`;
const popupInfosListInfosHourChange$8 = /* @__NO_SIDE_EFFECTS__ */ () => `SMS notification before your visit`;
const popupInfosListInfosHourChange$7 = /* @__NO_SIDE_EFFECTS__ */ () => `Notificación por SMS antes de tu visita`;
const popupInfosListInfosHourChange$6 = /* @__NO_SIDE_EFFECTS__ */ () => `आपकी यात्रा से पहले एसएमएस सूचना`;
const popupInfosListInfosHourChange$5 = /* @__NO_SIDE_EFFECTS__ */ () => `Notifica SMS prima della tua visita`;
const popupInfosListInfosHourChange$4 = /* @__NO_SIDE_EFFECTS__ */ () => `SMS-melding voorafgaand aan uw bezoek.`;
const popupInfosListInfosHourChange$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Notificação por SMS antes da sua visita.`;
const popupInfosListInfosHourChange$2 = /* @__NO_SIDE_EFFECTS__ */ () => `SMS-уведомление перед вашим визитом`;
const popupInfosListInfosHourChange$1 = /* @__NO_SIDE_EFFECTS__ */ () => `到访前短信通知`;
const popupInfosListInfosHourChange = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    ar: popupInfosListInfosHourChange$9,
    en: popupInfosListInfosHourChange$8,
    es: popupInfosListInfosHourChange$7,
    fr: popupInfosListInfosHourChange$a,
    hi: popupInfosListInfosHourChange$6,
    it: popupInfosListInfosHourChange$5,
    nl: popupInfosListInfosHourChange$4,
    pt: popupInfosListInfosHourChange$3,
    ru: popupInfosListInfosHourChange$2,
    zh: popupInfosListInfosHourChange$1
  }[options.languageTag ?? languageTag()]();
};
const Badge_euro = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      }
    ],
    ["path", { "d": "M7 12h5" }],
    ["path", { "d": "M15 9.4a4 4 0 1 0 0 5.2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "badge-euro" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Circle_alert = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "8",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12.01",
        "y1": "16",
        "y2": "16"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "circle-alert" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Circle_check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "m9 12 2 2 4-4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "circle-check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Clock_4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["polyline", { "points": "12 6 12 12 16 14" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "clock-4" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Info = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "M12 16v-4" }],
    ["path", { "d": "M12 8h.01" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "info" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"
      }
    ],
    [
      "circle",
      {
        "cx": "7.5",
        "cy": "7.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "tag" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Trending_up = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["polyline", { "points": "22 7 13.5 15.5 8.5 10.5 2 17" }],
    ["polyline", { "points": "16 7 22 7 22 13" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "trending-up" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Wallet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
      }
    ],
    [
      "path",
      {
        "d": "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "wallet" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store = options[key];
    if (store) {
      store.set(value);
    }
  };
}
const TRANSITIONS = {
  DURATION: 0.5,
  EASE: [0.32, 0.72, 0, 1]
};
const VELOCITY_THRESHOLD = 0.4;
function effect(stores, fn) {
  if (typeof document === "undefined") {
    return () => {
    };
  }
  const unsub = derivedWithUnsubscribe(stores, (stores2, onUnsubscribe) => {
    return {
      stores: stores2,
      onUnsubscribe
    };
  }).subscribe(({ stores: stores2, onUnsubscribe }) => {
    const returned = fn(stores2);
    if (returned) {
      onUnsubscribe(returned);
    }
  });
  safeOnDestroy(unsub);
  return unsub;
}
function derivedWithUnsubscribe(stores, fn) {
  let unsubscribers = [];
  const onUnsubscribe = (cb) => {
    unsubscribers.push(cb);
  };
  const unsubscribe = () => {
    unsubscribers.forEach((fn2) => fn2());
    unsubscribers = [];
  };
  const derivedStore = derived(stores, ($storeValues) => {
    unsubscribe();
    return fn($storeValues, onUnsubscribe);
  });
  safeOnDestroy(unsubscribe);
  const subscribe2 = (...args) => {
    const unsub = derivedStore.subscribe(...args);
    return () => {
      unsub();
      unsubscribe();
    };
  };
  return {
    ...derivedStore,
    subscribe: subscribe2
  };
}
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn();
  }
};
const overridable = (store, onChange) => {
  const update = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set2 = (curr) => {
    update(() => curr);
  };
  return {
    ...store,
    update,
    set: set2
  };
};
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = writable(value);
  });
  return result;
}
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
const cache = /* @__PURE__ */ new WeakMap();
function set(el, styles, ignoreCache = false) {
  if (!el || !(el instanceof HTMLElement) || !styles)
    return;
  const originalStyles = {};
  Object.entries(styles).forEach(([key, value]) => {
    if (key.startsWith("--")) {
      el.style.setProperty(key, value);
      return;
    }
    originalStyles[key] = el.style[key];
    el.style[key] = value;
  });
  if (ignoreCache)
    return;
  cache.set(el, originalStyles);
}
function reset(el, prop) {
  if (!el || !(el instanceof HTMLElement))
    return;
  const originalStyles = cache.get(el);
  if (!originalStyles) {
    return;
  }
  if (prop) {
    el.style[prop] = originalStyles[prop];
  } else {
    Object.entries(originalStyles).forEach(([key, value]) => {
      el.style[key] = value;
    });
  }
}
function getTranslate(element, direction) {
  const style = window.getComputedStyle(element);
  const transform = (
    // @ts-expect-error - vendor prefix
    style.transform || style.webkitTransform || style.mozTransform
  );
  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) {
    return parseFloat(mat[1].split(", ")[isVertical(direction) ? 13 : 12]);
  }
  mat = transform.match(/^matrix\((.+)\)$/);
  return mat ? parseFloat(mat[1].split(", ")[isVertical(direction) ? 5 : 4]) : null;
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function noop() {
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
const nonTextInputTypes = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
const isBrowser = typeof document !== "undefined";
function isInput(target) {
  return target instanceof HTMLInputElement && !nonTextInputTypes.has(target.type) || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable;
}
function isVertical(direction) {
  if (direction === "top" || direction === "bottom")
    return true;
  return false;
}
function isBottomOrRight(direction) {
  if (direction === "bottom" || direction === "right")
    return true;
  return false;
}
function chain(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function handleSnapPoints({ activeSnapPoint, snapPoints, drawerRef, overlayRef, fadeFromIndex, openTime, direction }) {
  const isLastSnapPoint = derived([snapPoints, activeSnapPoint], ([$snapPoints, $activeSnapPoint]) => {
    return $activeSnapPoint === $snapPoints?.[$snapPoints.length - 1];
  });
  const shouldFade = derived([snapPoints, fadeFromIndex, activeSnapPoint], ([$snapPoints, $fadeFromIndex, $activeSnapPoint]) => {
    return $snapPoints && $snapPoints.length > 0 && ($fadeFromIndex || $fadeFromIndex === 0) && !Number.isNaN($fadeFromIndex) && $snapPoints[$fadeFromIndex] === $activeSnapPoint || !$snapPoints;
  });
  const activeSnapPointIndex = derived([snapPoints, activeSnapPoint], ([$snapPoints, $activeSnapPoint]) => $snapPoints?.findIndex((snapPoint) => snapPoint === $activeSnapPoint) ?? null);
  const snapPointsOffset = derived(snapPoints, ($snapPoints) => {
    if ($snapPoints) {
      return $snapPoints.map((snapPoint) => {
        const hasWindow = typeof window !== "undefined";
        const isPx = typeof snapPoint === "string";
        let snapPointAsNumber = 0;
        if (isPx) {
          snapPointAsNumber = parseInt(snapPoint, 10);
        }
        const $direction = get_store_value(direction);
        if (isVertical($direction)) {
          const height = isPx ? snapPointAsNumber : hasWindow ? snapPoint * window.innerHeight : 0;
          if (hasWindow) {
            return $direction === "bottom" ? window.innerHeight - height : window.innerHeight + height;
          }
          return height;
        }
        const width = isPx ? snapPointAsNumber : hasWindow ? snapPoint * window.innerWidth : 0;
        if (hasWindow) {
          return $direction === "right" ? window.innerWidth - width : window.innerWidth + width;
        }
        return width;
      });
    }
    return [];
  });
  const activeSnapPointOffset = derived([snapPointsOffset, activeSnapPointIndex], ([$snapPointsOffset, $activeSnapPointIndex]) => $activeSnapPointIndex !== null ? $snapPointsOffset?.[$activeSnapPointIndex] : null);
  effect([activeSnapPoint, drawerRef], ([$activeSnapPoint, $drawerRef]) => {
    if ($activeSnapPoint && $drawerRef) {
      const $snapPoints = get_store_value(snapPoints);
      const $snapPointsOffset = get_store_value(snapPointsOffset);
      const newIndex = $snapPoints?.findIndex((snapPoint) => snapPoint === $activeSnapPoint) ?? -1;
      if ($snapPointsOffset && newIndex !== -1 && typeof $snapPointsOffset[newIndex] === "number") {
        snapToPoint($snapPointsOffset[newIndex]);
      }
    }
  });
  function snapToPoint(dimension) {
    tick().then(() => {
      const $snapPointsOffset = get_store_value(snapPointsOffset);
      const newSnapPointIndex = $snapPointsOffset?.findIndex((snapPointDim) => snapPointDim === dimension) ?? null;
      const $drawerRef = get_store_value(drawerRef);
      const $direction = get_store_value(direction);
      onSnapPointChange(newSnapPointIndex);
      set($drawerRef, {
        transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
        transform: isVertical($direction) ? `translate3d(0, ${dimension}px, 0)` : `translate3d(${dimension}px, 0, 0)`
      });
      const $fadeFromIndex = get_store_value(fadeFromIndex);
      const $overlayRef = get_store_value(overlayRef);
      if (snapPointsOffset && newSnapPointIndex !== $snapPointsOffset.length - 1 && newSnapPointIndex !== $fadeFromIndex) {
        set($overlayRef, {
          transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
          opacity: "0"
        });
      } else {
        set($overlayRef, {
          transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
          opacity: "1"
        });
      }
      activeSnapPoint.update(() => {
        const $snapPoints = get_store_value(snapPoints);
        if (newSnapPointIndex === null || !$snapPoints)
          return null;
        return $snapPoints[newSnapPointIndex];
      });
    });
  }
  function onRelease({ draggedDistance, closeDrawer, velocity, dismissible }) {
    const $fadeFromIndex = get_store_value(fadeFromIndex);
    if ($fadeFromIndex === void 0)
      return;
    const $activeSnapPointOffset = get_store_value(activeSnapPointOffset);
    const $activeSnapPointIndex = get_store_value(activeSnapPointIndex);
    const $overlayRef = get_store_value(overlayRef);
    const $snapPointsOffset = get_store_value(snapPointsOffset);
    const $snapPoints = get_store_value(snapPoints);
    const $direction = get_store_value(direction);
    const currentPosition = $direction === "bottom" || $direction === "right" ? ($activeSnapPointOffset ?? 0) - draggedDistance : ($activeSnapPointOffset ?? 0) + draggedDistance;
    const isOverlaySnapPoint = $activeSnapPointIndex === $fadeFromIndex - 1;
    const isFirst = $activeSnapPointIndex === 0;
    const hasDraggedUp = draggedDistance > 0;
    if (isOverlaySnapPoint) {
      set($overlayRef, {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`
      });
    }
    if (velocity > 2 && !hasDraggedUp) {
      if (dismissible)
        closeDrawer();
      else
        snapToPoint($snapPointsOffset[0]);
      return;
    }
    if (velocity > 2 && hasDraggedUp && $snapPointsOffset && $snapPoints) {
      snapToPoint($snapPointsOffset[$snapPoints.length - 1]);
      return;
    }
    const closestSnapPoint = $snapPointsOffset?.reduce((prev, curr) => {
      if (typeof prev !== "number" || typeof curr !== "number")
        return prev;
      return Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev;
    });
    const dim = isVertical($direction) ? window.innerHeight : window.innerWidth;
    if (velocity > VELOCITY_THRESHOLD && Math.abs(draggedDistance) < dim * 0.4) {
      const dragDirection = hasDraggedUp ? 1 : -1;
      if (dragDirection > 0 && get_store_value(isLastSnapPoint) && $snapPoints) {
        snapToPoint($snapPointsOffset[$snapPoints.length - 1]);
        return;
      }
      if (isFirst && dragDirection < 0 && dismissible) {
        closeDrawer();
      }
      if ($activeSnapPointIndex === null)
        return;
      snapToPoint($snapPointsOffset[$activeSnapPointIndex + dragDirection]);
      return;
    }
    snapToPoint(closestSnapPoint);
  }
  function onDrag({ draggedDistance }) {
    const $drawerRef = get_store_value(drawerRef);
    const $activeSnapPointOffset = get_store_value(activeSnapPointOffset);
    if ($activeSnapPointOffset === null)
      return;
    const $snapPointsOffset = get_store_value(snapPointsOffset);
    const $direction = get_store_value(direction);
    const newValue = $direction === "bottom" || $direction === "right" ? $activeSnapPointOffset - draggedDistance : $activeSnapPointOffset + draggedDistance;
    const lastSnapPoint = $snapPointsOffset[$snapPointsOffset.length - 1];
    if (isBottomOrRight($direction) && newValue < lastSnapPoint) {
      return;
    }
    if (!isBottomOrRight($direction) && newValue > lastSnapPoint) {
      return;
    }
    set($drawerRef, {
      transform: isVertical($direction) ? `translate3d(0, ${newValue}px, 0)` : `translate3d(${newValue}px, 0, 0)`
    });
  }
  function getPercentageDragged(absDraggedDistance, isDraggingDown) {
    const $activeSnapPointIndex = get_store_value(activeSnapPointIndex);
    const $snapPointsOffset = get_store_value(snapPointsOffset);
    const $snapPoints = get_store_value(snapPoints);
    const $fadeFromIndex = get_store_value(fadeFromIndex);
    if (!$snapPoints || typeof $activeSnapPointIndex !== "number" || !$snapPointsOffset || $fadeFromIndex === void 0)
      return null;
    const isOverlaySnapPoint = $activeSnapPointIndex === $fadeFromIndex - 1;
    const isOverlaySnapPointOrHigher = $activeSnapPointIndex >= $fadeFromIndex;
    if (isOverlaySnapPointOrHigher && isDraggingDown) {
      return 0;
    }
    if (isOverlaySnapPoint && !isDraggingDown)
      return 1;
    if (!get_store_value(shouldFade) && !isOverlaySnapPoint)
      return null;
    const targetSnapPointIndex = isOverlaySnapPoint ? $activeSnapPointIndex + 1 : $activeSnapPointIndex - 1;
    const snapPointDistance = isOverlaySnapPoint ? $snapPointsOffset[targetSnapPointIndex] - $snapPointsOffset[targetSnapPointIndex - 1] : $snapPointsOffset[targetSnapPointIndex + 1] - $snapPointsOffset[targetSnapPointIndex];
    const percentageDragged = absDraggedDistance / Math.abs(snapPointDistance);
    if (isOverlaySnapPoint) {
      return 1 - percentageDragged;
    } else {
      return percentageDragged;
    }
  }
  function onSnapPointChange(activeSnapPointIndex2) {
    const $snapPoints = get_store_value(snapPoints);
    const $snapPointsOffset = get_store_value(snapPointsOffset);
    if ($snapPoints && activeSnapPointIndex2 === $snapPointsOffset.length - 1) {
      openTime.set(/* @__PURE__ */ new Date());
    }
  }
  return {
    isLastSnapPoint,
    shouldFade,
    getPercentageDragged,
    activeSnapPointIndex,
    onRelease,
    onDrag,
    snapPointsOffset
  };
}
function isMac() {
  return testPlatform(/^Mac/);
}
function isIPhone() {
  return testPlatform(/^iPhone/);
}
function isIPad() {
  return testPlatform(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
  return isIPhone() || isIPad();
}
function testPlatform(re) {
  return typeof window !== "undefined" && window.navigator != null ? re.test(window.navigator.platform) : void 0;
}
const visualViewport = typeof document !== "undefined" && window.visualViewport;
function isScrollable(node) {
  const style = window.getComputedStyle(node);
  return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}
function getScrollParent(node) {
  if (isScrollable(node)) {
    node = node.parentElement;
  }
  while (node && !isScrollable(node)) {
    node = node.parentElement;
  }
  return node || document.scrollingElement || document.documentElement;
}
let preventScrollCount = 0;
let restore;
function preventScroll() {
  if (typeof document === "undefined")
    return () => {
    };
  preventScrollCount++;
  if (preventScrollCount === 1) {
    if (isIOS()) {
      restore = preventScrollMobileSafari();
    } else {
      restore = preventScrollStandard();
    }
  }
  return () => {
    preventScrollCount--;
    if (preventScrollCount === 0) {
      restore();
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function preventScrollStandard() {
  if (typeof document === "undefined")
    return () => {
    };
  const win = document.defaultView ?? window;
  const { documentElement, body } = document;
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body)[paddingProperty];
  return chain(setScrollbarWidthProperty(), setStyle(body, paddingProperty, `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`), setStyle(body, "overflow", "hidden"));
}
function preventScrollMobileSafari() {
  let scrollable;
  let lastY = 0;
  const { documentElement, body, activeElement } = document;
  function onTouchStart(e) {
    scrollable = getScrollParent(e.target);
    if (scrollable === documentElement && scrollable === body)
      return;
    lastY = e.changedTouches[0].pageY;
  }
  function onTouchMove(e) {
    if (!scrollable || scrollable === documentElement || scrollable === body) {
      e.preventDefault();
      return;
    }
    const y = e.changedTouches[0].pageY;
    const scrollTop = scrollable.scrollTop;
    const bottom = scrollable.scrollHeight - scrollable.clientHeight;
    if (bottom === 0)
      return;
    if (scrollTop <= 0 && y > lastY || scrollTop >= bottom && y < lastY) {
      e.preventDefault();
    }
    lastY = y;
  }
  function onTouchEnd(e) {
    const target = e.target;
    if (!(isInput(target) && target !== activeElement))
      return;
    e.preventDefault();
    target.style.transform = "translateY(-2000px)";
    target.focus();
    requestAnimationFrame(() => {
      target.style.transform = "";
    });
  }
  function onFocus(e) {
    const target = e.target;
    if (!isInput(target))
      return;
    target.style.transform = "translateY(-2000px)";
    requestAnimationFrame(() => {
      target.style.transform = "";
      if (visualViewport) {
        if (visualViewport.height < window.innerHeight) {
          requestAnimationFrame(() => {
            scrollIntoView(target);
          });
        } else {
          visualViewport.addEventListener("resize", () => scrollIntoView(target), { once: true });
        }
      }
    });
  }
  function onWindowScroll() {
    window.scrollTo(0, 0);
  }
  const scrollX = window.pageXOffset;
  const scrollY = window.pageYOffset;
  const restoreStyles = chain(
    setStyle(documentElement, "paddingRight", `${window.innerWidth - documentElement.clientWidth}px`),
    setStyle(documentElement, "overflow", "hidden")
    // setStyle(document.body, 'marginTop', `-${scrollY}px`),
  );
  window.scrollTo(0, 0);
  const removeEvents = chain(addEventListener(document, "touchstart", onTouchStart, { passive: false, capture: true }), addEventListener(document, "touchmove", onTouchMove, { passive: false, capture: true }), addEventListener(document, "touchend", onTouchEnd, { passive: false, capture: true }), addEventListener(document, "focus", onFocus, true), addEventListener(window, "scroll", onWindowScroll));
  return () => {
    restoreStyles();
    removeEvents();
    window.scrollTo(scrollX, scrollY);
  };
}
function setStyle(element, style, value) {
  const cur = element.style[style];
  element.style[style] = value;
  return () => {
    element.style[style] = cur;
  };
}
function scrollIntoView(target) {
  const { documentElement, body, scrollingElement } = document;
  const root = scrollingElement || documentElement;
  while (target && target !== root) {
    const scrollable = getScrollParent(target);
    if (scrollable !== documentElement && scrollable !== body && scrollable !== target) {
      const scrollableTop = scrollable.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      const targetBottom = target.getBoundingClientRect().bottom;
      const keyboardHeight = scrollable.getBoundingClientRect().bottom;
      if (targetBottom > keyboardHeight) {
        scrollable.scrollTop += targetTop - scrollableTop;
      }
    }
    target = scrollable.parentElement;
  }
}
const documentEscapeKeyStore = readable(void 0, (set2) => {
  function keydown(event) {
    if (event && event.key === "Escape") {
      set2(event);
    }
    set2(void 0);
  }
  const unsubscribe = addEventListener(document, "keydown", keydown, {
    passive: false
  });
  return unsubscribe;
});
function handleEscapeKeydown(node, handler) {
  let unsub = noop;
  function update(handler2) {
    unsub();
    unsub = chain(
      // Handle escape keydowns
      documentEscapeKeyStore.subscribe((e) => {
        if (!e)
          return;
        const target = e.target;
        if (!isHTMLElement(target) || target.closest("[data-escapee]") !== node) {
          return;
        }
        e.preventDefault();
        handler2(e);
      })
    );
    node.setAttribute("data-escapee", "");
  }
  update(handler);
  return () => {
    unsub();
    node.removeAttribute("data-escapee");
  };
}
function isHTMLElement(el) {
  return el instanceof HTMLElement;
}
let previousBodyPosition = null;
function handlePositionFixed({ isOpen, modal, nested, hasBeenOpened }) {
  const activeUrl = writable(typeof window !== "undefined" ? window.location.href : "");
  let scrollPos = 0;
  function setPositionFixed(open) {
    if (!(previousBodyPosition === null && open))
      return;
    previousBodyPosition = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      height: document.body.style.height
    };
    const { scrollX, innerHeight } = window;
    document.body.style.setProperty("position", "fixed", "important");
    document.body.style.top = `${-scrollPos}px`;
    document.body.style.left = `${-scrollX}px`;
    document.body.style.right = "0px";
    document.body.style.height = "auto";
    setTimeout(() => requestAnimationFrame(() => {
      const bottomBarHeight = innerHeight - window.innerHeight;
      if (bottomBarHeight && scrollPos >= innerHeight) {
        document.body.style.top = `${-(scrollPos + bottomBarHeight)}px`;
      }
    }), 300);
  }
  function restorePositionSetting() {
    if (previousBodyPosition === null)
      return;
    const $activeUrl = get_store_value(activeUrl);
    const y = -parseInt(document.body.style.top, 10);
    const x = -parseInt(document.body.style.left, 10);
    document.body.style.position = previousBodyPosition.position;
    document.body.style.top = previousBodyPosition.top;
    document.body.style.left = previousBodyPosition.left;
    document.body.style.height = previousBodyPosition.height;
    document.body.style.right = "unset";
    requestAnimationFrame(() => {
      if ($activeUrl !== window.location.href) {
        activeUrl.set(window.location.href);
        return;
      }
      window.scrollTo(x, y);
    });
    previousBodyPosition = null;
  }
  effect([isOpen, activeUrl], ([$isOpen, _]) => {
    if (typeof document === "undefined")
      return;
    if (get_store_value(nested) || !get_store_value(hasBeenOpened))
      return;
    if ($isOpen) {
      setPositionFixed($isOpen);
      if (!get_store_value(modal)) {
        setTimeout(() => {
          restorePositionSetting();
        }, 500);
      }
    } else {
      restorePositionSetting();
    }
  });
  return { restorePositionSetting };
}
const CLOSE_THRESHOLD = 0.25;
const SCROLL_LOCK_TIMEOUT = 100;
const BORDER_RADIUS = 8;
const NESTED_DISPLACEMENT = 16;
const WINDOW_TOP_OFFSET = 26;
const DRAG_CLASS = "vaul-dragging";
const openDrawerIds = writable([]);
const defaultProps = {
  closeThreshold: CLOSE_THRESHOLD,
  shouldScaleBackground: true,
  scrollLockTimeout: SCROLL_LOCK_TIMEOUT,
  onDrag: void 0,
  onRelease: void 0,
  snapPoints: void 0,
  fadeFromIndex: void 0,
  defaultActiveSnapPoint: void 0,
  onActiveSnapPointChange: void 0,
  defaultOpen: false,
  onOpenChange: void 0,
  fixed: void 0,
  dismissible: true,
  modal: true,
  nested: false,
  onClose: void 0,
  direction: "bottom"
};
const omittedOptions = [
  "defaultOpen",
  "onOpenChange",
  "defaultActiveSnapPoint",
  "onActiveSnapPointChange",
  "onDrag",
  "onRelease",
  "onClose"
];
function createVaul(props) {
  const { snapPoints: snapPointsProp, fadeFromIndex: fadeFromIndexProp = snapPointsProp && snapPointsProp.length - 1, ...withDefaults } = { ...defaultProps, ...removeUndefined(props) };
  const options = toWritableStores(omit({
    ...withDefaults,
    snapPoints: snapPointsProp,
    fadeFromIndex: fadeFromIndexProp
  }, ...omittedOptions));
  const triggerRef = writable(void 0);
  const { onDrag: onDragProp, onRelease: onReleaseProp, onClose, onOpenChange } = withDefaults;
  const { snapPoints, fadeFromIndex, fixed, dismissible, modal, nested, shouldScaleBackground, scrollLockTimeout, closeThreshold, direction } = options;
  const openStore = writable(withDefaults.defaultOpen);
  const isOpen = overridable(openStore, withDefaults.onOpenChange);
  const hasBeenOpened = writable(false);
  const visible = writable(false);
  const justReleased = writable(false);
  const overlayRef = writable(void 0);
  const openTime = writable(null);
  const keyboardIsOpen = writable(false);
  const drawerRef = writable(void 0);
  const drawerId = writable(void 0);
  let isDragging = false;
  let dragStartTime = null;
  let isClosing = false;
  let pointerStart = 0;
  let dragEndTime = null;
  let lastTimeDragPrevented = null;
  let isAllowedToDrag = false;
  let drawerHeightRef = get_store_value(drawerRef)?.getBoundingClientRect().height || 0;
  let previousDiffFromInitial = 0;
  let initialDrawerHeight = 0;
  let nestedOpenChangeTimer = null;
  const activeSnapPoint = overridable(writable(withDefaults.defaultActiveSnapPoint), withDefaults.onActiveSnapPointChange);
  const { activeSnapPointIndex, getPercentageDragged: getSnapPointsPercentageDragged, onDrag: onDragSnapPoints, onRelease: onReleaseSnapPoints, shouldFade, snapPointsOffset } = handleSnapPoints({
    snapPoints,
    activeSnapPoint,
    drawerRef,
    fadeFromIndex,
    overlayRef,
    openTime,
    direction
  });
  const getContentStyle = derived([snapPointsOffset], ([$snapPointsOffset]) => {
    return (style = "") => {
      if ($snapPointsOffset && $snapPointsOffset.length > 0) {
        const styleProp = styleToString({
          "--snap-point-height": `${$snapPointsOffset[0]}px`
        });
        return style + styleProp;
      }
      return style;
    };
  });
  effect([drawerRef], ([$drawerRef]) => {
    if ($drawerRef) {
      drawerId.set($drawerRef.id);
    }
  });
  effect([isOpen], ([$open]) => {
    sleep(100).then(() => {
      const id = get_store_value(drawerId);
      if ($open && id) {
        openDrawerIds.update((prev) => {
          if (prev.includes(id)) {
            return prev;
          }
          prev.push(id);
          return prev;
        });
      } else {
        openDrawerIds.update((prev) => prev.filter((id2) => id2 !== id2));
      }
    });
  });
  effect([isOpen], ([$isOpen]) => {
    if (!$isOpen && get_store_value(shouldScaleBackground)) {
      const id = setTimeout(() => {
        reset(document.body, "background");
      }, 200);
      return () => clearTimeout(id);
    }
  });
  effect([isOpen], ([$isOpen]) => {
    let unsub = () => {
    };
    if ($isOpen) {
      unsub = preventScroll();
    }
    return unsub;
  });
  const { restorePositionSetting } = handlePositionFixed({ isOpen, modal, nested, hasBeenOpened });
  effect([drawerRef], ([$drawerRef]) => {
    let unsub = noop;
    if ($drawerRef) {
      unsub = handleEscapeKeydown($drawerRef, () => {
        closeDrawer(true);
      });
    }
    return () => {
      unsub();
    };
  });
  function openDrawer() {
    if (isClosing)
      return;
    hasBeenOpened.set(true);
    isOpen.set(true);
  }
  function onPress(event) {
    const $drawerRef = get_store_value(drawerRef);
    if (!get_store_value(dismissible) && !get_store_value(snapPoints))
      return;
    if ($drawerRef && !$drawerRef.contains(event.target))
      return;
    drawerHeightRef = $drawerRef?.getBoundingClientRect().height || 0;
    isDragging = true;
    dragStartTime = /* @__PURE__ */ new Date();
    if (isIOS()) {
      window.addEventListener("touchend", () => isAllowedToDrag = false, { once: true });
    }
    event.target.setPointerCapture(event.pointerId);
    pointerStart = isVertical(get_store_value(direction)) ? event.screenY : event.screenX;
  }
  function shouldDrag(el, isDraggingInDirection) {
    const $drawerRef = get_store_value(drawerRef);
    let element = el;
    const highlightedText = window.getSelection()?.toString();
    const $direction = get_store_value(direction);
    const swipeAmount = $drawerRef ? getTranslate($drawerRef, $direction) : null;
    const date = /* @__PURE__ */ new Date();
    if (element.hasAttribute("data-vaul-no-drag") || element.closest("[data-vaul-no-drag]")) {
      return false;
    }
    const $openTime = get_store_value(openTime);
    if ($openTime && date.getTime() - $openTime.getTime() < 500) {
      return false;
    }
    if (swipeAmount !== null) {
      if ($direction === "bottom" || $direction === "right" ? swipeAmount > 0 : swipeAmount < 0) {
        return true;
      }
    }
    if (swipeAmount !== null && swipeAmount > 0) {
      return true;
    }
    if (highlightedText && highlightedText.length > 0) {
      return false;
    }
    const $scrollLockTimeout = get_store_value(scrollLockTimeout);
    if (lastTimeDragPrevented && date.getTime() - lastTimeDragPrevented.getTime() < $scrollLockTimeout && swipeAmount === 0) {
      lastTimeDragPrevented = date;
      return false;
    }
    if (isDraggingInDirection) {
      lastTimeDragPrevented = date;
      return false;
    }
    while (element) {
      if (element.scrollHeight > element.clientHeight) {
        if (element.scrollTop !== 0) {
          lastTimeDragPrevented = /* @__PURE__ */ new Date();
          return false;
        }
        if (element.getAttribute("role") === "dialog") {
          return true;
        }
      }
      element = element.parentNode;
    }
    return true;
  }
  function onDrag(event) {
    const $drawerRef = get_store_value(drawerRef);
    if (!$drawerRef || !isDragging)
      return;
    const $direction = get_store_value(direction);
    const directionMultiplier = getDirectionMultiplier($direction);
    const draggedDistance = getDistanceMoved(pointerStart, $direction, event) * directionMultiplier;
    const isDraggingInDirection = draggedDistance > 0;
    const $activeSnapPointIndex = get_store_value(activeSnapPointIndex);
    const $snapPoints = get_store_value(snapPoints);
    if ($snapPoints && $activeSnapPointIndex === 0 && !get_store_value(dismissible))
      return;
    if (!isAllowedToDrag && !shouldDrag(event.target, isDraggingInDirection)) {
      return;
    }
    $drawerRef.classList.add(DRAG_CLASS);
    isAllowedToDrag = true;
    set($drawerRef, {
      transition: "none"
    });
    const $overlayRef = get_store_value(overlayRef);
    set($overlayRef, {
      transition: "none"
    });
    if ($snapPoints) {
      onDragSnapPoints({ draggedDistance });
    }
    if (isDraggingInDirection && !$snapPoints) {
      const dampenedDraggedDistance = dampenValue(draggedDistance);
      const translateValue = Math.min(dampenedDraggedDistance * -1, 0) * directionMultiplier;
      set($drawerRef, {
        transform: isVertical($direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
      });
      return;
    }
    const absDraggedDistance = Math.abs(draggedDistance);
    let percentageDragged = absDraggedDistance / drawerHeightRef;
    const snapPointPercentageDragged = getSnapPointsPercentageDragged(absDraggedDistance, isDraggingInDirection);
    if (snapPointPercentageDragged !== null) {
      percentageDragged = snapPointPercentageDragged;
    }
    const opacityValue = 1 - percentageDragged;
    const $fadeFromIndex = get_store_value(fadeFromIndex);
    const $shouldFade = get_store_value(shouldFade);
    if ($shouldFade || $fadeFromIndex && $activeSnapPointIndex === $fadeFromIndex - 1) {
      onDragProp?.(event, percentageDragged);
      set($overlayRef, {
        opacity: `${opacityValue}`,
        transition: "none"
      }, true);
    }
    const wrapper = document.querySelector("[data-vaul-drawer-wrapper]");
    if (wrapper && $overlayRef && get_store_value(shouldScaleBackground)) {
      const scaleValue = Math.min(getScale() + percentageDragged * (1 - getScale()), 1);
      const borderRadiusValue = 8 - percentageDragged * 8;
      const translateValue = Math.max(0, 14 - percentageDragged * 14);
      set(wrapper, {
        borderRadius: `${borderRadiusValue}px`,
        transform: isVertical($direction) ? `scale(${scaleValue}) translate3d(0, ${translateValue}px, 0)` : `scale(${scaleValue}) translate3d(${translateValue}px, 0, 0)`,
        transition: "none"
      }, true);
    }
    if (!$snapPoints) {
      const translateValue = absDraggedDistance * directionMultiplier;
      set($drawerRef, {
        transform: isVertical($direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
      });
    }
  }
  function scaleBackground(open, backgroundColor = "black") {
    const wrapper = document.querySelector("[data-vaul-drawer-wrapper]");
    if (!wrapper || !get_store_value(shouldScaleBackground))
      return;
    const $direction = get_store_value(direction);
    if (open) {
      set(document.body, {
        background: document.body.style.backgroundColor || document.body.style.background
      });
      set(document.body, {
        background: backgroundColor
      }, true);
      set(wrapper, {
        borderRadius: `${BORDER_RADIUS}px`,
        overflow: "hidden",
        ...isVertical($direction) ? {
          transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
          transformOrigin: "top"
        } : {
          transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
          transformOrigin: "left"
        },
        transitionProperty: "transform, border-radius",
        transitionDuration: `${TRANSITIONS.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(",")})`
      });
    } else {
      reset(wrapper, "overflow");
      reset(wrapper, "transform");
      reset(wrapper, "borderRadius");
      set(wrapper, {
        transitionProperty: "transform, border-radius",
        transitionDuration: `${TRANSITIONS.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(",")})`
      });
    }
  }
  effect([activeSnapPointIndex, snapPoints, snapPointsOffset], ([$activeSnapPointIndex, $snapPoints, $snapPointsOffset]) => {
    function onVisualViewportChange() {
      const $drawerRef = get_store_value(drawerRef);
      if (!$drawerRef)
        return;
      const $keyboardIsOpen = get_store_value(keyboardIsOpen);
      const focusedElement = document.activeElement;
      if (isInput(focusedElement) || $keyboardIsOpen) {
        const visualViewportHeight = window.visualViewport?.height || 0;
        let diffFromInitial = window.innerHeight - visualViewportHeight;
        const drawerHeight = $drawerRef.getBoundingClientRect().height || 0;
        if (!initialDrawerHeight) {
          initialDrawerHeight = drawerHeight;
        }
        const offsetFromTop = $drawerRef.getBoundingClientRect().top;
        if (Math.abs(previousDiffFromInitial - diffFromInitial) > 60) {
          keyboardIsOpen.set(!$keyboardIsOpen);
        }
        if ($snapPoints && $snapPoints.length > 0 && $snapPointsOffset && $activeSnapPointIndex) {
          const activeSnapPointHeight = $snapPointsOffset[$activeSnapPointIndex] || 0;
          diffFromInitial += activeSnapPointHeight;
        }
        previousDiffFromInitial = diffFromInitial;
        if (drawerHeight > visualViewportHeight || $keyboardIsOpen) {
          const height = $drawerRef.getBoundingClientRect().height;
          let newDrawerHeight = height;
          if (height > visualViewportHeight) {
            newDrawerHeight = visualViewportHeight - WINDOW_TOP_OFFSET;
          }
          if (get_store_value(fixed)) {
            $drawerRef.style.height = `${height - Math.max(diffFromInitial, 0)}px`;
          } else {
            $drawerRef.style.height = `${Math.max(newDrawerHeight, visualViewportHeight - offsetFromTop)}px`;
          }
        } else {
          $drawerRef.style.height = `${initialDrawerHeight}px`;
        }
        if ($snapPoints && $snapPoints.length > 0 && !$keyboardIsOpen) {
          $drawerRef.style.bottom = `0px`;
        } else {
          $drawerRef.style.bottom = `${Math.max(diffFromInitial, 0)}px`;
        }
      }
    }
    let removeListener = noop;
    if (window.visualViewport) {
      removeListener = addEventListener(window.visualViewport, "resize", onVisualViewportChange);
    }
    return () => {
      removeListener();
    };
  });
  function closeDrawer(withKeyboard = false) {
    if (isClosing)
      return;
    const $drawerRef = get_store_value(drawerRef);
    if (!$drawerRef)
      return;
    const $direction = get_store_value(direction);
    onClose?.();
    set($drawerRef, {
      transform: isVertical($direction) ? `translate3d(0, ${$direction === "bottom" ? "100%" : "-100%"}, 0)` : `translate3d(${$direction === "right" ? "100%" : "-100%"}, 0, 0)`,
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`
    });
    set(get_store_value(overlayRef), {
      opacity: "0",
      transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`
    });
    scaleBackground(false);
    isClosing = true;
    setTimeout(() => {
      visible.set(false);
      isOpen.set(false);
      isClosing = false;
      if (withKeyboard) {
        get_store_value(triggerRef)?.focus();
      }
    }, 300);
    const $snapPoints = get_store_value(snapPoints);
    setTimeout(() => {
      reset(document.documentElement, "scrollBehavior");
      if ($snapPoints) {
        activeSnapPoint.set($snapPoints[0]);
      }
    }, TRANSITIONS.DURATION * 1e3);
  }
  effect([isOpen], ([$isOpen]) => {
    if ($isOpen) {
      hasBeenOpened.set(true);
    } else {
      closeDrawer();
    }
  });
  function resetDrawer() {
    const $drawerRef = get_store_value(drawerRef);
    if (!$drawerRef)
      return;
    const $overlayRef = get_store_value(overlayRef);
    const wrapper = document.querySelector("[data-vaul-drawer-wrapper]");
    const $direction = get_store_value(direction);
    const currentSwipeAmount = getTranslate($drawerRef, $direction);
    set($drawerRef, {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`
    });
    set($overlayRef, {
      transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
      opacity: "1"
    });
    const $shouldScaleBackground = get_store_value(shouldScaleBackground);
    const $isOpen = get_store_value(isOpen);
    if ($shouldScaleBackground && currentSwipeAmount && currentSwipeAmount > 0 && $isOpen) {
      set(wrapper, {
        borderRadius: `${BORDER_RADIUS}px`,
        overflow: "hidden",
        ...isVertical($direction) ? {
          transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
          transformOrigin: "top"
        } : {
          transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
          transformOrigin: "left"
        },
        transitionProperty: "transform, border-radius",
        transitionDuration: `${TRANSITIONS.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(",")})`
      }, true);
    }
  }
  function onRelease(event) {
    const $drawerRef = get_store_value(drawerRef);
    if (!isDragging || !$drawerRef)
      return;
    if (isAllowedToDrag && isInput(event.target)) {
      event.target.blur();
    }
    $drawerRef.classList.remove(DRAG_CLASS);
    isAllowedToDrag = false;
    isDragging = false;
    dragEndTime = /* @__PURE__ */ new Date();
    const $direction = get_store_value(direction);
    const swipeAmount = getTranslate($drawerRef, $direction);
    if (event.target && !shouldDrag(event.target, false) || !swipeAmount || Number.isNaN(swipeAmount))
      return;
    if (dragStartTime === null)
      return;
    const timeTaken = dragEndTime.getTime() - dragStartTime.getTime();
    const distMoved = getDistanceMoved(pointerStart, $direction, event);
    const velocity = Math.abs(distMoved) / timeTaken;
    if (velocity > 0.05) {
      justReleased.set(true);
      setTimeout(() => {
        justReleased.set(false);
      }, 200);
    }
    if (get_store_value(snapPoints)) {
      onReleaseSnapPoints({
        draggedDistance: distMoved * getDirectionMultiplier($direction),
        closeDrawer,
        velocity,
        dismissible: get_store_value(dismissible)
      });
      onReleaseProp?.(event, true);
      return;
    }
    if ($direction === "bottom" || $direction === "right" ? distMoved > 0 : distMoved < 0) {
      resetDrawer();
      onReleaseProp?.(event, true);
      return;
    }
    if (velocity > VELOCITY_THRESHOLD) {
      closeDrawer();
      onReleaseProp?.(event, false);
      return;
    }
    const visibleDrawerHeight = Math.min(get_store_value(drawerRef)?.getBoundingClientRect().height ?? 0, window.innerHeight);
    if (swipeAmount >= visibleDrawerHeight * get_store_value(closeThreshold)) {
      closeDrawer();
      onReleaseProp?.(event, false);
      return;
    }
    onReleaseProp?.(event, true);
    resetDrawer();
  }
  effect([isOpen], ([$isOpen]) => {
    if (!$isOpen)
      return;
    if (isBrowser) {
      set(document.documentElement, {
        scrollBehavior: "auto"
      });
    }
    openTime.set(/* @__PURE__ */ new Date());
    scaleBackground(true, props.backgroundColor);
  });
  effect([visible], ([$visible]) => {
    if (!$visible)
      return;
    const $drawerRef = get_store_value(drawerRef);
    if (!$drawerRef)
      return;
    const children = $drawerRef.querySelectorAll("*");
    children.forEach((child) => {
      const htmlChild = child;
      if (htmlChild.scrollHeight > htmlChild.clientHeight || htmlChild.scrollWidth > htmlChild.clientWidth) {
        htmlChild.classList.add("vaul-scrollable");
      }
    });
  });
  function onNestedOpenChange(o) {
    const $drawerRef = get_store_value(drawerRef);
    const scale = o ? (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth : 1;
    const y = o ? -NESTED_DISPLACEMENT : 0;
    if (nestedOpenChangeTimer) {
      window.clearTimeout(nestedOpenChangeTimer);
    }
    set($drawerRef, {
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
      transform: `scale(${scale}) translate3d(0, ${y}px, 0)`
    });
    if (!o && $drawerRef) {
      nestedOpenChangeTimer = setTimeout(() => {
        const $direction = get_store_value(direction);
        const translateValue = getTranslate($drawerRef, $direction);
        set($drawerRef, {
          transition: "none",
          transform: isVertical($direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
        });
      }, 500);
    }
  }
  function onNestedDrag(_, percentageDragged) {
    if (percentageDragged < 0)
      return;
    const initialScale = (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth;
    const newScale = initialScale + percentageDragged * (1 - initialScale);
    const newTranslate = -NESTED_DISPLACEMENT + percentageDragged * NESTED_DISPLACEMENT;
    const $direction = get_store_value(direction);
    set(get_store_value(drawerRef), {
      transform: isVertical($direction) ? `scale(${newScale}) translate3d(0, ${newTranslate}px, 0)` : `scale(${newScale}) translate3d(${newTranslate}px, 0, 0)`,
      transition: "none"
    });
  }
  function onNestedRelease(_, o) {
    const $direction = get_store_value(direction);
    const dim = isVertical($direction) ? window.innerHeight : window.innerWidth;
    const scale = o ? (dim - NESTED_DISPLACEMENT) / dim : 1;
    const translate = o ? -NESTED_DISPLACEMENT : 0;
    if (o) {
      set(get_store_value(drawerRef), {
        transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
        transform: isVertical($direction) ? `scale(${scale}) translate3d(0, ${translate}px, 0)` : `scale(${scale}) translate3d(${translate}px, 0, 0)`
      });
    }
  }
  return {
    states: {
      isOpen,
      hasBeenOpened,
      snapPoints,
      activeSnapPoint,
      snapPointsOffset,
      keyboardIsOpen,
      shouldFade,
      visible,
      drawerId,
      openDrawerIds
    },
    helpers: {
      getContentStyle
    },
    methods: {
      closeDrawer,
      onOpenChange,
      onPress,
      onRelease,
      onDrag,
      scaleBackground,
      onNestedDrag,
      onNestedOpenChange,
      onNestedRelease,
      restorePositionSetting,
      openDrawer
    },
    refs: {
      drawerRef,
      overlayRef,
      triggerRef
    },
    options
  };
}
function dampenValue(v) {
  return 8 * (Math.log(v + 1) - 2);
}
function getScale() {
  return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
}
function getDistanceMoved(pointerStart, direction, event) {
  if (event.type.startsWith("touch")) {
    return getDistanceMovedForTouch(pointerStart, direction, event);
  } else {
    return getDistanceMovedForPointer(pointerStart, direction, event);
  }
}
function getDistanceMovedForPointer(pointerStart, direction, event) {
  return pointerStart - (isVertical(direction) ? event.screenY : event.screenX);
}
function getDistanceMovedForTouch(pointerStart, direction, event) {
  return pointerStart - (isVertical(direction) ? event.changedTouches[0].screenY : event.changedTouches[0].screenX);
}
function getDirectionMultiplier(direction) {
  return direction === "bottom" || direction === "right" ? 1 : -1;
}
const VAUL_ROOT = Symbol("VAUL_ROOT");
function setCtx(props = {}) {
  const vaul = createVaul(props);
  const updateOption = getOptionUpdater(vaul.options);
  setContext(VAUL_ROOT, { ...vaul, updateOption });
  return {
    ...vaul,
    updateOption
  };
}
function getCtx() {
  return getContext(VAUL_ROOT);
}
const css = {
  code: '[data-vaul-drawer]{touch-action:none;transition:transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)}[data-vaul-drawer][data-vaul-drawer-direction="bottom"]{transform:translate3d(0, 100%, 0)}[data-vaul-drawer][data-vaul-drawer-direction="top"]{transform:translate3d(0, -100%, 0)}[data-vaul-drawer][data-vaul-drawer-direction="left"]{transform:translate3d(-100%, 0, 0)}[data-vaul-drawer][data-vaul-drawer-direction="right"]{transform:translate3d(100%, 0, 0)}.vaul-dragging .vaul-scrollable [data-vaul-drawer-direction="top"]{overflow-y:hidden !important}.vaul-dragging .vaul-scrollable [data-vaul-drawer-direction="bottom"]{overflow-y:hidden !important}.vaul-dragging .vaul-scrollable [data-vaul-drawer-direction="left"]{overflow-x:hidden !important}.vaul-dragging .vaul-scrollable [data-vaul-drawer-direction="right"]{overflow-x:hidden !important}[data-vaul-drawer][data-vaul-drawer-visible="true"][data-vaul-drawer-direction="top"]{transform:translate3d(0, var(--snap-point-height, 0), 0)}\n			[data-vaul-drawer][data-vaul-drawer-visible="true"][data-vaul-drawer-direction="bottom"]\n		{transform:translate3d(0, var(--snap-point-height, 0), 0)}[data-vaul-drawer][data-vaul-drawer-visible="true"][data-vaul-drawer-direction="left"]{transform:translate3d(var(--snap-point-height, 0), 0, 0)}[data-vaul-drawer][data-vaul-drawer-visible="true"][data-vaul-drawer-direction="right"]{transform:translate3d(var(--snap-point-height, 0), 0, 0)}[data-vaul-overlay]{opacity:0;transition:opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1)}[data-vaul-overlay][data-vaul-drawer-visible="true"]{opacity:1}[data-vaul-drawer]::after{content:"";position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction="top"]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction="bottom"]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction="left"]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction="right"]::after{left:100%;right:initial;top:0;bottom:0;width:200%}\n			[data-vaul-overlay][data-vaul-snap-points="true"]:not(\n					[data-vaul-snap-points-overlay="true"]\n				):not([data-state="closed"])\n		{opacity:0}\n			[data-vaul-overlay][data-vaul-snap-points-overlay="true"]:not(\n					[data-vaul-drawer-visible="false"]\n				)\n		{opacity:1}@keyframes fake-animation{from{}to{}}@media(hover: hover) and (pointer: fine){[data-vaul-drawer]{-webkit-user-select:none;-moz-user-select:none;user-select:none}}',
  map: '{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<script>import { Dialog as DialogPrimitive } from \\"bits-ui\\";\\nimport { setCtx } from \\"../ctx.js\\";\\nimport { get } from \\"svelte/store\\";\\nexport let open = false;\\nexport let onOpenChange = void 0;\\nexport let closeThreshold = void 0;\\nexport let scrollLockTimeout = void 0;\\nexport let snapPoints = void 0;\\nexport let fadeFromIndex = void 0;\\nexport let openFocus = void 0;\\nexport let onOutsideClick = void 0;\\nexport let closeOnOutsideClick = true;\\nexport let backgroundColor = \\"black\\";\\nexport let nested = false;\\nexport let shouldScaleBackground = false;\\nexport let activeSnapPoint = void 0;\\nexport let onActiveSnapPointChange = void 0;\\nexport let onRelease = void 0;\\nexport let onDrag = void 0;\\nexport let onClose = void 0;\\nexport let dismissible = void 0;\\nexport let direction = \\"bottom\\";\\nconst {\\n  states: {\\n    keyboardIsOpen,\\n    activeSnapPoint: localActiveSnapPoint,\\n    drawerId,\\n    openDrawerIds,\\n    isOpen\\n  },\\n  methods: { closeDrawer, openDrawer },\\n  options: { dismissible: localDismissible },\\n  updateOption\\n} = setCtx({\\n  defaultOpen: open,\\n  defaultActiveSnapPoint: activeSnapPoint,\\n  onOpenChange: ({ next }) => {\\n    if (open !== next) {\\n      onOpenChange?.(next);\\n      open = next;\\n    }\\n    return next;\\n  },\\n  onActiveSnapPointChange: ({ next }) => {\\n    if (next === void 0 && snapPoints && activeSnapPoint !== next) {\\n      const newNext = snapPoints[0];\\n      onActiveSnapPointChange?.(newNext);\\n      activeSnapPoint = newNext;\\n      return newNext;\\n    }\\n    if (activeSnapPoint !== next) {\\n      onActiveSnapPointChange?.(next);\\n      activeSnapPoint = next;\\n    }\\n    return next;\\n  },\\n  closeThreshold,\\n  scrollLockTimeout,\\n  // eslint-disable-next-line @typescript-eslint/no-explicit-any\\n  snapPoints,\\n  fadeFromIndex,\\n  nested,\\n  onDrag,\\n  onClose,\\n  onRelease,\\n  shouldScaleBackground,\\n  backgroundColor,\\n  dismissible,\\n  direction\\n});\\n$:\\n  activeSnapPoint !== void 0 && localActiveSnapPoint.set(activeSnapPoint);\\n$:\\n  updateOption(\\"closeThreshold\\", closeThreshold);\\n$:\\n  updateOption(\\"scrollLockTimeout\\", scrollLockTimeout);\\n$:\\n  updateOption(\\"snapPoints\\", snapPoints);\\n$:\\n  updateOption(\\"fadeFromIndex\\", fadeFromIndex);\\n$:\\n  updateOption(\\"openFocus\\", openFocus);\\n$:\\n  updateOption(\\"shouldScaleBackground\\", shouldScaleBackground);\\n$:\\n  updateOption(\\"backgroundColor\\", backgroundColor);\\n$:\\n  updateOption(\\"dismissible\\", dismissible);\\n$:\\n  updateOption(\\"direction\\", direction);\\n$:\\n  open && !$isOpen && openDrawer();\\n$:\\n  !open && $isOpen && closeDrawer();\\n<\/script>\\n\\n<DialogPrimitive.Root\\n\\t{closeOnOutsideClick}\\n\\tcloseOnEscape={false}\\n\\tbind:open\\n\\tpreventScroll={false}\\n\\tonOpenChange={(o) => {\\n\\t\\tonOpenChange?.(o);\\n\\t\\tif (!o) {\\n\\t\\t\\tcloseDrawer();\\n\\t\\t} else if (o) {\\n\\t\\t\\topenDrawer();\\n\\t\\t}\\n\\t}}\\n\\tonOutsideClick={(e) => {\\n\\t\\tif (!closeOnOutsideClick) return;\\n\\n\\t\\tonOutsideClick?.(e);\\n\\n\\t\\tif (e?.defaultPrevented) return;\\n\\n\\t\\tif ($keyboardIsOpen) {\\n\\t\\t\\tkeyboardIsOpen.set(false);\\n\\t\\t}\\n\\t\\te.preventDefault();\\n\\t\\tif (!$localDismissible) {\\n\\t\\t\\treturn;\\n\\t\\t}\\n\\t\\tconst $openDialogIds = get(openDrawerIds);\\n\\t\\tconst isLast = $openDialogIds[$openDialogIds.length - 1] === get(drawerId);\\n\\t\\tif (isLast) {\\n\\t\\t\\tonOpenChange?.(false);\\n\\t\\t\\tcloseDrawer();\\n\\t\\t}\\n\\t}}\\n\\t{...$$restProps}\\n>\\n\\t<slot />\\n</DialogPrimitive.Root>\\n\\n<style>\\n\\t:global([data-vaul-drawer]) {\\n\\t\\ttouch-action: none;\\n\\t\\ttransition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1);\\n\\t}\\n\\n\\t:global([data-vaul-drawer][data-vaul-drawer-direction=\\"bottom\\"]) {\\n\\t\\ttransform: translate3d(0, 100%, 0);\\n\\t}\\n\\n\\t:global([data-vaul-drawer][data-vaul-drawer-direction=\\"top\\"]) {\\n\\t\\ttransform: translate3d(0, -100%, 0);\\n\\t}\\n\\n\\t:global([data-vaul-drawer][data-vaul-drawer-direction=\\"left\\"]) {\\n\\t\\ttransform: translate3d(-100%, 0, 0);\\n\\t}\\n\\n\\t:global([data-vaul-drawer][data-vaul-drawer-direction=\\"right\\"]) {\\n\\t\\ttransform: translate3d(100%, 0, 0);\\n\\t}\\n\\n\\t:global(.vaul-dragging .vaul-scrollable [data-vaul-drawer-direction=\\"top\\"]) {\\n\\t\\toverflow-y: hidden !important;\\n\\t}\\n\\n\\t:global(.vaul-dragging .vaul-scrollable [data-vaul-drawer-direction=\\"bottom\\"]) {\\n\\t\\toverflow-y: hidden !important;\\n\\t}\\n\\n\\t:global(.vaul-dragging .vaul-scrollable [data-vaul-drawer-direction=\\"left\\"]) {\\n\\t\\toverflow-x: hidden !important;\\n\\t}\\n\\t:global(.vaul-dragging .vaul-scrollable [data-vaul-drawer-direction=\\"right\\"]) {\\n\\t\\toverflow-x: hidden !important;\\n\\t}\\n\\n\\t:global([data-vaul-drawer][data-vaul-drawer-visible=\\"true\\"][data-vaul-drawer-direction=\\"top\\"]) {\\n\\t\\ttransform: translate3d(0, var(--snap-point-height, 0), 0);\\n\\t}\\n\\n\\t:global(\\n\\t\\t\\t[data-vaul-drawer][data-vaul-drawer-visible=\\"true\\"][data-vaul-drawer-direction=\\"bottom\\"]\\n\\t\\t) {\\n\\t\\ttransform: translate3d(0, var(--snap-point-height, 0), 0);\\n\\t}\\n\\n\\t:global([data-vaul-drawer][data-vaul-drawer-visible=\\"true\\"][data-vaul-drawer-direction=\\"left\\"]) {\\n\\t\\ttransform: translate3d(var(--snap-point-height, 0), 0, 0);\\n\\t}\\n\\n\\t:global([data-vaul-drawer][data-vaul-drawer-visible=\\"true\\"][data-vaul-drawer-direction=\\"right\\"]) {\\n\\t\\ttransform: translate3d(var(--snap-point-height, 0), 0, 0);\\n\\t}\\n\\n\\t:global([data-vaul-overlay]) {\\n\\t\\topacity: 0;\\n\\t\\ttransition: opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1);\\n\\t}\\n\\n\\t:global([data-vaul-overlay][data-vaul-drawer-visible=\\"true\\"]) {\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t:global([data-vaul-drawer]::after) {\\n\\t\\tcontent: \\"\\";\\n\\t\\tposition: absolute;\\n\\t\\tbackground: inherit;\\n\\t\\tbackground-color: inherit;\\n\\t}\\n\\n\\t:global([data-vaul-drawer][data-vaul-drawer-direction=\\"top\\"]::after) {\\n\\t\\ttop: initial;\\n\\t\\tbottom: 100%;\\n\\t\\tleft: 0;\\n\\t\\tright: 0;\\n\\t\\theight: 200%;\\n\\t}\\n\\n\\t:global([data-vaul-drawer][data-vaul-drawer-direction=\\"bottom\\"]::after) {\\n\\t\\ttop: 100%;\\n\\t\\tbottom: initial;\\n\\t\\tleft: 0;\\n\\t\\tright: 0;\\n\\t\\theight: 200%;\\n\\t}\\n\\n\\t:global([data-vaul-drawer][data-vaul-drawer-direction=\\"left\\"]::after) {\\n\\t\\tleft: initial;\\n\\t\\tright: 100%;\\n\\t\\ttop: 0;\\n\\t\\tbottom: 0;\\n\\t\\twidth: 200%;\\n\\t}\\n\\n\\t:global([data-vaul-drawer][data-vaul-drawer-direction=\\"right\\"]::after) {\\n\\t\\tleft: 100%;\\n\\t\\tright: initial;\\n\\t\\ttop: 0;\\n\\t\\tbottom: 0;\\n\\t\\twidth: 200%;\\n\\t}\\n\\n\\t:global(\\n\\t\\t\\t[data-vaul-overlay][data-vaul-snap-points=\\"true\\"]:not(\\n\\t\\t\\t\\t\\t[data-vaul-snap-points-overlay=\\"true\\"]\\n\\t\\t\\t\\t):not([data-state=\\"closed\\"])\\n\\t\\t) {\\n\\t\\topacity: 0;\\n\\t}\\n\\n\\t:global(\\n\\t\\t\\t[data-vaul-overlay][data-vaul-snap-points-overlay=\\"true\\"]:not(\\n\\t\\t\\t\\t\\t[data-vaul-drawer-visible=\\"false\\"]\\n\\t\\t\\t\\t)\\n\\t\\t) {\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t/* This will allow us to not animate via animation, but still benefit from delaying\\n\\tunmount via Bits */\\n\\t@keyframes -global-fake-animation {\\n\\t\\tfrom {\\n\\t\\t}\\n\\t\\tto {\\n\\t\\t}\\n\\t}\\n\\n\\t@media (hover: hover) and (pointer: fine) {\\n\\t\\t:global([data-vaul-drawer]) {\\n\\t\\t\\t-webkit-user-select: none;\\n\\t\\t\\t   -moz-user-select: none;\\n\\t\\t\\t        user-select: none;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwIS,kBAAoB,CAC3B,YAAY,CAAE,IAAI,CAClB,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACzD,CAEQ,uDAAyD,CAChE,SAAS,CAAE,YAAY,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAClC,CAEQ,oDAAsD,CAC7D,SAAS,CAAE,YAAY,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CACnC,CAEQ,qDAAuD,CAC9D,SAAS,CAAE,YAAY,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnC,CAEQ,sDAAwD,CAC/D,SAAS,CAAE,YAAY,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAClC,CAEQ,kEAAoE,CAC3E,UAAU,CAAE,MAAM,CAAC,UACpB,CAEQ,qEAAuE,CAC9E,UAAU,CAAE,MAAM,CAAC,UACpB,CAEQ,mEAAqE,CAC5E,UAAU,CAAE,MAAM,CAAC,UACpB,CACQ,oEAAsE,CAC7E,UAAU,CAAE,MAAM,CAAC,UACpB,CAEQ,qFAAuF,CAC9F,SAAS,CAAE,YAAY,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CACzD,CAEQ;AACT;AACA,EAAI,CACF,SAAS,CAAE,YAAY,CAAC,CAAC,CAAC,IAAI,mBAAmB,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CACzD,CAEQ,sFAAwF,CAC/F,SAAS,CAAE,YAAY,IAAI,mBAAmB,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACzD,CAEQ,uFAAyF,CAChG,SAAS,CAAE,YAAY,IAAI,mBAAmB,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACzD,CAEQ,mBAAqB,CAC5B,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,OAAO,CAAC,IAAI,CAAC,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACvD,CAEQ,oDAAsD,CAC7D,OAAO,CAAE,CACV,CAEQ,yBAA2B,CAClC,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,OAAO,CACnB,gBAAgB,CAAE,OACnB,CAEQ,2DAA6D,CACpE,GAAG,CAAE,OAAO,CACZ,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,IACT,CAEQ,8DAAgE,CACvE,GAAG,CAAE,IAAI,CACT,MAAM,CAAE,OAAO,CACf,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,IACT,CAEQ,4DAA8D,CACrE,IAAI,CAAE,OAAO,CACb,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,IACR,CAEQ,6DAA+D,CACtE,IAAI,CAAE,IAAI,CACV,KAAK,CAAE,OAAO,CACd,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,IACR,CAEQ;AACT;AACA;AACA;AACA,EAAI,CACF,OAAO,CAAE,CACV,CAEQ;AACT;AACA;AACA;AACA,EAAI,CACF,OAAO,CAAE,CACV,CAIA,WAAmB,cAAe,CACjC,IAAK,CACL,CACA,EAAG,CACH,CACD,CAEA,MAAO,QAAQ,KAAK,CAAC,CAAC,GAAG,CAAC,UAAU,IAAI,CAAE,CACjC,kBAAoB,CAC3B,mBAAmB,CAAE,IAAI,CACtB,gBAAgB,CAAE,IAAI,CACjB,WAAW,CAAE,IACtB,CACD"}'
};
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "open",
    "onOpenChange",
    "closeThreshold",
    "scrollLockTimeout",
    "snapPoints",
    "fadeFromIndex",
    "openFocus",
    "onOutsideClick",
    "closeOnOutsideClick",
    "backgroundColor",
    "nested",
    "shouldScaleBackground",
    "activeSnapPoint",
    "onActiveSnapPointChange",
    "onRelease",
    "onDrag",
    "onClose",
    "dismissible",
    "direction"
  ]);
  let $isOpen, $$unsubscribe_isOpen;
  let $keyboardIsOpen, $$unsubscribe_keyboardIsOpen;
  let $localDismissible, $$unsubscribe_localDismissible;
  let { open = false } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { closeThreshold = void 0 } = $$props;
  let { scrollLockTimeout = void 0 } = $$props;
  let { snapPoints = void 0 } = $$props;
  let { fadeFromIndex = void 0 } = $$props;
  let { openFocus = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  let { closeOnOutsideClick = true } = $$props;
  let { backgroundColor = "black" } = $$props;
  let { nested = false } = $$props;
  let { shouldScaleBackground = false } = $$props;
  let { activeSnapPoint = void 0 } = $$props;
  let { onActiveSnapPointChange = void 0 } = $$props;
  let { onRelease = void 0 } = $$props;
  let { onDrag = void 0 } = $$props;
  let { onClose = void 0 } = $$props;
  let { dismissible = void 0 } = $$props;
  let { direction = "bottom" } = $$props;
  const { states: { keyboardIsOpen, activeSnapPoint: localActiveSnapPoint, drawerId, openDrawerIds: openDrawerIds2, isOpen }, methods: { closeDrawer, openDrawer }, options: { dismissible: localDismissible }, updateOption } = setCtx({
    defaultOpen: open,
    defaultActiveSnapPoint: activeSnapPoint,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    },
    onActiveSnapPointChange: ({ next }) => {
      if (next === void 0 && snapPoints && activeSnapPoint !== next) {
        const newNext = snapPoints[0];
        onActiveSnapPointChange?.(newNext);
        activeSnapPoint = newNext;
        return newNext;
      }
      if (activeSnapPoint !== next) {
        onActiveSnapPointChange?.(next);
        activeSnapPoint = next;
      }
      return next;
    },
    closeThreshold,
    scrollLockTimeout,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    snapPoints,
    fadeFromIndex,
    nested,
    onDrag,
    onClose,
    onRelease,
    shouldScaleBackground,
    backgroundColor,
    dismissible,
    direction
  });
  $$unsubscribe_keyboardIsOpen = subscribe(keyboardIsOpen, (value) => $keyboardIsOpen = value);
  $$unsubscribe_isOpen = subscribe(isOpen, (value) => $isOpen = value);
  $$unsubscribe_localDismissible = subscribe(localDismissible, (value) => $localDismissible = value);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0) $$bindings.onOpenChange(onOpenChange);
  if ($$props.closeThreshold === void 0 && $$bindings.closeThreshold && closeThreshold !== void 0) $$bindings.closeThreshold(closeThreshold);
  if ($$props.scrollLockTimeout === void 0 && $$bindings.scrollLockTimeout && scrollLockTimeout !== void 0) $$bindings.scrollLockTimeout(scrollLockTimeout);
  if ($$props.snapPoints === void 0 && $$bindings.snapPoints && snapPoints !== void 0) $$bindings.snapPoints(snapPoints);
  if ($$props.fadeFromIndex === void 0 && $$bindings.fadeFromIndex && fadeFromIndex !== void 0) $$bindings.fadeFromIndex(fadeFromIndex);
  if ($$props.openFocus === void 0 && $$bindings.openFocus && openFocus !== void 0) $$bindings.openFocus(openFocus);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0) $$bindings.onOutsideClick(onOutsideClick);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0) $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.backgroundColor === void 0 && $$bindings.backgroundColor && backgroundColor !== void 0) $$bindings.backgroundColor(backgroundColor);
  if ($$props.nested === void 0 && $$bindings.nested && nested !== void 0) $$bindings.nested(nested);
  if ($$props.shouldScaleBackground === void 0 && $$bindings.shouldScaleBackground && shouldScaleBackground !== void 0) $$bindings.shouldScaleBackground(shouldScaleBackground);
  if ($$props.activeSnapPoint === void 0 && $$bindings.activeSnapPoint && activeSnapPoint !== void 0) $$bindings.activeSnapPoint(activeSnapPoint);
  if ($$props.onActiveSnapPointChange === void 0 && $$bindings.onActiveSnapPointChange && onActiveSnapPointChange !== void 0) $$bindings.onActiveSnapPointChange(onActiveSnapPointChange);
  if ($$props.onRelease === void 0 && $$bindings.onRelease && onRelease !== void 0) $$bindings.onRelease(onRelease);
  if ($$props.onDrag === void 0 && $$bindings.onDrag && onDrag !== void 0) $$bindings.onDrag(onDrag);
  if ($$props.onClose === void 0 && $$bindings.onClose && onClose !== void 0) $$bindings.onClose(onClose);
  if ($$props.dismissible === void 0 && $$bindings.dismissible && dismissible !== void 0) $$bindings.dismissible(dismissible);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0) $$bindings.direction(direction);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    activeSnapPoint !== void 0 && localActiveSnapPoint.set(activeSnapPoint);
    {
      updateOption("closeThreshold", closeThreshold);
    }
    {
      updateOption("scrollLockTimeout", scrollLockTimeout);
    }
    {
      updateOption("snapPoints", snapPoints);
    }
    {
      updateOption("fadeFromIndex", fadeFromIndex);
    }
    {
      updateOption("openFocus", openFocus);
    }
    {
      updateOption("shouldScaleBackground", shouldScaleBackground);
    }
    {
      updateOption("backgroundColor", backgroundColor);
    }
    {
      updateOption("dismissible", dismissible);
    }
    {
      updateOption("direction", direction);
    }
    open && !$isOpen && openDrawer();
    !open && $isOpen && closeDrawer();
    $$rendered = `${validate_component(Dialog, "DialogPrimitive.Root").$$render(
      $$result,
      Object.assign(
        {},
        { closeOnOutsideClick },
        { closeOnEscape: false },
        { preventScroll: false },
        {
          onOpenChange: (o) => {
            onOpenChange?.(o);
            if (!o) {
              closeDrawer();
            } else if (o) {
              openDrawer();
            }
          }
        },
        {
          onOutsideClick: (e) => {
            if (!closeOnOutsideClick) return;
            onOutsideClick?.(e);
            if (e?.defaultPrevented) return;
            if ($keyboardIsOpen) {
              keyboardIsOpen.set(false);
            }
            e.preventDefault();
            if (!$localDismissible) {
              return;
            }
            const $openDialogIds = get_store_value(openDrawerIds2);
            const isLast = $openDialogIds[$openDialogIds.length - 1] === get_store_value(drawerId);
            if (isLast) {
              onOpenChange?.(false);
              closeDrawer();
            }
          }
        },
        $$restProps,
        { open }
      ),
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_isOpen();
  $$unsubscribe_keyboardIsOpen();
  $$unsubscribe_localDismissible();
  return $$rendered;
});
const Visible = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  getCtx();
  return ``;
});
const Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["style"]);
  let $drawerRef, $$unsubscribe_drawerRef;
  let $getContentStyle, $$unsubscribe_getContentStyle;
  let $direction, $$unsubscribe_direction;
  let $visible, $$unsubscribe_visible;
  const { refs: { drawerRef }, states: { visible }, helpers: { getContentStyle }, methods: { onPress, onDrag, onRelease }, options: { direction } } = getCtx();
  $$unsubscribe_drawerRef = subscribe(drawerRef, (value) => $drawerRef = value);
  $$unsubscribe_visible = subscribe(visible, (value) => $visible = value);
  $$unsubscribe_getContentStyle = subscribe(getContentStyle, (value) => $getContentStyle = value);
  $$unsubscribe_direction = subscribe(direction, (value) => $direction = value);
  let { style = "" } = $$props;
  if ($$props.style === void 0 && $$bindings.style && style !== void 0) $$bindings.style(style);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Dialog_content, "DialogPrimitive.Content").$$render(
      $$result,
      Object.assign(
        {},
        { style: $getContentStyle(style) },
        { "data-vaul-drawer": "" },
        { "data-vaul-drawer-direction": $direction },
        {
          "data-vaul-drawer-visible": $visible ? "true" : "false"
        },
        $$restProps,
        { el: $drawerRef }
      ),
      {
        el: ($$value) => {
          $drawerRef = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Visible, "Visible").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_drawerRef();
  $$unsubscribe_getContentStyle();
  $$unsubscribe_direction();
  $$unsubscribe_visible();
  return $$rendered;
});
const Overlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasSnapPoints;
  let $$restProps = compute_rest_props($$props, []);
  let $snapPoints, $$unsubscribe_snapPoints;
  let $overlayRef, $$unsubscribe_overlayRef;
  let $visible, $$unsubscribe_visible;
  let $isOpen, $$unsubscribe_isOpen;
  let $shouldFade, $$unsubscribe_shouldFade;
  const { refs: { overlayRef }, states: { isOpen, visible, snapPoints, shouldFade }, methods: { onRelease } } = getCtx();
  $$unsubscribe_overlayRef = subscribe(overlayRef, (value) => $overlayRef = value);
  $$unsubscribe_isOpen = subscribe(isOpen, (value) => $isOpen = value);
  $$unsubscribe_visible = subscribe(visible, (value) => $visible = value);
  $$unsubscribe_snapPoints = subscribe(snapPoints, (value) => $snapPoints = value);
  $$unsubscribe_shouldFade = subscribe(shouldFade, (value) => $shouldFade = value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    hasSnapPoints = $snapPoints && $snapPoints.length > 0;
    $$rendered = `${validate_component(Dialog_overlay, "DialogPrimitive.Overlay").$$render(
      $$result,
      Object.assign(
        {},
        {
          "data-vaul-drawer-visible": $visible ? "true" : "false"
        },
        { "data-vaul-overlay": "" },
        {
          "data-vaul-snap-points": $isOpen && hasSnapPoints ? "true" : "false"
        },
        {
          "data-vaul-snap-points-overlay": $isOpen && $shouldFade ? "true" : "false"
        },
        $$restProps,
        { el: $overlayRef }
      ),
      {
        el: ($$value) => {
          $overlayRef = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_snapPoints();
  $$unsubscribe_overlayRef();
  $$unsubscribe_visible();
  $$unsubscribe_isOpen();
  $$unsubscribe_shouldFade();
  return $$rendered;
});
const Portal = Dialog_portal;
const Drawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["shouldScaleBackground", "open", "activeSnapPoint"]);
  let { shouldScaleBackground = true } = $$props;
  let { open = false } = $$props;
  let { activeSnapPoint = void 0 } = $$props;
  if ($$props.shouldScaleBackground === void 0 && $$bindings.shouldScaleBackground && shouldScaleBackground !== void 0) $$bindings.shouldScaleBackground(shouldScaleBackground);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.activeSnapPoint === void 0 && $$bindings.activeSnapPoint && activeSnapPoint !== void 0) $$bindings.activeSnapPoint(activeSnapPoint);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Root, "DrawerPrimitive.Root").$$render(
      $$result,
      Object.assign({}, { shouldScaleBackground }, $$restProps, { open }, { activeSnapPoint }),
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        },
        activeSnapPoint: ($$value) => {
          activeSnapPoint = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Drawer_overlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["el", "class"]);
  let { el = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Overlay, "DrawerPrimitive.Overlay").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn("fixed inset-0 z-[100] bg-black/80", className)
        },
        $$restProps,
        { el }
      ),
      {
        el: ($$value) => {
          el = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Drawer_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Portal, "DrawerPrimitive.Portal").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Drawer_overlay, "DrawerOverlay").$$render($$result, {}, {}, {})} ${validate_component(Content, "DrawerPrimitive.Content").$$render(
        $$result,
        Object.assign(
          {},
          {
            class: cn("fixed inset-x-0 bottom-0 z-[100] mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", className)
          },
          $$restProps
        ),
        {},
        {
          default: () => {
            return `<div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"></div> ${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}`;
    }
  })}`;
});
const PopupContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedService;
  let popupData;
  let theme;
  let $locationStore, $$unsubscribe_locationStore;
  let $shopStore, $$unsubscribe_shopStore;
  $$unsubscribe_locationStore = subscribe(location, (value) => $locationStore = value);
  $$unsubscribe_shopStore = subscribe(shopStore, (value) => $shopStore = value);
  let { popupTypeOpen } = $$props;
  let { location: location$1 } = $$props;
  createEventDispatcher();
  const popupDataByType = {
    ACOMPTE: {
      icon: Wallet,
      title: /* @__PURE__ */ popupInfosTitleAcompte(),
      description: /* @__PURE__ */ popupInfosTextAcompte(),
      infoList: [/* @__PURE__ */ popupInfosListInfosAcompte1(), /* @__PURE__ */ popupInfosListInfosAcompte2()]
    },
    FEES90: {
      icon: Badge_euro,
      title: /* @__PURE__ */ popupInfosTitleFees(),
      description: /* @__PURE__ */ popupInfosTextFees90(),
      warning: /* @__PURE__ */ popupInfosWarningNotRefundable()
    },
    FEES30: {
      icon: Badge_euro,
      title: /* @__PURE__ */ popupInfosTitleFees(),
      description: /* @__PURE__ */ popupInfosTextFees30(),
      warning: /* @__PURE__ */ popupInfosWarningNotRefundable()
    },
    HOURS: {
      icon: Clock_4,
      title: /* @__PURE__ */ popupInfosTitleHours(),
      description: /* @__PURE__ */ popupInfosTextHours(),
      infoList: [/* @__PURE__ */ popupInfosListInfosHours1(), /* @__PURE__ */ popupInfosListInfosHours2()]
    },
    REDUCTIONWITHDISCOUNT: {
      icon: Tag,
      title: /* @__PURE__ */ popupInfosTitleReduction(),
      description: /* @__PURE__ */ popupInfosTextReduction(),
      warning: /* @__PURE__ */ popupInfosWarningNotRefundable()
    },
    REDUCTION: {
      icon: Tag,
      title: /* @__PURE__ */ popupInfosTitleReduction(),
      description: /* @__PURE__ */ popupInfosTextReduction(),
      warning: /* @__PURE__ */ popupInfosWarningNotRefundable()
    },
    MAJORATION: {
      icon: Trending_up,
      title: /* @__PURE__ */ popupInfosTitleMajoration(),
      description: /* @__PURE__ */ popupInfosTextMajoration(),
      warning: /* @__PURE__ */ popupInfosWarningMajoration()
    },
    CANCEL_RESERVATION: {
      title: /* @__PURE__ */ popupInfosTitleCancelReservation(),
      description: /* @__PURE__ */ popupInfosTextCancelReservation1(),
      description2: /* @__PURE__ */ popupInfosTextCancelReservation2(),
      actionContext: {
        textConfirm: /* @__PURE__ */ popupInfosButtonConfirmCancelReservation(),
        textCancel: /* @__PURE__ */ popupInfosButtonCancelCancelReservation()
      }
    },
    HOUR_CHANGE: {
      icon: Clock_4,
      title: /* @__PURE__ */ popupInfosTitleHourChange(),
      description: /* @__PURE__ */ popupInfosTextHourChange(),
      description2: /* @__PURE__ */ popupInfosTextHourChange2(),
      infoList: [/* @__PURE__ */ popupInfosListInfosHourChange()]
    }
  };
  if ($$props.popupTypeOpen === void 0 && $$bindings.popupTypeOpen && popupTypeOpen !== void 0) $$bindings.popupTypeOpen(popupTypeOpen);
  if ($$props.location === void 0 && $$bindings.location && location$1 !== void 0) $$bindings.location(location$1);
  selectedService = $shopStore.selectedService;
  popupData = popupTypeOpen ? popupDataByType[popupTypeOpen] : null;
  theme = location$1?.theme || $locationStore?.location?.theme || "NEUTRAL";
  $$unsubscribe_locationStore();
  $$unsubscribe_shopStore();
  return `${popupData && popupTypeOpen ? `<div class="p-6 py-4 px-8"><div class="flex flex-col items-center justify-center gap-4 text-center mb-6">${"icon" in popupData && popupData?.icon ? `<div class="${"rounded-full w-10 h-10 flex items-center justify-center " + escape(
    theme === "PINK" ? "bg-pink/10" : theme === "NEUTRAL" ? "bg-primary/10" : theme === "CARDEN" ? "bg-blue/10" : "",
    true
  )}">${validate_component(popupData.icon || missing_component, "svelte:component").$$render(
    $$result,
    {
      class: (popupTypeOpen === "REDUCTION" ? "text-[#23BBAC]" : popupTypeOpen === "MAJORATION" ? "text-[#7832DC]" : theme === "PINK" ? "text-pink" : theme === "NEUTRAL" ? "text-primary" : theme === "CARDEN" ? "text-blue" : "") + "\n\n                    " + (["REDUCTIONWITHDISCOUNT", "REDUCTION"].includes(popupTypeOpen) ? "rotate-90" : "") + "\n                ",
      size: 24
    },
    {},
    {}
  )}</div>` : ``} <h2 class="font-bold text-lg">${escape(popupData.title)}</h2> <p class="${[
    "text-sm text-secondary font-normal text-left",
    !popupData?.description2 ? "mb-2" : ""
  ].join(" ").trim()}">${escape(popupData.description)}</p> ${"description2" in popupData ? `<p class="text-sm text-secondary font-normal text-left mb-2">${escape(popupData.description2)}</p>` : ``}</div> ${"infoList" in popupData ? `<ul class="text-sm text-secondary font-normal mb-6">${each(popupData.infoList, (info) => {
    return `<li class="flex gap-2">${validate_component(Circle_check, "CircleCheck").$$render($$result, { class: "text-[#00D4AA]", size: "16" }, {}, {})} ${escape(info)} </li>`;
  })}</ul>` : ``} ${popupTypeOpen === "REDUCTIONWITHDISCOUNT" ? `<div class="flex justify-between items-center text-primary font-normal text-sm w-full py-3 rounded-[3px] px-2 bg-[#23BBAC] bg-opacity-20 mb-6"><p class="">${escape(/* @__PURE__ */ popupInfosEconomy())}</p> <span class="text-sm font-bold text-[#23BBAC]">-${escape(displayPriceInDollars(selectedService.price - selectedService.discountedPrice))}</span></div>` : ``} ${"warning" in popupData ? `<p class="text-sm text-secondary flex gap-2 mb-6">${validate_component(Circle_alert, "CircleAlert").$$render($$result, { size: "16" }, {}, {})} ${escape(popupData.warning)}</p>` : ``} ${popupTypeOpen === "ACOMPTE" ? `<div class="p-4 text-[#616163] rounded-xl bg-[#DFE5E7] bg-opacity-30 text-xs mb-6">${escape(/* @__PURE__ */ popupInfosAcompteNote())}</div>` : ``} ${"actionContext" in popupData ? `<div class="flex justify-center items-center gap-2 mb-6">${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      variant: "outline",
      class: "rounded-full max-h-[35px] max-w-[250px] min-w-2 px-2  w-full border border-primary text-primary flex justify-center items-center "
    },
    {},
    {
      default: () => {
        return `${escape(popupData.actionContext.textCancel)}`;
      }
    }
  )} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      class: " max-h-[35px] max-w-[250px] min-w-2 px-2  w-full bg-primary rounded-full flex justify-center items-center "
    },
    {},
    {
      default: () => {
        return `${escape(popupData.actionContext.textConfirm)}`;
      }
    }
  )}</div>` : `<div class="flex justify-center items-center">${validate_component(Button, "Button").$$render(
    $$result,
    {
      type: "button",
      class: "rounded-lg min-h-[61px] w-full bg-primary "
    },
    {},
    {
      default: () => {
        return `${escape(/* @__PURE__ */ popupInfosButtonGotIt())}`;
      }
    }
  )}</div>`}</div>` : ``}`;
});
const Popup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dataProps;
  let { popupTypeOpen = null } = $$props;
  let { location: location2 = null } = $$props;
  let openPopup = false;
  let openPopupMobile = false;
  createEventDispatcher();
  const closePopup = () => {
    popupTypeOpen = null;
    openPopup = false;
    openPopupMobile = false;
  };
  if ($$props.popupTypeOpen === void 0 && $$bindings.popupTypeOpen && popupTypeOpen !== void 0) $$bindings.popupTypeOpen(popupTypeOpen);
  if ($$props.location === void 0 && $$bindings.location && location2 !== void 0) $$bindings.location(location2);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (popupTypeOpen) {
        {
          openPopup = true;
          openPopupMobile = false;
        }
      }
    }
    dataProps = { popupTypeOpen, location: location2 };
    $$rendered = `${popupTypeOpen ? `<div class="w-full">${openPopup ? ` <div class="fixed inset-0 z-[120] bg-black/50 flex items-center justify-center"> <div class="bg-white rounded-xl max-w-lg w-full mx-4 shadow-xl">${validate_component(PopupContent, "PopupContent").$$render($$result, Object.assign({}, dataProps), {}, {})}</div></div>` : `${validate_component(Drawer, "Drawer.Root").$$render(
      $$result,
      {
        onClose: closePopup,
        open: openPopupMobile
      },
      {
        open: ($$value) => {
          openPopupMobile = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Drawer_content, "Drawer.Content").$$render($$result, { class: " z-[120]" }, {}, {
            default: () => {
              return `${validate_component(PopupContent, "PopupContent").$$render($$result, Object.assign({}, dataProps), {}, {})}`;
            }
          })}`;
        }
      }
    )}`}</div>` : ``}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Drawer as D,
  Info as I,
  Popup as P,
  Trending_up as T,
  Wallet as W,
  Tag as a,
  getCtx as b,
  Drawer_content as c,
  getCtx$1 as g
};

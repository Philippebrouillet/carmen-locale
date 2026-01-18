import { c as create_ssr_component, f as spread, h as escape_object, a as add_attribute, s as setContext, g as getContext, i as escape_attribute_value, v as validate_component, e as escape } from "../../../../../../../chunks/ssr.js";
import "dequal";
import { m as makeElement, a as addMeltEventListener, o as omit, d as disabledAttr, e as executeCallbacks, k as kbd, s as styleToString, c as createElHelpers } from "../../../../../../../chunks/create.js";
import { c as compute_rest_props, s as subscribe } from "../../../../../../../chunks/utils.js";
import { t as toWritableStores, o as overridable, c as createBitAttrs, r as removeUndefined, g as getOptionUpdater } from "../../../../../../../chunks/updater.js";
import { c as createDispatcher } from "../../../../../../../chunks/events.js";
import { g as getTranslationFunctions } from "../../../../../../../chunks/index3.js";
import { w as writable } from "../../../../../../../chunks/index2.js";
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
function createLabel() {
  const root = makeElement("label", {
    action: (node) => {
      const mouseDown = addMeltEventListener(node, "mousedown", (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      });
      return {
        destroy: mouseDown
      };
    }
  });
  return {
    elements: {
      root
    }
  };
}
const defaults = {
  defaultChecked: false,
  disabled: false,
  required: false,
  name: "",
  value: ""
};
const { name } = createElHelpers("switch");
function createSwitch(props) {
  const propsWithDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(propsWithDefaults, "checked"));
  const { disabled, required, name: nameStore, value } = options;
  const checkedWritable = propsWithDefaults.checked ?? writable(propsWithDefaults.defaultChecked);
  const checked = overridable(checkedWritable, propsWithDefaults?.onCheckedChange);
  function toggleSwitch() {
    if (disabled.get())
      return;
    checked.update((prev) => !prev);
  }
  const root = makeElement(name(), {
    stores: [checked, disabled, required],
    returned: ([$checked, $disabled, $required]) => {
      return {
        "data-disabled": disabledAttr($disabled),
        disabled: disabledAttr($disabled),
        "data-state": $checked ? "checked" : "unchecked",
        type: "button",
        role: "switch",
        "aria-checked": $checked ? "true" : "false",
        "aria-required": $required ? "true" : void 0
      };
    },
    action(node) {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        toggleSwitch();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleSwitch();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const input = makeElement(name("input"), {
    stores: [checked, nameStore, required, disabled, value],
    returned: ([$checked, $name, $required, $disabled, $value]) => {
      return {
        type: "checkbox",
        "aria-hidden": true,
        hidden: true,
        tabindex: -1,
        name: $name,
        value: $value,
        checked: $checked,
        required: $required,
        disabled: disabledAttr($disabled),
        style: styleToString({
          position: "absolute",
          opacity: 0,
          "pointer-events": "none",
          margin: 0,
          transform: "translateX(-100%)"
        })
      };
    }
  });
  return {
    elements: {
      root,
      input
    },
    states: {
      checked
    },
    options
  };
}
function getLabelData() {
  const NAME = "label";
  const PARTS = ["root"];
  const getAttrs = createBitAttrs(NAME, PARTS);
  return {
    NAME,
    getAttrs
  };
}
const Label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root } } = createLabel();
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  createDispatcher();
  const { getAttrs } = getLabelData();
  const attrs = getAttrs("root");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<label${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</label>`}`;
});
function getSwitchData() {
  const NAME = "switch";
  const PARTS = ["root", "input", "thumb"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getSwitchData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const Switch2 = { ...createSwitch(removeUndefined(props)), getAttrs };
  setContext(NAME, Switch2);
  return {
    ...Switch2,
    updateOption: getOptionUpdater(Switch2.options)
  };
}
function getCtx() {
  const { NAME } = getSwitchData();
  return getContext(NAME);
}
const Switch_input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let inputValue;
  let $$restProps = compute_rest_props($$props, ["el"]);
  let $value, $$unsubscribe_value;
  let $input, $$unsubscribe_input;
  let $name, $$unsubscribe_name;
  let $disabled, $$unsubscribe_disabled;
  let $required, $$unsubscribe_required;
  let { el = void 0 } = $$props;
  const { elements: { input }, options: { value, name: name2, disabled, required } } = getCtx();
  $$unsubscribe_input = subscribe(input, (value2) => $input = value2);
  $$unsubscribe_value = subscribe(value, (value2) => $value = value2);
  $$unsubscribe_name = subscribe(name2, (value2) => $name = value2);
  $$unsubscribe_disabled = subscribe(disabled, (value2) => $disabled = value2);
  $$unsubscribe_required = subscribe(required, (value2) => $required = value2);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  inputValue = $value === void 0 || $value === "" ? "on" : $value;
  $$unsubscribe_value();
  $$unsubscribe_input();
  $$unsubscribe_name();
  $$unsubscribe_disabled();
  $$unsubscribe_required();
  return `<input${spread(
    [
      escape_object($input),
      { name: escape_attribute_value($name) },
      { disabled: $disabled || null },
      { required: $required || null },
      {
        value: escape_attribute_value(inputValue)
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", el, 0)}>`;
});
const { Object: Object_1 } = globals;
const Switch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let attrs;
  let $$restProps = compute_rest_props($$props, [
    "checked",
    "onCheckedChange",
    "disabled",
    "name",
    "value",
    "includeInput",
    "required",
    "asChild",
    "inputAttrs",
    "el"
  ]);
  let $root, $$unsubscribe_root;
  let { checked = void 0 } = $$props;
  let { onCheckedChange = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { name: name2 = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { includeInput = true } = $$props;
  let { required = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { inputAttrs = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { checked: localChecked }, updateOption, getAttrs } = setCtx({
    disabled,
    name: name2,
    value,
    required,
    defaultChecked: checked,
    onCheckedChange: ({ next }) => {
      if (checked !== next) {
        onCheckedChange?.(next);
        checked = next;
      }
      return next;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  createDispatcher();
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0) $$bindings.checked(checked);
  if ($$props.onCheckedChange === void 0 && $$bindings.onCheckedChange && onCheckedChange !== void 0) $$bindings.onCheckedChange(onCheckedChange);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.includeInput === void 0 && $$bindings.includeInput && includeInput !== void 0) $$bindings.includeInput(includeInput);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.inputAttrs === void 0 && $$bindings.inputAttrs && inputAttrs !== void 0) $$bindings.inputAttrs(inputAttrs);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  checked !== void 0 && localChecked.set(checked);
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("name", name2);
  }
  {
    updateOption("value", value);
  }
  {
    updateOption("required", required);
  }
  builder = $root;
  attrs = {
    ...getAttrs("root"),
    "data-checked": checked ? "" : void 0
  };
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
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
  )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`} ${includeInput ? `${validate_component(Switch_input, "SwitchInput").$$render($$result, Object_1.assign({}, inputAttrs), {}, {})}` : ``}`;
});
const Switch_thumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $checked, $$unsubscribe_checked;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { states: { checked }, getAttrs } = getCtx();
  $$unsubscribe_checked = subscribe(checked, (value) => $checked = value);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  attrs = {
    ...getAttrs("thumb"),
    "data-state": $checked ? "checked" : "unchecked",
    "data-checked": $checked ? "" : void 0
  };
  $$unsubscribe_checked();
  return `${asChild ? `${slots.default ? slots.default({ attrs, checked: $checked }) : ``}` : `<span${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}></span>`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const location = data.locationInfo.location;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<main><pre>        ${escape(JSON.stringify(location, null, 2))}
    </pre> <div class="flex flex-col w-full bg-slate-300"><div class="flex items-center space-x-3">${validate_component(Label, "Label.Root").$$render(
    $$result,
    {
      for: "hide-fee",
      class: "text-sm font-medium"
    },
    {},
    {
      default: () => {
        return `Hide fee`;
      }
    }
  )} ${validate_component(Switch, "Switch.Root").$$render(
    $$result,
    {
      id: "hide-fee",
      class: "peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-foreground"
    },
    {},
    {
      default: () => {
        return `${validate_component(Switch_thumb, "Switch.Thumb").$$render(
          $$result,
          {
            class: "pointer-events-none block size-[30px] shrink-0 rounded-full bg-background transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:shadow-mini dark:border dark:border-background/30 dark:bg-foreground dark:shadow-popover dark:data-[state=unchecked]:border"
          },
          {},
          {}
        )}`;
      }
    }
  )}</div> <div class="flex items-center space-x-3">${validate_component(Label, "Label.Root").$$render(
    $$result,
    {
      for: "carden",
      class: "text-sm font-medium"
    },
    {},
    {
      default: () => {
        return `Hide fee`;
      }
    }
  )} ${validate_component(Switch, "Switch.Root").$$render(
    $$result,
    {
      id: "carden",
      class: "peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-foreground"
    },
    {},
    {
      default: () => {
        return `${validate_component(Switch_thumb, "Switch.Thumb").$$render(
          $$result,
          {
            class: "pointer-events-none block size-[30px] shrink-0 rounded-full bg-background transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:shadow-mini dark:border dark:border-background/30 dark:bg-foreground dark:shadow-popover dark:data-[state=unchecked]:border"
          },
          {},
          {}
        )}`;
      }
    }
  )}</div> <div class="flex items-center space-x-3">${validate_component(Label, "Label.Root").$$render(
    $$result,
    {
      id: "loaction-fee-label",
      for: "location-fee",
      class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    },
    {},
    {
      default: () => {
        return `Location fee`;
      }
    }
  )} <input id="location-fee" type="number"></div></div></main>`;
});
export {
  Page as default
};

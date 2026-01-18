import { c as compute_rest_props } from "./utils.js";
import { c as create_ssr_component, f as spread, h as escape_object, a as add_attribute, v as validate_component } from "./ssr.js";
import "dequal";
import "./create.js";
import { i as is_void } from "./names.js";
import { g as getTranslationFunctions } from "./index3.js";
import { tv } from "tailwind-variants";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function getAttrs(builders) {
  const attrs = {};
  builders.forEach((builder) => {
    Object.keys(builder).forEach((key) => {
      if (key !== "action") {
        attrs[key] = builder[key];
      }
    });
  });
  return attrs;
}
const Button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "type", "builders", "el"]);
  let { href = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { builders = [] } = $$props;
  let { el = void 0 } = $$props;
  const attrs = { "data-button-root": "" };
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0) $$bindings.builders(builders);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  return `${builders && builders.length ? ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        escape_object(`${href ? "a" : "button"}` === "button" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...getAttrs(builders),
            ...$$restProps,
            ...attrs
          },
          [{ attribute_name: "formaction" }]
        ) : `${href ? "a" : "button"}` === "form" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...getAttrs(builders),
            ...$$restProps,
            ...attrs
          },
          [{ attribute_name: "action" }]
        ) : `${href ? "a" : "button"}` === "a" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...getAttrs(builders),
            ...$$restProps,
            ...attrs
          },
          [
            {
              attribute_name: "href",
              lang_attribute_name: "hreflang"
            }
          ]
        ) : {
          "type": href ? void 0 : type,
          href,
          "tabindex": `0`,
          ...getAttrs(builders),
          ...$$restProps,
          ...attrs
        })
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}` : ` ${((tag) => {
    return tag ? `<${href ? "a" : "button"}${spread(
      [
        escape_object(`${href ? "a" : "button"}` === "button" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...$$restProps,
            ...attrs
          },
          [{ attribute_name: "formaction" }]
        ) : `${href ? "a" : "button"}` === "form" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...$$restProps,
            ...attrs
          },
          [{ attribute_name: "action" }]
        ) : `${href ? "a" : "button"}` === "a" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            "type": href ? void 0 : type,
            href,
            "tabindex": `0`,
            ...$$restProps,
            ...attrs
          },
          [
            {
              attribute_name: "href",
              lang_attribute_name: "hreflang"
            }
          ]
        ) : {
          "type": href ? void 0 : type,
          href,
          "tabindex": `0`,
          ...$$restProps,
          ...attrs
        })
      ],
      {}
    )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "button")}`}`;
});
const buttonVariants = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.045]",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-16 px-8",
      sm: "h-12 rounded-full px-4",
      lg: "h-16 rounded-full px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "builders"]);
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  let { size = "default" } = $$props;
  let { builders = [] } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0) $$bindings.builders(builders);
  return `${validate_component(Button$1, "ButtonPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      { builders },
      {
        class: cn(buttonVariants({ variant, size, className }))
      },
      { type: "button" },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
export {
  Button as B,
  cn as c
};

import { languageTag } from "$src/lib/paraglide/runtime";

export const buildUrl = (path: string) => {
  const url =
    languageTag().split("-")[0] !== "fr" ? `/${languageTag().split("-")[0]}/${path}` : `/${path}`;

  return url;
};

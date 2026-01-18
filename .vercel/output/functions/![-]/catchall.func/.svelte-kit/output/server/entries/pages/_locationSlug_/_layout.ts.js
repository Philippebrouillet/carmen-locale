import { e as error } from "../../../chunks/index.js";
import { P as PUBLIC_CARDEN_API } from "../../../chunks/public.js";
import { f as formatLocationResponse } from "../../../chunks/Location.js";
async function load({ fetch, params }) {
  const slug = params.locationSlug;
  const resp = await fetch(`${PUBLIC_CARDEN_API}/api/v3/location/${slug}`);
  const configResp = await fetch(`${PUBLIC_CARDEN_API}/api/v1/location/${slug}/config`);
  if (resp.ok) {
    const json = await resp.json();
    const configJson = await configResp.json();
    console.log("configJson", configJson);
    return { ...formatLocationResponse(json), config: configJson.config };
  }
  if (resp.status == 404) {
    return error(404, "Not found");
  }
  return error(500, "internal server error");
}
export {
  load
};

import { error } from "@sveltejs/kit";
import { PUBLIC_CARDEN_API } from "$env/static/public";
import { formatLocationResponse } from "$src/services/Location";

export async function load({ fetch, params }) {
  const slug = params.locationSlug;
  // let resp = await fetch(`${PUBLIC_CARDEN_API}/api/v5/location/${slug}`);
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

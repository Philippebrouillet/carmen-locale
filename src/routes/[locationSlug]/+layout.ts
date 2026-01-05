import { error } from "@sveltejs/kit";
import { PUBLIC_CARDEN_API } from "$env/static/public";
import { formatLocationResponse } from "$src/services/Location";

export async function load({ fetch, params }) {
  const slug = params.locationSlug;
  // let resp = await fetch(`${PUBLIC_CARDEN_API}/api/v5/location/${slug}`);
  const resp = await fetch(`${PUBLIC_CARDEN_API}/api/v3/location/${slug}`);
  if (resp.ok) {
    const json = await resp.json();
    return formatLocationResponse(json);
  }
  if (resp.status == 404) {
    return error(404, "Not found");
  }
  return error(500, "internal server error");
}

import { PUBLIC_CARDEN_API } from "$env/static/public";
import { formatLocationResponse } from "$src/services/Location";
import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
  const slug = params.slug;
  const resp = await fetch(`${PUBLIC_CARDEN_API}/api/v2/ticket/${slug}`);
  let ticket = null;
  if (resp.ok) {
    ticket = await resp.json();
    console.log("ticket", ticket);
  } else return error(404, "Not found");

  const locationResponse = await fetch(
    `${PUBLIC_CARDEN_API}/api/v3/location/${ticket.ticket.locationId}`,
  );

  if (locationResponse.ok) {
    const json = await locationResponse.json();
    const location = formatLocationResponse(json);
    return { ...ticket, location: location };
  }

  return error(404, "Not found");
}

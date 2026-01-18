import { P as PUBLIC_CARDEN_API } from "../../../../chunks/public.js";
import { f as formatLocationResponse } from "../../../../chunks/Location.js";
import { e as error } from "../../../../chunks/index.js";
async function load({ params, fetch }) {
  const slug = params.slug;
  const resp = await fetch(`${PUBLIC_CARDEN_API}/api/v2/ticket/${slug}`);
  let ticket = null;
  if (resp.ok) {
    ticket = await resp.json();
    console.log("ticket", ticket);
  } else return error(404, "Not found");
  const locationResponse = await fetch(
    `${PUBLIC_CARDEN_API}/api/v3/location/${ticket.ticket.locationId}`
  );
  const configResp = await fetch(
    `${PUBLIC_CARDEN_API}/api/v1/location/${ticket.ticket.locationId}/config`
  );
  if (locationResponse.ok) {
    const json = await locationResponse.json();
    const location = formatLocationResponse(json);
    const configJson = await configResp.json();
    return { ...ticket, location, config: configJson.config };
  }
  return error(404, "Not found");
}
export {
  load
};

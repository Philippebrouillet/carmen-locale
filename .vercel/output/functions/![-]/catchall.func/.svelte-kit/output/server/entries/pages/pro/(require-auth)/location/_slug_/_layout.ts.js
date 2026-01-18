import { P as PUBLIC_CARDEN_API } from "../../../../../../chunks/public.js";
import { r as redirect } from "../../../../../../chunks/index.js";
const prerender = false;
const ssr = false;
async function load({ fetch, params, parent }) {
  let p = await parent();
  if (p.me == null) {
    return redirect(303, `/pro/login?redirectTo=${params.slug}`);
  }
  let locationUrl = `${PUBLIC_CARDEN_API}/api/v5/location/${params.slug}`;
  let res = await fetch(locationUrl);
  let locationInfo = await res.json();
  return { locationInfo };
}
export {
  load,
  prerender,
  ssr
};

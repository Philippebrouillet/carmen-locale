import { PUBLIC_CARDEN_API } from "$env/static/public";
import { redirect } from "@sveltejs/kit";
export const prerender = false;
export const ssr = false;

export async function load({ fetch, params, parent }) {
  let p = await parent();

  if (p.me == null) {
    return redirect(303, `/pro/login?redirectTo=${params.slug}`);
  }

  let locationUrl = `${PUBLIC_CARDEN_API}/api/v5/location/${params.slug}`;
  let res = await fetch(locationUrl);
  let locationInfo = await res.json();
  return { locationInfo };
}

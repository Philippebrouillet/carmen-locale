import { PUBLIC_CARDEN_API } from "$env/static/public";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  let logoutUrl = new URL(`${PUBLIC_CARDEN_API}/logout`);
  // no need to await that
  fetch(logoutUrl);
  redirect(302, "/pro/login");
}

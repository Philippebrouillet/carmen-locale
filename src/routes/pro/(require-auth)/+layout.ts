import { PUBLIC_CARDEN_API } from "$env/static/public";
import { redirect } from "@sveltejs/kit";

export const prerender = false;
export const ssr = false;

export async function load({ fetch }) {
  let meUrl = `${PUBLIC_CARDEN_API}/api/v2/me`;

  let resp = await fetch(meUrl, {
    credentials: "include",
  });

  if (!resp.ok || resp.status == 401) {
    console.log("redirect");
    redirect(307, "/pro/login");
  }

  let user = await resp.json();
  return {
    me: user,
  };
}

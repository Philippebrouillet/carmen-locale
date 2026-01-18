import { P as PUBLIC_CARDEN_API } from "../../../../chunks/public.js";
import { r as redirect } from "../../../../chunks/index.js";
const prerender = false;
const ssr = false;
async function load({ fetch }) {
  let meUrl = `${PUBLIC_CARDEN_API}/api/v2/me`;
  let resp = await fetch(meUrl, {
    credentials: "include"
  });
  if (!resp.ok || resp.status == 401) {
    console.log("redirect");
    redirect(307, "/pro/login");
  }
  let user = await resp.json();
  return {
    me: user
  };
}
export {
  load,
  prerender,
  ssr
};

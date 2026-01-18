import { P as PUBLIC_CARDEN_API } from "../../../../../chunks/public.js";
import { r as redirect } from "../../../../../chunks/index.js";
async function load({ fetch }) {
  let logoutUrl = new URL(`${PUBLIC_CARDEN_API}/logout`);
  fetch(logoutUrl);
  redirect(302, "/pro/login");
}
export {
  load
};

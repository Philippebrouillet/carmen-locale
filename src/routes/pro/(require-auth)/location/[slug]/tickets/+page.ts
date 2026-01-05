import { PUBLIC_CARDEN_API } from "$env/static/public";

export async function load({ fetch, parent, url }) {
  let data = await parent();

  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  let startDate = url.searchParams.get("start") ?? firstDay;
  let endDate = url.searchParams.get("end") ?? lastDay;

  let location = data.locationInfo.location;
  let planningUrl = `${PUBLIC_CARDEN_API}/admin/tickets?location=${location.id}`;

  let resp = await fetch(planningUrl, { credentials: "include" });
  let tickets = await resp.json();

  return {
    startDate,
    endDate,
    tickets,
  };
}

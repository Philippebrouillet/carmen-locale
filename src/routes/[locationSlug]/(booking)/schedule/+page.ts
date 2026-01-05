/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
  let workerFilter = url.searchParams.get("workerFilter");
  let serviceId = url.searchParams.get("serviceId");
  let mode = url.searchParams.get("mode");

  return {
    workerFilter,
    serviceId,
    mode,
  };
}

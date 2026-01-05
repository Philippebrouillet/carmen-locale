/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
  let workerFilter = url.searchParams.get("workerFilter");
  return {
    workerFilter,
  };
}

/** @type {import('./$types').LayoutLoad} */
export async function load({ url }) {
  return {
    selection: {
      bookingTime: url.searchParams.get("bookingTime"),
      workerFilter: url.searchParams.get("workerFilter"),
      serviceId: url.searchParams.get("serviceId"),
      mode: url.searchParams.get("mode"),
    },
  };
}

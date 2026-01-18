async function load({ url }) {
  let workerFilter = url.searchParams.get("workerFilter");
  return {
    workerFilter
  };
}
export {
  load
};

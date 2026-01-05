/**
 * @param {URL} url
 * @param {String} param
 * @param {String} value
 */
export function setParam(url, param, value) {
  let res = new URL(url);
  res.searchParams.set(param, value);
  return res;
}

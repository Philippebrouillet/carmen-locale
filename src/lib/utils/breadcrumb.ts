export function getBreadcrumbs(path: string) {
  const segments = path.split("/").filter(Boolean);
  console.log("segments", segments);
  return segments.map((segment, index) => ({
    name: segment,
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));
}

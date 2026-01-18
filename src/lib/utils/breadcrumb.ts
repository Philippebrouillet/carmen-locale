export function getBreadcrumbs(path: string) {
  const segments = path.split("/").filter(Boolean);

  return segments.map((segment, index) => ({
    name: segment,
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));
}

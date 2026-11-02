import data from "./recruitment/workforce.json";

// Small directory records only. The full occupational guides stay in the
// server route and only the requested guide is passed to the client.
export const workforceIndex = data.workforce.map(role => ({
  ...role,
  slug: role.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
}));
export function findWorkforceRole(value: string | null) {
  return workforceIndex.find(role => role.slug === value || role.title === value);
}

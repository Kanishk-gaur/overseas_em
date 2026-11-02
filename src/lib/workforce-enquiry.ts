export type WorkforceEnquiry = {
  company: string; person: string; email: string; country: string; phone: string;
  role: string; quantity: string; level: string; location: string; timeline: string; details: string;
};
export const enquiryFields = ["company", "person", "email", "country", "phone", "role", "quantity", "level", "location", "timeline", "details"] as const;

export function formatWorkforceEnquiry(values: WorkforceEnquiry, labels: Record<keyof WorkforceEnquiry, string>) {
  return enquiryFields.map(key => `${labels[key]}: ${values[key].trim() || "—"}`).join("\n\n");
}

export function workforceMailto(recipient: string, subject: string, body: string) {
  // A single verified recipient; never allow user input to alter mail headers.
  if (!/^[^\s@?,;:<>]+@[^\s@?,;:<>]+\.[^\s@?,;:<>]+$/.test(recipient)) return null;
  const address = encodeURIComponent(recipient).replace("%40", "@");
  return `mailto:${address}?subject=${encodeURIComponent(subject.replace(/[\r\n]/g, " "))}&body=${encodeURIComponent(body)}`;
}

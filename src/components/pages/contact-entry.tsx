"use client";
import { useSearchParams } from "next/navigation";
import { ContactPage } from "./contact-page";
export function ContactEntry() { const params = useSearchParams(); const type = params.get("type") === "employer" ? "employer" : "candidate"; return <ContactPage key={type} initialType={type} />; }

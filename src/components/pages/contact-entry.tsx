"use client";
import { useSearchParams } from "next/navigation";
import { ContactPage } from "./contact-page";
import { enquiryTypes, type EnquiryType } from "@/lib/contact";
export function ContactEntry() { const params = useSearchParams(); const requested = params.get("type") as EnquiryType | null; const type: EnquiryType = requested && enquiryTypes.includes(requested) ? requested : "employer"; return <ContactPage key={type} initialType={type} />; }

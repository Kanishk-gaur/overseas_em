import { l } from "./types";

export const officialSources = {
  emigrate: { label: "eMigrate · Government of India", url: "https://emigrate.gov.in/" },
  meaSafety: { label: "MEA · Overseas recruitment advisory", url: "https://www.mea.gov.in/Images/attach/05-List-2024.pdf" },
  meaFaq: { label: "MEA · Questions for intending emigrants", url: "https://www.mea.gov.in/issues-of-intending-emigrants.htm" },
  passport: { label: "Passport Seva · Application guidance", url: "https://www.passportindia.gov.in/psp/Apply" },
  germany: { label: "Make it in Germany · Qualified professionals", url: "https://www.make-it-in-germany.com/en/visa-recognition/visa-types/qualified-professionals" },
  japan: { label: "Immigration Services Agency · SSW guidance", url: "https://www.ssw.go.jp/en/about/sswv/" },
  poland: { label: "Poland in India · National work visa", url: "https://www.gov.pl/web/india/d-type-national-visa---work" },
  uae: { label: "UAE Government · Job offers and contracts", url: "https://u.ae/en/information-and-services/jobs/employment-in-the-private-sector/job-offers-and-work-permits-and-contracts/expatriates-employment-in-private-sector" },
  portugal: { label: "European Commission · Working in Portugal", url: "https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal/employed-worker-portugal_en" },
  czech: { label: "Czech Ministry of the Interior · Employment", url: "https://ipc.gov.cz/en/life-in-the-czech-republic/employment-in-the-czech-republic/" },
  romania: { label: "Romanian Government · Visas and residence", url: "https://workinromania.gov.ro/workinro/default/vize-si-sedere?lang=en" },
  uk: { label: "GOV.UK · International health and care recruitment", url: "https://www.gov.uk/government/publications/applying-for-health-and-social-care-jobs-in-the-uk-from-abroad/part-1-applying-for-health-and-social-care-jobs-in-the-uk-from-abroad" },
  israel: { label: "Israeli Consulate, Mumbai · Work visa guidance", url: "https://embassies.gov.il/mumbai/en/services/foreign-citizens/application-work-visa-israel" },
  russia: { label: "Russian Ministry of Foreign Affairs · Visa information", url: "https://www.kdmid.ru/cons/visas/" },
  oman: { label: "Oman Government · Work visa", url: "https://gov.om/en/w/get-a-work-visa" },
  kuwait: { label: "Kuwait Government · Private-sector work entry visa", url: "https://e.gov.kw/sites/kgoenglish/Pages/Services/MOI/PrivateSectorWorkEntryVisa.aspx" },
  bahrain: { label: "Bahrain LMRA · Worker permit guidance", url: "https://blog.lmra.gov.bh/en/2022/10/12/labour-market-regulatory-authority-calls-on-expat-workers-to-verify-legal-status/" },
  qatar: { label: "Qatar Government · Residence and work permits", url: "https://portal.www.gov.qa/wps/wcm/connect/Hukoomi%2BWeb%2BContent/Hukoomi/Topics/Visas%2Band%2BOfficial%2BDocuments/residenceandworkpermits" },
  saudi: { label: "Saudi HRSD · Work permits", url: "https://prod.hrsd.gov.sa/en/ministry-services/services/إصدار-و-تجديد-رخص-العمل" },
};
export type OfficialSourceKey = keyof typeof officialSources;
export const sourcesReviewed = l("Official links checked 25 October 2026. Check the issuing authority for changes before applying.", "आधिकारिक लिंक 25 अक्टूबर 2026 को जाँचे गए। आवेदन से पहले संबंधित अधिकारी से बदलाव जाँचें।");

import type { OfficialSourceKey } from "./official-sources";

// Country-by-country data for the visa guide at /glossary/.
//
// HOW TO EDIT
// - Each block below is one country tab, written in plain English.
// - Every string here is translated through the site dictionaries, exactly
//   like the glossary terms. After changing or adding English text:
//     1. run `npm run i18n:catalog`
//     2. add the new strings to every file in src/locales/messages/
//     3. run `npm run check:i18n` (it lists anything missing)
//   The production build stops if a translation is missing.
// - `slug` must match the destination page at /countries/<slug>/.
// - `officialSource` is a key from src/data/official-sources.ts. Change the
//   URL there so every page that links to the same authority stays in sync.
// - `audience` accepts "skilled", "semi-skilled" and "professional".
//
// CONTENT RULES
// - Keep official route names recognisable. In translations the official
//   term or acronym stays in brackets (MOHRE, LMRA, SSW, CoS, D/AM…).
// - Do not add fees, salaries, processing times or guarantees unless they
//   are verified against the official source.
// - TODO(owner): `feesAndTiming` is intentionally left out for every country,
//   so the page shows "Varies — confirm with the official source." Add a short
//   verified note per country here once you have confirmed it, for example:
//   feesAndTiming: "Checked on <date> against <authority>: …"

export type VisaAudience = "skilled" | "semi-skilled" | "professional";

export type VisaCountry = {
  slug: string;
  name: string;
  /** Common work visa / permit route names. Names only. */
  routes: string[];
  /** Who the routes are generally for. */
  audience: VisaAudience[];
  audienceNote: string;
  /** Documents usually asked for. */
  documents: string[];
  /** Common steps, shown as a numbered list in this order. */
  steps: string[];
  /** Language or qualification-recognition points. */
  languageNote: string;
  /** TODO(owner): optional verified note. Leave out until confirmed. */
  feesAndTiming?: string;
  officialSource: OfficialSourceKey;
};

export const visaCountries: VisaCountry[] = [
  {
    slug: "uae",
    name: "UAE",
    routes: [
      "Work permit (MOHRE, mainland private sector)",
      "Employment entry permit",
      "Residence visa and Emirates ID",
      "Free-zone employment visa",
    ],
    audience: ["skilled", "semi-skilled", "professional"],
    audienceNote: "Used across construction, hospitality, logistics, facilities and professional roles. The employer sponsors and applies for the permit.",
    documents: [
      "Passport with the validity required by the UAE authorities",
      "Passport-size photographs to the stated specification",
      "Signed offer letter and employment contract in the official format",
      "Educational or trade certificates, attested where the job category requires it",
      "Medical fitness test result (normally taken in the UAE after arrival)",
      "Emirates ID application and biometrics",
    ],
    steps: [
      "The employer issues a written offer; you review and sign it.",
      "The employer applies for the work permit and entry permit.",
      "ECR passport holders complete emigration clearance in India, where it applies.",
      "You travel on the employment entry permit, not on a visit visa.",
      "You complete the medical fitness test and Emirates ID biometrics in the UAE.",
      "The residence visa is issued and the employment contract is registered.",
    ],
    languageNote: "There is no general language test. Attested qualifications may be needed for skilled and professional categories, and some professions (for example healthcare, engineering and teaching) require a licence from the relevant UAE authority.",
    officialSource: "uae",
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    routes: [
      "Work visa (employer-sponsored)",
      "Iqama (residence permit)",
      "Work permit (HRSD)",
    ],
    audience: ["skilled", "semi-skilled", "professional"],
    audienceNote: "Used for infrastructure, industrial, healthcare, facilities and service roles with a sponsoring employer.",
    documents: [
      "Passport with the validity required by the Saudi authorities",
      "Passport-size photographs",
      "Signed employment contract",
      "Educational or trade certificates, attested where required",
      "Medical report from an approved medical centre",
      "Police clearance certificate (PCC)",
      "Skill verification certificate for certain trades, where required",
    ],
    steps: [
      "The employer obtains visa authorisation and issues the employment contract.",
      "You complete the medical examination at an approved centre in India.",
      "Certificates are attested and any required skill verification is completed.",
      "The work visa is processed through the Saudi mission or its authorised visa centre.",
      "ECR passport holders complete emigration clearance, where it applies.",
      "After arrival, the employer arranges the Iqama and work permit.",
    ],
    languageNote: "There is no general language test. Some professions need accreditation from a Saudi professional body, and certain trades need a skill verification test before the visa is issued.",
    officialSource: "saudi",
  },
  {
    slug: "qatar",
    name: "Qatar",
    routes: [
      "Work visa (employer-sponsored)",
      "Work residence permit",
      "Qatar ID (QID)",
    ],
    audience: ["skilled", "semi-skilled", "professional"],
    audienceNote: "Used for hospitality, maintenance, construction, transport and professional roles tied to a sponsoring employer.",
    documents: [
      "Passport with the validity required by the Qatari authorities",
      "Passport-size photographs",
      "Employment contract (signed electronically at the visa centre, where applicable)",
      "Educational or trade certificates, attested where required",
      "Medical examination and biometrics at a Qatar Visa Center",
      "Police clearance certificate (PCC), where requested",
    ],
    steps: [
      "The employer obtains work visa approval in Qatar.",
      "You attend a Qatar Visa Center in India for biometrics, the medical examination and contract signing.",
      "ECR passport holders complete emigration clearance, where it applies.",
      "You travel once the work visa is issued.",
      "After arrival, the employer completes the residence permit and Qatar ID.",
    ],
    languageNote: "There is no general language test. Some professions require attested qualifications or a licence from the relevant Qatari authority.",
    officialSource: "qatar",
  },
  {
    slug: "oman",
    name: "Oman",
    routes: [
      "Employment visa",
      "Labour clearance (obtained by the employer)",
      "Resident card",
    ],
    audience: ["skilled", "semi-skilled", "professional"],
    audienceNote: "Used for logistics, engineering, hospitality and technical trades. Some occupations are reserved for Omani nationals, so check that the role is open to expatriates.",
    documents: [
      "Passport with the validity required by the Omani authorities",
      "Passport-size photographs",
      "Signed employment contract or written offer",
      "Educational or trade certificates, attested where required",
      "Medical report from an approved medical centre",
      "Copy of the employer’s labour clearance",
    ],
    steps: [
      "The employer obtains labour clearance for the specific profession.",
      "The employer applies for the employment visa.",
      "You complete the medical examination at an approved centre in India.",
      "ECR passport holders complete emigration clearance, where it applies.",
      "You travel on the employment visa.",
      "After arrival, you complete the medical and biometric steps for the resident card.",
    ],
    languageNote: "There is no general language test. The profession on the visa should match the job actually offered, and attested qualifications may be needed for skilled categories.",
    officialSource: "oman",
  },
  {
    slug: "kuwait",
    name: "Kuwait",
    routes: [
      "Private-sector work entry visa",
      "Work permit (Public Authority for Manpower)",
      "Residence permit (often called Article 18)",
      "Civil ID",
    ],
    audience: ["skilled", "semi-skilled", "professional"],
    audienceNote: "Used for industrial, maintenance, healthcare and service roles in the private sector.",
    documents: [
      "Passport with the validity required by the Kuwaiti authorities",
      "Passport-size photographs",
      "Copy of the employer’s work permit",
      "Educational certificates, attested where the occupation requires it",
      "Medical report from an approved medical centre",
      "Police clearance certificate (PCC)",
    ],
    steps: [
      "The employer obtains the work permit from the manpower authority.",
      "The work entry visa is issued on the basis of that permit.",
      "You complete the medical examination and police clearance in India.",
      "ECR passport holders complete emigration clearance, where it applies.",
      "You travel on the work entry visa.",
      "After arrival, you complete the medical, fingerprinting, residence and Civil ID steps.",
    ],
    languageNote: "There is no general language test. Qualification checks or attestation can apply to certain occupations, so confirm them for the specific job title.",
    officialSource: "kuwait",
  },
  {
    slug: "bahrain",
    name: "Bahrain",
    routes: [
      "Work permit (LMRA)",
      "Work visa",
      "Residence permit and identity card (CPR)",
    ],
    audience: ["skilled", "semi-skilled", "professional"],
    audienceNote: "Used for manufacturing, hospitality, construction and business-service roles with an approved employer.",
    documents: [
      "Passport with the validity required by the Bahraini authorities",
      "Passport-size photographs",
      "Signed employment contract",
      "Educational or trade certificates, where the role requires them",
      "Medical examination, before departure or after arrival as instructed",
    ],
    steps: [
      "The employer applies to the Labour Market Regulatory Authority (LMRA) for the work permit.",
      "The work visa is issued once the permit is approved.",
      "ECR passport holders complete emigration clearance, where it applies.",
      "You travel on the work visa. A visit visa is not permission to work.",
      "After arrival, you complete the medical examination and biometrics.",
      "The residence permit and identity card are issued.",
    ],
    languageNote: "There is no general language test. Regulated professions may need a licence from the relevant Bahraini authority, and workers can verify their own permit status through the LMRA.",
    officialSource: "bahrain",
  },
  {
    slug: "germany",
    name: "Germany",
    routes: [
      "Skilled Worker Visa (vocational or academic qualification)",
      "EU Blue Card",
      "Visa for the recognition of foreign qualifications",
      "Opportunity Card (job search)",
    ],
    audience: ["skilled", "professional"],
    audienceNote: "Mainly for workers with a recognised vocational qualification or university degree and a qualifying job offer.",
    documents: [
      "Passport and biometric photographs",
      "Employment contract or binding job offer",
      "Employer’s declaration of employment form",
      "Qualification certificates with the recognition notice or statement of comparability, where required",
      "Curriculum vitae",
      "Proof of German language level, where the route or profession requires it",
      "Proof of health insurance",
    ],
    steps: [
      "Check whether your qualification is recognised in Germany or needs a recognition procedure.",
      "Secure a concrete job offer or contract that matches the route.",
      "The employer may start the accelerated skilled-worker procedure, if agreed.",
      "Apply for the national visa at the German mission in India.",
      "Travel and register your address after arrival.",
      "Obtain the residence permit from the local immigration office.",
    ],
    languageNote: "Qualification recognition is central to most routes. Regulated professions such as nursing need a licence to practise and proof of German; the level depends on the profession and route.",
    officialSource: "germany",
  },
  {
    slug: "poland",
    name: "Poland",
    routes: [
      "Work permit (obtained by the employer)",
      "National visa (Type D) for work",
      "Temporary residence and work permit",
    ],
    audience: ["skilled", "semi-skilled"],
    audienceNote: "Used for manufacturing, logistics, construction and industrial trades with a named employer.",
    documents: [
      "Passport and photographs to the consular specification",
      "Original work permit issued to the employer",
      "Completed national visa application",
      "Employment contract or written offer",
      "Medical travel insurance that meets the consular requirements",
      "Proof of accommodation, where requested",
    ],
    steps: [
      "The employer applies for the work permit at the regional (voivodeship) office.",
      "The employer sends you the original permit.",
      "You book an appointment and apply for the Type D national visa in India.",
      "The consulate decides the application.",
      "You travel and sign a contract consistent with the permit.",
      "For a longer stay, you apply for a temporary residence and work permit in Poland.",
    ],
    languageNote: "There is no general language test, but ask which language is used for instructions and safety training. A Polish permit does not allow work elsewhere in the EU.",
    officialSource: "poland",
  },
  {
    slug: "portugal",
    name: "Portugal",
    routes: [
      "Residence visa for employed work (often called D1)",
      "Temporary-stay visa for seasonal work",
      "Residence visa for highly qualified activity (often called D3)",
    ],
    audience: ["skilled", "semi-skilled", "professional"],
    audienceNote: "Used for agriculture, hospitality, construction and engineering roles with a Portuguese employer.",
    documents: [
      "Passport and photographs",
      "Employment contract or promise of contract",
      "Criminal record certificate (PCC), legalised as instructed",
      "Proof of accommodation",
      "Travel medical insurance",
      "Proof of means of subsistence, where requested",
    ],
    steps: [
      "Obtain a signed employment contract or promise of contract.",
      "Apply for the visa through the Portuguese consulate or its visa centre in India.",
      "The consular and immigration authorities decide the application.",
      "Travel to Portugal on the visa.",
      "Attend the residence permit appointment with the immigration agency (AIMA).",
    ],
    languageNote: "Ask which language is used at the workplace. Regulated professions need their qualification recognised in Portugal.",
    officialSource: "portugal",
  },
  {
    slug: "czech-republic",
    name: "Czech Republic",
    routes: [
      "Employee Card",
      "EU Blue Card",
      "Long-stay visa for seasonal employment",
    ],
    audience: ["skilled", "semi-skilled", "professional"],
    audienceNote: "The Employee Card is the usual route for manufacturing, automotive, CNC and warehouse roles. The EU Blue Card is for highly qualified jobs.",
    documents: [
      "Passport and photographs",
      "Employment contract or agreement on a future contract",
      "Proof of accommodation",
      "Qualification documents, with recognition (nostrification) where required",
      "Criminal record certificate (PCC), legalised as instructed",
    ],
    steps: [
      "The employer registers the vacancy in the official register of jobs open to Employee Card holders.",
      "You sign the employment contract or an agreement on a future contract.",
      "You apply in person at the Czech embassy. Appointment availability can be limited.",
      "The Ministry of the Interior decides the application.",
      "You travel on the entry visa and provide biometrics.",
      "You collect the Employee Card in the Czech Republic.",
    ],
    languageNote: "There is no general language test. Regulated professions need recognised qualifications, and the job must match the one registered for the card.",
    officialSource: "czech",
  },
  {
    slug: "romania",
    name: "Romania",
    routes: [
      "Work authorisation (aviz de muncă)",
      "Long-stay visa for employment (D/AM)",
      "Single permit (residence and work)",
    ],
    audience: ["skilled", "semi-skilled"],
    audienceNote: "Used for construction, hospitality, production and logistics roles with a sponsoring employer.",
    documents: [
      "Passport and photographs",
      "Copy of the work authorisation obtained by the employer",
      "Criminal record certificate (PCC)",
      "Medical insurance for the visa period",
      "Proof of accommodation",
      "Proof of means of subsistence, where requested",
    ],
    steps: [
      "The employer obtains the work authorisation from the immigration inspectorate.",
      "You apply for the long-stay employment visa through the official e-visa portal and the Romanian mission.",
      "The authorities decide the application.",
      "You travel to Romania on the visa.",
      "Before the visa expires, you apply for the single permit.",
    ],
    languageNote: "There is no general language test. Ask which language is used for workplace instructions and the contract.",
    officialSource: "romania",
  },
  {
    slug: "japan",
    name: "Japan",
    routes: [
      "Specified Skilled Worker (SSW) (i) and (ii)",
      "Engineer / Specialist in Humanities / International Services",
      "Technical Intern Training Program (TITP)",
    ],
    audience: ["skilled", "semi-skilled", "professional"],
    audienceNote: "SSW covers designated fields such as manufacturing, food service and caregiving. The Engineer/Specialist status is for degree-level or experienced professionals.",
    documents: [
      "Passport and photographs",
      "Certificate of Eligibility (CoE)",
      "Employment contract with the accepting organisation",
      "Skills test and Japanese-language test certificates (SSW)",
      "Degree certificate or proof of experience (Engineer/Specialist)",
      "Curriculum vitae",
    ],
    steps: [
      "Pass the skills and Japanese-language tests for your field, or meet the degree and experience criteria.",
      "Sign a contract with the accepting organisation.",
      "The employer applies for the Certificate of Eligibility in Japan.",
      "You apply for the visa with the CoE through the Japanese mission in India.",
      "You travel and receive your residence card.",
      "SSW (i) workers receive the support plan arranged by the employer.",
    ],
    languageNote: "SSW generally requires a Japanese-language test and a field-specific skills test, with exemptions in defined cases. Requirements differ by field, so check the official field guidance.",
    officialSource: "japan",
  },
  {
    slug: "israel",
    name: "Israel",
    routes: [
      "B/1 work visa",
      "Sector-specific recruitment arrangements",
    ],
    audience: ["skilled", "semi-skilled"],
    audienceNote: "Used for caregiving, construction and agriculture. Each sector has its own procedure, and some recruitment runs through government-level arrangements.",
    documents: [
      "Passport and photographs",
      "Employer’s prior approval from the Population and Immigration Authority",
      "Medical certificate from an approved clinic",
      "Police clearance certificate (PCC)",
      "Completed work visa application",
    ],
    steps: [
      "The employer obtains prior approval for foreign employment in Israel.",
      "You complete any interview or skills test required for the sector.",
      "You apply for the B/1 visa with medical and police clearance documents.",
      "The authorities decide the application.",
      "You travel, and the visa is extended or registered in Israel as instructed.",
    ],
    languageNote: "Skills tests apply in some sectors. Ask how instructions and the contract will be explained in a language you understand.",
    officialSource: "israel",
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    routes: [
      "Skilled Worker visa",
      "Health and Care Worker visa",
    ],
    audience: ["skilled", "professional"],
    audienceNote: "For eligible occupations with a licensed sponsor. New overseas recruitment for care worker roles has closed, so check the current eligible-occupation rules.",
    documents: [
      "Passport",
      "Certificate of Sponsorship (CoS) reference number",
      "Proof of English-language ability",
      "Tuberculosis test certificate from an approved clinic",
      "Criminal record certificate for certain occupations",
      "Proof of funds, unless the sponsor certifies maintenance",
      "Professional registration, where the occupation is regulated",
    ],
    steps: [
      "Receive a job offer from a Home Office-licensed sponsor.",
      "The sponsor assigns a Certificate of Sponsorship.",
      "Apply online on GOV.UK and pay the applicable fees.",
      "Provide biometrics at a visa application centre.",
      "UK Visas and Immigration decides the application.",
      "Travel and access your eVisa record.",
    ],
    languageNote: "English must be proven at the level set for the route. Regulated professions need registration with the UK regulator (for example the NMC for nurses).",
    officialSource: "uk",
  },
  {
    slug: "russia",
    name: "Russia",
    routes: [
      "Work visa (on an employer’s invitation)",
      "Work permit",
      "Highly Qualified Specialist (HQS) work permit",
    ],
    audience: ["skilled", "semi-skilled", "professional"],
    audienceNote: "Used for construction, manufacturing, welding, hospitality and technical trades with an inviting employer.",
    documents: [
      "Passport and photographs",
      "Official invitation arranged by the employer",
      "Completed work visa application",
      "HIV test certificate",
      "Educational or trade certificates, translated where required",
    ],
    steps: [
      "The employer obtains permission to hire foreign workers and applies for your work permit.",
      "An official work invitation is issued.",
      "You apply for the work visa through the Russian consulate or visa centre in India.",
      "You travel and complete migration registration.",
      "You complete the medical examination and fingerprinting within the set period.",
      "The visa is extended to cover the work permit.",
    ],
    languageNote: "A Russian language, history and law test can apply to standard work permits, with exemptions for some categories. Check the current rules for your permit type.",
    officialSource: "russia",
  },
];

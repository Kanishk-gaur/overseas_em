import { serviceImages } from "./photography";
import { images } from "@/config/site";
import { l } from "./types";
const coreServices = [
  { slug: "overseas-recruitment", title: l("Overseas Manpower Recruitment", "विदेशी रोजगार के लिए भर्ती"), short: l("Connecting ambition with opportunity across borders.", "आपकी मेहनत को विदेश की संभावनाओं से जोड़ना।"), description: l("Recruitment coordination that starts with understanding people. We help candidates and international employers discuss roles, requirements and the steps towards working together.", "लोगों को समझने से शुरू होने वाली भर्ती। हम उम्मीदवारों और विदेशी नियोक्ताओं को भूमिका, ज़रूरतें और आगे की प्रक्रिया समझने में मदद करते हैं।"), examples: l("Cross-industry sourcing · Employer coordination · Candidate guidance", "कई उद्योगों में भर्ती · नियोक्ता से समन्वय · उम्मीदवार मार्गदर्शन"), image: images.construction },
  { slug: "skilled-recruitment", title: l("Skilled & Technical Recruitment", "कुशल और तकनीकी भर्ती"), short: l("Practical expertise. International possibilities.", "व्यावहारिक हुनर। अंतरराष्ट्रीय संभावनाएँ।"), description: l("Role-focused sourcing for experienced tradespeople, supported by coordination of skill assessments and employer interviews. Qualifications and experience requirements vary by role.", "अनुभवी कारीगरों के लिए भूमिका के अनुसार भर्ती और कौशल परीक्षण तथा इंटरव्यू के समन्वय में मदद। योग्यता और अनुभव की शर्तें काम के अनुसार बदलती हैं।"), examples: l("Electricians · Welders · Plumbers · Carpenters", "इलेक्ट्रीशियन · वेल्डर · प्लंबर · बढ़ई"), image: images.technical },
  { slug: "semi-skilled-workforce", title: l("General & Semi-Skilled Workforce", "सामान्य और अर्ध-कुशल कामगार"), short: l("Recognising the value in every kind of work.", "हर तरह के काम की अहमियत को समझना।"), description: l("Support for candidates with practical workplace skills and those exploring entry-level roles. We clarify duties, working conditions and the training or experience an employer may require.", "व्यावहारिक कौशल वाले और शुरुआती भूमिकाएँ खोज रहे उम्मीदवारों के लिए सहयोग। हम काम की ज़िम्मेदारियाँ, काम की शर्तें और ज़रूरी अनुभव समझने में मदद करते हैं।"), examples: l("Warehouse staff · Factory assistants · Housekeeping · General workers", "वेयरहाउस कर्मचारी · फैक्ट्री सहायक · हाउसकीपिंग · सामान्य कामगार"), image: images.manufacturing },
  { slug: "employer-staffing", title: l("International Employer Staffing", "विदेशी नियोक्ताओं के लिए भर्ती"), short: l("Indian talent for your workforce requirements.", "आपकी भर्ती ज़रूरतों के लिए भारतीय प्रतिभा।"), description: l("An organised approach to workforce sourcing, candidate screening coordination and interview scheduling, shaped around your sector, role specifications and hiring timelines.", "आपके उद्योग, भूमिका की शर्तों और समय के अनुसार उम्मीदवार खोजने, स्क्रीनिंग और इंटरव्यू के समन्वय की व्यवस्थित प्रक्रिया।"), examples: l("Workforce planning · Candidate shortlisting · Interview coordination", "भर्ती योजना · उम्मीदवारों का चयन · इंटरव्यू समन्वय"), image: images.logistics },
  { slug: "technical-solutions", title: l("Technical Workforce Solutions", "तकनीकी कामगार समाधान"), short: l("Specialist roles call for considered recruitment.", "विशेषज्ञ भूमिकाओं के लिए सोच-समझकर भर्ती।"), description: l("Coordination for technical and engineering roles with attention to equipment experience, role-specific certifications and the employer’s evaluation process.", "उपकरणों के अनुभव, भूमिका के प्रमाणपत्र और नियोक्ता के मूल्यांकन पर ध्यान देते हुए तकनीकी तथा इंजीनियरिंग भर्ती में समन्वय।"), examples: l("Engineers · CNC operators · Maintenance technicians · IT professionals", "इंजीनियर · CNC ऑपरेटर · रखरखाव तकनीशियन · IT पेशेवर"), image: images.professional },
  { slug: "general-workforce", title: l("General Workforce Recruitment", "सामान्य कामगारों की भर्ती"), short: l("Helping essential teams come together.", "ज़रूरी काम करने वाली टीमों को जोड़ना।"), description: l("Recruitment support for essential operational roles across facilities, hospitality, agriculture and industrial settings, with clear explanations of each employer’s expectations.", "फैसिलिटी, होटल, कृषि और औद्योगिक क्षेत्रों की ज़रूरी भूमिकाओं में भर्ती सहयोग और नियोक्ता की अपेक्षाओं की स्पष्ट जानकारी।"), examples: l("Facilities teams · Kitchen assistants · Farm workers · Production support", "फैसिलिटी टीम · रसोई सहायक · कृषि कामगार · उत्पादन सहायक"), image: images.hospitality },
  { slug: "candidate-guidance", title: l("Candidate & Documentation Guidance", "उम्मीदवार और दस्तावेज़ मार्गदर्शन"), short: l("Clarity at every important step.", "हर ज़रूरी कदम पर स्पष्ट जानकारी।"), description: l("Understand typical document requirements, interview preparation and the questions to ask before accepting an offer. Any visa or travel coordination is subject to applicable requirements and official decisions.", "ज़रूरी दस्तावेज़, इंटरव्यू की तैयारी और प्रस्ताव स्वीकार करने से पहले पूछने वाले सवाल समझें। वीज़ा और यात्रा संबंधी सहयोग लागू नियमों और आधिकारिक निर्णयों पर निर्भर है।"), examples: l("Document checklists · Interview preparation · Contract awareness", "दस्तावेज़ सूची · इंटरव्यू तैयारी · अनुबंध की जानकारी"), image: images.about },
];

// Preserve the premium site’s service anchors while importing the original service scope.
const importedServices = [
  {
    "slug": "sourcing",
    "title": {
      "en": "Workforce Sourcing & Screening",
      "hi": "कामगारों की खोज और स्क्रीनिंग"
    },
    "short": {
      "en": "The right people, matched to a clear brief.",
      "hi": "स्पष्ट ज़रूरत के अनुसार उपयुक्त लोग।"
    },
    "description": {
      "en": "Sourcing and screening against the agreed trade, experience and headcount brief, followed by an employer review of suitable profiles.",
      "hi": "आपकी भूमिका, अनुभव और कर्मचारियों की संख्या के अनुसार कुशल तथा अर्ध-कुशल कामगार खोजे और चुने जाते हैं।"
    },
    "examples": {
      "en": "Job order intake and role/qualification mapping · Role-focused candidate sourcing · Shortlist delivered against your headcount and timeline",
      "hi": "भूमिका और योग्यता की पहचान · उम्मीदवार खोज · समय और संख्या के अनुसार चयन"
    },
    "image": "/images/construction.webp"
  },
  {
    "slug": "compliance",
    "title": {
      "en": "Visa Sponsorship & Compliance",
      "hi": "वीज़ा और दस्तावेज़ सहयोग"
    },
    "short": {
      "en": "Clear documentation at every step.",
      "hi": "हर कदम पर स्पष्ट दस्तावेज़।"
    },
    "description": {
      "en": "Coordination of role-specific work-permit, sponsorship and recruitment documents within the agreed scope. The relevant authorities decide immigration approval.",
      "hi": "कार्य अनुमति, वीज़ा प्रायोजन और भर्ती दस्तावेज़ों के समन्वय में सहयोग। योग्यता की मान्यता, स्वास्थ्य जाँच और पुलिस सत्यापन की ज़रूरतें संबंधित देश के अनुसार तय होती हैं।"
    },
    "examples": {
      "en": "Work permit and visa sponsorship filing · Qualification recognition support (where required) · Medical fitness and police clearance coordination",
      "hi": "कार्य अनुमति और प्रायोजन दस्तावेज़ · योग्यता मान्यता · स्वास्थ्य और पुलिस जाँच"
    },
    "image": "/images/professional.webp"
  },
  {
    "slug": "readiness",
    "title": {
      "en": "Workforce Readiness Training",
      "hi": "विदेशी काम की तैयारी और प्रशिक्षण"
    },
    "short": {
      "en": "Preparation for a confident first day.",
      "hi": "पहले दिन के लिए आत्मविश्वास से तैयारी।"
    },
    "description": {
      "en": "Pre-deployment orientation, basic language training, and cultural readiness sessions so your workforce is productive from day one.",
      "hi": "यात्रा से पहले भाषा की बुनियादी तैयारी, कार्यस्थल की संस्कृति, सुरक्षा और भूमिका की अपेक्षाओं पर मार्गदर्शन।"
    },
    "examples": {
      "en": "Basic language training for the destination country · Workplace culture and safety orientation · Role-specific readiness briefing before travel",
      "hi": "देश की भाषा की बुनियादी तैयारी · संस्कृति और सुरक्षा · भूमिका की जानकारी"
    },
    "image": "/images/technical.webp"
  },
  {
    "slug": "quality",
    "title": {
      "en": "Quality & Background Verification",
      "hi": "कौशल और पृष्ठभूमि सत्यापन"
    },
    "short": {
      "en": "Practical ability. Carefully assessed.",
      "hi": "व्यावहारिक क्षमता का ध्यान से मूल्यांकन।"
    },
    "description": {
      "en": "Every candidate is background-checked, skill-tested, and verified before being shortlisted for your job order.",
      "hi": "चयन से पहले पहचान, दस्तावेज़, ट्रेड प्रमाणपत्र या डिग्री की जाँच और व्यावहारिक कौशल अथवा तकनीकी मूल्यांकन।"
    },
    "examples": {
      "en": "Identity and document verification · Trade certification or degree/diploma verification · Hands-on skill test or technical assessment",
      "hi": "पहचान और दस्तावेज़ जाँच · प्रमाणपत्र सत्यापन · कौशल और तकनीकी परीक्षण"
    },
    "image": "/images/manufacturing.webp"
  },
  {
    "slug": "deployment",
    "title": {
      "en": "Bulk Deployment & Logistics",
      "hi": "समूह तैनाती और यात्रा समन्वय"
    },
    "short": {
      "en": "Coordinated journeys. Considered handovers.",
      "hi": "व्यवस्थित यात्रा और काम की शुरुआत।"
    },
    "description": {
      "en": "Ticketing, travel coordination, and on-site handover — built to support both single-role hires and bulk workforce orders.",
      "hi": "एकल भर्ती या बड़ी टीम के लिए टिकट, यात्रा, चरणबद्ध तैनाती और नियोक्ता को औपचारिक हैंडओवर का समन्वय।"
    },
    "examples": {
      "en": "Group or individual travel and ticketing · Phased deployment scheduling for bulk orders · Formal on-site or employer handover",
      "hi": "व्यक्तिगत या समूह यात्रा · चरणबद्ध तैनाती योजना · नियोक्ता को हैंडओवर"
    },
    "image": "/images/logistics.webp"
  },
  {
    "slug": "support",
    "title": {
      "en": "Account Management & Agreed Support",
      "hi": "समर्पित संपर्क और प्रतिस्थापन सहयोग"
    },
    "short": {
      "en": "Support beyond the first placement.",
      "hi": "नियुक्ति के बाद भी सहयोग।"
    },
    "description": {
      "en": "A point of contact for agreed recruitment coordination and follow-up. Any replacement support, eligibility and time limits must be defined in the written service agreement.",
      "hi": "भर्ती के दौरान एक संपर्क व्यक्ति, तैनाती के बाद सहयोग और शिकायत समाधान। प्रतिस्थापन की पात्रता और अवधि सेवा समझौते के अनुसार होती है।"
    },
    "examples": {
      "en": "Single point-of-contact account manager · Post-deployment check-ins and grievance handling · Replacement support as agreed in writing",
      "hi": "समर्पित संपर्क व्यक्ति · तैनाती के बाद सहयोग · समझौते के अनुसार प्रतिस्थापन"
    },
    "image": "/images/hospitality.webp"
  }
];
const serviceMapping: Record<string, string> = {"overseas-recruitment":"sourcing","skilled-recruitment":"quality","candidate-guidance":"compliance"};
export const services = [
  ...coreServices.map(service => {
    const imported = importedServices.find(item => item.slug === serviceMapping[service.slug]);
    return imported ? { ...service, description: imported.description, examples: imported.examples } : service;
  }),
  ...importedServices.filter(service => ["readiness", "deployment", "support"].includes(service.slug)),
].map(service => ({ ...service, image: serviceImages[service.slug] || service.image }));

export const serviceAliases: Record<string, string> = { sourcing: "overseas-recruitment", quality: "skilled-recruitment", compliance: "candidate-guidance" };

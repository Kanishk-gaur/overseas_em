// Reviewed editorial scenes. Descriptions and focal points follow the image, not its card title.
const editorial = (name: string) => `/images/recruitment/editorial/${name}.webp`;
const generated = (name: string) => `/images/recruitment/generated/${name}.webp`;
export const photography = {
  consultation: editorial("consultation"), workforce: editorial("workforce"), documents: editorial("documents"),
  welder: editorial("welder"), nurse: editorial("nurse"), electrician: editorial("electrician"), chef: editorial("chef"),
  forklift: editorial("forklift"), construction: editorial("construction"), requirements: editorial("requirements"),
  screening: editorial("screening"), assessment: editorial("assessment"), verification: editorial("verification"),
  orientation: editorial("orientation"), departure: editorial("departure"), support: editorial("support"),
  engineering: editorial("engineering"), trades: editorial("trades"), team: editorial("team"),
  manufacturing: editorial("manufacturing"), caregiver: editorial("caregiver"), hospitality: editorial("hospitality"),
  facilities: editorial("facilities"), siteEngineer: editorial("siteEngineer"), software: editorial("software"),
  warehouse: editorial("warehouse"), machine: editorial("machine"),
  driver: generated("driver"), security: generated("security"), agriculture: generated("agriculture"),
  foodProcessing: generated("food-processing"), retail: generated("retail"),
};
type ImageDescription = { en: string; hi: string; position: string };
const describe = (en: string, hi: string, position = "50% 50%"): ImageDescription => ({ en, hi, position });
export const imageDescriptions: Record<string, ImageDescription> = {
  [photography.foodProcessing]: describe("Food-production staff in hairnets and gloves checking sealed packs on a conveyor", "हेयरनेट और दस्ताने पहने खाद्य उत्पादन कर्मचारी कन्वेयर पर बंद पैकेट जाँचते हुए", "50% 40%"),
  [photography.retail]: describe("A retail assistant scanning a product while a colleague organises shelves", "उत्पाद स्कैन करती रिटेल सहायक और शेल्फ व्यवस्थित करता सहकर्मी", "50% 40%"),
  [photography.consultation]: describe("A recruiter discussing experience with a candidate", "उम्मीदवार के अनुभव पर बात करता भर्ती सलाहकार", "50% 35%"),
  [photography.workforce]: describe("Indian professionals representing healthcare, construction and skilled trades", "स्वास्थ्य, निर्माण और कुशल काम के भारतीय पेशेवर", "50% 32%"),
  [photography.documents]: describe("A passport and documents being reviewed at a desk", "मेज़ पर पासपोर्ट और दस्तावेज़ों की जाँच"),
  [photography.welder]: describe("A welder wearing a protective helmet and gloves at work", "सुरक्षा हेलमेट और दस्ताने पहने वेल्डर"),
  [photography.nurse]: describe("A nurse in blue scrubs in a healthcare setting", "स्वास्थ्य केंद्र में नीली वर्दी में नर्स", "50% 27%"),
  [photography.electrician]: describe("An electrician in safety equipment inspecting an electrical panel", "सुरक्षा उपकरण पहने विद्युत पैनल की जाँच करता इलेक्ट्रीशियन", "53% 40%"),
  [photography.chef]: describe("A chef preparing a dish in a professional kitchen", "पेशेवर रसोई में व्यंजन तैयार करता शेफ", "50% 38%"),
  [photography.forklift]: describe("A forklift operator moving a pallet in a warehouse", "वेयरहाउस में पैलेट ले जाता फोर्कलिफ्ट ऑपरेटर"),
  [photography.construction]: describe("Construction workers in protective equipment on a building site", "निर्माण स्थल पर सुरक्षा उपकरण पहने कामगार"),
  [photography.requirements]: describe("A recruitment coordinator recording workforce requirements", "भर्ती की ज़रूरतें लिखती समन्वयक"),
  [photography.screening]: describe("Recruiters reviewing candidate records together", "उम्मीदवारों की जानकारी देखते भर्ती सलाहकार"),
  [photography.assessment]: describe("A supervised welding skills assessment", "निगरानी में वेल्डिंग कौशल की जाँच"),
  [photography.verification]: describe("A coordinator reviewing recruitment paperwork", "भर्ती दस्तावेज़ों की जाँच करता समन्वयक"),
  [photography.orientation]: describe("An instructor leading a classroom orientation", "कक्षा में तैयारी सत्र चलाता प्रशिक्षक"),
  [photography.departure]: describe("A group of travellers with luggage at an airport", "हवाई अड्डे पर सामान के साथ यात्रियों का समूह"),
  [photography.support]: describe("An account coordinator meeting a site supervisor", "साइट सुपरवाइज़र से मिलता समन्वयक"),
  [photography.engineering]: describe("Two engineers reviewing equipment at a manufacturing plant", "उत्पादन संयंत्र में उपकरण की जाँच करते दो इंजीनियर"),
  [photography.trades]: describe("A welder and an electrician working with protective equipment", "सुरक्षा उपकरणों के साथ काम करते वेल्डर और इलेक्ट्रीशियन"),
  [photography.team]: describe("Workers in protective clothing walking through an industrial site", "औद्योगिक स्थल पर सुरक्षा कपड़ों में कामगार"),
  [photography.manufacturing]: describe("Machine operators working at a row of production machines", "उत्पादन मशीनों पर काम करते ऑपरेटर"),
  [photography.caregiver]: describe("A caregiver supporting an older adult on a garden walk", "बगीचे में बुज़ुर्ग को सहारा देती देखभाल कर्मी"),
  [photography.hospitality]: describe("Hotel staff welcoming guests at reception", "रिसेप्शन पर मेहमानों का स्वागत करते होटल कर्मचारी"),
  [photography.facilities]: describe("Maintenance technicians inspecting an outdoor HVAC unit", "HVAC उपकरण की जाँच करते रखरखाव तकनीशियन"),
  [photography.siteEngineer]: describe("Site engineers in hard hats reviewing construction drawings", "हेलमेट पहने निर्माण के नक्शे देखते साइट इंजीनियर"),
  [photography.software]: describe("Software professionals working at computers in an office", "कार्यालय में कंप्यूटर पर काम करते सॉफ़्टवेयर पेशेवर"),
  [photography.warehouse]: describe("Warehouse workers packing and checking orders", "ऑर्डर जाँचते और पैक करते वेयरहाउस कामगार"),
  [photography.machine]: describe("A technician setting up a precision machining tool", "सटीक मशीन उपकरण की तैयारी करता तकनीशियन"),
  [photography.driver]: describe("A seat-belted driver in the cab of a parked delivery truck", "खड़े ट्रक के केबिन में सीट बेल्ट पहने ड्राइवर", "43% 45%"),
  [photography.security]: describe("A civilian security officer checking a visitor register", "आगंतुक रजिस्टर की जाँच करता सुरक्षा कर्मचारी", "52% 42%"),
  [photography.agriculture]: describe("Agricultural workers harvesting tomatoes in a greenhouse", "ग्रीनहाउस में टमाटर तोड़ते कृषि कामगार", "46% 50%"),
};
export const roleImages: Record<string, string> = {
  Welder: photography.welder, Electrician: photography.electrician, "Construction Worker": photography.construction,
  "Site Engineer": photography.siteEngineer, "Mechanical Engineer": photography.engineering,
  "Machine Operator": photography.machine, "Factory Worker": photography.manufacturing, "CNC Technician": photography.machine,
  Caregiver: photography.caregiver, Nurse: photography.nurse, "Hospitality Staff": photography.hospitality,
  "IT Support Engineer": photography.software, "Software Developer": photography.software,
  "MEP Technician": photography.facilities, "Security Guard": photography.security, Driver: photography.driver,
  "Warehouse Worker": photography.warehouse, "Agriculture Worker": photography.agriculture,
};
export const serviceImages: Record<string, string> = {
  "overseas-recruitment": photography.screening, "skilled-recruitment": photography.assessment,
  "technical-solutions": photography.engineering, "employer-staffing": photography.requirements, "semi-skilled-workforce": photography.warehouse,
  "professional-recruitment": photography.software, "general-workforce": photography.workforce,
  "candidate-guidance": photography.documents, readiness: photography.orientation,
  deployment: photography.departure, support: photography.support,
};

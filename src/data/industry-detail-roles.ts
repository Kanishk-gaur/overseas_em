import { industries } from "./industries";
import { industryRoleAdditions } from "./industry-role-additions";
import { l, type Localized } from "./types";

// Detail-page examples supplement the existing directory without implying availability.
export const industryDetailRoleAdditions: Record<string, Localized[]> = {
  construction: [
    l("Construction managers", "निर्माण प्रबंधक"),
    l("Structural engineers", "स्ट्रक्चरल इंजीनियर"),
    l("Bulldozer operators", "बुलडोज़र ऑपरेटर"),
    l("Concrete pump operators", "कंक्रीट पंप ऑपरेटर"),
    l("Construction estimators", "निर्माण लागत आकलनकर्ता"),
    l("Shuttering carpenters", "शटरिंग बढ़ई"),
  ],
  manufacturing: [
    l("Production engineers", "उत्पादन इंजीनियर"),
    l("Quality engineers", "गुणवत्ता इंजीनियर"),
    l("Forklift operators", "फोर्कलिफ्ट ऑपरेटर"),
    l("CNC programmers", "CNC प्रोग्रामर"),
    l("Production planners", "उत्पादन योजनाकार"),
    l("Industrial painters", "औद्योगिक पेंटर"),
    l("Packaging machine operators", "पैकेजिंग मशीन ऑपरेटर"),
  ],
  "electrical-mechanical": [
    l("Automation technicians", "ऑटोमेशन तकनीशियन"),
    l("Electrical estimators", "विद्युत कार्य लागत आकलनकर्ता"),
    l("Motor rewinders", "मोटर रीवाइंडिंग तकनीशियन"),
    l("Boiler operators", "बॉयलर ऑपरेटर"),
    l("Lift technicians", "लिफ्ट तकनीशियन"),
    l("Field service engineers", "फील्ड सर्विस इंजीनियर"),
    l("Pipe welders", "पाइप वेल्डर"),
  ],
  logistics: [
    l("Warehouse managers", "वेयरहाउस प्रबंधक"),
    l("Logistics coordinators", "लॉजिस्टिक्स समन्वयक"),
    l("Customs documentation clerks", "सीमा शुल्क दस्तावेज़ कर्मचारी"),
    l("Freight forwarding agents", "माल ढुलाई समन्वय एजेंट"),
    l("Transport planners", "परिवहन योजनाकार"),
    l("Warehouse safety officers", "वेयरहाउस सुरक्षा अधिकारी"),
    l("Packaging machine operators", "पैकेजिंग मशीन ऑपरेटर"),
  ],
  transportation: [
    l("Heavy equipment transport drivers", "भारी उपकरण परिवहन ड्राइवर"),
    l("Vehicle inspectors", "वाहन निरीक्षक"),
    l("Automotive electricians", "ऑटोमोबाइल इलेक्ट्रीशियन"),
    l("Diesel mechanics", "डीज़ल मैकेनिक"),
    l("Transport managers", "परिवहन प्रबंधक"),
    l("Passenger transport coordinators", "यात्री परिवहन समन्वयक"),
    l("Vehicle recovery operators", "वाहन रिकवरी ऑपरेटर"),
  ],
  hospitality: [
    l("Baristas", "बरिस्ता"),
    l("Bartenders", "बारटेंडर"),
    l("Concierges", "होटल अतिथि सहायता कर्मचारी"),
    l("Porters", "सामान परिचारक"),
    l("Stewards", "रसोई स्वच्छता सहायक"),
    l("Pastry chefs", "पेस्ट्री शेफ"),
    l("Food and beverage managers", "खाद्य और पेय प्रबंधक"),
  ],
  healthcare: [
    l("Registered midwives", "पंजीकृत दाइयाँ"),
    l("Operating theatre technicians", "ऑपरेशन थिएटर तकनीशियन"),
    l("Respiratory therapists", "श्वसन थेरेपिस्ट"),
    l("Sterile processing technicians", "चिकित्सा उपकरण निर्जीवीकरण तकनीशियन"),
    l("Healthcare cleaners", "स्वास्थ्य संस्थान सफाई कर्मचारी"),
    l("Clinical engineers", "क्लिनिकल इंजीनियर"),
    l("Medical receptionists", "चिकित्सा रिसेप्शनिस्ट"),
  ],
  agriculture: [
    l("Agronomists", "कृषि वैज्ञानिक"),
    l("Agricultural engineers", "कृषि इंजीनियर"),
    l("Seed processing operators", "बीज प्रसंस्करण ऑपरेटर"),
    l("Tractor mechanics", "ट्रैक्टर मैकेनिक"),
    l("Produce packing workers", "कृषि उपज पैकिंग कर्मचारी"),
    l("Beekeepers", "मधुमक्खी पालक"),
    l("Aquaculture workers", "जलीय जीव पालन कामगार"),
  ],
  energy: [
    l("Petroleum engineers", "पेट्रोलियम इंजीनियर"),
    l("Process engineers", "प्रक्रिया इंजीनियर"),
    l("Drilling technicians", "ड्रिलिंग तकनीशियन"),
    l("Solar installation technicians", "सौर उपकरण स्थापना तकनीशियन"),
    l("Wind turbine technicians", "पवन टरबाइन तकनीशियन"),
    l("Power plant operators", "विद्युत संयंत्र ऑपरेटर"),
    l("Pipeline inspectors", "पाइपलाइन निरीक्षक"),
  ],
  facilities: [
    l("Facilities managers", "सुविधा प्रबंधक"),
    l("Building caretakers", "भवन देखरेख कर्मचारी"),
    l("Carpet cleaning technicians", "कालीन सफाई तकनीशियन"),
    l("Window cleaners", "खिड़की सफाई कर्मचारी"),
    l("Swimming pool technicians", "स्विमिंग पूल तकनीशियन"),
    l("Energy management technicians", "ऊर्जा प्रबंधन तकनीशियन"),
    l("Helpdesk coordinators", "हेल्पडेस्क समन्वयक"),
  ],
  "it-professional": [
    l("Cloud engineers", "क्लाउड इंजीनियर"),
    l("DevOps engineers", "DevOps इंजीनियर"),
    l("UX designers", "UX डिज़ाइनर"),
    l("Business analysts", "व्यवसाय विश्लेषक"),
    l("HR coordinators", "मानव संसाधन समन्वयक"),
    l("Finance assistants", "वित्त सहायक"),
    l("Technical writers", "तकनीकी लेखक"),
  ],
  engineering: [
    l("Process engineers", "प्रक्रिया इंजीनियर"),
    l("Environmental engineers", "पर्यावरण इंजीनियर"),
    l("Geotechnical engineers", "भू-तकनीकी इंजीनियर"),
    l("Instrumentation engineers", "इंस्ट्रूमेंटेशन इंजीनियर"),
    l("Project engineers", "परियोजना इंजीनियर"),
    l("BIM coordinators", "BIM समन्वयक"),
    l("Engineering technicians", "इंजीनियरिंग तकनीशियन"),
  ],
  "food-processing": [
    l("Meat processing workers", "मांस प्रसंस्करण कामगार"),
    l("Seafood processing workers", "समुद्री खाद्य प्रसंस्करण कामगार"),
    l("Confectionery workers", "मिठाई उत्पादन कामगार"),
    l("Food technologists", "खाद्य प्रौद्योगिकी विशेषज्ञ"),
    l("Food production planners", "खाद्य उत्पादन योजनाकार"),
    l("Maintenance technicians", "रखरखाव तकनीशियन"),
    l("Forklift operators", "फोर्कलिफ्ट ऑपरेटर"),
  ],
  "retail-sales": [
    l("Store managers", "स्टोर प्रबंधक"),
    l("Sales supervisors", "बिक्री सुपरवाइज़र"),
    l("Product demonstrators", "उत्पाद प्रदर्शन कर्मचारी"),
    l("After-sales service coordinators", "बिक्री पश्चात सेवा समन्वयक"),
    l("Checkout supervisors", "चेकआउट सुपरवाइज़र"),
    l("Loss prevention officers", "चोरी और नुकसान रोकथाम अधिकारी"),
    l("Delivery coordinators", "डिलीवरी समन्वयक"),
  ],
};

export function getIndustryDetailRoles(slug: string): Localized[] {
  const industry = industries.find(item => item.slug === slug);
  if (!industry) return [];
  const hindi = industry.roles.hi.split(" · ");
  const original = industry.roles.en.split(" · ").map((en, index) => ({ en, hi: hindi[index] || en }));
  const roles = [...original, ...industryRoleAdditions[slug], ...industryDetailRoleAdditions[slug]];
  const seen = new Set<string>();
  return roles.filter(role => {
    const key = role.en.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

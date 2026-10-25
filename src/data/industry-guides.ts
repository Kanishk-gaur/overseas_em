import { l, type Localized } from "./types";

export const industryGroups = [
  { id: "trades", label: l("Trades & production", "ट्रेड और उत्पादन") },
  { id: "service", label: l("Service & operations", "सेवा और संचालन") },
  { id: "professional", label: l("Professional & care", "पेशेवर और देखभाल") },
];
type IndustryGuide = { group: string; workplace: Localized; skills: Localized; preparation: Localized };
export const industryGuides: Record<string, IndustryGuide> = {
  construction: {
    group: "trades",
    workplace: l("Work may involve building sites, civil projects or finishing teams. A useful brief identifies the project stage, trade, site conditions and reporting supervisor.", "काम भवन निर्माण, सिविल परियोजना या फिनिशिंग टीम में हो सकता है। परियोजना का चरण, ट्रेड, स्थल की स्थिति और सुपरवाइज़र स्पष्ट होना चाहिए।"),
    skills: l("Explain the drawings, measurements, materials and tools you have used. Describe safe working practices and a recent task you completed.", "इस्तेमाल किए नक्शे, माप, सामग्री और उपकरण बताएँ। सुरक्षित काम का तरीका और हाल में पूरा किया कार्य समझाएँ।"),
    preparation: l("Bring relevant trade records and experience details. Ask about protective equipment, work at height, transport and accommodation before accepting a role.", "ट्रेड और अनुभव के दस्तावेज़ रखें। भूमिका स्वीकार करने से पहले सुरक्षा उपकरण, ऊँचाई पर काम, परिवहन और आवास की जानकारी लें।"),
  },
  manufacturing: {
    group: "trades",
    workplace: l("Factory roles differ across assembly, machine operation, fabrication and quality checks. Shift patterns, production processes and supervision should be clear in the brief.", "फैक्ट्री की भूमिकाएँ असेंबली, मशीन संचालन, फैब्रिकेशन और गुणवत्ता जाँच में अलग होती हैं। शिफ्ट, उत्पादन प्रक्रिया और निगरानी स्पष्ट होनी चाहिए।"),
    skills: l("List the machines and materials you know, the checks you perform and how you report a fault. Distinguish operating experience from maintenance or programming skills.", "परिचित मशीनें, सामग्री, जाँच और खराबी की सूचना देने का तरीका बताएँ। संचालन, रखरखाव और प्रोग्रामिंग के अनुभव को अलग रखें।"),
    preparation: l("Confirm the actual workstation, lifting requirements, shift rotation and assessment format. Keep technical certificates and work references ready where relevant.", "वर्कस्टेशन, वजन उठाने की ज़रूरत, शिफ्ट और परीक्षण का तरीका जाँचें। संबंधित तकनीकी प्रमाणपत्र और अनुभव संदर्भ तैयार रखें।"),
  },
  "electrical-mechanical": {
    group: "trades",
    workplace: l("Installation, servicing and fault-finding can take place on sites, in workshops or in occupied buildings. Electrical, plumbing and HVAC duties need a specific scope.", "स्थापना, सर्विस और खराबी की जाँच साइट, वर्कशॉप या इस्तेमाल में आ रहे भवन में हो सकती है। इलेक्ट्रिकल, प्लंबिंग और HVAC का दायरा स्पष्ट होना चाहिए।"),
    skills: l("Describe systems you have worked on, your use of drawings and measuring instruments, and how you isolate equipment safely within your training.", "परिचित प्रणालियाँ, नक्शों और माप उपकरणों का उपयोग तथा प्रशिक्षण के अनुसार उपकरण सुरक्षित बंद करने का तरीका बताएँ।"),
    preparation: l("Ask whether local licensing or recognition is required. Confirm the practical test, tools, supervision and call-out duties before making a commitment.", "स्थानीय लाइसेंस या मान्यता की ज़रूरत पूछें। व्यावहारिक परीक्षण, उपकरण, निगरानी और आपातकालीन ड्यूटी की पुष्टि करें।"),
  },
  logistics: {
    group: "service",
    workplace: l("Warehouse teams receive, store, pick, pack and dispatch goods. Duties vary between manual handling, inventory systems and equipment operation.", "वेयरहाउस टीम माल प्राप्त, जमा, चुन, पैक और रवाना करती है। काम हाथ से माल उठाने, इन्वेंटरी सिस्टम और उपकरण संचालन के अनुसार बदलता है।"),
    skills: l("Explain order accuracy, stock checks and scanner or warehouse-system experience. Forklift operation should be discussed separately from general warehouse work.", "ऑर्डर की सटीकता, स्टॉक जाँच और स्कैनर या वेयरहाउस सिस्टम का अनुभव बताएँ। फोर्कलिफ्ट संचालन को सामान्य काम से अलग समझाएँ।"),
    preparation: l("Confirm lifting expectations, temperature conditions, shifts and any equipment certification. Ask how targets, breaks and overtime are organised.", "वजन उठाने, तापमान, शिफ्ट और उपकरण प्रमाणन की शर्तें जाँचें। लक्ष्य, ब्रेक और ओवरटाइम की व्यवस्था पूछें।"),
  },
  transportation: {
    group: "service",
    workplace: l("Driving requirements depend on vehicle class, load, route and destination rules. A licence held in India does not by itself establish permission to drive overseas.", "ड्राइविंग की शर्तें वाहन, माल, मार्ग और देश के नियमों पर निर्भर हैं। भारतीय लाइसेंस अपने आप विदेश में वाहन चलाने की अनुमति नहीं देता।"),
    skills: l("Record vehicle types, years of relevant driving, inspection routines and delivery responsibilities. Describe your approach to safe loading and journey planning.", "वाहन के प्रकार, संबंधित अनुभव, निरीक्षण और डिलीवरी ज़िम्मेदारियाँ लिखें। सुरक्षित लोडिंग और यात्रा की योजना का तरीका बताएँ।"),
    preparation: l("Confirm licence recognition, local testing, insurance, working hours and who pays any training costs. Review the exact vehicle and route before agreeing.", "लाइसेंस मान्यता, स्थानीय परीक्षण, बीमा, काम के घंटे और प्रशिक्षण खर्च की पुष्टि करें। सहमति से पहले वाहन और मार्ग समझें।"),
  },
  hospitality: {
    group: "service",
    workplace: l("Hotels, restaurants and guest services bring together kitchen, housekeeping and front-office teams. The property type and service standard shape each role.", "होटल, रेस्टोरेंट और अतिथि सेवाओं में रसोई, हाउसकीपिंग और फ्रंट ऑफिस की टीमें होती हैं। प्रतिष्ठान और सेवा स्तर के अनुसार भूमिका बदलती है।"),
    skills: l("Share the cuisines, room-service routines, cleaning standards or guest systems you know. Communication, hygiene and teamwork matter alongside practical experience.", "परिचित व्यंजन, रूम सर्विस, सफाई मानक या अतिथि सिस्टम बताएँ। व्यावहारिक अनुभव के साथ संवाद, स्वच्छता और टीमवर्क भी ज़रूरी हैं।"),
    preparation: l("Discuss split shifts, meals, uniforms, accommodation and language expectations. Chefs can prepare a concise portfolio of dishes they have personally made.", "अलग-अलग शिफ्ट, भोजन, वर्दी, आवास और भाषा की अपेक्षाएँ पूछें। शेफ अपने बनाए व्यंजनों का छोटा पोर्टफोलियो तैयार कर सकते हैं।"),
  },
  healthcare: {
    group: "professional",
    workplace: l("Nursing, allied health and care-assistant work have different responsibilities. A care role must not be presented as licensed nursing, or the other way around.", "नर्सिंग, सहयोगी स्वास्थ्य सेवा और देखभाल सहायक की ज़िम्मेदारियाँ अलग हैं। देखभाल की भूमिका को लाइसेंस प्राप्त नर्सिंग या उसका उलटा न समझें।"),
    skills: l("Describe your qualification, registration status, care setting and duties within your training. Explain patient communication, record keeping and confidentiality.", "योग्यता, पंजीकरण, देखभाल का परिवेश और प्रशिक्षण के दायरे के काम बताएँ। मरीज से संवाद, रिकॉर्ड और गोपनीयता का अनुभव समझाएँ।"),
    preparation: l("Check recognition, professional registration, language evidence and the permitted scope of work for the destination. Confirm eligibility for the specific immigration route.", "देश के अनुसार मान्यता, पेशेवर पंजीकरण, भाषा प्रमाण और काम का अनुमत दायरा जाँचें। संबंधित आव्रजन श्रेणी की पात्रता की पुष्टि करें।"),
  },
  agriculture: {
    group: "trades",
    workplace: l("Farm work may include planting, crop care, harvesting and sorting. Open-field and greenhouse environments have different routines and physical conditions.", "खेत के काम में रोपाई, फसल की देखभाल, कटाई और छँटाई शामिल हो सकती है। खुले खेत और ग्रीनहाउस की दिनचर्या और स्थितियाँ अलग होती हैं।"),
    skills: l("Describe crops, equipment and tasks you have handled. Explain safe tool use, produce handling and how you follow a supervisor’s instructions.", "परिचित फसलें, उपकरण और काम बताएँ। औज़ारों का सुरक्षित उपयोग, उपज सँभालना और निर्देशों का पालन समझाएँ।"),
    preparation: l("Ask about seasonal duration, weather exposure, lifting, transport and housing. Confirm how hours and pay are recorded before accepting the contract.", "मौसमी अवधि, मौसम में काम, वजन उठाने, परिवहन और आवास की जानकारी लें। अनुबंध से पहले घंटे और वेतन दर्ज करने का तरीका पूछें।"),
  },
  energy: {
    group: "trades",
    workplace: l("Energy and industrial projects may involve construction, shutdown maintenance or ongoing operations. Access rules and safety responsibilities depend on the site.", "ऊर्जा और औद्योगिक परियोजनाओं में निर्माण, बंदी के दौरान रखरखाव या नियमित संचालन हो सकता है। प्रवेश और सुरक्षा की शर्तें साइट पर निर्भर हैं।"),
    skills: l("Identify your welding processes, pipe-fitting experience, instrumentation or rigging competence. Explain the safety procedures you are trained to follow.", "वेल्डिंग प्रक्रिया, पाइप फिटिंग, इंस्ट्रूमेंटेशन या रिगिंग का अनुभव बताएँ। अपने प्रशिक्षण की सुरक्षा प्रक्रियाएँ समझाएँ।"),
    preparation: l("Verify trade tests, current certifications, site induction and work-location conditions. Clarify rotation, accommodation and travel arrangements in writing.", "ट्रेड परीक्षण, प्रमाणन, साइट परिचय और काम की स्थितियाँ जाँचें। रोटेशन, आवास और यात्रा की व्यवस्था लिखित में स्पष्ट करें।"),
  },
  facilities: {
    group: "service",
    workplace: l("Facilities teams support the day-to-day running of buildings. Cleaning, security and technical maintenance are distinct roles with different training needs.", "सुविधा प्रबंधन टीम भवनों का दैनिक संचालन सँभालती है। सफाई, सुरक्षा और तकनीकी रखरखाव अलग भूमिकाएँ हैं और प्रशिक्षण भी अलग है।"),
    skills: l("Describe the buildings, equipment or service areas you have supported. Give examples of checks, fault reporting and respectful interaction with occupants.", "परिचित भवन, उपकरण या सेवा क्षेत्र बताएँ। जाँच, खराबी की सूचना और लोगों से सम्मानजनक संवाद के उदाहरण दें।"),
    preparation: l("Confirm whether the role includes security duties, local training, night shifts or on-call work. Ask about PPE, supervision and travel between sites.", "सुरक्षा ड्यूटी, स्थानीय प्रशिक्षण, रात की शिफ्ट या आपातकालीन काम पूछें। सुरक्षा उपकरण, निगरानी और साइटों के बीच यात्रा की जानकारी लें।"),
  },
  "it-professional": {
    group: "professional",
    workplace: l("Professional roles range from IT support and software development to administration. The technology stack, reporting line and work location should be explicit.", "पेशेवर भूमिकाएँ IT सहयोग और सॉफ़्टवेयर विकास से प्रशासन तक हैं। तकनीक, रिपोर्टिंग और कार्यस्थल स्पष्ट होना चाहिए।"),
    skills: l("Show relevant tools, projects and responsibilities. Explain a problem you solved without sharing confidential code, credentials or employer information.", "संबंधित उपकरण, परियोजनाएँ और ज़िम्मेदारियाँ बताएँ। गोपनीय कोड, पासवर्ड या नियोक्ता की जानकारी साझा किए बिना समाधान का उदाहरण दें।"),
    preparation: l("Prepare a focused CV and public portfolio where appropriate. Confirm assessment format, working arrangements, relocation scope and qualification requirements.", "उपयुक्त बायोडाटा और जहाँ संभव हो सार्वजनिक पोर्टफोलियो बनाएँ। परीक्षण, काम की व्यवस्था, स्थानांतरण और योग्यता की शर्तें जाँचें।"),
  },
  engineering: {
    group: "professional",
    workplace: l("Engineering briefs should identify the discipline, project stage and responsibility level. Design, inspection, site coordination and commissioning need different experience.", "इंजीनियरिंग की ज़रूरत में शाखा, परियोजना का चरण और ज़िम्मेदारी का स्तर स्पष्ट हो। डिज़ाइन, निरीक्षण, साइट समन्वय और कमीशनिंग के अनुभव अलग होते हैं।"),
    skills: l("Describe technical tools, drawings, standards used in your previous work and project outcomes you can substantiate. Separate design responsibility from site support.", "तकनीकी उपकरण, नक्शे, पहले इस्तेमाल किए मानक और प्रमाणित परियोजना परिणाम बताएँ। डिज़ाइन की ज़िम्मेदारी को साइट सहयोग से अलग रखें।"),
    preparation: l("Gather degree and project records, with confidential information removed. Confirm recognition, any local registration and the employer’s technical assessment.", "गोपनीय जानकारी हटाकर डिग्री और परियोजना के दस्तावेज़ रखें। मान्यता, स्थानीय पंजीकरण और नियोक्ता के तकनीकी परीक्षण की पुष्टि करें।"),
  },
  "food-processing": {
    group: "trades",
    workplace: l("Food-production teams prepare, process, pack and check products. Hygiene rules, temperature-controlled areas and line duties vary by product and facility.", "खाद्य उत्पादन टीम तैयारी, प्रसंस्करण, पैकिंग और जाँच करती है। स्वच्छता, तापमान और उत्पादन लाइन का काम उत्पाद और फैक्ट्री पर निर्भर है।"),
    skills: l("Explain your food-handling experience, packing accuracy, cleaning routines and ability to follow traceability instructions. Mention machinery only if you have used it.", "खाद्य सामग्री सँभालने, सही पैकिंग, सफाई और रिकॉर्ड निर्देशों का अनुभव बताएँ। केवल इस्तेमाल की हुई मशीनों का ज़िक्र करें।"),
    preparation: l("Ask about hygiene training, protective clothing, shift patterns and cold-room work. Confirm health checks with the employer before arranging them.", "स्वच्छता प्रशिक्षण, सुरक्षा कपड़े, शिफ्ट और ठंडे कमरों में काम पूछें। स्वास्थ्य जाँच कराने से पहले नियोक्ता से पुष्टि करें।"),
  },
  "retail-sales": {
    group: "service",
    workplace: l("Retail teams help customers, replenish shelves and keep stock organised. Cash handling, store presentation and sales duties should be clear in the role description.", "रिटेल टीम ग्राहक सहायता, शेल्फ भरने और स्टॉक व्यवस्थित करने का काम करती है। नकद लेन-देन, दुकान की व्यवस्था और बिक्री की ज़िम्मेदारी स्पष्ट होनी चाहिए।"),
    skills: l("Describe customer service, point-of-sale systems, inventory checks and product knowledge. Give examples of clear communication and careful handling of transactions.", "ग्राहक सेवा, बिक्री सिस्टम, इन्वेंटरी जाँच और उत्पाद जानकारी का अनुभव बताएँ। स्पष्ट संवाद और सावधानी से लेन-देन के उदाहरण दें।"),
    preparation: l("Confirm the working language, shift schedule, sales targets and any commission terms. Ask how overtime, cash discrepancies and accommodation are handled.", "काम की भाषा, शिफ्ट, बिक्री लक्ष्य और कमीशन की शर्तें जाँचें। ओवरटाइम, नकद अंतर और आवास की व्यवस्था पूछें।"),
  },
};

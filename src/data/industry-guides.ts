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
    skills: l("Assess drawing interpretation, measurements, materials and tool use. Ask candidates to explain safe working practices through a recent site task.", "नक्शे समझने, माप, सामग्री और उपकरणों का उपयोग जाँचें। हाल के साइट कार्य के उदाहरण से उम्मीदवारों से सुरक्षित काम का तरीका समझाने को कहें।"),
    preparation: l("Review trade records and experience. Specify protective equipment, work at height, transport and accommodation so candidates understand the site requirements.", "ट्रेड रिकॉर्ड और अनुभव देखें। सुरक्षा उपकरण, ऊँचाई पर काम, परिवहन और आवास स्पष्ट करें ताकि उम्मीदवार साइट की शर्तें समझें।"),
  },
  manufacturing: {
    group: "trades",
    workplace: l("Factory roles differ across assembly, machine operation, fabrication and quality checks. Shift patterns, production processes and supervision should be clear in the brief.", "फैक्ट्री की भूमिकाएँ असेंबली, मशीन संचालन, फैब्रिकेशन और गुणवत्ता जाँच में अलग होती हैं। शिफ्ट, उत्पादन प्रक्रिया और निगरानी स्पष्ट होनी चाहिए।"),
    skills: l("Evaluate machine and material knowledge, quality checks and fault reporting. Distinguish production operating experience from maintenance or programming skills.", "मशीन और सामग्री का ज्ञान, गुणवत्ता जाँच और खराबी की सूचना देने का तरीका जाँचें। उत्पादन संचालन के अनुभव को रखरखाव या प्रोग्रामिंग से अलग रखें।"),
    preparation: l("Confirm the actual workstation, lifting requirements, shift rotation and assessment format. Keep technical certificates and work references ready where relevant.", "वर्कस्टेशन, वजन उठाने की ज़रूरत, शिफ्ट और परीक्षण का तरीका जाँचें। संबंधित तकनीकी प्रमाणपत्र और अनुभव संदर्भ तैयार रखें।"),
  },
  "electrical-mechanical": {
    group: "trades",
    workplace: l("Installation, servicing and fault-finding can take place on sites, in workshops or in occupied buildings. Electrical, plumbing and HVAC duties need a specific scope.", "स्थापना, सर्विस और खराबी की जाँच साइट, वर्कशॉप या इस्तेमाल में आ रहे भवन में हो सकती है। इलेक्ट्रिकल, प्लंबिंग और HVAC का दायरा स्पष्ट होना चाहिए।"),
    skills: l("Assess relevant systems experience, drawing interpretation and measuring instruments. Test safe equipment isolation within each candidate’s training.", "संबंधित प्रणालियों का अनुभव, नक्शे समझना और माप उपकरणों का ज्ञान जाँचें। उम्मीदवार के प्रशिक्षण के दायरे में उपकरण सुरक्षित अलग करने का परीक्षण करें।"),
    preparation: l("Establish any local licensing or recognition requirements. Define practical tests, tools, supervision and call-out duties before candidate selection.", "स्थानीय लाइसेंस या मान्यता की शर्तें तय करें। चयन से पहले व्यावहारिक परीक्षण, उपकरण, निगरानी और आपातकालीन ड्यूटी स्पष्ट करें।"),
  },
  logistics: {
    group: "service",
    workplace: l("Warehouse teams receive, store, pick, pack and dispatch goods. Duties vary between manual handling, inventory systems and equipment operation.", "वेयरहाउस टीम माल प्राप्त, जमा, चुन, पैक और रवाना करती है। काम हाथ से माल उठाने, इन्वेंटरी सिस्टम और उपकरण संचालन के अनुसार बदलता है।"),
    skills: l("Check order accuracy, stock control and scanner or warehouse-system experience. Assess forklift competence separately from general warehouse duties.", "ऑर्डर की सटीकता, स्टॉक नियंत्रण और स्कैनर या वेयरहाउस सिस्टम का अनुभव जाँचें। फोर्कलिफ्ट क्षमता को सामान्य वेयरहाउस काम से अलग परखें।"),
    preparation: l("Confirm lifting expectations, temperature conditions, shifts and any equipment certification. Ask how targets, breaks and overtime are organised.", "वजन उठाने, तापमान, शिफ्ट और उपकरण प्रमाणन की शर्तें जाँचें। लक्ष्य, ब्रेक और ओवरटाइम की व्यवस्था पूछें।"),
  },
  transportation: {
    group: "service",
    workplace: l("Driving requirements depend on vehicle class, load, route and destination rules. A licence held in India does not by itself establish permission to drive overseas.", "ड्राइविंग की शर्तें वाहन, माल, मार्ग और देश के नियमों पर निर्भर हैं। भारतीय लाइसेंस अपने आप विदेश में वाहन चलाने की अनुमति नहीं देता।"),
    skills: l("Review vehicle classes, relevant driving experience, inspections and delivery duties. Evaluate safe loading practices and route-planning knowledge.", "वाहन श्रेणी, संबंधित ड्राइविंग अनुभव, निरीक्षण और डिलीवरी कार्य देखें। सुरक्षित लोडिंग और मार्ग योजना का ज्ञान जाँचें।"),
    preparation: l("Confirm licence recognition, local testing, insurance, hours and training-cost responsibilities. Specify the vehicle class and route before selection.", "लाइसेंस मान्यता, स्थानीय परीक्षण, बीमा, घंटे और प्रशिक्षण खर्च की ज़िम्मेदारी जाँचें। चयन से पहले वाहन श्रेणी और मार्ग स्पष्ट करें।"),
  },
  hospitality: {
    group: "service",
    workplace: l("Hotels, restaurants and guest services bring together kitchen, housekeeping and front-office teams. The property type and service standard shape each role.", "होटल, रेस्टोरेंट और अतिथि सेवाओं में रसोई, हाउसकीपिंग और फ्रंट ऑफिस की टीमें होती हैं। प्रतिष्ठान और सेवा स्तर के अनुसार भूमिका बदलती है।"),
    skills: l("Assess relevant cuisines, housekeeping routines, cleaning standards or guest systems. Check communication, hygiene and teamwork alongside practical experience.", "संबंधित व्यंजन, हाउसकीपिंग, सफाई मानक या अतिथि सिस्टम का ज्ञान जाँचें। व्यावहारिक अनुभव के साथ संवाद, स्वच्छता और टीमवर्क परखें।"),
    preparation: l("Specify split shifts, meals, uniforms, accommodation and language expectations. Ask chefs for a concise portfolio of dishes they have personally prepared.", "अलग-अलग शिफ्ट, भोजन, वर्दी, आवास और भाषा की अपेक्षाएँ बताएँ। शेफ से उनके स्वयं बनाए व्यंजनों का संक्षिप्त पोर्टफोलियो माँगें।"),
  },
  healthcare: {
    group: "professional",
    workplace: l("Nursing, allied health and care-assistant work have different responsibilities. A care role must not be presented as licensed nursing, or the other way around.", "नर्सिंग, सहयोगी स्वास्थ्य सेवा और देखभाल सहायक की ज़िम्मेदारियाँ अलग हैं। देखभाल की भूमिका को लाइसेंस प्राप्त नर्सिंग या उसका उलटा न समझें।"),
    skills: l("Review qualifications, registration, care settings and duties within the candidate’s training. Assess patient communication, record keeping and confidentiality.", "योग्यता, पंजीकरण, देखभाल परिवेश और प्रशिक्षण के दायरे के काम देखें। मरीज से संवाद, रिकॉर्ड रखने और गोपनीयता की समझ जाँचें।"),
    preparation: l("Check recognition, professional registration, language evidence and the permitted scope of work for the destination. Confirm eligibility for the specific immigration route.", "देश के अनुसार मान्यता, पेशेवर पंजीकरण, भाषा प्रमाण और काम का अनुमत दायरा जाँचें। संबंधित आव्रजन श्रेणी की पात्रता की पुष्टि करें।"),
  },
  agriculture: {
    group: "trades",
    workplace: l("Farm work may include planting, crop care, harvesting and sorting. Open-field and greenhouse environments have different routines and physical conditions.", "खेत के काम में रोपाई, फसल की देखभाल, कटाई और छँटाई शामिल हो सकती है। खुले खेत और ग्रीनहाउस की दिनचर्या और स्थितियाँ अलग होती हैं।"),
    skills: l("Assess experience with relevant crops, equipment and farm tasks. Check safe tool use, produce handling and ability to follow supervisory instructions.", "संबंधित फसलों, उपकरणों और कृषि कार्य का अनुभव जाँचें। सुरक्षित औज़ार उपयोग, उपज सँभालना और पर्यवेक्षक के निर्देश मानने की क्षमता परखें।"),
    preparation: l("Define seasonal duration, weather exposure, lifting, transport and housing. Explain how working hours and pay will be recorded in the contract.", "मौसमी अवधि, मौसम में काम, वजन उठाना, परिवहन और आवास तय करें। अनुबंध में घंटे और वेतन दर्ज करने का तरीका बताएँ।"),
  },
  energy: {
    group: "trades",
    workplace: l("Energy and industrial projects may involve construction, shutdown maintenance or ongoing operations. Access rules and safety responsibilities depend on the site.", "ऊर्जा और औद्योगिक परियोजनाओं में निर्माण, बंदी के दौरान रखरखाव या नियमित संचालन हो सकता है। प्रवेश और सुरक्षा की शर्तें साइट पर निर्भर हैं।"),
    skills: l("Evaluate process-specific welding, pipe-fitting, instrumentation or rigging competence. Check evidence of training in the safety procedures your site requires.", "प्रक्रिया के अनुसार वेल्डिंग, पाइप फिटिंग, इंस्ट्रूमेंटेशन या रिगिंग क्षमता जाँचें। आपकी साइट की सुरक्षा प्रक्रियाओं के प्रशिक्षण का प्रमाण देखें।"),
    preparation: l("Verify trade tests, current certifications, site induction and work-location conditions. Clarify rotation, accommodation and travel arrangements in writing.", "ट्रेड परीक्षण, प्रमाणन, साइट परिचय और काम की स्थितियाँ जाँचें। रोटेशन, आवास और यात्रा की व्यवस्था लिखित में स्पष्ट करें।"),
  },
  facilities: {
    group: "service",
    workplace: l("Facilities teams support the day-to-day running of buildings. Cleaning, security and technical maintenance are distinct roles with different training needs.", "सुविधा प्रबंधन टीम भवनों का दैनिक संचालन सँभालती है। सफाई, सुरक्षा और तकनीकी रखरखाव अलग भूमिकाएँ हैं और प्रशिक्षण भी अलग है।"),
    skills: l("Review experience in comparable buildings, equipment or service areas. Ask for examples of routine checks, fault reporting and respectful occupant interaction.", "समान भवनों, उपकरणों या सेवा क्षेत्रों का अनुभव देखें। नियमित जाँच, खराबी की सूचना और रहने वालों से सम्मानजनक संवाद के उदाहरण माँगें।"),
    preparation: l("Specify security duties, local training, night shifts and on-call expectations. Clarify PPE, supervision and travel arrangements between sites.", "सुरक्षा कार्य, स्थानीय प्रशिक्षण, रात की शिफ्ट और आपातकालीन ड्यूटी स्पष्ट करें। सुरक्षा उपकरण, निगरानी और साइटों के बीच यात्रा बताएँ।"),
  },
  "it-professional": {
    group: "professional",
    workplace: l("Professional roles range from IT support and software development to administration. The technology stack, reporting line and work location should be explicit.", "पेशेवर भूमिकाएँ IT सहयोग और सॉफ़्टवेयर विकास से प्रशासन तक हैं। तकनीक, रिपोर्टिंग और कार्यस्थल स्पष्ट होना चाहिए।"),
    skills: l("Assess relevant tools, project responsibilities and problem-solving examples. Do not request confidential code, credentials or a previous employer’s information.", "संबंधित उपकरण, परियोजना ज़िम्मेदारियाँ और समस्या समाधान के उदाहरण जाँचें। गोपनीय कोड, लॉगिन विवरण या पिछले नियोक्ता की जानकारी न माँगें।"),
    preparation: l("Review focused CVs and public portfolios where appropriate. Define assessment formats, working arrangements, relocation scope and qualification requirements.", "संबंधित बायोडाटा और उपयुक्त सार्वजनिक पोर्टफोलियो देखें। परीक्षण का तरीका, काम की व्यवस्था, स्थानांतरण का दायरा और योग्यता तय करें।"),
  },
  engineering: {
    group: "professional",
    workplace: l("Engineering briefs should identify the discipline, project stage and responsibility level. Design, inspection, site coordination and commissioning need different experience.", "इंजीनियरिंग की ज़रूरत में शाखा, परियोजना का चरण और ज़िम्मेदारी का स्तर स्पष्ट हो। डिज़ाइन, निरीक्षण, साइट समन्वय और कमीशनिंग के अनुभव अलग होते हैं।"),
    skills: l("Review technical tools, drawings, applied standards and substantiated project outcomes. Distinguish design responsibility from site support experience.", "तकनीकी उपकरण, नक्शे, लागू मानक और प्रमाणित परियोजना परिणाम देखें। डिज़ाइन की ज़िम्मेदारी को साइट सहयोग के अनुभव से अलग रखें।"),
    preparation: l("Review degree and project records with confidential details removed. Confirm recognition, local registration and the technical assessment your team requires.", "गोपनीय जानकारी हटाकर डिग्री और परियोजना रिकॉर्ड देखें। मान्यता, स्थानीय पंजीकरण और आपकी टीम के तकनीकी परीक्षण की पुष्टि करें।"),
  },
  "food-processing": {
    group: "trades",
    workplace: l("Food-production teams prepare, process, pack and check products. Hygiene rules, temperature-controlled areas and line duties vary by product and facility.", "खाद्य उत्पादन टीम तैयारी, प्रसंस्करण, पैकिंग और जाँच करती है। स्वच्छता, तापमान और उत्पादन लाइन का काम उत्पाद और फैक्ट्री पर निर्भर है।"),
    skills: l("Assess food-handling experience, packing accuracy, cleaning routines and traceability practices. Check hands-on familiarity with the machinery required for your production line.", "खाद्य सामग्री सँभालने, सही पैकिंग, सफाई और पता लगाने योग्य रिकॉर्ड का अनुभव जाँचें। उत्पादन लाइन की आवश्यक मशीनों का व्यावहारिक ज्ञान परखें।"),
    preparation: l("Specify hygiene training, protective clothing, shifts and cold-room duties. Confirm any required health checks before candidates make arrangements.", "स्वच्छता प्रशिक्षण, सुरक्षा कपड़े, शिफ्ट और ठंडे कमरों के काम स्पष्ट करें। उम्मीदवारों की व्यवस्था से पहले आवश्यक स्वास्थ्य जाँच तय करें।"),
  },
  "retail-sales": {
    group: "service",
    workplace: l("Retail teams help customers, replenish shelves and keep stock organised. Cash handling, store presentation and sales duties should be clear in the role description.", "रिटेल टीम ग्राहक सहायता, शेल्फ भरने और स्टॉक व्यवस्थित करने का काम करती है। नकद लेन-देन, दुकान की व्यवस्था और बिक्री की ज़िम्मेदारी स्पष्ट होनी चाहिए।"),
    skills: l("Evaluate customer service, point-of-sale systems, stock checks and product knowledge. Ask for examples of clear communication and accurate transaction handling.", "ग्राहक सेवा, बिक्री सिस्टम, स्टॉक जाँच और उत्पाद ज्ञान परखें। स्पष्ट संवाद और सटीक लेन-देन के उदाहरण माँगें।"),
    preparation: l("Confirm the working language, shift schedule, sales targets and any commission terms. Ask how overtime, cash discrepancies and accommodation are handled.", "काम की भाषा, शिफ्ट, बिक्री लक्ष्य और कमीशन की शर्तें जाँचें। ओवरटाइम, नकद अंतर और आवास की व्यवस्था पूछें।"),
  },
};

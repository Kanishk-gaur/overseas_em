import { employerBenefits, employerCapabilities, employerSectionCopy } from "./about-employers";
import { l } from "./types";

export const homeWorkforceCopy = {
  eyebrow: employerSectionCopy.whyEyebrow,
  title: l("Why global businesses\nlook to India’s workforce", "वैश्विक कंपनियाँ भारतीय\nकामगारों को क्यों चुनती हैं"),
  intro: l("Build your workforce plan around the work. Indian manpower recruitment connects employers with varied trade, technical and professional backgrounds, so you can assess the skills and experience your operation needs.", "काम की ज़रूरतों के अनुसार कामगार योजना बनाएँ। भारत से भर्ती नियोक्ताओं को विविध ट्रेड, तकनीकी और पेशेवर पृष्ठभूमि के उम्मीदवारों से जोड़ती है, ताकि आप अपने संचालन के लिए आवश्यक हुनर और अनुभव जाँच सकें।"),
  note: employerSectionCopy.whyNote,
  ctaTitle: l("Plan the workforce\nyour next project needs.", "अगली परियोजना के लिए\nज़रूरी कामगारों की योजना बनाएँ।"),
  ctaBody: l("Share your roles, worksite and hiring priorities. Let’s shape an international workforce recruitment plan around your requirements.", "अपने पद, कार्यस्थल और भर्ती की प्राथमिकताएँ बताएँ। आपकी ज़रूरतों के अनुसार अंतरराष्ट्रीय कामगार भर्ती की योजना बनाएँ।"),
  primary: l("Discuss your hiring requirements", "अपनी भर्ती ज़रूरतों पर चर्चा करें"),
  secondary: l("Explore our workforce", "हमारे कामगार प्रोफाइल देखें"),
};

export const homePrimaryBenefits = [
  employerBenefits[0],
  employerBenefits[1],
  {
    title: employerBenefits[2].title,
    body: l("Experience in infrastructure, manufacturing or industrial maintenance can inform your shortlist. Ask candidates about comparable equipment, tasks and working conditions to judge how their experience fits your operation.", "बुनियादी ढाँचे, उत्पादन या औद्योगिक रखरखाव का अनुभव शुरुआती चयन में मदद कर सकता है। अपने संचालन से अनुभव का मेल जाँचने के लिए उम्मीदवारों से समान उपकरण, काम और कार्य परिस्थितियों के बारे में पूछें।"),
  },
];

export const homeCommercialBenefit = {
  title: l("Commercial value, considered in full", "समग्र रूप से व्यावसायिक मूल्य का आकलन"),
  body: l("Evaluate the total cost of recruitment alongside role-specific skills, experience and productivity requirements. Include employment conditions, compliance obligations and mobilization expenses. The value of a skilled Indian workforce depends on how well it fits your budget and long-term staffing plan.", "भूमिका के कौशल, अनुभव और उत्पादकता की ज़रूरतों के साथ भर्ती की कुल लागत का आकलन करें। रोजगार की शर्तें, अनुपालन दायित्व और तैनाती खर्च शामिल करें। कुशल भारतीय कामगारों का मूल्य आपके बजट और दीर्घकालिक कामगार योजना से उनके मेल पर निर्भर करता है।"),
};

export const homeSupportingBenefits = [
  employerBenefits[3],
  {
    title: l("Relevant overseas experience", "प्रासंगिक विदेशी कार्य अनुभव"),
    body: l("Some candidates have worked on international construction, industrial or hospitality projects. Verify their responsibilities and relevant workplace practices to identify experience that could help them adapt to your project.", "कुछ उम्मीदवार अंतरराष्ट्रीय निर्माण, औद्योगिक या आतिथ्य परियोजनाओं में काम कर चुके हैं। उनकी ज़िम्मेदारियाँ और संबंधित कार्य पद्धतियाँ जाँचकर वह अनुभव पहचानें जो आपकी परियोजना में ढलने में सहायक हो सकता है।"),
  },
  employerBenefits[4],
  employerBenefits[5],
  {
    title: l("Connected recruitment coordination", "भर्ती के सभी चरणों का समन्वय"),
    body: l("We coordinate sourcing, screening, relevant trade tests, documentation, visa processing and mobilization around your brief. Your team retains selection decisions; visa approvals remain with the authorities, and recruitment outcomes are not guaranteed.", "हम आपकी ज़रूरत के अनुसार खोज, स्क्रीनिंग, संबंधित ट्रेड परीक्षण, दस्तावेज़, वीज़ा प्रक्रिया और तैनाती का समन्वय करते हैं। चयन का निर्णय आपकी टीम लेती है; वीज़ा स्वीकृति अधिकारियों के अधीन है और भर्ती परिणामों की गारंटी नहीं है।"),
  },
  { title: employerCapabilities[8].title, body: employerCapabilities[8].body[0] },
];

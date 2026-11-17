import { l } from "./types";

// General (not country-specific) content for the visa guide at /glossary/.
// These strings are part of the translation catalogue: after changing the
// English text, run `npm run i18n:catalog` and add the new keys to every
// dictionary in src/locales/messages/ (see docs/INTERNATIONALIZATION.md).
// Country tabs are edited separately in src/data/visaCountries.ts.
//
// Content rule: no fees, salaries, processing times or guarantees.

export const visaDisclaimer = l(
  "This information is general guidance, not legal advice. Visa rules change — always confirm with the official embassy or immigration authority.",
  "यह जानकारी सामान्य मार्गदर्शन है, कानूनी सलाह नहीं। वीज़ा नियम बदलते रहते हैं — हमेशा आधिकारिक दूतावास या आव्रजन प्राधिकरण से पुष्टि करें।",
);

export const visaSections = [
  { href: "#visa-types", label: l("Visa or permit?", "वीज़ा या परमिट?") },
  { href: "#country-guide", label: l("By country", "देश के अनुसार") },
  { href: "#visa-process", label: l("The process", "प्रक्रिया") },
  { href: "#visa-documents", label: l("Documents", "दस्तावेज़") },
  { href: "#visa-safety", label: l("Stay safe", "सुरक्षित रहें") },
  { href: "#visa-faq", label: l("Visa FAQs", "वीज़ा के सवाल") },
  { href: "#glossary", label: l("Glossary", "शब्दावली") },
];

export const permissionTypes = [
  {
    id: "visa",
    tag: l("PERMISSION TO ENTER", "प्रवेश की अनुमति"),
    title: l("Visa", "वीज़ा"),
    body: l(
      "A visa lets you travel to and enter a country for a stated purpose, such as work, a visit or study. A visit or tourist visa does not allow employment.",
      "वीज़ा आपको किसी तय उद्देश्य, जैसे काम, घूमने या पढ़ाई के लिए किसी देश में जाने और प्रवेश करने की अनुमति देता है। विज़िट या पर्यटक वीज़ा पर नौकरी करने की अनुमति नहीं होती।",
    ),
    issuer: l(
      "Usually issued by the embassy, consulate or immigration authority before you travel.",
      "आम तौर पर यात्रा से पहले दूतावास, वाणिज्य दूतावास या आव्रजन प्राधिकरण जारी करता है।",
    ),
  },
  {
    id: "work-permit",
    tag: l("PERMISSION TO WORK", "काम की अनुमति"),
    title: l("Work permit", "कार्य परमिट"),
    body: l(
      "A work permit authorises you to do a specific job, usually for a named employer. In many countries the employer applies for it, and changing job or employer can require a new approval.",
      "कार्य परमिट आपको एक तय काम करने की अनुमति देता है, आम तौर पर किसी नामित नियोक्ता के लिए। कई देशों में इसका आवेदन नियोक्ता करता है, और काम या नियोक्ता बदलने पर नई स्वीकृति लेनी पड़ सकती है।",
    ),
    issuer: l(
      "Usually issued by the labour or immigration authority, often at the employer’s request.",
      "आम तौर पर श्रम या आव्रजन प्राधिकरण जारी करता है, अक्सर नियोक्ता के आवेदन पर।",
    ),
  },
  {
    id: "residence-permit",
    tag: l("PERMISSION TO STAY", "रहने की अनुमति"),
    title: l("Residence permit", "निवास परमिट"),
    body: l(
      "A residence permit lets you live in the country for the length of your contract. It is often issued as an ID card after arrival, following medical or biometric steps.",
      "निवास परमिट आपको अनुबंध की अवधि तक उस देश में रहने की अनुमति देता है। यह अक्सर आगमन के बाद स्वास्थ्य जाँच या बायोमेट्रिक प्रक्रिया के बाद पहचान पत्र के रूप में मिलता है।",
    ),
    issuer: l(
      "Usually issued by the immigration authority after you arrive.",
      "आम तौर पर आपके पहुँचने के बाद आव्रजन प्राधिकरण जारी करता है।",
    ),
  },
] as const;

export const visaTimeline = [
  { id: "offer", title: l("Job offer", "नौकरी का प्रस्ताव"), body: l("A named employer confirms the role, worksite and main terms in writing.", "नामित नियोक्ता काम, कार्यस्थल और मुख्य शर्तों की लिखित पुष्टि करता है।") },
  { id: "contract", title: l("Contract review", "अनुबंध की समीक्षा"), body: l("Read the full contract: duties, pay, hours, deductions, accommodation and leave.", "पूरा अनुबंध पढ़ें: काम, वेतन, घंटे, कटौती, आवास और छुट्टी।") },
  { id: "documents", title: l("Document collection", "दस्तावेज़ जुटाना"), body: l("Gather your passport, certificates and experience records, with attestation where required.", "पासपोर्ट, प्रमाणपत्र और अनुभव के दस्तावेज़ जुटाएँ, जहाँ ज़रूरी हो वहाँ सत्यापन के साथ।") },
  { id: "clearance", title: l("Medical & police clearance", "स्वास्थ्य और पुलिस सत्यापन"), body: l("Complete the medical examination and police clearance required for the destination.", "गंतव्य के लिए ज़रूरी स्वास्थ्य जाँच और पुलिस सत्यापन पूरा करें।") },
  { id: "application", title: l("Visa / work permit application", "वीज़ा / कार्य परमिट का आवेदन"), body: l("The employer or applicant files the application with the correct authority.", "नियोक्ता या आवेदक सही प्राधिकरण के पास आवेदन जमा करता है।") },
  { id: "approval", title: l("Approval by authorities", "अधिकारियों की स्वीकृति"), body: l("The relevant authorities decide. No agency or employer can guarantee approval.", "फैसला संबंधित अधिकारी करते हैं। कोई एजेंसी या नियोक्ता स्वीकृति की गारंटी नहीं दे सकता।") },
  { id: "orientation", title: l("Pre-departure orientation", "यात्रा से पहले की तैयारी"), body: l("Understand your workplace, rights, emergency contacts and local rules before you travel.", "यात्रा से पहले अपना कार्यस्थल, अधिकार, आपातकालीन संपर्क और स्थानीय नियम समझें।") },
  { id: "arrival", title: l("Travel & arrival", "यात्रा और आगमन"), body: l("Travel on the correct work permission and complete arrival formalities with the employer.", "सही कार्य अनुमति पर यात्रा करें और नियोक्ता के साथ आगमन की औपचारिकताएँ पूरी करें।") },
] as const;

export const visaDocuments = [
  { id: "passport", title: l("Passport", "पासपोर्ट"), body: l("Check the validity period and blank pages required by the destination. Renew early if it is close to expiry.", "गंतव्य के लिए ज़रूरी वैधता अवधि और खाली पन्ने जाँचें। समाप्ति नज़दीक हो तो समय रहते नवीनीकरण कराएँ।") },
  { id: "photos", title: l("Passport-size photographs", "पासपोर्ट आकार की तस्वीरें"), body: l("Recent photos in the size and background specified by the embassy or visa centre.", "दूतावास या वीज़ा केंद्र द्वारा बताए गए आकार और पृष्ठभूमि वाली हाल की तस्वीरें।") },
  { id: "education", title: l("Educational certificates", "शैक्षणिक प्रमाणपत्र"), body: l("Degree, diploma or school certificates relevant to the role, with originals available.", "भूमिका से जुड़े डिग्री, डिप्लोमा या स्कूल के प्रमाणपत्र, मूल प्रतियों के साथ।") },
  { id: "experience", title: l("Trade & experience certificates", "ट्रेड और अनुभव प्रमाणपत्र"), body: l("Trade test or ITI certificates and experience letters showing employer, role and dates.", "ट्रेड टेस्ट या ITI प्रमाणपत्र और अनुभव पत्र, जिनमें नियोक्ता, काम और तारीखें लिखी हों।") },
  { id: "medical", title: l("Medical report", "स्वास्थ्य रिपोर्ट"), body: l("A medical fitness report from a centre approved for the destination, where required.", "जहाँ ज़रूरी हो, गंतव्य के लिए मान्य केंद्र की स्वास्थ्य जाँच रिपोर्ट।") },
  { id: "pcc", title: l("Police clearance certificate (PCC)", "पुलिस क्लीयरेंस सर्टिफिकेट (PCC)"), body: l("Issued through Passport Seva or the police authority, as required by the destination.", "गंतव्य की शर्त के अनुसार पासपोर्ट सेवा या पुलिस प्राधिकरण से जारी।") },
  { id: "contract", title: l("Signed offer letter or contract", "हस्ताक्षरित प्रस्ताव पत्र या अनुबंध"), body: l("The written offer or employment contract, signed by you and the employer.", "लिखित प्रस्ताव या रोजगार अनुबंध, जिस पर आपके और नियोक्ता के हस्ताक्षर हों।") },
  { id: "attestation", title: l("Attestation or apostille", "सत्यापन या अपोस्टिल"), body: l("Some destinations require certificates to be attested or apostilled. Confirm before paying for it.", "कुछ गंतव्यों में प्रमाणपत्रों का सत्यापन या अपोस्टिल ज़रूरी होता है। भुगतान से पहले इसकी पुष्टि करें।") },
];

export const visaRedFlags = [
  { title: l("A tourist or visit visa offered for work", "काम के लिए पर्यटक या विज़िट वीज़ा का प्रस्ताव"), body: l("A visit visa is not work authorisation. Working on one can lead to fines, detention or deportation.", "विज़िट वीज़ा काम की अनुमति नहीं है। इस पर काम करने से जुर्माना, हिरासत या निर्वासन हो सकता है।") },
  { title: l("Large cash payments demanded", "बड़ी नकद रकम की माँग"), body: l("Be wary of demands for large sums in cash, especially without an itemised written breakdown.", "बड़ी नकद रकम की माँग से सावधान रहें, खासकर जब मदवार लिखित विवरण न दिया जाए।") },
  { title: l("No written contract", "लिखित अनुबंध नहीं"), body: l("A genuine job has a written offer naming the employer, role, pay and worksite.", "असली नौकरी में लिखित प्रस्ताव होता है, जिसमें नियोक्ता, काम, वेतन और कार्यस्थल का नाम हो।") },
  { title: l("An agent keeps your passport", "एजेंट आपका पासपोर्ट अपने पास रखता है"), body: l("Your passport is your property. Hand it over only for a stated official step, and get it back.", "पासपोर्ट आपकी संपत्ति है। इसे केवल बताए गए आधिकारिक काम के लिए दें और वापस ज़रूर लें।") },
  { title: l("A “guaranteed visa” promise", "“गारंटीड वीज़ा” का वादा"), body: l("Only the authorities decide a visa. Nobody can guarantee approval or a processing time.", "वीज़ा का फैसला केवल अधिकारी करते हैं। कोई भी स्वीकृति या समय की गारंटी नहीं दे सकता।") },
];

export const visaVerification = [
  { title: l("Check the offer with the employer", "नियोक्ता से प्रस्ताव की पुष्टि करें"), body: l("Contact the employer through independently found details and confirm the role and terms.", "खुद खोजे गए संपर्क विवरण से नियोक्ता से बात करें और काम तथा शर्तों की पुष्टि करें।") },
  { title: l("Check official immigration websites", "आधिकारिक आव्रजन वेबसाइट देखें"), body: l("Compare the visa type and steps with the destination’s official guidance and India’s eMigrate portal.", "वीज़ा के प्रकार और चरणों को गंतव्य के आधिकारिक निर्देशों और भारत के eMigrate पोर्टल से मिलाएँ।") },
  { title: l("Never pay without a receipt", "रसीद के बिना कभी भुगतान न करें"), body: l("Ask for an itemised written breakdown and a receipt for every payment.", "हर भुगतान का मदवार लिखित विवरण और रसीद माँगें।") },
];

export const visaFaqs = [
  {
    question: l("How long does a work visa take?", "कार्य वीज़ा में कितना समय लगता है?"),
    answer: l(
      "It varies by destination, route, season and how complete your documents are. Ask for an indicative timeline for your case and treat it as an estimate, not a guarantee. Confirm current processing times with the official source.",
      "यह गंतव्य, वीज़ा श्रेणी, मौसम और आपके दस्तावेज़ों की पूर्णता पर निर्भर करता है। अपने मामले के लिए अनुमानित समय पूछें और उसे अनुमान मानें, गारंटी नहीं। मौजूदा प्रक्रिया समय की पुष्टि आधिकारिक स्रोत से करें।",
    ),
  },
  {
    question: l("Can I work on a tourist visa?", "क्या मैं पर्यटक वीज़ा पर काम कर सकता हूँ?"),
    answer: l(
      "No. A tourist or visit visa does not permit employment. Working on one can lead to fines, deportation or a ban on returning, and leaves you without the protection of a registered contract.",
      "नहीं। पर्यटक या विज़िट वीज़ा पर नौकरी की अनुमति नहीं होती। इस पर काम करने से जुर्माना, निर्वासन या दोबारा प्रवेश पर रोक लग सकती है, और आपको पंजीकृत अनुबंध की सुरक्षा भी नहीं मिलती।",
    ),
  },
  {
    question: l("Who pays the visa fees?", "वीज़ा शुल्क कौन देता है?"),
    answer: l(
      "It depends on the destination’s rules and what the employer has agreed. In many destinations the employer is responsible for work-permit costs. Get the allocation of every cost in writing, and ask for a receipt for anything you pay.",
      "यह गंतव्य के नियमों और नियोक्ता के साथ हुई सहमति पर निर्भर करता है। कई गंतव्यों में कार्य परमिट का खर्च नियोक्ता की ज़िम्मेदारी होता है। हर खर्च कौन देगा, यह लिखित में लें और अपने हर भुगतान की रसीद माँगें।",
    ),
  },
  {
    question: l("What is attestation?", "सत्यापन (अटेस्टेशन) क्या है?"),
    answer: l(
      "Attestation is official confirmation that a document, such as a degree or marriage certificate, is genuine so it can be used abroad. Depending on the destination it may involve state authorities, the Ministry of External Affairs and the destination’s embassy, or an apostille.",
      "अटेस्टेशन इस बात की आधिकारिक पुष्टि है कि डिग्री या विवाह प्रमाणपत्र जैसा दस्तावेज़ असली है, ताकि उसे विदेश में इस्तेमाल किया जा सके। गंतव्य के अनुसार इसमें राज्य के अधिकारी, विदेश मंत्रालय और गंतव्य देश का दूतावास, या अपोस्टिल शामिल हो सकता है।",
    ),
  },
  {
    question: l("What if my visa is rejected?", "अगर मेरा वीज़ा अस्वीकार हो जाए तो?"),
    answer: l(
      "Ask for the reason in writing. Some refusals can be corrected and re-applied for, or appealed, under the destination’s rules. Fees paid to the authorities are often non-refundable; check any agency refund terms in your written agreement.",
      "कारण लिखित में माँगें। गंतव्य के नियमों के अनुसार कुछ मामलों में कमी सुधारकर दोबारा आवेदन या अपील की जा सकती है। अधिकारियों को दिया गया शुल्क अक्सर वापस नहीं होता; एजेंसी की रिफंड शर्तें अपने लिखित समझौते में जाँचें।",
    ),
  },
  {
    question: l("Can my family come with me?", "क्या मेरा परिवार मेरे साथ आ सकता है?"),
    answer: l(
      "It depends on the visa route, your salary or job level and the destination’s family-sponsorship rules. Many worker routes do not allow dependants at first. Confirm with the official source before making plans.",
      "यह वीज़ा श्रेणी, आपके वेतन या पद के स्तर और गंतव्य के परिवार प्रायोजन नियमों पर निर्भर करता है। कई कामगार श्रेणियों में शुरुआत में आश्रितों की अनुमति नहीं होती। योजना बनाने से पहले आधिकारिक स्रोत से पुष्टि करें।",
    ),
  },
  {
    question: l("What is a medical fitness test?", "मेडिकल फिटनेस टेस्ट क्या है?"),
    answer: l(
      "A health examination required by many destinations before a work or residence permit is issued. It is done at an approved centre, before travel, after arrival or both. The tests required are set by the destination.",
      "यह स्वास्थ्य जाँच है, जो कई गंतव्यों में कार्य या निवास परमिट जारी होने से पहले ज़रूरी होती है। यह मान्य केंद्र पर यात्रा से पहले, आगमन के बाद या दोनों समय होती है। कौन-सी जाँच होगी, यह गंतव्य तय करता है।",
    ),
  },
  {
    question: l("Do I need to learn the language?", "क्या मुझे भाषा सीखनी होगी?"),
    answer: l(
      "Some routes require a language test, such as Japanese for Japan’s SSW route or German for many regulated professions in Germany. Elsewhere, basic workplace communication is still important for safety and daily life.",
      "कुछ श्रेणियों में भाषा परीक्षा ज़रूरी है, जैसे जापान की SSW श्रेणी के लिए जापानी या जर्मनी के कई विनियमित पेशों के लिए जर्मन। बाकी जगहों पर भी सुरक्षा और रोज़मर्रा के जीवन के लिए कार्यस्थल की बुनियादी बातचीत ज़रूरी है।",
    ),
  },
  {
    question: l("What is the difference between ECR and ECNR?", "ECR और ECNR में क्या अंतर है?"),
    answer: l(
      "Indian passports are marked ECR (Emigration Check Required) or ECNR (Emigration Check Not Required). ECR passport holders need emigration clearance through the eMigrate system before travelling for work to certain notified countries.",
      "भारतीय पासपोर्ट पर ECR (Emigration Check Required) या ECNR (Emigration Check Not Required) दर्ज होता है। ECR पासपोर्ट धारकों को कुछ अधिसूचित देशों में काम के लिए जाने से पहले eMigrate प्रणाली से उत्प्रवास मंज़ूरी लेनी होती है।",
    ),
  },
  {
    question: l("Can I change employer after I arrive?", "क्या पहुँचने के बाद मैं नियोक्ता बदल सकता हूँ?"),
    answer: l(
      "Often the work permit is tied to the employer who sponsored it. Changing employer usually needs a new approval, and the rules differ by destination. Check the official guidance before you resign or accept another offer.",
      "अक्सर कार्य परमिट उसी नियोक्ता से जुड़ा होता है जिसने उसे प्रायोजित किया। नियोक्ता बदलने के लिए आम तौर पर नई स्वीकृति चाहिए, और नियम हर गंतव्य में अलग हैं। इस्तीफ़ा देने या दूसरा प्रस्ताव स्वीकार करने से पहले आधिकारिक निर्देश देखें।",
    ),
  },
];

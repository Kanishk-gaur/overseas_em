import { l } from "./types";
import { photography } from "./photography";
import { faqs } from "./faq";

// Adapted from the original site's hiring, services and workforce content.
export const employerTracks = [
  {
    id: "technical",
    label: l("QUALIFICATION-LED HIRING", "योग्यता के आधार पर भर्ती"),
    title: l("Technical & professional talent", "तकनीकी और पेशेवर प्रतिभा"),
    description: l("For roles where specialist knowledge, qualifications and proven technical ability shape the shortlist.", "ऐसी भूमिकाओं के लिए जिनमें विशेष ज्ञान, योग्यता और प्रमाणित तकनीकी क्षमता के आधार पर उम्मीदवार चुने जाते हैं।"),
    image: photography.engineering,
    roles: l("Engineers · CNC technicians · IT specialists · Quality professionals", "इंजीनियर · CNC तकनीशियन · IT विशेषज्ञ · गुणवत्ता पेशेवर"),
    checks: [
      l("Degree, diploma and relevant credential review", "डिग्री, डिप्लोमा और संबंधित प्रमाणपत्रों की समीक्षा"),
      l("Technical interviews, project reviews or role-specific assessments", "तकनीकी इंटरव्यू, प्रोजेक्ट समीक्षा या भूमिका के अनुसार परीक्षण"),
      l("Licensing and recognition requirements reviewed for the destination", "गंतव्य के अनुसार लाइसेंस और योग्यता की मान्यता की समीक्षा"),
    ],
  },
  {
    id: "trades",
    label: l("SKILL-LED HIRING", "हुनर के आधार पर भर्ती"),
    title: l("Skilled trades & essential teams", "कुशल कारीगर और ज़रूरी टीमें"),
    description: l("For hands-on operations where practical skill, relevant experience and workplace readiness matter every day.", "ऐसे कामों के लिए जिनमें व्यावहारिक हुनर, संबंधित अनुभव और कार्यस्थल की तैयारी हर दिन ज़रूरी है।"),
    image: photography.trades,
    roles: l("Welders · Electricians · Machine operators · Hospitality & warehouse teams", "वेल्डर · इलेक्ट्रीशियन · मशीन ऑपरेटर · होटल और वेयरहाउस टीमें"),
    checks: [
      l("Trade certificates and work-experience screening", "ट्रेड प्रमाणपत्र और काम के अनुभव की जाँच"),
      l("Practical skill tests aligned with your equipment and duties", "आपके उपकरणों और ज़िम्मेदारियों के अनुसार व्यावहारिक कौशल परीक्षण"),
      l("Role, safety and workplace orientation before departure", "प्रस्थान से पहले भूमिका, सुरक्षा और कार्यस्थल का परिचय"),
    ],
  },
];

export const employerServices = [
  {
    title: l("Sourcing with a clear brief", "स्पष्ट ज़रूरतों के अनुसार खोज"),
    text: l("Turn your workforce requirement into practical selection criteria.", "अपनी कामगार ज़रूरतों को व्यावहारिक चयन शर्तों में बदलें।"),
    items: [l("Role, experience and qualification mapping", "भूमिका, अनुभव और योग्यता का मिलान"), l("Candidate sourcing and initial screening", "उम्मीदवारों की खोज और शुरुआती जाँच"), l("Shortlists aligned with headcount and location", "संख्या और स्थान के अनुसार उम्मीदवारों की सूची")],
  },
  {
    title: l("Evidence behind each profile", "हर प्रोफाइल के पीछे प्रमाण"),
    text: l("Agree the checks that matter before you make a selection.", "चयन करने से पहले ज़रूरी जाँच तय करें।"),
    items: [l("Identity, experience and credential review", "पहचान, अनुभव और प्रमाणपत्रों की समीक्षा"), l("Practical or technical assessment coordination", "व्यावहारिक या तकनीकी परीक्षण का समन्वय"), l("Employer interviews and selection feedback", "नियोक्ता इंटरव्यू और चयन पर प्रतिक्रिया")],
  },
  {
    title: l("Documentation coordination", "दस्तावेज़ों का समन्वय"),
    text: l("Keep the required paperwork and responsibilities visible.", "ज़रूरी कागज़ात और ज़िम्मेदारियों पर स्पष्टता बनाए रखें।"),
    items: [l("Role and destination-specific document checklist", "भूमिका और देश के अनुसार दस्तावेज़ों की सूची"), l("Offer and employment-document coordination", "प्रस्ताव और रोजगार दस्तावेज़ों का समन्वय"), l("Medical and clearance steps where required", "जहाँ ज़रूरी हो, स्वास्थ्य और अन्य जाँच के चरण")],
  },
  {
    title: l("Preparation for the workplace", "कार्यस्थल के लिए तैयारी"),
    text: l("Help selected candidates understand the job they are joining.", "चुने गए उम्मीदवारों को नए काम को समझने में मदद करें।"),
    items: [l("Role expectations and working-condition briefing", "भूमिका की अपेक्षाएँ और काम की शर्तों की जानकारी"), l("Work culture and safety orientation", "कार्य संस्कृति और सुरक्षा का परिचय"), l("Language preparation needs discussed by role", "भूमिका के अनुसार भाषा की तैयारी पर चर्चा")],
  },
  {
    title: l("A coordinated arrival", "व्यवस्थित आगमन"),
    text: l("Connect selection, travel planning and your onboarding schedule.", "चयन, यात्रा योजना और कार्यभार ग्रहण करने की समय-सारणी को जोड़ें।"),
    items: [l("Individual or phased group travel planning", "व्यक्तिगत या चरणबद्ध सामूहिक यात्रा योजना"), l("Departure-readiness and arrival coordination", "प्रस्थान की तैयारी और आगमन का समन्वय"), l("Employer handover and joining arrangements", "नियोक्ता को हैंडओवर और कार्यभार ग्रहण करने की व्यवस्था")],
  },
  {
    title: l("A continuing point of contact", "लगातार संपर्क का एक माध्यम"),
    text: l("Keep the conversation going as your workforce settles in.", "कामगारों के कार्यस्थल पर बसने के दौरान बातचीत जारी रखें।"),
    items: [l("Account contact for agreed service coordination", "तय सेवाओं के समन्वय के लिए संपर्क व्यक्ति"), l("Check-ins and workplace issue coordination", "नियमित बातचीत और कार्यस्थल के मुद्दों पर समन्वय"), l("Replacement terms set out in the service agreement", "सेवा समझौते में तय प्रतिस्थापन की शर्तें")],
  },
];

export const employerModels = [
  {
    id: "bulk",
    title: l("Bulk workforce", "बड़ी टीम की भर्ती"),
    subtitle: l("For projects and growing operations", "परियोजनाओं और बढ़ते काम के लिए"),
    heading: l("Build a team around your project milestones.", "परियोजना के चरणों के अनुसार टीम बनाएँ।"),
    body: l("Plan a larger requirement across one trade or a mix of roles. Shortlisting, assessments and arrivals can be organised in batches to match your site readiness and onboarding capacity.", "एक ट्रेड या कई भूमिकाओं में बड़ी भर्ती की योजना बनाएँ। उम्मीदवारों का चयन, परीक्षण और आगमन आपके कार्यस्थल की तैयारी और टीम को शामिल करने की क्षमता के अनुसार चरणों में हो सकते हैं।"),
    points: [l("Headcount and skill mix for each role", "हर भूमिका के लिए संख्या और कौशल"), l("Assessment capacity and selection dates", "परीक्षण की क्षमता और चयन की तारीखें"), l("Batch sizes and proposed arrival windows", "हर चरण की संख्या और प्रस्तावित आगमन समय")],
    image: photography.team,
  },
  {
    id: "specialist",
    title: l("Specialist hiring", "विशेषज्ञों की भर्ती"),
    subtitle: l("For a specific skill or critical role", "विशेष हुनर या अहम भूमिका के लिए"),
    heading: l("Give a specialist requirement the attention it needs.", "विशेषज्ञ की ज़रूरत को पूरा ध्यान दें।"),
    body: l("Start with the capabilities that make a candidate suitable for your team. A focused brief can cover technical depth, project experience, qualifications and the responsibilities of an individual appointment.", "उन क्षमताओं से शुरुआत करें जो किसी उम्मीदवार को आपकी टीम के लिए उपयुक्त बनाती हैं। तकनीकी ज्ञान, प्रोजेक्ट अनुभव, योग्यता और पद की ज़िम्मेदारियाँ स्पष्ट रूप से तय करें।"),
    points: [l("Essential skills and preferred experience", "ज़रूरी कौशल और वांछित अनुभव"), l("Credentials and relevant project history", "प्रमाणपत्र और संबंधित प्रोजेक्ट अनुभव"), l("Technical interview and decision criteria", "तकनीकी इंटरव्यू और निर्णय की शर्तें")],
    image: photography.siteEngineer,
  },
  {
    id: "direct",
    title: l("Direct placement", "सीधी नियुक्ति"),
    subtitle: l("For employees joining your organisation", "आपके संगठन से जुड़ने वाले कर्मचारियों के लिए"),
    heading: l("Your team. Your employment relationship.", "आपकी टीम। आपका रोजगार संबंध।"),
    body: l("Recruit candidates who will join your organisation under your employment contract. We coordinate the agreed sourcing and recruitment steps while you confirm the offer, employment terms and onboarding arrangements.", "उन उम्मीदवारों की भर्ती करें जो आपके रोजगार अनुबंध के अंतर्गत संगठन से जुड़ेंगे। हम तय खोज और भर्ती चरणों में समन्वय करते हैं; आप प्रस्ताव, रोजगार शर्तों और कार्यभार ग्रहण करने की व्यवस्था की पुष्टि करते हैं।"),
    points: [l("Job description and written employment terms", "काम का विवरण और लिखित रोजगार शर्तें"), l("Employer documentation and approval responsibilities", "नियोक्ता के दस्तावेज़ और स्वीकृति की ज़िम्मेदारियाँ"), l("Reporting line and joining arrangements", "रिपोर्टिंग व्यवस्था और कार्यभार ग्रहण करने की तैयारी")],
    image: photography.support,
  },
  {
    id: "recurring",
    title: l("Recurring & contract needs", "नियमित और अनुबंध की ज़रूरतें"),
    subtitle: l("For phased or ongoing requirements", "चरणबद्ध या लगातार ज़रूरतों के लिए"),
    heading: l("Plan the next requirement before it becomes urgent.", "अगली ज़रूरत की समय रहते योजना बनाएँ।"),
    body: l("Discuss repeat hiring, phased projects or contract staffing needs around your operational calendar. The service scope, employment arrangement and responsibilities are confirmed for the destination before work begins.", "अपने काम की समय-सारणी के अनुसार नियमित भर्ती, चरणबद्ध परियोजनाओं या अनुबंध आधारित कामगारों की ज़रूरतों पर चर्चा करें। शुरू करने से पहले संबंधित देश के लिए सेवा का दायरा, रोजगार व्यवस्था और ज़िम्मेदारियाँ तय होती हैं।"),
    points: [l("Expected demand and review intervals", "अनुमानित माँग और समीक्षा का समय"), l("Role mix, lead times and contract duration", "भूमिकाएँ, तैयारी का समय और अनुबंध की अवधि"), l("Service terms and employment responsibilities", "सेवा शर्तें और रोजगार की ज़िम्मेदारियाँ")],
    image: photography.manufacturing,
  },
];

export const employerStages = [
  { title: l("Understand the requirement", "ज़रूरत को समझना"), ours: l("Review your roles, destination, skills and proposed schedule.", "भूमिकाओं, देश, कौशल और प्रस्तावित समय-सारणी की समीक्षा।"), yours: l("Share the job brief, headcount and written working terms.", "काम का विवरण, संख्या और लिखित कार्य शर्तें साझा करें।") },
  { title: l("Source & shortlist", "खोज और शुरुआती चयन"), ours: l("Source candidates and screen profiles against the agreed criteria.", "तय शर्तों के अनुसार उम्मीदवार खोजें और प्रोफाइल जाँचें।"), yours: l("Review profiles and confirm who should move to assessment.", "प्रोफाइल देखकर परीक्षण के लिए उम्मीदवार तय करें।") },
  { title: l("Assess & select", "परीक्षण और चयन"), ours: l("Coordinate skill tests, technical reviews and employer interviews.", "कौशल परीक्षण, तकनीकी समीक्षा और नियोक्ता इंटरव्यू का समन्वय।"), yours: l("Set assessment criteria, interview and make the selection decision.", "परीक्षण की शर्तें तय करें, इंटरव्यू लें और चयन का निर्णय करें।") },
  { title: l("Confirm & document", "पुष्टि और दस्तावेज़"), ours: l("Coordinate candidate documents and applicable processing steps.", "उम्मीदवारों के दस्तावेज़ और लागू प्रक्रिया का समन्वय।"), yours: l("Confirm offers and provide required employer or sponsorship documents.", "प्रस्ताव की पुष्टि करें और नियोक्ता या प्रायोजन के ज़रूरी दस्तावेज़ दें।") },
  { title: l("Prepare for departure", "प्रस्थान की तैयारी"), ours: l("Coordinate role briefings, orientation and departure readiness.", "भूमिका की जानकारी, परिचय और प्रस्थान की तैयारी का समन्वय।"), yours: l("Confirm workplace expectations, induction and arrival arrangements.", "कार्यस्थल की अपेक्षाएँ, परिचय और आगमन की व्यवस्था तय करें।") },
  { title: l("Travel & join", "यात्रा और कार्यभार ग्रहण"), ours: l("Align travel plans, arrival communication and employer handover.", "यात्रा, आगमन की सूचना और नियोक्ता को हैंडओवर का समन्वय।"), yours: l("Receive the team and complete local onboarding arrangements.", "टीम का स्वागत करें और स्थानीय कार्यभार ग्रहण की व्यवस्था पूरी करें।") },
  { title: l("Stay connected", "संपर्क बनाए रखना"), ours: l("Provide check-ins and issue coordination within the agreed scope.", "तय दायरे में नियमित बातचीत और मुद्दों पर समन्वय।"), yours: l("Share workplace feedback and discuss upcoming workforce needs.", "कार्यस्थल की प्रतिक्रिया दें और अगली भर्ती की ज़रूरतें बताएँ।") },
];

export const employerBrief = [
  { title: l("Company & work location", "कंपनी और काम का स्थान"), text: l("Company name, destination, worksite and a decision-maker’s contact.", "कंपनी का नाम, देश, कार्यस्थल और निर्णय लेने वाले व्यक्ति का संपर्क।") },
  { title: l("Roles & numbers", "भूमिकाएँ और संख्या"), text: l("Job titles, day-to-day duties and headcount for each role.", "पद, रोज़ की ज़िम्मेदारियाँ और हर भूमिका के लिए संख्या।") },
  { title: l("Skills & qualifications", "कौशल और योग्यता"), text: l("Experience, trade or degree requirements, licences and language needs.", "अनुभव, ट्रेड या डिग्री की शर्तें, लाइसेंस और भाषा की ज़रूरतें।") },
  { title: l("Employment terms", "रोजगार की शर्तें"), text: l("Contract duration, pay, hours, benefits and accommodation arrangements.", "अनुबंध की अवधि, वेतन, घंटे, सुविधाएँ और रहने की व्यवस्था।") },
  { title: l("Selection preferences", "चयन की प्राथमिकताएँ"), text: l("Interview format, practical tests, assessors and approval process.", "इंटरव्यू का तरीका, व्यावहारिक परीक्षण, मूल्यांकनकर्ता और स्वीकृति प्रक्रिया।") },
  { title: l("Timing & deployment", "समय और तैनाती"), text: l("Target start dates, batch sizes and workplace onboarding capacity.", "प्रस्तावित शुरुआती तारीखें, हर चरण की संख्या और टीम को शामिल करने की क्षमता।") },
];

export const employerFaqs = [
  faqs[0],
  faqs[1],
  { question: l("Can our team conduct interviews and skill tests?", "क्या हमारी टीम इंटरव्यू और कौशल परीक्षण कर सकती है?"), answer: l("Yes. Your team can define the assessment criteria and take part in interviews, technical reviews or practical evaluations. The format, assessors and scheduling are agreed during the requirement discussion; the employer makes the final selection.", "हाँ। आपकी टीम परीक्षण की शर्तें तय कर सकती है और इंटरव्यू, तकनीकी समीक्षा या व्यावहारिक परीक्षण में भाग ले सकती है। ज़रूरतों पर चर्चा के दौरान तरीका, मूल्यांकनकर्ता और समय तय होते हैं। अंतिम चयन नियोक्ता करता है।") },
  faqs[13],
  faqs[3],
  faqs[2],
];

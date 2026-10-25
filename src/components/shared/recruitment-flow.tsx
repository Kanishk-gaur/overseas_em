"use client";
import { useEffect, useId, useRef, useState } from "react";
import { ClipboardList, Search, GraduationCap, Wrench, FileCheck2, ListChecks, Users, FolderCheck, Stethoscope, Plane, BookOpen, Handshake, Headphones, CornerUpLeft, ArrowDown, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale } from "./locale-provider";
import { Eyebrow, Reveal, TextLink } from "./ui";

type FlowStep = { id: string; n: string; title: [string, string]; body: [string, string]; icon: LucideIcon };
const start: FlowStep = { id: "requirement", n: "01", icon: ClipboardList, title: ["Submit Your Workforce Requirement", "कामगारों की ज़रूरत बताएँ"], body: ["Share roles, headcount, experience and the proposed work location.", "पद, संख्या, अनुभव और काम का स्थान बताएँ।"] };
const technical: FlowStep[] = [
  { id: "technical", n: "02", icon: Search, title: ["Search Technical Talent Pool", "तकनीकी प्रतिभा की खोज"], body: ["Find candidates with the professional qualifications the role needs.", "भूमिका के लिए ज़रूरी पेशेवर योग्यता वाले उम्मीदवार खोजें।"] },
  { id: "credentials", n: "03", icon: GraduationCap, title: ["Credential & Portfolio Review", "योग्यता और पोर्टफोलियो की जाँच"], body: ["Review degrees, experience and relevant project work.", "डिग्री, अनुभव और संबंधित परियोजनाओं को देखें।"] },
];
const trades: FlowStep[] = [
  { id: "trades", n: "02", icon: Search, title: ["Search Non-Technical Talent Pool", "कुशल और सामान्य कामगारों की खोज"], body: ["Find candidates for skilled trades and essential operational roles.", "ट्रेड और ज़रूरी कार्यों के लिए उम्मीदवार खोजें।"] },
  { id: "certificates", n: "03", icon: Wrench, title: ["Trade Certificate & Experience Check", "ट्रेड प्रमाणपत्र और अनुभव की जाँच"], body: ["Check trade training and practical work experience.", "ट्रेड प्रशिक्षण और व्यावहारिक अनुभव की जाँच करें।"] },
];
const shared: FlowStep[] = [
  { id: "screening", n: "04", icon: ListChecks, title: ["Screening by Recruitment Desk", "भर्ती टीम द्वारा स्क्रीनिंग"], body: ["Check the candidate against the employer’s requirements.", "नियोक्ता की ज़रूरतों के अनुसार उम्मीदवार की जाँच।"] },
  { id: "shortlist", n: "05", icon: Users, title: ["Shortlist Sent to Client for Review", "नियोक्ता को चयन सूची भेजना"], body: ["The employer reviews the recommended profiles.", "नियोक्ता सुझाए गए प्रोफाइल देखता है।"] },
  { id: "registration", n: "06", icon: FolderCheck, title: ["Candidate Registration & Documentation", "उम्मीदवार पंजीकरण और दस्तावेज़"], body: ["Complete registration and organise required records.", "पंजीकरण पूरा करें और ज़रूरी दस्तावेज़ तैयार रखें।"] },
  { id: "interview", n: "07", icon: Wrench, title: ["Skill Test & Client Interview", "कौशल परीक्षण और नियोक्ता इंटरव्यू"], body: ["Demonstrate the skills required for the job.", "काम के लिए ज़रूरी हुनर दिखाएँ।"] },
  { id: "medical", n: "08", icon: Stethoscope, title: ["Medical Fitness & Police Clearance", "स्वास्थ्य और पुलिस सत्यापन"], body: ["Complete the checks required for this role and destination.", "इस भूमिका और देश के लिए लागू जाँच पूरी करें।"] },
  { id: "visa", n: "09", icon: FileCheck2, title: ["Visa Sponsorship & Work Permit Processing", "वीज़ा प्रायोजन और कार्य अनुमति"], body: ["Coordinate applications; the relevant authorities decide approval.", "आवेदन का समन्वय; स्वीकृति का फैसला संबंधित अधिकारी करते हैं।"] },
  { id: "orientation", n: "10", icon: BookOpen, title: ["Pre-Deployment Training & Orientation", "यात्रा से पहले प्रशिक्षण और तैयारी"], body: ["Prepare for workplace expectations, safety and local culture.", "काम की अपेक्षाओं, सुरक्षा और स्थानीय संस्कृति को समझें।"] },
  { id: "deployment", n: "11", icon: Plane, title: ["Deployment & On-Site Handover", "यात्रा और कार्यस्थल पर हैंडओवर"], body: ["Coordinate travel and the introduction to the employer.", "यात्रा और नियोक्ता से परिचय का समन्वय।"] },
  { id: "support", n: "12", icon: Headphones, title: ["Ongoing Account Support", "लगातार संपर्क और सहयोग"], body: ["Stay connected for follow-up and agreed support.", "आगे की बातचीत और तय सहयोग के लिए जुड़े रहें।"] },
];
const flowChecks: Record<string, [string, string]> = {
  registration: ["Use verified channels. Confirm why each document is needed, and keep copies of everything shared.", "सत्यापित माध्यम इस्तेमाल करें। हर दस्तावेज़ की ज़रूरत पूछें और साझा की गई जानकारी की प्रतियाँ रखें।"],
  interview: ["After selection, review the complete written offer: employer, duties, pay, hours, deductions and living arrangements.", "चयन के बाद पूरा लिखित प्रस्ताव देखें: नियोक्ता, काम, वेतन, घंटे, कटौती और रहने की व्यवस्था।"],
  visa: ["Check the permission for the actual job and destination. Do not treat a tourist visa or a verbal promise as work authorisation.", "वास्तविक काम और देश की अनुमति जाँचें। पर्यटक वीज़ा या मौखिक वादे को कार्य अनुमति न मानें।"],
  orientation: ["Confirm arrival contacts, emergency details, workplace expectations and how to raise a concern.", "आगमन और आपातकालीन संपर्क, काम की अपेक्षाएँ और शिकायत का तरीका जाँचें।"],
  support: ["Agree the support contact, communication channel and scope of follow-up before departure.", "रवानगी से पहले सहयोग का संपर्क, बातचीत का माध्यम और आगे मिलने वाली मदद का दायरा तय करें।"],
};
type Drawing = { width: number; height: number; paths: { d: string; retry?: boolean }[] };

export function RecruitmentFlow() {
  const { t, language } = useLocale();
  const id = useId().replace(/:/g, "");
  const root = useRef<HTMLDivElement>(null);
  const [drawing, setDrawing] = useState<Drawing>({ width: 1, height: 1, paths: [] });
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let frame = 0;
    let active = true;
    const measure = () => {
      if (!active) return;
      const bounds = element.getBoundingClientRect();
      if (bounds.width < 720) {
        setDrawing(previous => previous.paths.length ? { width: 1, height: 1, paths: [] } : previous);
        return;
      }
      const box = (key: string) => {
        const node = element.querySelector<HTMLElement>('[data-flow-node="' + key + '"]')!;
        const b = node.getBoundingClientRect();
        return { x: b.x - bounds.x, y: b.y - bounds.y, width: b.width, height: b.height };
      };
      const edges = [["requirement", "technical-pool"], ["requirement", "trades-pool"], ["technical", "credentials"], ["trades", "certificates"], ["credentials", "screening"], ["certificates", "screening"], ...shared.slice(0, -1).map((step, i) => [step.id, shared[i + 1].id])];
      const paths: { d: string; retry?: boolean }[] = edges.map(([from, to]) => {
        const a = box(from), b = box(to);
        const ax = a.x + a.width / 2, bx = b.x + b.width / 2;
        if (Math.abs(a.y - b.y) < 5) {
          const right = b.x > a.x;
          return { d: "M " + (right ? a.x + a.width : a.x) + " " + (a.y + a.height / 2) + " H " + (right ? b.x - 7 : b.x + b.width + 7) };
        }
        const ay = a.y + a.height, by = b.y - 7, mid = (ay + by) / 2;
        return { d: "M " + ax + " " + ay + " V " + mid + " H " + bx + " V " + by };
      });
      const decision = box("interview"), pool = box("pool");
      paths.push({ d: "M " + (decision.x + decision.width) + " " + (decision.y + decision.height * .64) + " H " + (bounds.width - 3) + " V " + (pool.y - 20) + " H " + (pool.x + pool.width / 2) + " V " + (pool.y - 7), retry: true } as { d: string; retry?: boolean });
      setDrawing({ width: bounds.width, height: bounds.height, paths });
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    element.querySelectorAll("[data-flow-node]").forEach(node => observer.observe(node));
    document.fonts.ready.then(schedule);
    schedule();
    return () => { active = false; observer.disconnect(); cancelAnimationFrame(frame); };
  }, [language]);

  const card = (step: FlowStep) => <div className={"flow-node flow-node-" + step.id} data-flow-node={step.id} key={step.id}><div className="flow-card-shell">
    <article aria-label={t("Step ", "चरण ") + step.n}>
      <div className="flow-card-top"><span className="flow-number">{step.n}</span><step.icon size={23} strokeWidth={1.45} aria-hidden="true" /></div>
      <h3>{t(...step.title)}</h3><p>{t(...step.body)}</p>
      {flowChecks[step.id] && <details className="flow-more"><summary>{t("What to check", "क्या जाँचें")}<Plus size={14} aria-hidden="true" /></summary><p>{t(...flowChecks[step.id])}</p></details>}
      {step.id === "interview" && <div className="flow-decision"><span>{t("Yes · continue to 08", "हाँ · चरण 08 पर जाएँ")}</span><a href={"#" + id + "-pool"}><CornerUpLeft size={14} />{t("No · return to talent pool", "नहीं · प्रतिभा समूह में वापस जाएँ")}</a></div>}
    </article>
  </div></div>;

  return <section className="section recruitment-flow-section" aria-labelledby={id + "-title"}>
    <div className="container">
      <Reveal className="section-heading"><div><Eyebrow>{t("THE RECRUITMENT FLOW", "भर्ती की पूरी प्रक्रिया")}</Eyebrow><h2 id={id + "-title"}>{t("Every stage.\nA clear next step.", "हर चरण।\nअगला कदम स्पष्ट।")}</h2></div><div><p>{t("From the first requirement to ongoing support. Follow the route for professional qualifications or practical trades, then the shared selection journey.", "पहली ज़रूरत से लगातार सहयोग तक। पेशेवर योग्यता या व्यावहारिक ट्रेड का रास्ता चुनें, फिर साझा चयन प्रक्रिया समझें।")}</p><TextLink href="/find-a-job">{t("Guidance for candidates", "उम्मीदवारों के लिए मार्गदर्शन")}</TextLink></div></Reveal>
      <div className="flow-reading-guide"><div><GraduationCap size={21} aria-hidden="true" /><div><strong>{t("Choose the relevant track", "उपयुक्त रास्ता चुनें")}</strong><p>{t("Professional credentials or practical trade experience.", "पेशेवर योग्यता या व्यावहारिक ट्रेड अनुभव।")}</p></div></div><div><Users size={21} aria-hidden="true" /><div><strong>{t("Review, assess & select", "जाँच, मूल्यांकन और चयन")}</strong><p>{t("Both tracks join one employer-led selection journey.", "दोनों रास्ते नियोक्ता की साझा चयन प्रक्रिया में मिलते हैं।")}</p></div></div><div><Plane size={21} aria-hidden="true" /><div><strong>{t("Prepare for work & arrival", "काम और आगमन की तैयारी")}</strong><p>{t("Confirm documents, permissions and arrival arrangements.", "दस्तावेज़, अनुमति और आगमन की व्यवस्था जाँचें।")}</p></div></div></div>
      <div className="flow-chart" ref={root}>
        <svg className="flow-connectors" viewBox={"0 0 " + drawing.width + " " + drawing.height} aria-hidden="true"><defs><marker id={id + "-arrow"} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>{drawing.paths.map((path, i) => <path key={i} className={path.retry ? "flow-return" : ""} d={path.d} markerEnd={"url(#" + id + "-arrow)"} />)}</svg>
        <div className="flow-start">{card(start)}</div>
        <div className="flow-pools" data-flow-node="pool" id={id + "-pool"} tabIndex={-1}>
          <div className="flow-track" data-flow-node="technical-pool"><p className="flow-track-label"><GraduationCap size={17} />{t("TECHNICAL PROFESSIONALS", "तकनीकी पेशेवर")}</p>{technical.map(card)}</div>
          <span className="flow-or">{t("OR", "या")}</span>
          <div className="flow-track" data-flow-node="trades-pool"><p className="flow-track-label"><Wrench size={17} />{t("SKILLED & GENERAL TRADES", "कुशल और सामान्य कामगार")}</p>{trades.map(card)}</div>
        </div>
        <p className="flow-merge-label"><ArrowDown size={16} />{t("Both tracks join the same recruitment process", "दोनों रास्ते साझा भर्ती प्रक्रिया से जुड़ते हैं")}</p>
        <div className="flow-shared">{shared.map(card)}</div>
      </div>
      <div className="flow-footnote"><Handshake size={20} /><p>{t("The exact checks depend on the role and destination. Selection, medical clearance, visas and work permits remain subject to the relevant decisions.", "जाँच भूमिका और देश पर निर्भर करती है। चयन, स्वास्थ्य जाँच, वीज़ा और कार्य अनुमति संबंधित निर्णयों पर निर्भर हैं।")}</p></div>
    </div>
  </section>;
}

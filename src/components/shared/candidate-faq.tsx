"use client";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { candidateFaqs, candidateFaqTopics } from "@/data/candidate-guide";
import { useLocale } from "./locale-provider";
import { Eyebrow } from "./ui";
import { OfficialLink } from "./official-link";

export function CandidateFAQs() {
  const { t, local } = useLocale();
  const [topic, setTopic] = useState("starting");
  const [query, setQuery] = useState("");
  const search = query.trim().toLocaleLowerCase();
  const results = candidateFaqs.filter(item => (!search ? topic === "all" || item.topic === topic : true) && (!search || [item.question.en, item.question.hi, item.answer.en, item.answer.hi].join(" ").toLocaleLowerCase().includes(search)));
  return <section className="section candidate-faq-section" id="candidate-faq" aria-labelledby="candidate-faq-title"><div className="container">
    <div className="guide-heading"><div><Eyebrow>{t("ANSWERS BEFORE YOUR NEXT STEP", "अगले कदम से पहले जवाब")}</Eyebrow><h2 id="candidate-faq-title">{t("Your questions.\nPractical answers.", "आपके सवाल।\nव्यावहारिक जवाब।")}</h2></div><p>{t("20 questions to help you understand preparation, selection and the checks that matter. Choose a topic or search for your question.", "तैयारी, चयन और ज़रूरी जाँच समझने के लिए 20 सवाल। विषय चुनें या अपना सवाल खोजें।")}</p></div>
    <div className="candidate-faq-controls"><div className="guide-filter-pills" aria-label={t("Question topics", "सवालों के विषय")}>{[{id:"all",title:{en:"All questions",hi:"सभी सवाल"}},...candidateFaqTopics].map(item => <button key={item.id} type="button" aria-pressed={!search && topic === item.id} onClick={()=>{setTopic(item.id);setQuery("");}}>{local(item.title)}</button>)}</div><label className="guide-search"><span className="sr-only">{t("Search candidate questions", "उम्मीदवारों के सवाल खोजें")}</span><Search size={18} aria-hidden="true" /><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder={t("Search your question", "अपना सवाल खोजें")} /></label></div>
    <p className="guide-result-count" role="status">{results.length} {t("of 20 questions", "/ 20 सवाल")}</p>
    <div className="candidate-faq-answers">{results.map(item=><details key={item.id}><summary><span>{local(item.question)}</span><Plus size={20} aria-hidden="true" /></summary><div><p>{local(item.answer)}</p>{item.source && <OfficialLink source={item.source} />}</div></details>)}</div>
    {!results.length && <div className="guide-empty"><h3>{t("Try another word", "दूसरा शब्द खोजें")}</h3><p>{t("Try passport, experience, interview or payment.", "पासपोर्ट, अनुभव, इंटरव्यू या भुगतान खोजें।")}</p><button className="button button-navy" onClick={()=>{setQuery("");setTopic("all");}}>{t("Show all questions", "सभी सवाल दिखाएँ")}</button></div>}
  </div></section>;
}

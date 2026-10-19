"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, CircleCheck, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { images } from "@/config/site";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { countries } from "@/data/countries";
import { processSteps } from "@/data/process";
import { useLocale } from "@/components/shared/locale-provider";
import { Button, Eyebrow, Photo, Reveal, TextLink } from "@/components/shared/ui";
import { ContactCTA } from "@/components/shared/contact-cta";
import { FAQ } from "@/components/shared/faq";

export function HomePage() {
  const { d, t, local } = useLocale();
  const reduced = useReducedMotion();
  const featuredIndustries = [industries[0], industries[1], industries[2], industries[3], industries[5], industries[6]];
  const destinationSelection = [countries[0], countries[6], countries[7]];
  const whyItems = [
    [t("Expertise across industries", "कई उद्योगों की समझ"), t("From hands-on trades to professional expertise, an inclusive workforce outlook.", "व्यावहारिक काम से पेशेवर विशेषज्ञता तक, हर तरह के हुनर पर ध्यान।")],
    [t("Your ambitions matter", "आपके सपने मायने रखते हैं"), t("Conversations that start with your skills, circumstances and aspirations.", "आपके हुनर, परिस्थिति और लक्ष्य से शुरू होने वाली बातचीत।")],
    [t("Clarity, from the start", "शुरुआत से स्पष्ट जानकारी"), t("Straightforward guidance, so you can ask questions and make informed decisions.", "सरल मार्गदर्शन ताकि आप सवाल पूछें और सोच-समझकर फैसला लें।")],
    [t("A process you understand", "एक प्रक्रिया जिसे आप समझें"), t("Know the stages, the requirements and the questions to ask at every step.", "हर कदम पर चरण, ज़रूरतें और पूछने वाले सवाल जानें।")],
    [t("Respect for every worker", "हर कामगार का सम्मान"), t("Practical experience deserves the same care as professional qualifications.", "व्यावहारिक अनुभव की उतनी ही कद्र जितनी पेशेवर योग्यता की।")],
    [t("Guidance for the journey", "सफर में मार्गदर्शन"), t("Understand documentation, interviews and the transition to overseas work.", "दस्तावेज़, इंटरव्यू और विदेश में काम की शुरुआत को समझें।")],
  ];
  return <>
    <section className="home-hero">
      <div className="container hero-inner">
        <motion.div className="hero-copy" initial={false} animate={{ opacity: [0, 1], y: [12, 0] }} transition={{ duration: reduced ? 0 : .7 }}>
          <Eyebrow>{d.heroNote}</Eyebrow>
          <h1>{d.heroLine1}<br />{d.heroLine2}<br /><span>{d.heroLine3}</span></h1>
          <p>{d.heroDescription}</p>
          <div className="button-row"><Button href="/services" variant="navy">{d.explore}</Button><Link className="hero-secondary" href="/contact">{d.speak}<ArrowUpRight size={18} /></Link></div>
          <a className="hero-discover" href="#who-we-are"><span><ArrowDown size={16} /></span>{t("A human approach to moving forward", "आगे बढ़ने में आपका साथ")}</a>
        </motion.div>
      </div>
      <figure className="hero-visual">
        <Image src={images.hero} alt={t("Indian manufacturing professionals inspecting a precision component together", "एक सटीक पुर्ज़े की जाँच करते भारतीय तकनीकी पेशेवर")} fill priority sizes="(max-width: 767px) 100vw, 52vw" />
        <figcaption><span>{t("BUILT ON SKILL. DRIVEN BY AMBITION.", "हुनर की ताकत। आगे बढ़ने की चाह।")}</span><span className="hero-visual-line" /><span>{t("INDIA → WORLDWIDE", "भारत → दुनिया भर में")}</span></figcaption>
      </figure>
    </section>
    <div className="trust-strip"><div className="container"><p>{t("ONE PURPOSE. A WIDER HORIZON.", "एक उद्देश्य। नई दिशाएँ।")}</p>{[t("People-first recruitment", "लोगों को प्राथमिकता"),t("Expertise across industries", "कई उद्योगों में सहयोग"),t("Clear guidance, at every step", "हर कदम पर स्पष्ट मार्गदर्शन")].map((item,i)=><div key={item}><span className="trust-number">0{i+1}</span><span>{item}</span></div>)}</div></div>

    <section className="section about-home" id="who-we-are"><div className="container about-grid">
      <Reveal className="about-visual"><Photo src={images.about} alt={t("A skilled metalworker carefully welding in a workshop", "वर्कशॉप में ध्यान से वेल्डिंग करता एक कुशल कामगार")} /><div className="image-note"><span className="note-line" /><p>{t("Practical skill.", "व्यावहारिक हुनर।")}<br /><strong>{t("Extraordinary potential.", "बेहतरीन संभावनाएँ।")}</strong></p><ArrowUpRight size={27} strokeWidth={1} /></div><span className="vertical-caption">{t("THE PEOPLE WHO MAKE PROGRESS POSSIBLE", "वे लोग जो प्रगति को मुमकिन बनाते हैं")}</span></Reveal>
      <Reveal className="about-copy"><Eyebrow>{d.who}</Eyebrow><h2>{d.whoTitle}</h2><p className="body-copy">{d.whoBody}</p><p className="body-copy">{d.whoBody2}</p><div className="principles">{[d.principle1,d.principle2,d.principle3].map(p=><span key={p}><CircleCheck size={17} />{p}</span>)}</div><TextLink href="/about">{d.aboutCta}</TextLink></Reveal>
    </div></section>

    <section className="section services-home surface"><div className="container">
      <Reveal className="section-heading"><div><Eyebrow>{d.services}</Eyebrow><h2>{d.servicesTitle}</h2></div><div><p>{d.servicesBody}</p><TextLink href="/services">{d.allServices}</TextLink></div></Reveal>
      <div className="service-editorial">
        <Reveal><Link href={`/services#${services[0].slug}`} className="service-feature"><Photo src={images.technical} alt={t("A technician inspecting precision industrial equipment", "औद्योगिक उपकरण की जाँच करता तकनीशियन")} /><div className="service-feature-copy"><span className="editorial-number">01</span><div><h3>{local(services[0].title)}</h3><p>{local(services[0].short)}</p></div><ArrowUpRight size={24} /></div></Link></Reveal>
        <div className="service-rows">{services.slice(1,4).map((service,i)=><Reveal key={service.slug} delay={i*.06}><Link href={`/services#${service.slug}`} className="service-row"><span className="editorial-number">0{i+2}</span><div><h3>{local(service.title)}</h3><p>{local(service.short)}</p></div><ArrowUpRight size={22} /></Link></Reveal>)}</div>
      </div>
    </div></section>

    <section className="section industries-home"><div className="container">
      <Reveal className="section-heading"><div><Eyebrow>{d.industries}</Eyebrow><h2>{d.industriesTitle}</h2></div><div><p>{d.industriesBody}</p><TextLink href="/industries">{d.allIndustries}</TextLink></div></Reveal>
      <div className="industry-bento">{featuredIndustries.map((industry,i)=><Link className={`industry-tile industry-tile-${i}`} href={`/industries#${industry.slug}`} key={industry.slug}><Image src={industry.image} alt={local(industry.title)} fill sizes={i===0?"(max-width: 767px) 100vw, 50vw":"(max-width: 767px) 50vw, 35vw"} /><div className="tile-shade" /><div className="industry-tile-copy"><h3>{local(industry.title)}</h3><ArrowUpRight size={22} /></div></Link>)}</div>
      <div className="industry-more"><span>{t("ALSO WITHIN OUR FOCUS", "हमारे अन्य कार्य क्षेत्र")}</span>{industries.filter(x=>!featuredIndustries.includes(x)).map(x=><Link href={`/industries#${x.slug}`} key={x.slug}>{local(x.title)}<ArrowUpRight size={14} /></Link>)}</div>
    </div></section>

    <section className="section reach-home"><div className="container">
      <Reveal className="section-heading"><div><Eyebrow light>{d.reach}</Eyebrow><h2>{d.reachTitle}</h2></div><div><p>{d.reachBody}</p><TextLink href="/countries" light>{d.allCountries}</TextLink></div></Reveal>
      <div className="destination-grid">{destinationSelection.map((country,i)=><Link className="destination-card" href={`/countries#${country.slug}`} key={country.slug}><div className="destination-image"><Image src={country.image} alt={local(country.name)} fill sizes="(max-width: 767px) 86vw, 33vw" /></div><div className="destination-copy"><span>{local(country.region)}</span><h3>{local(country.name)}</h3><ArrowUpRight size={21} /></div><span className="destination-index" aria-hidden="true">0{i+1}</span></Link>)}</div>
      <div className="destination-foot"><div>{["Saudi Arabia","Qatar","Oman","Kuwait","Bahrain","Poland","Romania","United Kingdom"].map(name=>{const country=countries.find(c=>c.name.en===name)!;return <Link key={name} href={`/countries#${country.slug}`}>{local(country.name)}</Link>})}<Link href="/countries#other-destinations">{t("& beyond", "और आगे")}</Link></div><p>{d.destinationNote}</p></div>
    </div></section>

    <section className="section process-home"><div className="container">
      <Reveal className="section-heading"><div><Eyebrow>{d.process}</Eyebrow><h2>{d.processTitle}</h2></div><div><p>{d.processBody}</p><TextLink href="/process">{d.processCta}</TextLink></div></Reveal>
      <div className="process-grid">{processSteps.map((step,i)=><Reveal key={step.title.en} delay={(i%4)*.05} className="process-step"><div className="process-marker"><span>{String(i+1).padStart(2,"0")}</span><span className="process-line" /></div><h3>{local(step.title)}</h3><p>{local(step.description)}</p></Reveal>)}</div>
      <p className="process-footnote"><ShieldCheck size={17} />{t("Every journey is individual. Selection and approvals are never guaranteed.", "हर सफर अलग है। चयन और अनुमतियों की गारंटी नहीं दी जाती।")}</p>
    </div></section>

    <section className="section why-home"><div className="container why-layout"><Reveal className="why-heading"><Eyebrow>{d.why}</Eyebrow><h2>{d.whyTitle}</h2><p>{t("An international move is a personal decision. Our approach gives your questions, your circumstances and your ambitions the attention they deserve.", "विदेश जाने का फैसला व्यक्तिगत होता है। हम आपके सवालों, परिस्थितियों और सपनों को ध्यान से समझने पर ज़ोर देते हैं।")}</p><TextLink href="/about">{t("The principles behind our work", "हमारे काम के सिद्धांत")}</TextLink></Reveal><div className="why-grid">{whyItems.map(([title,body],i)=><Reveal key={title} className="why-item"><span className="editorial-number">0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div></Reveal>)}</div></div></section>

    <section className="story-home"><div className="story-portrait"><Image src={images.portrait} alt={t("An Indian skilled tradesman at his workshop bench", "अपनी वर्कशॉप में एक भारतीय कुशल कारीगर")} fill sizes="(max-width: 767px) 100vw, 50vw" /><span>{t("THE PERSON BEHIND THE PROFESSION", "हर पेशे के पीछे एक इंसान")}</span></div><Reveal className="story-copy"><Eyebrow>{d.storyEyebrow}</Eyebrow><h2>{d.storyTitle}</h2><p>{d.storyBody}</p><TextLink href="/about">{t("People are our starting point", "हमारी शुरुआत लोगों से होती है")}</TextLink></Reveal></section>

    <section className="employer-home"><div className="employer-photo"><Image src={images.manufacturing} alt={t("Precision machinery on an industrial production floor", "औद्योगिक उत्पादन में सटीक मशीनरी")} fill sizes="(max-width: 767px) 100vw, 45vw" /></div><div className="container"><Reveal className="employer-copy"><Eyebrow light>{d.employerEyebrow}</Eyebrow><h2>{d.employerTitle}</h2><p>{d.employerBody}</p><div className="employer-tags">{[t("Skilled & technical", "कुशल और तकनीकी"),t("Industrial & general", "औद्योगिक और सामान्य"),t("Cross-sector support", "कई क्षेत्रों में सहयोग")].map(x=><span key={x}><Check size={15} />{x}</span>)}</div><Button href="/employers">{d.employerCta}</Button></Reveal></div></section>
    <FAQ /><ContactCTA />
  </>;
}

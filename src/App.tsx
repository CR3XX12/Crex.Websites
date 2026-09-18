import { FormEvent, useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Globe2, Mail, Menu, MessageCircle, X } from "lucide-react";
import en from "./locales/en.json";
import es from "./locales/es.json";

type Language = "es" | "en";
type Content = typeof es;

const translations: Record<Language, Content> = { es, en };
const LANGUAGE_KEY = "crex-websites-language";
const EMAIL = "crex.a10@hotmail.com";
const WHATSAPP_CA = "16475126606";
const WHATSAPP_MX = "525662754418";

function getInitialLanguage(): Language {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  return saved === "en" || saved === "es" ? saved : "es";
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error" | "unconfigured">("idle");
  const content = translations[language];

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = content.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", content.meta.description);
  }, [content.meta.description, content.meta.title, language]);

  const closeMenu = () => setMenuOpen(false);
  const toggleLanguage = () => setLanguage((current) => current === "es" ? "en" : "es");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(event.currentTarget);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setFormStatus("unconfigured");
      return;
    }

    data.append("access_key", accessKey);
    data.append("subject", `New Crex Websites inquiry — ${String(data.get("business") || data.get("name"))}`);
    data.append("from_name", "Crex Websites");
    data.append("language", language.toUpperCase());
    setFormStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const result = await response.json() as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Submission failed");
      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <>
      <header className="siteHeader">
        <a className="logo" href="#top" aria-label="Crex Websites">
          <span className="logoMark">C</span><span>CREX<span className="logoLight">/WEB</span></span>
        </a>
        <nav className={menuOpen ? "nav navOpen" : "nav"} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>{content.nav.work}</a>
          <a href="#services" onClick={closeMenu}>{content.nav.services}</a>
          <a href="#process" onClick={closeMenu}>{content.nav.process}</a>
          <a href="#contact" onClick={closeMenu}>{content.nav.contact}</a>
        </nav>
        <div className="headerActions">
          <button className="languageButton" type="button" onClick={toggleLanguage} aria-label={content.nav.language}>
            <Globe2 size={17} /><span>{language === "es" ? "EN" : "ES"}</span>
          </button>
          <a className="headerCta" href="#contact">{content.nav.quote}<ArrowUpRight size={17} /></a>
          <button className="menuButton" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={content.nav.menu}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <img className="heroImage" src="/images/studio-hero.png" alt="Modern web design studio workspace" />
          <div className="heroShade" />
          <div className="heroInner">
            <p className="eyebrow light">{content.hero.eyebrow}</p>
            <h1>{content.hero.titleStart} <em>{content.hero.titleAccent}</em></h1>
            <p className="heroCopy">{content.hero.body}</p>
            <div className="heroActions">
              <a className="button buttonPrimary" href="#contact">{content.hero.primary}<ArrowRight size={19} /></a>
              <a className="button buttonGhost" href="#work">{content.hero.secondary}</a>
            </div>
          </div>
          <div className="availability"><span />{content.hero.availability}</div>
          <a className="scrollCue" href="#work"><span>{content.hero.scroll}</span><ArrowDown size={17} /></a>
        </section>

        <div className="ticker" aria-label="Capabilities">
          <div>{[...content.ticker, ...content.ticker].map((item, index) => <span key={`${item}-${index}`}>{item}<i>+</i></span>)}</div>
        </div>

        <section className="work section" id="work">
          <div className="sectionLead">
            <div><p className="eyebrow">{content.work.eyebrow}</p><h2>{content.work.title}</h2></div>
            <p>{content.work.intro}</p>
          </div>
          <article className="caseStudy">
            <div className="browserFrame">
              <div className="browserBar"><div><span /><span /><span /></div><span>website-demo1-psi.vercel.app</span></div>
              <iframe title="Teo's Barbershop live website" src="https://website-demo1-psi.vercel.app/" loading="lazy" />
              <a className="frameLink" href="https://website-demo1-psi.vercel.app/" target="_blank" rel="noreferrer">{content.work.live}<ArrowUpRight size={16} /></a>
            </div>
            <div className="caseInfo">
              <div><p className="eyebrow">{content.work.caseLabel}</p><h3>{content.work.name}</h3><p className="category">{content.work.category}</p></div>
              <p>{content.work.description}</p>
              <ul>{content.work.metrics.map((metric) => <li key={metric}><Check size={16} />{metric}</li>)}</ul>
              <a className="textLink" href="https://website-demo1-psi.vercel.app/" target="_blank" rel="noreferrer">{content.work.visit}<ArrowUpRight size={18} /></a>
            </div>
          </article>
        </section>

        <section className="services section" id="services">
          <div className="sectionLead">
            <div><p className="eyebrow">{content.services.eyebrow}</p><h2>{content.services.title}</h2></div>
          </div>
          <div className="serviceList">
            {content.services.items.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.body}</p><ArrowUpRight /></article>)}
          </div>
        </section>

        <section className="statement">
          <p>{content.statement.line1}</p><strong>{content.statement.line2}</strong>
        </section>

        <section className="process section" id="process">
          <div className="sectionLead">
            <div><p className="eyebrow">{content.process.eyebrow}</p><h2>{content.process.title}</h2></div>
          </div>
          <div className="processGrid">
            {content.process.steps.map((step) => <article key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></article>)}
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contactIntro">
            <p className="eyebrow light">{content.contact.eyebrow}</p><h2>{content.contact.title}</h2><p>{content.contact.body}</p>
            <div className="directLinks">
              <a href={`mailto:${EMAIL}`}><Mail size={18} /><span>{content.contact.emailAction}<small>{EMAIL}</small></span></a>
              <a href={`https://wa.me/${WHATSAPP_CA}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>{content.contact.canada}<small>+1 647-512-6606</small></span></a>
              <a href={`https://wa.me/${WHATSAPP_MX}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>{content.contact.mexico}<small>+52 56 6275 4418</small></span></a>
            </div>
          </div>
          <form className="quoteForm" onSubmit={handleSubmit}>
            <input className="botcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
            <label>{content.contact.name}<input name="name" required placeholder={content.contact.namePlaceholder} /></label>
            <label>{content.contact.email}<input name="email" type="email" required placeholder={content.contact.emailPlaceholder} /></label>
            <label className="fullField">{content.contact.business}<input name="business" placeholder={content.contact.businessPlaceholder} /></label>
            <label className="fullField">{content.contact.project}<textarea name="project" required rows={5} placeholder={content.contact.projectPlaceholder} /></label>
            <button className="button formButton" type="submit" disabled={formStatus === "sending"}>
              {formStatus === "sending" ? content.contact.sending : content.contact.send}<ArrowRight size={19} />
            </button>
            <p className={`responseNote ${formStatus === "success" ? "successMessage" : ""}`} aria-live="polite">
              {formStatus === "success" && content.contact.success}
              {formStatus === "error" && content.contact.error}
              {formStatus === "unconfigured" && content.contact.unconfigured}
              {formStatus === "idle" && content.contact.response}
            </p>
          </form>
        </section>
      </main>

      <footer>
        <a className="logo footerLogo" href="#top"><span className="logoMark">C</span><span>CREX<span className="logoLight">/WEB</span></span></a>
        <p>{content.footer.tagline}</p>
        <div><span>© {new Date().getFullYear()} {content.footer.rights}</span><a href="#top">{content.footer.back}<ArrowUpRight size={15} /></a></div>
      </footer>
    </>
  );
}

export default App;

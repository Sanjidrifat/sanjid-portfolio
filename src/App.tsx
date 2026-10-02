import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  about,
  alsoBuilding,
  contact,
  experience,
  hero,
  method,
  person,
  projects,
  recognition,
  type Project,
} from "./content/site";
import { Diagram } from "./components/Diagrams";
import { Confirm, DiagramPlate, Photo, TitleBlock } from "./components/Parts";

function TopBar() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (bar.current) bar.current.style.width = `${max > 0 ? (h.scrollTop / max) * 100 : 0}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <a className="brand" href="#top">
          <b>{person.name}</b>
        </a>
        <nav className="nav mono" aria-label="Sections">
          <a href="#method">How I work</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="mono mute coords">{person.coordinates}</span>
      </div>
      <div className="progress" ref={bar} />
    </header>
  );
}

function Hero() {
  const [first, second] = hero.headline.split("—");
  return (
    <section className="hero" id="top">
      <div className="grid-paper" />
      <div className="wrap hero-inner">
        <div className="identity mono rise" style={{ animationDelay: "0.05s" }}>
          {person.identity.map((w) => (
            <span key={w}>{w}.</span>
          ))}
        </div>
        <h1 className="display rise" style={{ animationDelay: "0.15s" }}>
          {first}
          {second !== undefined && (
            <>
              <span className="dash">—</span>
              {second}
            </>
          )}
        </h1>
        <div className="hero-foot rise" style={{ animationDelay: "0.35s" }}>
          <p className="hero-support">{hero.support}</p>
          <div className="ctas">
            <a className="btn primary" href="#work">
              {hero.primaryCta} <span className="arrow">→</span>
            </a>
            <a className="btn" href="#contact">
              {hero.secondaryCta}
            </a>
          </div>
        </div>
        <div className="ledger rise" style={{ animationDelay: "0.5s" }}>
          <div>
            <span className="mono mute">Now</span>
            <span className="v">Co-Founder & CPO, ZEROOZEN Energy</span>
          </div>
          <div>
            <span className="mono mute">In the field</span>
            <span className="v">400+ light EVs under active fleet management</span>
          </div>
          <div>
            <span className="mono mute">Based in</span>
            <span className="v">{person.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section className="thesis">
      <div className="wrap">
        <blockquote>
          I don’t just build things. <em>I make them work in the real world.</em>
        </blockquote>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section className="section" id="method">
      <div className="wrap">
        <TitleBlock sheet="01" name="Operating model" refCode="SHAR-01 · Rev A" />
        <div className="method-head">
          <h2 className="display h2">{method.title}</h2>
          <p>{method.lede}</p>
        </div>
        <ol className="loop" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {method.steps.map((s, i) => (
            <li className="station" key={s.key}>
              <div className="n mono">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span>{i < method.steps.length - 1 ? "→" : "↺"}</span>
              </div>
              <h3>{s.key}</h3>
              <p>{s.line}</p>
            </li>
          ))}
        </ol>
        <div className="loop-return mono mute">
          <span>Learn</span>
          <span className="line" />
          <span>back to Reality</span>
        </div>
        <p className="closing">{method.closing}</p>
      </div>
    </section>
  );
}

function ProjectBlock({ p }: { p: Project }) {
  const [main, sub] = p.name.split(" + ");
  return (
    <article className="project" id={p.id}>
      <div className="project-head">
        <span className="project-index">
          {p.index} / {String(projects.length).padStart(2, "0")}
        </span>
        <div>
          <h3 className="display project-name">
            {main}
            {sub && <small>+ {sub}</small>}
          </h3>
          <div className="project-meta mono mute">
            <span>{p.kind}</span>
            <span>{p.date}</span>
            <span>ZEROOZEN Energy</span>
          </div>
        </div>
      </div>

      <div className="project-body">
        <div className="plates">
          <DiagramPlate caption={`Fig. ${p.index}.1 · ${p.kind}`} code={`SHAR-${p.index}-D`}>
            <Diagram kind={p.diagram} />
          </DiagramPlate>
        </div>
        <div>
          <p className="project-summary">{p.summary}</p>
          <div className="specs">
            {p.figures.map((f) => (
              <div className="spec" key={f.label}>
                <span className="v">{f.value}</span>
                <span className="l">
                  {f.label}
                  <Confirm show={f.confirm} />
                </span>
              </div>
            ))}
          </div>
          <div className="disciplines mono">
            {p.disciplines.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="side-photo">
            <Photo plate={p.plate} path={`/images/${p.id}/photo.jpg`} />
          </div>
        </div>
      </div>

      <ol className="track" style={{ listStyle: "none", padding: 0 }} aria-label={`${p.name}, from reality to result`}>
        {p.stages.map((s, i) => (
          <li key={s.label} className={`stage${i === p.stages.length - 1 ? " result" : ""}`}>
            <div className="label mono">
              <span className={i === p.stages.length - 1 ? "accent" : ""}>{s.label}</span>
              {i < p.stages.length - 1 && <span className="arr">→</span>}
            </div>
            <p>
              {s.body}
              <Confirm show={s.confirm} />
            </p>
          </li>
        ))}
      </ol>

      <div className="notes">
        <span className="mono mute">Field notes</span>
        <ul>
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <TitleBlock sheet="02" name="Selected work" refCode="SHAR-02 · Rev A" />
        <h2 className="display h2">Selected work</h2>
        <p className="work-intro">
          Four pieces of one system, read the same way: what was really happening, what I noticed, what I decided to
          bet on, what I built, and what changed.
        </p>
        {projects.map((p) => (
          <ProjectBlock key={p.id} p={p} />
        ))}

        <div className="also">
          <div className="titleblock mono" style={{ marginBottom: 24 }}>
            <span className="accent">Also</span>
            <span className="name">Around the system</span>
            <span className="ref mute">SHAR-02-X</span>
          </div>
          {alsoBuilding.map((a) => (
            <div className="also-row" key={a.name}>
              <b>{a.name}</b>
              <p>{a.line}</p>
              <span className="mono mute">
                {a.status}
                <Confirm show={a.confirm} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <TitleBlock sheet="03" name="About" refCode="SHAR-03 · Rev A" />
        <div className="about-grid">
          <Photo plate={about.portrait} path="/images/portrait.jpg" tall />
          <div className="about-copy">
            <h2 className="display h2">About</h2>
            {about.paragraphs.map((t, i) => (
              <p key={i}>
                {t}
                <Confirm show={about.confirmParagraphs.includes(i)} />
              </p>
            ))}
          </div>
        </div>

        <div className="record">
          <div className="titleblock mono" style={{ marginBottom: 0, borderBottom: 0 }}>
            <span className="accent">Record</span>
            <span className="name">Experience and education</span>
            <span className="ref mute">SHAR-03-R</span>
          </div>
          <div className="rows">
            {experience.map((r) => (
              <div className="row" key={r.role + r.org}>
                <span className="mono mute period">{r.period}</span>
                <h3>
                  {r.org}
                  <span>{r.role}</span>
                </h3>
                <p>
                  {r.note}
                  <Confirm show={r.confirm} />
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="record">
          <div className="titleblock mono" style={{ marginBottom: 0, borderBottom: 0 }}>
            <span className="accent">Recognition</span>
            <span className="name">Programs and features</span>
            <span className="ref mute">SHAR-03-H</span>
          </div>
          <div className="rows">
            {recognition.map((h) => (
              <div className="row" key={h.name}>
                <span className="mono mute period">
                  {h.year}
                  <Confirm show={h.confirm} />
                </span>
                <h3>{h.name}</h3>
                <p>{h.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!data.name || !data.email || !data.message) {
      setNote("Add your name, email and a message so I can reply.");
      return;
    }
    if (contact.endpoint) {
      try {
        const res = await fetch(contact.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(String(res.status));
        setNote("Sent. I’ll reply to the email you gave.");
        e.currentTarget.reset();
      } catch {
        setNote(`That didn’t send. Please email ${person.email} directly.`);
      }
      return;
    }
    const subject = `Conversation: ${data.organization || data.name}`;
    const body = `${data.message}\n\n${data.name}${data.organization ? `, ${data.organization}` : ""}\n${data.email}`;
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNote(`Your email app should open with this message. If it doesn’t, write to ${person.email}.`);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <TitleBlock sheet="04" name="Contact" refCode="SHAR-04 · Rev A" />
        <div className="contact-grid">
          <div>
            <h2 className="display">{contact.heading}</h2>
            <p className="lede">{contact.lede}</p>
            <div className="direct mono">
              {person.email && (
                <button type="button" onClick={copyEmail}>
                  {person.email} <span className="mute">{copied ? "· copied" : "· copy"}</span>
                </button>
              )}
              {person.linkedin && (
                <a href={person.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              )}
              <span className="mute">{person.location}</span>
            </div>
          </div>
          <form className="f" onSubmit={onSubmit} noValidate>
            <div className="two">
              <label className="field" htmlFor="name">
                <span className="mono mute">Name</span>
                <input id="name" name="name" autoComplete="name" placeholder="Your name" />
              </label>
              <label className="field" htmlFor="email">
                <span className="mono mute">Email</span>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" />
              </label>
            </div>
            <label className="field" htmlFor="organization">
              <span className="mono mute">Organization</span>
              <input id="organization" name="organization" autoComplete="organization" placeholder="Where you work" />
            </label>
            <label className="field" htmlFor="message">
              <span className="mono mute">Message</span>
              <textarea id="message" name="message" placeholder="What is happening on the ground?" />
            </label>
            <div className="ctas" style={{ alignItems: "center" }}>
              <button className="btn primary" type="submit">
                {contact.cta} <span className="arrow">→</span>
              </button>
            </div>
            <p className="form-note mono mute" aria-live="polite">
              {note}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Thesis />
        <Method />
        <Work />
        <About />
        <Contact />
      </main>
      <footer className="footer">
        <div className="wrap mono mute">
          <span>© {new Date().getFullYear()} {person.name}</span>
          <span>See the reality. Build it. Make the system work.</span>
          <span>{person.coordinates}</span>
        </div>
      </footer>
    </>
  );
}

import { useEffect, useState } from "react";
import {
  datasheet,
  hero,
  life,
  method,
  moves,
  people,
  person,
  recognition,
  record,
  stories,
  timeline,
  updated,
  type Block,
  type Entry,
  type Plate,
  type Story,
} from "./content/sanjid";
import { Diagram } from "./components/Diagrams";

/* One long page. Sections are addressed by plain hash tokens so links work
 * as static files and inside previews. */
const SECTIONS = [
  { id: "about", label: "About" },
  { id: "photos", label: "Photos" },
  { id: "work", label: "Work" },
  { id: "life", label: "Life" },
  { id: "contact", label: "Contact" },
];

/* Photos already shown in the timeline are not repeated inside a story. */
const inTimeline = new Set(timeline.map((t) => t.plate.src));

export default function App() {
  /* A link straight to a project (#zenpack) opens it. */
  useEffect(() => {
    const open = () => openProject(window.location.hash.slice(1));
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Datasheet />
        <Timeline />
        <Work />
        <Method />
        <Moves />
        <Life />
        <Record />
        <Contact />
      </main>
      <footer className="foot wrap">
        <span>{person.name}</span>
        <span>Updated {updated}</span>
      </footer>
    </>
  );
}

/* ---------- pieces ---------- */

function useDhakaTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit" }).format(new Date());
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Header() {
  const time = useDhakaTime();
  return (
    <header className="top wrap">
      <a className="mark" href="#main">
        {person.name}
      </a>
      <nav aria-label="Sections">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.label}
          </a>
        ))}
      </nav>
      <span className="clock" title="Local time in Dhaka">
        Dhaka {time}
      </span>
    </header>
  );
}

function Photo({ plate, caption, className }: { plate: Plate; caption?: string; className?: string }) {
  if (!plate.src) return null;
  return (
    <figure className={`photo${className ? ` ${className}` : ""}`}>
      <img src={plate.src} alt={plate.alt} loading="lazy" decoding="async" width={1000} height={Math.round(1000 / (plate.ratio ?? 1))} />
      <figcaption>{caption ?? plate.caption}</figcaption>
    </figure>
  );
}

function SectionHead({ id, title, note }: { id: string; title: string; note?: string }) {
  return (
    <div className="section-head">
      <h2 id={`${id}-title`}>{title}</h2>
      {note && <p className="note">{note}</p>}
    </div>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-name">
      <h1 id="hero-name" className="giant" aria-label={person.name}>
        {person.first}
      </h1>
      <div className="hero-grid">
        <Photo plate={hero.photo} className="hero-photo" />
        <div className="hero-text">
          <p className="greeting">{hero.greeting}</p>
          <p className="intro">{hero.intro}</p>
        </div>
      </div>
    </section>
  );
}

function Datasheet() {
  return (
    <section id="about" className="wrap band-section" aria-labelledby="about-title">
      <SectionHead id="about" title={datasheet.title} note={`${person.fullName}. ${datasheet.rev}.`} />
      <div className="sheet">
        <dl className="sheet-table">
          {datasheet.rows.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
        <Photo plate={datasheet.portrait} className="sheet-photo" />
      </div>
    </section>
  );
}

function Timeline() {
  const years = timeline.map((t) => t.when.slice(-4));
  return (
    <section id="photos" className="timeline" aria-labelledby="photos-title">
      <div className="wrap">
        <SectionHead id="photos" title="Along the way" note="Ten photographs from 2017 to 2026, in the order they were taken." />
        <div className="reel-controls">
          <button type="button" onClick={() => scrollReel(-1)} aria-label="Earlier photographs">
            ←
          </button>
          <button type="button" onClick={() => scrollReel(1)} aria-label="Later photographs">
            →
          </button>
        </div>
      </div>
      <ol className="reel" id="reel" tabIndex={0} aria-label="Photographs in date order">
        {timeline.map((t, i) => (
          <li key={t.plate.src} className={i > 0 && years[i] !== years[i - 1] ? "new-year" : undefined}>
            <span className="year">{years[i] !== years[i - 1] ? years[i] : ""}</span>
            <Photo plate={t.plate} caption={t.caption} />
            <span className="when">{t.when}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function scrollReel(dir: number) {
  const reel = document.getElementById("reel");
  if (reel) reel.scrollBy({ left: dir * reel.clientWidth * 0.8, behavior: "smooth" });
}

function Work() {
  return (
    <section id="work" className="wrap" aria-labelledby="work-title">
      <SectionHead
        id="work"
        title="Work"
        note="Four things I have spent a lot of time trying to make work at ZEROOZEN. Open one to read how it came about."
      />
      <div className="projects">
        {stories.map((s) => (
          <Project key={s.id} story={s} />
        ))}
      </div>
    </section>
  );
}

function Project({ story }: { story: Story }) {
  const need = story.blocks.find((b) => b.kind === "p") as { text: string } | undefined;
  return (
    <details className="project" id={story.id}>
      <summary>
        <span className="p-when">{story.when}</span>
        <span className="p-name">{story.name}</span>
        <span className="p-dek">{story.dek}</span>
        <span className="p-open" aria-hidden="true" />
      </summary>
      <div className="p-body">
        <div className="p-story">
          {need && <p className="p-lead">{need.text}</p>}
          <Blocks blocks={story.blocks.slice(story.blocks.indexOf(need as Block) + 1)} story={story} />
        </div>
        <aside className="p-facts" aria-label={`${story.name} in figures`}>
          <dl>
            {story.notes.map((n) => (
              <div key={n.label}>
                <dt>{n.label}</dt>
                <dd>{n.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </details>
  );
}

function Blocks({ blocks, story }: { blocks: Block[]; story: Story }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h":
            return (
              <h3 key={i}>
                {b.text}
                {b.when && <span>{b.when}</span>}
              </h3>
            );
          case "list":
            return (
              <ul key={i}>
                {b.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            );
          case "diagram":
            return (
              <figure key={i} className="diagram">
                <div className="frame">
                  <Diagram kind={story.diagram} />
                </div>
                <figcaption>{story.diagramCaption}</figcaption>
              </figure>
            );
          case "photo":
            return inTimeline.has(b.plate.src) ? null : <Photo key={i} plate={b.plate} />;
          case "pair": {
            const rest = b.plates.filter((p) => !inTimeline.has(p.src));
            return rest.map((p) => <Photo key={`${i}-${p.src}`} plate={p} />);
          }
          default:
            return null; // gaps are notes for Sanjid and never render
        }
      })}
    </>
  );
}

function Method() {
  return (
    <section className="wrap" aria-labelledby="method-title">
      <SectionHead id="method" title="How I work" />
      <ol className="method">
        {method.map((m, i) => (
          <li key={m.story}>
            <span className="m-num">{i + 1}</span>
            <p className="m-text">{m.text}</p>
            <p className="m-seen">
              {m.seen} <a href={`#${m.story}`} onClick={() => openProject(m.story)}>{stories.find((s) => s.id === m.story)?.name}</a>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* Following a link to a project opens it. */
function openProject(id: string) {
  const el = document.getElementById(id);
  if (el instanceof HTMLDetailsElement) el.open = true;
}

function Moves() {
  return (
    <section className="wrap moves" aria-labelledby="moves-title">
      <SectionHead id="moves" title="What moves me" />
      <div className="moves-grid">
        <p className="big-quote">{moves.text}</p>
        <ul className="people" aria-label="People I keep coming back to">
          {people.map((p) => (
            <li key={p.name}>
              <span className="who">{p.name}</span>
              <span className="why">{p.line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Life() {
  return (
    <section id="life" className="wrap" aria-labelledby="life-title">
      <SectionHead id="life" title="Life" note={life.intro} />
      <div className="life-grid">
        {life.photos.map((p, i) => (
          <Photo key={p.src} plate={p} className={`life-${i + 1}`} />
        ))}
      </div>
    </section>
  );
}

function Record() {
  return (
    <section className="wrap" aria-labelledby="record-title">
      <SectionHead id="record" title="Record" />
      <div className="record">
        <Entries heading="Work and study" items={record} />
        <Entries heading="Recognition" items={recognition} />
      </div>
    </section>
  );
}

function Entries({ heading, items }: { heading: string; items: Entry[] }) {
  return (
    <div className="entries">
      <h3>{heading}</h3>
      <ul>
        {items.map((e) => (
          <li key={e.what + e.where}>
            <span className="e-when">{e.when}</span>
            <span className="e-what">
              {e.what}
              <span>{e.where}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const sel = window.getSelection();
      const node = document.getElementById("email");
      if (sel && node) {
        sel.selectAllChildren(node);
      }
    }
  };
  return (
    <section id="contact" className="wrap contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Write to me</h2>
      <p className="email">
        <a id="email" href={`mailto:${person.email}`}>
          {person.email}
        </a>
        <button type="button" onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </p>
      <p className="links">
        {person.links
          .filter((l) => l.url)
          .map((l) => (
            <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
      </p>
    </section>
  );
}

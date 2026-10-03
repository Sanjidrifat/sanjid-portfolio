import { useEffect, useState, type FormEvent } from "react";
import {
  SHOW_DRAFTS,
  img,
  about,
  contact,
  home,
  life,
  now,
  person,
  recognition,
  record,
  stories,
  thinking,
  work,
  type Block,
  type Entry,
  type Story,
} from "./content/site";
import { Confirm, DiagramPlate, Photo } from "./components/Parts";
import { Diagram } from "./components/Diagrams";

/* Pages are addressed by a plain hash token (#about, #zenpack) so the site
 * works as static files and inside previews that only allow simple hashes. */
type Page = "home" | "about" | "work" | "thinking" | "life" | "now" | "contact" | Story["id"];

const DRAFT_PAGES = ["thinking", "life", "now"];

function pageFromHash(): Page {
  const h = window.location.hash.replace(/^#/, "");
  if (["about", "work", "contact"].includes(h)) return h;
  if (DRAFT_PAGES.includes(h)) return SHOW_DRAFTS ? h : "home";
  if (stories.some((s) => s.id === h)) return h;
  return "home";
}

function usePage() {
  const [page, setPage] = useState<Page>(pageFromHash);
  useEffect(() => {
    const on = () => {
      setPage(pageFromHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return page;
}

const NAV: { id: Page; label: string; draft?: boolean }[] = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "thinking", label: "Thinking", draft: true },
  { id: "life", label: "Life", draft: true },
  { id: "now", label: "Now", draft: true },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const page = usePage();
  const story = stories.find((s) => s.id === page);
  const section = story ? "work" : page;

  useEffect(() => {
    const label = story ? story.name : NAV.find((n) => n.id === page)?.label;
    document.title = label ? `${label} · ${person.name}` : person.name;
  }, [page, story]);

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>
        Skip to content
      </a>
      <header className="top">
        <div className="col-wide top-inner">
          <a className="name" href="#home">
            {person.name}
          </a>
          <nav className="nav" aria-label="Pages">
            {NAV.filter((n) => SHOW_DRAFTS || !n.draft).map((n) => (
              <a key={n.id} href={`#${n.id}`} aria-current={section === n.id ? "page" : undefined}>
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1} key={page}>
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "work" && <WorkIndex />}
        {story && <StoryPage story={story} />}
        {page === "thinking" && <Thinking />}
        {page === "life" && <Life />}
        {page === "now" && <Now />}
        {page === "contact" && <Contact />}
      </main>

      <footer className="foot">
        <div className="col-wide foot-inner">
          <span>{person.name}</span>
          <span>{person.location}</span>
          <a href={`mailto:${person.email}`}>{person.email}</a>
          {SHOW_DRAFTS && <span className="draft-flag">Draft preview. Notes in dashed boxes are for Sanjid.</span>}
        </div>
      </footer>
    </>
  );
}

/* ---------- shared pieces ---------- */

function Gap({ ask }: { ask: string }) {
  if (!SHOW_DRAFTS) return null;
  return (
    <aside className="gap">
      <span className="gap-label">For Sanjid to add</span>
      <span>{ask}</span>
    </aside>
  );
}

function Blocks({ blocks, story }: { blocks: Block[]; story?: Story }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "p")
          return (
            <p key={i}>
              {b.text}
              <Confirm show={b.confirm} />
            </p>
          );
        if (b.kind === "gap") return <Gap key={i} ask={b.ask} />;
        if (b.kind === "photo")
          return (
            <div key={i} className="figure">
              <Photo plate={b.plate} path={b.path} />
            </div>
          );
        if (b.kind === "diagram" && story)
          return (
            <div key={i} className="figure">
              <DiagramPlate caption={story.diagramCaption}>
                <Diagram kind={story.diagram} />
              </DiagramPlate>
            </div>
          );
        return null;
      })}
    </>
  );
}

function PageHead({ kicker, title, children }: { kicker?: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="page-head col">
      {kicker && <p className="kicker">{kicker}</p>}
      <h1>{title}</h1>
      {children}
    </header>
  );
}

function Entries({ heading, items }: { heading: string; items: Entry[] }) {
  return (
    <section className="entries">
      <h2 className="small-head">{heading}</h2>
      <ul>
        {items.map((e) => (
          <li key={e.what + e.where}>
            <span className="when">{e.when}</span>
            <span>
              {e.what}
              <span className="where">{e.where}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StoryList() {
  return (
    <ol className="story-list">
      {stories.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`}>
            <span className="story-name">{s.name}</span>
            <span className="story-dek">{s.dek}</span>
            <span className="story-when">{s.when}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

/* ---------- pages ---------- */

function Home() {
  return (
    <article className="home">
      <header className="col hello">
        <h1>
          <span>{home.greeting}</span>
          <span className="soft">{home.line}</span>
        </h1>
      </header>
      <div className="col lead-photo">
        <Photo plate={home.photo} path="" />
      </div>
      <div className="col prose opening">
        {home.opening.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </div>

      <section className="col prose">
        <h2 className="small-head">How I work</h2>
        {home.howIWork.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </section>

      <section className="col">
        <h2 className="small-head">Some of the work</h2>
        <p className="list-note">{home.workNote}</p>
        <StoryList />
      </section>

      <section className="col prose onward">
        <p>
          <a href="#about">How I got here</a>, or <a href="#contact">write to me</a>.
        </p>
      </section>
    </article>
  );
}

function About() {
  return (
    <article>
      <PageHead kicker="About" title={about.title} />
      <div className="col portrait">
        <Photo plate={about.portrait} path="/images/portrait.jpg" tall />
      </div>
      <div className="col prose">
        <Blocks blocks={about.blocks} />
      </div>
      <div className="col">
        <Entries heading="Along the way" items={record} />
        <Entries heading="Recognition" items={recognition} />
        <div className="figure small">
          <Photo plate={img("orange-corners-certificate")} path="" />
        </div>
      </div>
    </article>
  );
}

function WorkIndex() {
  return (
    <article>
      <PageHead kicker="Work" title={work.intro.split(". ")[0] + "."}>
        <p className="lede">{work.intro.split(". ").slice(1).join(". ")}</p>
      </PageHead>
      <div className="col-wide lead-photo">
        <Photo plate={work.photo} path="" />
      </div>
      <div className="col">
        <StoryList />
      </div>
    </article>
  );
}

function StoryPage({ story }: { story: Story }) {
  const i = stories.indexOf(story);
  const next = stories[(i + 1) % stories.length];
  return (
    <article className="story">
      <PageHead kicker={story.when} title={story.name}>
        <p className="lede">{story.dek}</p>
      </PageHead>
      <div className="col-wide story-body">
        <div className="prose">
          <Blocks blocks={story.blocks} story={story} />
        </div>
        <aside className="margin" aria-label="Facts and figures">
          <dl>
            {story.notes.map((n) => (
              <div key={n.label}>
                <dt>{n.label}</dt>
                <dd>
                  {n.value}
                  <Confirm show={n.confirm} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="source">Figures from Sanjid’s CV.</p>
        </aside>
      </div>
      <nav className="col story-next" aria-label="More work">
        <a href="#work">All work</a>
        <a href={`#${next.id}`}>Next: {next.name}</a>
      </nav>
    </article>
  );
}

function Thinking() {
  return (
    <article>
      <PageHead kicker="Draft page" title={thinking.title}>
        <p className="lede">{thinking.intro}</p>
      </PageHead>
      {thinking.notes.map((n) => (
        <section key={n.id} className="col prose note">
          <h2>{n.title}</h2>
          <Blocks blocks={n.blocks} />
        </section>
      ))}
      <div className="col prose">
        <Gap ask={thinking.more} />
      </div>
    </article>
  );
}

function Life() {
  return (
    <article>
      <PageHead kicker="Draft page" title={life.title}>
        <p className="lede">{life.intro}</p>
      </PageHead>
      <section className="col">
        <h2 className="small-head">{life.people.heading}</h2>
        <ul className="people">
          {life.people.list.map((p) => (
            <li key={p.name}>
              <span className="who">{p.name}</span>
              <span className="why">{p.line}</span>
            </li>
          ))}
        </ul>
      </section>
      <div className="col-wide photo-row">
        {life.photos.map((p, i) => (
          <Photo key={i} plate={p} path="" />
        ))}
      </div>
      <div className="col prose">
        {life.gaps.map((g) => (
          <Gap key={g} ask={g} />
        ))}
      </div>
    </article>
  );
}

function Now() {
  return (
    <article>
      <PageHead kicker={`Updated ${now.updated}`} title={now.title} />
      <div className="col prose">
        <div className="figure">
          <Photo plate={now.photo} path="" />
        </div>
        <Blocks blocks={now.blocks} />
      </div>
    </article>
  );
}

function Contact() {
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
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
        form.reset();
      } catch {
        setNote(`That didn’t send. Please email ${person.email} directly.`);
      }
      return;
    }
    const body = `${data.message}\n\n${data.name}\n${data.email}`;
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(`Hello from ${data.name}`)}&body=${encodeURIComponent(body)}`;
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
    <article>
      <PageHead kicker="Contact" title={contact.heading}>
        <p className="lede">{contact.lede}</p>
      </PageHead>
      <div className="col">
        <p className="direct">
          <button type="button" onClick={copyEmail}>
            {person.email}
          </button>
          <span className="hint" aria-live="polite">{copied ? "Copied" : "Click to copy"}</span>
        </p>
        <p className="direct">
          <a href={person.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span className="hint">{person.location}</span>
        </p>

        <form className="form" onSubmit={onSubmit} noValidate>
          <label htmlFor="name">
            <span>Name</span>
            <input id="name" name="name" autoComplete="name" />
          </label>
          <label htmlFor="email">
            <span>Email</span>
            <input id="email" name="email" type="email" autoComplete="email" />
          </label>
          <label htmlFor="message">
            <span>Message</span>
            <textarea id="message" name="message" rows={6} />
          </label>
          <button className="send" type="submit">
            {contact.cta}
          </button>
          <p className="form-note" aria-live="polite">
            {note}
          </p>
        </form>
      </div>
    </article>
  );
}

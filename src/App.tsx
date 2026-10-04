import { useEffect, useState } from "react";
import {
  SHOW_UNFINISHED_PAGES,
  about,
  contact,
  home,
  life,
  moves,
  notes,
  now,
  people,
  person,
  problems,
  recognition,
  record,
  stories,
  work,
  type Block,
  type Door,
  type Entry,
  type Story,
} from "./content/site";
import { DiagramPlate, Photo, PhotoRow } from "./components/Parts";
import { Diagram } from "./components/Diagrams";

/* Pages are addressed by a plain hash token (#about, #zenpack) so the site
 * works as static files and inside previews that only allow simple hashes. */
const PAGES = [
  { id: "about", label: "About", ready: true },
  { id: "moves", label: "What moves me", ready: moves.ready },
  { id: "problems", label: "How I see problems", ready: problems.ready },
  { id: "work", label: "Work", ready: true },
  { id: "life", label: "Life", ready: true },
  { id: "notes", label: "Notes", ready: notes.ready },
  { id: "now", label: "Now", ready: now.ready },
];

const shown = (id: string) =>
  stories.some((s) => s.id === id) || PAGES.some((p) => p.id === id && (p.ready || SHOW_UNFINISHED_PAGES));

function pageFromHash(): string {
  const h = window.location.hash.replace(/^#/, "");
  return shown(h) ? h : "home";
}

function usePage() {
  const [page, setPage] = useState(pageFromHash);
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

export default function App() {
  const page = usePage();
  const story = stories.find((s) => s.id === page);
  const section = story ? "work" : page;

  useEffect(() => {
    const label = story ? story.name : PAGES.find((p) => p.id === page)?.label;
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
            {PAGES.filter((p) => shown(p.id)).map((p) => (
              <a key={p.id} href={`#${p.id}`} aria-current={section === p.id ? "page" : undefined}>
                {p.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1} key={page}>
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "moves" && <Moves />}
        {page === "problems" && <Problems />}
        {page === "work" && <WorkIndex />}
        {story && <StoryPage story={story} />}
        {page === "life" && <Life />}
        {page === "notes" && <Notes />}
        {page === "now" && <Now />}
      </main>

      <footer className="foot">
        <div className="col-wide foot-inner">
          <span>{person.name}, {person.location}</span>
          <Links />
        </div>
      </footer>
    </>
  );
}

/* ---------- shared pieces ---------- */

function Links() {
  return (
    <span className="links">
      <a href={`mailto:${person.email}`}>{person.email}</a>
      {person.links
        .filter((l) => l.url)
        .map((l) => (
          <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
            {l.label}
          </a>
        ))}
    </span>
  );
}

/* A link onward. Points nowhere, and renders nothing, if its page is not
 * public yet. */
function DoorLink({ door }: { door: Door }) {
  if (!shown(door.page)) return null;
  return (
    <a className="door" href={`#${door.page}`}>
      {door.label}
    </a>
  );
}

function Blocks({ blocks, story }: { blocks: Block[]; story?: Story }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "p") return <p key={i}>{b.text}</p>;
        if (b.kind === "photo") return <Photo key={i} plate={b.plate} place={b.place} className="figure" />;
        if (b.kind === "pair") return <PhotoRow key={i} plates={b.plates} className="figure pair" />;
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

function PageHead({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <header className="page-head col">
      <h1>{title}</h1>
      {children}
    </header>
  );
}

function Entries({ heading, items }: { heading: string; items: Entry[] }) {
  return (
    <section className="entries">
      <h2>{heading}</h2>
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

/* ---------- pages ---------- */

function Home() {
  const { origin, cares, notices, works } = home;
  return (
    <article className="home">
      <header className="col-wide hero">
        <div className="hero-text">
          <h1>
            <span>{home.greeting}</span>
            <span className="soft">{home.line}</span>
          </h1>
          <p className="first">{home.intro}</p>
        </div>
        <Photo plate={home.photo} className="hero-photo" />
      </header>

      <section className="col scene">
        <p className="statement">{origin.text}</p>
        <DoorLink door={origin.door} />
      </section>

      <section className="col-wide scene cares">
        <div className="cares-text">
          <p className="statement">{cares.text}</p>
          <DoorLink door={cares.door} />
        </div>
        <ul className="names" aria-label="People I keep coming back to">
          {people.map((p) => (
            <li key={p.name}>
              <span className="who">{p.name}</span>
              <span className="why">{p.line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="col scene notice">
        <p>{notices.text}</p>
        <DoorLink door={notices.door} />
      </section>

      <section className="scene band">
        <div className="col-wide band-inner">
          <Photo plate={works.photo} className="band-photo" />
          <div className="band-text">
            {works.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
            <p className="doors">
              <DoorLink door={works.door} />
              <DoorLink door={works.more} />
            </p>
          </div>
        </div>
      </section>

      <section className="scene along" aria-labelledby="along-head">
        <h2 id="along-head" className="col-wide">Along the way</h2>
        <ol>
          {home.along.map((m) => (
            <li key={m.when}>
              <a href={shown(m.page) ? `#${m.page}` : undefined}>
                {m.photo.src && <img src={m.photo.src} alt={m.photo.alt} loading="lazy" className={`tone-${m.photo.tone}`} />}
                <span className="when">{m.when}</span>
                <span className="what">{m.what}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {shown("now") && (
        <section className="col prose scene">
          {now.blocks.slice(0, 1).map((b, i) => (b.kind === "p" ? <p key={i}>{b.text}</p> : null))}
          <DoorLink door={{ label: "Now", page: "now" }} />
        </section>
      )}

      <section className="col scene write">
        <h2>{contact.heading}</h2>
        <p>{contact.lede}</p>
        <Links />
      </section>
    </article>
  );
}

/* A page that opens with its title beside a photo on a wide screen. */
function PhotoHead({ title, plate, children }: { title: string; plate: Parameters<typeof Photo>[0]["plate"]; children?: React.ReactNode }) {
  return (
    <header className="col-wide photo-head">
      <div>
        <h1>{title}</h1>
        {children}
      </div>
      <Photo plate={plate} />
    </header>
  );
}

function About() {
  return (
    <article>
      <PhotoHead title={about.title} plate={about.portrait} />
      <div className="col prose">
        <Blocks blocks={about.blocks} />
      </div>
    </article>
  );
}

function Moves() {
  return (
    <article>
      <PageHead title={moves.title} />
      <div className="col prose">
        <Blocks blocks={moves.blocks} />
      </div>
      <section className="col">
        <h2>{moves.peopleHeading}</h2>
        <ul className="people">
          {moves.people.map((p) => (
            <li key={p.name}>
              <span className="who">{p.name}</span>
              <span className="why">{p.line}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function Problems() {
  return (
    <article>
      <PageHead title={problems.title} />
      <ol className="col steps">
        {problems.steps.map((s) => (
          <li key={s.text}>
            <p className="said">{s.text}</p>
            <p className="seen">
              {s.seen} <DoorLink door={s.door} />
            </p>
          </li>
        ))}
      </ol>
    </article>
  );
}

function WorkIndex() {
  return (
    <article>
      <PageHead title={work.intro.split(". ")[0] + "."}>
        <p className="lede">{work.intro.split(". ").slice(1).join(". ")}</p>
      </PageHead>
      <div className="col">
        <ol className="story-list">
          {stories.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`}>
                <span className="story-name">{s.name}</span>
                <span className="story-dek">{s.dek}</span>
              </a>
            </li>
          ))}
        </ol>
        <Entries heading={work.recordHeading} items={record} />
        <Entries heading={work.recognitionHeading} items={recognition} />
      </div>
    </article>
  );
}

function StoryPage({ story }: { story: Story }) {
  /* Edge to edge photos close the story, after the margin notes end. */
  const isBleed = (b: Block) => b.kind === "photo" && b.place === "bleed";
  const body = story.blocks.filter((b) => !isBleed(b));
  const tail = story.blocks.filter(isBleed);
  const i = stories.indexOf(story);
  const next = stories[(i + 1) % stories.length];
  return (
    <article className="story">
      <PageHead title={story.name}>
        <p className="lede">{story.dek}</p>
        <p className="dateline">{story.when}</p>
      </PageHead>
      <div className="col-wide story-body">
        <div className="prose">
          <Blocks blocks={body} story={story} />
        </div>
        <aside className="margin" aria-label="Facts and figures">
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
      {tail.map((b, k) =>
        b.kind === "photo" ? (
          <div key={k} className="band band-photo-only">
            <Photo plate={b.plate} />
          </div>
        ) : null,
      )}
      <nav className="col story-next" aria-label="More work">
        <a href="#work">All the work</a>
        <a href={`#${next.id}`}>Next, {next.name}</a>
      </nav>
    </article>
  );
}

function Life() {
  return (
    <article>
      <PageHead title={life.title}>
        <p className="lede">{life.intro}</p>
      </PageHead>
      <div className="col-wide life-rows">
        {life.rows.map((row, k) => (
          <PhotoRow key={k} plates={row} />
        ))}
      </div>
    </article>
  );
}

function Notes() {
  return (
    <article>
      <PageHead title={notes.title}>
        <p className="lede">{notes.intro}</p>
      </PageHead>
      <div className="col prose">
        {notes.items.map((n) => (
          <p key={n.url}>
            <a href={n.url}>{n.title}</a> <span className="dateline">{n.date}</span>
          </p>
        ))}
        <p>
          <a className="door" href={notes.substack} target="_blank" rel="noreferrer">
            Substack
          </a>
        </p>
      </div>
    </article>
  );
}

function Now() {
  return (
    <article>
      <PhotoHead title={now.title} plate={now.photo}>
        <p className="dateline">Updated {now.updated}</p>
      </PhotoHead>
      <div className="col prose">
        <Blocks blocks={now.blocks} />
      </div>
    </article>
  );
}

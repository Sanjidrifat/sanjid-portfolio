/*
 * All copy for the site lives here.
 *
 * The site is about Sanjid as a person first. The work is evidence of who he
 * is, not the subject. Pages, in order: Home, About, What moves me, How I see
 * problems, Work (with one page per story), Life, Notes, Now.
 *
 * Sourcing rule: nothing on this site may claim a metric, customer, title,
 * outcome, memory, motivation or opinion that is not backed by Sanjid's own
 * materials or his own words. Where his story is not known yet, the content
 * keeps a `gap` block with the question for him. Gaps are never shown on the
 * site. docs/content-checklist.md lists them for Sanjid.
 *
 * Writing rule: no em dashes, few colons or semicolons, no slogans, no
 * sentences that tell the visitor Sanjid is interesting.
 *
 * SHOW_UNFINISHED_PAGES shows pages that are still waiting on Sanjid's
 * material (see `ready` on each page). False for the public site. The review
 * preview is built with it set to true.
 */

export const SHOW_UNFINISHED_PAGES = false;

export type Plate = {
  src: string | null;
  alt: string;
  caption: string;
  shape?: "landscape" | "portrait" | "square";
  /* colour: natural colour, used where colour carries the story.
   * mono: black and white, used where it calms a busy or harsh photo.
   * asis: Sanjid already edited it, leave it alone. */
  tone?: "colour" | "mono" | "asis";
};

/* Sanjid's photos. Every description, caption and alt text lives in
 * image-library.json (built by scripts/image_library.py); see
 * docs/image-library.md. Pages pick photos from it by id. */
import library from "./image-library.json";

export function img(id: string): Plate {
  const e = library.images.find((i) => i.id === id);
  if (!e) throw new Error(`No image "${id}" in the image library`);
  return {
    src: e.src,
    alt: e.alt,
    caption: e.caption,
    shape: e.orientation as Plate["shape"],
    tone: ((e as { tone?: string }).tone ?? "colour") as Plate["tone"],
  };
}

export const person = {
  name: "Sanjid Hasan Al Rifat",
  shortName: "Sanjid",
  location: "Dhaka, Bangladesh",
  email: "sanjidrifat@gmail.com",
  linkedin: "https://www.linkedin.com/in/sanjid-rifat",
  /* Profiles shown on Contact and in the footer. A link with an empty url
   * is skipped until it is filled in. */
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sanjid-rifat" },
    { label: "X", url: "https://x.com/SanjidHRifat" },
    { label: "Substack", url: "https://substack.com/@sanjidrifat1" },
    { label: "Facebook", url: "" },
  ],
};

/* A paragraph, a picture, a drawing, or an open question for Sanjid.
 * Gaps are internal notes and never render. */
export type Block =
  | { kind: "p"; text: string }
  | { kind: "photo"; plate: Plate }
  | { kind: "diagram" }
  | { kind: "gap"; ask: string };

/* A link to another page of the site, by its hash id. */
export type Door = { label: string; page: string };

/* ---------- Home ----------
 * Short scenes that follow one line Sanjid wrote: here is Sanjid, how he
 * became this way, what he cares about, what he notices, how he works, and
 * some of the things that happened along the way. Each scene gives one thing
 * to see or read and a door to the page that goes deeper. */

export const home = {
  greeting: "Hi, I’m Sanjid.",
  line: "I like figuring things out.",
  photo: img("figuring-it-out"),
  intro:
    "I trained as an electrical engineer. For the last few years most of my work has been on the roads of Dhaka, with electric three wheelers, the batteries inside them, the chargers they come back to, and the people who earn a living from all of it.",
  origin: {
    text: "I grew up by the Shitalakshya river in Narayanganj. I studied electrical and electronic engineering at AUST, co-founded MenuKi, a QR menu service for restaurants, and in 2023 joined ZEROOZEN, where I am now a co-founder and the Chief Product Officer.",
    door: { label: "How I got here", page: "about" } as Door,
  },
  cares: {
    text: [
      "What moves me most is intelligence built into systems. The kind that can change how money works, how economies work, and take things somewhere people would not have thought of on their own.",
      "For technical things I have followed Steve Wozniak since my earliest days. Einstein is my role model. I admire Phil Knight, and I follow Murakami and Rumi.",
    ],
    door: { label: "What moves me", page: "moves" } as Door,
  },
  notices: {
    text: "I usually start by going closer to the problem. I want to see what is actually happening.",
    door: { label: "How I see problems", page: "problems" } as Door,
  },
  works: {
    photo: img("zengo-alfa-first-lot"),
    text: [
      "A three wheeler in Bangladesh is a working machine. Someone’s income depends on how much it can carry, how far it goes on a charge, how often it is off the road, and how much it cost in the first place.",
      "ZENGO ALFA was designed around those numbers, measured here rather than borrowed from somewhere else. It launched in September 2025.",
    ],
    door: { label: "The ZENGO ALFA story", page: "zengo-alfa" } as Door,
    more: { label: "All the work", page: "work" } as Door,
  },
  /* Real moments from Sanjid's photos, dated by the camera. */
  along: [
    { when: "July 2017", what: "Out riding", photo: img("cycle-village-road"), page: "life" },
    { when: "October 2023", what: "The MenuKi pilot", photo: img("menuki-salt-and-pepper"), page: "about" },
    { when: "March 2024", what: "The first ZenWall chargers on a wall", photo: img("zenwall-first-version"), page: "zen-charger" },
    { when: "May 2025", what: "Convocation at AUST", photo: img("convocation-2025"), page: "about" },
    { when: "April 2026", what: "Cells on the bench", photo: img("cells-on-bench-2026"), page: "now" },
  ],
};

/* ---------- About ---------- */

export const about = {
  title: "How I got here",
  portrait: img("emk-center"),
  blocks: [
    {
      kind: "p",
      text: "I grew up by the Shitalakshya river in Narayanganj. It is my hometown, and I still have a lot of affection for it.",
    },
    { kind: "gap", ask: "Childhood in Narayanganj and the Shitalakshya. A place, a routine, a person, something you saw often." },
    { kind: "gap", ask: "Where curiosity began. The first thing you remember wanting to take apart or understand." },
    { kind: "gap", ask: "Why electrical engineering. A choice, a default, or someone’s push." },
    {
      kind: "p",
      text: "I studied electrical and electronic engineering at Ahsanullah University of Science and Technology from 2018 to 2022. What I built there was small and practical. A low cost pulse oximeter, a cycloconverter, a circuit for automatic power factor improvement, audio sent over frequency division multiplexing. My thesis was IntelliClass, a classroom that took attendance by RFID, sensed its own environment and logged everything to the cloud.",
    },
    { kind: "gap", ask: "What early building taught you." },
    { kind: "photo", plate: img("convocation-2025") },
    {
      kind: "p",
      text: "In 2022 I co-founded MenuKi, a QR menu service for restaurants. We designed a pilot that put it in 25 restaurants across two cities in five days.",
    },
    { kind: "photo", plate: img("menuki-salt-and-pepper") },
    { kind: "gap", ask: "The first customer experience. The first time someone decided whether what you made was worth their money." },
    {
      kind: "p",
      text: "In 2023 I also spent a few months on business operations at Desktop IT, doing market research and planning for growth.",
    },
    {
      kind: "p",
      text: "Later in 2023 I joined ZEROOZEN as a hardware design engineer and spent most of that time on one charger, through twenty three versions. In February 2024 I became a co-founder and its Chief Product Officer. Since then the work has spread from circuit boards to vehicles, batteries, data, supply chains, investors and a fleet of more than 400 vehicles.",
    },
    { kind: "photo", plate: img("thingspeak-desk") },
    { kind: "gap", ask: "What co-founding changed about ownership." },
  ] as Block[],
};

/* ---------- What moves me ---------- */

export const moves = {
  title: "What moves me",
  ready: false,
  blocks: [
    {
      kind: "p",
      text: "What moves me most is intelligence built into systems. The kind that can change how money works, how economies work, and take things somewhere people would not have thought of on their own.",
    },
    { kind: "gap", ask: "Why intelligent systems move you. What you saw, read or built that made you think this, and where you think it goes." },
  ] as Block[],
  peopleHeading: "People I keep coming back to",
  people: [
    { name: "Steve Wozniak", line: "For technical things, since my earliest days." },
    { name: "Albert Einstein", line: "My role model." },
    { name: "Phil Knight", line: "Shoe Dog is his memoir. I admire him a lot." },
    { name: "Haruki Murakami", line: "I follow his writing." },
    { name: "Rumi", line: "I follow his writing." },
  ],
};

/* ---------- How I see problems ----------
 * Sanjid's own description of how he works, each step paired with one place
 * in the work where it shows. The examples use facts from the stories only. */

export const problems = {
  title: "How I see problems",
  ready: false,
  steps: [
    {
      text: "I usually start by going closer to the problem. I want to see what is actually happening.",
      seen: "Bangladesh had no drive cycle of its own, so before sizing batteries or estimating range we measured one in Mirpur.",
      door: { label: "ZENBOX and the Dhaka Urban Drive Cycle", page: "zenbox" } as Door,
    },
    {
      text: "Then I try to understand the person experiencing it, and ask what actually matters.",
      seen: "For a three wheeler driver, charging decides when the vehicle can go back to work. The charger started from that working day, not from the converter.",
      door: { label: "ZEN Series Charger", page: "zen-charger" } as Door,
    },
    {
      text: "Then I decide what is worth solving, and figure out what it would take to make it real.",
      seen: "Before designing ZENGO ALFA, I built a model of the powertrain from local operating conditions. The motor and the battery came out of that model.",
      door: { label: "ZENGO ALFA", page: "zengo-alfa" } as Door,
    },
    {
      text: "And then I stay around long enough to see what happens after it leaves the lab.",
      seen: "ZenPack ran 1.2 lakh km on our own driving cycle before it went to customers, because laboratory validation was not enough.",
      door: { label: "ZenPack", page: "zenpack" } as Door,
    },
  ],
  gaps: ["One time you learned that technically correct does not always mean useful. This becomes the centre of the page."],
};

/* ---------- Work ---------- */

export type Story = {
  id: string;
  name: string;
  dek: string;
  when: string;
  diagram: "vehicle" | "pack" | "charger" | "drivecycle";
  diagramCaption: string;
  blocks: Block[];
  /* Dated facts and figures, set small like notes in a margin. */
  notes: { label: string; value: string }[];
};

/* No photo on the Work index: each story carries its own pictures. */
export const work = {
  title: "Work",
  recordHeading: "Where I have worked and studied",
  recognitionHeading: "Recognition",
  intro: "A few things I have spent a lot of time trying to make work. All of them at ZEROOZEN, all of them for people who earn a living on Bangladesh’s roads.",
};

export type Entry = { when: string; what: string; where: string };

export const record: Entry[] = [
  { when: "2024 to now", what: "Co-Founder and Chief Product Officer", where: "ZEROOZEN Energy" },
  { when: "2023 to 2024", what: "Hardware Design Engineer", where: "ZEROOZEN Energy" },
  { when: "2023", what: "Business Operations Strategist", where: "Desktop IT" },
  { when: "2022 to 2023", what: "Co-Founder and Business Strategist", where: "MenuKi" },
  { when: "2018 to 2022", what: "BSc, Electrical and Electronic Engineering", where: "Ahsanullah University of Science and Technology" },
];

export const recognition: Entry[] = [
  { when: "2025", what: "Featured as a high potential EV deep tech startup", where: "IDLC Startups Spotlight" },
  { when: "Cohort 2", what: "Accelerator backed by the Dutch Embassy", where: "Orange Corners Bangladesh" },
];

export const stories: Story[] = [
  {
    id: "zengo-alfa",
    name: "ZENGO ALFA",
    dek: "An electric three wheeler for people who earn their living with one.",
    when: "Launched September 2025",
    diagram: "vehicle",
    diagramCaption: "Side elevation, schematic. Where the battery, motor and GPS sit.",
    blocks: [
      {
        kind: "p",
        text: "A three wheeler in Bangladesh is a working machine. Someone’s income depends on how much it can carry, how far it goes on a charge, how often it is off the road, and how much it cost in the first place.",
      },
      {
        kind: "p",
        text: "When we looked closely at the numbers electric three wheelers were being designed around, range and depth of discharge and energy per kilometre, most of them came from assumptions made somewhere else. Other roads, other loads, other drivers.",
      },
      {
        kind: "p",
        text: "So before designing anything, I built a mathematical model of the powertrain and drivetrain. Give it local operating conditions and it works out range, depth of discharge and energy use per kilometre. The motor size and the battery pack came out of that model, and so did most of the decisions after them.",
      },
      { kind: "diagram" },
      {
        kind: "p",
        text: "What came out the other end has an optimized chassis, a battery and motor matched to each other, dual lock security, and GPS with live connectivity and remote on and off. The connectivity matters more than it sounds. It means the vehicle can be looked after as part of a fleet, not only driven.",
      },
      {
        kind: "p",
        text: "ZENGO ALFA launched in September 2025. Since then it has done more than 2.8 lakh km in field operation and brought in over BDT 3.5 million in its first quarter. The electrical architecture underneath is meant to outlast this one vehicle. It is the base for the commercial and passenger platforms that come next.",
      },
      { kind: "photo", plate: img("zengo-alfa-first-lot") },
      { kind: "gap", ask: "A moment from the field after launch. Something a driver said, or something that surprised you." },
    ],
    notes: [
      { label: "Launched", value: "September 2025" },
      { label: "Field operation", value: "2.8 lakh+ km" },
      { label: "First quarter revenue", value: "BDT 3.5M+" },
      { label: "Model", value: "Range, DoD, energy per km" },
      { label: "On board", value: "GPS, remote on/off, live connectivity" },
    ],
  },
  {
    id: "zenpack",
    name: "ZenPack",
    dek: "A battery pack for commercial electric vehicles, specified for conditions here.",
    when: "In deployment since 2026",
    diagram: "pack",
    diagramCaption: "Pack architecture, schematic. The master and slave BMS is ZEN BMS, still in development.",
    blocks: [
      {
        kind: "p",
        text: "In a commercial electric vehicle the battery decides most things. How far it goes, how long it stays on the road, what it costs to run, and when the owner has to find the money for a new one.",
      },
      {
        kind: "p",
        text: "Most packs arrive with a specification written for someone else’s conditions. We wanted to start from ours. So we wrote down what the pack had to do here first, and only then chose the architecture and set the BMS requirements to meet it.",
      },
      {
        kind: "p",
        text: "Testing was the slow part. Before it went to customers the pack ran 1.2 lakh km on our own driving cycle, because laboratory validation was not enough.",
      },
      { kind: "diagram" },
      {
        kind: "p",
        text: "More than 20 packs went into real vehicles in the first two months, and deliveries have been growing about 6.5 percent a month. The target is more than 250 by the end of 2026. That is a target, not a result yet.",
      },
      {
        kind: "p",
        text: "The next layer is our own battery management. ZEN BMS is a hybrid master and slave design with active and passive balancing. It estimates state of charge with an extended Kalman filter alongside Coulomb counting. It is still in development.",
      },
      { kind: "gap", ask: "What you learned when the first packs met real drivers." },
    ],
    notes: [
      { label: "Chemistry", value: "LFP" },
      { label: "Validation", value: "1.2 lakh km, own drive cycle" },
      { label: "First two months", value: "20+ units delivered" },
      { label: "Growth", value: "~6.5% month on month" },
      { label: "Target", value: "250+ units by end of 2026" },
    ],
  },
  {
    id: "zen-charger",
    name: "ZEN Series Charger",
    dek: "A charger for three wheeler batteries, built over twenty three versions.",
    when: "2023 to 2024",
    diagram: "charger",
    diagramCaption: "Power stage, block diagram, and the four stage charging profile.",
    blocks: [
      {
        kind: "p",
        text: "It took twenty three versions to get the charger right.",
      },
      {
        kind: "p",
        text: "For a three wheeler driver, charging decides when the vehicle can go back to work. For a garage owner, it shows up on the electricity bill. For the battery, it decides how quickly it ages.",
      },
      {
        kind: "p",
        text: "So we did not start from the converter. We started from that working day and asked for one charger that could handle the lithium ion and lead acid packs people actually own, at 48 and 60 volts, while giving us control over how energy goes into the battery. The circuit came after that question, not before it.",
      },
      { kind: "diagram" },
      {
        kind: "p",
        text: "What came out of it is a 1.2 kW half bridge resonant converter with an EMI filter on the input. The firmware runs a four stage charge, precharge, constant current, constant voltage and float, tuned to slow battery degradation. It protects against short circuits, overcharging and reversed polarity.",
      },

      {
        kind: "p",
        text: "I did the PCB layout and wrote the embedded C and C++ firmware, and simulated it in LTspice, PLECS and Simulink. Then we built it, tested it, found what was wrong, and built it again.",
      },
      {
        kind: "p",
        text: "It reaches 87 percent efficiency at peak load. The habits it forced on us, the hardware design standards and the way we source components, became the starting point for every ZEROOZEN product after it.",
      },
      { kind: "photo", plate: img("zenwall-first-version") },
      { kind: "photo", plate: img("meet-bangladesh-expo") },
    ],
    notes: [
      { label: "Prototypes", value: "23 iterations" },
      { label: "Power stage", value: "1.2 kW half bridge resonant" },
      { label: "Packs", value: "48 / 60 V, Li-ion and lead acid" },
      { label: "Charging", value: "Precharge, CC, CV, float" },
      { label: "Efficiency", value: "87% at peak load" },
      { label: "Tools", value: "LTspice, PLECS, Simulink" },
    ],
  },
  {
    id: "zenbox",
    name: "ZENBOX and the Dhaka Urban Drive Cycle",
    dek: "A low cost data logger, and the drive cycle we measured with it.",
    when: "Mirpur, Dhaka",
    diagram: "drivecycle",
    diagramCaption: "An illustrative stop and start trace, and the light gate over the 32 tooth gear.",
    blocks: [
      {
        kind: "p",
        text: "Every vehicle is designed around a drive cycle, a standard pattern of speeding up, cruising and stopping that stands in for real driving. The common ones, NEDC and WLTC, were built for other places. Dhaka’s traffic, roads, climate and constant stopping and starting are something else.",
      },
      {
        kind: "p",
        text: "Bangladesh did not have a drive cycle of its own. So instead of adjusting our assumptions around someone else’s standard, we started collecting our own.",
      },
      {
        kind: "p",
        text: "The first problem was cost. Commercial OBD loggers cost too much to put on a fleet of light electric vehicles. ZENBOX was the answer. A high frequency laser sits over a 32 tooth gear and works as a light gate, counting teeth as they pass. That gives RPM once a second without touching the drivetrain, at roughly 90 percent lower unit cost than a commercial logger.",
      },
      { kind: "diagram" },
      {
        kind: "p",
        text: "I captured operating conditions in Mirpur, the urban density, traffic patterns, climate, road infrastructure and the stop and start rhythm of the place, and built the Dhaka Urban Drive Cycle from them. As far as we know it is the first urban drive cycle for Bangladesh.",
      },
      {
        kind: "p",
        text: "It is now the baseline ZEROOZEN uses to evaluate vehicle performance, size battery packs and estimate range. It is also the reference for future regulatory submissions.",
      },
      { kind: "gap", ask: "What the data showed that surprised you." },
    ],
    notes: [
      { label: "Sensor", value: "Laser light gate, 32 tooth gear" },
      { label: "Logging", value: "RPM at 1 Hz, non-contact" },
      { label: "Cost", value: "~90% below commercial OBD loggers" },
      { label: "Data", value: "Mirpur, Dhaka" },
    ],
  },
];

/* ---------- Life ---------- */

export const life = {
  title: "Life",
  intro: "A few things that have nothing to do with work.",
  photos: [
    img("friends-bonfire"),
    img("cycle-village-road"),
    img("cycle-dawn-road"),
    img("candid-bw"),
    img("cycle-mustard-field"),
  ] as Plate[],
  gaps: [
    "A bicycle shows up in four of the photos you sent. A line or two about riding, if it matters to you.",
    "Places that matter to you, with one line each.",
  ],
};

/* ---------- Notes ---------- */

export const notes = {
  title: "Notes",
  ready: false,
  intro: "Short pieces of thinking, dated. Longer ones are on Substack.",
  substack: "https://substack.com/@sanjidrifat1",
  items: [] as { title: string; date: string; url: string }[],
  gaps: ["Which Substack posts, if any, should appear here."],
};

/* ---------- Now ---------- */

export const now = {
  title: "Now",
  ready: false,
  updated: "October 2026",
  photo: img("cells-on-bench-2026"),
  blocks: [
    {
      kind: "p",
      text: "At ZEROOZEN, getting ZenPack into more vehicles, and building ZEN BMS, our own battery management system.",
    },
    { kind: "gap", ask: "What you are learning right now." },
    { kind: "gap", ask: "What you are reading." },
    { kind: "gap", ask: "What you are trying to understand." },
  ] as Block[],
};

/* ---------- Write to me: the end of Home, and every footer ---------- */

export const contact = {
  heading: "Write to me",
  lede: "If something here made you curious, I would like to hear from you.",
};

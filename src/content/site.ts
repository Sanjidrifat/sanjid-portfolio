/*
 * All copy for the site lives here.
 *
 * Sourcing rule: nothing on this site may claim a metric, customer, title,
 * outcome, memory, motivation or opinion that is not backed by Sanjid's own
 * materials or his own words. Where his story is not known yet, the copy
 * leaves a `gap` for him to fill instead of guessing.
 *
 * Writing rule: no em dashes, few colons or semicolons, no slogans.
 *
 * SHOW_DRAFTS controls everything that is still waiting on Sanjid: the
 * Thinking, Life and Now pages, and the gap notes inside other pages.
 * Keep it true for previews. Set it to false for the public site.
 *
 * SHOW_CONFIRM_MARKS shows a small "to confirm" tag on lines that are a
 * reasonable reading of the sources but not stated in them.
 */

export const SHOW_DRAFTS = true;
export const SHOW_CONFIRM_MARKS = true;

/* Images: drop files into /public/images/... and set `src` to the path
 * (e.g. "/images/zengo-alfa/road.jpg"). While `src` is null the site draws
 * a placeholder naming the file it expects. */
export type Plate = {
  src: string | null;
  alt: string;
  caption: string;
  shape?: "landscape" | "portrait" | "square";
};

/* Sanjid's photos. Every description, caption and alt text lives in
 * image-library.json (built by scripts/image_library.py); see
 * docs/image-library.md. Pages pick photos from it by id. */
import library from "./image-library.json";

export function img(id: string): Plate {
  const e = library.images.find((i) => i.id === id);
  if (!e) throw new Error(`No image "${id}" in the image library`);
  return { src: e.src, alt: e.alt, caption: e.caption, shape: e.orientation as Plate["shape"] };
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

/* A paragraph, a picture, or an open question for Sanjid. */
export type Block =
  | { kind: "p"; text: string; confirm?: boolean }
  | { kind: "photo"; plate: Plate; path: string }
  | { kind: "diagram" }
  | { kind: "gap"; ask: string };

/* ---------- Home ---------- */

export const home = {
  photo: img("figuring-it-out"),
  greeting: "Hi, I’m Sanjid.",
  line: "I like figuring things out.",
  opening: [
    "It usually starts small. Something doesn’t quite make sense to me, and I find I can’t put it down. A number that looks wrong. A machine that works on paper and struggles on the road. A person who needs one thing and keeps being handed another.",
    "I trained as an electrical engineer. For the last few years, the questions I can’t put down have mostly lived on the roads of Dhaka. Electric three wheelers, the batteries inside them, the chargers they come back to, and the people who earn a living from all of it.",
    "I still don’t understand most things as well as I’d like. What I have learned came from going closer to the problem than seemed necessary, and staying around after the work should have been finished.",
    "This site is some of that. The work, the thinking, and a few things that have nothing to do with either.",
  ],
  workNote: "Most of it at ZEROOZEN Energy in Dhaka, where I am a co-founder and the Chief Product Officer.",
  /* Sanjid's own description of how he works, from his brief. */
  howIWork: [
    "I usually start by going closer to the problem. I want to see what is actually happening.",
    "Then I try to understand the person experiencing it, and ask what actually matters. Then I decide what is worth solving, and figure out what it would take to make it real.",
    "And then I stay around long enough to see what happens after it leaves the lab.",
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
    { kind: "gap", ask: "A memory of growing up by the river, if you want to share one." },
    { kind: "gap", ask: "Where curiosity began. The first thing you remember wanting to take apart or understand." },
    {
      kind: "p",
      text: "For technical things, the person I have followed the longest is Steve Wozniak. I have followed him since my earliest days. If I had to name one role model, it would be Einstein.",
    },
    { kind: "gap", ask: "Why electrical engineering. A choice, a default, or someone’s push." },
    {
      kind: "p",
      text: "I studied electrical and electronic engineering at Ahsanullah University of Science and Technology from 2018 to 2022. What I built there was small and practical. A low cost pulse oximeter, a cycloconverter, a circuit for automatic power factor improvement, audio sent over frequency division multiplexing. My thesis was IntelliClass, a classroom that took attendance by RFID, sensed its own environment and logged everything to the cloud.",
    },
    { kind: "photo", plate: img("convocation-2025"), path: "" },
    {
      kind: "p",
      text: "Before I graduated I had co-founded MenuKi, a QR menu service for restaurants. We designed a pilot that put it in 25 restaurants across two cities in five days. In 2023 I also spent a few months on business operations at Desktop IT, doing market research and planning for growth.",
    },
    { kind: "gap", ask: "What the restaurant owners taught you. The first time someone decided whether something you made was worth their money." },
    {
      kind: "p",
      text: "Later in 2023 I joined ZEROOZEN as a hardware design engineer and spent most of that time on one charger, through twenty three versions. In February 2024 I became a co-founder and its Chief Product Officer. Since then the work has spread from circuit boards to vehicles, batteries, data, supply chains, investors and a fleet of more than 400 vehicles.",
    },
    { kind: "photo", plate: img("thingspeak-desk"), path: "" },
    { kind: "gap", ask: "A moment when something technically correct turned out not to be useful." },
    { kind: "gap", ask: "What co-founding taught you about ownership that a job never did." },
  ] as Block[],
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
  notes: { label: string; value: string; confirm?: boolean }[];
};

export const work = {
  photo: img("shariful-garage"),
  title: "Work",
  intro: "A few things I have spent a lot of time trying to make work. All of them at ZEROOZEN, all of them for people who earn a living on Bangladesh’s roads.",
};

export const stories: Story[] = [
  {
    id: "zengo-alfa",
    name: "ZENGO ALFA",
    dek: "An electric three wheeler, and the arithmetic of the person driving it.",
    when: "Launched September 2025",
    diagram: "vehicle",
    diagramCaption: "Side elevation, schematic. Where the battery, motor and GPS sit.",
    blocks: [
      {
        kind: "p",
        text: "A three wheeler in Bangladesh is a working machine. Someone’s income depends on how much it can carry, how far it goes on a charge, how often it is off the road, and how much it cost in the first place.",
      },
      {
        kind: "photo",
        plate: { src: null, alt: "A three wheeler at work on a road in Bangladesh", caption: "On the road" },
        path: "/images/zengo-alfa/road.jpg",
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
      { kind: "photo", plate: img("zengo-alfa-first-lot"), path: "" },
      { kind: "gap", ask: "A moment from the field after launch. Something a driver said, or something that surprised you. A photo of a ZENGO ALFA at work on the road would also help." },
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
    dek: "What a battery has to do for someone to make money with it.",
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
        kind: "photo",
        plate: { src: null, alt: "ZenPack on the workshop bench", caption: "ZenPack on the bench" },
        path: "/images/zenpack/bench.jpg",
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
    dek: "Twenty three versions of one small box.",
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
      { kind: "photo", plate: img("zenwall-first-version"), path: "" },
      {
        kind: "p",
        text: "What still interests me about it is how a small piece of power electronics ends up sitting between the grid, the battery, the vehicle and someone’s livelihood.",
      },
      { kind: "photo", plate: img("meet-bangladesh-expo"), path: "" },
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
    dek: "Measuring Dhaka before designing for it.",
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
        kind: "photo",
        plate: { src: null, alt: "Traffic in Mirpur, Dhaka", caption: "Mirpur" },
        path: "/images/zenbox/mirpur.jpg",
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

/* ---------- Thinking (draft) ---------- */

export type Note = { id: string; title: string; blocks: Block[] };

export const thinking = {
  title: "Thinking",
  intro: "Notes on things I keep coming back to.",
  notes: [
    {
      id: "intelligent-systems",
      title: "Systems that change the system",
      blocks: [
        {
          kind: "p",
          text: "What moves me most is intelligence built into systems. The kind that can change how money works, how economies work, and take things somewhere people would not have thought of on their own.",
        },
        { kind: "gap", ask: "Why. What you have seen, read or built that made you think this, and where you think it leads." },
      ],
    },
  ] as Note[],
  more: "Topics still to write: customers, money and value, Bangladesh, mobility, failure, what makes something worth building.",
};

/* ---------- Life (draft) ---------- */

export const life = {
  title: "Life",
  intro: "A few things that have nothing to do with work.",
  people: {
    heading: "People I keep coming back to",
    list: [
      { name: "Phil Knight", line: "Shoe Dog is his memoir. I admire him a lot." },
      { name: "Haruki Murakami", line: "I follow his writing." },
      { name: "Rumi", line: "I follow his writing." },
      { name: "Albert Einstein", line: "My role model." },
      { name: "Steve Wozniak", line: "For technical things, since my earliest days." },
    ],
  },
  photos: [
    img("friends-bonfire"),
    img("cycle-village-road"),
    img("cycle-dawn-road"),
    img("candid-bw"),
    img("cycle-mustard-field"),
  ] as Plate[],
  gaps: [
    "A bicycle shows up in four of the photos you sent. A line or two about riding, if it matters to you.",
    "What you do when you are not working.",
    "Places that matter to you, with one line each.",
    "Small rituals or things you notice.",
  ],
};

/* ---------- Now (draft) ---------- */

export const now = {
  title: "Now",
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

/* ---------- Contact ---------- */

export const contact = {
  heading: "Write to me",
  lede: "If something here made you curious, or you are working on a problem worth going closer to, I would like to hear about it.",
  cta: "Send",
  /* Optional form backend (e.g. a Formspree endpoint). When empty, the form
   * opens the visitor's email app addressed to person.email. */
  endpoint: "",
};

/*
 * Everything the site says about Sanjid.
 *
 * Rule: nothing here may claim a metric, customer, title, outcome, memory,
 * motivation or opinion that is not in Sanjid's own materials (his CV, his
 * photos and their file names and dates) or his own words in conversation.
 * Where his story is not known yet, a `gap` block keeps the question for him.
 * Gaps never render. docs/content-checklist.md lists them.
 *
 * Writing rule: plain sentences, no em dashes, no slogans.
 */

export type Plate = {
  src: string | null;
  alt: string;
  caption: string;
  shape?: "landscape" | "portrait" | "square";
  /* colour: natural colour, used where colour carries the story.
   * mono: black and white, used where it calms a busy or harsh photo.
   * asis: Sanjid already edited it, leave it alone. */
  tone?: "colour" | "mono" | "asis";
  /* Width over height, so photos in a row can share one height. */
  ratio?: number;
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
    ratio: e.width / e.height,
  };
}

export type Block =
  | { kind: "p"; text: string }
  | { kind: "photo"; plate: Plate; place?: Place }
  | { kind: "pair"; plates: Plate[] }
  | { kind: "h"; text: string; when?: string }
  | { kind: "list"; items: string[] }
  | { kind: "diagram" }
  | { kind: "gap"; ask: string };

/* Where a photo sits. Default: in the reading column. left and right hang
 * beside the text on a wide screen. wide steps out of the column. bleed runs
 * edge to edge on a dark band. A pair sets two photos side by side at the
 * same height. */
export type Place = "column" | "left" | "right" | "wide" | "bleed";

export const people = [
  { name: "Steve Wozniak", line: "For technical things, since my earliest days." },
  { name: "Albert Einstein", line: "My role model." },
  { name: "Phil Knight", line: "Shoe Dog is his memoir. I admire him a lot." },
  { name: "Haruki Murakami", line: "I follow his writing." },
  { name: "Rumi", line: "I follow his writing." },
];

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
      { kind: "h", text: "The need" },
      {
        kind: "p",
        text: "A three wheeler in Bangladesh is a working machine. Someone’s income depends on how much it can carry, how far it goes on a charge, how often it is off the road, and how much it cost in the first place.",
      },
      { kind: "h", text: "What was missing" },
      {
        kind: "p",
        text: "When we looked closely at the numbers electric three wheelers were being designed around, range and depth of discharge and energy per kilometre, most of them came from assumptions made somewhere else. Other roads, other loads, other drivers.",
      },
      { kind: "h", text: "The decision" },
      {
        kind: "p",
        text: "So before designing anything, I built a mathematical model of the powertrain and drivetrain. Give it local operating conditions and it works out range, depth of discharge and energy use per kilometre. The motor size and the battery pack came out of that model, and so did most of the decisions after them.",
      },
      { kind: "h", text: "What we built" },
      { kind: "diagram" },
      {
        kind: "p",
        text: "What came out the other end has an optimized chassis, a battery and motor matched to each other, dual lock security, and GPS with live connectivity and remote on and off. The connectivity matters more than it sounds. It means the vehicle can be looked after as part of a fleet, not only driven.",
      },
      { kind: "h", text: "In the field" },
      {
        kind: "p",
        text: "ZENGO ALFA launched in September 2025. Since then it has done more than 2.8 lakh km in field operation and brought in over BDT 3.5 million in its first quarter. The electrical architecture underneath is meant to outlast this one vehicle. It is the base for the commercial and passenger platforms that come next.",
      },
      { kind: "photo", plate: img("zengo-alfa-first-lot"), place: "bleed" },
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
      { kind: "h", text: "The need" },
      {
        kind: "p",
        text: "In a commercial electric vehicle the battery decides most things. How far it goes, how long it stays on the road, what it costs to run, and when the owner has to find the money for a new one.",
      },
      { kind: "h", text: "The decision" },
      {
        kind: "p",
        text: "Most packs arrive with a specification written for someone else’s conditions. We wanted to start from ours. So we wrote down what the pack had to do here first, and only then chose the architecture and set the BMS requirements to meet it.",
      },
      { kind: "diagram" },
      { kind: "h", text: "Testing" },
      {
        kind: "p",
        text: "Testing was the slow part. Before it went to customers the pack ran 1.2 lakh km on our own driving cycle, because laboratory validation was not enough.",
      },
      { kind: "h", text: "In the field" },
      {
        kind: "p",
        text: "More than 20 packs went into real vehicles in the first two months, and deliveries have been growing about 6.5 percent a month. The target is more than 250 by the end of 2026. That is a target, not a result yet.",
      },
      { kind: "h", text: "What comes next" },
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
      { kind: "h", text: "The need" },
      {
        kind: "p",
        text: "For a three wheeler driver, charging decides when the vehicle can go back to work. For a garage owner, it shows up on the electricity bill. For the battery, it decides how quickly it ages.",
      },
      { kind: "h", text: "The decision" },
      {
        kind: "p",
        text: "So we did not start from the converter. We started from that working day and asked for one charger that could handle the lithium ion and lead acid packs people actually own, at 48 and 60 volts, while giving us control over how energy goes into the battery. The circuit came after that question, not before it.",
      },
      { kind: "diagram" },
      { kind: "h", text: "What we built" },
      {
        kind: "p",
        text: "What came out of it is a 1.2 kW half bridge resonant converter with an EMI filter on the input. The firmware runs a four stage charge, precharge, constant current, constant voltage and float, tuned to slow battery degradation. It protects against short circuits, overcharging and reversed polarity.",
      },

      {
        kind: "p",
        text: "It took twenty three versions to get the charger right. I did the PCB layout and wrote the embedded C and C++ firmware, and simulated it in LTspice, PLECS and Simulink. Then we built it, tested it, found what was wrong, and built it again.",
      },
      { kind: "h", text: "The result" },
      {
        kind: "p",
        text: "It reaches 87 percent efficiency at peak load. The habits it forced on us, the hardware design standards and the way we source components, became the starting point for every ZEROOZEN product after it.",
      },
      { kind: "pair", plates: [img("zenwall-first-version"), img("meet-bangladesh-expo")] },
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
      { kind: "h", text: "The need" },
      {
        kind: "p",
        text: "Every vehicle is designed around a drive cycle, a standard pattern of speeding up, cruising and stopping that stands in for real driving. The common ones, NEDC and WLTC, were built for other places. Dhaka’s traffic, roads, climate and constant stopping and starting are something else.",
      },
      { kind: "h", text: "What was missing" },
      {
        kind: "p",
        text: "Bangladesh did not have a drive cycle of its own. So instead of adjusting our assumptions around someone else’s standard, we started collecting our own.",
      },
      { kind: "h", text: "What we built" },
      {
        kind: "p",
        text: "The first problem was cost. Commercial OBD loggers cost too much to put on a fleet of light electric vehicles. ZENBOX was the answer. A high frequency laser sits over a 32 tooth gear and works as a light gate, counting teeth as they pass. That gives RPM once a second without touching the drivetrain, at roughly 90 percent lower unit cost than a commercial logger.",
      },
      { kind: "diagram" },
      { kind: "h", text: "In the field" },
      {
        kind: "p",
        text: "I captured operating conditions in Mirpur, the urban density, traffic patterns, climate, road infrastructure and the stop and start rhythm of the place, and built the Dhaka Urban Drive Cycle from them. As far as we know it is the first urban drive cycle for Bangladesh.",
      },
      { kind: "h", text: "Where it is used now" },
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

/* ---------- the person ---------- */

export const person = {
  name: "Sanjid Hasan Al Rifat",
  fullName: "Md. Sanjid Hasan Al Rifat",
  first: "Sanjid",
  email: "sanjidrifat@gmail.com",
  /* A link with an empty url is skipped until Sanjid sends it. */
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sanjid-rifat" },
    { label: "X", url: "https://x.com/SanjidHRifat" },
    { label: "Substack", url: "https://substack.com/@sanjidrifat1" },
    { label: "Facebook", url: "" },
  ],
};

export const hero = {
  greeting: "Hi, I’m Sanjid. I like figuring things out.",
  intro:
    "I trained as an electrical engineer. For the last few years most of my work has been on the roads of Dhaka, with electric three wheelers, the batteries inside them, the chargers they come back to, and the people who earn a living from all of it.",
  photo: img("figuring-it-out"),
};

/* A datasheet, the way a component is described. Every row is a fact from
 * his CV or his own words. */
export const datasheet = {
  title: "Datasheet",
  rev: "Rev. October 2026",
  portrait: img("emk-center"),
  rows: [
    { label: "Based in", value: "Dhaka, Bangladesh" },
    { label: "Hometown", value: "Narayanganj, by the Shitalakshya river" },
    { label: "Trained as", value: "Electrical and electronic engineer, AUST, 2018 to 2022" },
    { label: "Now", value: "Co-founder and Chief Product Officer, ZEROOZEN, since February 2024" },
    { label: "Before that", value: "Co-founder of MenuKi, a QR menu service for restaurants, 2022 to 2023" },
    { label: "Works on", value: "Electric three wheelers, battery packs, chargers and the data that sizes them" },
    { label: "Fleet", value: "More than 400 vehicles" },
    { label: "Moved by", value: "Intelligence built into systems" },
    { label: "Follows", value: "Steve Wozniak, Albert Einstein, Phil Knight, Haruki Murakami, Rumi" },
  ],
};

/* Dated photographs, in camera order. Captions are his, without the date. */
export const timeline = [
  { when: "July 2017", plate: img("cycle-village-road"), caption: "Gloves on and a village road ahead." },
  { when: "December 2017", plate: img("cycle-mustard-field"), caption: "With my bike in a mustard field." },
  { when: "October 2023", plate: img("menuki-salt-and-pepper"), caption: "Handing a stack of MenuKi cards to Tarikul Bhai, who owns Salt & Pepper. Pilot days." },
  { when: "October 2023", plate: img("menuki-table-card"), caption: "A MenuKi card on a restaurant table during the pilot. Scan it and the menu opens on your phone." },
  { when: "November 2023", plate: img("thingspeak-desk"), caption: "My desk. A rework station, loose boards, and the first days of our ThingSpeak server on the screen." },
  { when: "March 2024", plate: img("zenwall-first-version"), caption: "The first ZenWall chargers on a real wall, emergency stops and all." },
  { when: "August 2024", plate: img("orange-corners-certificate"), caption: "Holding our certificate from the second Orange Corners Bangladesh cohort." },
  { when: "May 2025", plate: img("convocation-2025"), caption: "My convocation at AUST, three years after I finished the degree." },
  { when: "September 2025", plate: img("zengo-alfa-first-lot"), caption: "Past midnight, pushing the first lot of ZENGO ALFA into a container by hand." },
  { when: "April 2026", plate: img("cells-on-bench-2026"), caption: "A cell assembly wired up on the bench." },
];

/* How he works, in his words. It is a real sequence, so it is numbered. */
export const method = [
  {
    text: "I usually start by going closer to the problem. I want to see what is actually happening.",
    seen: "Bangladesh had no drive cycle of its own, so before sizing batteries or estimating range we measured one in Mirpur.",
    story: "zenbox",
  },
  {
    text: "Then I try to understand the person experiencing it, and ask what actually matters.",
    seen: "For a driver, charging decides when the vehicle can go back to work. The charger started from that working day.",
    story: "zen-charger",
  },
  {
    text: "Then I decide what is worth solving, and figure out what it would take to make it real.",
    seen: "Before designing ZENGO ALFA, I built a model of the powertrain from local operating conditions.",
    story: "zengo-alfa",
  },
  {
    text: "And then I stay around long enough to see what happens after it leaves the lab.",
    seen: "ZenPack ran 1.2 lakh km on our own driving cycle before it went to customers.",
    story: "zenpack",
  },
];

export const moves = {
  text: "What moves me most is intelligence built into systems. The kind that can change how money works, how economies work, and take things somewhere people would not have thought of on their own.",
};

export const life = {
  intro: "Away from work.",
  photos: [img("friends-bonfire"), img("candid-bw"), img("cycle-dawn-road"), img("bicycle-night-street")],
};

export const updated = "October 2026";

/*
 * All copy for the site lives here.
 *
 * Sourcing rule: nothing on this site should claim a metric, customer,
 * title or outcome that is not backed by Sanjid's own materials.
 * Any field marked `confirm: true` (or any string listed in a `confirm`
 * array) is a draft written from the project brief and must be checked
 * against the CV / ZEROOZEN materials before launch. While
 * SHOW_CONFIRM_MARKS is true, those items render with a small orange
 * "to confirm" tag so nothing unverified ships by accident.
 */

export const SHOW_CONFIRM_MARKS = true;

/* Images: drop files into /public/images/... and set `src` to the path
 * (e.g. "/images/zengo-alfa/field.jpg"). While `src` is null the site
 * draws a measured placeholder plate with the caption shown. */
export type Plate = {
  src: string | null;
  alt: string;
  caption: string;
};

export const person = {
  name: "Sanjid Hasan Al Rifat",
  shortName: "Sanjid",
  location: "Dhaka, Bangladesh",
  coordinates: "23.81° N  90.41° E",
  identity: ["Engineer", "Strategist", "Builder", "Operator"],
  // Set before launch. Leave empty to hide the address on the page.
  email: "sanjidrifat@gmail.com",
  linkedin: "https://www.linkedin.com/in/sanjid-rifat",
};

export const hero = {
  headline: "I go where the problem is—and build what comes next.",
  support:
    "I work across strategy, product, engineering, and operations to turn real-world problems into valuable solutions that reach the people who need them.",
  primaryCta: "View My Work",
  secondaryCta: "Let’s Talk",
  thesis: "I don’t just build things. I make them work in the real world.",
};

/* The operating model from the brand brief. Order matters: it is a loop. */
export const method = {
  title: "How I work",
  lede: "The breadth is not a list of unrelated jobs. It is one way of working, and it runs in a loop.",
  steps: [
    { key: "Reality", line: "Go to where the work actually happens. Roads, workshops, depots, customers." },
    { key: "Problem", line: "Name what is broken, inefficient, underserved or poorly understood." },
    { key: "Customer", line: "Find who carries the cost of the problem and what they actually need." },
    { key: "Value", line: "Connect the technical problem to money, time and risk for that customer." },
    { key: "Priority", line: "Decide what deserves to be built, and what does not." },
    { key: "Strategy", line: "Plan the route from the current state to the larger system." },
    { key: "Build", line: "Get hands-on with the engineering: models, boards, firmware, prototypes." },
    { key: "Deploy", line: "Put it in real customers’ hands, with the supply chain behind it." },
    { key: "Operate", line: "Stay close after launch. Make the surrounding system work." },
    { key: "Learn", line: "Feed field data back into the next decision." },
  ],
  closing:
    "See the reality. Understand the problem. Decide what matters. Build it. Put it in people’s hands. Make the system work.",
};

export type Stage = { label: string; body: string; confirm?: boolean };
export type Figure = { value: string; label: string; confirm?: boolean };

export type Project = {
  id: string;
  index: string;
  name: string;
  kind: string;
  date: string;
  summary: string;
  diagram: "vehicle" | "pack" | "charger" | "drivecycle";
  plate: Plate;
  figures: Figure[];
  stages: Stage[];
  highlights: string[];
  disciplines: string[];
};

export const projects: Project[] = [
  {
    id: "zengo-alfa",
    index: "01",
    name: "ZENGO ALFA",
    kind: "Electric three-wheeler platform",
    date: "Launched Sep 2025",
    summary:
      "A Li-ion electric three-wheeler, optimized for rural and urban Bangladesh and built around real operating conditions, customer needs, vehicle economics and practical deployment.",
    diagram: "vehicle",
    plate: {
      src: null,
      alt: "ZENGO ALFA in field operation",
      caption: "Field photo: ZENGO ALFA in daily operation",
    },
    figures: [
      { value: "2.8 lakh+ km", label: "in field operation" },
      { value: "BDT 3.5M+", label: "revenue, first quarter after launch" },
      { value: "+20%", label: "payload capacity", confirm: true },
    ],
    stages: [
      {
        label: "The Reality",
        body: "Electric three-wheelers in Bangladesh were being designed and judged on foreign assumptions about range, load and energy use, not on the roads and duty cycles they actually face.",
      },
      {
        label: "The Insight",
        body: "The vehicle has to be engineered from local operating problems and the owner’s economics outward. That needs a local model of the vehicle, not a borrowed one.",
      },
      {
        label: "The Bet",
        body: "Build a mathematical powertrain and drivetrain model first, use it to optimize a platform for local use, and own the path to commercial deployment rather than stopping at a prototype.",
      },
      {
        label: "The Build",
        body: "A powertrain and drivetrain model that computes range, depth of discharge and energy per kilometre; optimized chassis; battery and motor integration; dual-lock security; integrated GPS with remote on/off and live connectivity.",
      },
      {
        label: "The Result",
        body: "Launched in September 2025 and commercialized. More than 2.8 lakh km in field operation and over BDT 3.5M in revenue in the first quarter after launch. The architecture is the base for future commercial and passenger platforms.",
      },
    ],
    highlights: [
      "Identifying local mobility and operating problems",
      "Powertrain and drivetrain modeling",
      "Vehicle architecture and optimization",
      "Integrated electronics, GPS and connectivity",
      "Commercialization and deployment",
      "Field validation and customer adoption",
    ],
    disciplines: ["Field research", "Vehicle engineering", "Product strategy", "Commercialization"],
  },
  {
    id: "zenpack",
    index: "02",
    name: "ZenPack",
    kind: "LFP battery platform",
    date: "In deployment",
    summary:
      "A domestically engineered LFP battery pack, designed around the realities of Bangladesh’s electric mobility ecosystem.",
    diagram: "pack",
    plate: {
      src: null,
      alt: "ZenPack battery module on the workshop bench",
      caption: "Workshop photo: ZenPack module and BMS",
    },
    figures: [
      { value: "1.2 lakh km", label: "of validation testing" },
      { value: "20+", label: "units delivered in two months" },
      { value: "250+", label: "units targeted by end of 2026" },
    ],
    stages: [
      {
        label: "The Reality",
        body: "Local operators depend on batteries that were not specified for how their vehicles are driven, charged and maintained here.",
        confirm: true,
      },
      {
        label: "The Insight",
        body: "A good pack starts as a list of field requirements, not a cell datasheet. The specification has to come from how vehicles are actually used.",
      },
      {
        label: "The Bet",
        body: "Engineer the pack domestically, validate it against a local driving cycle, and build the supply chain and operating system around it, because a pack without that system does not last in the field.",
      },
      {
        label: "The Build",
        body: "Turned field requirements into product specifications, defined the pack architecture and BMS requirements, and validated the design through ZEROOZEN’s own drive cycle across 1.2 lakh km of testing.",
      },
      {
        label: "The Result",
        body: "More than 20 units delivered to vehicles and customers within two months, growing 6.5% month on month, with a target of over 250 units by the end of 2026. A hybrid master-slave ZEN BMS is in development.",
      },
    ],
    highlights: [
      "Understanding local battery pain points",
      "Translating field requirements into product specifications",
      "Battery architecture and BMS requirements",
      "Validation using real-world driving data",
      "Deployment to actual vehicles and customers",
      "Building the surrounding supply and operating system",
    ],
    disciplines: ["Customer research", "Battery systems", "Supply chain", "Operations"],
  },
  {
    id: "zen-charger",
    index: "03",
    name: "ZEN Series Charger",
    kind: "Intelligent EV charger",
    date: "23 prototype iterations",
    summary:
      "A 1.2 kW intelligent charger for e-rickshaw packs, taken from engineering problem identification through to a physical product in the field.",
    diagram: "charger",
    plate: {
      src: null,
      alt: "ZEN Series Charger PCB during prototyping",
      caption: "Bench photo: charger PCB, prototype revision",
    },
    figures: [
      { value: "1.2 kW", label: "half-bridge resonant DC-DC" },
      { value: "48 / 60 V", label: "Li-ion and lead-acid packs" },
      { value: "87%", label: "efficiency at peak load" },
      { value: "23", label: "prototype iterations" },
    ],
    stages: [
      {
        label: "The Reality",
        body: "Operators charge a mix of lithium-ion and lead-acid packs at 48 V and 60 V, and the chargers in common use handled neither efficiency nor battery health well.",
        confirm: true,
      },
      {
        label: "The Insight",
        body: "A charger is part of the battery’s life, not an accessory. Efficiency, compatibility across chemistries and battery care are the value proposition.",
      },
      {
        label: "The Bet",
        body: "Design one universal charger in-house around that value proposition, instead of sourcing a generic unit per pack type.",
      },
      {
        label: "The Build",
        body: "Half-bridge resonant power stage with an input EMI filter; four-stage charging (pre-charge, CC, CV, float); short-circuit, overcharge and reverse-polarity protection. Full PCB layout and embedded C/C++ firmware, simulated in LTspice, PLECS and Simulink.",
      },
      {
        label: "The Result",
        body: "23 prototype iterations to a field-ready design with 87% efficiency at peak load. The hardware standards and sourcing processes set here became the base for later ZEROOZEN product lines.",
      },
    ],
    highlights: [
      "Identifying inefficiencies in existing charging solutions",
      "Value proposition around efficiency, compatibility and battery care",
      "Power-electronics architecture",
      "PCB design and embedded firmware",
      "Simulation and iterative prototyping",
      "Field validation and commercialization",
    ],
    disciplines: ["Power electronics", "Embedded systems", "Product definition", "Commercialization"],
  },
  {
    id: "zenbox",
    index: "04",
    name: "ZENBOX + Dhaka Urban Drive Cycle",
    kind: "Vehicle intelligence and local engineering data",
    date: "Mirpur, Dhaka",
    summary:
      "A systems-level project combining low-cost vehicle intelligence with locally relevant engineering data.",
    diagram: "drivecycle",
    plate: {
      src: null,
      alt: "ZENBOX telematics unit installed in a vehicle",
      caption: "Install photo: ZENBOX logger in a vehicle",
    },
    figures: [
      { value: "1 Hz", label: "RPM logging, non-contact" },
      { value: "~90%", label: "lower unit cost than OBD loggers" },
      { value: "95%", label: "data efficiency", confirm: true },
    ],
    stages: [
      {
        label: "The Reality",
        body: "Bangladesh had no drive cycle of its own. Vehicles and batteries were sized on NEDC and WLTC, which describe roads, traffic and stop-start behaviour that have little to do with Dhaka.",
      },
      {
        label: "The Insight",
        body: "Without local operating data, every downstream decision (range, pack size, motor sizing) inherits the wrong baseline. And commercial loggers cost too much to put on a fleet of small vehicles.",
      },
      {
        label: "The Bet",
        body: "Build a logger cheap enough to ride on real vehicles, collect the data directly, and turn it into a local drive-cycle baseline.",
      },
      {
        label: "The Build",
        body: "ZENBOX: a high-frequency laser sensor over a 32-tooth gear, working as a non-contact light-gate tachometer. Then the Dhaka Urban Drive Cycle, captured in Mirpur from real traffic, road, climate and stop-start conditions.",
      },
      {
        label: "The Result",
        body: "The drive cycle is now ZEROOZEN’s engineering baseline for vehicle performance evaluation, battery pack sizing and range estimation, and the reference for future regulatory submissions.",
      },
    ],
    highlights: [
      "Gap between global assumptions and Bangladesh’s road conditions",
      "Collecting real-world operating data",
      "Developing a local drive-cycle baseline",
      "ZENBOX as a low-cost telematics / data acquisition system",
      "Intelligence for vehicle design, battery sizing and fleet decisions",
    ],
    disciplines: ["Systems thinking", "Embedded hardware", "Data analysis", "Fleet strategy"],
  },
];

/* Smaller pieces of work that support the story but are not flagships. */
export const alsoBuilding = [
  { name: "ZEN BMS", line: "Hybrid master-slave BMS with active and passive balancing and EKF plus Coulomb-counting state-of-charge estimation.", status: "In development" },
  { name: "GMS", line: "Full-stack fleet software for vehicle tracking, fleet management, cash flow, attendance and rent workflows.", status: "Alpha tested", confirm: true },
  { name: "CMS", line: "Real-time dashboard for charger energy and efficiency.", status: "Architected" },
  { name: "Fleet operations", line: "400+ light electric vehicles under active fleet management across multiple cities.", status: "Ongoing" },
];

export const about = {
  portrait: {
    src: null,
    alt: "Sanjid Hasan Al Rifat in the ZEROOZEN workshop",
    caption: "Portrait: in the workshop, not the office",
  } as Plate,
  paragraphs: [
    "I’m an electrical engineer and Co-Founder & Chief Product Officer at ZEROOZEN Energy. My work spans engineering, product strategy, customer understanding, business strategy, operations, commercialization and execution.",
    "I’m most interested in the space between an idea and reality: understanding what is actually happening on the ground, identifying what matters, designing the right solution, and doing whatever work is necessary to make it function in the real world.",
    "In practice that has meant laying out charger PCBs and writing their firmware, building the powertrain model a vehicle is sized from, putting loggers on vehicles to measure Dhaka’s roads, sitting in investor meetings, and running a fleet of 400+ vehicles after they ship.",
  ],
  confirmParagraphs: [] as number[],
};

export type Role = {
  org: string;
  role: string;
  period: string;
  note: string;
  confirm?: boolean;
};

export const experience: Role[] = [
  {
    org: "ZEROOZEN Energy Ltd.",
    role: "Co-Founder & Chief Product Officer",
    period: "Feb 2024 – Present",
    note: "Vehicles, batteries, charging, telematics and fleet software for light electric vehicles in Bangladesh. Investor engagement, budgeting and capital allocation across hardware, R&D and go-to-market. A global supply chain integrated with local manufacturing.",
  },
  {
    org: "ZEROOZEN Energy Ltd.",
    role: "Hardware Design Engineer",
    period: "Sep 2023 – Jan 2024",
    note: "Designed the first-generation 1.2 kW charger through 23 prototypes. Set the hardware design standards and component-sourcing processes later product lines were built on.",
  },
  {
    org: "MenuKi",
    role: "Co-Founder & Business Strategist",
    period: "Oct 2022 – Dec 2023",
    note: "QR-menu SaaS. Business strategy, budgeting and fundraising. Designed the pilot that onboarded 25 restaurants in two cities within five days.",
  },
  {
    org: "Desktop IT",
    role: "Business Operations Strategist",
    period: "May 2023 – Jul 2023",
    note: "Market research and growth strategy that contributed to a 12% revenue increase.",
  },
  {
    org: "Ahsanullah University of Science & Technology",
    role: "BSc, Electrical & Electronic Engineering",
    period: "Apr 2018 – Dec 2022",
    note: "Electrical systems, electronics and communication. Thesis: IntelliClass, an IoT smart classroom with RFID attendance, environmental sensing and cloud logging.",
  },
];

export type Honor = { name: string; detail: string; year: string; confirm?: boolean };

export const recognition: Honor[] = [
  { name: "IDLC Startups Spotlight", detail: "ZEROOZEN featured as a high-potential EV deep-tech startup", year: "2025" },
  { name: "Orange Corners Bangladesh", detail: "Cohort 2. Dutch Embassy-backed accelerator, BDT 4.5 lakh grant", year: "Year to confirm", confirm: true },
  { name: "Aspire Leaders Program", detail: "Selected global participant in leadership development", year: "Year to confirm", confirm: true },
];

export const contact = {
  heading: "Have a problem worth digging into?",
  lede: "Tell me what is happening on the ground and what you want to change.",
  cta: "Start a Conversation",
  /* Optional form backend (e.g. a Formspree endpoint). When empty, the form
   * opens the visitor's email app addressed to person.email. */
  endpoint: "",
};

/*
 * All copy for the site lives here.
 *
 * Sourcing rule: nothing on this site should claim a metric, customer,
 * title or outcome that is not backed by Sanjid's own materials.
 * Any field marked `confirm: true` (or any string listed in a `confirm`
 * array) is a draft written from the project brief and must be checked
 * against the CV / ZEROOZEN materials before launch. While
 * SHOW_CONFIRM_MARKS is true, those items render with a small dashed
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

/* Each project is told in the order it happened, from someone's working
 * day to something running in the field:
 *
 *   REALITY → NEED → CUSTOMER → INSIGHT → DECISION → STRATEGY →
 *   TECHNOLOGY → DEPLOYMENT → ADOPTION → LEARNING
 *
 * On the page those ten beats are grouped under four panels, the site's
 * signature device: REALITY → DECISION → BUILD → FIELD. Technology shows
 * up as the response to a need, never as the opening line. */

export type Beat = { body: string; confirm?: boolean };
export type Figure = { value: string; label: string; confirm?: boolean };

export type Project = {
  id: string;
  index: string;
  name: string;
  date: string;
  /* Opening line of the story: the reality, in plain words. */
  opening: string;
  /* The question that drove the decision. Shown large in the DECISION panel. */
  question: string;
  diagram: "vehicle" | "pack" | "charger" | "drivecycle";
  realityPlate: Plate;
  fieldPlate: Plate;
  figures: Figure[];
  reality: Beat;
  need: Beat;
  customer: Beat;
  insight: Beat;
  decision: Beat;
  strategy: Beat;
  technology: Beat;
  deployment: Beat;
  adoption: Beat;
  learning: Beat;
};

export const projects: Project[] = [
  {
    id: "zengo-alfa",
    index: "01",
    name: "ZENGO ALFA",
    date: "Launched Sep 2025",
    opening:
      "Three-wheelers move people and goods across rural and urban Bangladesh every day, on roads and loads that imported designs were not built around.",
    question: "What does this vehicle have to do for its driver to earn a living from it?",
    diagram: "vehicle",
    realityPlate: {
      src: null,
      alt: "A three-wheeler driver at work on a Bangladeshi road",
      caption: "Reality: a driver’s working day",
    },
    fieldPlate: {
      src: null,
      alt: "ZENGO ALFA in commercial operation",
      caption: "Field: ZENGO ALFA in operation",
    },
    figures: [
      { value: "2.8 lakh+ km", label: "in field operation" },
      { value: "BDT 3.5M+", label: "revenue in the first quarter after launch" },
    ],
    reality: {
      body: "Range, depth of discharge and energy per kilometre were being estimated from foreign assumptions, not from how these vehicles are actually driven here.",
    },
    need: {
      body: "A vehicle whose range, payload and running cost hold up under local operating conditions.",
    },
    customer: {
      body: "Drivers and operators who earn from the vehicle every day, for whom a range shortfall or a day off the road is lost income.",
      confirm: true,
    },
    insight: {
      body: "The vehicle could not be optimized for Bangladesh until its core numbers were computed for Bangladesh.",
    },
    decision: {
      body: "Build our own powertrain and drivetrain model first, then design the vehicle from its outputs instead of adapting an existing platform.",
    },
    strategy: {
      body: "Treat it as a platform: connected from launch, with an electrical architecture that can grow into commercial and passenger variants.",
    },
    technology: {
      body: "I built the mathematical powertrain and drivetrain model that computes range, depth of discharge and energy per kilometre. Its outputs shaped an optimized chassis, matched battery and motor integration, dual-lock security, and integrated GPS with remote on/off and live connectivity.",
    },
    deployment: {
      body: "Launched commercially in September 2025, with live GPS tracking built in from the first vehicle.",
      confirm: true,
    },
    adoption: {
      body: "More than 2.8 lakh km in field operation, and over BDT 3.5M in revenue in the first quarter after launch.",
    },
    learning: {
      body: "The architecture is now the base for the next generation of dual-purpose commercial and passenger platforms.",
    },
  },
  {
    id: "zenpack",
    index: "02",
    name: "ZenPack",
    date: "In deployment",
    opening:
      "Electric three-wheelers in Bangladesh were running on batteries specified for other markets and other duty cycles.",
    question: "What does this battery need to do for its owner to make economic sense?",
    diagram: "pack",
    realityPlate: {
      src: null,
      alt: "A battery being serviced in a local garage",
      caption: "Reality: batteries in a local garage",
    },
    fieldPlate: {
      src: null,
      alt: "A ZenPack installed in a working vehicle",
      caption: "Field: ZenPack in a working vehicle",
    },
    figures: [
      { value: "1.2 lakh km", label: "of validation testing" },
      { value: "20+", label: "units delivered in the first two months" },
      { value: "250+", label: "units targeted by the end of 2026" },
    ],
    reality: {
      body: "The battery decides whether an electric three-wheeler earns money. Most packs on the road were not designed around local conditions.",
      confirm: true,
    },
    need: {
      body: "A pack whose life, cost and reliability make sense for a vehicle that has to work every day.",
    },
    customer: {
      body: "Owners and operators of electric three-wheelers.",
    },
    insight: {
      body: "A cell datasheet can’t say how a pack will be used here. A local driving cycle can, so the specification had to start there.",
    },
    decision: {
      body: "Engineer the pack domestically, and validate it against our own drive cycle instead of a foreign standard.",
    },
    strategy: {
      body: "Build the supply chain with the product: global sourcing integrated with local manufacturing, aiming for at least a 20% reduction in unit cost.",
    },
    technology: {
      body: "I turned field requirements into the product specification, the LFP pack architecture and the BMS requirements, then validated the design over 1.2 lakh km of testing on our proprietary drive cycle.",
    },
    deployment: {
      body: "Delivered to real vehicles and customers: more than 20 units within the first two months.",
    },
    adoption: {
      body: "Deliveries are growing 6.5% month on month, with a target of over 250 units by the end of 2026.",
    },
    learning: {
      body: "The next layer is our own BMS: ZEN BMS, a hybrid master-slave design with active and passive balancing, now in development.",
    },
  },
  {
    id: "zen-charger",
    index: "03",
    name: "ZEN Series Charger",
    date: "23 prototype iterations",
    opening:
      "For a three-wheeler driver, the charger is part of the working day. For a garage owner, it is part of the electricity bill.",
    question: "What should charging cost a driver in power, compatibility and battery life?",
    diagram: "charger",
    realityPlate: {
      src: null,
      alt: "Vehicles charging overnight in a garage",
      caption: "Reality: overnight charging in a garage",
    },
    fieldPlate: {
      src: null,
      alt: "ZEN Series Charger connected to a vehicle",
      caption: "Field: ZEN Series Charger in use",
    },
    figures: [
      { value: "87%", label: "efficiency at peak load" },
      { value: "48 / 60 V", label: "lithium-ion and lead-acid packs" },
      { value: "23", label: "prototype iterations" },
    ],
    reality: {
      body: "Drivers and garages charge a mix of lithium-ion and lead-acid packs at 48 V and 60 V, with chargers that waste power and wear batteries out.",
      confirm: true,
    },
    need: {
      body: "A charger that wastes less electricity, works with the packs people already own, and doesn’t shorten battery life.",
    },
    customer: {
      body: "Three-wheeler drivers and garage owners.",
    },
    insight: {
      body: "Efficiency, compatibility and battery care only create value together. A charger that is good at one of them still costs the owner on the others.",
    },
    decision: {
      body: "Design one universal charger for both chemistries and both voltages, instead of a unit per pack type.",
    },
    strategy: {
      body: "Develop it in-house, so the hardware standards and sourcing processes built for it could carry over to later products.",
    },
    technology: {
      body: "Then I worked backward into the electronics: a 1.2 kW half-bridge resonant converter with an input EMI filter, a four-stage charging algorithm (pre-charge, CC, CV, float), and short-circuit, overcharge and reverse-polarity protection. I did the PCB layout and C/C++ firmware, and simulated it in LTspice, PLECS and Simulink.",
    },
    deployment: {
      body: "23 prototype iterations to a design that was field-validated and commercialized.",
    },
    adoption: {
      body: "87% efficiency at peak load, with charging tuned to slow battery degradation.",
    },
    learning: {
      body: "The hardware design standards and component sourcing set up for the charger became the foundation for every later ZEROOZEN product line.",
    },
  },
  {
    id: "zenbox",
    index: "04",
    name: "ZENBOX + Dhaka Urban Drive Cycle",
    date: "Mirpur, Dhaka",
    opening:
      "Vehicles and batteries for Dhaka were being sized against NEDC and WLTC, drive cycles built on roads, traffic and climate that look nothing like Dhaka’s.",
    question: "How do you size a vehicle for Dhaka when no drive cycle describes Dhaka?",
    diagram: "drivecycle",
    realityPlate: {
      src: null,
      alt: "Stop-start traffic in Mirpur, Dhaka",
      caption: "Reality: stop-start traffic in Mirpur",
    },
    fieldPlate: {
      src: null,
      alt: "ZENBOX installed on a vehicle",
      caption: "Field: ZENBOX logging on a vehicle",
    },
    figures: [
      { value: "~90%", label: "lower unit cost than commercial OBD loggers" },
      { value: "1 Hz", label: "non-contact RPM logging" },
      { value: "95%", label: "data efficiency", confirm: true },
    ],
    reality: {
      body: "Bangladesh had no drive cycle of its own, so every estimate of range, pack size and motor size inherited someone else’s roads.",
    },
    need: {
      body: "Real operating data from real vehicles, collected at a cost a fleet of small vehicles could carry.",
    },
    customer: {
      body: "Our own engineering team first, then operators of light electric vehicles who need fleet telematics they can afford.",
    },
    insight: {
      body: "Commercial OBD loggers cost too much for light vehicles. The signal that mattered could be measured another way.",
    },
    decision: {
      body: "Build our own logger, and build Bangladesh’s first urban drive cycle from what it records.",
    },
    strategy: {
      body: "Start in one dense area, Mirpur, and make the result the baseline that vehicle design, battery sizing and regulatory work all refer to.",
    },
    technology: {
      body: "ZENBOX puts a high-frequency laser over a 32-tooth gear as a non-contact light-gate tachometer, logging RPM at 1 Hz without touching the drivetrain. I captured Mirpur’s operating conditions (density, traffic, climate, road infrastructure and stop-start behaviour) and built the drive cycle from them.",
    },
    deployment: {
      body: "ZENBOX logs on vehicles at roughly 90% lower unit cost than commercial OBD loggers.",
    },
    adoption: {
      body: "The Dhaka Urban Drive Cycle is now ZEROOZEN’s engineering baseline for vehicle performance evaluation, battery pack sizing and range estimation.",
    },
    learning: {
      body: "Local data changed how we specify products. The cycle is also the reference for future regulatory submissions.",
      confirm: true,
    },
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

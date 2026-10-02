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

/* CURRENT WORK: the layers at ZEROOZEN, shown as one connected system. */
export const currentWork = {
  title: "Current work",
  lede: "At ZEROOZEN, I work across the boundary between what people need, what technology can do, and what a business can actually execute.",
  note: "These are not separate departments. Each layer is a decision that changes the ones next to it.",
  layers: [
    { name: "Customer", line: "Drivers, operators and garages who earn from light electric vehicles, and whose margins decide what works." },
    { name: "Proposition", line: "What is worth paying for: uptime, range, running cost, battery life." },
    { name: "Product", line: "A vehicle, a battery, a charger and a data system, each designed from that proposition." },
    { name: "Engineering", line: "Powertrain models, power electronics, PCB and firmware, pack architecture and BMS." },
    { name: "Supply", line: "Global sourcing integrated with local manufacturing, aiming for at least 20% lower unit cost." },
    { name: "Deployment", line: "Products delivered to real vehicles and customers, not left as prototypes." },
    { name: "Operations", line: "400+ light electric vehicles under active fleet management across multiple cities." },
  ],
};

/* HOW I WORK: an operating philosophy, not a process diagram. */
export const philosophy = {
  title: "How I work",
  lines: [
    "Go to reality.",
    "Understand the people inside the problem.",
    "Find the constraint that actually matters.",
    "Decide what is worth solving.",
    "Build the smallest thing that can test the idea.",
    "Put it in the field.",
    "Watch what happens.",
    "Build from what reality teaches you.",
  ],
};

/* SYSTEMS I WORK ACROSS: what I actually do with each, not a tool list. */
export const systems = [
  {
    name: "Energy",
    scope: "Power electronics, charging systems, battery architecture, BMS.",
    work: "I designed the ZEN Series charger’s power stage, PCB and firmware, defined ZenPack’s architecture and BMS requirements, and am developing ZEN BMS with EKF-based state-of-charge estimation.",
  },
  {
    name: "Mobility",
    scope: "EV powertrain, drivetrain, energy modelling, vehicle systems.",
    work: "I built the light-EV powertrain model (range, depth of discharge, motor sizing, pack design) that ZENGO ALFA was engineered from.",
  },
  {
    name: "Intelligence",
    scope: "IoT, telemetry, connected vehicles, fleet data, monitoring.",
    work: "ZENBOX telematics, GPS and remote on/off on ZENGO ALFA, the CMS charger energy dashboard, and GMS fleet software for tracking, cash flow and rent. MQTT, CAN and RS-485 underneath.",
  },
  {
    name: "Product",
    scope: "Requirements, architecture, prioritisation, validation, commercialisation.",
    work: "I turn field conditions into specifications, decide what is worth building, validate against local data, and take the result to market.",
  },
  {
    name: "Operations",
    scope: "Supply chain, manufacturing, deployment, fleet operations.",
    work: "A global supply chain integrated with local manufacturing, 400+ vehicles under active fleet management, and budgeting and capital allocation across hardware, R&D and go-to-market.",
  },
];

/* PROJECTS
 *
 * Each project is a chain of reasoning, told under the four panels that are
 * the site's signature device:
 *
 *   REALITY   what was happening, why it mattered, what was missing
 *   DECISION  what we believed should change, and the idea
 *   BUILD     the system, and the technical decisions with their reasons
 *   FIELD     what it makes possible, and what happened in the field
 *
 * Technology is the enabler, never the opening. Every metric carries the
 * reason it matters. Raw specifications sit in `specs`, shown small. */

export type Text = { body: string; confirm?: boolean };
export type Choice = { title: string; why: string; confirm?: boolean };
export type Evidence = { value: string; because: string; confirm?: boolean };

export type Project = {
  id: string;
  index: string;
  name: string;
  date: string;
  thesis: string;
  question: string;
  diagram: "vehicle" | "pack" | "charger" | "drivecycle";
  realityPlate: Plate;
  fieldPlate: Plate;
  context: Text[];
  belief: Text;
  idea: Text;
  chain: string[];
  system: Text;
  depth: Choice[];
  value: Text;
  proof: Text;
  evidence: Evidence[];
  reflection: string;
  specs: string[];
};

export const projects: Project[] = [
  {
    id: "zengo-alfa",
    index: "01",
    name: "ZENGO ALFA",
    date: "Launched Sep 2025",
    thesis: "A commercial EV has to make economic sense before it makes technical sense.",
    question: "What does this vehicle have to do for its operator to earn from it?",
    diagram: "vehicle",
    realityPlate: { src: null, alt: "A three-wheeler operator at work on a Bangladeshi road", caption: "Reality: a working day on the road" },
    fieldPlate: { src: null, alt: "ZENGO ALFA in commercial operation", caption: "Field: ZENGO ALFA in operation" },
    context: [
      {
        body: "A three-wheeler is a working machine. Payload, range, energy consumption, reliability, uptime, serviceability and acquisition cost all affect the operator’s ability to earn from it.",
      },
      {
        body: "Yet the numbers these vehicles were designed around (range, depth of discharge, energy per kilometre) came from foreign assumptions, not from how they are driven here.",
      },
    ],
    belief: {
      body: "We treated the vehicle as a system rather than a collection of imported components, and decided to compute its core numbers for Bangladesh before designing anything.",
    },
    idea: { body: "Let the operator’s economics define the vehicle, and let a local powertrain model translate them into engineering." },
    chain: ["Vehicle", "Powertrain", "Energy", "Electronics", "Connectivity", "Operations"],
    system: {
      body: "Customer and operating requirements fed a mathematical powertrain and drivetrain model. Its outputs drove the drivetrain decisions, battery and motor integration, onboard electronics and connectivity, and finally the commercial product.",
    },
    depth: [
      {
        title: "Model before hardware",
        why: "Range, depth of discharge and energy per kilometre are computed from local operating parameters, so motor sizing and pack design start from Bangladesh rather than from a datasheet.",
      },
      {
        title: "Connected from launch",
        why: "Integrated GPS with remote on/off and live connectivity means the vehicle can be managed as part of a fleet, not just driven.",
      },
      {
        title: "Chassis and security for a working vehicle",
        why: "An optimized chassis and dual-lock security, because a commercial vehicle is loaded hard every day and earns nothing while it is off the road.",
        confirm: true,
      },
      {
        title: "Architecture with room to grow",
        why: "A scalable electrical architecture, so the same foundation can extend to dual-purpose commercial and passenger platforms.",
      },
    ],
    value: {
      body: "Operators get a vehicle designed around their roads and their economics, which can be tracked and managed as part of a connected fleet.",
    },
    proof: { body: "ZENGO ALFA launched commercially in September 2025 and went straight into field operation." },
    evidence: [
      { value: "2.8 lakh+ km", because: "of field operation, because the vehicle had to survive actual usage." },
      { value: "BDT 3.5M+", because: "in revenue in the first quarter after launch, because it had to make economic sense first." },
    ],
    reflection:
      "The result was ZENGO ALFA: a connected electric three-wheeler platform developed around local operating conditions and deployed in the field.",
    specs: [
      "Li-ion electric three-wheeler",
      "Powertrain and drivetrain model: range, DoD, energy/km",
      "Integrated GPS, remote on/off, live connectivity",
      "Dual-lock security",
      "Optimized chassis",
    ],
  },
  {
    id: "zenpack",
    index: "02",
    name: "ZenPack",
    date: "In deployment",
    thesis: "The battery determines whether the vehicle works.",
    question: "What does this battery need to do for its operator to make economic sense?",
    diagram: "pack",
    realityPlate: { src: null, alt: "Batteries being serviced in a local garage", caption: "Reality: batteries in a local garage" },
    fieldPlate: { src: null, alt: "A ZenPack installed in a working vehicle", caption: "Field: ZenPack in a working vehicle" },
    context: [
      {
        body: "In commercial electric mobility, the battery is not simply an energy-storage component. It defines usable range, uptime, operating economics, replacement cycles, and ultimately whether the vehicle makes sense to the person operating it.",
      },
      {
        body: "Pack specifications tended to arrive with the cells, written for conditions that are not ours.",
      },
    ],
    belief: {
      body: "We started by understanding those conditions locally and translating them into battery requirements, rather than importing a generic pack specification.",
    },
    idea: { body: "Treat the battery as an operating system for the vehicle, not a component." },
    chain: ["Field conditions", "Requirements", "Pack architecture", "BMS", "Validation", "Supply"],
    system: {
      body: "The platform combines battery architecture, BMS requirements, monitoring and validation around actual vehicle usage, with a supply chain that pairs global sourcing with local manufacturing.",
    },
    depth: [
      {
        title: "Requirements before cells",
        why: "Usable range, uptime and replacement cycles were written down as requirements first. The LFP pack architecture followed from them.",
      },
      {
        title: "Validated on our own drive cycle",
        why: "Testing ran on a proprietary driving cycle instead of a foreign standard, because the pack had to prove itself under the load it would actually see.",
      },
      {
        title: "Supply designed with the product",
        why: "Global sourcing integrated with local manufacturing, aiming for at least a 20% reduction in unit cost, because a pack the operator can’t afford solves nothing.",
      },
      {
        title: "Our own BMS next",
        why: "ZEN BMS, a hybrid master-slave design with active and passive balancing and EKF plus Coulomb-counting state-of-charge estimation, is in development.",
      },
    ],
    value: {
      body: "Operators get a pack specified for the way they actually drive, built with local manufacturing.",
    },
    proof: {
      body: "The pack was taken beyond the lab, validated against real driving data, then delivered to real vehicles and customers.",
    },
    evidence: [
      { value: "1.2 lakh km", because: "of testing, because laboratory validation was not enough." },
      { value: "20+ units", because: "delivered within two months, because the technology had to leave the lab." },
      { value: "6.5%", because: "month-on-month growth, with more than 250 units targeted by the end of 2026." },
    ],
    reflection: "The important transition was from battery as component to battery as an operating system for the vehicle.",
    specs: [
      "LFP chemistry",
      "Validated on a proprietary drive cycle",
      "ZEN BMS (in development): hybrid master-slave",
      "Active and passive balancing",
      "SoC: EKF + Coulomb counting",
    ],
  },
  {
    id: "zen-charger",
    index: "03",
    name: "ZEN Series Charger",
    date: "23 prototype iterations",
    thesis: "The charger is part of the vehicle’s economics.",
    question: "What should charging cost an operator, in time, electricity and battery life?",
    diagram: "charger",
    realityPlate: { src: null, alt: "Vehicles charging overnight in a garage", caption: "Reality: overnight charging in a garage" },
    fieldPlate: { src: null, alt: "ZEN Series Charger connected to a vehicle", caption: "Field: ZEN Series Charger in use" },
    context: [
      {
        body: "For an electric three-wheeler, charging is not a standalone electrical process. It determines when the vehicle can return to work, how much electricity the operator consumes, and how the battery is treated over time.",
      },
      {
        body: "The market ran on a mix of lithium-ion and lead-acid packs at 48 V and 60 V, and standard chargers gave little control over how energy entered the battery.",
        confirm: true,
      },
    ],
    belief: {
      body: "We started from the operating problem rather than the converter topology: build one charging platform that works across the battery chemistries and voltage classes common in the market, while giving us better control over how energy enters the battery.",
    },
    idea: { body: "One charger for the packs people actually own, that treats the battery as an asset." },
    chain: ["Grid", "EMI filter", "Resonant stage", "Charge control", "Battery", "Operator"],
    system: {
      body: "An input EMI filter keeps grid-side noise down. A half-bridge resonant DC-DC stage converts power for 48 V or 60 V packs. Embedded firmware runs a four-stage charge (pre-charge, constant current, constant voltage, float) and watches for faults.",
    },
    depth: [
      {
        title: "Resonant power stage",
        why: "A 1.2 kW half-bridge resonant converter reaching 87% efficiency at peak load, because every watt lost in the charger is paid for by the operator.",
      },
      {
        title: "Two chemistries, two voltages, one unit",
        why: "Supporting lithium-ion and lead-acid at 48 V and 60 V meant one product for the market as it is, not as it might become.",
      },
      {
        title: "Four-stage charging",
        why: "Pre-charge, CC, CV and float, tuned to reduce battery degradation, because the charger decides how the battery ages.",
      },
      {
        title: "Protection by default",
        why: "Short-circuit, overcharge and reverse-polarity protection, because the charger is connected by operators in garages, not by engineers in a lab.",
        confirm: true,
      },
      {
        title: "Iterated, not assumed",
        why: "PCB layout, embedded C/C++ firmware and simulation in LTspice, PLECS and Simulink went through 23 prototype iterations before deployment.",
      },
    ],
    value: {
      body: "Operators get one charger for the packs they own, less wasted electricity, and charging designed to protect the battery.",
    },
    proof: {
      body: "Field-validated and commercialized. The hardware design standards and component-sourcing processes built for it became the foundation for every later ZEROOZEN product line.",
    },
    evidence: [
      { value: "23 iterations", because: "because the first solution was not the final solution." },
      { value: "87%", because: "efficiency at peak load, because wasted energy is the operator’s cost." },
    ],
    reflection:
      "The interesting part is not that the converter works. It is that a relatively small piece of power electronics becomes an interface between the grid, the battery, the vehicle, and the operator’s livelihood.",
    specs: [
      "1.2 kW half-bridge resonant DC-DC",
      "48 V / 60 V output",
      "Lithium-ion and lead-acid",
      "Four-stage: pre-charge, CC, CV, float",
      "Short-circuit, overcharge, reverse-polarity protection",
      "Input EMI filter",
      "LTspice · PLECS · Simulink",
    ],
  },
  {
    id: "zenbox",
    index: "04",
    name: "ZENBOX + Dhaka Urban Drive Cycle",
    date: "Mirpur, Dhaka",
    thesis: "We were designing vehicles using assumptions that were not made for our roads.",
    question: "How do you size a vehicle for Dhaka when no drive cycle describes Dhaka?",
    diagram: "drivecycle",
    realityPlate: { src: null, alt: "Stop-start traffic in Mirpur, Dhaka", caption: "Reality: stop-start traffic in Mirpur" },
    fieldPlate: { src: null, alt: "ZENBOX installed on a vehicle", caption: "Field: ZENBOX logging on a vehicle" },
    context: [
      {
        body: "Global drive cycles such as NEDC and WLTC are useful engineering references. But vehicle behaviour in Dhaka is shaped by a different combination of traffic density, stop-start behaviour, road conditions, climate and infrastructure.",
      },
      {
        body: "Bangladesh had no drive cycle of its own, and the commercial loggers that could measure one cost too much for the economics of light electric vehicles.",
      },
    ],
    belief: { body: "Instead of adjusting our assumptions around an existing standard, we started collecting reality." },
    idea: { body: "Measure the vehicle cheaply enough that measurement can scale, and let the data set the baseline." },
    chain: ["Road", "Vehicle", "ZENBOX", "Data", "Drive cycle", "Design decisions"],
    system: {
      body: "That led to two connected systems: ZENBOX, a low-cost way to capture the physical behaviour of the vehicle, and a locally derived drive-cycle baseline built from operating conditions captured in Mirpur, Dhaka.",
    },
    depth: [
      {
        title: "Measurement priced for light EVs",
        why: "The interesting decision was not simply using a sensor. It was finding a measurement architecture inexpensive enough for light electric vehicles while still producing useful operational data.",
      },
      {
        title: "A light gate instead of an OBD port",
        why: "A high-frequency laser over a 32-tooth gear works as a non-contact tachometer, recording RPM at 1 Hz with no mechanical interference with the drivetrain.",
      },
      {
        title: "The variables that make Dhaka different",
        why: "Urban density, traffic patterns, climate, road infrastructure and stop-start behaviour were captured as the inputs to the cycle.",
      },
    ],
    value: {
      body: "Vehicle evaluation, battery sizing and range estimation can start from Dhaka’s roads, and light-EV operators get a route to fleet telematics they can afford.",
    },
    proof: {
      body: "The Dhaka Urban Drive Cycle is now ZEROOZEN’s engineering baseline for vehicle performance evaluation, battery pack sizing and range estimation, and the reference for future regulatory submissions.",
    },
    evidence: [
      { value: "~90%", because: "lower unit cost than commercial loggers, because measurement had to fit the economics of a light EV." },
      { value: "1 Hz", because: "RPM logging without touching the drivetrain, so the logger can ride on working vehicles." },
    ],
    reflection: "The resulting data became an engineering input for vehicle evaluation, battery sizing and range estimation.",
    specs: [
      "Laser light-gate tachometer",
      "32-tooth gear, non-contact",
      "1 Hz RPM logging",
      "Drive cycle: Mirpur, Dhaka",
      "Replaces NEDC / WLTC as design baseline",
    ],
  },
];

export const about = {
  portrait: {
    src: null,
    alt: "Sanjid Hasan Al Rifat in the ZEROOZEN workshop",
    caption: "Portrait: in the workshop",
  } as Plate,
  paragraphs: [
    "I am an electrical engineer by training, but most of my work happens at the edges between disciplines.",
    "I am interested in problems where engineering, customers, economics and execution meet. At ZEROOZEN, that means moving between field realities, product decisions, technical architecture, strategy and operations, depending on what the problem requires.",
    "I like going deep enough to understand how something actually works, and staying close enough to reality to see whether it works for the person who ultimately has to use it.",
  ],
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

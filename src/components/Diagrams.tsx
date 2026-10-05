/* Technical line drawings for each project. They are schematic, not to
 * scale, and carry no numbers that are not in Sanjid's own materials. */

type Callout = { x: number; y: number; tx: number; ty: number; label: string; anchor?: "start" | "end" };

function Callouts({ items }: { items: Callout[] }) {
  return (
    <g>
      {items.map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r={3} className="dw-dot" />
          <polyline points={`${c.x},${c.y} ${c.tx},${c.ty}`} className="dw-thin" />
          <text
            x={c.anchor === "end" ? c.tx - 6 : c.tx + 6}
            y={c.ty + 4}
            textAnchor={c.anchor ?? "start"}
            className="dw-text hi"
          >
            {c.label}
          </text>
        </g>
      ))}
    </g>
  );
}

function Wheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className="dw-fill" />
      <circle cx={cx} cy={cy} r={r * 0.55} className="dw-thin" />
      <circle cx={cx} cy={cy} r={2.5} className="dw-dot" />
      <line x1={cx - r - 8} y1={cy} x2={cx + r + 8} y2={cy} className="dw-dash" />
      <line x1={cx} y1={cy - r - 8} x2={cx} y2={cy + r + 8} className="dw-dash" />
    </g>
  );
}

function Vehicle() {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Side elevation sketch of the ZENGO ALFA three-wheeler with its battery bay, motor, GPS module and chassis marked">
      <text x={24} y={32} className="dw-text">Side elevation · schematic, not to scale</text>
      <line x1={24} y1={330} x2={616} y2={330} className="dw-thin" />
      {/* body */}
      <path d="M96 286 L96 176 L120 160 L372 160 L372 118 L446 118 L522 206 L548 222 L548 286 Z" className="dw-fill" />
      <path d="M380 126 L440 126 L506 204 L380 204 Z" className="dw-thin" />
      <line x1={120} y1={160} x2={120} y2={286} className="dw-thin" />
      <line x1={372} y1={160} x2={372} y2={286} className="dw-thin" />
      {/* chassis rail */}
      <line x1={88} y1={292} x2={556} y2={292} className="dw-accent" />
      {/* battery bay */}
      <rect x={210} y={250} width={138} height={34} className="dw-fill-accent" />
      {/* motor at rear axle */}
      <circle cx={176} cy={300} r={12} className="dw-fill-accent" />
      {/* gps module */}
      <rect x={398} y={110} width={26} height={8} className="dw-fill-accent" />
      <Wheel cx={176} cy={300} r={30} />
      <Wheel cx={500} cy={302} r={28} />
      {/* wheelbase dimension */}
      <line x1={176} y1={360} x2={500} y2={360} className="dw-thin" />
      <line x1={176} y1={352} x2={176} y2={368} className="dw-thin" />
      <line x1={500} y1={352} x2={500} y2={368} className="dw-thin" />
      <text x={338} y={384} textAnchor="middle" className="dw-text">Wheelbase · from powertrain model</text>
      <Callouts
        items={[
          { x: 411, y: 110, tx: 470, ty: 66, label: "GPS + connectivity" },
          { x: 280, y: 250, tx: 300, ty: 210, label: "Battery bay" },
          { x: 176, y: 300, tx: 60, ty: 232, label: "Motor", anchor: "end" },
          { x: 540, y: 292, tx: 590, ty: 252, label: "Chassis", anchor: "end" },
        ]}
      />
    </svg>
  );
}

function Pack() {
  const cells = Array.from({ length: 10 }, (_, i) => i);
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Schematic of the ZenPack LFP pack: a cell array with slave boards reporting to a master BMS">
      <text x={24} y={32} className="dw-text">Pack architecture · schematic · ZEN BMS in development</text>
      <rect x={40} y={110} width={392} height={200} className="dw-thin" />
      <text x={48} y={102} className="dw-text">Enclosure</text>
      {[0, 1].map((row) =>
        cells.map((i) => (
          <rect key={`${row}-${i}`} x={56 + i * 37} y={164 + row * 70} width={30} height={58} className="dw-fill" />
        )),
      )}
      {/* bus bars */}
      {cells.slice(0, 9).map((i) => (
        <line key={`b${i}`} x1={71 + i * 37} y1={160} x2={108 + i * 37} y2={160} className="dw-accent" />
      ))}
      {/* slave boards */}
      <rect x={56} y={124} width={178} height={22} className="dw-fill-accent" />
      <rect x={241} y={124} width={178} height={22} className="dw-fill-accent" />
      <text x={145} y={139} textAnchor="middle" className="dw-text or">Slave A</text>
      <text x={330} y={139} textAnchor="middle" className="dw-text or">Slave B</text>
      {/* master */}
      <rect x={478} y={150} width={130} height={110} className="dw-fill" />
      <text x={543} y={178} textAnchor="middle" className="dw-text hi">Master BMS</text>
      <text x={543} y={202} textAnchor="middle" className="dw-text">SoC: EKF +</text>
      <text x={543} y={218} textAnchor="middle" className="dw-text">Coulomb count</text>
      <text x={543} y={242} textAnchor="middle" className="dw-text">Act./pass. bal.</text>
      <polyline points="419,135 452,135 452,180 478,180" className="dw-dash" />
      <text x={456} y={126} className="dw-text">CAN</text>
      <line x1={543} y1={260} x2={543} y2={330} className="dw-thin" />
      <text x={543} y={348} textAnchor="middle" className="dw-text">To vehicle · CAN / RS-485</text>
      <text x={236} y={336} textAnchor="middle" className="dw-text hi">LFP cell array</text>
      <line x1={56} y1={326} x2={416} y2={326} className="dw-thin" />
    </svg>
  );
}

function Charger() {
  const blocks = [
    ["EMI", "filter"],
    ["Recti-", "fier"],
    ["Half-bridge", "resonant"],
    ["Xfmr", ""],
    ["Output", "rectifier"],
    ["Battery", "48/60 V"],
  ];
  const w = 80;
  const gap = 16;
  const x0 = 48;
  // four-stage charge profile, qualitative
  const cx = 330;
  const cy = 360;
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Block diagram of the ZEN Series Charger power stage with MCU feedback, and a sketch of its four-stage charging profile">
      <text x={24} y={32} className="dw-text">Power stage · 1.2 kW · block diagram</text>
      <text x={24} y={98} className="dw-text">AC</text>
      <line x1={24} y1={106} x2={x0} y2={106} className="dw-line" />
      {blocks.map(([a, b], i) => {
        const x = x0 + i * (w + gap);
        const hi = i === 2;
        return (
          <g key={a}>
            <rect x={x} y={78} width={w} height={56} className={hi ? "dw-fill-accent" : "dw-fill"} />
            <text x={x + w / 2} y={102} textAnchor="middle" className={`dw-text ${hi ? "or" : "hi"}`}>{a}</text>
            <text x={x + w / 2} y={118} textAnchor="middle" className="dw-text">{b}</text>
            {i < blocks.length - 1 && <line x1={x + w} y1={106} x2={x + w + gap} y2={106} className="dw-line" />}
          </g>
        );
      })}
      {/* MCU */}
      <rect x={208} y={186} width={176} height={44} className="dw-fill" />
      <text x={296} y={213} textAnchor="middle" className="dw-text hi">MCU · C/C++ firmware</text>
      <polyline points="240,186 240,134" className="dw-dash" />
      <polyline points="384,208 464,208 464,134" className="dw-dash" />
      <text x={472} y={176} className="dw-text">V / I sense</text>
      <text x={110} y={176} className="dw-text">Gate drive</text>
      <text x={48} y={256} className="dw-text">Protection: short-circuit · overcharge · reverse polarity</text>
      {/* charge profile */}
      <text x={24} y={290} className="dw-text">Four-stage profile · qualitative</text>
      <line x1={48} y1={cy} x2={612} y2={cy} className="dw-thin" />
      <line x1={48} y1={300} x2={48} y2={cy} className="dw-thin" />
      <polyline points={`48,350 120,350 120,312 ${cx},312 420,340 520,352 612,352`} className="dw-accent" />
      <polyline points={`48,346 120,336 ${cx},318 420,316 520,324 612,324`} className="dw-dash" />
      {[
        [84, "Pre"],
        [225, "CC"],
        [375, "CV"],
        [566, "Float"],
      ].map(([x, l]) => (
        <text key={l} x={x} y={384} textAnchor="middle" className="dw-text hi">{l}</text>
      ))}
      {[120, cx, 520].map((x) => (
        <line key={x} x1={x} y1={300} x2={x} y2={cy} className="dw-dash" />
      ))}
      <text x={612} y={292} textAnchor="end" className="dw-text">- - V   ━ I</text>
    </svg>
  );
}

/* Deterministic pseudo-random stop-start trace. Illustrative only. */
function trace(): string {
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const pts: [number, number][] = [];
  let t = 0;
  while (t < 560) {
    const idle = 8 + rnd() * 22;
    const accel = 8 + rnd() * 10;
    const cruise = 10 + rnd() * 40;
    const decel = 6 + rnd() * 8;
    const peak = 22 + rnd() * 70;
    pts.push([t, 0]);
    t += idle;
    pts.push([t, 0]);
    t += accel;
    pts.push([t, peak]);
    const steps = Math.max(1, Math.round(cruise / 6));
    for (let s = 0; s < steps; s++) {
      t += cruise / steps;
      pts.push([t, Math.max(8, peak + (rnd() - 0.5) * 22)]);
    }
    t += decel;
    pts.push([t, 0]);
  }
  return pts
    .filter(([x]) => x <= 560)
    .map(([x, y]) => `${(56 + x).toFixed(1)},${(200 - y).toFixed(1)}`)
    .join(" ");
}

const TRACE = trace();

function DriveCycle() {
  const teeth = 32;
  const gx = 150;
  const gy = 300;
  const r = 52;
  const gear = Array.from({ length: teeth }, (_, i) => {
    const a0 = (i / teeth) * Math.PI * 2;
    const a1 = a0 + (Math.PI * 2) / teeth / 2;
    const p = (a: number, rr: number) => `${(gx + Math.cos(a) * rr).toFixed(1)},${(gy + Math.sin(a) * rr).toFixed(1)}`;
    return `${p(a0, r)} ${p(a0, r + 8)} ${p(a1, r + 8)} ${p(a1, r)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Sketch of a stop-start urban speed trace and the ZENBOX light-gate tachometer over a 32-tooth gear">
      <text x={24} y={32} className="dw-text">Speed vs time · illustrative, replace with DUDC data</text>
      <line x1={56} y1={200} x2={616} y2={200} className="dw-thin" />
      <line x1={56} y1={56} x2={56} y2={200} className="dw-thin" />
      <text x={48} y={64} textAnchor="end" className="dw-text">v</text>
      <text x={616} y={218} textAnchor="end" className="dw-text">t</text>
      <polyline points={TRACE} className="dw-accent" />
      <line x1={56} y1={118} x2={616} y2={118} className="dw-dash" />
      <text x={612} y={112} textAnchor="end" className="dw-text">NEDC / WLTC assumption</text>
      {/* ZENBOX light gate */}
      <polygon points={gear} className="dw-fill" />
      <circle cx={gx} cy={gy} r={r} className="dw-fill" />
      <circle cx={gx} cy={gy} r={10} className="dw-thin" />
      <rect x={gx + 66} y={gy - 70} width={20} height={14} className="dw-fill-accent" />
      <rect x={gx + 66} y={gy - 34} width={20} height={14} className="dw-fill-accent" />
      <line x1={gx + 76} y1={gy - 56} x2={gx + 76} y2={gy - 34} className="dw-accent" />
      <text x={gx + 96} y={gy - 58} className="dw-text hi">Laser</text>
      <text x={gx + 96} y={gy - 22} className="dw-text hi">Receiver</text>
      <text x={gx} y={gy + r + 32} textAnchor="middle" className="dw-text">32-tooth gear</text>
      <rect x={380} y={268} width={200} height={80} className="dw-fill" />
      <text x={480} y={296} textAnchor="middle" className="dw-text hi">ZENBOX</text>
      <text x={480} y={316} textAnchor="middle" className="dw-text">RPM @ 1 Hz</text>
      <text x={480} y={334} textAnchor="middle" className="dw-text">→ fleet data</text>
      <polyline points={`${gx + 86},${gy - 27} 330,${gy - 27} 330,308 380,308`} className="dw-dash" />
    </svg>
  );
}

export function Diagram({ kind }: { kind: "vehicle" | "pack" | "charger" | "drivecycle" }) {
  switch (kind) {
    case "vehicle":
      return <Vehicle />;
    case "pack":
      return <Pack />;
    case "charger":
      return <Charger />;
    case "drivecycle":
      return <DriveCycle />;
  }
}

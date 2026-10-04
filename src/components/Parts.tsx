import type { ReactNode } from "react";
import type { Place, Plate as PlateData } from "../content/site";

/* A photograph. Only real photos are shown: a plate with no src renders
 * nothing, so a missing photo never becomes a placeholder on the page. */
export function Photo({ plate, place, className }: { plate: PlateData; place?: Place; className?: string }) {
  if (!plate.src) return null;
  const classes = ["plate", plate.shape ?? "landscape", `tone-${plate.tone ?? "colour"}`];
  if (place && place !== "column") classes.push(`place-${place}`);
  if (className) classes.push(className);
  return (
    <figure className={classes.join(" ")}>
      <img src={plate.src} alt={plate.alt} loading="lazy" decoding="async" />
      <figcaption>{plate.caption}</figcaption>
    </figure>
  );
}

/* Photos side by side at one shared height. Each takes width in proportion
 * to its shape, so nothing is cropped. */
export function PhotoRow({ plates, className }: { plates: PlateData[]; className?: string }) {
  const shown = plates.filter((p) => p.src);
  if (!shown.length) return null;
  return (
    <div className={`photo-row${className ? ` ${className}` : ""}`}>
      {shown.map((p) => (
        <figure key={p.src} className={`plate tone-${p.tone ?? "colour"}`} style={{ flexGrow: p.ratio ?? 1, flexBasis: 0 }}>
          <img src={p.src!} alt={p.alt} loading="lazy" decoding="async" style={{ aspectRatio: String(p.ratio ?? 1.5) }} />
          <figcaption>{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function DiagramPlate({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="plate diagram">
      <div className="frame">{children}</div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

import type { ReactNode } from "react";
import type { Plate as PlateData } from "../content/site";

/* A photograph. Only real photos are shown: a plate with no src renders
 * nothing, so a missing photo never becomes a placeholder on the page. */
export function Photo({ plate, className }: { plate: PlateData; className?: string }) {
  if (!plate.src) return null;
  return (
    <figure className={`plate ${plate.shape ?? "landscape"} tone-${plate.tone ?? "colour"}${className ? ` ${className}` : ""}`}>
      <img src={plate.src} alt={plate.alt} loading="lazy" decoding="async" />
      <figcaption>{plate.caption}</figcaption>
    </figure>
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

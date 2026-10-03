import type { ReactNode } from "react";
import { SHOW_CONFIRM_MARKS, type Plate as PlateData } from "../content/site";

export function Confirm({ show }: { show?: boolean }) {
  if (!show || !SHOW_CONFIRM_MARKS) return null;
  return (
    <span className="confirm" title="Draft copy. Check against Sanjid's materials before launch.">
      to confirm
    </span>
  );
}

function Crops() {
  return (
    <>
      <span className="crop tl" />
      <span className="crop tr" />
      <span className="crop bl" />
      <span className="crop br" />
    </>
  );
}

/* A photo plate. With no src it draws a hatched placeholder naming the
 * file to drop in, so real images can replace it without code changes. */
export function Photo({ plate, path, tall }: { plate: PlateData; path: string; tall?: boolean }) {
  return (
    <figure className="plate">
      <div className={`frame${tall ? " tall" : ""}`}>
        {plate.src ? (
          <img src={plate.src} alt={plate.alt} loading="lazy" />
        ) : (
          <div className="placeholder" role="img" aria-label={`Placeholder for ${plate.alt}`}>
            <div className="tag">
              <span>Photo to come</span>
              <span className="path">public{path}</span>
            </div>
          </div>
        )}
        <Crops />
      </div>
      <figcaption>
        <span>{plate.caption}</span>
      </figcaption>
    </figure>
  );
}

export function DiagramPlate({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="plate diagram">
      <div className="frame">{children}</div>
      <figcaption>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

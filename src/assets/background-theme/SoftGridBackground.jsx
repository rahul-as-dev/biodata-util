import React from "react";

export const SoftGridBackground = React.memo(() => (
  <div
    className="
      absolute inset-0 -z-10 overflow-hidden
      pointer-events-none select-none
      bg-white dark:bg-slate-950
    "
  >
    {/* Dot grid */}
    <div
      className="
        absolute inset-0
        opacity-[0.55]
        dark:opacity-[0.35]
      "
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--grid-dot) 1.2px, transparent 1.2px)",
        backgroundSize: "20px 20px",
      }}
    />

    {/* Diagonal line texture (adds contrast without noise) */}
    <div
      className="
        absolute inset-0
        opacity-[0.15]
        dark:opacity-[0.25]
      "
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--grid-line) 0 1px, transparent 1px 18px)",
      }}
    />

    {/* Vignette for edge contrast */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at center, transparent 55%, var(--grid-vignette))",
      }}
    />

    {/* CSS variables */}
    <style jsx>{`
      :root {
        --grid-dot: rgba(51, 65, 85, 0.75);        /* slate-700 */
        --grid-line: rgba(51, 65, 85, 0.35);
        --grid-vignette: rgba(0, 0, 0, 0.06);
      }

      .dark {
        --grid-dot: rgba(226, 232, 240, 0.75);    /* slate-200 */
        --grid-line: rgba(226, 232, 240, 0.45);
        --grid-vignette: rgba(0, 0, 0, 0.45);
      }
    `}</style>
  </div>
));

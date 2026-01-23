import React from "react";

export const MacroDotBackground = React.memo(() => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
    {/* Base background */}
    <div className="absolute inset-0 bg-white dark:bg-slate-950" />

    {/* Hex grid – offset dots */}
    <div
      className="absolute inset-0 opacity-[0.7] dark:opacity-[0.55]"
      style={{
        backgroundImage: `
          radial-gradient(circle, var(--dot-color) 2.6px, transparent 2.6px),
          radial-gradient(circle, var(--dot-color) 2.6px, transparent 2.6px)
        `,
        backgroundSize: "40px 40px",
        backgroundPosition: "0 0, 20px 20px",
      }}
    />

    {/* Subtle vignette */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at center, transparent 55%, var(--vignette))",
      }}
    />

    {/* Theme variables */}
    <style jsx>{`
      :root {
        --dot-color: rgba(30, 41, 59, 0.85);   /* slate-800 */
        --vignette: rgba(0, 0, 0, 0.08);
      }

      .dark {
        --dot-color: rgba(226, 232, 240, 0.85); /* slate-200 */
        --vignette: rgba(0, 0, 0, 0.45);
      }
    `}</style>
  </div>
));

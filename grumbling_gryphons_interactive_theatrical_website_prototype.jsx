import React, { useEffect } from "react";

// Minimal, self-contained app that fixes invalid JSX and renders the banner safely.
// Theme tokens
const THEME = {
  gold: "#ffcc00",
  purple: "#2d0d4b",
  navy: "#0c0c16",
  orange: "#ff8c2a",
};

function SiteBanner() {
  return (
    <div className="w-full" style={{ background: THEME.navy }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-3 text-center md:flex-row">
        <div className="flex items-center gap-4">
          {/* NOTE: Swap src for your deployed path. This placeholder will not crash if it fails to load. */}
          <img
            src="/assets/grumbling-gryphons-banner.png"
            alt="Grumbling Gryphons Traveling Children's Theater"
            className="h-16 w-auto"
          />
          <div className="hidden md:block text-white text-sm md:text-base">
            <span className="mr-2 font-serif">Celebrating our 5th Decade!</span>
            <span className="opacity-80">Winner of the 2003 Connecticut Governor’s Arts Award</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <a
            href="https://www.facebook.com/Grumbling-Gryphons-Theatre-Company-374597725065/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white hover:bg-white/20"
          >
            Like us on Facebook!
          </a>
          <a
            href="https://www.youtube.com/channel/UC8_JxL1Oy618r69AhCJJ6rw/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white hover:bg-white/20"
          >
            View more on YouTube!
          </a>
          <a
            href="#support"
            className="rounded-full px-3 py-1 font-semibold text-black"
            style={{ background: THEME.gold }}
          >
            Donate now via PayPal Giving Fund
          </a>
        </div>
      </div>
    </div>
  );
}

// Simple placeholder main content so the page renders even if other sections are under construction.
function MainContent() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10" style={{ color: "white" }}>
      <h1 className="font-serif text-3xl" style={{ color: THEME.gold }}>Prototype Running</h1>
      <p className="mt-2 opacity-80">
        The banner renders above. Use this shell while we re‑integrate the rest of the interactive sections.
      </p>
      <section id="support" className="mt-8">
        <h2 className="font-serif text-2xl" style={{ color: THEME.gold }}>Support</h2>
        <p className="opacity-80">
          We’re a 501(c)(3). Donate via the PayPal Giving Fund. All contributions are tax‑deductible.
        </p>
      </section>
    </main>
  );
}

// Lightweight runtime tests to guard against the previous error (bad/missing closing tags, etc.).
function DevTests() {
  useEffect(() => {
    const results = [];
    const assert = (cond, msg) => results.push({ pass: !!cond, msg });

    // Test 1: Banner exists
    assert(document.querySelector("img[alt^='Grumbling Gryphons']"), "Banner image renders");
    // Test 2: Three CTA links exist and are closed/attached to DOM
    const ctas = document.querySelectorAll("a");
    assert(ctas.length >= 3, "CTA links render (>=3)");
    // Test 3: Donate button points to #support
    const donate = Array.from(ctas).find((a) => a.getAttribute("href") === "#support");
    assert(!!donate, "Donate CTA points to #support");

    // Report to console (keeps UI clean and avoids object-as-child mistakes)
    console.group("DevTests – Banner");
    results.forEach((r, i) => console[r.pass ? "log" : "error"](`#${i + 1} ${r.pass ? "PASS" : "FAIL"}: ${r.msg}`));
    console.groupEnd();
  }, []);
  return null;
}

export default function GrumblingGryphonsApp() {
  // Root wrapper sets a safe dark background; avoids image dependencies.
  return (
    <div style={{ background: `radial-gradient(1000px 500px at 50% 0%, ${THEME.purple}, ${THEME.navy})`, minHeight: "100vh" }}>
      <SiteBanner />
      <MainContent />
      <DevTests />
    </div>
  );
}

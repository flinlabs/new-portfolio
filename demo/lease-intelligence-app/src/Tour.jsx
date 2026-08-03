import React, { useEffect, useRef, useState } from "react";
import { C } from "./ui.jsx";

// First-run guided tour. Each step spotlights an element (by data-tour id),
// switching tabs as needed. Completion is remembered so it runs once; the
// header "?" replays it.

export const tourSeen = () => {
  try { return window.localStorage.getItem("lai-tour-done") === "1"; } catch { return true; }
};
export const markTourSeen = () => {
  try { window.localStorage.setItem("lai-tour-done", "1"); } catch { /* private mode etc. */ }
};

const STEPS = [
  { center: true, title: "Welcome to Lease Intelligence",
    body: "A prototype for self-serve answers over the active lease portfolio, grounded in Harvey lease abstracts. This tour takes about a minute." },
  { target: "tabs", tab: "ask", title: "Two Tabs",
    body: "Ask answers plain-English questions with citations. Dashboard tracks critical dates \u2014 expirations, rent steps, options, and letters of credit." },
  { target: "suggestions", tab: "ask", title: "LLM Querying",
    body: "Try a suggested question, or type your own below. Every factual claim in an answer carries a numbered citation back to the abstract clause it came from." },
  { target: "inputbar", tab: "ask", title: "Scope Filter",
    body: "The Scope control narrows retrieval to a single property. Conversations thread like any chat app, and answers include the source documents." },
  { target: "sidebar", tab: "ask", title: "Conversation History",
    body: "Conversations from this session live here. Hover one for the \u22ef menu to rename or delete it." },
  { target: "kpis", tab: "dashboard", title: "Portfolio Overview",
    body: "Live counts computed from the parsed abstracts \u2014 no LLM at runtime, so these numbers are deterministic and instant." },
  { target: "loc", tab: "dashboard", title: "Letter-of-Credit Tracker",
    body: "LOCs approaching expiration are flagged with call-the-bank windows." },
  { target: "browser", tab: "dashboard", title: "Lease Abstract Browser",
    body: "Filter by property, status, options, deposit or electric clause. Click a row for the full abstract \u2014 and download the formatted copy from the top of that view." },
  { center: true, title: "End of Tour",
    body: "Question \u2192 cited answer \u2192 source document. Replay this tour anytime with the ? button in the header." },
];

export default function Tour({ setTab, onClose }) {
  const [idx, setIdx] = useState(0);
  const [rect, setRect] = useState(null);
  const cardRef = useRef(null);
  const step = STEPS[idx];

  useEffect(() => {
    let cancelled = false;
    if (step.tab) setTab(step.tab);
    if (step.center) { setRect(null); return; }
    // wait a frame (or two) for the tab to become visible before measuring
    const measure = (tries) => {
      if (cancelled) return;
      const el = document.querySelector(`[data-tour="${step.target}"]`);
      const r = el?.getBoundingClientRect();
      if (el && r && r.width > 0) {
        el.scrollIntoView({ block: "center", behavior: "instant" });
        requestAnimationFrame(() => {
          if (cancelled) return;
          const r2 = el.getBoundingClientRect();
          setRect({ top: r2.top, left: r2.left, width: r2.width, height: r2.height });
        });
      } else if (tries > 0) {
        setTimeout(() => measure(tries - 1), 60);
      } else {
        setRect(null); // fall back to a centered card rather than breaking
      }
    };
    setRect(null);
    setTimeout(() => measure(5), 30);
    return () => { cancelled = true; };
  }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") finish();
      if (e.key === "ArrowRight" || e.key === "Enter") next();
      if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }); // re-bind each render so handlers see current idx

  const finish = () => { markTourSeen(); onClose(); };
  const next = () => (idx < STEPS.length - 1 ? setIdx(idx + 1) : finish());
  const back = () => idx > 0 && setIdx(idx - 1);

  // tooltip card placement: below the target if room, else above, else centered
  const cardStyle = (() => {
    const base = { position: "fixed", zIndex: 402, width: 340, maxWidth: "calc(100vw - 32px)" };
    if (!rect) return { ...base, top: "50%", left: "50%", transform: "translate(-50%,-50%)" };
    const below = rect.top + rect.height + 12;
    const spaceBelow = window.innerHeight - below;
    const left = Math.min(Math.max(12, rect.left), window.innerWidth - 352);
    if (spaceBelow > 190) return { ...base, top: below, left };
    return { ...base, top: Math.max(12, rect.top - 190 - 12), left };
  })();

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400 }}>
      {/* dim layer; when spotlighting, the cutout carries the dimming via box-shadow */}
      {rect ? (
        <div style={{
          position: "fixed", top: rect.top - 6, left: rect.left - 6,
          width: rect.width + 12, height: rect.height + 12,
          borderRadius: 10, boxShadow: "0 0 0 9999px rgba(35,33,30,.5)",
          border: `2px solid ${C.green}`, pointerEvents: "none",
          transition: "all .25s ease", zIndex: 401,
        }} />
      ) : (
        <div style={{ position: "fixed", inset: 0, background: "rgba(35,33,30,.5)", zIndex: 401 }} />
      )}

      <div ref={cardRef} style={{ ...cardStyle, background: "#fff", borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,.25)", padding: "18px 20px 14px", animation: "lai-in .2s ease" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: C.green, marginBottom: 6 }}>
          {`Step ${idx + 1} of ${STEPS.length}`}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 6 }}>{step.title}</div>
        <div style={{ fontSize: "12.5px", lineHeight: 1.6, color: C.mut2, marginBottom: 14 }}>{step.body}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button data-tourbtn="skip" onClick={finish} style={{ border: "none", background: "none", color: C.muted, fontSize: 12, cursor: "pointer", padding: "6px 4px" }}>Skip tour</button>
          <div style={{ flex: 1 }} />
          {idx > 0 && (
            <button data-tourbtn="back" onClick={back} style={{ border: `1px solid ${C.border2}`, background: "#fff", color: C.mut2, borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Back</button>
          )}
          <button data-tourbtn="next" onClick={next} style={{ border: "none", background: C.green, color: "#fff", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {idx === STEPS.length - 1 ? "Done" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
// Design tokens + shared primitives, ported 1:1 from the standalone mockup.
import React from "react";

export const C = {
  text: "#23211e", muted: "#928e86", mut2: "#5d5a54", faint: "#a8a39a",
  bg: "#f0eee9", surface: "#faf9f6", border: "#ebe8e2", border2: "#d7d3cc", hair: "#f0eee9",
  green: "#719A2C", greenDark: "#5a7d22", greenText: "#3f5a16", greenBg: "#EDF3E1", greenBrd: "#B8D19A",
  blue: "#6996CA", blueDark: "#3F6FA3", blueBg: "#EBF1F8", blueBrd: "#B8D0E8",
  amber: "#B45309", amberBg: "#F6ECDD",
  red: "#A32D2D", redBg: "#F7E9E9",
};

export const MONO = "'Helvetica Neue', Helvetica, Arial, system-ui, sans-serif";

// Display name: strip legal riders like "(successor by merger with...)",
// "(formerly ...)", "(d/b/a ...)" from tenant names. Full legal names remain
// in the data and the abstract lines.
let _canon = {};
const _nameKey = (s) => {
  let k = (s || "").toLowerCase().split(" (")[0];
  k = k.replace(/[\u2019'&.,]/g, "").replace(/\bn\s*a\b/g, "national association").replace(/\s+/g, " ").trim();
  return k;
};
// Build a canonical display name per entity from the loaded leases, so the same
// counterparty spelled two ways ("N.A." vs "National Association") reads one way.
export const buildNameCanon = (leases) => {
  const groups = {};
  for (const l of leases) {
    const k = _nameKey(l.tenant);
    const base = (l.tenant || "").split(" (")[0].trim();
    if (!groups[k] || base.length > groups[k].length) groups[k] = base;
  }
  _canon = groups;
};

export const dispName = (s) => {
  const clean = (s || "").split(" (")[0].trim();
  return _canon[_nameKey(s)] || clean || s || "";
};

const PILL = {
  red: [C.redBg, C.red], amber: [C.amberBg, C.amber], gray: [C.bg, C.mut2],
  green: [C.greenBg, C.greenDark], blue: [C.blueBg, C.blueDark],
};

export function pillStyle(kind, extra) {
  const [bg, fg] = PILL[kind] || PILL.gray;
  return {
    display: "inline-flex", alignItems: "center", background: bg, color: fg,
    fontSize: "10.5px", fontWeight: 700, fontFamily: MONO, borderRadius: "100px",
    padding: "2px 9px", letterSpacing: ".02em", whiteSpace: "nowrap", ...extra,
  };
}

export const statusKind = (s) =>
  s === "Holdover" ? "amber" : s === "Expiring soon" ? "red" : s === "Unknown" ? "gray" : "green";

export const th = { padding: "9px 14px", textAlign: "left", fontSize: "10px", letterSpacing: ".06em", textTransform: "uppercase", color: C.muted, fontWeight: 700, borderBottom: `1px solid ${C.border2}`, whiteSpace: "nowrap" };
export const thR = { ...th, textAlign: "right" };
export const td = (o) => ({ padding: "11px 14px", borderBottom: `1px solid ${C.hair}`, fontSize: "12.5px", color: C.text, verticalAlign: "middle", ...o });
export const tdNum = td({ fontFamily: MONO, fontSize: "12px" });
export const tdNumR = td({ fontFamily: MONO, fontSize: "12px", textAlign: "right" });
export const tdMut = td({ color: C.mut2 });

export const fmtMoney = (n) =>
  n == null ? "\u2014" : "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const fmtDate = (iso) => {
  if (!iso) return "\u2014";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

let _staticMode = true; // sandbox build: always run from the bundled dataset
export const isStaticMode = () => _staticMode;

export async function api(path, opts) {
  if (!_staticMode) {
    try {
      const r = await fetch(path, opts);
      if (!r.ok) {
        let detail = r.statusText;
        try { detail = (await r.json()).detail || detail; } catch { /* keep statusText */ }
        throw Object.assign(new Error(detail), { http: true });
      }
      return await r.json();
    } catch (e) {
      // HTTP errors (404 etc.) are real answers from a live backend: surface them.
      if (e.http) throw e;
      // Network failure (no backend / file:// mode): switch to the bundled snapshot.
      _staticMode = true;
    }
  }
  const { staticFetch } = await import("./staticApi.js");
  return staticFetch(path, opts);
}

export function SectionHead({ title, tag, sub }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
        <h2 style={{ fontSize: "13.5px", fontWeight: 600, color: C.text }}>{title}</h2>
        {tag && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: C.amber, background: C.amberBg, borderRadius: 100, padding: "2px 8px" }}>{tag}</span>}
      </div>
      {sub && <p style={{ fontSize: "11.5px", color: "#666" }}>{sub}</p>}
    </div>
  );
}

export function Card({ children, style }) {
  return <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden", ...style }}>{children}</div>;
}

export function FilterPill({ label, active, onClick, tint = "green" }) {
  const on = tint === "blue"
    ? { background: C.blueBg, borderColor: C.blue, color: C.blueDark }
    : { background: C.greenBg, borderColor: C.greenBrd, color: C.greenDark };
  return (
    <button onClick={onClick} style={{
      border: `1px solid ${C.border2}`, background: "#fff", color: C.mut2, borderRadius: 100,
      padding: "3px 11px", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all .12s",
      ...(active ? on : {}),
    }}>{label}</button>
  );
}

export function Spinner({ label }) {
  const dot = (delay) => ({
    width: 5, height: 5, borderRadius: "50%", background: C.muted,
    animation: `lai-dot 1.3s ease-in-out ${delay} infinite`, display: "inline-block",
  });
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 9, background: "#fff", padding: "12px 15px", display: "flex", alignItems: "center", gap: 10, animation: "lai-in .25s ease" }}>
      <span style={{ display: "inline-flex", gap: 4 }}>
        <span style={dot("0s")} /><span style={dot(".22s")} /><span style={dot(".44s")} />
      </span>
      <span style={{ fontSize: "12.5px", color: C.muted }}>{label}</span>
    </div>
  );
}
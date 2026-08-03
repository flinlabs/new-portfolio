import React, { useEffect, useMemo, useState } from "react";
import { C, MONO, api, dispName, isStaticMode, pillStyle, statusKind, th, thR, td, tdNum, tdNumR, fmtMoney, fmtDate, Spinner } from "./ui.jsx";

const secLabel = { fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: C.greenDark, marginBottom: 10 };
const Svg = ({ d, size = 14, stroke = "#928e86", w = 1.6, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={stroke} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" style={style}><path d={d} /></svg>
);
const FILE_D = "M5 2h7l3 3v13H5zM12 2v3h3";
const CHEV_D = "M5 8l5 5 5-5";
const OPT_ICON = { Renewal: "\u21bb", Expansion: "\u2922", Termination: "\u2297", ROFO: "\u25f7", ROFR: "\u25d1" };

function norm(s) { return (s || "").toLowerCase().replace(/[._]/g, " "); }
function lookup(lines, must, anyOf = []) {
  for (const ln of lines) {
    const lab = norm(ln.field_label);
    if (must.every((m) => lab.includes(m)) && (!anyOf.length || anyOf.some((a) => lab.includes(a)))) {
      const v = (ln.value || "").trim();
      if (v && !/^not specified/i.test(v)) return v;
    }
  }
  return null;
}
function chargeCode(label) {
  const l = label.toLowerCase();
  if (/electric/.test(l)) return "ELC";
  if (/hvac|air.?condition/.test(l)) return "HVC";
  if (/clean/.test(l)) return "CLN";
  if (/real estate tax|ret\b/.test(l)) return "RET";
  if (/operating|opex|escalation/.test(l)) return "OE";
  if (/water|sprinkler/.test(l)) return "WTR";
  if (/late|interest/.test(l)) return "LATE";
  if (/freight|elevator/.test(l)) return "ELV";
  return "CHG";
}
function rsfNum(text) {
  const m = (text || "").replace(/,/g, "").match(/(\d{2,})/);
  return m ? parseInt(m[1], 10) : null;
}
const fmtMY = (iso) => {
  if (!iso) return "\u2014";
  const [y, m] = iso.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export default function LeaseModal({ leaseId, onClose, askAbout }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [clauseSection, setClauseSection] = useState(null);
  const [docOpen, setDocOpen] = useState(false);

  useEffect(() => {
    setData(null); setErr(null); setClauseSection(null); setDocOpen(false);
    api(`/api/leases/${leaseId}`).then(setData).catch((e) => setErr(e.message));
  }, [leaseId]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    const onDoc = (e) => { if (!e.target.closest("[data-amend]")) setDocOpen(false); };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDoc);
    return () => { window.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDoc); };
  }, [onClose]);

  const L = data?.lease;
  const allLines = data ? data.abstract_lines : [];
  const lines = useMemo(() => allLines.filter((l) => !l.is_validation), [allLines]);

  const docSet = useMemo(() => {
    const rows = lines.filter((l) => /document set|amendment|modification/i.test(l.section) && l.value)
      .slice(0, 6).map((l) => `${l.field_label}: ${l.value}`);
    if (rows.length) return rows;
    return L?.controlling_doc ? [L.controlling_doc] : ["Original lease (per abstract)"];
  }, [lines, L]);

  const detail = useMemo(() => {
    if (!L) return [];
    const D = (k, ...args) => [k, lookup(lines, ...args) || "\u2014"];
    return [
      D("Date of lease (signed)", ["lease"], ["dated", "date of", "execution"]),
      ["Amendment / controlling doc", L.controlling_doc || "Original lease"],
      D("Lease broker", ["broker"]),
      D("Guaranty", ["guarant"]),
      D("Tenant allowance (TI)", ["allowance"], [], 90) ,
      D("Percentage rent (retail)", ["percentage rent"]),
      D("Operating expenses", ["operating expense"], ["escalation", "base", "share", "method"]),
      D("Real estate taxes", ["tax"], ["escalation", "base", "share", "method"]),
      D("Base year (OE / RET)", ["base year"]),
      D("HVAC clause", ["hvac"]),
      D("Electricity", ["electric"], ["type", "method", "charge", "rate"]),
      D("Freight & elevator", ["elevator"], [], 90),
      D("Notice address", ["notice"], ["address"], 110),
      D("Insurance \u2014 liability", ["liability"], ["insurance", "limit", "coverage"], 90),
      ["Holdover rate", L.holdover_rate || "\u2014"],
      D("Holdover detail", ["holdover"], ["tier", "rate", "rent"], 90),
      D("Assignment / sublease", ["assignment"], [], 96),
      D("Governing law", ["governing law"]),
    ];
  }, [L, lines]);

  const addlCharges = useMemo(() => {
    const secs = lines.filter((l) => /additional charges|operating expenses|utilities/i.test(l.section));
    const out = [];
    const seen = new Set();
    for (const l of secs) {
      const label = l.field_label.split(/\s[\u2013\u2014-]\s/).pop();
      if (seen.has(label) || !l.value || /^not specified/i.test(l.value)) continue;
      seen.add(label);
      out.push({ type: label, code: chargeCode(l.field_label), amount: l.value, notes: l.source_cite || "" });
      if (out.length >= 8) break;
    }
    return out;
  }, [lines]);

  const options = useMemo(() => {
    if (!L) return [];
    const defs = [["Renewal", L.has_renewal, "renewal"], ["Expansion", L.has_expansion, "expansion"],
      ["ROFR", L.has_rofr, "rofr"], ["ROFO", L.has_rofo, "rofo"], ["Termination", L.has_termination, "termination"]];
    return defs.filter(([, on]) => on).map(([name, , needle]) => ({
      name, icon: OPT_ICON[name] || "\u25cb",
      terms: lookup(lines, [needle], ["option", "right"]) || "See abstract",
      notice: lookup(lines, [needle], ["notice"]) || "\u2014",
      deadline: lookup(lines, [needle], ["deadline", "exercise", "window"]) || "\u2014",
    }));
  }, [L, lines]);

  const sections = useMemo(() => {
    const seen = [];
    for (const ln of lines) if (!seen.includes(ln.section)) seen.push(ln.section);
    return seen;
  }, [lines]);
  const activeSection = clauseSection || sections.find((s) => /key clauses/i.test(s)) || sections[0];
  const sectionLines = lines.filter((l) => l.section === activeSection);

  const terms = L ? (() => {
    const t = [
      ["Tenant", dispName(L.tenant)], ["Property", L.property], ["Suite", L.suite || "\u2014"],
      ["Square footage", L.rsf || "\u2014"], ["Lease type", L.lease_type || "\u2014"],
      ["Commencement", fmtDate(L.commencement_date)], ["Rent commencement", fmtDate(L.rent_commence_date)],
      ["Expiration", fmtDate(L.expiration_date)],
      ["Security deposit", L.security_deposit || "\u2014"],
    ];
    const locExp = lookup(lines, ["letter of credit"], ["expir"]) || lookup(lines, ["loc"], ["expir"]);
    if (locExp) t.push(["LOC expiration", locExp]);
    return t;
  })() : [];

  const today = new Date().toISOString().slice(0, 10);
  const feeKind = (f) => {
    if (f.period_start && f.period_end && f.period_start <= today && today <= f.period_end) return "current";
    if (f.period_start && f.period_start > today) return "step";
    return "";
  };
  const feeBg = { current: C.greenBg, step: C.amberBg, "": "#fff" };
  const rsf = L ? rsfNum(L.rsf) : null;

  const clauseTab = (s) => {
    const on = s === activeSection;
    return (
      <button key={s} onClick={() => setClauseSection(s)} style={{
        border: "none", background: "transparent", cursor: "pointer", fontSize: 12,
        fontWeight: on ? 600 : 500, padding: "7px 11px", marginBottom: -1,
        borderBottom: `2px solid ${on ? C.blue : "transparent"}`, color: on ? C.blueDark : C.muted,
      }}>{s.length > 24 ? s.slice(0, 22) + "\u2026" : s}</button>
    );
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(35,33,30,.34)", zIndex: 100, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 20px", animation: "lai-in .16s ease" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 840, maxHeight: "calc(100vh - 80px)", background: "#fff", borderRadius: 10, boxShadow: "0 12px 40px rgba(0,0,0,.22)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ flex: "none", padding: "20px 26px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: C.text, letterSpacing: "-.01em" }}>{L ? dispName(L.tenant) : "Loading\u2026"}</h2>
              {L && <span style={pillStyle(statusKind(L.status))}>{L.status}</span>}
              {L?.lease_type && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "#666", background: C.bg, borderRadius: 100, padding: "2px 9px" }}>{L.lease_type}</span>}
            </div>
            {L && <div style={{ fontSize: "12.5px", color: "#666", marginTop: 5, fontFamily: MONO }}>{L.property}{L.suite ? ` \u00b7 ${L.suite}` : ""}</div>}
          </div>
          {L && (
            <button
              onClick={async () => {
                if (isStaticMode()) {
                  const mod = await import("./staticApi.js");
                  mod.downloadAbstract(L.lease_id);
                } else {
                  window.open(`/api/files/${L.lease_id}`, "_blank");
                }
              }}
              title="Download the Yardi-formatted abstract"
              style={{ flex: "none", display: "flex", alignItems: "center", gap: 6, background: "#fff", color: C.mut2, border: `1px solid ${C.border2}`, borderRadius: 6, padding: "8px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all .12s" }}>
              <Svg d="M10 3v10M6 9l4 4 4-4M4 17h12" stroke={C.mut2} />
              Download abstract
            </button>
          )}
          {L && (
            <button onClick={() => { onClose(); askAbout(`Summarize the key terms, critical dates and options for ${L.tenant} at ${L.property}.`, L.property_short); }}
              style={{ flex: "none", background: C.blue, color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "background .12s" }}>
              {"Ask about this lease \u2197"}
            </button>
          )}
          <button onClick={onClose} style={{ flex: "none", border: "none", background: "transparent", color: C.muted, fontSize: 20, lineHeight: 1, cursor: "pointer", padding: "4px 8px", borderRadius: 6 }}>{"\u00d7"}</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 26px" }}>
          {err && <div style={{ background: C.redBg, color: C.red, fontSize: 12, padding: "9px 12px", borderRadius: 8 }}>{"Couldn't load this lease: "}{err}</div>}
          {!data && !err && <Spinner label={"Loading abstract\u2026"} />}

          {data && (
            <>
              {/* Controlling documents */}
              <div style={{ marginBottom: 26 }}>
                <div style={secLabel}>Controlling Document(s)</div>
                <div style={{ position: "relative" }} data-amend="1">
                  <button onClick={() => setDocOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 12px", border: `1px solid ${docOpen ? C.blue : C.border2}`, borderRadius: 7, background: "#fff", cursor: "pointer", fontSize: "12.5px", color: C.text }}>
                    <Svg d={FILE_D} />
                    <span style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{L.controlling_doc || docSet[0]}</span>
                    <Svg d={CHEV_D} style={{ marginLeft: "auto", transform: docOpen ? "rotate(180deg)" : "none", transition: "transform .15s", flex: "none" }} />
                  </button>
                  {docOpen && (
                    <div data-amend="1" style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, width: "100%", zIndex: 30, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,.12)", padding: 5, display: "flex", flexDirection: "column", gap: 2 }}>
                      {docSet.map((d, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 6, background: i === docSet.length - 1 ? C.blueBg : "transparent", fontSize: "12.5px", color: C.text }}>
                          <span style={{ width: 15, height: 15, flex: "none", borderRadius: 4, border: `1px solid ${C.blue}`, background: C.blue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{"\u2713"}</span>
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d}</span>
                          {i === docSet.length - 1 && <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: C.greenDark, background: C.greenBg, border: `1px solid ${C.greenBrd}`, borderRadius: 100, padding: "1px 7px", fontFamily: MONO, flex: "none" }}>latest</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: "10.5px", color: C.muted, marginTop: 6, lineHeight: 1.5 }}>{"Amendments often supersede prior terms \u2014 this view reflects the controlling documents stated in the abstract."}</div>
              </div>

              {/* Lease Terms */}
              <div style={{ marginBottom: 26 }}>
                <div style={secLabel}>Lease Terms</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
                  {terms.map(([k, v]) => (
                    <div key={k} style={{ background: "#fff", padding: "11px 14px" }}>
                      <div style={{ fontSize: 10, color: C.muted, letterSpacing: ".03em", textTransform: "uppercase", marginBottom: 4 }}>{k}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, fontFamily: MONO, color: C.text, wordBreak: "break-word" }}>{String(v)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Abstract Detail */}
              <div style={{ marginBottom: 26 }}>
                <div style={secLabel}>Abstract Detail</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
                  {detail.map(([k, v]) => (
                    <div key={k} style={{ background: "#fff", padding: "11px 14px" }}>
                      <div style={{ fontSize: 10, color: C.muted, letterSpacing: ".03em", textTransform: "uppercase", marginBottom: 4 }}>{k}</div>
                      <div style={{ fontSize: "12.5px", fontWeight: 600, color: C.text, lineHeight: 1.4 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Charge Schedule */}
              {data.fee_schedule.length > 0 && (
                <div style={{ marginBottom: 26 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, flexWrap: "wrap" }}>
                    <div style={{ ...secLabel, marginBottom: 0 }}>Charge Schedule</div>
                    <div style={{ display: "flex", gap: 12, fontSize: 10, color: "#666", alignItems: "center" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: C.greenBg, border: `1px solid ${C.greenBrd}` }} />Current</span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: C.amberBg, border: "1px solid #e3c79e" }} />Upcoming step</span>
                    </div>
                  </div>
                  <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead><tr><th style={th}>Code</th><th style={th}>Description</th><th style={th}>Start</th><th style={th}>End</th><th style={thR}>Monthly</th><th style={thR}>Annual/SF</th></tr></thead>
                      <tbody>
                        {data.fee_schedule.map((f, i) => {
                          const kind = feeKind(f);
                          const annual = f.annual_amt || (f.monthly_amt ? f.monthly_amt * 12 : null);
                          const psf = annual && rsf ? "$" + (annual / rsf).toFixed(2) : (annual ? fmtMoney(annual) : "\u2014");
                          return (
                            <tr key={i} style={{ background: feeBg[kind] }}>
                              <td style={td()}><span style={{ fontSize: "10.5px", color: "#666", fontFamily: MONO }}>{L.lease_type === "License" ? "LIC-FEE" : "BAS-RNT"}</span></td>
                              <td style={td()}>{(L.lease_type === "License" ? "License fee" : "Base rent") + (f.year_no ? ` \u2014 Year ${f.year_no}` : "")}</td>
                              <td style={tdNum}>{fmtMY(f.period_start)}</td>
                              <td style={tdNum}>{fmtMY(f.period_end)}</td>
                              <td style={tdNumR}>{fmtMoney(f.monthly_amt)}</td>
                              <td style={tdNumR}>{psf}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Additional Charges */}
              {addlCharges.length > 0 && (
                <div style={{ marginBottom: 26 }}>
                  <div style={secLabel}>Additional Charges</div>
                  <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead><tr><th style={th}>Charge type</th><th style={th}>Code</th><th style={th}>Amount / basis</th><th style={th}>Source</th></tr></thead>
                      <tbody>
                        {addlCharges.map((a, i) => (
                          <tr key={i}>
                            <td style={td({ fontWeight: 600 })}>{a.type}</td>
                            <td style={td()}><span style={{ fontSize: "10.5px", color: "#666", fontFamily: MONO, background: C.bg, borderRadius: 4, padding: "1px 6px" }}>{a.code}</span></td>
                            <td style={tdNum}>{a.amount}</td>
                            <td style={td({ color: C.mut2, fontSize: 11 })}>{a.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tenant Options */}
              {options.length > 0 && (
                <div style={{ marginBottom: 26 }}>
                  <div style={secLabel}>Tenant Options</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {options.map((o) => (
                      <div key={o.name} style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: "13px 15px", display: "flex", alignItems: "flex-start", gap: 13 }}>
                        <div style={{ width: 30, height: 30, borderRadius: 7, background: C.blueBg, color: C.blueDark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flex: "none" }}>{o.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{o.name}</div>
                          <div style={{ fontSize: "11.5px", color: "#666", marginTop: 2, lineHeight: 1.45 }}>{o.terms}</div>
                          <div style={{ display: "flex", gap: 16, marginTop: 7, fontSize: 11, flexWrap: "wrap" }}>
                            <span style={{ color: C.muted }}>Notice: <span style={{ color: C.text, fontFamily: MONO }}>{o.notice}</span></span>
                            <span style={{ color: C.muted }}>Deadline: <span style={{ color: o.deadline !== "\u2014" ? C.amber : C.text, fontFamily: MONO }}>{o.deadline}</span></span>
                          </div>
                        </div>
                        <button onClick={() => { onClose(); askAbout(`What is the notice window and deadline for ${L.tenant}'s ${o.name} option?`, L.property_short); }}
                          style={{ flex: "none", border: `1px solid ${C.border2}`, background: "#fff", color: "#666", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all .12s" }}>{"Ask \u2197"}</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Clauses / full abstract by section */}
              <div>
                <div style={secLabel}>Key Clauses &amp; Full Abstract</div>
                <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${C.border}`, marginBottom: 14, flexWrap: "wrap" }}>
                  {sections.map(clauseTab)}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
                  {sectionLines.map((ln, i) => (
                    <div key={i} style={{ background: "#fff", padding: "10px 14px", display: "flex", flexDirection: "column", gap: 3 }}>
                      <div style={{ fontSize: 10, color: C.muted, letterSpacing: ".03em", textTransform: "uppercase" }}>{ln.field_label}</div>
                      <div style={{ fontSize: "12.5px", lineHeight: 1.65, color: C.text }}>{ln.value}</div>
                      {ln.source_cite && <div style={{ fontSize: 10, color: C.blueDark, fontFamily: MONO }}>{"["}{ln.source_cite}{"]"}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
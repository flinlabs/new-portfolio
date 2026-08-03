import React, { useEffect, useMemo, useState } from "react";
import { C, MONO, api, dispName, pillStyle, statusKind, th, thR, td, tdNum, tdNumR, tdMut, fmtMoney, fmtDate, SectionHead, Card, FilterPill } from "./ui.jsx";
import LeaseModal from "./LeaseModal.jsx";

const LIST_PAGE = 5;
const BROWSER_PAGE = 10;

export function depositKind(text) {
  if (!text || /not specified|^none$|n\/a|waived/i.test(text)) return "None";
  if (/letter of credit|\bl\/c\b|\bloc\b/i.test(text)) return "LOC";
  if (/cash|check|wire/i.test(text)) return "Cash";
  return "Other";
}
function electricKind(text) {
  if (!text) return "Other";
  if (/submeter|sub-meter/i.test(text)) return "Submeter";
  if (/inclusion|included/i.test(text)) return "Included";
  if (/fixed|constant|flat/i.test(text)) return "Fixed";
  return "Other";
}
function rsfNum(text) {
  const m = (text || "").replace(/,/g, "").match(/(\d{2,})/);
  return m ? parseInt(m[1], 10) : null;
}
function rentPerSF(monthly, rsf) {
  const n = rsfNum(rsf);
  if (!monthly || !n) return null;
  return (monthly * 12) / n;
}

function usePager(rows, pageSize) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const cur = Math.min(page, pageCount);
  return {
    slice: rows.slice((cur - 1) * pageSize, cur * pageSize), cur, pageCount, setPage,
    total: rows.length, lo: rows.length ? (cur - 1) * pageSize + 1 : 0, hi: Math.min(cur * pageSize, rows.length),
  };
}

function Pager({ pager, unit = "leases" }) {
  const { cur, pageCount, setPage, total, lo, hi } = pager;
  const num = (i) => ({
    minWidth: 26, height: 26, padding: "0 7px", borderRadius: 6, fontSize: "11.5px", fontFamily: MONO, cursor: "pointer",
    border: `1px solid ${i === cur ? C.blue : C.border}`, background: i === cur ? C.blueBg : "#fff",
    color: i === cur ? C.blueDark : C.mut2, fontWeight: i === cur ? 700 : 400,
  });
  const nav = (disabled) => ({ display: "flex", alignItems: "center", gap: 5, height: 26, padding: "0 10px", border: `1px solid ${disabled ? C.hair : C.border2}`, background: "#fff", color: disabled ? "#c9c5bd" : C.mut2, borderRadius: 6, fontSize: "11.5px", fontWeight: 600, cursor: disabled ? "default" : "pointer" });
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, flexWrap: "wrap", gap: 10 }}>
      <span style={{ fontSize: 11, color: C.muted, fontFamily: MONO }}>{"Showing "}{lo}{"\u2013"}{hi}{" of "}{total}{" "}{unit}</span>
      {pageCount > 1 && (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <button disabled={cur <= 1} onClick={() => setPage(cur - 1)} style={nav(cur <= 1)}>{"\u2039 Prev"}</button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((i) => (
            <button key={i} onClick={() => setPage(i)} style={num(i)}>{i}</button>
          ))}
          <button disabled={cur >= pageCount} onClick={() => setPage(cur + 1)} style={nav(cur >= pageCount)}>{"Next \u203a"}</button>
        </div>
      )}
    </div>
  );
}

export default function Dashboard({ leases, properties, askAbout }) {
  const [summary, setSummary] = useState(null);
  const [expirations, setExpirations] = useState([]);
  const [rentSteps, setRentSteps] = useState([]);
  const [optionRows, setOptionRows] = useState([]);
  const [locs, setLocs] = useState([]);
  const [err, setErr] = useState(null);

  const [q, setQ] = useState("");
  const [fProp, setFProp] = useState("All");
  const [fType, setFType] = useState("All");
  const [fStatus, setFStatus] = useState("All");
  const [fOption, setFOption] = useState("All");
  const [fDeposit, setFDeposit] = useState("All");
  const [fElectric, setFElectric] = useState("All");
  const [locProp, setLocProp] = useState("All");
  const [modalId, setModalId] = useState(null);

  useEffect(() => {
    Promise.all([
      api("/api/dashboard/summary"),
      api("/api/dashboard/expirations"),
      api("/api/dashboard/rent-steps"),
      api("/api/dashboard/options"),
      api("/api/dashboard/locs"),
    ]).then(([s, e, r, o, lc]) => {
      setSummary(s); setExpirations(e.expirations); setRentSteps(r.upcoming_steps);
      setOptionRows(o.option_rows); setLocs(lc.locs);
    }).catch((e) => setErr(e.message));
  }, []);

  const today = new Date();
  const in90 = new Date(today.getTime() + 90 * 86400000).toISOString().slice(0, 10);
  const locsUrgent = locs.filter((l) => l.days_left != null && l.days_left >= 0 && l.days_left <= 30);
  const steps90 = rentSteps.filter((r) => r.period_start && r.period_start <= in90);
  const exp12mo = expirations.filter((r) => r.days_to_expiry != null && r.days_to_expiry <= 365);

  const kpis = summary ? [
    { value: locsUrgent.length, label: "LOCs expiring \u2264 30 days",
      detail: locsUrgent[0] ? `${dispName(locsUrgent[0].tenant)} \u00b7 ${fmtMoney(locsUrgent[0].amount)}` : `${locs.length} LOCs on file`,
      amber: locsUrgent.length > 0 },
    { value: steps90.length, label: "Rent steps in next 90 days",
      detail: `across ${new Set(steps90.map((s) => s.property_short)).size} properties`, amber: false },
    { value: summary.with_renewal_option, label: "Leases with renewal options",
      detail: "notice windows in abstracts", amber: false },
    { value: exp12mo.length, label: "Leases expiring \u2264 12 months",
      detail: `incl. ${summary.holdover} in holdover`, amber: summary.holdover > 0 },
  ] : [];

  const optionOf = (L) => {
    const flags = [];
    if (L.has_renewal) flags.push("Renewal");
    if (L.has_expansion) flags.push("Expansion");
    if (L.has_rofr) flags.push("ROFR");
    if (L.has_rofo) flags.push("ROFO");
    if (L.has_termination) flags.push("Termination");
    return flags;
  };

  const locRows = useMemo(() => locs.filter((r) => locProp === "All" || r.property_short === locProp), [locs, locProp]);
  const browser = useMemo(() => leases.filter((L) => {
    if (q && !(`${L.tenant} ${L.suite || ""}`.toLowerCase().includes(q.toLowerCase()))) return false;
    if (fProp !== "All" && L.property_short !== fProp) return false;
    if (fType !== "All" && L.lease_type !== fType) return false;
    if (fStatus !== "All" && L.status !== fStatus) return false;
    if (fOption !== "All" && !optionOf(L).includes(fOption)) return false;
    if (fDeposit !== "All" && depositKind(L.security_deposit) !== fDeposit) return false;
    if (fElectric !== "All" && electricKind(L.electricity_type) !== fElectric) return false;
    return true;
  }).sort((a, b) => {
    const so = { "Expiring soon": 0, "Holdover": 1, "Active": 2 };
    const d1 = (so[a.status] ?? 9) - (so[b.status] ?? 9); if (d1) return d1;
    const d2 = (a.property_short || "").localeCompare(b.property_short || ""); if (d2) return d2;
    return a.tenant.localeCompare(b.tenant);
  }), [leases, q, fProp, fType, fStatus, fOption, fDeposit, fElectric]);

  const locPager = usePager(locRows, LIST_PAGE);
  const stepPager = usePager(rentSteps, LIST_PAGE);
  const optPager = usePager(optionRows, LIST_PAGE);
  const expPager = usePager(expirations, LIST_PAGE);
  const browserPager = usePager(browser, BROWSER_PAGE);
  useEffect(() => { browserPager.setPage(1); }, [q, fProp, fType, fStatus, fOption, fDeposit, fElectric]); // eslint-disable-line

  const types = ["All", ...Array.from(new Set(leases.map((l) => l.lease_type).filter(Boolean)))];
  const optTint = (o) => ({ Renewal: "green", Termination: "red", ROFO: "blue", ROFR: "blue", Expansion: "amber" }[o] || "gray");
  const locStatus = (r) => {
    if (r.days_left == null) return { label: "On file", kind: "gray" };
    if (r.days_left < 0) return { label: "Expired \u2014 verify", kind: "red" };
    if (r.days_left <= 30) return { label: "\u226430d \u2014 call bank", kind: "red" };
    if (r.days_left <= 60) return { label: "\u226460d \u2014 monitor", kind: "amber" };
    return { label: "On track", kind: "gray" };
  };

  const filterRow = (label, opts, cur, set) => (
    <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 9, flexWrap: "wrap" }}>
      <span style={{ fontSize: "9.5px", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: C.muted, width: 120, flex: "none" }}>{label}</span>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {opts.map((o) => <FilterPill key={o} label={o} active={cur === o} onClick={() => set(o)} />)}
      </div>
    </div>
  );

  const askBtn = (onClick) => (
    <button onClick={onClick} style={{ border: `1px solid ${C.border2}`, background: "#fff", color: "#666", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all .12s" }}>{"Ask \u2197"}</button>
  );
  const codeChip = (text) => (
    <span style={{ fontSize: 10, color: "#666", fontFamily: MONO, background: C.bg, borderRadius: 4, padding: "1px 6px" }}>{text}</span>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 30px 60px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
          <h1 style={{ fontSize: 16, fontWeight: 600, color: C.green, letterSpacing: "-.01em" }}>Portfolio Operations</h1>
          <span style={{ fontSize: "10.5px", color: C.muted, fontFamily: MONO }}>{"SQLite \u00b7 parsed Harvey abstracts \u00b7 no LLM at runtime"}</span>
        </div>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>{"Critical-date tracking for Accounting, AR & Lease Admin."}</p>

        {err && <div style={{ background: C.redBg, color: C.red, fontSize: 12, padding: "9px 12px", borderRadius: 8, marginBottom: 16 }}>Dashboard data failed to load: {err}</div>}

        {/* KPIs */}
        <div data-tour="kpis" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
          {kpis.map((k) => (
            <div key={k.label} style={{ background: C.surface, border: `1px solid ${k.amber ? "#e7d4b6" : C.border}`, borderRadius: 8, padding: "16px 16px 15px" }}>
              <div style={{ fontSize: 30, fontWeight: 700, fontFamily: MONO, letterSpacing: "-.02em", lineHeight: 1, color: C.green }}>{k.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginTop: 9 }}>{k.label}</div>
              <div style={{ fontSize: 11, marginTop: 3, fontFamily: MONO, color: k.amber ? C.amber : C.muted }}>{k.detail}</div>
            </div>
          ))}
        </div>

        {/* Letter-of-Credit Tracker */}
        <div data-tour="loc" style={{ marginBottom: 30 }}>
          <SectionHead title="Letter-of-Credit Tracker" tag="Most critical" sub="Contact issuing bank within the 30-day window before expiration. Replaces the manual color-coded spreadsheet." />
          <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
            {properties.map((p) => <FilterPill key={p} label={p} active={locProp === p} onClick={() => setLocProp(p)} tint="blue" />)}
          </div>
          <Card>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><th style={th}>Tenant</th><th style={th}>Property</th><th style={thR}>LOC amount</th><th style={th}>Expiration</th><th style={thR}>Days left</th><th style={th}>Status</th></tr></thead>
              <tbody>
                {locPager.slice.map((r) => {
                  const st = locStatus(r);
                  return (
                    <tr key={r.lease_id} style={{ background: st.kind === "red" ? "#fdf6f6" : "transparent" }}>
                      <td style={td({ fontWeight: 600 })}>{dispName(r.tenant)}</td>
                      <td style={tdMut}>{r.property_short || "\u2014"}</td>
                      <td style={tdNumR}>{fmtMoney(r.amount)}</td>
                      <td style={tdNum}>{r.loc_expiration ? fmtDate(r.loc_expiration) : "auto-renew / per abstract"}</td>
                      <td style={tdNumR}>{r.days_left != null ? r.days_left + "d" : "\u2014"}</td>
                      <td style={td()}><span style={pillStyle(st.kind)}>{st.label}</span></td>
                    </tr>
                  );
                })}
                {locPager.total === 0 && <tr><td colSpan={6} style={td({ textAlign: "center", color: C.muted })}>No letters of credit for this property.</td></tr>}
              </tbody>
            </table>
          </Card>
          <Pager pager={locPager} unit="LOCs" />
        </div>

        {/* Rent steps + options */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginBottom: 30 }}>
          <div>
            <SectionHead title="Upcoming Rent Steps" sub="Next scheduled step per lease. Accounting verifies against Yardi." />
            <Card>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr><th style={th}>Tenant</th><th style={th}>Step date</th><th style={thR}>Current</th><th style={thR}>New</th><th style={th}>Code</th></tr></thead>
                <tbody>
                  {stepPager.slice.map((r, i) => (
                    <tr key={i}>
                      <td style={td({ fontWeight: 600 })}>{dispName(r.tenant)}<div style={{ fontSize: "10.5px", color: C.muted, fontWeight: 400 }}>{r.property}</div></td>
                      <td style={tdNum}>{fmtDate(r.period_start)}</td>
                      <td style={tdNumR}>{fmtMoney(r.current_monthly)}</td>
                      <td style={tdNumR}><span style={{ color: C.greenDark, fontWeight: 700, fontFamily: MONO }}>{fmtMoney(r.monthly_amt)}</span></td>
                      <td style={td()}>{codeChip(r.lease_type === "License" ? "LIC-FEE" : "BAS-RNT")}</td>
                    </tr>
                  ))}
                  {stepPager.total === 0 && <tr><td colSpan={5} style={td({ textAlign: "center", color: C.muted })}>No dated steps upcoming in the loaded set.</td></tr>}
                </tbody>
              </table>
            </Card>
            <Pager pager={stepPager} unit="steps" />
          </div>
          <div>
            <SectionHead title="Tenant Option Deadlines" sub={"Renewal \u00b7 termination \u00b7 ROFO \u00b7 ROFR \u00b7 expansion."} />
            <Card>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr><th style={th}>Tenant</th><th style={th}>Option</th><th style={th}>Notice</th><th style={th}>Deadline</th></tr></thead>
                <tbody>
                  {optPager.slice.map((r, i) => (
                    <tr key={i}>
                      <td style={td({ fontWeight: 600 })}>{dispName(r.tenant)}<div style={{ fontSize: "10.5px", color: C.muted, fontWeight: 400 }}>{r.property_short}</div></td>
                      <td style={td()}><span style={pillStyle(optTint(r.option))}>{r.option}</span></td>
                      <td style={td({ color: C.mut2, fontSize: "11.5px" })}>{r.notice || "\u2014"}</td>
                      <td style={td({ fontFamily: MONO, fontSize: "11.5px", color: r.deadline ? C.amber : C.text })}>{r.deadline || "\u2014"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <Pager pager={optPager} unit="options" />
          </div>
        </div>

        {/* Expiration timeline */}
        <div style={{ marginBottom: 30 }}>
          <SectionHead title="Lease Expiration Timeline" sub={"Holdover rate differs from base rent \u2014 shown explicitly."} />
          <Card>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><th style={th}>Tenant</th><th style={th}>Property</th><th style={th}>Expiration</th><th style={thR}>Base rent/SF</th><th style={thR}>Holdover</th></tr></thead>
              <tbody>
                {expPager.slice.map((r) => {
                  const lease = leases.find((l) => l.lease_id === r.lease_id);
                  const psf = lease ? rentPerSF(r.base_fee_monthly, lease.rsf) : null;
                  const hot = r.status !== "Active";
                  return (
                    <tr key={r.lease_id}>
                      <td style={td({ fontWeight: 600 })}>{dispName(r.tenant)}</td>
                      <td style={tdMut}>{lease?.property || r.property_short || "\u2014"}</td>
                      <td style={td()}><span style={{ fontFamily: MONO, fontSize: 12, fontWeight: hot ? 700 : 400, color: r.status === "Expiring soon" ? C.amber : r.status === "Holdover" ? C.red : C.text }}>{fmtDate(r.expiration_date)}</span></td>
                      <td style={tdNumR}>{psf ? "$" + psf.toFixed(2) : (r.base_fee_monthly ? fmtMoney(r.base_fee_monthly) + "/mo" : "\u2014")}</td>
                      <td style={td({ textAlign: "right" })}>
                        <span style={{ color: C.amber, fontFamily: MONO, fontSize: 12 }}>{r.holdover_rate || "\u2014"}</span>
                        {r.status === "Holdover" && (
                          <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: C.red, background: C.redBg, borderRadius: 4, padding: "1px 5px", fontFamily: MONO }}>holdover</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <Pager pager={expPager} unit="leases" />
        </div>

        {/* Abstract browser */}
        <div data-tour="browser">
          <SectionHead title="Abstract Browser" sub="All active leases. Click a row for the full abstract." />
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 15px", marginBottom: 14, display: "flex", flexDirection: "column", gap: 11 }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.muted, fontSize: 13 }}>{"\u2315"}</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={"Search tenant or suite\u2026"}
                style={{ width: "100%", padding: "8px 12px 8px 32px", border: `1px solid ${C.border2}`, borderRadius: 6, background: "#fff", fontSize: "12.5px", color: C.text, outline: "none", fontFamily: "inherit" }} />
            </div>
            {filterRow("Property", properties, fProp, setFProp)}
            {filterRow("Lease type", types, fType, setFType)}
            {filterRow("Status", ["All", "Active", "Holdover", "Expiring soon"], fStatus, setFStatus)}
            {filterRow("Options present", ["All", "Renewal", "Termination", "ROFO", "ROFR", "Expansion"], fOption, setFOption)}
            {filterRow("Deposit type", ["All", "LOC", "Cash", "Other", "None"], fDeposit, setFDeposit)}
            {filterRow("Electric clause", ["All", "Submeter", "Fixed", "Included", "Other"], fElectric, setFElectric)}
          </div>

          <Card>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><th style={th}>Tenant</th><th style={th}>Property</th><th style={th}>Suite</th><th style={th}>Type</th><th style={th}>Expiration</th><th style={th}>Status</th><th style={thR}></th></tr></thead>
              <tbody>
                {browserPager.slice.map((L) => (
                  <tr key={L.lease_id} className="lai-hover-row" onClick={() => setModalId(L.lease_id)} style={{ cursor: "pointer", transition: "background .1s" }}>
                    <td style={td({ fontWeight: 600 })}>{dispName(L.tenant)}</td>
                    <td style={tdMut}>{L.property_short || L.property}</td>
                    <td style={tdNum}>{L.suite || "\u2014"}</td>
                    <td style={tdMut}>{L.lease_type || "\u2014"}</td>
                    <td style={tdNum}>{fmtDate(L.expiration_date)}</td>
                    <td style={td()}><span style={pillStyle(statusKind(L.status))}>{L.status}</span></td>
                    <td style={td({ textAlign: "right" })}>
                      <span onClick={(e) => e.stopPropagation()}>{askBtn(() => askAbout(`Summarize the key terms, critical dates and options for ${L.tenant} at ${L.property}.`, L.property_short))}</span>
                    </td>
                  </tr>
                ))}
                {browserPager.total === 0 && <tr><td colSpan={7} style={{ padding: 30, textAlign: "center", fontSize: 12, color: C.muted }}>No leases match the current filters.</td></tr>}
              </tbody>
            </table>
          </Card>
          <Pager pager={browserPager} />
        </div>
      </div>

      {modalId && <LeaseModal leaseId={modalId} onClose={() => setModalId(null)} askAbout={askAbout} />}
    </div>
  );
}
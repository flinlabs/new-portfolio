// Static fallback API: replicates the FastAPI endpoints against the bundled
// dataset (staticData.js) so the app runs from a single HTML file with no
// backend. Ask returns matched leases with a note instead of Claude synthesis.
import DATA from "./staticData.js";
import FILES from "./staticFiles.js";

// Download the embedded Harvey abstract (static mode only).
export function downloadAbstract(leaseId) {
  const entry = FILES[leaseId];
  if (!entry) return false;
  const [name, b64] = entry;
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const blob = new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return true;
}

const today = () => new Date().toISOString().slice(0, 10);

function status(exp) {
  if (!exp) return ["Unknown", null];
  const days = Math.floor((new Date(exp) - new Date(today())) / 86400000);
  if (days < 0) return ["Holdover", days];
  if (days <= 90) return ["Expiring soon", days];
  return ["Active", days];
}

const withStatus = (l) => {
  const [s, d] = status(l.expiration_date);
  return { ...l, status: s, days_to_expiry: d };
};

function lineLookup(leaseId, must, anyOf) {
  for (const ln of DATA.lines[leaseId] || []) {
    if (ln.is_validation) continue;
    const lab = ln.field_label.toLowerCase().replace(/[._]/g, " ");
    if (must.every((m) => lab.includes(m)) && (!anyOf.length || anyOf.some((a) => lab.includes(a)))) {
      const v = (ln.value || "").trim();
      if (v && !v.toLowerCase().startsWith("not specified")) return v;
    }
  }
  return null;
}

const STOP = new Set(["the","and","for","with","what","when","where","who","how","does","are","has","have","was","were","any","all","which","their","its","this","that","about","lease","leases","tenant","tenants","rent","rents","rate","rates","most","least","amount","amounts","option","options","many","much","total","totals","number","common","across","portfolio","every","each"]);

const TODAY_ISO = new Date().toISOString().slice(0, 10);


function summaryRow(l) {
  const opts = [["Renewal","has_renewal"],["Expansion","has_expansion"],["ROFR","has_rofr"],["ROFO","has_rofo"],["Termination","has_termination"]].filter(([,k])=>l[k]).map(([n])=>n);
  const dep = /letter of credit|\bl\/c\b|\bloc\b/i.test(l.security_deposit||"") ? "LOC" : (l.security_deposit ? "Cash" : "None stated");
  const fee = l.base_fee_monthly ? "$" + Math.round(l.base_fee_monthly).toLocaleString() + "/mo" : "see abstract";
  return `${l.tenant} | ${l.property_short || l.property} | ${(l.suite||"").slice(0,30)} | ${l.lease_type||"?"} | expires ${l.expiration_date||"?"} | options (${opts.length}): ${opts.join(", ")||"none"} | deposit: ${dep} | holdover: ${l.holdover_rate||"see abstract"} | base: ${fee}`;
}



function runLeaseQuery(f, scope) {
  const pool = scopedLeases(scope);
  const depKind = (l) => /letters? of credit|\bl\/c\b|\bloc\b/i.test(l.security_deposit || "") ? "LOC" : (l.security_deposit ? "Cash" : "None");
  const optCount = (l) => ["has_renewal","has_expansion","has_rofr","has_rofo","has_termination"].reduce((a, k) => a + (l[k] ? 1 : 0), 0);
  let rows = pool.filter((l) => {
    if (f.property_short && (l.property_short || "").toLowerCase() !== f.property_short.toLowerCase()) return false;
    if (f.lease_type && (l.lease_type || "") !== f.lease_type) return false;
    if (f.status && l.status !== f.status) return false;
    for (const k of ["has_renewal","has_termination","has_rofo","has_rofr","has_expansion"])
      if (f[k] !== undefined && !!l[k] !== !!f[k]) return false;
    if (f.deposit && depKind(l) !== f.deposit) return false;
    if (f.expires_before && !(l.expiration_date && l.expiration_date < f.expires_before)) return false;
    if (f.expires_after && !(l.expiration_date && l.expiration_date > f.expires_after)) return false;
    if (f.min_option_count && optCount(l) < f.min_option_count) return false;
    if (f.expires_within_months) {
      const end = new Date(); end.setMonth(end.getMonth() + f.expires_within_months);
      const endIso = end.toISOString().slice(0, 10);
      if (!(l.expiration_date && l.expiration_date > TODAY_ISO && l.expiration_date <= endIso)) return false;
    }
    if (f.text_contains) {
      const needle = f.text_contains.toLowerCase();
      const hit = (DATA.lines[l.lease_id] || []).find((x) => !x.is_validation &&
        `${x.field_label} ${x.value}`.toLowerCase().includes(needle));
      if (!hit) return false;
      l.__match = hit;
    }
    return true;
  });
  if (f.sort_by === "option_count") rows.sort((a, b) => optCount(b) - optCount(a));
  else if (f.sort_by) rows.sort((a, b) => String(a[f.sort_by] ?? "").localeCompare(String(b[f.sort_by] ?? "")));
  const out = rows.slice(0, f.limit || 60).map((l) => ({
    tenant: disp(l.tenant), property: l.property_short || l.property, suite: (l.suite || "").slice(0, 40),
    lease_type: l.lease_type, expiration: l.expiration_date, status: l.status,
    options: ["Renewal","Expansion","ROFR","ROFO","Termination"].filter((n, i) => l[["has_renewal","has_expansion","has_rofr","has_rofo","has_termination"][i]]),
    deposit: depKind(l), option_count: optCount(l),
    ...(l.__match ? { match_clause: l.__match.field_label, match_text: (l.__match.value || "").slice(0, 200),
                      match_cite: l.__match.source_cite } : {}),
  }));
  return { count: rows.length, of_total: pool.length, leases: out };
}


export function staticFetch(path, opts) {
  const url = new URL(path, "http://static.local");
  const p = url.pathname;

  if (p === "/health") {
    return { status: "ok", db_exists: true, ask_enabled: false, static: true, generated: DATA.generated };
  }

  if (p === "/api/leases") {
    let rows = DATA.leases.map(withStatus);
    const q = url.searchParams.get("q");
    if (q) rows = rows.filter((l) => `${disp(l.tenant)} ${l.property}`.toLowerCase().includes(q.toLowerCase()));
    return { count: rows.length, leases: rows };
  }

  const m = p.match(/^\/api\/leases\/(.+)$/);
  if (m) {
    const lease = DATA.leases.find((l) => l.lease_id === decodeURIComponent(m[1]));
    if (!lease) throw new Error("Lease not found");
    return {
      lease: withStatus(lease),
      abstract_lines: DATA.lines[lease.lease_id] || [],
      fee_schedule: DATA.fees[lease.lease_id] || [],
    };
  }

  if (p === "/api/dashboard/summary") {
    const rows = DATA.leases.map(withStatus);
    return {
      total_leases: rows.length,
      properties: new Set(rows.map((l) => l.property_short || l.property)).size,
      active: rows.filter((l) => l.status === "Active").length,
      expiring_soon: rows.filter((l) => l.status === "Expiring soon").length,
      holdover: rows.filter((l) => l.status === "Holdover").length,
      with_renewal_option: rows.filter((l) => l.has_renewal).length,
      total_base_monthly: Math.round(rows.reduce((a, l) => a + (l.base_fee_monthly || 0), 0) * 100) / 100,
    };
  }

  if (p === "/api/dashboard/expirations") {
    return {
      expirations: DATA.leases.filter((l) => l.expiration_date).map(withStatus)
        .sort((a, b) => a.expiration_date.localeCompare(b.expiration_date)),
    };
  }

  if (p === "/api/dashboard/rent-steps") {
    const t = today(); const seen = new Set(); const out = [];
    const all = [];
    for (const l of DATA.leases) {
      const fees = DATA.fees[l.lease_id] || [];
      const cur = fees.find((f) => f.period_start && f.period_end && f.period_start <= t && t <= f.period_end);
      for (const f of fees)
        if (f.period_start && f.period_start > t)
          all.push({ lease_id: l.lease_id, tenant: l.tenant, property: l.property, property_short: l.property_short,
                     current_monthly: cur ? cur.monthly_amt : l.base_fee_monthly, ...f });
    }
    all.sort((a, b) => a.period_start.localeCompare(b.period_start));
    for (const r of all) if (!seen.has(r.lease_id)) { seen.add(r.lease_id); out.push(r); }
    return { upcoming_steps: out };
  }

  if (p === "/api/dashboard/locs") {
    const out = [];
    for (const l of DATA.leases) {
      const dep = l.security_deposit || "";
      if (!/letter of credit|\bl\/c\b|\bloc\b/i.test(dep)) continue;
      let amt = (dep.match(/\$([\d,]+(?:\.\d+)?)/) || [])[1];
      if (!amt) {
        const line = lineLookup(l.lease_id, ["security deposit"], ["amount"]) || lineLookup(l.lease_id, ["letter of credit"], ["amount"]);
        if (line) amt = (line.match(/\$([\d,]+(?:\.\d+)?)/) || [])[1];
      }
      const expText = lineLookup(l.lease_id, ["letter of credit"], ["expir"]) || lineLookup(l.lease_id, ["loc"], ["expir"]);
      let expDate = null;
      if (expText) {
        const m = expText.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (m) expDate = `${m[3]}-${String(m[1]).padStart(2, "0")}-${String(m[2]).padStart(2, "0")}`;
      }
      const days = expDate ? Math.floor((new Date(expDate) - new Date(today())) / 86400000) : null;
      out.push({ lease_id: l.lease_id, tenant: l.tenant, property: l.property, property_short: l.property_short,
                 amount: amt ? parseFloat(amt.replace(/,/g, "")) : null, loc_expiration: expDate, loc_note: expText, days_left: days });
    }
    out.sort((a, b) => (a.days_left == null) - (b.days_left == null) || (a.days_left ?? 0) - (b.days_left ?? 0));
    return { locs: out };
  }

  if (p === "/api/dashboard/options") {
    const names = [["Renewal", "has_renewal", "renewal"], ["Expansion", "has_expansion", "expansion"],
                   ["ROFR", "has_rofr", "rofr"], ["ROFO", "has_rofo", "rofo"], ["Termination", "has_termination", "termination"]];
    const out = [];
    for (const l of DATA.leases.map(withStatus)) {
      for (const [name, key, needle] of names) {
        if (!l[key]) continue;
        out.push({
          lease_id: l.lease_id, tenant: l.tenant, property: l.property, property_short: l.property_short,
          option: name, status: l.status, days_to_expiry: l.days_to_expiry,
          notice: lineLookup(l.lease_id, [needle], ["notice"]),
          deadline: lineLookup(l.lease_id, [needle], ["deadline", "exercise", "window"]),
        });
      }
    }
    return { option_rows: out };
  }

  if (p === "/api/ask") {
    const body = JSON.parse(opts?.body || "{}");
    return structuredAsk(body.query || "", body.scope || null);
  }

  throw new Error(`No static handler for ${p}`);
}

// ---------------------------------------------------------------- structured Ask
// Deterministic answers over the parsed dataset. No LLM involved. Every claim
// carries a [Source: ...] tag AND a rich source card (tenant, clause, snippet,
// file) built from the underlying abstract line.

const _nk = (x) => (x || "").toLowerCase().split(" (")[0].replace(/[\u2019'&.,]/g, "").replace(/\bn\s*a\b/g, "national association").replace(/\s+/g, " ").trim();
const _canon = (() => {
  const g = {};
  for (const l of DATA.leases) {
    const k = _nk(l.tenant), b = (l.tenant || "").split(" (")[0].trim();
    if (!g[k] || b.length > g[k].length) g[k] = b;
  }
  return g;
})();
const disp = (s) => _canon[_nk(s)] || (s || "").split(" (")[0].trim() || s || "";
const fmtM = (n) => n == null ? "\u2014" : "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtD = (iso) => {
  if (!iso) return "\u2014";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
const suiteNum = (s) => { const m = (s || "").match(/(\d+[A-Z]?|[A-Z]-?\d+)/); return m ? m[0] : ""; };
const catOf = (cite) => {
  const c = (cite || "").toLowerCase();
  if (/letter of credit/.test(c)) return "Letter of Credit";
  if (/amendment|modification|\bmod\b/.test(c)) return "Amendment";
  if (/license/.test(c)) return "License Agreement";
  if (/guarant/.test(c)) return "Guaranty";
  return "Agreement of Lease";
};

function findLine(leaseId, must, anyOf = [], exclude = []) {
  if (must.includes("termination")) exclude = [...exclude, "determination"];
  for (const ln of DATA.lines[leaseId] || []) {
    if (ln.is_validation) continue;
    const lab = ln.field_label.toLowerCase().replace(/[._]/g, " ");
    if (exclude.some((x) => lab.includes(x))) continue;
    if (must.every((m) => lab.includes(m)) && (!anyOf.length || anyOf.some((a) => lab.includes(a)))) {
      const v = (ln.value || "").trim();
      if (v && !/^not specified/i.test(v)) return ln;
    }
  }
  return null;
}

function mkCiter() {
  const srcs = [];
  const cite = (L, ln) => {
    if (!ln || !ln.source_cite) return "";
    const key = ln.source_cite;
    if (!srcs.some((x) => x.cite === key && x.lease_id === L.lease_id)) {
      const vnotes = (DATA.lines[L.lease_id] || []).filter((x) => x.is_validation)
        .map((x) => ({ label: x.field_label, value: x.value, cite: x.source_cite }));
      srcs.push({
        flags: vnotes.length, notes: vnotes,
        cite: key, lease_id: L.lease_id, tenant: disp(L.tenant),
        code: [L.property_short || L.property, suiteNum(L.suite)].filter(Boolean).join(" \u00b7 "),
        cat: catOf(key), clause: ln.field_label.toUpperCase(),
        snippet: ln.value || "",
        file: L.source_file || null,
      });
    }
    return ` [Source: ${key}]`;
  };
  return { srcs, cite };
}

function scopedLeases(scope) {
  const all = DATA.leases.map(withStatus);
  if (!scope || scope === "All") return all;
  return all.filter((l) => l.property_short === scope || (l.property || "").toLowerCase().includes(scope.toLowerCase()));
}

function matchTenant(q, pool) {
  const ql = q.toLowerCase();
  let best = null;
  for (const l of pool) {
    const name = l.tenant.toLowerCase();
    const first2 = name.split(/\s+/).slice(0, 2).join(" ");
    const first1 = name.split(/\s+/)[0];
    if (ql.includes(first2) || (first1.length >= 4 && ql.includes(first1))) {
      if (!best || l.tenant.length > best.tenant.length) best = l;
    }
  }
  return best;
}

function expLine(L) {
  // Prefer the expiration line whose value actually states the promoted (latest) date.
  const lines = (DATA.lines[L.lease_id] || []).filter((ln) => !ln.is_validation &&
    ln.field_label.toLowerCase().includes("expiration date"));
  if (L.expiration_date) {
    const [y, m, d] = L.expiration_date.split("-").map(Number);
    const pats = [`${m}/${d}/${y}`, `${String(m).padStart(2, "0")}/${String(d).padStart(2, "0")}/${y}`];
    const hit = lines.find((ln) => pats.some((p) => (ln.value || "").includes(p)));
    if (hit) return hit;
  }
  return lines[lines.length - 1] || null;
}

function tenantAnswer(L, cite) {
  const out = [];
  const expLn = expLine(L);
  out.push(`${disp(L.tenant)} at ${L.property}${L.suite ? " (" + L.suite + ")" : ""} runs through ${fmtD(L.expiration_date)}${cite(L, expLn)}.`);
  if (L.base_fee_monthly) {
    const fee = (DATA.fees[L.lease_id] || []).find((f) => f.monthly_amt === L.base_fee_monthly);
    if (fee) out.push(`Current base charge is ${fmtM(L.base_fee_monthly)}/month${cite(L, { ...fee, field_label: "Fee Schedule", value: `${fmtM(fee.monthly_amt)}/month` })}.`);
    else out.push(`Current base charge is ${fmtM(L.base_fee_monthly)}/month.`);
  }
  if (L.security_deposit) {
    const dep = findLine(L.lease_id, ["security deposit"]) || findLine(L.lease_id, ["deposit"]);
    out.push(`Security deposit: ${L.security_deposit}${cite(L, dep)}.`);
  }
  if (L.holdover_rate) {
    const h = findLine(L.lease_id, ["holdover"]);
    out.push(`Holdover: ${L.holdover_rate}${cite(L, h)}.`);
  }
  const opts = [["Renewal", L.has_renewal, "renewal"], ["Expansion", L.has_expansion, "expansion"], ["ROFR", L.has_rofr, "rofr"], ["ROFO", L.has_rofo, "rofo"], ["Termination", L.has_termination, "termination"]].filter(([, on]) => on);
  if (opts.length) {
    const first = findLine(L.lease_id, [opts[0][2]], ["option", "right"]);
    out.push(`Tenant options on record: ${opts.map(([n]) => n).join(", ")}${cite(L, first)}.`);
  }
  return out.join(" ");
}

function structuredAsk(query, scope, opts = {}) {
  const q = query.toLowerCase();
  const pool = scopedLeases(scope);
  const { srcs, cite } = mkCiter();
  const reply = (answer, matched, extra = {}) => ({
    answer, mode: "structured", sources: srcs,
    matched_leases: matched.slice(0, 12).map((l) => ({ lease_id: l.lease_id, tenant: l.tenant, property: l.property })),
    ...extra,
  });

  if (!opts.skipTenant) {
    const T = matchTenant(q, pool);
    if (T) return reply(tenantAnswer(T, cite), [T]);
  }

  // Generic option overview: "most common options", "option breakdown", etc.
  if (/option/.test(q) && /most common|breakdown|overview|types|how many|most amount|which.*most/.test(q)) {
    const defs = [["Renewal","has_renewal","renewal"],["Termination","has_termination","termination"],["ROFO","has_rofo","rofo"],["ROFR","has_rofr","rofr"],["Expansion","has_expansion","expansion"]];
    const counts = defs.map(([n, k]) => [n, pool.filter((l) => l[k]).length]).sort((a, b) => b[1] - a[1]);
    const [topName, topN] = counts[0];
    const topKey = defs.find(([n]) => n === topName);
    const leaders = pool.filter((l) => l[topKey[1]]).slice(0, 12);
    const parts = leaders.map((l) => {
      const ln = findLine(l.lease_id, [topKey[2]], ["notice", "deadline", "option"]);
      return `${disp(l.tenant)} (${l.property_short || l.property})${cite(l, ln)}`;
    });
    const more = pool.filter((l) => l[topKey[1]]).length - leaders.length;
    return reply(
      `${topName} is the most common tenant option \u2014 ${topN} of ${pool.length} leases. Full breakdown: ` +
      counts.map(([n, c]) => `${n} ${c}`).join(", ") + ". " +
      `${topName} leases include: ` + parts.join("; ") + (more > 0 ? ` \u2026and ${more} more.` : "."),
      leaders);
  }

  const optMap = [["renew", "Renewal", "has_renewal", "renewal"], ["termination", "Termination", "has_termination", "termination"],
    ["rofo", "ROFO", "has_rofo", "rofo"], ["rofr", "ROFR", "has_rofr", "rofr"], ["expansion", "Expansion", "has_expansion", "expansion"],
    ["first offer", "ROFO", "has_rofo", "rofo"], ["first refusal", "ROFR", "has_rofr", "rofr"]];
  for (const [kw, name, key, needle] of optMap) {
    if (q.includes(kw)) {
      const hits = pool.filter((l) => l[key]);
      if (!hits.length) return reply(`No leases in scope carry a ${name} option in the parsed abstracts.`, []);
      const parts = hits.slice(0, 8).map((l) => {
        const ln = findLine(l.lease_id, [needle], ["notice", "deadline", "option"]);
        const dl = findLine(l.lease_id, [needle], ["deadline", "exercise", "window"]);
        return `${disp(l.tenant)} (${l.property_short || l.property})${dl ? " \u2014 " + dl.value : ""}${cite(l, ln || dl)}`;
      });
      const more = hits.length > 8 ? ` \u2026and ${hits.length - 8} more.` : "";
      return reply(`${hits.length} lease${hits.length > 1 ? "s" : ""} carry a ${name} option: ` + parts.join("; ") + "." + more, hits);
    }
  }

  if (/letters? of credit|\blocs?\b|deposit/.test(q)) {
    const hits = pool.filter((l) => /letter of credit|\bl\/c\b|\bloc\b/i.test(l.security_deposit || ""));
    if (!hits.length) return reply("No letters of credit are recorded in the parsed abstracts for this scope.", []);
    const parts = hits.map((l) => {
      const amtLn = findLine(l.lease_id, ["security deposit"], ["amount"]) || findLine(l.lease_id, ["letter of credit"], ["amount"]);
      const citeLn = amtLn || findLine(l.lease_id, ["security deposit"], ["type"]) || findLine(l.lease_id, ["letter of credit"]) || findLine(l.lease_id, ["security deposit"]);
      const amt = amtLn && (amtLn.value.match(/\$[\d,]+(?:\.\d+)?/) || [])[0];
      return `${disp(l.tenant)} (${l.property_short || l.property})${amt ? " \u2014 " + amt : " \u2014 amount not stated"}${cite(l, citeLn)}`;
    });
    return reply(`${hits.length} lease${hits.length > 1 ? "s hold" : " holds"} a letter of credit: ` + parts.join("; ") + ".", hits);
  }

  if (q.includes("holdover")) {
    const inHold = pool.filter((l) => l.status === "Holdover");
    const parts = inHold.slice(0, 8).map((l) => {
      const h = findLine(l.lease_id, ["holdover"]);
      return `${disp(l.tenant)} (stated term ended ${fmtD(l.expiration_date)}${l.holdover_rate ? ", holdover " + l.holdover_rate : ""})${cite(l, h)}`;
    });
    const head = inHold.length ? `${inHold.length} lease${inHold.length > 1 ? "s show" : " shows"} an expired stated term in the abstracts: ` + parts.join("; ") + "." : "No leases in scope are past their stated expiration.";
    return reply(head + " Verify against amendments before acting \u2014 renewals may postdate the abstract.", inHold);
  }

  if (/expir|ending|end date/.test(q)) {
    const horizon = /6 month/.test(q) ? 182 : 365;
    const hits = pool.filter((l) => l.days_to_expiry != null && l.days_to_expiry >= 0 && l.days_to_expiry <= horizon)
      .sort((a, b) => a.days_to_expiry - b.days_to_expiry);
    if (!hits.length) return reply("No leases in scope expire within that window.", []);
    const parts = hits.slice(0, 8).map((l) =>
      `${disp(l.tenant)} \u2014 ${fmtD(l.expiration_date)} (${l.days_to_expiry}d)${cite(l, expLine(l))}`);
    const more = hits.length > 8 ? ` \u2026and ${hits.length - 8} more.` : "";
    return reply(`${hits.length} lease${hits.length > 1 ? "s" : ""} expire in the next ${Math.round(horizon / 30)} months: ` + parts.join("; ") + "." + more, hits);
  }

  if (/rent|psf|fee|step/.test(q)) {
    const t = today(); const steps = [];
    for (const l of pool) for (const f of DATA.fees[l.lease_id] || [])
      if (f.period_start && f.period_start > t) { steps.push({ l, f }); break; }
    steps.sort((a, b) => a.f.period_start.localeCompare(b.f.period_start));
    if (!steps.length) return reply("No dated rent steps are upcoming in the parsed schedules for this scope.", []);
    const parts = steps.slice(0, 8).map(({ l, f }) => `${disp(l.tenant)} \u2014 ${fmtD(f.period_start)} to ${fmtM(f.monthly_amt)}/mo${cite(l, { ...f, field_label: "Fee Schedule \u2014 Step", value: `${fmtD(f.period_start)}: ${fmtM(f.monthly_amt)}/month` })}`);
    const more = steps.length > 8 ? ` \u2026and ${steps.length - 8} more.` : "";
    return reply(`${steps.length} upcoming rent step${steps.length > 1 ? "s" : ""}: ` + parts.join("; ") + "." + more, steps.map((s) => s.l));
  }

  // Only fire the property lookup when the question names a real property
  // (short name or street number) — generic words must not match.
  const propTokens = new Set();
  for (const l of pool) {
    for (const w of `${l.property_short || ""}`.toLowerCase().split(/[^a-z0-9]+/)) if (w.length >= 2) propTokens.add(w);
    for (const w of (l.property || "").toLowerCase().match(/\b\d{2,4}\b/g) || []) propTokens.add(w);
  }
  const qTokens = q.split(/[^a-z0-9]+/);
  const namedProp = qTokens.some((w) => w.length >= 2 && propTokens.has(w) && !/^(all|the|and|for)$/.test(w));
  if (namedProp) {
    const propHit = pool.filter((l) => {
      const hay = `${l.property_short || ""} ${l.property || ""}`.toLowerCase();
      return qTokens.some((w) => w.length >= 2 && propTokens.has(w) && hay.includes(w));
    });
    if (propHit.length && propHit.length < pool.length) {
      const parts = propHit.slice(0, 12).map((l) => `${disp(l.tenant)} (${l.lease_type || "?"}, expires ${fmtD(l.expiration_date)})${cite(l, expLine(l))}`);
      return reply(`${propHit.length} lease${propHit.length > 1 ? "s" : ""} at that property: ` + parts.join("; ") + ".", propHit);
    }
  }

  return {
    answer: null, mode: "structured", sources: [],
    note: "No structured answer matched. This static demo answers questions about expirations, renewal and other options, rent steps, letters of credit, holdover, and specific tenants or properties. Free-form questions are handled by Claude in the live build.",
    matched_leases: [],
  };
}

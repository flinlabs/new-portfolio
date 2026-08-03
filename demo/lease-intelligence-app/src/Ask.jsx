import React, { useEffect, useRef, useState } from "react";
import { C, MONO, api, isStaticMode, dispName } from "./ui.jsx";

const SUGGESTS = [
  "What is Harborview Books' holdover rate?",
  "When does Cobalt Fitness's lease expire?",
  "What options does Juniper & Co. hold?",
  "Which LOCs are on file?",
];

const Svg = ({ d, size = 13, stroke = "currentColor", w = 1.6, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={stroke} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" style={style}><path d={d} /></svg>
);
const IC = {
  search: "M9 3a6 6 0 100 12A6 6 0 009 3zM17 17l-3.5-3.5",
  file: "M5 2h7l3 3v13H5zM12 2v3h3",
  warn: "M10 3l8 14H2zM10 8v4M10 15h.01",
  chev: "M5 8l5 5 5-5",
  copy: "M7 3H5a1 1 0 00-1 1v12a1 1 0 001 1h9a1 1 0 001-1v-2M7 3h6l3 3v8a1 1 0 01-1 1H7a1 1 0 01-1-1V3z",
  regen: "M4 12a8 8 0 018-8M4 8v4H8M20 12a8 8 0 01-8 8",
  send: "M3 10l14-6-6 14-2-6-6-2z",
  plus: "M10 4v12M4 10h12",
  pencil: "M13 3l4 4-9 9H4v-4zM11 5l4 4",
  trash: "M4 6h12M7 6V4h6v2M9 11v4M11 11v4M5 6l1 11h8l1-11",
  dots: "M5 10v.01M10 10v.01M15 10v.01",
  funnel: "M3 5h14l-5 6v5l-4 1v-6z",
};

function parseAnswer(text) {
  const cites = [];
  const parts = [];
  let last = 0;
  const re = /\[Source:\s*([^\]]+)\]/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ t: "text", v: text.slice(last, m.index) });
    const cite = m[1].trim();
    let n = cites.indexOf(cite) + 1;
    if (n === 0) { cites.push(cite); n = cites.length; }
    parts.push({ t: "cite", v: n });
    last = re.lastIndex;
  }
  if (last < text.length) parts.push({ t: "text", v: text.slice(last) });
  return { parts, cites };
}

const chipStyle = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 17, height: 17,
  padding: "0 4px", margin: "0 1px", verticalAlign: "2px", background: "#EBF1F8",
  border: "1px solid #B8D0E8", borderRadius: 4, color: "#3F6FA3",
  fontFamily: MONO, fontSize: 10, fontWeight: 700, lineHeight: 1, cursor: "pointer",
};

function SourceCard({ s, n }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 9, background: "#fff", padding: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ ...chipStyle, cursor: "default", margin: 0, marginTop: 1, flex: "none" }}>{n}</span>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {s.tenant ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{dispName(s.tenant)}</span>
              {s.code && <span style={{ fontSize: 9, color: C.muted, fontFamily: MONO }}>{s.code}</span>}
              <span style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${C.greenBrd}`, background: C.greenBg, color: C.greenDark, borderRadius: 20, padding: "2px 8px", fontSize: 10 }}>{s.cat}</span>
            </div>
            <div style={{ borderLeft: `2px solid ${C.blueBrd}`, paddingLeft: 10, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontSize: 9, letterSpacing: ".05em", textTransform: "uppercase", color: C.muted, fontFamily: MONO }}>Matched clause · {s.clause} · {s.cite}</span>
              {s.snippet && <div style={{ fontSize: "11.5px", lineHeight: 1.55, color: C.mut2, fontStyle: "italic" }}>“{s.snippet}”</div>}
            </div>
            {s.file && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.blue, fontSize: 12, minWidth: 0 }}>
                <Svg d={IC.file} stroke={C.blue} />
                {!isStaticMode() && s.lease_id ? (
                  <a href={`/api/files/${s.lease_id}`} target="_blank" rel="noreferrer"
                    style={{ color: C.blue, textDecoration: "none", borderBottom: `1px solid ${C.blueBrd}`, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    title="Downloads the formatted Yardi abstract when available, else this RAG source">{s.file}</a>
                ) : s.lease_id ? (
                  <a href="#" onClick={async (e) => { e.preventDefault(); const m = await import("./staticApi.js"); m.downloadAbstract(s.lease_id); }}
                    style={{ color: C.blue, textDecoration: "none", borderBottom: `1px solid ${C.blueBrd}`, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", cursor: "pointer" }}
                    title="Download the Harvey abstract">{s.file}</a>
                ) : (
                  <span style={{ borderBottom: `1px solid ${C.blueBrd}`, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.file}</span>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <span style={{ fontSize: 9, letterSpacing: ".05em", textTransform: "uppercase", color: C.muted, fontFamily: MONO }}>Matched clause citation</span>
            <div style={{ borderLeft: `2px solid ${C.blueBrd}`, paddingLeft: 10, fontSize: "11.5px", lineHeight: 1.55, color: C.mut2, fontStyle: "italic" }}>{s.cite}</div>
          </>
        )}
      </div>
    </div>
  );
}

function AssistantMessage({ msg, isLast, onToggleSources, onCopy, onRegenerate }) {
  if (msg.state === "streaming") {
    return (
      <div style={{ border: `1px solid ${C.border}`, borderRadius: 9, background: "#fff", padding: "12px 15px", display: "flex", alignItems: "center", gap: 10, animation: "lai-in .25s ease" }}>
        <span style={{ display: "inline-flex", gap: 4 }}>
          {["0s", ".22s", ".44s"].map((d) => <span key={d} style={{ width: 5, height: 5, borderRadius: "50%", background: C.muted, animation: `lai-dot 1.3s ease-in-out ${d} infinite` }} />)}
        </span>
        <span style={{ fontSize: "12.5px", color: C.muted }}>Searching lease abstracts…</span>
      </div>
    );
  }
  if (msg.error) {
    return (
      <div style={{ background: C.redBg, borderRadius: 9, padding: "12px 15px", fontSize: "12.5px", color: C.red }}>
        The request failed: {msg.error}. Check that the backend is running, then try again.
      </div>
    );
  }
  const sources = msg.sources || [];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13, animation: "lai-in .25s ease" }}>
      {msg.mode === "live" && msg.answer?.length > 0 && (
        <div style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${C.blueBrd}`, background: C.blueBg, color: C.blueDark, borderRadius: 100, padding: "2px 10px", fontSize: 9.5, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", fontFamily: MONO }}>
          {"Live synthesis \u00b7 Claude \u00b7 direct from this browser"}
        </div>
      )}
      {msg.mode === "structured" && (msg.answer?.length > 0 || msg.note) && (
        <div style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${C.greenBrd}`, background: C.greenBg, color: C.greenDark, borderRadius: 100, padding: "2px 10px", fontSize: 9.5, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", fontFamily: MONO }}>
          Structured answer · no LLM · computed from the sandbox abstracts
        </div>
      )}
      {msg.note && (
        <div style={{ background: C.amberBg, borderRadius: 9, padding: "11px 14px", fontSize: "12.5px", color: C.amber, lineHeight: 1.55 }}>{msg.note}</div>
      )}
      {msg.answer && msg.answer.length > 0 && (
        <div style={{ fontSize: "13.5px", lineHeight: 1.6, color: C.text, whiteSpace: "pre-wrap" }}>
          {msg.answer.map((p, i) => p.t === "text"
            ? <span key={i}>{p.v.split("\n").map((line, j, arr) => (
                <span key={j} style={line.trimStart().startsWith("\u26a0") ? { color: "#9a6a00", background: C.amberBg, borderRadius: 4, padding: "1px 3px" } : undefined}>
                  {line}{j < arr.length - 1 ? "\n" : ""}
                </span>
              ))}</span>
            : <button key={i} onClick={() => onToggleSources(true)} style={chipStyle}>{p.v}</button>)}
        </div>
      )}
      {(msg.matched || []).length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 9, letterSpacing: ".05em", textTransform: "uppercase", color: C.muted, fontFamily: MONO }}>Matched</span>
          {msg.matched.map((m) => (
            <span key={m.lease_id} style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 20, padding: "2px 8px", fontSize: 10, color: C.mut2, whiteSpace: "nowrap" }}>{dispName(m.tenant)}</span>
          ))}
        </div>
      )}

      {sources.length > 0 && (
        <div style={{ border: `1px solid ${msg.sourcesOpen ? C.blueBrd : C.border}`, borderRadius: 9, overflow: "hidden", transition: "border-color .15s" }}>
          <button onClick={() => onToggleSources()} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", background: C.surface, border: "none", borderBottom: msg.sourcesOpen ? `1px solid ${C.hair}` : "none", cursor: "pointer" }}>
            <Svg d={IC.chev} size={15} stroke={C.mut2} style={{ transform: msg.sourcesOpen ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform .15s" }} />
            <Svg d={IC.file} size={15} stroke={C.mut2} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Sources</span>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 20, height: 18, padding: "0 6px", border: `1px solid ${C.greenBrd}`, borderRadius: 20, fontSize: 10, fontWeight: 700, color: C.greenDark, fontFamily: MONO }}>{sources.length}</span>
            {!msg.sourcesOpen && (
              <div style={{ display: "flex", gap: 6, marginLeft: 2, overflow: "hidden" }}>
                {sources.slice(0, 2).map((s, i) => {
                  const t = s.tenant ? `${s.tenant} · ${s.cat === "Letter of Credit" ? "LOC" : s.cat === "License Agreement" ? "License" : s.cat === "Amendment" ? "Amendment" : "Lease"}` : (s.cite || "");
                  return <span key={i} style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${C.border}`, borderRadius: 20, padding: "2px 8px", fontSize: 10, color: C.mut2, whiteSpace: "nowrap" }}>{t.length > 34 ? t.slice(0, 32) + "…" : t}</span>;
                })}
              </div>
            )}
            <span style={{ marginLeft: "auto", fontSize: "11.5px", color: C.blue }}>{msg.sourcesOpen ? "Hide" : "Show sources"}</span>
          </button>
          {msg.sourcesOpen && (
            <div style={{ padding: 13, display: "flex", flexDirection: "column", gap: 10, animation: "lai-in .25s ease" }}>
              {sources.map((s, i) => <SourceCard key={i} s={s} n={i + 1} />)}
              <div style={{ fontSize: 10, color: C.faint, lineHeight: 1.5, fontFamily: MONO, padding: "0 2px" }}>
                Harvey returns rank-ordered abstracts — no numeric similarity score. Raw lease PDFs remain in SharePoint.
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: 2, alignItems: "center", marginTop: 2 }}>
        <button onClick={onCopy} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 8px", borderRadius: 6, background: "transparent", border: "none", color: msg.copied ? C.greenDark : C.muted, cursor: "pointer", fontSize: "11.5px", transition: "all .1s" }}>
          <Svg d={IC.copy} /><span>{msg.copied ? "Copied!" : "Copy"}</span>
        </button>
        {isLast && (
          <button onClick={onRegenerate} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 8px", borderRadius: 6, background: "transparent", border: "none", color: C.muted, cursor: "pointer", fontSize: "11.5px", transition: "all .1s" }}>
            <Svg d={IC.regen} /><span>Regenerate</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function Ask({ properties, queuedAsk, askEnabled }) {
  const [sessions, setSessions] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [scope, setScope] = useState("All");
  const [scopeOpen, setScopeOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameVal, setRenameVal] = useState("");
  const threadRef = useRef(null);
  const inputRef = useRef(null);
  const renameRef = useRef(null);
  const seq = useRef(0);
  const lastQueued = useRef(null);

  const active = sessions.find((s) => s.id === activeId) || null;
  const isStreaming = !!active && active.messages.some((m) => m.state === "streaming");

  const patchMsg = (sessId, msgIdx, patch) =>
    setSessions((ss) => ss.map((s) => s.id !== sessId ? s : {
      ...s, messages: s.messages.map((m, i) => i === msgIdx ? { ...m, ...(typeof patch === "function" ? patch(m) : patch) } : m),
    }));

  async function runQuery(sessId, msgIdx, query, sc) {
    try {
      const body = { query };
      if (sc) body.scope = sc;
      // conversation context: prior turns in this session, so follow-ups resolve
      const sess = sessions.find((x) => x.id === sessId);
      const history = (sess?.messages || []).slice(0, msgIdx)
        .map((mm) => mm.role === "user"
          ? (mm.q ? { role: "user", content: mm.q } : null)
          : (mm.answer?.length ? { role: "assistant", content: mm.answer.map((p) => p.t === "text" ? p.v : `[${p.v}]`).join("") } : null))
        .filter(Boolean);
      if (history.length) body.history = history;
      const d = await api("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const parsed = d.answer ? parseAnswer(d.answer) : { parts: [], cites: [] };
      let sources;
      if (d.sources && d.sources.length) {
        sources = parsed.cites.map((c) => d.sources.find((s) => s.cite === c) || { cite: c });
        for (const s of d.sources) if (!sources.some((r) => r.cite === s.cite)) sources.push(s);
      } else {
        sources = parsed.cites.map((c) => ({ cite: c }));
      }
      patchMsg(sessId, msgIdx, {
        state: "answered", answer: parsed.parts, sources,
        note: d.note || null, matched: d.matched_leases || [], mode: d.mode || null, error: null,
      });
    } catch (e) {
      patchMsg(sessId, msgIdx, { state: "answered", error: e.message });
    }
  }

  function ask(query, opts = {}) {
    const sc = opts.scope !== undefined ? opts.scope : (scope === "All" ? null : scope);
    const userMsg = { role: "user", text: query, scope: sc };
    const botMsg = { role: "assistant", state: "streaming", answer: null, sources: [], note: null, matched: [], mode: null, error: null, sourcesOpen: false, copied: false };

    if (opts.newSession || !active) {
      const id = ++seq.current;
      const title = query.replace(/[?!.]+$/, "").trim();
      setSessions((ss) => [{
        id, title: title.length > 46 ? title.slice(0, 43) + "…" : title,
        date: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        messages: [userMsg, botMsg],
      }, ...ss]);
      setActiveId(id);
      setInput("");
      runQuery(id, 1, query, sc);
    } else {
      const idx = active.messages.length + 1;
      setSessions((ss) => ss.map((s) => s.id === active.id ? { ...s, messages: [...s.messages, userMsg, botMsg] } : s));
      setInput("");
      runQuery(active.id, idx, query, sc);
    }
  }

  const regenerate = () => {
    if (!active) return;
    const lastUserIdx = active.messages.map((m) => m.role).lastIndexOf("user");
    if (lastUserIdx < 0) return;
    const um = active.messages[lastUserIdx];
    const botIdx = lastUserIdx + 1;
    patchMsg(active.id, botIdx, { state: "streaming", error: null, sourcesOpen: false });
    runQuery(active.id, botIdx, um.text, um.scope);
  };

  const copyMsg = (msgIdx) => {
    const m = active?.messages[msgIdx];
    if (!m?.answer) return;
    const txt = m.answer.map((p) => (p.t === "text" ? p.v : `[${p.v}]`)).join("");
    try { navigator.clipboard?.writeText(txt); } catch { /* clipboard may be blocked on file:// */ }
    patchMsg(active.id, msgIdx, { copied: true });
    setTimeout(() => patchMsg(active.id, msgIdx, { copied: false }), 2000);
  };

  useEffect(() => {
    if (queuedAsk && queuedAsk.id !== lastQueued.current) {
      lastQueued.current = queuedAsk.id;
      ask(queuedAsk.query, { scope: queuedAsk.scope, newSession: true });
    }
  }, [queuedAsk]); // eslint-disable-line react-hooks/exhaustive-deps

  const msgCount = active ? active.messages.length : 0;
  useEffect(() => {
    const el = threadRef.current;
    if (el) requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
  }, [activeId, msgCount, isStreaming]);

  useEffect(() => {
    const onDoc = (e) => { if (menuOpenId != null && !e.target.closest("[data-menu]")) setMenuOpenId(null); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpenId]);

  useEffect(() => { if (renamingId && renameRef.current) { renameRef.current.focus(); renameRef.current.select(); } }, [renamingId]);

  const commitRename = (id) => {
    const v = renameVal.trim();
    setSessions((ss) => v ? ss.map((x) => x.id === id ? { ...x, title: v } : x) : ss);
    setRenamingId(null);
  };
  const deleteSession = (id) => {
    setSessions((ss) => {
      const next = ss.filter((x) => x.id !== id);
      if (activeId === id) setActiveId(next.length ? next[0].id : null);
      return next;
    });
    setMenuOpenId(null);
  };

  const send = () => {
    const t = input.trim();
    if (t && !isStreaming) {
      ask(t);
      if (inputRef.current) inputRef.current.style.height = "auto";  // shrink back after send
    }
  };
  const onInput = (e) => {
    const el = e.target;
    setInput(el.value.slice(0, 500));
    el.style.height = "0px"; el.style.height = Math.min(120, el.scrollHeight) + "px";
  };
  const filtered = search.trim() ? sessions.filter((s) => s.title.toLowerCase().includes(search.toLowerCase().trim())) : sessions;
  const monoLabel = { fontSize: 10, fontWeight: 400, letterSpacing: ".07em", textTransform: "uppercase", color: C.muted, fontFamily: MONO };
  const scopeActive = scope !== "All";
  const sendDisabled = !input.trim() || isStreaming;

  return (
    <>
      {/* Sidebar */}
      <div data-tour="sidebar" style={{ width: 212, flex: "none", borderRight: `1px solid ${C.border}`, background: C.surface, display: "flex", flexDirection: "column", padding: 14, gap: 13, overflow: "hidden" }}>
        <button onClick={() => { setActiveId(null); setInput(""); }} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "8px 14px", background: C.blue, color: "#fff", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "background .12s" }}>
          <Svg d={IC.plus} size={15} stroke="#fff" w={1.7} />
          New conversation
        </button>

        <div style={monoLabel}>History · this session</div>

        <div style={{ display: "flex", alignItems: "center", gap: 7, border: `1px solid ${C.border}`, borderRadius: 7, padding: "5px 9px", background: "#fff", marginTop: -4 }}>
          <Svg d={IC.search} size={12} stroke={C.muted} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search history…"
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "inherit", fontSize: "11.5px", color: C.text }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 3, overflowY: "auto", flex: 1 }}>
          {filtered.map((s) => {
            const on = s.id === activeId;
            const renaming = renamingId === s.id;
            return (
              <div key={s.id} className={on ? "lai-srow-active" : "lai-srow"} style={{ position: "relative", borderRadius: 7 }}>
                {renaming ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "9px 11px", borderRadius: 7, background: C.blueBg, border: `1px solid ${C.blueBrd}` }}>
                    <input ref={renameRef} value={renameVal} onChange={(e) => setRenameVal(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commitRename(s.id); } if (e.key === "Escape") setRenamingId(null); }}
                      onBlur={() => commitRename(s.id)}
                      style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontFamily: "inherit", fontSize: 12, color: C.text, lineHeight: 1.35 }} />
                    <span style={{ fontSize: 9, letterSpacing: ".05em", textTransform: "uppercase", color: C.muted, fontFamily: MONO }}>{s.date} · enter to save</span>
                  </div>
                ) : (
                  <>
                    <button onClick={() => { setActiveId(s.id); setMenuOpenId(null); }} style={{
                      width: "100%", display: "flex", flexDirection: "column", gap: 4, padding: "9px 28px 9px 11px", borderRadius: 7,
                      background: on ? C.blueBg : "transparent", border: `1px solid ${on ? C.blueBrd : "transparent"}`, cursor: "pointer", textAlign: "left",
                    }}>
                      <span style={{ fontSize: 12, fontWeight: on ? 500 : 400, color: on ? C.blueDark : C.mut2, lineHeight: 1.35, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{s.title}</span>
                      <span style={{ fontSize: 9, letterSpacing: ".05em", textTransform: "uppercase", color: C.muted, fontFamily: MONO }}>{s.date} · {Math.ceil(s.messages.length / 2)} msg</span>
                    </button>
                    <button className={menuOpenId === s.id ? "lai-dots open" : "lai-dots"} data-menu="1"
                      onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === s.id ? null : s.id); }}
                      style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 5, background: menuOpenId === s.id ? C.border : "transparent", border: "none", cursor: "pointer", color: C.muted, transition: "opacity .1s" }}>
                      <Svg d={IC.dots} w={3} />
                    </button>
                    {menuOpenId === s.id && (
                      <div data-menu="1" style={{ position: "absolute", top: "100%", right: 0, marginTop: 2, width: 136, padding: 4, zIndex: 60, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,.12)" }}>
                        <button onClick={() => { setMenuOpenId(null); setRenamingId(s.id); setRenameVal(s.title); }} style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", fontSize: "12.5px", color: C.mut2, borderRadius: 6, background: "transparent", border: "none", cursor: "pointer" }}>
                          <Svg d={IC.pencil} stroke={C.muted} />Rename
                        </button>
                        <button onClick={() => deleteSession(s.id)} style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", fontSize: "12.5px", color: "#c0392b", borderRadius: 6, background: "transparent", border: "none", cursor: "pointer" }}>
                          <Svg d={IC.trash} stroke="#c0392b" />Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding: "16px 8px", textAlign: "center", ...monoLabel }}>No matching conversations</div>
          )}
        </div>
      </div>

      {/* Chat column */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: "#fff" }}>
        <div ref={threadRef} style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflowY: "auto" }}>
          {!active ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px 40px", gap: 22 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 18, height: 18, background: C.surface, borderRadius: 4 }} />
              </div>
              <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-.015em", color: C.text }}>Ask about the active lease portfolio</div>
                <div style={{ fontSize: "13.5px", color: C.muted, maxWidth: 440, lineHeight: 1.55, margin: "0 auto" }}>
                  Plain-English questions about terms, critical dates, options, and letters of credit — grounded on Harvey RAG abstracts. Every answer cites its source documents.
                </div>
              </div>
              <div data-tour="suggestions" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, width: "100%", maxWidth: 580 }}>
                {SUGGESTS.map((t) => (
                  <button key={t} onClick={() => ask(t, { newSession: true })} style={{ border: `1px solid ${C.greenBrd}`, borderRadius: 9, padding: "12px 14px", background: C.greenBg, display: "flex", alignItems: "flex-start", gap: 9, cursor: "pointer", textAlign: "left", transition: "all .12s" }}>
                    <Svg d={IC.search} size={14} stroke={C.greenDark} style={{ marginTop: 1, flex: "none" }} />
                    <span style={{ fontSize: 13, color: C.greenText, lineHeight: 1.4 }}>{t}</span>
                  </button>
                ))}
              </div>
              {!askEnabled && (
                <div style={{ fontSize: 10, color: C.faint, fontFamily: MONO }}>STRUCTURED ANSWERS FROM PARSED DATA · CLAUDE SYNTHESIS REQUIRES THE BACKEND</div>
              )}
            </div>
          ) : (
            <div style={{ maxWidth: 680, width: "100%", margin: "0 auto", padding: "24px 30px 36px", display: "flex", flexDirection: "column", gap: 16 }}>
              {!dismissed && (
                <div style={{ background: C.surface, border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(0,0,0,.05)", borderRadius: 10, padding: "11px 14px", display: "flex", alignItems: "flex-start", gap: 10, animation: "lai-in .25s ease" }}>
                  <Svg d={IC.warn} size={15} stroke={C.muted} style={{ marginTop: 1, flex: "none" }} />
                  <div style={{ flex: 1, fontSize: 12, color: C.mut2, lineHeight: 1.55 }}>
                    Answers are generated from Harvey-style sandbox abstracts (all data fabricated) and are not legal advice. Always confirm critical dates against the linked source files.{" "}
                    <button onClick={() => setDismissed(true)} style={{ color: C.greenDark, fontSize: 12, cursor: "pointer", background: "none", border: "none", padding: 0, textDecoration: "underline" }}>Don't show again</button>
                  </div>
                  <button onClick={() => setDismissed(true)} style={{ color: C.muted, fontSize: 18, lineHeight: 1, cursor: "pointer", flex: "none", background: "none", border: "none", padding: "0 2px" }}>×</button>
                </div>
              )}

              {active.messages.map((m, i) => m.role === "user" ? (
                <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ maxWidth: "82%", background: C.blueBg, border: `1px solid ${C.blueBrd}`, borderRadius: "14px 14px 4px 14px", padding: "11px 15px", fontSize: "13.5px", lineHeight: 1.5, color: C.text }}>{m.text}</div>
                </div>
              ) : (
                <AssistantMessage key={i} msg={m}
                  isLast={i === active.messages.length - 1}
                  onToggleSources={(force) => patchMsg(active.id, i, (old) => ({ sourcesOpen: force === true ? true : !old.sourcesOpen }))}
                  onCopy={() => copyMsg(i)}
                  onRegenerate={regenerate} />
              ))}

              <div style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 11, color: C.faint, lineHeight: 1.5 }}>
                <Svg d={IC.warn} size={12} stroke={C.faint} style={{ marginTop: 1, flex: "none" }} />
                <span>Generated from indexed lease abstracts — not legal advice. Always confirm critical dates against the linked source.</span>
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div data-tour="inputbar" style={{ flex: "none", borderTop: `1px solid ${C.border}`, background: "#fff", padding: "9px 16px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          {scopeOpen && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", animation: "lai-in .2s ease" }}>
              <span style={{ fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: C.muted, fontFamily: MONO }}>Scope</span>
              {properties.map((p) => {
                const on = scope === p;
                return (
                  <button key={p} onClick={() => setScope(p)} style={{
                    border: `1px solid ${on ? C.blue : C.border2}`, background: on ? C.blueBg : "#fff",
                    color: on ? C.blueDark : C.mut2, borderRadius: 100, padding: "3px 11px", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all .12s",
                  }}>{p}</button>
                );
              })}
              <span style={{ fontSize: 10, color: C.faint, fontStyle: "italic" }}>— applied at Vault-project level</span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1.5px solid ${C.border2}`, borderRadius: 12, background: C.surface, padding: "7px 7px 7px 12px" }}>
            <textarea ref={inputRef} value={input} onChange={onInput}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              rows={1} placeholder={active ? "Reply in this conversation…" : "Ask about any active lease…"}
              style={{ flex: 1, resize: "none", border: "none", outline: "none", background: "transparent", fontFamily: "inherit", fontSize: "13.5px", color: C.text, lineHeight: 1.5, padding: "3px 0", maxHeight: 120, overflowY: "auto" }} />
            <button onClick={send} style={{ width: 28, height: 28, borderRadius: 6, flex: "none", background: sendDisabled ? "#c9d8c0" : C.blue, border: "none", cursor: sendDisabled ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}>
              <Svg d={IC.send} size={14} stroke="#fff" w={1.7} />
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, letterSpacing: ".05em", textTransform: "uppercase", color: C.faint, fontFamily: MONO }}>Enter to send · Shift+Enter newline</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => setScopeOpen((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 4, border: "none", background: "none", cursor: "pointer", padding: 0, color: scopeOpen || scopeActive ? C.blue : C.muted, fontSize: 11 }}>
                <Svg d={IC.funnel} size={12} /><span>{scopeActive ? scope : "Scope"}</span>
              </button>
              <span style={{ fontSize: 10, letterSpacing: ".05em", color: C.faint, fontFamily: MONO }}>{input.length} / 500</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

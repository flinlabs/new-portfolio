import React, { useCallback, useEffect, useState } from "react";
import { C, api, buildNameCanon } from "./ui.jsx";
import Ask from "./Ask.jsx";
import Dashboard from "./Dashboard.jsx";
import Tour, { tourSeen } from "./Tour.jsx";

export default function App() {
  const [tab, setTab] = useState("ask");
  const [leases, setLeases] = useState([]);
  const [health, setHealth] = useState(null);
  const [loadErr, setLoadErr] = useState(null);
  const [queuedAsk, setQueuedAsk] = useState(null);
  const [showTour, setShowTour] = useState(() => !tourSeen());

  useEffect(() => {
    api("/health").then(setHealth).catch(() => setHealth({ status: "down" }));
    api("/api/leases").then((d) => { buildNameCanon(d.leases); setLeases(d.leases); }).catch((e) => setLoadErr(e.message));
  }, []);

  const askAbout = useCallback((query, scope) => {
    setQueuedAsk({ query, scope: scope || null, id: Date.now() });
    setTab("ask");
  }, []);

  const properties = ["All", ...Array.from(new Set(leases.map((l) => l.property_short).filter(Boolean)))];

  const tabBtn = (key, label) => {
    const active = tab === key;
    return (
      <button onClick={() => setTab(key)} style={{
        border: "none", background: "transparent", cursor: "pointer", fontSize: "13.5px", fontWeight: 600,
        padding: "0 6px 14px", borderBottom: `2px solid ${active ? C.green : "transparent"}`,
        color: active ? C.green : C.muted,
      }}>{label}</button>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%", overflow: "hidden", background: "#fff" }}>
      <div style={{ flex: "none", height: 52, background: C.surface, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "stretch", padding: "0 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingRight: 22 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <div style={{ width: 11, height: 11, background: C.surface, borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: "14.5px", fontWeight: 600, letterSpacing: "-.01em", color: C.text }}>Lease Intelligence</div>
        </div>
        <div data-tour="tabs" style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
          {tabBtn("ask", "Ask")}
          {tabBtn("dashboard", "Dashboard")}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => setShowTour(true)} title="Replay the guided tour"
            style={{ width: 24, height: 24, borderRadius: "50%", border: `1px solid ${C.border2}`, background: "#fff", color: C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer", lineHeight: 1, flex: "none" }}>?</button>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".07em", color: health?.static ? C.amber : C.muted }}>
            {health?.static ? "READ-ONLY \u00b7 STATIC SNAPSHOT" : "READ-ONLY \u00b7 PROTOTYPE"}
          </span>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.blue, color: "#fff", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>FL</div>
        </div>
      </div>

      {health && health.status !== "ok" && !health.static && (
        <div style={{ flex: "none", background: C.redBg, color: C.red, fontSize: 12, padding: "7px 18px" }}>
          {"Can't reach the backend. Start it with "}<code style={{ fontFamily: "'Space Mono',monospace" }}>python -m uvicorn main:app --reload</code>{", then reload this page."}
        </div>
      )}
      {loadErr && (
        <div style={{ flex: "none", background: C.amberBg, color: C.amber, fontSize: 12, padding: "7px 18px" }}>
          Lease list failed to load: {loadErr}
        </div>
      )}

      <div style={{ flex: 1, display: tab === "ask" ? "flex" : "none", minHeight: 0 }}>
        <Ask properties={properties} queuedAsk={queuedAsk} askEnabled={!!health?.ask_enabled} />
      </div>
      <div style={{ flex: 1, display: tab === "dashboard" ? "flex" : "none", minHeight: 0 }}>
        <Dashboard leases={leases} properties={properties} askAbout={askAbout} />
      </div>
      {showTour && <Tour setTab={setTab} onClose={() => setShowTour(false)} />}
    </div>
  );
}
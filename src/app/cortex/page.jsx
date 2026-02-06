"use client"
import { useState, useEffect, useRef, useCallback } from "react";

/*
  Append-only message list. Messages push into array, never removed.
  Overlays at z-100 never touch message DOM. Zero flicker.
  
  Palette: Morrie green + neutrals only. No rainbow.
  CoT: Claude-style thinking block (subtle bg, mono, expanding lines)
  Charts: Single green tone with opacity variation
*/

const G = {
  bg: "#060a0d",
  surface: "#0c1218",
  card: "#111920",
  border: "#1a2530",
  green: "#1a6b4a",
  gl: "#28a76e",
  gd: "#0d3324",
  g10: "rgba(40,167,110,.10)",
  g20: "rgba(40,167,110,.20)",
  g40: "rgba(40,167,110,.40)",
  white: "#e8ede9",
  t2: "#c0ccc3",
  dim: "#5e756a",
  dimmer: "#3a4d44",
  mono: "'DM Mono', monospace",
  sans: "'DM Sans', sans-serif",
};

const TIMELINE = [
  { id: "title", dur: 4200 },
  { id: "blur_what", dur: 3000 },
  { id: "q1", dur: 1800 },
  { id: "cot1", dur: 3500 },
  { id: "a1", dur: 7000 },
  { id: "blur_why", dur: 3000 },
  { id: "q2", dur: 1800 },
  { id: "cot2", dur: 4500 },
  { id: "a2", dur: 8000 },
  { id: "blur_whatif", dur: 3000 },
  { id: "q3", dur: 2200 },
  { id: "cot3", dur: 3500 },
  { id: "a3", dur: 7500 },
  { id: "snippet", dur: 6500 },
  { id: "close", dur: 5000 },
];
const TOTAL_MS = TIMELINE.reduce((s, t) => s + t.dur, 0);

const MESSAGES = {
  q1: { type: "user", text: "How are we tracking this quarter? Give me the full picture across regions." },
  cot1: { type: "cot", lines: [
    "Querying Q3 revenue aggregated by region",
    "Comparing actuals against quarterly plan targets",
    "Region B showing 12% decline — flagging for drill-down",
    "Ranking by absolute contribution and delta vs plan",
  ]},
  a1: { type: "bot", blocks: [
    { kind: "text", content: "Q3 total across your top 5 regions is ₹65.9Cr — 4.1% above plan." },
    { kind: "bars", data: [
      { l: "North", v: 18.2 }, { l: "West", v: 14.1 }, { l: "South", v: 12.8 }, { l: "East", v: 11.5 }, { l: "Central", v: 9.3 },
    ]},
    { kind: "text", content: "North is leading at ₹18.2Cr. The concern is West — down 12% since November and accelerating. Most of the erosion traces to a single product category. Central softening but still within tolerance." },
  ]},
  q2: { type: "user", text: "Why is West declining? What's actually going wrong?" },
  cot2: { type: "cot", lines: [
    "Drilling into West region by product category",
    "Category C flagged — 41% sell-through vs 68% target (−27pp)",
    "Pulling return data: 14.8% return rate, 2.8× portfolio average",
    "Cross-referencing returns with production batch records",
    "Statistical test on Facility B batch correlation → p < 0.01",
    "Analysing return timing distribution for quality signal",
  ]},
  a2: { type: "bot", blocks: [
    { kind: "text", content: "Three root causes identified in Category C:" },
    { kind: "text", content: "1. Size clustering — M/L sizes are 73% of returns but only 48% of sales. A 1.5× over-index pointing to systematic grading issues." },
    { kind: "text", content: "2. Facility correlation — 81% of returns trace to Facility B, batches #4412–4419. Same SKUs from Facility A have only 6.2% returns — a 2.4× gap." },
    { kind: "text", content: "3. Rapid returns — Median 2.3 days to return, 64% within 48 hours. First-impression rejection, not buyer remorse." },
    { kind: "table", headers: ["Signal", "Value", "Benchmark"],
      rows: [
        ["Cat C return rate", "14.8%", "5.2% avg"],
        ["Facility B share", "81%", "~50% expected"],
        ["Median return time", "2.3 days", "8+ days"],
      ]},
    { kind: "text", content: "Confidence is high on the batch correlation (p<0.01). Recommend physical QC audit of Facility B before major intervention." },
  ]},
  q3: { type: "user", text: "What if we reroute production to Facility A and add size guides online?" },
  cot3: { type: "cot", lines: [
    "Checking Facility A idle capacity → 22%, sufficient for reroute",
    "Modelling return rate delta: 14.8% → ~8.2% based on Facility A baseline",
    "Revenue recovery: ₹12.4L/mo, logistics cost ₹4.2L one-time",
    "Net ROI at 6 months: ₹70.2L (16.7× return), confidence 82%",
  ]},
  a3: { type: "bot", blocks: [
    { kind: "text", content: "Facility A has 22% idle capacity — reroute is feasible without capex. Combined scenario:" },
    { kind: "table", headers: ["Metric", "Current", "Projected", "Δ"],
      rows: [
        ["Return rate", "14.8%", "~8.2%", "−44%"],
        ["Revenue recovered", "—", "₹12.4L/mo", "+₹12.4L"],
        ["Reroute cost", "—", "₹4.2L", "one-time"],
        ["Net ROI (6 mo)", "—", "₹70.2L", "16.7×"],
        ["Break-even", "—", "Week 3", ""],
      ]},
    { kind: "text", content: "Recommended: reroute this week, deploy size guides simultaneously, QC audit Facility B before resuming production. Break-even at week 3 — ₹70L net recovery over 6 months at 82% confidence." },
  ]},
};

const MSG_ORDER = ["q1","cot1","a1","q2","cot2","a2","q3","cot3","a3"];

export default function CortexVideo() {
  const [step, setStep] = useState(-1);
  const [msgs, setMsgs] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const stepRef = useRef(-1);
  const timerRef = useRef(null);
  const scrollRef = useRef(null);
  const pushedRef = useRef(new Set());

  const currentId = step >= 0 && step < TIMELINE.length ? TIMELINE[step].id : null;

  useEffect(() => {
    if (currentId && MESSAGES[currentId] && !pushedRef.current.has(currentId)) {
      pushedRef.current.add(currentId);
      setMsgs(prev => [...prev, { key: currentId, data: MESSAGES[currentId] }]);
    }
  }, [currentId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs.length, step]);

  const advance = useCallback(() => {
    stepRef.current++;
    if (stepRef.current >= TIMELINE.length) return;
    setStep(stepRef.current);
    timerRef.current = setTimeout(advance, TIMELINE[stepRef.current].dur);
  }, []);

  const play = () => {
    pushedRef.current = new Set();
    setMsgs([]);
    stepRef.current = -1;
    setElapsed(0);
    setStep(-1);
    setTimeout(() => advance(), 50);
  };

  useEffect(() => {
    if (step >= 0) {
      const i = setInterval(() => setElapsed(e => e + 100), 100);
      return () => clearInterval(i);
    }
  }, [step >= 0]);
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const showChat = msgs.length > 0 && currentId !== "snippet" && currentId !== "close" && currentId !== "title";
  const isBlur = currentId?.startsWith("blur_");

  return (
    <div style={{ width: "100%", height: "100vh", background: G.bg, fontFamily: G.sans, color: G.white, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes shimmer{0%{background-position:-200px 0}100%{background-position:200px 0}}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${G.border};border-radius:2px}
      `}</style>

      <div style={{ width: "100%", height: "100%", maxWidth: 1000, margin: "0 auto", position: "relative" }}>

        {/* TITLE */}
        {(step < 0 || currentId === "title") && (
          <Overlay>
            <div style={{ textAlign: "center", animation: "fadeUp .6s ease" }}>
              <Logo size={64} />
              <div style={{ fontSize: 56, fontWeight: 700, color: G.white, letterSpacing: "-0.04em", marginTop: 22, lineHeight: 1 }}>Cortex</div>
              <div style={{ fontSize: 13, color: G.dim, letterSpacing: ".3em", textTransform: "uppercase", marginTop: 10, fontFamily: G.mono }}>Decision Intelligence</div>
              {step < 0 ? (
                <button onClick={play} style={{ marginTop: 56, padding: "14px 44px", borderRadius: 28, border: "none", background: G.green, color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: G.sans, boxShadow: `0 6px 28px ${G.green}66`, display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="#fff"><path d="M0 0l12 7-12 7z"/></svg>
                  Watch Demo
                </button>
              ) : (
                <div style={{ marginTop: 32, fontSize: 17, color: G.dim, lineHeight: 1.6, maxWidth: 420, margin: "32px auto 0" }}>
                  From question to root cause to action —<br/>without leaving the chat.
                </div>
              )}
            </div>
          </Overlay>
        )}

        {/* CLOSE */}
        {currentId === "close" && (
          <Overlay>
            <div style={{ textAlign: "center", animation: "fadeUp .6s ease" }}>
              <Logo size={52} />
              <div style={{ fontSize: 48, fontWeight: 700, color: G.white, letterSpacing: "-0.04em", marginTop: 18 }}>Cortex</div>
              <div style={{ fontSize: 16, color: G.dim, marginTop: 10, lineHeight: 1.6 }}>Not another dashboard —<br/>a thinking partner for your data.</div>
              <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 36, fontSize: 13, fontFamily: G.mono, color: G.gl, opacity: 0, animation: "fadeIn .4s ease 1.5s both" }}>
                <span>What</span><span style={{ color: G.dimmer }}>→</span>
                <span>Why</span><span style={{ color: G.dimmer }}>→</span>
                <span>What If</span>
              </div>
              <div style={{ marginTop: 44, fontSize: 13, color: G.dimmer, fontFamily: G.mono, opacity: 0, animation: "fadeIn .4s ease 2.2s both" }}>questt.ai</div>
            </div>
          </Overlay>
        )}

        {/* COT SNIPPET */}
        {currentId === "snippet" && (
          <Overlay>
            <div style={{ maxWidth: 520, width: "100%", animation: "fadeUp .5s ease" }}>
              <div style={{ fontSize: 11, color: G.dim, fontFamily: G.mono, letterSpacing: ".25em", textTransform: "uppercase", marginBottom: 20, textAlign: "center" }}>Under the Hood</div>
              <div style={{ background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, overflow: "hidden" }}>
                {/* Claude-style CoT header */}
                <div style={{ padding: "12px 18px", borderBottom: `1px solid ${G.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z" stroke={G.gl} strokeWidth="1.2"/>
                    <path d="M5.5 8.5L7 10l3.5-4" stroke={G.gl} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: 13, fontWeight: 600, color: G.white, fontFamily: G.sans }}>Cortex's thinking</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, color: G.dim, fontFamily: G.mono }}>8 steps · 1.2s</span>
                </div>
                <div style={{ padding: "16px 18px" }}>
                  {[
                    "User asked about production rerouting impact",
                    "Checking Facility A capacity → 22% idle, sufficient",
                    "Pulling return data for Cat C batches from Facility B",
                    "Modelling return rate delta: 14.8% → ~8.2%",
                    "Revenue recovery: ₹12.4L/mo × 6 months = ₹74.4L gross",
                    "Subtracting reroute cost: ₹4.2L one-time",
                    "Factoring size guide impact: +15–20% return reduction",
                    "Confidence: 82% — limited by Facility A sample size",
                  ].map((line, i) => (
                    <div key={i} style={{
                      fontSize: 12.5, color: G.t2, lineHeight: 2, fontFamily: G.mono,
                      borderLeft: `2px solid ${i === 7 ? G.gl : G.border}`,
                      paddingLeft: 14, marginLeft: 2,
                      opacity: 0, animation: `fadeUp .3s ease ${.15 + i * .18}s both`,
                    }}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: G.dim, opacity: 0, animation: "fadeIn .4s ease 2.5s both", lineHeight: 1.6 }}>
                Every answer traces its reasoning —<br/>auditable, explainable, trustworthy.
              </div>
            </div>
          </Overlay>
        )}

        {/* BLUR INTERSTITIALS */}
        {currentId === "blur_what" && <BlurCard label="What" desc="Start with the big picture — how is the business performing?" />}
        {currentId === "blur_why" && <BlurCard label="Why" desc="Dig into root causes across sales, inventory, and supply chain." />}
        {currentId === "blur_whatif" && <BlurCard label="What If" desc="Model interventions before committing resources." />}

        {/* CHAT */}
        <div style={{ position: "absolute", inset: 0, display: showChat ? "flex" : "none", flexDirection: "column", padding: "14px 14px 0" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRadius: 14, overflow: "hidden", background: G.surface, border: `1px solid ${G.border}` }}>

            <div style={{ height: 52, background: G.green, display: "flex", alignItems: "center", gap: 12, padding: "0 20px", flexShrink: 0 }}>
              <Logo size={30} flat />
              <div>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>Cortex</div>
                <div style={{ color: "rgba(255,255,255,.35)", fontSize: 10, fontFamily: G.mono, letterSpacing: ".08em", textTransform: "uppercase" }}>Decision Intelligence</div>
              </div>
            </div>

            <div style={{ flex: 1, overflow: "auto", padding: "20px 20px 12px", display: "flex", flexDirection: "column", gap: 14, filter: isBlur ? "blur(8px)" : "none", transition: "filter .3s" }}>
              {msgs.map((m, i) => {
                const latest = i === msgs.length - 1;
                return (
                  <div key={m.key} style={{ animation: latest ? "fadeUp .35s ease" : "none" }}>
                    {m.data.type === "user" && <UserBubble text={m.data.text} />}
                    {m.data.type === "cot" && <CotBlock lines={m.data.lines} animate={latest} />}
                    {m.data.type === "bot" && <BotBubble blocks={m.data.blocks} animate={latest} />}
                  </div>
                );
              })}
              <div ref={scrollRef} style={{ height: 1 }} />
            </div>

            <div style={{ padding: "10px 20px", borderTop: `1px solid ${G.border}`, background: G.card, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div style={{ flex: 1, padding: "10px 16px", borderRadius: 24, background: G.surface, border: `1px solid ${G.border}`, fontSize: 13, color: G.dim }}>Ask Cortex anything…</div>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: G.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 14l12-6L2 2v4.5l8 1.5-8 1.5V14z" fill="#fff"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        {step >= 0 && (
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `${G.dim}11`, zIndex: 300 }}>
            <div style={{ height: "100%", background: G.gl, width: `${Math.min((elapsed / TOTAL_MS) * 100, 100)}%`, transition: "width .1s linear" }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ SUB-COMPONENTS ═══ */

function Overlay({ children }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: `radial-gradient(ellipse at 30% 40%, #0a2a1c, transparent 55%), #060a0d` }}>
      {children}
    </div>
  );
}

function Logo({ size = 48, flat = false }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.26,
      background: flat ? "rgba(255,255,255,.12)" : "#1a6b4a",
      display: "flex", alignItems: "center", justifyContent: "center",
      margin: flat ? 0 : "0 auto",
      boxShadow: flat ? "none" : "0 8px 32px #1a6b4a44",
    }}>
      <span style={{ fontSize: size * 0.42, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans'" }}>M</span>
    </div>
  );
}

function BlurCard({ label, desc }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(6,10,13,0.92)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", animation: "fadeIn .3s ease" }}>
      <div style={{ textAlign: "center", animation: "fadeUp .4s ease" }}>
        <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#28a76e44", letterSpacing: ".3em", textTransform: "uppercase", marginBottom: 16 }}>Question Type</div>
        <div style={{ fontSize: 60, fontWeight: 700, color: "#28a76e", letterSpacing: "-0.04em", lineHeight: 1 }}>{label}</div>
        <div style={{ fontSize: 15, color: "#5e756a", marginTop: 16, maxWidth: 380, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

function UserBubble({ text }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ maxWidth: "72%", padding: "10px 16px", borderRadius: "16px 16px 4px 16px", background: "#1a6b4a", color: "#fff", fontSize: 13.5, lineHeight: 1.6 }}>
        {text}
      </div>
    </div>
  );
}

/* Claude-style thinking block */
function CotBlock({ lines, animate }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div style={{ maxWidth: "82%", width: "100%" }}>
        <div style={{ background: "#0c1218", border: `1px solid ${G.border}`, borderRadius: 10, overflow: "hidden" }}>
          {/* Header — like Claude's "Thinking..." */}
          <div style={{ padding: "9px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${G.border}` }}>
            <div style={{ width: 14, height: 14, position: "relative" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="#28a76e" strokeWidth="1.2" strokeDasharray="4 3" opacity=".5">
                  {animate && <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="3s" repeatCount="indefinite"/>}
                </circle>
              </svg>
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#28a76e", fontFamily: "'DM Sans'" }}>
              {animate ? "Thinking…" : "Thought process"}
            </span>
            <span style={{ marginLeft: "auto", fontSize: 10, color: "#3a4d44", fontFamily: "'DM Mono', monospace" }}>{lines.length} steps</span>
          </div>
          {/* Lines */}
          <div style={{ padding: "10px 14px" }}>
            {lines.map((line, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 10, padding: "4px 0",
                opacity: animate ? 0 : 1,
                animation: animate ? `fadeUp .3s ease ${i * .4}s both` : "none",
              }}>
                <span style={{ fontSize: 10, color: "#3a4d44", fontFamily: "'DM Mono', monospace", flexShrink: 0, marginTop: 2, minWidth: 14 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 12, color: "#5e756a", lineHeight: 1.6, fontFamily: "'DM Mono', monospace" }}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BotBubble({ blocks, animate }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div style={{ maxWidth: "90%", padding: "12px 16px", borderRadius: "4px 16px 16px 16px", background: "#111920", border: `1px solid #1a2530`, fontSize: 13, color: "#e8ede9", lineHeight: 1.7 }}>
        {blocks.map((block, i) => {
          const anim = { opacity: animate ? 0 : 1, animation: animate ? `fadeUp .35s ease ${i * .25}s both` : "none" };

          if (block.kind === "text") {
            return <p key={i} style={{ ...anim, marginTop: i > 0 ? 8 : 0 }}>{block.content}</p>;
          }

          if (block.kind === "bars") {
            const mx = Math.max(...block.data.map(d => d.v));
            return (
              <div key={i} style={{ ...anim, margin: "10px 0", display: "flex", flexDirection: "column", gap: 6 }}>
                {block.data.map((d, j) => {
                  const pct = (d.v / mx) * 100;
                  const opacity = 0.4 + (d.v / mx) * 0.6; // higher value = more opaque
                  return (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 50, fontSize: 11, color: "#5e756a", textAlign: "right", flexShrink: 0 }}>{d.l}</div>
                      <div style={{ flex: 1, position: "relative", height: 20, background: "#1a253022", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, width: `${pct}%`, borderRadius: 4, background: `rgba(40,167,110,${opacity})` }} />
                        <div style={{ position: "relative", padding: "0 8px", height: 20, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#e8ede9", fontFamily: "'DM Mono', monospace" }}>₹{d.v}Cr</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }

          if (block.kind === "table") {
            const gc = `1fr ${block.headers.slice(1).map(() => "72px").join(" ")}`;
            return (
              <div key={i} style={{ ...anim, borderRadius: 6, overflow: "hidden", border: `1px solid #1a2530`, margin: "10px 0" }}>
                <div style={{ display: "grid", gridTemplateColumns: gc, padding: "6px 10px", background: "#1a253033", gap: 4 }}>
                  {block.headers.map(h => (
                    <div key={h} style={{ fontSize: 9, fontWeight: 600, color: "#5e756a", textTransform: "uppercase", letterSpacing: ".04em", fontFamily: "'DM Mono', monospace" }}>{h}</div>
                  ))}
                </div>
                {block.rows.map((row, ri) => (
                  <div key={ri} style={{ display: "grid", gridTemplateColumns: gc, padding: "6px 10px", gap: 4, borderTop: "1px solid #1a253033" }}>
                    {row.map((cell, ci) => (
                      <div key={ci} style={{
                        fontSize: 11,
                        color: ci === 0 ? "#c0ccc3" : (ci === block.headers.length - 1 ? "#28a76e" : "#5e756a"),
                        fontFamily: ci > 0 ? "'DM Mono', monospace" : "'DM Sans', sans-serif",
                        fontWeight: ci === block.headers.length - 1 ? 600 : 400,
                      }}>
                        {typeof cell === "object" ? cell.v : cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

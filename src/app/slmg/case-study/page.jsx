'use client';
import { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
};

const FadeIn = ({ children, delay = 0, direction = "up", style = {} }) => {
  const [ref, v] = useInView(0.08);
  const t = { up: "translateY(32px)", left: "translateX(32px)", right: "translateX(-32px)", none: "none" };
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0, transform: v ? "none" : t[direction],
      transition: `all 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style,
    }}>{children}</div>
  );
};

const C = {
  green: "#0C2C18", greenDeep: "#071A0F", greenMid: "#1B3A26", greenLight: "#1E4430",
  sage: "#85A383", sageDim: "rgba(133,163,131,0.12)", sageLine: "rgba(133,163,131,0.3)",
  cream: "#E7DDCA", creamLt: "#F5F1EA", creamWarm: "#FAF8F3",
  terra: "#DF7649", terraBg: "rgba(223,118,73,0.06)",
  red: "#C43333", redBg: "#FEF2F2",
  greenBg: "#F0FAF4", greenText: "#065F46",
  teal: "#3A9E8F", tealLight: "rgba(58,158,143,0.15)",
  white: "#FFFFFF", offWhite: "#FAFAF7",
  textDark: "#1A1A1A", textMid: "#4A5548", textMuted: "#7A8578",
  border: "#E2DED6",
};

const serif = "'Playfair Display', Georgia, serif";
const sans = "'DM Sans', system-ui, sans-serif";

const Section = ({ bg = C.offWhite, children, dark = false, style = {} }) => (
  <section style={{
    background: bg, padding: "64px 0",
    position: "relative", overflow: "hidden",
    color: dark ? C.cream : C.green, ...style,
  }}>
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 40px", width: "100%" }}>{children}</div>
  </section>
);

const Tag = ({ children, color = C.sage }) => (
  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color, fontFamily: sans }}>{children}</span>
);

const H = ({ children, size = 44, color, style = {} }) => (
  <h2 style={{ fontSize: size, fontFamily: serif, fontWeight: 600, lineHeight: 1.15, margin: 0, color, ...style }}>{children}</h2>
);

const P = ({ children, color, style = {} }) => (
  <p style={{ fontSize: 16, lineHeight: 1.7, fontFamily: sans, fontWeight: 400, margin: 0, maxWidth: 580, color, ...style }}>{children}</p>
);

/* ── Knowledge Graph Visual (IW-style) ── */
const KnowledgeGraph = () => {
  // Metric nodes (larger, teal)
  const metrics = [
    { x: 220, y: 80, r: 22, label: "Fill Rate" },
    { x: 480, y: 55, r: 26, label: "Sales Volume" },
    { x: 680, y: 100, r: 20, label: "Revenue" },
    { x: 120, y: 240, r: 18, label: "Forecast\nAccuracy" },
    { x: 580, y: 260, r: 22, label: "OTIF %" },
    { x: 380, y: 310, r: 20, label: "Gross\nMargin" },
  ];
  // Entity nodes (smaller, green)
  const entities = [
    { x: 80, y: 120, r: 10, label: "ERP" },
    { x: 160, y: 155, r: 8, label: "Lead Time" },
    { x: 300, y: 130, r: 12, label: "SKU" },
    { x: 400, y: 100, r: 9, label: "Product" },
    { x: 350, y: 180, r: 10, label: "Brand" },
    { x: 250, y: 200, r: 8, label: "Channel" },
    { x: 520, y: 140, r: 11, label: "Region" },
    { x: 620, y: 170, r: 9, label: "Territory" },
    { x: 720, y: 180, r: 10, label: "Account" },
    { x: 440, y: 200, r: 9, label: "Category" },
    { x: 180, y: 300, r: 8, label: "Supplier" },
    { x: 280, y: 270, r: 9, label: "DC" },
    { x: 500, y: 190, r: 8, label: "Customer" },
    { x: 660, y: 240, r: 9, label: "Sales Rep" },
    { x: 740, y: 280, r: 8, label: "Quota" },
    { x: 70, y: 280, r: 7, label: "WMS" },
    { x: 480, y: 310, r: 8, label: "Promotion" },
    { x: 320, y: 50, r: 8, label: "Variant" },
  ];
  // Decision nodes (triangles, terracotta)
  const decisions = [
    { x: 150, y: 50, label: "Reorder\nDecision" },
    { x: 700, y: 50, label: "Territory\nAssignment" },
    { x: 60, y: 330, label: "Budget\nAllocation" },
    { x: 660, y: 310, label: "Markdown\nDecision" },
  ];
  // Connections
  const edges = [
    [300,130,220,80],[300,130,480,55],[300,130,400,100],[300,130,350,180],
    [400,100,480,55],[480,55,520,140],[520,140,620,170],[520,140,680,100],
    [620,170,720,180],[680,100,720,180],[220,80,160,155],[160,155,80,120],
    [250,200,220,80],[250,200,350,180],[120,240,180,300],[120,240,160,155],
    [280,270,120,240],[280,270,300,130],[440,200,350,180],[440,200,480,55],
    [500,190,520,140],[500,190,580,260],[580,260,660,240],[660,240,740,280],
    [380,310,480,310],[380,310,280,270],[480,310,580,260],[70,280,120,240],
    [300,130,320,50],[680,100,660,240],
  ];

  return (
    <div style={{
      width: "100%", background: C.creamWarm, borderRadius: 12,
      padding: "20px 16px", position: "relative", overflow: "hidden",
      border: `1px solid ${C.border}`,
    }}>
      <svg viewBox="0 0 800 360" style={{ width: "100%", height: "auto", display: "block" }}>
        {/* Edges */}
        {edges.map(([x1,y1,x2,y2], i) => (
          <line key={`e${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.sage} strokeWidth="0.6" opacity="0.25" />
        ))}
        {/* Entity nodes */}
        {entities.map((n, i) => (
          <g key={`en${i}`}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={C.sage} opacity="0.15" stroke={C.sage} strokeWidth="0.5" strokeOpacity="0.3" />
            <text x={n.x} y={n.y + 0.5} textAnchor="middle" dominantBaseline="middle"
              fontSize="6" fontFamily="DM Sans, sans-serif" fill={C.textMid} fontWeight="500">{n.label}</text>
          </g>
        ))}
        {/* Metric nodes */}
        {metrics.map((n, i) => (
          <g key={`m${i}`}>
            <circle cx={n.x} cy={n.y} r={n.r + 4} fill={C.teal} opacity="0.08" />
            <circle cx={n.x} cy={n.y} r={n.r} fill={C.teal} opacity="0.2" stroke={C.teal} strokeWidth="1" strokeOpacity="0.4" />
            <circle cx={n.x} cy={n.y} r={n.r * 0.45} fill={C.teal} opacity="0.5" />
            {n.label.includes("\n") ? n.label.split("\n").map((line, li) => (
              <text key={li} x={n.x} y={n.y + n.r + 10 + li * 10} textAnchor="middle"
                fontSize="7" fontFamily="DM Sans, sans-serif" fill={C.green} fontWeight="600">{line}</text>
            )) : (
              <text x={n.x} y={n.y + n.r + 12} textAnchor="middle"
                fontSize="7" fontFamily="DM Sans, sans-serif" fill={C.green} fontWeight="600">{n.label}</text>
            )}
          </g>
        ))}
        {/* Decision nodes (triangles) */}
        {decisions.map((d, i) => {
          const s = 14;
          const pts = `${d.x},${d.y - s} ${d.x - s * 0.9},${d.y + s * 0.6} ${d.x + s * 0.9},${d.y + s * 0.6}`;
          return (
            <g key={`d${i}`}>
              <polygon points={pts} fill={C.terra} opacity="0.25" stroke={C.terra} strokeWidth="0.8" strokeOpacity="0.5" />
              {d.label.split("\n").map((line, li) => (
                <text key={li} x={d.x} y={d.y + 22 + li * 10} textAnchor="middle"
                  fontSize="6.5" fontFamily="DM Sans, sans-serif" fill={C.terra} fontWeight="600">{line}</text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ── Simple disconnected visual ── */
const DisconnectedVisual = () => (
  <div style={{
    width: "100%", background: C.creamWarm, borderRadius: 12, padding: "28px 20px",
    position: "relative", border: `1px solid ${C.border}`,
  }}>
    <svg viewBox="0 0 400 160" style={{ width: "100%", height: "auto", display: "block" }}>
      {/* Dashed broken lines */}
      <line x1="80" y1="50" x2="170" y2="75" stroke={C.terra} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.3" />
      <line x1="320" y1="50" x2="230" y2="75" stroke={C.terra} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.3" />
      <line x1="80" y1="120" x2="170" y2="90" stroke={C.terra} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.3" />
      <line x1="320" y1="120" x2="230" y2="90" stroke={C.terra} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.3" />
      {/* X marks */}
      <text x="135" y="66" fontSize="10" fill={C.red} fontWeight="700">✕</text>
      <text x="255" y="66" fontSize="10" fill={C.red} fontWeight="700">✕</text>
      <text x="135" y="108" fontSize="10" fill={C.red} fontWeight="700">✕</text>
      <text x="255" y="108" fontSize="10" fill={C.red} fontWeight="700">✕</text>
      {/* Center text */}
      <text x="200" y="83" textAnchor="middle" fontSize="8" fontFamily="DM Sans, sans-serif" fill={C.textMuted} opacity="0.5">no shared context</text>
      {/* Nodes */}
      {[
        { x: 60, y: 42, label: "Sales DMS" },
        { x: 310, y: 42, label: "GRP / Reach" },
        { x: 50, y: 122, label: "Warehouse\nReports" },
        { x: 305, y: 122, label: "Retailer\nScheme Data" },
      ].map((n, i) => (
        <g key={i}>
          <rect x={n.x - 32} y={n.y - 12} width="64" height="24" rx="4" fill={C.white} stroke={C.border} strokeWidth="1" />
          {n.label.includes("\n") ? n.label.split("\n").map((l, li) => (
            <text key={li} x={n.x} y={n.y - 2 + li * 10} textAnchor="middle" fontSize="6.5" fontFamily="DM Sans, sans-serif" fill={C.textDark} fontWeight="500">{l}</text>
          )) : (
            <text x={n.x} y={n.y + 3} textAnchor="middle" fontSize="6.5" fontFamily="DM Sans, sans-serif" fill={C.textDark} fontWeight="500">{n.label}</text>
          )}
        </g>
      ))}
    </svg>
  </div>
);

/* ── Timeline bar ── */
const TimelineBar = ({ width, color, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
    <div style={{ fontSize: 12, fontFamily: sans, fontWeight: 600, color: C.textMuted, width: 80, textAlign: "right" }}>{label}</div>
    <div style={{ flex: 1, height: 28, background: C.border, borderRadius: 4, position: "relative", overflow: "hidden" }}>
      <div style={{
        width, height: "100%", background: color, borderRadius: 4,
        display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 10, minWidth: 60,
      }}>
        <span style={{ fontSize: 11, fontFamily: sans, fontWeight: 700, color: C.white }}>{value}</span>
      </div>
    </div>
  </div>
);

export default function CaseStudy() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="overflow-auto h-screen" style={{ background: C.offWhite, fontFamily: sans }}>

      {/* ═══ HERO ═══ */}
      <Section bg={C.green} dark style={{ padding: "100px 0 80px" }}>
        <FadeIn delay={0.1}><Tag color={C.sage}>CASE STUDY</Tag></FadeIn>
        <FadeIn delay={0.2}>
          <h1 style={{
            fontSize: "min(14vw, 130px)", fontFamily: serif, fontWeight: 600,
            color: C.terra, lineHeight: 0.9, margin: "16px 0 0", letterSpacing: -3,
          }}>30%</h1>
        </FadeIn>
        <FadeIn delay={0.35}>
          <H size={38} color={C.cream} style={{ fontWeight: 400, fontStyle: "italic", marginTop: 4 }}>behind target.</H>
        </FadeIn>
        <FadeIn delay={0.5}>
          <P color={C.sage} style={{ marginTop: 36 }}>
            An antacid brand discovers a ₹240 Cr revenue gap at their Q3 review.
            Two quarters left. Two very different ways to respond.
          </P>
        </FadeIn>
        <FadeIn delay={0.7}>
          <div style={{
            marginTop: 60, paddingTop: 16, borderTop: `1px solid rgba(133,163,131,0.1)`,
            fontSize: 12, color: C.sage, letterSpacing: 2,
          }}>QUESTT</div>
        </FadeIn>
      </Section>

      {/* ═══ THE SCENE ═══ */}
      <Section bg={C.green} dark style={{ padding: "56px 0" }}>
        <FadeIn><Tag color={C.sage}>THE SCENE</Tag></FadeIn>
        <FadeIn delay={0.08}><H size={36} color={C.cream} style={{ marginTop: 12 }}>Monday morning. Q3 review.</H></FadeIn>
        <div style={{ display: "flex", gap: 48, marginTop: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
          <FadeIn delay={0.15} style={{ flex: "1 1 380px" }}>
            <P color="rgba(231,221,202,0.7)">
              The Brand Manager walks into the quarterly review. Regional heads, trade marketing, supply chain — everyone's there. The first slide goes up.
            </P>
            <p style={{ fontSize: 19, fontFamily: serif, fontWeight: 600, color: C.terra, margin: "20px 0 0", lineHeight: 1.5 }}>
              Revenue is 30% behind the annual target.
            </p>
            <P color="rgba(231,221,202,0.55)" style={{ marginTop: 16 }}>
              The CEO:{" "}
              <em style={{ color: C.cream, fontFamily: serif }}>"What's the plan to recover?"</em>
            </P>
          </FadeIn>
          <FadeIn delay={0.3} direction="left">
            <div style={{
              width: 190, background: "rgba(22,53,36,0.5)",
              borderLeft: `2px solid ${C.terra}`, padding: "24px 20px",
            }}>
              <div style={{ fontSize: 32, fontFamily: serif, fontWeight: 600, color: C.terra }}>₹240 Cr</div>
              <div style={{ fontSize: 12, color: C.sage, marginTop: 6, lineHeight: 1.5 }}>revenue gap to annual target</div>
              <div style={{
                fontSize: 11, color: "rgba(231,221,202,0.4)", marginTop: 12,
                fontStyle: "italic", paddingTop: 10, borderTop: "1px solid rgba(133,163,131,0.08)",
              }}>Only 2 quarters left</div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ═══ TWO PATHS ═══ */}
      <Section bg={C.green} dark style={{ padding: "48px 0 56px" }}>
        <FadeIn><H size={40} color={C.cream}>Two paths forward.</H></FadeIn>
        <div style={{ display: "flex", gap: 16, marginTop: 36, flexWrap: "wrap" }}>
          {[
            { n: "01", label: "Business as usual", color: C.terra, desc: "4 teams pull data independently. 6 weeks to a plan stitched together on instinct." },
            { n: "02", label: "With Questt", color: C.sage, desc: "One question into the Intelligence Warehouse. Connected diagnosis and strategy the same day." },
          ].map((card, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.12} direction={i === 0 ? "left" : "right"}>
              <div style={{
                width: 320, padding: "24px 22px",
                borderTop: `2px solid ${card.color}`, background: "rgba(22,53,36,0.35)",
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: card.color, letterSpacing: 1 }}>{card.n}</span>
                <div style={{ fontSize: 20, fontFamily: serif, fontWeight: 600, color: C.cream, marginTop: 6 }}>{card.label}</div>
                <div style={{ fontSize: 13, color: C.sage, marginTop: 8, lineHeight: 1.6 }}>{card.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ═══ APPROACH 1 HEADER ═══ */}
      <Section bg={C.creamWarm} style={{ padding: "56px 0 48px" }}>
        <FadeIn>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.terra, letterSpacing: 1 }}>01</span>
        </FadeIn>
        <FadeIn delay={0.08}><H size={42} color={C.green} style={{ marginTop: 6 }}>Business as usual.</H></FadeIn>
        <FadeIn delay={0.18}>
          <div style={{ marginTop: 28, display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 340px" }}><DisconnectedVisual /></div>
            <P color={C.textMid} style={{ flex: "1 1 280px" }}>
              Sales exports DMS data from one portal. Marketing pulls GRP numbers from another.
              Supply chain gets warehouse reports over email. Trade team logs into a different system for scheme redemption.
              Nobody sees the full picture. The brand manager waits for all four, then makes a call.
            </P>
          </div>
        </FadeIn>
      </Section>

      {/* ═══ WEEK 1-2 ═══ */}
      <Section bg={C.offWhite} style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.terra}>WEEK 1–2</Tag></FadeIn>
        <FadeIn delay={0.06}><H size={32} color={C.green} style={{ marginTop: 10 }}>The data scramble.</H></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 28 }}>
          {[
            { title: "Sales pulls DMS data", desc: "Regional teams export sell-out from 3 different portals. Two days spent just reconciling formats before anyone can read the numbers." },
            { title: "Marketing reviews campaigns", desc: "GRP and reach pulled from media agency reports. No overlay with sales geography — nobody checks if spend aligns with where the gap is." },
            { title: "Supply chain audits stock", desc: "Warehouse reports emailed as Excel attachments. By the time they're compiled, inventory positions are 10 days stale." },
            { title: "Trade pulls scheme data", desc: "Retailer redemption sits in the distributor management system. Nobody's checked if the current chemist channel offer is actually moving product." },
          ].map((c, i) => (
            <FadeIn key={i} delay={0.08 + i * 0.06}>
              <div style={{
                background: C.white, borderLeft: `2px solid ${C.terra}`,
                padding: "16px 14px", height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.green }}>{c.title}</div>
                <div style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, marginTop: 6 }}>{c.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.35}>
          <div style={{ marginTop: 20, fontSize: 12.5, color: C.red, fontStyle: "italic" }}>
            2 weeks gone. Still no diagnosis — just raw data in 4 different formats across 4 teams.
          </div>
        </FadeIn>
      </Section>

      {/* ═══ WEEK 3-4 ═══ */}
      <Section bg={C.offWhite} style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.terra}>WEEK 3–4</Tag></FadeIn>
        <FadeIn delay={0.06}><H size={32} color={C.green} style={{ marginTop: 10 }}>Strategy in silos.</H></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 28 }}>
          {[
            { team: "Sales Team", rec: '"Push harder in underperforming territories. Increase distributor visit frequency from 3x to 5x/week."', blind: "No visibility into why those territories dropped — competitor trade scheme? stockout? both?" },
            { team: "Marketing Team", rec: '"Increase media spend by 20% in Q4. Launch a new consumer promo on antacid sachets."', blind: "Spend increase is national, but the gap is concentrated in 3 states. Media money spread thin." },
            { team: "Supply Chain", rec: '"Stock levels look fine at national level. No action needed from our side."', blind: "Missed that 2 key SKUs are understocked in exactly the 3 problem states." },
          ].map((c, i) => (
            <FadeIn key={i} delay={0.08 + i * 0.07}>
              <div style={{
                background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                overflow: "hidden", height: "100%", display: "flex", flexDirection: "column",
              }}>
                <div style={{ background: C.terraBg, padding: "10px 14px", fontSize: 11, fontWeight: 600, color: C.terra, letterSpacing: 0.5 }}>
                  {c.team}
                </div>
                <div style={{ padding: "14px", flex: 1 }}>
                  <div style={{ fontSize: 13, color: C.textDark, fontStyle: "italic", lineHeight: 1.55, fontFamily: serif, fontWeight: 400 }}>
                    {c.rec}
                  </div>
                  <div style={{
                    marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.border}`,
                    fontSize: 12, color: C.red, display: "flex", gap: 5, alignItems: "flex-start", lineHeight: 1.5,
                  }}>
                    <span style={{ flexShrink: 0 }}>✕</span>{c.blind}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.35}>
          <div style={{ marginTop: 20, fontSize: 12.5, color: C.red, fontStyle: "italic" }}>
            4 weeks gone. Three disconnected plans, each optimizing for its own function.
          </div>
        </FadeIn>
      </Section>

      {/* ═══ TRAD OUTCOME ═══ */}
      <Section bg={C.green} dark style={{ padding: "56px 0" }}>
        <FadeIn><H size={32} color={C.cream} style={{ fontWeight: 400, fontStyle: "italic" }}>"Let's try this and see."</H></FadeIn>
        <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
          {[
            { stat: "6 weeks", label: "from discovery to action" },
            { stat: "3 plans", label: "stitched manually in one meeting" },
            { stat: "0 scenarios", label: "tested before committing budget" },
            { stat: "No audit trail", label: "if the plan doesn't work" },
          ].map((s, i) => (
            <FadeIn key={i} delay={0.08 + i * 0.06}>
              <div style={{ width: 155, borderTop: `2px solid ${C.terra}`, paddingTop: 16 }}>
                <div style={{ fontSize: 22, fontFamily: serif, fontWeight: 600, color: C.terra }}>{s.stat}</div>
                <div style={{ fontSize: 12, color: C.sage, marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ═══ APPROACH 2 HEADER + IW VISUAL ═══ */}
      <Section bg={C.creamWarm} style={{ padding: "56px 0 48px" }}>
        <FadeIn>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.sage, letterSpacing: 1 }}>02</span>
        </FadeIn>
        <FadeIn delay={0.08}><H size={42} color={C.green} style={{ marginTop: 6 }}>With Questt.</H></FadeIn>
        <FadeIn delay={0.15}>
          <P color={C.textMid} style={{ marginTop: 12 }}>
            The Intelligence Warehouse already connects SKU hierarchies, distributor networks, media spend,
            trade schemes, and inventory positions into a single knowledge graph. When the brand manager asks a question,
            Questt reasons across all of it simultaneously.
          </P>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div style={{ marginTop: 28 }}>
            <KnowledgeGraph />
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 8, fontStyle: "italic" }}>
              Business Knowledge Graph — SKUs, regions, channels, metrics, and decisions connected in real time
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ═══ THE QUESTION ═══ */}
      <Section bg={C.green} dark style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.sage}>THE MOMENT</Tag></FadeIn>
        <FadeIn delay={0.08}><H size={32} color={C.cream} style={{ marginTop: 10 }}>Same meeting. One question.</H></FadeIn>
        <FadeIn delay={0.18}>
          <div style={{
            marginTop: 24, background: "rgba(22,53,36,0.5)",
            borderLeft: `2px solid ${C.sage}`, padding: "22px 20px", maxWidth: 640,
          }}>
            <div style={{ fontSize: 18, fontFamily: serif, fontStyle: "italic", color: C.cream, lineHeight: 1.5 }}>
              "Why are we 30% behind target, and what's the optimal recovery plan for Q3–Q4?"
            </div>
            <div style={{ fontSize: 11, color: C.sage, marginTop: 10 }}>— Brand Manager, typed into Questt</div>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ display: "flex", gap: 6, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}>
            {["Diagnose", "Connect", "Strategize", "Simulate"].map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  padding: "8px 14px", background: "rgba(22,53,36,0.5)",
                  fontSize: 12, fontWeight: 600, color: C.sage,
                }}>{step}</div>
                {i < 3 && <span style={{ color: C.sage, opacity: 0.3, fontSize: 13 }}>→</span>}
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* ═══ CONNECTED DIAGNOSIS ═══ */}
      <Section bg={C.offWhite} style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.greenMid}>CONNECTED DIAGNOSIS</Tag></FadeIn>
        <FadeIn delay={0.06}><H size={32} color={C.green} style={{ marginTop: 10 }}>Every dimension, simultaneously.</H></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 28 }}>
          {[
            { name: "Sales", insight: "60% of the shortfall is concentrated in UP, MP, and Rajasthan — distributor fill rates dropped 18% after a competitor launched a ₹2/strip trade incentive last month." },
            { name: "Marketing", insight: "Media spend was 70% front-loaded in Q1. In those 3 states, competitor SOV flipped from 35% to 52% since July. Brand's current SOV in the gap states: 38%." },
            { name: "Trade", insight: "Chemist channel trade scheme has 12% redemption vs 45% in general trade. Antacids over-index 4x in chemist. The scheme structure doesn't fit the channel." },
            { name: "Supply Chain", insight: "Rantac 150mg and DigeePro sachet are 23% understocked in UP and MP warehouses. Allocation model hasn't recalculated since Q2 demand patterns." },
          ].map((c, i) => (
            <FadeIn key={i} delay={0.08 + i * 0.06}>
              <div style={{
                background: C.white, borderLeft: `2px solid ${C.sage}`,
                padding: "16px 14px", height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.sage, letterSpacing: 0.5 }}>{c.name}</div>
                <div style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, marginTop: 6 }}>{c.insight}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.35}>
          <div style={{ marginTop: 20, fontSize: 12.5, color: C.greenText, fontStyle: "italic" }}>
            Minutes, not weeks. Connected across sales, marketing, trade, and supply chain in a single pass.
          </div>
        </FadeIn>
      </Section>

      {/* ═══ UNIFIED STRATEGY ═══ */}
      <Section bg={C.offWhite} style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.greenMid}>UNIFIED STRATEGY</Tag></FadeIn>
        <FadeIn delay={0.06}><H size={32} color={C.green} style={{ marginTop: 10 }}>One recovery plan. Four functions coordinated.</H></FadeIn>
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 8, maxWidth: 700 }}>
          {[
            { n: "01", action: "Shift 60% of remaining media budget from national TV to geo-targeted digital in UP, MP, Rajasthan", impact: "+8% projected revenue recovery", tag: "Marketing" },
            { n: "02", action: "Replace flat ₹50/carton chemist scheme with ₹2/strip incentive matching competitor structure", impact: "+5% recovery from 3x improved redemption", tag: "Trade" },
            { n: "03", action: "Emergency reallocation of Rantac 150mg and DigeePro to UP/MP warehouses within 7 days", impact: "Unblocks ₹18 Cr constrained demand", tag: "Supply Chain" },
            { n: "04", action: "Targeted distributor incentive in 340 competitor-overlap beats across 3 states", impact: "+4% recovery from fill rate improvement", tag: "Sales" },
          ].map((s, i) => (
            <FadeIn key={i} delay={0.08 + i * 0.06}>
              <div style={{
                background: C.white, borderLeft: `2px solid ${C.sage}`,
                padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: 10,
                boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.sage, flexShrink: 0, marginTop: 1 }}>{s.n}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.green, lineHeight: 1.4 }}>{s.action}</div>
                  <div style={{ fontSize: 12, color: C.greenText, marginTop: 2 }}>{s.impact}</div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600, color: C.sage, background: C.sageDim,
                  padding: "3px 8px", flexShrink: 0, alignSelf: "center",
                }}>{s.tag}</span>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.35}>
          <div style={{
            marginTop: 10, background: C.green, padding: "11px 14px", maxWidth: 700,
            fontSize: 12, fontWeight: 600, color: C.sage,
          }}>
            Projected recovery: +17–22% of the 30% gap &nbsp;·&nbsp; Every data point and assumption auditable
          </div>
        </FadeIn>
      </Section>

      {/* ═══ WHAT-IF ═══ */}
      <Section bg={C.green} dark style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.sage}>WHAT-IF</Tag></FadeIn>
        <FadeIn delay={0.06}><H size={32} color={C.cream} style={{ marginTop: 10 }}>Test before you commit.</H></FadeIn>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8, maxWidth: 680 }}>
          {[
            { q: "What if I only increase media spend but don't change the chemist trade scheme?", a: "Recovery drops to +11%. Chemist channel keeps underperforming — ₹35 Cr of potential stays locked." },
            { q: "What if we can't get stock to UP/MP warehouses within 7 days?", a: "14-day delivery costs ₹6 Cr of the recovery window. Recommend prioritizing Rantac 150mg only for the 7-day shipment — it covers 65% of the constrained demand." },
            { q: "Can we redirect the national TV campaign budget to digital in those 3 states?", a: "Yes. Geo-targeted digital in UP/MP/Rajasthan delivers 2.3x ROI vs national TV for antacid category. ₹4.2 Cr reallocation recommended." },
          ].map((c, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.07}>
              <div style={{ background: "rgba(22,53,36,0.35)", display: "flex", overflow: "hidden" }}>
                <div style={{
                  width: 32, flexShrink: 0, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 8,
                  background: "rgba(22,53,36,0.5)", padding: "10px 0",
                }}>
                  <span style={{ fontSize: 11, fontFamily: serif, fontWeight: 600, color: C.sage }}>Q</span>
                  <span style={{ fontSize: 11, fontFamily: serif, fontWeight: 600, color: C.cream }}>A</span>
                </div>
                <div style={{ padding: "10px 14px" }}>
                  <div style={{ fontSize: 12.5, fontStyle: "italic", color: C.cream, lineHeight: 1.5 }}>"{c.q}"</div>
                  <div style={{ fontSize: 12.5, color: C.sage, lineHeight: 1.55, marginTop: 5 }}>{c.a}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div style={{ marginTop: 18, fontSize: 11, color: "rgba(133,163,131,0.45)", fontStyle: "italic" }}>
            Every answer traceable. Every assumption auditable.
          </div>
        </FadeIn>
      </Section>

      {/* ═══ CONTRAST ═══ */}
      <Section bg={C.creamWarm} style={{ padding: "56px 0 64px" }}>
        <FadeIn><H size={36} color={C.green}>Same problem. Different outcomes.</H></FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ marginTop: 32, maxWidth: 520 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: 1, marginBottom: 6 }}>TIME TO ACTION</div>
            <TimelineBar width="100%" color={C.terra} label="Traditional" value="6 weeks" />
            <TimelineBar width="3%" color={C.green} label="Questt" value="1 day" />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 40, maxWidth: 720 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 2.5fr", gap: 2, marginBottom: 2 }}>
              <div />
              <div style={{ background: C.redBg, padding: "9px 12px", fontSize: 11, fontWeight: 600, color: C.red, textAlign: "center" }}>Traditional</div>
              <div style={{ background: C.greenBg, padding: "9px 12px", fontSize: 11, fontWeight: 600, color: C.greenText, textAlign: "center" }}>With Questt</div>
            </div>
            {[
              { dim: "Root cause", trad: "Surface-level, single team's view", q: "Multi-dimensional across 4 functions" },
              { dim: "Strategy", trad: "3 plans stitched in a meeting", q: "1 coordinated plan, 4 actions" },
              { dim: "Scenario testing", trad: "None", q: "Conversational what-if with ₹ impact" },
              { dim: "Confidence", trad: "Gut feel + seniority", q: "Data-backed with projected recovery %" },
              { dim: "Accountability", trad: "Blame game if it fails", q: "Every assumption documented" },
            ].map((r, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "2fr 2.5fr 2.5fr", gap: 2, marginBottom: 2,
              }}>
                <div style={{ padding: "10px 12px", fontSize: 12.5, fontWeight: 600, color: C.green, background: C.white }}>{r.dim}</div>
                <div style={{ padding: "10px 12px", fontSize: 12.5, color: C.textMid, textAlign: "center", background: C.white }}>{r.trad}</div>
                <div style={{ padding: "10px 12px", fontSize: 12.5, fontWeight: 600, color: C.green, textAlign: "center", background: C.white }}>{r.q}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        {/* Quiet close */}
        <FadeIn delay={0.35}>
          <div style={{
            marginTop: 48, paddingTop: 16, borderTop: `1px solid ${C.border}`,
            fontSize: 14, fontFamily: sans, fontWeight: 600, color: C.green, letterSpacing: 1,
          }}>questt<span style={{ color: C.sage }}>.</span></div>
        </FadeIn>
      </Section>
    </div>
  );
}

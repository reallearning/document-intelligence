"use client";
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
  <section style={{ background: bg, padding: "64px 0", position: "relative", overflow: "hidden", color: dark ? C.cream : C.green, ...style }}>
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

/* ── Source chip ── */
const Src = ({ children }) => (
  <span style={{ display: "inline-block", fontSize: 9, fontWeight: 600, color: C.teal, background: C.tealLight, padding: "2px 6px", borderRadius: 3, marginRight: 3, marginTop: 3 }}>{children}</span>
);

/* ── Trail connector ── */
const TrailConnector = ({ label }) => (
  <FadeIn delay={0.04}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0 8px 18px" }}>
      <div style={{ width: 1, height: 20, background: C.sageLine }} />
      <div style={{ fontSize: 11, fontWeight: 600, color: C.sage, fontStyle: "italic", letterSpacing: 0.3 }}>{label}</div>
    </div>
  </FadeIn>
);

/* ── Knowledge Graph ── */
const KnowledgeGraph = () => {
  const metrics = [
    { x: 140, y: 65, r: 22, label: "Secondary\nSales" },
    { x: 370, y: 45, r: 26, label: "Beat\nProductivity" },
    { x: 620, y: 60, r: 22, label: "Revenue\n/ Route" },
    { x: 90, y: 220, r: 18, label: "Cooler\nUptime" },
    { x: 500, y: 250, r: 22, label: "Scheme\nRedemption" },
    { x: 300, y: 290, r: 20, label: "Fill\nRate" },
    { x: 720, y: 200, r: 18, label: "Visit\nCompliance" },
    { x: 200, y: 310, r: 16, label: "Dispatch\nRate" },
  ];
  const entities = [
    { x: 55, y: 115, r: 10, label: "DMS" }, { x: 140, y: 155, r: 9, label: "Distributor" },
    { x: 250, y: 110, r: 12, label: "SKU" }, { x: 350, y: 120, r: 9, label: "Pack Size" },
    { x: 300, y: 170, r: 10, label: "Beat" }, { x: 210, y: 195, r: 8, label: "Route" },
    { x: 460, y: 125, r: 11, label: "Territory" }, { x: 560, y: 145, r: 9, label: "ASM Area" },
    { x: 670, y: 130, r: 10, label: "Salesman" }, { x: 410, y: 185, r: 9, label: "Cooler" },
    { x: 130, y: 280, r: 8, label: "Warehouse" }, { x: 230, y: 255, r: 9, label: "Plant" },
    { x: 490, y: 170, r: 8, label: "Nielsen" }, { x: 620, y: 225, r: 9, label: "ASM" },
    { x: 740, y: 270, r: 8, label: "Region" }, { x: 50, y: 270, r: 7, label: "Prod Line" },
    { x: 430, y: 290, r: 8, label: "Scheme" }, { x: 280, y: 40, r: 8, label: "Brand" },
    { x: 530, y: 80, r: 8, label: "Channel" }, { x: 160, y: 35, r: 7, label: "Price Pt" },
    { x: 680, y: 290, r: 7, label: "Incentive" }, { x: 370, y: 225, r: 8, label: "Season" },
  ];
  const decisions = [
    { x: 80, y: 38, label: "Route\nPlanning" }, { x: 750, y: 50, label: "Scheme\nDesign" },
    { x: 45, y: 330, label: "Production\nAlloc" }, { x: 680, y: 330, label: "Cooler\nDeploy" },
    { x: 450, y: 40, label: "Pack Mix\nDecision" },
  ];
  const edges = [
    [250,110,140,65],[250,110,370,45],[250,110,350,120],[250,110,300,170],
    [350,120,370,45],[370,45,460,125],[460,125,560,145],[460,125,620,60],
    [560,145,670,130],[620,60,670,130],[140,65,140,155],[140,155,55,115],
    [210,195,140,65],[210,195,300,170],[90,220,130,280],[90,220,140,155],
    [230,255,90,220],[230,255,250,110],[410,185,300,170],[410,185,370,45],
    [490,170,460,125],[490,170,500,250],[500,250,620,225],[620,225,740,270],
    [300,290,430,290],[300,290,230,255],[430,290,500,250],[50,270,90,220],
    [250,110,280,40],[620,60,620,225],[530,80,460,125],[530,80,620,60],
    [160,35,140,65],[160,35,250,110],[670,130,720,200],[720,200,680,290],
    [370,225,300,290],[370,225,410,185],[130,280,200,310],[200,310,300,290],
  ];
  return (
    <div style={{ width: "100%", background: C.creamWarm, borderRadius: 12, padding: "20px 16px", border: `1px solid ${C.border}` }}>
      <svg viewBox="0 0 800 360" style={{ width: "100%", height: "auto", display: "block" }}>
        {edges.map(([x1,y1,x2,y2], i) => <line key={`e${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.sage} strokeWidth="0.6" opacity="0.25" />)}
        {entities.map((n, i) => (
          <g key={`en${i}`}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={C.sage} opacity="0.15" stroke={C.sage} strokeWidth="0.5" strokeOpacity="0.3" />
            <text x={n.x} y={n.y + 0.5} textAnchor="middle" dominantBaseline="middle" fontSize="5.5" fontFamily="DM Sans, sans-serif" fill={C.textMid} fontWeight="500">{n.label}</text>
          </g>
        ))}
        {metrics.map((n, i) => (
          <g key={`m${i}`}>
            <circle cx={n.x} cy={n.y} r={n.r + 4} fill={C.teal} opacity="0.08" />
            <circle cx={n.x} cy={n.y} r={n.r} fill={C.teal} opacity="0.2" stroke={C.teal} strokeWidth="1" strokeOpacity="0.4" />
            <circle cx={n.x} cy={n.y} r={n.r * 0.45} fill={C.teal} opacity="0.5" />
            {n.label.split("\n").map((line, li) => (
              <text key={li} x={n.x} y={n.y + n.r + 10 + li * 10} textAnchor="middle" fontSize="7" fontFamily="DM Sans, sans-serif" fill={C.green} fontWeight="600">{line}</text>
            ))}
          </g>
        ))}
        {decisions.map((d, i) => {
          const s = 14;
          return (
            <g key={`d${i}`}>
              <polygon points={`${d.x},${d.y-s} ${d.x-s*0.9},${d.y+s*0.6} ${d.x+s*0.9},${d.y+s*0.6}`} fill={C.terra} opacity="0.25" stroke={C.terra} strokeWidth="0.8" strokeOpacity="0.5" />
              {d.label.split("\n").map((line, li) => (
                <text key={li} x={d.x} y={d.y + 22 + li * 10} textAnchor="middle" fontSize="6.5" fontFamily="DM Sans, sans-serif" fill={C.terra} fontWeight="600">{line}</text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ── Disconnected visual ── */
const DisconnectedVisual = () => (
  <div style={{ width: "100%", background: C.creamWarm, borderRadius: 12, padding: "24px 16px", border: `1px solid ${C.border}` }}>
    <svg viewBox="0 0 440 200" style={{ width: "100%", height: "auto", display: "block" }}>
      {[[75,45,160,80],[340,45,255,80],[75,120,160,90],[340,120,255,90],[75,160,160,130],[340,160,255,130]].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.terra} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.3" />
      ))}
      {[[128,65],[268,65],[128,108],[268,108],[128,148],[268,148]].map(([x,y], i) => (
        <text key={i} x={x} y={y} fontSize="10" fill={C.red} fontWeight="700">{"\u2715"}</text>
      ))}
      <text x="205" y="100" textAnchor="middle" fontSize="7.5" fontFamily="DM Sans, sans-serif" fill={C.textMuted} opacity="0.5">no shared context</text>
      {[{x:55,y:40,label:"DMS"},{x:345,y:40,label:"SFA Logs"},{x:55,y:115,label:"Warehouse\nDispatch"},{x:345,y:115,label:"Scheme\nLedger"},{x:55,y:157,label:"Cooler\nRecords"},{x:345,y:157,label:"Nielsen\nAudit"}].map((n, i) => (
        <g key={i}>
          <rect x={n.x-36} y={n.y-13} width="72" height={n.label.includes("\n")?28:24} rx="4" fill={C.white} stroke={C.border} strokeWidth="1" />
          {n.label.includes("\n") ? n.label.split("\n").map((l,li)=>(
            <text key={li} x={n.x} y={n.y-3+li*11} textAnchor="middle" fontSize="6.5" fontFamily="DM Sans, sans-serif" fill={C.textDark} fontWeight="500">{l}</text>
          )) : <text x={n.x} y={n.y+3} textAnchor="middle" fontSize="6.5" fontFamily="DM Sans, sans-serif" fill={C.textDark} fontWeight="500">{n.label}</text>}
        </g>
      ))}
    </svg>
  </div>
);

const TimelineBar = ({ width, color, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
    <div style={{ fontSize: 12, fontFamily: sans, fontWeight: 600, color: C.textMuted, width: 80, textAlign: "right" }}>{label}</div>
    <div style={{ flex: 1, height: 28, background: C.border, borderRadius: 4, overflow: "hidden" }}>
      <div style={{ width, height: "100%", background: color, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 10, minWidth: 60 }}>
        <span style={{ fontSize: 11, fontFamily: sans, fontWeight: 700, color: C.white }}>{value}</span>
      </div>
    </div>
  </div>
);

/* ── Trail step component ── */
const TrailStep = ({ n, question, finding, sources, delay = 0 }) => (
  <FadeIn delay={delay}>
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 28 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", background: C.green, color: C.sage,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, fontFamily: sans,
        }}>{n}</div>
        <div style={{ width: 1, flex: 1, minHeight: 20, background: C.sageLine, marginTop: 4 }} />
      </div>
      <div style={{ background: C.white, borderLeft: `2px solid ${C.sage}`, padding: "14px 16px", flex: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.03)", marginBottom: 4 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.green, fontStyle: "italic", marginBottom: 6 }}>{question}</div>
        <div style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6 }}>{finding}</div>
        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap" }}>
          {sources.map((s, i) => <Src key={i}>{s}</Src>)}
        </div>
      </div>
    </div>
  </FadeIn>
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
          <h1 style={{ fontSize: "min(14vw, 130px)", fontFamily: serif, fontWeight: 600, color: C.terra, lineHeight: 0.9, margin: "16px 0 0", letterSpacing: -3 }}>22%</h1>
        </FadeIn>
        <FadeIn delay={0.35}>
          <H size={38} color={C.cream} style={{ fontWeight: 400, fontStyle: "italic", marginTop: 4 }}>behind summer volume target.</H>
        </FadeIn>
        <FadeIn delay={0.5}>
          <P color={C.sage} style={{ marginTop: 36 }}>
            February. Pre-season review. Secondary sales are declining across rural territory,
            distributor fill rates are dropping, and a challenger brand is gaining ground
            with aggressive pricing and higher retailer margins. Peak season is 8 weeks away.
          </P>
        </FadeIn>
        <FadeIn delay={0.7}>
          <div style={{ marginTop: 60, paddingTop: 16, borderTop: "1px solid rgba(133,163,131,0.1)", fontSize: 12, color: C.sage, letterSpacing: 2 }}>QUESTT</div>
        </FadeIn>
      </Section>

      {/* ═══ TWO PATHS ═══ */}
      <Section bg={C.green} dark style={{ padding: "48px 0 56px" }}>
        <FadeIn><H size={40} color={C.cream}>Two paths forward.</H></FadeIn>
        <div style={{ display: "flex", gap: 16, marginTop: 36, flexWrap: "wrap" }}>
          {[
            { n: "01", label: "Business as usual", color: C.terra, desc: "4 teams pull data independently. 5 weeks to a plan stitched together on instinct. Blanket scheme increase across the state." },
            { n: "02", label: "With Questt", color: C.sage, desc: "One question into the Intelligence Warehouse. An agent traverses the entire knowledge graph, pulls every thread, and builds a decision trail in minutes." },
          ].map((card, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.12} direction={i === 0 ? "left" : "right"}>
              <div style={{ width: 340, padding: "24px 22px", borderTop: `2px solid ${card.color}`, background: "rgba(22,53,36,0.35)" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: card.color, letterSpacing: 1 }}>{card.n}</span>
                <div style={{ fontSize: 20, fontFamily: serif, fontWeight: 600, color: C.cream, marginTop: 6 }}>{card.label}</div>
                <div style={{ fontSize: 13, color: C.sage, marginTop: 8, lineHeight: 1.6 }}>{card.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ═══ APPROACH 1 ═══ */}
      <Section bg={C.creamWarm} style={{ padding: "56px 0 48px" }}>
        <FadeIn><span style={{ fontSize: 13, fontWeight: 600, color: C.terra, letterSpacing: 1 }}>01</span></FadeIn>
        <FadeIn delay={0.08}><H size={42} color={C.green} style={{ marginTop: 6 }}>Business as usual.</H></FadeIn>
        <FadeIn delay={0.18}>
          <div style={{ marginTop: 28, display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 340px" }}><DisconnectedVisual /></div>
            <P color={C.textMid} style={{ flex: "1 1 280px" }}>
              DMS secondary sales in one system. SFA visit logs in another. Warehouse dispatch
              over email. Scheme ledger in the distributor portal. Cooler deployment records
              on paper. Nielsen retail audit arrives quarterly. Six systems. No joins.
              The territory head waits for all of them, then makes a call.
            </P>
          </div>
        </FadeIn>
      </Section>

      {/* ═══ WEEK 1-2 ═══ */}
      <Section bg={C.offWhite} style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.terra}>WEEK 1{"\u2013"}2</Tag></FadeIn>
        <FadeIn delay={0.06}><H size={32} color={C.green} style={{ marginTop: 10 }}>The data scramble.</H></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 28 }}>
          {[
            { title: "Sales pulls DMS data", desc: "ASMs export secondary sales from each territory. Different formats, different periods. Two days spent reconciling before anyone can compare." },
            { title: "Trade checks schemes", desc: "Scheme redemption in the distributor ledger. Nobody has cross-referenced which schemes are running in declining beats vs. healthy ones." },
            { title: "Supply chain audits stock", desc: "Warehouse dispatch emailed as Excel. Still on last summer's allocation model. Nobody's checked dispatch vs. where demand is actually shifting." },
            { title: "Field team reviews coverage", desc: "SFA visit logs exist but nobody's connected them to the decline pattern. Cooler audit data is 6 weeks old." },
          ].map((c, i) => (
            <FadeIn key={i} delay={0.08 + i * 0.06}>
              <div style={{ background: C.white, borderLeft: `2px solid ${C.terra}`, padding: "16px 14px", height: "100%", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.green }}>{c.title}</div>
                <div style={{ fontSize: 12.5, color: C.textMid, lineHeight: 1.6, marginTop: 6 }}>{c.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.35}><div style={{ marginTop: 20, fontSize: 12.5, color: C.red, fontStyle: "italic" }}>2 weeks gone. Still no diagnosis. Just raw data in 4 formats across 4 teams.</div></FadeIn>
      </Section>

      {/* ═══ WEEK 3-5 ═══ */}
      <Section bg={C.offWhite} style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.terra}>WEEK 3{"\u2013"}5</Tag></FadeIn>
        <FadeIn delay={0.06}><H size={32} color={C.green} style={{ marginTop: 10 }}>Strategy in silos.</H></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 28 }}>
          {[
            { team: "Sales Team", rec: '"Push harder. Increase visit frequency. Add \u20B92/case distributor incentive."', blind: "No visibility into why those territories declined. Some dropped because the salesman changed. Those don't need more visits from a stranger." },
            { team: "Trade Marketing", rec: '"Increase retailer scheme from \u20B98/case to \u20B914/case across the state."', blind: "Blanket increase when the decline is concentrated in specific beats. And the scheme is per-case on large packs but the battle is per-bottle on \u20B910 packs. Wrong format." },
            { team: "Supply Chain", rec: '"Stock looks fine at state level. No action from our side."', blind: "Missed that non-cola SKUs are understocked in exactly the declining territories. The challenger has no juice or water product. These are the stickiest SKUs." },
          ].map((c, i) => (
            <FadeIn key={i} delay={0.08 + i * 0.07}>
              <div style={{ background: C.white, boxShadow: "0 1px 3px rgba(0,0,0,0.03)", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ background: C.terraBg, padding: "10px 14px", fontSize: 11, fontWeight: 600, color: C.terra, letterSpacing: 0.5 }}>{c.team}</div>
                <div style={{ padding: "14px", flex: 1 }}>
                  <div style={{ fontSize: 13, color: C.textDark, fontStyle: "italic", lineHeight: 1.55, fontFamily: serif, fontWeight: 400 }}>{c.rec}</div>
                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.border}`, fontSize: 12, color: C.red, display: "flex", gap: 5, alignItems: "flex-start", lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0 }}>{"\u2715"}</span>{c.blind}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.35}><div style={{ marginTop: 20, fontSize: 12.5, color: C.red, fontStyle: "italic" }}>5 weeks gone. Three disconnected plans, each optimizing for its own function.</div></FadeIn>
      </Section>

      {/* ═══ TRAD OUTCOME ═══ */}
      <Section bg={C.green} dark style={{ padding: "56px 0" }}>
        <FadeIn><H size={32} color={C.cream} style={{ fontWeight: 400, fontStyle: "italic" }}>"Match their margin and push harder."</H></FadeIn>
        <div style={{ display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap" }}>
          {[
            { stat: "5 weeks", label: "from discovery to action" },
            { stat: "3 plans", label: "stitched manually in one meeting" },
            { stat: "0 scenarios", label: "tested before committing budget" },
            { stat: "No audit trail", label: "if summer still misses" },
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

      {/* ═══ APPROACH 2 + IW ═══ */}
      <Section bg={C.creamWarm} style={{ padding: "56px 0 48px" }}>
        <FadeIn><span style={{ fontSize: 13, fontWeight: 600, color: C.sage, letterSpacing: 1 }}>02</span></FadeIn>
        <FadeIn delay={0.08}><H size={42} color={C.green} style={{ marginTop: 6 }}>With Questt.</H></FadeIn>
        <FadeIn delay={0.15}>
          <P color={C.textMid} style={{ marginTop: 12 }}>
            The Intelligence Warehouse connects every operational system into a single knowledge graph.
            An agent traverses the graph, pulling each thread to its source, and builds a decision trail
            where each finding triggers the next question.
          </P>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div style={{ marginTop: 28 }}>
            <KnowledgeGraph />
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 8, fontStyle: "italic" }}>
              Business Knowledge Graph. The agent traverses every connection to build the full picture
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ═══ THE QUESTION ═══ */}
      <Section bg={C.green} dark style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.sage}>THE QUESTION</Tag></FadeIn>
        <FadeIn delay={0.18}>
          <div style={{ marginTop: 16, background: "rgba(22,53,36,0.5)", borderLeft: `2px solid ${C.sage}`, padding: "22px 20px", maxWidth: 640 }}>
            <div style={{ fontSize: 18, fontFamily: serif, fontStyle: "italic", color: C.cream, lineHeight: 1.5 }}>
              "Why are we 22% behind target, and what's the optimal recovery plan for summer?"
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* ═══ DECISION TRAIL ═══ */}
      <Section bg={C.offWhite} style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.greenMid}>DECISION TRAIL</Tag></FadeIn>
        <FadeIn delay={0.06}><H size={32} color={C.green} style={{ marginTop: 10 }}>The agent pulls every thread.</H></FadeIn>
        <FadeIn delay={0.1}>
          <P color={C.textMid} style={{ marginTop: 12, fontSize: 14 }}>
            Each finding triggers the next question. The trail below is what the agent built in minutes.
          </P>
        </FadeIn>

        <div style={{ marginTop: 32, maxWidth: 680 }}>
          <TrailStep n="1"
            question="Where is the 22% gap concentrated?"
            finding="Not evenly spread. 65% of the shortfall comes from 3 territories in rural UP. The rest of the network is tracking close to plan."
            sources={["DMS secondary sales", "Territory mapping"]}
            delay={0.08}
          />
          <TrailStep n="2"
            question="What happened in those 3 territories?"
            finding="Distributor fill rates dropped from the high-80s to the low-60s last quarter. But not all distributors in those territories declined equally."
            sources={["DMS fill rate", "Distributor ledger"]}
            delay={0.12}
          />
          <TrailStep n="3"
            question="Which distributors declined, and why?"
            finding="Two patterns. Set A: distributors with receivables above 45 days. They're financially stressed and can't maintain stock. Set B: healthy distributors whose beats overlap with territories where a challenger brand activated in Q3 with \u20B910 packs and 2x retailer margins."
            sources={["Distributor financials", "DMS beat-level", "Nielsen retail audit"]}
            delay={0.16}
          />
          <TrailConnector label="So it's two different problems wearing the same symptom. Go deeper on each." />
          <TrailStep n="4"
            question="In the challenger-affected beats, which SKUs declined first?"
            finding="Not the full portfolio. \u20B920 sparkling packs declined first. Thums Up and Sprite in PET. But non-cola SKUs - Maaza, Kinley, Limca - are holding wherever they're available. The displacement is format-specific: single-serve price point."
            sources={["DMS SKU-level", "Pack size mapping"]}
            delay={0.2}
          />
          <TrailStep n="5"
            question="Is the current trade scheme reaching this format?"
            finding="No. Scheme pays \u20B98/case on large packs. The challenger pays per-bottle on \u20B910 singles. Scheme redemption in the affected beats is running at 12% vs 45% in stable territory. The incentive never reaches the format where the battle is happening."
            sources={["Scheme ledger", "Distributor redemption data"]}
            delay={0.24}
          />
          <TrailConnector label="The scheme isn't just too low. It's the wrong structure entirely. What about the portfolio defense?" />
          <TrailStep n="6"
            question="Non-cola SKUs held. Are they available everywhere they should be?"
            finding="No. Warehouse dispatch data shows Maaza, Kinley, and Limca are understocked in exactly these 3 territories. The allocation model hasn't recalculated since last summer. The challenger has no juice or water product. Wherever these SKUs are in stock, the full standing order holds even in challenger-active beats."
            sources={["Warehouse dispatch", "Production line data", "DMS standing order"]}
            delay={0.28}
          />
          <TrailStep n="7"
            question="Can production cover the gap?"
            finding="The ASSP (small pack) line at Trishundi has spare capacity - it's running at 62%. One additional shift covers the affected territory requirement. But it's not being directed there. The dispatch plan is still pointed at last year's demand geography."
            sources={["Production line utilization", "Dispatch routing"]}
            delay={0.32}
          />
          <TrailConnector label="Supply and production issues confirmed. Now check field execution." />
          <TrailStep n="8"
            question="Are there field execution issues compounding this?"
            finding="Yes. SFA data shows a route restructuring last quarter reassigned beats to new salesmen. In reassigned beats, the decline is 5x worse than beats that kept their original salesman - even controlling for competitor presence. The relationship disruption is compounding everything."
            sources={["SFA visit logs", "Route assignment history", "DMS before/after"]}
            delay={0.36}
          />
          <TrailStep n="9"
            question="What about cooler infrastructure in these territories?"
            finding="Last field audit shows cooler purity and uptime issues clustering in the same declining beats. Compressor failures in a subset, competitor product in others. In beats where cooler records show no issues, the decline rate is near zero."
            sources={["Cooler deployment records", "Field audit data", "DMS overlay"]}
            delay={0.4}
          />
          <TrailStep n="10"
            question="Does Nielsen market data confirm the geographic pattern?"
            finding="Yes. Quarterly retail audit shows market-level share erosion concentrated in the same geographies. Challenger's share gain accelerated after their Q3 activation. The DMS pattern, the Nielsen pattern, and the SFA pattern all point to the same territories."
            sources={["Nielsen retail audit", "DMS territory", "SFA beat mapping"]}
            delay={0.44}
          />
          <TrailConnector label="Full picture assembled. Every problem is landing on the same geography at once." />
          <TrailStep n="11"
            question="What's the connected picture?"
            finding="The 22% gap is not one problem. It's at least six - challenger pricing, scheme structure mismatch, non-cola stockout, distributor financial stress, route disruption, and cooler degradation - all compounding in the same territories simultaneously. A blanket scheme increase addresses one. The other five keep bleeding."
            sources={["All sources connected"]}
            delay={0.48}
          />
        </div>
      </Section>

      {/* ═══ UNIFIED STRATEGY ═══ */}
      <Section bg={C.offWhite} style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.greenMid}>UNIFIED STRATEGY</Tag></FadeIn>
        <FadeIn delay={0.06}><H size={32} color={C.green} style={{ marginTop: 10 }}>One recovery plan. Every lever connected.</H></FadeIn>
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 8, maxWidth: 700 }}>
          {[
            { n: "01", action: "Restructure trade scheme in affected beats: shift from per-case to per-bottle on small packs", impact: "Matches the format where the battle is happening. Targeted to affected territories, not statewide.", tag: "Trade" },
            { n: "02", action: "Fast-track ASSP production at Trishundi and redirect dispatch to declining territories", impact: "Spare capacity exists. One shift covers the gap. 10 days to first dispatch. No capex.", tag: "Production" },
            { n: "03", action: "Emergency restocking of Maaza, Kinley, Limca in affected territory warehouses", impact: "No challenger equivalent. Wherever available, full portfolio holds. The best defense against a cola price war is portfolio width.", tag: "Supply Chain" },
            { n: "04", action: "Reverse beat reassignments where original salesman is still in the system", impact: "5x decline in reassigned beats vs. stable. Reversal costs nothing.", tag: "Sales" },
            { n: "05", action: "Distributor interventions: bridge financing for stressed distributors, outlet redistribution for collapsed fill rates", impact: "Removes the supply bottleneck compounding every other problem.", tag: "Distribution" },
            { n: "06", action: "Cooler repair and purity enforcement in overlapping beats", impact: "Issues cluster in the same geography as everything else. Fix costs a fraction of the volume it unlocks.", tag: "Field" },
          ].map((s, i) => (
            <FadeIn key={i} delay={0.08 + i * 0.06}>
              <div style={{ background: C.white, borderLeft: `2px solid ${C.sage}`, padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: 10, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.sage, flexShrink: 0, marginTop: 1 }}>{s.n}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.green, lineHeight: 1.4 }}>{s.action}</div>
                  <div style={{ fontSize: 12, color: C.greenText, marginTop: 2, lineHeight: 1.5 }}>{s.impact}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: C.sage, background: C.sageDim, padding: "3px 8px", flexShrink: 0, alignSelf: "center" }}>{s.tag}</span>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.45}>
          <div style={{ marginTop: 10, background: C.green, padding: "11px 14px", maxWidth: 700, fontSize: 12, fontWeight: 600, color: C.sage }}>
            Projected recovery: 14{"\u2013"}18% of the 22% gap {"\u00B7"} Every data point and assumption auditable
          </div>
        </FadeIn>
      </Section>

      {/* ═══ WHAT-IF ═══ */}
      <Section bg={C.green} dark style={{ padding: "48px 0" }}>
        <FadeIn><Tag color={C.sage}>WHAT-IF</Tag></FadeIn>
        <FadeIn delay={0.06}><H size={32} color={C.cream} style={{ marginTop: 10 }}>Test before you commit.</H></FadeIn>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8, maxWidth: 680 }}>
          {[
            { q: "What if we just increase the scheme statewide without changing the structure?", a: "Spend goes up significantly but redemption stays at 12% in affected beats. The per-case structure doesn't reach the \u20B910 single-serve. Most of the budget flows to territories that are already on track." },
            { q: "What if we can't restock non-cola SKUs in time for summer?", a: "The cola price war continues without portfolio support. But wherever juice and water are available, the full standing order holds even in competitor-active beats. Prioritize the highest-volume non-cola SKUs for the first shipment - they cover most of the constrained demand." },
            { q: "What if the challenger raises retailer margins further?", a: "Portfolio advantage holds. They have no juice, water, or flavoured drink equivalent. A large share of distributor stickiness comes from non-cola categories. The cola battle is one front. The portfolio war is already won wherever the products are in stock." },
          ].map((c, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.07}>
              <div style={{ background: "rgba(22,53,36,0.35)", display: "flex", overflow: "hidden" }}>
                <div style={{ width: 32, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(22,53,36,0.5)", padding: "10px 0" }}>
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
        <FadeIn delay={0.4}><div style={{ marginTop: 18, fontSize: 11, color: "rgba(133,163,131,0.45)", fontStyle: "italic" }}>Every answer traceable. Every assumption auditable.</div></FadeIn>
      </Section>

      {/* ═══ CONTRAST ═══ */}
      <Section bg={C.creamWarm} style={{ padding: "56px 0 64px" }}>
        <FadeIn><H size={36} color={C.green}>Same problem. Different outcomes.</H></FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ marginTop: 32, maxWidth: 520 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, letterSpacing: 1, marginBottom: 6 }}>TIME TO ACTION</div>
            <TimelineBar width="100%" color={C.terra} label="Traditional" value="5 weeks" />
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
              { dim: "Root cause", trad: "\"Competitor is cheaper\"", q: "11-step trail: competitor + scheme structure + stockout + distributor stress + route disruption + cooler, all compounding" },
              { dim: "Strategy", trad: "3 plans stitched in one meeting", q: "1 coordinated plan with 6 connected levers" },
              { dim: "Scenario testing", trad: "None", q: "Conversational what-if with projected impact" },
              { dim: "Confidence", trad: "Gut feel + seniority", q: "Data-backed with full decision trail" },
              { dim: "Accountability", trad: "Blame game if summer misses", q: "Every finding, source, and assumption documented" },
            ].map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 2.5fr", gap: 2, marginBottom: 2 }}>
                <div style={{ padding: "10px 12px", fontSize: 12.5, fontWeight: 600, color: C.green, background: C.white }}>{r.dim}</div>
                <div style={{ padding: "10px 12px", fontSize: 12.5, color: C.textMid, textAlign: "center", background: C.white }}>{r.trad}</div>
                <div style={{ padding: "10px 12px", fontSize: 12.5, fontWeight: 600, color: C.green, textAlign: "center", background: C.white }}>{r.q}</div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.35}>
          <div style={{ marginTop: 48, paddingTop: 16, borderTop: `1px solid ${C.border}`, fontSize: 14, fontFamily: sans, fontWeight: 600, color: C.green, letterSpacing: 1 }}>
            questt<span style={{ color: C.sage }}>.</span>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}

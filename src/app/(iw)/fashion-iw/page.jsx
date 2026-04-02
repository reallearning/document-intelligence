"use client";
import { useState } from "react";

const ACC = "#2D5A3D";
const ACCL = "#E8F0EB";
const ACCM = "#B8D4C2";
const ORG = "#C4713B";
const ORGL = "#FDF3EC";
const BLU = "#2B5B8A";
const BLUL = "#EBF1F7";
const PUR = "#6B4C8A";
const PURL = "#F3EFF7";
const TEA = "#5B8A6F";
const TEAL2 = "#EEF5F1";
const RED2 = "#B85042";
const REDL = "#FBEEED";
const IND = "#3B5998";
const INDL = "#ECF0F8";
const TXT = "#1C1C1C";
const SUB = "#555555";
const MUT = "#999999";
const BDR = "#E5E2DB";
const CRD = "#FFFFFF";
const BG = "#FAFAF8";
const W = 1200;

// ═══ LAYER 1: OUTCOMES
const outcomes = [
  { id: "growth", label: "Revenue Growth", sub: "Full-price sell-through acceleration", x: 280, y: 12, w: 270, h: 50, color: ACC },
  { id: "profit", label: "Profitability", sub: "Margin preservation & markdown reduction", x: 650, y: 12, w: 270, h: 50, color: ORG },
];

// ═══ LAYER 2: METRICS
const MW = 170, MH = 68;
const mGap = (W - 6 * MW - 40) / 5;
const mxF = (i) => 20 + i * (MW + mGap);
const allMetrics = [
  { id: "fpst", label: "Full-Price ST%", tag: "leading", target: "> 90% wk 6", outcome: "growth" },
  { id: "oos", label: "Stockout Rate", tag: "lagging", target: "\u2193 15-20%", outcome: "growth" },
  { id: "margin", label: "Gross Margin", tag: "lagging", target: "\u2191 300-500bps", outcome: "profit" },
  { id: "md_d", label: "Markdown Depth", tag: "leading", target: "\u2193 avg disc %", outcome: "profit" },
  { id: "sizefit", label: "Size Fit Score", tag: "leading", target: "\u2191 to 0.85+", outcome: "growth" },
].map((m, i) => ({ ...m, x: mxF(i), y: 95, w: MW, h: MH }));

// ═══ LAYER 3: DECISIONS (5 groups)
const DCW = 212, dcGap = (W - 5 * DCW - 36) / 4;
const dcx = (i) => 18 + i * (DCW + dcGap);
const SD_H = 24, SD_GAP = 3, HDR_H = 26;
const catH = HDR_H + 4 * SD_H + 3 * SD_GAP + 20;

const decCats = [
  { id: "buy", label: "Buy Depth", mets: ["fpst", "margin"],
    subs: ["Total units per style", "New vs proven depth split", "OTB budget allocation", "Re-buy trigger thresholds"] },
  { id: "storeDec", label: "Store Allocation", mets: ["oos", "sizefit"],
    subs: ["Grade-weighted distribution", "Store-style affinity scoring", "New style: A+/A stores only", "Channel mix (store vs e-com)"] },
  { id: "sizecolor", label: "Size & Color", mets: ["sizefit", "fpst"],
    subs: ["Store-level POS size curves", "Color mix from sell-through", "Size template (STD/LSK/SSK)", "Color cutoff: >90%\u2191 <70% kill"] },
  { id: "replen", label: "Replenishment", mets: ["oos", "fpst"],
    subs: ["In-season top-up triggers", "Inter-store consolidation", "Re-buy for proven sellers", "Emergency surge restock"] },
  { id: "markdown", label: "Markdown & Clearance", mets: ["margin", "md_d"],
    subs: ["First markdown trigger timing", "Depth per markdown wave", "Store-cluster sequencing", "Consolidation vs discount"] },
].map((d, i) => ({ ...d, x: dcx(i), y: 210, w: DCW, h: catH }));

// ═══ CROSS-LINKS
const crossLinks = [
  { from: "buy", to: "storeDec", label: "Units \u2192 allocation depth", curve: 18 },
  { from: "storeDec", to: "sizecolor", label: "Cluster \u2192 size curve", curve: 15 },
  { from: "sizecolor", to: "replen", label: "Fragmentation \u2192 consolidation", curve: 15 },
  { from: "replen", to: "markdown", label: "Velocity \u2192 markdown timing", curve: 18 },
  { from: "buy", to: "replen", label: "Re-buy triggers set at allocation", curve: 40 },
  { from: "markdown", to: "buy", label: "Markdown learnings \u2192 next season", curve: 55 },
];

// ═══ LAYER 4: SUBGRAPHS (8 in 2 rows of 4)
const SW2 = 270, SH2 = 175;
const sGap2 = (W - 4 * SW2 - 36) / 3;
const sxF = (i) => 18 + i * (SW2 + sGap2);
const SG_Y1 = 210 + catH + 68;
const SG_Y2 = SG_Y1 + SH2 + 14;

const subgraphs = [
  // Row 1
  { id: "product", label: "Product Intelligence", decs: ["buy", "sizecolor", "storeDec"], color: BLU, x: sxF(0), y: SG_Y1,
    bkg: { entities: [{ l: "Style", cx: 24, cy: 10 }, { l: "SKU", cx: 72, cy: 8 }, { l: "Collection", cx: 132, cy: 10 }, { l: "SizeCurve", cx: 204, cy: 8 }],
      models: [{ l: "Similarity", cx: 115, cy: 32 }],
      metrics: [{ l: "Breadth", cx: 38, cy: 58 }, { l: "Newness", cx: 115, cy: 55 }, { l: "SizeFit", cx: 192, cy: 58 }],
      decs: [{ l: "Buy Qty", cx: 65, cy: 82 }, { l: "Range", cx: 170, cy: 82 }],
      links: [["e",0,"mo",0],["e",1,"mo",0],["e",2,"mo",0],["e",3,"me",2],["mo",0,"me",0],["mo",0,"me",1],["me",0,"d",0],["me",1,"d",1],["me",2,"d",1]] }},
  { id: "demand", label: "Demand Signal", decs: ["buy", "replen", "markdown"], color: ORG, x: sxF(1), y: SG_Y1,
    bkg: { entities: [{ l: "Season", cx: 24, cy: 10 }, { l: "Event", cx: 80, cy: 8 }, { l: "Returns", cx: 148, cy: 10 }, { l: "Trend", cx: 210, cy: 8 }],
      models: [{ l: "Prophet", cx: 115, cy: 32 }],
      metrics: [{ l: "ROS", cx: 30, cy: 58 }, { l: "SellThru", cx: 88, cy: 55 }, { l: "WoC", cx: 148, cy: 58 }, { l: "Forecast", cx: 212, cy: 55 }],
      decs: [{ l: "Signal Wt", cx: 115, cy: 82 }],
      links: [["e",0,"mo",0],["e",1,"mo",0],["e",2,"mo",0],["e",3,"mo",0],["mo",0,"me",0],["mo",0,"me",1],["mo",0,"me",2],["mo",0,"me",3],["me",0,"d",0],["me",1,"d",0]] }},
  { id: "storeSG", label: "Store Performance", decs: ["storeDec", "replen"], color: TEA, x: sxF(2), y: SG_Y1,
    bkg: { entities: [{ l: "Store", cx: 24, cy: 10 }, { l: "Cluster", cx: 80, cy: 8 }, { l: "Zone", cx: 148, cy: 10 }, { l: "Channel", cx: 210, cy: 8 }],
      models: [{ l: "Affinity", cx: 115, cy: 32 }],
      metrics: [{ l: "Sales/Ft", cx: 38, cy: 58 }, { l: "Conv%", cx: 105, cy: 55 }, { l: "Basket", cx: 165, cy: 58 }, { l: "Grade", cx: 218, cy: 55 }],
      decs: [{ l: "Cluster", cx: 65, cy: 82 }, { l: "Space", cx: 170, cy: 82 }],
      links: [["e",0,"mo",0],["e",1,"mo",0],["mo",0,"me",3],["mo",0,"me",2],["e",0,"me",0],["e",0,"me",1],["me",0,"d",1],["me",3,"d",0]] }},
  { id: "inventory", label: "Inventory Position", decs: ["replen", "storeDec"], color: ACC, x: sxF(3), y: SG_Y1,
    bkg: { entities: [{ l: "Warehouse", cx: 24, cy: 10 }, { l: "StoreStk", cx: 85, cy: 8 }, { l: "Transit", cx: 148, cy: 10 }, { l: "SizeFrag", cx: 212, cy: 8 }],
      models: [],
      metrics: [{ l: "Stock", cx: 30, cy: 50 }, { l: "SizeAvl", cx: 95, cy: 47 }, { l: "Cover", cx: 158, cy: 50 }, { l: "FragRate", cx: 218, cy: 47 }],
      decs: [{ l: "Allocate", cx: 50, cy: 74 }, { l: "Replen", cx: 125, cy: 74 }, { l: "Consol", cx: 200, cy: 74 }],
      links: [["e",0,"me",0],["e",1,"me",0],["e",1,"me",1],["e",2,"me",2],["e",3,"me",3],["me",0,"d",0],["me",1,"d",1],["me",2,"d",0],["me",3,"d",2]] }},
  // Row 2
  { id: "pricing", label: "Pricing & Markdown", decs: ["markdown", "buy"], color: PUR, x: sxF(0), y: SG_Y2,
    bkg: { entities: [{ l: "FullPrice", cx: 24, cy: 10 }, { l: "Cost", cx: 85, cy: 8 }, { l: "Competitor", cx: 155, cy: 10 }, { l: "MD Sched", cx: 222, cy: 8 }],
      models: [],
      metrics: [{ l: "Margin%", cx: 38, cy: 50 }, { l: "FP Sell%", cx: 105, cy: 47 }, { l: "MD Dpth", cx: 172, cy: 50 }, { l: "Recovery", cx: 228, cy: 47 }],
      decs: [{ l: "MD Trigger", cx: 70, cy: 74 }, { l: "MD Depth", cx: 178, cy: 74 }],
      links: [["e",0,"me",0],["e",0,"me",1],["e",1,"me",0],["e",2,"me",2],["e",3,"me",2],["me",0,"d",0],["me",1,"d",0],["me",2,"d",1]] }},
  { id: "customer", label: "Customer Intelligence", decs: ["sizecolor", "markdown"], color: RED2, x: sxF(1), y: SG_Y2,
    bkg: { entities: [{ l: "Customer", cx: 24, cy: 10 }, { l: "Segment", cx: 85, cy: 8 }, { l: "SizeProf", cx: 155, cy: 10 }, { l: "StylePref", cx: 222, cy: 8 }],
      models: [],
      metrics: [{ l: "LTV", cx: 30, cy: 50 }, { l: "FP Bias", cx: 95, cy: 47 }, { l: "ReturnRt", cx: 165, cy: 50 }, { l: "Breadth", cx: 225, cy: 47 }],
      decs: [{ l: "Alert", cx: 65, cy: 74 }, { l: "Size Intel", cx: 178, cy: 74 }],
      links: [["e",0,"me",0],["e",1,"me",1],["e",2,"me",2],["e",3,"me",3],["me",0,"d",0],["me",1,"d",0],["me",2,"d",1]] }},
  { id: "sales", label: "Sales Performance", decs: ["buy", "storeDec"], color: IND, x: sxF(2), y: SG_Y2,
    bkg: { entities: [{ l: "Target", cx: 24, cy: 10 }, { l: "Region", cx: 85, cy: 8 }, { l: "Category", cx: 155, cy: 10 }, { l: "Team", cx: 215, cy: 8 }],
      models: [],
      metrics: [{ l: "Achv%", cx: 35, cy: 50 }, { l: "ASP", cx: 95, cy: 47 }, { l: "UPT", cx: 155, cy: 50 }, { l: "LFL", cx: 215, cy: 47 }],
      decs: [{ l: "Target Set", cx: 65, cy: 74 }, { l: "Incentive", cx: 178, cy: 74 }],
      links: [["e",0,"me",0],["e",1,"me",3],["e",2,"me",1],["e",3,"me",0],["me",0,"d",0],["me",1,"d",1],["me",3,"d",0]] }},
  { id: "marketing", label: "Marketing & Campaigns", decs: ["buy", "markdown"], color: "#2E7D6F", x: sxF(3), y: SG_Y2,
    bkg: { entities: [{ l: "Campaign", cx: 24, cy: 10 }, { l: "Content", cx: 85, cy: 8 }, { l: "Channel", cx: 155, cy: 10 }, { l: "Budget", cx: 215, cy: 8 }],
      models: [],
      metrics: [{ l: "ROAS", cx: 35, cy: 50 }, { l: "CPA", cx: 95, cy: 47 }, { l: "Attrib", cx: 160, cy: 50 }, { l: "Engage", cx: 220, cy: 47 }],
      decs: [{ l: "Camp Mix", cx: 65, cy: 74 }, { l: "Budget", cx: 178, cy: 74 }],
      links: [["e",0,"me",0],["e",1,"me",3],["e",2,"me",2],["e",3,"me",1],["me",0,"d",0],["me",0,"d",1],["me",1,"d",1]] }},
].map(s => ({ ...s, w: SW2, h: SH2 }));

// ═══ LAYER 5: DATA SOURCES (1P only)
const DSW = 270, DSH = 36;
const DS_Y = SG_Y2 + SH2 + 35;
const dataSources = [
  { id: "pos", label: "POS / Sell-through (3 seasons)", feeds: ["demand", "product", "pricing", "sales"] },
  { id: "style_m", label: "Style Metadata & Attributes", feeds: ["product"] },
  { id: "store_m", label: "Store Master (grade/cluster)", feeds: ["storeSG", "sales"] },
  { id: "inv", label: "Inventory / WMS / Transit", feeds: ["inventory"] },
  { id: "returns", label: "Returns (size/fit/quality)", feeds: ["demand", "customer"] },
  { id: "otb", label: "OTB / Finance / Margin Targets", feeds: ["pricing", "sales"] },
  { id: "crm", label: "CRM / Loyalty / Size Profiles", feeds: ["customer", "marketing"] },
  { id: "supplier", label: "Supplier / Production Data", feeds: ["product", "inventory"] },
].map((d, i) => ({ ...d, x: sxF(i % 4), y: DS_Y + Math.floor(i / 4) * (DSH + 5), w: DSW, h: DSH }));

const TOTAL_H = DS_Y + 2 * (DSH + 5) + 40;

const tc = (n) => ({ x: n.x + n.w / 2, y: n.y });
const bc = (n) => ({ x: n.x + n.w / 2, y: n.y + n.h });
const fi = (a, id) => a.find(n => n.id === id);

function Bez({ p1, p2, color, sw = 1.4, op = 0.22 }) {
  const my = (p1.y + p2.y) / 2;
  return (<path d={`M${p1.x},${p1.y} C${p1.x},${my} ${p2.x},${my} ${p2.x},${p2.y}`} fill="none" stroke={color} strokeWidth={sw} opacity={op} />);
}

function MiniBKG({ sg }) {
  const ox = sg.x + 6, oy = sg.y + 62, b = sg.bkg, col = sg.color;
  const np = (t, i) => { const a = t === "e" ? b.entities : t === "mo" ? b.models : t === "me" ? b.metrics : b.decs; return a[i] ? { x: ox + a[i].cx, y: oy + a[i].cy } : null; };
  return (
    <g>
      <rect x={sg.x + 3} y={sg.y + 56} width={sg.w - 6} height={sg.h - 60} rx={4} fill={`${col}08`} stroke={`${col}18`} strokeWidth={0.5} />
      {b.links.map((l, i) => { const f2 = np(l[0], l[1]), t2 = np(l[2], l[3]); if (!f2 || !t2) return null; return (<line key={i} x1={f2.x} y1={f2.y + (l[0] === "e" ? 6 : l[0] === "mo" ? 7 : 6)} x2={t2.x} y2={t2.y - (l[2] === "mo" ? 7 : l[2] === "me" ? 6 : 6)} stroke={col} strokeWidth={0.5} opacity={0.13} />); })}
      {b.entities.map((e, i) => (<g key={`e${i}`}><circle cx={ox + e.cx} cy={oy + e.cy} r={5.5} fill={col} stroke="#fff" strokeWidth={1.2} opacity={0.85} /><text x={ox + e.cx} y={oy + e.cy + 12} textAnchor="middle" fontSize={5.5} fill={SUB} fontFamily="'IBM Plex Sans',sans-serif">{e.l}</text></g>))}
      {b.models.map((m, i) => { const pw = m.l.length * 3.8 + 8; return (<g key={`m${i}`}><rect x={ox + m.cx - pw / 2} y={oy + m.cy - 6} width={pw} height={12} rx={6} fill={`${col}20`} stroke={col} strokeWidth={1} /><text x={ox + m.cx} y={oy + m.cy + 3} textAnchor="middle" fontSize={6} fill={col} fontFamily="'JetBrains Mono',monospace" fontWeight={600}>{m.l}</text></g>); })}
      {b.metrics.map((m, i) => (<g key={`me${i}`}><rect x={ox + m.cx - 5} y={oy + m.cy - 5} width={10} height={10} rx={1} fill={`${col}45`} stroke="#fff" strokeWidth={1.1} transform={`rotate(45,${ox + m.cx},${oy + m.cy})`} /><text x={ox + m.cx} y={oy + m.cy + 14} textAnchor="middle" fontSize={5.5} fill={SUB} fontFamily="'IBM Plex Sans',sans-serif">{m.l}</text></g>))}
      {b.decs.map((d, i) => (<g key={`d${i}`}><polygon points={`${ox + d.cx},${oy + d.cy - 6} ${ox + d.cx + 6},${oy + d.cy + 4} ${ox + d.cx - 6},${oy + d.cy + 4}`} fill={`${col}35`} stroke="#fff" strokeWidth={1.1} /><text x={ox + d.cx} y={oy + d.cy + 14} textAnchor="middle" fontSize={5.5} fill={SUB} fontFamily="'IBM Plex Sans',sans-serif" fontWeight={600}>{d.l}</text></g>))}
    </g>
  );
}

export default function FashionIWFramework() {
  return (
    <div className="h-screen overflow-auto bg-[#FAFAF8] p-4 font-['IBM_Plex_Sans',sans-serif]">
      <div className="max-w-[1220px] mx-auto">
        <h1 className="font-['Georgia',serif] text-xl font-bold text-[#1C1C1C] mb-0.5">Fashion Retail x Intelligence Warehouse</h1>
        <p className="text-[11.5px] text-[#555] leading-relaxed mb-3">
          Outcome-backward decomposition for buy planning &amp; allocation. Three models are{" "}
          <strong className="text-[#2D5A3D]">signal nodes inside the graph</strong>: Prophet (demand), Similarity (cold start), Affinity (store split).
          Green dashed curves = cross-decision dependencies.
          <span className="ml-3 font-['JetBrains_Mono',monospace] text-[9px] text-[#999]">{"\u25CF"} entity  {"\u2B2C"} model  {"\u25C6"} metric  {"\u25B2"} decision</span>
        </p>

        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${TOTAL_H}`} width="100%" className="min-w-[980px]">
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 1L10 5L0 9z" fill={ACC} /></marker>
              <filter id="sh"><feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.05" /></filter>
            </defs>

            {/* Layer bands */}
            <rect x={0} y={0} width={W} height={78} fill={ACC} opacity={0.035} />
            <rect x={0} y={82} width={W} height={90} fill={BLU} opacity={0.025} />
            <rect x={0} y={198} width={W} height={catH + 18} fill={ACC} opacity={0.035} />
            <rect x={0} y={SG_Y1 - 10} width={W} height={SH2 * 2 + 38} fill={PUR} opacity={0.02} />
            <rect x={0} y={DS_Y - 12} width={W} height={2 * (DSH + 5) + 24} fill={MUT} opacity={0.035} />

            {/* Layer labels */}
            <text x={8} y={72} fill={ACC} fontSize={7} fontWeight={700} fontFamily="'JetBrains Mono',monospace">OUTCOMES</text>
            <text x={8} y={170} fill={BLU} fontSize={7} fontWeight={700} fontFamily="'JetBrains Mono',monospace">LEADING &amp; LAGGING METRICS</text>
            <text x={8} y={210 + catH + 6} fill={ACC} fontSize={7} fontWeight={700} fontFamily="'JetBrains Mono',monospace">DECISIONS — each box is one choice the buying team makes</text>
            <text x={8} y={SG_Y1 + SH2 * 2 + 18} fill={PUR} fontSize={7} fontWeight={700} fontFamily="'JetBrains Mono',monospace">IW SUBGRAPHS — models are signal nodes inside the graph</text>
            <text x={8} y={DS_Y + 2 * (DSH + 5) + 4} fill={MUT} fontSize={7} fontWeight={700} fontFamily="'JetBrains Mono',monospace">DATA FEEDS — 1st party</text>

            {/* ═══ CONNECTIONS ═══ */}
            {allMetrics.map(m => { const o = fi(outcomes, m.outcome); return (<Bez key={`om${m.id}`} p1={bc(o)} p2={tc(m)} color={o.color} sw={1.5} op={0.2} />); })}
            {decCats.map(d => d.mets.map(mId => { const m = fi(allMetrics, mId); const o = fi(outcomes, m.outcome); return (<Bez key={`md${mId}${d.id}`} p1={bc(m)} p2={tc(d)} color={o.color} sw={1} op={0.13} />); }))}
            {subgraphs.map(s => s.decs.map(dId => { const d = fi(decCats, dId); return d ? (<Bez key={`ds${dId}${s.id}`} p1={bc(d)} p2={tc(s)} color={s.color} sw={1.6} op={0.22} />) : null; }))}
            {dataSources.map(ds => ds.feeds.map(sId => { const s = fi(subgraphs, sId); return s ? (<Bez key={`sd${sId}${ds.id}`} p1={bc(s)} p2={tc(ds)} color={s.color} sw={1} op={0.15} />) : null; }))}

            {/* Cross-decision links */}
            {crossLinks.map((cl, i) => {
              const f2 = fi(decCats, cl.from), t2 = fi(decCats, cl.to);
              if (!f2 || !t2) return null;
              const fx = f2.x + f2.w / 2, tx = t2.x + t2.w / 2, by = f2.y + f2.h + 2;
              const cy2 = by + cl.curve, mid = (fx + tx) / 2;
              return (
                <g key={i}>
                  <path d={`M${fx},${by} C${fx},${cy2} ${tx},${cy2} ${tx},${by}`} fill="none" stroke={ACC} strokeWidth={1.4} opacity={0.38} strokeDasharray="5,3" markerEnd="url(#arr)" />
                  <text x={mid} y={cy2 + 8} textAnchor="middle" fontSize={5.5} fill={ACC} fontFamily="'IBM Plex Sans',sans-serif" fontWeight={500}>{cl.label}</text>
                </g>
              );
            })}

            {/* ═══ OUTCOMES ═══ */}
            {outcomes.map(o => (
              <g key={o.id}>
                <rect x={o.x} y={o.y} width={o.w} height={o.h} rx={5} fill={CRD} stroke={o.color} strokeWidth={1.8} filter="url(#sh)" />
                <text x={o.x + 14} y={o.y + 22} fontSize={14} fontWeight={700} fill={o.color} fontFamily="Georgia,serif">{o.label}</text>
                <text x={o.x + 14} y={o.y + 38} fontSize={9} fill={SUB}>{o.sub}</text>
              </g>
            ))}

            {/* ═══ METRICS ═══ */}
            {allMetrics.map(m => {
              const oc = fi(outcomes, m.outcome);
              return (
                <g key={m.id}>
                  <rect x={m.x} y={m.y} width={m.w} height={m.h} rx={4} fill={CRD} stroke={BDR} strokeWidth={1} filter="url(#sh)" />
                  <rect x={m.x} y={m.y} width={3} height={m.h} rx={1.5} fill={oc.color} opacity={0.6} />
                  <text x={m.x + 8} y={m.y + 16} fontSize={10} fontWeight={700} fill={TXT}>{m.label}</text>
                  <rect x={m.x + 8} y={m.y + 24} width={m.tag.length * 4.5 + 6} height={12} rx={2} fill={m.tag === "leading" ? BLUL : ACCL} />
                  <text x={m.x + 11} y={m.y + 33} fontSize={7} fill={m.tag === "leading" ? BLU : ACC} fontFamily="'JetBrains Mono',monospace" fontWeight={600}>{m.tag}</text>
                  <rect x={m.x + 8 + m.tag.length * 4.5 + 10} y={m.y + 24} width={m.target.length * 4.2 + 6} height={12} rx={2} fill={ORGL} />
                  <text x={m.x + 11 + m.tag.length * 4.5 + 10} y={m.y + 33} fontSize={7} fill={ORG} fontFamily="'JetBrains Mono',monospace" fontWeight={600}>{m.target}</text>
                </g>
              );
            })}

            {/* ═══ DECISION CATEGORIES ═══ */}
            {decCats.map(d => {
              const subY0 = d.y + HDR_H;
              return (
                <g key={d.id}>
                  <rect x={d.x} y={d.y} width={d.w} height={d.h} rx={5} fill={CRD} stroke={ACCM} strokeWidth={1.2} filter="url(#sh)" />
                  <rect x={d.x} y={d.y} width={d.w} height={HDR_H} rx={5} fill={ACCL} />
                  <rect x={d.x} y={d.y + HDR_H - 4} width={d.w} height={4} fill={ACCL} />
                  <text x={d.x + 8} y={d.y + 17} fontSize={11} fontWeight={700} fill={TXT} fontFamily="Georgia,serif">{d.label}</text>
                  {d.subs.map((s, i) => {
                    const sy = subY0 + i * (SD_H + SD_GAP);
                    return (
                      <g key={i}>
                        <rect x={d.x + 5} y={sy} width={d.w - 10} height={SD_H} rx={3} fill={BG} stroke={BDR} strokeWidth={0.7} />
                        <rect x={d.x + 5} y={sy} width={2.5} height={SD_H} rx={1.5} fill={ACC} opacity={0.4} />
                        <text x={d.x + 14} y={sy + SD_H / 2 + 3} fontSize={8} fill={TXT} fontWeight={500}>{s}</text>
                      </g>
                    );
                  })}
                  {d.mets.map((mId, mi) => {
                    const met = fi(allMetrics, mId); const oc = fi(outcomes, met.outcome);
                    const tx = d.x + 7 + mi * 72;
                    return (
                      <g key={mId}>
                        <rect x={tx} y={subY0 + 4 * (SD_H + SD_GAP) + 2} width={met.label.length * 4 + 14} height={11} rx={2} fill={oc.color === ACC ? ACCL : ORGL} />
                        <text x={tx + 3} y={subY0 + 4 * (SD_H + SD_GAP) + 10} fontSize={6} fill={oc.color} fontFamily="'JetBrains Mono',monospace" fontWeight={600}>{"\u2192"} {met.label}</text>
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* ═══ SUBGRAPHS ═══ */}
            {subgraphs.map(s => (
              <g key={s.id}>
                <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={5} fill={CRD} stroke={s.color} strokeWidth={1.5} filter="url(#sh)" />
                <circle cx={s.x + 12} cy={s.y + 12} r={4.5} fill={s.color} opacity={0.8} />
                <text x={s.x + 20} y={s.y + 16} fontSize={10} fontWeight={700} fill={TXT} fontFamily="Georgia,serif">{s.label}</text>
                {s.decs.slice(0, 3).map((dId, di) => {
                  const dc = fi(decCats, dId);
                  if (!dc) return null;
                  const lbl = dc.label.length > 8 ? dc.label.split(" ")[0] : dc.label;
                  return (
                    <g key={dId}>
                      <rect x={s.x + 20 + di * 52} y={s.y + 24} width={lbl.length * 4 + 10} height={11} rx={2} fill={`${s.color}10`} />
                      <text x={s.x + 25 + di * 52} y={s.y + 32} fontSize={5.5} fill={s.color} fontFamily="'JetBrains Mono',monospace" fontWeight={600}>{"\u2191"} {lbl}</text>
                    </g>
                  );
                })}
                <MiniBKG sg={s} />
              </g>
            ))}

            {/* ═══ DATA SOURCES ═══ */}
            {dataSources.map(ds => (
              <g key={ds.id}>
                <rect x={ds.x} y={ds.y} width={ds.w} height={ds.h} rx={3.5} fill={CRD} stroke={BDR} strokeWidth={0.7} filter="url(#sh)" />
                <text x={ds.x + 8} y={ds.y + 15} fontSize={9} fontWeight={600} fill={TXT}>{ds.label}</text>
                <rect x={ds.x + ds.w - 24} y={ds.y + 6} width={18} height={11} rx={2} fill="#F0EFEC" />
                <text x={ds.x + ds.w - 15} y={ds.y + 14} textAnchor="middle" fontSize={6} fill={MUT} fontFamily="'JetBrains Mono',monospace">1P</text>
              </g>
            ))}

            {/* Legend */}
            <g transform={`translate(18,${TOTAL_H - 32})`}>
              <rect x={0} y={0} width={W - 36} height={26} rx={4} fill={CRD} stroke={BDR} strokeWidth={0.6} />
              <text x={8} y={11} fill={TXT} fontSize={6.5} fontWeight={700}>BKG:</text>
              <circle cx={35} cy={8} r={3.5} fill={ACC} stroke="#fff" strokeWidth={0.8} /><text x={42} y={11} fill={SUB} fontSize={6.5}>Entity</text>
              <rect x={70} y={4} width={24} height={9} rx={4.5} fill={`${ACC}20`} stroke={ACC} strokeWidth={0.7} /><text x={96} y={11} fill={ACC} fontSize={6.5} fontWeight={600}>Model</text>
              <rect x={126} y={3} width={6} height={6} rx={1} fill={`${ACC}45`} stroke="#fff" strokeWidth={0.8} transform="rotate(45,129,6)" /><text x={138} y={11} fill={SUB} fontSize={6.5}>Metric</text>
              <polygon points="172,2 176,10 168,10" fill={`${ACC}35`} stroke="#fff" strokeWidth={0.8} /><text x={180} y={11} fill={SUB} fontSize={6.5}>Decision</text>
              <text x={228} y={11} fill={TXT} fontSize={6.5} fontWeight={700}>MODELS:</text>
              <rect x={268} y={3} width={36} height={10} rx={5} fill={`${ORG}20`} stroke={ORG} strokeWidth={0.7} /><text x={286} y={11} textAnchor="middle" fontSize={5.5} fill={ORG} fontWeight={600}>Prophet</text>
              <rect x={310} y={3} width={44} height={10} rx={5} fill={`${BLU}20`} stroke={BLU} strokeWidth={0.7} /><text x={332} y={11} textAnchor="middle" fontSize={5.5} fill={BLU} fontWeight={600}>Similarity</text>
              <rect x={360} y={3} width={36} height={10} rx={5} fill={`${TEA}20`} stroke={TEA} strokeWidth={0.7} /><text x={378} y={11} textAnchor="middle" fontSize={5.5} fill={TEA} fontWeight={600}>Affinity</text>
              <text x={414} y={11} fill={TXT} fontSize={6.5} fontWeight={700}>FLOWS:</text>
              <line x1={446} y1={8} x2={462} y2={8} stroke={ACC} strokeWidth={1.2} opacity={0.25} /><text x={466} y={11} fill={SUB} fontSize={6.5}>Growth</text>
              <line x1={498} y1={8} x2={514} y2={8} stroke={ORG} strokeWidth={1.2} opacity={0.25} /><text x={518} y={11} fill={SUB} fontSize={6.5}>Profit</text>
              <line x1={548} y1={8} x2={564} y2={8} stroke={ACC} strokeWidth={1.2} opacity={0.38} strokeDasharray="4,2" /><text x={568} y={11} fill={ACC} fontSize={6.5} fontWeight={600}>Cross-decision (IW core)</text>
            </g>
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto mt-3 bg-white border-[1.5px] border-[#2D5A3D] rounded-md px-4 py-3">
          <p className="text-[10px] font-bold text-[#2D5A3D] uppercase tracking-wide mb-1">The IW thesis for fashion allocation</p>
          <p className="text-xs text-[#1C1C1C] leading-relaxed">
            Prophet, Similarity, and Affinity are signal-generating nodes inside individual subgraphs. The IW is the traversal layer that connects them: a new style&apos;s similarity embedding drives its buy depth, the store-style affinity model adjusts grade splits beyond static A/B/C, and Prophet&apos;s demand forecast sets re-buy triggers at allocation time — three models, eight subgraphs, one coordinated buy sheet.
          </p>
        </div>
        <p className="text-[9px] text-[#999] font-['JetBrains_Mono',monospace] mt-1.5 text-center">
          Questt AI — Fashion Retail Intelligence Warehouse — Buy Planning &amp; Allocation — April 2026
        </p>
      </div>
    </div>
  );
}

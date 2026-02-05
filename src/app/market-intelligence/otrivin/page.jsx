"use client"
import { useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const C = {
  header: "#0C2C18", page: "#F5F2ED", card: "#FFFFFF", border: "#E5E0D8",
  borderLight: "#EEEAE3", text: "#1A1A1A", textMid: "#5A5A5A", textLight: "#8C8C8C",
  green: "#1B6B4A", greenPale: "#EBF3EE", sage: "#7EA37E",
  orange: "#D07030", orangePale: "#FDF3EB", red: "#B83D2B", redPale: "#FDF0ED",
  blue: "#2B6CB0", bluePale: "#EBF4FB",
};
const label = { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textLight };
const cardBase = { background: C.card, border: `1px solid ${C.border}` };

// ═══════════════════════════════════════════════════════
// BRAND DATA — each brand has its own KPIs, regions, insights
// ═══════════════════════════════════════════════════════
const brandData = {
  Otrivin: {
    tagline: "Nasal Decongestant · Spray + Mist",
    summary:
      "Outperforming at 112% of target. Delhi pollution extending demand 3–4 weeks beyond normal season. IQVIA expert prescriptions up 32%. Campaign extension at 3.2x projected ROAS is the key decision this week.",
    kpis: [
      {
        label: "BRAND ACHIEVEMENT",
        value: "112%",
        delta: "+12% vs target",
        negative: false,
      },
      { label: "IQVIA RX UPLIFT", value: "+32%", delta: "vs seasonal norm" },
      { label: "SEARCH UPLIFT", value: "+45%", delta: "Above seasonal norm" },
      {
        label: "CAMPAIGN ROAS",
        value: "3.2x",
        delta: "Projected for extension",
      },
    ],
    shareTrend: [
      { period: "W48", brand: 39.2, competitor: 30.1 },
      { period: "W49", brand: 39.5, competitor: 30.4 },
      { period: "W50", brand: 40.0, competitor: 30.2 },
      { period: "W51", brand: 40.3, competitor: 30.5 },
      { period: "W52", brand: 40.8, competitor: 30.8 },
      { period: "W1", brand: 41.0, competitor: 31.0 },
      { period: "W2", brand: 41.2, competitor: 30.9 },
      { period: "W3", brand: 41.4, competitor: 31.1 },
    ],
    regions: [
      {
        name: "Delhi NCR",
        achievement: 112,
        status: "on-track",
        narrative:
          "AQI-driven demand extending season. Nasal Mist +22% WoW. Q-comm Blinkit/Zepto +48% WoW. Campaign at 2.1% CTR vs 1.6% benchmark. Extension opportunity at 3.2x ROAS.",
        keyWin:
          "Nasal Mist premium SKU driving trading-up — 22% WoW growth in pharmacy channel",
        keyRisk:
          "Campaign paced to end Jan 31. If not extended, cedes window to Vicks during remaining AQI days",
        metrics: [
          { label: "Primary Sales Δ", value: "+75%", negative: false },
          { label: "Rx Share (ENT)", value: "41%", note: "Stable" },
          { label: "Q-comm Growth", value: "+48% WoW", note: "Blinkit/Zepto" },
          { label: "Stock Cover", value: "16 days", note: "Healthy" },
        ],
        weeklyTrend: [
          { w: "W48", v: 88 },
          { w: "W49", v: 92 },
          { w: "W50", v: 96 },
          { w: "W51", v: 100 },
          { w: "W52", v: 104 },
          { w: "W1", v: 108 },
          { w: "W2", v: 110 },
          { w: "W3", v: 112 },
        ],
        asmAreas: [
          {
            name: "South Delhi + Gurgaon",
            ach: 125,
            primary: "₹18.2L",
            delta: "+88%",
            dist: "86%",
            flag: "Nasal Mist 155% of target",
          },
          {
            name: "Noida + East Delhi",
            ach: 98,
            primary: "₹12.4L",
            delta: "+62%",
            dist: "79%",
            flag: null,
          },
        ],
      },
      {
        name: "UP West",
        achievement: 88,
        status: "on-track",
        narrative:
          "Steady. Pollution spillover from NCR helping demand in Noida-adjacent areas. Lucknow pharmacy activation on track.",
        keyWin:
          "Noida-adjacent areas riding NCR pollution spillover — +34% above seasonal norm",
        keyRisk:
          "No material risk. Kanpur stock cover slightly tight at 11 days",
        metrics: [
          { label: "Primary Sales Δ", value: "+18%", negative: false },
          { label: "Rx Share (ENT)", value: "38%", note: "Stable" },
          { label: "Pharmacy Reach", value: "68%", note: "On plan" },
          { label: "Stock Cover", value: "13 days", note: "OK" },
        ],
        weeklyTrend: [
          { w: "W48", v: 82 },
          { w: "W49", v: 83 },
          { w: "W50", v: 84 },
          { w: "W51", v: 85 },
          { w: "W52", v: 86 },
          { w: "W1", v: 87 },
          { w: "W2", v: 88 },
          { w: "W3", v: 88 },
        ],
        asmAreas: [
          {
            name: "Lucknow–Kanpur",
            ach: 84,
            primary: "₹7.2L",
            delta: "+14%",
            dist: "66%",
            flag: "Kanpur stock 11 days",
          },
          {
            name: "Agra–Aligarh",
            ach: 92,
            primary: "₹6.8L",
            delta: "+22%",
            dist: "71%",
            flag: null,
          },
        ],
      },
      {
        name: "Madhya Pradesh",
        achievement: 72,
        status: "needs-attention",
        narrative:
          "Pre-monsoon stocking critically thin. 4 of 8 distributors below 10 days cover. IMD forecasts monsoon 8–10 days early — orders must be placed by Wednesday.",
        keyWin:
          "Bhopal ENT activation on track — 12 new prescribers added in January",
        keyRisk:
          "4 distributors will stock out before resupply if monsoon spike hits. Replenishment cycle 5–7 days",
        metrics: [
          { label: "Primary Sales Δ", value: "+6%", negative: false },
          {
            label: "Distributors at Risk",
            value: "4 / 8",
            note: "Below 10 days",
          },
          {
            label: "Avg Stock Cover",
            value: "12 days",
            note: "9 days at spike",
          },
          { label: "Pharmacy Reach", value: "54%", note: "Below 60% target" },
        ],
        weeklyTrend: [
          { w: "W48", v: 68 },
          { w: "W49", v: 69 },
          { w: "W50", v: 70 },
          { w: "W51", v: 70 },
          { w: "W52", v: 71 },
          { w: "W1", v: 71 },
          { w: "W2", v: 72 },
          { w: "W3", v: 72 },
        ],
        asmAreas: [
          {
            name: "Bhopal–Indore",
            ach: 76,
            primary: "₹4.8L",
            delta: "+8%",
            dist: "62%",
            flag: "Indore stock 8 days",
          },
          {
            name: "Jabalpur–Gwalior–East",
            ach: 68,
            primary: "₹3.1L",
            delta: "+3%",
            dist: "46%",
            flag: "Gwalior stock 7 days",
          },
        ],
      },
      {
        name: "UP East",
        achievement: 80,
        status: "needs-attention",
        narrative:
          "Moderate. Varanasi activation behind plan — pharmacy coverage at 48% vs 60% target. Agra stable.",
        keyWin: "Agra pharmacy channel performing at plan — no gaps",
        keyRisk:
          "Varanasi pharmacy coverage stalled at 48%. Need 60% for seasonal demand capture",
        metrics: [
          { label: "Primary Sales Δ", value: "+10%", negative: false },
          { label: "Pharmacy Coverage", value: "56%", note: "vs 60% target" },
          { label: "ENT Prescribers", value: "42", note: "+6 this month" },
          { label: "Stock Cover", value: "14 days", note: "Adequate" },
        ],
        weeklyTrend: [
          { w: "W48", v: 76 },
          { w: "W49", v: 77 },
          { w: "W50", v: 78 },
          { w: "W51", v: 78 },
          { w: "W52", v: 79 },
          { w: "W1", v: 79 },
          { w: "W2", v: 80 },
          { w: "W3", v: 80 },
        ],
        asmAreas: [
          {
            name: "Agra–Mathura",
            ach: 86,
            primary: "₹5.6L",
            delta: "+14%",
            dist: "68%",
            flag: null,
          },
          {
            name: "Varanasi–Allahabad",
            ach: 73,
            primary: "₹3.8L",
            delta: "+6%",
            dist: "48%",
            flag: "Pharmacy activation behind",
          },
        ],
      },
      {
        name: "Rajasthan",
        achievement: 90,
        status: "on-track",
        narrative:
          "Stable performance. No competitive pressure on Otrivin. Pharmacy coverage healthy across both ASM territories.",
        keyWin:
          "Jaipur pharmacy channel at 74% coverage — above North zone average",
        keyRisk: "No material risk",
        metrics: [
          { label: "Primary Sales Δ", value: "+8%", negative: false },
          { label: "Pharmacy Coverage", value: "70%", note: "Above target" },
          { label: "ENT Prescribers", value: "28", note: "Stable" },
          { label: "Stock Cover", value: "18 days", note: "Healthy" },
        ],
        weeklyTrend: [
          { w: "W48", v: 86 },
          { w: "W49", v: 87 },
          { w: "W50", v: 88 },
          { w: "W51", v: 88 },
          { w: "W52", v: 89 },
          { w: "W1", v: 89 },
          { w: "W2", v: 90 },
          { w: "W3", v: 90 },
        ],
        asmAreas: [
          {
            name: "Jaipur–North",
            ach: 92,
            primary: "₹6.4L",
            delta: "+10%",
            dist: "74%",
            flag: null,
          },
          {
            name: "Udaipur–Kota–South",
            ach: 88,
            primary: "₹5.1L",
            delta: "+6%",
            dist: "66%",
            flag: null,
          },
        ],
      },
    ],
    insights: [
      {
        id: 1,
        priority: "high",
        type: "Demand Signal + Expert Performance",
        region: "Delhi NCR · North Zone",
        headline:
          "Delhi pollution extending demand beyond season — expert prescriptions up 32%, campaign extension at 3.2x ROAS",
        subtitle:
          "AQI >250 for 18 consecutive days past normal. Nasal Mist premium SKU +22% WoW. Q-comm impulse purchases +48% WoW. Asymmetric opportunity.",
        kpis: [
          { label: "AQI Days >250", value: "18", note: "Past seasonal norm" },
          { label: "ENT Rx Share", value: "41%", note: "Stable, no erosion" },
          { label: "Nasal Mist WoW", value: "+22%", note: "Premium SKU" },
          { label: "Q-comm WoW", value: "+48%", note: "Blinkit/Zepto Delhi" },
        ],
        evidence: [
          {
            source: "CPCB + Google Trends",
            summary:
              "Delhi AQI >250 for 18 days past typical improvement. CPCB forecasts 2 more weeks. 'Nasal congestion relief' +45%, 'nasal spray' +38% above seasonal norms.",
          },
          {
            source: "IQVIA + Veeva",
            summary:
              "ENT prescriptions +32% vs seasonal norm. Otrivin holds 41% ENT share — stable. GP prescriptions +18%. Med rep coverage 78% of top-100 ENTs.",
          },
          {
            source: "DMS + Q-comm",
            summary:
              "Weekly primary ₹32L → ₹56L over 8 weeks. Blinkit/Zepto +48% WoW. Pharmacy driving 68% of incremental volume.",
          },
          {
            source: "Campaign Dashboard",
            summary:
              "CTR 2.1% (vs 1.6% benchmark). Paced to end Jan 31. Incremental 2-week extension projected at 3.2x ROAS.",
          },
        ],
        recommendation:
          "Extend digital campaign by 2 weeks with incremental A&P for pollution-specific creative. Leverage AQI data in ad copy targeting 'pollution relief' and 'nasal spray' terms. Ensure Nasal Mist fully stocked at all pharmacy outlets — trading-up opportunity. Verify Blinkit and Zepto stock levels across Delhi pin codes. Push to Delhi NCR field teams: full range availability at all outlets, prioritise Nasal Mist at premium pharmacies.",
        agentTrail: [
          {
            agent: "Orchestrator",
            icon: "◈",
            action:
              "Environmental signal: Delhi AQI anomaly persisting beyond respiratory season. Cross-checking expert Rx, sales, and campaign efficiency.",
            routing:
              "Dispatching to Environmental, Expert Performance, Commercial, and Campaign agents",
          },
          {
            agent: "Environmental Agent",
            icon: "◇",
            source: "CPCB · IMD · Google Trends",
            query:
              "cpcb_aqi(city='Delhi', timeframe='30d') | google_trends(['nasal congestion relief'], geo='IN-DL')",
            finding:
              "AQI >250 for 18 days past norm. 'Nasal congestion relief' +45%.",
            inference: "3–4 week extended demand window.",
          },
          {
            agent: "Expert Performance Agent",
            icon: "▣",
            source: "IQVIA · Veeva CRM",
            query: "iqvia_rx(therapy='nasal_decongestant', geo='Delhi_NCR')",
            finding: "ENT Rx +32%. Otrivin share 41% stable. GP +18%.",
            inference:
              "Expert channel capturing pollution demand. Share holding.",
          },
          {
            agent: "Campaign Agent",
            icon: "◆",
            source: "Campaign Dashboard · MMM",
            query: "campaign_metrics(brand='Otrivin', market='Delhi_NCR')",
            finding:
              "CTR 2.1% vs 1.6% benchmark. MMM projects 3.2x ROAS for extension.",
            inference:
              "Unusually high-ROI moment. Pausing cedes window to Vicks.",
          },
          {
            agent: "Synthesis",
            icon: "✦",
            finding: null,
            inference:
              "Confidence: MEDIUM-HIGH on duration (weather-dependent), HIGH on demand. Asymmetric opportunity — 3.2x ROAS with limited downside if AQI drops early.",
          },
        ],
      },
      {
        id: 2,
        priority: "high",
        type: "Seasonal Prep",
        region: "Madhya Pradesh",
        headline:
          "Pre-monsoon stocking critically thin — 4 of 8 MP distributors below 10 days cover",
        subtitle:
          "IMD forecasts monsoon 8–10 days early. Historical 25–35% demand spike. Orders must be placed by Wednesday.",
        kpis: [
          {
            label: "Avg Stock Cover",
            value: "12 days",
            note: "At normal rate",
          },
          {
            label: "Spike Rate Cover",
            value: "9 days",
            note: "If monsoon early",
          },
          {
            label: "At-Risk Distributors",
            value: "4 / 8",
            note: "Below 10 days",
          },
          { label: "Replenishment", value: "5–7 days", note: "From warehouse" },
        ],
        evidence: [
          {
            source: "IMD + Historical",
            summary:
              "IMD: monsoon onset Jun 18–22 vs normal Jun 28–30. 2024: 6 days early → 28% spike. 2023: 8 days early → 35% spike.",
          },
          {
            source: "DMS (Inventory)",
            summary:
              "4 of 8 MP distributors below 10 days. Bhopal, Indore, Jabalpur, Gwalior at risk. 5–7 day replenishment cycle.",
          },
        ],
        recommendation:
          "Place pre-emptive top-up orders with Bhopal, Indore, Jabalpur, Gwalior by Wednesday. Request 15% buffer stock for all MP distributors. Prepare early-activation monsoon digital campaign (week of Jun 15 vs normal Jun 25). Push to MP field teams: stock critically low, place orders immediately.",
        agentTrail: [
          {
            agent: "Orchestrator",
            icon: "◈",
            action:
              "Seasonal trigger: IMD early monsoon forecast. Checking inventory readiness.",
            routing:
              "Dispatching to Demand Forecasting and Distribution agents",
          },
          {
            agent: "Demand Forecasting",
            icon: "◇",
            source: "IMD · Historical Sales",
            query:
              "SELECT year, monsoon_onset_date, spike_pct FROM monsoon_impact_history WHERE zone='Central'",
            finding: "6–10 days early = 25–35% spike.",
            inference: "Current forecast matches high-impact pattern.",
          },
          {
            agent: "Distribution Agent",
            icon: "▣",
            source: "DMS — Distributor Inventory, MP",
            query:
              "SELECT distributor, stock_cover_days FROM distributor_inventory WHERE state='MP' AND product='Otrivin'",
            finding: "4 of 8 below 10 days even at normal rate.",
            inference: "Stockout before resupply if spike hits.",
          },
          {
            agent: "Synthesis",
            icon: "✦",
            finding: null,
            inference:
              "Confidence: MEDIUM-HIGH. Downside of inaction (stockouts) far outweighs over-stocking cost.",
          },
        ],
      },
    ],
  },
};

const brandList = Object.keys(brandData);

// ═══════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════

const SeverityIcon = ({ severity }) => {
  const isC = severity === "critical";
  return <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: isC ? C.redPale : C.orangePale, color: isC ? C.red : C.orange, fontSize: 14, flexShrink: 0 }}>{isC ? "!" : "◷"}</div>;
};

const PriorityBadge = ({ p }) => {
  const s = { critical: { bg: C.redPale, color: C.red, l: "CRITICAL" }, high: { bg: C.orangePale, color: C.orange, l: "HIGH PRIORITY" } }[p] || { bg: C.greenPale, color: C.green, l: "MEDIUM" };
  return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", padding: "3px 10px", background: s.bg, color: s.color }}>{s.l}</span>;
};

const StatusDot = ({ s }) => <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: { "on-track": C.green, "needs-attention": C.orange, "at-risk": C.red }[s], marginRight: 8, flexShrink: 0 }} />;

// ═══════════════════════════════════════════════════════
// AGENT TRAIL MODAL
// ═══════════════════════════════════════════════════════
const AgentTrailModal = ({ insight, onClose }) => {
  if (!insight) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(12,44,24,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 40 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.card, border: `1px solid ${C.border}`, width: "100%", maxWidth: 780, maxHeight: "85vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.18)" }}>
        <div style={{ padding: "20px 28px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ ...label, fontSize: 10, color: C.green, marginBottom: 6 }}>AGENT DECISION TRAIL</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.4 }}>{insight.headline}</div>
            <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>{insight.region}</div>
          </div>
          <div onClick={onClose} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: C.textLight, border: `1px solid ${C.border}`, background: C.card, flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = C.page; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.color = C.textLight; }}>✕</div>
        </div>
        <div style={{ overflow: "auto", padding: "24px 28px" }}>
          {insight.agentTrail.map((step, i) => {
            const isLast = i === insight.agentTrail.length - 1;
            const isSynthesis = step.agent === "Synthesis";
            const isOrch = step.agent === "Orchestrator";
            return (
              <div key={i} style={{ display: "flex", gap: 14, paddingBottom: isLast ? 0 : 20, marginBottom: isLast ? 0 : 20, borderBottom: isLast ? "none" : `1px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: isSynthesis ? C.greenPale : C.card, border: `1px solid ${isSynthesis ? C.sage : C.border}`, fontSize: 12 }}>{step.icon}</div>
                  {!isLast && <div style={{ width: 1, flex: 1, background: C.borderLight, marginTop: 6 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: isSynthesis ? C.green : C.text }}>{step.agent}</div>
                  {step.action && <div style={{ fontSize: 12, color: C.textMid, marginTop: 3, lineHeight: 1.5 }}>{step.action}</div>}
                  {step.routing && <div style={{ fontSize: 11, color: C.sage, marginTop: 3, fontStyle: "italic" }}>{step.routing}</div>}
                  {step.source && (
                    <div style={{ marginTop: 10, padding: "12px 16px", background: C.page, border: `1px solid ${C.borderLight}` }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: C.textLight, marginBottom: 6 }}>SOURCE: {step.source}</div>
                      {step.query && <div style={{ fontSize: 11, fontFamily: "'SF Mono', 'Fira Code', monospace", color: C.textLight, marginBottom: 10, wordBreak: "break-all", lineHeight: 1.5, padding: "8px 10px", background: C.card, borderRadius: 2 }}>{step.query}</div>}
                      <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: step.inference ? 6 : 0 }}><span style={{ fontWeight: 600 }}>Finding: </span>{step.finding}</div>
                      {step.inference && <div style={{ fontSize: 12, color: C.green, lineHeight: 1.6 }}><span style={{ fontWeight: 600 }}>Inference: </span>{step.inference}</div>}
                    </div>
                  )}
                  {isSynthesis && step.inference && (
                    <div style={{ marginTop: 10, padding: "14px 18px", background: C.greenPale, borderLeft: `3px solid ${C.sage}` }}>
                      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, fontWeight: 500 }}>{step.inference}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// BRAND INSIGHT CARD (combined recommendation)
// ═══════════════════════════════════════════════════════
const BrandInsightCard = ({ insight, isExpanded, onToggle, onShowTrail }) => (
  <div style={{ ...cardBase, marginBottom: 12, overflow: "hidden" }}>
    <div style={{ padding: "20px 28px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 16 }}
      onMouseEnter={e => e.currentTarget.style.background = "#FAFAF7"}
      onMouseLeave={e => e.currentTarget.style.background = C.card}>
      <div onClick={onToggle} style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1 }}>
        <SeverityIcon severity={insight.priority} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.45 }}>{insight.headline}</div>
          <div style={{ fontSize: 13, color: C.textMid, marginTop: 4, lineHeight: 1.5 }}>{insight.subtitle}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, marginTop: 2 }}>
        <div onClick={ev => { ev.stopPropagation(); onShowTrail(insight); }}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.green, background: C.card, transition: "all 0.15s", whiteSpace: "nowrap" }}
          onMouseEnter={e => e.currentTarget.style.background = C.greenPale}
          onMouseLeave={e => e.currentTarget.style.background = C.card}>
          <span style={{ fontSize: 12 }}>◈</span>Decision Trail
        </div>
        <span style={{ ...label, fontSize: 10 }}>{insight.type}</span>
        <span onClick={onToggle} style={{ fontSize: 12, color: C.sage, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", cursor: "pointer" }}>▾</span>
      </div>
    </div>

    {isExpanded && (
      <div style={{ borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: "18px 28px 12px", display: "flex", gap: 10, alignItems: "center" }}>
          <PriorityBadge p={insight.priority} />
          <span style={{ fontSize: 12, color: C.textLight }}>{insight.type} · {insight.region}</span>
        </div>

        {/* KPIs */}
        <div style={{ display: "flex", margin: "0 28px 20px", border: `1px solid ${C.border}` }}>
          {insight.kpis.map((k, i) => (
            <div key={i} style={{ flex: 1, padding: "16px 20px", borderRight: i < insight.kpis.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
              <div style={{ ...label, fontSize: 9, marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: C.text }}>{k.value}</div>
              <div style={{ fontSize: 11, color: C.textLight, marginTop: 3 }}>{k.note}</div>
            </div>
          ))}
        </div>

        {/* COMBINED RECOMMENDATION */}
        <div style={{ margin: "0 28px 20px", padding: "22px 24px", border: `1px solid ${C.border}` }}>
          <div style={{ ...label, fontSize: 10, color: C.orange, marginBottom: 14 }}>RECOMMENDED ACTIONS</div>
          <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>{insight.recommendation}</div>
        </div>

        {/* EVIDENCE */}
        <div style={{ margin: "0 28px 24px" }}>
          <div style={{ ...label, fontSize: 10, marginBottom: 12 }}>SUPPORTING EVIDENCE</div>
          <div style={{ background: C.page, padding: "20px 24px" }}>
            {insight.evidence.map((e, i) => (
              <div key={i} style={{ marginBottom: i < insight.evidence.length - 1 ? 14 : 0, paddingBottom: i < insight.evidence.length - 1 ? 14 : 0, borderBottom: i < insight.evidence.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 4 }}>{e.source}</div>
                <div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{e.summary}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

// ═══════════════════════════════════════════════════════
// REGION ROW (brand-specific — rich view)
// ═══════════════════════════════════════════════════════
const RegionRow = ({ r, isExpanded, onToggle }) => {
  const sc = { "on-track": C.green, "needs-attention": C.orange, "at-risk": C.red }[r.status];
  const statusLabel = { "on-track": "On Track", "needs-attention": "Needs Attention", "at-risk": "At Risk" }[r.status];
  return (
    <div style={{ ...cardBase, marginBottom: 12, overflow: "hidden" }}>
      {/* Collapsed header */}
      <div onClick={onToggle} style={{ padding: "18px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: 20 }}
        onMouseEnter={e => e.currentTarget.style.background = "#FAFAF7"}
        onMouseLeave={e => e.currentTarget.style.background = C.card}>
        <StatusDot s={r.status} />
        <div style={{ width: 140, fontSize: 14, fontWeight: 600, color: C.text }}>{r.name}</div>
        <div style={{ width: 130, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 4, background: C.borderLight, borderRadius: 2 }}>
            <div style={{ width: `${Math.min(r.achievement, 100)}%`, height: "100%", background: sc, borderRadius: 2 }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 700, color: sc, minWidth: 40, textAlign: "right" }}>{r.achievement}%</span>
        </div>
        <div style={{ flex: 1, fontSize: 13, color: C.textMid, lineHeight: 1.45 }}>{r.narrative.length > 120 ? r.narrative.slice(0, 120) + "…" : r.narrative}</div>
        <span style={{ fontSize: 12, color: C.sage, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
      </div>

      {/* Expanded detail */}
      {isExpanded && (
        <div style={{ borderTop: `1px solid ${C.border}` }}>
          {/* Status + Narrative */}
          <div style={{ padding: "20px 28px 16px" }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", padding: "3px 10px", background: sc === C.green ? C.greenPale : sc === C.orange ? C.orangePale : C.redPale, color: sc }}>{statusLabel.toUpperCase()}</span>
            <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, marginTop: 12 }}>{r.narrative}</div>
          </div>

          {/* Region KPI metrics row */}
          <div style={{ display: "flex", margin: "0 28px 20px", border: `1px solid ${C.border}` }}>
            {r.metrics.map((m, i) => (
              <div key={i} style={{ flex: 1, padding: "14px 18px", borderRight: i < r.metrics.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
                <div style={{ ...label, fontSize: 9, marginBottom: 6 }}>{m.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: m.negative ? C.red : C.text }}>{m.value}</div>
                {m.note && <div style={{ fontSize: 11, color: C.textLight, marginTop: 3 }}>{m.note}</div>}
              </div>
            ))}
          </div>

          {/* ASM Table + Weekly Trend side by side */}
          <div style={{ display: "flex", gap: 24, margin: "0 28px 20px" }}>
            {/* ASM Table */}
            <div style={{ flex: 1 }}>
              <div style={{ ...label, fontSize: 10, marginBottom: 12 }}>ASM AREA BREAKDOWN</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["ASM Area", "Ach.", "Primary (4W)", "Δ vs Prior", "Num. Dist."].map(h => (
                      <th key={h} style={{ ...label, fontSize: 9, textAlign: "left", padding: "8px 10px", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>{r.asmAreas.map((a, i) => {
                  const ac = a.ach >= 85 ? C.green : a.ach >= 75 ? C.orange : C.red;
                  const dc = a.delta.startsWith("−") || a.delta.startsWith("-") ? C.red : C.green;
                  return (
                    <tr key={i}>
                      <td style={{ fontSize: 13, color: C.text, padding: "10px 10px", borderBottom: `1px solid ${C.borderLight}`, fontWeight: 500 }}>
                        {a.name}
                        {a.flag && <div style={{ fontSize: 11, color: C.orange, marginTop: 3, fontWeight: 400 }}>⚑ {a.flag}</div>}
                      </td>
                      <td style={{ fontSize: 13, fontWeight: 700, color: ac, padding: "10px 10px", borderBottom: `1px solid ${C.borderLight}` }}>{a.ach}%</td>
                      <td style={{ fontSize: 13, color: C.text, padding: "10px 10px", borderBottom: `1px solid ${C.borderLight}` }}>{a.primary}</td>
                      <td style={{ fontSize: 13, fontWeight: 600, color: dc, padding: "10px 10px", borderBottom: `1px solid ${C.borderLight}` }}>{a.delta}</td>
                      <td style={{ fontSize: 13, color: C.text, padding: "10px 10px", borderBottom: `1px solid ${C.borderLight}` }}>{a.dist}</td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>

            {/* Weekly Trend Chart */}
            <div style={{ width: 240, flexShrink: 0 }}>
              <div style={{ ...label, fontSize: 10, marginBottom: 12 }}>WEEKLY ACHIEVEMENT INDEX</div>
              <div style={{ height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={r.weeklyTrend} barCategoryGap="18%">
                    <XAxis dataKey="w" tick={{ fontSize: 9, fill: C.textLight }} axisLine={{ stroke: C.border }} tickLine={false} />
                    <Bar dataKey="v" radius={[2,2,0,0]} opacity={0.85}
                      fill={sc}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ fontSize: 10, color: C.textLight, textAlign: "center", marginTop: 4 }}>Target = 100</div>
            </div>
          </div>

          {/* Key Win / Key Risk */}
          <div style={{ display: "flex", gap: 16, margin: "0 28px 24px" }}>
            <div style={{ flex: 1, padding: "14px 18px", background: C.greenPale }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.green, letterSpacing: "0.06em", marginBottom: 5 }}>KEY WIN</div>
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.55 }}>{r.keyWin}</div>
            </div>
            <div style={{ flex: 1, padding: "14px 18px", background: C.orangePale }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.orange, letterSpacing: "0.06em", marginBottom: 5 }}>KEY RISK</div>
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.55 }}>{r.keyRisk}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN — BRAND MANAGER VIEW
// ═══════════════════════════════════════════════════════
export default function BrandPulse() {
  const [selectedBrand, setSelectedBrand] = useState("Otrivin");
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [expandedRegion, setExpandedRegion] = useState(null);
  const [trailInsight, setTrailInsight] = useState(null);

  const brand = brandData[selectedBrand];

  return (
    <div className="overflow-auto" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: C.page, height: "100vh", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Source+Serif+4:wght@300;400;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: C.header, padding: "22px 40px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 22, fontWeight: 300, color: "#FFFFFF" }}>Questt Market Pulse</span>
            <span style={{ fontSize: 12, color: "#FFFFFF50" }}>·</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", letterSpacing: "0.04em" }}>Brand Manager View</span>
          </div>
          <span style={{ fontSize: 12, color: "#FFFFFF90" }}>Haleon India · North Region · Week ending Feb 2, 2026</span>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 40px 60px" }}>

        {/* Brand Header + Summary */}
        <div style={{ ...cardBase, padding: "28px 32px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
            <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 26, fontWeight: 400, color: C.text }}>{selectedBrand}</span>
            <span style={{ fontSize: 13, color: C.textLight }}>{brand.tagline}</span>
          </div>
          <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.65, maxWidth: 900 }}>{brand.summary}</div>
        </div>

        {/* KPIs */}
        <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
          {brand.kpis.map((kpi, i) => (
            <div key={i} style={{ ...cardBase, padding: "22px 24px", flex: 1 }}>
              <div style={{ ...label, fontSize: 10, marginBottom: 12 }}>{kpi.label}</div>
              <div style={{ fontSize: 32, fontWeight: 600, color: C.text, lineHeight: 1 }}>{kpi.value}</div>
              <div style={{ fontSize: 12, color: kpi.negative ? C.orange : C.green, marginTop: 8 }}>{kpi.delta}</div>
            </div>
          ))}
        </div>



        {/* Insights */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>This Week's Actions</h2>
            <span style={{ fontSize: 12, color: C.textLight }}>{brand.insights.length} active · click to expand</span>
          </div>
          {brand.insights.map(ins => (
            <BrandInsightCard key={ins.id} insight={ins} isExpanded={expandedInsight === ins.id} onToggle={() => setExpandedInsight(expandedInsight === ins.id ? null : ins.id)} onShowTrail={setTrailInsight} />
          ))}
        </div>

        {/* Regional Performance */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Regional Performance</h2>
            <span style={{ fontSize: 12, color: C.textLight }}>{brand.regions.length} regions · ASM drill-down</span>
          </div>
          {brand.regions.map(r => (
            <RegionRow key={r.name} r={r} isExpanded={expandedRegion === r.name} onToggle={() => setExpandedRegion(expandedRegion === r.name ? null : r.name)} />
          ))}
        </div>
      </div>

      {trailInsight && <AgentTrailModal insight={trailInsight} onClose={() => setTrailInsight(null)} />}
    </div>
  );
}

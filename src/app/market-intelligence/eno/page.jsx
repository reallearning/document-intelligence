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
  Eno: {
    tagline: "Antacid · Sachet + Bottle",
    summary: "Under competitive pressure in Rajasthan from Gas-O-Fast's regional-language campaign. Category demand healthy (+6%) but share being redirected. Wedding season approaching — sachet format critical. Rest of territory stable.",
    kpis: [
      { label: "BRAND ACHIEVEMENT", value: "78%", delta: "−8% vs LYSM", negative: true },
      { label: "VALUE SHARE (NORTH)", value: "61.2%", delta: "−1.2pp vs last period", negative: true },
      { label: "CATEGORY GROWTH", value: "+6%", delta: "Demand healthy" },
      { label: "PRIORITY ACTIONS", value: "2", delta: "1 critical, 1 high" },
    ],
    shareTrend: [
      { period: "W48", brand: 63.1, competitor: 17.8 }, { period: "W49", brand: 62.9, competitor: 18.0 },
      { period: "W50", brand: 62.8, competitor: 18.3 }, { period: "W51", brand: 62.5, competitor: 18.6 },
      { period: "W52", brand: 62.1, competitor: 19.0 }, { period: "W1", brand: 61.6, competitor: 19.4 },
      { period: "W2", brand: 61.4, competitor: 19.6 }, { period: "W3", brand: 61.2, competitor: 19.8 },
    ],
    regions: [
      { name: "Rajasthan", achievement: 68, status: "at-risk",
        narrative: "Gas-O-Fast regional campaign causing share loss in Jaipur–Jodhpur corridor. Sachet SKU most affected (−32%). Weighted distribution stable — this is a conversion problem, not availability.",
        keyWin: "Udaipur–Kota holding steady at 76% — no competitive activity there yet",
        keyRisk: "Gas-O-Fast SOV doubled to 24%. Wedding season in 8 weeks will amplify whichever brand owns sachet shelf",
        metrics: [
          { label: "Primary Sales Δ", value: "−22%", negative: true },
          { label: "Numeric Dist.", value: "72%", note: "Stable" },
          { label: "Sachet Mix", value: "58%", note: "vs 65% plan" },
          { label: "Stock Cover", value: "14 days", note: "Adequate" },
        ],
        weeklyTrend: [{w:"W48",v:92},{w:"W49",v:88},{w:"W50",v:84},{w:"W51",v:79},{w:"W52",v:75},{w:"W1",v:72},{w:"W2",v:70},{w:"W3",v:68}],
        asmAreas: [
          { name: "Jaipur–North Rajasthan", ach: 62, primary: "₹3.0L", delta: "−28%", dist: "74%", flag: "Gas-O-Fast 14 ad sets active" },
          { name: "Udaipur–Kota–South", ach: 76, primary: "₹4.1L", delta: "−6%", dist: "71%", flag: null },
        ],
      },
      { name: "Delhi NCR", achievement: 91, status: "on-track",
        narrative: "Stable. Sachet performing well in GT channel. No competitive threat. Strong pharmacy presence supporting repeat purchase. Category search stable.",
        keyWin: "Sachet repeat rate 72% in South Delhi GT — highest in North zone",
        keyRisk: "No material risk. Monitor Gas-O-Fast for potential NCR spillover from Rajasthan campaign",
        metrics: [
          { label: "Primary Sales Δ", value: "+4%", negative: false },
          { label: "Numeric Dist.", value: "81%", note: "Above target" },
          { label: "Sachet Mix", value: "62%", note: "On plan" },
          { label: "Stock Cover", value: "18 days", note: "Healthy" },
        ],
        weeklyTrend: [{w:"W48",v:86},{w:"W49",v:88},{w:"W50",v:89},{w:"W51",v:90},{w:"W52",v:91},{w:"W1",v:90},{w:"W2",v:91},{w:"W3",v:91}],
        asmAreas: [
          { name: "South Delhi + Gurgaon", ach: 94, primary: "₹6.8L", delta: "+6%", dist: "84%", flag: null },
          { name: "Noida + East Delhi", ach: 88, primary: "₹5.2L", delta: "+2%", dist: "78%", flag: null },
        ],
      },
      { name: "UP West", achievement: 74, status: "needs-attention",
        narrative: "Repeat rate declining in Lucknow. Dolo 650 margin scheme pulling chemist attention from Eno shelf space. Sachet availability dropping in Kanpur.",
        keyWin: "Agra–Aligarh holding at 79% — strong distributor relationship",
        keyRisk: "Lucknow chemist shelf share dropping as Dolo scheme pulls counter attention. Eno sachet being deprioritised at 8 of top-30 chemists",
        metrics: [
          { label: "Primary Sales Δ", value: "−12%", negative: true },
          { label: "Numeric Dist.", value: "68%", note: "−3pp vs prior" },
          { label: "Sachet Mix", value: "54%", note: "Below plan" },
          { label: "Stock Cover", value: "11 days", note: "Tight" },
        ],
        weeklyTrend: [{w:"W48",v:88},{w:"W49",v:86},{w:"W50",v:83},{w:"W51",v:80},{w:"W52",v:78},{w:"W1",v:76},{w:"W2",v:75},{w:"W3",v:74}],
        asmAreas: [
          { name: "Lucknow–Kanpur", ach: 70, primary: "₹3.8L", delta: "−16%", dist: "64%", flag: "Dolo margin scheme spillover" },
          { name: "Agra–Aligarh", ach: 79, primary: "₹4.4L", delta: "−6%", dist: "72%", flag: null },
        ],
      },
      { name: "UP East", achievement: 82, status: "needs-attention",
        narrative: "Mixed performance. Agra–Mathura strong. Varanasi–Allahabad and Gorakhpur below plan — distributor activation stalled in both territories.",
        keyWin: "Agra pharmacy channel delivering 68% repeat — aligned with Sensodyne pharmacy-first playbook",
        keyRisk: "Varanasi distributor inactive for 3 weeks. Gorakhpur sachet stock at 6 days",
        metrics: [
          { label: "Primary Sales Δ", value: "−5%", negative: true },
          { label: "Numeric Dist.", value: "65%", note: "−1pp" },
          { label: "Sachet Mix", value: "60%", note: "Near plan" },
          { label: "Stock Cover", value: "13 days", note: "OK" },
        ],
        weeklyTrend: [{w:"W48",v:90},{w:"W49",v:89},{w:"W50",v:87},{w:"W51",v:86},{w:"W52",v:84},{w:"W1",v:83},{w:"W2",v:82},{w:"W3",v:82}],
        asmAreas: [
          { name: "Agra–Mathura", ach: 88, primary: "₹5.1L", delta: "+2%", dist: "73%", flag: null },
          { name: "Varanasi–Allahabad", ach: 74, primary: "₹3.2L", delta: "−11%", dist: "58%", flag: "Distributor inactive 3 weeks" },
          { name: "Gorakhpur–East", ach: 81, primary: "₹2.9L", delta: "−4%", dist: "62%", flag: "Sachet stock 6 days" },
        ],
      },
      { name: "Madhya Pradesh", achievement: 85, status: "on-track",
        narrative: "Steady. Summer heat expected to drive category demand. Pre-monsoon stocking adequate for Eno. Bhopal distribution strong.",
        keyWin: "Bhopal numeric distribution at 78% — highest MP has achieved for Eno",
        keyRisk: "Gwalior–East lagging. Rural penetration still low at 31%",
        metrics: [
          { label: "Primary Sales Δ", value: "+3%", negative: false },
          { label: "Numeric Dist.", value: "71%", note: "Improving" },
          { label: "Sachet Mix", value: "63%", note: "On plan" },
          { label: "Stock Cover", value: "16 days", note: "Healthy" },
        ],
        weeklyTrend: [{w:"W48",v:80},{w:"W49",v:81},{w:"W50",v:82},{w:"W51",v:83},{w:"W52",v:84},{w:"W1",v:84},{w:"W2",v:85},{w:"W3",v:85}],
        asmAreas: [
          { name: "Bhopal–Indore", ach: 87, primary: "₹5.6L", delta: "+5%", dist: "78%", flag: null },
          { name: "Jabalpur–Gwalior–East", ach: 82, primary: "₹3.4L", delta: "0%", dist: "63%", flag: "Rural dist. 31%" },
        ],
      },
    ],
    insights: [
      {
        id: 1, priority: "critical", type: "Competitive Alert", region: "Rajasthan · North Zone",
        headline: "Gas-O-Fast regional campaign redirecting antacid demand in Jaipur–Jodhpur corridor",
        subtitle: "Share down 1.2pp while category grew 6%. 14 Rajasthani-language Meta ad sets since Jan 18. Wedding season approaching — sachet format 3x more important.",
        indicatorType: "leading", // leading = forward-looking, lagging = reactive
        kpis: [
          { label: "Share Change", value: "−1.2pp", note: "62.4% → 61.2%" },
          { label: "Gas-O-Fast Gain", value: "+1.7pp", note: "18.1% → 19.8%" },
          { label: "Jaipur Primary", value: "−28%", note: "₹4.2L → ₹3.0L" },
          { label: "Sachet Impact", value: "−32%", note: "Jaipur sachet SKU" },
        ],
        evidence: [
          { source: "Nielsen IQ", summary: "Value share declined 62.4% → 61.2% (−1.2pp) in North zone. Gas-O-Fast gained 1.7pp to 19.8%. Category grew 6% — competitive share loss, not demand decline. Weighted distribution stable at 78%." },
          { source: "Google Trends + Amazon", summary: "'Gas relief sachet' in Rajasthan +18% over 4 weeks. 'Eno' search flat, 'Gas-O-Fast' +42%. Amazon 'antacid sachet' Jaipur +22% with Gas-O-Fast in top sponsored results." },
          { source: "Meta Ad Library", summary: "Gas-O-Fast running 14 active ad sets in Rajasthani language since Jan 18 — 3x normal load. Targeting Jaipur–Jodhpur corridor. Share of voice moved 12% → 24%." },
          { source: "Instagram + Social Listening", summary: "Gas-O-Fast 'longer lasting relief' Reels gaining traction — 3.2x engagement vs their baseline. 12 micro-influencers activated in Rajasthan. Eno mentions flat. No negative sentiment — this is media capture, not product issue." },
          { source: "DMS (Internal)", summary: "Jaipur ASM: −28%. Jodhpur ASM: −22%. Udaipur: −8%. Kota: −3%. Decline matches campaign targeting. Sachet SKU most affected." },
        ],
        recommendation: "Brief Jaipur and Jodhpur ASMs to counter-detail top 50 chemists this week. Request ₹1-off trade scheme on sachets for Rajasthan (4 weeks). Commission Rajasthani-language counter-campaign on Meta and YouTube targeting 'gas relief' and 'acidity remedy'. Increase sachet sampling at wedding-season events. Ensure sachet stock-up ahead of April.",
        pastValidation: {
          title: "Similar action worked before",
          detail: "In Q2 2024, Gas-O-Fast ran a similar regional push in Gujarat. Counter-detailing top 40 chemists + ₹0.50 trade scheme recovered 0.8pp share within 6 weeks. Wedding season timing amplified recovery to +1.1pp by June.",
          outcome: "+1.1pp share recovery",
          confidence: "High — same competitor, same tactic, similar market"
        },
        syncedTo: { 
          system: "Sales Watchtower", 
          targets: ["Jaipur ASM — Rahul Sharma", "Udaipur ASM — Priya Mehra"], 
          status: "Pushed today 7:02am",
          fieldBrief: [
            { target: "Rahul Sharma (Jaipur ASM)", brief: "Gas-O-Fast campaign active in your territory — 14 regional-language ads since Jan 18. Sachet SKU down 32%. Priority this week: Counter-detail top 25 chemists, push sachet placement at counter, collect competitor scheme intel. Wedding season in 8 weeks — sachet positioning now determines who captures that demand." },
            { target: "Priya Mehra (Udaipur ASM)", brief: "Gas-O-Fast campaign not yet active in your territory but spillover likely. Monitor for regional ads. Sensodyne ₹20 pharmacy playbook ready for replication — brief distributor this week. Sachet stock healthy but confirm levels ahead of wedding season." },
          ]
        },
        agentTrail: [
          { agent: "Orchestrator", icon: "◈", action: "Detected anomaly: Eno primary declining in Rajasthan while category search volume and Nielsen category growth both rising", routing: "Dispatching to Market Share, Consumer Demand, Competitive Media, and Commercial Performance agents" },
          { agent: "Market Share Agent", icon: "▣", source: "Nielsen IQ — North Zone Antacid", query: "SELECT brand, value_share, share_change_pp FROM nielsen_category_share WHERE category='Antacid' AND zone='North' AND period='Jan-26'", finding: "Eno 62.4% → 61.2% (−1.2pp). Gas-O-Fast +1.7pp. Category +6%. Distribution stable.", inference: "Losing share to Gas-O-Fast specifically. Category healthy — competitive, not demand-side." },
          { agent: "Consumer Demand Agent", icon: "◉", source: "Google Trends · Amazon Search", query: "google_trends(keywords=['gas relief sachet','eno','gas-o-fast'], geo='IN-RJ', timeframe='4w') | amazon_search('antacid sachet', geo='Jaipur')", finding: "'Gas relief sachet' +18%. 'Eno' flat. 'Gas-O-Fast' +42%. Amazon: Gas-O-Fast in top sponsored positions.", inference: "Category demand rising but being captured by competitor's regional-language content strategy." },
          { agent: "Competitive Media Agent", icon: "◆", source: "Meta Ad Library · Social SOV", query: "meta_ad_library(advertiser='Gas-O-Fast', region='Rajasthan', timeframe='4w')", finding: "14 active ad sets in Rajasthani since Jan 18 — 3x normal. SOV moved 12% → 24%.", inference: "Sustained, well-resourced regional campaign — not one-off burst." },
          { agent: "Commercial Performance", icon: "▣", source: "DMS (Bizom) — Rajasthan", query: "SELECT asm_territory, pct_change, sku_split FROM dms_primary_sales WHERE state='Rajasthan' AND brand='Eno'", finding: "Jaipur −28%, Jodhpur −22%. Sachet −32% Jaipur. Pattern matches campaign targeting.", inference: "Impact concentrated in urban Rajasthan on sachet format — consistent with competitor targeting." },
          { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Four signals converge — Nielsen share loss, Google/Amazon demand redirection, Meta campaign mechanism, DMS geographic concentration. Coordinated competitive attack via regional-language digital. Counter-action needed in Jaipur–Jodhpur ahead of wedding season." },
        ],
      },
      {
        id: 2, priority: "high", type: "Seasonal Opportunity", region: "All Regions",
        headline: "Wedding season approaching — sachet demand historically spikes 15–20% in April–May",
        subtitle: "Heavy meals during weddings drive antacid demand. Sachet format 3x more important. Stock positioning and placement critical across Rajasthan and UP.",
        indicatorType: "leading",
        kpis: [
          { label: "Historical Uplift", value: "15–20%", note: "April–May period" },
          { label: "Sachet Index", value: "3x", note: "vs non-wedding" },
          { label: "Key Regions", value: "RJ, UP", note: "Highest wedding density" },
          { label: "Weeks to Season", value: "~8", note: "Planning window" },
        ],
        evidence: [
          { source: "Historical Sales (3yr)", summary: "April–May consistently shows 15–20% antacid uplift driven by heavy meals at wedding functions. 2024: +18%. 2023: +16%. Sachet format drives 70% of incremental volume." },
          { source: "Google Trends", summary: "'Gas after heavy meal', 'acidity remedy' search terms spike 2–3 weeks before wedding season peak. Rajasthan and UP show highest correlation." },
          { source: "Social Listening", summary: "Wedding-related food and health conversations spike 3 weeks before season on Instagram and regional platforms. 'Heavy meal' + 'acidity' co-mentions up 4x in April historically." },
          { source: "DMS (Stock Cover)", summary: "Current sachet stock cover adequate at most distributors. Rajasthan sachet stock reduced due to Gas-O-Fast displacement — needs replenishment before season." },
        ],
        recommendation: "Ensure sachet stock-up across all Rajasthan and UP distributors by end-March. Place sachets at high-footfall general stores and chemists near wedding venues. Activate 'wedding season' digital campaign targeting 'heavy meal relief' in Rajasthan and UP. Coordinate with field teams to identify high-density wedding geographies for targeted placement.",
        pastValidation: {
          title: "Seasonal prep delivered last year",
          detail: "In 2024, pre-positioning sachets 4 weeks before wedding season in UP captured +18% incremental volume. Distributors who stocked early vs late saw 2.3x better fill rate during peak week.",
          outcome: "+18% incremental, 2.3x fill rate advantage",
          confidence: "High — consistent 3-year pattern"
        },
        syncedTo: { 
          system: "Sales Watchtower", 
          targets: ["Rajasthan RSM — Vikram Singh", "UP West RSM"], 
          status: "Pushed today 7:02am",
          fieldBrief: [
            { target: "Vikram Singh (Rajasthan RSM)", brief: "Wedding season in 8 weeks. Sachet format drives 70% of incremental volume. Confirm stock levels at all 6 Jaipur distributors — need 3+ weeks cover. Rajasthan stock depleted from Gas-O-Fast displacement, priority replenishment needed. Map large wedding venues for targeted placement." },
            { target: "UP West RSM", brief: "Wedding season prep — sachet stock-up across all distributors by end-March. Historical: UP shows 16–18% uplift. Identify high-density wedding geographies in Lucknow–Kanpur corridor for targeted chemist placement." },
          ]
        },
        agentTrail: [
          { agent: "Orchestrator", icon: "◈", action: "Seasonal trigger: Wedding season approaching. Cross-referencing historical demand patterns with current stock position.", routing: "Dispatching to Demand Forecasting and Distribution agents" },
          { agent: "Demand Forecasting Agent", icon: "◇", source: "Historical Sales DB · Google Trends", query: "SELECT year, month, category_uplift_pct, sachet_share_of_incremental FROM seasonal_demand WHERE category='Antacid' AND trigger='wedding_season'", finding: "Consistent 15–20% uplift. Sachet 70% of incremental. Rajasthan and UP highest impact.", inference: "Predictable seasonal pattern. 8-week planning window sufficient if action starts now." },
          { agent: "Distribution Agent", icon: "▣", source: "DMS — Distributor Inventory", query: "SELECT state, sku, stock_cover_days FROM distributor_inventory WHERE brand='Eno' AND sku_type='sachet'", finding: "Most distributors adequate. Rajasthan sachet stocks depleted from competitive displacement.", inference: "Rajasthan needs priority replenishment. Rest of territory fine with normal top-up." },
          { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Well-established seasonal pattern. Risk is Rajasthan sachet availability given Gas-O-Fast displacement. Window to act is now — 8 weeks before peak." },
        ],
      },
    ],
  },
};

const brandList = Object.keys(brandData);

// ═══════════════════════════════════════════════════════
// PAST RECOMMENDATIONS — Per brand track record
// ═══════════════════════════════════════════════════════
const pastRecommendations = {
  Eno: [
    { id: 1, quarter: "Q4 2025", month: "Nov", region: "Gujarat", type: "Counter-Campaign",
      suggestion: "Counter Gas-O-Fast regional push with trade scheme + counter-detailing",
      executed: true, executedBy: "Gujarat RSM",
      outcome: "+1.1pp share recovery", outcomeType: "positive",
      detail: "Recovered 0.8pp in 6 weeks via counter-detailing top 40 chemists. Wedding season timing amplified to +1.1pp.",
      linkedTo: "Current Rajasthan counter-campaign" },
    { id: 2, quarter: "Q3 2025", month: "Sep", region: "MP", type: "Seasonal Prep",
      suggestion: "Pre-stock sachets for Bhopal wedding belt ahead of Oct-Nov season",
      executed: false, executedBy: null,
      outcome: "−8pp share loss", outcomeType: "negative",
      detail: "Gas-O-Fast moved first. Share dropped 64% → 56% during peak wedding weeks. Recovery took 8 weeks.",
      linkedTo: "Current wedding season prep" },
    { id: 3, quarter: "Q2 2025", month: "Jun", region: "Rajasthan", type: "Seasonal",
      suggestion: "Activate wedding season sachet push in Jaipur-Jodhpur",
      executed: true, executedBy: "Rajasthan RSM",
      outcome: "+18% incremental volume", outcomeType: "positive",
      detail: "Sachets placed at 120 wedding-adjacent outlets. 70% of incremental volume from sachet format.",
      linkedTo: "Current wedding season recommendation" },
    { id: 4, quarter: "Q2 2025", month: "May", region: "UP West", type: "Distribution",
      suggestion: "Expand sachet availability to 150 additional GT outlets in Lucknow",
      executed: true, executedBy: "UP West ASM",
      outcome: "+12% numeric distribution", outcomeType: "positive",
      detail: "Numeric distribution moved from 34% to 46%. Sachet now visible in tier-2 outlets.",
      linkedTo: null },
    { id: 5, quarter: "Q1 2025", month: "Mar", region: "Delhi NCR", type: "Pricing",
      suggestion: "Hold price on Eno sachet despite competitor increase",
      executed: true, executedBy: "Category Head",
      outcome: "+0.6pp share gain", outcomeType: "positive",
      detail: "Gas-O-Fast raised price 8%. We held. Captured price-sensitive switchers.",
      linkedTo: null },
  ],
};

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

// Sync Badge with expandable field brief
const SyncBadge = ({ syncedTo }) => {
  const [showFieldBrief, setShowFieldBrief] = useState(false);
  return (
    <div style={{ marginTop: 16, background: C.bluePale, border: `1px solid ${C.blue}20` }}>
      <div 
        onClick={() => setShowFieldBrief(!showFieldBrief)}
        style={{ padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}
      >
        <span style={{ fontSize: 12, color: C.blue, marginTop: 1 }}>→</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 4 }}>SYNCED TO {syncedTo.system.toUpperCase()}</div>
          <div style={{ fontSize: 12, color: C.text }}>{syncedTo.targets.join(", ")}</div>
          <div style={{ fontSize: 10, color: C.textLight, marginTop: 2 }}>{syncedTo.status}</div>
        </div>
        {syncedTo.fieldBrief && (
          <span style={{ fontSize: 11, color: C.blue, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            {showFieldBrief ? "Hide" : "View"} Field Brief
            <span style={{ transform: showFieldBrief ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
          </span>
        )}
      </div>
      
      {/* Expanded Field Brief */}
      {showFieldBrief && syncedTo.fieldBrief && (
        <div style={{ borderTop: `1px solid ${C.blue}15`, padding: "16px" }}>
          {syncedTo.fieldBrief.map((fb, i) => (
            <div key={i} style={{ 
              marginBottom: i < syncedTo.fieldBrief.length - 1 ? 12 : 0,
              paddingBottom: i < syncedTo.fieldBrief.length - 1 ? 12 : 0,
              borderBottom: i < syncedTo.fieldBrief.length - 1 ? `1px solid ${C.blue}10` : "none"
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.blue, marginBottom: 4 }}>{fb.target}</div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{fb.brief}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
          {insight.indicatorType && (
            <span style={{ 
              fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", padding: "3px 8px", 
              background: insight.indicatorType === "leading" ? C.bluePale : C.page, 
              color: insight.indicatorType === "leading" ? C.blue : C.textMid,
              border: `1px solid ${insight.indicatorType === "leading" ? C.blue + "30" : C.border}`
            }}>
              {insight.indicatorType === "leading" ? "↗ LEADING" : "↙ LAGGING"}
            </span>
          )}
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

        {/* SUGGESTED ACTIONS */}
        <div style={{ margin: "0 28px 20px", padding: "22px 24px", border: `1px solid ${C.border}` }}>
          <div style={{ ...label, fontSize: 10, color: C.orange, marginBottom: 14 }}>SUGGESTED ACTIONS</div>
          <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>{insight.recommendation}</div>
          
          {/* Past Validation */}
          {insight.pastValidation && (
            <div style={{ marginTop: 16, padding: "14px 16px", background: C.greenPale, borderLeft: `3px solid ${C.sage}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.green, marginBottom: 6 }}>✓ {insight.pastValidation.title}</div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: 6 }}>{insight.pastValidation.detail}</div>
              <div style={{ display: "flex", gap: 16 }}>
                <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>Outcome: {insight.pastValidation.outcome}</span>
                <span style={{ fontSize: 11, color: C.textLight }}>Confidence: {insight.pastValidation.confidence}</span>
              </div>
            </div>
          )}
          
          {/* Synced to Sales Watchtower badge with expandable field brief */}
          {insight.syncedTo && (
            <SyncBadge syncedTo={insight.syncedTo} />
          )}
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
  const [selectedBrand, setSelectedBrand] = useState("Eno");
  const [activeTab, setActiveTab] = useState("pulse");
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [expandedRegion, setExpandedRegion] = useState(null);
  const [trailInsight, setTrailInsight] = useState(null);

  const brand = brandData[selectedBrand];
  const brandRecs = pastRecommendations[selectedBrand] || [];
  const brandStats = {
    total: brandRecs.length,
    executed: brandRecs.filter(r => r.executed).length,
    positive: brandRecs.filter(r => r.outcomeType === "positive").length,
    negative: brandRecs.filter(r => r.outcomeType === "negative").length,
  };

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

      {/* Brand Selector + Tabs */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "0 40px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>          
          {/* Tabs */}
          <div style={{ display: "flex", gap: 32 }}>
            {[
              { k: "pulse", l: "Weekly Pulse" },
              { k: "track", l: "Past Recommendations" },
            ].map(t => (
              <div key={t.k} onClick={() => setActiveTab(t.k)}
                style={{ 
                  fontSize: 14, fontWeight: activeTab === t.k ? 600 : 400, 
                  color: activeTab === t.k ? C.text : C.textLight, 
                  padding: "14px 0", 
                  borderBottom: activeTab === t.k ? `2px solid ${C.green}` : "2px solid transparent", 
                  cursor: "pointer",
                  transition: "all 0.15s"
                }}>
                {t.l}
                {t.k === "track" && (
                  <span style={{ 
                    marginLeft: 8, fontSize: 10, fontWeight: 600, 
                    padding: "2px 6px", background: C.greenPale, color: C.green,
                    borderRadius: 2
                  }}>
                    {brandStats.executed}/{brandStats.total}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 40px 60px" }}>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB: WEEKLY PULSE */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {activeTab === "pulse" && (
          <>
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
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB: PAST RECOMMENDATIONS */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {activeTab === "track" && (
          <>
            {/* Summary Stats */}
            <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
              <div style={{ ...cardBase, padding: "22px 24px", flex: 1 }}>
                <div style={{ ...label, fontSize: 10, marginBottom: 8 }}>TOTAL FOR {selectedBrand.toUpperCase()}</div>
                <div style={{ fontSize: 36, fontWeight: 600, color: C.text }}>{brandStats.total}</div>
                <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>Last 3 quarters</div>
              </div>
              <div style={{ ...cardBase, padding: "22px 24px", flex: 1 }}>
                <div style={{ ...label, fontSize: 10, marginBottom: 8 }}>EXECUTION RATE</div>
                <div style={{ fontSize: 36, fontWeight: 600, color: C.green }}>{brandStats.total > 0 ? Math.round((brandStats.executed / brandStats.total) * 100) : 0}%</div>
                <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>{brandStats.executed} of {brandStats.total} executed</div>
              </div>
              <div style={{ ...cardBase, padding: "22px 24px", flex: 1 }}>
                <div style={{ ...label, fontSize: 10, marginBottom: 8 }}>POSITIVE OUTCOMES</div>
                <div style={{ fontSize: 36, fontWeight: 600, color: C.green }}>{brandStats.positive}</div>
                <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>When executed</div>
              </div>
              <div style={{ ...cardBase, padding: "22px 24px", flex: 1 }}>
                <div style={{ ...label, fontSize: 10, marginBottom: 8 }}>MISSED OPPORTUNITIES</div>
                <div style={{ fontSize: 36, fontWeight: 600, color: C.red }}>{brandStats.negative}</div>
                <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>When not executed</div>
              </div>
            </div>

            {/* Recommendations List */}
            <div style={{ ...cardBase, overflow: "hidden" }}>
              {/* Table Header */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "90px 100px 1fr 100px 140px", 
                gap: 16, 
                padding: "14px 24px", 
                background: C.page, 
                borderBottom: `1px solid ${C.border}` 
              }}>
                <div style={{ ...label, fontSize: 9 }}>PERIOD</div>
                <div style={{ ...label, fontSize: 9 }}>REGION</div>
                <div style={{ ...label, fontSize: 9 }}>RECOMMENDATION</div>
                <div style={{ ...label, fontSize: 9 }}>STATUS</div>
                <div style={{ ...label, fontSize: 9 }}>OUTCOME</div>
              </div>

              {/* Table Rows */}
              {brandRecs.map((r, i) => (
                <div key={r.id} style={{ 
                  display: "grid", 
                  gridTemplateColumns: "90px 100px 1fr 100px 140px", 
                  gap: 16, 
                  padding: "18px 24px", 
                  borderBottom: i < brandRecs.length - 1 ? `1px solid ${C.borderLight}` : "none",
                  alignItems: "start"
                }}>
                  {/* Period */}
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{r.quarter}</div>
                    <div style={{ fontSize: 11, color: C.textLight }}>{r.month}</div>
                  </div>
                  
                  {/* Region */}
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{r.region}</div>
                    <div style={{ fontSize: 10, color: C.textLight }}>{r.type}</div>
                  </div>
                  
                  {/* Recommendation */}
                  <div>
                    <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5, marginBottom: 6 }}>{r.suggestion}</div>
                    <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>{r.detail}</div>
                    {r.linkedTo && (
                      <div style={{ 
                        marginTop: 8, fontSize: 11, color: C.blue, 
                        display: "inline-flex", alignItems: "center", gap: 4,
                        padding: "3px 8px", background: C.bluePale, borderRadius: 2
                      }}>
                        ↗ Informs: {r.linkedTo}
                      </div>
                    )}
                  </div>
                  
                  {/* Status */}
                  <div>
                    <span style={{ 
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                      padding: "4px 10px", 
                      background: r.executed ? C.greenPale : C.redPale,
                      color: r.executed ? C.green : C.red
                    }}>
                      {r.executed ? "EXECUTED" : "NOT EXEC"}
                    </span>
                    {r.executedBy && (
                      <div style={{ fontSize: 10, color: C.textLight, marginTop: 6 }}>{r.executedBy}</div>
                    )}
                  </div>
                  
                  {/* Outcome */}
                  <div>
                    <div style={{ 
                      fontSize: 14, fontWeight: 700, 
                      color: r.outcomeType === "positive" ? C.green : r.outcomeType === "negative" ? C.red : C.orange 
                    }}>
                      {r.outcome}
                    </div>
                    <div style={{ 
                      marginTop: 4, fontSize: 10, fontWeight: 600, letterSpacing: "0.04em",
                      color: r.outcomeType === "positive" ? C.green : r.outcomeType === "negative" ? C.red : C.orange,
                      textTransform: "uppercase"
                    }}>
                      {r.outcomeType}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Insight callout */}
            <div style={{ ...cardBase, marginTop: 24, padding: "20px 24px", borderLeft: `3px solid ${C.sage}` }}>
              <div style={{ fontSize: 14, color: C.text, lineHeight: 1.6 }}>
                <span style={{ fontWeight: 600 }}>For {selectedBrand}:</span> {brandStats.executed} of {brandStats.total} recommendations were executed, 
                with {brandStats.positive} delivering positive outcomes. 
                {brandStats.negative > 0 && ` The ${brandStats.negative} recommendation(s) not executed resulted in competitor gains or missed opportunities.`}
                {brandRecs.filter(r => r.linkedTo).length > 0 && ` ${brandRecs.filter(r => r.linkedTo).length} past outcomes directly inform this week's recommendations.`}
              </div>
            </div>
          </>
        )}
      </div>

      {trailInsight && <AgentTrailModal insight={trailInsight} onClose={() => setTrailInsight(null)} />}
    </div>
  );
}

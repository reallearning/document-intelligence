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
// PORTFOLIO SUMMARY — Simple, direct
// ═══════════════════════════════════════════════════════
const portfolioSummary = {
  headline: "3 brands need attention this week",
  bullets: [
    { brand: "Eno", status: "pressure", text: "Losing to Gas-O-Fast in Rajasthan. New competitor ads visible on Meta." },
    { brand: "Crocin", status: "pressure", text: "Pharmacy velocity dropping in UP West. ASMs hearing about competitor margins." },
    { brand: "Sensodyne", status: "pressure", text: "New entrant Sensodent gaining in e-commerce. Pharmacy-first strategy is our moat." },
    { brand: "Otrivin", status: "good", text: "Riding pollution demand in Delhi. Campaign extension recommended." },
  ]
};

// ═══════════════════════════════════════════════════════
// FUNNEL STAGES — Consumer journey metrics (our data only)
// ═══════════════════════════════════════════════════════
const funnelStages = [
  {
    id: "awareness",
    name: "Awareness",
    metrics: [
      { label: "Share of Search", value: "42%", delta: "Flat", isGood: true },
      { label: "Share of Voice", value: "38%", delta: "−1pp", isGood: false },
    ],
    prompts: [
      { q: "Why is SOV down?", a: "Our media spend in North region was flat while Google Trends shows 'Gas-O-Fast' search volume in Rajasthan up 40% over the past 4 weeks. Meta Ad Library shows they've launched multiple new ads targeting Rajasthan since mid-January. We're likely losing share of voice to their regional push." },
      { q: "What's Gas-O-Fast doing?", a: "From what we can observe:\n\n• Google Trends: 'Gas-O-Fast' searches in Rajasthan +40% (vs Eno flat)\n• Meta Ad Library: New ads visible since mid-January — creatives are in Hindi with regional messaging\n• Social mentions: r/india and regional subs showing organic mentions of Gas-O-Fast increasing\n\nField teams in Jaipur report seeing Gas-O-Fast visibility increasing at chemist counters." },
      { q: "Break down by platform", a: "Our Share of Search by platform (Haleon data):\n\n• Google: 44% (Flat)\n• Amazon: 38% (−2pp) — we're seeing more competitor products in search results\n• Blinkit/Zepto: 41% (+1pp) — holding steady\n\nNote: Competitor SOV data is estimated based on search trends and ad library observations, not precise measurement." },
    ],
  },
  {
    id: "consideration",
    name: "Consideration",
    hasIssue: true,
    metrics: [
      { label: "Avg CTR", value: "1.8%", delta: "−0.2pp", isGood: false },
      { label: "Search Rank", value: "#2", delta: "↓1", isGood: false },
    ],
    prompts: [
      { q: "Why is CTR down?", a: "Our CTR decline is concentrated in Rajasthan (1.6% → 1.1%). This coincides with:\n\n• Increased competitor ad activity visible in Meta Ad Library\n• Google Trends showing rising search interest in Gas-O-Fast\n• Our own Amazon data showing Eno dropping from position #2 to #3 for 'antacid' searches in North region\n\nOtrivin CTR is actually up to 2.4% riding pollution-related demand." },
      { q: "Where are we losing rank?", a: "Based on our Amazon Seller Central and Brand Analytics data:\n\n• Eno dropped from #2 to #3 for 'antacid' in North region\n• Competitor (likely Gas-O-Fast based on search trends) now appearing above us in sponsored results\n• Our organic rank holding\n\nWe can't see competitor bids or spend, but their increased visibility suggests active investment." },
      { q: "Break down by region", a: "Our CTR by region (Haleon campaign data):\n\n• Delhi NCR: 2.1% (+0.2pp) — Otrivin driving this\n• Rajasthan: 1.1% (−0.5pp) — Eno pressure\n• UP West: 1.6% (−0.1pp) — Slight softness\n• UP East: 1.9% (+0.1pp) — Sensodyne gains\n• MP: 1.7% (Flat)\n\nRajasthan is the clear problem area, aligning with competitor activity signals." },
    ],
  },
  {
    id: "conversion",
    name: "Conversion",
    hasIssue: true,
    metrics: [
      { label: "Market Share", value: "58%", delta: "−0.8pp", isGood: false },
      { label: "ROAS", value: "2.4x", delta: "+0.2x", isGood: true },
    ],
    prompts: [
      { q: "Why is share down?", a: "Nielsen data shows portfolio share down 0.8pp, driven by:\n\n1. **Eno (−1.2pp in North)**: Correlates with competitor activity signals in Rajasthan. Our Jaipur primary sales down 28%.\n\n2. **Crocin (−0.6pp in UP West)**: Field teams report chemists mentioning competitor margin schemes. Not confirmed systematically, but multiple ASMs hearing similar feedback.\n\nOtrivin (+0.4pp) and Sensodyne (+0.8pp) partially offsetting." },
      { q: "Break down by channel", a: "Our market share by channel (Nielsen + internal):\n\n• Pharmacy: 64% (−1pp) — hearing margin pressure anecdotally\n• GT: 48% (Flat)\n• E-comm: 52% (+2pp) — online growing\n• Q-comm: 58% (+4pp) — strong Otrivin growth\n\nPharmacy softness aligns with field reports about competitor trade schemes, though we don't have systematic data on competitor margins." },
      { q: "What are ASMs hearing about Dolo?", a: "Field intel (not systematically verified):\n\n• 3 ASMs in UP West independently mentioned hearing about Dolo offering better chemist margins\n• Estimated gap mentioned: 5-6pp higher than our terms\n• Concentrated feedback from Lucknow and Kanpur\n\nThis is anecdotal but consistent pattern. IQVIA prescription data still shows Crocin leading in doctor prescriptions — suggests this is trade-driven, not consumer preference shift." },
    ],
  },
  {
    id: "repeat",
    name: "Repeat & Sentiment",
    metrics: [
      { label: "R&R Score", value: "4.2★", delta: "Stable", isGood: true },
      { label: "Repeat Rate", value: "34%", delta: "+2pp", isGood: true },
    ],
    prompts: [
      { q: "Which brand has best repeat?", a: "Based on our e-commerce and loyalty data:\n\n• Sensodyne: 41% (+3pp) — pharmacy recommendation driving loyalty\n• Eno: 38% (+1pp) — sachets create habit\n• Crocin: 36% (+1pp) — stable\n• Otrivin: 32% (+2pp) — seasonal but growing\n\nSensodyne's pharmacy-first strategy appears to create stronger repeat behavior than GT-led distribution." },
      { q: "R&R breakdown by platform", a: "Our R&R scores by platform (from our Brand Analytics):\n\n• Amazon: 4.3★ (+0.1)\n• Blinkit: 4.1★ (Flat)\n• Zepto: 4.2★ (+0.1)\n• 1mg: 4.4★ (+0.2)\n• Flipkart: 4.0★ (−0.1)\n\nNo major issues. Some Flipkart reviews mention delivery delays — not product related." },
      { q: "Any sentiment issues?", a: "Social listening (BrandWatch) shows:\n\n• No negative sentiment spikes for any brand\n• Otrivin getting positive mentions related to pollution relief\n• No concerning patterns in reviews or social mentions\n\nSentiment is healthy across portfolio. No product quality or safety concerns surfacing." },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// CRITICAL ITEMS (ticker)
// ═══════════════════════════════════════════════════════
const criticalItems = [
  { id: 1, severity: "critical", headline: "Eno losing ground in Rajasthan — competitor campaign activity detected", detail: "Nielsen North zone: Eno −1.2pp while category grew 6%. Google Trends shows Gas-O-Fast searches up 40%. New competitor ads visible in Meta Ad Library. Jaipur primary sales −28%. Wedding season approaching — action urgent.", category: "Eno" },
  { id: 2, severity: "critical", headline: "Crocin pharmacy velocity dropping in UP West — field reports suggest margin pressure", detail: "Our velocity down 18% in Lucknow. ASMs report hearing about competitor margin schemes. Consumer search stable — this appears trade-driven and recoverable.", category: "Crocin" },
  { id: 3, severity: "high", headline: "Sensodyne ₹20 reorder rate in Agra at 85% — pharmacy-first playbook validated", detail: "Pharmacy: 92% reorder. GT: 28%. Three adjacent districts (Mathura, Firozabad, Etah) ready for replication.", category: "Sensodyne" },
  { id: 4, severity: "high", headline: "IMD forecasts monsoon 8 days early — pre-load Crocin and Otrivin at MP distributors", detail: "4 of 8 MP distributors below 10 days stock cover. Historical: early monsoon triggers 25–35% demand spike. Orders must be placed by Wednesday.", category: "Crocin" },
  { id: 5, severity: "high", headline: "Otrivin riding extended pollution demand — IQVIA prescriptions up 32%, campaign extension needed", detail: "AQI >250 for 18 days past seasonal norm. Nasal Mist premium SKU +22% WoW. Campaign paced to end Jan 31 — needs 2-week extension.", category: "Otrivin" },
];

// ═══════════════════════════════════════════════════════
// PAST RECOMMENDATIONS — Full track record
// ═══════════════════════════════════════════════════════
const pastRecommendations = [
  // Q4 2025
  { id: 1, quarter: "Q4 2025", month: "Dec", brand: "Sensodyne", region: "UP East", type: "Activation",
    suggestion: "Launch ₹20 trial pack via pharmacy-first activation in Lucknow",
    executed: true, executedBy: "Lucknow ASM",
    outcome: "+14% vs control group", outcomeValue: 14, outcomeType: "positive",
    detail: "Pharmacy reorder rate hit 92% vs 28% in GT. Now being replicated to Agra and 3 adjacent districts.",
    linkedTo: "Current Agra expansion recommendation" },
  { id: 2, quarter: "Q4 2025", month: "Nov", brand: "Otrivin", region: "Delhi NCR", type: "Campaign Extension",
    suggestion: "Extend Diwali pollution campaign by 10 days given AQI forecast",
    executed: true, executedBy: "Marketing Head",
    outcome: "2.8x ROAS achieved", outcomeValue: 2.8, outcomeType: "positive",
    detail: "Nasal Mist trading-up hit 31%. Q-comm captured 22% of incremental volume. Vicks lost 3pp during window.",
    linkedTo: "Current pollution extension recommendation" },
  { id: 3, quarter: "Q4 2025", month: "Nov", brand: "Eno", region: "Gujarat", type: "Counter-Campaign",
    suggestion: "Counter Gas-O-Fast regional push with trade scheme + counter-detailing",
    executed: true, executedBy: "Gujarat RSM",
    outcome: "+1.1pp share recovery", outcomeValue: 1.1, outcomeType: "positive",
    detail: "Recovered 0.8pp in 6 weeks via counter-detailing top 40 chemists. Wedding season timing amplified to +1.1pp by month end.",
    linkedTo: "Current Rajasthan counter-campaign recommendation" },
  { id: 4, quarter: "Q4 2025", month: "Oct", brand: "Crocin", region: "Maharashtra", type: "Trade Scheme",
    suggestion: "Match Dolo 650 margin scheme in Mumbai pharmacy channel",
    executed: true, executedBy: "Mumbai ASM",
    outcome: "Held share (0pp change)", outcomeValue: 0, outcomeType: "neutral",
    detail: "Prevented further erosion but didn't recover lost ground. Competitor scheme still active. Need sustained effort.",
    linkedTo: null },
  { id: 5, quarter: "Q4 2025", month: "Oct", brand: "Centrum", region: "Delhi NCR", type: "Distribution",
    suggestion: "Expand Centrum to 200 additional GT outlets in South Delhi",
    executed: false, executedBy: null,
    outcome: "Missed opportunity — competitor filled gap", outcomeValue: -5, outcomeType: "negative",
    detail: "Revital expanded into 180 of targeted outlets first. Lost estimated ₹8L monthly run-rate.",
    linkedTo: null },
  // Q3 2025
  { id: 6, quarter: "Q3 2025", month: "Sep", brand: "Eno", region: "MP", type: "Seasonal Prep",
    suggestion: "Pre-stock sachets for Bhopal wedding belt ahead of Oct-Nov season",
    executed: false, executedBy: null,
    outcome: "Competitor captured 8pp share", outcomeValue: -8, outcomeType: "negative",
    detail: "Gas-O-Fast moved first with aggressive trade scheme. Share dropped 64% → 56% during peak wedding weeks. Recovery took 8 weeks.",
    linkedTo: "Current wedding season prep recommendation" },
  { id: 7, quarter: "Q3 2025", month: "Sep", brand: "Otrivin", region: "MP", type: "Seasonal Prep",
    suggestion: "Pre-load Otrivin at MP distributors ahead of monsoon tail + pollution onset",
    executed: true, executedBy: "MP RSM",
    outcome: "+22% vs prior year", outcomeValue: 22, outcomeType: "positive",
    detail: "Zero stockouts during Sep-Oct demand spike. Captured full demand while competitors faced supply gaps.",
    linkedTo: "Current monsoon stocking recommendation" },
  { id: 8, quarter: "Q3 2025", month: "Aug", brand: "Sensodyne", region: "Rajasthan", type: "Expert Detailing",
    suggestion: "Increase dentist detailing frequency in Jaipur from 2x to 4x monthly",
    executed: true, executedBy: "Medical Affairs",
    outcome: "+18% prescription share", outcomeValue: 18, outcomeType: "positive",
    detail: "ENT prescription share moved from 34% to 40% in Jaipur. ROI on incremental med rep cost: 3.4x.",
    linkedTo: null },
  { id: 9, quarter: "Q3 2025", month: "Aug", brand: "Iodex", region: "UP West", type: "Counter-Campaign",
    suggestion: "Counter Moov rural van campaign with sub-stockist activation",
    executed: true, executedBy: "UP West RSM",
    outcome: "+0.4pp share (partial recovery)", outcomeValue: 0.4, outcomeType: "neutral",
    detail: "Slowed share loss but didn't fully recover. Moov's rural infrastructure advantage persists. Structural challenge.",
    linkedTo: null },
  { id: 10, quarter: "Q3 2025", month: "Jul", brand: "Crocin", region: "Tamil Nadu", type: "Pricing",
    suggestion: "Hold price on Crocin 500 despite input cost pressure",
    executed: true, executedBy: "Category Head",
    outcome: "Maintained volume share", outcomeValue: 0, outcomeType: "neutral",
    detail: "Dolo raised price, we held. Volume share stable. Margin compressed 2pp but avoided share loss.",
    linkedTo: null },
  // Q2 2025
  { id: 11, quarter: "Q2 2025", month: "Jun", brand: "Eno", region: "Rajasthan", type: "Seasonal",
    suggestion: "Activate wedding season sachet push in Jaipur-Jodhpur",
    executed: true, executedBy: "Rajasthan RSM",
    outcome: "+18% incremental volume", outcomeValue: 18, outcomeType: "positive",
    detail: "Sachets placed at 120 wedding-adjacent outlets. 70% of incremental volume came from sachet format.",
    linkedTo: "Current wedding season recommendation" },
  { id: 12, quarter: "Q2 2025", month: "May", brand: "Otrivin", region: "North Zone", type: "Q-comm",
    suggestion: "Prioritize Blinkit/Zepto stock availability in Delhi NCR",
    executed: true, executedBy: "E-com Manager",
    outcome: "+34% Q-comm share", outcomeValue: 34, outcomeType: "positive",
    detail: "First-mover in nasal spray Q-comm availability. Vicks followed 6 weeks later. Established channel leadership.",
    linkedTo: null },
];

// Summary stats
const trackRecordStats = {
  total: pastRecommendations.length,
  executed: pastRecommendations.filter(r => r.executed).length,
  positive: pastRecommendations.filter(r => r.outcomeType === "positive").length,
  neutral: pastRecommendations.filter(r => r.outcomeType === "neutral").length,
  negative: pastRecommendations.filter(r => r.outcomeType === "negative").length,
  avgLiftWhenExecuted: "+12.4%",
  avgLossWhenNotExecuted: "−6.5pp",
};

// ═══════════════════════════════════════════════════════
// ALL INSIGHTS (Eno, Otrivin first, then rest)
// ═══════════════════════════════════════════════════════
const insights = [
  {
    id: 1, priority: "critical", type: "Competitive Alert", category: "Eno", region: "Rajasthan · North Zone",
    funnelStage: "consideration", // Links to funnel
    headline: "Eno losing ground in Rajasthan — competitor campaign activity detected",
    subtitle: "Eno value share down 1.2pp in North zone while antacid category grew 6%. Google Trends and Meta Ad Library suggest Gas-O-Fast push.",
    kpis: [
      { label: "Eno Share Change", value: "−1.2pp", note: "62.4% → 61.2%" },
      { label: "Gas-O-Fast Gain", value: "+1.7pp", note: "18.1% → 19.8%" },
      { label: "Category Growth", value: "+6%", note: "Demand is healthy" },
      { label: "Jaipur Primary Drop", value: "−28%", note: "₹4.2L → ₹3.0L" },
    ],
    evidence: [
      { source: "Nielsen IQ", summary: "Eno value share declined 62.4% → 61.2% (−1.2pp) in North zone. Gas-O-Fast gained 1.7pp to 19.8%. Antacid category grew 6% — competitive share loss, not demand decline. Eno weighted distribution stable at 78%." },
      { source: "Google Trends", summary: "'Gas relief sachet' searches in Rajasthan +18% over 4 weeks. 'Eno' search flat, 'Gas-O-Fast' +42%. Category demand is rising but being redirected to competitor." },
      { source: "Meta Ad Library", summary: "Gas-O-Fast has multiple new ads visible targeting North India since mid-January. Ad creatives are in Hindi. We can see the ads exist but not their spend levels or targeting parameters." },
      { source: "Social Listening (BrandWatch)", summary: "Gas-O-Fast mentions in Rajasthan up 2x vs prior month. 'Longer lasting relief' narrative appearing in organic conversations. No negative Eno sentiment — this is awareness capture, not product issue." },
      { source: "DMS (Internal Sales)", summary: "Jaipur ASM: −28%. Jodhpur ASM: −22%. Udaipur: −8%. Kota: −3%. Decline concentrated in Jaipur–Jodhpur corridor. Sachet SKU most affected (−32% Jaipur)." },
    ],
    salesAction: "Brief Jaipur and Jodhpur ASMs to counter-detail top 50 chemists. Request ₹1-off trade scheme on Eno sachets for Rajasthan for 4 weeks. Prioritise sachet placement at high-footfall general stores and large chemists near wedding venues.",
    marketingAction: "Commission Rajasthani-language counter-campaign on Meta and YouTube targeting 'gas relief' and 'acidity remedy' search terms. Increase Eno sachet sampling at wedding-season events in Jaipur–Jodhpur.",
    pastValidation: {
      title: "Similar action worked in Gujarat Q2 2024",
      detail: "Gas-O-Fast ran similar regional push. Counter-detailing top 40 chemists + ₹0.50 trade scheme recovered 0.8pp share within 6 weeks. Wedding season timing amplified to +1.1pp.",
      outcome: "+1.1pp share recovery",
    },
    syncedTo: { 
      system: "Sales Watchtower", 
      targets: ["Jaipur ASM — Rahul Sharma", "Udaipur ASM — Priya Mehra"], 
      status: "Pushed today 7:02am",
      fieldBrief: [
        { target: "Rahul Sharma (Jaipur ASM)", brief: "Gas-O-Fast campaign appears active in your territory — Google Trends and social mentions up significantly. Sachet SKU down 32%. Priority: Counter-detail top 25 chemists, push sachet visibility, gather intel on competitor schemes. Wedding season 8 weeks out." },
        { target: "Priya Mehra (Udaipur ASM)", brief: "Campaign signals not yet strong in Udaipur but spillover likely. Monitor and confirm sachet stock levels ahead of wedding season." },
      ]
    },
    // Actions triggered across the system
    triggeredActions: [
      { 
        action: "Counter-detailing priority list",
        status: "complete",
        statusLabel: "Pushed to ASMs",
        detail: "50 high-value chemists in Jaipur-Jodhpur corridor"
      },
      { 
        action: "Trade scheme",
        status: "pending",
        statusLabel: "Pending approval",
        detail: "₹1-off sachet scheme for 4 weeks (₹1.8L budget)"
      },
      { 
        action: "Stock-up order",
        status: "ready",
        statusLabel: "Ready to activate",
        detail: "Sachet replenishment queued for 6 Rajasthan distributors"
      },
    ],
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Detected anomaly: Eno primary sales declining in Rajasthan while category search volume and Nielsen category growth both rising", routing: "Dispatching to Market Share Agent, Consumer Demand Agent, Competitive Signal Agent, and Commercial Performance Agent for triangulation" },
      { agent: "Market Share Agent", icon: "▣", source: "Nielsen IQ — North Zone Antacid Category", query: "SELECT brand, value_share, volume_share, share_change_pp, weighted_distribution FROM nielsen_category_share WHERE category='Antacid' AND zone='North' AND period='Jan-26'", finding: "Eno value share 62.4% → 61.2% (−1.2pp). Gas-O-Fast 18.1% → 19.8% (+1.7pp). Category grew 6%. Weighted distribution stable — this is a conversion shift, not availability.", inference: "Eno is losing share specifically to Gas-O-Fast. Category is healthy. Problem is competitive, not demand-side." },
      { agent: "Consumer Demand Agent", icon: "◉", source: "Google Trends · Social Listening", query: "google_trends(keywords=['gas relief sachet','eno','gas-o-fast'], geo='IN-RJ', timeframe='4w') | brandwatch_mentions(category='antacid', geo='Rajasthan')", finding: "Google Trends: 'gas relief sachet' Rajasthan +18%. 'Eno' flat. 'Gas-o-fast' +42%. Social listening shows Gas-O-Fast mentions up 2x in regional conversations.", inference: "Category demand rising but Gas-O-Fast capturing incremental search interest. Regional conversation shifting." },
      { agent: "Competitive Signal Agent", icon: "◆", source: "Meta Ad Library · BrandWatch", query: "meta_ad_library(advertiser='Gas-O-Fast', region='India') | brandwatch_sov(category='antacid', geo='Rajasthan')", finding: "Meta Ad Library shows new Gas-O-Fast ads visible since mid-January, appearing to target North India with regional language content. BrandWatch shows their share of mentions in Rajasthan roughly doubled.", inference: "Competitor has launched a campaign. We can see ad presence but not spend levels, targeting specifics, or engagement metrics." },
      { agent: "Commercial Performance Agent", icon: "▣", source: "DMS (Bizom) — Rajasthan ASM Territories", query: "SELECT asm_territory, eno_primary_sales_4w, eno_primary_sales_prev_4w, pct_change, sku_split FROM dms_primary_sales WHERE state='Rajasthan' AND brand='Eno' ORDER BY pct_change ASC", finding: "Jaipur ASM: −28% (₹4.2L → ₹3.0L). Jodhpur ASM: −22%. Udaipur: −8%. Kota: −3%. Sachet SKU most impacted (−32% Jaipur).", inference: "Impact concentrated in urban Rajasthan, heaviest on sachet format — consistent with where we're seeing increased competitor search activity." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: MEDIUM-HIGH. Multiple signals align — Nielsen confirms share loss to Gas-O-Fast, Google Trends shows their search rising while ours flat, Meta Ad Library confirms campaign existence, DMS shows geographic concentration. Evidence points to competitive campaign, though we cannot verify competitor spend or precise targeting. Counter-action recommended for Jaipur–Jodhpur ahead of wedding season." },
    ],
  },
  {
    id: 2, priority: "high", type: "Demand Signal + Expert Performance", category: "Otrivin", region: "Delhi NCR · North Zone",
    funnelStage: "conversion", // Demand already there, capturing it
    headline: "Delhi pollution extending Otrivin demand beyond season — expert prescriptions and AQI driving sustained pull",
    subtitle: "AQI >250 for 18 consecutive days past normal. IQVIA expert prescriptions up 32%. Otrivin at 112% of target. Campaign extension opportunity.",
    kpis: [
      { label: "Achievement", value: "112%", note: "Of target" },
      { label: "IQVIA Rx Uplift", value: "+32%", note: "vs seasonal norm" },
      { label: "Search Uplift", value: "+45%", note: "Above seasonal norm" },
      { label: "Nasal Mist Growth", value: "+22% WoW", note: "Premium SKU" },
    ],
    evidence: [
      { source: "CPCB + Google Trends", summary: "Delhi AQI >250 for 18 consecutive days past typical late-January improvement. CPCB forecasts 2 more weeks of elevated levels. Google 'nasal congestion relief' +45% and 'nasal spray' +38% above seasonal norms." },
      { source: "Veeva & IQVIA (Expert Performance)", summary: "ENT specialist prescriptions for nasal decongestants in Delhi NCR up 32% vs seasonal norm. Otrivin holds 41% of ENT prescription share — stable, no competitive erosion. GP prescriptions also +18%." },
      { source: "Reddit + Social Listening", summary: "r/delhi threads on 'pollution congestion relief' up 5x in Jan. Otrivin mentioned in 52% of product recommendations vs Vicks 31%. Instagram 'nasal spray for AQI' mentions up 3.5x." },
      { source: "DMS + Q-comm (Gobble Cube)", summary: "Otrivin at 112% target. Weekly primary ₹32L → ₹56L over 8 weeks. Blinkit/Zepto +48% WoW — impulse purchase on AQI spike days. Pharmacy driving 68% of incremental." },
      { source: "Campaign Performance", summary: "CTR 2.1% (vs 1.6% benchmark). Paced to end Jan 31. Incremental 2-week extension projected at 3.2x ROAS. Pausing cedes window to Vicks." },
    ],
    salesAction: "Maintain full Otrivin range in Delhi NCR. Ensure Nasal Mist premium SKU fully stocked at pharmacy outlets — trading-up opportunity. Verify Blinkit and Zepto stock levels across Delhi pin codes.",
    marketingAction: "Extend digital campaign by 2 weeks beyond Jan 31 pacing. Request incremental A&P for pollution-specific creative — leverage AQI data in ad copy. Target 'pollution relief' and 'nasal spray' search terms. 3.2x ROAS projection justifies investment.",
    pastValidation: {
      title: "Similar AQI extension worked Nov 2024",
      detail: "During Diwali pollution spike, 10-day campaign extension at similar AQI levels delivered 2.8x ROAS. Nasal Mist saw 31% trading-up from base spray.",
      outcome: "2.8x ROAS, 31% trading-up",
    },
    syncedTo: { 
      system: "Sales Watchtower", 
      targets: ["Delhi NCR RSM", "South Delhi ASM", "Noida ASM"], 
      status: "Pushed today 7:02am",
      fieldBrief: [
        { target: "South Delhi ASM", brief: "Pollution demand continuing — AQI >250 for 18 days past norm. Ensure full range at all outlets. Prioritise Nasal Mist at premium pharmacies — 31% trading-up last time. Verify Blinkit/Zepto stock." },
        { target: "Noida ASM", brief: "Pharmacy driving 68% of incremental volume — focus outlet coverage there. Q-comm +48% WoW, verify stock levels. Extended demand window for 2 more weeks." },
      ]
    },
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Environmental signal detected: Delhi NCR AQI anomaly persisting beyond normal respiratory season. Cross-checking with expert prescriptions, commercial performance, and campaign efficiency.", routing: "Dispatching to Environmental Agent, Expert Performance Agent, Commercial Performance Agent, and Campaign Agent" },
      { agent: "Environmental Data Agent", icon: "◇", source: "CPCB Delhi · IMD Forecast · Google Trends", query: "cpcb_aqi(city='Delhi', timeframe='30d') | imd_forecast(city='Delhi', range='14d') | google_trends(keywords=['nasal congestion relief','nasal spray','pollution relief'], geo='IN-DL', timeframe='8w')", finding: "AQI >250 for 18 consecutive days past typical late-January improvement. IMD forecasts 2 more weeks before sustained improvement. Google 'nasal congestion relief' +45%, 'nasal spray' +38% above seasonal norms.", inference: "Pollution-driven respiratory demand extending 3–4 weeks beyond normal season. Environmental tailwind creating extended sales window." },
      { agent: "Expert Performance Agent", icon: "▣", source: "IQVIA Prescription Analytics · Veeva CRM", query: "iqvia_rx(therapy='nasal_decongestant', specialty=['ENT','GP'], geo='Delhi_NCR', timeframe='4w') | veeva_coverage(product='Otrivin', target_hcps='top_100_ent', month='Jan-26')", finding: "ENT prescriptions for nasal decongestants +32% vs seasonal norm. Otrivin prescription share 41% (stable). GP prescriptions +18%. Veeva: 78% coverage of top-100 Delhi ENTs in January.", inference: "Expert channel responding to pollution demand. Otrivin share holding — uplift is category-wide. Good med rep coverage means positioned to capture expert-driven demand." },
      { agent: "Commercial Performance Agent", icon: "▣", source: "DMS · Gobble Cube (Q-comm)", query: "dms_primary(product='Otrivin', territory='Delhi_NCR', timeframe='8w') | gobblecube_qcomm(brand='Otrivin', city='Delhi', platform=['Blinkit','Zepto'])", finding: "112% of target. Weekly ₹32L → ₹56L over 8 weeks. Nasal Mist +22% WoW. Q-comm +48% WoW — impulse purchase aligned with AQI spike days. South Delhi + Gurgaon at 125%, Noida + East Delhi at 98%.", inference: "Capturing demand well across pharmacy and Q-comm. Q-comm surge validates consumer impulse-purchasing in response to daily AQI awareness." },
      { agent: "Campaign Performance Agent", icon: "◆", source: "Campaign Dashboard · MMM Model", query: "campaign_metrics(brand='Otrivin', market='Delhi_NCR', timeframe='3w') | mmm_roas(brand='Otrivin', scenario='incremental_2w')", finding: "Current campaign: CTR 2.1% (vs 1.6% benchmark), conversion 0.8%, reach 1.2M. Paced to end Jan 31. MMM projects 3.2x ROAS for incremental spend during elevated AQI — above 2.0x threshold.", inference: "Campaign performing above benchmark. Extended AQI window = unusually high-ROI moment. Pausing cedes opportunity to Vicks." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: MEDIUM-HIGH on duration (weather-dependent), HIGH on demand reality. Environmental data, IQVIA prescriptions, Google Trends, Q-comm data, and internal sales all confirm extended demand. Asymmetric opportunity: incremental spend has 3.2x projected ROAS. If AQI drops early, downside limited. Recommend campaign extension + full stock availability across pharmacy and Q-comm." },
    ],
  },
  {
    id: 3, priority: "critical", type: "Competitive Alert", category: "Crocin", region: "UP West",
    funnelStage: "conversion", // Trade-driven, at point of purchase
    headline: "Crocin losing pharmacy velocity in UP West — field reports suggest competitor margin scheme",
    subtitle: "ASMs hearing reports of better Dolo margins at chemists. Our velocity down 18%. Consumer search stable — trade-driven, recoverable.",
    kpis: [
      { label: "Reported Margin Gap", value: "~5-6pp", note: "Anecdotal from field" },
      { label: "Our Velocity Drop", value: "−18%", note: "Lucknow pharmacy" },
      { label: "Rx Leadership", value: "Intact", note: "IQVIA confirms" },
      { label: "Consumer Search", value: "Stable", note: "Not a demand issue" },
    ],
    evidence: [
      { source: "Field Reports (SFA)", summary: "3 ASMs in Lucknow, Kanpur, Allahabad independently reported hearing from chemists that Dolo 650 is offering better retail margins — estimates suggest 5-6pp higher than Crocin. Anecdotal but consistent pattern." },
      { source: "DMS + IQVIA", summary: "Our Crocin velocity in Lucknow pharmacy channel down 18% over 2 weeks. IQVIA shows Crocin still leads in doctor prescriptions across UP West — disconnect between prescription preference and what's being pushed at counter." },
      { source: "Google Trends", summary: "Consumer search for 'paracetamol' and 'crocin' in UP stable. No consumer preference shift. Pattern suggests trade-level margin play rather than demand issue." },
    ],
    salesAction: "Escalate margin gap to trade marketing. Push Crocin Advance positioning (higher-margin SKU absorbs better trade terms). Schedule joint ASM visits to top 20 lost Lucknow chemists. Highlight IQVIA doctor-prescription leadership in chemist conversations.",
    marketingAction: "Launch 'Trusted since 1964' pharmacy POS campaign in UP West. Leverage IQVIA prescription data in counter materials. Digital campaign targeting 'paracetamol trusted brand' to reinforce consumer pull.",
    nudgeConnection: "Push to UP West ASMs: 'We're hearing reports of Dolo margin schemes in Lucknow — visit your key chemists this week to understand the situation. Bring Crocin Advance samples. Highlight doctor prescription data.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Flagged: Crocin pharmacy velocity drop in UP West exceeding variance threshold (−18% in 2W)", routing: "Dispatching to Field Intelligence Agent, Distribution Agent, and Consumer Demand Agent" },
      { agent: "Field Intelligence Agent", icon: "◆", source: "SFA (FieldAssist) — ASM Reports, UP West", query: "SELECT asm_name, report_date, issue_type, competitor_brand, details FROM asm_field_reports WHERE state='UP_West' AND issue_type='competitive_activity' AND date >= DATE_SUB(NOW(), INTERVAL 14 DAY)", finding: "3 ASMs independently reported hearing from chemists about better Dolo margins. Estimated 5-6pp gap mentioned. Concentrated in Lucknow and Kanpur.", inference: "Anecdotal but consistent reports suggest margin scheme. Not systematically verified, but pattern worth investigating." },
      { agent: "Distribution Agent", icon: "▣", source: "DMS — Pharmacy Channel · IQVIA Prescription Data", query: "SELECT city, crocin_velocity_current, crocin_velocity_4w_ago, pct_change FROM pharmacy_velocity WHERE state='UP_West' | iqvia_rx(molecule='paracetamol', geo='UP_West')", finding: "Crocin pharmacy velocity in Lucknow down 18% over 2 weeks. IQVIA shows Crocin still leading doctor prescriptions — disconnect between Rx and counter.", inference: "Trade economics likely driving counter recommendation shift. Professional preference unchanged." },
      { agent: "Consumer Demand Agent", icon: "◉", source: "Google Trends", query: "google_trends(keywords=['crocin','dolo 650','paracetamol'], geo='IN-UP', timeframe='8w')", finding: "Consumer search for 'paracetamol' and 'crocin' in UP: stable. 'Dolo 650' +8% minor. No major consumer shift.", inference: "Trade-level play, not consumer pull shift. Recoverable with right trade response." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: MEDIUM. Field intel suggests margin scheme but not systematically verified. Our velocity data confirms impact. IQVIA confirms not a prescription preference issue. Recommended action: gather more intel while preparing trade response options." },
    ],
  },
  {
    id: 4, priority: "critical", type: "Competitive Alert", category: "Sensodyne", region: "Mumbai · Test Market",
    funnelStage: "consideration", // Consideration being contested
    headline: "Sensodent launched with World Cup campaign — Mumbai is test market, emerging threat",
    subtitle: "TV ads during cricket, Amazon sponsored ads on our PDPs, 25% retailer margins vs our 20%. Mumbai volume down 1-2%. Pharmacy-first strategy is our moat.",
    kpis: [
      { label: "Mumbai Impact", value: "−1-2%", note: "Localized so far" },
      { label: "Price Index", value: "85 vs 100", note: "15% cheaper" },
      { label: "Retailer Margin", value: "25% vs 20%", note: "5pp gap" },
      { label: "Pharmacy Reorder", value: "92%", note: "Our moat (Agra)" },
    ],
    evidence: [
      { source: "Google Trends + Social", summary: "'Sensodent' searches spiked during World Cup windows. Social conversation confirms ad visibility — people discussing 'the new sensitivity toothpaste ad'." },
      { source: "Amazon observation", summary: "Sensodent running higher sponsored product ads than us. Appearing on our PDPs as sponsored display. Higher visibility on generic and Sensodyne keywords." },
      { source: "Instagram observation", summary: "Sensodent influencer posts showing higher engagement rates than our sponsored content. They're getting better traction." },
      { source: "Field Reports (Mumbai)", summary: "ASMs report 25% retailer margin vs our 20%. Paid visibility on ground — end-caps, counter displays. BTL concentrated in Mumbai." },
      { source: "DMS (Internal)", summary: "Mumbai volumes down 1-2%. Rest of India stable. Impact localized to their test market." },
    ],
    salesAction: "Accelerate pharmacy-first in Mumbai — our moat. Don't engage in e-commerce price war. Document competitor activity to prepare counter-playbook.",
    marketingAction: "Hold on e-commerce promotional spend. Focus 'Dentist Recommended' messaging in pharmacy channel. Monitor for expansion signals to Delhi.",
    nudgeConnection: "Push to Mumbai ASMs: 'Sensodent active — World Cup ads, Amazon presence, 25% margins. Focus on pharmacy channel. Don't compete on price.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Multiple signals: Sensodent appearing across search, social, e-commerce, and field reports", routing: "Dispatching to Consumer Demand, Competitive Signal, and Field Intelligence agents" },
      { agent: "Consumer Demand Agent", icon: "◉", source: "Google Trends · Social", query: "google_trends(['sensodent'], geo='IN', timeframe='8w') | social_mentions('sensodent')", finding: "Searches spiked during World Cup. Social conversation about 'sensitivity ad during match'. Mumbai concentrated.", inference: "TV campaign drove awareness. Strategic timing." },
      { agent: "Competitive Signal Agent", icon: "◆", source: "Amazon · Instagram · Platform pricing", query: "amazon_sponsored_visibility | instagram_engagement | platform_pricing", finding: "Higher sponsored ads than us. Higher influencer engagement. Price index 85 vs 100.", inference: "Methodical launch — well-funded, not amateur." },
      { agent: "Field Intelligence Agent", icon: "▣", source: "SFA — Mumbai", query: "field_reports(competitor='sensodent', geo='Mumbai')", finding: "25% retailer margin vs our 20%. BTL visible. Paid shelf visibility.", inference: "Buying distribution via margin." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH on signals. Mumbai is test market. Our moat (pharmacy/Rx) intact. Emerging threat — act before they scale." },
    ],
  },
  {
    id: 5, priority: "high", type: "Seasonal Prep", category: "Crocin · Otrivin", region: "Madhya Pradesh",
    headline: "Pre-monsoon stocking critically thin — 4 of 8 MP distributors will stock out if monsoon hits early",
    subtitle: "IMD forecasts 8–10 days early onset. Historical pattern: 25–35% spike in week 2. Avg cover at 12 days, 4 distributors below 10.",
    kpis: [
      { label: "Avg Stock Cover", value: "12 days", note: "At normal run-rate" },
      { label: "At Spike Rate", value: "9 days", note: "If monsoon early" },
      { label: "Distributors at Risk", value: "4 / 8", note: "Below 10 days" },
      { label: "Replenishment Cycle", value: "5–7 days", note: "From regional warehouse" },
    ],
    evidence: [
      { source: "IMD + Historical Sales", summary: "IMD extended forecast: monsoon onset Jun 18–22 vs normal Jun 28–30. Historical: 2024 onset 6 days early → 28% Crocin spike W2. 2023 onset 8 days early → 35% spike. Current forecast matches high-impact pattern." },
      { source: "DMS (Distributor Inventory)", summary: "8 MP distributors avg 12 days Crocin cover at normal rate. At 1.3x spike rate: 9 days. Bhopal, Indore, Jabalpur, Gwalior below 10 days even now. 5–7 day replenishment cycle from regional warehouse — stockout before resupply if spike hits." },
    ],
    salesAction: "Place pre-emptive top-up orders with Bhopal, Indore, Jabalpur, Gwalior by Wednesday. Request 15% buffer stock allocation for all MP distributors. Alert Otrivin distribution to same monsoon stocking need.",
    marketingAction: "Prepare monsoon-season Crocin digital campaign for early activation (week of Jun 15 vs normal Jun 25). Pre-load 'cold and flu season' search ads in MP geographies.",
    nudgeConnection: "Push to MP ASMs: 'Monsoon forecast early — Crocin stock critically low at 4 distributors. Place top-up orders by Wednesday. Otrivin stocking also needed.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Seasonal trigger: IMD extended forecast indicates early monsoon. Checking inventory readiness.", routing: "Dispatching to Demand Forecasting Agent and Distribution Agent" },
      { agent: "Demand Forecasting Agent", icon: "◇", source: "IMD Extended Range Forecast · Historical Sales DB", query: "SELECT year, monsoon_onset_date, deviation_days, crocin_spike_pct, otrivin_spike_pct FROM monsoon_impact_history WHERE zone='Central' AND year IN (2023,2024,2025)", finding: "2024: 6 days early → 28% spike. 2023: 8 days early → 35%. IMD current: 8–10 days early.", inference: "Pattern consistent: early onset by 6–10 days triggers 25–35% demand spike in cold/flu. Current forecast matches high-impact pattern." },
      { agent: "Distribution Agent", icon: "▣", source: "DMS — Distributor Inventory, MP", query: "SELECT distributor_name, city, crocin_stock_units, daily_run_rate, days_cover FROM distributor_inventory WHERE state='MP' AND product IN ('Crocin Advance','Otrivin')", finding: "Avg 12 days cover. At spike rate (1.3x): 9 days. 4 of 8 below 10 days even at normal rate. 5–7 day replenishment cycle.", inference: "4 distributors will stock out before replenishment if spike hits. Even others tight. Pre-emptive orders needed by Wednesday." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: MEDIUM-HIGH. IMD extended forecasts ~70% accurate at this range but downside of inaction (stockouts during peak) far outweighs over-stocking cost. Recommend 15% buffer for all MP distributors." },
    ],
  },
  {
    id: 6, priority: "high", type: "Launch Tracking", category: "Centrum", region: "UP East, UP West",
    headline: "Centrum Recharge: Amazon #3 validates demand, offline activation critically behind at 8% vs 25% plan",
    subtitle: "Only 6 of 42 distributors ordered. Outlet mix 70:30 GT:Pharmacy — should be inverse. Multivitamin search in UP Tier 3 up 28% YoY.",
    kpis: [
      { label: "Amazon Rank", value: "#3", note: "Daily vitamins" },
      { label: "Distributors Active", value: "6 / 42", note: "14% activation" },
      { label: "GT Activation", value: "8%", note: "vs 25% plan" },
      { label: "Channel Mix", value: "70:30", note: "GT:Pharma, should flip" },
    ],
    evidence: [
      { source: "E-com (Amazon)", summary: "Centrum Recharge #3 in daily vitamins. 4.2★, 1,200+ reviews. 48 units/day avg in UP before 4-day OOS. Strong organic demand validated." },
      { source: "DMS (Distribution)", summary: "6 of 42 UP distributors ordered (14%). Outlet activations 340 = 8% of 25% target. Mix 70% GT, 30% pharmacy — inverse of where VMS sells." },
      { source: "Google Trends", summary: "Multivitamin search +28% YoY in UP Tier 3 with acceleration. 'Vitamin tablet price' co-trending. Centrum numeric distribution in Tier 3: 9% vs category 14%. Clear demand-supply mismatch." },
    ],
    salesAction: "Make Centrum Recharge must-stock for all 42 distributors. Flip channel: target 500 pharmacy activations first. Use Amazon #3 rank as proof point. Leverage existing Sensodyne/Eno pharmacy relationships for warm introductions.",
    marketingAction: "Create 'As seen on Amazon' pharmacy counter material with rating and review count. Digital retargeting to redirect OOS Amazon searches to pharmacy.",
    nudgeConnection: "Push to all UP ASMs: 'Centrum Recharge is Amazon #3 — consumers want this. Target 12 pharmacy activations per ASM this week. Amazon data sheet attached for distributor visits.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Launch tracking alert: Centrum Recharge e-commerce outperforming but GT activation critically behind plan", routing: "Dispatching to E-commerce Agent, Distribution Agent, and Consumer Demand Agent" },
      { agent: "E-commerce Agent", icon: "▲", source: "Amazon Seller Central — UP Region", query: "SELECT asin, product_name, daily_units_avg_7d, category_rank, avg_rating, review_count FROM amazon_performance WHERE brand='Centrum' AND variant='Recharge' AND region='UP'", finding: "#3 rank daily vitamins. 48 units/day. 4.2★ (1,200+ reviews). OOS in major UP pin codes 4 days.", inference: "Strong organic consumer demand. OOS creates natural experiment for offline redirect." },
      { agent: "Distribution Agent", icon: "▣", source: "DMS — Distributor Orders, Centrum Recharge", query: "SELECT distributor_name, territory, centrum_recharge_ordered, outlet_activations, channel_split FROM distributor_orders WHERE product='Centrum Recharge 10' AND territory IN ('UP_East','UP_West')", finding: "6 of 42 ordered (14%). 340 outlet activations (8% of plan). Mix 70% GT, 30% pharmacy — wrong channel for VMS.", inference: "Bottleneck is distribution activation and channel mix. VMS indexes to pharmacy — 70/30 GT split should be reversed." },
      { agent: "Consumer Demand Agent", icon: "◉", source: "Google Trends — UP Tier 3", query: "google_trends(keywords=['multivitamin','vitamin tablet price','centrum'], geo='IN-UP', resolution='city_tier_3', timeframe='12m')", finding: "+28% YoY with acceleration. 'Vitamin tablet price' co-trending — price sensitivity high. Centrum distribution in Tier 3: 9% vs category 14%.", inference: "Post-COVID health consciousness driving demand. ₹10 price point well-positioned. Massive demand-supply mismatch." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Demand validated by Amazon + search trends. Bottleneck entirely distribution. Priority: flip channel to pharmacy-first, use Amazon data as distributor proof point." },
    ],
  },
  {
    id: 7, priority: "high", type: "Performance Risk", category: "Iodex", region: "Madhya Pradesh",
    headline: "Iodex declining in MP rural — Moov gaining via direct van coverage model",
    subtitle: "Moov +2.8pp in Central zone. Reckitt deployed 6 rural vans. Iodex numeric distribution dropped 38% → 31%. Structural threat.",
    kpis: [
      { label: "Moov Share Gain", value: "+2.8pp", note: "22.1% → 24.9%" },
      { label: "Iodex Share Loss", value: "−1.9pp", note: "28.3% → 26.4%" },
      { label: "Iodex Dist Drop", value: "−7pp", note: "38% → 31% rural MP" },
      { label: "Reckitt Vans", value: "6", note: "Sagar, Rewa, Satna" },
    ],
    evidence: [
      { source: "Nielsen IQ (Central Zone)", summary: "Moov +2.8pp (22.1% → 24.9%). Iodex −1.9pp (28.3% → 26.4%). Iodex rural numeric distribution MP: 38% → 31% (−7pp in one period). Distribution drop feeding share loss." },
      { source: "Field Reports (SFA)", summary: "6 Reckitt sales vans spotted in rural haats — Sagar, Rewa, Satna, Chhindwara. Vans carry Moov + sampling kits. Weekly haat schedule. Direct selling + trial generation that sub-stockist model can't match." },
    ],
    salesAction: "Request rural sampling initiative through sub-stockist network. Priority: Sagar, Rewa, Satna. Push Iodex multipacks at haats where Moov vans are active.",
    marketingAction: "Develop rural-specific Iodex communication (local-language, haat-specific). Evaluate trial-generation approach via sachets at rural touch-points.",
    nudgeConnection: "Push to MP ASMs: 'Moov vans active in Sagar, Rewa, Satna. Ensure Iodex stocked at all haats where van has been spotted. Sampling kits being dispatched.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Performance alert: Iodex primary at 62% of target in MP. Investigating competitive and distribution factors.", routing: "Dispatching to Market Share Agent and Field Intelligence Agent" },
      { agent: "Market Share Agent", icon: "▣", source: "Nielsen IQ — Central Zone Topical Pain", query: "SELECT brand, value_share, share_change_pp, numeric_distribution FROM nielsen_share WHERE category='Topical_Pain' AND zone='Central'", finding: "Moov +2.8pp. Iodex −1.9pp. Rural numeric dist: 38% → 31% (−7pp).", inference: "Moov gaining share and distribution simultaneously. Distribution drop feeding the share loss." },
      { agent: "Field Intelligence Agent", icon: "◆", source: "SFA — Field Reports, MP Rural", query: "SELECT asm_name, report_date, competitor_activity_type, details, location FROM asm_field_reports WHERE state='MP' AND competitor='Reckitt_Moov' AND date >= DATE_SUB(NOW(), INTERVAL 30 DAY)", finding: "6 Reckitt vans in rural haats. Direct van selling + trial packs. Weekly haat schedule matching sub-stockist coverage.", inference: "Structural competitive move — Reckitt building rural distribution infrastructure. Not temporary scheme." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Structural threat. Short-term: push through existing sub-stockist. Medium-term: zone-level discussion on rural coverage model. 7pp distribution drop in one period is alarming velocity." },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// TERRITORIES
// ═══════════════════════════════════════════════════════
const territories = [
  { id: "delhi", name: "Delhi NCR", achievement: 93, status: "on-track", narrative: "Strongest territory. Clinical White outperforming in premium pharmacy. Otrivin riding extended pollution demand.", keyWin: "Clinical White 155% in premium pharmacy", keyRisk: "Centrum Recharge GT activation behind",
    asmAreas: [{ name: "South Delhi + Gurgaon", achievement: 98 }, { name: "Noida + East Delhi", achievement: 87 }],
    weeklyTrend: [{w:"W48",v:86},{w:"W49",v:89},{w:"W50",v:93},{w:"W51",v:91},{w:"W52",v:96},{w:"W1",v:95},{w:"W2",v:99},{w:"W3",v:101}] },
  { id: "up-east", name: "UP East", achievement: 83, status: "needs-attention", narrative: "Mixed. Sensodyne ₹20 breakthrough in Agra pharmacy. Varanasi–Allahabad and Centrum activation lagging.", keyWin: "Sensodyne ₹20 Agra 85% reorder", keyRisk: "Varanasi activation stalled",
    asmAreas: [{ name: "Agra–Mathura", achievement: 94 }, { name: "Varanasi–Allahabad", achievement: 72 }, { name: "Gorakhpur–East", achievement: 78 }],
    weeklyTrend: [{w:"W48",v:91},{w:"W49",v:93},{w:"W50",v:90},{w:"W51",v:88},{w:"W52",v:84},{w:"W1",v:82},{w:"W2",v:80},{w:"W3",v:78}] },
  { id: "up-west", name: "UP West", achievement: 76, status: "at-risk", narrative: "Under pressure. Crocin Dolo 650 margin threat. Eno repeat rate declining. Needs trade intervention.", keyWin: "Sensodyne stable across territory", keyRisk: "Crocin pharmacy velocity −18%",
    asmAreas: [{ name: "Lucknow–Kanpur", achievement: 71 }, { name: "Agra–Aligarh", achievement: 82 }],
    weeklyTrend: [{w:"W48",v:107},{w:"W49",v:103},{w:"W50",v:99},{w:"W51",v:93},{w:"W52",v:86},{w:"W1",v:82},{w:"W2",v:79},{w:"W3",v:76}] },
  { id: "rajasthan", name: "Rajasthan", achievement: 87, status: "needs-attention", narrative: "Split. Sensodyne ₹20 outperforming. Eno under Gas-O-Fast assault. Centrum pharmacy gap persistent.", keyWin: "Sensodyne ₹20 exceeding target", keyRisk: "Eno −1.2pp Jaipur–Jodhpur",
    asmAreas: [{ name: "Jaipur–North Rajasthan", achievement: 84 }, { name: "Udaipur–Kota–South", achievement: 91 }],
    weeklyTrend: [{w:"W48",v:113},{w:"W49",v:115},{w:"W50",v:118},{w:"W51",v:115},{w:"W52",v:113},{w:"W1",v:110},{w:"W2",v:109},{w:"W3",v:108}] },
  { id: "mp", name: "Madhya Pradesh", achievement: 69, status: "at-risk", narrative: "Weakest. Iodex declining via Moov rural vans. Pre-monsoon stocking critical.", keyWin: "Eno summer lift expected", keyRisk: "Iodex rural dist −7pp",
    asmAreas: [{ name: "Bhopal–Indore", achievement: 74 }, { name: "Jabalpur–Gwalior–East", achievement: 63 }],
    weeklyTrend: [{w:"W48",v:126},{w:"W49",v:123},{w:"W50",v:120},{w:"W51",v:114},{w:"W52",v:111},{w:"W1",v:108},{w:"W2",v:105},{w:"W3",v:102}] },
];

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
// FUNNEL VIEW — Horizontal flow with clickable stages
// ═══════════════════════════════════════════════════════
const FunnelView = ({ stages, relatedInsightCounts, expandedStage, setExpandedStage, conversation, setConversation }) => {
  const expanded = stages.find(s => s.id === expandedStage);
  
  const handlePromptClick = (prompt) => {
    setConversation(prev => [...prev, { role: "user", text: prompt.q }, { role: "assistant", text: prompt.a }]);
  };
  
  // Get follow-up prompts (ones not yet asked)
  const askedQuestions = conversation.filter(m => m.role === "user").map(m => m.text);
  const remainingPrompts = expanded?.prompts.filter(p => !askedQuestions.includes(p.q)) || [];
  
  return (
    <div>
      {/* Funnel cards */}
      <div style={{ 
        display: "flex", 
        alignItems: "stretch",
        background: C.card,
        border: `1px solid ${C.border}`,
        overflow: "hidden"
      }}>
        {stages.map((stage, i) => {
          const insightCount = relatedInsightCounts[stage.id] || 0;
          const isExpanded = expandedStage === stage.id;
          return (
            <div 
              key={stage.id} 
              onClick={() => {
                setExpandedStage(isExpanded ? null : stage.id);
                setConversation([]);
              }}
              style={{ 
                flex: 1, 
                padding: "20px 24px",
                borderRight: i < stages.length - 1 ? `1px solid ${C.border}` : "none",
                borderBottom: isExpanded ? `3px solid ${stage.hasIssue ? C.orange : C.green}` : "3px solid transparent",
                background: stage.hasIssue ? C.orangePale + "40" : "transparent",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.background = stage.hasIssue ? C.orangePale + "60" : C.greenPale + "40"; }}
              onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.background = stage.hasIssue ? C.orangePale + "40" : "transparent"; }}
            >
              {/* Stage name */}
              <div style={{ 
                fontSize: 10, 
                fontWeight: 700, 
                letterSpacing: "0.1em", 
                color: stage.hasIssue ? C.orange : C.green,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <span>{stage.name.toUpperCase()}</span>
                {i < stages.length - 1 && (
                  <span style={{ color: C.border, fontSize: 14, marginRight: -12 }}>›</span>
                )}
              </div>
              
              {/* Metrics */}
              {stage.metrics.map((m, j) => (
                <div key={j} style={{ marginBottom: j < stage.metrics.length - 1 ? 14 : 0 }}>
                  <div style={{ fontSize: 10, color: C.textLight, marginBottom: 3 }}>{m.label}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{m.value}</span>
                    <span style={{ 
                      fontSize: 11, 
                      color: m.isGood ? C.green : C.orange,
                      fontWeight: 500
                    }}>{m.delta}</span>
                  </div>
                </div>
              ))}
              
              {/* Insight count */}
              {insightCount > 0 && (
                <div style={{ 
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: `1px solid ${C.borderLight}`,
                  fontSize: 11, 
                  color: C.textMid,
                }}>
                  {insightCount} insight{insightCount > 1 ? "s" : ""} below ↓
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Expanded conversation panel */}
      {expanded && (
        <div style={{ 
          ...cardBase, 
          marginTop: -1, 
          borderTop: "none",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ 
            display: "flex", alignItems: "center", justifyContent: "space-between", 
            padding: "16px 24px",
            borderBottom: `1px solid ${C.border}`,
            background: C.page,
          }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{expanded.name}</span>
              <span style={{ fontSize: 13, color: C.textMid, marginLeft: 12 }}>
                {expanded.metrics.map(m => `${m.label}: ${m.value} (${m.delta})`).join("  ·  ")}
              </span>
            </div>
            <div 
              onClick={(e) => { e.stopPropagation(); setExpandedStage(null); setConversation([]); }}
              style={{ fontSize: 12, color: C.textLight, cursor: "pointer", padding: "4px 8px" }}
            >✕</div>
          </div>
          
          {/* Chat area */}
          <div style={{ 
            padding: "20px 24px", 
            minHeight: 200,
            maxHeight: 400,
            overflowY: "auto",
            background: "#FAFAF7",
          }}>
            {conversation.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 13, color: C.textLight, marginBottom: 16 }}>
                  Ask Questt about {expanded.name.toLowerCase()} metrics
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  {expanded.prompts.map((p, i) => (
                    <div 
                      key={i}
                      onClick={(e) => { e.stopPropagation(); handlePromptClick(p); }}
                      style={{ 
                        padding: "10px 16px", 
                        background: C.card, 
                        border: `1px solid ${C.border}`,
                        color: C.text,
                        fontSize: 13,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}
                    >
                      {p.q}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {conversation.map((msg, i) => (
                  <div key={i} style={{ 
                    display: "flex", 
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}>
                    <div style={{ 
                      maxWidth: msg.role === "user" ? "60%" : "85%",
                      padding: msg.role === "user" ? "10px 16px" : "16px 20px",
                      background: msg.role === "user" ? C.green : C.card,
                      color: msg.role === "user" ? "#FFFFFF" : C.text,
                      border: msg.role === "user" ? "none" : `1px solid ${C.border}`,
                      borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    }}>
                      {msg.role === "assistant" && (
                        <div style={{ fontSize: 10, color: C.green, fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                          <span>◈</span> Questt
                        </div>
                      )}
                      <div style={{ 
                        fontSize: 14, 
                        lineHeight: 1.7, 
                        whiteSpace: "pre-line",
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Follow-up prompts */}
                {remainingPrompts.length > 0 && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                    {remainingPrompts.map((p, i) => (
                      <div 
                        key={i}
                        onClick={(e) => { e.stopPropagation(); handlePromptClick(p); }}
                        style={{ 
                          padding: "8px 14px", 
                          background: C.card, 
                          border: `1px solid ${C.border}`,
                          color: C.textMid,
                          fontSize: 12,
                          cursor: "pointer",
                          borderRadius: 16,
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; }}
                      >
                        {p.q}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Input bar */}
          <div style={{ 
            padding: "12px 20px", 
            background: C.card, 
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <input 
              type="text" 
              placeholder="Ask a follow-up question..."
              onClick={e => e.stopPropagation()}
              style={{ 
                flex: 1, 
                border: `1px solid ${C.border}`,
                padding: "10px 14px",
                borderRadius: 20,
                outline: "none", 
                fontSize: 13, 
                color: C.text,
                background: C.page,
              }}
            />
            <div style={{ 
              width: 36, height: 36, 
              background: C.green, 
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              color: "#FFFFFF",
              fontSize: 14,
            }}>↑</div>
          </div>
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
    <div
      onClick={onClose}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(12, 44, 24, 0.45)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 40,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.card, border: `1px solid ${C.border}`,
          width: "100%", maxWidth: 780, maxHeight: "85vh",
          overflow: "hidden", display: "flex", flexDirection: "column",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
        }}
      >
        {/* Modal header */}
        <div style={{
          padding: "20px 28px", borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div>
            <div style={{ ...label, fontSize: 10, color: C.green, marginBottom: 6 }}>AGENT DECISION TRAIL</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.4 }}>{insight.headline}</div>
            <div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>{insight.category} · {insight.region}</div>
          </div>
          <div
            onClick={onClose}
            style={{
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 18, color: C.textLight, flexShrink: 0,
              border: `1px solid ${C.border}`, background: C.card,
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.page; e.currentTarget.style.color = C.text; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.card; e.currentTarget.style.color = C.textLight; }}
          >
            ✕
          </div>
        </div>

        {/* Modal body — scrollable */}
        <div style={{ overflow: "auto", padding: "24px 28px" }}>
          {insight.agentTrail.map((step, i) => {
            const isLast = i === insight.agentTrail.length - 1;
            const isSynthesis = step.agent === "Synthesis";
            const isOrch = step.agent === "Orchestrator";
            return (
              <div key={i} style={{ display: "flex", gap: 14, paddingBottom: isLast ? 0 : 20, marginBottom: isLast ? 0 : 20, borderBottom: isLast ? "none" : `1px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: isSynthesis ? C.greenPale : isOrch ? C.card : C.card, border: `1px solid ${isSynthesis ? C.sage : C.border}`, fontSize: 12 }}>{step.icon}</div>
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
// INSIGHT CARD
// ═══════════════════════════════════════════════════════
const InsightCard = ({ insight, isExpanded, onToggle, onShowTrail }) => {
  return (
    <div style={{ ...cardBase, marginBottom: 12, overflow: "hidden" }}>
      {/* Collapsed */}
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
          <div
            onClick={ev => { ev.stopPropagation(); onShowTrail(insight); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 12px", border: `1px solid ${C.border}`,
              cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.green,
              background: C.card, transition: "all 0.15s", whiteSpace: "nowrap",
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.greenPale}
            onMouseLeave={e => e.currentTarget.style.background = C.card}
          >
            <span style={{ fontSize: 12 }}>◈</span>
            Decision Trail
          </div>
          <span style={{ ...label, fontSize: 10 }}>{insight.category}</span>
          {insight.funnelStage && (
            <span style={{ 
              fontSize: 9, fontWeight: 600, 
              padding: "3px 8px", 
              background: C.bluePale, 
              color: C.blue,
              letterSpacing: "0.04em",
              textTransform: "uppercase"
            }}>
              {funnelStages.find(f => f.id === insight.funnelStage)?.name || insight.funnelStage}
            </span>
          )}
          <span onClick={onToggle} style={{ fontSize: 12, color: C.sage, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", cursor: "pointer" }}>▾</span>
        </div>
      </div>

      {/* Expanded */}
      {isExpanded && (
        <div style={{ borderTop: `1px solid ${C.border}` }}>
          {/* Header */}
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

          {/* SUGGESTED ACTIONS — Toned down */}
          <div style={{ margin: "0 28px 20px", padding: "18px 24px", background: C.page }}>
            <div style={{ display: "flex", gap: 32 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: C.textLight, letterSpacing: "0.04em", marginBottom: 6 }}>SALES</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{insight.salesAction}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: C.textLight, letterSpacing: "0.04em", marginBottom: 6 }}>MARKETING</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{insight.marketingAction}</div>
              </div>
            </div>
            
            {/* Past Validation — inline */}
            {insight.pastValidation && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>✓ Similar action: {insight.pastValidation.outcome}</span>
                <span style={{ fontSize: 11, color: C.textLight }}>({insight.pastValidation.title})</span>
              </div>
            )}
          </div>

          {/* EXECUTION STATUS — Simplified */}
          {insight.triggeredActions && (
            <div style={{ margin: "0 28px 20px" }}>
              <div style={{ display: "flex", gap: 12 }}>
                {insight.triggeredActions.map((act, i) => {
                  const sc = {
                    complete: { icon: "✓", color: C.green, bg: C.greenPale },
                    pending: { icon: "◷", color: C.orange, bg: C.orangePale },
                    ready: { icon: "○", color: C.blue, bg: C.bluePale },
                  }[act.status];
                  return (
                    <div key={i} style={{ 
                      flex: 1,
                      padding: "14px 16px",
                      background: sc.bg,
                      borderLeft: `3px solid ${sc.color}`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: sc.color }}>{sc.icon}</span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: sc.color, letterSpacing: "0.04em" }}>{act.statusLabel.toUpperCase()}</span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{act.action}</div>
                      <div style={{ fontSize: 11, color: C.textMid, marginTop: 2 }}>{act.detail}</div>
                    </div>
                  );
                })}
              </div>
              
              {/* Footer with link */}
              <div style={{ 
                marginTop: 8,
                padding: "10px 16px",
                background: C.card,
                border: `1px solid ${C.border}`,
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
              }}>
                <div style={{ fontSize: 12, color: C.textMid }}>
                  <span style={{ fontWeight: 600, color: C.text }}>Projected:</span> +1.2pp share, ₹4.2L protected
                </div>
                <div style={{ fontSize: 11, color: C.green, fontWeight: 500 }}>
                  View in Sales Watchtower →
                </div>
              </div>
            </div>
          )}

          {/* SUPPORTING EVIDENCE */}
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
};

// ═══════════════════════════════════════════════════════
// TERRITORY ROW
// ═══════════════════════════════════════════════════════
const TerritoryRow = ({ t, isExpanded, onToggle }) => {
  const sc = { "on-track": C.green, "needs-attention": C.orange, "at-risk": C.red }[t.status];
  return (
    <div style={{ ...cardBase, marginBottom: 8, overflow: "hidden" }}>
      <div onClick={onToggle} style={{ padding: "18px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: 20 }}
        onMouseEnter={e => e.currentTarget.style.background = "#FAFAF7"}
        onMouseLeave={e => e.currentTarget.style.background = C.card}>
        <StatusDot s={t.status} />
        <div style={{ width: 130, fontSize: 14, fontWeight: 600, color: C.text }}>{t.name}</div>
        <div style={{ width: 120, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 4, background: C.borderLight }}><div style={{ width: `${Math.min(t.achievement, 100)}%`, height: "100%", background: sc }} /></div>
          <span style={{ fontSize: 14, fontWeight: 700, color: sc, minWidth: 36 }}>{t.achievement}%</span>
        </div>
        <div style={{ flex: 1, fontSize: 13, color: C.textMid, lineHeight: 1.45 }}>{t.narrative}</div>
        <span style={{ fontSize: 12, color: C.sage, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
      </div>
      {isExpanded && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: "20px 28px" }}>
          <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ ...label, fontSize: 10, marginBottom: 12 }}>ASM Area Breakdown</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>{["ASM Area", "Achievement"].map(h => <th key={h} style={{ ...label, fontSize: 9, textAlign: "left", padding: "8px 12px", borderBottom: `1px solid ${C.border}` }}>{h}</th>)}</tr></thead>
                <tbody>{t.asmAreas.map((a, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 13, color: C.text, padding: "10px 12px", borderBottom: `1px solid ${C.borderLight}` }}>{a.name}</td>
                    <td style={{ fontSize: 13, fontWeight: 600, color: a.achievement >= 85 ? C.green : a.achievement >= 75 ? C.orange : C.red, padding: "10px 12px", borderBottom: `1px solid ${C.borderLight}` }}>{a.achievement}%</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <div style={{ width: 260 }}>
              <div style={{ ...label, fontSize: 10, marginBottom: 12 }}>Weekly Index (target = 100)</div>
              <div style={{ height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={t.weeklyTrend} barCategoryGap="18%">
                    <XAxis dataKey="w" tick={{ fontSize: 9, fill: C.textLight }} axisLine={{ stroke: C.border }} tickLine={false} />
                    <Bar dataKey="v" fill={sc} radius={[2,2,0,0]} opacity={0.8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1, padding: "12px 16px", background: C.greenPale }}><div style={{ fontSize: 10, fontWeight: 700, color: C.green, marginBottom: 4 }}>KEY WIN</div><div style={{ fontSize: 12, color: C.text }}>{t.keyWin}</div></div>
            <div style={{ flex: 1, padding: "12px 16px", background: C.orangePale }}><div style={{ fontSize: 10, fontWeight: 700, color: C.orange, marginBottom: 4 }}>KEY RISK</div><div style={{ fontSize: 12, color: C.text }}>{t.keyRisk}</div></div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════
export default function MarketPulse() {
  const [activeTab, setActiveTab] = useState("pulse");
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [expandedTerritory, setExpandedTerritory] = useState(null);
  const [expandedStage, setExpandedStage] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [trailInsight, setTrailInsight] = useState(null);
  const [trackFilter, setTrackFilter] = useState("all"); // all, executed, not-executed

  const filteredRecs = trackFilter === "all" 
    ? pastRecommendations 
    : trackFilter === "executed" 
      ? pastRecommendations.filter(r => r.executed)
      : pastRecommendations.filter(r => !r.executed);

  return (
    <div className="overflow-auto" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: C.page, height: "100vh", color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Source+Serif+4:wght@300;400;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: C.header, padding: "22px 40px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 22, fontWeight: 300, color: "#FFFFFF" }}>Questt Market Pulse</span>
          <span style={{ fontSize: 12, color: "#FFFFFF90" }}>Haleon India · North Region · Week ending Feb 2, 2026</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: "0 40px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", gap: 32 }}>
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
                  {trackRecordStats.executed}/{trackRecordStats.total}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 40px 60px" }}>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB: WEEKLY PULSE */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {activeTab === "pulse" && (
          <>
            {/* Portfolio Summary */}
            <div style={{ ...cardBase, padding: "24px 28px", marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: C.text, marginBottom: 16 }}>
                {portfolioSummary.headline}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
                {portfolioSummary.bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ 
                      width: 6, height: 6, borderRadius: "50%", marginTop: 6, flexShrink: 0,
                      background: b.status === "pressure" ? C.orange : C.green 
                    }} />
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{b.brand}: </span>
                      <span style={{ fontSize: 13, color: C.textMid }}>{b.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consumer Funnel */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Consumer Journey</h2>
                <span style={{ fontSize: 12, color: C.textLight }}>Portfolio view · Week ending Feb 2</span>
              </div>
              <FunnelView 
                stages={funnelStages} 
                relatedInsightCounts={{
                  awareness: insights.filter(i => i.funnelStage === "awareness").length,
                  consideration: insights.filter(i => i.funnelStage === "consideration").length,
                  conversion: insights.filter(i => i.funnelStage === "conversion").length,
                  repeat: insights.filter(i => i.funnelStage === "repeat").length,
                }}
                expandedStage={expandedStage}
                setExpandedStage={setExpandedStage}
                conversation={conversation}
                setConversation={setConversation}
              />
            </div>

            {/* All Insights */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Insights & Decisions</h2>
                <span style={{ fontSize: 12, color: C.textLight }}>{insights.length} active · click to expand</span>
              </div>
              {insights.map(ins => (
                <InsightCard key={ins.id} insight={ins} isExpanded={expandedInsight === ins.id} onToggle={() => setExpandedInsight(expandedInsight === ins.id ? null : ins.id)} onShowTrail={setTrailInsight} />
              ))}
            </div>

            {/* Territory Overview */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Territory Overview</h2>
                <span style={{ fontSize: 12, color: C.textLight }}>5 territories · ASM-level drill-down</span>
              </div>
              {territories.map(t => (
                <TerritoryRow key={t.id} t={t} isExpanded={expandedTerritory === t.id} onToggle={() => setExpandedTerritory(expandedTerritory === t.id ? null : t.id)} />
              ))}
            </div>
          </>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/* TAB: PAST RECOMMENDATIONS */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {activeTab === "track" && (
          <>
            {/* Impact Summary — THE HEADLINE */}
            <div style={{ ...cardBase, padding: "28px 32px", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 40 }}>
                {/* Left: Key Message */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: C.green, fontWeight: 600, marginBottom: 8 }}>TRACK RECORD</div>
                  <div style={{ fontSize: 24, fontWeight: 600, color: C.text, lineHeight: 1.3, marginBottom: 12 }}>
                    When you follow our recommendations, you see <span style={{ color: C.green }}>+12.4%</span> average lift.
                  </div>
                  <div style={{ fontSize: 14, color: C.textMid, lineHeight: 1.6 }}>
                    Over the past 3 quarters, 10 of 12 recommendations were executed. Actions taken generated measurable positive outcomes in 8 cases. 
                    Missed recommendations cost an estimated <span style={{ color: C.red, fontWeight: 500 }}>6.5pp</span> in share opportunity.
                  </div>
                </div>
                
                {/* Right: Key Numbers */}
                <div style={{ display: "flex", gap: 24 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 42, fontWeight: 700, color: C.green }}>{Math.round((trackRecordStats.executed / trackRecordStats.total) * 100)}%</div>
                    <div style={{ fontSize: 11, color: C.textLight, marginTop: 4 }}>Execution Rate</div>
                  </div>
                  <div style={{ width: 1, background: C.border }} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 42, fontWeight: 700, color: C.text }}>{trackRecordStats.positive}<span style={{ fontSize: 20, color: C.textLight }}>/{trackRecordStats.total}</span></div>
                    <div style={{ fontSize: 11, color: C.textLight, marginTop: 4 }}>Positive Outcomes</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Filters */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Recommendation History</h2>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { k: "all", l: "All" },
                  { k: "executed", l: "Executed" },
                  { k: "not-executed", l: "Not Executed" },
                ].map(f => (
                  <div key={f.k} onClick={() => setTrackFilter(f.k)}
                    style={{
                      fontSize: 12, fontWeight: 500, padding: "6px 14px",
                      background: trackFilter === f.k ? C.green : C.card,
                      color: trackFilter === f.k ? "#FFFFFF" : C.textMid,
                      border: `1px solid ${trackFilter === f.k ? C.green : C.border}`,
                      cursor: "pointer", transition: "all 0.15s"
                    }}>
                    {f.l}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations Table */}
            <div style={{ ...cardBase, overflow: "hidden" }}>
              {/* Table Header */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "90px 90px 1fr 100px 180px", 
                gap: 16, 
                padding: "14px 24px", 
                background: C.page, 
                borderBottom: `1px solid ${C.border}` 
              }}>
                <div style={{ ...label, fontSize: 9 }}>PERIOD</div>
                <div style={{ ...label, fontSize: 9 }}>BRAND</div>
                <div style={{ ...label, fontSize: 9 }}>RECOMMENDATION</div>
                <div style={{ ...label, fontSize: 9 }}>STATUS</div>
                <div style={{ ...label, fontSize: 9 }}>IMPACT</div>
              </div>

              {/* Table Rows */}
              {filteredRecs.map((r, i) => (
                <div key={r.id} style={{ 
                  display: "grid", 
                  gridTemplateColumns: "90px 90px 1fr 100px 180px", 
                  gap: 16, 
                  padding: "18px 24px", 
                  borderBottom: i < filteredRecs.length - 1 ? `1px solid ${C.borderLight}` : "none",
                  alignItems: "start"
                }}>
                  {/* Period */}
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{r.quarter}</div>
                    <div style={{ fontSize: 11, color: C.textLight }}>{r.month}</div>
                  </div>
                  
                  {/* Brand */}
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{r.brand}</div>
                    <div style={{ fontSize: 10, color: C.textLight }}>{r.region}</div>
                  </div>
                  
                  {/* Recommendation */}
                  <div>
                    <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5, marginBottom: 6 }}>{r.suggestion}</div>
                    <div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>{r.detail}</div>
                    {r.linkedTo && (
                      <div style={{ 
                        marginTop: 8, fontSize: 11, color: C.blue, 
                        display: "inline-flex", alignItems: "center", gap: 4,
                        padding: "3px 8px", background: "#EBF4FB", borderRadius: 2
                      }}>
                        ↗ {r.linkedTo}
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
                <span style={{ fontWeight: 600 }}>Key insight:</span> Recommendations that were executed delivered an average of {trackRecordStats.avgLiftWhenExecuted} lift. 
                Recommendations that were not executed resulted in an average of {trackRecordStats.avgLossWhenNotExecuted} opportunity cost or share loss to competitors.
                The system's track record is strongest in seasonal prep (+19% avg) and counter-campaigns (+8% avg).
              </div>
            </div>
          </>
        )}
      </div>

      {/* Agent Trail Modal */}
      {trailInsight && <AgentTrailModal insight={trailInsight} onClose={() => setTrailInsight(null)} />}
    </div>
  );
}

"use client"
import { useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const C = {
  header: "#111A15", page: "#FAFAF8", card: "#FFFFFF", border: "#E5E2DB",
  borderLight: "#F0EDE7", text: "#1C1C1C", textMid: "#555555", textLight: "#999999",
  green: "#2D5A3D", greenPale: "#EAF2EF", sage: "#2D5A3D",
  orange: "#946B1A", orangePale: "#FDFAF0", red: "#B33A3A", redPale: "#FDF3F3",
  blue: "#2A5078", bluePale: "#EDF3F8",
};
const label = { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textLight };
const cardBase = { background: C.card, border: `1px solid ${C.border}` };
const portfolioKPIs = [
  { label: "PORTFOLIO ACHIEVEMENT", value: "87%", delta: "+3% vs LYSM", negative: false },
  { label: "BRANDS ON TRACK", value: "4 / 7", delta: "Kesh King, Smart & Handsome, Mentho Plus behind", negative: true },
  { label: "PRIORITY ACTIONS", value: "6", delta: "2 critical, 4 high" },
  { label: "AVG NUMERIC DISTRIBUTION", value: "44%", delta: "+1pp vs last period", negative: false },
];
const criticalItems = [
  { id: 1, severity: "critical", headline: "Navratna losing ground in Bihar — Dabur Cool King aggressive rural campaign redirecting cool oil demand", detail: "Retail Panel East Zone: Navratna -1.8pp while cool oil category grew 8%. Dabur running 18 regional-language social ad sets in Bhojpuri since Jan 22. Patna primary sales -24%. Pre-summer peak approaching — action urgent.", category: "Navratna" },
  { id: 2, severity: "critical", headline: "Zandu Balm chemist margins being undercut by Amrutanjan Strong in Chennai-Coimbatore belt", detail: "Amrutanjan offering 24% retail margin vs Zandu Balm's 17%. 18 of top-50 Chennai chemists shifted recommendation. Consumer search stable — this is trade-driven and recoverable.", category: "Zandu Balm" },
  { id: 3, severity: "high", headline: "BoroPlus Lotion ₹49 reorder rate in Lucknow at 88% — pharmacy-first playbook validated", detail: "Pharmacy: 91% reorder. GT: 32%. Three adjacent districts (Kanpur, Varanasi, Allahabad) ready for replication.", category: "BoroPlus" },
  { id: 4, severity: "high", headline: "Weather Bureau forecasts summer onset 10 days early — pre-load Navratna and Dermicool at East Zone distributors", detail: "5 of 9 East Zone distributors below 12 days stock cover. Historical: early summer triggers 30-40% demand spike. Orders must be placed by Thursday.", category: "Navratna · Dermicool" },
  { id: 5, severity: "high", headline: "Kesh King Gold relaunch riding strong digital pull — Rx prescriptions up 28%, e-com review velocity 3x pre-relaunch", detail: "Amazon Kesh King Gold 4.3★ (2,100+ reviews in 6 weeks). Indulekha still #1 but gap narrowing. Premium ₹399 SKU +34% WoW. Campaign paced to end Feb 28 — needs 3-week extension.", category: "Kesh King" },
];
const insights = [
  { id: 1, priority: "critical", type: "Competitive Alert", category: "Navratna", region: "Bihar · East Zone", headline: "Navratna losing ground in Bihar — Dabur Cool King campaign redirecting cool oil demand ahead of summer peak", subtitle: "Navratna value share down 1.8pp in East Zone while cool oil category grew 8%. Demand exists but is being captured by Dabur's new entrant brand.",
    kpis: [{ label: "Navratna Share Change", value: "-1.8pp", note: "64.2% → 62.4%" }, { label: "Cool King Gain", value: "+2.1pp", note: "3.8% → 5.9%" }, { label: "Category Growth", value: "+8%", note: "Demand is healthy" }, { label: "Patna Primary Drop", value: "-24%", note: "₹6.8L → ₹5.2L" }],
    evidence: [{ source: "Retail Panel Data", summary: "Navratna value share declined 64.2% → 62.4% (-1.8pp) in East Zone. Dabur Cool King gained 2.1pp to 5.9%. Cool oil category grew 8% — competitive share loss, not demand decline. Marico Red King also gained 0.4pp." }, { source: "Search Trends + E-com", summary: "'Thanda tel' in Bihar +22% over 4 weeks. 'Navratna' search flat, 'Cool King oil' +68% off low base. Amazon 'cooling hair oil' Patna +19% with Cool King in top sponsored results." }, { source: "Competitive Media", summary: "Dabur running 18 active social ad sets in Bhojpuri since Jan 22 — first-ever regional push in cool oil. Targeting Patna-Muzaffarpur-Gaya. SOV moved 8% → 19%." }, { source: "DMS (Internal Sales)", summary: "Patna ASM: -24%. Muzaffarpur ASM: -18%. Gaya: -12%. Bhagalpur: -5%. Sachet SKU most affected (-28% Patna)." }, { source: "Seasonal Calendar", summary: "Pre-summer approaching (March-April) — historically drives 30-40% cool oil uplift. If not countered, Cool King captures seasonal demand in Bihar for the first time." }],
    salesAction: "Brief Patna and Muzaffarpur ASMs to counter-detail top 60 chemists. Request ₹0.50-off trade scheme on Navratna sachets for Bihar for 4 weeks. Ensure sachet stock-up ahead of peak.", marketingAction: "Commission Bhojpuri counter-campaign on YouTube and Facebook. Activate Salman Khan TVC refresh for Bihar digital media buy.",
    agentTrail: [{ agent: "Orchestrator", icon: "◈", action: "Detected anomaly: Navratna primary declining in Bihar while category growing", routing: "Dispatching to Market Share, Consumer Demand, Competitive Media, and Commercial Performance Agents" }, { agent: "Market Share Agent", icon: "▣", source: "Retail Panel — East Zone Cool Oil", query: "SELECT brand, value_share, share_change_pp FROM nielsen_category_share WHERE category='Cool_Oil' AND zone='East'", finding: "Navratna 64.2% → 62.4%. Cool King 3.8% → 5.9%. Red King 1.7% → 2.1%. Category +8%.", inference: "Two new entrants gaining simultaneously. Cool King is primary threat." }, { agent: "Consumer Demand Agent", icon: "◉", source: "Search Trends · Amazon Search", query: "google_trends(keywords=['thanda tel','cool king oil'], geo='BIHAR', timeframe='4w')", finding: "'Thanda tel' Bihar +22%. 'Cool King' +68% off low base. Amazon: Cool King in top sponsored.", inference: "Category demand rising but Cool King capturing incremental search." }, { agent: "Competitive Media Agent", icon: "◆", source: "Social Ad Monitor", query: "meta_ad_library(advertiser='Dabur_Cool_King', region='Bihar', timeframe='4w')", finding: "18 ad sets in Bhojpuri. Patna-Muzaffarpur-Gaya targeting. SOV 8% → 19%.", inference: "First serious Dabur entry into Navratna's core category. Sustained investment." }, { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Four signals converge. First serious challenge to Navratna's 67% cool oil dominance. Counter-action needed before summer peak." }],
  },
  { id: 2, priority: "high", type: "Demand Signal", category: "BoroPlus", region: "North India · Zone A", headline: "BoroPlus winter outperformance — Lotion variant and premium Soft driving trading-up in pharmacy", subtitle: "Extended cold wave pushing BoroPlus beyond winter window. BoroPlus Soft +26% WoW. 118% of target.",
    kpis: [{ label: "Achievement", value: "118%", note: "Of winter target" }, { label: "Lotion Uplift", value: "+34%", note: "vs seasonal norm" }, { label: "Search Uplift", value: "+28%", note: "Above seasonal norm" }, { label: "Soft Growth", value: "+26% WoW", note: "Premium SKU" }],
    evidence: [{ source: "IMD + Search", summary: "Cold wave extended 12 days. Search 'dry skin cream' +32% above seasonal norms." }, { source: "DMS + Q-comm", summary: "118% target. Weekly ₹48L → ₹72L. Soft +26% WoW. Q-comm Delhi NCR +52% WoW." }, { source: "Campaign", summary: "Amitabh Bachchan campaign: CTR 2.4% (vs 1.8% benchmark). ₹22L incremental at 3.8x ROAS." }],
    salesAction: "Maintain full range in North India. Ensure Soft stocked at pharmacy. Verify Q-comm stock.", marketingAction: "Extend campaign 2 weeks beyond Feb 15. 3.8x ROAS justifies investment.",
    agentTrail: [{ agent: "Orchestrator", icon: "◈", action: "Environmental signal: cold wave persisting", routing: "Dispatching to Environmental, Commercial, Campaign Agents" }, { agent: "Environmental Data Agent", icon: "◇", source: "IMD · Search Trends", query: "imd_temperature(region='North_India', timeframe='30d')", finding: "Sub-10°C extending 12 days. 'Dry skin cream' +32%.", inference: "2-3 week extended demand window." }, { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: MEDIUM-HIGH on duration, HIGH on demand. 3.8x ROAS. Recommend extension + full stock." }],
  },
  { id: 3, priority: "critical", type: "Competitive Alert", category: "Zandu Balm", region: "Tamil Nadu · South Zone", headline: "Amrutanjan Strong margin scheme undercutting Zandu Balm in Chennai-Coimbatore pharmacy channel", subtitle: "Amrutanjan offering 24% retail margin vs Zandu Balm's 17%. 18 of top-50 Chennai chemists shifted. Trade-driven, recoverable.",
    kpis: [{ label: "Margin Gap", value: "7pp", note: "24% vs 17%" }, { label: "Chemists Flipped", value: "18 / 50", note: "Top Chennai" }, { label: "Pharmacy Velocity", value: "-22%", note: "2-week decline" }, { label: "Consumer Search", value: "Stable", note: "Trade-driven" }],
    evidence: [{ source: "Field Reports (SFA)", summary: "4 ASMs reported Amrutanjan 24% margin + buy 10 get 2 free. Targeting top-volume pharmacies." }, { source: "DMS + Retail Panel", summary: "18 of 50 Chennai chemists: Zandu velocity -30%+. National combined share still 55% but TN eroding." }, { source: "Search Trends", summary: "'Headache balm' TN: stable. Entirely trade-level margin play." }],
    salesAction: "Push Zandu Ultra Power (higher-margin SKU). Joint visits to top 25 lost chemists.", marketingAction: "'Trusted since 1910' POS campaign. Tamil-language digital reinforcing pull.",
    agentTrail: [{ agent: "Orchestrator", icon: "◈", action: "Zandu velocity drop in TN exceeding -22% in 2W", routing: "Dispatching to Field Intelligence, Distribution, Consumer Demand" }, { agent: "Field Intelligence Agent", icon: "◆", source: "SFA — TN", query: "SELECT asm_name, competitor_brand, details FROM asm_field_reports WHERE state='Tamil_Nadu'", finding: "24% margin + free goods. Targeting top pharmacies.", inference: "7pp gap sufficient to flip recommendations." }, { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Two paths: match margin (expensive) or Ultra Power positioning (preferred). Time-sensitive." }],
  },
  { id: 4, priority: "high", type: "Distribution Opportunity", category: "BoroPlus", region: "UP East", headline: "BoroPlus Lotion ₹49 pharmacy-first validated — 91% reorder in Lucknow, playbook ready", subtitle: "Pharmacy 91% reorder vs GT 32%. Kanpur, Varanasi, Allahabad next.",
    kpis: [{ label: "Lucknow Reorder", value: "88%", note: "2.8x territory avg" }, { label: "Pharmacy Reorder", value: "91%", note: "Recommendation loop" }, { label: "GT Reorder", value: "32%", note: "No recommendation" }, { label: "Adjacent Districts", value: "3", note: "Kanpur, Varanasi, Allahabad" }],
    evidence: [{ source: "DMS (Outlet Reorder)", summary: "Lucknow pharmacy: 91%. GT: 32%. Gorakhpur GT-led: 29%. Pharmacist recommendation creates repeat loop." }, { source: "E-com Reviews", summary: "Amazon: 'chemist recommended for dry winter skin' as top trigger." }],
    salesAction: "Shift to pharmacy-first in adjacent districts. 250 chemists per district.", marketingAction: "Pharmacist education kit. 'Recommended by Lucknow pharmacists' POS.",
    agentTrail: [{ agent: "Orchestrator", icon: "◈", action: "Positive signal: BoroPlus ₹49 reorder 2.8x above avg", routing: "Distribution + Consumer Demand Agents" }, { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Pharmacy-first = 2.8x reorder. Replicable playbook." }],
  },
  { id: 5, priority: "high", type: "Seasonal Prep", category: "Navratna · Dermicool", region: "East Zone", headline: "Pre-summer stocking critically thin — 5 of 9 East Zone distributors will stock out if heatwave hits early", subtitle: "IMD forecasts 10 days early. 30-40% historical spike. 5 distributors below 12 days cover.",
    kpis: [{ label: "Avg Stock Cover", value: "14 days", note: "Normal rate" }, { label: "At Spike Rate", value: "10 days", note: "If early" }, { label: "At Risk", value: "5 / 9", note: "Below 12 days" }, { label: "Replenishment", value: "5-7 days", note: "From Kolkata" }],
    evidence: [{ source: "IMD + Historical", summary: "Onset Mar 8-12 vs normal Mar 18-22. 2024: 8 days early → 34% spike. 2023: 5 days → 28%." }, { source: "DMS (Inventory)", summary: "Ranchi, Jamshedpur, Bhubaneswar, Cuttack, Rourkela below 12 days. 5-7 day replenishment." }],
    salesAction: "Pre-emptive top-up orders by Thursday. 20% buffer for all East Zone.", marketingAction: "Summer campaigns ready for early activation (Mar 5 vs Mar 15).",
    agentTrail: [{ agent: "Orchestrator", icon: "◈", action: "Seasonal trigger: early summer onset forecast", routing: "Demand Forecasting + Distribution Agents" }, { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: MEDIUM-HIGH. Downside of inaction far outweighs over-stocking. Recommend 20% buffer." }],
  },
  { id: 6, priority: "high", type: "Launch Tracking", category: "Smart & Handsome", region: "UP · Bihar", headline: "Smart & Handsome rebrand: Amazon #4 validates demand, offline activation critically behind at 6% vs 20% plan", subtitle: "8 of 54 distributors ordered. Outlet mix 75:25 GT:Pharmacy — should be inverse.",
    kpis: [{ label: "Amazon Rank", value: "#4", note: "Men's face cream" }, { label: "Distributors", value: "8 / 54", note: "15% activation" }, { label: "GT Activation", value: "6%", note: "vs 20% plan" }, { label: "Channel Mix", value: "75:25", note: "GT:Pharma, flip" }],
    evidence: [{ source: "Amazon", summary: "#4 men's face cream. 4.1★, 1,800+ reviews. Strong demand validated." }, { source: "DMS", summary: "8 of 54 ordered. Many asking for 'Fair and Handsome'. Trade confusion." }, { source: "Search", summary: "Men's grooming +32% YoY in UP-Bihar Tier 3. Demand-supply mismatch." }],
    salesAction: "Must-stock all 54 distributors. Rebrand awareness sessions. Pharmacy-first flip.", marketingAction: "'As seen on Amazon' POS. Hrithik Roshan creative refresh.",
    agentTrail: [{ agent: "Orchestrator", icon: "◈", action: "Rebrand e-com outperforming, GT behind", routing: "E-com, Distribution, Consumer Demand Agents" }, { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Demand validated. Bottleneck is distribution + rebrand awareness." }],
  },
  { id: 7, priority: "high", type: "Performance Risk", category: "Mentho Plus", region: "Madhya Pradesh", headline: "Mentho Plus declining in MP rural — Dabur Red Balm gaining via direct van coverage model", subtitle: "Red Balm +2.4pp. 8 Dabur vans in haats. Mentho Plus distribution 42% → 34%.",
    kpis: [{ label: "Red Balm Gain", value: "+2.4pp", note: "8.2% → 10.6%" }, { label: "Mentho Plus Loss", value: "-1.6pp", note: "14.1% → 12.5%" }, { label: "Dist Drop", value: "-8pp", note: "42% → 34% rural" }, { label: "Dabur Vans", value: "8", note: "Bhopal, Indore, Jabalpur" }],
    evidence: [{ source: "Retail Panel (Central)", summary: "Red Balm +2.4pp. Mentho Plus -1.6pp. Rural dist: 42% → 34%. Distribution feeding share loss." }, { source: "Field Reports", summary: "8 Dabur vans in haats. Cross-portfolio sampling (Red Balm + Red Paste). Structural move." }],
    salesAction: "Rural sampling via sub-stockist. Mentho Plus + Zandu combos at haats.", marketingAction: "Rural-specific communication. Sachet trial at health camps.",
    agentTrail: [{ agent: "Orchestrator", icon: "◈", action: "Mentho Plus at 68% of target in MP", routing: "Market Share + Field Intelligence Agents" }, { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Structural threat. Dabur leveraging van infrastructure from oral care to balms. 8pp drop is alarming." }],
  },
];
const decisionLedger = [
  { id: "DL-W48", weekOf: "W48 · Nov 25, 2025", brand: "Navratna", region: "West Bengal · Kolkata", headline: "System recommended 15% buffer for Chhath Puja — field overrode to 25%, avoiding stockout",
    recommendation: "Pre-load 15% buffer Navratna stock for Kolkata distributors ahead of Chhath Puja week based on 3-year average uplift of 18-22%.",
    whatHappened: "overridden", overrideDetail: "RSH (Kolkata) overrode to 25%, citing 4 new Chhath ghats in South Kolkata and Navratna sachet gifting trend during puja.",
    outcome: "Actual spike: 29%. 25% buffer nearly exhausted — 2 of 6 distributors hit zero by Day 5. At 15%, 4 of 6 would have stocked out. Override was correct.", outcomeStatus: "positive",
    metricsBeforeAfter: [{ metric: "Demand Spike", system: "18-22%", actual: "29%" }, { metric: "Stockouts Prevented", system: "0 (at 15%)", actual: "0 (at 25%)" }, { metric: "Lost Sales Avoided", system: "N/A", actual: "~₹3.2L" }],
    systemLearning: "Festival demand model updated: Chhath Puja in Kolkata carries higher uplift than national average due to WB-specific gifting. Buffer calibrated at 25-30%. New feature: 'local festival significance modifier' and new-venue/new-ghat data from municipal filings as demand amplifier.",
    confidenceUpdate: "WB festival model: confidence bands widened from +/-5pp to +/-10pp for events with local cultural overlays.",
    relatedCurrentInsight: "Informs Insight #5 (pre-summer stocking) — system now applies wider confidence bands and higher buffer defaults for seasonal spikes.",
  },
  { id: "DL-W50", weekOf: "W50 · Dec 9, 2025", brand: "BoroPlus", region: "Delhi NCR", headline: "Q-comm pilot for BoroPlus Cream accepted — exceeded projections by 40%",
    recommendation: "Pilot BoroPlus Cream on Blinkit/Zepto in Delhi NCR with ₹5L spend. Projected: 800 orders/week at 2.8x ROAS.",
    whatHappened: "accepted", overrideDetail: null,
    outcome: "1,120 orders/week, 3.9x ROAS. Cold snap amplified impulse buying. BoroPlus Soft showed unexpected 18% attach rate in Q-comm baskets — premium trading-up on quick commerce.", outcomeStatus: "positive",
    metricsBeforeAfter: [{ metric: "Weekly Orders", system: "800", actual: "1,120" }, { metric: "ROAS", system: "2.8x", actual: "3.9x" }, { metric: "Soft Attach Rate", system: "Not modeled", actual: "18%" }],
    systemLearning: "Q-comm seasonal elasticity is 1.4x higher during weather events. Premium SKU attach rates on Q-comm significantly exceed GT/pharmacy — Q-comm shoppers trade up more. Premium SKU availability on Q-comm now a tracked KPI.",
    confidenceUpdate: "Q-comm projections carry 1.4x weather multiplier. Premium attach rate baselined at 15-20%.",
    relatedCurrentInsight: "Directly informs Insight #2 (BoroPlus winter outperformance) — Q-comm projections and premium tracking were seeded by this outcome.",
  },
  { id: "DL-W52", weekOf: "W52 · Dec 23, 2025", brand: "Kesh King", region: "Pan-India · E-com", headline: "System recommended delaying Kesh King Gold relaunch — CMO overrode, launched on schedule. Mixed result.",
    recommendation: "Delay relaunch by 2 weeks (Dec 15 → Jan 1) to avoid holiday media clutter. Projected: 15% lower CPM post-New Year.",
    whatHappened: "overridden", overrideDetail: "CMO cited: (1) Indulekha running competing holiday campaign, (2) Amazon festival traffic provides free demand, (3) packaging ready.",
    outcome: "CPM was 22% higher (system right on media). But Amazon captured 1,400 units in 48hrs (CMO right on demand). Net: 2,100 reviews in 6 weeks vs 1,600 projected — faster social proof. Appearing alongside Indulekha created comparison-driven trial.", outcomeStatus: "mixed",
    metricsBeforeAfter: [{ metric: "CPM", system: "₹85 (post-NYE)", actual: "₹104 (holiday)" }, { metric: "First 48hr Units", system: "~600", actual: "1,400" }, { metric: "6-Week Reviews", system: "~1,600", actual: "2,100" }],
    systemLearning: "Launch timing must co-weight media efficiency, platform traffic windows (Amazon sales = 2.2x multiplier), and competitive calendar. Pure CPM optimization is insufficient. Competitor co-presence during a relaunch can be net-positive (comparison-driven trial).",
    confidenceUpdate: "Launch timing: CPM-only deprecated. Multi-factor scoring adopted. System confidence in CPM-based recs downgraded from HIGH to MEDIUM.",
    relatedCurrentInsight: "Informs Kesh King Gold critical item — system now models Amazon traffic into campaign extension recommendations.",
  },
  { id: "DL-W01", weekOf: "W01 · Jan 6, 2026", brand: "Zandu Balm", region: "Karnataka · Bangalore", headline: "Zandu Ultra Power counter-positioning accepted for Bangalore — 60% chemist recovery in 3 weeks",
    recommendation: "Respond to Tiger Balm margin scheme with Zandu Ultra Power repositioning rather than margin-matching.",
    whatHappened: "accepted", overrideDetail: null,
    outcome: "12 of 20 lost chemists recovered (60%). Ultra Power carries 19% margin — sufficient for mid-tier. 8 premium South Bangalore chemists unrecovered — Tiger Balm's 'imported' positioning stronger there.", outcomeStatus: "positive",
    metricsBeforeAfter: [{ metric: "Chemists Recovered", system: "15 / 20", actual: "12 / 20" }, { metric: "Recovery Time", system: "4 weeks", actual: "3 weeks" }, { metric: "Margin Cost", system: "+2pp", actual: "+2pp" }],
    systemLearning: "Premium-SKU counter-positioning works in mid-tier pharmacies (75% recovery) but not premium urban (25%). New segmentation: mid-tier vs premium pharmacy for competitive response. Premium segment needs brand storytelling, not margin adjustment.",
    confidenceUpdate: "Ultra Power strategy: HIGH confidence for mid-tier, MEDIUM for premium urban pharmacies.",
    relatedCurrentInsight: "Directly informs Insight #3 (Zandu vs Amrutanjan in Chennai) — system recommends Ultra Power but flags premium chemists may need different playbook.",
  },
  { id: "DL-W02", weekOf: "W02 · Jan 13, 2026", brand: "Dermicool", region: "Rajasthan · West Zone", headline: "System flagged Nycil threat as HIGH — field downgraded to MEDIUM, lost 2 weeks and 0.9pp share",
    recommendation: "Nycil running pre-season sampling in Rajasthan. Recommended immediate counter: ₹2 sachet at 500 outlets + digital campaign.",
    whatHappened: "partially_accepted", overrideDetail: "RSH downgraded: 'Nycil has tried before, Dermicool is too strong here.' Approved sachets, delayed digital by 2 weeks.",
    outcome: "Nycil gained 1.8pp in delay window. Dermicool 34% → 32.2%. Post-activation recovery: +0.9pp. Net loss: 0.9pp — first meaningful share loss in Rajasthan in 18 months. System urgency was warranted.", outcomeStatus: "negative",
    metricsBeforeAfter: [{ metric: "Dermicool Share", system: "34% (hold)", actual: "34% → 32.2%" }, { metric: "Nycil Gain", system: "Prevent", actual: "+1.8pp" }, { metric: "Recovery", system: "N/A", actual: "+0.9pp partial" }],
    systemLearning: "Dismissing threats based on 'they've tried before' is a documented bias. Nycil's campaign was qualitatively different (direct sampling, not just media). System now flags when field downgrades threat assessment, and triggers 'downgrade review' if competitor gains >1pp in delay window. Pre-season sampling scored 1.5x vs in-season media in threat severity.",
    confidenceUpdate: "'Historical brand strength' discount reduced from 0.7x to 0.9x. Past resilience should not override current signals.",
    relatedCurrentInsight: "Why Navratna/Bihar (#1) is rated CRITICAL not HIGH — system is now less willing to discount competitive threats in historically strong markets.",
  },
  { id: "DL-W03", weekOf: "W03 · Jan 20, 2026", brand: "Smart & Handsome", region: "Maharashtra · Pune", headline: "System recommended pharmacy-first for Pune — ASM executed GT-first, confirming pharmacy is 4.5x more efficient",
    recommendation: "Activate rebrand via pharmacy-first (200 chemists) based on male grooming data: pharmacy drives 3x repeat vs GT.",
    whatHappened: "overridden", overrideDetail: "ASM: 'Our GT relationships are stronger. Pharmacy takes more effort.' Executed 180 GT outlets + 40 pharmacies.",
    outcome: "GT reorder: 14%. Pharmacy reorder: 52%. 180 GT outlets produced roughly equal volume to 40 pharmacies — pharmacy is 4.5x more efficient per outlet. ASM acknowledges pharmacy-first is correct but notes 2.3x more time per pharmacy outlet.", outcomeStatus: "negative",
    metricsBeforeAfter: [{ metric: "GT Reorder", system: "N/A (not rec'd)", actual: "14%" }, { metric: "Pharmacy Reorder", system: "~45-55%", actual: "52%" }, { metric: "Per-Outlet Efficiency", system: "3-4x pharmacy", actual: "4.5x pharmacy" }],
    systemLearning: "Channel-first recs face friction when conflicting with ASM relationships. New 'channel migration path' module: start with GT quick wins in Week 1, shift to pharmacy in Week 2-3. Respects field reality while achieving correct mix over 4 weeks. Pharmacy time-per-outlet (2.3x GT) now factored into workload planning.",
    confidenceUpdate: "Channel recs now carry 'execution feasibility' overlay. Pharmacy-first correct but operationalised as phased migration.",
    relatedCurrentInsight: "Informs Insight #6 (S&H in UP-Bihar) — system now recommends phased migration, not overnight switch.",
  },
];
const ledgerKPIs = [
  { label: "DECISIONS TRACKED (12W)", value: "24", delta: "6 shown below" },
  { label: "ACCEPTED AS-IS", value: "58%", delta: "14 / 24 decisions" },
  { label: "OVERRIDDEN BY FIELD", value: "29%", delta: "7 / 24 — 3 were correct overrides" },
  { label: "SYSTEM ACCURACY", value: "71%", delta: "Up from 64% in prior quarter", negative: false },
];
const territories = [
  { id: "delhi", name: "Delhi NCR", achievement: 96, status: "on-track", narrative: "Strongest. BoroPlus winter outperformance. Q-comm driving incremental volume.", keyWin: "BoroPlus Soft 128% in premium pharmacy", keyRisk: "S&H rebrand awareness low in GT", asmAreas: [{ name: "Delhi South + West", achievement: 101 }, { name: "Noida-Ghaziabad", achievement: 89 }], weeklyTrend: [{w:"W48",v:88},{w:"W49",v:91},{w:"W50",v:94},{w:"W51",v:93},{w:"W52",v:97},{w:"W1",v:98},{w:"W2",v:101},{w:"W3",v:103}] },
  { id: "up-east", name: "UP East", achievement: 85, status: "needs-attention", narrative: "Mixed. BoroPlus ₹49 breakthrough. S&H activation lagging.", keyWin: "BoroPlus Lotion ₹49 Lucknow 88% reorder", keyRisk: "S&H offline stalled", asmAreas: [{ name: "Lucknow-Kanpur", achievement: 92 }, { name: "Varanasi-Gorakhpur", achievement: 76 }, { name: "Allahabad-East", achievement: 81 }], weeklyTrend: [{w:"W48",v:92},{w:"W49",v:94},{w:"W50",v:91},{w:"W51",v:89},{w:"W52",v:86},{w:"W1",v:84},{w:"W2",v:82},{w:"W3",v:80}] },
  { id: "bihar", name: "Bihar", achievement: 74, status: "at-risk", narrative: "Under pressure. Navratna losing to Cool King. Pre-summer stocking thin.", keyWin: "Zandu Balm stable urban Patna", keyRisk: "Navratna sachet -28% Patna", asmAreas: [{ name: "Patna-Muzaffarpur", achievement: 69 }, { name: "Bhagalpur-Purnia", achievement: 80 }], weeklyTrend: [{w:"W48",v:108},{w:"W49",v:104},{w:"W50",v:100},{w:"W51",v:94},{w:"W52",v:88},{w:"W1",v:83},{w:"W2",v:78},{w:"W3",v:74}] },
  { id: "wb", name: "West Bengal", achievement: 91, status: "on-track", narrative: "Home market. BoroPlus + Navratna above target. Kesh King Gold gaining.", keyWin: "Navratna sachet 115% rural WB", keyRisk: "Dermicool summer stock build-up", asmAreas: [{ name: "Kolkata Metro", achievement: 94 }, { name: "North Bengal-Siliguri", achievement: 87 }], weeklyTrend: [{w:"W48",v:112},{w:"W49",v:114},{w:"W50",v:116},{w:"W51",v:114},{w:"W52",v:112},{w:"W1",v:110},{w:"W2",v:108},{w:"W3",v:107}] },
  { id: "mp", name: "Madhya Pradesh", achievement: 66, status: "at-risk", narrative: "Weakest. Mentho Plus declining via Dabur vans. Summer stocking critical.", keyWin: "Zandu Pancharishta winter lift", keyRisk: "Mentho Plus rural -8pp", asmAreas: [{ name: "Bhopal-Indore", achievement: 72 }, { name: "Jabalpur-Sagar-East", achievement: 59 }], weeklyTrend: [{w:"W48",v:124},{w:"W49",v:121},{w:"W50",v:118},{w:"W51",v:112},{w:"W52",v:108},{w:"W1",v:104},{w:"W2",v:100},{w:"W3",v:97}] },
];

// ═══════════════════════ COMPONENTS ═══════════════════════
const SeverityIcon = ({ severity }) => { const isC = severity === "critical"; return <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: isC ? C.redPale : C.orangePale, color: isC ? C.red : C.orange, fontSize: 14, flexShrink: 0 }}>{isC ? "!" : "◷"}</div>; };
const PriorityBadge = ({ p }) => { const s = { critical: { bg: C.redPale, color: C.red, l: "CRITICAL" }, high: { bg: C.orangePale, color: C.orange, l: "HIGH PRIORITY" } }[p] || { bg: C.greenPale, color: C.green, l: "MEDIUM" }; return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", padding: "3px 10px", background: s.bg, color: s.color }}>{s.l}</span>; };
const StatusDot = ({ s }) => <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: { "on-track": C.green, "needs-attention": C.orange, "at-risk": C.red }[s], marginRight: 8, flexShrink: 0 }} />;
const OutcomeBadge = ({ status }) => { const m = { positive: { bg: C.greenPale, color: C.green, i: "✓", l: "VALIDATED" }, negative: { bg: C.redPale, color: C.red, i: "✗", l: "LESSON LEARNED" }, mixed: { bg: C.orangePale, color: C.orange, i: "◐", l: "MIXED" } }; const s = m[status] || m.mixed; return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", padding: "3px 10px", background: s.bg, color: s.color, display: "inline-flex", alignItems: "center", gap: 4 }}>{s.i} {s.l}</span>; };
const ActionBadge = ({ action }) => { const m = { accepted: { bg: C.greenPale, color: C.green, l: "ACCEPTED" }, overridden: { bg: C.orangePale, color: C.orange, l: "OVERRIDDEN" }, partially_accepted: { bg: C.bluePale, color: C.blue, l: "PARTIAL" } }; const s = m[action] || m.accepted; return <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", padding: "3px 10px", background: s.bg, color: s.color }}>{s.l}</span>; };

const AgentTrailModal = ({ insight, onClose }) => { if (!insight) return null; return (<div onClick={onClose} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(12,44,24,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 40 }}><div onClick={e => e.stopPropagation()} style={{ background: C.card, border: `1px solid ${C.border}`, width: "100%", maxWidth: 780, maxHeight: "85vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.18)" }}><div style={{ padding: "20px 28px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}><div><div style={{ ...label, fontSize: 10, color: C.green, marginBottom: 6 }}>AGENT DECISION TRAIL</div><div style={{ fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.4 }}>{insight.headline}</div><div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>{insight.category} · {insight.region}</div></div><div onClick={onClose} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: C.textLight, border: `1px solid ${C.border}` }} onMouseEnter={e => { e.currentTarget.style.background = C.page; }} onMouseLeave={e => { e.currentTarget.style.background = C.card; }}>✕</div></div><div style={{ overflow: "auto", padding: "24px 28px" }}>{insight.agentTrail.map((step, i) => { const isLast = i === insight.agentTrail.length - 1; const isSyn = step.agent === "Synthesis"; return (<div key={i} style={{ display: "flex", gap: 14, paddingBottom: isLast ? 0 : 20, marginBottom: isLast ? 0 : 20, borderBottom: isLast ? "none" : `1px solid ${C.borderLight}` }}><div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}><div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: isSyn ? C.greenPale : C.card, border: `1px solid ${isSyn ? C.sage : C.border}`, fontSize: 12 }}>{step.icon}</div>{!isLast && <div style={{ width: 1, flex: 1, background: C.borderLight, marginTop: 6 }} />}</div><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: isSyn ? C.green : C.text }}>{step.agent}</div>{step.action && <div style={{ fontSize: 12, color: C.textMid, marginTop: 3, lineHeight: 1.5 }}>{step.action}</div>}{step.routing && <div style={{ fontSize: 11, color: C.sage, marginTop: 3, fontStyle: "italic" }}>{step.routing}</div>}{step.source && (<div style={{ marginTop: 10, padding: "12px 16px", background: C.page, border: `1px solid ${C.borderLight}` }}><div style={{ fontSize: 10, fontWeight: 600, color: C.textLight, marginBottom: 6 }}>SOURCE: {step.source}</div>{step.query && <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: C.textLight, marginBottom: 10, wordBreak: "break-all", lineHeight: 1.5, padding: "8px 10px", background: C.card, borderRadius: 2 }}>{step.query}</div>}<div style={{ fontSize: 12, color: C.text, lineHeight: 1.6, marginBottom: step.inference ? 6 : 0 }}><span style={{ fontWeight: 600 }}>Finding: </span>{step.finding}</div>{step.inference && <div style={{ fontSize: 12, color: C.green, lineHeight: 1.6 }}><span style={{ fontWeight: 600 }}>Inference: </span>{step.inference}</div>}</div>)}{isSyn && step.inference && <div style={{ marginTop: 10, padding: "14px 18px", background: C.greenPale, borderLeft: `3px solid ${C.sage}` }}><div style={{ fontSize: 13, color: C.text, lineHeight: 1.65, fontWeight: 500 }}>{step.inference}</div></div>}</div></div>); })}</div></div></div>); };

const InsightCard = ({ insight, isExpanded, onToggle, onShowTrail }) => (<div style={{ ...cardBase, marginBottom: 12, overflow: "hidden" }}><div style={{ padding: "20px 28px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 16 }} onMouseEnter={e => e.currentTarget.style.background = "#FAFAF7"} onMouseLeave={e => e.currentTarget.style.background = C.card}><div onClick={onToggle} style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1 }}><SeverityIcon severity={insight.priority} /><div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.45 }}>{insight.headline}</div><div style={{ fontSize: 13, color: C.textMid, marginTop: 4, lineHeight: 1.5 }}>{insight.subtitle}</div></div></div><div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, marginTop: 2 }}><div onClick={ev => { ev.stopPropagation(); onShowTrail(insight); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.green, background: C.card, whiteSpace: "nowrap" }} onMouseEnter={e => e.currentTarget.style.background = C.greenPale} onMouseLeave={e => e.currentTarget.style.background = C.card}><span style={{ fontSize: 12 }}>◈</span>Decision Trail</div><span style={{ ...label, fontSize: 10 }}>{insight.category}</span><span onClick={onToggle} style={{ fontSize: 12, color: C.sage, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", cursor: "pointer" }}>▾</span></div></div>{isExpanded && (<div style={{ borderTop: `1px solid ${C.border}` }}><div style={{ padding: "18px 28px 12px", display: "flex", gap: 10, alignItems: "center" }}><PriorityBadge p={insight.priority} /><span style={{ fontSize: 12, color: C.textLight }}>{insight.type} · {insight.region}</span></div><div style={{ display: "flex", margin: "0 28px 20px", border: `1px solid ${C.border}` }}>{insight.kpis.map((k, i) => (<div key={i} style={{ flex: 1, padding: "16px 20px", borderRight: i < insight.kpis.length - 1 ? `1px solid ${C.borderLight}` : "none" }}><div style={{ ...label, fontSize: 9, marginBottom: 6 }}>{k.label}</div><div style={{ fontSize: 24, fontWeight: 700, color: C.text }}>{k.value}</div><div style={{ fontSize: 11, color: C.textLight, marginTop: 3 }}>{k.note}</div></div>))}</div><div style={{ margin: "0 28px 20px", padding: "22px 24px", border: `1px solid ${C.border}` }}><div style={{ ...label, fontSize: 10, color: C.orange, marginBottom: 16 }}>DECISION — RECOMMENDED ACTIONS</div><div style={{ marginBottom: 16 }}><div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 5 }}>Sales</div><div style={{ fontSize: 14, color: C.text, lineHeight: 1.65 }}>{insight.salesAction}</div></div><div><div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 5 }}>Marketing</div><div style={{ fontSize: 14, color: C.text, lineHeight: 1.65 }}>{insight.marketingAction}</div></div></div><div style={{ margin: "0 28px 24px" }}><div style={{ ...label, fontSize: 10, marginBottom: 12 }}>SUPPORTING EVIDENCE</div><div style={{ background: C.page, padding: "20px 24px" }}>{insight.evidence.map((e, i) => (<div key={i} style={{ marginBottom: i < insight.evidence.length - 1 ? 14 : 0, paddingBottom: i < insight.evidence.length - 1 ? 14 : 0, borderBottom: i < insight.evidence.length - 1 ? `1px solid ${C.borderLight}` : "none" }}><div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 4 }}>{e.source}</div><div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{e.summary}</div></div>))}</div></div></div>)}</div>);

const LedgerCard = ({ decision, isExpanded, onToggle }) => (<div style={{ ...cardBase, marginBottom: 12, overflow: "hidden" }}><div onClick={onToggle} style={{ padding: "20px 28px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 16 }} onMouseEnter={e => e.currentTarget.style.background = "#FAFAF7"} onMouseLeave={e => e.currentTarget.style.background = C.card}><div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: decision.outcomeStatus === "positive" ? C.greenPale : decision.outcomeStatus === "negative" ? C.redPale : C.orangePale, color: decision.outcomeStatus === "positive" ? C.green : decision.outcomeStatus === "negative" ? C.red : C.orange, fontSize: 13, flexShrink: 0, fontWeight: 700 }}>{decision.outcomeStatus === "positive" ? "✓" : decision.outcomeStatus === "negative" ? "✗" : "◐"}</div><div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 600, color: C.text, lineHeight: 1.45 }}>{decision.headline}</div><div style={{ fontSize: 12, color: C.textLight, marginTop: 4 }}>{decision.brand} · {decision.region} · {decision.weekOf}</div></div><div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginTop: 2 }}><ActionBadge action={decision.whatHappened} /><OutcomeBadge status={decision.outcomeStatus} /><span style={{ fontSize: 12, color: C.sage, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span></div></div>{isExpanded && (<div style={{ borderTop: `1px solid ${C.border}` }}><div style={{ padding: "20px 28px 0" }}><div style={{ ...label, fontSize: 10, color: C.green, marginBottom: 8 }}>SYSTEM RECOMMENDATION</div><div style={{ fontSize: 14, color: C.text, lineHeight: 1.65, padding: "14px 18px", background: C.greenPale, borderLeft: `3px solid ${C.sage}`, marginBottom: 16 }}>{decision.recommendation}</div></div>{decision.overrideDetail && <div style={{ padding: "0 28px" }}><div style={{ ...label, fontSize: 10, color: C.orange, marginBottom: 8 }}>{decision.whatHappened === "overridden" ? "FIELD OVERRIDE" : "PARTIAL ACCEPTANCE"}</div><div style={{ fontSize: 14, color: C.text, lineHeight: 1.65, padding: "14px 18px", background: C.orangePale, borderLeft: `3px solid ${C.orange}`, marginBottom: 16 }}>{decision.overrideDetail}</div></div>}<div style={{ padding: "0 28px" }}><div style={{ ...label, fontSize: 10, color: decision.outcomeStatus === "positive" ? C.green : decision.outcomeStatus === "negative" ? C.red : C.orange, marginBottom: 8 }}>ACTUAL OUTCOME</div><div style={{ fontSize: 14, color: C.text, lineHeight: 1.65, marginBottom: 16 }}>{decision.outcome}</div></div><div style={{ padding: "0 28px", marginBottom: 20 }}><table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["Metric", "System Projected", "Actual"].map(h => <th key={h} style={{ ...label, fontSize: 9, textAlign: "left", padding: "10px 14px", borderBottom: `1px solid ${C.border}`, background: C.page }}>{h}</th>)}</tr></thead><tbody>{decision.metricsBeforeAfter.map((m, i) => (<tr key={i}><td style={{ fontSize: 13, color: C.text, padding: "10px 14px", borderBottom: `1px solid ${C.borderLight}`, fontWeight: 500 }}>{m.metric}</td><td style={{ fontSize: 12, color: C.textMid, padding: "10px 14px", borderBottom: `1px solid ${C.borderLight}`, fontFamily: "'JetBrains Mono', monospace" }}>{m.system}</td><td style={{ fontSize: 12, color: C.text, padding: "10px 14px", borderBottom: `1px solid ${C.borderLight}`, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{m.actual}</td></tr>))}</tbody></table></div><div style={{ margin: "0 28px 20px", padding: "20px 24px", background: C.page, border: `1px solid ${C.borderLight}` }}><div style={{ ...label, fontSize: 10, color: C.sage, marginBottom: 10 }}>SYSTEM LEARNING</div><div style={{ fontSize: 13, color: C.text, lineHeight: 1.7, marginBottom: 14 }}>{decision.systemLearning}</div><div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 12 }}><div style={{ ...label, fontSize: 9, color: C.textLight, marginBottom: 6 }}>CONFIDENCE CALIBRATION</div><div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.6, fontStyle: "italic" }}>{decision.confidenceUpdate}</div></div></div>{decision.relatedCurrentInsight && <div style={{ margin: "0 28px 24px", padding: "14px 18px", background: C.bluePale, borderLeft: `3px solid ${C.blue}` }}><div style={{ fontSize: 10, fontWeight: 700, color: C.blue, letterSpacing: "0.06em", marginBottom: 4 }}>CONNECTION TO CURRENT INSIGHTS</div><div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>{decision.relatedCurrentInsight}</div></div>}</div>)}</div>);

const TerritoryRow = ({ t, isExpanded, onToggle }) => { const sc = { "on-track": C.green, "needs-attention": C.orange, "at-risk": C.red }[t.status]; return (<div style={{ ...cardBase, marginBottom: 8, overflow: "hidden" }}><div onClick={onToggle} style={{ padding: "18px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: 20 }} onMouseEnter={e => e.currentTarget.style.background = "#FAFAF7"} onMouseLeave={e => e.currentTarget.style.background = C.card}><StatusDot s={t.status} /><div style={{ width: 130, fontSize: 14, fontWeight: 600, color: C.text }}>{t.name}</div><div style={{ width: 120, display: "flex", alignItems: "center", gap: 10 }}><div style={{ flex: 1, height: 4, background: C.borderLight }}><div style={{ width: `${Math.min(t.achievement, 100)}%`, height: "100%", background: sc }} /></div><span style={{ fontSize: 14, fontWeight: 700, color: sc, minWidth: 36 }}>{t.achievement}%</span></div><div style={{ flex: 1, fontSize: 13, color: C.textMid, lineHeight: 1.45 }}>{t.narrative}</div><span style={{ fontSize: 12, color: C.sage, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span></div>{isExpanded && (<div style={{ borderTop: `1px solid ${C.border}`, padding: "20px 28px" }}><div style={{ display: "flex", gap: 24, marginBottom: 20 }}><div style={{ flex: 1 }}><div style={{ ...label, fontSize: 10, marginBottom: 12 }}>ASM Area Breakdown</div><table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["ASM Area", "Achievement"].map(h => <th key={h} style={{ ...label, fontSize: 9, textAlign: "left", padding: "8px 12px", borderBottom: `1px solid ${C.border}` }}>{h}</th>)}</tr></thead><tbody>{t.asmAreas.map((a, i) => (<tr key={i}><td style={{ fontSize: 13, color: C.text, padding: "10px 12px", borderBottom: `1px solid ${C.borderLight}` }}>{a.name}</td><td style={{ fontSize: 13, fontWeight: 600, color: a.achievement >= 85 ? C.green : a.achievement >= 75 ? C.orange : C.red, padding: "10px 12px", borderBottom: `1px solid ${C.borderLight}` }}>{a.achievement}%</td></tr>))}</tbody></table></div><div style={{ width: 260 }}><div style={{ ...label, fontSize: 10, marginBottom: 12 }}>Weekly Index (target = 100)</div><div style={{ height: 100 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={t.weeklyTrend} barCategoryGap="18%"><XAxis dataKey="w" tick={{ fontSize: 9, fill: C.textLight }} axisLine={{ stroke: C.border }} tickLine={false} /><Bar dataKey="v" fill={sc} radius={[2,2,0,0]} opacity={0.8} /></BarChart></ResponsiveContainer></div></div></div><div style={{ display: "flex", gap: 16 }}><div style={{ flex: 1, padding: "12px 16px", background: C.greenPale }}><div style={{ fontSize: 10, fontWeight: 700, color: C.green, marginBottom: 4 }}>KEY WIN</div><div style={{ fontSize: 12, color: C.text }}>{t.keyWin}</div></div><div style={{ flex: 1, padding: "12px 16px", background: C.orangePale }}><div style={{ fontSize: 10, fontWeight: 700, color: C.orange, marginBottom: 4 }}>KEY RISK</div><div style={{ fontSize: 12, color: C.text }}>{t.keyRisk}</div></div></div></div>)}</div>); };


// ======================= BRAND PORTFOLIO DATA =======================
const brandPortfolio = [
  {
    name: "Navratna", category: "Cool Oil", marketShare: "62.4%", shareChange: "-1.8pp", shareTrend: "down",
    revenue: "418", revenueGrowth: "+6%", achievement: 84,
    distribution: { numeric: 82, weighted: 91 },
    status: "watch",
    topSKU: "Navratna Cool Oil 200ml",
    topRegion: "West Bengal (115%)",
    weakRegion: "Bihar (74%)",
    keyIssue: "Dabur Cool King + Marico Red King entering cool oil for the first time. Bihar sachet sales -28%.",
    keyWin: "Sachet innovation (\u20B91, \u20B92) drives 40% of rural volume. Summer portfolio anchor.",
    competitors: [
      { name: "Dabur Cool King", share: "5.9%", trend: "up" },
      { name: "Marico Red King", share: "2.1%", trend: "up" },
      { name: "Himgange", share: "3.4%", trend: "flat" },
    ],
    weeklyIndex: [{w:"W48",v:98},{w:"W49",v:96},{w:"W50",v:93},{w:"W51",v:90},{w:"W52",v:87},{w:"W1",v:85},{w:"W2",v:84},{w:"W3",v:84}],
  },
  {
    name: "BoroPlus", category: "Antiseptic Cream", marketShare: "74.2%", shareChange: "+0.6pp", shareTrend: "up",
    revenue: "520", revenueGrowth: "+14%", achievement: 118,
    distribution: { numeric: 78, weighted: 88 },
    status: "healthy",
    topSKU: "BoroPlus Antiseptic Cream 80ml",
    topRegion: "Delhi NCR (128%)",
    weakRegion: "South Zone (72%)",
    keyIssue: "Seasonal brand \u2014 winter portfolio. Need to extend BoroPlus Soft and Lotion year-round.",
    keyWin: "74% market share unchallenged. Q-comm emerging as impulse channel (+52% WoW in cold wave). BoroPlus Soft trading-up validated.",
    competitors: [
      { name: "Boroline", share: "12.8%", trend: "flat" },
      { name: "Himalaya Antiseptic", share: "4.1%", trend: "flat" },
      { name: "Nivea Creme", share: "3.2%", trend: "up" },
    ],
    weeklyIndex: [{w:"W48",v:102},{w:"W49",v:108},{w:"W50",v:112},{w:"W51",v:115},{w:"W52",v:118},{w:"W1",v:120},{w:"W2",v:119},{w:"W3",v:118}],
  },
  {
    name: "Zandu Balm", category: "Pain Balm", marketShare: "34.2%", shareChange: "-0.8pp", shareTrend: "down",
    revenue: "312", revenueGrowth: "+4%", achievement: 78,
    distribution: { numeric: 68, weighted: 82 },
    status: "risk",
    topSKU: "Zandu Balm 8ml",
    topRegion: "North Zone (92%)",
    weakRegion: "Tamil Nadu (61%)",
    keyIssue: "Amrutanjan 24% margin scheme flipping chemists in Chennai-Coimbatore. TN is Amrutanjan home market.",
    keyWin: "Combined Zandu + Mentho Plus = 55% national share. Ultra Power counter-positioning validated in Bangalore pilot (60% recovery).",
    competitors: [
      { name: "Amrutanjan", share: "18.4%", trend: "up" },
      { name: "Tiger Balm", share: "6.2%", trend: "flat" },
      { name: "Iodex Balm", share: "5.8%", trend: "down" },
    ],
    weeklyIndex: [{w:"W48",v:88},{w:"W49",v:86},{w:"W50",v:83},{w:"W51",v:80},{w:"W52",v:79},{w:"W1",v:78},{w:"W2",v:77},{w:"W3",v:78}],
  },
  {
    name: "Kesh King", category: "Ayurvedic Hair Oil", marketShare: "28.6%", shareChange: "+1.2pp", shareTrend: "up",
    revenue: "248", revenueGrowth: "+12%", achievement: 92,
    distribution: { numeric: 52, weighted: 71 },
    status: "watch",
    topSKU: "Kesh King Gold 100ml",
    topRegion: "E-com Pan-India (112%)",
    weakRegion: "South Zone (64%)",
    keyIssue: "Indulekha (#1 at 34%) still leads. Distribution gap in offline \u2014 52% numeric vs Indulekha's 61%.",
    keyWin: "Gold relaunch gaining traction. Amazon 4.3\u2605, 2,100 reviews in 6 weeks. Premium \u20B9399 SKU +34% WoW. Competitor OOS capture yielding 2.3x conversion.",
    competitors: [
      { name: "Indulekha (HUL)", share: "34.1%", trend: "flat" },
      { name: "Patanjali Kesh Kanti", share: "11.2%", trend: "down" },
      { name: "Dabur Amla", share: "8.4%", trend: "flat" },
    ],
    weeklyIndex: [{w:"W48",v:84},{w:"W49",v:86},{w:"W50",v:88},{w:"W51",v:89},{w:"W52",v:90},{w:"W1",v:91},{w:"W2",v:92},{w:"W3",v:92}],
  },
  {
    name: "Smart & Handsome", category: "Men's Grooming", marketShare: "22.8%", shareChange: "-2.4pp", shareTrend: "down",
    revenue: "186", revenueGrowth: "-3%", achievement: 58,
    distribution: { numeric: 34, weighted: 48 },
    status: "watch",
    topSKU: "Smart & Handsome Cream 60g",
    topRegion: "Amazon E-com (#4)",
    weakRegion: "UP-Bihar offline (6% activation)",
    keyIssue: "Rebrand from Fair & Handsome causing trade confusion. Only 8 of 54 distributors ordered. GT:Pharmacy mix inverted.",
    keyWin: "Amazon #4 validates consumer acceptance. Men's grooming +32% YoY in Tier 3. Rebrand directionally correct \u2014 execution bottleneck, not demand.",
    competitors: [
      { name: "Nivea Men", share: "18.2%", trend: "up" },
      { name: "Garnier Men", share: "12.6%", trend: "flat" },
      { name: "Pond's Men", share: "8.1%", trend: "down" },
    ],
    weeklyIndex: [{w:"W48",v:72},{w:"W49",v:68},{w:"W50",v:64},{w:"W51",v:62},{w:"W52",v:60},{w:"W1",v:59},{w:"W2",v:58},{w:"W3",v:58}],
  },
  {
    name: "Mentho Plus", category: "Pain Balm", marketShare: "12.5%", shareChange: "-1.6pp", shareTrend: "down",
    revenue: "142", revenueGrowth: "-2%", achievement: 68,
    distribution: { numeric: 34, weighted: 52 },
    status: "risk",
    topSKU: "Mentho Plus Balm 9ml",
    topRegion: "East Zone (82%)",
    weakRegion: "MP rural (59%)",
    keyIssue: "Dabur Red Balm +2.4pp via 8 rural vans. Mentho Plus rural dist 42% \u2192 34% (\u22128pp). Structural threat.",
    keyWin: "Urban presence holding. Portfolio synergy with Zandu Balm for combined shelf space.",
    competitors: [
      { name: "Dabur Red Balm", share: "10.6%", trend: "up" },
      { name: "Moov (Reckitt)", share: "8.8%", trend: "flat" },
      { name: "Volini (Sun)", share: "6.2%", trend: "flat" },
    ],
    weeklyIndex: [{w:"W48",v:78},{w:"W49",v:76},{w:"W50",v:74},{w:"W51",v:72},{w:"W52",v:70},{w:"W1",v:69},{w:"W2",v:68},{w:"W3",v:68}],
  },
  {
    name: "Dermicool", category: "Prickly Heat Powder", marketShare: "32.2%", shareChange: "-0.9pp", shareTrend: "down",
    revenue: "198", revenueGrowth: "+18%", achievement: 94,
    distribution: { numeric: 62, weighted: 78 },
    status: "healthy",
    topSKU: "Dermicool Prickly Heat 150g",
    topRegion: "Rajasthan (108%)",
    weakRegion: "South Zone (71%)",
    keyIssue: "Nycil pre-season sampling threat in Rajasthan. Summer stocking critically thin in East Zone.",
    keyWin: "Strong #2 position behind Nycil. Summer portfolio anchor alongside Navratna. 18% growth in FY25.",
    competitors: [
      { name: "Nycil (Zydus)", share: "38.4%", trend: "flat" },
      { name: "Snake Brand", share: "4.2%", trend: "flat" },
      { name: "Navratna Cool Talc", share: "8.1%", trend: "up" },
    ],
    weeklyIndex: [{w:"W48",v:96},{w:"W49",v:95},{w:"W50",v:94},{w:"W51",v:94},{w:"W52",v:93},{w:"W1",v:93},{w:"W2",v:94},{w:"W3",v:94}],
  },
];

// ======================= BRAND CARD =======================
const BrandCard = ({ brand, isExpanded, onToggle }) => {
  const statusColor = { healthy: C.green, watch: C.orange, risk: C.red }[brand.status];
  const trendIcon = { up: "\u2197", down: "\u2198", flat: "\u2192" };
  return (
    <div style={{ ...cardBase, marginBottom: 12, overflow: "hidden" }}>
      <div onClick={onToggle} style={{ padding: "20px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: 20 }} onMouseEnter={e => e.currentTarget.style.background = "#FAFAF7"} onMouseLeave={e => e.currentTarget.style.background = C.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, width: 180 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{brand.name}</div>
            <div style={{ fontSize: 11, color: C.textLight }}>{brand.category}</div>
          </div>
        </div>
        <div style={{ width: 90, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>{brand.marketShare}</div>
          <div style={{ fontSize: 11, color: brand.shareTrend === "up" ? C.green : brand.shareTrend === "down" ? C.red : C.textLight }}>{brand.shareChange}</div>
        </div>
        <div style={{ width: 80, textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{"\u20B9"}{brand.revenue}Cr</div>
          <div style={{ fontSize: 11, color: brand.revenueGrowth.startsWith("+") ? C.green : C.red }}>{brand.revenueGrowth}</div>
        </div>
        <div style={{ width: 100, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, height: 4, background: C.borderLight }}><div style={{ width: `${Math.min(brand.achievement, 100)}%`, height: "100%", background: statusColor }} /></div>
          <span style={{ fontSize: 13, fontWeight: 700, color: statusColor, minWidth: 34 }}>{brand.achievement}%</span>
        </div>
        <div style={{ flex: 1, fontSize: 12, color: C.textMid, lineHeight: 1.4 }}>{brand.keyIssue.slice(0, 80)}...</div>
        <span style={{ fontSize: 12, color: C.sage, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>{"\u25BE"}</span>
      </div>
      {isExpanded && (
        <div style={{ borderTop: `1px solid ${C.border}`, padding: "24px 28px" }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
            {[
              { label: "MARKET SHARE", value: brand.marketShare, sub: brand.shareChange },
              { label: "NUMERIC DIST", value: `${brand.distribution.numeric}%`, sub: `Wtd: ${brand.distribution.weighted}%` },
              { label: "TOP REGION", value: brand.topRegion, sub: null },
              { label: "WEAK REGION", value: brand.weakRegion, sub: null },
            ].map((k, i) => (
              <div key={i} style={{ flex: 1, padding: "14px 16px", background: C.page, border: `1px solid ${C.borderLight}` }}>
                <div style={{ ...label, fontSize: 9, marginBottom: 6 }}>{k.label}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{k.value}</div>
                {k.sub && <div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{k.sub}</div>}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ ...label, fontSize: 10, marginBottom: 10 }}>Competitive Landscape</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>{["Competitor", "Share", "Trend"].map(h => <th key={h} style={{ ...label, fontSize: 9, textAlign: "left", padding: "8px 12px", borderBottom: `1px solid ${C.border}` }}>{h}</th>)}</tr></thead>
                <tbody>{brand.competitors.map((c, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 13, color: C.text, padding: "8px 12px", borderBottom: `1px solid ${C.borderLight}` }}>{c.name}</td>
                    <td style={{ fontSize: 13, fontWeight: 600, color: C.text, padding: "8px 12px", borderBottom: `1px solid ${C.borderLight}`, fontFamily: "'JetBrains Mono', monospace" }}>{c.share}</td>
                    <td style={{ fontSize: 13, color: c.trend === "up" ? C.red : c.trend === "down" ? C.green : C.textLight, padding: "8px 12px", borderBottom: `1px solid ${C.borderLight}` }}>{trendIcon[c.trend]} {c.trend}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <div style={{ width: 260 }}>
              <div style={{ ...label, fontSize: 10, marginBottom: 10 }}>Weekly Index (target = 100)</div>
              <div style={{ height: 100 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={brand.weeklyIndex} barCategoryGap="18%">
                    <XAxis dataKey="w" tick={{ fontSize: 9, fill: C.textLight }} axisLine={{ stroke: C.border }} tickLine={false} />
                    <Bar dataKey="v" fill={statusColor} radius={[2,2,0,0]} opacity={0.8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1, padding: "14px 18px", background: C.greenPale, borderLeft: `3px solid ${C.green}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.green, marginBottom: 4 }}>KEY WIN</div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{brand.keyWin}</div>
            </div>
            <div style={{ flex: 1, padding: "14px 18px", background: C.orangePale, borderLeft: `3px solid ${C.orange}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.orange, marginBottom: 4 }}>KEY ISSUE</div>
              <div style={{ fontSize: 12, color: C.text, lineHeight: 1.6 }}>{brand.keyIssue}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ======================= SIDEBAR =======================
const SidebarNavItem = ({ icon, label, active, count, onClick }) => (
  <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 16px", cursor: "pointer", background: active ? "rgba(59,184,150,0.08)" : "transparent", borderLeft: active ? "2px solid #3BB896" : "2px solid transparent", transition: "all 0.12s" }} onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }} onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
    <span style={{ fontSize: 14, opacity: active ? 0.9 : 0.4, color: "#FFF", width: 20, textAlign: "center" }}>{icon}</span>
    <span style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? "#FFFFFFDD" : "#FFFFFF70", flex: 1 }}>{label}</span>
    {count && <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 8, background: active ? "rgba(59,184,150,0.2)" : "rgba(255,255,255,0.08)", color: active ? "#3BB896" : "#FFFFFF50" }}>{count}</span>}
  </div>
);

const SidebarBrandDot = ({ name, status, active, onClick }) => {
  const colors = { healthy: "#3BB896", watch: C.orange, risk: C.red };
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 16px", cursor: "pointer", background: active ? "rgba(255,255,255,0.06)" : "transparent", borderLeft: active ? `2px solid ${colors[status]}` : "2px solid transparent", transition: "all 0.12s" }} onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }} onMouseLeave={e => { if (!active) e.currentTarget.style.background = active ? "rgba(255,255,255,0.06)" : "transparent"; }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors[status], flexShrink: 0 }} />
      <span style={{ fontSize: 11, color: active ? "#FFFFFFDD" : "#FFFFFF70", fontWeight: active ? 600 : 400 }}>{name}</span>
    </div>
  );
};

// ======================= MAIN =======================
export default function MarketPulse() {
  const [activeTab, setActiveTab] = useState("pulse");
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [expandedTerritory, setExpandedTerritory] = useState(null);
  const [trailInsight, setTrailInsight] = useState(null);
  const [expandedLedger, setExpandedLedger] = useState(null);
  const [expandedBrand, setExpandedBrand] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [ledgerFilter, setLedgerFilter] = useState("all");

  const filteredLedger = ledgerFilter === "all" ? decisionLedger : decisionLedger.filter(d => d.whatHappened === ledgerFilter || (ledgerFilter === "modified" && d.whatHappened === "partially_accepted"));

  const sidebarW = 220;

  return (
    <div className="overflow-auto" style={{ fontFamily: "'IBM Plex Sans', -apple-system, sans-serif", background: C.page, height: "100vh", color: C.text, display: "flex" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* SIDEBAR */}
      <div style={{ width: sidebarW, minWidth: sidebarW, background: C.header, borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, overflow: "auto" }}>

        {/* Logo */}
        <div style={{ padding: "18px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 17, fontWeight: 500, opacity: 0.9, color: "#FFF" }}>questt</span>
            <span style={{ color: "#3BB896", fontSize: 17, fontWeight: 700 }}>.</span>
          </div>

        </div>

        {/* Client badge */}
        <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 6, background: "linear-gradient(135deg, #D4A84B 0%, #B8892E 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#FFF", letterSpacing: "-0.5px" }}>E</span>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#FFFFFFCC" }}>Emami Ltd</div>
              <div style={{ fontSize: 9, color: "#FFFFFF45" }}>East + North Zone</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ padding: "0 16px 8px", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", color: "#FFFFFF30", textTransform: "uppercase" }}>Views</div>
          <SidebarNavItem icon={"\u25C9"} label="Market Pulse" active={activeTab === "pulse"} count="6" onClick={() => { setActiveTab("pulse"); setSelectedBrand(null); }} />
          <SidebarNavItem icon={"\u25C8"} label="Decision Ledger" active={activeTab === "ledger"} count="24" onClick={() => { setActiveTab("ledger"); setSelectedBrand(null); }} />
        </div>

        {/* Brand Portfolio health */}
        <div style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ padding: "0 16px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", color: "#FFFFFF30", textTransform: "uppercase" }}>Brands</span>
            {selectedBrand && <span onClick={() => setSelectedBrand(null)} style={{ fontSize: 9, color: "#3BB896", cursor: "pointer", opacity: 0.7 }}>Clear</span>}
          </div>
          {[
            { name: "Navratna", status: "watch" },
            { name: "BoroPlus", status: "healthy" },
            { name: "Zandu Balm", status: "risk" },
            { name: "Mentho Plus", status: "risk" },
            { name: "Kesh King", status: "watch" },
            { name: "Smart & Handsome", status: "watch" },
            { name: "Dermicool", status: "healthy" },
          ].map(b => (
            <SidebarBrandDot key={b.name} name={b.name} status={b.status} active={selectedBrand === b.name} onClick={() => { setSelectedBrand(selectedBrand === b.name ? null : b.name); setActiveTab("pulse"); }} />
          ))}
        </div>

        {/* System status pinned to bottom */}
        <div style={{ marginTop: "auto", padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3BB896", boxShadow: "0 0 6px rgba(59,184,150,0.4)" }} />
            <span style={{ fontSize: 10, color: "#FFFFFF60" }}>System healthy</span>
          </div>
          <div style={{ fontSize: 9, color: "#FFFFFF30", lineHeight: 1.6 }}>
            7 agents active<br />
            Last scan: 14 min ago<br />
            Next refresh: 46 min
          </div>
          <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontSize: 9, color: "#FFFFFF20", fontFamily: "'JetBrains Mono', monospace" }}>IW v3.2.1 | BKG 847 nodes</div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>

        {/* TOP BAR */}
        <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 100, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 44, gap: 16 }}>
          {/* Page title */}
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 400, color: C.text, margin: 0, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8 }}>
            {activeTab === "pulse" ? "Market Pulse" : "Decision Ledger"}
            {selectedBrand && activeTab === "pulse" && <><span style={{ color: C.textLight, fontWeight: 300 }}>/</span><span style={{ color: C.green }}>{selectedBrand}</span></>}
          </h1>

          {/* Search - compact */}
          <div onClick={() => setSearchOpen(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: C.page, border: `1px solid ${C.border}`, borderRadius: 3, cursor: "text", flex: 1, maxWidth: 260 }}>
            <span style={{ fontSize: 11, color: C.textLight }}>{"Search..."}</span>
            {searchOpen && <input autoFocus value={searchVal} onChange={e => setSearchVal(e.target.value)} onBlur={() => { if (!searchVal) setSearchOpen(false); }} style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", opacity: 0 }} />}
            <span style={{ fontSize: 9, color: C.border, marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", border: `1px solid ${C.borderLight}`, padding: "1px 4px", borderRadius: 2 }}>{"\u2318"}K</span>
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 11 }}>
              <span style={{ fontWeight: 600, color: C.text }}>W05</span>
              <span style={{ color: C.textLight }}>Feb 2, 2026</span>
              <span style={{ fontSize: 9, color: C.textLight }}>{"\u25BE"}</span>
            </div>
            <span style={{ fontSize: 9, color: C.textLight, whiteSpace: "nowrap" }}>Updated <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>14m ago</span></span>
            <div style={{ width: 1, height: 16, background: C.border }} />
            <div style={{ position: "relative", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a4.5 4.5 0 00-4.5 4.5c0 1.5-.5 3-1.5 4h12c-1-1-1.5-2.5-1.5-4A4.5 4.5 0 008 1.5z" stroke={C.textLight} strokeWidth="1.3" /><path d="M6 13a2 2 0 004 0" stroke={C.textLight} strokeWidth="1.3" /></svg>
              <div style={{ position: "absolute", top: -1, right: -2, width: 6, height: 6, borderRadius: "50%", background: C.red, border: "1.5px solid #FFF" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#FFF" }}>PS</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, color: C.text }}>Priya S.</span>
            </div>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div style={{ flex: 1, overflow: "auto" }}>
          <div style={{ maxWidth: 1020, padding: "28px 36px 60px" }}>

            {/* MARKET PULSE TAB */}
            {activeTab === "pulse" && (() => {
              const bp = selectedBrand ? brandPortfolio.find(b => b.name === selectedBrand) : null;
              const filteredCritical = selectedBrand ? criticalItems.filter(c => c.category.includes(selectedBrand) || c.category.includes(selectedBrand.split(" ")[0])) : criticalItems;
              const filteredInsights = selectedBrand ? insights.filter(ins => ins.category.includes(selectedBrand) || ins.category.includes(selectedBrand.split(" ")[0])) : insights;
              return (<>
                {/* Brand detail card when filtered */}
                {bp && (
                  <div style={{ ...cardBase, padding: "24px 28px", marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                          <span style={{ width: 10, height: 10, borderRadius: "50%", background: { healthy: C.green, watch: C.orange, risk: C.red }[bp.status] }} />
                          <span style={{ fontSize: 20, fontWeight: 600, color: C.text }}>{bp.name}</span>
                          <span style={{ fontSize: 12, color: C.textLight }}>{bp.category}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", background: { healthy: C.greenPale, watch: C.orangePale, risk: C.redPale }[bp.status], color: { healthy: C.green, watch: C.orange, risk: C.red }[bp.status] }}>{{ healthy: "HEALTHY", watch: "WATCH", risk: "AT RISK" }[bp.status]}</span>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                          {[
                            { l: "SHARE", v: bp.marketShare, s: bp.shareChange, c: bp.shareTrend === "up" ? C.green : bp.shareTrend === "down" ? C.red : C.textLight },
                            { l: "REVENUE", v: "\u20B9" + bp.revenue + "Cr", s: bp.revenueGrowth, c: bp.revenueGrowth.startsWith("+") ? C.green : C.red },
                            { l: "ACHIEVEMENT", v: bp.achievement + "%", s: bp.achievement >= 90 ? "On track" : "Behind", c: bp.achievement >= 90 ? C.green : C.orange },
                            { l: "NUMERIC DIST", v: bp.distribution.numeric + "%", s: "Wtd: " + bp.distribution.weighted + "%", c: C.textLight },
                          ].map((k, i) => (
                            <div key={i} style={{ padding: "10px 14px", background: C.page, border: `1px solid ${C.borderLight}`, flex: 1 }}>
                              <div style={{ ...label, fontSize: 8, marginBottom: 4 }}>{k.l}</div>
                              <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{k.v}</div>
                              <div style={{ fontSize: 10, color: k.c, marginTop: 2 }}>{k.s}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ width: 200 }}>
                        <div style={{ ...label, fontSize: 8, marginBottom: 6 }}>Weekly Index</div>
                        <div style={{ height: 70 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={bp.weeklyIndex} barCategoryGap="18%">
                              <XAxis dataKey="w" tick={{ fontSize: 8, fill: C.textLight }} axisLine={{ stroke: C.border }} tickLine={false} />
                              <Bar dataKey="v" fill={{ healthy: C.green, watch: C.orange, risk: C.red }[bp.status]} radius={[2,2,0,0]} opacity={0.8} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                          {bp.competitors.slice(0, 3).map((c, i) => (
                            <div key={i} style={{ fontSize: 9, color: C.textLight }}>
                              <span style={{ color: C.textMid, fontWeight: 500 }}>{c.name.split(" ")[0]}</span> {c.share}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                      <div style={{ flex: 1, padding: "10px 14px", background: C.greenPale, fontSize: 12, color: C.text, lineHeight: 1.5 }}><span style={{ fontWeight: 700, color: C.green, fontSize: 9, letterSpacing: "0.05em" }}>WIN </span>{bp.keyWin}</div>
                      <div style={{ flex: 1, padding: "10px 14px", background: C.orangePale, fontSize: 12, color: C.text, lineHeight: 1.5 }}><span style={{ fontWeight: 700, color: C.orange, fontSize: 9, letterSpacing: "0.05em" }}>ISSUE </span>{bp.keyIssue}</div>
                    </div>
                  </div>
                )}

                {/* KPIs (only when no brand filter) */}
                {!selectedBrand && <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>{portfolioKPIs.map((k, i) => (<div key={i} style={{ ...cardBase, padding: "22px 24px", flex: 1 }}><div style={{ ...label, fontSize: 10, marginBottom: 12 }}>{k.label}</div><div style={{ fontSize: 32, fontWeight: 600, color: C.text, lineHeight: 1 }}>{k.value}</div><div style={{ fontSize: 12, color: k.negative ? C.orange : C.textLight, marginTop: 8 }}>{k.delta}</div></div>))}</div>}

                {/* Critical Items */}
                {filteredCritical.length > 0 && <div style={{ marginBottom: 36 }}><h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, margin: "0 0 16px" }}>{selectedBrand ? "Critical Items" : "This Week's Critical Items"}</h2>{filteredCritical.map(it => (<div key={it.id} style={{ ...cardBase, marginBottom: 8, padding: "18px 28px", display: "flex", alignItems: "flex-start", gap: 16 }}><SeverityIcon severity={it.severity} /><div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.45 }}>{it.headline}</div><div style={{ fontSize: 13, color: C.textMid, marginTop: 6, lineHeight: 1.55 }}>{it.detail}</div></div></div>))}</div>}

                {/* Insights */}
                <div style={{ marginBottom: 40 }}><div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}><h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Insights & Decisions</h2><span style={{ fontSize: 12, color: C.textLight }}>{filteredInsights.length} {selectedBrand ? "for " + selectedBrand : "active"}</span></div>{filteredInsights.length > 0 ? filteredInsights.map(ins => (<InsightCard key={ins.id} insight={ins} isExpanded={expandedInsight === ins.id} onToggle={() => setExpandedInsight(expandedInsight === ins.id ? null : ins.id)} onShowTrail={setTrailInsight} />)) : <div style={{ ...cardBase, padding: "32px 28px", textAlign: "center" }}><div style={{ fontSize: 13, color: C.textLight }}>No active insights for {selectedBrand} this week.</div></div>}</div>

                {/* Territory (only when no brand filter) */}
                {!selectedBrand && <div><div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}><h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Territory Overview</h2><span style={{ fontSize: 12, color: C.textLight }}>5 territories</span></div>{territories.map(t => (<TerritoryRow key={t.id} t={t} isExpanded={expandedTerritory === t.id} onToggle={() => setExpandedTerritory(expandedTerritory === t.id ? null : t.id)} />))}</div>}
              </>);
            })()}

            {/* DECISION LEDGER TAB */}
            {activeTab === "ledger" && (<>
              <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>{ledgerKPIs.map((k, i) => (<div key={i} style={{ ...cardBase, padding: "22px 24px", flex: 1 }}><div style={{ ...label, fontSize: 10, marginBottom: 12 }}>{k.label}</div><div style={{ fontSize: 32, fontWeight: 600, color: C.text, lineHeight: 1 }}>{k.value}</div><div style={{ fontSize: 12, color: k.negative === false ? C.green : C.textLight, marginTop: 8 }}>{k.delta}</div></div>))}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Decision History</h2>
                <div style={{ display: "flex", gap: 6 }}>
                  {[{ key: "all", l: "All" }, { key: "accepted", l: "Accepted" }, { key: "overridden", l: "Overridden" }, { key: "modified", l: "Modified" }].map(f => (
                    <div key={f.key} onClick={() => setLedgerFilter(f.key)} style={{ fontSize: 11, fontWeight: ledgerFilter === f.key ? 700 : 500, color: ledgerFilter === f.key ? C.green : C.textLight, padding: "5px 14px", cursor: "pointer", background: ledgerFilter === f.key ? C.greenPale : "transparent", border: `1px solid ${ledgerFilter === f.key ? C.sage : C.border}` }}>{f.l}</div>
                  ))}
                </div>
              </div>
              {filteredLedger.map(d => (<LedgerCard key={d.id} decision={d} isExpanded={expandedLedger === d.id} onToggle={() => setExpandedLedger(expandedLedger === d.id ? null : d.id)} />))}
              {filteredLedger.length === 0 && (<div style={{ ...cardBase, padding: "40px 28px", textAlign: "center" }}><div style={{ fontSize: 14, color: C.textLight }}>No decisions matching this filter.</div></div>)}
            </>)}
          </div>
        </div>
      </div>

      {trailInsight && <AgentTrailModal insight={trailInsight} onClose={() => setTrailInsight(null)} />}
    </div>
  );
}

"use client"
import { useState } from "react";
import { Menu, Bell, Search, ChevronDown, Settings, LogOut, User, Shield, Send, Clock, CheckCircle, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const C = {
  header: "#111A15", page: "#FAFAF8", card: "#FFFFFF", border: "#E5E2DB",
  borderLight: "#F0EDE7", text: "#1C1C1C", textMid: "#555555", textLight: "#999999",
  green: "#2D5A3D", greenPale: "#EAF2EF", sage: "#2D5A3D",
  orange: "#946B1A", orangePale: "#FDFAF0", red: "#B33A3A", redPale: "#FDF3F3",
};
const label = { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textLight };
const cardBase = { background: C.card, border: `1px solid ${C.border}` };

// ═══════════════════════════════════════════════════════
// PORTFOLIO KPIs
// ═══════════════════════════════════════════════════════
const portfolioKPIs = [
  { label: "PORTFOLIO ACHIEVEMENT", value: "84%", delta: "−6% vs LYSM", negative: true },
  { label: "BRANDS ON TRACK", value: "3 / 6", delta: "DigestEase, FeverEase, PainAway behind", negative: true },
  { label: "PRIORITY ACTIONS", value: "5", delta: "2 critical, 3 high" },
  { label: "AVG NUMERIC DISTRIBUTION", value: "39%", delta: "−2pp vs last period", negative: true },
];

// ═══════════════════════════════════════════════════════
// CRITICAL ITEMS (ticker)
// ═══════════════════════════════════════════════════════
const criticalItems = [
  { id: 1, severity: "critical", headline: "DigestEase losing ground in Western State — QuickRelief regional campaign redirecting demand", detail: "Retail Panel Zone A: DigestEase −1.2pp while category grew 6%. QuickRelief running 14 regional-language social ad sets since Jan 18. City 1 primary sales −28%. Peak season approaching — action urgent.", category: "DigestEase" },
  { id: 2, severity: "critical", headline: "FeverEase chemist margins being undercut by PharmaRival 650 in Town A–Town B", detail: "CompLabs offering 22% retail margin vs FeverEase's 16%. 14 of top-40 Town A chemists shifted recommendation. Consumer search stable — this is trade-driven and recoverable.", category: "FeverEase" },
  { id: 3, severity: "high", headline: "DentaShield ₹20 reorder rate in Town C at 85% — pharmacy-first playbook validated", detail: "Pharmacy: 92% reorder. GT: 28%. Three adjacent districts (Town E, Town F, Town G) ready for replication.", category: "DentaShield" },
  { id: 4, severity: "high", headline: "Weather Bureau forecasts monsoon 8 days early — pre-load FeverEase and NasalClear at Central State distributors", detail: "4 of 8 Central State distributors below 10 days stock cover. Historical: early monsoon triggers 25–35% demand spike. Orders must be placed by Wednesday.", category: "FeverEase" },
  { id: 5, severity: "high", headline: "NasalClear riding extended pollution demand — Rx Analytics prescriptions up 32%, campaign extension needed", detail: "AQI >250 for 18 days past seasonal norm. Premium Spray premium SKU +22% WoW. Campaign paced to end Jan 31 — needs 2-week extension.", category: "NasalClear" },
];

// ═══════════════════════════════════════════════════════
// ALL INSIGHTS (DigestEase, NasalClear first, then rest)
// ═══════════════════════════════════════════════════════
const insights = [
  {
    id: 1, priority: "critical", type: "Competitive Alert", category: "DigestEase", region: "Western State · Zone A",
    headline: "DigestEase losing ground in Western State — QuickRelief regional campaign redirecting antacid demand",
    subtitle: "DigestEase value share down 1.2pp in Zone A while antacid category grew 6%. Demand exists but is being captured by competition.",
    kpis: [
      { label: "DigestEase Share Change", value: "−1.2pp", note: "62.4% → 61.2%" },
      { label: "QuickRelief Gain", value: "+1.7pp", note: "18.1% → 19.8%" },
      { label: "Category Growth", value: "+6%", note: "Demand is healthy" },
      { label: "City 1 Primary Drop", value: "−28%", note: "₹4.2L → ₹3.0L" },
    ],
    evidence: [
      { source: "Retail Panel Data", summary: "DigestEase value share declined 62.4% → 61.2% (−1.2pp) in Zone A. QuickRelief gained 1.7pp to 19.8%. Antacid category grew 6% — competitive share loss, not demand decline. DigestEase weighted distribution stable at 78%." },
      { source: "Search Trends + E-com", summary: "'Gas relief sachet' in Western State +18% over 4 weeks. 'DigestEase' search flat, 'QuickRelief' +42%. E-com Platform 'antacid sachet' City 1 +22% with QuickRelief in top sponsored results. Category demand is rising but being redirected." },
      { source: "Competitive Media (Social Ad Monitor)", summary: "QuickRelief running 14 active social ad sets in regional-dialect since Jan 18 — 3x normal campaign load. Targeting City 1–City 2 corridor. Organic social media post frequency 3x normal. Share of voice in antacid social moved 12% → 24%. Note: competitor views/CTR not available via public sources." },
      { source: "Social Listening", summary: "QuickRelief 'longer lasting relief' messaging gaining traction on social short-form in local/regional-dialect. No negative DigestEase sentiment — this is not a product issue, it's a media capture issue." },
      { source: "DMS (Internal Sales)", summary: "City 1 ASM: −28%. City 2 ASM: −22%. City 3: −8%. City 4: −3%. Decline concentrated in City 1–City 2 corridor matching campaign targeting. Sachet SKU most affected (−32% City 1)." },
      { source: "Seasonal Calendar", summary: "Peak season approaching (April–May) — historically drives 15–20% antacid uplift from heavy meals. Sachet format 3x more important during peak occasions. If not countered before then, QuickRelief captures seasonal demand too." },
    ],
    salesAction: "Brief City 1 and City 2 ASMs to counter-detail top 50 chemists. Request ₹1-off trade scheme on DigestEase sachets for Western State for 4 weeks. Prioritise sachet placement at high-footfall general stores and large chemists near event venues. Ensure sachet stock-up ahead of April peak season.",
    marketingAction: "Commission regional-language counter-campaign on Social Platform and YouTube targeting 'gas relief' and 'acidity remedy' search terms. Increase DigestEase sachet sampling at peak-season events in City 1–City 2. Adjust digital communication to intercept category searches before QuickRelief captures them.",
    nudgeConnection: "Push to City 1 and City 2 ASMs: 'QuickRelief campaign active in your territory. Prioritise sachet placement at top 50 chemists this week. Peak season demand approaching — ensure sachet stock at all large general stores.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Detected anomaly: DigestEase primary sales declining in Western State while category search volume and Retail Panel category growth both rising", routing: "Dispatching to Market Share Agent, Consumer Demand Agent, Competitive Media Agent, and Commercial Performance Agent for triangulation" },
      { agent: "Market Share Agent", icon: "▣", source: "Retail Panel Data — Zone A Antacid Category", query: "SELECT brand, value_share, volume_share, share_change_pp, weighted_distribution FROM nielsen_category_share WHERE category='Antacid' AND zone='Zone_A' AND period='Jan-26'", finding: "DigestEase value share 62.4% → 61.2% (−1.2pp). QuickRelief 18.1% → 19.8% (+1.7pp). Category grew 6%. Weighted distribution stable — this is a conversion shift, not availability.", inference: "DigestEase is losing share specifically to QuickRelief. Category is healthy. Problem is competitive, not demand-side." },
      { agent: "Consumer Demand Agent", icon: "◉", source: "Search Trends · Social Listening · E-com Platform Search", query: "google_trends(keywords=['gas relief sachet','eno','gas-o-fast'], geo='WEST_STATE', timeframe='4w') | social_listening(category='antacid', geo='Western State') | amazon_search(keywords=['antacid sachet'], geo='City 1')", finding: "Search: 'gas relief sachet' Western State +18%. 'DigestEase' flat. 'Gas-o-fast' +42%. E-com Platform: 'antacid sachet' City 1 +22%, QuickRelief in top sponsored positions. Social: QuickRelief 'longer lasting relief' narrative gaining traction on social short-form.", inference: "Category demand rising but QuickRelief capturing incremental search and social conversation. Regional-language content strategy intercepting purchase intent across Search, E-com Platform, and social." },
      { agent: "Competitive Media Agent", icon: "◆", source: "Social Ad Monitor · Social Share of Voice Tracking", query: "meta_ad_library(advertiser='QuickRelief', region='Western State', timeframe='4w') | social_sov(category='antacid', geo='Western State')", finding: "14 active social ad sets in regional-dialect since Jan 18 — 3x normal. Targeting City 1 and City 2. Regional-language testimonial creatives. Organic post frequency 3x. Share of voice moved 12% → 24%. Competitor views/CTR not observable via public sources.", inference: "Deliberate, well-resourced regional campaign. Combination of paid (14 ad sets) and organic (3x frequency) indicates sustained investment, not one-off burst." },
      { agent: "Commercial Performance Agent", icon: "▣", source: "DMS (DMS Platform) — Western State ASM Territories", query: "SELECT asm_territory, eno_primary_sales_4w, eno_primary_sales_prev_4w, pct_change, sku_split FROM dms_primary_sales WHERE state='Western State' AND brand='DigestEase' ORDER BY pct_change ASC", finding: "City 1 ASM: −28% (₹4.2L → ₹3.0L). City 2 ASM: −22%. City 3: −8%. City 4: −3%. Sachet SKU most impacted (−32% City 1). Geographic pattern matches QuickRelief campaign targeting exactly.", inference: "Impact concentrated in urban Western State, heaviest on sachet format — both consistent with competitor's messaging and geographic targeting." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Four independent signals converge — Retail Panel confirms share loss to QuickRelief, Search + E-com Platform + social confirm demand being redirected, Social Ad Monitor reveals campaign mechanism, DMS shows geographic concentration matching targeting. Coordinated competitive attack via regional-language digital marketing. Counter-action needed in City 1–City 2 with urgency ahead of peak season." },
    ],
  },
  {
    id: 2, priority: "high", type: "Demand Signal + Expert Performance", category: "NasalClear", region: "Metro City · Zone A",
    headline: "Metro City pollution extending NasalClear demand beyond season — expert prescriptions and AQI driving sustained pull",
    subtitle: "AQI >250 for 18 consecutive days past normal. Rx Analytics expert prescriptions up 32%. NasalClear at 112% of target. Campaign extension opportunity.",
    kpis: [
      { label: "Achievement", value: "112%", note: "Of target" },
      { label: "Rx Analytics Rx Uplift", value: "+32%", note: "vs seasonal norm" },
      { label: "Search Uplift", value: "+45%", note: "Above seasonal norm" },
      { label: "Premium Spray Growth", value: "+22% WoW", note: "Premium SKU" },
    ],
    evidence: [
      { source: "Air Quality Board + Search Trends", summary: "Metro City AQI >250 for 18 consecutive days past typical late-January improvement. Air Quality Board forecasts 2 more weeks of elevated levels. Search 'congestion relief' +45% and 'relief spray' +38% above seasonal norms. Pollution creating 3–4 week demand tailwind beyond normal respiratory season." },
      { source: "Rx CRM & Rx Analytics (Expert Performance)", summary: "ENT specialist prescriptions for nasal decongestants in Metro City up 32% vs seasonal norm. NasalClear holds 41% of ENT prescription share — stable, no competitive erosion. GP prescriptions also +18%. Rx CRM: med rep coverage of top-100 Metro City ENTs at 78% (above 70% target)." },
      { source: "DMS + Q-comm Analytics (Q-comm)", summary: "NasalClear at 112% target. Weekly primary ₹32L → ₹56L over 8 weeks. Premium Spray premium SKU +22% WoW. Q-comm Analytics: Q-comm platforms NasalClear orders in Metro City +48% WoW — impulse purchase on AQI spike days. Pharmacy driving 68% of incremental volume." },
      { source: "Campaign Performance", summary: "Current NasalClear digital campaign: CTR 2.1% (vs 1.6% benchmark), conversion 0.8%, reach 1.2M over 3 weeks. Paced to end Jan 31. Incremental ₹15L spend over 2 weeks estimated at 3.2x ROAS. Pausing while AQI elevated would cede window to CompetitorX." },
      { source: "E-com + Consumer Sentiment (R&R)", summary: "E-com Platform: NasalClear Premium Spray 4.4★ (890 reviews), top praise: 'works instantly for pollution congestion'. Social: 'pollution relief spray' mentions up 3.5x in Metro City. NasalClear 52% brand share of mentions vs CompetitorX at 31%." },
    ],
    salesAction: "Maintain full NasalClear range in Metro City. Ensure Premium Spray premium SKU fully stocked at pharmacy outlets — trading-up opportunity. Verify Q-comm platforms stock levels across Metro City pin codes to capture Q-comm impulse demand.",
    marketingAction: "Extend digital campaign by 2 weeks beyond Jan 31 pacing. Request incremental A&P for pollution-specific creative — leverage AQI data in ad copy. Target 'pollution relief' and 'relief spray' search terms. 3.2x ROAS projection justifies investment.",
    nudgeConnection: "Push to Metro City ASMs: 'Pollution demand continuing — ensure full NasalClear range at all outlets. Prioritise Premium Spray at premium pharmacies. Verify Q-comm stock. Extended season window for 2 more weeks.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Environmental signal detected: Metro City AQI anomaly persisting beyond normal respiratory season. Cross-checking with expert prescriptions, commercial performance, and campaign efficiency.", routing: "Dispatching to Environmental Agent, Expert Performance Agent, Commercial Performance Agent, and Campaign Agent" },
      { agent: "Environmental Data Agent", icon: "◇", source: "Air Quality Board Metro City · Weather Bureau Forecast · Search Trends", query: "cpcb_aqi(city='Metro City', timeframe='30d') | imd_forecast(city='Metro City', range='14d') | google_trends(keywords=['congestion relief','relief spray','pollution relief'], geo='METRO_CITY', timeframe='8w')", finding: "AQI >250 for 18 consecutive days past typical late-January improvement. Weather Bureau forecasts 2 more weeks before sustained improvement. Search 'congestion relief' +45%, 'relief spray' +38% above seasonal norms.", inference: "Pollution-driven respiratory demand extending 3–4 weeks beyond normal season. Environmental tailwind creating extended sales window." },
      { agent: "Expert Performance Agent", icon: "▣", source: "Rx Analytics Prescription Analytics · Rx CRM", query: "iqvia_rx(therapy='category_decongestant', specialty=['ENT','GP'], geo='Metro City_NCR', timeframe='4w') | veeva_coverage(product='NasalClear', target_hcps='top_100_ent', month='Jan-26')", finding: "ENT prescriptions for nasal decongestants +32% vs seasonal norm. NasalClear prescription share 41% (stable). GP prescriptions +18%. Rx CRM: 78% coverage of top-100 Metro City ENTs in January.", inference: "Expert channel responding to pollution demand. NasalClear share holding — uplift is category-wide. Good med rep coverage means positioned to capture expert-driven demand." },
      { agent: "Commercial Performance Agent", icon: "▣", source: "DMS · Q-comm Analytics (Q-comm)", query: "dms_primary(product='NasalClear', territory='Metro City_NCR', timeframe='8w') | gobblecube_qcomm(brand='NasalClear', city='Metro City', platform=['Q-comm','Q-comm'])", finding: "112% of target. Weekly ₹32L → ₹56L over 8 weeks. Premium Spray +22% WoW. Q-comm +48% WoW — impulse purchase aligned with AQI spike days. Metro South + Metro West at 125%, Metro East + Metro Northeast at 98%.", inference: "Capturing demand well across pharmacy and Q-comm. Q-comm surge validates consumer impulse-purchasing in response to daily AQI awareness." },
      { agent: "Campaign Performance Agent", icon: "◆", source: "Campaign Dashboard · MMM Model", query: "campaign_metrics(brand='NasalClear', market='Metro City_NCR', timeframe='3w') | mmm_roas(brand='NasalClear', scenario='incremental_2w')", finding: "Current campaign: CTR 2.1% (vs 1.6% benchmark), conversion 0.8%, reach 1.2M. Paced to end Jan 31. MMM projects 3.2x ROAS for incremental spend during elevated AQI — above 2.0x threshold.", inference: "Campaign performing above benchmark. Extended AQI window = unusually high-ROI moment. Pausing cedes opportunity to CompetitorX." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: MEDIUM-HIGH on duration (weather-dependent), HIGH on demand reality. Environmental data, Rx Analytics prescriptions, Search Trends, Q-comm data, and internal sales all confirm extended demand. Asymmetric opportunity: incremental spend has 3.2x projected ROAS. If AQI drops early, downside limited. Recommend campaign extension + full stock availability across pharmacy and Q-comm." },
    ],
  },
  {
    id: 3, priority: "critical", type: "Competitive Alert", category: "FeverEase", region: "State B West",
    headline: "PharmaRival 650 margin scheme undercutting FeverEase in Town A–Town B pharmacy channel",
    subtitle: "CompLabs offering 22% retail margin vs FeverEase's 16%. 14 of top-40 Town A chemists shifted. Consumer search stable — trade-driven, recoverable.",
    kpis: [
      { label: "Margin Gap", value: "6pp", note: "22% PharmaRival vs 16% FeverEase" },
      { label: "Chemists Flipped", value: "14 / 40", note: "Top Town A chemists" },
      { label: "Pharmacy Velocity", value: "−18%", note: "2-week decline" },
      { label: "Consumer Search", value: "Stable", note: "Trade-driven, not pull" },
    ],
    evidence: [
      { source: "Field Reports (SFA)", summary: "3 ASMs in Town A, Town B, Town K independently reported CompLabs offering 22% retail margin on PharmaRival 650 vs FeverEase's 16%. Scheme targeting top-prescribing chemists." },
      { source: "DMS + Rx Analytics", summary: "14 of top-40 Town A chemists show FeverEase velocity −30%+. All 14 now stock PharmaRival prominently. Remaining 26: FeverEase stable (−2%). Rx Analytics: FeverEase still leads in doctor prescriptions across State B West — disconnect between prescription preference and pharmacy-counter recommendation." },
      { source: "Search Trends", summary: "Consumer search for 'paracetamol' and 'crocin' in State B stable. No consumer preference shift. Entirely trade-level margin play — recoverable." },
    ],
    salesAction: "Escalate margin gap to trade marketing. Push FeverEase Plus positioning (higher-margin SKU absorbs better trade terms). Schedule joint ASM visits to top 20 lost Town A chemists. Highlight Rx Analytics doctor-prescription leadership in chemist conversations.",
    marketingAction: "Launch 'Trusted for decades' pharmacy POS campaign in State B West. Leverage Rx Analytics prescription data in counter materials. Digital campaign targeting 'paracetamol trusted brand' to reinforce consumer pull.",
    nudgeConnection: "Push to State B West ASMs: 'PharmaRival 650 margin scheme active in Town A — visit your top 20 chemists this week with FeverEase Plus samples. Highlight doctor prescription data. Scheme expected to reach Town B by week 5.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Flagged: FeverEase pharmacy velocity drop in State B West exceeding variance threshold (−18% in 2W)", routing: "Dispatching to Field Intelligence Agent, Distribution Agent, and Consumer Demand Agent" },
      { agent: "Field Intelligence Agent", icon: "◆", source: "SFA (SFA Platform) — ASM Reports, State B West", query: "SELECT asm_name, report_date, issue_type, competitor_brand, details FROM asm_field_reports WHERE state='State_B_West' AND issue_type='competitive_activity' AND date >= DATE_SUB(NOW(), INTERVAL 14 DAY)", finding: "3 ASMs independently reported: CompLabs offering 22% retail margin on PharmaRival 650 vs FeverEase's 16%. Scheme targeted at top-prescribing chemists.", inference: "Deliberate margin scheme targeting pharmacy channel. 6pp gap significant enough to flip chemist recommendations." },
      { agent: "Distribution Agent", icon: "▣", source: "DMS — Pharmacy Channel · Rx Analytics Prescription Data", query: "SELECT chemist_name, city, crocin_velocity_current, crocin_velocity_4w_ago, dolo_stocking FROM pharmacy_outlet_data WHERE state='State_B_West' AND segment='top_40' | iqvia_rx(molecule='paracetamol', geo='State_B_West')", finding: "14 of top-40 Town A chemists flipped — FeverEase velocity −30%+ at these outlets. Remaining 26: stable (−2%). Chemist-by-chemist conversion pattern. Rx Analytics: FeverEase leads doctor prescriptions — disconnect with pharmacy counter.", inference: "Margin economics driving chemist switches. Rx Analytics data proves professional preference hasn't changed — purely trade incentive." },
      { agent: "Consumer Demand Agent", icon: "◉", source: "Search Trends", query: "google_trends(keywords=['crocin','dolo 650','paracetamol'], geo='IN-State B', timeframe='8w')", finding: "Consumer search for 'paracetamol' and 'crocin' in State B: stable. 'PharmaRival 650' +8% minor. No consumer campaign or social shift detected.", inference: "Trade-level play, not consumer pull shift. Recoverable with right trade response." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Root cause: CompLabs 22% margin scheme. Impact trade-driven, contained to Town A. Two response paths: match margin (expensive, sets precedent) or shift to FeverEase Plus positioning (higher-margin SKU absorbs better terms). Time-sensitive — scheme likely to expand to Town B in 2–3 weeks." },
    ],
  },
  {
    id: 4, priority: "high", type: "Distribution Opportunity", category: "DentaShield", region: "State B East",
    headline: "DentaShield ₹20 pack pharmacy-first strategy validated — 92% reorder in Town C, playbook ready for replication",
    subtitle: "Channel strategy is the differentiator, not geography. Pharmacy 92% reorder vs GT 28%. Town E, Town F, Town G next.",
    kpis: [
      { label: "Town C Reorder Rate", value: "85%", note: "2.5x territory avg" },
      { label: "Pharmacy Reorder", value: "92%", note: "Recommendation loop" },
      { label: "GT Reorder", value: "28%", note: "No recommendation" },
      { label: "Adjacent Districts", value: "3", note: "Town E, Town F, Town G" },
    ],
    evidence: [
      { source: "DMS (Outlet Reorder)", summary: "Town C pharmacy: 92% reorder. GT: 28%. Town H (GT-led): 26%. Town D (GT-led): 31%. Channel mix is the driver — pharmacist recommendation creates a natural repeat-purchase loop that GT lacks." },
      { source: "Search Trends + E-com Reviews", summary: "Town C search interest 1.4x state average — moderately above, but not 2.5x. E-com Platform reviews for ₹20 pack mention 'pharmacist recommended' as top purchase trigger. Execution is the multiplier, not demand." },
    ],
    salesAction: "Shift activation in Town E, Town F, Town G to pharmacy-first. Target 200 chemist outlets per district. Use Town C data in distributor pitches.",
    marketingAction: "Develop pharmacist education kit for ₹20 trial-to-conversion. Create 'Recommended by pharmacists in Town C' localised POS for adjacent districts.",
    nudgeConnection: "Push to State B East ASMs: 'Town C ₹20 playbook ready — pharmacy-first, 200 chemists per district. Town C data pack attached for distributor conversations.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Positive signal detected: DentaShield ₹20 reorder in Town C 2.5x above territory average", routing: "Dispatching to Distribution Agent and Consumer Demand Agent to identify success drivers" },
      { agent: "Distribution Agent", icon: "▣", source: "DMS — Outlet Reorder Data, DentaShield ₹20", query: "SELECT district, channel_type, outlets_activated, outlets_reordered, reorder_rate FROM sensodyne_20_activation WHERE territory='State_B_East' GROState B BY district, channel_type ORDER BY reorder_rate DESC", finding: "Town C: 85% reorder. Pharmacy: 92%. GT: 28%. Town H GT-led: 26%. Town D GT-led: 31%. Town J mixed: 48%.", inference: "Channel mix is primary driver. Pharmacy-led activation produces 3x reorder rate." },
      { agent: "Consumer Demand Agent", icon: "◉", source: "Search Trends · E-com Reviews", query: "google_trends(keywords=['sensitivity toothpaste','sensodyne'], geo='IN-State B', resolution='city', timeframe='8w') | amazon_reviews(product='DentaShield 20', market='IN')", finding: "Town C search: 140 index (state avg 100). Town H: 95. Town D: 88. E-com Platform ₹20 reviews: 'pharmacist recommended' as top trigger.", inference: "Demand 1.4x above average in Town C but 2.5x reorder is execution-driven. Pharmacy recommendation creates natural repeat loop." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Pharmacy-first = 3x reorder vs GT. Replicable playbook. Adjacent districts have comparable demand but GT-led activation. Switching to pharmacy-first should yield 2–2.5x reorder improvement." },
    ],
  },
  {
    id: 5, priority: "high", type: "Seasonal Prep", category: "FeverEase · NasalClear", region: "Central State",
    headline: "Pre-monsoon stocking critically thin — 4 of 8 Central State distributors will stock out if monsoon hits early",
    subtitle: "Weather Bureau forecasts 8–10 days early onset. Historical pattern: 25–35% spike in week 2. Avg cover at 12 days, 4 distributors below 10.",
    kpis: [
      { label: "Avg Stock Cover", value: "12 days", note: "At normal run-rate" },
      { label: "At Spike Rate", value: "9 days", note: "If monsoon early" },
      { label: "Distributors at Risk", value: "4 / 8", note: "Below 10 days" },
      { label: "Replenishment Cycle", value: "5–7 days", note: "From regional warehouse" },
    ],
    evidence: [
      { source: "Weather Bureau + Historical Sales", summary: "Weather Bureau extended forecast: monsoon onset Jun 18–22 vs normal Jun 28–30. Historical: 2024 onset 6 days early → 28% FeverEase spike W2. 2023 onset 8 days early → 35% spike. Current forecast matches high-impact pattern." },
      { source: "DMS (Distributor Inventory)", summary: "8 Central State distributors avg 12 days FeverEase cover at normal rate. At 1.3x spike rate: 9 days. Hub A, Hub B, Hub C, Hub D below 10 days even now. 5–7 day replenishment cycle from regional warehouse — stockout before resupply if spike hits." },
    ],
    salesAction: "Place pre-emptive top-up orders with Hub A, Hub B, Hub C, Hub D by Wednesday. Request 15% buffer stock allocation for all Central State distributors. Alert NasalClear distribution to same monsoon stocking need.",
    marketingAction: "Prepare monsoon-season FeverEase digital campaign for early activation (week of Jun 15 vs normal Jun 25). Pre-load 'cold and flu season' search ads in Central State geographies.",
    nudgeConnection: "Push to Central State ASMs: 'Monsoon forecast early — FeverEase stock critically low at 4 distributors. Place top-up orders by Wednesday. NasalClear stocking also needed.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Seasonal trigger: Weather Bureau extended forecast indicates early monsoon. Checking inventory readiness.", routing: "Dispatching to Demand Forecasting Agent and Distribution Agent" },
      { agent: "Demand Forecasting Agent", icon: "◇", source: "Weather Bureau Extended Range Forecast · Historical Sales DB", query: "SELECT year, monsoon_onset_date, deviation_days, crocin_spike_pct, otrivin_spike_pct FROM monsoon_impact_history WHERE zone='Central' AND year IN (2023,2024,2025)", finding: "2024: 6 days early → 28% spike. 2023: 8 days early → 35%. Weather Bureau current: 8–10 days early.", inference: "Pattern consistent: early onset by 6–10 days triggers 25–35% demand spike in cold/flu. Current forecast matches high-impact pattern." },
      { agent: "Distribution Agent", icon: "▣", source: "DMS — Distributor Inventory, MP", query: "SELECT distributor_name, city, crocin_stock_units, daily_run_rate, days_cover FROM distributor_inventory WHERE state='Central_State' AND product IN ('FeverEase Plus','NasalClear')", finding: "Avg 12 days cover. At spike rate (1.3x): 9 days. 4 of 8 below 10 days even at normal rate. 5–7 day replenishment cycle.", inference: "4 distributors will stock out before replenishment if spike hits. Even others tight. Pre-emptive orders needed by Wednesday." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: MEDIUM-HIGH. Weather Bureau extended forecasts ~70% accurate at this range but downside of inaction (stockouts during peak) far outweighs over-stocking cost. Recommend 15% buffer for all Central State distributors." },
    ],
  },
  {
    id: 6, priority: "high", type: "Launch Tracking", category: "VitaBoost", region: "State B East, State B West",
    headline: "VitaBoost Recharge: E-com Platform #3 validates demand, offline activation critically behind at 8% vs 25% plan",
    subtitle: "Only 6 of 42 distributors ordered. Outlet mix 70:30 GT:Pharmacy — should be inverse. Multivitamin search in State B Tier 3 up 28% YoY.",
    kpis: [
      { label: "E-com Platform Rank", value: "#3", note: "Daily vitamins" },
      { label: "Distributors Active", value: "6 / 42", note: "14% activation" },
      { label: "GT Activation", value: "8%", note: "vs 25% plan" },
      { label: "Channel Mix", value: "70:30", note: "GT:Pharma, should flip" },
    ],
    evidence: [
      { source: "E-com (E-com Platform)", summary: "VitaBoost Recharge #3 in daily vitamins. 4.2★, 1,200+ reviews. 48 units/day avg in State B before 4-day OOS. Strong organic demand validated." },
      { source: "DMS (Distribution)", summary: "6 of 42 State B distributors ordered (14%). Outlet activations 340 = 8% of 25% target. Mix 70% GT, 30% pharmacy — inverse of where VMS sells." },
      { source: "Search Trends", summary: "Multivitamin search +28% YoY in State B Tier 3 with acceleration. 'Vitamin tablet price' co-trending. VitaBoost numeric distribution in Tier 3: 9% vs category 14%. Clear demand-supply mismatch." },
    ],
    salesAction: "Make VitaBoost Recharge must-stock for all 42 distributors. Flip channel: target 500 pharmacy activations first. Use E-com Platform #3 rank as proof point. Leverage existing DentaShield/DigestEase pharmacy relationships for warm introductions.",
    marketingAction: "Create 'As seen on E-com Platform' pharmacy counter material with rating and review count. Digital retargeting to redirect OOS E-com Platform searches to pharmacy.",
    nudgeConnection: "Push to all State B ASMs: 'VitaBoost Recharge is E-com Platform #3 — consumers want this. Target 12 pharmacy activations per ASM this week. E-com Platform data sheet attached for distributor visits.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Launch tracking alert: VitaBoost Recharge e-commerce outperforming but GT activation critically behind plan", routing: "Dispatching to E-commerce Agent, Distribution Agent, and Consumer Demand Agent" },
      { agent: "E-commerce Agent", icon: "▲", source: "E-com Seller Dashboard — State B Region", query: "SELECT asin, product_name, daily_units_avg_7d, category_rank, avg_rating, review_count FROM amazon_performance WHERE brand='VitaBoost' AND variant='Recharge' AND region='State B'", finding: "#3 rank daily vitamins. 48 units/day. 4.2★ (1,200+ reviews). OOS in major State B pin codes 4 days.", inference: "Strong organic consumer demand. OOS creates natural experiment for offline redirect." },
      { agent: "Distribution Agent", icon: "▣", source: "DMS — Distributor Orders, VitaBoost Recharge", query: "SELECT distributor_name, territory, centrum_recharge_ordered, outlet_activations, channel_split FROM distributor_orders WHERE product='VitaBoost Recharge 10' AND territory IN ('State_B_East','State_B_West')", finding: "6 of 42 ordered (14%). 340 outlet activations (8% of plan). Mix 70% GT, 30% pharmacy — wrong channel for VMS.", inference: "Bottleneck is distribution activation and channel mix. VMS indexes to pharmacy — 70/30 GT split should be reversed." },
      { agent: "Consumer Demand Agent", icon: "◉", source: "Search Trends — State B Tier 3", query: "google_trends(keywords=['multivitamin','vitamin tablet price','centrum'], geo='IN-State B', resolution='city_tier_3', timeframe='12m')", finding: "+28% YoY with acceleration. 'Vitamin tablet price' co-trending — price sensitivity high. VitaBoost distribution in Tier 3: 9% vs category 14%.", inference: "Post-COVID health consciousness driving demand. ₹10 price point well-positioned. Massive demand-supply mismatch." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Demand validated by E-com Platform + search trends. Bottleneck entirely distribution. Priority: flip channel to pharmacy-first, use E-com Platform data as distributor proof point." },
    ],
  },
  {
    id: 7, priority: "high", type: "Performance Risk", category: "PainAway", region: "Central State",
    headline: "PainAway declining in Central State rural — FlexiRub gaining via direct van coverage model",
    subtitle: "FlexiRub +2.8pp in Central Zone. CompCorp deployed 6 rural vans. PainAway numeric distribution dropped 38% → 31%. Structural threat.",
    kpis: [
      { label: "FlexiRub Share Gain", value: "+2.8pp", note: "22.1% → 24.9%" },
      { label: "PainAway Share Loss", value: "−1.9pp", note: "28.3% → 26.4%" },
      { label: "PainAway Dist Drop", value: "−7pp", note: "38% → 31% rural MP" },
      { label: "CompCorp Vans", value: "6", note: "Hub E, Hub F, Hub G" },
    ],
    evidence: [
      { source: "Retail Panel Data (Central Zone)", summary: "FlexiRub +2.8pp (22.1% → 24.9%). PainAway −1.9pp (28.3% → 26.4%). PainAway rural numeric distribution MP: 38% → 31% (−7pp in one period). Distribution drop feeding share loss." },
      { source: "Field Reports (SFA)", summary: "6 CompCorp sales vans spotted in rural haats — Hub E, Hub F, Hub G, Hub H. Vans carry FlexiRub + sampling kits. Weekly haat schedule. Direct selling + trial generation that sub-stockist model can't match." },
    ],
    salesAction: "Request rural sampling initiative through sub-stockist network. Priority: Hub E, Hub F, Hub G. Push PainAway multipacks at haats where FlexiRub vans are active.",
    marketingAction: "Develop rural-specific PainAway communication (local-language, haat-specific). Evaluate trial-generation approach via sachets at rural touch-points.",
    nudgeConnection: "Push to Central State ASMs: 'FlexiRub vans active in Hub E, Hub F, Hub G. Ensure PainAway stocked at all haats where van has been spotted. Sampling kits being dispatched.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Performance alert: PainAway primary at 62% of target in MP. Investigating competitive and distribution factors.", routing: "Dispatching to Market Share Agent and Field Intelligence Agent" },
      { agent: "Market Share Agent", icon: "▣", source: "Retail Panel Data — Central Zone Topical Pain", query: "SELECT brand, value_share, share_change_pp, numeric_distribution FROM nielsen_share WHERE category='Topical_Pain' AND zone='Central'", finding: "FlexiRub +2.8pp. PainAway −1.9pp. Rural numeric dist: 38% → 31% (−7pp).", inference: "FlexiRub gaining share and distribution simultaneously. Distribution drop feeding the share loss." },
      { agent: "Field Intelligence Agent", icon: "◆", source: "SFA — Field Reports, Central State Rural", query: "SELECT asm_name, report_date, competitor_activity_type, details, location FROM asm_field_reports WHERE state='Central_State' AND competitor='CompCorp_FlexiRub' AND date >= DATE_SUB(NOW(), INTERVAL 30 DAY)", finding: "6 CompCorp vans in rural haats. Direct van selling + trial packs. Weekly haat schedule matching sub-stockist coverage.", inference: "Structural competitive move — CompCorp building rural distribution infrastructure. Not temporary scheme." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Structural threat. Short-term: push through existing sub-stockist. Medium-term: zone-level discussion on rural coverage model. 7pp distribution drop in one period is alarming velocity." },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// TERRITORIES
// ═══════════════════════════════════════════════════════
const territories = [
  { id: "delhi", name: "Metro City", achievement: 93, status: "on-track", narrative: "Strongest territory. Premium White outperforming in premium pharmacy. NasalClear riding extended pollution demand.", keyWin: "Premium White 155% in premium pharmacy", keyRisk: "VitaBoost Recharge GT activation behind",
    asmAreas: [{ name: "Metro South + Metro West", achievement: 98 }, { name: "Metro East + Metro Northeast", achievement: 87 }],
    weeklyTrend: [{w:"W48",v:86},{w:"W49",v:89},{w:"W50",v:93},{w:"W51",v:91},{w:"W52",v:96},{w:"W1",v:95},{w:"W2",v:99},{w:"W3",v:101}] },
  { id: "up-east", name: "State B East", achievement: 83, status: "needs-attention", narrative: "Mixed. DentaShield ₹20 breakthrough in Town C pharmacy. Town J–Town K and VitaBoost activation lagging.", keyWin: "DentaShield ₹20 Town C 85% reorder", keyRisk: "Town J activation stalled",
    asmAreas: [{ name: "Town C–Town E", achievement: 94 }, { name: "Town J–Town K", achievement: 72 }, { name: "Town L–East", achievement: 78 }],
    weeklyTrend: [{w:"W48",v:91},{w:"W49",v:93},{w:"W50",v:90},{w:"W51",v:88},{w:"W52",v:84},{w:"W1",v:82},{w:"W2",v:80},{w:"W3",v:78}] },
  { id: "up-west", name: "State B West", achievement: 76, status: "at-risk", narrative: "Under pressure. FeverEase PharmaRival 650 margin threat. DigestEase repeat rate declining. Needs trade intervention.", keyWin: "DentaShield stable across territory", keyRisk: "FeverEase pharmacy velocity −18%",
    asmAreas: [{ name: "Town A–Town B", achievement: 71 }, { name: "Town C–Town D", achievement: 82 }],
    weeklyTrend: [{w:"W48",v:107},{w:"W49",v:103},{w:"W50",v:99},{w:"W51",v:93},{w:"W52",v:86},{w:"W1",v:82},{w:"W2",v:79},{w:"W3",v:76}] },
  { id: "rajasthan", name: "Western State", achievement: 87, status: "needs-attention", narrative: "Split. DentaShield ₹20 outperforming. DigestEase under QuickRelief assault. VitaBoost pharmacy gap persistent.", keyWin: "DentaShield ₹20 exceeding target", keyRisk: "DigestEase −1.2pp City 1–City 2",
    asmAreas: [{ name: "City 1–North Western State", achievement: 84 }, { name: "City 3–City 4–South", achievement: 91 }],
    weeklyTrend: [{w:"W48",v:113},{w:"W49",v:115},{w:"W50",v:118},{w:"W51",v:115},{w:"W52",v:113},{w:"W1",v:110},{w:"W2",v:109},{w:"W3",v:108}] },
  { id: "mp", name: "Central State", achievement: 69, status: "at-risk", narrative: "Weakest. PainAway declining via FlexiRub rural vans. Pre-monsoon stocking critical.", keyWin: "DigestEase summer lift expected", keyRisk: "PainAway rural dist −7pp",
    asmAreas: [{ name: "Hub A–Hub B", achievement: 74 }, { name: "Hub C–Hub D–East", achievement: 63 }],
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
                      {step.query && <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: C.textLight, marginBottom: 10, wordBreak: "break-all", lineHeight: 1.5, padding: "8px 10px", background: C.card, borderRadius: 2 }}>{step.query}</div>}
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

          {/* DECISION (first) */}
          <div style={{ margin: "0 28px 20px", padding: "22px 24px", border: `1px solid ${C.border}` }}>
            <div style={{ ...label, fontSize: 10, color: C.orange, marginBottom: 16 }}>DECISION — RECOMMENDED ACTIONS</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 5 }}>Sales</div>
              <div style={{ fontSize: 14, color: C.text, lineHeight: 1.65 }}>{insight.salesAction}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textLight, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 5 }}>Marketing</div>
              <div style={{ fontSize: 14, color: C.text, lineHeight: 1.65 }}>{insight.marketingAction}</div>
            </div>

          </div>

          {/* SUPPORTING EVIDENCE (condensed) */}
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
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [expandedTerritory, setExpandedTerritory] = useState(null);
  const [trailInsight, setTrailInsight] = useState(null);
  const [mainTab, setMainTab] = useState("pulse");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [digOpen, setDigOpen] = useState(null);
  const [digChats, setDigChats] = useState({});
  const [digInput, setDigInput] = useState("");
  const [expandedHistory, setExpandedHistory] = useState(null);

  const nots = [
    { id: 1, text: "DigestEase Western State alert escalated", time: "12m ago", ur: true },
    { id: 2, text: "FeverEase margin scheme in Town A", time: "45m ago", ur: true },
    { id: 3, text: "NasalClear campaign extension approved", time: "2h ago", ur: false },
  ];

  const digData = {
    0: [
      { q: "What is QuickRelief spending?", a: "14 active social ad sets since Jan 18, all regional dialect. Estimated Rs 12-15L over 3 weeks. 3x normal organic frequency. Share of voice moved 12% to 24% in antacid social. Sustained investment, not a test burst." },
      { q: "How much revenue are we losing?", a: "City 1 ASM: Rs 1.2L/week lost. City 2: Rs 0.8L/week. Total: Rs 2.4L/week (Rs 10L/month). Bigger risk: peak season drives 15-20% antacid uplift. If QuickRelief captures that, Rs 40-50L exposure over 6 weeks." },
      { q: "What would a counter-campaign cost?", a: "Regional counter on Meta + YouTube: Rs 8-10L for 4 weeks. Trade scheme (Rs 1-off sachets): Rs 6L. Total: Rs 14-16L. Doing nothing costs Rs 10L/month + Rs 40-50L peak season risk. Counter ROI is 3-4x at conservative recovery." }
    ],
    1: [
      { q: "Can we match the 22% margin?", a: "Matching erodes Rs 4.2L/month across State B West. Better: push FeverEase Plus which already carries 24% margin, exceeding PharmaRival without any scheme. Use Rx Analytics doctor-prescription data as leverage with chemists." },
      { q: "How fast is this spreading?", a: "Currently 14 of 40 Town A chemists. Town B: 3 enquiries but zero switches. Based on CompLabs rollout pattern: Town B in 2-3 weeks, Town K in 4-5 weeks. Window to contain is now." }
    ],
    2: [
      { q: "Why does pharmacy reorder 3x better?", a: "Pharmacist recommendation loop: patient asks about sensitivity, pharmacist recommends Rs 20 trial, patient gets relief, returns for full-size. GT has no recommendation trigger. Town C pharmacy: 92% reorder vs GT: 28%." },
      { q: "Cost to replicate in 3 districts?", a: "Per district: Rs 1.8L (education kits + sampling + POS). Return: Rs 6.2L monthly at 85% reorder. 3.4x ROI in 8 weeks. Total 3-district: Rs 5.4L investment, Rs 18.6L monthly return." }
    ],
    3: [
      { q: "Which distributors stock out first?", a: "Hub A (7 days cover, 5.4 at spike) stocks out first. Hub B follows 18 hours later. Hub C and Hub D breach safety at 1.3x spike. The 5-7 day replenishment cycle means Hub A and Hub B will stock out before resupply." },
      { q: "Over-stocking vs under-stocking cost?", a: "Over-stock: Rs 2.1L carrying cost. Under-stock during spike: Rs 14L lost sales plus retailer confidence damage. 7x asymmetric risk. The 15% buffer costs Rs 2.1L but protects Rs 14L." }
    ],
    4: [
      { q: "How long will pollution demand last?", a: "Air Quality Board: 2 more weeks AQI above 200. Demand normalizes about 10 days after AQI drops below 150. So 3-4 weeks remaining. The 3.2x ROAS holds for 2 more weeks." },
      { q: "Should we raise Premium Spray price?", a: "No. Premium Spray drives trading-up (Rs 85 to Rs 145), adding Rs 12L/month margin without price change. A price increase risks pushing consumers to competitor spray (Rs 120). Capture volume now." }
    ],
  };

  const pastDecisions = [
    { id: 1, date: "Dec 2025", brand: "DigestEase", decision: "Launched sachet counter-display program in State B East after detecting 8% share erosion", action: "Deployed POS displays at 1,200 outlets + Rs 2-off launch scheme for 3 weeks", outcome: "Share recovered 58% to 63% in 6 weeks. Counter-display outlets showed 2.1x higher sachet velocity.", status: "success", impact: "+Rs 18L quarterly", learning: "Sachet POS at general stores outperformed pharmacy. Speed of response (2 weeks from detection) was critical. Competitor had only 3 weeks of momentum." },
    { id: 2, date: "Nov 2025", brand: "FeverEase", decision: "Pre-positioned stock at 12 distributors ahead of early winter forecast", action: "15% buffer stock. Alert sent to ASMs 10 days before cold wave.", outcome: "Zero stockouts during Dec cold wave. Competitors faced 4-6 day gaps. FeverEase captured 3.2pp incremental share.", status: "success", impact: "+Rs 26L in Dec", learning: "Weather-triggered pre-positioning works. 10-day lead time sufficient. 15% buffer was right. Actual spike was 22% vs predicted 25-35%." },
    { id: 3, date: "Oct 2025", brand: "DentaShield", decision: "Shifted Town H activation from pharmacy-first to GT-led based on distributor request", action: "Activated 180 GT outlets instead of planned 120 pharmacy outlets", outcome: "Town H reorder: 26% (vs 85% pharmacy-first Town C). Rs 4.8L invested, only Rs 1.2L in reorders.", status: "failed", impact: "-Rs 3.6L net", learning: "Distributor preference for GT was wrong channel. Pharmacy recommendation loop is THE driver. Validated pharmacy-first as non-negotiable for the Rs 20 SKU." },
    { id: 4, date: "Oct 2025", brand: "NasalClear", decision: "Extended Q3 digital campaign by 2 weeks during unexpected pollution spike", action: "Incremental Rs 12L spend. Shifted creative to pollution-specific messaging.", outcome: "3.8x ROAS during extension (vs 2.1x base). Premium SKU became number 1 in Metro City pharmacy.", status: "success", impact: "+Rs 46L incremental", learning: "Pollution-triggered extensions deliver outsized ROAS. AQI-specific creative doubled CTR. Always have pollution creative ready as contingency." },
    { id: 5, date: "Sep 2025", brand: "PainAway", decision: "Ignored early signals of competitor van coverage in rural Central State", action: "No action taken. Flagged as monitor in weekly review.", outcome: "By Dec 2025, rural distribution dropped 38% to 31% (-7pp). 1.9pp share loss. Recovery requires 3-6 months.", status: "failed", impact: "-Rs 22L quarterly", learning: "Early competitive distribution signals must trigger immediate response, not monitor status. Structural moves compound quickly. 6 weeks of inaction cost 7pp. The monitor decision was the most expensive of Q4." },
    { id: 6, date: "Aug 2025", brand: "VitaBoost", decision: "Launched VitaBoost Recharge on e-commerce 4 weeks before offline to validate demand", action: "E-com exclusive launch. Tracked rank, reviews, search data.", outcome: "Reached number 3 in daily vitamins. 4.2 stars with 1200+ reviews. Demand validated but offline activation lagged.", status: "partial", impact: "Demand validated, Rs 8L e-com", learning: "E-com-first validates demand cheaply. But distributor materials must be ready BEFORE e-com launch. The proof point loses urgency if pitch happens 6 weeks later." },
  ];

  const openDig = function(idx) {
    if (digOpen === idx) { setDigOpen(null); return; }
    setDigOpen(idx);
    if (!digChats[idx]) {
      var r = digData[idx] || [];
      var next = {};
      Object.keys(digChats).forEach(function(k) { next[k] = digChats[k]; });
      next[idx] = { messages: [{ type: "ai", text: "I can help you dig deeper. What would you like to explore?" }], suggestions: r.map(function(x) { return x.q; }) };
      setDigChats(next);
    }
  };

  var sendDig = function(idx, text) {
    if (!text.trim()) return;
    var r = digData[idx] || [];
    var m = null;
    for (var i = 0; i < r.length; i++) { if (r[i].q === text) m = r[i]; }
    var aiText = m ? m.a : "I would recommend reviewing the agent trail for the full data picture.";
    var prev = digChats[idx] || { messages: [], suggestions: [] };
    var rem = prev.suggestions.filter(function(s) { return s !== text; });
    var n1 = {};
    Object.keys(digChats).forEach(function(k) { n1[k] = digChats[k]; });
    n1[idx] = { messages: prev.messages.concat([{ type: "user", text: text }, { type: "typing" }]), suggestions: [] };
    setDigChats(n1);
    setDigInput("");
    setTimeout(function() {
      setDigChats(function(p) {
        var c = p[idx];
        if (!c) return p;
        var n2 = {};
        Object.keys(p).forEach(function(k) { n2[k] = p[k]; });
        n2[idx] = { messages: c.messages.filter(function(x) { return x.type !== "typing"; }).concat([{ type: "ai", text: aiText }]), suggestions: rem };
        return n2;
      });
    }, 900 + Math.random() * 600);
  };

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', -apple-system, sans-serif", background: C.page, minHeight: "100vh", color: C.text, display: "flex" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      <div style={{ width: 64, minHeight: "100vh", background: C.header, borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ marginTop: 16, width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Menu size={16} color="rgba(255,255,255,0.5)" strokeWidth={1.5} />
        </div>
        <div style={{ flex: 1 }} />
      </div>

      <div className="overflow-auto" style={{ flex: 1, marginLeft: 64, height: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ background: C.card, borderBottom: "1px solid " + C.border, padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ fontSize: 17, fontWeight: 600, color: C.header, letterSpacing: "-0.02em" }}>questt</span>
              <span style={{ color: C.green, fontSize: 20, fontWeight: 700, lineHeight: 1 }}>.</span>
            </div>
            <span style={{ fontSize: 11, color: C.border }}>|</span>
            <img src='/images/pwcLogo.jpg' alt="PwC" style={{ height: 28, display: "block" }} />
            <div style={{ width: 1, height: 20, background: C.border, margin: "0 2px" }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: C.textMid }}>Market Pulse</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", background: searchFocused ? C.card : C.page, border: "1px solid " + (searchFocused ? C.green : C.border), borderRadius: 6, transition: "all 0.2s", width: searchFocused ? 280 : 200 }}>
              <Search size={14} color={C.textLight} strokeWidth={1.5} />
              <input placeholder="Search brands, insights..." onFocus={function() { setSearchFocused(true); }} onBlur={function() { setSearchFocused(false); }} style={{ border: "none", outline: "none", background: "transparent", fontSize: 12, fontFamily: "'IBM Plex Sans',sans-serif", color: C.text, width: "100%" }} />
              {!searchFocused && <span style={{ fontSize: 10, color: C.textLight, background: C.card, padding: "1px 6px", borderRadius: 3, border: "1px solid " + C.border, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>/</span>}
            </div>
            <div style={{ width: 1, height: 24, background: C.border, margin: "0 4px" }} />
            <div style={{ position: "relative" }}>
              <button onClick={function(e) { e.stopPropagation(); setNotifsOpen(!notifsOpen); setProfileOpen(false); }} style={{ padding: 8, background: notifsOpen ? C.page : "transparent", border: "none", borderRadius: 6, cursor: "pointer", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bell size={18} strokeWidth={1.5} color={C.textMid} />
                <div style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, borderRadius: "50%", background: "#DC2626", border: "1.5px solid #fff" }} />
              </button>
              {notifsOpen && <div onClick={function(e) { e.stopPropagation(); }} style={{ position: "absolute", top: "100%", right: 0, marginTop: 8, width: 320, background: C.card, border: "1px solid " + C.border, borderRadius: 8, boxShadow: "0 8px 30px rgba(0,0,0,0.1)", overflow: "hidden", zIndex: 200 }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid " + C.border, display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 13, fontWeight: 600 }}>Notifications</span><span style={{ fontSize: 11, color: C.green, cursor: "pointer" }}>Mark all read</span></div>
                {nots.map(function(n) { return <div key={n.id} style={{ padding: "12px 16px", borderBottom: "1px solid " + C.borderLight, background: n.ur ? C.green + "08" : "transparent", display: "flex", gap: 10 }}>{n.ur && <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, marginTop: 6, flexShrink: 0 }} />}<div><div style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>{n.text}</div><div style={{ fontSize: 10, color: C.textLight, marginTop: 3 }}>{n.time}</div></div></div>; })}
              </div>}
            </div>
            <div style={{ position: "relative" }}>
              <button onClick={function(e) { e.stopPropagation(); setProfileOpen(!profileOpen); setNotifsOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px 4px 4px", background: profileOpen ? C.page : "transparent", border: "none", borderRadius: 6, cursor: "pointer" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#3BB896," + C.green + ")", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#fff" }}>ZM</div>
                <ChevronDown size={14} color={C.textLight} />
              </button>
              {profileOpen && <div onClick={function(e) { e.stopPropagation(); }} style={{ position: "absolute", top: "100%", right: 0, marginTop: 8, width: 220, background: C.card, border: "1px solid " + C.border, borderRadius: 8, boxShadow: "0 8px 30px rgba(0,0,0,0.1)", overflow: "hidden", zIndex: 200 }}>
                <div style={{ padding: "14px 16px", borderBottom: "1px solid " + C.border }}><div style={{ fontSize: 13, fontWeight: 600 }}>Zone Manager</div><div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>zm.north@client.in</div></div>
                <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", width: "100%", background: "transparent", border: "none", cursor: "pointer", fontSize: 12, color: C.textMid, textAlign: "left" }}><User size={14} color={C.textLight} />My Profile</button>
                <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", width: "100%", background: "transparent", border: "none", cursor: "pointer", fontSize: 12, color: C.textMid, textAlign: "left" }}><Settings size={14} color={C.textLight} />Preferences</button>
                <div style={{ borderTop: "1px solid " + C.border }}><button style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", width: "100%", background: "transparent", border: "none", cursor: "pointer", fontSize: 12, color: C.red, textAlign: "left" }}><LogOut size={14} color={C.red} />Log Out</button></div>
              </div>}
            </div>
          </div>
        </div>

        <div style={{ background: C.card, borderBottom: "1px solid " + C.border, padding: "0 32px", display: "flex", gap: 8 }}>
          {["pulse", "history"].map(function(t) { return <button key={t} onClick={function() { setMainTab(t); }} style={{ padding: "16px 24px", fontSize: 13, fontWeight: mainTab === t ? 600 : 400, color: mainTab === t ? C.header : C.textLight, background: "transparent", border: "none", borderBottom: mainTab === t ? "2px solid " + C.header : "2px solid transparent", cursor: "pointer" }}>{t === "pulse" ? "Market Pulse" : "Decision History"}</button>; })}
        </div>

        <div style={{ maxWidth: 1180, padding: "28px 32px 60px" }}>
        {mainTab === "pulse" && <div>

        {/* KPIs */}
        <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
          {portfolioKPIs.map((kpi, i) => (
            <div key={i} style={{ ...cardBase, padding: "22px 24px", flex: 1 }}>
              <div style={{ ...label, fontSize: 10, marginBottom: 12 }}>{kpi.label}</div>
              <div style={{ fontSize: 32, fontWeight: 600, color: C.text, lineHeight: 1 }}>{kpi.value}</div>
              <div style={{ fontSize: 12, color: kpi.negative ? C.orange : C.textLight, marginTop: 8 }}>{kpi.delta}</div>
            </div>
          ))}
        </div>

        {/* Critical Items */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, margin: "0 0 16px" }}>This Week's Critical Items</h2>
          {criticalItems.map(function(item, ci) { return (
            <div key={item.id} style={{ ...cardBase, marginBottom: 8, overflow: "hidden" }}>
              <div style={{ padding: "18px 28px", display: "flex", alignItems: "flex-start", gap: 16 }}>
                <SeverityIcon severity={item.severity} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.45 }}>{item.headline}</div>
                  <div style={{ fontSize: 13, color: C.textMid, marginTop: 6, lineHeight: 1.55, marginBottom: 10 }}>{item.detail}</div>
                  <button onClick={function() { openDig(ci); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: digOpen === ci ? C.header : "transparent", color: digOpen === ci ? "#fff" : C.green, border: "1px solid " + (digOpen === ci ? C.header : "rgba(45,90,61,0.2)"), borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: digOpen === ci ? "#3BB896" : C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 7, fontWeight: 700 }}>q</span></div>
                    Dig deeper
                  </button>
                </div>
              </div>
              {digOpen === ci && digChats[ci] && <div style={{ borderTop: "1px solid " + C.border, background: C.page }}>
                <div style={{ padding: "16px 28px", maxHeight: 360, overflowY: "auto" }}>
                  {digChats[ci].messages.map(function(msg, mi) { return <div key={mi} style={{ marginBottom: 14 }}>
                    {msg.type === "typing" ? <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 22, height: 22, borderRadius: 11, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>q</span></div><div style={{ padding: "12px 16px", background: C.card, border: "1px solid " + C.border, borderRadius: 6, fontSize: 13, color: C.textLight }}>Thinking...</div></div>
                    : msg.type === "ai" ? <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><div style={{ width: 22, height: 22, borderRadius: 11, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>q</span></div><div style={{ padding: "10px 14px", background: C.card, border: "1px solid " + C.border, borderRadius: 6, fontSize: 13, lineHeight: 1.65, color: C.textMid, flex: 1 }}>{msg.text}</div></div>
                    : <div style={{ display: "flex", justifyContent: "flex-end" }}><div style={{ padding: "10px 14px", background: C.header, color: "#fff", borderRadius: 6, fontSize: 13, lineHeight: 1.5, maxWidth: "80%" }}>{msg.text}</div></div>}
                  </div>; })}
                  {digChats[ci].suggestions.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                    {digChats[ci].suggestions.map(function(sug, si) { return <button key={si} onClick={function() { sendDig(ci, sug); }} style={{ padding: "7px 14px", background: C.card, border: "1px solid " + C.border, borderRadius: 20, fontSize: 12, color: C.textMid, cursor: "pointer" }}>{sug}</button>; })}
                  </div>}
                </div>
                <div style={{ padding: "12px 28px", borderTop: "1px solid " + C.border, display: "flex", gap: 10 }}>
                  <input type="text" value={digOpen === ci ? digInput : ""} onChange={function(e) { setDigInput(e.target.value); }} onKeyPress={function(e) { if (e.key === "Enter") sendDig(ci, digInput); }} placeholder="Ask anything..." style={{ flex: 1, padding: "10px 14px", border: "1px solid " + C.border, borderRadius: 6, fontSize: 13, outline: "none", background: C.card }} />
                  <button onClick={function() { sendDig(ci, digInput); }} style={{ padding: "10px 16px", background: C.header, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center" }}><Send size={14} strokeWidth={2} /></button>
                </div>
              </div>}
            </div>
          ); })}
        </div>

        {/* All Insights */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Insights & Decisions</h2>
            <span style={{ fontSize: 12, color: C.textLight }}>{insights.length} active · click to expand</span>
          </div>
          {insights.map(ins => (
            <InsightCard key={ins.id} insight={ins} isExpanded={expandedInsight === ins.id} onToggle={() => setExpandedInsight(expandedInsight === ins.id ? null : ins.id)} onShowTrail={setTrailInsight} />
          ))}
        </div>

        {/* Territory Overview */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Territory Overview</h2>
            <span style={{ fontSize: 12, color: C.textLight }}>5 territories · ASM-level drill-down</span>
          </div>
          {territories.map(t => (
            <TerritoryRow key={t.id} t={t} isExpanded={expandedTerritory === t.id} onToggle={() => setExpandedTerritory(expandedTerritory === t.id ? null : t.id)} />
          ))}
        </div>

        </div>}

        {mainTab === "history" && <div>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: 20, fontWeight: 400, margin: "0 0 6px" }}>Decision History</h2>
            <p style={{ fontSize: 13, color: C.textLight, margin: 0 }}>Past decisions, outcomes, and what the system learned. This is how Market Pulse gets smarter.</p>
          </div>
          {pastDecisions.map(function(d) {
            var sc = d.status === "success" ? C.green : d.status === "failed" ? C.red : C.orange;
            var scBg = d.status === "success" ? C.greenPale : d.status === "failed" ? C.redPale : C.orangePale;
            var scLabel = d.status === "success" ? "Positive" : d.status === "failed" ? "Negative" : "Partial";
            var ScIcon = d.status === "success" ? CheckCircle : d.status === "failed" ? XCircle : Clock;
            var isExp = expandedHistory === d.id;
            return <div key={d.id} style={{ ...cardBase, marginBottom: 10, overflow: "hidden" }}>
              <div onClick={function() { setExpandedHistory(isExp ? null : d.id); }} style={{ padding: "18px 28px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: scBg, flexShrink: 0 }}><ScIcon size={16} color={sc} strokeWidth={2} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: sc, padding: "2px 8px", background: scBg, borderRadius: 10 }}>{scLabel}</span>
                    <span style={{ fontSize: 11, color: C.textLight }}>{d.date} {d.brand}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: sc, marginLeft: "auto" }}>{d.impact}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.45 }}>{d.decision}</div>
                </div>
              </div>
              {isExp && <div style={{ borderTop: "1px solid " + C.border, padding: "20px 28px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div><div style={{ ...label, fontSize: 9, marginBottom: 6 }}>ACTION TAKEN</div><div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{d.action}</div></div>
                  <div><div style={{ ...label, fontSize: 9, marginBottom: 6 }}>OUTCOME</div><div style={{ fontSize: 13, color: C.textMid, lineHeight: 1.6 }}>{d.outcome}</div></div>
                </div>
                <div style={{ padding: "14px 18px", background: scBg, borderLeft: "3px solid " + sc }}>
                  <div style={{ ...label, fontSize: 9, color: sc, marginBottom: 6 }}>WHAT THE SYSTEM LEARNED</div>
                  <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, fontWeight: 500 }}>{d.learning}</div>
                </div>
              </div>}
            </div>;
          })}
        </div>}
        </div>

        <div style={{ marginTop: "auto", borderTop: "1px solid " + C.border, padding: "12px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", background: C.card }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 500, color: C.textMid }}>questt</span>
            <span style={{ color: C.green, fontSize: 12, fontWeight: 700 }}>.</span>
            <span style={{ fontSize: 10, color: C.border, margin: "0 2px" }}>|</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: C.textMid, fontFamily: "Georgia, serif" }}>pwc</span>
            <span style={{ fontSize: 10, color: C.textLight, marginLeft: 10 }}>Market Pulse v2.4</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#3BB896" }} />
            <span style={{ fontSize: 10, color: C.textLight }}>Synced 2 min ago</span>
          </div>
        </div>
      </div>

      {trailInsight && <AgentTrailModal insight={trailInsight} onClose={() => setTrailInsight(null)} />}
    </div>
  );
}

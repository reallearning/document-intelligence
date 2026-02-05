"use client"
import { useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

const C = {
  header: "#0C2C18", page: "#F5F2ED", card: "#FFFFFF", border: "#E5E0D8",
  borderLight: "#EEEAE3", text: "#1A1A1A", textMid: "#5A5A5A", textLight: "#8C8C8C",
  green: "#1B6B4A", greenPale: "#EBF3EE", sage: "#7EA37E",
  orange: "#D07030", orangePale: "#FDF3EB", red: "#B83D2B", redPale: "#FDF0ED",
};
const label = { fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.textLight };
const cardBase = { background: C.card, border: `1px solid ${C.border}` };

// ═══════════════════════════════════════════════════════
// PORTFOLIO KPIs
// ═══════════════════════════════════════════════════════
const portfolioKPIs = [
  { label: "PORTFOLIO ACHIEVEMENT", value: "84%", delta: "−6% vs LYSM", negative: true },
  { label: "BRANDS ON TRACK", value: "3 / 6", delta: "Eno, Crocin, Iodex behind", negative: true },
  { label: "PRIORITY ACTIONS", value: "5", delta: "2 critical, 3 high" },
  { label: "AVG NUMERIC DISTRIBUTION", value: "39%", delta: "−2pp vs last period", negative: true },
];

// ═══════════════════════════════════════════════════════
// CRITICAL ITEMS (ticker)
// ═══════════════════════════════════════════════════════
const criticalItems = [
  { id: 1, severity: "critical", headline: "Eno losing ground in Rajasthan — Gas-O-Fast regional campaign redirecting demand", detail: "Nielsen North zone: Eno −1.2pp while category grew 6%. Gas-O-Fast running 14 Rajasthani-language Meta ad sets since Jan 18. Jaipur primary sales −28%. Wedding season approaching — action urgent.", category: "Eno" },
  { id: 2, severity: "critical", headline: "Crocin chemist margins being undercut by Dolo 650 in Lucknow–Kanpur", detail: "Micro Labs offering 22% retail margin vs Crocin's 16%. 14 of top-40 Lucknow chemists shifted recommendation. Consumer search stable — this is trade-driven and recoverable.", category: "Crocin" },
  { id: 3, severity: "high", headline: "Sensodyne ₹20 reorder rate in Agra at 85% — pharmacy-first playbook validated", detail: "Pharmacy: 92% reorder. GT: 28%. Three adjacent districts (Mathura, Firozabad, Etah) ready for replication.", category: "Sensodyne" },
  { id: 4, severity: "high", headline: "IMD forecasts monsoon 8 days early — pre-load Crocin and Otrivin at MP distributors", detail: "4 of 8 MP distributors below 10 days stock cover. Historical: early monsoon triggers 25–35% demand spike. Orders must be placed by Wednesday.", category: "Crocin" },
  { id: 5, severity: "high", headline: "Otrivin riding extended pollution demand — IQVIA prescriptions up 32%, campaign extension needed", detail: "AQI >250 for 18 days past seasonal norm. Nasal Mist premium SKU +22% WoW. Campaign paced to end Jan 31 — needs 2-week extension.", category: "Otrivin" },
];

// ═══════════════════════════════════════════════════════
// ALL INSIGHTS (Eno, Otrivin first, then rest)
// ═══════════════════════════════════════════════════════
const insights = [
  {
    id: 1, priority: "critical", type: "Competitive Alert", category: "Eno", region: "Rajasthan · North Zone",
    headline: "Eno losing ground in Rajasthan — Gas-O-Fast regional campaign redirecting antacid demand",
    subtitle: "Eno value share down 1.2pp in North zone while antacid category grew 6%. Demand exists but is being captured by competition.",
    kpis: [
      { label: "Eno Share Change", value: "−1.2pp", note: "62.4% → 61.2%" },
      { label: "Gas-O-Fast Gain", value: "+1.7pp", note: "18.1% → 19.8%" },
      { label: "Category Growth", value: "+6%", note: "Demand is healthy" },
      { label: "Jaipur Primary Drop", value: "−28%", note: "₹4.2L → ₹3.0L" },
    ],
    evidence: [
      { source: "Nielsen IQ", summary: "Eno value share declined 62.4% → 61.2% (−1.2pp) in North zone. Gas-O-Fast gained 1.7pp to 19.8%. Antacid category grew 6% — competitive share loss, not demand decline. Eno weighted distribution stable at 78%." },
      { source: "Google Trends + E-com Search", summary: "'Gas relief sachet' in Rajasthan +18% over 4 weeks. 'Eno' search flat, 'Gas-O-Fast' +42%. Amazon 'antacid sachet' Jaipur +22% with Gas-O-Fast in top sponsored results. Category demand is rising but being redirected." },
      { source: "Competitive Media (Meta Ad Library)", summary: "Gas-O-Fast running 14 active Meta ad sets in Rajasthani language since Jan 18 — 3x normal campaign load. Targeting Jaipur–Jodhpur corridor. Organic Instagram post frequency 3x normal. Share of voice in antacid social moved 12% → 24%. Note: competitor views/CTR not available via public sources." },
      { source: "Social Listening", summary: "Gas-O-Fast 'longer lasting relief' messaging gaining traction on Instagram Reels in Hindi/Rajasthani. No negative Eno sentiment — this is not a product issue, it's a media capture issue." },
      { source: "DMS (Internal Sales)", summary: "Jaipur ASM: −28%. Jodhpur ASM: −22%. Udaipur: −8%. Kota: −3%. Decline concentrated in Jaipur–Jodhpur corridor matching campaign targeting. Sachet SKU most affected (−32% Jaipur)." },
      { source: "Seasonal Calendar", summary: "Wedding season approaching (April–May) — historically drives 15–20% antacid uplift from heavy meals. Sachet format 3x more important during wedding occasions. If not countered before then, Gas-O-Fast captures seasonal demand too." },
    ],
    salesAction: "Brief Jaipur and Jodhpur ASMs to counter-detail top 50 chemists. Request ₹1-off trade scheme on Eno sachets for Rajasthan for 4 weeks. Prioritise sachet placement at high-footfall general stores and large chemists near wedding venues. Ensure sachet stock-up ahead of April wedding season.",
    marketingAction: "Commission Rajasthani-language counter-campaign on Meta and YouTube targeting 'gas relief' and 'acidity remedy' search terms. Increase Eno sachet sampling at wedding-season events in Jaipur–Jodhpur. Adjust digital communication to intercept category searches before Gas-O-Fast captures them.",
    nudgeConnection: "Push to Jaipur and Jodhpur ASMs: 'Gas-O-Fast campaign active in your territory. Prioritise sachet placement at top 50 chemists this week. Wedding season demand approaching — ensure sachet stock at all large general stores.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Detected anomaly: Eno primary sales declining in Rajasthan while category search volume and Nielsen category growth both rising", routing: "Dispatching to Market Share Agent, Consumer Demand Agent, Competitive Media Agent, and Commercial Performance Agent for triangulation" },
      { agent: "Market Share Agent", icon: "▣", source: "Nielsen IQ — North Zone Antacid Category", query: "SELECT brand, value_share, volume_share, share_change_pp, weighted_distribution FROM nielsen_category_share WHERE category='Antacid' AND zone='North' AND period='Jan-26'", finding: "Eno value share 62.4% → 61.2% (−1.2pp). Gas-O-Fast 18.1% → 19.8% (+1.7pp). Category grew 6%. Weighted distribution stable — this is a conversion shift, not availability.", inference: "Eno is losing share specifically to Gas-O-Fast. Category is healthy. Problem is competitive, not demand-side." },
      { agent: "Consumer Demand Agent", icon: "◉", source: "Google Trends · Social Listening · Amazon Search", query: "google_trends(keywords=['gas relief sachet','eno','gas-o-fast'], geo='IN-RJ', timeframe='4w') | social_listening(category='antacid', geo='Rajasthan') | amazon_search(keywords=['antacid sachet'], geo='Jaipur')", finding: "Google: 'gas relief sachet' Rajasthan +18%. 'Eno' flat. 'Gas-o-fast' +42%. Amazon: 'antacid sachet' Jaipur +22%, Gas-O-Fast in top sponsored positions. Social: Gas-O-Fast 'longer lasting relief' narrative gaining traction on Instagram Reels.", inference: "Category demand rising but Gas-O-Fast capturing incremental search and social conversation. Regional-language content strategy intercepting purchase intent across Google, Amazon, and social." },
      { agent: "Competitive Media Agent", icon: "◆", source: "Meta Ad Library · Social Share of Voice Tracking", query: "meta_ad_library(advertiser='Gas-O-Fast', region='Rajasthan', timeframe='4w') | social_sov(category='antacid', geo='Rajasthan')", finding: "14 active Meta ad sets in Rajasthani language since Jan 18 — 3x normal. Targeting Jaipur and Jodhpur. Regional-language testimonial creatives. Organic post frequency 3x. Share of voice moved 12% → 24%. Competitor views/CTR not observable via public sources.", inference: "Deliberate, well-resourced regional campaign. Combination of paid (14 ad sets) and organic (3x frequency) indicates sustained investment, not one-off burst." },
      { agent: "Commercial Performance Agent", icon: "▣", source: "DMS (Bizom) — Rajasthan ASM Territories", query: "SELECT asm_territory, eno_primary_sales_4w, eno_primary_sales_prev_4w, pct_change, sku_split FROM dms_primary_sales WHERE state='Rajasthan' AND brand='Eno' ORDER BY pct_change ASC", finding: "Jaipur ASM: −28% (₹4.2L → ₹3.0L). Jodhpur ASM: −22%. Udaipur: −8%. Kota: −3%. Sachet SKU most impacted (−32% Jaipur). Geographic pattern matches Gas-O-Fast campaign targeting exactly.", inference: "Impact concentrated in urban Rajasthan, heaviest on sachet format — both consistent with competitor's messaging and geographic targeting." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Four independent signals converge — Nielsen confirms share loss to Gas-O-Fast, Google + Amazon + social confirm demand being redirected, Meta Ad Library reveals campaign mechanism, DMS shows geographic concentration matching targeting. Coordinated competitive attack via regional-language digital marketing. Counter-action needed in Jaipur–Jodhpur with urgency ahead of wedding season." },
    ],
  },
  {
    id: 2, priority: "high", type: "Demand Signal + Expert Performance", category: "Otrivin", region: "Delhi NCR · North Zone",
    headline: "Delhi pollution extending Otrivin demand beyond season — expert prescriptions and AQI driving sustained pull",
    subtitle: "AQI >250 for 18 consecutive days past normal. IQVIA expert prescriptions up 32%. Otrivin at 112% of target. Campaign extension opportunity.",
    kpis: [
      { label: "Achievement", value: "112%", note: "Of target" },
      { label: "IQVIA Rx Uplift", value: "+32%", note: "vs seasonal norm" },
      { label: "Search Uplift", value: "+45%", note: "Above seasonal norm" },
      { label: "Nasal Mist Growth", value: "+22% WoW", note: "Premium SKU" },
    ],
    evidence: [
      { source: "CPCB + Google Trends", summary: "Delhi AQI >250 for 18 consecutive days past typical late-January improvement. CPCB forecasts 2 more weeks of elevated levels. Google 'nasal congestion relief' +45% and 'nasal spray' +38% above seasonal norms. Pollution creating 3–4 week demand tailwind beyond normal respiratory season." },
      { source: "Veeva & IQVIA (Expert Performance)", summary: "ENT specialist prescriptions for nasal decongestants in Delhi NCR up 32% vs seasonal norm. Otrivin holds 41% of ENT prescription share — stable, no competitive erosion. GP prescriptions also +18%. Veeva CRM: med rep coverage of top-100 Delhi ENTs at 78% (above 70% target)." },
      { source: "DMS + Gobble Cube (Q-comm)", summary: "Otrivin at 112% target. Weekly primary ₹32L → ₹56L over 8 weeks. Nasal Mist premium SKU +22% WoW. Gobble Cube: Blinkit/Zepto Otrivin orders in Delhi +48% WoW — impulse purchase on AQI spike days. Pharmacy driving 68% of incremental volume." },
      { source: "Campaign Performance", summary: "Current Otrivin digital campaign: CTR 2.1% (vs 1.6% benchmark), conversion 0.8%, reach 1.2M over 3 weeks. Paced to end Jan 31. Incremental ₹15L spend over 2 weeks estimated at 3.2x ROAS. Pausing while AQI elevated would cede window to Vicks." },
      { source: "E-com + Consumer Sentiment (R&R)", summary: "Amazon: Otrivin Nasal Mist 4.4★ (890 reviews), top praise: 'works instantly for pollution congestion'. Social: 'pollution nasal spray' mentions up 3.5x in Delhi. Otrivin 52% brand share of mentions vs Vicks at 31%." },
    ],
    salesAction: "Maintain full Otrivin range in Delhi NCR. Ensure Nasal Mist premium SKU fully stocked at pharmacy outlets — trading-up opportunity. Verify Blinkit and Zepto stock levels across Delhi pin codes to capture Q-comm impulse demand.",
    marketingAction: "Extend digital campaign by 2 weeks beyond Jan 31 pacing. Request incremental A&P for pollution-specific creative — leverage AQI data in ad copy. Target 'pollution relief' and 'nasal spray' search terms. 3.2x ROAS projection justifies investment.",
    nudgeConnection: "Push to Delhi NCR ASMs: 'Pollution demand continuing — ensure full Otrivin range at all outlets. Prioritise Nasal Mist at premium pharmacies. Verify Q-comm stock. Extended season window for 2 more weeks.'",
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
    headline: "Dolo 650 margin scheme undercutting Crocin in Lucknow–Kanpur pharmacy channel",
    subtitle: "Micro Labs offering 22% retail margin vs Crocin's 16%. 14 of top-40 Lucknow chemists shifted. Consumer search stable — trade-driven, recoverable.",
    kpis: [
      { label: "Margin Gap", value: "6pp", note: "22% Dolo vs 16% Crocin" },
      { label: "Chemists Flipped", value: "14 / 40", note: "Top Lucknow chemists" },
      { label: "Pharmacy Velocity", value: "−18%", note: "2-week decline" },
      { label: "Consumer Search", value: "Stable", note: "Trade-driven, not pull" },
    ],
    evidence: [
      { source: "Field Reports (SFA)", summary: "3 ASMs in Lucknow, Kanpur, Allahabad independently reported Micro Labs offering 22% retail margin on Dolo 650 vs Crocin's 16%. Scheme targeting top-prescribing chemists." },
      { source: "DMS + IQVIA", summary: "14 of top-40 Lucknow chemists show Crocin velocity −30%+. All 14 now stock Dolo prominently. Remaining 26: Crocin stable (−2%). IQVIA: Crocin still leads in doctor prescriptions across UP West — disconnect between prescription preference and pharmacy-counter recommendation." },
      { source: "Google Trends", summary: "Consumer search for 'paracetamol' and 'crocin' in UP stable. No consumer preference shift. Entirely trade-level margin play — recoverable." },
    ],
    salesAction: "Escalate margin gap to trade marketing. Push Crocin Advance positioning (higher-margin SKU absorbs better trade terms). Schedule joint ASM visits to top 20 lost Lucknow chemists. Highlight IQVIA doctor-prescription leadership in chemist conversations.",
    marketingAction: "Launch 'Trusted since 1964' pharmacy POS campaign in UP West. Leverage IQVIA prescription data in counter materials. Digital campaign targeting 'paracetamol trusted brand' to reinforce consumer pull.",
    nudgeConnection: "Push to UP West ASMs: 'Dolo 650 margin scheme active in Lucknow — visit your top 20 chemists this week with Crocin Advance samples. Highlight doctor prescription data. Scheme expected to reach Kanpur by week 5.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Flagged: Crocin pharmacy velocity drop in UP West exceeding variance threshold (−18% in 2W)", routing: "Dispatching to Field Intelligence Agent, Distribution Agent, and Consumer Demand Agent" },
      { agent: "Field Intelligence Agent", icon: "◆", source: "SFA (FieldAssist) — ASM Reports, UP West", query: "SELECT asm_name, report_date, issue_type, competitor_brand, details FROM asm_field_reports WHERE state='UP_West' AND issue_type='competitive_activity' AND date >= DATE_SUB(NOW(), INTERVAL 14 DAY)", finding: "3 ASMs independently reported: Micro Labs offering 22% retail margin on Dolo 650 vs Crocin's 16%. Scheme targeted at top-prescribing chemists.", inference: "Deliberate margin scheme targeting pharmacy channel. 6pp gap significant enough to flip chemist recommendations." },
      { agent: "Distribution Agent", icon: "▣", source: "DMS — Pharmacy Channel · IQVIA Prescription Data", query: "SELECT chemist_name, city, crocin_velocity_current, crocin_velocity_4w_ago, dolo_stocking FROM pharmacy_outlet_data WHERE state='UP_West' AND segment='top_40' | iqvia_rx(molecule='paracetamol', geo='UP_West')", finding: "14 of top-40 Lucknow chemists flipped — Crocin velocity −30%+ at these outlets. Remaining 26: stable (−2%). Chemist-by-chemist conversion pattern. IQVIA: Crocin leads doctor prescriptions — disconnect with pharmacy counter.", inference: "Margin economics driving chemist switches. IQVIA data proves professional preference hasn't changed — purely trade incentive." },
      { agent: "Consumer Demand Agent", icon: "◉", source: "Google Trends", query: "google_trends(keywords=['crocin','dolo 650','paracetamol'], geo='IN-UP', timeframe='8w')", finding: "Consumer search for 'paracetamol' and 'crocin' in UP: stable. 'Dolo 650' +8% minor. No consumer campaign or social shift detected.", inference: "Trade-level play, not consumer pull shift. Recoverable with right trade response." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Root cause: Micro Labs 22% margin scheme. Impact trade-driven, contained to Lucknow. Two response paths: match margin (expensive, sets precedent) or shift to Crocin Advance positioning (higher-margin SKU absorbs better terms). Time-sensitive — scheme likely to expand to Kanpur in 2–3 weeks." },
    ],
  },
  {
    id: 4, priority: "high", type: "Distribution Opportunity", category: "Sensodyne", region: "UP East",
    headline: "Sensodyne ₹20 pack pharmacy-first strategy validated — 92% reorder in Agra, playbook ready for replication",
    subtitle: "Channel strategy is the differentiator, not geography. Pharmacy 92% reorder vs GT 28%. Mathura, Firozabad, Etah next.",
    kpis: [
      { label: "Agra Reorder Rate", value: "85%", note: "2.5x territory avg" },
      { label: "Pharmacy Reorder", value: "92%", note: "Recommendation loop" },
      { label: "GT Reorder", value: "28%", note: "No recommendation" },
      { label: "Adjacent Districts", value: "3", note: "Mathura, Firozabad, Etah" },
    ],
    evidence: [
      { source: "DMS (Outlet Reorder)", summary: "Agra pharmacy: 92% reorder. GT: 28%. Meerut (GT-led): 26%. Aligarh (GT-led): 31%. Channel mix is the driver — pharmacist recommendation creates a natural repeat-purchase loop that GT lacks." },
      { source: "Google Trends + Amazon R&R", summary: "Agra search interest 1.4x state average — moderately above, but not 2.5x. Amazon reviews for ₹20 pack mention 'pharmacist recommended' as top purchase trigger. Execution is the multiplier, not demand." },
    ],
    salesAction: "Shift activation in Mathura, Firozabad, Etah to pharmacy-first. Target 200 chemist outlets per district. Use Agra data in distributor pitches.",
    marketingAction: "Develop pharmacist education kit for ₹20 trial-to-conversion. Create 'Recommended by pharmacists in Agra' localised POS for adjacent districts.",
    nudgeConnection: "Push to UP East ASMs: 'Agra ₹20 playbook ready — pharmacy-first, 200 chemists per district. Agra data pack attached for distributor conversations.'",
    agentTrail: [
      { agent: "Orchestrator", icon: "◈", action: "Positive signal detected: Sensodyne ₹20 reorder in Agra 2.5x above territory average", routing: "Dispatching to Distribution Agent and Consumer Demand Agent to identify success drivers" },
      { agent: "Distribution Agent", icon: "▣", source: "DMS — Outlet Reorder Data, Sensodyne ₹20", query: "SELECT district, channel_type, outlets_activated, outlets_reordered, reorder_rate FROM sensodyne_20_activation WHERE territory='UP_East' GROUP BY district, channel_type ORDER BY reorder_rate DESC", finding: "Agra: 85% reorder. Pharmacy: 92%. GT: 28%. Meerut GT-led: 26%. Aligarh GT-led: 31%. Varanasi mixed: 48%.", inference: "Channel mix is primary driver. Pharmacy-led activation produces 3x reorder rate." },
      { agent: "Consumer Demand Agent", icon: "◉", source: "Google Trends · Amazon R&R", query: "google_trends(keywords=['sensitivity toothpaste','sensodyne'], geo='IN-UP', resolution='city', timeframe='8w') | amazon_reviews(product='Sensodyne 20', market='IN')", finding: "Agra search: 140 index (state avg 100). Meerut: 95. Aligarh: 88. Amazon ₹20 reviews: 'pharmacist recommended' as top trigger.", inference: "Demand 1.4x above average in Agra but 2.5x reorder is execution-driven. Pharmacy recommendation creates natural repeat loop." },
      { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Pharmacy-first = 3x reorder vs GT. Replicable playbook. Adjacent districts have comparable demand but GT-led activation. Switching to pharmacy-first should yield 2–2.5x reorder improvement." },
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



      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 40px 60px" }}>

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
          <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 20, fontWeight: 400, margin: "0 0 16px" }}>This Week's Critical Items</h2>
          {criticalItems.map(item => (
            <div key={item.id} style={{ ...cardBase, marginBottom: 8, padding: "18px 28px", display: "flex", alignItems: "flex-start", gap: 16 }}>
              <SeverityIcon severity={item.severity} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.45 }}>{item.headline}</div>
                <div style={{ fontSize: 13, color: C.textMid, marginTop: 6, lineHeight: 1.55 }}>{item.detail}</div>
              </div>
            </div>
          ))}
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
      </div>

      {/* Agent Trail Modal */}
      {trailInsight && <AgentTrailModal insight={trailInsight} onClose={() => setTrailInsight(null)} />}
    </div>
  );
}

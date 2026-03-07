"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";


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
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
      isC ? "bg-pwc-terra-soft text-pwc-terra" : "bg-pwc-amber-soft text-pwc-amber"
    }`}>
      {isC ? "!" : "◷"}
    </div>
  );
};

const PriorityBadge = ({ p }) => {
  const s = {
    critical: "bg-pwc-terra-soft text-pwc-terra border border-pwc-terra/20",
    high: "bg-pwc-amber-soft text-pwc-amber border border-pwc-amber/20",
  }[p] || "bg-pwc-sage-soft text-pwc-sage border border-pwc-sage/20";
  return (
    <span className={`text-[10px] font-bold tracking-[0.06em] uppercase px-2.5 py-0.5 rounded-sm ${s}`}>
      {p === "critical" ? "Critical" : p === "high" ? "High Priority" : "Medium"}
    </span>
  );
};

const StatusDot = ({ s }) => (
  <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
    s === "on-track" ? "bg-pwc-sage" : s === "needs-attention" ? "bg-pwc-amber" : "bg-pwc-terra"
  }`} />
);

const SectionHeader = ({ title, count, right }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      <div className="w-[3px] h-4 bg-pwc-sage rounded-full flex-shrink-0" />
      <h2 className="text-[15px] font-bold text-pwc-text tracking-tight">{title}</h2>
      {count !== undefined && (
        <span className="text-[10px] font-bold text-pwc-dimmer bg-pwc-bg-alt border border-pwc-border-light px-2 py-0.5 rounded">{count}</span>
      )}
    </div>
    {right && <span className="text-[11px] text-pwc-dimmer">{right}</span>}
  </div>
);

// ═══════════════════════════════════════════════════════
// AGENT TRAIL MODAL
// ═══════════════════════════════════════════════════════
const AgentTrailModal = ({ insight, onClose }) => {
  if (!insight) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 z-[100] bg-pwc-green/40 backdrop-blur-sm flex items-center justify-center p-8">
      <div onClick={e => e.stopPropagation()} className="bg-white w-full max-w-[740px] max-h-[85vh] flex flex-col rounded-xl shadow-2xl border border-pwc-border overflow-hidden">
        {/* Header */}
        <div className="px-7 py-5 border-b border-pwc-border-light flex items-start justify-between flex-shrink-0 bg-pwc-bg-sub rounded-t-xl">
          <div>
            <div className="text-[10px] font-bold text-pwc-sage tracking-[0.09em] uppercase mb-1.5">Agent Decision Trail</div>
            <div className="text-[15px] font-semibold text-pwc-text leading-snug">{insight.headline}</div>
            <div className="text-[11px] text-pwc-dimmer mt-1">{insight.category} · {insight.region}</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center border border-pwc-border rounded text-pwc-dim text-sm hover:bg-pwc-bg-alt cursor-pointer flex-shrink-0 bg-transparent transition-colors">✕</button>
        </div>
        {/* Body */}
        <div className="overflow-auto px-7 py-6">
          {insight.agentTrail.map((step, i) => {
            const isLast = i === insight.agentTrail.length - 1;
            const isSynthesis = step.agent === "Synthesis";
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center w-7 flex-shrink-0">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs flex-shrink-0 mt-0.5 ${
                    isSynthesis ? "bg-pwc-sage-soft border-pwc-sage/40 text-pwc-sage" : "bg-white border-pwc-border text-pwc-dimmer"
                  }`}>{step.icon}</div>
                  {!isLast && <div className="w-px flex-1 bg-pwc-border-light mt-1" />}
                </div>
                <div className={`flex-1 pl-1 ${!isLast ? "pb-5" : ""}`}>
                  <div className={`text-[13px] font-bold mb-1.5 ${isSynthesis ? "text-pwc-sage" : "text-pwc-text"}`}>{step.agent}</div>
                  {step.action && <div className="text-[12px] text-pwc-dim leading-relaxed mb-1.5">{step.action}</div>}
                  {step.routing && <div className="text-[11px] text-pwc-sage italic mb-2">{step.routing}</div>}
                  {step.source && (
                    <div className="bg-pwc-bg-sub border border-pwc-border-light rounded-lg p-4 mt-2">
                      <div className="text-[10px] font-bold text-pwc-dimmer tracking-wider uppercase mb-2">Source: {step.source}</div>
                      {step.query && (
                        <div className="font-fira text-[10px] text-pwc-dim bg-white border border-pwc-border-light rounded p-2.5 mb-3 break-all leading-relaxed">{step.query}</div>
                      )}
                      {step.finding && (
                        <div className="text-[12px] text-pwc-text leading-relaxed mb-1.5">
                          <span className="font-semibold">Finding: </span>{step.finding}
                        </div>
                      )}
                      {step.inference && !isSynthesis && (
                        <div className="text-[12px] text-pwc-sage leading-relaxed">
                          <span className="font-semibold">Inference: </span>{step.inference}
                        </div>
                      )}
                    </div>
                  )}
                  {isSynthesis && step.inference && (
                    <div className="border-l-[3px] border-pwc-sage bg-pwc-sage-soft rounded-r-lg px-4 py-3 mt-2">
                      <div className="text-[13px] text-pwc-text leading-relaxed font-medium">{step.inference}</div>
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
  const isCrit = insight.priority === "critical";
  return (
    <div className={`flex bg-white rounded-lg overflow-hidden border transition-shadow ${
      isExpanded ? "border-pwc-border shadow-md" : "border-pwc-border-light shadow-sm"
    }`}>
      <div className={`w-[3px] flex-shrink-0 ${isCrit ? "bg-pwc-terra" : "bg-pwc-amber"}`} />
      <div className="flex-1 min-w-0">
        {/* Collapsed */}
        <div className="px-5 py-4 flex items-start gap-4 cursor-pointer hover:bg-pwc-bg-sub/50 transition-colors" onClick={onToggle}>
          <SeverityIcon severity={insight.priority} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <PriorityBadge p={insight.priority} />
              <span className="text-[11px] text-pwc-dimmer">{insight.type}</span>
              <span className="text-pwc-dimmer/40 text-[10px]">·</span>
              <span className="text-[11px] text-pwc-dimmer">{insight.region}</span>
            </div>
            <div className="text-[13px] font-semibold text-pwc-text leading-snug mb-1">{insight.headline}</div>
            <div className="text-[12px] text-pwc-dim leading-relaxed">{insight.subtitle}</div>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0 ml-2 mt-0.5">
            <button
              onClick={e => { e.stopPropagation(); onShowTrail(insight); }}
              className="text-[11px] font-semibold text-pwc-sage bg-pwc-sage-soft border border-pwc-sage/20 rounded px-3 py-1.5 flex items-center gap-1.5 cursor-pointer hover:bg-pwc-sage/10 transition-colors whitespace-nowrap"
            >
              <span className="text-[10px]">◈</span> Decision Trail
            </button>
            <span className={`text-[11px] text-pwc-dimmer inline-block transition-transform ${isExpanded ? "rotate-180" : ""}`}>▾</span>
          </div>
        </div>

        {/* Expanded */}
        {isExpanded && (
          <div className="border-t border-pwc-border-light">
            {/* KPIs */}
            <div className="grid grid-cols-4 border-b border-pwc-border-light">
              {insight.kpis.map((k, i) => (
                <div key={i} className={`p-4 ${i < insight.kpis.length - 1 ? "border-r border-pwc-border-light" : ""}`}>
                  <div className="text-[10px] font-bold text-pwc-dimmer tracking-wider uppercase mb-2">{k.label}</div>
                  <div className="text-[22px] font-bold text-pwc-text leading-none mb-1">{k.value}</div>
                  <div className="text-[11px] text-pwc-dimmer">{k.note}</div>
                </div>
              ))}
            </div>
            {/* Actions */}
            <div className="p-5 border-b border-pwc-border-light">
              <div className="text-[10px] font-bold text-pwc-amber tracking-[0.09em] uppercase mb-4">Recommended Actions</div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="text-[10px] font-bold text-pwc-dimmer tracking-wider uppercase mb-2">Sales</div>
                  <div className="text-[12px] text-pwc-text-mid leading-relaxed">{insight.salesAction}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-pwc-dimmer tracking-wider uppercase mb-2">Marketing</div>
                  <div className="text-[12px] text-pwc-text-mid leading-relaxed">{insight.marketingAction}</div>
                </div>
              </div>
            </div>
            {/* Evidence */}
            <div className="p-5 bg-pwc-bg-sub">
              <div className="text-[10px] font-bold text-pwc-dimmer tracking-[0.09em] uppercase mb-3">Supporting Evidence</div>
              <div className="flex flex-col gap-2">
                {insight.evidence.map((e, i) => (
                  <div key={i} className="bg-white border border-pwc-border-light rounded-lg p-4">
                    <div className="text-[11px] font-bold text-pwc-text uppercase tracking-wide mb-1.5">{e.source}</div>
                    <div className="text-[12px] text-pwc-dim leading-relaxed">{e.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════
// TERRITORY ROW
// ═══════════════════════════════════════════════════════
const TerritoryRow = ({ t, isExpanded, onToggle }) => {
  const st = {
    "on-track":        { bar: "bg-pwc-sage",  text: "text-pwc-sage",  accent: "bg-pwc-sage",  chart: "#1B6B5A" },
    "needs-attention": { bar: "bg-pwc-amber", text: "text-pwc-amber", accent: "bg-pwc-amber", chart: "#946B1A" },
    "at-risk":         { bar: "bg-pwc-terra", text: "text-pwc-terra", accent: "bg-pwc-terra", chart: "#B33A3A" },
  }[t.status];
  return (
    <div className={`flex bg-white rounded-lg overflow-hidden border transition-shadow ${
      isExpanded ? "border-pwc-border shadow-md" : "border-pwc-border-light shadow-sm"
    }`}>
      <div className={`w-[3px] flex-shrink-0 ${st.accent}`} />
      <div className="flex-1 min-w-0">
        {/* Collapsed */}
        <div onClick={onToggle} className="px-5 py-4 cursor-pointer flex items-center gap-5 hover:bg-pwc-bg-sub/50 transition-colors">
          <StatusDot s={t.status} />
          <div className="w-[140px] text-[13px] font-semibold text-pwc-text flex-shrink-0">{t.name}</div>
          <div className="flex items-center gap-3 w-[140px] flex-shrink-0">
            <div className="flex-1 h-1.5 bg-pwc-border-light rounded-full overflow-hidden">
              <div className={`h-full ${st.bar} rounded-full`} style={{ width: `${Math.min(t.achievement, 100)}%` }} />
            </div>
            <span className={`text-[14px] font-bold ${st.text} w-10 text-right`}>{t.achievement}%</span>
          </div>
          <div className="flex-1 text-[12px] text-pwc-dim leading-relaxed min-w-0">{t.narrative}</div>
          <span className={`text-[11px] text-pwc-dimmer inline-block transition-transform flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}>▾</span>
        </div>
        {/* Expanded */}
        {isExpanded && (
          <div className="border-t border-pwc-border-light">
            <div className="p-5 grid grid-cols-[1fr_260px] gap-6 border-b border-pwc-border-light">
              <div>
                <div className="text-[10px] font-bold text-pwc-dimmer tracking-wider uppercase mb-3">ASM Area Breakdown</div>
                <div className="rounded-lg overflow-hidden border border-pwc-border-light">
                  <table className="w-full border-collapse text-[13px]">
                    <thead>
                      <tr className="bg-pwc-bg-alt">
                        <th className="text-left px-3 py-2 text-[10px] font-bold text-pwc-dimmer tracking-wider border-b border-pwc-border-light">ASM Area</th>
                        <th className="text-right px-3 py-2 text-[10px] font-bold text-pwc-dimmer tracking-wider border-b border-pwc-border-light">Achievement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {t.asmAreas.map((a, i) => (
                        <tr key={i} className="border-t border-pwc-border-light">
                          <td className="px-3 py-2.5 text-pwc-text">{a.name}</td>
                          <td className={`px-3 py-2.5 text-right font-bold ${
                            a.achievement >= 85 ? "text-pwc-sage" : a.achievement >= 75 ? "text-pwc-amber" : "text-pwc-terra"
                          }`}>{a.achievement}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-pwc-dimmer tracking-wider uppercase mb-3">Weekly Index (target = 100)</div>
                <div className="h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={t.weeklyTrend} barCategoryGap="18%">
                      <XAxis dataKey="w" tick={{ fontSize: 9, fill: "#A09D98" }} axisLine={{ stroke: "#E5E2DB" }} tickLine={false} />
                      <Bar dataKey="v" fill={st.chart} radius={[2, 2, 0, 0]} opacity={0.8} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              <div className="bg-pwc-sage-soft border border-pwc-sage/20 rounded-lg p-4">
                <div className="text-[10px] font-bold text-pwc-sage tracking-wider uppercase mb-1.5">Key Win</div>
                <div className="text-[12px] text-pwc-text">{t.keyWin}</div>
              </div>
              <div className="bg-pwc-amber-soft border border-pwc-amber/20 rounded-lg p-4">
                <div className="text-[10px] font-bold text-pwc-amber tracking-wider uppercase mb-1.5">Key Risk</div>
                <div className="text-[12px] text-pwc-text">{t.keyRisk}</div>
              </div>
            </div>
          </div>
        )}
      </div>
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
    <div className="h-screen overflow-auto bg-pwc-bg-sub font-inter text-pwc-text flex flex-col">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div className="sticky top-0 z-50 bg-pwc-green flex items-center justify-between px-8 h-14 border-b border-white/[0.08] flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-white tracking-tight">questt</span>
            <span className="text-white/20 text-[9px] select-none leading-none">×</span>
            <span className="text-[10px] font-bold tracking-[0.12em] text-white/50">PwC</span>
          </div>
          <span className="w-px h-4 bg-white/10 block" />
          <span className="text-[13px] text-white/55 font-normal">Market Pulse</span>
        </div>
        <span className="text-[11px] text-white/35 font-medium">Zone A · Week ending Feb 2, 2026</span>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-[1100px] mx-auto w-full px-8 py-8 pb-16">

        {/* KPI Strip */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {portfolioKPIs.map((kpi, i) => (
            <div key={i} className="bg-white rounded-[10px] border border-pwc-border-light overflow-hidden shadow-sm">
              <div className={`h-[2.5px] ${kpi.negative ? "bg-pwc-amber" : "bg-pwc-sage"}`} />
              <div className="p-5">
                <div className="text-[10px] font-bold text-pwc-dimmer tracking-[0.09em] uppercase mb-2">{kpi.label}</div>
                <div className="text-[28px] font-bold text-pwc-text leading-none mb-1.5">{kpi.value}</div>
                <div className={`text-[11px] leading-snug ${kpi.negative ? "text-pwc-amber" : "text-pwc-dimmer"}`}>{kpi.delta}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Critical Items */}
        <section className="mb-10">
          <SectionHeader
            title="This Week's Critical Items"
            count={criticalItems.length}
            right={`${criticalItems.filter(c => c.severity === "critical").length} critical · ${criticalItems.filter(c => c.severity === "high").length} high`}
          />
          <div className="flex flex-col gap-2">
            {criticalItems.map(item => (
              <div key={item.id} className="flex bg-white rounded-lg overflow-hidden border border-pwc-border-light shadow-sm">
                <div className={`w-[3px] flex-shrink-0 ${item.severity === "critical" ? "bg-pwc-terra" : "bg-pwc-amber"}`} />
                <div className="flex-1 px-5 py-4 flex items-start gap-4">
                  <SeverityIcon severity={item.severity} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-pwc-text leading-snug mb-1">{item.headline}</div>
                    <div className="text-[12px] text-pwc-dim leading-relaxed">{item.detail}</div>
                  </div>
                  <span className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded flex-shrink-0 mt-0.5 ${
                    item.severity === "critical" ? "bg-pwc-terra-soft text-pwc-terra" : "bg-pwc-amber-soft text-pwc-amber"
                  }`}>{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Insights */}
        <section className="mb-10">
          <SectionHeader title="Insights & Decisions" count={insights.length} right="click to expand" />
          <div className="flex flex-col gap-2">
            {insights.map(ins => (
              <InsightCard
                key={ins.id}
                insight={ins}
                isExpanded={expandedInsight === ins.id}
                onToggle={() => setExpandedInsight(expandedInsight === ins.id ? null : ins.id)}
                onShowTrail={setTrailInsight}
              />
            ))}
          </div>
        </section>

        {/* Territory */}
        <section>
          <SectionHeader title="Territory Overview" count={territories.length} right="5 territories · ASM-level drill-down" />
          <div className="flex flex-col gap-2">
            {territories.map(t => (
              <TerritoryRow
                key={t.id}
                t={t}
                isExpanded={expandedTerritory === t.id}
                onToggle={() => setExpandedTerritory(expandedTerritory === t.id ? null : t.id)}
              />
            ))}
          </div>
        </section>

      </div>

      {trailInsight && <AgentTrailModal insight={trailInsight} onClose={() => setTrailInsight(null)} />}
    </div>
  );
}

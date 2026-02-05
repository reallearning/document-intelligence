"use client"
import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ReferenceLine, ResponsiveContainer, Tooltip } from "recharts";

const B = {
  green: "#0C2C18", sage: "#85A383", cream: "#E7DDCA", dark: "#1B2A21",
  terracotta: "#DF7649", grey: "#878B87", white: "#FDFCF9", creamLight: "#F2EDE3",
};

// ═══════════════════════════════════════════════════════
// AGENT DECISION TRAILS
// ═══════════════════════════════════════════════════════

const agentTrails = {
  1: [ // Eno Gas-O-Fast
    {
      agent: "Orchestrator",
      icon: "◈",
      action: "Detected anomaly: Eno primary sales declining in Rajasthan while category search volume rising",
      routing: "Dispatching to Market Share Agent, Digital Signals Agent, and Competitive Intelligence Agent for triangulation",
      nextAgent: "Market Share Agent",
    },
    {
      agent: "Market Share Agent",
      icon: "▣",
      action: "Querying Nielsen IQ syndicated data",
      source: "Nielsen IQ — West Zone Antacid Category",
      query: "SELECT brand, value_share, volume_share, share_change_pp FROM nielsen_category_share WHERE category='Antacid' AND zone='West' AND period='Jan-26'",
      finding: "Eno value share 62.4% → 61.2% (−1.2pp). Gas-O-Fast 18.1% → 19.8% (+1.7pp). Category grew 6% — this is share loss, not market dip.",
      inference: "Eno is losing share specifically to Gas-O-Fast in West zone. Category is healthy — the problem is competitive, not demand-side.",
      nextAgent: "Digital Signals Agent",
    },
    {
      agent: "Digital Signals Agent",
      icon: "◉",
      action: "Cross-referencing search demand and social activity",
      source: "Google Trends API + Meta Social Listening",
      query: "google_trends(keywords=['gas relief sachet','eno','gas-o-fast'], geo='IN-RJ', timeframe='4w') | meta_ad_library(advertiser='Gas-O-Fast', region='Rajasthan')",
      finding: "Google: 'gas relief sachet' in Rajasthan +18% vs 4W ago. 'eno' search flat. 'gas-o-fast' search +42%. Meta: Gas-O-Fast running 14 active ad sets in Rajasthani language since Jan 18 — 3x their normal post frequency.",
      inference: "Demand for the category is rising in Rajasthan, but Gas-O-Fast is capturing the incremental search. Their regional-language campaign is successfully redirecting purchase intent.",
      nextAgent: "Field Intelligence Agent",
    },
    {
      agent: "Field Intelligence Agent",
      icon: "◆",
      action: "Pulling distributor-level primary sales to identify geographic hotspots",
      source: "DMS (Bizom) — Rajasthan Distributors",
      query: "SELECT distributor_name, city, eno_primary_sales_4w, eno_primary_sales_prev_4w, pct_change FROM dms_primary_sales WHERE state='Rajasthan' AND brand='Eno' ORDER BY pct_change ASC LIMIT 10",
      finding: "Jaipur distributor: −28% (₹4.2L → ₹3.0L). Jodhpur distributor: −22% (₹2.8L → ₹2.2L). Udaipur: −8%. Kota: −3%. Drop concentrated in Jaipur-Jodhpur corridor.",
      inference: "The decline is geographically concentrated — matches the targeting of Gas-O-Fast's Rajasthani-language campaign which is heavy in urban Rajasthan.",
      nextAgent: "Synthesis",
    },
    {
      agent: "Synthesis",
      icon: "✦",
      action: "Triangulating findings across 3 agents",
      finding: null,
      inference: "Confidence: HIGH. Three independent signals converge — Nielsen confirms share loss to Gas-O-Fast specifically, Google Trends confirms demand exists but is being redirected, and DMS data shows the geographic concentration matches the campaign's targeting. This is a competitive attack, not a demand problem. Counter-action should be geographically targeted to Jaipur-Jodhpur.",
    },
  ],
  2: [ // Crocin Dolo 650
    {
      agent: "Orchestrator",
      icon: "◈",
      action: "Flagged: Crocin pharmacy velocity drop in UP West exceeding normal variance threshold (−18% in 2W)",
      routing: "Dispatching to Field Intelligence Agent and Market Share Agent",
      nextAgent: "Field Intelligence Agent",
    },
    {
      agent: "Field Intelligence Agent",
      icon: "◆",
      action: "Pulling ASM field reports and chemist-level data",
      source: "SFA System (FieldAssist) — ASM Reports, UP West",
      query: "SELECT asm_name, report_date, issue_type, competitor_brand, details FROM asm_field_reports WHERE state='UP West' AND issue_type='competitive_activity' AND date >= DATE_SUB(NOW(), INTERVAL 14 DAY)",
      finding: "3 ASMs (Lucknow, Kanpur, Allahabad) independently reported: Micro Labs offering 22% retail margin on Dolo 650 vs Crocin's 16%. Scheme appears targeted at top-prescribing chemists.",
      inference: "This is not organic share shift — it's a deliberate margin scheme targeting pharmacy channel. The 6pp margin gap is significant enough to flip chemist recommendations.",
      nextAgent: "Distribution Agent",
    },
    {
      agent: "Distribution Agent",
      icon: "▣",
      action: "Analyzing pharmacy channel velocity and chemist switching patterns",
      source: "DMS — Pharmacy Channel Split, UP West",
      query: "SELECT chemist_name, city, crocin_weekly_units_current, crocin_weekly_units_4w_ago, dolo_stocking_status FROM pharmacy_outlet_data WHERE state='UP_West' AND segment='top_40' ORDER BY crocin_change_pct ASC",
      finding: "14 of top-40 Lucknow chemists show Crocin velocity drop >30%. All 14 now stock Dolo 650 prominently. Remaining 26 chemists: Crocin velocity stable (−2%). Pattern clear — it's a chemist-by-chemist flip.",
      inference: "The margin scheme is converting chemists one by one. Currently concentrated in Lucknow. If unchecked, expect spread to Kanpur and Agra within 2-3 weeks based on Micro Labs' typical rollout pattern.",
      nextAgent: "Digital Signals Agent",
    },
    {
      agent: "Digital Signals Agent",
      icon: "◉",
      action: "Checking if consumer demand is also shifting or if this is purely trade-driven",
      source: "Google Trends API",
      query: "google_trends(keywords=['crocin','dolo 650','paracetamol'], geo='IN-UP', timeframe='8w')",
      finding: "Consumer search for 'paracetamol' and 'crocin' in UP: stable. 'dolo 650' search: +8% but minor. No viral social content or consumer-facing campaign detected.",
      inference: "This is a trade-level play, not a consumer pull shift. Consumer preference hasn't changed — chemists are being financially incentivized to switch recommendation. This makes it recoverable with the right trade response.",
      nextAgent: "Synthesis",
    },
    {
      agent: "Synthesis",
      icon: "✦",
      action: "Combining field, distribution, and demand signal data",
      finding: null,
      inference: "Confidence: HIGH. Root cause identified as Micro Labs margin scheme (22% vs 16%), not consumer preference shift. Impact is trade-driven and geographically contained to Lucknow currently. Two response options: match margin (expensive, sets precedent) or shift to Crocin Advance positioning (higher-margin SKU that can absorb better trade terms). Time-sensitive — scheme likely to expand.",
    },
  ],
  3: [ // Sensodyne ₹20 reorder
    {
      agent: "Orchestrator",
      icon: "◈",
      action: "Positive signal detected: Sensodyne ₹20 pack reorder rate in Agra 2.5x above territory average",
      routing: "Investigating success drivers via Distribution Agent and Digital Signals Agent",
      nextAgent: "Distribution Agent",
    },
    {
      agent: "Distribution Agent",
      icon: "▣",
      action: "Analyzing outlet-level reorder patterns and channel mix differences",
      source: "DMS — Outlet-level Reorder Data, Sensodyne ₹20",
      query: "SELECT district, channel_type, outlets_activated, outlets_reordered, reorder_rate, avg_monthly_units FROM sensodyne_20_activation WHERE territory='UP_East' GROUP BY district, channel_type ORDER BY reorder_rate DESC",
      finding: "Agra: 85% reorder rate. Pharmacy outlets: 92% reorder. GT outlets: 28% reorder. Meerut (GT-led): 26%. Aligarh (GT-led): 31%. Varanasi (mixed): 48%.",
      inference: "Channel mix is the primary driver, not geography. Pharmacy-led activation produces 3x the reorder rate of GT-led. Agra's outperformance is a channel strategy win, not a demand anomaly.",
      nextAgent: "Digital Signals Agent",
    },
    {
      agent: "Digital Signals Agent",
      icon: "◉",
      action: "Checking if underlying demand differs across these districts",
      source: "Google Trends API",
      query: "google_trends(keywords=['sensitivity toothpaste','sensodyne'], geo='IN-UP', resolution='city', timeframe='8w')",
      finding: "Agra: search interest 140 (index). State avg: 100. Meerut: 95. Aligarh: 88. Demand signal in Agra is genuinely above average, but not 2.5x above — channel execution is the multiplier.",
      inference: "Agra has slightly higher organic demand (1.4x), but the 2.5x reorder outperformance is primarily execution-driven. The pharmacy channel creates a natural recommendation loop (pharmacist → consumer → repeat) that GT lacks.",
      nextAgent: "Synthesis",
    },
    {
      agent: "Synthesis",
      icon: "✦",
      action: "Identifying replicable success pattern",
      finding: null,
      inference: "Confidence: HIGH. Agra's ₹20 pack success is primarily channel-driven (pharmacy 92% reorder vs GT 28%), amplified by above-average local demand. This is a replicable playbook: pharmacy-first activation + pharmacist education. Adjacent districts (Mathura, Firozabad, Etah) have similar demand signals but are currently GT-led — switching to pharmacy-first should yield 2-2.5x reorder improvement.",
    },
  ],
  4: [ // Monsoon stocking
    {
      agent: "Orchestrator",
      icon: "◈",
      action: "Seasonal trigger: IMD extended forecast indicates early monsoon. Checking inventory readiness.",
      routing: "Dispatching to Demand Forecasting Agent and Distribution Agent",
      nextAgent: "Demand Forecasting Agent",
    },
    {
      agent: "Demand Forecasting Agent",
      icon: "◇",
      action: "Correlating historical monsoon onset timing with category demand spikes",
      source: "IMD Extended Range Forecast + Historical Sales DB",
      query: "SELECT year, monsoon_onset_date, monsoon_onset_deviation_days, crocin_sales_week2_spike_pct, otrivin_sales_week2_spike_pct FROM monsoon_impact_history WHERE zone='Central' AND year IN (2023, 2024, 2025)",
      finding: "2024: onset 6 days early → 28% Crocin spike W2. 2023: onset 8 days early → 35% spike. 2025: onset on time → 12% normal seasonal lift. IMD current forecast: onset Jun 18-22 vs normal Jun 28-30 (8-10 days early).",
      inference: "Pattern is consistent: early monsoon by 6-10 days triggers 25-35% demand spike in cold/flu category starting week 2 of onset. Current forecast matches the high-impact pattern.",
      nextAgent: "Distribution Agent",
    },
    {
      agent: "Distribution Agent",
      icon: "▣",
      action: "Assessing current inventory cover against projected demand",
      source: "DMS — Distributor Inventory, MP",
      query: "SELECT distributor_name, city, crocin_advance_stock_units, daily_run_rate, days_of_cover, otrivin_stock_units, otrivin_days_cover FROM distributor_inventory WHERE state='MP' AND product IN ('Crocin Advance','Otrivin')",
      finding: "8 MP distributors avg 12 days Crocin cover at current run-rate. At spike run-rate (1.3x): only 9 days cover. 4 distributors (Bhopal, Indore, Jabalpur, Gwalior) below 10 days even at normal rate. Replenishment cycle: 5-7 days from regional warehouse.",
      inference: "If spike hits as forecast, 4 of 8 distributors will stock out before replenishment arrives. Even the others will be cutting it close. Pre-emptive top-up orders need to be placed by Wednesday to be in position.",
      nextAgent: "Synthesis",
    },
    {
      agent: "Synthesis",
      icon: "✦",
      action: "Combining forecast confidence with inventory gap analysis",
      finding: null,
      inference: "Confidence: MEDIUM-HIGH. IMD extended forecasts have ~70% accuracy at this range, but the downside risk of not acting (stockouts during peak demand) far outweighs the cost of over-stocking. Recommend 15% buffer stock allocation for all MP distributors, with priority to the 4 critical ones.",
    },
  ],
  5: [ // Centrum Recharge
    {
      agent: "Orchestrator",
      icon: "◈",
      action: "Launch tracking alert: Centrum Recharge e-commerce outperforming but GT activation critically behind plan",
      routing: "Dispatching to E-commerce Agent and Distribution Agent",
      nextAgent: "E-commerce Agent",
    },
    {
      agent: "E-commerce Agent",
      icon: "▲",
      action: "Pulling Amazon performance data for Centrum Recharge",
      source: "Amazon Seller Central — UP Region",
      query: "SELECT asin, product_name, daily_units_avg_7d, category_rank, avg_rating, review_count, stock_status FROM amazon_performance WHERE brand='Centrum' AND variant='Recharge' AND region='UP'",
      finding: "#3 rank in daily vitamins category. 48 units/day avg. 4.2★ (1,200+ reviews). Currently OOS in major UP pin codes for 4 days. Before OOS, was trending up 15% WoW.",
      inference: "Strong organic consumer demand. The OOS is creating a natural experiment — if pharmacy walk-ins spike during this period, it validates the offline demand hypothesis.",
      nextAgent: "Distribution Agent",
    },
    {
      agent: "Distribution Agent",
      icon: "▣",
      action: "Checking offline distribution activation status",
      source: "DMS — Distributor Order Data, Centrum Recharge",
      query: "SELECT distributor_name, territory, centrum_recharge_ordered, first_order_date, total_quantity, outlet_activations FROM distributor_orders WHERE product='Centrum Recharge 10' AND territory IN ('UP_East','UP_West')",
      finding: "6 of 42 distributors have ordered (14%). Total outlet activations: 340 (8% of plan vs 25% target). Activated outlets skewed 70% GT, 30% pharmacy — inverse of where VMS sells best.",
      inference: "Distribution is critically behind, and the channel mix of activations is wrong. VMS category indexes heavily to pharmacy — the 70/30 GT-pharmacy split should be reversed.",
      nextAgent: "Synthesis",
    },
    {
      agent: "Synthesis",
      icon: "✦",
      action: "Contrasting e-commerce pull with offline push gap",
      finding: null,
      inference: "Confidence: HIGH. Consumer demand is validated (Amazon #3 rank, 4.2★, 1,200+ reviews). The bottleneck is entirely on distribution activation — only 14% of distributors engaged, wrong channel mix. The current Amazon OOS is a 48-72 hour window to redirect consumers to pharmacy. Immediate priority: stock top chemists and use Amazon performance data as the proof point in distributor conversations.",
    },
  ],
  6: [ // Otrivin pollution
    {
      agent: "Orchestrator",
      icon: "◈",
      action: "Environmental signal: Delhi NCR AQI anomaly extending respiratory demand beyond normal season",
      routing: "Dispatching to Environmental Data Agent and Market Share Agent",
      nextAgent: "Environmental Data Agent",
    },
    {
      agent: "Environmental Data Agent",
      icon: "◇",
      action: "Pulling AQI data and forecast",
      source: "CPCB Delhi + Google Trends",
      query: "cpcb_aqi(city='Delhi', timeframe='30d') | google_trends(keywords=['nasal congestion relief','nasal spray'], geo='IN-DL', timeframe='8w')",
      finding: "AQI >250 for 18 consecutive days (normal pattern: drops below 200 by late January). Google 'nasal congestion relief' in Delhi: +45% above seasonal norm.",
      inference: "This is an environmental tailwind — pollution-driven respiratory demand extending 3-4 weeks beyond normal season. Otrivin is a direct beneficiary.",
      nextAgent: "Market Share Agent",
    },
    {
      agent: "Market Share Agent",
      icon: "▣",
      action: "Checking if Otrivin is capturing the incremental demand",
      source: "DMS — Delhi NCR Primary Sales",
      query: "SELECT product, weekly_primary_sales, target, achievement_pct FROM primary_sales WHERE territory='Delhi_NCR' AND brand='Otrivin' AND date >= DATE_SUB(NOW(), INTERVAL 4 WEEK)",
      finding: "Otrivin tracking 112% of target. Weekly primary trending up: ₹32L → ₹56L over 8 weeks. Otrivin Nasal Mist (premium SKU) growing fastest at +22% WoW.",
      inference: "Otrivin is capturing the demand well. The premium SKU is outperforming — pollution-conscious Delhi consumers are trading up. Opportunity to ride this further with incremental digital spend while conditions persist.",
      nextAgent: "Synthesis",
    },
    {
      agent: "Synthesis",
      icon: "✦",
      action: "Assessing duration and action window",
      finding: null,
      inference: "Confidence: MEDIUM. AQI forecast suggests 2 more weeks of elevated levels but weather patterns are inherently uncertain. The ROI on incremental action is asymmetric — if AQI stays high, digital spend will have unusually high returns. If it drops, downside is limited. Recommend maintaining full range availability and requesting incremental A&P.",
    },
  ],
  7: [ // Iodex Moov
    {
      agent: "Orchestrator",
      icon: "◈",
      action: "Performance alert: Iodex primary at 62% of target in MP. Investigating competitive and distribution factors.",
      routing: "Dispatching to Market Share Agent, Field Intelligence Agent, and Distribution Agent",
      nextAgent: "Market Share Agent",
    },
    {
      agent: "Market Share Agent",
      icon: "▣",
      action: "Pulling Nielsen topical pain category data for Central zone",
      source: "Nielsen IQ — Central Zone",
      query: "SELECT brand, value_share, share_change_pp, numeric_distribution, weighted_distribution FROM nielsen_share WHERE category='Topical_Pain' AND zone='Central' AND period='Dec-25'",
      finding: "Moov: +2.8pp share gain (22.1% → 24.9%). Iodex: −1.9pp (28.3% → 26.4%). Volini: stable. Iodex numeric distribution rural MP: 38% → 31% (−7pp).",
      inference: "Moov is gaining both share and distribution simultaneously. The distribution drop is feeding the share loss — fewer outlets stocking Iodex means fewer consumer touchpoints.",
      nextAgent: "Field Intelligence Agent",
    },
    {
      agent: "Field Intelligence Agent",
      icon: "◆",
      action: "Investigating Moov's rural distribution mechanism",
      source: "SFA System — Field Reports, MP Rural",
      query: "SELECT asm_name, report_date, competitor_activity_type, details, location FROM asm_field_reports WHERE state='MP' AND competitor='Reckitt_Moov' AND date >= DATE_SUB(NOW(), INTERVAL 30 DAY)",
      finding: "6 additional Reckitt sales vans spotted in MP rural haats (Sagar, Rewa, Satna, Chhindwara). Vans carry Moov + sampling kits. Operating on weekly haat schedule — hitting the same markets our sub-stockists cover but with direct van selling + trial packs.",
      inference: "Reckitt is investing in direct rural coverage that our sub-stockist model can't match in frequency or trial generation. This is a structural distribution advantage, not a one-time scheme.",
      nextAgent: "Synthesis",
    },
    {
      agent: "Synthesis",
      icon: "✦",
      action: "Assessing structural vs tactical nature of competitive threat",
      finding: null,
      inference: "Confidence: HIGH. This is a structural competitive move, not a temporary scheme. Moov is building rural distribution infrastructure (vans) that Haleon doesn't have. Short-term: push Iodex through existing sub-stockist network in priority towns. Medium-term: needs zone-level discussion about rural coverage investment. The 7pp distribution drop in one Nielsen period is alarming velocity.",
    },
  ],
  8: [ // Colgate Sensitive
    {
      agent: "Orchestrator",
      icon: "◈",
      action: "Competitive signal: Colgate Sensitive Pro-Relief digital spend anomaly detected in North India",
      routing: "Dispatching to Digital Signals Agent and Field Intelligence Agent",
      nextAgent: "Digital Signals Agent",
    },
    {
      agent: "Digital Signals Agent",
      icon: "◉",
      action: "Analyzing Meta Ad Library and messaging strategy",
      source: "Meta Ad Library + YouTube Ad Tracking",
      query: "meta_ad_library(advertiser='Colgate India', product='Sensitive Pro-Relief', region='Hindi Belt', timeframe='6w') | youtube_ads(brand='Colgate', targeting='Hindi')",
      finding: "14 → 42 active ad sets (+3x) since mid-January. Key messaging shift: 'Recommended by dentists' — directly targeting Sensodyne's professional endorsement positioning. Estimated spend: ₹3-4Cr monthly (up from ₹1Cr baseline).",
      inference: "This is a deliberate strategic assault on Sensodyne's dentist-recommendation moat. The spend level suggests a sustained campaign, not a one-off burst.",
      nextAgent: "Field Intelligence Agent",
    },
    {
      agent: "Field Intelligence Agent",
      icon: "◆",
      action: "Checking Haleon's own medical rep coverage to assess vulnerability",
      source: "Medical Rep Activity System",
      query: "SELECT territory, target_dentist_calls, actual_dentist_calls, coverage_pct FROM med_rep_activity WHERE month='Jan-26' AND territory IN ('UP_East','UP_West','Rajasthan','Delhi_NCR')",
      finding: "UP East: 48% of target. UP West: 55%. Rajasthan: 62%. Delhi NCR: 71%. Overall: 55% of planned dentist coverage achieved in Jan.",
      inference: "Medical rep coverage is underperforming exactly where Colgate is increasing digital pressure on the dentist recommendation claim. If dentists aren't hearing from Sensodyne reps, the Colgate digital message has an open field.",
      nextAgent: "Synthesis",
    },
    {
      agent: "Synthesis",
      icon: "✦",
      action: "Assessing competitive threat severity and response timeline",
      finding: null,
      inference: "Confidence: MEDIUM. Early warning — no share impact visible yet but the risk is real. Colgate's 3x spend increase + dentist-targeting messaging is a direct challenge to Sensodyne's core positioning. Haleon's own med rep coverage is weak at 55%. Immediate action: increase dentist call frequency in UP. Flag to marketing for competitive response assessment. Timeline: if Colgate sustains this for 8+ weeks, expect share impact in next Nielsen read.",
    },
  ],
  9: [ // Centrum distribution gap
    {
      agent: "Orchestrator",
      icon: "◈",
      action: "Persistent gap detected: Centrum pharmacy coverage in Rajasthan at 15% vs 35% national for 3 consecutive periods",
      routing: "Dispatching to Market Share Agent and Distribution Agent",
      nextAgent: "Market Share Agent",
    },
    {
      agent: "Market Share Agent",
      icon: "▣",
      action: "Checking if the distribution gap matters — is VMS category growing in Rajasthan?",
      source: "Nielsen IQ — Rajasthan VMS Category",
      query: "SELECT category, state, growth_rate, national_growth_rate, competitor_brands, competitor_numeric_dist FROM nielsen_category WHERE category='VMS' AND state='Rajasthan'",
      finding: "VMS category Rajasthan: +12% growth (above national +9%). Himalaya Ashvagandha: 28% numeric dist. HealthKart products: 8%. Centrum: 15%. Market is growing and competitors are better distributed.",
      inference: "The gap is a genuine missed opportunity — the market is growing faster than national and competitors have 2x the distribution. Every month of inaction is lost share in a growing category.",
      nextAgent: "Distribution Agent",
    },
    {
      agent: "Distribution Agent",
      icon: "▣",
      action: "Identifying the most efficient activation path",
      source: "DMS — Cross-brand Outlet Overlap Analysis",
      query: "SELECT outlet_id, outlet_type, stocks_sensodyne, stocks_eno, stocks_centrum, city FROM outlet_master WHERE state='Rajasthan' AND (stocks_sensodyne=1 OR stocks_eno=1) AND stocks_centrum=0 AND outlet_type='pharmacy'",
      finding: "1,840 Rajasthan pharmacy outlets stock Sensodyne or Eno but not Centrum. 620 of these are in towns where Sensodyne ₹20 pack is already active — existing relationship with pharmacist.",
      inference: "The most efficient path is to piggyback Centrum activation on existing Sensodyne/Eno pharmacy visits. 620 outlets with warm pharmacist relationships are the immediate target.",
      nextAgent: "Synthesis",
    },
    {
      agent: "Synthesis",
      icon: "✦",
      action: "Quantifying the opportunity and recommending execution path",
      finding: null,
      inference: "Confidence: HIGH. 1,840 pharmacies already in network but not stocking Centrum. Start with the 620 where Sensodyne ₹20 is active — pharmacist relationship is warm, and Centrum Recharge ₹10 is an easy add-on sell. Pair with Sensodyne pharmacy visits to minimize incremental cost. If 60% convert, that's ~370 new Centrum outlets — moving distribution from 15% to ~19% in one push.",
    },
  ],
  10: [ // Multivitamin search
    {
      agent: "Orchestrator",
      icon: "◈",
      action: "Demand signal detected: 'multivitamin' search trending +28% YoY in UP Tier 3",
      routing: "Dispatching to Digital Signals Agent and Distribution Agent",
      nextAgent: "Digital Signals Agent",
    },
    {
      agent: "Digital Signals Agent",
      icon: "◉",
      action: "Validating search trend and understanding the demand profile",
      source: "Google Trends API — UP Tier 3 Towns",
      query: "google_trends(keywords=['multivitamin','daily vitamin tablet','centrum','vitamin tablet price'], geo='IN-UP', resolution='city_tier_3', timeframe='12m')",
      finding: "+28% YoY with acceleration last 4 weeks. 'vitamin tablet price' also trending — price sensitivity high. Peak search: Sunday mornings (health-conscious browsing).",
      inference: "Post-COVID health consciousness is driving genuine demand in Tier 3. The 'price' keyword co-trending confirms that the ₹10 Centrum Recharge price point is well-positioned for this market.",
      nextAgent: "Distribution Agent",
    },
    {
      agent: "Distribution Agent",
      icon: "▣",
      action: "Checking Centrum availability in these high-search towns",
      source: "Nielsen IQ + DMS",
      query: "SELECT town_tier, state, centrum_numeric_distribution, category_numeric_distribution FROM distribution_data WHERE state='UP' AND town_tier=3 AND category='VMS'",
      finding: "Centrum numeric distribution in UP Tier 3: 9%. Category average: 14%. Himalaya: 18%. The demand signal is 28% above average, but distribution is 36% below category average.",
      inference: "Massive demand-supply mismatch. Consumers are searching for multivitamins but can't find Centrum in their local stores. This is the clearest case for distribution-led growth in the portfolio.",
      nextAgent: "Synthesis",
    },
    {
      agent: "Synthesis",
      icon: "✦",
      action: "Quantifying demand-distribution gap",
      finding: null,
      inference: "Confidence: HIGH. Clear signal: search demand 28% above average, distribution 36% below category average. The existing Eno/Crocin distribution network already reaches these towns — Centrum Recharge ₹10 can ride the same pipes. No incremental distribution infrastructure needed, just SKU addition at existing outlets.",
    },
  ],
  11: [ // Clinical White
    {
      agent: "Orchestrator",
      icon: "◈",
      action: "Positive signal: Sensodyne Clinical White 40% above activation target in Delhi NCR premium outlets",
      routing: "Dispatching to E-commerce Agent and Distribution Agent to validate and scope expansion",
      nextAgent: "E-commerce Agent",
    },
    {
      agent: "E-commerce Agent",
      icon: "▲",
      action: "Checking online sentiment and competitive positioning",
      source: "Amazon Reviews API",
      query: "SELECT avg_rating, review_count, top_positive_themes, top_negative_themes, price_vs_category_avg FROM amazon_reviews WHERE product='Sensodyne Clinical White' AND marketplace='IN'",
      finding: "4.5★ avg (182 reviews). Top praise: 'visible whitening in 2 weeks', 'doesn't cause sensitivity like other whitening pastes'. Price ₹280 — 1.8x category average but no price complaints in reviews. Net positive vs Colgate Visible White.",
      inference: "Product-market fit is strong in the premium segment. Consumers see it as differentiated — combining sensitivity + whitening in a way competitors don't. Price is not a barrier for this audience.",
      nextAgent: "Distribution Agent",
    },
    {
      agent: "Distribution Agent",
      icon: "▣",
      action: "Analyzing outlet-type performance to identify expansion targets",
      source: "DMS — SKU-level Performance, Delhi NCR",
      query: "SELECT outlet_type, outlet_tier, units_sold, revenue, activation_target, achievement_pct FROM sku_performance WHERE product='Clinical White' AND territory='Delhi_NCR' GROUP BY outlet_type, outlet_tier",
      finding: "Premium pharmacy: 155% of target. Premium MT (Nature's Basket, Godrej Nature's Basket): 128%. Standard pharmacy: 82%. Standard GT: 34%. Clear premium-channel skew.",
      inference: "Clinical White is a premium product that performs in premium outlets. Expansion should target premium pharmacy and MT in other state capitals — not broad GT distribution.",
      nextAgent: "Synthesis",
    },
    {
      agent: "Synthesis",
      icon: "✦",
      action: "Defining expansion strategy based on Delhi success profile",
      finding: null,
      inference: "Confidence: HIGH. Clinical White is a premium play that works in premium channels. Delhi data gives a clear activation profile: premium pharmacy + premium MT. Expansion should target Jaipur, Lucknow state capital premium outlets first. Key selling point for distributor pitches: ₹280 ASP = highest revenue per unit in the Sensodyne range. Prioritize outlets that already have strong ₹100+ Sensodyne base — these consumers are the upgrade target.",
    },
  ],
};

// ═══════════════════════════════════════════════════════
// DATA (cards, geographies, etc.)
// ═══════════════════════════════════════════════════════

const criticalItems = [
  { id: 1, severity: "critical", headline: "Eno losing ground in Rajasthan — Gas-O-Fast regional campaign redirecting demand", detail: "Gas-O-Fast launched a Rajasthani-language Instagram campaign on Jan 18 with 3x their normal post frequency. Google search for 'gas relief sachet' in Rajasthan is up 18%, confirming demand is present but being redirected.", category: "Eno" },
  { id: 2, severity: "critical", headline: "Crocin chemist margins being undercut by Dolo 650 in Lucknow-Kanpur belt", detail: "Field reports from 3 ASMs confirm Micro Labs offering 22% retail margin on Dolo 650 vs Crocin's standard 16%. Weekly run-rate in UP West pharmacy channel dropped 18% in 2 weeks.", category: "Crocin" },
  { id: 3, severity: "high", headline: "Sensodyne ₹20 pack reorder rate in Agra at 85% — 2.5x territory average", detail: "Pharmacy-led activation is the key differentiator — 92% reorder in chemists vs 34% in general trade. Replicate pharmacy-first approach in adjacent districts.", category: "Sensodyne" },
  { id: 4, severity: "high", headline: "IMD forecasts monsoon 8 days early — pre-load Crocin and Otrivin at key distributors", detail: "Current distributor inventory for Crocin Advance shows only 12 days cover at normal run-rate for 8 of 15 key distributors. Early monsoon historically triggers 25-35% spike.", category: "Crocin" },
  { id: 5, severity: "medium", headline: "Centrum Recharge OOS on Amazon in UP — pharmacy redirect opportunity", detail: "OOS for 4 days across major UP pin codes. Historical pattern: Amazon OOS drives 15-20% uplift in pharmacy walk-in queries.", category: "Centrum" },
];

const insightCards = [
  { id: 1, type: "Competitive Alert", priority: "critical", headline: "Gas-O-Fast campaign redirecting antacid demand in Rajasthan", narrative: "Gas-O-Fast has been running a Rajasthani-language social campaign since Jan 18 — post frequency 3x normal. Nielsen share down 1.2pp for Eno in West zone. Google search for 'gas relief' in Rajasthan up 18% — demand exists but being captured by competition.", action: "Brief Jaipur and Jodhpur ASMs to counter-detail top 50 chemists. Request HO for ₹1-off trade scheme on Eno sachets for Rajasthan for 4 weeks.", geography: "Rajasthan", category: "Eno", trend: [42,44,41,38,35,33,30,28], trendLabel: "Eno weekly primary (₹L)", trendDown: true, canDeepDive: true, canScenario: false },
  { id: 2, type: "Competitive Alert", priority: "critical", headline: "Dolo 650 offering higher chemist margins in Lucknow-Kanpur", narrative: "Micro Labs running targeted margin scheme — 22% retail margin vs Crocin's 16%. 14 of top-40 Lucknow chemists shifted recommendation. Crocin pharmacy velocity down 18% in 2 weeks while category search is stable.", action: "Escalate margin gap to trade marketing. Push Crocin Advance positioning. Schedule joint ASM visits to top 20 lost chemists.", geography: "UP West", category: "Crocin", trend: [68,72,70,65,58,52,48,44], trendLabel: "Crocin pharmacy velocity", trendDown: true, canDeepDive: true, canScenario: true },
  { id: 3, type: "Distribution Opportunity", priority: "high", headline: "Sensodyne ₹20 reorder in Agra outperforming by 2.5x — pharmacy-first is the driver", narrative: "Agra: 85% reorder rate. Pharmacy outlets: 92%. GT outlets: 28%. Districts with GT-led activation (Meerut, Aligarh): only 28%. Google search 40% above state average confirms demand pull.", action: "Shift activation in Mathura, Firozabad, Etah to pharmacy-first. Target 200 chemist outlets per district.", geography: "UP East", category: "Sensodyne", trend: [12,18,28,42,58,68,78,85], trendLabel: "Reorder rate %", trendDown: false, canDeepDive: true, canScenario: true },
  { id: 4, type: "Seasonal Prep", priority: "high", headline: "Pre-monsoon stocking: distributor cover critically thin in MP", narrative: "IMD: early monsoon Jun 18-22 vs normal Jun 28-30. Historical: 25-35% spike in week 2. Crocin Advance stock at MP distributors avg 12 days. 4 of 8 would stock out before replenishment.", action: "Place pre-emptive top-up orders with Bhopal, Indore, Jabalpur, Gwalior distributors by Wednesday. Request 15% buffer stock.", geography: "Madhya Pradesh", category: "Crocin", trend: [18,17,16,15,14,13,12,11], trendLabel: "Days of stock cover", trendDown: true, canDeepDive: false, canScenario: true },
  { id: 5, type: "Launch Tracking", priority: "high", headline: "Centrum Recharge: strong e-commerce pull, weak offline conversion", narrative: "Amazon #3 in daily vitamins, 4.2★, 1,200+ reviews. But only 6 of 42 distributors ordered. GT activation 8% vs 25% plan. Channel mix wrong — 70% GT vs should be pharmacy-led.", action: "Make Centrum Recharge must-stock for all distributors. Use Amazon traction as proof point. Target 500 chemist activations.", geography: "UP East, UP West", category: "Centrum", trend: [2,5,12,18,28,35,42,48], trendLabel: "Amazon daily units", trendDown: false, canDeepDive: true, canScenario: false },
  { id: 6, type: "Demand Signal", priority: "medium", headline: "Delhi pollution extending Otrivin demand beyond normal season", narrative: "AQI >250 for 18 consecutive days past typical late-January improvement. 'Nasal congestion relief' search +45% above seasonal norm. Otrivin tracking 112% of target.", action: "Maintain full Otrivin range in Delhi NCR. Request incremental digital spend — ROI on current conditions will be unusually high.", geography: "Delhi NCR", category: "Otrivin", trend: [32,34,38,42,45,48,52,56], trendLabel: "Otrivin weekly primary (₹L)", trendDown: false, canDeepDive: false, canScenario: false },
  { id: 7, type: "Performance Risk", priority: "high", headline: "Iodex declining in MP rural — Moov gaining via van coverage", narrative: "Iodex at 62% of target in MP. Moov gained 2.8pp share in Central zone. Reckitt deployed 6 rural sales vans. Iodex numeric distribution dropped 38% → 31%.", action: "Request rural sampling initiative. Push through sub-stockist network. Priority: Sagar, Rewa, Satna.", geography: "Madhya Pradesh", category: "Iodex", trend: [28,26,25,22,20,19,17,16], trendLabel: "Iodex weekly primary (₹L)", trendDown: true, canDeepDive: true, canScenario: false },
  { id: 8, type: "Competitive Alert", priority: "medium", headline: "Colgate Sensitive tripling digital spend in North India", narrative: "Meta Ad Library: Colgate tripled Sensitive Pro-Relief ad sets in Hindi belt since mid-Jan. Messaging targeting dentist recommendations — challenging Sensodyne's core positioning. Med rep dentist coverage in UP at 55% of plan.", action: "Increase dentist call frequency in UP. Prioritize top-100 prescribing dentists. Flag to marketing.", geography: "All Territories", category: "Sensodyne", trend: [15,16,18,22,35,48,52,55], trendLabel: "Colgate ad index (est.)", trendDown: false, canDeepDive: false, canScenario: true },
  { id: 9, type: "Distribution Opportunity", priority: "medium", headline: "Centrum pharmacy coverage 15% in Rajasthan vs 35% national", narrative: "Gap persistent for 3 Nielsen periods. VMS category growing 12% in Rajasthan. Himalaya Ashvagandha at 28% coverage. 1,840 pharmacies stock Sensodyne/Eno but not Centrum.", action: "Pair Centrum push with Sensodyne pharmacy visits. Start with 620 outlets where ₹20 pack is active.", geography: "Rajasthan", category: "Centrum", trend: [12,12,13,13,14,14,15,15], trendLabel: "Numeric distribution %", trendDown: false, canDeepDive: true, canScenario: false },
  { id: 10, type: "Demand Signal", priority: "medium", headline: "Multivitamin search up 28% in UP Tier 3 — distribution far behind", narrative: "Search interest +28% YoY with acceleration. 'Vitamin tablet price' co-trending. Centrum numeric distribution in UP Tier 3: 9% vs category 14%.", action: "Fast-track Centrum Recharge ₹10 through existing Eno/Crocin distribution in Tier 3.", geography: "UP East, UP West", category: "Centrum", trend: [100,105,108,112,118,122,126,128], trendLabel: "Search interest index", trendDown: false, canDeepDive: false, canScenario: false },
  { id: 11, type: "Opportunity", priority: "medium", headline: "Clinical White 40% above plan in Delhi premium outlets", narrative: "₹280 ASP — highest in Sensodyne portfolio. Amazon 4.5★, specific praise for visible whitening. Premium pharmacy 155% of target, standard GT only 34%.", action: "Expand to Jaipur, Lucknow premium outlets. Use Delhi data in distributor pitches. Target outlets with strong ₹100+ Sensodyne base.", geography: "Delhi NCR", category: "Sensodyne", trend: [8,15,24,32,38,45,52,58], trendLabel: "Clinical White weekly units", trendDown: false, canDeepDive: true, canScenario: true },
];

const geographies = [
  { id: "delhi-ncr", name: "Delhi NCR", status: "on-track", narrative: "Strongest territory. Clinical White outperforming in premium outlets, Otrivin riding extended pollution demand. Focus: accelerate Centrum Recharge GT activation.", salesTarget: 5.5, salesActual: 5.1, salesPct: 93, weeklyData: [{w:"W48",actual:118,target:137},{w:"W49",actual:122,target:137},{w:"W50",actual:128,target:137},{w:"W51",actual:125,target:137},{w:"W52",actual:132,target:137},{w:"W1",actual:130,target:137},{w:"W2",actual:135,target:137},{w:"W3",actual:138,target:137}], weeklyUnit: "₹L",
    categories: [
      { name: "Sensodyne", pct: 101, status: "ahead", note: "Clinical White driving premium mix-up", actual: 1.82, target: 1.8, weeklyData: [{w:"W48",v:21},{w:"W49",v:22},{w:"W50",v:23},{w:"W51",v:22},{w:"W52",v:24},{w:"W1",v:23},{w:"W2",v:24},{w:"W3",v:25}], distributors: [{name:"South Delhi Pharma",pct:118,status:"ahead"},{name:"Gurgaon MedSupply",pct:105,status:"on-track"},{name:"Noida Distributors",pct:95,status:"on-track"},{name:"East Delhi Trading",pct:88,status:"on-track"}], drillSignals: ["Clinical White ₹280 ASP performing 155% in premium pharmacy", "Sensitivity toothpaste search in Delhi flat — growth is mix-up, not volume"] },
      { name: "Eno", pct: 90, status: "on-track", note: "Stable, seasonal uptick expected", actual: 1.08, target: 1.2, weeklyData: [{w:"W48",v:14},{w:"W49",v:13},{w:"W50",v:14},{w:"W51",v:13},{w:"W52",v:14},{w:"W1",v:14},{w:"W2",v:13},{w:"W3",v:14}], distributors: [{name:"South Delhi Pharma",pct:95,status:"on-track"},{name:"Gurgaon MedSupply",pct:92,status:"on-track"},{name:"Noida Distributors",pct:88,status:"on-track"},{name:"East Delhi Trading",pct:84,status:"on-track"}], drillSignals: ["Summer seasonality expected to lift from W6 onwards", "No competitive pressure in this territory for Eno"] },
      { name: "Crocin", pct: 87, status: "on-track", note: "Slight softness, monitoring", actual: 0.78, target: 0.9, weeklyData: [{w:"W48",v:12},{w:"W49",v:11},{w:"W50",v:10},{w:"W51",v:10},{w:"W52",v:10},{w:"W1",v:9},{w:"W2",v:10},{w:"W3",v:9}], distributors: [{name:"South Delhi Pharma",pct:92,status:"on-track"},{name:"Gurgaon MedSupply",pct:88,status:"on-track"},{name:"Noida Distributors",pct:85,status:"on-track"},{name:"East Delhi Trading",pct:82,status:"on-track"}], drillSignals: ["Slight softness in OTC paracetamol — seasonal, not competitive"] },
      { name: "Centrum", pct: 87, status: "watch", note: "GT activation behind plan", actual: 0.52, target: 0.6, weeklyData: [{w:"W48",v:5},{w:"W49",v:6},{w:"W50",v:6},{w:"W51",v:7},{w:"W52",v:6},{w:"W1",v:7},{w:"W2",v:7},{w:"W3",v:8}], distributors: [{name:"South Delhi Pharma",pct:105,status:"on-track"},{name:"Gurgaon MedSupply",pct:92,status:"on-track"},{name:"Noida Distributors",pct:72,status:"at-risk"},{name:"East Delhi Trading",pct:65,status:"at-risk"}], drillSignals: ["GT activation at 12% vs 25% plan in Delhi", "Amazon OOS creating redirect opportunity to pharmacy", "Noida and East Delhi distributors haven't activated Recharge SKU"] },
      { name: "Otrivin", pct: 112, status: "ahead", note: "Pollution extending demand", actual: 0.56, target: 0.5, weeklyData: [{w:"W48",v:5},{w:"W49",v:5},{w:"W50",v:6},{w:"W51",v:7},{w:"W52",v:7},{w:"W1",v:8},{w:"W2",v:8},{w:"W3",v:9}], distributors: [{name:"South Delhi Pharma",pct:125,status:"ahead"},{name:"Gurgaon MedSupply",pct:118,status:"ahead"},{name:"Noida Distributors",pct:108,status:"ahead"},{name:"East Delhi Trading",pct:98,status:"on-track"}], drillSignals: ["AQI >250 for 18 consecutive days — demand tailwind", "Nasal Mist premium SKU growing fastest at +22% WoW"] },
      { name: "Iodex", pct: 88, status: "on-track", note: "Normal seasonality", actual: 0.44, target: 0.5, weeklyData: [{w:"W48",v:6},{w:"W49",v:6},{w:"W50",v:5},{w:"W51",v:6},{w:"W52",v:5},{w:"W1",v:6},{w:"W2",v:5},{w:"W3",v:6}], distributors: [{name:"South Delhi Pharma",pct:92,status:"on-track"},{name:"Gurgaon MedSupply",pct:88,status:"on-track"},{name:"Noida Distributors",pct:85,status:"on-track"},{name:"East Delhi Trading",pct:85,status:"on-track"}], drillSignals: ["Normal winter seasonality — no action needed"] },
    ], distribution: { newOutlets: 180, reorderRate: 62, numericDist: 48 }, signals: ["Otrivin demand likely to sustain 2 more weeks per AQI forecast", "Clinical White reviews trending positive — leverage in pharmacy pitches"] },
  { id: "up-east", name: "UP East", status: "needs-attention", narrative: "Mixed. Sensodyne ₹20 pack breakthrough in Agra but other districts lagging. Centrum Recharge strong online, negligible offline.", salesTarget: 4.2, salesActual: 3.5, salesPct: 83, weeklyData: [{w:"W48",actual:96,target:105},{w:"W49",actual:98,target:105},{w:"W50",actual:95,target:105},{w:"W51",actual:92,target:105},{w:"W52",actual:88,target:105},{w:"W1",actual:86,target:105},{w:"W2",actual:84,target:105},{w:"W3",actual:82,target:105}], weeklyUnit: "₹L",
    categories: [
      { name: "Sensodyne", pct: 91, status: "watch", note: "Agra strong, Varanasi/Allahabad weak", actual: 1.0, target: 1.1, weeklyData: [{w:"W48",v:13},{w:"W49",v:14},{w:"W50",v:13},{w:"W51",v:12},{w:"W52",v:13},{w:"W1",v:12},{w:"W2",v:13},{w:"W3",v:12}], distributors: [{name:"Agra Pharma Dist",pct:124,status:"ahead"},{name:"Varanasi MedCo",pct:78,status:"watch"},{name:"Allahabad Trading",pct:72,status:"at-risk"},{name:"Gorakhpur Supply",pct:82,status:"on-track"}], drillSignals: ["₹20 pack reorder 85% in Agra (pharmacy-led) vs 34% territory avg", "Varanasi activation stalled — only 40 outlets active vs 120 target", "Allahabad distributor hasn't placed Sensodyne order in 2 weeks"] },
      { name: "Eno", pct: 86, status: "on-track", note: "Pre-summer, expected to accelerate", actual: 0.82, target: 0.95, weeklyData: [{w:"W48",v:10},{w:"W49",v:10},{w:"W50",v:11},{w:"W51",v:10},{w:"W52",v:10},{w:"W1",v:10},{w:"W2",v:11},{w:"W3",v:10}], distributors: [{name:"Agra Pharma Dist",pct:92,status:"on-track"},{name:"Varanasi MedCo",pct:85,status:"on-track"},{name:"Allahabad Trading",pct:80,status:"on-track"},{name:"Gorakhpur Supply",pct:84,status:"on-track"}], drillSignals: ["Stable — summer lift expected from W8-10"] },
      { name: "Crocin", pct: 85, status: "on-track", note: "Stable", actual: 0.72, target: 0.85, weeklyData: [{w:"W48",v:9},{w:"W49",v:10},{w:"W50",v:9},{w:"W51",v:9},{w:"W52",v:9},{w:"W1",v:9},{w:"W2",v:9},{w:"W3",v:9}], distributors: [{name:"Agra Pharma Dist",pct:88,status:"on-track"},{name:"Varanasi MedCo",pct:85,status:"on-track"},{name:"Allahabad Trading",pct:82,status:"on-track"},{name:"Gorakhpur Supply",pct:84,status:"on-track"}], drillSignals: ["No competitive pressure — Dolo scheme hasn't reached UP East yet"] },
      { name: "Centrum", pct: 56, status: "at-risk", note: "GT activation critically behind", actual: 0.28, target: 0.5, weeklyData: [{w:"W48",v:2},{w:"W49",v:3},{w:"W50",v:3},{w:"W51",v:3},{w:"W52",v:4},{w:"W1",v:4},{w:"W2",v:4},{w:"W3",v:5}], distributors: [{name:"Agra Pharma Dist",pct:82,status:"on-track"},{name:"Varanasi MedCo",pct:45,status:"at-risk"},{name:"Allahabad Trading",pct:38,status:"at-risk"},{name:"Gorakhpur Supply",pct:42,status:"at-risk"}], drillSignals: ["Only 6 of 42 distributors have ordered Centrum Recharge", "Amazon #3 in daily vitamins but GT activation at 8% vs 25% plan", "Multivitamin search in UP Tier 3 up 28% — demand exists, distribution doesn't"] },
      { name: "Otrivin", pct: 85, status: "on-track", note: "Off-season, normal", actual: 0.34, target: 0.4, weeklyData: [{w:"W48",v:5},{w:"W49",v:4},{w:"W50",v:4},{w:"W51",v:4},{w:"W52",v:4},{w:"W1",v:4},{w:"W2",v:5},{w:"W3",v:4}], distributors: [{name:"Agra Pharma Dist",pct:88,status:"on-track"},{name:"Varanasi MedCo",pct:84,status:"on-track"},{name:"Allahabad Trading",pct:82,status:"on-track"},{name:"Gorakhpur Supply",pct:85,status:"on-track"}], drillSignals: ["Off-season — no action needed"] },
      { name: "Iodex", pct: 85, status: "on-track", note: "Holding steady", actual: 0.34, target: 0.4, weeklyData: [{w:"W48",v:5},{w:"W49",v:4},{w:"W50",v:4},{w:"W51",v:5},{w:"W52",v:4},{w:"W1",v:4},{w:"W2",v:4},{w:"W3",v:4}], distributors: [{name:"Agra Pharma Dist",pct:88,status:"on-track"},{name:"Varanasi MedCo",pct:84,status:"on-track"},{name:"Allahabad Trading",pct:82,status:"on-track"},{name:"Gorakhpur Supply",pct:85,status:"on-track"}], drillSignals: ["Stable — no competitive pressure in UP East"] },
    ], distribution: { newOutlets: 320, reorderRate: 41, numericDist: 32 }, signals: ["₹20 Agra playbook ready for replication", "Centrum Recharge OOS creating pharmacy opportunity"] },
  { id: "up-west", name: "UP West", status: "at-risk", narrative: "Under pressure. Crocin facing Dolo 650 margin competition. Eno repeat rate declining. Needs immediate trade intervention.", salesTarget: 3.8, salesActual: 2.9, salesPct: 76, weeklyData: [{w:"W48",actual:102,target:95},{w:"W49",actual:98,target:95},{w:"W50",actual:94,target:95},{w:"W51",actual:88,target:95},{w:"W52",actual:82,target:95},{w:"W1",actual:78,target:95},{w:"W2",actual:75,target:95},{w:"W3",actual:72,target:95}], weeklyUnit: "₹L",
    categories: [
      { name: "Sensodyne", pct: 88, status: "on-track", note: "Stable", actual: 0.88, target: 1.0, weeklyData: [{w:"W48",v:12},{w:"W49",v:11},{w:"W50",v:11},{w:"W51",v:11},{w:"W52",v:11},{w:"W1",v:11},{w:"W2",v:11},{w:"W3",v:11}], distributors: [{name:"Lucknow MedDist",pct:92,status:"on-track"},{name:"Kanpur PharmaCo",pct:88,status:"on-track"},{name:"Agra City Supply",pct:85,status:"on-track"},{name:"Aligarh Trading",pct:82,status:"on-track"}], drillSignals: ["Stable performance — no immediate concern", "Medical rep dentist coverage at 55% of plan — vulnerability if Colgate presses"] },
      { name: "Eno", pct: 73, status: "at-risk", note: "Repeat rate declining to 54%", actual: 0.62, target: 0.85, weeklyData: [{w:"W48",v:9},{w:"W49",v:9},{w:"W50",v:8},{w:"W51",v:8},{w:"W52",v:8},{w:"W1",v:7},{w:"W2",v:7},{w:"W3",v:7}], distributors: [{name:"Lucknow MedDist",pct:78,status:"watch"},{name:"Kanpur PharmaCo",pct:72,status:"at-risk"},{name:"Agra City Supply",pct:70,status:"at-risk"},{name:"Aligarh Trading",pct:68,status:"at-risk"}], drillSignals: ["Trial rate healthy (+5%) but repeat dropping 68% → 54% over 3 months", "Gas-O-Fast 'longer lasting relief' claim may be shifting post-trial preference", "Monitor 1 more month — if <50% repeat, escalate to consumer research"] },
      { name: "Crocin", pct: 64, status: "at-risk", note: "Dolo 650 margin scheme impact", actual: 0.48, target: 0.75, weeklyData: [{w:"W48",v:10},{w:"W49",v:10},{w:"W50",v:9},{w:"W51",v:8},{w:"W52",v:7},{w:"W1",v:6},{w:"W2",v:5},{w:"W3",v:5}], distributors: [{name:"Lucknow MedDist",pct:55,status:"at-risk"},{name:"Kanpur PharmaCo",pct:58,status:"at-risk"},{name:"Agra City Supply",pct:78,status:"watch"},{name:"Aligarh Trading",pct:75,status:"watch"}], drillSignals: ["14 of top-40 Lucknow chemists shifted to Dolo 650 recommendation", "Micro Labs offering 22% margin vs Crocin's 16% — 6pp gap", "Consumer search stable — this is trade-driven, not consumer preference", "Scheme likely to expand to Agra-Aligarh in 2-3 weeks"] },
      { name: "Centrum", pct: 67, status: "at-risk", note: "Distribution gaps", actual: 0.3, target: 0.45, weeklyData: [{w:"W48",v:3},{w:"W49",v:3},{w:"W50",v:4},{w:"W51",v:4},{w:"W52",v:4},{w:"W1",v:4},{w:"W2",v:4},{w:"W3",v:4}], distributors: [{name:"Lucknow MedDist",pct:72,status:"at-risk"},{name:"Kanpur PharmaCo",pct:65,status:"at-risk"},{name:"Agra City Supply",pct:62,status:"at-risk"},{name:"Aligarh Trading",pct:58,status:"at-risk"}], drillSignals: ["Activation behind plan across all distributors", "Recharge ₹10 pack not yet listed at 3 of 4 distributors"] },
      { name: "Otrivin", pct: 86, status: "on-track", note: "Off-season, tracking ok", actual: 0.3, target: 0.35, weeklyData: [{w:"W48",v:4},{w:"W49",v:4},{w:"W50",v:4},{w:"W51",v:4},{w:"W52",v:4},{w:"W1",v:4},{w:"W2",v:4},{w:"W3",v:4}], distributors: [{name:"Lucknow MedDist",pct:88,status:"on-track"},{name:"Kanpur PharmaCo",pct:85,status:"on-track"},{name:"Agra City Supply",pct:85,status:"on-track"},{name:"Aligarh Trading",pct:82,status:"on-track"}], drillSignals: ["Off-season — stable"] },
      { name: "Iodex", pct: 80, status: "watch", note: "Slight softness", actual: 0.32, target: 0.4, weeklyData: [{w:"W48",v:5},{w:"W49",v:4},{w:"W50",v:4},{w:"W51",v:4},{w:"W52",v:4},{w:"W1",v:4},{w:"W2",v:4},{w:"W3",v:4}], distributors: [{name:"Lucknow MedDist",pct:82,status:"on-track"},{name:"Kanpur PharmaCo",pct:78,status:"watch"},{name:"Agra City Supply",pct:80,status:"on-track"},{name:"Aligarh Trading",pct:78,status:"watch"}], drillSignals: ["Slight softness — monitoring but no competitive trigger identified"] },
    ], distribution: { newOutlets: 85, reorderRate: 38, numericDist: 36 }, signals: ["Dolo 650 scheme likely to expand next", "Colgate Sensitive digital spend increasing 3x"] },
  { id: "rajasthan", name: "Rajasthan", status: "needs-attention", narrative: "Split. Sensodyne outperforming via ₹20 pack. Eno under Gas-O-Fast assault (−1.2pp). Centrum pharmacy gap (15% vs 35%).", salesTarget: 3.1, salesActual: 2.7, salesPct: 87, weeklyData: [{w:"W48",actual:88,target:78},{w:"W49",actual:90,target:78},{w:"W50",actual:92,target:78},{w:"W51",actual:90,target:78},{w:"W52",actual:88,target:78},{w:"W1",actual:86,target:78},{w:"W2",actual:85,target:78},{w:"W3",actual:84,target:78}], weeklyUnit: "₹L",
    categories: [
      { name: "Sensodyne", pct: 102, status: "ahead", note: "₹20 pack driving outperformance", actual: 0.92, target: 0.9, weeklyData: [{w:"W48",v:10},{w:"W49",v:11},{w:"W50",v:12},{w:"W51",v:12},{w:"W52",v:12},{w:"W1",v:12},{w:"W2",v:11},{w:"W3",v:12}], distributors: [{name:"Jaipur MedSupply",pct:115,status:"ahead"},{name:"Jodhpur Pharma",pct:108,status:"ahead"},{name:"Udaipur Dist",pct:95,status:"on-track"},{name:"Kota Trading",pct:88,status:"on-track"}], drillSignals: ["₹20 pack reorder strong across Rajasthan pharmacies", "Jaipur pharmacist endorsement driving word-of-mouth"] },
      { name: "Eno", pct: 72, status: "at-risk", note: "Gas-O-Fast campaign impact", actual: 0.52, target: 0.72, weeklyData: [{w:"W48",v:10},{w:"W49",v:9},{w:"W50",v:9},{w:"W51",v:8},{w:"W52",v:7},{w:"W1",v:7},{w:"W2",v:6},{w:"W3",v:6}], distributors: [{name:"Jaipur MedSupply",pct:65,status:"at-risk"},{name:"Jodhpur Pharma",pct:68,status:"at-risk"},{name:"Udaipur Dist",pct:82,status:"on-track"},{name:"Kota Trading",pct:88,status:"on-track"}], drillSignals: ["Nielsen: Eno −1.2pp share, Gas-O-Fast +1.7pp in West zone", "Gas-O-Fast Rajasthani-language campaign running since Jan 18", "Decline concentrated in Jaipur-Jodhpur corridor", "Google 'gas relief sachet' Rajasthan +18% — demand exists but being redirected"] },
      { name: "Crocin", pct: 88, status: "on-track", note: "Stable", actual: 0.42, target: 0.48, weeklyData: [{w:"W48",v:5},{w:"W49",v:6},{w:"W50",v:5},{w:"W51",v:5},{w:"W52",v:5},{w:"W1",v:6},{w:"W2",v:5},{w:"W3",v:5}], distributors: [{name:"Jaipur MedSupply",pct:90,status:"on-track"},{name:"Jodhpur Pharma",pct:88,status:"on-track"},{name:"Udaipur Dist",pct:85,status:"on-track"},{name:"Kota Trading",pct:88,status:"on-track"}], drillSignals: ["Stable — no competitive pressure"] },
      { name: "Centrum", pct: 80, status: "watch", note: "15% pharmacy coverage vs 35% national", actual: 0.32, target: 0.4, weeklyData: [{w:"W48",v:4},{w:"W49",v:4},{w:"W50",v:4},{w:"W51",v:4},{w:"W52",v:4},{w:"W1",v:4},{w:"W2",v:4},{w:"W3",v:4}], distributors: [{name:"Jaipur MedSupply",pct:88,status:"on-track"},{name:"Jodhpur Pharma",pct:82,status:"on-track"},{name:"Udaipur Dist",pct:72,status:"at-risk"},{name:"Kota Trading",pct:70,status:"at-risk"}], drillSignals: ["1,840 pharmacies stock Sensodyne/Eno but not Centrum", "620 have active Sensodyne ₹20 — warm relationships for Centrum push", "VMS category growing 12% in Rajasthan, above national 9%"] },
      { name: "Otrivin", pct: 87, status: "on-track", note: "Normal", actual: 0.26, target: 0.3, weeklyData: [{w:"W48",v:3},{w:"W49",v:3},{w:"W50",v:3},{w:"W51",v:3},{w:"W52",v:3},{w:"W1",v:4},{w:"W2",v:3},{w:"W3",v:3}], distributors: [{name:"Jaipur MedSupply",pct:90,status:"on-track"},{name:"Jodhpur Pharma",pct:85,status:"on-track"},{name:"Udaipur Dist",pct:85,status:"on-track"},{name:"Kota Trading",pct:88,status:"on-track"}], drillSignals: ["Normal"] },
      { name: "Iodex", pct: 87, status: "on-track", note: "Holding", actual: 0.26, target: 0.3, weeklyData: [{w:"W48",v:3},{w:"W49",v:3},{w:"W50",v:4},{w:"W51",v:3},{w:"W52",v:3},{w:"W1",v:3},{w:"W2",v:3},{w:"W3",v:3}], distributors: [{name:"Jaipur MedSupply",pct:88,status:"on-track"},{name:"Jodhpur Pharma",pct:88,status:"on-track"},{name:"Udaipur Dist",pct:85,status:"on-track"},{name:"Kota Trading",pct:85,status:"on-track"}], drillSignals: ["Holding steady"] },
    ], distribution: { newOutlets: 240, reorderRate: 52, numericDist: 38 }, signals: ["Gas-O-Fast campaign expected through Feb", "Sensodyne pharmacy success is a beachhead for Centrum"] },
  { id: "mp", name: "Madhya Pradesh", status: "at-risk", narrative: "Weakest. Iodex declining as Moov deploys rural vans. Pre-monsoon stocking critical. Immediate: Iodex rural intervention + monsoon pre-loading.", salesTarget: 2.6, salesActual: 1.8, salesPct: 69, weeklyData: [{w:"W48",actual:82,target:65},{w:"W49",actual:80,target:65},{w:"W50",actual:78,target:65},{w:"W51",actual:74,target:65},{w:"W52",actual:72,target:65},{w:"W1",actual:70,target:65},{w:"W2",actual:68,target:65},{w:"W3",actual:66,target:65}], weeklyUnit: "₹L",
    categories: [
      { name: "Sensodyne", pct: 83, status: "watch", note: "Low penetration", actual: 0.5, target: 0.6, weeklyData: [{w:"W48",v:7},{w:"W49",v:6},{w:"W50",v:6},{w:"W51",v:6},{w:"W52",v:7},{w:"W1",v:6},{w:"W2",v:6},{w:"W3",v:6}], distributors: [{name:"Bhopal Pharma",pct:88,status:"on-track"},{name:"Indore MedDist",pct:82,status:"on-track"},{name:"Jabalpur Supply",pct:78,status:"watch"},{name:"Gwalior Trading",pct:80,status:"on-track"}], drillSignals: ["Low penetration market — growth potential but needs dedicated push", "Sensitivity toothpaste awareness lower than national average"] },
      { name: "Eno", pct: 76, status: "watch", note: "Summer should improve", actual: 0.42, target: 0.55, weeklyData: [{w:"W48",v:6},{w:"W49",v:5},{w:"W50",v:5},{w:"W51",v:5},{w:"W52",v:5},{w:"W1",v:5},{w:"W2",v:5},{w:"W3",v:5}], distributors: [{name:"Bhopal Pharma",pct:80,status:"on-track"},{name:"Indore MedDist",pct:78,status:"watch"},{name:"Jabalpur Supply",pct:72,status:"at-risk"},{name:"Gwalior Trading",pct:70,status:"at-risk"}], drillSignals: ["Below plan but summer season expected to lift", "Jabalpur and Gwalior distributors underperforming — need ASM attention"] },
      { name: "Crocin", pct: 64, status: "at-risk", note: "Low stock cover pre-monsoon", actual: 0.32, target: 0.5, weeklyData: [{w:"W48",v:5},{w:"W49",v:5},{w:"W50",v:4},{w:"W51",v:4},{w:"W52",v:4},{w:"W1",v:4},{w:"W2",v:3},{w:"W3",v:3}], distributors: [{name:"Bhopal Pharma",pct:72,status:"at-risk"},{name:"Indore MedDist",pct:68,status:"at-risk"},{name:"Jabalpur Supply",pct:55,status:"at-risk"},{name:"Gwalior Trading",pct:58,status:"at-risk"}], drillSignals: ["4 of 8 distributors below 10 days stock cover", "IMD: monsoon 8-10 days early — spike expected week 2 of onset", "Replenishment cycle 5-7 days — orders must be placed by Wednesday", "Historical: early monsoon = 25-35% category spike"] },
      { name: "Centrum", pct: 53, status: "at-risk", note: "Very low distribution", actual: 0.16, target: 0.3, weeklyData: [{w:"W48",v:2},{w:"W49",v:2},{w:"W50",v:2},{w:"W51",v:2},{w:"W52",v:2},{w:"W1",v:2},{w:"W2",v:2},{w:"W3",v:2}], distributors: [{name:"Bhopal Pharma",pct:62,status:"at-risk"},{name:"Indore MedDist",pct:55,status:"at-risk"},{name:"Jabalpur Supply",pct:42,status:"at-risk"},{name:"Gwalior Trading",pct:45,status:"at-risk"}], drillSignals: ["Lowest Centrum activation in your territory", "VMS category still nascent in MP — long-term build, not quick win"] },
      { name: "Otrivin", pct: 72, status: "watch", note: "Limited market", actual: 0.18, target: 0.25, weeklyData: [{w:"W48",v:3},{w:"W49",v:2},{w:"W50",v:2},{w:"W51",v:2},{w:"W52",v:2},{w:"W1",v:2},{w:"W2",v:2},{w:"W3",v:2}], distributors: [{name:"Bhopal Pharma",pct:78,status:"watch"},{name:"Indore MedDist",pct:72,status:"at-risk"},{name:"Jabalpur Supply",pct:65,status:"at-risk"},{name:"Gwalior Trading",pct:68,status:"at-risk"}], drillSignals: ["Limited nasal spray market in MP"] },
      { name: "Iodex", pct: 55, status: "at-risk", note: "Moov gaining via vans", actual: 0.22, target: 0.4, weeklyData: [{w:"W48",v:5},{w:"W49",v:4},{w:"W50",v:4},{w:"W51",v:3},{w:"W52",v:3},{w:"W1",v:3},{w:"W2",v:2},{w:"W3",v:2}], distributors: [{name:"Bhopal Pharma",pct:62,status:"at-risk"},{name:"Indore MedDist",pct:58,status:"at-risk"},{name:"Jabalpur Supply",pct:48,status:"at-risk"},{name:"Gwalior Trading",pct:45,status:"at-risk"}], drillSignals: ["Moov gained 2.8pp share in Central zone — structural move", "6 Reckitt sales vans spotted in rural haats (Sagar, Rewa, Satna, Chhindwara)", "Iodex numeric distribution dropped 38% → 31% in one Nielsen period", "Sub-stockist network can't match van frequency + trial generation"] },
    ], distribution: { newOutlets: 65, reorderRate: 29, numericDist: 24 }, signals: ["Moov van coverage expanding", "Monsoon stocking must happen this week", "Lowest numeric distribution — systemic gap"] },
];

const typeColors = {
  "Competitive Alert": { bg: "#1B2A2112", text: "#1B2A21", border: "#1B2A2125" },
  "Distribution Opportunity": { bg: "#85A38318", text: B.green, border: "#85A38340" },
  "Demand Signal": { bg: "#85A38318", text: B.green, border: "#85A38340" },
  "Performance Risk": { bg: "#DF764915", text: "#9A4A28", border: "#DF764930" },
  "Seasonal Prep": { bg: "#85A38318", text: B.green, border: "#85A38340" },
  "Launch Tracking": { bg: "#1B2A2112", text: "#1B2A21", border: "#1B2A2125" },
  "Opportunity": { bg: "#85A38318", text: B.green, border: "#85A38340" },
};

const severityColors = { critical: "#B8412A", high: B.terracotta, medium: B.sage, low: B.grey };
const statusConfig = { "on-track": { label: "On Track", color: B.sage }, "needs-attention": { label: "Needs Attention", color: B.terracotta }, "at-risk": { label: "At Risk", color: "#B8412A" }, "ahead": { label: "Ahead", color: B.sage }, "watch": { label: "Watch", color: B.terracotta } };
const productFilters = ["All Products", "Sensodyne", "Eno", "Crocin", "Centrum", "Otrivin", "Iodex"];
const typeFilters = ["All Types", "Competitive Alert", "Distribution Opportunity", "Demand Signal", "Performance Risk", "Seasonal Prep", "Launch Tracking", "Opportunity"];

// ═══════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════

function Sparkline({ data, color, height = 32 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data.map(v => ({ v }))}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function StatusBadge({ status }) {
  const c = statusConfig[status];
  if (!c) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: c.color, backgroundColor: c.color + "12", fontFamily: "'Hanken Grotesk',sans-serif" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: c.color }} />
      {c.label}
    </span>
  );
}

function ProgressBar({ pct }) {
  const color = pct >= 90 ? B.sage : pct >= 75 ? B.terracotta : "#B8412A";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 3, backgroundColor: B.cream, overflow: "hidden" }}>
        <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", backgroundColor: color, transition: "width 0.6s" }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, color, fontFamily: "'Hanken Grotesk',sans-serif", minWidth: 32, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

function AgentTrailStep({ step, isLast, isExpanded, onToggle }) {
  const isSynthesis = step.agent === "Synthesis";
  const isOrchestrator = step.agent === "Orchestrator";

  return (
    <div style={{ position: "relative", paddingLeft: 28 }}>
      {/* Vertical line */}
      {!isLast && <div style={{ position: "absolute", left: 11, top: 22, bottom: -2, width: 1, backgroundColor: B.sage + "40" }} />}
      {/* Node */}
      <div style={{ position: "absolute", left: 4, top: 5, width: 15, height: 15, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: isSynthesis ? B.green : B.sage, backgroundColor: isSynthesis ? B.sage + "25" : "transparent", border: isSynthesis ? "none" : `1px solid ${B.sage}50` }}>
        {step.icon}
      </div>

      <div style={{ paddingBottom: isLast ? 0 : 14 }}>
        {/* Agent header */}
        <div onClick={onToggle} style={{ cursor: step.query ? "pointer" : "default", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: isSynthesis ? B.green : B.dark, letterSpacing: "0.02em" }}>{step.agent}</span>
          {step.source && <span style={{ fontSize: 9, color: B.grey, backgroundColor: B.creamLight, padding: "1px 6px" }}>{step.source}</span>}
          {step.query && <span style={{ fontSize: 9, color: B.sage, marginLeft: "auto" }}>{isExpanded ? "▴" : "▾"}</span>}
        </div>

        {/* Action */}
        <div style={{ fontSize: 11, color: B.grey, marginTop: 3, lineHeight: 1.5 }}>{step.action}</div>

        {/* Routing (orchestrator) */}
        {step.routing && (
          <div style={{ fontSize: 10, color: B.sage, marginTop: 4, fontStyle: "italic", lineHeight: 1.5 }}>↳ {step.routing}</div>
        )}

        {/* Expanded: query + finding + inference */}
        {isExpanded && step.query && (
          <div style={{ marginTop: 8, padding: "10px 12px", backgroundColor: B.dark, fontFamily: "'SF Mono','Fira Code',monospace", fontSize: 10, color: B.sage, lineHeight: 1.6, overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {step.query}
          </div>
        )}

        {step.finding && (
          <div style={{ marginTop: 6, padding: "8px 12px", backgroundColor: B.creamLight, borderLeft: `2px solid ${B.sage}40`, fontSize: 11, color: B.dark, lineHeight: 1.6 }}>
            <span style={{ fontWeight: 600, color: B.sage, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase" }}>Found: </span>
            {step.finding}
          </div>
        )}

        {step.inference && (
          <div style={{ marginTop: 4, padding: "8px 12px", backgroundColor: isSynthesis ? B.green + "08" : "transparent", borderLeft: isSynthesis ? `2px solid ${B.green}` : `2px solid ${B.terracotta}30`, fontSize: 11, color: isSynthesis ? B.green : B.dark + "cc", lineHeight: 1.6 }}>
            <span style={{ fontWeight: 600, color: isSynthesis ? B.green : B.terracotta, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase" }}>{isSynthesis ? "Conclusion: " : "Inferred: "}</span>
            {step.inference}
          </div>
        )}

        {/* Next agent routing */}
        {step.nextAgent && !isOrchestrator && (
          <div style={{ fontSize: 9, color: B.sage, marginTop: 4 }}>→ Routing to {step.nextAgent}</div>
        )}
      </div>
    </div>
  );
}

function ConversationalButton({ label, icon, onClick }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onClick?.(); }} style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px",
      border: `1px solid ${B.green}25`, backgroundColor: B.white, cursor: "pointer",
      fontSize: 11, fontWeight: 500, color: B.green, fontFamily: "'Hanken Grotesk',sans-serif",
      letterSpacing: "0.02em", transition: "all 0.2s",
    }}
    onMouseEnter={e => { e.currentTarget.style.backgroundColor = B.green; e.currentTarget.style.color = B.cream; }}
    onMouseLeave={e => { e.currentTarget.style.backgroundColor = B.white; e.currentTarget.style.color = B.green; }}>
      <span style={{ fontSize: 12 }}>{icon}</span>{label}
    </button>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("decisions");
  const [expandedCritical, setExpandedCritical] = useState(null);
  const [expandedGeo, setExpandedGeo] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [activeTypeFilter, setActiveTypeFilter] = useState("All Types");
  const [activeProductFilter, setActiveProductFilter] = useState("All Products");
  const [expandedCard, setExpandedCard] = useState(null);
  const [trailOpen, setTrailOpen] = useState(null);
  const [expandedSteps, setExpandedSteps] = useState({});
  const [conversationalOpen, setConversationalOpen] = useState(null);

  const filteredCards = insightCards.filter(c => {
    return (activeTypeFilter === "All Types" || c.type === activeTypeFilter) &&
           (activeProductFilter === "All Products" || c.category === activeProductFilter);
  });

  const geoColor = s => s === "on-track" ? B.sage : s === "needs-attention" ? B.terracotta : "#B8412A";

  const toggleStep = (cardId, stepIdx) => {
    const key = `${cardId}-${stepIdx}`;
    setExpandedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="overflow-auto" style={{ height: "100vh", backgroundColor: B.creamLight, fontFamily: "'Hanken Grotesk',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <div style={{ backgroundColor: B.green, padding: "28px 36px 24px", color: B.cream }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: B.sage, marginBottom: 10 }}>MORRIE · MARKET INTELLIGENCE</div>
            <h1 style={{ fontSize: 26, fontWeight: 300, margin: 0, letterSpacing: "-0.01em", color: B.cream }}>Weekly Briefing</h1>
            <div style={{ fontSize: 13, color: B.sage, marginTop: 6 }}>North &amp; Central India — Vikram Mehta, RSM</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: B.cream }}>Week of Feb 3, 2026</div>
            <div style={{ fontSize: 11, color: B.sage, marginTop: 3 }}>Updated 45 min ago</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, marginTop: 22 }}>
          {geographies.map(g => (
            <div key={g.id} style={{ flex: 1, padding: "10px 12px", backgroundColor: "rgba(255,255,255,0.05)", borderBottom: `2px solid ${geoColor(g.status)}` }}>
              <div style={{ fontSize: 10, fontWeight: 500, color: B.sage }}>{g.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 3 }}>
                <span style={{ fontSize: 20, fontWeight: 600, color: geoColor(g.status) }}>{g.salesPct}%</span>
                <span style={{ fontSize: 10, color: B.sage }}>of target</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CRITICAL ITEMS */}
      <div style={{ padding: "24px 36px 0" }}>
        <div style={{ backgroundColor: B.white, border: `1px solid ${B.cream}` }}>
          <div style={{ padding: "16px 24px 12px", borderBottom: `1px solid ${B.cream}`, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: B.green }}>Critical This Week</span>
            <span style={{ fontSize: 11, color: B.grey }}>{criticalItems.length} items</span>
          </div>
          {criticalItems.map((item, idx) => (
            <div key={item.id} onClick={() => setExpandedCritical(expandedCritical === item.id ? null : item.id)}
              style={{ padding: "14px 24px", cursor: "pointer", borderBottom: idx < criticalItems.length - 1 ? `1px solid ${B.creamLight}` : "none", backgroundColor: expandedCritical === item.id ? B.creamLight + "80" : "transparent", transition: "background-color 0.15s" }}
              onMouseEnter={e => { if (expandedCritical !== item.id) e.currentTarget.style.backgroundColor = B.creamLight + "50"; }}
              onMouseLeave={e => { if (expandedCritical !== item.id) e.currentTarget.style.backgroundColor = "transparent"; }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ width: 7, height: 7, backgroundColor: severityColors[item.severity], marginTop: 6, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: B.dark, lineHeight: 1.5, flex: 1 }}>{item.headline}</span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: B.grey, backgroundColor: B.creamLight, padding: "2px 8px" }}>{item.category}</span>
                  </div>
                  {expandedCritical === item.id && <div style={{ fontSize: 12, color: B.grey, lineHeight: 1.7, marginTop: 10 }}>{item.detail}</div>}
                </div>
                <span style={{ fontSize: 10, color: B.grey, transform: expandedCritical === item.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", marginTop: 4 }}>▾</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TAB BAR */}
      <div style={{ padding: "24px 36px 0", position: "sticky", top: 0, zIndex: 10, backgroundColor: B.creamLight }}>
        <div style={{ display: "flex", borderBottom: `1px solid ${B.cream}` }}>
          {[{ key: "decisions", label: "Decisions & Insights" }, { key: "geography", label: "Geography Deep Dives" }].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              padding: "12px 24px", fontSize: 12, fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? B.green : B.grey, background: "none", border: "none",
              borderBottom: activeTab === tab.key ? `2px solid ${B.green}` : "2px solid transparent",
              marginBottom: -1, cursor: "pointer", fontFamily: "'Hanken Grotesk',sans-serif",
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div style={{ padding: "20px 36px 48px" }}>
        {activeTab === "decisions" && (
          <div>
            {/* Product Filters */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: B.grey, marginBottom: 8 }}>Product</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {productFilters.map(f => (
                  <button key={f} onClick={() => setActiveProductFilter(f)} style={{
                    padding: "5px 14px", fontSize: 11, fontWeight: activeProductFilter === f ? 600 : 400,
                    color: activeProductFilter === f ? B.white : B.dark,
                    backgroundColor: activeProductFilter === f ? B.green : B.white,
                    border: `1px solid ${activeProductFilter === f ? B.green : B.cream}`,
                    cursor: "pointer", fontFamily: "'Hanken Grotesk',sans-serif",
                  }}>{f}</button>
                ))}
              </div>
            </div>
            {/* Type Filters */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: B.grey, marginBottom: 8 }}>Insight Type</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {typeFilters.map(f => (
                  <button key={f} onClick={() => setActiveTypeFilter(f)} style={{
                    padding: "5px 14px", fontSize: 11, fontWeight: activeTypeFilter === f ? 600 : 400,
                    color: activeTypeFilter === f ? B.green : B.grey,
                    backgroundColor: activeTypeFilter === f ? B.sage + "20" : "transparent",
                    border: `1px solid ${activeTypeFilter === f ? B.sage + "50" : B.cream}`,
                    cursor: "pointer", fontFamily: "'Hanken Grotesk',sans-serif",
                  }}>{f}</button>
                ))}
              </div>
            </div>

            {/* INSIGHT CARDS */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredCards.length === 0 && <div style={{ padding: 40, textAlign: "center", color: B.grey, fontSize: 13 }}>No insights match the selected filters.</div>}
              {filteredCards.map(card => {
                const isExp = expandedCard === card.id;
                const trendColor = card.trendDown ? "#B8412A" : B.sage;
                const tc = typeColors[card.type] || { bg: B.creamLight, text: B.dark, border: B.cream };
                const trail = agentTrails[card.id];
                const trailIsOpen = trailOpen === card.id;

                return (
                  <div key={card.id} style={{ backgroundColor: B.white, border: `1px solid ${B.cream}`, boxShadow: isExp ? `0 1px 8px ${B.green}08` : "none" }}>
                    {/* Card header */}
                    <div onClick={() => setExpandedCard(isExp ? null : card.id)} style={{ padding: "18px 24px", cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ padding: "2px 8px", fontSize: 9, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: tc.text, backgroundColor: tc.bg, border: `1px solid ${tc.border}` }}>{card.type}</span>
                        <span style={{ width: 5, height: 5, backgroundColor: severityColors[card.priority] }} />
                        <span style={{ fontSize: 10, color: B.grey, marginLeft: "auto" }}>{card.geography}</span>
                        <span style={{ fontSize: 9, fontWeight: 600, color: B.green, backgroundColor: B.sage + "18", padding: "2px 8px" }}>{card.category}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                        <h3 style={{ fontSize: 14, fontWeight: 500, color: B.dark, margin: 0, lineHeight: 1.5, flex: 1 }}>{card.headline}</h3>
                        <div style={{ width: 88, flexShrink: 0 }}>
                          <Sparkline data={card.trend} color={trendColor} height={28} />
                          <div style={{ fontSize: 9, color: B.grey, textAlign: "center", marginTop: 2 }}>{card.trendLabel}</div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded */}
                    {isExp && (
                      <div style={{ padding: "0 24px 20px", borderTop: `1px solid ${B.creamLight}`, paddingTop: 16 }}>
                        <p style={{ fontSize: 12.5, lineHeight: 1.75, color: B.dark + "cc", margin: "0 0 16px" }}>{card.narrative}</p>

                        {/* Action */}
                        <div style={{ backgroundColor: B.green + "08", borderLeft: `3px solid ${B.green}`, padding: "12px 16px", marginBottom: 16 }}>
                          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: B.green, marginBottom: 4 }}>Recommended Action</div>
                          <div style={{ fontSize: 12, color: B.dark, lineHeight: 1.65 }}>{card.action}</div>
                        </div>

                        {/* AGENT DECISION TRAIL */}
                        {trail && (
                          <div style={{ marginBottom: 16 }}>
                            <div onClick={(e) => { e.stopPropagation(); setTrailOpen(trailIsOpen ? null : card.id); }}
                              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: trailIsOpen ? 14 : 0 }}>
                              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: B.green }}>Agent Decision Trail</span>
                              <span style={{ fontSize: 9, color: B.sage }}>{trail.length} steps</span>
                              <div style={{ flex: 1, height: 1, backgroundColor: B.cream, marginLeft: 4 }} />
                              <span style={{ fontSize: 10, color: B.sage, transform: trailIsOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
                            </div>

                            {trailIsOpen && (
                              <div style={{ padding: "0 0 0 4px" }}>
                                {trail.map((step, si) => (
                                  <AgentTrailStep
                                    key={si}
                                    step={step}
                                    isLast={si === trail.length - 1}
                                    isExpanded={!!expandedSteps[`${card.id}-${si}`]}
                                    onToggle={() => step.query && toggleStep(card.id, si)}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Conversational buttons */}
                        {(card.canDeepDive || card.canScenario) && (
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {card.canDeepDive && <ConversationalButton label="Deep Dive" icon="↳" onClick={() => setConversationalOpen(conversationalOpen === `dd-${card.id}` ? null : `dd-${card.id}`)} />}
                            {card.canScenario && <ConversationalButton label="Model Scenario" icon="⎔" onClick={() => setConversationalOpen(conversationalOpen === `sc-${card.id}` ? null : `sc-${card.id}`)} />}
                          </div>
                        )}

                        {/* Deep Dive panel */}
                        {conversationalOpen === `dd-${card.id}` && (
                          <div style={{ marginTop: 12, padding: "16px 18px", backgroundColor: B.green + "06", border: `1px solid ${B.green}15` }}>
                            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: B.green, marginBottom: 10 }}>Deep Dive · {card.category} · {card.geography}</div>
                            <div style={{ fontSize: 12, color: B.dark, lineHeight: 1.7, marginBottom: 14 }}>Ask a follow-up question to explore this insight further. Morrie can pull distributor-level data, overlay competitor timelines, or break down the signal by sub-geography.</div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <input type="text" placeholder={`e.g. "Show me ${card.category} distributor-wise split for ${card.geography}"`} onClick={e => e.stopPropagation()} style={{ flex: 1, padding: "10px 14px", fontSize: 12, border: `1px solid ${B.cream}`, backgroundColor: B.white, fontFamily: "'Hanken Grotesk',sans-serif", color: B.dark, outline: "none" }} />
                              <button onClick={e => e.stopPropagation()} style={{ padding: "10px 20px", backgroundColor: B.green, color: B.cream, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'Hanken Grotesk',sans-serif" }}>Ask</button>
                            </div>
                          </div>
                        )}

                        {/* Scenario panel */}
                        {conversationalOpen === `sc-${card.id}` && (
                          <div style={{ marginTop: 12, padding: "16px 18px", backgroundColor: B.terracotta + "08", border: `1px solid ${B.terracotta}20` }}>
                            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: B.terracotta, marginBottom: 10 }}>Scenario Modelling · {card.category}</div>
                            <div style={{ fontSize: 12, color: B.dark, lineHeight: 1.7, marginBottom: 14 }}>Model the impact of different actions based on historical patterns and current signals.</div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <input type="text" placeholder="Describe a scenario to model..." onClick={e => e.stopPropagation()} style={{ flex: 1, padding: "10px 14px", fontSize: 12, border: `1px solid ${B.cream}`, backgroundColor: B.white, fontFamily: "'Hanken Grotesk',sans-serif", color: B.dark, outline: "none" }} />
                              <button onClick={e => e.stopPropagation()} style={{ padding: "10px 20px", backgroundColor: B.terracotta, color: B.white, border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'Hanken Grotesk',sans-serif" }}>Model</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* GEOGRAPHY TAB */}
        {activeTab === "geography" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {geographies.map(geo => {
              const isExp = expandedGeo === geo.id;
              const sc = geoColor(geo.status);
              return (
                <div key={geo.id} style={{ backgroundColor: B.white, border: `1px solid ${B.cream}`, borderLeft: `3px solid ${sc}`, boxShadow: isExp ? `0 1px 8px ${B.green}08` : "none" }}>
                  <div onClick={() => setExpandedGeo(isExp ? null : geo.id)} style={{ padding: "18px 24px", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 500, color: B.dark, margin: 0 }}>{geo.name}</h3>
                        <StatusBadge status={geo.status} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <span style={{ fontSize: 10, color: B.grey }}>₹{geo.salesActual}Cr / ₹{geo.salesTarget}Cr</span>
                        <span style={{ fontSize: 22, fontWeight: 600, color: sc }}>{geo.salesPct}%</span>
                        <span style={{ fontSize: 10, color: B.grey, transform: isExp ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: B.grey, lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>{geo.narrative}</p>
                  </div>
                  {isExp && (
                    <div style={{ borderTop: `1px solid ${B.creamLight}`, padding: "0 24px 24px" }}>
                      {/* ── PROPER WEEKLY CHART ── */}
                      <div style={{ padding: "18px 0 14px", borderBottom: `1px solid ${B.creamLight}` }}>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
                          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: B.grey }}>Weekly Primary Sales ({geo.weeklyUnit})</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 10 }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 12, height: 3, backgroundColor: sc, display: "inline-block" }} />Actual</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 12, height: 1, backgroundColor: B.grey, display: "inline-block", borderTop: "1px dashed " + B.grey }} />Target</span>
                          </div>
                        </div>
                        <div style={{ height: 140 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={geo.weeklyData} barCategoryGap="25%">
                              <XAxis dataKey="w" tick={{ fontSize: 10, fill: B.grey, fontFamily: "'Hanken Grotesk',sans-serif" }} axisLine={{ stroke: B.cream }} tickLine={false} />
                              <YAxis tick={{ fontSize: 10, fill: B.grey, fontFamily: "'Hanken Grotesk',sans-serif" }} axisLine={false} tickLine={false} width={35} />
                              <Tooltip contentStyle={{ fontSize: 11, fontFamily: "'Hanken Grotesk',sans-serif", border: `1px solid ${B.cream}`, borderRadius: 0, boxShadow: "none" }} />
                              <ReferenceLine y={geo.weeklyData[0]?.target} stroke={B.grey} strokeDasharray="4 3" strokeWidth={1} />
                              <Bar dataKey="actual" fill={sc} radius={[1,1,0,0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: B.grey }}>
                          <span>First: {geo.weeklyUnit === "₹L" ? "₹" : ""}{geo.weeklyData[0]?.actual}{geo.weeklyUnit === "₹L" ? "L" : ""}</span>
                          <span>Latest: {geo.weeklyUnit === "₹L" ? "₹" : ""}{geo.weeklyData[geo.weeklyData.length - 1]?.actual}{geo.weeklyUnit === "₹L" ? "L" : ""} {geo.weeklyData[geo.weeklyData.length - 1]?.actual >= geo.weeklyData[0]?.target ? "✓" : "↓"} vs ₹{geo.weeklyData[0]?.target}L target</span>
                        </div>
                      </div>

                      {/* ── CLICKABLE CATEGORIES ── */}
                      <div style={{ paddingTop: 16 }}>
                        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: B.grey, marginBottom: 12 }}>Category Performance <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— click to drill down</span></div>
                        {geo.categories.map(cat => {
                          const catKey = `${geo.id}-${cat.name}`;
                          const catExpanded = expandedCategory === catKey;
                          const catColor = cat.status === "ahead" ? B.sage : cat.status === "on-track" ? B.sage : cat.status === "watch" ? B.terracotta : "#B8412A";

                          return (
                            <div key={cat.name}>
                              {/* Category row */}
                              <div
                                onClick={(e) => { e.stopPropagation(); setExpandedCategory(catExpanded ? null : catKey); }}
                                style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: `1px solid ${catExpanded ? "transparent" : B.creamLight}`, cursor: "pointer", transition: "background-color 0.1s" }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = B.creamLight + "60"}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                              >
                                <div style={{ width: 85, fontSize: 12, fontWeight: 600, color: B.dark }}>{cat.name}</div>
                                <div style={{ width: 65, fontSize: 11, color: B.grey }}>₹{cat.actual}Cr</div>
                                <div style={{ flex: 1 }}><ProgressBar pct={cat.pct} /></div>
                                <div style={{ width: 180, fontSize: 11, color: B.grey, lineHeight: 1.4 }}>{cat.note}</div>
                                <span style={{ fontSize: 9, color: B.sage, transform: catExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
                              </div>

                              {/* Category drill-down */}
                              {catExpanded && (
                                <div style={{ padding: "14px 0 16px 0", borderBottom: `1px solid ${B.creamLight}`, backgroundColor: B.creamLight + "40", margin: "0 -24px", padding: "14px 24px 16px" }}>
                                  <div style={{ display: "flex", gap: 20 }}>
                                    {/* Mini chart */}
                                    <div style={{ flex: 1 }}>
                                      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: B.grey, marginBottom: 8 }}>{cat.name} Weekly ({geo.weeklyUnit})</div>
                                      <div style={{ height: 80 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                          <BarChart data={cat.weeklyData} barCategoryGap="20%">
                                            <XAxis dataKey="w" tick={{ fontSize: 9, fill: B.grey }} axisLine={{ stroke: B.cream }} tickLine={false} />
                                            <Bar dataKey="v" fill={catColor} radius={[1,1,0,0]} />
                                          </BarChart>
                                        </ResponsiveContainer>
                                      </div>
                                    </div>

                                    {/* Distributors */}
                                    <div style={{ width: 280 }}>
                                      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: B.grey, marginBottom: 8 }}>Distributor Breakdown</div>
                                      {cat.distributors?.map((d, di) => {
                                        const dColor = d.status === "ahead" ? B.sage : d.status === "on-track" ? B.sage : d.status === "watch" ? B.terracotta : "#B8412A";
                                        return (
                                          <div key={di} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                            <span style={{ fontSize: 11, color: B.dark, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</span>
                                            <div style={{ width: 60, height: 3, backgroundColor: B.cream, overflow: "hidden" }}>
                                              <div style={{ width: `${Math.min(d.pct, 120) / 1.2}%`, height: "100%", backgroundColor: dColor }} />
                                            </div>
                                            <span style={{ fontSize: 10, fontWeight: 600, color: dColor, minWidth: 32, textAlign: "right" }}>{d.pct}%</span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {/* Category-specific signals */}
                                  {cat.drillSignals && cat.drillSignals.length > 0 && (
                                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${B.cream}` }}>
                                      {cat.drillSignals.map((s, si) => (
                                        <div key={si} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 5 }}>
                                          <span style={{ color: catColor, fontSize: 7, marginTop: 4 }}>◆</span>
                                          <span style={{ fontSize: 11, color: B.dark + "cc", lineHeight: 1.5 }}>{s}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* Category deep dive CTA */}
                                  <div style={{ marginTop: 10 }}>
                                    <ConversationalButton label={`Ask about ${cat.name} in ${geo.name}`} icon="↳" />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
                        {[{ l: "New Outlets MTD", v: geo.distribution.newOutlets }, { l: "Reorder Rate", v: geo.distribution.reorderRate + "%" }, { l: "Avg Numeric Dist.", v: geo.distribution.numericDist + "%" }].map(m => (
                          <div key={m.l} style={{ flex: 1, backgroundColor: B.creamLight, padding: "14px 16px", textAlign: "center" }}>
                            <div style={{ fontSize: 20, fontWeight: 600, color: B.dark }}>{m.v}</div>
                            <div style={{ fontSize: 10, color: B.grey, marginTop: 3 }}>{m.l}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 18 }}>
                        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: B.grey, marginBottom: 10 }}>Signals &amp; Forward Look</div>
                        {geo.signals.map((s, i) => (
                          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                            <span style={{ color: B.sage, fontSize: 8, marginTop: 4 }}>◆</span>
                            <span style={{ fontSize: 12, color: B.dark + "cc", lineHeight: 1.55 }}>{s}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${B.creamLight}`, display: "flex", gap: 8 }}>
                        <ConversationalButton label={`Deep dive into ${geo.name}`} icon="↳" />
                        <ConversationalButton label="Compare with last month" icon="⎔" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

"use client"
import { useState } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";

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
// SENSODYNE BRAND DATA
// ═══════════════════════════════════════════════════════
const brandData = {
  tagline: "Sensitivity Toothpaste · ₹20 Trial + Full Range",
  summary: "Competitive signal: New competitor Sensodent launched with World Cup advertising, aggressive Amazon presence, and 25% retailer margins (vs our 20%). Impact so far limited to Mumbai (−1-2% volume). Our pharmacy-first strategy is the counter — dentist recommendation drives 3x better repeat than GT.",
  kpis: [
    { label: "BRAND ACHIEVEMENT", value: "94%", delta: "−3% vs LYSM", negative: true },
    { label: "MUMBAI IMPACT", value: "−1-2%", delta: "Localized so far", negative: true },
    { label: "PRICE INDEX", value: "100 vs 85", delta: "They're 15% cheaper", negative: true },
    { label: "PHARMACY REORDER", value: "92%", delta: "Our moat (vs 28% GT)", negative: false },
  ],
  competitorName: "Sensodent",
  
  // ═══════════════════════════════════════════════════════
  // CONSUMER FUNNEL — Sensodyne specific
  // ═══════════════════════════════════════════════════════
  funnelStages: [
    {
      id: "awareness",
      name: "Awareness",
      metrics: [
        { label: "Share of Search", value: "58%", delta: "−2pp", isGood: false },
        { label: "Competitor Visibility", value: "Rising", delta: "World Cup + Amazon", isGood: false },
      ],
      prompts: [
        { q: "Why is search share down?", a: "Two sources showing the same pattern:\n\n• **Google Trends**: 'Sensodent' searches spiked during World Cup windows. 'Sensodyne' stable. They're capturing incremental category interest.\n• **Amazon Brand Analytics**: Our share of search for 'sensitivity toothpaste' keywords dropped 2pp to 58%.\n\nTwo factors driving this:\n\n1. **World Cup advertising**: TV campaign drove search spikes during match windows\n2. **Amazon keyword bidding**: Sensodent appearing in sponsored results and on our PDPs\n\nOur branded search 'Sensodyne' is stable — they're capturing category search." },
        { q: "What's Sensodent doing?", a: "Signals we can observe:\n\n• **TV**: World Cup ad campaign — visible during matches\n• **Influencers**: Higher engagement rates on their sponsored posts vs ours (visible on Instagram public profiles)\n• **Amazon**: Sponsored product ads on generic keywords + sponsored display on our PDPs\n• **Pricing**: Index 85 vs our 100 (visible on Flipkart, Amazon)\n• **Trade**: Field reports of 25% retailer margin vs our 20%\n• **Geography**: Activity concentrated in Mumbai — media, BTL, pricing all focused there\n\nThis is a methodical launch, not spray-and-pray." },
        { q: "Where is impact showing?", a: "So far, impact is **localized to Mumbai**:\n\n• Mumbai volumes: −1-2% (our DMS data)\n• Rest of India: No measurable impact yet\n• Their media, BTL, and trade push all focused on Mumbai\n\nMumbai is likely their test market before national rollout. Emerging threat — not a crisis yet, but signals are clear." },
      ],
    },
    {
      id: "consideration",
      name: "Consideration",
      hasIssue: true,
      metrics: [
        { label: "Dentist Recommendation", value: "78%", delta: "Stable", isGood: true },
        { label: "E-comm CTR", value: "2.1%", delta: "−0.4pp (Brand Analytics)", isGood: false },
      ],
      prompts: [
        { q: "Why is e-comm CTR down?", a: "Sensodent is outspending us on Amazon visibility:\n\n• Higher sponsored product ads on category keywords than us\n• Appearing on our own PDPs as sponsored display\n• Visible on generic terms ('sensitivity toothpaste', 'sensitive teeth')\n\nWe can see their ads appearing but can't see spend. Their visibility is clearly higher — they're buying their way into consideration." },
        { q: "How is dentist recommendation?", a: "Strong. IQVIA prescription data shows Sensodyne maintains 78% share among dentists for sensitivity cases. Sensodent has zero dental professional coverage — they're skipping the recommendation channel entirely.\n\nThis is our moat. Patients with dentist recommendation have 3x higher repeat rate than self-purchase." },
        { q: "Price and margin impact?", a: "**Price Index**: Sensodent at 85 vs our 100 (15% cheaper on platforms)\n\n**Retailer Margin**: Field reports say they're offering 25% vs our 20% (5pp gap)\n\nWhere this matters:\n• E-commerce: Price-comparison shoppers\n• MT: Shelf price visibility + retailer push\n• Mumbai retail: Some retailers giving them better placement\n\nWhere it doesn't matter as much:\n• Pharmacy: Dentist recommendation overrides price\n• Our ₹20 trial: Counters price argument at entry point" },
      ],
    },
    {
      id: "conversion",
      name: "Conversion",
      hasIssue: true,
      metrics: [
        { label: "Market Share", value: "68.4%", delta: "−0.6pp", isGood: false },
        { label: "₹20 Trial Conversion", value: "41%", delta: "+3pp", isGood: true },
      ],
      prompts: [
        { q: "Where are we losing share?", a: "Impact is **localized to Mumbai** so far:\n\n• **Mumbai**: −1-2% volume (our DMS confirms)\n• **Rest of India**: No measurable impact yet\n\nWithin Mumbai:\n• E-commerce and MT most affected (price visibility)\n• Pharmacy stable (our moat holding)\n\nMumbai is their test market — media, BTL, trade margins all concentrated there." },
        { q: "Is this a crisis?", a: "**Not yet — but it's an emerging threat.**\n\nWhat we know:\n• Impact limited to Mumbai (−1-2%)\n• Pharmacy channel unaffected (our moat)\n• Dentist recommendation share stable (78% per IQVIA)\n\nWhat concerns us:\n• Methodical launch (TV + digital + trade + pricing)\n• Mumbai likely test market before national rollout\n• If they prove the model, expansion follows\n\nTime to act is now, before they scale." },
        { q: "Trade margin issue?", a: "Field intel from Mumbai ASMs:\n\n• Sensodent offering 25% retailer margin vs our 20%\n• Some MT and GT retailers giving them better shelf position\n• Paid visibility on ground (end-caps, counter displays)\n\nThis is anecdotal but consistent pattern. They're buying distribution via margin. Our counter is pharmacy where dentist recommendation matters more than margin." },
      ],
    },
    {
      id: "repeat",
      name: "Repeat & Sentiment",
      metrics: [
        { label: "Pharmacy Reorder", value: "92%", delta: "+4pp", isGood: true },
        { label: "R&R Score", value: "4.4★", delta: "Stable", isGood: true },
      ],
      prompts: [
        { q: "Why is pharmacy reorder so high?", a: "The recommendation loop:\n\n1. Dentist recommends Sensodyne for sensitivity\n2. Patient buys at pharmacy (trust transfer)\n3. Product works → patient returns to same pharmacy\n4. Pharmacist reinforces → repeat purchase\n\nThis loop doesn't exist in GT or e-commerce. Sensodent's direct-to-consumer model skips this entirely — they'll have lower repeat." },
        { q: "Sensodent reviews?", a: "From Amazon reviews (publicly visible):\n\n• Sensodent: 4.1★ avg, ~2,400 reviews\n• Common feedback: 'good value', 'works okay', 'not as effective as Sensodyne'\n• Some reviews mention switching from Sensodyne for price\n\nOur reviews: 4.4★, ~48,000 reviews. 'Dentist recommended' appears in 34% of positive reviews — the trust signal matters." },
        { q: "Churn risk?", a: "Analyzing our repeat purchase data:\n\n• High churn risk: E-commerce buyers with no prior dentist touchpoint\n• Medium risk: MT buyers who see Sensodent shelf price\n• Low risk: Pharmacy buyers with dentist recommendation\n\nWe should focus retention efforts on e-commerce cohort — they're most vulnerable to Sensodent's price message." },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════
  // REGIONAL BREAKDOWN
  // ═══════════════════════════════════════════════════════
  regions: [
    { name: "Mumbai", achievement: 88, status: "at-risk",
      narrative: "Sensodent's test market. World Cup ads, influencer campaigns, 25% retailer margins, BTL all concentrated here. Our volume down 1-2%. Early warning — if they prove the model here, national rollout follows.",
      keyWin: "Pharmacy channel holding — Apollo and wellness chains showing stable reorder",
      keyRisk: "MT and GT seeing Sensodent shelf gains. E-commerce share under pressure. This is their beachhead.",
      metrics: [
        { label: "Volume Impact", value: "−1-2%", negative: true },
        { label: "Sensodent Activity", value: "High", note: "TV, digital, trade, BTL" },
        { label: "Pharmacy Reorder", value: "84%", note: "Holding" },
        { label: "Retailer Margin Gap", value: "5pp", note: "25% vs our 20%" },
      ],
      weeklyTrend: [{w:"W48",v:94},{w:"W49",v:93},{w:"W50",v:92},{w:"W51",v:91},{w:"W52",v:90},{w:"W1",v:89},{w:"W2",v:88},{w:"W3",v:88}],
      asmAreas: [
        { name: "Mumbai Central + South", ach: 86, primary: "₹9.2L", delta: "−3%", dist: "76%", flag: "Sensodent BTL + shelf presence" },
        { name: "Mumbai Suburbs + Thane", ach: 90, primary: "₹7.8L", delta: "−1%", dist: "72%", flag: "MT shelf pressure" },
      ],
    },
    { name: "Delhi NCR", achievement: 94, status: "needs-attention",
      narrative: "World Cup ads visible but no ground activation yet. E-commerce ads appearing on our PDPs. If Mumbai succeeds, Delhi is likely next. Build pharmacy moat now.",
      keyWin: "South Delhi pharmacy pilot: 89% reorder rate — dentist recommendation driving repeat",
      keyRisk: "Sensodent e-commerce ads appearing on our Amazon PDPs. Ground activation likely coming.",
      metrics: [
        { label: "Volume Impact", value: "Flat", negative: false },
        { label: "Sensodent Presence", value: "Ads only", note: "No ground activation yet" },
        { label: "Pharmacy Reorder", value: "89%", note: "Pilot area" },
        { label: "Dentist Coverage", value: "72%", note: "Target 80%" },
      ],
      weeklyTrend: [{w:"W48",v:96},{w:"W49",v:96},{w:"W50",v:95},{w:"W51",v:95},{w:"W52",v:94},{w:"W1",v:94},{w:"W2",v:94},{w:"W3",v:94}],
      asmAreas: [
        { name: "South Delhi + Gurgaon", ach: 96, primary: "₹8.2L", delta: "Flat", dist: "78%", flag: "Pharmacy pilot strong" },
        { name: "Noida + East Delhi", ach: 92, primary: "₹6.1L", delta: "−1%", dist: "71%", flag: "Monitor for expansion" },
      ],
    },
    { name: "UP East", achievement: 98, status: "on-track",
      narrative: "Pharmacy-first strategy validated in Agra — 92% reorder. Sensodent not yet visible in this market. Replication to Mathura, Firozabad, Etah underway. This is our proof point.",
      keyWin: "Agra pharmacy-first: 92% reorder, 58% trial-to-full conversion. 3x better than GT-led distribution",
      keyRisk: "Varanasi dentist coverage stalled at 48% — need 60% before Sensodent arrives",
      metrics: [
        { label: "Primary Sales Δ", value: "+6%", negative: false },
        { label: "Pharmacy Reorder", value: "92%", note: "Agra pilot" },
        { label: "Trial Conversion", value: "58%", note: "Pharmacy channel" },
        { label: "Dentist Coverage", value: "64%", note: "Above target" },
      ],
      weeklyTrend: [{w:"W48",v:94},{w:"W49",v:95},{w:"W50",v:96},{w:"W51",v:96},{w:"W52",v:97},{w:"W1",v:97},{w:"W2",v:98},{w:"W3",v:98}],
      asmAreas: [
        { name: "Agra–Mathura", ach: 104, primary: "₹7.8L", delta: "+12%", dist: "76%", flag: "Playbook validated" },
        { name: "Varanasi–Allahabad", ach: 91, primary: "₹5.4L", delta: "0%", dist: "58%", flag: "Dentist coverage 48%" },
      ],
    },
    { name: "UP West", achievement: 88, status: "needs-attention",
      narrative: "Mixed. Lucknow pharmacy activation behind plan. Kanpur showing early Sensodent presence in MT. Need to accelerate dentist coverage before Sensodent expands.",
      keyWin: "Lucknow Apollo pharmacy chain partnership driving 84% reorder in covered outlets",
      keyRisk: "Sensodent spotted in Kanpur DMart. Our dentist coverage only 52% — vulnerable",
      metrics: [
        { label: "Primary Sales Δ", value: "−2%", negative: true },
        { label: "Pharmacy Reorder", value: "78%", note: "Below Agra benchmark" },
        { label: "Dentist Coverage", value: "52%", note: "Below 60% target" },
        { label: "MT Share Δ", value: "−0.8pp", note: "Sensodent entry" },
      ],
      weeklyTrend: [{w:"W48",v:92},{w:"W49",v:91},{w:"W50",v:90},{w:"W51",v:90},{w:"W52",v:89},{w:"W1",v:89},{w:"W2",v:88},{w:"W3",v:88}],
      asmAreas: [
        { name: "Lucknow–Kanpur", ach: 84, primary: "₹6.2L", delta: "−5%", dist: "64%", flag: "Sensodent in Kanpur MT" },
        { name: "Agra–Aligarh", ach: 94, primary: "₹5.8L", delta: "+2%", dist: "72%", flag: null },
      ],
    },
    { name: "Rajasthan", achievement: 96, status: "on-track",
      narrative: "Stable. Sensodent not yet visible. Jaipur pharmacy network strong. Use this window to build dentist coverage before competitor arrives.",
      keyWin: "Jaipur dental association partnership — 82% of member dentists now recommending Sensodyne",
      keyRisk: "No immediate risk, but Sensodent likely to expand here within 2-3 months based on their metro-first pattern",
      metrics: [
        { label: "Primary Sales Δ", value: "+4%", negative: false },
        { label: "Pharmacy Reorder", value: "86%", note: "Strong" },
        { label: "Dentist Coverage", value: "71%", note: "Above target" },
        { label: "₹20 Trial Velocity", value: "+18%", note: "Growing" },
      ],
      weeklyTrend: [{w:"W48",v:92},{w:"W49",v:93},{w:"W50",v:94},{w:"W51",v:94},{w:"W52",v:95},{w:"W1",v:95},{w:"W2",v:96},{w:"W3",v:96}],
      asmAreas: [
        { name: "Jaipur–North", ach: 98, primary: "₹7.4L", delta: "+6%", dist: "74%", flag: "Dental association partner" },
        { name: "Udaipur–Kota–South", ach: 94, primary: "₹5.6L", delta: "+2%", dist: "68%", flag: null },
      ],
    },
    { name: "Madhya Pradesh", achievement: 90, status: "on-track",
      narrative: "Steady progress. Bhopal dentist activation showing results. Sensodent not yet present. Focus on building pharmacy moat before they arrive.",
      keyWin: "Bhopal dental college partnership — students being trained on Sensodyne recommendation",
      keyRisk: "Rural penetration low at 34% — but Sensodent unlikely to target rural",
      metrics: [
        { label: "Primary Sales Δ", value: "+3%", negative: false },
        { label: "Pharmacy Reorder", value: "81%", note: "Good" },
        { label: "Dentist Coverage", value: "58%", note: "Near target" },
        { label: "Rural Penetration", value: "34%", note: "Low but stable" },
      ],
      weeklyTrend: [{w:"W48",v:86},{w:"W49",v:87},{w:"W50",v:88},{w:"W51",v:88},{w:"W52",v:89},{w:"W1",v:89},{w:"W2",v:90},{w:"W3",v:90}],
      asmAreas: [
        { name: "Bhopal–Indore", ach: 93, primary: "₹6.1L", delta: "+5%", dist: "68%", flag: "Dental college partner" },
        { name: "Jabalpur–Gwalior–East", ach: 86, primary: "₹4.2L", delta: "0%", dist: "54%", flag: "Rural dist. 34%" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════
  // INSIGHTS
  // ═══════════════════════════════════════════════════════
  insights: [
    {
      id: 1, priority: "critical", type: "Competitive Alert", region: "Mumbai · Test Market",
      headline: "Sensodent launched with World Cup campaign — Mumbai is their test market, signals are clear",
      subtitle: "TV ads during World Cup, aggressive Amazon presence, 25% retailer margins, higher influencer engagement. Mumbai volume down 1-2%. Emerging threat — not a crisis yet.",
      indicatorType: "leading",
      kpis: [
        { label: "Mumbai Impact", value: "−1-2%", note: "Our volume" },
        { label: "Price Index", value: "85 vs 100", note: "15% cheaper" },
        { label: "Retailer Margin", value: "25% vs 20%", note: "5pp gap" },
        { label: "Rx Share", value: "78%", note: "Our moat intact" },
      ],
      evidence: [
        { source: "Google Trends + Amazon Brand Analytics", summary: "'Sensodent' searches spiked during World Cup windows. Amazon share of search for 'sensitivity toothpaste' down 2pp. They're capturing category search." },
        { source: "Amazon observation", summary: "Sensodent running higher sponsored product ads than us on sensitivity keywords. Appearing as sponsored display on our PDPs. Higher visibility on generic and Sensodyne keywords." },
        { source: "Instagram observation", summary: "Sensodent influencer posts showing higher engagement rates than our sponsored content. Visible on public profiles — they're getting better traction." },
        { source: "Platform pricing", summary: "Sensodent priced at index 85 vs Sensodyne 100 on Flipkart and Amazon. 15% price gap clearly visible." },
        { source: "Field Reports (Mumbai)", summary: "ASMs report Sensodent offering 25% retailer margin vs our 20%. Paid visibility on ground — end-caps, counter displays. BTL activity in South Mumbai retail." },
        { source: "DMS (Internal)", summary: "Mumbai volumes down 1-2% vs prior period. Rest of India stable. Impact is localized to their test market." },
        { source: "Past Action (Agra Pilot)", summary: "Pharmacy-first strategy delivered 92% reorder vs 28% GT in Agra. Dentist recommendation overrides price sensitivity — this is our proven competitive moat." },
      ],
      salesAction: "Accelerate pharmacy-first in Mumbai — our moat. Brief Mumbai ASMs to focus on pharmacy channel. Don't engage in price competition on MT shelf. Document competitor BTL activity.",
      marketingAction: "Hold on e-commerce promotional spend. Focus 'Dentist Recommended' messaging in pharmacy. Monitor for Delhi expansion signals. Prepare counter-playbook.",
      pastValidation: {
        title: "Pharmacy-first beats price competition",
        detail: "In Agra pilot, pharmacy channel delivered 92% reorder vs 28% in GT. Dentist recommendation overrides price sensitivity. This is our competitive moat.",
        outcome: "3.3x better repeat in pharmacy vs GT",
        confidence: "High — validated in controlled pilot"
      },
      syncedTo: { 
        system: "Sales Watchtower", 
        targets: ["Mumbai ASMs", "West Zone RSM"], 
        status: "Pushed today",
        fieldBrief: [
          { target: "Mumbai ASMs", brief: "Sensodent active in your territory — World Cup ads, Amazon presence, 25% retailer margins. Our volume down 1-2%. Focus on pharmacy channel where our moat is strong. Document competitor BTL and trade activity." },
          { target: "West Zone RSM", brief: "Mumbai is Sensodent's test market. If they succeed, expansion likely. Prepare counter-playbook using Agra pharmacy-first learnings. Don't compete on price — compete on recommendation." },
        ]
      },
      agentTrail: [
        { agent: "Orchestrator", icon: "◈", action: "Multiple signals detected: New competitor 'Sensodent' appearing across search, social, e-commerce, and field reports", routing: "Dispatching to Market Share, Consumer Demand, Competitive Signal, and Field Intelligence agents" },
        { agent: "Consumer Demand Agent", icon: "◉", source: "Google Trends · Amazon Brand Analytics", query: "google_trends(keywords=['sensodent','sensodyne'], geo='IN', timeframe='8w') | amazon_brand_analytics('sensitivity toothpaste')", finding: "Sensodent searches spiked during World Cup. Search share down 2pp. Concentrated in Mumbai.", inference: "TV campaign drove awareness. World Cup timing strategic for reach." },
        { agent: "Competitive Signal Agent", icon: "◆", source: "Amazon observation · Instagram · Platform pricing", query: "amazon_sponsored_visibility('sensitivity toothpaste') | instagram_engagement(brand='sensodent') | platform_pricing(brand='sensodent')", finding: "Higher sponsored ads than us on Amazon. Appearing on our PDPs. Higher influencer engagement. Price index 85 vs 100.", inference: "Methodical launch — TV + digital + trade + pricing. Well-funded, not amateur." },
        { agent: "Field Intelligence Agent", icon: "▣", source: "SFA — Mumbai ASM reports", query: "field_reports(competitor='sensodent', geo='Mumbai')", finding: "25% retailer margin vs our 20%. BTL visible in South Mumbai. Paid shelf visibility.", inference: "Trade push active. Buying distribution via margin." },
        { agent: "Commercial Performance Agent", icon: "▣", source: "DMS — Mumbai", query: "SELECT territory, volume_change FROM dms WHERE brand='Sensodyne' AND city='Mumbai'", finding: "Mumbai volumes down 1-2%. Rest of India stable.", inference: "Impact localized to test market. Not yet national." },
        { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH on signals, MEDIUM on trajectory. Sensodent is real, methodical, and funded. Mumbai is test market. Our moat (pharmacy/Rx) intact. Emerging threat — act before they scale." },
      ],
    },
    {
      id: 2, priority: "high", type: "Strategy Validation", region: "UP East · Agra",
      headline: "Pharmacy-first playbook validated — 92% reorder proves our competitive moat",
      subtitle: "Dentist recommendation → pharmacy purchase → repeat loop creates 3.3x better retention. This is how we beat Sensodent — not on price, on recommendation.",
      indicatorType: "lagging",
      kpis: [
        { label: "Pharmacy Reorder", value: "92%", note: "Agra pilot" },
        { label: "GT Reorder", value: "28%", note: "Control group" },
        { label: "Trial Conversion", value: "58%", note: "₹20 to full-size" },
        { label: "Advantage", value: "3.3x", note: "vs price-led channels" },
      ],
      evidence: [
        { source: "DMS (Outlet Reorder)", summary: "Agra pharmacy: 92% reorder. GT: 28%. Same product, same pricing. Channel strategy is the differentiator." },
        { source: "DMS (Trial Tracking)", summary: "₹20 trial to full-size conversion: 58% in pharmacy vs 34% in GT. Dentist recommendation provides credibility." },
        { source: "IQVIA", summary: "Our prescription share for sensitivity: 78%. Sensodent has 0% — they have no professional coverage." },
      ],
      salesAction: "Replicate playbook to Mumbai immediately. Share Agra learnings with Mumbai ASMs. Target 200 pharmacy outlets in Mumbai for activation.",
      marketingAction: "Use Agra data in pharmacy and distributor pitches. Develop 'Dentist Recommended' POS materials for Mumbai pharmacies.",
      syncedTo: { 
        system: "Sales Watchtower", 
        targets: ["UP East RSM", "Mumbai ASMs"], 
        status: "Pushed today",
        fieldBrief: [
          { target: "UP East RSM", brief: "Your Agra playbook is the counter to Sensodent. Share learnings with Mumbai team. Continue deepening coverage in adjacent districts." },
          { target: "Mumbai ASMs", brief: "Agra playbook ready — pharmacy-first delivers 3.3x better reorder. Apply this in Mumbai to counter Sensodent's price play. Dentist recommendation beats price." },
        ]
      },
      agentTrail: [
        { agent: "Orchestrator", icon: "◈", action: "Connecting Agra validation to Sensodent threat", routing: "This playbook is the competitive counter" },
        { agent: "Distribution Agent", icon: "▣", source: "DMS — Agra Pilot", query: "SELECT channel, reorder_rate FROM sensodyne_pilot WHERE district='Agra'", finding: "Pharmacy 92%, GT 28%. 3.3x advantage.", inference: "Replicable. This is how we beat price competition." },
        { agent: "Synthesis", icon: "✦", finding: null, inference: "Confidence: HIGH. Proven playbook. Apply to Mumbai immediately." },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════
  // PAST RECOMMENDATIONS
  // ═══════════════════════════════════════════════════════
  pastRecommendations: [
    { id: 1, quarter: "Q4 2025", month: "Dec", region: "UP East", type: "Channel Strategy",
      suggestion: "Pilot pharmacy-first distribution for ₹20 pack in Agra",
      executed: true, executedBy: "Agra ASM",
      outcome: "92% reorder rate achieved", outcomeValue: 92, outcomeType: "positive",
      detail: "Pharmacy channel delivered 92% reorder vs 28% in GT control. Trial-to-full conversion 58% vs 34%. Now being replicated." },
    { id: 2, quarter: "Q4 2025", month: "Nov", region: "Rajasthan", type: "Partnership",
      suggestion: "Partner with Jaipur Dental Association for recommendation program",
      executed: true, executedBy: "Rajasthan RSM",
      outcome: "82% dentist recommendation share", outcomeValue: 82, outcomeType: "positive",
      detail: "Association partnership drove 82% of member dentists to actively recommend Sensodyne. Created template for other state associations." },
    { id: 3, quarter: "Q3 2025", month: "Sep", region: "Delhi NCR", type: "Trial Pack",
      suggestion: "Launch ₹20 trial pack in pharmacy channel with dentist sampling",
      executed: true, executedBy: "Marketing Head",
      outcome: "41% trial-to-full conversion", outcomeValue: 41, outcomeType: "positive",
      detail: "₹20 entry point removed price barrier. Dentist sampling created recommendation trigger. Conversion 41% vs 28% for direct full-size purchase." },
    { id: 4, quarter: "Q3 2025", month: "Aug", region: "UP West", type: "E-commerce Defense",
      suggestion: "Increase Amazon A+ content and review response to defend against private labels",
      executed: false, executedBy: null,
      outcome: "E-comm share declined 1.2pp", outcomeValue: -1.2, outcomeType: "negative",
      detail: "Did not execute. Subsequently lost 1.2pp e-commerce share as Sensodent and private labels gained. Recommendation: e-commerce is not our moat — focus on pharmacy." },
  ],
};

// ═══════════════════════════════════════════════════════
// FUNNEL VIEW COMPONENT (copied from market-pulse)
// ═══════════════════════════════════════════════════════
const FunnelView = ({ stages, expandedStage, setExpandedStage, conversation, setConversation }) => {
  const expanded = stages.find(s => s.id === expandedStage);
  
  const handlePromptClick = (prompt) => {
    setConversation(prev => [...prev, { role: "user", text: prompt.q }, { role: "assistant", text: prompt.a }]);
  };
  
  const askedQuestions = conversation.filter(m => m.role === "user").map(m => m.text);
  const remainingPrompts = expanded?.prompts.filter(p => !askedQuestions.includes(p.q)) || [];
  
  return (
    <div>
      <div style={{ 
        display: "flex", 
        alignItems: "stretch",
        background: C.card,
        border: `1px solid ${C.border}`,
        overflow: "hidden"
      }}>
        {stages.map((stage, i) => {
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
            >
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
            </div>
          );
        })}
      </div>
      
      {expanded && (
        <div style={{ 
          ...cardBase, 
          marginTop: -1, 
          borderTop: "none",
          overflow: "hidden",
        }}>
          <div style={{ 
            display: "flex", alignItems: "center", justifyContent: "space-between", 
            padding: "16px 24px",
            borderBottom: `1px solid ${C.border}`,
            background: C.page,
          }}>
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{expanded.name}</span>
              <span style={{ fontSize: 13, color: C.textMid, marginLeft: 12 }}>
                {expanded.metrics.map(m => `${m.label}: ${m.value}`).join("  ·  ")}
              </span>
            </div>
            <div 
              onClick={(e) => { e.stopPropagation(); setExpandedStage(null); setConversation([]); }}
              style={{ fontSize: 12, color: C.textLight, cursor: "pointer", padding: "4px 8px" }}
            >✕</div>
          </div>
          
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
                  Ask Questt about {expanded.name.toLowerCase()}
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
                      }}
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
                        <div style={{ fontSize: 10, color: C.green, fontWeight: 600, marginBottom: 8 }}>
                          ◈ Questt
                        </div>
                      )}
                      <div style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                
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
                        }}
                      >
                        {p.q}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
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
// COMPONENTS - ICONS & BADGES
// ═══════════════════════════════════════════════════════
const SeverityIcon = ({ severity }) => {
  const isC = severity === "critical";
  return <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: isC ? C.redPale : C.orangePale, color: isC ? C.red : C.orange, fontSize: 14, flexShrink: 0 }}>{isC ? "!" : "◷"}</div>;
};

const PriorityBadge = ({ p }) => {
  const s = { critical: { bg: C.redPale, color: C.red, l: "CRITICAL" }, high: { bg: C.orangePale, color: C.orange, l: "HIGH PRIORITY" } }[p] || { bg: C.greenPale, color: C.green, l: "MEDIUM" };
  return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", padding: "3px 10px", background: s.bg, color: s.color }}>{s.l}</span>;
};

// ═══════════════════════════════════════════════════════
// INSIGHT CARD COMPONENT - PORTFOLIO STYLE
// ═══════════════════════════════════════════════════════
const InsightCard = ({ insight, isExpanded, onToggle, onShowTrail }) => (
  <div style={{ ...cardBase, marginBottom: 12, overflow: "hidden" }}>
    {/* Collapsed Header */}
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
        <span style={{ ...label, fontSize: 10 }}>{insight.type}</span>
        <span onClick={onToggle} style={{ fontSize: 12, color: C.sage, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", cursor: "pointer" }}>▾</span>
      </div>
    </div>

    {/* Expanded Content */}
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

        {/* Suggested Actions */}
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
          
          {/* Past Validation inline */}
          {insight.pastValidation && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.borderLight}`, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>✓ Similar action: {insight.pastValidation.outcome}</span>
              <span style={{ fontSize: 11, color: C.textLight }}>({insight.pastValidation.title})</span>
            </div>
          )}
        </div>

        {/* Supporting Evidence */}
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
// TERRITORY ROW COMPONENT
// ═══════════════════════════════════════════════════════
const TerritoryRow = ({ t, isExpanded, onToggle }) => (
  <div style={{ ...cardBase, marginBottom: 8, overflow: "hidden" }}>
    <div onClick={onToggle} style={{ padding: "18px 24px", cursor: "pointer", display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ width: 120 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{t.name}</div>
        <div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{t.asmAreas.length} ASM areas</div>
      </div>
      <div style={{ width: 80 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.achievement >= 90 ? C.green : t.achievement >= 75 ? C.orange : C.red }}>{t.achievement}%</div>
        <div style={{ fontSize: 10, color: C.textLight }}>Achievement</div>
      </div>
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height={32}>
          <BarChart data={t.weeklyTrend} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Bar dataKey="v" fill={t.status === "on-track" ? C.green : t.status === "needs-attention" ? C.orange : C.red} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ 
        padding: "4px 10px", 
        fontSize: 10, 
        fontWeight: 600,
        background: t.status === "on-track" ? C.greenPale : t.status === "needs-attention" ? C.orangePale : C.redPale,
        color: t.status === "on-track" ? C.green : t.status === "needs-attention" ? C.orange : C.red,
      }}>
        {t.status.toUpperCase().replace("-", " ")}
      </div>
      <div style={{ fontSize: 18, color: C.textLight, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>⌄</div>
    </div>
    
    {isExpanded && (
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "20px 24px", background: C.page }}>
        <div style={{ fontSize: 14, color: C.text, lineHeight: 1.6, marginBottom: 16 }}>{t.narrative}</div>
        
        <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
          <div style={{ flex: 1, padding: "12px 16px", background: C.greenPale, borderLeft: `3px solid ${C.green}` }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: C.green, marginBottom: 4 }}>KEY WIN</div>
            <div style={{ fontSize: 13, color: C.text }}>{t.keyWin}</div>
          </div>
          <div style={{ flex: 1, padding: "12px 16px", background: C.orangePale, borderLeft: `3px solid ${C.orange}` }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: C.orange, marginBottom: 4 }}>KEY RISK</div>
            <div style={{ fontSize: 13, color: C.text }}>{t.keyRisk}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
          {t.metrics.map((m, i) => (
            <div key={i} style={{ flex: 1, padding: "12px 16px", background: C.card, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 10, color: C.textLight, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: m.negative ? C.red : C.text }}>{m.value}</div>
              <div style={{ fontSize: 10, color: C.textLight }}>{m.note}</div>
            </div>
          ))}
        </div>

        <div style={{ ...label, fontSize: 9, marginBottom: 10 }}>ASM BREAKDOWN</div>
        {t.asmAreas.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", background: C.card, border: `1px solid ${C.borderLight}`, marginBottom: 6 }}>
            <div style={{ width: 160, fontSize: 13, fontWeight: 500, color: C.text }}>{a.name}</div>
            <div style={{ width: 60, fontSize: 16, fontWeight: 700, color: a.ach >= 90 ? C.green : a.ach >= 75 ? C.orange : C.red }}>{a.ach}%</div>
            <div style={{ width: 80, fontSize: 13, color: C.text }}>{a.primary}</div>
            <div style={{ width: 60, fontSize: 12, color: a.delta.startsWith("+") ? C.green : a.delta.startsWith("-") ? C.red : C.textMid }}>{a.delta}</div>
            <div style={{ width: 50, fontSize: 12, color: C.textMid }}>{a.dist}</div>
            <div style={{ flex: 1, fontSize: 11, color: a.flag ? C.orange : C.textLight, fontStyle: a.flag ? "normal" : "italic" }}>{a.flag || "No flags"}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ═══════════════════════════════════════════════════════
// AGENT TRAIL MODAL
// ═══════════════════════════════════════════════════════
const AgentTrailModal = ({ insight, onClose }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }} onClick={onClose}>
    <div style={{ width: 800, maxHeight: "80vh", background: C.card, overflow: "auto" }} onClick={e => e.stopPropagation()}>
      <div style={{ padding: "20px 28px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>Agent Reasoning Trail</div>
          <div style={{ fontSize: 13, color: C.textMid, marginTop: 4 }}>{insight.headline}</div>
        </div>
        <div onClick={onClose} style={{ fontSize: 20, color: C.textLight, cursor: "pointer" }}>✕</div>
      </div>
      <div style={{ padding: "24px 28px" }}>
        {insight.agentTrail.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 32, height: 32, background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.green, flexShrink: 0 }}>{step.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.green, marginBottom: 6 }}>{step.agent}</div>
              {step.action && <div style={{ fontSize: 13, color: C.text, marginBottom: 8 }}>{step.action}</div>}
              {step.routing && <div style={{ fontSize: 12, color: C.textMid, fontStyle: "italic", marginBottom: 8 }}>{step.routing}</div>}
              {step.source && <div style={{ fontSize: 11, color: C.blue, marginBottom: 6 }}>Source: {step.source}</div>}
              {step.query && <div style={{ fontSize: 11, color: C.textLight, fontFamily: "monospace", background: C.page, padding: "8px 12px", marginBottom: 8, overflow: "auto" }}>{step.query}</div>}
              {step.finding && <div style={{ fontSize: 13, color: C.text, marginBottom: 6 }}><strong>Finding:</strong> {step.finding}</div>}
              {step.inference && <div style={{ fontSize: 13, color: C.textMid, borderLeft: `2px solid ${C.sage}`, paddingLeft: 12 }}><strong>Inference:</strong> {step.inference}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════
export default function SensodyneBrandPulse() {
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [expandedTerritory, setExpandedTerritory] = useState(null);
  const [expandedStage, setExpandedStage] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [trailInsight, setTrailInsight] = useState(null);
  
  const data = brandData;

  return (
    <div className="overflow-auto" style={{ height: "100vh", background: C.page }}>
      {/* Header */}
      <div style={{ background: C.header, padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 300, color: "#FFFFFF", letterSpacing: "-0.02em" }}>Market Pulse</div>
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.2)" }} />
          <div style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF" }}>Sensodyne</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginLeft: 8 }}>{data.tagline}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Week ending Feb 2, 2026</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        
        {/* Brand Summary */}
        <div style={{ ...cardBase, padding: "24px 28px", marginBottom: 24 }}>
          <div style={{ fontSize: 15, color: C.text, lineHeight: 1.7, marginBottom: 20 }}>{data.summary}</div>
          <div style={{ display: "flex", gap: 24 }}>
            {data.kpis.map((kpi, i) => (
              <div key={i} style={{ flex: 1, padding: "16px 20px", background: C.page }}>
                <div style={{ ...label, fontSize: 9, marginBottom: 8 }}>{kpi.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: kpi.negative ? C.orange : C.green }}>{kpi.value}</div>
                <div style={{ fontSize: 12, color: C.textMid, marginTop: 4 }}>{kpi.delta}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Consumer Funnel */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 20, fontWeight: 400, margin: 0 }}>Consumer Journey</h2>
            <span style={{ fontSize: 12, color: C.textLight }}>Click to explore</span>
          </div>
          <FunnelView 
            stages={data.funnelStages}
            expandedStage={expandedStage}
            setExpandedStage={setExpandedStage}
            conversation={conversation}
            setConversation={setConversation}
          />
        </div>

        {/* Insights */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 20, fontWeight: 400, margin: "0 0 16px" }}>Insights & Decisions</h2>
          {data.insights.map(ins => (
            <InsightCard 
              key={ins.id} 
              insight={ins} 
              isExpanded={expandedInsight === ins.id} 
              onToggle={() => setExpandedInsight(expandedInsight === ins.id ? null : ins.id)} 
              onShowTrail={setTrailInsight}
            />
          ))}
        </div>

        {/* Territory Overview */}
        <div>
          <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 20, fontWeight: 400, margin: "0 0 16px" }}>Territory Overview</h2>
          {data.regions.map(t => (
            <TerritoryRow 
              key={t.name} 
              t={t} 
              isExpanded={expandedTerritory === t.name} 
              onToggle={() => setExpandedTerritory(expandedTerritory === t.name ? null : t.name)} 
            />
          ))}
        </div>
      </div>

      {/* Agent Trail Modal */}
      {trailInsight && <AgentTrailModal insight={trailInsight} onClose={() => setTrailInsight(null)} />}
    </div>
  );
}

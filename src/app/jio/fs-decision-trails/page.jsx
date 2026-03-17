"use client"
import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════
// COLORS
// ═══════════════════════════════════════════════════════════
const KG = {
  user: { color: "#185FA5", bg: "#E6F1FB", light: "#F0F7FD", label: "User KG" },
  product: { color: "#D85A30", bg: "#FAECE7", light: "#FDF5F2", label: "Product KG" },
  agent: { color: "#2D5A3D", bg: "#E1F5EE", light: "#F0FAF5", label: "Agent" },
  decision: { color: "#534AB7", bg: "#EEEDFE", light: "#F5F4FF", label: "Decision" },
};

const LAYER = {
  ontology: { shape: "circle", label: "Entity" },
  metrics: { shape: "diamond", label: "Metric" },
  decisions: { shape: "triangle", label: "Decision" },
};

const DC = {
  identity: "#185FA5", banking: "#0F6E56", lending: "#D85A30", insurance: "#534AB7",
  investment: "#639922", credit: "#993556", behavioral: "#BA7517", interaction: "#5F5E5A",
  external: "#A32D2D", product_catalog: "#1D9E75", strategy: "#378ADD",
  risk_framework: "#D85A30", regulatory: "#7F77DD", collections_fw: "#993556",
  underwriting_fw: "#BA7517", market: "#E24B4A",
};

// ═══════════════════════════════════════════════════════════
// 3 DECISION TRAILS
// ═══════════════════════════════════════════════════════════
const TRAILS = [
  {
    id: "collections",
    title: "Collection treatment decision",
    subtitle: "Who to collect from, when, how, and with what tone",
    outcome: "Preemptive restructuring via app — not standard collections",
    customer: "Rajesh M., 45, salaried, personal loan ₹4.8L outstanding, 0 DPD (current)",
    steps: [
      {
        kg: "user", layer: "ontology", pass: 1,
        title: "Pull account & credit snapshot",
        nodes: [
          { id: "PersonalLoan", domain: "lending", layer: "ontology" },
          { id: "BureauProfile", domain: "credit", layer: "ontology" },
          { id: "CASA", domain: "banking", layer: "ontology" },
          { id: "ECSMandate", domain: "banking", layer: "ontology" },
        ],
        edges: [
          "Customer → HOLDS → PersonalLoan",
          "Customer → HAS_BUREAU → BureauProfile",
          "Customer → HOLDS → CASA",
          "CASA → HAS_MANDATE → ECSMandate",
        ],
        inference: "PL: ₹4.8L outstanding, 18mo remaining, 0 DPD. Bureau: 680 (was 720 three months ago, dropped 40pts). CASA avg balance dropped 34% in 3 months. ECS mandate active — no bounces yet.",
        carry: "Currently on-time but deteriorating fast. Bureau trajectory and CASA trend are early warning signals.",
      },
      {
        kg: "product", layer: "ontology", pass: 1,
        title: "Fetch early warning thresholds",
        nodes: [
          { id: "EWFramework", domain: "risk_framework", layer: "ontology" },
          { id: "DelinqScorecard", domain: "risk_framework", layer: "ontology" },
        ],
        edges: [
          "EWFramework → USES_MODEL → DelinqScorecard",
        ],
        inference: "EW rules say: bureau drop >30pts in 90 days + CASA decline >25% = AMBER flag. This customer hits both thresholds. Scorecard feature weights: bureau_trajectory (0.28), casa_trend (0.22), emi_burden (0.18), behavioral_signals (0.32).",
        carry: "AMBER flag triggered. But need to understand WHY before choosing treatment.",
      },
      {
        kg: "user", layer: "metrics", pass: 2,
        title: "Compute risk metrics & root cause",
        nodes: [
          { id: "BureauTrajectory", domain: "credit", layer: "metrics" },
          { id: "CASATrend", domain: "banking", layer: "metrics" },
          { id: "LoanStress", domain: "lending", layer: "metrics" },
          { id: "EMIIncomeRatio", domain: "lending", layer: "metrics" },
          { id: "DelinquencyRisk", domain: "lending", layer: "metrics" },
        ],
        edges: [
          "BureauProfile → USES_INPUT → BureauTrajectory",
          "CASA → USES_INPUT → CASATrend",
          "SMS:Medical + BNPL + CreditCard → USES_INPUT → LoanStress",
          "DelinquencyRisk → USES_METRIC → CollectionPriority",
        ],
        inference: "Bureau trajectory: −40pts (critical). CASA trend: −34% (critical). Loan stress pattern detected: salary credit dropped 22%, 3 new BNPL in 60 days, ₹85K medical spend over 2 months, CC utilization jumped 40% → 78%. EMI/income ratio: 52% (was 38%). Delinquency risk score: 0.73 (high).",
        carry: "Root cause identified: medical expense + income drop + compensatory borrowing. This is a STRESS pattern, not a WILLFUL pattern.",
      },
      {
        kg: "user", layer: "ontology", pass: 3,
        title: "Check behavioral signals deep dive",
        nodes: [
          { id: "SMS:Salary", domain: "behavioral", layer: "ontology" },
          { id: "SMS:Medical", domain: "behavioral", layer: "ontology" },
          { id: "SMS:Loans", domain: "behavioral", layer: "ontology" },
          { id: "CreditCard", domain: "credit", layer: "ontology" },
          { id: "OffUsLoans", domain: "lending", layer: "ontology" },
        ],
        edges: [
          "SMS:Salary → ENRICHES → Demographics",
          "SMS:Medical → ENRICHES → LifeStage",
          "SMS:Loans → DETECTED → OffUsLoans",
          "SMS:Loans → DETECTED → BNPL",
        ],
        inference: "SMS:Salary shows salary dropped from ₹68K to ₹53K (22% cut — likely pay cut not job loss, same employer). Medical SMS: recurring payments to Fortis Hospital, ₹85K cumulative. SMS:Loans: 3 BNPL conversions on Flipkart/Amazon (₹12K, ₹8K, ₹15K). Off-us: new EMI appeared via ECS from Bajaj Finance ₹3,200/mo. Bureau won't show this for 3 months — SMS caught it now.",
        carry: "Full behavioral picture: medical crisis → income reduced → borrowing to bridge → credit stress cascading. SMS data is 3 months ahead of bureau.",
      },
      {
        kg: "product", layer: "ontology", pass: 2,
        title: "Match pattern to treatment strategy",
        nodes: [
          { id: "TreatmentMatrix", domain: "collections_fw", layer: "ontology" },
          { id: "CollJourney", domain: "collections_fw", layer: "ontology" },
          { id: "VulnerabilityRules", domain: "collections_fw", layer: "ontology" },
        ],
        edges: [
          "VulnerabilityRules → CONSTRAINS → TreatmentMatrix",
          "TreatmentMatrix → STAGE_OF → CollJourney",
        ],
        inference: "Treatment matrix: income-stress + medical-expense pattern = 'vulnerable customer' segment. Vulnerability rules (RBI fair practices): do NOT escalate to standard collections. Do NOT use aggressive outbound calling. Treatment: offer EMI restructuring — extend tenure, reduce monthly burden. Option: 2-month payment holiday. Route to financial wellness advisor.",
        carry: "Treatment locked: empathetic restructuring, not collections. Now need to determine channel.",
      },
      {
        kg: "user", layer: "ontology", pass: 4,
        title: "Determine contact strategy",
        nodes: [
          { id: "DigitalInteraction", domain: "interaction", layer: "ontology" },
          { id: "Complaint", domain: "interaction", layer: "ontology" },
          { id: "CallCenter", domain: "interaction", layer: "ontology" },
          { id: "ChannelResponse", domain: "interaction", layer: "metrics" },
        ],
        edges: [
          "DigitalInteraction → USES_INPUT → ChannelResponse",
          "Complaint → USES_INPUT → OptimalChannel",
        ],
        inference: "Channel response: SMS 80% open rate, app notification 72% tap rate, call pickup 40% (afternoons only). SENSITIVITY FLAG: filed complaint about aggressive collection calls from credit card team 2 years ago. Previously responded positively to a proactive restructuring offer on CC. Digital-first customer.",
        carry: "Channel: app notification primary, SMS fallback. NO outbound calls — sensitivity flag.",
      },
      {
        kg: "product", layer: "metrics", pass: 3,
        title: "Validate treatment effectiveness",
        nodes: [
          { id: "TreatmentEffect", domain: "collections_fw", layer: "metrics" },
          { id: "EWAccuracy", domain: "risk_framework", layer: "metrics" },
        ],
        edges: [
          "TreatmentMatrix → USES_INPUT → TreatmentEffect",
          "EWFramework → USES_INPUT → EWAccuracy",
        ],
        inference: "Historical data: for vulnerable-medical segment, restructuring at pre-delinquency stage has 73% success rate (customer stays current) vs 41% if standard collections triggered after first 30+ DPD. EW model accuracy for this pattern: 82% precision, 76% recall.",
        carry: "Strong evidence for preemptive action. 73% vs 41% is the business case.",
      },
      {
        kg: "decision", layer: "decisions", pass: 0,
        title: "Collection Treatment → Decision",
        nodes: [
          { id: "CollectionTreatment", domain: "collections_fw", layer: "decisions" },
        ],
        edges: [
          "CollectionPriority → USES_METRIC → CollectionTreatment",
          "RollForwardProb → USES_METRIC → CollectionTreatment",
          "TreatmentMatrix → USES_INPUT → CollectionTreatment",
          "VulnerabilityRules → USES_INPUT → CollectionTreatment",
          "Complaint → USES_INPUT → CollectionTreatment",
        ],
        inference: null,
        carry: null,
        decision: {
          flag: "Early intervention — Vulnerable, High sensitivity",
          action: "Send app notification offering EMI restructuring with one-tap acceptance. Extend PL tenure by 12 months: EMI drops ₹8,200 → ₹5,100/mo. Offer 2-month payment holiday.",
          channel: "Primary: app notification. Fallback: SMS in 5 days. NO outbound calls.",
          rm_brief: "RM briefed with full context: medical stress, income reduction, sensitivity flag. Empathetic tone required.",
          predicted: "73% probability of avoiding 30+ DPD with restructure now vs 41% with standard collections post-miss.",
        },
      },
    ],
  },
  {
    id: "sales",
    title: "Insurance sales pitch decision",
    subtitle: "What to pitch, in what order, through which channel, with what script",
    outcome: "Term plan-first pitch via app notification — not ULIP",
    customer: "Priya S., 32, female, home loan ₹40L, MF SIP ₹5K/mo, non-PASA",
    steps: [
      {
        kg: "user", layer: "ontology", pass: 1,
        title: "Read customer profile",
        nodes: [
          { id: "Customer", domain: "identity", layer: "ontology" },
          { id: "Demographics", domain: "identity", layer: "ontology" },
          { id: "HomeLoan", domain: "lending", layer: "ontology" },
          { id: "MutualFund", domain: "investment", layer: "ontology" },
          { id: "Cohort", domain: "identity", layer: "ontology" },
        ],
        edges: [
          "Customer → HAS_PROFILE → Demographics",
          "Customer → HOLDS → HomeLoan",
          "Customer → HOLDS → MutualFund",
          "Customer → BELONGS_TO → Cohort",
        ],
        inference: "Female, 32, income ₹12L (non-HNI). Holds home loan ₹40L (36mo in, 204 remaining). MF SIP: ₹5K/mo into ELSS + mid-cap. No existing insurance. Cohort: HL × 21-35 × Non-HNI × F × Non-PASA.",
        carry: "Profile loaded. Key signal: NO insurance at all despite home loan and dependents.",
      },
      {
        kg: "product", layer: "ontology", pass: 1,
        title: "Retrieve cohort pitch rules",
        nodes: [
          { id: "CohortRules", domain: "strategy", layer: "ontology" },
          { id: "PitchStrategy", domain: "strategy", layer: "ontology" },
          { id: "ProductStrategy", domain: "strategy", layer: "ontology" },
        ],
        edges: [
          "CohortRules → INFORMS → PitchStrategy",
          "PitchStrategy → ALIGNED_TO → ProductStrategy",
        ],
        inference: "Cohort HL × 21-35 × Non-HNI × F × Non-PASA: pitch tree starts with 'securing home loan' angle. Branch: need loan cover → Pure Term Plan. Need faster repay → Discipline Savings. Check travel/investment intent. Q1 product strategy: term insurance push, 15% higher commission this quarter.",
        carry: "Generic cohort rules loaded. Need life stage to refine — cohort alone would lead with generic HL angle.",
      },
      {
        kg: "user", layer: "ontology", pass: 2,
        title: "Extract life stage signals",
        nodes: [
          { id: "LifeStage", domain: "identity", layer: "ontology" },
          { id: "CallCenter", domain: "interaction", layer: "ontology" },
          { id: "SMS:Medical", domain: "behavioral", layer: "ontology" },
          { id: "SMS:Merchant", domain: "behavioral", layer: "ontology" },
        ],
        edges: [
          "CallCenter → ENRICHES → LifeStage",
          "SMS:Medical → ENRICHES → LifeStage",
          "SMS:Merchant → category → LifeStage",
        ],
        inference: "Call transcript (6 months ago): customer called to update address — mentioned 'we just moved into our new flat, my husband and I'. No mention of children. SMS:Merchant: baby product purchases started 3 weeks ago (Amazon, FirstCry). SMS:Medical: OB/GYN consultation payment ₹2,500. Life stage inference: married, possibly expecting first child. Confidence: 0.78.",
        carry: "Life stage = married, likely pregnant/new parent. This COMPLETELY changes the pitch priority.",
      },
      {
        kg: "product", layer: "ontology", pass: 2,
        title: "Overlay life stage on pitch strategy",
        nodes: [
          { id: "PitchStrategy", domain: "strategy", layer: "ontology" },
          { id: "TermProducts", domain: "product_catalog", layer: "ontology" },
          { id: "HealthProducts", domain: "product_catalog", layer: "ontology" },
          { id: "Pricing", domain: "product_catalog", layer: "ontology" },
        ],
        edges: [
          "PitchStrategy → life_stage_rules → override",
          "Pricing → PRICES → TermProducts",
          "Pricing → PRICES → HealthProducts",
        ],
        inference: "Life stage override: married + expecting + home loan = PROTECTION-FIRST. Do not lead with ULIP or investment (she already has MF SIP — investment intent satisfied). Lead with: 'Your family is growing, your home loan is ₹40L — if something happens to you, who covers it?' Product: Pure Term Plan, ₹1Cr cover, ≈₹8K/yr at age 32 female. Secondary: health insurance family floater before baby arrives (pre-existing exclusion window). Tertiary: Discipline Savings for child education — but NOT in first conversation.",
        carry: "Pitch rewritten: protection gap → term plan → health → education. NOT the generic cohort path.",
      },
      {
        kg: "user", layer: "metrics", pass: 3,
        title: "Quantify the protection gap",
        nodes: [
          { id: "CoverageGap", domain: "insurance", layer: "metrics" },
          { id: "ProtectionWB", domain: "insurance", layer: "metrics" },
          { id: "WellBeingScore", domain: "identity", layer: "metrics" },
        ],
        edges: [
          "TermPlan + HealthInsurance + LifeStage → USES_INPUT → CoverageGap",
          "CoverageGap → USES_METRIC → ProtectionWB",
          "ProtectionWB → USES_METRIC → WellBeingScore",
        ],
        inference: "Current insurance: ₹0 (none). Ideal cover for life stage (married, HL ₹40L, expecting): ₹1Cr minimum term + ₹10L health floater. Coverage gap: ₹1Cr term + ₹10L health. Protection WB score: 0.0 out of 1.0 — worst possible. Overall well-being: Investment 0.6, Savings 0.4, Protection 0.0, Risk 0.7, Tax 0.5 → composite 0.44.",
        carry: "Protection is the single biggest gap. The number ₹1Cr makes the pitch concrete.",
      },
      {
        kg: "user", layer: "interaction", pass: 4,
        title: "Channel + timing optimization",
        nodes: [
          { id: "DigitalInteraction", domain: "interaction", layer: "ontology" },
          { id: "CampaignResponse", domain: "interaction", layer: "ontology" },
          { id: "ChannelResponse", domain: "interaction", layer: "metrics" },
          { id: "SMS:Salary", domain: "behavioral", layer: "ontology" },
        ],
        edges: [
          "DigitalInteraction + CampaignResponse → USES_INPUT → ChannelResponse",
          "SMS:Salary → credit_date → timing",
        ],
        inference: "Channel response: app notification 82% tap, email 45% open (opened last 3 campaigns), calls — answered 1 of 5 (dislikes calls). Salary credit: 1st of every month. Best timing: salary day + 3 days (disposable income feeling). Weekend engagement 2.3× higher than weekday.",
        carry: "Channel: app notification on Saturday after salary week. Follow up with email. No calls.",
      },
      {
        kg: "decision", layer: "decisions", pass: 0,
        title: "Pitch Generation → Decision",
        nodes: [
          { id: "NextBestProduct", domain: "identity", layer: "decisions" },
          { id: "PitchSequence", domain: "strategy", layer: "decisions" },
          { id: "PitchGeneration", domain: "strategy", layer: "decisions" },
        ],
        edges: [
          "WellBeingScore + CoverageGap + CohortRules → NextBestProduct",
          "LifeStage + PitchStrategy + CohortConversion → PitchSequence",
          "NextBestProduct + PitchSequence + Demographics → PitchGeneration",
        ],
        inference: null, carry: null,
        decision: {
          flag: "High-value prospect — zero protection, growing family, strong savings behavior",
          action: "\"Priya, congratulations on your new home! With a ₹40L home loan and your family growing, a ₹1Cr term plan at just ₹8K/year ensures your family is covered no matter what. That's less than your monthly SIP.\"",
          channel: "App notification Saturday morning (Feb 8, salary week). Email follow-up Monday with quote calculator link.",
          rm_brief: "Do NOT pitch ULIP — she already invests via SIP. Lead 100% with protection gap. Secondary: health floater before baby (pre-existing window closes). Discipline Savings for education only if she asks about child planning.",
          predicted: "Cohort conversion rate for protection-first pitch to this life stage: 34% (vs 12% for generic cohort pitch).",
        },
      },
    ],
  },
  {
    id: "underwriting",
    title: "MSME underwriting decision",
    subtitle: "Risk score, narrative, and go/no-go for Jio Credit loan",
    outcome: "Conditional approval with physical verification",
    customer: "Vikram P., 38, pharmacist in Jaipur, applying for ₹15L business loan",
    steps: [
      {
        kg: "user", layer: "ontology", pass: 1,
        title: "Application data ingestion",
        nodes: [
          { id: "MSMELoan", domain: "lending", layer: "ontology" },
          { id: "MSMEPersona", domain: "identity", layer: "ontology" },
          { id: "Demographics", domain: "identity", layer: "ontology" },
          { id: "BureauProfile", domain: "credit", layer: "ontology" },
        ],
        edges: [
          "Customer → CLASSIFIED_AS → MSMEPersona",
          "Customer → HAS_PROFILE → Demographics",
          "Customer → HAS_BUREAU → BureauProfile",
          "MSMELoan → application_data",
        ],
        inference: "Applicant: Vikram P., 38, Jaipur urban. Business: pharmacy, 12-year vintage. Loan request: ₹15L for inventory expansion. GST filed: regular (last 8 quarters). ITR submitted: 2 years. Declared income: ₹4.2L/yr. Bureau: 718, 2 active loans (bike ₹1.2L, credit card ₹50K limit), 0 DPD.",
        carry: "Clean bureau, regular GST. But declared income ₹4.2L vs ₹15L ticket — income seems low for the ask. Need persona benchmarking.",
      },
      {
        kg: "product", layer: "ontology", pass: 1,
        title: "Fetch persona benchmarks",
        nodes: [
          { id: "PersonaBenchmarks", domain: "underwriting_fw", layer: "ontology" },
          { id: "UWRules", domain: "underwriting_fw", layer: "ontology" },
          { id: "IncomeValidation", domain: "underwriting_fw", layer: "ontology" },
        ],
        edges: [
          "UWRules → REFERENCES → PersonaBenchmarks",
          "IncomeValidation → FEEDS → UWRules",
        ],
        inference: "Persona: Pharmacist, Jaipur urban. Historical data (47 loans): avg ticket ₹11L, approval rate 74%, avg NPA rate 2.1%. Income benchmark for pharmacy (Jaipur urban): ₹5.5L–₹9L declared, ₹8L–₹14L actual (cash-heavy business, declared income typically 50-65% of actual). UW rules: if declared_income / ticket_size < 0.35, trigger additional validation. Here: 4.2/15 = 0.28 — below threshold.",
        carry: "Declared income is below threshold for ticket size. But persona benchmark says pharmacists typically under-declare. Need additional income signals.",
      },
      {
        kg: "user", layer: "ontology", pass: 2,
        title: "Deep income investigation via SMS + AA",
        nodes: [
          { id: "SMS:Banking", domain: "behavioral", layer: "ontology" },
          { id: "SMS:Salary", domain: "behavioral", layer: "ontology" },
          { id: "SMS:UPI", domain: "behavioral", layer: "ontology" },
          { id: "AccountAggregator", domain: "external", layer: "ontology" },
          { id: "DerivedBehavioral", domain: "behavioral", layer: "ontology" },
        ],
        edges: [
          "SMS:Banking → SIGNALS → CASA",
          "AccountAggregator → REVEALS → cross-bank data",
          "DerivedBehavioral → DERIVED_FROM → SMS:Banking + SMS:Salary",
        ],
        inference: "SMS banking: CASA average monthly credits ₹6.8L (significantly higher than declared ₹4.2L annual — monthly credits suggest ₹8L+ actual annual). UPI: 200+ merchant receipts/month (active pharmacy with high footfall). AA data: second savings account at SBI with ₹3.2L balance. No additional loans beyond bureau. Derived: monthly income estimate ₹68K (₹8.2L annual), cashflow volatility: low (pharmacy is stable), EMI burden: 12% (healthy).",
        carry: "Actual income ≈ ₹8.2L vs declared ₹4.2L. Consistent with persona benchmark. EMI burden healthy. But gap between declared and actual needs documentation.",
      },
      {
        kg: "user", layer: "ontology", pass: 3,
        title: "Check 3P benchmarking data",
        nodes: [
          { id: "3PIncomeBench", domain: "external", layer: "ontology" },
          { id: "IncomeStability", domain: "behavioral", layer: "metrics" },
        ],
        edges: [
          "3PIncomeBench → validates → MSMEPersona",
          "SMS:Salary → USES_INPUT → IncomeStability",
        ],
        inference: "DataSutram benchmark: pharmacies in Jaipur urban with 10+ year vintage average ₹7.5L–₹10L actual income. Vikram's estimated ₹8.2L falls mid-range — plausible. Income stability index: 0.87 (high — consistent monthly inflows, low seasonality). GST filing shows quarterly turnover ₹4.5–5.5L (annual ₹18–22L revenue, implying ₹7–9L income at typical pharmacy margins).",
        carry: "Multiple sources corroborate ₹8L+ income. GST turnover math checks out. Income reconciliation score: 82%.",
      },
      {
        kg: "product", layer: "ontology", pass: 2,
        title: "Apply UW rules + PV trigger logic",
        nodes: [
          { id: "UWRules", domain: "underwriting_fw", layer: "ontology" },
          { id: "IncomeValidation", domain: "underwriting_fw", layer: "ontology" },
          { id: "NPAByPersona", domain: "underwriting_fw", layer: "metrics" },
        ],
        edges: [
          "IncomeValidation → confidence_thresholds → PV decision",
          "PersonaBenchmarks → USES_INPUT → NPAByPersona",
        ],
        inference: "Income reconciliation score: 82% (above 75% auto-approve threshold, but below 90% no-PV threshold). UW rules: 75-90% score with ticket >₹10L = conditional approval with physical verification. PV checklist for pharmacy: verify store lease, check inventory levels, daily footfall estimate, interview 2 neighboring shop owners. NPA for this persona-location: 2.1% — acceptable risk band.",
        carry: "Conditional approval. PV required because ticket is ₹15L with 82% income confidence. Not a reject — just needs ground-truthing.",
      },
      {
        kg: "decision", layer: "decisions", pass: 0,
        title: "UW Risk Score + Narrative → Decision",
        nodes: [
          { id: "UWRiskScore", domain: "underwriting_fw", layer: "decisions" },
          { id: "UWNarrative", domain: "underwriting_fw", layer: "decisions" },
        ],
        edges: [
          "MSMEPersona + BureauProfile + PersonaBenchmarks + NPAByPersona → UWRiskScore",
          "UWRiskScore + IncomeValidation + CallCenter → UWNarrative",
        ],
        inference: null, carry: null,
        decision: {
          flag: "Conditional approval — Physical verification required",
          action: "Risk score: 74/100 (Medium band). Approved at ₹12L (80% of requested ₹15L) pending PV. If PV confirms business viability, can increase to ₹15L. Rate: 14.5% (persona standard). Tenure: 48 months.",
          channel: "Notify applicant via app: 'Your loan is conditionally approved. Our representative will visit your pharmacy within 5 business days for verification.'",
          rm_brief: "\"Vikram P. is a pharmacist (12yr vintage) in Jaipur urban. Income reconciliation: 82% — declared ₹4.2L but SMS/AA/GST indicate ₹8.2L actual. Consistent with persona benchmark (₹7.5–10L). Bureau clean at 718. Key PV checks: store lease tenure, inventory value, daily footfall. Of 47 pharmacists in Rajasthan underwritten last 12 months, 35 approved, NPA rate 2.1%. Seasonal risk: low for pharmacy. Recommend approval at ₹12L, expandable to ₹15L post-PV.\"",
          predicted: "Persona-adjusted default probability: 3.2% (within acceptable band). Expected loss: ₹38K on ₹12L exposure.",
        },
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════
function NodeShape({ domain, layer, size = 14 }) {
  const c = DC[domain] || "#888";
  const s = size;
  if (layer === "ontology") return <svg width={s} height={s} viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill={c} stroke="#fff" strokeWidth="1.5" opacity="0.9"/></svg>;
  if (layer === "metrics") return <svg width={s} height={s} viewBox="0 0 20 20"><rect x="4" y="4" width="12" height="12" fill={c} stroke="#fff" strokeWidth="1.5" opacity="0.9" transform="rotate(45 10 10)" rx="1"/></svg>;
  return <svg width={s} height={s} viewBox="0 0 20 20"><polygon points="10,1 19,18 1,18" fill={c} stroke="#fff" strokeWidth="1.5" opacity="0.9"/></svg>;
}

function StepCard({ step, stepIdx, total, isActive }) {
  const kgStyle = KG[step.kg] || KG.agent;
  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${isActive ? kgStyle.color : "#E5E2DB"}`,
      borderRadius: 10,
      padding: "16px 20px",
      opacity: isActive ? 1 : 0.5,
      transition: "all 0.3s ease",
      boxShadow: isActive ? `0 0 0 3px ${kgStyle.bg}` : "none",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{
          fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
          padding: "3px 8px", borderRadius: 4, background: kgStyle.bg, color: kgStyle.color,
        }}>{kgStyle.label}{step.pass > 0 ? ` — pass ${step.pass}` : ""}</span>
        {step.layer && (
          <span style={{ fontSize: 9, color: "#999", fontWeight: 500 }}>{LAYER[step.layer]?.label}</span>
        )}
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#999" }}>{stepIdx + 1}/{total}</span>
      </div>

      <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: "#1C1C1C", marginBottom: 10 }}>
        {step.title}
      </div>

      {/* Nodes traversed */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {step.nodes.map((n, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 5, background: "#F5F3EF", border: "0.5px solid #E5E2DB" }}>
            <NodeShape domain={n.domain} layer={n.layer} size={12} />
            <span style={{ fontSize: 10, fontWeight: 500, color: "#1C1C1C" }}>{n.id}</span>
          </div>
        ))}
      </div>

      {/* Edges traversed */}
      {step.edges && step.edges.length > 0 && (
        <div style={{ marginBottom: 10, padding: "6px 10px", background: "#FAFAF8", borderRadius: 6, borderLeft: `3px solid ${kgStyle.color}` }}>
          {step.edges.map((e, i) => (
            <div key={i} style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#555", lineHeight: 1.6 }}>{e}</div>
          ))}
        </div>
      )}

      {/* Inference */}
      {step.inference && (
        <div style={{ fontSize: 12, color: "#1C1C1C", lineHeight: 1.6, marginBottom: 10 }}>
          {step.inference}
        </div>
      )}

      {/* Carry forward */}
      {step.carry && (
        <div style={{ padding: "8px 12px", background: KG.agent.bg, borderRadius: 6, fontSize: 11, color: KG.agent.color, fontWeight: 500, lineHeight: 1.5 }}>
          → {step.carry}
        </div>
      )}

      {/* Decision output */}
      {step.decision && (
        <div style={{ marginTop: 4 }}>
          <div style={{ padding: "10px 14px", background: KG.decision.light, border: `1px solid ${KG.decision.color}`, borderRadius: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: KG.decision.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {step.decision.flag}
            </div>
            {Object.entries(step.decision).filter(([k]) => k !== "flag").map(([key, val]) => (
              <div key={key} style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", color: "#999", marginBottom: 2 }}>{key.replace(/_/g, " ")}</div>
                <div style={{ fontSize: 11, color: "#1C1C1C", lineHeight: 1.5 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TraversalSummary({ steps }) {
  let userPasses = 0, productPasses = 0, nodesHit = 0, edgesTraversed = 0;
  steps.forEach(s => {
    if (s.kg === "user") userPasses++;
    if (s.kg === "product") productPasses++;
    nodesHit += s.nodes.length;
    edgesTraversed += (s.edges?.length || 0);
  });
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {[
        { label: "User KG passes", val: userPasses, color: KG.user.color },
        { label: "Product KG passes", val: productPasses, color: KG.product.color },
        { label: "Nodes traversed", val: nodesHit, color: "#1C1C1C" },
        { label: "Edges walked", val: edgesTraversed, color: "#1C1C1C" },
        { label: "Total passes", val: userPasses + productPasses, color: KG.agent.color },
      ].map(s => (
        <div key={s.label} style={{ padding: "8px 14px", background: "#fff", borderRadius: 6, border: "0.5px solid #E5E2DB", minWidth: 90 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.val}</div>
          <div style={{ fontSize: 9, color: "#999", fontWeight: 500 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [trailIdx, setTrailIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const stepRefs = useRef([]);

  const trail = TRAILS[trailIdx];
  const step = trail.steps[stepIdx];

  const switchTrail = (i) => { setTrailIdx(i); setStepIdx(0); };

  useEffect(() => {
    if (stepRefs.current[stepIdx]) {
      stepRefs.current[stepIdx].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [stepIdx]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); setStepIdx(s => Math.min(s + 1, trail.steps.length - 1)); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); setStepIdx(s => Math.max(s - 1, 0)); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [trail.steps.length]);

  return (
    <div className="overflow-auto" style={{ fontFamily: "'IBM Plex Sans', sans-serif", background: "#FAFAF8", height: "100vh", padding: "24px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#2D5A3D" }}>questt.</span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700 }}>Decision trails</span>
          </div>
          <div style={{ height: 2, width: 48, background: "#2D5A3D", margin: "4px 0 6px" }} />
          <div style={{ fontSize: 11, color: "#555" }}>How agents traverse both knowledge graphs to reach a conclusion</div>
        </div>

        {/* Trail selector */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
          {TRAILS.map((t, i) => (
            <button key={t.id} onClick={() => switchTrail(i)} style={{
              padding: "8px 14px", borderRadius: 6, fontSize: 11, cursor: "pointer", fontFamily: "inherit",
              border: `1px solid ${i === trailIdx ? "#2D5A3D" : "#E5E2DB"}`,
              background: i === trailIdx ? "#2D5A3D" : "#fff",
              color: i === trailIdx ? "#fff" : "#555",
              fontWeight: i === trailIdx ? 600 : 400,
            }}>{t.title}</button>
          ))}
        </div>

        {/* Trail header */}
        <div style={{ background: "#fff", border: "0.5px solid #E5E2DB", borderRadius: 10, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "#1C1C1C", marginBottom: 4 }}>{trail.title}</div>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>{trail.subtitle}</div>
          <div style={{ fontSize: 11, padding: "6px 10px", background: "#F5F3EF", borderRadius: 5, marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Customer: </span>{trail.customer}
          </div>
          <div style={{ fontSize: 11, padding: "6px 10px", background: KG.decision.light, borderRadius: 5, border: `0.5px solid ${KG.decision.color}` }}>
            <span style={{ fontWeight: 600, color: KG.decision.color }}>Outcome: </span>{trail.outcome}
          </div>
        </div>

        {/* Traversal summary */}
        <TraversalSummary steps={trail.steps} />

        {/* Step navigation dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "16px 0", justifyContent: "center" }}>
          {trail.steps.map((s, i) => {
            const kgc = KG[s.kg] || KG.agent;
            return (
              <div key={i} onClick={() => setStepIdx(i)} style={{
                width: i === stepIdx ? 28 : 10,
                height: 10,
                borderRadius: 5,
                background: i === stepIdx ? kgc.color : i < stepIdx ? kgc.color : "#E5E2DB",
                opacity: i === stepIdx ? 1 : i < stepIdx ? 0.4 : 0.3,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }} />
            );
          })}
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {trail.steps.map((s, i) => (
            <div key={i} ref={el => stepRefs.current[i] = el} onClick={() => setStepIdx(i)} style={{ cursor: "pointer" }}>
              <StepCard step={s} stepIdx={i} total={trail.steps.length} isActive={i === stepIdx} />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", position: "sticky", bottom: 12, background: "#FAFAF8", padding: "8px 0" }}>
          <button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} disabled={stepIdx === 0}
            style={{ padding: "8px 20px", borderRadius: 6, border: "0.5px solid #E5E2DB", background: stepIdx === 0 ? "#F5F3EF" : "#fff", color: stepIdx === 0 ? "#999" : "#555", fontSize: 12, cursor: stepIdx === 0 ? "default" : "pointer", fontFamily: "inherit" }}>
            ← Previous
          </button>
          <span style={{ fontSize: 10, color: "#999", alignSelf: "center" }}>Arrow keys to navigate</span>
          <button onClick={() => setStepIdx(Math.min(trail.steps.length - 1, stepIdx + 1))} disabled={stepIdx === trail.steps.length - 1}
            style={{ padding: "8px 20px", borderRadius: 6, border: `0.5px solid ${stepIdx === trail.steps.length - 1 ? "#E5E2DB" : "#2D5A3D"}`, background: stepIdx === trail.steps.length - 1 ? "#F5F3EF" : "#2D5A3D", color: stepIdx === trail.steps.length - 1 ? "#999" : "#fff", fontSize: 12, cursor: stepIdx === trail.steps.length - 1 ? "default" : "pointer", fontWeight: 600, fontFamily: "inherit" }}>
            Next →
          </button>
        </div>

        <div style={{ textAlign: "center", fontSize: 9, color: "#999", marginTop: 12 }}>questt. · JioFS Intelligence Warehouse · Decision Trails v1</div>
      </div>
    </div>
  );
}

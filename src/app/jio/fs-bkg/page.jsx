"use client"
import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

// ═══════════════════════════════════════════════════════════
// DOMAIN COLORS — matching Questt BKG system
// ═══════════════════════════════════════════════════════════
const DC = {
  identity: "#185FA5",
  banking: "#0F6E56",
  lending: "#D85A30",
  insurance: "#534AB7",
  investment: "#639922",
  credit: "#993556",
  behavioral: "#BA7517",
  interaction: "#5F5E5A",
  external: "#A32D2D",
  product_catalog: "#1D9E75",
  strategy: "#378ADD",
  risk_framework: "#D85A30",
  regulatory: "#7F77DD",
  collections_fw: "#993556",
  underwriting_fw: "#BA7517",
  market: "#E24B4A",
};

const DL = {
  identity: "Customer identity",
  banking: "Banking",
  lending: "Lending",
  insurance: "Insurance",
  investment: "Investment",
  credit: "Credit",
  behavioral: "Behavioral",
  interaction: "Interaction",
  external: "External / 3P",
  product_catalog: "Product catalog",
  strategy: "Strategy",
  risk_framework: "Risk framework",
  regulatory: "Regulatory",
  collections_fw: "Collections FW",
  underwriting_fw: "Underwriting FW",
  market: "Market / macro",
};

// ═══════════════════════════════════════════════════════════
// NODES — layer: ontology | metrics | decisions
//         kg: user | product | shared (decisions fed by both)
// ═══════════════════════════════════════════════════════════
const NODES = [
  // ─── USER KG: ONTOLOGY ───
  { id: "Customer", layer: "ontology", kg: "user", domain: "identity", r: 22, desc: "Core entity — every node connects here" },
  { id: "Demographics", layer: "ontology", kg: "user", domain: "identity", r: 14, desc: "Age, gender, location, income, occupation" },
  { id: "LifeStage", layer: "ontology", kg: "user", domain: "identity", r: 13, desc: "Married/single/parent — inferred from calls + SMS" },
  { id: "Cohort", layer: "ontology", kg: "user", domain: "identity", r: 14, desc: "72 segments: LOB × Age × Income × Gender × PASA" },
  { id: "MSMEPersona", layer: "ontology", kg: "user", domain: "identity", r: 12, desc: "Pharmacist / grocery / driver — UW segments" },
  { id: "CASA", layer: "ontology", kg: "user", domain: "banking", r: 15, desc: "Savings + current accounts" },
  { id: "FixedDeposit", layer: "ontology", kg: "user", domain: "banking", r: 11, desc: "Term deposits" },
  { id: "NMD", layer: "ontology", kg: "user", domain: "banking", r: 11, desc: "Non-maturity deposits — core vs non-core" },
  { id: "ECSMandate", layer: "ontology", kg: "user", domain: "banking", r: 10, desc: "Standing instructions — EMI, SIP, premium" },
  { id: "ChequeBounce", layer: "ontology", kg: "user", domain: "banking", r: 9, desc: "Failed instruments" },
  { id: "HomeLoan", layer: "ontology", kg: "user", domain: "lending", r: 14, desc: "Secured, longest tenure" },
  { id: "PersonalLoan", layer: "ontology", kg: "user", domain: "lending", r: 13, desc: "Unsecured — collections focus" },
  { id: "MSMELoan", layer: "ontology", kg: "user", domain: "lending", r: 13, desc: "Jio Credit core product" },
  { id: "BNPL", layer: "ontology", kg: "user", domain: "lending", r: 10, desc: "Buy-now-pay-later — from SMS" },
  { id: "OffUsLoans", layer: "ontology", kg: "user", domain: "lending", r: 11, desc: "Other lender loans — bureau + SMS" },
  { id: "TermPlan", layer: "ontology", kg: "user", domain: "insurance", r: 14, desc: "Pure protection" },
  { id: "HealthInsurance", layer: "ontology", kg: "user", domain: "insurance", r: 13, desc: "Medical coverage" },
  { id: "ULIP", layer: "ontology", kg: "user", domain: "insurance", r: 11, desc: "Insurance + investment hybrid" },
  { id: "DisciplineSavings", layer: "ontology", kg: "user", domain: "insurance", r: 10, desc: "Education / retirement savings plan" },
  { id: "UWEvent", layer: "ontology", kg: "user", domain: "insurance", r: 11, desc: "Underwriting → issuance pipeline" },
  { id: "MutualFund", layer: "ontology", kg: "user", domain: "investment", r: 13, desc: "MF / SIP holdings" },
  { id: "Portfolio", layer: "ontology", kg: "user", domain: "investment", r: 11, desc: "Aggregate investment view" },
  { id: "CreditCard", layer: "ontology", kg: "user", domain: "credit", r: 14, desc: "Revolving credit" },
  { id: "BureauProfile", layer: "ontology", kg: "user", domain: "credit", r: 15, desc: "CIBIL score + history" },
  { id: "SMS:Banking", layer: "ontology", kg: "user", domain: "behavioral", r: 11, desc: "Credit/debit alerts" },
  { id: "SMS:UPI", layer: "ontology", kg: "user", domain: "behavioral", r: 10, desc: "Digital payment signals" },
  { id: "SMS:Merchant", layer: "ontology", kg: "user", domain: "behavioral", r: 10, desc: "Spending patterns" },
  { id: "SMS:Loans", layer: "ontology", kg: "user", domain: "behavioral", r: 10, desc: "EMI, BNPL, overdue alerts" },
  { id: "SMS:Salary", layer: "ontology", kg: "user", domain: "behavioral", r: 11, desc: "Income signals" },
  { id: "SMS:Medical", layer: "ontology", kg: "user", domain: "behavioral", r: 10, desc: "Healthcare spend" },
  { id: "DerivedBehavioral", layer: "ontology", kg: "user", domain: "behavioral", r: 12, desc: "Finbox analytics — income, EMI burden, volatility" },
  { id: "CallCenter", layer: "ontology", kg: "user", domain: "interaction", r: 13, desc: "Transcripts, sentiment, intent" },
  { id: "DigitalInteraction", layer: "ontology", kg: "user", domain: "interaction", r: 11, desc: "App/web/email engagement" },
  { id: "Complaint", layer: "ontology", kg: "user", domain: "interaction", r: 11, desc: "Grievances — sensitivity flag" },
  { id: "CampaignResponse", layer: "ontology", kg: "user", domain: "interaction", r: 10, desc: "Marketing response data" },
  { id: "AccountAggregator", layer: "ontology", kg: "user", domain: "external", r: 12, desc: "Consent-based cross-bank data" },
  { id: "IIBData", layer: "ontology", kg: "user", domain: "external", r: 10, desc: "Insurance bureau benchmarks" },
  { id: "3PIncomeBench", layer: "ontology", kg: "user", domain: "external", r: 10, desc: "DataSutram — MSME validation" },
  { id: "TelcoSignals", layer: "ontology", kg: "user", domain: "external", r: 10, desc: "Jio ecosystem data" },

  // ─── PRODUCT KG: ONTOLOGY ───
  { id: "TermProducts", layer: "ontology", kg: "product", domain: "product_catalog", r: 13, desc: "Term plan variants" },
  { id: "HealthProducts", layer: "ontology", kg: "product", domain: "product_catalog", r: 12, desc: "Health plan variants" },
  { id: "ULIPProducts", layer: "ontology", kg: "product", domain: "product_catalog", r: 11, desc: "ULIP variants" },
  { id: "MFProducts", layer: "ontology", kg: "product", domain: "product_catalog", r: 12, desc: "MF schemes" },
  { id: "LoanProducts", layer: "ontology", kg: "product", domain: "product_catalog", r: 12, desc: "PL, HL, MSME, WC" },
  { id: "DepositProducts", layer: "ontology", kg: "product", domain: "product_catalog", r: 11, desc: "CASA, FD, RD" },
  { id: "Pricing", layer: "ontology", kg: "product", domain: "product_catalog", r: 13, desc: "Rate cards, premium calculators" },
  { id: "CohortRules", layer: "ontology", kg: "product", domain: "strategy", r: 15, desc: "72 cohort pitch decision trees" },
  { id: "PitchStrategy", layer: "ontology", kg: "product", domain: "strategy", r: 14, desc: "Sequencing: what to lead with" },
  { id: "ProductStrategy", layer: "ontology", kg: "product", domain: "strategy", r: 13, desc: "Quarterly product push priorities" },
  { id: "ChannelStrategy", layer: "ontology", kg: "product", domain: "strategy", r: 12, desc: "Channel rules by segment" },
  { id: "CompanyStrategy", layer: "ontology", kg: "product", domain: "strategy", r: 12, desc: "Revenue targets, growth goals" },
  { id: "EWFramework", layer: "ontology", kg: "product", domain: "risk_framework", r: 14, desc: "Green/Amber/Red thresholds" },
  { id: "DelinqScorecard", layer: "ontology", kg: "product", domain: "risk_framework", r: 12, desc: "Risk scoring model" },
  { id: "TreatmentMatrix", layer: "ontology", kg: "product", domain: "collections_fw", r: 13, desc: "Per-segment collection treatment" },
  { id: "CollJourney", layer: "ontology", kg: "product", domain: "collections_fw", r: 12, desc: "5-stage collections lifecycle" },
  { id: "VulnerabilityRules", layer: "ontology", kg: "product", domain: "collections_fw", r: 11, desc: "RBI fair practices" },
  { id: "UWRules", layer: "ontology", kg: "product", domain: "underwriting_fw", r: 13, desc: "Go/no-go criteria" },
  { id: "PersonaBenchmarks", layer: "ontology", kg: "product", domain: "underwriting_fw", r: 12, desc: "Historical NPA by persona" },
  { id: "IncomeValidation", layer: "ontology", kg: "product", domain: "underwriting_fw", r: 11, desc: "PV triggers, reconciliation" },
  { id: "RBICirculars", layer: "ontology", kg: "product", domain: "regulatory", r: 12, desc: "Banking regulations" },
  { id: "IRDAICirculars", layer: "ontology", kg: "product", domain: "regulatory", r: 11, desc: "Insurance regulations" },
  { id: "InternalCirculars", layer: "ontology", kg: "product", domain: "regulatory", r: 11, desc: "JioFS internal policies" },
  { id: "ComplianceKG", layer: "ontology", kg: "product", domain: "regulatory", r: 13, desc: "Topic nodes + gap detection" },
  { id: "CompetitorRates", layer: "ontology", kg: "product", domain: "market", r: 11, desc: "Competitor pricing" },
  { id: "MarketMacro", layer: "ontology", kg: "product", domain: "market", r: 12, desc: "RBI rates, inflation, GDP" },

  // ─── USER KG: METRICS ───
  { id: "WellBeingScore", layer: "metrics", kg: "user", domain: "identity", r: 16, desc: "Composite 5-dim financial health" },
  { id: "ProtectionWB", layer: "metrics", kg: "user", domain: "insurance", r: 12, desc: "Coverage adequacy" },
  { id: "InvestmentWB", layer: "metrics", kg: "user", domain: "investment", r: 11, desc: "Portfolio vs ideal" },
  { id: "SavingsWB", layer: "metrics", kg: "user", domain: "banking", r: 11, desc: "Deposit adequacy" },
  { id: "RiskWB", layer: "metrics", kg: "user", domain: "credit", r: 11, desc: "Credit exposure vs capacity" },
  { id: "CoverageGap", layer: "metrics", kg: "user", domain: "insurance", r: 14, desc: "Protection shortfall in ₹" },
  { id: "BureauTrajectory", layer: "metrics", kg: "user", domain: "credit", r: 13, desc: "Score Δ 3m/6m" },
  { id: "CCUtilization", layer: "metrics", kg: "user", domain: "credit", r: 11, desc: ">70% = stress" },
  { id: "CASATrend", layer: "metrics", kg: "user", domain: "banking", r: 13, desc: "Balance rate of change" },
  { id: "EMIIncomeRatio", layer: "metrics", kg: "user", domain: "lending", r: 13, desc: "Total EMI burden / income" },
  { id: "DelinquencyRisk", layer: "metrics", kg: "user", domain: "lending", r: 15, desc: "Prob of 30+ DPD in 90d" },
  { id: "LoanStress", layer: "metrics", kg: "user", domain: "lending", r: 14, desc: "Medical + income drop + new borrowing" },
  { id: "LeakageProb", layer: "metrics", kg: "user", domain: "insurance", r: 12, desc: "Policy non-issuance risk" },
  { id: "IncomeStability", layer: "metrics", kg: "user", domain: "behavioral", r: 12, desc: "Salary regularity + trend" },
  { id: "ChannelResponse", layer: "metrics", kg: "user", domain: "interaction", r: 11, desc: "Per-channel effectiveness" },
  { id: "CollectionPriority", layer: "metrics", kg: "user", domain: "lending", r: 13, desc: "Ranked collection queue" },
  { id: "RollForwardProb", layer: "metrics", kg: "user", domain: "lending", r: 12, desc: "DPD bucket migration prob" },

  // ─── PRODUCT KG: METRICS ───
  { id: "CohortConversion", layer: "metrics", kg: "product", domain: "strategy", r: 12, desc: "Pitch success by cohort" },
  { id: "ProductMargin", layer: "metrics", kg: "product", domain: "product_catalog", r: 11, desc: "Margin by product line" },
  { id: "ChannelEffectiveness", layer: "metrics", kg: "product", domain: "strategy", r: 11, desc: "Cost per conversion" },
  { id: "EWAccuracy", layer: "metrics", kg: "product", domain: "risk_framework", r: 10, desc: "Model precision/recall" },
  { id: "TreatmentEffect", layer: "metrics", kg: "product", domain: "collections_fw", r: 11, desc: "Recovery by treatment" },
  { id: "UWApprovalRate", layer: "metrics", kg: "product", domain: "underwriting_fw", r: 11, desc: "Approval % by segment" },
  { id: "NPAByPersona", layer: "metrics", kg: "product", domain: "underwriting_fw", r: 11, desc: "Default rate by persona" },
  { id: "ComplianceGapCount", layer: "metrics", kg: "product", domain: "regulatory", r: 11, desc: "Missing obligations" },
  { id: "RateCompetitiveness", layer: "metrics", kg: "product", domain: "market", r: 10, desc: "JioFS vs market rates" },
  { id: "DepositSensitivity", layer: "metrics", kg: "product", domain: "market", r: 10, desc: "Deposit Δ / rate Δ" },

  // ─── SHARED DECISIONS (fed by both KGs) ───
  { id: "NextBestProduct", layer: "decisions", kg: "shared", domain: "identity", r: 16, desc: "Which product to recommend — uses well-being + cohort rules + product strategy" },
  { id: "PitchSequence", layer: "decisions", kg: "shared", domain: "strategy", r: 15, desc: "What order to pitch — uses life stage + pitch strategy + cohort conversion" },
  { id: "PitchGeneration", layer: "decisions", kg: "shared", domain: "strategy", r: 14, desc: "LLM generates pitch — uses NBO + demographics + coverage gap + pitch strategy" },
  { id: "OptimalChannel", layer: "decisions", kg: "shared", domain: "interaction", r: 13, desc: "Best channel — uses channel response + channel strategy + complaint" },
  { id: "EarlyWarning", layer: "decisions", kg: "shared", domain: "risk_framework", r: 15, desc: "G/A/R flag — uses bureau trend + CASA + loan stress + EW framework" },
  { id: "RestructuringOffer", layer: "decisions", kg: "shared", domain: "lending", r: 14, desc: "Proactive restructure — uses stress + income + treatment matrix" },
  { id: "CollectionTreatment", layer: "decisions", kg: "shared", domain: "collections_fw", r: 15, desc: "Priority + strategy — uses collection priority + treatment matrix + vulnerability" },
  { id: "CoverageGapAction", layer: "decisions", kg: "shared", domain: "insurance", r: 13, desc: "Insurance recommendation — uses gap + pricing + product strategy" },
  { id: "LeakageIntervention", layer: "decisions", kg: "shared", domain: "insurance", r: 12, desc: "Prevent revenue loss — uses leakage prob + UW rules" },
  { id: "UWRiskScore", layer: "decisions", kg: "shared", domain: "underwriting_fw", r: 14, desc: "MSME risk assessment — uses persona + bureau + persona benchmarks" },
  { id: "UWNarrative", layer: "decisions", kg: "shared", domain: "underwriting_fw", r: 13, desc: "Auto assessment report — uses risk score + income validation" },
  { id: "ComplianceGapAlert", layer: "decisions", kg: "shared", domain: "regulatory", r: 12, desc: "Flag missing obligations — uses compliance KG + gap count" },
  { id: "ProvisioningAdj", layer: "decisions", kg: "shared", domain: "market", r: 13, desc: "Portfolio provisioning — uses NMD + deposit sensitivity + NPA" },
];

// ═══════════════════════════════════════════════════════════
// EDGES with relationship labels
// ═══════════════════════════════════════════════════════════
const EDGES = [
  // User ontology internal
  ["Customer","Demographics","HAS_PROFILE"],["Customer","LifeStage","HAS_STAGE"],["Customer","Cohort","BELONGS_TO"],
  ["Customer","MSMEPersona","CLASSIFIED_AS"],["Customer","CASA","HOLDS"],["Customer","FixedDeposit","HOLDS"],
  ["Customer","HomeLoan","HOLDS"],["Customer","PersonalLoan","HOLDS"],["Customer","MSMELoan","HOLDS"],
  ["Customer","BNPL","HOLDS"],["Customer","TermPlan","HOLDS"],["Customer","HealthInsurance","HOLDS"],
  ["Customer","ULIP","HOLDS"],["Customer","MutualFund","HOLDS"],["Customer","CreditCard","HOLDS"],
  ["Customer","BureauProfile","HAS_BUREAU"],["Customer","CallCenter","INTERACTED"],
  ["Customer","DigitalInteraction","INTERACTED"],["Customer","Complaint","FILED"],
  ["Customer","AccountAggregator","CONSENTED"],
  ["CASA","ECSMandate","HAS_MANDATE"],["CASA","ChequeBounce","HAS_BOUNCE"],["CASA","NMD","CLASSIFIED_AS"],
  ["SMS:Banking","CASA","SIGNALS"],["SMS:Loans","OffUsLoans","DETECTED"],["SMS:Loans","BNPL","DETECTED"],
  ["SMS:Salary","Demographics","ENRICHES"],["SMS:Medical","LifeStage","ENRICHES"],["CallCenter","LifeStage","ENRICHES"],
  ["UWEvent","MSMELoan","UNDERWRITES"],["AccountAggregator","OffUsLoans","REVEALS"],["AccountAggregator","MutualFund","REVEALS"],
  ["SMS:UPI","SMS:Merchant","FEEDS"],["TelcoSignals","DerivedBehavioral","FEEDS"],
  ["DerivedBehavioral","SMS:Banking","DERIVED_FROM"],["DerivedBehavioral","SMS:Salary","DERIVED_FROM"],
  ["CampaignResponse","DigitalInteraction","PART_OF"],

  // User ontology → metrics
  ["CASA","CASATrend","USES_INPUT"],["BureauProfile","BureauTrajectory","USES_INPUT"],
  ["CreditCard","CCUtilization","USES_INPUT"],["TermPlan","CoverageGap","USES_INPUT"],
  ["HealthInsurance","CoverageGap","USES_INPUT"],["LifeStage","CoverageGap","USES_INPUT"],
  ["HomeLoan","EMIIncomeRatio","USES_INPUT"],["PersonalLoan","EMIIncomeRatio","USES_INPUT"],
  ["OffUsLoans","EMIIncomeRatio","USES_INPUT"],["SMS:Salary","EMIIncomeRatio","USES_INPUT"],
  ["SMS:Salary","IncomeStability","USES_INPUT"],["SMS:Medical","LoanStress","USES_INPUT"],
  ["BNPL","LoanStress","USES_INPUT"],["CreditCard","LoanStress","USES_INPUT"],
  ["OffUsLoans","LoanStress","USES_INPUT"],["UWEvent","LeakageProb","USES_INPUT"],
  ["Demographics","LeakageProb","USES_INPUT"],["BureauProfile","DelinquencyRisk","USES_INPUT"],
  ["DerivedBehavioral","DelinquencyRisk","USES_INPUT"],["CASA","DelinquencyRisk","USES_INPUT"],
  ["DigitalInteraction","ChannelResponse","USES_INPUT"],["CampaignResponse","ChannelResponse","USES_INPUT"],
  ["Portfolio","WellBeingScore","USES_INPUT"],["TermPlan","ProtectionWB","USES_INPUT"],
  ["MutualFund","InvestmentWB","USES_INPUT"],["CASA","SavingsWB","USES_INPUT"],
  ["BureauProfile","RiskWB","USES_INPUT"],["CreditCard","RiskWB","USES_INPUT"],

  // User metrics → metrics
  ["DelinquencyRisk","CollectionPriority","USES_METRIC"],["DelinquencyRisk","RollForwardProb","USES_METRIC"],
  ["BureauTrajectory","RollForwardProb","USES_METRIC"],["CASATrend","RollForwardProb","USES_METRIC"],
  ["LoanStress","CollectionPriority","USES_METRIC"],
  ["ProtectionWB","WellBeingScore","USES_METRIC"],["InvestmentWB","WellBeingScore","USES_METRIC"],
  ["SavingsWB","WellBeingScore","USES_METRIC"],["RiskWB","WellBeingScore","USES_METRIC"],

  // Product ontology internal
  ["CohortRules","PitchStrategy","INFORMS"],["PitchStrategy","ProductStrategy","ALIGNED_TO"],
  ["ProductStrategy","CompanyStrategy","DRIVEN_BY"],["ChannelStrategy","CompanyStrategy","DRIVEN_BY"],
  ["Pricing","TermProducts","PRICES"],["Pricing","HealthProducts","PRICES"],["Pricing","LoanProducts","PRICES"],
  ["EWFramework","DelinqScorecard","USES_MODEL"],["TreatmentMatrix","CollJourney","STAGE_OF"],
  ["VulnerabilityRules","TreatmentMatrix","CONSTRAINS"],["UWRules","PersonaBenchmarks","REFERENCES"],
  ["IncomeValidation","UWRules","FEEDS"],["RBICirculars","ComplianceKG","EXTRACTED_TO"],
  ["IRDAICirculars","ComplianceKG","EXTRACTED_TO"],["InternalCirculars","ComplianceKG","MAPPED_TO"],
  ["CompetitorRates","MarketMacro","CONTEXT_OF"],

  // Product ontology → product metrics
  ["CohortRules","CohortConversion","USES_INPUT"],["Pricing","ProductMargin","USES_INPUT"],
  ["ChannelStrategy","ChannelEffectiveness","USES_INPUT"],["EWFramework","EWAccuracy","USES_INPUT"],
  ["TreatmentMatrix","TreatmentEffect","USES_INPUT"],["PersonaBenchmarks","NPAByPersona","USES_INPUT"],
  ["UWRules","UWApprovalRate","USES_INPUT"],["ComplianceKG","ComplianceGapCount","USES_INPUT"],
  ["CompetitorRates","RateCompetitiveness","USES_INPUT"],["MarketMacro","DepositSensitivity","USES_INPUT"],

  // User metrics → shared decisions
  ["WellBeingScore","NextBestProduct","USES_METRIC"],["CoverageGap","NextBestProduct","USES_METRIC"],
  ["ProtectionWB","PitchSequence","USES_METRIC"],["ChannelResponse","OptimalChannel","USES_METRIC"],
  ["BureauTrajectory","EarlyWarning","USES_METRIC"],["CASATrend","EarlyWarning","USES_METRIC"],
  ["LoanStress","EarlyWarning","USES_METRIC"],["EMIIncomeRatio","EarlyWarning","USES_METRIC"],
  ["LoanStress","RestructuringOffer","USES_METRIC"],["IncomeStability","RestructuringOffer","USES_METRIC"],
  ["CollectionPriority","CollectionTreatment","USES_METRIC"],["RollForwardProb","CollectionTreatment","USES_METRIC"],
  ["CoverageGap","CoverageGapAction","USES_METRIC"],["LeakageProb","LeakageIntervention","USES_METRIC"],
  ["DelinquencyRisk","UWRiskScore","USES_METRIC"],

  // Product nodes → shared decisions
  ["CohortRules","NextBestProduct","USES_INPUT"],["ProductStrategy","NextBestProduct","USES_INPUT"],
  ["PitchStrategy","PitchSequence","USES_INPUT"],["CohortConversion","PitchSequence","USES_METRIC"],
  ["PitchStrategy","PitchGeneration","USES_INPUT"],["ChannelStrategy","OptimalChannel","USES_INPUT"],
  ["EWFramework","EarlyWarning","USES_INPUT"],["TreatmentMatrix","RestructuringOffer","USES_INPUT"],
  ["TreatmentMatrix","CollectionTreatment","USES_INPUT"],["VulnerabilityRules","CollectionTreatment","USES_INPUT"],
  ["Pricing","CoverageGapAction","USES_INPUT"],["ProductStrategy","CoverageGapAction","USES_INPUT"],
  ["UWRules","LeakageIntervention","USES_INPUT"],
  ["PersonaBenchmarks","UWRiskScore","USES_INPUT"],["IncomeValidation","UWNarrative","USES_INPUT"],
  ["NPAByPersona","UWRiskScore","USES_METRIC"],
  ["ComplianceGapCount","ComplianceGapAlert","USES_METRIC"],["ComplianceKG","ComplianceGapAlert","USES_INPUT"],
  ["DepositSensitivity","ProvisioningAdj","USES_METRIC"],["MarketMacro","ProvisioningAdj","USES_INPUT"],
  ["NPAByPersona","ProvisioningAdj","USES_METRIC"],["NMD","ProvisioningAdj","USES_INPUT"],

  // Decision interdependencies
  ["NextBestProduct","PitchGeneration","USES_INPUT"],["PitchSequence","PitchGeneration","USES_INPUT"],
  ["EarlyWarning","RestructuringOffer","TRIGGERS"],["UWRiskScore","UWNarrative","USES_INPUT"],
  ["Complaint","OptimalChannel","USES_INPUT"],["Complaint","CollectionTreatment","USES_INPUT"],
];

// ═══════════════════════════════════════════════════════════
// SIMULATION WORLD SIZE
// ═══════════════════════════════════════════════════════════
const W = 3200;
const H = 2400;

// ═══════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════
export default function App() {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const applySelectionRef = useRef(null); // set by viz effect, called by selection effect

  const [selected, setSelected] = useState(null);

  // When selection changes (e.g. from detail panel), push the update into D3
  useEffect(() => {
    applySelectionRef.current?.(selected);
  }, [selected]);

  // ─── Build visualization ─────────────────────────────────
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const { width: cw, height: ch } = wrapper.getBoundingClientRect();

    const svg = d3.select(svgRef.current)
      .attr("width", cw)
      .attr("height", ch);

    svg.selectAll("*").remove();

    const g = svg.append("g");

    // ── Zoom + pan ──
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", event => g.attr("transform", event.transform));

    svg.call(zoom);

    // Fit the world (W×H) into the viewport on load
    const initialK = Math.min(cw / W, ch / H) * 0.85;
    svg.call(zoom.transform, d3.zoomIdentity
      .translate((cw - W * initialK) / 2, (ch - H * initialK) / 2)
      .scale(initialK));

    // ── Simulation data ──
    const nodes = NODES.map(n => ({
      ...n,
      x: n.kg === "user"    ? W * 0.30 + (Math.random() - 0.5) * W * 0.4
       : n.kg === "product" ? W * 0.70 + (Math.random() - 0.5) * W * 0.4
       : W * 0.5  + (Math.random() - 0.5) * W * 0.5,
      y: n.layer === "ontology" ? H * 0.28 + (Math.random() - 0.5) * H * 0.35
       : n.layer === "metrics"  ? H * 0.60 + (Math.random() - 0.5) * H * 0.20
       : H * 0.88 + (Math.random() - 0.5) * H * 0.15,
    }));

    const nodeMap = {};
    nodes.forEach(n => { nodeMap[n.id] = n; });

    // Pre-tag each link with isCross so attr calls don't need nodeMap lookups
    const links = EDGES
      .filter(([s, t]) => nodeMap[s] && nodeMap[t])
      .map(([s, t, rel]) => {
        const sn = nodeMap[s], tn = nodeMap[t];
        const isCross = sn.kg !== tn.kg || sn.kg === "shared" || tn.kg === "shared";
        return { source: s, target: t, rel, isCross };
      });

    // ── Draw edges ──
    const edgeG = g.append("g");

    const linkLines = edgeG.selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke",        d => d.isCross ? "#2D5A3D" : "#888")
      .attr("stroke-width",  d => d.isCross ? 0.8 : 0.6)
      .attr("stroke-opacity",d => d.isCross ? 0.25 : 0.2)
      .attr("stroke-dasharray", d => d.isCross ? "8 5" : null)
      .style("pointer-events", "none");

    const linkLabels = edgeG.selectAll("text")
      .data(links)
      .enter().append("text")
      .attr("font-size", 7)
      .attr("font-family", "'JetBrains Mono', monospace")
      .attr("font-weight", 400)
      .attr("fill", "#aaa")
      .attr("opacity", 0.45)
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .text(d => d.rel);

    // ── Draw nodes ──
    const nodeG = g.append("g");

    // Track whether the pointer moved enough to count as a drag
    let wasDragged = false;

    const nodeGroups = nodeG.selectAll("g")
      .data(nodes)
      .enter().append("g")
      .style("cursor", "pointer")
      .call(
        d3.drag()
          .on("start", (event, d) => {
            wasDragged = false;
            if (!event.active) sim.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            wasDragged = true;
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) sim.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on("click", (event, d) => {
        event.stopPropagation();
        if (wasDragged) return;
        const next = d._selected ? null : d.id;
        setSelected(next);
      });

    // Click SVG background → deselect
    svg.on("click", () => setSelected(null));

    // Shapes
    nodeGroups.each(function(d) {
      const el = d3.select(this);
      const color = DC[d.domain] || "#888";
      const r = d.r * 1.6;

      if (d.layer === "ontology") {
        el.append("circle")
          .attr("r", r)
          .attr("fill", color)
          .attr("stroke", "#FAFAF8")
          .attr("stroke-width", 1.2);
      } else if (d.layer === "metrics") {
        const s = r * 1.4;
        el.append("rect")
          .attr("x", -s / 2).attr("y", -s / 2)
          .attr("width", s).attr("height", s)
          .attr("transform", "rotate(45)")
          .attr("fill", color)
          .attr("stroke", "#FAFAF8")
          .attr("stroke-width", 1.2);
      } else {
        const s = r * 1.5;
        el.append("polygon")
          .attr("points", `0,${-s * 0.7} ${s * 0.65},${s * 0.45} ${-s * 0.65},${s * 0.45}`)
          .attr("fill", color)
          .attr("stroke", "#FAFAF8")
          .attr("stroke-width", 1.2);
      }
    });

    // Labels
    nodeGroups.append("text")
      .attr("y", d => {
        const r = d.r * 1.6;
        return d.layer === "decisions" ? r * 1.5 + 14 : -(r) - 6;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", 13)
      .attr("font-weight", 500)
      .attr("font-family", "'IBM Plex Sans', sans-serif")
      .attr("fill", "#1C1C1C")
      .attr("stroke", "#FAFAF8")
      .attr("stroke-width", 5)
      .attr("paint-order", "stroke")
      .style("pointer-events", "none")
      .text(d => d.id.replace(/([a-z])([A-Z])/g, "$1 $2").replace("SMS:", "SMS: "));

    // ── Simulation ──
    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id)
        .distance(d => d.isCross ? 300 : d.source?.layer !== d.target?.layer ? 180 : 120)
        .strength(d => d.isCross ? 0.025 : 0.1))
      .force("charge", d3.forceManyBody().strength(-500).distanceMax(800))
      .force("x", d3.forceX(d => d.kg === "user" ? W * 0.30 : d.kg === "product" ? W * 0.70 : W * 0.5)
        .strength(d => d.kg === "shared" ? 0.015 : 0.05))
      .force("y", d3.forceY(d => d.layer === "ontology" ? H * 0.28 : d.layer === "metrics" ? H * 0.60 : H * 0.88)
        .strength(0.06))
      .force("collide", d3.forceCollide(d => d.r * 1.6 + 10))
      .alphaDecay(0.008);

    sim.on("tick", () => {
      nodes.forEach(n => {
        n.x = Math.max(80, Math.min(W - 80, n.x));
        n.y = Math.max(80, Math.min(H - 80, n.y));
      });

      linkLines
        .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y);

      linkLabels.attr("transform", d => {
        const mx = (d.source.x + d.target.x) / 2;
        const my = (d.source.y + d.target.y) / 2;
        const angle = Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x) * 180 / Math.PI;
        const flip = angle > 90 || angle < -90;
        return `translate(${mx},${my - 3}) rotate(${flip ? angle + 180 : angle})`;
      });

      nodeGroups.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // ── Selection visual update (called by the React useEffect) ──
    const applySelection = (selId) => {
      // Tag each node so click handler can toggle
      nodes.forEach(n => { n._selected = n.id === selId; });

      const connectedIds = new Set();
      if (selId) {
        EDGES.forEach(([s, t]) => {
          if (s === selId) connectedIds.add(t);
          if (t === selId) connectedIds.add(s);
        });
      }

      nodeGroups
        .attr("opacity", d => {
          if (!selId) return 1;
          return d.id === selId || connectedIds.has(d.id) ? 1 : 0.06;
        })
        .select("text")
        .attr("font-weight", d => d.id === selId ? 700 : 500);

      linkLines
        .attr("stroke-opacity", d => {
          if (!selId) return d.isCross ? 0.25 : 0.2;
          return d.source.id === selId || d.target.id === selId ? 0.8 : 0.03;
        })
        .attr("stroke-width", d => {
          if (!selId) return d.isCross ? 0.8 : 0.6;
          return d.source.id === selId || d.target.id === selId ? 2 : 0.6;
        })
        .attr("stroke", d => {
          if (!selId || (d.source.id !== selId && d.target.id !== selId)) {
            return d.isCross ? "#2D5A3D" : "#888";
          }
          return d.isCross ? "#2D5A3D" : "#555";
        });

      linkLabels
        .attr("opacity", d => {
          if (!selId) return 0.45;
          return d.source.id === selId || d.target.id === selId ? 0.9 : 0;
        })
        .attr("fill", d => {
          if (!selId) return "#aaa";
          return d.source.id === selId || d.target.id === selId
            ? (d.isCross ? "#2D5A3D" : "#555") : "#aaa";
        });
    };

    applySelectionRef.current = applySelection;

    return () => {
      sim.stop();
      svg.on("click", null);
    };
  }, []);

  // ─── Detail panel data ──────────────────────────────────
  const selectedNode = selected ? NODES.find(n => n.id === selected) : null;
  const connectedEdgeLabels = [];
  if (selected) {
    EDGES.forEach(([s, t, rel]) => {
      if (s === selected) connectedEdgeLabels.push({ other: t, rel, dir: "out" });
      if (t === selected) connectedEdgeLabels.push({ other: s, rel, dir: "in" });
    });
  }

  // ─── Render ─────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", background: "#FAFAF8", minHeight: "100vh", padding: "16px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#2D5A3D" }}>questt.</span>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 700 }}>JioFS Business Knowledge Graph</span>
            </div>
            <div style={{ height: 2, width: 48, background: "#2D5A3D", margin: "3px 0 4px" }} />
            <div style={{ fontSize: 10, color: "#999" }}>
              {NODES.filter(n => n.layer === "ontology").length} entities · {NODES.filter(n => n.layer === "metrics").length} metrics · {NODES.filter(n => n.layer === "decisions").length} decisions · {EDGES.length} edges · Scroll to zoom, drag nodes or canvas to pan
            </div>
          </div>

          {/* Shape legend */}
          <div style={{ display: "flex", gap: 12, fontSize: 10, color: "#555", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <svg width="10" height="10"><circle cx="5" cy="5" r="4.5" fill="#888" stroke="#fff" strokeWidth="0.6"/></svg>Entity
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <svg width="12" height="12"><rect x="2" y="2" width="8" height="8" fill="#888" stroke="#fff" strokeWidth="0.6" transform="rotate(45 6 6)"/></svg>Metric
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <svg width="12" height="12"><polygon points="6,1 11,11 1,11" fill="#888" stroke="#fff" strokeWidth="0.6"/></svg>Decision
            </span>
          </div>
        </div>

        {/* Domain legend */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8, fontSize: 9, color: "#555" }}>
          {Object.entries(DC).map(([k, c]) => (
            <span key={k} style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "inline-block" }} />
              {DL[k]}
            </span>
          ))}
        </div>

        {/* Graph + detail */}
        <div style={{ display: "flex", gap: 12 }}>
          <div ref={wrapperRef} style={{ flex: 1, position: "relative", height: "80vh" }}>
            <svg ref={svgRef} style={{ display: "block", width: "100%", height: "100%" }} />
          </div>

          {/* Detail panel */}
          {selectedNode && (
            <div style={{ width: 280, flexShrink: 0 }}>
              <div style={{
                background: "#fff", borderRadius: 10, border: `1px solid ${DC[selectedNode.domain]}`,
                padding: "14px 16px", position: "sticky", top: 16,
              }}>
                <button onClick={() => setSelected(null)} style={{ float: "right", border: "none", background: "none", cursor: "pointer", color: "#999", fontSize: 14, padding: 0 }}>×</button>

                <div style={{ display: "flex", gap: 5, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 6px", borderRadius: 3,
                    background: selectedNode.kg === "user" ? "#E6F1FB" : selectedNode.kg === "product" ? "#FAECE7" : "#E1F5EE",
                    color: selectedNode.kg === "user" ? "#185FA5" : selectedNode.kg === "product" ? "#D85A30" : "#2D5A3D",
                  }}>{selectedNode.kg === "shared" ? "Shared decision" : selectedNode.kg + " KG"}</span>
                  <span style={{ fontSize: 8, fontWeight: 600, textTransform: "uppercase", padding: "2px 6px", borderRadius: 3, background: "#F5F3EF", color: "#555" }}>{selectedNode.layer}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: DC[selectedNode.domain], display: "inline-block" }} />
                  <span style={{ fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 700 }}>{selectedNode.id.replace(/([a-z])([A-Z])/g, "$1 $2")}</span>
                </div>
                <div style={{ fontSize: 8, fontWeight: 600, color: DC[selectedNode.domain], textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{DL[selectedNode.domain]}</div>
                <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5, marginBottom: 10 }}>{selectedNode.desc}</div>

                {selectedNode.attrs && (
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 8, fontWeight: 600, textTransform: "uppercase", color: "#999", marginBottom: 3 }}>Attributes</div>
                    <div style={{ fontSize: 9, color: "#555", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.6, padding: "5px 7px", background: "#F5F3EF", borderRadius: 4 }}>
                      {selectedNode.attrs}
                    </div>
                  </div>
                )}

                <div>
                  <div style={{ fontSize: 8, fontWeight: 600, textTransform: "uppercase", color: "#999", marginBottom: 3 }}>
                    Connections ({connectedEdgeLabels.length})
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 260, overflow: "auto" }}>
                    {connectedEdgeLabels.map((e, i) => {
                      const cn = NODES.find(n => n.id === e.other);
                      if (!cn) return null;
                      const isCross = cn.kg !== selectedNode.kg && cn.kg !== "shared" && selectedNode.kg !== "shared";
                      return (
                        <div key={i} onClick={() => setSelected(e.other)} style={{
                          display: "flex", alignItems: "center", gap: 5, padding: "3px 6px", borderRadius: 4, cursor: "pointer",
                          background: isCross ? "#F0FAF5" : "#F5F3EF",
                          border: isCross ? "0.5px solid #5DCAA5" : "0.5px solid transparent",
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: DC[cn.domain], flexShrink: 0 }} />
                          <span style={{ fontSize: 9, color: "#1C1C1C", fontWeight: 500, flex: 1 }}>{cn.id.replace(/([a-z])([A-Z])/g, "$1 $2")}</span>
                          <span style={{ fontSize: 7, fontFamily: "'JetBrains Mono'", color: "#999" }}>{e.rel}</span>
                          <span style={{ fontSize: 8, color: "#999" }}>{e.dir === "out" ? "→" : "←"}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 9, color: "#999" }}>
          <span>User KG: {NODES.filter(n => n.kg === "user").length} nodes · Product KG: {NODES.filter(n => n.kg === "product").length} nodes · Shared decisions: {NODES.filter(n => n.kg === "shared").length}</span>
          <span>questt. · JioFS Intelligence Warehouse · BKG v1</span>
        </div>
      </div>
    </div>
  );
}

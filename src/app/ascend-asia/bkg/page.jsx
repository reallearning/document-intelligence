"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

const DOMAIN_COLORS = {
  organization: "#2D5A3D",
  distribution: "#2563A0",
  client: "#7B2D8E",
  product: "#C45A20",
  policy: "#1A7A6D",
  compliance: "#B83230",
  performance: "#5A6B2D",
};
const METRIC_COLOR = "#E85D75";
const DECISION_COLOR = "#2C3E50";

const entityDetails = {
  Platform: { definition: "Ascend Asia group-level entity. Single root node representing the holding company.", grain: "platform_id", domain: "Organization", attributes: "Name, founding year, total AUM, total consultants, active jurisdictions", mapping: "Ascend Asia master config" },
  MemberFirm: { definition: "An independent financial advisory firm acquired into the Ascend Asia platform. Retains its own brand and client relationships.", grain: "firm_id", domain: "Organization", attributes: "Name, brand, jurisdiction, founding year, acquisition date, maturity stage, headcount, AUM", mapping: "Firm registry + CRM instance" },
  BusinessUnit: { definition: "A functional division within a member firm, typically organized by product line or market segment.", grain: "bu_id", domain: "Organization", attributes: "Name, type (insurance / wealth / retirement), firm, headcount, revenue contribution", mapping: "Firm org chart + GL" },
  CentreOfExcellence: { definition: "Shared capability unit operated by Ascend Asia Corporate Services to support all member firms.", grain: "coe_id", domain: "Organization", attributes: "Name, function (tech / compliance / training / ops), programs delivered, firms served", mapping: "Corporate Services tracker" },
  CorpServiceFunction: { definition: "Centralized operational function providing shared services across the platform.", grain: "csf_id", domain: "Organization", attributes: "Name, type (IT / finance / legal / HR), SLA targets, cost center", mapping: "Shared services platform" },
  Consultant: { definition: "Individual financial advisor who serves clients. The atomic revenue and relationship unit of the platform.", grain: "consultant_id", domain: "Distribution", attributes: "Name, firm, team, tier, license type, tenure, certifications held, active clients, monthly cases, recruitment cohort", mapping: "CRM + HR system" },
  Team: { definition: "A group of consultants operating under a team leader within a business unit.", grain: "team_id", domain: "Distribution", attributes: "Name, firm, BU, headcount, leader, formation date", mapping: "CRM org hierarchy" },
  TeamLeader: { definition: "Consultant with leadership responsibility over a team, with override commission.", grain: "leader_id", domain: "Distribution", attributes: "Name, consultant_id, team count, override commission, leadership tier", mapping: "CRM + commission engine" },
  AgencyLeader: { definition: "Senior distribution leader overseeing one or more business units within a firm.", grain: "agency_leader_id", domain: "Distribution", attributes: "Name, firm, BUs managed, total downline, recruitment targets", mapping: "Firm leadership registry" },
  RecruitmentCohort: { definition: "A group of consultants recruited in the same intake period. Used for survival and ramp analysis.", grain: "cohort_id", domain: "Distribution", attributes: "Intake period, firm, count recruited, 6-month survival rate, avg ramp time", mapping: "HR + onboarding system" },
  TrainingProgram: { definition: "A structured development program delivered to consultants, tracked for completion and impact.", grain: "program_id", domain: "Distribution", attributes: "Name, type (product / compliance / skills), delivery mode, hours, completion criteria", mapping: "LMS" },
  Client: { definition: "An end customer of a member firm. Holds one or more policies or investment products.", grain: "client_id", domain: "Client", attributes: "Name, firm, consultant, segment, life stage, risk profile, KYC status, total AUM, policies held, onboarding date", mapping: "CRM client master" },
  ClientSegment: { definition: "A tier classification determining product eligibility and service level.", grain: "segment_id", domain: "Client", attributes: "Name (retail / HNW / accredited / UHNW), AUM threshold, product eligibility, regulatory tier", mapping: "Platform segment config" },
  LifeStage: { definition: "A modeled stage in the client's financial lifecycle, driving needs identification.", grain: "stage_id", domain: "Client", attributes: "Name (early career / family building / wealth accumulation / pre-retirement / retirement), typical needs, product affinity", mapping: "Platform life stage model" },
  Household: { definition: "A group of linked clients (family unit) for cross-sell and household-level reporting.", grain: "household_id", domain: "Client", attributes: "Members, combined AUM, primary consultant, cross-sell status", mapping: "CRM household linkage" },
  Prospect: { definition: "A potential client in the pipeline, not yet converted.", grain: "prospect_id", domain: "Client", attributes: "Name, source, assigned consultant, qualification score, conversion status", mapping: "CRM pipeline" },
  Product: { definition: "A financial product available on the open-architecture shelf. Can be insurance, ILP, wealth, or credit.", grain: "product_id", domain: "Product", attributes: "Name, category, provider, type, risk rating, min investment, commission rate, approval status by jurisdiction", mapping: "Product master + provider feeds" },
  ProductCategory: { definition: "Top-level grouping of products by type and regulatory classification.", grain: "category_id", domain: "Product", attributes: "Name (life / health / ILP / retirement / credit / alternatives), regulatory class", mapping: "Platform product taxonomy" },
  Provider: { definition: "An insurer, fund manager, or bank whose products are distributed through the platform.", grain: "provider_id", domain: "Product", attributes: "Name, type (insurer / fund manager / bank), jurisdictions licensed, products on shelf, relationship status", mapping: "Provider registry" },
  Fund: { definition: "A specific investment fund available through ILP products or direct wealth solutions.", grain: "fund_id", domain: "Product", attributes: "Name, provider, strategy, NAV, inception date, fee structure, risk class, benchmark", mapping: "Fund admin feeds" },
  InvestmentStrategy: { definition: "A defined approach to asset allocation executed by one or more funds.", grain: "strategy_id", domain: "Product", attributes: "Name (equity growth / credit / multi-asset / retirement income), asset allocation, target return, risk band", mapping: "AM strategy master" },
  CommissionStructure: { definition: "The compensation model for a product, defining payouts at each tier.", grain: "commission_id", domain: "Product", attributes: "Product, tier, initial %, trail %, override %, clawback rules, vesting period", mapping: "Commission engine" },
  BenefitIllustration: { definition: "Projected outcomes shown to clients during the advisory process.", grain: "illustration_id", domain: "Product", attributes: "Product, scenario assumptions, projected values, surrender schedule, disclaimers", mapping: "Illustration engine" },
  Policy: { definition: "An active contract between a client and a provider, sold through a consultant.", grain: "policy_id", domain: "Policy", attributes: "Client, product, consultant, inception date, premium amount, frequency, status, sum assured", mapping: "Policy admin system" },
  ILPHolding: { definition: "The investment-linked component of a policy, with fund allocations.", grain: "ilp_id", domain: "Policy", attributes: "Policy, fund allocations (%), current value, switches made, top-up history", mapping: "ILP admin + fund feeds" },
  Coverage: { definition: "A rider or supplementary benefit attached to a base policy.", grain: "coverage_id", domain: "Policy", attributes: "Policy, rider type, sum assured, exclusions, expiry date", mapping: "Policy admin rider table" },
  PremiumSchedule: { definition: "The payment schedule for a policy, tracking due dates and payment status.", grain: "schedule_id", domain: "Policy", attributes: "Policy, due date, amount, payment method, status (paid / pending / grace / lapsed)", mapping: "Billing system" },
  SurrenderEvent: { definition: "A policy termination event before maturity, with reason tracking.", grain: "surrender_id", domain: "Policy", attributes: "Policy, date, reason code, surrender value, penalty, consultant at time of event", mapping: "Policy admin + CRM notes" },
  Claim: { definition: "A claim filed against a policy, tracked through adjudication.", grain: "claim_id", domain: "Policy", attributes: "Policy, date, type, amount, status, adjudication outcome, turnaround days", mapping: "Claims system" },
  Jurisdiction: { definition: "A regulatory territory in which Ascend Asia operates.", grain: "jurisdiction_id", domain: "Compliance", attributes: "Name (SG / HK / MY), regulatory body, license requirements, reporting cadence, conduct standards", mapping: "Platform regulatory config" },
  RegulatoryBody: { definition: "The authority governing financial advisory activity in a jurisdiction.", grain: "regulator_id", domain: "Compliance", attributes: "Name (MAS / SFC / BNM), jurisdiction, submission types, penalty framework", mapping: "Regulatory reference data" },
  License: { definition: "A regulatory license held by a member firm in a jurisdiction.", grain: "license_id", domain: "Compliance", attributes: "Firm, type (CMS / FA / RFA), jurisdiction, issue date, renewal date, conditions", mapping: "License registry" },
  KYCRecord: { definition: "Know Your Customer documentation for a client, subject to regulatory requirements.", grain: "kyc_id", domain: "Compliance", attributes: "Client, document type, issue date, expiry date, verification status, risk tier", mapping: "KYC system" },
  ConductRule: { definition: "A regulatory rule governing product suitability and advisory conduct.", grain: "rule_id", domain: "Compliance", attributes: "Jurisdiction, product category, rule text, suitability criteria, documentation required", mapping: "Compliance rule engine" },
  AuditFinding: { definition: "A finding from an internal or regulatory audit requiring remediation.", grain: "finding_id", domain: "Compliance", attributes: "Firm, date, type (internal / regulatory), severity, status, remediation deadline", mapping: "Audit management system" },
  IncentiveScheme: { definition: "A structured reward program with qualification thresholds for consultants.", grain: "scheme_id", domain: "Performance", attributes: "Name, firm, period, tier thresholds, reward type (cash / trip / recognition), qualification criteria", mapping: "Incentive platform" },
  Target: { definition: "A performance target assigned to a consultant, team, BU, or firm for a period.", grain: "target_id", domain: "Performance", attributes: "Entity, metric, period, target value, stretch value", mapping: "Planning system" },
  Certification: { definition: "A regulatory or professional certification held by a consultant.", grain: "cert_id", domain: "Performance", attributes: "Consultant, type (CMFAS M5/M9/M9A, CACS, CFP), issue date, renewal date, status", mapping: "HR + regulatory registry" },
};

const metricDetails = {
  "M1:NetNewAUM": { definition: "Net change in AUM excluding market movement. Measures organic growth.", formula: "AUM(t) - AUM(t-1) - market_movement", dimensions: "By firm, BU, consultant", thresholds: "Green: >2% MoM | Amber: 0-2% | Red: <0%", diagnostic: "Net inflows vs outflows, surrender events, fund performance drag, new client contribution" },
  "M2:ConsultantProductivity": { definition: "Revenue per active consultant, normalized for firm maturity and product mix.", formula: "revenue / active_consultants * maturity_adj * mix_idx", dimensions: "By firm, BU, tier", thresholds: "Green: >firm P75 | Amber: P25-P75 | Red: <P25", diagnostic: "Case volume, avg case size, product mix, client segment, tenure band" },
  "M3:PolicyPersistency": { definition: "Policies remaining in force at 13th/25th month after issuance.", formula: "policies_in_force_at_month / policies_in_cohort", dimensions: "By product category, firm, consultant", thresholds: "Green: >85% (13M) | Amber: 75-85% | Red: <75%", diagnostic: "Product type, writing consultant, premium frequency, client segment, surrender reasons" },
  "M4:ClientRetention": { definition: "Clients retaining at least one active policy over the period.", formula: "clients_with_active_end / clients_at_start", dimensions: "By firm, segment", thresholds: "Green: >92% | Amber: 85-92% | Red: <85%", diagnostic: "Lapse rate, consultant attrition correlation, segment trends" },
  "M5:ConsultantAttrition": { definition: "Annualized rate of consultant departures.", formula: "exited / avg_active_in_period", dimensions: "By firm, tenure band", thresholds: "Green: <15% | Amber: 15-25% | Red: >25%", diagnostic: "Tenure at exit, team leader, cohort quality, incentive participation" },
  "M6:NewClientAcquisition": { definition: "New clients onboarded per period.", formula: "count(new_clients)", dimensions: "By firm, consultant, source", thresholds: "Green: >target | Amber: 80-100% | Red: <80%", diagnostic: "Conversion rate, lead sources, consultant activity, competitive losses" },
  "M7:ProductPenetration": { definition: "Product category breadth per client vs segment eligibility.", formula: "distinct_categories / available_categories", dimensions: "By segment, firm", thresholds: "Green: >2.5 | Amber: 1.5-2.5 | Red: <1.5", diagnostic: "Cross-sell activity, consultant competency, life stage alignment" },
  "M8:CrossSellRatio": { definition: "Share of new policies sold to existing clients.", formula: "policies_to_existing / total_policies", dimensions: "By consultant, firm", thresholds: "Green: >40% | Amber: 25-40% | Red: <25%", diagnostic: "Coverage gaps identified, needs-analysis training, product shelf breadth" },
  "M9:IncentiveAchievement": { definition: "Share of consultants reaching incentive qualification.", formula: "qualifying / eligible", dimensions: "By scheme, firm", thresholds: "Green: >60% | Amber: 40-60% | Red: <40%", diagnostic: "Threshold calibration, fairness, pacing data, scheme design" },
  "M10:CasesClosed": { definition: "Policies submitted and issued per month.", formula: "count(issued) in month", dimensions: "By consultant, team, firm", thresholds: "Green: >firm P50 | Amber: P25-P50 | Red: <P25", diagnostic: "Submission-to-issue ratio, pipeline, compliance bottleneck" },
  "M11:AvgCaseSize": { definition: "Average premium per issued policy.", formula: "total_premium / policies_issued", dimensions: "By product, consultant tier", thresholds: "Green: >segment avg | Amber: within 1SD | Red: <1SD", diagnostic: "Client segment mix, product selection, sum assured trends" },
  "M12:CommissionIncome": { definition: "Total commission per active consultant.", formula: "total_commission / active_consultants", dimensions: "By firm, tier", thresholds: "Green: >firm P50 | Amber: P25-P50 | Red: <P25", diagnostic: "Product mix, persistency/clawback, case volume, overrides" },
  "M13:OperatingMargin": { definition: "Member firm profitability after operating costs.", formula: "(revenue - opex) / revenue", dimensions: "By firm", thresholds: "Green: >20% | Amber: 10-20% | Red: <10%", diagnostic: "Headcount cost, shared service allocation, commission ratio" },
  "M14:TrainingCompletion": { definition: "On-time completion rate for assigned training.", formula: "completed_on_time / assigned", dimensions: "By firm, program type", thresholds: "Green: >90% | Amber: 75-90% | Red: <75%", diagnostic: "Relevance, format, workload, manager enforcement" },
  "M15:KYCCompliance": { definition: "Active clients with valid, complete KYC.", formula: "valid_kyc / active_clients", dimensions: "By firm, jurisdiction", thresholds: "Green: >98% | Amber: 95-98% | Red: <95%", diagnostic: "Expiring docs, product triggers, segment upgrades, bottleneck" },
  "M16:RightSellingScore": { definition: "Policies matching client risk profile and horizon.", formula: "suitable / reviewed", dimensions: "By consultant", thresholds: "Green: >95% | Amber: 90-95% | Red: <90%", diagnostic: "Mismatch patterns, product knowledge gaps, illustration compliance" },
  "M17:CoverageGapIndex": { definition: "Average unmet financial needs ratio per client.", formula: "needs_without_coverage / total_needs", dimensions: "By segment, firm", thresholds: "Green: <20% | Amber: 20-40% | Red: >40%", diagnostic: "Needs analysis completion, life stage transitions, product availability" },
  "M18:FundNetInflow": { definition: "Net money flowing into a fund.", formula: "subscriptions - redemptions - switches_out", dimensions: "By fund, strategy, firm", thresholds: "Green: positive | Amber: flat | Red: outflow >2mo", diagnostic: "Performance vs benchmark, consultant activity, segment exits" },
};

const decisionDetails = {
  "D1:CapitalAllocation": { definition: "Which member firm gets the next tranche of growth capital.", trigger: "Quarterly review OR firm request", logic: "Rank by M1 x M2 x M4 x M13, weighted by market opportunity.", action: "Allocate to top-ranked. Attach hiring + product adoption conditions." },
  "D2:ConsultantIntervention": { definition: "Targeted intervention for underperforming consultants.", trigger: "M2 < P25 AND tenure > 12 months", logic: "Traverse consultant > team > training > clients > products. Cluster root cause.", action: "Low volume: coach. Low size: product training. High lapse: retention skills. All down: performance plan." },
  "D3:ProductPushStrategy": { definition: "Which products to push through which firms and consultants.", trigger: "New launch OR quarterly review OR M18 declining", logic: "Product > eligible segments > serving consultants > competency > adoption rate. High-fit, low-adoption.", action: "Target top 3 combos. Training + illustrations. Track weekly 8 weeks." },
  "D4:IncentiveAdjustment": { definition: "Recalibrate incentive thresholds mid-period.", trigger: "M9 < 40% at mid-period OR > 90%", logic: "<40%: threshold miscalibration check. >90%: sandbagging check.", action: "Recalibrate next period. Systemic miss: adjust mid-period pro-rata." },
  "D5:ClientReKYC": { definition: "Trigger re-verification when KYC may be insufficient.", trigger: "Expiry < 60d OR segment change OR new product", logic: "Client > KYC > products > regulatory reqs by jurisdiction.", action: "Re-KYC task, 30-day deadline. Segment upgrade: enhanced DD. Escalate overdue." },
  "D6:SuitabilityEscalation": { definition: "Flag product-client mismatches.", trigger: "New policy OR review cycle", logic: "Policy > product risk > client profile + horizon + situation > conduct rules. Score 0-100.", action: "50-70: acknowledge. <50: block + escalate. Log all for audit." },
  "D7:ConsultantDevelopment": { definition: "Personalized development plans based on capability gaps.", trigger: "New onboard OR quarterly review OR cert expiry < 90d", logic: "Consultant > certs > eligible products > segments > metrics > training. Gap to next tier.", action: "Plan: certs + training + mentorship pairing. Track monthly." },
  "D8:NewFirmIntegration": { definition: "Integration playbook for newly acquired member firms.", trigger: "Acquisition confirmed", logic: "Map: org > consultants > clients > products > systems > jurisdiction vs BKG.", action: "Wk 1-2: entity mapping. Wk 3-4: metric alignment. Wk 5-6: decision calibration. Legible in 6 weeks." },
  "D9:CoEResourceAllocation": { definition: "Allocate shared service resources to highest-impact programs.", trigger: "Quarterly OR firm request OR D2 demand", logic: "CoE > programs > firms > outcome metrics. Rank by impact/dollar.", action: "Reallocate to highest-impact. Kill no-lift programs after 2Q. Publish scorecard." },
  "D10:ConcentrationRiskAlert": { definition: "Flag over-concentrated client holdings.", trigger: "Review cycle OR new policy", logic: "Client > policies > products > providers > asset classes. Flag >60% single exposure.", action: "At issuance: warn + require ack. At review: add diversification to next-best-action." },
  "D11:ChurnInvestigation": { definition: "Investigate anomalous surrender patterns.", trigger: "M3 drops >5pp OR surrenders > 2SD above mean", logic: "Surrendered > consultant > products > segments > reasons. Cluster: affordability, dissatisfaction, churning.", action: "Affordability: needs analysis review. Dissatisfaction: service check. Churning: compliance escalation." },
  "D12:CrossJurisdiction": { definition: "Cross-border compliance enforcement.", trigger: "Consultant serves > 1 jurisdiction OR cross-border sale", logic: "Consultant > clients > jurisdictions > conduct rules. Check licensing, approvals, KYC.", action: "Gap: restrict. Product not approved: block + alternative. KYC gap: trigger D5." },
};

const entities_list = [
  { id: "Platform", domain: "organization", size: 18 },{ id: "MemberFirm", domain: "organization", size: 22 },{ id: "BusinessUnit", domain: "organization", size: 14 },{ id: "CentreOfExcellence", domain: "organization", size: 12 },{ id: "CorpServiceFunction", domain: "organization", size: 11 },
  { id: "Consultant", domain: "distribution", size: 24 },{ id: "Team", domain: "distribution", size: 16 },{ id: "TeamLeader", domain: "distribution", size: 13 },{ id: "AgencyLeader", domain: "distribution", size: 12 },{ id: "RecruitmentCohort", domain: "distribution", size: 10 },{ id: "TrainingProgram", domain: "distribution", size: 11 },
  { id: "Client", domain: "client", size: 24 },{ id: "ClientSegment", domain: "client", size: 14 },{ id: "LifeStage", domain: "client", size: 12 },{ id: "Household", domain: "client", size: 12 },{ id: "Prospect", domain: "client", size: 11 },
  { id: "Product", domain: "product", size: 22 },{ id: "ProductCategory", domain: "product", size: 14 },{ id: "Provider", domain: "product", size: 16 },{ id: "Fund", domain: "product", size: 14 },{ id: "InvestmentStrategy", domain: "product", size: 11 },{ id: "CommissionStructure", domain: "product", size: 11 },{ id: "BenefitIllustration", domain: "product", size: 10 },
  { id: "Policy", domain: "policy", size: 22 },{ id: "ILPHolding", domain: "policy", size: 13 },{ id: "Coverage", domain: "policy", size: 12 },{ id: "PremiumSchedule", domain: "policy", size: 11 },{ id: "SurrenderEvent", domain: "policy", size: 10 },{ id: "Claim", domain: "policy", size: 11 },
  { id: "Jurisdiction", domain: "compliance", size: 16 },{ id: "RegulatoryBody", domain: "compliance", size: 13 },{ id: "License", domain: "compliance", size: 12 },{ id: "KYCRecord", domain: "compliance", size: 13 },{ id: "ConductRule", domain: "compliance", size: 12 },{ id: "AuditFinding", domain: "compliance", size: 11 },
  { id: "IncentiveScheme", domain: "performance", size: 14 },{ id: "Target", domain: "performance", size: 13 },{ id: "Certification", domain: "performance", size: 11 },
];

const metrics_list = [
  { id: "M1:NetNewAUM", connects: ["MemberFirm","Client","Fund"] },{ id: "M2:ConsultantProductivity", connects: ["Consultant","MemberFirm","ProductCategory"] },{ id: "M3:PolicyPersistency", connects: ["Policy","Product","Consultant"] },{ id: "M4:ClientRetention", connects: ["Client","MemberFirm","ClientSegment"] },{ id: "M5:ConsultantAttrition", connects: ["Consultant","Team","RecruitmentCohort"] },{ id: "M6:NewClientAcquisition", connects: ["Client","Consultant","Prospect"] },{ id: "M7:ProductPenetration", connects: ["Client","ProductCategory","ClientSegment"] },{ id: "M8:CrossSellRatio", connects: ["Policy","Client","Consultant"] },{ id: "M9:IncentiveAchievement", connects: ["IncentiveScheme","Consultant","MemberFirm"] },{ id: "M10:CasesClosed", connects: ["Policy","Consultant","Team"] },{ id: "M11:AvgCaseSize", connects: ["Policy","ProductCategory","ClientSegment"] },{ id: "M12:CommissionIncome", connects: ["Consultant","CommissionStructure","Product"] },{ id: "M13:OperatingMargin", connects: ["MemberFirm","CorpServiceFunction"] },{ id: "M14:TrainingCompletion", connects: ["TrainingProgram","Consultant","MemberFirm"] },{ id: "M15:KYCCompliance", connects: ["KYCRecord","Client","Jurisdiction"] },{ id: "M16:RightSellingScore", connects: ["Policy","Client","ConductRule"] },{ id: "M17:CoverageGapIndex", connects: ["Client","LifeStage","ProductCategory"] },{ id: "M18:FundNetInflow", connects: ["Fund","InvestmentStrategy","MemberFirm"] },
];

const decisions_list = [
  { id: "D1:CapitalAllocation", connects: ["MemberFirm","M1:NetNewAUM","M2:ConsultantProductivity","M13:OperatingMargin"] },{ id: "D2:ConsultantIntervention", connects: ["Consultant","M2:ConsultantProductivity","M5:ConsultantAttrition","TrainingProgram"] },{ id: "D3:ProductPushStrategy", connects: ["Product","M7:ProductPenetration","ClientSegment","Consultant"] },{ id: "D4:IncentiveAdjustment", connects: ["IncentiveScheme","M9:IncentiveAchievement","MemberFirm"] },{ id: "D5:ClientReKYC", connects: ["KYCRecord","Client","M15:KYCCompliance","Jurisdiction"] },{ id: "D6:SuitabilityEscalation", connects: ["Policy","Client","M16:RightSellingScore","ConductRule"] },{ id: "D7:ConsultantDevelopment", connects: ["Consultant","Certification","M2:ConsultantProductivity","TrainingProgram"] },{ id: "D8:NewFirmIntegration", connects: ["MemberFirm","Platform","CentreOfExcellence"] },{ id: "D9:CoEResourceAllocation", connects: ["CentreOfExcellence","M14:TrainingCompletion","MemberFirm"] },{ id: "D10:ConcentrationRiskAlert", connects: ["Client","Policy","Provider","M16:RightSellingScore"] },{ id: "D11:ChurnInvestigation", connects: ["SurrenderEvent","M3:PolicyPersistency","Consultant"] },{ id: "D12:CrossJurisdiction", connects: ["Consultant","Jurisdiction","ConductRule","License"] },
];

const ontologyEdges = [
  { source:"MemberFirm",target:"Platform",label:"PART_OF" },{ source:"BusinessUnit",target:"MemberFirm",label:"OPERATES_UNDER" },{ source:"CentreOfExcellence",target:"CorpServiceFunction",label:"DELIVERS" },{ source:"CorpServiceFunction",target:"MemberFirm",label:"SERVES" },{ source:"Consultant",target:"Team",label:"MEMBER_OF" },{ source:"Team",target:"TeamLeader",label:"LED_BY" },{ source:"Team",target:"BusinessUnit",label:"SITS_IN" },{ source:"AgencyLeader",target:"BusinessUnit",label:"OVERSEES" },{ source:"Consultant",target:"RecruitmentCohort",label:"JOINED_IN" },{ source:"Consultant",target:"TrainingProgram",label:"ENROLLED_IN" },{ source:"Consultant",target:"Certification",label:"HOLDS" },{ source:"Client",target:"Consultant",label:"ADVISED_BY" },{ source:"Client",target:"ClientSegment",label:"CLASSIFIED_AS" },{ source:"Client",target:"LifeStage",label:"CURRENT_STAGE" },{ source:"Client",target:"Household",label:"BELONGS_TO" },{ source:"Prospect",target:"Client",label:"CONVERTS_TO" },{ source:"Prospect",target:"Consultant",label:"ASSIGNED_TO" },{ source:"Product",target:"ProductCategory",label:"CATEGORIZED_AS" },{ source:"Product",target:"Provider",label:"MANUFACTURED_BY" },{ source:"Fund",target:"InvestmentStrategy",label:"FOLLOWS" },{ source:"Product",target:"CommissionStructure",label:"COMPENSATED_VIA" },{ source:"Policy",target:"Client",label:"HELD_BY" },{ source:"Policy",target:"Product",label:"INSTANCE_OF" },{ source:"Policy",target:"Consultant",label:"SOLD_BY" },{ source:"ILPHolding",target:"Fund",label:"ALLOCATED_TO" },{ source:"Coverage",target:"Policy",label:"ATTACHED_TO" },{ source:"KYCRecord",target:"Client",label:"DOCUMENTS" },{ source:"ConductRule",target:"Jurisdiction",label:"GOVERNED_BY" },{ source:"MemberFirm",target:"Jurisdiction",label:"LICENSED_IN" },{ source:"AuditFinding",target:"MemberFirm",label:"RAISED_FOR" },{ source:"IncentiveScheme",target:"Consultant",label:"APPLIES_TO" },{ source:"Target",target:"BusinessUnit",label:"SET_FOR" },
];

const metricEdges = []; metrics_list.forEach(m => m.connects.forEach(c => metricEdges.push({ source: m.id, target: c, label: "USES_METRIC" })));
const decisionEdges = []; decisions_list.forEach(d => d.connects.forEach(c => decisionEdges.push({ source: d.id, target: c, label: "USES_INPUT" })));

const allNodes = [
  ...entities_list.map(e => ({ ...e, type: "entity", color: DOMAIN_COLORS[e.domain] })),
  ...metrics_list.map(m => ({ id: m.id, type: "metric", domain: "metric", size: 10, color: METRIC_COLOR })),
  ...decisions_list.map(d => ({ id: d.id, type: "decision", domain: "decision", size: 13, color: DECISION_COLOR })),
];
const allEdges = [...ontologyEdges, ...metricEdges, ...decisionEdges].map((e, i) => ({ ...e, id: i }));

const DOMAIN_LABELS = { organization:"Organization", distribution:"Distribution & People", client:"Client & Relationships", product:"Product & Provider", policy:"Policy & Holdings", compliance:"Compliance & Regulatory", performance:"Performance & Incentive", metric:"Metrics", decision:"Decisions" };

function fmt(id) { return id.replace(/^[MD]\d+:/, "").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2"); }

function Section({ title, value, mono, placeholder }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: "#2D5A3D", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{title}</div>
      {placeholder ? (
        <div style={{ padding: "10px 12px", background: "#FAFAF8", border: "1px dashed #E5E2DB", borderRadius: 4, fontSize: 11, color: "#999", fontFamily: "JetBrains Mono, monospace", fontStyle: "italic" }}>To be populated</div>
      ) : (
        <div style={{ fontSize: mono ? 11 : 12, color: "#1C1C1C", lineHeight: 1.55, fontFamily: mono ? "JetBrains Mono, monospace" : "IBM Plex Sans, sans-serif" }}>{value}</div>
      )}
    </div>
  );
}

function DetailPanel({ nodeId, onClose }) {
  if (!nodeId) return null;
  const isM = nodeId.startsWith("M"), isD = nodeId.startsWith("D");
  const typeLabel = isM ? "Metric" : isD ? "Decision" : "Entity";
  const typeColor = isM ? METRIC_COLOR : isD ? DECISION_COLOR : DOMAIN_COLORS[entities_list.find(e => e.id === nodeId)?.domain] || "#555";
  const ed = entityDetails[nodeId], md = metricDetails[nodeId], dd = decisionDetails[nodeId];

  return (
    <div style={{ position: "absolute", top: 92, right: 12, width: 360, maxHeight: "calc(100vh - 140px)", background: "#fff", border: "1px solid #E5E2DB", borderRadius: 8, zIndex: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "auto", fontFamily: "IBM Plex Sans, sans-serif" }}>
      <div style={{ padding: "14px 16px 12px", borderBottom: "1px solid #E5E2DB", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: typeColor, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{typeLabel}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#1C1C1C" }}>{fmt(nodeId)}</div>
          {ed && <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>{ed.domain}</div>}
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, color: "#999", cursor: "pointer", padding: "0 4px", lineHeight: 1 }}>&times;</button>
      </div>
      <div style={{ padding: "14px 16px 20px" }}>
        {ed && (<>
          <Section title="Definition" value={ed.definition} />
          <Section title="Grain" value={ed.grain} mono />
          <Section title="Attributes" value={ed.attributes} />
          <Section title="Data Mapping" value={ed.mapping} mono />
          <Section title="Query / Function" placeholder />
        </>)}
        {md && (<>
          <Section title="Definition" value={md.definition} />
          <Section title="Formula" value={md.formula} mono />
          <Section title="Dimensions" value={md.dimensions} />
          <Section title="Thresholds" value={md.thresholds} />
          <Section title="Diagnostic Tree" value={md.diagnostic} />
          <Section title="Query / Function" placeholder />
        </>)}
        {dd && (<>
          <Section title="Definition" value={dd.definition} />
          <Section title="Trigger" value={dd.trigger} mono />
          <Section title="Evaluation Logic" value={dd.logic} />
          <Section title="Recommended Action" value={dd.action} />
          <Section title="Query / Function" placeholder />
        </>)}
      </div>
    </div>
  );
}

export default function AscendBKG() {
  const svgRef = useRef(null);
  const [activeFilters, setActiveFilters] = useState(new Set(Object.keys(DOMAIN_LABELS)));
  const [selectedNode, setSelectedNode] = useState(null);
  const [dims, setDims] = useState({ w: 1200, h: 800 });

  useEffect(() => { setDims({ w: window.innerWidth, h: window.innerHeight - 120 }); }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const { w, h } = dims;
    const svg = d3.select(svgRef.current); svg.selectAll("*").remove();

    const nodes = allNodes.filter(n => activeFilters.has(n.domain)).map(n => ({ ...n }));
    const nids = new Set(nodes.map(n => n.id));
    const edges = allEdges.filter(e => nids.has(e.source) && nids.has(e.target)).map(e => ({ ...e }));

    const sim = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(edges).id(d => d.id).distance(d => d.label === "USES_METRIC" || d.label === "USES_INPUT" ? 120 : 90).strength(0.3))
      .force("charge", d3.forceManyBody().strength(-280))
      .force("center", d3.forceCenter(w / 2, h / 2))
      .force("collision", d3.forceCollide().radius(d => d.size + 12))
      .force("x", d3.forceX(w / 2).strength(0.04))
      .force("y", d3.forceY(h / 2).strength(0.04));

    const g = svg.append("g");
    svg.call(d3.zoom().scaleExtent([0.2, 4]).on("zoom", e => g.attr("transform", e.transform)));

    const linkG = g.append("g").selectAll("g").data(edges).join("g");
    linkG.append("line").attr("stroke","#D0CEC8").attr("stroke-width",1).attr("stroke-opacity",0.5);
    linkG.append("text").text(d => d.label).attr("font-size",7).attr("font-family","JetBrains Mono, monospace").attr("fill","#999").attr("fill-opacity",0.55).attr("text-anchor","middle").attr("dy",-3).attr("paint-order","stroke").attr("stroke","#FAFAF8").attr("stroke-width",3);

    const nodeG = g.append("g").selectAll("g").data(nodes).join("g").style("cursor","pointer");
    nodeG.each(function(d) {
      const el = d3.select(this);
      if (d.type === "entity") el.append("circle").attr("r",d.size).attr("fill",d.color).attr("fill-opacity",0.9).attr("stroke","#fff").attr("stroke-width",1.5);
      else if (d.type === "metric") { const s=d.size; el.append("rect").attr("width",s*2).attr("height",s*2).attr("x",-s).attr("y",-s).attr("transform","rotate(45)").attr("fill",d.color).attr("fill-opacity",0.9).attr("stroke","#fff").attr("stroke-width",1.5); }
      else { const s=d.size; el.append("path").attr("d",`M 0 ${-s*1.2} L ${s*1.1} ${s*0.8} L ${-s*1.1} ${s*0.8} Z`).attr("fill",d.color).attr("fill-opacity",0.9).attr("stroke","#fff").attr("stroke-width",1.5); }
    });

    nodeG.append("text").text(d => fmt(d.id)).attr("font-size",d => d.type==="entity"?10:8).attr("font-family",d => d.type==="entity"?"IBM Plex Sans, sans-serif":"JetBrains Mono, monospace").attr("font-weight",d => d.type==="entity"&&d.size>16?"600":"400").attr("fill","#1C1C1C").attr("text-anchor","middle").attr("dy",d => d.size+14).attr("paint-order","stroke").attr("stroke","#FAFAF8").attr("stroke-width",3);

    nodeG.call(d3.drag()
      .on("start",(e,d)=>{ if(!e.active)sim.alphaTarget(0.3).restart();d.fx=d.x;d.fy=d.y; })
      .on("drag",(e,d)=>{ d.fx=e.x;d.fy=e.y; })
      .on("end",(e,d)=>{ if(!e.active)sim.alphaTarget(0);d.fx=null;d.fy=null; }));

    nodeG.on("mouseenter",(e,d)=>{
      const c=new Set([d.id]); edges.forEach(e=>{ const s=typeof e.source==="object"?e.source.id:e.source,t=typeof e.target==="object"?e.target.id:e.target; if(s===d.id)c.add(t);if(t===d.id)c.add(s); });
      nodeG.attr("opacity",n=>c.has(n.id)?1:0.12);
      linkG.attr("opacity",e=>{ const s=typeof e.source==="object"?e.source.id:e.source,t=typeof e.target==="object"?e.target.id:e.target; return(s===d.id||t===d.id)?1:0.05; });
      linkG.selectAll("text").attr("fill-opacity",e=>{ const s=typeof e.source==="object"?e.source.id:e.source,t=typeof e.target==="object"?e.target.id:e.target; return(s===d.id||t===d.id)?1:0.05; });
    }).on("mouseleave",()=>{ nodeG.attr("opacity",1);linkG.attr("opacity",1);linkG.selectAll("text").attr("fill-opacity",0.55); });

    nodeG.on("click",(e,d)=>{ e.stopPropagation(); setSelectedNode(prev => prev===d.id?null:d.id); });
    svg.on("click",()=>setSelectedNode(null));

    sim.on("tick",()=>{
      linkG.selectAll("line").attr("x1",d=>d.source.x).attr("y1",d=>d.source.y).attr("x2",d=>d.target.x).attr("y2",d=>d.target.y);
      linkG.selectAll("text").attr("x",d=>(d.source.x+d.target.x)/2).attr("y",d=>(d.source.y+d.target.y)/2);
      nodeG.attr("transform",d=>`translate(${d.x},${d.y})`);
    });
    return ()=>sim.stop();
  }, [activeFilters, dims]);

  const allDomains = [...Object.entries(DOMAIN_COLORS).map(([k,v])=>({key:k,color:v,type:"entity"})),{key:"metric",color:METRIC_COLOR,type:"metric"},{key:"decision",color:DECISION_COLOR,type:"decision"}];

  return (
    <div style={{ background:"#FAFAF8", width:"100%", height:"100vh", fontFamily:"IBM Plex Sans, sans-serif", position:"relative" }}>
      <div style={{ padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #E5E2DB" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:12 }}>
          <span style={{ fontWeight:700, color:"#2D5A3D", fontSize:15 }}>questt.</span>
          <span style={{ fontSize:14, color:"#1C1C1C", fontWeight:600 }}>Ascend Asia</span>
          <span style={{ fontSize:12, color:"#999", fontFamily:"Georgia, serif", fontStyle:"italic" }}>Business Knowledge Graph</span>
        </div>
        <div style={{ display:"flex", gap:6, fontSize:11, color:"#999" }}>
          <span>38 entities</span><span style={{color:"#E5E2DB"}}>|</span>
          <span>18 metrics</span><span style={{color:"#E5E2DB"}}>|</span>
          <span>12 decisions</span><span style={{color:"#E5E2DB"}}>|</span>
          <span>32 relationships</span>
        </div>
      </div>
      <div style={{ padding:"8px 20px", display:"flex", gap:6, flexWrap:"wrap", borderBottom:"1px solid #E5E2DB" }}>
        {allDomains.map(d => {
          const a = activeFilters.has(d.key);
          return (<button key={d.key} onClick={()=>{setActiveFilters(p=>{const n=new Set(p);if(n.has(d.key))n.delete(d.key);else n.add(d.key);return n;});}} style={{ display:"flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:4,border:`1px solid ${a?d.color:"#E5E2DB"}`,background:a?d.color+"12":"transparent",color:a?d.color:"#999",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"IBM Plex Sans, sans-serif",transition:"all 0.15s" }}>
            {d.type==="entity"&&<span style={{width:8,height:8,borderRadius:"50%",background:d.color,opacity:a?1:0.3}}/>}
            {d.type==="metric"&&<span style={{width:8,height:8,background:d.color,transform:"rotate(45deg)",opacity:a?1:0.3}}/>}
            {d.type==="decision"&&<span style={{width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderBottom:`8px solid ${d.color}`,opacity:a?1:0.3}}/>}
            {DOMAIN_LABELS[d.key]}
          </button>);
        })}
      </div>
      <DetailPanel nodeId={selectedNode} onClose={()=>setSelectedNode(null)} />
      <svg ref={svgRef} width={dims.w} height={dims.h} style={{display:"block"}} />
    </div>
  );
}

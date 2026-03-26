"use client";
import { useState, useRef, useEffect } from "react";

const KG = {
  ops: { color: "#2563A0", bg: "#E6F1FB", light: "#F0F7FD", label: "Operations KG" },
  framework: { color: "#C45A20", bg: "#FAECE7", light: "#FDF5F2", label: "Framework KG" },
  agent: { color: "#2D5A3D", bg: "#E1F5EE", light: "#F0FAF5", label: "Agent" },
  decision: { color: "#534AB7", bg: "#EEEDFE", light: "#F5F4FF", label: "Decision" },
};

const LAYER = {
  ontology: { shape: "circle", label: "Entity" },
  metrics: { shape: "diamond", label: "Metric" },
  decisions: { shape: "triangle", label: "Decision" },
};

const DC = {
  organization: "#2D5A3D", distribution: "#2563A0", client: "#7B2D8E",
  product: "#C45A20", policy: "#1A7A6D", compliance: "#B83230",
  performance: "#5A6B2D", incentive: "#5A6B2D", strategy: "#378ADD",
  risk: "#B83230", conduct: "#B83230", treatment: "#993556",
};

const TRAILS = [
  {
    id: "consultant",
    title: "Consultant intervention decision",
    subtitle: "Identify underperformance, diagnose root cause, recommend targeted action",
    outcome: "Product training on HNW solutions + mentorship pairing, not generic performance plan",
    customer: "Amelia T., finexis SG consultant, Tier 2, 18-month tenure, insurance-focused team",
    steps: [
      {
        kg: "ops", layer: "ontology", pass: 1,
        title: "Pull consultant profile & context",
        nodes: [
          { id: "Consultant", domain: "distribution", layer: "ontology" },
          { id: "Team", domain: "distribution", layer: "ontology" },
          { id: "MemberFirm", domain: "organization", layer: "ontology" },
          { id: "RecruitmentCohort", domain: "distribution", layer: "ontology" },
          { id: "Certification", domain: "performance", layer: "ontology" },
        ],
        edges: [
          "Consultant → MEMBER_OF → Team",
          "Team → SITS_IN → BusinessUnit(Insurance)",
          "BusinessUnit → OPERATES_UNDER → MemberFirm(finexis SG)",
          "Consultant → JOINED_IN → RecruitmentCohort(2024-Q3)",
          "Consultant → HOLDS → Certification(CMFAS M5, M9)",
        ],
        inference: "Amelia T., joined Q3 2024, 18 months tenure. Team: SG Insurance Unit 3, led by David Lim (top-quartile leader). Certifications: CMFAS M5 and M9 (can sell life and ILP). No M9A (cannot sell credit/alternatives). Recruitment cohort: 12 joined, 9 still active (75% survival). Amelia is the only one in cohort flagged for intervention.",
        carry: "Profile loaded. She has the right certifications for core products. Same cohort peers are performing. Team leader is strong. Issue is consultant-specific, not environmental.",
      },
      {
        kg: "ops", layer: "metrics", pass: 2,
        title: "Compute performance metrics & benchmark",
        nodes: [
          { id: "M2:ConsultantProductivity", domain: "distribution", layer: "metrics" },
          { id: "M10:CasesClosed", domain: "distribution", layer: "metrics" },
          { id: "M11:AvgCaseSize", domain: "product", layer: "metrics" },
          { id: "M8:CrossSellRatio", domain: "distribution", layer: "metrics" },
          { id: "M12:CommissionIncome", domain: "performance", layer: "metrics" },
        ],
        edges: [
          "Consultant → USES_INPUT → M2:ConsultantProductivity",
          "Consultant → USES_INPUT → M10:CasesClosed",
          "Consultant → USES_INPUT → M11:AvgCaseSize",
          "Consultant → USES_INPUT → M8:CrossSellRatio",
          "M2 normalized by firm_maturity × product_mix_idx",
        ],
        inference: "M2 (productivity): $4,200/mo, firm P18 (below P25 threshold, triggers D2). M10 (cases closed): 3.8/mo vs team avg 4.2 — slightly below but not alarming. M11 (avg case size): $1,100 vs team avg $2,400 — THIS is the outlier. She's closing nearly as many cases but at half the premium. M8 (cross-sell): 15% vs 35% avg — very low. M12 (commission): $3,800/mo vs P50 $6,100.",
        carry: "Root cause narrowing: case VOLUME is close to normal. Case SIZE is the problem. She's writing small retail policies, not graduating to HNW cases. Cross-sell is nearly absent.",
      },
      {
        kg: "ops", layer: "ontology", pass: 3,
        title: "Examine client book composition",
        nodes: [
          { id: "Client", domain: "client", layer: "ontology" },
          { id: "ClientSegment", domain: "client", layer: "ontology" },
          { id: "Policy", domain: "policy", layer: "ontology" },
          { id: "ProductCategory", domain: "product", layer: "ontology" },
        ],
        edges: [
          "Consultant ← ADVISED_BY ← Client (all)",
          "Client → CLASSIFIED_AS → ClientSegment",
          "Client ← HELD_BY ← Policy",
          "Policy → INSTANCE_OF → Product → CATEGORIZED_AS → ProductCategory",
        ],
        inference: "42 active clients. Segment breakdown: 38 retail (90%), 4 HNW (10%) — team avg is 65% retail / 35% HNW. Product mix: 34 term life, 6 health, 2 ILP — almost no ILP penetration despite M9 certification. Her 4 HNW clients all have single policies. No client has more than one product from her. Coverage gap index (M17) across her book: 62% — her clients have significant unmet needs she hasn't addressed.",
        carry: "Clear picture: she's stuck in retail term-life. Not converting to HNW, not cross-selling, not using her ILP license. The opportunity is sitting in her own book.",
      },
      {
        kg: "ops", layer: "ontology", pass: 4,
        title: "Check training & development history",
        nodes: [
          { id: "TrainingProgram", domain: "distribution", layer: "ontology" },
          { id: "M14:TrainingCompletion", domain: "distribution", layer: "metrics" },
          { id: "IncentiveScheme", domain: "performance", layer: "ontology" },
          { id: "M9:IncentiveAchievement", domain: "performance", layer: "metrics" },
        ],
        edges: [
          "Consultant → ENROLLED_IN → TrainingProgram (all)",
          "TrainingProgram → USES_INPUT → M14:TrainingCompletion",
          "IncentiveScheme → APPLIES_TO → Consultant",
          "Consultant → USES_INPUT → M9:IncentiveAchievement",
        ],
        inference: "Training: completed all mandatory compliance modules (100%). But: 0 of 3 available product training modules completed (ILP fundamentals, HNW needs analysis, retirement planning). These are optional — she hasn't opted in. Incentive: currently at 45% of quarterly threshold — will miss Q1 target. Has missed 2 of last 3 quarters. Team leader David has flagged her in weekly reviews but no formal action yet.",
        carry: "She has the certification but not the product knowledge. Never took optional ILP or HNW training. The gap is product competency, not effort or attitude.",
      },
      {
        kg: "framework", layer: "ontology", pass: 1,
        title: "Match pattern to intervention strategy",
        nodes: [
          { id: "InterventionMatrix", domain: "treatment", layer: "ontology" },
          { id: "DevelopmentPath", domain: "strategy", layer: "ontology" },
          { id: "MentorshipRules", domain: "strategy", layer: "ontology" },
        ],
        edges: [
          "InterventionMatrix → pattern(low_size, low_crosssell, high_volume)",
          "DevelopmentPath → STAGE_OF → CareerLadder",
          "MentorshipRules → CONSTRAINS → DevelopmentPath",
        ],
        inference: "Intervention matrix: low case size + low cross-sell + adequate volume = 'Product Competency Gap' segment — NOT 'Performance Issue'. Treatment: product upskilling, not performance management. Development path: Tier 2 → Tier 3 requires ILP competency + 4 HNW cases/quarter. Mentorship rules: pair with top-quartile consultant in same segment who has successfully transitioned from retail to HNW. David Lim's team has 2 eligible mentors.",
        carry: "This is a development opportunity, not a performance problem. Treatment: upskill on products, pair with mentor, create a path to Tier 3.",
      },
      {
        kg: "framework", layer: "metrics", pass: 2,
        title: "Validate intervention effectiveness",
        nodes: [
          { id: "InterventionEffect", domain: "treatment", layer: "metrics" },
          { id: "CohortBenchmark", domain: "strategy", layer: "metrics" },
        ],
        edges: [
          "InterventionMatrix → USES_INPUT → InterventionEffect",
          "RecruitmentCohort → USES_INPUT → CohortBenchmark",
        ],
        inference: "Historical: consultants in 'Product Competency Gap' segment who received product training + mentorship showed avg case size increase of 85% within 2 quarters. 68% successfully transitioned to regular HNW cases. Without intervention, 40% of this segment attrite within 12 months. Cohort benchmark: her 8 active cohort peers average $2,100 case size — she can reach this with proper upskilling.",
        carry: "Strong evidence for intervention over performance plan. 85% case size uplift vs 40% attrition risk if left unaddressed.",
      },
      {
        kg: "decision", layer: "decisions", pass: 0,
        title: "Consultant Intervention → Decision",
        nodes: [
          { id: "D2:ConsultantIntervention", domain: "treatment", layer: "decisions" },
        ],
        edges: [
          "M2:ConsultantProductivity → USES_METRIC → D2",
          "M11:AvgCaseSize → USES_METRIC → D2",
          "InterventionMatrix → USES_INPUT → D2",
          "DevelopmentPath → USES_INPUT → D2",
          "MentorshipRules → USES_INPUT → D2",
        ],
        inference: null, carry: null,
        decision: {
          flag: "Product competency gap — Development intervention, not performance management",
          action: "Enroll in ILP Fundamentals + HNW Needs Analysis training (8 hours total, next 4 weeks). Pair with Sarah Chen (Team 3, top-quartile, successfully transitioned retail → HNW in 2024). Weekly 30-min mentorship for 8 weeks.",
          target: "Case size target: $1,800/mo by end of Q2 (from $1,100). Cross-sell 2 existing retail clients into ILP. Convert 1 retail client to HNW segment.",
          team_leader_brief: "David: Amelia's volume is fine — she's working hard. The gap is product knowledge. She's never taken optional ILP/HNW training. Pair her with Sarah, track case size weekly, and review in 8 weeks. This is a growth path to Tier 3, not a PIP.",
          predicted: "85% probability of case size uplift to >$2,000 within 2 quarters. 68% chance of regular HNW cases. Without intervention: 40% attrition risk within 12 months.",
        },
      },
    ],
  },
  {
    id: "suitability",
    title: "Right-selling suitability check",
    subtitle: "Is this product appropriate for this client given their profile and circumstances?",
    outcome: "Flag and redirect — aggressive ILP unsuitable, recommend balanced fund + term plan instead",
    customer: "Mr. Tan KH, 61, recently retired, conservative risk profile, finexis SG client",
    steps: [
      {
        kg: "ops", layer: "ontology", pass: 1,
        title: "Pull client profile & current holdings",
        nodes: [
          { id: "Client", domain: "client", layer: "ontology" },
          { id: "ClientSegment", domain: "client", layer: "ontology" },
          { id: "LifeStage", domain: "client", layer: "ontology" },
          { id: "Policy", domain: "policy", layer: "ontology" },
          { id: "KYCRecord", domain: "compliance", layer: "ontology" },
        ],
        edges: [
          "Client → CLASSIFIED_AS → ClientSegment(HNW)",
          "Client → CURRENT_STAGE → LifeStage(Retirement)",
          "Client ← HELD_BY ← Policy (all active)",
          "KYCRecord → DOCUMENTS → Client",
        ],
        inference: "Mr. Tan KH, 61, HNW segment ($380K AUM). Life stage: retirement (just retired 3 months ago). Current holdings: 2 term life policies (adequate coverage), 1 health insurance, 1 endowment (maturing next year). KYC: last updated 8 months ago. Risk profile on record: CONSERVATIVE. Investment horizon: SHORT (3-5 years). Income: CPF drawdown + rental income — no active employment.",
        carry: "Retired, conservative, short horizon, no earned income. Any new product must fit this profile.",
      },
      {
        kg: "ops", layer: "ontology", pass: 2,
        title: "Read the pending policy submission",
        nodes: [
          { id: "Policy(pending)", domain: "policy", layer: "ontology" },
          { id: "Product", domain: "product", layer: "ontology" },
          { id: "Fund", domain: "product", layer: "ontology" },
          { id: "Consultant", domain: "distribution", layer: "ontology" },
        ],
        edges: [
          "Policy(pending) → INSTANCE_OF → Product(AggressiveGrowthILP)",
          "Product → ALLOCATED_TO → Fund(AsiaEquityGrowth)",
          "Policy(pending) → SOLD_BY → Consultant(James W.)",
        ],
        inference: "Pending submission: Aggressive Growth ILP, single premium $80K, allocated 100% to Asia Equity Growth Fund. Fund risk rating: HIGH. Expected volatility: 22% annualized. Minimum recommended horizon: 10+ years. Sold by James W. (Tier 3 consultant, 4 years tenure, strong ILP track record). Commission: 3.5% initial ($2,800).",
        carry: "Red flags already visible: HIGH risk fund, 10-year horizon product, sold to a 61-year-old conservative retiree with 3-5 year horizon.",
      },
      {
        kg: "framework", layer: "ontology", pass: 1,
        title: "Apply conduct rules for jurisdiction",
        nodes: [
          { id: "ConductRule", domain: "conduct", layer: "ontology" },
          { id: "Jurisdiction", domain: "compliance", layer: "ontology" },
          { id: "SuitabilityCriteria", domain: "conduct", layer: "ontology" },
        ],
        edges: [
          "ConductRule → GOVERNED_BY → Jurisdiction(SG/MAS)",
          "SuitabilityCriteria → PART_OF → ConductRule",
        ],
        inference: "MAS FAA-N16 Guidelines: Financial adviser must have reasonable basis for recommendation. Suitability assessment must consider: (1) client's investment objectives, (2) financial situation, (3) particular needs, (4) risk tolerance. Aggressive growth products for clients with conservative risk profile require: documented rationale, client acknowledgment of risk mismatch, supervisor sign-off. MAS has fined firms for persistent right-selling failures — $50K-$500K range.",
        carry: "MAS rules are clear: this combination requires exceptional documented justification or it's a suitability failure.",
      },
      {
        kg: "ops", layer: "metrics", pass: 3,
        title: "Score suitability alignment",
        nodes: [
          { id: "M16:RightSellingScore", domain: "compliance", layer: "metrics" },
          { id: "M17:CoverageGapIndex", domain: "client", layer: "metrics" },
        ],
        edges: [
          "Policy(pending) + Client(risk_profile) + Product(risk_rating) → M16",
          "Client + LifeStage + holdings → M17",
        ],
        inference: "M16 Suitability score for this submission: 28/100 (CRITICAL). Mismatch factors: risk profile CONSERVATIVE vs product risk HIGH (-40pts), investment horizon 3-5yr vs minimum 10yr (-25pts), age 61 with no earned income vs aggressive growth (-7pts). M17 Coverage gap: retirement income planning gap identified — his endowment matures next year with no replacement income product. He DOES need an investment product, just not THIS one.",
        carry: "Score 28/100 is well below the 50 threshold — this triggers automatic escalation under D6. But the coverage gap analysis reveals what he actually needs.",
      },
      {
        kg: "framework", layer: "ontology", pass: 2,
        title: "Generate alternative recommendation",
        nodes: [
          { id: "ProductShelf", domain: "product", layer: "ontology" },
          { id: "InvestmentStrategy", domain: "product", layer: "ontology" },
          { id: "RetirementRules", domain: "strategy", layer: "ontology" },
        ],
        edges: [
          "LifeStage(Retirement) + RiskProfile(Conservative) → eligible products",
          "RetirementRules → CONSTRAINS → ProductShelf",
          "InvestmentStrategy(RetirementIncome) → matches → client needs",
        ],
        inference: "Eligible products for conservative/retirement: (1) Ascend Asia Retirement Income Fund — multi-asset, 60% bonds/40% equity, 6-8% target return, monthly income distribution. Risk: LOW-MODERATE. Min horizon: 3 years. (2) Singapore Government Bond Fund — risk: LOW. Both on shelf. The retirement income fund addresses his endowment maturity gap AND matches his risk profile. Plus: he should review term life — at 61, his coverage needs have changed. Possible reduction to free up premium.",
        carry: "Clear alternative path: Retirement Income Fund + term life review. Addresses the actual need (income gap) at appropriate risk.",
      },
      {
        kg: "ops", layer: "ontology", pass: 4,
        title: "Check consultant pattern history",
        nodes: [
          { id: "Consultant(James)", domain: "distribution", layer: "ontology" },
          { id: "M16:History", domain: "compliance", layer: "metrics" },
          { id: "AuditFinding", domain: "compliance", layer: "ontology" },
        ],
        edges: [
          "Consultant(James) → historical → M16 scores (12 months)",
          "AuditFinding → RAISED_FOR → MemberFirm (related)",
        ],
        inference: "James W. M16 history: 94% overall right-selling score (good). But: 3 of his last 5 ILP submissions to 55+ clients scored below 70. Pattern: he's appropriately selling to younger clients but pushing aggressive products to older HNW clients — likely commission-driven (ILP commission 3.5% vs retirement fund 1.2%). No formal audit findings yet, but this is the 3rd flag in 6 months for this specific pattern.",
        carry: "This is not a one-off — it's an emerging pattern with older HNW clients. Compliance needs to address the pattern, not just this case.",
      },
      {
        kg: "decision", layer: "decisions", pass: 0,
        title: "Suitability Escalation → Decision",
        nodes: [
          { id: "D6:SuitabilityEscalation", domain: "conduct", layer: "decisions" },
        ],
        edges: [
          "M16:RightSellingScore(28) → USES_METRIC → D6",
          "ConductRule(MAS FAA-N16) → USES_INPUT → D6",
          "Consultant(pattern) → USES_INPUT → D6",
          "ProductShelf(alternative) → USES_INPUT → D6",
        ],
        inference: null, carry: null,
        decision: {
          flag: "Suitability failure — Block submission, redirect to appropriate product",
          action: "BLOCK: Aggressive Growth ILP submission for Mr. Tan. Score 28/100 (threshold 50). REDIRECT: recommend Retirement Income Fund ($80K, same premium) addressing actual coverage gap. Generate client-facing comparison showing risk-adjusted returns for both products at his horizon.",
          consultant_action: "James W.: require documented explanation for this submission. Flag that this is his 3rd suitability concern with 55+ HNW clients in 6 months. Schedule conduct review with team leader David Lim. Enroll in 'Retirement Needs Analysis' training (mandatory).",
          compliance_brief: "CRO: James W. pattern detected — aggressive ILP to older HNW clients (3 flags in 6 months). Overall right-selling score 94% but segment-specific score for 55+ clients is 71% and declining. Recommend formal conduct review before pattern becomes systemic. No MAS reportable event yet — this is prevention, not remediation.",
          predicted: "If redirected to Retirement Income Fund: 92% suitability score, addresses endowment maturity gap, client retains trust. If original submission processed: regulatory risk, potential MAS inquiry if pattern continues.",
        },
      },
    ],
  },
  {
    id: "performance",
    title: "Platform performance investigation",
    subtitle: "CEO asks: 'Why is finexis HK dragging on AUM growth?'",
    outcome: "HK is not underperforming — it's over-concentrated in a single provider losing share. Product shelf action needed.",
    customer: "Tomas Urbanec (CEO) asks during Monday morning brief",
    steps: [
      {
        kg: "ops", layer: "metrics", pass: 1,
        title: "Pull platform-level AUM metrics",
        nodes: [
          { id: "M1:NetNewAUM", domain: "organization", layer: "metrics" },
          { id: "MemberFirm", domain: "organization", layer: "ontology" },
          { id: "Platform", domain: "organization", layer: "ontology" },
        ],
        edges: [
          "Platform → ALL → MemberFirm",
          "MemberFirm → USES_INPUT → M1:NetNewAUM",
        ],
        inference: "Platform consolidated: +1.8% MoM (GREEN). finexis SG: +2.3% (GREEN). Ascend Asia AM: +3.1% (GREEN, driven by credit strategy launch). finexis HK: -0.4% (RED — only entity in negative territory). HK has been amber or red for 3 of the last 4 months. It's 14% of platform AUM but responsible for 100% of the drag.",
        carry: "HK is clearly the issue. But -0.4% could be market movement, redemptions, or operational. Need to decompose.",
      },
      {
        kg: "ops", layer: "metrics", pass: 2,
        title: "Decompose HK AUM movement",
        nodes: [
          { id: "M18:FundNetInflow", domain: "product", layer: "metrics" },
          { id: "M4:ClientRetention", domain: "client", layer: "metrics" },
          { id: "M6:NewClientAcquisition", domain: "distribution", layer: "metrics" },
          { id: "M3:PolicyPersistency", domain: "policy", layer: "metrics" },
        ],
        edges: [
          "M1 decomposition: net_inflow + market_movement + new_clients - redemptions",
          "MemberFirm(HK) → USES_INPUT → M18, M4, M6, M3",
        ],
        inference: "Decomposition: Market movement: +0.8% (positive — markets were up). New client contribution: +0.6% (M6 is healthy — 12 new HNW clients this month). Persistency (M3): 88% (GREEN — no lapse issue). Fund net inflow (M18): -1.8% — THIS is the problem. Existing clients are redeeming. M4 (client retention): 94% (GREEN — clients aren't leaving, they're just moving money OUT of funds while staying as clients).",
        carry: "Clients are staying but pulling money from funds. This is not a retention or sales problem. It's a fund performance or product issue.",
      },
      {
        kg: "ops", layer: "ontology", pass: 3,
        title: "Trace redemptions to specific funds & providers",
        nodes: [
          { id: "Fund", domain: "product", layer: "ontology" },
          { id: "Provider", domain: "product", layer: "ontology" },
          { id: "ILPHolding", domain: "policy", layer: "ontology" },
          { id: "Client", domain: "client", layer: "ontology" },
        ],
        edges: [
          "ILPHolding → ALLOCATED_TO → Fund",
          "Fund → MANUFACTURED_BY → Provider",
          "Policy ← HELD_BY ← Client",
          "Redemption events → grouped by Fund, Provider",
        ],
        inference: "Redemption concentration: 72% of all HK redemptions are from 2 funds, both from Provider: Eastbridge Asset Management. Fund A (Asia Growth): -$2.1M (underperformed benchmark by 340bps last quarter). Fund B (Greater China Equity): -$1.4M (underperformed by 520bps). Other providers: net positive or flat. Eastbridge exposure: 41% of HK's total fund AUM — significantly over-concentrated. Only 3 providers on HK shelf vs 8 on SG shelf.",
        carry: "Root cause found: HK is over-concentrated in Eastbridge, which is underperforming. Clients are redeeming from Eastbridge funds specifically. The product shelf is too narrow.",
      },
      {
        kg: "ops", layer: "ontology", pass: 4,
        title: "Check consultant response & client conversations",
        nodes: [
          { id: "Consultant", domain: "distribution", layer: "ontology" },
          { id: "M2:ConsultantProductivity", domain: "distribution", layer: "metrics" },
          { id: "M7:ProductPenetration", domain: "product", layer: "metrics" },
        ],
        edges: [
          "MemberFirm(HK) ← MEMBER_OF ← Consultant (all)",
          "Consultant → USES_INPUT → M2, M7",
        ],
        inference: "HK has 18 consultants. M2 (productivity) is actually UP 5% MoM — consultants are working harder to retain. M7 (product penetration): HK avg 1.4 product categories per client vs SG avg 2.3. HK consultants report (from CRM notes): 6 clients this month asked for alternatives to Eastbridge. 3 clients explicitly said competitors offered them better-performing Asia funds. Consultants don't have alternatives to offer — the shelf is the constraint.",
        carry: "Consultants are doing the right thing but are shelf-constrained. They're losing client money not because of advice quality but because they can't offer competitive alternatives.",
      },
      {
        kg: "framework", layer: "ontology", pass: 1,
        title: "Check product shelf expansion rules & pipeline",
        nodes: [
          { id: "ProductShelf", domain: "product", layer: "ontology" },
          { id: "ProviderOnboarding", domain: "strategy", layer: "ontology" },
          { id: "Jurisdiction", domain: "compliance", layer: "ontology" },
        ],
        edges: [
          "ProductShelf → BY_JURISDICTION → Jurisdiction(HK/SFC)",
          "ProviderOnboarding → REQUIRED_FOR → new provider addition",
          "SFC → GOVERNS → product approval requirements",
        ],
        inference: "HK shelf: 3 providers, 11 funds. SG shelf: 8 providers, 34 funds. The SG shelf was expanded in Q3 2025 during the Ascend Asia AM rebrand — HK was not included in that expansion. SFC product approval timeline: 6-8 weeks for funds from providers already SFC-licensed. Ascend Asia AM's new credit strategy fund IS SFC-registered but has NOT been added to the HK shelf yet. Two additional providers from the SG shelf (both SFC-licensed) could be fast-tracked.",
        carry: "The fix is product shelf expansion, not consultant training or client retention programs. And there's a quick win: the credit strategy fund is already SFC-approved.",
      },
      {
        kg: "decision", layer: "decisions", pass: 0,
        title: "Platform Performance → Decision",
        nodes: [
          { id: "D3:ProductPushStrategy", domain: "strategy", layer: "decisions" },
        ],
        edges: [
          "M1:NetNewAUM(HK, -0.4%) → USES_METRIC → D3",
          "M18:FundNetInflow(Eastbridge, -$3.5M) → USES_METRIC → D3",
          "ProductShelf(HK) → USES_INPUT → D3",
          "Jurisdiction(SFC) → USES_INPUT → D3",
        ],
        inference: null, carry: null,
        decision: {
          flag: "Product shelf gap — not a distribution or retention problem",
          action: "IMMEDIATE (this week): Add Ascend Asia AM Credit Strategy Fund to HK shelf — already SFC-approved. Gives consultants an institutional-grade alternative to offer redemption-minded clients. FAST-TRACK (6-8 weeks): Onboard 2 SFC-licensed providers from SG shelf to HK. Target: diversify HK provider concentration from 41% Eastbridge to <25%.",
          head_of_am: "Faith Chen: HK shelf has 11 funds vs SG's 34. The credit strategy fund is approved but not deployed to HK. This is a configuration issue, not a regulatory one. Priority action.",
          ceo_brief: "Tomas: HK is not underperforming operationally. Consultants are productive (+5% MoM), clients are staying (94% retention), new client acquisition is healthy. The drag is fund redemptions concentrated in one underperforming provider (Eastbridge, 41% of HK AUM). Clients want alternatives; consultants can't offer them. Fix: expand the HK product shelf. Quick win: deploy the credit strategy fund this week.",
          predicted: "If shelf expanded: project +$1.8M net inflow reversal within 2 months as consultants redirect client allocations. If unchanged: continued $1-2M/mo redemption drag, risk of client attrition as competitors offer better alternatives.",
        },
      },
    ],
  },
];

function NodeShape({ domain, layer, size = 14 }) {
  const c = DC[domain] || "#888";
  if (layer === "ontology") return <svg width={size} height={size} viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill={c} stroke="#fff" strokeWidth="1.5" opacity="0.9"/></svg>;
  if (layer === "metrics") return <svg width={size} height={size} viewBox="0 0 20 20"><rect x="4" y="4" width="12" height="12" fill={c} stroke="#fff" strokeWidth="1.5" opacity="0.9" transform="rotate(45 10 10)" rx="1"/></svg>;
  return <svg width={size} height={size} viewBox="0 0 20 20"><polygon points="10,1 19,18 1,18" fill={c} stroke="#fff" strokeWidth="1.5" opacity="0.9"/></svg>;
}

function StepCard({ step, stepIdx, total, isActive }) {
  const kgStyle = KG[step.kg] || KG.agent;
  return (
    <div style={{
      background: "#fff", border: `1px solid ${isActive ? kgStyle.color : "#E5E2DB"}`,
      borderRadius: 10, padding: "16px 20px", opacity: isActive ? 1 : 0.5,
      transition: "all 0.3s ease", boxShadow: isActive ? `0 0 0 3px ${kgStyle.bg}` : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 8px", borderRadius: 4, background: kgStyle.bg, color: kgStyle.color }}>
          {kgStyle.label}{step.pass > 0 ? ` — pass ${step.pass}` : ""}
        </span>
        {step.layer && <span style={{ fontSize: 9, color: "#999", fontWeight: 500 }}>{LAYER[step.layer]?.label}</span>}
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#999" }}>{stepIdx + 1}/{total}</span>
      </div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: "#1C1C1C", marginBottom: 10 }}>{step.title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {step.nodes.map((n, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 5, background: "#F5F3EF", border: "0.5px solid #E5E2DB" }}>
            <NodeShape domain={n.domain} layer={n.layer} size={12} />
            <span style={{ fontSize: 10, fontWeight: 500, color: "#1C1C1C" }}>{n.id}</span>
          </div>
        ))}
      </div>
      {step.edges && step.edges.length > 0 && (
        <div style={{ marginBottom: 10, padding: "6px 10px", background: "#FAFAF8", borderRadius: 6, borderLeft: `3px solid ${kgStyle.color}` }}>
          {step.edges.map((e, i) => (
            <div key={i} style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#555", lineHeight: 1.6 }}>{e}</div>
          ))}
        </div>
      )}
      {step.inference && <div style={{ fontSize: 12, color: "#1C1C1C", lineHeight: 1.6, marginBottom: 10 }}>{step.inference}</div>}
      {step.carry && (
        <div style={{ padding: "8px 12px", background: KG.agent.bg, borderRadius: 6, fontSize: 11, color: KG.agent.color, fontWeight: 500, lineHeight: 1.5 }}>
          {"\u2192"} {step.carry}
        </div>
      )}
      {step.decision && (
        <div style={{ marginTop: 4 }}>
          <div style={{ padding: "10px 14px", background: KG.decision.light, border: `1px solid ${KG.decision.color}`, borderRadius: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: KG.decision.color, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>{step.decision.flag}</div>
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
  let op = 0, fw = 0, nd = 0, ed = 0;
  steps.forEach(s => { if (s.kg === "ops") op++; if (s.kg === "framework") fw++; nd += s.nodes.length; ed += (s.edges?.length || 0); });
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {[
        { label: "Operations KG passes", val: op, color: KG.ops.color },
        { label: "Framework KG passes", val: fw, color: KG.framework.color },
        { label: "Nodes traversed", val: nd, color: "#1C1C1C" },
        { label: "Edges walked", val: ed, color: "#1C1C1C" },
        { label: "Total passes", val: op + fw + 1, color: KG.agent.color },
      ].map(s => (
        <div key={s.label} style={{ padding: "8px 14px", background: "#fff", borderRadius: 6, border: "0.5px solid #E5E2DB", minWidth: 90 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.val}</div>
          <div style={{ fontSize: 9, color: "#999", fontWeight: 500 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [trailIdx, setTrailIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const stepRefs = useRef([]);
  const trail = TRAILS[trailIdx];

  const switchTrail = (i) => { setTrailIdx(i); setStepIdx(0); };

  useEffect(() => {
    if (stepRefs.current[stepIdx]) stepRefs.current[stepIdx].scrollIntoView({ behavior: "smooth", block: "center" });
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
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#2D5A3D" }}>questt.</span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700 }}>Decision trails</span>
          </div>
          <div style={{ height: 2, width: 48, background: "#2D5A3D", margin: "4px 0 6px" }} />
          <div style={{ fontSize: 11, color: "#555" }}>How agents traverse the Business Knowledge Graph to reach a conclusion</div>
        </div>

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

        <div style={{ background: "#fff", border: "0.5px solid #E5E2DB", borderRadius: 10, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: "#1C1C1C", marginBottom: 4 }}>{trail.title}</div>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>{trail.subtitle}</div>
          <div style={{ fontSize: 11, padding: "6px 10px", background: "#F5F3EF", borderRadius: 5, marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Scenario: </span>{trail.customer}
          </div>
          <div style={{ fontSize: 11, padding: "6px 10px", background: KG.decision.light, borderRadius: 5, border: `0.5px solid ${KG.decision.color}` }}>
            <span style={{ fontWeight: 600, color: KG.decision.color }}>Outcome: </span>{trail.outcome}
          </div>
        </div>

        <TraversalSummary steps={trail.steps} />

        <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "16px 0", justifyContent: "center" }}>
          {trail.steps.map((s, i) => {
            const kgc = KG[s.kg] || KG.agent;
            return (
              <div key={i} onClick={() => setStepIdx(i)} style={{
                width: i === stepIdx ? 28 : 10, height: 10, borderRadius: 5,
                background: i === stepIdx ? kgc.color : i < stepIdx ? kgc.color : "#E5E2DB",
                opacity: i === stepIdx ? 1 : i < stepIdx ? 0.4 : 0.3,
                cursor: "pointer", transition: "all 0.2s ease",
              }} />
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {trail.steps.map((s, i) => (
            <div key={i} ref={el => stepRefs.current[i] = el} onClick={() => setStepIdx(i)} style={{ cursor: "pointer" }}>
              <StepCard step={s} stepIdx={i} total={trail.steps.length} isActive={i === stepIdx} />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", position: "sticky", bottom: 12, background: "#FAFAF8", padding: "8px 0" }}>
          <button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} disabled={stepIdx === 0}
            style={{ padding: "8px 20px", borderRadius: 6, border: "0.5px solid #E5E2DB", background: stepIdx === 0 ? "#F5F3EF" : "#fff", color: stepIdx === 0 ? "#999" : "#555", fontSize: 12, cursor: stepIdx === 0 ? "default" : "pointer", fontFamily: "inherit" }}>
            {"\u2190"} Previous
          </button>
          <span style={{ fontSize: 10, color: "#999", alignSelf: "center" }}>Arrow keys to navigate</span>
          <button onClick={() => setStepIdx(Math.min(trail.steps.length - 1, stepIdx + 1))} disabled={stepIdx === trail.steps.length - 1}
            style={{ padding: "8px 20px", borderRadius: 6, border: `0.5px solid ${stepIdx === trail.steps.length - 1 ? "#E5E2DB" : "#2D5A3D"}`, background: stepIdx === trail.steps.length - 1 ? "#F5F3EF" : "#2D5A3D", color: stepIdx === trail.steps.length - 1 ? "#999" : "#fff", fontSize: 12, cursor: stepIdx === trail.steps.length - 1 ? "default" : "pointer", fontWeight: 600, fontFamily: "inherit" }}>
            Next {"\u2192"}
          </button>
        </div>

        <div style={{ textAlign: "center", fontSize: 9, color: "#999", marginTop: 12 }}>questt. {"\u00b7"} Ascend Asia Intelligence Warehouse {"\u00b7"} Decision Trails</div>
      </div>
    </div>
  );
}

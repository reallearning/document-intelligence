"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

// ═══════════════════════════════════════════════════════════════
// MAX LIFE AMLI — BUSINESS KNOWLEDGE GRAPH
// 3 Layers: Ontology → Metrics → Decisions
// ═══════════════════════════════════════════════════════════════

const DOMAIN_COLORS = {
  customer_lead: "#3B82F6",
  product_policy: "#8B5CF6",
  seller: "#10B981",
  channel: "#F59E0B",
  geography: "#06B6D4",
  activity: "#EC4899",
  compliance: "#EF4444",
  metric: "#059669",
  decision: "#1E293B",
};

const DOMAIN_LABELS = {
  customer_lead: "Customer & Lead",
  product_policy: "Product & Policy",
  seller: "Seller & Hierarchy",
  channel: "Channel & Distribution",
  geography: "Geography",
  activity: "Activity & Interaction",
  compliance: "Compliance & Regulation",
  metric: "Metrics",
  decision: "Decisions",
};

// ─── LAYER 1: ONTOLOGY ─────────────────────────────────────

const ontologyNodes = [
  // CUSTOMER & LEAD
  {
    id: "Lead", label: "Lead", domain: "customer_lead", size: 26,
    definition: "A prospect entering the system from any channel — bancassurance referral, digital inquiry, agent-sourced, campaign, or cross-sell. The atomic unit of the sales pipeline.",
    grain: "Lead ID",
    attributes: ["LeadID", "SourceChannel", "SourcePartner", "CaptureTimestamp", "DedupStatus", "EnrichmentState", "CurrentStage", "AssignedAgentID", "LeadScore", "ProductAffinity[]", "IntentSignal", "ContactAttempts", "LastContactDate", "AgingDays"],
    dataMapping: { table: "CRMNXT.lead_master", pk: "lead_id", query: "SELECT l.*, ls.source_name FROM lead_master l JOIN lead_sources ls ON ls.source_id = l.source_id WHERE 1=1" },
  },
  {
    id: "Customer", label: "Customer", domain: "customer_lead", size: 28,
    definition: "An individual with at least one issued policy OR a high-intent prospect with KYC completed. The 360° view — demographics, financial profile, policy portfolio, interaction history, life events.",
    grain: "Customer ID (PAN / Aadhaar-linked)",
    attributes: ["CustomerID", "FullName", "DOB", "Age", "Gender", "MaritalStatus", "IncomeBand", "Occupation", "OccupationSegment", "Education", "PAN", "AadhaarLinked", "Email", "Phone", "AlternatePhone", "Address", "PinCode", "City", "State", "NRI_Flag", "PolicyCount", "TotalPremium", "TotalSumAssured", "CustomerSince", "LifetimeValue", "PersistencyRisk"],
    dataMapping: { table: "CRMNXT.customer_360", pk: "customer_id", query: "SELECT c.*, COUNT(p.policy_id) as policy_count, SUM(p.annual_premium) as total_premium FROM customer_360 c LEFT JOIN policy_master p ON p.customer_id = c.customer_id WHERE 1=1 GROUP BY c.customer_id" },
  },
  {
    id: "LifeEvent", label: "Life Event", domain: "customer_lead", size: 16,
    definition: "A significant life milestone that changes insurance needs — marriage, child birth, child turning 18, retirement approaching, home purchase, job change, health diagnosis. Triggers cross-sell and product re-evaluation.",
    grain: "Customer ID × Event Type × Event Date",
    attributes: ["EventID", "CustomerID", "EventType", "EventDate", "DetectedFrom", "ProductImplication", "ActionTaken"],
    dataMapping: { table: "CRMNXT.life_events", pk: "event_id", query: "SELECT le.*, c.full_name FROM life_events le JOIN customer_360 c ON c.customer_id = le.customer_id WHERE 1=1" },
  },
  {
    id: "IncomeBand", label: "Income Band", domain: "customer_lead", size: 14,
    definition: "Standardised income segmentation driving product eligibility and premium capacity. Not just a bracket — maps to specific product categories, sum assured ranges, and channel affinity patterns.",
    grain: "Band Code",
    attributes: ["BandCode", "BandLabel", "MinIncome", "MaxIncome", "TypicalProducts[]", "AvgPremiumCapacity", "ChannelAffinity"],
    dataMapping: { table: "CRMNXT.ref_income_bands", pk: "band_code", query: "SELECT * FROM ref_income_bands WHERE 1=1" },
  },
  {
    id: "KYCStatus", label: "KYC Status", domain: "customer_lead", size: 12,
    definition: "Know Your Customer verification state — governs whether a lead can progress to proposal. Includes PAN verification, Aadhaar e-KYC, video KYC for remote, and re-KYC for existing customers.",
    grain: "Customer ID × KYC Type",
    attributes: ["CustomerID", "KYCType", "Status", "VerificationDate", "ExpiryDate", "VerifiedBy", "DocumentsOnFile"],
    dataMapping: { table: "CRMNXT.kyc_records", pk: "customer_id, kyc_type", query: "SELECT * FROM kyc_records WHERE 1=1" },
  },

  // PRODUCT & POLICY
  {
    id: "Product", label: "Product", domain: "product_policy", size: 24,
    definition: "An IRDAI-approved insurance plan that can be sold. Each product has eligibility rules, commission structures, and suitability criteria that vary by channel and customer segment.",
    grain: "Product Code (IRDAI UIN)",
    attributes: ["ProductCode", "ProductName", "UIN", "Category", "SubCategory", "MinEntryAge", "MaxEntryAge", "MinSumAssured", "MaxSumAssured", "MinPremium", "PolicyTerm[]", "PremiumPaymentTerm[]", "AvailableRiders[]", "ChannelAvailability[]", "CommissionStructure", "LaunchDate", "Status"],
    dataMapping: { table: "CRMNXT.product_master", pk: "product_code", query: "SELECT pm.*, pc.category_name FROM product_master pm JOIN product_categories pc ON pc.category_id = pm.category_id WHERE 1=1" },
  },
  {
    id: "ProductCategory", label: "Product\nCategory", domain: "product_policy", size: 20,
    definition: "Classification of insurance plans — Term, ULIP, Endowment, Health, Retirement, Child, Savings, Group. Each category has distinct selling motions, customer profiles, and regulatory treatment.",
    grain: "Category ID",
    attributes: ["CategoryID", "CategoryName", "SellingMotion", "TypicalBuyerProfile", "RegulatoryClass", "AvgTicketSize", "AvgConversionRate", "CrossSellAffinity[]"],
    dataMapping: { table: "CRMNXT.product_categories", pk: "category_id", query: "SELECT * FROM product_categories WHERE 1=1" },
  },
  {
    id: "Rider", label: "Rider", domain: "product_policy", size: 14,
    definition: "Add-on benefit attached to a base policy — accidental death, critical illness, waiver of premium, hospital cash. Riders increase ticket size and improve persistency.",
    grain: "Rider Code",
    attributes: ["RiderCode", "RiderName", "Type", "CompatibleProducts[]", "AdditionalPremium%", "ClaimFrequency", "PersistencyImpact"],
    dataMapping: { table: "CRMNXT.rider_master", pk: "rider_code", query: "SELECT * FROM rider_master WHERE 1=1" },
  },
  {
    id: "Policy", label: "Policy", domain: "product_policy", size: 26,
    definition: "An issued, in-force insurance contract. The core revenue unit — premium payments, sum assured, policy status, lapse risk, renewal schedule. Links customer to product to agent to channel.",
    grain: "Policy Number",
    attributes: ["PolicyNumber", "CustomerID", "ProductCode", "SumAssured", "AnnualPremium", "PremiumFrequency", "PolicyTerm", "PPT", "IssueDate", "MaturityDate", "Status", "PersistencyMonth", "LastPremiumDate", "NextDueDate", "LapseRisk", "ChannelOfAcquisition", "SellingAgentID", "RidersAttached[]", "NomineeDetails"],
    dataMapping: { table: "Policy360.policy_master", pk: "policy_number", query: "SELECT p.*, c.full_name, pr.product_name, a.agent_name FROM policy_master p JOIN customer_360 c ON c.customer_id = p.customer_id JOIN product_master pr ON pr.product_code = p.product_code LEFT JOIN agent_master a ON a.agent_id = p.selling_agent_id WHERE 1=1" },
  },
  {
    id: "Renewal", label: "Renewal", domain: "product_policy", size: 16,
    definition: "A premium payment event due on an existing policy. Renewal tracking drives persistency — the single most important metric in life insurance economics. Missed renewals → lapse → entire acquisition cost wasted.",
    grain: "Policy Number × Due Date",
    attributes: ["PolicyNumber", "DueDate", "DueAmount", "PaymentDate", "PaymentMode", "Status", "GracePeriodEnd", "LapseDate", "RevivalEligible", "RemindersSent", "RetentionActionTaken"],
    dataMapping: { table: "Policy360.renewal_schedule", pk: "policy_number, due_date", query: "SELECT rs.*, p.customer_id, p.annual_premium FROM renewal_schedule rs JOIN policy_master p ON p.policy_number = rs.policy_number WHERE 1=1" },
  },

  // SELLER & HIERARCHY
  {
    id: "Agent", label: "Agent /\nSeller", domain: "seller", size: 26,
    definition: "A licensed insurance advisor — tied agent (Agency), bank RM (CAT), direct rep (DMF), or IMF partner. The human who converts leads to policies. Performance varies 10× between top and bottom quartile.",
    grain: "Agent ID (IRDAI license)",
    attributes: ["AgentID", "AgentName", "LicenseNumber", "Channel", "TeamID", "SupervisorID", "Territory", "Tier", "Specialization[]", "ActiveSince", "TotalPoliciesSold", "CurrentMonthPolicies", "ConversionRate", "AvgTicketSize", "Persistency13M", "Persistency61M", "ContactRate", "MeetingRate", "CurrentLeadCount", "CapacitySlots", "PreferredProducts[]", "TopSegments[]"],
    dataMapping: { table: "CRMNXT.agent_master", pk: "agent_id", query: "SELECT a.*, t.team_name, s.supervisor_name FROM agent_master a LEFT JOIN teams t ON t.team_id = a.team_id LEFT JOIN supervisors s ON s.supervisor_id = a.supervisor_id WHERE 1=1" },
  },
  {
    id: "Supervisor", label: "Supervisor\n(OH / ADM)", domain: "seller", size: 20,
    definition: "Office Head (Agency) or Agency Development Manager — manages a team of agents. Responsible for team targets, lead allocation oversight, activity monitoring, and coaching. Gets daily briefings on team performance.",
    grain: "Supervisor ID",
    attributes: ["SupervisorID", "Name", "Role", "Channel", "TeamSize", "Territory", "TargetPremium", "AchievedPremium", "TeamConversionRate", "TeamPersistency", "ActiveLeadsInTeam", "EscalationCount"],
    dataMapping: { table: "CRMNXT.supervisors", pk: "supervisor_id", query: "SELECT s.*, COUNT(a.agent_id) as team_size FROM supervisors s LEFT JOIN agent_master a ON a.supervisor_id = s.supervisor_id WHERE 1=1 GROUP BY s.supervisor_id" },
  },
  {
    id: "AgentTier", label: "Agent Tier", domain: "seller", size: 14,
    definition: "Performance classification of agents — Platinum, Gold, Silver, Bronze. Determines lead priority, commission multipliers, and allocation weight. Recalculated quarterly based on conversion, persistency, and ticket size.",
    grain: "Agent ID × Quarter",
    attributes: ["AgentID", "Quarter", "Tier", "ConversionScore", "PersistencyScore", "TicketSizeScore", "CompositeScore", "LeadPriorityMultiplier", "CommissionMultiplier"],
    dataMapping: { table: "CRMNXT.agent_tier_history", pk: "agent_id, quarter", query: "SELECT * FROM agent_tier_history WHERE 1=1 ORDER BY quarter DESC" },
  },
  {
    id: "AgentSpecialization", label: "Agent\nSpecialization", domain: "seller", size: 14,
    definition: "Product categories and customer segments where an agent has demonstrated above-average conversion. Inferred from historical performance, not self-declared. Used for intelligent lead-product-agent matching.",
    grain: "Agent ID × Product Category",
    attributes: ["AgentID", "ProductCategory", "ConversionRate", "AvgTicketSize", "PolicyCount", "SpecializationScore", "Rank_InTeam"],
    dataMapping: { table: "derived.agent_specialization", pk: "agent_id, product_category", query: "SELECT agent_id, product_category, COUNT(*) as policy_count, AVG(annual_premium) as avg_ticket, COUNT(*)::float / NULLIF(lead_count, 0) as conversion_rate FROM policy_master p JOIN lead_master l ON l.lead_id = p.source_lead_id GROUP BY agent_id, product_category" },
  },

  // CHANNEL & DISTRIBUTION
  {
    id: "Channel", label: "Channel", domain: "channel", size: 22,
    definition: "Distribution channel — CAT (Corporate Agent Tied / Bancassurance), Agency (tied advisors), DMF (Direct Marketing Force), IMF (Insurance Marketing Firm). Each operates like a different business with distinct economics, lead quality, and selling motion.",
    grain: "Channel Code",
    attributes: ["ChannelCode", "ChannelName", "AgentCount", "LeadVolume_Monthly", "ConversionRate", "AvgTicketSize", "PersistencyRate", "CostOfAcquisition", "RevenueContribution%"],
    dataMapping: { table: "CRMNXT.ref_channels", pk: "channel_code", query: "SELECT * FROM ref_channels WHERE 1=1" },
  },
  {
    id: "Partner", label: "Partner\n(Bank / IMF)", domain: "channel", size: 20,
    definition: "External distribution partner — Axis Bank (1,400+ branches), YES Bank, or an IMF firm. 60% of India's IMFs partner with Max Life. Each partner has different lead quality, referral patterns, and commission structures.",
    grain: "Partner ID",
    attributes: ["PartnerID", "PartnerName", "PartnerType", "Channel", "BranchCount", "ActiveSince", "MonthlyLeadVolume", "ConversionRate", "AvgTicketSize", "CommissionTier", "RelationshipManager"],
    dataMapping: { table: "CRMNXT.partner_master", pk: "partner_id", query: "SELECT * FROM partner_master WHERE 1=1" },
  },
  {
    id: "Branch", label: "Branch", domain: "channel", size: 16,
    definition: "Physical location — bank branch (for CAT), Max Life office (for Agency/DMF), or IMF office. Maps to geography for territory-level allocation and performance tracking.",
    grain: "Branch Code",
    attributes: ["BranchCode", "BranchName", "PartnerID", "Channel", "PinCode", "City", "State", "Zone", "Region", "BranchHead", "AgentCount", "MonthlyTarget"],
    dataMapping: { table: "CRMNXT.branch_master", pk: "branch_code", query: "SELECT b.*, p.partner_name FROM branch_master b LEFT JOIN partner_master p ON p.partner_id = b.partner_id WHERE 1=1" },
  },
  {
    id: "LeadSource", label: "Lead Source", domain: "channel", size: 16,
    definition: "Origin of a lead — digital campaign, bank referral, walk-in, agent self-sourced, cross-sell upload, corporate campaign, WhatsApp inquiry. Each source has different data quality, intent signals, and expected conversion patterns.",
    grain: "Source ID",
    attributes: ["SourceID", "SourceName", "SourceType", "Channel", "AvgDataQuality", "AvgIntentScore", "ConversionRate", "AvgCycleTime_Days", "Volume_Monthly"],
    dataMapping: { table: "CRMNXT.lead_sources", pk: "source_id", query: "SELECT * FROM lead_sources WHERE 1=1" },
  },

  // GEOGRAPHY
  {
    id: "Region", label: "Region", domain: "geography", size: 18,
    definition: "Top-level geographic division — North, South, East, West, Central. Drives regional targets, leadership reporting, and competition landscape.",
    grain: "Region ID",
    attributes: ["RegionID", "RegionName", "RegionHead", "ZoneCount", "TerritoryCount", "AgentCount", "TargetPremium", "MarketShare"],
    dataMapping: { table: "CRMNXT.ref_regions", pk: "region_id", query: "SELECT * FROM ref_regions WHERE 1=1" },
  },
  {
    id: "Zone", label: "Zone", domain: "geography", size: 14,
    definition: "Mid-level geography — typically a state or group of states. Each zone has a Zonal Manager with P&L responsibility.",
    grain: "Zone ID",
    attributes: ["ZoneID", "ZoneName", "RegionID", "ZonalManager", "TerritoryCount", "AgentCount"],
    dataMapping: { table: "CRMNXT.ref_zones", pk: "zone_id", query: "SELECT z.*, r.region_name FROM ref_zones z JOIN ref_regions r ON r.region_id = z.region_id WHERE 1=1" },
  },
  {
    id: "Territory", label: "Territory", domain: "geography", size: 14,
    definition: "Operational unit — a cluster of pin codes assigned to a team of agents. Territory performance drives allocation decisions and competition analysis.",
    grain: "Territory ID",
    attributes: ["TerritoryID", "TerritoryName", "ZoneID", "PinCodes[]", "Population", "AgentCount", "CompetitorDensity", "MarketPotential"],
    dataMapping: { table: "CRMNXT.ref_territories", pk: "territory_id", query: "SELECT t.*, z.zone_name FROM ref_territories t JOIN ref_zones z ON z.zone_id = t.zone_id WHERE 1=1" },
  },

  // ACTIVITY & INTERACTION
  {
    id: "Meeting", label: "Meeting", domain: "activity", size: 18,
    definition: "A scheduled or completed face-to-face or virtual meeting between agent and lead/customer. The primary conversion event — first meeting attendance rate is the strongest predictor of conversion.",
    grain: "Meeting ID",
    attributes: ["MeetingID", "LeadID", "AgentID", "ScheduledDate", "ScheduledTime", "ActualDate", "Status", "MeetingType", "Location", "Duration_Min", "Outcome", "NextAction", "NotesCapture"],
    dataMapping: { table: "Vymo.meeting_log", pk: "meeting_id", query: "SELECT m.*, l.lead_score, a.agent_name FROM meeting_log m JOIN lead_master l ON l.lead_id = m.lead_id JOIN agent_master a ON a.agent_id = m.agent_id WHERE 1=1" },
  },
  {
    id: "WhatsAppMessage", label: "WhatsApp\nMessage", domain: "activity", size: 16,
    definition: "WhatsApp interaction — system-sent notifications (meeting reminders, pitch cards, quotes) and agent-initiated messages. Primary engagement channel for Indian insurance. Currently leaks to personal WhatsApp — IW captures and structures these interactions.",
    grain: "Message ID",
    attributes: ["MessageID", "LeadID", "AgentID", "Direction", "MessageType", "Template", "SentAt", "DeliveredAt", "ReadAt", "ResponseReceived", "ContentSummary"],
    dataMapping: { table: "WhatsApp_API.message_log", pk: "message_id", query: "SELECT * FROM message_log WHERE 1=1" },
  },
  {
    id: "CalendarSlot", label: "Calendar\nSlot", domain: "activity", size: 12,
    definition: "An agent's available or blocked time slot. Calendar intelligence prevents double-booking and enables auto-scheduling of first meetings within 4 hours of lead allocation.",
    grain: "Agent ID × Date × Slot",
    attributes: ["AgentID", "Date", "StartTime", "EndTime", "Status", "BookedFor_LeadID", "MeetingType"],
    dataMapping: { table: "Vymo.calendar_slots", pk: "agent_id, date, start_time", query: "SELECT * FROM calendar_slots WHERE 1=1" },
  },
  {
    id: "ProposalSubmission", label: "Proposal\nSubmission", domain: "activity", size: 16,
    definition: "A formal insurance proposal submitted for underwriting — the conversion event. Captures product chosen, sum assured, premium, medical requirements, and underwriting decision.",
    grain: "Proposal ID",
    attributes: ["ProposalID", "LeadID", "CustomerID", "AgentID", "ProductCode", "SumAssured", "AnnualPremium", "RidersSelected[]", "SubmissionDate", "MedicalRequired", "UnderwritingStatus", "IssuanceDate", "PolicyNumber"],
    dataMapping: { table: "CRMNXT.proposal_master", pk: "proposal_id", query: "SELECT pr.*, l.lead_source, a.agent_name, p.product_name FROM proposal_master pr JOIN lead_master l ON l.lead_id = pr.lead_id JOIN agent_master a ON a.agent_id = pr.agent_id JOIN product_master p ON p.product_code = pr.product_code WHERE 1=1" },
  },
  {
    id: "FollowUp", label: "Follow-up\nAction", domain: "activity", size: 14,
    definition: "A system-generated or agent-initiated follow-up task — call back, send quote, share brochure, escalate to supervisor. SLA-tracked: overdue follow-ups trigger reallocation.",
    grain: "FollowUp ID",
    attributes: ["FollowUpID", "LeadID", "AgentID", "ActionType", "DueDate", "CompletedDate", "Status", "SLA_Breached", "EscalatedTo"],
    dataMapping: { table: "Vymo.followup_tasks", pk: "followup_id", query: "SELECT * FROM followup_tasks WHERE 1=1" },
  },

  // COMPLIANCE
  {
    id: "IRDAIRule", label: "IRDAI Rule", domain: "compliance", size: 16,
    definition: "Regulatory requirement from the Insurance Regulatory and Development Authority of India. Governs product eligibility, disclosure requirements, mis-selling prevention, and recommendation auditability. Every AI recommendation must trace back to compliant reasoning.",
    grain: "Rule ID",
    attributes: ["RuleID", "RuleName", "Category", "Description", "ApplicableTo", "EnforcementLevel", "Penalty", "LastUpdated"],
    dataMapping: { table: "CRMNXT.ref_irdai_rules", pk: "rule_id", query: "SELECT * FROM ref_irdai_rules WHERE 1=1" },
  },
  {
    id: "SuitabilityCheck", label: "Suitability\nCheck", domain: "compliance", size: 14,
    definition: "Pre-sale validation that the recommended product is suitable for the customer's profile — income adequacy, need analysis, risk appetite, existing coverage gaps. IRDAI mandates this for every sale. The BKG encodes suitability logic as traversable rules, not hardcoded checks.",
    grain: "Lead ID × Product Code",
    attributes: ["LeadID", "ProductCode", "IncomeAdequacy", "NeedAnalysisScore", "RiskAppetiteMatch", "CoverageGapFilled", "SuitabilityResult", "OverrideReason", "ApprovedBy"],
    dataMapping: { table: "CRMNXT.suitability_checks", pk: "lead_id, product_code", query: "SELECT sc.*, l.customer_id, p.product_name FROM suitability_checks sc JOIN lead_master l ON l.lead_id = sc.lead_id JOIN product_master p ON p.product_code = sc.product_code WHERE 1=1" },
  },
];

// ─── LAYER 2: METRICS ──────────────────────────────────────

const metricNodes = [
  {
    id: "M_LeadScore", label: "Lead Score", domain: "metric", size: 20,
    definition: "Composite scoring of a lead's likelihood to convert — combines income band, life stage, product gap, channel intent multiplier, recency, and engagement signals. Replaces static rule-based scoring with graph-traversed, multi-factor scoring.",
    grain: "Lead ID (computed real-time on lead creation/update)",
    formula: "LeadScore = w1·IncomeFit + w2·LifeStageFit + w3·ProductGap + w4·ChannelIntentMultiplier + w5·Recency + w6·EngagementSignal",
    unit: "Score (0–1)",
    thresholds: { good: "> 0.75 → auto-allocate", warning: "0.5–0.75 → enrich then allocate", critical: "< 0.5 → stage for manual review" },
    diagnosticTree: ["Check income band mapping", "Verify product gap calculation", "Validate channel multiplier", "Review engagement signal freshness"],
    attributes: ["LeadID", "Score", "IncomeFitScore", "LifeStageFitScore", "ProductGapScore", "ChannelMultiplier", "RecencyScore", "EngagementScore", "ComputedAt"],
  },
  {
    id: "M_ConversionRate", label: "Conversion\nRate", domain: "metric", size: 18,
    definition: "Percentage of leads that convert to issued policies. Measured at agent, team, territory, channel, and product level. The primary efficiency metric.",
    grain: "Agent ID × Product Category × Month",
    formula: "ConversionRate = Policies Issued / Leads Allocated × 100",
    unit: "%",
    thresholds: { good: "> 12%", warning: "6–12%", critical: "< 6%" },
    diagnosticTree: ["Check lead quality by source", "Compare contact rate", "Analyze meeting-to-proposal ratio", "Review product-customer fit"],
    attributes: ["AgentID", "ProductCategory", "Month", "LeadsAllocated", "ProposalsSubmitted", "PoliciesIssued", "Rate"],
  },
  {
    id: "M_Persistency13M", label: "13th Month\nPersistency", domain: "metric", size: 20,
    definition: "Percentage of policies still active at the 13th month — the most critical metric in life insurance economics. If a customer lapses in year 1, the entire acquisition cost is wasted. Tracks by agent, channel, product, and territory.",
    grain: "Agent ID × Channel × Product Category × Cohort Month",
    formula: "Persistency_13M = Active Policies at Month 13 / Total Policies Issued 13 Months Ago × 100",
    unit: "%",
    thresholds: { good: "> 85%", warning: "75–85%", critical: "< 75%" },
    diagnosticTree: ["Segment by channel of acquisition", "Check payment mode (auto-debit vs manual)", "Analyze agent persistency pattern", "Review product-income fit at sale"],
    attributes: ["AgentID", "Channel", "ProductCategory", "CohortMonth", "IssuedCount", "ActiveAt13M", "Rate"],
  },
  {
    id: "M_Persistency61M", label: "61st Month\nPersistency", domain: "metric", size: 16,
    definition: "Long-term persistency — policies surviving 5 years. Drives renewal revenue and agent commission trails. A lagging but strategically critical indicator of sale quality.",
    grain: "Channel × Product Category × Cohort Year",
    formula: "Persistency_61M = Active at Month 61 / Issued 61 Months Ago × 100",
    unit: "%",
    thresholds: { good: "> 70%", warning: "55–70%", critical: "< 55%" },
    diagnosticTree: ["Segment by premium payment term", "Analyze rider attachment impact", "Compare agent tier at sale"],
    attributes: ["Channel", "ProductCategory", "CohortYear", "IssuedCount", "ActiveAt61M", "Rate"],
  },
  {
    id: "M_ContactRate", label: "Contact\nRate", domain: "metric", size: 16,
    definition: "Percentage of allocated leads that an agent successfully contacts within SLA window (typically 4–48 hours depending on source). Leading indicator of conversion — if you don't contact, you don't convert.",
    grain: "Agent ID × Week",
    formula: "ContactRate = Leads Contacted Within SLA / Leads Allocated × 100",
    unit: "%",
    thresholds: { good: "> 80%", warning: "60–80%", critical: "< 60%" },
    diagnosticTree: ["Check lead allocation timing", "Review agent capacity", "Analyze channel-specific SLAs", "Compare contact method (call vs WhatsApp)"],
    attributes: ["AgentID", "Week", "LeadsAllocated", "ContactedInSLA", "Rate", "AvgContactTime_Hours"],
  },
  {
    id: "M_FirstMeetingRate", label: "First Meeting\nRate", domain: "metric", size: 16,
    definition: "Percentage of contacted leads that attend a first meeting. The strongest predictor of eventual conversion. Auto-scheduling and calendar intelligence directly improve this metric.",
    grain: "Agent ID × Month",
    formula: "FirstMeetingRate = First Meetings Held / Leads Contacted × 100",
    unit: "%",
    thresholds: { good: "> 45%", warning: "25–45%", critical: "< 25%" },
    diagnosticTree: ["Check scheduling lag from contact", "Review meeting location convenience", "Analyze agent pitch quality", "Compare by lead source"],
    attributes: ["AgentID", "Month", "LeadsContacted", "FirstMeetingsHeld", "Rate"],
  },
  {
    id: "M_TicketSize", label: "Average\nTicket Size", domain: "metric", size: 16,
    definition: "Average annual premium per issued policy. Measures value quality of sales. Driven by product mix, customer segment targeting, and agent skill in right-sizing coverage.",
    grain: "Agent ID × Product Category × Quarter",
    formula: "AvgTicketSize = Sum(Annual Premium) / Count(Policies Issued)",
    unit: "₹",
    thresholds: { good: "> ₹35,000", warning: "₹15,000–35,000", critical: "< ₹15,000" },
    diagnosticTree: ["Check product category mix", "Analyze customer income distribution", "Review rider attachment rate", "Compare with peer agents"],
    attributes: ["AgentID", "ProductCategory", "Quarter", "PoliciesIssued", "TotalPremium", "AvgPremium"],
  },
  {
    id: "M_ProductAffinity", label: "Product\nAffinity", domain: "metric", size: 18,
    definition: "Score indicating how well a specific product matches a lead's profile — traverses across income band, age, life stage, existing coverage, channel, and suitability rules. The core intelligence metric that replaces gut-feel product recommendation.",
    grain: "Lead ID × Product Code",
    formula: "Affinity = f(IncomeBand→Eligibility, Age→ProductFit, LifeStage→NeedMatch, ExistingCoverage→Gap, Channel→ProductAvailability, SuitabilityRules→Compliance)",
    unit: "Score (0–1)",
    thresholds: { good: "> 0.8 → primary recommendation", warning: "0.5–0.8 → secondary option", critical: "< 0.5 → do not recommend" },
    diagnosticTree: ["Check eligibility constraints", "Verify coverage gap calculation", "Validate suitability compliance", "Review channel availability"],
    attributes: ["LeadID", "ProductCode", "AffinityScore", "EligibilityPass", "NeedMatchScore", "GapScore", "SuitabilityResult"],
  },
  {
    id: "M_AgentCapacity", label: "Agent\nCapacity", domain: "metric", size: 14,
    definition: "Available capacity of an agent to take new leads — factors in current active leads, scheduled meetings, follow-up backlog, and historical throughput. Prevents over-allocation that kills contact rates.",
    grain: "Agent ID × Day",
    formula: "CapacitySlots = MaxWeeklyLeads − ActiveLeads − ScheduledMeetings/5 − OverdueFollowUps/3",
    unit: "Slots",
    thresholds: { good: "> 3 slots", warning: "1–3 slots", critical: "0 slots → no allocation" },
    diagnosticTree: ["Check active lead count", "Review meeting schedule density", "Count overdue follow-ups", "Compare with historical throughput"],
    attributes: ["AgentID", "Date", "MaxCapacity", "ActiveLeads", "ScheduledMeetings", "OverdueFollowUps", "AvailableSlots"],
  },
  {
    id: "M_CrossSellPropensity", label: "Cross-Sell\nPropensity", domain: "metric", size: 16,
    definition: "Likelihood that an existing policyholder will buy an additional product. Traverses customer's full policy portfolio, life events, income trajectory, and coverage gaps. Replaces batch SFTP cross-sell uploads with real-time propensity.",
    grain: "Customer ID × Product Category",
    formula: "Propensity = f(CoverageGap, LifeEvent_Recency, IncomeGrowth, PolicyAge, EngagementLevel, PeerBehavior)",
    unit: "Score (0–1)",
    thresholds: { good: "> 0.7 → active cross-sell lead", warning: "0.4–0.7 → nurture", critical: "< 0.4 → do not push" },
    diagnosticTree: ["Check coverage gaps", "Review recent life events", "Analyze policy portfolio age", "Compare with peer cohort"],
    attributes: ["CustomerID", "ProductCategory", "PropensityScore", "CoverageGap", "TriggeringEvent", "RecommendedProduct", "LastComputed"],
  },
  {
    id: "M_LapseRisk", label: "Lapse\nRisk", domain: "metric", size: 16,
    definition: "Probability that a policy will lapse at the next renewal. Computed from payment history patterns, engagement decay, policy-income mismatch, and channel-specific lapse trends. Drives proactive retention interventions.",
    grain: "Policy Number",
    formula: "LapseRisk = f(PaymentDelay_Trend, EngagementDecay, PremiumToIncome_Ratio, ChannelLapseRate, AgentPersistency)",
    unit: "Score (0–1)",
    thresholds: { good: "< 0.2 → standard reminder", warning: "0.2–0.5 → proactive nudge", critical: "> 0.5 → retention team intervention" },
    diagnosticTree: ["Check payment delay trend", "Review engagement recency", "Analyze premium-to-income ratio", "Compare with channel lapse baseline"],
    attributes: ["PolicyNumber", "LapseScore", "PaymentDelayTrend", "EngagementDecay", "PremiumIncomeRatio", "InterventionType"],
  },
  {
    id: "M_AllocationQuality", label: "Allocation\nQuality", domain: "metric", size: 16,
    definition: "Measures how well the lead-to-agent matching actually performed — did the allocated agent convert? Was the product recommendation accepted? Did the geography match work? Feedback loop that improves future allocation.",
    grain: "Lead ID (computed post-outcome)",
    formula: "AllocQuality = w1·ConversionOutcome + w2·ProductMatch + w3·CycleTime + w4·CustomerSatisfaction",
    unit: "Score (0–1)",
    thresholds: { good: "> 0.8", warning: "0.5–0.8", critical: "< 0.5 → retrain allocation weights" },
    diagnosticTree: ["Check agent-product specialization match", "Review geography alignment", "Analyze cycle time vs benchmark", "Compare with counterfactual allocation"],
    attributes: ["LeadID", "AllocatedAgentID", "ConversionOutcome", "ProductRecommended", "ProductActual", "CycleTime", "QualityScore"],
  },
];

// ─── LAYER 3: DECISIONS ─────────────────────────────────────

const decisionNodes = [
  {
    id: "D_LeadScoring", label: "Lead Scoring\nDecision", domain: "decision", size: 22,
    definition: "Determines the composite score for a lead using graph-traversed features — not flat if/then rules. Encodes the reasoning of top performers: 'a bank referral with ₹50L+ loan gets 1.5× intent multiplier' or 'IMF leads without phone verification go to staging, not allocation.'",
    trigger: "New lead created OR lead data enriched OR 24-hour re-score cycle",
    conditions: "Traverse: Lead → IncomeBand → Eligibility, Lead → LifeEvent → NeedUrgency, Lead → LeadSource → ChannelMultiplier, Lead → Customer → ExistingPolicies → CoverageGap",
    actions: ["Compute composite lead score (0–1)", "Assign product affinity scores for top 3 products", "Tag lead priority tier (Hot / Warm / Cold)", "Route to allocation if score > 0.5, else stage"],
    authority: "System auto-execute for scoring. Supervisor override for manual re-scoring.",
    constraints: "Must pass IRDAI suitability for recommended products. NRI leads require separate tax treatment validation.",
  },
  {
    id: "D_LeadAllocation", label: "Lead\nAllocation", domain: "decision", size: 24,
    definition: "Matches a scored lead to the best-fit agent — not round-robin, not random. Traverses agent specialization, geography, capacity, conversion history, and product affinity to find the optimal match. Encodes tribal knowledge: 'for retirement plans in West Delhi, Priya converts 3.2× average.'",
    trigger: "Lead score computed AND score > allocation threshold",
    conditions: "Traverse: Lead.Territory → Agents in Territory, Filter: Agent.Capacity > 0, Rank by: Agent.Specialization(Lead.TopProduct) × Agent.ConversionRate × Agent.Capacity × GeographyMatch",
    actions: ["Allocate to top-ranked agent", "Block first available calendar slot within 4 hours", "Send WhatsApp notification to lead with meeting invite", "Alert supervisor of allocation", "Set SLA timer (48hr contact, 7-day first meeting)"],
    authority: "System auto-execute for Tier 1 agents. Supervisor approval required for cross-territory allocation.",
    constraints: "Agent must have valid IRDAI license for the product category. Cannot allocate more than MaxCapacity. Cross-channel allocation requires channel head approval.",
  },
  {
    id: "D_Reallocation", label: "Lead\nReallocation", domain: "decision", size: 18,
    definition: "Triggers when SLA is breached — agent hasn't contacted lead within the defined window. Automatically moves lead to next-best agent. Encodes the logic: '3 agents below 20% contact rate in 14-day window, zone avg is 45% — reallocate their uncontacted leads to top performers.'",
    trigger: "SLA breach: no contact within 48 hours OR no meeting within 7 days",
    conditions: "Check: Agent.ContactRate < threshold for rolling 14-day window. Count uncontacted leads per agent. Identify top-performing agents with available capacity in same territory.",
    actions: ["Move uncontacted leads to next-best agent", "Notify original agent and supervisor", "Log reallocation reason for audit", "Reset SLA timers"],
    authority: "System auto-execute for SLA breach. Supervisor can trigger manual reallocation anytime.",
    constraints: "Maximum 2 reallocations per lead. After 2nd, escalate to supervisor for manual disposition.",
  },
  {
    id: "D_ProductRecommendation", label: "Product\nRecommendation", domain: "decision", size: 20,
    definition: "Selects the right product for a lead based on graph traversal across income, age, life stage, existing coverage, and suitability rules. Encodes top-seller reasoning: 'a 35-year-old with a new baby responds to protection messaging, not investment messaging.'",
    trigger: "Lead allocated to agent OR agent requests recommendation during meeting",
    conditions: "Traverse: Customer → Policies → CoverageGap, Customer → IncomeBand → ProductEligibility, Customer → LifeEvents → NeedPriority, Product → SuitabilityRules → Compliance",
    actions: ["Return ranked product list with affinity scores", "Generate contextual pitch card for top product", "Flag compliance requirements (suitability form, medical, etc.)", "Attach relevant riders automatically"],
    authority: "System generates recommendation. Agent can override with documented reason. Override rate tracked as a metric.",
    constraints: "Must pass IRDAI suitability check. NRI-specific products require NRI flag validation. Product must be available in lead's channel.",
  },
  {
    id: "D_CrossSellTrigger", label: "Cross-Sell\nTrigger", domain: "decision", size: 18,
    definition: "Identifies existing policyholders who should be approached for additional products — replaces batch SFTP uploads with real-time, event-driven cross-sell. Encodes: 'customer's child turned 18 + no education policy + income supports ₹15K/month → trigger child education plan cross-sell.'",
    trigger: "Life event detected OR policy milestone reached OR propensity score crosses threshold",
    conditions: "Traverse: Customer → AllPolicies → CoverageMap, Customer → LifeEvents → NeedTrigger, Customer → IncomeBand → PremiumCapacity, CrossSellPropensity > 0.7",
    actions: ["Create cross-sell lead with full context", "Score and allocate to agent with product specialization", "Generate contextual pitch with trigger reason", "Set follow-up SLA"],
    authority: "System auto-generates lead. Agent accepts or defers with reason.",
    constraints: "Maximum 1 cross-sell lead per customer per quarter. Do not trigger during claim processing or complaint resolution.",
  },
  {
    id: "D_PersistencyIntervention", label: "Persistency\nIntervention", domain: "decision", size: 18,
    definition: "Proactive intervention for policies at risk of lapsing. Tiered response: high-risk gets retention team, medium gets automated nudge, low gets standard reminder. Channel-specific: agency policies get agent-led retention, CAT policies get bank RM notification.",
    trigger: "LapseRisk score crosses threshold (0.2 for nudge, 0.5 for intervention) OR payment overdue",
    conditions: "Traverse: Policy → Customer → EngagementHistory, Policy → Agent → AgentPersistency, Policy → Channel → ChannelLapsePattern, Policy → Product → AverageLapseRate",
    actions: ["Tier 1 (risk < 0.2): automated WhatsApp reminder", "Tier 2 (0.2–0.5): agent call with retention pitch card", "Tier 3 (> 0.5): dedicated retention team assignment", "Log intervention for persistency attribution"],
    authority: "Tier 1: system auto. Tier 2: agent-initiated. Tier 3: retention team lead.",
    constraints: "Cannot offer discount/rebate without approval. Grace period rules per IRDAI apply. Do not contact if customer has active complaint.",
  },
  {
    id: "D_SupervisorBriefing", label: "Supervisor\nDaily Briefing", domain: "decision", size: 16,
    definition: "Generates a natural-language daily briefing for supervisors — team performance summary, at-risk leads, SLA breaches, top opportunities. Replaces manual MIS review with graph-computed intelligence.",
    trigger: "Daily at 8:00 AM, or on-demand via Cortex query",
    conditions: "Aggregate: Team → Agents → ActiveLeads, Team → Agents → SLA_Status, Team → Agents → ConversionRate_Trend, Team → Agents → MeetingSchedule_Today",
    actions: ["Generate NL summary of team state", "Highlight top 3 actions for the day", "Flag agents needing coaching (low contact rate, low meeting quality)", "Deliver via WhatsApp + dashboard"],
    authority: "System generates. Supervisor acts.",
    constraints: "Briefing must not include customer PII in WhatsApp — only lead counts and agent names. Full detail available in secure dashboard.",
  },
  {
    id: "D_CommissionOptimization", label: "Commission\nOptimization", domain: "decision", size: 14,
    definition: "Encodes commission rules by channel, product, and agent tier — including the tribal knowledge variations like 'for A-tier distributors, hold commission at 85% not 80%'. Ensures correct payout and prevents leakage.",
    trigger: "Policy issued OR renewal processed",
    conditions: "Traverse: Policy → Product → CommissionStructure, Policy → Agent → AgentTier → CommissionMultiplier, Policy → Channel → ChannelCommissionRules, Policy → Partner → PartnerCommissionTier",
    actions: ["Compute commission amount", "Apply tier multiplier and partner adjustments", "Flag anomalies (> 2σ from peer average)", "Queue for payout processing"],
    authority: "System computes. Finance team approves anomalies.",
    constraints: "Must comply with IRDAI commission caps by product category. Override requires finance head sign-off.",
  },
];

// ─── EDGES ──────────────────────────────────────────────────

const edges = [
  // Customer & Lead relationships
  { source: "Lead", target: "Customer", rel: "CONVERTS_TO", meaning: "Lead becomes customer on policy issuance" },
  { source: "Lead", target: "LeadSource", rel: "ORIGINATED_FROM", meaning: "Where the lead came from" },
  { source: "Lead", target: "IncomeBand", rel: "BELONGS_TO", meaning: "Income segmentation for eligibility" },
  { source: "Lead", target: "KYCStatus", rel: "HAS_KYC", meaning: "Verification state gates proposal" },
  { source: "Customer", target: "Policy", rel: "HOLDS", meaning: "Customer's policy portfolio" },
  { source: "Customer", target: "LifeEvent", rel: "EXPERIENCES", meaning: "Life milestone triggers need change" },
  { source: "Customer", target: "IncomeBand", rel: "CLASSIFIED_AS", meaning: "Income drives product eligibility" },

  // Product & Policy relationships
  { source: "Policy", target: "Product", rel: "IS_PLAN", meaning: "Which insurance plan was sold" },
  { source: "Policy", target: "Agent", rel: "SOLD_BY", meaning: "Agent who closed the sale" },
  { source: "Policy", target: "Channel", rel: "ACQUIRED_VIA", meaning: "Channel of acquisition" },
  { source: "Policy", target: "Renewal", rel: "HAS_SCHEDULE", meaning: "Premium payment schedule" },
  { source: "Policy", target: "Rider", rel: "HAS_RIDER", meaning: "Attached add-on benefits" },
  { source: "Product", target: "ProductCategory", rel: "BELONGS_TO", meaning: "Term, ULIP, Health, etc." },
  { source: "Product", target: "Rider", rel: "SUPPORTS", meaning: "Compatible riders" },

  // Seller relationships
  { source: "Agent", target: "Supervisor", rel: "REPORTS_TO", meaning: "Reporting hierarchy" },
  { source: "Agent", target: "AgentTier", rel: "RANKED_AS", meaning: "Performance tier" },
  { source: "Agent", target: "AgentSpecialization", rel: "SPECIALIZES_IN", meaning: "Inferred product expertise" },
  { source: "Agent", target: "Channel", rel: "OPERATES_IN", meaning: "Distribution channel" },
  { source: "Agent", target: "Territory", rel: "COVERS", meaning: "Geographic coverage" },
  { source: "Agent", target: "CalendarSlot", rel: "HAS_SCHEDULE", meaning: "Availability for meetings" },
  { source: "Lead", target: "Agent", rel: "ALLOCATED_TO", meaning: "Lead assignment" },

  // Channel & Distribution
  { source: "Channel", target: "Partner", rel: "INCLUDES", meaning: "Partners in channel" },
  { source: "Partner", target: "Branch", rel: "HAS_BRANCH", meaning: "Physical locations" },
  { source: "Branch", target: "Territory", rel: "LOCATED_IN", meaning: "Geographic mapping" },
  { source: "LeadSource", target: "Channel", rel: "FEEDS_INTO", meaning: "Source-to-channel mapping" },

  // Geography
  { source: "Territory", target: "Zone", rel: "PART_OF", meaning: "Territory rolls up to zone" },
  { source: "Zone", target: "Region", rel: "PART_OF", meaning: "Zone rolls up to region" },

  // Activity relationships
  { source: "Lead", target: "Meeting", rel: "HAS_MEETING", meaning: "Scheduled/completed meetings" },
  { source: "Lead", target: "WhatsAppMessage", rel: "RECEIVED_MSG", meaning: "WhatsApp interactions" },
  { source: "Lead", target: "FollowUp", rel: "HAS_FOLLOWUP", meaning: "Pending/completed follow-ups" },
  { source: "Lead", target: "ProposalSubmission", rel: "SUBMITTED", meaning: "Proposal for underwriting" },
  { source: "Agent", target: "Meeting", rel: "CONDUCTS", meaning: "Agent's meeting activity" },

  // Compliance
  { source: "Product", target: "IRDAIRule", rel: "GOVERNED_BY", meaning: "Regulatory requirements" },
  { source: "Lead", target: "SuitabilityCheck", rel: "VALIDATED_BY", meaning: "Pre-sale compliance" },
  { source: "SuitabilityCheck", target: "IRDAIRule", rel: "ENFORCES", meaning: "Regulatory compliance" },

  // Metric connections (Layer 1 → Layer 2)
  { source: "Lead", target: "M_LeadScore", rel: "SCORED_BY", meaning: "Lead scoring metric" },
  { source: "Agent", target: "M_ConversionRate", rel: "MEASURED_BY", meaning: "Agent conversion tracking" },
  { source: "Policy", target: "M_Persistency13M", rel: "TRACKED_BY", meaning: "13-month persistency" },
  { source: "Policy", target: "M_Persistency61M", rel: "TRACKED_BY", meaning: "61-month persistency" },
  { source: "Agent", target: "M_ContactRate", rel: "MEASURED_BY", meaning: "Contact rate tracking" },
  { source: "Agent", target: "M_FirstMeetingRate", rel: "MEASURED_BY", meaning: "Meeting rate tracking" },
  { source: "Agent", target: "M_TicketSize", rel: "MEASURED_BY", meaning: "Average ticket tracking" },
  { source: "Lead", target: "M_ProductAffinity", rel: "SCORED_BY", meaning: "Product-lead fit score" },
  { source: "Agent", target: "M_AgentCapacity", rel: "MEASURED_BY", meaning: "Capacity tracking" },
  { source: "Customer", target: "M_CrossSellPropensity", rel: "SCORED_BY", meaning: "Cross-sell likelihood" },
  { source: "Policy", target: "M_LapseRisk", rel: "ASSESSED_BY", meaning: "Lapse risk score" },
  { source: "Lead", target: "M_AllocationQuality", rel: "EVALUATED_BY", meaning: "Allocation feedback" },

  // Decision connections (Layer 2 → Layer 3)
  { source: "M_LeadScore", target: "D_LeadScoring", rel: "DRIVES", meaning: "Scoring metric feeds scoring decision" },
  { source: "M_LeadScore", target: "D_LeadAllocation", rel: "TRIGGERS", meaning: "Score above threshold triggers allocation" },
  { source: "M_AgentCapacity", target: "D_LeadAllocation", rel: "CONSTRAINS", meaning: "Capacity limits allocation" },
  { source: "M_ContactRate", target: "D_Reallocation", rel: "TRIGGERS", meaning: "Low contact triggers reallocation" },
  { source: "M_ProductAffinity", target: "D_ProductRecommendation", rel: "DRIVES", meaning: "Affinity drives recommendation" },
  { source: "M_CrossSellPropensity", target: "D_CrossSellTrigger", rel: "TRIGGERS", meaning: "Propensity triggers cross-sell" },
  { source: "M_LapseRisk", target: "D_PersistencyIntervention", rel: "TRIGGERS", meaning: "Risk triggers retention" },
  { source: "M_ConversionRate", target: "D_SupervisorBriefing", rel: "FEEDS", meaning: "Conversion data in briefing" },
  { source: "M_Persistency13M", target: "D_PersistencyIntervention", rel: "INFORMS", meaning: "Persistency trend informs intervention" },
  { source: "D_LeadAllocation", target: "D_Reallocation", rel: "FALLBACK", meaning: "Failed allocation triggers reallocation" },
  { source: "D_ProductRecommendation", target: "D_CommissionOptimization", rel: "FEEDS", meaning: "Product sold drives commission calc" },
];

// ═══════════════════════════════════════════════════════════════

const allNodes = [
  ...ontologyNodes.map(n => ({ ...n, layer: "ontology" })),
  ...metricNodes.map(n => ({ ...n, layer: "metric" })),
  ...decisionNodes.map(n => ({ ...n, layer: "decision" })),
];

export default function MaxLifeBKG() {
  const svgRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const simRef = useRef(null);

  const getNodeColor = (node) => {
    if (node.layer === "metric") return DOMAIN_COLORS.metric;
    if (node.layer === "decision") return DOMAIN_COLORS.decision;
    return DOMAIN_COLORS[node.domain] || "#888";
  };

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const W = svgRef.current.clientWidth;
    const H = svgRef.current.clientHeight;

    const filteredNodes = allNodes.map(n => ({ ...n }));

    const nodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredEdges = edges
      .filter(e => nodeIds.has(e.source) && nodeIds.has(e.target))
      .map(e => ({ ...e }));

    const g = svg.append("g");

    // Zoom
    const zoom = d3.zoom().scaleExtent([0.2, 4]).on("zoom", (e) => g.attr("transform", e.transform));
    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(W / 2, H / 2).scale(0.55));

    // Simulation
    const sim = d3.forceSimulation(filteredNodes)
      .force("link", d3.forceLink(filteredEdges).id(d => d.id).distance(120).strength(0.35))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(0, 0))
      .force("collision", d3.forceCollide().radius(d => d.size + 12));

    simRef.current = sim;

    // Arrow markers
    svg.append("defs").selectAll("marker")
      .data(["arrow"]).enter().append("marker")
      .attr("id", "arrow").attr("viewBox", "0 0 10 6")
      .attr("refX", 10).attr("refY", 3)
      .attr("markerWidth", 8).attr("markerHeight", 5)
      .attr("orient", "auto")
      .append("path").attr("d", "M0,0L10,3L0,6").attr("fill", "#bbb");

    // Links
    const link = g.append("g").selectAll("line").data(filteredEdges).enter().append("line")
      .attr("stroke", "#d0d0d0").attr("stroke-width", 1).attr("marker-end", "url(#arrow)");

    // Link labels
    const linkLabel = g.append("g").selectAll("text").data(filteredEdges).enter().append("text")
      .text(d => d.rel)
      .attr("font-size", 7).attr("fill", "#999")
      .attr("font-family", "'JetBrains Mono', 'SF Mono', monospace")
      .attr("text-anchor", "middle").attr("opacity", 0.45);

    // Nodes
    const nodeGroup = g.append("g").selectAll("g").data(filteredNodes).enter().append("g")
      .style("cursor", "pointer")
      .call(d3.drag()
        .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    nodeGroup.each(function(d) {
      const el = d3.select(this);
      const color = getNodeColor(d);
      const r = d.size || 16;
      if (d.layer === "ontology") {
        el.append("circle").attr("r", r).attr("fill", color).attr("stroke", "#fff").attr("stroke-width", 2).attr("opacity", 0.9);
      } else if (d.layer === "metric") {
        el.append("rect")
          .attr("x", -r).attr("y", -r).attr("width", r * 2).attr("height", r * 2)
          .attr("transform", "rotate(45)")
          .attr("fill", color).attr("stroke", "#fff").attr("stroke-width", 2).attr("opacity", 0.9);
      } else {
        const s = r * 1.4;
        el.append("polygon")
          .attr("points", `0,${-s} ${s * 0.87},${s * 0.5} ${-s * 0.87},${s * 0.5}`)
          .attr("fill", color).attr("stroke", "#fff").attr("stroke-width", 2).attr("opacity", 0.9);
      }
    });

    // Node labels
    nodeGroup.append("text")
      .each(function(d) {
        const lines = d.label.split("\n");
        const el = d3.select(this);
        lines.forEach((line, i) => {
          el.append("tspan")
            .text(line)
            .attr("x", 0)
            .attr("dy", i === 0 ? (d.size + 12) : 12);
        });
      })
      .attr("text-anchor", "middle")
      .attr("font-size", 9).attr("font-weight", 600)
      .attr("fill", "#333")
      .attr("font-family", "'IBM Plex Sans', 'Segoe UI', sans-serif");

    // Hover interactions
    nodeGroup.on("mouseenter", (e, d) => {
      const connectedIds = new Set([d.id]);
      filteredEdges.forEach(edge => {
        const s = edge.source?.id || edge.source;
        const t = edge.target?.id || edge.target;
        if (s === d.id) connectedIds.add(t);
        if (t === d.id) connectedIds.add(s);
      });
      nodeGroup.attr("opacity", nd => connectedIds.has(nd.id) ? 1 : 0.12);
      link.attr("stroke", le => {
        const s = le.source?.id || le.source;
        const t = le.target?.id || le.target;
        return (s === d.id || t === d.id) ? getNodeColor(d) : "#eee";
      }).attr("stroke-width", le => {
        const s = le.source?.id || le.source;
        const t = le.target?.id || le.target;
        return (s === d.id || t === d.id) ? 2 : 0.5;
      });
      linkLabel.attr("opacity", le => {
        const s = le.source?.id || le.source;
        const t = le.target?.id || le.target;
        return (s === d.id || t === d.id) ? 1 : 0.05;
      }).attr("font-weight", le => {
        const s = le.source?.id || le.source;
        const t = le.target?.id || le.target;
        return (s === d.id || t === d.id) ? 700 : 400;
      });
    }).on("mouseleave", () => {
      nodeGroup.attr("opacity", 1);
      link.attr("stroke", "#d0d0d0").attr("stroke-width", 1);
      linkLabel.attr("opacity", 0.45).attr("font-weight", 400);
    }).on("click", (e, d) => {
      e.stopPropagation();
      setSelected(d);
    });

    svg.on("click", () => setSelected(null));

    sim.on("tick", () => {
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      linkLabel.attr("x", d => (d.source.x + d.target.x) / 2)
        .attr("y", d => (d.source.y + d.target.y) / 2 - 3);
      nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
    });
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", background: "#FAFAF8", fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Main area */}
      <div style={{ flex: 1, display: "flex", position: "relative", overflow: "hidden" }}>
        {/* Graph */}
        <svg ref={svgRef} style={{ flex: 1, width: "100%", height: "100%" }} />

        {/* Detail Panel */}
        {selected && (
          <div style={{
            position: "absolute", top: 0, right: 0, width: 420, height: "100%", background: "#fff",
            borderLeft: "1px solid #E5E2DB", overflowY: "auto", padding: "20px 24px",
            boxShadow: "-4px 0 20px rgba(0,0,0,0.06)", animation: "slideIn 0.2s ease",
          }}>
            {/* Close button */}
            <button onClick={() => setSelected(null)} style={{
              position: "absolute", top: 12, right: 12, background: "none", border: "none", fontSize: 18,
              cursor: "pointer", color: "#999", padding: 4,
            }}>×</button>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 12, height: 12,
                borderRadius: selected.layer === "ontology" ? "50%" : selected.layer === "metric" ? 2 : 0,
                background: getNodeColor(selected),
                transform: selected.layer === "metric" ? "rotate(45deg)" : "none",
              }} />
              <span style={{
                fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5,
                color: getNodeColor(selected),
              }}>
                {selected.layer === "ontology" ? DOMAIN_LABELS[selected.domain] : selected.layer === "metric" ? "Metric" : "Decision Rule"}
              </span>
            </div>

            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#1C1C1C", margin: "0 0 8px", lineHeight: 1.2 }}>
              {selected.label.replace(/\n/g, " ")}
            </h2>

            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.55, margin: "0 0 20px" }}>
              {selected.definition}
            </p>

            {/* Grain */}
            {selected.grain && (
              <div style={{ marginBottom: 16 }}>
                <div style={sectionHeaderStyle}>Grain</div>
                <div style={{ fontSize: 12, color: "#333", fontFamily: "'JetBrains Mono', monospace", background: "#F7F5F1", padding: "6px 10px", borderRadius: 4 }}>
                  {selected.grain}
                </div>
              </div>
            )}

            {/* Attributes */}
            {selected.attributes && (
              <div style={{ marginBottom: 16 }}>
                <div style={sectionHeaderStyle}>Attributes ({selected.attributes.length})</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {selected.attributes.map(a => (
                    <span key={a} style={{
                      fontSize: 10, padding: "2px 8px", background: "#F3F0EB", borderRadius: 3,
                      color: "#555", fontFamily: "'JetBrains Mono', monospace",
                    }}>{a}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Data Mapping (Layer 1) */}
            {selected.dataMapping && (
              <div style={{ marginBottom: 16 }}>
                <div style={sectionHeaderStyle}>Data Mapping</div>
                <div style={{ background: "#F7F5F1", padding: "10px 12px", borderRadius: 4, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                  <div><span style={{ color: "#999" }}>Table:</span> <span style={{ color: "#2D5A3D", fontWeight: 600 }}>{selected.dataMapping.table}</span></div>
                  <div style={{ marginTop: 4 }}><span style={{ color: "#999" }}>PK:</span> {selected.dataMapping.pk}</div>
                  {selected.dataMapping.query && (
                    <div style={{ marginTop: 8, padding: "8px", background: "#EDEAE5", borderRadius: 3, fontSize: 10, lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                      {selected.dataMapping.query}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Formula (Layer 2) */}
            {selected.formula && (
              <div style={{ marginBottom: 16 }}>
                <div style={sectionHeaderStyle}>Formula</div>
                <div style={{ background: "#F0FAF5", padding: "10px 12px", borderRadius: 4, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#2D5A3D", lineHeight: 1.5 }}>
                  {selected.formula}
                </div>
              </div>
            )}

            {/* Thresholds (Layer 2) */}
            {selected.thresholds && (
              <div style={{ marginBottom: 16 }}>
                <div style={sectionHeaderStyle}>Thresholds</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {Object.entries(selected.thresholds).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: k === "good" ? "#10B981" : k === "warning" ? "#F59E0B" : "#EF4444",
                      }} />
                      <span style={{ fontWeight: 600, textTransform: "capitalize", minWidth: 60 }}>{k}</span>
                      <span style={{ color: "#555" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Diagnostic Tree (Layer 2) */}
            {selected.diagnosticTree && (
              <div style={{ marginBottom: 16 }}>
                <div style={sectionHeaderStyle}>Diagnostic Tree</div>
                <div style={{ fontSize: 11, color: "#555" }}>
                  {selected.diagnosticTree.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                      <span style={{ color: "#999", fontFamily: "monospace", minWidth: 16 }}>{i + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trigger (Layer 3) */}
            {selected.trigger && (
              <div style={{ marginBottom: 16 }}>
                <div style={sectionHeaderStyle}>Trigger</div>
                <div style={{ fontSize: 12, color: "#C4784A", background: "#FDF6F0", padding: "8px 12px", borderRadius: 4, borderLeft: "3px solid #C4784A" }}>
                  {selected.trigger}
                </div>
              </div>
            )}

            {/* Conditions (Layer 3) */}
            {selected.conditions && (
              <div style={{ marginBottom: 16 }}>
                <div style={sectionHeaderStyle}>Conditions (Graph Traversal)</div>
                <div style={{ fontSize: 11, color: "#333", background: "#F7F5F1", padding: "10px 12px", borderRadius: 4, lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace" }}>
                  {selected.conditions}
                </div>
              </div>
            )}

            {/* Actions (Layer 3) */}
            {selected.actions && (
              <div style={{ marginBottom: 16 }}>
                <div style={sectionHeaderStyle}>Actions</div>
                <div style={{ fontSize: 11, color: "#333" }}>
                  {selected.actions.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, padding: "6px 10px", background: "#F0FAF5", borderRadius: 4 }}>
                      <span style={{ color: "#10B981", fontWeight: 700, fontFamily: "monospace" }}>→</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Authority (Layer 3) */}
            {selected.authority && (
              <div style={{ marginBottom: 16 }}>
                <div style={sectionHeaderStyle}>Authority</div>
                <div style={{ fontSize: 11, color: "#555" }}>{selected.authority}</div>
              </div>
            )}

            {/* Constraints (Layer 3) */}
            {selected.constraints && (
              <div style={{ marginBottom: 16 }}>
                <div style={sectionHeaderStyle}>Constraints</div>
                <div style={{ fontSize: 11, color: "#EF4444", background: "#FEF2F2", padding: "8px 12px", borderRadius: 4, borderLeft: "3px solid #EF4444" }}>
                  {selected.constraints}
                </div>
              </div>
            )}

            {/* Connected Nodes */}
            <div style={{ marginBottom: 16 }}>
              <div style={sectionHeaderStyle}>Connections</div>
              <div style={{ fontSize: 11 }}>
                {edges.filter(e => e.source === selected.id || e.target === selected.id || e.source?.id === selected.id || e.target?.id === selected.id).map((e, i) => {
                  const src = e.source?.id || e.source;
                  const tgt = e.target?.id || e.target;
                  const isOutgoing = src === selected.id;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, padding: "4px 8px", background: "#FAFAF8", borderRadius: 3 }}>
                      <span style={{ color: "#999", fontSize: 10 }}>{isOutgoing ? "→" : "←"}</span>
                      <span style={{ fontWeight: 600, color: "#2D5A3D" }}>{isOutgoing ? tgt : src}</span>
                      <span style={{ color: "#999", fontFamily: "monospace", fontSize: 9 }}>{e.rel}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
      `}</style>
    </div>
  );
}

const sectionHeaderStyle = {
  fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5,
  color: "#999", marginBottom: 6,
};

"use client"
import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

// ═══════════════════════════════════════════════════════════════════════════
// PART 1 — FOUNDATION: TOKENS, DATA, SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// ─── DESIGN TOKENS ──────────────────────────────────────────────────────────
const T = {
  bg: "#F6F3EF",
  card: "#FFFFFF",
  cardHover: "#FDFCFB",
  sidebar: "#1C1F1E",
  sidebarBorder: "#2E3330",
  sidebarText: "#A8B5AE",
  sidebarActive: "#2D5A3D",
  sidebarActiveText: "#FFFFFF",
  border: "#E8E4DC",
  borderLight: "#F0EDE8",
  text: "#1A1A1A",
  sub: "#525252",
  muted: "#9A9A9A",
  green: "#2D5A3D",
  greenPale: "#EBF5EF",
  greenMid: "#22C55E",
  greenDeep: "#1A3D28",
  amber: "#92400E",
  amberBg: "#FEF3C7",
  amberBorder: "#F59E0B",
  red: "#991B1B",
  redBg: "#FFF1F1",
  redBorder: "#EF4444",
  blue: "#1E40AF",
  blueBg: "#EFF6FF",
  blueBorder: "#3B82F6",
  // Shadows
  shadowSm:  "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)",
  shadowMd:  "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05)",
  shadowLg:  "0 8px 24px rgba(0,0,0,0.10), 0 3px 8px rgba(0,0,0,0.06)",
  shadowGreen: "0 4px 16px rgba(45,90,61,0.22)",
  mono: "'IBM Plex Mono', 'SF Mono', monospace",
  sans: "'IBM Plex Sans', 'Segoe UI', sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
};

// ─── DOMAIN COLORS ───────────────────────────────────────────────────────────
const DC = {
  customer_lead:  "#3B82F6",
  product_policy: "#8B5CF6",
  seller:         "#10B981",
  channel:        "#F59E0B",
  geography:      "#06B6D4",
  activity:       "#EC4899",
  compliance:     "#EF4444",
  metric:         "#059669",
  decision:       "#374151",
};

const DL = {
  customer_lead:  "Customer & Lead",
  product_policy: "Product & Policy",
  seller:         "Seller & Hierarchy",
  channel:        "Channel & Distribution",
  geography:      "Geography",
  activity:       "Activity & Interaction",
  compliance:     "Compliance",
  metric:         "Metrics",
  decision:       "Decisions",
};

// ─── SYSTEM OF RECORD COLORS ────────────────────────────────────────────────
const SOR = {
  "LAMS":         { bg: "#EFF6FF", text: "#1E40AF", border: "#BFDBFE" },
  "CRM NXT":      { bg: "#F5F3FF", text: "#5B21B6", border: "#C4B5FD" },
  "Policy 360":   { bg: "#ECFDF5", text: "#065F46", border: "#6EE7B7" },
  "Vymo":         { bg: "#FFF7ED", text: "#9A3412", border: "#FDBA74" },
  "WhatsApp API": { bg: "#F0FDF4", text: "#166534", border: "#86EFAC" },
  "LangSmith":    { bg: "#F9FAFB", text: "#374151", border: "#D1D5DB" },
};

// ─── AGENTS DATA ─────────────────────────────────────────────────────────────
const AGENTS_DATA = [
  {
    id: "lead_mgmt",
    name: "Lead Management",
    status: "active",
    volume: "1,240 leads/day",
    lastAction: "2m ago",
    description: "Scores, prioritises, enriches, and allocates leads across CAT, Agency, DMF, and IMF channels.",
    traversal: ["Lead", "IncomeBand", "LeadSource", "Channel", "Territory", "Agent", "AgentSpecialization", "AgentTier"],
    capabilities: [
      {
        action: "Score leads on arrival",
        description: "Traverses Lead → IncomeBand → LifeEvent → LeadSource to compute composite score (0–1). CAT channel gets 1.2× multiplier from historical data.",
        reads: ["LAMS", "CRM NXT"],
        writes: [],
        nodes: ["Lead", "IncomeBand", "LifeEvent", "LeadSource"],
      },
      {
        action: "Allocate to best-fit seller",
        description: "Ranks available agents by specialisation × capacity headroom × territory match. Writes assignment back to LAMS and blocks a Vymo calendar slot.",
        reads: ["CRM NXT", "LAMS"],
        writes: ["LAMS", "Vymo"],
        nodes: ["Agent", "Territory", "AgentSpecialization", "AgentTier"],
      },
      {
        action: "Enforce channel constraints",
        description: "CAT referrals locked to originating bank RM pool. IMF leads flagged to coordinator — never auto-reassigned cross-channel.",
        reads: ["CRM NXT"],
        writes: ["LAMS"],
        nodes: ["Channel", "Partner", "Branch"],
      },
      {
        action: "Trigger escalation on SLA breach",
        description: "3 failed contact attempts or SLA window exceeded → escalate to supervisor pool. Sends WhatsApp alert via API.",
        reads: ["Vymo", "LAMS"],
        writes: ["LAMS", "WhatsApp API"],
        nodes: ["Meeting", "Supervisor", "Lead"],
      },
    ],
    recentActions: [
      { id: "LA-4821", text: "Allocated lead #4821 → Ravi Kumar", detail: "Score 91% — territory match + ULIP expertise", time: "2m ago",  ch: "CAT",    conf: 0.91 },
      { id: "LA-4820", text: "Escalated lead #4820 → supervisor pool",  detail: "3 failed contact attempts, seller unavailable",   time: "7m ago",  ch: "Agency", conf: 0.99 },
      { id: "LA-4818", text: "Moved lead #4818 → long-term nurture",    detail: "2nd re-allocation, conversion probability <0.5%",  time: "14m ago", ch: "DMF",    conf: 0.99 },
    ],
    inflight: {
      action: "Allocate Lead #5023 → Kiran Mehta",
      confidence: 0.88,
      reasoning: [
        { label: "Territory match",        value: 0.95, note: "Kiran covers South Mumbai — lead pincode 400013" },
        { label: "Product specialisation", value: 0.89, note: "ULIP conversion rate 2.4× team avg (last 6 months)" },
        { label: "Capacity headroom",      value: 0.82, note: "14 active leads vs 20-lead capacity ceiling" },
        { label: "Agent tier multiplier",  value: 1.20, note: "Platinum tier — 1.2× priority weighting applied" },
      ],
      queries: [
        "CRMNXT.lead_master WHERE lead_id = 5023",
        "CRMNXT.agent_master WHERE territory = 'South Mumbai'",
        "derived.agent_specialization WHERE product_category = 'ULIP'",
      ],
    },
  },
  {
    id: "sales_enable",
    name: "Sales Enablement",
    status: "active",
    volume: "3,810 nudges/day",
    lastAction: "Just now",
    description: "Delivers contextual product nudges, pre-meeting briefings, and in-meeting recommendations to sellers.",
    traversal: ["Customer", "Policy", "LifeEvent", "IncomeBand", "Product", "ProductCategory", "Rider"],
    capabilities: [
      {
        action: "Generate pre-meeting briefings",
        description: "Assembles 360° customer brief 15–30 min before each seller meeting. Reads demographics, policies, and life events.",
        reads: ["CRM NXT", "Policy 360"],
        writes: ["Vymo"],
        nodes: ["Customer", "Policy", "LifeEvent", "IncomeBand"],
      },
      {
        action: "Recommend best-fit products",
        description: "Traverses coverage gaps and IRDAI suitability rules to rank products by fit score for the specific lead.",
        reads: ["CRM NXT", "Policy 360"],
        writes: ["Vymo"],
        nodes: ["Product", "ProductCategory", "Rider"],
      },
      {
        action: "Surface cross-sell opportunities",
        description: "Identifies portfolio gaps in existing policyholders triggered by life events or policy milestones.",
        reads: ["Policy 360", "CRM NXT"],
        writes: ["LAMS", "LangSmith"],
        nodes: ["Customer", "Policy", "Renewal"],
      },
      {
        action: "Push in-meeting nudges",
        description: "Real-time pitch cards pushed to seller's Vymo app and WhatsApp during active meetings.",
        reads: ["Vymo", "CRM NXT"],
        writes: ["Vymo", "WhatsApp API"],
        nodes: ["Meeting", "WhatsAppMessage"],
      },
    ],
    recentActions: [
      { id: "SE-2104", text: "Pre-meeting brief sent for Customer #C-8832", detail: "High CLV, protection gap — child plan recommended", time: "Just now", ch: "CAT",    conf: 0.88 },
      { id: "SE-2103", text: "Cross-sell nudge → Seller Arjun Sharma",      detail: "Policy approaching maturity — wealth product gap", time: "5m ago",   ch: "Agency", conf: 0.84 },
      { id: "SE-2101", text: "Customer #C-7741 excluded from ULIP",          detail: "Persistency 54% — protection-first rule applied",  time: "18m ago",  ch: "IMF",    conf: 0.97 },
    ],
    inflight: {
      action: "Send pre-meeting brief to Seller Rahul for Customer #C-9140",
      confidence: 0.84,
      reasoning: [
        { label: "Coverage gap identified", value: 0.91, note: "No term insurance; gap ₹1.55Cr vs HLV rule" },
        { label: "Life stage signal",        value: 0.87, note: "Age 34, first child born 8 months ago" },
        { label: "Income eligibility",       value: 0.93, note: "₹18L annual income — supports ₹1.2L premium" },
        { label: "Meeting in 22 minutes",    value: 1.00, note: "Vymo meeting #M-7821 confirmed" },
      ],
      queries: [
        "Policy360.policy_master WHERE customer_id = C-9140",
        "CRMNXT.life_events WHERE customer_id = C-9140",
        "CRMNXT.ref_income_bands WHERE band_code = 'B3'",
      ],
    },
  },
  {
    id: "activity_mgmt",
    name: "Activity Management",
    status: "manual",
    volume: "680 tasks/day",
    lastAction: "12m ago",
    description: "Monitors field activity, SLA compliance, scheduling, and attendance across the seller network.",
    traversal: ["Meeting", "WhatsAppMessage", "Agent", "Supervisor", "Lead", "Branch"],
    capabilities: [
      {
        action: "Track daily seller activity",
        description: "Reads Vymo event log in real-time for call, meeting, and message tracking across all channels.",
        reads: ["Vymo"],
        writes: [],
        nodes: ["Meeting", "WhatsAppMessage", "Agent"],
      },
      {
        action: "Alert supervisors on SLA risk",
        description: "CAT leads: 4h SLA window. Agency/DMF/IMF: 24h. Supervisor notified via mSmart dashboard + WhatsApp.",
        reads: ["LAMS", "Vymo"],
        writes: ["WhatsApp API", "LAMS"],
        nodes: ["Lead", "Supervisor", "Branch"],
      },
      {
        action: "Monitor CAT breach rate",
        description: "Triggers ops alert if daily CAT breach rate exceeds 5% threshold. Writes anomaly flag to LAMS.",
        reads: ["LAMS", "Vymo"],
        writes: ["LAMS"],
        nodes: ["Channel", "Lead"],
      },
      {
        action: "Generate compliance reports",
        description: "Daily territory activity reports generated each morning at 08:00 and delivered to supervisors.",
        reads: ["Vymo", "LAMS", "CRM NXT"],
        writes: ["LAMS"],
        nodes: ["Agent", "Territory", "Supervisor"],
      },
    ],
    recentActions: [
      { id: "AM-891", text: "SLA warning raised for 14 CAT leads", detail: "Contact not logged within 3h of 4h SLA — supervisor notified", time: "12m ago", ch: "CAT", conf: 0.99 },
    ],
    pendingItems: [
      {
        id: "PQ-1", type: "SLA Warning", lead: "#5012",
        text: "CAT lead approaching 4h contact SLA",
        urgency: "high", sla: "48 min", ch: "CAT",
        agentAction: "Send SLA alert to Supervisor Ananya for lead #5012",
        overrideActions: [
          { id: "alert_sup",   label: "Alert supervisor (as proposed)",     detail: "Send SLA warning to Ananya Singh via mSmart + WhatsApp" },
          { id: "reallocate",  label: "Reallocate lead now",                detail: "Skip the alert — move #5012 directly to next-best available agent" },
          { id: "extend_sla",  label: "Extend SLA window by 1 hour",        detail: "Log an exception and reset SLA timer — use if seller is in a meeting" },
          { id: "dismiss",     label: "No action needed",                   detail: "Mark as reviewed and remove from queue" },
        ],
        reasoning: [
          { label: "Time since assignment", value: 1.00, note: "3h 12m elapsed vs 4h CAT SLA. 48 min remaining." },
          { label: "Zero contact attempts",  value: 1.00, note: "No call, no meeting, no WhatsApp logged in Vymo." },
        ],
        queries: ["Vymo.meeting_log WHERE lead_id = 5012", "LAMS.lead_master WHERE lead_id = 5012"],
      },
      {
        id: "PQ-2", type: "SLA Warning", lead: "#5008",
        text: "CAT lead approaching 4h contact SLA",
        urgency: "high", sla: "1h 12m", ch: "CAT",
        agentAction: "Send SLA alert to Supervisor Ananya for lead #5008",
        overrideActions: [
          { id: "alert_sup",   label: "Alert supervisor (as proposed)",     detail: "Send SLA warning to Ananya Singh via mSmart + WhatsApp" },
          { id: "reallocate",  label: "Reallocate lead now",                detail: "Move #5008 to next-best agent with capacity in territory" },
          { id: "extend_sla",  label: "Extend SLA window by 1 hour",        detail: "Log an exception and reset SLA timer" },
          { id: "dismiss",     label: "No action needed",                   detail: "Mark as reviewed and remove from queue" },
        ],
        reasoning: [
          { label: "Time since assignment", value: 1.00, note: "2h 48m elapsed vs 4h CAT SLA. 1h 12m remaining." },
          { label: "1 failed attempt",       value: 0.80, note: "One call attempt at 13:02, no answer." },
        ],
        queries: ["Vymo.meeting_log WHERE lead_id = 5008"],
      },
      {
        id: "PQ-3", type: "Activity Alert", lead: "#4998",
        text: "No meeting logged for 3 days on warm prospect",
        urgency: "medium", sla: null, ch: "Agency",
        agentAction: "Flag lead #4998 to seller's supervisor for coaching follow-up",
        overrideActions: [
          { id: "flag_super",  label: "Flag to supervisor (as proposed)",    detail: "Send coaching prompt to Agency supervisor with lead context" },
          { id: "contact_sel", label: "Send reminder directly to seller",    detail: "Push Vymo nudge to the assigned seller to follow up today" },
          { id: "reassign",    label: "Reassign to a more active seller",    detail: "Move #4998 to highest-activity agent in same territory" },
          { id: "nurture",     label: "Move to nurture queue",               detail: "Lead is cooling — park for 2-week automated nurture sequence" },
        ],
        reasoning: [
          { label: "Last interaction", value: 0.70, note: "Phone call 3 days ago — callback requested. No follow-up logged." },
          { label: "Lead score",        value: 0.79, note: "Score 79% — high-value prospect at risk of going cold." },
        ],
        queries: ["Vymo.meeting_log WHERE lead_id = 4998 ORDER BY created_at DESC LIMIT 5"],
      },
      {
        id: "PQ-4", type: "Compliance", lead: null,
        text: "DMF territory daily report not generated",
        urgency: "low", sla: null, ch: "DMF",
        agentAction: "Generate and deliver DMF territory activity report for 5 Mar 2026",
        overrideActions: [
          { id: "generate",    label: "Generate report now (as proposed)",   detail: "Run report for DMF_West territory and deliver to supervisors immediately" },
          { id: "schedule",    label: "Schedule for tonight at 08:00",        detail: "Add to tomorrow's scheduled batch — no immediate action" },
          { id: "manual",      label: "Assign to ops team manually",          detail: "Route to ops team Slack channel for manual generation" },
          { id: "skip",        label: "Skip this report",                     detail: "Log exception — no report needed for this date" },
        ],
        reasoning: [
          { label: "Report schedule", value: 1.00, note: "Daily report due at 08:00. Currently 14:30 — 6.5h overdue." },
        ],
        queries: ["Vymo.activity_log WHERE territory = 'DMF_West' AND date = '2026-03-05'"],
      },
    ],
    inflight: {
      action: "Send SLA breach alert to Supervisor Ananya for 3 CAT leads",
      confidence: 0.99,
      reasoning: [
        { label: "Leads past 4h SLA",    value: 1.00, note: "Leads #5012, #5008, #5003 — CAT channel, assigned 4h+ ago" },
        { label: "Zero contact logged",  value: 1.00, note: "Vymo shows no call, no WhatsApp, no meeting" },
        { label: "Supervisor available", value: 0.95, note: "Ananya Singh active on mSmart in last 20 min" },
      ],
      queries: [
        "Vymo.meeting_log WHERE lead_id IN (5012,5008,5003) AND created_at > NOW()-4h",
        "CRMNXT.supervisors WHERE territory = 'South Mumbai' AND active = true",
      ],
    },
  },
  {
    id: "journey_orch",
    name: "Journey Orchestration",
    status: "active",
    volume: "2,100 events/day",
    lastAction: "2m ago",
    description: "Maintains unified lead state and context across all touchpoints throughout the full sales lifecycle.",
    traversal: ["Lead", "Customer", "Agent", "Policy", "Channel", "Meeting", "WhatsAppMessage"],
    capabilities: [
      {
        action: "Maintain unified lead state",
        description: "Single source of truth for lead context across CRM NXT, Vymo, and Policy 360. Writes canonical state back to LAMS.",
        reads: ["LAMS", "CRM NXT", "Policy 360", "Vymo"],
        writes: ["LAMS", "CRM NXT"],
        nodes: ["Lead", "Customer", "Policy"],
      },
      {
        action: "Trigger inter-agent handoffs",
        description: "Routes context packets between Lead Management, Sales Enablement, and Activity agents. All handoffs logged to LangSmith.",
        reads: ["LAMS", "Vymo"],
        writes: ["LAMS", "LangSmith"],
        nodes: ["Agent", "Supervisor", "Meeting"],
      },
      {
        action: "Preserve context on channel switch",
        description: "When a lead moves DMF → Agency, full interaction history is reattached to the new assignment.",
        reads: ["LAMS", "CRM NXT"],
        writes: ["LAMS"],
        nodes: ["Channel", "Partner"],
      },
      {
        action: "Score journey health",
        description: "Composite journey health score surfaces stalled leads proactively. Scores and flags written to LAMS.",
        reads: ["LAMS", "Vymo", "CRM NXT"],
        writes: ["LAMS", "LangSmith"],
        nodes: ["Lead", "Meeting", "WhatsAppMessage"],
      },
    ],
    recentActions: [
      { id: "JO-3301", text: "Handoff: Lead #4821 → Sales Enablement", detail: "First contact confirmed, pre-meeting brief requested", time: "2m ago",  ch: "CAT", conf: 0.95 },
      { id: "JO-3299", text: "Context switch for Customer #C-9021",    detail: "Channel changed IMF → Agency — context preserved",     time: "33m ago", ch: "IMF", conf: 0.96 },
    ],
    inflight: {
      action: "Trigger cross-agent handoff for Lead #4821",
      confidence: 0.95,
      reasoning: [
        { label: "First contact confirmed", value: 1.00, note: "Vymo call logged at 14:22 — 8 min, outcome: interested" },
        { label: "Meeting scheduled",        value: 1.00, note: "Slot blocked tomorrow 11am in Vymo calendar" },
        { label: "Briefing window open",     value: 0.95, note: "17h before meeting — optimal pre-brief timing" },
        { label: "SE agent capacity",        value: 0.90, note: "No backlog on CAT briefings currently" },
      ],
      queries: [
        "Vymo.meeting_log WHERE lead_id = 4821 ORDER BY created_at DESC LIMIT 1",
        "Vymo.calendar WHERE lead_id = 4821 AND status = 'confirmed'",
      ],
    },
  },
];

// ─── IW NODES ─────────────────────────────────────────────────────────────────
const IW_NODES = [
  {
    id: "Lead", label: "Lead", layer: "ontology", domain: "customer_lead", size: 26, nodeStatus: "active",
    definition: "A prospect entering the system from any channel — bancassurance referral, digital inquiry, agent-sourced, campaign, or cross-sell. The atomic unit of the sales pipeline.",
    grain: "Lead ID",
    attributes: ["LeadID", "SourceChannel", "Stage", "LeadScore", "ProductAffinity", "ContactAttempts", "AgingDays"],
    dataMapping: { table: "CRMNXT.lead_master", pk: "lead_id", query: "SELECT l.*, ls.source_name FROM lead_master l\nJOIN lead_sources ls ON ls.source_id = l.source_id\nWHERE 1=1" },
  },
  {
    id: "Customer", label: "Customer", layer: "ontology", domain: "customer_lead", size: 28, nodeStatus: "active",
    definition: "An individual with at least one issued policy OR a high-intent prospect with KYC completed. The 360° view — demographics, financial profile, policy portfolio, interaction history.",
    grain: "Customer ID (PAN-linked)",
    attributes: ["CustomerID", "DOB", "IncomeBand", "NRI_Flag", "PolicyCount", "LifetimeValue", "PersistencyRisk"],
    dataMapping: { table: "CRMNXT.customer_360", pk: "customer_id", query: "SELECT c.*, COUNT(p.policy_id) as policy_count,\n  SUM(p.annual_premium) as total_premium\nFROM customer_360 c\nLEFT JOIN policy_master p ON p.customer_id = c.customer_id\nWHERE 1=1 GROUP BY c.customer_id" },
  },
  {
    id: "LifeEvent", label: "Life Event", layer: "ontology", domain: "customer_lead", size: 16, nodeStatus: "active",
    definition: "A significant life milestone that changes insurance needs — marriage, child birth, retirement, home purchase. Triggers cross-sell and product re-evaluation.",
    grain: "Customer ID × Event Type × Date",
    attributes: ["EventID", "CustomerID", "EventType", "EventDate", "ProductImplication", "ActionTaken"],
    dataMapping: { table: "CRMNXT.life_events", pk: "event_id", query: "SELECT le.*, c.full_name FROM life_events le\nJOIN customer_360 c ON c.customer_id = le.customer_id\nWHERE 1=1" },
  },
  {
    id: "IncomeBand", label: "Income Band", layer: "ontology", domain: "customer_lead", size: 14, nodeStatus: "active",
    definition: "Standardised income segmentation driving product eligibility and premium capacity. Maps to specific product categories, sum assured ranges, and channel affinity patterns.",
    grain: "Band Code",
    attributes: ["BandCode", "BandLabel", "MinIncome", "MaxIncome", "TypicalProducts", "AvgPremiumCapacity"],
    dataMapping: { table: "CRMNXT.ref_income_bands", pk: "band_code", query: "SELECT * FROM ref_income_bands WHERE 1=1" },
  },
  {
    id: "KYCStatus", label: "KYC Status", layer: "ontology", domain: "customer_lead", size: 12, nodeStatus: "active",
    definition: "Know Your Customer verification state — governs whether a lead can progress to proposal. Includes PAN, Aadhaar e-KYC, video KYC for remote customers.",
    grain: "Customer ID × KYC Type",
    attributes: ["CustomerID", "KYCType", "Status", "VerificationDate", "ExpiryDate", "DocumentsOnFile"],
    dataMapping: { table: "CRMNXT.kyc_records", pk: "customer_id, kyc_type", query: "SELECT * FROM kyc_records WHERE 1=1" },
  },
  {
    id: "Product", label: "Product", layer: "ontology", domain: "product_policy", size: 24, nodeStatus: "active",
    definition: "An IRDAI-approved insurance plan. Each product has eligibility rules, commission structures, and suitability criteria that vary by channel and customer segment.",
    grain: "Product Code (IRDAI UIN)",
    attributes: ["ProductCode", "UIN", "Category", "MinEntryAge", "MaxSumAssured", "CommissionStructure", "Status"],
    dataMapping: { table: "CRMNXT.product_master", pk: "product_code", query: "SELECT pm.*, pc.category_name\nFROM product_master pm\nJOIN product_categories pc ON pc.category_id = pm.category_id\nWHERE 1=1" },
  },
  {
    id: "ProductCategory", label: "Product Category", layer: "ontology", domain: "product_policy", size: 20, nodeStatus: "active",
    definition: "Classification of insurance plans — Term, ULIP, Endowment, Health, Retirement, Child, Savings, Group. Each category has distinct selling motions and regulatory treatment.",
    grain: "Category ID",
    attributes: ["CategoryID", "CategoryName", "SellingMotion", "RegulatoryClass", "AvgTicketSize", "CrossSellAffinity"],
    dataMapping: { table: "CRMNXT.product_categories", pk: "category_id", query: "SELECT * FROM product_categories WHERE 1=1" },
  },
  {
    id: "Policy", label: "Policy", layer: "ontology", domain: "product_policy", size: 26, nodeStatus: "active",
    definition: "An issued, in-force insurance contract. The core revenue unit — premium payments, sum assured, policy status, lapse risk, renewal schedule.",
    grain: "Policy Number",
    attributes: ["PolicyNumber", "CustomerID", "ProductCode", "SumAssured", "AnnualPremium", "Status", "PersistencyMonth", "LapseRisk"],
    dataMapping: { table: "Policy360.policy_master", pk: "policy_number", query: "SELECT p.*, c.full_name, pr.product_name\nFROM policy_master p\nJOIN customer_360 c ON c.customer_id = p.customer_id\nJOIN product_master pr ON pr.product_code = p.product_code\nWHERE 1=1" },
  },
  {
    id: "Renewal", label: "Renewal", layer: "ontology", domain: "product_policy", size: 16, nodeStatus: "active",
    definition: "A premium payment event due on an existing policy. Renewal tracking drives persistency — the single most important metric in life insurance economics.",
    grain: "Policy Number × Due Date",
    attributes: ["PolicyNumber", "DueDate", "DueAmount", "PaymentStatus", "RevivalEligible", "RetentionActionTaken"],
    dataMapping: { table: "Policy360.renewal_schedule", pk: "policy_number, due_date", query: "SELECT rs.*, p.customer_id, p.annual_premium\nFROM renewal_schedule rs\nJOIN policy_master p ON p.policy_number = rs.policy_number\nWHERE 1=1" },
  },
  {
    id: "Rider", label: "Rider", layer: "ontology", domain: "product_policy", size: 14, nodeStatus: "active",
    definition: "Add-on benefit attached to a base policy — accidental death, critical illness, waiver of premium. Riders increase ticket size and improve persistency.",
    grain: "Rider Code",
    attributes: ["RiderCode", "RiderName", "Type", "CompatibleProducts", "AdditionalPremium", "PersistencyImpact"],
    dataMapping: { table: "CRMNXT.rider_master", pk: "rider_code", query: "SELECT * FROM rider_master WHERE 1=1" },
  },
  {
    id: "Agent", label: "Agent / Seller", layer: "ontology", domain: "seller", size: 26, nodeStatus: "active",
    definition: "A licensed insurance advisor — tied agent (Agency), bank RM (CAT), direct rep (DMF), or IMF partner. The human who converts leads to policies.",
    grain: "Agent ID (IRDAI license)",
    attributes: ["AgentID", "Channel", "Territory", "Tier", "ConversionRate", "Persistency13M", "CapacitySlots", "PreferredProducts"],
    dataMapping: { table: "CRMNXT.agent_master", pk: "agent_id", query: "SELECT a.*, t.team_name, s.supervisor_name\nFROM agent_master a\nLEFT JOIN teams t ON t.team_id = a.team_id\nLEFT JOIN supervisors s ON s.supervisor_id = a.supervisor_id\nWHERE 1=1" },
  },
  {
    id: "Supervisor", label: "Supervisor", layer: "ontology", domain: "seller", size: 20, nodeStatus: "active",
    definition: "Office Head (Agency) or Agency Development Manager — manages a team of agents. Responsible for team targets, lead allocation oversight, and coaching.",
    grain: "Supervisor ID",
    attributes: ["SupervisorID", "Role", "Channel", "TeamSize", "Territory", "TeamConversionRate", "EscalationCount"],
    dataMapping: { table: "CRMNXT.supervisors", pk: "supervisor_id", query: "SELECT s.*, COUNT(a.agent_id) as team_size\nFROM supervisors s\nLEFT JOIN agent_master a ON a.supervisor_id = s.supervisor_id\nWHERE 1=1 GROUP BY s.supervisor_id" },
  },
  {
    id: "AgentSpecialization", label: "Agent Spec.", layer: "ontology", domain: "seller", size: 14, nodeStatus: "active",
    definition: "Product categories where an agent has demonstrated above-average conversion. Inferred from historical performance, not self-declared.",
    grain: "Agent ID × Product Category",
    attributes: ["AgentID", "ProductCategory", "ConversionRate", "SpecializationScore", "Rank_InTeam"],
    dataMapping: { table: "derived.agent_specialization", pk: "agent_id, product_category", query: "SELECT agent_id, product_category,\n  COUNT(*) as policy_count,\n  COUNT(*)::float / NULLIF(lead_count, 0) as conversion_rate\nFROM policy_master p\nJOIN lead_master l ON l.lead_id = p.source_lead_id\nGROUP BY agent_id, product_category" },
  },
  {
    id: "Channel", label: "Channel", layer: "ontology", domain: "channel", size: 22, nodeStatus: "active",
    definition: "Distribution channel — CAT (Bancassurance), Agency (tied advisors), DMF (Direct Marketing Force), IMF (Insurance Marketing Firm). Each operates with distinct economics.",
    grain: "Channel Code",
    attributes: ["ChannelCode", "ChannelName", "ConversionRate", "AvgTicketSize", "PersistencyRate", "CostOfAcquisition"],
    dataMapping: { table: "CRMNXT.ref_channels", pk: "channel_code", query: "SELECT * FROM ref_channels WHERE 1=1" },
  },
  {
    id: "Partner", label: "Partner (Bank/IMF)", layer: "ontology", domain: "channel", size: 20, nodeStatus: "active",
    definition: "External distribution partner — Axis Bank (1,400+ branches), YES Bank, or an IMF firm. 60% of India's IMFs partner with Max Life.",
    grain: "Partner ID",
    attributes: ["PartnerID", "PartnerType", "Channel", "BranchCount", "MonthlyLeadVolume", "ConversionRate"],
    dataMapping: { table: "CRMNXT.partner_master", pk: "partner_id", query: "SELECT * FROM partner_master WHERE 1=1" },
  },
  {
    id: "Territory", label: "Territory", layer: "ontology", domain: "geography", size: 16, nodeStatus: "active",
    definition: "Operational unit — a cluster of pin codes assigned to a team of agents. Territory performance drives allocation decisions.",
    grain: "Territory ID",
    attributes: ["TerritoryID", "ZoneID", "PinCodes", "AgentCount", "CompetitorDensity", "MarketPotential"],
    dataMapping: { table: "CRMNXT.ref_territories", pk: "territory_id", query: "SELECT t.*, z.zone_name\nFROM ref_territories t\nJOIN ref_zones z ON z.zone_id = t.zone_id\nWHERE 1=1" },
  },
  {
    id: "Meeting", label: "Meeting", layer: "ontology", domain: "activity", size: 18, nodeStatus: "active",
    definition: "A scheduled or completed face-to-face or virtual meeting between agent and lead/customer. First meeting attendance rate is the strongest predictor of conversion.",
    grain: "Meeting ID",
    attributes: ["MeetingID", "LeadID", "AgentID", "ScheduledDate", "Status", "Outcome", "Duration_Min"],
    dataMapping: { table: "Vymo.meeting_log", pk: "meeting_id", query: "SELECT m.*, l.lead_score, a.agent_name\nFROM meeting_log m\nJOIN lead_master l ON l.lead_id = m.lead_id\nJOIN agent_master a ON a.agent_id = m.agent_id\nWHERE 1=1" },
  },
  {
    id: "WhatsAppMessage", label: "WhatsApp Msg", layer: "ontology", domain: "activity", size: 16, nodeStatus: "active",
    definition: "WhatsApp interaction — system-sent notifications and agent-initiated messages. Primary engagement channel for Indian insurance distribution.",
    grain: "Message ID",
    attributes: ["MessageID", "LeadID", "Direction", "MessageType", "SentAt", "ReadAt", "ResponseReceived"],
    dataMapping: { table: "WhatsApp_API.message_log", pk: "message_id", query: "SELECT * FROM message_log WHERE 1=1" },
  },
  {
    id: "LeadScore", label: "Lead Score", layer: "metric", domain: "metric", size: 22, nodeStatus: "active",
    definition: "Composite score for lead quality and conversion potential, computed from graph-traversed features — not flat if/then rules.",
    formula: "0.35 × ProductFitScore\n+ 0.25 × RecencyScore\n+ 0.20 × IncomeScore\n+ 0.20 × LifecycleScore",
    window: "Real-time on assignment",
    thresholds: { hot: "> 0.75", warm: "0.5 – 0.75", cold: "< 0.5" },
  },
  {
    id: "ConversionRate", label: "Conversion Rate", layer: "metric", domain: "metric", size: 18, nodeStatus: "active",
    definition: "Percentage of assigned leads that result in issued policies, broken down by channel, agent, and territory.",
    formula: "COUNT(policies_issued) / COUNT(leads_assigned) × 100",
    window: "Rolling 30-day, by channel + territory",
  },
  {
    id: "AllocationQuality", label: "Allocation Quality", layer: "metric", domain: "metric", size: 16, nodeStatus: "active",
    definition: "Average seller-match score for leads assigned in the period. Measures how well the allocation decision aligned seller expertise with lead profile.",
    formula: "AVG(0.4 × product_expertise + 0.3 × territory_match + 0.3 × capacity_headroom)",
    window: "Weekly",
  },
  {
    id: "PersistencyScore", label: "Persistency Score", layer: "metric", domain: "metric", size: 18, nodeStatus: "active",
    definition: "Policy retention rate measured at 13th month — the single most important metric in life insurance economics.",
    formula: "Policies in-force at 13th month / Policies issued × 100",
    window: "Monthly, by product + channel",
  },
  {
    id: "CustomerCLV", label: "Customer CLV", layer: "metric", domain: "metric", size: 16, nodeStatus: "new",
    definition: "Expected lifetime premium value of a customer, discounted to present value at 8% per annum over policy term.",
    formula: "SUM(expected_premiums × persistency_probability)\ndiscounted at 8% over policy term",
    window: "Quarterly refresh",
  },
  {
    id: "D_LeadAllocation", label: "Lead Allocation", layer: "decision", domain: "decision", size: 22, nodeStatus: "active",
    definition: "Matches a scored lead to the best-fit agent using graph traversal across specialisation, geography, capacity, and tier.",
    trigger: "Lead score computed AND score > allocation threshold",
    conditions: "Traverse: Lead.Territory → Agents, Filter: Capacity > 0\nRank: Specialisation × ConversionRate × Capacity × GeographyMatch",
    actions: ["Allocate to top-ranked agent", "Block calendar slot within 4h", "Send WhatsApp notification to lead", "Alert supervisor", "Set SLA timer"],
    authority: "System auto for Tier 1. Supervisor approval for cross-territory.",
    constraints: "Agent must have valid IRDAI license. Max capacity enforced.",
  },
  {
    id: "D_Reallocation", label: "Lead Reallocation", layer: "decision", domain: "decision", size: 18, nodeStatus: "active",
    definition: "Triggers when SLA is breached — agent hasn't contacted lead within the defined window. Moves lead to next-best agent.",
    trigger: "SLA breach: no contact within 48h OR no meeting within 7 days",
    conditions: "Check: ContactRate < threshold for rolling 14-day window\nIdentify top performers with capacity in same territory",
    actions: ["Move leads to next-best agent", "Notify original agent and supervisor", "Log reallocation reason for audit", "Reset SLA timers"],
    authority: "System auto for SLA breach. Supervisor can trigger manually.",
    constraints: "Maximum 2 reallocations per lead. After 2nd, escalate to supervisor.",
  },
  {
    id: "D_ProductRec", label: "Product Recommendation", layer: "decision", domain: "decision", size: 20, nodeStatus: "active",
    definition: "Selects the right product based on graph traversal across income, age, life stage, existing coverage, and suitability rules.",
    trigger: "Lead allocated to agent OR agent requests recommendation during meeting",
    conditions: "Traverse: Customer → Policies → CoverageGap\nIncomeBand → ProductEligibility\nLifeEvents → NeedPriority",
    actions: ["Return ranked product list with affinity scores", "Generate contextual pitch card", "Flag compliance requirements", "Attach relevant riders"],
    authority: "System generates. Agent can override with documented reason.",
    constraints: "Must pass IRDAI suitability check. NRI products require NRI flag.",
  },
  {
    id: "D_CrossSell", label: "Cross-Sell Trigger", layer: "decision", domain: "decision", size: 18, nodeStatus: "new",
    definition: "Identifies existing policyholders for additional products — real-time, event-driven cross-sell instead of batch SFTP uploads.",
    trigger: "Life event detected OR policy milestone OR propensity score > 0.7",
    conditions: "Traverse: Customer → AllPolicies → CoverageMap\nLifeEvents → NeedTrigger\nIncomeBand → PremiumCapacity",
    actions: ["Create cross-sell lead with full context", "Score and allocate to specialist agent", "Generate contextual pitch with trigger reason"],
    authority: "System auto-generates lead. Agent accepts or defers.",
    constraints: "Max 1 cross-sell per customer per quarter. Not during active claim or complaint.",
  },
];

const IW_EDGES = [
  { source: "Lead",             target: "Customer",         rel: "linked to"      },
  { source: "Lead",             target: "IncomeBand",        rel: "income segment" },
  { source: "Lead",             target: "LeadScore",         rel: "scored by"      },
  { source: "Lead",             target: "Territory",         rel: "falls in"       },
  { source: "Customer",         target: "Policy",            rel: "holds"          },
  { source: "Customer",         target: "LifeEvent",         rel: "triggers"       },
  { source: "Customer",         target: "KYCStatus",         rel: "verified by"    },
  { source: "Policy",           target: "Product",           rel: "is a"           },
  { source: "Policy",           target: "Renewal",           rel: "has"            },
  { source: "Policy",           target: "Rider",             rel: "attaches"       },
  { source: "Product",          target: "ProductCategory",   rel: "belongs to"     },
  { source: "Agent",            target: "Territory",         rel: "covers"         },
  { source: "Agent",            target: "AgentSpecialization",rel: "specialises in"},
  { source: "Agent",            target: "Supervisor",        rel: "reports to"     },
  { source: "Agent",            target: "Meeting",           rel: "logs"           },
  { source: "Agent",            target: "WhatsAppMessage",   rel: "sends"          },
  { source: "Channel",          target: "Partner",           rel: "distributed via"},
  { source: "Partner",          target: "Territory",         rel: "operates in"    },
  { source: "LeadScore",        target: "D_LeadAllocation",  rel: "inputs to"      },
  { source: "AllocationQuality",target: "D_LeadAllocation",  rel: "validates"      },
  { source: "D_LeadAllocation", target: "D_Reallocation",    rel: "triggers"       },
  { source: "Customer",         target: "D_ProductRec",      rel: "assessed in"    },
  { source: "CustomerCLV",      target: "D_CrossSell",       rel: "weights"        },
  { source: "PersistencyScore", target: "D_CrossSell",       rel: "filters"        },
  { source: "ConversionRate",   target: "AllocationQuality", rel: "informs"        },
];

// ─── CONFIG DATA ─────────────────────────────────────────────────────────────
const THRESHOLDS_INIT = [
  { id: "cat_sla",         name: "CAT Lead SLA",                      value: "4",    unit: "hours",         cat: "SLA",             node: "D_LeadAllocation", desc: "Max time from assignment to first contact attempt for CAT channel." },
  { id: "gen_sla",         name: "General Lead SLA",                  value: "24",   unit: "hours",         cat: "SLA",             node: "D_LeadAllocation", desc: "Max time from assignment to first contact for Agency, DMF, IMF." },
  { id: "breach_alert",    name: "CAT SLA Breach Alert",              value: "5",    unit: "%",             cat: "Alerts",          node: "D_Reallocation",   desc: "Daily CAT breach rate above this triggers an ops alert to supervisors." },
  { id: "min_conf",        name: "Min Confidence to Auto-Act",        value: "0.70", unit: "score (0–1)",   cat: "Agent Behaviour", node: "D_LeadAllocation", desc: "Agent routes to pending queue if confidence is below this threshold." },
  { id: "max_realloc",     name: "Max Re-allocations Before Nurture", value: "2",    unit: "attempts",      cat: "Lead Rules",      node: "D_Reallocation",   desc: "After this many re-allocations, lead moves to long-term nurture." },
  { id: "nurture_window",  name: "Nurture Queue Duration",            value: "30",   unit: "days",          cat: "Lead Rules",      node: "D_Reallocation",   desc: "Duration a lead stays in automated nurture before ops review." },
  { id: "persistency_exc", name: "ULIP Cross-sell Exclusion",         value: "60",   unit: "% persistency", cat: "Product Rules",   node: "D_CrossSell",      desc: "Customers below this persistency excluded from ULIP cross-sell." },
  { id: "clv_discount",    name: "CLV Discount Rate",                 value: "8",    unit: "% annual",      cat: "Metrics",         node: "CustomerCLV",      desc: "Annual discount rate used in Customer Lifetime Value calculation." },
];

const CHANGE_LOG_INIT = [
  { threshold: "CAT Lead SLA",                      from: "6",    to: "4",    unit: "hours",    user: "Deepak M.",    date: "12 Feb 2026", note: "Aligned to bancassurance SLA benchmark" },
  { threshold: "Max Re-allocations Before Nurture", from: "3",    to: "2",    unit: "attempts", user: "Sachindra P.", date: "8 Feb 2026",  note: "High 3rd-realloc drop-off rate in January data" },
  { threshold: "Min Confidence to Auto-Act",        from: "0.65", to: "0.70", unit: "score",    user: "Deepak M.",    date: "1 Feb 2026",  note: "Raised after NRI lead accuracy concerns in PwC review" },
];

const DATA_SOURCES = [
  { id: "lams",   name: "LAMS",          desc: "Lead & Activity Management System",      sync: "1 min ago",  health: "healthy",  records: "12,400 leads",          type: "REST API" },
  { id: "crmnxt", name: "CRM NXT",       desc: "Customer 360 data mart (BusinessNext)",   sync: "3 min ago",  health: "healthy",  records: "840K customers",        type: "REST API" },
  { id: "p360",   name: "Policy 360",    desc: "Policy and premium data",                sync: "5 min ago",  health: "healthy",  records: "2.1M policies",         type: "REST API" },
  { id: "vymo",   name: "Vymo (mSmart)", desc: "Seller activity and attendance",          sync: "Just now",   health: "healthy",  records: "18,200 activities/day", type: "Webhook"  },
  { id: "mpro",   name: "mPro / mSpace", desc: "Axis Bank bancassurance channel (SFTP)",  sync: "8 min ago",  health: "degraded", records: "4,100 referrals/mo",    type: "SFTP"     },
];

// ─── DECISION LOG ─────────────────────────────────────────────────────────────
const DECISION_LOG = [
  {
    id: "DL-8821", agent: "Lead Management", decision: "Lead Allocation", ref: "#4821",
    summary: "Allocated to Ravi Kumar — CAT channel. Score 91%.",
    conf: 0.91, ch: "CAT", time: "2m ago",
    trail: [
      { t: "14:18:02", agent: "Orchestrator",        icon: "◎", action: "New lead #4821 received from LAMS",              thinking: "Lead via Axis Bank Andheri referral. Routing to Lead Management Agent for scoring.",                                                                                                        source: "CRMNXT.lead_master",          query: "SELECT * FROM lead_master WHERE lead_id = 4821",                                                                                                                    result: "source:CAT, partner:Axis_Andheri, pincode:400053, income_band:B4, intent_score:0.71" },
      { t: "14:18:03", agent: "Lead Scoring",         icon: "◈", action: "Computing composite lead score",                 thinking: "Traversing income band → product affinity → channel multiplier. Axis CAT referrals get 1.2× channel multiplier based on 6-month historical conversion data.",                          source: "derived.lead_scoring_features", query: "SELECT product_fit, recency_score, income_score, lifecycle_score FROM lead_scoring_features WHERE lead_id = 4821",                                              result: "product_fit:0.88, recency:0.94, income:0.82, lifecycle:0.78 → composite:0.87 → with CAT multiplier: 0.91" },
      { t: "14:18:04", agent: "Territory Resolver",   icon: "◉", action: "Resolving territory from pincode 400053",        thinking: "Pincode 400053 (Andheri West) = West Mumbai territory. Pulling eligible agents with capacity headroom.",                                                                                  source: "CRMNXT.ref_territories",       query: "SELECT a.agent_id, a.agent_name, a.capacity_slots FROM agent_master a JOIN ref_territories t ON t.territory_id = a.territory WHERE t.pincodes @> ARRAY['400053']", result: "14 agents in territory. 8 with capacity. Top 3: Ravi Kumar (cap:6), Priya Nair (cap:4), Amit Shah (cap:2)" },
      { t: "14:18:05", agent: "Specialisation Ranker",icon: "◈", action: "Ranking by product specialisation × capacity",  thinking: "Lead has ULIP affinity 0.88. Ravi Kumar has ULIP conversion rate 2.3× team average. Priya specialises in child plans. Ravi ranked first.",                                               source: "derived.agent_specialization", query: "SELECT agent_id, conversion_rate, specialization_score FROM agent_specialization WHERE product_category = 'ULIP' AND agent_id IN (ravi_id, priya_id, amit_id)",   result: "Ravi: ULIP spec_score 0.94, conv_rate 34%. Priya: 0.61. Amit: 0.72" },
      { t: "14:18:06", agent: "Allocation Decision",  icon: "◎", action: "Allocating lead to Ravi Kumar",                 thinking: "Final score: Ravi 0.91. Constraint check passed — valid IRDAI license, CAT certified, within capacity ceiling. Writing allocation to LAMS, blocking Vymo calendar slot.",                  source: "CRMNXT.lead_master + Vymo",    query: "UPDATE lead_master SET assigned_agent = 'ravi_kumar', assignment_ts = NOW() WHERE lead_id = 4821; INSERT INTO Vymo.calendar_blocks ...",                         result: "Committed. SLA timer started (4h CAT). WhatsApp notification queued. Supervisor Ananya alerted." },
    ],
  },
  {
    id: "DL-8820", agent: "Sales Enablement", decision: "Product-Customer Fit", ref: "#C-8832",
    summary: "Child plan recommended — protection gap + new parent life stage.",
    conf: 0.88, ch: "CAT", time: "Just now",
    trail: [
      { t: "14:20:11", agent: "Orchestrator",        icon: "◎", action: "Pre-meeting brief requested for Customer #C-8832", thinking: "Seller Ravi Kumar opens C-8832 in Vymo. Meeting in 18 minutes. Triggering Sales Enablement for briefing.",                                                 source: "Vymo.meeting_log",             query: "SELECT m.* FROM meeting_log m WHERE m.agent_id = 'ravi' AND m.scheduled_date = TODAY()",                                                                     result: "meeting_id:M-7821, customer:C-8832, scheduled:14:38, type:first_meeting" },
      { t: "14:20:12", agent: "Customer Profiler",   icon: "◉", action: "Building Customer 360 for C-8832",                thinking: "Customer Shanta Rao, 34F, married, first child 8mo old. Income ₹16L. No term insurance — critical protection gap identified.",                               source: "CRMNXT.customer_360 + Policy360", query: "SELECT c.*, p.product_code, p.sum_assured FROM customer_360 c LEFT JOIN policy_master p ON p.customer_id = c.customer_id WHERE c.customer_id = 'C-8832'", result: "Age:34, income_band:B3, life_event:first_child_8mo, policies:[ULIP-₹5L, Health]. term_cover:NONE" },
      { t: "14:20:13", agent: "Coverage Gap Analyser",icon:"◈", action: "Computing protection gap",                        thinking: "Income ₹16L × 10× HLV rule = ₹1.6Cr ideal cover. Current: ₹5L ULIP + health only. Gap: ₹1.55Cr. With first child, this is CRITICAL.",                     source: "derived.coverage_gap",         query: "SELECT ideal_cover, existing_cover, gap_amount, gap_urgency FROM coverage_gap WHERE customer_id = 'C-8832'",                                                    result: "gap:₹1.55Cr, urgency:CRITICAL, life_stage:new_parent" },
      { t: "14:20:14", agent: "Briefing Generator",  icon: "◎", action: "Generating pre-meeting briefing",                 thinking: "New parent + critical protection gap → Term + Child plan combination. Both CAT-eligible. Brief pushed to Vymo with suitability compliance flags.",            source: "SYNTHESIS",                    query: null,                                                                                                                                                         result: "Brief delivered to Ravi Kumar via Vymo. (1) Smart Secure Plus 1Cr — conf 0.88. (2) Future Genius — conf 0.79. Suitability form required." },
    ],
  },
  {
    id: "DL-8819", agent: "Lead Management", decision: "Lead Escalation", ref: "#4820",
    summary: "Escalated to supervisor — 3 failed contact attempts.",
    conf: 0.99, ch: "Agency", time: "7m ago",
    trail: [
      { t: "14:11:00", agent: "SLA Monitor",         icon: "◎", action: "SLA breach detected for Lead #4820",  thinking: "Assigned to Sanjay Kumar 31h ago. General SLA: 24h. 3 failed contact attempts — all no answer.",                                                          source: "CRMNXT.lead_master",   query: "SELECT assigned_agent, contact_attempts, last_contact_ts FROM lead_master WHERE lead_id = 4820", result: "assigned_agent:sanjay_kumar, attempts:3, last_attempt:13:02, outcome:no_answer" },
      { t: "14:11:01", agent: "Escalation Decision", icon: "◎", action: "Escalating to supervisor",            thinking: "Rule: 3 attempts + no response → escalate. Not re-allocating — this would trigger long-term nurture on a 2nd reallocation. Supervisor Meenakshi Rao notified.", source: "CRMNXT.supervisors",   query: "SELECT supervisor_id, supervisor_name FROM supervisors WHERE territory = 'Agency_North' AND active = true",   result: "Supervisor: Meenakshi Rao, Agency-North OH. Escalation via mSmart + WhatsApp." },
    ],
  },
];

const ALERTS_DATA = [
  { id: "ALT-01", sev: "high",   title: "CAT SLA Breach Rate Elevated",     detail: "Breach rate at 7.2% today vs 5% threshold. 14 leads at risk. Primarily North territory — 3 agents with contact rate below 20%.", time: "12 min ago", agent: "Activity Management" },
  { id: "ALT-02", sev: "medium", title: "Agent Confidence Dip — NRI Leads", detail: "Sales Enablement confidence on NRI recommendations dropped to 0.64 (threshold 0.70). 8 leads auto-routed to pending queue.", time: "1 hr ago",   agent: "Sales Enablement" },
  { id: "ALT-03", sev: "low",    title: "mPro / mSpace Connector Degraded", detail: "Last SFTP sync 8 min ago vs 2 min normal cadence. Axis Bank referrals may be delayed. Monitoring — no action needed yet.", time: "8 min ago",  agent: "System" },
];

// ─── SHARED MICRO-COMPONENTS ──────────────────────────────────────────────────

const STATUS_CFG = {
  active:  { label: "Active",          bg: "#DCFCE7", text: "#166534", dot: "#16A34A", border: "#BBF7D0" },
  manual:  { label: "Manual Override", bg: "#FEF3C7", text: "#92400E", dot: "#D97706", border: "#FDE68A" },
  paused:  { label: "Paused",          bg: "#F3F4F6", text: "#4B5563", dot: "#9CA3AF", border: "#E5E7EB" },
  healthy: { label: "Connected",       bg: "#DCFCE7", text: "#166534", dot: "#16A34A", border: "#BBF7D0" },
  degraded:{ label: "Degraded",        bg: "#FEF3C7", text: "#92400E", dot: "#D97706", border: "#FDE68A" },
};

function Badge({ status }) {
  const c = STATUS_CFG[status] || STATUS_CFG.active;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 10, fontWeight: 600, letterSpacing: "0.02em",
      background: c.bg, color: c.text,
      padding: "3px 9px", borderRadius: 99,
      border: `1px solid ${c.border}`,
      fontFamily: T.mono, whiteSpace: "nowrap",
    }}>
      {c.dot && <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />}
      {c.label}
    </span>
  );
}

function SH({ label, style }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: 1.5, color: T.muted, marginBottom: 6, ...style,
    }}>
      {label}
    </div>
  );
}

function NodePill({ id, color }) {
  const col = color || "#6B7280";
  return (
    <span style={{
      fontSize: 10, fontFamily: T.mono, padding: "2px 7px", borderRadius: 3,
      background: `${col}18`, color: col, border: `1px solid ${col}28`,
      marginRight: 4, marginBottom: 3, display: "inline-block",
    }}>
      {id}
    </span>
  );
}

function SORPill({ name, type }) {
  // type: "read" | "write"
  const sc = SOR[name] || { bg: "#F3F4F6", text: "#4B5563", border: "#D1D5DB" };
  return (
    <span style={{
      fontSize: 10, fontFamily: T.mono, padding: "2px 7px", borderRadius: 4,
      background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
      fontWeight: type === "write" ? 600 : 400,
      textDecoration: type === "write" ? "underline dotted" : "none",
      marginRight: 4, marginBottom: 3, display: "inline-block",
    }}>
      {name}
    </span>
  );
}

function ConfDot({ conf }) {
  const color = conf >= 0.9 ? T.greenMid : conf >= 0.75 ? T.amberBorder : T.redBorder;
  return (
    <span style={{ fontSize: 11, fontWeight: 700, fontFamily: T.mono, color }}>{(conf * 100).toFixed(0)}%</span>
  );
}

function BackBtn({ label = "Back", onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 12, color: T.sub, background: "none", border: "none",
      cursor: "pointer", fontFamily: T.sans, padding: 0, marginBottom: 20,
    }}>
      ← {label}
    </button>
  );
}

function MorrieLoader({ onDone }) {
  const STEPS = [
    "Traversing connected nodes…",
    "Checking data source mappings…",
    "Validating rule consistency…",
    "Propagating changes through graph…",
  ];
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step < STEPS.length) {
      const t = setTimeout(() => setStep(s => s + 1), 580);
      return () => clearTimeout(t);
    } else {
      setDone(true);
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div style={{
      padding: "14px 16px", background: T.greenPale,
      border: `1px solid ${T.green}30`, borderRadius: 6, marginTop: 10,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: T.green, marginBottom: 10, fontFamily: T.mono }}>
        {done ? "✓ Saved to Intelligence Warehouse" : "Morrie is validating…"}
      </div>
      {STEPS.map((s, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 5,
          opacity: i < step ? 1 : 0.28, transition: "opacity 0.3s",
        }}>
          <span style={{ fontSize: 11, color: i < step ? T.greenMid : T.muted }}>{i < step ? "✓" : "○"}</span>
          <span style={{ fontSize: 11, fontFamily: T.sans, color: i < step ? T.text : T.muted }}>{s}</span>
        </div>
      ))}
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════
// PART 2 — QUEUE PAGE (HITL INBOX)
// ═══════════════════════════════════════════════════════════════════════════

const URGENCY_CFG = {
  high:   { color: "#DC2626", bg: "#FEE2E2", label: "High"   },
  medium: { color: "#F59E0B", bg: "#FEF3C7", label: "Medium" },
  low:    { color: "#9CA3AF", bg: "#F9FAFB", label: "Low"    },
};

function QueueItem({ item, onApprove, onDismiss }) {
  const [expanded, setExpanded] = useState(false);
  const [chosenAction, setChosenAction] = useState(null);
  const [note, setNote] = useState("");
  const urg = URGENCY_CFG[item.urgency];
  const actions = item.overrideActions || [];

  function handleExecute() {
    onApprove(item.id);
  }

  return (
    <div style={{
      background: T.card, borderRadius: 9,
      border: `1px solid ${T.border}`,
      borderLeft: `4px solid ${urg.color}`,
      marginBottom: 10, overflow: "hidden", boxShadow: T.shadowSm,
    }}>
      {/* ── Header row ── */}
      <div style={{ padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{item.type}</span>
            {item.lead && <span style={{ fontSize: 10, fontFamily: T.mono, color: T.muted }}>{item.lead}</span>}
            <span style={{
              fontSize: 10, fontFamily: T.mono, padding: "1px 6px", borderRadius: 3,
              background: "#F0F9FF", color: "#0369A1", border: "1px solid #BAE6FD",
            }}>{item.ch}</span>
            {item.sla && (
              <span style={{ fontSize: 10, color: "#EF4444", fontFamily: T.mono, fontWeight: 600 }}>
                ⏱ {item.sla}
              </span>
            )}
          </div>
          <p style={{ fontSize: 13, fontWeight: 500, color: T.text, margin: "0 0 5px", lineHeight: 1.4 }}>{item.text}</p>
          <p style={{ fontSize: 11, color: T.green, margin: 0, fontFamily: T.mono }}>
            → {item.agentAction}
          </p>
        </div>

        <div style={{ display: "flex", gap: 6, flexShrink: 0, alignItems: "center" }}>
          <button onClick={() => setExpanded(e => !e)} style={{
            fontSize: 11, background: "none", color: T.sub,
            border: `1px solid ${T.border}`, borderRadius: 5,
            padding: "6px 12px", cursor: "pointer", fontFamily: T.sans,
          }}>{expanded ? "Collapse" : "Review"}</button>
          <button onClick={() => onApprove(item.id)} style={{
            fontSize: 11, background: T.green, color: "#fff",
            border: "none", borderRadius: 5, boxShadow: T.shadowGreen,
            padding: "6px 14px", cursor: "pointer", fontFamily: T.sans, fontWeight: 600,
          }}>Approve</button>
          <button onClick={() => onDismiss(item.id)} style={{
            fontSize: 11, background: "none", color: T.muted,
            border: "none", padding: "6px 4px", cursor: "pointer", fontFamily: T.sans,
          }}>✕</button>
        </div>
      </div>

      {/* ── Expanded ── */}
      {expanded && (
        <div style={{ borderTop: `1px solid ${T.border}`, background: T.bg }}>
          {/* Reasoning */}
          <div style={{ padding: "14px 16px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div>
              <SH label="Agent reasoning" />
              {item.reasoning.map((r, i) => {
                const col = r.value >= 0.85 ? T.greenMid : r.value >= 0.7 ? T.amberBorder : T.redBorder;
                return (
                  <div key={i} style={{
                    display: "flex", gap: 10, marginBottom: 7, padding: "7px 10px",
                    background: "#FFFFFF", border: `1px solid ${T.border}`, borderRadius: 6, boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  }}>
                    <span style={{
                      fontSize: 11.5, fontWeight: 700, fontFamily: T.mono,
                      flexShrink: 0, minWidth: 36, textAlign: "right", color: col,
                    }}>
                      {r.value > 1 ? r.value.toFixed(1) + "×" : (r.value * 100).toFixed(0) + "%"}
                    </span>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{r.label}</div>
                      <div style={{ fontSize: 10.5, color: T.sub, marginTop: 1, lineHeight: 1.5 }}>{r.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <SH label="Queries executed" />
              {item.queries.map((q, i) => (
                <div key={i} style={{
                  fontSize: 10, fontFamily: T.mono, color: T.green,
                  background: "#F7F5F1", padding: "4px 8px", borderRadius: 3,
                  marginBottom: 4, lineHeight: 1.5, wordBreak: "break-all",
                }}>{q}</div>
              ))}
            </div>
          </div>

          {/* Action selector */}
          {actions.length > 0 && (
            <div style={{ padding: "14px 16px", borderTop: `1px solid ${T.borderLight}`, marginTop: 14 }}>
              <SH label="Choose an action" />
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                {actions.map(act => {
                  const isChosen = chosenAction === act.id;
                  return (
                    <div key={act.id}
                      onClick={() => setChosenAction(act.id)}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px",
                        background: isChosen ? T.greenPale : T.card,
                        border: `1px solid ${isChosen ? T.green : T.border}`,
                        borderRadius: 6, cursor: "pointer", transition: "all 0.1s",
                      }}
                    >
                      <div style={{
                        width: 14, height: 14, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                        border: `2px solid ${isChosen ? T.green : T.border}`,
                        background: isChosen ? T.green : "white",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {isChosen && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "white" }} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: isChosen ? 600 : 400, color: T.text }}>{act.label}</div>
                        <div style={{ fontSize: 11, color: T.sub, marginTop: 2, lineHeight: 1.4 }}>{act.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginBottom: 10 }}>
                <SH label="Note (optional)" />
                <input
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="e.g. Kiran is on leave — use Priya Nair instead"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    border: `1px solid ${T.border}`, borderRadius: 4,
                    padding: "7px 10px", fontSize: 11.5, fontFamily: T.sans,
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleExecute}
                  disabled={!chosenAction}
                  style={{
                    fontSize: 12, fontWeight: 600, fontFamily: T.sans,
                    background: chosenAction ? T.green : T.border,
                    color: chosenAction ? "white" : T.muted,
                    border: "none", borderRadius: 6, padding: "9px 20px",
                    boxShadow: chosenAction ? T.shadowGreen : "none",
                    cursor: chosenAction ? "pointer" : "not-allowed", transition: "all 0.15s",
                  }}>Execute action</button>
                <button onClick={() => onDismiss(item.id)} style={{
                  fontSize: 11, background: "none", color: T.muted,
                  border: `1px solid ${T.border}`, borderRadius: 6,
                  padding: "8px 14px", cursor: "pointer",
                }}>Dismiss</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QueueBucket({ label, items, onApprove, onDismiss, urgColor, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen !== false);
  return (
    <div style={{ marginBottom: 18 }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%",
        background: "none", border: "none", cursor: "pointer", padding: "8px 0",
        marginBottom: open ? 12 : 0,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: urgColor, flexShrink: 0 }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: T.sans, letterSpacing: "-0.01em" }}>{label}</span>
        <span style={{
          fontSize: 11, fontFamily: T.mono, fontWeight: 700, color: urgColor,
          background: `${urgColor}18`, border: `1px solid ${urgColor}40`,
          padding: "2px 9px", borderRadius: 99,
        }}>{items.length}</span>
        <span style={{ fontSize: 11, color: T.muted, marginLeft: "auto" }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && items.map(item => (
        <QueueItem key={item.id} item={item} onApprove={onApprove} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function QueuePage({ queue, setQueue, agents }) {
  const [agentFilter, setAgentFilter] = useState("All");

  function onApprove(id) { setQueue(q => q.filter(i => i.id !== id)); }
  function onDismiss(id) { setQueue(q => q.filter(i => i.id !== id)); }

  const agentNames = ["All", ...new Set(queue.map(q => q.agentName))];
  const filtered = agentFilter === "All" ? queue : queue.filter(q => q.agentName === agentFilter);

  // Bucket by urgency
  const high   = filtered.filter(q => q.urgency === "high");
  const medium = filtered.filter(q => q.urgency === "medium");
  const low    = filtered.filter(q => q.urgency === "low");

  return (
    <div style={{ padding: "36px 40px", maxWidth: 900 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: T.serif, fontSize: 26, color: T.text, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          Pending Queue
        </h2>
        <p style={{ fontSize: 13, color: T.sub, margin: 0, lineHeight: 1.6 }}>
          Decisions awaiting manual action. Agents in manual override route here with all reasoning preserved.
        </p>
      </div>

      {/* Summary strip */}
      <div style={{
        display: "flex", alignItems: "center", gap: 24, marginBottom: 20,
        padding: "16px 22px", background: T.card,
        border: `1px solid ${T.border}`, borderRadius: 10, boxShadow: T.shadowSm,
      }}>
        {[
          { label: "High priority",   count: high.length,   color: URGENCY_CFG.high.color   },
          { label: "Medium priority", count: medium.length, color: URGENCY_CFG.medium.color },
          { label: "Low priority",    count: low.length,    color: URGENCY_CFG.low.color    },
          { label: "Total",           count: filtered.length, color: T.text                 },
        ].map(({ label, count, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 800, fontFamily: T.mono, color, lineHeight: 1 }}>{count}</span>
            <span style={{ fontSize: 11, color: T.muted }}>{label}</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          {agentNames.map(n => (
            <button key={n} onClick={() => setAgentFilter(n)} style={{
              fontSize: 10.5, padding: "4px 10px", borderRadius: 5, cursor: "pointer",
              fontFamily: T.mono,
              border: `1px solid ${agentFilter === n ? T.green : T.border}`,
              background: agentFilter === n ? T.green : "transparent",
              color: agentFilter === n ? "#fff" : T.sub,
            }}>{n}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{
          background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, boxShadow: T.shadowSm,
          padding: "48px 24px", textAlign: "center", color: T.sub, fontSize: 13,
        }}>✓  Queue is clear</div>
      ) : (
        <div>
          {high.length   > 0 && <QueueBucket label="High priority"   items={high}   urgColor={URGENCY_CFG.high.color}   onApprove={onApprove} onDismiss={onDismiss} defaultOpen={true}  />}
          {medium.length > 0 && <QueueBucket label="Medium priority" items={medium} urgColor={URGENCY_CFG.medium.color} onApprove={onApprove} onDismiss={onDismiss} defaultOpen={true}  />}
          {low.length    > 0 && <QueueBucket label="Low priority"    items={low}    urgColor={URGENCY_CFG.low.color}    onApprove={onApprove} onDismiss={onDismiss} defaultOpen={false} />}
        </div>
      )}
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════
// PART 3 — AGENTS PAGE
// ═══════════════════════════════════════════════════════════════════════════

function OverrideModal({ agent, onConfirm, onCancel }) {
  const inf = agent.inflight;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15,15,15,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300,
    }}>
      <div style={{
        background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, boxShadow: T.shadowMd,
        width: 548, maxHeight: "82vh", overflowY: "auto", fontFamily: T.sans,
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: T.amber, marginBottom: 6 }}>
            Manual Override
          </div>
          <h3 style={{ fontFamily: T.serif, fontSize: 20, color: T.text, margin: "0 0 8px" }}>{agent.name}</h3>
          <p style={{ fontSize: 12.5, color: T.sub, margin: 0, lineHeight: 1.6 }}>
            The agent has an in-flight decision ready to execute. Confirming will pause it and move it to the Pending Queue — all gathered context is preserved so you can review and act.
          </p>
        </div>

        {/* In-flight decision */}
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${T.border}` }}>
          <SH label="Decision ready to execute" />
          <div style={{
            background: T.amberBg, border: `1px solid ${T.amberBorder}30`,
            borderRadius: 6, padding: "12px 16px", marginBottom: 18,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 4 }}>{inf.action}</div>
            <span style={{ fontSize: 11, fontFamily: T.mono, color: T.green }}>
              Confidence: {(inf.confidence * 100).toFixed(0)}%
            </span>
          </div>

          <SH label="Reasoning gathered by agent" />
          {inf.reasoning.map((r, i) => {
            const col = r.value >= 0.85 ? T.greenMid : r.value >= 0.7 ? T.amberBorder : T.redBorder;
            return (
              <div key={i} style={{
                display: "flex", gap: 12, marginBottom: 8, padding: "8px 12px",
                background: T.bg, borderRadius: 4,
              }}>
                <span style={{
                  fontSize: 12, fontWeight: 700, fontFamily: T.mono,
                  flexShrink: 0, minWidth: 36, textAlign: "right", color: col,
                }}>
                  {r.value > 1 ? r.value.toFixed(1) + "×" : (r.value * 100).toFixed(0) + "%"}
                </span>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: T.text }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: T.sub, marginTop: 2, lineHeight: 1.5 }}>{r.note}</div>
                </div>
              </div>
            );
          })}

          <SH label="Data queried by agent" style={{ marginTop: 14 }} />
          {inf.queries.map((q, i) => (
            <div key={i} style={{
              fontSize: 10.5, fontFamily: T.mono, color: T.green,
              background: "#F7F5F1", padding: "5px 8px", borderRadius: 3, marginBottom: 5, lineHeight: 1.5,
            }}>{q}</div>
          ))}
        </div>

        {/* What happens */}
        <div style={{ padding: "16px 24px", borderBottom: `1px solid ${T.border}`, background: T.bg }}>
          <SH label="What happens after confirming" />
          {[
            "This decision moves to Pending Queue with all context preserved",
            "Agent stops processing new decisions of this type",
            "Queue items show full reasoning and allow override notes",
            "Re-activating the agent resumes automated processing immediately",
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5, alignItems: "flex-start" }}>
              <span style={{ color: T.amberBorder, flexShrink: 0, fontSize: 13, lineHeight: 1.4 }}>›</span>
              <span style={{ fontSize: 12, color: T.sub, lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ padding: "16px 24px", display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{
            fontSize: 12, background: "none", color: T.sub,
            border: `1px solid ${T.border}`, borderRadius: 6, padding: "8px 18px", cursor: "pointer",
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            fontSize: 12, background: "#D97706", color: "#fff",
            border: "none", borderRadius: 6,
            boxShadow: "0 3px 10px rgba(217,119,6,0.30)",
            padding: "9px 20px", cursor: "pointer", fontWeight: 600,
          }}>Confirm — move to queue →</button>
        </div>
      </div>
    </div>
  );
}

function AgentDetail({ agent, onBack, onOverride }) {
  const [showModal, setShowModal] = useState(false);

  function handleConfirm() {
    setShowModal(false);
    onOverride(agent.id, "manual");
  }

  return (
    <div>
      <BackBtn label="All agents" onClick={onBack} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <Badge status={agent.status} />
            <span style={{ fontSize: 11, color: T.muted, fontFamily: T.mono }}>{agent.volume}</span>
          </div>
          <h2 style={{ fontFamily: T.serif, fontSize: 28, color: T.text, margin: "0 0 8px", letterSpacing: "-0.025em" }}>{agent.name} Agent</h2>
          <p style={{ fontSize: 13, color: T.sub, margin: 0, lineHeight: 1.6, maxWidth: 560 }}>{agent.description}</p>
        </div>
        <div style={{ flexShrink: 0 }}>
          {agent.status === "active" && (
            <button onClick={() => setShowModal(true)} style={{
              fontSize: 12, background: "#D97706", color: "#fff",
              border: "none", borderRadius: 6, boxShadow: "0 3px 10px rgba(217,119,6,0.30)",
              padding: "9px 18px", cursor: "pointer", fontWeight: 600, fontFamily: T.sans,
            }}>Set Manual Override</button>
          )}
          {agent.status === "manual" && (
            <button onClick={() => onOverride(agent.id, "active")} style={{
              fontSize: 12, background: T.green, color: "#fff",
              border: "none", borderRadius: 6, boxShadow: T.shadowGreen,
              padding: "9px 18px", cursor: "pointer", fontWeight: 600, fontFamily: T.sans,
            }}>Re-activate Agent</button>
          )}
        </div>
      </div>

      {/* Traversal path */}
      <div style={{
        background: T.card, border: `1px solid ${T.border}`,
        borderRadius: 8, boxShadow: T.shadowSm, padding: "16px 20px", marginBottom: 14,
      }}>
        <SH label="IW traversal path" />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4 }}>
          {agent.traversal.map((id, i) => {
            const node = IW_NODES.find(n => n.id === id);
            const col = DC[node?.domain] || "#6B7280";
            return (
              <span key={id} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span style={{
                  fontSize: 11, fontFamily: T.mono, padding: "4px 10px", borderRadius: 5,
                  background: `${col}18`, color: col, border: `1px solid ${col}35`, fontWeight: 600,
                }}>{id}</span>
                {i < agent.traversal.length - 1 && (
                  <span style={{ color: T.muted, fontSize: 11 }}>→</span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 14, alignItems: "start" }}>
        {/* Capabilities */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, boxShadow: T.shadowSm, padding: "16px 20px" }}>
          <SH label="What this agent does" />
          {agent.capabilities.map((cap, i) => (
            <div key={i} style={{
              marginBottom: 16, paddingBottom: 16,
              borderBottom: i < agent.capabilities.length - 1 ? `1px solid ${T.borderLight}` : "none",
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: T.green, fontSize: 13, flexShrink: 0, marginTop: 1 }}>→</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 5 }}>{cap.action}</div>
                  <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.55, marginBottom: 8 }}>{cap.description}</div>

                  {/* SOR rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {cap.reads.length > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                          color: T.muted, fontFamily: T.mono, minWidth: 36,
                        }}>reads</span>
                        {cap.reads.map(s => <SORPill key={s} name={s} type="read" />)}
                      </div>
                    )}
                    {cap.writes.length > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                          color: T.muted, fontFamily: T.mono, minWidth: 36,
                        }}>writes</span>
                        {cap.writes.map(s => <SORPill key={s} name={s} type="write" />)}
                      </div>
                    )}
                  </div>

                  {/* IW node pills */}
                  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap" }}>
                    {cap.nodes.map(n => {
                      const node = IW_NODES.find(iw => iw.id === n);
                      return <NodePill key={n} id={n} color={DC[node?.domain]} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent actions */}
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, boxShadow: T.shadowSm, padding: "16px 20px" }}>
          <SH label="Recent actions" />
          {agent.recentActions.map((a, i) => (
            <div key={i} style={{
              marginBottom: 12, paddingBottom: 12,
              borderBottom: i < agent.recentActions.length - 1 ? `1px solid ${T.borderLight}` : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 12.5, fontWeight: 500, color: T.text, lineHeight: 1.4 }}>{a.text}</span>
                <span style={{ fontSize: 10, color: T.muted, fontFamily: T.mono, flexShrink: 0, marginLeft: 8 }}>{a.time}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11.5, color: T.sub }}>{a.detail}</span>
              </div>
              <div style={{ marginTop: 4, display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{
                  fontSize: 10, fontFamily: T.mono, padding: "2px 6px", borderRadius: 3,
                  background: "#F0F9FF", color: "#0369A1", border: "1px solid #BAE6FD",
                }}>{a.ch}</span>
                <ConfDot conf={a.conf} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && <OverrideModal agent={agent} onConfirm={handleConfirm} onCancel={() => setShowModal(false)} />}
    </div>
  );
}

function AgentsPage({ agents, setAgents, setQueue, setPage }) {
  const [selected, setSelected] = useState(null);

  function handleOverride(id, mode) {
    setAgents(prev => prev.map(a => a.id !== id ? a : { ...a, status: mode }));
    if (mode === "manual") {
      const agent = agents.find(a => a.id === id);
      if (agent?.pendingItems?.length) {
        setQueue(q => {
          const existing = new Set(q.map(i => i.id));
          const newItems = agent.pendingItems
            .filter(pi => !existing.has(pi.id))
            .map(pi => ({ ...pi, agentId: id, agentName: agent.name }));
          return [...q, ...newItems];
        });
      }
      setPage("queue");
    }
  }

  if (selected) {
    const live = agents.find(a => a.id === selected.id) || selected;
    return (
      <div style={{ padding: "36px 40px", maxWidth: 980 }}>
        <AgentDetail agent={live} onBack={() => setSelected(null)} onOverride={handleOverride} />
      </div>
    );
  }

  return (
    <div style={{ padding: "36px 40px", maxWidth: 820 }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: T.serif, fontSize: 26, color: T.text, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Agents</h2>
        <p style={{ fontSize: 13, color: T.sub, margin: 0 }}>
          Click any agent to view its capabilities, system interactions, and IW traversal path.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {agents.map(a => (
          <div key={a.id}
            onClick={() => setSelected(a)}
            style={{
              background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, boxShadow: T.shadowSm,
              padding: "16px 20px", cursor: "pointer", transition: "box-shadow 0.14s, border-color 0.14s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C5BFB5"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.11)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = T.shadowSm; e.currentTarget.style.transform = "none"; }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                  <Badge status={a.status} />
                  {a.status === "manual" && a.pendingItems?.length > 0 && (
                    <span style={{ fontSize: 10, fontFamily: T.mono, color: T.amber, fontWeight: 600 }}>
                      {a.pendingItems.length} in queue
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: T.text, margin: "0 0 6px", fontFamily: T.sans, letterSpacing: "-0.01em" }}>
                  {a.name} Agent
                </h3>
                <p style={{ fontSize: 12, color: T.sub, margin: 0, lineHeight: 1.55 }}>{a.description}</p>
              </div>
              <span style={{ fontSize: 18, color: T.muted, marginTop: 2, flexShrink: 0 }}>›</span>
            </div>
            <div style={{
              marginTop: 12, display: "flex", gap: 18,
              borderTop: `1px solid ${T.borderLight}`, paddingTop: 10,
            }}>
              <span style={{ fontSize: 10, fontFamily: T.mono, color: T.muted }}>{a.volume}</span>
              <span style={{ fontSize: 10, fontFamily: T.mono, color: T.muted }}>Last: {a.lastAction}</span>
              <span style={{ fontSize: 10, fontFamily: T.mono, color: T.muted, marginLeft: "auto" }}>
                {a.traversal.length} nodes
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════
// PART 4 — IW EDITOR (D3 graph + fully editable node panel)
// ═══════════════════════════════════════════════════════════════════════════

function getNodeColor(d) {
  if (d.layer === "decision") return DC.decision;
  if (d.layer === "metric")   return DC.metric;
  return DC[d.domain] || "#6B7280";
}

function IWGraph({ nodes, links, selectedId, onSelect }) {
  const svgRef = useRef(null);
  const simRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const el = svgRef.current;
    const W = el.clientWidth || 640;
    const H = el.clientHeight || 520;

    const svg = d3.select(el);
    svg.selectAll("*").remove();

    // Deep-copy so D3 can mutate freely
    const nc = nodes.map(d => ({ ...d }));
    const lc = links.map(d => ({ source: d.source, target: d.target, rel: d.rel }));

    const g = svg.append("g");

    // Zoom
    const zoom = d3.zoom().scaleExtent([0.18, 4])
      .on("zoom", e => g.attr("transform", e.transform));
    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(W / 2, H / 2).scale(0.45));

    // Arrow marker
    svg.append("defs").selectAll("marker").data(["arr"]).enter().append("marker")
      .attr("id", "arr").attr("viewBox", "0 0 10 6").attr("refX", 10).attr("refY", 3)
      .attr("markerWidth", 7).attr("markerHeight", 5).attr("orient", "auto")
      .append("path").attr("d", "M0,0L10,3L0,6").attr("fill", "#C9C4BC");

    // Simulation
    const sim = d3.forceSimulation(nc)
      .force("link", d3.forceLink(lc).id(d => d.id).distance(140).strength(0.32))
      .force("charge", d3.forceManyBody().strength(-520))
      .force("center", d3.forceCenter(0, 0))
      .force("collision", d3.forceCollide().radius(d => (d.size || 16) + 16));
    simRef.current = sim;

    // Edges
    const edgeG = g.append("g");
    const link = edgeG.selectAll("line").data(lc).enter().append("line")
      .attr("stroke", "#D8D3CC").attr("stroke-width", 1.1)
      .attr("marker-end", "url(#arr)");

    const edgeLbl = edgeG.selectAll("text").data(lc).enter().append("text")
      .text(d => d.rel).attr("font-size", 7).attr("fill", "#C0BAB2")
      .attr("font-family", "'IBM Plex Mono', monospace")
      .attr("text-anchor", "middle").attr("pointer-events", "none");

    // Nodes
    const nodeG = g.append("g").selectAll("g").data(nc).enter().append("g")
      .style("cursor", "pointer")
      .call(
        d3.drag()
          .on("start", (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
          .on("drag",  (e, d) => { d.fx = e.x; d.fy = e.y; })
          .on("end",   (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    // Draw shapes per layer
    nodeG.each(function(d) {
      const el2 = d3.select(this);
      const color = getNodeColor(d);
      const r = d.size || 16;
      const isSel = d.id === selectedId;
      const isNew = d.nodeStatus === "new";
      const glow = isSel ? `drop-shadow(0 0 9px ${color}90)` : null;

      if (d.layer === "ontology") {
        el2.append("circle")
          .attr("r", r).attr("fill", color).attr("stroke", "#fff")
          .attr("stroke-width", isSel ? 3 : 2).attr("opacity", 0.9)
          .attr("stroke-dasharray", isNew ? "4,3" : null)
          .style("filter", glow);
      } else if (d.layer === "metric") {
        const s = r * 1.35;
        el2.append("rect")
          .attr("x", -s).attr("y", -s).attr("width", s * 2).attr("height", s * 2)
          .attr("transform", "rotate(45)")
          .attr("fill", color).attr("stroke", "#fff")
          .attr("stroke-width", isSel ? 3 : 2).attr("opacity", 0.9)
          .attr("stroke-dasharray", isNew ? "4,3" : null)
          .style("filter", glow);
      } else {
        // Decision triangle
        const s = r * 1.45;
        el2.append("polygon")
          .attr("points", `0,${-s} ${s * 0.87},${s * 0.5} ${-s * 0.87},${s * 0.5}`)
          .attr("fill", color).attr("stroke", "#fff")
          .attr("stroke-width", isSel ? 3 : 2).attr("opacity", 0.9)
          .style("filter", glow);
      }

      // "New" badge
      if (isNew) {
        el2.append("circle").attr("cx", r * 0.9).attr("cy", -r * 0.9).attr("r", 6).attr("fill", "#F59E0B");
        el2.append("text")
          .attr("x", r * 0.9).attr("y", -r * 0.9)
          .attr("text-anchor", "middle").attr("dominant-baseline", "middle")
          .attr("font-size", 7).attr("fill", "white").attr("font-weight", 700)
          .style("pointer-events", "none").text("N");
      }

      // Label below node
      const label = d.label.replace(/\n/g, " ");
      const words = label.split(" ");
      const lines = [];
      let cur = "";
      words.forEach(w => {
        const test = cur ? cur + " " + w : w;
        if (test.length <= 14) { cur = test; } else { lines.push(cur); cur = w; }
      });
      if (cur) lines.push(cur);

      const textEl = el2.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", 9).attr("font-weight", 600)
        .attr("fill", "#333").attr("font-family", "'IBM Plex Sans', sans-serif")
        .style("pointer-events", "none");

      const yStart = r + (d.layer === "metric" ? r * 1.35 : 0) + 10;
      lines.forEach((line, i) => {
        textEl.append("tspan").text(line).attr("x", 0).attr("dy", i === 0 ? yStart : 11);
      });
    });

    // Hover highlight
    nodeG
      .on("mouseenter", (e, d) => {
        const connected = new Set([d.id]);
        lc.forEach(l => {
          const s = l.source?.id || l.source, t = l.target?.id || l.target;
          if (s === d.id) connected.add(t);
          if (t === d.id) connected.add(s);
        });
        nodeG.attr("opacity", nd => connected.has(nd.id) ? 1 : 0.1);
        link
          .attr("stroke", le => {
            const s = le.source?.id || le.source, t = le.target?.id || le.target;
            return (s === d.id || t === d.id) ? getNodeColor(d) : "#eee";
          })
          .attr("stroke-width", le => {
            const s = le.source?.id || le.source, t = le.target?.id || le.target;
            return (s === d.id || t === d.id) ? 2 : 0.4;
          });
        edgeLbl.attr("opacity", le => {
          const s = le.source?.id || le.source, t = le.target?.id || le.target;
          return (s === d.id || t === d.id) ? 0.9 : 0;
        });
      })
      .on("mouseleave", () => {
        nodeG.attr("opacity", 1);
        link.attr("stroke", "#D8D3CC").attr("stroke-width", 1.1);
        edgeLbl.attr("opacity", 0);
      })
      .on("click", (e, d) => { e.stopPropagation(); onSelect(d.id === selectedId ? null : d.id); });

    svg.on("click", () => onSelect(null));

    // Tick
    sim.on("tick", () => {
      link
        .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      edgeLbl
        .attr("x", d => (d.source.x + d.target.x) / 2)
        .attr("y", d => (d.source.y + d.target.y) / 2 - 3);
      nodeG.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    return () => sim.stop();
  }, [nodes, links, selectedId]);

  return (
    <svg ref={svgRef} style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #F2EEE8 0%, #EBE5DC 100%)" }} />
  );
}

// ─── Node Edit Panel ──────────────────────────────────────────────────────────
function NodePanel({ node, onClose, onSave, onDelete }) {
  const [form, setForm] = useState(() => ({
    ...node,
    dataMapping: node.dataMapping ? { ...node.dataMapping } : undefined,
  }));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const set = k => v => setForm(f => ({ ...f, [k]: v }));
  const setDM = k => v => setForm(f => ({
    ...f,
    dataMapping: { ...f.dataMapping, [k]: v },
  }));

  const col = getNodeColor(node);
  const layerLabel = { ontology: "Entity", metric: "Metric", decision: "Decision" }[node.layer];

  function handleSave() {
    setSaving(true);
  }

  function handleMorrieDone() {
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); onSave(form); }, 600);
  }

  // Field component
  function Field({ label, value, onChange, mono, rows, placeholder }) {
    return (
      <div style={{ marginBottom: 13 }}>
        <SH label={label} />
        {rows ? (
          <textarea
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            style={{
              width: "100%", boxSizing: "border-box",
              border: `1px solid ${T.border}`, borderRadius: 4,
              padding: "6px 10px", fontSize: 11.5, lineHeight: 1.55,
              fontFamily: mono ? T.mono : T.sans, resize: "vertical",
              background: "white", color: T.text,
            }}
          />
        ) : (
          <input
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
              width: "100%", boxSizing: "border-box",
              border: `1px solid ${T.border}`, borderRadius: 4,
              padding: "6px 10px", fontSize: 11.5,
              fontFamily: mono ? T.mono : T.sans,
              background: "white", color: T.text,
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{
      width: 390, background: T.card, borderLeft: `1px solid ${T.border}`, boxShadow: "-4px 0 20px rgba(0,0,0,0.08)",
      display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0,
    }}>
      {/* Panel header */}
      <div style={{
        padding: "14px 18px", borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ display: "flex", gap: 5, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5,
              color: col, background: `${col}16`, padding: "2px 7px", borderRadius: 3,
            }}>{layerLabel}</span>
            <span style={{
              fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5,
              color: DC[node.domain] || "#6B7280",
              background: `${DC[node.domain] || "#6B7280"}14`,
              padding: "2px 7px", borderRadius: 3,
            }}>{DL[node.domain] || node.domain}</span>
            {node.nodeStatus === "new" && (
              <span style={{
                fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5,
                color: "#92400E", background: "#FEF3C7", padding: "2px 7px", borderRadius: 3,
              }}>New</span>
            )}
          </div>
          <h3 style={{ fontFamily: T.serif, fontSize: 17, color: T.text, margin: 0 }}>
            {node.label.replace(/\n/g, " ")}
          </h3>
        </div>
        <button onClick={onClose} style={{
          background: "none", border: "none", fontSize: 20,
          color: T.muted, cursor: "pointer", padding: "0 0 0 8px", flexShrink: 0,
        }}>×</button>
      </div>

      {/* Scrollable fields */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px" }}>

        <Field label="Definition" value={form.definition} onChange={set("definition")} rows={3} />
        <Field label="Grain" value={form.grain} onChange={set("grain")} />

        {/* Ontology: attributes list */}
        {node.layer === "ontology" && form.attributes && (
          <Field
            label="Attributes (comma-separated)"
            value={form.attributes?.join(", ")}
            onChange={v => setForm(f => ({ ...f, attributes: v.split(",").map(a => a.trim()) }))}
          />
        )}

        {/* Metric: formula + window */}
        {node.layer === "metric" && <>
          <Field label="Formula" value={form.formula} onChange={set("formula")} rows={3} mono />
          <Field label="Calculation Window" value={form.window} onChange={set("window")} />
        </>}

        {/* Decision: trigger / conditions / actions / authority / constraints */}
        {node.layer === "decision" && <>
          <Field label="Trigger Condition" value={form.trigger} onChange={set("trigger")} rows={2} />
          <Field label="Evaluation Logic" value={form.conditions} onChange={set("conditions")} rows={3} />
          <Field
            label="Actions (one per line)"
            value={Array.isArray(form.actions) ? form.actions.join("\n") : form.actions}
            onChange={v => setForm(f => ({ ...f, actions: v.split("\n").map(a => a.trim()).filter(Boolean) }))}
            rows={4}
          />
          <Field label="Authority" value={form.authority} onChange={set("authority")} />
          <Field label="Constraints" value={form.constraints} onChange={set("constraints")} rows={2} />
        </>}

        {/* Data mapping — shown for all ontology nodes, fully editable */}
        {node.layer === "ontology" && (
          <div style={{
            marginTop: 6, padding: "12px 14px", background: T.bg,
            border: `1px solid ${T.border}`, borderRadius: 6,
          }}>
            <SH label="Data mapping" style={{ marginBottom: 10 }} />
            <Field
              label="Source table"
              value={form.dataMapping?.table}
              onChange={setDM("table")}
              mono
            />
            <Field
              label="Primary key"
              value={form.dataMapping?.pk}
              onChange={setDM("pk")}
              mono
              placeholder="e.g. lead_id"
            />
            <Field
              label="Base query"
              value={form.dataMapping?.query}
              onChange={setDM("query")}
              mono
              rows={5}
              placeholder="SELECT ... FROM ..."
            />
          </div>
        )}

        {/* Morrie validator or saved state */}
        {saving && <MorrieLoader onDone={handleMorrieDone} />}
        {saved && (
          <div style={{
            marginTop: 10, padding: "10px 14px", background: T.greenPale,
            border: `1px solid ${T.green}30`, borderRadius: 5,
            fontSize: 12, color: T.green, fontWeight: 600,
          }}>✓ Saved to Intelligence Warehouse</div>
        )}
      </div>

      {/* Footer actions */}
      {!saving && !saved && (
        <div style={{
          padding: "12px 18px", borderTop: `1px solid ${T.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          {!confirmDelete ? (
            <button onClick={() => setConfirmDelete(true)} style={{
              fontSize: 11, background: "none", color: T.muted,
              border: "none", cursor: "pointer", fontFamily: T.sans,
              textDecoration: "underline",
            }}>Delete node</button>
          ) : (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: T.red }}>Delete this node?</span>
              <button onClick={() => onDelete(node.id)} style={{
                fontSize: 11, background: T.redBg, color: T.red,
                border: `1px solid ${T.redBorder}30`, borderRadius: 4,
                padding: "4px 10px", cursor: "pointer",
              }}>Confirm</button>
              <button onClick={() => setConfirmDelete(false)} style={{
                fontSize: 11, background: "none", color: T.muted,
                border: "none", cursor: "pointer",
              }}>Cancel</button>
            </div>
          )}
          <button onClick={handleSave} style={{
            fontSize: 12, background: T.green, color: "white",
            border: "none", borderRadius: 6, padding: "9px 20px",
            boxShadow: T.shadowGreen,
            cursor: "pointer", fontWeight: 600, fontFamily: T.sans,
          }}>Save changes</button>
        </div>
      )}
    </div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────
function IWLegend({ nodes }) {
  const counts = {
    ontology: nodes.filter(n => n.layer === "ontology").length,
    metric: nodes.filter(n => n.layer === "metric").length,
    decision: nodes.filter(n => n.layer === "decision").length,
    newNodes: nodes.filter(n => n.nodeStatus === "new").length,
  };
  return (
    <div style={{
      display: "flex", gap: 16, alignItems: "center",
      padding: "10px 16px", background: "#FDFAF7",
      borderBottom: `1px solid ${T.border}`, fontSize: 11,
    }}>
      {[
        { shape: "circle", col: DC.customer_lead,  label: `${counts.ontology} Entities` },
        { shape: "diamond", col: DC.metric,         label: `${counts.metric} Metrics`   },
        { shape: "triangle", col: DC.decision,      label: `${counts.decision} Decisions` },
      ].map(({ shape, col, label }) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width={14} height={14}>
            {shape === "circle" && <circle cx={7} cy={7} r={5} fill={col} opacity={0.9} />}
            {shape === "diamond" && <rect x={3} y={3} width={8} height={8} transform="rotate(45 7 7)" fill={col} opacity={0.9} />}
            {shape === "triangle" && <polygon points="7,2 12,12 2,12" fill={col} opacity={0.9} />}
          </svg>
          <span style={{ color: T.sub, fontFamily: T.mono }}>{label}</span>
        </div>
      ))}
      {counts.newNodes > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 4 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, background: "#FEF3C7",
            color: "#92400E", padding: "1px 6px", borderRadius: 3, fontFamily: T.mono,
          }}>N</span>
          <span style={{ color: T.sub, fontFamily: T.mono }}>{counts.newNodes} New</span>
        </div>
      )}
      <span style={{ color: T.muted, fontSize: 10, fontFamily: T.mono, marginLeft: "auto" }}>
        Drag to move · Scroll to zoom · Click to edit
      </span>
    </div>
  );
}

// ─── IW Editor page ───────────────────────────────────────────────────────────
function IWEditorPage() {
  const [nodes, setNodes] = useState(IW_NODES);
  const [selectedId, setSelectedId] = useState(null);

  const selectedNode = nodes.find(n => n.id === selectedId) || null;

  function handleSave(updated) {
    setNodes(prev => prev.map(n => n.id === updated.id ? { ...n, ...updated } : n));
    setSelectedId(null);
  }

  function handleDelete(id) {
    setNodes(prev => prev.filter(n => n.id !== id));
    setSelectedId(null);
  }

  const edges = IW_EDGES.filter(e =>
    nodes.find(n => n.id === e.source) && nodes.find(n => n.id === e.target)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{
        padding: "16px 22px", borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", gap: 12, background: T.card, boxShadow: T.shadowSm,
      }}>
        <div>
          <h2 style={{ fontFamily: T.serif, fontSize: 20, color: T.text, margin: "0 0 3px", letterSpacing: "-0.02em" }}>
            Intelligence Warehouse Graph
          </h2>
          <p style={{ fontSize: 11.5, color: T.muted, margin: 0, fontFamily: T.mono }}>
            Max Life LAMS · {nodes.length} nodes · {edges.length} edges
          </p>
        </div>
      </div>

      <IWLegend nodes={nodes} />

      {/* Canvas + optional panel */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <IWGraph
            nodes={nodes}
            links={edges}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        {selectedNode && (
          <NodePanel
            key={selectedNode.id}
            node={selectedNode}
            onClose={() => setSelectedId(null)}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
// ═══════════════════════════════════════════════════════════════════════════
// PART 5 — CONFIG, AUDIT, APP SHELL
// ═══════════════════════════════════════════════════════════════════════════

// ─── Config Page ─────────────────────────────────────────────────────────────
function ConfigPage() {
  const [thresholds, setThresholds] = useState(THRESHOLDS_INIT);
  const [changeLog, setChangeLog] = useState(CHANGE_LOG_INIT);
  const [editing, setEditing] = useState(null); // threshold id being edited
  const [editVal, setEditVal] = useState("");

  function startEdit(t) { setEditing(t.id); setEditVal(t.value); }
  function cancelEdit() { setEditing(null); setEditVal(""); }

  function saveEdit(t) {
    const from = t.value;
    setThresholds(prev => prev.map(th => th.id === t.id ? { ...th, value: editVal } : th));
    setChangeLog(prev => [{
      threshold: t.name,
      from,
      to: editVal,
      unit: t.unit,
      user: "You",
      date: "Today",
      note: "",
    }, ...prev]);
    setEditing(null);
  }

  // Group by category
  const cats = [...new Set(thresholds.map(t => t.cat))];

  return (
    <div style={{ padding: "36px 40px", maxWidth: 900 }}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: T.serif, fontSize: 26, color: T.text, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Configuration</h2>
        <p style={{ fontSize: 13, color: T.sub, margin: 0, lineHeight: 1.6 }}>
          Business rules and thresholds that govern agent behaviour. Each parameter is tagged to the IW node it controls. Changes are logged with full audit trail.
        </p>
      </div>

      {/* Data sources */}
      <div style={{ marginBottom: 30 }}>
        <SH label="Data Sources" style={{ marginBottom: 12 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
          {DATA_SOURCES.map(src => (
            <div key={src.id} style={{
              background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, boxShadow: T.shadowSm,
              padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{src.name}</span>
                <Badge status={src.health} />
              </div>
              <p style={{ fontSize: 11.5, color: T.sub, margin: 0, lineHeight: 1.5 }}>{src.desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 2 }}>
                <span style={{
                  fontSize: 10, fontFamily: T.mono, padding: "2px 6px", borderRadius: 3,
                  background: T.bg, border: `1px solid ${T.border}`, color: T.muted,
                }}>{src.type}</span>
                <span style={{ fontSize: 10, fontFamily: T.mono, color: T.muted }}>
                  {src.records}
                </span>
              </div>
              <div style={{ fontSize: 10, fontFamily: T.mono, color: T.muted, marginTop: 2 }}>
                Last sync: {src.sync}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thresholds by category */}
      <SH label="Agent thresholds & rules" style={{ marginBottom: 12 }} />
      {cats.map(cat => (
        <div key={cat} style={{ marginBottom: 24 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: 1.5, color: T.green, marginBottom: 8,
          }}>{cat}</div>
          <div style={{
            background: T.card, border: `1px solid ${T.border}`,
            borderRadius: 8, overflow: "hidden",
          }}>
            {thresholds.filter(t => t.cat === cat).map((t, i, arr) => {
              const isEditing = editing === t.id;
              const node = IW_NODES.find(n => n.id === t.node);
              const nodeCol = node?.layer === "decision" ? DC.decision : node?.layer === "metric" ? DC.metric : DC[node?.domain] || "#6B7280";
              return (
                <div key={t.id} style={{
                  padding: "13px 18px",
                  borderBottom: i < arr.length - 1 ? `1px solid ${T.borderLight}` : "none",
                  display: "flex", alignItems: "center", gap: 16,
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{t.name}</span>
                      {/* IW node tag */}
                      <span style={{
                        fontSize: 9.5, fontFamily: T.mono, padding: "2px 7px",
                        borderRadius: 3, background: `${nodeCol}14`,
                        color: nodeCol, border: `1px solid ${nodeCol}25`,
                      }}>{t.node}</span>
                    </div>
                    <p style={{ fontSize: 11.5, color: T.muted, margin: 0 }}>{t.desc}</p>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: "right" }}>
                    {isEditing ? (
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <input
                          autoFocus
                          value={editVal}
                          onChange={e => setEditVal(e.target.value)}
                          style={{
                            width: 72, border: `1px solid ${T.green}`, borderRadius: 4,
                            padding: "5px 8px", fontSize: 13, fontFamily: T.mono,
                            fontWeight: 600, textAlign: "right",
                          }}
                        />
                        <span style={{ fontSize: 11, color: T.muted }}>{t.unit}</span>
                        <button onClick={() => saveEdit(t)} style={{
                          fontSize: 11, background: T.green, color: "#fff",
                          border: "none", borderRadius: 4, boxShadow: T.shadowGreen,
                          padding: "5px 12px", cursor: "pointer", fontWeight: 600,
                        }}>Save</button>
                        <button onClick={cancelEdit} style={{
                          fontSize: 11, background: "none", color: T.muted,
                          border: `1px solid ${T.border}`, borderRadius: 4,
                          padding: "5px 8px", cursor: "pointer",
                        }}>✕</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 16, fontWeight: 700, fontFamily: T.mono, color: T.text }}>{t.value}</span>
                        <span style={{ fontSize: 11, color: T.muted }}>{t.unit}</span>
                        <button onClick={() => startEdit(t)} style={{
                          fontSize: 11, background: "none", color: T.muted,
                          border: `1px solid ${T.border}`, borderRadius: 4,
                          padding: "4px 10px", cursor: "pointer",
                        }}>Edit</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Change log */}
      <div style={{ marginTop: 8 }}>
        <SH label="Change log" style={{ marginBottom: 10 }} />
        <div style={{
          background: T.card, border: `1px solid ${T.border}`,
          borderRadius: 8, overflow: "hidden",
        }}>
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1.2fr",
            padding: "9px 16px", borderBottom: `1px solid ${T.border}`,
            background: T.bg,
          }}>
            {["Parameter", "Change", "Changed by", "Date"].map(h => (
              <span key={h} style={{ fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: T.muted, fontFamily: T.mono }}>{h}</span>
            ))}
          </div>
          {changeLog.map((entry, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 1.2fr",
              padding: "10px 16px",
              borderBottom: i < changeLog.length - 1 ? `1px solid ${T.borderLight}` : "none",
              alignItems: "center",
            }}>
              <div>
                <span style={{ fontSize: 12.5, color: T.text, fontWeight: 500 }}>{entry.threshold}</span>
                {entry.note && <p style={{ fontSize: 11, color: T.muted, margin: "2px 0 0" }}>{entry.note}</p>}
              </div>
              <span style={{ fontSize: 12, fontFamily: T.mono, color: T.sub }}>
                <span style={{ color: T.redBorder }}>{entry.from}</span>
                <span style={{ color: T.muted }}> → </span>
                <span style={{ color: T.greenMid }}>{entry.to}</span>
                <span style={{ color: T.muted }}> {entry.unit}</span>
              </span>
              <span style={{ fontSize: 12, color: T.sub }}>{entry.user}</span>
              <span style={{ fontSize: 11, fontFamily: T.mono, color: T.muted }}>{entry.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Decision Trail Panel ─────────────────────────────────────────────────────
function TrailPanel({ entry, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15,15,15,0.50)",
      display: "flex", justifyContent: "flex-end", zIndex: 200,
    }} onClick={onClose}>
      <div style={{
        width: 560, background: T.card, borderLeft: `1px solid ${T.border}`, boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
        display: "flex", flexDirection: "column", height: "100%",
        overflow: "hidden",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: "20px 24px", borderBottom: `1px solid ${T.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        }}>
          <div>
            <SH label="Decision Trail" />
            <h3 style={{ fontFamily: T.serif, fontSize: 18, color: T.text, margin: "0 0 4px" }}>
              {entry.decision} · {entry.ref}
            </h3>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: T.sub, fontFamily: T.mono }}>{entry.agent}</span>
              <ConfDot conf={entry.conf} />
              <span style={{ fontSize: 10, fontFamily: T.mono, color: T.muted }}>{entry.time}</span>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 20, color: T.muted, cursor: "pointer",
          }}>×</button>
        </div>

        {/* Trail */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>
          {entry.trail.map((step, i) => {
            const isLast = i === entry.trail.length - 1;
            return (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                {/* Timeline spine */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: isLast ? T.greenPale : T.bg,
                    border: `2px solid ${isLast ? T.green : T.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, color: isLast ? T.green : T.muted, fontWeight: 600,
                  }}>{step.icon}</div>
                  {!isLast && (
                    <div style={{ width: 1, flex: 1, minHeight: 24, background: T.borderLight, marginTop: 4 }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: 4 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, fontFamily: T.mono, color: T.muted }}>{step.t}</span>
                    <span style={{
                      fontSize: 10, fontFamily: T.mono, padding: "1px 6px", borderRadius: 3,
                      background: T.bg, border: `1px solid ${T.border}`, color: T.sub,
                    }}>{step.agent}</span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: T.text, margin: "0 0 5px", lineHeight: 1.4 }}>
                    {step.action}
                  </p>
                  <p style={{ fontSize: 12, color: T.sub, margin: "0 0 8px", lineHeight: 1.6, fontStyle: "italic" }}>
                    {step.thinking}
                  </p>

                  {/* Source + query */}
                  {step.source && step.source !== "SYNTHESIS" && (
                    <div style={{
                      background: "#F7F5F1", border: `1px solid ${T.border}`,
                      borderRadius: 4, overflow: "hidden",
                    }}>
                      <div style={{
                        padding: "4px 10px", background: T.borderLight,
                        fontSize: 10, fontFamily: T.mono, color: T.muted,
                        borderBottom: `1px solid ${T.border}`,
                      }}>{step.source}</div>
                      {step.query && (
                        <div style={{
                          padding: "6px 10px", fontSize: 10.5, fontFamily: T.mono,
                          color: T.green, lineHeight: 1.6,
                        }}>{step.query}</div>
                      )}
                      <div style={{
                        padding: "6px 10px", fontSize: 11.5,
                        color: T.sub, lineHeight: 1.5,
                        borderTop: `1px solid ${T.borderLight}`,
                      }}>{step.result}</div>
                    </div>
                  )}

                  {/* Synthesis result */}
                  {step.source === "SYNTHESIS" && (
                    <div style={{
                      padding: "8px 12px", background: T.greenPale,
                      border: `1px solid ${T.green}25`, borderRadius: 4,
                      fontSize: 12, color: T.green, lineHeight: 1.5,
                    }}>{step.result}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Audit Page ───────────────────────────────────────────────────────────────
function AuditPage() {
  const [alerts, setAlerts] = useState(ALERTS_DATA);
  const [agentFilter, setAgentFilter] = useState("All");
  const [selectedTrail, setSelectedTrail] = useState(null);

  const agentNames = ["All", ...new Set(DECISION_LOG.map(d => d.agent))];
  const filtered = agentFilter === "All"
    ? DECISION_LOG
    : DECISION_LOG.filter(d => d.agent === agentFilter);

  const sevCfg = {
    high:   { bg: T.redBg,   color: T.redBorder,  label: "High"   },
    medium: { bg: T.amberBg, color: T.amberBorder, label: "Medium" },
    low:    { bg: T.bg,      color: T.muted,       label: "Low"    },
  };

  return (
    <div style={{ padding: "36px 40px", maxWidth: 960 }}>
      {/* Alerts */}
      <div style={{ marginBottom: 30 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <h2 style={{ fontFamily: T.serif, fontSize: 26, color: T.text, margin: 0, letterSpacing: "-0.02em" }}>Alerts</h2>
          {alerts.length > 0 && (
            <span style={{ fontSize: 11, fontFamily: T.mono, color: T.muted }}>{alerts.length} active</span>
          )}
        </div>
        {alerts.length === 0 ? (
          <div style={{
            background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, boxShadow: T.shadowSm,
            padding: "28px 24px", textAlign: "center", color: T.muted, fontSize: 13,
          }}>✓ No active alerts</div>
        ) : (
          alerts.map(alert => {
            const sev = sevCfg[alert.sev];
            return (
              <div key={alert.id} style={{
                background: T.card, border: `1px solid ${T.border}`,
                borderLeft: `4px solid ${sev.color}`, borderRadius: 9, boxShadow: T.shadowSm,
                padding: "14px 18px", marginBottom: 10,
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
                      background: sev.bg, color: sev.color, padding: "2px 7px",
                      borderRadius: 3, fontFamily: T.mono,
                    }}>{sev.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{alert.title}</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: T.sub, margin: "0 0 6px", lineHeight: 1.55 }}>{alert.detail}</p>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 10, fontFamily: T.mono, color: T.muted }}>via {alert.agent}</span>
                    <span style={{ fontSize: 10, fontFamily: T.mono, color: T.muted }}>· {alert.time}</span>
                  </div>
                </div>
                <button onClick={() => setAlerts(a => a.filter(x => x.id !== alert.id))} style={{
                  fontSize: 11, background: "none", color: T.muted,
                  border: `1px solid ${T.border}`, borderRadius: 5,
                  padding: "6px 12px", cursor: "pointer", flexShrink: 0,
                }}>Dismiss</button>
              </div>
            );
          })
        )}
      </div>

      {/* Decision log */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
          <h2 style={{ fontFamily: T.serif, fontSize: 26, color: T.text, margin: 0, letterSpacing: "-0.02em" }}>Decision Log</h2>
          <div style={{ display: "flex", gap: 6 }}>
            {agentNames.map(n => (
              <button key={n} onClick={() => setAgentFilter(n)} style={{
                fontSize: 10.5, padding: "4px 10px", borderRadius: 5,
                cursor: "pointer", fontFamily: T.mono,
                border: `1px solid ${agentFilter === n ? T.green : T.border}`,
                background: agentFilter === n ? T.green : "transparent",
                color: agentFilter === n ? "#fff" : T.sub,
              }}>{n}</button>
            ))}
          </div>
        </div>

        <div style={{
          background: T.card, border: `1px solid ${T.border}`,
          borderRadius: 8, overflow: "hidden",
        }}>
          {/* Table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "90px 1fr 1.8fr 80px 80px 64px",
            padding: "9px 18px", background: T.bg, borderBottom: `1px solid ${T.border}`,
            gap: 12,
          }}>
            {["ID", "Agent · Decision", "Summary", "Channel", "Time", "Conf"].map(h => (
              <span key={h} style={{
                fontSize: 9.5, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 1.2, color: T.muted, fontFamily: T.mono,
              }}>{h}</span>
            ))}
          </div>

          {filtered.map((d, i) => (
            <div key={d.id}
              onClick={() => setSelectedTrail(d)}
              style={{
                display: "grid", gridTemplateColumns: "90px 1fr 1.8fr 80px 80px 64px",
                padding: "12px 18px",
                borderBottom: i < filtered.length - 1 ? `1px solid ${T.borderLight}` : "none",
                gap: 12, cursor: "pointer", alignItems: "center",
                transition: "background 0.1s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F8F5F0'}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ fontSize: 11, fontFamily: T.mono, color: T.muted }}>{d.id}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{d.agent}</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{d.decision}</div>
              </div>
              <span style={{ fontSize: 12, color: T.sub, lineHeight: 1.4 }}>{d.summary}</span>
              <span style={{
                fontSize: 10, fontFamily: T.mono, padding: "2px 6px", borderRadius: 3,
                background: "#F0F9FF", color: "#0369A1", border: "1px solid #BAE6FD",
                display: "inline-block",
              }}>{d.ch}</span>
              <span style={{ fontSize: 11, fontFamily: T.mono, color: T.muted }}>{d.time}</span>
              <ConfDot conf={d.conf} />
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: T.muted, margin: "10px 0 0", fontFamily: T.mono }}>
          Click any row to view full agent reasoning trail →
        </p>
      </div>

      {selectedTrail && (
        <TrailPanel entry={selectedTrail} onClose={() => setSelectedTrail(null)} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// APP SHELL — Nav sidebar + page routing
// ═══════════════════════════════════════════════════════════════════════════

const NAV = [
  { id: "queue",   label: "Queue",           group: "Control",   icon: "⊡" },
  { id: "agents",  label: "Agents",          group: "Control",   icon: "◈" },
  { id: "iw",      label: "IW Graph",        group: "Control",   icon: "◉" },
  { id: "config",  label: "Configuration",   group: "Settings",  icon: "⊙" },
  { id: "audit",   label: "Audit",           group: "Settings",  icon: "≡" },
];

export default function App() {
  const [page, setPage] = useState("queue");
  const [agents, setAgents] = useState(AGENTS_DATA);
  const [queue, setQueue] = useState(() =>
    AGENTS_DATA.filter(a => a.status === "manual").flatMap(a =>
      (a.pendingItems || []).map(item => ({ ...item, agentId: a.id, agentName: a.name }))
    )
  );

  // Inject Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const manualCount = agents.filter(a => a.status === "manual").length;
  const queueCount  = queue.length;
  const groups = [...new Set(NAV.map(n => n.group))];

  return (
    <div style={{
      display: "flex", height: "100vh", background: "linear-gradient(160deg, #F5F1EB 0%, #EFE9DF 100%)",
      fontFamily: T.sans, color: T.text, overflow: "hidden",
    }}>
      {/* ── Sidebar ── */}
      <div style={{
        width: 210, background: T.sidebar, borderRight: `1px solid ${T.sidebarBorder}`,
        display: "flex", flexDirection: "column", flexShrink: 0,
      }}>
        {/* Logo / product name */}
        <div style={{ padding: "22px 20px 16px", borderBottom: `1px solid ${T.sidebarBorder}` }}>
          <div style={{ marginBottom: 6 }}>
            <span style={{
              fontFamily: T.serif, fontSize: 24, fontWeight: 700,
              color: "#FFFFFF", letterSpacing: "-0.02em",
            }}>IW<span style={{ color: T.amberBorder }}>.</span></span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#FFFFFF", marginBottom: 2 }}>Max Life LAMS</div>
          <p style={{ fontSize: 10, color: T.sidebarText, margin: 0, fontFamily: T.mono }}>Intelligence Warehouse</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "14px 0" }}>
          {groups.map(group => (
            <div key={group} style={{ marginBottom: 6 }}>
              <div style={{
                fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5,
                color: "#4A5C52", padding: "4px 20px 6px", fontFamily: T.mono,
              }}>{group}</div>
              {NAV.filter(n => n.group === group).map(item => {
                const isActive = page === item.id;
                const badge = item.id === "queue" && queueCount > 0
                  ? queueCount
                  : item.id === "agents" && manualCount > 0
                  ? manualCount
                  : null;
                return (
                  <button key={item.id} onClick={() => setPage(item.id)} style={{
                    display: "flex", alignItems: "center", gap: 9, width: "100%",
                    padding: "9px 20px",
                    background: isActive ? "rgba(45,90,61,0.35)" : "none",
                    border: "none", cursor: "pointer", textAlign: "left",
                    color: isActive ? "#FFFFFF" : T.sidebarText,
                    fontSize: 13, fontFamily: T.sans,
                    fontWeight: isActive ? 600 : 400,
                    borderLeft: isActive ? `2px solid ${T.amberBorder}` : "2px solid transparent",
                    transition: "background 0.12s, color 0.12s",
                  }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#FFFFFF"; } }}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "none"; e.currentTarget.style.color = T.sidebarText; } }}
                  >
                    <span style={{ fontSize: 14, opacity: 0.6 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {badge && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, fontFamily: T.mono,
                        background: T.amberBorder, color: "#1A1A1A",
                        padding: "1px 6px", borderRadius: 99,
                        minWidth: 18, textAlign: "center",
                      }}>{badge}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>


      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, overflowY: page === "iw" ? "hidden" : "auto", display: "flex", flexDirection: "column" }}>
        {page === "queue"  && <QueuePage queue={queue} setQueue={setQueue} agents={agents} />}
        {page === "agents" && <AgentsPage agents={agents} setAgents={setAgents} setQueue={setQueue} setPage={setPage} />}
        {page === "iw"     && <IWEditorPage />}
        {page === "config" && <ConfigPage />}
        {page === "audit"  && <AuditPage />}
      </div>
    </div>
  );
}

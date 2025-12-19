"use client";
import * as d3 from "d3";

import { useEffect, useRef, useState } from "react";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  description: string;
  size: number;
  color: string;
  type: "bkg" | "source";
  width?: number;
  height?: number;
  level?: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  id: string;
  source: string | Node;
  target: string | Node;
  type: string;
  description: string;
  linkType: "bkg" | "data";
  nlQuery?: string;
  dataContext?: string;
}

export default function Page() {
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInitialMount = useRef(true);
  const [selectedItem, setSelectedItem] = useState<Node | Link | null>(null);
  const [editMode, setEditMode] = useState<"node" | "link" | "datalink" | null>(
    null
  );
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "emami",
      name: "Emami",
      description:
        "FMCG company operating consumer products across personal care + healthcare categories.",
      level: 0,
      size: 28,
      color: "#0F172A",
      type: "bkg",
    },

    /* =========================
       L1: PRODUCT (BLUE)
       ========================= */
    {
      id: "l1_product",
      name: "Product",
      description:
        "Portfolio hierarchy, SKUs, packs, formulations, claims, lifecycle.",
      level: 1,
      size: 20,
      color: "#3B82F6",
      type: "bkg",
    },

    {
      id: "brand_family",
      name: "Brand Family",
      description:
        "Brand grouping (power brands / long-tail) without naming brands.",
      level: 2,
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "product_line",
      name: "Product Line",
      description: "Range/line extensions within a brand family.",
      level: 3,
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },

    {
      id: "category",
      name: "Category",
      description: "Commercial category used for P&L and positioning.",
      level: 2,
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "sub_category",
      name: "Sub-Category",
      description:
        "Finer grouping used for assortment and competition mapping.",
      level: 3,
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },

    {
      id: "sku",
      name: "SKU",
      description:
        "Sellable item (variant+pack) with barcode/MRP/GST/shelf-life.",
      level: 2,
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "variant",
      name: "Variant",
      description:
        "Variant attributes (feature/ingredient profile/fragrance/claim set).",
      level: 3,
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "pack",
      name: "Pack",
      description:
        "Pack size/type/case pack; labeling specs; artwork references.",
      level: 3,
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "formula",
      name: "Formula / BOM",
      description: "Ingredient/BOM definition for make + quality + cost.",
      level: 3,
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "claim",
      name: "Claim",
      description:
        "Consumer-facing claims tied to substantiation + labeling rules.",
      level: 3,
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "lifecycle",
      name: "Lifecycle",
      description: "Launch, growth, renovation, phase-out; change control.",
      level: 3,
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },

    /* =========================
       L1: MARKET & CONSUMER (GREEN)
       ========================= */
    {
      id: "l1_market",
      name: "Market & Consumer",
      description:
        "Where/why products sell: segments, occasions, geo, competition, drivers.",
      level: 1,
      size: 20,
      color: "#10B981",
      type: "bkg",
    },

    {
      id: "geo",
      name: "Geo",
      description: "Market hierarchy for planning and reporting.",
      level: 2,
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "geo_cluster",
      name: "Geo Cluster",
      description:
        "Clusters (urban/rural, climate, income) used for planning/coverage.",
      level: 3,
      size: 12,
      color: "#10B981",
      type: "bkg",
    },

    {
      id: "consumer_segment",
      name: "Consumer Segment",
      description: "Segments defined by needs, affordability and preferences.",
      level: 2,
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "need_state",
      name: "Need State",
      description: "Jobs-to-be-done driving purchase intent.",
      level: 3,
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "occasion",
      name: "Occasion",
      description: "Seasonality + usage occasions impacting demand.",
      level: 3,
      size: 12,
      color: "#10B981",
      type: "bkg",
    },

    {
      id: "price_band",
      name: "Price Band",
      description: "Affordability banding and price ladders by geo/channel.",
      level: 2,
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "competition",
      name: "Competition",
      description:
        "Competitive sets and benchmarking at sub-category and price-band level.",
      level: 2,
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "competitor_set",
      name: "Competitor Set",
      description:
        "Group of competing products for a sub-category + price band.",
      level: 3,
      size: 12,
      color: "#10B981",
      type: "bkg",
    },

    {
      id: "demand_driver",
      name: "Demand Driver",
      description:
        "External drivers like weather, festivals, outbreaks, macro shocks.",
      level: 2,
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "event",
      name: "Event",
      description:
        "Festival/holiday/local event affecting demand and availability.",
      level: 3,
      size: 12,
      color: "#10B981",
      type: "bkg",
    },

    /* =========================
       L1: ROUTE-TO-MARKET (AMBER)
       ========================= */
    {
      id: "l1_rtm",
      name: "Route-to-Market",
      description:
        "Channels, distributor network, territories, beats, outlet coverage, key accounts.",
      level: 1,
      size: 20,
      color: "#F59E0B",
      type: "bkg",
    },

    {
      id: "channel",
      name: "Channel",
      description:
        "GT / MT / eCom / institutional (and other relevant channels).",
      level: 2,
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "channel_program",
      name: "Channel Program",
      description:
        "Channel-specific programs: visibility, assortment rules, price rules.",
      level: 3,
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },

    {
      id: "territory",
      name: "Territory",
      description: "Sales territory hierarchy aligned to geo.",
      level: 2,
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "beat",
      name: "Beat / Route",
      description: "Route plan for outlet coverage and ordering cadence.",
      level: 3,
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },

    {
      id: "distributor",
      name: "Distributor",
      description:
        "Primary partner with service area, credit terms, service KPIs.",
      level: 2,
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "service_level",
      name: "Service Level",
      description:
        "Service KPIs (fill rate, OTIF, frequency, claims turnaround).",
      level: 3,
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },

    {
      id: "outlet",
      name: "Outlet",
      description:
        "Retail outlet with type, potential, service frequency, compliance flags.",
      level: 2,
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "outlet_profile",
      name: "Outlet Profile",
      description:
        "Outlet attributes: format, shelf space, category relevance, credit behavior.",
      level: 3,
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },

    {
      id: "key_account",
      name: "Key Account",
      description:
        "Modern trade account with listing, JBPs, trade terms, penalties.",
      level: 2,
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "listing",
      name: "Listing",
      description:
        "SKU listings at key accounts (on/off, dates, compliance, penalties).",
      level: 3,
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },

    /* =========================
       L1: SALES & TRADE (CYAN)
       ========================= */
    {
      id: "l1_sales",
      name: "Sales & Trade",
      description:
        "Orders, invoices, schemes, pricing conditions, returns, collections, secondary sales.",
      level: 1,
      size: 20,
      color: "#06B6D4",
      type: "bkg",
    },

    {
      id: "sales_order",
      name: "Sales Order",
      description: "Primary orders with header and line items.",
      level: 2,
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "order_line",
      name: "Order Line",
      description: "Order line: SKU, qty, price basis, promised date.",
      level: 3,
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },

    {
      id: "invoice",
      name: "Invoice",
      description: "Invoicing with pricing, discounts, taxes, freight, terms.",
      level: 2,
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "invoice_line",
      name: "Invoice Line",
      description: "Invoice line: SKU, qty, gross, discount, net, tax.",
      level: 3,
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "pricing_condition",
      name: "Pricing Condition",
      description:
        "List price, trade discounts, taxes, freight rules, rounding rules.",
      level: 3,
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },

    {
      id: "trade_scheme",
      name: "Trade Scheme",
      description: "Schemes, slabs, display programs and eligibility rules.",
      level: 2,
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "scheme_accrual",
      name: "Scheme Accrual",
      description: "Accrual by SKU/channel/period.",
      level: 3,
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "scheme_settlement",
      name: "Scheme Settlement",
      description: "Claims and settlements against accruals.",
      level: 3,
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },

    {
      id: "secondary_sales",
      name: "Secondary Sales",
      description:
        "Distributor→outlet movement/off-take proxy (where available).",
      level: 2,
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "secondary_line",
      name: "Secondary Sales Line",
      description: "Secondary line: outlet, SKU, qty, net value.",
      level: 3,
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },

    {
      id: "sales_return",
      name: "Return / Expiry",
      description: "Returns, damages, expiries and dispositions.",
      level: 2,
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "credit_note",
      name: "Credit Note",
      description: "Credits for returns/price corrections/scheme settlements.",
      level: 3,
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },

    {
      id: "collections",
      name: "Collections",
      description: "Receivables, aging, disputes, credit control.",
      level: 2,
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "credit_terms",
      name: "Credit Terms",
      description:
        "Credit limit, credit days, block rules, exception approvals.",
      level: 3,
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },

    /* =========================
       L1: SUPPLY CHAIN (VIOLET)
       ========================= */
    {
      id: "l1_supply",
      name: "Supply Chain",
      description:
        "Forecasting, S&OP, procurement, inventory, warehousing, logistics.",
      level: 1,
      size: 20,
      color: "#8B5CF6",
      type: "bkg",
    },

    {
      id: "forecast",
      name: "Forecast",
      description: "Demand forecast by SKU×geo×channel.",
      level: 2,
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "forecast_version",
      name: "Forecast Version",
      description: "Baseline vs promo uplift vs override versions.",
      level: 3,
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },

    {
      id: "sop",
      name: "S&OP",
      description:
        "Consensus plan linking demand, supply, and inventory targets.",
      level: 2,
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "supply_plan",
      name: "Supply Plan",
      description:
        "Planned production/procurement/distribution to meet forecast.",
      level: 3,
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },

    {
      id: "supplier",
      name: "Supplier",
      description: "Raw/pack suppliers with lead time, MOQ, quality specs.",
      level: 2,
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "raw_material",
      name: "Raw Material",
      description: "Inputs consumed in formulas; cost + quality criticality.",
      level: 3,
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "pack_material",
      name: "Packaging Material",
      description: "Primary/secondary packaging; artwork/label dependencies.",
      level: 3,
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },

    {
      id: "procurement",
      name: "Procurement",
      description: "Purchase planning, orders, receipts, supplier performance.",
      level: 2,
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "purchase_order",
      name: "Purchase Order",
      description: "PO line items for RM/PM with delivery schedules.",
      level: 3,
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },

    {
      id: "dc",
      name: "DC / Warehouse",
      description: "Storage nodes (plant FG store / CFA / regional DC).",
      level: 2,
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "inventory",
      name: "Inventory",
      description: "On-hand/in-transit/blocked; aging/expiry; valuation basis.",
      level: 2,
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "inventory_position",
      name: "Inventory Position",
      description: "SKU×location×batch aging buckets and availability status.",
      level: 3,
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },

    {
      id: "shipment",
      name: "Shipment",
      description: "Dispatches with route, carrier, POD, damages.",
      level: 2,
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "lane",
      name: "Transport Lane",
      description: "Origin-destination lane with SLA, cost, carriers.",
      level: 3,
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },

    /* =========================
       L1: MANUFACTURING & QUALITY (RED)
       ========================= */
    {
      id: "l1_mfg",
      name: "Manufacturing & Quality",
      description: "Plants, lines, batches, QC, deviations/CAPA, traceability.",
      level: 1,
      size: 20,
      color: "#EF4444",
      type: "bkg",
    },

    {
      id: "plant",
      name: "Plant",
      description: "Manufacturing site with capacity/lines/compliance.",
      level: 2,
      size: 16,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "prod_line",
      name: "Production Line",
      description: "Line constraints, OEE, changeover, yield loss points.",
      level: 3,
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },

    {
      id: "batch",
      name: "Batch / Lot",
      description: "RM→process→FG genealogy for traceability and recalls.",
      level: 2,
      size: 16,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "qc_test",
      name: "QC Test",
      description: "Incoming/in-process/FG tests; results and release status.",
      level: 3,
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "coa",
      name: "COA / Test Certificate",
      description:
        "Certificates linked to batches for compliance and customer requirements.",
      level: 3,
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "deviation",
      name: "Deviation / CAPA",
      description: "Deviations, investigations, corrective/preventive actions.",
      level: 3,
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },

    {
      id: "rnd",
      name: "R&D",
      description:
        "New product development, renovation, stability, substantiation.",
      level: 2,
      size: 16,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "change_control",
      name: "Change Control",
      description:
        "Controlled changes to formula/pack/label/process with approvals.",
      level: 3,
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },

    /* =========================
       L1: MARKETING (PINK)
       ========================= */
    {
      id: "l1_mkt",
      name: "Marketing",
      description:
        "Campaigns, media, price-pack architecture, brand health, consumer feedback loops.",
      level: 1,
      size: 20,
      color: "#EC4899",
      type: "bkg",
    },

    {
      id: "campaign",
      name: "Campaign",
      description: "Campaign master (objective, period, targeting, creatives).",
      level: 2,
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "media_plan",
      name: "Media Plan",
      description: "Channel mix, spend plan, impressions/reach targets.",
      level: 3,
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },

    {
      id: "price_pack",
      name: "Price-Pack Architecture",
      description: "MRP ladder, promo depth/frequency, channel price rules.",
      level: 2,
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "promo_mechanic",
      name: "Promo Mechanic",
      description: "Mechanics: % off, extra quantity, bundles, displays, etc.",
      level: 3,
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },

    {
      id: "brand_health",
      name: "Brand Health",
      description: "Awareness/consideration/preference/sentiment signals.",
      level: 2,
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "brand_metric",
      name: "Brand Metric",
      description: "Metric points tracked by geo/segment/time.",
      level: 3,
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },

    {
      id: "consumer_feedback",
      name: "Consumer Feedback",
      description: "Complaints/reviews/NPS signals with defect tagging.",
      level: 2,
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "complaint_ticket",
      name: "Complaint Ticket",
      description:
        "Ticket with defect type, severity, batch reference, resolution.",
      level: 3,
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },

    /* =========================
       L1: FINANCE (SLATE)
       ========================= */
    {
      id: "l1_fin",
      name: "Finance",
      description: "P&L, budgeting, working capital, tax, cost centers.",
      level: 1,
      size: 20,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "pl",
      name: "P&L",
      description: "Revenue → GM → EBITDA with cuts by product/channel/geo.",
      level: 2,
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "pl_component",
      name: "P&L Component",
      description:
        "Revenue, discounts, COGS, trade spend, marketing, freight, opex.",
      level: 3,
      size: 12,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "budget",
      name: "Budget & Forecast",
      description: "Annual plan + rolling forecasts + variance tracking.",
      level: 2,
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "plan_scenario",
      name: "Plan Scenario",
      description: "AOP, best case, base case, stress case.",
      level: 3,
      size: 12,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "working_capital",
      name: "Working Capital",
      description: "Inventory + receivables - payables; cash cycle.",
      level: 2,
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "wc_component",
      name: "WC Component",
      description: "Inventory, AR, AP components and their drivers.",
      level: 3,
      size: 12,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "tax",
      name: "Tax / GST",
      description: "Rates, credits, filings, reconciliations.",
      level: 2,
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "tax_filing",
      name: "Tax Filing",
      description: "Returns/filings by period with reconciliation status.",
      level: 3,
      size: 12,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "cost_center",
      name: "Cost Center",
      description: "Organizational cost buckets for tracking spends.",
      level: 2,
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "spend_line",
      name: "Spend Line",
      description: "Spend transactions tagged to cost centers.",
      level: 3,
      size: 12,
      color: "#64748B",
      type: "bkg",
    },

    /* =========================
       L1: GOVERNANCE (LIME)
       ========================= */
    {
      id: "l1_gov",
      name: "Governance & Compliance",
      description: "Policies, audits, regulatory requirements, risk register.",
      level: 1,
      size: 20,
      color: "#84CC16",
      type: "bkg",
    },

    {
      id: "policy",
      name: "Policy / SOP",
      description: "Controls for sales, quality, supply chain, finance.",
      level: 2,
      size: 16,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "sop_doc",
      name: "SOP Document",
      description: "Versioned procedure documents and control checklists.",
      level: 3,
      size: 12,
      color: "#84CC16",
      type: "bkg",
    },

    {
      id: "reg_req",
      name: "Regulatory Requirement",
      description:
        "Labeling/claims/packaging and category-specific regulations.",
      level: 2,
      size: 16,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "label_rule",
      name: "Label Rule",
      description:
        "Mandatory label fields, warnings, claims substantiation constraints.",
      level: 3,
      size: 12,
      color: "#84CC16",
      type: "bkg",
    },

    {
      id: "audit",
      name: "Audit Finding",
      description: "Audit observations, actions, evidence closure.",
      level: 2,
      size: 16,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "action_item",
      name: "Action Item",
      description: "Corrective tasks with owners, dates, and closure evidence.",
      level: 3,
      size: 12,
      color: "#84CC16",
      type: "bkg",
    },

    {
      id: "risk",
      name: "Risk Register",
      description:
        "Supply risk, compliance risk, quality risk, reputation risk.",
      level: 2,
      size: 16,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "risk_item",
      name: "Risk Item",
      description: "Individual risks with likelihood/impact and mitigations.",
      level: 3,
      size: 12,
      color: "#84CC16",
      type: "bkg",
    },

    /* =========================
       L1: PEOPLE & ORG (PURPLE)
       ========================= */
    {
      id: "l1_people",
      name: "People & Org",
      description:
        "Org structure, roles, employee assignments, targets, incentives.",
      level: 1,
      size: 20,
      color: "#A855F7",
      type: "bkg",
    },

    {
      id: "org_unit",
      name: "Org Unit",
      description: "Function/BU/region hierarchy.",
      level: 2,
      size: 16,
      color: "#A855F7",
      type: "bkg",
    },
    {
      id: "org_assignment",
      name: "Org Assignment",
      description: "Assignments of territories/accounts/plants to org units.",
      level: 3,
      size: 12,
      color: "#A855F7",
      type: "bkg",
    },

    {
      id: "role",
      name: "Role",
      description: "Sales, marketing, supply chain, plant ops, finance roles.",
      level: 2,
      size: 16,
      color: "#A855F7",
      type: "bkg",
    },
    {
      id: "kpi_target",
      name: "KPI / Target",
      description: "Role-linked KPIs and targets by period.",
      level: 3,
      size: 12,
      color: "#A855F7",
      type: "bkg",
    },

    {
      id: "employee",
      name: "Employee",
      description: "Employees mapped to roles/org units.",
      level: 2,
      size: 16,
      color: "#A855F7",
      type: "bkg",
    },
    {
      id: "incentive",
      name: "Incentive Plan",
      description: "Payout logic tied to KPIs and performance.",
      level: 3,
      size: 12,
      color: "#A855F7",
      type: "bkg",
    },

    /* =========================
       L1: DIGITAL COMMERCE (ROSE)
       ========================= */
    {
      id: "l1_digital",
      name: "Digital Commerce",
      description:
        "D2C + marketplace: catalog, listings, orders, reviews, analytics.",
      level: 1,
      size: 20,
      color: "#FB7185",
      type: "bkg",
    },

    {
      id: "storefront",
      name: "Storefront",
      description: "Digital storefront entities (D2C site presence).",
      level: 2,
      size: 16,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "catalog_item",
      name: "Catalog Item",
      description: "Catalog representations mapped to SKUs and content.",
      level: 3,
      size: 12,
      color: "#FB7185",
      type: "bkg",
    },

    {
      id: "mkt_listing",
      name: "Marketplace Listing",
      description: "Listing content, price, availability, rating rollups.",
      level: 2,
      size: 16,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "listing_sku",
      name: "Listing-SKU Mapping",
      description: "Listing to SKU mapping, pack variants, seller constraints.",
      level: 3,
      size: 12,
      color: "#FB7185",
      type: "bkg",
    },

    {
      id: "digital_order",
      name: "Digital Order",
      description:
        "Online order header linked to customer, channel, fulfilment.",
      level: 2,
      size: 16,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "digital_order_line",
      name: "Digital Order Line",
      description: "Digital order line items mapped to SKUs.",
      level: 3,
      size: 12,
      color: "#FB7185",
      type: "bkg",
    },

    {
      id: "review",
      name: "Ratings & Reviews",
      description: "Review text, sentiment, defect mentions, repeats.",
      level: 2,
      size: 16,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "review_topic",
      name: "Review Topic",
      description: "Topics (delivery, packaging, efficacy, fragrance, etc.).",
      level: 3,
      size: 12,
      color: "#FB7185",
      type: "bkg",
    },

    {
      id: "digital_analytics",
      name: "Digital Analytics",
      description: "Traffic, conversion, ROAS, funnel KPIs.",
      level: 2,
      size: 16,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "digital_kpi",
      name: "Digital KPI",
      description: "KPI points tracked by time/geo/channel.",
      level: 3,
      size: 12,
      color: "#FB7185",
      type: "bkg",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    /* =========================
       COMPANY -> L1 DOMAINS (hierarchy)
       ========================= */
    {
      id: "h0_1",
      source: "emami",
      target: "l1_product",
      type: "HAS_DOMAIN",
      description: "Product portfolio domain.",
      linkType: "bkg",
    },
    {
      id: "h0_2",
      source: "emami",
      target: "l1_market",
      type: "HAS_DOMAIN",
      description: "Market & consumer domain.",
      linkType: "bkg",
    },
    {
      id: "h0_3",
      source: "emami",
      target: "l1_rtm",
      type: "HAS_DOMAIN",
      description: "Route-to-market domain.",
      linkType: "bkg",
    },
    {
      id: "h0_4",
      source: "emami",
      target: "l1_sales",
      type: "HAS_DOMAIN",
      description: "Sales & trade domain.",
      linkType: "bkg",
    },
    {
      id: "h0_5",
      source: "emami",
      target: "l1_supply",
      type: "HAS_DOMAIN",
      description: "Supply chain domain.",
      linkType: "bkg",
    },
    {
      id: "h0_6",
      source: "emami",
      target: "l1_mfg",
      type: "HAS_DOMAIN",
      description: "Manufacturing & quality domain.",
      linkType: "bkg",
    },
    {
      id: "h0_7",
      source: "emami",
      target: "l1_mkt",
      type: "HAS_DOMAIN",
      description: "Marketing domain.",
      linkType: "bkg",
    },
    {
      id: "h0_8",
      source: "emami",
      target: "l1_fin",
      type: "HAS_DOMAIN",
      description: "Finance domain.",
      linkType: "bkg",
    },
    {
      id: "h0_9",
      source: "emami",
      target: "l1_gov",
      type: "HAS_DOMAIN",
      description: "Governance & compliance domain.",
      linkType: "bkg",
    },
    {
      id: "h0_10",
      source: "emami",
      target: "l1_people",
      type: "HAS_DOMAIN",
      description: "People & org domain.",
      linkType: "bkg",
    },
    {
      id: "h0_11",
      source: "emami",
      target: "l1_digital",
      type: "HAS_DOMAIN",
      description: "Digital commerce domain.",
      linkType: "bkg",
    },

    /* =========================
       L1 -> L2 (hierarchy) + L2 -> L3 (hierarchy)
       ========================= */

    /* Product hierarchy */
    {
      id: "hp_1",
      source: "l1_product",
      target: "brand_family",
      type: "HAS_ENTITY",
      description: "Brand families.",
      linkType: "bkg",
    },
    {
      id: "hp_2",
      source: "brand_family",
      target: "product_line",
      type: "HAS_SUBENTITY",
      description: "Lines under brand family.",
      linkType: "bkg",
    },

    {
      id: "hp_3",
      source: "l1_product",
      target: "category",
      type: "HAS_ENTITY",
      description: "Categories.",
      linkType: "bkg",
    },
    {
      id: "hp_4",
      source: "category",
      target: "sub_category",
      type: "HAS_SUBENTITY",
      description: "Sub-categories.",
      linkType: "bkg",
    },

    {
      id: "hp_5",
      source: "l1_product",
      target: "sku",
      type: "HAS_ENTITY",
      description: "SKU master.",
      linkType: "bkg",
    },
    {
      id: "hp_6",
      source: "sku",
      target: "variant",
      type: "HAS_ATTRIBUTE",
      description: "Variant attributes.",
      linkType: "bkg",
    },
    {
      id: "hp_7",
      source: "sku",
      target: "pack",
      type: "HAS_ATTRIBUTE",
      description: "Pack mapping.",
      linkType: "bkg",
    },
    {
      id: "hp_8",
      source: "sku",
      target: "formula",
      type: "BUILT_FROM",
      description: "Formula/BOM mapping.",
      linkType: "bkg",
    },
    {
      id: "hp_9",
      source: "sku",
      target: "claim",
      type: "MAKES_CLAIM",
      description: "Claims on SKUs.",
      linkType: "bkg",
    },
    {
      id: "hp_10",
      source: "sku",
      target: "lifecycle",
      type: "IN_LIFECYCLE",
      description: "Lifecycle stage.",
      linkType: "bkg",
    },

    /* Market hierarchy */
    {
      id: "hm_1",
      source: "l1_market",
      target: "geo",
      type: "HAS_ENTITY",
      description: "Geo hierarchy.",
      linkType: "bkg",
    },
    {
      id: "hm_2",
      source: "geo",
      target: "geo_cluster",
      type: "HAS_SUBENTITY",
      description: "Clusters under geo.",
      linkType: "bkg",
    },

    {
      id: "hm_3",
      source: "l1_market",
      target: "consumer_segment",
      type: "HAS_ENTITY",
      description: "Consumer segments.",
      linkType: "bkg",
    },
    {
      id: "hm_4",
      source: "consumer_segment",
      target: "need_state",
      type: "HAS_SUBENTITY",
      description: "Need-states in segment.",
      linkType: "bkg",
    },
    {
      id: "hm_5",
      source: "consumer_segment",
      target: "occasion",
      type: "HAS_SUBENTITY",
      description: "Occasions for segment.",
      linkType: "bkg",
    },

    {
      id: "hm_6",
      source: "l1_market",
      target: "price_band",
      type: "HAS_ENTITY",
      description: "Price bands.",
      linkType: "bkg",
    },

    {
      id: "hm_7",
      source: "l1_market",
      target: "competition",
      type: "HAS_ENTITY",
      description: "Competition lens.",
      linkType: "bkg",
    },
    {
      id: "hm_8",
      source: "competition",
      target: "competitor_set",
      type: "HAS_SUBENTITY",
      description: "Competitor sets.",
      linkType: "bkg",
    },

    {
      id: "hm_9",
      source: "l1_market",
      target: "demand_driver",
      type: "HAS_ENTITY",
      description: "Demand drivers.",
      linkType: "bkg",
    },
    {
      id: "hm_10",
      source: "demand_driver",
      target: "event",
      type: "HAS_SUBENTITY",
      description: "Events.",
      linkType: "bkg",
    },

    /* RTM hierarchy */
    {
      id: "hr_1",
      source: "l1_rtm",
      target: "channel",
      type: "HAS_ENTITY",
      description: "Channels.",
      linkType: "bkg",
    },
    {
      id: "hr_2",
      source: "channel",
      target: "channel_program",
      type: "HAS_SUBENTITY",
      description: "Programs per channel.",
      linkType: "bkg",
    },

    {
      id: "hr_3",
      source: "l1_rtm",
      target: "territory",
      type: "HAS_ENTITY",
      description: "Territories.",
      linkType: "bkg",
    },
    {
      id: "hr_4",
      source: "territory",
      target: "beat",
      type: "HAS_SUBENTITY",
      description: "Beats under territory.",
      linkType: "bkg",
    },

    {
      id: "hr_5",
      source: "l1_rtm",
      target: "distributor",
      type: "HAS_ENTITY",
      description: "Distributors.",
      linkType: "bkg",
    },
    {
      id: "hr_6",
      source: "distributor",
      target: "service_level",
      type: "HAS_SUBENTITY",
      description: "Service levels/SLAs.",
      linkType: "bkg",
    },

    {
      id: "hr_7",
      source: "l1_rtm",
      target: "outlet",
      type: "HAS_ENTITY",
      description: "Outlets.",
      linkType: "bkg",
    },
    {
      id: "hr_8",
      source: "outlet",
      target: "outlet_profile",
      type: "HAS_SUBENTITY",
      description: "Outlet profiles.",
      linkType: "bkg",
    },

    {
      id: "hr_9",
      source: "l1_rtm",
      target: "key_account",
      type: "HAS_ENTITY",
      description: "Key accounts.",
      linkType: "bkg",
    },
    {
      id: "hr_10",
      source: "key_account",
      target: "listing",
      type: "HAS_SUBENTITY",
      description: "Listings per account.",
      linkType: "bkg",
    },

    /* Sales hierarchy */
    {
      id: "hs_1",
      source: "l1_sales",
      target: "sales_order",
      type: "HAS_ENTITY",
      description: "Sales orders.",
      linkType: "bkg",
    },
    {
      id: "hs_2",
      source: "sales_order",
      target: "order_line",
      type: "HAS_SUBENTITY",
      description: "Order lines.",
      linkType: "bkg",
    },

    {
      id: "hs_3",
      source: "l1_sales",
      target: "invoice",
      type: "HAS_ENTITY",
      description: "Invoices.",
      linkType: "bkg",
    },
    {
      id: "hs_4",
      source: "invoice",
      target: "invoice_line",
      type: "HAS_SUBENTITY",
      description: "Invoice lines.",
      linkType: "bkg",
    },
    {
      id: "hs_5",
      source: "invoice",
      target: "pricing_condition",
      type: "HAS_SUBENTITY",
      description: "Pricing conditions on invoices.",
      linkType: "bkg",
    },

    {
      id: "hs_6",
      source: "l1_sales",
      target: "trade_scheme",
      type: "HAS_ENTITY",
      description: "Trade schemes.",
      linkType: "bkg",
    },
    {
      id: "hs_7",
      source: "trade_scheme",
      target: "scheme_accrual",
      type: "HAS_SUBENTITY",
      description: "Scheme accruals.",
      linkType: "bkg",
    },
    {
      id: "hs_8",
      source: "trade_scheme",
      target: "scheme_settlement",
      type: "HAS_SUBENTITY",
      description: "Scheme settlements.",
      linkType: "bkg",
    },

    {
      id: "hs_9",
      source: "l1_sales",
      target: "secondary_sales",
      type: "HAS_ENTITY",
      description: "Secondary sales.",
      linkType: "bkg",
    },
    {
      id: "hs_10",
      source: "secondary_sales",
      target: "secondary_line",
      type: "HAS_SUBENTITY",
      description: "Secondary sales lines.",
      linkType: "bkg",
    },

    {
      id: "hs_11",
      source: "l1_sales",
      target: "sales_return",
      type: "HAS_ENTITY",
      description: "Returns/expiry.",
      linkType: "bkg",
    },
    {
      id: "hs_12",
      source: "sales_return",
      target: "credit_note",
      type: "HAS_SUBENTITY",
      description: "Credit notes.",
      linkType: "bkg",
    },

    {
      id: "hs_13",
      source: "l1_sales",
      target: "collections",
      type: "HAS_ENTITY",
      description: "Collections/AR.",
      linkType: "bkg",
    },
    {
      id: "hs_14",
      source: "collections",
      target: "credit_terms",
      type: "HAS_SUBENTITY",
      description: "Credit terms.",
      linkType: "bkg",
    },

    /* Supply chain hierarchy */
    {
      id: "hsc_1",
      source: "l1_supply",
      target: "forecast",
      type: "HAS_ENTITY",
      description: "Forecast.",
      linkType: "bkg",
    },
    {
      id: "hsc_2",
      source: "forecast",
      target: "forecast_version",
      type: "HAS_SUBENTITY",
      description: "Forecast versions.",
      linkType: "bkg",
    },

    {
      id: "hsc_3",
      source: "l1_supply",
      target: "sop",
      type: "HAS_ENTITY",
      description: "S&OP.",
      linkType: "bkg",
    },
    {
      id: "hsc_4",
      source: "sop",
      target: "supply_plan",
      type: "HAS_SUBENTITY",
      description: "Supply plan.",
      linkType: "bkg",
    },

    {
      id: "hsc_5",
      source: "l1_supply",
      target: "supplier",
      type: "HAS_ENTITY",
      description: "Suppliers.",
      linkType: "bkg",
    },
    {
      id: "hsc_6",
      source: "supplier",
      target: "raw_material",
      type: "HAS_SUBENTITY",
      description: "Raw materials supplied.",
      linkType: "bkg",
    },
    {
      id: "hsc_7",
      source: "supplier",
      target: "pack_material",
      type: "HAS_SUBENTITY",
      description: "Packaging supplied.",
      linkType: "bkg",
    },

    {
      id: "hsc_8",
      source: "l1_supply",
      target: "procurement",
      type: "HAS_ENTITY",
      description: "Procurement.",
      linkType: "bkg",
    },
    {
      id: "hsc_9",
      source: "procurement",
      target: "purchase_order",
      type: "HAS_SUBENTITY",
      description: "Purchase orders.",
      linkType: "bkg",
    },

    {
      id: "hsc_10",
      source: "l1_supply",
      target: "dc",
      type: "HAS_ENTITY",
      description: "Warehouses/DCs.",
      linkType: "bkg",
    },
    {
      id: "hsc_11",
      source: "l1_supply",
      target: "inventory",
      type: "HAS_ENTITY",
      description: "Inventory.",
      linkType: "bkg",
    },
    {
      id: "hsc_12",
      source: "inventory",
      target: "inventory_position",
      type: "HAS_SUBENTITY",
      description: "Inventory positions.",
      linkType: "bkg",
    },

    {
      id: "hsc_13",
      source: "l1_supply",
      target: "shipment",
      type: "HAS_ENTITY",
      description: "Shipments.",
      linkType: "bkg",
    },
    {
      id: "hsc_14",
      source: "shipment",
      target: "lane",
      type: "HAS_SUBENTITY",
      description: "Lanes.",
      linkType: "bkg",
    },

    /* Manufacturing hierarchy */
    {
      id: "hmf_1",
      source: "l1_mfg",
      target: "plant",
      type: "HAS_ENTITY",
      description: "Plants.",
      linkType: "bkg",
    },
    {
      id: "hmf_2",
      source: "plant",
      target: "prod_line",
      type: "HAS_SUBENTITY",
      description: "Lines.",
      linkType: "bkg",
    },

    {
      id: "hmf_3",
      source: "l1_mfg",
      target: "batch",
      type: "HAS_ENTITY",
      description: "Batches.",
      linkType: "bkg",
    },
    {
      id: "hmf_4",
      source: "batch",
      target: "qc_test",
      type: "HAS_SUBENTITY",
      description: "QC tests.",
      linkType: "bkg",
    },
    {
      id: "hmf_5",
      source: "batch",
      target: "coa",
      type: "HAS_SUBENTITY",
      description: "COA.",
      linkType: "bkg",
    },
    {
      id: "hmf_6",
      source: "batch",
      target: "deviation",
      type: "HAS_SUBENTITY",
      description: "Deviations/CAPA.",
      linkType: "bkg",
    },

    {
      id: "hmf_7",
      source: "l1_mfg",
      target: "rnd",
      type: "HAS_ENTITY",
      description: "R&D.",
      linkType: "bkg",
    },
    {
      id: "hmf_8",
      source: "rnd",
      target: "change_control",
      type: "HAS_SUBENTITY",
      description: "Change control.",
      linkType: "bkg",
    },

    /* Marketing hierarchy */
    {
      id: "hmk_1",
      source: "l1_mkt",
      target: "campaign",
      type: "HAS_ENTITY",
      description: "Campaigns.",
      linkType: "bkg",
    },
    {
      id: "hmk_2",
      source: "campaign",
      target: "media_plan",
      type: "HAS_SUBENTITY",
      description: "Media plans.",
      linkType: "bkg",
    },

    {
      id: "hmk_3",
      source: "l1_mkt",
      target: "price_pack",
      type: "HAS_ENTITY",
      description: "Price-pack architecture.",
      linkType: "bkg",
    },
    {
      id: "hmk_4",
      source: "price_pack",
      target: "promo_mechanic",
      type: "HAS_SUBENTITY",
      description: "Promo mechanics.",
      linkType: "bkg",
    },

    {
      id: "hmk_5",
      source: "l1_mkt",
      target: "brand_health",
      type: "HAS_ENTITY",
      description: "Brand health.",
      linkType: "bkg",
    },
    {
      id: "hmk_6",
      source: "brand_health",
      target: "brand_metric",
      type: "HAS_SUBENTITY",
      description: "Brand metrics.",
      linkType: "bkg",
    },

    {
      id: "hmk_7",
      source: "l1_mkt",
      target: "consumer_feedback",
      type: "HAS_ENTITY",
      description: "Consumer feedback.",
      linkType: "bkg",
    },
    {
      id: "hmk_8",
      source: "consumer_feedback",
      target: "complaint_ticket",
      type: "HAS_SUBENTITY",
      description: "Complaint tickets.",
      linkType: "bkg",
    },

    /* Finance hierarchy */
    {
      id: "hf_1",
      source: "l1_fin",
      target: "pl",
      type: "HAS_ENTITY",
      description: "P&L.",
      linkType: "bkg",
    },
    {
      id: "hf_2",
      source: "pl",
      target: "pl_component",
      type: "HAS_SUBENTITY",
      description: "P&L components.",
      linkType: "bkg",
    },

    {
      id: "hf_3",
      source: "l1_fin",
      target: "budget",
      type: "HAS_ENTITY",
      description: "Budget & forecast.",
      linkType: "bkg",
    },
    {
      id: "hf_4",
      source: "budget",
      target: "plan_scenario",
      type: "HAS_SUBENTITY",
      description: "Plan scenarios.",
      linkType: "bkg",
    },

    {
      id: "hf_5",
      source: "l1_fin",
      target: "working_capital",
      type: "HAS_ENTITY",
      description: "Working capital.",
      linkType: "bkg",
    },
    {
      id: "hf_6",
      source: "working_capital",
      target: "wc_component",
      type: "HAS_SUBENTITY",
      description: "WC components.",
      linkType: "bkg",
    },

    {
      id: "hf_7",
      source: "l1_fin",
      target: "tax",
      type: "HAS_ENTITY",
      description: "Tax/GST.",
      linkType: "bkg",
    },
    {
      id: "hf_8",
      source: "tax",
      target: "tax_filing",
      type: "HAS_SUBENTITY",
      description: "Tax filings.",
      linkType: "bkg",
    },

    {
      id: "hf_9",
      source: "l1_fin",
      target: "cost_center",
      type: "HAS_ENTITY",
      description: "Cost centers.",
      linkType: "bkg",
    },
    {
      id: "hf_10",
      source: "cost_center",
      target: "spend_line",
      type: "HAS_SUBENTITY",
      description: "Spend lines.",
      linkType: "bkg",
    },

    /* Governance hierarchy */
    {
      id: "hg_1",
      source: "l1_gov",
      target: "policy",
      type: "HAS_ENTITY",
      description: "Policies/SOPs.",
      linkType: "bkg",
    },
    {
      id: "hg_2",
      source: "policy",
      target: "sop_doc",
      type: "HAS_SUBENTITY",
      description: "SOP documents.",
      linkType: "bkg",
    },

    {
      id: "hg_3",
      source: "l1_gov",
      target: "reg_req",
      type: "HAS_ENTITY",
      description: "Regulatory requirements.",
      linkType: "bkg",
    },
    {
      id: "hg_4",
      source: "reg_req",
      target: "label_rule",
      type: "HAS_SUBENTITY",
      description: "Label rules.",
      linkType: "bkg",
    },

    {
      id: "hg_5",
      source: "l1_gov",
      target: "audit",
      type: "HAS_ENTITY",
      description: "Audit findings.",
      linkType: "bkg",
    },
    {
      id: "hg_6",
      source: "audit",
      target: "action_item",
      type: "HAS_SUBENTITY",
      description: "Action items.",
      linkType: "bkg",
    },

    {
      id: "hg_7",
      source: "l1_gov",
      target: "risk",
      type: "HAS_ENTITY",
      description: "Risk register.",
      linkType: "bkg",
    },
    {
      id: "hg_8",
      source: "risk",
      target: "risk_item",
      type: "HAS_SUBENTITY",
      description: "Risk items.",
      linkType: "bkg",
    },

    /* People hierarchy */
    {
      id: "hh_1",
      source: "l1_people",
      target: "org_unit",
      type: "HAS_ENTITY",
      description: "Org units.",
      linkType: "bkg",
    },
    {
      id: "hh_2",
      source: "org_unit",
      target: "org_assignment",
      type: "HAS_SUBENTITY",
      description: "Assignments.",
      linkType: "bkg",
    },

    {
      id: "hh_3",
      source: "l1_people",
      target: "role",
      type: "HAS_ENTITY",
      description: "Roles.",
      linkType: "bkg",
    },
    {
      id: "hh_4",
      source: "role",
      target: "kpi_target",
      type: "HAS_SUBENTITY",
      description: "KPIs/targets.",
      linkType: "bkg",
    },

    {
      id: "hh_5",
      source: "l1_people",
      target: "employee",
      type: "HAS_ENTITY",
      description: "Employees.",
      linkType: "bkg",
    },
    {
      id: "hh_6",
      source: "employee",
      target: "incentive",
      type: "HAS_SUBENTITY",
      description: "Incentives.",
      linkType: "bkg",
    },

    /* Digital hierarchy */
    {
      id: "hd_1",
      source: "l1_digital",
      target: "storefront",
      type: "HAS_ENTITY",
      description: "Storefront.",
      linkType: "bkg",
    },
    {
      id: "hd_2",
      source: "storefront",
      target: "catalog_item",
      type: "HAS_SUBENTITY",
      description: "Catalog items.",
      linkType: "bkg",
    },

    {
      id: "hd_3",
      source: "l1_digital",
      target: "mkt_listing",
      type: "HAS_ENTITY",
      description: "Marketplace listings.",
      linkType: "bkg",
    },
    {
      id: "hd_4",
      source: "mkt_listing",
      target: "listing_sku",
      type: "HAS_SUBENTITY",
      description: "Listing-SKU mappings.",
      linkType: "bkg",
    },

    {
      id: "hd_5",
      source: "l1_digital",
      target: "digital_order",
      type: "HAS_ENTITY",
      description: "Digital orders.",
      linkType: "bkg",
    },
    {
      id: "hd_6",
      source: "digital_order",
      target: "digital_order_line",
      type: "HAS_SUBENTITY",
      description: "Digital order lines.",
      linkType: "bkg",
    },

    {
      id: "hd_7",
      source: "l1_digital",
      target: "review",
      type: "HAS_ENTITY",
      description: "Reviews.",
      linkType: "bkg",
    },
    {
      id: "hd_8",
      source: "review",
      target: "review_topic",
      type: "HAS_SUBENTITY",
      description: "Review topics.",
      linkType: "bkg",
    },

    {
      id: "hd_9",
      source: "l1_digital",
      target: "digital_analytics",
      type: "HAS_ENTITY",
      description: "Digital analytics.",
      linkType: "bkg",
    },
    {
      id: "hd_10",
      source: "digital_analytics",
      target: "digital_kpi",
      type: "HAS_SUBENTITY",
      description: "Digital KPIs.",
      linkType: "bkg",
    },

    /* =========================
       CROSS-DOMAIN LINKS (kept clean; hierarchy still preserved above)
       ========================= */

    /* Product mapping edges */
    {
      id: "x_p1",
      source: "product_line",
      target: "sku",
      type: "CONTAINS_SKU",
      description: "A product line contains SKUs.",
      linkType: "bkg",
    },
    {
      id: "x_p2",
      source: "sub_category",
      target: "sku",
      type: "GROUPS",
      description: "Sub-category groups SKUs.",
      linkType: "bkg",
    },

    /* Market -> Product edges */
    {
      id: "x_m1",
      source: "price_band",
      target: "sku",
      type: "BANDS",
      description: "Maps SKUs to price bands.",
      linkType: "bkg",
    },
    {
      id: "x_m2",
      source: "competitor_set",
      target: "sub_category",
      type: "COMPETES_IN",
      description: "Competitor set defined per sub-category.",
      linkType: "bkg",
    },
    {
      id: "x_m3",
      source: "event",
      target: "occasion",
      type: "DRIVES",
      description: "Events drive demand occasions.",
      linkType: "bkg",
    },

    /* RTM coverage edges */
    {
      id: "x_r1",
      source: "geo",
      target: "territory",
      type: "HAS_TERRITORY",
      description: "Territories roll up under geo.",
      linkType: "bkg",
    },
    {
      id: "x_r2",
      source: "beat",
      target: "outlet",
      type: "COVERS",
      description: "Beats cover outlets.",
      linkType: "bkg",
    },
    {
      id: "x_r3",
      source: "distributor",
      target: "territory",
      type: "SERVES",
      description: "Distributor serves territory.",
      linkType: "bkg",
    },
    {
      id: "x_r4",
      source: "outlet",
      target: "channel",
      type: "IN_CHANNEL",
      description: "Outlet belongs to a channel.",
      linkType: "bkg",
    },
    {
      id: "x_r5",
      source: "listing",
      target: "sku",
      type: "LISTS",
      description: "Listing references SKUs.",
      linkType: "bkg",
    },

    /* Sales process edges */
    {
      id: "x_s1",
      source: "sales_order",
      target: "distributor",
      type: "ORDERED_BY",
      description: "Order placed by distributor.",
      linkType: "bkg",
    },
    {
      id: "x_s2",
      source: "sales_order",
      target: "key_account",
      type: "ORDERED_BY",
      description: "Order placed by key account (where applicable).",
      linkType: "bkg",
    },
    {
      id: "x_s3",
      source: "order_line",
      target: "sku",
      type: "OF_SKU",
      description: "Order line references SKU.",
      linkType: "bkg",
    },
    {
      id: "x_s4",
      source: "sales_order",
      target: "invoice",
      type: "BILLED_AS",
      description: "Sales order billed as invoice.",
      linkType: "bkg",
    },
    {
      id: "x_s5",
      source: "invoice_line",
      target: "sku",
      type: "OF_SKU",
      description: "Invoice line references SKU.",
      linkType: "bkg",
    },
    {
      id: "x_s6",
      source: "trade_scheme",
      target: "channel",
      type: "APPLIES_TO",
      description: "Scheme applies to channels.",
      linkType: "bkg",
    },
    {
      id: "x_s7",
      source: "trade_scheme",
      target: "sku",
      type: "APPLIES_TO",
      description: "Scheme applies to SKUs.",
      linkType: "bkg",
    },
    {
      id: "x_s8",
      source: "scheme_settlement",
      target: "credit_note",
      type: "SETTLED_AS",
      description: "Settlements often materialize as credits.",
      linkType: "bkg",
    },
    {
      id: "x_s9",
      source: "secondary_line",
      target: "outlet",
      type: "SOLD_TO",
      description: "Secondary line sold to outlet.",
      linkType: "bkg",
    },
    {
      id: "x_s10",
      source: "secondary_line",
      target: "sku",
      type: "OF_SKU",
      description: "Secondary line references SKU.",
      linkType: "bkg",
    },
    {
      id: "x_s11",
      source: "sales_return",
      target: "invoice",
      type: "AGAINST",
      description: "Return references invoice/dispatch.",
      linkType: "bkg",
    },
    {
      id: "x_s12",
      source: "collections",
      target: "invoice",
      type: "COLLECTS_FOR",
      description: "Collections settle invoices.",
      linkType: "bkg",
    },
    {
      id: "x_s13",
      source: "credit_terms",
      target: "distributor",
      type: "GOVERNS",
      description: "Credit terms govern distributor credit.",
      linkType: "bkg",
    },

    /* Supply chain edges */
    {
      id: "x_sc1",
      source: "forecast",
      target: "sku",
      type: "FORECASTS",
      description: "Forecast for SKU.",
      linkType: "bkg",
    },
    {
      id: "x_sc2",
      source: "forecast",
      target: "geo",
      type: "BY_GEO",
      description: "Forecast by geo.",
      linkType: "bkg",
    },
    {
      id: "x_sc3",
      source: "forecast",
      target: "channel",
      type: "BY_CHANNEL",
      description: "Forecast by channel.",
      linkType: "bkg",
    },
    {
      id: "x_sc4",
      source: "sop",
      target: "forecast",
      type: "CONSUMES",
      description: "S&OP consumes forecast.",
      linkType: "bkg",
    },
    {
      id: "x_sc5",
      source: "supply_plan",
      target: "plant",
      type: "ALLOCATES_TO",
      description: "Supply plan allocates to plants.",
      linkType: "bkg",
    },
    {
      id: "x_sc6",
      source: "purchase_order",
      target: "supplier",
      type: "PLACED_ON",
      description: "PO placed on supplier.",
      linkType: "bkg",
    },
    {
      id: "x_sc7",
      source: "purchase_order",
      target: "raw_material",
      type: "BUYS",
      description: "PO buys raw material.",
      linkType: "bkg",
    },
    {
      id: "x_sc8",
      source: "purchase_order",
      target: "pack_material",
      type: "BUYS",
      description: "PO buys packaging material.",
      linkType: "bkg",
    },
    {
      id: "x_sc9",
      source: "inventory_position",
      target: "sku",
      type: "OF_SKU",
      description: "Inventory position is for a SKU.",
      linkType: "bkg",
    },
    {
      id: "x_sc10",
      source: "inventory_position",
      target: "dc",
      type: "AT_LOCATION",
      description: "Inventory position at a DC/warehouse.",
      linkType: "bkg",
    },
    {
      id: "x_sc11",
      source: "shipment",
      target: "dc",
      type: "FROM",
      description: "Shipment originates at DC/warehouse.",
      linkType: "bkg",
    },
    {
      id: "x_sc12",
      source: "shipment",
      target: "distributor",
      type: "TO",
      description: "Shipment delivered to distributor.",
      linkType: "bkg",
    },
    {
      id: "x_sc13",
      source: "shipment",
      target: "key_account",
      type: "TO",
      description: "Shipment delivered to key account.",
      linkType: "bkg",
    },
    {
      id: "x_sc14",
      source: "shipment",
      target: "lane",
      type: "USES_LANE",
      description: "Shipment uses lane.",
      linkType: "bkg",
    },

    /* Manufacturing edges */
    {
      id: "x_mf1",
      source: "batch",
      target: "sku",
      type: "OF_SKU",
      description: "Batch corresponds to SKU.",
      linkType: "bkg",
    },
    {
      id: "x_mf2",
      source: "batch",
      target: "plant",
      type: "MADE_AT",
      description: "Batch made at plant.",
      linkType: "bkg",
    },
    {
      id: "x_mf3",
      source: "qc_test",
      target: "coa",
      type: "GENERATES",
      description: "QC generates COA.",
      linkType: "bkg",
    },
    {
      id: "x_mf4",
      source: "change_control",
      target: "formula",
      type: "CHANGES",
      description: "Change control can modify formula.",
      linkType: "bkg",
    },
    {
      id: "x_mf5",
      source: "change_control",
      target: "pack",
      type: "CHANGES",
      description: "Change control can modify pack/label.",
      linkType: "bkg",
    },
    {
      id: "x_mf6",
      source: "formula",
      target: "raw_material",
      type: "CONSUMES",
      description: "Formula consumes raw materials.",
      linkType: "bkg",
    },
    {
      id: "x_mf7",
      source: "pack",
      target: "pack_material",
      type: "USES",
      description: "Pack uses packaging materials.",
      linkType: "bkg",
    },

    /* Marketing edges */
    {
      id: "x_mk1",
      source: "campaign",
      target: "consumer_segment",
      type: "TARGETS",
      description: "Campaign targets segments.",
      linkType: "bkg",
    },
    {
      id: "x_mk2",
      source: "campaign",
      target: "geo",
      type: "TARGETS",
      description: "Campaign targets geos.",
      linkType: "bkg",
    },
    {
      id: "x_mk3",
      source: "campaign",
      target: "brand_family",
      type: "PROMOTES",
      description: "Campaign promotes brand family.",
      linkType: "bkg",
    },
    {
      id: "x_mk4",
      source: "promo_mechanic",
      target: "trade_scheme",
      type: "EXECUTED_AS",
      description: "Promo mechanics often executed via schemes.",
      linkType: "bkg",
    },
    {
      id: "x_mk5",
      source: "complaint_ticket",
      target: "batch",
      type: "MAY_REFERENCE",
      description: "Complaints may reference batch.",
      linkType: "bkg",
    },
    {
      id: "x_mk6",
      source: "complaint_ticket",
      target: "sku",
      type: "ABOUT",
      description: "Complaints about SKU.",
      linkType: "bkg",
    },

    /* Finance edges */
    {
      id: "x_f1",
      source: "pl_component",
      target: "invoice",
      type: "DERIVED_FROM",
      description: "Revenue/discounts derived from invoices.",
      linkType: "bkg",
    },
    {
      id: "x_f2",
      source: "pl_component",
      target: "scheme_accrual",
      type: "DERIVED_FROM",
      description: "Trade spend derived from scheme accruals.",
      linkType: "bkg",
    },
    {
      id: "x_f3",
      source: "wc_component",
      target: "inventory",
      type: "INCLUDES",
      description: "WC includes inventory.",
      linkType: "bkg",
    },
    {
      id: "x_f4",
      source: "wc_component",
      target: "collections",
      type: "INCLUDES",
      description: "WC includes receivables/collections.",
      linkType: "bkg",
    },
    {
      id: "x_f5",
      source: "tax_filing",
      target: "invoice",
      type: "RECONCILES",
      description: "Tax filings reconcile invoices.",
      linkType: "bkg",
    },
    {
      id: "x_f6",
      source: "spend_line",
      target: "media_plan",
      type: "BOOKED_TO",
      description: "Marketing spend lines booked to media plans.",
      linkType: "bkg",
    },

    /* Governance edges */
    {
      id: "x_g1",
      source: "label_rule",
      target: "claim",
      type: "GOVERNS",
      description: "Label rules constrain claims.",
      linkType: "bkg",
    },
    {
      id: "x_g2",
      source: "policy",
      target: "trade_scheme",
      type: "GOVERNS",
      description: "Policy governs scheme approvals.",
      linkType: "bkg",
    },
    {
      id: "x_g3",
      source: "policy",
      target: "qc_test",
      type: "GOVERNS",
      description: "Policy governs QC execution/release.",
      linkType: "bkg",
    },
    {
      id: "x_g4",
      source: "action_item",
      target: "deviation",
      type: "MAY_ADDRESS",
      description: "Actions may address deviations/CAPA.",
      linkType: "bkg",
    },
    {
      id: "x_g5",
      source: "risk_item",
      target: "supplier",
      type: "ASSOCIATED_WITH",
      description: "Risks can be supplier-linked.",
      linkType: "bkg",
    },
    {
      id: "x_g6",
      source: "risk_item",
      target: "plant",
      type: "ASSOCIATED_WITH",
      description: "Risks can be plant-linked.",
      linkType: "bkg",
    },

    /* People edges */
    {
      id: "x_h1",
      source: "employee",
      target: "role",
      type: "HAS_ROLE",
      description: "Employee performs a role.",
      linkType: "bkg",
    },
    {
      id: "x_h2",
      source: "employee",
      target: "org_unit",
      type: "BELONGS_TO",
      description: "Employee belongs to org unit.",
      linkType: "bkg",
    },
    {
      id: "x_h3",
      source: "org_assignment",
      target: "territory",
      type: "ASSIGNS",
      description: "Org assigns ownership of territories.",
      linkType: "bkg",
    },
    {
      id: "x_h4",
      source: "kpi_target",
      target: "territory",
      type: "SET_FOR",
      description: "Targets set for territories.",
      linkType: "bkg",
    },
    {
      id: "x_h5",
      source: "incentive",
      target: "kpi_target",
      type: "BASED_ON",
      description: "Incentives based on KPIs.",
      linkType: "bkg",
    },

    /* Digital edges */
    {
      id: "x_d1",
      source: "catalog_item",
      target: "sku",
      type: "MAPS_TO",
      description: "Catalog item maps to SKU.",
      linkType: "bkg",
    },
    {
      id: "x_d2",
      source: "listing_sku",
      target: "sku",
      type: "MAPS_TO",
      description: "Listing maps to SKU.",
      linkType: "bkg",
    },
    {
      id: "x_d3",
      source: "digital_order_line",
      target: "sku",
      type: "OF_SKU",
      description: "Digital order line references SKU.",
      linkType: "bkg",
    },
    {
      id: "x_d4",
      source: "review_topic",
      target: "review",
      type: "TAGGED_ON",
      description: "Topics tagged on reviews.",
      linkType: "bkg",
    },
    {
      id: "x_d5",
      source: "digital_kpi",
      target: "campaign",
      type: "MEASURES",
      description: "Digital KPIs measure campaign outcomes.",
      linkType: "bkg",
    },
    {
      id: "x_d6",
      source: "shipment",
      target: "storefront",
      type: "FULFILLS",
      description: "Shipments fulfil digital demand via warehouse network.",
      linkType: "bkg",
    },
  ]);

  const createVisualization = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    d3.select(svgElement).selectAll("*").remove();

    const width = 1400;
    const height = 650;

    const svg = d3
      .select(svgElement)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const defs = g.append("defs");

    defs
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 18)
      .attr("refY", 0)
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#E5E7EB");

    defs
      .append("marker")
      .attr("id", "arrowhead-selected")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 18)
      .attr("refY", 0)
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#3B82F6");

    defs
      .append("marker")
      .attr("id", "arrowhead-data")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 18)
      .attr("refY", 0)
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#10B981");

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d: Node) => d.id)
          .distance(180)
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide<Node>().radius((d) => {
          if (d.type === "source") {
            return Math.max(d.width || 0, d.height || 0) / 2 + 25;
          }
          return d.size + 25;
        })
      );

    simulationRef.current = simulation;

    const linkHitbox = g
      .selectAll(".link-hitbox")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link-hitbox")
      .attr("stroke", "transparent")
      .attr("stroke-width", 20)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        event.stopPropagation();
        setSelectedItem({ ...d });
        setEditMode(d.linkType === "data" ? "datalink" : "link");
      })
      .on("mouseenter", function (event, d) {
        const linkElement = d3.select(this.nextSibling as Element);
        linkElement.attr(
          "data-original-width",
          linkElement.attr("stroke-width")
        );
        linkElement.attr("data-original-stroke", linkElement.attr("stroke"));
        linkElement.attr("stroke-width", 3).attr("stroke", "#9CA3AF");
      })
      .on("mouseleave", function (event, d) {
        const linkElement = d3.select(this.nextSibling as Element);
        const origWidth = linkElement.attr("data-original-width");
        const origStroke = linkElement.attr("data-original-stroke");
        if (origWidth && origStroke) {
          linkElement
            .attr("stroke-width", origWidth)
            .attr("stroke", origStroke);
        }
      });

    const link = g
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", (d) => (d.linkType === "data" ? "#10B981" : "#E5E7EB"))
      .attr("stroke-width", (d) => (d.linkType === "data" ? 2 : 1.5))
      .attr("stroke-opacity", 0.6)
      .attr("stroke-dasharray", (d) => (d.linkType === "data" ? "5,5" : "none"))
      .attr("marker-end", (d) =>
        d.linkType === "data" ? "url(#arrowhead-data)" : "url(#arrowhead)"
      )
      .style("pointer-events", "none");

    const node = g
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, Node>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      )
      .on("click", (event, d) => {
        event.stopPropagation();
        setSelectedItem({ ...d });
        setEditMode("node");
      });

    // Render circles for BKG nodes
    node
      .filter((d) => d.type === "bkg")
      .append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Render rectangles for source nodes
    node
      .filter((d) => d.type === "source")
      .append("rect")
      .attr("x", (d) => -(d.width || 0) / 2)
      .attr("y", (d) => -(d.height || 0) / 2)
      .attr("width", (d) => d.width || 0)
      .attr("height", (d) => d.height || 0)
      .attr("rx", 8)
      .attr("fill", (d) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    node
      .append("text")
      .attr("dy", (d) => (d.type === "source" ? 4 : d.size + 14))
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("fill", (d) => (d.type === "source" ? "#fff" : "#374151"))
      .style("pointer-events", "none")
      .text((d) => d.name);

    const linkText = g
      .selectAll(".link-label")
      .data(links.filter((l) => l.linkType === "bkg"))
      .enter()
      .append("text")
      .attr("class", "link-label")
      .attr("font-size", "9px")
      .attr("font-weight", "500")
      .attr("fill", "#9CA3AF")
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .text((d) => d.type);

    simulation.on("tick", () => {
      linkHitbox
        .attr("x1", (d) => (d.source as Node).x ?? 0)
        .attr("y1", (d) => (d.source as Node).y ?? 0)
        .attr("x2", (d) => (d.target as Node).x ?? 0)
        .attr("y2", (d) => (d.target as Node).y ?? 0);

      link
        .attr("x1", (d) => (d.source as Node).x ?? 0)
        .attr("y1", (d) => (d.source as Node).y ?? 0)
        .attr("x2", (d) => (d.target as Node).x ?? 0)
        .attr("y2", (d) => (d.target as Node).y ?? 0);

      linkText
        .attr(
          "x",
          (d) => (((d.source as Node).x ?? 0) + ((d.target as Node).x ?? 0)) / 2
        )
        .attr(
          "y",
          (d) => (((d.source as Node).y ?? 0) + ((d.target as Node).y ?? 0)) / 2
        );

      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    function dragstarted(
      event: d3.D3DragEvent<SVGGElement, Node, Node>,
      d: Node
    ) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x ?? 0;
      d.fy = d.y ?? 0;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(
      event: d3.D3DragEvent<SVGGElement, Node, Node>,
      d: Node
    ) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      createVisualization();
      isInitialMount.current = false;
    } else if (simulationRef.current && svgRef.current) {
      // Update existing simulation without recreating
      simulationRef.current.nodes(nodes);
      const linkForce = d3
        .forceLink<Node, Link>(links)
        .id((d: Node) => d.id)
        .distance(180);
      simulationRef.current.force("link", linkForce);

      // Update visual elements with proper key binding
      const svg = d3.select(svgRef.current);
      const g = svg.select("g");

      // Update node visuals - bind by id
      g.selectAll<SVGCircleElement, Node>(".node circle")
        .data(
          nodes.filter((n) => n.type === "bkg"),
          (d: Node) => d.id
        )
        .attr("r", (d) => d.size)
        .attr("fill", (d) => d.color);

      g.selectAll<SVGRectElement, Node>(".node rect")
        .data(
          nodes.filter((n) => n.type === "source"),
          (d: Node) => d.id
        )
        .attr("fill", (d) => d.color);

      g.selectAll<SVGTextElement, Node>(".node text")
        .data(nodes, (d: Node) => d.id)
        .text((d) => d.name)
        .attr("fill", (d) => (d.type === "source" ? "#fff" : "#374151"));

      // Update link visuals - bind by id
      g.selectAll<SVGLineElement, Link>(".link")
        .data(links, (d: Link) => d.id)
        .attr("stroke", (d) => (d.linkType === "data" ? "#10B981" : "#E5E7EB"));

      g.selectAll<SVGTextElement, Link>(".link-label")
        .data(
          links.filter((l) => l.linkType === "bkg"),
          (d: Link) => d.id
        )
        .text((d) => d.type);

      simulationRef.current.alpha(0.1).restart();
    }
  }, [nodes, links]);

  const handleNodeUpdate = (field: keyof Node, value: string | number) => {
    if (!selectedItem || editMode !== "node") return;

    const nodeId = (selectedItem as Node).id;

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === nodeId) {
          // Get current position from simulation if available
          const simNode = simulationRef.current
            ?.nodes()
            .find((n) => n.id === nodeId);
          return {
            ...node,
            [field]: value,
            // Preserve simulation properties if they exist
            ...(simNode && {
              x: simNode.x,
              y: simNode.y,
              vx: simNode.vx,
              vy: simNode.vy,
              fx: simNode.fx,
              fy: simNode.fy,
            }),
          };
        }
        return node;
      })
    );
    setSelectedItem((prev) => ({ ...prev!, [field]: value } as Node | Link));
  };

  const handleLinkUpdate = (field: keyof Link, value: string) => {
    if (!selectedItem || (editMode !== "link" && editMode !== "datalink"))
      return;

    const linkId = (selectedItem as Link).id;

    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === linkId ? { ...link, [field]: value } : link
      )
    );
    setSelectedItem((prev) => ({ ...prev!, [field]: value } as Node | Link));
  };

  const closeEditor = () => {
    setSelectedItem(null);
    setEditMode(null);
  };

  const getNodeId = (nodeOrId: string | Node): string => {
    return typeof nodeOrId === "string" ? nodeOrId : nodeOrId.id;
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="flex-1 relative">
        <svg ref={svgRef} className="w-full h-full bg-white" />
      </div>

      {selectedItem && editMode && (
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {editMode === "node" ? "Edit Node" : "Edit Link"}
            </h2>
            <button
              onClick={closeEditor}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {editMode === "node" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={(selectedItem as Node).name}
                  onChange={(e) => handleNodeUpdate("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={(selectedItem as Node).description}
                  onChange={(e) =>
                    handleNodeUpdate("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {(selectedItem as Node).type === "bkg" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="30"
                    value={(selectedItem as Node).size}
                    onChange={(e) =>
                      handleNodeUpdate("size", parseInt(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="range"
                    min="8"
                    max="30"
                    value={(selectedItem as Node).size}
                    onChange={(e) =>
                      handleNodeUpdate("size", parseInt(e.target.value))
                    }
                    className="w-full mt-2"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={(selectedItem as Node).color}
                    onChange={(e) => handleNodeUpdate("color", e.target.value)}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={(selectedItem as Node).color}
                    onChange={(e) => handleNodeUpdate("color", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  ID: {(selectedItem as Node).id}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Type: {(selectedItem as Node).type}
                </p>
              </div>
            </div>
          )}

          {(editMode === "link" || editMode === "datalink") && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Type
                </label>
                <input
                  type="text"
                  value={(selectedItem as Link).type}
                  onChange={(e) => handleLinkUpdate("type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From (Source)
                </label>
                <select
                  value={getNodeId((selectedItem as Link).source)}
                  onChange={(e) => handleLinkUpdate("source", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name} ({node.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To (Target)
                </label>
                <select
                  value={getNodeId((selectedItem as Link).target)}
                  onChange={(e) => handleLinkUpdate("target", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name} ({node.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={(selectedItem as Link).description}
                  onChange={(e) =>
                    handleLinkUpdate("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {editMode === "datalink" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NL Query
                    </label>
                    <textarea
                      value={(selectedItem as Link).nlQuery || ""}
                      onChange={(e) =>
                        handleLinkUpdate("nlQuery", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Context
                    </label>
                    <textarea
                      value={(selectedItem as Link).dataContext || ""}
                      onChange={(e) =>
                        handleLinkUpdate("dataContext", e.target.value)
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  ID: {(selectedItem as Link).id}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Link Type: {(selectedItem as Link).linkType}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

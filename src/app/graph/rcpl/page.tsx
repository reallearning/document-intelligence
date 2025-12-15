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
      id: "rcpl",
      name: "RCPL",
      description:
        "Consumer products (FMCG) business that builds brands, manufactures/sources SKUs, and sells through GT/MT/ecomm/institutional via a distribution network.",
      level: 0,
      size: 24,
      color: "#1D4ED8",
      type: "bkg",
    },

    // =========================
    // LEVEL 1 (MASTER DOMAINS)
    // =========================
    {
      id: "l1_product",
      name: "Product",
      description:
        "Brand, SKU, pack, formulation, category hierarchy, and lifecycle governance.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l1_sales",
      name: "Sales",
      description:
        "Primary (sell-in), secondary (sell-out proxy), key accounts, returns, and sales planning.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l1_distribution",
      name: "Distribution & Coverage",
      description:
        "Route-to-market design, distributor network, retailer universe, beat coverage, and service levels.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l1_trade",
      name: "Trade & Pricing",
      description:
        "Price architecture, trade terms, schemes, and trade spend controls.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l1_supply",
      name: "Supply Chain",
      description:
        "Demand planning → supply planning → manufacturing → deployment with inventory, warehousing, and logistics.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l1_marketing",
      name: "Marketing",
      description:
        "Brand strategy, campaigns, trade activation, and consumer insights driving pull.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l1_finance",
      name: "Finance",
      description:
        "P&L, trade spend accruals, receivables/credit, and working capital.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l1_compliance",
      name: "Compliance & Quality",
      description:
        "Food safety / pack compliance / labeling claims, QA governance, traceability and recall readiness.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l1_org",
      name: "Org & Territory",
      description:
        "Org units, roles, territories, incentives, and master-data governance.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l1_market",
      name: "Consumer & Market",
      description:
        "Consumer segments, occasions, competitor context, and demand drivers by geography.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },

    // =========================
    // LEVEL 2 (SUB-DOMAINS)
    // =========================
    {
      id: "l2_brand",
      name: "Brand Architecture",
      description:
        "Brand portfolio logic: positioning, target segment, price tier, and equity metrics.",
      level: 2,
      size: 14,
      color: "#60A5FA",
      type: "bkg",
    },
    {
      id: "l2_sku_pack",
      name: "SKU & Pack",
      description:
        "Sellable items defined by variant, pack size, pack material, barcode/GTIN, and case configuration.",
      level: 2,
      size: 14,
      color: "#60A5FA",
      type: "bkg",
    },
    {
      id: "l2_formulation",
      name: "Formulation & Specs",
      description:
        "Recipe/ingredients, sensory specs, nutritional specs, and shelf-life/storage constraints.",
      level: 2,
      size: 14,
      color: "#60A5FA",
      type: "bkg",
    },
    {
      id: "l2_label_artwork",
      name: "Labeling & Artwork",
      description:
        "Pack declarations, claims, artwork approvals, and print control across pack formats.",
      level: 2,
      size: 14,
      color: "#60A5FA",
      type: "bkg",
    },
    {
      id: "l2_category",
      name: "Category Hierarchy",
      description:
        "Category → sub-category → segment mapping used for planning, pricing, and reporting.",
      level: 2,
      size: 14,
      color: "#60A5FA",
      type: "bkg",
    },

    {
      id: "l2_primary_sales",
      name: "Primary Sales (Sell-in)",
      description:
        "RCPL → distributor/key account billing: orders, invoices, credit notes, and dispatch SLAs.",
      level: 2,
      size: 14,
      color: "#34D399",
      type: "bkg",
    },
    {
      id: "l2_secondary_sales",
      name: "Secondary Sales (Sell-out Proxy)",
      description:
        "Distributor → retailer sales by day/beat; core lens for market execution.",
      level: 2,
      size: 14,
      color: "#34D399",
      type: "bkg",
    },
    {
      id: "l2_key_accounts",
      name: "Key Accounts (Modern Trade/Institutional)",
      description:
        "Listing, negotiated terms, joint business plans, compliance to planograms and promotions.",
      level: 2,
      size: 14,
      color: "#34D399",
      type: "bkg",
    },
    {
      id: "l2_returns",
      name: "Returns, Damages & Claims",
      description:
        "Expiry/damage returns, recall returns, and claims settlement workflows.",
      level: 2,
      size: 14,
      color: "#34D399",
      type: "bkg",
    },
    {
      id: "l2_sales_planning",
      name: "Sales Planning & Targets",
      description:
        "Targets, incentives, cadence, and alignment into S&OP assumptions.",
      level: 2,
      size: 14,
      color: "#34D399",
      type: "bkg",
    },

    {
      id: "l2_rtm",
      name: "Route-to-Market",
      description:
        "Channel strategy: GT/MT/ecomm/institutional/exports with differentiated packs and terms.",
      level: 2,
      size: 14,
      color: "#FB923C",
      type: "bkg",
    },
    {
      id: "l2_partner_network",
      name: "Partner Network",
      description:
        "Distributors, CFAs/depots, sub-stockists and their contractual responsibilities.",
      level: 2,
      size: 14,
      color: "#FB923C",
      type: "bkg",
    },
    {
      id: "l2_outlet_universe",
      name: "Outlet Universe",
      description:
        "Retailer universe: outlet attributes, classification, and mapped service model.",
      level: 2,
      size: 14,
      color: "#FB923C",
      type: "bkg",
    },
    {
      id: "l2_coverage",
      name: "Coverage & Beat Planning",
      description:
        "Territory → route/beat → visit frequency and journey plans driving WD/ND.",
      level: 2,
      size: 14,
      color: "#FB923C",
      type: "bkg",
    },
    {
      id: "l2_service_levels",
      name: "Service Levels",
      description:
        "OTIF, fill rate, damages, and freshness adherence governing trust and expansion.",
      level: 2,
      size: 14,
      color: "#FB923C",
      type: "bkg",
    },

    {
      id: "l2_price_arch",
      name: "Price Architecture",
      description:
        "MRP corridors and state/channel net pricing ladders for penetration and profitability.",
      level: 2,
      size: 14,
      color: "#FBBF24",
      type: "bkg",
    },
    {
      id: "l2_trade_terms",
      name: "Trade Terms",
      description:
        "PTR/PTD, retailer/distributor margin, credit days, freight/returns policies.",
      level: 2,
      size: 14,
      color: "#FBBF24",
      type: "bkg",
    },
    {
      id: "l2_schemes",
      name: "Schemes & Promotions",
      description:
        "On-invoice/off-invoice schemes, slabs, visibility incentives, consumer promos.",
      level: 2,
      size: 14,
      color: "#FBBF24",
      type: "bkg",
    },
    {
      id: "l2_trade_spend",
      name: "Trade Spend Governance",
      description:
        "Accruals, claims validation, leakage detection, and ROI measurement.",
      level: 2,
      size: 14,
      color: "#FBBF24",
      type: "bkg",
    },

    {
      id: "l2_demand_plan",
      name: "Demand Planning",
      description:
        "Forecasts by SKU × territory × channel with seasonality/event uplifts and NPD ramp curves.",
      level: 2,
      size: 14,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "l2_supply_plan",
      name: "Supply Planning",
      description:
        "Capacity allocation, procurement, and deployment plans constrained by lead times and service goals.",
      level: 2,
      size: 14,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "l2_manufacturing",
      name: "Manufacturing & Co-packing",
      description:
        "Plants/co-packers, line capacity, batch traceability, and quality gates.",
      level: 2,
      size: 14,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "l2_warehousing",
      name: "Warehousing & Depots",
      description:
        "FG depots/CFAs with FEFO, batch/expiry, damages and cycle-count controls.",
      level: 2,
      size: 14,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "l2_logistics",
      name: "Logistics",
      description:
        "Primary and secondary transport, lanes, freight rates, POD and claims.",
      level: 2,
      size: 14,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "l2_inventory",
      name: "Inventory Health",
      description:
        "Safety stock, aging/expiry risk, shrink/damage, and availability/OOS risk.",
      level: 2,
      size: 14,
      color: "#22C55E",
      type: "bkg",
    },

    {
      id: "l2_brand_strategy",
      name: "Brand Strategy",
      description:
        "Positioning, messaging, brand assets, and guardrails for consistency across channels.",
      level: 2,
      size: 14,
      color: "#A78BFA",
      type: "bkg",
    },
    {
      id: "l2_campaigns",
      name: "Media & Campaigns",
      description:
        "ATL/digital/BTL planning with measurement of reach, trial, and repeat intent.",
      level: 2,
      size: 14,
      color: "#A78BFA",
      type: "bkg",
    },
    {
      id: "l2_activation",
      name: "Trade Activation & Visibility",
      description:
        "In-store visibility assets, sampling, promoters, and local market activation.",
      level: 2,
      size: 14,
      color: "#A78BFA",
      type: "bkg",
    },
    {
      id: "l2_insights",
      name: "Consumer Insights",
      description:
        "Research/panels/social sentiment feeding product, pricing, and messaging choices.",
      level: 2,
      size: 14,
      color: "#A78BFA",
      type: "bkg",
    },
    {
      id: "l2_innovation",
      name: "Innovation (NPD)",
      description:
        "Concept testing, packaging innovation, claims substantiation and launch playbooks.",
      level: 2,
      size: 14,
      color: "#A78BFA",
      type: "bkg",
    },

    {
      id: "l2_pl",
      name: "P&L",
      description:
        "Net revenue, COGS, trade spend, freight, wastage and gross margin by slice.",
      level: 2,
      size: 14,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "l2_wc",
      name: "Working Capital",
      description:
        "Inventory + receivables + payables; disciplined credit and freshness reduce cash lock-up.",
      level: 2,
      size: 14,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "l2_credit",
      name: "Credit & Collections",
      description:
        "Distributor limits, DSO/overdues, disputes, and risk controls.",
      level: 2,
      size: 14,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "l2_costing",
      name: "Costing",
      description:
        "BOM costs, conversion costs, freight cost-to-serve, and wastage.",
      level: 2,
      size: 14,
      color: "#0EA5E9",
      type: "bkg",
    },

    {
      id: "l2_food_safety",
      name: "Food Safety & Standards",
      description:
        "Ingredient compliance, contaminants/allergens, lab testing, and licenses where applicable.",
      level: 2,
      size: 14,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "l2_pack_compliance",
      name: "Pack Compliance",
      description:
        "Legal metrology pack declarations, MRP printing, net quantity and date coding controls.",
      level: 2,
      size: 14,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "l2_qms",
      name: "Quality Management System",
      description:
        "QA gates, audits (plant/co-packer), non-conformance and CAPA governance.",
      level: 2,
      size: 14,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "l2_trace_recall",
      name: "Traceability & Recall",
      description:
        "Batch traceability, complaint handling, and recall execution readiness.",
      level: 2,
      size: 14,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "l2_org_units",
      name: "Org Units",
      description:
        "Region/state/territory structures owning targets, partners and execution.",
      level: 2,
      size: 14,
      color: "#94A3B8",
      type: "bkg",
    },
    {
      id: "l2_roles",
      name: "Roles",
      description:
        "Sales roles (ASM/RSM/TSE), KAMs, planners, QA and operations roles with KPI ownership.",
      level: 2,
      size: 14,
      color: "#94A3B8",
      type: "bkg",
    },
    {
      id: "l2_incentives",
      name: "Incentives",
      description:
        "Sales incentives and partner incentives aligned to growth, distribution, and compliance.",
      level: 2,
      size: 14,
      color: "#94A3B8",
      type: "bkg",
    },
    {
      id: "l2_master_data",
      name: "Master Data Governance",
      description:
        "Product/customer/price masters and hierarchies enabling consistent planning and controls.",
      level: 2,
      size: 14,
      color: "#94A3B8",
      type: "bkg",
    },

    {
      id: "l2_consumer",
      name: "Consumer Segments",
      description:
        "Target segments with preferences, price sensitivity and purchase triggers.",
      level: 2,
      size: 14,
      color: "#38BDF8",
      type: "bkg",
    },
    {
      id: "l2_occasion",
      name: "Occasions & Missions",
      description:
        "Consumption occasions and shopping missions influencing pack choice and frequency.",
      level: 2,
      size: 14,
      color: "#38BDF8",
      type: "bkg",
    },
    {
      id: "l2_competition",
      name: "Competitive Context",
      description:
        "Competitors, substitutes, and category dynamics that affect pricing and promotions.",
      level: 2,
      size: 14,
      color: "#38BDF8",
      type: "bkg",
    },
    {
      id: "l2_geo",
      name: "Geography & Seasonality",
      description:
        "State/city-class/climate zone differences driving demand and service design.",
      level: 2,
      size: 14,
      color: "#38BDF8",
      type: "bkg",
    },
    {
      id: "l2_demand_drivers",
      name: "Demand Drivers",
      description:
        "Festivals/events, weather sensitivity, price actions and availability.",
      level: 2,
      size: 14,
      color: "#38BDF8",
      type: "bkg",
    },

    // =========================
    // LEVEL 3 (LEAF NODES)
    // =========================
    {
      id: "l3_positioning",
      name: "Positioning",
      description: "Value proposition and differentiation lens for each brand.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_target_segment",
      name: "Target Segment",
      description:
        "Consumer segment definition (demographic/behavioral) tied to brand choices.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_price_tier",
      name: "Price Tier",
      description:
        "Entry/mainstream/premium tier rules and competitive corridors.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_brand_health",
      name: "Brand Health Metrics",
      description:
        "Awareness, trial, repeat, preference and NPS-style proxies.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },

    {
      id: "l3_variant",
      name: "Variant",
      description: "Flavor/fragrance/functional variant under a SKU family.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_pack_size",
      name: "Pack Size",
      description:
        "Net quantity / volume configuration used for price points and affordability.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_pack_material",
      name: "Pack Material",
      description:
        "PET/can/sachet/carton choices affecting cost, shelf life, and channel fit.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_gtin",
      name: "Barcode / GTIN",
      description:
        "Unique identification for scan-based selling and supply chain traceability.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_case_config",
      name: "Case Configuration",
      description:
        "Units per case and palletization used for logistics efficiency.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },

    {
      id: "l3_ingredients",
      name: "Ingredients",
      description:
        "Ingredient list and approved suppliers (incl. alternates) with specs.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_sensory",
      name: "Sensory Spec",
      description: "Taste/odor/texture parameters and acceptance limits.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_nutrition",
      name: "Nutritional Spec",
      description:
        "Nutrition facts and compliance to permissible limits/claims.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_shelf_life",
      name: "Shelf Life & Storage",
      description:
        "Expiry window and storage constraints that drive FEFO and returns risk.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },

    {
      id: "l3_declarations",
      name: "Pack Declarations",
      description:
        "MRP, net quantity, manufacturer details, batch/date coding requirements.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_claims",
      name: "Claims & Substantiation",
      description:
        "Claims allowed on-pack and evidence trails for substantiation.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_artwork_approval",
      name: "Artwork Approval Workflow",
      description:
        "Cross-functional approvals (legal/quality/brand) and version control.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },

    {
      id: "l3_cat",
      name: "Category",
      description:
        "Top-level category grouping used in planning and reporting.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_subcat",
      name: "Sub-category",
      description:
        "Sub-category segmentation driving pricing ladders and pack strategy.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },
    {
      id: "l3_segment",
      name: "Segment",
      description:
        "Segment definition (e.g., value/core/premium) within a sub-category.",
      level: 3,
      size: 10,
      color: "#93C5FD",
      type: "bkg",
    },

    {
      id: "l3_order",
      name: "Sales Order",
      description: "Order line items by SKU and requested delivery terms.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_invoice",
      name: "Invoice",
      description:
        "Billing document capturing net realization and tax; basis for primary sales.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_credit_note",
      name: "Credit Note",
      description:
        "Adjustments for schemes/returns/claims affecting net sales.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },

    {
      id: "l3_sec_sale",
      name: "Secondary Sale",
      description:
        "Distributor-to-retailer sale transaction capturing offtake by outlet/day.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_retailer_universe",
      name: "Retailer Universe Mapping",
      description: "Outlet master with classification and route assignment.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_beat_day",
      name: "Beat-day Plan",
      description: "Route-wise visitation calendar and expected order capture.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },

    {
      id: "l3_listing",
      name: "Listing & Assortment",
      description:
        "Which SKUs are listed in each key account and where (stores/DC).",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_jbp",
      name: "Joint Business Plan",
      description:
        "Account plan: volumes, visibility, promotions and investment commitments.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_planogram",
      name: "Planogram & Visibility Compliance",
      description: "Shelf/cooler placement rules and audit compliance.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },

    {
      id: "l3_damage_return",
      name: "Damage Return",
      description: "Physical damage returns and claims settlement rules.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_expiry_return",
      name: "Expiry Return",
      description:
        "Near-expiry/expired returns; governed by freshness terms and FEFO adherence.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_recall_return",
      name: "Recall Return",
      description: "Returns triggered by quality incident and recall actions.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },

    {
      id: "l3_targets",
      name: "Targets",
      description:
        "Targets by territory/channel/SKU-family; drives execution focus.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_incentive_plan",
      name: "Incentive Plan",
      description:
        "Incentives aligned to volume, distribution, visibility and compliance metrics.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_sop_inputs",
      name: "S&OP Inputs",
      description:
        "Sales assumptions feeding demand plan (promos, launches, seasonality).",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },

    {
      id: "l3_gt",
      name: "General Trade",
      description:
        "Kirana-led distribution model with beat coverage and scheme-driven execution.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_mt",
      name: "Modern Trade",
      description:
        "Key-account negotiated model with listings, JBPs and compliance audits.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_ecomm",
      name: "E-commerce",
      description:
        "Online/quick-commerce with distinct packs and fulfillment SLAs.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_institutional",
      name: "Institutional",
      description:
        "B2B contracts (venues/offices/etc.) with service and pricing terms.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_exports",
      name: "Exports",
      description:
        "Market-specific labeling/compliance and partner distribution.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },

    {
      id: "l3_distributor",
      name: "Distributor",
      description:
        "Primary stockist with credit, inventory, salesforce and beat execution responsibilities.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_cfa",
      name: "CFA / Depot Agent",
      description:
        "Carrying & forwarding node enabling storage and dispatch for a territory.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_substockist",
      name: "Sub-stockist",
      description: "Secondary layer expanding reach to towns/rural belts.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },

    {
      id: "l3_outlet",
      name: "Retail Outlet",
      description:
        "Outlet with attributes (type, size, potential) affecting service model.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_outlet_class",
      name: "Outlet Classification",
      description: "A/B/C tiers, focus outlets, and service differentiation.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_outlet_service",
      name: "Outlet Service Model",
      description:
        "Delivery frequency, assortment, credit and visibility commitments by outlet tier.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },

    {
      id: "l3_territory",
      name: "Territory",
      description: "Geo unit for targets and distributor mapping.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_beat",
      name: "Beat / Route",
      description: "Route covering a retailer set; defines daily execution.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_visit_freq",
      name: "Visit Frequency",
      description:
        "Visit cadence per outlet tier; impacts availability and offtake.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },

    {
      id: "l3_otif",
      name: "OTIF",
      description: "On-time in-full performance standard.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_fill_rate",
      name: "Fill Rate",
      description: "Line fill / case fill measures of supply completeness.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },
    {
      id: "l3_damage_rate",
      name: "Damage Rate",
      description:
        "Breakage/leakage/damage in transit or handling; drives claims.",
      level: 3,
      size: 10,
      color: "#FDBA74",
      type: "bkg",
    },

    {
      id: "l3_mrp",
      name: "MRP",
      description:
        "Consumer-facing price; managed by corridor and pack architecture.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_ptr",
      name: "PTR",
      description:
        "Price to retailer; defines retailer margin and scheme mechanics.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_ptd",
      name: "PTD / Net Realization",
      description:
        "Price to distributor / net realization after discounts and terms.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_state_corridor",
      name: "State Price Corridor",
      description:
        "State-wise pricing guardrails based on taxes, competition and affordability.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },

    {
      id: "l3_margins",
      name: "Margins",
      description:
        "Distributor and retailer margin ladders by channel/SKU/pack.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_credit_days",
      name: "Credit Days",
      description: "Credit terms controlling DSO and distributor health.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_returns_policy",
      name: "Returns Policy",
      description:
        "Expiry/damage/recall return rules affecting economics and discipline.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_freight_policy",
      name: "Freight Policy",
      description: "Freight support, delivery terms and cost allocation.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },

    {
      id: "l3_on_invoice",
      name: "On-invoice Scheme",
      description: "Immediate discount applied on invoice.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_off_invoice",
      name: "Off-invoice Scheme",
      description: "Credit note / claim-based scheme settled later.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_visibility_incentive",
      name: "Visibility Incentive",
      description:
        "Incentives tied to displays, cooler placements, or shelf share.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_consumer_promo",
      name: "Consumer Promotion",
      description:
        "End-consumer promo mechanics (bundles, freebies) routed via trade.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },

    {
      id: "l3_accruals",
      name: "Accruals",
      description: "Trade spend accrual accounting by scheme and period.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_claim_validation",
      name: "Claims Validation",
      description:
        "Validation of scheme claims against secondary sales/visibility proof.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_leakage",
      name: "Leakage Detection",
      description:
        "Detection of over-claims, duplicates, and eligibility violations.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },
    {
      id: "l3_trade_roi",
      name: "Trade ROI",
      description:
        "Incremental volume/margin impact per unit trade investment.",
      level: 3,
      size: 10,
      color: "#FDE68A",
      type: "bkg",
    },

    {
      id: "l3_baseline",
      name: "Baseline Forecast",
      description: "Expected demand absent promos/launch effects.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_uplift",
      name: "Promo/Event Uplift",
      description: "Demand uplift from schemes, campaigns, festivals/events.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_npd_ramp",
      name: "NPD Ramp Curve",
      description: "Launch ramp assumptions by territory/channel.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_cannibalization",
      name: "Cannibalization",
      description:
        "Substitution within portfolio when new packs/variants launch.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },

    {
      id: "l3_capacity",
      name: "Capacity Allocation",
      description:
        "Line/plant/co-packer capacity allocation by SKU and period.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_procurement",
      name: "Procurement Plan",
      description:
        "Raw/pack material ordering aligned to production and lead times.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_deployment",
      name: "Deployment Plan",
      description:
        "Allocation of FG to depots/distributors to meet service and freshness goals.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },

    {
      id: "l3_plant",
      name: "Manufacturing Site",
      description: "Plant producing batches with QA gates and traceability.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_copacker",
      name: "Co-packer",
      description: "Contract manufacturer producing under audit and SLA.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_qc_gates",
      name: "Quality Gates",
      description: "Inbound/in-process/FG checks; release to market rules.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },

    {
      id: "l3_depot",
      name: "Depot / CFA",
      description: "Storage and dispatch node with batch/expiry management.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_fefo",
      name: "FEFO",
      description:
        "First-expiry-first-out discipline controlling freshness and returns.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_cycle_count",
      name: "Cycle Count",
      description:
        "Inventory accuracy practice reducing phantom OOS and disputes.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },

    {
      id: "l3_primary_transport",
      name: "Primary Transport",
      description: "Plant → depot movement; lane costs and transit SLAs.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_secondary_transport",
      name: "Secondary Transport",
      description:
        "Depot/distributor → outlet deliveries; damages and POD critical.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_pod",
      name: "Proof of Delivery (POD)",
      description: "Delivery confirmation used to settle disputes/claims.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },

    {
      id: "l3_safety_stock",
      name: "Safety Stock",
      description:
        "Buffers to protect service levels under demand/supply uncertainty.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_aging",
      name: "Aging & Expiry Risk",
      description: "Age buckets and risk scoring by node/SKU/batch.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_oos_risk",
      name: "OOS Risk",
      description:
        "Availability risk derived from sales velocity and supply gaps.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },
    {
      id: "l3_shrink",
      name: "Shrink/Damage",
      description: "Losses from breakage, leakage, pilferage and handling.",
      level: 3,
      size: 10,
      color: "#86EFAC",
      type: "bkg",
    },

    {
      id: "l3_message",
      name: "Messaging",
      description: "Core message pillars and proof points.",
      level: 3,
      size: 10,
      color: "#DDD6FE",
      type: "bkg",
    },
    {
      id: "l3_assets",
      name: "Brand Assets",
      description:
        "Creative assets and usage guidelines across media and packs.",
      level: 3,
      size: 10,
      color: "#DDD6FE",
      type: "bkg",
    },

    {
      id: "l3_atl",
      name: "ATL",
      description: "Mass media spend and flights.",
      level: 3,
      size: 10,
      color: "#DDD6FE",
      type: "bkg",
    },
    {
      id: "l3_digital",
      name: "Digital",
      description: "Digital campaigns and performance channels.",
      level: 3,
      size: 10,
      color: "#DDD6FE",
      type: "bkg",
    },
    {
      id: "l3_btl",
      name: "BTL",
      description: "Local activations, sampling and promotions.",
      level: 3,
      size: 10,
      color: "#DDD6FE",
      type: "bkg",
    },

    {
      id: "l3_visibility_assets",
      name: "Visibility Assets",
      description: "Coolers, gondola ends, signage, POSM assets.",
      level: 3,
      size: 10,
      color: "#DDD6FE",
      type: "bkg",
    },
    {
      id: "l3_sampling",
      name: "Sampling",
      description: "Sampling programs and trial generation mechanics.",
      level: 3,
      size: 10,
      color: "#DDD6FE",
      type: "bkg",
    },

    {
      id: "l3_research",
      name: "Research / Panels",
      description:
        "Market research inputs on share, distribution and perception.",
      level: 3,
      size: 10,
      color: "#DDD6FE",
      type: "bkg",
    },
    {
      id: "l3_sentiment",
      name: "Social/Review Sentiment",
      description:
        "Consumer sentiment signals informing messaging and product changes.",
      level: 3,
      size: 10,
      color: "#DDD6FE",
      type: "bkg",
    },

    {
      id: "l3_concept_test",
      name: "Concept Testing",
      description: "Testing new product/pack concepts before launch.",
      level: 3,
      size: 10,
      color: "#DDD6FE",
      type: "bkg",
    },
    {
      id: "l3_launch_playbook",
      name: "Launch Playbook",
      description:
        "Launch sequencing: packs, channels, distribution depth, and campaigns.",
      level: 3,
      size: 10,
      color: "#DDD6FE",
      type: "bkg",
    },

    {
      id: "l3_net_rev",
      name: "Net Revenue",
      description: "Revenue net of returns and discounts.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },
    {
      id: "l3_cogs",
      name: "COGS",
      description: "Product cost including BOM, conversion and packaging.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },
    {
      id: "l3_trade_spend",
      name: "Trade Spend",
      description: "Scheme costs and investments impacting margin.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },
    {
      id: "l3_freight",
      name: "Freight Cost",
      description: "Primary/secondary freight as cost-to-serve component.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },

    {
      id: "l3_inv_wc",
      name: "Inventory (WC)",
      description: "Cash tied in inventory across nodes and batches.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },
    {
      id: "l3_ar_wc",
      name: "Receivables (WC)",
      description: "Outstanding from distributors/key accounts.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },
    {
      id: "l3_ap_wc",
      name: "Payables (WC)",
      description: "Supplier payables, including co-packers/logistics.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },

    {
      id: "l3_limits",
      name: "Credit Limits",
      description: "Limits per partner controlling exposure.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },
    {
      id: "l3_dso",
      name: "DSO / Overdues",
      description: "Collection performance and overdue tracking.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },
    {
      id: "l3_disputes",
      name: "Disputes",
      description:
        "Invoice/claims disputes requiring validation and settlement.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },

    {
      id: "l3_bom",
      name: "BOM Cost",
      description: "Raw and packaging material cost stack.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },
    {
      id: "l3_conversion",
      name: "Conversion Cost",
      description: "Manufacturing conversion/packing costs per unit.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },
    {
      id: "l3_cts",
      name: "Cost-to-Serve",
      description: "Freight + service overhead by channel/territory.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },
    {
      id: "l3_waste",
      name: "Wastage",
      description: "Expiry/damage write-offs impacting margin.",
      level: 3,
      size: 10,
      color: "#7DD3FC",
      type: "bkg",
    },

    {
      id: "l3_ingredient_rules",
      name: "Ingredient Rules",
      description: "Permissible limits and ingredient compliance requirements.",
      level: 3,
      size: 10,
      color: "#CBD5E1",
      type: "bkg",
    },
    {
      id: "l3_lab_tests",
      name: "Lab Testing",
      description: "Testing protocols and acceptance criteria.",
      level: 3,
      size: 10,
      color: "#CBD5E1",
      type: "bkg",
    },
    {
      id: "l3_licenses",
      name: "Licenses",
      description: "Licensing obligations relevant to product categories.",
      level: 3,
      size: 10,
      color: "#CBD5E1",
      type: "bkg",
    },

    {
      id: "l3_metrology",
      name: "Legal Metrology",
      description: "Rules for pack declarations and measurement compliance.",
      level: 3,
      size: 10,
      color: "#CBD5E1",
      type: "bkg",
    },
    {
      id: "l3_date_coding",
      name: "Date Coding",
      description: "Batch/date code standards and print controls.",
      level: 3,
      size: 10,
      color: "#CBD5E1",
      type: "bkg",
    },

    {
      id: "l3_audits",
      name: "Audits",
      description: "Internal and supplier/co-packer audits.",
      level: 3,
      size: 10,
      color: "#CBD5E1",
      type: "bkg",
    },
    {
      id: "l3_nonconformance",
      name: "Non-conformance",
      description: "Deviation handling and disposition decisions.",
      level: 3,
      size: 10,
      color: "#CBD5E1",
      type: "bkg",
    },
    {
      id: "l3_capa",
      name: "CAPA",
      description: "Corrective and preventive action tracking.",
      level: 3,
      size: 10,
      color: "#CBD5E1",
      type: "bkg",
    },

    {
      id: "l3_batch_trace",
      name: "Batch Traceability",
      description: "Ability to trace affected lots across nodes.",
      level: 3,
      size: 10,
      color: "#CBD5E1",
      type: "bkg",
    },
    {
      id: "l3_complaints",
      name: "Complaint Handling",
      description: "Consumer/trade complaints triage and actioning.",
      level: 3,
      size: 10,
      color: "#CBD5E1",
      type: "bkg",
    },
    {
      id: "l3_recall",
      name: "Recall Workflow",
      description: "Recall execution steps and communications.",
      level: 3,
      size: 10,
      color: "#CBD5E1",
      type: "bkg",
    },

    {
      id: "l3_region",
      name: "Region",
      description: "Region-level ownership unit.",
      level: 3,
      size: 10,
      color: "#E2E8F0",
      type: "bkg",
    },
    {
      id: "l3_state",
      name: "State Cluster",
      description: "State-level planning and governance slice.",
      level: 3,
      size: 10,
      color: "#E2E8F0",
      type: "bkg",
    },
    {
      id: "l3_territory_unit",
      name: "Territory Unit",
      description: "Lowest execution unit for targets and beats.",
      level: 3,
      size: 10,
      color: "#E2E8F0",
      type: "bkg",
    },

    {
      id: "l3_sales_roles",
      name: "Sales Roles",
      description: "Field roles driving GT execution.",
      level: 3,
      size: 10,
      color: "#E2E8F0",
      type: "bkg",
    },
    {
      id: "l3_kam_roles",
      name: "Key Account Roles",
      description: "Roles owning modern trade/institutional execution.",
      level: 3,
      size: 10,
      color: "#E2E8F0",
      type: "bkg",
    },
    {
      id: "l3_planner_roles",
      name: "Planning Roles",
      description: "Demand/supply planners and deployment owners.",
      level: 3,
      size: 10,
      color: "#E2E8F0",
      type: "bkg",
    },

    {
      id: "l3_sales_incent",
      name: "Sales Incentives",
      description: "Incentives tied to volume, distribution and compliance.",
      level: 3,
      size: 10,
      color: "#E2E8F0",
      type: "bkg",
    },
    {
      id: "l3_partner_incent",
      name: "Partner Incentives",
      description:
        "Distributor/retailer incentives for execution and visibility.",
      level: 3,
      size: 10,
      color: "#E2E8F0",
      type: "bkg",
    },

    {
      id: "l3_product_master",
      name: "Product Master",
      description: "SKU, pack, hierarchy and compliance attributes master.",
      level: 3,
      size: 10,
      color: "#E2E8F0",
      type: "bkg",
    },
    {
      id: "l3_customer_master",
      name: "Customer Master",
      description:
        "Distributor/retailer/key account master with terms and mapping.",
      level: 3,
      size: 10,
      color: "#E2E8F0",
      type: "bkg",
    },
    {
      id: "l3_price_master",
      name: "Price Master",
      description: "MRP/PTR/PTD by SKU/state/channel with validity periods.",
      level: 3,
      size: 10,
      color: "#E2E8F0",
      type: "bkg",
    },

    {
      id: "l3_segmentation",
      name: "Segmentation",
      description: "Segmentation schema and segment membership.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },
    {
      id: "l3_preferences",
      name: "Preferences",
      description: "Taste, pack-size, health/value preferences shaping choice.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },
    {
      id: "l3_price_sensitivity",
      name: "Price Sensitivity",
      description: "Elasticity and threshold points by segment.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },

    {
      id: "l3_occasion",
      name: "Occasion",
      description:
        "When/why consumption happens (refreshment, snack, household replenishment).",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },
    {
      id: "l3_mission",
      name: "Shopping Mission",
      description: "Planned vs impulse missions and channel preference.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },

    {
      id: "l3_competitors",
      name: "Competitors",
      description: "Direct competitors and their price/promo posture.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },
    {
      id: "l3_substitutes",
      name: "Substitutes",
      description: "Adjacencies/substitutes that steal share.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },

    {
      id: "l3_state_geo",
      name: "State",
      description:
        "State-level slice impacting tax, pricing and distribution design.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },
    {
      id: "l3_city_class",
      name: "City Class",
      description: "Metro/tier splits driving assortment and service model.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },
    {
      id: "l3_climate_zone",
      name: "Climate Zone",
      description: "Seasonality and weather sensitivity dimension.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },

    {
      id: "l3_festivals",
      name: "Festivals & Events",
      description: "Demand spikes and promo calendars.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },
    {
      id: "l3_weather",
      name: "Weather Sensitivity",
      description: "Temperature/rainfall driven demand effects by category.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },
    {
      id: "l3_availability",
      name: "Availability",
      description:
        "Distribution and in-store availability as a core demand driver.",
      level: 3,
      size: 10,
      color: "#BAE6FD",
      type: "bkg",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    // =========================
    // RCPL -> LEVEL 1
    // =========================
    {
      id: "r1",
      source: "rcpl",
      target: "l1_product",
      type: "HAS_DOMAIN",
      description: "RCPL governs product portfolio and product strategy.",
      linkType: "bkg",
    },
    {
      id: "r2",
      source: "rcpl",
      target: "l1_sales",
      type: "HAS_DOMAIN",
      description: "RCPL manages sell-in and tracks sell-out through partners.",
      linkType: "bkg",
    },
    {
      id: "r3",
      source: "rcpl",
      target: "l1_distribution",
      type: "HAS_DOMAIN",
      description: "RCPL executes route-to-market coverage and service.",
      linkType: "bkg",
    },
    {
      id: "r4",
      source: "rcpl",
      target: "l1_trade",
      type: "HAS_DOMAIN",
      description: "RCPL sets trade pricing, terms, and schemes.",
      linkType: "bkg",
    },
    {
      id: "r5",
      source: "rcpl",
      target: "l1_supply",
      type: "HAS_DOMAIN",
      description:
        "RCPL runs supply chain planning, manufacturing and deployment.",
      linkType: "bkg",
    },
    {
      id: "r6",
      source: "rcpl",
      target: "l1_marketing",
      type: "HAS_DOMAIN",
      description: "RCPL builds consumer pull and trade activation.",
      linkType: "bkg",
    },
    {
      id: "r7",
      source: "rcpl",
      target: "l1_finance",
      type: "HAS_DOMAIN",
      description: "RCPL manages P&L, trade spend, credit and working capital.",
      linkType: "bkg",
    },
    {
      id: "r8",
      source: "rcpl",
      target: "l1_compliance",
      type: "HAS_DOMAIN",
      description:
        "RCPL ensures compliance, quality governance and recall readiness.",
      linkType: "bkg",
    },
    {
      id: "r9",
      source: "rcpl",
      target: "l1_org",
      type: "HAS_DOMAIN",
      description:
        "RCPL operates through org/territory structures and master data.",
      linkType: "bkg",
    },
    {
      id: "r10",
      source: "rcpl",
      target: "l1_market",
      type: "HAS_DOMAIN",
      description: "RCPL decisions are anchored in consumer/market drivers.",
      linkType: "bkg",
    },

    // =========================
    // LEVEL 1 -> LEVEL 2
    // =========================
    {
      id: "p1",
      source: "l1_product",
      target: "l2_brand",
      type: "HAS_SUBDOMAIN",
      description: "Brand portfolio logic and measurement.",
      linkType: "bkg",
    },
    {
      id: "p2",
      source: "l1_product",
      target: "l2_sku_pack",
      type: "HAS_SUBDOMAIN",
      description: "SKU and pack architecture.",
      linkType: "bkg",
    },
    {
      id: "p3",
      source: "l1_product",
      target: "l2_formulation",
      type: "HAS_SUBDOMAIN",
      description: "Formulation and product specifications.",
      linkType: "bkg",
    },
    {
      id: "p4",
      source: "l1_product",
      target: "l2_label_artwork",
      type: "HAS_SUBDOMAIN",
      description: "Labeling and artwork governance.",
      linkType: "bkg",
    },
    {
      id: "p5",
      source: "l1_product",
      target: "l2_category",
      type: "HAS_SUBDOMAIN",
      description: "Category hierarchy used across business.",
      linkType: "bkg",
    },

    {
      id: "s1",
      source: "l1_sales",
      target: "l2_primary_sales",
      type: "HAS_SUBDOMAIN",
      description: "Sell-in and billing flows.",
      linkType: "bkg",
    },
    {
      id: "s2",
      source: "l1_sales",
      target: "l2_secondary_sales",
      type: "HAS_SUBDOMAIN",
      description: "Secondary sales capture and analysis.",
      linkType: "bkg",
    },
    {
      id: "s3",
      source: "l1_sales",
      target: "l2_key_accounts",
      type: "HAS_SUBDOMAIN",
      description: "Key account selling and governance.",
      linkType: "bkg",
    },
    {
      id: "s4",
      source: "l1_sales",
      target: "l2_returns",
      type: "HAS_SUBDOMAIN",
      description: "Returns and claims affecting net sales.",
      linkType: "bkg",
    },
    {
      id: "s5",
      source: "l1_sales",
      target: "l2_sales_planning",
      type: "HAS_SUBDOMAIN",
      description: "Targets and S&OP linkage.",
      linkType: "bkg",
    },

    {
      id: "d1",
      source: "l1_distribution",
      target: "l2_rtm",
      type: "HAS_SUBDOMAIN",
      description: "Channel strategy and RTM design.",
      linkType: "bkg",
    },
    {
      id: "d2",
      source: "l1_distribution",
      target: "l2_partner_network",
      type: "HAS_SUBDOMAIN",
      description: "Distributor/CFA/sub-stockist network.",
      linkType: "bkg",
    },
    {
      id: "d3",
      source: "l1_distribution",
      target: "l2_outlet_universe",
      type: "HAS_SUBDOMAIN",
      description: "Retailer universe and attributes.",
      linkType: "bkg",
    },
    {
      id: "d4",
      source: "l1_distribution",
      target: "l2_coverage",
      type: "HAS_SUBDOMAIN",
      description: "Beat planning and coverage.",
      linkType: "bkg",
    },
    {
      id: "d5",
      source: "l1_distribution",
      target: "l2_service_levels",
      type: "HAS_SUBDOMAIN",
      description: "OTIF/fill/damage metrics.",
      linkType: "bkg",
    },

    {
      id: "t1",
      source: "l1_trade",
      target: "l2_price_arch",
      type: "HAS_SUBDOMAIN",
      description: "MRP corridors and net pricing ladders.",
      linkType: "bkg",
    },
    {
      id: "t2",
      source: "l1_trade",
      target: "l2_trade_terms",
      type: "HAS_SUBDOMAIN",
      description: "PTR/PTD, margins, credit, freight, returns.",
      linkType: "bkg",
    },
    {
      id: "t3",
      source: "l1_trade",
      target: "l2_schemes",
      type: "HAS_SUBDOMAIN",
      description: "Schemes and promotional mechanics.",
      linkType: "bkg",
    },
    {
      id: "t4",
      source: "l1_trade",
      target: "l2_trade_spend",
      type: "HAS_SUBDOMAIN",
      description: "Trade spend controls and ROI.",
      linkType: "bkg",
    },

    {
      id: "sc1",
      source: "l1_supply",
      target: "l2_demand_plan",
      type: "HAS_SUBDOMAIN",
      description: "Forecasting and demand shaping.",
      linkType: "bkg",
    },
    {
      id: "sc2",
      source: "l1_supply",
      target: "l2_supply_plan",
      type: "HAS_SUBDOMAIN",
      description: "Supply planning constrained by capacity/lead times.",
      linkType: "bkg",
    },
    {
      id: "sc3",
      source: "l1_supply",
      target: "l2_manufacturing",
      type: "HAS_SUBDOMAIN",
      description: "Production and co-packing governance.",
      linkType: "bkg",
    },
    {
      id: "sc4",
      source: "l1_supply",
      target: "l2_warehousing",
      type: "HAS_SUBDOMAIN",
      description: "Depots/CFAs, FEFO and accuracy.",
      linkType: "bkg",
    },
    {
      id: "sc5",
      source: "l1_supply",
      target: "l2_logistics",
      type: "HAS_SUBDOMAIN",
      description: "Primary/secondary transport performance.",
      linkType: "bkg",
    },
    {
      id: "sc6",
      source: "l1_supply",
      target: "l2_inventory",
      type: "HAS_SUBDOMAIN",
      description: "Inventory buffers, aging and OOS risk.",
      linkType: "bkg",
    },

    {
      id: "m1",
      source: "l1_marketing",
      target: "l2_brand_strategy",
      type: "HAS_SUBDOMAIN",
      description: "Brand strategy guardrails.",
      linkType: "bkg",
    },
    {
      id: "m2",
      source: "l1_marketing",
      target: "l2_campaigns",
      type: "HAS_SUBDOMAIN",
      description: "Campaign planning and measurement.",
      linkType: "bkg",
    },
    {
      id: "m3",
      source: "l1_marketing",
      target: "l2_activation",
      type: "HAS_SUBDOMAIN",
      description: "Visibility and trade activation.",
      linkType: "bkg",
    },
    {
      id: "m4",
      source: "l1_marketing",
      target: "l2_insights",
      type: "HAS_SUBDOMAIN",
      description: "Consumer insights and feedback loops.",
      linkType: "bkg",
    },
    {
      id: "m5",
      source: "l1_marketing",
      target: "l2_innovation",
      type: "HAS_SUBDOMAIN",
      description: "Innovation and launch playbooks.",
      linkType: "bkg",
    },

    {
      id: "f1",
      source: "l1_finance",
      target: "l2_pl",
      type: "HAS_SUBDOMAIN",
      description: "P&L structure and drivers.",
      linkType: "bkg",
    },
    {
      id: "f2",
      source: "l1_finance",
      target: "l2_wc",
      type: "HAS_SUBDOMAIN",
      description: "Working capital components.",
      linkType: "bkg",
    },
    {
      id: "f3",
      source: "l1_finance",
      target: "l2_credit",
      type: "HAS_SUBDOMAIN",
      description: "Credit and collections.",
      linkType: "bkg",
    },
    {
      id: "f4",
      source: "l1_finance",
      target: "l2_costing",
      type: "HAS_SUBDOMAIN",
      description: "Costing and cost-to-serve.",
      linkType: "bkg",
    },

    {
      id: "c1",
      source: "l1_compliance",
      target: "l2_food_safety",
      type: "HAS_SUBDOMAIN",
      description: "Food safety and standards.",
      linkType: "bkg",
    },
    {
      id: "c2",
      source: "l1_compliance",
      target: "l2_pack_compliance",
      type: "HAS_SUBDOMAIN",
      description: "Pack compliance and declarations.",
      linkType: "bkg",
    },
    {
      id: "c3",
      source: "l1_compliance",
      target: "l2_qms",
      type: "HAS_SUBDOMAIN",
      description: "Quality management system.",
      linkType: "bkg",
    },
    {
      id: "c4",
      source: "l1_compliance",
      target: "l2_trace_recall",
      type: "HAS_SUBDOMAIN",
      description: "Traceability and recall readiness.",
      linkType: "bkg",
    },

    {
      id: "o1",
      source: "l1_org",
      target: "l2_org_units",
      type: "HAS_SUBDOMAIN",
      description: "Org units and territory hierarchy.",
      linkType: "bkg",
    },
    {
      id: "o2",
      source: "l1_org",
      target: "l2_roles",
      type: "HAS_SUBDOMAIN",
      description: "Roles and KPI ownership.",
      linkType: "bkg",
    },
    {
      id: "o3",
      source: "l1_org",
      target: "l2_incentives",
      type: "HAS_SUBDOMAIN",
      description: "Incentives for execution.",
      linkType: "bkg",
    },
    {
      id: "o4",
      source: "l1_org",
      target: "l2_master_data",
      type: "HAS_SUBDOMAIN",
      description: "Master data governance.",
      linkType: "bkg",
    },

    {
      id: "mk1",
      source: "l1_market",
      target: "l2_consumer",
      type: "HAS_SUBDOMAIN",
      description: "Consumer segments and behavior.",
      linkType: "bkg",
    },
    {
      id: "mk2",
      source: "l1_market",
      target: "l2_occasion",
      type: "HAS_SUBDOMAIN",
      description: "Occasions and missions.",
      linkType: "bkg",
    },
    {
      id: "mk3",
      source: "l1_market",
      target: "l2_competition",
      type: "HAS_SUBDOMAIN",
      description: "Competitive context.",
      linkType: "bkg",
    },
    {
      id: "mk4",
      source: "l1_market",
      target: "l2_geo",
      type: "HAS_SUBDOMAIN",
      description: "Geography and seasonality.",
      linkType: "bkg",
    },
    {
      id: "mk5",
      source: "l1_market",
      target: "l2_demand_drivers",
      type: "HAS_SUBDOMAIN",
      description: "Demand drivers for planning.",
      linkType: "bkg",
    },

    // =========================
    // LEVEL 2 -> LEVEL 3
    // =========================
    {
      id: "b1",
      source: "l2_brand",
      target: "l3_positioning",
      type: "DEFINED_BY",
      description: "Brand architecture is defined by positioning.",
      linkType: "bkg",
    },
    {
      id: "b2",
      source: "l2_brand",
      target: "l3_target_segment",
      type: "TARGETS",
      description: "Brand architecture targets consumer segments.",
      linkType: "bkg",
    },
    {
      id: "b3",
      source: "l2_brand",
      target: "l3_price_tier",
      type: "GOVERNED_BY",
      description: "Brand portfolio includes tiering logic.",
      linkType: "bkg",
    },
    {
      id: "b4",
      source: "l2_brand",
      target: "l3_brand_health",
      type: "MEASURED_BY",
      description: "Brand equity is tracked via health metrics.",
      linkType: "bkg",
    },

    {
      id: "sp1",
      source: "l2_sku_pack",
      target: "l3_variant",
      type: "HAS_ATTRIBUTE",
      description: "SKU definitions include variants.",
      linkType: "bkg",
    },
    {
      id: "sp2",
      source: "l2_sku_pack",
      target: "l3_pack_size",
      type: "HAS_ATTRIBUTE",
      description: "SKU pack size drives affordability and corridors.",
      linkType: "bkg",
    },
    {
      id: "sp3",
      source: "l2_sku_pack",
      target: "l3_pack_material",
      type: "HAS_ATTRIBUTE",
      description: "Pack material drives cost and channel fit.",
      linkType: "bkg",
    },
    {
      id: "sp4",
      source: "l2_sku_pack",
      target: "l3_gtin",
      type: "IDENTIFIED_BY",
      description: "SKU is identified via barcode/GTIN.",
      linkType: "bkg",
    },
    {
      id: "sp5",
      source: "l2_sku_pack",
      target: "l3_case_config",
      type: "LOGISTICS_UNIT",
      description: "Case configuration defines handling efficiency.",
      linkType: "bkg",
    },

    {
      id: "fs1",
      source: "l2_formulation",
      target: "l3_ingredients",
      type: "COMPOSED_OF",
      description: "Formulation is composed of ingredients.",
      linkType: "bkg",
    },
    {
      id: "fs2",
      source: "l2_formulation",
      target: "l3_sensory",
      type: "SPECIFIED_BY",
      description: "Formulation includes sensory spec.",
      linkType: "bkg",
    },
    {
      id: "fs3",
      source: "l2_formulation",
      target: "l3_nutrition",
      type: "SPECIFIED_BY",
      description: "Formulation includes nutritional spec.",
      linkType: "bkg",
    },
    {
      id: "fs4",
      source: "l2_formulation",
      target: "l3_shelf_life",
      type: "CONSTRAINED_BY",
      description: "Formulation drives shelf-life and storage constraints.",
      linkType: "bkg",
    },

    {
      id: "la1",
      source: "l2_label_artwork",
      target: "l3_declarations",
      type: "REQUIRES",
      description: "Artwork must satisfy pack declarations.",
      linkType: "bkg",
    },
    {
      id: "la2",
      source: "l2_label_artwork",
      target: "l3_claims",
      type: "CONTROLS",
      description: "Artwork controls claims and substantiation.",
      linkType: "bkg",
    },
    {
      id: "la3",
      source: "l2_label_artwork",
      target: "l3_artwork_approval",
      type: "GOVERNED_BY",
      description: "Artwork changes follow approval workflow.",
      linkType: "bkg",
    },

    {
      id: "ch1",
      source: "l2_category",
      target: "l3_cat",
      type: "HAS_LEVEL",
      description: "Category hierarchy includes category.",
      linkType: "bkg",
    },
    {
      id: "ch2",
      source: "l2_category",
      target: "l3_subcat",
      type: "HAS_LEVEL",
      description: "Category hierarchy includes sub-category.",
      linkType: "bkg",
    },
    {
      id: "ch3",
      source: "l2_category",
      target: "l3_segment",
      type: "HAS_LEVEL",
      description: "Category hierarchy includes segment.",
      linkType: "bkg",
    },

    {
      id: "ps1",
      source: "l2_primary_sales",
      target: "l3_order",
      type: "REALIZED_AS",
      description: "Primary sales are realized via orders.",
      linkType: "bkg",
    },
    {
      id: "ps2",
      source: "l2_primary_sales",
      target: "l3_invoice",
      type: "REALIZED_AS",
      description: "Primary sales are invoiced.",
      linkType: "bkg",
    },
    {
      id: "ps3",
      source: "l2_primary_sales",
      target: "l3_credit_note",
      type: "ADJUSTED_BY",
      description: "Primary sales are adjusted via credit notes.",
      linkType: "bkg",
    },

    {
      id: "ss1",
      source: "l2_secondary_sales",
      target: "l3_sec_sale",
      type: "MEASURED_BY",
      description: "Secondary sales tracked as transactions.",
      linkType: "bkg",
    },
    {
      id: "ss2",
      source: "l2_secondary_sales",
      target: "l3_retailer_universe",
      type: "MAPPED_TO",
      description: "Secondary sales mapped to outlet universe.",
      linkType: "bkg",
    },
    {
      id: "ss3",
      source: "l2_secondary_sales",
      target: "l3_beat_day",
      type: "EXECUTED_VIA",
      description: "Secondary execution follows beat-day plans.",
      linkType: "bkg",
    },

    {
      id: "ka1",
      source: "l2_key_accounts",
      target: "l3_listing",
      type: "GOVERNED_BY",
      description: "Key accounts require listings/assortment.",
      linkType: "bkg",
    },
    {
      id: "ka2",
      source: "l2_key_accounts",
      target: "l3_jbp",
      type: "GOVERNED_BY",
      description: "Key accounts governed by JBPs.",
      linkType: "bkg",
    },
    {
      id: "ka3",
      source: "l2_key_accounts",
      target: "l3_planogram",
      type: "MEASURED_BY",
      description: "Key accounts measure compliance via planograms/visibility.",
      linkType: "bkg",
    },

    {
      id: "re1",
      source: "l2_returns",
      target: "l3_damage_return",
      type: "INCLUDES",
      description: "Returns include damage returns.",
      linkType: "bkg",
    },
    {
      id: "re2",
      source: "l2_returns",
      target: "l3_expiry_return",
      type: "INCLUDES",
      description: "Returns include expiry returns.",
      linkType: "bkg",
    },
    {
      id: "re3",
      source: "l2_returns",
      target: "l3_recall_return",
      type: "INCLUDES",
      description: "Returns include recall returns.",
      linkType: "bkg",
    },

    {
      id: "spn1",
      source: "l2_sales_planning",
      target: "l3_targets",
      type: "DEFINED_BY",
      description: "Sales planning defines targets.",
      linkType: "bkg",
    },
    {
      id: "spn2",
      source: "l2_sales_planning",
      target: "l3_incentive_plan",
      type: "ALIGNED_WITH",
      description: "Sales planning aligned to incentives.",
      linkType: "bkg",
    },
    {
      id: "spn3",
      source: "l2_sales_planning",
      target: "l3_sop_inputs",
      type: "FEEDS",
      description: "Sales assumptions feed S&OP.",
      linkType: "bkg",
    },

    {
      id: "rtm1",
      source: "l2_rtm",
      target: "l3_gt",
      type: "INCLUDES",
      description: "RTM includes general trade.",
      linkType: "bkg",
    },
    {
      id: "rtm2",
      source: "l2_rtm",
      target: "l3_mt",
      type: "INCLUDES",
      description: "RTM includes modern trade.",
      linkType: "bkg",
    },
    {
      id: "rtm3",
      source: "l2_rtm",
      target: "l3_ecomm",
      type: "INCLUDES",
      description: "RTM includes e-commerce.",
      linkType: "bkg",
    },
    {
      id: "rtm4",
      source: "l2_rtm",
      target: "l3_institutional",
      type: "INCLUDES",
      description: "RTM includes institutional.",
      linkType: "bkg",
    },
    {
      id: "rtm5",
      source: "l2_rtm",
      target: "l3_exports",
      type: "INCLUDES",
      description: "RTM includes exports.",
      linkType: "bkg",
    },

    {
      id: "pn1",
      source: "l2_partner_network",
      target: "l3_distributor",
      type: "INCLUDES",
      description: "Partner network includes distributors.",
      linkType: "bkg",
    },
    {
      id: "pn2",
      source: "l2_partner_network",
      target: "l3_cfa",
      type: "INCLUDES",
      description: "Partner network includes CFAs/depots.",
      linkType: "bkg",
    },
    {
      id: "pn3",
      source: "l2_partner_network",
      target: "l3_substockist",
      type: "INCLUDES",
      description: "Partner network includes sub-stockists.",
      linkType: "bkg",
    },

    {
      id: "ou1",
      source: "l2_outlet_universe",
      target: "l3_outlet",
      type: "INCLUDES",
      description: "Outlet universe includes outlets.",
      linkType: "bkg",
    },
    {
      id: "ou2",
      source: "l2_outlet_universe",
      target: "l3_outlet_class",
      type: "CLASSIFIED_AS",
      description: "Outlets are classified into tiers.",
      linkType: "bkg",
    },
    {
      id: "ou3",
      source: "l2_outlet_universe",
      target: "l3_outlet_service",
      type: "SERVED_BY",
      description: "Outlets are served via service models.",
      linkType: "bkg",
    },

    {
      id: "cov1",
      source: "l2_coverage",
      target: "l3_territory",
      type: "USES",
      description: "Coverage planning uses territories.",
      linkType: "bkg",
    },
    {
      id: "cov2",
      source: "l2_coverage",
      target: "l3_beat",
      type: "USES",
      description: "Coverage planning uses beats/routes.",
      linkType: "bkg",
    },
    {
      id: "cov3",
      source: "l2_coverage",
      target: "l3_visit_freq",
      type: "DEFINED_BY",
      description: "Coverage includes visit frequency policies.",
      linkType: "bkg",
    },

    {
      id: "sl1",
      source: "l2_service_levels",
      target: "l3_otif",
      type: "MEASURED_BY",
      description: "Service measured by OTIF.",
      linkType: "bkg",
    },
    {
      id: "sl2",
      source: "l2_service_levels",
      target: "l3_fill_rate",
      type: "MEASURED_BY",
      description: "Service measured by fill rate.",
      linkType: "bkg",
    },
    {
      id: "sl3",
      source: "l2_service_levels",
      target: "l3_damage_rate",
      type: "MEASURED_BY",
      description: "Service measured by damage rate.",
      linkType: "bkg",
    },

    {
      id: "pa1",
      source: "l2_price_arch",
      target: "l3_mrp",
      type: "INCLUDES",
      description: "Price architecture includes MRP.",
      linkType: "bkg",
    },
    {
      id: "pa2",
      source: "l2_price_arch",
      target: "l3_ptr",
      type: "INCLUDES",
      description: "Price architecture includes PTR.",
      linkType: "bkg",
    },
    {
      id: "pa3",
      source: "l2_price_arch",
      target: "l3_ptd",
      type: "INCLUDES",
      description: "Price architecture includes net realization.",
      linkType: "bkg",
    },
    {
      id: "pa4",
      source: "l2_price_arch",
      target: "l3_state_corridor",
      type: "GOVERNED_BY",
      description: "Price architecture governed by state corridors.",
      linkType: "bkg",
    },

    {
      id: "tt1",
      source: "l2_trade_terms",
      target: "l3_margins",
      type: "INCLUDES",
      description: "Trade terms include margins.",
      linkType: "bkg",
    },
    {
      id: "tt2",
      source: "l2_trade_terms",
      target: "l3_credit_days",
      type: "INCLUDES",
      description: "Trade terms include credit days.",
      linkType: "bkg",
    },
    {
      id: "tt3",
      source: "l2_trade_terms",
      target: "l3_returns_policy",
      type: "INCLUDES",
      description: "Trade terms include returns policy.",
      linkType: "bkg",
    },
    {
      id: "tt4",
      source: "l2_trade_terms",
      target: "l3_freight_policy",
      type: "INCLUDES",
      description: "Trade terms include freight policy.",
      linkType: "bkg",
    },

    {
      id: "sch1",
      source: "l2_schemes",
      target: "l3_on_invoice",
      type: "INCLUDES",
      description: "Schemes include on-invoice discounts.",
      linkType: "bkg",
    },
    {
      id: "sch2",
      source: "l2_schemes",
      target: "l3_off_invoice",
      type: "INCLUDES",
      description: "Schemes include off-invoice discounts.",
      linkType: "bkg",
    },
    {
      id: "sch3",
      source: "l2_schemes",
      target: "l3_visibility_incentive",
      type: "INCLUDES",
      description: "Schemes include visibility incentives.",
      linkType: "bkg",
    },
    {
      id: "sch4",
      source: "l2_schemes",
      target: "l3_consumer_promo",
      type: "INCLUDES",
      description: "Schemes include consumer promotions.",
      linkType: "bkg",
    },

    {
      id: "ts1",
      source: "l2_trade_spend",
      target: "l3_accruals",
      type: "CONTROLLED_BY",
      description: "Spend governance controlled by accruals.",
      linkType: "bkg",
    },
    {
      id: "ts2",
      source: "l2_trade_spend",
      target: "l3_claim_validation",
      type: "CONTROLLED_BY",
      description: "Spend governance controlled by claim validation.",
      linkType: "bkg",
    },
    {
      id: "ts3",
      source: "l2_trade_spend",
      target: "l3_leakage",
      type: "CONTROLLED_BY",
      description: "Spend governance controlled by leakage detection.",
      linkType: "bkg",
    },
    {
      id: "ts4",
      source: "l2_trade_spend",
      target: "l3_trade_roi",
      type: "MEASURED_BY",
      description: "Spend governance measured via ROI.",
      linkType: "bkg",
    },

    {
      id: "dp1",
      source: "l2_demand_plan",
      target: "l3_baseline",
      type: "INCLUDES",
      description: "Demand plan includes baseline.",
      linkType: "bkg",
    },
    {
      id: "dp2",
      source: "l2_demand_plan",
      target: "l3_uplift",
      type: "INCLUDES",
      description: "Demand plan includes uplift.",
      linkType: "bkg",
    },
    {
      id: "dp3",
      source: "l2_demand_plan",
      target: "l3_npd_ramp",
      type: "INCLUDES",
      description: "Demand plan includes NPD ramp.",
      linkType: "bkg",
    },
    {
      id: "dp4",
      source: "l2_demand_plan",
      target: "l3_cannibalization",
      type: "INCLUDES",
      description: "Demand plan includes cannibalization logic.",
      linkType: "bkg",
    },

    {
      id: "spc1",
      source: "l2_supply_plan",
      target: "l3_capacity",
      type: "INCLUDES",
      description: "Supply plan includes capacity allocation.",
      linkType: "bkg",
    },
    {
      id: "spc2",
      source: "l2_supply_plan",
      target: "l3_procurement",
      type: "INCLUDES",
      description: "Supply plan includes procurement plan.",
      linkType: "bkg",
    },
    {
      id: "spc3",
      source: "l2_supply_plan",
      target: "l3_deployment",
      type: "INCLUDES",
      description: "Supply plan includes deployment plan.",
      linkType: "bkg",
    },

    {
      id: "mf1",
      source: "l2_manufacturing",
      target: "l3_plant",
      type: "INCLUDES",
      description: "Manufacturing includes sites.",
      linkType: "bkg",
    },
    {
      id: "mf2",
      source: "l2_manufacturing",
      target: "l3_copacker",
      type: "INCLUDES",
      description: "Manufacturing includes co-packers.",
      linkType: "bkg",
    },
    {
      id: "mf3",
      source: "l2_manufacturing",
      target: "l3_qc_gates",
      type: "GOVERNED_BY",
      description: "Manufacturing governed by quality gates.",
      linkType: "bkg",
    },

    {
      id: "wh1",
      source: "l2_warehousing",
      target: "l3_depot",
      type: "INCLUDES",
      description: "Warehousing includes depots/CFAs.",
      linkType: "bkg",
    },
    {
      id: "wh2",
      source: "l2_warehousing",
      target: "l3_fefo",
      type: "GOVERNED_BY",
      description: "Warehousing governed by FEFO.",
      linkType: "bkg",
    },
    {
      id: "wh3",
      source: "l2_warehousing",
      target: "l3_cycle_count",
      type: "CONTROLLED_BY",
      description: "Warehousing accuracy controlled by cycle counts.",
      linkType: "bkg",
    },

    {
      id: "lg1",
      source: "l2_logistics",
      target: "l3_primary_transport",
      type: "INCLUDES",
      description: "Logistics includes primary transport.",
      linkType: "bkg",
    },
    {
      id: "lg2",
      source: "l2_logistics",
      target: "l3_secondary_transport",
      type: "INCLUDES",
      description: "Logistics includes secondary transport.",
      linkType: "bkg",
    },
    {
      id: "lg3",
      source: "l2_logistics",
      target: "l3_pod",
      type: "VALIDATED_BY",
      description: "Deliveries validated by POD.",
      linkType: "bkg",
    },

    {
      id: "inv1",
      source: "l2_inventory",
      target: "l3_safety_stock",
      type: "INCLUDES",
      description: "Inventory health includes safety stock.",
      linkType: "bkg",
    },
    {
      id: "inv2",
      source: "l2_inventory",
      target: "l3_aging",
      type: "INCLUDES",
      description: "Inventory health includes aging/expiry risk.",
      linkType: "bkg",
    },
    {
      id: "inv3",
      source: "l2_inventory",
      target: "l3_oos_risk",
      type: "INCLUDES",
      description: "Inventory health includes OOS risk.",
      linkType: "bkg",
    },
    {
      id: "inv4",
      source: "l2_inventory",
      target: "l3_shrink",
      type: "INCLUDES",
      description: "Inventory health includes shrink/damage.",
      linkType: "bkg",
    },

    {
      id: "bs1",
      source: "l2_brand_strategy",
      target: "l3_message",
      type: "DEFINED_BY",
      description: "Brand strategy defined by messaging.",
      linkType: "bkg",
    },
    {
      id: "bs2",
      source: "l2_brand_strategy",
      target: "l3_assets",
      type: "ENABLED_BY",
      description: "Brand strategy enabled by brand assets.",
      linkType: "bkg",
    },

    {
      id: "cp1",
      source: "l2_campaigns",
      target: "l3_atl",
      type: "INCLUDES",
      description: "Campaigns include ATL.",
      linkType: "bkg",
    },
    {
      id: "cp2",
      source: "l2_campaigns",
      target: "l3_digital",
      type: "INCLUDES",
      description: "Campaigns include digital.",
      linkType: "bkg",
    },
    {
      id: "cp3",
      source: "l2_campaigns",
      target: "l3_btl",
      type: "INCLUDES",
      description: "Campaigns include BTL.",
      linkType: "bkg",
    },

    {
      id: "ac1",
      source: "l2_activation",
      target: "l3_visibility_assets",
      type: "INCLUDES",
      description: "Activation includes visibility assets.",
      linkType: "bkg",
    },
    {
      id: "ac2",
      source: "l2_activation",
      target: "l3_sampling",
      type: "INCLUDES",
      description: "Activation includes sampling.",
      linkType: "bkg",
    },

    {
      id: "in1",
      source: "l2_insights",
      target: "l3_research",
      type: "INCLUDES",
      description: "Insights include research/panels.",
      linkType: "bkg",
    },
    {
      id: "in2",
      source: "l2_insights",
      target: "l3_sentiment",
      type: "INCLUDES",
      description: "Insights include sentiment signals.",
      linkType: "bkg",
    },

    {
      id: "npd1",
      source: "l2_innovation",
      target: "l3_concept_test",
      type: "INCLUDES",
      description: "Innovation includes concept testing.",
      linkType: "bkg",
    },
    {
      id: "npd2",
      source: "l2_innovation",
      target: "l3_launch_playbook",
      type: "INCLUDES",
      description: "Innovation includes launch playbooks.",
      linkType: "bkg",
    },

    {
      id: "pl1",
      source: "l2_pl",
      target: "l3_net_rev",
      type: "INCLUDES",
      description: "P&L includes net revenue.",
      linkType: "bkg",
    },
    {
      id: "pl2",
      source: "l2_pl",
      target: "l3_cogs",
      type: "INCLUDES",
      description: "P&L includes COGS.",
      linkType: "bkg",
    },
    {
      id: "pl3",
      source: "l2_pl",
      target: "l3_trade_spend",
      type: "INCLUDES",
      description: "P&L includes trade spend.",
      linkType: "bkg",
    },
    {
      id: "pl4",
      source: "l2_pl",
      target: "l3_freight",
      type: "INCLUDES",
      description: "P&L includes freight cost.",
      linkType: "bkg",
    },

    {
      id: "wc1",
      source: "l2_wc",
      target: "l3_inv_wc",
      type: "INCLUDES",
      description: "Working capital includes inventory.",
      linkType: "bkg",
    },
    {
      id: "wc2",
      source: "l2_wc",
      target: "l3_ar_wc",
      type: "INCLUDES",
      description: "Working capital includes receivables.",
      linkType: "bkg",
    },
    {
      id: "wc3",
      source: "l2_wc",
      target: "l3_ap_wc",
      type: "INCLUDES",
      description: "Working capital includes payables.",
      linkType: "bkg",
    },

    {
      id: "cr1",
      source: "l2_credit",
      target: "l3_limits",
      type: "CONTROLLED_BY",
      description: "Credit controlled by limits.",
      linkType: "bkg",
    },
    {
      id: "cr2",
      source: "l2_credit",
      target: "l3_dso",
      type: "MEASURED_BY",
      description: "Credit measured by DSO/overdues.",
      linkType: "bkg",
    },
    {
      id: "cr3",
      source: "l2_credit",
      target: "l3_disputes",
      type: "IMPACTED_BY",
      description: "Collections impacted by disputes.",
      linkType: "bkg",
    },

    {
      id: "co1",
      source: "l2_costing",
      target: "l3_bom",
      type: "INCLUDES",
      description: "Costing includes BOM cost.",
      linkType: "bkg",
    },
    {
      id: "co2",
      source: "l2_costing",
      target: "l3_conversion",
      type: "INCLUDES",
      description: "Costing includes conversion cost.",
      linkType: "bkg",
    },
    {
      id: "co3",
      source: "l2_costing",
      target: "l3_cts",
      type: "INCLUDES",
      description: "Costing includes cost-to-serve.",
      linkType: "bkg",
    },
    {
      id: "co4",
      source: "l2_costing",
      target: "l3_waste",
      type: "INCLUDES",
      description: "Costing includes wastage.",
      linkType: "bkg",
    },

    {
      id: "fsf1",
      source: "l2_food_safety",
      target: "l3_ingredient_rules",
      type: "GOVERNED_BY",
      description: "Food safety governed by ingredient rules.",
      linkType: "bkg",
    },
    {
      id: "fsf2",
      source: "l2_food_safety",
      target: "l3_lab_tests",
      type: "VALIDATED_BY",
      description: "Food safety validated by lab tests.",
      linkType: "bkg",
    },
    {
      id: "fsf3",
      source: "l2_food_safety",
      target: "l3_licenses",
      type: "REQUIRES",
      description: "Food safety requires applicable licenses.",
      linkType: "bkg",
    },

    {
      id: "pc1",
      source: "l2_pack_compliance",
      target: "l3_metrology",
      type: "GOVERNED_BY",
      description: "Pack compliance governed by legal metrology.",
      linkType: "bkg",
    },
    {
      id: "pc2",
      source: "l2_pack_compliance",
      target: "l3_date_coding",
      type: "REQUIRES",
      description: "Pack compliance requires date coding.",
      linkType: "bkg",
    },

    {
      id: "q1",
      source: "l2_qms",
      target: "l3_audits",
      type: "INCLUDES",
      description: "QMS includes audits.",
      linkType: "bkg",
    },
    {
      id: "q2",
      source: "l2_qms",
      target: "l3_nonconformance",
      type: "INCLUDES",
      description: "QMS includes non-conformance handling.",
      linkType: "bkg",
    },
    {
      id: "q3",
      source: "l2_qms",
      target: "l3_capa",
      type: "INCLUDES",
      description: "QMS includes CAPA.",
      linkType: "bkg",
    },

    {
      id: "tr1",
      source: "l2_trace_recall",
      target: "l3_batch_trace",
      type: "ENABLED_BY",
      description: "Recall readiness enabled by batch traceability.",
      linkType: "bkg",
    },
    {
      id: "tr2",
      source: "l2_trace_recall",
      target: "l3_complaints",
      type: "TRIGGERED_BY",
      description: "Recall workflows can be triggered by complaints.",
      linkType: "bkg",
    },
    {
      id: "tr3",
      source: "l2_trace_recall",
      target: "l3_recall",
      type: "EXECUTED_AS",
      description: "Recall readiness executed as recall workflow.",
      linkType: "bkg",
    },

    {
      id: "ouu1",
      source: "l2_org_units",
      target: "l3_region",
      type: "HAS_LEVEL",
      description: "Org units include region.",
      linkType: "bkg",
    },
    {
      id: "ouu2",
      source: "l2_org_units",
      target: "l3_state",
      type: "HAS_LEVEL",
      description: "Org units include state cluster.",
      linkType: "bkg",
    },
    {
      id: "ouu3",
      source: "l2_org_units",
      target: "l3_territory_unit",
      type: "HAS_LEVEL",
      description: "Org units include territory unit.",
      linkType: "bkg",
    },

    {
      id: "ro1",
      source: "l2_roles",
      target: "l3_sales_roles",
      type: "INCLUDES",
      description: "Roles include sales roles.",
      linkType: "bkg",
    },
    {
      id: "ro2",
      source: "l2_roles",
      target: "l3_kam_roles",
      type: "INCLUDES",
      description: "Roles include key account roles.",
      linkType: "bkg",
    },
    {
      id: "ro3",
      source: "l2_roles",
      target: "l3_planner_roles",
      type: "INCLUDES",
      description: "Roles include planning roles.",
      linkType: "bkg",
    },

    {
      id: "inc1",
      source: "l2_incentives",
      target: "l3_sales_incent",
      type: "INCLUDES",
      description: "Incentives include sales incentives.",
      linkType: "bkg",
    },
    {
      id: "inc2",
      source: "l2_incentives",
      target: "l3_partner_incent",
      type: "INCLUDES",
      description: "Incentives include partner incentives.",
      linkType: "bkg",
    },

    {
      id: "md1",
      source: "l2_master_data",
      target: "l3_product_master",
      type: "INCLUDES",
      description: "Master data includes product master.",
      linkType: "bkg",
    },
    {
      id: "md2",
      source: "l2_master_data",
      target: "l3_customer_master",
      type: "INCLUDES",
      description: "Master data includes customer master.",
      linkType: "bkg",
    },
    {
      id: "md3",
      source: "l2_master_data",
      target: "l3_price_master",
      type: "INCLUDES",
      description: "Master data includes price master.",
      linkType: "bkg",
    },

    {
      id: "cs1",
      source: "l2_consumer",
      target: "l3_segmentation",
      type: "DEFINED_BY",
      description: "Consumer segments defined by segmentation schema.",
      linkType: "bkg",
    },
    {
      id: "cs2",
      source: "l2_consumer",
      target: "l3_preferences",
      type: "CHARACTERIZED_BY",
      description: "Segments characterized by preferences.",
      linkType: "bkg",
    },
    {
      id: "cs3",
      source: "l2_consumer",
      target: "l3_price_sensitivity",
      type: "CHARACTERIZED_BY",
      description: "Segments characterized by price sensitivity.",
      linkType: "bkg",
    },

    {
      id: "oc1",
      source: "l2_occasion",
      target: "l3_occasion",
      type: "INCLUDES",
      description: "Occasions include consumption occasions.",
      linkType: "bkg",
    },
    {
      id: "oc2",
      source: "l2_occasion",
      target: "l3_mission",
      type: "INCLUDES",
      description: "Occasions include shopping missions.",
      linkType: "bkg",
    },

    {
      id: "cc1",
      source: "l2_competition",
      target: "l3_competitors",
      type: "INCLUDES",
      description: "Competitive context includes competitors.",
      linkType: "bkg",
    },
    {
      id: "cc2",
      source: "l2_competition",
      target: "l3_substitutes",
      type: "INCLUDES",
      description: "Competitive context includes substitutes.",
      linkType: "bkg",
    },

    {
      id: "gg1",
      source: "l2_geo",
      target: "l3_state_geo",
      type: "INCLUDES",
      description: "Geography includes states.",
      linkType: "bkg",
    },
    {
      id: "gg2",
      source: "l2_geo",
      target: "l3_city_class",
      type: "INCLUDES",
      description: "Geography includes city classes.",
      linkType: "bkg",
    },
    {
      id: "gg3",
      source: "l2_geo",
      target: "l3_climate_zone",
      type: "INCLUDES",
      description: "Geography includes climate zones.",
      linkType: "bkg",
    },

    {
      id: "dd1",
      source: "l2_demand_drivers",
      target: "l3_festivals",
      type: "INCLUDES",
      description: "Demand drivers include festivals/events.",
      linkType: "bkg",
    },
    {
      id: "dd2",
      source: "l2_demand_drivers",
      target: "l3_weather",
      type: "INCLUDES",
      description: "Demand drivers include weather sensitivity.",
      linkType: "bkg",
    },
    {
      id: "dd3",
      source: "l2_demand_drivers",
      target: "l3_availability",
      type: "INCLUDES",
      description: "Demand drivers include availability.",
      linkType: "bkg",
    },

    // =========================
    // CROSS-DOMAIN NUANCE (KEY BINDINGS)
    // =========================
    {
      id: "x1",
      source: "l2_schemes",
      target: "l2_secondary_sales",
      type: "VALIDATED_AGAINST",
      description:
        "Scheme effectiveness and eligibility are validated against secondary sales.",
      linkType: "bkg",
    },
    {
      id: "x2",
      source: "l2_trade_terms",
      target: "l2_credit",
      type: "CONSTRAINS",
      description: "Credit days and limits constrain collections risk and DSO.",
      linkType: "bkg",
    },
    {
      id: "x3",
      source: "l2_inventory",
      target: "l2_returns",
      type: "DRIVES",
      description: "Aging/expiry risk drives expiry returns and write-offs.",
      linkType: "bkg",
    },
    {
      id: "x4",
      source: "l2_demand_plan",
      target: "l2_supply_plan",
      type: "DRIVES",
      description: "Demand plan drives supply planning.",
      linkType: "bkg",
    },
    {
      id: "x5",
      source: "l2_rtm",
      target: "l2_sku_pack",
      type: "CONSTRAINS",
      description: "Channel strategy constrains pack and SKU selection.",
      linkType: "bkg",
    },
    {
      id: "x6",
      source: "l2_pack_compliance",
      target: "l2_label_artwork",
      type: "CONSTRAINS",
      description: "Pack compliance rules constrain labeling and artwork.",
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

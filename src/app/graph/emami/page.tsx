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
        "Portfolio structure, SKUs, packs, formulations, claims, lifecycle.",
      level: 1,
      size: 20,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "brand_family",
      name: "Brand Family",
      description:
        "Brand grouping (power brands / long-tail) without naming specific brands.",
      level: 2,
      size: 14,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "category",
      name: "Category",
      description: "Commercial category used for P&L and positioning.",
      level: 2,
      size: 14,
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
      id: "product_line",
      name: "Product Line",
      description: "Line extensions/ranges under a brand family.",
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
      size: 14,
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
        "Pack size/type/case pack; artwork references; labeling specs.",
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
        "Where/why products sell: segments, occasions, geo, competition.",
      level: 1,
      size: 20,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "geo",
      name: "Geo",
      description: "Region → state → district → town/cluster hierarchy.",
      level: 2,
      size: 14,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "consumer_segment",
      name: "Consumer Segment",
      description: "Need-state segments and affordability profiles.",
      level: 2,
      size: 14,
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
      description:
        "Price-pack ladder and affordability banding by channel/geo.",
      level: 2,
      size: 14,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "competitor_set",
      name: "Competitor Set",
      description: "Competitive mapping at sub-category + price band level.",
      level: 2,
      size: 14,
      color: "#10B981",
      type: "bkg",
    },

    /* =========================
       L1: RTM / CHANNEL (AMBER)
       ========================= */
    {
      id: "l1_rtm",
      name: "Route-to-Market",
      description:
        "Channels, distributor network, outlet coverage, key accounts.",
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
      size: 14,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "distributor",
      name: "Distributor",
      description:
        "Primary partner with service area, credit terms, service KPIs.",
      level: 2,
      size: 14,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "territory",
      name: "Territory",
      description: "Sales territory hierarchy aligned to geo coverage.",
      level: 3,
      size: 12,
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
      id: "outlet",
      name: "Outlet",
      description:
        "Retail outlet with type, potential, service frequency, compliance flags.",
      level: 2,
      size: 14,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "key_account",
      name: "Key Account",
      description:
        "Modern trade account with listing, JBPs, trade terms, penalties.",
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
        "Orders, invoices, schemes, returns, collections, off-take visibility.",
      level: 1,
      size: 20,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "sales_order",
      name: "Sales Order",
      description: "Distributor/KA orders with line items and promised dates.",
      level: 2,
      size: 14,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "invoice",
      name: "Invoice",
      description: "Invoicing with price, discounts, GST, freight, terms.",
      level: 2,
      size: 14,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "trade_scheme",
      name: "Trade Scheme",
      description: "Schemes, slabs, display programs, accruals/settlements.",
      level: 2,
      size: 14,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "secondary_sales",
      name: "Secondary Sales",
      description:
        "Distributor→outlet movement/off-take proxy (where available).",
      level: 2,
      size: 14,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "sales_return",
      name: "Return / Expiry",
      description: "Returns, damages, expiries; credit notes; dispositions.",
      level: 2,
      size: 14,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "collections",
      name: "Collections",
      description: "Receivables, aging, disputes, credit control.",
      level: 2,
      size: 14,
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
        "Forecasting, planning, procurement, inventory, warehousing, logistics.",
      level: 1,
      size: 20,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "forecast",
      name: "Forecast",
      description: "SKU×geo×channel forecast with seasonality + promo uplifts.",
      level: 2,
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "sop",
      name: "S&OP",
      description: "Consensus plan linking demand, supply, and inventory.",
      level: 2,
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "supplier",
      name: "Supplier",
      description: "Raw/pack suppliers with lead time, MOQ, quality specs.",
      level: 2,
      size: 14,
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
      description:
        "Primary/secondary packaging; artwork and compliance text dependencies.",
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
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "inventory",
      name: "Inventory",
      description: "On-hand/in-transit/blocked; aging/expiry; valuation basis.",
      level: 2,
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "shipment",
      name: "Shipment",
      description: "Dispatches with route, carrier, POD, damages.",
      level: 2,
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "lane",
      name: "Transport Lane",
      description: "Origin-destination lane with SLA, cost, carrier options.",
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
      size: 14,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "line",
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
      size: 14,
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
      size: 14,
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
        "Campaigns, media, price-pack architecture, consumer feedback loops.",
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
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "media_channel",
      name: "Media Channel",
      description: "TV/digital/OOH/influencer and performance metrics.",
      level: 3,
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "price_pack",
      name: "Price-Pack",
      description: "MRP ladder, promo depth/frequency, channel price rules.",
      level: 2,
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "consumer_feedback",
      name: "Consumer Feedback",
      description: "Complaints/reviews/NPS signals with defect tagging.",
      level: 2,
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "brand_health",
      name: "Brand Health",
      description: "Awareness/consideration/preference/sentiment signals.",
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
      description: "P&L, budgeting, working capital, tax, profitability views.",
      level: 1,
      size: 20,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "pl",
      name: "P&L",
      description:
        "Revenue → GM → EBITDA with cuts by brand/category/channel/geo.",
      level: 2,
      size: 14,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "cogs",
      name: "COGS",
      description: "Material + conversion + freight; yield/loss drivers.",
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
      size: 14,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "working_capital",
      name: "Working Capital",
      description: "Inventory + receivables - payables; cash cycle.",
      level: 2,
      size: 14,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "tax",
      name: "Tax / GST",
      description: "Rates, credits, filings, reconciliations.",
      level: 2,
      size: 14,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "cost_center",
      name: "Cost Center",
      description: "Organizational cost buckets for tracking spends.",
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
      description:
        "Process controls for sales, quality, supply chain, finance.",
      level: 2,
      size: 14,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "audit",
      name: "Audit Finding",
      description: "Audit observations, actions, evidence closure.",
      level: 2,
      size: 14,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "reg_req",
      name: "Regulatory Requirement",
      description:
        "Labeling/claims/packaging rules and category-specific regulations.",
      level: 2,
      size: 14,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "risk",
      name: "Risk Register",
      description:
        "Supply risk, compliance risk, quality risk, reputation risk.",
      level: 2,
      size: 14,
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
        "Org structure, roles, incentives, field execution ownership.",
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
      size: 14,
      color: "#A855F7",
      type: "bkg",
    },
    {
      id: "role",
      name: "Role",
      description:
        "Role definitions (sales, supply, plant ops, finance, marketing).",
      level: 3,
      size: 12,
      color: "#A855F7",
      type: "bkg",
    },
    {
      id: "employee",
      name: "Employee",
      description: "People mapped to org units/territories/targets.",
      level: 3,
      size: 12,
      color: "#A855F7",
      type: "bkg",
    },
    {
      id: "incentive",
      name: "Incentive Plan",
      description: "Targets → payouts for roles/territories.",
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
        "D2C + marketplace presence, catalog, reviews, digital analytics.",
      level: 1,
      size: 20,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "d2c_store",
      name: "D2C Storefront",
      description:
        "Brand-owned storefront with catalog, offers, fulfilment rules.",
      level: 2,
      size: 14,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "listing",
      name: "Marketplace Listing",
      description: "Listing content, price, availability, ratings.",
      level: 3,
      size: 12,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "reviews",
      name: "Ratings & Reviews",
      description: "Review text, sentiment, defect mentions, repeats.",
      level: 3,
      size: 12,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "digital_analytics",
      name: "Digital Analytics",
      description: "Traffic, conversion, ROAS, cohorts, funnel metrics.",
      level: 2,
      size: 14,
      color: "#FB7185",
      type: "bkg",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    /* COMPANY → DOMAINS */
    {
      id: "d1",
      source: "emami",
      target: "l1_product",
      type: "HAS_DOMAIN",
      description: "Owns product portfolio.",
      linkType: "bkg",
    },
    {
      id: "d2",
      source: "emami",
      target: "l1_market",
      type: "HAS_DOMAIN",
      description: "Operates across markets and consumers.",
      linkType: "bkg",
    },
    {
      id: "d3",
      source: "emami",
      target: "l1_rtm",
      type: "HAS_DOMAIN",
      description: "Sells through channels and distribution network.",
      linkType: "bkg",
    },
    {
      id: "d4",
      source: "emami",
      target: "l1_sales",
      type: "HAS_DOMAIN",
      description: "Executes sales and trade.",
      linkType: "bkg",
    },
    {
      id: "d5",
      source: "emami",
      target: "l1_supply",
      type: "HAS_DOMAIN",
      description: "Plans and fulfills demand.",
      linkType: "bkg",
    },
    {
      id: "d6",
      source: "emami",
      target: "l1_mfg",
      type: "HAS_DOMAIN",
      description: "Manufactures and assures quality.",
      linkType: "bkg",
    },
    {
      id: "d7",
      source: "emami",
      target: "l1_mkt",
      type: "HAS_DOMAIN",
      description: "Builds demand through marketing.",
      linkType: "bkg",
    },
    {
      id: "d8",
      source: "emami",
      target: "l1_fin",
      type: "HAS_DOMAIN",
      description: "Manages financial outcomes and controls.",
      linkType: "bkg",
    },
    {
      id: "d9",
      source: "emami",
      target: "l1_gov",
      type: "HAS_DOMAIN",
      description: "Runs governance and compliance.",
      linkType: "bkg",
    },
    {
      id: "d10",
      source: "emami",
      target: "l1_people",
      type: "HAS_DOMAIN",
      description: "Runs org and people systems.",
      linkType: "bkg",
    },
    {
      id: "d11",
      source: "emami",
      target: "l1_digital",
      type: "HAS_DOMAIN",
      description: "Runs digital commerce presence.",
      linkType: "bkg",
    },

    /* PRODUCT */
    {
      id: "p1",
      source: "category",
      target: "sub_category",
      type: "HAS_SUBCATEGORY",
      description: "Category hierarchy.",
      linkType: "bkg",
    },
    {
      id: "p2",
      source: "brand_family",
      target: "product_line",
      type: "HAS_LINE",
      description: "Lines under a brand family.",
      linkType: "bkg",
    },
    {
      id: "p3",
      source: "product_line",
      target: "sku",
      type: "HAS_SKU",
      description: "Sellable SKUs.",
      linkType: "bkg",
    },
    {
      id: "p4",
      source: "sub_category",
      target: "sku",
      type: "GROUPS",
      description: "Sub-category groups SKUs.",
      linkType: "bkg",
    },
    {
      id: "p5",
      source: "sku",
      target: "variant",
      type: "HAS_VARIANT",
      description: "Variant attributes.",
      linkType: "bkg",
    },
    {
      id: "p6",
      source: "sku",
      target: "pack",
      type: "HAS_PACK",
      description: "Pack mapping.",
      linkType: "bkg",
    },
    {
      id: "p7",
      source: "sku",
      target: "formula",
      type: "BUILT_FROM",
      description: "Formula/BOM mapping.",
      linkType: "bkg",
    },
    {
      id: "p8",
      source: "sku",
      target: "claim",
      type: "MAKES_CLAIM",
      description: "Claims mapped to SKUs.",
      linkType: "bkg",
    },
    {
      id: "p9",
      source: "sku",
      target: "lifecycle",
      type: "IN_LIFECYCLE",
      description: "Lifecycle stage.",
      linkType: "bkg",
    },

    /* MARKET & CONSUMER */
    {
      id: "m1",
      source: "consumer_segment",
      target: "need_state",
      type: "HAS_NEED",
      description: "Segments defined by need-states.",
      linkType: "bkg",
    },
    {
      id: "m2",
      source: "need_state",
      target: "occasion",
      type: "EXPRESSED_AS",
      description: "Need-state shows up in occasions.",
      linkType: "bkg",
    },
    {
      id: "m3",
      source: "price_band",
      target: "sku",
      type: "BANDS",
      description: "Maps SKUs into affordability bands.",
      linkType: "bkg",
    },
    {
      id: "m4",
      source: "competitor_set",
      target: "sub_category",
      type: "COMPETES_IN",
      description: "Competitor set defined at sub-category.",
      linkType: "bkg",
    },

    /* RTM */
    {
      id: "r1",
      source: "geo",
      target: "territory",
      type: "HAS_TERRITORY",
      description: "Geo contains territories.",
      linkType: "bkg",
    },
    {
      id: "r2",
      source: "territory",
      target: "beat",
      type: "HAS_BEAT",
      description: "Territory contains beats/routes.",
      linkType: "bkg",
    },
    {
      id: "r3",
      source: "beat",
      target: "outlet",
      type: "COVERS",
      description: "Beat covers outlets.",
      linkType: "bkg",
    },
    {
      id: "r4",
      source: "distributor",
      target: "territory",
      type: "SERVES",
      description: "Distributor serves territory.",
      linkType: "bkg",
    },
    {
      id: "r5",
      source: "outlet",
      target: "channel",
      type: "IN_CHANNEL",
      description: "Outlet belongs to a channel type.",
      linkType: "bkg",
    },
    {
      id: "r6",
      source: "key_account",
      target: "channel",
      type: "PART_OF",
      description: "Key account is part of a channel.",
      linkType: "bkg",
    },

    /* SALES & TRADE */
    {
      id: "s1",
      source: "sales_order",
      target: "distributor",
      type: "ORDERED_BY",
      description: "Primary order placed by distributor (or KA).",
      linkType: "bkg",
    },
    {
      id: "s2",
      source: "sales_order",
      target: "key_account",
      type: "ORDERED_BY",
      description: "Primary order placed by key account (where applicable).",
      linkType: "bkg",
    },
    {
      id: "s3",
      source: "sales_order",
      target: "sku",
      type: "CONTAINS",
      description: "Order lines contain SKUs.",
      linkType: "bkg",
    },
    {
      id: "s4",
      source: "sales_order",
      target: "invoice",
      type: "BILLED_AS",
      description: "Orders billed as invoices.",
      linkType: "bkg",
    },
    {
      id: "s5",
      source: "invoice",
      target: "trade_scheme",
      type: "APPLIES_SCHEME",
      description: "Invoices may apply trade schemes.",
      linkType: "bkg",
    },
    {
      id: "s6",
      source: "secondary_sales",
      target: "distributor",
      type: "SOLD_BY",
      description: "Secondary sales executed by distributor.",
      linkType: "bkg",
    },
    {
      id: "s7",
      source: "secondary_sales",
      target: "outlet",
      type: "SOLD_TO",
      description: "Secondary sales sold to outlets.",
      linkType: "bkg",
    },
    {
      id: "s8",
      source: "secondary_sales",
      target: "sku",
      type: "CONTAINS",
      description: "Secondary sales contain SKUs.",
      linkType: "bkg",
    },
    {
      id: "s9",
      source: "sales_return",
      target: "invoice",
      type: "AGAINST",
      description: "Returns reference invoices/dispatches.",
      linkType: "bkg",
    },
    {
      id: "s10",
      source: "collections",
      target: "invoice",
      type: "COLLECTS_FOR",
      description: "Collections settle invoices.",
      linkType: "bkg",
    },

    /* SUPPLY CHAIN */
    {
      id: "sc1",
      source: "sop",
      target: "forecast",
      type: "CONSUMES",
      description: "S&OP consumes forecast.",
      linkType: "bkg",
    },
    {
      id: "sc2",
      source: "forecast",
      target: "sku",
      type: "FORECASTS",
      description: "Forecast for SKU.",
      linkType: "bkg",
    },
    {
      id: "sc3",
      source: "forecast",
      target: "geo",
      type: "BY_GEO",
      description: "Forecast by geo.",
      linkType: "bkg",
    },
    {
      id: "sc4",
      source: "forecast",
      target: "channel",
      type: "BY_CHANNEL",
      description: "Forecast by channel.",
      linkType: "bkg",
    },
    {
      id: "sc5",
      source: "supplier",
      target: "raw_material",
      type: "SUPPLIES",
      description: "Supplies raw materials.",
      linkType: "bkg",
    },
    {
      id: "sc6",
      source: "supplier",
      target: "pack_material",
      type: "SUPPLIES",
      description: "Supplies packaging materials.",
      linkType: "bkg",
    },
    {
      id: "sc7",
      source: "dc",
      target: "inventory",
      type: "HOLDS",
      description: "DC holds inventory.",
      linkType: "bkg",
    },
    {
      id: "sc8",
      source: "inventory",
      target: "sku",
      type: "OF_SKU",
      description: "Inventory belongs to SKU.",
      linkType: "bkg",
    },
    {
      id: "sc9",
      source: "shipment",
      target: "dc",
      type: "FROM",
      description: "Shipment originates from DC/plant store.",
      linkType: "bkg",
    },
    {
      id: "sc10",
      source: "shipment",
      target: "distributor",
      type: "TO",
      description: "Shipment delivered to distributor (or KA).",
      linkType: "bkg",
    },
    {
      id: "sc11",
      source: "shipment",
      target: "key_account",
      type: "TO",
      description: "Shipment delivered to key account.",
      linkType: "bkg",
    },
    {
      id: "sc12",
      source: "shipment",
      target: "lane",
      type: "USES_LANE",
      description: "Shipment uses a lane.",
      linkType: "bkg",
    },

    /* MANUFACTURING & QUALITY */
    {
      id: "mf1",
      source: "plant",
      target: "line",
      type: "HAS_LINE",
      description: "Plant has production lines.",
      linkType: "bkg",
    },
    {
      id: "mf2",
      source: "plant",
      target: "batch",
      type: "PRODUCES",
      description: "Plant produces batches.",
      linkType: "bkg",
    },
    {
      id: "mf3",
      source: "batch",
      target: "sku",
      type: "OF_SKU",
      description: "Batch corresponds to SKU.",
      linkType: "bkg",
    },
    {
      id: "mf4",
      source: "batch",
      target: "qc_test",
      type: "TESTED_BY",
      description: "QC tests executed on batches.",
      linkType: "bkg",
    },
    {
      id: "mf5",
      source: "qc_test",
      target: "coa",
      type: "GENERATES",
      description: "QC can generate a COA.",
      linkType: "bkg",
    },
    {
      id: "mf6",
      source: "batch",
      target: "deviation",
      type: "MAY_TRIGGER",
      description: "Deviations/CAPA from batch issues.",
      linkType: "bkg",
    },
    {
      id: "mf7",
      source: "rnd",
      target: "formula",
      type: "DEFINES",
      description: "R&D defines formulations.",
      linkType: "bkg",
    },

    /* MARKETING */
    {
      id: "mk1",
      source: "campaign",
      target: "media_channel",
      type: "RUNS_ON",
      description: "Campaign runs on media channels.",
      linkType: "bkg",
    },
    {
      id: "mk2",
      source: "campaign",
      target: "geo",
      type: "TARGETS",
      description: "Campaign targeting by geo.",
      linkType: "bkg",
    },
    {
      id: "mk3",
      source: "campaign",
      target: "consumer_segment",
      type: "TARGETS",
      description: "Campaign targeting by segment.",
      linkType: "bkg",
    },
    {
      id: "mk4",
      source: "campaign",
      target: "brand_health",
      type: "MOVES",
      description: "Campaign influences brand health.",
      linkType: "bkg",
    },
    {
      id: "mk5",
      source: "price_pack",
      target: "sku",
      type: "PRICES",
      description: "Price-pack rules applied to SKUs.",
      linkType: "bkg",
    },
    {
      id: "mk6",
      source: "consumer_feedback",
      target: "sku",
      type: "ABOUT",
      description: "Feedback tied to SKU.",
      linkType: "bkg",
    },
    {
      id: "mk7",
      source: "consumer_feedback",
      target: "batch",
      type: "MAY_REFERENCE",
      description: "Feedback can reference batch/expiry.",
      linkType: "bkg",
    },
    {
      id: "mk8",
      source: "campaign",
      target: "forecast",
      type: "INFLUENCES",
      description: "Campaign creates forecast uplift.",
      linkType: "bkg",
    },

    /* FINANCE */
    {
      id: "f1",
      source: "pl",
      target: "cogs",
      type: "INCLUDES",
      description: "COGS is part of P&L.",
      linkType: "bkg",
    },
    {
      id: "f2",
      source: "budget",
      target: "pl",
      type: "PLANS_FOR",
      description: "Budget plans P&L outcomes.",
      linkType: "bkg",
    },
    {
      id: "f3",
      source: "working_capital",
      target: "inventory",
      type: "INCLUDES",
      description: "Inventory component of WC.",
      linkType: "bkg",
    },
    {
      id: "f4",
      source: "working_capital",
      target: "collections",
      type: "INCLUDES",
      description: "Receivables component of WC.",
      linkType: "bkg",
    },
    {
      id: "f5",
      source: "tax",
      target: "invoice",
      type: "COMPUTED_ON",
      description: "Tax computed on invoices.",
      linkType: "bkg",
    },
    {
      id: "f6",
      source: "cost_center",
      target: "campaign",
      type: "ALLOCATES_COST",
      description: "Marketing spends booked to cost centers.",
      linkType: "bkg",
    },
    {
      id: "f7",
      source: "cost_center",
      target: "plant",
      type: "ALLOCATES_COST",
      description: "Manufacturing costs booked to cost centers.",
      linkType: "bkg",
    },

    /* GOVERNANCE */
    {
      id: "g1",
      source: "policy",
      target: "trade_scheme",
      type: "GOVERNS",
      description: "Controls for scheme definition/approval.",
      linkType: "bkg",
    },
    {
      id: "g2",
      source: "policy",
      target: "qc_test",
      type: "GOVERNS",
      description: "Controls for QC execution and release.",
      linkType: "bkg",
    },
    {
      id: "g3",
      source: "reg_req",
      target: "claim",
      type: "GOVERNS",
      description: "Regulatory rules constrain claims/labeling.",
      linkType: "bkg",
    },
    {
      id: "g4",
      source: "audit",
      target: "policy",
      type: "ASSESSES",
      description: "Audits test policy adherence.",
      linkType: "bkg",
    },
    {
      id: "g5",
      source: "risk",
      target: "supplier",
      type: "COVERS",
      description: "Risk register includes supplier risks.",
      linkType: "bkg",
    },
    {
      id: "g6",
      source: "risk",
      target: "plant",
      type: "COVERS",
      description: "Risk register includes plant/quality risks.",
      linkType: "bkg",
    },

    /* PEOPLE & ORG */
    {
      id: "h1",
      source: "org_unit",
      target: "role",
      type: "HAS_ROLE",
      description: "Roles within org units.",
      linkType: "bkg",
    },
    {
      id: "h2",
      source: "role",
      target: "employee",
      type: "ASSIGNED_TO",
      description: "Employees mapped to roles.",
      linkType: "bkg",
    },
    {
      id: "h3",
      source: "employee",
      target: "territory",
      type: "OWNS",
      description: "Field ownership of territories.",
      linkType: "bkg",
    },
    {
      id: "h4",
      source: "incentive",
      target: "employee",
      type: "PAYS_OUT_TO",
      description: "Incentives paid to employees.",
      linkType: "bkg",
    },

    /* DIGITAL COMMERCE */
    {
      id: "dc1",
      source: "d2c_store",
      target: "sku",
      type: "SELLS",
      description: "D2C sells SKUs.",
      linkType: "bkg",
    },
    {
      id: "dc2",
      source: "listing",
      target: "sku",
      type: "LISTS",
      description: "Marketplace listing maps to SKU.",
      linkType: "bkg",
    },
    {
      id: "dc3",
      source: "reviews",
      target: "listing",
      type: "ABOUT",
      description: "Reviews tied to listing.",
      linkType: "bkg",
    },
    {
      id: "dc4",
      source: "digital_analytics",
      target: "campaign",
      type: "MEASURES",
      description: "Digital analytics measures campaign impact.",
      linkType: "bkg",
    },
    {
      id: "dc5",
      source: "digital_analytics",
      target: "d2c_store",
      type: "MEASURES",
      description: "Digital analytics measures storefront funnel.",
      linkType: "bkg",
    },
    {
      id: "dc6",
      source: "shipment",
      target: "d2c_store",
      type: "FULFILLS",
      description: "Shipments fulfill D2C demand via warehouse network.",
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

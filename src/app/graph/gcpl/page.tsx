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
      id: "gcpl",
      name: "GCPL",
      description:
        "FMCG enterprise operating through brands, RTM, trade execution, supply chain, marketing and finance.",
      size: 30,
      color: "#0F172A",
      type: "bkg",
      width: 240,
      height: 56,
    },

    /* =========================
       LEVEL 1 (L1): HOW GCPL WORKS
       ========================= */

    {
      id: "l1_portfolio",
      name: "Portfolio & Growth Choices",
      description:
        "Where to play and how to win: categories, brands, pack-price architecture, growth bets by market.",
      size: 22,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l1_rtm",
      name: "Route-to-Market (RTM)",
      description:
        "Coverage model across GT/MT/eCom; distributor design, channel roles, service levels and execution cadence.",
      size: 22,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "l1_commercial",
      name: "Commercial Engine (Sales + Trade)",
      description:
        "Primary + secondary movement; schemes/discounts; returns/claims; targets and execution KPIs.",
      size: 22,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "l1_marketing",
      name: "Marketing & Demand Generation",
      description:
        "Campaigns, media, consumer activations, and measurement linked to business outcomes.",
      size: 22,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "l1_supply",
      name: "Supply Chain & Fulfillment",
      description:
        "Forecast → plan → produce → stock → deliver; inventory health and service levels.",
      size: 22,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "l1_finance",
      name: "Finance & Performance Management",
      description:
        "NSV/GM, promo accruals, working capital, budgets/forecasts, and control metrics.",
      size: 22,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "l1_governance",
      name: "Governance, Master Data & Controls",
      description:
        "Master data, KPI definitions, approvals, auditability, and standardization.",
      size: 22,
      color: "#84CC16",
      type: "bkg",
    },

    /* =========================
       LEVEL 2 (L2): KEY SUB-SYSTEMS
       ========================= */

    {
      id: "l2_category",
      name: "Category Strategy",
      description:
        "Category sizing, priorities, innovation/renovation choices, and white-space identification.",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l2_brand_mgmt",
      name: "Brand Management",
      description:
        "Brand plans, positioning, portfolio roles, and brand-level scorecards.",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l2_sku_portfolio",
      name: "SKU Portfolio",
      description:
        "SKU master, packs, lifecycle, profitability and assortment strategy.",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l2_price_pack",
      name: "Price-Pack Architecture",
      description:
        "MRP/PTR/PTD, discount guardrails, mix management and price changes.",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },

    {
      id: "l2_channels",
      name: "Channel Strategy",
      description:
        "GT/MT/eCom roles, assortment by channel, service levels and trade terms.",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "l2_distributors",
      name: "Distributor Management",
      description:
        "Distributor appointment, performance, credit, claims, and compliance.",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "l2_outlet_universe",
      name: "Outlet Universe & Coverage",
      description:
        "Outlet master (where available), segmentation, potential and coverage planning.",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },

    {
      id: "l2_primary",
      name: "Primary Sales (Sell-in)",
      description:
        "Company → distributor/customer invoices/dispatches; channel fill and revenue view.",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "l2_secondary",
      name: "Secondary Sales (Sell-out / Proxy)",
      description:
        "Distributor → retail/offtake (or proxies); often lag-aligned to primary.",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "l2_trade_promo",
      name: "Trade Promotions & Schemes",
      description:
        "Scheme design, eligibility, claims, accruals and effectiveness measurement.",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "l2_returns",
      name: "Returns & Claims",
      description:
        "Returns, damages/expiry, deductions and settlements impacting net sales.",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "l2_field_exec",
      name: "Field Execution",
      description:
        "Targets, beat plans, visibility, assortment compliance and on-ground KPIs.",
      size: 16,
      color: "#A855F7",
      type: "bkg",
    },

    {
      id: "l2_campaigns",
      name: "Campaigns & Media",
      description:
        "Campaign calendar, spends, creatives, channel mix and measurement.",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "l2_consumer_insights",
      name: "Consumer & Market Insights",
      description:
        "Insights, category trends, competitive moves and share tracking.",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },

    {
      id: "l2_demand_plan",
      name: "Demand Planning",
      description:
        "Forecasts by SKU×geo×channel; overrides for seasonality, schemes and launches.",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "l2_inventory",
      name: "Inventory & Deployment",
      description:
        "On-hand/in-transit, aging, safety stocks, redistribution and service levels.",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "l2_manufacturing",
      name: "Manufacturing & Quality",
      description:
        "Production, yields, batch traceability, QA/QC and non-conformance loops.",
      size: 16,
      color: "#EF4444",
      type: "bkg",
    },

    {
      id: "l2_revenue_margin",
      name: "NSV & Gross Margin",
      description:
        "Volume/price/mix, net sales, margin bridge and promo impacts.",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "l2_working_capital",
      name: "Working Capital",
      description: "AR/AP + inventory; cash conversion cycle levers.",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "l2_fpna",
      name: "FP&A (Plans & Forecasts)",
      description: "AOP, rolling forecasts, scenarios and variance analysis.",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "l2_master_data",
      name: "Master Data (Product/Customer/Geo)",
      description: "Hierarchies, mappings, codes and standardization rules.",
      size: 16,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "l2_kpi_book",
      name: "KPI & Metric Dictionary",
      description: "Definitions and calculation logic used across teams.",
      size: 16,
      color: "#84CC16",
      type: "bkg",
    },

    /* =========================
       LEVEL 3 (L3): LEAF NODES (WHAT SHOWS UP IN DATA/REPORTING)
       ========================= */

    {
      id: "l3_category_hierarchy",
      name: "Category Hierarchy",
      description: "Category → subcategory → segment mapping used for rollups.",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l3_brand_hierarchy",
      name: "Brand Hierarchy",
      description: "Brand → sub-brand/range mapping for reporting.",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l3_sku_master",
      name: "SKU Master Attributes",
      description:
        "Pack size, variant, launch date, status, GST/HSN (where relevant).",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "l3_price_list",
      name: "Price Lists (MRP/PTR/PTD)",
      description: "Price lists and effective dates across channels/markets.",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },

    {
      id: "l3_geo_hierarchy",
      name: "Geo Hierarchy",
      description: "Country/zone/state/city/territory mapping.",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "l3_channel_master",
      name: "Channel Master",
      description: "GT/MT/eCom and sub-channel taxonomy.",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "l3_customer_master",
      name: "Customer/Distributor Master",
      description: "Customer codes, hierarchy, terms, credit limits.",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "l3_outlet_attributes",
      name: "Outlet Attributes",
      description:
        "Outlet type, cluster, potential, and coverage status (if available).",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },

    {
      id: "l3_primary_invoices",
      name: "Primary Invoices/Dispatch",
      description: "Invoice value/units, dates, customer, SKU, geo, channel.",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "l3_secondary_movement",
      name: "Secondary Movement",
      description:
        "Sell-out units/value by SKU, geo, channel; lag alignment metadata.",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "l3_returns_txn",
      name: "Returns Transactions",
      description: "Returns reason codes, quantities, values, settlements.",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },

    {
      id: "l3_scheme_calendar",
      name: "Scheme Calendar",
      description:
        "Scheme start/end dates, eligibility, slabs, applicable SKUs/geos/channels.",
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "l3_scheme_flags",
      name: "Scheme Flags on Sales",
      description: "Promo flags and realized discounts linked to sales lines.",
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "l3_promo_roi",
      name: "Promo ROI Outputs",
      description:
        "Uplift, incrementality, base-lift decomposition, leakage signals.",
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },

    {
      id: "l3_campaign_spend",
      name: "Campaign Spend",
      description: "Spend by campaign, channel, period with metadata.",
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "l3_media_flights",
      name: "Media Flights",
      description:
        "Flight dates, creatives, impressions/reach (where tracked).",
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },

    {
      id: "l3_forecast",
      name: "Forecast (SKU×Geo×Channel)",
      description: "Forecast versions, overrides, and assumptions.",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "l3_inventory_position",
      name: "Inventory Positions",
      description: "On-hand/in-transit by location; aging and stock health.",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "l3_production_batches",
      name: "Production/Batches",
      description:
        "Production quantities, yields, batch traceability, QC status.",
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },

    {
      id: "l3_nsv",
      name: "NSV (Net Sales Value)",
      description:
        "Net sales after discounts/schemes; standard profitability lens.",
      size: 12,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "l3_gm",
      name: "Gross Margin",
      description: "GM and bridges by brand/category/geo/channel.",
      size: 12,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "l3_wc_metrics",
      name: "Working Capital Metrics",
      description: "AR/AP aging, inventory days, cash conversion views.",
      size: 12,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "l3_metric_defs",
      name: "Metric Definitions",
      description: "Calculation logic, filters, time-grain normalization.",
      size: 12,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "l3_dim_mappings",
      name: "Dimension Mappings",
      description: "Cross-system mapping tables (SKU/customer/geo) for joins.",
      size: 12,
      color: "#84CC16",
      type: "bkg",
    },

    /* =========================
       DATA SOURCES
       ========================= */

    {
      id: "src_databricks",
      name: "Databricks (GCPL Lakehouse)",
      description:
        "Internal curated tables: sales, margins, promo flags, returns, inventory, hierarchies.",
      size: 18,
      color: "#94A3B8",
      type: "source",
      width: 260,
      height: 48,
    },
    {
      id: "src_nielsen_kantar",
      name: "Nielsen / Kantar",
      description:
        "Syndicated market data: category size, market share, distribution and price indices, competitive benchmarks.",
      size: 18,
      color: "#94A3B8",
      type: "source",
      width: 260,
      height: 48,
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    /* ---------- L0 -> L1 ---------- */
    {
      id: "b_gcpl_l1_portfolio",
      source: "gcpl",
      target: "l1_portfolio",
      type: "operates_through",
      description:
        "Enterprise strategy flows through portfolio and growth choices.",
      linkType: "bkg",
    },
    {
      id: "b_gcpl_l1_rtm",
      source: "gcpl",
      target: "l1_rtm",
      type: "executes_via",
      description: "Go-to-market execution flows through RTM.",
      linkType: "bkg",
    },
    {
      id: "b_gcpl_l1_commercial",
      source: "gcpl",
      target: "l1_commercial",
      type: "measured_by",
      description: "Commercial engine measures movement and trade levers.",
      linkType: "bkg",
    },
    {
      id: "b_gcpl_l1_marketing",
      source: "gcpl",
      target: "l1_marketing",
      type: "drives",
      description: "Marketing drives consumer demand and brand salience.",
      linkType: "bkg",
    },
    {
      id: "b_gcpl_l1_supply",
      source: "gcpl",
      target: "l1_supply",
      type: "fulfills",
      description: "Supply chain fulfills demand created by RTM/marketing.",
      linkType: "bkg",
    },
    {
      id: "b_gcpl_l1_finance",
      source: "gcpl",
      target: "l1_finance",
      type: "governed_by",
      description: "Performance is consolidated and governed via finance.",
      linkType: "bkg",
    },
    {
      id: "b_gcpl_l1_governance",
      source: "gcpl",
      target: "l1_governance",
      type: "standardizes",
      description:
        "Masters, KPIs and controls are standardized via governance.",
      linkType: "bkg",
    },

    /* ---------- L1 -> L2 ---------- */
    {
      id: "b_l1_portfolio_l2_category",
      source: "l1_portfolio",
      target: "l2_category",
      type: "includes",
      description: "Portfolio includes category strategy.",
      linkType: "bkg",
    },
    {
      id: "b_l1_portfolio_l2_brand",
      source: "l1_portfolio",
      target: "l2_brand_mgmt",
      type: "includes",
      description: "Portfolio includes brand management.",
      linkType: "bkg",
    },
    {
      id: "b_l1_portfolio_l2_sku",
      source: "l1_portfolio",
      target: "l2_sku_portfolio",
      type: "includes",
      description: "Portfolio includes SKU portfolio decisions.",
      linkType: "bkg",
    },
    {
      id: "b_l1_portfolio_l2_pricepack",
      source: "l1_portfolio",
      target: "l2_price_pack",
      type: "governed_by",
      description:
        "Portfolio execution is governed by price-pack architecture.",
      linkType: "bkg",
    },

    {
      id: "b_l1_rtm_l2_channels",
      source: "l1_rtm",
      target: "l2_channels",
      type: "includes",
      description: "RTM includes channel strategy.",
      linkType: "bkg",
    },
    {
      id: "b_l1_rtm_l2_dist",
      source: "l1_rtm",
      target: "l2_distributors",
      type: "includes",
      description: "RTM includes distributor management.",
      linkType: "bkg",
    },
    {
      id: "b_l1_rtm_l2_outlets",
      source: "l1_rtm",
      target: "l2_outlet_universe",
      type: "includes",
      description: "RTM includes outlet universe and coverage.",
      linkType: "bkg",
    },

    {
      id: "b_l1_comm_l2_primary",
      source: "l1_commercial",
      target: "l2_primary",
      type: "includes",
      description: "Commercial engine includes primary sales.",
      linkType: "bkg",
    },
    {
      id: "b_l1_comm_l2_secondary",
      source: "l1_commercial",
      target: "l2_secondary",
      type: "includes",
      description: "Commercial engine includes secondary sales.",
      linkType: "bkg",
    },
    {
      id: "b_l1_comm_l2_tradepromo",
      source: "l1_commercial",
      target: "l2_trade_promo",
      type: "includes",
      description: "Commercial engine includes trade promotions.",
      linkType: "bkg",
    },
    {
      id: "b_l1_comm_l2_returns",
      source: "l1_commercial",
      target: "l2_returns",
      type: "includes",
      description: "Commercial engine includes returns and claims.",
      linkType: "bkg",
    },
    {
      id: "b_l1_comm_l2_field",
      source: "l1_commercial",
      target: "l2_field_exec",
      type: "executed_by",
      description: "Commercial outcomes are executed by field teams.",
      linkType: "bkg",
    },

    {
      id: "b_l1_mkt_l2_campaigns",
      source: "l1_marketing",
      target: "l2_campaigns",
      type: "runs",
      description: "Marketing is executed through campaigns and media.",
      linkType: "bkg",
    },
    {
      id: "b_l1_mkt_l2_insights",
      source: "l1_marketing",
      target: "l2_consumer_insights",
      type: "informed_by",
      description: "Marketing is informed by consumer and market insights.",
      linkType: "bkg",
    },

    {
      id: "b_l1_supply_l2_demand",
      source: "l1_supply",
      target: "l2_demand_plan",
      type: "includes",
      description: "Supply chain includes demand planning.",
      linkType: "bkg",
    },
    {
      id: "b_l1_supply_l2_inventory",
      source: "l1_supply",
      target: "l2_inventory",
      type: "includes",
      description: "Supply chain includes inventory and deployment.",
      linkType: "bkg",
    },
    {
      id: "b_l1_supply_l2_mfg",
      source: "l1_supply",
      target: "l2_manufacturing",
      type: "includes",
      description: "Supply chain includes manufacturing and quality.",
      linkType: "bkg",
    },

    {
      id: "b_l1_fin_l2_rev",
      source: "l1_finance",
      target: "l2_revenue_margin",
      type: "includes",
      description: "Finance includes NSV and gross margin tracking.",
      linkType: "bkg",
    },
    {
      id: "b_l1_fin_l2_wc",
      source: "l1_finance",
      target: "l2_working_capital",
      type: "includes",
      description: "Finance includes working capital management.",
      linkType: "bkg",
    },
    {
      id: "b_l1_fin_l2_fpna",
      source: "l1_finance",
      target: "l2_fpna",
      type: "includes",
      description: "Finance includes planning and forecasting.",
      linkType: "bkg",
    },

    {
      id: "b_l1_gov_l2_master",
      source: "l1_governance",
      target: "l2_master_data",
      type: "owns",
      description: "Governance owns master data and mappings.",
      linkType: "bkg",
    },
    {
      id: "b_l1_gov_l2_kpi",
      source: "l1_governance",
      target: "l2_kpi_book",
      type: "defines",
      description: "Governance defines KPI dictionary.",
      linkType: "bkg",
    },

    /* ---------- L2 -> L3 ---------- */
    {
      id: "b_l2_category_l3_hier",
      source: "l2_category",
      target: "l3_category_hierarchy",
      type: "uses",
      description: "Category strategy uses category hierarchy for rollups.",
      linkType: "bkg",
    },
    {
      id: "b_l2_brand_l3_hier",
      source: "l2_brand_mgmt",
      target: "l3_brand_hierarchy",
      type: "uses",
      description: "Brand management uses brand hierarchy.",
      linkType: "bkg",
    },
    {
      id: "b_l2_sku_l3_master",
      source: "l2_sku_portfolio",
      target: "l3_sku_master",
      type: "defined_by",
      description: "SKU portfolio is defined via SKU master attributes.",
      linkType: "bkg",
    },
    {
      id: "b_l2_price_l3_list",
      source: "l2_price_pack",
      target: "l3_price_list",
      type: "maintained_as",
      description:
        "Price-pack is maintained as price lists with effective dates.",
      linkType: "bkg",
    },

    {
      id: "b_l2_channels_l3_chan",
      source: "l2_channels",
      target: "l3_channel_master",
      type: "defined_by",
      description: "Channel strategy uses channel master taxonomy.",
      linkType: "bkg",
    },
    {
      id: "b_l2_dist_l3_customer",
      source: "l2_distributors",
      target: "l3_customer_master",
      type: "defined_by",
      description:
        "Distributor management depends on customer/distributor master.",
      linkType: "bkg",
    },
    {
      id: "b_l2_outlets_l3_outlet_attr",
      source: "l2_outlet_universe",
      target: "l3_outlet_attributes",
      type: "described_by",
      description:
        "Outlet universe is described by outlet attributes (where available).",
      linkType: "bkg",
    },
    {
      id: "b_l2_outlets_l3_geo",
      source: "l2_outlet_universe",
      target: "l3_geo_hierarchy",
      type: "mapped_by",
      description: "Outlet universe is mapped onto geo hierarchy.",
      linkType: "bkg",
    },

    {
      id: "b_l2_primary_l3_inv",
      source: "l2_primary",
      target: "l3_primary_invoices",
      type: "recorded_as",
      description:
        "Primary sales are recorded as invoice/dispatch transactions.",
      linkType: "bkg",
    },
    {
      id: "b_l2_secondary_l3_move",
      source: "l2_secondary",
      target: "l3_secondary_movement",
      type: "recorded_as",
      description:
        "Secondary sales are recorded as movement at SKU×geo×channel.",
      linkType: "bkg",
    },
    {
      id: "b_l2_returns_l3_ret",
      source: "l2_returns",
      target: "l3_returns_txn",
      type: "recorded_as",
      description: "Returns are recorded as return transactions with reasons.",
      linkType: "bkg",
    },

    {
      id: "b_l2_tradepromo_l3_cal",
      source: "l2_trade_promo",
      target: "l3_scheme_calendar",
      type: "planned_as",
      description: "Trade promos are planned via scheme calendars and rules.",
      linkType: "bkg",
    },
    {
      id: "b_l2_tradepromo_l3_flags",
      source: "l2_trade_promo",
      target: "l3_scheme_flags",
      type: "observed_in",
      description:
        "Promo realization appears as scheme flags/discounts on sales.",
      linkType: "bkg",
    },
    {
      id: "b_l2_tradepromo_l3_roi",
      source: "l2_trade_promo",
      target: "l3_promo_roi",
      type: "measured_as",
      description: "Promo effectiveness outputs are computed as ROI metrics.",
      linkType: "bkg",
    },

    {
      id: "b_l2_campaigns_l3_spend",
      source: "l2_campaigns",
      target: "l3_campaign_spend",
      type: "recorded_as",
      description: "Campaigns are recorded as spends.",
      linkType: "bkg",
    },
    {
      id: "b_l2_campaigns_l3_flights",
      source: "l2_campaigns",
      target: "l3_media_flights",
      type: "scheduled_as",
      description: "Campaigns are scheduled as media flights.",
      linkType: "bkg",
    },

    {
      id: "b_l2_demand_l3_fcst",
      source: "l2_demand_plan",
      target: "l3_forecast",
      type: "produces",
      description: "Demand planning produces forecast series and versions.",
      linkType: "bkg",
    },
    {
      id: "b_l2_inventory_l3_pos",
      source: "l2_inventory",
      target: "l3_inventory_position",
      type: "measured_as",
      description: "Inventory is measured as positions and aging by location.",
      linkType: "bkg",
    },
    {
      id: "b_l2_mfg_l3_batch",
      source: "l2_manufacturing",
      target: "l3_production_batches",
      type: "tracked_as",
      description: "Manufacturing is tracked as production/batch records.",
      linkType: "bkg",
    },

    {
      id: "b_l2_rev_l3_nsv",
      source: "l2_revenue_margin",
      target: "l3_nsv",
      type: "computed_as",
      description: "Revenue management produces NSV outputs.",
      linkType: "bkg",
    },
    {
      id: "b_l2_rev_l3_gm",
      source: "l2_revenue_margin",
      target: "l3_gm",
      type: "computed_as",
      description: "Revenue management produces GM outputs.",
      linkType: "bkg",
    },
    {
      id: "b_l2_wc_l3_wc",
      source: "l2_working_capital",
      target: "l3_wc_metrics",
      type: "tracked_as",
      description: "Working capital is tracked via aging and days metrics.",
      linkType: "bkg",
    },

    {
      id: "b_l2_master_l3_geo",
      source: "l2_master_data",
      target: "l3_geo_hierarchy",
      type: "includes",
      description: "Master data includes geo hierarchy.",
      linkType: "bkg",
    },
    {
      id: "b_l2_master_l3_dim",
      source: "l2_master_data",
      target: "l3_dim_mappings",
      type: "maintains",
      description: "Master data maintains cross-system dimension mappings.",
      linkType: "bkg",
    },
    {
      id: "b_l2_kpi_l3_defs",
      source: "l2_kpi_book",
      target: "l3_metric_defs",
      type: "documents",
      description: "KPI book documents metric definitions.",
      linkType: "bkg",
    },

    /* ---------- DATA LINKS (SOURCES -> BKG/LEAVES) ---------- */

    {
      id: "d_dbx_primary_invoices",
      source: "src_databricks",
      target: "l3_primary_invoices",
      type: "contains",
      description:
        "Primary invoice/dispatch facts at SKU×customer×geo×time grain (daily/monthly).",
      linkType: "data",
      nlQuery:
        "Primary sales value and units by SKU and state for last 12 months",
      dataContext:
        "Databricks internal curated sales tables; typical grain daily/monthly; dims include SKU, geo, channel/customer.",
    },
    {
      id: "d_dbx_secondary_movement",
      source: "src_databricks",
      target: "l3_secondary_movement",
      type: "contains",
      description:
        "Secondary sell-out/proxy movement at SKU×geo×channel with primary-to-secondary lag considerations.",
      linkType: "data",
      nlQuery: "Secondary sales trend for top SKUs in South zone vs last year",
      dataContext:
        "Databricks sell-out/proxy; requires like-to-like and lag alignment vs primary.",
    },
    {
      id: "d_dbx_scheme_calendar",
      source: "src_databricks",
      target: "l3_scheme_calendar",
      type: "contains",
      description:
        "Scheme definitions: dates, slabs, eligibility, applicability (SKU/geo/channel).",
      linkType: "data",
      nlQuery: "List active schemes this month for Brand X in Maharashtra GT",
      dataContext:
        "Databricks trade-promo tables; scheme metadata + mapping tables.",
    },
    {
      id: "d_dbx_scheme_flags",
      source: "src_databricks",
      target: "l3_scheme_flags",
      type: "contains",
      description:
        "Promo/scheme flags and realized discounts tagged to sales lines.",
      linkType: "data",
      nlQuery: "Sales under scheme vs without scheme for Brand X last quarter",
      dataContext:
        "Databricks sales fact lines joined to promo flags/discounts; used for uplift and leakage.",
    },
    {
      id: "d_dbx_returns",
      source: "src_databricks",
      target: "l3_returns_txn",
      type: "contains",
      description:
        "Returns and claims transactions with reason codes and settlements.",
      linkType: "data",
      nlQuery: "Returns rate by SKU and state last 6 months with top reasons",
      dataContext:
        "Databricks returns/claims tables; often linked to sales invoice lines.",
    },
    {
      id: "d_dbx_inventory",
      source: "src_databricks",
      target: "l3_inventory_position",
      type: "contains",
      description:
        "Inventory positions and aging by location (DC/warehouse) and SKU.",
      linkType: "data",
      nlQuery: "Inventory aging buckets for top 50 SKUs in West zone DCs",
      dataContext:
        "Databricks inventory tables; includes on-hand/in-transit and aging.",
    },
    {
      id: "d_dbx_nsv_gm",
      source: "src_databricks",
      target: "l3_nsv",
      type: "computes_or_stores",
      description:
        "Net sales value (NSV) computed/stored from gross sales less discounts/schemes/returns as per internal logic.",
      linkType: "data",
      nlQuery: "NSV by brand and state for FY25 YTD",
      dataContext:
        "Databricks sales + promo + returns joined or curated NSV tables; aligns with finance definitions.",
    },
    {
      id: "d_dbx_gm",
      source: "src_databricks",
      target: "l3_gm",
      type: "computes_or_stores",
      description:
        "Gross margin computed/stored by SKU/brand/geo/channel with cost logic and promo impacts.",
      linkType: "data",
      nlQuery:
        "Gross margin % by brand for last 12 months with mix/price/volume bridge",
      dataContext:
        "Databricks margin tables or curated calculations combining net sales with standard/actual cost components.",
    },
    {
      id: "d_nk_market_share",
      source: "src_nielsen_kantar",
      target: "l2_consumer_insights",
      type: "provides",
      description:
        "Market share/category growth/competitive benchmarks used for market pulse and brand choices.",
      linkType: "data",
      nlQuery: "Market share trend for category by quarter and region",
      dataContext:
        "Nielsen/Kantar syndicated measurement; usually periodic (monthly/quarterly) with category/region cuts.",
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

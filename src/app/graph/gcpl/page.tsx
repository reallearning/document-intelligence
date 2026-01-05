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
      name: "GCPL (Enterprise)",
      description: "enterprise • L0 • group:root",
      size: 30,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "gcpl_operating_model",
      name: "Operating Model & Governance",
      description:
        "domain • L1 • under GCPL (Enterprise) • group:operating_model",
      size: 22,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "gcpl_cadences",
      name: "Cadences & Processes",
      description: "domain • L1 • under GCPL (Enterprise) • group:cadences",
      size: 22,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "gcpl_master_data",
      name: "Master Data & Hierarchies",
      description: "domain • L1 • under GCPL (Enterprise) • group:master_data",
      size: 22,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "gcpl_commercial",
      name: "Commercial Performance (Sell-in/Sell-out)",
      description: "domain • L1 • under GCPL (Enterprise) • group:commercial",
      size: 22,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "gcpl_finance",
      name: "Finance & Management Reporting",
      description: "domain • L1 • under GCPL (Enterprise) • group:finance",
      size: 22,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "gcpl_trade",
      name: "Trade & Promotions",
      description: "domain • L1 • under GCPL (Enterprise) • group:trade",
      size: 22,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "gcpl_market",
      name: "Market & Consumer",
      description:
        "domain • L1 • under GCPL (Enterprise) • group:market_consumer",
      size: 22,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "gcpl_planning",
      name: "Demand, Forecasting & Budgeting",
      description: "domain • L1 • under GCPL (Enterprise) • group:planning",
      size: 22,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "gcpl_supply",
      name: "Supply & Inventory",
      description: "domain • L1 • under GCPL (Enterprise) • group:supply",
      size: 22,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "gcpl_systems",
      name: "Systems & Data Platform",
      description: "domain • L1 • under GCPL (Enterprise) • group:systems",
      size: 22,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "gcpl_external",
      name: "External Context & Seasonality",
      description: "domain • L1 • under GCPL (Enterprise) • group:external",
      size: 22,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "gcpl_manufacturing",
      name: "Manufacturing & Plants (Optional)",
      description:
        "domain • L1 • under GCPL (Enterprise) • group:manufacturing",
      size: 22,
      color: "#94A3B8",
      type: "bkg",
    },
    {
      id: "om_functions",
      name: "Functions",
      description:
        "category • L2 • under Operating Model & Governance • group:operating_model",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "om_org_units",
      name: "Org Units",
      description:
        "category • L2 • under Operating Model & Governance • group:operating_model",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "om_roles",
      name: "Roles",
      description:
        "category • L2 • under Operating Model & Governance • group:operating_model",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "om_policies",
      name: "Policies",
      description:
        "category • L2 • under Operating Model & Governance • group:operating_model",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "om_forums",
      name: "Approval Forums",
      description:
        "category • L2 • under Operating Model & Governance • group:operating_model",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "om_kpis",
      name: "KPIs & Metrics",
      description:
        "category • L2 • under Operating Model & Governance • group:operating_model",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "fn_finance",
      name: "Finance",
      description: "function • L3 • under Functions • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "fn_sales",
      name: "Sales",
      description: "function • L3 • under Functions • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "fn_supply_chain",
      name: "Supply Chain",
      description: "function • L3 • under Functions • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "fn_trade_mktg",
      name: "Trade Marketing",
      description: "function • L3 • under Functions • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "fn_market_insights",
      name: "Market/Consumer Insights",
      description: "function • L3 • under Functions • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "fn_it_data",
      name: "IT & Data",
      description: "function • L3 • under Functions • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "role_cxo",
      name: "CXO/Leadership",
      description: "role • L3 • under Roles • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "role_function_head",
      name: "Function Head",
      description: "role • L3 • under Roles • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "role_planner",
      name: "Planner",
      description: "role • L3 • under Roles • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "role_analyst",
      name: "Analyst",
      description: "role • L3 • under Roles • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "role_sales_ops",
      name: "Sales Ops/Field",
      description: "role • L3 • under Roles • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "role_data_steward",
      name: "Data Steward",
      description: "role • L3 • under Roles • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "kpi",
      name: "KPI",
      description:
        "concept • L3 • under KPIs & Metrics • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "metric",
      name: "Metric",
      description:
        "concept • L3 • under KPIs & Metrics • group:operating_model",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "cad_processes",
      name: "Processes",
      description:
        "category • L2 • under Cadences & Processes • group:cadences",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "cad_artifacts",
      name: "Artifacts",
      description:
        "category • L2 • under Cadences & Processes • group:cadences",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "proc_monthly_close",
      name: "Monthly Close",
      description: "process • L3 • under Processes • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "proc_mbr",
      name: "Monthly Business Review (MBR)",
      description: "process • L3 • under Processes • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "proc_qbr",
      name: "Quarterly Business Review (QBR)",
      description: "process • L3 • under Processes • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "proc_budgeting",
      name: "Budgeting Cycle",
      description: "process • L3 • under Processes • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "proc_forecasting",
      name: "Forecasting Cycle",
      description: "process • L3 • under Processes • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "proc_trade_planning",
      name: "Trade Planning Cycle",
      description: "process • L3 • under Processes • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "proc_sop",
      name: "S&OP Cycle",
      description: "process • L3 • under Processes • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "art_financial_pack",
      name: "Financial Pack (PnL + MI)",
      description: "artifact • L3 • under Artifacts • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "art_pnl_pack",
      name: "PnL Pack",
      description: "artifact • L3 • under Artifacts • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "art_mi_pack",
      name: "MI Pack",
      description: "artifact • L3 • under Artifacts • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "art_variance_pack",
      name: "Variance Pack",
      description: "artifact • L3 • under Artifacts • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "art_performance_deck",
      name: "Performance Deck / Commentary",
      description: "artifact • L3 • under Artifacts • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "art_budget_book",
      name: "Budget Book",
      description: "artifact • L3 • under Artifacts • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "art_forecast_book",
      name: "Forecast Book",
      description: "artifact • L3 • under Artifacts • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "art_trade_calendar",
      name: "Trade Calendar",
      description: "artifact • L3 • under Artifacts • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "art_assumption_log",
      name: "Assumption Log",
      description: "artifact • L3 • under Artifacts • group:cadences",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "md_hierarchies",
      name: "Hierarchies",
      description:
        "category • L2 • under Master Data & Hierarchies • group:master_data",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "md_entities",
      name: "Core Entities",
      description:
        "category • L2 • under Master Data & Hierarchies • group:master_data",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "h_product",
      name: "Product Hierarchy",
      description: "hierarchy • L3 • under Hierarchies • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "h_geo",
      name: "Geography Hierarchy",
      description: "hierarchy • L3 • under Hierarchies • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "h_channel",
      name: "Channel Hierarchy",
      description: "hierarchy • L3 • under Hierarchies • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "h_customer",
      name: "Customer Hierarchy",
      description: "hierarchy • L3 • under Hierarchies • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "h_calendar",
      name: "Calendar / Fiscal Periods",
      description: "hierarchy • L3 • under Hierarchies • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "prod_brand",
      name: "Brand",
      description:
        "hierarchy_level • L3 • under Product Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "prod_category",
      name: "Category",
      description:
        "hierarchy_level • L3 • under Product Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "prod_product",
      name: "Product",
      description:
        "hierarchy_level • L3 • under Product Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "prod_sku",
      name: "SKU/Pack/Variant",
      description:
        "hierarchy_level • L3 • under Product Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "geo_global",
      name: "Global",
      description:
        "hierarchy_level • L3 • under Geography Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "geo_country",
      name: "Country",
      description:
        "hierarchy_level • L3 • under Geography Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "geo_region",
      name: "Region",
      description:
        "hierarchy_level • L3 • under Geography Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "geo_state",
      name: "State",
      description:
        "hierarchy_level • L3 • under Geography Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "geo_micro_market",
      name: "Micro-market",
      description:
        "hierarchy_level • L3 • under Geography Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "ch_all",
      name: "All Channels",
      description:
        "hierarchy_level • L3 • under Channel Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "ch_gt",
      name: "General Trade",
      description:
        "hierarchy_level • L3 • under Channel Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "ch_mt",
      name: "Modern Trade",
      description:
        "hierarchy_level • L3 • under Channel Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "ch_ecom",
      name: "E-commerce",
      description:
        "hierarchy_level • L3 • under Channel Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "ch_inst",
      name: "Institutional",
      description:
        "hierarchy_level • L3 • under Channel Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "cust_distributor",
      name: "Distributor",
      description:
        "hierarchy_level • L3 • under Customer Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "cust_key_account",
      name: "Key Account",
      description:
        "hierarchy_level • L3 • under Customer Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "cust_outlet_cluster",
      name: "Outlet Cluster",
      description:
        "hierarchy_level • L3 • under Customer Hierarchy • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "cal_day",
      name: "Day",
      description:
        "hierarchy_level • L3 • under Calendar / Fiscal Periods • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "cal_week",
      name: "Week",
      description:
        "hierarchy_level • L3 • under Calendar / Fiscal Periods • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "cal_month",
      name: "Month",
      description:
        "hierarchy_level • L3 • under Calendar / Fiscal Periods • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "cal_quarter",
      name: "Quarter",
      description:
        "hierarchy_level • L3 • under Calendar / Fiscal Periods • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "cal_fy",
      name: "Fiscal Year",
      description:
        "hierarchy_level • L3 • under Calendar / Fiscal Periods • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "cal_season",
      name: "Season",
      description:
        "hierarchy_level • L3 • under Calendar / Fiscal Periods • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "ent_product",
      name: "Product",
      description: "entity • L3 • under Core Entities • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "ent_geo",
      name: "Geography",
      description: "entity • L3 • under Core Entities • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "ent_channel",
      name: "Channel",
      description: "entity • L3 • under Core Entities • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "ent_customer",
      name: "Customer",
      description: "entity • L3 • under Core Entities • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "ent_time",
      name: "Time",
      description: "entity • L3 • under Core Entities • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "ent_org_unit",
      name: "Business Unit / Geo Unit",
      description: "entity • L3 • under Core Entities • group:master_data",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "comm_transactions",
      name: "Transactions",
      description:
        "category • L2 • under Commercial Performance (Sell-in/Sell-out) • group:commercial",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "comm_measures",
      name: "Measures",
      description:
        "category • L2 • under Commercial Performance (Sell-in/Sell-out) • group:commercial",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "txn_primary_sale",
      name: "Primary Sale (Sell-in)",
      description: "fact • L3 • under Transactions • group:commercial",
      size: 12,
      color: "#06B6D4",
      type: "source",
    },
    {
      id: "txn_secondary_sale",
      name: "Secondary Sale (Sell-out / Proxy)",
      description: "fact • L3 • under Transactions • group:commercial",
      size: 12,
      color: "#06B6D4",
      type: "source",
    },
    {
      id: "m_units",
      name: "Units",
      description: "measure • L3 • under Measures • group:commercial",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "m_volume",
      name: "Volume",
      description: "measure • L3 • under Measures • group:commercial",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "m_gross_sales",
      name: "Gross Sales",
      description: "measure • L3 • under Measures • group:commercial",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "m_net_sales",
      name: "Net Sales",
      description: "measure • L3 • under Measures • group:commercial",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "m_returns",
      name: "Returns",
      description: "measure • L3 • under Measures • group:commercial",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "m_price",
      name: "Price",
      description: "measure • L3 • under Measures • group:commercial",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "m_mix",
      name: "Mix",
      description: "measure • L3 • under Measures • group:commercial",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "m_gm",
      name: "Gross Margin",
      description: "measure • L3 • under Measures • group:commercial",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "m_contribution",
      name: "Contribution",
      description: "measure • L3 • under Measures • group:commercial",
      size: 12,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "fin_statements",
      name: "Statements & Packs",
      description:
        "category • L2 • under Finance & Management Reporting • group:finance",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "fin_accounts",
      name: "Accounts & Costing",
      description:
        "category • L2 • under Finance & Management Reporting • group:finance",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "fin_scenarios",
      name: "Scenarios",
      description:
        "category • L2 • under Finance & Management Reporting • group:finance",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "fin_drivers",
      name: "Variance Drivers",
      description:
        "category • L2 • under Finance & Management Reporting • group:finance",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "ent_fin_pack",
      name: "Monthly Finance Pack (PnL + MI)",
      description: "artifact • L3 • under Statements & Packs • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "source",
    },
    {
      id: "ent_financial_statement",
      name: "Financial Statement",
      description: "entity • L3 • under Statements & Packs • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "ent_pnl_line",
      name: "PnL Line",
      description: "entity • L3 • under Statements & Packs • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "ent_gl_account",
      name: "GL Account",
      description: "entity • L3 • under Accounts & Costing • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "ent_cost_center",
      name: "Cost Center",
      description: "entity • L3 • under Accounts & Costing • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "sc_actual",
      name: "Actual",
      description: "scenario • L3 • under Scenarios • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "sc_budget",
      name: "Budget",
      description: "scenario • L3 • under Scenarios • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "sc_forecast",
      name: "Forecast",
      description: "scenario • L3 • under Scenarios • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "drv_price",
      name: "Price Effect",
      description: "driver • L3 • under Variance Drivers • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "drv_volume",
      name: "Volume Effect",
      description: "driver • L3 • under Variance Drivers • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "drv_mix",
      name: "Mix Effect",
      description: "driver • L3 • under Variance Drivers • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "drv_trade_spend",
      name: "Trade Spend Effect",
      description: "driver • L3 • under Variance Drivers • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "drv_distribution",
      name: "Distribution Effect",
      description: "driver • L3 • under Variance Drivers • group:finance",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "trade_entities",
      name: "Trade Entities",
      description: "category • L2 • under Trade & Promotions • group:trade",
      size: 16,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "trade_artifacts",
      name: "Trade Artifacts",
      description: "category • L2 • under Trade & Promotions • group:trade",
      size: 16,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "ent_promotion",
      name: "Promotion",
      description: "entity • L3 • under Trade Entities • group:trade",
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "ent_scheme",
      name: "Scheme",
      description: "entity • L3 • under Trade Entities • group:trade",
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "ent_mechanic",
      name: "Mechanic",
      description: "entity • L3 • under Trade Entities • group:trade",
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "ent_trade_spend",
      name: "Trade Spend",
      description: "entity • L3 • under Trade Entities • group:trade",
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "ent_promo_outcome",
      name: "Promo Outcome",
      description: "entity • L3 • under Trade Entities • group:trade",
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "art_trade_calendar_local",
      name: "Trade Calendar",
      description: "artifact • L3 • under Trade Artifacts • group:trade",
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "mkt_entities",
      name: "Market/Consumer Entities",
      description:
        "category • L2 • under Market & Consumer • group:market_consumer",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "ent_market_indicator",
      name: "Market Indicator",
      description:
        "entity • L3 • under Market/Consumer Entities • group:market_consumer",
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "ent_share_metric",
      name: "Share Metric",
      description:
        "entity • L3 • under Market/Consumer Entities • group:market_consumer",
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "ent_price_index",
      name: "Price Index",
      description:
        "entity • L3 • under Market/Consumer Entities • group:market_consumer",
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "ent_distribution_metric",
      name: "Distribution Metric",
      description:
        "entity • L3 • under Market/Consumer Entities • group:market_consumer",
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "ent_consumer_segment",
      name: "Consumer Segment",
      description:
        "entity • L3 • under Market/Consumer Entities • group:market_consumer",
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "ent_competition_set",
      name: "Competition Set",
      description:
        "entity • L3 • under Market/Consumer Entities • group:market_consumer",
      size: 12,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "plan_entities",
      name: "Planning Entities",
      description:
        "category • L2 • under Demand, Forecasting & Budgeting • group:planning",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "plan_assumptions",
      name: "Assumptions",
      description:
        "category • L2 • under Demand, Forecasting & Budgeting • group:planning",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "ent_forecast",
      name: "Forecast",
      description: "entity • L3 • under Planning Entities • group:planning",
      size: 12,
      color: "#64748B",
      type: "source",
    },
    {
      id: "ent_budget",
      name: "Budget",
      description: "entity • L3 • under Planning Entities • group:planning",
      size: 12,
      color: "#64748B",
      type: "source",
    },
    {
      id: "ent_demand_plan",
      name: "Demand Plan",
      description: "entity • L3 • under Planning Entities • group:planning",
      size: 12,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "ass_seasonality",
      name: "Seasonality",
      description: "assumption • L3 • under Assumptions • group:planning",
      size: 12,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "ass_price_change",
      name: "Price Change",
      description: "assumption • L3 • under Assumptions • group:planning",
      size: 12,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "ass_promo_calendar",
      name: "Promotion Calendar",
      description: "assumption • L3 • under Assumptions • group:planning",
      size: 12,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "ass_distribution_change",
      name: "Distribution Change",
      description: "assumption • L3 • under Assumptions • group:planning",
      size: 12,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "supply_entities",
      name: "Supply Entities",
      description: "category • L2 • under Supply & Inventory • group:supply",
      size: 16,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "supply_artifacts",
      name: "Supply Artifacts",
      description: "category • L2 • under Supply & Inventory • group:supply",
      size: 16,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "ent_inventory_position",
      name: "Inventory Position",
      description: "entity • L3 • under Supply Entities • group:supply",
      size: 12,
      color: "#84CC16",
      type: "source",
    },
    {
      id: "ent_stock_status",
      name: "Stock Status",
      description: "entity • L3 • under Supply Entities • group:supply",
      size: 12,
      color: "#84CC16",
      type: "source",
    },
    {
      id: "ent_warehouse",
      name: "Warehouse",
      description: "entity • L3 • under Supply Entities • group:supply",
      size: 12,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "ent_depot",
      name: "Depot",
      description: "entity • L3 • under Supply Entities • group:supply",
      size: 12,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "art_replenishment_plan",
      name: "Replenishment Plan",
      description: "artifact • L3 • under Supply Artifacts • group:supply",
      size: 12,
      color: "#84CC16",
      type: "bkg",
    },
    {
      id: "sys_platforms",
      name: "Platforms & Apps",
      description:
        "category • L2 • under Systems & Data Platform • group:systems",
      size: 16,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "sys_data_products",
      name: "Data Products",
      description:
        "category • L2 • under Systems & Data Platform • group:systems",
      size: 16,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "sys_databricks",
      name: "Databricks Lakehouse",
      description: "system • L3 • under Platforms & Apps • group:systems",
      size: 12,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "sys_anaplan",
      name: "Anaplan (Budget/Forecast)",
      description: "system • L3 • under Platforms & Apps • group:systems",
      size: 12,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "sys_o9",
      name: "o9 (Supply Chain Planning)",
      description: "system • L3 • under Platforms & Apps • group:systems",
      size: 12,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "sys_sfa_crm",
      name: "SFA/CRM (e.g., Salesforce)",
      description: "system • L3 • under Platforms & Apps • group:systems",
      size: 12,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "dp_master_data",
      name: "Master Data Mart",
      description: "data_product • L3 • under Data Products • group:systems",
      size: 12,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "dp_finance_pack",
      name: "Finance Pack Mart",
      description: "data_product • L3 • under Data Products • group:systems",
      size: 12,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "dp_sales",
      name: "Sales Mart (Primary+Secondary)",
      description: "data_product • L3 • under Data Products • group:systems",
      size: 12,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "dp_promotions",
      name: "Promotions Mart",
      description: "data_product • L3 • under Data Products • group:systems",
      size: 12,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "dp_market",
      name: "Market/Consumer Mart",
      description: "data_product • L3 • under Data Products • group:systems",
      size: 12,
      color: "#A855F7",
      type: "source",
    },
    {
      id: "ext_entities",
      name: "External Entities",
      description:
        "category • L2 • under External Context & Seasonality • group:external",
      size: 16,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "ext_season",
      name: "Season",
      description: "entity • L3 • under External Entities • group:external",
      size: 12,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "ext_weather_signal",
      name: "Weather Signal (proxy)",
      description: "entity • L3 • under External Entities • group:external",
      size: 12,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "ext_event",
      name: "Event / Festival / Monsoon Onset",
      description: "entity • L3 • under External Entities • group:external",
      size: 12,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "ext_category_seasonality",
      name: "Category Seasonality Profile",
      description: "entity • L3 • under External Entities • group:external",
      size: 12,
      color: "#FB7185",
      type: "bkg",
    },
    {
      id: "mfg_entities",
      name: "Manufacturing Entities",
      description:
        "category • L2 • under Manufacturing & Plants (Optional) • group:manufacturing",
      size: 16,
      color: "#94A3B8",
      type: "bkg",
    },
    {
      id: "mfg_plant",
      name: "Plant",
      description:
        "entity • L3 • under Manufacturing Entities • group:manufacturing",
      size: 12,
      color: "#94A3B8",
      type: "bkg",
    },
    {
      id: "mfg_production_line",
      name: "Production Line",
      description:
        "entity • L3 • under Manufacturing Entities • group:manufacturing",
      size: 12,
      color: "#94A3B8",
      type: "bkg",
    },
    {
      id: "mfg_capacity",
      name: "Capacity",
      description:
        "entity • L3 • under Manufacturing Entities • group:manufacturing",
      size: 12,
      color: "#94A3B8",
      type: "bkg",
    },
    {
      id: "mfg_output",
      name: "Output",
      description:
        "entity • L3 • under Manufacturing Entities • group:manufacturing",
      size: 12,
      color: "#94A3B8",
      type: "source",
    },
    {
      id: "mfg_downtime",
      name: "Downtime",
      description:
        "entity • L3 • under Manufacturing Entities • group:manufacturing",
      size: 12,
      color: "#94A3B8",
      type: "source",
    },
    {
      id: "mfg_edge_machine_data",
      name: "High-frequency Machine Data (Edge)",
      description:
        "entity • L3 • under Manufacturing Entities • group:manufacturing",
      size: 12,
      color: "#94A3B8",
      type: "source",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    {
      id: "l_has_domain_47b20b3e29",
      source: "gcpl",
      target: "gcpl_operating_model",
      type: "has_domain",
      description:
        "GCPL (Enterprise) —[has_domain]→ Operating Model & Governance",
      linkType: "bkg",
    },
    {
      id: "l_has_domain_a964adf916",
      source: "gcpl",
      target: "gcpl_cadences",
      type: "has_domain",
      description: "GCPL (Enterprise) —[has_domain]→ Cadences & Processes",
      linkType: "bkg",
    },
    {
      id: "l_has_domain_7656093755",
      source: "gcpl",
      target: "gcpl_master_data",
      type: "has_domain",
      description: "GCPL (Enterprise) —[has_domain]→ Master Data & Hierarchies",
      linkType: "bkg",
    },
    {
      id: "l_has_domain_481020c116",
      source: "gcpl",
      target: "gcpl_commercial",
      type: "has_domain",
      description:
        "GCPL (Enterprise) —[has_domain]→ Commercial Performance (Sell-in/Sell-out)",
      linkType: "bkg",
    },
    {
      id: "l_has_domain_2ed3cc9359",
      source: "gcpl",
      target: "gcpl_finance",
      type: "has_domain",
      description:
        "GCPL (Enterprise) —[has_domain]→ Finance & Management Reporting",
      linkType: "bkg",
    },
    {
      id: "l_has_domain_78493b65f0",
      source: "gcpl",
      target: "gcpl_trade",
      type: "has_domain",
      description: "GCPL (Enterprise) —[has_domain]→ Trade & Promotions",
      linkType: "bkg",
    },
    {
      id: "l_has_domain_03e096cfc9",
      source: "gcpl",
      target: "gcpl_market",
      type: "has_domain",
      description: "GCPL (Enterprise) —[has_domain]→ Market & Consumer",
      linkType: "bkg",
    },
    {
      id: "l_has_domain_790c4ca9c7",
      source: "gcpl",
      target: "gcpl_planning",
      type: "has_domain",
      description:
        "GCPL (Enterprise) —[has_domain]→ Demand, Forecasting & Budgeting",
      linkType: "bkg",
    },
    {
      id: "l_has_domain_4e364a052d",
      source: "gcpl",
      target: "gcpl_supply",
      type: "has_domain",
      description: "GCPL (Enterprise) —[has_domain]→ Supply & Inventory",
      linkType: "bkg",
    },
    {
      id: "l_has_domain_e080c1315a",
      source: "gcpl",
      target: "gcpl_systems",
      type: "has_domain",
      description: "GCPL (Enterprise) —[has_domain]→ Systems & Data Platform",
      linkType: "bkg",
    },
    {
      id: "l_has_domain_29b8452cfc",
      source: "gcpl",
      target: "gcpl_external",
      type: "has_domain",
      description:
        "GCPL (Enterprise) —[has_domain]→ External Context & Seasonality",
      linkType: "bkg",
    },
    {
      id: "l_has_domain_e3beb45589",
      source: "gcpl",
      target: "gcpl_manufacturing",
      type: "has_domain",
      description:
        "GCPL (Enterprise) —[has_domain]→ Manufacturing & Plants (Optional)",
      linkType: "bkg",
    },
    {
      id: "l_has_component_f878b04934",
      source: "gcpl_operating_model",
      target: "om_functions",
      type: "has_component",
      description: "Operating Model & Governance —[has_component]→ Functions",
      linkType: "bkg",
    },
    {
      id: "l_has_component_27f68c0957",
      source: "gcpl_operating_model",
      target: "om_org_units",
      type: "has_component",
      description: "Operating Model & Governance —[has_component]→ Org Units",
      linkType: "bkg",
    },
    {
      id: "l_has_component_2b31395978",
      source: "gcpl_operating_model",
      target: "om_roles",
      type: "has_component",
      description: "Operating Model & Governance —[has_component]→ Roles",
      linkType: "bkg",
    },
    {
      id: "l_has_component_57890df9ab",
      source: "gcpl_operating_model",
      target: "om_policies",
      type: "has_component",
      description: "Operating Model & Governance —[has_component]→ Policies",
      linkType: "bkg",
    },
    {
      id: "l_has_component_d91aee5679",
      source: "gcpl_operating_model",
      target: "om_forums",
      type: "has_component",
      description:
        "Operating Model & Governance —[has_component]→ Approval Forums",
      linkType: "bkg",
    },
    {
      id: "l_has_component_a5879034fa",
      source: "gcpl_operating_model",
      target: "om_kpis",
      type: "has_component",
      description:
        "Operating Model & Governance —[has_component]→ KPIs & Metrics",
      linkType: "bkg",
    },
    {
      id: "l_includes_dffc4dfbaa",
      source: "om_functions",
      target: "fn_finance",
      type: "includes",
      description: "Functions —[includes]→ Finance",
      linkType: "bkg",
    },
    {
      id: "l_includes_08c09387d0",
      source: "om_functions",
      target: "fn_sales",
      type: "includes",
      description: "Functions —[includes]→ Sales",
      linkType: "bkg",
    },
    {
      id: "l_includes_167f790853",
      source: "om_functions",
      target: "fn_supply_chain",
      type: "includes",
      description: "Functions —[includes]→ Supply Chain",
      linkType: "bkg",
    },
    {
      id: "l_includes_4da4410f0b",
      source: "om_functions",
      target: "fn_trade_mktg",
      type: "includes",
      description: "Functions —[includes]→ Trade Marketing",
      linkType: "bkg",
    },
    {
      id: "l_includes_5fb84c5b20",
      source: "om_functions",
      target: "fn_market_insights",
      type: "includes",
      description: "Functions —[includes]→ Market/Consumer Insights",
      linkType: "bkg",
    },
    {
      id: "l_includes_9ca8c14295",
      source: "om_functions",
      target: "fn_it_data",
      type: "includes",
      description: "Functions —[includes]→ IT & Data",
      linkType: "bkg",
    },
    {
      id: "l_includes_f6454de6fd",
      source: "om_roles",
      target: "role_cxo",
      type: "includes",
      description: "Roles —[includes]→ CXO/Leadership",
      linkType: "bkg",
    },
    {
      id: "l_includes_3d8dec7972",
      source: "om_roles",
      target: "role_function_head",
      type: "includes",
      description: "Roles —[includes]→ Function Head",
      linkType: "bkg",
    },
    {
      id: "l_includes_bbde817a6c",
      source: "om_roles",
      target: "role_planner",
      type: "includes",
      description: "Roles —[includes]→ Planner",
      linkType: "bkg",
    },
    {
      id: "l_includes_e13b5297de",
      source: "om_roles",
      target: "role_analyst",
      type: "includes",
      description: "Roles —[includes]→ Analyst",
      linkType: "bkg",
    },
    {
      id: "l_includes_e67c330308",
      source: "om_roles",
      target: "role_sales_ops",
      type: "includes",
      description: "Roles —[includes]→ Sales Ops/Field",
      linkType: "bkg",
    },
    {
      id: "l_includes_372af5a8b6",
      source: "om_roles",
      target: "role_data_steward",
      type: "includes",
      description: "Roles —[includes]→ Data Steward",
      linkType: "bkg",
    },
    {
      id: "l_includes_093b769261",
      source: "om_kpis",
      target: "kpi",
      type: "includes",
      description: "KPIs & Metrics —[includes]→ KPI",
      linkType: "bkg",
    },
    {
      id: "l_includes_9f7b5cbeba",
      source: "om_kpis",
      target: "metric",
      type: "includes",
      description: "KPIs & Metrics —[includes]→ Metric",
      linkType: "bkg",
    },
    {
      id: "l_owns_fd74f4afc5",
      source: "fn_finance",
      target: "kpi",
      type: "owns",
      description: "Finance —[owns]→ KPI",
      linkType: "bkg",
    },
    {
      id: "l_owns_1e1159416a",
      source: "fn_sales",
      target: "kpi",
      type: "owns",
      description: "Sales —[owns]→ KPI",
      linkType: "bkg",
    },
    {
      id: "l_owns_cda22f7add",
      source: "fn_supply_chain",
      target: "kpi",
      type: "owns",
      description: "Supply Chain —[owns]→ KPI",
      linkType: "bkg",
    },
    {
      id: "l_owns_47b75b13bb",
      source: "fn_trade_mktg",
      target: "kpi",
      type: "owns",
      description: "Trade Marketing —[owns]→ KPI",
      linkType: "bkg",
    },
    {
      id: "l_has_component_513beeb65b",
      source: "gcpl_cadences",
      target: "cad_processes",
      type: "has_component",
      description: "Cadences & Processes —[has_component]→ Processes",
      linkType: "bkg",
    },
    {
      id: "l_has_component_e43001d6f6",
      source: "gcpl_cadences",
      target: "cad_artifacts",
      type: "has_component",
      description: "Cadences & Processes —[has_component]→ Artifacts",
      linkType: "bkg",
    },
    {
      id: "l_includes_43f6e2be10",
      source: "cad_processes",
      target: "proc_monthly_close",
      type: "includes",
      description: "Processes —[includes]→ Monthly Close",
      linkType: "bkg",
    },
    {
      id: "l_includes_f086198a90",
      source: "cad_processes",
      target: "proc_mbr",
      type: "includes",
      description: "Processes —[includes]→ Monthly Business Review (MBR)",
      linkType: "bkg",
    },
    {
      id: "l_includes_4b1ef94ddc",
      source: "cad_processes",
      target: "proc_qbr",
      type: "includes",
      description: "Processes —[includes]→ Quarterly Business Review (QBR)",
      linkType: "bkg",
    },
    {
      id: "l_includes_3ab1f92e0b",
      source: "cad_processes",
      target: "proc_budgeting",
      type: "includes",
      description: "Processes —[includes]→ Budgeting Cycle",
      linkType: "bkg",
    },
    {
      id: "l_includes_18c7ed3531",
      source: "cad_processes",
      target: "proc_forecasting",
      type: "includes",
      description: "Processes —[includes]→ Forecasting Cycle",
      linkType: "bkg",
    },
    {
      id: "l_includes_6054313ee3",
      source: "cad_processes",
      target: "proc_trade_planning",
      type: "includes",
      description: "Processes —[includes]→ Trade Planning Cycle",
      linkType: "bkg",
    },
    {
      id: "l_includes_6f06885e4d",
      source: "cad_processes",
      target: "proc_sop",
      type: "includes",
      description: "Processes —[includes]→ S&OP Cycle",
      linkType: "bkg",
    },
    {
      id: "l_includes_69b644e31a",
      source: "cad_artifacts",
      target: "art_financial_pack",
      type: "includes",
      description: "Artifacts —[includes]→ Financial Pack (PnL + MI)",
      linkType: "bkg",
    },
    {
      id: "l_includes_b50e02b554",
      source: "cad_artifacts",
      target: "art_pnl_pack",
      type: "includes",
      description: "Artifacts —[includes]→ PnL Pack",
      linkType: "bkg",
    },
    {
      id: "l_includes_ce11ed0295",
      source: "cad_artifacts",
      target: "art_mi_pack",
      type: "includes",
      description: "Artifacts —[includes]→ MI Pack",
      linkType: "bkg",
    },
    {
      id: "l_includes_413d008012",
      source: "cad_artifacts",
      target: "art_variance_pack",
      type: "includes",
      description: "Artifacts —[includes]→ Variance Pack",
      linkType: "bkg",
    },
    {
      id: "l_includes_a56dc16b40",
      source: "cad_artifacts",
      target: "art_performance_deck",
      type: "includes",
      description: "Artifacts —[includes]→ Performance Deck / Commentary",
      linkType: "bkg",
    },
    {
      id: "l_includes_121ff0008e",
      source: "cad_artifacts",
      target: "art_budget_book",
      type: "includes",
      description: "Artifacts —[includes]→ Budget Book",
      linkType: "bkg",
    },
    {
      id: "l_includes_f157c40b3b",
      source: "cad_artifacts",
      target: "art_forecast_book",
      type: "includes",
      description: "Artifacts —[includes]→ Forecast Book",
      linkType: "bkg",
    },
    {
      id: "l_includes_fd4fa39630",
      source: "cad_artifacts",
      target: "art_trade_calendar",
      type: "includes",
      description: "Artifacts —[includes]→ Trade Calendar",
      linkType: "bkg",
    },
    {
      id: "l_includes_afb549fb6e",
      source: "cad_artifacts",
      target: "art_assumption_log",
      type: "includes",
      description: "Artifacts —[includes]→ Assumption Log",
      linkType: "bkg",
    },
    {
      id: "l_produces_6f18a1c835",
      source: "proc_monthly_close",
      target: "art_financial_pack",
      type: "produces",
      description: "Monthly Close —[produces]→ Financial Pack (PnL + MI)",
      linkType: "bkg",
    },
    {
      id: "l_contains_ed10e3d4ed",
      source: "art_financial_pack",
      target: "art_pnl_pack",
      type: "contains",
      description: "Financial Pack (PnL + MI) —[contains]→ PnL Pack",
      linkType: "bkg",
    },
    {
      id: "l_contains_490176778e",
      source: "art_financial_pack",
      target: "art_mi_pack",
      type: "contains",
      description: "Financial Pack (PnL + MI) —[contains]→ MI Pack",
      linkType: "bkg",
    },
    {
      id: "l_contains_6ace6a3bc3",
      source: "art_financial_pack",
      target: "art_variance_pack",
      type: "contains",
      description: "Financial Pack (PnL + MI) —[contains]→ Variance Pack",
      linkType: "bkg",
    },
    {
      id: "l_consumes_89be5011a2",
      source: "proc_mbr",
      target: "art_financial_pack",
      type: "consumes",
      description:
        "Monthly Business Review (MBR) —[consumes]→ Financial Pack (PnL + MI)",
      linkType: "bkg",
    },
    {
      id: "l_produces_c62144f9d2",
      source: "proc_mbr",
      target: "art_performance_deck",
      type: "produces",
      description:
        "Monthly Business Review (MBR) —[produces]→ Performance Deck / Commentary",
      linkType: "bkg",
    },
    {
      id: "l_produces_86a4490b22",
      source: "proc_budgeting",
      target: "art_budget_book",
      type: "produces",
      description: "Budgeting Cycle —[produces]→ Budget Book",
      linkType: "bkg",
    },
    {
      id: "l_produces_a9b40e6293",
      source: "proc_forecasting",
      target: "art_forecast_book",
      type: "produces",
      description: "Forecasting Cycle —[produces]→ Forecast Book",
      linkType: "bkg",
    },
    {
      id: "l_uses_167c161a89",
      source: "proc_forecasting",
      target: "art_assumption_log",
      type: "uses",
      description: "Forecasting Cycle —[uses]→ Assumption Log",
      linkType: "bkg",
    },
    {
      id: "l_produces_e0492d5df7",
      source: "proc_trade_planning",
      target: "art_trade_calendar",
      type: "produces",
      description: "Trade Planning Cycle —[produces]→ Trade Calendar",
      linkType: "bkg",
    },
    {
      id: "l_consumes_41793dad44",
      source: "proc_sop",
      target: "art_forecast_book",
      type: "consumes",
      description: "S&OP Cycle —[consumes]→ Forecast Book",
      linkType: "bkg",
    },
    {
      id: "l_has_component_89eb2d78aa",
      source: "gcpl_master_data",
      target: "md_hierarchies",
      type: "has_component",
      description: "Master Data & Hierarchies —[has_component]→ Hierarchies",
      linkType: "bkg",
    },
    {
      id: "l_has_component_5a4894f955",
      source: "gcpl_master_data",
      target: "md_entities",
      type: "has_component",
      description: "Master Data & Hierarchies —[has_component]→ Core Entities",
      linkType: "bkg",
    },
    {
      id: "l_includes_ca64768400",
      source: "md_hierarchies",
      target: "h_product",
      type: "includes",
      description: "Hierarchies —[includes]→ Product Hierarchy",
      linkType: "bkg",
    },
    {
      id: "l_includes_73235c22be",
      source: "md_hierarchies",
      target: "h_geo",
      type: "includes",
      description: "Hierarchies —[includes]→ Geography Hierarchy",
      linkType: "bkg",
    },
    {
      id: "l_includes_5cbeee1115",
      source: "md_hierarchies",
      target: "h_channel",
      type: "includes",
      description: "Hierarchies —[includes]→ Channel Hierarchy",
      linkType: "bkg",
    },
    {
      id: "l_includes_ac8f36106a",
      source: "md_hierarchies",
      target: "h_customer",
      type: "includes",
      description: "Hierarchies —[includes]→ Customer Hierarchy",
      linkType: "bkg",
    },
    {
      id: "l_includes_051373d627",
      source: "md_hierarchies",
      target: "h_calendar",
      type: "includes",
      description: "Hierarchies —[includes]→ Calendar / Fiscal Periods",
      linkType: "bkg",
    },
    {
      id: "l_has_level_7cbccc55e5",
      source: "h_product",
      target: "prod_brand",
      type: "has_level",
      description: "Product Hierarchy —[has_level]→ Brand",
      linkType: "bkg",
    },
    {
      id: "l_has_level_4a18f38b05",
      source: "h_product",
      target: "prod_category",
      type: "has_level",
      description: "Product Hierarchy —[has_level]→ Category",
      linkType: "bkg",
    },
    {
      id: "l_has_level_55526129f0",
      source: "h_product",
      target: "prod_product",
      type: "has_level",
      description: "Product Hierarchy —[has_level]→ Product",
      linkType: "bkg",
    },
    {
      id: "l_has_level_7b61850576",
      source: "h_product",
      target: "prod_sku",
      type: "has_level",
      description: "Product Hierarchy —[has_level]→ SKU/Pack/Variant",
      linkType: "bkg",
    },
    {
      id: "l_has_level_6ba91151ed",
      source: "h_geo",
      target: "geo_global",
      type: "has_level",
      description: "Geography Hierarchy —[has_level]→ Global",
      linkType: "bkg",
    },
    {
      id: "l_has_level_b203249861",
      source: "h_geo",
      target: "geo_country",
      type: "has_level",
      description: "Geography Hierarchy —[has_level]→ Country",
      linkType: "bkg",
    },
    {
      id: "l_has_level_24330d886e",
      source: "h_geo",
      target: "geo_region",
      type: "has_level",
      description: "Geography Hierarchy —[has_level]→ Region",
      linkType: "bkg",
    },
    {
      id: "l_has_level_22b57b90ad",
      source: "h_geo",
      target: "geo_state",
      type: "has_level",
      description: "Geography Hierarchy —[has_level]→ State",
      linkType: "bkg",
    },
    {
      id: "l_has_level_55890a335f",
      source: "h_geo",
      target: "geo_micro_market",
      type: "has_level",
      description: "Geography Hierarchy —[has_level]→ Micro-market",
      linkType: "bkg",
    },
    {
      id: "l_has_level_84b212276a",
      source: "h_channel",
      target: "ch_all",
      type: "has_level",
      description: "Channel Hierarchy —[has_level]→ All Channels",
      linkType: "bkg",
    },
    {
      id: "l_has_level_3f3825ff19",
      source: "h_channel",
      target: "ch_gt",
      type: "has_level",
      description: "Channel Hierarchy —[has_level]→ General Trade",
      linkType: "bkg",
    },
    {
      id: "l_has_level_fe32dae401",
      source: "h_channel",
      target: "ch_mt",
      type: "has_level",
      description: "Channel Hierarchy —[has_level]→ Modern Trade",
      linkType: "bkg",
    },
    {
      id: "l_has_level_0f616ecf5a",
      source: "h_channel",
      target: "ch_ecom",
      type: "has_level",
      description: "Channel Hierarchy —[has_level]→ E-commerce",
      linkType: "bkg",
    },
    {
      id: "l_has_level_4301eff6cb",
      source: "h_channel",
      target: "ch_inst",
      type: "has_level",
      description: "Channel Hierarchy —[has_level]→ Institutional",
      linkType: "bkg",
    },
    {
      id: "l_has_level_cf05b33630",
      source: "h_customer",
      target: "cust_distributor",
      type: "has_level",
      description: "Customer Hierarchy —[has_level]→ Distributor",
      linkType: "bkg",
    },
    {
      id: "l_has_level_08f5a84078",
      source: "h_customer",
      target: "cust_key_account",
      type: "has_level",
      description: "Customer Hierarchy —[has_level]→ Key Account",
      linkType: "bkg",
    },
    {
      id: "l_has_level_ca71d87a0e",
      source: "h_customer",
      target: "cust_outlet_cluster",
      type: "has_level",
      description: "Customer Hierarchy —[has_level]→ Outlet Cluster",
      linkType: "bkg",
    },
    {
      id: "l_has_level_5769890804",
      source: "h_calendar",
      target: "cal_day",
      type: "has_level",
      description: "Calendar / Fiscal Periods —[has_level]→ Day",
      linkType: "bkg",
    },
    {
      id: "l_has_level_ab2ddcb64b",
      source: "h_calendar",
      target: "cal_week",
      type: "has_level",
      description: "Calendar / Fiscal Periods —[has_level]→ Week",
      linkType: "bkg",
    },
    {
      id: "l_has_level_55d87227be",
      source: "h_calendar",
      target: "cal_month",
      type: "has_level",
      description: "Calendar / Fiscal Periods —[has_level]→ Month",
      linkType: "bkg",
    },
    {
      id: "l_has_level_53b77392ea",
      source: "h_calendar",
      target: "cal_quarter",
      type: "has_level",
      description: "Calendar / Fiscal Periods —[has_level]→ Quarter",
      linkType: "bkg",
    },
    {
      id: "l_has_level_874b1aeb9f",
      source: "h_calendar",
      target: "cal_fy",
      type: "has_level",
      description: "Calendar / Fiscal Periods —[has_level]→ Fiscal Year",
      linkType: "bkg",
    },
    {
      id: "l_has_level_0d7722aee7",
      source: "h_calendar",
      target: "cal_season",
      type: "has_level",
      description: "Calendar / Fiscal Periods —[has_level]→ Season",
      linkType: "bkg",
    },
    {
      id: "l_includes_fd19b44ba8",
      source: "md_entities",
      target: "ent_product",
      type: "includes",
      description: "Core Entities —[includes]→ Product",
      linkType: "bkg",
    },
    {
      id: "l_includes_9d86365072",
      source: "md_entities",
      target: "ent_geo",
      type: "includes",
      description: "Core Entities —[includes]→ Geography",
      linkType: "bkg",
    },
    {
      id: "l_includes_53f9e42e32",
      source: "md_entities",
      target: "ent_channel",
      type: "includes",
      description: "Core Entities —[includes]→ Channel",
      linkType: "bkg",
    },
    {
      id: "l_includes_0f61699f60",
      source: "md_entities",
      target: "ent_customer",
      type: "includes",
      description: "Core Entities —[includes]→ Customer",
      linkType: "bkg",
    },
    {
      id: "l_includes_3f3a49a784",
      source: "md_entities",
      target: "ent_time",
      type: "includes",
      description: "Core Entities —[includes]→ Time",
      linkType: "bkg",
    },
    {
      id: "l_includes_ac57ca3316",
      source: "md_entities",
      target: "ent_org_unit",
      type: "includes",
      description: "Core Entities —[includes]→ Business Unit / Geo Unit",
      linkType: "bkg",
    },
    {
      id: "l_has_component_e117a8b40d",
      source: "gcpl_commercial",
      target: "comm_transactions",
      type: "has_component",
      description:
        "Commercial Performance (Sell-in/Sell-out) —[has_component]→ Transactions",
      linkType: "bkg",
    },
    {
      id: "l_has_component_ce8e3a0f38",
      source: "gcpl_commercial",
      target: "comm_measures",
      type: "has_component",
      description:
        "Commercial Performance (Sell-in/Sell-out) —[has_component]→ Measures",
      linkType: "bkg",
    },
    {
      id: "l_includes_b3eead4bc0",
      source: "comm_transactions",
      target: "txn_primary_sale",
      type: "includes",
      description: "Transactions —[includes]→ Primary Sale (Sell-in)",
      linkType: "data",
    },
    {
      id: "l_includes_effe87149b",
      source: "comm_transactions",
      target: "txn_secondary_sale",
      type: "includes",
      description:
        "Transactions —[includes]→ Secondary Sale (Sell-out / Proxy)",
      linkType: "data",
    },
    {
      id: "l_includes_cc8e33e121",
      source: "comm_measures",
      target: "m_units",
      type: "includes",
      description: "Measures —[includes]→ Units",
      linkType: "bkg",
    },
    {
      id: "l_includes_520d8010bc",
      source: "comm_measures",
      target: "m_volume",
      type: "includes",
      description: "Measures —[includes]→ Volume",
      linkType: "bkg",
    },
    {
      id: "l_includes_f1ff358bc2",
      source: "comm_measures",
      target: "m_gross_sales",
      type: "includes",
      description: "Measures —[includes]→ Gross Sales",
      linkType: "bkg",
    },
    {
      id: "l_includes_15a31ccbe4",
      source: "comm_measures",
      target: "m_net_sales",
      type: "includes",
      description: "Measures —[includes]→ Net Sales",
      linkType: "bkg",
    },
    {
      id: "l_includes_039d5ce5ff",
      source: "comm_measures",
      target: "m_returns",
      type: "includes",
      description: "Measures —[includes]→ Returns",
      linkType: "bkg",
    },
    {
      id: "l_includes_570fa94582",
      source: "comm_measures",
      target: "m_price",
      type: "includes",
      description: "Measures —[includes]→ Price",
      linkType: "bkg",
    },
    {
      id: "l_includes_2f1a33dcb9",
      source: "comm_measures",
      target: "m_mix",
      type: "includes",
      description: "Measures —[includes]→ Mix",
      linkType: "bkg",
    },
    {
      id: "l_includes_3521ce3643",
      source: "comm_measures",
      target: "m_gm",
      type: "includes",
      description: "Measures —[includes]→ Gross Margin",
      linkType: "bkg",
    },
    {
      id: "l_includes_1fcb74ebec",
      source: "comm_measures",
      target: "m_contribution",
      type: "includes",
      description: "Measures —[includes]→ Contribution",
      linkType: "bkg",
    },
    {
      id: "l_dimension_f6150aa035",
      source: "txn_primary_sale",
      target: "ent_product",
      type: "dimension",
      description: "Primary Sale (Sell-in) —[dimension]→ Product",
      linkType: "data",
    },
    {
      id: "l_dimension_12984647f8",
      source: "txn_secondary_sale",
      target: "ent_product",
      type: "dimension",
      description: "Secondary Sale (Sell-out / Proxy) —[dimension]→ Product",
      linkType: "data",
    },
    {
      id: "l_dimension_398344e282",
      source: "txn_primary_sale",
      target: "ent_geo",
      type: "dimension",
      description: "Primary Sale (Sell-in) —[dimension]→ Geography",
      linkType: "data",
    },
    {
      id: "l_dimension_51e3bff169",
      source: "txn_secondary_sale",
      target: "ent_geo",
      type: "dimension",
      description: "Secondary Sale (Sell-out / Proxy) —[dimension]→ Geography",
      linkType: "data",
    },
    {
      id: "l_dimension_1a5b66617b",
      source: "txn_primary_sale",
      target: "ent_channel",
      type: "dimension",
      description: "Primary Sale (Sell-in) —[dimension]→ Channel",
      linkType: "data",
    },
    {
      id: "l_dimension_80ad740bfc",
      source: "txn_secondary_sale",
      target: "ent_channel",
      type: "dimension",
      description: "Secondary Sale (Sell-out / Proxy) —[dimension]→ Channel",
      linkType: "data",
    },
    {
      id: "l_dimension_6bf9387ffb",
      source: "txn_primary_sale",
      target: "ent_customer",
      type: "dimension",
      description: "Primary Sale (Sell-in) —[dimension]→ Customer",
      linkType: "data",
    },
    {
      id: "l_dimension_f2f8097e1f",
      source: "txn_secondary_sale",
      target: "ent_customer",
      type: "dimension",
      description: "Secondary Sale (Sell-out / Proxy) —[dimension]→ Customer",
      linkType: "data",
    },
    {
      id: "l_dimension_c573454161",
      source: "txn_primary_sale",
      target: "ent_time",
      type: "dimension",
      description: "Primary Sale (Sell-in) —[dimension]→ Time",
      linkType: "data",
    },
    {
      id: "l_dimension_205bd74159",
      source: "txn_secondary_sale",
      target: "ent_time",
      type: "dimension",
      description: "Secondary Sale (Sell-out / Proxy) —[dimension]→ Time",
      linkType: "data",
    },
    {
      id: "l_leads_to_with_lag_1044472fc5",
      source: "txn_primary_sale",
      target: "txn_secondary_sale",
      type: "leads_to_with_lag",
      description:
        "Primary Sale (Sell-in) —[leads_to_with_lag]→ Secondary Sale (Sell-out / Proxy)",
      linkType: "bkg",
    },
    {
      id: "l_has_component_bc50f46bca",
      source: "gcpl_finance",
      target: "fin_statements",
      type: "has_component",
      description:
        "Finance & Management Reporting —[has_component]→ Statements & Packs",
      linkType: "bkg",
    },
    {
      id: "l_has_component_e1a5452817",
      source: "gcpl_finance",
      target: "fin_accounts",
      type: "has_component",
      description:
        "Finance & Management Reporting —[has_component]→ Accounts & Costing",
      linkType: "bkg",
    },
    {
      id: "l_has_component_dd7646f4f3",
      source: "gcpl_finance",
      target: "fin_scenarios",
      type: "has_component",
      description: "Finance & Management Reporting —[has_component]→ Scenarios",
      linkType: "bkg",
    },
    {
      id: "l_has_component_da1fa2a25e",
      source: "gcpl_finance",
      target: "fin_drivers",
      type: "has_component",
      description:
        "Finance & Management Reporting —[has_component]→ Variance Drivers",
      linkType: "bkg",
    },
    {
      id: "l_includes_578b42b1a7",
      source: "fin_statements",
      target: "ent_fin_pack",
      type: "includes",
      description:
        "Statements & Packs —[includes]→ Monthly Finance Pack (PnL + MI)",
      linkType: "data",
    },
    {
      id: "l_includes_bd75b1d80f",
      source: "fin_statements",
      target: "ent_financial_statement",
      type: "includes",
      description: "Statements & Packs —[includes]→ Financial Statement",
      linkType: "bkg",
    },
    {
      id: "l_includes_176451be5e",
      source: "fin_statements",
      target: "ent_pnl_line",
      type: "includes",
      description: "Statements & Packs —[includes]→ PnL Line",
      linkType: "bkg",
    },
    {
      id: "l_includes_41cd0d8655",
      source: "fin_accounts",
      target: "ent_gl_account",
      type: "includes",
      description: "Accounts & Costing —[includes]→ GL Account",
      linkType: "bkg",
    },
    {
      id: "l_includes_7545b45ce0",
      source: "fin_accounts",
      target: "ent_cost_center",
      type: "includes",
      description: "Accounts & Costing —[includes]→ Cost Center",
      linkType: "bkg",
    },
    {
      id: "l_includes_244eade766",
      source: "fin_scenarios",
      target: "sc_actual",
      type: "includes",
      description: "Scenarios —[includes]→ Actual",
      linkType: "bkg",
    },
    {
      id: "l_includes_ccbb71b25f",
      source: "fin_scenarios",
      target: "sc_budget",
      type: "includes",
      description: "Scenarios —[includes]→ Budget",
      linkType: "bkg",
    },
    {
      id: "l_includes_e9a8def0b2",
      source: "fin_scenarios",
      target: "sc_forecast",
      type: "includes",
      description: "Scenarios —[includes]→ Forecast",
      linkType: "bkg",
    },
    {
      id: "l_includes_31dfd67fb2",
      source: "fin_drivers",
      target: "drv_price",
      type: "includes",
      description: "Variance Drivers —[includes]→ Price Effect",
      linkType: "bkg",
    },
    {
      id: "l_includes_4754310f40",
      source: "fin_drivers",
      target: "drv_volume",
      type: "includes",
      description: "Variance Drivers —[includes]→ Volume Effect",
      linkType: "bkg",
    },
    {
      id: "l_includes_49e4479f1c",
      source: "fin_drivers",
      target: "drv_mix",
      type: "includes",
      description: "Variance Drivers —[includes]→ Mix Effect",
      linkType: "bkg",
    },
    {
      id: "l_includes_dbed8df854",
      source: "fin_drivers",
      target: "drv_trade_spend",
      type: "includes",
      description: "Variance Drivers —[includes]→ Trade Spend Effect",
      linkType: "bkg",
    },
    {
      id: "l_includes_e015989a1b",
      source: "fin_drivers",
      target: "drv_distribution",
      type: "includes",
      description: "Variance Drivers —[includes]→ Distribution Effect",
      linkType: "bkg",
    },
    {
      id: "l_has_line_777a5b7bbc",
      source: "ent_fin_pack",
      target: "ent_pnl_line",
      type: "has_line",
      description: "Monthly Finance Pack (PnL + MI) —[has_line]→ PnL Line",
      linkType: "data",
    },
    {
      id: "l_rolls_up_to_6021a24b87",
      source: "ent_pnl_line",
      target: "ent_pnl_line",
      type: "rolls_up_to",
      description: "PnL Line —[rolls_up_to]→ PnL Line",
      linkType: "bkg",
    },
    {
      id: "l_mapped_to_b92c4a92b7",
      source: "ent_pnl_line",
      target: "ent_gl_account",
      type: "mapped_to",
      description: "PnL Line —[mapped_to]→ GL Account",
      linkType: "bkg",
    },
    {
      id: "l_attributed_to_7c4dc87e70",
      source: "ent_pnl_line",
      target: "ent_cost_center",
      type: "attributed_to",
      description: "PnL Line —[attributed_to]→ Cost Center",
      linkType: "bkg",
    },
    {
      id: "l_has_scenario_11c526ede9",
      source: "ent_fin_pack",
      target: "sc_actual",
      type: "has_scenario",
      description: "Monthly Finance Pack (PnL + MI) —[has_scenario]→ Actual",
      linkType: "data",
    },
    {
      id: "l_has_scenario_32d017b3d0",
      source: "ent_fin_pack",
      target: "sc_budget",
      type: "has_scenario",
      description: "Monthly Finance Pack (PnL + MI) —[has_scenario]→ Budget",
      linkType: "data",
    },
    {
      id: "l_has_scenario_82e49491c0",
      source: "ent_fin_pack",
      target: "sc_forecast",
      type: "has_scenario",
      description: "Monthly Finance Pack (PnL + MI) —[has_scenario]→ Forecast",
      linkType: "data",
    },
    {
      id: "l_attributable_to_fa1ea3a7ca",
      source: "ent_pnl_line",
      target: "drv_price",
      type: "attributable_to",
      description: "PnL Line —[attributable_to]→ Price Effect",
      linkType: "bkg",
    },
    {
      id: "l_attributable_to_f70c128075",
      source: "ent_pnl_line",
      target: "drv_volume",
      type: "attributable_to",
      description: "PnL Line —[attributable_to]→ Volume Effect",
      linkType: "bkg",
    },
    {
      id: "l_attributable_to_3abf1c2df2",
      source: "ent_pnl_line",
      target: "drv_mix",
      type: "attributable_to",
      description: "PnL Line —[attributable_to]→ Mix Effect",
      linkType: "bkg",
    },
    {
      id: "l_attributable_to_6a2fac64fd",
      source: "ent_pnl_line",
      target: "drv_trade_spend",
      type: "attributable_to",
      description: "PnL Line —[attributable_to]→ Trade Spend Effect",
      linkType: "bkg",
    },
    {
      id: "l_attributable_to_0d32cccbab",
      source: "ent_pnl_line",
      target: "drv_distribution",
      type: "attributable_to",
      description: "PnL Line —[attributable_to]→ Distribution Effect",
      linkType: "bkg",
    },
    {
      id: "l_has_component_3c72e9e605",
      source: "gcpl_trade",
      target: "trade_entities",
      type: "has_component",
      description: "Trade & Promotions —[has_component]→ Trade Entities",
      linkType: "bkg",
    },
    {
      id: "l_has_component_974791124f",
      source: "gcpl_trade",
      target: "trade_artifacts",
      type: "has_component",
      description: "Trade & Promotions —[has_component]→ Trade Artifacts",
      linkType: "bkg",
    },
    {
      id: "l_includes_ca40deced0",
      source: "trade_entities",
      target: "ent_promotion",
      type: "includes",
      description: "Trade Entities —[includes]→ Promotion",
      linkType: "bkg",
    },
    {
      id: "l_includes_e645914377",
      source: "trade_entities",
      target: "ent_scheme",
      type: "includes",
      description: "Trade Entities —[includes]→ Scheme",
      linkType: "bkg",
    },
    {
      id: "l_includes_e80a88685c",
      source: "trade_entities",
      target: "ent_mechanic",
      type: "includes",
      description: "Trade Entities —[includes]→ Mechanic",
      linkType: "bkg",
    },
    {
      id: "l_includes_797116b6e2",
      source: "trade_entities",
      target: "ent_trade_spend",
      type: "includes",
      description: "Trade Entities —[includes]→ Trade Spend",
      linkType: "bkg",
    },
    {
      id: "l_includes_20255f78b0",
      source: "trade_entities",
      target: "ent_promo_outcome",
      type: "includes",
      description: "Trade Entities —[includes]→ Promo Outcome",
      linkType: "bkg",
    },
    {
      id: "l_includes_ebf073b77a",
      source: "trade_artifacts",
      target: "art_trade_calendar_local",
      type: "includes",
      description: "Trade Artifacts —[includes]→ Trade Calendar",
      linkType: "bkg",
    },
    {
      id: "l_same_as_e5d04881bc",
      source: "art_trade_calendar",
      target: "art_trade_calendar_local",
      type: "same_as",
      description: "Trade Calendar —[same_as]→ Trade Calendar",
      linkType: "bkg",
    },
    {
      id: "l_applies_to_e2d80beb95",
      source: "ent_promotion",
      target: "ent_product",
      type: "applies_to",
      description: "Promotion —[applies_to]→ Product",
      linkType: "bkg",
    },
    {
      id: "l_active_in_f196a1aeda",
      source: "ent_promotion",
      target: "ent_geo",
      type: "active_in",
      description: "Promotion —[active_in]→ Geography",
      linkType: "bkg",
    },
    {
      id: "l_active_in_815e18dd75",
      source: "ent_promotion",
      target: "ent_channel",
      type: "active_in",
      description: "Promotion —[active_in]→ Channel",
      linkType: "bkg",
    },
    {
      id: "l_active_in_aa3bec63a0",
      source: "ent_promotion",
      target: "ent_time",
      type: "active_in",
      description: "Promotion —[active_in]→ Time",
      linkType: "bkg",
    },
    {
      id: "l_uses_217547e81c",
      source: "ent_promotion",
      target: "ent_mechanic",
      type: "uses",
      description: "Promotion —[uses]→ Mechanic",
      linkType: "bkg",
    },
    {
      id: "l_funded_by_0fc2bf3814",
      source: "ent_promotion",
      target: "ent_trade_spend",
      type: "funded_by",
      description: "Promotion —[funded_by]→ Trade Spend",
      linkType: "bkg",
    },
    {
      id: "l_results_in_3f20b9181a",
      source: "ent_promotion",
      target: "ent_promo_outcome",
      type: "results_in",
      description: "Promotion —[results_in]→ Promo Outcome",
      linkType: "bkg",
    },
    {
      id: "l_linked_to_pnl_line_8b6b98d8da",
      source: "ent_trade_spend",
      target: "ent_pnl_line",
      type: "linked_to_pnl_line",
      description: "Trade Spend —[linked_to_pnl_line]→ PnL Line",
      linkType: "bkg",
    },
    {
      id: "l_observed_in_7bde10aa36",
      source: "ent_promo_outcome",
      target: "txn_primary_sale",
      type: "observed_in",
      description: "Promo Outcome —[observed_in]→ Primary Sale (Sell-in)",
      linkType: "data",
    },
    {
      id: "l_observed_in_c389bb51ae",
      source: "ent_promo_outcome",
      target: "txn_secondary_sale",
      type: "observed_in",
      description:
        "Promo Outcome —[observed_in]→ Secondary Sale (Sell-out / Proxy)",
      linkType: "data",
    },
    {
      id: "l_has_component_4794c874df",
      source: "gcpl_market",
      target: "mkt_entities",
      type: "has_component",
      description:
        "Market & Consumer —[has_component]→ Market/Consumer Entities",
      linkType: "bkg",
    },
    {
      id: "l_includes_f92dfb463b",
      source: "mkt_entities",
      target: "ent_market_indicator",
      type: "includes",
      description: "Market/Consumer Entities —[includes]→ Market Indicator",
      linkType: "bkg",
    },
    {
      id: "l_includes_bd2002257f",
      source: "mkt_entities",
      target: "ent_share_metric",
      type: "includes",
      description: "Market/Consumer Entities —[includes]→ Share Metric",
      linkType: "bkg",
    },
    {
      id: "l_includes_1f4282a874",
      source: "mkt_entities",
      target: "ent_price_index",
      type: "includes",
      description: "Market/Consumer Entities —[includes]→ Price Index",
      linkType: "bkg",
    },
    {
      id: "l_includes_c9e5769a1c",
      source: "mkt_entities",
      target: "ent_distribution_metric",
      type: "includes",
      description: "Market/Consumer Entities —[includes]→ Distribution Metric",
      linkType: "bkg",
    },
    {
      id: "l_includes_ea0f987882",
      source: "mkt_entities",
      target: "ent_consumer_segment",
      type: "includes",
      description: "Market/Consumer Entities —[includes]→ Consumer Segment",
      linkType: "bkg",
    },
    {
      id: "l_includes_1658f889e4",
      source: "mkt_entities",
      target: "ent_competition_set",
      type: "includes",
      description: "Market/Consumer Entities —[includes]→ Competition Set",
      linkType: "bkg",
    },
    {
      id: "l_measured_for_8c765b30ec",
      source: "ent_market_indicator",
      target: "prod_brand",
      type: "measured_for",
      description: "Market Indicator —[measured_for]→ Brand",
      linkType: "bkg",
    },
    {
      id: "l_measured_for_17eea63a6c",
      source: "ent_market_indicator",
      target: "prod_category",
      type: "measured_for",
      description: "Market Indicator —[measured_for]→ Category",
      linkType: "bkg",
    },
    {
      id: "l_measured_for_0447b4d1d4",
      source: "ent_market_indicator",
      target: "ent_geo",
      type: "measured_for",
      description: "Market Indicator —[measured_for]→ Geography",
      linkType: "bkg",
    },
    {
      id: "l_measured_for_d7d2b8bc85",
      source: "ent_market_indicator",
      target: "ent_time",
      type: "measured_for",
      description: "Market Indicator —[measured_for]→ Time",
      linkType: "bkg",
    },
    {
      id: "l_derived_from_f28f8894ce",
      source: "ent_share_metric",
      target: "ent_market_indicator",
      type: "derived_from",
      description: "Share Metric —[derived_from]→ Market Indicator",
      linkType: "bkg",
    },
    {
      id: "l_benchmarked_against_1bff396bef",
      source: "ent_price_index",
      target: "ent_competition_set",
      type: "benchmarked_against",
      description: "Price Index —[benchmarked_against]→ Competition Set",
      linkType: "bkg",
    },
    {
      id: "l_observed_in_b42c52f80e",
      source: "ent_distribution_metric",
      target: "ent_geo",
      type: "observed_in",
      description: "Distribution Metric —[observed_in]→ Geography",
      linkType: "bkg",
    },
    {
      id: "l_observed_in_34df2611a8",
      source: "ent_distribution_metric",
      target: "ent_time",
      type: "observed_in",
      description: "Distribution Metric —[observed_in]→ Time",
      linkType: "bkg",
    },
    {
      id: "l_correlated_with_4abba88a95",
      source: "ent_distribution_metric",
      target: "txn_secondary_sale",
      type: "correlated_with",
      description:
        "Distribution Metric —[correlated_with]→ Secondary Sale (Sell-out / Proxy)",
      linkType: "data",
    },
    {
      id: "l_has_component_a942809036",
      source: "gcpl_planning",
      target: "plan_entities",
      type: "has_component",
      description:
        "Demand, Forecasting & Budgeting —[has_component]→ Planning Entities",
      linkType: "bkg",
    },
    {
      id: "l_has_component_19545d8f35",
      source: "gcpl_planning",
      target: "plan_assumptions",
      type: "has_component",
      description:
        "Demand, Forecasting & Budgeting —[has_component]→ Assumptions",
      linkType: "bkg",
    },
    {
      id: "l_includes_3d8237c8a3",
      source: "plan_entities",
      target: "ent_forecast",
      type: "includes",
      description: "Planning Entities —[includes]→ Forecast",
      linkType: "data",
    },
    {
      id: "l_includes_4084abc4e3",
      source: "plan_entities",
      target: "ent_budget",
      type: "includes",
      description: "Planning Entities —[includes]→ Budget",
      linkType: "data",
    },
    {
      id: "l_includes_2097cebb91",
      source: "plan_entities",
      target: "ent_demand_plan",
      type: "includes",
      description: "Planning Entities —[includes]→ Demand Plan",
      linkType: "bkg",
    },
    {
      id: "l_includes_67a49e0867",
      source: "plan_assumptions",
      target: "ass_seasonality",
      type: "includes",
      description: "Assumptions —[includes]→ Seasonality",
      linkType: "bkg",
    },
    {
      id: "l_includes_25c18e9952",
      source: "plan_assumptions",
      target: "ass_price_change",
      type: "includes",
      description: "Assumptions —[includes]→ Price Change",
      linkType: "bkg",
    },
    {
      id: "l_includes_39200b8bb0",
      source: "plan_assumptions",
      target: "ass_promo_calendar",
      type: "includes",
      description: "Assumptions —[includes]→ Promotion Calendar",
      linkType: "bkg",
    },
    {
      id: "l_includes_b446a6dd4a",
      source: "plan_assumptions",
      target: "ass_distribution_change",
      type: "includes",
      description: "Assumptions —[includes]→ Distribution Change",
      linkType: "bkg",
    },
    {
      id: "l_for_7d46bce0f0",
      source: "ent_forecast",
      target: "ent_product",
      type: "for",
      description: "Forecast —[for]→ Product",
      linkType: "data",
    },
    {
      id: "l_for_bb04892c92",
      source: "ent_forecast",
      target: "ent_geo",
      type: "for",
      description: "Forecast —[for]→ Geography",
      linkType: "data",
    },
    {
      id: "l_for_584fa73472",
      source: "ent_forecast",
      target: "ent_time",
      type: "for",
      description: "Forecast —[for]→ Time",
      linkType: "data",
    },
    {
      id: "l_has_scenario_887b72a037",
      source: "ent_forecast",
      target: "sc_forecast",
      type: "has_scenario",
      description: "Forecast —[has_scenario]→ Forecast",
      linkType: "data",
    },
    {
      id: "l_based_on_6cf5164ea9",
      source: "ent_forecast",
      target: "ass_seasonality",
      type: "based_on",
      description: "Forecast —[based_on]→ Seasonality",
      linkType: "bkg",
    },
    {
      id: "l_based_on_0e983eb698",
      source: "ent_forecast",
      target: "ass_price_change",
      type: "based_on",
      description: "Forecast —[based_on]→ Price Change",
      linkType: "bkg",
    },
    {
      id: "l_based_on_03f8d8e5f3",
      source: "ent_forecast",
      target: "ass_promo_calendar",
      type: "based_on",
      description: "Forecast —[based_on]→ Promotion Calendar",
      linkType: "bkg",
    },
    {
      id: "l_based_on_b9d5bb9295",
      source: "ent_forecast",
      target: "ass_distribution_change",
      type: "based_on",
      description: "Forecast —[based_on]→ Distribution Change",
      linkType: "bkg",
    },
    {
      id: "l_for_d6be663425",
      source: "ent_budget",
      target: "ent_pnl_line",
      type: "for",
      description: "Budget —[for]→ PnL Line",
      linkType: "data",
    },
    {
      id: "l_for_ee1d5075e3",
      source: "ent_budget",
      target: "ent_geo",
      type: "for",
      description: "Budget —[for]→ Geography",
      linkType: "data",
    },
    {
      id: "l_for_b9104c77e6",
      source: "ent_budget",
      target: "ent_time",
      type: "for",
      description: "Budget —[for]→ Time",
      linkType: "data",
    },
    {
      id: "l_has_scenario_db3c716b4a",
      source: "ent_budget",
      target: "sc_budget",
      type: "has_scenario",
      description: "Budget —[has_scenario]→ Budget",
      linkType: "data",
    },
    {
      id: "l_compared_with_actuals_533d0bbe9f",
      source: "ent_forecast",
      target: "txn_secondary_sale",
      type: "compared_with_actuals",
      description:
        "Forecast —[compared_with_actuals]→ Secondary Sale (Sell-out / Proxy)",
      linkType: "data",
    },
    {
      id: "l_compared_with_actuals_b200f2abea",
      source: "ent_forecast",
      target: "txn_primary_sale",
      type: "compared_with_actuals",
      description: "Forecast —[compared_with_actuals]→ Primary Sale (Sell-in)",
      linkType: "data",
    },
    {
      id: "l_has_component_2889a7baca",
      source: "gcpl_supply",
      target: "supply_entities",
      type: "has_component",
      description: "Supply & Inventory —[has_component]→ Supply Entities",
      linkType: "bkg",
    },
    {
      id: "l_has_component_daef65809a",
      source: "gcpl_supply",
      target: "supply_artifacts",
      type: "has_component",
      description: "Supply & Inventory —[has_component]→ Supply Artifacts",
      linkType: "bkg",
    },
    {
      id: "l_includes_0b3d07af15",
      source: "supply_entities",
      target: "ent_inventory_position",
      type: "includes",
      description: "Supply Entities —[includes]→ Inventory Position",
      linkType: "data",
    },
    {
      id: "l_includes_cf0d0980f0",
      source: "supply_entities",
      target: "ent_stock_status",
      type: "includes",
      description: "Supply Entities —[includes]→ Stock Status",
      linkType: "data",
    },
    {
      id: "l_includes_7a19a5ecc5",
      source: "supply_entities",
      target: "ent_warehouse",
      type: "includes",
      description: "Supply Entities —[includes]→ Warehouse",
      linkType: "bkg",
    },
    {
      id: "l_includes_178dd4f27e",
      source: "supply_entities",
      target: "ent_depot",
      type: "includes",
      description: "Supply Entities —[includes]→ Depot",
      linkType: "bkg",
    },
    {
      id: "l_includes_b3207969c3",
      source: "supply_artifacts",
      target: "art_replenishment_plan",
      type: "includes",
      description: "Supply Artifacts —[includes]→ Replenishment Plan",
      linkType: "bkg",
    },
    {
      id: "l_of_0bfb87675b",
      source: "ent_inventory_position",
      target: "ent_product",
      type: "of",
      description: "Inventory Position —[of]→ Product",
      linkType: "data",
    },
    {
      id: "l_as_of_51f95a67a1",
      source: "ent_inventory_position",
      target: "ent_time",
      type: "as_of",
      description: "Inventory Position —[as_of]→ Time",
      linkType: "data",
    },
    {
      id: "l_located_at_fb3bd45bc4",
      source: "ent_inventory_position",
      target: "ent_warehouse",
      type: "located_at",
      description: "Inventory Position —[located_at]→ Warehouse",
      linkType: "bkg",
    },
    {
      id: "l_located_at_1556f0f1a5",
      source: "ent_inventory_position",
      target: "ent_depot",
      type: "located_at",
      description: "Inventory Position —[located_at]→ Depot",
      linkType: "bkg",
    },
    {
      id: "l_of_8e74cd5cde",
      source: "ent_stock_status",
      target: "ent_product",
      type: "of",
      description: "Stock Status —[of]→ Product",
      linkType: "data",
    },
    {
      id: "l_as_of_29304e78d5",
      source: "ent_stock_status",
      target: "ent_time",
      type: "as_of",
      description: "Stock Status —[as_of]→ Time",
      linkType: "data",
    },
    {
      id: "l_observed_at_1998074f8f",
      source: "ent_stock_status",
      target: "ent_warehouse",
      type: "observed_at",
      description: "Stock Status —[observed_at]→ Warehouse",
      linkType: "bkg",
    },
    {
      id: "l_observed_at_a40c6dc141",
      source: "ent_stock_status",
      target: "ent_depot",
      type: "observed_at",
      description: "Stock Status —[observed_at]→ Depot",
      linkType: "bkg",
    },
    {
      id: "l_informs_62c837dde3",
      source: "ent_forecast",
      target: "art_replenishment_plan",
      type: "informs",
      description: "Forecast —[informs]→ Replenishment Plan",
      linkType: "bkg",
    },
    {
      id: "l_associated_with_e4963b2f8d",
      source: "ent_stock_status",
      target: "txn_secondary_sale",
      type: "associated_with",
      description:
        "Stock Status —[associated_with]→ Secondary Sale (Sell-out / Proxy)",
      linkType: "data",
    },
    {
      id: "l_has_component_7048388f9a",
      source: "gcpl_systems",
      target: "sys_platforms",
      type: "has_component",
      description: "Systems & Data Platform —[has_component]→ Platforms & Apps",
      linkType: "data",
    },
    {
      id: "l_has_component_41e6e464b1",
      source: "gcpl_systems",
      target: "sys_data_products",
      type: "has_component",
      description: "Systems & Data Platform —[has_component]→ Data Products",
      linkType: "data",
    },
    {
      id: "l_includes_eb53fcd35e",
      source: "sys_platforms",
      target: "sys_databricks",
      type: "includes",
      description: "Platforms & Apps —[includes]→ Databricks Lakehouse",
      linkType: "data",
    },
    {
      id: "l_includes_1e05056d48",
      source: "sys_platforms",
      target: "sys_anaplan",
      type: "includes",
      description: "Platforms & Apps —[includes]→ Anaplan (Budget/Forecast)",
      linkType: "data",
    },
    {
      id: "l_includes_bc666af6f0",
      source: "sys_platforms",
      target: "sys_o9",
      type: "includes",
      description: "Platforms & Apps —[includes]→ o9 (Supply Chain Planning)",
      linkType: "data",
    },
    {
      id: "l_includes_e2272a1826",
      source: "sys_platforms",
      target: "sys_sfa_crm",
      type: "includes",
      description: "Platforms & Apps —[includes]→ SFA/CRM (e.g., Salesforce)",
      linkType: "data",
    },
    {
      id: "l_includes_6023e7629b",
      source: "sys_data_products",
      target: "dp_master_data",
      type: "includes",
      description: "Data Products —[includes]→ Master Data Mart",
      linkType: "data",
    },
    {
      id: "l_hosts_507c7fce19",
      source: "sys_databricks",
      target: "dp_master_data",
      type: "hosts",
      description: "Databricks Lakehouse —[hosts]→ Master Data Mart",
      linkType: "data",
    },
    {
      id: "l_includes_5a04dbc85d",
      source: "sys_data_products",
      target: "dp_finance_pack",
      type: "includes",
      description: "Data Products —[includes]→ Finance Pack Mart",
      linkType: "data",
    },
    {
      id: "l_hosts_879e265663",
      source: "sys_databricks",
      target: "dp_finance_pack",
      type: "hosts",
      description: "Databricks Lakehouse —[hosts]→ Finance Pack Mart",
      linkType: "data",
    },
    {
      id: "l_includes_4b00de6b66",
      source: "sys_data_products",
      target: "dp_sales",
      type: "includes",
      description: "Data Products —[includes]→ Sales Mart (Primary+Secondary)",
      linkType: "data",
    },
    {
      id: "l_hosts_c0c3d75194",
      source: "sys_databricks",
      target: "dp_sales",
      type: "hosts",
      description:
        "Databricks Lakehouse —[hosts]→ Sales Mart (Primary+Secondary)",
      linkType: "data",
    },
    {
      id: "l_includes_2f01a4d995",
      source: "sys_data_products",
      target: "dp_promotions",
      type: "includes",
      description: "Data Products —[includes]→ Promotions Mart",
      linkType: "data",
    },
    {
      id: "l_hosts_e1eaf51b53",
      source: "sys_databricks",
      target: "dp_promotions",
      type: "hosts",
      description: "Databricks Lakehouse —[hosts]→ Promotions Mart",
      linkType: "data",
    },
    {
      id: "l_includes_d969fa77d9",
      source: "sys_data_products",
      target: "dp_market",
      type: "includes",
      description: "Data Products —[includes]→ Market/Consumer Mart",
      linkType: "data",
    },
    {
      id: "l_hosts_44c3c25833",
      source: "sys_databricks",
      target: "dp_market",
      type: "hosts",
      description: "Databricks Lakehouse —[hosts]→ Market/Consumer Mart",
      linkType: "data",
    },
    {
      id: "l_source_for_bf4bd1d5f8",
      source: "sys_anaplan",
      target: "ent_forecast",
      type: "source_for",
      description: "Anaplan (Budget/Forecast) —[source_for]→ Forecast",
      linkType: "data",
    },
    {
      id: "l_source_for_ffc04eff21",
      source: "sys_anaplan",
      target: "ent_budget",
      type: "source_for",
      description: "Anaplan (Budget/Forecast) —[source_for]→ Budget",
      linkType: "data",
    },
    {
      id: "l_stores_9f52a8aab1",
      source: "sys_databricks",
      target: "ent_fin_pack",
      type: "stores",
      description:
        "Databricks Lakehouse —[stores]→ Monthly Finance Pack (PnL + MI)",
      linkType: "data",
    },
    {
      id: "l_stores_3adb4ddb96",
      source: "sys_databricks",
      target: "txn_primary_sale",
      type: "stores",
      description: "Databricks Lakehouse —[stores]→ Primary Sale (Sell-in)",
      linkType: "data",
    },
    {
      id: "l_stores_4590d106b8",
      source: "sys_databricks",
      target: "txn_secondary_sale",
      type: "stores",
      description:
        "Databricks Lakehouse —[stores]→ Secondary Sale (Sell-out / Proxy)",
      linkType: "data",
    },
    {
      id: "l_stores_80760cf9d6",
      source: "sys_databricks",
      target: "ent_promotion",
      type: "stores",
      description: "Databricks Lakehouse —[stores]→ Promotion",
      linkType: "data",
    },
    {
      id: "l_stores_95ffd8e907",
      source: "sys_databricks",
      target: "ent_market_indicator",
      type: "stores",
      description: "Databricks Lakehouse —[stores]→ Market Indicator",
      linkType: "data",
    },
    {
      id: "l_feeds_122b03beeb",
      source: "dp_finance_pack",
      target: "proc_mbr",
      type: "feeds",
      description: "Finance Pack Mart —[feeds]→ Monthly Business Review (MBR)",
      linkType: "data",
    },
    {
      id: "l_feeds_e5ac682a1c",
      source: "dp_sales",
      target: "proc_mbr",
      type: "feeds",
      description:
        "Sales Mart (Primary+Secondary) —[feeds]→ Monthly Business Review (MBR)",
      linkType: "data",
    },
    {
      id: "l_feeds_6ac985de54",
      source: "dp_promotions",
      target: "proc_trade_planning",
      type: "feeds",
      description: "Promotions Mart —[feeds]→ Trade Planning Cycle",
      linkType: "data",
    },
    {
      id: "l_feeds_c2ede84427",
      source: "dp_market",
      target: "proc_mbr",
      type: "feeds",
      description:
        "Market/Consumer Mart —[feeds]→ Monthly Business Review (MBR)",
      linkType: "data",
    },
    {
      id: "l_feeds_89d7181210",
      source: "dp_sales",
      target: "proc_sop",
      type: "feeds",
      description: "Sales Mart (Primary+Secondary) —[feeds]→ S&OP Cycle",
      linkType: "data",
    },
    {
      id: "l_supports_f160c75a98",
      source: "dp_master_data",
      target: "proc_monthly_close",
      type: "supports",
      description: "Master Data Mart —[supports]→ Monthly Close",
      linkType: "data",
    },
    {
      id: "l_has_component_a34b40f551",
      source: "gcpl_external",
      target: "ext_entities",
      type: "has_component",
      description:
        "External Context & Seasonality —[has_component]→ External Entities",
      linkType: "bkg",
    },
    {
      id: "l_includes_d489e960a8",
      source: "ext_entities",
      target: "ext_season",
      type: "includes",
      description: "External Entities —[includes]→ Season",
      linkType: "bkg",
    },
    {
      id: "l_includes_513a3645e8",
      source: "ext_entities",
      target: "ext_weather_signal",
      type: "includes",
      description: "External Entities —[includes]→ Weather Signal (proxy)",
      linkType: "bkg",
    },
    {
      id: "l_includes_996dd40f4d",
      source: "ext_entities",
      target: "ext_event",
      type: "includes",
      description:
        "External Entities —[includes]→ Event / Festival / Monsoon Onset",
      linkType: "bkg",
    },
    {
      id: "l_includes_bdb24a8e03",
      source: "ext_entities",
      target: "ext_category_seasonality",
      type: "includes",
      description:
        "External Entities —[includes]→ Category Seasonality Profile",
      linkType: "bkg",
    },
    {
      id: "l_affects_8cd595eb6e",
      source: "ext_season",
      target: "prod_category",
      type: "affects",
      description: "Season —[affects]→ Category",
      linkType: "bkg",
    },
    {
      id: "l_varies_by_9ea5beaade",
      source: "ext_weather_signal",
      target: "ent_geo",
      type: "varies_by",
      description: "Weather Signal (proxy) —[varies_by]→ Geography",
      linkType: "bkg",
    },
    {
      id: "l_varies_by_a4ed23d396",
      source: "ext_weather_signal",
      target: "ent_time",
      type: "varies_by",
      description: "Weather Signal (proxy) —[varies_by]→ Time",
      linkType: "bkg",
    },
    {
      id: "l_associated_with_fd092aac03",
      source: "ext_weather_signal",
      target: "txn_secondary_sale",
      type: "associated_with",
      description:
        "Weather Signal (proxy) —[associated_with]→ Secondary Sale (Sell-out / Proxy)",
      linkType: "data",
    },
    {
      id: "l_occurs_in_a8c7322c77",
      source: "ext_event",
      target: "ent_geo",
      type: "occurs_in",
      description: "Event / Festival / Monsoon Onset —[occurs_in]→ Geography",
      linkType: "bkg",
    },
    {
      id: "l_occurs_in_423c42832b",
      source: "ext_event",
      target: "ent_time",
      type: "occurs_in",
      description: "Event / Festival / Monsoon Onset —[occurs_in]→ Time",
      linkType: "bkg",
    },
    {
      id: "l_for_9d791b6901",
      source: "ext_category_seasonality",
      target: "prod_category",
      type: "for",
      description: "Category Seasonality Profile —[for]→ Category",
      linkType: "bkg",
    },
    {
      id: "l_uses_9518bfa574",
      source: "ext_category_seasonality",
      target: "ext_season",
      type: "uses",
      description: "Category Seasonality Profile —[uses]→ Season",
      linkType: "bkg",
    },
    {
      id: "l_has_component_3b572ec6fd",
      source: "gcpl_manufacturing",
      target: "mfg_entities",
      type: "has_component",
      description:
        "Manufacturing & Plants (Optional) —[has_component]→ Manufacturing Entities",
      linkType: "bkg",
    },
    {
      id: "l_includes_b64c4c1554",
      source: "mfg_entities",
      target: "mfg_plant",
      type: "includes",
      description: "Manufacturing Entities —[includes]→ Plant",
      linkType: "bkg",
    },
    {
      id: "l_includes_40e5a39f6c",
      source: "mfg_entities",
      target: "mfg_production_line",
      type: "includes",
      description: "Manufacturing Entities —[includes]→ Production Line",
      linkType: "bkg",
    },
    {
      id: "l_includes_6ecd9e5b42",
      source: "mfg_entities",
      target: "mfg_capacity",
      type: "includes",
      description: "Manufacturing Entities —[includes]→ Capacity",
      linkType: "bkg",
    },
    {
      id: "l_includes_53df616204",
      source: "mfg_entities",
      target: "mfg_output",
      type: "includes",
      description: "Manufacturing Entities —[includes]→ Output",
      linkType: "data",
    },
    {
      id: "l_includes_8466f4a040",
      source: "mfg_entities",
      target: "mfg_downtime",
      type: "includes",
      description: "Manufacturing Entities —[includes]→ Downtime",
      linkType: "data",
    },
    {
      id: "l_includes_d6e8f82887",
      source: "mfg_entities",
      target: "mfg_edge_machine_data",
      type: "includes",
      description:
        "Manufacturing Entities —[includes]→ High-frequency Machine Data (Edge)",
      linkType: "data",
    },
    {
      id: "l_has_ae2da455a6",
      source: "mfg_plant",
      target: "mfg_production_line",
      type: "has",
      description: "Plant —[has]→ Production Line",
      linkType: "bkg",
    },
    {
      id: "l_has_capacity_7e86fa943d",
      source: "mfg_production_line",
      target: "mfg_capacity",
      type: "has_capacity",
      description: "Production Line —[has_capacity]→ Capacity",
      linkType: "bkg",
    },
    {
      id: "l_produced_at_caa2f6a366",
      source: "mfg_output",
      target: "mfg_plant",
      type: "produced_at",
      description: "Output —[produced_at]→ Plant",
      linkType: "data",
    },
    {
      id: "l_observed_at_de2e55cd1e",
      source: "mfg_downtime",
      target: "mfg_production_line",
      type: "observed_at",
      description: "Downtime —[observed_at]→ Production Line",
      linkType: "data",
    },
    {
      id: "l_captured_from_e5fa3df6cf",
      source: "mfg_edge_machine_data",
      target: "mfg_production_line",
      type: "captured_from",
      description:
        "High-frequency Machine Data (Edge) —[captured_from]→ Production Line",
      linkType: "data",
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

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
      id: "product",
      name: "Product",
      description:
        "Definition of the portfolio, how products are structured, governed, and quality-assured.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "channel",
      name: "Channel",
      description:
        "Route-to-market structure: distribution partners, retail formats, and digital/institutional channels.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "sales",
      name: "Sales",
      description:
        "Commercial execution: orders, billing, returns, schemes, and sell-through performance.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "planning",
      name: "Demand & Planning",
      description:
        "Forecasting, S&OP, and planning signals that drive procurement, production, and replenishment.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "supply_chain",
      name: "Supply Chain & Inventory",
      description:
        "Inbound/outbound logistics, warehousing, and multi-type inventory control.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "manufacturing",
      name: "Manufacturing & Quality",
      description:
        "In-house and outsourced production, testing, quality systems, and operational excellence.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "service",
      name: "After-Sales Service",
      description:
        "Service network, complaints, warranty, repairs, and spare parts ecosystem.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "finance_risk",
      name: "Finance & Risk",
      description:
        "Revenue/cost, working capital, controls, and risk governance.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "compliance_esg",
      name: "Compliance & ESG",
      description:
        "Product regulations, sustainability obligations, and governance frameworks.",
      level: 1,
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },

    {
      id: "product_portfolio",
      name: "Product Portfolio",
      description: "Top-level grouping of product categories and sub-families.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "product_structure",
      name: "Product Structure",
      description:
        "How products are represented: hierarchy, specifications, variants, and identifiers.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "product_quality",
      name: "Product Quality",
      description:
        "Quality attributes, reliability, testing gates, and field-failure feedback loop.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "product_compliance",
      name: "Product Compliance Attributes",
      description:
        "Regulatory/labeling attributes that attach to product definitions.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },

    {
      id: "channel_partners",
      name: "Channel Partners",
      description: "Intermediaries who buy, stock, and resell products.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "retail_formats",
      name: "Retail Formats",
      description: "Retail endpoints where products are sold and merchandised.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "digital_channels",
      name: "Digital Channels",
      description:
        "Online route-to-market and assisted digital commerce constructs.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "institutional_channels",
      name: "Institutional & Project Channels",
      description:
        "Non-retail selling motions such as project, institutional, or tender-led demand.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },

    {
      id: "commercial_documents",
      name: "Commercial Documents",
      description: "Order-to-cash documents and records used to execute sales.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "pricing_trade",
      name: "Pricing & Trade Terms",
      description:
        "Price lists, discounts, credit terms, and channel-wise trade constructs.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "trade_promo",
      name: "Trade Promotion & Visibility",
      description:
        "Schemes, incentives, and retail execution levers that influence sell-through.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "sales_performance",
      name: "Sales Performance",
      description:
        "Primary/secondary sales, sell-through signals, and returns/claims impact.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },

    {
      id: "demand_signals",
      name: "Demand Signals",
      description:
        "Signals that shape demand: seasonality, channel pull, and market dynamics.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "forecasting",
      name: "Forecasting",
      description:
        "Forecast models, assumptions, and forecast accuracy governance.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "sop",
      name: "S&OP",
      description:
        "Consensus planning process aligning demand, supply, and financial constraints.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "replenishment",
      name: "Replenishment Planning",
      description:
        "Rules/logic to allocate inventory and replenish channel nodes.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },

    {
      id: "inventory",
      name: "Inventory",
      description:
        "Multi-type inventory: raw, WIP, finished goods, spares; with policy controls.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "warehousing",
      name: "Warehousing",
      description: "Warehouses/DCs, storage policies, and dispatch readiness.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "logistics",
      name: "Logistics",
      description:
        "Inbound and outbound movements, transporters, and delivery performance.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "distribution_ops",
      name: "Distribution Operations",
      description:
        "Distribution operating system: processes, partner SOPs, and service levels.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },

    {
      id: "manufacturing_network",
      name: "Manufacturing Network",
      description:
        "Owned facilities plus outsourced/contract manufacturing configuration.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "procurement",
      name: "Procurement & Sourcing",
      description:
        "Supplier ecosystem, BOM-driven sourcing, and make-vs-buy decisions.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "production_execution",
      name: "Production Execution",
      description:
        "Work orders, routings, line performance, and throughput controls.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "quality_system",
      name: "Quality System",
      description:
        "In-plant and vendor quality, audits, defect management, and corrective actions.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },

    {
      id: "service_network",
      name: "Service Network",
      description:
        "Service centers/partners and coverage model to support installed base.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "service_case",
      name: "Service Case Management",
      description:
        "Complaint/ticket lifecycle, diagnosis, repair order, and closure.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "warranty",
      name: "Warranty & Claims",
      description:
        "Warranty policies, claims approval, reimbursements, and provisions linkage.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "spares",
      name: "Spare Parts",
      description:
        "Spare part catalog, availability, replenishment, and technician consumption.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },

    {
      id: "financials",
      name: "Financials",
      description: "Revenue, cost, margin, and profitability constructs.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "working_capital",
      name: "Working Capital",
      description: "Receivables, payables, and inventory valuation impacts.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "controls_audit",
      name: "Controls & Audit",
      description:
        "Internal controls, audits, and control findings remediation.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "risk_mgmt",
      name: "Risk Management",
      description:
        "Operational, financial, and compliance risks with mitigation ownership.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },

    {
      id: "product_regulation",
      name: "Product Regulation",
      description:
        "Product-level regulations and labeling obligations impacting design and sale.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "environment",
      name: "Environment & Circularity",
      description:
        "Packaging, waste reduction, and lifecycle sustainability obligations.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "governance",
      name: "Governance",
      description:
        "Board/committee oversight and policy framework for accountability.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },
    {
      id: "ethics",
      name: "Ethics & Compliance Operations",
      description: "Compliance monitoring, reporting, and corrective actions.",
      level: 2,
      size: 14,
      color: "#0F172A",
      type: "bkg",
    },

    {
      id: "category_fans",
      name: "Category: Fans",
      description:
        "Fans as a portfolio category with technology, efficiency, and design attributes.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "category_lighting",
      name: "Category: Lighting",
      description:
        "Lighting portfolio including consumer and professional lighting constructs.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "category_pumps",
      name: "Category: Pumps",
      description:
        "Pumps portfolio spanning residential and broader application constructs.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "category_appliances",
      name: "Category: Appliances",
      description:
        "Appliances portfolio spanning thermal comfort and home/kitchen electricals.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "product_hierarchy",
      name: "Product Hierarchy",
      description:
        "Portfolio breakdown from category to line to model with standard identifiers.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "product_specs",
      name: "Product Specifications",
      description:
        "Technical and consumer-facing attributes used in cataloging and selling.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "warranty_terms",
      name: "Warranty Terms",
      description:
        "Coverage scope, duration, exclusions, and proof-of-purchase requirements.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "field_feedback",
      name: "Field Failure Feedback",
      description:
        "Failure modes captured from service cases feeding design/quality actions.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "distributor",
      name: "Distributor",
      description:
        "Primary channel partner handling regional stocking and onward distribution.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "cfa",
      name: "Carrying & Forwarding Agent",
      description:
        "Distribution operations node managing storage and dispatch on behalf of brand.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "general_trade",
      name: "General Trade",
      description: "Traditional retail motion with broad geographic reach.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "modern_trade",
      name: "Modern Trade",
      description:
        "Organised retail format with central buying and structured assortment.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "brand_d2c",
      name: "Brand Direct Online",
      description:
        "Brand-owned online channel constructs (catalog, orders, fulfillment).",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "marketplace",
      name: "Online Marketplace",
      description:
        "Third-party commerce channels with their own SLAs and listing rules.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "tender",
      name: "Tender/Institutional Sale",
      description:
        "Structured bidding-based channel constructs with compliance and delivery terms.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "sales_order",
      name: "Sales Order",
      description:
        "Customer/channel purchase intent captured with item, price, and promised date.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "invoice",
      name: "Invoice",
      description:
        "Billing record for shipped goods with taxation and pricing breakdown.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "credit_note",
      name: "Credit Note",
      description:
        "Commercial adjustment record for returns, schemes, and price corrections.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "scheme",
      name: "Trade Scheme",
      description:
        "Rules that define discounts/incentives linked to volume, visibility, or timing.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "demand_forecast",
      name: "Demand Forecast",
      description:
        "Projected demand at product x channel x time granularity with confidence bands.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "sop_plan",
      name: "S&OP Plan",
      description:
        "Agreed demand-supply plan with constraints, priorities, and trade-offs.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "allocation",
      name: "Allocation",
      description:
        "Decision object mapping limited supply to channel nodes by priority rules.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "fg_inventory",
      name: "Finished Goods Inventory",
      description:
        "Sellable inventory held across plants/warehouses/channel nodes.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "rm_inventory",
      name: "Raw Material Inventory",
      description: "Inputs stocked to support production plans and lead times.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "spares_inventory",
      name: "Spare Parts Inventory",
      description: "Parts held to meet service SLAs and warranty obligations.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "warehouse",
      name: "Warehouse/Distribution Center",
      description:
        "Storage and dispatch node governed by process and service levels.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "transporter",
      name: "Transporter",
      description:
        "Logistics partner with lane, cost, and delivery performance attributes.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "owned_plant",
      name: "Owned Manufacturing Facility",
      description:
        "In-house production node with lines, capacity, and quality controls.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "contract_mfg",
      name: "Contract Manufacturer",
      description:
        "Outsourced production node governed by audits, SOPs, and quality SLAs.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "supplier",
      name: "Supplier",
      description:
        "Supplier entity for components/materials governed by qualification and KPIs.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "bom",
      name: "Bill of Materials",
      description:
        "Structured list of components and quantities defining how products are built.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "vendor_scorecard",
      name: "Vendor Scorecard",
      description:
        "Scorecard tracking cost/quality/delivery KPIs used to govern vendor performance.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "inspection",
      name: "Inspection & Testing",
      description:
        "Incoming/in-process/final checks ensuring conformance to specifications.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "service_center",
      name: "Service Center",
      description:
        "Service execution node handling repairs, replacements, and customer support.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "ticket",
      name: "Service Ticket",
      description:
        "Customer issue record with product, symptom, diagnosis, and resolution path.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "repair_order",
      name: "Repair Order",
      description:
        "Work order for service execution including parts and labor consumption.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "claim",
      name: "Warranty Claim",
      description:
        "Claim object representing eligibility, approval, and settlement for warranty.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "spare_part",
      name: "Spare Part",
      description:
        "Part definition with compatibility rules and stocking policy.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "revenue",
      name: "Revenue",
      description:
        "Revenue constructs including net sales recognition and channel effects.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "distribution_cost",
      name: "Distribution Cost",
      description: "Freight, warehousing, and channel servicing cost drivers.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "receivables",
      name: "Receivables",
      description:
        "Amounts owed by channel customers with credit terms and ageing.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "payables",
      name: "Payables",
      description:
        "Amounts owed to suppliers/vendors governed by payment terms.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "internal_audit",
      name: "Internal Audit",
      description:
        "Audit construct: scope, findings, actions, and closure governance.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "bis",
      name: "Safety/Quality Certification",
      description:
        "Certification construct covering product safety and conformance standards.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "bee",
      name: "Energy Efficiency Labeling",
      description:
        "Energy labeling construct that impacts design, testing, and go-to-market.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "packaging_waste",
      name: "Packaging & Waste",
      description:
        "Packaging material choices, waste reduction, and circularity actions.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "risk_register",
      name: "Risk Register",
      description:
        "Structured capture of risks, owners, controls, and mitigation status.",
      level: 3,
      size: 10,
      color: "#64748B",
      type: "bkg",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    {
      id: "h1",
      source: "product",
      target: "product_portfolio",
      type: "HAS",
      description: "Product domain contains portfolio grouping.",
      linkType: "bkg",
    },
    {
      id: "h2",
      source: "product",
      target: "product_structure",
      type: "HAS",
      description: "Product domain contains structural representation.",
      linkType: "bkg",
    },
    {
      id: "h3",
      source: "product",
      target: "product_quality",
      type: "HAS",
      description: "Product domain contains quality constructs.",
      linkType: "bkg",
    },
    {
      id: "h4",
      source: "product",
      target: "product_compliance",
      type: "HAS",
      description: "Product domain contains compliance attributes.",
      linkType: "bkg",
    },

    {
      id: "h5",
      source: "channel",
      target: "channel_partners",
      type: "HAS",
      description: "Channel domain includes partner layer.",
      linkType: "bkg",
    },
    {
      id: "h6",
      source: "channel",
      target: "retail_formats",
      type: "HAS",
      description: "Channel domain includes retail format layer.",
      linkType: "bkg",
    },
    {
      id: "h7",
      source: "channel",
      target: "digital_channels",
      type: "HAS",
      description: "Channel domain includes digital layer.",
      linkType: "bkg",
    },
    {
      id: "h8",
      source: "channel",
      target: "institutional_channels",
      type: "HAS",
      description: "Channel domain includes institutional/project layer.",
      linkType: "bkg",
    },

    {
      id: "h9",
      source: "sales",
      target: "commercial_documents",
      type: "HAS",
      description: "Sales domain includes documents for order-to-cash.",
      linkType: "bkg",
    },
    {
      id: "h10",
      source: "sales",
      target: "pricing_trade",
      type: "HAS",
      description: "Sales domain includes pricing and trade constructs.",
      linkType: "bkg",
    },
    {
      id: "h11",
      source: "sales",
      target: "trade_promo",
      type: "HAS",
      description: "Sales domain includes trade promotion constructs.",
      linkType: "bkg",
    },
    {
      id: "h12",
      source: "sales",
      target: "sales_performance",
      type: "HAS",
      description: "Sales domain includes performance measurement constructs.",
      linkType: "bkg",
    },

    {
      id: "h13",
      source: "planning",
      target: "demand_signals",
      type: "HAS",
      description: "Planning includes demand signal layer.",
      linkType: "bkg",
    },
    {
      id: "h14",
      source: "planning",
      target: "forecasting",
      type: "HAS",
      description: "Planning includes forecasting layer.",
      linkType: "bkg",
    },
    {
      id: "h15",
      source: "planning",
      target: "sop",
      type: "HAS",
      description: "Planning includes S&OP layer.",
      linkType: "bkg",
    },
    {
      id: "h16",
      source: "planning",
      target: "replenishment",
      type: "HAS",
      description: "Planning includes replenishment decision layer.",
      linkType: "bkg",
    },

    {
      id: "h17",
      source: "supply_chain",
      target: "inventory",
      type: "HAS",
      description: "Supply chain includes inventory control layer.",
      linkType: "bkg",
    },
    {
      id: "h18",
      source: "supply_chain",
      target: "warehousing",
      type: "HAS",
      description: "Supply chain includes warehousing layer.",
      linkType: "bkg",
    },
    {
      id: "h19",
      source: "supply_chain",
      target: "logistics",
      type: "HAS",
      description: "Supply chain includes logistics layer.",
      linkType: "bkg",
    },
    {
      id: "h20",
      source: "supply_chain",
      target: "distribution_ops",
      type: "HAS",
      description: "Supply chain includes distribution operations layer.",
      linkType: "bkg",
    },

    {
      id: "h21",
      source: "manufacturing",
      target: "manufacturing_network",
      type: "HAS",
      description: "Manufacturing includes network configuration layer.",
      linkType: "bkg",
    },
    {
      id: "h22",
      source: "manufacturing",
      target: "procurement",
      type: "HAS",
      description: "Manufacturing includes procurement and sourcing layer.",
      linkType: "bkg",
    },
    {
      id: "h23",
      source: "manufacturing",
      target: "production_execution",
      type: "HAS",
      description: "Manufacturing includes production execution layer.",
      linkType: "bkg",
    },
    {
      id: "h24",
      source: "manufacturing",
      target: "quality_system",
      type: "HAS",
      description: "Manufacturing includes quality system layer.",
      linkType: "bkg",
    },

    {
      id: "h25",
      source: "service",
      target: "service_network",
      type: "HAS",
      description: "Service includes service network layer.",
      linkType: "bkg",
    },
    {
      id: "h26",
      source: "service",
      target: "service_case",
      type: "HAS",
      description: "Service includes case lifecycle layer.",
      linkType: "bkg",
    },
    {
      id: "h27",
      source: "service",
      target: "warranty",
      type: "HAS",
      description: "Service includes warranty and claims layer.",
      linkType: "bkg",
    },
    {
      id: "h28",
      source: "service",
      target: "spares",
      type: "HAS",
      description: "Service includes spare parts ecosystem layer.",
      linkType: "bkg",
    },

    {
      id: "h29",
      source: "finance_risk",
      target: "financials",
      type: "HAS",
      description: "Finance includes financial performance constructs.",
      linkType: "bkg",
    },
    {
      id: "h30",
      source: "finance_risk",
      target: "working_capital",
      type: "HAS",
      description: "Finance includes working capital constructs.",
      linkType: "bkg",
    },
    {
      id: "h31",
      source: "finance_risk",
      target: "controls_audit",
      type: "HAS",
      description: "Finance includes controls and audit constructs.",
      linkType: "bkg",
    },
    {
      id: "h32",
      source: "finance_risk",
      target: "risk_mgmt",
      type: "HAS",
      description: "Finance includes risk management constructs.",
      linkType: "bkg",
    },

    {
      id: "h33",
      source: "compliance_esg",
      target: "product_regulation",
      type: "HAS",
      description: "Compliance includes product regulation layer.",
      linkType: "bkg",
    },
    {
      id: "h34",
      source: "compliance_esg",
      target: "environment",
      type: "HAS",
      description: "Compliance includes environmental layer.",
      linkType: "bkg",
    },
    {
      id: "h35",
      source: "compliance_esg",
      target: "governance",
      type: "HAS",
      description: "Compliance includes governance layer.",
      linkType: "bkg",
    },
    {
      id: "h36",
      source: "compliance_esg",
      target: "ethics",
      type: "HAS",
      description:
        "Compliance includes ethics and compliance operations layer.",
      linkType: "bkg",
    },

    {
      id: "p1",
      source: "product_portfolio",
      target: "category_fans",
      type: "INCLUDES",
      description: "Portfolio includes fans category.",
      linkType: "bkg",
    },
    {
      id: "p2",
      source: "product_portfolio",
      target: "category_lighting",
      type: "INCLUDES",
      description: "Portfolio includes lighting category.",
      linkType: "bkg",
    },
    {
      id: "p3",
      source: "product_portfolio",
      target: "category_pumps",
      type: "INCLUDES",
      description: "Portfolio includes pumps category.",
      linkType: "bkg",
    },
    {
      id: "p4",
      source: "product_portfolio",
      target: "category_appliances",
      type: "INCLUDES",
      description: "Portfolio includes appliances category.",
      linkType: "bkg",
    },

    {
      id: "ps1",
      source: "product_structure",
      target: "product_hierarchy",
      type: "DEFINED_BY",
      description: "Product structure is defined by hierarchy.",
      linkType: "bkg",
    },
    {
      id: "ps2",
      source: "product_structure",
      target: "product_specs",
      type: "DEFINED_BY",
      description: "Product structure is defined by specifications.",
      linkType: "bkg",
    },
    {
      id: "pq1",
      source: "product_quality",
      target: "inspection",
      type: "ASSURED_BY",
      description: "Quality is assured through inspection and testing.",
      linkType: "bkg",
    },
    {
      id: "pq2",
      source: "product_quality",
      target: "field_feedback",
      type: "IMPROVED_BY",
      description: "Quality is improved using field feedback loops.",
      linkType: "bkg",
    },
    {
      id: "pc1",
      source: "product_compliance",
      target: "bis",
      type: "HAS_ATTRIBUTE",
      description: "Products carry safety/quality certification obligations.",
      linkType: "bkg",
    },
    {
      id: "pc2",
      source: "product_compliance",
      target: "bee",
      type: "HAS_ATTRIBUTE",
      description: "Products carry energy efficiency labeling obligations.",
      linkType: "bkg",
    },

    {
      id: "c1",
      source: "channel_partners",
      target: "distributor",
      type: "INCLUDES",
      description: "Channel partners include distributors.",
      linkType: "bkg",
    },
    {
      id: "c2",
      source: "channel_partners",
      target: "cfa",
      type: "INCLUDES",
      description: "Channel partners include CFAs for distribution operations.",
      linkType: "bkg",
    },
    {
      id: "r1",
      source: "retail_formats",
      target: "general_trade",
      type: "INCLUDES",
      description: "Retail formats include general trade.",
      linkType: "bkg",
    },
    {
      id: "r2",
      source: "retail_formats",
      target: "modern_trade",
      type: "INCLUDES",
      description: "Retail formats include modern trade.",
      linkType: "bkg",
    },
    {
      id: "d1",
      source: "digital_channels",
      target: "brand_d2c",
      type: "INCLUDES",
      description: "Digital channels include brand direct online constructs.",
      linkType: "bkg",
    },
    {
      id: "d2",
      source: "digital_channels",
      target: "marketplace",
      type: "INCLUDES",
      description: "Digital channels include marketplace constructs.",
      linkType: "bkg",
    },
    {
      id: "i1",
      source: "institutional_channels",
      target: "tender",
      type: "INCLUDES",
      description: "Institutional/project channels include tender constructs.",
      linkType: "bkg",
    },

    {
      id: "s1",
      source: "commercial_documents",
      target: "sales_order",
      type: "INCLUDES",
      description: "Commercial documents include sales orders.",
      linkType: "bkg",
    },
    {
      id: "s2",
      source: "commercial_documents",
      target: "invoice",
      type: "INCLUDES",
      description: "Commercial documents include invoices.",
      linkType: "bkg",
    },
    {
      id: "s3",
      source: "commercial_documents",
      target: "credit_note",
      type: "INCLUDES",
      description: "Commercial documents include credit notes.",
      linkType: "bkg",
    },
    {
      id: "s4",
      source: "trade_promo",
      target: "scheme",
      type: "INCLUDES",
      description: "Trade promotion includes schemes.",
      linkType: "bkg",
    },

    {
      id: "pl1",
      source: "forecasting",
      target: "demand_forecast",
      type: "PRODUCES",
      description: "Forecasting produces demand forecasts.",
      linkType: "bkg",
    },
    {
      id: "pl2",
      source: "sop",
      target: "sop_plan",
      type: "PRODUCES",
      description: "S&OP produces an agreed plan.",
      linkType: "bkg",
    },
    {
      id: "pl3",
      source: "replenishment",
      target: "allocation",
      type: "PRODUCES",
      description: "Replenishment planning produces allocation decisions.",
      linkType: "bkg",
    },

    {
      id: "sc1",
      source: "inventory",
      target: "fg_inventory",
      type: "INCLUDES",
      description: "Inventory includes finished goods.",
      linkType: "bkg",
    },
    {
      id: "sc2",
      source: "inventory",
      target: "rm_inventory",
      type: "INCLUDES",
      description: "Inventory includes raw materials.",
      linkType: "bkg",
    },
    {
      id: "sc3",
      source: "inventory",
      target: "spares_inventory",
      type: "INCLUDES",
      description: "Inventory includes spare parts.",
      linkType: "bkg",
    },
    {
      id: "sc4",
      source: "warehousing",
      target: "warehouse",
      type: "INCLUDES",
      description: "Warehousing includes warehouse/DC nodes.",
      linkType: "bkg",
    },
    {
      id: "sc5",
      source: "logistics",
      target: "transporter",
      type: "USES",
      description: "Logistics uses transporter partners.",
      linkType: "bkg",
    },

    {
      id: "m1",
      source: "manufacturing_network",
      target: "owned_plant",
      type: "INCLUDES",
      description: "Manufacturing network includes owned facilities.",
      linkType: "bkg",
    },
    {
      id: "m2",
      source: "manufacturing_network",
      target: "contract_mfg",
      type: "INCLUDES",
      description: "Manufacturing network includes outsourced manufacturing.",
      linkType: "bkg",
    },
    {
      id: "m3",
      source: "procurement",
      target: "supplier",
      type: "SOURCES_FROM",
      description: "Procurement sources from suppliers.",
      linkType: "bkg",
    },
    {
      id: "m4",
      source: "procurement",
      target: "bom",
      type: "GOVERNED_BY",
      description: "Procurement is governed by BOM requirements.",
      linkType: "bkg",
    },
    {
      id: "m5",
      source: "quality_system",
      target: "vendor_scorecard",
      type: "GOVERNS",
      description: "Quality system governs vendors using scorecards and KPIs.",
      linkType: "bkg",
    },

    {
      id: "sv1",
      source: "service_network",
      target: "service_center",
      type: "INCLUDES",
      description: "Service network includes service centers/partners.",
      linkType: "bkg",
    },
    {
      id: "sv2",
      source: "service_case",
      target: "ticket",
      type: "INCLUDES",
      description: "Service case management includes tickets.",
      linkType: "bkg",
    },
    {
      id: "sv3",
      source: "service_case",
      target: "repair_order",
      type: "INCLUDES",
      description: "Service case management includes repair orders.",
      linkType: "bkg",
    },
    {
      id: "sv4",
      source: "warranty",
      target: "claim",
      type: "INCLUDES",
      description: "Warranty includes claims.",
      linkType: "bkg",
    },
    {
      id: "sv5",
      source: "warranty",
      target: "warranty_terms",
      type: "DEFINED_BY",
      description: "Warranty is defined by terms and eligibility.",
      linkType: "bkg",
    },
    {
      id: "sv6",
      source: "spares",
      target: "spare_part",
      type: "INCLUDES",
      description: "Spare parts domain includes spare part definitions.",
      linkType: "bkg",
    },

    {
      id: "f1",
      source: "financials",
      target: "revenue",
      type: "INCLUDES",
      description: "Financials include revenue constructs.",
      linkType: "bkg",
    },
    {
      id: "f2",
      source: "financials",
      target: "distribution_cost",
      type: "INCLUDES",
      description: "Financials include distribution cost constructs.",
      linkType: "bkg",
    },
    {
      id: "f3",
      source: "working_capital",
      target: "receivables",
      type: "INCLUDES",
      description: "Working capital includes receivables.",
      linkType: "bkg",
    },
    {
      id: "f4",
      source: "working_capital",
      target: "payables",
      type: "INCLUDES",
      description: "Working capital includes payables.",
      linkType: "bkg",
    },
    {
      id: "f5",
      source: "controls_audit",
      target: "internal_audit",
      type: "INCLUDES",
      description: "Controls include internal audit mechanisms.",
      linkType: "bkg",
    },

    {
      id: "e1",
      source: "environment",
      target: "packaging_waste",
      type: "INCLUDES",
      description:
        "Environmental domain includes packaging and waste constructs.",
      linkType: "bkg",
    },
    {
      id: "rsk1",
      source: "risk_mgmt",
      target: "risk_register",
      type: "INCLUDES",
      description: "Risk management includes a risk register.",
      linkType: "bkg",
    },

    {
      id: "x1",
      source: "product_hierarchy",
      target: "sales_order",
      type: "ORDERED_AS",
      description: "Sales orders reference product hierarchy identifiers.",
      linkType: "bkg",
    },
    {
      id: "x2",
      source: "sales_order",
      target: "fg_inventory",
      type: "FULFILLED_BY",
      description: "Sales orders are fulfilled by finished goods inventory.",
      linkType: "bkg",
    },
    {
      id: "x3",
      source: "fg_inventory",
      target: "warehouse",
      type: "STORED_IN",
      description: "Finished goods inventory is stored in warehouses/DCs.",
      linkType: "bkg",
    },
    {
      id: "x4",
      source: "warehouse",
      target: "transporter",
      type: "DISPATCHED_VIA",
      description: "Warehouses dispatch shipments via transporters.",
      linkType: "bkg",
    },
    {
      id: "x5",
      source: "demand_forecast",
      target: "sop_plan",
      type: "FEEDS",
      description: "Demand forecasts feed the S&OP plan.",
      linkType: "bkg",
    },
    {
      id: "x6",
      source: "sop_plan",
      target: "production_execution",
      type: "DRIVES",
      description: "S&OP plan drives production execution priorities.",
      linkType: "bkg",
    },
    {
      id: "x7",
      source: "bom",
      target: "supplier",
      type: "PROCURED_FROM",
      description: "BOM requirements are fulfilled via suppliers.",
      linkType: "bkg",
    },
    {
      id: "x8",
      source: "rm_inventory",
      target: "production_execution",
      type: "CONSUMED_BY",
      description: "Raw materials are consumed by production execution.",
      linkType: "bkg",
    },
    {
      id: "x9",
      source: "inspection",
      target: "product_specs",
      type: "VALIDATES",
      description:
        "Inspection validates conformance to product specifications.",
      linkType: "bkg",
    },
    {
      id: "x10",
      source: "ticket",
      target: "field_feedback",
      type: "GENERATES",
      description: "Service tickets generate field-failure feedback.",
      linkType: "bkg",
    },
    {
      id: "x11",
      source: "claim",
      target: "distribution_cost",
      type: "IMPACTS",
      description:
        "Warranty claims impact cost constructs through settlement and service effort.",
      linkType: "bkg",
    },
    {
      id: "x12",
      source: "receivables",
      target: "distributor",
      type: "OWED_BY",
      description: "Receivables are owed by channel partners.",
      linkType: "bkg",
    },
    {
      id: "x13",
      source: "payables",
      target: "supplier",
      type: "OWED_TO",
      description: "Payables are owed to suppliers/vendors.",
      linkType: "bkg",
    },
    {
      id: "x14",
      source: "bee",
      target: "category_fans",
      type: "GOVERNS",
      description:
        "Energy efficiency labeling governs relevant product categories.",
      linkType: "bkg",
    },
    {
      id: "x15",
      source: "bis",
      target: "product_hierarchy",
      type: "CONSTRAINS",
      description:
        "Certification requirements constrain product definitions and releases.",
      linkType: "bkg",
    },
    {
      id: "x16",
      source: "vendor_scorecard",
      target: "contract_mfg",
      type: "EVALUATES",
      description:
        "Vendor scorecards evaluate outsourced manufacturing partners.",
      linkType: "bkg",
    },
    {
      id: "x17",
      source: "allocation",
      target: "retail_formats",
      type: "ALLOCATES_TO",
      description:
        "Allocation decisions distribute inventory across retail format nodes.",
      linkType: "bkg",
    },
    {
      id: "x18",
      source: "scheme",
      target: "sales_performance",
      type: "INFLUENCES",
      description: "Trade schemes influence sales performance outcomes.",
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

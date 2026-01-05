"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const GCPLEnterpriseGraph = () => {
  const svgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [showLabels, setShowLabels] = useState(true);

  // Define business domains with colors
  const domains = {
    structure: { name: "Enterprise & Structure", color: "#3b82f6" },
    product: { name: "Product & Formulation", color: "#8b5cf6" },
    procurement: { name: "Suppliers & Procurement", color: "#06b6d4" },
    manufacturing: { name: "Manufacturing & Quality", color: "#10b981" },
    inventory: { name: "Inventory & Warehousing", color: "#84cc16" },
    planning: { name: "Planning", color: "#f59e0b" },
    logistics: { name: "Logistics & Distribution", color: "#ef4444" },
    sales: { name: "Sales & RTM", color: "#ec4899" },
    pricing: { name: "Pricing & Trade", color: "#6366f1" },
    marketing: { name: "Marketing & Consumer", color: "#14b8a6" },
    compliance: { name: "Compliance & EHS", color: "#f97316" },
    finance: { name: "Finance", color: "#1f2937" },
    people: { name: "People & Execution", color: "#9333ea" },
  };

  const nodes = [
    // 1) Enterprise & Structure
    {
      id: "organization",
      name: "Organization",
      domain: "structure",
      type: "master",
      description:
        "Org_ID, Cluster (India/GAUM/LATAM), Country, BU, Legal_Entity",
    },
    {
      id: "geography",
      name: "Geography",
      domain: "structure",
      type: "master",
      description: "Geo_ID, Country_ISO, State/Province, City, Zone/Territory",
    },
    {
      id: "plant",
      name: "Plant/Factory",
      domain: "structure",
      type: "master",
      description: "Plant_ID, Name, Geo_ID, Lines, GMP_Flag",
    },
    {
      id: "warehouse",
      name: "Warehouse/DC",
      domain: "structure",
      type: "master",
      description: "WH_ID, Type (FG/RM/3PL), Geo_ID, Capacity",
    },
    {
      id: "carrier",
      name: "3PL/Carrier",
      domain: "structure",
      type: "master",
      description: "Carrier_ID, Mode (Road/Sea/Air), SLA",
    },

    // 2) Product & Formulation
    {
      id: "brand",
      name: "Brand/Category",
      domain: "product",
      type: "master",
      description: "Brand_ID, Brand, Category, Subcategory",
    },
    {
      id: "sku",
      name: "SKU (Finished Good)",
      domain: "product",
      type: "master",
      description: "SKU_ID, SKU_Name, Brand_ID, Form, Pack_Size, UOM, GTIN",
    },
    {
      id: "material",
      name: "Material (RM/PM)",
      domain: "product",
      type: "master",
      description: "Material_ID, Type (RM/PM), Spec_Code, Supplier_Pref",
    },
    {
      id: "bom",
      name: "BOM",
      domain: "product",
      type: "master",
      description: "BOM_ID, SKU_ID, Material_ID, Qty_Per_FG, Scrap_%",
    },
    {
      id: "regulatory",
      name: "Regulatory/Specs",
      domain: "product",
      type: "master",
      description: "Reg_ID, MSDS/COA_Req, Hazard_Class, Reg_Market",
    },

    // 3) Suppliers & Procurement
    {
      id: "supplier",
      name: "Supplier/Vendor",
      domain: "procurement",
      type: "master",
      description: "Supplier_ID, Name, Country, Approved_Status, ESG_Score",
    },
    {
      id: "contract",
      name: "Contract/Rate Card",
      domain: "procurement",
      type: "master",
      description:
        "Contract_ID, Price, Currency, Valid_From/To, MOQ, Lead_Time",
    },
    {
      id: "po",
      name: "Purchase Order",
      domain: "procurement",
      type: "fact",
      description: "PO_ID×Line, Ordered_Qty, Unit_Price, Value",
    },
    {
      id: "grn",
      name: "Goods Receipt",
      domain: "procurement",
      type: "fact",
      description: "GRN_ID×Line, Received_Qty, Lot/Batch, Variance",
    },
    {
      id: "ap_invoice",
      name: "AP Invoice",
      domain: "procurement",
      type: "fact",
      description: "AP_ID×Line, Invoiced_Value, Tax, Payment_Status",
    },

    // 4) Manufacturing & Quality
    {
      id: "work_order",
      name: "Production Order",
      domain: "manufacturing",
      type: "fact",
      description: "WO_ID, Planned_Qty, Produced_Qty, Yield_%, OEE",
    },
    {
      id: "batch",
      name: "Batch/Lot",
      domain: "manufacturing",
      type: "master",
      description: "Batch_ID, WO_ID, Mfg_Date, Exp_Date, QC_Status",
    },
    {
      id: "qc_test",
      name: "Quality Test",
      domain: "manufacturing",
      type: "fact",
      description: "QC_ID, Spec, Result, Disposition",
    },
    {
      id: "ncr",
      name: "Deviation/NCR",
      domain: "manufacturing",
      type: "fact",
      description: "NCR_ID, Severity, Action",
    },

    // 5) Inventory & Warehousing
    {
      id: "inventory",
      name: "Inventory Balance",
      domain: "inventory",
      type: "fact",
      description: "WH_ID × SKU_ID × Batch_ID × Date, On_Hand, QA_Hold, Aging",
    },
    {
      id: "movement",
      name: "Inventory Movement",
      domain: "inventory",
      type: "fact",
      description: "Move_ID, From_WH → To_WH, Qty, Reason_Code",
    },
    {
      id: "cycle_count",
      name: "Cycle Count",
      domain: "inventory",
      type: "fact",
      description: "Count_ID, Variance_Qty/Value",
    },

    // 6) Planning
    {
      id: "forecast",
      name: "Demand Forecast",
      domain: "planning",
      type: "fact",
      description: "SKU × Geo × Period × Version, Forecast_Units/Value",
    },
    {
      id: "supply_plan",
      name: "S&OP Supply Plan",
      domain: "planning",
      type: "fact",
      description: "SKU × Plant × Period, Planned_Prod_Units, Safety_Stock",
    },
    {
      id: "mrp",
      name: "MRP Signals",
      domain: "planning",
      type: "fact",
      description: "MRP_ID, Exception (Shortage/Expedite), Req_Date",
    },

    // 7) Logistics & Distribution
    {
      id: "sales_order",
      name: "Sales Order",
      domain: "logistics",
      type: "fact",
      description: "SO_ID×Line, Ordered_Qty, Promise_Date",
    },
    {
      id: "delivery",
      name: "Delivery/ASN",
      domain: "logistics",
      type: "fact",
      description: "DLV_ID×Line, Picked_Qty, Batch, Pick_Date",
    },
    {
      id: "shipment",
      name: "Shipment",
      domain: "logistics",
      type: "fact",
      description: "SHP_ID, Route, Dispatch/Arrival, Status",
    },
    {
      id: "otif",
      name: "OTIF Metrics",
      domain: "logistics",
      type: "derived",
      description: "OTIF_Flag, Delay_Reason, Fill_Rate_%",
    },

    // 8) Sales & RTM
    {
      id: "channel",
      name: "Channel/RTM",
      domain: "sales",
      type: "master",
      description:
        "Channel_ID, Channel (GT/MT/E-com), RTM (Direct/Distributor)",
    },
    {
      id: "customer",
      name: "Customer (Sell-in)",
      domain: "sales",
      type: "master",
      description:
        "Customer_ID, External_Code, Parent_Customer, Trade_Terms_Tier",
    },
    {
      id: "outlet",
      name: "Outlet (Sell-out)",
      domain: "sales",
      type: "master",
      description: "Outlet_ID, Banner/Chain, Outlet_Type, Activation_Status",
    },
    {
      id: "invoice",
      name: "Invoice (AR)",
      domain: "sales",
      type: "fact",
      description: "INV_ID×Line, Gross_Sales, Discounts, NR, Qty, Tax",
    },
    {
      id: "sellout",
      name: "Sell-out (DMS)",
      domain: "sales",
      type: "fact",
      description: "Outlet × SKU × Day/Week, Units, Net_Sales, On_Hand",
    },
    {
      id: "returns",
      name: "Returns/Credit",
      domain: "sales",
      type: "fact",
      description: "Negative measures, Reason_Code",
    },

    // 9) Pricing & Trade
    {
      id: "pricelist",
      name: "Price List",
      domain: "pricing",
      type: "master",
      description: "Price_List_ID, List_Price, Standard_Discount_Schema",
    },
    {
      id: "promotion",
      name: "Promotion",
      domain: "pricing",
      type: "master",
      description: "Promo_ID, Mechanic (TPR/BOGO), Start/End, Depth_%",
    },
    {
      id: "tradespend",
      name: "Trade Spend",
      domain: "pricing",
      type: "fact",
      description: "Customer × Channel × Period, Accrual, Actual_Spend",
    },
    {
      id: "claim",
      name: "Trade Claim",
      domain: "pricing",
      type: "fact",
      description: "Claim_ID, Amount, Approved, Settled_Date",
    },

    // 10) Marketing & Consumer
    {
      id: "campaign",
      name: "Marketing Campaign",
      domain: "marketing",
      type: "master",
      description: "Campaign_ID, Brand, Media_Mix, Spend, Objective",
    },
    {
      id: "ticket",
      name: "Consumer Ticket",
      domain: "marketing",
      type: "fact",
      description: "Ticket_ID, Topic (Quality/Performance), Sentiment",
    },
    {
      id: "review",
      name: "Rating/Review",
      domain: "marketing",
      type: "fact",
      description: "Review_ID, Platform, Stars, Text_Embedding",
    },
    {
      id: "market_share",
      name: "Market Data",
      domain: "marketing",
      type: "fact",
      description: "Brand/Category × Market, Share_%, Avg_Price",
    },
    {
      id: "brand_health",
      name: "Brand Health",
      domain: "marketing",
      type: "derived",
      description: "Awareness, Penetration, Repeat, NPS",
    },

    // 11) Compliance & EHS
    {
      id: "ehs_incident",
      name: "EHS Incident",
      domain: "compliance",
      type: "fact",
      description: "EHS_ID, Site, Type, Severity, Corrective_Action",
    },
    {
      id: "recall",
      name: "Recall/Withdrawal",
      domain: "compliance",
      type: "fact",
      description: "Recall_ID, Batch_Range, Reason, Reg_Agency",
    },
    {
      id: "sustainability",
      name: "Sustainability",
      domain: "compliance",
      type: "derived",
      description: "Pkg_Material recyclability, Scope-1/2/3",
    },

    // 12) Finance
    {
      id: "time",
      name: "Time",
      domain: "finance",
      type: "master",
      description: "Date, Year, Quarter, Month, ISO_Week",
    },
    {
      id: "version",
      name: "Version",
      domain: "finance",
      type: "master",
      description: "Version_Type (Actual/Plan/LE/FC)",
    },
    {
      id: "currency",
      name: "Currency & FX",
      domain: "finance",
      type: "master",
      description: "Currency_Code, FX_Rate, Rate_Type",
    },
    {
      id: "inflation_index",
      name: "Inflation Index",
      domain: "finance",
      type: "master",
      description: "Country, Month, Index_Type, Index_Value",
    },
    {
      id: "pl_snapshot",
      name: "P&L Snapshot",
      domain: "finance",
      type: "fact",
      description: "Gross_Sales, NR, COGS, CM1, CM2, EBITDA",
    },
    {
      id: "constant_currency",
      name: "Constant Currency",
      domain: "finance",
      type: "derived",
      description: "NR_CC, CM1_CC, YoY_CC",
    },
    {
      id: "inflation_restatement",
      name: "Inflation Restatement",
      domain: "finance",
      type: "derived",
      description: "Inflation_Adjusted_NR, Real_Growth",
    },
    {
      id: "bridges",
      name: "Variance Bridges",
      domain: "finance",
      type: "derived",
      description: "Price, Volume, Mix, FX, Inflation attribution",
    },

    // 13) People & Execution
    {
      id: "employee",
      name: "Employee/Role",
      domain: "people",
      type: "master",
      description: "Emp_ID, Function (Sales/SCM/QC), Territory/Site",
    },
    {
      id: "field_visit",
      name: "Field Execution",
      domain: "people",
      type: "fact",
      description: "Visit_ID, Rep_ID, Activity (Audit/Order), Findings",
    },
  ];

  const links = [
    // Product & Formulation relationships
    { source: "sku", target: "brand", relation: "belongs_to" },
    { source: "bom", target: "sku", relation: "defines" },
    { source: "bom", target: "material", relation: "uses" },
    { source: "regulatory", target: "sku", relation: "complies_with" },
    { source: "regulatory", target: "material", relation: "complies_with" },

    // Procurement flow
    { source: "contract", target: "supplier", relation: "with" },
    { source: "contract", target: "material", relation: "for" },
    { source: "po", target: "supplier", relation: "placed_with" },
    { source: "po", target: "material", relation: "for" },
    { source: "po", target: "plant", relation: "to" },
    { source: "grn", target: "po", relation: "fulfills" },
    { source: "ap_invoice", target: "po", relation: "settles" },

    // Manufacturing flow
    { source: "work_order", target: "plant", relation: "at" },
    { source: "work_order", target: "sku", relation: "produces" },
    { source: "batch", target: "work_order", relation: "from" },
    { source: "batch", target: "sku", relation: "of" },
    { source: "qc_test", target: "batch", relation: "tests" },
    { source: "ncr", target: "batch", relation: "affects" },

    // Inventory management
    { source: "inventory", target: "warehouse", relation: "at" },
    { source: "inventory", target: "sku", relation: "of" },
    { source: "inventory", target: "batch", relation: "from" },
    { source: "movement", target: "warehouse", relation: "between" },
    { source: "movement", target: "batch", relation: "moves" },

    // Planning flow
    { source: "forecast", target: "sku", relation: "for" },
    { source: "forecast", target: "geography", relation: "in" },
    { source: "supply_plan", target: "forecast", relation: "driven_by" },
    { source: "supply_plan", target: "plant", relation: "at" },
    { source: "work_order", target: "supply_plan", relation: "generated_from" },
    { source: "mrp", target: "material", relation: "signals" },
    { source: "po", target: "mrp", relation: "triggered_by" },

    // Logistics & Distribution
    { source: "sales_order", target: "customer", relation: "from" },
    { source: "sales_order", target: "sku", relation: "for" },
    { source: "delivery", target: "sales_order", relation: "fulfills" },
    { source: "delivery", target: "batch", relation: "picks" },
    { source: "shipment", target: "delivery", relation: "loads" },
    { source: "shipment", target: "carrier", relation: "executed_by" },
    { source: "otif", target: "sales_order", relation: "measures" },

    // Sales & Commercial
    { source: "customer", target: "channel", relation: "via" },
    { source: "customer", target: "geography", relation: "in" },
    { source: "outlet", target: "customer", relation: "served_by" },
    { source: "invoice", target: "customer", relation: "sold_to" },
    { source: "invoice", target: "sku", relation: "for" },
    { source: "invoice", target: "channel", relation: "via" },
    { source: "sellout", target: "outlet", relation: "at" },
    { source: "sellout", target: "sku", relation: "sells" },
    { source: "returns", target: "invoice", relation: "reverses" },

    // Pricing & Promotions
    { source: "pricelist", target: "sku", relation: "prices" },
    { source: "pricelist", target: "channel", relation: "by" },
    { source: "promotion", target: "sku", relation: "targets" },
    { source: "promotion", target: "channel", relation: "in" },
    { source: "tradespend", target: "promotion", relation: "funds" },
    { source: "claim", target: "promotion", relation: "settles" },

    // Marketing & Consumer
    { source: "campaign", target: "brand", relation: "promotes" },
    { source: "ticket", target: "sku", relation: "about" },
    { source: "ticket", target: "batch", relation: "traces_to" },
    { source: "review", target: "sku", relation: "rates" },
    { source: "market_share", target: "brand", relation: "measures" },
    { source: "brand_health", target: "brand", relation: "tracks" },

    // Compliance & EHS
    { source: "ehs_incident", target: "plant", relation: "at" },
    { source: "recall", target: "batch", relation: "covers" },
    { source: "sustainability", target: "sku", relation: "measures" },

    // Finance aggregations
    { source: "pl_snapshot", target: "organization", relation: "by" },
    { source: "pl_snapshot", target: "brand", relation: "by" },
    { source: "pl_snapshot", target: "channel", relation: "by" },
    { source: "pl_snapshot", target: "time", relation: "by" },
    { source: "pl_snapshot", target: "version", relation: "by" },
    { source: "pl_snapshot", target: "invoice", relation: "rolls_up_from" },
    { source: "pl_snapshot", target: "sellout", relation: "rolls_up_from" },
    { source: "pl_snapshot", target: "tradespend", relation: "rolls_up_from" },

    // Derived analytics
    {
      source: "constant_currency",
      target: "pl_snapshot",
      relation: "restated_by_fx",
    },
    { source: "constant_currency", target: "currency", relation: "uses" },
    {
      source: "inflation_restatement",
      target: "pl_snapshot",
      relation: "indexed_by",
    },
    {
      source: "inflation_restatement",
      target: "inflation_index",
      relation: "uses",
    },
    { source: "bridges", target: "pl_snapshot", relation: "explains_variance" },

    // People & Execution
    { source: "employee", target: "geography", relation: "covers" },
    { source: "employee", target: "plant", relation: "works_at" },
    { source: "field_visit", target: "employee", relation: "by" },
    { source: "field_visit", target: "outlet", relation: "at" },
  ];

  const filteredNodes = nodes.filter((node) => {
    const matchesSearch =
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain =
      selectedDomain === "all" || node.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const filteredLinks = links.filter(
    (link) =>
      filteredNodes.find((n) => n.id === link.source) &&
      filteredNodes.find((n) => n.id === link.target)
  );

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1400;
    const height = 900;

    svg.attr("width", width).attr("height", height);

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 3])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });

    svg.call(zoom);

    const container = svg.append("g");

    // Create arrow markers
    svg
      .append("defs")
      .selectAll("marker")
      .data(["end"])
      .enter()
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 30)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#666");

    // Create force simulation with stronger forces for larger graph
    const simulation = d3
      .forceSimulation(filteredNodes)
      .force(
        "link",
        d3
          .forceLink(filteredLinks)
          .id((d) => d.id)
          .distance(120)
          .strength(0.8)
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1));

    // Create links
    const link = container
      .append("g")
      .selectAll("line")
      .data(filteredLinks)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1)
      .attr("marker-end", "url(#arrow)");

    // Create nodes
    const node = container
      .append("g")
      .selectAll("g")
      .data(filteredNodes)
      .enter()
      .append("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Add circles with domain-based colors and type-based sizes
    node
      .append("circle")
      .attr("r", (d) => {
        if (d.type === "fact") return 22;
        if (d.type === "derived") return 18;
        return 15;
      })
      .attr("fill", (d) => domains[d.domain].color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .style("opacity", 0.9)
      .on("mouseover", (event, d) => {
        setSelectedNode(d);

        // Highlight connected nodes
        const connectedNodeIds = new Set();
        filteredLinks.forEach((link) => {
          if (link.source.id === d.id) connectedNodeIds.add(link.target.id);
          if (link.target.id === d.id) connectedNodeIds.add(link.source.id);
        });

        node
          .selectAll("circle")
          .style("opacity", (n) =>
            n.id === d.id ? 1 : connectedNodeIds.has(n.id) ? 0.8 : 0.2
          )
          .attr("stroke-width", (n) =>
            n.id === d.id ? 4 : connectedNodeIds.has(n.id) ? 3 : 2
          );

        link
          .style("opacity", (l) =>
            l.source.id === d.id || l.target.id === d.id ? 0.8 : 0.1
          )
          .attr("stroke-width", (l) =>
            l.source.id === d.id || l.target.id === d.id ? 2 : 1
          );
      })
      .on("mouseout", () => {
        node.selectAll("circle").style("opacity", 0.9).attr("stroke-width", 2);
        link.style("opacity", 0.4).attr("stroke-width", 1);
      });

    // Add labels (conditionally)
    if (showLabels) {
      node
        .append("text")
        .text((d) => d.name.split(" ").slice(0, 2).join(" ")) // Truncate long names
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .style("font-size", "9px")
        .style("font-weight", "500")
        .style("fill", "#333")
        .style("pointer-events", "none");
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [filteredNodes, filteredLinks, showLabels]);

  const resetZoom = () => {
    const svg = d3.select(svgRef.current);
    svg.transition().duration(750).call(d3.zoom().transform, d3.zoomIdentity);
  };

  const domainOptions = [
    { value: "all", label: "All Domains" },
    ...Object.entries(domains).map(([key, domain]) => ({
      value: key,
      label: domain.name,
    })),
  ];

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col overflow-auto">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          GCPL Enterprise Knowledge Graph
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          End-to-end business operations: NPD → Source → Make → Move → Sell →
          Serve
        </p>

        {/* Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {domainOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded"
            />
            Show Labels
          </label>

          <button
            onClick={resetZoom}
            className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Reset View
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Graph Visualization */}
        <div className="flex-1 relative">
          <svg ref={svgRef} className="w-full h-full"></svg>

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 border max-h-96 overflow-y-auto">
            <h3 className="font-semibold text-sm mb-3">Business Domains</h3>
            <div className="space-y-1 mb-4">
              {Object.entries(domains).map(([key, domain]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: domain.color }}
                  ></div>
                  <span className="text-xs">{domain.name}</span>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-sm mb-2">Node Types</h3>
            <div className="space-y-1 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-gray-400"></div>
                <span className="text-xs">Master (15px)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
                <span className="text-xs">Derived (18px)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-gray-400"></div>
                <span className="text-xs">Fact (22px)</span>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Drag • Hover • Zoom • Filter
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedNode ? "Node Details" : "Enterprise Knowledge Graph"}
            </h2>

            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {selectedNode.name}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    <span
                      className="inline-block px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${
                          domains[selectedNode.domain].color
                        }20`,
                        color: domains[selectedNode.domain].color,
                      }}
                    >
                      {domains[selectedNode.domain].name}
                    </span>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        selectedNode.type === "master"
                          ? "bg-gray-100 text-gray-800"
                          : selectedNode.type === "fact"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {selectedNode.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Key Attributes
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Show connections */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Connections
                  </h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {filteredLinks
                      .filter(
                        (link) =>
                          link.source.id === selectedNode.id ||
                          link.target.id === selectedNode.id
                      )
                      .map((link, idx) => (
                        <div key={idx} className="text-xs text-gray-600">
                          {link.source.id === selectedNode.id ? (
                            <span>
                              →{" "}
                              <strong>
                                {nodes.find((n) => n.id === link.target)?.name}
                              </strong>{" "}
                              ({link.relation})
                            </span>
                          ) : (
                            <span>
                              ←{" "}
                              <strong>
                                {nodes.find((n) => n.id === link.source)?.name}
                              </strong>{" "}
                              ({link.relation})
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">
                    End-to-End Business Flow
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>
                      <strong>NPD:</strong> Brand → SKU → BOM → Materials
                    </div>
                    <div>
                      <strong>Source:</strong> Supplier → Contract → PO → GRN
                    </div>
                    <div>
                      <strong>Make:</strong> Supply Plan → Work Order → Batch →
                      QC
                    </div>
                    <div>
                      <strong>Move:</strong> Inventory → Sales Order → Delivery
                      → Shipment
                    </div>
                    <div>
                      <strong>Sell:</strong> Channel → Customer → Invoice →
                      Sell-out
                    </div>
                    <div>
                      <strong>Serve:</strong> OTIF → Consumer Ticket → Brand
                      Health
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-3">
                    Example Traces
                  </h3>
                  <div className="space-y-3 text-xs text-gray-600">
                    <div className="p-3 bg-blue-50 rounded">
                      <div className="font-medium text-blue-800 mb-1">
                        New SKU Launch
                      </div>
                      <div>
                        Brand → SKU → BOM → Supply Plan → WO → Batch → Inventory
                        → SO → Sell-out → P&L
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 rounded">
                      <div className="font-medium text-red-800 mb-1">
                        Quality Traceability
                      </div>
                      <div>
                        Consumer Ticket → Batch → WO → RM Batches → Supplier +
                        affected Shipments
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <div className="font-medium text-green-800 mb-1">
                        Service Analysis
                      </div>
                      <div>
                        SO → Delivery → OTIF → WH → Plant → Supply Plan variance
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">
                    Graph Statistics
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>Total Nodes: {nodes.length}</div>
                    <div>Total Relationships: {links.length}</div>
                    <div>Visible Nodes: {filteredNodes.length}</div>
                    <div>Business Domains: {Object.keys(domains).length}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GCPLEnterpriseGraph;

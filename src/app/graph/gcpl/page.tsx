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

    /* ---------- HOW THE COMPANY WORKS (BKG) ---------- */

    {
      id: "portfolio_strategy",
      name: "Portfolio & Category Strategy",
      description:
        "Decisions on categories, brands, pack-price architecture and growth priorities by market.",
      size: 22,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "brands",
      name: "Brands",
      description:
        "Brand-level ownership of growth, positioning, media and performance.",
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "skus",
      name: "Products / SKUs",
      description:
        "SKU master with pack sizes, variants, lifecycle, pricing and margins.",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },

    {
      id: "rtm",
      name: "Route-to-Market (RTM)",
      description:
        "Distribution design across GT/MT/eCom with distributors, coverage and service levels.",
      size: 22,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "customers",
      name: "Customers / Distributors",
      description:
        "Distributor and key-account hierarchy used for sales, credit and reporting.",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "outlets",
      name: "Outlet Universe",
      description: "Retail universe and coverage potential (where available).",
      size: 14,
      color: "#F59E0B",
      type: "bkg",
    },

    {
      id: "sales_engine",
      name: "Sales Engine",
      description:
        "Primary (sell-in) and secondary (sell-out/proxy) movement with lag and normalization.",
      size: 22,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "primary_sales",
      name: "Primary Sales",
      description: "Invoices/dispatches to distributors and customers.",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "secondary_sales",
      name: "Secondary Sales",
      description: "Distributor to retail sales or proxy movement signals.",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },

    {
      id: "trade_promotions",
      name: "Trade Promotions & Schemes",
      description: "Schemes, discounts, slabs, accruals and ROI measurement.",
      size: 22,
      color: "#EC4899",
      type: "bkg",
    },

    {
      id: "marketing",
      name: "Marketing & Demand Generation",
      description:
        "Campaigns, media spends and brand investments driving consumer demand.",
      size: 20,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "market_pulse",
      name: "Market Pulse & Competition",
      description:
        "Category growth, market share, distribution and competitive benchmarks.",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },

    {
      id: "supply_chain",
      name: "Supply Chain",
      description: "Demand planning, inventory, manufacturing and fulfillment.",
      size: 22,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "inventory",
      name: "Inventory",
      description:
        "On-hand, in-transit, aging, service levels and stock health.",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },

    {
      id: "finance",
      name: "Finance & Performance",
      description:
        "NSV, gross margin, promo accruals, working capital and planning.",
      size: 22,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "governance",
      name: "Master Data & Governance",
      description:
        "Product/customer/geo masters, KPI definitions and controls.",
      size: 16,
      color: "#84CC16",
      type: "bkg",
    },

    /* ---------- DATA SOURCES ---------- */

    {
      id: "databricks",
      name: "Databricks (GCPL Lakehouse)",
      description:
        "Internal curated tables for sales, schemes, margins, inventory and hierarchies.",
      size: 18,
      color: "#94A3B8",
      type: "source",
      width: 260,
      height: 48,
    },
    {
      id: "nielsen_kantar",
      name: "Nielsen / Kantar",
      description:
        "External market data: category size, market share, price & distribution indices.",
      size: 18,
      color: "#94A3B8",
      type: "source",
      width: 260,
      height: 48,
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    /* ---------- BKG RELATIONSHIPS ---------- */

    {
      id: "bkg_gcpl_portfolio",
      source: "gcpl",
      target: "portfolio_strategy",
      type: "operates_through",
      description:
        "Enterprise strategy is driven by portfolio and category choices.",
      linkType: "bkg",
    },
    {
      id: "bkg_portfolio_brands",
      source: "portfolio_strategy",
      target: "brands",
      type: "drives",
      description: "Portfolio strategy translates into brand-level goals.",
      linkType: "bkg",
    },
    {
      id: "bkg_brands_skus",
      source: "brands",
      target: "skus",
      type: "executed_via",
      description: "Brands are executed through SKU portfolios.",
      linkType: "bkg",
    },

    {
      id: "bkg_gcpl_rtm",
      source: "gcpl",
      target: "rtm",
      type: "go_to_market",
      description: "RTM is the backbone of market execution.",
      linkType: "bkg",
    },
    {
      id: "bkg_rtm_customers",
      source: "rtm",
      target: "customers",
      type: "serves",
      description:
        "RTM is organized around distributor and customer hierarchies.",
      linkType: "bkg",
    },
    {
      id: "bkg_customers_outlets",
      source: "customers",
      target: "outlets",
      type: "supplies",
      description: "Distributors supply and service retail outlets.",
      linkType: "bkg",
    },

    {
      id: "bkg_gcpl_sales",
      source: "gcpl",
      target: "sales_engine",
      type: "commercial_engine",
      description: "Commercial performance is measured through sales movement.",
      linkType: "bkg",
    },
    {
      id: "bkg_sales_primary",
      source: "sales_engine",
      target: "primary_sales",
      type: "includes",
      description: "Sales engine includes primary sell-in.",
      linkType: "bkg",
    },
    {
      id: "bkg_sales_secondary",
      source: "sales_engine",
      target: "secondary_sales",
      type: "includes",
      description: "Sales engine includes secondary sell-out or proxy.",
      linkType: "bkg",
    },

    {
      id: "bkg_gcpl_tradepromo",
      source: "gcpl",
      target: "trade_promotions",
      type: "growth_lever",
      description: "Trade promotions are a core growth lever.",
      linkType: "bkg",
    },
    {
      id: "bkg_tradepromo_sales",
      source: "trade_promotions",
      target: "sales_engine",
      type: "impacts",
      description: "Schemes influence sales volumes and mix.",
      linkType: "bkg",
    },

    {
      id: "bkg_gcpl_marketing",
      source: "gcpl",
      target: "marketing",
      type: "demand_generation",
      description: "Marketing creates consumer demand.",
      linkType: "bkg",
    },
    {
      id: "bkg_marketing_marketpulse",
      source: "marketing",
      target: "market_pulse",
      type: "informed_by",
      description:
        "Marketing decisions are guided by market and competitive signals.",
      linkType: "bkg",
    },

    {
      id: "bkg_gcpl_supplychain",
      source: "gcpl",
      target: "supply_chain",
      type: "fulfills",
      description:
        "Supply chain fulfills demand generated by sales and marketing.",
      linkType: "bkg",
    },
    {
      id: "bkg_supply_inventory",
      source: "supply_chain",
      target: "inventory",
      type: "manages",
      description: "Inventory is managed as part of supply chain execution.",
      linkType: "bkg",
    },

    {
      id: "bkg_gcpl_finance",
      source: "gcpl",
      target: "finance",
      type: "measured_by",
      description: "Finance measures and governs performance.",
      linkType: "bkg",
    },

    {
      id: "bkg_gcpl_governance",
      source: "gcpl",
      target: "governance",
      type: "governed_by",
      description: "Governance ensures consistent masters and KPIs.",
      linkType: "bkg",
    },

    /* ---------- DATA LINKS ---------- */

    {
      id: "data_dbx_primary",
      source: "databricks",
      target: "primary_sales",
      type: "provides_data_for",
      description: "Primary sales tables by SKU × region × channel.",
      linkType: "data",
      nlQuery:
        "Primary sales value and units by SKU and state for last 12 months",
      dataContext:
        "Databricks internal curated sales tables; daily/monthly grain.",
    },
    {
      id: "data_dbx_secondary",
      source: "databricks",
      target: "secondary_sales",
      type: "provides_data_for",
      description: "Secondary sales or sell-out proxy movement.",
      linkType: "data",
      nlQuery: "Secondary sales trend for top SKUs in South zone",
      dataContext: "Databricks sell-out/proxy tables with distributor lag.",
    },
    {
      id: "data_dbx_tradepromo",
      source: "databricks",
      target: "trade_promotions",
      type: "provides_data_for",
      description: "Scheme flags, accruals and promo spends.",
      linkType: "data",
      nlQuery: "Active schemes and accruals by brand and state",
      dataContext: "Databricks trade promotion and finance tables.",
    },
    {
      id: "data_dbx_inventory",
      source: "databricks",
      target: "inventory",
      type: "provides_data_for",
      description: "Inventory positions, aging and stock health.",
      linkType: "data",
      nlQuery: "Inventory aging by SKU and warehouse",
      dataContext: "Databricks inventory and logistics tables.",
    },
    {
      id: "data_nielsen_marketpulse",
      source: "nielsen_kantar",
      target: "market_pulse",
      type: "provides_data_for",
      description: "Market share, category size and competitive benchmarks.",
      linkType: "data",
      nlQuery: "Category market share and growth for home care in India",
      dataContext: "Nielsen/Kantar syndicated market measurement data.",
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

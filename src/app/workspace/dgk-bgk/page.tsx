"use client";
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Link from "next/link";

// Type definitions
interface BaseNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  description: string;
  color: string;
  type: "bkg" | "source";
}

interface BKGNode extends BaseNode {
  type: "bkg";
  size: number;
}

interface SourceNode extends BaseNode {
  type: "source";
  width: number;
  height: number;
}

type Node = BKGNode | SourceNode;

interface BaseLink extends d3.SimulationLinkDatum<Node> {
  id: string;
  source: string | Node;
  target: string | Node;
  type: string;
  description?: string;
}

interface BKGLink extends BaseLink {
  linkType: "bkg";
}

interface DataLink extends BaseLink {
  linkType: "data";
  nlQuery?: string;
  dataContext?: string;
}

type Link = BKGLink | DataLink;

interface DataSourceLinkEditorProps {
  link: DataLink;
  nodes: Node[];
  onUpdate: (updatedLink: DataLink) => void;
  onDelete: (linkId: string) => void;
  onClose: () => void;
}

type EditMode = "data" | null;
type SelectedItem = DataLink | null;

const FashionRetailKG = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "company",
      name: "Company",
      description: "Parent company with legal entities, GSTINs",
      size: 20,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "brand",
      name: "Brand",
      description:
        "Brand with positioning, target segments (AND, Anita Dongre, Global Desi)",
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "collection",
      name: "Collection/Season",
      description:
        "Seasonal collections (SS/AW/Resort/Festive) with theme, launch dates",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "category",
      name: "Category",
      description: "Top-level categories (Womenswear/Menswear/Jewellery)",
      size: 14,
      color: "#6B7280",
      type: "bkg",
    },
    {
      id: "subcategory",
      name: "Subcategory",
      description: "Product subcategories (Kurtas/Tops/Dresses/Sarees/Lehenga)",
      size: 14,
      color: "#6B7280",
      type: "bkg",
    },
    {
      id: "productline",
      name: "ProductLine",
      description: "Business model lines (Ethnic/Western/Fusion/Bridal)",
      size: 14,
      color: "#6B7280",
      type: "bkg",
    },
    {
      id: "lifecyclepolicy",
      name: "LifecyclePolicy",
      description:
        "Lifecycle rules (Core/Seasonal/Outlet) with markdown phases",
      size: 13,
      color: "#6B7280",
      type: "bkg",
    },
    {
      id: "style",
      name: "Style",
      description: "Design with fabric, craft, MRP, lifecycle stage",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "sku",
      name: "SKU",
      description: "Stock unit with color, size, barcode, MRP, cost",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store",
      name: "Store",
      description:
        "Physical store with format (EBO/SIS/Outlet), size, catchment profile",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "channel",
      name: "Channel",
      description: "Sales channel (Own POS/Partner/E-com/Marketplace)",
      size: 15,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "inventorynode",
      name: "InventoryNode",
      description: "Inventory location (Store/DC/Factory/Marketplace FC)",
      size: 14,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "vendor",
      name: "Vendor",
      description: "Supplier with type, lead times, MOQs, quality scores",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "pricelist",
      name: "PriceList",
      description: "Pricing by country, currency, tax policy",
      size: 14,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "promotion",
      name: "Promotion/Campaign",
      description: "Marketing campaigns with budget, KPI targets, mechanics",
      size: 14,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "customersegment",
      name: "CustomerSegment",
      description: "Anonymous segments with AOV, frequency, price sensitivity",
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "event",
      name: "Event",
      description: "External events (holidays/festivals/EOSS) with geo scope",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "kpi",
      name: "KPI",
      description: "Key performance indicators (SellThru%, WOC, GM%, ROAS)",
      size: 12,
      color: "#8B5CF6",
      type: "bkg",
    },
    // Data Sources
    {
      id: "sap_hana",
      name: "SAP HANA",
      description: "SAP HANA Enterprise Database",
      width: 120,
      height: 50,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "sap_ewm",
      name: "SAP EWM",
      description: "SAP Extended Warehouse Management",
      width: 120,
      height: 50,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "sql_warehouse",
      name: "SQL Warehouse",
      description: "SQL Data Warehouse",
      width: 120,
      height: 50,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "plm",
      name: "PLM (Centric)",
      description: "Product Lifecycle Management",
      width: 120,
      height: 50,
      color: "#0F172A",
      type: "source",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    // BKG to BKG relationships
    {
      id: "l1",
      source: "company",
      target: "brand",
      type: "OWNS",
      description: "Company owns brand",
      linkType: "bkg",
    },
    {
      id: "l2",
      source: "brand",
      target: "collection",
      type: "LAUNCHED",
      description: "Brand launches collection",
      linkType: "bkg",
    },
    {
      id: "l3",
      source: "collection",
      target: "style",
      type: "CONTAINS_STYLE",
      description: "Collection contains styles",
      linkType: "bkg",
    },
    {
      id: "l4",
      source: "style",
      target: "sku",
      type: "MATERIALIZES_AS",
      description: "Style materializes as SKUs with size/color variants",
      linkType: "bkg",
    },
    {
      id: "l5",
      source: "style",
      target: "subcategory",
      type: "CLASSIFIED_AS",
      description: "Style classified by subcategory",
      linkType: "bkg",
    },
    {
      id: "l6",
      source: "subcategory",
      target: "category",
      type: "BELONGS_TO",
      description: "Subcategory belongs to category",
      linkType: "bkg",
    },
    {
      id: "l7",
      source: "style",
      target: "lifecyclepolicy",
      type: "GOVERNED_BY",
      description: "Style governed by lifecycle policy",
      linkType: "bkg",
    },
    {
      id: "l8",
      source: "style",
      target: "productline",
      type: "BELONGS_TO",
      description: "Style belongs to product line",
      linkType: "bkg",
    },
    {
      id: "l9",
      source: "sku",
      target: "inventorynode",
      type: "LISTED_AT",
      description: "SKU listed at inventory node (assortment, planogram slot)",
      linkType: "bkg",
    },
    {
      id: "l10",
      source: "inventorynode",
      target: "store",
      type: "LOCATED_AT",
      description: "Inventory node located at store",
      linkType: "bkg",
    },
    {
      id: "l11",
      source: "sku",
      target: "inventorynode",
      type: "IN_STOCK_AT",
      description: "SKU in stock with qty, ROP, safety stock",
      linkType: "bkg",
    },
    {
      id: "l12",
      source: "sku",
      target: "pricelist",
      type: "PRICED_BY",
      description: "SKU priced by price list with MRP, tax",
      linkType: "bkg",
    },
    {
      id: "l13",
      source: "promotion",
      target: "sku",
      type: "TARGETS_SKU",
      description: "Promotion targets SKU with discount mechanics",
      linkType: "bkg",
    },
    {
      id: "l14",
      source: "promotion",
      target: "store",
      type: "TARGETS_STORE",
      description: "Promotion targets specific stores",
      linkType: "bkg",
    },
    {
      id: "l15",
      source: "promotion",
      target: "channel",
      type: "TARGETS_CHANNEL",
      description: "Promotion targets sales channel",
      linkType: "bkg",
    },
    {
      id: "l16",
      source: "promotion",
      target: "customersegment",
      type: "TARGETS_SEGMENT",
      description: "Promotion targets customer segment",
      linkType: "bkg",
    },
    {
      id: "l17",
      source: "event",
      target: "store",
      type: "AFFECTS",
      description: "Event affects store with uplift factor",
      linkType: "bkg",
    },
    {
      id: "l18",
      source: "vendor",
      target: "style",
      type: "SUPPLIES",
      description: "Vendor supplies style with lead time, MOQ, cost",
      linkType: "bkg",
    },
    {
      id: "l19",
      source: "store",
      target: "channel",
      type: "SELLS_VIA",
      description: "Store sells via channel",
      linkType: "bkg",
    },
    {
      id: "l20",
      source: "customersegment",
      target: "brand",
      type: "PREFERS",
      description: "Customer segment prefers brand (affinity score)",
      linkType: "bkg",
    },
    {
      id: "l21",
      source: "customersegment",
      target: "style",
      type: "PREFERS",
      description: "Customer segment prefers style (affinity score)",
      linkType: "bkg",
    },
    {
      id: "l22",
      source: "kpi",
      target: "store",
      type: "MEASURES",
      description: "KPI measures store performance",
      linkType: "bkg",
    },
    {
      id: "l23",
      source: "kpi",
      target: "sku",
      type: "MEASURES",
      description: "KPI measures SKU performance",
      linkType: "bkg",
    },
    // Data source connections
    {
      id: "ds1",
      source: "sap_hana",
      target: "company",
      type: "FEEDS",
      nlQuery:
        "List all brands under House of Anita Dongre and their target price segments",
      dataContext:
        "Source: SAP HANA T001W (Company/Plant Master), SQL brand_master\nFields: company_code, brand_code, brand_name, price_band, positioning",
      linkType: "data",
    },
    {
      id: "ds2",
      source: "sap_hana",
      target: "brand",
      type: "FEEDS",
      nlQuery:
        "List all brands under House of Anita Dongre and their target price segments",
      dataContext:
        "Source: SAP HANA T001W (Company/Plant Master)\nFields: brand_code, brand_name, price_band, positioning",
      linkType: "data",
    },
    {
      id: "ds3",
      source: "sql_warehouse",
      target: "brand",
      type: "FEEDS",
      nlQuery:
        "List all brands under House of Anita Dongre and their target price segments",
      dataContext:
        "Source: SQL brand_master\nFields: company_code, brand_code, brand_name, price_band, positioning",
      linkType: "data",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [showDataConnections, setShowDataConnections] = useState<boolean>(true);

  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);

  useEffect(() => {
    createVisualization();
  }, [nodes, links, showDataConnections]);

  const createVisualization = () => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = 1400;
    const height = 700;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        g.attr("transform", event.transform.toString());
      });

    svg.call(zoom);

    const defs = g.append("defs");

    // BKG arrow
    defs
      .append("marker")
      .attr("id", "arrowhead-bkg")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 18)
      .attr("refY", 0)
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#E5E7EB");

    // Data arrow
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

    const visibleLinks = showDataConnections
      ? links
      : links.filter((l) => l.linkType === "bkg");

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(visibleLinks)
          .id((d) => d.id)
          .distance(180)
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide<Node>().radius((d) => {
          if (d.type === "source") return 70;
          return (d as BKGNode).size + 25;
        })
      );

    simulationRef.current = simulation;

    const link = g
      .selectAll<SVGLineElement, Link>(".link")
      .data(visibleLinks)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", (d) => (d.linkType === "data" ? "#10B981" : "#E5E7EB"))
      .attr("stroke-width", (d) => (d.linkType === "data" ? 2 : 1.5))
      .attr("marker-end", (d) =>
        d.linkType === "data" ? "url(#arrowhead-data)" : "url(#arrowhead-bkg)"
      )
      .attr("opacity", (d) => (d.linkType === "data" ? 0.6 : 0.4))
      .style("cursor", (d) => (d.linkType === "data" ? "pointer" : "default"))
      .on("click", (event: MouseEvent, d: Link) => {
        if (d.linkType === "data") {
          event.stopPropagation();
          setSelectedItem(d as DataLink);
          setEditMode("data");
        }
      });

    const node = g
      .selectAll<SVGGElement, Node>(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(
        d3
          .drag<SVGGElement, Node>()
          .on("start", (event: d3.D3DragEvent<SVGGElement, Node, Node>) => {
            if (!event.active && simulationRef.current)
              simulationRef.current.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          })
          .on("drag", (event: d3.D3DragEvent<SVGGElement, Node, Node>) => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          })
          .on("end", (event: d3.D3DragEvent<SVGGElement, Node, Node>) => {
            if (!event.active && simulationRef.current)
              simulationRef.current.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          })
      );

    node.each(function (d) {
      const nodeGroup = d3.select(this);

      if (d.type === "source") {
        const sourceNode = d as SourceNode;
        nodeGroup
          .append("rect")
          .attr("width", sourceNode.width)
          .attr("height", sourceNode.height)
          .attr("x", -sourceNode.width / 2)
          .attr("y", -sourceNode.height / 2)
          .attr("fill", sourceNode.color)
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .attr("rx", 8);

        nodeGroup
          .append("text")
          .text(sourceNode.name)
          .attr("text-anchor", "middle")
          .attr("dy", 4)
          .attr("font-size", "11px")
          .attr("fill", "#fff")
          .attr("font-weight", "600")
          .style("pointer-events", "none");
      } else {
        const bkgNode = d as BKGNode;
        nodeGroup
          .append("circle")
          .attr("r", bkgNode.size)
          .attr("fill", bkgNode.color)
          .attr("stroke", "#fff")
          .attr("stroke-width", 2);

        nodeGroup
          .append("text")
          .text(bkgNode.name)
          .attr("text-anchor", "middle")
          .attr("dy", bkgNode.size + 15)
          .attr("font-size", "11px")
          .attr("fill", "#374151")
          .attr("font-weight", "500")
          .style("pointer-events", "none");
      }
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x || 0)
        .attr("y1", (d) => (d.source as Node).y || 0)
        .attr("x2", (d) => (d.target as Node).x || 0)
        .attr("y2", (d) => (d.target as Node).y || 0);

      node.attr("transform", (d) => `translate(${d.x || 0},${d.y || 0})`);
    });

    svg.on("click", () => {
      setSelectedItem(null);
      setEditMode(null);
    });
  };

  const handleLinkUpdate = (updatedLink: DataLink) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === updatedLink.id ? updatedLink : l))
    );
    setSelectedItem(updatedLink);
  };

  const handleLinkDelete = (linkId: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== linkId));
    setSelectedItem(null);
    setEditMode(null);
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">6/6</p>
              <h1 className="text-3xl font-serif text-gray-900">
                The company's Digital Brain
              </h1>
              <p className="text-gray-500 mt-1">
                This shows how the business knowledge context can be derived
                from specific data sources. Click on any data relationship to
                edit.
              </p>
            </div>
            <button
              onClick={() => setShowDataConnections(!showDataConnections)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showDataConnections
                  ? "bg-green-100 text-green-800 border-2 border-green-600"
                  : "bg-gray-100 text-gray-600 border-2 border-gray-300"
              }`}
              type="button"
            >
              {showDataConnections ? "Hide" : "Show"} Data Connections
            </button>
          </div>
        </div>

        <div className="flex-1 flex n">
          <div className="flex-1 p-6 overflow-hidden">
            <div className="bg-white rounded-2xl shadow-sm h-full flex items-center justify-center">
              <svg ref={svgRef} className="w-full h-full"></svg>
            </div>
          </div>

          {selectedItem && editMode === "data" && (
            <div className="w-96 h-[76vh] bg-white border-l border-gray-200 overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Edit Data Mapping
                </h2>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setEditMode(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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

              <DataSourceLinkEditor
                link={selectedItem}
                nodes={nodes}
                onUpdate={handleLinkUpdate}
                onDelete={handleLinkDelete}
                onClose={() => {
                  setSelectedItem(null);
                  setEditMode(null);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-8 py-6">
        <Link href={"/workspace/agent-traversal"}>
          <button
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-xl font-medium transition-colors"
            type="button"
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

const DataSourceLinkEditor: React.FC<DataSourceLinkEditorProps> = ({
  link,
  nodes,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const [nlQuery, setNlQuery] = useState<string>(link.nlQuery || "");
  const [dataContext, setDataContext] = useState<string>(
    link.dataContext || ""
  );
  const [sourceId, setSourceId] = useState<string>(
    typeof link.source === "object" ? link.source.id : link.source
  );
  const [targetId, setTargetId] = useState<string>(
    typeof link.target === "object" ? link.target.id : link.target
  );

  const handleSave = () => {
    onUpdate({
      ...link,
      nlQuery,
      dataContext,
      source: sourceId,
      target: targetId,
    });
  };

  const sourceNode = nodes.find((n) => n.id === sourceId);
  const targetNode = nodes.find((n) => n.id === targetId);

  return (
    <div>
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-green-800 font-medium mb-1">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
            />
          </svg>
          Data Source Connection
        </div>
        <div className="text-xs text-green-700">
          {sourceNode?.name} → {targetNode?.name}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">
          Natural Language Query
        </label>
        <textarea
          value={nlQuery}
          onChange={(e) => setNlQuery(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
          placeholder="e.g., What's the current MRP and markdown price for this SKU?"
        />
        <p className="text-xs text-gray-400 mt-1">
          How users would naturally ask for this data
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">
          Data Context
        </label>
        <textarea
          value={dataContext}
          onChange={(e) => setDataContext(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono text-xs"
          placeholder="Source: SAP HANA KONP (Pricing Conditions)&#10;Fields: MATNR, condition_type, valid_from, valid_to, price_amount"
        />
        <p className="text-xs text-gray-400 mt-1">
          Tables, fields, and technical details
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">
          Data Source
        </label>
        <select
          value={sourceId}
          onChange={(e) => setSourceId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
        >
          {nodes
            .filter((n) => n.type === "source")
            .map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">
          Target BKG Node
        </label>
        <select
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
        >
          {nodes
            .filter((n) => n.type === "bkg")
            .map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
        </select>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors mb-3"
        type="button"
      >
        Save data mapping
      </button>

      <button
        onClick={() => {
          if (window.confirm("Delete this data source connection?")) {
            onDelete(link.id);
          }
        }}
        className="w-full text-red-600 py-2 text-sm hover:text-red-700 transition-colors"
        type="button"
      >
        Delete connection
      </button>
    </div>
  );
};

export default FashionRetailKG;

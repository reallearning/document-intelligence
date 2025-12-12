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
    // ---------- PRODUCT PILLAR (Blue) ----------
    {
      id: "product",
      name: "Product",
      description:
        "Product/SKU used in WDD (e.g. specific item within QSR, Grocery etc.)",
      size: 24,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "category",
      name: "Category",
      description:
        "Product category (e.g. QSR, Grocery, Apparel – as used in WDD)",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "perishability_profile",
      name: "PerishabilityProfile",
      description:
        "Perishability/time window for the product (e.g. 1 day, 3 days, 7 days)",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "storage_type",
      name: "StorageType",
      description:
        "Storage type required for the product (e.g. ambient, chilled, frozen)",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },

    // ---------- TIME PILLAR (Grey) ----------
    {
      id: "calendar_date",
      name: "CalendarDate",
      description:
        "Date dimension used across weather, events, sales, inventory",
      size: 18,
      color: "#64748B",
      type: "bkg",
    },

    // ---------- STORE / LOCATION PILLAR (Purple) ----------
    {
      id: "location",
      name: "Location",
      description:
        "Geographical location key (used by weather, events, stores)",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "market",
      name: "Market",
      description: "Market / trade area grouping locations (e.g. city/region)",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store",
      name: "Store",
      description:
        "Store node with name, location and market (as captured in WDD)",
      size: 24,
      color: "#8B5CF6",
      type: "bkg",
    },

    // ---------- WEATHER PILLAR (Teal) ----------
    {
      id: "weather_record",
      name: "WeatherRecord",
      description:
        "Weather row: predicted demand, temperature, humidity, cold spell, heat wave, rainfall, snowfall, date, location",
      size: 24,
      color: "#06B6D4",
      type: "bkg",
    },

    // ---------- EVENTS PILLAR (Orange) ----------
    {
      id: "event",
      name: "Event",
      description:
        "Demand-impacting event: name, type (sport, concert, etc.), location, date",
      size: 24,
      color: "#F97316",
      type: "bkg",
    },

    // ---------- INVENTORY PILLAR (Green) ----------
    {
      id: "inventory_snapshot",
      name: "InventorySnapshot",
      description:
        "Inventory snapshot: product, store, date, batch, quantity, unit price",
      size: 24,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_movement",
      name: "InventoryMovement",
      description:
        "Inventory movement: product, store, date, batch, quantity, unit price (movement type implied by sign / code)",
      size: 18,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "batch",
      name: "Batch",
      description:
        "Batch/lot identifier associated with inventory (linked to product and perishability)",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },

    // ---------- SALES PILLAR (Emerald) ----------
    {
      id: "sales_fact",
      name: "SalesFact",
      description:
        "Sales row: date, transaction product, selling price, promo flag (and implicitly quantity)",
      size: 24,
      color: "#10B981",
      type: "bkg",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    // ---------- PRODUCT ----------
    {
      id: "p1",
      source: "product",
      target: "category",
      type: "BELONGS_TO_CATEGORY",
      description: "Product belongs to a category (e.g. QSR)",
      linkType: "bkg",
    },
    {
      id: "p2",
      source: "product",
      target: "perishability_profile",
      type: "HAS_PERISHABILITY",
      description: "Product has a perishability time window",
      linkType: "bkg",
    },
    {
      id: "p3",
      source: "product",
      target: "storage_type",
      type: "REQUIRES_STORAGE_TYPE",
      description: "Product requires a storage type (ambient/chilled/frozen)",
      linkType: "bkg",
    },

    // ---------- LOCATION / STORE / MARKET ----------
    {
      id: "l1",
      source: "store",
      target: "location",
      type: "LOCATED_AT",
      description: "Store is located at a specific location",
      linkType: "bkg",
    },
    {
      id: "l2",
      source: "store",
      target: "market",
      type: "IN_MARKET",
      description: "Store belongs to a market/trade area",
      linkType: "bkg",
    },
    {
      id: "l3",
      source: "location",
      target: "market",
      type: "IN_MARKET",
      description: "Location mapped to a broader market",
      linkType: "bkg",
    },

    // ---------- WEATHER ----------
    {
      id: "w1",
      source: "weather_record",
      target: "location",
      type: "FOR_LOCATION",
      description: "Weather captured for this location",
      linkType: "bkg",
    },
    {
      id: "w2",
      source: "weather_record",
      target: "calendar_date",
      type: "ON_DATE",
      description: "Weather captured on this date",
      linkType: "bkg",
    },

    // ---------- EVENTS ----------
    {
      id: "e1",
      source: "event",
      target: "location",
      type: "AT_LOCATION",
      description: "Event takes place at a given location",
      linkType: "bkg",
    },
    {
      id: "e2",
      source: "event",
      target: "calendar_date",
      type: "ON_DATE",
      description: "Event occurs on this date",
      linkType: "bkg",
    },

    // ---------- INVENTORY ----------
    {
      id: "i1",
      source: "inventory_snapshot",
      target: "product",
      type: "FOR_PRODUCT",
      description: "Snapshot is for this product",
      linkType: "bkg",
    },
    {
      id: "i2",
      source: "inventory_snapshot",
      target: "store",
      type: "AT_STORE",
      description: "Snapshot is for this store",
      linkType: "bkg",
    },
    {
      id: "i3",
      source: "inventory_snapshot",
      target: "calendar_date",
      type: "ON_DATE",
      description: "Snapshot taken on this date",
      linkType: "bkg",
    },
    {
      id: "i4",
      source: "inventory_snapshot",
      target: "batch",
      type: "FROM_BATCH",
      description: "Snapshot includes this batch/lot",
      linkType: "bkg",
    },

    {
      id: "i5",
      source: "inventory_movement",
      target: "product",
      type: "FOR_PRODUCT",
      description: "Movement entry for a given product",
      linkType: "bkg",
    },
    {
      id: "i6",
      source: "inventory_movement",
      target: "store",
      type: "AT_STORE",
      description: "Movement at a specific store",
      linkType: "bkg",
    },
    {
      id: "i7",
      source: "inventory_movement",
      target: "calendar_date",
      type: "ON_DATE",
      description: "Movement happens on this date",
      linkType: "bkg",
    },
    {
      id: "i8",
      source: "inventory_movement",
      target: "batch",
      type: "FROM_BATCH",
      description: "Movement for a specific batch",
      linkType: "bkg",
    },

    // ---------- SALES ----------
    {
      id: "s1",
      source: "sales_fact",
      target: "product",
      type: "FOR_PRODUCT",
      description: "Sales line is for this transaction product",
      linkType: "bkg",
    },
    {
      id: "s2",
      source: "sales_fact",
      target: "store",
      type: "AT_STORE",
      description: "Sale occurred at this store",
      linkType: "bkg",
    },
    {
      id: "s3",
      source: "sales_fact",
      target: "calendar_date",
      type: "ON_DATE",
      description: "Sale occurred on this date",
      linkType: "bkg",
    },

    // ---------- CONTEXT / JOIN RELATIONSHIPS ----------
    {
      id: "cx1",
      source: "sales_fact",
      target: "weather_record",
      type: "HAS_WEATHER_CONTEXT",
      description:
        "Join via (date, location): sales on a date/location have corresponding weather context",
      linkType: "bkg",
    },
    {
      id: "cx2",
      source: "sales_fact",
      target: "event",
      type: "HAS_EVENT_CONTEXT",
      description:
        "Join via (date, location): sales on a date/location may be influenced by events",
      linkType: "bkg",
    },
    {
      id: "cx3",
      source: "sales_fact",
      target: "inventory_snapshot",
      type: "HAS_INVENTORY_CONTEXT",
      description:
        "Join via (date, product, store): sales seen in the context of available inventory",
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

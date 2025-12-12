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

export default function Consumer() {
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInitialMount = useRef(true);
  const [selectedItem, setSelectedItem] = useState<Node | Link | null>(null);
  const [editMode, setEditMode] = useState<"node" | "link" | "datalink" | null>(
    null
  );
  const [nodes, setNodes] = useState<Node[]>([
    // -------- PRODUCT DOMAIN --------
    {
      id: "product",
      name: "Product",
      description: "SKU-level beverage product entity (from phier)",
      size: 18,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "brand",
      name: "Brand",
      description: "Brand grouping for products",
      size: 14,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "category",
      name: "Category",
      description: "Category of product such as carbonated, juice, hydration",
      size: 12,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "subcategory",
      name: "Subcategory",
      description: "Finer categorisation of product within category",
      size: 10,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "packsize",
      name: "Pack Size",
      description: "Configuration such as 250ml, 500ml, 1L (from phier)",
      size: 10,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "perishability",
      name: "Perishability Class",
      description: "High/Medium/Low based on shelf life",
      size: 8,
      color: "#3B82F6",
      type: "bkg",
    },

    // -------- LOCATION DOMAIN --------
    {
      id: "store",
      name: "Store",
      description: "Store/location entity from locdim",
      size: 18,
      color: "#16A34A",
      type: "bkg",
    },
    {
      id: "region",
      name: "Region",
      description: "Region grouping from locdim",
      size: 12,
      color: "#16A34A",
      type: "bkg",
    },
    {
      id: "zone",
      name: "Zone",
      description: "Zone hierarchy from locdim",
      size: 10,
      color: "#16A34A",
      type: "bkg",
    },
    {
      id: "store_cluster",
      name: "Store Cluster",
      description: "Clusters such as weather-based or performance-based",
      size: 10,
      color: "#16A34A",
      type: "bkg",
    },

    // -------- CALENDAR/TIME DOMAIN --------
    {
      id: "week",
      name: "Week",
      description: "Business week for time-based analysis",
      size: 12,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "month",
      name: "Month",
      description: "Month entity from calendar",
      size: 10,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "season",
      name: "Season",
      description:
        "Season classification from calendar (summer, monsoon, etc.)",
      size: 10,
      color: "#F59E0B",
      type: "bkg",
    },

    // -------- WEATHER DOMAIN --------
    {
      id: "weather_profile",
      name: "Weather Profile",
      description: "Weekly weather for Store×Week (temp, rainfall, humidity)",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "weather_variable",
      name: "Weather Variable",
      description: "Individual weather features like temperature or rainfall",
      size: 8,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "weather_cluster",
      name: "Weather Cluster",
      description: "Cluster of stores experiencing similar weather patterns",
      size: 10,
      color: "#0EA5E9",
      type: "bkg",
    },

    // -------- EVENT DOMAIN --------
    {
      id: "event",
      name: "Event",
      description: "Uplift event affecting demand (Store×SKU×Week)",
      size: 14,
      color: "#D946EF",
      type: "bkg",
    },
    {
      id: "event_type",
      name: "Event Type",
      description: "Type of event: festival, promo, heatwave, rain spike",
      size: 10,
      color: "#D946EF",
      type: "bkg",
    },

    // -------- DEMAND DOMAIN --------
    {
      id: "baseline_demand",
      name: "Baseline Demand",
      description: "Underlying demand before weather, event, and noise",
      size: 14,
      color: "#A855F7",
      type: "bkg",
    },
    {
      id: "noise_factor",
      name: "Noise Factor",
      description: "Noise multiplier applied to simulate randomness",
      size: 10,
      color: "#A855F7",
      type: "bkg",
    },
    {
      id: "demand_record",
      name: "Demand Record",
      description: "Final simulated demand for Store×SKU×Week",
      size: 16,
      color: "#A855F7",
      type: "bkg",
    },

    // -------- INVENTORY DOMAIN --------
    {
      id: "inventory_record",
      name: "Inventory Record",
      description: "Inventory levels and movements for Store×SKU×Week",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "spoilage",
      name: "Spoilage",
      description: "Units expired due to shelf-life constraints",
      size: 10,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "shrink",
      name: "Shrink",
      description: "Loss due to pilferage or unknown causes",
      size: 10,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "replenishment_rule",
      name: "Replenishment Rule",
      description:
        "Reorder parameters such as lead time, min/max, review cycle",
      size: 12,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "safety_stock",
      name: "Safety Stock",
      description: "Required weeks of cover to prevent stockouts",
      size: 10,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "reorder_point",
      name: "Reorder Point",
      description: "Calculated reorder threshold for Store×SKU",
      size: 10,
      color: "#10B981",
      type: "bkg",
    },

    // -------- METRICS DOMAIN --------
    {
      id: "metric_definition",
      name: "Metric Definition",
      description: "Definition of key KPIs like service level, spoilage %",
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },
    {
      id: "metric_value",
      name: "Metric Value",
      description: "Actual metric measurement for Store/Product/Week",
      size: 12,
      color: "#EF4444",
      type: "bkg",
    },

    // -------- DATA SOURCES (your tables) --------
    {
      id: "phier",
      name: "Product Hierarchy (phier)",
      description: "Product dimension source",
      width: 120,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "locdim",
      name: "Location Dimension (locdim)",
      description: "Store/location dimension source",
      width: 120,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "calendar",
      name: "Calendar Table",
      description: "Calendar source table",
      width: 120,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "weather_weekly",
      name: "Weekly Weather",
      description: "Weather input table for Store×Week",
      width: 120,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "events_source",
      name: "Events Table",
      description: "Demand uplift events",
      width: 120,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "base_demand_source",
      name: "Base Demand",
      description: "Underlying baseline demand",
      width: 120,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "noise_source",
      name: "Noise Multipliers",
      description: "Random noise factors",
      width: 120,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "demand_ledger_source",
      name: "Demand Ledger",
      description: "Final computed demand rows",
      width: 120,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "inventory_ledger_source",
      name: "Inventory Ledger",
      description: "Inventory simulation output",
      width: 120,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    // ---------- PRODUCT RELATIONSHIPS ----------
    {
      id: "p1",
      source: "product",
      target: "brand",
      type: "BELONGS_TO_BRAND",
      description: "Product belongs to a brand",
      linkType: "bkg",
    },
    {
      id: "p2",
      source: "product",
      target: "category",
      type: "BELONGS_TO_CATEGORY",
      description: "Product is classified under a category",
      linkType: "bkg",
    },
    {
      id: "p3",
      source: "product",
      target: "subcategory",
      type: "BELONGS_TO_SUBCATEGORY",
      description: "Product belongs to a subcategory",
      linkType: "bkg",
    },
    {
      id: "p4",
      source: "product",
      target: "packsize",
      type: "HAS_PACKSIZE",
      description: "Product has associated pack size",
      linkType: "bkg",
    },
    {
      id: "p5",
      source: "product",
      target: "perishability",
      type: "HAS_PERISHABILITY_CLASS",
      description: "Product has perishability classification",
      linkType: "bkg",
    },

    // ---------- STORE RELATIONSHIPS ----------
    {
      id: "s1",
      source: "store",
      target: "region",
      type: "IN_REGION",
      description: "Store belongs to region",
      linkType: "bkg",
    },
    {
      id: "s2",
      source: "store",
      target: "zone",
      type: "IN_ZONE",
      description: "Store belongs to zone",
      linkType: "bkg",
    },
    {
      id: "s3",
      source: "store",
      target: "store_cluster",
      type: "IN_CLUSTER",
      description: "Store belongs to a cluster",
      linkType: "bkg",
    },

    // ---------- WEATHER RELATIONSHIPS ----------
    {
      id: "w1",
      source: "weather_profile",
      target: "store",
      type: "WEATHER_FOR_STORE",
      description: "Weather profile applies to store",
      linkType: "bkg",
    },
    {
      id: "w2",
      source: "weather_profile",
      target: "week",
      type: "WEATHER_FOR_WEEK",
      description: "Weather profile corresponds to week",
      linkType: "bkg",
    },
    {
      id: "w3",
      source: "weather_profile",
      target: "weather_variable",
      type: "HAS_WEATHER_VARIABLE",
      description:
        "Weather profile contains feature (temp, rainfall, humidity)",
      linkType: "bkg",
    },

    // ---------- EVENTS RELATIONSHIPS ----------
    {
      id: "e1",
      source: "event",
      target: "store",
      type: "EVENT_AT_STORE",
      description: "Event applies to store",
      linkType: "bkg",
    },
    {
      id: "e2",
      source: "event",
      target: "product",
      type: "EVENT_FOR_PRODUCT",
      description: "Event applies to product",
      linkType: "bkg",
    },
    {
      id: "e3",
      source: "event",
      target: "week",
      type: "EVENT_IN_WEEK",
      description: "Event applies during week",
      linkType: "bkg",
    },
    {
      id: "e4",
      source: "event",
      target: "event_type",
      type: "HAS_EVENT_TYPE",
      description: "Event categorized by event type",
      linkType: "bkg",
    },

    // ---------- DEMAND RELATIONSHIPS ----------
    {
      id: "d1",
      source: "baseline_demand",
      target: "product",
      type: "BASELINE_FOR_PRODUCT",
      description: "Baseline demand for product",
      linkType: "bkg",
    },
    {
      id: "d2",
      source: "baseline_demand",
      target: "store",
      type: "BASELINE_AT_STORE",
      description: "Baseline demand at store",
      linkType: "bkg",
    },
    {
      id: "d3",
      source: "baseline_demand",
      target: "week",
      type: "BASELINE_IN_WEEK",
      description: "Baseline demand in week",
      linkType: "bkg",
    },
    {
      id: "d4",
      source: "demand_record",
      target: "baseline_demand",
      type: "DEMAND_HAS_BASELINE",
      description: "Demand record linked to baseline",
      linkType: "bkg",
    },
    {
      id: "d5",
      source: "demand_record",
      target: "noise_factor",
      type: "DEMAND_HAS_NOISE",
      description: "Demand record influenced by noise",
      linkType: "bkg",
    },
    {
      id: "d6",
      source: "demand_record",
      target: "weather_profile",
      type: "DEMAND_HAS_WEATHER",
      description: "Demand influenced by weather",
      linkType: "bkg",
    },
    {
      id: "d7",
      source: "demand_record",
      target: "event",
      type: "DEMAND_HAS_EVENT",
      description: "Demand uplifted by event",
      linkType: "bkg",
    },

    // ---------- INVENTORY RELATIONSHIPS ----------
    {
      id: "i1",
      source: "inventory_record",
      target: "product",
      type: "INVENTORY_FOR_PRODUCT",
      description: "Inventory corresponds to product",
      linkType: "bkg",
    },
    {
      id: "i2",
      source: "inventory_record",
      target: "store",
      type: "INVENTORY_AT_STORE",
      description: "Inventory corresponds to store",
      linkType: "bkg",
    },
    {
      id: "i3",
      source: "inventory_record",
      target: "week",
      type: "INVENTORY_IN_WEEK",
      description: "Inventory corresponds to week",
      linkType: "bkg",
    },
    {
      id: "i4",
      source: "inventory_record",
      target: "spoilage",
      type: "HAS_SPOILAGE",
      description: "Inventory record includes spoilage",
      linkType: "bkg",
    },
    {
      id: "i5",
      source: "inventory_record",
      target: "shrink",
      type: "HAS_SHRINK",
      description: "Inventory record includes shrink",
      linkType: "bkg",
    },

    // ---------- POLICY RELATIONSHIPS ----------
    {
      id: "r1",
      source: "product",
      target: "replenishment_rule",
      type: "HAS_RULE",
      description: "Product has replenishment rule",
      linkType: "bkg",
    },
    {
      id: "r2",
      source: "product",
      target: "safety_stock",
      type: "HAS_SAFETY_STOCK",
      description: "Product has defined safety stock",
      linkType: "bkg",
    },
    {
      id: "r3",
      source: "product",
      target: "reorder_point",
      type: "HAS_REORDER_POINT",
      description: "Product has defined reorder point",
      linkType: "bkg",
    },

    // ---------- METRICS RELATIONSHIPS ----------
    {
      id: "m1",
      source: "metric_value",
      target: "metric_definition",
      type: "INSTANCE_OF",
      description: "Metric value corresponds to metric definition",
      linkType: "bkg",
    },

    // ---------- DATA SOURCE MAPPINGS ----------
    {
      id: "ds1",
      source: "phier",
      target: "product",
      type: "FEEDS",
      description: "Product hierarchy feeds product entity",
      linkType: "data",
      nlQuery:
        "List all products and associated brand, category, and pack size",
      dataContext:
        "Source: phier; Fields: SKU_ID, Brand, Category, Subcategory, Pack_Size",
    },
    {
      id: "ds2",
      source: "locdim",
      target: "store",
      type: "FEEDS",
      description: "Location table feeds store entity",
      linkType: "data",
    },
    {
      id: "ds3",
      source: "calendar",
      target: "week",
      type: "FEEDS",
      description: "Calendar table feeds week entity",
      linkType: "data",
    },
    {
      id: "ds4",
      source: "weather_weekly",
      target: "weather_profile",
      type: "FEEDS",
      description: "Weather table feeds weather profile",
      linkType: "data",
    },
    {
      id: "ds5",
      source: "events_source",
      target: "event",
      type: "FEEDS",
      description: "Events table feeds event entity",
      linkType: "data",
    },
    {
      id: "ds6",
      source: "base_demand_source",
      target: "baseline_demand",
      type: "FEEDS",
      description: "Base demand table feeds baseline entity",
      linkType: "data",
    },
    {
      id: "ds7",
      source: "noise_source",
      target: "noise_factor",
      type: "FEEDS",
      description: "Noise table feeds noise factor entity",
      linkType: "data",
    },
    {
      id: "ds8",
      source: "demand_ledger_source",
      target: "demand_record",
      type: "FEEDS",
      description: "Demand ledger table feeds final demand entity",
      linkType: "data",
    },
    {
      id: "ds9",
      source: "inventory_ledger_source",
      target: "inventory_record",
      type: "FEEDS",
      description: "Inventory ledger feeds inventory entity",
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

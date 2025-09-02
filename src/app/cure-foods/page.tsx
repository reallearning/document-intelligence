"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface Node {
  id: string;
  label: string;
  category: string;
  description: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
  label: string;
  description: string;
}

const BusinessKnowledgeGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    content: { label: string; category: string; description: string };
  }>({
    show: false,
    x: 0,
    y: 0,
    content: { label: "", category: "", description: "" },
  });

  const nodes: Node[] = [
    // Business Structure
    {
      id: "brand",
      label: "Brand/Brand Group",
      category: "structure",
      description:
        "Portfolio entity that owns kitchens and listings; use it to roll up performance",
    },
    {
      id: "kitchen",
      label: "Kitchen/Restaurant/Store",
      category: "structure",
      description:
        "Physical unit that fulfills orders and appears on platforms",
    },
    {
      id: "channel",
      label: "Channel/Platform",
      category: "structure",
      description:
        "Where demand is captured and ads run (Swiggy, Zomato, Magicpin)",
    },

    // Product
    {
      id: "menu",
      label: "Menu Item (SKU)",
      category: "product",
      description:
        "Listing per store×platform with title, category, price, in-stock status",
    },
    {
      id: "component",
      label: "Component/Ingredient",
      category: "product",
      description:
        "BOM truth behind SKU availability; track GRN, consumption, wastage",
    },

    // Transactions
    {
      id: "order",
      label: "Order",
      category: "transaction",
      description:
        "Transaction record with brand/store/city/channel, timestamps, charges",
    },
    {
      id: "orderlines",
      label: "Order Lines",
      category: "transaction",
      description:
        "Individual items within an order with pricing and quantities",
    },
    {
      id: "coupon",
      label: "Coupons/Discount Splits",
      category: "transaction",
      description:
        "Code, discount, platform vs restaurant split, freebies/trade",
    },

    // Marketing
    {
      id: "funnel",
      label: "Funnel",
      category: "marketing",
      description: "Sessions → cart → payment → order by store/day and by slot",
    },
    {
      id: "ads",
      label: "Ads/Campaigns",
      category: "marketing",
      description:
        "Swiggy CPC/PStar/Search/CPV & Zomato ads; ROAS by slot/store",
    },
    {
      id: "cohort",
      label: "Cohorts",
      category: "marketing",
      description: "P1/P2/P3 × NTR/NTP/RTR counts and conversions",
    },

    // Operations
    {
      id: "serviceability",
      label: "Serviceability/Downtime",
      category: "operations",
      description: "Ideal vs actual open hours; HS_VENDOR/HS_SWIGGY status",
    },
    {
      id: "opstimings",
      label: "Ops Timings",
      category: "operations",
      description: "O2MFR, Prep, O2D derived from status timestamps",
    },
    {
      id: "supplynote",
      label: "SupplyNote Events",
      category: "operations",
      description: "GRN, consumption, wastage, variance, revaluations",
    },

    // Experience
    {
      id: "ratings",
      label: "Ratings/Reviews",
      category: "experience",
      description: "Order-level ratings, comments, and customer feedback",
    },
    {
      id: "igcc",
      label: "IGCC Issues",
      category: "experience",
      description: "Issue taxonomy, fraud flags, and customer complaints",
    },
    {
      id: "retention",
      label: "Retention",
      category: "experience",
      description: "Customer repeat behavior and loyalty metrics",
    },

    // Geography
    {
      id: "geography",
      label: "Geography",
      category: "geography",
      description: "Area → City → Region location hierarchy",
    },
    {
      id: "netrevenue",
      label: "Net Revenue",
      category: "transaction",
      description: "True net revenue after discounts and platform fees",
    },
  ];

  const links: Link[] = [
    // Portfolio & listing relationships
    {
      source: "brand",
      target: "kitchen",
      label: "owns",
      description:
        "Brand X on Swiggy vs Zomato — who's up/down today by city/store?",
    },
    {
      source: "kitchen",
      target: "channel",
      label: "listed_on",
      description: "Store presence across different platforms",
    },
    {
      source: "kitchen",
      target: "geography",
      label: "located_in",
      description: "City/area contribution mix; tiered portfolio choices",
    },

    // Demand capture relationships
    {
      source: "channel",
      target: "funnel",
      label: "drives",
      description: "Traffic vs conversion problem; which daypart is leaking?",
    },
    {
      source: "ads",
      target: "funnel",
      label: "influences",
      description: "Where spend lifts orders at acceptable ROAS",
    },
    {
      source: "ads",
      target: "order",
      label: "influences",
      description: "Direct impact of campaigns on order volume",
    },
    {
      source: "cohort",
      target: "funnel",
      label: "affects_conversion",
      description: "NTR vs RTR conversion & AOV deltas by store/channel",
    },

    // Menu reality & components
    {
      source: "kitchen",
      target: "menu",
      label: "offers",
      description: "Can customers actually order the hero SKU today?",
    },
    {
      source: "channel",
      target: "menu",
      label: "displays",
      description: "Platform-specific menu presentation and pricing",
    },
    {
      source: "menu",
      target: "component",
      label: "composed_of",
      description: "Critical/non-critical ingredients behind each SKU",
    },
    {
      source: "supplynote",
      target: "component",
      label: "updates",
      description: "Why a SKU is non-live - under-planning vs adjustment",
    },

    // Transaction & revenue flow
    {
      source: "funnel",
      target: "order",
      label: "converts_to",
      description: "Final conversion from interest to purchase",
    },
    {
      source: "order",
      target: "orderlines",
      label: "contains",
      description: "Individual items and quantities in each order",
    },
    {
      source: "orderlines",
      target: "coupon",
      label: "priced_by",
      description: "Discount application and revenue splits",
    },
    {
      source: "coupon",
      target: "netrevenue",
      label: "contributes_to",
      description: "True net revenue after all discounts and fees",
    },

    // Service & experience loops
    {
      source: "serviceability",
      target: "funnel",
      label: "constrains",
      description: "Orders lost vs baseline during downtime windows",
    },
    {
      source: "serviceability",
      target: "order",
      label: "constrains",
      description: "Direct impact on order fulfillment capability",
    },
    {
      source: "opstimings",
      target: "funnel",
      label: "influences",
      description: "Impact of long prep/slow O2MFR on conversion",
    },
    {
      source: "opstimings",
      target: "ratings",
      label: "influences",
      description: "Service speed impact on customer satisfaction",
    },
    {
      source: "order",
      target: "ratings",
      label: "generates",
      description: "Customer feedback based on order experience",
    },
    {
      source: "igcc",
      target: "ratings",
      label: "affects",
      description: "Issue resolution impact on rating scores",
    },
    {
      source: "ratings",
      target: "retention",
      label: "shapes",
      description: "Issue themes that depress rating and repeat behavior",
    },
    {
      source: "igcc",
      target: "retention",
      label: "shapes",
      description: "Problem resolution affecting customer loyalty",
    },
  ];

  const categoryColors: Record<string, string> = {
    structure: "#ef4444",
    product: "#3b82f6",
    transaction: "#10b981",
    marketing: "#f59e0b",
    operations: "#a855f7",
    experience: "#06b6d4",
    geography: "#6b7280",
  };

  const legendItems = [
    { category: "structure", label: "Business Structure", color: "#ef4444" },
    { category: "product", label: "Product", color: "#3b82f6" },
    { category: "transaction", label: "Transactions", color: "#10b981" },
    { category: "marketing", label: "Marketing", color: "#f59e0b" },
    { category: "operations", label: "Operations", color: "#a855f7" },
    { category: "experience", label: "Experience", color: "#06b6d4" },
    { category: "geography", label: "Geography", color: "#6b7280" },
  ];

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = containerRef.current.clientWidth;
    const height = 700;

    // Clear previous content
    svg.selectAll("*").remove();

    // Set up SVG dimensions
    svg.attr("width", width).attr("height", height);

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
      container.attr("transform", event.transform);
    });

    svg.call(zoom);

    // Define arrow marker
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");

    const container = svg.append("g");

    // Create simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-800))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(35));

    // Create links
    const link = container
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke", "#999")
      .style("stroke-opacity", 0.6)
      .style("stroke-width", "1.5px")
      .style("marker-end", "url(#arrowhead)")
      .on("mouseover", function () {
        d3.select(this)
          .style("stroke", "#333")
          .style("stroke-opacity", 0.9)
          .style("stroke-width", "2px");
      })
      .on("mouseout", function () {
        d3.select(this)
          .style("stroke", "#999")
          .style("stroke-opacity", 0.6)
          .style("stroke-width", "1.5px");
      });

    // Create node groups
    const node = container
      .append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node-group")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, Node>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Add circles to nodes
    node
      .append("circle")
      .attr("class", "node")
      .attr("r", 20)
      .style("fill", (d: Node) => categoryColors[d.category])
      .style("stroke", "#fff")
      .style("stroke-width", "2px")
      .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))")
      .style("transition", "all 0.3s ease")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .style("stroke-width", "3px")
          .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.3))");

        // Show tooltip
        setTooltip({
          show: true,
          x: event.pageX,
          y: event.pageY,
          content: {
            label: d.label,
            category: d.category,
            description: d.description,
          },
        });

        // Highlight connections
        link
          .style("stroke", (l: any) =>
            l.source === d || l.target === d ? "#ef4444" : "#999"
          )
          .style("stroke-width", (l: any) =>
            l.source === d || l.target === d ? "4px" : "1.5px"
          );

        node
          .select("circle")
          .style("stroke", (n: Node) => {
            const isConnected = links.some(
              (l: any) =>
                (l.source === d && l.target === n) ||
                (l.target === d && l.source === n)
            );
            return isConnected ? "#ef4444" : "#fff";
          })
          .style("stroke-width", (n: Node) => {
            const isConnected = links.some(
              (l: any) =>
                (l.source === d && l.target === n) ||
                (l.target === d && l.source === n)
            );
            return isConnected ? "4px" : "2px";
          });
      })
      .on("mouseout", function () {
        d3.select(this)
          .style("stroke-width", "2px")
          .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))");

        // Hide tooltip
        setTooltip((prev) => ({ ...prev, show: false }));

        // Remove highlights
        link.style("stroke", "#999").style("stroke-width", "1.5px");
        node
          .select("circle")
          .style("stroke", "#fff")
          .style("stroke-width", "2px");
      });

    // Add text to nodes
    node
      .append("text")
      .style("font-family", "ui-sans-serif, system-ui, sans-serif")
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("text-anchor", "middle")
      .style("dominant-baseline", "middle")
      .style("fill", "#1f2937")
      .style("pointer-events", "none")
      .style("text-shadow", "1px 1px 2px rgba(255,255,255,0.8)")
      .text((d: Node) => {
        const words = d.label.split(" ");
        return words.length > 2 ? words.slice(0, 2).join(" ") + "..." : d.label;
      });

    // Animation loop
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: Node) => `translate(${d.x}, ${d.y})`);
    });

    // Store references for controls
    (window as any).simulation = simulation;
    (window as any).svg = svg;
    (window as any).container = container;
    (window as any).node = node;
    (window as any).link = link;
    (window as any).width = width;
    (window as any).height = height;
  }, []);

  // Filter by category effect
  useEffect(() => {
    const node = (window as any).node;
    const link = (window as any).link;

    if (!node || !link) return;

    node.style("opacity", (d: Node) =>
      categoryFilter === "all" || d.category === categoryFilter ? 1 : 0.2
    );
    link.style("opacity", (l: any) => {
      if (categoryFilter === "all") return 0.6;
      return l.source.category === categoryFilter ||
        l.target.category === categoryFilter
        ? 0.6
        : 0.1;
    });
  }, [categoryFilter]);

  const resetSimulation = () => {
    const simulation = (window as any).simulation;
    if (simulation) {
      simulation.alpha(1).restart();
    }
  };

  const centerGraph = () => {
    const svg = (window as any).svg;
    const container = (window as any).container;
    const width = (window as any).width;
    const height = (window as any).height;

    if (!svg || !container) return;

    const bounds = container.node().getBBox();
    const fullWidth = bounds.width;
    const fullHeight = bounds.height;
    const scale = 0.8 / Math.max(fullWidth / width, fullHeight / height);
    const translate = [
      width / 2 - scale * (bounds.x + fullWidth / 2),
      height / 2 - scale * (bounds.y + fullHeight / 2),
    ];

    svg
      .transition()
      .duration(750)
      .call(
        d3.zoom().transform,
        d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-700 p-5">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-4xl font-light text-gray-800 mb-2">
            Business Knowledge Graph
          </h1>
          <p className="text-lg text-gray-600">
            Interactive visualization of business entities and their
            relationships
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mb-5 flex-wrap">
          <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-full shadow-lg">
            <label className="text-sm font-medium text-gray-700">
              Filter by Category:
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-800 font-medium cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="structure">Business Structure</option>
              <option value="product">Product</option>
              <option value="transaction">Transactions</option>
              <option value="marketing">Marketing</option>
              <option value="operations">Operations</option>
              <option value="experience">Experience</option>
              <option value="geography">Geography</option>
            </select>
          </div>
          <button
            onClick={resetSimulation}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 hover:-translate-y-0.5 shadow-lg font-medium"
          >
            Reset Layout
          </button>
          <button
            onClick={centerGraph}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all duration-300 hover:-translate-y-0.5 shadow-lg font-medium"
          >
            Center View
          </button>
        </div>

        {/* Graph Container */}
        <div
          ref={containerRef}
          className="w-full h-[700px] border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white overflow-hidden"
        >
          <svg ref={svgRef}></svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center flex-wrap gap-4 mt-4 p-4 bg-white/70 rounded-xl">
          {legendItems.map((item) => (
            <div
              key={item.category}
              className="flex items-center gap-2 text-sm font-medium text-gray-800"
            >
              <div
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {tooltip.show && (
          <div
            className="fixed bg-gray-900/90 text-white p-3 rounded-lg text-xs pointer-events-none opacity-100 transition-opacity duration-300 max-w-xs z-50 shadow-xl"
            style={{
              left: tooltip.x + 10,
              top: tooltip.y - 10,
            }}
          >
            <div className="font-bold">{tooltip.content.label}</div>
            <div className="italic text-gray-300 mb-1">
              Category: {tooltip.content.category}
            </div>
            <div>{tooltip.content.description}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessKnowledgeGraph;

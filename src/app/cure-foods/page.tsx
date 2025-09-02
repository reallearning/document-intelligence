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

interface SimulationLink extends d3.SimulationLinkDatum<Node> {
  source: Node;
  target: Node;
  label: string;
  description: string;
}

const BusinessKnowledgeGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

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
    structure: "#e74c3c",
    product: "#3498db",
    transaction: "#2ecc71",
    marketing: "#f39c12",
    operations: "#9b59b6",
    experience: "#1abc9c",
    geography: "#95a5a6",
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "structure", label: "Business Structure" },
    { value: "product", label: "Product" },
    { value: "transaction", label: "Transactions" },
    { value: "marketing", label: "Marketing" },
    { value: "operations", label: "Operations" },
    { value: "experience", label: "Experience" },
    { value: "geography", label: "Geography" },
  ];

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 700;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Add zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .on("zoom", (event: { transform: any }) => {
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

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, SimulationLink>(links as SimulationLink[])
          .id((d: { id: any }) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-800))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(35));

    const link = container
      .append("g")
      .selectAll("line")
      .data(links as SimulationLink[])
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
          .on(
            "start",
            (
              event: { active: any },
              d: { fx: any; x: any; fy: any; y: any }
            ) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            }
          )
          .on("drag", (event: { x: any; y: any }, d: { fx: any; fy: any }) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event: { active: any }, d: { fx: null; fy: null }) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append("circle")
      .attr("class", "node")
      .attr("r", 20)
      .style(
        "fill",
        (d: { category: string | number }) => categoryColors[d.category]
      )
      .style("stroke", "#fff")
      .style("stroke-width", "2px")
      .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))")
      .on("mouseover", function (event: MouseEvent, d: Node) {
        d3.select(this)
          .style("stroke-width", "3px")
          .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.3))");

        showTooltip(event, d);
        highlightConnections(d);
      })
      .on("mouseout", function (event: any, d: any) {
        d3.select(this)
          .style("stroke-width", "2px")
          .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))");

        hideTooltip();
        removeHighlight();
      });

    node
      .append("text")
      .attr("class", "node-text")
      .style("font-family", "Segoe UI, sans-serif")
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("text-anchor", "middle")
      .style("dominant-baseline", "middle")
      .style("fill", "#2c3e50")
      .style("pointer-events", "none")
      .style("text-shadow", "1px 1px 2px rgba(255,255,255,0.8)")
      .text((d: { label: string }) => {
        const words = d.label.split(" ");
        return words.length > 2 ? words.slice(0, 2).join(" ") + "..." : d.label;
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: { source: Node }) => (d.source as Node).x!)
        .attr("y1", (d: { source: Node }) => (d.source as Node).y!)
        .attr("x2", (d: { target: Node }) => (d.target as Node).x!)
        .attr("y2", (d: { target: Node }) => (d.target as Node).y!);

      node.attr(
        "transform",
        (d: { x: any; y: any }) => `translate(${d.x}, ${d.y})`
      );
    });

    const showTooltip = (event: MouseEvent, d: Node) => {
      if (!tooltipRef.current) return;

      const tooltip = tooltipRef.current;
      tooltip.innerHTML = `
        <strong>${d.label}</strong><br>
        <em>Category: ${d.category}</em><br>
        ${d.description}
      `;
      tooltip.style.opacity = "1";
      tooltip.style.left = event.pageX + 10 + "px";
      tooltip.style.top = event.pageY - 10 + "px";
    };

    const hideTooltip = () => {
      if (tooltipRef.current) {
        tooltipRef.current.style.opacity = "0";
      }
    };

    const highlightConnections = (d: Node) => {
      link
        .style("stroke", (l: SimulationLink) =>
          l.source === d || l.target === d ? "#e74c3c" : "#999"
        )
        .style("stroke-width", (l: SimulationLink) =>
          l.source === d || l.target === d ? "4px" : "1.5px"
        );

      node
        .select("circle")
        .style("stroke", (n: Node) => {
          const isConnected = (links as SimulationLink[]).some(
            (l) =>
              (l.source === d && l.target === n) ||
              (l.target === d && l.source === n)
          );
          return isConnected ? "#e74c3c" : "#fff";
        })
        .style("stroke-width", (n: Node) => {
          const isConnected = (links as SimulationLink[]).some(
            (l) =>
              (l.source === d && l.target === n) ||
              (l.target === d && l.source === n)
          );
          return isConnected ? "4px" : "2px";
        });
    };

    const removeHighlight = () => {
      link.style("stroke", "#999").style("stroke-width", "1.5px");
      node
        .select("circle")
        .style("stroke", "#fff")
        .style("stroke-width", "2px");
    };

    // Store references for filtering and controls
    (window as any).graphElements = {
      node,
      link,
      simulation,
      svg,
      container,
      width,
      height,
    };
  }, []);

  useEffect(() => {
    if (!(window as any).graphElements) return;

    const { node, link } = (window as any).graphElements;

    node.style("opacity", (d: Node) =>
      categoryFilter === "all" || d.category === categoryFilter ? 1 : 0.2
    );
    link.style("opacity", (l: SimulationLink) => {
      if (categoryFilter === "all") return 0.6;
      return l.source.category === categoryFilter ||
        l.target.category === categoryFilter
        ? 0.6
        : 0.1;
    });
  }, [categoryFilter]);

  const resetSimulation = () => {
    const elements = (window as any).graphElements;
    if (elements?.simulation) {
      elements.simulation.alpha(1).restart();
    }
  };

  const centerGraph = () => {
    const elements = (window as any).graphElements;
    if (!elements) return;

    const { svg, container, width, height } = elements;
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
    <div
      style={{
        margin: 0,
        padding: "20px",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2c3e50",
            marginBottom: "10px",
            fontSize: "2.2em",
            fontWeight: 300,
          }}
        >
          Business Knowledge Graph
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#7f8c8d",
            marginBottom: "20px",
            fontSize: "1.1em",
          }}
        >
          Interactive visualization of business entities and their relationships
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.8)",
              padding: "8px 12px",
              borderRadius: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <label>Filter by Category:</label>
            <select
              style={{
                border: "none",
                background: "transparent",
                color: "#2c3e50",
                fontWeight: "500",
                cursor: "pointer",
              }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.8)",
              padding: "8px 12px",
              borderRadius: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <button
              style={{
                border: "none",
                background: "#3498db",
                color: "white",
                padding: "8px 16px",
                borderRadius: "15px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onClick={resetSimulation}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#2980b9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#3498db";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Reset Layout
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.8)",
              padding: "8px 12px",
              borderRadius: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <button
              style={{
                border: "none",
                background: "#3498db",
                color: "white",
                padding: "8px 16px",
                borderRadius: "15px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
              onClick={centerGraph}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#2980b9";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#3498db";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Center View
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: "700px",
            border: "2px solid #ecf0f1",
            borderRadius: "10px",
            background: "linear-gradient(45deg, #f8f9fa 0%, #ffffff 100%)",
            overflow: "hidden",
          }}
        >
          <svg ref={svgRef}></svg>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "15px",
            padding: "15px",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: "10px",
          }}
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <div
              key={category}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                fontWeight: "500",
                color: "#2c3e50",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: color,
                  border: "2px solid #fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>

        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            background: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "12px",
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.3s",
            maxWidth: "300px",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    </div>
  );
};

export default BusinessKnowledgeGraph;

"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const GraphVisualization = () => {
  const svgRef = useRef();

  useEffect(() => {
    // Clear any existing visualization
    d3.select(svgRef.current).selectAll("*").remove();

    // Create the visualization
    createGraph();
  }, []);

  const createGraph = () => {
    // SVG dimensions
    const width = 900;
    const height = 600;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(0, 0)");

    // Define markers for arrows
    svg
      .append("defs")
      .selectAll("marker")
      .data(["standard", "payment", "invoice", "contract"])
      .enter()
      .append("marker")
      .attr("id", (d) => d)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", (d) => {
        if (d === "payment") return "#4CAF50";
        if (d === "invoice") return "#FF5722";
        if (d === "contract") return "#2196F3";
        return "#999";
      });

    // Define nodes with financial data from transcript
    const nodes = [
      // Core entities
      {
        id: "client1",
        name: "Godrej and Boyce",
        type: "client",
        group: 1,
        size: 20,
        details: { industry: "Manufacturing", DSO: 25 },
      },

      {
        id: "kf",
        name: "Knight Frank",
        type: "company",
        group: 2,
        size: 25,
        details: { role: "Facility Management" },
      },

      {
        id: "site1",
        name: "Godrej Site",
        type: "site",
        group: 3,
        size: 18,
        details: {
          totalIncome: "₹2.48 Cr",
          totalExpense: "₹2.08 Cr",
          contribution: "₹0.40 Cr (16.05%)",
        },
      },

      // Vendors
      {
        id: "vendor1",
        name: "Express Housekeepers",
        type: "vendor",
        group: 4,
        size: 16,
        details: {
          service: "Housekeeping",
          expense: "₹1.26 Cr",
          outstanding: "₹56.53 L",
          DPO: 165,
          velocity: 60,
        },
      },

      {
        id: "vendor2",
        name: "FMX PropTech",
        type: "vendor",
        group: 4,
        size: 14,
        details: {
          service: "Tech Support",
          expense: "₹32.10 L",
          outstanding: "₹9.40 L",
          DPO: 106,
          velocity: 45,
        },
      },

      {
        id: "vendor3",
        name: "Manish Pandey",
        type: "vendor",
        group: 4,
        size: 12,
        details: {
          service: "Maintenance",
          expense: "₹10.50 L",
          outstanding: "₹0.87 L",
          DPO: 30,
          velocity: 25,
        },
      },

      {
        id: "vendor4",
        name: "Applied Enterprises",
        type: "vendor",
        group: 4,
        size: 13,
        details: {
          service: "Supplies",
          expense: "₹18.45 L",
          outstanding: "₹0.56 L",
          DPO: 11,
          velocity: 15,
        },
      },

      {
        id: "vendor5",
        name: "Sogo Computers",
        type: "vendor",
        group: 4,
        size: 11,
        details: {
          service: "IT Equipment",
          expense: "₹9.75 L",
          outstanding: "₹2.90 L",
          DPO: 106,
          velocity: 55,
        },
      },

      // Client Invoices
      {
        id: "cinv1",
        name: "Invoice #695",
        type: "clientInvoice",
        group: 5,
        size: 8,
        details: {
          date: "01-Dec-2024",
          amount: "₹4.68 L",
          gst: "₹0.84 L",
          total: "₹5.52 L",
          status: "Outstanding",
        },
      },

      {
        id: "cinv2",
        name: "Invoice #894",
        type: "clientInvoice",
        group: 5,
        size: 8,
        details: {
          date: "15-Jan-2025",
          amount: "₹4.72 L",
          gst: "₹0.85 L",
          total: "₹5.57 L",
          status: "Outstanding",
        },
      },

      // Vendor Invoices
      {
        id: "vinv1",
        name: "Invoice #975",
        type: "vendorInvoice",
        group: 6,
        size: 8,
        details: {
          date: "30-Jul-2024",
          amount: "₹0.21 L",
          gst: "₹0.04 L",
          tds: "₹0.004 L",
          total: "₹0.24 L",
          status: "Paid on 09-Oct-2024",
        },
      },

      // Payments
      {
        id: "cpay1",
        name: "Payment",
        type: "clientPayment",
        group: 7,
        size: 7,
        details: { date: "15-Mar-2025", amount: "₹15.00 L" },
      },

      {
        id: "vpay1",
        name: "Payment",
        type: "vendorPayment",
        group: 8,
        size: 7,
        details: { date: "09-Oct-2024", amount: "₹0.24 L" },
      },
    ];

    // Define links between nodes (relationships)
    const links = [
      // Client-Site relationship
      { source: "client1", target: "site1", type: "OWNS", label: "OWNS" },

      // Knight Frank-Site relationship
      { source: "kf", target: "site1", type: "MANAGES", label: "MANAGES" },

      // Knight Frank-Client Invoice relationships
      { source: "kf", target: "cinv1", type: "ISSUES", label: "ISSUES" },
      { source: "kf", target: "cinv2", type: "ISSUES", label: "ISSUES" },

      // Client Invoice-Client relationships
      {
        source: "cinv1",
        target: "client1",
        type: "BILLED_TO",
        label: "BILLED TO",
      },
      {
        source: "cinv2",
        target: "client1",
        type: "BILLED_TO",
        label: "BILLED TO",
      },

      // Client Invoice-Site relationships
      {
        source: "cinv1",
        target: "site1",
        type: "FOR_SERVICES_AT",
        label: "FOR",
      },
      {
        source: "cinv2",
        target: "site1",
        type: "FOR_SERVICES_AT",
        label: "FOR",
      },

      // Client Payment-Client Invoice relationship
      {
        source: "cpay1",
        target: "cinv1",
        type: "PAYS",
        label: "PAYS",
        value: 1500000,
      },

      // Client-Client Payment relationship
      { source: "client1", target: "cpay1", type: "MAKES", label: "MAKES" },

      // Vendor-Site relationships
      {
        source: "vendor1",
        target: "site1",
        type: "PROVIDES_SERVICE_TO",
        label: "SERVICES",
      },
      {
        source: "vendor2",
        target: "site1",
        type: "PROVIDES_SERVICE_TO",
        label: "SERVICES",
      },
      {
        source: "vendor3",
        target: "site1",
        type: "PROVIDES_SERVICE_TO",
        label: "SERVICES",
      },
      {
        source: "vendor4",
        target: "site1",
        type: "PROVIDES_SERVICE_TO",
        label: "SERVICES",
      },
      {
        source: "vendor5",
        target: "site1",
        type: "PROVIDES_SERVICE_TO",
        label: "SERVICES",
      },

      // Knight Frank-Vendor relationships
      {
        source: "kf",
        target: "vendor1",
        type: "CONTRACTS",
        label: "CONTRACTS",
      },
      {
        source: "kf",
        target: "vendor2",
        type: "CONTRACTS",
        label: "CONTRACTS",
      },
      {
        source: "kf",
        target: "vendor3",
        type: "CONTRACTS",
        label: "CONTRACTS",
      },
      {
        source: "kf",
        target: "vendor4",
        type: "CONTRACTS",
        label: "CONTRACTS",
      },
      {
        source: "kf",
        target: "vendor5",
        type: "CONTRACTS",
        label: "CONTRACTS",
      },

      // Vendor-Vendor Invoice relationship
      { source: "vendor1", target: "vinv1", type: "ISSUES", label: "ISSUES" },

      // Vendor Invoice-Knight Frank relationship
      { source: "vinv1", target: "kf", type: "BILLED_TO", label: "BILLED TO" },

      // Vendor Invoice-Site relationship
      {
        source: "vinv1",
        target: "site1",
        type: "FOR_SERVICES_AT",
        label: "FOR",
      },

      // Knight Frank-Vendor Payment relationship
      { source: "kf", target: "vpay1", type: "MAKES", label: "MAKES" },

      // Vendor Payment-Vendor Invoice relationship
      {
        source: "vpay1",
        target: "vinv1",
        type: "PAYS",
        label: "PAYS",
        value: 24352,
      },
    ];

    // Set up force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1));

    // Draw links
    const link = svg.selectAll(".link").data(links).enter().append("g");

    // Add path for links
    const linkPath = link
      .append("path")
      .attr("class", "link")
      .attr("stroke", (d) => {
        if (d.type === "PAYS") return "#4CAF50";
        if (d.type === "ISSUES" || d.type === "BILLED_TO") return "#FF5722";
        if (d.type === "CONTRACTS" || d.type === "PROVIDES_SERVICE_TO")
          return "#2196F3";
        return "#999";
      })
      .attr("stroke-width", (d) => {
        // Make payment links thicker based on payment amount
        if (d.type === "PAYS") {
          return Math.log(d.value) / 10 + 1;
        }
        return 1.5;
      })
      .attr("fill", "none")
      .attr("marker-end", (d) => {
        if (d.type === "PAYS") return "url(#payment)";
        if (d.type === "ISSUES" || d.type === "BILLED_TO")
          return "url(#invoice)";
        if (d.type === "CONTRACTS") return "url(#contract)";
        return "url(#standard)";
      });

    // Add labels to links
    const linkText = link
      .append("text")
      .attr("class", "link-label")
      .attr("font-size", "8px")
      .attr("fill", "#666")
      .attr("text-anchor", "middle")
      .text((d) => d.label);

    // Draw nodes
    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Add circles for nodes
    node
      .append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => {
        switch (d.type) {
          case "client":
            return "#9C27B0";
          case "company":
            return "#3F51B5";
          case "site":
            return "#009688";
          case "vendor":
            // Color vendors based on DPO
            if (d.details && d.details.DPO) {
              if (d.details.DPO > 120) return "#F44336"; // Critical
              if (d.details.DPO > 60) return "#FF9800"; // Warning
              return "#4CAF50"; // Good
            }
            return "#607D8B";
          case "clientInvoice":
            return "#E91E63";
          case "vendorInvoice":
            return "#FF5722";
          case "clientPayment":
            return "#8BC34A";
          case "vendorPayment":
            return "#4CAF50";
          default:
            return "#999";
        }
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

    // Add labels for nodes
    node
      .append("text")
      .attr("dx", (d) => {
        if (
          [
            "clientInvoice",
            "vendorInvoice",
            "clientPayment",
            "vendorPayment",
          ].includes(d.type)
        ) {
          return d.size + 5;
        }
        return 0;
      })
      .attr("dy", (d) => {
        if (
          [
            "clientInvoice",
            "vendorInvoice",
            "clientPayment",
            "vendorPayment",
          ].includes(d.type)
        ) {
          return 4;
        }
        return -d.size - 8;
      })
      .attr("text-anchor", (d) => {
        if (
          [
            "clientInvoice",
            "vendorInvoice",
            "clientPayment",
            "vendorPayment",
          ].includes(d.type)
        ) {
          return "start";
        }
        return "middle";
      })
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text((d) => d.name);

    // Add detail text for entities
    node
      .filter((d) => d.details)
      .append("text")
      .attr("dy", (d) => -d.size + 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "8px")
      .attr("fill", "#333")
      .each(function (d) {
        const detailsText = d3.select(this);
        let yOffset = 0;

        // Different details for different types
        if (d.type === "vendor") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 10)
            .text(d.details.service);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 10)
            .text(`Exp: ${d.details.expense}`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 10)
            .text(`DPO: ${d.details.DPO}d`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 10)
            .attr(
              "fill",
              d.details.DPO > 120
                ? "#F44336"
                : d.details.DPO > 60
                ? "#FF9800"
                : "#4CAF50"
            )
            .text(`Vel: ${d.details.velocity}d`);
        } else if (d.type === "site") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 10)
            .text(`Income: ${d.details.totalIncome}`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 10)
            .text(`Expense: ${d.details.totalExpense}`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 10)
            .text(`Contrib: ${d.details.contribution}`);
        } else if (d.type === "client") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 10)
            .text(`${d.details.industry}`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 10)
            .text(`DSO: ${d.details.DSO}d`);
        } else if (d.type === "clientInvoice" || d.type === "vendorInvoice") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 10)
            .text(`${d.details.date}`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 10)
            .text(`${d.details.total}`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 10)
            .attr(
              "fill",
              d.details.status.includes("Outstanding") ? "#F44336" : "#4CAF50"
            )
            .text(`${d.details.status}`);
        }
      });

    // Add titles for hover details
    node.append("title").text((d) => {
      let details = `${d.name}\nType: ${d.type}`;

      if (d.details) {
        Object.entries(d.details).forEach(([key, value]) => {
          details += `\n${key}: ${value}`;
        });
      }

      return details;
    });

    // Add simulation tick function
    simulation.on("tick", () => {
      // Keep nodes within bounds
      nodes.forEach((d) => {
        d.x = Math.max(d.size, Math.min(width - d.size, d.x));
        d.y = Math.max(d.size, Math.min(height - d.size, d.y));
      });

      linkPath.attr("d", (d) => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);

        // Straight lines for payments, curved for others
        if (d.type === "PAYS") {
          return `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`;
        }

        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      });

      linkText.attr("transform", (d) => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        // Position the text midway along the link
        const midX = (d.source.x + d.target.x) / 2;
        const midY = (d.source.y + d.target.y) / 2;

        return `translate(${midX},${midY}) rotate(${angle})`;
      });

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Functions to handle dragging
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

    // Add legend
    const legend = svg.append("g").attr("transform", "translate(20, 20)");

    const legendData = [
      { type: "client", color: "#9C27B0", label: "Client" },
      { type: "company", color: "#3F51B5", label: "Knight Frank" },
      { type: "site", color: "#009688", label: "Site" },
      { type: "vendor-good", color: "#4CAF50", label: "Vendor (Good DPO)" },
      {
        type: "vendor-warning",
        color: "#FF9800",
        label: "Vendor (Warning DPO)",
      },
      {
        type: "vendor-critical",
        color: "#F44336",
        label: "Vendor (Critical DPO)",
      },
      { type: "clientInvoice", color: "#E91E63", label: "Client Invoice" },
      { type: "vendorInvoice", color: "#FF5722", label: "Vendor Invoice" },
      { type: "payment", color: "#8BC34A", label: "Payment" },
    ];

    const legendItems = legend
      .selectAll(".legend-item")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);

    legendItems
      .append("circle")
      .attr("r", 6)
      .attr("fill", (d) => d.color);

    legendItems
      .append("text")
      .attr("x", 15)
      .attr("y", 4)
      .text((d) => d.label)
      .attr("font-size", "12px");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">
        Financial Data Knowledge Graph Visualization
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        This visualization shows the relationship between clients, Knight Frank,
        and vendors with their financial interactions. Node sizes represent
        financial volumes, and colors indicate payment status. You can drag
        nodes to explore the relationships.
      </p>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <svg ref={svgRef} className="w-full"></svg>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <span className="font-semibold">Key insights:</span>
        </p>
        <ul className="list-disc ml-5 mt-2">
          <li>
            Express Housekeepers (red) has the highest DPO (165 days) despite
            being the largest vendor
          </li>
          <li>
            Applied Enterprises (green) has the lowest DPO (11 days) indicating
            preferential treatment
          </li>
          <li>
            The client's DSO (25 days) is much lower than the average vendor
            DPO, creating a cash flow challenge
          </li>
          <li>
            Payment velocity (how quickly vendors are typically paid when
            payments are made) differs significantly from DPO
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GraphVisualization;

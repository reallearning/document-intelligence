"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const TravelKnowledgeGraph = () => {
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
    const height = 700;

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
      .data(["standard", "category", "paidTo", "date", "division"])
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
        if (d === "category") return "#4CAF50";
        if (d === "paidTo") return "#FF5722";
        if (d === "date") return "#2196F3";
        if (d === "division") return "#9C27B0";
        return "#999";
      });

    // Define nodes based on the schema
    const nodes = [
      // Company
      {
        id: "company1",
        name: "Axis Capital",
        type: "Company",
        group: 1,
        size: 25,
        details: { name: "Axis Capital" },
      },

      // Divisions
      {
        id: "division1",
        name: "MBD Division",
        type: "Division",
        group: 2,
        size: 20,
        details: { name: "MBD Division", cost_center_code: "MBD001" },
      },

      // Expense Categories
      {
        id: "cat_AirFare",
        name: "Air Fare",
        type: "ExpenseCategory",
        group: 3,
        size: 18,
        details: { name: "Air Fare" },
      },
      {
        id: "cat_CarHire",
        name: "Car Hire",
        type: "ExpenseCategory",
        group: 3,
        size: 18,
        details: { name: "Car Hire" },
      },
      {
        id: "cat_EmpReimb",
        name: "Employee Reimbursement",
        type: "ExpenseCategory",
        group: 3,
        size: 18,
        details: { name: "Employee Reimbursement" },
      },

      // Vendors
      {
        id: "vendor_ShreeYash",
        name: "Shree Yash Destinations",
        type: "Vendor",
        group: 4,
        size: 15,
        details: {
          name: "Shree Yash Destinations Pvt Ltd",
          msme_flag: false,
        },
      },
      {
        id: "vendor_Solace",
        name: "Solace Tourism",
        type: "Vendor",
        group: 4,
        size: 15,
        details: {
          name: "Solace Tourism Pvt Ltd",
        },
      },
      {
        id: "vendor_SidhuTravel",
        name: "Sidhu Travel",
        type: "Vendor",
        group: 4,
        size: 15,
        details: {
          name: "Sidhu Travel Pvt Ltd",
        },
      },

      // Transactions
      {
        id: "tx_0023",
        name: "JRNL/JAN25/0023",
        type: "Transaction",
        group: 5,
        size: 12,
        details: {
          doc_no: "JRNL/JAN25/0023",
          tx_type: "Journal",
          amount: 65194,
          debit_credit: "Debit",
          memo: "Air travel booking",
        },
      },
      {
        id: "tx_0F07",
        name: "BKPYMT/FEB25/0007",
        type: "Transaction",
        group: 5,
        size: 12,
        details: {
          doc_no: "BKPYMT/FEB25/0007",
          tx_type: "Bank Payment",
          amount: 3753,
          debit_credit: "Debit",
          memo: "Car hire payment",
        },
      },
      {
        id: "tx_2F54",
        name: "JRNL/FEB25/0054",
        type: "Transaction",
        group: 5,
        size: 12,
        details: {
          doc_no: "JRNL/FEB25/0054",
          tx_type: "Journal",
          amount: 9175,
          debit_credit: "Debit",
          memo: "Car hire payment",
        },
      },
      {
        id: "tx_0035",
        name: "JRNL/JAN25/0035",
        type: "Transaction",
        group: 5,
        size: 12,
        details: {
          doc_no: "JRNL/JAN25/0035",
          tx_type: "Journal",
          amount: 11944,
          debit_credit: "Debit",
          memo: "Employee reimbursement",
        },
      },

      // Dates
      {
        id: "date_2025-01-08",
        name: "08 Jan 2025",
        type: "Date",
        group: 6,
        size: 10,
        details: {
          iso_date: "2025-01-08",
          fiscal_qtr: "Q4-FY25",
          month: 1,
          year: 2025,
        },
      },
      {
        id: "date_2025-02-04",
        name: "04 Feb 2025",
        type: "Date",
        group: 6,
        size: 10,
        details: {
          iso_date: "2025-02-04",
          fiscal_qtr: "Q4-FY25",
          month: 2,
          year: 2025,
        },
      },
      {
        id: "date_2025-02-07",
        name: "07 Feb 2025",
        type: "Date",
        group: 6,
        size: 10,
        details: {
          iso_date: "2025-02-07",
          fiscal_qtr: "Q4-FY25",
          month: 2,
          year: 2025,
        },
      },
      {
        id: "date_2025-01-20",
        name: "20 Jan 2025",
        type: "Date",
        group: 6,
        size: 10,
        details: {
          iso_date: "2025-01-20",
          fiscal_qtr: "Q4-FY25",
          month: 1,
          year: 2025,
        },
      },

      // Employee
      {
        id: "emp_A123",
        name: "Employee A123",
        type: "Employee",
        group: 7,
        size: 14,
        details: {
          emp_id: "A123",
          full_name: "Employee A123",
        },
      },

      // Locations
      {
        id: "loc_mumbai",
        name: "Mumbai",
        type: "Location",
        group: 8,
        size: 10,
        details: {
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
        },
      },
      {
        id: "loc_delhi",
        name: "Delhi",
        type: "Location",
        group: 8,
        size: 10,
        details: {
          city: "Delhi",
          state: "Delhi",
          country: "India",
        },
      },
    ];

    // Define links between nodes (relationships)
    const links = [
      // Company-Division relationship
      {
        source: "company1",
        target: "division1",
        type: "hasDivision",
        label: "HAS DIVISION",
      },

      // Division-Transaction relationships
      {
        source: "division1",
        target: "tx_0023",
        type: "incurredTransaction",
        label: "INCURRED",
      },
      {
        source: "division1",
        target: "tx_0F07",
        type: "incurredTransaction",
        label: "INCURRED",
      },
      {
        source: "division1",
        target: "tx_2F54",
        type: "incurredTransaction",
        label: "INCURRED",
      },
      {
        source: "division1",
        target: "tx_0035",
        type: "incurredTransaction",
        label: "INCURRED",
      },

      // Transaction-Category relationships
      {
        source: "tx_0023",
        target: "cat_AirFare",
        type: "category",
        label: "CATEGORY",
      },
      {
        source: "tx_0F07",
        target: "cat_CarHire",
        type: "category",
        label: "CATEGORY",
      },
      {
        source: "tx_2F54",
        target: "cat_CarHire",
        type: "category",
        label: "CATEGORY",
      },
      {
        source: "tx_0035",
        target: "cat_EmpReimb",
        type: "category",
        label: "CATEGORY",
      },

      // Transaction-Vendor relationships
      {
        source: "tx_0023",
        target: "vendor_ShreeYash",
        type: "paidTo",
        label: "PAID TO",
      },
      {
        source: "tx_0F07",
        target: "vendor_Solace",
        type: "paidTo",
        label: "PAID TO",
      },
      {
        source: "tx_2F54",
        target: "vendor_SidhuTravel",
        type: "paidTo",
        label: "PAID TO",
      },

      // Transaction-Date relationships
      {
        source: "tx_0023",
        target: "date_2025-01-08",
        type: "occurredOn",
        label: "OCCURRED ON",
      },
      {
        source: "tx_0F07",
        target: "date_2025-02-04",
        type: "occurredOn",
        label: "OCCURRED ON",
      },
      {
        source: "tx_2F54",
        target: "date_2025-02-07",
        type: "occurredOn",
        label: "OCCURRED ON",
      },
      {
        source: "tx_0035",
        target: "date_2025-01-20",
        type: "occurredOn",
        label: "OCCURRED ON",
      },

      // Transaction-Employee relationship (reimbursement)
      {
        source: "tx_0035",
        target: "emp_A123",
        type: "reimbursedTo",
        label: "REIMBURSED TO",
      },

      // Vendor-Location relationships
      {
        source: "vendor_ShreeYash",
        target: "loc_mumbai",
        type: "vendorLocatedIn",
        label: "LOCATED IN",
      },
      {
        source: "vendor_Solace",
        target: "loc_delhi",
        type: "vendorLocatedIn",
        label: "LOCATED IN",
      },

      // Transaction-Location relationships
      {
        source: "tx_0023",
        target: "loc_mumbai",
        type: "bookedInCity",
        label: "BOOKED IN",
      },
      {
        source: "tx_0F07",
        target: "loc_delhi",
        type: "bookedInCity",
        label: "BOOKED IN",
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
        if (d.type === "paidTo") return "#FF5722";
        if (d.type === "category") return "#4CAF50";
        if (d.type === "occurredOn") return "#2196F3";
        if (d.type === "hasDivision" || d.type === "incurredTransaction")
          return "#9C27B0";
        if (d.type === "reimbursedTo") return "#E91E63";
        if (d.type === "vendorLocatedIn" || d.type === "bookedInCity")
          return "#607D8B";
        return "#999";
      })
      .attr("stroke-width", (d) => {
        // Make transaction links thicker based on amount
        if (d.source.details && d.source.details.amount) {
          return Math.log(d.source.details.amount) / 10 + 1;
        }
        return 1.5;
      })
      .attr("fill", "none")
      .attr("marker-end", (d) => {
        if (d.type === "paidTo") return "url(#paidTo)";
        if (d.type === "category") return "url(#category)";
        if (d.type === "occurredOn") return "url(#date)";
        if (d.type === "hasDivision" || d.type === "incurredTransaction")
          return "url(#division)";
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
          case "Company":
            return "#3F51B5";
          case "Division":
            return "#9C27B0";
          case "ExpenseCategory":
            return "#4CAF50";
          case "Vendor":
            return "#FF5722";
          case "Transaction":
            return "#FFC107";
          case "Date":
            return "#2196F3";
          case "Employee":
            return "#E91E63";
          case "Location":
            return "#607D8B";
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
        if (["Transaction", "Date"].includes(d.type)) {
          return d.size + 5;
        }
        return 0;
      })
      .attr("dy", (d) => {
        if (["Transaction", "Date"].includes(d.type)) {
          return 4;
        }
        return -d.size - 8;
      })
      .attr("text-anchor", (d) => {
        if (["Transaction", "Date"].includes(d.type)) {
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
      .attr("dy", (d) => {
        if (["Transaction", "Date"].includes(d.type)) {
          return 18;
        }
        return -d.size + 2;
      })
      .attr("text-anchor", (d) => {
        if (["Transaction", "Date"].includes(d.type)) {
          return "start";
        }
        return "middle";
      })
      .attr("font-size", "8px")
      .attr("fill", "#333")
      .each(function (d) {
        const detailsText = d3.select(this);
        let yOffset = 0;

        // Different details for different types
        if (d.type === "Transaction") {
          detailsText
            .append("tspan")
            .attr("x", d.size + 5)
            .attr("dy", yOffset + 10)
            .text(
              `${d.details.tx_type} - ₹${d.details.amount.toLocaleString()}`
            );
        } else if (d.type === "Date") {
          detailsText
            .append("tspan")
            .attr("x", d.size + 5)
            .attr("dy", yOffset + 10)
            .text(`${d.details.fiscal_qtr}`);
        } else if (d.type === "Vendor") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 10)
            .text(d.details.name);
        } else if (d.type === "Employee") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 10)
            .text(`ID: ${d.details.emp_id}`);
        } else if (d.type === "Location") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 10)
            .text(`${d.details.city}, ${d.details.country}`);
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

        // Straight lines for direct relationships, curved for others
        if (d.type === "paidTo" || d.type === "incurredTransaction") {
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
      { type: "Company", color: "#3F51B5", label: "Company" },
      { type: "Division", color: "#9C27B0", label: "Division" },
      { type: "ExpenseCategory", color: "#4CAF50", label: "Expense Category" },
      { type: "Vendor", color: "#FF5722", label: "Vendor" },
      { type: "Transaction", color: "#FFC107", label: "Transaction" },
      { type: "Date", color: "#2196F3", label: "Date" },
      { type: "Employee", color: "#E91E63", label: "Employee" },
      { type: "Location", color: "#607D8B", label: "Location" },
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
      <h2 className="text-xl font-bold mb-4">Travel Expense Knowledge Graph</h2>
      <p className="text-sm text-gray-600 mb-4">
        This visualization shows the relationships between different entities in
        the travel expense data. Node colors represent entity types, and edge
        colors represent relationship types. You can drag nodes to explore the
        relationships.
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
            Visualizes the complete schema with Company, Division,
            ExpenseCategory, Vendor, Transaction, Date, Location and Employee
            nodes
          </li>
          <li>
            Shows relationships between entities like hasDivision,
            incurredTransaction, category, paidTo, occurredOn, etc.
          </li>
          <li>
            Transaction nodes (yellow) represent the individual expense entries,
            linked to their categories, dates, and vendors
          </li>
          <li>
            The graph allows for easy tracing of the flow of expenses through
            the organization
          </li>
        </ul>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <span className="font-semibold">Sample queries supported:</span>
        </p>
        <ul className="list-disc ml-5 mt-2">
          <li>"Total car-hire spend in February 2025?"</li>
          <li>"Top 3 vendors by air-fare spend in Q4-FY25?"</li>
          <li>"All reimbursements to employee A123 in March 2025."</li>
        </ul>
      </div>
    </div>
  );
};

export default TravelKnowledgeGraph;

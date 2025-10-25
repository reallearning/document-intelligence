"use client";
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Link from "next/link";

const AgentTraversalVisualization = () => {
  const svgRef = useRef();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingStep, setEditingStep] = useState(false);
  const [editStepDescription, setEditStepDescription] = useState("");
  const playIntervalRef = useRef(null);

  // Complete agent architecture with better spacing
  const allAgents = [
    {
      id: "user",
      name: "User Query",
      size: 16,
      color: "#EC4899",
      tier: 0,
      position: { x: 500, y: 40 },
    },
    {
      id: "splitter",
      name: "Query Splitter",
      size: 15,
      color: "#F59E0B",
      tier: 1,
      position: { x: 500, y: 130 },
    },
    {
      id: "knowledge",
      name: "Domain Knowledge",
      size: 15,
      color: "#8B5CF6",
      tier: 2,
      position: { x: 300, y: 220 },
    },
    {
      id: "orchestrator",
      name: "Orchestrator",
      size: 16,
      color: "#6366F1",
      tier: 2,
      position: { x: 700, y: 220 },
    },
    {
      id: "inventory",
      name: "Inventory",
      size: 13,
      color: "#06B6D4",
      tier: 3,
      position: { x: 150, y: 340 },
    },
    {
      id: "sales",
      name: "Sales",
      size: 13,
      color: "#10B981",
      tier: 3,
      position: { x: 270, y: 340 },
    },
    {
      id: "product",
      name: "Product",
      size: 13,
      color: "#3B82F6",
      tier: 3,
      position: { x: 390, y: 340 },
    },
    {
      id: "store",
      name: "Store",
      size: 13,
      color: "#14B8A6",
      tier: 3,
      position: { x: 510, y: 340 },
    },
    {
      id: "kpi",
      name: "KPI",
      size: 13,
      color: "#8B5CF6",
      tier: 3,
      position: { x: 630, y: 340 },
    },
    {
      id: "lineage",
      name: "Lineage",
      size: 13,
      color: "#A855F7",
      tier: 3,
      position: { x: 750, y: 340 },
    },
    {
      id: "basestock",
      name: "Base-Stock",
      size: 13,
      color: "#F97316",
      tier: 3,
      position: { x: 870, y: 340 },
    },
    {
      id: "pricing",
      name: "Pricing",
      size: 13,
      color: "#F59E0B",
      tier: 3,
      position: { x: 210, y: 430 },
    },
    {
      id: "vendor",
      name: "Vendor",
      size: 13,
      color: "#EF4444",
      tier: 3,
      position: { x: 390, y: 430 },
    },
    {
      id: "event",
      name: "Event",
      size: 13,
      color: "#84CC16",
      tier: 3,
      position: { x: 570, y: 430 },
    },
    {
      id: "executor",
      name: "Executor",
      size: 15,
      color: "#059669",
      tier: 4,
      position: { x: 500, y: 550 },
    },
    {
      id: "compiler",
      name: "Response Compiler",
      size: 15,
      color: "#0891B2",
      tier: 5,
      position: { x: 500, y: 640 },
    },
  ];

  const allConnections = [
    { source: "user", target: "splitter" },
    { source: "splitter", target: "knowledge" },
    { source: "splitter", target: "orchestrator" },
    { source: "knowledge", target: "orchestrator" },
    { source: "orchestrator", target: "inventory" },
    { source: "orchestrator", target: "sales" },
    { source: "orchestrator", target: "product" },
    { source: "orchestrator", target: "store" },
    { source: "orchestrator", target: "basestock" },
    { source: "orchestrator", target: "pricing" },
    { source: "orchestrator", target: "vendor" },
    { source: "orchestrator", target: "event" },
    { source: "orchestrator", target: "kpi" },
    { source: "orchestrator", target: "lineage" },
    { source: "inventory", target: "executor" },
    { source: "sales", target: "executor" },
    { source: "product", target: "executor" },
    { source: "store", target: "executor" },
    { source: "basestock", target: "executor" },
    { source: "pricing", target: "executor" },
    { source: "vendor", target: "executor" },
    { source: "event", target: "executor" },
    { source: "kpi", target: "executor" },
    { source: "lineage", target: "executor" },
    { source: "executor", target: "compiler" },
    { source: "compiler", target: "user" },
  ];

  const questions = [
    {
      id: "q1",
      question: "Which SKUs will stock out in the next 7/14 days by store?",
      description: "Forecast logic for inventory stockout prediction",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User submits stockout prediction query",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message:
                'Query received: "Which SKUs will stock out in the next 7/14 days by store?"',
            },
            {
              type: "data",
              message: "User context: Store Manager, Region: West",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description:
            "Query Splitter decomposes the question into sub-queries",
          activeTools: [
            {
              agent: "splitter",
              tools: ["Query Decomposition", "Complexity Analyzer"],
            },
          ],
          logs: [
            { type: "process", message: "Analyzing query complexity..." },
            {
              type: "data",
              message: "Entities: [SKUs, stock out, 7/14 days, store]",
            },
            {
              type: "data",
              message:
                "Sub-queries: Inventory check, Sales velocity, Lead time",
            },
          ],
        },
        {
          step: 3,
          agents: ["user", "splitter", "knowledge"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
          ],
          description:
            "Domain Knowledge Agent provides forecast logic and formulas",
          activeTools: [
            {
              agent: "knowledge",
              tools: ["KPI Definitions", "Formula Repository"],
            },
          ],
          logs: [
            {
              type: "process",
              message: "Retrieving stockout prediction formulas...",
            },
            {
              type: "data",
              message:
                "Formula: Days to Stockout = Current Stock / Daily Sales Velocity",
            },
            {
              type: "data",
              message: "Threshold: Alert if < 7 days or < 14 days",
            },
          ],
        },
        {
          step: 4,
          agents: ["user", "splitter", "knowledge", "orchestrator"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
            { source: "splitter", target: "orchestrator" },
            { source: "knowledge", target: "orchestrator" },
          ],
          description:
            "Orchestrator builds workflow plan and routes to domain agents",
          activeTools: [
            {
              agent: "orchestrator",
              tools: ["Workflow Planner", "Routing Engine"],
            },
          ],
          logs: [
            { type: "process", message: "Building execution plan..." },
            {
              type: "data",
              message: "Agents required: Inventory, Sales, Base-Stock",
            },
            { type: "data", message: "Execution mode: Parallel" },
          ],
        },
        {
          step: 5,
          agents: [
            "user",
            "splitter",
            "knowledge",
            "orchestrator",
            "inventory",
            "sales",
            "basestock",
          ],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "orchestrator", target: "inventory" },
            { source: "orchestrator", target: "sales" },
            { source: "orchestrator", target: "basestock" },
          ],
          description:
            "Domain agents execute in parallel gathering inventory, sales, and lead time data",
          activeTools: [
            { agent: "inventory", tools: ["Current Stock", "Stock Movement"] },
            { agent: "sales", tools: ["Sales Velocity"] },
            { agent: "basestock", tools: ["Lead-Time Normalizer"] },
          ],
          logs: [
            {
              type: "data",
              message: "Inventory: Retrieved 1,247 SKUs across 85 stores",
            },
            {
              type: "data",
              message: "Sales: Avg velocity calculated for past 30 days",
            },
            {
              type: "data",
              message: "Base-Stock: Lead times normalized (avg 12 days)",
            },
            {
              type: "output",
              message: "Identified 34 SKUs at risk of stockout",
            },
          ],
        },
        {
          step: 6,
          agents: [
            "user",
            "splitter",
            "orchestrator",
            "inventory",
            "sales",
            "basestock",
            "executor",
          ],
          edges: [
            { source: "orchestrator", target: "inventory" },
            { source: "orchestrator", target: "sales" },
            { source: "orchestrator", target: "basestock" },
            { source: "inventory", target: "executor" },
            { source: "sales", target: "executor" },
            { source: "basestock", target: "executor" },
          ],
          description:
            "Executor combines data streams and applies business rules",
          activeTools: [
            { agent: "executor", tools: ["SQL Combiner", "Rule Applicator"] },
          ],
          logs: [
            { type: "process", message: "Joining data from 3 agents..." },
            {
              type: "data",
              message:
                "Applied filters: Store type=EBO, Stock threshold=7 days",
            },
            {
              type: "data",
              message: "Result set: 34 SKUs with stockout risk scores",
            },
          ],
        },
        {
          step: 7,
          agents: ["user", "executor", "compiler"],
          edges: [
            { source: "executor", target: "compiler" },
            { source: "compiler", target: "user" },
          ],
          description:
            "Response Compiler generates formatted stockout forecast report",
          activeTools: [
            {
              agent: "compiler",
              tools: ["Table Generator", "Summary Generator"],
            },
          ],
          logs: [
            { type: "process", message: "Generating report tables..." },
            {
              type: "output",
              message:
                "Report: 12 SKUs critical (< 7 days), 22 SKUs warning (7-14 days)",
            },
            {
              type: "output",
              message:
                "Delivered to user: Excel report + summary visualization",
            },
          ],
        },
      ],
    },
    {
      id: "q2",
      question: "Where do channel prices conflict with policy?",
      description: "Policy compliance check for pricing",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User asks about pricing policy conflicts",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message: 'Query: "Where do channel prices conflict with policy?"',
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description: "Query Splitter analyzes pricing compliance query",
          activeTools: [{ agent: "splitter", tools: ["Query Decomposition"] }],
          logs: [
            {
              type: "data",
              message: "Identified: Pricing compliance check across channels",
            },
          ],
        },
        {
          step: 3,
          agents: ["user", "splitter", "knowledge", "orchestrator"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
            { source: "splitter", target: "orchestrator" },
            { source: "knowledge", target: "orchestrator" },
          ],
          description:
            "Knowledge provides policy rules, Orchestrator plans workflow",
          activeTools: [
            {
              agent: "knowledge",
              tools: ["Business Logic", "Constraint Engine"],
            },
            { agent: "orchestrator", tools: ["Workflow Planner"] },
          ],
          logs: [
            {
              type: "data",
              message:
                "Policy rules: MAP pricing, channel exclusivity, markdown limits",
            },
            {
              type: "data",
              message: "Workflow: Pricing → Product → Store → Executor",
            },
          ],
        },
        {
          step: 4,
          agents: [
            "user",
            "splitter",
            "orchestrator",
            "pricing",
            "product",
            "store",
          ],
          edges: [
            { source: "splitter", target: "orchestrator" },
            { source: "orchestrator", target: "pricing" },
            { source: "orchestrator", target: "product" },
            { source: "orchestrator", target: "store" },
          ],
          description: "Agents gather pricing, product, and channel data",
          activeTools: [
            { agent: "pricing", tools: ["Price Ladder"] },
            { agent: "product", tools: ["Style→SKU Mapper"] },
            { agent: "store", tools: ["Store Filter"] },
          ],
          logs: [
            {
              type: "data",
              message: "Pricing: 3,456 active prices across channels",
            },
            {
              type: "data",
              message: "Product: 890 SKUs with channel restrictions",
            },
            { type: "output", message: "Found 31 policy violations" },
          ],
        },
        {
          step: 5,
          agents: [
            "user",
            "orchestrator",
            "pricing",
            "product",
            "store",
            "executor",
          ],
          edges: [
            { source: "pricing", target: "executor" },
            { source: "product", target: "executor" },
            { source: "store", target: "executor" },
          ],
          description: "Executor validates against policy rules",
          activeTools: [{ agent: "executor", tools: ["Rule Applicator"] }],
          logs: [
            {
              type: "process",
              message: "Validating pricing against policies...",
            },
            {
              type: "output",
              message: "Violations: 18 MAP breaches, 13 channel conflicts",
            },
          ],
        },
        {
          step: 6,
          agents: ["user", "executor", "compiler"],
          edges: [
            { source: "executor", target: "compiler" },
            { source: "compiler", target: "user" },
          ],
          description: "Compiler generates compliance report",
          activeTools: [{ agent: "compiler", tools: ["Table Generator"] }],
          logs: [
            {
              type: "output",
              message:
                "Report delivered: 31 violations with recommended actions",
            },
          ],
        },
      ],
    },
    {
      id: "q3",
      question: "Why did sales deviate from plan yesterday?",
      description: "Variance analysis for sales performance",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User requests variance analysis",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message: "Query: Sales variance analysis for yesterday",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description: "Query Splitter identifies variance factors to analyze",
          activeTools: [{ agent: "splitter", tools: ["Query Decomposition"] }],
          logs: [
            {
              type: "data",
              message:
                "Variance factors: Sales, Inventory, Pricing, Store events",
            },
          ],
        },
        {
          step: 3,
          agents: ["user", "splitter", "knowledge", "orchestrator"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
            { source: "splitter", target: "orchestrator" },
            { source: "knowledge", target: "orchestrator" },
          ],
          description:
            "Knowledge provides variance formula, Orchestrator plans multi-agent analysis",
          activeTools: [
            { agent: "knowledge", tools: ["Formula Repository"] },
            { agent: "orchestrator", tools: ["Workflow Planner"] },
          ],
          logs: [
            {
              type: "data",
              message: "Formula: Variance = Actual - Plan, analyze by category",
            },
          ],
        },
        {
          step: 4,
          agents: [
            "user",
            "splitter",
            "orchestrator",
            "sales",
            "inventory",
            "pricing",
            "store",
          ],
          edges: [
            { source: "splitter", target: "orchestrator" },
            { source: "orchestrator", target: "sales" },
            { source: "orchestrator", target: "inventory" },
            { source: "orchestrator", target: "pricing" },
            { source: "orchestrator", target: "store" },
          ],
          description: "Multiple agents analyze different variance factors",
          activeTools: [
            { agent: "sales", tools: ["Sales", "Growth"] },
            { agent: "inventory", tools: ["Out of Stock"] },
            { agent: "pricing", tools: ["Promo Tracker"] },
            { agent: "store", tools: ["Store Filter"] },
          ],
          logs: [
            { type: "data", message: "Sales: -$58K variance (12% below plan)" },
            { type: "data", message: "OOS Impact: -$23K lost sales" },
            { type: "data", message: "Weather: -$35K (storm in key markets)" },
          ],
        },
        {
          step: 5,
          agents: [
            "user",
            "orchestrator",
            "sales",
            "inventory",
            "pricing",
            "store",
            "executor",
          ],
          edges: [
            { source: "sales", target: "executor" },
            { source: "inventory", target: "executor" },
            { source: "pricing", target: "executor" },
            { source: "store", target: "executor" },
          ],
          description: "Executor aggregates variance factors",
          activeTools: [{ agent: "executor", tools: ["SQL Combiner"] }],
          logs: [
            {
              type: "output",
              message: "Total variance explained: $58K (40% OOS, 60% weather)",
            },
          ],
        },
        {
          step: 6,
          agents: ["user", "executor", "compiler"],
          edges: [
            { source: "executor", target: "compiler" },
            { source: "compiler", target: "user" },
          ],
          description: "Compiler delivers variance analysis with breakdown",
          activeTools: [{ agent: "compiler", tools: ["Comparison Engine"] }],
          logs: [
            {
              type: "output",
              message:
                "Report: Variance breakdown with recommendations to recover",
            },
          ],
        },
      ],
    },
    {
      id: "q4",
      question: "Which styles drive 80% of revenue per channel?",
      description: "Pareto analysis for revenue concentration",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User asks for Pareto revenue analysis",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message: "Query: 80/20 revenue analysis by style and channel",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description: "Query Splitter identifies Pareto logic requirements",
          activeTools: [{ agent: "splitter", tools: ["Query Decomposition"] }],
          logs: [
            {
              type: "data",
              message:
                "Analysis type: Pareto (80/20 rule), Group by: Style & Channel",
            },
          ],
        },
        {
          step: 3,
          agents: ["user", "splitter", "knowledge", "orchestrator"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
            { source: "splitter", target: "orchestrator" },
            { source: "knowledge", target: "orchestrator" },
          ],
          description:
            "Knowledge provides Pareto logic, Orchestrator routes to Product and Sales",
          activeTools: [
            { agent: "knowledge", tools: ["KPI Definitions"] },
            { agent: "orchestrator", tools: ["Workflow Planner"] },
          ],
          logs: [
            {
              type: "data",
              message: "Pareto: Sort by cumulative revenue, find 80% threshold",
            },
          ],
        },
        {
          step: 4,
          agents: ["user", "orchestrator", "product", "sales"],
          edges: [
            { source: "orchestrator", target: "product" },
            { source: "orchestrator", target: "sales" },
          ],
          description:
            "Product and Sales agents gather style hierarchy and channel revenue",
          activeTools: [
            {
              agent: "product",
              tools: ["Style→SKU Mapper", "Product Attribute Summary"],
            },
            { agent: "sales", tools: ["Sales", "Top/Bottom Sales"] },
          ],
          logs: [
            { type: "data", message: "Product: 342 styles across 6 channels" },
            {
              type: "data",
              message: "Sales: Total revenue $2.4M across channels",
            },
          ],
        },
        {
          step: 5,
          agents: ["user", "product", "sales", "executor"],
          edges: [
            { source: "product", target: "executor" },
            { source: "sales", target: "executor" },
          ],
          description:
            "Executor calculates cumulative revenue and identifies top styles",
          activeTools: [
            { agent: "executor", tools: ["SQL Combiner", "Rule Applicator"] },
          ],
          logs: [
            {
              type: "process",
              message: "Computing cumulative revenue by style...",
            },
            {
              type: "output",
              message: "28 styles drive 80% of revenue ($1.92M)",
            },
          ],
        },
        {
          step: 6,
          agents: ["user", "executor", "compiler"],
          edges: [
            { source: "executor", target: "compiler" },
            { source: "compiler", target: "user" },
          ],
          description: "Compiler generates Pareto chart and top styles list",
          activeTools: [
            {
              agent: "compiler",
              tools: ["Chart Generator", "Table Generator"],
            },
          ],
          logs: [
            {
              type: "output",
              message: "Report: Pareto chart with top 28 styles by channel",
            },
          ],
        },
      ],
    },
    {
      id: "q5",
      question: "Which SKUs are margin-accretive vs dilutive?",
      description: "Margin contribution analysis",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User requests margin impact analysis",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message: "Query: Identify margin-accretive and dilutive SKUs",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description: "Query Splitter breaks down margin analysis components",
          activeTools: [{ agent: "splitter", tools: ["Query Decomposition"] }],
          logs: [
            {
              type: "data",
              message:
                "Components: Net sales, Discounts, Vendor costs, Margin %",
            },
          ],
        },
        {
          step: 3,
          agents: ["user", "splitter", "knowledge", "orchestrator"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
            { source: "splitter", target: "orchestrator" },
            { source: "knowledge", target: "orchestrator" },
          ],
          description:
            "Knowledge provides margin formulas, Orchestrator plans multi-source query",
          activeTools: [
            { agent: "knowledge", tools: ["Formula Repository"] },
            { agent: "orchestrator", tools: ["Workflow Planner"] },
          ],
          logs: [
            {
              type: "data",
              message: "Formula: Margin % = (Net Sales - Cost) / Net Sales",
            },
            {
              type: "data",
              message: "Threshold: >35% accretive, <20% dilutive",
            },
          ],
        },
        {
          step: 4,
          agents: ["user", "orchestrator", "sales", "pricing", "vendor"],
          edges: [
            { source: "orchestrator", target: "sales" },
            { source: "orchestrator", target: "pricing" },
            { source: "orchestrator", target: "vendor" },
          ],
          description: "Agents gather sales, pricing, and cost data",
          activeTools: [
            { agent: "sales", tools: ["Sales"] },
            { agent: "pricing", tools: ["Discount Curve"] },
            { agent: "vendor", tools: ["Vendor Scorecard"] },
          ],
          logs: [
            {
              type: "data",
              message: "Sales: Retrieved net sales for 1,850 SKUs",
            },
            { type: "data", message: "Pricing: Average discount 15.3%" },
            { type: "data", message: "Vendor: Cost data for all active SKUs" },
          ],
        },
        {
          step: 5,
          agents: ["user", "sales", "pricing", "vendor", "executor"],
          edges: [
            { source: "sales", target: "executor" },
            { source: "pricing", target: "executor" },
            { source: "vendor", target: "executor" },
          ],
          description: "Executor calculates margin per SKU and categorizes",
          activeTools: [
            { agent: "executor", tools: ["SQL Combiner", "Rule Applicator"] },
          ],
          logs: [
            { type: "process", message: "Computing margins for all SKUs..." },
            {
              type: "output",
              message:
                "Accretive: 342 SKUs, Dilutive: 127 SKUs, Neutral: 1,381 SKUs",
            },
          ],
        },
        {
          step: 6,
          agents: ["user", "executor", "compiler"],
          edges: [
            { source: "executor", target: "compiler" },
            { source: "compiler", target: "user" },
          ],
          description: "Compiler generates margin analysis report",
          activeTools: [
            {
              agent: "compiler",
              tools: ["Table Generator", "Summary Generator"],
            },
          ],
          logs: [
            {
              type: "output",
              message: "Report: SKU margin breakdown with recommendations",
            },
          ],
        },
      ],
    },
    {
      id: "q6",
      question:
        "Which styles are cannibalizing each other within a subcategory?",
      description: "Cross-elasticity and cannibalization analysis",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User asks about style cannibalization",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message: "Query: Identify cannibalizing styles in subcategories",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description:
            "Query Splitter identifies cross-elasticity analysis requirements",
          activeTools: [{ agent: "splitter", tools: ["Query Decomposition"] }],
          logs: [
            {
              type: "data",
              message:
                "Analysis: Cross-elasticity, sales overlap within subcategories",
            },
          ],
        },
        {
          step: 3,
          agents: ["user", "splitter", "knowledge", "orchestrator"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
            { source: "splitter", target: "orchestrator" },
            { source: "knowledge", target: "orchestrator" },
          ],
          description:
            "Knowledge provides cannibalization rules, Orchestrator plans analysis",
          activeTools: [
            { agent: "knowledge", tools: ["Business Logic"] },
            { agent: "orchestrator", tools: ["Workflow Planner"] },
          ],
          logs: [
            {
              type: "data",
              message:
                "Rule: Negative correlation in sales trends = cannibalization",
            },
          ],
        },
        {
          step: 4,
          agents: ["user", "orchestrator", "product", "sales"],
          edges: [
            { source: "orchestrator", target: "product" },
            { source: "orchestrator", target: "sales" },
          ],
          description:
            "Product and Sales agents analyze subcategory grouping and sales patterns",
          activeTools: [
            {
              agent: "product",
              tools: ["Product Attribute Summary", "Lifecycle Filter"],
            },
            { agent: "sales", tools: ["Sales", "Growth"] },
          ],
          logs: [
            {
              type: "data",
              message: "Product: 18 subcategories with 234 styles",
            },
            { type: "data", message: "Sales: Analyzing 90-day sales trends" },
            {
              type: "output",
              message: "Found 12 style pairs with negative correlation",
            },
          ],
        },
        {
          step: 5,
          agents: ["user", "product", "sales", "executor"],
          edges: [
            { source: "product", target: "executor" },
            { source: "sales", target: "executor" },
          ],
          description: "Executor identifies cannibalizing style pairs",
          activeTools: [{ agent: "executor", tools: ["SQL Combiner"] }],
          logs: [
            {
              type: "output",
              message:
                "Cannibalization detected in 3 subcategories, 12 style pairs",
            },
          ],
        },
        {
          step: 6,
          agents: ["user", "executor", "compiler"],
          edges: [
            { source: "executor", target: "compiler" },
            { source: "compiler", target: "user" },
          ],
          description:
            "Compiler generates cannibalization report with recommendations",
          activeTools: [{ agent: "compiler", tools: ["Table Generator"] }],
          logs: [
            {
              type: "output",
              message:
                "Report: Style pairs with overlap scores and assortment suggestions",
            },
          ],
        },
      ],
    },
    {
      id: "q7",
      question: "What is the lost demand from OOS online?",
      description: "Lost sales calculation from out-of-stock",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User queries lost demand from online stockouts",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message: "Query: Calculate lost demand from OOS online",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description: "Query Splitter decomposes lost sales logic",
          activeTools: [{ agent: "splitter", tools: ["Query Decomposition"] }],
          logs: [
            {
              type: "data",
              message:
                "Components: Online stock, Sessions, Orders, Conversion rate",
            },
          ],
        },
        {
          step: 3,
          agents: ["user", "splitter", "knowledge", "orchestrator"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
            { source: "splitter", target: "orchestrator" },
            { source: "knowledge", target: "orchestrator" },
          ],
          description:
            "Knowledge provides lost-sales formula, Orchestrator routes query",
          activeTools: [
            { agent: "knowledge", tools: ["Formula Repository"] },
            { agent: "orchestrator", tools: ["Workflow Planner"] },
          ],
          logs: [
            {
              type: "data",
              message:
                "Formula: Lost Sales = OOS Sessions × Avg Conversion × AOV",
            },
          ],
        },
        {
          step: 4,
          agents: ["user", "orchestrator", "inventory", "sales", "store"],
          edges: [
            { source: "orchestrator", target: "inventory" },
            { source: "orchestrator", target: "sales" },
            { source: "orchestrator", target: "store" },
          ],
          description:
            "Agents gather online stock, sales data, and channel filters",
          activeTools: [
            { agent: "inventory", tools: ["Out of Stock"] },
            { agent: "sales", tools: ["Sales", "ASP"] },
            { agent: "store", tools: ["Store Filter"] },
          ],
          logs: [
            {
              type: "data",
              message: "Inventory: 156 SKUs out of stock online",
            },
            { type: "data", message: "Sales: Avg conversion 2.8%, AOV $145" },
            { type: "data", message: "Store: Filtered to Own E-com channel" },
          ],
        },
        {
          step: 5,
          agents: ["user", "inventory", "sales", "store", "executor"],
          edges: [
            { source: "inventory", target: "executor" },
            { source: "sales", target: "executor" },
            { source: "store", target: "executor" },
          ],
          description: "Executor calculates total lost demand",
          activeTools: [{ agent: "executor", tools: ["SQL Combiner"] }],
          logs: [
            { type: "process", message: "Computing lost sales from OOS..." },
            {
              type: "output",
              message: "Estimated lost demand: $87K over 30 days",
            },
          ],
        },
        {
          step: 6,
          agents: ["user", "executor", "compiler"],
          edges: [
            { source: "executor", target: "compiler" },
            { source: "compiler", target: "user" },
          ],
          description: "Compiler generates lost sales report",
          activeTools: [{ agent: "compiler", tools: ["Summary Generator"] }],
          logs: [
            {
              type: "output",
              message: "Report: $87K lost demand with top OOS SKUs",
            },
          ],
        },
      ],
    },
    {
      id: "q8",
      question: "Which cohorts respond best to a 20% coupon?",
      description: "Coupon response and uplift analysis",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User asks about coupon response by cohorts",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message: "Query: Identify cohorts with best 20% coupon response",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description: "Query Splitter identifies uplift model requirements",
          activeTools: [{ agent: "splitter", tools: ["Query Decomposition"] }],
          logs: [
            {
              type: "data",
              message:
                "Analysis: Coupon uplift by cohort, segmentation criteria",
            },
          ],
        },
        {
          step: 3,
          agents: ["user", "splitter", "knowledge", "orchestrator"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
            { source: "splitter", target: "orchestrator" },
            { source: "knowledge", target: "orchestrator" },
          ],
          description:
            "Knowledge provides uplift model, Orchestrator routes to agents",
          activeTools: [
            { agent: "knowledge", tools: ["KPI Definitions"] },
            { agent: "orchestrator", tools: ["Workflow Planner"] },
          ],
          logs: [
            {
              type: "data",
              message: "Uplift: Compare order rate with vs without coupon",
            },
          ],
        },
        {
          step: 4,
          agents: ["user", "orchestrator", "sales", "product", "store"],
          edges: [
            { source: "orchestrator", target: "sales" },
            { source: "orchestrator", target: "product" },
            { source: "orchestrator", target: "store" },
          ],
          description: "Agents analyze orders with coupons across segments",
          activeTools: [
            { agent: "sales", tools: ["Sales", "Discounts"] },
            { agent: "product", tools: ["Product Attribute Summary"] },
            { agent: "store", tools: ["Cluster Filter"] },
          ],
          logs: [
            { type: "data", message: "Sales: 4,230 orders with 20% coupon" },
            {
              type: "data",
              message: "Product: Segmented by category and price tier",
            },
            {
              type: "output",
              message: "Analyzed 8 cohorts across demographics",
            },
          ],
        },
        {
          step: 5,
          agents: ["user", "sales", "product", "store", "executor"],
          edges: [
            { source: "sales", target: "executor" },
            { source: "product", target: "executor" },
            { source: "store", target: "executor" },
          ],
          description: "Executor calculates uplift per cohort",
          activeTools: [{ agent: "executor", tools: ["SQL Combiner"] }],
          logs: [
            { type: "process", message: "Computing uplift rates by cohort..." },
            {
              type: "output",
              message: "Top cohort: Age 25-34, Urban, +47% uplift",
            },
          ],
        },
        {
          step: 6,
          agents: ["user", "executor", "compiler"],
          edges: [
            { source: "executor", target: "compiler" },
            { source: "compiler", target: "user" },
          ],
          description: "Compiler generates cohort uplift report",
          activeTools: [{ agent: "compiler", tools: ["Chart Generator"] }],
          logs: [
            {
              type: "output",
              message:
                "Report: Cohort uplift ranking with targeting recommendations",
            },
          ],
        },
      ],
    },
    {
      id: "q9",
      question: "Which SKUs/channels will have high returns next month?",
      description: "Return risk prediction model",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User asks about return risk prediction",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message: "Query: Predict high returns by SKU and channel",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description: "Query Splitter identifies return risk factors",
          activeTools: [{ agent: "splitter", tools: ["Query Decomposition"] }],
          logs: [
            {
              type: "data",
              message:
                "Risk factors: Historical returns, Product attributes, Vendor quality",
            },
          ],
        },
        {
          step: 3,
          agents: ["user", "splitter", "knowledge", "orchestrator"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
            { source: "splitter", target: "orchestrator" },
            { source: "knowledge", target: "orchestrator" },
          ],
          description:
            "Knowledge provides return-risk logic, Orchestrator plans query",
          activeTools: [
            { agent: "knowledge", tools: ["Formula Repository"] },
            { agent: "orchestrator", tools: ["Workflow Planner"] },
          ],
          logs: [
            {
              type: "data",
              message: "Return risk: >15% return rate = high risk",
            },
          ],
        },
        {
          step: 4,
          agents: ["user", "orchestrator", "sales", "product", "vendor"],
          edges: [
            { source: "orchestrator", target: "sales" },
            { source: "orchestrator", target: "product" },
            { source: "orchestrator", target: "vendor" },
          ],
          description:
            "Agents gather returns history, product attributes, and vendor quality",
          activeTools: [
            { agent: "sales", tools: ["Returns"] },
            { agent: "product", tools: ["Product Attribute Summary"] },
            { agent: "vendor", tools: ["Vendor Scorecard"] },
          ],
          logs: [
            { type: "data", message: "Sales: 90-day return data for all SKUs" },
            {
              type: "data",
              message: "Product: Size/fit attributes linked to returns",
            },
            {
              type: "data",
              message: "Vendor: Defect rates and quality scores",
            },
          ],
        },
        {
          step: 5,
          agents: ["user", "sales", "product", "vendor", "executor"],
          edges: [
            { source: "sales", target: "executor" },
            { source: "product", target: "executor" },
            { source: "vendor", target: "executor" },
          ],
          description: "Executor predicts high-risk SKUs and channels",
          activeTools: [
            { agent: "executor", tools: ["SQL Combiner", "Rule Applicator"] },
          ],
          logs: [
            { type: "process", message: "Computing return risk scores..." },
            {
              type: "output",
              message: "High risk: 67 SKUs, primarily in online channels",
            },
          ],
        },
        {
          step: 6,
          agents: ["user", "executor", "compiler"],
          edges: [
            { source: "executor", target: "compiler" },
            { source: "compiler", target: "user" },
          ],
          description: "Compiler generates return risk forecast",
          activeTools: [{ agent: "compiler", tools: ["Table Generator"] }],
          logs: [
            {
              type: "output",
              message: "Report: High-risk SKUs with mitigation strategies",
            },
          ],
        },
      ],
    },
    {
      id: "q10",
      question: "Lead-time drift — who's slipping?",
      description: "Vendor lead-time performance analysis",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User asks about vendor lead-time drift",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message: "Query: Identify vendors with lead-time drift",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description:
            "Query Splitter identifies lead-time analysis components",
          activeTools: [{ agent: "splitter", tools: ["Query Decomposition"] }],
          logs: [
            {
              type: "data",
              message:
                "Components: Promised lead-time, Actual lead-time, Variance",
            },
          ],
        },
        {
          step: 3,
          agents: ["user", "splitter", "knowledge", "orchestrator"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
            { source: "splitter", target: "orchestrator" },
            { source: "knowledge", target: "orchestrator" },
          ],
          description:
            "Knowledge provides lead-time definition, Orchestrator routes to agents",
          activeTools: [
            { agent: "knowledge", tools: ["Business Logic"] },
            { agent: "orchestrator", tools: ["Workflow Planner"] },
          ],
          logs: [
            {
              type: "data",
              message: "Lead-time drift: Actual > Promised by >10% = slipping",
            },
          ],
        },
        {
          step: 4,
          agents: ["user", "orchestrator", "vendor", "inventory"],
          edges: [
            { source: "orchestrator", target: "vendor" },
            { source: "orchestrator", target: "inventory" },
          ],
          description:
            "Vendor and Inventory agents gather lead-time and receipt data",
          activeTools: [
            { agent: "vendor", tools: ["Lead-Time Drift", "Vendor Scorecard"] },
            { agent: "inventory", tools: ["Stock Movement"] },
          ],
          logs: [
            {
              type: "data",
              message: "Vendor: Lead-time data for 45 active vendors",
            },
            {
              type: "data",
              message: "Inventory: Inbound receipts with timestamps",
            },
            {
              type: "output",
              message: "Found 8 vendors with significant drift",
            },
          ],
        },
        {
          step: 5,
          agents: ["user", "vendor", "inventory", "executor"],
          edges: [
            { source: "vendor", target: "executor" },
            { source: "inventory", target: "executor" },
          ],
          description: "Executor calculates lead-time variance per vendor",
          activeTools: [{ agent: "executor", tools: ["SQL Combiner"] }],
          logs: [
            { type: "process", message: "Computing lead-time variances..." },
            {
              type: "output",
              message: "Worst drift: Vendor XYZ +18 days (45% over promise)",
            },
          ],
        },
        {
          step: 6,
          agents: ["user", "executor", "compiler"],
          edges: [
            { source: "executor", target: "compiler" },
            { source: "compiler", target: "user" },
          ],
          description: "Compiler generates vendor performance report",
          activeTools: [{ agent: "compiler", tools: ["Table Generator"] }],
          logs: [
            {
              type: "output",
              message: "Report: Vendor lead-time scorecard with action items",
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    if (!selectedQuestion || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = svgRef.current.clientWidth || 1000;
    const height = svgRef.current.clientHeight || 680;

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead-active")
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("refX", 8)
      .attr("refY", 3)
      .attr("orient", "auto")
      .append("polygon")
      .attr("points", "0 0, 10 3, 0 6")
      .attr("fill", "#6366F1");

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead-inactive")
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("refX", 8)
      .attr("refY", 3)
      .attr("orient", "auto")
      .append("polygon")
      .attr("points", "0 0, 10 3, 0 6")
      .attr("fill", "#CBD5E1");

    let activeAgentIds = [];
    let activeEdgesList = [];
    let activeToolsData = [];

    if (
      selectedQuestion &&
      selectedQuestion.traversal &&
      selectedQuestion.traversal[currentStep]
    ) {
      const stepData = selectedQuestion.traversal[currentStep];
      activeAgentIds = stepData.agents;
      activeEdgesList = stepData.edges;
      activeToolsData = stepData.activeTools || [];
    }

    // Draw connections
    svg
      .append("g")
      .selectAll(".edge")
      .data(allConnections)
      .enter()
      .append("path")
      .attr("class", "edge")
      .attr("d", (d) => {
        const sourceAgent = allAgents.find((a) => a.id === d.source);
        const targetAgent = allAgents.find((a) => a.id === d.target);
        if (!sourceAgent || !targetAgent) return "";

        const source = sourceAgent.position;
        const target = targetAgent.position;

        return `M ${source.x},${source.y} Q ${(source.x + target.x) / 2},${
          (source.y + target.y) / 2 - 30
        } ${target.x},${target.y}`;
      })
      .attr("fill", "none")
      .attr("stroke", (d) => {
        const isActive = activeEdgesList.some(
          (edge) => edge.source === d.source && edge.target === d.target
        );
        return isActive ? "#6366F1" : "#CBD5E1";
      })
      .attr("stroke-width", (d) => {
        const isActive = activeEdgesList.some(
          (edge) => edge.source === d.source && edge.target === d.target
        );
        return isActive ? 3 : 1.5;
      })
      .attr("opacity", (d) => {
        if (!selectedQuestion) return 0.15;
        const isActive = activeEdgesList.some(
          (edge) => edge.source === d.source && edge.target === d.target
        );
        return isActive ? 0.8 : 0.1;
      })
      .attr("marker-end", (d) => {
        const isActive = activeEdgesList.some(
          (edge) => edge.source === d.source && edge.target === d.target
        );
        return isActive ? "url(#arrowhead-active)" : "url(#arrowhead-inactive)";
      });

    // Create tool nodes for active agents
    const toolNodes = [];
    activeToolsData.forEach((agentTools) => {
      const agent = allAgents.find((a) => a.id === agentTools.agent);
      if (agent && agentTools.tools) {
        const numTools = agentTools.tools.length;
        const radius = 45;
        const angleStep = (Math.PI * 2) / numTools;

        agentTools.tools.forEach((tool, idx) => {
          const angle = idx * angleStep - Math.PI / 2;
          toolNodes.push({
            id: `${agentTools.agent}-tool-${idx}`,
            name: tool,
            parentAgent: agentTools.agent,
            x: agent.position.x + Math.cos(angle) * radius,
            y: agent.position.y + Math.sin(angle) * radius,
            color: agent.color,
          });
        });
      }
    });

    // Draw lines from agents to tools
    svg
      .append("g")
      .selectAll(".tool-edge")
      .data(toolNodes)
      .enter()
      .append("line")
      .attr("class", "tool-edge")
      .attr("x1", (d) => {
        const agent = allAgents.find((a) => a.id === d.parentAgent);
        return agent ? agent.position.x : 0;
      })
      .attr("y1", (d) => {
        const agent = allAgents.find((a) => a.id === d.parentAgent);
        return agent ? agent.position.y : 0;
      })
      .attr("x2", (d) => d.x)
      .attr("y2", (d) => d.y)
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "3,3")
      .attr("opacity", 0.5);

    // Draw tool nodes
    const toolNodeGroups = svg
      .append("g")
      .selectAll(".tool-node")
      .data(toolNodes)
      .enter()
      .append("g")
      .attr("class", "tool-node")
      .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

    toolNodeGroups
      .append("rect")
      .attr("x", -28)
      .attr("y", -7)
      .attr("width", 56)
      .attr("height", 14)
      .attr("rx", 3)
      .attr("fill", (d) => d.color)
      .attr("opacity", 0.9)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);

    toolNodeGroups
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 2.5)
      .style("font-size", "6.5px")
      .style("font-weight", "600")
      .style("fill", "#fff")
      .text((d) => {
        return d.name.length > 12 ? d.name.substring(0, 11) + "..." : d.name;
      })
      .append("title")
      .text((d) => d.name);

    // Draw agent nodes
    const nodes = svg
      .append("g")
      .selectAll(".node")
      .data(allAgents)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.position.x}, ${d.position.y})`);

    nodes
      .append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => {
        if (!selectedQuestion) return d.color;
        const isActive = activeAgentIds.includes(d.id);
        return isActive ? d.color : "#E2E8F0";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", (d) => {
        if (!selectedQuestion) return 2;
        const isActive = activeAgentIds.includes(d.id);
        return isActive ? 3 : 2;
      })
      .attr("opacity", (d) => {
        if (!selectedQuestion) return 0.7;
        const isActive = activeAgentIds.includes(d.id);
        return isActive ? 1 : 0.25;
      })
      .style("filter", (d) => {
        if (!selectedQuestion) return "drop-shadow(0 2px 4px rgba(0,0,0,0.1))";
        const isActive = activeAgentIds.includes(d.id);
        return isActive
          ? "drop-shadow(0 6px 12px rgba(99,102,241,0.3))"
          : "none";
      });

    nodes
      .append("text")
      .attr("dy", (d) => d.size + 12)
      .attr("text-anchor", "middle")
      .style("font-size", "9px")
      .style("font-weight", (d) => {
        if (!selectedQuestion) return "500";
        const isActive = activeAgentIds.includes(d.id);
        return isActive ? "700" : "400";
      })
      .style("fill", (d) => {
        if (!selectedQuestion) return "#334155";
        const isActive = activeAgentIds.includes(d.id);
        return isActive ? "#1E293B" : "#94A3B8";
      })
      .attr("opacity", (d) => {
        if (!selectedQuestion) return 0.8;
        const isActive = activeAgentIds.includes(d.id);
        return isActive ? 1 : 0.4;
      })
      .text((d) => d.name);

    // Add tier labels
    const tierLabels = [
      { tier: 0, label: "Input", y: 40 },
      { tier: 1, label: "Query Processing", y: 130 },
      { tier: 2, label: "Knowledge & Planning", y: 220 },
      { tier: 3, label: "Domain Agents", y: 385 },
      { tier: 4, label: "Execution", y: 550 },
      { tier: 5, label: "Output", y: 640 },
    ];

    svg
      .append("g")
      .selectAll(".tier-label")
      .data(tierLabels)
      .enter()
      .append("text")
      .attr("x", 15)
      .attr("y", (d) => d.y)
      .attr("text-anchor", "start")
      .style("font-size", "9px")
      .style("font-weight", "600")
      .style("fill", "#64748B")
      .style("text-transform", "uppercase")
      .style("letter-spacing", "0.5px")
      .text((d) => d.label);
  }, [selectedQuestion, currentStep]);

  useEffect(() => {
    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, []);

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setCurrentStep(0);
    setIsPlaying(false);
    setEditingStep(false);
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
      playIntervalRef.current = null;
    }
  };

  const handleNextStep = () => {
    if (
      selectedQuestion &&
      selectedQuestion.traversal &&
      currentStep < selectedQuestion.traversal.length - 1
    ) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playIntervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= selectedQuestion.traversal.length - 1) {
            if (playIntervalRef.current) {
              clearInterval(playIntervalRef.current);
              playIntervalRef.current = null;
            }
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
  };

  const handleEditStep = () => {
    if (selectedQuestion && selectedQuestion.traversal[currentStep]) {
      setEditStepDescription(
        selectedQuestion.traversal[currentStep].description
      );
      setEditingStep(true);
    }
  };

  const handleSaveStep = () => {
    if (selectedQuestion && selectedQuestion.traversal[currentStep]) {
      selectedQuestion.traversal[currentStep].description = editStepDescription;
      setEditingStep(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingStep(false);
    setEditStepDescription("");
  };

  const getLogIcon = (type) => {
    switch (type) {
      case "input":
        return "📥";
      case "process":
        return "⚙️";
      case "data":
        return "📊";
      case "output":
        return "📤";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white border-b border-gray-200 shadow-sm flex justify-between items-center">
        <div className="px-6 py-4 flex-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            The Multi Agentic Network for the questions
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            This is the list of agents and how they will interact with the data.
          </p>
        </div>
        <Link
          className="ml-5 mb-4 w-52"
          href={"/workspace/dashboard-customisation"}
        >
          <button
            type="button"
            className={`w-[90%] py-2 rounded-xl font-semibold text-lg transition-all bg-teal-700
                    hover:bg-teal-800
                    text-white
                    hover:shadow-lg
                    cursor-pointer`}
          >
            Continue
          </button>
        </Link>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto shadow-lg">
          <div className="p-4">
            <div className="space-y-2">
              {questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionSelect(q)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedQuestion?.id === q.id
                      ? "border-indigo-500 bg-indigo-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50"
                  }`}
                >
                  <p
                    className={`text-xs font-medium leading-relaxed ${
                      selectedQuestion?.id === q.id
                        ? "text-indigo-900"
                        : "text-gray-700"
                    }`}
                  >
                    {q.question}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1.5">
                    {q.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-gray-400">
                      {q.traversal?.length || 0} steps
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedQuestion ? (
            <>
              <div className="p-4 bg-white border-b border-gray-200">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-800">
                      Step {currentStep + 1} of{" "}
                      {selectedQuestion.traversal.length}
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevStep}
                        disabled={currentStep === 0}
                        className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-gray-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={handlePlayPause}
                        className="p-1 rounded hover:bg-gray-200 transition-colors"
                      >
                        {isPlaying ? (
                          <svg
                            className="w-4 h-4 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={handleNextStep}
                        disabled={
                          !selectedQuestion.traversal ||
                          currentStep >= selectedQuestion.traversal.length - 1
                        }
                        className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      >
                        <svg
                          className="w-4 h-4 text-gray-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={handleEditStep}
                        className="ml-2 px-2.5 py-1 text-[10px] font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  {editingStep ? (
                    <div className="space-y-2">
                      <textarea
                        value={editStepDescription}
                        onChange={(e) => setEditStepDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-xs resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveStep}
                          className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 bg-gray-200 text-gray-700 text-[10px] font-medium rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {selectedQuestion.traversal[currentStep]?.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-1 p-4 overflow-auto">
                <div className="bg-white rounded-2xl shadow-lg h-full min-h-screen flex items-center justify-center p-6">
                  <svg ref={svgRef} className="w-full h-screen"></svg>
                </div>
              </div>
              {selectedQuestion &&
                selectedQuestion.traversal &&
                selectedQuestion.traversal[currentStep]?.logs && (
                  <div className="h-44 bg-gray-900 mx-4 border-t border-gray-700 overflow-y-auto rounded-t-2xl">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[10px] font-semibold text-gray-200 flex items-center gap-1.5">
                          <span className="text-sm">📋</span>
                          Execution Logs & Data Flow
                        </h3>
                        <span className="text-[9px] text-gray-400">
                          Step {currentStep + 1}/
                          {selectedQuestion.traversal.length}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {selectedQuestion.traversal[currentStep].logs.map(
                          (log, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 p-2 rounded-lg bg-gray-800/60 border border-gray-700/50"
                            >
                              <span className="text-xs mt-0.5">
                                {getLogIcon(log.type)}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                                      log.type === "output"
                                        ? "bg-green-600 text-white"
                                        : log.type === "data"
                                        ? "bg-blue-600 text-white"
                                        : log.type === "process"
                                        ? "bg-yellow-600 text-white"
                                        : "bg-gray-600 text-white"
                                    }`}
                                  >
                                    {log.type.toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-[10px] text-gray-200 leading-relaxed">
                                  {log.message}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center max-w-2xl">
                <svg
                  className="w-20 h-20 mx-auto mb-5 opacity-40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Multi-Agent Architecture
                </p>
                <p className="text-xs text-gray-600 mb-4">
                  Select a question to visualize the complete agent workflow
                  with integrated tools and data flow.
                </p>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-left">
                  <p className="text-[10px] font-semibold text-indigo-900 mb-1.5">
                    Architecture Layers:
                  </p>
                  <ul className="text-[10px] text-indigo-800 space-y-0.5">
                    <li>
                      • <strong>Query Processing:</strong> Breaks down complex
                      questions
                    </li>
                    <li>
                      • <strong>Knowledge & Planning:</strong> Retrieves
                      business logic and plans workflows
                    </li>
                    <li>
                      • <strong>Domain Agents:</strong> Specialized agents
                      execute in parallel
                    </li>
                    <li>
                      • <strong>Execution:</strong> Combines results and applies
                      business rules
                    </li>
                    <li>
                      • <strong>Output:</strong> Generates final reports
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentTraversalVisualization;

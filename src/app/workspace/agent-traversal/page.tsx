"use client";
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Link from "next/link";

// Type definitions
interface Position {
  x: number;
  y: number;
}

interface Agent {
  id: string;
  name: string;
  size: number;
  color: string;
  tier: number;
  position: Position;
}

interface Connection {
  source: string;
  target: string;
}

interface ActiveTool {
  agent: string;
  tools: string[];
}

interface Log {
  type: "input" | "output" | "data" | "process";
  message: string;
}

interface TraversalStep {
  step: number;
  agents: string[];
  edges: Connection[];
  description: string;
  activeTools: ActiveTool[];
  logs: Log[];
}

interface Question {
  id: string;
  question: string;
  description: string;
  traversal: TraversalStep[];
}

const AgentTraversalVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [editingStep, setEditingStep] = useState<boolean>(false);
  const [editStepDescription, setEditStepDescription] = useState<string>("");
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Complete agent architecture with better spacing
  const allAgents: Agent[] = [
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

  const allConnections: Connection[] = [
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

  const questions: Question[] = [
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
              type: "process",
              message: "Parallel execution completed in 2.3s",
            },
          ],
        },
        {
          step: 6,
          agents: [
            "user",
            "splitter",
            "knowledge",
            "orchestrator",
            "inventory",
            "sales",
            "basestock",
            "executor",
          ],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "inventory", target: "executor" },
            { source: "sales", target: "executor" },
            { source: "basestock", target: "executor" },
          ],
          description:
            "Executor applies forecast formulas to calculate stockout predictions",
          activeTools: [
            { agent: "executor", tools: ["Formula Engine", "Business Rules"] },
          ],
          logs: [
            {
              type: "process",
              message: "Applying Days to Stockout formula...",
            },
            {
              type: "data",
              message:
                "Calculated: 324 SKUs at risk (7-day), 587 SKUs at risk (14-day)",
            },
            {
              type: "data",
              message:
                "Critical stores: Store #42 (89 SKUs), Store #17 (67 SKUs)",
            },
          ],
        },
        {
          step: 7,
          agents: ["user", "splitter", "orchestrator", "executor", "compiler"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "executor", target: "compiler" },
          ],
          description:
            "Response Compiler formats results and generates final report",
          activeTools: [
            {
              agent: "compiler",
              tools: ["Report Generator", "Visualization Builder"],
            },
          ],
          logs: [
            { type: "process", message: "Generating stockout report..." },
            {
              type: "data",
              message:
                "Report includes: SKU breakdown, Store ranking, Timeline chart",
            },
            {
              type: "output",
              message:
                'Report ready: "Stockout Risk Analysis - 7 & 14 Day Forecast"',
            },
          ],
        },
        {
          step: 8,
          agents: ["user", "compiler"],
          edges: [{ source: "compiler", target: "user" }],
          description:
            "Final report delivered to user with actionable insights",
          activeTools: [{ agent: "compiler", tools: ["Output Formatter"] }],
          logs: [
            { type: "output", message: "Response delivered to user" },
            {
              type: "data",
              message:
                "Format: Interactive dashboard with drill-down capability",
            },
            {
              type: "data",
              message:
                "Execution time: 4.7s | Agents used: 6 | Data points: 1,247",
            },
          ],
        },
      ],
    },
    {
      id: "q2",
      question: "What are the top 10 SKUs by revenue in Q3?",
      description: "Revenue aggregation and ranking query",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User submits revenue ranking query",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message:
                'Query received: "What are the top 10 SKUs by revenue in Q3?"',
            },
            {
              type: "data",
              message:
                "User context: Category Manager, Department: Electronics",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description:
            "Query Splitter identifies revenue and time period requirements",
          activeTools: [
            {
              agent: "splitter",
              tools: ["Query Decomposition", "Entity Extraction"],
            },
          ],
          logs: [
            { type: "process", message: "Parsing query components..." },
            { type: "data", message: "Entities: [top 10, SKUs, revenue, Q3]" },
            {
              type: "data",
              message: "Required data: Sales records, Q3 time filter",
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
          description: "Domain Knowledge provides revenue calculation logic",
          activeTools: [
            {
              agent: "knowledge",
              tools: ["KPI Definitions", "Business Glossary"],
            },
          ],
          logs: [
            {
              type: "process",
              message: "Retrieving revenue KPI definition...",
            },
            {
              type: "data",
              message:
                "Formula: Revenue = Units Sold × Price (after discounts)",
            },
            {
              type: "data",
              message: "Time Period: Q3 = July 1 - September 30",
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
          description: "Orchestrator plans data retrieval strategy",
          activeTools: [
            { agent: "orchestrator", tools: ["Execution Planner"] },
          ],
          logs: [
            { type: "process", message: "Building execution plan..." },
            {
              type: "data",
              message: "Agents required: Sales, Product, Pricing",
            },
            {
              type: "data",
              message: "Aggregation: Sum revenue by SKU, then rank",
            },
          ],
        },
        {
          step: 5,
          agents: [
            "user",
            "splitter",
            "orchestrator",
            "sales",
            "product",
            "pricing",
          ],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "orchestrator", target: "sales" },
            { source: "orchestrator", target: "product" },
            { source: "orchestrator", target: "pricing" },
          ],
          description:
            "Domain agents collect sales, product details, and pricing data",
          activeTools: [
            { agent: "sales", tools: ["Transaction Data", "Q3 Filter"] },
            { agent: "product", tools: ["SKU Catalog"] },
            { agent: "pricing", tools: ["Price History", "Discount Tracker"] },
          ],
          logs: [
            { type: "data", message: "Sales: Retrieved 2.4M Q3 transactions" },
            { type: "data", message: "Product: Loaded 15,430 active SKUs" },
            { type: "data", message: "Pricing: Applied discount adjustments" },
            { type: "process", message: "Data collection completed in 1.8s" },
          ],
        },
        {
          step: 6,
          agents: [
            "user",
            "splitter",
            "orchestrator",
            "sales",
            "product",
            "pricing",
            "executor",
          ],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "sales", target: "executor" },
            { source: "product", target: "executor" },
            { source: "pricing", target: "executor" },
          ],
          description: "Executor aggregates revenue and ranks SKUs",
          activeTools: [
            {
              agent: "executor",
              tools: ["Aggregation Engine", "Ranking Algorithm"],
            },
          ],
          logs: [
            {
              type: "process",
              message: "Calculating total revenue per SKU...",
            },
            { type: "data", message: "Revenue calculated for 15,430 SKUs" },
            { type: "data", message: "Top SKU: #A8472 with $1.2M revenue" },
            { type: "process", message: "Ranking complete: Top 10 identified" },
          ],
        },
        {
          step: 7,
          agents: ["user", "splitter", "orchestrator", "executor", "compiler"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "executor", target: "compiler" },
          ],
          description: "Response Compiler formats top 10 results",
          activeTools: [
            { agent: "compiler", tools: ["Table Generator", "Chart Builder"] },
          ],
          logs: [
            { type: "process", message: "Formatting top 10 SKU list..." },
            {
              type: "data",
              message: "Including: SKU name, Q3 revenue, units sold, growth %",
            },
            {
              type: "output",
              message: 'Report ready: "Top 10 SKUs by Q3 Revenue"',
            },
          ],
        },
        {
          step: 8,
          agents: ["user", "compiler"],
          edges: [{ source: "compiler", target: "user" }],
          description: "Top 10 revenue ranking delivered to user",
          activeTools: [{ agent: "compiler", tools: ["Output Formatter"] }],
          logs: [
            { type: "output", message: "Response delivered to user" },
            {
              type: "data",
              message: "Format: Ranked table with revenue chart",
            },
            {
              type: "data",
              message: "Execution time: 3.2s | Total Q3 revenue: $45.7M",
            },
          ],
        },
      ],
    },
    {
      id: "q3",
      question: "Which vendors have the highest return rates?",
      description: "Vendor performance analysis based on returns",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User submits vendor return rate query",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message:
                'Query received: "Which vendors have the highest return rates?"',
            },
            {
              type: "data",
              message: "User context: Quality Manager, Focus: Supply Chain",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description: "Query Splitter breaks down vendor and return metrics",
          activeTools: [{ agent: "splitter", tools: ["Query Analyzer"] }],
          logs: [
            { type: "process", message: "Identifying query requirements..." },
            { type: "data", message: "Entities: [vendors, return rates]" },
            {
              type: "data",
              message: "Metrics needed: Total sales, Total returns, Return %",
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
          description: "Knowledge agent defines return rate formula",
          activeTools: [{ agent: "knowledge", tools: ["KPI Repository"] }],
          logs: [
            { type: "process", message: "Loading return rate definition..." },
            {
              type: "data",
              message:
                "Formula: Return Rate = (Returns / Total Units Sold) × 100%",
            },
            {
              type: "data",
              message: "Benchmark: Industry avg return rate is 8-12%",
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
            "Orchestrator coordinates vendor and sales data retrieval",
          activeTools: [{ agent: "orchestrator", tools: ["Workflow Builder"] }],
          logs: [
            { type: "process", message: "Planning data collection..." },
            { type: "data", message: "Agents needed: Vendor, Sales, Product" },
            { type: "data", message: "Join keys: vendor_id, product_id" },
          ],
        },
        {
          step: 5,
          agents: [
            "user",
            "splitter",
            "orchestrator",
            "vendor",
            "sales",
            "product",
          ],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "orchestrator", target: "vendor" },
            { source: "orchestrator", target: "sales" },
            { source: "orchestrator", target: "product" },
          ],
          description: "Domain agents gather vendor, sales, and return data",
          activeTools: [
            { agent: "vendor", tools: ["Vendor Catalog"] },
            { agent: "sales", tools: ["Sales & Returns Data"] },
            { agent: "product", tools: ["Vendor Mapping"] },
          ],
          logs: [
            { type: "data", message: "Vendor: Retrieved 342 active vendors" },
            {
              type: "data",
              message:
                "Sales: Loaded 890K transactions, 72K returns (last 12 months)",
            },
            { type: "data", message: "Product: Mapped SKUs to vendors" },
            { type: "process", message: "Data joined successfully" },
          ],
        },
        {
          step: 6,
          agents: [
            "user",
            "splitter",
            "orchestrator",
            "vendor",
            "sales",
            "product",
            "executor",
          ],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "vendor", target: "executor" },
            { source: "sales", target: "executor" },
            { source: "product", target: "executor" },
          ],
          description: "Executor calculates return rates by vendor",
          activeTools: [{ agent: "executor", tools: ["Calculation Engine"] }],
          logs: [
            { type: "process", message: "Computing return rate per vendor..." },
            {
              type: "data",
              message: "Highest: VendorCo (18.3%), TechSupply (15.7%)",
            },
            {
              type: "data",
              message: "Lowest: QualityParts (2.1%), PremiumGoods (3.4%)",
            },
            {
              type: "data",
              message: "Overall avg: 9.2% (within industry benchmark)",
            },
          ],
        },
        {
          step: 7,
          agents: ["user", "splitter", "orchestrator", "executor", "compiler"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "executor", target: "compiler" },
          ],
          description: "Compiler generates vendor performance report",
          activeTools: [{ agent: "compiler", tools: ["Report Builder"] }],
          logs: [
            {
              type: "process",
              message: "Creating vendor return rate report...",
            },
            {
              type: "data",
              message: "Sorted vendors by return rate (highest first)",
            },
            {
              type: "output",
              message: 'Report ready: "Vendor Return Rate Analysis"',
            },
          ],
        },
        {
          step: 8,
          agents: ["user", "compiler"],
          edges: [{ source: "compiler", target: "user" }],
          description:
            "Vendor analysis delivered with actionable recommendations",
          activeTools: [{ agent: "compiler", tools: ["Output Formatter"] }],
          logs: [
            { type: "output", message: "Response delivered to user" },
            {
              type: "data",
              message:
                "Includes: Vendor rankings, return reasons, quality flags",
            },
            {
              type: "data",
              message: "Recommendation: Review contracts with top 5 vendors",
            },
          ],
        },
      ],
    },
    {
      id: "q4",
      question:
        "Show me the lineage of how our total revenue KPI is calculated",
      description: "Data lineage and KPI dependency visualization",
      traversal: [
        {
          step: 1,
          agents: ["user"],
          edges: [],
          description: "User requests KPI lineage information",
          activeTools: [{ agent: "user", tools: ["Natural Language Input"] }],
          logs: [
            {
              type: "input",
              message:
                'Query received: "Show me the lineage of how our total revenue KPI is calculated"',
            },
            {
              type: "data",
              message: "User context: Data Analyst, Department: Analytics",
            },
          ],
        },
        {
          step: 2,
          agents: ["user", "splitter"],
          edges: [{ source: "user", target: "splitter" }],
          description: "Query Splitter identifies lineage tracking request",
          activeTools: [{ agent: "splitter", tools: ["Intent Classifier"] }],
          logs: [
            { type: "process", message: "Analyzing query intent..." },
            { type: "data", message: "Intent: Data lineage request" },
            { type: "data", message: "Target: total revenue KPI" },
          ],
        },
        {
          step: 3,
          agents: ["user", "splitter", "knowledge"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "knowledge" },
          ],
          description: "Knowledge agent retrieves revenue KPI definition",
          activeTools: [{ agent: "knowledge", tools: ["KPI Catalog"] }],
          logs: [
            { type: "process", message: "Looking up revenue KPI..." },
            { type: "data", message: "KPI: Total Revenue (ID: KPI_001)" },
            {
              type: "data",
              message:
                "Formula: SUM(unit_price × quantity × (1 - discount_rate))",
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
          description: "Orchestrator routes to lineage tracking specialist",
          activeTools: [{ agent: "orchestrator", tools: ["Agent Router"] }],
          logs: [
            { type: "process", message: "Routing to lineage agent..." },
            { type: "data", message: "Specialized agent: Lineage Tracker" },
          ],
        },
        {
          step: 5,
          agents: ["user", "splitter", "orchestrator", "lineage", "kpi"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "orchestrator", target: "lineage" },
            { source: "orchestrator", target: "kpi" },
          ],
          description: "Lineage and KPI agents trace data dependencies",
          activeTools: [
            {
              agent: "lineage",
              tools: ["Dependency Tracer", "Column Lineage"],
            },
            { agent: "kpi", tools: ["Formula Parser"] },
          ],
          logs: [
            {
              type: "process",
              message: "Tracing data lineage for revenue KPI...",
            },
            {
              type: "data",
              message:
                "Source tables: sales_transactions, pricing_master, discount_rules",
            },
            {
              type: "data",
              message: "Upstream dependencies: 3 tables, 7 columns",
            },
            {
              type: "data",
              message: "Transformation steps: 2 joins, 1 aggregation",
            },
          ],
        },
        {
          step: 6,
          agents: [
            "user",
            "splitter",
            "orchestrator",
            "lineage",
            "kpi",
            "executor",
          ],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "lineage", target: "executor" },
            { source: "kpi", target: "executor" },
          ],
          description: "Executor builds lineage graph structure",
          activeTools: [{ agent: "executor", tools: ["Graph Builder"] }],
          logs: [
            { type: "process", message: "Building lineage graph..." },
            {
              type: "data",
              message: "Nodes: 11 (3 source tables, 7 columns, 1 KPI)",
            },
            {
              type: "data",
              message: "Edges: 10 (showing data flow relationships)",
            },
          ],
        },
        {
          step: 7,
          agents: ["user", "splitter", "orchestrator", "executor", "compiler"],
          edges: [
            { source: "user", target: "splitter" },
            { source: "splitter", target: "orchestrator" },
            { source: "executor", target: "compiler" },
          ],
          description: "Compiler creates interactive lineage visualization",
          activeTools: [
            {
              agent: "compiler",
              tools: ["Lineage Visualizer", "DAG Generator"],
            },
          ],
          logs: [
            { type: "process", message: "Generating lineage diagram..." },
            {
              type: "data",
              message: "Format: Interactive DAG with drill-down",
            },
            {
              type: "output",
              message:
                'Lineage diagram ready: "Total Revenue KPI - Data Lineage"',
            },
          ],
        },
        {
          step: 8,
          agents: ["user", "compiler"],
          edges: [{ source: "compiler", target: "user" }],
          description: "Interactive lineage graph delivered to user",
          activeTools: [{ agent: "compiler", tools: ["Output Formatter"] }],
          logs: [
            { type: "output", message: "Lineage visualization delivered" },
            {
              type: "data",
              message: "Shows: Source tables → Transformations → KPI",
            },
            {
              type: "data",
              message: "User can click nodes for detailed metadata",
            },
          ],
        },
      ],
    },
  ];

  const getLogIcon = (type: string): string => {
    switch (type) {
      case "input":
        return "📥";
      case "output":
        return "📤";
      case "data":
        return "📊";
      case "process":
        return "⚙️";
      default:
        return "•";
    }
  };

  useEffect(() => {
    if (!selectedQuestion || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const container = svg.node()?.parentElement;
    if (!container) return;

    const width = container.clientWidth - 40;
    const height = container.clientHeight - 40;

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(20, 20)");

    const currentStepData = selectedQuestion.traversal[currentStep];

    const activeAgentIds = new Set(currentStepData.agents);
    const activeEdges = currentStepData.edges;

    const visibleAgents = allAgents.filter((a) => activeAgentIds.has(a.id));

    g.selectAll("line.edge")
      .data(activeEdges)
      .join("line")
      .attr("class", "edge")
      .attr("x1", (d) => {
        const agent = allAgents.find((a) => a.id === d.source);
        return agent ? agent.position.x : 0;
      })
      .attr("y1", (d) => {
        const agent = allAgents.find((a) => a.id === d.source);
        return agent ? agent.position.y : 0;
      })
      .attr("x2", (d) => {
        const agent = allAgents.find((a) => a.id === d.target);
        return agent ? agent.position.x : 0;
      })
      .attr("y2", (d) => {
        const agent = allAgents.find((a) => a.id === d.target);
        return agent ? agent.position.y : 0;
      })
      .attr("stroke", "#CBD5E1")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("opacity", 0)
      .transition()
      .duration(400)
      .attr("opacity", 0.6);

    const nodes = g
      .selectAll("g.node")
      .data(visibleAgents)
      .join("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.position.x}, ${d.position.y})`)
      .style("cursor", "pointer")
      .attr("opacity", 0)
      .transition()
      .duration(400)
      .attr("opacity", 1);

    nodes.each(function (d) {
      const node = d3.select(this);

      node
        .append("circle")
        .attr("r", d.size * 1)
        .attr("fill", d.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .attr("filter", "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))");

      node
        .append("text")
        .attr("y", d.size * 1 + 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#1F2937")
        .attr("font-size", "11px")
        .attr("font-weight", "600")
        .text(d.name);

      const tools = currentStepData.activeTools.find((t) => t.agent === d.id);
      if (tools && tools.tools.length > 0) {
        node
          .append("text")
          .attr("y", d.size * 1 + 35)
          .attr("text-anchor", "middle")
          .attr("fill", "#6B7280")
          .attr("font-size", "9px")
          .text(`🔧 ${tools.tools.join(", ")}`);
      }
    });
  }, [selectedQuestion, currentStep]);

  const handleQuestionSelect = (question: Question): void => {
    setSelectedQuestion(question);
    setCurrentStep(0);
    setIsPlaying(false);
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }
  };

  const handleNextStep = (): void => {
    if (
      selectedQuestion &&
      currentStep < selectedQuestion.traversal.length - 1
    ) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = (): void => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePlayPause = (): void => {
    if (!selectedQuestion) return;

    if (isPlaying) {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playIntervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (
            selectedQuestion &&
            prev >= selectedQuestion.traversal.length - 1
          ) {
            if (playIntervalRef.current) {
              clearInterval(playIntervalRef.current);
            }
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
  };

  const handleEditStep = (): void => {
    if (selectedQuestion && selectedQuestion.traversal[currentStep]) {
      setEditStepDescription(
        selectedQuestion.traversal[currentStep].description
      );
      setEditingStep(true);
    }
  };

  const handleSaveStep = (): void => {
    if (selectedQuestion) {
      const updatedQuestion: Question = {
        ...selectedQuestion,
        traversal: selectedQuestion.traversal.map((step, idx) =>
          idx === currentStep
            ? { ...step, description: editStepDescription }
            : step
        ),
      };
      setSelectedQuestion(updatedQuestion);
      setEditingStep(false);
    }
  };

  const handleCancelEdit = (): void => {
    setEditingStep(false);
    setEditStepDescription("");
  };

  useEffect(() => {
    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-3xl">🤖</span>
                Multi-Agent Query System
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Visualize intelligent agent collaboration and workflow execution
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                {questions.length} Scenarios
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                {allAgents.length} Agents
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden ">
        <div className="relative w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💬</span>
              Query Examples
            </h2>
            <div className="space-y-3">
              {questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestionSelect(q)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    selectedQuestion?.id === q.id
                      ? "bg-indigo-50 border-2 border-indigo-400 shadow-md"
                      : "bg-gray-50 border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold mb-2 ${
                      selectedQuestion?.id === q.id
                        ? "text-indigo-900"
                        : "text-gray-900"
                    }`}
                  >
                    {q.question}
                  </p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">
                    {q.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] text-gray-500">
                      {q.traversal.length} steps
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <Link
            className="ml-5 mb-4"
            href={"/workspace/dashboard-customisation"}
          >
            <button
              type="button"
              className={`w-[90%] absolute bottom-4 py-4 rounded-xl font-semibold text-lg transition-all bg-teal-700
            hover:bg-teal-800
            text-white
            hover:shadow-lg
            cursor-pointer`}
            >
              Continue
            </button>
          </Link>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedQuestion ? (
            <>
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold text-indigo-900 flex items-center gap-2">
                      <span className="text-base">📍</span>
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
                  <svg
                    ref={svgRef}
                    className="w-full h-full overflow-auto min-h-screen"
                  ></svg>
                </div>
              </div>
              {selectedQuestion &&
                selectedQuestion.traversal[currentStep]?.logs && (
                  <div className="h-44 bg-gray-900 border-t border-gray-700 overflow-y-auto mx-4 rounded-t-2xl">
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

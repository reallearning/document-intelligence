/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Brain,
  Package,
  Store,
  TrendingUp,
  Calculator,
  FileText,
  Settings,
} from "lucide-react";

// Types
type NodeType = "knowledge" | "orchestrator" | "agent" | "tool";

type Node = {
  id: string;
  name: string;
  x: number;
  y: number;
  type: NodeType;
  color: string;
  parent?: string;
  icon?: any;
};

type Step = {
  description: string;
  activeAgents?: string[];
  activeTools?: string[];
  connections?: { from: string; to: string }[];
  log?: string;
};

type Question = {
  id: string;
  question: string;
  category: string;
  steps: Step[];
  finalOutput: string;
  exampleOutput: Record<string, any>;
};

const MultiAgentRetailSystem: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [logs, setLogs] = useState<
    { step: string | number; timestamp: string; message: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [activeConnections, setActiveConnections] = useState<
    { from: string; to: string }[]
  >([]);

  // Nodes
  const domainKnowledgeNode: Node = {
    id: "domain_knowledge",
    name: "Domain Knowledge",
    x: 450,
    y: 50,
    type: "knowledge",
    color: "#8B5CF6",
    icon: Brain,
  };

  const orchestratorNode: Node = {
    id: "orchestrator",
    name: "Orchestrator",
    x: 450,
    y: 150,
    type: "orchestrator",
    color: "#059669",
    icon: Settings,
  };

  const agentNodes: Node[] = [
    {
      id: "inventory_agent",
      name: "Inventory Agent",
      x: 150,
      y: 250,
      type: "agent",
      color: "#DC2626",
      icon: Package,
    },
    {
      id: "product_agent",
      name: "Product Agent",
      x: 300,
      y: 250,
      type: "agent",
      color: "#7C3AED",
      icon: Package,
    },
    {
      id: "store_agent",
      name: "Store Agent",
      x: 450,
      y: 250,
      type: "agent",
      color: "#F59E0B",
      icon: Store,
    },
    {
      id: "basestock_agent",
      name: "Base-Stock Agent",
      x: 600,
      y: 250,
      type: "agent",
      color: "#10B981",
      icon: Calculator,
    },
    {
      id: "sales_agent",
      name: "Sales Agent",
      x: 750,
      y: 250,
      type: "agent",
      color: "#3B82F6",
      icon: TrendingUp,
    },
  ];

  const toolNodes: Node[] = [
    {
      id: "cut_size",
      name: "Cut Size",
      x: 100,
      y: 350,
      type: "tool",
      parent: "inventory_agent",
      color: "#DC2626",
    },
    {
      id: "overstocked",
      name: "Over/Under Stock",
      x: 100,
      y: 390,
      type: "tool",
      parent: "inventory_agent",
      color: "#DC2626",
    },
    {
      id: "out_of_stock",
      name: "Out of Stock",
      x: 100,
      y: 430,
      type: "tool",
      parent: "inventory_agent",
      color: "#DC2626",
    },

    {
      id: "current_stock",
      name: "Current Stock",
      x: 250,
      y: 350,
      type: "tool",
      parent: "inventory_agent",
      color: "#DC2626",
    },
    {
      id: "total_stock",
      name: "Total Stock",
      x: 250,
      y: 390,
      type: "tool",
      parent: "inventory_agent",
      color: "#DC2626",
    },
    {
      id: "stock_movement",
      name: "Stock Movement",
      x: 250,
      y: 430,
      type: "tool",
      parent: "inventory_agent",
      color: "#DC2626",
    },

    {
      id: "store_performance",
      name: "Store Performance",
      x: 400,
      y: 350,
      type: "tool",
      parent: "store_agent",
      color: "#F59E0B",
    },
    {
      id: "capacity_analysis",
      name: "Capacity Analysis",
      x: 400,
      y: 390,
      type: "tool",
      parent: "store_agent",
      color: "#F59E0B",
    },
    {
      id: "regional_trends",
      name: "Regional Trends",
      x: 400,
      y: 430,
      type: "tool",
      parent: "store_agent",
      color: "#F59E0B",
    },

    {
      id: "safety_stock",
      name: "Safety Stock",
      x: 550,
      y: 350,
      type: "tool",
      parent: "basestock_agent",
      color: "#10B981",
    },
    {
      id: "reorder_points",
      name: "Reorder Points",
      x: 550,
      y: 390,
      type: "tool",
      parent: "basestock_agent",
      color: "#10B981",
    },
    {
      id: "lead_times",
      name: "Lead Times",
      x: 550,
      y: 430,
      type: "tool",
      parent: "basestock_agent",
      color: "#10B981",
    },

    {
      id: "like_to_like",
      name: "Like-to-Like",
      x: 700,
      y: 350,
      type: "tool",
      parent: "sales_agent",
      color: "#3B82F6",
    },
    {
      id: "growth",
      name: "Growth",
      x: 700,
      y: 390,
      type: "tool",
      parent: "sales_agent",
      color: "#3B82F6",
    },
    {
      id: "sales",
      name: "Sales",
      x: 700,
      y: 430,
      type: "tool",
      parent: "sales_agent",
      color: "#3B82F6",
    },

    {
      id: "returns",
      name: "Returns",
      x: 850,
      y: 350,
      type: "tool",
      parent: "sales_agent",
      color: "#3B82F6",
    },
    {
      id: "discounts",
      name: "Discounts",
      x: 850,
      y: 390,
      type: "tool",
      parent: "sales_agent",
      color: "#3B82F6",
    },
    {
      id: "projections",
      name: "Projections",
      x: 850,
      y: 430,
      type: "tool",
      parent: "sales_agent",
      color: "#3B82F6",
    },
  ];

  const executorNode: Node = {
    id: "executor_agent",
    name: "Executor Agent",
    x: 350,
    y: 500,
    type: "agent",
    color: "#6B7280",
    icon: Settings,
  };

  const responseCompilerNode: Node = {
    id: "response_compiler",
    name: "Response Compiler",
    x: 500,
    y: 500,
    type: "agent",
    color: "#EC4899",
    icon: FileText,
  };

  const allNodes: Node[] = [
    domainKnowledgeNode,
    orchestratorNode,
    ...agentNodes,
    ...toolNodes,
    executorNode,
    responseCompilerNode,
  ];

  // Business questions (only a subset shown here for brevity). You can keep the full list from your original file.
  const businessQuestions: Question[] = [
    {
      id: "discount-roi",
      question: "Should I discount this SKU and by how much?",
      category: "Discount – ROI analysis",
      steps: [
        {
          description:
            "Orchestrator coordinates discount ROI analysis across agents",
          activeAgents: ["orchestrator"],
          connections: [{ from: "domain_knowledge", to: "orchestrator" }],
          log: "Orchestrator: Discount decision requires Sales velocity, Inventory levels, and Base-stock analysis coordination.",
        },
        {
          description:
            "Domain agents analyze their respective data for ROI calculation",
          activeAgents: ["inventory_agent", "sales_agent", "basestock_agent"],
          connections: [
            { from: "orchestrator", to: "inventory_agent" },
            { from: "orchestrator", to: "sales_agent" },
            { from: "orchestrator", to: "basestock_agent" },
          ],
          log: "Domain Agents: Inventory, Sales, and Base-stock agents activated for discount impact analysis.",
        },
        {
          description:
            "Agents use tools to gather baseline metrics and elasticity data",
          activeAgents: ["inventory_agent", "sales_agent"],
          activeTools: [
            "current_stock",
            "stock_movement",
            "like_to_like",
            "growth",
            "discounts",
          ],
          connections: [
            { from: "inventory_agent", to: "current_stock" },
            { from: "sales_agent", to: "like_to_like" },
            { from: "sales_agent", to: "discounts" },
          ],
          log: "Tools Analysis: STR: 67%, WOS: 8.2 weeks, Price elasticity: -1.2, Current inventory: $45K for target SKU.",
        },
        {
          description:
            "Executor Agent calculates incremental lift and ROI projections",
          activeAgents: ["executor_agent"],
          connections: [
            { from: "current_stock", to: "executor_agent" },
            { from: "like_to_like", to: "executor_agent" },
            { from: "discounts", to: "executor_agent" },
          ],
          log: "Executor Agent: ROI calculation complete. 25% discount → 28 incremental units, ROI: 138% after returns cost.",
        },
        {
          description: "Response Compiler generates discount recommendation",
          activeAgents: ["response_compiler"],
          connections: [{ from: "executor_agent", to: "response_compiler" }],
          log: "Response Compiler: Discount strategy approved with store deployment plan and timeline.",
        },
      ],
      finalOutput:
        "✅ DISCOUNT RECOMMENDATION: YES - Apply 25% discount for 2 weeks. Expected ROI: 138%. Deploy to 85 high-inventory stores. Incremental units: 28.",
      exampleOutput: {
        recommendation: "YES",
        discountDepth: "25%",
        duration: "2 weeks",
        expectedROI: "138%",
        stores: 85,
        incrementalUnits: 28,
      },
    },
    {
      id: "return-analysis",
      question: "Which products have high return rates and why?",
      category: "Return analysis",
      steps: [
        {
          description: "Orchestrator initiates comprehensive return analysis",
          activeAgents: ["orchestrator"],
          activeTools: [],
          connections: [{ from: "domain_knowledge", to: "orchestrator" }],
          log: "Orchestrator: Return analysis requires Sales patterns, Product quality data, and Store feedback coordination.",
        },
        {
          description: "Sales and Product agents analyze return patterns",
          activeAgents: ["sales_agent", "product_agent"],
          activeTools: [],
          connections: [
            { from: "orchestrator", to: "sales_agent" },
            { from: "orchestrator", to: "product_agent" },
          ],
          log: "Agents: Sales and Product agents examining return rates, reasons, and product lifecycle factors.",
        },
        {
          description:
            "Agents use tools to identify return causes and patterns",
          activeAgents: ["sales_agent"],
          activeTools: ["returns", "sales", "growth"],
          connections: [
            { from: "sales_agent", to: "returns" },
            { from: "sales_agent", to: "sales" },
          ],
          log: "Tools Analysis: Return rate 8.2%, Top reasons: Size/fit (35%), Quality (28%), Style preference (22%).",
        },
        {
          description: "Executor Agent correlates returns with economic impact",
          activeAgents: ["executor_agent"],
          activeTools: [],
          connections: [
            { from: "returns", to: "executor_agent" },
            { from: "sales", to: "executor_agent" },
          ],
          log: "Executor Agent: Economic impact calculated - $135K monthly in lost margin, reprocessing, and markdowns.",
        },
        {
          description:
            "Response Compiler creates action plan for return reduction",
          activeAgents: ["response_compiler"],
          activeTools: [],
          connections: [{ from: "executor_agent", to: "response_compiler" }],
          log: "Response Compiler: Prioritized action plan for size charts, quality improvements, and PDP enhancements.",
        },
      ],
      finalOutput:
        "🔄 RETURN ANALYSIS: $135K monthly impact. Actions: Update size charts (12 SKUs), vendor quality reviews (8 SKUs), improve product descriptions (14 SKUs).",
      exampleOutput: {
        monthlyImpact: "$135K",
        returnRate: "8.2%",
        sizeIssues: 12,
        qualityIssues: 8,
        descriptionIssues: 14,
        topReasons: ["Size/fit", "Quality", "Style preference"],
      },
    },
    {
      id: "size-mix",
      question: "What size curve should I buy for next season?",
      category: "Size-mix decisions",
      steps: [
        {
          description:
            "Orchestrator coordinates size-mix optimization analysis",
          activeAgents: ["orchestrator"],
          activeTools: [],
          connections: [{ from: "domain_knowledge", to: "orchestrator" }],
          log: "Orchestrator: Size curve optimization requires Sales demand data, Inventory availability, and Store clustering.",
        },
        {
          description:
            "Sales, Inventory, and Store agents analyze size performance",
          activeAgents: ["sales_agent", "inventory_agent", "store_agent"],
          activeTools: [],
          connections: [
            { from: "orchestrator", to: "sales_agent" },
            { from: "orchestrator", to: "inventory_agent" },
            { from: "orchestrator", to: "store_agent" },
          ],
          log: "Agents: Multi-agent analysis of size-level demand patterns across store clusters.",
        },
        {
          description: "Agents gather size-level sales and availability data",
          activeAgents: ["sales_agent", "inventory_agent"],
          activeTools: ["sales", "growth", "out_of_stock", "current_stock"],
          connections: [
            { from: "sales_agent", to: "sales" },
            { from: "inventory_agent", to: "out_of_stock" },
            { from: "inventory_agent", to: "current_stock" },
          ],
          log: "Tools Analysis: Size M demand inflated 23% due to stockouts. Current mix over-indexed on XS/S by 15%.",
        },
        {
          description:
            "Executor Agent calculates optimal size curve by cluster",
          activeAgents: ["executor_agent"],
          activeTools: [],
          connections: [
            { from: "sales", to: "executor_agent" },
            { from: "out_of_stock", to: "executor_agent" },
          ],
          log: "Executor Agent: Optimal size curve calculated with availability adjustments and regional variations.",
        },
        {
          description: "Response Compiler generates size-mix recommendations",
          activeAgents: ["response_compiler"],
          activeTools: [],
          connections: [{ from: "executor_agent", to: "response_compiler" }],
          log: "Response Compiler: Size curve recommendations with transfer actions and buy ratios.",
        },
      ],
      finalOutput:
        "📊 SIZE-MIX STRATEGY: Adjust to 6% XS, 15% S, 35% M, 30% L, 12% XL, 2% XXL. Transfer excess XS/S from 23 high-inventory stores.",
      exampleOutput: {
        newSizeCurve: {
          XS: "6%",
          S: "15%",
          M: "35%",
          L: "30%",
          XL: "12%",
          XXL: "2%",
        },
        transferStores: 23,
        demandAdjustment: "+23% Size M",
        overIndexed: "XS/S by 15%",
      },
    },
    {
      id: "revenue-loss",
      question: "How much money am I losing to stockouts?",
      category: "Revenue-loss analysis",
      steps: [
        {
          description: "Orchestrator initiates revenue loss quantification",
          activeAgents: ["orchestrator"],
          activeTools: [],
          connections: [{ from: "domain_knowledge", to: "orchestrator" }],
          log: "Orchestrator: Revenue loss analysis requires Sales baseline, Inventory availability, and demand forecasting.",
        },
        {
          description: "Sales and Inventory agents identify stockout patterns",
          activeAgents: ["sales_agent", "inventory_agent"],
          activeTools: [],
          connections: [
            { from: "orchestrator", to: "sales_agent" },
            { from: "orchestrator", to: "inventory_agent" },
          ],
          log: "Agents: Sales and Inventory agents analyzing zero-sales periods and ghost inventory patterns.",
        },
        {
          description:
            "Agents use tools to quantify stockout impact and missed sales",
          activeAgents: ["sales_agent", "inventory_agent"],
          activeTools: [
            "sales",
            "like_to_like",
            "out_of_stock",
            "current_stock",
          ],
          connections: [
            { from: "sales_agent", to: "like_to_like" },
            { from: "inventory_agent", to: "out_of_stock" },
          ],
          log: "Tools Analysis: OOS rate 12% vs baseline, Ghost inventory $45K, Expected baseline sales 1,240 units.",
        },
        {
          description: "Executor Agent calculates total revenue loss by cause",
          activeAgents: ["executor_agent"],
          activeTools: [],
          connections: [
            { from: "like_to_like", to: "executor_agent" },
            { from: "out_of_stock", to: "executor_agent" },
          ],
          log: "Executor Agent: Revenue loss quantified - $67K true stockouts + $23K ghost inventory = $90K monthly.",
        },
        {
          description: "Response Compiler prioritizes recovery actions",
          activeAgents: ["response_compiler"],
          activeTools: [],
          connections: [{ from: "executor_agent", to: "response_compiler" }],
          log: "Response Compiler: Recovery plan prioritized by impact and feasibility for maximum revenue capture.",
        },
      ],
      finalOutput:
        "💰 REVENUE LOSS: $90K monthly. Recovery plan: Fix ghost inventory (12 stores, $23K), improve replenishment (25 SKUs, $67K potential).",
      exampleOutput: {
        monthlyLoss: "$90K",
        trueStockouts: "$67K",
        ghostInventory: "$23K",
        oosRate: "12%",
        affectedStores: 12,
        prioritySKUs: 25,
      },
    },
    {
      id: "sku-performance",
      question: "Which SKUs should I double-down on vs exit?",
      category: "Style/SKU performance",
      steps: [
        {
          description: "Orchestrator initiates SKU performance classification",
          activeAgents: ["orchestrator"],
          activeTools: [],
          connections: [{ from: "domain_knowledge", to: "orchestrator" }],
          log: "Orchestrator: SKU classification requires Sales velocity, Product margins, and Inventory health analysis.",
        },
        {
          description: "Multi-agent SKU scorecard development",
          activeAgents: ["sales_agent", "product_agent", "inventory_agent"],
          activeTools: [],
          connections: [
            { from: "orchestrator", to: "sales_agent" },
            { from: "orchestrator", to: "product_agent" },
            { from: "orchestrator", to: "inventory_agent" },
          ],
          log: "Agents: Sales, Product, and Inventory agents scoring 342 SKUs on velocity, profitability, and risk.",
        },
        {
          description:
            "Agents analyze performance metrics and inventory health",
          activeAgents: ["sales_agent", "inventory_agent"],
          activeTools: [
            "sales",
            "growth",
            "returns",
            "current_stock",
            "stock_movement",
          ],
          connections: [
            { from: "sales_agent", to: "sales" },
            { from: "sales_agent", to: "returns" },
            { from: "inventory_agent", to: "stock_movement" },
          ],
          log: "Tools Analysis: 62 high performers, 128 medium velocity, 152 underperformers. Return rates and aging tracked.",
        },
        {
          description: "Executor Agent classifies SKUs into action quadrants",
          activeAgents: ["executor_agent"],
          activeTools: [],
          connections: [
            { from: "sales", to: "executor_agent" },
            { from: "returns", to: "executor_agent" },
            { from: "stock_movement", to: "executor_agent" },
          ],
          log: "Executor Agent: SKU classification complete - Double-down (62), Nurture (89), Fix ops (39), Exit (152).",
        },
        {
          description: "Response Compiler creates SKU strategy roadmap",
          activeAgents: ["response_compiler"],
          activeTools: [],
          connections: [{ from: "executor_agent", to: "response_compiler" }],
          log: "Response Compiler: Strategic roadmap with investment priorities and exit timeline.",
        },
      ],
      finalOutput:
        "🎯 SKU STRATEGY: Double-down (62 SKUs), Nurture with TPR (89 SKUs), Fix operations (39 SKUs), Exit/Clear (152 SKUs).",
      exampleOutput: {
        totalSKUs: 342,
        doubleDown: 62,
        nurture: 89,
        fixOps: 39,
        exit: 152,
        strategy: "Performance-based quadrants",
      },
    },
    {
      id: "capital-tied",
      question: "Where is my cash tied up and how to free it?",
      category: "Capital tied up",
      steps: [
        {
          description: "Orchestrator initiates cash flow optimization analysis",
          activeAgents: ["orchestrator"],
          activeTools: [],
          connections: [{ from: "domain_knowledge", to: "orchestrator" }],
          log: "Orchestrator: Capital analysis requires Inventory aging, Base-stock targets, and Sales velocity coordination.",
        },
        {
          description:
            "Inventory and Base-stock agents analyze cash deployment",
          activeAgents: ["inventory_agent", "basestock_agent"],
          activeTools: [],
          connections: [
            { from: "orchestrator", to: "inventory_agent" },
            { from: "orchestrator", to: "basestock_agent" },
          ],
          log: "Agents: Inventory and Base-stock agents analyzing $2.4M total inventory by age and target levels.",
        },
        {
          description: "Agents identify excess inventory and cash deployment",
          activeAgents: ["inventory_agent", "basestock_agent"],
          activeTools: [
            "current_stock",
            "stock_movement",
            "safety_stock",
            "reorder_points",
          ],
          connections: [
            { from: "inventory_agent", to: "current_stock" },
            { from: "basestock_agent", to: "safety_stock" },
          ],
          log: "Tools Analysis: $720K excess inventory identified. Age buckets: 13+ weeks ($380K), 9-12 weeks ($480K).",
        },
        {
          description: "Executor Agent prioritizes cash release actions by ROI",
          activeAgents: ["executor_agent"],
          activeTools: [],
          connections: [
            { from: "current_stock", to: "executor_agent" },
            { from: "safety_stock", to: "executor_agent" },
          ],
          log: "Executor Agent: Cash release strategy - Transfer ($280K), TPR ($320K), Markdown ($120K) prioritized by ROI.",
        },
        {
          description: "Response Compiler creates capital optimization plan",
          activeAgents: ["response_compiler"],
          activeTools: [],
          connections: [{ from: "executor_agent", to: "response_compiler" }],
          log: "Response Compiler: Comprehensive cash flow improvement plan with execution timeline.",
        },
      ],
      finalOutput:
        "💸 CAPITAL OPTIMIZATION: $720K excess inventory. Actions: Transfer $280K, TPR $320K, Markdown $120K aged stock over 16 weeks.",
      exampleOutput: {
        excessInventory: "$720K",
        transferValue: "$280K",
        tprValue: "$320K",
        markdownValue: "$120K",
        timeline: "16 weeks",
        totalInventory: "$2.4M",
      },
    },
    {
      id: "ageing-analysis",
      question: "What inventory is at risk of becoming dead stock?",
      category: "Ageing analysis",
      steps: [
        {
          description: "Orchestrator initiates inventory aging risk assessment",
          activeAgents: ["orchestrator"],
          activeTools: [],
          connections: [{ from: "domain_knowledge", to: "orchestrator" }],
          log: "Orchestrator: Aging analysis requires Inventory tracking, Sales velocity, and risk threshold monitoring.",
        },
        {
          description:
            "Inventory and Sales agents track aging and sell-through",
          activeAgents: ["inventory_agent", "sales_agent"],
          activeTools: [],
          connections: [
            { from: "orchestrator", to: "inventory_agent" },
            { from: "orchestrator", to: "sales_agent" },
          ],
          log: "Agents: Inventory and Sales agents analyzing age distribution and sell-through correlation.",
        },
        {
          description: "Agents apply aging triggers and velocity analysis",
          activeAgents: ["inventory_agent", "sales_agent"],
          activeTools: ["stock_movement", "current_stock", "sales", "growth"],
          connections: [
            { from: "inventory_agent", to: "stock_movement" },
            { from: "sales_agent", to: "sales" },
          ],
          log: "Tools Analysis: Age triggers applied - T1: 89 SKUs need nudging, T2: 45 SKUs need TPR, T3: 23 SKUs need clearance.",
        },
        {
          description: "Executor Agent generates risk-based action timeline",
          activeAgents: ["executor_agent"],
          activeTools: [],
          connections: [
            { from: "stock_movement", to: "executor_agent" },
            { from: "sales", to: "executor_agent" },
          ],
          log: "Executor Agent: Risk timeline created - Immediate (89), 2 weeks (45), 4 weeks (23) based on aging velocity.",
        },
        {
          description: "Response Compiler creates aging intervention plan",
          activeAgents: ["response_compiler"],
          activeTools: [],
          connections: [{ from: "executor_agent", to: "response_compiler" }],
          log: "Response Compiler: Aging intervention strategy with progressive markdown schedule.",
        },
      ],
      finalOutput:
        "⚠️ AGING RISK: 157 SKUs need action. Timeline: Nudge 89 now, TPR 45 in 2 weeks, Clear 23 in 4 weeks.",
      exampleOutput: {
        totalAtRisk: 157,
        nudgeNow: 89,
        tprIn2Weeks: 45,
        clearanceIn4Weeks: 23,
        agingTriggers: "T1, T2, T3",
        timeline: "4 weeks",
      },
    },
    {
      id: "store-growth",
      question: "Which stores should I expand vs contract?",
      category: "Growth & degrowth of stores",
      steps: [
        {
          description: "Orchestrator coordinates store performance evaluation",
          activeAgents: ["orchestrator"],
          activeTools: [],
          connections: [{ from: "domain_knowledge", to: "orchestrator" }],
          log: "Orchestrator: Store growth analysis requires Sales trends, Store operations, and regional opportunity assessment.",
        },
        {
          description: "Sales and Store agents analyze performance trends",
          activeAgents: ["sales_agent", "store_agent"],
          activeTools: [],
          connections: [
            { from: "orchestrator", to: "sales_agent" },
            { from: "orchestrator", to: "store_agent" },
          ],
          log: "Agents: Sales and Store agents analyzing 156 stores for momentum, capacity, and regional trends.",
        },
        {
          description:
            "Agents evaluate store metrics and white-space opportunities",
          activeAgents: ["sales_agent", "store_agent"],
          activeTools: [
            "like_to_like",
            "growth",
            "store_performance",
            "capacity_analysis",
            "regional_trends",
          ],
          connections: [
            { from: "sales_agent", to: "growth" },
            { from: "store_agent", to: "store_performance" },
            { from: "store_agent", to: "regional_trends" },
          ],
          log: "Tools Analysis: 39 high-growth stores, 35 underperformers, 12 white-space regions identified.",
        },
        {
          description: "Executor Agent classifies stores by growth potential",
          activeAgents: ["executor_agent"],
          activeTools: [],
          connections: [
            { from: "growth", to: "executor_agent" },
            { from: "store_performance", to: "executor_agent" },
            { from: "regional_trends", to: "executor_agent" },
          ],
          log: "Executor Agent: Store classification complete - Expand (39), Contract (35), New opportunities (12 regions).",
        },
        {
          description: "Response Compiler creates store portfolio strategy",
          activeAgents: ["response_compiler"],
          activeTools: [],
          connections: [{ from: "executor_agent", to: "response_compiler" }],
          log: "Response Compiler: Store portfolio strategy with investment allocation and closure timeline.",
        },
      ],
      finalOutput:
        "🏪 STORE STRATEGY: Expand 39 high-growth stores, contract 35 underperformers, explore 12 white-space regions. Revenue opportunity: +15%.",
      exampleOutput: {
        totalStores: 156,
        expandStores: 39,
        contractStores: 35,
        whiteSpaceRegions: 12,
        revenueOpportunity: "+15%",
        strategy: "Portfolio optimization",
      },
    },
    {
      id: "pricing-elasticity",
      question: "How price-sensitive are my customers?",
      category: "Pricing elasticity",
      steps: [
        {
          description: "Orchestrator initiates price elasticity modeling",
          activeAgents: ["orchestrator"],
          activeTools: [],
          connections: [{ from: "domain_knowledge", to: "orchestrator" }],
          log: "Orchestrator: Price elasticity analysis requires Sales history, discount performance, and demand modeling.",
        },
        {
          description: "Sales agents analyze price-demand relationships",
          activeAgents: ["sales_agent"],
          activeTools: [],
          connections: [{ from: "orchestrator", to: "sales_agent" }],
          log: "Agent: Sales agent modeling demand response across 278 SKUs over 18-month period.",
        },
        {
          description: "Sales agent uses tools for elasticity calculation",
          activeAgents: ["sales_agent"],
          activeTools: ["sales", "discounts", "projections", "like_to_like"],
          connections: [
            { from: "sales_agent", to: "sales" },
            { from: "sales_agent", to: "discounts" },
            { from: "sales_agent", to: "projections" },
          ],
          log: "Tools Analysis: Elastic categories (Dresses -1.4, Accessories -1.2), Inelastic (Basics -0.6, Premium -0.4).",
        },
        {
          description:
            "Executor Agent optimizes pricing strategy by elasticity",
          activeAgents: ["executor_agent"],
          activeTools: [],
          connections: [
            { from: "sales", to: "executor_agent" },
            { from: "discounts", to: "executor_agent" },
            { from: "projections", to: "executor_agent" },
          ],
          log: "Executor Agent: Pricing strategy optimized - Elastic categories benefit from 30-40% TPR, Inelastic limit to 15-20%.",
        },
        {
          description: "Response Compiler creates pricing playbook",
          activeAgents: ["response_compiler"],
          activeTools: [],
          connections: [{ from: "executor_agent", to: "response_compiler" }],
          log: "Response Compiler: Category-specific pricing playbook with elasticity thresholds and TPR guidelines.",
        },
      ],
      finalOutput:
        "💲 PRICING ELASTICITY: Elastic categories (Dresses, Accessories) → 30-40% TPR effective. Inelastic (Basics, Premium) → limit to 15-20%.",
      exampleOutput: {
        elasticCategories: ["Dresses (-1.4)", "Accessories (-1.2)"],
        inelasticCategories: ["Basics (-0.6)", "Premium (-0.4)"],
        optimalTPR: "15-40%",
        skusAnalyzed: 278,
        timeframe: "18 months",
      },
    },
    {
      id: "replenishment",
      question: "When and how much should I reorder?",
      category: "Replenishment",
      steps: [
        {
          description: "Orchestrator coordinates replenishment optimization",
          activeAgents: ["orchestrator"],
          activeTools: [],
          connections: [{ from: "domain_knowledge", to: "orchestrator" }],
          log: "Orchestrator: Replenishment analysis requires Sales forecasting, Base-stock calculations, and lead time management.",
        },
        {
          description: "Sales and Base-stock agents analyze demand patterns",
          activeAgents: ["sales_agent", "basestock_agent"],
          activeTools: [],
          connections: [
            { from: "orchestrator", to: "sales_agent" },
            { from: "orchestrator", to: "basestock_agent" },
          ],
          log: "Agents: Sales and Base-stock agents analyzing demand variability and safety stock requirements.",
        },
        {
          description: "Agents calculate reorder points and optimal quantities",
          activeAgents: ["sales_agent", "basestock_agent", "inventory_agent"],
          activeTools: [
            "sales",
            "projections",
            "safety_stock",
            "reorder_points",
            "current_stock",
          ],
          connections: [
            { from: "sales_agent", to: "projections" },
            { from: "basestock_agent", to: "safety_stock" },
            { from: "inventory_agent", to: "current_stock" },
          ],
          log: "Tools Analysis: ROP calculated for 95% service level. 89 SKUs need immediate reorder, 156 approaching trigger.",
        },
        {
          description: "Executor Agent validates reorder recommendations",
          activeAgents: ["executor_agent"],
          activeTools: [],
          connections: [
            { from: "projections", to: "executor_agent" },
            { from: "safety_stock", to: "executor_agent" },
            { from: "current_stock", to: "executor_agent" },
          ],
          log: "Executor Agent: Replenishment plan validated - $340K investment needed, 23 SKUs overstocked.",
        },
        {
          description: "Response Compiler creates replenishment schedule",
          activeAgents: ["response_compiler"],
          activeTools: [],
          connections: [{ from: "executor_agent", to: "response_compiler" }],
          log: "Response Compiler: Replenishment schedule with priority SKUs and order timing optimization.",
        },
      ],
      finalOutput:
        "📦 REPLENISHMENT PLAN: Order 89 SKUs now ($340K), monitor 156 approaching ROP, reduce 23 overstocked. Service level: 95%.",
      exampleOutput: {
        orderNow: 89,
        monitorROP: 156,
        overStocked: 23,
        investment: "$340K",
        serviceLevel: "95%",
        leadTime: "3-14 days",
      },
    },
  ];

  const filteredQuestions = businessQuestions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to compute active step safely
  const getActiveStep = (): Step | null => {
    if (!selectedQuestion) return null;
    if (currentStep === 0) return null;
    const idx = Math.min(currentStep - 1, selectedQuestion.steps.length - 1);
    if (idx < 0) return null;
    return selectedQuestion.steps[idx] ?? null;
  };

  // Animation control
  useEffect(() => {
    let timer: number | undefined;

    if (
      isAnimating &&
      selectedQuestion &&
      currentStep < selectedQuestion.steps.length
    ) {
      timer = window.setTimeout(() => {
        const step = selectedQuestion.steps[currentStep];
        setActiveAgent(step.activeAgents?.[0] ?? null);
        setActiveConnections(step.connections ?? []);
        setLogs((prev) => [
          ...prev,
          {
            step: currentStep + 1,
            timestamp: new Date().toLocaleTimeString(),
            message: step.log ?? step.description,
          },
        ]);
        setCurrentStep((prev) => prev + 1);
      }, 1000);
    } else if (
      selectedQuestion &&
      currentStep >= selectedQuestion.steps.length &&
      isAnimating
    ) {
      // Mark complete
      setIsAnimating(false);
      setActiveAgent(null);
      setActiveConnections([]);
      setLogs((prev) => [
        ...prev,
        {
          step: "COMPLETE",
          timestamp: new Date().toLocaleTimeString(),
          message: selectedQuestion.finalOutput,
        },
      ]);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [isAnimating, currentStep, selectedQuestion]);

  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question);
    setCurrentStep(0);
    setActiveAgent(null);
    setActiveConnections([]);
    setLogs([
      {
        step: "START",
        timestamp: new Date().toLocaleTimeString(),
        message: `Starting multi-agent analysis: ${question.question}`,
      },
    ]);
    setIsAnimating(true);
  };

  const getNodeStyle = (node: Node) => {
    const step = getActiveStep();
    const isActiveAgent = step?.activeAgents?.includes(node.id) ?? false;
    const isActiveTool = step?.activeTools?.includes(node.id) ?? false;
    const isActive = isActiveAgent || isActiveTool;

    if (!selectedQuestion || !isAnimating) {
      return {
        fill:
          node.type === "knowledge" || node.type === "orchestrator"
            ? "#F3F4F6"
            : "#F9FAFB",
        stroke: node.color,
        strokeWidth: node.type === "tool" ? 1 : 2,
        opacity: 1,
      };
    }

    return {
      fill: isActive ? node.color : "#F3F4F6",
      stroke: node.color,
      strokeWidth: isActive ? 3 : node.type === "tool" ? 1 : 2,
      opacity: isActive ? 1 : 0.45,
    };
  };

  const renderConnections = () => {
    const step = getActiveStep();
    if (!selectedQuestion || !isAnimating || !step) return null;

    return step.connections?.map((conn, index) => {
      const fromNode = allNodes.find((n) => n.id === conn.from);
      const toNode = allNodes.find((n) => n.id === conn.to);

      if (!fromNode || !toNode) return null;

      return (
        <g key={`${conn.from}-${conn.to}-${index}`}>
          <line
            x1={fromNode.x + 60}
            y1={fromNode.y + 20}
            x2={toNode.x + 60}
            y2={toNode.y + 20}
            stroke="#059669"
            strokeWidth={3}
            strokeDasharray="8,4"
            markerEnd="url(#arrowhead)"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="12;0"
              dur="2s"
              repeatCount="indefinite"
            />
          </line>
        </g>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Sidebar - Questions */}
        <div className="w-80 bg-white shadow-lg p-4 overflow-y-auto">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Multi-Agent Questions
          </h1>

          <div className="mb-4 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-5">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className={`p-5 rounded-lg border cursor-pointer transition-all ${
                  selectedQuestion?.id === question.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => handleQuestionClick(question)}
              >
                <div className="font-medium text-sm text-gray-900 mb-2">
                  {question.question}
                </div>
                <div className="text-xs text-gray-500">{question.category}</div>
                <div className="text-xs text-green-600 mt-1">
                  {question.steps.length} agent interactions
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Agent Network Area */}
        <div className="flex-1 p-4">
          <div
            className="bg-white rounded-lg shadow h-full relative overflow-hidden"
            style={{ minHeight: 700 }}
          >
            {/* Current Step Indicator */}
            {selectedQuestion && isAnimating && (
              <div className="absolute top-4 left-4 z-10 bg-green-500 text-white px-4 py-2 rounded-lg max-w-md">
                <div className="font-medium text-sm">
                  Step {currentStep}:{" "}
                  {getActiveStep()?.description ??
                    (currentStep === 0 ? "Starting..." : "")}
                </div>
              </div>
            )}

            <svg
              width="100%"
              height="700"
              className="overflow-visible"
              viewBox="0 0 1000 700"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#059669" />
                </marker>
              </defs>

              {/* Static connections from orchestrator to agents */}
              {agentNodes.map((agent) => (
                <line
                  key={`orch-${agent.id}`}
                  x1={orchestratorNode.x + 60}
                  y1={orchestratorNode.y + 20}
                  x2={agent.x + 60}
                  y2={agent.y + 20}
                  stroke="#E5E7EB"
                  strokeWidth={1}
                  strokeDasharray="2,2"
                />
              ))}

              {/* Tool connections to their parent agents */}
              {toolNodes.map((tool) => {
                const parentAgent = agentNodes.find(
                  (a) => a.id === tool.parent
                );
                if (!parentAgent) return null;
                return (
                  <line
                    key={`tool-${tool.id}`}
                    x1={parentAgent.x + 60}
                    y1={parentAgent.y + 40}
                    x2={tool.x + 60}
                    y2={tool.y}
                    stroke="#E5E7EB"
                    strokeWidth={1}
                  />
                );
              })}

              {/* Connections from tools to executor */}
              {toolNodes.map((tool) => (
                <line
                  key={`tool-exec-${tool.id}`}
                  x1={tool.x + 60}
                  y1={tool.y + 30}
                  x2={executorNode.x + 60}
                  y2={executorNode.y}
                  stroke="#E5E7EB"
                  strokeWidth={1}
                  strokeDasharray="2,2"
                />
              ))}

              {/* Connection from executor to response compiler */}
              <line
                x1={executorNode.x + 120}
                y1={executorNode.y + 20}
                x2={responseCompilerNode.x}
                y2={responseCompilerNode.y + 20}
                stroke="#E5E7EB"
                strokeWidth={2}
              />

              {/* Domain Knowledge to Orchestrator connection */}
              <line
                x1={domainKnowledgeNode.x + 60}
                y1={domainKnowledgeNode.y + 40}
                x2={orchestratorNode.x + 60}
                y2={orchestratorNode.y}
                stroke="#E5E7EB"
                strokeWidth={2}
              />

              {/* Animated connections */}
              {renderConnections()}

              {/* Render all nodes */}
              {allNodes.map((node) => {
                const style = getNodeStyle(node);
                const isSmall = node.type === "tool";

                return (
                  <g key={node.id}>
                    <rect
                      x={node.x}
                      y={node.y}
                      width={isSmall ? 120 : 120}
                      height={isSmall ? 30 : 40}
                      rx={6}
                      fill={style.fill}
                      stroke={style.stroke}
                      strokeWidth={style.strokeWidth}
                      opacity={style.opacity}
                    />
                    <text
                      x={node.x + 60}
                      y={node.y + (isSmall ? 20 : 25)}
                      textAnchor="middle"
                      fontSize={isSmall ? 10 : 12}
                      fill={
                        style.fill === "#F3F4F6" || style.fill === "#F9FAFB"
                          ? "#374151"
                          : "white"
                      }
                    >
                      {node.name}
                    </text>
                  </g>
                );
              })}

              {/* Section Labels */}
              <text
                x="450"
                y="20"
                textAnchor="middle"
                fontSize={14}
                fill="#4B5563"
              >
                Domain Knowledge
              </text>
              <text
                x="450"
                y="120"
                textAnchor="middle"
                fontSize={14}
                fill="#4B5563"
              >
                Orchestrator
              </text>
              <text
                x="450"
                y="220"
                textAnchor="middle"
                fontSize={14}
                fill="#4B5563"
              >
                Domain Expert Agents
              </text>
              <text
                x="450"
                y="320"
                textAnchor="middle"
                fontSize={14}
                fill="#4B5563"
              >
                Agent Tools
              </text>
              <text
                x="450"
                y="480"
                textAnchor="middle"
                fontSize={14}
                fill="#4B5563"
              >
                Execution & Response
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {selectedQuestion &&
        currentStep >= (selectedQuestion?.steps.length ?? 0) && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-2xl border-2 border-green-500 p-6 z-30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Multi-Agent Analysis Complete
              </h3>
              <button
                onClick={() => {
                  setSelectedQuestion(null);
                  setCurrentStep(0);
                  setIsAnimating(false);
                  setLogs([]);
                  setActiveAgent(null);
                  setActiveConnections([]);
                }}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">❓ Question:</h4>
              <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                {selectedQuestion.question}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">
                🤖 Agent Recommendation:
              </h4>
              <p className="text-sm text-gray-800 bg-green-50 p-3 rounded border-l-4 border-green-500">
                {selectedQuestion.finalOutput}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">📊 Key Insights:</h4>
              <div className="bg-gray-50 p-3 rounded space-y-2">
                <div className="text-sm grid grid-cols-2 gap-2">
                  {Object.entries(selectedQuestion.exampleOutput).map(
                    ([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-xs text-gray-500 capitalize">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </span>
                        <span className="font-medium">
                          {Array.isArray(value)
                            ? value.join(", ")
                            : String(value)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setSelectedQuestion(null);
                  setCurrentStep(0);
                  setIsAnimating(false);
                  setLogs([]);
                  setActiveAgent(null);
                  setActiveConnections([]);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                Start New Analysis
              </button>
            </div>
          </div>
        )}

      {/* Bottom Logs Panel */}
      <div className="h-48 bg-gray-900 text-green-400 p-4 overflow-y-auto font-mono text-sm">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          <span className="text-green-300">Multi-Agent System Logs</span>
        </div>
        {logs.map((log, index) => (
          <div key={index} className="mb-1">
            <span className="text-blue-300">[{log.timestamp}]</span>
            <span className="text-yellow-300 ml-2">STEP {log.step}:</span>
            <span className="ml-2">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiAgentRetailSystem;

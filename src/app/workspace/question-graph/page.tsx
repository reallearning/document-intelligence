"use client";
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Link from "next/link";

// Type definitions
interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  size: number;
  color: string;
}

interface Edge {
  source: string;
  target: string;
}

interface Step {
  nodes: string[];
  edges?: Edge[];
  text: string;
}

interface Question {
  id: string;
  question: string;
  approach: string;
  nodes: string[];
  edges: Edge[];
  steps?: Step[];
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  type: string;
}

const QuestionGraphTraversal = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [editingApproach, setEditingApproach] = useState<boolean>(false);
  const [approachText, setApproachText] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const allNodes: Node[] = [
    { id: "company", name: "Company", size: 16, color: "#3B82F6" },
    { id: "brand", name: "Brand", size: 16, color: "#3B82F6" },
    { id: "collection", name: "Collection", size: 14, color: "#8B5CF6" },
    { id: "category", name: "Category", size: 12, color: "#6B7280" },
    { id: "subcategory", name: "Subcategory", size: 12, color: "#6B7280" },
    { id: "productline", name: "ProductLine", size: 12, color: "#6B7280" },
    {
      id: "lifecyclepolicy",
      name: "LifecyclePolicy",
      size: 11,
      color: "#6B7280",
    },
    { id: "style", name: "Style", size: 14, color: "#8B5CF6" },
    { id: "sku", name: "SKU", size: 14, color: "#8B5CF6" },
    { id: "store", name: "Store", size: 14, color: "#06B6D4" },
    { id: "channel", name: "Channel", size: 13, color: "#06B6D4" },
    { id: "inventorynode", name: "InventoryNode", size: 12, color: "#06B6D4" },
    { id: "vendor", name: "Vendor", size: 14, color: "#F59E0B" },
    { id: "pricelist", name: "PriceList", size: 12, color: "#EF4444" },
    { id: "promotion", name: "Promotion", size: 12, color: "#EF4444" },
    {
      id: "customersegment",
      name: "CustomerSegment",
      size: 12,
      color: "#EC4899",
    },
    { id: "event", name: "Event", size: 11, color: "#10B981" },
    { id: "kpi", name: "KPI", size: 11, color: "#8B5CF6" },
    { id: "policy", name: "Policy", size: 11, color: "#EF4444" },
  ];

  const allLinks: Link[] = [
    { source: "company", target: "brand", type: "OWNS" },
    { source: "brand", target: "collection", type: "LAUNCHED" },
    { source: "collection", target: "style", type: "CONTAINS_STYLE" },
    { source: "style", target: "sku", type: "MATERIALIZES_AS" },
    { source: "style", target: "subcategory", type: "CLASSIFIED_AS" },
    { source: "subcategory", target: "category", type: "BELONGS_TO" },
    { source: "style", target: "lifecyclepolicy", type: "GOVERNED_BY" },
    { source: "style", target: "productline", type: "BELONGS_TO" },
    { source: "sku", target: "inventorynode", type: "LISTED_AT" },
    { source: "inventorynode", target: "store", type: "LOCATED_AT" },
    { source: "sku", target: "inventorynode", type: "IN_STOCK_AT" },
    { source: "sku", target: "pricelist", type: "PRICED_BY" },
    { source: "promotion", target: "sku", type: "TARGETS_SKU" },
    { source: "promotion", target: "store", type: "TARGETS_STORE" },
    { source: "promotion", target: "channel", type: "TARGETS_CHANNEL" },
    { source: "promotion", target: "customersegment", type: "TARGETS_SEGMENT" },
    { source: "event", target: "store", type: "AFFECTS" },
    { source: "vendor", target: "style", type: "SUPPLIES" },
    { source: "store", target: "channel", type: "SELLS_VIA" },
    { source: "customersegment", target: "brand", type: "PREFERS" },
    { source: "customersegment", target: "style", type: "PREFERS" },
    { source: "kpi", target: "store", type: "MEASURES" },
    { source: "kpi", target: "sku", type: "MEASURES" },
    { source: "kpi", target: "style", type: "MEASURES" },
    { source: "kpi", target: "channel", type: "MEASURES" },
    { source: "policy", target: "sku", type: "APPLIES_TO" },
    { source: "policy", target: "store", type: "APPLIES_TO" },
    { source: "policy", target: "channel", type: "APPLIES_TO" },
  ];

  const questions: Question[] = [
    {
      id: "q1",
      question: "Which SKUs will stock out in the next 7/14 days by store?",
      approach:
        "First, I start from your brand and look at what collections you have launched. For each collection, I check which styles are part of it, and then look at all the SKUs (color and size variants) for those styles. Next, I examine where each SKU is stocked by checking the inventory nodes and which stores they are located at. I also pull in information about your vendors to understand lead times. Finally, I use your demand forecast KPIs to calculate how many weeks of coverage you have and flag which SKUs are at risk of stocking out.",
      nodes: [
        "brand",
        "collection",
        "style",
        "sku",
        "inventorynode",
        "store",
        "vendor",
        "kpi",
      ],
      edges: [
        { source: "brand", target: "collection" },
        { source: "collection", target: "style" },
        { source: "style", target: "sku" },
        { source: "sku", target: "inventorynode" },
        { source: "inventorynode", target: "store" },
        { source: "vendor", target: "style" },
        { source: "kpi", target: "sku" },
        { source: "kpi", target: "store" },
      ],
      steps: [
        { nodes: ["brand"], text: "Start with your brand" },
        {
          nodes: ["brand", "collection"],
          edges: [{ source: "brand", target: "collection" }],
          text: "Find all collections launched by the brand",
        },
        {
          nodes: ["brand", "collection", "style"],
          edges: [
            { source: "brand", target: "collection" },
            { source: "collection", target: "style" },
          ],
          text: "Look at styles within each collection",
        },
        {
          nodes: ["brand", "collection", "style", "sku"],
          edges: [
            { source: "brand", target: "collection" },
            { source: "collection", target: "style" },
            { source: "style", target: "sku" },
          ],
          text: "Get all SKU variants for each style",
        },
        {
          nodes: ["brand", "collection", "style", "sku", "inventorynode"],
          edges: [
            { source: "brand", target: "collection" },
            { source: "collection", target: "style" },
            { source: "style", target: "sku" },
            { source: "sku", target: "inventorynode" },
          ],
          text: "Check where SKUs are stocked",
        },
        {
          nodes: [
            "brand",
            "collection",
            "style",
            "sku",
            "inventorynode",
            "store",
          ],
          edges: [
            { source: "brand", target: "collection" },
            { source: "collection", target: "style" },
            { source: "style", target: "sku" },
            { source: "sku", target: "inventorynode" },
            { source: "inventorynode", target: "store" },
          ],
          text: "Map inventory to specific stores",
        },
        {
          nodes: [
            "brand",
            "collection",
            "style",
            "sku",
            "inventorynode",
            "store",
            "vendor",
          ],
          edges: [
            { source: "brand", target: "collection" },
            { source: "collection", target: "style" },
            { source: "style", target: "sku" },
            { source: "sku", target: "inventorynode" },
            { source: "inventorynode", target: "store" },
            { source: "vendor", target: "style" },
          ],
          text: "Factor in vendor lead times for replenishment",
        },
        {
          nodes: [
            "brand",
            "collection",
            "style",
            "sku",
            "inventorynode",
            "store",
            "vendor",
            "kpi",
          ],
          edges: [
            { source: "brand", target: "collection" },
            { source: "collection", target: "style" },
            { source: "style", target: "sku" },
            { source: "sku", target: "inventorynode" },
            { source: "inventorynode", target: "store" },
            { source: "vendor", target: "style" },
            { source: "kpi", target: "sku" },
            { source: "kpi", target: "store" },
          ],
          text: "Use forecasted demand to calculate stock-out risk",
        },
      ],
    },
    {
      id: "q2",
      question: "Where do channel prices conflict with policy?",
      approach:
        "I start by looking at how each SKU is priced using your price lists. Then I check which stores sell through which channels. Next, I pull up your pricing policies that define rules for SKUs, stores, and channels. Finally, I compare the actual prices across channels against what your policies say they should be, and flag any conflicts or violations.",
      nodes: ["sku", "pricelist", "store", "channel", "policy"],
      edges: [
        { source: "sku", target: "pricelist" },
        { source: "store", target: "channel" },
        { source: "policy", target: "sku" },
        { source: "policy", target: "store" },
        { source: "policy", target: "channel" },
      ],
      steps: [
        { nodes: ["sku"], text: "Start with your SKUs" },
        {
          nodes: ["sku", "pricelist"],
          edges: [{ source: "sku", target: "pricelist" }],
          text: "Check current prices for each SKU",
        },
        {
          nodes: ["sku", "pricelist", "store", "channel"],
          edges: [
            { source: "sku", target: "pricelist" },
            { source: "store", target: "channel" },
          ],
          text: "Map prices across stores and channels",
        },
        {
          nodes: ["sku", "pricelist", "store", "channel", "policy"],
          edges: [
            { source: "sku", target: "pricelist" },
            { source: "store", target: "channel" },
            { source: "policy", target: "sku" },
            { source: "policy", target: "store" },
            { source: "policy", target: "channel" },
          ],
          text: "Compare against pricing policies to find conflicts",
        },
      ],
    },
    {
      id: "q3",
      question: "Why did sales deviate from plan yesterday?",
      approach:
        "I look at your sales KPIs for each SKU across different stores and channels. Then I investigate several factors: Did prices change? Were there inventory issues? Were any promotions running? Did any external events happen? By examining all these connected pieces, I can tell you exactly what drove the difference between your planned and actual sales.",
      nodes: [
        "brand",
        "collection",
        "style",
        "sku",
        "store",
        "channel",
        "inventorynode",
        "pricelist",
        "promotion",
        "event",
        "kpi",
      ],
      edges: [
        { source: "brand", target: "collection" },
        { source: "collection", target: "style" },
        { source: "style", target: "sku" },
        { source: "sku", target: "inventorynode" },
        { source: "inventorynode", target: "store" },
        { source: "store", target: "channel" },
        { source: "sku", target: "pricelist" },
        { source: "promotion", target: "sku" },
        { source: "event", target: "store" },
        { source: "kpi", target: "sku" },
        { source: "kpi", target: "store" },
        { source: "kpi", target: "channel" },
      ],
      steps: [
        {
          nodes: ["kpi"],
          text: "Start by looking at the sales deviation KPIs",
        },
        {
          nodes: ["kpi", "sku", "store", "channel"],
          edges: [
            { source: "kpi", target: "sku" },
            { source: "kpi", target: "store" },
            { source: "kpi", target: "channel" },
          ],
          text: "Identify which SKUs, stores, and channels had deviations",
        },
        {
          nodes: ["kpi", "sku", "store", "channel", "pricelist"],
          edges: [
            { source: "kpi", target: "sku" },
            { source: "kpi", target: "store" },
            { source: "kpi", target: "channel" },
            { source: "sku", target: "pricelist" },
          ],
          text: "Check if price changes affected sales",
        },
        {
          nodes: [
            "kpi",
            "sku",
            "store",
            "channel",
            "pricelist",
            "inventorynode",
          ],
          edges: [
            { source: "kpi", target: "sku" },
            { source: "kpi", target: "store" },
            { source: "kpi", target: "channel" },
            { source: "sku", target: "pricelist" },
            { source: "sku", target: "inventorynode" },
            { source: "inventorynode", target: "store" },
          ],
          text: "Check for inventory availability issues",
        },
        {
          nodes: [
            "kpi",
            "sku",
            "store",
            "channel",
            "pricelist",
            "inventorynode",
            "promotion",
          ],
          edges: [
            { source: "kpi", target: "sku" },
            { source: "kpi", target: "store" },
            { source: "kpi", target: "channel" },
            { source: "sku", target: "pricelist" },
            { source: "sku", target: "inventorynode" },
            { source: "inventorynode", target: "store" },
            { source: "promotion", target: "sku" },
          ],
          text: "Check if promotions impacted performance",
        },
        {
          nodes: [
            "kpi",
            "sku",
            "store",
            "channel",
            "pricelist",
            "inventorynode",
            "promotion",
            "event",
          ],
          edges: [
            { source: "kpi", target: "sku" },
            { source: "kpi", target: "store" },
            { source: "kpi", target: "channel" },
            { source: "sku", target: "pricelist" },
            { source: "sku", target: "inventorynode" },
            { source: "inventorynode", target: "store" },
            { source: "promotion", target: "sku" },
            { source: "event", target: "store" },
          ],
          text: "Check for external events affecting stores",
        },
      ],
    },
  ];

  useEffect(() => {
    if (selectedQuestion) {
      createVisualization();
    }
  }, [selectedQuestion, currentStep]);

  useEffect(() => {
    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, []);

  const createVisualization = () => {
    if (!svgRef.current || !selectedQuestion) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = 900;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        g.attr("transform", event.transform.toString());
      });

    svg.call(zoom);

    // Determine active nodes and edges based on current step
    let activeNodeIds: string[];
    let activeEdges: Edge[];

    if (selectedQuestion.steps && currentStep < selectedQuestion.steps.length) {
      const step = selectedQuestion.steps[currentStep];
      activeNodeIds = step.nodes;
      activeEdges = step.edges || [];
    } else {
      activeNodeIds = selectedQuestion.nodes;
      activeEdges = selectedQuestion.edges;
    }

    const nodes = allNodes.filter((n) => activeNodeIds.includes(n.id));
    const links = activeEdges.map((e) => ({
      source: e.source,
      target: e.target,
      type: "",
    }));

    const defs = g.append("defs");

    defs
      .append("marker")
      .attr("id", "arrowhead-active")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 18)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#3B82F6");

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance(150)
      )
      .force("charge", d3.forceManyBody().strength(-800))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide<Node>().radius((d) => d.size + 20)
      );

    const link = g
      .selectAll<SVGLineElement, Link>(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead-active)")
      .attr("opacity", 0.6);

    const node = g
      .selectAll<SVGGElement, Node>(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node");

    node
      .append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2.5)
      .style("filter", "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))");

    node
      .append("text")
      .text((d) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.size + 18)
      .attr("font-size", "11px")
      .attr("fill", "#374151")
      .attr("font-weight", "600")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as unknown as Node).x || 0)
        .attr("y1", (d) => (d.source as unknown as Node).y || 0)
        .attr("x2", (d) => (d.target as unknown as Node).x || 0)
        .attr("y2", (d) => (d.target as unknown as Node).y || 0);

      node.attr("transform", (d) => `translate(${d.x || 0},${d.y || 0})`);
    });
  };

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question);
    setApproachText(question.approach);
    setCurrentStep(0);
    setIsPlaying(false);
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
    }
  };

  const handleEditApproach = () => {
    setEditingApproach(true);
  };

  const handleSaveApproach = () => {
    if (selectedQuestion) {
      const updatedQuestion = { ...selectedQuestion, approach: approachText };
      setSelectedQuestion(updatedQuestion);
    }
    setEditingApproach(false);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (
      selectedQuestion &&
      selectedQuestion.steps &&
      currentStep < selectedQuestion.steps.length - 1
    ) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    } else {
      setIsPlaying(true);
      playIntervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (
            selectedQuestion &&
            selectedQuestion.steps &&
            prev < selectedQuestion.steps.length - 1
          ) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            if (playIntervalRef.current) {
              clearInterval(playIntervalRef.current);
            }
            return prev;
          }
        });
      }, 2000);
    }
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Business Questions
          </h1>
          <p className="text-sm text-gray-500">
            Select a question to see how it's answered
          </p>
        </div>

        <div className="p-4 space-y-2 flex-1">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => handleQuestionSelect(q)}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                selectedQuestion?.id === q.id
                  ? "bg-blue-50 border-2 border-blue-500 shadow-sm"
                  : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
              }`}
              type="button"
            >
              <p className="text-sm font-medium text-gray-900">{q.question}</p>
            </button>
          ))}
        </div>
        <Link className="ml-5 mb-4" href={"/workspace/decision-factor"}>
          <button
            type="button"
            className={`w-[90%] py-4 rounded-xl font-semibold text-lg transition-all bg-teal-700
            hover:bg-teal-800
            text-white
            hover:shadow-lg
            cursor-pointer`}
          >
            Continue
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedQuestion ? (
          <>
            <div className="p-6 border-b border-gray-200 bg-white">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedQuestion.question}
              </h2>

              {!editingApproach ? (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-semibold text-blue-900">
                      How I Answer This
                    </h3>
                    <button
                      onClick={handleEditApproach}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      type="button"
                    >
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {selectedQuestion.approach}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    value={approachText}
                    onChange={(e) => setApproachText(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    placeholder="Describe how you would answer this question in natural language..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveApproach}
                      className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors text-sm font-medium"
                      type="button"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingApproach(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {selectedQuestion.steps && (
                <div className="mt-4 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-600">
                      Step {currentStep + 1} of {selectedQuestion.steps.length}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrevStep}
                        disabled={currentStep === 0}
                        className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5 text-gray-700"
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
                        type="button"
                      >
                        {isPlaying ? (
                          <svg
                            className="w-5 h-5 text-gray-700"
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
                            className="w-5 h-5 text-gray-700"
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
                          !selectedQuestion.steps ||
                          currentStep >= selectedQuestion.steps.length - 1
                        }
                        className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        type="button"
                      >
                        <svg
                          className="w-5 h-5 text-gray-700"
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
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedQuestion.steps[currentStep]?.text}
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1 p-6 overflow-hidden">
              <div className="bg-white rounded-2xl shadow-sm h-full flex items-center justify-center">
                <svg ref={svgRef} className="w-full h-full"></svg>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg
                className="w-20 h-20 mx-auto mb-4 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <p className="text-lg font-medium mb-2">Select a question</p>
              <p className="text-sm">
                Choose a question from the left to visualize its graph traversal
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionGraphTraversal;

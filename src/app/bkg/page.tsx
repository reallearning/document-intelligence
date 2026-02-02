"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// Types
interface Node {
  id: string;
  label: string;
  type: string;
  color: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string | Node;
  target: string | Node;
  label: string;
}

interface ConversationStep {
  question: string;
  answer: string;
  nodes: Node[];
  links: Link[];
  type?: string;
  isCorrection?: boolean;
  removeLinks?: Link[];
}

interface Message {
  role: "user" | "assistant";
  text: string;
  isCorrection?: boolean;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

// Placeholder conversation flow - replace with your actual data
const conversationFlow: ConversationStep[] = [
  {
    question:
      "Let's start with the fundamentals. What industry are you in, and what do you sell?",
    answer:
      "We're in fashion retail. We have four brands - Anita Dongre, Grassroot, AND, and Global Desi. Mostly apparel plus accessories.",
    nodes: [{ id: "brand", label: "Brand", type: "Core", color: "#5586A3" }],
    links: [],
  },
  {
    question:
      "Fashion retail - got it. Are you running a season-led model with collections, or more of a fast-fashion continuous replenishment approach?",
    answer:
      "Season-led. Each brand has seasonal collections plus a permanent Core line.",
    nodes: [
      { id: "season", label: "Season", type: "Context", color: "#0C2C18" },
    ],
    links: [],
  },
  {
    question:
      "Perfect. For season-led fashion, your inventory grain is typically Product × Color × Size. Do you also need a planning grain for ranging decisions?",
    answer:
      "Yes exactly - SKU is Product × Color × Size for operations, Option is Product × Color for planning and ranging.",
    nodes: [
      { id: "sku", label: "SKU", type: "Core", color: "#5586A3" },
      { id: "option", label: "Option", type: "Core", color: "#5586A3" },
    ],
    links: [
      { source: "sku", target: "option", label: "rolls_up_to" },
      { source: "sku", target: "brand", label: "belongs_to" },
      { source: "sku", target: "season", label: "belongs_to" },
    ],
  },
  {
    question:
      "Now for your retail footprint. What channels do you operate through?",
    answer:
      "We have EBOs, LFS partnerships, our own ecommerce site, external marketplaces like Myntra, Factory Outlets for clearance, and some franchise locations.",
    nodes: [
      { id: "store", label: "Store", type: "Core", color: "#5586A3" },
      { id: "channel", label: "Channel", type: "Context", color: "#0C2C18" },
    ],
    links: [{ source: "store", target: "channel", label: "operates_in" }],
  },
  {
    question:
      "Good mix. For your EBOs, do you track store hierarchy and characteristics like grade or size?",
    answer:
      "Yes - Store → City → Region structure. Each store has a grade (A/B/C) and size classification.",
    nodes: [
      { id: "city", label: "City", type: "Reference", color: "#85A383" },
      { id: "region", label: "Region", type: "Reference", color: "#85A383" },
      {
        id: "storeCluster",
        label: "Store Cluster",
        type: "Reference",
        color: "#85A383",
      },
    ],
    links: [
      { source: "store", target: "city", label: "in_city" },
      { source: "city", target: "region", label: "in_region" },
      { source: "store", target: "storeCluster", label: "member_of" },
    ],
  },
  {
    question:
      "That hierarchy will matter for allocation and replenishment. Speaking of which - how do you decide what merchandise goes to which stores?",
    answer:
      "We do pre-season ranging at the Option level based on store characteristics and demand forecasts. Then size distribution comes from size packs.",
    nodes: [
      {
        id: "ranging",
        label: "Assortment Ranging",
        type: "Context",
        color: "#0C2C18",
      },
      {
        id: "sizePack",
        label: "Size Pack",
        type: "Reference",
        color: "#85A383",
      },
    ],
    links: [
      { source: "ranging", target: "option", label: "ranges" },
      { source: "ranging", target: "store", label: "at_store" },
      { source: "sizePack", target: "storeCluster", label: "varies_by" },
    ],
  },
  {
    type: "system_assumption",
    question:
      "Let me confirm my understanding - you do initial allocation at season launch, then that's it? Or do you continuously replenish winners?",
    answer:
      "We do both. Initial allocation at launch, then continuous replenishment for selling styles - but only for EBO and LFS channels.",
    isCorrection: false,
    nodes: [
      {
        id: "allocation",
        label: "Initial Allocation",
        type: "Context",
        color: "#0C2C18",
      },
      {
        id: "replen",
        label: "Replenishment",
        type: "Context",
        color: "#0C2C18",
      },
    ],
    links: [
      { source: "replen", target: "channel", label: "applies_to_EBO_LFS" },
    ],
  },
  {
    question:
      "Makes sense - selective replenishment. What drives those replenishment decisions? Just sales velocity?",
    answer:
      "Sales velocity plus forward-looking demand forecast. We also check SKU lifecycle stage - Core always replenishes, seasonal depends on where we are in the season.",
    nodes: [
      {
        id: "forecast",
        label: "Demand Forecast",
        type: "Context",
        color: "#0C2C18",
      },
      {
        id: "lifecycle",
        label: "SKU Lifecycle",
        type: "Context",
        color: "#0C2C18",
      },
    ],
    links: [
      { source: "forecast", target: "option", label: "forecasts" },
      { source: "forecast", target: "store", label: "at_store" },
    ],
  },
  {
    question:
      "Smart - time-aware replenishment. Now for transactions - you're capturing sales at the line-item level with pricing details?",
    answer:
      "Yes, full transaction capture across all channels. We track actual selling price vs MRP to see realized discounts.",
    nodes: [
      {
        id: "saleTxn",
        label: "Sale Transaction",
        type: "Transaction",
        color: "#4A9B7F",
      },
      {
        id: "saleLine",
        label: "Sale Line",
        type: "Transaction",
        color: "#4A9B7F",
      },
      {
        id: "priceContext",
        label: "Price Context",
        type: "Context",
        color: "#0C2C18",
      },
    ],
    links: [
      { source: "saleTxn", target: "channel", label: "occurs_in" },
      { source: "saleTxn", target: "store", label: "at_store" },
      { source: "saleLine", target: "saleTxn", label: "part_of" },
      { source: "saleLine", target: "sku", label: "sells" },
      { source: "priceContext", target: "sku", label: "for_sku" },
    ],
  },
  {
    type: "system_assumption",
    question:
      "And returns - I'll model them as negative sales that reduce inventory at the return point, correct?",
    answer:
      "No - returns are separate entities. They're reverse flows that INCREASE inventory at the receiving location, not decrease sales.",
    isCorrection: true,
    nodes: [
      {
        id: "returnTxn",
        label: "Return Transaction",
        type: "Transaction",
        color: "#4A9B7F",
      },
    ],
    links: [
      { source: "returnTxn", target: "saleTxn", label: "references" },
      { source: "returnTxn", target: "channel", label: "occurs_in" },
    ],
    removeLinks: [],
  },
  {
    question:
      "Understood - returns create inventory. Can they land at different locations than the original sale?",
    answer:
      "Yes - same store, different store, or back to warehouse. We track all three scenarios.",
    nodes: [],
    links: [],
  },
  {
    question:
      "Final piece - physical inventory movement. How granular do you track the flow?",
    answer:
      "Very granular. Warehouse → Dispatch → In-transit → Receipt → Store. Every state and event is captured.",
    nodes: [
      { id: "warehouse", label: "Warehouse", type: "Core", color: "#5586A3" },
      {
        id: "invPos",
        label: "Inventory Position",
        type: "Context",
        color: "#0C2C18",
      },
      {
        id: "dispatch",
        label: "Dispatch",
        type: "Transaction",
        color: "#4A9B7F",
      },
    ],
    links: [
      { source: "warehouse", target: "invPos", label: "holds" },
      { source: "store", target: "invPos", label: "holds" },
      { source: "dispatch", target: "sku", label: "moves" },
    ],
  },
];
const KnowledgeGraphBuilder: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [typedUserText, setTypedUserText] = useState("");
  const [isSendActive, setIsSendActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<any>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasInitialized = useRef(false);

  // Zoom control functions
  const handleZoomIn = () => {
    if (!simulationRef.current?.svg || !simulationRef.current?.zoom) return;
    simulationRef.current.svg
      .transition()
      .duration(300)
      .call(simulationRef.current.zoom.scaleBy, 1.3);
  };

  const handleZoomOut = () => {
    if (!simulationRef.current?.svg || !simulationRef.current?.zoom) return;
    simulationRef.current.svg
      .transition()
      .duration(300)
      .call(simulationRef.current.zoom.scaleBy, 0.7);
  };

  const handleResetZoom = () => {
    if (!simulationRef.current?.resetZoom) return;
    simulationRef.current.resetZoom();
  };

  // Simulate user typing animation
  const simulateUserTyping = (text: string, callback: () => void) => {
    if (isComplete) return; // Don't start typing if already complete

    setIsUserTyping(true);
    setTypedUserText("");
    setIsSendActive(false);
    let currentIndex = 0;

    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < text.length) {
        setTypedUserText(text.substring(0, currentIndex + 1));
        currentIndex++;

        // Scroll textarea to bottom to keep cursor visible
        if (inputRef.current) {
          inputRef.current.scrollTop = inputRef.current.scrollHeight;
        }
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
        setIsUserTyping(false);

        // Activate send button briefly
        setIsSendActive(true);

        // Simulate send button click after brief delay
        setTimeout(() => {
          setIsSendActive(false);
          callback();
        }, 500);
      }
    }, 50); // Typing speed: 50ms per character
  };

  // Process Questt's response and update graph
  const processResponse = (stepIndex: number = currentStep) => {
    // Stop if conversation is already complete
    if (isComplete) return;

    const step = conversationFlow[stepIndex];

    // If no step exists, we're done
    if (!step) {
      if (!isComplete) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Perfect. Your knowledge graph is complete - every entity, relationship, and business rule is now mapped.",
          },
        ]);
        setIsComplete(true);
        setProgress(100);
      }
      return;
    }

    // Handle corrections
    if (step.removeLinks && step.removeLinks.length > 0) {
      setGraphData((prev) => ({
        ...prev,
        links: prev.links.filter(
          (l) =>
            !step.removeLinks!.some(
              (remove) =>
                l.source === remove.source && l.target === remove.target,
            ),
        ),
      }));
    }

    // Add new nodes and links
    setGraphData((prev) => {
      const newNodes = [...prev.nodes];
      const newLinks = [...prev.links];

      step.nodes.forEach((node) => {
        if (!newNodes.find((n) => n.id === node.id)) {
          newNodes.push({ ...node });
        }
      });

      step.links.forEach((link) => {
        const existingLink = newLinks.find(
          (l) =>
            (l.source as any).id === link.source &&
            (l.target as any).id === link.target,
        );
        if (!existingLink) {
          newLinks.push({ ...link });
        }
      });

      return { nodes: newNodes, links: newLinks };
    });

    const nextStepIndex = stepIndex + 1;
    setCurrentStep(nextStepIndex);
    setProgress(Math.round((nextStepIndex / conversationFlow.length) * 100));

    // Check if there are more questions
    setTimeout(() => {
      if (nextStepIndex >= conversationFlow.length) {
        // We've processed all steps, show completion message
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Perfect. Your knowledge graph is complete - every entity, relationship, and business rule is now mapped.",
          },
        ]);
        setIsComplete(true);
        setProgress(100);
      } else {
        // Continue with next question
        const nextStep = conversationFlow[nextStepIndex];
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: nextStep.question },
        ]);

        // Start typing user's answer after question appears
        setTimeout(() => {
          simulateUserTyping(nextStep.answer, () => {
            // Show the sent message immediately (button already had 500ms active delay)
            setMessages((prev) => [
              ...prev,
              {
                role: "user",
                text: nextStep.answer,
                isCorrection: nextStep.isCorrection,
              },
            ]);
            setTypedUserText("");

            // Show Questt typing indicator
            setTimeout(() => {
              setIsTyping(true);

              // Process response after typing
              setTimeout(() => {
                setIsTyping(false);
                processResponse(nextStepIndex); // Pass the next step index explicitly
              }, 2000);
            }, 500);
          });
        }, 1500);
      }
    }, 1000);
  };

  // Cleanup typing interval on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  // Initialize D3 force simulation with zoom and pan
  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create a container group for zoom/pan transformations
    const container = svg.append("g").attr("class", "zoom-container");
    const linkGroup = container.append("g").attr("class", "links");
    const nodeGroup = container.append("g").attr("class", "nodes");

    // Set up zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4]) // Min and max zoom levels
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });

    // Apply zoom to SVG
    svg.call(zoom);

    // Reset zoom function (can be called externally if needed)
    const resetZoom = () => {
      svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
    };

    const simulation = d3
      .forceSimulation<Node>()
      .force(
        "link",
        d3
          .forceLink<Node, Link>()
          .id((d) => d.id)
          .distance(150),
      )
      .force("charge", d3.forceManyBody<Node>().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide<Node>().radius(40));

    simulationRef.current = {
      simulation,
      linkGroup,
      nodeGroup,
      svg,
      zoom,
      resetZoom,
    };

    simulation.on("tick", () => {
      linkGroup
        .selectAll("line")
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      linkGroup
        .selectAll("text")
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);

      nodeGroup
        .selectAll("g")
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, []);

  // Update graph when graphData changes
  useEffect(() => {
    if (!simulationRef.current) return;

    const { simulation, linkGroup, nodeGroup } = simulationRef.current;

    simulation.nodes(graphData.nodes);
    simulation.force("link").links(graphData.links);

    // Update links
    const link = linkGroup
      .selectAll("line")
      .data(
        graphData.links,
        (d: any) => `${d.source.id || d.source}-${d.target.id || d.target}`,
      );

    link.exit().remove();

    link
      .enter()
      .append("line")
      .attr("class", "stroke-[#85A383] stroke-opacity-30")
      .attr("stroke-width", 1.5)
      .style("opacity", 0)
      .transition()
      .duration(600)
      .style("opacity", 1);

    // Update link labels
    const linkLabel = linkGroup
      .selectAll("text")
      .data(
        graphData.links,
        (d: any) => `${d.source.id || d.source}-${d.target.id || d.target}`,
      );

    linkLabel.exit().remove();

    linkLabel
      .enter()
      .append("text")
      .attr("class", "text-[9px] fill-[#878B87] pointer-events-none")
      .attr("text-anchor", "middle")
      .text((d: any) => d.label)
      .style("opacity", 0)
      .transition()
      .duration(600)
      .delay(300)
      .style("opacity", 1);

    // Update nodes
    const node = nodeGroup
      .selectAll("g")
      .data(graphData.nodes, (d: any) => d.id);

    node.exit().remove();

    const nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "node cursor-pointer")
      .call(
        d3
          .drag<any, Node>()
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
          }),
      );

    nodeEnter
      .append("circle")
      .attr("class", "transition-all duration-300 hover:r-[28px]")
      .attr("r", 24)
      .attr("fill", (d: Node) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("opacity", 0)
      .transition()
      .duration(600)
      .style("opacity", 1);

    nodeEnter
      .append("text")
      .attr(
        "class",
        "text-[13px] font-medium fill-[#1B2A21] pointer-events-none",
      )
      .attr("text-anchor", "middle")
      .attr("dy", 45)
      .text((d: Node) => d.label)
      .style("opacity", 0)
      .transition()
      .duration(600)
      .delay(200)
      .style("opacity", 1);

    nodeEnter
      .append("text")
      .attr(
        "class",
        "text-[9px] fill-[#878B87] pointer-events-none uppercase tracking-wider",
      )
      .attr("text-anchor", "middle")
      .attr("dy", 58)
      .text((d: Node) => d.type)
      .style("opacity", 0)
      .transition()
      .duration(600)
      .delay(300)
      .style("opacity", 0.7);

    simulation.alpha(1).restart();
  }, [graphData]);

  // Auto-scroll messages
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Process conversation steps
  useEffect(() => {
    // Start the conversation with the first question only once
    if (
      !hasInitialized.current &&
      currentStep === 0 &&
      messages.length === 0 &&
      !isComplete
    ) {
      hasInitialized.current = true;

      setTimeout(() => {
        const firstStep = conversationFlow[0];
        setMessages([{ role: "assistant", text: firstStep.question }]);

        // Start typing user's first answer
        setTimeout(() => {
          simulateUserTyping(firstStep.answer, () => {
            // Show the sent message immediately (button already had 500ms active delay)
            setMessages((prev) => [
              ...prev,
              {
                role: "user",
                text: firstStep.answer,
                isCorrection: firstStep.isCorrection,
              },
            ]);
            setTypedUserText("");

            // Show Questt typing indicator
            setTimeout(() => {
              setIsTyping(true);

              // Process response after typing
              setTimeout(() => {
                setIsTyping(false);
                processResponse(0); // Pass index 0 explicitly for first step
              }, 2000);
            }, 500);
          });
        }, 1500);
      }, 1000);
    }
  }, []);

  return (
    <div className="flex h-screen bg-white font-public text-[#1B2A21]">
      {/* LEFT PANEL - Conversation */}
      <div className="w-[450px] flex flex-col border-r border-[#0C2C18]/10">
        {/* Header */}
        <div className="px-8 pt-12 pb-8 border-b border-[#0C2C18]/8">
          <div className="text-[11px] font-medium text-[#878B87] tracking-[0.15em] uppercase mb-4">
            Step 1
          </div>
          <div className="text-[22px] font-light text-[#1B2A21] leading-tight tracking-tight">
            Let me understand your company
          </div>
        </div>

        {/* Messages */}
        <div
          ref={chatMessagesRef}
          className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-[#85A383]/30 hover:scrollbar-thumb-[#85A383]/50 scrollbar-track-transparent"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 animate-[fadeSlideIn_0.5s_ease_forwards] ${
                message.isCorrection ? "correction" : ""
              }`}
            >
              <div
                className={`text-[10px] font-medium text-[#878B87] tracking-[0.12em] uppercase ${message.role === "assistant" ? "text-left" : "text-right"}`}
              >
                {message.role === "assistant" ? "Questt" : "You"}
              </div>
              <div
                className={`text-[14px] leading-relaxed font-light ${
                  message.role === "user"
                    ? "bg-[#0C2C18]/4 px-5 py-4 rounded-md bg-gray-200"
                    : message.isCorrection
                      ? "bg-[#DF7649]/8 px-5 py-4 rounded-sm border-l-2 border-[#DF7649]"
                      : ""
                }`}
              >
                {message.text}
              </div>
              {message.isCorrection && (
                <div className="text-[11px] text-[#DF7649] font-medium mt-2 italic">
                  Graph updated based on clarification
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex flex-col gap-2">
              <div className="text-[10px] font-medium text-[#878B87] tracking-[0.12em] uppercase">
                Questt
              </div>
              <div className="flex gap-1.5 px-5 py-4 bg-[#0C2C18]/4 rounded-sm w-fit">
                <div className="w-1 h-1 bg-[#85A383] rounded-full animate-[typingPulse_1.4s_infinite]" />
                <div
                  className="w-1 h-1 bg-[#85A383] rounded-full animate-[typingPulse_1.4s_infinite_0.2s]"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-1 h-1 bg-[#85A383] rounded-full animate-[typingPulse_1.4s_infinite_0.4s]"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Input Box and Progress */}
        <div className="border-t border-[#0C2C18]/8">
          {/* Progress Bar */}
          <div className="px-8 pt-4 pb-3">
            <div className="text-[10px] font-medium text-[#878B87] tracking-[0.12em] uppercase mb-2">
              Graph Completion: <span>{progress}%</span>
            </div>
            <div className="h-0.5 bg-[#0C2C18]/10 relative overflow-hidden">
              <div
                className="h-full bg-[#85A383] transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Auto-typing Display */}
          <div className="px-8 pb-6 pt-3">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative border border-[#0C2C18]/20 rounded-sm">
                <textarea
                  ref={inputRef}
                  value={typedUserText}
                  readOnly
                  placeholder={
                    isComplete
                      ? "Conversation complete"
                      : isUserTyping
                        ? ""
                        : "Waiting for next question..."
                  }
                  rows={3}
                  className="w-full px-4 py-3 text-[14px] font-light bg-white cursor-default placeholder:text-[#878B87]/50 resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-[#85A383]/30 hover:scrollbar-thumb-[#85A383]/50 scrollbar-track-transparent"
                />
              </div>
              <button
                disabled={!isSendActive}
                className={`px-5 py-3 text-white text-[13px] font-medium rounded-sm flex items-center gap-2 transition-all duration-300 self-end ${
                  isSendActive
                    ? "bg-[#0C2C18] hover:bg-[#1B2A21] cursor-pointer scale-105 shadow-lg"
                    : "bg-[#878B87]/30 cursor-not-allowed scale-100"
                }`}
              >
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Knowledge Graph */}
      <div className="flex-1 relative overflow-hidden">
        {/* Graph Header */}
        <div className="absolute top-0 left-0 right-0 px-12 pt-12 pb-8 z-10 pointer-events-none">
          <div className="text-[14px] font-light text-[#85A383] tracking-[0.15em] uppercase mb-2">
            Network Visualization
          </div>
          <div className="text-[18px] font-light text-[#1B2A21] tracking-tight">
            HOAD operational model
          </div>
        </div>

        {/* Graph SVG */}
        <svg
          ref={svgRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Zoom Controls */}
        <div className="absolute top-8 right-8 flex flex-col gap-2 z-10">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-white/95 hover:bg-white border border-[#0C2C18]/10 rounded-sm flex items-center justify-center transition-colors group"
            title="Zoom In"
          >
            <svg
              className="w-5 h-5 text-[#1B2A21] group-hover:text-[#0C2C18]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 bg-white/95 hover:bg-white border border-[#0C2C18]/10 rounded-sm flex items-center justify-center transition-colors group"
            title="Zoom Out"
          >
            <svg
              className="w-5 h-5 text-[#1B2A21] group-hover:text-[#0C2C18]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <button
            onClick={handleResetZoom}
            className="w-10 h-10 bg-white/95 hover:bg-white border border-[#0C2C18]/10 rounded-sm flex items-center justify-center transition-colors group"
            title="Reset View"
          >
            <svg
              className="w-5 h-5 text-[#1B2A21] group-hover:text-[#0C2C18]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-8 right-8 bg-white/95 px-6 py-5 rounded-sm border border-[#0C2C18]/10">
          <div className="text-[10px] font-medium text-[#1B2A21] tracking-[0.12em] uppercase mb-4">
            Entity Types
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-[12px] text-[#1B2A21]">
              <div className="w-3.5 h-3.5 rounded-full bg-[#5586A3]" />
              <span>Core Entity</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12px] text-[#1B2A21]">
              <div className="w-3.5 h-3.5 rounded-full bg-[#0C2C18]" />
              <span>Context</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12px] text-[#1B2A21]">
              <div className="w-3.5 h-3.5 rounded-full bg-[#4A9B7F]" />
              <span>Transaction</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12px] text-[#1B2A21]">
              <div className="w-3.5 h-3.5 rounded-full bg-[#85A383]" />
              <span>Time/Reference</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typingPulse {
          0%,
          60%,
          100% {
            opacity: 0.3;
          }
          30% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default KnowledgeGraphBuilder;

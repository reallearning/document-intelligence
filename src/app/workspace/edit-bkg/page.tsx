"use client";
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import Link from "next/link";

// Type definitions
interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  description: string;
  size: number;
  color: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  id: string;
  source: string | Node;
  target: string | Node;
  type: string;
  description: string;
}

interface ColorOption {
  name: string;
  value: string;
}

interface NodeEditorProps {
  node: Node;
  nodes: Node[];
  links: Link[];
  onUpdate: (updatedNode: Node) => void;
  onDelete: (nodeId: string) => void;
  onClose: () => void;
  onLinkClick: (link: Link) => void;
  onNodeClick: (nodeId: string) => void;
}

interface LinkEditorProps {
  link: Link;
  nodes: Node[];
  onUpdate: (updatedLink: Link) => void;
  onDelete: (linkId: string) => void;
  onClose: () => void;
}

type EditMode = "node" | "link" | null;

type SelectedItem = Node | Link | null;

const FashionRetailKG = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "company",
      name: "Company",
      description: "Parent company with legal entities, GSTINs",
      size: 20,
      color: "#3B82F6",
    },
    {
      id: "brand",
      name: "Brand",
      description:
        "Brand with positioning, target segments (AND, Anita Dongre, Global Desi)",
      size: 18,
      color: "#3B82F6",
    },
    {
      id: "collection",
      name: "Collection/Season",
      description:
        "Seasonal collections (SS/AW/Resort/Festive) with theme, launch dates",
      size: 16,
      color: "#8B5CF6",
    },
    {
      id: "category",
      name: "Category",
      description: "Top-level categories (Womenswear/Menswear/Jewellery)",
      size: 14,
      color: "#6B7280",
    },
    {
      id: "subcategory",
      name: "Subcategory",
      description: "Product subcategories (Kurtas/Tops/Dresses/Sarees/Lehenga)",
      size: 14,
      color: "#6B7280",
    },
    {
      id: "productline",
      name: "ProductLine",
      description: "Business model lines (Ethnic/Western/Fusion/Bridal)",
      size: 14,
      color: "#6B7280",
    },
    {
      id: "lifecyclepolicy",
      name: "LifecyclePolicy",
      description:
        "Lifecycle rules (Core/Seasonal/Outlet) with markdown phases",
      size: 13,
      color: "#6B7280",
    },
    {
      id: "style",
      name: "Style",
      description: "Design with fabric, craft, MRP, lifecycle stage",
      size: 16,
      color: "#8B5CF6",
    },
    {
      id: "sku",
      name: "SKU",
      description: "Stock unit with color, size, barcode, MRP, cost",
      size: 16,
      color: "#8B5CF6",
    },
    {
      id: "store",
      name: "Store",
      description:
        "Physical store with format (EBO/SIS/Outlet), size, catchment profile",
      size: 16,
      color: "#06B6D4",
    },
    {
      id: "channel",
      name: "Channel",
      description: "Sales channel (Own POS/Partner/E-com/Marketplace)",
      size: 15,
      color: "#06B6D4",
    },
    {
      id: "inventorynode",
      name: "InventoryNode",
      description: "Inventory location (Store/DC/Factory/Marketplace FC)",
      size: 14,
      color: "#06B6D4",
    },
    {
      id: "vendor",
      name: "Vendor",
      description: "Supplier with type, lead times, MOQs, quality scores",
      size: 16,
      color: "#F59E0B",
    },
    {
      id: "pricelist",
      name: "PriceList",
      description: "Pricing by country, currency, tax policy",
      size: 14,
      color: "#EF4444",
    },
    {
      id: "promotion",
      name: "Promotion/Campaign",
      description: "Marketing campaigns with budget, KPI targets, mechanics",
      size: 14,
      color: "#EF4444",
    },
    {
      id: "customersegment",
      name: "CustomerSegment",
      description: "Anonymous segments with AOV, frequency, price sensitivity",
      size: 14,
      color: "#EC4899",
    },
    {
      id: "event",
      name: "Event",
      description: "External events (holidays/festivals/EOSS) with geo scope",
      size: 12,
      color: "#10B981",
    },
    {
      id: "kpi",
      name: "KPI",
      description: "Key performance indicators (SellThru%, WOC, GM%, ROAS)",
      size: 12,
      color: "#8B5CF6",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    {
      id: "l1",
      source: "company",
      target: "brand",
      type: "OWNS",
      description: "Company owns brand",
    },
    {
      id: "l2",
      source: "brand",
      target: "collection",
      type: "LAUNCHED",
      description: "Brand launches collection",
    },
    {
      id: "l3",
      source: "collection",
      target: "style",
      type: "CONTAINS_STYLE",
      description: "Collection contains styles",
    },
    {
      id: "l4",
      source: "style",
      target: "sku",
      type: "MATERIALIZES_AS",
      description: "Style materializes as SKUs with size/color variants",
    },
    {
      id: "l5",
      source: "style",
      target: "subcategory",
      type: "CLASSIFIED_AS",
      description: "Style classified by subcategory",
    },
    {
      id: "l6",
      source: "subcategory",
      target: "category",
      type: "BELONGS_TO",
      description: "Subcategory belongs to category",
    },
    {
      id: "l7",
      source: "style",
      target: "lifecyclepolicy",
      type: "GOVERNED_BY",
      description: "Style governed by lifecycle policy",
    },
    {
      id: "l8",
      source: "style",
      target: "productline",
      type: "BELONGS_TO",
      description: "Style belongs to product line",
    },
    {
      id: "l9",
      source: "sku",
      target: "inventorynode",
      type: "LISTED_AT",
      description: "SKU listed at inventory node (assortment, planogram slot)",
    },
    {
      id: "l10",
      source: "inventorynode",
      target: "store",
      type: "LOCATED_AT",
      description: "Inventory node located at store",
    },
    {
      id: "l11",
      source: "sku",
      target: "inventorynode",
      type: "IN_STOCK_AT",
      description: "SKU in stock with qty, ROP, safety stock",
    },
    {
      id: "l12",
      source: "sku",
      target: "pricelist",
      type: "PRICED_BY",
      description: "SKU priced by price list with MRP, tax",
    },
    {
      id: "l13",
      source: "promotion",
      target: "sku",
      type: "TARGETS_SKU",
      description: "Promotion targets SKU with discount mechanics",
    },
    {
      id: "l14",
      source: "promotion",
      target: "store",
      type: "TARGETS_STORE",
      description: "Promotion targets specific stores",
    },
    {
      id: "l15",
      source: "promotion",
      target: "channel",
      type: "TARGETS_CHANNEL",
      description: "Promotion targets sales channel",
    },
    {
      id: "l16",
      source: "promotion",
      target: "customersegment",
      type: "TARGETS_SEGMENT",
      description: "Promotion targets customer segment",
    },
    {
      id: "l17",
      source: "event",
      target: "store",
      type: "AFFECTS",
      description: "Event affects store with uplift factor",
    },
    {
      id: "l18",
      source: "vendor",
      target: "style",
      type: "SUPPLIES",
      description: "Vendor supplies style with lead time, MOQ, cost",
    },
    {
      id: "l19",
      source: "store",
      target: "channel",
      type: "SELLS_VIA",
      description: "Store sells via channel",
    },
    {
      id: "l20",
      source: "customersegment",
      target: "brand",
      type: "PREFERS",
      description: "Customer segment prefers brand (affinity score)",
    },
    {
      id: "l21",
      source: "customersegment",
      target: "style",
      type: "PREFERS",
      description: "Customer segment prefers style (affinity score)",
    },
    {
      id: "l22",
      source: "kpi",
      target: "store",
      type: "MEASURES",
      description: "KPI measures store performance",
    },
    {
      id: "l23",
      source: "kpi",
      target: "sku",
      type: "MEASURES",
      description: "KPI measures SKU performance",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);

  useEffect(() => {
    createVisualization();
  }, [nodes, links]);

  useEffect(() => {
    updateSelection();
  }, [selectedItem, editMode]);

  const updateSelection = () => {
    const svg = d3.select(svgRef.current);

    svg
      .selectAll<SVGLineElement, Link>(".link")
      .attr("stroke", (d) =>
        selectedItem &&
        "id" in selectedItem &&
        selectedItem.id === d.id &&
        editMode === "link"
          ? "#3B82F6"
          : "#E5E7EB"
      )
      .attr("stroke-width", (d) =>
        selectedItem &&
        "id" in selectedItem &&
        selectedItem.id === d.id &&
        editMode === "link"
          ? 2.5
          : 1.5
      )
      .attr("marker-end", (d) =>
        selectedItem &&
        "id" in selectedItem &&
        selectedItem.id === d.id &&
        editMode === "link"
          ? "url(#arrowhead-selected)"
          : "url(#arrowhead)"
      );

    svg.selectAll<SVGGElement, Node>(".node").each(function (d) {
      const node = d3.select(this);
      const isSelected =
        selectedItem &&
        "id" in selectedItem &&
        selectedItem.id === d.id &&
        editMode === "node";

      node.selectAll(".node-glow").remove();

      if (isSelected) {
        node
          .insert("circle", ":first-child")
          .attr("class", "node-glow")
          .attr("r", d.size + 8)
          .attr("fill", "none")
          .attr("stroke", "#3B82F6")
          .attr("stroke-width", 2)
          .attr("opacity", 0.5);
      }

      node
        .select("circle:not(.node-glow)")
        .attr("stroke", isSelected ? "#3B82F6" : "#fff")
        .attr("stroke-width", isSelected ? 3 : 2);
    });
  };

  const createVisualization = () => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = 1000;
    const height = 650;

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

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d) => d.id)
          .distance(180)
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide<Node>().radius((d) => d.size + 25)
      );

    simulationRef.current = simulation;

    const linkHitbox = g
      .selectAll<SVGLineElement, Link>(".link-hitbox")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link-hitbox")
      .attr("stroke", "transparent")
      .attr("stroke-width", 20)
      .style("cursor", "pointer")
      .on("click", (event: MouseEvent, d: Link) => {
        event.stopPropagation();
        setSelectedItem({ ...d });
        setEditMode("link");
      })
      .on("mouseenter", function (event: MouseEvent, d: Link) {
        const linkElement = d3.select<SVGLineElement, Link>(
          this.nextSibling as SVGLineElement
        );
        linkElement.attr(
          "data-original-width",
          linkElement.attr("stroke-width")
        );
        linkElement.attr("data-original-stroke", linkElement.attr("stroke"));
        linkElement.attr("stroke-width", 3).attr("stroke", "#9CA3AF");
      })
      .on("mouseleave", function (event: MouseEvent, d: Link) {
        const linkElement = d3.select<SVGLineElement, Link>(
          this.nextSibling as SVGLineElement
        );
        const originalWidth = linkElement.attr("data-original-width");
        const originalStroke = linkElement.attr("data-original-stroke");
        if (originalWidth && originalStroke) {
          linkElement
            .attr("stroke-width", originalWidth)
            .attr("stroke", originalStroke);
        }
      });

    const link = g
      .selectAll<SVGLineElement, Link>(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#E5E7EB")
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrowhead)");

    const node = g
      .selectAll<SVGGElement, Node>(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .on("click", (event: MouseEvent, d: Node) => {
        event.stopPropagation();
        setSelectedItem({ ...d });
        setEditMode("node");
      })
      .call(
        d3
          .drag<SVGGElement, Node>()
          .on("start", (event: d3.D3DragEvent<SVGGElement, Node, Node>) => {
            if (!event.active && simulationRef.current)
              simulationRef.current.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          })
          .on("drag", (event: d3.D3DragEvent<SVGGElement, Node, Node>) => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          })
          .on("end", (event: d3.D3DragEvent<SVGGElement, Node, Node>) => {
            if (!event.active && simulationRef.current)
              simulationRef.current.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          })
      );

    node
      .append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    node
      .append("text")
      .text((d) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", (d) => d.size + 15)
      .attr("font-size", "11px")
      .attr("fill", "#374151")
      .attr("font-weight", "500")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x || 0)
        .attr("y1", (d) => (d.source as Node).y || 0)
        .attr("x2", (d) => (d.target as Node).x || 0)
        .attr("y2", (d) => (d.target as Node).y || 0);

      linkHitbox
        .attr("x1", (d) => (d.source as Node).x || 0)
        .attr("y1", (d) => (d.source as Node).y || 0)
        .attr("x2", (d) => (d.target as Node).x || 0)
        .attr("y2", (d) => (d.target as Node).y || 0);

      node.attr("transform", (d) => `translate(${d.x || 0},${d.y || 0})`);
    });

    svg.on("click", () => {
      setSelectedItem(null);
      setEditMode(null);
    });
  };

  const handleNodeUpdate = (updatedNode: Node) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === updatedNode.id ? updatedNode : n))
    );
    setSelectedItem(updatedNode);
  };

  const handleNodeDelete = (nodeId: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setLinks((prev) =>
      prev.filter((l) => {
        const sourceId = typeof l.source === "object" ? l.source.id : l.source;
        const targetId = typeof l.target === "object" ? l.target.id : l.target;
        return sourceId !== nodeId && targetId !== nodeId;
      })
    );
    setSelectedItem(null);
    setEditMode(null);
  };

  const handleLinkUpdate = (updatedLink: Link) => {
    setLinks((prev) =>
      prev.map((l) => (l.id === updatedLink.id ? updatedLink : l))
    );
    setSelectedItem(updatedLink);
  };

  const handleLinkDelete = (linkId: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== linkId));
    setSelectedItem(null);
    setEditMode(null);
  };

  const handleLinkClick = (link: Link) => {
    setSelectedItem({ ...link });
    setEditMode("link");
  };

  const handleNodeClick = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setSelectedItem({ ...node });
      setEditMode("node");
    }
  };

  const handleAddNode = () => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      name: "New Node",
      description: "New node description",
      size: 14,
      color: "#6B7280",
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedItem(newNode);
    setEditMode("node");
    setShowAddMenu(false);
  };

  const handleAddLink = () => {
    if (nodes.length < 2) {
      alert("You need at least 2 nodes to create a relationship");
      return;
    }
    const newLink: Link = {
      id: `link-${Date.now()}`,
      source: nodes[0].id,
      target: nodes[1].id,
      type: "NEW_RELATIONSHIP",
      description: "New relationship description",
    };
    setLinks((prev) => [...prev, newLink]);
    setSelectedItem(newLink);
    setEditMode("link");
    setShowAddMenu(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Canvas */}
      <div className="flex-1 relative">
        <div className="p-4">
          <p className="text-sm text-gray-400 mb-2">2/6</p>
          <h1 className="text-4xl font-serif text-gray-900 mb-3">
            Business Ontology
          </h1>
          <p className="text-gray-500 text-lg">
            Here’s how I currently understand how the business is structured and
            works. Take a quick look and add or edit (click on any
            node/relationship) anything that helps make it more accurate.
          </p>
        </div>
        <svg ref={svgRef} className="w-full h-full bg-white" />

        {/* Add Button */}
        <div className="absolute bottom-6 right-6">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

          {showAddMenu && (
            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 py-2 w-48">
              <button
                onClick={handleAddNode}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                type="button"
              >
                + Add Node
              </button>
              <button
                onClick={handleAddLink}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                type="button"
              >
                + Add Relationship
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="flex flex-col w-96 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6 flex-1">
          {selectedItem && editMode === "node" && (
            <NodeEditor
              node={selectedItem as Node}
              nodes={nodes}
              links={links}
              onUpdate={handleNodeUpdate}
              onDelete={handleNodeDelete}
              onClose={() => {
                setSelectedItem(null);
                setEditMode(null);
              }}
              onLinkClick={handleLinkClick}
              onNodeClick={handleNodeClick}
            />
          )}

          {selectedItem && editMode === "link" && (
            <LinkEditor
              link={selectedItem as Link}
              nodes={nodes}
              onUpdate={handleLinkUpdate}
              onDelete={handleLinkDelete}
              onClose={() => {
                setSelectedItem(null);
                setEditMode(null);
              }}
            />
          )}

          {!selectedItem && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <p className="text-gray-500 text-sm">
                Click on a node or relationship to edit
              </p>
            </div>
          )}
        </div>
        <Link className="ml-5 mb-4" href={"/workspace/question-selection"}>
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
    </div>
  );
};

const NodeEditor: React.FC<NodeEditorProps> = ({
  node,
  nodes,
  links,
  onUpdate,
  onDelete,
  onClose,
  onLinkClick,
  onNodeClick,
}) => {
  const [name, setName] = useState(node.name);
  const [description, setDescription] = useState(node.description);
  const [color, setColor] = useState(node.color);

  const colors: ColorOption[] = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Gray", value: "#6B7280" },
    { name: "Cyan", value: "#06B6D4" },
    { name: "Orange", value: "#F59E0B" },
    { name: "Red", value: "#EF4444" },
    { name: "Pink", value: "#EC4899" },
    { name: "Green", value: "#10B981" },
  ];

  const handleSave = () => {
    onUpdate({ ...node, name, description, color });
  };

  const outgoingLinks = links.filter((l) => {
    const sourceId = typeof l.source === "object" ? l.source.id : l.source;
    return sourceId === node.id;
  });

  const incomingLinks = links.filter((l) => {
    const targetId = typeof l.target === "object" ? l.target.id : l.target;
    return targetId === node.id;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Edit Node</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">
          Node name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter node name"
        />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">
          Node description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="This is a node description..."
        />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-3">
          Color
        </label>
        <div className="flex gap-2 flex-wrap">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => setColor(c.value)}
              className={`w-8 h-8 rounded-full transition-all ${
                color === c.value ? "ring-2 ring-offset-2 ring-gray-400" : ""
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-3">
          Linked nodes
        </label>
        {outgoingLinks.length === 0 && incomingLinks.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No connections yet</p>
        ) : (
          <div className="space-y-2">
            {[...outgoingLinks, ...incomingLinks].map((link) => {
              const isOutgoing = outgoingLinks.includes(link);
              const connectedNodeId = isOutgoing
                ? typeof link.target === "object"
                  ? link.target.id
                  : link.target
                : typeof link.source === "object"
                ? link.source.id
                : link.source;
              const connectedNode = nodes.find((n) => n.id === connectedNodeId);

              return (
                <div key={link.id} className="flex items-center gap-2 text-sm">
                  <button
                    onClick={() => onLinkClick(link)}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                    type="button"
                  >
                    {link.type}
                  </button>
                  <span className="text-gray-400">→</span>
                  <button
                    onClick={() => onNodeClick(connectedNodeId)}
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                    type="button"
                  >
                    {connectedNode?.name}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors mb-3"
        type="button"
      >
        Save changes
      </button>

      <button
        onClick={() => {
          if (
            window.confirm(
              "Delete this node? All connected relationships will also be deleted."
            )
          ) {
            onDelete(node.id);
          }
        }}
        className="w-full text-red-600 py-2 text-sm hover:text-red-700 transition-colors"
        type="button"
      >
        Delete node
      </button>
    </div>
  );
};

const LinkEditor: React.FC<LinkEditorProps> = ({
  link,
  nodes,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const [type, setType] = useState(link.type);
  const [description, setDescription] = useState(link.description);
  const [sourceId, setSourceId] = useState(
    typeof link.source === "object" ? link.source.id : link.source
  );
  const [targetId, setTargetId] = useState(
    typeof link.target === "object" ? link.target.id : link.target
  );

  const handleSave = () => {
    onUpdate({
      ...link,
      type,
      description,
      source: sourceId,
      target: targetId,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Edit Relationship
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">
          Relationship Type
        </label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., OWNS, SUPPLIES"
        />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Enter description"
        />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">
          Source Node
        </label>
        <select
          value={sourceId}
          onChange={(e) => setSourceId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">
          Target Node
        </label>
        <select
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          {nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSave}
        className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors mb-3"
        type="button"
      >
        Save changes
      </button>

      <button
        onClick={() => {
          if (window.confirm("Delete this relationship?")) {
            onDelete(link.id);
          }
        }}
        className="w-full text-red-600 py-2 text-sm hover:text-red-700 transition-colors"
        type="button"
      >
        Delete relationship
      </button>
    </div>
  );
};

export default FashionRetailKG;

"use client";
import * as d3 from "d3";

import { useEffect, useRef, useState } from "react";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  description: string;
  size: number;
  color: string;
  type: "bkg" | "source";
  width?: number;
  height?: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  id: string;
  source: string | Node;
  target: string | Node;
  type: string;
  description: string;
  linkType: "bkg" | "data";
  nlQuery?: string;
  dataContext?: string;
}

export default function Page() {
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInitialMount = useRef(true);
  const [selectedItem, setSelectedItem] = useState<Node | Link | null>(null);
  const [editMode, setEditMode] = useState<"node" | "link" | "datalink" | null>(
    null,
  );
  const [nodes, setNodes] = useState<Node[]>([
    // =========================
    // ENTERPRISE
    // =========================
    {
      id: "company",
      name: "Tractor Supply Company",
      description:
        "US rural lifestyle retailer operating a large store footprint and digital channels. Core planning problem: localize assortment and inventory across regions and seasons while supporting omnichannel fulfillment at low total cost.",
      size: 32,
      width: 260,
      height: 110,
      color: "#1f77b4",
      type: "bkg",
    },

    // =========================
    // MACRO BUSINESS AREAS (no 'Function:' prefix)
    // =========================
    {
      id: "macro_merch",
      name: "Merchandising & Assortment",
      description:
        "Category strategy, store ranging, seasonal sets, and planogram governance. Ensures stores carry the most locally relevant products and depth.",
      size: 26,
      width: 240,
      height: 95,
      color: "#0b4f6c",
      type: "bkg",
    },
    {
      id: "macro_sc",
      name: "Supply Chain & Inventory",
      description:
        "Forecast consumption, set replenishment parameters, allocate inventory, and manage network buffers across DCs and stores to deliver in-stock performance.",
      size: 26,
      width: 240,
      height: 95,
      color: "#0b4f6c",
      type: "bkg",
    },
    {
      id: "macro_pricing",
      name: "Pricing & Promotions",
      description:
        "Price zones, local overrides, promo design, and markdown governance. Balances traffic/volume goals with margin protection.",
      size: 26,
      width: 240,
      height: 95,
      color: "#0b4f6c",
      type: "bkg",
    },
    {
      id: "macro_omni",
      name: "Omnichannel Fulfillment",
      description:
        "Order promise, routing (store vs DC), inventory reservation, and last-mile execution. Optimizes cost-to-serve while protecting SLAs.",
      size: 26,
      width: 240,
      height: 95,
      color: "#0b4f6c",
      type: "bkg",
    },
    {
      id: "macro_storeops",
      name: "Store Operations",
      description:
        "Shelf execution, labor planning, cycle counts, shrink controls, and pick/pack operations. Determines inventory accuracy and operational throughput.",
      size: 26,
      width: 240,
      height: 95,
      color: "#0b4f6c",
      type: "bkg",
    },
    {
      id: "macro_sales",
      name: "Sales & Customer",
      description:
        "Customer engagement, loyalty, segmentation, and channel mix. Converts availability and relevance into revenue and retention.",
      size: 26,
      width: 240,
      height: 95,
      color: "#0b4f6c",
      type: "bkg",
    },
    {
      id: "macro_fin",
      name: "Finance & Performance",
      description:
        "Margin, working capital, cash, and initiative ROI governance. Sets targets and guardrails for trade-offs across functions.",
      size: 26,
      width: 240,
      height: 95,
      color: "#0b4f6c",
      type: "bkg",
    },

    // =========================
    // LOCATION / NETWORK ENTITIES
    // =========================
    {
      id: "region",
      name: "Region",
      description:
        "Geographic roll-up for planning targets and governance. Used to aggregate performance and to deploy regional seasonality assumptions.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "district",
      name: "District",
      description:
        "Operational management unit between region and store. Used for labor, compliance, and execution accountability.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "store",
      name: "Store",
      description:
        "Primary execution node. Holds shelf/backroom inventory, drives walk-in demand, and fulfills pickup/ship-from-store where enabled.",
      size: 24,
      width: 220,
      height: 90,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "store_format",
      name: "Store Format",
      description:
        "Store archetype describing size/layout (planogram capacity, garden center footprint, backroom capacity) and service capabilities.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "catchment",
      name: "Store Catchment",
      description:
        "Store trade area capturing local demand drivers: demographics, rural density, livestock proxy, competitor proximity, and typical seasonal weather patterns.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "dc",
      name: "Distribution Center (DC)",
      description:
        "Upstream inventory node feeding stores. Determines lead time, supply availability, and feasible replenishment cadence.",
      size: 24,
      width: 220,
      height: 90,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "supplier_location",
      name: "Supplier Ship Point",
      description:
        "Vendor shipping origin that constrains lead time and variability. Used to model replenishment feasibility and upstream risk.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "in_transit_location",
      name: "In-Transit",
      description:
        "Logical node representing inventory that has shipped but not yet received. Critical for promise accuracy and true available-to-promise calculations.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },

    // =========================
    // PRODUCT / MERCH HIERARCHY
    // =========================
    {
      id: "product",
      name: "Product",
      description:
        "Product concept anchoring merchandising hierarchy (category → subcategory → brand → item → pack → SKU) and attributes used in planning and execution.",
      size: 24,
      width: 220,
      height: 90,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "category",
      name: "Category",
      description:
        "Top-level merchandising grouping (e.g., Companion Animal, Livestock/Equine, Seasonal & Recreation). Drives demand drivers, promo behavior, and service targets.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "subcategory",
      name: "Subcategory",
      description:
        "Finer group under category (e.g., Dog Food, Poultry Feed, Lawn Care). Primary level for assortment localization and space allocation.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "brand",
      name: "Brand",
      description:
        "National brand or private label. Influences substitution behavior, elasticity, vendor constraints, and gross margin.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "item",
      name: "Item",
      description:
        "Merchandising item definition (product line) that can map to multiple pack variants and SKUs; used for rationalization and substitution logic.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "pack",
      name: "Pack / Size Variant",
      description:
        "Pack-size or variant of an item (e.g., 5lb vs 20lb). Affects shelf space/cube, price laddering, and substitution (downsize/upsize).",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "sku",
      name: "SKU",
      description:
        "Atomic inventory and sales unit (UPC/SKU). Joins to inventory, pricing, promotions, planograms, replenishment, and fulfillment reservations.",
      size: 18,
      width: 205,
      height: 80,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "sku_attributes",
      name: "SKU Attributes",
      description:
        "Operational/commercial constraints used in decisions: cube/weight, shelf-life, hazardous flags, seasonality tags, storage needs, KVI flag, margin profile.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },

    // =========================
    // CUSTOMER / DEMAND ENTITIES
    // =========================
    {
      id: "customer",
      name: "Customer",
      description:
        "Identified or anonymous shopper. Connects to loyalty, purchase history, channel usage, and offer responsiveness.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "customer_segment",
      name: "Customer Segment",
      description:
        "Need-state clusters (pet owner, hobby farmer, rancher, B2B/bulk). Drives localized assortment, service level targets, and promo targeting.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "loyalty_profile",
      name: "Loyalty Profile",
      description:
        "Customer membership attributes (tenure, tier, RFM, preferences, redemptions). Used for segment inference and personalization.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },

    // =========================
    // TRANSACTIONS / EVENTS (granular)
    // =========================
    {
      id: "sales_transaction",
      name: "Sales Transaction",
      description:
        "Atomic purchase event (POS or ecom capture). Contains timestamp, store attribution, tender, and one or more line items.",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "sales_line",
      name: "Sales Line Item",
      description:
        "SKU-level line within a transaction: quantity, unit price, discount/markdown reason codes, and realized margin basis at time of sale.",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "sale_type",
      name: "Sale Type",
      description:
        "Classification of sale event: walk-in store sale, BOPIS pickup sale, ship-to-home, ship-from-store, local delivery. Separates demand vs fulfillment effects.",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "order",
      name: "Customer Order",
      description:
        "Omnichannel order object capturing items, fulfillment choice, promise date/time, and customer communication state.",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "order_line",
      name: "Order Line Item",
      description:
        "SKU-level order line with quantity, promised fulfillment method, substitutions, and cancellations where applicable.",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "fulfillment_task",
      name: "Fulfillment Task",
      description:
        "Execution unit for pick/pack/stage. Tracks labor minutes, exceptions (can’t find item), substitutions, and completion time for pickup/delivery readiness.",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "reservation",
      name: "Inventory Reservation",
      description:
        "Logical hold of ATP inventory for an order/promise. Prevents double-selling and drives cancellations when accuracy is poor.",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "shipment",
      name: "Shipment",
      description:
        "Physical shipment event (supplier→DC, DC→store, store/DC→customer). Tracks carrier, status, ETA, and cost; delays propagate into availability issues.",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "transfer",
      name: "Transfer",
      description:
        "Inventory movement between locations (DC→store, store→store, DC→DC) used to correct imbalances and protect in-stock where demand is highest.",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "purchase_order",
      name: "Purchase Order",
      description:
        "Procurement order to supplier for SKUs with quantities, costs, ship dates, and receiving location. Core object for lead-time and supply risk modeling.",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "return",
      name: "Return / Refund",
      description:
        "Reverse transaction linked to original sale where possible. Includes reason codes and disposition which determine whether value is recovered.",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "return_line",
      name: "Return Line Item",
      description:
        "SKU-level return line with quantity returned, refund amount, and disposition (restockable, damaged, clearance).",
      size: 11,
      width: 170,
      height: 62,
      color: "#1f77b4",
      type: "bkg",
    },
    {
      id: "return_disposition",
      name: "Return Disposition",
      description:
        "Outcome category for a return: restockable, damaged, vendor return, liquidation/clearance. Determines recovered margin and future inventory availability.",
      size: 14,
      width: 185,
      height: 70,
      color: "#1f77b4",
      type: "bkg",
    },

    // =========================
    // INVENTORY DOMAIN (high granularity)
    // =========================
    {
      id: "inventory_position",
      name: "Inventory Position",
      description:
        "SKU × location state: on-hand, on-order, in-transit, reserved, and available-to-promise. Basis for in-stock, promise accuracy, and replenishment triggers.",
      size: 24,
      width: 220,
      height: 90,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "atp",
      name: "Available-to-Promise (ATP)",
      description:
        "Sellable inventory after subtracting reservations, holds, and exceptions. Used to make promises and to prevent over-commitment.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "safety_stock",
      name: "Safety Stock",
      description:
        "Buffer inventory chosen to protect a service level given demand variability and lead-time variability by SKU-store/category.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "inventory_accuracy",
      name: "Inventory Accuracy",
      description:
        "Alignment between system on-hand and physical on-hand. Drives shelf availability, BOPIS cancellations, and trust in ATP/promise logic.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "cycle_count",
      name: "Cycle Count Process",
      description:
        "Operational process for counting, reconciling, and adjusting inventory. Frequency and targeting determine accuracy and shrink detection speed.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },

    // =========================
    // PLANNING / CONTROL COMPONENTS
    // =========================
    {
      id: "assortment_plan",
      name: "Assortment Plan",
      description:
        "Store-level ranged set (core + local) and depth intent by season. Upstream driver of space allocation, replenishment and working capital.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "planogram_space",
      name: "Shelf Space & Planograms",
      description:
        "Physical constraint model (facings, bays, endcaps, garden center capacity). Limits assortment breadth and depth, especially for bulky categories.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "demand_forecast",
      name: "Demand Forecast",
      description:
        "Predicted consumption by SKU-store-time that drives replenishment and allocation. Must incorporate weather, seasonality, promotions, and local mission mix.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "service_level_policy",
      name: "Service Level Policy",
      description:
        "Target fill/in-stock service levels by category/SKU cluster and store type. Encodes the customer promise and cost trade-offs into buffers.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "replenishment_policy",
      name: "Replenishment Policy",
      description:
        "Parameters and rules for reorder points, reorder quantities, cadence, and exception handling by SKU-location (store/DC).",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "allocation_policy",
      name: "Allocation Policy",
      description:
        "Rules for distributing limited supply across DCs/stores and for rebalancing inventory based on demand priority and service level targets.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "pricing_policy",
      name: "Pricing Policy",
      description:
        "Base price lists and local override logic, including guardrails to protect margin while responding to local competitive context.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "price_zone",
      name: "Price Zone",
      description:
        "Store grouping for consistent pricing strategy driven by competitive intensity and customer mix. Enables governance with local override exceptions.",
      size: 14,
      width: 185,
      height: 70,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "promo_calendar",
      name: "Promotion Calendar",
      description:
        "Planned promos by time window, store cluster, and SKU/category. Must align with inventory readiness to avoid ‘promote into stockouts’.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "markdown_policy",
      name: "Markdown Policy",
      description:
        "Clearance/markdown rules and cadence for aged inventory. Trades recovered cash vs margin erosion vs space recovery for new season sets.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "omni_orchestration",
      name: "Omnichannel Orchestration",
      description:
        "Decision logic that selects fulfillment node, reserves inventory, and sets promise times while protecting store workload and cost-to-serve.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "store_ops_capacity",
      name: "Store Ops Capacity",
      description:
        "Labor hours, backroom capacity, and execution bandwidth available for shelf replenishment, cycle counts, and pick/pack tasks.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "shrink_control",
      name: "Shrink Control",
      description:
        "Controls and analytics for detecting, preventing, and accounting for shrink. Key driver of inventory accuracy and margin leakage.",
      size: 18,
      width: 205,
      height: 80,
      color: "#2ca02c",
      type: "bkg",
    },

    // =========================
    // FULFILLMENT / LAST-MILE COMPONENTS
    // =========================
    {
      id: "fulfillment_mode",
      name: "Fulfillment Mode",
      description:
        "How demand is served: walk-in, BOPIS/curbside pickup, ship-to-home, ship-from-store, local delivery. Determines cost and SLA expectations.",
      size: 14,
      width: 185,
      height: 70,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "carrier",
      name: "Carrier",
      description:
        "Shipping/delivery provider used for shipments. Performance affects delivery SLA, cost, and customer experience.",
      size: 14,
      width: 185,
      height: 70,
      color: "#2ca02c",
      type: "bkg",
    },
    {
      id: "delivery_slot",
      name: "Delivery Slot",
      description:
        "Planned delivery window allocated to capacity. Slot design trades customer convenience vs routing efficiency and delivery cost.",
      size: 14,
      width: 185,
      height: 70,
      color: "#2ca02c",
      type: "bkg",
    },

    // =========================
    // KPI / METRICS (broad coverage)
    // =========================
    {
      id: "kpi_sales",
      name: "Sales",
      description: "Net sales by store/category/SKU/channel/time.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_units",
      name: "Units Sold",
      description:
        "Units sold by SKU/store/channel. Separates volume-driven changes from price/mix.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_aov",
      name: "Average Order Value (AOV)",
      description:
        "Average order revenue; influenced by basket attach and assortment relevance.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_traffic",
      name: "Store Traffic",
      description:
        "Customer visits/footfall; used to separate demand creation from conversion and availability.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_conversion",
      name: "Conversion Rate",
      description:
        "Share of visits converting to purchases; sensitive to in-stock and assortment relevance.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_online_share",
      name: "Online Sales Mix",
      description:
        "Share of sales from digital channels; influenced by promise accuracy and fulfillment cost-to-serve.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },

    {
      id: "kpi_instock",
      name: "In-Stock Rate",
      description:
        "Percent of demand occasions where intended SKU is available on shelf/for pickup.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_oos",
      name: "Stockout Rate",
      description:
        "Frequency of stockouts by SKU/store. Drives lost sales and customer dissatisfaction.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_fill_rate",
      name: "Fill Rate",
      description:
        "Percent of ordered demand fulfilled without cancellation/substitution. Used for service level evaluation.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },

    {
      id: "kpi_forecast_error",
      name: "Forecast Error (MAPE/WAPE)",
      description:
        "Forecast accuracy metric used to tune models and safety stock. High error drives buffers and excess/stockouts.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_turns",
      name: "Inventory Turns",
      description:
        "Rate of inventory conversion to sales; higher turns indicate better localization and lower excess.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_doh",
      name: "Days on Hand (DOH)",
      description:
        "Inventory coverage days. Too high implies excess; too low implies stockout risk for staples.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_excess",
      name: "Excess Inventory $",
      description:
        "Value of inventory above target buffers and season plan; drives markdown and working capital drag.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },

    {
      id: "kpi_gm_pct",
      name: "Gross Margin %",
      description:
        "Gross profit as % of sales; sensitive to pricing, promo depth, and markdowns.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_gm_dollars",
      name: "Gross Margin $",
      description:
        "Gross profit dollars; trades volume vs margin percent in pricing/promo decisions.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_markdown_rate",
      name: "Markdown Rate",
      description:
        "Share of sales at markdown/clearance; indicator of overbuy or poor localization.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },

    {
      id: "kpi_promo_lift",
      name: "Promo Lift %",
      description:
        "Incremental sales during promo vs baseline; requires inventory readiness and correct targeting.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_promo_roi",
      name: "Promo ROI",
      description:
        "Incremental profit or sales per promo dollar; drops sharply when promotions run into stockouts.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_price_index",
      name: "Price Index (vs competitors)",
      description:
        "Relative price position on KVIs; informs price zone/override decisions.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },

    {
      id: "kpi_cancel_rate",
      name: "Order Cancellation Rate",
      description:
        "Share of orders/lines cancelled, often due to inventory inaccuracy or picking exceptions.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_promise_accuracy",
      name: "Promise Accuracy",
      description:
        "How often promised pickup/delivery times are met; depends on ATP accuracy and store capacity.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_on_time_pickup",
      name: "On-Time Pickup %",
      description:
        "Percent of pickup orders staged and ready by promised time; depends on labor and inventory availability.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_on_time_delivery",
      name: "On-Time Delivery %",
      description:
        "Delivery SLA compliance; depends on routing, carrier performance, and capacity constraints.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_fulfillment_cost",
      name: "Fulfillment Cost per Order",
      description:
        "Cost to pick/pack/ship/deliver; strongly impacted by routing (store vs DC) and last-mile miles.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },

    {
      id: "kpi_pick_time",
      name: "Pick Time per Order",
      description:
        "Average minutes to pick/stage an order in-store; rises when store is overloaded or planograms are complex.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_labor_prod",
      name: "Labor Productivity",
      description:
        "Sales or tasks completed per labor hour; impacted by omnichannel load and shelf replenishment workload.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_shrink",
      name: "Shrink %",
      description:
        "Inventory loss rate; drives margin leakage and inventory accuracy issues.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_return_rate",
      name: "Return Rate",
      description:
        "Share of sales returned; informs assortment quality, substitution policy, and net sales truth.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },

    {
      id: "kpi_loyalty_pen",
      name: "Loyalty Penetration",
      description:
        "Percent of sales linked to loyalty members; increases insight quality for localization and personalization.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_repeat",
      name: "Repeat Purchase Rate",
      description:
        "Frequency of returning customers; sensitive to staple in-stock and service reliability.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_clv",
      name: "Customer Lifetime Value (CLV)",
      description:
        "Long-run value of customer segments; improved by reliable availability, relevant assortment, and service levels.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },

    {
      id: "kpi_working_capital",
      name: "Working Capital (Inventory)",
      description:
        "Cash tied in inventory across DC/store; reduced by better allocation, fewer slow movers, and dynamic buffers.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },

    {
      id: "kpi_vendor_otif",
      name: "Vendor OTIF",
      description:
        "On-time in-full supplier performance; poor OTIF increases stockout risk and buffer requirements.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },
    {
      id: "kpi_lead_var",
      name: "Lead Time Variability",
      description:
        "Variance of supplier lead time; drives safety stock and reorder point inflation.",
      size: 16,
      width: 200,
      height: 72,
      color: "#ff7f0e",
      type: "bkg",
    },

    // =========================
    // DECISIONS (broad coverage)
    // =========================
    {
      id: "dec_assortment_store",
      name: "Store Assortment Selection",
      description:
        "Choose which SKUs (core vs localized) are ranged per store and season, balancing relevance, space, and working capital.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_depth_pack_mix",
      name: "Depth & Pack Mix",
      description:
        "Choose on-hand depth and pack-size mix (e.g., small vs bulk bags) based on local mission mix, substitution, and space/cube constraints.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_planogram_alloc",
      name: "Planogram Space Allocation",
      description:
        "Allocate facings/bays/endcaps by category/subcategory to maximize availability and attach while respecting store format constraints.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },

    {
      id: "dec_service_targets",
      name: "Service Level Targets",
      description:
        "Set category/SKU service targets (staples higher, seasonal optimized) balancing lost sales vs holding cost.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_safety_stock",
      name: "Safety Stock Settings",
      description:
        "Set safety stock by SKU-store using demand and lead-time variability and desired service level; adjust for weather/promo peaks.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_reorder_points",
      name: "Reorder Point & Cadence",
      description:
        "Set reorder points and replenishment cadence by SKU-store/DC; integrate vendor constraints (MOQ) and DC capacity.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_replen_qty",
      name: "Replenishment Order Quantity",
      description:
        "Choose order quantities to hit service while minimizing excess, considering upcoming promos, season sets, and lead-time risk.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_allocate_network",
      name: "Network Allocation",
      description:
        "Allocate limited supply across DCs/stores by demand priority to protect in-stock where it matters most and prevent overstock elsewhere.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_transfer_store",
      name: "Inter-Store Transfers",
      description:
        "Decide store-to-store transfers to resolve localized shortages and reduce aged inventory in low-demand stores.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },

    {
      id: "dec_price_zones",
      name: "Price Zone Design",
      description:
        "Define price zones based on local competitive intensity and mission mix; set governance for overrides and margin guardrails.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_local_price_override",
      name: "Local Price Overrides",
      description:
        "Adjust specific KVI prices in competitive pockets without breaking zone consistency or margin floors.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_promo_target",
      name: "Promo Targeting",
      description:
        "Select store clusters/segments and timing for promos based on expected lift and inventory readiness to avoid stockout-driven ROI collapse.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_promo_depth",
      name: "Promo Depth & Mechanics",
      description:
        "Choose discount depth/offer design balancing incremental volume vs margin erosion; incorporate elasticity and substitution effects.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_markdown_timing",
      name: "Markdown Timing",
      description:
        "Time markdowns to clear aged/seasonal inventory while minimizing unnecessary margin loss and freeing space for new sets.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },

    {
      id: "dec_route_order",
      name: "Order Routing (Store vs DC)",
      description:
        "Route each order to the lowest-cost feasible node meeting SLA while protecting store labor and avoiding cancellations.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_reserve_inventory",
      name: "Reservation & Promise Rules",
      description:
        "Set reservation windows and promise rules to prevent over-commitment when inventory accuracy is uncertain or store capacity is constrained.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_throttle_sfs",
      name: "Ship-from-Store Throttling",
      description:
        "Throttle ship-from-store in overloaded stores or where shelf availability is threatened; protect walk-in service and pickup readiness.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },

    {
      id: "dec_staffing",
      name: "Labor & Staffing Levels",
      description:
        "Set labor hours by store/day balancing shelf execution, customer service, and omnichannel picks; reduce missed promises and shelf-outs.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_cycle_count_freq",
      name: "Cycle Count Frequency",
      description:
        "Choose count frequency and SKU targeting to improve inventory accuracy where it most impacts sales and cancellations.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },
    {
      id: "dec_vendor_actions",
      name: "Vendor Expedite / Substitution Actions",
      description:
        "Expedite, substitute, or re-source when supplier OTIF/lead time variance threatens service levels, especially for staples.",
      size: 18,
      width: 210,
      height: 80,
      color: "#d62728",
      type: "bkg",
    },

    // =========================
    // EXTERNAL DRIVERS (as BKG nodes)
    // =========================
    {
      id: "ext_weather",
      name: "Weather Signal",
      description:
        "Forecast/alert signals mapped to store catchments (temp/precip/severe). Drives seasonal demand spikes and category timing.",
      size: 14,
      width: 185,
      height: 70,
      color: "#8c564b",
      type: "bkg",
    },
    {
      id: "ext_severe_weather",
      name: "Severe Weather Alert",
      description:
        "Storm/freeze/flood alerts that trigger short-term demand surges (generators, feed, fencing repairs) and logistics disruption risk.",
      size: 14,
      width: 185,
      height: 70,
      color: "#8c564b",
      type: "bkg",
    },
    {
      id: "ext_demographics",
      name: "Demographics & Rural Density",
      description:
        "Catchment demographics that shape mission mix (pet vs livestock vs hobby farm). Anchors store localization strategy.",
      size: 14,
      width: 185,
      height: 70,
      color: "#8c564b",
      type: "bkg",
    },
    {
      id: "ext_livestock_proxy",
      name: "Livestock Density Proxy",
      description:
        "Catchment-level proxy signal for livestock ownership and related demand (feed, fencing, farm supplies).",
      size: 14,
      width: 185,
      height: 70,
      color: "#8c564b",
      type: "bkg",
    },
    {
      id: "ext_competition",
      name: "Competitive Context",
      description:
        "Local competitor presence, price gaps on KVIs, and competitor promo intensity affecting pricing and promo decisions.",
      size: 14,
      width: 185,
      height: 70,
      color: "#8c564b",
      type: "bkg",
    },
    {
      id: "ext_commodity_feed",
      name: "Feed Commodity Index",
      description:
        "Commodity cost signal impacting feed pricing, margin, and demand sensitivity; affects promo depth and buffer sizing.",
      size: 14,
      width: 185,
      height: 70,
      color: "#8c564b",
      type: "bkg",
    },
    {
      id: "ext_fuel_cost",
      name: "Fuel / Freight Cost Index",
      description:
        "Transport cost signal influencing replenishment economics, last-mile cost-to-serve, and routing optimization.",
      size: 14,
      width: 185,
      height: 70,
      color: "#8c564b",
      type: "bkg",
    },
    {
      id: "ext_local_events",
      name: "Local Events Signal",
      description:
        "County fairs, seasonal planting windows, community events affecting demand timing for livestock/seasonal categories.",
      size: 14,
      width: 185,
      height: 70,
      color: "#8c564b",
      type: "bkg",
    },

    // =========================
    // DATA SOURCES (type = source)
    // =========================
    {
      id: "src_pos",
      name: "POS Transactions",
      description:
        "In-store sales/returns at SKU/time/price. Source of truth for store demand, realized price, and net sales.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_ecom",
      name: "Ecommerce Orders",
      description:
        "Online orders, browse/cart funnel signals, fulfillment choice, cancellations, and delivery outcomes.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_wms",
      name: "WMS & Inventory Systems",
      description:
        "On-hand, in-transit, receiving, transfers, adjustments, and cycle counts for stores and DCs.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_erp_fin",
      name: "ERP & Finance",
      description:
        "Costs, COGS, margins, vendor invoices, working capital and financial close measures.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_loyalty",
      name: "Loyalty / CRM",
      description:
        "Member profiles, RFM, purchase history, offer exposure/redemption, and segment membership.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_pricing",
      name: "Pricing System",
      description:
        "Base prices, overrides, price zones, KVI lists, and effective price histories.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_promo",
      name: "Promotion System",
      description:
        "Promo calendar, mechanics, spend, targeting, and historic lift/ROI measures.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_planograms",
      name: "Planograms & Space Data",
      description:
        "Facings/bays/endcaps allocations, store layouts, and capacity constraints by store format.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_supplier",
      name: "Supplier / PO / EDI",
      description:
        "POs, ASNs, lead times, fill rates, backorders, vendor OTIF and MOQ constraints.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_carrier",
      name: "Carrier Tracking",
      description:
        "Shipment scans, ETAs, delivery exceptions, cost, and SLA performance by lane and carrier.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_weather",
      name: "Weather API Feed",
      description:
        "Forecasts and alerts mapped to store geos for demand modeling and disruption detection.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_census_gis",
      name: "Census / GIS Data",
      description:
        "Demographics, rural density, drive times, and trade-area features for localization and segmentation.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_competitor",
      name: "Competitor Price/Promo Feed",
      description:
        "Local competitor observations (KVIs), promo signals, and price gaps informing price zones and overrides.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_commodity",
      name: "Commodity & Cost Indices",
      description:
        "Feed/fuel/freight indices used for margin, pricing, and cost-to-serve scenario planning.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_footfall",
      name: "Footfall / Traffic Analytics",
      description:
        "Store traffic counts and visit patterns used to separate traffic changes from conversion and availability effects.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
    {
      id: "src_support",
      name: "Customer Support / Chat Logs",
      description:
        "Service contacts and complaints (late delivery, missing items) used to detect promise failures and root causes.",
      size: 12,
      width: 190,
      height: 68,
      color: "#9467bd",
      type: "source",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    // ===== Enterprise ownership =====
    {
      id: "l0001",
      source: "company",
      target: "macro_merch",
      type: "OWNS",
      description:
        "Enterprise governance covers merchandising strategy and store ranging policies.",
      linkType: "bkg",
    },
    {
      id: "l0002",
      source: "company",
      target: "macro_sc",
      type: "OWNS",
      description:
        "Enterprise governance covers inventory investment and supply chain execution across the network.",
      linkType: "bkg",
    },
    {
      id: "l0003",
      source: "company",
      target: "macro_pricing",
      type: "OWNS",
      description:
        "Enterprise governance covers pricing, promos, and markdown rules used across stores.",
      linkType: "bkg",
    },
    {
      id: "l0004",
      source: "company",
      target: "macro_omni",
      type: "OWNS",
      description:
        "Enterprise governance covers promise and routing design for omnichannel fulfillment.",
      linkType: "bkg",
    },
    {
      id: "l0005",
      source: "company",
      target: "macro_storeops",
      type: "OWNS",
      description:
        "Enterprise governance covers store execution standards and inventory accuracy programs.",
      linkType: "bkg",
    },
    {
      id: "l0006",
      source: "company",
      target: "macro_sales",
      type: "OWNS",
      description:
        "Enterprise governance covers loyalty/segment strategy and customer engagement levers.",
      linkType: "bkg",
    },
    {
      id: "l0007",
      source: "company",
      target: "macro_fin",
      type: "OWNS",
      description:
        "Enterprise governance covers financial guardrails and ROI measurement for initiatives.",
      linkType: "bkg",
    },

    // ===== Macro → components / decisions =====
    {
      id: "l0101",
      source: "macro_merch",
      target: "assortment_plan",
      type: "GOVERNS",
      description:
        "Assortment plan is authored and governed within merchandising.",
      linkType: "bkg",
    },
    {
      id: "l0102",
      source: "macro_merch",
      target: "planogram_space",
      type: "GOVERNS",
      description:
        "Planogram/space rules are governed by merchandising to balance relevance and shopability.",
      linkType: "bkg",
    },
    {
      id: "l0103",
      source: "macro_merch",
      target: "dec_assortment_store",
      type: "MAKES_DECISION",
      description:
        "Merchandising decides which SKUs are core vs localized per store/cluster and season.",
      linkType: "bkg",
    },
    {
      id: "l0104",
      source: "macro_merch",
      target: "dec_planogram_alloc",
      type: "MAKES_DECISION",
      description:
        "Merchandising allocates shelf space by category/subcategory and governs seasonal resets.",
      linkType: "bkg",
    },
    {
      id: "l0105",
      source: "macro_merch",
      target: "dec_depth_pack_mix",
      type: "MAKES_DECISION",
      description:
        "Merchandising sets pack mix and depth intent (e.g., bulk vs small pack) based on local missions.",
      linkType: "bkg",
    },

    {
      id: "l0201",
      source: "macro_sc",
      target: "demand_forecast",
      type: "GOVERNS",
      description:
        "Supply chain owns the demand forecast used for replenishment and allocation.",
      linkType: "bkg",
    },
    {
      id: "l0202",
      source: "macro_sc",
      target: "service_level_policy",
      type: "GOVERNS",
      description:
        "Supply chain sets service targets by category/SKU cluster to translate customer promise into buffers.",
      linkType: "bkg",
    },
    {
      id: "l0203",
      source: "macro_sc",
      target: "replenishment_policy",
      type: "GOVERNS",
      description:
        "Supply chain sets replenishment parameters (ROP, cadence, EOQ logic) by SKU-location.",
      linkType: "bkg",
    },
    {
      id: "l0204",
      source: "macro_sc",
      target: "allocation_policy",
      type: "GOVERNS",
      description:
        "Supply chain sets allocation rules for limited supply and rebalancing decisions.",
      linkType: "bkg",
    },
    {
      id: "l0205",
      source: "macro_sc",
      target: "dec_service_targets",
      type: "MAKES_DECISION",
      description:
        "Supply chain chooses target service levels and prioritization for staples vs seasonal items.",
      linkType: "bkg",
    },
    {
      id: "l0206",
      source: "macro_sc",
      target: "dec_safety_stock",
      type: "MAKES_DECISION",
      description:
        "Supply chain sets safety stock and continuously tunes it based on error/variability.",
      linkType: "bkg",
    },
    {
      id: "l0207",
      source: "macro_sc",
      target: "dec_reorder_points",
      type: "MAKES_DECISION",
      description:
        "Supply chain sets reorder points/cadence incorporating lead time and MOQ constraints.",
      linkType: "bkg",
    },
    {
      id: "l0208",
      source: "macro_sc",
      target: "dec_replen_qty",
      type: "MAKES_DECISION",
      description:
        "Supply chain chooses replenishment quantities to balance stockouts vs excess.",
      linkType: "bkg",
    },
    {
      id: "l0209",
      source: "macro_sc",
      target: "dec_allocate_network",
      type: "MAKES_DECISION",
      description:
        "Supply chain allocates limited supply across network to protect prioritized demand.",
      linkType: "bkg",
    },
    {
      id: "l0210",
      source: "macro_sc",
      target: "dec_transfer_store",
      type: "MAKES_DECISION",
      description:
        "Supply chain triggers store-to-store transfers when localized imbalances are material.",
      linkType: "bkg",
    },

    {
      id: "l0301",
      source: "macro_pricing",
      target: "pricing_policy",
      type: "GOVERNS",
      description:
        "Pricing policy defines base prices, overrides, and guardrails for margin and price perception.",
      linkType: "bkg",
    },
    {
      id: "l0302",
      source: "macro_pricing",
      target: "promo_calendar",
      type: "GOVERNS",
      description:
        "Promotion calendar and mechanics are governed by pricing/promotions.",
      linkType: "bkg",
    },
    {
      id: "l0303",
      source: "macro_pricing",
      target: "markdown_policy",
      type: "GOVERNS",
      description:
        "Markdown policy defines clearance cadence and rules to recover cash and space.",
      linkType: "bkg",
    },
    {
      id: "l0304",
      source: "macro_pricing",
      target: "dec_price_zones",
      type: "MAKES_DECISION",
      description:
        "Pricing defines zones to align price strategy with local competition and customer mix.",
      linkType: "bkg",
    },
    {
      id: "l0305",
      source: "macro_pricing",
      target: "dec_local_price_override",
      type: "MAKES_DECISION",
      description:
        "Pricing issues local overrides on KVIs where competitor pressure is highest.",
      linkType: "bkg",
    },
    {
      id: "l0306",
      source: "macro_pricing",
      target: "dec_promo_target",
      type: "MAKES_DECISION",
      description:
        "Promotions selects targets/timing to maximize lift without triggering stockouts.",
      linkType: "bkg",
    },
    {
      id: "l0307",
      source: "macro_pricing",
      target: "dec_promo_depth",
      type: "MAKES_DECISION",
      description:
        "Promotions sets depth/mechanics using elasticity and margin guardrails.",
      linkType: "bkg",
    },
    {
      id: "l0308",
      source: "macro_pricing",
      target: "dec_markdown_timing",
      type: "MAKES_DECISION",
      description:
        "Clearance timing decisions manage aged inventory vs margin erosion trade-offs.",
      linkType: "bkg",
    },

    {
      id: "l0401",
      source: "macro_omni",
      target: "omni_orchestration",
      type: "GOVERNS",
      description:
        "Omnichannel orchestration governs routing, promise logic, and reservation windows.",
      linkType: "bkg",
    },
    {
      id: "l0402",
      source: "macro_omni",
      target: "dec_route_order",
      type: "MAKES_DECISION",
      description:
        "Omnichannel routes orders to store or DC to optimize SLA and cost-to-serve.",
      linkType: "bkg",
    },
    {
      id: "l0403",
      source: "macro_omni",
      target: "dec_reserve_inventory",
      type: "MAKES_DECISION",
      description:
        "Omnichannel sets reservation/promise rules to prevent overcommitment under uncertainty.",
      linkType: "bkg",
    },
    {
      id: "l0404",
      source: "macro_omni",
      target: "dec_throttle_sfs",
      type: "MAKES_DECISION",
      description:
        "Omnichannel throttles ship-from-store to protect store execution and shelf availability.",
      linkType: "bkg",
    },

    {
      id: "l0501",
      source: "macro_storeops",
      target: "store_ops_capacity",
      type: "GOVERNS",
      description:
        "Store ops manages labor/backroom capacity used for shelf work and omnichannel tasks.",
      linkType: "bkg",
    },
    {
      id: "l0502",
      source: "macro_storeops",
      target: "cycle_count",
      type: "GOVERNS",
      description:
        "Store ops governs cycle counts to improve on-hand accuracy and reduce exceptions.",
      linkType: "bkg",
    },
    {
      id: "l0503",
      source: "macro_storeops",
      target: "shrink_control",
      type: "GOVERNS",
      description:
        "Store ops runs shrink programs; shrink erodes margin and corrupts availability signals.",
      linkType: "bkg",
    },
    {
      id: "l0504",
      source: "macro_storeops",
      target: "dec_staffing",
      type: "MAKES_DECISION",
      description:
        "Store ops sets staffing levels to balance shelf execution and omnichannel pick workload.",
      linkType: "bkg",
    },
    {
      id: "l0505",
      source: "macro_storeops",
      target: "dec_cycle_count_freq",
      type: "MAKES_DECISION",
      description:
        "Store ops chooses cycle count frequency and targeting based on sales and cancellation impact.",
      linkType: "bkg",
    },

    {
      id: "l0601",
      source: "macro_sales",
      target: "customer_segment",
      type: "GOVERNS",
      description:
        "Sales & customer owns segment strategy used for localization and offer targeting.",
      linkType: "bkg",
    },
    {
      id: "l0602",
      source: "macro_sales",
      target: "loyalty_profile",
      type: "GOVERNS",
      description:
        "Sales & customer owns loyalty program constructs enabling segment inference and personalization.",
      linkType: "bkg",
    },

    {
      id: "l0701",
      source: "macro_fin",
      target: "kpi_working_capital",
      type: "GOVERNS",
      description:
        "Finance governs working capital targets and inventory investment constraints.",
      linkType: "bkg",
    },
    {
      id: "l0702",
      source: "macro_fin",
      target: "kpi_gm_pct",
      type: "GOVERNS",
      description:
        "Finance governs gross margin targets and margin guardrails for pricing/promotions.",
      linkType: "bkg",
    },

    // ===== Hierarchies (location & product) =====
    {
      id: "l1001",
      source: "region",
      target: "district",
      type: "CONTAINS",
      description:
        "Region contains districts for operational roll-ups and governance.",
      linkType: "bkg",
    },
    {
      id: "l1002",
      source: "district",
      target: "store",
      type: "CONTAINS",
      description:
        "District contains stores and provides an execution accountability layer.",
      linkType: "bkg",
    },
    {
      id: "l1003",
      source: "store",
      target: "catchment",
      type: "SERVES",
      description:
        "Each store serves a catchment that determines mission mix and seasonal demand patterns.",
      linkType: "bkg",
    },
    {
      id: "l1004",
      source: "store",
      target: "store_format",
      type: "HAS_FORMAT",
      description:
        "Store format defines physical capacity and service capabilities that constrain assortment and depth.",
      linkType: "bkg",
    },
    {
      id: "l1005",
      source: "store",
      target: "price_zone",
      type: "IN_PRICE_ZONE",
      description:
        "Stores belong to price zones for consistent pricing governance with local exceptions.",
      linkType: "bkg",
    },

    {
      id: "l1101",
      source: "product",
      target: "category",
      type: "HAS_CATEGORY",
      description:
        "Product hierarchy begins at category which drives planning assumptions and service targets.",
      linkType: "bkg",
    },
    {
      id: "l1102",
      source: "category",
      target: "subcategory",
      type: "HAS_SUBCATEGORY",
      description:
        "Subcategory is the key level for localization and space allocation decisions.",
      linkType: "bkg",
    },
    {
      id: "l1103",
      source: "subcategory",
      target: "brand",
      type: "CARRIES_BRANDS",
      description:
        "Subcategory contains a mix of brands (national + private) impacting margin and substitution.",
      linkType: "bkg",
    },
    {
      id: "l1104",
      source: "brand",
      target: "item",
      type: "PRODUCES_ITEMS",
      description:
        "Brands produce item lines used for rationalization and substitution logic.",
      linkType: "bkg",
    },
    {
      id: "l1105",
      source: "item",
      target: "pack",
      type: "HAS_PACKS",
      description:
        "Items come in pack variants which affect space and customer substitution patterns.",
      linkType: "bkg",
    },
    {
      id: "l1106",
      source: "pack",
      target: "sku",
      type: "MAPS_TO",
      description:
        "Pack variants are operationalized as SKUs (UPC-level) for pricing, inventory, and sales execution.",
      linkType: "bkg",
    },
    {
      id: "l1107",
      source: "sku",
      target: "sku_attributes",
      type: "HAS_ATTRIBUTES",
      description:
        "SKU attributes constrain storage, fulfillment feasibility, and replenishment economics.",
      linkType: "bkg",
    },

    // ===== Inventory state and its determinants =====
    {
      id: "l2001",
      source: "sku",
      target: "inventory_position",
      type: "HAS_STATE",
      description: "Inventory position is tracked at SKU-location granularity.",
      linkType: "bkg",
    },
    {
      id: "l2002",
      source: "store",
      target: "inventory_position",
      type: "HOLDS_INVENTORY",
      description:
        "Stores hold inventory position that drives shelf availability and pickup readiness.",
      linkType: "bkg",
    },
    {
      id: "l2003",
      source: "dc",
      target: "inventory_position",
      type: "HOLDS_INVENTORY",
      description:
        "DC inventory position constrains replenishment to stores and emergency allocations.",
      linkType: "bkg",
    },
    {
      id: "l2004",
      source: "in_transit_location",
      target: "inventory_position",
      type: "CONTRIBUTES",
      description:
        "In-transit inventory contributes to future availability and promise calculations.",
      linkType: "bkg",
    },
    {
      id: "l2005",
      source: "inventory_position",
      target: "atp",
      type: "DERIVES",
      description:
        "ATP is derived from inventory position after subtracting reservations/holds/exceptions.",
      linkType: "bkg",
    },
    {
      id: "l2006",
      source: "reservation",
      target: "atp",
      type: "CONSUMES",
      description:
        "Reservations consume ATP and prevent double-selling; weak accuracy increases cancellations.",
      linkType: "bkg",
    },
    {
      id: "l2007",
      source: "inventory_accuracy",
      target: "atp",
      type: "QUALIFIES",
      description:
        "Low inventory accuracy degrades trust in ATP and increases promise failures and cancellations.",
      linkType: "bkg",
    },
    {
      id: "l2008",
      source: "cycle_count",
      target: "inventory_accuracy",
      type: "IMPROVES",
      description:
        "Cycle counting improves inventory accuracy by reconciling physical and system on-hand.",
      linkType: "bkg",
    },
    {
      id: "l2009",
      source: "shrink_control",
      target: "inventory_accuracy",
      type: "PROTECTS",
      description:
        "Shrink controls reduce untracked losses that silently degrade inventory accuracy.",
      linkType: "bkg",
    },

    // ===== Planning flows =====
    {
      id: "l2101",
      source: "catchment",
      target: "demand_forecast",
      type: "INFORMS",
      description:
        "Catchment mission mix and seasonality inform localized demand forecasts.",
      linkType: "bkg",
    },
    {
      id: "l2102",
      source: "assortment_plan",
      target: "demand_forecast",
      type: "SHAPES",
      description:
        "Ranged assortment defines what demand can be realized and therefore the forecast universe.",
      linkType: "bkg",
    },
    {
      id: "l2103",
      source: "planogram_space",
      target: "assortment_plan",
      type: "CONSTRAINS",
      description:
        "Physical space constraints limit assortment breadth/depth and affect realized demand.",
      linkType: "bkg",
    },
    {
      id: "l2104",
      source: "service_level_policy",
      target: "safety_stock",
      type: "PARAMETERIZES",
      description:
        "Service targets translate into buffer sizing requirements (safety stock) by variability.",
      linkType: "bkg",
    },
    {
      id: "l2105",
      source: "demand_forecast",
      target: "replenishment_policy",
      type: "INPUTS",
      description:
        "Forecast and variability drive reorder points, cadence, and order quantities.",
      linkType: "bkg",
    },
    {
      id: "l2106",
      source: "safety_stock",
      target: "replenishment_policy",
      type: "INPUTS",
      description:
        "Safety stock settings become replenishment parameters (ROP and min/max levels).",
      linkType: "bkg",
    },
    {
      id: "l2107",
      source: "allocation_policy",
      target: "inventory_position",
      type: "REBALANCES",
      description:
        "Allocation decisions rebalance inventory positions across nodes to protect service levels.",
      linkType: "bkg",
    },

    // ===== Transaction mechanics =====
    {
      id: "l2201",
      source: "sales_transaction",
      target: "sales_line",
      type: "HAS_LINES",
      description:
        "Transactions contain SKU-level lines used for demand, price, and mix analysis.",
      linkType: "bkg",
    },
    {
      id: "l2202",
      source: "sales_line",
      target: "sku",
      type: "FOR_SKU",
      description:
        "Each sales line references a SKU; this is the join point to inventory, promo, and price.",
      linkType: "bkg",
    },
    {
      id: "l2203",
      source: "sales_transaction",
      target: "sale_type",
      type: "HAS_TYPE",
      description:
        "Sale type distinguishes walk-in vs pickup vs ship demand and separates fulfillment effects.",
      linkType: "bkg",
    },
    {
      id: "l2204",
      source: "sales_transaction",
      target: "store",
      type: "ATTRIBUTED_TO",
      description:
        "Transactions are attributed to a store (including pickup/ship-from-store) for localization planning.",
      linkType: "bkg",
    },

    {
      id: "l2211",
      source: "order",
      target: "order_line",
      type: "HAS_LINES",
      description:
        "Orders contain SKU-level lines requiring routing, reservation, and execution.",
      linkType: "bkg",
    },
    {
      id: "l2212",
      source: "order_line",
      target: "sku",
      type: "FOR_SKU",
      description:
        "Order lines reference SKUs to enable reservation and routing decisions at SKU-store/DC grain.",
      linkType: "bkg",
    },
    {
      id: "l2213",
      source: "order",
      target: "fulfillment_mode",
      type: "USES_MODE",
      description:
        "Orders select fulfillment mode that sets SLA and cost expectations.",
      linkType: "bkg",
    },
    {
      id: "l2214",
      source: "order",
      target: "reservation",
      type: "CREATES",
      description:
        "Orders create inventory reservations to protect promised availability.",
      linkType: "bkg",
    },
    {
      id: "l2215",
      source: "order",
      target: "fulfillment_task",
      type: "GENERATES_TASKS",
      description:
        "Orders generate pick/pack/stage tasks whose completion determines promise outcomes.",
      linkType: "bkg",
    },
    {
      id: "l2216",
      source: "fulfillment_task",
      target: "store_ops_capacity",
      type: "CONSUMES",
      description:
        "Fulfillment tasks consume store labor/backroom capacity and can crowd out shelf execution.",
      linkType: "bkg",
    },

    {
      id: "l2221",
      source: "return",
      target: "return_line",
      type: "HAS_LINES",
      description:
        "Returns contain SKU-level return lines enabling net sales and quality analysis.",
      linkType: "bkg",
    },
    {
      id: "l2222",
      source: "return_line",
      target: "sku",
      type: "FOR_SKU",
      description:
        "Return lines map to SKUs to drive restock and margin recovery decisions.",
      linkType: "bkg",
    },
    {
      id: "l2223",
      source: "return_line",
      target: "return_disposition",
      type: "HAS_DISPOSITION",
      description:
        "Disposition determines if returned inventory is sellable or becomes loss/clearance.",
      linkType: "bkg",
    },
    {
      id: "l2224",
      source: "return_disposition",
      target: "inventory_position",
      type: "UPDATES_STATE",
      description:
        "Restockable returns increase on-hand; damaged/clearance outcomes affect margin and availability differently.",
      linkType: "bkg",
    },

    // ===== Supply execution events =====
    {
      id: "l2301",
      source: "purchase_order",
      target: "supplier_location",
      type: "SOURCED_FROM",
      description:
        "Purchase orders are sourced from supplier ship points with lead time/MOQ constraints.",
      linkType: "bkg",
    },
    {
      id: "l2302",
      source: "purchase_order",
      target: "shipment",
      type: "EXECUTED_BY",
      description:
        "POs produce shipments; shipment delays create upstream shortages and downstream stockouts.",
      linkType: "bkg",
    },
    {
      id: "l2303",
      source: "shipment",
      target: "in_transit_location",
      type: "IN_TRANSIT_STATE",
      description:
        "Shipments spend time in transit; in-transit affects promise and replenishment ETA reasoning.",
      linkType: "bkg",
    },
    {
      id: "l2304",
      source: "shipment",
      target: "dc",
      type: "RECEIVED_AT",
      description:
        "Supplier shipments received at DC replenish DC inventory used to feed stores.",
      linkType: "bkg",
    },
    {
      id: "l2305",
      source: "transfer",
      target: "shipment",
      type: "EXECUTED_BY",
      description:
        "Transfers are executed via shipments; delays propagate into store-level availability misses.",
      linkType: "bkg",
    },
    {
      id: "l2306",
      source: "transfer",
      target: "inventory_position",
      type: "REBALANCES",
      description:
        "Transfers rebalance inventory position across nodes to correct demand-supply mismatch.",
      linkType: "bkg",
    },

    // ===== Decisions → components (write paths) =====
    {
      id: "l3001",
      source: "dec_assortment_store",
      target: "assortment_plan",
      type: "SETS",
      description:
        "Assortment selection writes the ranged set and depth intent in the assortment plan.",
      linkType: "bkg",
    },
    {
      id: "l3002",
      source: "dec_depth_pack_mix",
      target: "assortment_plan",
      type: "REFINES",
      description:
        "Depth/pack-mix decisions refine store assortment depth and pack distribution.",
      linkType: "bkg",
    },
    {
      id: "l3003",
      source: "dec_planogram_alloc",
      target: "planogram_space",
      type: "SETS",
      description:
        "Planogram allocation writes shelf space assignments and facing rules by category/subcategory.",
      linkType: "bkg",
    },

    {
      id: "l3011",
      source: "dec_service_targets",
      target: "service_level_policy",
      type: "SETS",
      description:
        "Service targets become policy inputs for safety stock and replenishment parameters.",
      linkType: "bkg",
    },
    {
      id: "l3012",
      source: "dec_safety_stock",
      target: "safety_stock",
      type: "SETS",
      description:
        "Safety stock decision writes buffer levels by SKU-store based on variability and target service.",
      linkType: "bkg",
    },
    {
      id: "l3013",
      source: "dec_reorder_points",
      target: "replenishment_policy",
      type: "SETS",
      description:
        "Reorder point decisions write replenishment parameters and cadence by SKU-location.",
      linkType: "bkg",
    },
    {
      id: "l3014",
      source: "dec_replen_qty",
      target: "purchase_order",
      type: "GENERATES",
      description:
        "Replenishment quantity decisions generate purchase orders and store/DC replenishment orders.",
      linkType: "bkg",
    },
    {
      id: "l3015",
      source: "dec_allocate_network",
      target: "allocation_policy",
      type: "UPDATES",
      description:
        "Allocation decisions update distribution priorities for limited supply across nodes.",
      linkType: "bkg",
    },
    {
      id: "l3016",
      source: "dec_transfer_store",
      target: "transfer",
      type: "TRIGGERS",
      description:
        "Inter-store transfer decisions trigger transfer events to resolve localized shortages/excess.",
      linkType: "bkg",
    },

    {
      id: "l3021",
      source: "dec_price_zones",
      target: "price_zone",
      type: "SETS",
      description:
        "Price zone design writes store-to-zone mappings and governance boundaries.",
      linkType: "bkg",
    },
    {
      id: "l3022",
      source: "dec_local_price_override",
      target: "pricing_policy",
      type: "UPDATES",
      description:
        "Local overrides update pricing policy for specific SKUs/stores under competitive pressure.",
      linkType: "bkg",
    },
    {
      id: "l3023",
      source: "dec_promo_target",
      target: "promo_calendar",
      type: "SCHEDULES",
      description:
        "Promo targeting schedules promos by store cluster/time aligned to inventory readiness.",
      linkType: "bkg",
    },
    {
      id: "l3024",
      source: "dec_promo_depth",
      target: "promo_calendar",
      type: "SETS_MECHANICS",
      description:
        "Promo depth decisions set discount mechanics and guardrails used during execution.",
      linkType: "bkg",
    },
    {
      id: "l3025",
      source: "dec_markdown_timing",
      target: "markdown_policy",
      type: "SCHEDULES",
      description:
        "Markdown timing schedules clearance cadence for aged/seasonal inventory.",
      linkType: "bkg",
    },

    {
      id: "l3031",
      source: "dec_route_order",
      target: "omni_orchestration",
      type: "SETS",
      description:
        "Routing decisions update orchestration logic for node selection and cost/SLA trade-offs.",
      linkType: "bkg",
    },
    {
      id: "l3032",
      source: "dec_reserve_inventory",
      target: "reservation",
      type: "GOVERNS",
      description:
        "Reservation rules govern how and when inventory is held for promises under uncertainty.",
      linkType: "bkg",
    },
    {
      id: "l3033",
      source: "dec_throttle_sfs",
      target: "omni_orchestration",
      type: "CONSTRAINS",
      description:
        "Throttling constrains eligible stores for ship-from-store to protect shelf execution and pickup readiness.",
      linkType: "bkg",
    },

    {
      id: "l3041",
      source: "dec_staffing",
      target: "store_ops_capacity",
      type: "SETS",
      description:
        "Staffing decisions set labor capacity available for shelf replenishment and fulfillment tasks.",
      linkType: "bkg",
    },
    {
      id: "l3042",
      source: "dec_cycle_count_freq",
      target: "cycle_count",
      type: "SETS",
      description:
        "Cycle count frequency decisions set how often and what to count to improve accuracy.",
      linkType: "bkg",
    },
    {
      id: "l3043",
      source: "dec_vendor_actions",
      target: "purchase_order",
      type: "MODIFIES",
      description:
        "Vendor actions modify POs/shipments (expedite/substitute) to mitigate OTIF risk for critical SKUs.",
      linkType: "bkg",
    },

    // ===== KPIs driven by states/components =====
    {
      id: "l4001",
      source: "sales_transaction",
      target: "kpi_sales",
      type: "AGGREGATES_TO",
      description:
        "Transactions roll up to net sales across store/channel/category/SKU.",
      linkType: "bkg",
    },
    {
      id: "l4002",
      source: "sales_line",
      target: "kpi_units",
      type: "AGGREGATES_TO",
      description:
        "Sales line quantities aggregate to units sold, enabling volume vs price/mix decomposition.",
      linkType: "bkg",
    },
    {
      id: "l4003",
      source: "order",
      target: "kpi_aov",
      type: "CONTRIBUTES",
      description:
        "Order totals contribute to AOV; affected by assortment breadth, attach, and pricing.",
      linkType: "bkg",
    },
    {
      id: "l4004",
      source: "catchment",
      target: "kpi_traffic",
      type: "INFLUENCES",
      description:
        "Catchment size and local attractiveness influence traffic potential; promos and weather shift realized traffic.",
      linkType: "bkg",
    },
    {
      id: "l4005",
      source: "kpi_traffic",
      target: "kpi_conversion",
      type: "INPUTS",
      description:
        "Conversion is computed as transactions per traffic; drops when in-stock and relevance degrade.",
      linkType: "bkg",
    },

    {
      id: "l4011",
      source: "inventory_position",
      target: "kpi_instock",
      type: "DRIVES",
      description:
        "On-hand/ATP levels drive in-stock availability for walk-in and pickup promises.",
      linkType: "bkg",
    },
    {
      id: "l4012",
      source: "kpi_instock",
      target: "kpi_oos",
      type: "INVERSE",
      description:
        "Higher in-stock reduces stockout rate; the goal is preventing stockouts during local peaks.",
      linkType: "bkg",
    },
    {
      id: "l4013",
      source: "inventory_accuracy",
      target: "kpi_cancel_rate",
      type: "DRIVES",
      description:
        "Poor inventory accuracy causes picking exceptions and cancellations when reserved inventory is not physically available.",
      linkType: "bkg",
    },
    {
      id: "l4014",
      source: "atp",
      target: "kpi_promise_accuracy",
      type: "DRIVES",
      description:
        "Reliable ATP enables reliable promises; inaccurate ATP increases missed pickup/delivery promises.",
      linkType: "bkg",
    },
    {
      id: "l4015",
      source: "store_ops_capacity",
      target: "kpi_on_time_pickup",
      type: "INFLUENCES",
      description:
        "Insufficient labor/backroom capacity increases staging delays and lowers on-time pickup.",
      linkType: "bkg",
    },
    {
      id: "l4016",
      source: "carrier",
      target: "kpi_on_time_delivery",
      type: "INFLUENCES",
      description:
        "Carrier performance and lane reliability influence on-time delivery SLA compliance.",
      linkType: "bkg",
    },
    {
      id: "l4017",
      source: "omni_orchestration",
      target: "kpi_fulfillment_cost",
      type: "INFLUENCES",
      description:
        "Routing decisions drive pick labor, ship zones, delivery miles, and thus cost per order.",
      linkType: "bkg",
    },
    {
      id: "l4018",
      source: "fulfillment_task",
      target: "kpi_pick_time",
      type: "MEASURES",
      description:
        "Pick tasks capture pick time and exceptions; used to tune routing and staffing.",
      linkType: "bkg",
    },
    {
      id: "l4019",
      source: "kpi_pick_time",
      target: "kpi_labor_prod",
      type: "INFLUENCES",
      description:
        "Higher pick time reduces labor productivity and crowds out shelf execution tasks.",
      linkType: "bkg",
    },

    {
      id: "l4021",
      source: "demand_forecast",
      target: "kpi_forecast_error",
      type: "EVALUATED_BY",
      description:
        "Forecast error measures deviation of forecast vs actual sales and drives buffer tuning.",
      linkType: "bkg",
    },
    {
      id: "l4022",
      source: "inventory_position",
      target: "kpi_turns",
      type: "DETERMINES",
      description:
        "Inventory levels relative to sales determine turns; overstock reduces turns and increases markdown risk.",
      linkType: "bkg",
    },
    {
      id: "l4023",
      source: "inventory_position",
      target: "kpi_doh",
      type: "DETERMINES",
      description:
        "Inventory coverage days (DOH) derive from on-hand relative to forecasted consumption.",
      linkType: "bkg",
    },
    {
      id: "l4024",
      source: "kpi_doh",
      target: "kpi_excess",
      type: "FLAGS",
      description:
        "High DOH relative to targets flags excess inventory dollars requiring markdown or reallocation.",
      linkType: "bkg",
    },
    {
      id: "l4025",
      source: "kpi_excess",
      target: "kpi_working_capital",
      type: "CONTRIBUTES",
      description:
        "Excess inventory ties up working capital and increases carrying cost.",
      linkType: "bkg",
    },

    {
      id: "l4031",
      source: "pricing_policy",
      target: "kpi_gm_pct",
      type: "INFLUENCES",
      description:
        "Pricing policy changes realized price and therefore gross margin percent.",
      linkType: "bkg",
    },
    {
      id: "l4032",
      source: "promo_calendar",
      target: "kpi_promo_lift",
      type: "INFLUENCES",
      description:
        "Promo calendar drives demand lift vs baseline; lift varies by store mission mix and inventory readiness.",
      linkType: "bkg",
    },
    {
      id: "l4033",
      source: "kpi_promo_lift",
      target: "kpi_promo_roi",
      type: "INPUTS",
      description:
        "Promo ROI depends on lift and margin retained; stockouts and deep discounts erode ROI.",
      linkType: "bkg",
    },
    {
      id: "l4034",
      source: "markdown_policy",
      target: "kpi_markdown_rate",
      type: "INFLUENCES",
      description:
        "Markdown cadence changes share of sales at reduced price and margin recovered from aged inventory.",
      linkType: "bkg",
    },
    {
      id: "l4035",
      source: "kpi_sales",
      target: "kpi_gm_dollars",
      type: "WITH_MARGIN",
      description:
        "Gross margin dollars derive from sales volume and realized margin percent.",
      linkType: "bkg",
    },

    {
      id: "l4041",
      source: "shrink_control",
      target: "kpi_shrink",
      type: "REDUCES",
      description:
        "Shrink controls reduce losses that otherwise erode gross margin and corrupt inventory accuracy.",
      linkType: "bkg",
    },
    {
      id: "l4042",
      source: "return",
      target: "kpi_return_rate",
      type: "MEASURES",
      description:
        "Returns contribute to return rate; high rates may indicate quality issues or substitution/promise problems.",
      linkType: "bkg",
    },
    {
      id: "l4043",
      source: "loyalty_profile",
      target: "kpi_loyalty_pen",
      type: "MEASURES",
      description:
        "Loyalty penetration measures how much demand is attributable to members (data richness improves decisioning).",
      linkType: "bkg",
    },
    {
      id: "l4044",
      source: "kpi_instock",
      target: "kpi_repeat",
      type: "INFLUENCES",
      description:
        "Reliable staple availability drives repeat purchasing and reduces churn in high-frequency customers.",
      linkType: "bkg",
    },
    {
      id: "l4045",
      source: "kpi_repeat",
      target: "kpi_clv",
      type: "DRIVES",
      description:
        "Higher repeat rates and basket stability increase long-run customer value (CLV).",
      linkType: "bkg",
    },

    {
      id: "l4051",
      source: "purchase_order",
      target: "kpi_vendor_otif",
      type: "MEASURES",
      description:
        "Supplier OTIF computed from PO vs receipt timing and completeness; drives lead-time risk and buffers.",
      linkType: "bkg",
    },
    {
      id: "l4052",
      source: "kpi_vendor_otif",
      target: "kpi_lead_var",
      type: "RELATED",
      description:
        "Low OTIF often correlates with higher lead-time variability; both drive buffer inflation.",
      linkType: "bkg",
    },

    // ===== External drivers → planning decisions =====
    {
      id: "l5001",
      source: "ext_weather",
      target: "demand_forecast",
      type: "INFORMS",
      description:
        "Weather shifts demand for seasonal categories; forecasts incorporate temp/precip patterns by catchment.",
      linkType: "bkg",
    },
    {
      id: "l5002",
      source: "ext_severe_weather",
      target: "dec_replen_qty",
      type: "TRIGGERS",
      description:
        "Severe alerts trigger surge buying; replenishment quantities must anticipate spikes for critical SKUs.",
      linkType: "bkg",
    },
    {
      id: "l5003",
      source: "ext_demographics",
      target: "customer_segment",
      type: "SHAPES",
      description:
        "Demographics influence segment mix (pet vs livestock vs hobby farm) used for localization.",
      linkType: "bkg",
    },
    {
      id: "l5004",
      source: "ext_livestock_proxy",
      target: "subcategory",
      type: "SHAPES_DEMAND",
      description:
        "Livestock density proxies shift subcategory demand (feed/fencing) and service targets by store cluster.",
      linkType: "bkg",
    },
    {
      id: "l5005",
      source: "ext_competition",
      target: "dec_price_zones",
      type: "INFORMS",
      description:
        "Competitive intensity shapes zone design and KVI override frequency.",
      linkType: "bkg",
    },
    {
      id: "l5006",
      source: "ext_commodity_feed",
      target: "pricing_policy",
      type: "INFORMS",
      description:
        "Commodity feed costs inform pricing guardrails and margin sensitivity in feed categories.",
      linkType: "bkg",
    },
    {
      id: "l5007",
      source: "ext_fuel_cost",
      target: "kpi_fulfillment_cost",
      type: "INFLUENCES",
      description:
        "Fuel/freight cost indices raise cost-to-serve, changing routing and replenishment economics.",
      linkType: "bkg",
    },
    {
      id: "l5008",
      source: "ext_local_events",
      target: "demand_forecast",
      type: "INFORMS",
      description:
        "Local events shift timing of demand for livestock/seasonal categories; forecasts adjust peaks accordingly.",
      linkType: "bkg",
    },

    // ===== Data lineage (sources → nodes) =====
    {
      id: "d6001",
      source: "src_pos",
      target: "sales_transaction",
      type: "PROVIDES",
      description:
        "POS provides store transaction events used as the demand truth for store sales.",
      linkType: "data",
      nlQuery:
        "Pull daily POS transactions by store/SKU with price and discount fields.",
      dataContext:
        "POS header+line tables joined by transaction_id; include store_id, sku_id, qty, unit_price, discount, timestamp.",
    },
    {
      id: "d6002",
      source: "src_pos",
      target: "return",
      type: "PROVIDES",
      description:
        "POS provides return/refund events including reason codes and refund amounts.",
      linkType: "data",
      nlQuery:
        "Extract returns by store/SKU with return reason and disposition where captured.",
      dataContext:
        "Returns tables linked to original transaction_id when available; include sku, qty, refund, reason_code.",
    },
    {
      id: "d6003",
      source: "src_ecom",
      target: "order",
      type: "PROVIDES",
      description:
        "Ecommerce systems provide online orders, fulfillment choices, promises, and cancellation outcomes.",
      linkType: "data",
      nlQuery:
        "Extract order headers/lines with fulfillment mode, promise timestamps, and cancellation flags.",
      dataContext:
        "Orders + order_lines; include node assignment, promise_time, actual_ready/delivered time, cancel_reason.",
    },
    {
      id: "d6004",
      source: "src_wms",
      target: "inventory_position",
      type: "MEASURES",
      description:
        "WMS/inventory systems measure on-hand, in-transit, reserved, and adjustments by SKU-location.",
      linkType: "data",
      nlQuery:
        "Get latest on-hand, in-transit, reserved and adjustment events by SKU-store/DC.",
      dataContext:
        "Inventory snapshots + transactions; join by sku_id, location_id; include reserved_by_order where possible.",
    },
    {
      id: "d6005",
      source: "src_wms",
      target: "cycle_count",
      type: "PROVIDES",
      description:
        "WMS provides cycle count results and adjustment logs used to compute inventory accuracy over time.",
      linkType: "data",
      nlQuery:
        "Pull cycle count results and adjustments, tagged by reason and SKU criticality.",
      dataContext:
        "Cycle_count_events + adjustments; include counted_qty, system_qty, variance, reason_code, timestamp.",
    },
    {
      id: "d6006",
      source: "src_supplier",
      target: "purchase_order",
      type: "PROVIDES",
      description:
        "Supplier/EDI feeds provide purchase orders, ASNs, receipts, lead times, fill rates, and MOQ constraints.",
      linkType: "data",
      nlQuery:
        "Extract PO lifecycle (created, shipped, received) and compute OTIF and lead time variance by supplier.",
      dataContext:
        "PO + ASN + receipt tables; compute lead_time = receipt_date - ship_date; OTIF on-time & in-full flags.",
    },
    {
      id: "d6007",
      source: "src_carrier",
      target: "shipment",
      type: "PROVIDES",
      description:
        "Carrier tracking provides shipment status scans, ETAs, delivery exceptions, and lane reliability.",
      linkType: "data",
      nlQuery:
        "Pull tracking scans and delivery exception codes for shipments serving stores/customers.",
      dataContext:
        "Carrier API logs keyed by tracking_id; include scan_time, status, exception_code, delivered_time.",
    },
    {
      id: "d6008",
      source: "src_pricing",
      target: "pricing_policy",
      type: "PROVIDES",
      description:
        "Pricing system provides effective price histories, price zones, overrides, and KVI lists.",
      linkType: "data",
      nlQuery:
        "Pull effective prices by SKU-store-date and identify overrides vs base zone prices.",
      dataContext:
        "Price_effective table; include price_zone_id, override_flag, effective_start/end, sku_id, store_id.",
    },
    {
      id: "d6009",
      source: "src_promo",
      target: "promo_calendar",
      type: "PROVIDES",
      description:
        "Promo system provides promo timing, mechanics, spend, and historic lift/ROI labels.",
      linkType: "data",
      nlQuery:
        "Pull promo events and map to SKU/store clusters with planned depth and spend.",
      dataContext:
        "Promo header+SKU lists+store clusters; include start/end, discount, mechanic, spend, objective.",
    },
    {
      id: "d6010",
      source: "src_planograms",
      target: "planogram_space",
      type: "PROVIDES",
      description:
        "Planogram/space data provides facings/bays/endcaps and store layout capacity constraints.",
      linkType: "data",
      nlQuery:
        "Pull planogram capacity by store format and category/subcategory for the current set.",
      dataContext:
        "Planogram tables; include store_format_id, category_id, bay_count, facings, endcap availability.",
    },
    {
      id: "d6011",
      source: "src_weather",
      target: "ext_weather",
      type: "PROVIDES",
      description:
        "Weather feeds provide forecast signals mapped to store geos for demand and disruption modeling.",
      linkType: "data",
      nlQuery:
        "Get 14-day forecast (temp/precip) per store geo and identify anomalies vs seasonal normals.",
      dataContext:
        "Store lat/long → forecast grid; compute anomaly features; join to category sensitivity coefficients.",
    },
    {
      id: "d6012",
      source: "src_census_gis",
      target: "ext_demographics",
      type: "PROVIDES",
      description:
        "Census/GIS data provides catchment demographics and rural density used for localization and segmentation.",
      linkType: "data",
      nlQuery:
        "Compute catchment demographic vectors and mission-mix proxies for each store.",
      dataContext:
        "Census features + drive-time polygons; aggregate to store catchment; derive segment propensity scores.",
    },
    {
      id: "d6013",
      source: "src_competitor",
      target: "ext_competition",
      type: "PROVIDES",
      description:
        "Competitor feeds provide local KVI price gaps and promo intensity signals used to tune pricing decisions.",
      linkType: "data",
      nlQuery:
        "Identify stores with sustained KVI price gaps vs competitors and simulate price response impacts.",
      dataContext:
        "Competitor observations by geo; join to KVI list; compute gaps and elasticity-driven sales impact.",
    },
    {
      id: "d6014",
      source: "src_commodity",
      target: "ext_commodity_feed",
      type: "PROVIDES",
      description:
        "Commodity indices provide feed/fuel/freight cost signals used for margin and scenario planning.",
      linkType: "data",
      nlQuery:
        "Pull commodity/fuel indices and correlate to category margin and pricing changes.",
      dataContext:
        "Index time series joined to category cost/margin; compute pass-through and lag effects.",
    },
    {
      id: "d6015",
      source: "src_footfall",
      target: "kpi_traffic",
      type: "MEASURES",
      description:
        "Footfall analytics measure store traffic, enabling separation of demand creation from conversion.",
      linkType: "data",
      nlQuery:
        "Get daily traffic counts per store and join to weather/promo to explain swings.",
      dataContext:
        "Traffic by store-day; join to promo flags and weather anomalies; decompose traffic vs conversion effects.",
    },
    {
      id: "d6016",
      source: "src_support",
      target: "kpi_promise_accuracy",
      type: "EVIDENCES",
      description:
        "Support logs evidence promise failures (late delivery, missing items) and help root-cause routing/inventory issues.",
      linkType: "data",
      nlQuery:
        "Extract promise-related complaints and link to order shipments and routing decisions.",
      dataContext:
        "Support tickets tagged with issue types; join to order_id and shipment tracking; compute leading indicators.",
    },
  ]);

  const createVisualization = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    d3.select(svgElement).selectAll("*").remove();

    const width = 1400;
    const height = 650;

    const svg = d3
      .select(svgElement)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
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

    defs
      .append("marker")
      .attr("id", "arrowhead-data")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 18)
      .attr("refY", 0)
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#10B981");

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<Node, Link>(links)
          .id((d: Node) => d.id)
          .distance(180),
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide<Node>().radius((d) => {
          if (d.type === "source") {
            return Math.max(d.width || 0, d.height || 0) / 2 + 25;
          }
          return d.size + 25;
        }),
      );

    simulationRef.current = simulation;

    const linkHitbox = g
      .selectAll(".link-hitbox")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link-hitbox")
      .attr("stroke", "transparent")
      .attr("stroke-width", 20)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        event.stopPropagation();
        setSelectedItem({ ...d });
        setEditMode(d.linkType === "data" ? "datalink" : "link");
      })
      .on("mouseenter", function (event, d) {
        const linkElement = d3.select(this.nextSibling as Element);
        linkElement.attr(
          "data-original-width",
          linkElement.attr("stroke-width"),
        );
        linkElement.attr("data-original-stroke", linkElement.attr("stroke"));
        linkElement.attr("stroke-width", 3).attr("stroke", "#9CA3AF");
      })
      .on("mouseleave", function (event, d) {
        const linkElement = d3.select(this.nextSibling as Element);
        const origWidth = linkElement.attr("data-original-width");
        const origStroke = linkElement.attr("data-original-stroke");
        if (origWidth && origStroke) {
          linkElement
            .attr("stroke-width", origWidth)
            .attr("stroke", origStroke);
        }
      });

    const link = g
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", (d) => (d.linkType === "data" ? "#10B981" : "#E5E7EB"))
      .attr("stroke-width", (d) => (d.linkType === "data" ? 2 : 1.5))
      .attr("stroke-opacity", 0.6)
      .attr("stroke-dasharray", (d) => (d.linkType === "data" ? "5,5" : "none"))
      .attr("marker-end", (d) =>
        d.linkType === "data" ? "url(#arrowhead-data)" : "url(#arrowhead)",
      )
      .style("pointer-events", "none");

    const node = g
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, Node>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      )
      .on("click", (event, d) => {
        event.stopPropagation();
        setSelectedItem({ ...d });
        setEditMode("node");
      });

    // Render circles for BKG nodes
    node
      .filter((d) => d.type === "bkg")
      .append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Render rectangles for source nodes
    node
      .filter((d) => d.type === "source")
      .append("rect")
      .attr("x", (d) => -(d.width || 0) / 2)
      .attr("y", (d) => -(d.height || 0) / 2)
      .attr("width", (d) => d.width || 0)
      .attr("height", (d) => d.height || 0)
      .attr("rx", 8)
      .attr("fill", (d) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    node
      .append("text")
      .attr("dy", (d) => (d.type === "source" ? 4 : d.size + 14))
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("fill", (d) => (d.type === "source" ? "#fff" : "#374151"))
      .style("pointer-events", "none")
      .text((d) => d.name);

    const linkText = g
      .selectAll(".link-label")
      .data(links.filter((l) => l.linkType === "bkg"))
      .enter()
      .append("text")
      .attr("class", "link-label")
      .attr("font-size", "9px")
      .attr("font-weight", "500")
      .attr("fill", "#9CA3AF")
      .attr("text-anchor", "middle")
      .style("pointer-events", "none")
      .text((d) => d.type);

    simulation.on("tick", () => {
      linkHitbox
        .attr("x1", (d) => (d.source as Node).x ?? 0)
        .attr("y1", (d) => (d.source as Node).y ?? 0)
        .attr("x2", (d) => (d.target as Node).x ?? 0)
        .attr("y2", (d) => (d.target as Node).y ?? 0);

      link
        .attr("x1", (d) => (d.source as Node).x ?? 0)
        .attr("y1", (d) => (d.source as Node).y ?? 0)
        .attr("x2", (d) => (d.target as Node).x ?? 0)
        .attr("y2", (d) => (d.target as Node).y ?? 0);

      linkText
        .attr(
          "x",
          (d) =>
            (((d.source as Node).x ?? 0) + ((d.target as Node).x ?? 0)) / 2,
        )
        .attr(
          "y",
          (d) =>
            (((d.source as Node).y ?? 0) + ((d.target as Node).y ?? 0)) / 2,
        );

      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    function dragstarted(
      event: d3.D3DragEvent<SVGGElement, Node, Node>,
      d: Node,
    ) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x ?? 0;
      d.fy = d.y ?? 0;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(
      event: d3.D3DragEvent<SVGGElement, Node, Node>,
      d: Node,
    ) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      createVisualization();
      isInitialMount.current = false;
    } else if (simulationRef.current && svgRef.current) {
      // Update existing simulation without recreating
      simulationRef.current.nodes(nodes);
      const linkForce = d3
        .forceLink<Node, Link>(links)
        .id((d: Node) => d.id)
        .distance(180);
      simulationRef.current.force("link", linkForce);

      // Update visual elements with proper key binding
      const svg = d3.select(svgRef.current);
      const g = svg.select("g");

      // Update node visuals - bind by id
      g.selectAll<SVGCircleElement, Node>(".node circle")
        .data(
          nodes.filter((n) => n.type === "bkg"),
          (d: Node) => d.id,
        )
        .attr("r", (d) => d.size)
        .attr("fill", (d) => d.color);

      g.selectAll<SVGRectElement, Node>(".node rect")
        .data(
          nodes.filter((n) => n.type === "source"),
          (d: Node) => d.id,
        )
        .attr("fill", (d) => d.color);

      g.selectAll<SVGTextElement, Node>(".node text")
        .data(nodes, (d: Node) => d.id)
        .text((d) => d.name)
        .attr("fill", (d) => (d.type === "source" ? "#fff" : "#374151"));

      // Update link visuals - bind by id
      g.selectAll<SVGLineElement, Link>(".link")
        .data(links, (d: Link) => d.id)
        .attr("stroke", (d) => (d.linkType === "data" ? "#10B981" : "#E5E7EB"));

      g.selectAll<SVGTextElement, Link>(".link-label")
        .data(
          links.filter((l) => l.linkType === "bkg"),
          (d: Link) => d.id,
        )
        .text((d) => d.type);

      simulationRef.current.alpha(0.1).restart();
    }
  }, [nodes, links]);

  const handleNodeUpdate = (field: keyof Node, value: string | number) => {
    if (!selectedItem || editMode !== "node") return;

    const nodeId = (selectedItem as Node).id;

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === nodeId) {
          // Get current position from simulation if available
          const simNode = simulationRef.current
            ?.nodes()
            .find((n) => n.id === nodeId);
          return {
            ...node,
            [field]: value,
            // Preserve simulation properties if they exist
            ...(simNode && {
              x: simNode.x,
              y: simNode.y,
              vx: simNode.vx,
              vy: simNode.vy,
              fx: simNode.fx,
              fy: simNode.fy,
            }),
          };
        }
        return node;
      }),
    );
    setSelectedItem((prev) => ({ ...prev!, [field]: value }) as Node | Link);
  };

  const handleLinkUpdate = (field: keyof Link, value: string) => {
    if (!selectedItem || (editMode !== "link" && editMode !== "datalink"))
      return;

    const linkId = (selectedItem as Link).id;

    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === linkId ? { ...link, [field]: value } : link,
      ),
    );
    setSelectedItem((prev) => ({ ...prev!, [field]: value }) as Node | Link);
  };

  const closeEditor = () => {
    setSelectedItem(null);
    setEditMode(null);
  };

  const getNodeId = (nodeOrId: string | Node): string => {
    return typeof nodeOrId === "string" ? nodeOrId : nodeOrId.id;
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="flex-1 relative">
        <svg ref={svgRef} className="w-full h-full bg-white" />
      </div>

      {selectedItem && editMode && (
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {editMode === "node" ? "Edit Node" : "Edit Link"}
            </h2>
            <button
              onClick={closeEditor}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

          {editMode === "node" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={(selectedItem as Node).name}
                  onChange={(e) => handleNodeUpdate("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={(selectedItem as Node).description}
                  onChange={(e) =>
                    handleNodeUpdate("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {(selectedItem as Node).type === "bkg" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="30"
                    value={(selectedItem as Node).size}
                    onChange={(e) =>
                      handleNodeUpdate("size", parseInt(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="range"
                    min="8"
                    max="30"
                    value={(selectedItem as Node).size}
                    onChange={(e) =>
                      handleNodeUpdate("size", parseInt(e.target.value))
                    }
                    className="w-full mt-2"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={(selectedItem as Node).color}
                    onChange={(e) => handleNodeUpdate("color", e.target.value)}
                    className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={(selectedItem as Node).color}
                    onChange={(e) => handleNodeUpdate("color", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  ID: {(selectedItem as Node).id}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Type: {(selectedItem as Node).type}
                </p>
              </div>
            </div>
          )}

          {(editMode === "link" || editMode === "datalink") && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link Type
                </label>
                <input
                  type="text"
                  value={(selectedItem as Link).type}
                  onChange={(e) => handleLinkUpdate("type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From (Source)
                </label>
                <select
                  value={getNodeId((selectedItem as Link).source)}
                  onChange={(e) => handleLinkUpdate("source", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name} ({node.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To (Target)
                </label>
                <select
                  value={getNodeId((selectedItem as Link).target)}
                  onChange={(e) => handleLinkUpdate("target", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.name} ({node.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={(selectedItem as Link).description}
                  onChange={(e) =>
                    handleLinkUpdate("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {editMode === "datalink" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NL Query
                    </label>
                    <textarea
                      value={(selectedItem as Link).nlQuery || ""}
                      onChange={(e) =>
                        handleLinkUpdate("nlQuery", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Context
                    </label>
                    <textarea
                      value={(selectedItem as Link).dataContext || ""}
                      onChange={(e) =>
                        handleLinkUpdate("dataContext", e.target.value)
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  ID: {(selectedItem as Link).id}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Link Type: {(selectedItem as Link).linkType}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

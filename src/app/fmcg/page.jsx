"use client";
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const FMCGKnowledgeGraph = () => {
  const svgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showTraversal, setShowTraversal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [traversalStep, setTraversalStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState(new Set());
  const [highlightedLinks, setHighlightedLinks] = useState(new Set());
  const traversalTimerRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
const [expandedThinking, setExpandedThinking] = useState(new Set());
const revealTimerRef = useRef(null);
const [showThinkingHistory, setShowThinkingHistory] = useState(false);

  
  const questions = [
    {
      "id": 1,
      "title": "Sales Trend Analysis",
      "question": "What is the average sales trend in cases for the past 3 months for Lay's 48g Spanish Tomato SKU per month across Delhi and Mumbai in General Trade?",
      "outputExpectation": "Stacked column chart (Delhi vs Mumbai month-wise for last 3 months) + text overlay with 3-month average for both cities",
      "iterations": [
        {
          "iteration": 0,
          "phase": "Interpret Business Meaning",
          "think": "'Sales trend in cases' could be primary (company → distributor) or secondary (distributor → market). Since the view is city-level (Delhi/Mumbai) and GT, this usually means secondary sales tied to outlet/customer city. I'll proceed with secondary sales and sanity-check magnitude so I don't accidentally pull primary dispatches.",
          "fetch": null,
          "analyse": null,
          "nodesInvolved": []
        },
        {
          "iteration": 1,
          "phase": "Resolve SKU and Scope Entities",
          "think": "SKU ambiguity is the most common failure. I'll resolve the SKU using brand + flavour + pack size and confirm UoM is cases.",
          "fetch": {
            "nodes": ["SKU", "Brand", "Variant", "UoM", "UoMConversion"],
            "result": {
              "sku_id": "SKU_104812",
              "sku_name": "Lay's Spanish Tomato 48g",
              "uom": "CASE",
              "note": "Already stored in cases; no conversion needed"
            }
          },
          "analyse": "SKU resolved successfully. UoM is already in cases, no conversion required.",
          "nodesInvolved": ["SKU", "Brand", "Variant", "UoM", "UoMConversion"]
        },
        {
          "iteration": 1.1,
          "phase": "Resolve Geography and Channel",
          "think": "Now lock cities and channel. GT can have aliases (Traditional Trade/TT). I'll resolve canonical IDs.",
          "fetch": {
            "nodes": ["GeographyNode", "Channel"],
            "result": {
              "delhi": "GEO_DEL_CITY",
              "mumbai": "GEO_MUM_CITY",
              "channel": "CH_GT"
            }
          },
          "analyse": "Geography and channel resolved to canonical IDs.",
          "nodesInvolved": ["GeographyNode", "Channel"]
        },
        {
          "iteration": 2,
          "phase": "Choose City Mapping Method",
          "think": "To classify sales as Delhi vs Mumbai, mapping should come from buyer outlet (best). If outlet mapping is incomplete, fallback to customer territory. I'll try outlet first and check coverage.",
          "fetch": {
            "nodes": ["SalesTransaction", "SalesLine", "Outlet", "Customer", "GeographyNode", "TimeMonth"],
            "fields": [
              "SalesLine.sku_id",
              "SalesLine.qty_cases",
              "SalesTransaction.txn_datetime",
              "SalesTransaction.channel_id",
              "SalesTransaction.buyer_outlet_id",
              "Outlet.geo_id"
            ]
          },
          "analyse": "Coverage check: If less than 90% of volume maps to an outlet city, I'll switch to territory-based mapping. (Assume coverage is good in this hypothetical.)",
          "nodesInvolved": ["SalesTransaction", "SalesLine", "Outlet", "Customer", "GeographyNode", "TimeMonth"]
        },
        {
          "iteration": 3,
          "phase": "Aggregate and Sanity Check",
          "think": "Filter to: sku_id=SKU_104812 AND channel_id=CH_GT AND buyer_city in {Delhi,Mumbai} AND month in last 3 months. Then aggregate SUM(qty_cases) by (month, city).",
          "fetch": null,
          "analyse": {
            "filters_applied": "sku_id=SKU_104812 AND channel_id=CH_GT AND buyer_city in {Delhi,Mumbai} AND month in last 3 months",
            "aggregation": "SUM(qty_cases) GROUP BY (month, city)",
            "intermediateResults": {
              "Oct 2025": {
                "Delhi": 1240,
                "Mumbai": 1110
              },
              "Nov 2025": {
                "Delhi": 1520,
                "Mumbai": 1340
              },
              "Dec 2025": {
                "Delhi": 1380,
                "Mumbai": 1560
              }
            },
            "sanityChecks": [
              "Ensure returns/negative invoices aren't inflating/deflating trend",
              "Ensure no MT/Ecom slipped in"
            ],
            "sanityCheckResult": "All checks passed"
          },
          "nodesInvolved": ["SalesLine", "SalesTransaction", "TimeMonth", "GeographyNode"]
        },
        {
          "iteration": 4,
          "phase": "Compute Overlay Averages",
          "think": "Calculate 3-month average for each city to provide overlay metrics.",
          "fetch": null,
          "analyse": {
            "delhi_avg": {
              "calculation": "(1240+1520+1380)/3",
              "result": 1380,
              "unit": "cases/month"
            },
            "mumbai_avg": {
              "calculation": "(1110+1340+1560)/3",
              "result": 1337,
              "unit": "cases/month"
            }
          },
          "nodesInvolved": []
        }
      ],
      "finalResponse": {
        "type": "text_with_chart",
        "summary": "For Lay's Spanish Tomato 48g (General Trade) across Delhi vs Mumbai (Oct–Dec 2025):",
        "monthWiseData": {
          "Oct 2025": {
            "Delhi": 1240,
            "Mumbai": 1110
          },
          "Nov 2025": {
            "Delhi": 1520,
            "Mumbai": 1340
          },
          "Dec 2025": {
            "Delhi": 1380,
            "Mumbai": 1560
          }
        },
        "threeMonthAverage": {
          "Delhi": "1,380 cases/month",
          "Mumbai": "1,337 cases/month"
        },
        "nodesUsed": ["SKU", "Brand", "Variant", "Channel", "GeographyNode", "SalesTransaction", "SalesLine", "Outlet", "Customer", "TimeMonth", "UoM", "UoMConversion"]
      }
    },
    {
      "id": 2,
      "title": "Overall Sales Order Loss",
      "question": "What was the overall sales order loss in the last 2 weeks of December 2025 across Bangalore city?",
      "outputExpectation": "Stacked column chart at brand level (Lay's, Kurkure, Cheetos, Doritos, Quaker, Uncle Chips) showing total order loss in cases; overlay with overall loss",
      "iterations": [
        {
          "iteration": 0,
          "phase": "Confirm Definition",
          "think": "In this context 'order loss' should be short-fulfillment: requested − fulfilled (cases). I'll compute it at order-line level.",
          "fetch": null,
          "analyse": "Definition confirmed: order_loss = requested_cases - fulfilled_cases (per order line)",
          "nodesInvolved": []
        },
        {
          "iteration": 1,
          "phase": "Lock Geography and Time Window",
          "think": "Need to establish the exact geography ID for Bangalore and the specific date range for 'last 2 weeks of December 2025'.",
          "fetch": {
            "nodes": ["GeographyNode", "TimeDay"],
            "result": {
              "bangalore": "GEO_BLR_CITY",
              "timeWindow": "2025-12-18 to 2025-12-31"
            }
          },
          "analyse": "Geography and time scope locked: Bangalore city for Dec 18-31, 2025",
          "nodesInvolved": ["GeographyNode", "TimeDay"]
        },
        {
          "iteration": 2,
          "phase": "Build Pristine Order Population",
          "think": "'Across Bangalore city' should be based on deliver-to location. I'll filter orders whose deliver-to outlet/customer is in Bangalore and order date is in-window.",
          "fetch": {
            "nodes": ["SalesOrder", "SalesOrderLine", "Customer", "Outlet", "GeographyNode"],
            "fields": [
              "SalesOrder.order_id",
              "SalesOrder.order_datetime",
              "SalesOrder.deliver_to_id",
              "SalesOrderLine.order_line_id",
              "SalesOrderLine.sku_id",
              "SalesOrderLine.requested_qty_cases"
            ],
            "filters": "deliver_to location in Bangalore AND order_datetime between 2025-12-18 and 2025-12-31"
          },
          "analyse": "Pristine order population built based on deliver-to location in Bangalore city within specified date range.",
          "nodesInvolved": ["SalesOrder", "SalesOrderLine", "Customer", "Outlet", "GeographyNode"]
        },
        {
          "iteration": 3,
          "phase": "Attach Fulfillment Carefully",
          "think": "Fulfillment can be split across multiple documents. I'll sum fulfilled cases per order line to avoid partial/double counting.",
          "fetch": {
            "nodes": ["FulfillmentEvent", "FulfillmentLine"],
            "fields": [
              "FulfillmentLine.order_line_id",
              "FulfillmentLine.fulfilled_qty_cases",
              "FulfillmentEvent.event_type",
              "FulfillmentEvent.event_datetime"
            ]
          },
          "analyse": {
            "calculation": "For each order line: fulfilled_cases = SUM(fulfilled_qty_cases); loss_cases = MAX(requested_cases − fulfilled_cases, 0)",
            "note": "Ensuring no negative loss values by using MAX with 0"
          },
          "nodesInvolved": ["FulfillmentEvent", "FulfillmentLine"]
        },
        {
          "iteration": 4,
          "phase": "Roll Up to Brand Level",
          "think": "Need to aggregate order loss by brand to show brand-wise breakdown. Join SKU to Brand for classification.",
          "fetch": {
            "nodes": ["SKU", "Brand"]
          },
          "analyse": {
            "brandTotals": {
              "Lay's": 1420,
              "Kurkure": 980,
              "Cheetos": 260,
              "Doritos": 340,
              "Quaker": 190,
              "Uncle Chips": 310
            },
            "overallLoss": 3500,
            "unit": "cases"
          },
          "nodesInvolved": ["SKU", "Brand"]
        }
      ],
      "finalResponse": {
        "type": "text_with_breakdown",
        "summary": "Bangalore city — Sales order loss (18–31 Dec 2025): 3,500 cases",
        "brandWiseBreakdown": [
          {
            "brand": "Lay's",
            "loss": 1420
          },
          {
            "brand": "Kurkure",
            "loss": 980
          },
          {
            "brand": "Doritos",
            "loss": 340
          },
          {
            "brand": "Uncle Chips",
            "loss": 310
          },
          {
            "brand": "Cheetos",
            "loss": 260
          },
          {
            "brand": "Quaker",
            "loss": 190
          }
        ],
        "nodesUsed": ["GeographyNode", "TimeDay", "SalesOrder", "SalesOrderLine", "Customer", "Outlet", "FulfillmentEvent", "FulfillmentLine", "SKU", "Brand"]
      }
    },
    {
      "id": 3,
      "title": "Root Cause Analysis - Why Did Order Loss Happen",
      "question": "What was the reason for this sales order loss?",
      "outputExpectation": "Bar graph or paragraph breaking down overall loss into % and cases for: Stock unavailability at distributor, Stock unavailability at warehouse, Order not serviced by distributor despite stock availability",
      "iterations": [
        {
          "iteration": 0,
          "phase": "Decide Approach Without Reason Codes",
          "think": "We're explicitly not using a reason taxonomy node. I'll derive drivers using evidence checks on inventory positions and service attempts. To avoid mis-blame, I'll check 'not serviced despite stock' first.",
          "fetch": null,
          "analyse": {
            "input": "Shortfall lines from Q2 (total loss = 3,500 cases)",
            "approach": "Evidence-based bucketing using inventory and service attempt data"
          },
          "nodesInvolved": []
        },
        {
          "iteration": 1,
          "phase": "Bucket: Not Serviced Despite Stock",
          "think": "If ATP was adequate but service failed, it's an execution issue. This should be checked first to avoid misattributing to stock issues.",
          "fetch": {
            "nodes": ["ServiceAttempt", "InventoryPosition", "SupplyNode"],
            "fields": [
              "ServiceAttempt.status",
              "ServiceAttempt.attempt_datetime",
              "ServiceAttempt.service_node_id",
              "InventoryPosition.ATP_cases (aligned to attempt time)"
            ]
          },
          "analyse": {
            "rule": "If ATP >= requested AND service status is failed/partial → bucket 'not serviced despite stock'",
            "result": {
              "cases": 875,
              "percentage": 25,
              "interpretation": "Execution/service issue despite adequate inventory"
            }
          },
          "nodesInvolved": ["ServiceAttempt", "InventoryPosition", "SupplyNode"]
        },
        {
          "iteration": 2,
          "phase": "Bucket: Distributor Stock Unavailability",
          "think": "Now I'll check whether distributor warehouse stock was insufficient at service time for remaining unexplained shortfalls.",
          "fetch": {
            "nodes": ["SupplyNode", "InventoryPosition"],
            "filters": "SupplyNode.node_type = 'DistributorWarehouse'"
          },
          "analyse": {
            "rule": "distributor ATP < requested at service time → 'stock unavailability at distributor'",
            "result": {
              "cases": 1505,
              "percentage": 43,
              "interpretation": "Insufficient stock at distributor level"
            }
          },
          "nodesInvolved": ["SupplyNode", "InventoryPosition"]
        },
        {
          "iteration": 3,
          "phase": "Bucket: Warehouse/Depot Stock Unavailability",
          "think": "For remaining lines, check ship-from node (warehouse/depot) ATP around commit/dispatch time.",
          "fetch": {
            "nodes": ["SalesOrder", "SupplyNode", "InventoryPosition"],
            "fields": [
              "SalesOrder.ship_from_node_id",
              "SupplyNode (warehouse/depot level)",
              "InventoryPosition.ATP_cases"
            ]
          },
          "analyse": {
            "result": {
              "cases": 1120,
              "percentage": 32,
              "interpretation": "Insufficient stock at warehouse/depot level"
            },
            "sanityCheck": {
              "calculation": "875 + 1505 + 1120",
              "total": 3500,
              "status": "✓ All cases accounted for"
            }
          },
          "nodesInvolved": ["SalesOrder", "SupplyNode", "InventoryPosition"]
        }
      ],
      "finalResponse": {
        "type": "text_with_breakdown",
        "summary": "Here's the breakdown of the 3,500 cases of Bangalore order loss (18–31 Dec 2025), derived from inventory and servicing evidence:",
        "breakdown": [
          {
            "cause": "Stock unavailability at distributor",
            "cases": 1505,
            "percentage": 43
          },
          {
            "cause": "Stock unavailability at warehouse/depot",
            "cases": 1120,
            "percentage": 32
          },
          {
            "cause": "Not serviced despite stock availability (execution issue)",
            "cases": 875,
            "percentage": 25
          }
        ],
        "nodesUsed": ["SalesOrderLine", "InventoryPosition", "ServiceAttempt", "SupplyNode", "SalesOrder"]
      }
    },
    {
      "id": 4,
      "title": "Distributor Order Fulfillment Rate - Bangalore Depot",
      "question": "What has been the distributor order fulfillment rate against pristine order for Bangalore depot in the last 3 months?",
      "outputExpectation": "Month-wise fill rate",
      "iterations": [
        {
          "iteration": 0,
          "phase": "Resolve Depot Node Cleanly",
          "think": "'Bangalore depot' could map to CFA/depot/DC. I'll resolve the exact SupplyNode first to ensure accuracy.",
          "fetch": {
            "nodes": ["SupplyNode"],
            "result": {
              "node_id": "NODE_BLR_DEPOT",
              "node_name": "Bangalore Depot"
            }
          },
          "analyse": "Depot node clearly identified as NODE_BLR_DEPOT",
          "nodesInvolved": ["SupplyNode"]
        },
        {
          "iteration": 1,
          "phase": "Compute Month-wise Requested vs Fulfilled",
          "think": "Need to calculate both requested and fulfilled cases for each month, ensuring consistent time bucketing.",
          "fetch": {
            "nodes": ["TimeMonth", "SalesOrder", "SalesOrderLine", "FulfillmentLine"],
            "aggregation": {
              "requested": "SUM(requested_cases) for orders with ship_from=NODE_BLR_DEPOT by month",
              "fulfilled": "SUM(fulfilled_cases) joined to those order lines by month"
            },
            "result": {
              "Oct 2025": {
                "requested": 48000,
                "fulfilled": 41280
              },
              "Nov 2025": {
                "requested": 52500,
                "fulfilled": 46200
              },
              "Dec 2025": {
                "requested": 50000,
                "fulfilled": 44000
              }
            }
          },
          "analyse": "Successfully pulled requested and fulfilled volumes for all 3 months",
          "nodesInvolved": ["TimeMonth", "SalesOrder", "SalesOrderLine", "FulfillmentLine"]
        },
        {
          "iteration": 2,
          "phase": "Compute Fill Rates and Sanity Check",
          "think": "Calculate fill rate as fulfilled/requested. Need to verify that fulfillment month aligns with order month to avoid skewing.",
          "fetch": null,
          "analyse": {
            "calculations": {
              "Oct 2025": {
                "requested": 48000,
                "fulfilled": 41280,
                "fillRate": 86.0,
                "calculation": "41280 / 48000 * 100"
              },
              "Nov 2025": {
                "requested": 52500,
                "fulfilled": 46200,
                "fillRate": 88.0,
                "calculation": "46200 / 52500 * 100"
              },
              "Dec 2025": {
                "requested": 50000,
                "fulfilled": 44000,
                "fillRate": 88.0,
                "calculation": "44000 / 50000 * 100"
              }
            },
            "sanityCheck": "If fulfillment month was based on delivery date while requested month is order creation, it can skew. Assume both are consistently bucketed to order month (or consistently to service month).",
            "assumption": "Time bucketing is consistent across requested and fulfilled metrics"
          },
          "nodesInvolved": []
        }
      ],
      "finalResponse": {
        "type": "text_with_metrics",
        "summary": "Bangalore depot — fulfillment rate vs pristine (Oct–Dec 2025):",
        "monthlyMetrics": [
          {
            "month": "Oct 2025",
            "fulfilled": 41280,
            "requested": 48000,
            "fillRate": "86.0%"
          },
          {
            "month": "Nov 2025",
            "fulfilled": 46200,
            "requested": 52500,
            "fillRate": "88.0%"
          },
          {
            "month": "Dec 2025",
            "fulfilled": 44000,
            "requested": 50000,
            "fillRate": "88.0%"
          }
        ],
        "nodesUsed": ["SupplyNode", "TimeMonth", "SalesOrder", "SalesOrderLine", "FulfillmentLine"]
      }
    },
    {
      "id": 5,
      "title": "SKU-wise Fill Rate for Top SKUs - Bangalore Depot",
      "question": "Can you show this SKU-wise for top 5 SKUs by volumes (for Bangalore depot, last 3 months)?",
      "outputExpectation": "SKU-wise fill rate table",
      "iterations": [
        {
          "iteration": 0,
          "phase": "Decide Ranking Basis",
          "think": "'Top 5 by volumes' could be ranked by fulfilled or requested. Since the theme is pristine vs fulfilled, I'll rank by requested volume (pristine demand), then compute fill rate.",
          "fetch": null,
          "analyse": "Decision: Rank by requested cases (pristine demand) to identify SKUs with highest demand",
          "nodesInvolved": []
        },
        {
          "iteration": 1,
          "phase": "Identify Top 5 SKUs by Requested Cases",
          "think": "Need to aggregate requested cases per SKU for Bangalore depot over last 3 months, then sort and take top 5.",
          "fetch": {
            "nodes": ["SalesOrder", "SalesOrderLine", "SKU", "TimeMonth", "SupplyNode"],
            "filters": "ship_from=NODE_BLR_DEPOT AND last 3 months",
            "aggregation": "SUM(requested_cases) per SKU, ORDER BY DESC, LIMIT 5",
            "result": [
              {
                "sku": "Lay's 48g Magic Masala",
                "requestedCases": 9400
              },
              {
                "sku": "Lay's 48g Spanish Tomato",
                "requestedCases": 8700
              },
              {
                "sku": "Quaker Rolled Oats 500g",
                "requestedCases": 6200
              },
              {
                "sku": "Kurkure 50g",
                "requestedCases": 5900
              },
              {
                "sku": "Doritos Nacho Cheese 60g",
                "requestedCases": 5100
              }
            ]
          },
          "analyse": "Top 5 SKUs identified by pristine demand volume",
          "nodesInvolved": ["SalesOrder", "SalesOrderLine", "SKU", "TimeMonth", "SupplyNode"]
        },
        {
          "iteration": 2,
          "phase": "Compute Fill Rate per SKU",
          "think": "For each of the top 5 SKUs, calculate fill rate as fulfilled/requested by joining fulfillment data.",
          "fetch": {
            "nodes": ["FulfillmentLine"],
            "note": "Joined to the order lines for the top 5 SKUs"
          },
          "analyse": {
            "calculation": "fill_rate_per_SKU = fulfilled / requested * 100",
            "results": [
              {
                "sku": "Lay's 48g Magic Masala",
                "fillRate": 82
              },
              {
                "sku": "Lay's 48g Spanish Tomato",
                "fillRate": 74
              },
              {
                "sku": "Quaker Rolled Oats 500g",
                "fillRate": 91
              },
              {
                "sku": "Kurkure 50g",
                "fillRate": 87
              },
              {
                "sku": "Doritos Nacho Cheese 60g",
                "fillRate": 77
              }
            ]
          },
          "nodesInvolved": ["FulfillmentLine"]
        }
      ],
      "finalResponse": {
        "type": "table",
        "summary": "Top 5 SKUs by requested volume (Bangalore depot, Oct–Dec 2025) — fill rate:",
        "tableData": [
          {
            "sku": "Lay's 48g Magic Masala",
            "fillRate": "82%"
          },
          {
            "sku": "Lay's 48g Spanish Tomato",
            "fillRate": "74%"
          },
          {
            "sku": "Quaker Rolled Oats 500g",
            "fillRate": "91%"
          },
          {
            "sku": "Kurkure 50g",
            "fillRate": "87%"
          },
          {
            "sku": "Doritos Nacho Cheese 60g",
            "fillRate": "77%"
          }
        ],
        "nodesUsed": ["SupplyNode", "TimeMonth", "SalesOrder", "SalesOrderLine", "FulfillmentLine", "SKU"]
      }
    }
  ];
  
  const initialNodes = [
    // A) Product, Packaging, and Master Data
    { id: 'sku', name: 'SKU', group: 'Product', color: '#3B82F6', size: 18, type: 'circle', properties: ['sku_id', 'sku_name', 'status', 'brand_id', 'variant_id', 'category_id', 'segment_id', 'pack_format_id', 'pack_size_gml', 'net_weight_gml', 'base_uom', 'case_uom', 'units_per_case', 'mrp_unit', 'shelf_life_days'] },
    { id: 'brand', name: 'Brand', group: 'Product', color: '#3B82F6', size: 16, type: 'circle', properties: ['brand_id', 'brand_name', 'portfolio', 'status'] },
    { id: 'variant', name: 'Variant', group: 'Product', color: '#3B82F6', size: 14, type: 'circle', properties: ['variant_id', 'variant_name', 'status'] },
    { id: 'category', name: 'Category', group: 'Product', color: '#3B82F6', size: 14, type: 'circle', properties: ['category_id', 'category_name'] },
    { id: 'segment', name: 'Segment', group: 'Product', color: '#3B82F6', size: 14, type: 'circle', properties: ['segment_id', 'segment_name'] },
    { id: 'packformat', name: 'PackFormat', group: 'Product', color: '#3B82F6', size: 12, type: 'circle', properties: ['pack_format_id', 'pack_format_name'] },
    { id: 'uom', name: 'UoM', group: 'Product', color: '#3B82F6', size: 12, type: 'circle', properties: ['uom_id', 'uom_code', 'uom_desc'] },
    { id: 'uomconversion', name: 'UoMConversion', group: 'Product', color: '#8B5CF6', size: 11, type: 'circle', properties: ['conversion_id', 'sku_id', 'from_uom', 'to_uom', 'factor', 'valid_from', 'valid_to'] },
    { id: 'skuplantctx', name: 'SKUPlantContext', group: 'Product', color: '#8B5CF6', size: 11, type: 'circle', properties: ['sku_plant_ctx_id', 'sku_id', 'plant_node_id', 'valid_from', 'valid_to'] },
    { id: 'bom', name: 'BillOfMaterials', group: 'Product', color: '#8B5CF6', size: 12, type: 'circle', properties: ['bom_id', 'sku_id', 'version', 'valid_from', 'valid_to'] },
    { id: 'bomcomponent', name: 'BOMComponent', group: 'Product', color: '#8B5CF6', size: 10, type: 'circle', properties: ['bom_component_id', 'bom_id', 'material_id', 'qty_per_base_uom', 'uom'] },
    { id: 'material', name: 'Material', group: 'Product', color: '#8B5CF6', size: 12, type: 'circle', properties: ['material_id', 'material_name', 'material_type', 'base_uom'] },
    
    // B) Geography and Time
    { id: 'geography', name: 'GeographyNode', group: 'Geography', color: '#10B981', size: 16, type: 'circle', properties: ['geo_id', 'geo_name', 'geo_type', 'parent_geo_id'] },
    { id: 'timeday', name: 'TimeDay', group: 'Time', color: '#14B8A6', size: 13, type: 'circle', properties: ['date', 'week_id', 'month_id', 'fiscal_period_id'] },
    { id: 'timeweek', name: 'TimeWeek', group: 'Time', color: '#14B8A6', size: 13, type: 'circle', properties: ['week_id', 'week_start_date', 'week_end_date', 'month_id'] },
    { id: 'timemonth', name: 'TimeMonth', group: 'Time', color: '#14B8A6', size: 13, type: 'circle', properties: ['month_id', 'month_start_date', 'month_end_date', 'fiscal_period_id'] },
    { id: 'fiscalperiod', name: 'FiscalPeriod', group: 'Time', color: '#14B8A6', size: 11, type: 'circle', properties: ['fiscal_period_id', 'fiscal_year', 'fiscal_month', 'start_date', 'end_date'] },
    
    // C) RTM / Customer / Outlet
    { id: 'channel', name: 'Channel', group: 'RTM', color: '#06B6D4', size: 16, type: 'circle', properties: ['channel_id', 'channel_name'] },
    { id: 'customer', name: 'Customer', group: 'RTM', color: '#06B6D4', size: 17, type: 'circle', properties: ['customer_id', 'customer_name', 'customer_type', 'channel_id', 'status', 'credit_terms_code', 'gstin'] },
    { id: 'customergroup', name: 'CustomerGroup', group: 'RTM', color: '#06B6D4', size: 12, type: 'circle', properties: ['customer_group_id', 'group_name', 'group_type'] },
    { id: 'outlet', name: 'Outlet', group: 'RTM', color: '#06B6D4', size: 16, type: 'circle', properties: ['outlet_id', 'outlet_name', 'outlet_type', 'channel_id', 'status', 'parent_customer_id'] },
    { id: 'outletuniverse', name: 'OutletUniverse', group: 'RTM', color: '#06B6D4', size: 11, type: 'circle', properties: ['universe_id', 'definition_name', 'geo_scope', 'channel_scope', 'as_of_date'] },
    { id: 'outletweight', name: 'OutletWeight', group: 'RTM', color: '#06B6D4', size: 10, type: 'circle', properties: ['outlet_id', 'weight_value', 'weight_basis', 'valid_from', 'valid_to'] },
    { id: 'assortment', name: 'AssortmentListing', group: 'RTM', color: '#8B5CF6', size: 11, type: 'circle', properties: ['listing_id', 'outlet_id', 'sku_id', 'listed_flag', 'valid_from', 'valid_to'] },
    { id: 'territory', name: 'SalesTerritory', group: 'RTM', color: '#06B6D4', size: 14, type: 'circle', properties: ['territory_id', 'territory_name', 'territory_level'] },
    { id: 'route', name: 'RouteBeat', group: 'RTM', color: '#06B6D4', size: 12, type: 'circle', properties: ['route_id', 'route_name', 'territory_id', 'status'] },
    { id: 'salesrep', name: 'SalesRep', group: 'RTM', color: '#06B6D4', size: 11, type: 'circle', properties: ['rep_id', 'rep_name', 'rep_type', 'territory_id'] },
    
    // D) Supply Network
    { id: 'supplynode', name: 'SupplyNode', group: 'Supply', color: '#F59E0B', size: 17, type: 'circle', properties: ['node_id', 'node_name', 'node_type', 'owner_customer_id', 'geo_id', 'status'] },
    { id: 'supplylane', name: 'SupplyNetworkLane', group: 'Supply', color: '#F59E0B', size: 13, type: 'circle', properties: ['lane_id', 'from_node_id', 'to_node_id', 'mode', 'lead_time_expected_days', 'cutoff_time_local'] },
    { id: 'carrier', name: 'CarrierTransporter', group: 'Supply', color: '#F59E0B', size: 11, type: 'circle', properties: ['carrier_id', 'carrier_name', 'mode_supported'] },
    
    // E) Inventory
    { id: 'invposition', name: 'InventoryPosition', group: 'Inventory', color: '#EC4899', size: 16, type: 'circle', properties: ['inv_pos_id', 'sku_id', 'node_id', 'owner_customer_id', 'as_of_datetime', 'on_hand_qty', 'on_hand_uom', 'available_to_promise_qty', 'reserved_qty', 'blocked_qty', 'in_transit_in_qty', 'in_transit_out_qty'] },
    { id: 'invmovement', name: 'InventoryMovement', group: 'Inventory', color: '#EC4899', size: 14, type: 'circle', properties: ['movement_id', 'movement_datetime', 'movement_type', 'sku_id', 'from_node_id', 'to_node_id', 'qty', 'uom', 'reference_doc_id'] },
    { id: 'reservation', name: 'ReservationAllocation', group: 'Inventory', color: '#EC4899', size: 12, type: 'circle', properties: ['reservation_id', 'created_datetime', 'sku_id', 'node_id', 'reserved_qty', 'uom', 'basis'] },
    { id: 'lotbatch', name: 'LotBatch', group: 'Inventory', color: '#EC4899', size: 11, type: 'circle', properties: ['batch_id', 'sku_id', 'mfg_date', 'expiry_date', 'quality_status'] },
    { id: 'qualityhold', name: 'QualityHold', group: 'Inventory', color: '#EC4899', size: 10, type: 'circle', properties: ['hold_id', 'node_id', 'sku_id', 'qty_cases', 'start_datetime', 'end_datetime', 'status'] },
    { id: 'physcount', name: 'PhysicalInventoryCount', group: 'Inventory', color: '#EC4899', size: 10, type: 'circle', properties: ['count_id', 'node_id', 'sku_id', 'count_datetime', 'physical_qty', 'uom'] },
    
    // F) Orders & Fulfillment
    { id: 'salesorder', name: 'SalesOrder', group: 'Orders', color: '#EF4444', size: 17, type: 'circle', properties: ['order_id', 'order_type', 'order_status', 'order_datetime', 'requested_delivery_date', 'ordered_by_customer_id', 'ship_from_node_id', 'deliver_to_customer_id', 'deliver_to_outlet_id', 'channel_id'] },
    { id: 'orderline', name: 'SalesOrderLine', group: 'Orders', color: '#EF4444', size: 15, type: 'circle', properties: ['order_line_id', 'order_id', 'sku_id', 'requested_qty', 'requested_uom', 'requested_qty_cases', 'priority_code', 'promise_date'] },
    { id: 'fulfillment', name: 'FulfillmentEvent', group: 'Orders', color: '#EF4444', size: 14, type: 'circle', properties: ['fulfillment_id', 'order_id', 'event_type', 'event_status', 'event_datetime'] },
    { id: 'fulfillmentline', name: 'FulfillmentLine', group: 'Orders', color: '#EF4444', size: 13, type: 'circle', properties: ['fulfillment_line_id', 'fulfillment_id', 'order_line_id', 'sku_id', 'fulfilled_qty', 'fulfilled_uom', 'fulfilled_qty_cases'] },
    { id: 'orderoutcome', name: 'OrderOutcome', group: 'Orders', color: '#EF4444', size: 13, type: 'circle', properties: ['outcome_id', 'order_line_id', 'computed_datetime', 'requested_cases', 'fulfilled_cases', 'shortfall_cases', 'fill_rate_line'] },
    { id: 'servicecommit', name: 'OrderServiceCommitment', group: 'Orders', color: '#EF4444', size: 11, type: 'circle', properties: ['commit_id', 'order_line_id', 'commit_datetime', 'committed_qty_cases', 'commit_source', 'commit_node_id'] },
    
    // G) Sales
    { id: 'salestxn', name: 'SalesTransaction', group: 'Sales', color: '#8B5CF6', size: 16, type: 'circle', properties: ['txn_id', 'txn_type', 'txn_datetime', 'seller_customer_id', 'seller_node_id', 'buyer_customer_id', 'buyer_outlet_id', 'channel_id', 'geo_id'] },
    { id: 'salesline', name: 'SalesLine', group: 'Sales', color: '#8B5CF6', size: 14, type: 'circle', properties: ['sales_line_id', 'txn_id', 'sku_id', 'qty', 'uom', 'qty_cases', 'net_value', 'gross_value'] },
    { id: 'returntxn', name: 'ReturnTransaction', group: 'Sales', color: '#8B5CF6', size: 12, type: 'circle', properties: ['return_id', 'return_datetime', 'from_customer_id', 'to_node_id', 'status'] },
    { id: 'returnline', name: 'ReturnLine', group: 'Sales', color: '#8B5CF6', size: 11, type: 'circle', properties: ['return_line_id', 'return_id', 'sku_id', 'qty_cases', 'reason_text'] },
    
    // H) Planning
    { id: 'forecast', name: 'Forecast', group: 'Planning', color: '#14B8A6', size: 14, type: 'circle', properties: ['forecast_id', 'period_id', 'sku_id', 'geo_id', 'channel_id', 'forecast_qty_cases', 'as_of_date'] },
    { id: 'demandplan', name: 'DemandPlan', group: 'Planning', color: '#14B8A6', size: 14, type: 'circle', properties: ['plan_id', 'plan_type', 'period_id', 'sku_id', 'geo_id', 'channel_id', 'planned_qty_cases'] },
    { id: 'salesproj', name: 'SalesProjection', group: 'Planning', color: '#14B8A6', size: 13, type: 'circle', properties: ['projection_id', 'as_of_date', 'horizon_days', 'sku_id', 'customer_id', 'node_id', 'geo_id', 'projected_daily_qty_cases'] },
    { id: 'supplyplan', name: 'SupplyPlan', group: 'Planning', color: '#14B8A6', size: 12, type: 'circle', properties: ['supply_plan_id', 'period_id', 'plant_node_id', 'sku_id', 'planned_supply_cases'] },
    { id: 'deployplan', name: 'DeploymentPlan', group: 'Planning', color: '#14B8A6', size: 12, type: 'circle', properties: ['deploy_plan_id', 'period_id', 'sku_id', 'node_id', 'target_on_hand_cases', 'target_service_level'] },
    
    // I) Production
    { id: 'prodorder', name: 'ProductionOrder', group: 'Production', color: '#F59E0B', size: 14, type: 'circle', properties: ['prod_order_id', 'plant_node_id', 'sku_id', 'scheduled_date', 'planned_qty_cases', 'produced_qty_cases', 'status'] },
    { id: 'prodcapacity', name: 'ProductionCapacity', group: 'Production', color: '#F59E0B', size: 11, type: 'circle', properties: ['capacity_id', 'plant_node_id', 'date', 'available_hours', 'rated_cases_per_hour'] },
    { id: 'downtime', name: 'DowntimeEvent', group: 'Production', color: '#F59E0B', size: 10, type: 'circle', properties: ['downtime_id', 'plant_node_id', 'start_time', 'end_time', 'downtime_category', 'impact_est_cases'] },
    
    // J) Logistics
    { id: 'shipment', name: 'Shipment', group: 'Logistics', color: '#F59E0B', size: 15, type: 'circle', properties: ['shipment_id', 'from_node_id', 'to_node_id', 'dispatch_datetime', 'planned_arrival_datetime', 'actual_arrival_datetime', 'status', 'carrier_id'] },
    { id: 'shipmentline', name: 'ShipmentLine', group: 'Logistics', color: '#F59E0B', size: 13, type: 'circle', properties: ['shipment_line_id', 'shipment_id', 'sku_id', 'qty', 'uom', 'qty_cases'] },
    { id: 'transportevent', name: 'TransportEvent', group: 'Logistics', color: '#F59E0B', size: 11, type: 'circle', properties: ['transport_event_id', 'shipment_id', 'event_type', 'event_datetime', 'geo_id'] },
    
    // K) Service Execution
    { id: 'serviceattempt', name: 'ServiceAttempt', group: 'Service', color: '#6366F1', size: 13, type: 'circle', properties: ['attempt_id', 'attempt_datetime', 'service_stage', 'status', 'order_line_id', 'node_id', 'customer_id', 'notes'] },
    { id: 'whoperation', name: 'WarehouseOperation', group: 'Service', color: '#6366F1', size: 11, type: 'circle', properties: ['wh_op_id', 'node_id', 'op_type', 'start_time', 'end_time', 'status'] },
    { id: 'distservice', name: 'DistributorServiceRun', group: 'Service', color: '#6366F1', size: 11, type: 'circle', properties: ['run_id', 'distributor_customer_id', 'route_id', 'run_date', 'planned_stops', 'actual_stops'] },
    
    // L) Pricing / Trade
    { id: 'pricelist', name: 'PriceList', group: 'Pricing', color: '#EF4444', size: 13, type: 'circle', properties: ['price_list_id', 'name', 'channel_id', 'geo_id', 'customer_group_id', 'valid_from', 'valid_to'] },
    { id: 'pricecondition', name: 'PriceCondition', group: 'Pricing', color: '#EF4444', size: 12, type: 'circle', properties: ['condition_id', 'price_list_id', 'sku_id', 'ptr_per_case', 'valid_from', 'valid_to'] },
    { id: 'tradespend', name: 'TradeSpendEvent', group: 'Pricing', color: '#EF4444', size: 12, type: 'circle', properties: ['trade_event_id', 'event_type', 'start_date', 'end_date', 'budget_value', 'funding_owner'] },
    { id: 'tradealloc', name: 'TradeSpendAllocation', group: 'Pricing', color: '#EF4444', size: 11, type: 'circle', properties: ['alloc_id', 'trade_event_id', 'sku_id', 'customer_id', 'spend_value'] },
    
    // METRICS - Hexagon shapes
    // A) Sales & Demand Metrics
    { id: 'm001', name: 'Sales Volume', group: 'Metrics', color: '#85A383', size: 16, type: 'hexagon', 
      metricData: {
        metricId: 'M001',
        family: 'Sales',
        formula: 'SUM(SalesLine.qty_cases)',
        unit: 'cases',
        defaultGrain: 'SKU × Brand × Channel × City × Month',
        businessIntent: 'Track total sales volume across products and channels'
      }
    },
    { id: 'm002', name: 'Sales Value', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon',
      metricData: {
        metricId: 'M002',
        family: 'Sales',
        formula: 'SUM(SalesLine.net_value)',
        unit: '₹',
        defaultGrain: 'Brand × Channel × City × Month',
        businessIntent: 'Track net revenue across markets'
      }
    },
    { id: 'm003', name: 'Avg Monthly Sales', group: 'Metrics', color: '#85A383', size: 14, type: 'hexagon',
      metricData: {
        metricId: 'M003',
        family: 'Sales',
        formula: 'AVG(SalesCases per Month over last 3 months)',
        unit: 'cases/month',
        defaultGrain: 'SKU × City × Channel',
        businessIntent: 'Baseline demand pattern for planning'
      }
    },
    { id: 'm104', name: 'Fill Rate', group: 'Metrics', color: '#85A383', size: 16, type: 'hexagon',
      metricData: {
        metricId: 'M104',
        family: 'Service',
        formula: 'SUM(fulfilled_cases) / SUM(requested_cases)',
        unit: '%',
        defaultGrain: 'Ship-from Node × Customer × SKU × Month',
        businessIntent: 'Primary order service metric'
      }
    },
    { id: 'm105', name: 'In-Full %', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon',
      metricData: {
        metricId: 'M105',
        family: 'Service',
        formula: 'COUNT(orders fully fulfilled) / COUNT(orders)',
        unit: '%',
        defaultGrain: 'Ship-from Node × Customer × Month',
        businessIntent: 'Order-level completeness'
      }
    },
    { id: 'm107', name: 'OTIF %', group: 'Metrics', color: '#85A383', size: 16, type: 'hexagon',
      metricData: {
        metricId: 'M107',
        family: 'Service',
        formula: 'COUNT(orders OnTime AND InFull) / COUNT(orders)',
        unit: '%',
        defaultGrain: 'Ship-from Node × Customer × Month',
        businessIntent: 'Gold standard service metric'
      }
    },
    { id: 'm201', name: 'On-Hand Inventory', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon',
      metricData: {
        metricId: 'M201',
        family: 'Inventory',
        formula: 'SUM(InventoryPosition.on_hand_qty)',
        unit: 'cases',
        defaultGrain: 'SKU × Node × Owner × Day',
        businessIntent: 'Current stock position'
      }
    },
    { id: 'm202', name: 'ATP', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon',
      metricData: {
        metricId: 'M202',
        family: 'Inventory',
        formula: 'SUM(InventoryPosition.available_to_promise_qty)',
        unit: 'cases',
        defaultGrain: 'SKU × Node × Day',
        businessIntent: 'Available inventory for orders'
      }
    },
    { id: 'm203', name: 'In-Transit Inventory', group: 'Metrics', color: '#85A383', size: 14, type: 'hexagon',
      metricData: {
        metricId: 'M203',
        family: 'Inventory',
        formula: 'SUM(InventoryPosition.in_transit_in_qty)',
        unit: 'cases',
        defaultGrain: 'SKU × Node × Day',
        businessIntent: 'Inventory in motion'
      }
    },
    { id: 'm204', name: 'Days of Stock', group: 'Metrics', color: '#85A383', size: 16, type: 'hexagon',
      metricData: {
        metricId: 'M204',
        family: 'Inventory',
        formula: '(OnHandCases + InTransitCases) / ADS_30',
        unit: 'days',
        defaultGrain: 'SKU × Node/Distributor × Day',
        businessIntent: 'Inventory coverage vs demand velocity'
      }
    },
    { id: 'm205', name: 'DOS vs Projection', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon',
      metricData: {
        metricId: 'M205',
        family: 'Inventory',
        formula: '(OnHandCases + InTransitCases) / ProjectedDailyCases',
        unit: 'days',
        defaultGrain: 'SKU × Distributor/Node × Day',
        businessIntent: 'Forward-looking coverage metric'
      }
    },
    { id: 'm207', name: 'Coverage Gap', group: 'Metrics', color: '#85A383', size: 14, type: 'hexagon',
      metricData: {
        metricId: 'M207',
        family: 'Inventory',
        formula: 'DeploymentPlan.target - OnHandCases',
        unit: 'cases',
        defaultGrain: 'SKU × Node × Month',
        businessIntent: 'Gap vs target inventory levels'
      }
    },
    { id: 'm301', name: 'Plan Attainment', group: 'Metrics', color: '#85A383', size: 14, type: 'hexagon',
      metricData: {
        metricId: 'M301',
        family: 'Planning',
        formula: 'ActualSalesCases / PlannedCases',
        unit: '%',
        defaultGrain: 'SKU/Brand × City × Channel × Month',
        businessIntent: 'Sales vs demand plan accuracy'
      }
    },
    { id: 'm302', name: 'Forecast Accuracy', group: 'Metrics', color: '#85A383', size: 14, type: 'hexagon',
      metricData: {
        metricId: 'M302',
        family: 'Planning',
        formula: 'AVG(ABS(Actual - Forecast) / Actual)',
        unit: '%',
        defaultGrain: 'SKU/Brand × Geo/Channel × Month',
        businessIntent: 'MAPE forecast error'
      }
    },
    { id: 'm401', name: 'Production Attainment', group: 'Metrics', color: '#85A383', size: 14, type: 'hexagon',
      metricData: {
        metricId: 'M401',
        family: 'Production',
        formula: 'SUM(produced_qty) / SUM(planned_qty)',
        unit: '%',
        defaultGrain: 'Plant × SKU × Month',
        businessIntent: 'Production plan achievement'
      }
    },
    { id: 'm502', name: 'Transit Delay', group: 'Metrics', color: '#85A383', size: 13, type: 'hexagon',
      metricData: {
        metricId: 'M502',
        family: 'Logistics',
        formula: 'AVG(actual_arrival - planned_arrival)',
        unit: 'hours/days',
        defaultGrain: 'Lane × Month',
        businessIntent: 'Average shipment delay'
      }
    },
    { id: 'm701', name: 'Numeric Distribution', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon',
      metricData: {
        metricId: 'M701',
        family: 'Distribution',
        formula: 'COUNT(outlets selling SKU) / COUNT(active outlets)',
        unit: '%',
        defaultGrain: 'SKU × City × Month',
        businessIntent: 'Market reach penetration'
      }
    },
    { id: 'm702', name: 'Weighted Distribution', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon',
      metricData: {
        metricId: 'M702',
        family: 'Distribution',
        formula: 'SUM(outlet_weight where selling) / SUM(outlet_weight total)',
        unit: '%',
        defaultGrain: 'SKU × City × Month',
        businessIntent: 'Quality-adjusted market presence'
      }
    },
    
    // DECISIONS - Triangle shapes
    // Inventory & Distribution Decisions
    { id: 'd001', name: 'Distributor Stock-Risk', group: 'Decisions', color: '#02220E', size: 16, type: 'triangle',
      decisionData: {
        decisionId: 'D001',
        category: 'Inventory',
        output: 'Ranked list of distributors at risk (SKU-specific), earliest stockout first',
        optimizes: 'Reduce stockouts / protect service'
      }
    },
    { id: 'd002', name: 'Replenishment Qty', group: 'Decisions', color: '#02220E', size: 16, type: 'triangle',
      decisionData: {
        decisionId: 'D002',
        category: 'Inventory',
        output: 'Recommended ship quantities in cases per SKU for each distributor',
        optimizes: 'Achieve target DOS and minimize order loss'
      }
    },
    { id: 'd003', name: 'Allocation Priority', group: 'Decisions', color: '#02220E', size: 16, type: 'triangle',
      decisionData: {
        decisionId: 'D003',
        category: 'Service',
        output: 'Allocation plan (who gets how much) under limited ATP',
        optimizes: 'Maximize service to priority lanes/customers'
      }
    },
    { id: 'd004', name: 'SKU Rebalancing', group: 'Decisions', color: '#02220E', size: 15, type: 'triangle',
      decisionData: {
        decisionId: 'D004',
        category: 'Inventory',
        output: 'Recommended transfers (from_node → to_node, SKU, qty, timing)',
        optimizes: 'Reduce stockouts and balance coverage vs target'
      }
    },
    { id: 'd006', name: 'Fill-Rate Recovery', group: 'Decisions', color: '#02220E', size: 16, type: 'triangle',
      decisionData: {
        decisionId: 'D006',
        category: 'Service',
        output: 'Recommended actions when fill rate drops',
        optimizes: 'Increase fill rate / reduce shortfall quickly'
      }
    },
    { id: 'd007', name: 'OTIF Improvement', group: 'Decisions', color: '#02220E', size: 15, type: 'triangle',
      decisionData: {
        decisionId: 'D007',
        category: 'Service',
        output: 'List of customers/lanes where interventions yield highest OTIF gain',
        optimizes: 'OTIF uplift with minimal operational disruption'
      }
    },
    { id: 'd010', name: 'Forecast Override', group: 'Decisions', color: '#02220E', size: 15, type: 'triangle',
      decisionData: {
        decisionId: 'D010',
        category: 'Planning',
        output: 'Suggested overrides by SKU × City/Channel × Period',
        optimizes: 'Reduce forecast error and bias'
      }
    },
    { id: 'd012', name: 'Assortment Enforcement', group: 'Decisions', color: '#02220E', size: 15, type: 'triangle',
      decisionData: {
        decisionId: 'D012',
        category: 'Distribution',
        output: 'Prioritized outlets/distributors for listing + supply actions',
        optimizes: 'Distribution and availability growth'
      }
    },
    { id: 'd013', name: 'Production Adjustment', group: 'Decisions', color: '#02220E', size: 15, type: 'triangle',
      decisionData: {
        decisionId: 'D013',
        category: 'Production',
        output: 'Recommended changes to planned production quantities by SKU',
        optimizes: 'Improve service where constrained'
      }
    },
    { id: 'd016', name: 'Expedite Shipment', group: 'Decisions', color: '#02220E', size: 14, type: 'triangle',
      decisionData: {
        decisionId: 'D016',
        category: 'Logistics',
        output: 'Expedite/route-change recommendations for shipments',
        optimizes: 'Reduce inbound delays that drive stockouts'
      }
    }
  ];
  
  const initialLinks = [
    // Product hierarchy
    { source: 'brand', target: 'sku', label: 'HAS_SKU', type: 'solid' },
    { source: 'variant', target: 'sku', label: 'VARIANT_OF', type: 'solid' },
    { source: 'category', target: 'sku', label: 'CATEGORIZES', type: 'solid' },
    { source: 'segment', target: 'sku', label: 'SEGMENTS', type: 'solid' },
    { source: 'packformat', target: 'sku', label: 'PACKAGED_AS', type: 'solid' },
    { source: 'sku', target: 'uom', label: 'MEASURED_IN', type: 'solid' },
    { source: 'uomconversion', target: 'sku', label: 'CONVERTS', type: 'dashed' },
    { source: 'skuplantctx', target: 'sku', label: 'CONTEXTUALIZES', type: 'dashed' },
    { source: 'skuplantctx', target: 'supplynode', label: 'AT_PLANT', type: 'dashed' },
    { source: 'bom', target: 'sku', label: 'BOM_FOR', type: 'solid' },
    { source: 'bomcomponent', target: 'bom', label: 'COMPONENT_OF', type: 'solid' },
    { source: 'bomcomponent', target: 'material', label: 'USES_MATERIAL', type: 'solid' },
    
    // Geography
    { source: 'geography', target: 'geography', label: 'PARENT_OF', type: 'solid' },
    
    // Time
    { source: 'timeweek', target: 'timeday', label: 'CONTAINS_DAY', type: 'solid' },
    { source: 'timemonth', target: 'timeweek', label: 'CONTAINS_WEEK', type: 'solid' },
    { source: 'fiscalperiod', target: 'timemonth', label: 'FISCAL_MONTH', type: 'dashed' },
    
    // RTM
    { source: 'customer', target: 'channel', label: 'BELONGS_TO', type: 'solid' },
    { source: 'customer', target: 'customergroup', label: 'MEMBER_OF', type: 'dashed' },
    { source: 'customer', target: 'geography', label: 'LOCATED_IN', type: 'solid' },
    { source: 'outlet', target: 'channel', label: 'OPERATES_IN', type: 'solid' },
    { source: 'outlet', target: 'customer', label: 'SERVED_BY', type: 'solid' },
    { source: 'outlet', target: 'geography', label: 'LOCATED_IN', type: 'solid' },
    { source: 'outletweight', target: 'outlet', label: 'WEIGHTS', type: 'dashed' },
    { source: 'assortment', target: 'outlet', label: 'LISTED_AT', type: 'dashed' },
    { source: 'assortment', target: 'sku', label: 'LISTS_SKU', type: 'dashed' },
    { source: 'territory', target: 'geography', label: 'COVERS', type: 'solid' },
    { source: 'route', target: 'territory', label: 'IN_TERRITORY', type: 'solid' },
    { source: 'salesrep', target: 'territory', label: 'ASSIGNED_TO', type: 'solid' },
    
    // Supply
    { source: 'supplynode', target: 'geography', label: 'LOCATED_IN', type: 'solid' },
    { source: 'supplylane', target: 'supplynode', label: 'FROM_NODE', type: 'solid' },
    { source: 'supplylane', target: 'supplynode', label: 'TO_NODE', type: 'solid' },
    { source: 'carrier', target: 'supplylane', label: 'OPERATES_LANE', type: 'dashed' },
    
    // Inventory
    { source: 'invposition', target: 'sku', label: 'INVENTORY_OF', type: 'solid' },
    { source: 'invposition', target: 'supplynode', label: 'AT_NODE', type: 'solid' },
    { source: 'invmovement', target: 'sku', label: 'MOVES_SKU', type: 'solid' },
    { source: 'invmovement', target: 'supplynode', label: 'FROM_NODE', type: 'dashed' },
    { source: 'invmovement', target: 'supplynode', label: 'TO_NODE', type: 'dashed' },
    { source: 'reservation', target: 'sku', label: 'RESERVES', type: 'dashed' },
    { source: 'reservation', target: 'supplynode', label: 'AT_NODE', type: 'dashed' },
    { source: 'lotbatch', target: 'sku', label: 'BATCH_OF', type: 'solid' },
    { source: 'qualityhold', target: 'sku', label: 'HOLDS_SKU', type: 'dashed' },
    { source: 'physcount', target: 'sku', label: 'COUNTS_SKU', type: 'dashed' },
    
    // Orders & Fulfillment
    { source: 'salesorder', target: 'customer', label: 'ORDERED_BY', type: 'solid' },
    { source: 'salesorder', target: 'supplynode', label: 'SHIPS_FROM', type: 'solid' },
    { source: 'orderline', target: 'salesorder', label: 'LINE_OF', type: 'solid' },
    { source: 'orderline', target: 'sku', label: 'ORDERS_SKU', type: 'solid' },
    { source: 'fulfillment', target: 'salesorder', label: 'FULFILLS', type: 'solid' },
    { source: 'fulfillmentline', target: 'fulfillment', label: 'LINE_OF', type: 'solid' },
    { source: 'fulfillmentline', target: 'orderline', label: 'FULFILLS_LINE', type: 'solid' },
    { source: 'orderoutcome', target: 'orderline', label: 'OUTCOME_FOR', type: 'dashed' },
    { source: 'servicecommit', target: 'orderline', label: 'COMMITS_TO', type: 'dashed' },
    
    // Sales
    { source: 'salestxn', target: 'customer', label: 'SELLER', type: 'solid' },
    { source: 'salestxn', target: 'outlet', label: 'BUYER', type: 'solid' },
    { source: 'salestxn', target: 'channel', label: 'VIA_CHANNEL', type: 'solid' },
    { source: 'salesline', target: 'salestxn', label: 'LINE_OF', type: 'solid' },
    { source: 'salesline', target: 'sku', label: 'SELLS_SKU', type: 'solid' },
    { source: 'returntxn', target: 'customer', label: 'FROM_CUSTOMER', type: 'solid' },
    { source: 'returnline', target: 'returntxn', label: 'LINE_OF', type: 'solid' },
    
    // Planning
    { source: 'forecast', target: 'sku', label: 'FORECASTS', type: 'solid' },
    { source: 'demandplan', target: 'sku', label: 'PLANS_FOR', type: 'solid' },
    { source: 'salesproj', target: 'sku', label: 'PROJECTS', type: 'solid' },
    { source: 'supplyplan', target: 'sku', label: 'SUPPLIES', type: 'solid' },
    { source: 'deployplan', target: 'sku', label: 'DEPLOYS', type: 'solid' },
    
    // Production
    { source: 'prodorder', target: 'sku', label: 'PRODUCES', type: 'solid' },
    { source: 'prodorder', target: 'supplynode', label: 'AT_PLANT', type: 'solid' },
    { source: 'prodcapacity', target: 'supplynode', label: 'CAPACITY_OF', type: 'dashed' },
    { source: 'downtime', target: 'supplynode', label: 'DOWNTIME_AT', type: 'dashed' },
    
    // Logistics
    { source: 'shipment', target: 'supplynode', label: 'FROM_NODE', type: 'solid' },
    { source: 'shipment', target: 'supplynode', label: 'TO_NODE', type: 'solid' },
    { source: 'shipment', target: 'carrier', label: 'VIA_CARRIER', type: 'dashed' },
    { source: 'shipmentline', target: 'shipment', label: 'LINE_OF', type: 'solid' },
    { source: 'shipmentline', target: 'sku', label: 'SHIPS_SKU', type: 'solid' },
    { source: 'transportevent', target: 'shipment', label: 'EVENT_FOR', type: 'dashed' },
    
    // Service
    { source: 'serviceattempt', target: 'orderline', label: 'ATTEMPTS', type: 'solid' },
    { source: 'serviceattempt', target: 'supplynode', label: 'AT_NODE', type: 'dashed' },
    { source: 'whoperation', target: 'supplynode', label: 'OPERATES_AT', type: 'dashed' },
    { source: 'distservice', target: 'customer', label: 'RUN_BY', type: 'solid' },
    { source: 'distservice', target: 'route', label: 'FOLLOWS_ROUTE', type: 'solid' },
    
    // Pricing
    { source: 'pricelist', target: 'channel', label: 'FOR_CHANNEL', type: 'dashed' },
    { source: 'pricelist', target: 'geography', label: 'FOR_GEO', type: 'dashed' },
    { source: 'pricecondition', target: 'pricelist', label: 'CONDITION_IN', type: 'solid' },
    { source: 'pricecondition', target: 'sku', label: 'PRICES_SKU', type: 'solid' },
    { source: 'tradespend', target: 'sku', label: 'TARGETS_SKU', type: 'dashed' },
    { source: 'tradealloc', target: 'tradespend', label: 'ALLOCATION_OF', type: 'solid' },
    { source: 'tradealloc', target: 'customer', label: 'ALLOCATED_TO', type: 'dashed' },
    
    // Metric relationships - USES_INPUT_NODE
    { source: 'm001', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm001', target: 'salestxn', label: 'USES_INPUT', type: 'metric' },
    { source: 'm001', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm001', target: 'brand', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm001', target: 'channel', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm001', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm001', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm002', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm002', target: 'salestxn', label: 'USES_INPUT', type: 'metric' },
    { source: 'm002', target: 'brand', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm002', target: 'channel', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm002', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm002', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm003', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm003', target: 'timemonth', label: 'USES_INPUT', type: 'metric' },
    { source: 'm003', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm003', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm003', target: 'channel', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm104', target: 'orderline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm104', target: 'fulfillmentline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm104', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm104', target: 'customer', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm104', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm104', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm105', target: 'salesorder', label: 'USES_INPUT', type: 'metric' },
    { source: 'm105', target: 'orderline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm105', target: 'fulfillmentline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm105', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm105', target: 'customer', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm105', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm107', target: 'salesorder', label: 'USES_INPUT', type: 'metric' },
    { source: 'm107', target: 'orderline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm107', target: 'fulfillment', label: 'USES_INPUT', type: 'metric' },
    { source: 'm107', target: 'fulfillmentline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm107', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm107', target: 'customer', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm107', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm201', target: 'invposition', label: 'USES_INPUT', type: 'metric' },
    { source: 'm201', target: 'uomconversion', label: 'USES_INPUT', type: 'metric' },
    { source: 'm201', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm201', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm201', target: 'customer', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm201', target: 'timeday', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm202', target: 'invposition', label: 'USES_INPUT', type: 'metric' },
    { source: 'm202', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm202', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm202', target: 'timeday', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm203', target: 'invposition', label: 'USES_INPUT', type: 'metric' },
    { source: 'm203', target: 'shipmentline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm203', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm203', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm203', target: 'timeday', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm204', target: 'invposition', label: 'USES_INPUT', type: 'metric' },
    { source: 'm204', target: 'shipmentline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm204', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm204', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm204', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm204', target: 'timeday', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm205', target: 'invposition', label: 'USES_INPUT', type: 'metric' },
    { source: 'm205', target: 'shipmentline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm205', target: 'salesproj', label: 'USES_INPUT', type: 'metric' },
    { source: 'm205', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm205', target: 'customer', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm205', target: 'timeday', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm207', target: 'deployplan', label: 'USES_INPUT', type: 'metric' },
    { source: 'm207', target: 'invposition', label: 'USES_INPUT', type: 'metric' },
    { source: 'm207', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm207', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm207', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm301', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm301', target: 'demandplan', label: 'USES_INPUT', type: 'metric' },
    { source: 'm301', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm301', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm301', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm302', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm302', target: 'forecast', label: 'USES_INPUT', type: 'metric' },
    { source: 'm302', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm302', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm302', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm401', target: 'prodorder', label: 'USES_INPUT', type: 'metric' },
    { source: 'm401', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm401', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm401', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm502', target: 'shipment', label: 'USES_INPUT', type: 'metric' },
    { source: 'm502', target: 'supplylane', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm502', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm701', target: 'outlet', label: 'USES_INPUT', type: 'metric' },
    { source: 'm701', target: 'outletuniverse', label: 'USES_INPUT', type: 'metric' },
    { source: 'm701', target: 'salestxn', label: 'USES_INPUT', type: 'metric' },
    { source: 'm701', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm701', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm701', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm701', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    { source: 'm702', target: 'outlet', label: 'USES_INPUT', type: 'metric' },
    { source: 'm702', target: 'outletweight', label: 'USES_INPUT', type: 'metric' },
    { source: 'm702', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
    { source: 'm702', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm702', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
    { source: 'm702', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
    
    // Decision relationships - USES_METRIC and USES_INPUT
    { source: 'd001', target: 'm205', label: 'USES_METRIC', type: 'decision' },
    { source: 'd001', target: 'm204', label: 'USES_METRIC', type: 'decision' },
    { source: 'd001', target: 'm201', label: 'USES_METRIC', type: 'decision' },
    { source: 'd001', target: 'customer', label: 'USES_INPUT', type: 'decision' },
    { source: 'd001', target: 'invposition', label: 'USES_INPUT', type: 'decision' },
    { source: 'd001', target: 'sku', label: 'USES_INPUT', type: 'decision' },
    
    { source: 'd002', target: 'm205', label: 'USES_METRIC', type: 'decision' },
    { source: 'd002', target: 'm104', label: 'USES_METRIC', type: 'decision' },
    { source: 'd002', target: 'supplynode', label: 'USES_INPUT', type: 'decision' },
    { source: 'd002', target: 'customer', label: 'USES_INPUT', type: 'decision' },
    { source: 'd002', target: 'sku', label: 'USES_INPUT', type: 'decision' },
    
    { source: 'd003', target: 'm202', label: 'USES_METRIC', type: 'decision' },
    { source: 'd003', target: 'm104', label: 'USES_METRIC', type: 'decision' },
    { source: 'd003', target: 'm107', label: 'USES_METRIC', type: 'decision' },
    { source: 'd003', target: 'orderline', label: 'USES_INPUT', type: 'decision' },
    { source: 'd003', target: 'customer', label: 'USES_INPUT', type: 'decision' },
    
    { source: 'd004', target: 'm207', label: 'USES_METRIC', type: 'decision' },
    { source: 'd004', target: 'supplynode', label: 'USES_INPUT', type: 'decision' },
    { source: 'd004', target: 'supplylane', label: 'USES_INPUT', type: 'decision' },
    { source: 'd004', target: 'sku', label: 'USES_INPUT', type: 'decision' },
    
    { source: 'd006', target: 'm104', label: 'USES_METRIC', type: 'decision' },
    { source: 'd006', target: 'orderline', label: 'USES_INPUT', type: 'decision' },
    { source: 'd006', target: 'fulfillmentline', label: 'USES_INPUT', type: 'decision' },
    { source: 'd006', target: 'invposition', label: 'USES_INPUT', type: 'decision' },
    
    { source: 'd007', target: 'm107', label: 'USES_METRIC', type: 'decision' },
    { source: 'd007', target: 'm105', label: 'USES_METRIC', type: 'decision' },
    { source: 'd007', target: 'salesorder', label: 'USES_INPUT', type: 'decision' },
    { source: 'd007', target: 'customer', label: 'USES_INPUT', type: 'decision' },
    
    { source: 'd010', target: 'm302', label: 'USES_METRIC', type: 'decision' },
    { source: 'd010', target: 'forecast', label: 'USES_INPUT', type: 'decision' },
    { source: 'd010', target: 'demandplan', label: 'USES_INPUT', type: 'decision' },
    { source: 'd010', target: 'sku', label: 'USES_INPUT', type: 'decision' },
    
    { source: 'd012', target: 'm701', label: 'USES_METRIC', type: 'decision' },
    { source: 'd012', target: 'assortment', label: 'USES_INPUT', type: 'decision' },
    { source: 'd012', target: 'outlet', label: 'USES_INPUT', type: 'decision' },
    { source: 'd012', target: 'sku', label: 'USES_INPUT', type: 'decision' },
    
    { source: 'd013', target: 'm401', label: 'USES_METRIC', type: 'decision' },
    { source: 'd013', target: 'prodorder', label: 'USES_INPUT', type: 'decision' },
    { source: 'd013', target: 'demandplan', label: 'USES_INPUT', type: 'decision' },
    { source: 'd013', target: 'sku', label: 'USES_INPUT', type: 'decision' },
    
    { source: 'd016', target: 'm502', label: 'USES_METRIC', type: 'decision' },
    { source: 'd016', target: 'shipment', label: 'USES_INPUT', type: 'decision' },
    { source: 'd016', target: 'supplynode', label: 'USES_INPUT', type: 'decision' }
  ];
  
  const [nodes, setNodes] = useState(initialNodes);
  const [links, setLinks] = useState(initialLinks);
  const simulationRef = useRef(null);

  const handleTraversalQuestion = (questionIndex) => {
  setShowTraversal(true);
  setSelectedQuestion(questionIndex);
  setTraversalStep(0);
  setSelectedNode(null);
  setIsPlaying(true);
  updateTraversalHighlight(questionIndex, 0);
  startAutoPlay(questionIndex);
  setShowThinkingHistory(false);
};

const startAutoPlay = (questionIndex) => {
  if (traversalTimerRef.current) {
    clearInterval(traversalTimerRef.current);
  }
  if (revealTimerRef.current) {
    clearTimeout(revealTimerRef.current);
  }
  
  setVisibleSections(new Set());
  setExpandedThinking(new Set([0])); // Expand first thinking by default
  
  let currentStep = 0;
  const question = questions[questionIndex];
  const totalIterations = question.iterations.length + 1;
  
  // Start revealing sections for first iteration
  revealSectionsProgressively(questionIndex, 0);
  
  traversalTimerRef.current = setInterval(() => {
    currentStep++;
    if (currentStep >= totalIterations) {
      clearInterval(traversalTimerRef.current);
      setIsPlaying(false);
      return;
    }
    setTraversalStep(currentStep);
    setVisibleSections(new Set());
    setExpandedThinking(prev => new Set([...prev, currentStep])); // Auto-expand new thinking
    updateTraversalHighlight(questionIndex, currentStep);
    
    if (currentStep < question.iterations.length) {
      revealSectionsProgressively(questionIndex, currentStep);
    } else {
      // Show final response
      setVisibleSections(new Set(['final']));
    }
  }, 4500); // Total time: 1000 (think) + 1000 (fetch delay) + 500 (analyse delay) + 1000 (buffer)
};

const revealSectionsProgressively = (questionIndex, step) => {
  const question = questions[questionIndex];

  // clear old timers
  if (revealTimerRef.current) {
    clearTimeout(revealTimerRef.current);
  }

  if (step >= question.iterations.length) {
    setVisibleSections(new Set(["final"]));
    return;
  }

  // 0s → Think
  setVisibleSections(new Set(["think"]));

  // 1s → Nodes
  setTimeout(() => {
    setVisibleSections(new Set(["think", "nodes"]));
  }, 1000);

  // 2s → Fetch
  setTimeout(() => {
    setVisibleSections(new Set(["think", "nodes", "fetch"]));
  }, 2000);

  // 3s → Analyse
  setTimeout(() => {
    setVisibleSections(new Set(["think", "nodes", "fetch", "analyse"]));
  }, 3000);
};


const stopAutoPlay = () => {
  if (traversalTimerRef.current) {
    clearInterval(traversalTimerRef.current);
  }
  if (revealTimerRef.current) {
    clearTimeout(revealTimerRef.current);
  }
  setIsPlaying(false);
};


const updateTraversalHighlight = (questionIndex, step) => {
  const question = questions[questionIndex];
  
  if (step >= question.iterations.length) {
    // Show final response - highlight all nodes used from finalResponse.nodesUsed
    const allNodeIds = new Set();
    
    if (question.finalResponse.nodesUsed) {
      question.finalResponse.nodesUsed.forEach(nodeId => {
        // Find the actual node in the graph (case-insensitive)
        const actualNode = nodes.find(n => 
          n.id.toLowerCase() === nodeId.toLowerCase() || 
          n.name.toLowerCase() === nodeId.toLowerCase()
        );
        if (actualNode) {
          allNodeIds.add(actualNode.id);
        }
      });
    }
    
    // Find all links between these nodes
    const connectedLinks = new Set();
    links.forEach(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      if (allNodeIds.has(sourceId) && allNodeIds.has(targetId)) {
        connectedLinks.add(link);
      }
    });
    
    setHighlightedNodes(allNodeIds);
    setHighlightedLinks(connectedLinks);
    return;
  }
  
  // Accumulate all nodes from iteration 0 to current step (progressive path)
  const accumulatedNodeIds = new Set();
  for (let i = 0; i <= step; i++) {
    if (question.iterations[i].nodesInvolved) {
      question.iterations[i].nodesInvolved.forEach(nodeId => {
        // Find the actual node in the graph (case-insensitive)
        const actualNode = nodes.find(n => 
          n.id.toLowerCase() === nodeId.toLowerCase() || 
          n.name.toLowerCase() === nodeId.toLowerCase()
        );
        if (actualNode) {
          accumulatedNodeIds.add(actualNode.id);
        }
      });
    }
  }
  
  // Find all links between the accumulated nodes
  const connectedLinks = new Set();
  links.forEach(link => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    if (accumulatedNodeIds.has(sourceId) && accumulatedNodeIds.has(targetId)) {
      connectedLinks.add(link);
    }
  });
  
  setHighlightedNodes(accumulatedNodeIds);
  setHighlightedLinks(connectedLinks);
};

const clearTraversal = () => {
  stopAutoPlay();
  setShowTraversal(false);
  setTraversalStep(0);
  setSelectedQuestion(0);
  setHighlightedNodes(new Set());
  setHighlightedLinks(new Set());
  setVisibleSections(new Set());
  setExpandedThinking(new Set());
};


const toggleThinking = (step) => {
  setExpandedThinking(prev => {
    const newSet = new Set(prev);
    if (newSet.has(step)) {
      newSet.delete(step);
    } else {
      newSet.add(step);
    }
    return newSet;
  });
};


useEffect(() => {
  return () => {
    if (traversalTimerRef.current) {
      clearInterval(traversalTimerRef.current);
    }
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
    }
  };
}, []);


useEffect(() => {
  createVisualization();
}, [nodes, links, highlightedNodes, highlightedLinks]);

useEffect(() => {
  return () => {
    if (traversalTimerRef.current) {
      clearInterval(traversalTimerRef.current);
    }
  };
}, []);

useEffect(() => {
  updateSelection();
}, [selectedNode, showTraversal, highlightedNodes, highlightedLinks]);

const updateSelection = () => {
  const svg = d3.select(svgRef.current);
  const hasSelection = selectedNode !== null;
  const shouldGrayOut = showTraversal && highlightedNodes.size > 0; // Only gray out during traversal

  svg.selectAll(".node").each(function (d) {
    const node = d3.select(this);
    const isSelected = selectedNode && selectedNode.id === d.id;
    const isHighlighted = highlightedNodes.has(d.id);

    node.selectAll(".node-glow").remove();
    node.selectAll(".highlight-glow").remove();

    if (isSelected) {
      const glowSize = d.type === 'hexagon' ? d.size + 6 : d.type === 'triangle' ? d.size + 7 : d.size + 8;
      
      if (d.type === 'hexagon') {
        node.insert('path', ':first-child')
          .attr('class', 'node-glow')
          .attr('d', () => {
            const size = glowSize;
            const angle = Math.PI / 3;
            const points = [];
            for (let i = 0; i < 6; i++) {
              const x = size * Math.cos(angle * i);
              const y = size * Math.sin(angle * i);
              points.push(`${x},${y}`);
            }
            return `M${points.join('L')}Z`;
          })
          .attr('fill', 'none')
          .attr('stroke', '#85A383')
          .attr('stroke-width', 2.5)
          .attr('opacity', 0.6);
      } else if (d.type === 'triangle') {
        node.insert('path', ':first-child')
          .attr('class', 'node-glow')
          .attr('d', () => {
            const size = glowSize;
            const height = size * Math.sqrt(3);
            return `M0,${-height * 0.67} L${size},${height * 0.33} L${-size},${height * 0.33}Z`;
          })
          .attr('fill', 'none')
          .attr('stroke', '#02220E')
          .attr('stroke-width', 2.5)
          .attr('opacity', 0.6);
      } else {
        node.insert('circle', ':first-child')
          .attr('class', 'node-glow')
          .attr('r', glowSize)
          .attr('fill', 'none')
          .attr('stroke', '#3B82F6')
          .attr('stroke-width', 2.5)
          .attr('opacity', 0.6);
      }
    }

    const mainShape = node.select(
      d.type === "hexagon"
        ? "path:not(.node-glow)"
        : d.type === "triangle"
        ? "path:not(.node-glow)"
        : "circle:not(.node-glow)"
    );

    // Keep original color for highlighted nodes OR when not in traversal mode
    if (!shouldGrayOut || isHighlighted) {
      mainShape
        .attr(
          "stroke",
          isSelected
            ? d.type === "hexagon"
              ? "#85A383"
              : d.type === "triangle"
              ? "#02220E"
              : "#3B82F6"
            : "#fff"
        )
        .attr("stroke-width", isSelected ? 3 : 2)
        .attr("fill", d.color)
        .attr("opacity", 1);

      node
        .select("text")
        .attr("opacity", 1)
        .attr("font-weight", isSelected ? "700" : "600")
        .attr("fill", "#1F2937");
    } 
    // Gray out non-highlighted nodes (only during traversal)
    else {
      mainShape
        .attr("stroke", "#E5E7EB")
        .attr("stroke-width", 2)
        .attr("fill", "#D1D5DB")
        .attr("opacity", 0.3);

      node
        .select("text")
        .attr("opacity", 0.3)
        .attr("font-weight", "600")
        .attr("fill", "#9CA3AF");
    }
  });

  // Update links
  svg
    .selectAll(".link")
    .attr("opacity", (d) => {
      if (!shouldGrayOut) {
        return d.type === "metric" || d.type === "decision" ? 0.7 : 0.6;
      }
      return highlightedLinks.has(d) ? 0.9 : 0.1;
    })
    .attr("stroke", (d) => {
      if (!shouldGrayOut || highlightedLinks.has(d)) {
        return d.type === "metric"
          ? "#B8CDB6"
          : d.type === "decision"
          ? "#4A5F49"
          : "#D1D5DB";
      }
      return "#E5E7EB";
    })
    .attr("stroke-width", (d) => {
      if (!shouldGrayOut || highlightedLinks.has(d)) {
        return d.type === "metric" || d.type === "decision" ? 2 : 1.5;
      }
      return 1;
    });

  // Update link labels
  svg
    .selectAll(".link-label")
    .attr("opacity", (d) => {
      if (!shouldGrayOut) return 1;
      return highlightedLinks.has(d) ? 1 : 0.15;
    })
    .attr("fill", (d) => {
      if (!shouldGrayOut || highlightedLinks.has(d)) {
        return d.type === "metric"
          ? "#85A383"
          : d.type === "decision"
          ? "#02220E"
          : "#6B7280";
      }
      return "#9CA3AF";
    });
};

const createVisualization = () => {
  d3.select(svgRef.current).selectAll("*").remove();
  
  const width = 1400;
  const height = 700;
  
  const svg = d3.select(svgRef.current)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`);
  
  const g = svg.append('g');
  
  const zoom = d3.zoom()
    .scaleExtent([0.3, 3])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    });
  
  svg.call(zoom);
  
  // Set initial zoom to fit content better
  svg.call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(0.8));

  svg.on("click", (event) => {
    if (event.target === event.currentTarget || event.target.tagName === "svg") {
      setSelectedNode(null);
      setHighlightedNodes(new Set());
      setHighlightedLinks(new Set());
    }
  });
  
  const defs = g.append('defs');
  
  defs.append('marker')
    .attr('id', 'arrowhead')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 16)
    .attr('refY', 0)
    .attr('markerWidth', 5)
    .attr('markerHeight', 5)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#9CA3AF');
  
  defs.append('marker')
    .attr('id', 'arrowhead-metric')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 16)
    .attr('refY', 0)
    .attr('markerWidth', 5)
    .attr('markerHeight', 5)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#B8CDB6');
  
  defs.append('marker')
    .attr('id', 'arrowhead-decision')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 16)
    .attr('refY', 0)
    .attr('markerWidth', 5)
    .attr('markerHeight', 5)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#4A5F49');
  
  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(d => d.type === 'metric' ? 140 : d.type === 'decision' ? 160 : 120))
    .force('charge', d3.forceManyBody().strength(-800))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => d.size + 30))
    .force('x', d3.forceX(width / 2).strength(d => d.type === 'hexagon' ? 0.05 : d.type === 'triangle' ? 0.08 : 0.02))
    .force('y', d3.forceY(height / 2).strength(d => d.type === 'hexagon' ? 0.05 : d.type === 'triangle' ? 0.08 : 0.02));
  
  simulationRef.current = simulation;
  
  const link = g.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr('class', 'link')
    .attr('stroke', d => d.type === 'metric' ? '#B8CDB6' : d.type === 'decision' ? '#4A5F49' : '#D1D5DB')
    .attr('stroke-width', d => d.type === 'metric' || d.type === 'decision' ? 2 : 1.5)
    .attr('stroke-opacity', d => d.type === 'metric' || d.type === 'decision' ? 0.7 : 0.6)
    .attr('stroke-dasharray', d => d.type === 'dashed' ? '4,4' : '0')
    .attr('marker-end', d => d.type === 'metric' ? 'url(#arrowhead-metric)' : d.type === 'decision' ? 'url(#arrowhead-decision)' : 'url(#arrowhead)');
  
  const linkLabel = g.selectAll('.link-label')
    .data(links)
    .enter().append('text')
    .attr('class', 'link-label')
    .attr('font-size', d => d.type === 'metric' ? '8px' : '9px')
    .attr('font-weight', '500')
    .attr('fill', d => d.type === 'metric' ? '#85A383' : d.type === 'decision' ? '#02220E' : '#6B7280')
    .attr('text-anchor', 'middle')
    .style('pointer-events', 'none')
    .text(d => d.label);
  
  const node = g.selectAll('.node')
    .data(nodes)
    .enter().append('g')
    .attr('class', 'node')
    .style('cursor', 'pointer')
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended))
    .on('click', (event, d) => {
      event.stopPropagation();
      setSelectedNode({...d});

      // Calculate connected nodes and links
      const connectedNodes = new Set([d.id]);
      const connectedLinks = new Set();
      
      links.forEach(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        
        if (sourceId === d.id || targetId === d.id) {
          connectedLinks.add(link);
          connectedNodes.add(sourceId);
          connectedNodes.add(targetId);
        }
      });
      
      setHighlightedNodes(connectedNodes);
      setHighlightedLinks(connectedLinks);
    });
  
  // Draw circles for regular nodes
  node.filter(d => d.type === 'circle')
    .append('circle')
    .attr('r', d => d.size)
    .attr('fill', d => d.color)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2);
  
  // Draw hexagons for metric nodes
  node.filter(d => d.type === 'hexagon')
    .append('path')
    .attr('d', d => {
      const size = d.size;
      const angle = Math.PI / 3; // 60 degrees
      const points = [];
      for (let i = 0; i < 6; i++) {
        const x = size * Math.cos(angle * i);
        const y = size * Math.sin(angle * i);
        points.push(`${x},${y}`);
      }
      return `M${points.join('L')}Z`;
    })
    .attr('fill', d => d.color)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2);
  
  // Draw triangles for decision nodes
  node.filter(d => d.type === 'triangle')
    .append('path')
    .attr('d', d => {
      const size = d.size;
      const height = size * Math.sqrt(3);
      return `M0,${-height * 0.67} L${size},${height * 0.33} L${-size},${height * 0.33}Z`;
    })
    .attr('fill', d => d.color)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2);
  
  node.append('text')
    .attr('dy', d => d.size + 16)
    .attr('text-anchor', 'middle')
    .attr('font-size', '11px')
    .attr('font-weight', '600')
    .attr('fill', '#1F2937')
    .style('pointer-events', 'none')
    .text(d => d.name);
  
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    
    linkLabel
      .attr('x', d => (d.source.x + d.target.x) / 2)
      .attr('y', d => (d.source.y + d.target.y) / 2);
    
    node.attr('transform', d => `translate(${d.x},${d.y})`);
  });
  
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
};
  
  const groupColors = {
    'Product': '#3B82F6',
    'Geography': '#10B981',
    'Time': '#14B8A6',
    'RTM': '#06B6D4',
    'Supply': '#F59E0B',
    'Inventory': '#EC4899',
    'Orders': '#EF4444',
    'Sales': '#8B5CF6',
    'Planning': '#14B8A6',
    'Production': '#F59E0B',
    'Logistics': '#F59E0B',
    'Service': '#6366F1',
    'Pricing': '#EF4444',
    'Metrics': '#85A383',
    'Decisions': '#02220E'
  };
  
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="px-8 pt-8 pb-4">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-serif text-gray-900">PepsiCo Business Knowledge Graph</h1>
        </div>
        
        {!showTraversal && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Example Questions - Click to see graph traversal:</h3>
            <div className="grid grid-cols-5 gap-3">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleTraversalQuestion(idx)}
                  className="text-left p-3 border border-gray-200 rounded-lg hover:border-teal-600 hover:bg-teal-50 transition-all"
                >
                  <div className="text-xs font-semibold text-teal-700 mb-1">Q{q.id}</div>
                  <div className="text-sm font-medium text-gray-900">{q.title}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-3 flex-wrap text-xs">
          {Object.entries(groupColors).map(([group, color]) => (
            <div key={group} className="flex items-center gap-2">
              {group === 'Metrics' ? (
                <svg className="w-3 h-3" viewBox="-1 -1 2 2">
                  <path d="M0,-0.866 L0.75,-0.433 L0.75,0.433 L0,0.866 L-0.75,0.433 L-0.75,-0.433Z" fill={color} />
                </svg>
              ) : group === 'Decisions' ? (
                <svg className="w-3 h-3" viewBox="-1 -1 2 2">
                  <path d="M0,-0.9 L0.8,0.45 L-0.8,0.45Z" fill={color} />
                </svg>
              ) : (
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
              )}
              <span className="text-gray-600">{group}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden px-8 pb-8">
        <div className={`flex-1 overflow-hidden ${showTraversal ? 'mr-6' : ''}`}>
          <div className="bg-gray-50 rounded-2xl h-full overflow-hidden border border-gray-200">
            <svg ref={svgRef} className="w-full h-full"></svg>
          </div>
        </div>
        
        {showTraversal && (
          <div className="w-96 overflow-y-auto flex-shrink-0 bg-white rounded-xl shadow-lg border border-gray-200">
  <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-blue-600 p-4 border-b border-teal-700 z-10">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className="bg-white text-teal-700 text-xs font-bold px-2 py-1 rounded">Q{questions[selectedQuestion].id}</span>
        <h3 className="font-semibold text-white text-sm">{questions[selectedQuestion].title}</h3>
      </div>
      <button
        onClick={clearTraversal}
        className="text-white hover:text-teal-100 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <p className="text-xs text-teal-50">{questions[selectedQuestion].question}</p>
  </div>
  
  <div className="p-4 space-y-3">
    {traversalStep < questions[selectedQuestion].iterations.length ? (
      <>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              Iteration {traversalStep + 1} / {questions[selectedQuestion].iterations.length}
            </span>
            {isPlaying && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                Auto-playing
              </div>
            )}
          </div>
        </div>
        
        {/* Previous Steps - Collapsed with only thinking expandable */}

        
        {/* Current Iteration */}
       <div className="flex items-center gap-2 mb-3">
  <span className="text-xs font-mono text-blue-600 font-bold">
    #{questions[selectedQuestion].iterations[traversalStep].iteration}
  </span>
  <h4 className="font-semibold text-gray-900">
    {questions[selectedQuestion].iterations[traversalStep].phase}
  </h4>
</div>

        
        {/* Think Section - Expandable */}
        {/* Thinking Container (Current step always visible, history on click) */}
{questions[selectedQuestion].iterations[traversalStep].think && (
  <div
    className={`transition-all duration-[1500ms] ${
      visibleSections.has("think")
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-4"
    }`}
  >
    <div className="bg-purple-50 border-2 border-purple-300 rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={() => setShowThinkingHistory((prev) => !prev)}
        className="w-full flex items-center justify-between p-3 hover:bg-purple-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="text-xs font-semibold text-purple-900 animate-pulse">
            Think
          </div>
        </div>

        <svg
          className={`w-4 h-4 text-purple-600 transition-transform ${
            showThinkingHistory ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* ✅ Current thinking (always visible) */}
      <div className="px-3 pb-3 pt-1">
  <div
    className={`transition-all duration-[1500ms] ${
      visibleSections.has("think")
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-2"
    }`}
  >
    <p className="text-xs text-purple-900 leading-relaxed italic">
      "{questions[selectedQuestion].iterations[traversalStep].think}"
    </p>
  </div>
</div>

      {/* ✅ Previous completed thinking steps (only on expand) */}
      {showThinkingHistory && (
  <div className="border-t border-purple-200 bg-white px-3 py-3 space-y-2">
    <div className="text-[11px] font-semibold text-gray-500">
      Thinking steps
    </div>

    {/* ✅ Completed (previous steps) */}
    {traversalStep > 0 &&
      Array.from({ length: traversalStep }, (_, i) => (
        <div
          key={i}
          className="bg-gray-50 border border-gray-200 rounded-lg p-2"
        >
          <div className="flex items-start gap-2">
            {/* ✅ Checkmark */}
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div className="flex-1">
              <div className="text-[11px] font-mono text-gray-500">
                #{questions[selectedQuestion].iterations[i].iteration} •{" "}
                {questions[selectedQuestion].iterations[i].phase}
              </div>

              {questions[selectedQuestion].iterations[i].think && (
                <p className="text-xs text-gray-700 leading-relaxed italic mt-1">
                  "{questions[selectedQuestion].iterations[i].think}"
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

    {/* ✅ Active (current step) — last */}
    <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-2">
      <div className="flex items-start gap-2">
        {/* 🔥 Active indicator instead of check */}
        <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        </div>

        <div className="flex-1">
          <div className="text-[11px] font-mono text-purple-800">
            #{questions[selectedQuestion].iterations[traversalStep].iteration} •{" "}
            {questions[selectedQuestion].iterations[traversalStep].phase} (active)
          </div>

          {questions[selectedQuestion].iterations[traversalStep].think && (
            <p className="text-xs text-purple-900 leading-relaxed italic mt-1">
              "{questions[selectedQuestion].iterations[traversalStep].think}"
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  </div>
)}

        
        {/* Nodes Accessed - Appears after 1s */}
        {questions[selectedQuestion].iterations[traversalStep].nodesInvolved?.length > 0 && (
          <div className={`transition-all duration-[1500ms] ${visibleSections.has('nodes') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-amber-900 mb-2">Nodes Accessed:</div>
              <div className="flex flex-wrap gap-1.5">
                {questions[selectedQuestion].iterations[traversalStep].nodesInvolved.map((nodeId, idx) => {
                  const node = nodes.find(n => 
                    n.id.toLowerCase() === nodeId.toLowerCase() || 
                    n.name.toLowerCase() === nodeId.toLowerCase()
                  );
                  
                  return node ? (
                    <span 
                      key={`${nodeId}-${idx}`} 
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded font-medium" 
                      style={{ backgroundColor: node.color + '20', color: node.color }}
                    >
                      {node.type === 'hexagon' ? '⬡' : node.type === 'triangle' ? '▲' : '●'} {node.name}
                    </span>
                  ) : (
                    <span 
                      key={`${nodeId}-${idx}`} 
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium bg-gray-100 text-gray-600"
                    >
                      ⚠ {nodeId}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        {/* Fetch Section - Appears after 1s */}
        {questions[selectedQuestion].iterations[traversalStep].fetch && (
          <div className={`transition-all duration-[1500ms] ${visibleSections.has('fetch') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                <div className="text-xs font-semibold text-blue-900">Fetch</div>
              </div>
              <div className="text-xs text-blue-900 space-y-2">
                {questions[selectedQuestion].iterations[traversalStep].fetch.nodes && (
                  <div>
                    <span className="font-semibold">Nodes: </span>
                    <span className="font-mono">{questions[selectedQuestion].iterations[traversalStep].fetch.nodes.join(', ')}</span>
                  </div>
                )}
                {questions[selectedQuestion].iterations[traversalStep].fetch.fields && (
                  <div>
                    <span className="font-semibold">Fields: </span>
                    <div className="mt-1 font-mono text-xs bg-blue-100 rounded p-2">
                      {Array.isArray(questions[selectedQuestion].iterations[traversalStep].fetch.fields) 
                        ? questions[selectedQuestion].iterations[traversalStep].fetch.fields.join(', ')
                        : questions[selectedQuestion].iterations[traversalStep].fetch.fields}
                    </div>
                  </div>
                )}
                {questions[selectedQuestion].iterations[traversalStep].fetch.filters && (
                  <div>
                    <span className="font-semibold">Filters: </span>
                    <div className="mt-1 font-mono text-xs bg-blue-100 rounded p-2">
                      {questions[selectedQuestion].iterations[traversalStep].fetch.filters}
                    </div>
                  </div>
                )}
                {questions[selectedQuestion].iterations[traversalStep].fetch.result && (
                  <div>
                    <span className="font-semibold">Result: </span>
                    <pre className="mt-1 font-mono text-xs bg-blue-100 rounded p-2 whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {JSON.stringify(questions[selectedQuestion].iterations[traversalStep].fetch.result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Analyse Section - Appears after 1.5s */}
        {questions[selectedQuestion].iterations[traversalStep].analyse && (
          <div className={`transition-all duration-[1500ms] ${visibleSections.has('analyse') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div className="text-xs font-semibold text-green-900">Analyse</div>
              </div>
              <div className="text-xs text-green-900">
                {typeof questions[selectedQuestion].iterations[traversalStep].analyse === 'string' ? (
                  <p className="leading-relaxed">{questions[selectedQuestion].iterations[traversalStep].analyse}</p>
                ) : (
                  <pre className="font-mono whitespace-pre-wrap leading-relaxed bg-green-100 rounded p-2 max-h-40 overflow-y-auto">
                    {JSON.stringify(questions[selectedQuestion].iterations[traversalStep].analyse, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    ) : (
      /* Final Response */
      <div className={`transition-all duration-[1500ms] ${visibleSections.has('final') ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Final Response
          </span>
        </div>
        
        <h4 className="font-semibold text-gray-900 mb-1 uppercase text-sm">
          {questions[selectedQuestion].finalResponse.type.replace(/_/g, ' ')}
        </h4>
        
        {questions[selectedQuestion].finalResponse.summary && (
          <p className="text-sm text-gray-700 mb-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
            {questions[selectedQuestion].finalResponse.summary}
          </p>
        )}
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
          {/* Render different response types */}
          {questions[selectedQuestion].finalResponse.monthWiseData && (
            <div>
              <div className="text-xs font-semibold text-green-900 mb-2">Month-wise Sales:</div>
              <pre className="text-xs text-green-900 font-mono whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(questions[selectedQuestion].finalResponse.monthWiseData, null, 2)}
              </pre>
            </div>
          )}
          
          {questions[selectedQuestion].finalResponse.threeMonthAverage && (
            <div>
              <div className="text-xs font-semibold text-green-900 mb-2">3-Month Average:</div>
              <pre className="text-xs text-green-900 font-mono whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(questions[selectedQuestion].finalResponse.threeMonthAverage, null, 2)}
              </pre>
            </div>
          )}
          
          {questions[selectedQuestion].finalResponse.brandWiseBreakdown && (
            <div>
              <div className="text-xs font-semibold text-green-900 mb-2">Brand-wise Breakdown:</div>
              <div className="space-y-1">
                {questions[selectedQuestion].finalResponse.brandWiseBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white rounded px-2 py-1 text-xs">
                    <span className="font-medium">{item.brand}</span>
                    <span className="text-green-700 font-mono">{item.loss} cases</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {questions[selectedQuestion].finalResponse.breakdown && (
            <div>
              <div className="text-xs font-semibold text-green-900 mb-2">Root Cause Breakdown:</div>
              <div className="space-y-1">
                {questions[selectedQuestion].finalResponse.breakdown.map((item, idx) => (
                  <div key={idx} className="bg-white rounded px-2 py-2 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900">{item.cause}</span>
                      <span className="text-green-700 font-mono font-bold">{item.percentage}%</span>
                    </div>
                    <div className="text-gray-600">{item.cases} cases</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {questions[selectedQuestion].finalResponse.monthlyMetrics && (
            <div>
              <div className="text-xs font-semibold text-green-900 mb-2">Monthly Performance:</div>
              <div className="space-y-1">
                {questions[selectedQuestion].finalResponse.monthlyMetrics.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white rounded px-2 py-1 text-xs">
                    <span className="font-medium">{item.month}</span>
                    <span className="text-green-700 font-mono">{item.fillRate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {questions[selectedQuestion].finalResponse.tableData && (
            <div>
              <div className="text-xs font-semibold text-green-900 mb-2">SKU Performance:</div>
              <div className="space-y-1">
                {questions[selectedQuestion].finalResponse.tableData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white rounded px-2 py-1 text-xs">
                    <span className="font-medium">{item.sku}</span>
                    <span className="text-green-700 font-mono font-bold">{item.fillRate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Nodes Used */}
          <div className="pt-3 border-t border-green-300">
            <div className="text-xs font-semibold text-green-900 mb-2">Nodes Used:</div>
            <div className="flex flex-wrap gap-1">
              {questions[selectedQuestion].finalResponse.nodesUsed.map((nodeId, idx) => {
                const node = nodes.find(n => 
                  n.id.toLowerCase() === nodeId.toLowerCase() || 
                  n.name.toLowerCase() === nodeId.toLowerCase()
                );
                return node ? (
                  <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium bg-white" style={{ color: node.color }}>
                    {nodeId}
                  </span>
                ) : (
                  <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded font-medium bg-white text-gray-600">
                    {nodeId}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
                )}
        
        {selectedNode && !showTraversal && (
          selectedNode.type === 'hexagon' ? (
            <MetricNodePanel node={selectedNode} links={links} nodes={nodes} onClose={() => setSelectedNode(null)} />
          ) : selectedNode.type === 'triangle' ? (
            <DecisionNodePanel node={selectedNode} links={links} nodes={nodes} onClose={() => setSelectedNode(null)} />
          ) : (
            <BusinessNodePanel node={selectedNode} links={links} nodes={nodes} onClose={() => setSelectedNode(null)} />
          )
        )}
      </div>
    </div>
  );
};

const DecisionNodePanel = ({ node, links, nodes, onClose }) => {
  const metricNodes = links
    .filter(l => (l.source.id || l.source) === node.id && l.label === 'USES_METRIC')
    .map(l => nodes.find(n => n.id === (l.target.id || l.target)))
    .filter(Boolean);
  
  const inputNodes = links
    .filter(l => (l.source.id || l.source) === node.id && l.label === 'USES_INPUT')
    .map(l => nodes.find(n => n.id === (l.target.id || l.target)))
    .filter(Boolean);
  
  return (
    <div className="w-96 overflow-y-auto flex-shrink-0 bg-white rounded-xl shadow-lg">
      <div className="sticky top-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 p-6 pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-700">
              <svg className="w-6 h-6" viewBox="-1 -1 2 2">
                <path d="M0,-0.9 L0.8,0.45 L-0.8,0.45Z" fill="#02220E" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-white">{node.name}</h2>
                <span className="text-xs font-mono text-gray-300 bg-gray-700 px-2 py-0.5 rounded">{node.decisionData.decisionId}</span>
              </div>
              <span className="inline-block mt-1 px-2 py-0.5 bg-gray-700 text-gray-200 text-xs rounded-full font-medium">{node.decisionData.category}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-6 pt-4 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Decision Output</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{node.decisionData.output}</p>
        </div>
        
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Optimizes</h3>
          <div className="bg-green-50 border border-green-100 rounded-lg p-3">
            <p className="text-sm text-green-900">{node.decisionData.optimizes}</p>
          </div>
        </div>
        
        {metricNodes.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Used Metrics</h3>
            <div className="space-y-2">
              {metricNodes.map((metricNode, idx) => (
                <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3" viewBox="-1 -1 2 2">
                      <path d="M0,-0.866 L0.75,-0.433 L0.75,0.433 L0,0.866 L-0.75,0.433 L-0.75,-0.433Z" fill={metricNode.color} />
                    </svg>
                    <span className="text-sm font-medium text-gray-800">{metricNode.name}</span>
                  </div>
                  {metricNode.metricData && (
                    <p className="text-xs text-gray-500 mt-1 ml-5">{metricNode.metricData.unit}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {inputNodes.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Input Business Nodes</h3>
            <div className="flex flex-wrap gap-2">
              {inputNodes.map((inputNode, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: inputNode.color }}></div>
                  <span className="text-xs font-medium text-gray-700">{inputNode.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MetricNodePanel = ({ node, links, nodes, onClose }) => {
  const inputNodes = links
    .filter(l => (l.source.id || l.source) === node.id && l.label === 'USES_INPUT')
    .map(l => nodes.find(n => n.id === (l.target.id || l.target)))
    .filter(Boolean);
  
  const groupedByNodes = links
    .filter(l => (l.source.id || l.source) === node.id && l.label === 'GROUPED_BY')
    .map(l => nodes.find(n => n.id === (l.target.id || l.target)))
    .filter(Boolean);
  
  return (
    <div className="w-96 overflow-y-auto flex-shrink-0 bg-white rounded-xl shadow-lg">
      <div className="sticky top-0 bg-gradient-to-br from-green-50 to-white border-b border-green-100 p-6 pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8F0E7' }}>
              <svg className="w-6 h-6" viewBox="-1 -1 2 2">
                <path d="M0,-0.866 L0.75,-0.433 L0.75,0.433 L0,0.866 L-0.75,0.433 L-0.75,-0.433Z" fill={node.color} />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-900">{node.name}</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: '#5A7359', backgroundColor: '#E8F0E7' }}>{node.metricData.metricId}</span>
              </div>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full font-medium" style={{ backgroundColor: '#E8F0E7', color: '#5A7359' }}>{node.metricData.family} Metric</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-6 pt-4 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Business Intent</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{node.metricData.businessIntent}</p>
        </div>
        
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Formula</h3>
          <div className="rounded-lg p-3" style={{ backgroundColor: '#E8F0E7', borderColor: '#B8CDB6', borderWidth: '1px' }}>
            <code className="text-sm font-mono" style={{ color: '#5A7359' }}>{node.metricData.formula}</code>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Unit</h3>
            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{node.metricData.unit}</span>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Input Nodes</h3>
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">{inputNodes.length}</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Default Grain</h3>
          <p className="text-sm text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded-lg">{node.metricData.defaultGrain}</p>
        </div>
        
        {inputNodes.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Component Nodes (Input)</h3>
            <div className="space-y-2">
              {inputNodes.map((inputNode, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: inputNode.color }}></div>
                    <span className="text-sm font-medium text-gray-800">{inputNode.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-5">{inputNode.group}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {groupedByNodes.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Dimensions (Grouped By)</h3>
            <div className="flex flex-wrap gap-2">
              {groupedByNodes.map((dimNode, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-green-50 border border-green-100 rounded-full px-3 py-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dimNode.color }}></div>
                  <span className="text-xs font-medium text-gray-700">{dimNode.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BusinessNodePanel = ({ node, links, nodes, onClose }) => {
  const outgoing = links.filter(l => (l.source.id || l.source) === node.id);
  const incoming = links.filter(l => (l.target.id || l.target) === node.id);
  
  return (
    <div className="w-96 overflow-y-auto flex-shrink-0 bg-white rounded-xl shadow-lg">
      <div className="sticky top-0 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 p-6 pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: node.color + '20' }}>
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: node.color }}></div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{node.name}</h2>
              <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{node.group}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-6 pt-4">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Properties</h3>
            <span className="text-xs text-gray-400">{node.properties.length} fields</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2.5">
            {node.properties.map((prop, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                <code className="text-gray-800 font-mono text-xs">{prop}</code>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Relationships</h3>
            <span className="text-xs text-gray-400">{outgoing.length + incoming.length} connections</span>
          </div>
          
          {outgoing.length === 0 && incoming.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-400 italic">No connections</p>
            </div>
          ) : (
            <div className="space-y-3">
              {outgoing.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">Outgoing ({outgoing.length})</p>
                  <div className="space-y-2">
                    {outgoing.map((link, idx) => {
                      const targetNode = nodes.find(n => n.id === (link.target.id || link.target));
                      return (
                        <div key={`out-${idx}`} className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <span className="text-xs font-semibold text-blue-700">{link.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {targetNode?.type === 'hexagon' ? (
                              <svg className="w-2 h-2" viewBox="-1 -1 2 2">
                                <path d="M0,-0.866 L0.75,-0.433 L0.75,0.433 L0,0.866 L-0.75,0.433 L-0.75,-0.433Z" fill={targetNode?.color} />
                              </svg>
                            ) : targetNode?.type === 'triangle' ? (
                              <svg className="w-2 h-2" viewBox="-1 -1 2 2">
                                <path d="M0,-0.9 L0.8,0.45 L-0.8,0.45Z" fill={targetNode?.color} />
                              </svg>
                            ) : (
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: targetNode?.color }}></div>
                            )}
                            <span className="text-sm text-gray-700">{targetNode?.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {incoming.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">Incoming ({incoming.length})</p>
                  <div className="space-y-2">
                    {incoming.map((link, idx) => {
                      const sourceNode = nodes.find(n => n.id === (link.source.id || link.source));
                      return (
                        <div key={`in-${idx}`} className="bg-green-50 border border-green-100 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                            </svg>
                            <span className="text-xs font-semibold text-green-700">{link.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {sourceNode?.type === 'hexagon' ? (
                              <svg className="w-2 h-2" viewBox="-1 -1 2 2">
                                <path d="M0,-0.866 L0.75,-0.433 L0.75,0.433 L0,0.866 L-0.75,0.433 L-0.75,-0.433Z" fill={sourceNode?.color} />
                              </svg>
                            ) : sourceNode?.type === 'triangle' ? (
                              <svg className="w-2 h-2" viewBox="-1 -1 2 2">
                                <path d="M0,-0.9 L0.8,0.45 L-0.8,0.45Z" fill={sourceNode?.color} />
                              </svg>
                            ) : (
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sourceNode?.color }}></div>
                            )}
                            <span className="text-sm text-gray-700">{sourceNode?.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FMCGKnowledgeGraph;
        
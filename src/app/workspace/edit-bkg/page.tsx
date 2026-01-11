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
  type?: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  id: string;
  source: string | Node;
  target: string | Node;
  type: string;
  description: string;
  linkType?: string;
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
    // ---------- PRODUCT DOMAIN (Indigo) ----------
    {
      id: "product",
      name: "Product",
      description: "Core product/SKU with identifiers and status",
      size: 24,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_variant",
      name: "ProductVariant",
      description: "Size/color/material variants of a product",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "category",
      name: "Category",
      description: "Hierarchical product categories",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "brand",
      name: "Brand",
      description: "Brand or label for products",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "department",
      name: "Department",
      description: "Top-level merchandise/ORG grouping",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_price",
      name: "ProductPrice",
      description: "List / selling / promotional price records",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_cost",
      name: "ProductCost",
      description: "COGS and landed cost records",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_attribute",
      name: "ProductAttribute",
      description: "Dynamic attributes (fabric, color, fit, etc.)",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_image",
      name: "ProductImage",
      description: "Media assets/images for products",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_bundle",
      name: "ProductBundle",
      description: "Product kits/bundles",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_tag",
      name: "ProductTag",
      description: "Searchable merchandising tags",
      size: 14,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "barcode",
      name: "Barcode",
      description: "UPC/EAN/GTIN codes linked to products",
      size: 14,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_lifecycle",
      name: "ProductLifecycle",
      description: "Lifecycle stage (new, core, markdown, EOL)",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_compliance",
      name: "ProductCompliance",
      description: "Regulatory/compliance attributes",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },

    // ---------- CUSTOMER DOMAIN (Pink) ----------
    {
      id: "customer",
      name: "Customer",
      description: "Core customer entity",
      size: 24,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "customer_address",
      name: "CustomerAddress",
      description: "Customer billing/shipping addresses",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "customer_segment",
      name: "CustomerSegment",
      description: "RFM/behavioral/customer segments",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "loyalty_program",
      name: "LoyaltyProgram",
      description: "Definition of loyalty program",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "loyalty_account",
      name: "LoyaltyAccount",
      description: "Customer loyalty membership account",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "loyalty_transaction",
      name: "LoyaltyTransaction",
      description: "Points accrual/redemption events",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "customer_preference",
      name: "CustomerPreference",
      description: "Communication/product preferences",
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "customer_interaction",
      name: "CustomerInteraction",
      description: "Service/contact center interactions",
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "household",
      name: "Household",
      description: "Household grouping of customers",
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "gift_registry",
      name: "GiftRegistry",
      description: "Wishlists/registries for events",
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "subscription",
      name: "Subscription",
      description: "Recurring order/subscription",
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "customer_note",
      name: "CustomerNote",
      description: "Free-form CRM notes",
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },

    // ---------- TRANSACTION DOMAIN (Emerald) ----------
    {
      id: "order",
      name: "Order",
      description: "Sales order / POS bill",
      size: 24,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "order_line",
      name: "OrderLine",
      description: "Order line items",
      size: 18,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "payment",
      name: "Payment",
      description: "Payment transactions/tenders",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "refund",
      name: "Refund",
      description: "Refund transactions",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "return",
      name: "Return",
      description: "Return/exchange requests",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "return_line",
      name: "ReturnLine",
      description: "Line items within returns",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "cart",
      name: "Cart",
      description: "Shopping cart",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "cart_item",
      name: "CartItem",
      description: "Items in a shopping cart",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "invoice",
      name: "Invoice",
      description: "Invoices for orders",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "receipt",
      name: "Receipt",
      description: "POS receipts / proofs of purchase",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },

    // ---------- INVENTORY DOMAIN (Green) ----------
    {
      id: "inventory_level",
      name: "InventoryLevel",
      description: "On-hand stock by product & location",
      size: 24,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_movement",
      name: "InventoryMovement",
      description: "Stock movements (sale, GRN, transfer, adjustment)",
      size: 18,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "stock_allocation",
      name: "StockAllocation",
      description: "Reserved inventory allocations",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "warehouse",
      name: "Warehouse",
      description: "Distribution centers/warehouses",
      size: 18,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "bin_location",
      name: "BinLocation",
      description: "Bin/shelf locations within warehouse",
      size: 14,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_count",
      name: "InventoryCount",
      description: "Cycle/physical stock counts",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_adjustment",
      name: "InventoryAdjustment",
      description: "Manual stock adjustments",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "reorder_rule",
      name: "ReorderRule",
      description: "Replenishment rules/min-max",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "safety_stock",
      name: "SafetyStock",
      description: "Safety stock levels",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_snapshot",
      name: "InventorySnapshot",
      description: "Point-in-time snapshots of inventory",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "stock_transfer",
      name: "StockTransfer",
      description: "Inter-location stock transfers",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },

    // ---------- SUPPLY CHAIN DOMAIN (Sky) ----------
    {
      id: "supplier",
      name: "Supplier",
      description: "Vendors/manufacturers",
      size: 24,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "supplier_contact",
      name: "SupplierContact",
      description: "Supplier contacts",
      size: 14,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "purchase_order",
      name: "PurchaseOrder",
      description: "Purchase orders to suppliers",
      size: 18,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "purchase_order_line",
      name: "PurchaseOrderLine",
      description: "PO line items",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "goods_receipt",
      name: "GoodsReceipt",
      description: "Goods receipt/ASN records",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "shipment",
      name: "Shipment",
      description: "Outbound shipments",
      size: 18,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "shipment_line",
      name: "ShipmentLine",
      description: "Shipment contents/lines",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "carrier",
      name: "Carrier",
      description: "Shipping/logistics carriers",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "carrier_service",
      name: "CarrierService",
      description: "Shipping methods/services",
      size: 14,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "tracking_event",
      name: "TrackingEvent",
      description: "Shipment tracking updates",
      size: 14,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "supplier_contract",
      name: "SupplierContract",
      description: "Vendor contracts/terms",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "supplier_scorecard",
      name: "SupplierScorecard",
      description: "Supplier performance metrics",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "lead_time",
      name: "LeadTime",
      description: "Lead time records",
      size: 14,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "moq",
      name: "MOQ",
      description: "Minimum order quantities",
      size: 14,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "landed_cost",
      name: "LandedCost",
      description: "Total landed cost breakdowns",
      size: 14,
      color: "#0EA5E9",
      type: "bkg",
    },

    // ---------- STORE OPERATIONS DOMAIN (Purple) ----------
    {
      id: "store",
      name: "Store",
      description: "Physical retail location",
      size: 24,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_zone",
      name: "StoreZone",
      description: "Zones/areas within store",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "fixture",
      name: "Fixture",
      description: "Shelving/display fixtures",
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "planogram",
      name: "Planogram",
      description: "Shelf layouts/planograms",
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "planogram_position",
      name: "PlanogramPosition",
      description: "Product placement positions on fixtures",
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "pos_terminal",
      name: "POSTerminal",
      description: "Checkout/PoS terminals",
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_hours",
      name: "StoreHours",
      description: "Operating hours",
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_event",
      name: "StoreEvent",
      description: "In-store events and activations",
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "region",
      name: "Region",
      description: "Geographic region",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "district",
      name: "District",
      description: "Store district/territory",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_cluster",
      name: "StoreCluster",
      description: "Store clustering/grouping",
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_capacity",
      name: "StoreCapacity",
      description: "Traffic/capacity limits",
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_amenity",
      name: "StoreAmenity",
      description: "Store amenities/features",
      size: 14,
      color: "#8B5CF6",
      type: "bkg",
    },

    // ---------- MARKETING DOMAIN (Orange) ----------
    {
      id: "campaign",
      name: "Campaign",
      description: "Marketing/advertising campaign",
      size: 24,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "promotion",
      name: "Promotion",
      description: "Offers/discounts/markdowns",
      size: 18,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "coupon",
      name: "Coupon",
      description: "Coupon/voucher codes",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "coupon_redemption",
      name: "CouponRedemption",
      description: "Coupon redemption events",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "channel",
      name: "Channel",
      description: "Sales/marketing channel (store, web, app, marketplace)",
      size: 18,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "attribution",
      name: "Attribution",
      description: "Marketing attribution records",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "audience",
      name: "Audience",
      description: "Target audience definitions",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Ad creative assets",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "ad_spend",
      name: "AdSpend",
      description: "Advertising spend records",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "email_campaign",
      name: "EmailCampaign",
      description: "Email campaign sends",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "push_notification",
      name: "PushNotification",
      description: "Push notification sends",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "ab_test",
      name: "ABTest",
      description: "A/B experiment definitions",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },

    // ---------- EMPLOYEE DOMAIN (Amber) ----------
    {
      id: "employee",
      name: "Employee",
      description: "Employee/staff member",
      size: 24,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "role",
      name: "Role",
      description: "Job role",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "schedule",
      name: "Schedule",
      description: "Work schedules/rosters",
      size: 14,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "shift",
      name: "Shift",
      description: "Individual work shifts",
      size: 14,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "performance",
      name: "Performance",
      description: "Performance reviews/ratings",
      size: 14,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "training",
      name: "Training",
      description: "Training courses/completions",
      size: 14,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "commission",
      name: "Commission",
      description: "Sales commissions",
      size: 14,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "time_entry",
      name: "TimeEntry",
      description: "Time & attendance entries",
      size: 14,
      color: "#F59E0B",
      type: "bkg",
    },

    // ---------- ANALYTICS DOMAIN (Teal) ----------
    {
      id: "kpi",
      name: "KPI",
      description: "KPI definition (e.g. NSV, Sell-through, GM%)",
      size: 24,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "kpi_value",
      name: "KPIValue",
      description: "KPI measurements",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "forecast",
      name: "Forecast",
      description: "Demand/revenue forecasts",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "forecast_accuracy",
      name: "ForecastAccuracy",
      description: "Forecast vs actual accuracy metrics",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "anomaly",
      name: "Anomaly",
      description: "Detected anomalies in metrics",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "alert",
      name: "Alert",
      description: "System alerts/notifications",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "report",
      name: "Report",
      description: "Generated analytical reports",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Dashboard configurations",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "metric",
      name: "Metric",
      description: "Metric definitions used in KPIs",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "benchmark",
      name: "Benchmark",
      description: "Industry/peer benchmarks",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },

    // ---------- EXTERNAL DATA DOMAIN (Cyan) ----------
    {
      id: "competitor",
      name: "Competitor",
      description: "Competitor brands/retailers",
      size: 18,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "competitor_price",
      name: "CompetitorPrice",
      description: "Competitive price observations",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "competitor_product",
      name: "CompetitorProduct",
      description: "Competitor products",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "market_trend",
      name: "MarketTrend",
      description: "Market/industry trends",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "weather_data",
      name: "WeatherData",
      description: "Weather conditions by location/date",
      size: 24,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "event",
      name: "Event",
      description: "External events/holidays impacting demand",
      size: 18,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "economic_indicator",
      name: "EconomicIndicator",
      description: "Macro-economic indicators",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "demographic_data",
      name: "DemographicData",
      description: "Census/demographic data",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },

    // ---------- DIGITAL COMMERCE DOMAIN (Blue) ----------
    {
      id: "web_session",
      name: "WebSession",
      description: "Website/app sessions",
      size: 24,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "page_view",
      name: "PageView",
      description: "Page visits/views",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "product_interaction",
      name: "ProductInteraction",
      description: "Product views/clicks/engagements",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "search_query",
      name: "SearchQuery",
      description: "On-site search queries",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "review",
      name: "Review",
      description: "Product reviews",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "review_response",
      name: "ReviewResponse",
      description: "Responses to reviews",
      size: 14,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "question",
      name: "Question",
      description: "Product questions/Q&A",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "answer",
      name: "Answer",
      description: "Answers to product questions",
      size: 14,
      color: "#3B82F6",
      type: "bkg",
    },
    {
      id: "wishlist",
      name: "Wishlist",
      description: "Customer wishlists/saved products",
      size: 16,
      color: "#3B82F6",
      type: "bkg",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    // ---------- PRODUCT RELATIONSHIPS ----------
    {
      id: "product_has_variant",
      source: "product",
      target: "product_variant",
      type: "HAS_VARIANT",
      description: "Product has one or more variants",
      linkType: "bkg",
    },
    {
      id: "product_belongs_to_category",
      source: "product",
      target: "category",
      type: "BELONGS_TO_CATEGORY",
      description: "Product mapped to a category",
      linkType: "bkg",
    },
    {
      id: "product_manufactured_by",
      source: "product",
      target: "brand",
      type: "MANUFACTURED_BY",
      description: "Product manufactured or owned by a brand",
      linkType: "bkg",
    },
    {
      id: "product_has_price",
      source: "product",
      target: "product_price",
      type: "HAS_PRICE",
      description: "Product has prices (MRP, selling, promo)",
      linkType: "bkg",
    },
    {
      id: "product_has_cost",
      source: "product",
      target: "product_cost",
      type: "HAS_COST",
      description: "Product has cost/landed cost records",
      linkType: "bkg",
    },
    {
      id: "product_has_attribute",
      source: "product",
      target: "product_attribute",
      type: "HAS_ATTRIBUTE",
      description: "Product has dynamic attributes",
      linkType: "bkg",
    },
    {
      id: "product_has_image",
      source: "product",
      target: "product_image",
      type: "HAS_IMAGE",
      description: "Product has one or more images",
      linkType: "bkg",
    },
    {
      id: "product_substitute_for",
      source: "product",
      target: "product",
      type: "SUBSTITUTE_FOR",
      description: "Substitute product mapping",
      linkType: "bkg",
    },
    {
      id: "product_complement_to",
      source: "product",
      target: "product",
      type: "COMPLEMENT_TO",
      description: "Frequently bought together/complement products",
      linkType: "bkg",
    },
    {
      id: "product_upsell_to",
      source: "product",
      target: "product",
      type: "UPSELL_TO",
      description: "Upsell recommendation mapping",
      linkType: "bkg",
    },
    {
      id: "product_cross_sell_to",
      source: "product",
      target: "product",
      type: "CROSS_SELL_TO",
      description: "Cross-sell recommendation mapping",
      linkType: "bkg",
    },
    {
      id: "category_child_of",
      source: "category",
      target: "category",
      type: "CHILD_OF",
      description: "Category hierarchy (child-of parent category)",
      linkType: "bkg",
    },
    {
      id: "category_belongs_to_department",
      source: "category",
      target: "department",
      type: "BELONGS_TO_DEPARTMENT",
      description: "Category belongs to a department",
      linkType: "bkg",
    },
    {
      id: "product_part_of_bundle",
      source: "product",
      target: "product_bundle",
      type: "PART_OF_BUNDLE",
      description: "Product is part of a bundle",
      linkType: "bkg",
    },
    {
      id: "product_has_tag",
      source: "product",
      target: "product_tag",
      type: "HAS_TAG",
      description: "Product tagged for search/merchandising",
      linkType: "bkg",
    },
    {
      id: "product_has_barcode",
      source: "product",
      target: "barcode",
      type: "HAS_BARCODE",
      description: "Product has barcode identifiers",
      linkType: "bkg",
    },
    {
      id: "product_has_lifecycle",
      source: "product",
      target: "product_lifecycle",
      type: "HAS_LIFECYCLE",
      description: "Product has lifecycle stage",
      linkType: "bkg",
    },
    {
      id: "product_has_compliance",
      source: "product",
      target: "product_compliance",
      type: "HAS_COMPLIANCE",
      description: "Product has compliance data",
      linkType: "bkg",
    },

    // ---------- CUSTOMER RELATIONSHIPS ----------
    {
      id: "customer_has_address",
      source: "customer",
      target: "customer_address",
      type: "HAS_ADDRESS",
      description: "Customer has one or more addresses",
      linkType: "bkg",
    },
    {
      id: "customer_member_of_segment",
      source: "customer",
      target: "customer_segment",
      type: "MEMBER_OF_SEGMENT",
      description: "Customer is part of a segment",
      linkType: "bkg",
    },
    {
      id: "customer_has_loyalty_account",
      source: "customer",
      target: "loyalty_account",
      type: "HAS_LOYALTY_ACCOUNT",
      description: "Customer has a loyalty membership account",
      linkType: "bkg",
    },
    {
      id: "loyalty_account_enrolled_in_program",
      source: "loyalty_account",
      target: "loyalty_program",
      type: "ENROLLED_IN",
      description: "Loyalty account enrolled in a program",
      linkType: "bkg",
    },
    {
      id: "loyalty_account_has_transaction",
      source: "loyalty_account",
      target: "loyalty_transaction",
      type: "HAS_TRANSACTION",
      description: "Points accrual or redemption transaction",
      linkType: "bkg",
    },
    {
      id: "customer_has_preference",
      source: "customer",
      target: "customer_preference",
      type: "HAS_PREFERENCE",
      description: "Customer preferences (channel/products/consents)",
      linkType: "bkg",
    },
    {
      id: "customer_belongs_to_household",
      source: "customer",
      target: "household",
      type: "BELONGS_TO_HOUSEHOLD",
      description: "Customer belongs to a household",
      linkType: "bkg",
    },
    {
      id: "customer_has_registry",
      source: "customer",
      target: "gift_registry",
      type: "HAS_REGISTRY",
      description: "Customer has gift registries",
      linkType: "bkg",
    },
    {
      id: "customer_has_subscription",
      source: "customer",
      target: "subscription",
      type: "HAS_SUBSCRIPTION",
      description: "Customer has subscriptions/recurring orders",
      linkType: "bkg",
    },
    {
      id: "customer_referred_by",
      source: "customer",
      target: "customer",
      type: "REFERRED_BY",
      description: "Referral relationships between customers",
      linkType: "bkg",
    },
    {
      id: "customer_interacted_with",
      source: "customer",
      target: "customer_interaction",
      type: "INTERACTED_WITH",
      description: "Customer has interactions (service/contact)",
      linkType: "bkg",
    },
    {
      id: "customer_has_note",
      source: "customer",
      target: "customer_note",
      type: "HAS_NOTE",
      description: "CRM notes associated to a customer",
      linkType: "bkg",
    },

    // ---------- TRANSACTION RELATIONSHIPS ----------
    {
      id: "customer_placed_order",
      source: "customer",
      target: "order",
      type: "PLACED_ORDER",
      description: "Customer placed an order",
      linkType: "bkg",
    },
    {
      id: "order_contains_line",
      source: "order",
      target: "order_line",
      type: "CONTAINS_LINE",
      description: "Order contains line items",
      linkType: "bkg",
    },
    {
      id: "order_line_for_product",
      source: "order_line",
      target: "product",
      type: "FOR_PRODUCT",
      description: "Order line refers to a product",
      linkType: "bkg",
    },
    {
      id: "order_line_for_variant",
      source: "order_line",
      target: "product_variant",
      type: "FOR_VARIANT",
      description: "Order line refers to a specific variant",
      linkType: "bkg",
    },
    {
      id: "order_paid_with_payment",
      source: "order",
      target: "payment",
      type: "PAID_WITH",
      description: "Order paid with a payment transaction",
      linkType: "bkg",
    },
    {
      id: "order_has_refund",
      source: "order",
      target: "refund",
      type: "HAS_REFUND",
      description: "Refund associated to an order",
      linkType: "bkg",
    },
    {
      id: "order_has_return",
      source: "order",
      target: "return",
      type: "HAS_RETURN",
      description: "Return associated to an order",
      linkType: "bkg",
    },
    {
      id: "return_line_for_order_line",
      source: "return_line",
      target: "order_line",
      type: "RETURN_LINE_FOR",
      description: "Return line linked to original order line",
      linkType: "bkg",
    },
    {
      id: "order_through_channel",
      source: "order",
      target: "channel",
      type: "THROUGH_CHANNEL",
      description: "Order placed via a channel (store/web/app)",
      linkType: "bkg",
    },
    {
      id: "order_at_store",
      source: "order",
      target: "store",
      type: "AT_STORE",
      description: "Order transacted at a store",
      linkType: "bkg",
    },
    {
      id: "order_processed_by_employee",
      source: "order",
      target: "employee",
      type: "PROCESSED_BY",
      description: "Order processed by an employee",
      linkType: "bkg",
    },
    {
      id: "order_shipped_via_shipment",
      source: "order",
      target: "shipment",
      type: "SHIPPED_VIA",
      description: "Order fulfilled via shipment",
      linkType: "bkg",
    },
    {
      id: "order_used_coupon",
      source: "order",
      target: "coupon",
      type: "USED_COUPON",
      description: "Order used a coupon",
      linkType: "bkg",
    },
    {
      id: "customer_has_cart",
      source: "customer",
      target: "cart",
      type: "HAS_CART",
      description: "Customer has a shopping cart",
      linkType: "bkg",
    },
    {
      id: "cart_contains_item",
      source: "cart",
      target: "cart_item",
      type: "CART_CONTAINS",
      description: "Cart contains items",
      linkType: "bkg",
    },
    {
      id: "invoice_for_order",
      source: "invoice",
      target: "order",
      type: "INVOICE_FOR",
      description: "Invoice generated for an order",
      linkType: "bkg",
    },
    {
      id: "receipt_for_order",
      source: "receipt",
      target: "order",
      type: "RECEIPT_FOR",
      description: "Receipt for an order",
      linkType: "bkg",
    },

    // ---------- INVENTORY RELATIONSHIPS ----------
    {
      id: "product_has_inventory",
      source: "product",
      target: "inventory_level",
      type: "HAS_INVENTORY",
      description: "Product has inventory levels by location",
      linkType: "bkg",
    },
    {
      id: "inventory_stored_at_warehouse",
      source: "inventory_level",
      target: "warehouse",
      type: "STORED_AT",
      description: "Inventory stored at a warehouse",
      linkType: "bkg",
    },
    {
      id: "inventory_in_bin",
      source: "inventory_level",
      target: "bin_location",
      type: "IN_BIN",
      description: "Inventory in a bin/shelf location",
      linkType: "bkg",
    },
    {
      id: "bin_in_warehouse",
      source: "bin_location",
      target: "warehouse",
      type: "IN_WAREHOUSE",
      description: "Bin belongs to a warehouse",
      linkType: "bkg",
    },
    {
      id: "allocation_from_inventory",
      source: "stock_allocation",
      target: "inventory_level",
      type: "ALLOCATED_FROM",
      description: "Allocation from inventory",
      linkType: "bkg",
    },
    {
      id: "allocation_to_order_line",
      source: "stock_allocation",
      target: "order_line",
      type: "ALLOCATED_TO",
      description: "Allocation reserved for an order line",
      linkType: "bkg",
    },
    {
      id: "inventory_had_movement",
      source: "inventory_level",
      target: "inventory_movement",
      type: "HAD_MOVEMENT",
      description: "Inventory had movements over time",
      linkType: "bkg",
    },
    {
      id: "stocktransfer_from_warehouse",
      source: "stock_transfer",
      target: "warehouse",
      type: "TRANSFER_FROM",
      description: "Stock transfer from a warehouse",
      linkType: "bkg",
    },
    {
      id: "stocktransfer_to_warehouse",
      source: "stock_transfer",
      target: "warehouse",
      type: "TRANSFER_TO",
      description: "Stock transfer to a warehouse",
      linkType: "bkg",
    },
    {
      id: "product_has_reorder_rule",
      source: "product",
      target: "reorder_rule",
      type: "HAS_REORDER_RULE",
      description: "Product has replenishment rules",
      linkType: "bkg",
    },
    {
      id: "product_has_safety_stock",
      source: "product",
      target: "safety_stock",
      type: "HAS_SAFETY_STOCK",
      description: "Product has safety stock defined",
      linkType: "bkg",
    },
    {
      id: "inventory_has_snapshot",
      source: "inventory_level",
      target: "inventory_snapshot",
      type: "HAS_SNAPSHOT",
      description: "Inventory captured in snapshots",
      linkType: "bkg",
    },
    {
      id: "inventory_has_count",
      source: "inventory_level",
      target: "inventory_count",
      type: "HAS_COUNT",
      description: "Inventory counted in cycle counts",
      linkType: "bkg",
    },
    {
      id: "inventory_has_adjustment",
      source: "inventory_level",
      target: "inventory_adjustment",
      type: "HAS_ADJUSTMENT",
      description: "Inventory corrected via adjustment",
      linkType: "bkg",
    },

    // ---------- SUPPLY CHAIN RELATIONSHIPS ----------
    {
      id: "supplier_supplies_product",
      source: "supplier",
      target: "product",
      type: "SUPPLIES",
      description: "Supplier supplies product (with cost, MOQ, leadtime)",
      linkType: "bkg",
    },
    {
      id: "supplier_has_contact",
      source: "supplier",
      target: "supplier_contact",
      type: "HAS_CONTACT",
      description: "Supplier has contact persons",
      linkType: "bkg",
    },
    {
      id: "purchase_order_ordered_from_supplier",
      source: "purchase_order",
      target: "supplier",
      type: "ORDERED_FROM",
      description: "PO raised on a supplier",
      linkType: "bkg",
    },
    {
      id: "purchase_order_delivered_to_warehouse",
      source: "purchase_order",
      target: "warehouse",
      type: "DELIVERED_TO",
      description: "PO delivered to warehouse/location",
      linkType: "bkg",
    },
    {
      id: "purchase_order_contains_line",
      source: "purchase_order",
      target: "purchase_order_line",
      type: "CONTAINS",
      description: "PO contains line items",
      linkType: "bkg",
    },
    {
      id: "po_line_for_product",
      source: "purchase_order_line",
      target: "product",
      type: "PO_LINE_FOR",
      description: "PO line refers to a product",
      linkType: "bkg",
    },
    {
      id: "purchase_order_received_by_grn",
      source: "purchase_order",
      target: "goods_receipt",
      type: "RECEIVED_BY",
      description: "PO received via goods receipt",
      linkType: "bkg",
    },
    {
      id: "shipment_shipped_by_carrier",
      source: "shipment",
      target: "carrier",
      type: "SHIPPED_BY",
      description: "Shipment handled by a carrier",
      linkType: "bkg",
    },
    {
      id: "shipment_shipped_from_warehouse",
      source: "shipment",
      target: "warehouse",
      type: "SHIPPED_FROM",
      description: "Shipment originates from a warehouse",
      linkType: "bkg",
    },
    {
      id: "shipment_shipped_to_address",
      source: "shipment",
      target: "customer_address",
      type: "SHIPPED_TO",
      description: "Shipment delivered to an address",
      linkType: "bkg",
    },
    {
      id: "shipment_has_tracking",
      source: "shipment",
      target: "tracking_event",
      type: "HAS_TRACKING",
      description: "Shipment has tracking events",
      linkType: "bkg",
    },
    {
      id: "supplier_has_contract",
      source: "supplier",
      target: "supplier_contract",
      type: "HAS_CONTRACT",
      description: "Supplier governed by contract/terms",
      linkType: "bkg",
    },
    {
      id: "supplier_has_scorecard",
      source: "supplier",
      target: "supplier_scorecard",
      type: "HAS_SCORECARD",
      description: "Supplier assessed via scorecard",
      linkType: "bkg",
    },
    {
      id: "supplier_has_lead_time",
      source: "supplier",
      target: "lead_time",
      type: "HAS_LEAD_TIME",
      description: "Lead time records for supplier/product/location",
      linkType: "bkg",
    },
    {
      id: "supplier_has_moq",
      source: "supplier",
      target: "moq",
      type: "HAS_MOQ",
      description: "MOQ defined for supplier/product",
      linkType: "bkg",
    },
    {
      id: "product_has_landed_cost",
      source: "product",
      target: "landed_cost",
      type: "HAS_LANDED_COST",
      description: "Landed cost breakdown for product",
      linkType: "bkg",
    },

    // ---------- STORE RELATIONSHIPS ----------
    {
      id: "store_in_region",
      source: "store",
      target: "region",
      type: "IN_REGION",
      description: "Store belongs to a region",
      linkType: "bkg",
    },
    {
      id: "store_in_district",
      source: "store",
      target: "district",
      type: "IN_DISTRICT",
      description: "Store belongs to a district",
      linkType: "bkg",
    },
    {
      id: "store_has_zone",
      source: "store",
      target: "store_zone",
      type: "HAS_ZONE",
      description: "Store has zones/areas",
      linkType: "bkg",
    },
    {
      id: "store_zone_has_fixture",
      source: "store_zone",
      target: "fixture",
      type: "HAS_FIXTURE",
      description: "Zone contains fixtures",
      linkType: "bkg",
    },
    {
      id: "fixture_has_planogram",
      source: "fixture",
      target: "planogram",
      type: "HAS_PLANOGRAM",
      description: "Fixture has a planogram",
      linkType: "bkg",
    },
    {
      id: "planogram_position_for_product",
      source: "planogram_position",
      target: "product",
      type: "POSITION_FOR",
      description: "Planogram position for a product",
      linkType: "bkg",
    },
    {
      id: "planogram_has_position",
      source: "planogram",
      target: "planogram_position",
      type: "HAS_POSITION",
      description: "Planogram consists of positions",
      linkType: "bkg",
    },
    {
      id: "store_has_terminal",
      source: "store",
      target: "pos_terminal",
      type: "HAS_TERMINAL",
      description: "Store has PoS terminals",
      linkType: "bkg",
    },
    {
      id: "store_managed_by_employee",
      source: "store",
      target: "employee",
      type: "MANAGED_BY",
      description: "Store manager relationship",
      linkType: "bkg",
    },
    {
      id: "employee_works_at_store",
      source: "employee",
      target: "store",
      type: "WORKS_AT",
      description: "Employee works at store",
      linkType: "bkg",
    },
    {
      id: "employee_has_role",
      source: "employee",
      target: "role",
      type: "HAS_ROLE",
      description: "Employee has job role",
      linkType: "bkg",
    },
    {
      id: "employee_reports_to",
      source: "employee",
      target: "employee",
      type: "REPORTS_TO",
      description: "Org reporting structure",
      linkType: "bkg",
    },
    {
      id: "employee_manages_region",
      source: "employee",
      target: "region",
      type: "MANAGES_REGION",
      description: "Regional manager mapping",
      linkType: "bkg",
    },
    {
      id: "store_carries_product",
      source: "store",
      target: "product",
      type: "CARRIES",
      description: "Store carries product in assortment",
      linkType: "bkg",
    },
    {
      id: "store_has_hours",
      source: "store",
      target: "store_hours",
      type: "HAS_HOURS",
      description: "Store operating hours",
      linkType: "bkg",
    },
    {
      id: "store_in_cluster",
      source: "store",
      target: "store_cluster",
      type: "IN_CLUSTER",
      description: "Store belongs to a cluster",
      linkType: "bkg",
    },
    {
      id: "store_has_capacity",
      source: "store",
      target: "store_capacity",
      type: "HAS_CAPACITY",
      description: "Store has capacity constraints",
      linkType: "bkg",
    },
    {
      id: "store_has_amenity",
      source: "store",
      target: "store_amenity",
      type: "HAS_AMENITY",
      description: "Store has amenities/features",
      linkType: "bkg",
    },
    {
      id: "store_has_event",
      source: "store",
      target: "store_event",
      type: "HAS_EVENT",
      description: "In-store events/activations",
      linkType: "bkg",
    },

    // ---------- MARKETING RELATIONSHIPS ----------
    {
      id: "campaign_includes_promotion",
      source: "campaign",
      target: "promotion",
      type: "INCLUDES_PROMOTION",
      description: "Campaign includes promotion(s)",
      linkType: "bkg",
    },
    {
      id: "campaign_targets_segment",
      source: "campaign",
      target: "customer_segment",
      type: "TARGETS_SEGMENT",
      description: "Campaign targets customer segments",
      linkType: "bkg",
    },
    {
      id: "promotion_applies_to_category",
      source: "promotion",
      target: "category",
      type: "APPLIES_TO_CATEGORY",
      description: "Promotion applicable to category",
      linkType: "bkg",
    },
    {
      id: "promotion_applies_to_product",
      source: "promotion",
      target: "product",
      type: "APPLIES_TO_PRODUCT",
      description: "Promotion applicable to product",
      linkType: "bkg",
    },
    {
      id: "coupon_for_promotion",
      source: "coupon",
      target: "promotion",
      type: "FOR_PROMOTION",
      description: "Coupon attached to a promotion",
      linkType: "bkg",
    },
    {
      id: "customer_redeemed_coupon",
      source: "customer",
      target: "coupon_redemption",
      type: "REDEEMED_COUPON",
      description: "Customer coupon redemption event",
      linkType: "bkg",
    },
    {
      id: "order_attributed_to_marketing",
      source: "order",
      target: "attribution",
      type: "ATTRIBUTED_TO",
      description: "Order attributed to marketing touchpoints",
      linkType: "bkg",
    },
    {
      id: "campaign_has_creative",
      source: "campaign",
      target: "creative",
      type: "HAS_CREATIVE",
      description: "Campaign uses creatives",
      linkType: "bkg",
    },
    {
      id: "campaign_targets_audience",
      source: "campaign",
      target: "audience",
      type: "TARGETS_AUDIENCE",
      description: "Campaign targets audiences",
      linkType: "bkg",
    },
    {
      id: "campaign_has_ab_test",
      source: "campaign",
      target: "ab_test",
      type: "HAS_AB_TEST",
      description: "Campaign controlled via A/B tests",
      linkType: "bkg",
    },
    {
      id: "campaign_has_ad_spend",
      source: "campaign",
      target: "ad_spend",
      type: "HAS_SPEND",
      description: "Campaign ad spend records",
      linkType: "bkg",
    },
    {
      id: "campaign_has_email_campaign",
      source: "campaign",
      target: "email_campaign",
      type: "HAS_EMAIL_CAMPAIGN",
      description: "Email executions for campaign",
      linkType: "bkg",
    },
    {
      id: "campaign_has_push_notification",
      source: "campaign",
      target: "push_notification",
      type: "HAS_PUSH_NOTIFICATION",
      description: "Push executions for campaign",
      linkType: "bkg",
    },

    // ---------- EMPLOYEE RELATIONSHIPS ----------
    {
      id: "employee_has_schedule",
      source: "employee",
      target: "schedule",
      type: "HAS_SCHEDULE",
      description: "Employee work schedule",
      linkType: "bkg",
    },
    {
      id: "schedule_has_shift",
      source: "schedule",
      target: "shift",
      type: "HAS_SHIFT",
      description: "Schedule composed of shifts",
      linkType: "bkg",
    },
    {
      id: "employee_has_performance",
      source: "employee",
      target: "performance",
      type: "HAS_PERFORMANCE",
      description: "Performance reviews for employee",
      linkType: "bkg",
    },
    {
      id: "employee_has_training",
      source: "employee",
      target: "training",
      type: "HAS_TRAINING",
      description: "Trainings completed/assigned",
      linkType: "bkg",
    },
    {
      id: "employee_has_commission",
      source: "employee",
      target: "commission",
      type: "HAS_COMMISSION",
      description: "Commission earnings",
      linkType: "bkg",
    },
    {
      id: "employee_has_time_entry",
      source: "employee",
      target: "time_entry",
      type: "HAS_TIME_ENTRY",
      description: "Time & attendance entries",
      linkType: "bkg",
    },

    // ---------- ANALYTICS RELATIONSHIPS ----------
    {
      id: "kpi_has_value",
      source: "kpi",
      target: "kpi_value",
      type: "HAS_VALUE",
      description: "KPI has measured values",
      linkType: "bkg",
    },
    {
      id: "kpi_has_benchmark",
      source: "kpi",
      target: "benchmark",
      type: "HAS_BENCHMARK",
      description: "KPI benchmark values",
      linkType: "bkg",
    },
    {
      id: "forecast_for_product",
      source: "forecast",
      target: "product",
      type: "FORECASTS",
      description: "Forecast for product",
      linkType: "bkg",
    },
    {
      id: "forecast_for_store",
      source: "forecast",
      target: "store",
      type: "FORECASTS",
      description: "Forecast at store level",
      linkType: "bkg",
    },
    {
      id: "forecast_has_accuracy",
      source: "forecast",
      target: "forecast_accuracy",
      type: "HAS_ACCURACY",
      description: "Accuracy metrics for forecast",
      linkType: "bkg",
    },
    {
      id: "anomaly_detected_for_product",
      source: "anomaly",
      target: "product",
      type: "DETECTED_FOR",
      description: "Anomaly detected for product metric",
      linkType: "bkg",
    },
    {
      id: "anomaly_detected_for_store",
      source: "anomaly",
      target: "store",
      type: "DETECTED_FOR",
      description: "Anomaly detected for store metric",
      linkType: "bkg",
    },
    {
      id: "anomaly_triggered_alert",
      source: "anomaly",
      target: "alert",
      type: "TRIGGERED_ALERT",
      description: "Anomaly triggered alert",
      linkType: "bkg",
    },
    {
      id: "report_uses_kpi",
      source: "report",
      target: "kpi",
      type: "USES_KPI",
      description: "Report uses KPIs",
      linkType: "bkg",
    },
    {
      id: "dashboard_uses_kpi",
      source: "dashboard",
      target: "kpi",
      type: "USES_KPI",
      description: "Dashboard uses KPIs",
      linkType: "bkg",
    },

    // ---------- DIGITAL COMMERCE RELATIONSHIPS ----------
    {
      id: "customer_had_session",
      source: "customer",
      target: "web_session",
      type: "HAD_SESSION",
      description: "Customer had a web/app session",
      linkType: "bkg",
    },
    {
      id: "session_on_channel",
      source: "web_session",
      target: "channel",
      type: "ON_CHANNEL",
      description: "Session on a given channel (web/app)",
      linkType: "bkg",
    },
    {
      id: "session_had_pageview",
      source: "web_session",
      target: "page_view",
      type: "HAD_PAGEVIEW",
      description: "Session generated page views",
      linkType: "bkg",
    },
    {
      id: "session_had_product_interaction",
      source: "web_session",
      target: "product_interaction",
      type: "HAD_INTERACTION",
      description: "Session had product interactions",
      linkType: "bkg",
    },
    {
      id: "product_interaction_for_product",
      source: "product_interaction",
      target: "product",
      type: "WITH_PRODUCT",
      description: "Interaction on a product",
      linkType: "bkg",
    },
    {
      id: "session_had_search",
      source: "web_session",
      target: "search_query",
      type: "HAD_SEARCH",
      description: "Session had search queries",
      linkType: "bkg",
    },
    {
      id: "customer_wrote_review",
      source: "customer",
      target: "review",
      type: "WROTE_REVIEW",
      description: "Customer wrote review",
      linkType: "bkg",
    },
    {
      id: "review_for_product",
      source: "review",
      target: "product",
      type: "FOR_PRODUCT",
      description: "Review refers to product",
      linkType: "bkg",
    },
    {
      id: "review_for_order",
      source: "review",
      target: "order",
      type: "FOR_ORDER",
      description: "Review tied to an order",
      linkType: "bkg",
    },
    {
      id: "review_has_response",
      source: "review",
      target: "review_response",
      type: "HAS_RESPONSE",
      description: "Review has a response",
      linkType: "bkg",
    },
    {
      id: "customer_asked_question",
      source: "customer",
      target: "question",
      type: "ASKED_QUESTION",
      description: "Customer asked product question",
      linkType: "bkg",
    },
    {
      id: "question_has_answer",
      source: "question",
      target: "answer",
      type: "HAS_ANSWER",
      description: "Question answered",
      linkType: "bkg",
    },
    {
      id: "customer_has_wishlist",
      source: "customer",
      target: "wishlist",
      type: "HAS_WISHLIST",
      description: "Customer has wishlist",
      linkType: "bkg",
    },
    {
      id: "product_on_wishlist",
      source: "product",
      target: "wishlist",
      type: "ON_WISHLIST",
      description: "Product on wishlist",
      linkType: "bkg",
    },

    // ---------- EXTERNAL / CROSS-DOMAIN RELATIONSHIPS ----------
    {
      id: "customer_purchased_product",
      source: "customer",
      target: "product",
      type: "PURCHASED",
      description: "Aggregate purchase relationship",
      linkType: "bkg",
    },
    {
      id: "customer_viewed_product",
      source: "customer",
      target: "product",
      type: "VIEWED",
      description: "Aggregate view relationship",
      linkType: "bkg",
    },
    {
      id: "customer_wishlisted_product",
      source: "customer",
      target: "product",
      type: "WISHLISTED",
      description: "Aggregate wishlist relationship",
      linkType: "bkg",
    },
    {
      id: "customer_reviewed_product",
      source: "customer",
      target: "product",
      type: "REVIEWED",
      description: "Aggregate review relationship",
      linkType: "bkg",
    },
    {
      id: "weather_for_store_location",
      source: "weather_data",
      target: "store",
      type: "FOR_LOCATION",
      description: "Weather for store/location",
      linkType: "bkg",
    },
    {
      id: "event_affects_store",
      source: "event",
      target: "store",
      type: "AFFECTS",
      description: "Event/holiday affecting store demand",
      linkType: "bkg",
    },
    {
      id: "competitor_competes_with_brand",
      source: "competitor",
      target: "brand",
      type: "COMPETES_WITH",
      description: "Competitor vs brand mapping",
      linkType: "bkg",
    },
    {
      id: "competitor_price_for_product",
      source: "competitor_price",
      target: "competitor_product",
      type: "PRICE_FOR",
      description: "Competitive price for competitor product",
      linkType: "bkg",
    },
    {
      id: "competitor_product_maps_to_product",
      source: "competitor_product",
      target: "product",
      type: "MAPS_TO",
      description: "Mapping competitor SKUs to internal products",
      linkType: "bkg",
    },
    {
      id: "market_trend_for_category",
      source: "market_trend",
      target: "category",
      type: "TREND_FOR",
      description: "Trend for category",
      linkType: "bkg",
    },
    {
      id: "economic_indicator_for_region",
      source: "economic_indicator",
      target: "region",
      type: "INDICATOR_FOR",
      description: "Macro indicator for region",
      linkType: "bkg",
    },
    {
      id: "demographic_data_for_region",
      source: "demographic_data",
      target: "region",
      type: "DEMOGRAPHICS_FOR",
      description: "Demographics for region",
      linkType: "bkg",
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

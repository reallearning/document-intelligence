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
    null
  );
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
          .distance(180)
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
        })
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
          linkElement.attr("stroke-width")
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
        d.linkType === "data" ? "url(#arrowhead-data)" : "url(#arrowhead)"
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
          .on("end", dragended)
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
          (d) => (((d.source as Node).x ?? 0) + ((d.target as Node).x ?? 0)) / 2
        )
        .attr(
          "y",
          (d) => (((d.source as Node).y ?? 0) + ((d.target as Node).y ?? 0)) / 2
        );

      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    function dragstarted(
      event: d3.D3DragEvent<SVGGElement, Node, Node>,
      d: Node
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
      d: Node
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
          (d: Node) => d.id
        )
        .attr("r", (d) => d.size)
        .attr("fill", (d) => d.color);

      g.selectAll<SVGRectElement, Node>(".node rect")
        .data(
          nodes.filter((n) => n.type === "source"),
          (d: Node) => d.id
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
          (d: Link) => d.id
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
      })
    );
    setSelectedItem((prev) => ({ ...prev!, [field]: value } as Node | Link));
  };

  const handleLinkUpdate = (field: keyof Link, value: string) => {
    if (!selectedItem || (editMode !== "link" && editMode !== "datalink"))
      return;

    const linkId = (selectedItem as Link).id;

    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === linkId ? { ...link, [field]: value } : link
      )
    );
    setSelectedItem((prev) => ({ ...prev!, [field]: value } as Node | Link));
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

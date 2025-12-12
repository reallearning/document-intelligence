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
    // ========= PRODUCT DOMAIN =========
    {
      id: "product",
      name: "Product",
      description: "Core product entity with SKU, UPC, status",
      size: 24,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_variant",
      name: "ProductVariant",
      description: "Size/color/material variations",
      size: 16,
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
      description: "Product manufacturers/brands",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "department",
      name: "Department",
      description: "Top-level organizational product grouping",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_price",
      name: "ProductPrice",
      description: "List/sale/promotional pricing",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_cost",
      name: "ProductCost",
      description: "COGS and landed costs",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_attribute",
      name: "ProductAttribute",
      description: "Dynamic product attributes",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_image",
      name: "ProductImage",
      description: "Product media assets",
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
      description: "Searchable tags",
      size: 14,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "barcode",
      name: "Barcode",
      description: "UPC/EAN/GTIN codes",
      size: 14,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_lifecycle",
      name: "ProductLifecycle",
      description: "Stage tracking (new/mature/EOL)",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_compliance",
      name: "ProductCompliance",
      description: "Regulatory compliance data",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },

    // ========= CUSTOMER DOMAIN =========
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
      description: "Shipping/billing addresses",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "customer_segment",
      name: "CustomerSegment",
      description: "RFM/behavioral segments",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "loyalty_program",
      name: "LoyaltyProgram",
      description: "Loyalty program definition",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "loyalty_account",
      name: "LoyaltyAccount",
      description: "Customer loyalty membership",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "loyalty_transaction",
      name: "LoyaltyTransaction",
      description: "Points earned/redeemed",
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "customer_preference",
      name: "CustomerPreference",
      description: "Communication/product preferences",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "customer_interaction",
      name: "CustomerInteraction",
      description: "Service interactions",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "household",
      name: "Household",
      description: "Household grouping",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "gift_registry",
      name: "GiftRegistry",
      description: "Wishlists/registries",
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "subscription",
      name: "Subscription",
      description: "Recurring orders",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "customer_note",
      name: "CustomerNote",
      description: "CRM notes",
      size: 14,
      color: "#EC4899",
      type: "bkg",
    },

    // ========= TRANSACTION / SALES DOMAIN =========
    {
      id: "order",
      name: "Order",
      description: "Sales orders",
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
      description: "Payment transactions",
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
      description: "Return requests",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "return_line",
      name: "ReturnLine",
      description: "Return line items",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "cart",
      name: "Cart",
      description: "Shopping carts",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "cart_item",
      name: "CartItem",
      description: "Cart line items",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "invoice",
      name: "Invoice",
      description: "Invoices",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "receipt",
      name: "Receipt",
      description: "POS receipts",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },

    // ========= INVENTORY DOMAIN =========
    {
      id: "inventory_level",
      name: "InventoryLevel",
      description: "Stock quantities by location",
      size: 24,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_movement",
      name: "InventoryMovement",
      description: "Stock movements",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "stock_allocation",
      name: "StockAllocation",
      description: "Reserved inventory",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "warehouse",
      name: "Warehouse",
      description: "Distribution centers",
      size: 18,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "bin_location",
      name: "BinLocation",
      description: "Bin/shelf locations",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_count",
      name: "InventoryCount",
      description: "Cycle counts",
      size: 14,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_adjustment",
      name: "InventoryAdjustment",
      description: "Stock adjustments",
      size: 14,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "reorder_rule",
      name: "ReorderRule",
      description: "Replenishment rules",
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
      description: "Point-in-time snapshots",
      size: 14,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "stock_transfer",
      name: "StockTransfer",
      description: "Inter-location transfers",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },

    // ========= SUPPLY CHAIN DOMAIN =========
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
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "purchase_order",
      name: "PurchaseOrder",
      description: "Purchase orders",
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
      description: "Receiving records",
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
      description: "Shipment contents",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "carrier",
      name: "Carrier",
      description: "Shipping carriers",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "carrier_service",
      name: "CarrierService",
      description: "Shipping methods",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "tracking_event",
      name: "TrackingEvent",
      description: "Tracking updates",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "supplier_contract",
      name: "SupplierContract",
      description: "Vendor contracts",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "supplier_scorecard",
      name: "SupplierScorecard",
      description: "Performance metrics",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "lead_time",
      name: "LeadTime",
      description: "Lead time records",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "moq",
      name: "MOQ",
      description: "Minimum order quantities",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "landed_cost",
      name: "LandedCost",
      description: "Total landed costs",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },

    // ========= STORE OPERATIONS DOMAIN =========
    {
      id: "store",
      name: "Store",
      description: "Physical retail locations",
      size: 24,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_zone",
      name: "StoreZone",
      description: "Store areas/departments",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "fixture",
      name: "Fixture",
      description: "Shelving/displays",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "planogram",
      name: "Planogram",
      description: "Shelf layouts",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "planogram_position",
      name: "PlanogramPosition",
      description: "Product placements",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "pos_terminal",
      name: "POSTerminal",
      description: "Checkout terminals",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_hours",
      name: "StoreHours",
      description: "Operating hours",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_event",
      name: "StoreEvent",
      description: "In-store events",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "region",
      name: "Region",
      description: "Geographic regions",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "district",
      name: "District",
      description: "Store districts",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_cluster",
      name: "StoreCluster",
      description: "Store groupings",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_capacity",
      name: "StoreCapacity",
      description: "Traffic/capacity limits",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_amenity",
      name: "StoreAmenity",
      description: "Store features",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },

    // ========= MARKETING DOMAIN =========
    {
      id: "campaign",
      name: "Campaign",
      description: "Marketing campaigns",
      size: 24,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "promotion",
      name: "Promotion",
      description: "Discounts/offers",
      size: 18,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "coupon",
      name: "Coupon",
      description: "Coupon codes",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "coupon_redemption",
      name: "CouponRedemption",
      description: "Coupon usage",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "channel",
      name: "Channel",
      description: "Sales channels",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "attribution",
      name: "Attribution",
      description: "Marketing attribution",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "audience",
      name: "Audience",
      description: "Target audiences",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Ad creatives",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "ad_spend",
      name: "AdSpend",
      description: "Advertising spend",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "email_campaign",
      name: "EmailCampaign",
      description: "Email campaigns",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "push_notification",
      name: "PushNotification",
      description: "Push messages",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "ab_test",
      name: "ABTest",
      description: "A/B tests",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },

    // ========= EMPLOYEE DOMAIN =========
    {
      id: "employee",
      name: "Employee",
      description: "Staff members",
      size: 24,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "role",
      name: "Role",
      description: "Job roles",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "schedule",
      name: "Schedule",
      description: "Work schedules",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "shift",
      name: "Shift",
      description: "Individual shifts",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "performance",
      name: "Performance",
      description: "Performance reviews",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "training",
      name: "Training",
      description: "Training records",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "commission",
      name: "Commission",
      description: "Sales commissions",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "time_entry",
      name: "TimeEntry",
      description: "Time tracking",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },

    // ========= ANALYTICS DOMAIN =========
    {
      id: "kpi",
      name: "KPI",
      description: "KPI definitions",
      size: 24,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "kpi_value",
      name: "KPIValue",
      description: "KPI measurements",
      size: 16,
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
      description: "Forecast vs actual",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "anomaly",
      name: "Anomaly",
      description: "Detected anomalies",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "alert",
      name: "Alert",
      description: "System alerts",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "report",
      name: "Report",
      description: "Generated reports",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Dashboard configs",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "metric",
      name: "Metric",
      description: "Metric definitions",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "benchmark",
      name: "Benchmark",
      description: "Industry benchmarks",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },

    // ========= EXTERNAL DATA DOMAIN =========
    {
      id: "competitor",
      name: "Competitor",
      description: "Competitor profiles",
      size: 24,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "competitor_price",
      name: "CompetitorPrice",
      description: "Competitive pricing",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "competitor_product",
      name: "CompetitorProduct",
      description: "Competitor products",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "market_trend",
      name: "MarketTrend",
      description: "Market trends",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "weather_data",
      name: "WeatherData",
      description: "Weather conditions",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "event",
      name: "Event",
      description: "Holidays/events",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "economic_indicator",
      name: "EconomicIndicator",
      description: "Economic data",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },
    {
      id: "demographic_data",
      name: "DemographicData",
      description: "Census/demographic data",
      size: 16,
      color: "#64748B",
      type: "bkg",
    },

    // ========= DIGITAL COMMERCE DOMAIN =========
    {
      id: "web_session",
      name: "WebSession",
      description: "Website sessions",
      size: 24,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "page_view",
      name: "PageView",
      description: "Page visits",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "product_interaction",
      name: "ProductInteraction",
      description: "Product views/clicks",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "search_query",
      name: "SearchQuery",
      description: "Site searches",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "review",
      name: "Review",
      description: "Product reviews",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "review_response",
      name: "ReviewResponse",
      description: "Review replies",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "question",
      name: "Question",
      description: "Product Q&A questions",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "answer",
      name: "Answer",
      description: "Product Q&A answers",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "wishlist",
      name: "Wishlist",
      description: "Saved products",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "sap_hana",
      name: "SAP HANA",
      description: "Core ERP: product, inventory, purchasing, finance",
      width: 140,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "wondersoft_pos",
      name: "Wondersoft POS",
      description: "Store POS: bills, tenders, returns, line items",
      width: 160,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "plm",
      name: "PLM (Centric)",
      description: "Product Lifecycle Management (styles, seasons, launches)",
      width: 180,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "wms",
      name: "WMS",
      description: "Warehouse Management System (inbound, outbound, putaway)",
      width: 140,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "crm",
      name: "CRM",
      description: "Customer 360, service tickets, store and call interactions",
      width: 140,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "web_analytics",
      name: "Web Analytics (GA4)",
      description: "Site sessions, page views, product interactions, funnels",
      width: 190,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "loyalty_engine",
      name: "Loyalty Engine",
      description: "Points accrual, redemptions, tier history",
      width: 160,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "marketing_automation",
      name: "Marketing Automation",
      description: "Campaign sends, opens, clicks, journeys",
      width: 190,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "hrms",
      name: "HRMS",
      description: "Employee master, roles, performance, training",
      width: 130,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "external_data_lake",
      name: "External Data Lake",
      description: "Weather, events, macro indicators, competition feeds",
      width: 200,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    // --- SAP HANA → CORE ENTITIES ---

    {
      id: "ds_sap_products",
      source: "sap_hana",
      target: "product",
      type: "FEEDS",
      description: "SAP material master → Product",
      nlQuery:
        "List all active products with brand, category and base unit of measure",
      dataContext:
        "Source: SAP HANA MARA, MVKE, MVKE_T\nFields: matnr (product_code), mtart (type), matkl (category), brand_code, base_uom, status",
      linkType: "data",
    },
    {
      id: "ds_sap_inventory",
      source: "sap_hana",
      target: "inventory_level",
      type: "FEEDS",
      description: "SAP stock tables → InventoryLevel by store/DC",
      nlQuery:
        "Show current on-hand, in-transit and reserved inventory for a given product across all locations",
      dataContext:
        "Source: SAP HANA MARD, MDKP, MDVM\nFields: matnr (product_code), werks (location), lgort (storage_location), labst (unrestricted_stock), insme (stock_in_quality), umlme (in_transfer), reserv_stock",
      linkType: "data",
    },
    {
      id: "ds_sap_po",
      source: "sap_hana",
      target: "purchase_order",
      type: "FEEDS",
      description: "SAP purchase orders → PurchaseOrder",
      nlQuery:
        "List open purchase orders by supplier and expected delivery date for a given category or brand",
      dataContext:
        "Source: SAP HANA EKKO, EKPO\nFields: ebeln (po_number), bukrs (company_code), lifnr (supplier_code), matnr (product_code), menge (ordered_qty), netpr (price), eindt (delivery_date), bstyp (doc_type), loekz (deletion_flag)",
      linkType: "data",
    },
    {
      id: "ds_sap_supplier",
      source: "sap_hana",
      target: "supplier",
      type: "FEEDS",
      description: "SAP vendor master → Supplier",
      nlQuery: "List strategic suppliers with annual PO value and lead time",
      dataContext:
        "Source: SAP HANA LFA1, LFB1\nFields: lifnr (supplier_code), name1 (supplier_name), land1 (country), regio (region), payment_terms, incoterms",
      linkType: "data",
    },
    {
      id: "ds_sap_store",
      source: "sap_hana",
      target: "store",
      type: "FEEDS",
      description: "SAP plant/store master → Store",
      nlQuery:
        "List all active stores with region, district and opening date for a given format",
      dataContext:
        "Source: SAP HANA T001W\nFields: werks (store_code), name1 (store_name), region, district, city, format, opening_date, closing_date",
      linkType: "data",
    },

    // --- WONDERSOFT POS → ORDERS / RECEIPTS / RETURNS ---

    {
      id: "ds_pos_orders",
      source: "wondersoft_pos",
      target: "order",
      type: "FEEDS",
      description: "POS bills → Order",
      nlQuery:
        "Show yesterday's store-wise sales, average bill value and bill count from POS",
      dataContext:
        "Source: Wondersoft BillHeader\nFields: bill_no, bill_date, store_code, customer_id, gross_amount, discount_amount, net_amount, payment_mode, cashier_id",
      linkType: "data",
    },
    {
      id: "ds_pos_order_lines",
      source: "wondersoft_pos",
      target: "order_line",
      type: "FEEDS",
      description: "POS line items → OrderLine",
      nlQuery:
        "For a given product, show quantity, net sales and discount by store over the last 30 days",
      dataContext:
        "Source: Wondersoft BillDetail\nFields: bill_no, line_no, sku_code, qty, mrp, selling_price, discount_amount, tax_amount, net_amount",
      linkType: "data",
    },
    {
      id: "ds_pos_receipts",
      source: "wondersoft_pos",
      target: "receipt",
      type: "FEEDS",
      description: "POS receipt header → Receipt",
      nlQuery:
        "List all receipts for a given store and date range, including payment split by tender type",
      dataContext:
        "Source: Wondersoft TenderSummary\nFields: bill_no, store_code, bill_date, tender_type, tender_amount, reference_no",
      linkType: "data",
    },
    {
      id: "ds_pos_returns",
      source: "wondersoft_pos",
      target: "return",
      type: "FEEDS",
      description: "POS return documents → Return",
      nlQuery:
        "Show return rate (quantity and value) by product and store for last 90 days",
      dataContext:
        "Source: Wondersoft ReturnHeader, ReturnDetail\nFields: return_no, bill_no, store_code, return_date, sku_code, return_qty, return_amount, reason_code",
      linkType: "data",
    },
    {
      id: "ds_pos_inventory_movements",
      source: "wondersoft_pos",
      target: "inventory_movement",
      type: "FEEDS",
      description: "Store-side stock changes → InventoryMovement",
      nlQuery:
        "For a given store, list all stock movements from sales, returns, write-offs and transfers for last 7 days",
      dataContext:
        "Source: Wondersoft StockLedger\nFields: store_code, sku_code, txn_date, txn_type (SALE/RETURN/ADJ/TRANSFER), qty, reference_no",
      linkType: "data",
    },

    // --- PLM (CENTRIC) → PRODUCT LIFECYCLE / ATTRIBUTES ---

    {
      id: "ds_plm_styles",
      source: "plm",
      target: "product",
      type: "FEEDS",
      description: "PLM style master → Product",
      nlQuery:
        "List all upcoming styles for next season with category, brand and planned launch date",
      dataContext:
        "Source: PLM StyleMaster\nFields: style_id, style_code, brand, category, season, collection, status, launch_date",
      linkType: "data",
    },
    {
      id: "ds_plm_lifecycle",
      source: "plm",
      target: "product_lifecycle",
      type: "FEEDS",
      description: "PLM lifecycle & status → ProductLifecycle",
      nlQuery:
        "Show products that are in end-of-life stage but still have inventory on hand",
      dataContext:
        "Source: PLM Lifecycle\nFields: style_id, lifecycle_stage (NEW/MATURE/EOL), stage_start_date, stage_end_date, lifecycle_owner",
      linkType: "data",
    },
    {
      id: "ds_plm_attributes",
      source: "plm",
      target: "product_attribute",
      type: "FEEDS",
      description: "Design attributes → ProductAttribute",
      nlQuery:
        "For a given category, list products by key PLM attributes like fabric, fit, silhouette and occasion",
      dataContext:
        "Source: PLM Attributes\nFields: style_id, attribute_name, attribute_value, attribute_group (FABRIC/FIT/OCCASION/etc.)",
      linkType: "data",
    },

    // --- WMS → INVENTORY / TRANSFERS ---

    {
      id: "ds_wms_inventory",
      source: "wms",
      target: "inventory_level",
      type: "FEEDS",
      description: "DC stock by bin → InventoryLevel",
      nlQuery:
        "Show DC-wise stock by product, including reserved and available-to-ship quantity",
      dataContext:
        "Source: WMS OnHand\nFields: dc_code, sku_code, bin_id, on_hand_qty, reserved_qty, available_qty, batch_no, expiry_date",
      linkType: "data",
    },
    {
      id: "ds_wms_transfers",
      source: "wms",
      target: "stock_transfer",
      type: "FEEDS",
      description: "DC ↔ store stock transfers → StockTransfer",
      nlQuery:
        "List all inter-store and DC-to-store transfers for a given product in last 30 days",
      dataContext:
        "Source: WMS TransferHeader, TransferDetail\nFields: transfer_no, from_location, to_location, sku_code, qty, dispatch_date, receipt_date, status",
      linkType: "data",
    },
    {
      id: "ds_wms_movements",
      source: "wms",
      target: "inventory_movement",
      type: "FEEDS",
      description: "Detailed movements → InventoryMovement",
      nlQuery:
        "For a given DC, show inbound, outbound and adjustment quantities by day",
      dataContext:
        "Source: WMS Movement\nFields: dc_code, sku_code, txn_type (GRN/ISSUE/ADJ), txn_date, qty, reference_type, reference_no",
      linkType: "data",
    },

    // --- CRM → CUSTOMER / INTERACTIONS ---

    {
      id: "ds_crm_customers",
      source: "crm",
      target: "customer",
      type: "FEEDS",
      description: "CRM customer 360 → Customer",
      nlQuery:
        "For a given mobile number, fetch customer profile with basic demographics and consent flags",
      dataContext:
        "Source: CRM Customer\nFields: customer_id, mobile, email, name, dob, gender, city, consent_sms, consent_email, consent_whatsapp",
      linkType: "data",
    },
    {
      id: "ds_crm_interactions",
      source: "crm",
      target: "customer_interaction",
      type: "FEEDS",
      description:
        "Service tickets and store interactions → CustomerInteraction",
      nlQuery:
        "Show all service interactions for a customer in the last 6 months with channel and status",
      dataContext:
        "Source: CRM Interaction\nFields: interaction_id, customer_id, channel (CALL/STORE/EMAIL), type, created_at, closed_at, status, sentiment_score",
      linkType: "data",
    },

    // --- WEB ANALYTICS → SESSIONS / PAGEVIEWS / PRODUCTINTERACTION ---

    {
      id: "ds_web_sessions",
      source: "web_analytics",
      target: "web_session",
      type: "FEEDS",
      description: "GA4 sessions → WebSession",
      nlQuery:
        "Show web sessions, new vs returning users and bounce rate for last 7 days",
      dataContext:
        "Source: GA4 sessions export\nFields: session_id, user_pseudo_id, session_start, device_type, os, country, source_medium",
      linkType: "data",
    },
    {
      id: "ds_web_pageviews",
      source: "web_analytics",
      target: "page_view",
      type: "FEEDS",
      description: "GA4 page views → PageView",
      nlQuery:
        "Show top landing pages and their conversion to product detail page",
      dataContext:
        "Source: GA4 page_view events\nFields: session_id, page_location, page_referrer, event_timestamp, engagement_time_msec",
      linkType: "data",
    },
    {
      id: "ds_web_product_interactions",
      source: "web_analytics",
      target: "product_interaction",
      type: "FEEDS",
      description: "Product view/click events → ProductInteraction",
      nlQuery:
        "For a given product, show online views, add-to-cart and checkout starts in last 30 days",
      dataContext:
        "Source: GA4 view_item, add_to_cart, begin_checkout\nFields: session_id, sku_code, event_name, event_timestamp, quantity, value",
      linkType: "data",
    },

    // --- LOYALTY ENGINE → LOYALTYACCOUNT / LOYALTYTRANSACTION ---

    {
      id: "ds_loyalty_accounts",
      source: "loyalty_engine",
      target: "loyalty_account",
      type: "FEEDS",
      description: "Loyalty membership → LoyaltyAccount",
      nlQuery:
        "List loyalty members with their current tier, points balance and last earn/redeem date",
      dataContext:
        "Source: Loyalty MemberMaster\nFields: account_id, customer_id, tier, current_points, points_expiring, last_earn_date, last_redeem_date",
      linkType: "data",
    },
    {
      id: "ds_loyalty_txn",
      source: "loyalty_engine",
      target: "loyalty_transaction",
      type: "FEEDS",
      description: "Points earn/redeem → LoyaltyTransaction",
      nlQuery:
        "Show points earned and redeemed by a customer for a given period, split by channel",
      dataContext:
        "Source: Loyalty Transaction\nFields: transaction_id, account_id, txn_date, txn_type (EARN/REDEEM/ADJUST), points, channel, reference_doc",
      linkType: "data",
    },

    // --- MARKETING AUTOMATION → CAMPAIGN / EMAIL / PUSH ---

    {
      id: "ds_mkt_campaigns",
      source: "marketing_automation",
      target: "campaign",
      type: "FEEDS",
      description: "Campaign definitions → Campaign",
      nlQuery:
        "List active campaigns with objective, primary channel and targeted segments",
      dataContext:
        "Source: Marketing Campaigns\nFields: campaign_id, name, objective, primary_channel, start_date, end_date, status, target_segment_ids",
      linkType: "data",
    },
    {
      id: "ds_mkt_email_events",
      source: "marketing_automation",
      target: "email_campaign",
      type: "FEEDS",
      description: "Email sends/opens/clicks → EmailCampaign",
      nlQuery:
        "For a given campaign, show email send volume, open rate and click-through rate",
      dataContext:
        "Source: Email Events\nFields: email_id, campaign_id, customer_id, event_type (SENT/OPEN/CLICK/BOUNCE), event_time",
      linkType: "data",
    },
    {
      id: "ds_mkt_push_events",
      source: "marketing_automation",
      target: "push_notification",
      type: "FEEDS",
      description: "App push notifications → PushNotification",
      nlQuery:
        "Show push notification performance (sent, delivered, clicked) by template and segment",
      dataContext:
        "Source: Push Events\nFields: push_id, campaign_id, customer_id, template_id, event_type (SENT/DELIVERED/CLICK), event_time",
      linkType: "data",
    },

    // --- HRMS → EMPLOYEE / ROLE / PERFORMANCE ---

    {
      id: "ds_hrms_employees",
      source: "hrms",
      target: "employee",
      type: "FEEDS",
      description: "Employee master → Employee",
      nlQuery:
        "List store staff with role, joining date and current status for a given region",
      dataContext:
        "Source: HRMS EmployeeMaster\nFields: employee_id, name, store_code, role_code, join_date, exit_date, status",
      linkType: "data",
    },
    {
      id: "ds_hrms_roles",
      source: "hrms",
      target: "role",
      type: "FEEDS",
      description: "Role dictionary → Role",
      nlQuery:
        "Show standard role hierarchy (store associate, department manager, store manager, area manager etc.)",
      dataContext:
        "Source: HRMS RoleMaster\nFields: role_id, role_name, parent_role_id, grade, band",
      linkType: "data",
    },
    {
      id: "ds_hrms_performance",
      source: "hrms",
      target: "performance",
      type: "FEEDS",
      description: "Performance scores → Performance",
      nlQuery:
        "For a given store, list staff performance ratings for last appraisal cycle",
      dataContext:
        "Source: HRMS PerformanceReview\nFields: performance_id, employee_id, period_start, period_end, rating, reviewer_id",
      linkType: "data",
    },

    // --- EXTERNAL DATA LAKE → WEATHER / EVENTS / ECONOMICS / COMPETITION ---

    {
      id: "ds_ext_weather",
      source: "external_data_lake",
      target: "weather_data",
      type: "FEEDS",
      description: "Hourly/daily weather feed → WeatherData",
      nlQuery:
        "Show temperature and rainfall for all store locations for last 14 days",
      dataContext:
        "Source: Weather API ingest\nFields: store_code, date, hour, temperature_c, rainfall_mm, humidity, weather_code",
      linkType: "data",
    },
    {
      id: "ds_ext_events",
      source: "external_data_lake",
      target: "event",
      type: "FEEDS",
      description: "Holidays and local events → Event",
      nlQuery:
        "List national holidays and key regional events impacting each store over next 60 days",
      dataContext:
        "Source: Events feed\nFields: event_id, event_name, event_type (HOLIDAY/FESTIVAL/LOCAL_EVENT), start_date, end_date, region_codes, impact_flag",
      linkType: "data",
    },
    {
      id: "ds_ext_econ",
      source: "external_data_lake",
      target: "economic_indicator",
      type: "FEEDS",
      description: "Macro indicators → EconomicIndicator",
      nlQuery:
        "Show monthly CPI or consumer sentiment index for key regions where stores are present",
      dataContext:
        "Source: Govt/third-party macro feeds\nFields: indicator_id, indicator_name, geo_level, geo_code, period, value",
      linkType: "data",
    },
    {
      id: "ds_ext_competitor_prices",
      source: "external_data_lake",
      target: "competitor_price",
      type: "FEEDS",
      description: "Scraped/partner competitive prices → CompetitorPrice",
      nlQuery:
        "Compare our current selling price vs top 3 competitors for a given SKU or brand",
      dataContext:
        "Source: Competition price feed\nFields: competitor_id, competitor_name, sku_code, competitor_sku, price, collected_at, channel",
      linkType: "data",
    },
    // ========= PRODUCT RELATIONSHIPS =========
    {
      id: "r_has_variant",
      source: "product",
      target: "product_variant",
      type: "HAS_VARIANT",
      description: "Product has size/color/material variants",
      linkType: "bkg",
    },
    {
      id: "r_product_belongs_to_category",
      source: "product",
      target: "category",
      type: "BELONGS_TO_CATEGORY",
      description: "Product belongs to category",
      linkType: "bkg",
    },
    {
      id: "r_product_manufactured_by_brand",
      source: "product",
      target: "brand",
      type: "MANUFACTURED_BY",
      description: "Product manufactured by brand",
      linkType: "bkg",
    },
    {
      id: "r_product_has_price",
      source: "product",
      target: "product_price",
      type: "HAS_PRICE",
      description: "Product has list/sale/promotional prices",
      linkType: "bkg",
    },
    {
      id: "r_product_has_cost",
      source: "product",
      target: "product_cost",
      type: "HAS_COST",
      description: "Product has COGS and landed costs",
      linkType: "bkg",
    },
    {
      id: "r_product_has_attribute",
      source: "product",
      target: "product_attribute",
      type: "HAS_ATTRIBUTE",
      description: "Product has dynamic attributes",
      linkType: "bkg",
    },
    {
      id: "r_product_has_image",
      source: "product",
      target: "product_image",
      type: "HAS_IMAGE",
      description: "Product has images/media (is_primary flag)",
      linkType: "bkg",
    },
    {
      id: "r_product_substitute_for",
      source: "product",
      target: "product",
      type: "SUBSTITUTE_FOR",
      description: "Product can substitute for another (strength)",
      linkType: "bkg",
    },
    {
      id: "r_product_complement_to",
      source: "product",
      target: "product",
      type: "COMPLEMENT_TO",
      description: "Complementary product relationship (strength)",
      linkType: "bkg",
    },
    {
      id: "r_product_upsell_to",
      source: "product",
      target: "product",
      type: "UPSELL_TO",
      description: "Upsell path from lower to higher-value SKU",
      linkType: "bkg",
    },
    {
      id: "r_product_cross_sell_to",
      source: "product",
      target: "product",
      type: "CROSS_SELL_TO",
      description: "Cross-sell product relationship",
      linkType: "bkg",
    },
    {
      id: "r_category_child_of",
      source: "category",
      target: "category",
      type: "CHILD_OF",
      description: "Category hierarchy (parent-child)",
      linkType: "bkg",
    },
    {
      id: "r_category_belongs_to_department",
      source: "category",
      target: "department",
      type: "BELONGS_TO_DEPARTMENT",
      description: "Category belongs to department",
      linkType: "bkg",
    },
    {
      id: "r_product_part_of_bundle",
      source: "product",
      target: "product_bundle",
      type: "PART_OF_BUNDLE",
      description: "Product included in bundle with quantity",
      linkType: "bkg",
    },
    {
      id: "r_product_has_tag",
      source: "product",
      target: "product_tag",
      type: "HAS_TAG",
      description: "Product tagged with search metadata",
      linkType: "bkg",
    },
    {
      id: "r_product_has_barcode",
      source: "product",
      target: "barcode",
      type: "HAS_BARCODE",
      description: "Product mapped to UPC/EAN/GTIN codes",
      linkType: "bkg",
    },

    // ========= CUSTOMER RELATIONSHIPS =========
    {
      id: "r_customer_has_address",
      source: "customer",
      target: "customer_address",
      type: "HAS_ADDRESS",
      description: "Customer has shipping/billing addresses",
      linkType: "bkg",
    },
    {
      id: "r_customer_member_of_segment",
      source: "customer",
      target: "customer_segment",
      type: "MEMBER_OF_SEGMENT",
      description: "Customer belongs to segment (with since date)",
      linkType: "bkg",
    },
    {
      id: "r_customer_has_loyalty_account",
      source: "customer",
      target: "loyalty_account",
      type: "HAS_LOYALTY_ACCOUNT",
      description: "Customer has loyalty account",
      linkType: "bkg",
    },
    {
      id: "r_loyalty_account_enrolled_in_program",
      source: "loyalty_account",
      target: "loyalty_program",
      type: "ENROLLED_IN",
      description: "Loyalty account enrolled in program",
      linkType: "bkg",
    },
    {
      id: "r_customer_has_preference",
      source: "customer",
      target: "customer_preference",
      type: "HAS_PREFERENCE",
      description: "Customer communication/product preferences",
      linkType: "bkg",
    },
    {
      id: "r_customer_belongs_to_household",
      source: "customer",
      target: "household",
      type: "BELONGS_TO_HOUSEHOLD",
      description: "Customer grouped into household",
      linkType: "bkg",
    },
    {
      id: "r_customer_has_registry",
      source: "customer",
      target: "gift_registry",
      type: "HAS_REGISTRY",
      description: "Customer maintains gift/registry lists",
      linkType: "bkg",
    },
    {
      id: "r_customer_has_subscription",
      source: "customer",
      target: "subscription",
      type: "HAS_SUBSCRIPTION",
      description: "Customer has recurring subscription",
      linkType: "bkg",
    },
    {
      id: "r_customer_referred_by",
      source: "customer",
      target: "customer",
      type: "REFERRED_BY",
      description: "Customer referred by another customer",
      linkType: "bkg",
    },
    {
      id: "r_customer_interacted_with",
      source: "customer",
      target: "customer_interaction",
      type: "INTERACTED_WITH",
      description: "Customer-service or interaction records",
      linkType: "bkg",
    },

    // ========= TRANSACTION RELATIONSHIPS =========
    {
      id: "r_customer_placed_order",
      source: "customer",
      target: "order",
      type: "PLACED_ORDER",
      description: "Customer placed an order",
      linkType: "bkg",
    },
    {
      id: "r_order_contains_line",
      source: "order",
      target: "order_line",
      type: "CONTAINS_LINE",
      description: "Order contains line items",
      linkType: "bkg",
    },
    {
      id: "r_order_line_for_product",
      source: "order_line",
      target: "product",
      type: "FOR_PRODUCT",
      description: "Order line for specific product",
      linkType: "bkg",
    },
    {
      id: "r_order_line_for_variant",
      source: "order_line",
      target: "product_variant",
      type: "FOR_VARIANT",
      description: "Order line for specific variant",
      linkType: "bkg",
    },
    {
      id: "r_order_paid_with",
      source: "order",
      target: "payment",
      type: "PAID_WITH",
      description: "Order paid with payment transaction",
      linkType: "bkg",
    },
    {
      id: "r_order_has_refund",
      source: "order",
      target: "refund",
      type: "HAS_REFUND",
      description: "Order has refund transactions",
      linkType: "bkg",
    },
    {
      id: "r_order_has_return",
      source: "order",
      target: "return",
      type: "HAS_RETURN",
      description: "Order has return request",
      linkType: "bkg",
    },
    {
      id: "r_return_line_for_order_line",
      source: "return_line",
      target: "order_line",
      type: "RETURN_LINE_FOR",
      description: "Return line for original order line",
      linkType: "bkg",
    },
    {
      id: "r_order_through_channel",
      source: "order",
      target: "channel",
      type: "THROUGH_CHANNEL",
      description: "Order placed through sales channel",
      linkType: "bkg",
    },
    {
      id: "r_order_at_store",
      source: "order",
      target: "store",
      type: "AT_STORE",
      description: "Order transacted at store",
      linkType: "bkg",
    },
    {
      id: "r_order_processed_by_employee",
      source: "order",
      target: "employee",
      type: "PROCESSED_BY",
      description: "Order processed by staff",
      linkType: "bkg",
    },
    {
      id: "r_order_shipped_via_shipment",
      source: "order",
      target: "shipment",
      type: "SHIPPED_VIA",
      description: "Order fulfilled via shipment",
      linkType: "bkg",
    },
    {
      id: "r_order_used_coupon",
      source: "order",
      target: "coupon",
      type: "USED_COUPON",
      description: "Order used coupon",
      linkType: "bkg",
    },
    {
      id: "r_customer_has_cart",
      source: "customer",
      target: "cart",
      type: "HAS_CART",
      description: "Customer has active cart",
      linkType: "bkg",
    },
    {
      id: "r_cart_contains_item",
      source: "cart",
      target: "cart_item",
      type: "CART_CONTAINS",
      description: "Cart contains items",
      linkType: "bkg",
    },

    // ========= INVENTORY RELATIONSHIPS =========
    {
      id: "r_product_has_inventory",
      source: "product",
      target: "inventory_level",
      type: "HAS_INVENTORY",
      description: "Product has inventory levels by location",
      linkType: "bkg",
    },
    {
      id: "r_inventory_stored_at_warehouse",
      source: "inventory_level",
      target: "warehouse",
      type: "STORED_AT",
      description: "Inventory stored at warehouse",
      linkType: "bkg",
    },
    {
      id: "r_inventory_in_bin",
      source: "inventory_level",
      target: "bin_location",
      type: "IN_BIN",
      description: "Inventory stored in bin/shelf",
      linkType: "bkg",
    },
    {
      id: "r_bin_in_warehouse",
      source: "bin_location",
      target: "warehouse",
      type: "IN_WAREHOUSE",
      description: "Bin located within warehouse",
      linkType: "bkg",
    },
    {
      id: "r_allocation_from_inventory",
      source: "stock_allocation",
      target: "inventory_level",
      type: "ALLOCATED_FROM",
      description: "Allocation sourced from inventory level",
      linkType: "bkg",
    },
    {
      id: "r_allocation_to_order_line",
      source: "stock_allocation",
      target: "order_line",
      type: "ALLOCATED_TO",
      description: "Allocation reserved for order line",
      linkType: "bkg",
    },
    {
      id: "r_inventory_had_movement",
      source: "inventory_level",
      target: "inventory_movement",
      type: "HAD_MOVEMENT",
      description: "Inventory level has movement records",
      linkType: "bkg",
    },
    {
      id: "r_stock_transfer_from_warehouse",
      source: "stock_transfer",
      target: "warehouse",
      type: "TRANSFER_FROM",
      description: "Stock transfer source warehouse",
      linkType: "bkg",
    },
    {
      id: "r_stock_transfer_to_warehouse",
      source: "stock_transfer",
      target: "warehouse",
      type: "TRANSFER_TO",
      description: "Stock transfer destination warehouse",
      linkType: "bkg",
    },
    {
      id: "r_product_has_reorder_rule",
      source: "product",
      target: "reorder_rule",
      type: "HAS_REORDER_RULE",
      description: "Product linked to replenishment rule",
      linkType: "bkg",
    },

    // ========= SUPPLY CHAIN RELATIONSHIPS =========
    {
      id: "r_supplier_supplies_product",
      source: "supplier",
      target: "product",
      type: "SUPPLIES",
      description: "Supplier supplies product (unit_cost, landed_cost, moq)",
      linkType: "bkg",
    },
    {
      id: "r_supplier_has_contact",
      source: "supplier",
      target: "supplier_contact",
      type: "HAS_CONTACT",
      description: "Supplier contact details",
      linkType: "bkg",
    },
    {
      id: "r_purchase_order_ordered_from_supplier",
      source: "purchase_order",
      target: "supplier",
      type: "ORDERED_FROM",
      description: "PO ordered from supplier",
      linkType: "bkg",
    },
    {
      id: "r_purchase_order_delivered_to_warehouse",
      source: "purchase_order",
      target: "warehouse",
      type: "DELIVERED_TO",
      description: "PO delivered to warehouse",
      linkType: "bkg",
    },
    {
      id: "r_purchase_order_contains_line",
      source: "purchase_order",
      target: "purchase_order_line",
      type: "CONTAINS",
      description: "PO contains line items",
      linkType: "bkg",
    },
    {
      id: "r_po_line_for_product",
      source: "purchase_order_line",
      target: "product",
      type: "PO_LINE_FOR",
      description: "PO line for product",
      linkType: "bkg",
    },
    {
      id: "r_purchase_order_received_by_goods_receipt",
      source: "purchase_order",
      target: "goods_receipt",
      type: "RECEIVED_BY",
      description: "PO received via goods receipt",
      linkType: "bkg",
    },
    {
      id: "r_shipment_shipped_by_carrier",
      source: "shipment",
      target: "carrier",
      type: "SHIPPED_BY",
      description: "Shipment carried by carrier",
      linkType: "bkg",
    },
    {
      id: "r_shipment_shipped_from_warehouse",
      source: "shipment",
      target: "warehouse",
      type: "SHIPPED_FROM",
      description: "Shipment originates from warehouse",
      linkType: "bkg",
    },
    {
      id: "r_shipment_shipped_to_address",
      source: "shipment",
      target: "customer_address",
      type: "SHIPPED_TO",
      description: "Shipment delivered to customer address",
      linkType: "bkg",
    },
    {
      id: "r_shipment_has_tracking_event",
      source: "shipment",
      target: "tracking_event",
      type: "HAS_TRACKING",
      description: "Shipment tracking events",
      linkType: "bkg",
    },
    {
      id: "r_supplier_has_contract",
      source: "supplier",
      target: "supplier_contract",
      type: "HAS_CONTRACT",
      description: "Supplier contractual terms",
      linkType: "bkg",
    },
    {
      id: "r_supplier_has_scorecard",
      source: "supplier",
      target: "supplier_scorecard",
      type: "HAS_SCORECARD",
      description: "Supplier performance metrics",
      linkType: "bkg",
    },

    // ========= STORE RELATIONSHIPS =========
    {
      id: "r_store_in_region",
      source: "store",
      target: "region",
      type: "IN_REGION",
      description: "Store belongs to geographic region",
      linkType: "bkg",
    },
    {
      id: "r_store_in_district",
      source: "store",
      target: "district",
      type: "IN_DISTRICT",
      description: "Store belongs to district",
      linkType: "bkg",
    },
    {
      id: "r_store_has_zone",
      source: "store",
      target: "store_zone",
      type: "HAS_ZONE",
      description: "Store has internal zones/departments",
      linkType: "bkg",
    },
    {
      id: "r_store_zone_has_fixture",
      source: "store_zone",
      target: "fixture",
      type: "HAS_FIXTURE",
      description: "Store zone has fixtures",
      linkType: "bkg",
    },
    {
      id: "r_fixture_has_planogram",
      source: "fixture",
      target: "planogram",
      type: "HAS_PLANOGRAM",
      description: "Fixture has planogram layout",
      linkType: "bkg",
    },
    {
      id: "r_planogram_position_for_product",
      source: "planogram_position",
      target: "product",
      type: "POSITION_FOR",
      description: "Planogram position for product",
      linkType: "bkg",
    },
    {
      id: "r_store_has_terminal",
      source: "store",
      target: "pos_terminal",
      type: "HAS_TERMINAL",
      description: "Store has POS terminals",
      linkType: "bkg",
    },
    {
      id: "r_store_managed_by_employee",
      source: "store",
      target: "employee",
      type: "MANAGED_BY",
      description: "Store manager / responsible employee",
      linkType: "bkg",
    },
    {
      id: "r_employee_works_at_store",
      source: "employee",
      target: "store",
      type: "WORKS_AT",
      description: "Employee assigned to store",
      linkType: "bkg",
    },
    {
      id: "r_employee_has_role",
      source: "employee",
      target: "role",
      type: "HAS_ROLE",
      description: "Employee job role",
      linkType: "bkg",
    },
    {
      id: "r_employee_reports_to",
      source: "employee",
      target: "employee",
      type: "REPORTS_TO",
      description: "Reporting line between employees",
      linkType: "bkg",
    },
    {
      id: "r_employee_manages_region",
      source: "employee",
      target: "region",
      type: "MANAGES_REGION",
      description: "Employee manages region (RSM/ASM etc.)",
      linkType: "bkg",
    },
    {
      id: "r_store_carries_product",
      source: "store",
      target: "product",
      type: "CARRIES",
      description: "Store carries/assorts product",
      linkType: "bkg",
    },
    {
      id: "r_store_has_hours",
      source: "store",
      target: "store_hours",
      type: "HAS_HOURS",
      description: "Store operating hours",
      linkType: "bkg",
    },
    {
      id: "r_store_in_cluster",
      source: "store",
      target: "store_cluster",
      type: "IN_CLUSTER",
      description: "Store part of cluster",
      linkType: "bkg",
    },

    // ========= MARKETING RELATIONSHIPS =========
    {
      id: "r_campaign_includes_promotion",
      source: "campaign",
      target: "promotion",
      type: "INCLUDES_PROMOTION",
      description: "Campaign includes promotions",
      linkType: "bkg",
    },
    {
      id: "r_campaign_targets_segment",
      source: "campaign",
      target: "customer_segment",
      type: "TARGETS_SEGMENT",
      description: "Campaign targets customer segments",
      linkType: "bkg",
    },
    {
      id: "r_promotion_applies_to_category",
      source: "promotion",
      target: "category",
      type: "APPLIES_TO_CATEGORY",
      description: "Promotion applies to product categories",
      linkType: "bkg",
    },
    {
      id: "r_promotion_applies_to_product",
      source: "promotion",
      target: "product",
      type: "APPLIES_TO_PRODUCT",
      description: "Promotion applies to specific products",
      linkType: "bkg",
    },
    {
      id: "r_coupon_for_promotion",
      source: "coupon",
      target: "promotion",
      type: "FOR_PROMOTION",
      description: "Coupon associated with promotion",
      linkType: "bkg",
    },
    {
      id: "r_customer_redeemed_coupon",
      source: "customer",
      target: "coupon_redemption",
      type: "REDEEMED_COUPON",
      description: "Customer coupon redemption event",
      linkType: "bkg",
    },
    {
      id: "r_order_attributed_to",
      source: "order",
      target: "attribution",
      type: "ATTRIBUTED_TO",
      description: "Order attributed to marketing touchpoints",
      linkType: "bkg",
    },
    {
      id: "r_campaign_has_creative",
      source: "campaign",
      target: "creative",
      type: "HAS_CREATIVE",
      description: "Campaign uses creatives",
      linkType: "bkg",
    },
    {
      id: "r_campaign_targets_audience",
      source: "campaign",
      target: "audience",
      type: "TARGETS_AUDIENCE",
      description: "Campaign targets audience cohorts",
      linkType: "bkg",
    },
    {
      id: "r_campaign_has_ab_test",
      source: "campaign",
      target: "ab_test",
      type: "HAS_AB_TEST",
      description: "Campaign includes A/B tests",
      linkType: "bkg",
    },

    // ========= DIGITAL COMMERCE RELATIONSHIPS =========
    {
      id: "r_customer_had_session",
      source: "customer",
      target: "web_session",
      type: "HAD_SESSION",
      description: "Customer web session",
      linkType: "bkg",
    },
    {
      id: "r_session_on_channel",
      source: "web_session",
      target: "channel",
      type: "ON_CHANNEL",
      description: "Session occurred on channel (web/app etc.)",
      linkType: "bkg",
    },
    {
      id: "r_session_had_pageview",
      source: "web_session",
      target: "page_view",
      type: "HAD_PAGEVIEW",
      description: "Session generated page views",
      linkType: "bkg",
    },
    {
      id: "r_session_had_interaction",
      source: "web_session",
      target: "product_interaction",
      type: "HAD_INTERACTION",
      description: "Session had product interactions",
      linkType: "bkg",
    },
    {
      id: "r_product_interaction_with_product",
      source: "product_interaction",
      target: "product",
      type: "WITH_PRODUCT",
      description: "Interaction with specific product",
      linkType: "bkg",
    },
    {
      id: "r_session_had_search",
      source: "web_session",
      target: "search_query",
      type: "HAD_SEARCH",
      description: "Session had site search queries",
      linkType: "bkg",
    },
    {
      id: "r_customer_wrote_review",
      source: "customer",
      target: "review",
      type: "WROTE_REVIEW",
      description: "Customer wrote product review",
      linkType: "bkg",
    },
    {
      id: "r_review_for_product",
      source: "review",
      target: "product",
      type: "FOR_PRODUCT",
      description: "Review for specific product",
      linkType: "bkg",
    },
    {
      id: "r_review_for_order",
      source: "review",
      target: "order",
      type: "FOR_ORDER",
      description: "Review referencing order",
      linkType: "bkg",
    },
    {
      id: "r_review_has_response",
      source: "review",
      target: "review_response",
      type: "HAS_RESPONSE",
      description: "Review has response",
      linkType: "bkg",
    },
    {
      id: "r_customer_asked_question",
      source: "customer",
      target: "question",
      type: "ASKED_QUESTION",
      description: "Customer asked product question",
      linkType: "bkg",
    },
    {
      id: "r_question_has_answer",
      source: "question",
      target: "answer",
      type: "HAS_ANSWER",
      description: "Question has answers",
      linkType: "bkg",
    },
    {
      id: "r_customer_has_wishlist",
      source: "customer",
      target: "wishlist",
      type: "HAS_WISHLIST",
      description: "Customer has wishlist",
      linkType: "bkg",
    },
    {
      id: "r_product_on_wishlist",
      source: "product",
      target: "wishlist",
      type: "ON_WISHLIST",
      description: "Product present in wishlist",
      linkType: "bkg",
    },

    // ========= ANALYTICS RELATIONSHIPS =========
    {
      id: "r_kpi_has_value",
      source: "kpi",
      target: "kpi_value",
      type: "HAS_VALUE",
      description: "KPI has time-series values",
      linkType: "bkg",
    },
    {
      id: "r_forecast_for_product",
      source: "forecast",
      target: "product",
      type: "FORECASTS",
      description: "Forecast for product demand/revenue",
      linkType: "bkg",
    },
    {
      id: "r_forecast_for_store",
      source: "forecast",
      target: "store",
      type: "FORECASTS",
      description: "Forecast for store demand/revenue",
      linkType: "bkg",
    },
    {
      id: "r_anomaly_detected_for_product",
      source: "anomaly",
      target: "product",
      type: "DETECTED_FOR",
      description: "Anomaly detected for product metrics",
      linkType: "bkg",
    },
    {
      id: "r_anomaly_detected_for_store",
      source: "anomaly",
      target: "store",
      type: "DETECTED_FOR",
      description: "Anomaly detected for store metrics",
      linkType: "bkg",
    },
    {
      id: "r_anomaly_triggered_alert",
      source: "anomaly",
      target: "alert",
      type: "TRIGGERED_ALERT",
      description: "Anomaly triggered alert",
      linkType: "bkg",
    },
    {
      id: "r_kpi_has_benchmark",
      source: "kpi",
      target: "benchmark",
      type: "HAS_BENCHMARK",
      description: "KPI mapped to benchmarks",
      linkType: "bkg",
    },

    // ========= CROSS-DOMAIN RELATIONSHIPS =========
    {
      id: "r_customer_purchased_product",
      source: "customer",
      target: "product",
      type: "PURCHASED",
      description:
        "Aggregated purchase stats (order_count, total_spent, last_purchase)",
      linkType: "bkg",
    },
    {
      id: "r_customer_viewed_product",
      source: "customer",
      target: "product",
      type: "VIEWED",
      description: "Aggregated product view stats",
      linkType: "bkg",
    },
    {
      id: "r_customer_wishlisted_product",
      source: "customer",
      target: "product",
      type: "WISHLISTED",
      description: "Customer wishlisted product",
      linkType: "bkg",
    },
    {
      id: "r_customer_reviewed_product",
      source: "customer",
      target: "product",
      type: "REVIEWED",
      description: "Customer reviewed product",
      linkType: "bkg",
    },
    {
      id: "r_weather_for_location_store",
      source: "weather_data",
      target: "store",
      type: "FOR_LOCATION",
      description: "Weather data for store location",
      linkType: "bkg",
    },
    {
      id: "r_event_affects_store",
      source: "event",
      target: "store",
      type: "AFFECTS",
      description: "Holiday/event affects store trade",
      linkType: "bkg",
    },
    {
      id: "r_competitor_competes_with_brand",
      source: "competitor",
      target: "brand",
      type: "COMPETES_WITH",
      description: "Competitor competes with brand",
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

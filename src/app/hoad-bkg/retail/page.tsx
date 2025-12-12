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
    // ---------- PRODUCT DOMAIN ----------
    {
      id: "product",
      name: "Product",
      description: "Core product entity with SKU / UPC / status",
      size: 24,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_variant",
      name: "ProductVariant",
      description: "Size/color/material variations of a product",
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
      description: "Product brands / labels",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "department",
      name: "Department",
      description: "Top-level merchandise grouping",
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
      description: "Dynamic attributes (fabric, fit, color, pattern, etc.)",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_image",
      name: "ProductImage",
      description: "Product media assets (images)",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_bundle",
      name: "ProductBundle",
      description: "Kitted / bundled products",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_tag",
      name: "ProductTag",
      description: "Searchable tags for merchandising and search",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "barcode",
      name: "Barcode",
      description: "UPC / EAN / GTIN codes linked to products",
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
      description: "Regulatory / compliance attributes",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },

    // ---------- CUSTOMER DOMAIN ----------
    {
      id: "customer",
      name: "Customer",
      description: "Core customer profile",
      size: 24,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "customer_address",
      name: "CustomerAddress",
      description: "Customer billing / shipping addresses",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "customer_segment",
      name: "CustomerSegment",
      description: "Customer segments (internal / behavioural)",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },

    // ---------- TRANSACTION DOMAIN ----------
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
      description: "Line items within an order",
      size: 18,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "payment",
      name: "Payment",
      description: "Payment / tender details",
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
      description: "Return / exchange document",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "return_line",
      name: "ReturnLine",
      description: "Line items within a return",
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
      description: "Line items in a shopping cart",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "invoice",
      name: "Invoice",
      description: "Accounting invoice generated for order",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "receipt",
      name: "Receipt",
      description: "Receipt / proof of purchase",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },

    // ---------- INVENTORY DOMAIN ----------
    {
      id: "inventory_level",
      name: "InventoryLevel",
      description: "On-hand stock level by location",
      size: 24,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_movement",
      name: "InventoryMovement",
      description: "Stock movements (sale, GRN, transfer, adjustment)",
      size: 16,
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
      description: "Distribution center / warehouse",
      size: 18,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_count",
      name: "InventoryCount",
      description: "Cycle counts / physical stock counts",
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
      description: "Min/max and replenishment rules",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "safety_stock",
      name: "SafetyStock",
      description: "Safety stock levels by SKU-location",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_snapshot",
      name: "InventorySnapshot",
      description: "Point-in-time snapshot of inventory position",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "stock_transfer",
      name: "StockTransfer",
      description: "Store-to-store / DC-to-store stock transfers",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },

    // ---------- STORE OPERATIONS DOMAIN ----------
    {
      id: "store",
      name: "Store",
      description: "Physical retail store",
      size: 24,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "store_zone",
      name: "StoreZone",
      description: "Zones / areas inside the store",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "region",
      name: "Region",
      description: "Geographic region for stores",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "district",
      name: "District",
      description: "Store district / territory",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },

    // ---------- MARKETING DOMAIN (NO CAMPAIGN / CHANNEL / ATTRIBUTION) ----------
    {
      id: "promotion",
      name: "Promotion",
      description: "Offers and markdowns",
      size: 16,
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
      description: "Coupon redemption events",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },

    // ---------- EMPLOYEE DOMAIN (CORE ONLY) ----------
    {
      id: "employee",
      name: "Employee",
      description: "Employee / staff member",
      size: 18,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "role",
      name: "Role",
      description: "Job role for an employee",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },

    // ---------- DATA SOURCES ----------
    {
      id: "sap_hana",
      name: "SAP HANA",
      description: "Core ERP: product, inventory, store master",
      width: 160,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "wondersoft_pos",
      name: "Wondersoft POS",
      description: "Store POS: bills, tenders, returns, line items",
      width: 180,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "plm",
      name: "PLM (Centric)",
      description: "Product lifecycle & design attributes",
      width: 180,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "wms",
      name: "WMS",
      description: "Warehouse Management System (DC stock & transfers)",
      width: 180,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "crm",
      name: "CRM",
      description: "Customer 360 and service interactions",
      width: 170,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
    {
      id: "hrms",
      name: "HRMS",
      description: "Employee master and roles",
      width: 160,
      height: 50,
      size: 0,
      color: "#0F172A",
      type: "source",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    // ---------- PRODUCT ----------
    {
      id: "product_has_variant",
      source: "product",
      target: "product_variant",
      type: "HAS_VARIANT",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_belongs_to_category",
      source: "product",
      target: "category",
      type: "BELONGS_TO_CATEGORY",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_manufactured_by_brand",
      source: "product",
      target: "brand",
      type: "MANUFACTURED_BY",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_has_price",
      source: "product",
      target: "product_price",
      type: "HAS_PRICE",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_has_cost",
      source: "product",
      target: "product_cost",
      type: "HAS_COST",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_has_attribute",
      source: "product",
      target: "product_attribute",
      type: "HAS_ATTRIBUTE",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_has_image",
      source: "product",
      target: "product_image",
      type: "HAS_IMAGE",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_substitute_for",
      source: "product",
      target: "product",
      type: "SUBSTITUTE_FOR",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_complement_to",
      source: "product",
      target: "product",
      type: "COMPLEMENT_TO",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_upsell_to",
      source: "product",
      target: "product",
      type: "UPSELL_TO",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_cross_sell_to",
      source: "product",
      target: "product",
      type: "CROSS_SELL_TO",
      description: "",
      linkType: "bkg",
    },
    {
      id: "category_child_of",
      source: "category",
      target: "category",
      type: "CHILD_OF",
      description: "",
      linkType: "bkg",
    },
    {
      id: "category_belongs_to_department",
      source: "category",
      target: "department",
      type: "BELONGS_TO_DEPARTMENT",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_part_of_bundle",
      source: "product",
      target: "product_bundle",
      type: "PART_OF_BUNDLE",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_has_tag",
      source: "product",
      target: "product_tag",
      type: "HAS_TAG",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_has_barcode",
      source: "product",
      target: "barcode",
      type: "HAS_BARCODE",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_has_lifecycle",
      source: "product",
      target: "product_lifecycle",
      type: "HAS_LIFECYCLE",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_has_compliance",
      source: "product",
      target: "product_compliance",
      type: "HAS_COMPLIANCE",
      description: "",
      linkType: "bkg",
    },

    // ---------- CUSTOMER ----------
    {
      id: "customer_has_address",
      source: "customer",
      target: "customer_address",
      type: "HAS_ADDRESS",
      description: "",
      linkType: "bkg",
    },
    {
      id: "customer_member_of_segment",
      source: "customer",
      target: "customer_segment",
      type: "MEMBER_OF_SEGMENT",
      description: "",
      linkType: "bkg",
    },
    {
      id: "customer_referred_by",
      source: "customer",
      target: "customer",
      type: "REFERRED_BY",
      description: "",
      linkType: "bkg",
    },

    // ---------- TRANSACTIONS ----------
    {
      id: "customer_placed_order",
      source: "customer",
      target: "order",
      type: "PLACED_ORDER",
      description: "",
      linkType: "bkg",
    },
    {
      id: "order_contains_line",
      source: "order",
      target: "order_line",
      type: "CONTAINS_LINE",
      description: "",
      linkType: "bkg",
    },
    {
      id: "orderline_for_product",
      source: "order_line",
      target: "product",
      type: "FOR_PRODUCT",
      description: "",
      linkType: "bkg",
    },
    {
      id: "orderline_for_variant",
      source: "order_line",
      target: "product_variant",
      type: "FOR_VARIANT",
      description: "",
      linkType: "bkg",
    },
    {
      id: "order_paid_with",
      source: "order",
      target: "payment",
      type: "PAID_WITH",
      description: "",
      linkType: "bkg",
    },
    {
      id: "order_has_refund",
      source: "order",
      target: "refund",
      type: "HAS_REFUND",
      description: "",
      linkType: "bkg",
    },
    {
      id: "order_has_return",
      source: "order",
      target: "return",
      type: "HAS_RETURN",
      description: "",
      linkType: "bkg",
    },
    {
      id: "returnline_for_orderline",
      source: "return_line",
      target: "order_line",
      type: "RETURN_LINE_FOR",
      description: "",
      linkType: "bkg",
    },
    {
      id: "order_at_store",
      source: "order",
      target: "store",
      type: "AT_STORE",
      description: "",
      linkType: "bkg",
    },
    {
      id: "order_processed_by",
      source: "order",
      target: "employee",
      type: "PROCESSED_BY",
      description: "",
      linkType: "bkg",
    },
    {
      id: "order_used_coupon",
      source: "order",
      target: "coupon",
      type: "USED_COUPON",
      description: "",
      linkType: "bkg",
    },
    {
      id: "customer_has_cart",
      source: "customer",
      target: "cart",
      type: "HAS_CART",
      description: "",
      linkType: "bkg",
    },
    {
      id: "cart_contains_item",
      source: "cart",
      target: "cart_item",
      type: "CART_CONTAINS",
      description: "",
      linkType: "bkg",
    },
    {
      id: "invoice_for_order",
      source: "invoice",
      target: "order",
      type: "INVOICE_FOR",
      description: "",
      linkType: "bkg",
    },

    // ---------- INVENTORY ----------
    {
      id: "product_has_inventory",
      source: "product",
      target: "inventory_level",
      type: "HAS_INVENTORY",
      description: "",
      linkType: "bkg",
    },
    {
      id: "inventory_stored_at_warehouse",
      source: "inventory_level",
      target: "warehouse",
      type: "STORED_AT",
      description: "",
      linkType: "bkg",
    },
    {
      id: "allocation_from_inventory",
      source: "stock_allocation",
      target: "inventory_level",
      type: "ALLOCATED_FROM",
      description: "",
      linkType: "bkg",
    },
    {
      id: "allocation_to_orderline",
      source: "stock_allocation",
      target: "order_line",
      type: "ALLOCATED_TO",
      description: "",
      linkType: "bkg",
    },
    {
      id: "inventory_had_movement",
      source: "inventory_level",
      target: "inventory_movement",
      type: "HAD_MOVEMENT",
      description: "",
      linkType: "bkg",
    },
    {
      id: "stocktransfer_from_warehouse",
      source: "stock_transfer",
      target: "warehouse",
      type: "TRANSFER_FROM",
      description: "",
      linkType: "bkg",
    },
    {
      id: "stocktransfer_to_warehouse",
      source: "stock_transfer",
      target: "warehouse",
      type: "TRANSFER_TO",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_has_reorder_rule",
      source: "product",
      target: "reorder_rule",
      type: "HAS_REORDER_RULE",
      description: "",
      linkType: "bkg",
    },
    {
      id: "product_has_safety_stock",
      source: "product",
      target: "safety_stock",
      type: "HAS_SAFETY_STOCK",
      description: "",
      linkType: "bkg",
    },
    {
      id: "inventory_has_snapshot",
      source: "inventory_level",
      target: "inventory_snapshot",
      type: "HAS_SNAPSHOT",
      description: "",
      linkType: "bkg",
    },

    // ---------- STORE ----------
    {
      id: "store_in_region",
      source: "store",
      target: "region",
      type: "IN_REGION",
      description: "",
      linkType: "bkg",
    },
    {
      id: "store_in_district",
      source: "store",
      target: "district",
      type: "IN_DISTRICT",
      description: "",
      linkType: "bkg",
    },
    {
      id: "store_has_zone",
      source: "store",
      target: "store_zone",
      type: "HAS_ZONE",
      description: "",
      linkType: "bkg",
    },
    {
      id: "store_managed_by_employee",
      source: "store",
      target: "employee",
      type: "MANAGED_BY",
      description: "",
      linkType: "bkg",
    },
    {
      id: "employee_works_at_store",
      source: "employee",
      target: "store",
      type: "WORKS_AT",
      description: "",
      linkType: "bkg",
    },
    {
      id: "employee_has_role",
      source: "employee",
      target: "role",
      type: "HAS_ROLE",
      description: "",
      linkType: "bkg",
    },
    {
      id: "employee_reports_to",
      source: "employee",
      target: "employee",
      type: "REPORTS_TO",
      description: "",
      linkType: "bkg",
    },
    {
      id: "employee_manages_region",
      source: "employee",
      target: "region",
      type: "MANAGES_REGION",
      description: "",
      linkType: "bkg",
    },
    {
      id: "store_carries_product",
      source: "store",
      target: "product",
      type: "CARRIES",
      description: "",
      linkType: "bkg",
    },

    // ---------- MARKETING ----------
    {
      id: "promotion_applies_to_category",
      source: "promotion",
      target: "category",
      type: "APPLIES_TO_CATEGORY",
      description: "",
      linkType: "bkg",
    },
    {
      id: "promotion_applies_to_product",
      source: "promotion",
      target: "product",
      type: "APPLIES_TO_PRODUCT",
      description: "",
      linkType: "bkg",
    },
    {
      id: "coupon_for_promotion",
      source: "coupon",
      target: "promotion",
      type: "FOR_PROMOTION",
      description: "",
      linkType: "bkg",
    },
    {
      id: "customer_redeemed_coupon",
      source: "customer",
      target: "coupon_redemption",
      type: "REDEEMED_COUPON",
      description: "",
      linkType: "bkg",
    },

    // ---------- CROSS-DOMAIN FACTS ----------
    {
      id: "customer_purchased_product",
      source: "customer",
      target: "product",
      type: "PURCHASED",
      description: "",
      linkType: "bkg",
    },

    // ---------- DATA SOURCE LINKS ----------
    {
      id: "ds_sap_products",
      source: "sap_hana",
      target: "product",
      type: "FEEDS",
      description: "",
      nlQuery:
        "List all active products with brand, category and base unit of measure",
      dataContext:
        "Source: SAP HANA MARA, MVKE; Fields: matnr, mtart, matkl, brand_code, base_uom, status",
      linkType: "data",
    },
    {
      id: "ds_sap_inventory",
      source: "sap_hana",
      target: "inventory_level",
      type: "FEEDS",
      description: "",
      nlQuery:
        "Show current on-hand, in-transit and reserved inventory for a given product across all locations",
      dataContext:
        "Source: SAP HANA MARD; Fields: matnr, werks, labst, insme, umlme",
      linkType: "data",
    },
    {
      id: "ds_sap_store",
      source: "sap_hana",
      target: "store",
      type: "FEEDS",
      description: "",
      nlQuery: "List all active stores with region, district and opening date",
      dataContext:
        "Source: SAP HANA T001W; Fields: werks, name1, region, district, city, format, opening_date, closing_date",
      linkType: "data",
    },

    {
      id: "ds_pos_orders",
      source: "wondersoft_pos",
      target: "order",
      type: "FEEDS",
      description: "",
      nlQuery:
        "Show yesterday's store-wise sales, average bill value and bill count",
      dataContext:
        "Source: Wondersoft BillHeader; Fields: bill_no, bill_date, store_code, customer_id, gross_amount, discount_amount, net_amount, payment_mode, cashier_id",
      linkType: "data",
    },
    {
      id: "ds_pos_order_lines",
      source: "wondersoft_pos",
      target: "order_line",
      type: "FEEDS",
      description: "",
      nlQuery:
        "For a given product, show quantity and net sales by store for the last 30 days",
      dataContext:
        "Source: Wondersoft BillDetail; Fields: bill_no, line_no, sku_code, qty, mrp, selling_price, discount_amount, tax_amount, net_amount",
      linkType: "data",
    },
    {
      id: "ds_pos_receipts",
      source: "wondersoft_pos",
      target: "receipt",
      type: "FEEDS",
      description: "",
      nlQuery:
        "List all receipts for a store and date range, including payment split by tender type",
      dataContext:
        "Source: Wondersoft TenderSummary; Fields: bill_no, store_code, bill_date, tender_type, tender_amount, reference_no",
      linkType: "data",
    },
    {
      id: "ds_pos_returns",
      source: "wondersoft_pos",
      target: "return",
      type: "FEEDS",
      description: "",
      nlQuery:
        "Show return rate (quantity and value) by product and store for last 90 days",
      dataContext:
        "Source: Wondersoft ReturnHeader, ReturnDetail; Fields: return_no, bill_no, store_code, return_date, sku_code, return_qty, return_amount, reason_code",
      linkType: "data",
    },
    {
      id: "ds_pos_inventory_movements",
      source: "wondersoft_pos",
      target: "inventory_movement",
      type: "FEEDS",
      description: "",
      nlQuery:
        "For a given store, list stock movements from sales, returns, write-offs and transfers for last 7 days",
      dataContext:
        "Source: Wondersoft StockLedger; Fields: store_code, sku_code, txn_date, txn_type, qty, reference_no",
      linkType: "data",
    },

    {
      id: "ds_plm_styles",
      source: "plm",
      target: "product",
      type: "FEEDS",
      description: "",
      nlQuery:
        "List upcoming styles for next season with category, brand and planned launch date",
      dataContext:
        "Source: PLM StyleMaster; Fields: style_id, style_code, brand, category, season, collection, status, launch_date",
      linkType: "data",
    },
    {
      id: "ds_plm_lifecycle",
      source: "plm",
      target: "product_lifecycle",
      type: "FEEDS",
      description: "",
      nlQuery:
        "Show products in end-of-life stage that still have inventory on hand",
      dataContext:
        "Source: PLM Lifecycle; Fields: style_id, lifecycle_stage, stage_start_date, stage_end_date, lifecycle_owner",
      linkType: "data",
    },
    {
      id: "ds_plm_attributes",
      source: "plm",
      target: "product_attribute",
      type: "FEEDS",
      description: "",
      nlQuery:
        "For a category, list products by PLM attributes like fabric, fit and occasion",
      dataContext:
        "Source: PLM Attributes; Fields: style_id, attribute_name, attribute_value, attribute_group",
      linkType: "data",
    },

    {
      id: "ds_wms_inventory",
      source: "wms",
      target: "inventory_level",
      type: "FEEDS",
      description: "",
      nlQuery:
        "Show DC-wise stock by product, including reserved and available-to-ship quantity",
      dataContext:
        "Source: WMS OnHand; Fields: dc_code, sku_code, bin_id, on_hand_qty, reserved_qty, available_qty, batch_no, expiry_date",
      linkType: "data",
    },
    {
      id: "ds_wms_transfers",
      source: "wms",
      target: "stock_transfer",
      type: "FEEDS",
      description: "",
      nlQuery:
        "List inter-store and DC-to-store transfers for a product in last 30 days",
      dataContext:
        "Source: WMS TransferHeader, TransferDetail; Fields: transfer_no, from_location, to_location, sku_code, qty, dispatch_date, receipt_date, status",
      linkType: "data",
    },
    {
      id: "ds_wms_movements",
      source: "wms",
      target: "inventory_movement",
      type: "FEEDS",
      description: "",
      nlQuery:
        "For a DC, show inbound, outbound and adjustment quantities by day",
      dataContext:
        "Source: WMS Movement; Fields: dc_code, sku_code, txn_type, txn_date, qty, reference_type, reference_no",
      linkType: "data",
    },

    {
      id: "ds_crm_customers",
      source: "crm",
      target: "customer",
      type: "FEEDS",
      description: "",
      nlQuery:
        "For a mobile number, fetch customer profile with demographics and consents",
      dataContext:
        "Source: CRM Customer; Fields: customer_id, mobile, email, name, dob, gender, city, consent_sms, consent_email, consent_whatsapp",
      linkType: "data",
    },

    {
      id: "ds_hrms_employees",
      source: "hrms",
      target: "employee",
      type: "FEEDS",
      description: "",
      nlQuery:
        "List store staff with role, joining date and current status for a region",
      dataContext:
        "Source: HRMS EmployeeMaster; Fields: employee_id, name, store_code, role_code, join_date, exit_date, status",
      linkType: "data",
    },
    {
      id: "ds_hrms_roles",
      source: "hrms",
      target: "role",
      type: "FEEDS",
      description: "",
      nlQuery:
        "Show the standard role hierarchy (store associate, manager, area manager etc.)",
      dataContext:
        "Source: HRMS RoleMaster; Fields: role_id, role_name, parent_role_id, grade, band",
      linkType: "data",
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

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
    // ---------- PRODUCT & PACK DOMAIN (Indigo) ----------
    {
      id: "product",
      name: "Product",
      description:
        "Core product/SKU in the portfolio (linked to brand, category, pack, price)",
      size: 24,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "brand",
      name: "Brand",
      description: "Brand/label under the company portfolio",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "category",
      name: "Category",
      description: "Product category for assortment and reporting",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "pack",
      name: "Pack",
      description: "Pack definition (size, units, configuration) for a SKU",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "price_list",
      name: "PriceList",
      description:
        "Trade/consumer price list (MRP, net distributor price, off-invoice etc.)",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_attribute",
      name: "ProductAttribute",
      description:
        "Additional attributes (flavour, fragrance, pack type, etc.)",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_lifecycle",
      name: "ProductLifecycle",
      description: "Lifecycle stage (launch, grow, core, decline, tail)",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },

    // ---------- ORG, GEO & CHANNEL DOMAIN (Purple) ----------
    {
      id: "company",
      name: "Company",
      description: "FMCG/consumer goods company entity",
      size: 24,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "business_unit",
      name: "BusinessUnit",
      description: "Business unit/category group (e.g. Foods, Beverages)",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "region",
      name: "Region",
      description: "Sales region (e.g. North, South, West)",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "zone",
      name: "Zone",
      description: "Sub-region/zone under a region",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "territory",
      name: "Territory",
      description: "Sales territory / group of towns and outlets",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "channel",
      name: "Channel",
      description:
        "Route-to-market channel (GT, MT, Wholesale, HoReCa, Ecom, etc.)",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "route",
      name: "Route",
      description: "Permanent beat/route covering outlets on specific days",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "route_plan",
      name: "RoutePlan",
      description: "Planned sequence/coverage plan for a route and day",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },

    // ---------- CUSTOMER & RTM DOMAIN (Pink) ----------
    {
      id: "customer",
      name: "Customer",
      description:
        "Generic B2B customer entity (distributor, outlet, MT, etc.)",
      size: 24,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "distributor",
      name: "Distributor",
      description: "Primary sales partner/distributor receiving primary sales",
      size: 24,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "distributor_warehouse",
      name: "DistributorWarehouse",
      description: "Distributor warehouse/godown where stock is held",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "sub_distributor",
      name: "SubDistributor",
      description: "Sub-distributor operating under a primary distributor",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "wholesaler",
      name: "Wholesaler",
      description: "Wholesale customer buying in bulk",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "retail_outlet",
      name: "RetailOutlet",
      description:
        "Retail outlet (kirana, pharmacy, etc.) selling to end consumers",
      size: 24,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "modern_trade_account",
      name: "ModernTradeAccount",
      description: "Modern trade key account (retail chain HQ)",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "modern_trade_store",
      name: "ModernTradeStore",
      description: "Modern trade store belonging to a key account",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "horeca_account",
      name: "HoReCaAccount",
      description:
        "HoReCa / institutional customer (hotels, restaurants, cafés)",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "outlet_segment",
      name: "OutletSegment",
      description:
        "Outlet segment/class (A/B/C, chemist, grocer, modern trade, etc.)",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "outlet_cluster",
      name: "OutletCluster",
      description:
        "Outlet clusters (urban/rural, LSM clusters, strategic outlet groups)",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },

    // ---------- TIME DOMAIN (Neutral Grey) ----------
    {
      id: "calendar_date",
      name: "CalendarDate",
      description: "Calendar date dimension across sales, visits, inventory",
      size: 18,
      color: "#64748B",
      type: "bkg",
    },

    // ---------- TRANSACTION DOMAIN (Emerald) ----------
    {
      id: "primary_sale",
      name: "PrimarySale",
      description: "Primary sale from company/plant/depot to distributor",
      size: 24,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "primary_sale_line",
      name: "PrimarySaleLine",
      description: "Line item within a primary sale (SKU/pack, qty, price)",
      size: 18,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "secondary_sale",
      name: "SecondarySale",
      description:
        "Secondary sale from distributor to outlet/wholesaler/modern trade",
      size: 24,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "secondary_sale_line",
      name: "SecondarySaleLine",
      description: "Line item within a secondary sale",
      size: 18,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "return_doc",
      name: "Return",
      description: "Return document (typically secondary returns from outlets)",
      size: 18,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "claim",
      name: "Claim",
      description: "Trade claim raised by distributor/key account",
      size: 18,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "claim_type",
      name: "ClaimType",
      description: "Type of claim (scheme, price support, damage, etc.)",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },

    // ---------- INVENTORY DOMAIN (Green) ----------
    {
      id: "depot_inventory_snapshot",
      name: "DepotInventorySnapshot",
      description:
        "Inventory snapshot at company depot by product/pack and date",
      size: 18,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "distributor_inventory_snapshot",
      name: "DistributorInventorySnapshot",
      description:
        "Inventory snapshot at distributor warehouse by product/pack and date",
      size: 18,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_batch",
      name: "InventoryBatch",
      description: "Batch/lot with MFG/EXP tied to product and pack",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },

    // ---------- SUPPLY CHAIN & LOGISTICS DOMAIN (Sky) ----------
    {
      id: "plant",
      name: "Plant",
      description: "Manufacturing plant producing finished goods",
      size: 18,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "depot",
      name: "Depot",
      description: "Company depot / mother warehouse",
      size: 18,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "shipment",
      name: "Shipment",
      description: "Shipment from plant/depot to distributor or other node",
      size: 18,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "shipment_line",
      name: "ShipmentLine",
      description: "Line item within a shipment (SKU/pack, qty)",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "delivery_trip",
      name: "DeliveryTrip",
      description: "Vehicle trip performing deliveries for a route/day",
      size: 18,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "delivery_drop",
      name: "DeliveryDrop",
      description: "Individual delivery stop/drop on a trip",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "vehicle",
      name: "Vehicle",
      description: "Truck/van used for shipments and delivery trips",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },

    // ---------- EXECUTION & TRADE MARKETING DOMAIN (Orange) ----------
    {
      id: "outlet_visit",
      name: "OutletVisit",
      description: "Field visit to an outlet by sales/merch team",
      size: 24,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "visit_checklist",
      name: "VisitChecklist",
      description: "Checklist executed during an outlet visit",
      size: 18,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "picture_of_success",
      name: "PictureOfSuccess",
      description: "Ideal outlet execution template for a segment/channel",
      size: 18,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "posm_activity",
      name: "POSMActivity",
      description: "POSM/visibility activity (standee, dangler, display, etc.)",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "osa_observation",
      name: "OSAObservation",
      description: "On-shelf availability observation (OSA)",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "sos_observation",
      name: "SOSObservation",
      description: "Share-of-shelf observation (SOS)",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "price_check",
      name: "PriceCheck",
      description: "In-store price check vs RSP/MRP",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "competition_sighting",
      name: "CompetitionSighting",
      description: "Competitive activity observed in an outlet",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "promotion_plan",
      name: "PromotionPlan",
      description: "Planned calendar of trade promotions",
      size: 18,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "trade_promotion",
      name: "TradePromotion",
      description: "Specific trade promotion/scheme definition",
      size: 24,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "trade_scheme",
      name: "TradeScheme",
      description: "Scheme mechanics under a promotion (targets, slabs)",
      size: 18,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "discount_slab",
      name: "DiscountSlab",
      description: "Discount slab/break within a trade scheme",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "visibility_agreement",
      name: "VisibilityAgreement",
      description: "Visibility/activation agreement with a customer",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },

    // ---------- SALES ORG & PEOPLE DOMAIN (Amber) ----------
    {
      id: "sales_org_unit",
      name: "SalesOrgUnit",
      description: "Sales org unit (zone team, region team, territory team)",
      size: 18,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "sales_rep",
      name: "SalesRep",
      description: "Company sales representative/TSI",
      size: 24,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "distributor_sales_rep",
      name: "DistributorSalesRep",
      description: "Distributor salesman/DSR",
      size: 18,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "sales_manager",
      name: "SalesManager",
      description: "Sales manager (ASM/RSM/ZSM, etc.)",
      size: 18,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "role",
      name: "Role",
      description: "Role/position definition in the sales org",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "incentive_scheme",
      name: "IncentiveScheme",
      description: "Sales incentive scheme definition",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "incentive_payout",
      name: "IncentivePayout",
      description: "Payout instance for incentives",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },

    // ---------- ANALYTICS, PLANNING & MARKET DATA (Teal) ----------
    {
      id: "forecast",
      name: "Forecast",
      description:
        "Demand/volume forecast (SKU x territory x channel x period)",
      size: 24,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "sales_target",
      name: "SalesTarget",
      description: "Sales target (value/volume) for unit/product/period",
      size: 24,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "sales_achievement",
      name: "SalesAchievement",
      description: "Actual sales vs target for unit/product/channel",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "kpi",
      name: "KPI",
      description:
        "KPI definition (ND, weighted distribution, OSA, SOS, strike rate, etc.)",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "kpi_value",
      name: "KPIValue",
      description:
        "Measured KPI value for a slice (period, unit, product, etc.)",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "scorecard",
      name: "Scorecard",
      description: "Performance scorecard for distributor/rep/org unit",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "territory_potential",
      name: "TerritoryPotential",
      description: "Estimated business potential of a territory/category",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "market_share",
      name: "MarketShare",
      description: "Market share metric for category x territory",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "syndicated_panel",
      name: "SyndicatedPanel",
      description: "Syndicated panel source (Nielsen, Kantar, etc.)",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "category_insight",
      name: "CategoryInsight",
      description: "Insights derived from panel/market/category data",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },

    // ---------- CONSUMER DOMAIN (Cyan) ----------
    {
      id: "consumer",
      name: "Consumer",
      description:
        "End consumer profile (from CRM/D2C/complaints, where available)",
      size: 24,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "consumer_complaint",
      name: "ConsumerComplaint",
      description:
        "Consumer complaint/case (product, pack, outlet, experience)",
      size: 18,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "consumer_feedback",
      name: "ConsumerFeedback",
      description: "Other consumer feedback (surveys, NPS, reviews)",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
  // ---------- PRODUCT RELATIONSHIPS ----------
  {
    id: "prod_belongs_brand",
    source: "product",
    target: "brand",
    type: "OF_BRAND",
    description: "Product belongs to a brand",
    linkType: "bkg",
  },
  {
    id: "prod_belongs_category",
    source: "product",
    target: "category",
    type: "IN_CATEGORY",
    description: "Product mapped to a category",
    linkType: "bkg",
  },
  {
    id: "prod_has_pack",
    source: "product",
    target: "pack",
    type: "HAS_PACK",
    description: "Product has a pack definition (size/configuration)",
    linkType: "bkg",
  },
  {
    id: "prod_has_price_list",
    source: "product",
    target: "price_list",
    type: "HAS_PRICE_LIST",
    description: "Product linked to price list(s)",
    linkType: "bkg",
  },
  {
    id: "prod_has_attribute",
    source: "product",
    target: "product_attribute",
    type: "HAS_ATTRIBUTE",
    description: "Product has additional attributes",
    linkType: "bkg",
  },
  {
    id: "prod_has_lifecycle",
    source: "product",
    target: "product_lifecycle",
    type: "HAS_LIFECYCLE",
    description: "Product has a lifecycle stage",
    linkType: "bkg",
  },

  // ---------- ORG / GEO / CHANNEL ----------
  {
    id: "company_has_bu",
    source: "company",
    target: "business_unit",
    type: "HAS_BUSINESS_UNIT",
    description: "Company has business units",
    linkType: "bkg",
  },
  {
    id: "bu_has_region",
    source: "business_unit",
    target: "region",
    type: "HAS_REGION",
    description: "Business unit covers regions",
    linkType: "bkg",
  },
  {
    id: "region_has_zone",
    source: "region",
    target: "zone",
    type: "HAS_ZONE",
    description: "Region consists of zones",
    linkType: "bkg",
  },
  {
    id: "zone_has_territory",
    source: "zone",
    target: "territory",
    type: "HAS_TERRITORY",
    description: "Zone consists of territories",
    linkType: "bkg",
  },
  {
    id: "territory_has_route",
    source: "territory",
    target: "route",
    type: "HAS_ROUTE",
    description: "Territory has sales routes/beats",
    linkType: "bkg",
  },
  {
    id: "route_on_channel",
    source: "route",
    target: "channel",
    type: "ON_CHANNEL",
    description: "Route services outlets in a specific channel",
    linkType: "bkg",
  },

  // ---------- CUSTOMER & RTM ----------
  {
    id: "customer_is_distributor",
    source: "distributor",
    target: "customer",
    type: "IS_CUSTOMER",
    description: "Distributor represented as a customer master record",
    linkType: "bkg",
  },
  {
    id: "customer_is_retail_outlet",
    source: "retail_outlet",
    target: "customer",
    type: "IS_CUSTOMER",
    description: "Retail outlet represented as a customer master record",
    linkType: "bkg",
  },
  {
    id: "customer_is_mt_account",
    source: "modern_trade_account",
    target: "customer",
    type: "IS_CUSTOMER",
    description: "Modern trade account represented in customer master",
    linkType: "bkg",
  },
  {
    id: "customer_is_mt_store",
    source: "modern_trade_store",
    target: "customer",
    type: "IS_CUSTOMER",
    description: "Modern trade store represented in customer master",
    linkType: "bkg",
  },
  {
    id: "customer_is_wholesaler",
    source: "wholesaler",
    target: "customer",
    type: "IS_CUSTOMER",
    description: "Wholesaler represented in customer master",
    linkType: "bkg",
  },
  {
    id: "customer_is_horeca",
    source: "horeca_account",
    target: "customer",
    type: "IS_CUSTOMER",
    description: "HoReCa account represented in customer master",
    linkType: "bkg",
  },
  {
    id: "customer_is_subd",
    source: "sub_distributor",
    target: "customer",
    type: "IS_CUSTOMER",
    description: "Sub-distributor represented in customer master",
    linkType: "bkg",
  },
  {
    id: "dist_has_wh",
    source: "distributor",
    target: "distributor_warehouse",
    type: "HAS_WAREHOUSE",
    description: "Distributor operates one or more warehouses/godowns",
    linkType: "bkg",
  },
  {
    id: "subd_reports_dist",
    source: "sub_distributor",
    target: "distributor",
    type: "REPORTS_TO_DISTRIBUTOR",
    description: "Sub-distributor is under a parent distributor",
    linkType: "bkg",
  },
  {
    id: "outlet_served_by_dist",
    source: "retail_outlet",
    target: "distributor",
    type: "SERVED_BY",
    description: "Retail outlet is served by a distributor",
    linkType: "bkg",
  },
  {
    id: "outlet_segmented_by",
    source: "retail_outlet",
    target: "outlet_segment",
    type: "IN_SEGMENT",
    description: "Outlet belongs to a specific outlet segment/class",
    linkType: "bkg",
  },
  {
    id: "outlet_in_cluster",
    source: "retail_outlet",
    target: "outlet_cluster",
    type: "IN_CLUSTER",
    description: "Outlet part of an outlet cluster",
    linkType: "bkg",
  },
  {
    id: "mt_store_belongs_account",
    source: "modern_trade_store",
    target: "modern_trade_account",
    type: "BELONGS_TO_ACCOUNT",
    description: "Modern trade store belongs to a key account",
    linkType: "bkg",
  },
  {
    id: "mt_store_in_territory",
    source: "modern_trade_store",
    target: "territory",
    type: "IN_TERRITORY",
    description: "Modern trade store mapped to a territory",
    linkType: "bkg",
  },
  {
    id: "outlet_in_territory",
    source: "retail_outlet",
    target: "territory",
    type: "IN_TERRITORY",
    description: "Retail outlet mapped to a territory",
    linkType: "bkg",
  },
  {
    id: "dist_covers_territory",
    source: "distributor",
    target: "territory",
    type: "COVERS_TERRITORY",
    description: "Distributor covers specific territories",
    linkType: "bkg",
  },

  // ---------- TIME RELATIONSHIPS ----------
  {
    id: "primary_sale_on_date",
    source: "primary_sale",
    target: "calendar_date",
    type: "ON_DATE",
    description: "Primary sale booked on a calendar date",
    linkType: "bkg",
  },
  {
    id: "secondary_sale_on_date",
    source: "secondary_sale",
    target: "calendar_date",
    type: "ON_DATE",
    description: "Secondary sale booked on a calendar date",
    linkType: "bkg",
  },
  {
    id: "outlet_visit_on_date",
    source: "outlet_visit",
    target: "calendar_date",
    type: "ON_DATE",
    description: "Outlet visit executed on a date",
    linkType: "bkg",
  },
  {
    id: "forecast_for_date",
    source: "forecast",
    target: "calendar_date",
    type: "FOR_DATE",
    description: "Forecast associated with a period/date",
    linkType: "bkg",
  },
  {
    id: "target_for_date",
    source: "sales_target",
    target: "calendar_date",
    type: "FOR_DATE",
    description: "Sales target defined for a period/date",
    linkType: "bkg",
  },

  // ---------- TRANSACTIONS (PRIMARY & SECONDARY) ----------
  {
    id: "primary_sale_to_distributor",
    source: "primary_sale",
    target: "distributor",
    type: "SOLD_TO",
    description: "Primary sale billed to a distributor",
    linkType: "bkg",
  },
  {
    id: "primary_sale_from_depot",
    source: "primary_sale",
    target: "depot",
    type: "FROM_DEPOT",
    description: "Primary sale dispatched from a depot",
    linkType: "bkg",
  },
  {
    id: "primary_sale_has_line",
    source: "primary_sale",
    target: "primary_sale_line",
    type: "HAS_LINE",
    description: "Primary sale consists of line items",
    linkType: "bkg",
  },
  {
    id: "primary_line_for_product",
    source: "primary_sale_line",
    target: "product",
    type: "FOR_PRODUCT",
    description: "Primary sale line for a specific product",
    linkType: "bkg",
  },
  {
    id: "primary_line_for_pack",
    source: "primary_sale_line",
    target: "pack",
    type: "FOR_PACK",
    description: "Primary sale line for a specific pack",
    linkType: "bkg",
  },

  {
    id: "secondary_sale_to_outlet",
    source: "secondary_sale",
    target: "retail_outlet",
    type: "SOLD_TO",
    description: "Secondary sale billed to a retail outlet",
    linkType: "bkg",
  },
  {
    id: "secondary_sale_by_distributor",
    source: "secondary_sale",
    target: "distributor",
    type: "BY_DISTRIBUTOR",
    description: "Secondary sale made by a distributor",
    linkType: "bkg",
  },
  {
    id: "secondary_sale_has_line",
    source: "secondary_sale",
    target: "secondary_sale_line",
    type: "HAS_LINE",
    description: "Secondary sale consists of line items",
    linkType: "bkg",
  },
  {
    id: "secondary_line_for_product",
    source: "secondary_sale_line",
    target: "product",
    type: "FOR_PRODUCT",
    description: "Secondary sale line for a specific product",
    linkType: "bkg",
  },
  {
    id: "secondary_line_for_pack",
    source: "secondary_sale_line",
    target: "pack",
    type: "FOR_PACK",
    description: "Secondary sale line for a specific pack",
    linkType: "bkg",
  },

  {
    id: "return_against_secondary",
    source: "return_doc",
    target: "secondary_sale",
    type: "AGAINST_SECONDARY_SALE",
    description: "Return raised against a secondary sale",
    linkType: "bkg",
  },
  {
    id: "claim_raised_by_distributor",
    source: "claim",
    target: "distributor",
    type: "RAISED_BY",
    description: "Claim raised by a distributor/key account",
    linkType: "bkg",
  },
  {
    id: "claim_has_type",
    source: "claim",
    target: "claim_type",
    type: "HAS_TYPE",
    description: "Claim categorised into a type",
    linkType: "bkg",
  },

  // ---------- INVENTORY ----------
  {
    id: "depot_inv_for_product",
    source: "depot_inventory_snapshot",
    target: "product",
    type: "FOR_PRODUCT",
    description: "Depot inventory snapshot for a product",
    linkType: "bkg",
  },
  {
    id: "depot_inv_at_depot",
    source: "depot_inventory_snapshot",
    target: "depot",
    type: "AT_DEPOT",
    description: "Depot inventory snapshot at a particular depot",
    linkType: "bkg",
  },
  {
    id: "depot_inv_batch",
    source: "depot_inventory_snapshot",
    target: "inventory_batch",
    type: "HAS_BATCH",
    description: "Depot inventory snapshot broken by batch",
    linkType: "bkg",
  },
  {
    id: "dist_inv_for_product",
    source: "distributor_inventory_snapshot",
    target: "product",
    type: "FOR_PRODUCT",
    description: "Distributor inventory snapshot for a product",
    linkType: "bkg",
  },
  {
    id: "dist_inv_at_warehouse",
    source: "distributor_inventory_snapshot",
    target: "distributor_warehouse",
    type: "AT_DISTRIBUTOR_WAREHOUSE",
    description: "Distributor inventory snapshot at a warehouse",
    linkType: "bkg",
  },
  {
    id: "dist_inv_batch",
    source: "distributor_inventory_snapshot",
    target: "inventory_batch",
    type: "HAS_BATCH",
    description: "Distributor inventory snapshot broken by batch",
    linkType: "bkg",
  },

  // ---------- SUPPLY CHAIN & LOGISTICS ----------
  {
    id: "plant_feeds_depot",
    source: "plant",
    target: "depot",
    type: "FEEDS",
    description: "Plant supplies stock to depot",
    linkType: "bkg",
  },
  {
    id: "shipment_from_depot",
    source: "shipment",
    target: "depot",
    type: "FROM_DEPOT",
    description: "Shipment dispatched from a depot",
    linkType: "bkg",
  },
  {
    id: "shipment_to_distributor_wh",
    source: "shipment",
    target: "distributor_warehouse",
    type: "TO_DISTRIBUTOR_WAREHOUSE",
    description: "Shipment delivered to a distributor warehouse",
    linkType: "bkg",
  },
  {
    id: "shipment_has_line",
    source: "shipment",
    target: "shipment_line",
    type: "HAS_LINE",
    description: "Shipment consists of shipment lines",
    linkType: "bkg",
  },
  {
    id: "shipment_line_for_product",
    source: "shipment_line",
    target: "product",
    type: "FOR_PRODUCT",
    description: "Shipment line for a specific product",
    linkType: "bkg",
  },
  {
    id: "delivery_trip_for_route",
    source: "delivery_trip",
    target: "route",
    type: "FOR_ROUTE",
    description: "Delivery trip serving a specific route/beat",
    linkType: "bkg",
  },
  {
    id: "delivery_trip_uses_vehicle",
    source: "delivery_trip",
    target: "vehicle",
    type: "USES_VEHICLE",
    description: "Delivery trip executed by a vehicle",
    linkType: "bkg",
  },
  {
    id: "delivery_drop_on_trip",
    source: "delivery_trip",
    target: "delivery_drop",
    type: "HAS_DROP",
    description: "Delivery trip consists of delivery drops",
    linkType: "bkg",
  },
  {
    id: "delivery_drop_to_outlet",
    source: "delivery_drop",
    target: "retail_outlet",
    type: "DROP_TO_OUTLET",
    description: "Delivery drop to a retail outlet",
    linkType: "bkg",
  },
  {
    id: "delivery_drop_to_distwh",
    source: "delivery_drop",
    target: "distributor_warehouse",
    type: "DROP_TO_DISTRIBUTOR_WAREHOUSE",
    description: "Delivery drop to a distributor warehouse",
    linkType: "bkg",
  },

  // ---------- EXECUTION & TRADE ----------
  {
    id: "visit_at_outlet",
    source: "outlet_visit",
    target: "retail_outlet",
    type: "AT_OUTLET",
    description: "Outlet visit conducted at a specific outlet",
    linkType: "bkg",
  },
  {
    id: "visit_by_sales_rep",
    source: "outlet_visit",
    target: "sales_rep",
    type: "BY_SALES_REP",
    description: "Outlet visit done by company sales rep/TSI",
    linkType: "bkg",
  },
  {
    id: "visit_by_dist_sales_rep",
    source: "outlet_visit",
    target: "distributor_sales_rep",
    type: "BY_DISTRIBUTOR_SALES_REP",
    description: "Outlet visit done by distributor salesman (DSR)",
    linkType: "bkg",
  },
  {
    id: "visit_on_route",
    source: "outlet_visit",
    target: "route",
    type: "ON_ROUTE",
    description: "Outlet visit associated to a route",
    linkType: "bkg",
  },
  {
    id: "visit_uses_checklist",
    source: "outlet_visit",
    target: "visit_checklist",
    type: "USES_CHECKLIST",
    description: "Outlet visit executed against a checklist",
    linkType: "bkg",
  },
  {
    id: "visit_applies_pos",
    source: "outlet_visit",
    target: "picture_of_success",
    type: "APPLIES_POS",
    description: "Outlet visit evaluated against Picture of Success",
    linkType: "bkg",
  },
  {
    id: "visit_has_posm_activity",
    source: "outlet_visit",
    target: "posm_activity",
    type: "HAS_POSM_ACTIVITY",
    description: "POSM/visibility activities logged during visit",
    linkType: "bkg",
  },
  {
    id: "visit_has_osa",
    source: "outlet_visit",
    target: "osa_observation",
    type: "HAS_OSA_OBSERVATION",
    description: "On-shelf availability observations captured in visit",
    linkType: "bkg",
  },
  {
    id: "visit_has_sos",
    source: "outlet_visit",
    target: "sos_observation",
    type: "HAS_SOS_OBSERVATION",
    description: "Share-of-shelf observations captured in visit",
    linkType: "bkg",
  },
  {
    id: "visit_has_price_check",
    source: "outlet_visit",
    target: "price_check",
    type: "HAS_PRICE_CHECK",
    description: "Price checks recorded during visit",
    linkType: "bkg",
  },
  {
    id: "visit_logs_competition",
    source: "outlet_visit",
    target: "competition_sighting",
    type: "HAS_COMPETITION_SIGHTING",
    description: "Competitive sightings recorded during visit",
    linkType: "bkg",
  },

  {
    id: "picture_of_success_for_segment",
    source: "picture_of_success",
    target: "outlet_segment",
    type: "FOR_OUTLET_SEGMENT",
    description: "Picture of Success defined for an outlet segment",
    linkType: "bkg",
  },
  {
    id: "picture_of_success_for_channel",
    source: "picture_of_success",
    target: "channel",
    type: "FOR_CHANNEL",
    description: "Picture of Success defined for a channel",
    linkType: "bkg",
  },
  {
    id: "trade_promo_for_channel",
    source: "trade_promotion",
    target: "channel",
    type: "FOR_CHANNEL",
    description: "Trade promotion applicable to a channel",
    linkType: "bkg",
  },
  {
    id: "trade_promo_for_customer",
    source: "trade_promotion",
    target: "customer",
    type: "FOR_CUSTOMER",
    description: "Trade promotion targeted at specific customers",
    linkType: "bkg",
  },
  {
    id: "trade_promo_for_product",
    source: "trade_promotion",
    target: "product",
    type: "FOR_PRODUCT",
    description: "Trade promotion applicable to specific products",
    linkType: "bkg",
  },
  {
    id: "trade_scheme_under_promo",
    source: "trade_scheme",
    target: "trade_promotion",
    type: "UNDER_PROMOTION",
    description: "Trade scheme forms part of a trade promotion",
    linkType: "bkg",
  },
  {
    id: "discount_slab_in_scheme",
    source: "discount_slab",
    target: "trade_scheme",
    type: "IN_SCHEME",
    description: "Discount slab is part of a trade scheme",
    linkType: "bkg",
  },
  {
    id: "visibility_agreement_for_customer",
    source: "visibility_agreement",
    target: "customer",
    type: "FOR_CUSTOMER",
    description: "Visibility agreement signed with a customer",
    linkType: "bkg",
  },
  {
    id: "promotion_plan_has_trade_promo",
    source: "promotion_plan",
    target: "trade_promotion",
    type: "HAS_TRADE_PROMOTION",
    description: "Promotion plan lists trade promotions on calendar",
    linkType: "bkg",
  },

  // ---------- SALES ORG & PEOPLE ----------
  {
    id: "sales_org_has_unit",
    source: "company",
    target: "sales_org_unit",
    type: "HAS_SALES_UNIT",
    description: "Company has sales org units (zone/region/territory teams)",
    linkType: "bkg",
  },
  {
    id: "unit_has_sales_rep",
    source: "sales_org_unit",
    target: "sales_rep",
    type: "HAS_SALES_REP",
    description: "Sales org unit has sales reps/TSIs",
    linkType: "bkg",
  },
  {
    id: "unit_has_manager",
    source: "sales_org_unit",
    target: "sales_manager",
    type: "HAS_MANAGER",
    description: "Sales org unit managed by sales manager",
    linkType: "bkg",
  },
  {
    id: "rep_assigned_route",
    source: "sales_rep",
    target: "route",
    type: "ASSIGNED_ROUTE",
    description: "Sales rep assigned to service routes",
    linkType: "bkg",
  },
  {
    id: "dsr_assigned_route",
    source: "distributor_sales_rep",
    target: "route",
    type: "ASSIGNED_ROUTE",
    description: "Distributor salesman assigned to service routes",
    linkType: "bkg",
  },
  {
    id: "rep_has_role",
    source: "sales_rep",
    target: "role",
    type: "HAS_ROLE",
    description: "Sales rep has a defined role",
    linkType: "bkg",
  },
  {
    id: "manager_has_role",
    source: "sales_manager",
    target: "role",
    type: "HAS_ROLE",
    description: "Sales manager has a defined role",
    linkType: "bkg",
  },
  {
    id: "incentive_scheme_for_unit",
    source: "incentive_scheme",
    target: "sales_org_unit",
    type: "FOR_SALES_UNIT",
    description: "Incentive scheme defined for a sales org unit",
    linkType: "bkg",
  },
  {
    id: "incentive_payout_to_rep",
    source: "incentive_payout",
    target: "sales_rep",
    type: "TO_SALES_REP",
    description: "Incentive payout to a sales rep",
    linkType: "bkg",
  },
  {
    id: "payout_based_on_scheme",
    source: "incentive_payout",
    target: "incentive_scheme",
    type: "BASED_ON_SCHEME",
    description: "Incentive payout based on a scheme",
    linkType: "bkg",
  },

  // ---------- ANALYTICS, PLANNING & MARKET DATA ----------
  {
    id: "forecast_for_product",
    source: "forecast",
    target: "product",
    type: "FOR_PRODUCT",
    description: "Forecast defined at product level",
    linkType: "bkg",
  },
  {
    id: "forecast_for_territory",
    source: "forecast",
    target: "territory",
    type: "FOR_TERRITORY",
    description: "Forecast defined at territory level",
    linkType: "bkg",
  },
  {
    id: "forecast_for_channel2",
    source: "forecast",
    target: "channel",
    type: "FOR_CHANNEL",
    description: "Forecast defined at channel level",
    linkType: "bkg",
  },
  {
    id: "sales_target_for_unit",
    source: "sales_target",
    target: "sales_org_unit",
    type: "FOR_SALES_UNIT",
    description: "Target assigned to a sales org unit",
    linkType: "bkg",
  },
  {
    id: "sales_target_for_product",
    source: "sales_target",
    target: "product",
    type: "FOR_PRODUCT",
    description: "Target assigned at product level",
    linkType: "bkg",
  },
  {
    id: "sales_ach_for_unit",
    source: "sales_achievement",
    target: "sales_org_unit",
    type: "FOR_SALES_UNIT",
    description: "Sales achievement measured for a sales org unit",
    linkType: "bkg",
  },
  {
    id: "sales_ach_for_product",
    source: "sales_achievement",
    target: "product",
    type: "FOR_PRODUCT",
    description: "Sales achievement measured for a product",
    linkType: "bkg",
  },
  {
    id: "sales_ach_for_channel",
    source: "sales_achievement",
    target: "channel",
    type: "FOR_CHANNEL",
    description: "Sales achievement measured for a channel",
    linkType: "bkg",
  },
  {
    id: "kpi_has_value",
    source: "kpi",
    target: "kpi_value",
    type: "HAS_VALUE",
    description: "KPI has measured values",
    linkType: "bkg",
  },
  {
    id: "scorecard_uses_kpi_value",
    source: "scorecard",
    target: "kpi_value",
    type: "USES_VALUE",
    description: "Scorecard uses KPI values",
    linkType: "bkg",
  },
  {
    id: "scorecard_for_distributor",
    source: "scorecard",
    target: "distributor",
    type: "FOR_DISTRIBUTOR",
    description: "Scorecard for a distributor",
    linkType: "bkg",
  },
  {
    id: "territory_has_potential",
    source: "territory_potential",
    target: "territory",
    type: "FOR_TERRITORY",
    description: "Territory potential linked to a territory",
    linkType: "bkg",
  },
  {
    id: "market_share_for_category",
    source: "market_share",
    target: "category",
    type: "FOR_CATEGORY",
    description: "Market share for a category",
    linkType: "bkg",
  },
  {
    id: "market_share_for_territory",
    source: "market_share",
    target: "territory",
    type: "FOR_TERRITORY",
    description: "Market share for a territory",
    linkType: "bkg",
  },
  {
    id: "panel_feeds_market_share",
    source: "syndicated_panel",
    target: "market_share",
    type: "FEEDS_MARKET_SHARE",
    description: "Syndicated panel feeds market share metrics",
    linkType: "bkg",
  },
  {
    id: "panel_feeds_category_insight",
    source: "syndicated_panel",
    target: "category_insight",
    type: "FEEDS_CATEGORY_INSIGHT",
    description: "Syndicated panel feeds category insights",
    linkType: "bkg",
  },
  {
    id: "category_insight_for_category",
    source: "category_insight",
    target: "category",
    type: "FOR_CATEGORY",
    description: "Category insights mapped to a category",
    linkType: "bkg",
  },

  // ---------- CONSUMER ----------
  {
    id: "consumer_complaint_by_consumer",
    source: "consumer_complaint",
    target: "consumer",
    type: "RAISED_BY",
    description: "Consumer complaint raised by a consumer",
    linkType: "bkg",
  },
  {
    id: "consumer_complaint_about_product",
    source: "consumer_complaint",
    target: "product",
    type: "ABOUT_PRODUCT",
    description: "Consumer complaint about a product/pack",
    linkType: "bkg",
  },
  {
    id: "consumer_complaint_about_outlet",
    source: "consumer_complaint",
    target: "retail_outlet",
    type: "ABOUT_OUTLET",
    description: "Consumer complaint linked to an outlet",
    linkType: "bkg",
  },
  {
    id: "consumer_feedback_by_consumer",
    source: "consumer_feedback",
    target: "consumer",
    type: "RAISED_BY",
    description: "Consumer feedback captured from a consumer",
    linkType: "bkg",
  },
]
);

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

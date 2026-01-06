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
  level?: number;
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
    {
      id: "product",
      name: "Product",
      description:
        "Core SKU in the portfolio (linked to brand, category, pack, price).",
      size: 24,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "brand",
      name: "Brand",
      description: "Brand/label under GCPL portfolio.",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "category",
      name: "Category",
      description: "Product category for assortment, reporting and strategy.",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "pack",
      name: "Pack",
      description: "Pack definition (size, units, configuration) for a SKU.",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "price_list",
      name: "PriceList",
      description:
        "Trade/consumer price list (MRP, net distributor price, off-invoice etc.).",
      size: 18,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_attribute",
      name: "ProductAttribute",
      description: "Attributes (variant, fragrance, pack type, etc.).",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },
    {
      id: "product_lifecycle",
      name: "ProductLifecycle",
      description: "Lifecycle stage (launch, grow, core, decline, tail).",
      size: 16,
      color: "#6366F1",
      type: "bkg",
    },

    {
      id: "company",
      name: "GCPL",
      description:
        "Godrej Consumer Products Ltd. operating FMCG value chain (make–move–sell–activate).",
      size: 24,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "business_unit",
      name: "BusinessUnit",
      description: "Business unit / category group.",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "region",
      name: "Region",
      description: "Sales region (e.g., North, South, West).",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "zone",
      name: "Zone",
      description: "Sub-region/zone under a region.",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "territory",
      name: "Territory",
      description: "Sales territory / group of towns and outlets.",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "channel",
      name: "Channel",
      description:
        "Route-to-market channel (GT, MT, Wholesale, HoReCa, Ecom, etc.).",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "route",
      name: "Route",
      description: "Permanent beat/route covering outlets on specific days.",
      size: 18,
      color: "#8B5CF6",
      type: "bkg",
    },
    {
      id: "route_plan",
      name: "RoutePlan",
      description: "Planned sequence/coverage plan for a route and day.",
      size: 16,
      color: "#8B5CF6",
      type: "bkg",
    },

    {
      id: "customer",
      name: "Customer",
      description:
        "Generic B2B customer entity (distributor, outlet, MT, etc.).",
      size: 24,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "distributor",
      name: "Distributor",
      description: "Primary sales partner/distributor receiving sell-in.",
      size: 24,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "distributor_warehouse",
      name: "DistributorWarehouse",
      description: "Distributor warehouse/godown where stock is held.",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "sub_distributor",
      name: "SubDistributor",
      description: "Sub-distributor operating under a primary distributor.",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "wholesaler",
      name: "Wholesaler",
      description: "Wholesale customer buying in bulk.",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "retail_outlet",
      name: "RetailOutlet",
      description: "Retail outlet selling to end consumers.",
      size: 24,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "modern_trade_account",
      name: "ModernTradeAccount",
      description: "Modern trade key account (retail chain HQ).",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "modern_trade_store",
      name: "ModernTradeStore",
      description: "Modern trade store belonging to a key account.",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "horeca_account",
      name: "HoReCaAccount",
      description:
        "HoReCa/institutional customer (hotels, restaurants, cafés).",
      size: 18,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "outlet_segment",
      name: "OutletSegment",
      description: "Outlet segment/class (A/B/C, format, etc.).",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },
    {
      id: "outlet_cluster",
      name: "OutletCluster",
      description: "Outlet clusters (urban/rural, strategic groups).",
      size: 16,
      color: "#EC4899",
      type: "bkg",
    },

    {
      id: "calendar_date",
      name: "CalendarDate",
      description: "Calendar date dimension across sales, visits, inventory.",
      size: 18,
      color: "#64748B",
      type: "bkg",
    },

    {
      id: "primary_sale",
      name: "PrimarySale",
      description: "Primary sale from company/depot to distributor.",
      size: 24,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "primary_sale_line",
      name: "PrimarySaleLine",
      description: "Line item within a primary sale (SKU/pack, qty, price).",
      size: 18,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "secondary_sale",
      name: "SecondarySale",
      description:
        "Secondary sale from distributor to customer (outlet/wholesale/MT/HoReCa).",
      size: 24,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "secondary_sale_line",
      name: "SecondarySaleLine",
      description: "Line item within a secondary sale.",
      size: 18,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "return_doc",
      name: "Return",
      description:
        "Return document (typically secondary returns from outlets).",
      size: 18,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "claim",
      name: "Claim",
      description: "Trade claim raised by distributor/key account.",
      size: 18,
      color: "#10B981",
      type: "bkg",
    },
    {
      id: "claim_type",
      name: "ClaimType",
      description: "Type of claim (scheme, price support, damage, etc.).",
      size: 16,
      color: "#10B981",
      type: "bkg",
    },

    {
      id: "depot_inventory_snapshot",
      name: "DepotInventorySnapshot",
      description:
        "Inventory snapshot at company depot by product/pack and date.",
      size: 18,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "distributor_inventory_snapshot",
      name: "DistributorInventorySnapshot",
      description:
        "Inventory snapshot at distributor warehouse by product/pack and date.",
      size: 18,
      color: "#22C55E",
      type: "bkg",
    },
    {
      id: "inventory_batch",
      name: "InventoryBatch",
      description: "Batch/lot with MFG/EXP tied to product and pack.",
      size: 16,
      color: "#22C55E",
      type: "bkg",
    },

    {
      id: "plant",
      name: "Plant",
      description: "Manufacturing plant producing finished goods.",
      size: 18,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "depot",
      name: "Depot",
      description: "Company depot / mother warehouse.",
      size: 18,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "shipment",
      name: "Shipment",
      description: "Shipment from plant/depot to distributor or other node.",
      size: 18,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "shipment_line",
      name: "ShipmentLine",
      description: "Line item within a shipment (SKU/pack, qty).",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "delivery_trip",
      name: "DeliveryTrip",
      description: "Vehicle trip performing deliveries for a route/day.",
      size: 18,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "delivery_drop",
      name: "DeliveryDrop",
      description: "Individual delivery stop/drop on a trip.",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },
    {
      id: "vehicle",
      name: "Vehicle",
      description: "Truck/van used for shipments and delivery trips.",
      size: 16,
      color: "#0EA5E9",
      type: "bkg",
    },

    {
      id: "outlet_visit",
      name: "OutletVisit",
      description: "Field visit to an outlet by sales/merch team.",
      size: 24,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "visit_checklist",
      name: "VisitChecklist",
      description: "Checklist executed during an outlet visit.",
      size: 18,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "picture_of_success",
      name: "PictureOfSuccess",
      description: "Ideal outlet execution template for a segment/channel.",
      size: 18,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "posm_activity",
      name: "POSMActivity",
      description: "POSM/visibility activity (standee, display, etc.).",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "osa_observation",
      name: "OSAObservation",
      description: "On-shelf availability observation (OSA).",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "sos_observation",
      name: "SOSObservation",
      description: "Share-of-shelf observation (SOS).",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "price_check",
      name: "PriceCheck",
      description: "In-store price check vs RSP/MRP.",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "competition_sighting",
      name: "CompetitionSighting",
      description: "Competitive activity observed in an outlet.",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "promotion_plan",
      name: "PromotionPlan",
      description: "Planned calendar of trade promotions.",
      size: 18,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "trade_promotion",
      name: "TradePromotion",
      description: "Specific trade promotion/scheme definition.",
      size: 24,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "trade_scheme",
      name: "TradeScheme",
      description: "Scheme mechanics under a promotion (targets, slabs).",
      size: 18,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "discount_slab",
      name: "DiscountSlab",
      description: "Discount slab/break within a trade scheme.",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },
    {
      id: "visibility_agreement",
      name: "VisibilityAgreement",
      description: "Visibility/activation agreement with a customer.",
      size: 16,
      color: "#F97316",
      type: "bkg",
    },

    {
      id: "sales_org_unit",
      name: "SalesOrgUnit",
      description: "Sales org unit (zone team, region team, territory team).",
      size: 18,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "sales_rep",
      name: "SalesRep",
      description: "Company sales representative/TSI.",
      size: 24,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "distributor_sales_rep",
      name: "DistributorSalesRep",
      description: "Distributor salesman/DSR.",
      size: 18,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "sales_manager",
      name: "SalesManager",
      description: "Sales manager (ASM/RSM/ZSM, etc.).",
      size: 18,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "role",
      name: "Role",
      description: "Role/position definition in the sales org.",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "incentive_scheme",
      name: "IncentiveScheme",
      description: "Sales incentive scheme definition.",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },
    {
      id: "incentive_payout",
      name: "IncentivePayout",
      description: "Payout instance for incentives.",
      size: 16,
      color: "#F59E0B",
      type: "bkg",
    },

    {
      id: "forecast",
      name: "Forecast",
      description:
        "Demand/volume forecast (SKU x territory x channel x period).",
      size: 24,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "sales_target",
      name: "SalesTarget",
      description: "Sales target (value/volume) for unit/product/period.",
      size: 24,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "sales_achievement",
      name: "SalesAchievement",
      description: "Actual sales vs target for unit/product/channel.",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "kpi",
      name: "KPI",
      description: "KPI definition (ND, WD, OSA, SOS, strike rate, etc.).",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "kpi_value",
      name: "KPIValue",
      description:
        "Measured KPI value for a slice (period, unit, product, etc.).",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "scorecard",
      name: "Scorecard",
      description: "Performance scorecard for distributor/rep/org unit.",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "territory_potential",
      name: "TerritoryPotential",
      description: "Estimated business potential of a territory/category.",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "market_share",
      name: "MarketShare",
      description: "Market share metric for category x territory.",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "syndicated_panel",
      name: "SyndicatedPanel",
      description: "Syndicated panel source (Nielsen, Kantar, etc.).",
      size: 18,
      color: "#0F766E",
      type: "bkg",
    },
    {
      id: "category_insight",
      name: "CategoryInsight",
      description: "Insights derived from panel/market/category data.",
      size: 16,
      color: "#0F766E",
      type: "bkg",
    },

    {
      id: "consumer",
      name: "Consumer",
      description:
        "End consumer profile (from CRM/D2C/complaints, where available).",
      size: 24,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "consumer_complaint",
      name: "ConsumerComplaint",
      description:
        "Consumer complaint/case (product, pack, outlet, experience).",
      size: 18,
      color: "#06B6D4",
      type: "bkg",
    },
    {
      id: "consumer_feedback",
      name: "ConsumerFeedback",
      description: "Other consumer feedback (surveys, NPS, reviews).",
      size: 16,
      color: "#06B6D4",
      type: "bkg",
    },

    {
      id: "src_databricks",
      name: "Databricks",
      description:
        "GCPL internal lakehouse where sales ecosystem data (primary/secondary + cuts/views/frequency + hierarchies) is available.",
      size: 0,
      width: 180,
      height: 50,
      color: "#334155",
      type: "source",
    },
    {
      id: "src_anaplan",
      name: "Anaplan",
      description: "Planning system outside Databricks (not yet consolidated).",
      size: 0,
      width: 180,
      height: 50,
      color: "#334155",
      type: "source",
    },
    {
      id: "src_nielsen_kantar",
      name: "Nielsen/Kantar",
      description: "Syndicated market/category measurement panel source.",
      size: 0,
      width: 180,
      height: 50,
      color: "#334155",
      type: "source",
    },
    {
      id: "src_consumer_feedback",
      name: "Consumer Feedback Sources",
      description:
        "Complaints, reviews, surveys, social—signals used for trend/consumer inciting.",
      size: 0,
      width: 180,
      height: 50,
      color: "#334155",
      type: "source",
    },
    {
      id: "src_aws_planning",
      name: "AWS Planning Outputs",
      description:
        "Supply/planning outputs (where applicable) that can feed forecasting/inventory decisions.",
      size: 0,
      width: 180,
      height: 50,
      color: "#334155",
      type: "source",
    },
  ]);

  const [links, setLinks] = useState<Link[]>([
    {
      id: "l_product_brand",
      source: "product",
      target: "brand",
      type: "belongs_to",
      description: "SKU belongs to a brand.",
      linkType: "bkg",
    },
    {
      id: "l_product_category",
      source: "product",
      target: "category",
      type: "classified_as",
      description: "SKU is classified under a category.",
      linkType: "bkg",
    },
    {
      id: "l_product_pack",
      source: "product",
      target: "pack",
      type: "packaged_as",
      description: "SKU is sold in one or more pack configurations.",
      linkType: "bkg",
    },
    {
      id: "l_product_price",
      source: "product",
      target: "price_list",
      type: "priced_in",
      description: "SKU is priced via price lists (MRP/trade).",
      linkType: "bkg",
    },
    {
      id: "l_product_attr",
      source: "product",
      target: "product_attribute",
      type: "has_attribute",
      description: "SKU has variant attributes.",
      linkType: "bkg",
    },
    {
      id: "l_product_lifecycle",
      source: "product",
      target: "product_lifecycle",
      type: "has_stage",
      description: "SKU is tracked by lifecycle stage.",
      linkType: "bkg",
    },

    {
      id: "l_company_bu",
      source: "company",
      target: "business_unit",
      type: "has",
      description: "Company is organized into business units.",
      linkType: "bkg",
    },
    {
      id: "l_company_region",
      source: "company",
      target: "region",
      type: "operates_in",
      description: "Company operates across sales regions.",
      linkType: "bkg",
    },
    {
      id: "l_region_zone",
      source: "region",
      target: "zone",
      type: "has",
      description: "Region contains zones.",
      linkType: "bkg",
    },
    {
      id: "l_zone_territory",
      source: "zone",
      target: "territory",
      type: "has",
      description: "Zone contains territories.",
      linkType: "bkg",
    },
    {
      id: "l_company_channel",
      source: "company",
      target: "channel",
      type: "sells_through",
      description: "Company sells through multiple RTM channels.",
      linkType: "bkg",
    },
    {
      id: "l_territory_route",
      source: "territory",
      target: "route",
      type: "has",
      description: "Territory contains routes/beats.",
      linkType: "bkg",
    },
    {
      id: "l_route_plan",
      source: "route",
      target: "route_plan",
      type: "planned_as",
      description: "Routes are executed via route plans by day/sequence.",
      linkType: "bkg",
    },

    {
      id: "l_distributor_is_customer",
      source: "distributor",
      target: "customer",
      type: "is_a",
      description: "Distributor is a type of customer entity.",
      linkType: "bkg",
    },
    {
      id: "l_outlet_is_customer",
      source: "retail_outlet",
      target: "customer",
      type: "is_a",
      description: "Retail outlet is a type of customer entity.",
      linkType: "bkg",
    },
    {
      id: "l_wholesaler_is_customer",
      source: "wholesaler",
      target: "customer",
      type: "is_a",
      description: "Wholesaler is a type of customer entity.",
      linkType: "bkg",
    },
    {
      id: "l_mta_is_customer",
      source: "modern_trade_account",
      target: "customer",
      type: "is_a",
      description: "Modern trade account is a customer entity.",
      linkType: "bkg",
    },
    {
      id: "l_mts_is_customer",
      source: "modern_trade_store",
      target: "customer",
      type: "is_a",
      description: "Modern trade store is a customer entity.",
      linkType: "bkg",
    },
    {
      id: "l_horeca_is_customer",
      source: "horeca_account",
      target: "customer",
      type: "is_a",
      description: "HoReCa account is a customer entity.",
      linkType: "bkg",
    },

    {
      id: "l_distributor_warehouse",
      source: "distributor",
      target: "distributor_warehouse",
      type: "operates",
      description: "Distributor operates warehouses where stock is held.",
      linkType: "bkg",
    },
    {
      id: "l_distributor_subd",
      source: "distributor",
      target: "sub_distributor",
      type: "has",
      description: "Distributor may work with sub-distributors.",
      linkType: "bkg",
    },

    {
      id: "l_distributor_territory",
      source: "distributor",
      target: "territory",
      type: "services",
      description: "Distributor services a territory/patch.",
      linkType: "bkg",
    },
    {
      id: "l_outlet_territory",
      source: "retail_outlet",
      target: "territory",
      type: "located_in",
      description: "Outlet is located in a territory.",
      linkType: "bkg",
    },
    {
      id: "l_outlet_segment",
      source: "retail_outlet",
      target: "outlet_segment",
      type: "segmented_as",
      description: "Outlet belongs to a segment/class.",
      linkType: "bkg",
    },
    {
      id: "l_outlet_cluster",
      source: "retail_outlet",
      target: "outlet_cluster",
      type: "clustered_as",
      description: "Outlet is assigned to a cluster.",
      linkType: "bkg",
    },

    {
      id: "l_mta_store",
      source: "modern_trade_account",
      target: "modern_trade_store",
      type: "has_store",
      description: "Key account has stores.",
      linkType: "bkg",
    },
    {
      id: "l_store_territory",
      source: "modern_trade_store",
      target: "territory",
      type: "located_in",
      description: "MT store is located in a territory.",
      linkType: "bkg",
    },

    {
      id: "l_route_covers_outlet",
      source: "route",
      target: "retail_outlet",
      type: "covers",
      description: "Route covers outlets for visits/order taking.",
      linkType: "bkg",
    },

    {
      id: "l_primary_sale_to_distributor",
      source: "primary_sale",
      target: "distributor",
      type: "sold_to",
      description: "Primary sale is billed to a distributor.",
      linkType: "bkg",
    },
    {
      id: "l_primary_sale_date",
      source: "primary_sale",
      target: "calendar_date",
      type: "occurred_on",
      description: "Primary sale has an invoice date.",
      linkType: "bkg",
    },
    {
      id: "l_primary_sale_lines",
      source: "primary_sale",
      target: "primary_sale_line",
      type: "has_line",
      description: "Primary sale contains line items.",
      linkType: "bkg",
    },
    {
      id: "l_primary_line_product",
      source: "primary_sale_line",
      target: "product",
      type: "item",
      description: "Line item references a SKU.",
      linkType: "bkg",
    },
    {
      id: "l_primary_line_pack",
      source: "primary_sale_line",
      target: "pack",
      type: "pack",
      description: "Line item references a pack.",
      linkType: "bkg",
    },
    {
      id: "l_primary_sale_pricing",
      source: "primary_sale",
      target: "price_list",
      type: "priced_using",
      description: "Primary billing uses a price list.",
      linkType: "bkg",
    },

    {
      id: "l_secondary_sale_by_distributor",
      source: "secondary_sale",
      target: "distributor",
      type: "sold_by",
      description: "Secondary sale is executed by a distributor.",
      linkType: "bkg",
    },
    {
      id: "l_secondary_sale_to_customer",
      source: "secondary_sale",
      target: "customer",
      type: "sold_to",
      description:
        "Secondary sale is sold to a customer (outlet/wholesale/MT/HoReCa).",
      linkType: "bkg",
    },
    {
      id: "l_secondary_sale_date",
      source: "secondary_sale",
      target: "calendar_date",
      type: "occurred_on",
      description: "Secondary sale has a billing date.",
      linkType: "bkg",
    },
    {
      id: "l_secondary_sale_lines",
      source: "secondary_sale",
      target: "secondary_sale_line",
      type: "has_line",
      description: "Secondary sale contains line items.",
      linkType: "bkg",
    },
    {
      id: "l_secondary_line_product",
      source: "secondary_sale_line",
      target: "product",
      type: "item",
      description: "Secondary line references a SKU.",
      linkType: "bkg",
    },
    {
      id: "l_secondary_line_pack",
      source: "secondary_sale_line",
      target: "pack",
      type: "pack",
      description: "Secondary line references a pack.",
      linkType: "bkg",
    },

    {
      id: "l_return_by_customer",
      source: "return_doc",
      target: "customer",
      type: "raised_by",
      description: "Returns are raised by customers (often outlets).",
      linkType: "bkg",
    },
    {
      id: "l_return_against_secondary",
      source: "return_doc",
      target: "secondary_sale",
      type: "returns_against",
      description: "Return can be linked to prior secondary sales.",
      linkType: "bkg",
    },

    {
      id: "l_claim_by_customer",
      source: "claim",
      target: "customer",
      type: "raised_by",
      description: "Claims are raised by trade customers (distributors/KAs).",
      linkType: "bkg",
    },
    {
      id: "l_claim_type",
      source: "claim",
      target: "claim_type",
      type: "typed_as",
      description: "Claim has a claim type.",
      linkType: "bkg",
    },

    {
      id: "l_depot_snapshot_depot",
      source: "depot_inventory_snapshot",
      target: "depot",
      type: "snapshot_of",
      description: "Depot inventory snapshot is for a depot.",
      linkType: "bkg",
    },
    {
      id: "l_depot_snapshot_product",
      source: "depot_inventory_snapshot",
      target: "product",
      type: "for_product",
      description: "Depot inventory is tracked by SKU.",
      linkType: "bkg",
    },
    {
      id: "l_depot_snapshot_date",
      source: "depot_inventory_snapshot",
      target: "calendar_date",
      type: "as_of",
      description: "Depot inventory is as-of a date.",
      linkType: "bkg",
    },

    {
      id: "l_dist_snapshot_wh",
      source: "distributor_inventory_snapshot",
      target: "distributor_warehouse",
      type: "snapshot_of",
      description:
        "Distributor inventory snapshot is for a distributor warehouse.",
      linkType: "bkg",
    },
    {
      id: "l_dist_snapshot_product",
      source: "distributor_inventory_snapshot",
      target: "product",
      type: "for_product",
      description: "Distributor inventory is tracked by SKU.",
      linkType: "bkg",
    },
    {
      id: "l_dist_snapshot_date",
      source: "distributor_inventory_snapshot",
      target: "calendar_date",
      type: "as_of",
      description: "Distributor inventory is as-of a date.",
      linkType: "bkg",
    },

    {
      id: "l_batch_product",
      source: "inventory_batch",
      target: "product",
      type: "batch_of",
      description: "Batch belongs to a SKU.",
      linkType: "bkg",
    },
    {
      id: "l_batch_pack",
      source: "inventory_batch",
      target: "pack",
      type: "batch_pack",
      description: "Batch is tied to a pack.",
      linkType: "bkg",
    },

    {
      id: "l_plant_depot",
      source: "plant",
      target: "depot",
      type: "supplies",
      description: "Plant supplies finished goods to depots.",
      linkType: "bkg",
    },
    {
      id: "l_shipment_from_plant",
      source: "shipment",
      target: "plant",
      type: "originates_from",
      description: "Shipment may originate from a plant.",
      linkType: "bkg",
    },
    {
      id: "l_shipment_from_depot",
      source: "shipment",
      target: "depot",
      type: "dispatches_from",
      description: "Shipment may dispatch from a depot.",
      linkType: "bkg",
    },
    {
      id: "l_shipment_to_wh",
      source: "shipment",
      target: "distributor_warehouse",
      type: "delivered_to",
      description: "Shipment is delivered to distributor warehouse.",
      linkType: "bkg",
    },
    {
      id: "l_shipment_lines",
      source: "shipment",
      target: "shipment_line",
      type: "has_line",
      description: "Shipment contains line items.",
      linkType: "bkg",
    },
    {
      id: "l_shipline_product",
      source: "shipment_line",
      target: "product",
      type: "item",
      description: "Shipment line references a SKU.",
      linkType: "bkg",
    },

    {
      id: "l_trip_vehicle",
      source: "delivery_trip",
      target: "vehicle",
      type: "uses",
      description: "Delivery trip uses a vehicle.",
      linkType: "bkg",
    },
    {
      id: "l_trip_route",
      source: "delivery_trip",
      target: "route",
      type: "serves",
      description: "Delivery trip serves a route/beat.",
      linkType: "bkg",
    },
    {
      id: "l_trip_drop",
      source: "delivery_trip",
      target: "delivery_drop",
      type: "has_drop",
      description: "Trip has delivery drops.",
      linkType: "bkg",
    },
    {
      id: "l_drop_customer",
      source: "delivery_drop",
      target: "customer",
      type: "delivers_to",
      description: "Drop is delivered to a customer.",
      linkType: "bkg",
    },

    {
      id: "l_visit_outlet",
      source: "outlet_visit",
      target: "retail_outlet",
      type: "visits",
      description: "Outlet visit occurs at an outlet.",
      linkType: "bkg",
    },
    {
      id: "l_visit_rep",
      source: "outlet_visit",
      target: "sales_rep",
      type: "performed_by",
      description: "Outlet visit performed by sales rep.",
      linkType: "bkg",
    },
    {
      id: "l_visit_date",
      source: "outlet_visit",
      target: "calendar_date",
      type: "occurred_on",
      description: "Visit occurs on a date.",
      linkType: "bkg",
    },
    {
      id: "l_visit_checklist",
      source: "outlet_visit",
      target: "visit_checklist",
      type: "includes",
      description: "Visit includes a checklist.",
      linkType: "bkg",
    },
    {
      id: "l_checklist_pos",
      source: "visit_checklist",
      target: "picture_of_success",
      type: "validated_against",
      description: "Checklist is validated against picture of success.",
      linkType: "bkg",
    },

    {
      id: "l_visit_posm",
      source: "outlet_visit",
      target: "posm_activity",
      type: "records",
      description: "Visit may record POSM/visibility activity.",
      linkType: "bkg",
    },
    {
      id: "l_visit_osa",
      source: "outlet_visit",
      target: "osa_observation",
      type: "records",
      description: "Visit records on-shelf availability observation.",
      linkType: "bkg",
    },
    {
      id: "l_visit_sos",
      source: "outlet_visit",
      target: "sos_observation",
      type: "records",
      description: "Visit records share-of-shelf observation.",
      linkType: "bkg",
    },
    {
      id: "l_visit_price",
      source: "outlet_visit",
      target: "price_check",
      type: "records",
      description: "Visit records price check.",
      linkType: "bkg",
    },
    {
      id: "l_visit_comp",
      source: "outlet_visit",
      target: "competition_sighting",
      type: "records",
      description: "Visit records competitive sighting.",
      linkType: "bkg",
    },

    {
      id: "l_osa_product",
      source: "osa_observation",
      target: "product",
      type: "for_product",
      description: "OSA is observed for a product.",
      linkType: "bkg",
    },
    {
      id: "l_sos_category",
      source: "sos_observation",
      target: "category",
      type: "for_category",
      description: "SOS is observed for a category.",
      linkType: "bkg",
    },
    {
      id: "l_pricecheck_product",
      source: "price_check",
      target: "product",
      type: "for_product",
      description: "Price check is for a product.",
      linkType: "bkg",
    },
    {
      id: "l_pricecheck_pricelist",
      source: "price_check",
      target: "price_list",
      type: "benchmarks",
      description: "Price check benchmarks against price list/MRP.",
      linkType: "bkg",
    },

    {
      id: "l_promo_plan_includes",
      source: "promotion_plan",
      target: "trade_promotion",
      type: "includes",
      description: "Promotion plan includes promotions.",
      linkType: "bkg",
    },
    {
      id: "l_promo_scheme",
      source: "trade_promotion",
      target: "trade_scheme",
      type: "has_scheme",
      description: "Promotion has one or more schemes.",
      linkType: "bkg",
    },
    {
      id: "l_scheme_slab",
      source: "trade_scheme",
      target: "discount_slab",
      type: "has_slab",
      description: "Scheme has discount slabs.",
      linkType: "bkg",
    },
    {
      id: "l_promo_product",
      source: "trade_promotion",
      target: "product",
      type: "applies_to",
      description: "Promotion applies to products/SKUs.",
      linkType: "bkg",
    },
    {
      id: "l_promo_channel",
      source: "trade_promotion",
      target: "channel",
      type: "runs_in",
      description: "Promotion runs in a channel.",
      linkType: "bkg",
    },
    {
      id: "l_promo_region",
      source: "trade_promotion",
      target: "region",
      type: "runs_in",
      description: "Promotion runs in a geography.",
      linkType: "bkg",
    },
    {
      id: "l_promo_claims",
      source: "trade_promotion",
      target: "claim",
      type: "can_generate",
      description: "Promotion may generate trade claims.",
      linkType: "bkg",
    },
    {
      id: "l_visibility_customer",
      source: "visibility_agreement",
      target: "customer",
      type: "agreed_with",
      description: "Visibility agreement is with a customer/outlet/account.",
      linkType: "bkg",
    },
    {
      id: "l_visibility_promo",
      source: "visibility_agreement",
      target: "trade_promotion",
      type: "linked_to",
      description: "Visibility agreement may be linked to a promotion.",
      linkType: "bkg",
    },

    {
      id: "l_salesrep_org",
      source: "sales_rep",
      target: "sales_org_unit",
      type: "part_of",
      description: "Sales rep belongs to a sales org unit.",
      linkType: "bkg",
    },
    {
      id: "l_salesmgr_org",
      source: "sales_manager",
      target: "sales_org_unit",
      type: "manages",
      description: "Manager manages a sales org unit.",
      linkType: "bkg",
    },
    {
      id: "l_rep_role",
      source: "sales_rep",
      target: "role",
      type: "has_role",
      description: "Sales rep has a role.",
      linkType: "bkg",
    },
    {
      id: "l_org_territory",
      source: "sales_org_unit",
      target: "territory",
      type: "owns",
      description: "Sales org unit owns a territory/patch.",
      linkType: "bkg",
    },

    {
      id: "l_incentive_role",
      source: "incentive_scheme",
      target: "role",
      type: "applicable_to",
      description: "Incentive scheme is applicable to a role.",
      linkType: "bkg",
    },
    {
      id: "l_payout_scheme",
      source: "incentive_payout",
      target: "incentive_scheme",
      type: "payout_for",
      description: "Payout is for an incentive scheme.",
      linkType: "bkg",
    },
    {
      id: "l_payout_rep",
      source: "incentive_payout",
      target: "sales_rep",
      type: "paid_to",
      description: "Payout is paid to sales rep.",
      linkType: "bkg",
    },

    {
      id: "l_forecast_product",
      source: "forecast",
      target: "product",
      type: "for_product",
      description: "Forecast is made for SKU.",
      linkType: "bkg",
    },
    {
      id: "l_forecast_territory",
      source: "forecast",
      target: "territory",
      type: "for_territory",
      description: "Forecast is made for territory.",
      linkType: "bkg",
    },
    {
      id: "l_forecast_channel",
      source: "forecast",
      target: "channel",
      type: "for_channel",
      description: "Forecast is made for channel.",
      linkType: "bkg",
    },

    {
      id: "l_target_product",
      source: "sales_target",
      target: "product",
      type: "for_product",
      description: "Target set for SKU.",
      linkType: "bkg",
    },
    {
      id: "l_target_org",
      source: "sales_target",
      target: "sales_org_unit",
      type: "for_unit",
      description: "Target set for org unit.",
      linkType: "bkg",
    },
    {
      id: "l_target_period",
      source: "sales_target",
      target: "calendar_date",
      type: "for_period",
      description: "Target set for a period/date grain.",
      linkType: "bkg",
    },

    {
      id: "l_achievement_target",
      source: "sales_achievement",
      target: "sales_target",
      type: "measured_against",
      description: "Achievement is measured against target.",
      linkType: "bkg",
    },
    {
      id: "l_achievement_primary",
      source: "sales_achievement",
      target: "primary_sale",
      type: "computed_from",
      description: "Achievement can be computed from primary sales.",
      linkType: "bkg",
    },
    {
      id: "l_achievement_secondary",
      source: "sales_achievement",
      target: "secondary_sale",
      type: "computed_from",
      description: "Achievement can be computed from secondary sales.",
      linkType: "bkg",
    },

    {
      id: "l_kpivalue_kpi",
      source: "kpi_value",
      target: "kpi",
      type: "is_value_of",
      description: "KPIValue is a measured value for a KPI definition.",
      linkType: "bkg",
    },
    {
      id: "l_kpivalue_product",
      source: "kpi_value",
      target: "product",
      type: "for_product",
      description: "KPIValue can be sliced by SKU.",
      linkType: "bkg",
    },
    {
      id: "l_kpivalue_territory",
      source: "kpi_value",
      target: "territory",
      type: "for_territory",
      description: "KPIValue can be sliced by territory.",
      linkType: "bkg",
    },
    {
      id: "l_kpivalue_date",
      source: "kpi_value",
      target: "calendar_date",
      type: "for_period",
      description: "KPIValue belongs to a time period.",
      linkType: "bkg",
    },

    {
      id: "l_scorecard_rep",
      source: "scorecard",
      target: "sales_rep",
      type: "for",
      description: "Scorecard can be for a rep.",
      linkType: "bkg",
    },
    {
      id: "l_scorecard_dist",
      source: "scorecard",
      target: "distributor",
      type: "for",
      description: "Scorecard can be for a distributor.",
      linkType: "bkg",
    },
    {
      id: "l_scorecard_unit",
      source: "scorecard",
      target: "sales_org_unit",
      type: "for",
      description: "Scorecard can be for an org unit.",
      linkType: "bkg",
    },
    {
      id: "l_scorecard_kpivalue",
      source: "scorecard",
      target: "kpi_value",
      type: "aggregates",
      description: "Scorecard aggregates KPI values.",
      linkType: "bkg",
    },

    {
      id: "l_potential_territory",
      source: "territory_potential",
      target: "territory",
      type: "for_territory",
      description: "Potential estimated for a territory.",
      linkType: "bkg",
    },
    {
      id: "l_potential_category",
      source: "territory_potential",
      target: "category",
      type: "for_category",
      description: "Potential estimated for a category.",
      linkType: "bkg",
    },

    {
      id: "l_marketshare_category",
      source: "market_share",
      target: "category",
      type: "for_category",
      description: "Market share for category.",
      linkType: "bkg",
    },
    {
      id: "l_marketshare_territory",
      source: "market_share",
      target: "territory",
      type: "for_territory",
      description: "Market share for territory.",
      linkType: "bkg",
    },
    {
      id: "l_panel_marketshare",
      source: "syndicated_panel",
      target: "market_share",
      type: "reports",
      description: "Panel reports market share metrics.",
      linkType: "bkg",
    },
    {
      id: "l_insight_panel",
      source: "category_insight",
      target: "syndicated_panel",
      type: "derived_from",
      description: "Category insights derived from syndicated panel.",
      linkType: "bkg",
    },
    {
      id: "l_insight_category",
      source: "category_insight",
      target: "category",
      type: "about",
      description: "Category insights are about a category.",
      linkType: "bkg",
    },

    {
      id: "l_consumer_complaint_consumer",
      source: "consumer_complaint",
      target: "consumer",
      type: "raised_by",
      description: "Complaint raised by a consumer.",
      linkType: "bkg",
    },
    {
      id: "l_consumer_complaint_product",
      source: "consumer_complaint",
      target: "product",
      type: "about_product",
      description: "Complaint references a product.",
      linkType: "bkg",
    },
    {
      id: "l_consumer_complaint_pack",
      source: "consumer_complaint",
      target: "pack",
      type: "about_pack",
      description: "Complaint references a pack.",
      linkType: "bkg",
    },
    {
      id: "l_consumer_complaint_outlet",
      source: "consumer_complaint",
      target: "retail_outlet",
      type: "reported_at",
      description: "Complaint can be tied to an outlet (where captured).",
      linkType: "bkg",
    },
    {
      id: "l_consumer_complaint_date",
      source: "consumer_complaint",
      target: "calendar_date",
      type: "occurred_on",
      description: "Complaint has a date.",
      linkType: "bkg",
    },

    {
      id: "l_consumer_feedback_consumer",
      source: "consumer_feedback",
      target: "consumer",
      type: "provided_by",
      description: "Feedback provided by consumers.",
      linkType: "bkg",
    },
    {
      id: "l_consumer_feedback_product",
      source: "consumer_feedback",
      target: "product",
      type: "about_product",
      description: "Feedback can reference products.",
      linkType: "bkg",
    },

    {
      id: "d_db_primary",
      source: "src_databricks",
      target: "primary_sale",
      type: "contains",
      description: "Databricks contains primary sales facts (sell-in).",
      linkType: "data",
      dataContext:
        "Primary sales information in Databricks; cuts/views/frequency discussed.",
    },
    {
      id: "d_db_secondary",
      source: "src_databricks",
      target: "secondary_sale",
      type: "contains",
      description:
        "Databricks contains secondary sales / sell-out proxy (where available).",
      linkType: "data",
      dataContext:
        "Sales ecosystem data in Databricks used for watchtower/segmentation/promo/RTM analysis.",
    },
    {
      id: "d_db_hierarchy",
      source: "src_databricks",
      target: "sales_org_unit",
      type: "maps",
      description:
        "Databricks hosts/feeds sales hierarchy mappings used for performance slicing.",
      linkType: "data",
      dataContext:
        "Field sales hierarchy structured from retailers to GCPL and HR.",
    },
    {
      id: "d_db_promos",
      source: "src_databricks",
      target: "trade_promotion",
      type: "contains",
      description:
        "Databricks contains promotion flags/structures (where modeled) for post-promo analysis.",
      linkType: "data",
      dataContext:
        "Promotion/post-promo analysis data capture highlighted as key need.",
    },

    {
      id: "d_anaplan_targets",
      source: "src_anaplan",
      target: "sales_target",
      type: "provides",
      description:
        "Anaplan provides planning/targets outside Databricks (not yet consolidated).",
      linkType: "data",
      dataContext: "Systems beyond Databricks like Anaplan were called out.",
    },
    {
      id: "d_anaplan_forecast",
      source: "src_anaplan",
      target: "forecast",
      type: "provides",
      description:
        "Anaplan can provide demand/volume plans/forecasts (as applicable).",
      linkType: "data",
    },

    {
      id: "d_panel_source",
      source: "src_nielsen_kantar",
      target: "syndicated_panel",
      type: "is_source_for",
      description: "Nielsen/Kantar as syndicated panel source.",
      linkType: "data",
    },
    {
      id: "d_panel_marketshare",
      source: "src_nielsen_kantar",
      target: "market_share",
      type: "feeds",
      description: "Syndicated data feeds market share metrics.",
      linkType: "data",
    },
    {
      id: "d_panel_insights",
      source: "src_nielsen_kantar",
      target: "category_insight",
      type: "feeds",
      description: "Syndicated data feeds category insights.",
      linkType: "data",
    },

    {
      id: "d_feedback_complaints",
      source: "src_consumer_feedback",
      target: "consumer_complaint",
      type: "feeds",
      description: "Consumer feedback sources feed complaints/cases.",
      linkType: "data",
    },
    {
      id: "d_feedback_general",
      source: "src_consumer_feedback",
      target: "consumer_feedback",
      type: "feeds",
      description:
        "Consumer feedback sources feed reviews/surveys and other feedback.",
      linkType: "data",
    },

    {
      id: "d_aws_forecast",
      source: "src_aws_planning",
      target: "forecast",
      type: "can_feed",
      description:
        "AWS planning outputs can feed forecasting layers (where applicable).",
      linkType: "data",
    },
    {
      id: "d_aws_inventory",
      source: "src_aws_planning",
      target: "depot_inventory_snapshot",
      type: "can_feed",
      description:
        "AWS planning outputs can be joined with inventory snapshots for planning/availability views.",
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

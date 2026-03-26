"use client";
import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const sf = '"IBM Plex Sans", system-ui, sans-serif';
const mono = '"JetBrains Mono", monospace';
const geo = '"Georgia", serif';

const MC = {
  Product:"#3A7CA5","Sales & Distribution":"#D4783C","Trade Promotion":"#C4534A",
  Channel:"#E8963C","Digital Shelf":"#2E8B8B",Pricing:"#D85A8C",
  "Inventory & Fulfillment":"#6B8CAE",Financial:"#5A7D5A",Competition:"#888480",
  Media:"#9B6B9E",Consumer:"#C49A3C",Geography:"#7B68AE",Time:"#A0A09A",
};
const MET_COL = "#B8860B";
const DEC_COL = "#8B2252";

const R_ONT = 10; // all ontology circles same size
const R_SKU = 26; // SKU bigger as center
const R_MET = 9;  // hexagons
const R_DEC = 11; // triangles

function hexPts(cx,cy,r){const p=[];for(let i=0;i<6;i++){const a=Math.PI/6+i*Math.PI/3;p.push(`${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`);}return p.join(" ");}
function triPts(cx,cy,r){return `${cx},${cy-r} ${cx+r*0.87},${cy+r*0.5} ${cx-r*0.87},${cy+r*0.5}`;}

// ═══ ONTOLOGY ═══
const ont=[
  {id:"SKU",label:"SKU",mod:"Product",sub:"entity",desc:"Atomic sellable unit",attrs:"sku_id, material_code, ASIN, FKID, barcode, MRP, pack_size, launch_date, status"},
  {id:"Category",label:"Category",mod:"Product",sub:"entity",desc:"Business division (Home Care, BPC, F&R)",attrs:"category_id, name"},
  {id:"Brand",label:"Brand",mod:"Product",sub:"entity",desc:"Consumer-facing brand identity",attrs:"brand_id, name, category, AOP_track, Nielsen_mapping, Kantar_mapping"},
  {id:"Variant",label:"Variant",mod:"Product",sub:"entity",desc:"Differentiation within brand",attrs:"variant_id, name, formulation, positioning"},
  {id:"PackFormat",label:"PackFormat",mod:"Product",sub:"entity",desc:"Packaging type (sachet/bottle/pouch/combo/refill)",attrs:"format_id, type, weight_volume"},
  {id:"Segment",label:"Segment",mod:"Product",sub:"entity",desc:"Price-tier (mass/masstige/premium)",attrs:"segment_id, tier"},
  {id:"UoM",label:"UoM",mod:"Product",sub:"entity",desc:"Unit of measure",attrs:"uom_id, base_unit, conversion_factor"},
  {id:"BOMComponent",label:"BOMComponent",mod:"Product",sub:"entity",desc:"Bill of materials for combo packs",attrs:"bom_id, component_sku, quantity"},
  {id:"SalesLine",label:"SalesLine",mod:"Sales & Distribution",sub:"event",desc:"Single line of a sales transaction",attrs:"line_id, sku, customer, qty, GSV, NSV, discount, date, channel",grain:"SKU x Customer x Day"},
  {id:"SalesOrder",label:"SalesOrder",mod:"Sales & Distribution",sub:"event",desc:"Header-level sales order",attrs:"order_id, customer, order_date, channel, status"},
  {id:"Customer",label:"Customer",mod:"Sales & Distribution",sub:"entity",desc:"Trade customer (distributor, retailer, key account)",attrs:"customer_id, name, type, channel, credit_terms, GSTIN, tier"},
  {id:"CustomerGroup",label:"CustomerGroup",mod:"Sales & Distribution",sub:"entity",desc:"Customer classification group",attrs:"group_id, name, channel_affinity"},
  {id:"Distributor",label:"Distributor",mod:"Sales & Distribution",sub:"entity",desc:"HUL direct trade customer in GT (~3500)",attrs:"dist_id, name, region, STR_days, margin_pct, active_beats"},
  {id:"Beat",label:"Beat",mod:"Sales & Distribution",sub:"entity",desc:"Salesman route (80-120 outlets)",attrs:"beat_id, distributor, outlet_count, frequency"},
  {id:"Outlet",label:"Outlet",mod:"Sales & Distribution",sub:"entity",desc:"Physical/virtual point of sale",attrs:"outlet_id, type (kirana/MT/dark_store), location, channel"},
  {id:"SalesProjection",label:"SalesProjection",mod:"Sales & Distribution",sub:"state",desc:"Forward sales estimate",attrs:"sku, geography, channel, period, projected_qty, projected_value",grain:"SKU x Geography x Channel x Month"},
  {id:"CoverageGap",label:"CoverageGap",mod:"Sales & Distribution",sub:"state",desc:"Distribution gap indicator (ND vs WD)",attrs:"sku, geography, ND, WD, gap_flag",grain:"SKU x Geography x Month"},
  {id:"TradeSpendEvent",label:"TradeSpendEvent",mod:"Trade Promotion",sub:"event",desc:"Actual trade spend transaction",attrs:"event_id, scheme, sku, amount, channel, date",grain:"Scheme x SKU x Day"},
  {id:"TradeSpendAllocation",label:"TradeSpendAllocation",mod:"Trade Promotion",sub:"state",desc:"Planned budget allocation",attrs:"alloc_id, brand, channel, budget, period, utilization_pct",grain:"Brand x Channel x Quarter"},
  {id:"PromoScheme",label:"PromoScheme",mod:"Trade Promotion",sub:"entity",desc:"Specific promotional offer definition",attrs:"scheme_id, name, mechanic, depth_pct, start, end, channel, status"},
  {id:"PromoMechanic",label:"PromoMechanic",mod:"Trade Promotion",sub:"entity",desc:"Mechanism type (BOGO/pct_off/cashback/bundle/qty_discount/loyalty)",attrs:"mechanic_id, type"},
  {id:"PromoEvent",label:"PromoEvent",mod:"Trade Promotion",sub:"entity",desc:"Calendar sale event (BBD, Republic Day)",attrs:"event_id, name, platform, dates"},
  {id:"SpendBucket",label:"SpendBucket",mod:"Trade Promotion",sub:"entity",desc:"Budget source (BTL/co_fund/platform_subsidy)",attrs:"bucket_id, type"},
  {id:"PromoCalendar",label:"PromoCalendar",mod:"Trade Promotion",sub:"state",desc:"Quarterly plan, weekly execution",attrs:"period, brand, schemes_planned, schemes_executed",grain:"Brand x Quarter"},
  {id:"ChannelType",label:"ChannelType",mod:"Channel",sub:"entity",desc:"Macro channel (GT/MT/Ecom/Qcom/D2C/CSD)",attrs:"channel_id, type"},
  {id:"Platform",label:"Platform",mod:"Channel",sub:"entity",desc:"Marketplace or retailer",attrs:"platform_id, name, type, commission_pct"},
  {id:"Listing",label:"Listing",mod:"Channel",sub:"entity",desc:"SKU instantiated on a platform",attrs:"listing_id, sku, platform, ASIN/FKID, status, content_score"},
  {id:"KeyAccount",label:"KeyAccount",mod:"Channel",sub:"entity",desc:"MT chain or platform HQ",attrs:"ka_id, name, channel, national_terms"},
  {id:"SearchKeyword",label:"SearchKeyword",mod:"Digital Shelf",sub:"entity",desc:"Category or branded search term",attrs:"keyword_id, term, category, branded_flag"},
  {id:"RankPosition",label:"RankPosition",mod:"Digital Shelf",sub:"state",desc:"Search rank snapshot",attrs:"listing, keyword, organic_rank, sponsored_rank, date",grain:"Listing x Keyword x Day"},
  {id:"ContentAsset",label:"ContentAsset",mod:"Digital Shelf",sub:"entity",desc:"Images, A+ content, video, description",attrs:"asset_id, listing, type, quality_score"},
  {id:"RatingReview",label:"RatingReview",mod:"Digital Shelf",sub:"entity",desc:"Star rating and review corpus",attrs:"listing, avg_rating, review_count, sentiment_score"},
  {id:"BuyBoxStatus",label:"BuyBoxStatus",mod:"Digital Shelf",sub:"state",desc:"Buy box win status (Amazon)",attrs:"listing, win_pct, date",grain:"Listing x Day"},
  {id:"PriceCondition",label:"PriceCondition",mod:"Pricing",sub:"state",desc:"Effective price at SKU x Channel x Day",attrs:"sku, channel, MRP, selling_price, effective_price, discount_pct, date",grain:"SKU x Channel x Day"},
  {id:"PriceContext",label:"PriceContext",mod:"Pricing",sub:"state",desc:"Cross-channel price comparison",attrs:"sku, min_price, max_price, channel_gap_pct, date",grain:"SKU x Day"},
  {id:"SupplyNode",label:"SupplyNode",mod:"Inventory & Fulfillment",sub:"entity",desc:"Physical stock location",attrs:"node_id, type, location, capacity"},
  {id:"InventoryPosition",label:"InventoryPosition",mod:"Inventory & Fulfillment",sub:"state",desc:"Stock qty at location",attrs:"sku, node, qty_on_hand, days_of_cover, date",grain:"SKU x SupplyNode x Day"},
  {id:"ShipmentLine",label:"ShipmentLine",mod:"Inventory & Fulfillment",sub:"event",desc:"Shipment of SKU between nodes",attrs:"line_id, sku, from_node, to_node, qty, ship_date, delivery_date"},
  {id:"InventoryMovement",label:"InventoryMovement",mod:"Inventory & Fulfillment",sub:"event",desc:"Stock transfer between nodes",attrs:"move_id, sku, from, to, qty, date"},
  {id:"OOSEvent",label:"OOSEvent",mod:"Inventory & Fulfillment",sub:"event",desc:"Out-of-stock occurrence + duration",attrs:"event_id, sku, node_or_listing, start, end, duration_hrs"},
  {id:"ATP",label:"ATP",mod:"Inventory & Fulfillment",sub:"state",desc:"Available-to-promise stock",attrs:"sku, node, atp_qty, committed_qty, date",grain:"SKU x SupplyNode x Day"},
  {id:"MarginStructure",label:"MarginStructure",mod:"Financial",sub:"state",desc:"Margin stack per SKU x Channel",attrs:"sku, channel, GSV, NSV, COGS, gross_margin, contrib_margin",grain:"SKU x Channel x Month"},
  {id:"CODBContext",label:"CODBContext",mod:"Financial",sub:"state",desc:"Platform cost of doing business",attrs:"platform, commission_pct, fulfillment_cost, return_cost, net_pct",grain:"Platform x Month"},
  {id:"PnLLine",label:"PnLLine",mod:"Financial",sub:"entity",desc:"P&L line item (GSV/NSV/GC/NC/A&P)",attrs:"line_id, type, amount, period"},
  {id:"CompBrand",label:"CompBrand",mod:"Competition",sub:"entity",desc:"Competitor brand (P&G/ITC/Patanjali/D2C)",attrs:"brand_id, company, name"},
  {id:"CompSKU",label:"CompSKU",mod:"Competition",sub:"entity",desc:"Competing product in same sub-category",attrs:"sku_id, brand, name, price"},
  {id:"CompActivity",label:"CompActivity",mod:"Competition",sub:"event",desc:"Competitor action (promo/launch/price change)",attrs:"act_id, brand, type, platform, date"},
  {id:"Campaign",label:"Campaign",mod:"Media",sub:"entity",desc:"Paid media campaign",attrs:"campaign_id, name, platform, type, budget"},
  {id:"AdFormat",label:"AdFormat",mod:"Media",sub:"entity",desc:"Ad format type",attrs:"format_id, type"},
  {id:"MediaSpendLine",label:"MediaSpendLine",mod:"Media",sub:"event",desc:"Media spend transaction",attrs:"line_id, campaign, amount, impressions, clicks, date"},
  {id:"ConsumerCohort",label:"ConsumerCohort",mod:"Consumer",sub:"entity",desc:"Consumer segment",attrs:"cohort_id, affluence_tier, urban_rural, age_band, channel_pref"},
  {id:"BasketComposition",label:"BasketComposition",mod:"Consumer",sub:"state",desc:"Co-purchase pattern",attrs:"basket_id, skus, frequency, avg_value, channel",grain:"Cohort x Channel x Quarter"},
  {id:"PurchaseOccasion",label:"PurchaseOccasion",mod:"Consumer",sub:"entity",desc:"Shopping mission",attrs:"occasion_id, type, channel_affinity"},
  {id:"Zone",label:"Zone",mod:"Geography",sub:"entity",desc:"Top sales geography",attrs:"zone_id, name"},
  {id:"State",label:"State",mod:"Geography",sub:"entity",desc:"ASM territory / Nielsen state",attrs:"state_id, name, zone"},
  {id:"City",label:"City",mod:"Geography",sub:"entity",desc:"WiMI planning unit",attrs:"city_id, name, state, tier"},
  {id:"MicroMarket",label:"MicroMarket",mod:"Geography",sub:"entity",desc:"Pin code / beat cluster",attrs:"mm_id, pin_codes, city"},
  {id:"FiscalPeriod",label:"FiscalPeriod",mod:"Time",sub:"entity",desc:"Fiscal quarter/year",attrs:"period_id, quarter, year"},
  {id:"TimeMonth",label:"TimeMonth",mod:"Time",sub:"entity",desc:"Calendar month",attrs:"month_id, year, month"},
  {id:"TimeWeek",label:"TimeWeek",mod:"Time",sub:"entity",desc:"ISO week",attrs:"week_id, year, week_num"},
];

const met=[
  {id:"M_SalesVol",label:"Sales Volume",desc:"Total units sold",uses:"SalesLine",by:"SKU, ChannelType, City, TimeMonth"},
  {id:"M_AvgMthSales",label:"Avg Monthly Sales",desc:"Rolling average sales value",uses:"SalesLine",by:"SKU, ChannelType, TimeMonth"},
  {id:"M_MktShare",label:"Market Share",desc:"Value/volume share in sub-category",uses:"SalesLine, CompSKU",by:"Brand, Category, State"},
  {id:"M_ND",label:"ND",desc:"Numeric distribution",uses:"CoverageGap",by:"SKU, City"},
  {id:"M_WD",label:"WD",desc:"Weighted distribution",uses:"CoverageGap, SalesLine",by:"SKU, City"},
  {id:"M_SoS",label:"Share of Search",desc:"Brand visibility on platform",uses:"RankPosition",by:"Brand, SearchKeyword, Platform"},
  {id:"M_OLA",label:"OLA",desc:"Online listing availability %",uses:"InventoryPosition, OOSEvent",by:"SKU, Platform"},
  {id:"M_PromoROI",label:"Promo ROI",desc:"Incremental margin / trade spend",uses:"TradeSpendEvent, SalesLine",by:"PromoScheme"},
  {id:"M_IncrVol",label:"Incr. Volume",desc:"Volume above baseline during promo",uses:"SalesLine, SalesProjection",by:"PromoScheme, SKU"},
  {id:"M_TSPct",label:"Trade Spend %",desc:"Trade spend as % of NSV",uses:"TradeSpendEvent, MarginStructure",by:"Brand, ChannelType"},
  {id:"M_GM",label:"Gross Margin",desc:"NSV minus COGS",uses:"MarginStructure",by:"SKU, ChannelType"},
  {id:"M_CM",label:"Contrib. Margin",desc:"NSV - CODB - COGS",uses:"MarginStructure, CODBContext",by:"SKU, ChannelType"},
  {id:"M_ROAS",label:"ROAS",desc:"Return on ad spend",uses:"MediaSpendLine, SalesLine",by:"Campaign, Platform"},
  {id:"M_Fill",label:"Fill Rate",desc:"Orders fulfilled vs ordered",uses:"SalesOrder, ShipmentLine",by:"SKU, ChannelType"},
  {id:"M_DoC",label:"Days of Cover",desc:"Stock days at run rate",uses:"InventoryPosition, SalesLine",by:"SKU, SupplyNode"},
  {id:"M_CS",label:"Content Score",desc:"Listing content quality",uses:"ContentAsset, Listing",by:"Listing"},
  {id:"M_CVR",label:"Conv. Rate",desc:"Views to purchase",uses:"Listing, SalesLine",by:"Listing, Platform"},
  {id:"M_PFreq",label:"Promo Frequency",desc:"Promo events per SKU per period",uses:"TradeSpendEvent",by:"SKU, ChannelType, TimeMonth"},
  {id:"M_Cann",label:"Cannib. Rate",desc:"Cross-SKU volume displacement",uses:"SalesLine, PromoScheme",by:"PromoScheme, Brand"},
  {id:"M_FwdBuy",label:"Forward Buy Idx",desc:"Pre/post promo loading ratio",uses:"SalesLine, PromoScheme",by:"SKU, Distributor"},
  {id:"M_PlanAtt",label:"Plan Attainment",desc:"Actual vs projected %",uses:"SalesLine, SalesProjection",by:"SKU, City, TimeMonth"},
  {id:"M_HHPen",label:"HH Penetration",desc:"Household penetration (Kantar)",uses:"ConsumerCohort",by:"Brand, City"},
  {id:"M_FcstAcc",label:"Forecast Accuracy",desc:"Forecast vs actual variance",uses:"SalesProjection, SalesLine",by:"SKU, City"},
];

const dec=[
  {id:"D_DistGap",label:"Distrib. Gap Close",desc:"Prioritize outlet addition where WD high but ND low",watch:"M_ND, M_WD",act:"SKU, Distributor, Beat, City"},
  {id:"D_Avail",label:"Availability Recovery",desc:"Trigger replenishment when OLA drops >5%",watch:"M_OLA, M_DoC",act:"Listing, InventoryPosition, SupplyNode"},
  {id:"D_SoS",label:"SoS Recovery",desc:"Reallocate BMI to defend keywords",watch:"M_SoS",act:"SearchKeyword, Campaign, CompActivity"},
  {id:"D_Content",label:"Content Refresh",desc:"Flag listings where content<P50 and CVR below avg",watch:"M_CS, M_CVR",act:"Listing, ContentAsset"},
  {id:"D_PROI",label:"Promo ROI Optim.",desc:"Adjust mechanic/depth when incrementality < threshold",watch:"M_PromoROI, M_IncrVol",act:"PromoScheme, PromoMechanic, SKU"},
  {id:"D_Realloc",label:"Spend Reallocation",desc:"Shift budget from over-spent to under-indexed channel",watch:"M_TSPct",act:"SpendBucket, ChannelType, Brand"},
  {id:"D_Overlap",label:"Promo Overlap",desc:"Flag 2+ schemes on same SKU x Channel",watch:"M_PFreq",act:"PromoScheme, PromoCalendar, SKU"},
  {id:"D_Cann",label:"Cannib. Alert",desc:"Brand-level impact when SKU A pulls from SKU B",watch:"M_Cann",act:"PromoScheme, SKU, Brand"},
  {id:"D_Depth",label:"Depth Optimization",desc:"Recommend alt mechanic at diminishing returns",watch:"M_PromoROI, M_IncrVol",act:"PromoScheme, PromoMechanic"},
  {id:"D_Comp",label:"Competitive Response",desc:"React to competitor promo in vulnerable geography",watch:"M_MktShare",act:"CompActivity, PromoScheme, State"},
  {id:"D_Price",label:"Channel Price Conflict",desc:"Flag cross-channel price gap > threshold",watch:"M_GM, M_CM",act:"SKU, ChannelType, PriceContext"},
  {id:"D_Margin",label:"Margin Erosion",desc:"RCA when contribution margin drops below floor",watch:"M_CM",act:"SKU, ChannelType, CODBContext, PromoScheme"},
  {id:"D_NPD",label:"NPD Activation",desc:"Track new launch ND/OLA vs target at T+30",watch:"M_ND, M_OLA",act:"SKU, Listing, Distributor, SupplyNode"},
  {id:"D_FwdBuy",label:"Forward Buy Detect",desc:"Detect distributor loading from post-promo dip",watch:"M_FwdBuy",act:"SKU, Distributor, PromoScheme"},
  {id:"D_Geo",label:"Geo-specific RCA",desc:"Localized root cause when share drops in a state",watch:"M_MktShare, M_ND, M_PlanAtt",act:"Brand, State, CompActivity"},
  {id:"D_FcstOvr",label:"Forecast Override",desc:"Adjust projection when plan attainment drifts >15%",watch:"M_PlanAtt, M_FcstAcc",act:"SalesProjection, SKU"},
];

const ontEdges=[
  ["SKU","Brand","BELONGS_TO"],["Brand","Category","BELONGS_TO"],["SKU","Variant","HAS_VARIANT"],["Variant","Brand","VARIANT_OF"],
  ["SKU","PackFormat","PACKAGED_AS"],["SKU","Segment","SEGMENTS_INTO"],["SKU","UoM","MEASURED_IN"],
  ["SKU","BOMComponent","HAS_BOM"],["BOMComponent","SKU","COMPONENT_OF"],
  ["SalesLine","SKU","SELLS_SKU"],["SalesLine","Customer","SOLD_TO"],["SalesLine","TimeMonth","IN_PERIOD"],
  ["SalesLine","PriceCondition","PRICED_AT"],["SalesOrder","SalesLine","CONTAINS_LINE"],["SalesOrder","Customer","ORDERED_BY"],
  ["Customer","CustomerGroup","MEMBER_OF"],["Customer","ChannelType","IN_CHANNEL"],
  ["Distributor","Customer","IS_CUSTOMER"],["Distributor","Beat","COVERS"],["Beat","MicroMarket","WITHIN"],
  ["Beat","Outlet","SERVES"],["Outlet","MicroMarket","LOCATED_IN"],["Outlet","ChannelType","IN_CHANNEL"],
  ["Distributor","SKU","STOCKS_SKU"],["SalesProjection","SKU","PROJECTS_SKU"],["SalesProjection","City","FOR_CITY"],
  ["CoverageGap","SKU","GAP_FOR_SKU"],["CoverageGap","City","GAP_IN_CITY"],["KeyAccount","Customer","IS_CUSTOMER"],
  ["TradeSpendEvent","PromoScheme","SPENDS_ON"],["TradeSpendEvent","SKU","FOR_SKU"],["TradeSpendEvent","ChannelType","IN_CHANNEL"],
  ["TradeSpendAllocation","Brand","ALLOCATED_TO"],["TradeSpendAllocation","ChannelType","FOR_CHANNEL"],
  ["PromoScheme","SKU","APPLIED_TO"],["PromoScheme","PromoMechanic","USES_MECHANIC"],["PromoScheme","SpendBucket","FUNDED_BY"],
  ["PromoScheme","PromoEvent","PART_OF"],["PromoScheme","Platform","RUNS_ON"],["PromoScheme","ChannelType","RUNS_IN"],
  ["PromoCalendar","PromoScheme","SCHEDULES"],["PromoCalendar","FiscalPeriod","FOR_PERIOD"],
  ["Platform","ChannelType","IS_TYPE"],["Listing","SKU","LISTS_SKU"],["Listing","Platform","ON_PLATFORM"],["KeyAccount","Platform","OPERATES"],
  ["Listing","SearchKeyword","RANKED_FOR"],["Listing","ContentAsset","HAS_CONTENT"],["Listing","RatingReview","HAS_RATING"],
  ["RankPosition","Listing","RANK_OF"],["RankPosition","SearchKeyword","FOR_KEYWORD"],["BuyBoxStatus","Listing","BUYBOX_FOR"],
  ["PriceCondition","SKU","PRICES_SKU"],["PriceCondition","ChannelType","IN_CHANNEL"],["PriceContext","SKU","CONTEXT_FOR"],
  ["InventoryPosition","SKU","HOLDS_SKU"],["InventoryPosition","SupplyNode","AT_NODE"],
  ["ShipmentLine","SKU","SHIPS_SKU"],["ShipmentLine","SupplyNode","FROM_NODE"],["ShipmentLine","SalesOrder","FULFILLS"],
  ["InventoryMovement","SKU","MOVES_SKU"],["InventoryMovement","SupplyNode","AT_NODE"],
  ["OOSEvent","Listing","AFFECTS_LISTING"],["OOSEvent","InventoryPosition","CAUSED_BY"],
  ["ATP","SKU","ATP_FOR"],["ATP","SupplyNode","AT_NODE"],["SupplyNode","Platform","FEEDS"],["SupplyNode","City","LOCATED_IN"],
  ["MarginStructure","SKU","MARGIN_FOR"],["MarginStructure","ChannelType","IN_CHANNEL"],
  ["CODBContext","Platform","CODB_FOR"],["PnLLine","Brand","PNL_FOR"],
  ["CompSKU","CompBrand","BELONGS_TO"],["CompSKU","SKU","COMPETES_WITH"],
  ["CompActivity","CompBrand","BY_BRAND"],["CompActivity","Platform","ON_PLATFORM"],
  ["Campaign","Listing","TARGETS"],["Campaign","AdFormat","USES_FORMAT"],["Campaign","SearchKeyword","BIDS_ON"],
  ["MediaSpendLine","Campaign","SPEND_FOR"],
  ["ConsumerCohort","ChannelType","PREFERS"],["BasketComposition","SKU","CONTAINS_SKU"],
  ["BasketComposition","ConsumerCohort","BY_COHORT"],["PurchaseOccasion","ChannelType","DRIVES"],
  ["MicroMarket","City","IN_CITY"],["City","State","IN_STATE"],["State","Zone","IN_ZONE"],
  ["TimeWeek","TimeMonth","IN_MONTH"],["TimeMonth","FiscalPeriod","IN_PERIOD"],
];

const mEdges=met.flatMap(m=>m.uses.split(", ").filter(Boolean).map(u=>[m.id,u,"USES_INPUT"]));
const dEdges=dec.flatMap(d=>d.watch.split(", ").filter(Boolean).map(w=>[d.id,w,"USES_METRIC"]));

const allNodes=[
  ...ont.map(n=>({...n,shape:"circle"})),
  ...met.map(n=>({...n,shape:"hexagon"})),
  ...dec.map(n=>({...n,shape:"triangle"})),
];
const nodeMap={};allNodes.forEach(n=>{nodeMap[n.id]=n;});

const allEdges=[
  ...ontEdges.map(([s,t,r])=>({s,t,rel:r,kind:"ont"})),
  ...mEdges.map(([s,t,r])=>({s,t,rel:r,kind:"met"})),
  ...dEdges.map(([s,t,r])=>({s,t,rel:r,kind:"dec"})),
].filter(e=>nodeMap[e.s]&&nodeMap[e.t]);

function getCol(n){
  if(n.shape==="hexagon") return MET_COL;
  if(n.shape==="triangle") return DEC_COL;
  return MC[n.mod]||"#888";
}

export default function App(){
  const svgRef=useRef(null);
  const [selected,setSelected]=useState(null);

  useEffect(()=>{
    const W=1400,H=1000;
    const svg=d3.select(svgRef.current).attr("viewBox",`0 0 ${W} ${H}`);
    svg.selectAll("*").remove();
    const g=svg.append("g");

    const simNodes=allNodes.map(n=>{
      const r=n.id==="SKU"?R_SKU:n.shape==="hexagon"?R_MET:n.shape==="triangle"?R_DEC:R_ONT;
      return {...n,r,fx:n.id==="SKU"?W/2:undefined,fy:n.id==="SKU"?H/2:undefined};
    });
    const simEdges=allEdges.map(e=>({...e,source:e.s,target:e.t}));

    const sim=d3.forceSimulation(simNodes)
      .force("link",d3.forceLink(simEdges).id(d=>d.id).distance(d=>{
        if(d.kind!=="ont")return 30;
        if(d.s==="SKU"||d.t==="SKU")return 70;
        const a=nodeMap[d.s],b=nodeMap[d.t];
        return a&&b&&a.mod===b.mod?40:65;
      }).strength(d=>d.kind!=="ont"?0.45:0.13))
      .force("charge",d3.forceManyBody().strength(d=>d.id==="SKU"?-1000:d.shape==="hexagon"?-18:d.shape==="triangle"?-30:-55).distanceMax(400))
      .force("center",d3.forceCenter(W/2,H/2).strength(0.03))
      .force("collision",d3.forceCollide().radius(d=>d.r+3))
      .force("x",d3.forceX(W/2).strength(0.012))
      .force("y",d3.forceY(H/2).strength(0.012))
      .alphaDecay(0.011);

    sim.on("tick",()=>{
      g.selectAll("*").remove();

      // edges
      simEdges.forEach(e=>{
        if(!e.source.x||!e.target.x)return;
        const isM=e.kind==="met",isD=e.kind==="dec";
        g.append("line")
          .attr("x1",e.source.x).attr("y1",e.source.y).attr("x2",e.target.x).attr("y2",e.target.y)
          .attr("stroke",isD?DEC_COL:isM?MET_COL:"#000")
          .attr("stroke-opacity",isM||isD?0.08:0.1)
          .attr("stroke-width",isM||isD?0.3:0.6)
          .attr("stroke-dasharray",isM||isD?"2 2":"none");

        // rel label on ontology edges
        if(!isM&&!isD){
          const dx=e.target.x-e.source.x,dy=e.target.y-e.source.y;
          const dist=Math.sqrt(dx*dx+dy*dy);
          if(dist>55){
            const mx=(e.source.x+e.target.x)/2,my=(e.source.y+e.target.y)/2;
            let ang=Math.atan2(dy,dx)*180/Math.PI;
            if(ang>90||ang<-90)ang+=180;
            g.append("text").attr("x",mx).attr("y",my-2).attr("text-anchor","middle")
              .attr("font-size","5px").attr("font-family",mono).attr("fill","#000").attr("fill-opacity",0.2)
              .attr("transform",`rotate(${ang} ${mx} ${my})`).text(e.rel);
          }
        }
      });

      // nodes
      simNodes.forEach(n=>{
        if(!n.x)return;
        const col=getCol(n);
        const ng=g.append("g").attr("transform",`translate(${n.x},${n.y})`)
          .style("cursor","pointer")
          .on("click",()=>setSelected(p=>p===n.id?null:n.id));

        if(n.shape==="hexagon"){
          ng.append("polygon").attr("points",hexPts(0,0,n.r)).attr("fill",col).attr("stroke","#fff").attr("stroke-width",0.8).attr("opacity",0.9);
        }else if(n.shape==="triangle"){
          ng.append("polygon").attr("points",triPts(0,0,n.r)).attr("fill",col).attr("stroke","#fff").attr("stroke-width",0.8).attr("opacity",0.9);
        }else{
          ng.append("circle").attr("r",n.r).attr("fill",col).attr("stroke","#fff").attr("stroke-width",1).attr("opacity",0.9);
        }

        ng.append("text").attr("y",n.r+10).attr("text-anchor","middle")
          .attr("font-size",n.id==="SKU"?"11px":n.shape!=="circle"?"6px":"7.5px")
          .attr("font-weight",n.id==="SKU"?700:400)
          .attr("font-family",sf).attr("fill","#1C1C1C").text(n.label);
      });
    });

    svg.call(d3.zoom().scaleExtent([0.2,4]).on("zoom",ev=>{g.attr("transform",ev.transform);}));
    return ()=>sim.stop();
  },[]);

  const sel=selected?nodeMap[selected]:null;
  const conn=selected?allEdges.filter(e=>e.s===selected||e.t===selected):[];

  return(
    <div style={{fontFamily:sf,background:"#FAFAF8",minHeight:"100vh"}}>
      <div style={{padding:"14px 18px 6px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"}}>
        <div>
          <div style={{fontFamily:geo,fontSize:18,fontWeight:600,color:"#1C1C1C"}}>HUL Business Knowledge Graph</div>
          <div style={{fontSize:10,color:"#555",fontFamily:mono,marginTop:2}}>
            {ont.length} ontology, {met.length} metrics, {dec.length} decisions, {allEdges.length} edges
          </div>
        </div>
        <div style={{display:"flex",gap:12,fontSize:9,fontFamily:mono,color:"#999",alignItems:"center"}}>
          <span style={{display:"flex",alignItems:"center",gap:3}}><svg width="10" height="10"><circle cx="5" cy="5" r="4" fill="#3A7CA5"/></svg> ontology</span>
          <span style={{display:"flex",alignItems:"center",gap:3}}><svg width="12" height="11"><polygon points={hexPts(6,5.5,5)} fill={MET_COL}/></svg> metric</span>
          <span style={{display:"flex",alignItems:"center",gap:3}}><svg width="10" height="10"><polygon points="5,1 9,9 1,9" fill={DEC_COL}/></svg> decision</span>
        </div>
      </div>
      <div style={{padding:"0 18px 6px",display:"flex",gap:5,flexWrap:"wrap",fontSize:8,fontFamily:mono}}>
        {Object.entries(MC).map(([k,v])=>(
          <span key={k} style={{color:"#999",display:"flex",alignItems:"center",gap:2}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:v,display:"inline-block"}}/>{k}
          </span>
        ))}
      </div>

      <div style={{margin:"0 12px",background:"#fff",border:"1px solid #E5E2DB",borderRadius:8,overflow:"hidden",position:"relative"}}>
        <svg ref={svgRef} width="100%" style={{display:"block",minHeight:selected?480:640}}/>
        <div style={{position:"absolute",bottom:6,right:12,fontSize:8,fontFamily:mono,color:"#ccc"}}>scroll to zoom, drag to pan, click node for details</div>
      </div>

      {sel&&(
        <div style={{margin:"10px 12px",background:"#fff",borderRadius:8,border:"1px solid #E5E2DB",padding:"14px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <svg width="14" height="14" style={{flexShrink:0}}>
              {sel.shape==="circle"&&<circle cx="7" cy="7" r="6" fill={getCol(sel)}/>}
              {sel.shape==="hexagon"&&<polygon points={hexPts(7,7,6)} fill={MET_COL}/>}
              {sel.shape==="triangle"&&<polygon points={triPts(7,7,6)} fill={DEC_COL}/>}
            </svg>
            <span style={{fontWeight:600,fontSize:15,color:"#1C1C1C"}}>{sel.label}</span>
            <span style={{fontSize:9,fontFamily:mono,color:"#999",background:"#F5F5F0",padding:"2px 6px",borderRadius:4}}>
              {sel.shape==="circle"?(sel.sub||"entity"):sel.shape==="hexagon"?"metric":"decision"}
            </span>
            {sel.mod&&sel.shape==="circle"&&<span style={{fontSize:9,fontFamily:mono,color:MC[sel.mod]||"#777"}}>{sel.mod}</span>}
          </div>
          {sel.desc&&<div style={{fontSize:12,color:"#555",marginBottom:6}}>{sel.desc}</div>}
          {sel.attrs&&<div style={{fontSize:10,fontFamily:mono,color:"#777",marginBottom:4,lineHeight:1.7}}><span style={{color:"#bbb",fontSize:9,fontWeight:600}}>ATTRS </span>{sel.attrs}</div>}
          {sel.grain&&<div style={{fontSize:10,fontFamily:mono,color:"#B8860B",marginBottom:4}}><span style={{color:"#bbb",fontSize:9,fontWeight:600}}>GRAIN </span>{sel.grain}</div>}
          {sel.uses&&<div style={{fontSize:10,fontFamily:mono,color:"#777",marginBottom:4}}><span style={{color:"#bbb",fontSize:9,fontWeight:600}}>USES_INPUT </span>{sel.uses}</div>}
          {sel.by&&<div style={{fontSize:10,fontFamily:mono,color:"#777",marginBottom:4}}><span style={{color:"#bbb",fontSize:9,fontWeight:600}}>GROUPED_BY </span>{sel.by}</div>}
          {sel.watch&&<div style={{fontSize:10,fontFamily:mono,color:DEC_COL,marginBottom:4}}><span style={{color:"#bbb",fontSize:9,fontWeight:600}}>WATCHES </span>{sel.watch}</div>}
          {sel.act&&<div style={{fontSize:10,fontFamily:mono,color:DEC_COL,marginBottom:4}}><span style={{color:"#bbb",fontSize:9,fontWeight:600}}>ACTS_ON </span>{sel.act}</div>}

          {conn.length>0&&(
            <div style={{marginTop:10,borderTop:"1px solid #E5E2DB",paddingTop:8}}>
              <div style={{fontSize:9,fontFamily:mono,color:"#999",marginBottom:6,fontWeight:600}}>{conn.length} connections</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {conn.map((e,i)=>{
                  const other=e.s===selected?e.t:e.s;
                  const dir=e.s===selected;
                  const on=nodeMap[other];if(!on)return null;
                  return(
                    <span key={i} onClick={()=>setSelected(other)} style={{
                      background:"#F8F8F5",border:"1px solid #E5E2DB",padding:"3px 7px",borderRadius:4,
                      fontSize:9,fontFamily:mono,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:3
                    }}>
                      <span style={{color:"#ccc"}}>{dir?"->":"<-"}</span>
                      <span style={{color:"#999"}}>{e.rel}</span>
                      <span style={{color:getCol(on),fontWeight:500}}>{on.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{padding:"6px 18px 14px",fontFamily:mono,fontSize:9,color:"#ccc",display:"flex",justifyContent:"space-between"}}>
        <span>questt. Intelligence Warehouse</span>
        <span>HUL omnichannel sales + TPO</span>
      </div>
    </div>
  );
}

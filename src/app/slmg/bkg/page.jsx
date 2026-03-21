"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

const C = { bg:"#FAFAF8",card:"#FFFFFF",border:"#E5E2DB",ink:"#1C1C1C",sub:"#555555",muted:"#999999",accent:"#2D5A3D",red:"#B44040",amber:"#C4873B",teal:"#2D8A6E",blue:"#3B6FB4" };
const font="'IBM Plex Sans',sans-serif", serif="Georgia,serif", mono="'JetBrains Mono',monospace";
const DC = { Outlet:"#4A90A4",Distribution:"#6B7FA3","Trade Spend":"#C4873B",Product:"#7A9E5A",Competition:"#B44040",Geography:"#8B7EC8","Sales Force":"#5B9E9E",metric:"#2D5A3D",decision:"#B44040" };
const domains = ["Outlet","Distribution","Trade Spend","Product","Competition","Geography","Sales Force"];

// ═══ LAYER 1: ONTOLOGY (30 entities, full data_mapping) ═══
const ontologyNodes = [
  { id:"E_Outlet",label:"Outlet",domain:"Outlet",size:14,
    def:"Atomic unit of trade. Every kirana, MT store, HoReCa, pan shop, convenience outlet in SLMG territory.",
    grain:"Single physical retail point identified by unique outlet code",
    attributes:["outlet_code","outlet_name","lat","lng","pincode","channel_type","town_class","urban_rural_flag","is_active","onboarding_date","threat_classification"],
    data_mapping:{primary_table:"d365.customer_master",primary_key:"outlet_code",
      base_query:"SELECT cm.outlet_code, cm.outlet_name, cm.lat, cm.lng, cm.pincode,\n       cm.channel_type, cm.town_class, cm.urban_rural_flag, cm.is_active,\n       cm.onboarding_date, ot.threat_classification\nFROM d365.customer_master cm\nLEFT JOIN analytics.outlet_threat ot ON ot.outlet_code = cm.outlet_code\nWHERE cm.is_active = 1",
      filters:{by_outlet:"AND cm.outlet_code = :outlet_code",by_zone:"AND cm.zone_code = :zone_code",by_channel:"AND cm.channel_type = :channel_type",by_threat:"AND ot.threat_classification = :threat_class",by_town_class:"AND cm.town_class = :town_class"},
      joins_to_other_nodes:{Distributor:{join_sql:"JOIN dms.distributor_outlet_map dom ON dom.outlet_code = cm.outlet_code",join_key:"outlet_code"},Beat:{join_sql:"JOIN dms.beat_outlet_map bom ON bom.outlet_code = cm.outlet_code",join_key:"outlet_code"},CoolerAsset:{join_sql:"LEFT JOIN d365.fixed_assets fa ON fa.placed_at_outlet = cm.outlet_code AND fa.asset_category = 'COOLER'",join_key:"outlet_code"},Zone:{join_sql:"JOIN d365.org_structure os ON os.territory_code = cm.territory_code",join_key:"territory_code"}}}},
  { id:"E_CoolerAsset",label:"Cooler Asset",domain:"Outlet",size:10,
    def:"SLMG-owned refrigeration equipment placed at outlet. Capital asset (Rs 15-25K) tied to exclusivity agreement.",
    grain:"Single cooler unit by asset tag",
    attributes:["asset_id","asset_tag","cooler_type","capacity_shelves","placement_date","exclusivity_flag","outlet_code"],
    data_mapping:{primary_table:"d365.fixed_assets",primary_key:"asset_id",
      base_query:"SELECT fa.asset_id, fa.asset_tag, fa.cooler_type, fa.capacity_shelves,\n       fa.placement_date, fa.exclusivity_flag, fa.placed_at_outlet AS outlet_code\nFROM d365.fixed_assets fa\nWHERE fa.asset_category = 'COOLER' AND fa.status = 'ACTIVE'",
      filters:{by_outlet:"AND fa.placed_at_outlet = :outlet_code",by_type:"AND fa.cooler_type = :cooler_type"},
      joins_to_other_nodes:{Outlet:{join_sql:"JOIN d365.customer_master cm ON cm.outlet_code = fa.placed_at_outlet",join_key:"outlet_code"}}}},
  { id:"E_ShelfPosition",label:"Shelf Position",domain:"Outlet",size:9,
    def:"Physical placement/visibility of SLMG products at outlet. Captured via salesman audit or image recognition.",
    grain:"Outlet x Position Type x Audit Date",
    attributes:["audit_id","outlet_code","position_type","slmg_share_pct","competitor_share_pct","audit_date","source"],
    data_mapping:{primary_table:"sfa.shelf_audit",primary_key:"audit_id",
      base_query:"SELECT sa.audit_id, sa.outlet_code, sa.position_type,\n       sa.slmg_share_pct, sa.competitor_share_pct, sa.audit_date, sa.source\nFROM sfa.shelf_audit sa\nWHERE 1=1",
      filters:{by_outlet:"AND sa.outlet_code = :outlet_code",by_date_range:"AND sa.audit_date BETWEEN :start_date AND :end_date"},
      joins_to_other_nodes:{Outlet:{join_sql:"JOIN d365.customer_master cm ON cm.outlet_code = sa.outlet_code",join_key:"outlet_code"}}}},
  { id:"E_RetailerCredit",label:"Retailer Credit",domain:"Outlet",size:8,
    def:"Credit terms extended to outlet by distributor. Affects stickiness and switching cost.",
    grain:"Outlet x Distributor",
    attributes:["outlet_code","distributor_code","credit_limit_rs","credit_period_days","outstanding_rs","overdue_flag"],
    data_mapping:{primary_table:"dms.retailer_ledger",primary_key:["outlet_code","distributor_code"],
      base_query:"SELECT rl.outlet_code, rl.distributor_code, rl.credit_limit_rs,\n       rl.credit_period_days, rl.outstanding_rs,\n       CASE WHEN rl.days_overdue > 0 THEN 1 ELSE 0 END AS overdue_flag\nFROM dms.retailer_ledger rl\nWHERE 1=1",
      filters:{by_outlet:"AND rl.outlet_code = :outlet_code",by_distributor:"AND rl.distributor_code = :distributor_code",by_overdue:"AND rl.days_overdue > 0"},
      joins_to_other_nodes:{Outlet:{join_sql:"JOIN d365.customer_master cm ON cm.outlet_code = rl.outlet_code",join_key:"outlet_code"},Distributor:{join_sql:"JOIN dms.distributor_master dm ON dm.distributor_code = rl.distributor_code",join_key:"distributor_code"}}}},
  { id:"E_Distributor",label:"Distributor",domain:"Distribution",size:13,
    def:"Independent business entity contracted to distribute SLMG products. Owns working capital, fleet, salesmen.",
    grain:"Single distributor by distributor code",
    attributes:["distributor_code","name","territory_pincodes","warehouse_location","credit_limit_rs","is_multi_brand","active_since","num_outlets_assigned","num_outlets_billed"],
    data_mapping:{primary_table:"dms.distributor_master",primary_key:"distributor_code",
      base_query:"SELECT dm.distributor_code, dm.name, dm.territory_pincodes,\n       dm.warehouse_location, dm.credit_limit_rs, dm.is_multi_brand, dm.active_since,\n       (SELECT COUNT(*) FROM dms.distributor_outlet_map dom WHERE dom.distributor_code = dm.distributor_code) AS num_outlets_assigned,\n       (SELECT COUNT(DISTINCT outlet_code) FROM dms.orders o WHERE o.distributor_code = dm.distributor_code AND o.order_date >= CURRENT_DATE - INTERVAL '28 days') AS num_outlets_billed\nFROM dms.distributor_master dm\nWHERE dm.is_active = 1",
      filters:{by_distributor:"AND dm.distributor_code = :distributor_code",by_zone:"AND dm.zone_code = :zone_code",by_territory:"AND dm.territory_code = :territory_code",multi_brand_only:"AND dm.is_multi_brand = 1"},
      joins_to_other_nodes:{Outlet:{join_sql:"JOIN dms.distributor_outlet_map dom ON dom.distributor_code = dm.distributor_code",join_key:"distributor_code"},ASMTerritory:{join_sql:"JOIN d365.org_structure os ON os.territory_code = dm.territory_code",join_key:"territory_code"},Warehouse:{join_sql:"LEFT JOIN d365.warehouse_master wm ON wm.distributor_code = dm.distributor_code",join_key:"distributor_code"}}}},
  { id:"E_Beat",label:"Beat",domain:"Distribution",size:11,
    def:"Predefined route for salesman visits. Fixed outlet sequence visited on specific weekdays.",
    grain:"Beat code within distributor territory",
    attributes:["beat_code","distributor_code","day_of_week","outlet_count","distance_km"],
    data_mapping:{primary_table:"dms.beat_master",primary_key:"beat_code",
      base_query:"SELECT bm.beat_code, bm.distributor_code, bm.day_of_week, bm.outlet_count, bm.distance_km\nFROM dms.beat_master bm WHERE bm.is_active = 1",
      filters:{by_distributor:"AND bm.distributor_code = :distributor_code",by_day:"AND bm.day_of_week = :day_of_week"},
      joins_to_other_nodes:{Distributor:{join_sql:"JOIN dms.distributor_master dm ON dm.distributor_code = bm.distributor_code",join_key:"distributor_code"},Outlet:{join_sql:"JOIN dms.beat_outlet_map bom ON bom.beat_code = bm.beat_code",join_key:"beat_code"},Salesman:{join_sql:"JOIN dms.salesman_beat_assign sba ON sba.beat_code = bm.beat_code",join_key:"beat_code"}}}},
  { id:"E_Warehouse",label:"Warehouse",domain:"Distribution",size:10,
    def:"Storage facility holding finished goods. SLMG-owned (plant-attached) or distributor-owned (field depot).",
    grain:"Single warehouse by location code",
    attributes:["warehouse_code","type","zone_code","capacity_cases","current_inventory_cases","cold_storage_flag"],
    data_mapping:{primary_table:"d365.warehouse_master",primary_key:"warehouse_code",
      base_query:"SELECT wm.warehouse_code, wm.type, wm.zone_code, wm.capacity_cases, wm.current_inventory_cases, wm.cold_storage_flag\nFROM d365.warehouse_master wm WHERE wm.is_active = 1",
      filters:{by_zone:"AND wm.zone_code = :zone_code",by_type:"AND wm.type = :warehouse_type"},
      joins_to_other_nodes:{Zone:{join_sql:"JOIN d365.org_structure os ON os.zone_code = wm.zone_code",join_key:"zone_code"}}}},
  { id:"E_DeliveryOrder",label:"Delivery Order",domain:"Distribution",size:9,
    def:"Order placed by outlet through distributor. The transactional heartbeat of the system.",
    grain:"Single order by order_id with line items",
    attributes:["order_id","outlet_code","distributor_code","order_date","sku_code","qty_cases","delivery_date","is_on_time","is_in_full"],
    data_mapping:{primary_table:"dms.orders",primary_key:"order_id",
      base_query:"SELECT o.order_id, o.outlet_code, o.distributor_code, o.order_date,\n       ol.sku_code, ol.qty_cases, o.delivery_date,\n       CASE WHEN o.delivery_date <= o.promised_date THEN 1 ELSE 0 END AS is_on_time,\n       CASE WHEN ol.qty_delivered >= ol.qty_ordered THEN 1 ELSE 0 END AS is_in_full\nFROM dms.orders o\nJOIN dms.order_lines ol ON ol.order_id = o.order_id WHERE 1=1",
      filters:{by_outlet:"AND o.outlet_code = :outlet_code",by_distributor:"AND o.distributor_code = :distributor_code",by_date_range:"AND o.order_date BETWEEN :start_date AND :end_date",by_sku:"AND ol.sku_code = :sku_code"},
      joins_to_other_nodes:{Outlet:{join_sql:"JOIN d365.customer_master cm ON cm.outlet_code = o.outlet_code",join_key:"outlet_code"},Distributor:{join_sql:"JOIN dms.distributor_master dm ON dm.distributor_code = o.distributor_code",join_key:"distributor_code"},SKU:{join_sql:"JOIN d365.material_master mm ON mm.sku_code = ol.sku_code",join_key:"sku_code"}}}},
  { id:"E_Fleet",label:"Fleet Vehicle",domain:"Distribution",size:8,
    def:"Delivery vehicle. Capacity and route determine outlet service frequency.",
    grain:"Single vehicle by registration",attributes:["vehicle_id","distributor_code","capacity_cases","vehicle_type","daily_routes","gps_tracked_flag"],
    data_mapping:{primary_table:"dms.fleet_master",primary_key:"vehicle_id",
      base_query:"SELECT fm.vehicle_id, fm.distributor_code, fm.capacity_cases, fm.vehicle_type, fm.daily_routes, fm.gps_tracked_flag\nFROM dms.fleet_master fm WHERE fm.is_active = 1",
      filters:{by_distributor:"AND fm.distributor_code = :distributor_code"},
      joins_to_other_nodes:{Distributor:{join_sql:"JOIN dms.distributor_master dm ON dm.distributor_code = fm.distributor_code",join_key:"distributor_code"}}}},
  { id:"E_Scheme",label:"Scheme",domain:"Trade Spend",size:14,
    def:"Trade promotion program with defined mechanic, budget, eligibility, and duration. Primary lever for influencing outlet behavior.",
    grain:"Single scheme by scheme_code and period",
    attributes:["scheme_code","name","mechanic_type","start_date","end_date","budget_rs","eligible_zones","eligible_channels","min_qty_trigger","payout_per_case_rs","is_active"],
    data_mapping:{primary_table:"scheme.scheme_master",primary_key:"scheme_code",
      base_query:"SELECT sm.scheme_code, sm.name, sm.mechanic_type, sm.start_date, sm.end_date,\n       sm.budget_rs, sm.eligible_zones, sm.eligible_channels,\n       sm.min_qty_trigger, sm.payout_per_case_rs, sm.is_active\nFROM scheme.scheme_master sm WHERE 1=1",
      filters:{by_scheme:"AND sm.scheme_code = :scheme_code",by_mechanic:"AND sm.mechanic_type = :mechanic_type",by_zone:"AND sm.eligible_zones @> ARRAY[:zone_code]",active_only:"AND sm.is_active = 1 AND CURRENT_DATE BETWEEN sm.start_date AND sm.end_date"},
      joins_to_other_nodes:{BudgetEnvelope:{join_sql:"JOIN scheme.budget_allocation ba ON ba.scheme_code = sm.scheme_code",join_key:"scheme_code"},SchemeMechanic:{join_sql:"JOIN scheme.mechanic_ref mr ON mr.mechanic_type = sm.mechanic_type",join_key:"mechanic_type"},Zone:{join_sql:"JOIN d365.org_structure os ON os.zone_code = ANY(sm.eligible_zones)",join_key:"zone_code"}}}},
  { id:"E_SchemeMechanic",label:"Scheme Mechanic",domain:"Trade Spend",size:10,
    def:"Structural type of trade promo. Margin (Rs/case), Volume Slab (buy X get Y), Display (Rs for visibility), Consumer (price-off).",
    grain:"Mechanic type (enumeration)",attributes:["mechanic_id","type","payout_structure","elasticity_profile","typical_roi_range"],
    data_mapping:{primary_table:"scheme.mechanic_ref",primary_key:"mechanic_id",
      base_query:"SELECT mr.mechanic_id, mr.type, mr.payout_structure, mr.elasticity_profile, mr.typical_roi_range\nFROM scheme.mechanic_ref mr",
      filters:{by_type:"WHERE mr.type = :mechanic_type"},joins_to_other_nodes:{Scheme:{join_sql:"JOIN scheme.scheme_master sm ON sm.mechanic_type = mr.mechanic_type",join_key:"mechanic_type"}}}},
  { id:"E_BudgetEnvelope",label:"Budget Envelope",domain:"Trade Spend",size:11,
    def:"Quarterly/monthly trade spend allocation at zone level. The constraint within which all scheme decisions operate.",
    grain:"Zone x Period",attributes:["budget_id","zone_code","period_start","period_end","allocated_rs","spent_rs","committed_rs","approval_authority"],
    data_mapping:{primary_table:"finance.trade_budget",primary_key:"budget_id",
      base_query:"SELECT tb.budget_id, tb.zone_code, tb.period_start, tb.period_end,\n       tb.allocated_rs, tb.spent_rs, tb.committed_rs, tb.approval_authority\nFROM finance.trade_budget tb WHERE 1=1",
      filters:{by_zone:"AND tb.zone_code = :zone_code",current_period:"AND CURRENT_DATE BETWEEN tb.period_start AND tb.period_end"},
      joins_to_other_nodes:{Zone:{join_sql:"JOIN d365.org_structure os ON os.zone_code = tb.zone_code",join_key:"zone_code"}}}},
  { id:"E_SchemePayout",label:"Scheme Payout",domain:"Trade Spend",size:9,
    def:"Actual disbursement to outlet/distributor under a scheme. The cash outflow record.",
    grain:"Payout transaction: Scheme x Outlet x Period",attributes:["payout_id","scheme_code","outlet_code","distributor_code","period","qty_qualifying_cases","payout_rs","is_verified","claim_date","settlement_date"],
    data_mapping:{primary_table:"scheme.payout_ledger",primary_key:"payout_id",
      base_query:"SELECT pl.payout_id, pl.scheme_code, pl.outlet_code, pl.distributor_code,\n       pl.period, pl.qty_qualifying_cases, pl.payout_rs, pl.is_verified, pl.claim_date, pl.settlement_date\nFROM scheme.payout_ledger pl WHERE 1=1",
      filters:{by_scheme:"AND pl.scheme_code = :scheme_code",by_outlet:"AND pl.outlet_code = :outlet_code",verified_only:"AND pl.is_verified = 1"},
      joins_to_other_nodes:{Scheme:{join_sql:"JOIN scheme.scheme_master sm ON sm.scheme_code = pl.scheme_code",join_key:"scheme_code"},Outlet:{join_sql:"JOIN d365.customer_master cm ON cm.outlet_code = pl.outlet_code",join_key:"outlet_code"},Distributor:{join_sql:"JOIN dms.distributor_master dm ON dm.distributor_code = pl.distributor_code",join_key:"distributor_code"}}}},
  { id:"E_SKU",label:"SKU",domain:"Product",size:12,
    def:"Stock Keeping Unit. Specific product variant at Coca-Cola India level.",
    grain:"Single SKU by material code",attributes:["sku_code","brand_code","category_id","pack_format_id","mrp_rs","bottler_margin_rs","flavor","is_returnable","is_active"],
    data_mapping:{primary_table:"d365.material_master",primary_key:"sku_code",
      base_query:"SELECT mm.sku_code, mm.brand_code, mm.category_id, mm.pack_format_id,\n       mm.mrp_rs, mm.bottler_margin_rs, mm.flavor, mm.is_returnable, mm.is_active\nFROM d365.material_master mm WHERE mm.is_active = 1",
      filters:{by_sku:"AND mm.sku_code = :sku_code",by_brand:"AND mm.brand_code = :brand_code",by_category:"AND mm.category_id = :category_id",by_pack:"AND mm.pack_format_id = :pack_format_id"},
      joins_to_other_nodes:{Brand:{join_sql:"JOIN d365.product_hierarchy ph ON ph.brand_code = mm.brand_code AND ph.hierarchy_level = 'BRAND'",join_key:"brand_code"},Category:{join_sql:"JOIN d365.product_hierarchy ph ON ph.category_id = mm.category_id AND ph.hierarchy_level = 'CATEGORY'",join_key:"category_id"},PackFormat:{join_sql:"JOIN d365.pack_format_ref pf ON pf.format_id = mm.pack_format_id",join_key:"pack_format_id"}}}},
  { id:"E_Brand",label:"Brand",domain:"Product",size:11,
    def:"Coca-Cola brand family member. Thums Up, Sprite, Fanta, Limca, Maaza, Minute Maid, Kinley.",
    grain:"Brand by brand code",attributes:["brand_code","name","category_id","brand_tier","is_hero_brand_flag","competitive_positioning"],
    data_mapping:{primary_table:"d365.product_hierarchy",primary_key:"brand_code",
      base_query:"SELECT ph.brand_code, ph.name, ph.category_id, ph.brand_tier, ph.is_hero_brand_flag, ph.competitive_positioning\nFROM d365.product_hierarchy ph WHERE ph.hierarchy_level = 'BRAND'",
      filters:{by_brand:"AND ph.brand_code = :brand_code",by_tier:"AND ph.brand_tier = :brand_tier"},
      joins_to_other_nodes:{SKU:{join_sql:"JOIN d365.material_master mm ON mm.brand_code = ph.brand_code",join_key:"brand_code"}}}},
  { id:"E_Category",label:"Category",domain:"Product",size:10,
    def:"Beverage category. CSD, Juice, Water, Energy/Hydration.",
    grain:"Category enumeration",attributes:["category_id","name","growth_index","margin_profile","seasonal_peak_months"],
    data_mapping:{primary_table:"d365.product_hierarchy",primary_key:"category_id",
      base_query:"SELECT ph.category_id, ph.name, ph.growth_index, ph.margin_profile, ph.seasonal_peak_months\nFROM d365.product_hierarchy ph WHERE ph.hierarchy_level = 'CATEGORY'",
      filters:{by_category:"AND ph.category_id = :category_id"},joins_to_other_nodes:{Brand:{join_sql:"JOIN d365.product_hierarchy ph_b ON ph_b.category_id = ph.category_id AND ph_b.hierarchy_level = 'BRAND'",join_key:"category_id"}}}},
  { id:"E_PackFormat",label:"Pack Format",domain:"Product",size:9,
    def:"Size/packaging variant. Rs 10 sachet to 2L PET. Pack economics vary dramatically by channel.",
    grain:"Pack format enumeration",attributes:["format_id","size_ml","pack_type","mrp_band","is_returnable","target_channel"],
    data_mapping:{primary_table:"d365.pack_format_ref",primary_key:"format_id",
      base_query:"SELECT pf.format_id, pf.size_ml, pf.pack_type, pf.mrp_band, pf.is_returnable, pf.target_channel\nFROM d365.pack_format_ref pf",
      filters:{by_format:"WHERE pf.format_id = :format_id",by_channel:"WHERE pf.target_channel = :target_channel"},
      joins_to_other_nodes:{SKU:{join_sql:"JOIN d365.material_master mm ON mm.pack_format_id = pf.format_id",join_key:"format_id"}}}},
  { id:"E_CompBrand",label:"Competitor Brand",domain:"Competition",size:12,
    def:"Non-SLMG beverage brand. Campa Cola (RCPL), Lahori Zeera, Pepsi (Varun Beverages), regional players.",
    grain:"Competitor brand entity",attributes:["comp_brand_id","name","parent_company","category","price_positioning","distribution_model","threat_level"],
    data_mapping:{primary_table:"analytics.comp_brand_ref",primary_key:"comp_brand_id",
      base_query:"SELECT cb.comp_brand_id, cb.name, cb.parent_company, cb.category, cb.price_positioning, cb.distribution_model, cb.threat_level\nFROM analytics.comp_brand_ref cb",
      filters:{by_brand:"WHERE cb.comp_brand_id = :comp_brand_id",by_parent:"WHERE cb.parent_company = :parent_company"},
      joins_to_other_nodes:{CompPresence:{join_sql:"JOIN sfa.competitive_audit ca ON ca.comp_brand_id = cb.comp_brand_id",join_key:"comp_brand_id"}}}},
  { id:"E_CompPresence",label:"Competitor Presence",domain:"Competition",size:10,
    def:"Observed presence of competitor brand at specific outlet. Binary + depth (stocked, displayed, in cooler).",
    grain:"Outlet x Competitor Brand x Observation Date",attributes:["audit_id","outlet_code","comp_brand_id","obs_date","is_present","estimated_shelf_share_pct","is_in_cooler","price_rs","source"],
    data_mapping:{primary_table:"sfa.competitive_audit",primary_key:"audit_id",
      base_query:"SELECT ca.audit_id, ca.outlet_code, ca.comp_brand_id, ca.obs_date,\n       ca.is_present, ca.estimated_shelf_share_pct, ca.is_in_cooler, ca.price_rs, ca.source\nFROM sfa.competitive_audit ca WHERE 1=1",
      filters:{by_outlet:"AND ca.outlet_code = :outlet_code",by_comp_brand:"AND ca.comp_brand_id = :comp_brand_id",by_date_range:"AND ca.obs_date BETWEEN :start_date AND :end_date",present_only:"AND ca.is_present = 1"},
      joins_to_other_nodes:{Outlet:{join_sql:"JOIN d365.customer_master cm ON cm.outlet_code = ca.outlet_code",join_key:"outlet_code"},CompBrand:{join_sql:"JOIN analytics.comp_brand_ref cb ON cb.comp_brand_id = ca.comp_brand_id",join_key:"comp_brand_id"}}}},
  { id:"E_NielsenAudit",label:"Nielsen Audit",domain:"Competition",size:9,
    def:"Third-party retail measurement. Value/volume share by geography. 4-6 week lag. Competitive ground truth.",
    grain:"Nielsen Cluster x Category x Audit Cycle",attributes:["audit_cycle_id","cluster_name","category","slmg_value_share_pct","slmg_volume_share_pct","top_competitors","cycle_end_date","delivery_date","lag_weeks"],
    data_mapping:{primary_table:"analytics.nielsen_data",primary_key:["audit_cycle_id","cluster_name","category"],
      base_query:"SELECT nd.audit_cycle_id, nd.cluster_name, nd.category,\n       nd.slmg_value_share_pct, nd.slmg_volume_share_pct, nd.top_competitors,\n       nd.cycle_end_date, nd.delivery_date, (nd.delivery_date - nd.cycle_end_date) AS lag_weeks\nFROM analytics.nielsen_data nd WHERE 1=1",
      filters:{by_cluster:"AND nd.cluster_name = :cluster_name",by_category:"AND nd.category = :category",latest_only:"AND nd.audit_cycle_id = (SELECT MAX(audit_cycle_id) FROM analytics.nielsen_data)"},
      joins_to_other_nodes:{Zone:{join_sql:"JOIN analytics.nielsen_zone_map nzm ON nzm.cluster_name = nd.cluster_name",join_key:"cluster_name",note:"Mapping is imperfect. Dashboard should surface confidence level."}}}},
  { id:"E_Zone",label:"Zone",domain:"Geography",size:13,
    def:"SLMG operational zone. Highest org unit below company. ZSM-led.",
    grain:"Zone by zone code",attributes:["zone_code","name","zsm_emp_code","state","num_territories","num_distributors"],
    data_mapping:{primary_table:"d365.org_structure",primary_key:"zone_code",
      base_query:"SELECT os.zone_code, os.zone_name AS name, os.zsm_emp_code, os.state,\n       (SELECT COUNT(DISTINCT territory_code) FROM d365.org_structure os2 WHERE os2.zone_code = os.zone_code) AS num_territories,\n       (SELECT COUNT(*) FROM dms.distributor_master dm WHERE dm.zone_code = os.zone_code) AS num_distributors\nFROM d365.org_structure os WHERE os.org_level = 'ZONE'",
      filters:{by_zone:"AND os.zone_code = :zone_code",by_state:"AND os.state = :state"},
      joins_to_other_nodes:{ASMTerritory:{join_sql:"JOIN d365.org_structure os2 ON os2.zone_code = os.zone_code AND os2.org_level = 'TERRITORY'",join_key:"zone_code"},BudgetEnvelope:{join_sql:"JOIN finance.trade_budget tb ON tb.zone_code = os.zone_code",join_key:"zone_code"},Distributor:{join_sql:"JOIN dms.distributor_master dm ON dm.zone_code = os.zone_code",join_key:"zone_code"}}}},
  { id:"E_ASMTerritory",label:"ASM Territory",domain:"Geography",size:11,
    def:"Sub-zone territory managed by Area Sales Manager. Contains distributors, beats, outlets.",
    grain:"Territory by territory code",attributes:["territory_code","zone_code","asm_emp_code","pincodes","town_class_mix"],
    data_mapping:{primary_table:"d365.org_structure",primary_key:"territory_code",
      base_query:"SELECT os.territory_code, os.zone_code, os.asm_emp_code, os.pincodes, os.town_class_mix\nFROM d365.org_structure os WHERE os.org_level = 'TERRITORY'",
      filters:{by_territory:"AND os.territory_code = :territory_code",by_zone:"AND os.zone_code = :zone_code"},
      joins_to_other_nodes:{Zone:{join_sql:"JOIN d365.org_structure os2 ON os2.zone_code = os.zone_code AND os2.org_level = 'ZONE'",join_key:"zone_code"},PincodeCluster:{join_sql:"JOIN analytics.pincode_cluster pc ON pc.territory_code = os.territory_code",join_key:"territory_code"},ASM:{join_sql:"JOIN d365.employee_master em ON em.emp_code = os.asm_emp_code",join_key:"asm_emp_code"}}}},
  { id:"E_TownClass",label:"Town Class",domain:"Geography",size:8,
    def:"Census-based urban/rural classification. Determines competitive dynamics and appropriate trade mechanics.",
    grain:"Town class enumeration (Metro/Tier1/Tier2/Tier3/Rural)",attributes:["class_id","label","population_range","outlet_density_per_sqkm","competitive_intensity_index"],
    data_mapping:{primary_table:"analytics.town_class_ref",primary_key:"class_id",
      base_query:"SELECT tc.class_id, tc.label, tc.population_range, tc.outlet_density_per_sqkm, tc.competitive_intensity_index\nFROM analytics.town_class_ref tc",
      filters:{by_class:"WHERE tc.class_id = :class_id"},joins_to_other_nodes:{PincodeCluster:{join_sql:"JOIN analytics.pincode_cluster pc ON pc.town_class_id = tc.class_id",join_key:"class_id"}}}},
  { id:"E_PincodeCluster",label:"Pincode Cluster",domain:"Geography",size:9,
    def:"Micro-geography. 5-15 pincodes forming a commercially coherent area served by 1-2 distributors.",
    grain:"Cluster by cluster code",attributes:["cluster_code","pincodes","territory_code","num_outlets","primary_distributor_code","urban_rural_mix_pct","competitor_penetration_index"],
    data_mapping:{primary_table:"analytics.pincode_cluster",primary_key:"cluster_code",
      base_query:"SELECT pc.cluster_code, pc.pincodes, pc.territory_code, pc.num_outlets,\n       pc.primary_distributor_code, pc.urban_rural_mix_pct, pc.competitor_penetration_index\nFROM analytics.pincode_cluster pc WHERE 1=1",
      filters:{by_cluster:"AND pc.cluster_code = :cluster_code",by_territory:"AND pc.territory_code = :territory_code"},
      joins_to_other_nodes:{ASMTerritory:{join_sql:"JOIN d365.org_structure os ON os.territory_code = pc.territory_code",join_key:"territory_code"},TownClass:{join_sql:"JOIN analytics.town_class_ref tc ON tc.class_id = pc.town_class_id",join_key:"town_class_id"},Distributor:{join_sql:"JOIN dms.distributor_master dm ON dm.distributor_code = pc.primary_distributor_code",join_key:"primary_distributor_code"}}}},
  { id:"E_Salesman",label:"Salesman",domain:"Sales Force",size:10,
    def:"Field sales rep. Visits outlets on beat, takes orders, reports competitive activity, communicates schemes.",
    grain:"Individual salesman by employee code",attributes:["emp_code","name","distributor_code","outlets_per_day_avg","tenure_months","digital_tool_adoption_score"],
    data_mapping:{primary_table:"dms.salesman_master",primary_key:"emp_code",
      base_query:"SELECT sm.emp_code, sm.name, sm.distributor_code, sm.outlets_per_day_avg, sm.tenure_months, sm.digital_tool_adoption_score\nFROM dms.salesman_master sm WHERE sm.is_active = 1",
      filters:{by_salesman:"AND sm.emp_code = :emp_code",by_distributor:"AND sm.distributor_code = :distributor_code"},
      joins_to_other_nodes:{Distributor:{join_sql:"JOIN dms.distributor_master dm ON dm.distributor_code = sm.distributor_code",join_key:"distributor_code"},Beat:{join_sql:"JOIN dms.salesman_beat_assign sba ON sba.emp_code = sm.emp_code",join_key:"emp_code"}}}},
  { id:"E_ASM",label:"ASM",domain:"Sales Force",size:10,
    def:"Area Sales Manager. First-level field leadership. Owns territory P&L, distributor relationships, scheme execution.",
    grain:"Individual ASM by employee code",attributes:["emp_code","name","territory_code","num_distributors_managed","num_salesmen_supervised","tenure_months"],
    data_mapping:{primary_table:"d365.employee_master",primary_key:"emp_code",
      base_query:"SELECT em.emp_code, em.name, em.territory_code, em.num_distributors_managed, em.num_salesmen_supervised, em.tenure_months\nFROM d365.employee_master em WHERE em.role = 'ASM' AND em.is_active = 1",
      filters:{by_asm:"AND em.emp_code = :emp_code",by_territory:"AND em.territory_code = :territory_code"},
      joins_to_other_nodes:{ASMTerritory:{join_sql:"JOIN d365.org_structure os ON os.territory_code = em.territory_code",join_key:"territory_code"}}}},
  { id:"E_SalesmanVisit",label:"Salesman Visit",domain:"Sales Force",size:8,
    def:"Record of salesman visit to outlet. Contains order, audit, and competitive intelligence.",
    grain:"Visit by salesman x outlet x date",attributes:["visit_id","emp_code","outlet_code","visit_date","duration_min","order_taken_flag","order_value_rs","cooler_audit_done","competitive_audit_done","gps_lat","gps_lng"],
    data_mapping:{primary_table:"sfa.visit_log",primary_key:"visit_id",
      base_query:"SELECT vl.visit_id, vl.emp_code, vl.outlet_code, vl.visit_date, vl.duration_min,\n       vl.order_taken_flag, vl.order_value_rs, vl.cooler_audit_done, vl.competitive_audit_done, vl.gps_lat, vl.gps_lng\nFROM sfa.visit_log vl WHERE 1=1",
      filters:{by_salesman:"AND vl.emp_code = :emp_code",by_outlet:"AND vl.outlet_code = :outlet_code",by_date_range:"AND vl.visit_date BETWEEN :start_date AND :end_date",with_order:"AND vl.order_taken_flag = 1"},
      joins_to_other_nodes:{Salesman:{join_sql:"JOIN dms.salesman_master sm ON sm.emp_code = vl.emp_code",join_key:"emp_code"},Outlet:{join_sql:"JOIN d365.customer_master cm ON cm.outlet_code = vl.outlet_code",join_key:"outlet_code"}}}},
  { id:"E_Season",label:"Season",domain:"Geography",size:7,
    def:"Demand seasonality marker. Summer (Mar-Jun = 40-50% vol), Monsoon (Jul-Sep = trough), Festival (Oct-Dec = secondary peak), Winter (Jan-Feb = low).",
    grain:"Season period enumeration",attributes:["season_id","label","months","volume_index","typical_scheme_intensity","competitive_move_probability"],
    data_mapping:{primary_table:"analytics.season_ref",primary_key:"season_id",
      base_query:"SELECT sr.season_id, sr.label, sr.months, sr.volume_index, sr.typical_scheme_intensity, sr.competitive_move_probability\nFROM analytics.season_ref sr",
      filters:{by_season:"WHERE sr.season_id = :season_id"},joins_to_other_nodes:{Category:{join_sql:"-- Logical join: Season.months overlaps Category.seasonal_peak_months",join_key:"months"}}}},
];

// ═══ LAYER 2: METRICS (16 KPIs with formula_sql + diagnostic tree) ═══
const metricNodes = [
  { id:"M_RoS",label:"Rate of Sale",domain:"metric",size:13,def:"Cases sold per week at outlet, by SKU. The single most important metric.",
    formula:"SUM(cases_sold) / COUNT(DISTINCT week_id) per outlet per SKU",
    formula_sql:"SELECT o.outlet_code, ol.sku_code,\n       SUM(ol.qty_cases) / COUNT(DISTINCT DATE_TRUNC('week', o.order_date)) AS ros\nFROM dms.orders o JOIN dms.order_lines ol ON ol.order_id = o.order_id\nWHERE o.order_date >= CURRENT_DATE - INTERVAL '28 days'\nGROUP BY o.outlet_code, ol.sku_code",
    unit:"cases/week",thresholds:{good:">8",warning:"3-8",critical:"<3"},
    diagnostic:[{step:1,check:"Competitive presence new/increasing?",traverse_to:"E_CompPresence"},{step:2,check:"Cooler compliance dropped?",traverse_to:"M_CoolerCompliance"},{step:3,check:"Salesman visit frequency changed?",traverse_to:"E_SalesmanVisit"},{step:4,check:"Scheme participation active?",traverse_to:"M_SchemeParticipation"}],
    connTo:["E_Outlet","E_SKU","E_DeliveryOrder"]},
  { id:"M_CompThreat",label:"Competitive Threat Score",domain:"metric",size:12,def:"Composite: competitor presence + price differential + SLMG volume decline. Determines threat classification.",
    formula:"w1*is_comp_present + w2*(price_discount_pct) + w3*(vol_decline_4wk) + w4*(cooler_compliance_drop)",
    formula_sql:"SELECT cm.outlet_code,\n  (0.3*COALESCE(ca.is_present,0)) + (0.25*COALESCE((mrp.mrp_rs-ca.price_rs)/NULLIF(mrp.mrp_rs,0),0))\n  + (0.3*COALESCE(ros_chg.decline_pct,0)) + (0.15*COALESCE(cc_chg.drop,0)) AS threat_score\nFROM d365.customer_master cm\nLEFT JOIN sfa.competitive_audit ca ON ca.outlet_code = cm.outlet_code\nLEFT JOIN analytics.ros_change ros_chg ON ros_chg.outlet_code = cm.outlet_code\nLEFT JOIN analytics.cooler_compliance_change cc_chg ON cc_chg.outlet_code = cm.outlet_code",
    unit:"0-100",thresholds:{good:"<30",warning:"30-60",critical:">60"},
    diagnostic:[{step:1,check:"Which competitor driving the score?",traverse_to:"E_CompBrand"},{step:2,check:"New distributor entry or price move?",traverse_to:"E_CompPresence"},{step:3,check:"Cross-ref with salesman field intel",traverse_to:"E_SalesmanVisit"}],
    connTo:["E_Outlet","E_CompPresence","E_CompBrand"]},
  { id:"M_SpendIntensity",label:"Trade Spend Intensity",domain:"metric",size:12,def:"Total trade investment per case sold at outlet. Cost of maintaining volume.",
    formula:"SUM(payout + cooler_amort + salesman_cost) / SUM(cases) per outlet",
    formula_sql:"SELECT o.outlet_code,\n  (COALESCE(SUM(pl.payout_rs),0)+COALESCE(ca.monthly_amort_rs,0)) / NULLIF(SUM(ol.qty_cases),0) AS spend_per_case\nFROM dms.orders o JOIN dms.order_lines ol ON ol.order_id=o.order_id\nLEFT JOIN scheme.payout_ledger pl ON pl.outlet_code=o.outlet_code\nLEFT JOIN d365.cooler_amortization ca ON ca.outlet_code=o.outlet_code\nWHERE o.order_date >= CURRENT_DATE - INTERVAL '28 days'\nGROUP BY o.outlet_code, ca.monthly_amort_rs",
    unit:"Rs/case",thresholds:{good:"<8",warning:"8-15",critical:">15"},
    diagnostic:[{step:1,check:"RoS declining (denominator)?",traverse_to:"M_RoS"},{step:2,check:"Payouts increasing (numerator)?",traverse_to:"E_SchemePayout"},{step:3,check:"Compare peer outlets in cluster",traverse_to:"E_PincodeCluster"}],
    connTo:["E_Outlet","E_SchemePayout","E_CoolerAsset"]},
  { id:"M_CoolerCompliance",label:"Cooler Compliance",domain:"metric",size:11,def:"% cooler capacity stocked with SLMG/Coke. Leading displacement indicator.",
    formula:"slmg_shelves / total_shelves * 100 per cooler per audit",
    formula_sql:"SELECT sa.outlet_code, fa.asset_id, sa.slmg_share_pct AS compliance_pct\nFROM sfa.shelf_audit sa\nJOIN d365.fixed_assets fa ON fa.placed_at_outlet=sa.outlet_code AND fa.asset_category='COOLER'\nWHERE sa.source='cooler_audit' AND sa.audit_date=(SELECT MAX(audit_date) FROM sfa.shelf_audit WHERE outlet_code=sa.outlet_code AND source='cooler_audit')",
    unit:"%",thresholds:{good:">85%",warning:"60-85%",critical:"<60%"},
    diagnostic:[{step:1,check:"Retailer stocking competitor in SLMG cooler?",traverse_to:"E_CompPresence"},{step:2,check:"Check exclusivity enforcement in visit logs",traverse_to:"E_SalesmanVisit"}],
    connTo:["E_CoolerAsset","E_Outlet","E_SalesmanVisit"]},
  { id:"M_SchemeParticipation",label:"Scheme Participation",domain:"metric",size:11,def:"% eligible outlets actually participating. Scheme reach vs. design.",
    formula:"COUNT(outlets_qualifying) / COUNT(outlets_eligible) * 100",
    formula_sql:"SELECT sm.scheme_code, sm.name,\n  COUNT(DISTINCT CASE WHEN pl.qty_qualifying_cases>0 THEN pl.outlet_code END) AS participating,\n  COUNT(DISTINCT elig.outlet_code) AS eligible,\n  ROUND(100.0*COUNT(DISTINCT CASE WHEN pl.qty_qualifying_cases>0 THEN pl.outlet_code END)/NULLIF(COUNT(DISTINCT elig.outlet_code),0),1) AS pct\nFROM scheme.scheme_master sm\nJOIN scheme.scheme_eligibility elig ON elig.scheme_code=sm.scheme_code\nLEFT JOIN scheme.payout_ledger pl ON pl.scheme_code=sm.scheme_code AND pl.outlet_code=elig.outlet_code\nWHERE sm.is_active=1 GROUP BY sm.scheme_code,sm.name",
    unit:"%",thresholds:{good:">70%",warning:"40-70%",critical:"<40%"},
    diagnostic:[{step:1,check:"Mechanic match outlet buying pattern?",traverse_to:"E_SchemeMechanic"},{step:2,check:"Distributor communicating scheme?",traverse_to:"E_Distributor"},{step:3,check:"Beat-level variance?",traverse_to:"E_Beat"}],
    connTo:["E_Scheme","E_Outlet","E_Distributor"]},
  { id:"M_CoverageEfficiency",label:"Coverage Efficiency",domain:"metric",size:10,def:"% assigned outlets getting regular deliveries. No scheme fixes coverage gaps.",
    formula:"COUNT(billed_last_4wk) / COUNT(assigned) * 100 per distributor",
    formula_sql:"SELECT dm.distributor_code,\n  COUNT(DISTINCT dom.outlet_code) AS assigned,\n  COUNT(DISTINCT o.outlet_code) AS billed,\n  ROUND(100.0*COUNT(DISTINCT o.outlet_code)/NULLIF(COUNT(DISTINCT dom.outlet_code),0),1) AS coverage_pct\nFROM dms.distributor_master dm\nJOIN dms.distributor_outlet_map dom ON dom.distributor_code=dm.distributor_code\nLEFT JOIN dms.orders o ON o.outlet_code=dom.outlet_code AND o.distributor_code=dm.distributor_code AND o.order_date>=CURRENT_DATE-INTERVAL '28 days'\nGROUP BY dm.distributor_code",
    unit:"%",thresholds:{good:">85%",warning:"70-85%",critical:"<70%"},
    diagnostic:[{step:1,check:"Fleet capacity?",traverse_to:"E_Fleet"},{step:2,check:"Salesman headcount vs beat count?",traverse_to:"E_Salesman"},{step:3,check:"WC stress?",traverse_to:"M_WCDays"}],
    connTo:["E_Distributor","E_Outlet","E_Beat"]},
  { id:"M_VolumePerRupee",label:"Volume per Rupee",domain:"metric",size:12,def:"Cases per rupee of trade spend. Primary efficiency metric at zone level.",
    formula:"SUM(cases) / SUM(trade_spend) per zone per period",
    formula_sql:"SELECT tb.zone_code, SUM(ol.qty_cases) AS cases, SUM(pl.payout_rs) AS spend,\n  ROUND(SUM(ol.qty_cases)::numeric/NULLIF(SUM(pl.payout_rs),0),4) AS cases_per_rupee\nFROM finance.trade_budget tb\nJOIN scheme.payout_ledger pl ON pl.budget_id=tb.budget_id\nJOIN dms.orders o ON o.outlet_code=pl.outlet_code\nJOIN dms.order_lines ol ON ol.order_id=o.order_id\nWHERE CURRENT_DATE BETWEEN tb.period_start AND tb.period_end\nGROUP BY tb.zone_code",
    unit:"cases/Rs",thresholds:{good:">0.8",warning:"0.4-0.8",critical:"<0.4"},
    diagnostic:[{step:1,check:"Volume dropping faster than spend?",traverse_to:"M_RoS"},{step:2,check:"Spend increasing without lift?",traverse_to:"M_BudgetUtil"},{step:3,check:"Run efficiency quadrant across zones",traverse_to:"E_Zone"}],
    connTo:["E_Zone","E_BudgetEnvelope","E_SchemePayout"]},
  { id:"M_WCDays",label:"Working Capital Days",domain:"metric",size:9,def:"Distributor inventory days + receivables. Financial health and service capacity.",
    formula:"(inventory_value/daily_COGS) + (receivables/daily_revenue)",
    formula_sql:"SELECT dm.distributor_code,\n  ROUND(dm.current_inventory_value/NULLIF(dm.avg_daily_cogs,0),1) AS inv_days,\n  ROUND(dm.outstanding_receivables/NULLIF(dm.avg_daily_revenue,0),1) AS recv_days,\n  ROUND((dm.current_inventory_value/NULLIF(dm.avg_daily_cogs,0))+(dm.outstanding_receivables/NULLIF(dm.avg_daily_revenue,0)),1) AS wc_days\nFROM dms.distributor_financials dm",
    unit:"days",thresholds:{good:"<25",warning:"25-40",critical:">40"},
    diagnostic:[{step:1,check:"Inventory piling (demand drop) or receivables rising (collection)?",traverse_to:"E_Distributor"},{step:2,check:"Reducing order frequency?",traverse_to:"M_FillRate"}],
    connTo:["E_Distributor","E_RetailerCredit","E_Warehouse"]},
  { id:"M_VisibleShelf",label:"Share of Visible Shelf",domain:"metric",size:10,def:"SLMG share of visible shelf/display. Consumer mindshare proxy.",
    formula:"SUM(slmg_facings) / SUM(total_facings) * 100",
    formula_sql:"SELECT sa.outlet_code, AVG(sa.slmg_share_pct) AS shelf_pct\nFROM sfa.shelf_audit sa\nWHERE sa.source IN ('primary_shelf','secondary_display') AND sa.audit_date>=CURRENT_DATE-INTERVAL '28 days'\nGROUP BY sa.outlet_code",
    unit:"%",thresholds:{good:">50%",warning:"30-50%",critical:"<30%"},
    diagnostic:[{step:1,check:"Declining without cooler drop? Competitor winning ambient shelf",traverse_to:"E_CompPresence"},{step:2,check:"Display scheme running?",traverse_to:"M_SchemeParticipation"}],
    connTo:["E_ShelfPosition","E_Outlet","E_CompPresence"]},
  { id:"M_ChurnProb",label:"Outlet Churn Probability",domain:"metric",size:11,def:"ML-scored probability outlet stops ordering within 30 days.",
    formula:"f(RoS_trend, order_freq, comp_threat, cooler_trend, days_since_last_order)",
    formula_sql:"-- Served from analytics.churn_model_scores (refreshed daily)\nSELECT cms.outlet_code, cms.churn_probability, cms.top_driver_1, cms.top_driver_2, cms.model_run_date\nFROM analytics.churn_model_scores cms\nWHERE cms.model_run_date = (SELECT MAX(model_run_date) FROM analytics.churn_model_scores)",
    unit:"0-1",thresholds:{good:"<0.2",warning:"0.2-0.5",critical:">0.5"},
    diagnostic:[{step:1,check:"Which input feature driving score?",traverse_to:"M_RoS"},{step:2,check:"High-risk: check comp presence change",traverse_to:"M_CompThreat"}],
    connTo:["E_Outlet","E_CompPresence","E_DeliveryOrder"]},
  { id:"M_SchemeROI",label:"Scheme ROI",domain:"metric",size:12,def:"Incremental volume / scheme cost. Separates uplift from baseline subsidization.",
    formula:"(actual - counterfactual_baseline) * margin / cost",
    formula_sql:"SELECT sm.scheme_code, sm.name,\n  SUM(sr.actual_vol) - SUM(sr.baseline_vol) AS incremental,\n  SUM(pl.payout_rs) AS cost,\n  ROUND(((SUM(sr.actual_vol)-SUM(sr.baseline_vol))*sm.margin_per_case)/NULLIF(SUM(pl.payout_rs),0),2) AS roi\nFROM scheme.scheme_master sm\nJOIN analytics.scheme_roi sr ON sr.scheme_code=sm.scheme_code\nJOIN scheme.payout_ledger pl ON pl.scheme_code=sm.scheme_code\nGROUP BY sm.scheme_code, sm.name, sm.margin_per_case",
    unit:"ratio",thresholds:{good:">2.5x",warning:"1.0-2.5x",critical:"<1.0x"},
    diagnostic:[{step:1,check:"Control group comparison valid?",traverse_to:"E_Scheme"},{step:2,check:"Scheme fatigue?",traverse_to:"M_SchemeParticipation"}],
    connTo:["E_Scheme","E_SchemePayout","E_Zone"]},
  { id:"M_BudgetUtil",label:"Budget Utilization",domain:"metric",size:10,def:"% allocated budget consumed. Over = losing discipline. Under = under-executing.",
    formula:"(spent + committed) / allocated * 100",
    formula_sql:"SELECT tb.zone_code, tb.period_start, tb.allocated_rs, tb.spent_rs, tb.committed_rs,\n  ROUND(100.0*(tb.spent_rs+tb.committed_rs)/NULLIF(tb.allocated_rs,0),1) AS util_pct\nFROM finance.trade_budget tb WHERE CURRENT_DATE BETWEEN tb.period_start AND tb.period_end",
    unit:"%",thresholds:{good:"90-105%",warning:"70-90% or 105-120%",critical:"<70% or >120%"},
    diagnostic:[{step:1,check:"Overspending: competitive emergency?",traverse_to:"M_CompThreat"},{step:2,check:"Underspending: execution gaps?",traverse_to:"M_SchemeParticipation"}],
    connTo:["E_BudgetEnvelope","E_Zone","E_SchemePayout"]},
  { id:"M_BeatProductivity",label:"Beat Productivity",domain:"metric",size:9,def:"Revenue per beat per salesman visit. Field force efficiency.",
    formula:"SUM(order_value) / COUNT(visits) per beat",
    formula_sql:"SELECT bom.beat_code, COUNT(*) AS visits, SUM(vl.order_value_rs) AS revenue,\n  ROUND(SUM(vl.order_value_rs)/NULLIF(COUNT(*),0),0) AS rev_per_visit\nFROM sfa.visit_log vl\nJOIN dms.beat_outlet_map bom ON bom.outlet_code=vl.outlet_code\nWHERE vl.visit_date>=CURRENT_DATE-INTERVAL '28 days'\nGROUP BY bom.beat_code",
    unit:"Rs/visit",thresholds:{good:">5000",warning:"2500-5000",critical:"<2500"},
    diagnostic:[{step:1,check:"Too many outlets per beat?",traverse_to:"E_Beat"},{step:2,check:"Outlets not ordering despite visits?",traverse_to:"M_RoS"}],
    connTo:["E_Beat","E_SalesmanVisit","E_Salesman"]},
  { id:"M_FillRate",label:"Fill Rate (OTIF)",domain:"metric",size:9,def:"On-Time In-Full delivery %. If product doesn't reach outlet, nothing else matters.",
    formula:"COUNT(orders_otif) / COUNT(total) * 100",
    formula_sql:"SELECT o.distributor_code, COUNT(*) AS total,\n  COUNT(CASE WHEN o.is_on_time=1 AND o.is_in_full=1 THEN 1 END) AS otif,\n  ROUND(100.0*COUNT(CASE WHEN o.is_on_time=1 AND o.is_in_full=1 THEN 1 END)/NULLIF(COUNT(*),0),1) AS fill_pct\nFROM dms.orders o WHERE o.order_date>=CURRENT_DATE-INTERVAL '28 days'\nGROUP BY o.distributor_code",
    unit:"%",thresholds:{good:">92%",warning:"80-92%",critical:"<80%"},
    diagnostic:[{step:1,check:"Inventory issue? Warehouse stock",traverse_to:"E_Warehouse"},{step:2,check:"Logistics? Fleet utilization",traverse_to:"E_Fleet"}],
    connTo:["E_Distributor","E_DeliveryOrder","E_Fleet"]},
  { id:"M_WeightedDist",label:"Weighted Distribution",domain:"metric",size:10,def:"% outlets carrying brand weighted by volume. High WD in high-RoS outlets > raw numeric.",
    formula:"SUM(vol WHERE brand_present) / SUM(all_vol) * 100",
    formula_sql:"SELECT mm.brand_code, os.territory_code,\n  ROUND(100.0*SUM(CASE WHEN ol.sku_code IS NOT NULL THEN ros.ros END)/NULLIF(SUM(ros.ros),0),1) AS wd_pct\nFROM analytics.outlet_ros ros\nJOIN d365.customer_master cm ON cm.outlet_code=ros.outlet_code\nJOIN d365.org_structure os ON os.territory_code=cm.territory_code\nLEFT JOIN (SELECT DISTINCT o.outlet_code, ol.sku_code FROM dms.orders o JOIN dms.order_lines ol ON ol.order_id=o.order_id WHERE o.order_date>=CURRENT_DATE-INTERVAL '28 days') ol ON ol.outlet_code=ros.outlet_code\nLEFT JOIN d365.material_master mm ON mm.sku_code=ol.sku_code\nGROUP BY mm.brand_code, os.territory_code",
    unit:"%",thresholds:{good:">75%",warning:"55-75%",critical:"<55%"},
    diagnostic:[{step:1,check:"Losing high-volume outlets?",traverse_to:"E_Outlet"},{step:2,check:"Cooler/shelf displacement?",traverse_to:"M_CoolerCompliance"}],
    connTo:["E_Brand","E_Outlet","E_ASMTerritory"]},
  { id:"M_NielsenShare",label:"Nielsen Value Share",domain:"metric",size:10,def:"Market share from Nielsen. Competitive ground truth, 4-6 week lag.",
    formula:"SLMG_value / Total_value * 100 per cluster",
    formula_sql:"SELECT nd.cluster_name, nzm.zone_code, nd.category,\n  nd.slmg_value_share_pct, nd.slmg_volume_share_pct, nd.cycle_end_date\nFROM analytics.nielsen_data nd\nJOIN analytics.nielsen_zone_map nzm ON nzm.cluster_name=nd.cluster_name\nWHERE nd.audit_cycle_id=(SELECT MAX(audit_cycle_id) FROM analytics.nielsen_data)",
    unit:"%",thresholds:{good:"stable/growing",warning:"declining <1pt",critical:"declining >1pt"},
    diagnostic:[{step:1,check:"Cross-ref SLMG RoS from last 6 weeks",traverse_to:"M_RoS"},{step:2,check:"Trend continuing or stabilizing?",traverse_to:"E_Zone"}],
    connTo:["E_NielsenAudit","E_Zone","E_CompBrand"]},
];

// ═══ LAYER 3: DECISIONS (12 with full IF/THEN, authority, constraints) ═══
const decisionNodes = [
  { id:"D_BudgetSplit",label:"Budget Split",domain:"decision",size:13,
    def:"Macro allocation across rural defense (Campa), urban visibility (Lahori), distributor incentives, consumer promos.",
    trigger:"Quarterly planning OR mid-quarter comp shock (threat_score zone_avg >15% rise)",
    authority:"Paritosh / CFO / Commercial Head",
    logic:"IF comp_threat_zone_avg RISING >15% in Zone_X\n   AND budget_util < 80% in Zone_Y\nTHEN RECOMMEND realloc: transfer Zone_Y.unutilized*0.5 to Zone_X\n     WEIGHT BY volume_at_risk * win_probability\nELSE maintain, flag for quarterly review",
    actions:"Increase/decrease zone envelope, shift mechanic types, trigger emergency redeployment",
    constraints:"Total cannot exceed annual approved spend. Realloc >20% needs CFO sign-off.",
    connTo:["M_VolumePerRupee","M_BudgetUtil","M_NielsenShare","M_CompThreat"]},
  { id:"D_TerritoryPriority",label:"Territory Prioritization",domain:"decision",size:12,
    def:"Within zone, which ASM territories get aggressive vs. maintenance schemes.",
    trigger:"Monthly review OR >3 territories concurrent threat rise in 2 weeks",authority:"ZSM with ASM input",
    logic:"RANK BY: (volume_at_risk * comp_intensity) / current_spend_intensity\nHIGH ratio = underinvested vs threat\nIF priority_score > zone_median*1.5 THEN upgrade to aggressive\nIF < zone_median*0.5 THEN downgrade to maintenance",
    actions:"Upgrade/downgrade scheme intensity, authorize incremental budget, flag field blitz",
    constraints:"Sum of territory allocs = zone envelope. Cannot upgrade >40% simultaneously.",
    connTo:["M_CompThreat","M_VolumePerRupee","M_SchemeROI","M_CoverageEfficiency"]},
  { id:"D_SchemeDesign",label:"Scheme Design",domain:"decision",size:12,
    def:"Which mechanic for which cluster. Margin for rural Campa, visibility for urban Lahori.",
    trigger:"New scheme period OR mechanic ROI <1.5x at 40% duration",authority:"Commercial team + ZSM",
    logic:"IF town_class IN (Rural,Tier3) AND threat='Campa'\n  THEN mechanic=MARGIN, payout=MAX(Campa_margin-SLMG_margin, Rs3/case)\nIF town_class IN (Metro,Tier1) AND threat='Lahori'\n  THEN mechanic=DISPLAY, payout=Rs500-800/outlet/month\nIF has_cooler AND compliance<70%\n  THEN ADD cooler_topup=Rs200/mo for 90%+ compliance",
    actions:"Create scheme, set mechanic, define eligibility, allocate budget",
    constraints:"Mechanic must align with brand team. Consumer promos need TCCC approval.",
    connTo:["M_SchemeROI","M_SchemeParticipation","M_CompThreat","M_CoolerCompliance"]},
  { id:"D_OutletInvestment",label:"Outlet-Level Investment",domain:"decision",size:11,
    def:"Specific spend quantum per outlet given threat, RoS, cooler status, retailer economics.",
    trigger:"Continuous (weekly recalc as new data flows)",authority:"System-recommended, ASM-approved Tier1-2; auto Tier3+",
    logic:"optimal = f(RoS * margin * retention_prob) - current\nIF gap > Rs50/mo THEN trigger enrollment/uplift\nIF optimal < current*0.5 THEN flag for reduction\nIF churn_prob>0.5 AND RoS>5 THEN priority intervention 48hrs",
    actions:"Enroll in scheme, adjust payout, flag salesman priority visit",
    constraints:"Cannot exceed 25% of outlet monthly revenue. Priority visits limited 20/territory/week.",
    connTo:["M_RoS","M_SpendIntensity","M_CompThreat","M_ChurnProb"]},
  { id:"D_EmergencyRedeploy",label:"Emergency Redeployment",domain:"decision",size:11,
    def:"Mid-cycle budget shift on competitive shock. Detect days, redeploy week.",
    trigger:"Threat spike >20pts in cluster within 2wks OR new comp distributor detected",
    authority:"ZSM emergency auth, ratified by Commercial Head 48hr",
    logic:"SOURCE from (priority):\n  1. Underspending zones (util<70%)\n  2. Schemes ROI<1.0x\n  3. Concession freed budget\nDEPLOY: volume_at_risk = SUM(ros) for outlets threat>60\nIF vol_at_risk > Rs50L/mo THEN approve\nACTIVATE pre-approved counter-scheme",
    actions:"Freeze low-ROI schemes, transfer budget, activate counters, salesman blitz",
    constraints:"Capped 15% zone quarterly. Must ratify 48hrs or auto-reverses.",
    connTo:["M_CompThreat","M_BudgetUtil","M_SchemeROI","M_VolumePerRupee"]},
  { id:"D_Concession",label:"Concession Decision",domain:"decision",size:10,
    def:"Stop spending on unwinnable outlets. Highest-ROI decision, hardest culturally.",
    trigger:"Churn>0.7 for 4wks AND Threat>80 AND SchemeROI<0.5x",
    authority:"Senior leadership explicit sign-off. Cannot auto-execute.",
    logic:"IF ALL THREE for 4 weeks AND ros < cluster_bottom_quartile\nTHEN RECOMMEND concession\n  freed_budget = SUM(scheme_payouts + cooler_amort + salesman_cost)\n  redeployment_impact = freed * best_alternative_ROI\n  PRESENT: 'Conceding N outlets frees Rs X/mo. Redeploying generates Y cases.'",
    actions:"Withdraw schemes, reassign salesman time, redeploy cooler, reallocate budget",
    constraints:"Requires senior sign-off. Concession list reviewed quarterly for re-entry.",
    connTo:["M_ChurnProb","M_CompThreat","M_SchemeROI","M_SpendIntensity"]},
  { id:"D_CoolerPlacement",label:"Cooler Placement",domain:"decision",size:10,
    def:"Where to deploy/redeploy cooler assets. Rs 15-25K capital per unit.",
    trigger:"New cooler inventory OR concession frees cooler OR RoS>8 without cooler",
    authority:"ASM recommend, ZSM approve new; senior for redeployment",
    logic:"SCORE: placement = RoS_potential * (1-churn_prob) * channel_factor\n  channel_factor: MT=1.3, Conv=1.2, GT_urban=1.0, GT_rural=0.7\nDEPLOY to highest unequipped\nREDEPLOY from concession to next in queue",
    actions:"Deploy, update asset register, set exclusivity, schedule weekly audit (month 1)",
    constraints:"Fleet limited by capex. Min 12-month commitment for new placements.",
    connTo:["M_CoolerCompliance","M_RoS","M_ChurnProb","M_VisibleShelf"]},
  { id:"D_DistributorAction",label:"Distributor Intervention",domain:"decision",size:10,
    def:"Action on underperforming distributors. Coverage, WC stress, multi-brand conflict.",
    trigger:"Coverage<70% for 2 months OR FillRate<80% OR WCDays>40",authority:"ASM flags, ZSM decides",
    logic:"IF coverage_drop AND wc<30 THEN execution: salesman/fleet/beat\nIF coverage_drop AND wc>35 THEN financial: credit support or resize\nIF multi_brand AND slmg_share declining THEN comp prioritization: PIP or reassign",
    actions:"Resize territory, credit support, retrain, PIP, termination, split",
    constraints:"Termination = 90-day notice + alternate coverage. Splits need adjacent capacity.",
    connTo:["M_CoverageEfficiency","M_FillRate","M_WCDays","M_BeatProductivity"]},
  { id:"D_CounterMove",label:"Competitive Counter-Move",domain:"decision",size:11,
    def:"Pre-approved playbook for competitive actions. Detect, classify, execute without delays.",
    trigger:"Comp distributor entry | Comp price cut >10% | Comp cooler in SLMG outlet",
    authority:"Pre-approved by Commercial Head; ASM executes within parameters",
    logic:"IF new_comp_distributor THEN Retention Scheme A: margin bump top 50 outlets, sourced from 5% zone contingency\nIF price_cut>10% THEN Price-Match on affected SKU-pack, 4wk duration\nIF comp_cooler_in_outlet THEN salesman visit 24hrs + compliance incentive",
    actions:"Activate counter-scheme, salesman blitz, escalate to ZSM",
    constraints:"Pre-approved only. Novel situations = standard approval. Contingency = 5% zone budget.",
    connTo:["M_CompThreat","M_NielsenShare","M_RoS","M_SchemeParticipation"]},
  { id:"D_SchemeKill",label:"Scheme Kill/Continue",domain:"decision",size:10,
    def:"Terminate underperforming schemes mid-cycle, redeploy budget.",
    trigger:"ROI<1.0x at 50% duration AND Participation<40%",authority:"Commercial proposes, ZSM approves",
    logic:"AT midpoint: IF roi<1.0 AND participation<40% THEN KILL\n  remaining = budget - spent\n  alt_roi = MAX(roi) of active schemes in zone\n  PRESENT: 'Continuing wastes Rs X. Redeploying to [best] generates Y cases.'",
    actions:"Terminate, notify distributors (48hr wind-down), reallocate to highest-ROI scheme",
    constraints:"48hr distributor notice. Cannot kill if participation>70% (may be measurement lag).",
    connTo:["M_SchemeROI","M_SchemeParticipation","M_BudgetUtil"]},
  { id:"D_SeasonalPrePos",label:"Seasonal Pre-Position",domain:"decision",size:10,
    def:"Pre-summer strategy. Detect comp moves Jan-Feb, pre-position before March spike.",
    trigger:"Jan 15 annually (fixed) + off-cycle comp infrastructure Nov-Feb",authority:"Leadership team",
    logic:"ANALYZE (Nov-Jan): comp distributor sign-ups 90d, cooler placements, RCPL expansion signals\nPRE-ALLOCATE 60% of Q1 budget to highest-threat territories\nLOCK distributor agreements pre-summer\nPRE-DEPLOY coolers to at-risk outlets before March",
    actions:"Lock agreements, pre-deploy coolers, pre-authorize counters, increase visit frequency",
    constraints:"Commitments are binding. Budget lock needs Q4 review. Cooler pre-deploy uses next-year capex.",
    connTo:["M_CompThreat","M_WeightedDist","M_CoverageEfficiency","M_NielsenShare"]},
  { id:"D_PackPush",label:"Pack Format Push",domain:"decision",size:9,
    def:"Which pack format where. Rs 10 sachet rural, 500ml PET urban impulse, 2L MT home.",
    trigger:"Pack-level RoS substitution OR comp price-point entry at pack size",authority:"Commercial + brand team",
    logic:"IF rural AND ros_declining_300ml AND campa_10rs_present\n  THEN push Rs10 sachet entry pack + margin scheme\nIF urban_mt AND lahori_500ml_gaining\n  THEN push Limca/Sprite 500ml + display scheme\nIF home_channel AND comp_2L_price_cut\n  THEN push party pack 2L + consumer multi-buy",
    actions:"Adjust SKU mix at distributor, create pack-specific scheme, update salesman recommendation",
    constraints:"Pack availability depends on plant schedule. New packs need 4-week lead. Brand approval required.",
    connTo:["M_RoS","M_CompThreat","M_VisibleShelf","M_SchemeROI"]},
];

// ═══ EDGES ═══
const entityEdges = [
  {source:"E_Outlet",target:"E_CoolerAsset",rel:"HAS_COOLER",card:"1:0..n"},
  {source:"E_Outlet",target:"E_ShelfPosition",rel:"HAS_SHELF",card:"1:n"},
  {source:"E_Outlet",target:"E_RetailerCredit",rel:"HAS_CREDIT",card:"1:1"},
  {source:"E_Distributor",target:"E_Outlet",rel:"SERVES",card:"1:n"},
  {source:"E_Distributor",target:"E_Beat",rel:"OPERATES",card:"1:n"},
  {source:"E_Distributor",target:"E_Warehouse",rel:"STOCKS_FROM",card:"n:1"},
  {source:"E_Distributor",target:"E_Fleet",rel:"OWNS_FLEET",card:"1:n"},
  {source:"E_DeliveryOrder",target:"E_Outlet",rel:"DELIVERED_TO",card:"n:1"},
  {source:"E_DeliveryOrder",target:"E_Distributor",rel:"FULFILLED_BY",card:"n:1"},
  {source:"E_DeliveryOrder",target:"E_SKU",rel:"CONTAINS",card:"n:n"},
  {source:"E_Scheme",target:"E_SchemeMechanic",rel:"USES_MECHANIC",card:"n:1"},
  {source:"E_Scheme",target:"E_BudgetEnvelope",rel:"FUNDED_BY",card:"n:1"},
  {source:"E_SchemePayout",target:"E_Scheme",rel:"UNDER_SCHEME",card:"n:1"},
  {source:"E_SchemePayout",target:"E_Outlet",rel:"PAID_TO",card:"n:1"},
  {source:"E_SKU",target:"E_Brand",rel:"BELONGS_TO",card:"n:1"},
  {source:"E_SKU",target:"E_Category",rel:"IN_CATEGORY",card:"n:1"},
  {source:"E_SKU",target:"E_PackFormat",rel:"HAS_FORMAT",card:"n:1"},
  {source:"E_CompPresence",target:"E_Outlet",rel:"OBSERVED_AT",card:"n:1"},
  {source:"E_CompPresence",target:"E_CompBrand",rel:"BRAND_IS",card:"n:1"},
  {source:"E_NielsenAudit",target:"E_Zone",rel:"MAPS_TO_ZONE",card:"n:n"},
  {source:"E_Zone",target:"E_ASMTerritory",rel:"CONTAINS",card:"1:n"},
  {source:"E_ASMTerritory",target:"E_PincodeCluster",rel:"CONTAINS",card:"1:n"},
  {source:"E_PincodeCluster",target:"E_TownClass",rel:"CLASSIFIED_AS",card:"n:1"},
  {source:"E_Salesman",target:"E_Beat",rel:"WORKS_BEAT",card:"1:n"},
  {source:"E_Salesman",target:"E_Distributor",rel:"EMPLOYED_BY",card:"n:1"},
  {source:"E_ASM",target:"E_ASMTerritory",rel:"MANAGES",card:"1:1"},
  {source:"E_SalesmanVisit",target:"E_Salesman",rel:"BY_SALESMAN",card:"n:1"},
  {source:"E_SalesmanVisit",target:"E_Outlet",rel:"AT_OUTLET",card:"n:1"},
  {source:"E_BudgetEnvelope",target:"E_Zone",rel:"ALLOCATED_TO",card:"n:1"},
  {source:"E_Season",target:"E_Category",rel:"AFFECTS_DEMAND",card:"n:n"},
  {source:"E_Scheme",target:"E_Zone",rel:"ACTIVE_IN",card:"n:n"},
];
const metricEdges=[],decisionEdges=[];
metricNodes.forEach(m=>{m.connTo.forEach(t=>{metricEdges.push({source:m.id,target:t,rel:"MEASURED_ON",card:""})})});
decisionNodes.forEach(d=>{d.connTo.forEach(t=>{decisionEdges.push({source:d.id,target:t,rel:"INFORMED_BY",card:""})})});
const decDecEdges=[
  {source:"D_BudgetSplit",target:"D_TerritoryPriority",rel:"CONSTRAINS",card:""},
  {source:"D_TerritoryPriority",target:"D_SchemeDesign",rel:"SCOPES",card:""},
  {source:"D_SchemeDesign",target:"D_OutletInvestment",rel:"PARAMETERS",card:""},
  {source:"D_EmergencyRedeploy",target:"D_SchemeKill",rel:"SOURCES_FROM",card:""},
  {source:"D_Concession",target:"D_CoolerPlacement",rel:"FREES_ASSET",card:""},
  {source:"D_Concession",target:"D_EmergencyRedeploy",rel:"FREES_BUDGET",card:""},
  {source:"D_CounterMove",target:"D_OutletInvestment",rel:"OVERRIDES",card:""},
  {source:"D_SeasonalPrePos",target:"D_BudgetSplit",rel:"INFORMS_ANNUAL",card:""},
  {source:"D_PackPush",target:"D_SchemeDesign",rel:"SPECIFIES_SKU",card:""},
];
const allEdges=[...entityEdges,...metricEdges,...decisionEdges,...decDecEdges];
const allNodesDef=[...ontologyNodes.map(n=>({...n,layer:"ontology"})),...metricNodes.map(n=>({...n,layer:"metric"})),...decisionNodes.map(n=>({...n,layer:"decision"}))];

// ═══ COMPONENT ═══
export default function SLMG_BKG(){
  const svgRef=useRef(null);const[selected,setSelected]=useState(null);const[activeLayer,setActiveLayer]=useState("all");const[stats,setStats]=useState({nodes:0,edges:0});

  useEffect(()=>{
    if(!svgRef.current)return;const svg=d3.select(svgRef.current);svg.selectAll("*").remove();
    const W=svgRef.current.clientWidth,H=svgRef.current.clientHeight;
    const fN=activeLayer==="all"?allNodesDef.map(n=>({...n})):allNodesDef.filter(n=>n.layer===activeLayer).map(n=>({...n}));
    const nIds=new Set(fN.map(n=>n.id));
    const fE=allEdges.filter(e=>nIds.has(e.source)&&nIds.has(e.target)).map(e=>({...e}));
    setStats({nodes:fN.length,edges:fE.length});

    const G=svg.append("g");
    const zB=d3.zoom().scaleExtent([0.1,4]).on("zoom",e=>G.attr("transform",e.transform));
    svg.call(zB);svg.call(zB.transform,d3.zoomIdentity.translate(W/2,H/2).scale(0.4));

    const defs=svg.append("defs");
    [["arr0","#E5E2DB"],["arr1","#2D5A3D"]].forEach(([id,col])=>{
      defs.append("marker").attr("id",id).attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5)
        .attr("markerWidth",4).attr("markerHeight",4).attr("orient","auto")
        .append("path").attr("d","M 0 1 L 10 5 L 0 9 z").attr("fill",col);
    });

    const sim=d3.forceSimulation(fN)
      .force("link",d3.forceLink(fE).id(d=>d.id).distance(d=>{
        const s=typeof d.source==="object"?d.source:fN.find(n=>n.id===d.source);
        const t=typeof d.target==="object"?d.target:fN.find(n=>n.id===d.target);
        return s?.layer!==t?.layer?250:160;
      }).strength(0.22))
      .force("charge",d3.forceManyBody().strength(-550))
      .force("center",d3.forceCenter(0,0))
      .force("collision",d3.forceCollide().radius(d=>d.size+22))
      .force("y",d3.forceY(d=>d.layer==="ontology"?-200:d.layer==="metric"?120:380).strength(0.14))
      .force("x",d3.forceX(d=>d.layer==="ontology"?(domains.indexOf(d.domain)-3)*110:0).strength(0.05));

    const lG=G.append("g");
    const lE=lG.selectAll("line").data(fE).join("line").attr("stroke",C.border).attr("stroke-width",0.9).attr("stroke-opacity",0.5).attr("marker-end","url(#arr0)");
    // ALWAYS-VISIBLE edge labels
    const lL=lG.selectAll(".el").data(fE).join("text").attr("class","el").text(d=>d.rel)
      .attr("font-size",6).attr("font-family",mono).attr("fill",C.muted).attr("text-anchor","middle").attr("dominant-baseline","central").attr("opacity",0.7);
    // ALWAYS-VISIBLE cardinality
    const lC=lG.selectAll(".cl").data(fE.filter(e=>e.card)).join("text").attr("class","cl").text(d=>d.card)
      .attr("font-size",5.5).attr("font-family",mono).attr("fill",C.amber).attr("text-anchor","middle").attr("dominant-baseline","central").attr("opacity",0.6);

    const nG=G.append("g");
    const nE=nG.selectAll("g").data(fN).join("g").style("cursor","pointer")
      .call(d3.drag().on("start",(e,d)=>{if(!e.active)sim.alphaTarget(0.3).restart();d.fx=d.x;d.fy=d.y}).on("drag",(e,d)=>{d.fx=e.x;d.fy=e.y}).on("end",(e,d)=>{if(!e.active)sim.alphaTarget(0);d.fx=null;d.fy=null}));

    nE.each(function(d){
      const el=d3.select(this);const col=d.layer==="metric"?DC.metric:d.layer==="decision"?DC.decision:DC[d.domain]||"#888";
      if(d.layer==="ontology"){el.append("circle").attr("r",d.size).attr("fill",col).attr("fill-opacity",0.9).attr("stroke","#fff").attr("stroke-width",2)}
      else if(d.layer==="metric"){const s=d.size;el.append("rect").attr("x",-s).attr("y",-s).attr("width",s*2).attr("height",s*2).attr("rx",2).attr("transform","rotate(45)").attr("fill",col).attr("fill-opacity",0.9).attr("stroke","#fff").attr("stroke-width",2)}
      else{const s=d.size;el.append("polygon").attr("points",`0,${-s*1.2} ${s*1.1},${s*0.8} ${-s*1.1},${s*0.8}`).attr("fill",col).attr("fill-opacity",0.9).attr("stroke","#fff").attr("stroke-width",2)}
      el.append("text").text(d.label).attr("y",d.size+14).attr("text-anchor","middle").attr("font-size",10).attr("font-family",font).attr("font-weight",500).attr("fill",C.ink);
    });

    function getConn(id){const s=new Set([id]);fE.forEach(e=>{const si=typeof e.source==="object"?e.source.id:e.source;const ti=typeof e.target==="object"?e.target.id:e.target;if(si===id)s.add(ti);if(ti===id)s.add(si)});return s}

    nE.on("mouseenter",(ev,d)=>{
      const conn=getConn(d.id);
      nE.attr("opacity",n=>conn.has(n.id)?1:0.12);
      lE.attr("stroke",e=>{const si=typeof e.source==="object"?e.source.id:e.source;const ti=typeof e.target==="object"?e.target.id:e.target;return(si===d.id||ti===d.id)?C.accent:C.border})
        .attr("stroke-width",e=>{const si=typeof e.source==="object"?e.source.id:e.source;const ti=typeof e.target==="object"?e.target.id:e.target;return(si===d.id||ti===d.id)?2.2:0.9})
        .attr("stroke-opacity",e=>{const si=typeof e.source==="object"?e.source.id:e.source;const ti=typeof e.target==="object"?e.target.id:e.target;return(si===d.id||ti===d.id)?0.9:0.1})
        .attr("marker-end",e=>{const si=typeof e.source==="object"?e.source.id:e.source;const ti=typeof e.target==="object"?e.target.id:e.target;return(si===d.id||ti===d.id)?"url(#arr1)":"url(#arr0)"});
      lL.attr("opacity",e=>{const si=typeof e.source==="object"?e.source.id:e.source;const ti=typeof e.target==="object"?e.target.id:e.target;return(si===d.id||ti===d.id)?1:0.2})
        .attr("font-size",e=>{const si=typeof e.source==="object"?e.source.id:e.source;const ti=typeof e.target==="object"?e.target.id:e.target;return(si===d.id||ti===d.id)?8:6})
        .attr("fill",e=>{const si=typeof e.source==="object"?e.source.id:e.source;const ti=typeof e.target==="object"?e.target.id:e.target;return(si===d.id||ti===d.id)?C.accent:C.muted});
      lC.attr("opacity",e=>{const si=typeof e.source==="object"?e.source.id:e.source;const ti=typeof e.target==="object"?e.target.id:e.target;return(si===d.id||ti===d.id)?1:0.15});
    }).on("mouseleave",()=>{
      nE.attr("opacity",1);lE.attr("stroke",C.border).attr("stroke-width",0.9).attr("stroke-opacity",0.5).attr("marker-end","url(#arr0)");
      lL.attr("opacity",0.7).attr("font-size",6).attr("fill",C.muted);lC.attr("opacity",0.6);
    }).on("click",(ev,d)=>{ev.stopPropagation();setSelected(allNodesDef.find(n=>n.id===d.id))});
    svg.on("click",()=>setSelected(null));

    sim.on("tick",()=>{
      lE.each(function(d){const sr=d.source.size||10,tr=d.target.size||10;const dx=d.target.x-d.source.x,dy=d.target.y-d.source.y;const dist=Math.sqrt(dx*dx+dy*dy)||1;
        d3.select(this).attr("x1",d.source.x+(dx/dist)*sr).attr("y1",d.source.y+(dy/dist)*sr).attr("x2",d.target.x-(dx/dist)*(tr+4)).attr("y2",d.target.y-(dy/dist)*(tr+4))});
      lL.attr("x",d=>(d.source.x+d.target.x)/2).attr("y",d=>(d.source.y+d.target.y)/2-4);
      lC.attr("x",d=>(d.source.x+d.target.x)/2).attr("y",d=>(d.source.y+d.target.y)/2+5);
      nE.attr("transform",d=>`translate(${d.x},${d.y})`);
    });
    setTimeout(()=>{const b=G.node().getBBox();const s=0.7/Math.max(b.width/W,b.height/H);svg.transition().duration(800).call(zB.transform,d3.zoomIdentity.translate(W/2-s*(b.x+b.width/2),H/2-s*(b.y+b.height/2)).scale(s))},2500);
    return()=>{sim.stop()};
  },[activeLayer]);

  const renderDetail=()=>{
    if(!selected)return null;const n=selected;
    const color=n.layer==="metric"?DC.metric:n.layer==="decision"?DC.decision:DC[n.domain]||"#888";
    return(
      <div style={{position:"absolute",top:12,right:12,width:420,maxHeight:"calc(100% - 24px)",background:C.card,border:`1px solid ${C.border}`,borderRadius:8,overflow:"auto",zIndex:10,boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
        <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
            <div style={{width:10,height:10,borderRadius:n.layer==="ontology"?"50%":2,background:color,transform:n.layer==="metric"?"rotate(45deg)":"none",clipPath:n.layer==="decision"?"polygon(50% 0%, 100% 100%, 0% 100%)":"none"}}/>
            <span style={{fontFamily:mono,fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>{n.layer}{n.layer==="ontology"?` / ${n.domain}`:""}</span>
          </div>
          <div style={{fontFamily:serif,fontSize:18,fontWeight:700,color:C.ink}}>{n.label}</div>
          <div style={{fontFamily:font,fontSize:12.5,color:C.sub,marginTop:4,lineHeight:1.5}}>{n.def}</div>
        </div>
        <div style={{padding:"12px 20px"}}>
          {n.layer==="ontology"&&<>
            <DB label="Grain" value={n.grain}/>
            <DB label="Attributes" value={n.attributes?.join(", ")}/>
            {n.data_mapping&&<>
              <DB label="Primary Table" value={n.data_mapping.primary_table} mono/>
              <DB label="Primary Key" value={Array.isArray(n.data_mapping.primary_key)?n.data_mapping.primary_key.join(", "):n.data_mapping.primary_key} mono/>
              <DB label="Base Query" value={n.data_mapping.base_query} mono/>
              {n.data_mapping.filters&&<div style={{marginBottom:12}}>
                <div style={{fontFamily:mono,fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Filters</div>
                {Object.entries(n.data_mapping.filters).map(([k,v])=><div key={k} style={{fontFamily:mono,fontSize:10,color:C.ink,marginBottom:2}}><span style={{color:C.accent}}>{k}:</span> {v}</div>)}
              </div>}
              {n.data_mapping.joins_to_other_nodes&&<div style={{marginBottom:12}}>
                <div style={{fontFamily:mono,fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Joins to Other Nodes</div>
                {Object.entries(n.data_mapping.joins_to_other_nodes).map(([k,v])=><div key={k} style={{marginBottom:6}}>
                  <div style={{fontFamily:font,fontSize:11,fontWeight:600,color:C.accent}}>→ {k}</div>
                  <div style={{fontFamily:mono,fontSize:10,color:C.ink,background:"#F5F4F0",padding:"4px 6px",borderRadius:3,marginTop:2}}>{v.join_sql}</div>
                  <div style={{fontFamily:mono,fontSize:9,color:C.muted,marginTop:1}}>join_key: {v.join_key}</div>
                  {v.note&&<div style={{fontFamily:font,fontSize:10,color:C.amber,marginTop:1}}>{v.note}</div>}
                </div>)}
              </div>}
            </>}
          </>}
          {n.layer==="metric"&&<>
            <DB label="Formula" value={n.formula} mono/>
            <DB label="Formula SQL" value={n.formula_sql} mono/>
            <DB label="Unit" value={n.unit}/>
            <div style={{marginBottom:12}}>
              <div style={{fontFamily:mono,fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Thresholds</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <Pill color={C.teal} text={`Good: ${n.thresholds.good}`}/>
                <Pill color={C.amber} text={`Warn: ${n.thresholds.warning}`}/>
                <Pill color={C.red} text={`Crit: ${n.thresholds.critical}`}/>
              </div>
            </div>
            {n.diagnostic&&<div style={{marginBottom:12}}>
              <div style={{fontFamily:mono,fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Diagnostic Tree</div>
              {n.diagnostic.map((d,i)=><div key={i} style={{display:"flex",gap:8,marginBottom:4}}>
                <span style={{fontFamily:mono,fontSize:10,color:C.accent,fontWeight:600,flexShrink:0}}>Step {d.step}</span>
                <div><div style={{fontFamily:font,fontSize:11,color:C.ink}}>{d.check}</div><div style={{fontFamily:mono,fontSize:9,color:C.muted}}>→ {d.traverse_to}</div></div>
              </div>)}
            </div>}
          </>}
          {n.layer==="decision"&&<>
            <DB label="Trigger" value={n.trigger}/>
            <DB label="Authority" value={n.authority}/>
            <DB label="Evaluation Logic" value={n.logic} mono/>
            <DB label="Actions" value={n.actions}/>
            <DB label="Constraints" value={n.constraints}/>
          </>}
        </div>
      </div>);
  };

  return(
    <div style={{width:"100%",height:"100vh",background:C.bg,fontFamily:font,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,zIndex:5,background:"linear-gradient(to bottom, rgba(250,250,248,0.98) 70%, rgba(250,250,248,0))",padding:"16px 24px 32px"}}>
        <div style={{display:"flex",alignItems:"baseline",gap:12}}>
          <span style={{fontFamily:font,fontWeight:700,fontSize:16,color:C.accent,letterSpacing:-0.3}}>questt.</span>
          <span style={{fontFamily:serif,fontSize:20,fontWeight:700,color:C.ink}}>SLMG Beverages</span>
          <span style={{fontFamily:font,fontSize:13,color:C.muted}}>Intelligence Warehouse / Business Knowledge Graph</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginTop:12}}>
          <span style={{fontFamily:mono,fontSize:9,color:C.muted,letterSpacing:1}}>LAYER</span>
          {["all","ontology","metric","decision"].map(l=>(
            <button key={l} onClick={()=>setActiveLayer(l)} style={{padding:"4px 12px",borderRadius:4,fontSize:11,fontFamily:font,fontWeight:500,border:`1px solid ${activeLayer===l?C.accent:C.border}`,background:activeLayer===l?C.accent:C.card,color:activeLayer===l?"#fff":C.sub,cursor:"pointer",transition:"all 0.15s"}}>
              {l==="all"?"All Layers":l.charAt(0).toUpperCase()+l.slice(1)}
            </button>))}
          <span style={{fontFamily:mono,fontSize:10,color:C.muted,marginLeft:16}}>{stats.nodes} nodes / {stats.edges} edges</span>
        </div>
      </div>
      <div style={{position:"absolute",bottom:16,left:24,zIndex:5,background:`${C.card}F0`,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 16px",display:"flex",flexWrap:"wrap",gap:12,maxWidth:600}}>
        <span style={{fontFamily:mono,fontSize:9,color:C.muted,letterSpacing:1,width:"100%",marginBottom:2}}>DOMAINS</span>
        {domains.map(d=><div key={d} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:"50%",background:DC[d]}}/><span style={{fontSize:10,fontFamily:font,color:C.sub}}>{d}</span></div>)}
        <div style={{width:"100%",height:1,background:C.border,margin:"2px 0"}}/>
        <span style={{fontFamily:mono,fontSize:9,color:C.muted,letterSpacing:1,width:"100%",marginBottom:2}}>SHAPES</span>
        <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:"50%",background:C.sub}}/><span style={{fontSize:10,fontFamily:font,color:C.sub}}>Entity (Ontology)</span></div>
        <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,background:DC.metric,transform:"rotate(45deg)",borderRadius:1}}/><span style={{fontSize:10,fontFamily:font,color:C.sub}}>Metric (KPI)</span></div>
        <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderBottom:`9px solid ${DC.decision}`}}/><span style={{fontSize:10,fontFamily:font,color:C.sub}}>Decision</span></div>
      </div>
      <svg ref={svgRef} style={{width:"100%",height:"100%"}}/>
      {renderDetail()}
      {!selected&&<div style={{position:"absolute",bottom:16,right:24,zIndex:5,fontFamily:font,fontSize:11,color:C.muted,background:`${C.card}E0`,padding:"6px 12px",borderRadius:4,border:`1px solid ${C.border}`}}>Hover to trace. Click for detail. Scroll to zoom. Drag to pan.</div>}
    </div>);
}

function DB({label,value,mono:isMono}){if(!value)return null;return(
  <div style={{marginBottom:12}}>
    <div style={{fontFamily:mono,fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{label}</div>
    <div style={{fontFamily:isMono?mono:font,fontSize:isMono?10.5:12,color:C.ink,lineHeight:1.55,whiteSpace:isMono?"pre-wrap":"normal",background:isMono?"#F5F4F0":"transparent",padding:isMono?"8px 10px":0,borderRadius:isMono?4:0,wordBreak:"break-word",overflowX:isMono?"auto":"visible"}}>{value}</div>
  </div>)}

function Pill({color,text}){return(<span style={{display:"inline-block",padding:"2px 8px",borderRadius:3,background:`${color}15`,border:`1px solid ${color}30`,fontFamily:mono,fontSize:10,color}}>{text}</span>)}

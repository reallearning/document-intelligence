"use client"
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// ─── CROMPTON DATA ───────────────────────────────────────────────────────────

const initialNodes = [
  // A) Product & Master Data (Durables: Fans, Lighting, Pumps, Water Heaters, Appliances)
  { id: 'sku', name: 'SKU', group: 'Product', color: '#3B82F6', size: 18, type: 'circle', properties: ['sku_id', 'sku_name', 'status', 'brand_id', 'variant_id', 'category_id', 'segment_id', 'model_series', 'mrp', 'star_rating', 'base_uom', 'warranty_months', 'installation_required'] },
  { id: 'brand', name: 'Brand', group: 'Product', color: '#3B82F6', size: 16, type: 'circle', properties: ['brand_id', 'brand_name', 'portfolio', 'quality_rating', 'reliability_index', 'brand_promise', 'status'] },
  { id: 'variant', name: 'Variant', group: 'Product', color: '#3B82F6', size: 14, type: 'circle', properties: ['variant_id', 'variant_name', 'color', 'finish', 'wattage', 'capacity', 'status'] },
  { id: 'category', name: 'Category', group: 'Product', color: '#3B82F6', size: 14, type: 'circle', properties: ['category_id', 'category_name', 'category_type'] },
  { id: 'segment', name: 'Segment', group: 'Product', color: '#3B82F6', size: 14, type: 'circle', properties: ['segment_id', 'segment_name', 'price_band'] },
  { id: 'modelseries', name: 'ModelSeries', group: 'Product', color: '#3B82F6', size: 12, type: 'circle', properties: ['series_id', 'series_name', 'launch_year', 'target_segment'] },
  { id: 'uom', name: 'UoM', group: 'Product', color: '#3B82F6', size: 11, type: 'circle', properties: ['uom_id', 'uom_code', 'uom_desc'] },
  { id: 'bom', name: 'BillOfMaterials', group: 'Product', color: '#8B5CF6', size: 12, type: 'circle', properties: ['bom_id', 'sku_id', 'version', 'valid_from', 'valid_to'] },
  { id: 'bomcomponent', name: 'BOMComponent', group: 'Product', color: '#8B5CF6', size: 10, type: 'circle', properties: ['bom_component_id', 'bom_id', 'material_id', 'qty_per_unit', 'uom'] },
  { id: 'material', name: 'Material', group: 'Product', color: '#8B5CF6', size: 12, type: 'circle', properties: ['material_id', 'material_name', 'material_type', 'base_uom'] },

  // B) Geography, Seasonality & Time
  { id: 'geography', name: 'GeographyNode', group: 'Geography', color: '#10B981', size: 16, type: 'circle', properties: ['geo_id', 'geo_name', 'geo_type', 'parent_geo_id', 'climate_zone'] },
  { id: 'seasonality', name: 'SeasonalityProfile', group: 'Geography', color: '#10B981', size: 14, type: 'circle', properties: ['profile_id', 'geo_id', 'category_id', 'peak_months', 'off_season_months', 'seasonal_index', 'demand_multiplier', 'pre_season_lead_weeks'] },
  { id: 'timeday', name: 'TimeDay', group: 'Time', color: '#14B8A6', size: 12, type: 'circle', properties: ['date', 'week_id', 'month_id', 'fiscal_period_id'] },
  { id: 'timeweek', name: 'TimeWeek', group: 'Time', color: '#14B8A6', size: 12, type: 'circle', properties: ['week_id', 'week_start_date', 'week_end_date', 'month_id'] },
  { id: 'timemonth', name: 'TimeMonth', group: 'Time', color: '#14B8A6', size: 12, type: 'circle', properties: ['month_id', 'month_start_date', 'month_end_date', 'fiscal_period_id'] },
  { id: 'fiscalperiod', name: 'FiscalPeriod', group: 'Time', color: '#14B8A6', size: 11, type: 'circle', properties: ['fiscal_period_id', 'fiscal_year', 'fiscal_quarter', 'start_date', 'end_date'] },

  // C) Channels (Crompton-specific)
  { id: 'ch_electrical_gt', name: 'Electrical Retailers (GT)', group: 'Channels', color: '#0891B2', size: 16, type: 'circle', properties: ['channel_id', 'channel_name', 'channel_type:GT', 'retailer_tier', 'counter_share_target', 'credit_period_days'] },
  { id: 'ch_appliance', name: 'Appliance Showrooms', group: 'Channels', color: '#0891B2', size: 15, type: 'circle', properties: ['channel_id', 'channel_name', 'channel_type:Showroom', 'display_area_sqft', 'demo_unit_required', 'experience_zone_flag'] },
  { id: 'ch_project', name: 'Project Sales (B2B)', group: 'Channels', color: '#0891B2', size: 15, type: 'circle', properties: ['channel_id', 'channel_name', 'channel_type:B2B', 'project_type', 'builder_contractor_id', 'tender_flag', 'bulk_discount_slab'] },
  { id: 'ch_mt', name: 'Modern Trade Durables', group: 'Channels', color: '#0891B2', size: 15, type: 'circle', properties: ['channel_id', 'channel_name', 'channel_type:MT', 'chain_name', 'store_format', 'planogram_compliance', 'promo_calendar_id'] },

  // D) RTM / Customer / Dealer
  { id: 'customer', name: 'Customer', group: 'RTM', color: '#06B6D4', size: 17, type: 'circle', properties: ['customer_id', 'customer_name', 'customer_type', 'channel_id', 'status', 'credit_terms_code', 'gstin', 'annual_potential'] },
  { id: 'dealer', name: 'Dealer', group: 'RTM', color: '#06B6D4', size: 16, type: 'circle', properties: ['dealer_id', 'dealer_name', 'dealer_class', 'channel_id', 'geo_id', 'status', 'counter_share_pct', 'credit_limit'] },
  { id: 'customergroup', name: 'CustomerGroup', group: 'RTM', color: '#06B6D4', size: 12, type: 'circle', properties: ['customer_group_id', 'group_name', 'group_type'] },
  { id: 'builder', name: 'Builder/Contractor', group: 'RTM', color: '#06B6D4', size: 14, type: 'circle', properties: ['builder_id', 'builder_name', 'builder_type', 'project_volume_annual', 'preferred_categories', 'credit_rating'] },
  { id: 'mtchain', name: 'MT Chain Account', group: 'RTM', color: '#06B6D4', size: 13, type: 'circle', properties: ['chain_id', 'chain_name', 'store_count', 'listing_fee', 'payment_terms_days'] },
  { id: 'territory', name: 'SalesTerritory', group: 'RTM', color: '#06B6D4', size: 13, type: 'circle', properties: ['territory_id', 'territory_name', 'territory_level', 'rsm_id'] },
  { id: 'salesrep', name: 'SalesRep', group: 'RTM', color: '#06B6D4', size: 11, type: 'circle', properties: ['rep_id', 'rep_name', 'rep_type', 'territory_id'] },

  // E) Supply Network
  { id: 'supplynode', name: 'SupplyNode', group: 'Supply', color: '#F59E0B', size: 17, type: 'circle', properties: ['node_id', 'node_name', 'node_type', 'geo_id', 'status', 'capacity_units_per_month'] },
  { id: 'supplylane', name: 'SupplyNetworkLane', group: 'Supply', color: '#F59E0B', size: 13, type: 'circle', properties: ['lane_id', 'from_node_id', 'to_node_id', 'mode', 'lead_time_expected_days', 'cost_per_unit'] },
  { id: 'carrier', name: 'CarrierTransporter', group: 'Supply', color: '#F59E0B', size: 11, type: 'circle', properties: ['carrier_id', 'carrier_name', 'mode_supported'] },

  // F) Inventory
  { id: 'invposition', name: 'InventoryPosition', group: 'Inventory', color: '#EC4899', size: 16, type: 'circle', properties: ['inv_pos_id', 'sku_id', 'node_id', 'as_of_datetime', 'on_hand_qty', 'available_to_promise_qty', 'reserved_qty', 'in_transit_in_qty', 'in_transit_out_qty', 'channel_allocated_qty'] },
  { id: 'invmovement', name: 'InventoryMovement', group: 'Inventory', color: '#EC4899', size: 14, type: 'circle', properties: ['movement_id', 'movement_datetime', 'movement_type', 'sku_id', 'from_node_id', 'to_node_id', 'qty', 'uom', 'reference_doc_id'] },
  { id: 'reservation', name: 'ReservationAllocation', group: 'Inventory', color: '#EC4899', size: 12, type: 'circle', properties: ['reservation_id', 'created_datetime', 'sku_id', 'node_id', 'reserved_qty', 'uom', 'basis', 'channel_id'] },
  { id: 'lotbatch', name: 'LotBatch', group: 'Inventory', color: '#EC4899', size: 11, type: 'circle', properties: ['batch_id', 'sku_id', 'mfg_date', 'quality_status', 'serial_range_start', 'serial_range_end'] },

  // G) Orders & Fulfillment
  { id: 'salesorder', name: 'SalesOrder', group: 'Orders', color: '#EF4444', size: 17, type: 'circle', properties: ['order_id', 'order_type', 'order_status', 'order_datetime', 'requested_delivery_date', 'ordered_by_customer_id', 'ship_from_node_id', 'channel_id', 'project_ref'] },
  { id: 'orderline', name: 'SalesOrderLine', group: 'Orders', color: '#EF4444', size: 15, type: 'circle', properties: ['order_line_id', 'order_id', 'sku_id', 'requested_qty', 'uom', 'priority_code', 'promise_date'] },
  { id: 'fulfillment', name: 'FulfillmentEvent', group: 'Orders', color: '#EF4444', size: 14, type: 'circle', properties: ['fulfillment_id', 'order_id', 'event_type', 'event_status', 'event_datetime'] },
  { id: 'fulfillmentline', name: 'FulfillmentLine', group: 'Orders', color: '#EF4444', size: 13, type: 'circle', properties: ['fulfillment_line_id', 'fulfillment_id', 'order_line_id', 'sku_id', 'fulfilled_qty', 'fulfilled_uom'] },
  { id: 'orderoutcome', name: 'OrderOutcome', group: 'Orders', color: '#EF4444', size: 13, type: 'circle', properties: ['outcome_id', 'order_line_id', 'requested_qty', 'fulfilled_qty', 'shortfall_qty', 'fill_rate_line'] },

  // H) Sales
  { id: 'salestxn', name: 'SalesTransaction', group: 'Sales', color: '#8B5CF6', size: 16, type: 'circle', properties: ['txn_id', 'txn_type', 'txn_datetime', 'seller_customer_id', 'buyer_customer_id', 'channel_id', 'geo_id', 'invoice_no'] },
  { id: 'salesline', name: 'SalesLine', group: 'Sales', color: '#8B5CF6', size: 14, type: 'circle', properties: ['sales_line_id', 'txn_id', 'sku_id', 'qty', 'uom', 'net_value', 'gross_value', 'discount_pct'] },
  { id: 'returntxn', name: 'ReturnTransaction', group: 'Sales', color: '#8B5CF6', size: 12, type: 'circle', properties: ['return_id', 'return_datetime', 'from_customer_id', 'to_node_id', 'reason_code', 'status'] },
  { id: 'returnline', name: 'ReturnLine', group: 'Sales', color: '#8B5CF6', size: 11, type: 'circle', properties: ['return_line_id', 'return_id', 'sku_id', 'qty', 'reason_text'] },

  // I) Planning
  { id: 'forecast', name: 'Forecast', group: 'Planning', color: '#14B8A6', size: 14, type: 'circle', properties: ['forecast_id', 'period_id', 'sku_id', 'geo_id', 'channel_id', 'forecast_qty', 'seasonal_adj_factor', 'as_of_date'] },
  { id: 'demandplan', name: 'DemandPlan', group: 'Planning', color: '#14B8A6', size: 14, type: 'circle', properties: ['plan_id', 'plan_type', 'period_id', 'sku_id', 'geo_id', 'channel_id', 'planned_qty'] },
  { id: 'supplyplan', name: 'SupplyPlan', group: 'Planning', color: '#14B8A6', size: 12, type: 'circle', properties: ['supply_plan_id', 'period_id', 'plant_node_id', 'sku_id', 'planned_supply_qty'] },
  { id: 'seasonalplan', name: 'SeasonalStockPlan', group: 'Planning', color: '#14B8A6', size: 13, type: 'circle', properties: ['plan_id', 'season', 'geo_id', 'category_id', 'pre_stock_target_qty', 'build_start_week', 'peak_week'] },

  // J) Production
  { id: 'prodorder', name: 'ProductionOrder', group: 'Production', color: '#F59E0B', size: 14, type: 'circle', properties: ['prod_order_id', 'plant_node_id', 'sku_id', 'scheduled_date', 'planned_qty', 'produced_qty', 'status'] },
  { id: 'prodcapacity', name: 'ProductionCapacity', group: 'Production', color: '#F59E0B', size: 11, type: 'circle', properties: ['capacity_id', 'plant_node_id', 'date', 'available_hours', 'rated_units_per_hour'] },

  // K) Logistics
  { id: 'shipment', name: 'Shipment', group: 'Logistics', color: '#F59E0B', size: 15, type: 'circle', properties: ['shipment_id', 'from_node_id', 'to_node_id', 'dispatch_datetime', 'planned_arrival_datetime', 'actual_arrival_datetime', 'status', 'carrier_id'] },
  { id: 'shipmentline', name: 'ShipmentLine', group: 'Logistics', color: '#F59E0B', size: 13, type: 'circle', properties: ['shipment_line_id', 'shipment_id', 'sku_id', 'qty', 'uom'] },

  // L) After-Sales & Service (Crompton-specific)
  { id: 'servicecentre', name: 'ServiceCentre', group: 'AfterSales', color: '#D946EF', size: 16, type: 'circle', properties: ['centre_id', 'centre_name', 'centre_type', 'geo_id', 'partner_name', 'capacity_calls_per_day', 'categories_serviced', 'status'] },
  { id: 'warranty', name: 'WarrantyClaim', group: 'AfterSales', color: '#D946EF', size: 15, type: 'circle', properties: ['claim_id', 'product_serial', 'sku_id', 'customer_id', 'claim_date', 'issue_category', 'resolution_type', 'cost', 'status', 'tat_days'] },
  { id: 'servicerequest', name: 'ServiceRequest', group: 'AfterSales', color: '#D946EF', size: 14, type: 'circle', properties: ['request_id', 'request_type', 'sku_id', 'customer_contact', 'geo_id', 'assigned_centre_id', 'created_date', 'resolved_date', 'status', 'csat_score'] },
  { id: 'installation', name: 'InstallationRecord', group: 'AfterSales', color: '#D946EF', size: 13, type: 'circle', properties: ['install_id', 'sku_id', 'serial_number', 'install_date', 'technician_id', 'geo_id', 'channel_id', 'warranty_start_date'] },
  { id: 'productregistration', name: 'ProductRegistration', group: 'AfterSales', color: '#D946EF', size: 12, type: 'circle', properties: ['registration_id', 'serial_number', 'sku_id', 'purchase_date', 'customer_name', 'customer_phone', 'geo_id', 'warranty_expiry'] },

  // M) Pricing / Trade
  { id: 'pricelist', name: 'PriceList', group: 'Pricing', color: '#EF4444', size: 13, type: 'circle', properties: ['price_list_id', 'name', 'channel_id', 'geo_id', 'customer_group_id', 'valid_from', 'valid_to'] },
  { id: 'pricecondition', name: 'PriceCondition', group: 'Pricing', color: '#EF4444', size: 12, type: 'circle', properties: ['condition_id', 'price_list_id', 'sku_id', 'dealer_price', 'retailer_margin_pct', 'valid_from', 'valid_to'] },
  { id: 'tradespend', name: 'TradeSpendEvent', group: 'Pricing', color: '#EF4444', size: 12, type: 'circle', properties: ['trade_event_id', 'event_type', 'start_date', 'end_date', 'budget_value', 'season_linked'] },
  { id: 'tradealloc', name: 'TradeSpendAllocation', group: 'Pricing', color: '#EF4444', size: 11, type: 'circle', properties: ['alloc_id', 'trade_event_id', 'sku_id', 'customer_id', 'spend_value'] },

  // ── METRICS (hexagons) ──
  { id: 'm001', name: 'Sales Volume', group: 'Metrics', color: '#85A383', size: 16, type: 'hexagon', metricData: { metricId: 'M001', family: 'Sales', formula: 'SUM(SalesLine.qty)', unit: 'units', defaultGrain: 'SKU × Category × Channel × City × Month', businessIntent: 'Track total unit sales across products and channels' } },
  { id: 'm002', name: 'Sales Value', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon', metricData: { metricId: 'M002', family: 'Sales', formula: 'SUM(SalesLine.net_value)', unit: '₹', defaultGrain: 'Brand × Channel × City × Month', businessIntent: 'Track net revenue across markets' } },
  { id: 'm003', name: 'Avg Monthly Offtake', group: 'Metrics', color: '#85A383', size: 14, type: 'hexagon', metricData: { metricId: 'M003', family: 'Sales', formula: 'AVG(SalesQty per Month over last 3 months)', unit: 'units/month', defaultGrain: 'SKU × City × Channel', businessIntent: 'Baseline demand pattern for planning, low repeat frequency' } },
  { id: 'm104', name: 'Fill Rate', group: 'Metrics', color: '#85A383', size: 16, type: 'hexagon', metricData: { metricId: 'M104', family: 'Service', formula: 'SUM(fulfilled_qty) / SUM(requested_qty)', unit: '%', defaultGrain: 'Ship-from Node × Customer × SKU × Month', businessIntent: 'Primary order service metric' } },
  { id: 'm107', name: 'OTIF %', group: 'Metrics', color: '#85A383', size: 16, type: 'hexagon', metricData: { metricId: 'M107', family: 'Service', formula: 'COUNT(orders OnTime AND InFull) / COUNT(orders)', unit: '%', defaultGrain: 'Ship-from Node × Customer × Month', businessIntent: 'Gold standard service metric' } },
  { id: 'm201', name: 'On-Hand Inventory', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon', metricData: { metricId: 'M201', family: 'Inventory', formula: 'SUM(InventoryPosition.on_hand_qty)', unit: 'units', defaultGrain: 'SKU × Node × Day', businessIntent: 'Current stock position across network' } },
  { id: 'm204', name: 'Weeks of Stock', group: 'Metrics', color: '#85A383', size: 16, type: 'hexagon', metricData: { metricId: 'M204', family: 'Inventory', formula: 'OnHandQty / Avg Weekly Sales', unit: 'weeks', defaultGrain: 'SKU × Node × Day', businessIntent: 'Inventory coverage vs demand velocity (durables = weeks not days)' } },
  { id: 'm301', name: 'Plan Attainment', group: 'Metrics', color: '#85A383', size: 14, type: 'hexagon', metricData: { metricId: 'M301', family: 'Planning', formula: 'ActualSalesQty / PlannedQty', unit: '%', defaultGrain: 'SKU/Brand × City × Channel × Month', businessIntent: 'Sales vs demand plan accuracy' } },
  { id: 'm302', name: 'Forecast Accuracy', group: 'Metrics', color: '#85A383', size: 14, type: 'hexagon', metricData: { metricId: 'M302', family: 'Planning', formula: 'AVG(ABS(Actual - Forecast) / Actual)', unit: '%', defaultGrain: 'SKU × Geo × Channel × Month', businessIntent: 'MAPE forecast error, critical for seasonal pre-stocking' } },
  { id: 'm501', name: 'Seasonal Index', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon', metricData: { metricId: 'M501', family: 'Seasonality', formula: 'MonthSales / AvgMonthlySales(12mo)', unit: 'index', defaultGrain: 'Category × Geo × Month', businessIntent: 'Geo-based demand seasonality factor (fans peak summer, heaters peak winter)' } },
  { id: 'm601', name: 'Warranty Claim Rate', group: 'Metrics', color: '#85A383', size: 14, type: 'hexagon', metricData: { metricId: 'M601', family: 'Quality', formula: 'COUNT(claims in period) / COUNT(units sold in cohort)', unit: '%', defaultGrain: 'SKU × Batch × Month', businessIntent: 'Product quality and reliability tracking' } },
  { id: 'm602', name: 'Service TAT', group: 'Metrics', color: '#85A383', size: 14, type: 'hexagon', metricData: { metricId: 'M602', family: 'AfterSales', formula: 'AVG(resolved_date - created_date)', unit: 'days', defaultGrain: 'ServiceCentre × Category × Month', businessIntent: 'After-sales service turnaround time' } },
  { id: 'm603', name: 'CSAT Score', group: 'Metrics', color: '#85A383', size: 13, type: 'hexagon', metricData: { metricId: 'M603', family: 'AfterSales', formula: 'AVG(ServiceRequest.csat_score)', unit: 'score', defaultGrain: 'ServiceCentre × Geo × Month', businessIntent: 'Customer satisfaction post-service' } },
  { id: 'm701', name: 'Numeric Distribution', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon', metricData: { metricId: 'M701', family: 'Distribution', formula: 'COUNT(dealers selling SKU) / COUNT(active dealers)', unit: '%', defaultGrain: 'SKU × City × Channel × Month', businessIntent: 'Market reach penetration across dealer network' } },
  { id: 'm702', name: 'Counter Share', group: 'Metrics', color: '#85A383', size: 15, type: 'hexagon', metricData: { metricId: 'M702', family: 'Distribution', formula: 'Crompton sales at dealer / Total category sales at dealer', unit: '%', defaultGrain: 'Dealer × Category × Month', businessIntent: 'Share of dealer shelf — critical GT metric for electricals' } },

  // ── DECISIONS (triangles) ──
  { id: 'd001', name: 'Dealer Stock-Risk', group: 'Decisions', color: '#02220E', size: 16, type: 'triangle', decisionData: { decisionId: 'D001', category: 'Inventory', output: 'Ranked list of dealers at risk of stockout (SKU-specific), by weeks-of-stock', optimizes: 'Reduce lost sales at dealer counter' } },
  { id: 'd002', name: 'Replenishment Qty', group: 'Decisions', color: '#02220E', size: 16, type: 'triangle', decisionData: { decisionId: 'D002', category: 'Inventory', output: 'Recommended ship quantities per SKU for each dealer/node', optimizes: 'Achieve target WOS and minimize order loss' } },
  { id: 'd003', name: 'Allocation Priority', group: 'Decisions', color: '#02220E', size: 16, type: 'triangle', decisionData: { decisionId: 'D003', category: 'Service', output: 'Allocation plan under limited ATP across channels', optimizes: 'Maximize service to priority channels (B2B project deadlines)' } },
  { id: 'd005', name: 'Seasonal Pre-Stock', group: 'Decisions', color: '#02220E', size: 16, type: 'triangle', decisionData: { decisionId: 'D005', category: 'Seasonality', output: 'Pre-season stock build plan by geo × category × week', optimizes: 'Ensure availability before peak demand (fans→summer, heaters→winter)' } },
  { id: 'd006', name: 'Fill-Rate Recovery', group: 'Decisions', color: '#02220E', size: 15, type: 'triangle', decisionData: { decisionId: 'D006', category: 'Service', output: 'Recommended actions when fill rate drops', optimizes: 'Increase fill rate / reduce shortfall quickly' } },
  { id: 'd010', name: 'Forecast Override', group: 'Decisions', color: '#02220E', size: 15, type: 'triangle', decisionData: { decisionId: 'D010', category: 'Planning', output: 'Suggested overrides by SKU × City/Channel × Period with seasonal adj', optimizes: 'Reduce forecast error, account for geo seasonality' } },
  { id: 'd012', name: 'Counter Share Growth', group: 'Decisions', color: '#02220E', size: 15, type: 'triangle', decisionData: { decisionId: 'D012', category: 'Distribution', output: 'Prioritized dealers for counter share improvement actions', optimizes: 'Grow share-of-shelf in GT electrical retail' } },
  { id: 'd013', name: 'Production Adjustment', group: 'Decisions', color: '#02220E', size: 15, type: 'triangle', decisionData: { decisionId: 'D013', category: 'Production', output: 'Recommended changes to production quantities by SKU for season', optimizes: 'Align production to seasonal demand curve' } },
  { id: 'd015', name: 'Service Network Coverage', group: 'Decisions', color: '#02220E', size: 15, type: 'triangle', decisionData: { decisionId: 'D015', category: 'AfterSales', output: 'Gaps in service centre coverage by geo × install base density', optimizes: 'Improve service TAT and CSAT, reinforce quality/reliability brand promise' } },
];

const initialLinks = [
  // Product hierarchy
  { source: 'brand', target: 'sku', label: 'HAS_SKU', type: 'solid' },
  { source: 'variant', target: 'sku', label: 'VARIANT_OF', type: 'solid' },
  { source: 'category', target: 'sku', label: 'CATEGORIZES', type: 'solid' },
  { source: 'segment', target: 'sku', label: 'SEGMENTS', type: 'solid' },
  { source: 'modelseries', target: 'sku', label: 'SERIES_OF', type: 'solid' },
  { source: 'sku', target: 'uom', label: 'MEASURED_IN', type: 'solid' },
  { source: 'bom', target: 'sku', label: 'BOM_FOR', type: 'solid' },
  { source: 'bomcomponent', target: 'bom', label: 'COMPONENT_OF', type: 'solid' },
  { source: 'bomcomponent', target: 'material', label: 'USES_MATERIAL', type: 'solid' },
  // Geography + Seasonality
  { source: 'geography', target: 'geography', label: 'PARENT_OF', type: 'solid' },
  { source: 'seasonality', target: 'geography', label: 'FOR_GEO', type: 'solid' },
  { source: 'seasonality', target: 'category', label: 'FOR_CATEGORY', type: 'solid' },
  // Time
  { source: 'timeweek', target: 'timeday', label: 'CONTAINS_DAY', type: 'solid' },
  { source: 'timemonth', target: 'timeweek', label: 'CONTAINS_WEEK', type: 'solid' },
  { source: 'fiscalperiod', target: 'timemonth', label: 'FISCAL_MONTH', type: 'dashed' },
  // Channel → Geography (each channel operates in geographies)
  { source: 'ch_electrical_gt', target: 'geography', label: 'OPERATES_IN', type: 'solid' },
  { source: 'ch_appliance', target: 'geography', label: 'OPERATES_IN', type: 'solid' },
  { source: 'ch_project', target: 'geography', label: 'OPERATES_IN', type: 'solid' },
  { source: 'ch_mt', target: 'geography', label: 'OPERATES_IN', type: 'solid' },
  // RTM
  { source: 'customer', target: 'geography', label: 'LOCATED_IN', type: 'solid' },
  { source: 'dealer', target: 'ch_electrical_gt', label: 'IN_CHANNEL', type: 'solid' },
  { source: 'dealer', target: 'geography', label: 'LOCATED_IN', type: 'solid' },
  { source: 'dealer', target: 'customer', label: 'IS_CUSTOMER', type: 'dashed' },
  { source: 'customer', target: 'customergroup', label: 'MEMBER_OF', type: 'dashed' },
  { source: 'builder', target: 'ch_project', label: 'IN_CHANNEL', type: 'solid' },
  { source: 'builder', target: 'geography', label: 'OPERATES_IN', type: 'solid' },
  { source: 'mtchain', target: 'ch_mt', label: 'IN_CHANNEL', type: 'solid' },
  { source: 'territory', target: 'geography', label: 'COVERS', type: 'solid' },
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
  // Orders
  { source: 'salesorder', target: 'customer', label: 'ORDERED_BY', type: 'solid' },
  { source: 'salesorder', target: 'supplynode', label: 'SHIPS_FROM', type: 'solid' },
  { source: 'orderline', target: 'salesorder', label: 'LINE_OF', type: 'solid' },
  { source: 'orderline', target: 'sku', label: 'ORDERS_SKU', type: 'solid' },
  { source: 'fulfillment', target: 'salesorder', label: 'FULFILLS', type: 'solid' },
  { source: 'fulfillmentline', target: 'fulfillment', label: 'LINE_OF', type: 'solid' },
  { source: 'fulfillmentline', target: 'orderline', label: 'FULFILLS_LINE', type: 'solid' },
  { source: 'orderoutcome', target: 'orderline', label: 'OUTCOME_FOR', type: 'dashed' },
  // Sales
  { source: 'salestxn', target: 'customer', label: 'SOLD_TO', type: 'solid' },
  { source: 'salestxn', target: 'geography', label: 'IN_GEO', type: 'dashed' },
  { source: 'salesline', target: 'salestxn', label: 'LINE_OF', type: 'solid' },
  { source: 'salesline', target: 'sku', label: 'SELLS_SKU', type: 'solid' },
  { source: 'returntxn', target: 'customer', label: 'FROM_CUSTOMER', type: 'solid' },
  { source: 'returnline', target: 'returntxn', label: 'LINE_OF', type: 'solid' },
  { source: 'returnline', target: 'sku', label: 'RETURNS_SKU', type: 'dashed' },
  // Planning
  { source: 'forecast', target: 'sku', label: 'FORECASTS', type: 'solid' },
  { source: 'forecast', target: 'seasonality', label: 'ADJUSTED_BY', type: 'dashed' },
  { source: 'demandplan', target: 'sku', label: 'PLANS_FOR', type: 'solid' },
  { source: 'supplyplan', target: 'sku', label: 'SUPPLIES', type: 'solid' },
  { source: 'seasonalplan', target: 'seasonality', label: 'BASED_ON', type: 'solid' },
  { source: 'seasonalplan', target: 'category', label: 'FOR_CATEGORY', type: 'solid' },
  { source: 'seasonalplan', target: 'geography', label: 'FOR_GEO', type: 'solid' },
  // Production
  { source: 'prodorder', target: 'sku', label: 'PRODUCES', type: 'solid' },
  { source: 'prodorder', target: 'supplynode', label: 'AT_PLANT', type: 'solid' },
  { source: 'prodcapacity', target: 'supplynode', label: 'CAPACITY_OF', type: 'dashed' },
  // Logistics
  { source: 'shipment', target: 'supplynode', label: 'FROM_NODE', type: 'solid' },
  { source: 'shipment', target: 'supplynode', label: 'TO_NODE', type: 'solid' },
  { source: 'shipment', target: 'carrier', label: 'VIA_CARRIER', type: 'dashed' },
  { source: 'shipmentline', target: 'shipment', label: 'LINE_OF', type: 'solid' },
  { source: 'shipmentline', target: 'sku', label: 'SHIPS_SKU', type: 'solid' },
  // After-Sales
  { source: 'servicecentre', target: 'geography', label: 'LOCATED_IN', type: 'solid' },
  { source: 'servicecentre', target: 'category', label: 'SERVICES_CATEGORY', type: 'dashed' },
  { source: 'warranty', target: 'sku', label: 'FOR_SKU', type: 'solid' },
  { source: 'warranty', target: 'servicecentre', label: 'HANDLED_BY', type: 'solid' },
  { source: 'warranty', target: 'customer', label: 'CLAIMED_BY', type: 'dashed' },
  { source: 'servicerequest', target: 'sku', label: 'FOR_SKU', type: 'solid' },
  { source: 'servicerequest', target: 'servicecentre', label: 'ASSIGNED_TO', type: 'solid' },
  { source: 'servicerequest', target: 'geography', label: 'IN_GEO', type: 'dashed' },
  { source: 'installation', target: 'sku', label: 'INSTALLS_SKU', type: 'solid' },
  { source: 'installation', target: 'geography', label: 'IN_GEO', type: 'dashed' },
  { source: 'productregistration', target: 'sku', label: 'REGISTERS_SKU', type: 'solid' },
  { source: 'productregistration', target: 'geography', label: 'IN_GEO', type: 'dashed' },
  { source: 'productregistration', target: 'installation', label: 'FROM_INSTALL', type: 'dashed' },
  // Pricing
  { source: 'pricecondition', target: 'pricelist', label: 'CONDITION_IN', type: 'solid' },
  { source: 'pricecondition', target: 'sku', label: 'PRICES_SKU', type: 'solid' },
  { source: 'tradespend', target: 'sku', label: 'TARGETS_SKU', type: 'dashed' },
  { source: 'tradealloc', target: 'tradespend', label: 'ALLOCATION_OF', type: 'solid' },
  { source: 'tradealloc', target: 'customer', label: 'ALLOCATED_TO', type: 'dashed' },

  // ── Metric edges ──
  { source: 'm001', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm001', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm001', target: 'category', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm001', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm001', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm002', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm002', target: 'brand', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm002', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm002', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm003', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm003', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm003', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm104', target: 'orderline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm104', target: 'fulfillmentline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm104', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm104', target: 'customer', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm104', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm107', target: 'salesorder', label: 'USES_INPUT', type: 'metric' },
  { source: 'm107', target: 'fulfillmentline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm107', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm107', target: 'customer', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm201', target: 'invposition', label: 'USES_INPUT', type: 'metric' },
  { source: 'm201', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm201', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm204', target: 'invposition', label: 'USES_INPUT', type: 'metric' },
  { source: 'm204', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm204', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm204', target: 'supplynode', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm301', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm301', target: 'demandplan', label: 'USES_INPUT', type: 'metric' },
  { source: 'm301', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm301', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm302', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm302', target: 'forecast', label: 'USES_INPUT', type: 'metric' },
  { source: 'm302', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm302', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm501', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm501', target: 'seasonality', label: 'USES_INPUT', type: 'metric' },
  { source: 'm501', target: 'category', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm501', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm501', target: 'timemonth', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm601', target: 'warranty', label: 'USES_INPUT', type: 'metric' },
  { source: 'm601', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm601', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm601', target: 'lotbatch', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm602', target: 'servicerequest', label: 'USES_INPUT', type: 'metric' },
  { source: 'm602', target: 'servicecentre', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm602', target: 'category', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm603', target: 'servicerequest', label: 'USES_INPUT', type: 'metric' },
  { source: 'm603', target: 'servicecentre', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm603', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm701', target: 'dealer', label: 'USES_INPUT', type: 'metric' },
  { source: 'm701', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm701', target: 'sku', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm701', target: 'geography', label: 'GROUPED_BY', type: 'metric' },
  { source: 'm702', target: 'dealer', label: 'USES_INPUT', type: 'metric' },
  { source: 'm702', target: 'salesline', label: 'USES_INPUT', type: 'metric' },
  { source: 'm702', target: 'category', label: 'GROUPED_BY', type: 'metric' },

  // ── Decision edges ──
  { source: 'd001', target: 'm204', label: 'USES_METRIC', type: 'decision' },
  { source: 'd001', target: 'm201', label: 'USES_METRIC', type: 'decision' },
  { source: 'd001', target: 'dealer', label: 'USES_INPUT', type: 'decision' },
  { source: 'd001', target: 'invposition', label: 'USES_INPUT', type: 'decision' },
  { source: 'd001', target: 'sku', label: 'USES_INPUT', type: 'decision' },
  { source: 'd002', target: 'm204', label: 'USES_METRIC', type: 'decision' },
  { source: 'd002', target: 'm104', label: 'USES_METRIC', type: 'decision' },
  { source: 'd002', target: 'supplynode', label: 'USES_INPUT', type: 'decision' },
  { source: 'd002', target: 'dealer', label: 'USES_INPUT', type: 'decision' },
  { source: 'd002', target: 'sku', label: 'USES_INPUT', type: 'decision' },
  { source: 'd003', target: 'm104', label: 'USES_METRIC', type: 'decision' },
  { source: 'd003', target: 'm107', label: 'USES_METRIC', type: 'decision' },
  { source: 'd003', target: 'orderline', label: 'USES_INPUT', type: 'decision' },
  { source: 'd003', target: 'customer', label: 'USES_INPUT', type: 'decision' },
  { source: 'd005', target: 'm501', label: 'USES_METRIC', type: 'decision' },
  { source: 'd005', target: 'm204', label: 'USES_METRIC', type: 'decision' },
  { source: 'd005', target: 'seasonality', label: 'USES_INPUT', type: 'decision' },
  { source: 'd005', target: 'seasonalplan', label: 'USES_INPUT', type: 'decision' },
  { source: 'd005', target: 'geography', label: 'USES_INPUT', type: 'decision' },
  { source: 'd005', target: 'category', label: 'USES_INPUT', type: 'decision' },
  { source: 'd006', target: 'm104', label: 'USES_METRIC', type: 'decision' },
  { source: 'd006', target: 'orderline', label: 'USES_INPUT', type: 'decision' },
  { source: 'd006', target: 'fulfillmentline', label: 'USES_INPUT', type: 'decision' },
  { source: 'd006', target: 'invposition', label: 'USES_INPUT', type: 'decision' },
  { source: 'd010', target: 'm302', label: 'USES_METRIC', type: 'decision' },
  { source: 'd010', target: 'm501', label: 'USES_METRIC', type: 'decision' },
  { source: 'd010', target: 'forecast', label: 'USES_INPUT', type: 'decision' },
  { source: 'd010', target: 'seasonality', label: 'USES_INPUT', type: 'decision' },
  { source: 'd010', target: 'sku', label: 'USES_INPUT', type: 'decision' },
  { source: 'd012', target: 'm702', label: 'USES_METRIC', type: 'decision' },
  { source: 'd012', target: 'm701', label: 'USES_METRIC', type: 'decision' },
  { source: 'd012', target: 'dealer', label: 'USES_INPUT', type: 'decision' },
  { source: 'd012', target: 'sku', label: 'USES_INPUT', type: 'decision' },
  { source: 'd013', target: 'm301', label: 'USES_METRIC', type: 'decision' },
  { source: 'd013', target: 'm501', label: 'USES_METRIC', type: 'decision' },
  { source: 'd013', target: 'prodorder', label: 'USES_INPUT', type: 'decision' },
  { source: 'd013', target: 'demandplan', label: 'USES_INPUT', type: 'decision' },
  { source: 'd013', target: 'sku', label: 'USES_INPUT', type: 'decision' },
  { source: 'd015', target: 'm602', label: 'USES_METRIC', type: 'decision' },
  { source: 'd015', target: 'm603', label: 'USES_METRIC', type: 'decision' },
  { source: 'd015', target: 'servicecentre', label: 'USES_INPUT', type: 'decision' },
  { source: 'd015', target: 'installation', label: 'USES_INPUT', type: 'decision' },
  { source: 'd015', target: 'geography', label: 'USES_INPUT', type: 'decision' },
];

// ─── DETAIL PANELS ───────────────────────────────────────────────────────────

const CloseBtn = ({ onClick, light }) => (
  <button onClick={onClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: light ? '#9CA3AF' : '#6B7280' }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
  </button>
);
const HexIcon = ({ color = '#85A383', size = 18 }) => (
  <svg width={size} height={size} viewBox="-1 -1 2 2"><path d="M0,-0.866 L0.75,-0.433 L0.75,0.433 L0,0.866 L-0.75,0.433 L-0.75,-0.433Z" fill={color}/></svg>
);
const TriIcon = ({ color = '#02220E', size = 18 }) => (
  <svg width={size} height={size} viewBox="-1 -1 2 2"><path d="M0,-0.9 L0.8,0.45 L-0.8,0.45Z" fill={color}/></svg>
);

const renderNodeIcon = (n) => {
  if (!n) return null;
  if (n.type === 'hexagon') return <HexIcon color={n.color} size={10}/>;
  if (n.type === 'triangle') return <TriIcon color={n.color} size={10}/>;
  return <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: n.color }} />;
};

const panelBase = { width: 360, flexShrink: 0, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'auto', maxHeight: '100%', fontFamily: "'DM Sans', system-ui, sans-serif" };
const sectionLabel = { fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' };

const BusinessNodePanel = ({ node, links, nodes, onClose }) => {
  const outgoing = links.filter(l => (l.source.id || l.source) === node.id);
  const incoming = links.filter(l => (l.target.id || l.target) === node.id);
  return (
    <div style={panelBase}>
      <div style={{ position: 'sticky', top: 0, zIndex: 2, background: 'linear-gradient(135deg, #f8f9fa, #fff)', borderBottom: '1px solid #e5e7eb', padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: node.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: node.color }} />
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>{node.name}</div>
              <span style={{ fontSize: 11, background: '#f3f4f6', color: '#6b7280', padding: '2px 8px', borderRadius: 99, fontWeight: 500 }}>{node.group}</span>
            </div>
          </div>
          <CloseBtn onClick={onClose} />
        </div>
      </div>
      <div style={{ padding: '16px 20px 24px' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={sectionLabel}>Properties</span>
            <span style={{ fontSize: 10, color: '#d1d5db' }}>{node.properties?.length || 0} fields</span>
          </div>
          <div style={{ background: '#f9fafb', borderRadius: 10, padding: 14 }}>
            {(node.properties || []).map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#d1d5db', flexShrink: 0 }} />
                <code style={{ fontSize: 11, color: '#374151', fontFamily: "'JetBrains Mono', monospace" }}>{p}</code>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={sectionLabel}>Relationships</span>
            <span style={{ fontSize: 10, color: '#d1d5db' }}>{outgoing.length + incoming.length}</span>
          </div>
          {outgoing.length > 0 && <div style={{ marginBottom: 12 }}><div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6 }}>Outgoing ({outgoing.length})</div>{outgoing.map((link, i) => { const t = nodes.find(n => n.id === (link.target.id || link.target)); return (<div key={i} style={{ background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 10, padding: '8px 12px', marginBottom: 6 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"><path d="M13 7l5 5-5 5M6 12h12"/></svg><span style={{ fontSize: 10, fontWeight: 700, color: '#2563eb' }}>{link.label}</span></div><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 18 }}>{renderNodeIcon(t)}<span style={{ fontSize: 12, color: '#374151' }}>{t?.name}</span></div></div>); })}</div>}
          {incoming.length > 0 && <div><div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 6 }}>Incoming ({incoming.length})</div>{incoming.map((link, i) => { const s = nodes.find(n => n.id === (link.source.id || link.source)); return (<div key={i} style={{ background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: 10, padding: '8px 12px', marginBottom: 6 }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><path d="M11 17l-5-5 5-5M18 12H6"/></svg><span style={{ fontSize: 10, fontWeight: 700, color: '#16a34a' }}>{link.label}</span></div><div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 18 }}>{renderNodeIcon(s)}<span style={{ fontSize: 12, color: '#374151' }}>{s?.name}</span></div></div>); })}</div>}
        </div>
      </div>
    </div>
  );
};

const MetricNodePanel = ({ node, links, nodes, onClose }) => {
  const inputNodes = links.filter(l => (l.source.id || l.source) === node.id && l.label === 'USES_INPUT').map(l => nodes.find(n => n.id === (l.target.id || l.target))).filter(Boolean);
  const groupedByNodes = links.filter(l => (l.source.id || l.source) === node.id && l.label === 'GROUPED_BY').map(l => nodes.find(n => n.id === (l.target.id || l.target))).filter(Boolean);
  const md = node.metricData;
  return (
    <div style={panelBase}>
      <div style={{ position: 'sticky', top: 0, zIndex: 2, background: 'linear-gradient(135deg, #f0f7ef, #fff)', borderBottom: '1px solid #d4e8d2', padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#E8F0E7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><HexIcon color={node.color} size={24}/></div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>{node.name}</span><span style={{ fontSize: 10, fontFamily: 'monospace', background: '#E8F0E7', color: '#5A7359', padding: '2px 6px', borderRadius: 4 }}>{md.metricId}</span></div>
              <span style={{ fontSize: 11, background: '#E8F0E7', color: '#5A7359', padding: '2px 8px', borderRadius: 99, fontWeight: 500 }}>{md.family} Metric</span>
            </div>
          </div>
          <CloseBtn onClick={onClose} />
        </div>
      </div>
      <div style={{ padding: '16px 20px 24px' }}>
        <div style={{ marginBottom: 16 }}><span style={sectionLabel}>Business Intent</span><p style={{ fontSize: 13, color: '#374151', marginTop: 6, lineHeight: 1.5 }}>{md.businessIntent}</p></div>
        <div style={{ marginBottom: 16 }}><span style={sectionLabel}>Formula</span><div style={{ background: '#E8F0E7', border: '1px solid #B8CDB6', borderRadius: 10, padding: 12, marginTop: 6 }}><code style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: '#5A7359' }}>{md.formula}</code></div></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div><span style={sectionLabel}>Unit</span><div style={{ marginTop: 6 }}><span style={{ fontSize: 12, background: '#f3f4f6', color: '#374151', padding: '4px 10px', borderRadius: 99, fontWeight: 500 }}>{md.unit}</span></div></div>
          <div><span style={sectionLabel}>Inputs</span><div style={{ marginTop: 6 }}><span style={{ fontSize: 12, background: '#dbeafe', color: '#2563eb', padding: '4px 10px', borderRadius: 99, fontWeight: 500 }}>{inputNodes.length}</span></div></div>
        </div>
        <div style={{ marginBottom: 16 }}><span style={sectionLabel}>Default Grain</span><div style={{ background: '#f9fafb', borderRadius: 8, padding: '8px 12px', marginTop: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b7280' }}>{md.defaultGrain}</div></div>
        {inputNodes.length > 0 && <div style={{ marginBottom: 16 }}><span style={sectionLabel}>Component Nodes</span><div style={{ marginTop: 8 }}>{inputNodes.map((n, i) => (<div key={i} style={{ background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 10, padding: '8px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: n.color, flexShrink: 0 }} /><span style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>{n.name}</span><span style={{ fontSize: 10, color: '#9ca3af', marginLeft: 'auto' }}>{n.group}</span></div>))}</div></div>}
        {groupedByNodes.length > 0 && <div><span style={sectionLabel}>Dimensions</span><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{groupedByNodes.map((n, i) => (<span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: 99, padding: '4px 10px', fontSize: 11, fontWeight: 500, color: '#374151' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: n.color }} />{n.name}</span>))}</div></div>}
      </div>
    </div>
  );
};

const DecisionNodePanel = ({ node, links, nodes, onClose }) => {
  const metricNodes = links.filter(l => (l.source.id || l.source) === node.id && l.label === 'USES_METRIC').map(l => nodes.find(n => n.id === (l.target.id || l.target))).filter(Boolean);
  const inputNodes = links.filter(l => (l.source.id || l.source) === node.id && l.label === 'USES_INPUT').map(l => nodes.find(n => n.id === (l.target.id || l.target))).filter(Boolean);
  const dd = node.decisionData;
  return (
    <div style={panelBase}>
      <div style={{ position: 'sticky', top: 0, zIndex: 2, background: 'linear-gradient(135deg, #1f2937, #111827)', borderBottom: '1px solid #374151', padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TriIcon color="#02220E" size={24}/></div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>{node.name}</span><span style={{ fontSize: 10, fontFamily: 'monospace', background: '#374151', color: '#d1d5db', padding: '2px 6px', borderRadius: 4 }}>{dd.decisionId}</span></div>
              <span style={{ fontSize: 11, background: '#374151', color: '#d1d5db', padding: '2px 8px', borderRadius: 99, fontWeight: 500 }}>{dd.category}</span>
            </div>
          </div>
          <CloseBtn onClick={onClose} light />
        </div>
      </div>
      <div style={{ padding: '16px 20px 24px' }}>
        <div style={{ marginBottom: 16 }}><span style={sectionLabel}>Decision Output</span><p style={{ fontSize: 13, color: '#374151', marginTop: 6, lineHeight: 1.5 }}>{dd.output}</p></div>
        <div style={{ marginBottom: 16 }}><span style={sectionLabel}>Optimizes</span><div style={{ background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: 10, padding: 12, marginTop: 6, fontSize: 13, color: '#166534' }}>{dd.optimizes}</div></div>
        {metricNodes.length > 0 && <div style={{ marginBottom: 16 }}><span style={sectionLabel}>Used Metrics</span><div style={{ marginTop: 8 }}>{metricNodes.map((n, i) => (<div key={i} style={{ background: '#f0f7ef', border: '1px solid #d4e8d2', borderRadius: 10, padding: '8px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}><HexIcon color={n.color} size={14}/><span style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>{n.name}</span>{n.metricData && <span style={{ fontSize: 10, color: '#9ca3af', marginLeft: 'auto' }}>{n.metricData.unit}</span>}</div>))}</div></div>}
        {inputNodes.length > 0 && <div><span style={sectionLabel}>Input Business Nodes</span><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>{inputNodes.map((n, i) => (<span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 99, padding: '4px 10px', fontSize: 11, fontWeight: 500, color: '#374151' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: n.color }} />{n.name}</span>))}</div></div>}
      </div>
    </div>
  );
};

// ─── MAIN ────────────────────────────────────────────────────────────────────

const CromptonBKG = () => {
  const svgRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes] = useState(initialNodes);
  const [links] = useState(initialLinks);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const width = 1400, height = 700;
    svg.attr('width', width).attr('height', height).attr('viewBox', `0 0 ${width} ${height}`);
    const g = svg.append('g');
    const zoom = d3.zoom().scaleExtent([0.25, 3]).on('zoom', (e) => g.attr('transform', e.transform));
    svg.call(zoom);
    svg.call(zoom.transform, d3.zoomIdentity.translate(50, 0).scale(0.75));

    const defs = g.append('defs');
    [['arrowhead', '#9CA3AF'], ['arrowhead-metric', '#B8CDB6'], ['arrowhead-decision', '#4A5F49']].forEach(([id, fill]) => {
      defs.append('marker').attr('id', id).attr('viewBox', '0 -5 10 10').attr('refX', 16).attr('refY', 0).attr('markerWidth', 5).attr('markerHeight', 5).attr('orient', 'auto').append('path').attr('d', 'M0,-5L10,0L0,5').attr('fill', fill);
    });

    const nc = nodes.map(d => ({ ...d }));
    const lc = links.map(d => ({ ...d }));

    const sim = d3.forceSimulation(nc)
      .force('link', d3.forceLink(lc).id(d => d.id).distance(d => d.type === 'metric' ? 130 : d.type === 'decision' ? 150 : 110))
      .force('charge', d3.forceManyBody().strength(-700))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => d.size + 28))
      .force('x', d3.forceX(width / 2).strength(d => d.type === 'hexagon' ? 0.04 : d.type === 'triangle' ? 0.07 : 0.02))
      .force('y', d3.forceY(height / 2).strength(d => d.type === 'hexagon' ? 0.04 : d.type === 'triangle' ? 0.07 : 0.02));

    const link = g.selectAll('.link').data(lc).enter().append('line')
      .attr('stroke', d => d.type === 'metric' ? '#B8CDB6' : d.type === 'decision' ? '#4A5F49' : '#D1D5DB')
      .attr('stroke-width', d => d.type === 'metric' || d.type === 'decision' ? 2 : 1.5)
      .attr('stroke-opacity', d => d.type === 'metric' || d.type === 'decision' ? 0.7 : 0.6)
      .attr('stroke-dasharray', d => d.type === 'dashed' ? '4,4' : '0')
      .attr('marker-end', d => d.type === 'metric' ? 'url(#arrowhead-metric)' : d.type === 'decision' ? 'url(#arrowhead-decision)' : 'url(#arrowhead)');

    const linkLabel = g.selectAll('.link-label').data(lc).enter().append('text')
      .attr('font-size', d => d.type === 'metric' ? '7px' : '8px').attr('font-weight', '500')
      .attr('fill', d => d.type === 'metric' ? '#85A383' : d.type === 'decision' ? '#02220E' : '#6B7280')
      .attr('text-anchor', 'middle').style('pointer-events', 'none').text(d => d.label);

    const node = g.selectAll('.node').data(nc).enter().append('g')
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', (e, d) => { if (!e.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on('end', (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }))
      .on('click', (e, d) => { e.stopPropagation(); setSelectedNode({ ...d }); });

    node.filter(d => d.type === 'circle').append('circle').attr('r', d => d.size).attr('fill', d => d.color).attr('stroke', '#fff').attr('stroke-width', 2);
    node.filter(d => d.type === 'hexagon').append('path').attr('d', d => { const s = d.size, a = Math.PI / 3, pts = []; for (let i = 0; i < 6; i++) pts.push(`${s * Math.cos(a * i)},${s * Math.sin(a * i)}`); return `M${pts.join('L')}Z`; }).attr('fill', d => d.color).attr('stroke', '#fff').attr('stroke-width', 2);
    node.filter(d => d.type === 'triangle').append('path').attr('d', d => { const s = d.size, h = s * Math.sqrt(3); return `M0,${-h * 0.67} L${s},${h * 0.33} L${-s},${h * 0.33}Z`; }).attr('fill', d => d.color).attr('stroke', '#fff').attr('stroke-width', 2);
    node.append('text').attr('dy', d => d.size + 15).attr('text-anchor', 'middle').attr('font-size', '10px').attr('font-weight', '600').attr('fill', '#1F2937').style('pointer-events', 'none').text(d => d.name);

    sim.on('tick', () => {
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      linkLabel.attr('x', d => (d.source.x + d.target.x) / 2).attr('y', d => (d.source.y + d.target.y) / 2);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });
    return () => sim.stop();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#fff', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <div style={{ padding: '24px 32px 16px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>Business Knowledge Graph</h1>
      </div>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', padding: '0 32px 28px', gap: 20 }}>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ background: '#f9fafb', borderRadius: 16, height: '100%', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        {selectedNode && (
          selectedNode.type === 'hexagon' ? <MetricNodePanel node={selectedNode} links={links} nodes={nodes} onClose={() => setSelectedNode(null)} /> :
          selectedNode.type === 'triangle' ? <DecisionNodePanel node={selectedNode} links={links} nodes={nodes} onClose={() => setSelectedNode(null)} /> :
          <BusinessNodePanel node={selectedNode} links={links} nodes={nodes} onClose={() => setSelectedNode(null)} />
        )}
      </div>
    </div>
  );
};

export default CromptonBKG;

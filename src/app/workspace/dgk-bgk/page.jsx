"use client";
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Link from 'next/link';

const FashionRetailKG = () => {
  const svgRef = useRef();
  const [nodes, setNodes] = useState([
    { id: 'company', name: 'Company', description: 'Parent company with legal entities, GSTINs', size: 20, color: '#3B82F6', type: 'bkg' },
    { id: 'brand', name: 'Brand', description: 'Brand with positioning, target segments (AND, Anita Dongre, Global Desi)', size: 18, color: '#3B82F6', type: 'bkg' },
    { id: 'collection', name: 'Collection/Season', description: 'Seasonal collections (SS/AW/Resort/Festive) with theme, launch dates', size: 16, color: '#8B5CF6', type: 'bkg' },
    { id: 'category', name: 'Category', description: 'Top-level categories (Womenswear/Menswear/Jewellery)', size: 14, color: '#6B7280', type: 'bkg' },
    { id: 'subcategory', name: 'Subcategory', description: 'Product subcategories (Kurtas/Tops/Dresses/Sarees/Lehenga)', size: 14, color: '#6B7280', type: 'bkg' },
    { id: 'productline', name: 'ProductLine', description: 'Business model lines (Ethnic/Western/Fusion/Bridal)', size: 14, color: '#6B7280', type: 'bkg' },
    { id: 'lifecyclepolicy', name: 'LifecyclePolicy', description: 'Lifecycle rules (Core/Seasonal/Outlet) with markdown phases', size: 13, color: '#6B7280', type: 'bkg' },
    { id: 'style', name: 'Style', description: 'Design with fabric, craft, MRP, lifecycle stage', size: 16, color: '#8B5CF6', type: 'bkg' },
    { id: 'sku', name: 'SKU', description: 'Stock unit with color, size, barcode, MRP, cost', size: 16, color: '#8B5CF6', type: 'bkg' },
    { id: 'store', name: 'Store', description: 'Physical store with format (EBO/SIS/Outlet), size, catchment profile', size: 16, color: '#06B6D4', type: 'bkg' },
    { id: 'channel', name: 'Channel', description: 'Sales channel (Own POS/Partner/E-com/Marketplace)', size: 15, color: '#06B6D4', type: 'bkg' },
    { id: 'inventorynode', name: 'InventoryNode', description: 'Inventory location (Store/DC/Factory/Marketplace FC)', size: 14, color: '#06B6D4', type: 'bkg' },
    { id: 'vendor', name: 'Vendor', description: 'Supplier with type, lead times, MOQs, quality scores', size: 16, color: '#F59E0B', type: 'bkg' },
    { id: 'pricelist', name: 'PriceList', description: 'Pricing by country, currency, tax policy', size: 14, color: '#EF4444', type: 'bkg' },
    { id: 'promotion', name: 'Promotion/Campaign', description: 'Marketing campaigns with budget, KPI targets, mechanics', size: 14, color: '#EF4444', type: 'bkg' },
    { id: 'customersegment', name: 'CustomerSegment', description: 'Anonymous segments with AOV, frequency, price sensitivity', size: 14, color: '#EC4899', type: 'bkg' },
    { id: 'event', name: 'Event', description: 'External events (holidays/festivals/EOSS) with geo scope', size: 12, color: '#10B981', type: 'bkg' },
    { id: 'kpi', name: 'KPI', description: 'Key performance indicators (SellThru%, WOC, GM%, ROAS)', size: 12, color: '#8B5CF6', type: 'bkg' },
    // Data Sources
    { id: 'sap_hana', name: 'SAP HANA', description: 'SAP HANA Enterprise Database', width: 120, height: 50, color: '#0F172A', type: 'source' },
    { id: 'sap_ewm', name: 'SAP EWM', description: 'SAP Extended Warehouse Management', width: 120, height: 50, color: '#0F172A', type: 'source' },
    { id: 'sql_warehouse', name: 'SQL Warehouse', description: 'SQL Data Warehouse', width: 120, height: 50, color: '#0F172A', type: 'source' },
    { id: 'plm', name: 'PLM (Centric)', description: 'Product Lifecycle Management', width: 120, height: 50, color: '#0F172A', type: 'source' }
  ]);
  
  const [links, setLinks] = useState([
    // BKG to BKG relationships
    { id: 'l1', source: 'company', target: 'brand', type: 'OWNS', description: 'Company owns brand', linkType: 'bkg' },
    { id: 'l2', source: 'brand', target: 'collection', type: 'LAUNCHED', description: 'Brand launches collection', linkType: 'bkg' },
    { id: 'l3', source: 'collection', target: 'style', type: 'CONTAINS_STYLE', description: 'Collection contains styles', linkType: 'bkg' },
    { id: 'l4', source: 'style', target: 'sku', type: 'MATERIALIZES_AS', description: 'Style materializes as SKUs with size/color variants', linkType: 'bkg' },
    { id: 'l5', source: 'style', target: 'subcategory', type: 'CLASSIFIED_AS', description: 'Style classified by subcategory', linkType: 'bkg' },
    { id: 'l6', source: 'subcategory', target: 'category', type: 'BELONGS_TO', description: 'Subcategory belongs to category', linkType: 'bkg' },
    { id: 'l7', source: 'style', target: 'lifecyclepolicy', type: 'GOVERNED_BY', description: 'Style governed by lifecycle policy', linkType: 'bkg' },
    { id: 'l8', source: 'style', target: 'productline', type: 'BELONGS_TO', description: 'Style belongs to product line', linkType: 'bkg' },
    { id: 'l9', source: 'sku', target: 'inventorynode', type: 'LISTED_AT', description: 'SKU listed at inventory node (assortment, planogram slot)', linkType: 'bkg' },
    { id: 'l10', source: 'inventorynode', target: 'store', type: 'LOCATED_AT', description: 'Inventory node located at store', linkType: 'bkg' },
    { id: 'l11', source: 'sku', target: 'inventorynode', type: 'IN_STOCK_AT', description: 'SKU in stock with qty, ROP, safety stock', linkType: 'bkg' },
    { id: 'l12', source: 'sku', target: 'pricelist', type: 'PRICED_BY', description: 'SKU priced by price list with MRP, tax', linkType: 'bkg' },
    { id: 'l13', source: 'promotion', target: 'sku', type: 'TARGETS_SKU', description: 'Promotion targets SKU with discount mechanics', linkType: 'bkg' },
    { id: 'l14', source: 'promotion', target: 'store', type: 'TARGETS_STORE', description: 'Promotion targets specific stores', linkType: 'bkg' },
    { id: 'l15', source: 'promotion', target: 'channel', type: 'TARGETS_CHANNEL', description: 'Promotion targets sales channel', linkType: 'bkg' },
    { id: 'l16', source: 'promotion', target: 'customersegment', type: 'TARGETS_SEGMENT', description: 'Promotion targets customer segment', linkType: 'bkg' },
    { id: 'l17', source: 'event', target: 'store', type: 'AFFECTS', description: 'Event affects store with uplift factor', linkType: 'bkg' },
    { id: 'l18', source: 'vendor', target: 'style', type: 'SUPPLIES', description: 'Vendor supplies style with lead time, MOQ, cost', linkType: 'bkg' },
    { id: 'l19', source: 'store', target: 'channel', type: 'SELLS_VIA', description: 'Store sells via channel', linkType: 'bkg' },
    { id: 'l20', source: 'customersegment', target: 'brand', type: 'PREFERS', description: 'Customer segment prefers brand (affinity score)', linkType: 'bkg' },
    { id: 'l21', source: 'customersegment', target: 'style', type: 'PREFERS', description: 'Customer segment prefers style (affinity score)', linkType: 'bkg' },
    { id: 'l22', source: 'kpi', target: 'store', type: 'MEASURES', description: 'KPI measures store performance', linkType: 'bkg' },
    { id: 'l23', source: 'kpi', target: 'sku', type: 'MEASURES', description: 'KPI measures SKU performance', linkType: 'bkg' },
    // Data source connections
    { id: 'ds1', source: 'sap_hana', target: 'company', type: 'FEEDS', 
      nlQuery: 'List all brands under House of Anita Dongre and their target price segments',
      dataContext: 'Source: SAP HANA T001W (Company/Plant Master), SQL brand_master\nFields: company_code, brand_code, brand_name, price_band, positioning',
      linkType: 'data' },
    { id: 'ds2', source: 'sap_hana', target: 'brand', type: 'FEEDS',
      nlQuery: 'List all brands under House of Anita Dongre and their target price segments',
      dataContext: 'Source: SAP HANA T001W (Company/Plant Master)\nFields: brand_code, brand_name, price_band, positioning',
      linkType: 'data' },
    { id: 'ds3', source: 'sql_warehouse', target: 'brand', type: 'FEEDS',
      nlQuery: 'List all brands under House of Anita Dongre and their target price segments',
      dataContext: 'Source: SQL brand_master\nFields: company_code, brand_code, brand_name, price_band, positioning',
      linkType: 'data' },
    { id: 'ds4', source: 'sql_warehouse', target: 'collection', type: 'FEEDS',
      nlQuery: 'When did AND launch the SS25 collection?',
      dataContext: 'Source: SQL collection_master\nFields: brand_code, collection_code, launch_date, season, year',
      linkType: 'data' },
    { id: 'ds5', source: 'plm', target: 'collection', type: 'FEEDS',
      nlQuery: 'When did AND launch the SS25 collection?',
      dataContext: 'Source: PLM (Centric PLM) season_calendar\nFields: brand_code, collection_code, launch_date, season, year',
      linkType: 'data' },
    { id: 'ds6', source: 'sap_hana', target: 'style', type: 'FEEDS',
      nlQuery: 'Show all styles in the Global Desi Festive 2025 collection',
      dataContext: 'Source: SAP HANA MARA (Material Master)\nFields: collection_code, material_number (MATNR), style_name, colorway, status',
      linkType: 'data' },
    { id: 'ds7', source: 'plm', target: 'style', type: 'FEEDS',
      nlQuery: 'Show all styles in the Global Desi Festive 2025 collection',
      dataContext: 'Source: PLM style_master\nFields: collection_code, material_number, style_name, colorway, status',
      linkType: 'data' },
    { id: 'ds8', source: 'sap_hana', target: 'sku', type: 'FEEDS',
      nlQuery: 'How many SKUs exist under style GD FST25 001?',
      dataContext: 'Source: SAP HANA MARA + MVKE\nFields: style_id, size, color, sku_code, ean_code',
      linkType: 'data' },
    { id: 'ds9', source: 'sql_warehouse', target: 'sku', type: 'FEEDS',
      nlQuery: 'How many SKUs exist under style GD FST25 001?',
      dataContext: 'Source: SQL sku_master\nFields: style_id, size, color, sku_code, ean_code',
      linkType: 'data' },
    { id: 'ds10', source: 'sap_hana', target: 'pricelist', type: 'FEEDS',
      nlQuery: "What's the current MRP and markdown price for SKU AND SS25 042 NAVY M?",
      dataContext: 'Source: SAP HANA KONP (Pricing Conditions)\nFields: MATNR, condition_type (PR00, K004), valid_from, valid_to, price_amount',
      linkType: 'data' },
    { id: 'ds11', source: 'sql_warehouse', target: 'pricelist', type: 'FEEDS',
      nlQuery: "What's the current MRP and markdown price for SKU AND SS25 042 NAVY M?",
      dataContext: 'Source: SQL price_event\nFields: MATNR, condition_type, valid_from, valid_to, price_amount',
      linkType: 'data' },
    { id: 'ds12', source: 'sap_hana', target: 'inventorynode', type: 'FEEDS',
      nlQuery: "What's the available stock of this SKU at UB City store?",
      dataContext: 'Source: SAP HANA MARD (Plant/Storage Stock)\nFields: plant, storage_location, material_number, unrestricted_stock, batch, last_update',
      linkType: 'data' },
    { id: 'ds13', source: 'sap_ewm', target: 'inventorynode', type: 'FEEDS',
      nlQuery: "What's the available stock of this SKU at UB City store?",
      dataContext: 'Source: SAP EWM /SCWM/AQUA (Quantities)\nFields: plant, storage_location, material_number, unrestricted_stock, batch, last_update',
      linkType: 'data' },
    { id: 'ds14', source: 'sql_warehouse', target: 'store', type: 'FEEDS',
      nlQuery: 'Which online and offline channels sell AND products in Hyderabad?',
      dataContext: 'Source: SQL store_master\nFields: store_code, channel_type, city, active_flag',
      linkType: 'data' },
    { id: 'ds15', source: 'sap_hana', target: 'store', type: 'FEEDS',
      nlQuery: 'Which online and offline channels sell AND products in Hyderabad?',
      dataContext: 'Source: SAP HANA T001W (plant ↔ channel)\nFields: plant, store_code, channel_type, city',
      linkType: 'data' },
    { id: 'ds16', source: 'sap_hana', target: 'vendor', type: 'FEEDS',
      nlQuery: 'Which vendor supplies the silk embroidered kurtas for the Festive line?',
      dataContext: 'Source: SAP HANA EKKO/EKPO (PO Headers/Items), LFA1 (Vendor Master)\nFields: vendor_code, material_number, po_number, lead_time, moq, ex_factory_cost',
      linkType: 'data' },
    { id: 'ds17', source: 'sql_warehouse', target: 'channel', type: 'FEEDS',
      nlQuery: 'Which online and offline channels sell AND products in Hyderabad?',
      dataContext: 'Source: SQL channel_mapping\nFields: store_code, channel_type, active_flag',
      linkType: 'data' }
  ]);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  
  const simulationRef = useRef(null);
  
  useEffect(() => {
    createVisualization();
  }, [nodes, links]);
  
  useEffect(() => {
    updateSelection();
  }, [selectedItem, editMode]);
  
  const updateSelection = () => {
    const svg = d3.select(svgRef.current);
    
    svg.selectAll('.link')
      .attr('stroke', (d) => {
        if (selectedItem && selectedItem.id === d.id && (editMode === 'link' || editMode === 'datalink')) {
          return '#3B82F6';
        }
        return d.linkType === 'data' ? '#10B981' : '#E5E7EB';
      })
      .attr('stroke-width', (d) => {
        if (selectedItem && selectedItem.id === d.id && (editMode === 'link' || editMode === 'datalink')) {
          return 2.5;
        }
        return d.linkType === 'data' ? 2 : 1.5;
      })
      .attr('marker-end', (d) => {
        if (selectedItem && selectedItem.id === d.id && (editMode === 'link' || editMode === 'datalink')) {
          return 'url(#arrowhead-selected)';
        }
        return d.linkType === 'data' ? 'url(#arrowhead-data)' : 'url(#arrowhead)';
      });
    
    svg.selectAll('.node').each(function(d) {
      const node = d3.select(this);
      const isSelected = selectedItem && selectedItem.id === d.id && editMode === 'node';
      
      node.selectAll('.node-glow').remove();
      
      if (isSelected) {
        if (d.type === 'bkg') {
          node.insert('circle', ':first-child')
            .attr('class', 'node-glow')
            .attr('r', d.size + 8)
            .attr('fill', 'none')
            .attr('stroke', '#3B82F6')
            .attr('stroke-width', 2)
            .attr('opacity', 0.5);
        } else if (d.type === 'source') {
          node.insert('rect', ':first-child')
            .attr('class', 'node-glow')
            .attr('x', -d.width / 2 - 8)
            .attr('y', -d.height / 2 - 8)
            .attr('width', d.width + 16)
            .attr('height', d.height + 16)
            .attr('rx', 12)
            .attr('fill', 'none')
            .attr('stroke', '#3B82F6')
            .attr('stroke-width', 2)
            .attr('opacity', 0.5);
        }
      }
      
      const shapeSelector = d.type === 'bkg' ? 'circle:not(.node-glow)' : 'rect:not(.node-glow)';
      node.select(shapeSelector)
        .attr('stroke', isSelected ? '#3B82F6' : '#fff')
        .attr('stroke-width', isSelected ? 3 : 2);
    });
  };
  
  const createVisualization = () => {
    d3.select(svgRef.current).selectAll("*").remove();
    
    const width = 1400;
    const height = 650;
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);
    
    const g = svg.append('g');
    
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    
    svg.call(zoom);
    
    const defs = g.append('defs');
    
    defs.append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 18)
      .attr('refY', 0)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#E5E7EB');
    
    defs.append('marker')
      .attr('id', 'arrowhead-selected')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 18)
      .attr('refY', 0)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#3B82F6');
    
    defs.append('marker')
      .attr('id', 'arrowhead-data')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 18)
      .attr('refY', 0)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#10B981');
    
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(180))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => {
        if (d.type === 'source') {
          return Math.max(d.width, d.height) / 2 + 25;
        }
        return d.size + 25;
      }));
    
    simulationRef.current = simulation;
    
    const linkHitbox = g.selectAll('.link-hitbox')
      .data(links)
      .enter().append('line')
      .attr('class', 'link-hitbox')
      .attr('stroke', 'transparent')
      .attr('stroke-width', 20)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedItem({...d});
        setEditMode(d.linkType === 'data' ? 'datalink' : 'link');
      })
      .on('mouseenter', function(event, d) {
        const linkElement = d3.select(this.nextSibling);
        linkElement.attr('data-original-width', linkElement.attr('stroke-width'));
        linkElement.attr('data-original-stroke', linkElement.attr('stroke'));
        linkElement.attr('stroke-width', 3).attr('stroke', '#9CA3AF');
      })
      .on('mouseleave', function(event, d) {
        const linkElement = d3.select(this.nextSibling);
        const origWidth = linkElement.attr('data-original-width');
        const origStroke = linkElement.attr('data-original-stroke');
        if (origWidth && origStroke) {
          linkElement.attr('stroke-width', origWidth).attr('stroke', origStroke);
        }
      });
    
    const link = g.selectAll('.link')
      .data(links)
      .enter().append('line')
      .attr('class', 'link')
      .attr('stroke', d => d.linkType === 'data' ? '#10B981' : '#E5E7EB')
      .attr('stroke-width', d => d.linkType === 'data' ? 2 : 1.5)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-dasharray', d => d.linkType === 'data' ? '5,5' : 'none')
      .attr('marker-end', d => d.linkType === 'data' ? 'url(#arrowhead-data)' : 'url(#arrowhead)')
      .style('pointer-events', 'none');
    
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
        setSelectedItem({...d});
        setEditMode('node');
      });
    
    // Render circles for BKG nodes
    node.filter(d => d.type === 'bkg')
      .append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);
    
    // Render rectangles for source nodes
    node.filter(d => d.type === 'source')
      .append('rect')
      .attr('x', d => -d.width / 2)
      .attr('y', d => -d.height / 2)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .attr('rx', 8)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);
    
    node.append('text')
      .attr('dy', d => d.type === 'source' ? 4 : d.size + 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('fill', d => d.type === 'source' ? '#fff' : '#374151')
      .style('pointer-events', 'none')
      .text(d => d.name);
    
    const linkText = g.selectAll('.link-label')
      .data(links.filter(l => l.linkType === 'bkg'))
      .enter().append('text')
      .attr('class', 'link-label')
      .attr('font-size', '9px')
      .attr('font-weight', '500')
      .attr('fill', '#9CA3AF')
      .attr('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .text(d => d.type);
    
    simulation.on('tick', () => {
      linkHitbox
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      
      linkText
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
  
  const handleNodeUpdate = (updatedNode) => {
    setNodes(nodes.map(n => n.id === updatedNode.id ? updatedNode : n));
    setSelectedItem(null);
    setEditMode(null);
  };
  
  const handleLinkUpdate = (updatedLink) => {
    setLinks(links.map(l => l.id === updatedLink.id ? updatedLink : l));
    setSelectedItem(null);
    setEditMode(null);
  };
  
  const handleNodeDelete = (nodeId) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    setLinks(links.filter(l => {
      const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
      const targetId = typeof l.target === 'object' ? l.target.id : l.target;
      return sourceId !== nodeId && targetId !== nodeId;
    }));
    setSelectedItem(null);
    setEditMode(null);
  };
  
  const handleLinkDelete = (linkId) => {
    setLinks(links.filter(l => l.id !== linkId));
    setSelectedItem(null);
    setEditMode(null);
  };
  
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="px-8 pt-8 pb-4 flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400 mb-2">Business + Data Knowledge Graph</p>
          <h1 className="text-3xl font-serif text-gray-900 mb-2">The company's Digital Brain:</h1>
          <p className="text-gray-500">This shows how the business knowledge context can be derived from specific data sources. Click on any data relationship to edit.</p>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden px-8">
        <div className="flex-1 overflow-hidden mr-6">
          <div className="bg-gray-50 rounded-2xl h-full overflow-hidden">
            <svg ref={svgRef} className="w-full h-full"></svg>
          </div>
        </div>
        
        {editMode && selectedItem && (
          <div className="w-80 overflow-y-auto flex-shrink-0">
            {editMode === 'datalink' ? (
              <DataSourceLinkEditor
                key={selectedItem.id}
                link={selectedItem}
                nodes={nodes}
                onUpdate={handleLinkUpdate}
                onDelete={handleLinkDelete}
                onClose={() => {
                  setSelectedItem(null);
                  setEditMode(null);
                }}
              />
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold mb-2">{selectedItem.name || selectedItem.type}</h3>
                <p className="text-sm text-gray-600">{selectedItem.description || 'Click on a green dashed line to see data mapping'}</p>
              </div>
            )}
          </div>
        )}
        
        {!editMode && (
          <div className="w-80 flex items-center justify-center flex-shrink-0">
            <div className="text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-sm">Click on a green dashed line<br />to see data mapping</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="px-8 py-6">
        <Link href={"/workspace/agent-traversal"}>
        <button className="w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-xl font-medium transition-colors">
          Continue
        </button></Link>
      </div>
    </div>
  );
};

const DataSourceLinkEditor = ({ link, nodes, onUpdate, onDelete, onClose }) => {
  const [nlQuery, setNlQuery] = useState(link.nlQuery || '');
  const [dataContext, setDataContext] = useState(link.dataContext || '');
  const [sourceId, setSourceId] = useState(typeof link.source === 'object' ? link.source.id : link.source);
  const [targetId, setTargetId] = useState(typeof link.target === 'object' ? link.target.id : link.target);
  
  const handleSave = () => {
    onUpdate({ ...link, nlQuery, dataContext, source: sourceId, target: targetId });
  };
  
  const sourceNode = nodes.find(n => n.id === sourceId);
  const targetNode = nodes.find(n => n.id === targetId);
  
  return (
    <div>
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-green-800 font-medium mb-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
          Data Source Connection
        </div>
        <div className="text-xs text-green-700">
          {sourceNode?.name} → {targetNode?.name}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">Natural Language Query</label>
        <textarea
          value={nlQuery}
          onChange={(e) => setNlQuery(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
          placeholder="e.g., What's the current MRP and markdown price for this SKU?"
        />
        <p className="text-xs text-gray-400 mt-1">How users would naturally ask for this data</p>
      </div>
      
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">Data Context</label>
        <textarea
          value={dataContext}
          onChange={(e) => setDataContext(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono text-xs"
          placeholder="Source: SAP HANA KONP (Pricing Conditions)&#10;Fields: MATNR, condition_type, valid_from, valid_to, price_amount"
        />
        <p className="text-xs text-gray-400 mt-1">Tables, fields, and technical details</p>
      </div>
      
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">Data Source</label>
        <select
          value={sourceId}
          onChange={(e) => setSourceId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
        >
          {nodes.filter(n => n.type === 'source').map(n => (
            <option key={n.id} value={n.id}>{n.name}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-xs font-medium text-gray-500 mb-2">Target BKG Node</label>
        <select
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
        >
          {nodes.filter(n => n.type === 'bkg').map(n => (
            <option key={n.id} value={n.id}>{n.name}</option>
          ))}
        </select>
      </div>
      
      <button
        onClick={handleSave}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-colors mb-3"
      >
        Save data mapping
      </button>
      
      <button
        onClick={() => {
          if (confirm('Delete this data source connection?')) {
            onDelete(link.id);
          }
        }}
        className="w-full text-red-600 py-2 text-sm hover:text-red-700 transition-colors"
      >
        Delete connection
      </button>
    </div>
  );
};

export default FashionRetailKG;
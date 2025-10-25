"use client";
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Link from 'next/link';

const DecisionFactorNetwork = () => {
  const svgRef = useRef();
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [editingFactor, setEditingFactor] = useState(null);
  const [isAddingFactor, setIsAddingFactor] = useState(false);
  const [isAddingRelationship, setIsAddingRelationship] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [formData, setFormData] = useState({ name: '', type: '', description: '' });
  
  const [decisions, setDecisions] = useState([
    {
      id: 'inv_buy',
      name: 'Inventory Buy (Seasonal & Core)',
      description: 'How much to buy, when to commit, and how to phase vendor deliveries',
      factors: [
        { id: 'forecast', name: 'Forecast Accuracy', type: 'predictive', color: '#3B82F6', size: 16 },
        { id: 'sellthrough', name: 'Sell-through %', type: 'performance', color: '#10B981', size: 16 },
        { id: 'workingcap', name: 'Working Capital', type: 'financial', color: '#F59E0B', size: 16 },
        { id: 'leadtime', name: 'Lead-time Reliability', type: 'operational', color: '#8B5CF6', size: 14 },
        { id: 'moq', name: 'Vendor MOQ/Cost', type: 'operational', color: '#8B5CF6', size: 14 },
        { id: 'ageing', name: 'Stock Ageing/WOC', type: 'operational', color: '#8B5CF6', size: 14 },
        { id: 'margin', name: 'Initial Margin %', type: 'financial', color: '#F59E0B', size: 16 },
        { id: 'availability', name: 'Launch Availability', type: 'performance', color: '#10B981', size: 15 }
      ],
      relationships: [
        { source: 'forecast', target: 'sellthrough', type: 'drives', strength: 'high' },
        { source: 'forecast', target: 'workingcap', type: 'impacts', strength: 'high' },
        { source: 'leadtime', target: 'availability', type: 'determines', strength: 'high' },
        { source: 'moq', target: 'workingcap', type: 'constrains', strength: 'medium' },
        { source: 'sellthrough', target: 'ageing', type: 'reduces', strength: 'high' },
        { source: 'moq', target: 'margin', type: 'affects', strength: 'medium' },
        { source: 'ageing', target: 'margin', type: 'erodes', strength: 'high' },
        { source: 'availability', target: 'sellthrough', type: 'enables', strength: 'high' }
      ]
    },
    {
      id: 'inv_liquidation',
      name: 'Inventory Liquidation',
      description: 'What to clear, where, and at what markdown to maximize cash recovery',
      factors: [
        { id: 'sellthrough2', name: 'Sell-through %', type: 'performance', color: '#10B981', size: 16 },
        { id: 'gm', name: 'Gross Margin ₹/%', type: 'financial', color: '#F59E0B', size: 16 },
        { id: 'stockage', name: 'Stock Age/WOC', type: 'operational', color: '#8B5CF6', size: 15 },
        { id: 'discount', name: 'Discount Depth', type: 'pricing', color: '#EF4444', size: 15 },
        { id: 'clearroi', name: 'Clearance ROI', type: 'financial', color: '#F59E0B', size: 16 },
        { id: 'priceindex', name: 'Price Consistency Index', type: 'pricing', color: '#EF4444', size: 14 },
        { id: 'transcost', name: 'Logistics/Transfer Cost', type: 'operational', color: '#8B5CF6', size: 14 }
      ],
      relationships: [
        { source: 'discount', target: 'sellthrough2', type: 'accelerates', strength: 'high' },
        { source: 'discount', target: 'gm', type: 'reduces', strength: 'high' },
        { source: 'stockage', target: 'discount', type: 'necessitates', strength: 'high' },
        { source: 'sellthrough2', target: 'clearroi', type: 'improves', strength: 'high' },
        { source: 'gm', target: 'clearroi', type: 'determines', strength: 'high' },
        { source: 'transcost', target: 'clearroi', type: 'reduces', strength: 'medium' },
        { source: 'discount', target: 'priceindex', type: 'affects', strength: 'medium' }
      ]
    },
    {
      id: 'pricing',
      name: 'Pricing Strategy',
      description: 'Set base, geo, and channel-wise price architecture and discount ladders',
      factors: [
        { id: 'gmpct', name: 'Gross Margin %', type: 'financial', color: '#F59E0B', size: 16 },
        { id: 'revgrowth', name: 'Revenue Growth %', type: 'financial', color: '#F59E0B', size: 16 },
        { id: 'elasticity', name: 'Price Elasticity', type: 'pricing', color: '#EF4444', size: 15 },
        { id: 'compindex', name: 'Competitor Price Index', type: 'market', color: '#EC4899', size: 15 },
        { id: 'mdrecovery', name: 'Markdown Recovery Rate', type: 'performance', color: '#10B981', size: 14 },
        { id: 'brandperc', name: 'Brand Perception', type: 'market', color: '#EC4899', size: 15 },
        { id: 'promoroi', name: 'Promotion ROI', type: 'financial', color: '#F59E0B', size: 14 }
      ],
      relationships: [
        { source: 'elasticity', target: 'revgrowth', type: 'determines', strength: 'high' },
        { source: 'elasticity', target: 'gmpct', type: 'balances', strength: 'high' },
        { source: 'compindex', target: 'elasticity', type: 'influences', strength: 'high' },
        { source: 'brandperc', target: 'elasticity', type: 'moderates', strength: 'medium' },
        { source: 'mdrecovery', target: 'gmpct', type: 'protects', strength: 'medium' },
        { source: 'promoroi', target: 'revgrowth', type: 'boosts', strength: 'medium' },
        { source: 'compindex', target: 'brandperc', type: 'challenges', strength: 'medium' }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing & Footfall Increase',
      description: 'Select campaigns, audiences, and spend levels to increase store and online traffic',
      factors: [
        { id: 'footfall', name: 'Incremental Footfall', type: 'performance', color: '#10B981', size: 16 },
        { id: 'cvr', name: 'Conversion Rate', type: 'performance', color: '#10B981', size: 16 },
        { id: 'roas', name: 'ROAS', type: 'financial', color: '#F59E0B', size: 16 },
        { id: 'basket', name: 'Average Basket Value', type: 'performance', color: '#10B981', size: 15 },
        { id: 'cac', name: 'Customer Acquisition Cost', type: 'financial', color: '#F59E0B', size: 15 },
        { id: 'repeat', name: 'Repeat Rate', type: 'performance', color: '#10B981', size: 15 },
        { id: 'attribution', name: 'Cross-channel Attribution', type: 'operational', color: '#8B5CF6', size: 14 }
      ],
      relationships: [
        { source: 'footfall', target: 'cvr', type: 'feeds', strength: 'high' },
        { source: 'cvr', target: 'roas', type: 'determines', strength: 'high' },
        { source: 'cac', target: 'roas', type: 'reduces', strength: 'high' },
        { source: 'basket', target: 'roas', type: 'improves', strength: 'high' },
        { source: 'repeat', target: 'cac', type: 'amortizes', strength: 'medium' },
        { source: 'attribution', target: 'roas', type: 'clarifies', strength: 'medium' },
        { source: 'footfall', target: 'basket', type: 'influences', strength: 'medium' }
      ]
    },
    {
      id: 'inv_movement',
      name: 'Inventory Movement across POS',
      description: 'Orchestrate inventory flows across stores, DCs, and online nodes',
      factors: [
        { id: 'osa', name: 'On-shelf Availability', type: 'performance', color: '#10B981', size: 16 },
        { id: 'fulfillcost', name: 'Fulfillment Cost', type: 'operational', color: '#8B5CF6', size: 16 },
        { id: 'stockout', name: 'Stock-out Rate', type: 'performance', color: '#10B981', size: 15 },
        { id: 'transfercost', name: 'Transfer/Replen Cost', type: 'operational', color: '#8B5CF6', size: 15 },
        { id: 'replenlt', name: 'Lead Time to Replenish', type: 'operational', color: '#8B5CF6', size: 14 },
        { id: 'overstock', name: 'Over-stock Variance', type: 'operational', color: '#8B5CF6', size: 14 },
        { id: 'freight', name: 'Freight/Carbon Footprint', type: 'operational', color: '#8B5CF6', size: 14 }
      ],
      relationships: [
        { source: 'osa', target: 'stockout', type: 'prevents', strength: 'high' },
        { source: 'replenlt', target: 'osa', type: 'enables', strength: 'high' },
        { source: 'transfercost', target: 'fulfillcost', type: 'adds to', strength: 'high' },
        { source: 'overstock', target: 'transfercost', type: 'drives', strength: 'medium' },
        { source: 'freight', target: 'fulfillcost', type: 'comprises', strength: 'medium' },
        { source: 'stockout', target: 'transfercost', type: 'triggers', strength: 'medium' },
        { source: 'replenlt', target: 'overstock', type: 'necessitates', strength: 'medium' }
      ]
    }
  ]);
  
  useEffect(() => {
    if (selectedDecision) {
      createVisualization();
    }
  }, [selectedDecision]);
  
  const createVisualization = () => {
    d3.select(svgRef.current).selectAll("*").remove();
    
    if (!selectedDecision) return;
    
    const width = 900;
    const height = 600;
    
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
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#6B7280');
    
    const simulation = d3.forceSimulation(selectedDecision.factors)
      .force('link', d3.forceLink(selectedDecision.relationships).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => d.size + 30));
    
    const link = g.selectAll('.link')
      .data(selectedDecision.relationships)
      .enter().append('line')
      .attr('class', 'link')
      .attr('stroke', '#94A3B8')
      .attr('stroke-width', d => d.strength === 'high' ? 3 : 2)
      .attr('stroke-opacity', d => d.strength === 'high' ? 0.6 : 0.4)
      .attr('marker-end', 'url(#arrowhead)');
    
    const linkText = g.selectAll('.link-label')
      .data(selectedDecision.relationships)
      .enter().append('text')
      .attr('class', 'link-label')
      .attr('font-size', '10px')
      .attr('font-weight', '500')
      .attr('fill', '#64748B')
      .attr('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .text(d => d.type);
    
    const node = g.selectAll('.node')
      .data(selectedDecision.factors)
      .enter().append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        if (isAddingRelationship) {
          handleNodeClickForRelationship(d);
        } else {
          handleEditFactor(d);
        }
      })
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));
    
    node.append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))');
    
    node.append('text')
      .attr('dy', d => d.size + 16)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('fill', '#1F2937')
      .style('pointer-events', 'none')
      .each(function(d) {
        const words = d.name.split(' ');
        const text = d3.select(this);
        
        if (words.length > 1) {
          words.forEach((word, i) => {
            text.append('tspan')
              .attr('x', 0)
              .attr('dy', i === 0 ? 0 : '1.1em')
              .text(word);
          });
        } else {
          text.text(d.name);
        }
      });
    
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      
      linkText
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2 - 5);
      
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
  
  const handleEditFactor = (factor) => {
    setEditingFactor(factor);
    setFormData({
      name: factor.name,
      type: factor.type,
      description: factor.description || ''
    });
    setIsAddingFactor(false);
  };
  
  const handleAddFactor = () => {
    setIsAddingFactor(true);
    setEditingFactor(null);
    setFormData({ name: '', type: 'performance', description: '' });
  };
  
  const handleSaveFactor = () => {
    const updatedDecisions = decisions.map(d => {
      if (d.id === selectedDecision.id) {
        if (editingFactor) {
          return {
            ...d,
            factors: d.factors.map(f => 
              f.id === editingFactor.id 
                ? { ...f, name: formData.name, type: formData.type, description: formData.description }
                : f
            )
          };
        } else {
          const newFactor = {
            id: `factor_${Date.now()}`,
            name: formData.name,
            type: formData.type,
            description: formData.description,
            color: getColorForType(formData.type),
            size: 14
          };
          return {
            ...d,
            factors: [...d.factors, newFactor]
          };
        }
      }
      return d;
    });
    
    setDecisions(updatedDecisions);
    setSelectedDecision(updatedDecisions.find(d => d.id === selectedDecision.id));
    setEditingFactor(null);
    setIsAddingFactor(false);
  };
  
  const handleDeleteFactor = () => {
    if (!editingFactor) return;
    
    const updatedDecisions = decisions.map(d => {
      if (d.id === selectedDecision.id) {
        return {
          ...d,
          factors: d.factors.filter(f => f.id !== editingFactor.id),
          relationships: d.relationships.filter(r => 
            r.source !== editingFactor.id && r.target !== editingFactor.id
          )
        };
      }
      return d;
    });
    
    setDecisions(updatedDecisions);
    setSelectedDecision(updatedDecisions.find(d => d.id === selectedDecision.id));
    setEditingFactor(null);
  };
  
  const handleAddRelationship = () => {
    setIsAddingRelationship(true);
    setSelectedNodes([]);
  };
  
  const handleNodeClickForRelationship = (node) => {
    if (selectedNodes.length === 0) {
      setSelectedNodes([node]);
    } else if (selectedNodes.length === 1) {
      const updatedDecisions = decisions.map(d => {
        if (d.id === selectedDecision.id) {
          const newRel = {
            source: selectedNodes[0].id,
            target: node.id,
            type: 'affects',
            strength: 'medium'
          };
          return {
            ...d,
            relationships: [...d.relationships, newRel]
          };
        }
        return d;
      });
      
      setDecisions(updatedDecisions);
      setSelectedDecision(updatedDecisions.find(d => d.id === selectedDecision.id));
      setIsAddingRelationship(false);
      setSelectedNodes([]);
    }
  };
  
  const getColorForType = (type) => {
    const colors = {
      financial: '#F59E0B',
      performance: '#10B981',
      operational: '#8B5CF6',
      pricing: '#EF4444',
      market: '#EC4899',
      predictive: '#3B82F6'
    };
    return colors[type] || '#6B7280';
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto pb-4">
        <div className="p-6 border-b border-gray-200">
          <p className="text-sm text-gray-400 mb-2">5/6</p>
          <h1 className="text-2xl font-serif text-gray-900 mb-2">Decision Factors</h1>
          <p className="text-sm text-gray-500">Select a decision to visualize and edit its factor network</p>
        </div>
        
        <div className="p-4 space-y-3">
          {decisions.map(d => (
            <button
              key={d.id}
              onClick={() => {
                setSelectedDecision(d);
                setEditingFactor(null);
                setIsAddingFactor(false);
                setIsAddingRelationship(false);
              }}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                selectedDecision?.id === d.id
                  ? 'bg-purple-50 border-2 border-purple-600'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <p className="text-sm font-semibold text-gray-900 mb-1">{d.name}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{d.description}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                <span>{d.factors.length} factors</span>
                <span>•</span>
                <span>{d.relationships.length} relationships</span>
              </div>
            </button>
          ))}
        </div>
         <Link className="m-4" href={"/workspace/source-connection"}>
                  <button
                    type="button"
                    className={`w-[90%] py-2 rounded-xl font-semibold text-lg transition-all bg-teal-700
                    hover:bg-teal-800
                    text-white
                    hover:shadow-lg
                    cursor-pointer`}
                  >
                    Continue
                  </button>
                </Link>
      </div>
      
      <div className="flex-1 flex flex-col">
        {selectedDecision ? (
          <>
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{selectedDecision.name}</h2>
                  <p className="text-sm text-gray-600">{selectedDecision.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddFactor}
                    className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <span className="text-lg">+</span>
                    Add Factor
                  </button>
                  <button
                    onClick={handleAddRelationship}
                    className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                      isAddingRelationship
                        ? 'bg-purple-700 text-white'
                        : 'border border-purple-700 text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    {isAddingRelationship ? 'Click 2 nodes...' : 'Add Relationship'}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-600">Financial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-600">Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-gray-600">Operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-600">Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-gray-600">Market</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-gray-600">Predictive</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex">
              <div className="flex-1 p-6 overflow-hidden">
                <div className="bg-white rounded-2xl shadow-sm h-full flex items-center justify-center">
                  <svg ref={svgRef} className="w-full h-full"></svg>
                </div>
              </div>
              
              {(editingFactor || isAddingFactor) && (
                <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {editingFactor ? 'Edit Factor' : 'Add New Factor'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Factor Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Forecast Accuracy"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      >
                        <option value="financial">Financial</option>
                        <option value="performance">Performance</option>
                        <option value="operational">Operational</option>
                        <option value="pricing">Pricing</option>
                        <option value="market">Market</option>
                        <option value="predictive">Predictive</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Optional description..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      />
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <button
                        onClick={handleSaveFactor}
                        disabled={!formData.name.trim()}
                        className="flex-1 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {editingFactor ? 'Save Changes' : 'Add Factor'}
                      </button>
                      <button
                        onClick={() => {
                          setEditingFactor(null);
                          setIsAddingFactor(false);
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                    
                    {editingFactor && (
                      <button
                        onClick={handleDeleteFactor}
                        className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                      >
                        Delete Factor
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-lg font-medium mb-2">Select a decision</p>
              <p className="text-sm">Choose a decision from the left to visualize its factor network</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecisionFactorNetwork;
"use client";
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AutoWorkflowBuilder = () => {
  const svgRef = useRef();
  const [questionText, setQuestionText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedWorkflow, setGeneratedWorkflow] = useState(null);
  const [approachText, setApproachText] = useState('');
  const [isEditingApproach, setIsEditingApproach] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [savedWorkflows, setSavedWorkflows] = useState([]);
  const [error, setError] = useState(null);
  
  const allNodes = [
    { id: 'company', name: 'Company', size: 16, color: '#3B82F6' },
    { id: 'brand', name: 'Brand', size: 16, color: '#3B82F6' },
    { id: 'collection', name: 'Collection', size: 14, color: '#8B5CF6' },
    { id: 'category', name: 'Category', size: 12, color: '#6B7280' },
    { id: 'subcategory', name: 'Subcategory', size: 12, color: '#6B7280' },
    { id: 'productline', name: 'ProductLine', size: 12, color: '#6B7280' },
    { id: 'lifecyclepolicy', name: 'LifecyclePolicy', size: 11, color: '#6B7280' },
    { id: 'style', name: 'Style', size: 14, color: '#8B5CF6' },
    { id: 'sku', name: 'SKU', size: 14, color: '#8B5CF6' },
    { id: 'store', name: 'Store', size: 14, color: '#06B6D4' },
    { id: 'channel', name: 'Channel', size: 13, color: '#06B6D4' },
    { id: 'inventorynode', name: 'InventoryNode', size: 12, color: '#06B6D4' },
    { id: 'vendor', name: 'Vendor', size: 14, color: '#F59E0B' },
    { id: 'pricelist', name: 'PriceList', size: 12, color: '#EF4444' },
    { id: 'promotion', name: 'Promotion', size: 12, color: '#EF4444' },
    { id: 'customersegment', name: 'CustomerSegment', size: 12, color: '#EC4899' },
    { id: 'event', name: 'Event', size: 11, color: '#10B981' },
    { id: 'kpi', name: 'KPI', size: 11, color: '#8B5CF6' },
    { id: 'policy', name: 'Policy', size: 11, color: '#EF4444' }
  ];

  useEffect(() => {
    if (generatedWorkflow) {
      createVisualization();
    }
  }, [generatedWorkflow, currentStep]);

  const generateWorkflow = async () => {
    if (!questionText.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const systemPrompt = `You are an expert in retail knowledge graphs. Given a business question, identify:
1. Which nodes from the Business Knowledge Graph (BKG) are needed
2. Which edges connect them
3. A natural language explanation of how to answer the question
4. Step-by-step breakdown of the traversal

Available nodes: company, brand, collection, category, subcategory, productline, lifecyclepolicy, style, sku, store, channel, inventorynode, vendor, pricelist, promotion, customersegment, event, kpi, policy

Respond ONLY with a JSON object (no markdown, no preamble):
{
  "nodes": ["node1", "node2", ...],
  "edges": [{"source": "node1", "target": "node2"}, ...],
  "approach": "Natural language explanation of how to traverse the graph to answer this question...",
  "steps": [
    {"nodes": ["node1"], "edges": [], "text": "Step description"},
    {"nodes": ["node1", "node2"], "edges": [{"source": "node1", "target": "node2"}], "text": "Next step"},
    ...
  ]
}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          system: systemPrompt,
          messages: [
            { role: "user", content: `Question: ${questionText}` }
          ],
        })
      });

      const data = await response.json();
      const textContent = data.content.find(c => c.type === "text")?.text;
      
      if (!textContent) {
        throw new Error("No response from AI");
      }

      const workflow = JSON.parse(textContent);
      setGeneratedWorkflow(workflow);
      setApproachText(workflow.approach);
      setCurrentStep(0);
      
    } catch (err) {
      console.error("Generation error:", err);
      setError("Failed to generate workflow. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const createVisualization = () => {
    d3.select(svgRef.current).selectAll("*").remove();
    
    if (!generatedWorkflow) return;
    
    const width = 900;
    const height = 700;
    
    const filteredNodes = allNodes.filter(n => generatedWorkflow.nodes.includes(n.id));
    const filteredLinks = generatedWorkflow.edges.map(e => ({
      source: e.source,
      target: e.target
    }));
    
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
      .attr('refX', 15)
      .attr('refY', 0)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#3B82F6');
    
    const simulation = d3.forceSimulation(filteredNodes)
      .force('link', d3.forceLink(filteredLinks).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-800))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => d.size + 20));
    
    const link = g.selectAll('.link')
      .data(filteredLinks)
      .enter().append('line')
      .attr('class', 'link')
      .attr('stroke', '#3B82F6')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.3)
      .attr('marker-end', 'url(#arrowhead)');
    
    const node = g.selectAll('.node')
      .data(filteredNodes)
      .enter().append('g')
      .attr('class', 'node')
      .style('cursor', 'grab')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));
    
    node.append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('opacity', 0.3);
    
    node.append('text')
      .attr('dy', d => d.size + 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('fill', '#374151')
      .attr('opacity', 0.3)
      .style('pointer-events', 'none')
      .text(d => d.name);
    
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      
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
    
    // Animate current step
    setTimeout(() => updateStepVisualization(), 100);
  };

  const updateStepVisualization = () => {
    if (!generatedWorkflow || !generatedWorkflow.steps || !generatedWorkflow.steps[currentStep]) return;
    
    const svg = d3.select(svgRef.current);
    const currentStepData = generatedWorkflow.steps[currentStep];
    
    svg.selectAll('.node').each(function(d) {
      const node = d3.select(this);
      const isActive = currentStepData.nodes.includes(d.id);
      
      node.select('circle')
        .transition()
        .duration(500)
        .attr('opacity', isActive ? 1 : 0.2)
        .attr('stroke-width', isActive ? 3 : 2);
      
      node.select('text')
        .transition()
        .duration(500)
        .attr('opacity', isActive ? 1 : 0.3);
    });
    
    svg.selectAll('.link').each(function(d) {
      const link = d3.select(this);
      const isActive = currentStepData.edges && currentStepData.edges.some(e => 
        e.source === (typeof d.source === 'object' ? d.source.id : d.source) && 
        e.target === (typeof d.target === 'object' ? d.target.id : d.target)
      );
      
      link.transition()
        .duration(500)
        .attr('stroke-opacity', isActive ? 0.8 : 0.1)
        .attr('stroke-width', isActive ? 3 : 2);
    });
  };

  const saveWorkflow = () => {
    if (generatedWorkflow && questionText.trim()) {
      const workflow = {
        id: `wf${Date.now()}`,
        question: questionText,
        approach: approachText,
        ...generatedWorkflow
      };
      setSavedWorkflows([...savedWorkflows, workflow]);
    }
  };

  const loadWorkflow = (workflow) => {
    setQuestionText(workflow.question);
    setGeneratedWorkflow(workflow);
    setApproachText(workflow.approach);
    setCurrentStep(0);
  };

  const resetWorkflow = () => {
    setQuestionText('');
    setGeneratedWorkflow(null);
    setApproachText('');
    setCurrentStep(0);
    setIsEditingApproach(false);
    setError(null);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (generatedWorkflow?.steps && currentStep < generatedWorkflow.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Question Input */}
      <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-serif text-gray-900 mb-2">AI Workflow Builder</h1>
          <p className="text-sm text-gray-500">Ask a question, get the BKG traversal</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Question Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Question
            </label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              placeholder="e.g., Which SKUs will stock out in the next 7 days by store?"
              disabled={isGenerating}
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={generateWorkflow}
              disabled={!questionText.trim() || isGenerating}
              className="w-full px-4 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Workflow...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Create Workflow
                </>
              )}
            </button>

            {generatedWorkflow && (
              <>
                <button
                  onClick={saveWorkflow}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  💾 Save Workflow
                </button>
                <button
                  onClick={resetWorkflow}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  ✨ New Question
                </button>
              </>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Generated Approach */}
          {generatedWorkflow && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Approach
                </label>
                <button
                  onClick={() => setIsEditingApproach(!isEditingApproach)}
                  className="text-teal-600 hover:text-teal-800 transition-colors text-sm font-medium"
                >
                  {isEditingApproach ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              {isEditingApproach ? (
                <div className="space-y-2">
                  <textarea
                    value={approachText}
                    onChange={(e) => setApproachText(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  />
                  <button
                    onClick={() => setIsEditingApproach(false)}
                    className="w-full px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 leading-relaxed">{approachText}</p>
                </div>
              )}
            </div>
          )}

          {/* Steps Navigation */}
          {generatedWorkflow?.steps && generatedWorkflow.steps.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-600">
                  Step {currentStep + 1} of {generatedWorkflow.steps.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={currentStep >= generatedWorkflow.steps.length - 1}
                    className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {generatedWorkflow.steps[currentStep]?.text}
              </p>
            </div>
          )}

          {/* Saved Workflows */}
          {savedWorkflows.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Saved Workflows ({savedWorkflows.length})
              </label>
              <div className="space-y-2">
                {savedWorkflows.map(wf => (
                  <div
                    key={wf.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-teal-500 transition-colors cursor-pointer"
                    onClick={() => loadWorkflow(wf)}
                  >
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{wf.question}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {wf.nodes.length} nodes • {wf.edges.length} edges • {wf.steps?.length || 0} steps
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Graph Visualization */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {questionText || 'BKG Traversal Preview'}
          </h2>
          {generatedWorkflow && (
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                {generatedWorkflow.nodes.length} Nodes
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                {generatedWorkflow.edges.length} Edges
              </span>
              {generatedWorkflow.steps && (
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                  {generatedWorkflow.steps.length} Steps
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex-1 p-6 overflow-hidden bg-white">
          <div className="bg-gray-50 rounded-2xl shadow-sm h-full flex items-center justify-center">
            {generatedWorkflow ? (
              <svg ref={svgRef} className="w-full h-full"></svg>
            ) : (
              <div className="text-center text-gray-400 max-w-md">
                <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-lg font-medium mb-2">Ask a Business Question</p>
                <p className="text-sm leading-relaxed">
                  Enter your question on the left and click "Create Workflow" to automatically generate the BKG traversal path with AI
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoWorkflowBuilder;
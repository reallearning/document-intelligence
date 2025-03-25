"use client"
import React, { useState } from 'react';
import { 
  TrendingUp, AlertTriangle, DollarSign, Package, BarChart3, 
  Calendar, Zap, ArrowUp, ArrowDown, Filter, 
  Sliders, Store, Globe, Target, Plus, Minus, 
  Award, Clock, RefreshCw, Coffee, Tag, 
  Info, ChevronDown, ChevronRight, Check, Layers,
  Users, CreditCard, ShoppingBag
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('planning');
  const [activeLevel, setActiveLevel] = useState('brand');
  const [scenarioSettings, setScenarioSettings] = useState({
    markdown: 20,
    sellThrough: 65,
    growth: 8,
    newCollection: 50
  });

  // Brand-level insights
  const brandInsights = [
    {
      title: "Full-Price Sell-through Below Target",
      description: "Current full-price sell-through across all channels is at 65%, below the 75% target for this season.",
      impact: "₹1.8Cr margin erosion projected",
      status: "critical",
      kpi: {
        label: "Full-price sell-through",
        value: "65%",
        change: "-10% vs target"
      },
      rootCause: "Analysis shows three primary factors: 1) Over-buying in certain categories leading to excess inventory, 2) Inconsistent pricing strategy across channels creating promotional pressure, and 3) Sub-optimal inventory allocation with high-demand items stocked in low-velocity stores.",
      actions: [
        {
          title: "Adjust Stock-to-Sales Ratio",
          description: "Reduce the stock-to-sales ratio from current 1.8 to target 1.5 across all channels with strategic inventory reductions.",
          impact: "₹0.8Cr margin recovery"
        },
        {
          title: "End-of-Season Strategy Revision",
          description: "Run a shorter 3-week markdown period with better phasing (10%, 20%, then 30% off) versus current 5-week approach.",
          impact: "₹0.6Cr margin protection"
        }
      ]
    },
    {
      title: "Ethnic Wear Collection Opportunity",
      description: "Premium Ethnic Collection showing 28% higher sell-through than forecast, driven by wedding season demand.",
      impact: "₹3.2Cr potential upside if inventory constraints resolved",
      status: "positive",
      kpi: {
        label: "Ethnic wear sell-through",
        value: "93%",
        change: "+28% vs forecast"
      },
      rootCause: "Data analysis reveals strong wedding season demand patterns in Mumbai and Bangalore regions. This demand exceeds our pre-season projections by 28%, creating stockout risks but also opportunity for revenue growth if properly managed."
    }
  ];

  // Brand-level optimization strategies
  const brandStrategies = [
    {
      title: "Markdown Strategy Optimization",
      description: "Implement a data-driven, tiered markdown approach based on SKU performance segmentation.",
      impact: "₹3.2Cr annual margin improvement",
      details: "Replace calendar-based markdowns with 4-tier system based on sell-through velocity."
    },
    {
      title: "Ethnic Wear Collection Expansion",
      description: "Capitalize on 28% higher than forecast demand with inventory reallocation and express production.",
      impact: "₹3.2Cr potential revenue upside",
      details: "Fast-track production and delivery of key ethnic wear styles experiencing high demand."
    }
  ];
  
  // Channel-level optimization strategies
  const channelStrategies = [
    {
      title: "Channel-Specific Pricing Strategy",
      description: "Implement differentiated pricing across channels based on customer behavior and economics.",
      impact: "₹3.4Cr annual margin improvement",
      details: "Maintain longer full-price windows in EBOs vs value-focused pricing in LFS."
    },
    {
      title: "Online Channel Profitability Enhancement",
      description: "Strategic initiatives to improve the contribution margin of online channels.",
      impact: "₹2.2Cr annual profit improvement",
      details: "Shift premium products from marketplaces to owned channels and implement pricing floors."
    }
  ];
  
  // POS-level optimization strategies
  const posStrategies = [
    {
      title: "Mumbai Flagship Conversion Improvement",
      description: "Address 5.2% conversion rate drop with targeted interventions.",
      impact: "₹34L monthly revenue recovery",
      details: "Optimize staff scheduling during peak hours (5-8pm) and refresh visual merchandising."
    },
    {
      title: "Delhi Best Practices Implementation",
      description: "Replicate Delhi Select store's success factors across the network.",
      impact: "₹1.2Cr annual opportunity",
      details: "Document and roll out Delhi's staffing model, incentive structure, and product presentation."
    }
  ];
  
  // SKU-level optimization strategies
  const skuStrategies = [
    {
      title: "High-Velocity SKU Replenishment",
      description: "Ensure adequate stock of top-selling SKUs like Blue Oxford Shirt (SKU 1001).",
      impact: "₹30-40K per SKU revenue protection",
      details: "Implement reorder point adjustments and express replenishment for bestsellers."
    },
    {
      title: "Aging SKU Liquidation",
      description: "Clear slow-moving seasonal items like Winter Jacket (SKU 4004).",
      impact: "₹30K cash recovery per style",
      details: "Apply 60% markdown on winter items to free up space and working capital."
    }
  ];

  // Tab selection component
  const TabNav = () => (
    <div className="flex bg-white rounded-lg shadow-sm mb-6 mt-6">
      <button 
        className={`flex-1 py-3 px-5 text-sm font-medium ${activeTab === 'planning' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTab('planning')}
      >
        <Target className="h-4 w-4 inline mr-2" />
        Revenue Planning
      </button>
      <button 
        className={`flex-1 py-3 px-5 text-sm font-medium ${activeTab === 'current' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTab('current')}
      >
        <BarChart3 className="h-4 w-4 inline mr-2" />
        Current Performance
      </button>
      <button 
        className={`flex-1 py-3 px-5 text-sm font-medium ${activeTab === 'optimization' ? 'text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
        onClick={() => setActiveTab('optimization')}
      >
        <Sliders className="h-4 w-4 inline mr-2" />
        Optimization Strategies
      </button>
    </div>
  );

  // Level selector component
  const LevelNav = () => (
    <div className="flex space-x-2 mb-6">
      <button
        className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
          activeLevel === 'brand'
            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
        onClick={() => setActiveLevel('brand')}
      >
        <Award className="h-4 w-4 mr-2" />
        Brand
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
          activeLevel === 'channel'
            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
        onClick={() => setActiveLevel('channel')}
      >
        <Layers className="h-4 w-4 mr-2" />
        Channel
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
          activeLevel === 'pos'
            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
        onClick={() => setActiveLevel('pos')}
      >
        <Store className="h-4 w-4 mr-2" />
        POS
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
          activeLevel === 'sku'
            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        }`}
        onClick={() => setActiveLevel('sku')}
      >
        <Tag className="h-4 w-4 mr-2" />
        SKU
      </button>
    </div>
  );

  // Morning briefing component
  const MorningBriefing = () => (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
      <div className="flex items-center mb-3">
        <Coffee className="h-5 w-5 text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Morning Briefing</h2>
      </div>
      <div className="bg-yellow-50 rounded-lg p-5 border-l-4 border-l-yellow-500">
        <h3 className="font-medium mb-3">Good morning! Here&apos;s what you need to know today:</h3>
        <ul className="space-y-2">
          <li className="flex items-start my-2">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
            <span className="ml-3 text-gray-700">
              High priority: 5 ethnic wear SKUs at risk of stockout within 7 days (₹32L revenue at risk)
            </span>
          </li>
          <li className="flex items-start my-2">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
            <span className="ml-3 text-gray-700">
              High priority: June cash projection shows ₹1.2Cr shortfall below minimum threshold
            </span>
          </li>
          <li className="flex items-start my-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
            <span className="ml-3 text-gray-700">
              Medium priority: Mumbai Flagship conversion rate dropped 5.2% (₹8.5L weekly revenue impact)
            </span>
          </li>
          <li className="flex items-start my-2">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
            <span className="ml-3 text-gray-700">
              Positive: Delhi Select store outperforming sales targets by 17% this month
            </span>
          </li>
        </ul>
      </div>
    </div>
  );

  // Planning tab content
  const PlanningTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Adjust Revenue Drivers</h3>
        <p className="text-sm text-gray-600 mb-4">
          Modify key revenue drivers to see the impact on overall projections and understand optimization opportunities.
        </p>
        
        <div className="bg-white rounded-lg shadow-sm p-5 border border-indigo-100">
          <h3 className="font-semibold text-gray-800 mb-1">Q3 Revenue Scenario</h3>
          <p className="text-sm text-gray-600 mb-4">Configure parameters to simulate potential revenue outcomes.</p>
          
          {/* Markdown slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <h4 className="text-sm font-medium text-gray-800">Markdown Percentage</h4>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <Info size={14} />
                </button>
              </div>
              <div className="flex items-center">
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={() => setScenarioSettings({...scenarioSettings, markdown: Math.max(0, scenarioSettings.markdown - 1)})}
                >
                  <Minus size={14} />
                </button>
                <span className="mx-2 text-sm font-semibold">{scenarioSettings.markdown}%</span>
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={() => setScenarioSettings({...scenarioSettings, markdown: Math.min(50, scenarioSettings.markdown + 1)})}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="absolute h-2 bg-indigo-600 rounded-full" 
                style={{ width: `${(scenarioSettings.markdown / 50) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0%</span>
              <span>50%</span>
            </div>
            
            <div className="mt-1 text-xs text-indigo-600 font-medium">
              Impact on revenue: {scenarioSettings.markdown > 20 ? '-' : '+'}₹{Math.abs((scenarioSettings.markdown - 20) * 0.15).toFixed(2)}Cr
            </div>
          </div>
          
          {/* Sell-through slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <h4 className="text-sm font-medium text-gray-800">Sell-through Target</h4>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <Info size={14} />
                </button>
              </div>
              <div className="flex items-center">
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={() => setScenarioSettings({...scenarioSettings, sellThrough: Math.max(50, scenarioSettings.sellThrough - 1)})}
                >
                  <Minus size={14} />
                </button>
                <span className="mx-2 text-sm font-semibold">{scenarioSettings.sellThrough}%</span>
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={() => setScenarioSettings({...scenarioSettings, sellThrough: Math.min(100, scenarioSettings.sellThrough + 1)})}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="absolute h-2 bg-indigo-600 rounded-full" 
                style={{ width: `${((scenarioSettings.sellThrough - 50) / 50) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>50%</span>
              <span>100%</span>
            </div>
            
            <div className="mt-1 text-xs text-indigo-600 font-medium">
              Impact on revenue: +₹{((scenarioSettings.sellThrough - 65) * 0.08).toFixed(2)}Cr
            </div>
          </div>
          
          {/* Growth target slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <h4 className="text-sm font-medium text-gray-800">Growth Target</h4>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <Info size={14} />
                </button>
              </div>
              <div className="flex items-center">
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={() => setScenarioSettings({...scenarioSettings, growth: Math.max(0, scenarioSettings.growth - 0.5)})}
                >
                  <Minus size={14} />
                </button>
                <span className="mx-2 text-sm font-semibold">{scenarioSettings.growth}%</span>
                <button 
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={() => setScenarioSettings({...scenarioSettings, growth: Math.min(25, scenarioSettings.growth + 0.5)})}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="absolute h-2 bg-indigo-600 rounded-full" 
                style={{ width: `${(scenarioSettings.growth / 25) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0%</span>
              <span>25%</span>
            </div>
            
            <div className="mt-1 text-xs text-indigo-600 font-medium">
              Impact on revenue: +₹{(scenarioSettings.growth * 0.4).toFixed(2)}Cr
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <button className="text-sm text-indigo-600 font-medium border border-indigo-200 px-3 py-1.5 rounded-md">
              Reset to Current
            </button>
            <button className="text-sm text-white font-medium bg-indigo-600 px-4 py-1.5 rounded-md hover:bg-indigo-700">
              Apply Changes
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Revenue Projection */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Revenue Projection</h3>
          
          {/* Calculate revenue based on settings */}
          {(() => {
            const baseRevenue = 126.8; // Cr
            const markdownImpact = (scenarioSettings.markdown - 20) * -0.15;
            const sellThroughImpact = (scenarioSettings.sellThrough - 65) * 0.08;
            const growthImpact = scenarioSettings.growth * 0.4;
            const newCollectionImpact = ((scenarioSettings.newCollection || 50) - 50) * 0.06;
            
            const projectedRevenue = baseRevenue + markdownImpact + sellThroughImpact + growthImpact + newCollectionImpact;
            const percentChange = ((projectedRevenue / baseRevenue) - 1) * 100;
            
            return (
              <>
                <div className="text-3xl font-bold text-indigo-700 mb-2">₹{projectedRevenue.toFixed(1)}Cr</div>
                <div className={`text-sm font-medium ${percentChange >= 0 ? 'text-green-600' : 'text-red-600'} mb-4`}>
                  {percentChange >= 0 ? (
                    <ArrowUp className="h-4 w-4 inline mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 inline mr-1" />
                  )}
                  {percentChange.toFixed(1)}% vs Current Projection (₹126.8Cr)
                </div>
              </>
            );
          })()}
          
          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Metrics</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Gross Margin</span>
                <span className="font-medium">
                  {(53.4 + (scenarioSettings.markdown - 20) * -0.2 + (scenarioSettings.sellThrough - 65) * 0.05).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${Math.min(100, 53.4 + (scenarioSettings.markdown - 20) * -0.2 + (scenarioSettings.sellThrough - 65) * 0.05)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Inventory Turnover</span>
                <span className="font-medium">
                  {(4.8 + (scenarioSettings.sellThrough - 65) * 0.01).toFixed(1)}x
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${(4.8 + (scenarioSettings.sellThrough - 65) * 0.01) / 0.08}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Recommendation */}
        <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
          <h3 className="font-semibold text-indigo-900 mb-2 flex items-center">
            <Zap className="h-4 w-4 text-indigo-500 mr-2" />
            AI Optimal Configuration
          </h3>
          <p className="text-sm text-indigo-700 mb-3">
            Based on historical data and current market conditions, I recommend:
          </p>
          <ul className="text-sm text-indigo-700 space-y-3 mb-3">
            <li className="flex items-start">
              <Check className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-indigo-500" />
              <div>
                <p className="font-medium">Markdown: 18% (-2% from current)</p>
                <p className="text-xs mt-0.5">Historical data shows this is the optimal balance between margin and sell-through</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-indigo-500" />
              <div>
                <p className="font-medium">Sell-through: 78% (+13% from current)</p>
                <p className="text-xs mt-0.5">Achievable with improved inventory allocation based on channel performance</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-indigo-500" />
              <div>
                <p className="font-medium">Growth: 10.5% (+2.5% from current)</p>
                <p className="text-xs mt-0.5">Achievable by capitalizing on ethnic wear momentum and expanding in top-performing stores</p>
              </div>
            </li>
          </ul>
          <div className="p-3 bg-white rounded-md text-sm text-indigo-900 mb-3">
            <p className="font-medium">Projected Impact:</p>
            <div className="flex justify-between mt-1">
              <span>Revenue</span>
              <span className="font-medium">₹132.5Cr (+₹5.7Cr)</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Gross Margin</span>
              <span className="font-medium">56.2% (+2.8%)</span>
            </div>
          </div>
          <button className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            Apply AI Recommendation
          </button>
        </div>
      </div>
    </div>
  );

  // Current performance tab content
  const CurrentPerformanceTab = () => {
    // Determine which strategies to display based on level
    const strategies = 
      activeLevel === 'brand' ? brandStrategies :
      activeLevel === 'channel' ? channelStrategies :
      activeLevel === 'pos' ? posStrategies :
      skuStrategies;
    
    // Determine which insights to display based on level
    const insights = 
      activeLevel === 'brand' ? brandInsights :
      activeLevel === 'channel' ? [] : // Simplified for demo
      activeLevel === 'pos' ? [] : // Simplified for demo
      []; // Simplified for demo
    
    return (
      <div>
        <LevelNav />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Current Performance */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Current Performance</h3>
            
            <div className="space-y-4">
              {insights.map((insight, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white rounded-lg shadow-sm border-l-4 ${
                    insight.status === 'critical' ? 'border-l-red-500' : 
                    insight.status === 'warning' ? 'border-l-orange-500' : 
                    'border-l-green-500'
                  } p-4 mb-4`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{insight.title}</h3>
                    {insight.kpi && insight.kpi.value && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">{insight.kpi.label}:</span>
                        <span className="text-sm font-semibold">{insight.kpi.value}</span>
                        {insight.kpi.change && (
                          <span className={`ml-2 text-xs ${insight.kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {insight.kpi.change.startsWith('+') ? (
                              <ArrowUp className="h-3 w-3 inline mr-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 inline mr-1" />
                            )}
                            {insight.kpi.change}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                  
                  {insight.impact && (
                    <div className="text-sm font-medium text-indigo-700 mb-2">
                      Impact: {insight.impact}
                    </div>
                  )}
                  
                  {insight.rootCause && (
                    <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-700">
                      <p className="font-medium">Root Cause:</p>
                      <p>{insight.rootCause}</p>
                    </div>
                  )}
                  
                  {insight.actions && insight.actions.length > 0 && (
                    <div className="mt-3">
                      <p className="font-medium text-sm mb-2">Recommended Actions:</p>
                      <div className="space-y-2">
                        {insight.actions.map((action, i) => (
                          <div key={i} className="flex items-start">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                            <div>
                              <p className="text-sm font-medium">{action.title}</p>
                              <p className="text-xs text-gray-600">{action.description}</p>
                              {action.impact && (
                                <p className="text-xs text-indigo-600 font-medium mt-1">Impact: {action.impact}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Fallback for levels without defined insights */}
              {insights.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
                  <p className="text-gray-500">Select different level to see detailed insights.</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Optimization Strategies */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Optimization Strategies</h3>
            
            <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-l-indigo-500 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">
                Top Recommendations for {activeLevel === 'brand' ? 'Brand' : activeLevel === 'channel' ? 'Channel' : activeLevel === 'pos' ? 'Store' : 'SKU'} Level
              </h4>
              
              <div className="space-y-4">
                {strategies.map((strategy, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-lg">
                      {idx + 1}
                    </div>
                    <div className="ml-4">
                      <h5 className="text-base font-medium text-gray-900">{strategy.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">
                        {strategy.description}
                      </p>
                      <div className="mt-1 text-sm text-indigo-600 font-medium">Impact: {strategy.impact}</div>
                      <p className="mt-1 text-xs text-gray-500">{strategy.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
              <div className="flex items-start">
                <Zap className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-indigo-800 mb-2">AI-Driven Implementation Plan</h3>
                  <p className="text-sm text-indigo-700 mb-3">
                    Recommended sequence for {activeLevel === 'brand' ? 'Brand-Level' : activeLevel === 'channel' ? 'Channel-Level' : activeLevel === 'pos' ? 'Store-Level' : 'SKU-Level'} optimization:
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                        Now
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-indigo-800">Immediate (7 days)</p>
                        <p className="text-xs text-indigo-700 mt-1">
                          {activeLevel === 'brand' 
                            ? 'Address stockout risks in ethnic wear collection and adjust pricing on slow sellers' 
                            : activeLevel === 'channel'
                            ? 'Implement pricing floors for marketplace platforms and start cross-channel inventory rebalancing'
                            : activeLevel === 'pos'
                            ? 'Adjust Mumbai store staffing and transfer ethnic wear to Bangalore Mall'
                            : 'Replenish SKU 1001 and liquidate SKU 4004'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                        Soon
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-indigo-800">Short-term (30 days)</p>
                        <p className="text-xs text-indigo-700 mt-1">
                          {activeLevel === 'brand' 
                            ? 'Roll out markdown strategy optimization and adjust stock-to-sales ratio' 
                            : activeLevel === 'channel'
                            ? 'Start online channel portfolio optimization and EBO performance standardization'
                            : activeLevel === 'pos'
                            ? 'Implement Delhi store best practices network-wide and optimize local product mix'
                            : 'Deploy cross-channel SKU reallocation system for all high-velocity products'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                    Generate Detailed Action Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional tables for channel and POS views */}
        {activeLevel === 'channel' && (
          <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Channel Performance Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue (MTD)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sell-through</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full-Price %</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Markdown %</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">EBO</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1.8Cr</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">68%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">62%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20.2%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LFS</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹1.2Cr</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">62%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">58%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25.5%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Online (In-house)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹85L</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">73%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">52%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">22.8%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Online (External)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹65L</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">73%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">28.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Optimization strategies tab content
  const OptimizationTab = () => (
    <div>
      <LevelNav />
      
      <div className="space-y-6">
        <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
          <div className="flex items-start">
            <Zap className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-indigo-800 mb-2">AI Revenue Optimization Strategy</h3>
              <p className="text-sm text-indigo-700 mb-3">
                Based on comprehensive analysis of all data points, a coordinated strategy across these dimensions would maximize revenue:
              </p>
              
              <div className="space-y-4 mb-4">
                <div className="bg-white rounded-md p-3">
                  <h4 className="text-sm font-medium text-indigo-900 mb-1">1. Markdown Management (₹3.2Cr impact)</h4>
                  <p className="text-xs text-indigo-800">
                    Implement 4-tier markdown strategy with SKU-specific timing based on sell-through velocity, rather than calendar-based approach.
                  </p>
                </div>
                
                <div className="bg-white rounded-md p-3">
                  <h4 className="text-sm font-medium text-indigo-900 mb-1">2. Inventory Reallocation (₹4.2Cr impact)</h4>
                  <p className="text-xs text-indigo-800">
                    Establish weekly cross-channel rebalancing focused on 5 high-impact SKUs and ethnic wear collection to prevent stockouts.
                  </p>
                </div>
                
                <div className="bg-white rounded-md p-3">
                  <h4 className="text-sm font-medium text-indigo-900 mb-1">3. Store Performance Standardization (₹2.8Cr impact)</h4>
                  <p className="text-xs text-indigo-800">
                    Scale Delhi's successful operating model to underperforming stores, focusing on staffing patterns and visual merchandising.
                  </p>
                </div>
                
                <div className="bg-white rounded-md p-3">
                  <h4 className="text-sm font-medium text-indigo-900 mb-1">4. Online Channel Optimization (₹2.2Cr impact)</h4>
                  <p className="text-xs text-indigo-800">
                    Shift premium products from marketplaces to owned channels and implement channel-specific pricing floors to protect margins.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-md p-3 mb-4">
                <h4 className="text-sm font-medium text-indigo-900 mb-1">Combined Impact</h4>
                <div className="text-2xl font-bold text-indigo-700">₹12.4Cr</div>
                <p className="text-xs text-indigo-800">
                  Potential annual revenue improvement through coordinated optimization
                </p>
              </div>
              
              <button className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Generate Detailed Implementation Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 h-screen overflow-y-auto">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">House of Anita Dongre</h1>
            <p className="text-sm text-gray-500">CFO Revenue Optimization Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">Sales +7%</span>
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">Inventory 4.8x</span>
              <span className="px-3 py-1 text-sm font-medium bg-orange-100 text-orange-800 rounded-full">Cash ₹4.2Cr</span>
            </div>
            <div className="text-xs text-gray-500">Last updated: Today, 9:15 AM</div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        {/* Morning Briefing - Always visible */}
        <MorningBriefing />
        
        {/* Tab Navigation */}
        <TabNav />
        
        {/* Tab Content */}
        {activeTab === 'planning' && <PlanningTab />}
        {activeTab === 'current' && <CurrentPerformanceTab />}
        {activeTab === 'optimization' && <OptimizationTab />}
      </main>
    </div>
  );
};

export default Dashboard;

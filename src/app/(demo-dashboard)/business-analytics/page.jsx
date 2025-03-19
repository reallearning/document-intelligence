"use client"
import React, { useState } from 'react';
import { 
  AlertCircle, 
  TrendingUp, 
  TrendingDown,
  ArrowRight, 
  Store, 
  ShoppingBag, 
  DollarSign, 
  Check, 
  MessageSquare,
  Send,
  Brain,
  Coffee
} from 'lucide-react';

const AnitaDongreAI = () => {
  const [messageInput, setMessageInput] = useState('');
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Good morning! I've analyzed today's data and found several important insights that need your attention. The most urgent is a potential stockout risk for 5 high-demand ethnic wear SKUs in Mumbai and Bangalore stores. I've outlined everything below to help you make quick decisions today." }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    setMessages([...messages, { sender: 'user', text: messageInput }]);
    
    setTimeout(() => {
      let aiResponse = "I'm analyzing your question...";
      
      if (messageInput.toLowerCase().includes('stockout')) {
        aiResponse = "About the stockout risk - I've noticed a 28% higher sell-through than forecast for these items, specifically due to wedding season demand that wasn't fully accounted for in our original projections. Should we prioritize the express shipment approach or would you prefer the temporary price increase to manage demand while we restock?";
      } else if (messageInput.toLowerCase().includes('sales')) {
        aiResponse = "Looking at our sales data more closely, I've noticed Delhi Select's success comes from their unique visual merchandising approach with the new Spring collection - they've placed premium pieces at eye level and created more intuitive customer journeys through the store. We could replicate this at other locations for a potential 8-12% lift.";
      } else if (messageInput.toLowerCase().includes('cash') || messageInput.toLowerCase().includes('finance')) {
        aiResponse = "I've been thinking more about our cash flow situation - the main pressure point is actually the payment schedule with our top 3 suppliers. If we renegotiate terms with just Fabrics International and Modern Textiles, we could extend payment windows by 15 days and completely eliminate the projected shortfall without touching our credit line. Would you like me to draft a proposal?";
      } else {
        aiResponse = "That's an interesting question. Let me share what I'm seeing in our data. The patterns suggest we should consider a more nuanced approach here. What specific outcome are you hoping to achieve so I can tailor my recommendations accordingly?";
      }
      
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setMessageInput('');
    }, 1000);
  };

  const insights = [
    {
      id: 1,
      title: "Ethnic Wear Stockout Risk",
      summary: "5 high-demand ethnic wear SKUs at risk of stockout in Mumbai, Bangalore",
      category: "inventory",
      priority: "high",
      impact: "₹32L potential revenue at risk",
      details: {
        description: "Based on current sales velocity and inventory levels, 5 SKUs in our Premium Ethnic Collection are projecting stockout within 7 days at Mumbai Flagship and Bangalore Mall locations. These items have shown 28% higher sell-through than forecast over the past 2 weeks, driven by wedding season demand.",
        recommendedActions: [
          "Expedite shipment of in-transit items with logistics partner",
          "Place immediate express order for missing SKUs",
          "Temporarily increase prices by 8% on these items to slow sales velocity",
          "Transfer 2 units each of ET-2347 and ET-2415 from Delhi store (low velocity location)"
        ]
      }
    },
    {
      id: 2,
      title: "Mumbai Store Conversion Rate Drop",
      summary: "Mumbai Flagship conversion rate dropped 5.2% this week vs. last week",
      category: "sales",
      priority: "medium",
      impact: "Estimated ₹8.5L weekly revenue loss",
      details: {
        description: "The Mumbai Flagship store has experienced a significant drop in conversion rate from 18.3% to 13.1% over the past 7 days, despite consistent footfall numbers. This represents the sharpest week-over-week decline in the past 6 months.",
        recommendedActions: [
          "Temporary staff reallocation from lower-traffic stores",
          "Revert to previous trial room area arrangement",
          "Price adjustment on slow-converting western wear items (10-15% reduction)"
        ]
      }
    },
    {
      id: 3,
      title: "Cash Flow Warning: June Projection",
      summary: "June projected cash balance below safety threshold",
      category: "cash",
      priority: "high",
      impact: "₹1.2Cr projected shortfall",
      details: {
        description: "Based on current receivables aging, scheduled payments, and sales projections, our cash flow model predicts that end-of-June cash balance will fall approximately ₹1.2Cr below our established minimum operating threshold.",
        recommendedActions: [
          "Prioritize collection efforts with ABC Retailer",
          "Negotiate 30-day extension on 50% of upcoming inventory payment",
          "Delay non-essential store expansion expenses to July",
          "Prepare to activate short-term credit line by June 15 if collections do not improve"
        ]
      }
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: "Optimize Inventory Allocation",
      summary: "Redistribute 350+ units to prevent stockouts and reduce dead stock",
      category: "inventory",
      impact: "Estimated ₹42L revenue protection",
      confidence: 92,
      details: {
        situation: "We have inventory imbalances across 17 stores, with 8 locations risking stockouts on high-demand items while 6 stores have excess inventory on the same SKUs.",
        analysis: "By analyzing historical sales patterns, current velocity, and upcoming seasonal trends, I've identified optimal inventory levels for each location based on their unique customer demographics and buying patterns.",
        opportunity: "A precisely targeted redistribution can prevent revenue loss from stockouts while reducing holding costs for slow-moving inventory.",
        recommendation: "Implement a cross-location inventory transfer plan focusing on 350 units across 42 SKUs, prioritizing high-margin and high-velocity products. This will immediately improve stock allocation efficiency by approximately 27%.",
        considerations: "Transfer costs will be approximately ₹1.2L, representing a 35x ROI based on protected revenue. Transfers should be completed during low-traffic early morning hours to minimize customer disruption.",
        brainstormQuestions: [
          "Could we use this opportunity to test dynamic pricing in stores with varying inventory levels?",
          "How might we implement real-time inventory visibility tools for store managers?",
          "What if we created a predictive model to recommend pre-emptive transfers before stockout risks appear?"
        ]
      }
    },
    {
      id: 2,
      title: "Store Staffing Optimization",
      summary: "Realign staff scheduling with footfall patterns to increase conversion",
      category: "sales",
      impact: "Projected 4% conversion increase",
      confidence: 87,
      details: {
        situation: "Our staff scheduling doesn't align with actual customer footfall patterns, creating understaffing during peak hours and overstaffing during slow periods, particularly at our Mumbai and Delhi locations.",
        analysis: "By analyzing hourly footfall data against conversion rates and staff presence, I've identified a strong correlation between adequate staffing ratios and conversion success, especially during weekend afternoons.",
        opportunity: "Optimizing staff schedules could increase conversion rates by 3-5% during peak hours without increasing total labor hours.",
        recommendation: "Implement a dynamic scheduling system that adjusts staffing based on predicted footfall patterns, with particular focus on ensuring adequate coverage during the 2-6pm weekend window when conversion opportunity is highest.",
        considerations: "This will require flexible scheduling arrangements with staff, potentially including split shifts and weekend incentives. The projected conversion improvement would generate approximately ₹14L in additional monthly revenue.",
        brainstormQuestions: [
          "Could we implement a rapid-response team that moves between nearby stores based on real-time footfall?",
          "What if we tested specialized roles during peak hours (e.g., dedicated stylists, fitting room attendants)?",
          "How might we involve store associates in developing optimal scheduling approaches?"
        ]
      }
    },
    {
      id: 3,
      title: "Cash Flow Enhancement Plan",
      summary: "Accelerate receivables and optimize payment schedule",
      category: "cash",
      impact: "₹1.6Cr improved cash position",
      confidence: 90,
      details: {
        situation: "Our projected June cash position falls below our minimum threshold, creating potential constraints on inventory purchasing at a critical seasonal transition point.",
        analysis: "The shortfall is primarily due to payment timing misalignment rather than fundamental business issues - we have ₹3.8Cr in receivables that could be accelerated and ₹4.2Cr in payables that could be optimized.",
        opportunity: "Through targeted interventions, we can improve our June cash position by ₹1.6Cr without impacting vendor relationships or requiring external financing.",
        recommendation: "Implement a three-part strategy: 1) Offer 1.5% early payment discounts to key wholesale accounts, 2) Negotiate 15-day extensions with our 3 largest suppliers, and 3) Optimize consignment terms with mall locations.",
        considerations: "Early payment discounts have a direct P&L impact but are offset by avoiding short-term financing costs. Supplier negotiations should emphasize our growth trajectory and increased order volumes planned for Q3.",
        brainstormQuestions: [
          "Could we implement a dynamic discount structure that adjusts based on how early payment is received?",
          "What if we explored partial prepayment from loyal wholesale customers in exchange for priority allocation?",
          "How might we create a more predictable cash flow cycle through year-round planning?"
        ]
      }
    }
  ];

  const toggleInsight = (id) => {
    if (expandedInsight === id) {
      setExpandedInsight(null);
    } else {
      setExpandedInsight(id);
    }
  };

  const toggleRecommendation = (id) => {
    if (expandedRecommendation === id) {
      setExpandedRecommendation(null);
    } else {
      setExpandedRecommendation(id);
    }
  };

  return (
    <div className="h-screen bg-gray-50 p-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">House of Anita Dongre</h1>
              <p className="text-gray-600">AI Business Analyst</p>
            </div>
            <div className="flex space-x-1">
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Sales +7%</span>
              </div>
              <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg flex items-center">
                <ShoppingBag className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Inventory 4.8x</span>
              </div>
              <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Cash ₹4.2Cr</span>
              </div>
            </div>
          </div>
        </header>

        {/* Morning Briefing Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center mb-4">
            <Coffee className="w-5 h-5 text-amber-600 mr-2" />
            <h2 className="text-lg font-medium">Morning Briefing</h2>
          </div>
          
          <div className="mb-4 bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-gray-800">
              Good morning! Here's what you need to know today:
            </p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                <span>High priority: 5 ethnic wear SKUs at risk of stockout within 7 days (₹32L revenue at risk)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-2">•</span>
                <span>High priority: June cash projection shows ₹1.2Cr shortfall below minimum threshold</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 font-bold mr-2">•</span>
                <span>Medium priority: Mumbai Flagship conversion rate dropped 5.2% (₹8.5L weekly revenue impact)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">•</span>
                <span>Positive: Delhi Select store outperforming sales targets by 17% this month</span>
              </li>
            </ul>
          </div>
          
          <div className="border-t border-gray-100 pt-4">
            <div className="flex space-x-2">
              <button 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-lg px-4 py-2 flex items-center"
                onClick={() => setMessageInput("What's causing the stockout risk in Mumbai?")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Tell me more about stockout risk
              </button>
              <button 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-lg px-4 py-2 flex items-center"
                onClick={() => setMessageInput("What's your plan for the cash flow issue?")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Ask about cash flow plan
              </button>
              <button 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-lg px-4 py-2 flex items-center"
                onClick={() => setMessageInput("Why is Delhi performing so well?")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Why is Delhi outperforming?
              </button>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-medium">Chat with your AI Analyst</h2>
          </div>
          
          <div className="h-48 overflow-y-auto mb-4 border border-gray-100 rounded-lg p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Ask me anything about your business data..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Send className="w-4 h-4 mr-1" />
              <span>Ask</span>
            </button>
          </form>
        </div>

        {/* Insights Section - Expanded on main screen */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <h2 className="text-lg font-medium">Critical Business Insights</h2>
            </div>
            <div className="text-sm text-gray-500">Last updated: Today, 9:15 AM</div>
          </div>
          
          <div className="space-y-6">
            {insights.map(insight => (
              <div 
                key={insight.id} 
                className={`bg-white rounded-lg border ${
                  insight.priority === 'high' ? 'border-l-4 border-l-red-500' : 
                  insight.priority === 'medium' ? 'border-l-4 border-l-amber-500' : 
                  'border-gray-100'
                } p-4 hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-start mb-3">
                  <div className={`p-2 rounded-full mr-3 ${
                    insight.priority === 'high' ? 'bg-red-100' : 
                    insight.priority === 'medium' ? 'bg-amber-100' : 
                    'bg-blue-100'
                  }`}>
                    <AlertCircle className={`w-5 h-5 ${
                      insight.priority === 'high' ? 'text-red-600' : 
                      insight.priority === 'medium' ? 'text-amber-600' : 
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{insight.summary}</p>
                  </div>
                  <button 
                    onClick={() => toggleInsight(insight.id)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center"
                  >
                    {expandedInsight === insight.id ? "Hide Details" : "Show Details"}
                  </button>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full ${
                      insight.category === 'inventory' ? 'bg-blue-100 text-blue-800' : 
                      insight.category === 'sales' ? 'bg-green-100 text-green-800' : 
                      insight.category === 'cash' ? 'bg-purple-100 text-purple-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {insight.category}
                    </span>
                    <span className="mx-2">•</span>
                    <span className={`px-2 py-1 rounded-full ${
                      insight.priority === 'high' ? 'bg-red-100 text-red-800' : 
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {insight.priority} priority
                    </span>
                  </div>
                  <div className="font-medium">
                    {insight.impact}
                  </div>
                </div>
                
                {expandedInsight === insight.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="mb-4">
                      <p className="text-sm text-gray-700">{insight.details.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 text-sm">Recommended Actions:</h4>
                      <div className="space-y-2">
                        {insight.details.recommendedActions.map((action, idx) => (
                          <div key={idx} className="flex items-center bg-green-50 rounded-lg p-3">
                            <div className="bg-white rounded-full p-1 mr-2">
                              <Check className="w-3 h-3 text-green-600" />
                            </div>
                            <p className="text-xs flex-1">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations Section - Enhanced with more details */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <Brain className="w-5 h-5 text-purple-600 mr-2" />
              <h2 className="text-lg font-medium">Strategic Recommendations</h2>
            </div>
            <div className="text-sm text-gray-500">AI-generated opportunities</div>
          </div>
          
          <div className="space-y-6">
            {recommendations.map(rec => (
              <div 
                key={rec.id} 
                className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start mb-3">
                  <div className={`p-2 rounded-full mr-3 ${
                    rec.category === 'inventory' ? 'bg-blue-100' : 
                    rec.category === 'sales' ? 'bg-green-100' : 
                    'bg-purple-100'
                  }`}>
                    {rec.category === 'inventory' ? (
                      <ShoppingBag className="w-5 h-5 text-blue-600" />
                    ) : rec.category === 'sales' ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{rec.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{rec.summary}</p>
                  </div>
                  <button 
                    onClick={() => toggleRecommendation(rec.id)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center"
                  >
                    {expandedRecommendation === rec.id ? "Hide Details" : "Show Details"}
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="bg-gray-50 rounded p-2 text-center">
                    <p className="text-xs text-gray-500">Confidence</p>
                    <p className="font-medium text-sm">{rec.confidence}%</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2 text-center">
                    <p className="text-xs text-gray-500">Impact</p>
                    <p className="font-medium text-sm">{rec.impact}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2 text-center">
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="font-medium text-sm capitalize">{rec.category}</p>
                  </div>
                </div>
                
                {expandedRecommendation === rec.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-900 mb-1">SITUATION</h4>
                        <p className="text-xs text-gray-700">{rec.details.situation}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-900 mb-1">ANALYSIS</h4>
                        <p className="text-xs text-gray-700">{rec.details.analysis}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-900 mb-1">OPPORTUNITY</h4>
                        <p className="text-xs text-gray-700">{rec.details.opportunity}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-900 mb-1">RECOMMENDATION</h4>
                        <p className="text-xs text-gray-700">{rec.details.recommendation}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-900 mb-1">CONSIDERATIONS</h4>
                        <p className="text-xs text-gray-700">{rec.details.considerations}</p>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-purple-800 mb-2 flex items-center">
                        <Brain className="w-4 h-4 mr-1" />
                        Brainstorming Questions
                      </h4>
                      <div className="space-y-2">
                        {rec.details.brainstormQuestions.map((question, idx) => (
                          <p key={idx} className="text-xs text-purple-800">{question}</p>
                        ))}
                      </div>
                      
                      <button className="mt-3 w-full bg-purple-600 text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center">
                        <Brain className="w-3 h-3 mr-1" />
                        Brainstorm with me
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnitaDongreAI;

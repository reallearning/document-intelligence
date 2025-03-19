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
  Coffee,
  Users,
  Percent,
  Clock,
  Calendar,
  MapPin,
  Filter,
  PieChart
} from 'lucide-react';

const AnitaDongreAI = () => {
  const [messageInput, setMessageInput] = useState('');
  const [expandedInsight, setExpandedInsight] = useState(null);
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Good morning! I've synthesized data from all your latest reports including February footfall metrics, March 2025 financials, and the latest actionable insights report. The most critical findings include a concerning 19% drop in conversation rates, a 21% YOY sales decline, and 67% missed purchase opportunities. I've outlined priorities and detailed recommendations below." }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    setMessages([...messages, { sender: 'user', text: messageInput }]);
    
    setTimeout(() => {
      let aiResponse = "I'm analyzing your question...";
      
      if (messageInput.toLowerCase().includes('footfall') || messageInput.toLowerCase().includes('traffic') || messageInput.toLowerCase().includes('conversion')) {
        aiResponse = "Looking at our footfall data, we're seeing a concerning trend with a 12% overall drop from January to February. What's more alarming is the 19% decrease in conversion rates, with particularly poor performance in the East region (only 7% conversion). The South region is our strongest performer at 18% conversion. This footfall decline combined with conversion drops explains much of our sales challenges. Beyond just getting customers in the door, we need to focus on the 67% of visitors who spend over 15 minutes in-store but leave without purchasing - that's ₹8.41 Cr in potential lost revenue.";
      } else if (messageInput.toLowerCase().includes('sales') || messageInput.toLowerCase().includes('revenue')) {
        aiResponse = "Our sales analysis shows March 2025 YTD sales declined by 21%, with AND down 14% and Global Desi down by 28%. This aligns with our footfall data showing AND's traffic down by 15% and conversion down 20%. Global Desi's footfall only dropped 2%, but conversions fell 7%, indicating different problems between brands. Looking at store performance, there's high variability - for example, the Delhi Select store is outperforming targets by 17%, while Vadodara Inorbit is achieving only 21% of its targets. The East region is particularly concerning with 5 of 6 stores showing conversion rates below 11%.";
      } else if (messageInput.toLowerCase().includes('cash') || messageInput.toLowerCase().includes('finance')) {
        aiResponse = "Our financial position is facing pressure on multiple fronts. The June projected cash balance is ₹1.2Cr below our safety threshold. This is driven by declining sales (only 38% of monthly targets achieved so far) and high inventory costs. Our OPEX is running at 97% of AOP, impacting profitability. I recommend implementing the immediate cash flow enhancement plan to improve our position by ₹1.6Cr without external financing: offer 1.5% early payment discounts to key wholesale accounts, negotiate 15-day extensions with our 3 largest suppliers, and optimize consignment terms with mall locations.";
      } else if (messageInput.toLowerCase().includes('action') || messageInput.toLowerCase().includes('recommend')) {
        aiResponse = "Based on cross-analysis of all reports, I recommend these priority actions: 1) Focus on conversion improvement in high-footfall, low-conversion stores like Inorbit Malad (5659 visitors, 4% conversion) and Lulu Cochin (1838 visitors, 11% conversion). 2) Implement targeted inventory redistribution from 8 locations with stockout risks to 6 stores with excess inventory of the same SKUs. 3) Launch a customer engagement initiative targeting the 67% of customers who spend >15 mins in-store without purchasing. 4) Optimize store staffing to align with actual footfall patterns, particularly in Mumbai and Delhi locations where we're seeing staffing misalignment with peak hours.";
      } else {
        aiResponse = "Based on my analysis of multiple data sources, I see that our key challenges are interconnected. The footfall drop (12%) and conversion rate decline (19%) directly explain our sales performance issues (-21% YTD). The regional variations are significant - South leads with 18% conversion while East struggles at 7%. Our cash flow challenges (₹1.2Cr projected shortfall) are directly connected to these sales declines and inventory inefficiencies. The most promising opportunity is addressing the 67% missed conversion opportunities, representing ₹8.41Cr in potential revenue. This would simultaneously improve sales and address cash flow concerns. Would you like me to elaborate on any specific area?";
      }
      
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setMessageInput('');
    }, 1000);
  };

  const insights = [
    {
      id: 1,
      title: "Critical Conversion Rate Drop",
      summary: "Conversion rates declined 19% vs. January, with 67% missed opportunities",
      category: "sales",
      priority: "high",
      impact: "₹8.41Cr potential revenue missed",
      details: {
        description: "Overall conversion rates have declined from 16% to 13% compared to January, representing a 19% drop. 67% of customers who spend over 15 minutes in-store leave without purchasing. This represents ₹8.41Cr in missed revenue opportunities across all brands. The South region leads with 18% conversion while East struggles at only 7%.",
        recommendedActions: [
          "Prioritize East region stores for staff training and customer engagement initiatives",
          "Implement new clienteling approach for customers spending >15 minutes in-store",
          "Deploy high-performers from South region to train staff in struggling regions",
          "Review merchandising and store layouts in high-footfall, low-conversion locations"
        ]
      }
    },
    {
      id: 2,
      title: "Regional Performance Imbalance",
      summary: "South outperforming (18% conversion) while East struggling (7% conversion)",
      category: "sales",
      priority: "medium",
      impact: "43% conversion rate variance",
      details: {
        description: "Dramatic regional variance in performance with South region showing strong 18% conversion rates while East region underperforms at only 7% - a 43% efficiency gap. 5 of 6 East region stores have conversion rates below 11%. In the West region, 12 of 32 stores have conversion rates below 11%.",
        recommendedActions: [
          "Conduct detailed audit of South region success factors to replicate in East",
          "Deploy targeted marketing to increase East region footfall (currently lowest at 6,947)",
          "Implement express inventory reallocation from East to South to optimize stock levels",
          "Launch regional manager intervention program for East region stores"
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
        description: "Based on current receivables aging, scheduled payments, and sales projections, our cash flow model predicts that end-of-June cash balance will fall approximately ₹1.2Cr below our established minimum operating threshold. OPEX is running at 97% of AOP, creating additional pressure.",
        recommendedActions: [
          "Offer 1.5% early payment discounts to key wholesale accounts",
          "Negotiate 15-day extensions with our 3 largest suppliers",
          "Optimize consignment terms with mall locations",
          "Implement ₹8-10 Cr OPEX reduction over next 6 months via store cost optimization"
        ]
      }
    },
    {
      id: 4,
      title: "High-Potential Conversion Stores Identified",
      summary: "Several stores show high potential but suffer from low footfall",
      category: "sales",
      priority: "medium",
      impact: "Potential 30-40% revenue increase",
      details: {
        description: "Several stores show excellent conversion rates but suffer from low footfall, representing untapped potential. These include AND Connaught Place (42% conversion), Global Desi Linking Road (73% conversion), Banjara Hills Hyderabad (58% conversion), and GD Jayanagar (48% conversion).",
        recommendedActions: [
          "Launch targeted local marketing for high-conversion, low-footfall stores",
          "Implement cross-location customer referral program",
          "Develop store-specific product assortments based on high-converting SKUs",
          "Increase inventory allocation to high-conversion stores to capitalize on efficiency"
        ]
      }
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: "Conversion Rate Optimization Program",
      summary: "Address 67% missed opportunities representing ₹8.41Cr potential revenue",
      category: "sales",
      impact: "Estimated ₹2.1Cr immediate revenue impact",
      confidence: 92,
      details: {
        situation: "Our current 13% conversion rate (down 19% from January) represents a significant opportunity, with 67% of engaged customers (spending >15 mins in store) leaving without purchasing.",
        analysis: "Cross-referencing footfall data with conversion rates reveals specific stores and regions with the biggest opportunity gaps. The East region's 7% conversion rate versus South's 18% highlights operational inconsistencies.",
        opportunity: "Implementing targeted conversion improvement tactics could recapture 25% of missed opportunities, generating ₹2.1Cr in immediate revenue while improving long-term customer relationships.",
        recommendation: "Launch a three-tier approach: 1) Staff engagement training focused on East region stores, 2) Implementation of guided shopping experience for customers spending >10 minutes in-store, 3) Best practice sharing from high-conversion stores (Connaught Place 42%, Linking Road 73%).",
        considerations: "This requires minimal investment (primarily staff training and incentive restructuring) with potentially significant returns. Focus on high-footfall, low-conversion stores like Inorbit Malad (5659 visitors, 4% conversion) and Lulu Cochin (1838 visitors, 11% conversion).",
        brainstormQuestions: [
          "Could we implement a rapid clienteling app for staff to better engage customers spending >15 minutes in store?",
          "How might we create tiered incentives for staff based on conversion rate improvements?",
          "Could we test a 'personal shopper' concept in our highest footfall, lowest conversion locations?"
        ]
      }
    },
    {
      id: 2,
      title: "Dynamic Inventory Redistribution",
      summary: "Reallocate inventory based on conversion rate and footfall patterns",
      category: "inventory",
      impact: "Projected ₹5-7Cr cost savings",
      confidence: 87,
      details: {
        situation: "Our inventory is not optimally distributed relative to store performance, with high-converting stores sometimes understocked while low-converting stores maintain excess inventory.",
        analysis: "By cross-analyzing inventory levels, conversion rates, and footfall data, we can identify mismatches between stock allocation and store performance. For example, Global Desi Linking Road has 73% conversion but low footfall, suggesting potential understocking issues.",
        opportunity: "Strategic redistribution of inventory could simultaneously boost sales at high-converting locations while reducing holding costs at underperforming stores.",
        recommendation: "Implement a weekly inventory reallocation system based on conversion rate and footfall metrics. Prioritize inventory for stores in the high-conversion quadrant and reduce stock levels in low-footfall, low-conversion locations.",
        considerations: "This approach primarily involves transportation costs for inventory movement, with minimal disruption to current operations. Expected savings of ₹5-7Cr through reduced holding costs and improved sell-through rates.",
        brainstormQuestions: [
          "Could we create a predictive model that forecasts optimal inventory levels based on both footfall and conversion trends?",
          "What if we implemented a 'sister store' system where high and low performing stores are paired for regular inventory exchanges?",
          "How might we involve store managers in the inventory optimization process to improve buy-in?"
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
    },
    {
      id: 4,
      title: "Regional Performance Equalization",
      summary: "Apply South region best practices to improve East region performance",
      category: "operations",
      impact: "Potential 11% overall conversion improvement",
      confidence: 85,
      details: {
        situation: "Dramatic regional performance variance with South region at 18% conversion versus East at only 7% - a 157% performance gap.",
        analysis: "The South region's success appears driven by superior customer engagement, merchandising strategies, and staff training. The East region has adequate footfall (16% growth vs previous week) but fails to convert effectively.",
        opportunity: "Applying South region best practices to East region operations could potentially improve overall company conversion rates by 11%, addressing a significant portion of our revenue challenges.",
        recommendation: "Deploy a dedicated task force led by top South region managers to audit, train and transform East region operations. Focus on staff training, store layout optimization, and customer engagement techniques.",
        considerations: "This approach requires temporary reallocation of top talent and management attention, but represents a high-impact opportunity with minimal investment requirements.",
        brainstormQuestions: [
          "Could we create a formalized 'region mentorship' program pairing high and low performing regions?",
          "What if we implemented a temporary staff exchange program between South and East regions?",
          "How might we better document and systematize the successful practices from South region stores?"
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

  const footfallMetrics = {
    overall: { count: 93541, change: -12, conversion: 13, conversionChange: -19 },
    byBrand: [
      { name: 'AND', count: 53684, change: -15, conversion: 12, conversionChange: -20 },
      { name: 'Global Desi', count: 19723, change: -2, conversion: 14, conversionChange: -7 },
      { name: 'Combined Stores', count: 18951, change: -17, conversion: 15, conversionChange: -25 }
    ],
    byRegion: [
      { name: 'North', count: 23472, change: -9, conversion: 13, conversionChange: -4 },
      { name: 'South', count: 18552, change: 27, conversion: 18, conversionChange: 4 },
      { name: 'West', count: 44570, change: -12, conversion: 11, conversionChange: -9 },
      { name: 'East', count: 6947, change: 16, conversion: 7, conversionChange: -12 }
    ],
    topPerforming: [
      { store: 'Global Desi Linking Road', footfall: 181, conversion: 73 },
      { store: 'AND Paschim Vihar Delhi', footfall: 279, conversion: 66 },
      { store: 'Banjara Hill Hyderabad', footfall: 211, conversion: 58 },
      { store: 'Global Desi Jayanagar', footfall: 240, conversion: 48 },
      { store: 'AND Connaught Place', footfall: 643, conversion: 42 }
    ],
    underPerforming: [
      { store: 'AND Inorbit Malad New', footfall: 5659, conversion: 4 },
      { store: 'Global Desi Phoenix Bangalore', footfall: 1809, conversion: 6 },
      { store: 'And, And Girl Phoenix - Indore', footfall: 1381, conversion: 6 },
      { store: 'Global Desi Ambience Mall Gurgaon', footfall: 2212, conversion: 7 },
      { store: 'AND & Global Desi Select city walk', footfall: 2027, conversion: 7 }
    ]
  };

  const salesPerformanceData = {
    overall: { target: '38%', yoy: '-21%', apr: '₹2,900+', gd: '₹2,400+' },
    regional: [
      { region: 'North', target: '45%', yoy: '-22%', footfallRecovery: '-30%' },
      { region: 'West', target: '34%', yoy: '-26%', footfallRecovery: '-37%' },
      { region: 'South', target: '42%', yoy: '-18%', footfallRecovery: '-19%' },
      { region: 'East', target: '38%', yoy: '-10%', footfallRecovery: '-25%' }
    ],
    brandPerformance: [
      { brand: 'AND', salesTarget: '39%', salesYoY: '-14%', unitsYoY: '-14%', asp: '+8%' },
      { brand: 'Global Desi', salesTarget: '36%', salesYoY: '-28%', unitsYoY: '-28%', asp: '+13%' }
    ],
    storePerformance: [
      { store: 'Delhi Select', target: '117%', yoy: '+17%' },
      { store: 'Anand', target: '111%', yoy: '+143%' },
      { store: 'Zion Retails Rajkot', target: '134%', yoy: '+20%' },
      { store: 'Vadodara Inorbit', target: '21%', yoy: '-50%' },
      { store: 'Pralhad Nagar, Ahmedabad', target: '57%', yoy: '-74%' }
    ]
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">House of Anita Dongre</h1>
              <p className="text-gray-600">AI Business Analyst</p>
            </div>
            <div className="flex space-x-1">
              <div className="px-4 py-2 bg-red-100 text-red-800 rounded-lg flex items-center">
                <TrendingDown className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Sales -21%</span>
              </div>
              <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg flex items-center">
                <ShoppingBag className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Conv 13%</span>
              </div>
              <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Cash -₹1.2Cr</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button 
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'footfall' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('footfall')}
            >
              Footfall Analytics
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'sales' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('sales')}
            >
              Sales Performance
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'insights' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('insights')}
            >
              Critical Insights
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'recommendations' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('recommendations')}
            >
              Recommendations
            </button>
          </div>
        </div>

        {/* Morning Briefing Section */}
        {activeTab === 'overview' && (
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
                  <span><strong>Conversion Crisis:</strong> Overall conversion rate has dropped 19% to 13% (vs 16% in January)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 font-bold mr-2">•</span>
                  <span><strong>Missed Opportunities:</strong> 67% of engaged customers leave without buying (₹8.41Cr potential loss)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 font-bold mr-2">•</span>
                  <span><strong>Regional Imbalance:</strong> South region (18% conv.) significantly outperforming East (7% conv.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">•</span>
                  <span><strong>High-Converters Identified:</strong> AND Connaught Place (42%), Global Desi Linking Road (73%)</span>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-gray-100 pt-4">
              <div className="flex space-x-2">
                <button 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-lg px-4 py-2 flex items-center"
                  onClick={() => setMessageInput("Tell me more about the conversion rate drop")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask about conversion drop
                </button>
                <button 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-lg px-4 py-2 flex items-center"
                  onClick={() => setMessageInput("What actions should we take immediately?")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask about recommended actions
                </button>
                <button 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded-lg px-4 py-2 flex items-center"
                  onClick={() => setMessageInput("Why is the South region performing so well?")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask about South region success
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footfall Analytics Section */}
        {activeTab === 'footfall' && (
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-medium">Footfall & Conversion Overview</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Total Footfall</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold">{footfallMetrics.overall.count.toLocaleString()}</p>
                    <div className={`flex items-center text-xs ${footfallMetrics.overall.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {footfallMetrics.overall.change < 0 ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                      <span>{footfallMetrics.overall.change}% vs Jan</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Conversion Rate</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold">{footfallMetrics.overall.conversion}%</p>
                    <div className={`flex items-center text-xs ${footfallMetrics.overall.conversionChange < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {footfallMetrics.overall.conversionChange < 0 ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                      <span>{footfallMetrics.overall.conversionChange}% vs Jan</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Missed Opportunities</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold">67%</p>
                    <div className="text-xs text-gray-500">
                      <span>15+ mins, no purchase</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Potential Revenue Loss</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold">₹8.41Cr</p>
                    <div className="text-xs text-gray-500">
                      <span>From missed conversions</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Regional Conversion Performance</h3>
                <p className="text-xs text-gray-500">February 2025</p>
              </div>
              
              <div className="flex flex-col space-y-2 mb-6">
                {footfallMetrics.byRegion.map(region => (
                  <div key={region.name} className="relative pt-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                        <span className="text-xs font-medium">{region.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs font-semibold">{region.conversion}%</span>
                        <div className={`ml-2 text-xs ${region.conversionChange < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {region.conversionChange < 0 ? <TrendingDown className="w-3 h-3 inline mr-1" /> : <TrendingUp className="w-3 h-3 inline mr-1" />}
                          {region.conversionChange}%
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-200">
                      <div style={{ width: `${region.conversion * 5}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        region.name === 'South' ? 'bg-green-500' : 
                        region.name === 'East' ? 'bg-red-500' : 
                        'bg-blue-500'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Conversion Stores</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-2 text-left font-medium text-gray-500">Store</th>
                          <th className="px-3 py-2 text-right font-medium text-gray-500">Footfall</th>
                          <th className="px-3 py-2 text-right font-medium text-gray-500">Conversion</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {footfallMetrics.topPerforming.map((store, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-3 py-2 font-medium">{store.store}</td>
                            <td className="px-3 py-2 text-right">{store.footfall}</td>
                            <td className="px-3 py-2 text-right font-medium text-green-600">{store.conversion}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Low Conversion Stores</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-2 text-left font-medium text-gray-500">Store</th>
                          <th className="px-3 py-2 text-right font-medium text-gray-500">Footfall</th>
                          <th className="px-3 py-2 text-right font-medium text-gray-500">Conversion</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {footfallMetrics.underPerforming.map((store, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-3 py-2 font-medium">{store.store}</td>
                            <td className="px-3 py-2 text-right">{store.footfall}</td>
                            <td className="px-3 py-2 text-right font-medium text-red-600">{store.conversion}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center mb-4">
                <Brain className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-lg font-medium">AI Footfall Insights</h2>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <h3 className="text-sm font-semibold text-purple-800 mb-2">What I'm seeing in the data</h3>
                <ul className="space-y-2 text-sm text-purple-800">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-purple-600" />
                    <span>The 19% conversion rate drop has a stronger impact on revenue than the 12% footfall decline</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-purple-600" />
                    <span>AND stores show greater customer acquisition problems (-15% footfall) while Global Desi faces more closing challenges (-7% conversion)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-purple-600" />
                    <span>High footfall but low conversion in stores like Inorbit Malad (5659 visits, 4% conv) suggests merchandising or engagement issues</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-purple-600" />
                    <span>Store location type matters: mall stores average 9.7% conversion vs. 23.8% for high-street locations</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Immediate Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="text-xs font-semibold text-blue-800 mb-1">High-Priority Stores</h4>
                    <p className="text-xs text-blue-800">Deploy conversion specialists to high-footfall, low-conversion stores (Inorbit Malad, Phoenix Bangalore) to identify and address specific barriers to purchase</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="text-xs font-semibold text-green-800 mb-1">Staff Training</h4>
                    <p className="text-xs text-green-800">Implement South region's customer engagement practices across East region stores, focusing on minimizing the 67% missed opportunity rate</p>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="text-xs font-semibold text-amber-800 mb-1">Clienteling Program</h4>
                    <p className="text-xs text-amber-800">Launch guided shopping experience for customers who have spent 10 minutes in-store to improve engagement and likelihood of purchase</p>
                  </div>
                  
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <h4 className="text-xs font-semibold text-indigo-800 mb-1">Cross-Location Learning</h4>
                    <p className="text-xs text-indigo-800">Document success factors from high-conversion stores like Connaught Place (42%) and Linking Road (73%) to create best practice playbooks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Sales Performance Section */}
        {activeTab === 'sales' && (
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-lg font-medium">Sales Performance Overview</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Sales vs Target</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold">{salesPerformanceData.overall.target}</p>
                    <div className="text-xs text-red-500">
                      <span>Against monthly plan</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">YoY Sales Growth</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold text-red-600">{salesPerformanceData.overall.yoy}</p>
                    <div className="text-xs text-gray-500">
                      <span>March YTD</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">AND ASP</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold">{salesPerformanceData.overall.apr}</p>
                    <div className="text-xs text-green-500">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      <span>+8% YoY</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Global Desi ASP</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold">{salesPerformanceData.overall.gd}</p>
                    <div className="text-xs text-green-500">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      <span>+13% YoY</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Brand Performance Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-2 text-left font-medium text-gray-500">Brand</th>
                        <th className="px-3 py-2 text-center font-medium text-gray-500">Sales Target Achievement</th>
                        <th className="px-3 py-2 text-center font-medium text-gray-500">Sales YoY</th>
                        <th className="px-3 py-2 text-center font-medium text-gray-500">Units YoY</th>
                        <th className="px-3 py-2 text-center font-medium text-gray-500">ASP Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {salesPerformanceData.brandPerformance.map((brand, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium">{brand.brand}</td>
                          <td className="px-3 py-2 text-center">{brand.salesTarget}</td>
                          <td className="px-3 py-2 text-center text-red-600">{brand.salesYoY}</td>
                          <td className="px-3 py-2 text-center text-red-600">{brand.unitsYoY}</td>
                          <td className="px-3 py-2 text-center text-green-600">{brand.asp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Regional Performance</h3>
                  <div className="space-y-3">
                    {salesPerformanceData.regional.map((region, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                            <span className="text-xs font-medium">{region.region}</span>
                          </div>
                          <div className="text-xs text-gray-500">Target: {region.target}</div>
                        </div>
                        <div className="flex space-x-4">
                          <div>
                            <p className="text-xs text-gray-500">YoY Growth</p>
                            <p className="text-xs font-medium text-red-600">{region.yoy}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Footfall Recovery</p>
                            <p className="text-xs font-medium text-red-600">{region.footfallRecovery}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Top & Bottom Stores</h3>
                  <div className="space-y-2">
                    {salesPerformanceData.storePerformance.map((store, idx) => (
                      <div key={idx} className={`p-3 rounded-lg ${
                        idx < 3 ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium">{store.store}</span>
                          <div className="flex items-center space-x-3">
                            <div className={`text-xs ${idx < 3 ? 'text-green-600' : 'text-red-600'}`}>
                              {idx < 3 && <TrendingUp className="w-3 h-3 inline mr-1" />}
                              {idx >= 3 && <TrendingDown className="w-3 h-3 inline mr-1" />}
                              {store.yoy}
                            </div>
                            <div className="text-xs font-medium">
                              {store.target} of Target
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center mb-4">
                <Brain className="w-5 h-5 text-purple-600 mr-2" />
                <h2 className="text-lg font-medium">AI Sales Insights</h2>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <h3 className="text-sm font-semibold text-purple-800 mb-2">Integrated Analysis</h3>
                <ul className="space-y-2 text-sm text-purple-800">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-purple-600" />
                    <span>Your sales decline (-21% YTD) is driven by both footfall (-12%) and conversion (-19%) issues, creating a compounding effect</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-purple-600" />
                    <span>The ASP increases (+8% AND, +13% GD) suggest your price strategy is working, but volume declines are overwhelming this positive impact</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-purple-600" />
                    <span>Regional disparities in both footfall and conversion indicate operational inconsistencies rather than market-wide challenges</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 mr-2 mt-0.5 text-purple-600" />
                    <span>The strongest performing stores (Delhi Select +17%, Anand +143%) demonstrate that growth is possible despite market conditions</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Strategic Revenue Opportunities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="text-xs font-semibold text-blue-800 mb-1">Sales-Footfall Disconnect</h4>
                    <p className="text-xs text-blue-800">Address the 67% missed conversion opportunity, representing ₹8.41Cr in potential revenue - priority focus should be high-footfall, low-conversion stores</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="text-xs font-semibold text-green-800 mb-1">ASP Optimization</h4>
                    <p className="text-xs text-green-800">Maintain the positive ASP growth but balance with targeted promotions to recover volume, especially for Global Desi (-28% units despite +13% ASP)</p>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <h4 className="text-xs font-semibold text-amber-800 mb-1">Regional Rebalancing</h4>
                    <p className="text-xs text-amber-800">Deploy South region's successful practices to East and West regions, focusing on conversion techniques and customer engagement strategies</p>
                  </div>
                  
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <h4 className="text-xs font-semibold text-indigo-800 mb-1">High-Performer Scaling</h4>
                    <p className="text-xs text-indigo-800">Identify why Delhi Select, Anand, and Rajkot stores are succeeding despite market challenges, and systematically replicate these success factors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insights Section */}
        {activeTab === 'insights' && (
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
        )}

        {/* Recommendations Section */}
        {activeTab === 'recommendations' && (
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
                      rec.category === 'operations' ? 'bg-amber-100' :
                      'bg-purple-100'
                    }`}>
                      {rec.category === 'inventory' ? (
                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                      ) : rec.category === 'sales' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : rec.category === 'operations' ? (
                        <Store className="w-5 h-5 text-amber-600" />
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
                          Brainstorming Questions</h4>
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
        )}

        {/* Chat Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center mb-4">
            <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-medium">Chat with your AI Analyst</h2>
          </div>
          
          <div className="h-64 overflow-y-auto mb-4 border border-gray-100 rounded-lg p-4 bg-gray-50">
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
      </div>
    </div>
  );
};

export default AnitaDongreAI;
"use client"
import React, { useState, useEffect } from 'react';
import { Building, TrendingUp, Users, DollarSign, MapPin, Award, BarChart3, PieChart, Search, ChevronRight, Hotel, Coffee, Bed, Home } from 'lucide-react';

// Knowledge Graph Component
const KnowledgeGraph = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    {
      id: 'fact',
      label: 'Fact Table',
      x: 400,
      y: 300,
      color: '#ef4444',
      description: '4,080 transaction records',
      details: [
        'Combines all dimensions',
        'Revenue in INR Crores',
        'Costs in INR Crores',
        'Room Nights sold',
        'Granular transaction-level data'
      ]
    },
    {
      id: 'property',
      label: 'Property',
      x: 150,
      y: 100,
      color: '#3b82f6',
      description: '8 luxury hotels',
      details: [
        'ITC Grand Chola (Chennai) - 600 rooms',
        'ITC Maurya (Delhi) - 437 rooms',
        'ITC Rajputana (Jaipur) - 216 rooms',
        'ITC Gardenia (Bangalore) - 270 rooms',
        'ITC Sonar (Kolkata) - 238 rooms',
        'ITC Maratha (Mumbai) - 368 rooms',
        'ITC Windsor (Bangalore) - 247 rooms',
        'ITC Kakatiya (Hyderabad) - 185 rooms'
      ]
    },
    {
      id: 'calendar',
      label: 'Time',
      x: 150,
      y: 500,
      color: '#10b981',
      description: '30 months of data',
      details: [
        'FY2023: Apr 2022 - Mar 2023',
        'FY2024: Apr 2023 - Mar 2024',
        'FY2025: Apr 2024 - Sep 2024',
        'Quarterly breakdowns',
        'Monthly granularity'
      ]
    },
    {
      id: 'msr',
      label: 'Measure',
      x: 650,
      y: 100,
      color: '#8b5cf6',
      description: '13 key metrics',
      details: [
        'Revenue metrics (3)',
        'Operations metrics (4)',
        'Cost metrics (6)',
        'Profitability calculated',
        'Performance indicators'
      ]
    },
    {
      id: 'segment',
      label: 'Segment',
      x: 400,
      y: 500,
      color: '#f59e0b',
      description: '3 customer segments',
      details: [
        'Retail (Transient) - 65.2%',
        'Contracted (Group) - 34.8%',
        'Corporate (Business)'
      ]
    },
    {
      id: 'source',
      label: 'Source',
      x: 650,
      y: 500,
      color: '#ec4899',
      description: '6 booking channels',
      details: [
        'Direct Website (0% commission)',
        'OTA (15% commission)',
        'GDS (12% commission)',
        'Walk-in (0% commission)',
        'Corporate Direct (0% commission)',
        'Travel Agent (10% commission)'
      ]
    },
    {
      id: 'gl',
      label: 'GL Accounts',
      x: 400,
      y: 100,
      color: '#06b6d4',
      description: '50 general ledger codes',
      details: [
        'Detailed revenue breakdown',
        'Room types: Standard, Deluxe, Suite',
        'F&B: Restaurant, Bar, Banquet',
        'Room Service categories',
        'Cost categories and subcategories'
      ]
    }
  ];

  const edges = [
    { from: 'property', to: 'fact', label: 'property_id' },
    { from: 'calendar', to: 'fact', label: 'date_id' },
    { from: 'msr', to: 'fact', label: 'msr_id' },
    { from: 'segment', to: 'fact', label: 'segment_id' },
    { from: 'source', to: 'fact', label: 'source_id' },
    { from: 'gl', to: 'msr', label: 'linked' }
  ];

  useEffect(() => {
    setSelectedNode(nodes[0]);
  }, []);

  const getNode = (id) => nodes.find(n => n.id === id);

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white rounded-xl p-6">
      <svg viewBox="0 0 800 600" className="w-full" style={{ minHeight: '500px' }}>
        <g>
          {edges.map((edge, idx) => {
            const fromNode = getNode(edge.from);
            const toNode = getNode(edge.to);
            return (
              <g key={idx}>
                <line
                  x1={fromNode.x} y1={fromNode.y}
                  x2={toNode.x} y2={toNode.y}
                  stroke="#94a3b8" strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 5}
                  fill="#64748b" fontSize="11"
                  textAnchor="middle" fontFamily="monospace"
                >
                  {edge.label}
                </text>
              </g>
            );
          })}
        </g>

        <g>
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <g key={node.id} onClick={() => setSelectedNode(node)} style={{ cursor: 'pointer' }}>
                {isSelected && (
                  <circle cx={node.x} cy={node.y} r="55" fill={node.color} opacity="0.2">
                    <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={node.x} cy={node.y} r="45"
                  fill={node.color}
                  stroke={isSelected ? '#1e293b' : '#ffffff'}
                  strokeWidth={isSelected ? '5' : '3'}
                  opacity="0.9"
                />
                <text
                  x={node.x} y={node.y + 65}
                  fill="#1e293b" fontSize="13"
                  fontWeight="bold" textAnchor="middle"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {selectedNode && (
        <div className="mt-6 bg-white rounded-xl border-2 border-gray-200 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: `${selectedNode.color}40` }}>
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: selectedNode.color }}></div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedNode.label}</h3>
              <p className="text-gray-600">{selectedNode.description}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-600 mb-3">Key Details:</h4>
            <ul className="space-y-2">
              {selectedNode.details.map((detail, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6 bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Data Model Components</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nodes.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: node.color }} />
              <span className="text-sm text-gray-700">{node.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Hotel data
const hotelData = [
  { property_id: 1, property_name: "ITC Grand Chola", city: "Chennai", region: "South", total_rooms: 600, star_rating: 5, opening_year: 2011, revpar: 13697 },
  { property_id: 2, property_name: "ITC Maurya", city: "Delhi", region: "North", total_rooms: 437, star_rating: 5, opening_year: 1978, revpar: 15501 },
  { property_id: 3, property_name: "ITC Rajputana", city: "Jaipur", region: "North", total_rooms: 216, star_rating: 5, opening_year: 2000, revpar: 10234 },
  { property_id: 4, property_name: "ITC Gardenia", city: "Bangalore", region: "South", total_rooms: 270, star_rating: 5, opening_year: 2002, revpar: 9890 },
  { property_id: 5, property_name: "ITC Sonar", city: "Kolkata", region: "East", total_rooms: 238, star_rating: 5, opening_year: 2002, revpar: 11244 },
  { property_id: 6, property_name: "ITC Maratha", city: "Mumbai", region: "West", total_rooms: 368, star_rating: 5, opening_year: 1974, revpar: 14225 },
  { property_id: 7, property_name: "ITC Windsor", city: "Bangalore", region: "South", total_rooms: 247, star_rating: 5, opening_year: 2001, revpar: 11498 },
  { property_id: 8, property_name: "ITC Kakatiya", city: "Hyderabad", region: "South", total_rooms: 185, star_rating: 5, opening_year: 1982, revpar: 10765 },
];

// Q&A data
const qaData = [
  {
    category: "Property Performance & Operations",
    questions: [
      {
        q: "What is the occupancy rate analysis by region?",
        a: "West Region: Strong demand with ITC Maratha leading. North Region: ITC Maurya showing excellent performance with high utilization. South Region: Multiple properties with ITC Grand Chola showing strong numbers. East Region: ITC Sonar maintaining healthy occupancy."
      },
      {
        q: "What is the RevPAR performance across properties?",
        a: "ITC Maurya (Delhi): ₹15,501 - Highest RevPAR, reflecting premium positioning. ITC Maratha (Mumbai): ₹14,225 - Strong metropolitan market performance. ITC Grand Chola (Chennai): ₹13,697 - Largest property with solid RevPAR. Mid-tier properties: ₹9,890-₹11,498 range."
      },
      {
        q: "How is the total room inventory distributed?",
        a: "Total portfolio: 1,643 rooms across 8 properties. South Region: 600 rooms (36.5%) - Largest presence. North Region: 437 rooms (26.6%). West Region: 368 rooms (22.4%). East Region: 238 rooms (14.5%) - Opportunity for expansion."
      }
    ]
  },
  {
    category: "Revenue Analysis",
    questions: [
      {
        q: "What is the breakdown of revenue sources?",
        a: "Total Revenue: ₹3,514.33 Crores. Room Revenue: ₹2,958.17 Cr (84.17%) - Primary revenue driver. F&B Revenue: ₹446.78 Cr (12.71%) - Significant contribution. Other Revenue: ₹109.38 Cr (3.11%) - Ancillary services."
      },
      {
        q: "What are the revenue growth trends?",
        a: "FY2023: ₹1,260.75 Cr (baseline year). FY2024: ₹1,436.94 Cr (+14.0% YoY growth) - Strong recovery. FY2025: ₹816.64 Cr (partial year data - Q1 & Q2 only). Quarterly patterns show Q1 as strongest quarter (₹441-468 Cr range), followed by Q4."
      },
      {
        q: "What is the average revenue per room night?",
        a: "Contracted Segment: ₹9,006 per room night - Premium rates. Retail Segment: ₹8,944 per room night - Competitive rates."
      }
    ]
  },
  {
    category: "Customer Segmentation",
    questions: [
      {
        q: "How are room nights distributed across segments?",
        a: "Total Room Nights Analyzed: 1,649,796. Retail Segment: 1,075,034 room nights (65.2%) - Majority contributor. Contracted Segment: 574,762 room nights (34.8%) - Stable base."
      },
      {
        q: "What are the booking patterns by segment?",
        a: "Retail (Transient): Q1 highest (353K), Q3 lowest (186K) - 47% seasonal variation. Contracted (Group): Q1 highest (198K), Q3 lowest (93K) - 53% seasonal variation."
      }
    ]
  },
  {
    category: "Profitability & Cost Management",
    questions: [
      {
        q: "What is the GOP margin by property?",
        a: "Portfolio-wide GOP margin: 17.1% average. Top Performers: ITC Kakatiya (17.46%), ITC Maurya (17.30%), ITC Maratha (17.26%). Solid Mid-Range: ITC Grand Chola, Windsor, Sonar, Rajputana (17.16-17.21%). Opportunity Area: ITC Gardenia (16.70%)."
      },
      {
        q: "What are the EBITDA trends?",
        a: "FY2023: ₹211.63 Cr. FY2024: ₹237.56 Cr (+12.3% YoY) - Strong growth. FY2025: ₹139.12 Cr (H1 only, tracking ahead of prior year). Quarterly pattern: Q1 strongest (₹68-81 Cr), Q3 weakest (₹39-44 Cr)."
      },
      {
        q: "What is the cost structure breakdown?",
        a: "Total Costs: ₹1,430.95 Crores. Staff Costs: ₹559.60 Cr (39.1%) - Largest expense. Variable Costs: ₹351.71 Cr (24.6%). Fixed Costs: ₹203.39 Cr (14.2%). Utilities: ₹132.27 Cr (9.2%). Marketing: ₹102.59 Cr (7.2%). Maintenance: ₹81.39 Cr (5.7%)."
      }
    ]
  },
  {
    category: "Why Analysis",
    questions: [
      {
        q: "Why does ITC Grand Chola generate the highest room revenue?",
        a: "ITC Grand Chola generates the highest room revenue at ₹750.31 Crores due to three key factors: Factor 1 - Highest Room Night Sales Volume: Sold 783,340 room nights, 28.6% more than ITC Maurya (second highest) and 3.5x more than ITC Kakatiya. Factor 2 - Largest Room Inventory: Has 600 rooms, 37.3% more than ITC Maurya and 3.2x more than ITC Kakatiya. Factor 3 - Competitive ADR: While its ADR of ₹9,578 is 5.6% lower than ITC Maurya's ₹10,151, it's still 27% higher than the lowest ADR property. Conclusion: ITC Grand Chola's volume advantage (28.6% more room nights) exceeds its rate disadvantage (5.6% lower ADR) compared to ITC Maurya. Revenue = Volume × Rate: 783,340 × ₹9,578 = ₹750.31 Cr."
      },
      {
        q: "Why does Q1 revenue exceed other quarters?",
        a: "Q1 has the highest revenue at ₹1,305.84 Crores due to simultaneous peaks in both volume and rate. Factor 1 - Highest Room Nights Sold: Q1 sold 1,104,014 room nights, 97.8% more than Q3 (lowest quarter) and 14.2% more than Q2. Factor 2 - Highest Revenue per Room Night: Q1 achieves ₹11,828 per room night, 33.2% higher than Q3 and 15.9% higher than Q2. Factor 3 - Both Segments Peak in Q1: Contracted segment has 198,180 room nights (113.4% higher than Q3), Retail segment has 353,791 room nights (90.1% higher than Q3). Calculation: Q1 revenue is 163.5% higher than Q3. This combines a volume effect (+97.8%) and rate effect (+33.2%) that multiply together: (1.978 × 1.332 - 1) = 163.5%. Conclusion: Q1 exceeds other quarters because both volume and rate are simultaneously at their highest levels, creating a multiplicative effect."
      }
    ]
  }
];

// Main Dashboard Component
const ITCHotelsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showKnowledgeGraph, setShowKnowledgeGraph] = useState(false);
  const [thinkingQuestion, setThinkingQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(null);

  const totalRooms = hotelData.reduce((sum, hotel) => sum + hotel.total_rooms, 0);
  const avgRevPAR = Math.round(hotelData.reduce((sum, hotel) => sum + hotel.revpar, 0) / hotelData.length);
  const totalRevenue = 3514.33;
  const totalProperties = hotelData.length;

  const regionColors = {
    'North': 'bg-blue-500',
    'South': 'bg-green-500',
    'East': 'bg-orange-500',
    'West': 'bg-purple-500'
  };

  const handleQuestionClick = (questionId) => {
    if (selectedQuestion === questionId && showAnswer === questionId) {
      setSelectedQuestion(null);
      setShowAnswer(null);
      setThinkingQuestion(null);
    } else {
      setSelectedQuestion(questionId);
      setThinkingQuestion(questionId);
      setShowAnswer(null);
      
      setTimeout(() => {
        setThinkingQuestion(null);
        setShowAnswer(questionId);
      }, 5000);
    }
  };

  const filteredQA = qaData.map(category => ({
    ...category,
    questions: category.questions.filter(qa => 
      qa.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qa.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
      
      <header className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl shadow-lg">
                <Hotel className="w-10 h-10 text-amber-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">ITC Hotels</h1>
                <p className="text-amber-100 text-lg">Luxury Hospitality Portfolio Dashboard</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-amber-100">Data Period</p>
              <p className="text-xl font-semibold">FY 2023 - FY 2025</p>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: Home },
              { id: 'properties', label: 'Properties', icon: Building },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'qa', label: 'Q&A Insights', icon: Search }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-amber-700 border-b-4 border-amber-600 bg-amber-50'
                    : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-amber-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-amber-100 p-3 rounded-xl">
                    <Building className="w-6 h-6 text-amber-600" />
                  </div>
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Properties</p>
                <p className="text-3xl font-bold text-gray-900">{totalProperties}</p>
                <p className="text-xs text-gray-500 mt-2">5-Star Luxury Hotels</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Bed className="w-6 h-6 text-blue-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Rooms</p>
                <p className="text-3xl font-bold text-gray-900">{totalRooms.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">Across 4 regions</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">₹{totalRevenue}</p>
                <p className="text-xs text-gray-500 mt-2">Crores (FY23-FY25)</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">Avg RevPAR</p>
                <p className="text-3xl font-bold text-gray-900">₹{avgRevPAR.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">Revenue per available room</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <PieChart className="w-7 h-7 text-amber-600" />
                Revenue Breakdown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Bed className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Room Revenue</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-700">₹2,958.17</p>
                  <p className="text-sm text-gray-600 mt-2">Crores (84.17%)</p>
                  <div className="mt-3 bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '84.17%'}}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Coffee className="w-6 h-6 text-orange-600" />
                    <h3 className="font-semibold text-gray-900">F&B Revenue</h3>
                  </div>
                  <p className="text-3xl font-bold text-orange-700">₹446.78</p>
                  <p className="text-sm text-gray-600 mt-2">Crores (12.71%)</p>
                  <div className="mt-3 bg-orange-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{width: '12.71%'}}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Other Revenue</h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-700">₹109.38</p>
                  <p className="text-sm text-gray-600 mt-2">Crores (3.11%)</p>
                  <div className="mt-3 bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '3.11%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-amber-600" />
                  Data Model Knowledge Graph
                </h2>
                <button
                  onClick={() => setShowKnowledgeGraph(!showKnowledgeGraph)}
                  className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors shadow-md"
                >
                  {showKnowledgeGraph ? 'Hide Graph' : 'View Graph'}
                </button>
              </div>
              
              {showKnowledgeGraph && (
                <div className="mt-6">
                  <KnowledgeGraph />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Luxury Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotelData.map(hotel => (
                  <div key={hotel.property_id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 p-6 hover:shadow-xl hover:border-amber-300 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${regionColors[hotel.region]} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                        {hotel.region}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(hotel.star_rating)].map((_, i) => (
                          <Award key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.property_name}</h3>
                    
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{hotel.city}</span>
                    </div>

                    <div className="space-y-3 border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Rooms</span>
                        <span className="font-semibold text-gray-900">{hotel.total_rooms}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">RevPAR</span>
                        <span className="font-semibold text-green-600">₹{hotel.revpar.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Since</span>
                        <span className="font-semibold text-gray-900">{hotel.opening_year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Regional Distribution</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Rooms by Region</h3>
                  <div className="space-y-4">
                    {['South', 'North', 'West', 'East'].map(region => {
                      const regionHotels = hotelData.filter(h => h.region === region);
                      const regionRooms = regionHotels.reduce((sum, h) => sum + h.total_rooms, 0);
                      const percentage = ((regionRooms / totalRooms) * 100).toFixed(1);
                      
                      return (
                        <div key={region}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-gray-700">{region}</span>
                            <span className="text-sm text-gray-600">{regionRooms} rooms ({percentage}%)</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-3">
                            <div 
                              className={`${regionColors[region]} h-3 rounded-full transition-all duration-500`}
                              style={{width: `${percentage}%`}}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-4">Properties by Region</h3>
                  <div className="space-y-4">
                    {['South', 'North', 'West', 'East'].map(region => {
                      const count = hotelData.filter(h => h.region === region).length;
                      const percentage = ((count / totalProperties) * 100).toFixed(1);
                      
                      return (
                        <div key={region}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-gray-700">{region}</span>
                            <span className="text-sm text-gray-600">{count} properties ({percentage}%)</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-3">
                            <div 
                              className={`${regionColors[region]} h-3 rounded-full transition-all duration-500`}
                              style={{width: `${percentage}%`}}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="font-semibold text-gray-900 mb-2">EBITDA Growth</h3>
                  <p className="text-3xl font-bold text-green-700">+12.3%</p>
                  <p className="text-sm text-gray-600 mt-2">FY2024 YoY</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">GOP Margin</h3>
                  <p className="text-3xl font-bold text-blue-700">17.1%</p>
                  <p className="text-sm text-gray-600 mt-2">Portfolio Average</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Room Nights</h3>
                  <p className="text-3xl font-bold text-orange-700">1.65M</p>
                  <p className="text-sm text-gray-600 mt-2">Total Analyzed</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'qa' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions and insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none text-lg"
                />
              </div>
            </div>

            {filteredQA.map((category, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-amber-600 rounded-full"></div>
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((qa, qIdx) => {
                    const questionId = `${idx}-${qIdx}`;
                    const isThinking = thinkingQuestion === questionId;
                    const shouldShowAnswer = showAnswer === questionId;
                    const isExpanded = selectedQuestion === questionId;
                    
                    return (
                      <div 
                        key={qIdx}
                        className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-amber-300 transition-colors"
                      >
                        <button
                          onClick={() => handleQuestionClick(questionId)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-left text-gray-900">{qa.q}</span>
                          <ChevronRight 
                            className={`w-5 h-5 text-amber-600 transition-transform ${
                              isExpanded ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                        
                        {isThinking && (
                          <div className="px-6 py-8 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-t-2 border-amber-200">
                            <div className="flex flex-col items-center justify-center space-y-4">
                              <div className="relative">
                                <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-orange-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
                              </div>
                              <div className="text-center">
                                <p className="text-lg font-semibold text-amber-700 animate-pulse">Thinking and Evaluating...</p>
                                <p className="text-sm text-gray-600 mt-2">Analyzing data from ITC Hotels dataset</p>
                              </div>
                              <div className="flex gap-2">
                                <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                                <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                                <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {shouldShowAnswer && !isThinking && (
                          <div className="px-6 py-4 bg-amber-50 border-t-2 border-amber-200 animate-fadeIn">
                            <p className="text-gray-700 leading-relaxed">{qa.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredQA.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No questions found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            ITC Hotels Demo Dashboard | Data Period: FY2023 - FY2025 | All information is based on the provided dataset
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ITCHotelsDashboard;

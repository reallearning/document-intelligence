"use client";
import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  DollarSign,
  Target,
  Clock,
  Activity,
  MessageSquare,
  BarChart3,
  Layers,
  Send,
} from "lucide-react";

const LupinSalesTower = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedChannel, setSelectedChannel] = useState("All Channels");
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      text: "Hello! I'm Cortex AI. Ask me anything about your sales performance, inventory, or demand forecasts.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [selectedScenario, setSelectedScenario] = useState("baseline");

  // Top 10 KPIs with RAG Status
  const kpis = [
    {
      name: "Revenue vs Target",
      value: "$925M",
      target: "$950M",
      status: "amber",
      change: "-2.6%",
      icon: DollarSign,
    },
    {
      name: "Fill Rate",
      value: "94%",
      target: "95%",
      status: "amber",
      change: "-1%",
      icon: Target,
    },
    {
      name: "Forecast Accuracy (MAPE)",
      value: "15%",
      target: "<12%",
      status: "amber",
      change: "+3%",
      icon: Activity,
    },
    {
      name: "Inventory Days",
      value: "142 days",
      target: "<130 days",
      status: "amber",
      change: "+12 days",
      icon: Clock,
    },
    {
      name: "Perfect Order Rate",
      value: "88%",
      target: ">90%",
      status: "red",
      change: "-2%",
      icon: Package,
    },
    {
      name: "Stockout Rate",
      value: "4.2%",
      target: "<3%",
      status: "red",
      change: "+1.2%",
      icon: AlertTriangle,
    },
    {
      name: "Working Capital",
      value: "$380M",
      target: "<$340M",
      status: "red",
      change: "+$40M",
      icon: DollarSign,
    },
    {
      name: "Obsolescence Rate",
      value: "1.8%",
      target: "<2%",
      status: "green",
      change: "-0.3%",
      icon: TrendingDown,
    },
    {
      name: "Demand Forecast Bias",
      value: "6%",
      target: "<8%",
      status: "green",
      change: "-2%",
      icon: BarChart3,
    },
    {
      name: "Cross-Site Transfer Time",
      value: "8 days",
      target: "<10 days",
      status: "green",
      change: "-2 days",
      icon: Clock,
    },
  ];

  // Revenue Performance Data
  const revenueData = {
    Inhalation: { current: 285, target: 300, ytd: 820, growth: "-5%" },
    Injectables: { current: 210, target: 200, ytd: 610, growth: "+5%" },
    "Oral Solids": { current: 340, target: 360, ytd: 1020, growth: "-6%" },
    Biosimilars: { current: 90, target: 90, ytd: 270, growth: "0%" },
  };

  // Demand & Inventory Analysis
  const inventoryProducts = [
    {
      name: "Albuterol HFA",
      stock: 850,
      target: 5000,
      days: 12,
      status: "red",
      forecast: "High seasonal demand",
    },
    {
      name: "Metformin ER 500mg",
      stock: 18500,
      target: 12000,
      days: 186,
      status: "red",
      forecast: "Excess inventory",
    },
    {
      name: "Lisinopril 10mg",
      stock: 24800,
      target: 28000,
      days: 78,
      status: "green",
      forecast: "Stable demand",
    },
    {
      name: "Insulin Glargine",
      stock: 3200,
      target: 4000,
      days: 45,
      status: "amber",
      forecast: "Growing demand",
    },
    {
      name: "Atorvastatin 20mg",
      stock: 32000,
      target: 30000,
      days: 95,
      status: "green",
      forecast: "Stable",
    },
  ];

  // AI Recommendations
  const aiRecommendations = [
    {
      priority: "Critical",
      product: "Albuterol HFA Inhaler",
      action: "Urgent Replenishment",
      details: "Order 3,500 units within 3 days. Stockout risk in 10 days.",
      impact: "$280K revenue protection",
      confidence: 94,
    },
    {
      priority: "High",
      product: "Metformin ER 500mg",
      action: "Cross-Site Transfer",
      details: "Transfer 6,000 units from Coral Springs to New Jersey DC.",
      impact: "$42K working capital freed",
      confidence: 87,
    },
    {
      priority: "Medium",
      product: "Lisinopril 10mg",
      action: "Safety Stock Optimization",
      details:
        "Reduce safety stock by 15% based on improved forecast accuracy.",
      impact: "$18K working capital freed",
      confidence: 91,
    },
    {
      priority: "Medium",
      product: "Specialty Portfolio",
      action: "Channel Strategy",
      details:
        "Shift 3 specialty products from direct to hybrid distribution model.",
      impact: "600 bps margin improvement",
      confidence: 78,
    },
  ];

  // Scenario Analysis Data
  const scenarios = {
    baseline: {
      revenue: 925,
      fillRate: 94,
      inventory: 142,
      workingCapital: 380,
    },
    optimistic: {
      revenue: 985,
      fillRate: 97,
      inventory: 128,
      workingCapital: 340,
    },
    conservative: {
      revenue: 890,
      fillRate: 92,
      inventory: 155,
      workingCapital: 410,
    },
    aiOptimized: {
      revenue: 965,
      fillRate: 96,
      inventory: 130,
      workingCapital: 345,
    },
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages([...chatMessages, { type: "user", text: userMessage }]);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "";

      if (
        userMessage.toLowerCase().includes("stockout") ||
        userMessage.toLowerCase().includes("albuterol")
      ) {
        botResponse =
          "Albuterol HFA Inhaler has only 12 days of inventory remaining (850 units vs 5,000 target). The forecast shows 40% seasonal demand increase for respiratory products. I recommend urgent replenishment of 3,500 units within 3 days to prevent $280K revenue loss from stockouts. Confidence: 94%.";
      } else if (
        userMessage.toLowerCase().includes("metformin") ||
        userMessage.toLowerCase().includes("excess")
      ) {
        botResponse =
          "Metformin ER 500mg has 186 days of inventory (154% above target) at Coral Springs DC, while New Jersey DC has only 35 days supply. A cross-site transfer of 6,000 units would optimize the network, free up $42K working capital, and reduce expiry risk by $48K. Transfer cost is only $2,400. Confidence: 87%.";
      } else if (
        userMessage.toLowerCase().includes("fill rate") ||
        userMessage.toLowerCase().includes("service")
      ) {
        botResponse =
          "Current fill rate is 94%, missing our 95% target. Primary drivers: 1) Albuterol stockout risk (respiratory seasonal surge), 2) Perfect order rate at 88% (packaging issues at 2 products), 3) Cross-site transfer delays averaging 8 days. Implementing AI recommendations would improve fill rate to 96%.";
      } else if (
        userMessage.toLowerCase().includes("working capital") ||
        userMessage.toLowerCase().includes("inventory")
      ) {
        botResponse =
          "Working capital tied up: $380M vs $340M target (+$40M). Key issues: 1) Excess Metformin inventory ($42K), 2) Lisinopril safety stock can be reduced ($18K), 3) 8 slow-moving products with 180+ days inventory. Implementing multi-echelon optimization would reduce inventory days from 142 to 130, freeing ~$80M working capital.";
      } else if (
        userMessage.toLowerCase().includes("forecast") ||
        userMessage.toLowerCase().includes("accuracy")
      ) {
        botResponse =
          "Current forecast accuracy (MAPE): 15% vs target <12%. Top factors impacting accuracy: 1) Tender timing uncertainty (+5% error), 2) Channel mix shifts (+3% error), 3) New product launches (50% variance in Year 1). The AI forecasting model has reduced bias from 12% to 6%, and we project reaching 12% MAPE within 2 quarters.";
      } else {
        botResponse =
          'I can help you understand sales performance, inventory positions, demand forecasts, and optimization opportunities. Try asking about specific products, KPIs, or recommendations. For example: "Why is Albuterol at stockout risk?" or "How can we improve fill rate?"';
      }

      setChatMessages((prev) => [...prev, { type: "bot", text: botResponse }]);
    }, 800);

    setChatInput("");
  };

  const getStatusColor = (status) => {
    return status === "green"
      ? "bg-green-100 border-green-500 text-green-800"
      : status === "amber"
      ? "bg-amber-100 border-amber-500 text-amber-800"
      : "bg-red-100 border-red-500 text-red-800";
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg"
            >
              <option>All Categories</option>
              <option>Inhalation</option>
              <option>Injectables</option>
              <option>Oral Solids</option>
              <option>Biosimilars</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg"
            >
              <option>All Regions</option>
              <option>US Northeast</option>
              <option>US South</option>
              <option>US West</option>
              <option>India</option>
              <option>Europe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Channel
            </label>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg"
            >
              <option>All Channels</option>
              <option>Retail Pharmacy</option>
              <option>Hospital</option>
              <option>Specialty Distributor</option>
              <option>Wholesaler</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top 10 KPIs */}
      <div className="grid grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className={`rounded-lg shadow-md p-4 border-l-4 ${getStatusColor(
              kpi.status
            )}`}
          >
            <div className="flex items-center justify-between mb-2">
              <kpi.icon size={20} className="text-slate-600" />
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  kpi.status === "green"
                    ? "bg-green-200"
                    : kpi.status === "amber"
                    ? "bg-amber-200"
                    : "bg-red-200"
                }`}
              >
                {kpi.status.toUpperCase()}
              </span>
            </div>
            <h3 className="text-xs font-semibold text-slate-700 mb-1">
              {kpi.name}
            </h3>
            <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
            <p className="text-xs text-slate-600">Target: {kpi.target}</p>
            <p
              className={`text-xs font-semibold mt-1 ${
                kpi.change.startsWith("+") ? "text-red-600" : "text-green-600"
              }`}
            >
              {kpi.change} vs target
            </p>
          </div>
        ))}
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
          <h3 className="font-bold text-red-800 mb-2">Critical Issues (3)</h3>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• Perfect Order Rate: 88% (target: 90%)</li>
            <li>• Stockout Rate: 4.2% (target: &lt;3%)</li>
            <li>• Working Capital: $380M (+$40M)</li>
          </ul>
        </div>
        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
          <h3 className="font-bold text-amber-800 mb-2">Needs Attention (4)</h3>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• Revenue: $925M vs $950M target</li>
            <li>• Fill Rate: 94% (target: 95%)</li>
            <li>• Forecast Accuracy: 15% MAPE</li>
            <li>• Inventory Days: 142 (target: &lt;130)</li>
          </ul>
        </div>
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
          <h3 className="font-bold text-green-800 mb-2">On Track (3)</h3>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• Obsolescence Rate: 1.8% (excellent)</li>
            <li>• Forecast Bias: 6% (improving)</li>
            <li>• Transfer Time: 8 days (on target)</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Revenue Performance by Category
        </h2>
        <div className="space-y-4">
          {Object.entries(revenueData).map(([category, data]) => (
            <div key={category} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-800">{category}</h3>
                <span
                  className={`font-bold ${
                    data.growth.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {data.growth}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div>
                  <p className="text-xs text-slate-600">Current Quarter</p>
                  <p className="text-lg font-bold">${data.current}M</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Target</p>
                  <p className="text-lg font-bold">${data.target}M</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">YTD</p>
                  <p className="text-lg font-bold">${data.ytd}M</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    data.current >= data.target ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (data.current / data.target) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
          <h3 className="font-bold text-blue-800 mb-3">Revenue Drivers</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <TrendingUp size={16} className="text-green-600" />
              <span>Injectables: Strong specialty uptake (+5%)</span>
            </li>
            <li className="flex items-center gap-2">
              <TrendingDown size={16} className="text-red-600" />
              <span>Inhalation: Competitive pressure (-5%)</span>
            </li>
            <li className="flex items-center gap-2">
              <TrendingDown size={16} className="text-red-600" />
              <span>Oral Solids: Pricing erosion (-6%)</span>
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
          <h3 className="font-bold text-purple-800 mb-3">Forecast vs Actual</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Q4 Forecast:</span>
              <span className="font-bold">$950M</span>
            </div>
            <div className="flex justify-between">
              <span>Current Run Rate:</span>
              <span className="font-bold text-amber-600">$925M</span>
            </div>
            <div className="flex justify-between">
              <span>Gap:</span>
              <span className="font-bold text-red-600">-$25M (-2.6%)</span>
            </div>
            <div className="mt-3 pt-3 border-t">
              <span className="text-xs text-slate-600">
                Primary gap driver: Inhalation seasonal demand miss
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Demand & Inventory Analysis
        </h2>
        <div className="space-y-3">
          {inventoryProducts.map((product, idx) => (
            <div
              key={idx}
              className={`border-2 rounded-lg p-4 ${
                product.status === "red"
                  ? "border-red-300 bg-red-50"
                  : product.status === "amber"
                  ? "border-amber-300 bg-amber-50"
                  : "border-green-300 bg-green-50"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-slate-900">{product.name}</h3>
                  <p className="text-sm text-slate-600">{product.forecast}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.status === "red"
                      ? "bg-red-200 text-red-800"
                      : product.status === "amber"
                      ? "bg-amber-200 text-amber-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {product.days} days
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-slate-600">Current Stock</p>
                  <p className="text-lg font-bold">
                    {product.stock.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Target Stock</p>
                  <p className="text-lg font-bold">
                    {product.target.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Stock Level</p>
                  <p className="text-lg font-bold">
                    {Math.round((product.stock / product.target) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-4">
      {aiRecommendations.map((rec, idx) => (
        <div
          key={idx}
          className={`rounded-lg shadow-md p-5 border-l-4 ${
            rec.priority === "Critical"
              ? "border-red-500 bg-red-50"
              : rec.priority === "High"
              ? "border-orange-500 bg-orange-50"
              : "border-blue-500 bg-blue-50"
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    rec.priority === "Critical"
                      ? "bg-red-200 text-red-800"
                      : rec.priority === "High"
                      ? "bg-orange-200 text-orange-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
                >
                  {rec.priority}
                </span>
                <h3 className="font-bold text-slate-900">{rec.product}</h3>
              </div>
              <p className="text-sm font-semibold text-slate-800">
                {rec.action}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-600">Confidence</p>
              <p className="text-2xl font-bold text-blue-600">
                {rec.confidence}%
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-700 mb-3">{rec.details}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
              <DollarSign size={16} />
              {rec.impact}
            </div>
            <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Execute Action
            </button>
            <button className="px-4 py-2 border-2 border-slate-300 rounded-lg font-semibold hover:bg-slate-50">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderScenarios = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Scenario Analysis
        </h2>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {Object.keys(scenarios).map((scenario) => (
            <button
              key={scenario}
              onClick={() => setSelectedScenario(scenario)}
              className={`px-4 py-3 rounded-lg font-semibold border-2 transition-all ${
                selectedScenario === scenario
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-300 hover:border-blue-400"
              }`}
            >
              {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-300">
            <p className="text-sm font-semibold text-blue-800 mb-1">Revenue</p>
            <p className="text-3xl font-bold text-blue-900">
              ${scenarios[selectedScenario].revenue}M
            </p>
            <p className="text-xs text-blue-700 mt-1">
              {scenarios[selectedScenario].revenue > scenarios.baseline.revenue
                ? "↑"
                : scenarios[selectedScenario].revenue <
                  scenarios.baseline.revenue
                ? "↓"
                : "="}{" "}
              {Math.abs(
                scenarios[selectedScenario].revenue - scenarios.baseline.revenue
              )}
              M vs baseline
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-2 border-green-300">
            <p className="text-sm font-semibold text-green-800 mb-1">
              Fill Rate
            </p>
            <p className="text-3xl font-bold text-green-900">
              {scenarios[selectedScenario].fillRate}%
            </p>
            <p className="text-xs text-green-700 mt-1">
              {scenarios[selectedScenario].fillRate >
              scenarios.baseline.fillRate
                ? "↑"
                : scenarios[selectedScenario].fillRate <
                  scenarios.baseline.fillRate
                ? "↓"
                : "="}{" "}
              {Math.abs(
                scenarios[selectedScenario].fillRate -
                  scenarios.baseline.fillRate
              )}
              % vs baseline
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-2 border-purple-300">
            <p className="text-sm font-semibold text-purple-800 mb-1">
              Inventory Days
            </p>
            <p className="text-3xl font-bold text-purple-900">
              {scenarios[selectedScenario].inventory}
            </p>
            <p className="text-xs text-purple-700 mt-1">
              {scenarios[selectedScenario].inventory >
              scenarios.baseline.inventory
                ? "↑"
                : scenarios[selectedScenario].inventory <
                  scenarios.baseline.inventory
                ? "↓"
                : "="}{" "}
              {Math.abs(
                scenarios[selectedScenario].inventory -
                  scenarios.baseline.inventory
              )}{" "}
              days vs baseline
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border-2 border-orange-300">
            <p className="text-sm font-semibold text-orange-800 mb-1">
              Working Capital
            </p>
            <p className="text-3xl font-bold text-orange-900">
              ${scenarios[selectedScenario].workingCapital}M
            </p>
            <p className="text-xs text-orange-700 mt-1">
              {scenarios[selectedScenario].workingCapital >
              scenarios.baseline.workingCapital
                ? "↑"
                : scenarios[selectedScenario].workingCapital <
                  scenarios.baseline.workingCapital
                ? "↓"
                : "="}{" "}
              $
              {Math.abs(
                scenarios[selectedScenario].workingCapital -
                  scenarios.baseline.workingCapital
              )}
              M vs baseline
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h3 className="font-bold text-slate-900 mb-2">
            Scenario Description
          </h3>
          {selectedScenario === "baseline" && (
            <p className="text-sm text-slate-700">
              Current state with no changes to operations. Revenue shortfall vs
              target, service levels below target, and excess working capital
              tied up in inventory.
            </p>
          )}
          {selectedScenario === "optimistic" && (
            <p className="text-sm text-slate-700">
              Best-case scenario assuming all market opportunities captured, no
              stockouts, optimal inventory positioning, and successful new
              product launches. Requires perfect execution across all functions.
            </p>
          )}
          {selectedScenario === "conservative" && (
            <p className="text-sm text-slate-700">
              Risk-adjusted scenario accounting for potential market headwinds,
              competitive pressures, and execution challenges. Protects against
              downside but misses growth opportunities.
            </p>
          )}
          {selectedScenario === "aiOptimized" && (
            <p className="text-sm text-slate-700">
              Realistic scenario implementing all Cortex X AI recommendations:
              urgent replenishments, cross-site transfers, safety stock
              optimization, and channel strategy adjustments. Balances growth
              with efficiency.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="bg-white rounded-lg shadow-md p-6 h-[600px] flex flex-col">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Ask Cortex AI</h2>

      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-900"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
          placeholder="Ask about KPIs, products, or recommendations..."
          className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleChatSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Send size={16} />
          Send
        </button>
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-xs font-semibold text-slate-700 mb-2">
          Suggested Questions:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Why is Albuterol at stockout risk?",
            "How can we improve fill rate?",
            "What products have excess inventory?",
            "Explain the working capital issue",
          ].map((question, idx) => (
            <button
              key={idx}
              onClick={() => setChatInput(question)}
              className="px-3 py-1 bg-slate-100 border border-slate-300 rounded-full text-xs hover:bg-slate-200"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-slate-100 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Lupin Sales Tower
              </h1>
              <p className="text-slate-600">
                Powered by Cortex X Decision Intelligence
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Last Updated</p>
                <p className="font-semibold text-slate-900">Today, 9:00 AM</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                L
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-2 flex gap-2">
          {[
            { id: "overview", label: "Overview", icon: Layers },
            { id: "revenue", label: "Revenue", icon: DollarSign },
            { id: "demand", label: "Demand & Inventory", icon: Package },
            {
              id: "recommendations",
              label: "AI Recommendations",
              icon: Target,
            },
            { id: "scenarios", label: "Scenarios", icon: BarChart3 },
            { id: "chat", label: "Ask Cortex", icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div>
          {activeTab === "overview" && renderOverview()}
          {activeTab === "revenue" && renderRevenue()}
          {activeTab === "demand" && renderInventory()}
          {activeTab === "recommendations" && renderRecommendations()}
          {activeTab === "scenarios" && renderScenarios()}
          {activeTab === "chat" && renderChat()}
        </div>
      </div>
    </div>
  );
};

export default LupinSalesTower;

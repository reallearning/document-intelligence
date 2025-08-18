"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Play,
  Save,
  RotateCcw,
  Target,
  ShoppingCart,
  DollarSign,
  Package,
  Users,
  Store,
} from "lucide-react";

// Sample data for Metro Brands
const brands = {
  own: ["Metro Brands Shoes", "Mochi", "Walkway", "Da Vinci", "J. Fontini"],
  licensed: ["Crocs", "FitFlop", "Fila", "Foot Locker", "Clarks"],
};

const regions = ["North", "South", "East", "West"];
const channels = [
  "EBO #1",
  "EBO #2",
  "LFS #1",
  "LFS #2",
  "Internal Ecom",
  "External Ecom",
];

// Base data by brand/region/channel combinations
const baseDataMatrix = {
  "Metro Brands Shoes": {
    North: {
      "EBO #1": {
        roic: 19.2,
        fullPrice: 75,
        total: 95,
        markdown: 7.8,
        growth: 32.1,
        revSqFt: 19500,
      },
    },
    South: {
      "EBO #1": {
        roic: 18.8,
        fullPrice: 73,
        total: 94,
        markdown: 8.1,
        growth: 28.7,
        revSqFt: 18900,
      },
    },
    East: {
      "EBO #1": {
        roic: 17.9,
        fullPrice: 70,
        total: 92,
        markdown: 9.2,
        growth: 25.3,
        revSqFt: 17800,
      },
    },
    West: {
      "EBO #1": {
        roic: 20.1,
        fullPrice: 76,
        total: 96,
        markdown: 7.2,
        growth: 35.4,
        revSqFt: 20200,
      },
    },
  },
  Mochi: {
    North: {
      "EBO #1": {
        roic: 21.3,
        fullPrice: 78,
        total: 97,
        markdown: 6.9,
        growth: 38.2,
        revSqFt: 21100,
      },
    },
    South: {
      "EBO #1": {
        roic: 20.7,
        fullPrice: 76,
        total: 95,
        markdown: 7.4,
        growth: 34.8,
        revSqFt: 20500,
      },
    },
    East: {
      "EBO #1": {
        roic: 19.8,
        fullPrice: 74,
        total: 93,
        markdown: 8.1,
        growth: 30.2,
        revSqFt: 19200,
      },
    },
    West: {
      "EBO #1": {
        roic: 22.1,
        fullPrice: 79,
        total: 98,
        markdown: 6.2,
        growth: 41.7,
        revSqFt: 22300,
      },
    },
  },
  Crocs: {
    North: {
      "EBO #1": {
        roic: 16.8,
        fullPrice: 68,
        total: 89,
        markdown: 11.2,
        growth: 22.4,
        revSqFt: 16200,
      },
    },
    South: {
      "EBO #1": {
        roic: 17.2,
        fullPrice: 69,
        total: 90,
        markdown: 10.8,
        growth: 24.1,
        revSqFt: 16800,
      },
    },
    East: {
      "EBO #1": {
        roic: 16.1,
        fullPrice: 66,
        total: 87,
        markdown: 12.5,
        growth: 19.7,
        revSqFt: 15500,
      },
    },
    West: {
      "EBO #1": {
        roic: 18.0,
        fullPrice: 71,
        total: 92,
        markdown: 10.1,
        growth: 27.3,
        revSqFt: 17900,
      },
    },
  },
};

// Generate sample data based on selections
const generateKPIData = (brand, region, channel) => {
  let data;

  if (brand === "ALL" || region === "ALL" || channel === "ALL") {
    // Default aggregated data
    data = {
      roic: 18.5,
      fullPrice: 72,
      total: 94,
      markdown: 8.2,
      growth: 28.4,
      revSqFt: 18200,
    };
  } else {
    // Get specific data
    data = baseDataMatrix[brand]?.[region]?.[channel] || {
      roic: 18.5,
      fullPrice: 72,
      total: 94,
      markdown: 8.2,
      growth: 28.4,
      revSqFt: 18200,
    };
  }

  return {
    roic: {
      value: Math.round(data.roic * 100) / 100,
      target: 17,
      trend: data.roic > 18 ? "up" : "down",
    },
    fullPriceSelthrough: {
      value: Math.round(data.fullPrice * 100) / 100,
      target: 70,
      trend: data.fullPrice > 72 ? "up" : "down",
    },
    totalSelthrough: {
      value: Math.round(data.total * 100) / 100,
      target: 90,
      trend: data.total > 93 ? "up" : "down",
    },
    markdownPercent: {
      value: Math.round(data.markdown * 100) / 100,
      target: 10,
      trend: data.markdown < 8.5 ? "down" : "up",
    },
    yoyGrowth: {
      value: Math.round(data.growth * 100) / 100,
      target: 25,
      trend: data.growth > 27 ? "up" : "down",
    },
    revPerSqFt: {
      value: data.revSqFt,
      target: 19000,
      trend: data.revSqFt > 18500 ? "up" : "down",
    },
    ecomContribution: { value: 13.7, target: 15, trend: "up" },
    inventoryTurns: { value: 4.2, target: 4.5, trend: "down" },
  };
};

const generateRevenueProjection = (withRecommendations = false) => {
  const weeks = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);
  return weeks.map((week, i) => {
    const baseFullPrice = Math.max(1.5, 4.5 - i * 0.3 + Math.random() * 0.5);
    const baseMarkdown = i > 6 ? Math.random() * 2 : 0;
    const baseLastYear = 3.8 - i * 0.2 + Math.random() * 0.3;

    // Apply recommendation impacts
    const fullPriceBoost = withRecommendations ? 0.3 : 0;
    const markdownReduction = withRecommendations ? 0.5 : 0;

    return {
      week,
      fullPrice: Math.round((baseFullPrice + fullPriceBoost) * 100) / 100,
      markdown: Math.max(
        0,
        Math.round((baseMarkdown - markdownReduction) * 100) / 100
      ),
      lastYear: Math.round(baseLastYear * 100) / 100,
      improvement: withRecommendations
        ? Math.round((fullPriceBoost + markdownReduction) * 100) / 100
        : 0,
    };
  });
};

const generateInventoryProjection = () => {
  const weeks = Array.from({ length: 13 }, (_, i) => `Week ${i}`);
  return weeks.map((week, i) => ({
    week,
    units: Math.max(1000, 10000 - i * 700 + Math.random() * 500),
    value:
      Math.round(Math.max(7.5, 30 - i * 1.8 + Math.random() * 2) * 100) / 100,
  }));
};

const generateBrandPerformance = (selectedBrand, selectedRegion) => {
  const brandList =
    selectedBrand === "ALL"
      ? [...brands.own, ...brands.licensed]
      : [selectedBrand];
  return brandList.map((brand) => {
    const baseASP =
      brand === "Mochi"
        ? 2800
        : brand === "Crocs"
        ? 3200
        : brand === "Metro Brands Shoes"
        ? 2400
        : 2500;
    const regionMultiplier =
      selectedRegion === "West"
        ? 1.15
        : selectedRegion === "North"
        ? 1.1
        : selectedRegion === "South"
        ? 1.05
        : 1.0;

    return {
      brand,
      asp: Math.round(baseASP * regionMultiplier),
      selthrough: Math.round((65 + Math.random() * 30) * 100) / 100,
      markdown: Math.round((5 + Math.random() * 15) * 100) / 100,
      roic: Math.round((15 + Math.random() * 10) * 100) / 100,
      isOwnBrand: brands.own.includes(brand),
    };
  });
};

// Format currency in Indian Rupees
const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};

// Format percentage with proper rounding
const formatPercentage = (value) => {
  return `${Math.round(value * 100) / 100}%`;
};

const CortexX = () => {
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [selectedChannel, setSelectedChannel] = useState("ALL");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [kpiData, setKpiData] = useState(generateKPIData("ALL", "ALL", "ALL"));
  const [revenueData, setRevenueData] = useState(
    generateRevenueProjection(false)
  );
  const [inventoryData, setInventoryData] = useState(
    generateInventoryProjection()
  );
  const [brandData, setBrandData] = useState(
    generateBrandPerformance("ALL", "ALL")
  );
  const [recommendationsApplied, setRecommendationsApplied] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "ai",
      text: "Hello! I'm Cortex X. How can I help you optimize Metro Brands' retail performance today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Scenario planning state
  const [scenario, setScenario] = useState({
    initialInventory: 10000,
    firstMarkdownWeek: 8,
    markdownDepth: 20,
    priceIncrease: 0,
    inventoryReduction: 0,
  });

  const [savedScenarios] = useState([
    {
      name: "Conservative",
      roic: 17.2,
      fullPrice: 75,
      selthrough: 92,
      markdown: 7.5,
    },
    {
      name: "Balanced",
      roic: 18.5,
      fullPrice: 72,
      selthrough: 94,
      markdown: 8.2,
      active: true,
    },
    {
      name: "Aggressive",
      roic: 19.1,
      fullPrice: 68,
      selthrough: 96,
      markdown: 9.5,
    },
  ]);

  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title:
        "Reduce initial purchase of Category X by 8% to improve ROIC by 1.2%",
      impact: "ROIC +1.2%",
      type: "inventory",
      applied: false,
    },
    {
      id: 2,
      title:
        "Delay first markdown by 1 week for Brand Y to maximize full-price sales",
      impact: "Full-Price +2.3%",
      type: "pricing",
      applied: false,
    },
    {
      id: 3,
      title:
        "Reallocate 15% of inventory from Channel A to Channel B based on performance",
      impact: "Revenue +3.5%",
      type: "distribution",
      applied: false,
    },
  ]);

  // Update data when filters change
  useEffect(() => {
    setKpiData(generateKPIData(selectedBrand, selectedRegion, selectedChannel));
    setBrandData(generateBrandPerformance(selectedBrand, selectedRegion));
  }, [selectedBrand, selectedRegion, selectedChannel]);

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { type: "user", text: chatInput },
      { type: "ai", text: generateAIResponse(chatInput) },
    ]);
    setChatInput("");
  };

  const generateAIResponse = (input) => {
    const responses = [
      `Based on current data, I recommend optimizing inventory allocation for ${
        selectedBrand !== "ALL" ? selectedBrand : "Metro Brands"
      }.`,
      `Analysis shows that delaying markdown by 1 week could improve ROIC by 1.2% for the selected categories.`,
      `Current sell-through rates are ${formatPercentage(
        kpiData.totalSelthrough.value
      )}. Consider adjusting pricing strategy for better performance.`,
      `E-commerce contribution is at ${formatPercentage(
        kpiData.ecomContribution.value
      )}. There's opportunity to expand omnichannel presence.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const simulateScenario = () => {
    // Create a copy of current KPI data
    const newKPI = { ...kpiData };

    // Apply scenario impacts
    if (scenario.priceIncrease > 0) {
      newKPI.roic.value =
        Math.round((newKPI.roic.value + scenario.priceIncrease * 0.3) * 100) /
        100;
      newKPI.fullPriceSelthrough.value =
        Math.round(
          (newKPI.fullPriceSelthrough.value - scenario.priceIncrease * 0.5) *
            100
        ) / 100;
    }

    if (scenario.inventoryReduction > 0) {
      newKPI.inventoryTurns = {
        value:
          Math.round((4.2 + scenario.inventoryReduction * 0.1) * 100) / 100,
        target: 4.5,
        trend: "up",
      };
      newKPI.roic.value =
        Math.round(
          (newKPI.roic.value + scenario.inventoryReduction * 0.2) * 100
        ) / 100;
    }

    if (scenario.firstMarkdownWeek > 8) {
      newKPI.fullPriceSelthrough.value =
        Math.round(
          (newKPI.fullPriceSelthrough.value +
            (scenario.firstMarkdownWeek - 8) * 1.5) *
            100
        ) / 100;
      newKPI.roic.value =
        Math.round(
          (newKPI.roic.value + (scenario.firstMarkdownWeek - 8) * 0.4) * 100
        ) / 100;
    }

    if (scenario.markdownDepth < 20) {
      newKPI.markdownPercent.value =
        Math.round(
          (newKPI.markdownPercent.value - (20 - scenario.markdownDepth) * 0.2) *
            100
        ) / 100;
      newKPI.roic.value =
        Math.round(
          (newKPI.roic.value + (20 - scenario.markdownDepth) * 0.1) * 100
        ) / 100;
    }

    // Update trends based on new values
    newKPI.roic.trend = newKPI.roic.value > newKPI.roic.target ? "up" : "down";
    newKPI.fullPriceSelthrough.trend =
      newKPI.fullPriceSelthrough.value > newKPI.fullPriceSelthrough.target
        ? "up"
        : "down";
    newKPI.markdownPercent.trend =
      newKPI.markdownPercent.value < newKPI.markdownPercent.target
        ? "down"
        : "up";

    setKpiData(newKPI);

    // Update revenue projection with scenario impacts
    setRevenueData(generateRevenueProjection(true));

    // Add to chat
    setChatMessages((prev) => [
      ...prev,
      {
        type: "ai",
        text: `Scenario simulated! With ${
          scenario.priceIncrease
        }% price increase, ${
          scenario.inventoryReduction
        }% inventory reduction, markdown week ${
          scenario.firstMarkdownWeek
        }, and ${
          scenario.markdownDepth
        }% markdown depth - ROIC improved to ${formatPercentage(
          newKPI.roic.value
        )}.`,
      },
    ]);
  };

  const applyRecommendation = (recId) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === recId ? { ...rec, applied: true } : rec))
    );

    // Apply the recommendation impact to KPIs
    const newKPI = { ...kpiData };
    const rec = recommendations.find((r) => r.id === recId);

    if (rec.type === "inventory") {
      newKPI.roic.value = Math.round((newKPI.roic.value + 1.2) * 100) / 100;
    } else if (rec.type === "pricing") {
      newKPI.fullPriceSelthrough.value =
        Math.round((newKPI.fullPriceSelthrough.value + 2.3) * 100) / 100;
    } else if (rec.type === "distribution") {
      newKPI.yoyGrowth.value =
        Math.round((newKPI.yoyGrowth.value + 3.5) * 100) / 100;
    }

    // Update trends
    newKPI.roic.trend = newKPI.roic.value > newKPI.roic.target ? "up" : "down";
    newKPI.fullPriceSelthrough.trend =
      newKPI.fullPriceSelthrough.value > newKPI.fullPriceSelthrough.target
        ? "up"
        : "down";
    newKPI.yoyGrowth.trend =
      newKPI.yoyGrowth.value > newKPI.yoyGrowth.target ? "up" : "down";

    setKpiData(newKPI);

    // Update revenue projection to show improvements
    setRecommendationsApplied(true);
    setRevenueData(generateRevenueProjection(true));

    setChatMessages((prev) => [
      ...prev,
      {
        type: "ai",
        text: `Applied recommendation: ${rec.title}. Expected impact: ${rec.impact}`,
      },
    ]);
  };

  const KPICard = ({
    title,
    value,
    target,
    trend,
    unit = "%",
    icon: Icon,
    isCurrency = false,
  }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-gray-600">{title}</span>
        </div>
        {trend === "up" ? (
          <TrendingUp className="w-4 h-4 text-green-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500" />
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {isCurrency
          ? formatCurrency(value)
          : `${Math.round(value * 100) / 100}${unit}`}
      </div>
      <div className="text-sm text-gray-500">
        Target: {isCurrency ? formatCurrency(target) : `${target}${unit}`}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${Math.min(100, (value / target) * 100)}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cortex X</h1>
            <p className="text-gray-600">
              Metro Brands Retail Intelligence Agent
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Export Report
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Run Optimization
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mt-4">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="ALL">All Brands</option>
            <optgroup label="Own Brands">
              {brands.own.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </optgroup>
            <optgroup label="Licensed Brands">
              {brands.licensed.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </optgroup>
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="ALL">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="ALL">All Channels</option>
            {channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>

          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>Spring/Summer 2025</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4">
          {["dashboard", "scenarios", "chat"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md capitalize ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <KPICard
                title="Current ROIC"
                value={kpiData.roic.value}
                target={kpiData.roic.target}
                trend={kpiData.roic.trend}
                icon={Target}
              />
              <KPICard
                title="Full Price Sell-Through"
                value={kpiData.fullPriceSelthrough.value}
                target={kpiData.fullPriceSelthrough.target}
                trend={kpiData.fullPriceSelthrough.trend}
                icon={DollarSign}
              />
              <KPICard
                title="Total Sell-Through"
                value={kpiData.totalSelthrough.value}
                target={kpiData.totalSelthrough.target}
                trend={kpiData.totalSelthrough.trend}
                icon={ShoppingCart}
              />
              <KPICard
                title="Markdown %"
                value={kpiData.markdownPercent.value}
                target={kpiData.markdownPercent.target}
                trend={kpiData.markdownPercent.trend}
                icon={Package}
              />
            </div>

            {/* Additional KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <KPICard
                title="YoY Growth"
                value={kpiData.yoyGrowth.value}
                target={kpiData.yoyGrowth.target}
                trend={kpiData.yoyGrowth.trend}
                icon={TrendingUp}
              />
              <KPICard
                title="Revenue per Sq Ft"
                value={kpiData.revPerSqFt.value}
                target={kpiData.revPerSqFt.target}
                trend={kpiData.revPerSqFt.trend}
                unit=""
                isCurrency={true}
                icon={Store}
              />
              <KPICard
                title="E-com Contribution"
                value={kpiData.ecomContribution.value}
                target={kpiData.ecomContribution.target}
                trend={kpiData.ecomContribution.trend}
                icon={Users}
              />
              <KPICard
                title="Inventory Turns"
                value={kpiData.inventoryTurns.value}
                target={kpiData.inventoryTurns.target}
                trend={kpiData.inventoryTurns.trend}
                unit="x"
                icon={Package}
              />
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Revenue Projection */}
              <div className="bg-white rounded-lg p-6 shadow-sm border col-span-2">
                <h3 className="text-lg font-semibold mb-4">
                  Revenue Projection
                  {recommendationsApplied && (
                    <span className="text-sm text-green-600 ml-2">
                      (With Applied Recommendations)
                    </span>
                  )}
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="fullPrice"
                      stackId="a"
                      fill="#3B82F6"
                      name="Full Price"
                    />
                    <Bar
                      dataKey="markdown"
                      stackId="a"
                      fill="#F59E0B"
                      name="Markdown"
                    />
                    {recommendationsApplied && (
                      <Bar
                        dataKey="improvement"
                        stackId="a"
                        fill="#10B981"
                        name="Improvement"
                      />
                    )}
                    <Bar dataKey="lastYear" fill="#E5E7EB" name="Last Year" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* AI Recommendations */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">AI Recommendations</h3>
                  <button className="text-blue-600 text-sm">View All</button>
                </div>
                <div className="space-y-4">
                  {recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className={`border-l-4 ${
                        rec.applied
                          ? "border-green-500 bg-green-50"
                          : "border-blue-500"
                      } pl-4 py-2`}
                    >
                      <p className="text-sm text-gray-700">{rec.title}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-green-600 font-medium">
                          {rec.impact}
                        </span>
                        <div className="flex gap-2">
                          {!rec.applied ? (
                            <button
                              onClick={() => applyRecommendation(rec.id)}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Apply
                            </button>
                          ) : (
                            <span className="text-xs text-green-600 font-medium">
                              Applied ✓
                            </span>
                          )}
                          <button className="text-xs text-gray-500">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Inventory Projection */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">
                  Inventory Projection
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={inventoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar
                      dataKey="units"
                      yAxisId="left"
                      fill="#3B82F6"
                      name="Units"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="value"
                      stroke="#F59E0B"
                      name="Value"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Brand Performance */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">
                  Brand Performance
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {brandData.slice(0, 6).map((brand, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-gray-100"
                    >
                      <div>
                        <div className="font-medium text-sm">{brand.brand}</div>
                        <div className="text-xs text-gray-500">
                          {brand.isOwnBrand ? "Own Brand" : "Licensed"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {formatCurrency(brand.asp)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatPercentage(brand.selthrough)} ST
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "scenarios" && (
          <div className="grid grid-cols-3 gap-6">
            {/* Scenario Planning */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Scenario Planning</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Initial Inventory (Units)
                  </label>
                  <input
                    type="number"
                    value={scenario.initialInventory}
                    onChange={(e) =>
                      setScenario({
                        ...scenario,
                        initialInventory: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    First Markdown Week: {scenario.firstMarkdownWeek}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={scenario.firstMarkdownWeek}
                    onChange={(e) =>
                      setScenario({
                        ...scenario,
                        firstMarkdownWeek: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Markdown Depth: {scenario.markdownDepth}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={scenario.markdownDepth}
                    onChange={(e) =>
                      setScenario({
                        ...scenario,
                        markdownDepth: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Price Increase: {scenario.priceIncrease}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={scenario.priceIncrease}
                    onChange={(e) =>
                      setScenario({
                        ...scenario,
                        priceIncrease: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Inventory Reduction: {scenario.inventoryReduction}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={scenario.inventoryReduction}
                    onChange={(e) =>
                      setScenario({
                        ...scenario,
                        inventoryReduction: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <button
                onClick={simulateScenario}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Simulate Scenario
              </button>
            </div>

            {/* Saved Scenarios */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Saved Scenarios</h3>
              <div className="space-y-4">
                {savedScenarios.map((scenario, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border ${
                      scenario.active
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{scenario.name}</h4>
                      {scenario.active && (
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>ROIC: {formatPercentage(scenario.roic)}</div>
                      <div>
                        Full Price: {formatPercentage(scenario.fullPrice)}
                      </div>
                      <div>
                        Sell-Through: {formatPercentage(scenario.selthrough)}
                      </div>
                      <div>Markdown: {formatPercentage(scenario.markdown)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What-If Analysis */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">What-If Analysis</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">
                    Impact of 10% Lower Inventory
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-green-600">ROIC Change: +2.3%</div>
                    <div className="text-red-600">Revenue Impact: -3.5%</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">
                    Delaying First Markdown by 2 Weeks
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-green-600">ROIC Change: +1.2%</div>
                    <div className="text-green-600">
                      Full-Price Impact: +5.8%
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">
                    Increasing ASP by 5%
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-green-600">Margin: +12.5%</div>
                    <div className="text-red-600">Volume: -8.2%</div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
                Add New What-If Scenario
              </button>
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border h-[600px] flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat with Cortex X
                </h3>
                <p className="text-sm text-gray-600">
                  Ask questions about Metro Brands' performance, get
                  recommendations, or explore scenarios
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleChatSubmit()}
                    placeholder="Ask about inventory optimization, pricing strategies, or brand performance for Metro Brands..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleChatSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Send
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() =>
                      setChatInput(
                        "What's the optimal markdown timing for Crocs in North region?"
                      )
                    }
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                  >
                    Markdown timing
                  </button>
                  <button
                    onClick={() =>
                      setChatInput("How can we improve ROIC for Mochi brand?")
                    }
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                  >
                    Improve ROIC
                  </button>
                  <button
                    onClick={() =>
                      setChatInput(
                        "Compare performance of Metro Brands own vs licensed brands"
                      )
                    }
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                  >
                    Brand comparison
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CortexX;

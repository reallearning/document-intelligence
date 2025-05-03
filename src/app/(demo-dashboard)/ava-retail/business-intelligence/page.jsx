"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts";
import {
  Sliders,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Archive,
  Percent,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Sample data - would be replaced with real data in production
const mockData = {
  kpis: {
    currentROIC: 18.5,
    fullPriceSellThrough: 72,
    totalSellThrough: 94,
    markdownPercentage: 8.2,
    yoyGrowth: 28.4,
  },
  brands: ["AND", "Global Desi", "Anita Dongre", "Grassroot"],
  categories: ["Apparel", "Accessories", "Footwear", "Home"],
  seasons: ["Spring/Summer 2025", "Fall/Winter 2024", "Spring/Summer 2024"],
  scenarios: [
    {
      id: 1,
      name: "Conservative",
      roic: 17.2,
      fullPrice: 75,
      totalSellThrough: 92,
      markdown: 7.5,
    },
    {
      id: 2,
      name: "Balanced",
      roic: 18.5,
      fullPrice: 72,
      totalSellThrough: 94,
      markdown: 8.2,
    },
    {
      id: 3,
      name: "Aggressive",
      roic: 19.1,
      fullPrice: 68,
      totalSellThrough: 96,
      markdown: 9.8,
    },
  ],
  revenueProjection: [
    {
      week: 1,
      fullPrice: 420000,
      markdown: 0,
      total: 420000,
      lastYear: 380000,
    },
    {
      week: 2,
      fullPrice: 380000,
      markdown: 0,
      total: 380000,
      lastYear: 350000,
    },
    {
      week: 3,
      fullPrice: 350000,
      markdown: 0,
      total: 350000,
      lastYear: 320000,
    },
    {
      week: 4,
      fullPrice: 310000,
      markdown: 0,
      total: 310000,
      lastYear: 290000,
    },
    {
      week: 5,
      fullPrice: 280000,
      markdown: 0,
      total: 280000,
      lastYear: 260000,
    },
    {
      week: 6,
      fullPrice: 240000,
      markdown: 0,
      total: 240000,
      lastYear: 230000,
    },
    {
      week: 7,
      fullPrice: 220000,
      markdown: 0,
      total: 220000,
      lastYear: 210000,
    },
    {
      week: 8,
      fullPrice: 200000,
      markdown: 40000,
      total: 240000,
      lastYear: 220000,
    },
    {
      week: 9,
      fullPrice: 180000,
      markdown: 80000,
      total: 260000,
      lastYear: 240000,
    },
    {
      week: 10,
      fullPrice: 160000,
      markdown: 100000,
      total: 260000,
      lastYear: 230000,
    },
    {
      week: 11,
      fullPrice: 140000,
      markdown: 120000,
      total: 260000,
      lastYear: 220000,
    },
    {
      week: 12,
      fullPrice: 120000,
      markdown: 140000,
      total: 260000,
      lastYear: 210000,
    },
  ],
  inventoryProjection: [
    { week: 0, units: 10000, value: 3000000 },
    { week: 1, units: 9100, value: 2730000 },
    { week: 2, units: 8300, value: 2490000 },
    { week: 3, units: 7600, value: 2280000 },
    { week: 4, units: 7000, value: 2100000 },
    { week: 5, units: 6500, value: 1950000 },
    { week: 6, units: 6000, value: 1800000 },
    { week: 7, units: 5600, value: 1680000 },
    { week: 8, units: 5100, value: 1530000 },
    { week: 9, units: 4500, value: 1350000 },
    { week: 10, units: 3800, value: 1140000 },
    { week: 11, units: 3000, value: 900000 },
    { week: 12, units: 2200, value: 660000 },
  ],
  recommendations: [
    {
      id: 1,
      type: "inventory",
      text: "Reduce initial purchase of Category X by 8% to improve ROIC by 1.2%",
    },
    {
      id: 2,
      type: "markdown",
      text: "Delay first markdown by 1 week for Brand Y to maximize full-price sales",
    },
    {
      id: 3,
      type: "allocation",
      text: "Reallocate 15% of inventory from Channel A to Channel B based on performance",
    },
  ],
};

const ROICDashboard = () => {
  const [selectedBrand, setSelectedBrand] = useState("AND");
  const [selectedCategory, setSelectedCategory] = useState("Apparel");
  const [selectedSeason, setSelectedSeason] = useState("Spring/Summer 2025");
  const [initialInventory, setInitialInventory] = useState(10000);
  const [markdownWeek, setMarkdownWeek] = useState(8);
  const [markdownDepth, setMarkdownDepth] = useState(20);
  const [activeScenario, setActiveScenario] = useState(2);

  const { kpis } = mockData;

  const KPICard = ({ title, value, icon, unit, target, status }) => {
    return (
      <div className="bg-white rounded-lg shadow p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          <span className="text-blue-500">{icon}</span>
        </div>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">{value}</span>
          <span className="ml-1 text-sm text-gray-500">{unit}</span>
        </div>
        <div className="mt-2 flex items-center">
          <div
            className={`h-1 rounded-full flex-1 ${
              status === "good"
                ? "bg-green-100"
                : status === "warning"
                ? "bg-yellow-100"
                : "bg-red-100"
            }`}
          >
            <div
              className={`h-1 rounded-full ${
                status === "good"
                  ? "bg-green-500"
                  : status === "warning"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${Math.min((value / target) * 100, 100)}%` }}
            ></div>
          </div>
          <span className="ml-2 text-xs text-gray-500">
            Target: {target}
            {unit}
          </span>
        </div>
      </div>
    );
  };

  const ScenarioCard = ({ scenario, isActive, onClick }) => {
    return (
      <div
        className={`p-4 rounded-lg mb-3 cursor-pointer ${
          isActive
            ? "bg-blue-50 border border-blue-200"
            : "bg-white border border-gray-200"
        }`}
        onClick={onClick}
      >
        <div className="flex justify-between">
          <h3 className="font-medium">{scenario.name}</h3>
          {isActive && (
            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
              Active
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <p className="text-xs text-gray-500">ROIC</p>
            <p className="font-bold">{scenario.roic}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Full Price</p>
            <p className="font-semibold">{scenario.fullPrice}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Sell-Through</p>
            <p className="font-semibold">{scenario.totalSellThrough}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Markdown</p>
            <p className="font-semibold">{scenario.markdown}%</p>
          </div>
        </div>
      </div>
    );
  };

  const formatIndianNumber = (value) => {
    if (value >= 10000000) {
      // 1 Crore = 10,000,000
      return (value / 10000000).toFixed(1) + "Cr";
    } else if (value >= 100000) {
      // 1 Lakh = 100,000
      return (value / 100000).toFixed(1) + "L";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(0) + "k";
    }
    return value;
  };

  // Custom tooltip component to show values in Indian numbering system
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-300 rounded shadow-md">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: ₹{formatIndianNumber(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const router = useRouter();

  return (
    <div className="bg-gray-50 p-6 h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Business Intelligence Agent
          </h1>
          <div className="flex space-x-2">
            <button className="bg-white border border-gray-300 rounded px-3 py-1 text-sm">
              Export Report
            </button>
            <button className="bg-blue-600 text-white rounded px-3 py-1 text-sm">
              Run Optimization
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <select
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              {mockData.brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {mockData.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Season
            </label>
            <select
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
            >
              {mockData.seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              View
            </label>
            <select className="block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option>By SKU</option>
              <option>By Collection</option>
              <option>By Store</option>
              <option>By Region</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <KPICard
            title="Current ROIC"
            value={kpis.currentROIC}
            unit="%"
            target={17}
            status="good"
            icon={<TrendingUp size={16} />}
          />
          <KPICard
            title="Full Price Sell-Through"
            value={kpis.fullPriceSellThrough}
            unit="%"
            target={70}
            status="good"
            icon={<DollarSign size={16} />}
          />
          <KPICard
            title="Total Sell-Through"
            value={kpis.totalSellThrough}
            unit="%"
            target={90}
            status="good"
            icon={<Archive size={16} />}
          />
          <KPICard
            title="Markdown %"
            value={kpis.markdownPercentage}
            unit="%"
            target={10}
            status="good"
            icon={<Percent size={16} />}
          />
          <KPICard
            title="YoY Growth"
            value={kpis.yoyGrowth}
            unit="%"
            target={25}
            status="good"
            icon={<TrendingUp size={16} />}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="text-lg font-medium mb-4">Scenario Planning</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Inventory (Units)
                </label>
                <input
                  type="number"
                  className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={initialInventory}
                  onChange={(e) =>
                    setInitialInventory(parseInt(e.target.value))
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Markdown Week: {markdownWeek}
                </label>
                <input
                  type="range"
                  min="4"
                  max="12"
                  value={markdownWeek}
                  onChange={(e) => setMarkdownWeek(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Markdown Depth: {markdownDepth}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={markdownDepth}
                  onChange={(e) => setMarkdownDepth(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-md mt-2 flex items-center justify-center">
                <Sliders className="mr-2" size={16} />
                Simulate Scenario
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Saved Scenarios</h2>
              {mockData.scenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  isActive={scenario.id === activeScenario}
                  onClick={() => setActiveScenario(scenario.id)}
                />
              ))}
            </div>
          </div>

          {/* Middle Column - Charts */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="text-lg font-medium mb-4">Revenue Projection</h2>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={mockData.revenueProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="week"
                    label={{
                      value: "Week",
                      position: "insideBottom",
                      offset: -5,
                    }}
                    tickFormatter={(value) => `Week ${value}`}
                  />
                  <YAxis
                    label={{
                      value: "Revenue (₹)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    tickFormatter={formatIndianNumber}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="fullPrice"
                    stackId="a"
                    fill="#4f46e5"
                    name="Full Price"
                  />
                  <Bar
                    dataKey="markdown"
                    stackId="a"
                    fill="#f97316"
                    name="Markdown"
                  />
                  <Line
                    type="monotone"
                    dataKey="lastYear"
                    stroke="#6b7280"
                    name="Last Year"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Inventory Projection</h2>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={mockData.inventoryProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="week"
                    label={{
                      value: "Week",
                      position: "insideBottom",
                      offset: -5,
                    }}
                    tickFormatter={(value) => `Week ${value}`}
                  />
                  <YAxis
                    yAxisId="left"
                    label={{
                      value: "Units",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    tickFormatter={formatIndianNumber}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: "Value (₹)",
                      angle: 90,
                      position: "insideRight",
                    }}
                    tickFormatter={formatIndianNumber}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="units"
                    fill="#2563eb"
                    name="Units"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="value"
                    stroke="#ef4444"
                    name="Value"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column - Recommendations */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">AI Recommendations</h2>
                <button
                  className="bg-[#2463eb] text-white text-sm font-medium px-6 py-1.5 rounded-full"
                  onClick={() => {
                    router.push("/business-analytics");
                  }}
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {mockData.recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="border-l-4 border-blue-500 pl-3 py-2"
                  >
                    <p className="text-sm">{rec.text}</p>
                    <div className="flex mt-2">
                      <button className="text-xs text-blue-600 mr-3">
                        Apply
                      </button>
                      <button className="text-xs text-gray-500">Dismiss</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">What-If Analysis</h2>
              <div className="space-y-4">
                <div className="p-3 border border-gray-200 rounded">
                  <h3 className="font-medium mb-2">
                    Impact of 10% Lower Inventory
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">ROIC Change</p>
                      <p className="font-bold text-green-600">+2.3%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Revenue Impact</p>
                      <p className="font-bold text-red-600">-3.5%</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 border border-gray-200 rounded">
                  <h3 className="font-medium mb-2">
                    Delaying First Markdown by 2 Weeks
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">ROIC Change</p>
                      <p className="font-bold text-green-600">+1.2%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Full-Price Impact</p>
                      <p className="font-bold text-green-600">+5.8%</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="text-sm text-blue-600">
                    Add New What-If Scenario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICDashboard;

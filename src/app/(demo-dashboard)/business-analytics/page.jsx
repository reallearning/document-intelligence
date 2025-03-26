"use client";
import React, { useState } from "react";
import {
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Package,
  BarChart3,
  Calendar,
  Zap,
  ArrowUp,
  ArrowDown,
  Filter,
  Sliders,
  Store,
  Globe,
  Target,
  Plus,
  Minus,
  Award,
  Clock,
  RefreshCw,
  Coffee,
  Tag,
  Info,
  ChevronDown,
  ChevronRight,
  Check,
  Layers,
  Users,
  CreditCard,
  ShoppingBag,
  ChevronsRight,
} from "lucide-react";

// Level tabs for switching between brand, channel, POS, SKU views
const LevelTabs = ({ activeLevel, setActiveLevel }) => {
  const levels = [
    { id: "brand", label: "Brand", icon: Award },
    { id: "channel", label: "Channel", icon: Layers },
    { id: "pos", label: "POS", icon: Store },
    { id: "sku", label: "SKU", icon: Tag },
  ];

  return (
    <div className="flex space-x-2 mb-6">
      {levels.map((level) => {
        const Icon = level.icon;
        return (
          <button
            key={level.id}
            className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
              activeLevel === level.id
                ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => setActiveLevel(level.id)}
          >
            <Icon className="h-4 w-4 mr-2" />
            {level.label}
          </button>
        );
      })}
    </div>
  );
};

// Collapsible section component
const CollapsibleSection = ({ title, icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const Icon = icon;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <button
        className="w-full px-6 py-4 flex items-center justify-between bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Icon className="h-5 w-5 text-indigo-600 mr-3" />
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 py-4 bg-white border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
};

// Priority level indicator
const StatusIndicator = ({ priority }) => {
  const colors = {
    high: "text-red-500",
    medium: "text-orange-500",
    positive: "text-green-600",
  };

  return (
    <div
      className={`w-2 h-2 rounded-full ${colors[priority]} bg-current`}
    ></div>
  );
};

// Morning briefing item
const PriorityItem = ({ priority, children }) => (
  <li className="flex items-start my-2">
    <StatusIndicator priority={priority} />
    <span className="ml-3 text-gray-700">{children}</span>
  </li>
);

// Recommendation/insight card
const InsightCard = ({
  icon,
  title,
  description,
  impact,
  kpi,
  status,
  rootCause,
  actions,
}) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = icon;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-l-4 ${
        status === "critical"
          ? "border-l-red-500"
          : status === "warning"
          ? "border-l-orange-500"
          : status === "positive"
          ? "border-l-green-500"
          : "border-l-indigo-500"
      } overflow-hidden mb-4`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div
            className={`p-2 rounded-full ${
              status === "critical"
                ? "bg-red-50 text-red-600"
                : status === "warning"
                ? "bg-orange-50 text-orange-600"
                : status === "positive"
                ? "bg-green-50 text-green-600"
                : "bg-indigo-50 text-indigo-600"
            } mr-3`}
          >
            <Icon size={18} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              {impact && (
                <div className="text-sm font-medium text-indigo-700">
                  Impact: {impact}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{description}</p>

            {kpi && kpi.value && (
              <div className="flex items-center mt-2 mb-2">
                <span className="text-sm text-gray-600 mr-2">{kpi.label}:</span>
                <span className="text-sm font-semibold">{kpi.value}</span>
                {kpi.change && (
                  <span
                    className={`ml-2 text-xs ${
                      kpi.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {kpi.change.startsWith("+") ? (
                      <ArrowUp className="h-3 w-3 inline mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 inline mr-1" />
                    )}
                    {kpi.change}
                  </span>
                )}
              </div>
            )}

            <button
              className="mt-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Hide Details" : "Show Details"}
              {expanded ? (
                <ChevronDown className="h-4 w-4 ml-1" />
              ) : (
                <ChevronRight className="h-4 w-4 ml-1" />
              )}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {rootCause && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Root Cause Analysis:
                </h4>
                <p className="text-sm text-gray-600">{rootCause}</p>
              </div>
            )}

            {actions && actions.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Recommended Actions:
                </h4>
                <div className="space-y-3">
                  {actions.map((action, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 relative mt-0.5">
                        <div className="h-5 w-5 rounded border bg-green-50 border-green-200">
                          <Check className="h-3 w-3 text-green-500 absolute inset-0 m-auto" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">
                          {action.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {action.description}
                        </p>
                        {action.impact && (
                          <p className="text-xs font-medium text-indigo-600 mt-1">
                            Impact: {action.impact}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Revenue driver adjustment component
const RevenueDriver = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  impact,
  explanation,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h4 className="text-sm font-medium text-gray-800">{label}</h4>
          <button
            className="ml-2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info size={14} />
          </button>
        </div>
        <div className="flex items-center">
          <button
            className="text-gray-500 hover:text-gray-700 p-1"
            onClick={() => onChange(Math.max(min, value - step))}
          >
            <Minus size={14} />
          </button>
          <span className="mx-2 text-sm font-semibold">{value}%</span>
          <button
            className="text-gray-500 hover:text-gray-700 p-1"
            onClick={() => onChange(Math.min(max, value + step))}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-indigo-600 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>{min}%</span>
        <span>{max}%</span>
      </div>

      {impact && (
        <div className="mt-1 text-xs text-indigo-600 font-medium">
          Impact on revenue: {impact}
        </div>
      )}

      {showInfo && explanation && (
        <div className="mt-2 p-2 bg-blue-50 rounded-md text-xs text-blue-800">
          {explanation}
        </div>
      )}
    </div>
  );
};

// What-if scenario component
const WhatIfScenario = ({ title, description, currentSettings, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-indigo-100">
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <RevenueDriver
        label="Markdown Percentage"
        value={currentSettings.markdown}
        min={0}
        max={50}
        step={1}
        onChange={(val) => onChange({ ...currentSettings, markdown: val })}
        impact={`${currentSettings.markdown > 20 ? "-" : "+"}₹${Math.abs(
          (currentSettings.markdown - 20) * 0.15
        ).toFixed(2)}Cr`}
        explanation="Markdown percentage directly impacts gross margin. Every 1% increase in markdown typically reduces revenue by approximately ₹0.15Cr while increasing sell-through by 0.5%."
      />

      <RevenueDriver
        label="Sell-through Target"
        value={currentSettings.sellThrough}
        min={50}
        max={100}
        step={1}
        onChange={(val) => onChange({ ...currentSettings, sellThrough: val })}
        impact={`+₹${((currentSettings.sellThrough - 65) * 0.08).toFixed(2)}Cr`}
        explanation="Higher sell-through targets require better inventory planning but reduce end-of-season discounting. Each 1% improvement typically yields ₹0.08Cr in revenue from reduced mark-downs."
      />

      <RevenueDriver
        label="Growth Target"
        value={currentSettings.growth}
        min={0}
        max={25}
        step={0.5}
        onChange={(val) => onChange({ ...currentSettings, growth: val })}
        impact={`+₹${(currentSettings.growth * 0.4).toFixed(2)}Cr`}
        explanation="Growth targets need to be balanced with inventory investment. Each 1% of targeted growth requires approximately ₹0.3Cr in additional inventory and typically yields ₹0.4Cr in revenue."
      />

      <RevenueDriver
        label="New Collection Share"
        value={currentSettings.newCollection}
        min={20}
        max={80}
        step={5}
        onChange={(val) => onChange({ ...currentSettings, newCollection: val })}
        impact={`${currentSettings.newCollection > 50 ? "+" : "-"}₹${Math.abs(
          (currentSettings.newCollection - 50) * 0.06
        ).toFixed(2)}Cr`}
        explanation="New collections typically sell at higher price points but have unpredictable sell-through. The optimal balance is typically around 50-60% new collections."
      />

      <div className="flex justify-between mt-6">
        <button className="text-sm text-indigo-600 font-medium border border-indigo-200 px-3 py-1.5 rounded-md">
          Reset to Current
        </button>
        <button className="text-sm text-white font-medium bg-indigo-600 px-4 py-1.5 rounded-md hover:bg-indigo-700">
          Apply Changes
        </button>
      </div>
    </div>
  );
};

// AI recommendation component for revenue planning
const AIRevenueRecommendation = () => (
  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
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
          <p className="text-xs mt-0.5">
            Historical data shows this is the optimal balance between margin and
            sell-through
          </p>
        </div>
      </li>
      <li className="flex items-start">
        <Check className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-indigo-500" />
        <div>
          <p className="font-medium">Sell-through: 78% (+13% from current)</p>
          <p className="text-xs mt-0.5">
            Achievable with improved inventory allocation based on channel
            performance
          </p>
        </div>
      </li>
      <li className="flex items-start">
        <Check className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-indigo-500" />
        <div>
          <p className="font-medium">Growth: 10.5% (+2.5% from current)</p>
          <p className="text-xs mt-0.5">
            Achievable by capitalizing on ethnic wear momentum and expanding in
            top-performing stores
          </p>
        </div>
      </li>
      <li className="flex items-start">
        <Check className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0 text-indigo-500" />
        <div>
          <p className="font-medium">New Collection: 55% (+5% from current)</p>
          <p className="text-xs mt-0.5">
            Trending categories indicate opportunity for new designs with
            premium pricing
          </p>
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
      <div className="flex justify-between mt-1">
        <span>Inventory Turn</span>
        <span className="font-medium">5.3x (+0.5x)</span>
      </div>
    </div>
    <button className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
      Apply AI Recommendation
    </button>
  </div>
);

// Revenue projection component
const RevenueProjection = ({ settings }) => {
  // Calculate revenue based on settings
  const baseRevenue = 126.8; // Cr
  const markdownImpact = (settings.markdown - 20) * -0.15;
  const sellThroughImpact = (settings.sellThrough - 65) * 0.08;
  const growthImpact = settings.growth * 0.4;
  const newCollectionImpact = (settings.newCollection - 50) * 0.06;

  const projectedRevenue =
    baseRevenue +
    markdownImpact +
    sellThroughImpact +
    growthImpact +
    newCollectionImpact;
  const percentChange = (projectedRevenue / baseRevenue - 1) * 100;

  // Calculate gross margin
  const baseMargin = 53.4; // %
  const markdownMarginImpact = (settings.markdown - 20) * -0.2;
  const sellThroughMarginImpact = (settings.sellThrough - 65) * 0.05;
  const newCollectionMarginImpact = (settings.newCollection - 50) * 0.08;

  const projectedMargin =
    baseMargin +
    markdownMarginImpact +
    sellThroughMarginImpact +
    newCollectionMarginImpact;

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
      <h3 className="font-semibold text-gray-800 mb-3">Revenue Projection</h3>

      <div className="text-3xl font-bold text-indigo-700 mb-2">
        ₹{projectedRevenue.toFixed(1)}Cr
      </div>
      <div
        className={`text-sm font-medium ${
          percentChange >= 0 ? "text-green-600" : "text-red-600"
        } mb-4`}
      >
        {percentChange >= 0 ? (
          <ArrowUp className="h-4 w-4 inline mr-1" />
        ) : (
          <ArrowDown className="h-4 w-4 inline mr-1" />
        )}
        {percentChange.toFixed(1)}% vs Current Projection (₹126.8Cr)
      </div>

      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Metrics</h4>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Gross Margin</span>
            <span className="font-medium">{projectedMargin.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${Math.min(100, projectedMargin)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Inventory Turnover</span>
            <span className="font-medium">
              {(4.8 + (settings.sellThrough - 65) * 0.01).toFixed(1)}x
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{
                width: `${(4.8 + (settings.sellThrough - 65) * 0.01) / 0.08}%`,
              }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Full-price Sell-through</span>
            <span className="font-medium">
              {Math.max(40, 58 + (settings.sellThrough - 65) * 0.6).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{
                width: `${Math.max(
                  40,
                  58 + (settings.sellThrough - 65) * 0.6
                )}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Revenue Drivers
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Base Revenue</span>
            <span className="font-medium">₹126.8Cr</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Markdown Impact</span>
            <span
              className={`font-medium ${
                markdownImpact >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {markdownImpact >= 0 ? "+" : ""}₹{markdownImpact.toFixed(1)}Cr
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sell-through Impact</span>
            <span
              className={`font-medium ${
                sellThroughImpact >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {sellThroughImpact >= 0 ? "+" : ""}₹{sellThroughImpact.toFixed(1)}
              Cr
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Growth Target Impact</span>
            <span
              className={`font-medium ${
                growthImpact >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {growthImpact >= 0 ? "+" : ""}₹{growthImpact.toFixed(1)}Cr
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">New Collection Impact</span>
            <span
              className={`font-medium ${
                newCollectionImpact >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {newCollectionImpact >= 0 ? "+" : ""}₹
              {newCollectionImpact.toFixed(1)}Cr
            </span>
          </div>
          <div className="pt-2 border-t border-gray-100 mt-2">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-gray-800">Total Projected Revenue</span>
              <span className="text-indigo-700">
                ₹{projectedRevenue.toFixed(1)}Cr
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Revenue scenario comparison
const ScenarioComparison = () => (
  <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-800">Scenario Comparison</h3>
      <button className="text-sm text-indigo-600 font-medium">
        + Add Scenario
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Scenario
            </th>
            <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Revenue
            </th>
            <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Margin
            </th>
            <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Inventory
            </th>
            <th className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="py-3 text-sm font-medium text-gray-900">
              Current Projection
            </td>
            <td className="py-3 text-sm text-right text-gray-500">₹126.8Cr</td>
            <td className="py-3 text-sm text-right text-gray-500">53.4%</td>
            <td className="py-3 text-sm text-right text-gray-500">4.8x</td>
            <td className="py-3 text-right">
              <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">
                Edit
              </button>
            </td>
          </tr>
          <tr>
            <td className="py-3 text-sm font-medium text-gray-900">
              Conservative Growth
            </td>
            <td className="py-3 text-sm text-right text-gray-500">₹129.2Cr</td>
            <td className="py-3 text-sm text-right text-gray-500">54.1%</td>
            <td className="py-3 text-sm text-right text-gray-500">4.9x</td>
            <td className="py-3 text-right">
              <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">
                Edit
              </button>
            </td>
          </tr>
          <tr>
            <td className="py-3 text-sm font-medium text-indigo-700">
              AI Recommendation
            </td>
            <td className="py-3 text-sm text-right font-medium text-indigo-700">
              ₹132.5Cr
            </td>
            <td className="py-3 text-sm text-right text-indigo-700">56.2%</td>
            <td className="py-3 text-sm text-right text-indigo-700">5.3x</td>
            <td className="py-3 text-right">
              <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">
                Edit
              </button>
            </td>
          </tr>
          <tr>
            <td className="py-3 text-sm font-medium text-gray-900">
              Aggressive Growth
            </td>
            <td className="py-3 text-sm text-right text-gray-500">₹138.4Cr</td>
            <td className="py-3 text-sm text-right text-gray-500">51.8%</td>
            <td className="py-3 text-sm text-right text-gray-500">4.5x</td>
            <td className="py-3 text-right">
              <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-800">
      <p className="font-medium flex items-center">
        <Info className="h-4 w-4 mr-2" />
        Analysis: The AI recommendation balances growth with margin protection
        and achieves optimal inventory turnover.
      </p>
    </div>
  </div>
);

// SKU Insights component
const SKUInsightList = () => {
  const skuInsights = [
    {
      sku: "SKU 1001",
      name: "Blue Oxford Shirt",
      location: "Mumbai EBO",
      status: "critical",
      issue: "Stockout Risk",
      action: "Replenish ~30 units immediately",
      impact: "₹30K-40K revenue recovery",
      details:
        "Top-seller with only 5 units left in stock, 50 units sold in 4 weeks",
    },
    {
      sku: "SKU 1002",
      name: "Black Denim Jeans",
      location: "Mumbai EBO",
      status: "positive",
      issue: "Strong Full-price Performance",
      action: "Maintain full price",
      impact: "₹5K protected margin (10 units)",
      details: "80% sell-through at full price, on track for 75% target",
    },
    {
      sku: "SKU 4004",
      name: "Winter Jacket – FW24",
      location: "Delhi LFS",
      status: "warning",
      issue: "Aging Inventory",
      action: "Clear with 60% markdown",
      impact: "₹30K cash recovery",
      details:
        "Off-season stock (~10 months old) with 15 units and minimal sales",
    },
    {
      sku: "SKU 7007",
      name: "Classic Polo Tee",
      location: "LFS to Online",
      status: "critical",
      issue: "Channel Imbalance",
      action: "Transfer 20 units to online",
      impact: "₹50K additional revenue",
      details:
        "Online stockout with back-orders, while LFS has 40 surplus units",
    },
    {
      sku: "ET-2347",
      name: "Embroidered Ethnic Top",
      location: "Bangalore Mall",
      status: "critical",
      issue: "Festival Season Stockout Risk",
      action: "Transfer from Delhi + Express Order",
      impact: "Protect ₹18L revenue",
      details:
        "Part of high-demand ethnic collection with 28% higher sell-through than forecast",
    },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              SKU & Item
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Location
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Issue
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Recommended Action
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Impact
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {skuInsights.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div
                    className={`flex-shrink-0 h-2 w-2 rounded-full ${
                      item.status === "critical"
                        ? "bg-red-500"
                        : item.status === "warning"
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.sku}
                    </div>
                    <div className="text-sm text-gray-500">{item.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === "critical"
                      ? "bg-red-100 text-red-800"
                      : item.status === "warning"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {item.issue}
                </span>
                <div className="text-xs text-gray-500 mt-1">{item.details}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{item.action}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                {item.impact}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main dashboard component
const CFODashboard = () => {
  const [activeLevel, setActiveLevel] = useState("brand");
  const [activeTab, setActiveTab] = useState("planning");
  const [scenarioSettings, setScenarioSettings] = useState({
    markdown: 20,
    sellThrough: 65,
    growth: 8,
    newCollection: 50,
  });

  // Brand-level insights
  const brandInsights = [
    {
      icon: AlertTriangle,
      title: "Full-Price Sell-through Below Target",
      description:
        "Current full-price sell-through across all channels is at 65%, below the 75% target for this season.",
      impact: "₹1.8Cr margin erosion projected",
      status: "critical",
      kpi: {
        label: "Full-price sell-through",
        value: "65%",
        change: "-10% vs target",
      },
      rootCause:
        "Analysis shows three primary factors: 1) Over-buying in certain categories leading to excess inventory, 2) Inconsistent pricing strategy across channels creating promotional pressure, and 3) Sub-optimal inventory allocation with high-demand items stocked in low-velocity stores.",
      actions: [
        {
          title: "Adjust Stock-to-Sales Ratio",
          description:
            "Reduce the stock-to-sales ratio from current 1.8 to target 1.5 across all channels with strategic inventory reductions.",
          impact: "₹0.8Cr margin recovery",
        },
        {
          title: "End-of-Season Strategy Revision",
          description:
            "Run a shorter 3-week markdown period with better phasing (10%, 20%, then 30% off) versus current 5-week approach.",
          impact: "₹0.6Cr margin protection",
        },
        {
          title: "Focus on Top 20% SKUs",
          description:
            "Concentrate marketing and prime floor space on the top 20% of SKUs that drive 60% of full-price sales.",
          impact: "8% increase in full-price sell-through",
        },
      ],
    },
    {
      icon: TrendingUp,
      title: "Ethnic Wear Collection Opportunity",
      description:
        "Premium Ethnic Collection showing 28% higher sell-through than forecast, driven by wedding season demand.",
      impact: "₹3.2Cr potential upside if inventory constraints resolved",
      status: "positive",
      kpi: {
        label: "Ethnic wear sell-through",
        value: "93%",
        change: "+28% vs forecast",
      },
      rootCause:
        "Data analysis reveals strong wedding season demand patterns in Mumbai and Bangalore regions. This demand exceeds our pre-season projections by 28%, creating stockout risks but also opportunity for revenue growth if properly managed.",
      actions: [
        {
          title: "Expedite Inventory Replenishment",
          description:
            "Fast-track production and delivery of key ethnic wear styles experiencing high demand (ET-2347, ET-2415).",
          impact: "₹1.2Cr additional revenue capture",
        },
        {
          title: "Strategic Price Management",
          description:
            "Implement a temporary 8% price increase on high-demand, limited-stock ethnic wear items to optimize margin and moderate sales velocity.",
          impact: "₹0.4Cr additional margin",
        },
        {
          title: "Cross-Store Inventory Reallocation",
          description:
            "Transfer ethnic wear inventory from 6 lower-velocity stores to high-demand locations in Mumbai and Bangalore.",
          impact: "Protect ₹32L revenue at risk from stockouts",
        },
      ],
    },
    {
      icon: Clock,
      title: "Aging Inventory Accumulation",
      description:
        "25% of inventory by value is older than 90 days, impacting working capital efficiency and cash flow.",
      impact: "₹50L monthly holding costs + opportunity cost",
      status: "warning",
      kpi: {
        label: "90+ day inventory",
        value: "25%",
        change: "+5% vs target",
      },
      rootCause:
        "Root cause analysis identifies: 1) Cautious markdown strategy delaying liquidation of slow-moving items, 2) Buying patterns not aligned with historical sell-through data leading to overstock in certain categories, and 3) Lack of systematic aging-based liquidation process in key channels.",
      actions: [
        {
          title: "Targeted Clearance Strategy",
          description:
            "Implement 30% markdown on items >90 days old to accelerate liquidation while preserving acceptable margin.",
          impact: "₹1.2M cash flow improvement",
        },
        {
          title: "End-of-Line Channel Optimization",
          description:
            "Create dedicated online clearance section for efficient disposal of aging inventory with broader reach than store-only liquidation.",
          impact: "15% reduction in average inventory age",
        },
        {
          title: "Seasonal Items Markdown",
          description:
            "Clear winter items like SKU 4004 (Winter Jacket) with 50-60% markdown now rather than carrying to next season.",
          impact: "₹30K cash recovery per style cleared",
        },
      ],
    },
  ];

  // Channel-level insights
  const channelInsights = [
    {
      icon: Store,
      title: "EBO Channel Performance Gap",
      description:
        "EBO performance varies widely with Delhi outperforming (+17%) vs Mumbai underperforming (-5.2%).",
      impact: "₹1.2Cr opportunity by standardizing best practices",
      status: "warning",
      kpi: {
        label: "EBO variance",
        value: "22.2%",
        change: "increasing trend",
      },
      rootCause:
        "Comparative analysis of Delhi vs Mumbai stores reveals: 1) Staff scheduling at Mumbai not aligned with footfall patterns, 2) Delhi's superior visual merchandising strategy for ethnic wear collection, and 3) Local inventory allocation not matching regional preferences.",
      actions: [
        {
          title: "Staff Optimization Program",
          description:
            "Realign staff scheduling to match footfall patterns at Mumbai flagship, with 25% more coverage during 5-8pm peak hours.",
          impact: "4% projected conversion increase",
        },
        {
          title: "Visual Merchandising Standardization",
          description:
            "Apply Delhi's successful display strategies across all EBO locations, with focus on premium ethnic and occasion wear.",
          impact: "₹25L weekly revenue improvement",
        },
        {
          title: "Localized Inventory Optimization",
          description:
            "Adjust stock mix in each store based on catchment area preferences and purchase patterns from latest season data.",
          impact: "5-8% improvement in revenue per sq.ft",
        },
      ],
    },
    {
      icon: Globe,
      title: "Online Channel Margin Pressure",
      description:
        "Heavy discounting on marketplace platforms is diluting overall margin by 3.2% compared to direct channels.",
      impact: "₹0.85Cr quarterly margin impact",
      status: "critical",
      kpi: {
        label: "Marketplace margin",
        value: "45.2%",
        change: "-8.2% vs own channels",
      },
      rootCause:
        "Data analysis shows: 1) Marketplace competitors setting aggressive price points forcing reactive discounting, 2) Broad assortment strategy putting premium products into competitive environments where they require discounting, and 3) Channel-agnostic discount strategy not accounting for different platform economics.",
      actions: [
        {
          title: "Marketplace Portfolio Optimization",
          description:
            "Restrict selection on marketplaces to value-focused and exclusive items, keeping premium products on owned channels where margin can be maintained.",
          impact: "2.1% margin improvement",
        },
        {
          title: "Dynamic Pricing Implementation",
          description:
            "Set channel-specific pricing floors based on margin requirements rather than blanket discounting across all platforms.",
          impact: "₹0.4Cr margin recovery",
        },
        {
          title: "D2C Growth Acceleration",
          description:
            "Shift marketing investment from marketplaces to owned digital channels with better economics and customer data capture.",
          impact: "12% projected D2C channel growth",
        },
      ],
    },
  ];

  // POS-level insights
  const posInsights = [
    {
      icon: AlertTriangle,
      title: "Mumbai Flagship Conversion Drop",
      description:
        "Mumbai Flagship conversion rate dropped 5.2% this week, resulting in ₹8.5L weekly revenue impact.",
      impact: "₹34L monthly impact if not addressed",
      status: "critical",
      kpi: {
        label: "Conversion rate",
        value: "32.8%",
        change: "-5.2% vs last week",
      },
      rootCause:
        "Multi-factor analysis reveals: 1) Staffing levels during peak hours (5-8pm) don't match current footfall patterns, 2) Recent visual merchandising changes reduced visibility of best-selling items, and 3) New competitive promotion in adjacent retailer drawing potential customers.",
      actions: [
        {
          title: "Peak Hours Staffing Adjustment",
          description:
            "Increase staff coverage during 5-8pm peak hours by 25% to improve customer experience and conversion.",
          impact: "₹5.2L weekly revenue recovery",
        },
        {
          title: "Visual Merchandising Refresh",
          description:
            "Update store layout focusing on trending ethnic and casual wear categories with proven conversion impact.",
          impact: "Expected 3.5% conversion improvement",
        },
        {
          title: "Localized Promotion Strategy",
          description:
            "Run targeted promotions to counter competitive activity in the vicinity without blanket discounting.",
          impact: "Projected ₹3.2L weekly uplift",
        },
      ],
    },
    {
      icon: TrendingUp,
      title: "Delhi Select Store Success Factors",
      description:
        "Delhi Select store outperforming targets by 17% this month with higher ATV and conversion.",
      impact: "₹12L additional monthly revenue",
      status: "positive",
      kpi: {
        label: "Performance vs target",
        value: "+17%",
        change: "sustained for 3 months",
      },
      rootCause:
        "Success pattern analysis identifies: 1) Optimized staff-to-customer ratio during peak hours, 2) Superior product knowledge and clienteling approach by sales associates, and 3) Store-specific inventory mix aligned with local customer preferences.",
      actions: [
        {
          title: "Best Practice Implementation",
          description:
            "Document and replicate Delhi's customer engagement model across other locations through training and performance tracking.",
          impact: "5-8% improvement at other stores",
        },
        {
          title: "Staff Incentive Program Expansion",
          description:
            "Roll out Delhi's successful staff incentive structure to other locations, rewarding full-price sales and higher ATV.",
          impact: "₹40L annual revenue potential network-wide",
        },
        {
          title: "Product Mix Optimization",
          description:
            "Adjust inventory across network based on Delhi's bestseller patterns, accounting for local market variations.",
          impact: "₹22L quarterly opportunity",
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 h-screen overflow-y-auto">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              House of Anita Dongre
            </h1>
            <p className="text-sm text-gray-500">
              CFO Revenue Optimization Dashboard
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                Sales +7%
              </span>
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                Inventory 4.8x
              </span>
              <span className="px-3 py-1 text-sm font-medium bg-orange-100 text-orange-800 rounded-full">
                Cash ₹4.2Cr
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Last updated: Today, 9:15 AM
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        {/* Morning Briefing - Always Visible */}
        <CollapsibleSection title="Morning Briefing" icon={Coffee}>
          <div className="bg-yellow-50 rounded-lg p-5 border-l-4 border-l-yellow-500">
            <h3 className="font-medium mb-3">
              Good morning! Here&apos;s what you need to know today:
            </h3>
            <ul className="space-y-2">
              <PriorityItem priority="high">
                High priority: 5 ethnic wear SKUs at risk of stockout within 7
                days (₹32L revenue at risk)
              </PriorityItem>
              <PriorityItem priority="high">
                High priority: June cash projection shows ₹1.2Cr shortfall below
                minimum threshold
              </PriorityItem>
              <PriorityItem priority="medium">
                Medium priority: Mumbai Flagship conversion rate dropped 5.2%
                (₹8.5L weekly revenue impact)
              </PriorityItem>
              <PriorityItem priority="positive">
                Positive: Delhi Select store outperforming sales targets by 17%
                this month
              </PriorityItem>
              <PriorityItem priority="positive">
                Positive: Ethnic wear collection showing 28% higher sell-through
                than forecast
              </PriorityItem>
            </ul>
          </div>
        </CollapsibleSection>

        {/* Tab Navigation */}
        <div className="flex bg-white rounded-lg shadow-sm mb-6 mt-6">
          <button
            className={`flex-1 py-3 px-5 text-sm font-medium ${
              activeTab === "planning"
                ? "text-indigo-700 border-b-2 border-indigo-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("planning")}
          >
            <Target className="h-4 w-4 inline mr-2" />
            Revenue Planning
          </button>
          <button
            className={`flex-1 py-3 px-5 text-sm font-medium ${
              activeTab === "current"
                ? "text-indigo-700 border-b-2 border-indigo-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("current")}
          >
            <BarChart3 className="h-4 w-4 inline mr-2" />
            Current Performance
          </button>
          <button
            className={`flex-1 py-3 px-5 text-sm font-medium ${
              activeTab === "optimization"
                ? "text-indigo-700 border-b-2 border-indigo-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("optimization")}
          >
            <Sliders className="h-4 w-4 inline mr-2" />
            Optimization Strategies
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "planning" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">
                Adjust Revenue Drivers
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Modify key revenue drivers to see the impact on overall
                projections and understand optimization opportunities.
              </p>

              <WhatIfScenario
                title="Q3 Revenue Scenario"
                description="Configure parameters to simulate potential revenue outcomes."
                currentSettings={scenarioSettings}
                onChange={setScenarioSettings}
              />
            </div>

            <div className="space-y-6">
              <RevenueProjection settings={scenarioSettings} />
              <AIRevenueRecommendation />
            </div>

            <div className="lg:col-span-2">
              <ScenarioComparison />
            </div>
          </div>
        )}

        {activeTab === "current" && (
          <div>
            <LevelTabs
              activeLevel={activeLevel}
              setActiveLevel={setActiveLevel}
            />

            {activeLevel === "brand" && (
              <div className="space-y-4">
                {brandInsights.map((insight, idx) => (
                  <InsightCard
                    key={idx}
                    icon={insight.icon}
                    title={insight.title}
                    description={insight.description}
                    impact={insight.impact}
                    kpi={insight.kpi}
                    status={insight.status}
                    rootCause={insight.rootCause}
                    actions={insight.actions}
                  />
                ))}
              </div>
            )}

            {activeLevel === "channel" && (
              <div className="space-y-4">
                {channelInsights.map((insight, idx) => (
                  <InsightCard
                    key={idx}
                    icon={insight.icon}
                    title={insight.title}
                    description={insight.description}
                    impact={insight.impact}
                    kpi={insight.kpi}
                    status={insight.status}
                    rootCause={insight.rootCause}
                    actions={insight.actions}
                  />
                ))}

                <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 mt-6">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Channel Performance Comparison
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Channel
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Revenue (MTD)
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Sell-through
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Full-Price %
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Markdown %
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Trend
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            EBO
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹1.8Cr
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            68%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            62%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            20.2%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                            +5%
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            LFS
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹1.2Cr
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            62%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            58%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            25.5%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                            +8%
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Online (In-house)
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹85L
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            73%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            52%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            22.8%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                            +14%
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Online (External)
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹65L
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            73%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            45%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            28.5%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                            +18%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-800">
                    <p className="font-medium flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Key finding: Full-price % is significantly lower in
                      marketplace channels, driving overall margin pressure.
                      Consider channel-specific pricing strategies.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeLevel === "pos" && (
              <div className="space-y-4">
                {posInsights.map((insight, idx) => (
                  <InsightCard
                    key={idx}
                    icon={insight.icon}
                    title={insight.title}
                    description={insight.description}
                    impact={insight.impact}
                    kpi={insight.kpi}
                    status={insight.status}
                    rootCause={insight.rootCause}
                    actions={insight.actions}
                  />
                ))}

                <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 mt-6">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Top & Bottom Performing Stores
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Store
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Performance
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Key Metrics
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Primary Driver
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="bg-green-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Delhi Select
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                            +17% vs target
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Conversion: 42%
                            <br />
                            ATV: ₹4,850
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            Optimized staffing model and superior product
                            knowledge
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                            Replicate model
                          </td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Bangalore Mall
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                            +9% vs target
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Conversion: 36%
                            <br />
                            ATV: ₹4,250
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            Strong ethnic wear demand in catchment area
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                            Increase ethnic allocation
                          </td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Mumbai Flagship
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                            -5.2% conversion drop
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Conversion: 32.8%
                            <br />
                            ATV: ₹4,450
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            Staffing misalignment with peak traffic periods
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                            Optimize staffing
                          </td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Pune Central
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                            -8% vs target
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Conversion: 28%
                            <br />
                            ATV: ₹3,850
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            Product mix not aligned with local preferences
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                            Adjust product mix
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeLevel === "sku" && <SKUInsightList />}
          </div>
        )}

        {activeTab === "optimization" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-l-indigo-500">
              <h3 className="font-semibold text-gray-800 mb-3">
                Top 3 Revenue Optimization Opportunities
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-lg">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">
                      Markdown Strategy Optimization
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Implement a data-driven, tiered markdown approach based on
                      SKU performance segmentation.
                    </p>
                    <div className="mt-1 text-sm text-indigo-600 font-medium">
                      Impact: ₹3.2Cr annual margin improvement
                    </div>
                    <button className="mt-2 text-xs text-indigo-600 font-medium flex items-center">
                      See detailed plan{" "}
                      <ChevronsRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-lg">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">
                      Ethnic Wear Collection Expansion
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Capitalize on 28% higher than forecast demand with
                      inventory reallocation and express production.
                    </p>
                    <div className="mt-1 text-sm text-indigo-600 font-medium">
                      Impact: ₹3.2Cr potential revenue upside
                    </div>
                    <button className="mt-2 text-xs text-indigo-600 font-medium flex items-center">
                      See detailed plan{" "}
                      <ChevronsRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-lg">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">
                      Channel-Specific Pricing Strategy
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Implement differentiated pricing across channels based on
                      customer behavior and channel economics.
                    </p>
                    <div className="mt-1 text-sm text-indigo-600 font-medium">
                      Impact: ₹3.4Cr annual margin improvement
                    </div>
                    <button className="mt-2 text-xs text-indigo-600 font-medium flex items-center">
                      See detailed plan{" "}
                      <ChevronsRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
              <div className="flex items-start">
                <Zap className="h-5 w-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-indigo-800 mb-2">
                    AI Revenue Optimization Strategy
                  </h3>
                  <p className="text-sm text-indigo-700 mb-3">
                    Based on comprehensive analysis of all data points, a
                    coordinated strategy across these dimensions would maximize
                    revenue:
                  </p>

                  <div className="space-y-4 mb-4">
                    <div className="bg-white rounded-md p-3">
                      <h4 className="text-sm font-medium text-indigo-900 mb-1">
                        1. Markdown Management (₹3.2Cr impact)
                      </h4>
                      <p className="text-xs text-indigo-800">
                        Implement 4-tier markdown strategy with SKU-specific
                        timing based on sell-through velocity, rather than
                        calendar-based approach.
                      </p>
                    </div>

                    <div className="bg-white rounded-md p-3">
                      <h4 className="text-sm font-medium text-indigo-900 mb-1">
                        2. Inventory Reallocation (₹4.2Cr impact)
                      </h4>
                      <p className="text-xs text-indigo-800">
                        Establish weekly cross-channel rebalancing focused on 5
                        high-impact SKUs and ethnic wear collection to prevent
                        stockouts.
                      </p>
                    </div>

                    <div className="bg-white rounded-md p-3">
                      <h4 className="text-sm font-medium text-indigo-900 mb-1">
                        3. Store Performance Standardization (₹2.8Cr impact)
                      </h4>
                      <p className="text-xs text-indigo-800">
                        Scale Delhi's successful operating model to
                        underperforming stores, focusing on staffing patterns
                        and visual merchandising.
                      </p>
                    </div>

                    <div className="bg-white rounded-md p-3">
                      <h4 className="text-sm font-medium text-indigo-900 mb-1">
                        4. Online Channel Optimization (₹2.2Cr impact)
                      </h4>
                      <p className="text-xs text-indigo-800">
                        Shift premium products from marketplaces to owned
                        channels and implement channel-specific pricing floors
                        to protect margins.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-md p-3 mb-4">
                    <h4 className="text-sm font-medium text-indigo-900 mb-1">
                      Combined Impact
                    </h4>
                    <div className="text-2xl font-bold text-indigo-700">
                      ₹12.4Cr
                    </div>
                    <p className="text-xs text-indigo-800">
                      Potential annual revenue improvement through coordinated
                      optimization
                    </p>
                  </div>

                  <button className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                    Generate Detailed Implementation Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CFODashboard;

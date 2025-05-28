"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ShoppingBag,
  Store,
  Users,
  BarChart2,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const DashboardContent = () => {
  // State variables
  const [activeCategory, setActiveCategory] = useState("business");
  const [showConversation, setShowConversation] = useState(false);
  const [activeInsight, setActiveInsight] = useState(null);
  const [conversationMode, setConversationMode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);

  // Brand colors
  const brandColors = {
    primary: "#8B4513", // Rich earthy brown (signature Anita Dongre color)
    secondary: "#DAA520", // Golden accent
    tertiary: "#006400", // Deep green (sustainability focus)
    light: "#FFFAF0", // Floral white for background
    dark: "#3D2B1F", // Dark brown for text
    accent1: "#CD5C5C", // Indian red
    aiBackground: "#F5F0E5", // Warm beige for AI sections
    aiAccent: "#8B4513", // Using brand primary for AI accent
    aiText: "#5D4037", // Deep brown for AI text
  };

  // Dashboard categories with icons
  const categories = [
    { id: "business", name: "Business Health", icon: <TrendingUp size={18} /> },
    {
      id: "inventory",
      name: "Inventory Allocation",
      icon: <ShoppingBag size={18} />,
    },
    { id: "stores", name: "Store Performance", icon: <Store size={18} /> },
    {
      id: "assortment",
      name: "Assortment & Size-Mix",
      icon: <Users size={18} />,
    },
    { id: "channels", name: "Channel Demand", icon: <BarChart2 size={18} /> },
    {
      id: "returns",
      name: "Returns & After-Sales",
      icon: <RefreshCw size={18} />,
    },
    { id: "lostSales", name: "Lost Sales", icon: <AlertCircle size={18} /> },
  ];

  // Sample data for visualizations
  const salesTrendData = [
    { name: "Mon", actual: 400, target: 420 },
    { name: "Tue", actual: 380, target: 420 },
    { name: "Wed", actual: 440, target: 420 },
    { name: "Thu", actual: 390, target: 420 },
    { name: "Fri", actual: 370, target: 420 },
    { name: "Sat", actual: 500, target: 450 },
    { name: "Sun", actual: 380, target: 450 },
  ];

  // Business insights data
  const insights = {
    business: [
      {
        title: "Total Sales vs Target",
        value: "₹1.25 Cr",
        description:
          "Yesterday's sales were 8% below plan, driven mostly by under-performance in the West region.",
        trend: "down",
        trendValue: "8%",
        action: "Alert regional managers to review promotion strategy",
        highlight: "Sales tracking 8% below daily target",
        aiInsight:
          "I've noticed this downward trend over the past 3 days. The West region seems particularly affected - we might need to respond to the competitor promotions quickly.",
        visual: (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="actual"
                stroke={brandColors.primary}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#777777"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ),
        reportData: {
          summary:
            "Sales have been tracking below target for the past three days, with the West region showing the most significant gap at 12% below expected figures.",
          detailedAnalysis: {
            regionalBreakdown: [
              {
                region: "West",
                actualSales: "₹42.5 lakhs",
                targetSales: "₹48.3 lakhs",
                gap: "-12%",
                storeCount: 12,
              },
              {
                region: "North",
                actualSales: "₹38.2 lakhs",
                targetSales: "₹40.1 lakhs",
                gap: "-5%",
                storeCount: 9,
              },
              {
                region: "South",
                actualSales: "₹29.8 lakhs",
                targetSales: "₹30.5 lakhs",
                gap: "-2%",
                storeCount: 7,
              },
              {
                region: "East",
                actualSales: "₹14.5 lakhs",
                targetSales: "₹15.1 lakhs",
                gap: "-4%",
                storeCount: 5,
              },
            ],
            categoryPerformance: [
              {
                category: "Ethnic Wear",
                performance: "-15%",
                inventory: "High",
                recommendation: "Flash Sale",
              },
              {
                category: "Fusion Collection",
                performance: "-9%",
                inventory: "Medium",
                recommendation: "Bundle Offers",
              },
              {
                category: "Western Wear",
                performance: "-3%",
                inventory: "Low",
                recommendation: "Maintain Current",
              },
              {
                category: "Accessories",
                performance: "+4%",
                inventory: "Low",
                recommendation: "Increase Stock",
              },
            ],
            competitorAnalysis: [
              {
                competitor: "Ritu Kumar",
                promotion: "Buy 1 Get 1",
                impact: "High",
                category: "Premium Kurtas",
              },
              {
                competitor: "Fabindia",
                promotion: "30% Off",
                impact: "Medium",
                category: "Ethnic Wear",
              },
              {
                competitor: "Global Desi",
                promotion: "Clearance Sale",
                impact: "Medium",
                category: "Fusion Wear",
              },
            ],
            historicalContext: {
              weeklyTrend: [
                { week: "Apr 6-12", performance: "+2%" },
                { week: "Apr 13-19", performance: "+1%" },
                { week: "Apr 20-26", performance: "-8%" },
              ],
              seasonalComparison:
                "Current sales are 5% below same period last year despite 3 more stores",
            },
            hourlyAnalysis: [
              {
                timeSlot: "10:00-12:00",
                conversionRate: "18%",
                avgTicket: "₹4,200",
                change: "-2%",
              },
              {
                timeSlot: "12:00-15:00",
                conversionRate: "22%",
                avgTicket: "₹5,100",
                change: "-5%",
              },
              {
                timeSlot: "15:00-18:00",
                conversionRate: "25%",
                avgTicket: "₹5,500",
                change: "-8%",
              },
              {
                timeSlot: "18:00-21:00",
                conversionRate: "32%",
                avgTicket: "₹6,200",
                change: "-12%",
              },
            ],
          },
          factors: [
            "Holiday weekend traditionally shows higher footfall but conversion rates dipped by 3%",
            "Three competitors launched major promotions simultaneously",
            "Premium kurta collection is underperforming across all regions",
            "Evening shopping hours (6-9pm) show the most significant decline of 12%",
            "West region stores near Ritu Kumar locations showing 18% drop in sales",
          ],
          recommendations: [
            "Run a flash sale for the next 48 hours targeting the West region",
            "Push notification to loyalty customers about new arrivals",
            "Intensify visual merchandising updates in top 5 West region stores",
            "Implement evening-only promotions (6-9pm) to counter competitor traffic",
            "Offer bundle discounts on premium kurta collection with accessories",
          ],
          financialImpact: {
            lostRevenue: "₹7.2 lakhs yesterday alone",
            projectedRecovery: "₹5.1 lakhs if all recommendations implemented",
            implementationCost: "₹1.2 lakhs (primarily marketing spend)",
            netBenefit: "₹3.9 lakhs projected over 48 hours",
          },
        },
      },
      {
        title: "Aggregate Sell-through Rate",
        value: "32%",
        description:
          "Overall sell-through ran at 32% (vs. 35% last week), flagging a mild slow-down.",
        trend: "down",
        trendValue: "3%",
        action: "Review slow-moving SKUs for potential early markdown",
        highlight: "Sell-through down 3% from last week",
        aiInsight:
          "The sell-through slowdown is especially concerning with the fusion collection. I'd suggest targeted markdowns before the seasonal change rather than waiting.",
      },
      {
        title: "Inventory Cover Trend",
        value: "6.2 days",
        highlight: "Days of cover rising faster than sell-through rate",
        description:
          "Total days-of-cover ticked up to 6.2 days (vs. 5.5 days target), suggesting inventory is building faster than sell-through.",
        trend: "up",
        trendValue: "12%",
        action: "Slow new inventory purchasing for next 7 days",
        aiInsight:
          "I've noticed this is the third consecutive day of increasing inventory cover. With warehouse space at 83% capacity, we should act quickly on this.",
        visual: (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { day: "Mon", cover: 5.5 },
                { day: "Tue", cover: 5.6 },
                { day: "Wed", cover: 5.7 },
                { day: "Thu", cover: 5.9 },
                { day: "Fri", cover: 6.0 },
                { day: "Sat", cover: 6.2 },
                { day: "Sun", cover: 6.2 },
              ]}
            >
              <defs>
                <linearGradient id="colorCover" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={brandColors.tertiary}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={brandColors.tertiary}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} />
              <YAxis domain={[5, 6.5]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="cover"
                stroke={brandColors.tertiary}
                fillOpacity={1}
                fill="url(#colorCover)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ),
      },
    ],
    inventory: [
      {
        title: "Top Over-stocked Store",
        value: "DLF Emporio (Delhi)",
        highlight: "45% excess inventory worth ₹2 lakhs",
        description:
          "DLF Emporio (Delhi) has 45% more stock than its base allocation, tying up an extra ₹2 lakhs in inventory.",
        trend: "up",
        trendValue: "45%",
        action: "Transfer excess inventory to understock stores",
      },
    ],
    stores: [
      {
        title: "Under-performing Store",
        value: "Select Citywalk",
        highlight: "Zero sales on 7 days this month",
        description:
          "Select Citywalk (Delhi) hasn't sold any unit in 7 of the last 30 days—footfall is down 22% month-on-month.",
        trend: "down",
        trendValue: "22%",
        action: "Schedule emergency store review meeting",
      },
    ],
    assortment: [
      {
        title: "High Cut-Size Imbalance",
        value: "Size S",
        highlight: "Size S: 40% of stock but only 18% of sales",
        description:
          "Size S accounts for 40% of current stock but only 18% of sales – potential markdown stock.",
        action: "Adjust size ratio for upcoming manufacture orders",
        visual: (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { size: "XS", stock: 15, sales: 10 },
                { size: "S", stock: 40, sales: 18 },
                { size: "M", stock: 25, sales: 32 },
                { size: "L", stock: 12, sales: 25 },
                { size: "XL", stock: 8, sales: 15 },
              ]}
              barGap={0}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="size" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" name="% Stock" fill={brandColors.primary} />
              <Bar
                dataKey="sales"
                name="% Sales"
                fill={brandColors.secondary}
              />
            </BarChart>
          </ResponsiveContainer>
        ),
      },
    ],
    channels: [
      {
        title: "E-com vs. Brick-n-Mortar",
        value: "+22% vs +5%",
        highlight: "Online orders growing 4× faster than stores",
        description:
          "Online orders rose 22% yesterday, outpacing store growth of 5% – shift promo budget accordingly.",
        action: "Reallocate 15% of store promo budget to digital",
      },
    ],
    returns: [
      {
        title: "Returns Rate by Category",
        value: "18% Ethnic Wear",
        highlight: "Ethnic wear returning at 18% vs 12% average",
        description:
          "Ethnic wear is returning at 18% vs. total returns of 12%; quality team to inspect top-returned SKUs.",
        trend: "up",
        trendValue: "+6%",
        action: "Order quality inspection of top 5 returned ethnic wear SKUs",
      },
    ],
    lostSales: [
      {
        title: "Out-of-Stock Revenue Loss",
        value: "₹2.5 lakhs",
        highlight: "Top-10 SKUs stockouts cost ₹2.5 lakhs yesterday",
        description:
          "Estimated ₹2.5 lakhs lost yesterday from stockouts on top-10 SKUs.",
        action: "Expedite restock of top 5 out-of-stock SKUs",
      },
    ],
  };

  // Helper function to get AI greeting
  const getAIGreeting = (insight) => {
    if (!insight) return "Hello! How can I help you today?";

    return `I've analyzed the data on ${insight.title} and noticed patterns that need attention. Would you like to discuss specific actions or see a deeper analysis?`;
  };

  // Helper function to generate AI response
  const generateAIResponse = (userInput, insight) => {
    return `Based on my analysis of ${insight.title}, I recommend addressing ${insight.description} promptly. The most effective approach would be to ${insight.action}. Would you like more details?`;
  };

  // Function to open conversation panel
  const openConversation = (insight, mode) => {
    setActiveInsight(insight);
    setConversationMode(mode);
    setShowConversation(true);

    // Initialize conversation with AI greeting
    if (mode === "discuss") {
      const initialMessage = {
        sender: "ai",
        text: getAIGreeting(insight),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setConversation([initialMessage]);
    }
  };

  // Function to close conversation panel
  const closeConversation = () => {
    setShowConversation(false);
    setActiveInsight(null);
    setConversation([]);
    setUserInput("");
  };

  // Function to handle sending messages
  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const userMessage = {
      sender: "user",
      text: userInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Clear input field
    setUserInput("");

    // Update conversation with user message
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);

    // Generate AI response
    setTimeout(() => {
      const aiResponse = {
        sender: "ai",
        text: generateAIResponse(userInput, activeInsight),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setConversation([...updatedConversation, aiResponse]);
    }, 500);
  };

  // Insight Card component
  const InsightCard = ({ insight, openConversation }) => {
    const {
      title,
      value,
      description,
      trend,
      trendValue,
      action,
      highlight,
      visual,
      aiInsight,
    } = insight;

    return (
      <div
        className="bg-white rounded-lg shadow p-6 h-full flex flex-col border-l-4 hover:shadow-lg transition-all duration-300"
        style={{ borderLeftColor: brandColors.primary }}
      >
        {/* Title and Trend Indicator */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg text-gray-800">{title}</h3>
          {trend && (
            <div
              className={`flex items-center text-xs font-medium rounded-full px-2 py-1 ${
                trend === "up"
                  ? title.includes("Returns") || title.includes("Stockout")
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                  : title.includes("Sales") || title.includes("Revenue")
                  ? "bg-red-100 text-red-600"
                  : "bg-amber-100 text-amber-600"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp size={12} className="mr-1" />
              ) : (
                <TrendingDown size={12} className="mr-1" />
              )}
              {trendValue}
            </div>
          )}
        </div>

        {/* Key Value and Highlight */}
        <div className="mb-3">
          <div
            className="text-2xl font-semibold"
            style={{ color: brandColors.dark }}
          >
            {value}
          </div>
          {highlight && (
            <div className="text-sm font-medium mt-1 text-amber-700 bg-amber-50 px-3 py-1 rounded-sm inline-block">
              {highlight}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 flex-grow">{description}</p>

        {/* AI Assistant Insight */}
        {aiInsight && (
          <div
            className="mb-4 p-3 rounded-lg border-l-4"
            style={{
              backgroundColor: brandColors.aiBackground,
              borderLeftColor: brandColors.aiAccent,
            }}
          >
            <p className="text-sm" style={{ color: brandColors.aiText }}>
              {aiInsight}
            </p>
          </div>
        )}

        {/* Visual (if available) */}
        {visual && <div className="my-3 h-32">{visual}</div>}

        {/* Action Button (if available) */}
        {action && (
          <div className="mb-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded text-sm">
              <span className="font-medium text-amber-800">
                Suggested Next Step:
              </span>
              <p className="text-amber-700 mt-1">{action}</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-auto pt-3 border-t border-gray-100">
          <button
            className="text-sm flex items-center px-3 py-1.5 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => openConversation(insight, "report")}
          >
            Detailed Analysis <BarChart2 size={14} className="ml-1" />
          </button>

          <button
            className="text-sm flex items-center px-3 py-1.5 rounded-md text-white transition-colors"
            style={{ backgroundColor: brandColors.primary }}
            onClick={() => openConversation(insight, "discuss")}
          >
            Discuss <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    );
  };

  // Render report panel content
  const renderReportContent = () => {
    if (!activeInsight) return null;

    return (
      <div className="space-y-6">
        {/* Executive Summary */}
        <div>
          <h4
            className="font-medium text-lg mb-2"
            style={{ color: brandColors.primary }}
          >
            Executive Summary
          </h4>
          <div
            className="bg-amber-50 p-4 rounded-lg mb-6 border-l-4"
            style={{ borderLeftColor: brandColors.secondary }}
          >
            <p className="text-gray-700">
              {activeInsight.reportData?.summary ||
                `Detailed analysis for ${activeInsight.title} showing ${
                  activeInsight.value
                } with a ${
                  activeInsight.trend === "up" ? "positive" : "negative"
                } trend of ${activeInsight.trendValue}.`}
            </p>
          </div>
          {activeInsight.aiInsight && (
            <div
              className="p-4 rounded-lg mb-6 border-l-4"
              style={{
                backgroundColor: brandColors.aiBackground,
                borderLeftColor: brandColors.aiAccent,
              }}
            >
              <p
                className="text-sm mb-1 font-medium"
                style={{ color: brandColors.aiAccent }}
              >
                Analysis
              </p>
              <p className="text-sm" style={{ color: brandColors.aiText }}>
                {activeInsight.aiInsight}
              </p>
            </div>
          )}
        </div>

        {/* Regional Breakdown */}
        {activeInsight.reportData?.detailedAnalysis?.regionalBreakdown && (
          <div className="mb-6 bg-white p-4 rounded-lg border border-gray-100">
            <h5 className="text-md font-medium mb-3">
              Regional Sales Performance
            </h5>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Region
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actual
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Target
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gap
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stores
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeInsight.reportData.detailedAnalysis.regionalBreakdown.map(
                    (region, index) => (
                      <tr
                        key={index}
                        className={
                          region.gap.includes("-12") ? "bg-red-50" : ""
                        }
                      >
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {region.region}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {region.actualSales}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {region.targetSales}
                        </td>
                        <td
                          className={`px-4 py-2 whitespace-nowrap text-sm ${
                            region.gap.startsWith("-")
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {region.gap}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {region.storeCount}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Category Performance */}
        {activeInsight.reportData?.detailedAnalysis?.categoryPerformance && (
          <div className="mb-6 bg-white p-4 rounded-lg border border-gray-100">
            <h5 className="text-md font-medium mb-3">Category Performance</h5>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inventory
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recommendation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeInsight.reportData.detailedAnalysis.categoryPerformance.map(
                    (category, index) => (
                      <tr
                        key={index}
                        className={
                          category.performance.includes("-15")
                            ? "bg-red-50"
                            : ""
                        }
                      >
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {category.category}
                        </td>
                        <td
                          className={`px-4 py-2 whitespace-nowrap text-sm ${
                            category.performance.startsWith("-")
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {category.performance}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {category.inventory}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {category.recommendation}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Competitor Analysis */}
        {activeInsight.reportData?.detailedAnalysis?.competitorAnalysis && (
          <div className="mb-6 bg-white p-4 rounded-lg border border-gray-100">
            <h5 className="text-md font-medium mb-3">Competitor Analysis</h5>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Competitor
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Promotion
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Impact
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeInsight.reportData.detailedAnalysis.competitorAnalysis.map(
                    (competitor, index) => (
                      <tr
                        key={index}
                        className={
                          competitor.impact === "High" ? "bg-red-50" : ""
                        }
                      >
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {competitor.competitor}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {competitor.promotion}
                        </td>
                        <td
                          className={`px-4 py-2 whitespace-nowrap text-sm ${
                            competitor.impact === "High"
                              ? "text-red-600 font-medium"
                              : "text-amber-600"
                          }`}
                        >
                          {competitor.impact}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {competitor.category}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Hourly Analysis */}
        {activeInsight.reportData?.detailedAnalysis?.hourlyAnalysis && (
          <div className="mb-6 bg-white p-4 rounded-lg border border-gray-100">
            <h5 className="text-md font-medium mb-3">
              Time-of-Day Performance
            </h5>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Slot
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Ticket
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeInsight.reportData.detailedAnalysis.hourlyAnalysis.map(
                    (timeSlot, index) => (
                      <tr
                        key={index}
                        className={
                          timeSlot.change === "-12%" ? "bg-red-50" : ""
                        }
                      >
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {timeSlot.timeSlot}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {timeSlot.conversionRate}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {timeSlot.avgTicket}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600">
                          {timeSlot.change}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Historical Context */}
        {activeInsight.reportData?.detailedAnalysis?.historicalContext && (
          <div className="mb-6 bg-white p-4 rounded-lg border border-gray-100">
            <h5 className="text-md font-medium mb-3">Historical Context</h5>
            <div className="mb-3">
              <p className="text-sm text-gray-700 italic">
                {
                  activeInsight.reportData.detailedAnalysis.historicalContext
                    .seasonalComparison
                }
              </p>
            </div>
            <h6 className="text-sm font-medium mb-2 text-gray-700">
              Weekly Performance Trend
            </h6>
            <div className="flex items-center space-x-2">
              {activeInsight.reportData.detailedAnalysis.historicalContext.weeklyTrend.map(
                (week, index) => (
                  <div
                    key={index}
                    className={`px-3 py-2 rounded ${
                      week.performance.startsWith("+")
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <div className="text-xs text-gray-600">{week.week}</div>
                    <div
                      className={`text-sm font-medium ${
                        week.performance.startsWith("+")
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {week.performance}
                    </div>
                  </div>
                )
              )}
              <div className="w-5 h-0.5 bg-gray-300"></div>
              <div className="px-3 py-2 rounded bg-gray-100">
                <div className="text-xs text-gray-600">Current Week</div>
                <div className="text-sm font-medium text-red-700">-8%</div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Impact */}
        {activeInsight.reportData?.financialImpact && (
          <div className="mb-6 bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
            <h5 className="text-md font-medium mb-3 text-amber-800">
              Financial Impact Analysis
            </h5>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Lost Revenue:
                </p>
                <p className="text-sm text-amber-700">
                  {activeInsight.reportData.financialImpact.lostRevenue}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Projected Recovery:
                </p>
                <p className="text-sm text-green-700">
                  {activeInsight.reportData.financialImpact.projectedRecovery}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Implementation Cost:
                </p>
                <p className="text-sm text-amber-700">
                  {activeInsight.reportData.financialImpact.implementationCost}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Net Benefit:
                </p>
                <p className="text-sm text-green-700">
                  {activeInsight.reportData.financialImpact.netBenefit}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Visualization (if available) */}
        {activeInsight.visual && (
          <div className="mb-6 bg-white p-4 rounded-lg border border-gray-100">
            <h5 className="text-md font-medium mb-3">Trend Analysis</h5>
            <div className="h-64">{activeInsight.visual}</div>
          </div>
        )}

        {/* Contributing Factors */}
        {activeInsight.reportData?.factors && (
          <div className="mb-6">
            <h5 className="text-md font-medium mb-3">Key Factors</h5>
            <ul className="space-y-2 pl-5 text-gray-700 list-disc">
              {activeInsight.reportData.factors.map((factor, index) => (
                <li key={index} className="text-sm">
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h5 className="text-md font-medium mb-3 text-green-800">
            Recommended Actions
          </h5>
          {activeInsight.reportData?.recommendations ? (
            <ul className="space-y-2 text-green-800">
              {activeInsight.reportData.recommendations.map(
                (recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1 text-green-600">•</div>
                    <span className="text-sm">{recommendation}</span>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="text-sm text-green-800">{activeInsight.action}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="h-screen overflow-auto bg-gray-50"
      style={{ backgroundColor: brandColors.light }}
    >
      {/* Header */}
      <header
        className="bg-white shadow-sm"
        style={{ borderBottom: `3px solid ${brandColors.primary}` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1
              className="text-2xl font-semibold"
              style={{ color: brandColors.primary }}
            >
              Ava Retail
            </h1>
            <span className="ml-4 text-sm text-gray-500">
              Leadership Dashboard
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Last updated: 27 Apr, 2025 • 08:30 AM
            </span>
            <div
              className="flex items-center"
              style={{
                backgroundColor: brandColors.aiBackground,
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: `1px solid ${brandColors.aiAccent}`,
                opacity: 0.9,
              }}
            >
              <p className="text-sm" style={{ color: brandColors.aiText }}>
                8 insights requiring attention today
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* AI Assistant Welcome Panel - Morning Briefing */}
        <div
          className="mb-8 rounded-lg shadow p-6 border"
          style={{
            backgroundColor: brandColors.aiBackground,
            borderColor: brandColors.aiAccent,
          }}
        >
          <div className="flex items-start">
            <div className="flex-grow">
              <h2
                className="text-xl font-medium mb-4"
                style={{ color: brandColors.aiAccent }}
              >
                Daily Retail Intelligence Briefing
              </h2>
              <div className="mb-4" style={{ color: brandColors.aiText }}>
                <p className="mb-3">
                  The retail landscape is showing concerning trends in the last
                  24 hours that require immediate attention. Sales are tracking
                  8% below target, with a particularly troubling 12% decline in
                  the West region that correlates directly with three major
                  competitor promotions launched yesterday.
                </p>
                <p className="mb-3">Most urgent issues identified:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>
                    Inventory cover has increased to 6.2 days, exceeding our 5.5
                    day target
                  </li>
                  <li>
                    Size S items comprise 40% of stock but only 18% of sales,
                    suggesting a significant imbalance
                  </li>
                  <li>
                    Select Citywalk location recorded zero sales on 7 days this
                    month
                  </li>
                </ul>
                <p>
                  Primary recommendation: Launch targeted 48-hour flash sale in
                  West region to counter competitor promotions, with special
                  focus on premium kurta collections.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  className="px-3 py-1.5 rounded-full text-xs font-medium hover:bg-opacity-90 transition-colors"
                  style={{
                    backgroundColor: brandColors.aiAccent,
                    color: "white",
                  }}
                  onClick={() => setActiveCategory("business")}
                >
                  Review sales performance
                </button>
                <button
                  className="px-3 py-1.5 rounded-full text-xs font-medium hover:bg-opacity-90 transition-colors"
                  style={{
                    backgroundColor: brandColors.aiAccent,
                    color: "white",
                  }}
                  onClick={() => setActiveCategory("returns")}
                >
                  Review ethnic wear returns
                </button>
                <button
                  className="px-3 py-1.5 rounded-full text-xs font-medium hover:bg-opacity-90 transition-colors"
                  style={{
                    backgroundColor: brandColors.aiAccent,
                    color: "white",
                  }}
                  onClick={() => setActiveCategory("assortment")}
                >
                  Address size imbalance
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <h2
            className="text-xl font-medium mb-4"
            style={{ color: brandColors.dark }}
          >
            Focus Areas
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`flex items-center px-5 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
                style={{
                  backgroundColor:
                    activeCategory === category.id ? brandColors.primary : "",
                  borderLeft:
                    activeCategory === category.id
                      ? `4px solid ${brandColors.secondary}`
                      : "",
                }}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-3">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Title & Description */}
        <div className="mb-8 border-b pb-4 flex justify-between items-end">
          <div>
            <h2
              className="text-2xl font-semibold mb-2"
              style={{ color: brandColors.dark }}
            >
              {categories.find((c) => c.id === activeCategory)?.name} Insights
            </h2>
            <p className="text-gray-600">
              Key observations requiring attention and potential action
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-sm" style={{ color: brandColors.aiText }}>
              {activeCategory === "business" &&
                "3 critical business issues identified today"}
              {activeCategory === "inventory" &&
                "1 notable inventory allocation concern"}
              {activeCategory === "stores" &&
                "1 store requires immediate attention"}
              {activeCategory === "assortment" &&
                "Size mix imbalance affecting profitability"}
              {activeCategory === "channels" &&
                "Online growth outpacing physical stores 4:1"}
              {activeCategory === "returns" &&
                "Ethnic wear returns significantly above average"}
              {activeCategory === "lostSales" &&
                "Stockouts causing substantial revenue loss"}
            </p>
          </div>
        </div>

        {/* Insights Cards - Single Column Layout */}
        <div className="mx-auto space-y-6">
          {insights[activeCategory] &&
            insights[activeCategory].map((insight, index) => (
              <InsightCard
                key={index}
                insight={insight}
                openConversation={openConversation}
              />
            ))}
        </div>
      </main>

      {/* Conversation/Report Panel */}
      {showConversation && activeInsight && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-3/4 flex flex-col">
            {/* Header */}
            <div
              className="flex justify-between items-center p-4 border-b"
              style={{ borderColor: brandColors.light }}
            >
              <div className="flex items-center">
                <div>
                  <h3 className="font-medium text-lg">{activeInsight.title}</h3>
                  <p className="text-sm text-gray-500">
                    {conversationMode === "discuss"
                      ? "Interactive Discussion"
                      : "Detailed Analysis"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeConversation}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-auto">
              {conversationMode === "discuss" ? (
                <div className="flex flex-col h-full">
                  {/* Chat Messages */}
                  <div className="flex-grow p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {conversation.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-3/4 rounded-lg p-3 ${
                              message.sender === "user"
                                ? "bg-gray-100 text-gray-900"
                                : brandColors.aiBackground
                            }`}
                          >
                            {message.sender === "ai" && (
                              <div className="flex items-center mb-1">
                                <span className="text-xs text-gray-500">
                                  {message.timestamp}
                                </span>
                              </div>
                            )}
                            <p
                              className={`text-sm ${
                                message.sender === "user" ? "text-gray-800" : ""
                              }`}
                              style={
                                message.sender === "ai"
                                  ? { color: brandColors.aiText }
                                  : {}
                              }
                            >
                              {message.text}
                            </p>
                            {message.sender === "user" && (
                              <div className="flex justify-end mt-1">
                                <span className="text-xs text-gray-500">
                                  {message.timestamp}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-end">
                      <div className="flex-grow mr-2">
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none"
                          placeholder="Ask about this insight..."
                          rows="2"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                        />
                        <div className="mt-2 text-xs text-gray-500 flex items-center">
                          <span>Suggested questions:</span>
                          <div className="flex ml-2">
                            <button
                              className="ml-1 px-2 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                              onClick={() =>
                                setUserInput("Why is this happening?")
                              }
                            >
                              Why?
                            </button>
                            <button
                              className="ml-1 px-2 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                              onClick={() => setUserInput("What should we do?")}
                            >
                              Solutions?
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        className="px-4 py-3 rounded-md text-white flex items-center"
                        style={{ backgroundColor: brandColors.primary }}
                        onClick={handleSendMessage}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 overflow-auto">{renderReportContent()}</div>
              )}
            </div>

            {/* Footer for Report Mode */}
            {conversationMode === "report" && (
              <div
                className="p-4 border-t flex justify-between items-center"
                style={{ borderColor: brandColors.light }}
              >
                <span className="text-sm text-gray-500">
                  Generated on April 27, 2025
                </span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
                    Export PDF
                  </button>
                  <button
                    className="px-4 py-2 rounded text-white"
                    style={{ backgroundColor: brandColors.primary }}
                  >
                    Share
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;

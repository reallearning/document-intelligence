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
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
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
  Eye,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";

// Enhanced data structures for Metro Brands with SKU details
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

// Enhanced SKU structure with footwear types and colors
const footwearTypes = {
  "Metro Brands Shoes": ["Formal", "Casual", "Sports", "Sandals"],
  Mochi: ["Formal", "Casual", "Boots", "Loafers"],
  Crocs: ["Classic", "Literide", "Fuzzy", "Work"],
  FitFlop: ["Sandals", "Sneakers", "Boots", "Slides"],
  Fila: ["Running", "Basketball", "Lifestyle", "Training"],
  "Foot Locker": ["Running", "Basketball", "Casual", "Limited Edition"],
  Clarks: ["Desert Boots", "Wallabees", "Formal", "Casual"],
  Walkway: ["Casual", "Sports", "School", "Comfort"],
  "Da Vinci": ["Luxury", "Formal", "Casual", "Limited"],
  "J. Fontini": ["Formal", "Business", "Dress", "Oxford"],
};

const colors = [
  "Black",
  "Brown",
  "White",
  "Navy",
  "Tan",
  "Red",
  "Blue",
  "Grey",
  "Beige",
  "Multi",
];
const sizes = ["UK6", "UK7", "UK8", "UK9", "UK10", "UK11", "UK12"];

// Generate comprehensive SKU data
const generateSKUData = (brand) => {
  const types = footwearTypes[brand] || ["Casual", "Formal"];
  const skus = [];

  types.forEach((type) => {
    colors.slice(0, 5).forEach((color) => {
      sizes.slice(2, 6).forEach((size) => {
        const sku = `${brand
          .replace(/\s+/g, "")
          .slice(0, 3)
          .toUpperCase()}-${type.slice(0, 3).toUpperCase()}-${color
          .slice(0, 3)
          .toUpperCase()}-${size}`;
        const basePrice =
          brand === "Mochi"
            ? 2800
            : brand === "Crocs"
            ? 3200
            : brand === "Clarks"
            ? 4500
            : 2400;
        const priceVariation = (Math.random() - 0.5) * 800;

        skus.push({
          sku,
          brand,
          type,
          color,
          size,
          price: Math.round(basePrice + priceVariation),
          stock: Math.floor(Math.random() * 500) + 50,
          sold: Math.floor(Math.random() * 200) + 10,
          sellThrough: Math.round((Math.random() * 40 + 60) * 100) / 100,
          margin: Math.round((Math.random() * 20 + 35) * 100) / 100,
          velocity: Math.round((Math.random() * 10 + 5) * 100) / 100,
          daysInStock: Math.floor(Math.random() * 180) + 30,
          forecast: Math.floor(Math.random() * 100) + 50,
          aiScore: Math.round((Math.random() * 30 + 70) * 100) / 100,
        });
      });
    });
  });

  return skus;
};

// Base data by brand/region/channel combinations (enhanced)
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
        avgTicket: 2850,
        conversion: 3.2,
        footfall: 450,
      },
      "EBO #2": {
        roic: 18.5,
        fullPrice: 73,
        total: 93,
        markdown: 8.2,
        growth: 29.8,
        revSqFt: 18800,
        avgTicket: 2750,
        conversion: 3.0,
        footfall: 420,
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
        avgTicket: 2650,
        conversion: 3.1,
        footfall: 380,
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
        avgTicket: 2550,
        conversion: 2.9,
        footfall: 350,
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
        avgTicket: 3050,
        conversion: 3.4,
        footfall: 500,
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
        avgTicket: 3200,
        conversion: 3.8,
        footfall: 380,
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
        avgTicket: 3050,
        conversion: 3.6,
        footfall: 360,
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
        avgTicket: 2900,
        conversion: 3.3,
        footfall: 340,
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
        avgTicket: 3350,
        conversion: 4.0,
        footfall: 420,
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
        avgTicket: 3800,
        conversion: 2.8,
        footfall: 320,
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
        avgTicket: 3650,
        conversion: 2.9,
        footfall: 310,
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
        avgTicket: 3500,
        conversion: 2.6,
        footfall: 290,
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
        avgTicket: 3900,
        conversion: 3.1,
        footfall: 350,
      },
    },
  },
};

// AI-powered insights and alerts
const generateAIInsights = (
  selectedBrand,
  selectedRegion,
  selectedChannel,
  selectedSKU
) => {
  const insights = [
    {
      type: "opportunity",
      priority: "high",
      title: "SKU Performance Optimization",
      description: `${
        selectedSKU || "Black Formal shoes"
      } showing 23% higher velocity in West region. Consider increasing allocation.`,
      impact: "+₹2.3L potential revenue",
      confidence: 87,
      action: "Reallocate inventory",
    },
    {
      type: "risk",
      priority: "medium",
      title: "Slow-moving Inventory Alert",
      description: `Brown Casual SKUs have 180+ days in stock. Immediate markdown recommended.`,
      impact: "-₹1.8L inventory risk",
      confidence: 92,
      action: "Apply targeted markdown",
    },
    {
      type: "trend",
      priority: "high",
      title: "Seasonal Demand Pattern",
      description: `Navy/Blue footwear demand increasing 45% ahead of festive season.`,
      impact: "+₹4.2L opportunity",
      confidence: 85,
      action: "Increase procurement",
    },
    {
      type: "optimization",
      priority: "medium",
      title: "Cross-brand Cannibalization",
      description: `Mochi Formal competing with Metro Formal in same price range. Price positioning opportunity.`,
      impact: "+₹1.5L margin improvement",
      confidence: 78,
      action: "Adjust pricing strategy",
    },
  ];

  return insights;
};

// Generate sample data based on selections
const generateKPIData = (brand, region, channel) => {
  let data;

  if (brand === "ALL" || region === "ALL" || channel === "ALL") {
    data = {
      roic: 18.5,
      fullPrice: 72,
      total: 94,
      markdown: 8.2,
      growth: 28.4,
      revSqFt: 18200,
      avgTicket: 2950,
      conversion: 3.2,
      footfall: 380,
    };
  } else {
    data = baseDataMatrix[brand]?.[region]?.[channel] || {
      roic: 18.5,
      fullPrice: 72,
      total: 94,
      markdown: 8.2,
      growth: 28.4,
      revSqFt: 18200,
      avgTicket: 2950,
      conversion: 3.2,
      footfall: 380,
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
    avgTicketSize: {
      value: data.avgTicket,
      target: 3000,
      trend: data.avgTicket > 2900 ? "up" : "down",
    },
    conversionRate: {
      value: data.conversion,
      target: 3.5,
      trend: data.conversion > 3.2 ? "up" : "down",
    },
    footfall: {
      value: data.footfall,
      target: 400,
      trend: data.footfall > 380 ? "up" : "down",
    },
    ecomContribution: { value: 13.7, target: 15, trend: "up" },
    inventoryTurns: { value: 4.2, target: 4.5, trend: "down" },
  };
};

// Enhanced revenue projection with SKU-level insights
const generateRevenueProjection = (
  withRecommendations = false,
  selectedSKU = null
) => {
  const weeks = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);
  return weeks.map((week, i) => {
    const baseFullPrice = Math.max(1.5, 4.5 - i * 0.3 + Math.random() * 0.5);
    const baseMarkdown = i > 6 ? Math.random() * 2 : 0;
    const baseLastYear = 3.8 - i * 0.2 + Math.random() * 0.3;

    const fullPriceBoost = withRecommendations ? 0.3 : 0;
    const markdownReduction = withRecommendations ? 0.5 : 0;
    const skuBoost = selectedSKU ? 0.2 : 0;

    return {
      week,
      fullPrice:
        Math.round((baseFullPrice + fullPriceBoost + skuBoost) * 100) / 100,
      markdown: Math.max(
        0,
        Math.round((baseMarkdown - markdownReduction) * 100) / 100
      ),
      lastYear: Math.round(baseLastYear * 100) / 100,
      improvement: withRecommendations
        ? Math.round((fullPriceBoost + markdownReduction + skuBoost) * 100) /
          100
        : 0,
      forecast:
        Math.round((baseFullPrice + fullPriceBoost + skuBoost + 0.5) * 100) /
        100,
    };
  });
};

// SKU performance analysis
const generateSKUPerformance = (brand, type, color) => {
  if (!brand || brand === "ALL") return [];

  const skuData = generateSKUData(brand);
  let filtered = skuData;

  if (type && type !== "ALL") {
    filtered = filtered.filter((sku) => sku.type === type);
  }

  if (color && color !== "ALL") {
    filtered = filtered.filter((sku) => sku.color === color);
  }

  return filtered.slice(0, 10);
};

// Color performance analysis
const generateColorPerformance = () => {
  return colors.map((color) => ({
    color,
    sales: Math.floor(Math.random() * 1000) + 500,
    margin: Math.round((Math.random() * 15 + 40) * 100) / 100,
    velocity: Math.round((Math.random() * 8 + 5) * 100) / 100,
    stock: Math.floor(Math.random() * 800) + 200,
  }));
};

// Size performance analysis
const generateSizePerformance = () => {
  return sizes.map((size) => ({
    size,
    demandIndex: Math.round((Math.random() * 40 + 80) * 100) / 100,
    stockLevel: Math.round((Math.random() * 50 + 50) * 100) / 100,
    salesVelocity: Math.round((Math.random() * 5 + 3) * 100) / 100,
  }));
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
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedColor, setSelectedColor] = useState("ALL");
  const [selectedSKU, setSelectedSKU] = useState("ALL");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [kpiData, setKpiData] = useState(generateKPIData("ALL", "ALL", "ALL"));
  const [revenueData, setRevenueData] = useState(
    generateRevenueProjection(false)
  );
  const [skuData, setSKUData] = useState([]);
  const [colorData, setColorData] = useState(generateColorPerformance());
  const [sizeData, setSizeData] = useState(generateSizePerformance());
  const [aiInsights, setAIInsights] = useState(
    generateAIInsights("ALL", "ALL", "ALL", "ALL")
  );
  const [recommendationsApplied, setRecommendationsApplied] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: "ai",
      text: "Hello! I'm Cortex X, your AI retail intelligence agent. I can help you analyze SKU performance, optimize inventory, and make data-driven decisions for Metro Brands. What would you like to explore?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [scenario, setScenario] = useState(null);

  const [scenarioResults, setScenarioResults] = useState(null);

  // Enhanced recommendations with SKU-level insights
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: "Optimize Black Formal SKUs allocation across regions",
      description:
        "Black Formal shoes show 34% higher velocity in West region vs East. Reallocate 200 units.",
      impact: "ROIC +1.8%, Revenue +₹5.2L",
      type: "inventory",
      applied: false,
      confidence: 89,
      sku: "MOC-FOR-BLA-UK8",
    },
    {
      id: 2,
      title: "Markdown Navy Casual SKUs to clear slow inventory",
      description:
        "Navy Casual have 165+ days stock. Apply 15% markdown to improve turns.",
      impact: "Inventory Turns +0.8x, Cash Flow +₹3.1L",
      type: "pricing",
      applied: false,
      confidence: 92,
      sku: "MET-CAS-NAV-UK9",
    },
    {
      id: 3,
      title:
        "Increase procurement for Brown Mochi Formal ahead of wedding season",
      description:
        "Historical pattern shows 67% spike in brown formal demand during wedding season.",
      impact: "Revenue +₹8.7L, Stockout prevention",
      type: "procurement",
      applied: false,
      confidence: 85,
      sku: "MOC-FOR-BRO-UK10",
    },
    {
      id: 4,
      title: "Cross-sell Crocs accessories with Classic Clogs",
      description:
        "Customers buying Classic Clogs have 43% propensity to buy Jibbitz. Bundle opportunity.",
      impact: "Basket Size +₹450, Margin +2.3%",
      type: "merchandising",
      applied: false,
      confidence: 78,
      sku: "CRO-CLA-BLA-UK8",
    },
  ]);

  // Update data when filters change
  useEffect(() => {
    setKpiData(generateKPIData(selectedBrand, selectedRegion, selectedChannel));
    if (selectedBrand !== "ALL") {
      setSKUData(
        generateSKUPerformance(selectedBrand, selectedType, selectedColor)
      );
    }
    setAIInsights(
      generateAIInsights(
        selectedBrand,
        selectedRegion,
        selectedChannel,
        selectedSKU
      )
    );
  }, [
    selectedBrand,
    selectedRegion,
    selectedChannel,
    selectedType,
    selectedColor,
    selectedSKU,
  ]);

  const generateAIScenario = () => {
    // Calculate impacts based on scenario parameters
    let roicImpact = 0;
    let revenueImpact = 0;
    let inventoryImpact = 0;
    let marginImpact = 0;
    let actions = [];

    // Brand Focus Impact
    switch (scenario.brandFocus) {
      case "Own Brands Only":
        roicImpact += 2.5;
        marginImpact += 3.2;
        actions.push("Focus 80% inventory on own brands (higher margin)");
        break;
      case "Licensed Brands Only":
        revenueImpact += 15;
        actions.push("Leverage brand recognition for volume growth");
        break;
      case "Top Performers":
        roicImpact += 3.8;
        inventoryImpact += 20;
        actions.push("Allocate 70% inventory to top 20% performing SKUs");
        break;
    }

    // SKU Strategy Impact
    switch (scenario.skuStrategy) {
      case "Focus on Fast-Moving":
        roicImpact += 4.2;
        inventoryImpact += 25;
        actions.push("Increase fast-moving SKUs by 40%, reduce slow by 60%");
        break;
      case "Clear Slow-Moving":
        inventoryImpact += 35;
        marginImpact -= 1.5;
        actions.push("Apply 25% markdown to SKUs with 120+ days stock");
        break;
      case "Color-Based Optimization":
        roicImpact += 1.8;
        revenueImpact += 8;
        actions.push("Increase Black/Brown by 30%, reduce Navy/Grey by 20%");
        break;
    }

    // Investment Level Impact
    switch (scenario.investmentLevel) {
      case "Conservative":
        roicImpact *= 0.7;
        revenueImpact *= 0.8;
        inventoryImpact *= 0.6;
        actions.push("Maintain current inventory levels, optimize mix only");
        break;
      case "Aggressive":
        roicImpact *= 1.3;
        revenueImpact *= 1.4;
        inventoryImpact *= 1.2;
        actions.push("Increase total inventory by 20% in high-potential SKUs");
        break;
    }

    // Additional strategic actions
    if (selectedBrand !== "ALL") {
      actions.push(`Focus scenario on ${selectedBrand} brand performance`);
      roicImpact += 1.2;
    }

    if (selectedRegion !== "ALL") {
      actions.push(`Optimize for ${selectedRegion} region market conditions`);
      revenueImpact += 5;
    }

    // Calculate final revenue impact in lakhs
    const currentRevenue = 45; // Base revenue in crores
    const revenueInLakhs =
      Math.round(((currentRevenue * 100 * revenueImpact) / 100) * 10) / 10;

    setScenarioResults({
      roicImprovement: Math.round(roicImpact * 10) / 10,
      revenueImpact: revenueInLakhs,
      inventoryReduction: Math.round(inventoryImpact * 10) / 10,
      marginImprovement: Math.round(marginImpact * 10) / 10,
      generated: true,
      actions: actions,
    });

    // Add to chat
    setChatMessages((prev) => [
      ...prev,
      {
        type: "ai",
        text: `🚀 AI Scenario Generated! Strategy: ${scenario.brandFocus} + ${
          scenario.skuStrategy
        } + ${
          scenario.investmentLevel
        } approach. Projected ROIC improvement: +${
          Math.round(roicImpact * 10) / 10
        }%, Revenue impact: ₹${revenueInLakhs}L. Review the detailed action plan in the Scenarios tab.`,
      },
    ]);
  };

  const generateAIResponse = (input) => {
    const lowerInput = input.toLowerCase();

    // Check for scenario generation requests
    if (lowerInput.includes("scenario") || lowerInput.includes("generate")) {
      if (lowerInput.includes("roic") || lowerInput.includes("maximize")) {
        // Auto-generate an optimized scenario
        setScenario({
          ...scenario,
          brandFocus: "Own Brands Only",
          skuStrategy: "Focus on Fast-Moving",
          investmentLevel: "Balanced",
        });
        setTimeout(() => generateAIScenario(), 500);
        return `🎯 Generating ROIC optimization scenario with Own Brands focus and Fast-Moving SKU strategy. This should maximize returns while maintaining balanced risk. Check the Scenarios tab for detailed results!`;
      } else {
        return `💡 I can generate AI scenarios for you! Go to the Scenarios tab and configure your parameters (Brand Focus, SKU Strategy, Investment Level), then click "Generate AI Scenario" to see projected impacts. Would you like me to suggest optimal settings for any specific business goal?`;
      }
    }

    // Existing responses with scenario context
    const responses = [
      `Based on current SKU analysis, I recommend focusing on ${
        selectedBrand !== "ALL" ? selectedBrand : "high-performing brands"
      } with better margin profiles. Consider running a scenario to quantify the impact.`,
      `The ${
        selectedColor !== "ALL" ? selectedColor : "top-selling"
      } colored products are showing strong performance. A Color-Based Optimization scenario could help maximize this trend.`,
      `Current sell-through rates for ${
        selectedType !== "ALL" ? selectedType : "formal footwear"
      } are ${formatPercentage(
        kpiData.totalSelthrough.value
      )}. Try generating an AI scenario to explore optimization opportunities.`,
      `AI analysis suggests that ${
        selectedSKU !== "ALL" ? selectedSKU : "certain SKUs"
      } in your selection have inventory optimization opportunities worth ₹2.3L in potential savings.`,
      `Cross-channel performance shows ${formatPercentage(
        kpiData.conversionRate.value
      )} conversion rate. An aggressive investment scenario could boost this by 0.8%.`,
      `Based on your current filters (${selectedBrand}, ${selectedRegion}), I recommend running a "Top Performers" scenario to focus on highest ROI products.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { type: "user", text: chatInput },
      { type: "ai", text: generateAIResponse(chatInput) },
    ]);
    setChatInput("");
  };

  const applyRecommendation = (recId) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === recId ? { ...rec, applied: true } : rec))
    );

    const newKPI = { ...kpiData };
    const rec = recommendations.find((r) => r.id === recId);

    if (rec.type === "inventory") {
      newKPI.roic.value = Math.round((newKPI.roic.value + 1.8) * 100) / 100;
      newKPI.inventoryTurns.value =
        Math.round((newKPI.inventoryTurns.value + 0.3) * 100) / 100;
    } else if (rec.type === "pricing") {
      newKPI.markdownPercent.value =
        Math.round((newKPI.markdownPercent.value - 1.2) * 100) / 100;
      newKPI.inventoryTurns.value =
        Math.round((newKPI.inventoryTurns.value + 0.8) * 100) / 100;
    } else if (rec.type === "procurement") {
      newKPI.yoyGrowth.value =
        Math.round((newKPI.yoyGrowth.value + 4.2) * 100) / 100;
    } else if (rec.type === "merchandising") {
      newKPI.avgTicketSize.value =
        Math.round((newKPI.avgTicketSize.value + 450) * 100) / 100;
    }

    // Update trends
    newKPI.roic.trend = newKPI.roic.value > newKPI.roic.target ? "up" : "down";
    newKPI.markdownPercent.trend =
      newKPI.markdownPercent.value < newKPI.markdownPercent.target
        ? "down"
        : "up";
    newKPI.yoyGrowth.trend =
      newKPI.yoyGrowth.value > newKPI.yoyGrowth.target ? "up" : "down";
    newKPI.avgTicketSize.trend =
      newKPI.avgTicketSize.value > newKPI.avgTicketSize.target ? "up" : "down";

    setKpiData(newKPI);
    setRecommendationsApplied(true);
    setRevenueData(
      generateRevenueProjection(
        true,
        selectedSKU !== "ALL" ? selectedSKU : null
      )
    );

    setChatMessages((prev) => [
      ...prev,
      {
        type: "ai",
        text: `✅ Applied recommendation: ${rec.title}. Expected impact: ${rec.impact}. Confidence: ${rec.confidence}%`,
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
    isCount = false,
  }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
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
          : isCount
          ? value
          : `${Math.round(value * 100) / 100}${unit}`}
      </div>
      <div className="text-sm text-gray-500">
        Target:{" "}
        {isCurrency
          ? formatCurrency(target)
          : isCount
          ? target
          : `${target}${unit}`}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className={`h-2 rounded-full ${
            trend === "up"
              ? "bg-green-500"
              : trend === "down"
              ? "bg-red-500"
              : "bg-blue-600"
          }`}
          style={{ width: `${Math.min(100, (value / target) * 100)}%` }}
        ></div>
      </div>
    </div>
  );

  const AIInsightCard = ({ insight }) => {
    const getIcon = () => {
      switch (insight.type) {
        case "opportunity":
          return <TrendingUp className="w-5 h-5 text-green-500" />;
        case "risk":
          return <AlertTriangle className="w-5 h-5 text-red-500" />;
        case "trend":
          return <Zap className="w-5 h-5 text-blue-500" />;
        case "optimization":
          return <Target className="w-5 h-5 text-purple-500" />;
        default:
          return <Eye className="w-5 h-5 text-gray-500" />;
      }
    };

    const getPriorityColor = () => {
      switch (insight.priority) {
        case "high":
          return "border-red-400 bg-red-50";
        case "medium":
          return "border-yellow-400 bg-yellow-50";
        case "low":
          return "border-green-400 bg-green-50";
        default:
          return "border-gray-400 bg-gray-50";
      }
    };

    return (
      <div className={`border-l-4 ${getPriorityColor()} p-4 rounded-r-lg`}>
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
            <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-green-600">
                {insight.impact}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  Confidence: {insight.confidence}%
                </span>
                <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                  {insight.action}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cortex X</h1>
            <p className="text-gray-600">
              AI-Powered Metro Brands Retail Intelligence Platform
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Export Report
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              AI Optimize
            </button>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="grid grid-cols-6 gap-4 mt-4">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Channels</option>
            {channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            disabled={selectedBrand === "ALL"}
          >
            <option value="ALL">All Types</option>
            {selectedBrand !== "ALL" &&
              footwearTypes[selectedBrand]?.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
          </select>

          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Colors</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>

          <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>SS 2025</option>
            <option>AW 2024</option>
          </select>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex gap-1 mt-4">
          {[
            "dashboard",
            "sku-analysis",
            "ai-insights",
            "scenarios",
            "chat",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md capitalize ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Enhanced KPI Cards */}
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

            {/* Additional Enhanced KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <KPICard
                title="Avg Ticket Size"
                value={kpiData.avgTicketSize.value}
                target={kpiData.avgTicketSize.target}
                trend={kpiData.avgTicketSize.trend}
                unit=""
                isCurrency={true}
                icon={DollarSign}
              />
              <KPICard
                title="Conversion Rate"
                value={kpiData.conversionRate.value}
                target={kpiData.conversionRate.target}
                trend={kpiData.conversionRate.trend}
                icon={TrendingUp}
              />
              <KPICard
                title="Footfall"
                value={kpiData.footfall.value}
                target={kpiData.footfall.target}
                trend={kpiData.footfall.trend}
                unit=""
                isCount={true}
                icon={Users}
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
                title="Inventory Turns"
                value={kpiData.inventoryTurns.value}
                target={kpiData.inventoryTurns.target}
                trend={kpiData.inventoryTurns.trend}
                unit="x"
                icon={Package}
              />
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Enhanced Revenue Projection */}
              <div className="bg-white rounded-lg p-6 shadow-sm border col-span-2">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Revenue Projection & Forecast
                  {recommendationsApplied && (
                    <span className="text-sm text-green-600 ml-2">
                      (AI Optimized)
                    </span>
                  )}
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      dataKey="forecast"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#e0e7ff"
                      name="AI Forecast"
                    />
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
                        name="AI Improvement"
                      />
                    )}
                    <Line
                      type="monotone"
                      dataKey="lastYear"
                      stroke="#E5E7EB"
                      name="Last Year"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Enhanced AI Recommendations */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    AI Recommendations
                  </h3>
                  <button className="text-blue-600 text-sm hover:text-blue-800">
                    View All
                  </button>
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className={`border-l-4 ${
                        rec.applied
                          ? "border-green-500 bg-green-50"
                          : "border-blue-500"
                      } pl-4 py-3 rounded-r-lg`}
                    >
                      <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">
                        {rec.description}
                      </p>
                      <div className="text-xs text-green-600 font-medium mb-2">
                        {rec.impact}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          SKU: {rec.sku}
                        </span>
                        <div className="flex gap-2">
                          <span className="text-xs text-blue-600">
                            {rec.confidence}% confidence
                          </span>
                          {!rec.applied ? (
                            <button
                              onClick={() => applyRecommendation(rec.id)}
                              className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                            >
                              Apply
                            </button>
                          ) : (
                            <span className="text-xs text-green-600 font-medium">
                              Applied ✓
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Color and Size Performance */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">
                  Color Performance Analysis
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <ScatterChart data={colorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sales" name="Sales Volume" />
                    <YAxis dataKey="margin" name="Margin %" />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ payload }) => {
                        if (payload && payload[0]) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow-lg">
                              <p className="font-medium">{data.color}</p>
                              <p>Sales: {data.sales}</p>
                              <p>Margin: {formatPercentage(data.margin)}</p>
                              <p>Velocity: {data.velocity}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter dataKey="velocity" fill="#3B82F6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">
                  Size Demand & Stock Analysis
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={sizeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="size" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="demandIndex"
                      fill="#3B82F6"
                      name="Demand Index"
                    />
                    <Bar
                      dataKey="stockLevel"
                      fill="#F59E0B"
                      name="Stock Level %"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === "sku-analysis" && (
          <div className="space-y-6">
            {/* SKU Filter Summary */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">
                SKU Analysis Dashboard
              </h3>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {skuData.length}
                  </div>
                  <div className="text-sm text-gray-600">SKUs Analyzed</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(
                      skuData.reduce((sum, sku) => sum + sku.price, 0) /
                        Math.max(skuData.length, 1)
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Avg Price</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {formatPercentage(
                      skuData.reduce((sum, sku) => sum + sku.sellThrough, 0) /
                        Math.max(skuData.length, 1)
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Avg Sell-Through</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(
                      skuData.reduce((sum, sku) => sum + sku.aiScore, 0) /
                        Math.max(skuData.length, 1)
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    AI Performance Score
                  </div>
                </div>
              </div>
            </div>

            {/* SKU Performance Table */}
            {skuData.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">
                  SKU Performance Details
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">SKU</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Color</th>
                        <th className="text-left p-2">Size</th>
                        <th className="text-right p-2">Price</th>
                        <th className="text-right p-2">Stock</th>
                        <th className="text-right p-2">Sold</th>
                        <th className="text-right p-2">Sell-Through</th>
                        <th className="text-right p-2">Days in Stock</th>
                        <th className="text-right p-2">AI Score</th>
                        <th className="text-center p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skuData.map((sku, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-mono text-xs">{sku.sku}</td>
                          <td className="p-2">{sku.type}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full`}
                                style={{
                                  backgroundColor: sku.color.toLowerCase(),
                                }}
                              ></div>
                              {sku.color}
                            </div>
                          </td>
                          <td className="p-2">{sku.size}</td>
                          <td className="p-2 text-right">
                            {formatCurrency(sku.price)}
                          </td>
                          <td className="p-2 text-right">{sku.stock}</td>
                          <td className="p-2 text-right">{sku.sold}</td>
                          <td className="p-2 text-right">
                            <span
                              className={`${
                                sku.sellThrough > 80
                                  ? "text-green-600"
                                  : sku.sellThrough > 60
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {formatPercentage(sku.sellThrough)}
                            </span>
                          </td>
                          <td className="p-2 text-right">
                            <span
                              className={`${
                                sku.daysInStock > 120
                                  ? "text-red-600"
                                  : sku.daysInStock > 60
                                  ? "text-yellow-600"
                                  : "text-green-600"
                              }`}
                            >
                              {sku.daysInStock}
                            </span>
                          </td>
                          <td className="p-2 text-right">
                            <span
                              className={`${
                                sku.aiScore > 85
                                  ? "text-green-600"
                                  : sku.aiScore > 70
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {Math.round(sku.aiScore)}
                            </span>
                          </td>
                          <td className="p-2 text-center">
                            <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                              Optimize
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedBrand === "ALL" && (
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-center py-12">
                  <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Select a Brand for SKU Analysis
                  </h3>
                  <p className="text-gray-500">
                    Choose a specific brand from the dropdown to see detailed
                    SKU performance data.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "ai-insights" && (
          <div className="space-y-6">
            {/* AI Insights Overview */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg">
                <div className="text-2xl font-bold">
                  {aiInsights.filter((i) => i.type === "opportunity").length}
                </div>
                <div className="text-sm opacity-90">Opportunities</div>
              </div>
              <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-lg">
                <div className="text-2xl font-bold">
                  {aiInsights.filter((i) => i.type === "risk").length}
                </div>
                <div className="text-sm opacity-90">Risks</div>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg">
                <div className="text-2xl font-bold">
                  {aiInsights.filter((i) => i.type === "trend").length}
                </div>
                <div className="text-sm opacity-90">Trends</div>
              </div>
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-lg">
                <div className="text-2xl font-bold">
                  {aiInsights.filter((i) => i.priority === "high").length}
                </div>
                <div className="text-sm opacity-90">High Priority</div>
              </div>
            </div>

            {/* Detailed AI Insights */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                AI-Generated Business Insights
              </h3>
              <div className="space-y-4">
                {aiInsights.map((insight, i) => (
                  <AIInsightCard key={i} insight={insight} />
                ))}
              </div>
            </div>

            {/* AI Performance Metrics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">
                  AI Model Performance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Prediction Accuracy
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      94.2%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "94.2%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Model Confidence
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      87.5%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "87.5%" }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      ROI from Recommendations
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      312%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">
                  Recent AI Actions
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        Inventory Reallocation
                      </div>
                      <div className="text-xs text-gray-600">
                        Moved 150 units of MOC-FOR-BLA to West region
                      </div>
                    </div>
                    <div className="text-xs text-green-600">+₹2.3L</div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        Price Optimization
                      </div>
                      <div className="text-xs text-gray-600">
                        Suggested 5% markdown on slow-moving Navy SKUs
                      </div>
                    </div>
                    <div className="text-xs text-blue-600">Pending</div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Demand Forecast</div>
                      <div className="text-xs text-gray-600">
                        Detected 45% spike in brown formal demand
                      </div>
                    </div>
                    <div className="text-xs text-yellow-600">Monitor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "scenarios" && (
          <div className="grid grid-cols-3 gap-6">
            {/* Enhanced Scenario Planning */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                AI Scenario Planning
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Brand Focus
                  </label>
                  <select
                    value={scenario?.brandFocus}
                    onChange={(e) =>
                      setScenario({ ...scenario, brandFocus: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option>All Brands</option>
                    <option>Own Brands Only</option>
                    <option>Licensed Brands Only</option>
                    <option>Top Performers</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {scenario?.brandFocus === "Own Brands Only" &&
                      "Higher margins, lower brand recognition"}
                    {scenario?.brandFocus === "Licensed Brands Only" &&
                      "Lower margins, higher brand pull"}
                    {scenario?.brandFocus === "Top Performers" &&
                      "Focus on best ROI products"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    SKU Strategy
                  </label>
                  <select
                    value={scenario?.skuStrategy}
                    onChange={(e) =>
                      setScenario({ ...scenario, skuStrategy: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Current Mix</option>
                    <option>Focus on Fast-Moving</option>
                    <option>Clear Slow-Moving</option>
                    <option>Color-Based Optimization</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {scenario?.skuStrategy === "Focus on Fast-Moving" &&
                      "Maximize velocity, reduce variety"}
                    {scenario?.skuStrategy === "Clear Slow-Moving" &&
                      "Free up cash, accept margin hit"}
                    {scenario?.skuStrategy === "Color-Based Optimization" &&
                      "Optimize by color performance"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Investment Level
                  </label>
                  <select
                    value={scenario?.investmentLevel}
                    onChange={(e) =>
                      setScenario({
                        ...scenario,
                        investmentLevel: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Conservative</option>
                    <option>Balanced</option>
                    <option>Aggressive</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {scenario?.investmentLevel === "Conservative" &&
                      "Minimal risk, steady returns"}
                    {scenario?.investmentLevel === "Balanced" &&
                      "Moderate risk, good growth"}
                    {scenario?.investmentLevel === "Aggressive" &&
                      "Higher risk, maximum growth potential"}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm text-gray-600 mb-2">
                    Current Filters Applied:
                  </label>
                  <div className="text-xs space-y-1">
                    <div>
                      Brand:{" "}
                      <span className="font-medium">{selectedBrand}</span>
                    </div>
                    <div>
                      Region:{" "}
                      <span className="font-medium">{selectedRegion}</span>
                    </div>
                    <div>
                      Channel:{" "}
                      <span className="font-medium">{selectedChannel}</span>
                    </div>
                    {selectedType !== "ALL" && (
                      <div>
                        Type:{" "}
                        <span className="font-medium">{selectedType}</span>
                      </div>
                    )}
                    {selectedColor !== "ALL" && (
                      <div>
                        Color:{" "}
                        <span className="font-medium">{selectedColor}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={generateAIScenario}
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2 transform hover:scale-105 transition-all"
                >
                  <Zap className="w-4 h-4" />
                  Generate AI Scenario
                </button>
              </div>
            </div>

            {/* Dynamic Scenario Results */}
            <div className="bg-white rounded-lg p-6 shadow-sm border col-span-2">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Scenario Impact Analysis
                {scenarioResults?.generated && (
                  <span className="text-sm text-green-600 ml-2">
                    ✓ Generated
                  </span>
                )}
              </h3>

              {scenarioResults?.generated ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div
                      className={`${
                        scenarioResults?.roicImprovement > 0
                          ? "bg-green-50"
                          : "bg-red-50"
                      } p-4 rounded-lg`}
                    >
                      <div
                        className={`text-xl font-bold ${
                          scenarioResults?.roicImprovement > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {scenarioResults?.roicImprovement > 0 ? "+" : ""}
                        {scenarioResults?.roicImprovement}%
                      </div>
                      <div className="text-sm text-gray-600">
                        ROIC Improvement
                      </div>
                    </div>
                    <div
                      className={`${
                        scenarioResults?.revenueImpact > 0
                          ? "bg-blue-50"
                          : "bg-red-50"
                      } p-4 rounded-lg`}
                    >
                      <div
                        className={`text-xl font-bold ${
                          scenarioResults?.revenueImpact > 0
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        {scenarioResults?.revenueImpact > 0 ? "+" : ""}₹
                        {scenarioResults?.revenueImpact}L
                      </div>
                      <div className="text-sm text-gray-600">
                        Revenue Impact
                      </div>
                    </div>
                    <div
                      className={`${
                        scenarioResults?.inventoryReduction > 0
                          ? "bg-purple-50"
                          : "bg-yellow-50"
                      } p-4 rounded-lg`}
                    >
                      <div
                        className={`text-xl font-bold ${
                          scenarioResults?.inventoryReduction > 0
                            ? "text-purple-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {scenarioResults?.inventoryReduction > 0 ? "-" : "+"}
                        {Math.abs(scenarioResults?.inventoryReduction)}%
                      </div>
                      <div className="text-sm text-gray-600">
                        Inventory Change
                      </div>
                    </div>
                    <div
                      className={`${
                        scenarioResults?.marginImprovement > 0
                          ? "bg-orange-50"
                          : "bg-red-50"
                      } p-4 rounded-lg`}
                    >
                      <div
                        className={`text-xl font-bold ${
                          scenarioResults?.marginImprovement > 0
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      >
                        {scenarioResults?.marginImprovement > 0 ? "+" : ""}
                        {scenarioResults?.marginImprovement}%
                      </div>
                      <div className="text-sm text-gray-600">Margin Impact</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      AI-Recommended Action Plan:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {scenarioResults?.actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Apply Scenario
                      </button>
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Save Scenario
                      </button>
                      <button
                        onClick={() =>
                          setScenarioResults({
                            ...scenarioResults,
                            generated: false,
                          })
                        }
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-600 mb-2">
                    Ready to Generate AI Scenario
                  </h4>
                  <p className="text-gray-500 mb-4">
                    Configure your scenario parameters and click "Generate AI
                    Scenario" to see projected business impacts.
                  </p>
                  <div className="text-sm text-gray-400">
                    Current Selection: {selectedBrand} • {selectedRegion} •{" "}
                    {selectedChannel}
                    {selectedType !== "ALL" && ` • ${selectedType}`}
                    {selectedColor !== "ALL" && ` • ${selectedColor}`}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border h-[600px] flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat with Cortex X AI
                </h3>
                <p className="text-sm text-gray-600">
                  Ask about SKU performance, inventory optimization, color
                  trends, or get AI-powered business insights
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
                    placeholder="Ask about SKU performance, color trends, inventory optimization, or AI insights..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleChatSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Send
                  </button>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    onClick={() =>
                      setChatInput(
                        "Which SKUs are underperforming in my current selection?"
                      )
                    }
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                  >
                    SKU performance
                  </button>
                  <button
                    onClick={() =>
                      setChatInput(
                        "What colors are trending for the upcoming season?"
                      )
                    }
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                  >
                    Color trends
                  </button>
                  <button
                    onClick={() =>
                      setChatInput(
                        "How can I optimize inventory allocation across regions?"
                      )
                    }
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                  >
                    Inventory optimization
                  </button>
                  <button
                    onClick={() =>
                      setChatInput(
                        "Generate a scenario for maximizing ROIC with current brand selection"
                      )
                    }
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
                  >
                    Generate scenario
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

"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Target,
  Package,
  Info,
  Users,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Map,
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
} from "lucide-react";
import Link from 'next/link';

const NPDDashboard = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeTab, setActiveTab] = useState("npd");
  const [cardTab, setCardTab] = useState({});
  const [currentView, setCurrentView] = useState("overview");
  const [navCollapsed, setNavCollapsed] = useState(false);

  const colors = {
    darkGreen: "#0C2C18",
    sage: "#85A383",
    cream: "#E7DDCA",
    lightGrey: "#878B87",
    darkGrey: "#1B2A21",
    terracotta: "#DF7649",
    warmBg: "#F0EBE0",
    cardBg: "#F8F6F0",
    border: "#D5CDB8",
  };

 const navItems = [
     { icon: Home, label: 'Overview', href: "/sales" },
     { icon: BarChart3, label: 'Trade Intelligence', href: "/sales/trade-intelligence" },
     { icon: Package, label: 'New Product Analysis', href: "/sales/new-product-analysis" },
     { icon: Settings, label: 'Settings' }
   ];

  const setTab = (cardId, tab) => {
    setCardTab((prev) => ({ ...prev, [cardId]: tab }));
  };

  const launches = [
    {
      id: "NPD-001",
      launchId: "L-2024-JUN-001",
      productName: "AquaVive Fresh Marine Body Wash",
      launchDate: "June 10, 2024",
      weeksLive: 28,
      status: "on-track",
      launchScope: "Select GT stores - South, West, East",
      achievement: 58,
      stores: { actual: 1420, target: 4200, percentage: 34 },
      volume: { actual: 21800, target: 34000, percentage: 64 },
      revenue: { actual: 310, target: 575, percentage: 54 },
      schemeDetails: {
        type: "Buy 15 Get 3% Extra | Buy 30 Get 5% Extra",
        duration: "6 months (June - November 2024)",
        uptake: 58,
        leakage: 11,
        orderLift: 22,
        repeatRate: 36,
      },
      topInsights: [
        {
          type: "critical",
          message: "Premium 500ml SKU at 23% - price resistance in GT",
          impact: "560 stores",
          action: "Reposition to MT/E-commerce",
        },
        {
          type: "positive",
          message: "South region leading at 58% achievement",
          impact: "680 stores",
          action: "Replicate model in West",
        },
        {
          type: "warning",
          message: "TSR productivity gap (7-9 vs 14 stores/day)",
          impact: "1,100 stores",
          action: "Deploy training program",
        },
      ],
      skuPerformance: [
        {
          name: "100ml",
          mrp: "₹85",
          achievement: 62,
          stores: { actual: 820, target: 2400 },
          coverage: 34,
          volume: { actual: 7400, target: 12000 },
          revenue: { actual: 185, target: 300 },
          status: "healthy",
          channels: [
            { name: "SMT", actual: 15, target: 18, achievement: 83 },
            { name: "General", actual: 12, target: 15, achievement: 80 },
            { name: "Chemist", actual: 10, target: 12, achievement: 83 },
          ],
          insight:
            "Entry-level SKU performing well. Strong in South (46%) but weak in East (28%). Price point resonates with GT channel.",
        },
        {
          name: "200ml",
          mrp: "₹155",
          achievement: 56,
          stores: { actual: 460, target: 2000 },
          coverage: 23,
          volume: { actual: 4200, target: 7500 },
          revenue: { actual: 105, target: 187.5 },
          status: "warning",
          channels: [
            { name: "SMT", actual: 16, target: 20, achievement: 80 },
            { name: "General", actual: 13, target: 18, achievement: 72 },
            { name: "Chemist", actual: 11, target: 15, achievement: 73 },
          ],
          insight:
            "Mid-range SKU underperforming. Better traction in urban SMT (35%) vs rural general stores (18%). Needs aggressive push.",
        },
        {
          name: "500ml",
          mrp: "₹349",
          achievement: 23,
          stores: { actual: 140, target: 1400 },
          coverage: 10,
          volume: { actual: 800, target: 3500 },
          revenue: { actual: 20, target: 87.5 },
          status: "critical",
          channels: [
            { name: "SMT", actual: 9, target: 15, achievement: 60 },
            { name: "General", actual: 7, target: 12, achievement: 58 },
            { name: "Chemist", actual: 5, target: 10, achievement: 50 },
          ],
          insight:
            "Premium SKU severely underperforming. High price limiting GT acceptance. Only 10% coverage, mostly metro SMT. Better suited for MT/E-commerce.",
        },
      ],
      channels: [
        {
          name: "SMT",
          coverage: 32,
          stores: { actual: 600, target: 1900 },
          volume: 9080,
          revenue: 227,
          growth: 38,
        },
        {
          name: "General Stores",
          coverage: 36,
          stores: { actual: 540, target: 1500 },
          volume: 7320,
          revenue: 183,
          growth: 24,
        },
        {
          name: "Chemists",
          coverage: 35,
          stores: { actual: 280, target: 800 },
          volume: 3780,
          revenue: 94.5,
          growth: 18,
        },
      ],
      regions: [
        {
          name: "South",
          achievement: 58,
          stores: { actual: 680, target: 1500 },
          coverage: 45,
          volume: 6720,
          revenue: 168,
          status: "healthy",
          asms: [
            {
              name: "Suresh Babu",
              territory: "Tamil Nadu",
              stores: "280/600",
              volume: 2880,
              achievement: 74,
            },
            {
              name: "Lakshmi Menon",
              territory: "Kerala",
              stores: "220/520",
              volume: 2240,
              achievement: 65,
            },
            {
              name: "Rajesh Gowda",
              territory: "Karnataka",
              stores: "180/380",
              volume: 1600,
              achievement: 72,
            },
          ],
          insight:
            "Strongest region overall. TN and Karnataka performing well with established brand equity. Kerala lagging due to limited urban GT penetration.",
        },
        {
          name: "West",
          achievement: 24,
          stores: { actual: 440, target: 1600 },
          coverage: 28,
          volume: 3880,
          revenue: 97,
          status: "warning",
          asms: [
            {
              name: "Vikram Desai",
              territory: "Mumbai",
              stores: "220/680",
              volume: 1860,
              achievement: 46,
            },
            {
              name: "Sanjay Kulkarni",
              territory: "Pune",
              stores: "140/520",
              volume: 1240,
              achievement: 38,
            },
            {
              name: "Amit Shah",
              territory: "Gujarat",
              stores: "80/400",
              volume: 780,
              achievement: 28,
            },
          ],
          insight:
            "Moderate performance. Maharashtra urban centers showing decent traction but Gujarat significantly underperforming. Strong competitor presence limiting penetration.",
        },
        {
          name: "East",
          achievement: 18,
          stores: { actual: 300, target: 1100 },
          coverage: 27,
          volume: 1800,
          revenue: 45,
          status: "critical",
          asms: [
            {
              name: "Abhijit Mukherjee",
              territory: "Kolkata",
              stores: "160/480",
              volume: 920,
              achievement: 34,
            },
            {
              name: "Ravi Prasad",
              territory: "Bihar",
              stores: "80/380",
              volume: 520,
              achievement: 18,
            },
            {
              name: "Subhash Ghosh",
              territory: "Odisha",
              stores: "60/240",
              volume: 360,
              achievement: 22,
            },
          ],
          insight:
            "Weakest performing region. Kolkata urban markets showing some promise but Bihar and Odisha severely lagging. Distributor network gaps in Tier-2/3 towns.",
        },
      ],
      rootCauses: [
        {
          issue: "TSR Bandwidth & Training Gaps",
          severity: "HIGH",
          impact: "~1,100 stores",
          metric: "7-9 vs 14 stores/day",
          action:
            "3-day intensive training + beat planning app with 12 stores/day mandate",
          timeline: "2 weeks",
        },
        {
          issue: "Stock Stuck at Distributors",
          severity: "HIGH",
          impact: "₹124L blocked",
          metric: "64% secondary vs 85% primary",
          action:
            "Weekly stock audits + distributor incentive for 20-day billing cycle",
          timeline: "Immediate",
        },
        {
          issue: "Tier-2/3 Distribution Gaps",
          severity: "HIGH",
          impact: "~1,180 stores",
          metric: "800 stores in East, 380 in Gujarat",
          action: "Onboard 4-5 regional distributors in Bihar, Odisha, Gujarat",
          timeline: "4 weeks",
        },
      ],
    },
  ];

  const MiniBarChart = ({
    value,
    max = 100,
    color = colors.sage,
    height = "4px",
  }) => (
    <div
      style={{
        width: "100%",
        height,
        backgroundColor: `${colors.border}`,
        borderRadius: "9999px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${(value / max) * 100}%`,
          backgroundColor: color,
          borderRadius: "9999px",
          transition: "width 0.3s",
        }}
      />
    </div>
  );

  const RadialProgress = ({ value, size = 80, strokeWidth = 6 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;
    const color =
      value >= 60
        ? colors.sage
        : value >= 40
        ? colors.terracotta
        : colors.lightGrey;

    return (
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`${colors.border}`}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s" }}
        />
      </svg>
    );
  };

  return (
    <div
      className="h-screen overflow-auto flex"
      style={{
        backgroundColor: colors.warmBg,
      }}
    >
      {/* Sidebar */}
        <div 
        className={`transition-all duration-300 ${navCollapsed ? 'w-20' : 'w-64'} flex flex-col`}
        style={{ backgroundColor: '#0C2C18' }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'rgba(133, 163, 131, 0.3)' }}>
          {navCollapsed ? (
            <div className="text-2xl font-light text-center" style={{ fontFamily: 'Georgia, serif', color: '#85A383' }}>
              M
            </div>
          ) : (
            <div className="text-3xl font-light tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#85A383' }}>
              MORRiE
            </div>
          )}
        </div>

        <nav className="flex-1 pt-8 px-2">
          {navItems.map((item, index) => (
            <Link href={item.href ?? ""} key={index}>
            <div
              className={`cursor-pointer w-full hover:bg-[#85a383] flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                item.active ? 'border-l-2' : ''
              }`}
            >
              <item.icon size={20} strokeWidth={1} />
              {!navCollapsed && (
                <span className="text-sm tracking-wide" style={{ fontFamily: 'sans-serif' }}>
                  {item.label}
                </span>
              )}
            </div></Link>
          ))}
        </nav>

        <button
          onClick={() => setNavCollapsed(!navCollapsed)}
          className="p-6 flex items-center justify-center border-t"
          style={{ color: '#878B87', borderColor: 'rgba(133, 163, 131, 0.3)' }}
        >
          {navCollapsed ? <ChevronRight size={20} strokeWidth={1} /> : <ChevronLeft size={20} strokeWidth={1} />}
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Header */}
        <div
          style={{
            backgroundColor: colors.warmBg,
            padding: "3rem 3rem 2rem 3rem",
          }}
        >
          <div style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "3rem",
                color: colors.darkGreen,
                marginBottom: "0.5rem",
                fontFamily: "serif",
                letterSpacing: "-0.02em",
                fontWeight: 300,
              }}
            >
              New Product Launches
            </h2>
            <p style={{ color: colors.lightGrey, fontSize: "1rem" }}>
              Track performance, identify gaps, drive growth
            </p>
          </div>

          {/* Executive Overview */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "2rem",
            }}
          >
            {/* Portfolio Performance - Dark Green */}
            <div
              style={{
                backgroundColor: colors.darkGreen,
                padding: "2rem",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color: colors.sage,
                  marginBottom: "2rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Portfolio Performance
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "2rem",
                }}
              >
                {[
                  {
                    icon: Package,
                    label: "Active Launches",
                    value: launches.length,
                    sublabel: null,
                  },
                  {
                    icon: Target,
                    label: "Avg Achievement",
                    value: "58%",
                    sublabel: null,
                  },
                  {
                    icon: ShoppingCart,
                    label: "Total Stores",
                    value: "1,420",
                    sublabel: "34% weighted",
                  },
                  {
                    icon: DollarSign,
                    label: "Run Rate",
                    value: "21.8K",
                    sublabel: "840 cases/week",
                  },
                ].map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <div key={idx}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <Icon size={16} color={colors.sage} />
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: colors.lightGrey,
                          }}
                        >
                          {metric.label}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "2.25rem",
                          color: colors.cream,
                          fontFamily: "serif",
                          fontWeight: 300,
                          lineHeight: 1,
                        }}
                      >
                        {metric.value}
                      </div>
                      {metric.sublabel && (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: colors.sage,
                            marginTop: "0.5rem",
                          }}
                        >
                          {metric.sublabel}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Critical Actions */}
            <div
              style={{
                backgroundColor: colors.cardBg,
                padding: "2rem",
                borderRadius: "12px",
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color: colors.darkGreen,
                  marginBottom: "1.5rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Critical Actions Required
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    icon: Users,
                    color: colors.terracotta,
                    title: "~1,100 stores uncovered",
                    desc: "TSR productivity at 7-9 vs 14 stores/day",
                  },
                  {
                    icon: AlertCircle,
                    color: colors.terracotta,
                    title: "₹124L stuck in pipeline",
                    desc: "East region holding 2.8 months stock",
                  },
                  {
                    icon: TrendingUp,
                    color: colors.sage,
                    title: "South model working (58%)",
                    desc: "Replicate TN/Karnataka success in West",
                  },
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        padding: "1rem",
                        backgroundColor: `${colors.cream}30`,
                        borderRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "50%",
                          backgroundColor: `${action.color}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} color={action.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: colors.darkGreen,
                            fontWeight: 600,
                            marginBottom: "0.25rem",
                          }}
                        >
                          {action.title}
                        </div>
                        <div
                          style={{
                            fontSize: "0.8125rem",
                            color: colors.lightGrey,
                            lineHeight: 1.4,
                          }}
                        >
                          {action.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Launch Cards */}
        <div style={{ padding: "2rem 3rem" }}>
          {launches.map((launch) => {
            const isExpanded = expandedCard === launch.id;
            const currentTab = cardTab[launch.id] || "overview";

            return (
              <div
                key={launch.id}
                style={{
                  backgroundColor: colors.cardBg,
                  borderLeft: `4px solid ${colors.sage}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {/* Collapsed View */}
                <div
                  onClick={() => setExpandedCard(isExpanded ? null : launch.id)}
                  style={{
                    padding: "2rem",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "2rem",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: colors.lightGrey,
                          }}
                        >
                          {launch.launchId}
                        </span>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: colors.lightGrey,
                          }}
                        >
                          •
                        </span>
                        <Calendar size={14} color={colors.lightGrey} />
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: colors.lightGrey,
                          }}
                        >
                          {launch.launchDate} • {launch.weeksLive} weeks live
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: "1.875rem",
                          color: colors.darkGreen,
                          marginBottom: "0.5rem",
                          fontFamily: "serif",
                          fontWeight: 300,
                        }}
                      >
                        {launch.productName}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: colors.lightGrey,
                        }}
                      >
                        {launch.launchScope}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2rem",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <RadialProgress
                          value={launch.achievement}
                          size={90}
                          strokeWidth={8}
                        />
                        <div
                          style={{ position: "absolute", textAlign: "center" }}
                        >
                          <div
                            style={{
                              fontSize: "1.5rem",
                              color: colors.darkGreen,
                              fontFamily: "serif",
                              fontWeight: 600,
                              lineHeight: 1,
                            }}
                          >
                            {launch.achievement}%
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "50%",
                          backgroundColor: `${colors.sage}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {isExpanded ? (
                          <ChevronUp size={20} color={colors.sage} />
                        ) : (
                          <ChevronDown size={20} color={colors.sage} />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Visual Progress Metrics */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "2rem",
                    }}
                  >
                    {[
                      {
                        label: "Stores",
                        actual: launch.stores.actual.toLocaleString(),
                        target: launch.stores.target.toLocaleString(),
                        percentage: launch.stores.percentage,
                        icon: ShoppingCart,
                      },
                      {
                        label: "Volume",
                        actual: `${(launch.volume.actual / 1000).toFixed(1)}K`,
                        target: `${(launch.volume.target / 1000).toFixed(1)}K`,
                        percentage: launch.volume.percentage,
                        icon: Package,
                      },
                      {
                        label: "Revenue",
                        actual: `₹${launch.revenue.actual}L`,
                        target: `₹${launch.revenue.target}L`,
                        percentage: launch.revenue.percentage,
                        icon: DollarSign,
                      },
                    ].map((metric, idx) => {
                      const Icon = metric.icon;
                      return (
                        <div key={idx}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginBottom: "0.75rem",
                            }}
                          >
                            <Icon size={16} color={colors.sage} />
                            <span
                              style={{
                                fontSize: "0.75rem",
                                color: colors.lightGrey,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                fontWeight: 500,
                              }}
                            >
                              {metric.label}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: "0.5rem",
                              marginBottom: "1rem",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "1.5rem",
                                color: colors.darkGreen,
                                fontFamily: "serif",
                                fontWeight: 300,
                              }}
                            >
                              {metric.actual}
                            </span>
                            <span
                              style={{
                                fontSize: "0.875rem",
                                color: colors.lightGrey,
                              }}
                            >
                              / {metric.target}
                            </span>
                          </div>
                          <MiniBarChart
                            value={metric.percentage}
                            max={100}
                            height="6px"
                          />
                          <div
                            style={{
                              fontSize: "0.8125rem",
                              color: colors.darkGreen,
                              fontWeight: 600,
                              marginTop: "0.5rem",
                            }}
                          >
                            {metric.percentage}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Expanded View with Tabs */}
                {isExpanded && (
                  <div style={{ borderTop: `1px solid ${colors.border}` }}>
                    {/* Tab Navigation */}
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        padding: "1rem 2rem 0 2rem",
                        backgroundColor: `${colors.cream}20`,
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      {[
                        { key: "overview", label: "Overview", icon: BarChart3 },
                        { key: "skus", label: "SKU Details", icon: Package },
                        {
                          key: "channels",
                          label: "Channels",
                          icon: ShoppingCart,
                        },
                        { key: "regions", label: "Regions", icon: Map },
                        { key: "actions", label: "Action Plan", icon: Target },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = currentTab === tab.key;
                        return (
                          <button
                            key={tab.key}
                            onClick={(e) => {
                              e.stopPropagation();
                              setTab(launch.id, tab.key);
                            }}
                            style={{
                              padding: "0.75rem 1.5rem",
                              border: "none",
                              backgroundColor: isActive
                                ? colors.cardBg
                                : "transparent",
                              color: isActive
                                ? colors.darkGreen
                                : colors.lightGrey,
                              cursor: "pointer",
                              fontSize: "0.875rem",
                              fontWeight: isActive ? 600 : 500,
                              borderRadius: "8px 8px 0 0",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              transition: "all 0.2s",
                            }}
                          >
                            <Icon size={16} />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Tab Content */}
                    <div style={{ padding: "2rem" }}>
                      {/* Overview Tab */}
                      {currentTab === "overview" && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                          }}
                        >
                          {/* Scheme Performance Visual */}
                          <div>
                            <h4
                              style={{
                                fontSize: "0.875rem",
                                color: colors.darkGreen,
                                fontWeight: 600,
                                marginBottom: "1.5rem",
                                letterSpacing: "0.05em",
                              }}
                            >
                              Scheme Performance
                            </h4>
                            <div
                              style={{
                                backgroundColor: `${colors.sage}10`,
                                padding: "2rem",
                                borderRadius: "12px",
                                border: `1px solid ${colors.sage}40`,
                              }}
                            >
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "repeat(4, 1fr)",
                                  gap: "2rem",
                                }}
                              >
                                {[
                                  {
                                    label: "Uptake",
                                    value: launch.schemeDetails.uptake,
                                    suffix: "%",
                                    color: colors.sage,
                                  },
                                  {
                                    label: "Leakage",
                                    value: launch.schemeDetails.leakage,
                                    suffix: "%",
                                    color:
                                      launch.schemeDetails.leakage > 15
                                        ? colors.terracotta
                                        : colors.sage,
                                  },
                                  {
                                    label: "Order Lift",
                                    value: `+${launch.schemeDetails.orderLift}`,
                                    suffix: "%",
                                    color: colors.sage,
                                  },
                                  {
                                    label: "Repeat Rate",
                                    value: launch.schemeDetails.repeatRate,
                                    suffix: "%",
                                    color: colors.sage,
                                  },
                                ].map((metric, idx) => (
                                  <div
                                    key={idx}
                                    style={{ textAlign: "center" }}
                                  >
                                    <div
                                      style={{
                                        fontSize: "0.75rem",
                                        color: colors.lightGrey,
                                        marginBottom: "1rem",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      {metric.label}
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "0.75rem",
                                      }}
                                    >
                                      <RadialProgress
                                        value={
                                          typeof metric.value === "string"
                                            ? parseInt(metric.value)
                                            : metric.value
                                        }
                                        size={70}
                                        strokeWidth={6}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "1.5rem",
                                        color: metric.color,
                                        fontFamily: "serif",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {metric.value}
                                      {metric.suffix}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Top Insights */}
                          <div>
                            <h4
                              style={{
                                fontSize: "0.875rem",
                                color: colors.darkGreen,
                                fontWeight: 600,
                                marginBottom: "1.5rem",
                                letterSpacing: "0.05em",
                              }}
                            >
                              Key Insights
                            </h4>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "1.5rem",
                              }}
                            >
                              {launch.topInsights.map((insight, idx) => {
                                const iconColor =
                                  insight.type === "critical"
                                    ? colors.terracotta
                                    : insight.type === "positive"
                                    ? colors.sage
                                    : colors.lightGrey;
                                return (
                                  <div
                                    key={idx}
                                    style={{
                                      backgroundColor: `${iconColor}08`,
                                      padding: "1.5rem",
                                      borderRadius: "12px",
                                      border: `1px solid ${iconColor}30`,
                                      borderLeft: `4px solid ${iconColor}`,
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize: "0.8125rem",
                                        color: colors.darkGrey,
                                        lineHeight: 1.6,
                                        marginBottom: "1rem",
                                      }}
                                    >
                                      {insight.message}
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "1rem",
                                        paddingTop: "1rem",
                                        borderTop: `1px solid ${colors.border}`,
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "0.75rem",
                                          color: colors.lightGrey,
                                        }}
                                      >
                                        Impact
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "0.875rem",
                                          color: iconColor,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {insight.impact}
                                      </span>
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "0.75rem",
                                        color: colors.sage,
                                        fontWeight: 600,
                                        padding: "0.75rem",
                                        backgroundColor: `${colors.sage}15`,
                                        borderRadius: "6px",
                                      }}
                                    >
                                      → {insight.action}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* SKU Details Tab */}
                      {currentTab === "skus" && (
                        <div>
                          <h4
                            style={{
                              fontSize: "0.875rem",
                              color: colors.darkGreen,
                              fontWeight: 600,
                              marginBottom: "1.5rem",
                              letterSpacing: "0.05em",
                            }}
                          >
                            SKU Performance Analysis
                          </h4>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "1.5rem",
                            }}
                          >
                            {launch.skuPerformance.map((sku, idx) => {
                              const statusColor =
                                sku.status === "healthy"
                                  ? colors.sage
                                  : sku.status === "warning"
                                  ? colors.terracotta
                                  : colors.lightGrey;

                              return (
                                <div
                                  key={idx}
                                  style={{
                                    backgroundColor: colors.cardBg,
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    border: `1px solid ${colors.border}`,
                                    borderTop: `4px solid ${statusColor}`,
                                  }}
                                >
                                  {/* SKU Header */}
                                  <div
                                    style={{
                                      padding: "1.5rem",
                                      backgroundColor: `${statusColor}10`,
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "1rem",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            fontSize: "1.25rem",
                                            color: colors.darkGreen,
                                            fontFamily: "serif",
                                            fontWeight: 600,
                                          }}
                                        >
                                          {sku.name}
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "0.75rem",
                                            color: colors.lightGrey,
                                            marginTop: "0.25rem",
                                          }}
                                        >
                                          {sku.mrp}
                                        </div>
                                      </div>
                                      <div style={{ position: "relative" }}>
                                        <RadialProgress
                                          value={sku.achievement}
                                          size={60}
                                          strokeWidth={5}
                                        />
                                        <div
                                          style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            textAlign: "center",
                                          }}
                                        >
                                          <div
                                            style={{
                                              fontSize: "1rem",
                                              color: statusColor,
                                              fontWeight: 600,
                                              lineHeight: 1,
                                            }}
                                          >
                                            {sku.achievement}%
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* SKU Metrics */}
                                  <div style={{ padding: "1.5rem" }}>
                                    <div style={{ marginBottom: "1.5rem" }}>
                                      <div
                                        style={{
                                          fontSize: "0.75rem",
                                          color: colors.lightGrey,
                                          marginBottom: "0.5rem",
                                        }}
                                      >
                                        Coverage
                                      </div>
                                      <MiniBarChart
                                        value={sku.coverage}
                                        max={100}
                                        height="8px"
                                      />
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          marginTop: "0.5rem",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: "0.75rem",
                                            color: colors.darkGreen,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {sku.coverage}%
                                        </span>
                                        <span
                                          style={{
                                            fontSize: "0.75rem",
                                            color: colors.lightGrey,
                                          }}
                                        >
                                          {sku.stores.actual}/
                                          {sku.stores.target}
                                        </span>
                                      </div>
                                    </div>

                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(2, 1fr)",
                                        gap: "1rem",
                                        marginBottom: "1.5rem",
                                      }}
                                    >
                                      <div
                                        style={{
                                          padding: "0.75rem",
                                          backgroundColor: `${colors.cream}40`,
                                          borderRadius: "6px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontSize: "0.75rem",
                                            color: colors.lightGrey,
                                            marginBottom: "0.25rem",
                                          }}
                                        >
                                          Volume
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "1rem",
                                            color: colors.darkGreen,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {(sku.volume.actual / 1000).toFixed(
                                            1
                                          )}
                                          K
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "0.7rem",
                                            color: colors.lightGrey,
                                            marginTop: "0.25rem",
                                          }}
                                        >
                                          /
                                          {(sku.volume.target / 1000).toFixed(
                                            1
                                          )}
                                          K
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          padding: "0.75rem",
                                          backgroundColor: `${colors.cream}40`,
                                          borderRadius: "6px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontSize: "0.75rem",
                                            color: colors.lightGrey,
                                            marginBottom: "0.25rem",
                                          }}
                                        >
                                          Revenue
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "1rem",
                                            color: colors.darkGreen,
                                            fontWeight: 600,
                                          }}
                                        >
                                          ₹{sku.revenue.actual}L
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "0.7rem",
                                            color: colors.lightGrey,
                                            marginTop: "0.25rem",
                                          }}
                                        >
                                          /₹{sku.revenue.target}L
                                        </div>
                                      </div>
                                    </div>

                                    {/* Channel Bars */}
                                    <div style={{ marginBottom: "1rem" }}>
                                      <div
                                        style={{
                                          fontSize: "0.75rem",
                                          color: colors.lightGrey,
                                          marginBottom: "0.75rem",
                                          fontWeight: 600,
                                        }}
                                      >
                                        Avg Sell-in
                                      </div>
                                      {sku.channels.map((channel, cidx) => (
                                        <div
                                          key={cidx}
                                          style={{ marginBottom: "0.75rem" }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              marginBottom: "0.25rem",
                                              fontSize: "0.75rem",
                                            }}
                                          >
                                            <span
                                              style={{
                                                color: colors.lightGrey,
                                              }}
                                            >
                                              {channel.name}
                                            </span>
                                            <span
                                              style={{
                                                color: colors.darkGreen,
                                                fontWeight: 600,
                                              }}
                                            >
                                              {channel.actual}/{channel.target}
                                            </span>
                                          </div>
                                          <MiniBarChart
                                            value={channel.achievement}
                                            max={100}
                                            height="4px"
                                            color={
                                              channel.achievement >= 80
                                                ? colors.sage
                                                : colors.terracotta
                                            }
                                          />
                                        </div>
                                      ))}
                                    </div>

                                    {/* Insight */}
                                    <div
                                      style={{
                                        padding: "1rem",
                                        backgroundColor: `${statusColor}10`,
                                        borderRadius: "8px",
                                        borderLeft: `3px solid ${statusColor}`,
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontSize: "0.75rem",
                                          color: colors.darkGrey,
                                          lineHeight: 1.5,
                                          fontStyle: "italic",
                                        }}
                                      >
                                        {sku.insight}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Channels Tab */}
                      {currentTab === "channels" && (
                        <div>
                          <h4
                            style={{
                              fontSize: "0.875rem",
                              color: colors.darkGreen,
                              fontWeight: 600,
                              marginBottom: "1.5rem",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Channel Distribution & Performance
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "1.5rem",
                            }}
                          >
                            {launch.channels.map((channel, idx) => (
                              <div
                                key={idx}
                                style={{
                                  backgroundColor: colors.cardBg,
                                  padding: "2rem",
                                  borderRadius: "12px",
                                  border: `1px solid ${colors.border}`,
                                  borderLeft: `4px solid ${colors.sage}`,
                                }}
                              >
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 3fr",
                                    gap: "3rem",
                                  }}
                                >
                                  {/* Left: Channel Info */}
                                  <div>
                                    <div
                                      style={{
                                        fontSize: "1.25rem",
                                        color: colors.darkGreen,
                                        fontWeight: 600,
                                        marginBottom: "1rem",
                                      }}
                                    >
                                      {channel.name}
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "1rem",
                                      }}
                                    >
                                      <div style={{ position: "relative" }}>
                                        <RadialProgress
                                          value={channel.coverage}
                                          size={100}
                                          strokeWidth={8}
                                        />
                                        <div
                                          style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            textAlign: "center",
                                          }}
                                        >
                                          <div
                                            style={{
                                              fontSize: "1.5rem",
                                              color: colors.sage,
                                              fontFamily: "serif",
                                              fontWeight: 600,
                                              lineHeight: 1,
                                            }}
                                          >
                                            {channel.coverage}%
                                          </div>
                                          <div
                                            style={{
                                              fontSize: "0.7rem",
                                              color: colors.lightGrey,
                                            }}
                                          >
                                            coverage
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        fontSize: "0.875rem",
                                        color: colors.lightGrey,
                                        textAlign: "center",
                                      }}
                                    >
                                      {channel.stores.actual}/
                                      {channel.stores.target} stores
                                    </div>
                                  </div>

                                  {/* Right: Metrics */}
                                  <div>
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: "1.5rem",
                                        marginBottom: "1.5rem",
                                      }}
                                    >
                                      <div>
                                        <div
                                          style={{
                                            fontSize: "0.75rem",
                                            color: colors.lightGrey,
                                            marginBottom: "0.5rem",
                                            textTransform: "uppercase",
                                          }}
                                        >
                                          Volume
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "1.75rem",
                                            color: colors.darkGreen,
                                            fontFamily: "serif",
                                            fontWeight: 300,
                                          }}
                                        >
                                          {(channel.volume / 1000).toFixed(1)}K
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "0.75rem",
                                            color: colors.lightGrey,
                                          }}
                                        >
                                          cases
                                        </div>
                                      </div>
                                      <div>
                                        <div
                                          style={{
                                            fontSize: "0.75rem",
                                            color: colors.lightGrey,
                                            marginBottom: "0.5rem",
                                            textTransform: "uppercase",
                                          }}
                                        >
                                          Revenue
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "1.75rem",
                                            color: colors.darkGreen,
                                            fontFamily: "serif",
                                            fontWeight: 300,
                                          }}
                                        >
                                          ₹{channel.revenue}L
                                        </div>
                                      </div>
                                      <div>
                                        <div
                                          style={{
                                            fontSize: "0.75rem",
                                            color: colors.lightGrey,
                                            marginBottom: "0.5rem",
                                            textTransform: "uppercase",
                                          }}
                                        >
                                          Growth
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "1.75rem",
                                            color: colors.sage,
                                            fontFamily: "serif",
                                            fontWeight: 600,
                                          }}
                                        >
                                          +{channel.growth}%
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "0.75rem",
                                            color: colors.lightGrey,
                                          }}
                                        >
                                          vs LY
                                        </div>
                                      </div>
                                    </div>

                                    {/* Visual comparison */}
                                    <div
                                      style={{
                                        padding: "1rem",
                                        backgroundColor: `${colors.sage}10`,
                                        borderRadius: "8px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontSize: "0.75rem",
                                          color: colors.lightGrey,
                                          marginBottom: "0.75rem",
                                        }}
                                      >
                                        Stores Achievement
                                      </div>
                                      <MiniBarChart
                                        value={
                                          (channel.stores.actual /
                                            channel.stores.target) *
                                          100
                                        }
                                        max={100}
                                        height="10px"
                                      />
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          marginTop: "0.5rem",
                                          fontSize: "0.875rem",
                                        }}
                                      >
                                        <span
                                          style={{
                                            color: colors.darkGreen,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {Math.round(
                                            (channel.stores.actual /
                                              channel.stores.target) *
                                              100
                                          )}
                                          % of target
                                        </span>
                                        <span
                                          style={{ color: colors.lightGrey }}
                                        >
                                          {channel.stores.target -
                                            channel.stores.actual}{" "}
                                          stores gap
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Regions Tab */}
                      {currentTab === "regions" && (
                        <div>
                          <h4
                            style={{
                              fontSize: "0.875rem",
                              color: colors.darkGreen,
                              fontWeight: 600,
                              marginBottom: "1.5rem",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Regional Performance & ASM Breakdown
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "1.5rem",
                            }}
                          >
                            {launch.regions.map((region, idx) => {
                              const statusColor =
                                region.status === "healthy"
                                  ? colors.sage
                                  : region.status === "warning"
                                  ? colors.terracotta
                                  : colors.lightGrey;

                              return (
                                <div
                                  key={idx}
                                  style={{
                                    backgroundColor: colors.cardBg,
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    border: `1px solid ${colors.border}`,
                                    borderLeft: `4px solid ${statusColor}`,
                                  }}
                                >
                                  {/* Region Header */}
                                  <div
                                    style={{
                                      padding: "2rem",
                                      backgroundColor: `${statusColor}08`,
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 4fr",
                                        gap: "2rem",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div style={{ textAlign: "center" }}>
                                        <div
                                          style={{
                                            position: "relative",
                                            display: "inline-block",
                                          }}
                                        >
                                          <RadialProgress
                                            value={region.achievement}
                                            size={100}
                                            strokeWidth={8}
                                          />
                                          <div
                                            style={{
                                              position: "absolute",
                                              top: "50%",
                                              left: "50%",
                                              transform:
                                                "translate(-50%, -50%)",
                                              textAlign: "center",
                                            }}
                                          >
                                            <div
                                              style={{
                                                fontSize: "1.75rem",
                                                color: statusColor,
                                                fontFamily: "serif",
                                                fontWeight: 600,
                                                lineHeight: 1,
                                              }}
                                            >
                                              {region.achievement}%
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          style={{
                                            fontSize: "1rem",
                                            color: colors.darkGreen,
                                            fontWeight: 600,
                                            marginTop: "1rem",
                                            textTransform: "uppercase",
                                          }}
                                        >
                                          {region.name}
                                        </div>
                                      </div>

                                      <div>
                                        <div
                                          style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                              "repeat(4, 1fr)",
                                            gap: "1.5rem",
                                          }}
                                        >
                                          <div>
                                            <div
                                              style={{
                                                fontSize: "0.75rem",
                                                color: colors.lightGrey,
                                                marginBottom: "0.5rem",
                                              }}
                                            >
                                              Coverage
                                            </div>
                                            <div
                                              style={{
                                                fontSize: "1.5rem",
                                                color: colors.darkGreen,
                                                fontFamily: "serif",
                                                fontWeight: 300,
                                              }}
                                            >
                                              {region.coverage}%
                                            </div>
                                          </div>
                                          <div>
                                            <div
                                              style={{
                                                fontSize: "0.75rem",
                                                color: colors.lightGrey,
                                                marginBottom: "0.5rem",
                                              }}
                                            >
                                              Stores
                                            </div>
                                            <div
                                              style={{
                                                fontSize: "1.25rem",
                                                color: colors.darkGreen,
                                                fontWeight: 600,
                                              }}
                                            >
                                              {region.stores.actual}/
                                              {region.stores.target}
                                            </div>
                                          </div>
                                          <div>
                                            <div
                                              style={{
                                                fontSize: "0.75rem",
                                                color: colors.lightGrey,
                                                marginBottom: "0.5rem",
                                              }}
                                            >
                                              Volume
                                            </div>
                                            <div
                                              style={{
                                                fontSize: "1.25rem",
                                                color: colors.darkGreen,
                                                fontWeight: 600,
                                              }}
                                            >
                                              {(region.volume / 1000).toFixed(
                                                1
                                              )}
                                              K
                                            </div>
                                          </div>
                                          <div>
                                            <div
                                              style={{
                                                fontSize: "0.75rem",
                                                color: colors.lightGrey,
                                                marginBottom: "0.5rem",
                                              }}
                                            >
                                              Revenue
                                            </div>
                                            <div
                                              style={{
                                                fontSize: "1.25rem",
                                                color: colors.darkGreen,
                                                fontWeight: 600,
                                              }}
                                            >
                                              ₹{region.revenue}L
                                            </div>
                                          </div>
                                        </div>

                                        <div
                                          style={{
                                            marginTop: "1.5rem",
                                            padding: "1rem",
                                            backgroundColor: `${statusColor}15`,
                                            borderRadius: "8px",
                                            fontSize: "0.8125rem",
                                            color: colors.darkGrey,
                                            lineHeight: 1.5,
                                            fontStyle: "italic",
                                          }}
                                        >
                                          {region.insight}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* ASM Performance */}
                                  <div style={{ padding: "2rem" }}>
                                    <div
                                      style={{
                                        fontSize: "0.75rem",
                                        color: colors.lightGrey,
                                        marginBottom: "1rem",
                                        fontWeight: 600,
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      ASM Performance
                                    </div>
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: "1rem",
                                      }}
                                    >
                                      {region.asms.map((asm, aidx) => {
                                        const asmColor =
                                          asm.achievement >= 60
                                            ? colors.sage
                                            : asm.achievement >= 40
                                            ? colors.terracotta
                                            : colors.lightGrey;
                                        return (
                                          <div
                                            key={aidx}
                                            style={{
                                              padding: "1rem",
                                              backgroundColor: `${colors.cream}40`,
                                              borderRadius: "8px",
                                              border: `1px solid ${colors.border}`,
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: "0.75rem",
                                              }}
                                            >
                                              <div>
                                                <div
                                                  style={{
                                                    fontSize: "0.875rem",
                                                    color: colors.darkGreen,
                                                    fontWeight: 600,
                                                  }}
                                                >
                                                  {asm.name}
                                                </div>
                                                <div
                                                  style={{
                                                    fontSize: "0.75rem",
                                                    color: colors.lightGrey,
                                                    marginTop: "0.25rem",
                                                  }}
                                                >
                                                  {asm.territory}
                                                </div>
                                              </div>
                                              <div
                                                style={{
                                                  fontSize: "1.25rem",
                                                  color: asmColor,
                                                  fontFamily: "serif",
                                                  fontWeight: 600,
                                                }}
                                              >
                                                {asm.achievement}%
                                              </div>
                                            </div>
                                            <MiniBarChart
                                              value={asm.achievement}
                                              max={100}
                                              height="6px"
                                              color={asmColor}
                                            />
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginTop: "0.75rem",
                                                fontSize: "0.75rem",
                                                color: colors.lightGrey,
                                              }}
                                            >
                                              <span>{asm.stores}</span>
                                              <span>
                                                {(asm.volume / 1000).toFixed(1)}
                                                K cases
                                              </span>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Action Plan Tab */}
                      {currentTab === "actions" && (
                        <div>
                          <h4
                            style={{
                              fontSize: "0.875rem",
                              color: colors.darkGreen,
                              fontWeight: 600,
                              marginBottom: "1.5rem",
                              letterSpacing: "0.05em",
                            }}
                          >
                            Root Causes & Action Plan
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "1.5rem",
                            }}
                          >
                            {launch.rootCauses.map((cause, idx) => (
                              <div
                                key={idx}
                                style={{
                                  backgroundColor: colors.cardBg,
                                  borderRadius: "12px",
                                  overflow: "hidden",
                                  border: `1px solid ${colors.border}`,
                                  borderLeft: `4px solid ${
                                    cause.severity === "HIGH"
                                      ? colors.terracotta
                                      : colors.lightGrey
                                  }`,
                                }}
                              >
                                <div style={{ padding: "2rem" }}>
                                  <div
                                    style={{
                                      display: "grid",
                                      gridTemplateColumns: "2fr 1fr 1fr 3fr",
                                      gap: "2rem",
                                      alignItems: "start",
                                    }}
                                  >
                                    {/* Issue */}
                                    <div>
                                      <div
                                        style={{
                                          fontSize: "0.75rem",
                                          padding: "0.25rem 0.75rem",
                                          backgroundColor: `${colors.terracotta}20`,
                                          color: colors.terracotta,
                                          fontWeight: 600,
                                          borderRadius: "4px",
                                          display: "inline-block",
                                          marginBottom: "0.75rem",
                                        }}
                                      >
                                        {cause.severity}
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "1rem",
                                          color: colors.darkGreen,
                                          fontWeight: 600,
                                          marginBottom: "0.5rem",
                                        }}
                                      >
                                        {cause.issue}
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "0.75rem",
                                          color: colors.lightGrey,
                                        }}
                                      >
                                        {cause.metric}
                                      </div>
                                    </div>

                                    {/* Impact */}
                                    <div>
                                      <div
                                        style={{
                                          fontSize: "0.75rem",
                                          color: colors.lightGrey,
                                          marginBottom: "0.5rem",
                                        }}
                                      >
                                        Impact
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "1.125rem",
                                          color: colors.terracotta,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {cause.impact}
                                      </div>
                                    </div>

                                    {/* Timeline */}
                                    <div>
                                      <div
                                        style={{
                                          fontSize: "0.75rem",
                                          color: colors.lightGrey,
                                          marginBottom: "0.5rem",
                                        }}
                                      >
                                        Timeline
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "1rem",
                                          color: colors.darkGreen,
                                          fontWeight: 600,
                                        }}
                                      >
                                        {cause.timeline}
                                      </div>
                                    </div>

                                    {/* Action */}
                                    <div
                                      style={{
                                        padding: "1.25rem",
                                        backgroundColor: `${colors.sage}10`,
                                        borderRadius: "8px",
                                        borderLeft: `3px solid ${colors.sage}`,
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontSize: "0.75rem",
                                          color: colors.sage,
                                          fontWeight: 600,
                                          marginBottom: "0.5rem",
                                        }}
                                      >
                                        → Recommended Action
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "0.875rem",
                                          color: colors.darkGrey,
                                          lineHeight: 1.5,
                                        }}
                                      >
                                        {cause.action}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NPDDashboard;

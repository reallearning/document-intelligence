"use client";
import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Truck,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Zap,
  MessageCircle,
  Target,
  DollarSign,
  Navigation,
  Users,
  Activity,
  Package,
  Route,
  Building2,
  Fuel,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("network-health");
  const [showDetailReport, setShowDetailReport] = useState<string | null>(null);

  const onTimeDeliveryData = [
    {
      day: "Mon",
      target: 95,
      actual: 94.5,
      blrGoa: 89,
      delCcu: 91,
      mumHyd: 93,
    },
    {
      day: "Tue",
      target: 95,
      actual: 94.8,
      blrGoa: 87,
      delCcu: 89,
      mumHyd: 92,
    },
    {
      day: "Wed",
      target: 95,
      actual: 94.1,
      blrGoa: 86,
      delCcu: 88,
      mumHyd: 91,
    },
    {
      day: "Thu",
      target: 95,
      actual: 93.9,
      blrGoa: 85,
      delCcu: 87,
      mumHyd: 90,
    },
    {
      day: "Fri",
      target: 95,
      actual: 94.2,
      blrGoa: 87,
      delCcu: 89,
      mumHyd: 91,
    },
    {
      day: "Sat",
      target: 95,
      actual: 94.6,
      blrGoa: 88,
      delCcu: 90,
      mumHyd: 92,
    },
    {
      day: "Sun",
      target: 95,
      actual: 94.2,
      blrGoa: 87,
      delCcu: 89,
      mumHyd: 91,
    },
  ];

  const lanePerformanceData = [
    {
      lane: "BLR→GOA",
      current: 87,
      target: 95,
      trend: -2.1,
      volume: 1247,
      issues: "Route inefficiency, traffic delays",
    },
    {
      lane: "DEL→CCU",
      current: 89,
      target: 95,
      trend: -1.8,
      volume: 856,
      issues: "Hub processing delays",
    },
    {
      lane: "MUM→HYD",
      current: 91,
      target: 95,
      trend: -1.2,
      volume: 1124,
      issues: "Weather-related delays",
    },
    {
      lane: "BLR→DEL",
      current: 96,
      target: 95,
      trend: +0.8,
      volume: 2341,
      issues: "None",
    },
    {
      lane: "MUM→BLR",
      current: 97,
      target: 95,
      trend: +1.2,
      volume: 1876,
      issues: "None",
    },
    {
      lane: "DEL→MUM",
      current: 95,
      target: 95,
      trend: +0.3,
      volume: 1654,
      issues: "None",
    },
  ];

  // Comprehensive Detailed Report Component
  const OnTimeDeliveryDetailReport = () => {
    console.log("OnTimeDeliveryDetailReport rendering");
    return (
      <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/60 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    console.log("Back button clicked");
                    setShowDetailReport(null);
                  }}
                  className="w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl flex items-center justify-center transition-all shadow-sm"
                >
                  <span className="text-lg text-black">←</span>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                      On-Time Delivery Performance
                    </h1>
                    <p className="text-gray-600 font-medium">
                      Comprehensive Analysis Report
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">
                  Generated: {currentTime.toLocaleDateString("en-IN")} •{" "}
                  {currentTime.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-xs text-gray-500">
                  Live data from Network Brain AI
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-6 text-center">
              <div className="text-4xl font-black text-green-600 mb-2">
                94.2%
              </div>
              <p className="text-gray-700 font-semibold mb-1">
                Current Performance
              </p>
              <div className="flex items-center justify-center space-x-1 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+1.7% vs yesterday</span>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-6 text-center">
              <div className="text-4xl font-black text-red-600 mb-2">-0.8%</div>
              <p className="text-gray-700 font-semibold mb-1">Gap to Target</p>
              <p className="text-xs text-gray-500">Target: 95.0%</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-6 text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">
                3,227
              </div>
              <p className="text-gray-700 font-semibold mb-1">
                Affected Packages/Day
              </p>
              <p className="text-xs text-gray-500">Underperforming lanes</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-6 text-center">
              <div className="text-4xl font-black text-purple-600 mb-2">
                18%
              </div>
              <p className="text-gray-700 font-semibold mb-1">Network Volume</p>
              <p className="text-xs text-gray-500">At risk lanes</p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Executive Summary
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Network-wide on-time delivery performance stands at{" "}
                  <strong className="text-green-600">94.2%</strong>,
                  representing a{" "}
                  <strong className="text-green-600">1.7% improvement</strong>{" "}
                  over yesterday. While overall performance remains strong,
                  three critical lanes are approaching SLA breach thresholds,
                  requiring immediate intervention.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The underperforming lanes (BLR→GOA, DEL→CCU, MUM→HYD)
                  collectively handle{" "}
                  <strong className="text-blue-600">
                    3,227 packages daily
                  </strong>{" "}
                  and represent
                  <strong className="text-purple-600">
                    {" "}
                    18% of total network volume
                  </strong>
                  . Their deteriorating performance poses significant risks to
                  monthly SLA targets and customer satisfaction scores.
                </p>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-lg p-5">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-amber-900 mb-1">
                        Immediate Action Required
                      </p>
                      <p className="text-sm text-gray-700">
                        Route optimization and capacity reallocation for
                        underperforming lanes must be implemented within 48
                        hours to prevent SLA breach.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl p-6 border border-green-200">
                <div className="text-center">
                  <div className="text-5xl font-black text-green-600 mb-3">
                    94.2%
                  </div>
                  <p className="text-gray-700 font-bold mb-4">
                    Network Performance
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-bold text-gray-900">95.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Gap:</span>
                      <span className="font-bold text-red-600">-0.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Trend:</span>
                      <span className="font-bold text-green-600">+1.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Best Lane:</span>
                      <span className="font-bold text-green-600">
                        MUM→BLR (97%)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Worst Lane:</span>
                      <span className="font-bold text-red-600">
                        BLR→GOA (87%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Trends Chart */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  7-Day Performance Trend
                </h2>
              </div>
              <div className="text-sm text-gray-500">
                Tracking performance vs 95% target across all major lanes
              </div>
            </div>

            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={onTimeDeliveryData}>
                  <XAxis dataKey="day" />
                  <YAxis domain={[80, 100]} />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#D1D5DB"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    name="Target (95%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#059669"
                    strokeWidth={4}
                    name="Network Average"
                  />
                  <Line
                    type="monotone"
                    dataKey="blrGoa"
                    stroke="#DC2626"
                    strokeWidth={3}
                    name="BLR→GOA"
                  />
                  <Line
                    type="monotone"
                    dataKey="delCcu"
                    stroke="#EA580C"
                    strokeWidth={3}
                    name="DEL→CCU"
                  />
                  <Line
                    type="monotone"
                    dataKey="mumHyd"
                    stroke="#D97706"
                    strokeWidth={3}
                    name="MUM→HYD"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3">
                <div className="w-4 h-1 bg-gray-400"></div>
                <span className="text-sm font-medium text-gray-700">
                  Target (95%)
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 rounded-lg p-3">
                <div className="w-4 h-1 bg-green-600"></div>
                <span className="text-sm font-medium text-gray-700">
                  Network Average
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-red-50 rounded-lg p-3">
                <div className="w-4 h-1 bg-red-600"></div>
                <span className="text-sm font-medium text-gray-700">
                  BLR→GOA
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-orange-50 rounded-lg p-3">
                <div className="w-4 h-1 bg-orange-600"></div>
                <span className="text-sm font-medium text-gray-700">
                  DEL→CCU
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-amber-50 rounded-lg p-3">
                <div className="w-4 h-1 bg-amber-600"></div>
                <span className="text-sm font-medium text-gray-700">
                  MUM→HYD
                </span>
              </div>
            </div>
          </div>

          {/* Lane Performance Analysis Table */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Lane-by-Lane Performance Analysis
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-6 font-bold text-gray-900">
                      Lane
                    </th>
                    <th className="text-center py-4 px-6 font-bold text-gray-900">
                      Current %
                    </th>
                    <th className="text-center py-4 px-6 font-bold text-gray-900">
                      Target %
                    </th>
                    <th className="text-center py-4 px-6 font-bold text-gray-900">
                      7-Day Trend
                    </th>
                    <th className="text-center py-4 px-6 font-bold text-gray-900">
                      Daily Volume
                    </th>
                    <th className="text-left py-4 px-6 font-bold text-gray-900">
                      Primary Issues
                    </th>
                    <th className="text-center py-4 px-6 font-bold text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lanePerformanceData.map((lane, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        lane.current < lane.target
                          ? "bg-red-50/30"
                          : "bg-green-50/30"
                      }`}
                    >
                      <td className="py-4 px-6 font-bold text-gray-900">
                        {lane.lane}
                      </td>
                      <td
                        className={`text-center py-4 px-6 font-bold text-lg ${
                          lane.current < lane.target
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {lane.current}%
                      </td>
                      <td className="text-center py-4 px-6 text-gray-700 font-medium">
                        {lane.target}%
                      </td>
                      <td
                        className={`text-center py-4 px-6 font-bold ${
                          lane.trend > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-1">
                          {lane.trend > 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span>
                            {lane.trend > 0 ? "+" : ""}
                            {lane.trend}%
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-6 text-gray-700 font-medium">
                        {lane.volume.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-gray-700 text-sm">
                        {lane.issues}
                      </td>
                      <td className="text-center py-4 px-6">
                        {lane.current < lane.target ? (
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">
                            CRITICAL
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                            HEALTHY
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Root Cause Analysis & Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Root Cause Analysis
                </h2>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-6 bg-red-50/50 rounded-r-lg py-4">
                  <h3 className="font-bold text-red-900 mb-3 text-lg">
                    BLR→GOA Lane (87% Performance)
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Route inefficiency: 18% longer than optimal path
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Traffic congestion during peak hours (2-4 PM)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Hub processing delays at Bangalore sortation center
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Driver unfamiliarity with optimized routes</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-6 bg-orange-50/50 rounded-r-lg py-4">
                  <h3 className="font-bold text-orange-900 mb-3 text-lg">
                    DEL→CCU Lane (89% Performance)
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Hub H3 processing capacity constraints</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Equipment downtime averaging 2 hours daily</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Seasonal weather impact on flight schedules</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Staff shortage during night shifts</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-amber-500 pl-6 bg-amber-50/50 rounded-r-lg py-4">
                  <h3 className="font-bold text-amber-900 mb-3 text-lg">
                    MUM→HYD Lane (91% Performance)
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Monsoon-related delays (June-September impact)
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Airport cargo handling inefficiencies</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Limited backup routing options</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Peak hour traffic in Mumbai suburban areas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Recommended Actions
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-blue-900">
                      Immediate (24-48 hours)
                    </h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Implement route optimization for BLR→GOA</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Redistribute 3 shipments from H3 to H9</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Deploy backup equipment at DEL hub</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Activate weather contingency protocols</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="w-5 h-5 text-green-600" />
                    <h3 className="font-bold text-green-900">
                      Short-term (1-2 weeks)
                    </h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Driver training on optimized routes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Night shift staffing reinforcement</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Equipment maintenance scheduling</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Alternative routing development</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-purple-900">
                      Medium-term (1-3 months)
                    </h3>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Hub capacity expansion planning</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Advanced weather prediction integration</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Airport partnership negotiations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Technology infrastructure upgrades</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Projection */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Projected Impact After Implementation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-8 border border-green-200">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-green-600 mb-3">
                  96.5%
                </div>
                <p className="text-gray-900 font-bold mb-2">
                  Projected Performance
                </p>
                <p className="text-sm text-gray-600">
                  After implementing all recommendations
                </p>
                <div className="mt-4 text-xs text-green-700 bg-green-100 rounded-full px-3 py-1">
                  +2.3% improvement
                </div>
              </div>

              <div className="text-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-blue-600 mb-3">
                  ₹2.4 Cr
                </div>
                <p className="text-gray-900 font-bold mb-2">Annual Savings</p>
                <p className="text-sm text-gray-600">
                  From reduced penalties and improved efficiency
                </p>
                <div className="mt-4 text-xs text-blue-700 bg-blue-100 rounded-full px-3 py-1">
                  ROI: 340%
                </div>
              </div>

              <div className="text-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-2xl p-8 border border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-purple-600 mb-3">
                  +15%
                </div>
                <p className="text-gray-900 font-bold mb-2">
                  Customer Satisfaction
                </p>
                <p className="text-sm text-gray-600">
                  Expected improvement in CSAT scores
                </p>
                <div className="mt-4 text-xs text-purple-700 bg-purple-100 rounded-full px-3 py-1">
                  Industry leading
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Ready to Take Action?
                </h2>
                <p className="text-blue-100">
                  Implement these recommendations to improve network performance
                  immediately.
                </p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                  Implement Now
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-colors">
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (showDetailReport === "on-time-delivery") {
    return <OnTimeDeliveryDetailReport />;
  }

  const fillRateData = [
    { day: "Mon", target: 85, actual: 78 },
    { day: "Tue", target: 85, actual: 82 },
    { day: "Wed", target: 85, actual: 79 },
    { day: "Thu", target: 85, actual: 76 },
    { day: "Fri", target: 85, actual: 74 },
    { day: "Sat", target: 85, actual: 78 },
    { day: "Sun", target: 85, actual: 81 },
  ];

  const hubUtilizationData = [
    { hub: "H1", utilization: 92 },
    { hub: "H2", utilization: 68 },
    { hub: "H3", utilization: 85 },
    { hub: "H4", utilization: 76 },
    { hub: "H5", utilization: 89 },
    { hub: "H6", utilization: 45 },
  ];

  const focusAreas = [
    {
      id: "network-health",
      label: "Network Health",
      icon: <Activity className="w-4 h-4" />,
    },
    {
      id: "capacity-planning",
      label: "Capacity Planning",
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: "route-optimization",
      label: "Route Optimization",
      icon: <Route className="w-4 h-4" />,
    },
    {
      id: "hub-performance",
      label: "Hub Performance",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      id: "cost-efficiency",
      label: "Cost Efficiency",
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      id: "fleet-utilization",
      label: "Fleet Utilization",
      icon: <Truck className="w-4 h-4" />,
    },
  ];

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                DTDC Network Intelligence
              </h1>
              <p className="text-gray-600">Operations Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Last updated: {currentTime.toLocaleDateString("en-IN")} •{" "}
                  {currentTime.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                4 insights requiring attention today
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Daily Intelligence Briefing */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Daily Network Intelligence Briefing
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            The network is showing concerning trends in the last 24 hours that
            require immediate attention. Fill rates are tracking 8% below
            target, with a particularly troubling decline in BLR-DEL and BLR-GOA
            lanes that correlates directly with three major operational
            inefficiencies identified overnight.
          </p>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Most urgent issues identified:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Hub H6 operating at 45% capacity while H5 is at 92%, creating
                bottlenecks and overflow costs
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                BLR→GOA lane running at 62% fill rate for 5 consecutive days,
                missing ₹1.7 Cr annual yield potential
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                JP Nagar delivery routes averaging 18% excess distance,
                impacting first-attempt success rates
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                Truck #146 scheduled to depart 45% under-capacity, risking
                spot-hire requirements tomorrow
              </li>
            </ul>
          </div>

          <p className="text-gray-700 mb-4 font-medium">
            Primary recommendation: Execute immediate hub consolidation plan and
            route optimization to restore 85%+ network efficiency within 48
            hours.
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Review consolidation plan
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Optimize routes immediately
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Address capacity imbalance
            </button>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Focus Areas</h2>
          </div>

          <div className="flex flex-wrap bg-gray-50/50">
            {focusAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => setActiveTab(area.id)}
                className={`flex items-center space-x-3 px-8 py-5 text-sm font-semibold border-b-3 transition-all ${
                  activeTab === area.id
                    ? "border-blue-600 text-blue-700 bg-blue-50/80"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                <div
                  className={`w-5 h-5 ${
                    activeTab === area.id ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {area.icon}
                </div>
                <span>{area.label}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === "network-health" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* On-Time Delivery Card */}
                <div className="bg-gradient-to-br from-white to-green-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        On-Time Delivery Performance
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      +1.7% vs yesterday
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      94.2%
                    </div>
                    <p className="text-gray-600 font-medium">
                      Current delivery success rate across network
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "Strong performance overall, but 3 lanes are approaching
                      SLA breach thresholds. BLR→GOA, DEL→CCU, and MUM→HYD need
                      immediate attention."
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Implement route optimization for underperforming lanes
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        console.log(
                          "Button clicked, setting showDetailReport to on-time-delivery"
                        );
                        setShowDetailReport("on-time-delivery");
                      }}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      View Details
                    </button>
                    <button className="text-green-600 text-sm font-semibold hover:text-green-700 flex items-center px-4 py-3 rounded-xl hover:bg-green-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>

                {/* Network Resilience Card */}
                <div className="bg-gradient-to-br from-white to-blue-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        Network Resilience Score
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Strong capacity buffer
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      8.2/10
                    </div>
                    <p className="text-gray-600 font-medium">
                      Overall network health and redundancy rating
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "Network shows strong resilience with 82% peak
                      utilization, leaving adequate buffer for demand spikes.
                      Redundancy across all major lanes is optimal."
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Maintain current capacity levels, monitor seasonal
                      variations
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      View Details
                    </button>
                    <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center px-4 py-3 rounded-xl hover:bg-blue-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "capacity-planning" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Volume Forecast Card */}
                <div className="bg-gradient-to-br from-white to-blue-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        7-Day Volume Forecast
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <AlertTriangle className="w-4 h-4" />
                      Capacity shortage predicted
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      +35%
                    </div>
                    <p className="text-gray-600 font-medium">
                      Expected volume increase on BLR→DEL lane
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "Book 3×32-ft trucks by Thursday to lock standard rates.
                      Delay risks 40% premium on spot market. Current capacity
                      insufficient for predicted +2,847 packages/day."
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center bg-blue-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-blue-600 mb-1">
                        +2,847
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Additional packages/day
                      </p>
                    </div>
                    <div className="text-center bg-blue-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-blue-600 mb-1">
                        3x 32-ft
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Trucks needed
                      </p>
                    </div>
                    <div className="text-center bg-red-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-red-600 mb-1">
                        ₹85K
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Spot-market cost if delayed
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Reserve additional capacity immediately to avoid premium
                      rates
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      View Details
                    </button>
                    <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center px-4 py-3 rounded-xl hover:bg-blue-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>

                {/* Hub Capacity Analysis Card */}
                <div className="bg-gradient-to-br from-white to-green-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        Hub Capacity Distribution
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      15% expansion capacity available
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      82%
                    </div>
                    <p className="text-gray-600 font-medium">
                      Average hub utilization across network
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "Network can absorb 15% volume increase without
                      infrastructure expansion, but distribution is uneven. H2
                      and H6 are under-utilized while H1 and H5 near capacity."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50/50 rounded-xl p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Over-capacity Hubs:
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        H2 (68%), H6 (45%)
                      </p>
                    </div>
                    <div className="bg-amber-50/50 rounded-xl p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Near-capacity Hubs:
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        H1 (92%), H5 (89%)
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Redistribute load from high-utilization to under-utilized
                      hubs
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      View Details
                    </button>
                    <button className="text-green-600 text-sm font-semibold hover:text-green-700 flex items-center px-4 py-3 rounded-xl hover:bg-green-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "route-optimization" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* JP Nagar Route Inefficiency Card */}
                <div className="bg-gradient-to-br from-white to-red-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Navigation className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        JP Nagar Zone Route Efficiency
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <TrendingDown className="w-4 h-4" />
                      18% distance excess
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      78%
                    </div>
                    <p className="text-gray-600 font-medium">
                      First-attempt delivery success rate
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "Current delivery routes are 18% longer than optimal,
                      costing ₹12K/day in excess fuel. I've designed new routes
                      that cut distance and boost success to 92%."
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center bg-red-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-red-600 mb-1">
                        +45 min
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Avg extra time/route
                      </p>
                    </div>
                    <div className="text-center bg-green-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-green-600 mb-1">
                        92%
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Optimized success rate
                      </p>
                    </div>
                    <div className="text-center bg-red-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-red-600 mb-1">
                        ₹12K/day
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Excess fuel cost
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Implement route redesign to reduce distance and improve
                      delivery success
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-red-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      View Details
                    </button>
                    <button className="text-red-600 text-sm font-semibold hover:text-red-700 flex items-center px-4 py-3 rounded-xl hover:bg-red-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>

                {/* Lane Bundling Opportunity Card */}
                <div className="bg-gradient-to-br from-white to-purple-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Route className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        BLR Lane Bundling Opportunity
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      ₹1.7 Cr annual potential
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      62%
                    </div>
                    <p className="text-gray-600 font-medium">
                      BLR→GOA lane current fill rate
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "BLR→GOA running at 62% fill while BLR→MNG has overflow.
                      Bundling overflow creates ₹1.7 Cr additional yield
                      annually while reducing spot-truck dependency."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50/50 rounded-xl p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Current State:
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        GOA: 62% fill, MNG: 105% (overflow)
                      </p>
                    </div>
                    <div className="bg-green-50/50 rounded-xl p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Optimized State:
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        GOA: 89% fill, MNG: 94%
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Execute lane bundling plan to optimize capacity
                      utilization
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      View Details
                    </button>
                    <button className="text-purple-600 text-sm font-semibold hover:text-purple-700 flex items-center px-4 py-3 rounded-xl hover:bg-purple-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "hub-performance" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Hub Consolidation Card */}
                <div className="bg-gradient-to-br from-white to-red-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        Hub H6 Consolidation Analysis
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <TrendingDown className="w-4 h-4" />
                      ₹6 Cr/yr waste
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      45%
                    </div>
                    <p className="text-gray-600 font-medium">
                      Hub H6 current utilization vs H5 at 92%
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "Consolidation maintains service quality while eliminating
                      fixed costs. Only 3% of routes see minor transit time
                      increase of 0.2 hours maximum."
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center bg-red-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-red-600 mb-1">
                        ₹6 Cr
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Annual savings
                      </p>
                    </div>
                    <div className="text-center bg-green-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-green-600 mb-1">
                        97%
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Lanes within SLA
                      </p>
                    </div>
                    <div className="text-center bg-amber-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-amber-600 mb-1">
                        +0.2h
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Max transit increase
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Execute hub consolidation plan within next quarter
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-red-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      View Details
                    </button>
                    <button className="text-red-600 text-sm font-semibold hover:text-red-700 flex items-center px-4 py-3 rounded-xl hover:bg-red-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>

                {/* Hub Performance Comparison Card */}
                <div className="bg-gradient-to-br from-white to-green-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        Hub Performance Ranking
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      H1 leading performance
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      98%
                    </div>
                    <p className="text-gray-600 font-medium">
                      Hub H1 on-time processing rate
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "Hub H1 at 92% utilization with 98% on-time processing
                      sets the benchmark. H3 showing 2-hour delays needs
                      immediate attention with load redistribution."
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center bg-green-50/50 rounded-xl p-3">
                      <span className="text-sm text-gray-700 font-medium">
                        Hub H1 (Best Performer)
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        92% util, 98% on-time
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50/50 rounded-xl p-3">
                      <span className="text-sm text-gray-700 font-medium">
                        Hub H5
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        89% util, 96% on-time
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-amber-50/50 rounded-xl p-3">
                      <span className="text-sm text-gray-700 font-medium">
                        Hub H3 (Needs Attention)
                      </span>
                      <span className="text-sm font-bold text-amber-600">
                        85% util, 2hr delays
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Redistribute 3 shipments from H3 to H9 to balance queues
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      View Details
                    </button>
                    <button className="text-green-600 text-sm font-semibold hover:text-green-700 flex items-center px-4 py-3 rounded-xl hover:bg-green-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "cost-efficiency" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cost per KM Improvement Card */}
                <div className="bg-gradient-to-br from-white to-green-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        Cost per KM Performance
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      -₹1.20 weekly reduction
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      ₹42.30
                    </div>
                    <p className="text-gray-600 font-medium">
                      Current operational cost per kilometer
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "Route optimization and fuel-efficient dispatch timing are
                      driving this improvement. Current trajectory will deliver
                      ₹2.4 Cr annual savings."
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center bg-green-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-green-600 mb-1">
                        ₹42.30
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Current cost/km
                      </p>
                    </div>
                    <div className="text-center bg-green-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-green-600 mb-1">
                        -₹1.20
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Weekly reduction
                      </p>
                    </div>
                    <div className="text-center bg-green-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-green-600 mb-1">
                        ₹2.4 Cr
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Annual impact
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Continue current optimization strategies to maintain
                      improvement trajectory
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      View Details
                    </button>
                    <button className="text-green-600 text-sm font-semibold hover:text-green-700 flex items-center px-4 py-3 rounded-xl hover:bg-green-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>

                {/* Spot Market Dependency Card */}
                <div className="bg-gradient-to-br from-white to-amber-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        Spot-Market Dependency
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      40% premium costs
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      12%
                    </div>
                    <p className="text-gray-600 font-medium">
                      Current capacity needs met through spot trucks
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "Better demand forecasting and capacity planning can
                      reduce spot dependency. ₹18L of the ₹45L monthly spend is
                      avoidable through improved planning."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50/50 rounded-xl p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        This Month:
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        ₹45 L spent on spot trucks
                      </p>
                    </div>
                    <div className="bg-green-50/50 rounded-xl p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Avoidable Cost:
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        ₹18 L (40% of total)
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Implement enhanced capacity planning to reduce spot market
                      reliance
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      View Details
                    </button>
                    <button className="text-amber-600 text-sm font-semibold hover:text-amber-700 flex items-center px-4 py-3 rounded-xl hover:bg-amber-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "fleet-utilization" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Truck #146 Delay Recommendation Card */}
                <div className="bg-gradient-to-br from-white to-amber-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Truck className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        Truck #146 Optimization
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
                      45 min delay recommended
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      68%
                    </div>
                    <p className="text-gray-600 font-medium">
                      Current fill rate - can be optimized to 93%
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "Delaying departure by 45 minutes achieves 93% fill while
                      maintaining SLA. Arrival still beats target by 2 hours,
                      preventing tomorrow's spot-truck requirement."
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center bg-amber-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-amber-600 mb-1">
                        68→93%
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Fill improvement
                      </p>
                    </div>
                    <div className="text-center bg-amber-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-amber-600 mb-1">
                        45 min
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Optimal delay
                      </p>
                    </div>
                    <div className="text-center bg-green-50/50 rounded-xl p-4">
                      <div className="text-2xl font-black text-green-600 mb-1">
                        ₹15K
                      </div>
                      <p className="text-xs text-gray-600 font-semibold">
                        Spot truck avoided
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Delay truck departure to optimize fill rate and avoid
                      spot-hire costs
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      View Details
                    </button>
                    <button className="text-amber-600 text-sm font-semibold hover:text-amber-700 flex items-center px-4 py-3 rounded-xl hover:bg-amber-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>

                {/* Fleet Mix Optimization Card */}
                <div className="bg-gradient-to-br from-white to-blue-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Route className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        Fleet Mix Optimization
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      11% cost reduction possible
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-5xl font-black text-gray-900 mb-2">
                      82%
                    </div>
                    <p className="text-gray-600 font-medium">
                      Current fleet utilization rate - optimal range
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 rounded-lg p-5 mb-6">
                    <p className="text-sm text-gray-700 italic font-medium leading-relaxed">
                      "For July demand profile, optimal mix is 7×32-ft + 4×20-ft
                      trucks on BLR↔DEL route. This reduces costs by 11% and
                      cuts CO₂ emissions by 8%."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50/50 rounded-xl p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Current Mix:
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        30×20-ft trucks (standard lease)
                      </p>
                    </div>
                    <div className="bg-green-50/50 rounded-xl p-4">
                      <p className="text-sm font-bold text-gray-900 mb-1">
                        Optimized Mix:
                      </p>
                      <p className="text-sm text-gray-700 font-medium">
                        7×32-ft + 4×20-ft trucks
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      Suggested Next Step:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Implement fleet mix changes for July demand optimization
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      View Details
                    </button>
                    <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center px-4 py-3 rounded-xl hover:bg-blue-50 transition-all">
                      Discuss <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

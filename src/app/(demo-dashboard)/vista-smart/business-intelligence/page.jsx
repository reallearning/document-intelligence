"use client";
import React, { useState } from "react";
import {
  BarChart2,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Info,
  Calendar,
  MessageSquare,
  FileText,
  PieChart,
  Layers,
  Monitor,
  Truck,
  RefreshCw,
  DollarSign,
  Users,
  Clipboard,
  X,
  Send,
  ArrowRight,
  ArrowLeft,
  Clock,
  ShieldAlert,
} from "lucide-react";

const BusinessIntelligenceAgent = () => {
  const [activeTab, setActiveTab] = useState("businessHealth");
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);

  const tabs = [
    {
      id: "businessHealth",
      label: "Business Health",
      icon: <BarChart2 size={18} />,
    },
    { id: "supplyChain", label: "Supply Chain", icon: <Truck size={18} /> },
    {
      id: "productionEfficiency",
      label: "Production Efficiency",
      icon: <Layers size={18} />,
    },
    {
      id: "marketPerformance",
      label: "Market Performance",
      icon: <TrendingUp size={18} />,
    },
    { id: "cashFlow", label: "Cash Flow", icon: <DollarSign size={18} /> },
    {
      id: "qualityMetrics",
      label: "Quality Metrics",
      icon: <ShieldAlert size={18} />,
    },
  ];

  // Simple chart components
  const BarChart = () => (
    <div className="h-48 bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex justify-between mb-2">
        <div className="text-xs text-gray-500">
          Daily Production Output (₹ Cr)
        </div>
        <div className="text-xs text-gray-500">Target: 9.4 Cr</div>
      </div>
      <div className="h-32 flex items-end justify-between gap-2">
        <div className="flex flex-col items-center">
          <div
            className="bg-blue-500 w-10 rounded-t-sm"
            style={{ height: "80%" }}
          ></div>
          <div className="text-xs mt-1 text-gray-500">Mon</div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="bg-blue-500 w-10 rounded-t-sm"
            style={{ height: "85%" }}
          ></div>
          <div className="text-xs mt-1 text-gray-500">Tue</div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="bg-blue-500 w-10 rounded-t-sm"
            style={{ height: "90%" }}
          ></div>
          <div className="text-xs mt-1 text-gray-500">Wed</div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="bg-blue-500 w-10 rounded-t-sm"
            style={{ height: "88%" }}
          ></div>
          <div className="text-xs mt-1 text-gray-500">Thu</div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="bg-blue-500 w-10 rounded-t-sm"
            style={{ height: "75%" }}
          ></div>
          <div className="text-xs mt-1 text-gray-500">Fri</div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="bg-red-500 w-10 rounded-t-sm"
            style={{ height: "70%" }}
          ></div>
          <div className="text-xs mt-1 text-gray-500">Sat</div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="bg-red-500 w-10 rounded-t-sm"
            style={{ height: "72%" }}
          ></div>
          <div className="text-xs mt-1 text-gray-500">Sun</div>
        </div>
      </div>
    </div>
  );

  const LineChart = () => (
    <div className="h-48 bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex justify-between mb-2">
        <div className="text-xs text-gray-500">
          Rejection Rate by Supplier (%)
        </div>
      </div>
      <div className="h-32 relative">
        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="border-b border-gray-200 relative h-0">
            <span className="absolute -top-2 -left-4 text-xs text-gray-400">
              5%
            </span>
          </div>
          <div className="border-b border-gray-200 relative h-0">
            <span className="absolute -top-2 -left-4 text-xs text-gray-400">
              4%
            </span>
          </div>
          <div className="border-b border-gray-200 relative h-0">
            <span className="absolute -top-2 -left-4 text-xs text-gray-400">
              3%
            </span>
          </div>
          <div className="border-b border-gray-200 relative h-0">
            <span className="absolute -top-2 -left-4 text-xs text-gray-400">
              2%
            </span>
          </div>
          <div className="border-b border-gray-200 relative h-0">
            <span className="absolute -top-2 -left-4 text-xs text-gray-400">
              1%
            </span>
          </div>
          <div className="border-b border-gray-200 relative h-0">
            <span className="absolute -top-2 -left-4 text-xs text-gray-400">
              0%
            </span>
          </div>
        </div>
        <div className="absolute inset-0">
          <svg className="w-full h-full">
            <polyline
              points="0,80 50,75 100,70 150,65 200,60 250,45 300,40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <polyline
              points="150,65 200,30 250,25 300,20"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="4"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          <span className="text-xs text-gray-400">Mar 1</span>
          <span className="text-xs text-gray-400">Mar 15</span>
          <span className="text-xs text-gray-400">Apr 1</span>
          <span className="text-xs text-gray-400">Apr 15</span>
          <span className="text-xs text-gray-400">May 1</span>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 bg-blue-500"></div>
            <span className="text-xs text-gray-500">Overall</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 bg-red-500"></div>
            <span className="text-xs text-gray-500">New Suppliers</span>
          </div>
        </div>
      </div>
    </div>
  );

  const AreaChart = () => (
    <div className="h-48 bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex justify-between mb-2">
        <div className="text-xs text-gray-500">
          Electronics Division Margin Trend (%)
        </div>
      </div>
      <div className="h-32 relative">
        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="border-b border-gray-200 relative h-0">
            <span className="absolute -top-2 -left-4 text-xs text-gray-400">
              20%
            </span>
          </div>
          <div className="border-b border-gray-200 relative h-0">
            <span className="absolute -top-2 -left-4 text-xs text-gray-400">
              15%
            </span>
          </div>
          <div className="border-b border-gray-200 relative h-0">
            <span className="absolute -top-2 -left-4 text-xs text-gray-400">
              10%
            </span>
          </div>
          <div className="border-b border-gray-200 relative h-0">
            <span className="absolute -top-2 -left-4 text-xs text-gray-400">
              5%
            </span>
          </div>
        </div>
        <div className="absolute inset-0">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.5)" />
                <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M0,80 L100,75 L200,65 L300,40 L300,120 L0,120 Z"
              fill="url(#gradient)"
            />
            <polyline
              points="0,80 100,75 200,65 300,40"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          <span className="text-xs text-gray-400">Q2 2024</span>
          <span className="text-xs text-gray-400">Q3 2024</span>
          <span className="text-xs text-gray-400">Q4 2024</span>
          <span className="text-xs text-gray-400">Q1 2025</span>
        </div>
      </div>
    </div>
  );

  const DonutChart = () => (
    <div className="h-48 bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex justify-between mb-2">
        <div className="text-xs text-gray-500">
          Inventory Breakdown by Component Type
        </div>
      </div>
      <div className="flex h-32">
        <div className="w-32 h-32 relative">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray="30, 100"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeDasharray="25, 100"
              strokeDashoffset="-30"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeDasharray="20, 100"
              strokeDashoffset="-55"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
              strokeDasharray="15, 100"
              strokeDashoffset="-75"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeDasharray="10, 100"
              strokeDashoffset="-90"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center gap-1 ml-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Electronics (30%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Mechanical (25%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Chassis (20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Fasteners (15%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Other (10%)</span>
          </div>
        </div>
      </div>
    </div>
  );

  const HeatMapChart = () => (
    <div className="h-48 bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex justify-between mb-2">
        <div className="text-xs text-gray-500">
          Production Line Efficiency by Hour
        </div>
      </div>
      <div className="grid grid-cols-8 gap-1 h-32 pt-2">
        {[...Array(8)].map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-1">
            {[...Array(4)].map((_, rowIndex) => {
              // Logic to determine color intensity based on efficiency
              const efficiencies = [
                [90, 95, 80, 75, 70, 85, 90, 95], // 8-10 AM
                [95, 90, 85, 80, 75, 70, 65, 60], // 10-12 PM
                [85, 80, 75, 70, 65, 60, 55, 50], // 12-2 PM
                [90, 85, 80, 75, 70, 65, 60, 55], // 2-4 PM
              ];

              const efficiency = efficiencies[rowIndex][colIndex];
              let bgColor;

              if (efficiency >= 90) bgColor = "bg-green-500";
              else if (efficiency >= 80) bgColor = "bg-green-400";
              else if (efficiency >= 70) bgColor = "bg-yellow-400";
              else if (efficiency >= 60) bgColor = "bg-orange-400";
              else bgColor = "bg-red-400";

              return (
                <div
                  key={rowIndex}
                  className={`${bgColor} rounded w-full h-full`}
                  title={`${8 + 2 * rowIndex}-${10 + 2 * rowIndex} ${
                    colIndex + 1
                  }: ${efficiency}%`}
                ></div>
              );
            })}
            <div className="text-xs text-gray-500 text-center mt-1">
              Line {colIndex + 1}
            </div>
          </div>
        ))}
        <div className="absolute right-6 top-6 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-xs text-gray-500">90%+</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span className="text-xs text-gray-500">80-89%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span className="text-xs text-gray-500">70-79%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-400 rounded"></div>
            <span className="text-xs text-gray-500">60-69%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-400 rounded"></div>
            <span className="text-xs text-gray-500">&lt;60%</span>
          </div>
        </div>
      </div>
    </div>
  );

  const GaugeChart = () => (
    <div className="h-48 bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex justify-between mb-2">
        <div className="text-xs text-gray-500">
          On-Time Delivery Performance
        </div>
      </div>
      <div className="flex items-center justify-center h-32 relative">
        <div className="w-32 h-16 overflow-hidden relative">
          <div className="w-32 h-32 rounded-full border-8 border-gray-200 absolute -top-16"></div>
          <div
            className="w-32 h-32 rounded-full border-8 border-transparent border-t-amber-500 border-r-amber-500 absolute -top-16"
            style={{ transform: "rotate(45deg)" }}
          ></div>
          <div
            className="absolute top-0 left-1/2 w-1 h-4 bg-gray-800"
            style={{ transform: "translateX(-50%)" }}
          ></div>
          <div
            className="absolute top-0 left-0 w-1 h-3 bg-gray-400"
            style={{ transform: "rotate(-60deg) translateY(-8px)" }}
          ></div>
          <div
            className="absolute top-0 right-0 w-1 h-3 bg-gray-400"
            style={{ transform: "rotate(60deg) translateY(-8px)" }}
          ></div>
        </div>
        <div className="absolute bottom-4 text-center">
          <div className="text-2xl font-bold text-amber-600">82%</div>
          <div className="text-xs text-gray-500">Target: 95%</div>
        </div>
        <div className="absolute top-4 left-6">
          <div className="text-xs text-gray-500">Poor</div>
        </div>
        <div className="absolute top-4 right-6">
          <div className="text-xs text-gray-500">Excellent</div>
        </div>
      </div>
    </div>
  );

  // Modals
  const DetailedAnalysisModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-medium text-gray-800">
            Detailed Analysis: Production Output
          </h2>
          <button
            onClick={() => setShowDetailedAnalysis(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Current Output</div>
              <div className="text-2xl font-bold text-gray-800">₹8.75 Cr</div>
              <div className="text-sm text-red-600 flex items-center gap-1">
                <TrendingDown size={14} />
                7% below target
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Target Output</div>
              <div className="text-2xl font-bold text-gray-800">₹9.40 Cr</div>
              <div className="text-sm text-gray-500">Daily Production</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">MTD Performance</div>
              <div className="text-2xl font-bold text-gray-800">96.2%</div>
              <div className="text-sm text-amber-600 flex items-center gap-1">
                <AlertCircle size={14} />
                3.8% below plan
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Production Trend (Last 14 Days)
          </h3>

          <div className="h-64 bg-gray-50 rounded-lg p-4 mb-8">
            <div className="h-full relative">
              {/* Simplified chart representation */}
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="border-b border-gray-200 relative h-0">
                  <span className="absolute -top-2 -left-4 text-xs text-gray-400">
                    10 Cr
                  </span>
                </div>
                <div className="border-b border-gray-200 relative h-0">
                  <span className="absolute -top-2 -left-4 text-xs text-gray-400">
                    9 Cr
                  </span>
                </div>
                <div className="border-b border-gray-200 relative h-0">
                  <span className="absolute -top-2 -left-4 text-xs text-gray-400">
                    8 Cr
                  </span>
                </div>
                <div className="border-b border-gray-200 relative h-0">
                  <span className="absolute -top-2 -left-4 text-xs text-gray-400">
                    7 Cr
                  </span>
                </div>
              </div>
              <div className="absolute inset-0">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient
                      id="areaGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                  </defs>
                  {/* Target line */}
                  <line
                    x1="0"
                    y1="20"
                    x2="100%"
                    y2="20"
                    stroke="#ef4444"
                    strokeWidth="1"
                    strokeDasharray="4"
                  />
                  <text x="8" y="16" fontSize="10" fill="#ef4444">
                    Target
                  </text>

                  {/* Area chart for actual production */}
                  <path
                    d="M0,40 L40,35 L80,30 L120,35 L160,40 L200,45 L240,50 L280,45 L320,40 L360,45 L400,60 L440,70 L480,65 L520,70 L560,40 L600,35 L600,180 L0,180 Z"
                    fill="url(#areaGradient)"
                  />
                  <polyline
                    points="0,40 40,35 80,30 120,35 160,40 200,45 240,50 280,45 320,40 360,45 400,60 440,70 480,65 520,70 560,40 600,35"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400">
                <span>Apr 19</span>
                <span>Apr 21</span>
                <span>Apr 23</span>
                <span>Apr 25</span>
                <span>Apr 27</span>
                <span>Apr 29</span>
                <span>May 1</span>
                <span>May 2</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Primary Contributing Factors
          </h3>

          <div className="space-y-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-500" />
                Equipment Failure at Pune Facility
              </h4>
              <p className="text-gray-600 mb-2">
                The CNC machining center at Pune facility experienced a critical
                failure at 3:45 AM, resulting in a 6-hour production stoppage.
                This accounts for approximately 60% of today's production
                shortfall.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-red-100 text-red-700 px-2 py-1 rounded">
                  Critical Impact
                </div>
                <div className="text-gray-500 flex items-center gap-1">
                  <Clock size={14} />6 hours of downtime
                </div>
                <div className="text-gray-500 flex items-center gap-1">
                  <AlertCircle size={14} />
                  Maintenance team deployed
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Truck size={16} className="text-amber-500" />
                Supply Chain Disruption
              </h4>
              <p className="text-gray-600 mb-2">
                Two key suppliers from Gujarat were unable to deliver critical
                electronic components due to regional transportation strikes.
                This has affected the Electronics division production capacity
                by 15%.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded">
                  Medium Impact
                </div>
                <div className="text-gray-500 flex items-center gap-1">
                  <Calendar size={14} />
                  Expected resolution: May 4
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Users size={16} className="text-blue-500" />
                Workforce Availability
              </h4>
              <p className="text-gray-600 mb-2">
                Absenteeism rate is 8% higher than normal due to local festival.
                This has primarily affected auxiliary operations and quality
                control processes, causing minor production delays.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  Minor Impact
                </div>
                <div className="text-gray-500 flex items-center gap-1">
                  <Calendar size={14} />
                  Expected to normalize tomorrow
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Recommended Actions
          </h3>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h4 className="font-medium text-blue-700 mb-1">
                Immediate (Next 24 Hours)
              </h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>
                  Expedite emergency repair of Pune facility CNC machine with
                  overtime maintenance team
                </li>
                <li>
                  Activate alternative supplier protocol for electronic
                  components from Mumbai warehouse
                </li>
                <li>
                  Shift critical production tasks to Chennai facility to
                  compensate for workforce gaps
                </li>
              </ul>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
              <h4 className="font-medium text-indigo-700 mb-1">
                Short-term (Next Week)
              </h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>
                  Conduct comprehensive maintenance audit across all facilities
                  to identify potential failure points
                </li>
                <li>
                  Develop contingency routing plans for critical component
                  supplies affected by regional disruptions
                </li>
                <li>
                  Review workforce scheduling to account for seasonal
                  festivities and regional events
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <h4 className="font-medium text-green-700 mb-1">
                Long-term (Next Month)
              </h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>
                  Implement predictive maintenance system for all CNC equipment
                  with real-time monitoring
                </li>
                <li>
                  Diversify supplier base for critical electronic components
                  with at least two backup vendors per component
                </li>
                <li>
                  Develop cross-training program to improve workforce
                  flexibility during peak absence periods
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Financial Impact Assessment
          </h3>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Factor
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                    Impact Amount
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Recovery Plan
                  </th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                    Recovery Timeline
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Equipment Downtime
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-red-600">
                    ₹42.6 Lakhs
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Weekend overtime production
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-700">
                    May 6-7
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Supply Chain Disruption
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-red-600">
                    ₹18.3 Lakhs
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Alternative suppliers (10% premium)
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-700">
                    May 4-5
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Workforce Availability
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-amber-600">
                    ₹7.5 Lakhs
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Process optimization
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-700">
                    May 3
                  </td>
                </tr>
                <tr className="bg-gray-50 font-medium">
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Total Impact
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-red-600">
                    ₹68.4 Lakhs
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    Recovery Cost: ₹22.8 Lakhs
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-gray-700">
                    Net Loss: ₹45.6 Lakhs
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowDetailedAnalysis(false);
                setShowDiscussion(true);
              }}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              Start Discussion
              <MessageSquare size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Discussion Modal
  const DiscussionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-medium text-gray-800">
            Discussion: Production Output
          </h2>
          <button
            onClick={() => setShowDiscussion(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                <BarChart2 size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-800 mb-1">
                  Business Intelligence Agent
                </div>
                <p className="text-gray-700">
                  I've identified that the production output is 7% below target
                  today, with the primary factors being equipment failure at the
                  Pune facility and supply chain disruptions. Would you like me
                  to suggest a mitigation plan?
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  May 02, 08:30 AM
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 ml-8">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 text-indigo-600 rounded-full p-2">
                <Users size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-800 mb-1">
                  Rajiv Mehta, CFO
                </div>
                <p className="text-gray-700">
                  Yes, please provide a mitigation plan. I'm particularly
                  concerned about the impact this will have on our OEM delivery
                  commitments. Can you also quantify the financial impact if we
                  don't recover the production loss?
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  May 02, 08:45 AM
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                <BarChart2 size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-800 mb-1">
                  Business Intelligence Agent
                </div>
                <p className="text-gray-700">
                  I've analyzed the situation and here's the potential impact on
                  OEM commitments: If production remains at current levels,
                  we'll miss delivery targets for Maruti Suzuki by 12% and Tata
                  Motors by 8%. This would trigger penalty clauses of
                  approximately ₹92 lakhs.
                </p>
                <p className="text-gray-700 mt-2">
                  Recommended mitigation plan:
                </p>
                <ol className="list-decimal pl-5 text-gray-700 space-y-1 mt-1">
                  <li>
                    Activate emergency maintenance protocols at Pune with 24/7
                    teams until fixed
                  </li>
                  <li>
                    Temporarily shift high-priority production to Bangalore
                    facility
                  </li>
                  <li>
                    Negotiate 48-hour grace period with OEMs, leveraging our
                    historical reliability
                  </li>
                </ol>
                <div className="text-xs text-gray-500 mt-1">
                  May 02, 08:52 AM
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4 ml-8">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 text-indigo-600 rounded-full p-2">
                <Users size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-800 mb-1">
                  Rajiv Mehta, CFO
                </div>
                <p className="text-gray-700">
                  Good analysis. Let's implement your recommendations
                  immediately. Please coordinate with Operations and Sales teams
                  to execute the plan. Also, can you prepare a detailed report
                  on the maintenance issue at Pune? I want to understand why
                  this wasn't flagged in the preventive maintenance schedule.
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  May 02, 09:05 AM
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                <BarChart2 size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-800 mb-1">
                  Business Intelligence Agent
                </div>
                <p className="text-gray-700">
                  I'll coordinate with the teams right away. Regarding the
                  maintenance issue, my preliminary analysis shows that the CNC
                  machine was due for preventive maintenance on April 25, but it
                  was postponed due to high production demands. I'll prepare a
                  comprehensive report including maintenance history,
                  postponement decisions, and recommendations to prevent similar
                  situations in the future.
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  May 02, 09:12 AM
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Type your message here..."
              className="w-full rounded-lg border border-gray-300 p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="bg-gray-50 h-screen overflow-y-auto font-sans">
      {/* Modals */}
      {showDetailedAnalysis && <DetailedAnalysisModal />}
      {showDiscussion && <DiscussionModal />}

      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 rounded-lg">
            <BarChart2 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-light tracking-tight text-gray-900">
              VistaSmart{" "}
              <span className="font-bold">Business Intelligence</span>
            </h1>
            <p className="text-gray-500 text-sm">
              Last updated: May 02, 2025 • 08:30 AM
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-amber-50 px-4 py-2 rounded-lg text-amber-700 text-sm font-medium">
          <AlertCircle size={16} />
          <span>5 critical insights requiring attention today</span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Daily Intelligence Briefing */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
          <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-800">
              Daily Manufacturing Intelligence Briefing
            </h2>
            <div className="text-sm text-gray-500">May 02, 2025</div>
          </div>

          <div className="p-6">
            <p className="text-gray-700 mb-4">
              The manufacturing performance is showing concerning trends in the
              last 24 hours that require immediate attention. Production output
              is tracking 7% below target, with a particularly troubling 12%
              decline in the Western India facilities that correlates directly
              with supply chain disruptions from three key component suppliers.
            </p>

            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">
                Most urgent issues identified:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">
                    <AlertCircle size={16} />
                  </div>
                  <span className="text-gray-700">
                    OEM customer's "Just-in-Time" schedule change is directly
                    impacting our Electronics division delivery commitments
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">
                    <AlertCircle size={16} />
                  </div>
                  <span className="text-gray-700">
                    Component inventory for precision machined parts has
                    decreased to 2.8 days, below our 4 day safety threshold
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">
                    <AlertCircle size={16} />
                  </div>
                  <span className="text-gray-700">
                    Premium air freight costs have increased 24% due to urgent
                    shipments to meet customer deadlines
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 text-red-500">
                    <AlertCircle size={16} />
                  </div>
                  <span className="text-gray-700">
                    Pune facility reported zero production output for 6 hours
                    due to unexpected equipment failure
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">
                Primary recommendation:
              </h3>
              <p className="text-gray-700">
                Implement escalated supplier recovery process for critical
                components, with 24-hour expedited shipments from alternative
                suppliers, while scheduling emergency maintenance for the Pune
                facility equipment during non-peak hours.
              </p>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-2">
                <FileText size={16} />
                Review production schedule
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Truck size={16} />
                Address supply chain issues
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <RefreshCw size={16} />
                Reconfigure capacity planning
              </button>
            </div>
          </div>
        </section>

        {/* Focus Areas Tabs */}
        <div className="mb-6">
          <div className="flex overflow-x-auto gap-2 pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Insights Section - Business Health */}
        {activeTab === "businessHealth" && (
          <div className="space-y-6">
            <h2 className="text-xl font-light text-gray-800 mb-4">
              Business Health <span className="font-semibold">Insights</span>
            </h2>
            <p className="text-gray-500">
              Key observations requiring attention and potential action
            </p>

            {/* Insight Card 1 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="border-l-4 border-red-500 px-6 py-5 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Total Production Output vs Target
                  </h3>
                  <div className="mt-1 text-2xl font-semibold">₹8.75 Cr</div>
                  <div className="text-red-600 font-medium flex items-center gap-1 mt-1">
                    <TrendingDown size={16} />
                    Production output tracking 7% below daily target
                  </div>
                </div>
                <div className="bg-red-50 text-red-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                  <TrendingDown size={14} /> 7%
                </div>
              </div>

              <div className="px-6 py-4">
                <p className="text-gray-700 mb-4">
                  Yesterday's production output was 7% below plan, driven mostly
                  by equipment failure in the Pune facility.
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                  <p className="text-gray-700 italic">
                    I've noticed this downward trend over the past 3 days. The
                    equipment failure seems to be related to postponed
                    preventive maintenance schedules. We might need to reassess
                    our maintenance protocols.
                  </p>
                </div>

                {/* Chart */}
                <BarChart />

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                  <h4 className="font-medium text-blue-700 mb-1">
                    Suggested Next Step:
                  </h4>
                  <p className="text-gray-700">
                    Alert maintenance team to review preventive maintenance
                    schedule and implement emergency repairs during non-peak
                    hours
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setShowDetailedAnalysis(true)}
                    className="text-blue-600 font-medium text-sm flex items-center gap-1"
                  >
                    <FileText size={16} />
                    Detailed Analysis
                  </button>
                  <button
                    onClick={() => setShowDiscussion(true)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1"
                  >
                    Discuss
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Insight Card 2 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="border-l-4 border-amber-500 px-6 py-5 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Component Quality Rejection Rate
                  </h3>
                  <div className="mt-1 text-2xl font-semibold">3.2%</div>
                  <div className="text-amber-600 font-medium flex items-center gap-1 mt-1">
                    <TrendingUp size={16} />
                    Increased from 2.1% last month
                  </div>
                </div>
                <div className="bg-amber-50 text-amber-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                  <TrendingUp size={14} /> +1.1%
                </div>
              </div>

              <div className="px-6 py-4">
                <p className="text-gray-700 mb-4">
                  The rejection rate for precision-machined components has
                  increased by 1.1 percentage points from last month.
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                  <p className="text-gray-700 italic">
                    The increase in rejection rates coincides with the
                    onboarding of two new suppliers for the Electronics
                    division. Their parts account for 68% of all rejections this
                    month.
                  </p>
                </div>

                {/* Chart */}
                <LineChart />

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                  <h4 className="font-medium text-blue-700 mb-1">
                    Suggested Next Step:
                  </h4>
                  <p className="text-gray-700">
                    Schedule quality audit with the two new suppliers and
                    provide technical assistance to help them meet quality
                    standards
                  </p>
                </div>

                <div className="flex justify-between">
                  <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                    <FileText size={16} />
                    Detailed Analysis
                  </button>
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                    Discuss
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Insight Card 3 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="border-l-4 border-green-500 px-6 py-5 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Electronics Division Profit Margin
                  </h3>
                  <div className="mt-1 text-2xl font-semibold">18.7%</div>
                  <div className="text-green-600 font-medium flex items-center gap-1 mt-1">
                    <TrendingUp size={16} />
                    Increased from 16.2% last quarter
                  </div>
                </div>
                <div className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                  <TrendingUp size={14} /> +2.5%
                </div>
              </div>

              <div className="px-6 py-4">
                <p className="text-gray-700 mb-4">
                  The Electronics division has achieved significant margin
                  improvement despite supply chain challenges.
                </p>

                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                  <p className="text-gray-700 italic">
                    The margin improvement comes from successful implementation
                    of automation in testing procedures and negotiated price
                    improvements with 3 key suppliers. This approach could be
                    replicated in other divisions.
                  </p>
                </div>

                {/* Chart */}
                <AreaChart />

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                  <h4 className="font-medium text-blue-700 mb-1">
                    Suggested Next Step:
                  </h4>
                  <p className="text-gray-700">
                    Organize cross-divisional knowledge transfer session to
                    share Electronics division's supplier negotiation strategy
                  </p>
                </div>

                <div className="flex justify-between">
                  <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                    <FileText size={16} />
                    Detailed Analysis
                  </button>
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                    Discuss
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Supply Chain Tab */}
        {activeTab === "supplyChain" && (
          <div>
            <h2 className="text-xl font-light text-gray-800 mb-4">
              Supply Chain <span className="font-semibold">Insights</span>
            </h2>
            <p className="text-gray-500 mb-6">
              Key observations requiring attention and potential action
            </p>

            <div className="space-y-6">
              {/* Supply Chain Insight Card 1 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-l-4 border-red-500 px-6 py-5 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      On-Time Delivery Performance
                    </h3>
                    <div className="mt-1 text-2xl font-semibold">82%</div>
                    <div className="text-red-600 font-medium flex items-center gap-1 mt-1">
                      <TrendingDown size={16} />
                      13% below target of 95%
                    </div>
                  </div>
                  <div className="bg-red-50 text-red-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <TrendingDown size={14} /> 13%
                  </div>
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-4">
                    Our on-time delivery performance has declined significantly
                    over the past month, particularly for OEM customers.
                  </p>

                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                    <p className="text-gray-700 italic">
                      Transportation disruptions in Gujarat and Maharashtra are
                      causing delays in both raw material receipts and finished
                      goods shipments. This is particularly affecting our
                      Just-in-Time deliveries to automotive OEMs.
                    </p>
                  </div>

                  {/* Gauge Chart */}
                  <GaugeChart />

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                    <h4 className="font-medium text-blue-700 mb-1">
                      Suggested Next Step:
                    </h4>
                    <p className="text-gray-700">
                      Implement temporary logistics adjustments, including air
                      freight for critical components and finished products for
                      OEM customers
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                      <FileText size={16} />
                      Detailed Analysis
                    </button>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                      Discuss
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Supply Chain Insight Card 2 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-l-4 border-amber-500 px-6 py-5 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Inventory Breakdown by Component
                    </h3>
                    <div className="mt-1 text-2xl font-semibold">₹186.4 Cr</div>
                    <div className="text-amber-600 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle size={16} />
                      Electronics components at critical levels
                    </div>
                  </div>
                  <div className="bg-amber-50 text-amber-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <AlertCircle size={14} /> Alert
                  </div>
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-4">
                    Current inventory levels show critical shortages in
                    electronics components while mechanical parts show excess
                    inventory.
                  </p>

                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                    <p className="text-gray-700 italic">
                      The imbalance in inventory is creating production
                      bottlenecks and tying up capital. Electronics inventory
                      has fallen below our safety stock levels, while mechanical
                      parts inventory is 32% above optimal levels.
                    </p>
                  </div>

                  {/* Donut Chart */}
                  <DonutChart />

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                    <h4 className="font-medium text-blue-700 mb-1">
                      Suggested Next Step:
                    </h4>
                    <p className="text-gray-700">
                      Execute emergency procurement for critical electronics
                      components and temporarily reduce mechanical parts orders
                      until inventory normalizes
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                      <FileText size={16} />
                      Detailed Analysis
                    </button>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                      Discuss
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Production Efficiency Tab */}
        {activeTab === "productionEfficiency" && (
          <div>
            <h2 className="text-xl font-light text-gray-800 mb-4">
              Production Efficiency{" "}
              <span className="font-semibold">Insights</span>
            </h2>
            <p className="text-gray-500 mb-6">
              Key observations requiring attention and potential action
            </p>

            <div className="space-y-6">
              {/* Production Efficiency Insight Card 1 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-l-4 border-amber-500 px-6 py-5 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Production Line Efficiency
                    </h3>
                    <div className="mt-1 text-2xl font-semibold">76.3%</div>
                    <div className="text-amber-600 font-medium flex items-center gap-1 mt-1">
                      <TrendingDown size={16} />
                      8.7% below target of 85%
                    </div>
                  </div>
                  <div className="bg-amber-50 text-amber-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <TrendingDown size={14} /> 8.7%
                  </div>
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-4">
                    Production line efficiency is showing significant variation
                    across different lines and time periods.
                  </p>

                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                    <p className="text-gray-700 italic">
                      Lines 6-8 show consistently lower efficiency rates,
                      particularly during the afternoon shift. Initial analysis
                      indicates this may be related to ambient temperature
                      variations and equipment calibration drift.
                    </p>
                  </div>

                  {/* Heat Map Chart */}
                  <HeatMapChart />

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                    <h4 className="font-medium text-blue-700 mb-1">
                      Suggested Next Step:
                    </h4>
                    <p className="text-gray-700">
                      Implement mid-shift calibration checks for lines 6-8 and
                      review HVAC settings for afternoon temperature regulation
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                      <FileText size={16} />
                      Detailed Analysis
                    </button>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                      Discuss
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Production Efficiency Insight Card 2 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-l-4 border-green-500 px-6 py-5 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Overall Equipment Effectiveness
                    </h3>
                    <div className="mt-1 text-2xl font-semibold">87.2%</div>
                    <div className="text-green-600 font-medium flex items-center gap-1 mt-1">
                      <TrendingUp size={16} />
                      Increased from 82.5% last month
                    </div>
                  </div>
                  <div className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <TrendingUp size={14} /> +4.7%
                  </div>
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-4">
                    Overall Equipment Effectiveness (OEE) has improved
                    significantly in the last month due to our maintenance
                    optimization program.
                  </p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                    <p className="text-gray-700 italic">
                      The new predictive maintenance system implemented for
                      stamping machines has reduced unplanned downtime by 42%.
                      This model could be extended to other equipment types for
                      further improvements.
                    </p>
                  </div>

                  {/* Chart would go here */}
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                    <p className="text-gray-400">
                      OEE Trend by Equipment Type (Last 3 Months)
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                    <h4 className="font-medium text-blue-700 mb-1">
                      Suggested Next Step:
                    </h4>
                    <p className="text-gray-700">
                      Expand predictive maintenance program to CNC machines and
                      welding equipment in Q2 2025
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                      <FileText size={16} />
                      Detailed Analysis
                    </button>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                      Discuss
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Market Performance Tab */}
        {activeTab === "marketPerformance" && (
          <div>
            <h2 className="text-xl font-light text-gray-800 mb-4">
              Market Performance <span className="font-semibold">Insights</span>
            </h2>
            <p className="text-gray-500 mb-6">
              Key observations requiring attention and potential action
            </p>

            <div className="space-y-6">
              {/* Market Performance Insight Card 1 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-l-4 border-green-500 px-6 py-5 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Order Book Position
                    </h3>
                    <div className="mt-1 text-2xl font-semibold">₹1240 Cr</div>
                    <div className="text-green-600 font-medium flex items-center gap-1 mt-1">
                      <TrendingUp size={16} />
                      18% increase compared to last quarter
                    </div>
                  </div>
                  <div className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <TrendingUp size={14} /> +18%
                  </div>
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-4">
                    Our order book has grown substantially, driven by new
                    business from automotive and consumer electronics sectors.
                  </p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                    <p className="text-gray-700 italic">
                      The growth is particularly strong in EV component orders,
                      which now represent 32% of our automotive segment. This
                      reflects the accelerating shift to electric mobility in
                      our major markets.
                    </p>
                  </div>

                  {/* Chart would go here */}
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                    <p className="text-gray-400">
                      Order Book Trend by Sector (Last 6 Quarters)
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                    <h4 className="font-medium text-blue-700 mb-1">
                      Suggested Next Step:
                    </h4>
                    <p className="text-gray-700">
                      Develop capacity expansion plan for EV component
                      production lines to meet projected 40% growth in next 18
                      months
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                      <FileText size={16} />
                      Detailed Analysis
                    </button>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                      Discuss
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Market Performance Insight Card 2 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-l-4 border-amber-500 px-6 py-5 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Market Share Analysis
                    </h3>
                    <div className="mt-1 text-2xl font-semibold">23.8%</div>
                    <div className="text-amber-600 font-medium flex items-center gap-1 mt-1">
                      <TrendingDown size={16} />
                      Slight decline in power steering components
                    </div>
                  </div>
                  <div className="bg-amber-50 text-amber-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <AlertCircle size={14} /> Alert
                  </div>
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-4">
                    While our overall market share remains strong, we're seeing
                    competitive pressure in specific product categories.
                  </p>

                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                    <p className="text-gray-700 italic">
                      Competitor analysis shows aggressive pricing from Turkish
                      and Southeast Asian manufacturers in the power steering
                      component segment, with price points 8-12% below our
                      current levels.
                    </p>
                  </div>

                  {/* Chart would go here */}
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                    <p className="text-gray-400">
                      Market Share by Product Category (Last 4 Quarters)
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                    <h4 className="font-medium text-blue-700 mb-1">
                      Suggested Next Step:
                    </h4>
                    <p className="text-gray-700">
                      Review cost structure for power steering components and
                      assess potential for automation to improve competitiveness
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                      <FileText size={16} />
                      Detailed Analysis
                    </button>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                      Discuss
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cash Flow Tab */}
        {activeTab === "cashFlow" && (
          <div>
            <h2 className="text-xl font-light text-gray-800 mb-4">
              Cash Flow <span className="font-semibold">Insights</span>
            </h2>
            <p className="text-gray-500 mb-6">
              Key observations requiring attention and potential action
            </p>

            <div className="space-y-6">
              {/* Cash Flow Insight Card 1 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-l-4 border-amber-500 px-6 py-5 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Days Sales Outstanding (DSO)
                    </h3>
                    <div className="mt-1 text-2xl font-semibold">57 days</div>
                    <div className="text-amber-600 font-medium flex items-center gap-1 mt-1">
                      <TrendingUp size={16} />
                      Increased from 48 days in Q4 2024
                    </div>
                  </div>
                  <div className="bg-amber-50 text-amber-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <TrendingUp size={14} /> +9 days
                  </div>
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-4">
                    Our Days Sales Outstanding has increased significantly,
                    impacting working capital and cash flow.
                  </p>

                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                    <p className="text-gray-700 italic">
                      The increase is primarily driven by extended payment terms
                      requested by three major OEM customers in the consumer
                      electronics segment. This represents a shift in industry
                      payment practices.
                    </p>
                  </div>

                  {/* Chart would go here */}
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                    <p className="text-gray-400">
                      DSO Trend by Customer Segment (Last 6 Quarters)
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                    <h4 className="font-medium text-blue-700 mb-1">
                      Suggested Next Step:
                    </h4>
                    <p className="text-gray-700">
                      Implement early payment discount program for key accounts
                      and review customer payment terms during next contract
                      renewals
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                      <FileText size={16} />
                      Detailed Analysis
                    </button>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                      Discuss
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Cash Flow Insight Card 2 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-l-4 border-green-500 px-6 py-5 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Free Cash Flow
                    </h3>
                    <div className="mt-1 text-2xl font-semibold">₹86.3 Cr</div>
                    <div className="text-green-600 font-medium flex items-center gap-1 mt-1">
                      <TrendingUp size={16} />
                      12% increase from previous quarter
                    </div>
                  </div>
                  <div className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <TrendingUp size={14} /> +12%
                  </div>
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-4">
                    Free cash flow has improved despite the DSO challenges, due
                    to effective inventory management and capital expenditure
                    optimization.
                  </p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                    <p className="text-gray-700 italic">
                      The automated inventory management system implemented in
                      Q1 has reduced overall inventory levels by 14%, while the
                      new capex approval process has improved capital allocation
                      efficiency.
                    </p>
                  </div>

                  {/* Chart would go here */}
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                    <p className="text-gray-400">
                      Free Cash Flow Components (Last 6 Quarters)
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                    <h4 className="font-medium text-blue-700 mb-1">
                      Suggested Next Step:
                    </h4>
                    <p className="text-gray-700">
                      Extend automated inventory management to all facilities
                      and develop a standardized ROI framework for capex
                      evaluation
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                      <FileText size={16} />
                      Detailed Analysis
                    </button>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                      Discuss
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quality Metrics Tab */}
        {activeTab === "qualityMetrics" && (
          <div>
            <h2 className="text-xl font-light text-gray-800 mb-4">
              Quality Metrics <span className="font-semibold">Insights</span>
            </h2>
            <p className="text-gray-500 mb-6">
              Key observations requiring attention and potential action
            </p>

            <div className="space-y-6">
              {/* Quality Metrics Insight Card 1 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-l-4 border-red-500 px-6 py-5 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Customer Quality Complaints
                    </h3>
                    <div className="mt-1 text-2xl font-semibold">14 PPM</div>
                    <div className="text-red-600 font-medium flex items-center gap-1 mt-1">
                      <TrendingUp size={16} />
                      Increased from 8 PPM last quarter
                    </div>
                  </div>
                  <div className="bg-red-50 text-red-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <TrendingUp size={14} /> +75%
                  </div>
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-4">
                    Customer quality complaints have increased significantly,
                    primarily in the wiring harness product category.
                  </p>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-6">
                    <p className="text-gray-700 italic">
                      Root cause analysis indicates that 68% of complaints are
                      related to terminal crimping issues from a new automated
                      assembly line installed in February 2025.
                    </p>
                  </div>

                  {/* Chart would go here */}
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                    <p className="text-gray-400">
                      Quality Complaints by Product Category (Last 12 Months)
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                    <h4 className="font-medium text-blue-700 mb-1">
                      Suggested Next Step:
                    </h4>
                    <p className="text-gray-700">
                      Schedule technical support from equipment manufacturer and
                      implement 100% inspection for crimping quality until issue
                      is resolved
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                      <FileText size={16} />
                      Detailed Analysis
                    </button>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                      Discuss
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quality Metrics Insight Card 2 */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="border-l-4 border-green-500 px-6 py-5 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      First Pass Yield
                    </h3>
                    <div className="mt-1 text-2xl font-semibold">96.8%</div>
                    <div className="text-green-600 font-medium flex items-center gap-1 mt-1">
                      <TrendingUp size={16} />
                      Improved from 94.2% last quarter
                    </div>
                  </div>
                  <div className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                    <TrendingUp size={14} /> +2.6%
                  </div>
                </div>

                <div className="px-6 py-4">
                  <p className="text-gray-700 mb-4">
                    First pass yield has improved significantly across most
                    production lines, contributing to better operational
                    efficiency.
                  </p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
                    <p className="text-gray-700 italic">
                      The improvement is primarily due to the implementation of
                      machine vision inspection systems and standardized work
                      instructions across all facilities.
                    </p>
                  </div>

                  {/* Chart would go here */}
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                    <p className="text-gray-400">
                      First Pass Yield by Facility (Last 6 Months)
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                    <h4 className="font-medium text-blue-700 mb-1">
                      Suggested Next Step:
                    </h4>
                    <p className="text-gray-700">
                      Document best practices from top-performing lines and
                      implement standardized procedures across all facilities
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button className="text-blue-600 font-medium text-sm flex items-center gap-1">
                      <FileText size={16} />
                      Detailed Analysis
                    </button>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-1">
                      Discuss
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessIntelligenceAgent;

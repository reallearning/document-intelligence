"use client";
import React, { useState } from "react";

interface HeaderProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

const Header = ({ activeTab, onChange }: HeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row justify-between md:items-center mb-6">
      <div className="flex items-start">
        <div className="mr-4 text-blue-600">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <div>
            <h1 className="text-xl font-semibold">VistaSmart</h1>
            <span className="text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1 mt-2 inline-block">
              Real-time tracking · Last updated: May 2, 2025, 8:45 AM
            </span>
          </div>
          <div className="flex gap-8 mt-8 cursor-pointer">
            <div
              className={`border ${
                activeTab === "Financial Performance"
                  ? "border-blue-600"
                  : "border-gray-300"
              } rounded-md px-4 py-1`}
              onClick={() => {
                onChange("Financial Performance");
              }}
            >
              Financial Performance
            </div>
            <div
              className={`border ${
                activeTab === "Budget Scenario Simulations"
                  ? "border-blue-600"
                  : "border-gray-300"
              } rounded-md px-4 py-1`}
              onClick={() => {
                onChange("Budget Scenario Simulations");
              }}
            >
              Budget Scenario Simulations
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-4 md:mt-0">
        <button className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium border border-gray-200 bg-white">
          <svg
            className="mr-2"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export Report
        </button>
        <button className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white">
          <svg
            className="mr-2"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Update Data
        </button>
      </div>
    </header>
  );
};

const FinancialPerformace = () => {
  const [activeTab, setActiveTab] = useState("Monthly");
  return (
    <>
      <div className="bg-white rounded-lg shadow p-3 md:p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <select
            defaultValue="May 2025"
            className="py-2 px-3 rounded-md border border-gray-200 text-sm min-w-[120px]"
          >
            <option>YTD 2025</option>
            <option>Q1 2025</option>
            <option>Q2 2025</option>
            <option>April 2025</option>
            <option>May 2025</option>
          </select>

          <select
            defaultValue="All Product Lines"
            className="py-2 px-3 rounded-md border border-gray-200 text-sm min-w-[120px]"
          >
            <option>All Product Lines</option>
            <option>SmartHub Series</option>
            <option>SenseConnect Devices</option>
            <option>HomeOS Ecosystem</option>
            <option>SecurityPlus Solutions</option>
          </select>

          <select
            defaultValue="All Regions"
            className="py-2 px-3 rounded-md border border-gray-200 text-sm min-w-[120px]"
          >
            <option>All Regions</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia Pacific</option>
            <option>Rest of World</option>
          </select>
        </div>

        <button className="inline-flex items-center px-4 py-2 rounded-md text-sm border border-gray-200 bg-white">
          <svg
            className="mr-2"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          More Filters
        </button>
      </div>

      {/* Top KPIs */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold">Performance Snapshot</h2>
          <div className="flex mt-2 sm:mt-0">
            <div
              className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                activeTab === "Monthly"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setActiveTab("Monthly")}
            >
              Monthly
            </div>
            <div
              className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                activeTab === "YTD"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setActiveTab("YTD")}
            >
              YTD
            </div>
            <div
              className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                activeTab === "Last12Months"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "border-b-2 border-transparent"
              }`}
              onClick={() => setActiveTab("Last12Months")}
            >
              Last 12 Months
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 flex justify-between mb-2">
              REVENUE
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">$11.7M</div>
            <div className="text-xs text-gray-500 text-right">
              vs $10.5M Plan
            </div>
            <div className="flex items-center text-sm font-medium text-green-500 mt-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              +11.4% vs Plan
            </div>
          </div>

          <div className="p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 flex justify-between mb-2">
              UNITS SOLD
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">285.6K</div>
            <div className="text-xs text-gray-500 text-right">vs 260K Plan</div>
            <div className="flex items-center text-sm font-medium text-green-500 mt-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              +9.8% vs Plan
            </div>
          </div>

          <div className="p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 flex justify-between mb-2">
              GROSS MARGIN
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">40.3%</div>
            <div className="text-xs text-gray-500 text-right">
              vs 44.0% Plan
            </div>
            <div className="flex items-center text-sm font-medium text-red-500 mt-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
              </svg>
              -3.7% vs Plan
            </div>
          </div>

          <div className="p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 flex justify-between mb-2">
              OPERATING EXPENSES
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">$3.4M</div>
            <div className="text-xs text-gray-500 text-right">
              vs $3.2M Plan
            </div>
            <div className="flex items-center text-sm font-medium text-red-500 mt-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
              </svg>
              +6.3% vs Plan
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6 border-l-4 border-blue-600 relative">
          <div className="flex items-center mb-2 text-blue-600 font-semibold">
            <svg
              className="mr-2"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Performance Insight
          </div>
          <p>
            May performance shows strong top-line results with revenue exceeding
            plan by 11.4%, driven by better-than-expected unit sales across all
            product lines. However, gross margin continues to face pressure from
            elevated component costs, coming in 3.7 percentage points below
            plan. SmartHub Series is showing particularly strong momentum
            (+18.2% vs plan) ahead of the upcoming HomeOS 4.0 launch.
          </p>
        </div>
      </div>

      {/* Detailed Performance Tracking */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Monthly Performance Tracking
          </h2>
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded">
            Actual vs Plan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
          <div className="py-4 pr-3">
            <div className="text-sm text-gray-500 mb-11">
              Revenue ($ Millions)
            </div>
            <div className="h-8 flex items-center justify-between text-xs text-gray-500">
              $20M
            </div>
            <div className="h-8 flex items-center justify-between text-xs text-gray-500">
              $15M
            </div>
            <div className="h-8 flex items-center justify-between text-xs text-gray-500">
              $10M
            </div>
            <div className="h-8 flex items-center justify-between text-xs text-gray-500">
              $5M
            </div>
            <div className="h-8 flex items-center justify-between text-xs text-gray-500">
              $0
            </div>
          </div>

          <div>
            <div className="relative h-[280px] mt-4">
              {/* Grid lines */}
              <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200"></div>
              <div className="absolute left-0 right-0 bottom-1/4 h-px bg-gray-200"></div>
              <div className="absolute left-0 right-0 bottom-2/4 h-px bg-gray-200"></div>
              <div className="absolute left-0 right-0 bottom-3/4 h-px bg-gray-200"></div>
              <div className="absolute left-0 right-0 bottom-full h-px bg-gray-200"></div>

              <div className="grid grid-cols-12 gap-1 h-full">
                {/* January */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    Jan
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "38%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-blue-600 rounded-t-sm"
                      style={{ height: "41%", bottom: 0 }}
                    ></div>
                  </div>
                </div>

                {/* February */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    Feb
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "39%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-blue-600 rounded-t-sm"
                      style={{ height: "42%", bottom: 0 }}
                    ></div>
                  </div>
                </div>

                {/* March */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    Mar
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "41%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-blue-600 rounded-t-sm"
                      style={{ height: "38%", bottom: 0 }}
                    ></div>
                  </div>
                </div>

                {/* April */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    Apr
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "36%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-blue-600 rounded-t-sm"
                      style={{ height: "39%", bottom: 0 }}
                    ></div>
                  </div>
                </div>

                {/* May */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    May
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "35%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-blue-600 rounded-t-sm"
                      style={{ height: "39%", bottom: 0 }}
                    ></div>
                  </div>
                </div>

                {/* June */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    Jun
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "32%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-amber-500 opacity-80 rounded-t-sm"
                      style={{ height: "36%", bottom: 0 }}
                    ></div>
                  </div>
                </div>

                {/* July */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    Jul
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "34%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-amber-500 opacity-80 rounded-t-sm"
                      style={{ height: "39%", bottom: 0 }}
                    ></div>
                  </div>
                </div>

                {/* August */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    Aug
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "42%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-amber-500 opacity-80 rounded-t-sm"
                      style={{ height: "47%", bottom: 0 }}
                    ></div>
                  </div>
                </div>

                {/* September */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    Sep
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "46%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-amber-500 opacity-80 rounded-t-sm"
                      style={{ height: "51%", bottom: 0 }}
                    ></div>
                  </div>
                </div>

                {/* October */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    Oct
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "48%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-amber-500 opacity-80 rounded-t-sm"
                      style={{ height: "53%", bottom: 0 }}
                    ></div>
                  </div>
                </div>

                {/* November */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    Nov
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "53%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-amber-500 opacity-80 rounded-t-sm"
                      style={{ height: "58%", bottom: 0 }}
                    ></div>
                  </div>
                </div>

                {/* December */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute bottom-0 -mb-5 text-xs text-gray-500">
                    Dec
                  </div>
                  <div className="relative h-full w-full flex items-end justify-center">
                    <div
                      className="absolute w-3 bg-gray-100 rounded-t-sm"
                      style={{ height: "65%", bottom: 0 }}
                    ></div>
                    <div
                      className="absolute w-3 bg-amber-500 opacity-80 rounded-t-sm"
                      style={{ height: "70%", bottom: 0 }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-7">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-gray-100 rounded mr-2"></div>
                <span>Plan</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
                <span>Actual</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-amber-500 rounded mr-2"></div>
                <span>Latest Forecast</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Line Performance */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Product Line Performance</h2>
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded">
            May 2025
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100">
                  Product Line
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100">
                  Plan
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100">
                  Actual
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100">
                  Variance
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100">
                  Vs Plan
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100">
                  YTD Vs Plan
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3">SmartHub Series</td>
                <td className="px-3 py-3">$3.8M</td>
                <td className="px-3 py-3">$4.5M</td>
                <td className="px-3 py-3 text-green-600">+$0.7M</td>
                <td className="px-3 py-3 text-green-600">+18.2%</td>
                <td className="px-3 py-3 text-green-600">+12.3%</td>
                <td className="px-3 py-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded">
                    On Track
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3">SenseConnect Devices</td>
                <td className="px-3 py-3">$4.2M</td>
                <td className="px-3 py-3">$4.3M</td>
                <td className="px-3 py-3 text-green-600">+$0.1M</td>
                <td className="px-3 py-3 text-green-600">+2.4%</td>
                <td className="px-3 py-3 text-red-600">-3.6%</td>
                <td className="px-3 py-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded">
                    On Track
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3">HomeOS Ecosystem</td>
                <td className="px-3 py-3">$1.8M</td>
                <td className="px-3 py-3">$2.1M</td>
                <td className="px-3 py-3 text-green-600">+$0.3M</td>
                <td className="px-3 py-3 text-green-600">+16.7%</td>
                <td className="px-3 py-3 text-green-600">+9.9%</td>
                <td className="px-3 py-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded">
                    On Track
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-3 py-3">SecurityPlus Solutions</td>
                <td className="px-3 py-3">$0.7M</td>
                <td className="px-3 py-3">$0.8M</td>
                <td className="px-3 py-3 text-green-600">+$0.1M</td>
                <td className="px-3 py-3 text-green-600">+14.3%</td>
                <td className="px-3 py-3 text-red-600">-7.8%</td>
                <td className="px-3 py-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-50 text-amber-600 rounded">
                    Mixed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-base mb-4">Top Performing Products</h3>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">SmartHub Pro</div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[70%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "142%" }}
                  >
                    +42%
                  </div>
                </div>
                <div className="font-semibold">$1.12M</div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">HomeOS Premium</div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[70%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "126%" }}
                  >
                    +26%
                  </div>
                </div>
                <div className="font-semibold">$0.82M</div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">
                SenseConnect Plus
              </div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[70%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "118%" }}
                  >
                    +18%
                  </div>
                </div>
                <div className="font-semibold">$1.46M</div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">
                SecurityPlus Ultra
              </div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[70%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "112%" }}
                  >
                    +12%
                  </div>
                </div>
                <div className="font-semibold">$0.41M</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base mb-4">Underperforming Products</h3>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">
                SenseConnect Mini
              </div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[70%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "82%" }}
                  >
                    -18%
                  </div>
                </div>
                <div className="font-semibold">$0.28M</div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">SmartHub Basic</div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[70%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "88%" }}
                  >
                    -12%
                  </div>
                </div>
                <div className="font-semibold">$0.62M</div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">
                SecurityPlus Starter
              </div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[70%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "93%" }}
                  >
                    -7%
                  </div>
                </div>
                <div className="font-semibold">$0.23M</div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">HomeOS Basic</div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[70%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "94%" }}
                  >
                    -6%
                  </div>
                </div>
                <div className="font-semibold">$0.38M</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rolling Forecasts */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Rolling Forecasts</h2>
          <span className="text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1">
            Updated: May 2, 2025
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-center bg-gray-100 p-3">
              <span className="font-semibold">Revenue Forecast</span>
              <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                <svg
                  className="mr-1"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                +3.4%
              </div>
            </div>
            <div className="p-4 relative">
              <div className="h-[140px] mb-4 relative">
                {/* Y-axis lines */}
                <div className="absolute top-[20%] left-0 right-0 border-t border-dashed border-gray-200">
                  <span className="absolute -left-1 top-0 -translate-y-1/2 text-[10px] text-gray-500">
                    $180M
                  </span>
                </div>
                <div className="absolute top-[50%] left-0 right-0 border-t border-dashed border-gray-200">
                  <span className="absolute -left-1 top-0 -translate-y-1/2 text-[10px] text-gray-500">
                    $160M
                  </span>
                </div>
                <div className="absolute top-[80%] left-0 right-0 border-t border-dashed border-gray-200">
                  <span className="absolute -left-1 top-0 -translate-y-1/2 text-[10px] text-gray-500">
                    $140M
                  </span>
                </div>

                {/* SVG for line charts */}
                <svg
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                >
                  {/* Actual line */}
                  <path
                    d="M 8% 70% L 16% 68% L 25% 72% L 33% 67% L 41% 65%"
                    stroke="#2563eb"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Forecast line */}
                  <path
                    d="M 41% 65% L 50% 63% L 58% 55% L 66% 48% L 75% 40% L 83% 33% L 91% 28% L 100% 22%"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4"
                    fill="none"
                  />
                </svg>

                {/* Points */}
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "8%", top: "70%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "16%", top: "68%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "25%", top: "72%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "33%", top: "67%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "41%", top: "65%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "50%", top: "63%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "58%", top: "55%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "66%", top: "48%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "75%", top: "40%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "83%", top: "33%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "91%", top: "28%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "100%", top: "22%" }}
                ></div>
              </div>

              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-lg font-semibold">$174.2M</div>
                  <div className="text-xs text-gray-500">Annual Forecast</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">+5.6%</div>
                  <div className="text-xs text-gray-500">vs Original Plan</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">85%</div>
                  <div className="text-xs text-gray-500">Confidence</div>
                </div>
              </div>
            </div>
            <div className="text-center p-2 border-t border-gray-200 mt-auto">
              <div className="text-xl font-semibold">$68.4M</div>
              <div className="text-xs text-gray-500">
                YTD Actual + Remaining Forecast
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-center bg-gray-100 p-3">
              <span className="font-semibold">Gross Margin Forecast</span>
              <div className="flex items-center text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                <svg
                  className="mr-1"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                  <polyline points="17 18 23 18 23 12"></polyline>
                </svg>
                -1.8%
              </div>
            </div>
            <div className="p-4 relative">
              <div className="h-[140px] mb-4 relative">
                {/* Y-axis lines */}
                <div className="absolute top-[20%] left-0 right-0 border-t border-dashed border-gray-200">
                  <span className="absolute -left-1 top-0 -translate-y-1/2 text-[10px] text-gray-500">
                    46%
                  </span>
                </div>
                <div className="absolute top-[50%] left-0 right-0 border-t border-dashed border-gray-200">
                  <span className="absolute -left-1 top-0 -translate-y-1/2 text-[10px] text-gray-500">
                    42%
                  </span>
                </div>
                <div className="absolute top-[80%] left-0 right-0 border-t border-dashed border-gray-200">
                  <span className="absolute -left-1 top-0 -translate-y-1/2 text-[10px] text-gray-500">
                    38%
                  </span>
                </div>

                {/* SVG for line charts */}
                <svg
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                >
                  {/* Actual line */}
                  <path
                    d="M 8% 45% L 16% 47% L 25% 50% L 33% 55% L 41% 60%"
                    stroke="#2563eb"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Forecast line */}
                  <path
                    d="M 41% 60% L 50% 62% L 58% 61% L 66% 59% L 75% 56% L 83% 53% L 91% 48% L 100% 45%"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4"
                    fill="none"
                  />
                </svg>

                {/* Points */}
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "8%", top: "45%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "16%", top: "47%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "25%", top: "50%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "33%", top: "55%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "41%", top: "60%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "50%", top: "62%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "58%", top: "61%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "66%", top: "59%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "75%", top: "56%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "83%", top: "53%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "91%", top: "48%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "100%", top: "45%" }}
                ></div>
              </div>

              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-lg font-semibold">41.5%</div>
                  <div className="text-xs text-gray-500">Annual Forecast</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">-2.5pts</div>
                  <div className="text-xs text-gray-500">vs Original Plan</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">78%</div>
                  <div className="text-xs text-gray-500">Confidence</div>
                </div>
              </div>
            </div>
            <div className="text-center p-2 border-t border-gray-200 mt-auto">
              <div className="text-xl font-semibold">42.1% → 41.5%</div>
              <div className="text-xs text-gray-500">
                Previous → Current Forecast
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
            <div className="flex justify-between items-center bg-gray-100 p-3">
              <span className="font-semibold">EBITDA Forecast</span>
              <div className="flex items-center text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                <svg
                  className="mr-1"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                  <polyline points="17 18 23 18 23 12"></polyline>
                </svg>
                -4.2%
              </div>
            </div>
            <div className="p-4 relative">
              <div className="h-[140px] mb-4 relative">
                {/* Y-axis lines */}
                <div className="absolute top-[20%] left-0 right-0 border-t border-dashed border-gray-200">
                  <span className="absolute -left-1 top-0 -translate-y-1/2 text-[10px] text-gray-500">
                    $32M
                  </span>
                </div>
                <div className="absolute top-[50%] left-0 right-0 border-t border-dashed border-gray-200">
                  <span className="absolute -left-1 top-0 -translate-y-1/2 text-[10px] text-gray-500">
                    $26M
                  </span>
                </div>
                <div className="absolute top-[80%] left-0 right-0 border-t border-dashed border-gray-200">
                  <span className="absolute -left-1 top-0 -translate-y-1/2 text-[10px] text-gray-500">
                    $20M
                  </span>
                </div>

                {/* SVG for line charts */}
                <svg
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                >
                  {/* Actual line */}
                  <path
                    d="M 8% 48% L 16% 50% L 25% 58% L 33% 63% L 41% 67%"
                    stroke="#2563eb"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Forecast line */}
                  <path
                    d="M 41% 67% L 50% 69% L 58% 65% L 66% 62% L 75% 59% L 83% 54% L 91% 48% L 100% 40%"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4"
                    fill="none"
                  />
                </svg>

                {/* Points */}
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "8%", top: "48%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "16%", top: "50%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "25%", top: "58%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "33%", top: "63%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "41%", top: "67%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "50%", top: "69%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "58%", top: "65%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "66%", top: "62%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "75%", top: "59%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "83%", top: "54%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "91%", top: "48%" }}
                ></div>
                <div
                  className="absolute rounded-full w-2 h-2 bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "100%", top: "40%" }}
                ></div>
              </div>

              <div className="flex justify-around">
                <div className="text-center">
                  <div className="text-lg font-semibold">$26.8M</div>
                  <div className="text-xs text-gray-500">Annual Forecast</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">-8.2%</div>
                  <div className="text-xs text-gray-500">vs Original Plan</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">75%</div>
                  <div className="text-xs text-gray-500">Confidence</div>
                </div>
              </div>
            </div>
            <div className="text-center p-2 border-t border-gray-200 mt-auto">
              <div className="text-xl font-semibold">$28.0M → $26.8M</div>
              <div className="text-xs text-gray-500">
                Previous → Current Forecast
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mt-6 border-l-4 border-blue-600 relative">
          <div className="flex items-center mb-2 text-blue-600 font-semibold">
            <svg
              className="mr-2"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Forecast Insight
          </div>
          <p>
            The latest rolling forecast revision projects annual revenue of
            $174.2M, up 3.4% since last month due to stronger SmartHub Series
            and HomeOS Ecosystem performance. However, gross margin and EBITDA
            forecasts have been revised downward by 1.8% and 4.2% respectively,
            reflecting continued component cost pressures and increased R&D
            investment for the HomeOS 4.0 launch. Q3-Q4 performance is expected
            to improve significantly with the August HomeOS 4.0 launch driving
            higher margin premium product sales.
          </p>
        </div>
      </div>

      {/* Forecast Drivers */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Key Forecast Drivers</h2>
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded">
            Updated May 2, 2025
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-500">
                  DRIVER
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-500">
                  PREVIOUS ASSUMPTION
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-500">
                  CURRENT ASSUMPTION
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-500">
                  IMPACT ON FORECAST
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-500">
                  CONFIDENCE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-3 py-2">HomeOS 4.0 Launch</td>
                <td className="px-3 py-2">August 15, 2025</td>
                <td className="px-3 py-2">August 10, 2025</td>
                <td className="px-3 py-2 text-green-600">+$2.8M Revenue</td>
                <td className="px-3 py-2">92%</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Component Costs</td>
                <td className="px-3 py-2">+8% vs Budget</td>
                <td className="px-3 py-2">+12% vs Budget</td>
                <td className="px-3 py-2 text-red-600">
                  -1.6 pts Gross Margin
                </td>
                <td className="px-3 py-2">85%</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Product Mix</td>
                <td className="px-3 py-2">38% Premium Products</td>
                <td className="px-3 py-2">42% Premium Products</td>
                <td className="px-3 py-2 text-green-600">
                  +0.8 pts Gross Margin
                </td>
                <td className="px-3 py-2">80%</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Market Growth</td>
                <td className="px-3 py-2">6.2% annual growth</td>
                <td className="px-3 py-2">7.5% annual growth</td>
                <td className="px-3 py-2 text-green-600">+$3.4M Revenue</td>
                <td className="px-3 py-2">75%</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Supply Chain Conditions</td>
                <td className="px-3 py-2">Moderate Constraints</td>
                <td className="px-3 py-2">Continued Constraints</td>
                <td className="px-3 py-2 text-red-600">-$1.8M EBITDA</td>
                <td className="px-3 py-2">88%</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Operating Expenses</td>
                <td className="px-3 py-2">+4.2% vs Budget</td>
                <td className="px-3 py-2">+6.5% vs Budget</td>
                <td className="px-3 py-2 text-red-600">-$0.9M EBITDA</td>
                <td className="px-3 py-2">95%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-base mb-4">Positive Forecast Drivers</h3>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">
                Premium Mix Shift
              </div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[65%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "72%" }}
                  >
                    $3.2M
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">Market Growth</div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[65%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "68%" }}
                  >
                    $3.0M
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">
                Early HomeOS Launch
              </div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[65%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "63%" }}
                  >
                    $2.8M
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">
                Production Efficiencies
              </div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[65%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "36%" }}
                  >
                    $1.6M
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base mb-4">Negative Forecast Drivers</h3>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">
                Component Cost Increases
              </div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[65%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "86%" }}
                  >
                    -$3.8M
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">
                Supply Chain Constraints
              </div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[65%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "72%" }}
                  >
                    -$3.2M
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">
                Increased R&D Expenses
              </div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[65%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "54%" }}
                  >
                    -$2.4M
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <div className="w-[150px] font-medium mr-3">
                Price Competition
              </div>
              <div className="flex items-center flex-grow">
                <div className="relative h-6 bg-gray-100 rounded mr-4 w-[65%]">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded flex items-center px-2 text-white text-sm font-medium"
                    style={{ width: "42%" }}
                  >
                    -$1.9M
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BudgetSimulator = () => {
  const [openScenario, setOpenScenario] = useState(null);

  const toggleScenario = (id: any) => {
    if (openScenario === id) {
      setOpenScenario(null);
    } else {
      setOpenScenario(id);
    }
  };
  return (
    <>
      {/* Simulation Overview */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Simulation Overview</h2>
          <span className="text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1">
            Last run: 15 minutes ago
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-lg bg-blue-50 border border-blue-50">
            <div className="text-sm text-gray-500 flex justify-between mb-2">
              TOTAL SIMULATIONS
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">5,250</div>
            <div className="text-xs text-gray-500 text-right">Scenarios</div>
          </div>

          <div className="p-5 rounded-lg bg-white border border-gray-200">
            <div className="text-sm text-gray-500 flex justify-between mb-2">
              VARIABLES TESTED
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">32</div>
            <div className="text-xs text-gray-500 text-right">Key Drivers</div>
          </div>

          <div className="p-5 rounded-lg bg-green-50 border border-green-50">
            <div className="text-sm text-gray-500 flex justify-between mb-2">
              BASE CASE PROBABILITY
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">81%</div>
            <div className="text-xs text-gray-500 text-right">Confidence</div>
          </div>

          <div className="p-5 rounded-lg bg-amber-50 border border-amber-50">
            <div className="text-sm text-gray-500 flex justify-between mb-2">
              RISK SCENARIOS
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div className="text-3xl font-semibold mb-1">29%</div>
            <div className="text-xs text-gray-500 text-right">Probability</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="mb-4 text-base font-medium">
              Simulation Categories
            </h3>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Base Case Scenarios</span>
                <span>40%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Growth Scenarios</span>
                <span>22%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "22%" }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Risk Scenarios</span>
                <span>29%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: "29%" }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Extreme Scenarios</span>
                <span>9%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: "9%" }}
                ></div>
              </div>
            </div>

            <table className="w-full mt-6">
              <tbody>
                <tr>
                  <td className="py-3 font-medium">Smart Home Market Growth</td>
                  <td className="py-3 text-right">3.5% - 8.2%</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Supply Chain Resilience</td>
                  <td className="py-3 text-right">Low - High</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Inflation Rate</td>
                  <td className="py-3 text-right">2.3% - 4.8%</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">
                    Component Cost Fluctuation
                  </td>
                  <td className="py-3 text-right">±12% variance</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">
                    Competitive Pricing Pressure
                  </td>
                  <td className="py-3 text-right">5% - 18%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="mb-4 text-base font-medium">
              Most Sensitive Budget Factors
            </h3>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Component Procurement Costs</span>
                <span>92%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Supply Chain Disruption Impact</span>
                <span>85%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Contract Manufacturing Costs</span>
                <span>78%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>New Product Launch Success</span>
                <span>74%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "74%" }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Retail Channel Performance</span>
                <span>67%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "67%" }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>R&D Investment Returns</span>
                <span>65%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>Digital Marketing Effectiveness</span>
                <span>58%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: "58%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-5 my-6 border-l-4 border-blue-600 relative">
          <div className="flex items-center mb-3 text-blue-600 font-semibold">
            <svg
              className="mr-2"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            AI Simulation Insight
          </div>
          <p>
            Based on 5,250 simulations, VistaSmart's consolidated budget has an
            81% probability of achieving revenue targets and 76% probability of
            achieving operating income goals. The most sensitive variables are
            component procurement costs and supply chain disruption impact.
            Consider developing detailed contingency plans for scenarios where
            semiconductor costs increase above 15% or where major manufacturing
            partners experience capacity constraints. The upcoming HomeOS 4.0
            launch has a significant impact on Q3-Q4 projections, with a
            successful launch potentially increasing annual revenue by 11-14%.
          </p>
        </div>
      </div>

      {/* Primary Scenario Results */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold">Primary Scenario Results</h2>
          <div className="mt-2 sm:mt-0">
            <button className="px-4 py-2 rounded-md text-sm border border-gray-200 bg-white mr-2">
              All Scenarios
            </button>
            <button className="px-4 py-2 rounded-md text-sm border border-gray-200 bg-white">
              Compare Scenarios
            </button>
          </div>
        </div>

        {/* Base Case Scenario */}
        <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
          <div
            className="flex justify-between items-center p-4 bg-white cursor-pointer"
            onClick={() => toggleScenario("base-case")}
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-600 rounded-md mr-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <div>
                <div className="font-semibold">Scenario A: Base Case</div>
                <div className="text-gray-500 text-sm">
                  Core business scenario based on consensus market forecasts and
                  standard planning assumptions
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded mr-4">
                81% probability
              </span>
              <span className="mr-4">±0% (Baseline)</span>
              <svg
                className={`transform transition-transform ${
                  openScenario === "base-case" ? "rotate-180" : ""
                }`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          {openScenario === "base-case" && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Key Drivers
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      Smart Home Market Growth
                    </span>
                    <span className="font-medium">6.4%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      Component Cost Inflation
                    </span>
                    <span className="font-medium">3.2%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      New Product Adoption Rate
                    </span>
                    <span className="font-medium">Standard</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Manufacturing Capacity</span>
                    <span className="font-medium">95%</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Departmental Variance
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Product Development</span>
                    <span className="font-medium text-green-600">+3.7%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Operations</span>
                    <span className="font-medium text-green-600">+2.1%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Marketing & Sales</span>
                    <span className="font-medium text-green-600">+5.4%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Customer Support</span>
                    <span className="font-medium text-red-600">-2.8%</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-5 mt-5 mb-0 border-l-4 border-blue-600 relative">
                <div className="flex items-center mb-3 text-blue-600 font-semibold">
                  <svg
                    className="mr-2"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  AI Insight
                </div>
                <p>
                  This scenario shows strong performance in Product Development
                  and Marketing & Sales, reflecting successful HomeOS 4.0 launch
                  preparation. Customer Support is showing below-plan
                  performance, potentially due to underestimation of new support
                  requirements for upcoming product launches. Overall company
                  performance remains robust with acceptable deviation from base
                  case.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Growth Scenario */}
        <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
          <div
            className="flex justify-between items-center p-4 bg-white cursor-pointer"
            onClick={() => toggleScenario("growth")}
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-50 text-green-600 rounded-md mr-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <div>
                <div className="font-semibold">
                  Scenario B: Accelerated Growth
                </div>
                <div className="text-gray-500 text-sm">
                  Higher than expected market growth driven by VistaSmart HomeOS
                  4.0 launch success
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded mr-4">
                22% probability
              </span>
              <span className="mr-4 text-green-600 font-medium">
                +15.8% Revenue
              </span>
              <svg
                className={`transform transition-transform ${
                  openScenario === "growth" ? "rotate-180" : ""
                }`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          {openScenario === "growth" && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Key Drivers
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      Smart Home Market Growth
                    </span>
                    <span className="font-medium">8.2%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      New Product Adoption Rate
                    </span>
                    <span className="font-medium">Accelerated</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      HomeOS 4.0 Market Reception
                    </span>
                    <span className="font-medium">Excellent</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      Contract Manufacturing Capacity
                    </span>
                    <span className="font-medium">110%</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Departmental Impact
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Product Development</span>
                    <span className="font-medium text-green-600">+12.8%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Operations</span>
                    <span className="font-medium text-red-600">-5.2%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Marketing & Sales</span>
                    <span className="font-medium text-green-600">+18.5%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Customer Support</span>
                    <span className="font-medium text-red-600">-8.7%</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-5 mt-5 mb-0 border-l-4 border-blue-600 relative">
                <div className="flex items-center mb-3 text-blue-600 font-semibold">
                  <svg
                    className="mr-2"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  AI Insight
                </div>
                <p>
                  This accelerated growth scenario shows significant opportunity
                  but reveals operational constraints. While Product Development
                  and Marketing show strong performance, Operations and Customer
                  Support are stressed, indicating potential bottlenecks in
                  manufacturing scale-up and support capacity. Consider
                  immediate investments in expanding contract manufacturing
                  capacity and bolstering the customer support team to prepare
                  for potentially higher than forecast demand.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Supply Chain Disruption */}
        <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
          <div
            className="flex justify-between items-center p-4 bg-white cursor-pointer"
            onClick={() => toggleScenario("supply-chain")}
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-amber-50 text-amber-600 rounded-md mr-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <div>
                <div className="font-semibold">
                  Scenario C: Supply Chain Disruption
                </div>
                <div className="text-gray-500 text-sm">
                  Major semiconductor and component shortages affecting product
                  availability
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-50 text-amber-800 rounded mr-4">
                19% probability
              </span>
              <span className="mr-4 text-red-600 font-medium">
                -10.5% Revenue
              </span>
              <svg
                className={`transform transition-transform ${
                  openScenario === "supply-chain" ? "rotate-180" : ""
                }`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          {openScenario === "supply-chain" && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Key Drivers
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Component Availability</span>
                    <span className="font-medium">Severely Constrained</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      Component Cost Increases
                    </span>
                    <span className="font-medium">+28%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Lead Times</span>
                    <span className="font-medium">Extended by 45%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Manufacturing Capacity</span>
                    <span className="font-medium">65%</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Departmental Impact
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Product Development</span>
                    <span className="font-medium text-red-600">-12.4%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Operations</span>
                    <span className="font-medium text-red-600">-18.7%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Marketing & Sales</span>
                    <span className="font-medium text-red-600">-10.5%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Customer Support</span>
                    <span className="font-medium text-green-600">+4.2%</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-5 mt-5 mb-0 border-l-4 border-blue-600 relative">
                <div className="flex items-center mb-3 text-blue-600 font-semibold">
                  <svg
                    className="mr-2"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  AI Insight
                </div>
                <p>
                  The supply chain disruption scenario represents a significant
                  threat to VistaSmart's production schedule and revenue
                  targets. Operations is most severely impacted, with potential
                  delays to the HomeOS 4.0 hardware lineup. The positive
                  Customer Support variance reflects increased demand for
                  maintaining existing products. Recommend implementing the
                  supply chain resilience plan developed in Q1, focusing on
                  securing priority component allocations and exploring
                  alternative suppliers for critical components.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Market Slowdown */}
        <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
          <div
            className="flex justify-between items-center p-4 bg-white cursor-pointer"
            onClick={() => toggleScenario("market-slowdown")}
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 rounded-md mr-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                  <polyline points="17 18 23 18 23 12"></polyline>
                </svg>
              </div>
              <div>
                <div className="font-semibold">Scenario D: Market Slowdown</div>
                <div className="text-gray-500 text-sm">
                  Economic headwinds resulting in reduced consumer spending
                  across all product lines
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-red-50 text-red-600 rounded mr-4">
                10% probability
              </span>
              <span className="mr-4 text-red-600 font-medium">
                -8.3% Revenue
              </span>
              <svg
                className={`transform transition-transform ${
                  openScenario === "market-slowdown" ? "rotate-180" : ""
                }`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          {openScenario === "market-slowdown" && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Key Drivers
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      Smart Home Market Growth
                    </span>
                    <span className="font-medium">2.1%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      Consumer Discretionary Spending
                    </span>
                    <span className="font-medium">Reduced</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      Average Selling Price Pressure
                    </span>
                    <span className="font-medium">High</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">New Product Adoption</span>
                    <span className="font-medium">Delayed</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Departmental Impact
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Product Development</span>
                    <span className="font-medium text-red-600">-5.7%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Operations</span>
                    <span className="font-medium text-red-600">-4.9%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Marketing & Sales</span>
                    <span className="font-medium text-red-600">-12.8%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Customer Support</span>
                    <span className="font-medium text-green-600">+2.3%</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-5 mt-5 mb-0 border-l-4 border-blue-600 relative">
                <div className="flex items-center mb-3 text-blue-600 font-semibold">
                  <svg
                    className="mr-2"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  AI Insight
                </div>
                <p>
                  This market slowdown scenario indicates consumers delaying new
                  smart home purchases and upgrading existing systems instead.
                  The significant impact on Marketing & Sales reflects reduced
                  demand despite increased promotional activity. If early
                  indicators of this scenario emerge, consider implementing the
                  prepared expense reduction plan with 15% marketing budget
                  reallocation toward the value-tier product line. Also consider
                  accelerating the subscription service roadmap to increase
                  recurring revenue.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scenario Impact Analysis */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Scenario Impact Analysis</h2>
          <button className="px-4 py-2 rounded-md text-sm border border-gray-200 bg-white">
            Company-Wide
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-100 text-xs font-semibold text-gray-500 uppercase">
                  Scenario
                </th>
                <th className="text-left p-3 bg-gray-100 text-xs font-semibold text-gray-500 uppercase">
                  Revenue Impact
                </th>
                <th className="text-left p-3 bg-gray-100 text-xs font-semibold text-gray-500 uppercase">
                  EBITDA Impact
                </th>
                <th className="text-left p-3 bg-gray-100 text-xs font-semibold text-gray-500 uppercase">
                  Cash Flow Impact
                </th>
                <th className="text-left p-3 bg-gray-100 text-xs font-semibold text-gray-500 uppercase">
                  Most Affected Divisions
                </th>
                <th className="text-left p-3 bg-gray-100 text-xs font-semibold text-gray-500 uppercase">
                  Probability
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-gray-200">Base Case</td>
                <td className="p-4 border-b border-gray-200">±0%</td>
                <td className="p-4 border-b border-gray-200">±0%</td>
                <td className="p-4 border-b border-gray-200">±0%</td>
                <td className="p-4 border-b border-gray-200">All Equal</td>
                <td className="p-4 border-b border-gray-200">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded">
                    81%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-200">
                  Accelerated Growth
                </td>
                <td className="p-4 border-b border-gray-200 text-green-600">
                  +15.8%
                </td>
                <td className="p-4 border-b border-gray-200 text-green-600">
                  +18.2%
                </td>
                <td className="p-4 border-b border-gray-200 text-red-600">
                  -6.5% (Short-term)
                </td>
                <td className="p-4 border-b border-gray-200">
                  Sales, Manufacturing
                </td>
                <td className="p-4 border-b border-gray-200">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded">
                    22%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-200">
                  Supply Chain Disruption
                </td>
                <td className="p-4 border-b border-gray-200 text-red-600">
                  -10.5%
                </td>
                <td className="p-4 border-b border-gray-200 text-red-600">
                  -14.2%
                </td>
                <td className="p-4 border-b border-gray-200 text-red-600">
                  -12.8%
                </td>
                <td className="p-4 border-b border-gray-200">
                  Manufacturing, Logistics
                </td>
                <td className="p-4 border-b border-gray-200">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-50 text-amber-800 rounded">
                    19%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-200">
                  Market Slowdown
                </td>
                <td className="p-4 border-b border-gray-200 text-red-600">
                  -8.3%
                </td>
                <td className="p-4 border-b border-gray-200 text-red-600">
                  -11.4%
                </td>
                <td className="p-4 border-b border-gray-200 text-red-600">
                  -7.2%
                </td>
                <td className="p-4 border-b border-gray-200">All Divisions</td>
                <td className="p-4 border-b border-gray-200">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-amber-50 text-amber-800 rounded">
                    10%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="text-base text-blue-600 mb-2">
              Risk Mitigation Strategies
            </h3>

            <ul className="mt-4">
              <li className="flex items-start mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 rounded-full mr-3 flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  </svg>
                </div>
                Secure secondary suppliers for key components with
                pre-negotiated contracts
              </li>
              <li className="flex items-start mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 rounded-full mr-3 flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="1"
                      y="4"
                      width="22"
                      height="16"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="1" y1="10" x2="23" y2="10"></line>
                  </svg>
                </div>
                Implement phased approach for major capital expenditures with
                stage-gate reviews
              </li>
              <li className="flex items-start mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 rounded-full mr-3 flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                Expand component inventory buffer for critical parts by 45 days
              </li>
              <li className="flex items-start mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 rounded-full mr-3 flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                Implement hedging strategy for key foreign exchange exposures
              </li>
              <li className="flex items-start mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 rounded-full mr-3 flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
                    <path d="M13 13l6 6"></path>
                  </svg>
                </div>
                Prepare tiered expense reduction plan that can be activated in
                phases
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base text-green-600 mb-2">
              Opportunity Capture Strategies
            </h3>

            <ul className="mt-4">
              <li className="flex items-start mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-green-50 text-green-600 rounded-full mr-3 flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                Prepare accelerated production plan if HomeOS 4.0 exceeds 115%
                of forecasted demand
              </li>
              <li className="flex items-start mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-green-50 text-green-600 rounded-full mr-3 flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </div>
                Fast-track expansion of direct-to-consumer sales channels in
                high-performance regions
              </li>
              <li className="flex items-start mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-green-50 text-green-600 rounded-full mr-3 flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                Establish flexible workforce strategy to quickly scale with
                growth
              </li>
              <li className="flex items-start mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-green-50 text-green-600 rounded-full mr-3 flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                </div>
                Advance retail partnership expansion plan if growth exceeds 12%
                by Q2
              </li>
              <li className="flex items-start mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-green-50 text-green-600 rounded-full mr-3 flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                </div>
                Set aside contingency fund ($8.5M) for opportunistic acquisition
                of complementary technology
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const VistaFinancialDashboard = () => {
  const [boardActiveeTab, setBoardActiveTab] = useState(
    "Financial Performance"
  );

  const handleBoardActiveTabChange = (tab: string) => {
    setBoardActiveTab(tab);
  };

  return (
    <div className="mx-auto p-5 bg-gray-50 h-screen overflow-y-auto text-gray-900">
      <Header
        activeTab={boardActiveeTab}
        onChange={handleBoardActiveTabChange}
      />
      {boardActiveeTab === "Financial Performance" ? (
        <FinancialPerformace />
      ) : (
        <BudgetSimulator />
      )}
    </div>
  );
};

export default VistaFinancialDashboard;

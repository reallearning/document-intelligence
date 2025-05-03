"use client";
import React from "react";
import {
  BarChart2,
  FileText,
  Shield,
  Target,
  Send,
  AlertCircle,
  Calendar,
  Clock,
  TrendingUp,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";

const FinanceControlCenter = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-50 h-screen overflow-y-auto font-sans">
      {/* Header - More minimalist, tech-forward design */}
      <header className="bg-white shadow-sm px-8 py-6 mb-6 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-light tracking-tight text-gray-900">
              VistaSmart <span className="font-bold">Finance Hub</span>
            </h1>
            <p className="text-gray-400 text-sm tracking-wide">
              Last updated: April 28, 2025 • 09:15 AM
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-green-50 px-4 py-2 rounded-full text-green-600 text-sm font-medium">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>4 AI Agents Active</span>
        </div>
      </header>

      <div className="container mx-auto px-6">
        {/* Morning Briefing - Cleaner, more structured layout */}
        <section className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
          <div className="border-b border-gray-100 px-8 py-6">
            <h2 className="text-xl font-light text-gray-800">
              Morning Financial <span className="font-semibold">Briefing</span>
            </h2>
          </div>

          <div className="p-8 space-y-6">
            {/* Key Updates - More tech-oriented styling */}
            <div>
              <h3 className="font-medium text-gray-500 uppercase tracking-wider text-xs mb-4">
                Key Updates for Today
              </h3>

              <div className="grid gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-white border border-red-100 flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-red-500">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-red-600 mb-1">
                      Urgent attention needed
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      I've flagged a potential duplicate payment to Hirakud
                      Steel Components (₹1,24,500). This appears to be for the
                      same chassis components order processed twice.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-white border border-amber-100 flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-amber-500">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-600 mb-1">
                      Important deadlines
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      GST filing due in 2 days, and quarterly TDS filing for
                      your 230+ component suppliers due in 4 days. I've analyzed
                      the data for both filings.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-white border border-green-100 flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-green-500">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-600 mb-1">
                      Positive financial updates
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Q1 revenue exceeded plan by 12.8%, with the Electronics
                      Systems division performing exceptionally well (+19%).
                      However, raw material costs increased by 7.6%.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-white border border-blue-100 flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm text-blue-500">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-600 mb-1">
                      Today's priorities
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      I recommend reviewing the duplicate payment issue,
                      addressing the GST filing, and examining the Electrical
                      Components division margin decline despite increased
                      automotive sector orders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-gray-600 mb-4 font-light">
                Good morning! Any specific information you'd like about today's
                financial status for VistaSmart?
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask me anything about today's updates..."
                  className="w-full rounded-xl border border-gray-200 p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Team Section - More modern tech styling */}
        <section className="mb-8">
          <h2 className="text-xl font-light text-gray-800 mb-6">
            Your Finance <span className="font-semibold">AI Team</span>
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Business Intelligence Agent */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg">
                    <BarChart2 size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Business Intelligence Agent
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span>4 tasks completed</span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <p className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-3">
                    Completed autonomously:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">
                        Generated April financial statements for all 18
                        manufacturing units
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">
                        Analyzed profitability across Electrical, Interior,
                        Powertrain, and Chassis divisions
                      </span>
                    </li>
                  </ul>
                  <p className="text-blue-600 font-medium text-xs mt-2.5 flex items-center">
                    <Info size={12} className="mr-1" /> +2 more tasks
                  </p>
                </div>

                <div className="pt-4">
                  <p className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-3">
                    Current insights:
                  </p>
                  <ul className="space-y-3">
                    <li className="rounded-lg bg-blue-50 p-3.5 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 font-bold text-lg">
                          !
                        </span>
                        <span className="text-gray-700">
                          Electrical Components division margin declined for 3rd
                          consecutive month despite increased automotive sector
                          orders
                        </span>
                      </div>
                    </li>
                    <li className="rounded-lg bg-blue-50 p-3.5 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 font-bold text-lg">
                          !
                        </span>
                        <span className="text-gray-700">
                          5 large B2B receivables totaling ₹42.7 crores due next
                          week from major automotive OEMs
                        </span>
                      </div>
                    </li>
                  </ul>
                  <p className="text-blue-600 font-medium text-xs mt-2.5 flex items-center">
                    <Info size={12} className="mr-1" /> +1 more insight
                  </p>
                </div>

                <button
                  onClick={() => {
                    router.push("/vista-smart/business-intelligence");
                  }}
                  className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all text-sm font-medium"
                >
                  View Full Analysis
                </button>
              </div>
            </div>

            {/* Operational Efficiency Agent */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-3 rounded-lg">
                    <FileText size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Operational Efficiency Agent
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span>4 tasks completed</span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <p className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-3">
                    Completed autonomously:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">
                        Processed and validated 215 component and material
                        supplier invoices
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">
                        Completed 3-way matching for 156 production transactions
                      </span>
                    </li>
                  </ul>
                  <p className="text-amber-600 font-medium text-xs mt-2.5 flex items-center">
                    <Info size={12} className="mr-1" /> +2 more tasks
                  </p>
                </div>

                <div className="pt-4">
                  <p className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-3">
                    Current insights:
                  </p>
                  <ul className="space-y-3">
                    <li className="rounded-lg bg-amber-50 p-3.5 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 font-bold text-lg">
                          !
                        </span>
                        <span className="text-gray-700">
                          14 invoices from precision machining workshops have
                          discrepancies in component counts
                        </span>
                      </div>
                    </li>
                    <li className="rounded-lg bg-amber-50 p-3.5 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 font-bold text-lg">
                          !
                        </span>
                        <span className="text-gray-700">
                          Aurangabad Foundry consistently overbills by 5.2% on
                          aluminum casting components
                        </span>
                      </div>
                    </li>
                  </ul>
                  <p className="text-amber-600 font-medium text-xs mt-2.5 flex items-center">
                    <Info size={12} className="mr-1" /> +1 more insight
                  </p>
                </div>

                <button
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all text-sm font-medium"
                >
                  View Full Analysis
                </button>
              </div>
            </div>

            {/* Risk & Compliance Agent */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-lg">
                    <Shield size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Risk & Compliance Agent
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span>4 tasks completed</span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <p className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-3">
                    Completed autonomously:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">
                        Reconciled 182 purchase invoices with GST-2A/2B
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">
                        Automatically matched 92% of component vendor invoices
                        without issues
                      </span>
                    </li>
                  </ul>
                  <p className="text-indigo-600 font-medium text-xs mt-2.5 flex items-center">
                    <Info size={12} className="mr-1" /> +2 more tasks
                  </p>
                </div>

                <div className="pt-4">
                  <p className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-3">
                    Current insights:
                  </p>
                  <ul className="space-y-3">
                    <li className="rounded-lg bg-indigo-50 p-3.5 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 font-bold text-lg">
                          !
                        </span>
                        <span className="text-gray-700">
                          Potential duplicate payment of ₹1,24,500 to Hirakud
                          Steel Components
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    router.push("/vista-smart/risk-and-compliance");
                  }}
                  className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all text-sm font-medium"
                >
                  View Full Analysis
                </button>
              </div>
            </div>

            {/* Budgeting and Forecasting */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-3 rounded-lg">
                    <Target size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Budgeting and Forecasting
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span>4 tasks completed</span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <p className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-3">
                    Completed autonomously:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">
                        Updated rolling forecast incorporating Auto Expo sales
                        impact
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-600 text-sm">
                        Prepared 3 scenarios for H2'25 production based on
                        current trends
                      </span>
                    </li>
                  </ul>
                  <p className="text-teal-600 font-medium text-xs mt-2.5 flex items-center">
                    <Info size={12} className="mr-1" /> +2 more tasks
                  </p>
                </div>

                <div className="pt-4">
                  <p className="font-medium text-xs text-gray-500 uppercase tracking-wider mb-3">
                    Current insights:
                  </p>
                  <ul className="space-y-3">
                    <li className="rounded-lg bg-teal-50 p-3.5 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 font-bold text-lg">
                          !
                        </span>
                        <span className="text-gray-700">
                          Cash flow timing issue detected for monsoon raw
                          material procurement (₹37.2L shortfall)
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    router.push("/vista-smart/budgeting-forecasting");
                  }}
                  className="mt-4 w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-2.5 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all text-sm font-medium"
                >
                  View Full Analysis
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FinanceControlCenter;

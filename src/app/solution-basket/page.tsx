"use client";
import React, { useState } from "react";
import { Package, TrendingUp, Truck } from "lucide-react";

const SolutionBaskets = () => {
  const [view, setView] = useState("overview");

  const OverviewSlide = () => (
    <div className="w-full overflow-auto h-screen bg-white p-12 flex flex-col">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">
          Questt Solution Baskets
        </h1>
        <p className="text-xl text-gray-600">
          Business → Decisions → ML Architecture
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 flex-1">
        <div className="border-2 border-gray-900 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-gray-900">
            RETAIL
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">Sales</h3>
              </div>
              <div className="text-sm text-gray-700 ml-8 space-y-1">
                <div>Conversion & Funnel</div>
                <div>Merchandising & Assortment</div>
                <div>Pricing & Promotions</div>
                <div>Channel & Customer</div>
              </div>
              <div className="mt-3 ml-8 text-xs bg-gray-100 p-2 border-l-2 border-gray-900">
                <span className="font-semibold">Metrics:</span> Revenue
                optimization, Conversion rate, Basket size, Customer lifetime
                value
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-5 h-5 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Inventory
                </h3>
              </div>
              <div className="text-sm text-gray-700 ml-8 space-y-1">
                <div>Replenishment & Forecasting</div>
                <div>Safety Stock & Risk</div>
                <div>Inter-Store Transfer</div>
                <div>Markdown & Aging</div>
              </div>
              <div className="mt-3 ml-8 text-xs bg-gray-100 p-2 border-l-2 border-gray-900">
                <span className="font-semibold">Metrics:</span> Stock-out
                reduction, Inventory turnover, Service level, Holding cost
                reduction
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Truck className="w-5 h-5 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Supply Chain
                </h3>
              </div>
              <div className="text-sm text-gray-700 ml-8 space-y-1">
                <div>Forecast vs Supply Alignment</div>
                <div>Allocation & Dispatch</div>
                <div>Routing & Logistics</div>
                <div>Waste & Perishables</div>
              </div>
              <div className="mt-3 ml-8 text-xs bg-gray-100 p-2 border-l-2 border-gray-900">
                <span className="font-semibold">Metrics:</span> Fill rate, Lead
                time reduction, Transportation cost, Waste reduction
              </div>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-900 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-gray-900">
            CPG
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">Sales</h3>
              </div>
              <div className="text-sm text-gray-700 ml-8 space-y-1">
                <div>Distribution Coverage</div>
                <div>Trade Spend & Promotion</div>
                <div>Channel Mix</div>
                <div>Market Share Drivers</div>
              </div>
              <div className="mt-3 ml-8 text-xs bg-gray-100 p-2 border-l-2 border-gray-900">
                <span className="font-semibold">Metrics:</span> Market share
                growth, ND/WD coverage, Trade spend ROI, Revenue per outlet
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-5 h-5 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Inventory
                </h3>
              </div>
              <div className="text-sm text-gray-700 ml-8 space-y-1">
                <div>Stock Norms & Planning</div>
                <div>Aging & Expiry</div>
                <div>Coverage & Frequency</div>
                <div>Portfolio Simplification</div>
              </div>
              <div className="mt-3 ml-8 text-xs bg-gray-100 p-2 border-l-2 border-gray-900">
                <span className="font-semibold">Metrics:</span> Days of cover
                (DOC), Expiry loss reduction, Stock availability, Working
                capital optimization
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Truck className="w-5 h-5 text-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Supply Chain
                </h3>
              </div>
              <div className="text-sm text-gray-700 ml-8 space-y-1">
                <div>Demand–Supply Alignment</div>
                <div>Allocation</div>
                <div>Route-to-Market</div>
                <div>Cost & Service</div>
              </div>
              <div className="mt-3 ml-8 text-xs bg-gray-100 p-2 border-l-2 border-gray-900">
                <span className="font-semibold">Metrics:</span> Fill rate,
                Forecast accuracy, Route efficiency, Cost per case
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setView("ml")}
          className="px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-700 transition-colors"
        >
          View ML Architecture →
        </button>
      </div>
    </div>
  );

  const MLArchitectureSlide = () => (
    <div className="w-full h-screen overflow-auto bg-white p-12 flex flex-col">
      <div className="mb-10">
        <button
          onClick={() => setView("overview")}
          className="text-gray-900 hover:text-gray-600 mb-4"
        >
          ← Back to Overview
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Core ML Architecture
        </h1>
        <p className="text-lg text-gray-600">
          Model families powering Retail & CPG decisions
        </p>
      </div>

      <div className="space-y-12 flex-1">
        {/* Inventory Optimization */}
        <div className="border-2 border-gray-900 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-900">
            Inventory Optimization
          </h2>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="border border-gray-300 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  ARIMA, SARIMA
                </h3>
                <p className="text-sm text-gray-600">For timeseries data</p>
              </div>

              <div className="border border-gray-300 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Prophet</h3>
                <p className="text-sm text-gray-600">
                  For seasonality, holidays
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-300 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Temporal Fusion Transformers (TFT)
                </h3>
                <p className="text-sm text-gray-600">
                  Forecasts across thousands of SKUs
                </p>
              </div>

              <div className="border border-gray-300 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Quantile Regression
                </h3>
                <p className="text-sm text-gray-600">
                  Safety stock / risk estimation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Improvement & Forecasting */}
        <div className="border-2 border-gray-900 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-3 border-b-2 border-gray-900">
            Sales Improvement & Forecasting
          </h2>
          <p className="text-sm text-gray-600 mb-6 italic">
            Predicting sales uplift, promo planning, price optimization,
            store/option ranking
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div className="border border-gray-300 p-4">
              <h3 className="font-semibold text-gray-900 text-center">
                XGBoost
              </h3>
            </div>

            <div className="border border-gray-300 p-4">
              <h3 className="font-semibold text-gray-900 text-center">
                RandomForest
              </h3>
            </div>

            <div className="border border-gray-300 p-4">
              <h3 className="font-semibold text-gray-900 text-center">TFT</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen">
      {view === "overview" && <OverviewSlide />}
      {view === "ml" && <MLArchitectureSlide />}
    </div>
  );
};

export default SolutionBaskets;

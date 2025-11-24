"use client"
import React from 'react';
import { Package, TrendingDown, Database, AlertTriangle, CheckCircle2, XCircle, Calendar, Store, Layers } from 'lucide-react';

const ZeroSalesViz = () => {
  const exampleData = {
    stock_on_hand: 12,
    sales_30d: 2,
    returns_30d: 2,
    last_grn_days_ago: 45,
    total_received: 24,
  };

  const calculated = {
    net_sales: exampleData.sales_30d - exampleData.returns_30d,
    has_stock: exampleData.stock_on_hand > 0,
    is_zero_sales: (exampleData.sales_30d - exampleData.returns_30d) <= 0,
    is_aged: exampleData.last_grn_days_ago >= 30,
    qualifies: (exampleData.stock_on_hand > 0) && 
               ((exampleData.sales_30d - exampleData.returns_30d) <= 0) && 
               (exampleData.last_grn_days_ago >= 30)
  };

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-xs font-semibold mb-3">
            ZERO SALES REPORT
          </div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-3">
            List seasonal options that still have stock in store but have not sold in the last 30 days, and whose last receipt (GRN) was at least 30 days ago.
          </h1>
          <p className="text-sm text-slate-600">Identifies aged seasonal inventory with no movement</p>
        </div>

        {/* Decision Card Flow */}
        <div className="space-y-6">
          
          {/* SCOPE */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">SCOPE (What We're Looking At)</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                
                {/* Product Definition */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-slate-900">Product / Option</h3>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 text-sm">
                    <div className="font-semibold text-emerald-900 mb-1">What it is:</div>
                    <div className="text-slate-700 mb-3">Seasonal or fashion products from the current season drop only.</div>
                    <div className="font-semibold text-emerald-900 mb-1">In the data:</div>
                    <div className="space-y-1 text-xs text-slate-600 font-mono">
                      <div>• Style + Color combination</div>
                      <div>• <span className="font-bold">SeasonCode ≠ 2</span> (not core)</div>
                      <div>• Current season items only</div>
                      <div>• Must be: <span className="font-bold">IsActive = 1</span></div>
                    </div>
                  </div>
                </div>

                {/* Store Definition */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Store className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-slate-900">Store</h3>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 text-sm">
                    <div className="font-semibold text-emerald-900 mb-1">What it is:</div>
                    <div className="text-slate-700 mb-3">Active selling stores only (EBO + Franchise).</div>
                    <div className="font-semibold text-emerald-900 mb-1">In the data:</div>
                    <div className="space-y-1 text-xs text-slate-600 font-mono">
                      <div>• HOAD: <span className="font-bold">StoreCode / AlternateStoreCode</span></div>
                      <div>• SAP: <span className="font-bold">KUNNR (C%)</span></div>
                      <div>• Must be Type 1 or 3 (EBO/Franchise)</div>
                      <div>• <span className="font-bold text-red-600">Exclude:</span> Factory outlets (FO)</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Context */}
              <div className="mt-6 bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="text-sm font-semibold text-slate-900 mb-2">What we're looking for:</div>
                <div className="text-sm text-slate-700">Options that are sitting with stock but not moving — seasonal inventory that came in at least 30 days ago and hasn't sold in the last 30 days.</div>
              </div>
            </div>
          </div>

          {/* THREE CONDITIONS */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">THREE CONDITIONS (All Must Be True)</h2>
              </div>
            </div>
            <div className="p-6">
              
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-r-lg">
                <div className="font-bold text-red-900 mb-1">For each store × option:</div>
                <div className="text-red-800 text-sm">Only include if ALL three conditions are met. If any condition fails, skip this option.</div>
              </div>

              <div className="space-y-4">
                
                {/* Condition 1: Has Stock */}
                <div className={`bg-slate-50 rounded-xl p-5 border-2 ${calculated.has_stock ? 'border-emerald-300' : 'border-slate-300'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                      <div>
                        <div className="font-bold text-slate-900 text-base mb-1">Has Stock On Hand</div>
                        <div className="text-sm text-slate-700">The option has inventory in the store right now</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg flex items-center gap-2 ${calculated.has_stock ? 'bg-emerald-600' : 'bg-slate-400'}`}>
                      {calculated.has_stock ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                      <span className="text-xs font-semibold text-white">
                        {calculated.has_stock ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="font-mono text-sm font-bold text-slate-900 mb-2">
                      StockOnHand &gt; 0
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-50 rounded px-4 py-2 border border-emerald-200">
                        <div className="text-xs text-emerald-600 mb-1">Current Stock</div>
                        <div className="font-mono text-2xl font-bold text-emerald-900">{exampleData.stock_on_hand}</div>
                        <div className="text-xs text-slate-600 mt-1">units</div>
                      </div>
                      <div className="text-sm text-slate-600">
                        {calculated.has_stock ? '✓ Has inventory' : '✗ No inventory, skip'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Condition 2: Zero Sales */}
                <div className={`bg-slate-50 rounded-xl p-5 border-2 ${calculated.is_zero_sales ? 'border-red-300' : 'border-slate-300'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                      <div>
                        <div className="font-bold text-slate-900 text-base mb-1">Zero Net Sales (Last 30 Days)</div>
                        <div className="text-sm text-slate-700">Sales minus returns = 0 or negative</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg flex items-center gap-2 ${calculated.is_zero_sales ? 'bg-red-600' : 'bg-slate-400'}`}>
                      {calculated.is_zero_sales ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                      <span className="text-xs font-semibold text-white">
                        {calculated.is_zero_sales ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="font-mono text-sm font-bold text-slate-900 mb-3">
                      Net Sales = Sales − Returns ≤ 0
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="bg-blue-50 rounded p-3 border border-blue-200">
                        <div className="text-xs text-blue-600 mb-1">Sales</div>
                        <div className="font-mono text-xl font-bold text-blue-900">{exampleData.sales_30d}</div>
                        <div className="text-xs text-slate-600 mt-1">Last 30 days</div>
                      </div>
                      <div className="bg-orange-50 rounded p-3 border border-orange-200">
                        <div className="text-xs text-orange-600 mb-1">Returns</div>
                        <div className="font-mono text-xl font-bold text-orange-900">{exampleData.returns_30d}</div>
                        <div className="text-xs text-slate-600 mt-1">Last 30 days</div>
                      </div>
                      <div className={`rounded p-3 border-2 ${calculated.is_zero_sales ? 'bg-red-50 border-red-300' : 'bg-emerald-50 border-emerald-300'}`}>
                        <div className="text-xs text-slate-600 mb-1">Net Sales</div>
                        <div className={`font-mono text-xl font-bold ${calculated.is_zero_sales ? 'text-red-900' : 'text-emerald-900'}`}>
                          {calculated.net_sales}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">= Sales − Returns</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600">
                      {calculated.is_zero_sales ? '✓ No movement in 30 days' : '✗ Has sales, skip'}
                    </div>
                  </div>
                </div>

                {/* Condition 3: Aged Stock */}
                <div className={`bg-slate-50 rounded-xl p-5 border-2 ${calculated.is_aged ? 'border-orange-300' : 'border-slate-300'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                      <div>
                        <div className="font-bold text-slate-900 text-base mb-1">Last Receipt ≥ 30 Days Ago</div>
                        <div className="text-sm text-slate-700">Stock has been sitting for at least a month</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-lg flex items-center gap-2 ${calculated.is_aged ? 'bg-orange-600' : 'bg-slate-400'}`}>
                      {calculated.is_aged ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                      <span className="text-xs font-semibold text-white">
                        {calculated.is_aged ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <div className="font-mono text-sm font-bold text-slate-900 mb-3">
                      Days Since Last GRN ≥ 30
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`rounded-lg px-6 py-4 border-2 ${calculated.is_aged ? 'bg-orange-50 border-orange-300' : 'bg-slate-50 border-slate-300'}`}>
                        <div className="flex items-center gap-3">
                          <Calendar className={`w-5 h-5 ${calculated.is_aged ? 'text-orange-600' : 'text-slate-400'}`} />
                          <div>
                            <div className="text-xs text-slate-600 mb-1">PLC Days</div>
                            <div className={`font-mono text-3xl font-bold ${calculated.is_aged ? 'text-orange-900' : 'text-slate-700'}`}>
                              {exampleData.last_grn_days_ago}
                            </div>
                            <div className="text-xs text-slate-600 mt-1">days since GRN</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600">
                        {calculated.is_aged ? '✓ Stock is aged' : '✗ Recent receipt, skip'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Final Decision */}
              <div className={`border-2 rounded-xl p-5 mt-6 ${calculated.qualifies ? 'bg-red-50 border-red-300' : 'bg-slate-50 border-slate-300'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-base text-slate-900 mb-2">FINAL DECISION:</div>
                    <div className="text-sm text-slate-700 mb-1">
                      Include only if <span className="font-bold">ALL THREE</span> conditions pass
                    </div>
                    <div className="text-xs text-slate-600 italic mt-2">
                      "Has stock + Zero sales + Aged ≥ 30 days"
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-5 py-3 rounded-lg ${calculated.qualifies ? 'bg-red-600' : 'bg-slate-400'}`}>
                    {calculated.qualifies ? (
                      <>
                        <TrendingDown className="w-5 h-5 text-white" />
                        <span className="font-bold text-white">INCLUDE IN REPORT</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-white" />
                        <span className="font-bold text-white">SKIP</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* OUTPUT */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">OUTPUT (What the Report Shows)</h2>
              </div>
            </div>
            <div className="p-6">
              
              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-6 rounded-r-lg">
                <div className="font-bold text-indigo-900 mb-1">For every zero-sales option:</div>
                <div className="text-indigo-800 text-sm">"Show all relevant details so merchandisers can decide what action to take."</div>
              </div>

              <div className="space-y-4">
                
                {/* Store Details */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Store className="w-4 h-4 text-indigo-600" />
                    Store Details
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between bg-white px-3 py-2 rounded">
                      <span className="text-slate-600">Zone / State</span>
                      <span className="font-mono text-slate-900">Geographic location</span>
                    </div>
                    <div className="flex justify-between bg-white px-3 py-2 rounded">
                      <span className="text-slate-600">Store Code</span>
                      <span className="font-mono text-slate-900">Store identifier</span>
                    </div>
                    <div className="flex justify-between bg-white px-3 py-2 rounded col-span-2">
                      <span className="text-slate-600">Store Name</span>
                      <span className="font-mono text-slate-900">Full store name</span>
                    </div>
                  </div>
                </div>

                {/* Product/Option Details */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-indigo-600" />
                    Product / Option Details
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex justify-between bg-white px-3 py-2 rounded">
                      <span className="text-slate-600">Brand</span>
                      <span className="font-mono text-slate-900">Brand name</span>
                    </div>
                    <div className="flex justify-between bg-white px-3 py-2 rounded">
                      <span className="text-slate-600">Option</span>
                      <span className="font-mono text-slate-900">Style + Color</span>
                    </div>
                    <div className="flex justify-between bg-white px-3 py-2 rounded">
                      <span className="text-slate-600">Variant</span>
                      <span className="font-mono text-slate-900">SKU code</span>
                    </div>
                    <div className="flex justify-between bg-white px-3 py-2 rounded">
                      <span className="text-slate-600">Size</span>
                      <span className="font-mono text-slate-900">Size value</span>
                    </div>
                    <div className="flex justify-between bg-white px-3 py-2 rounded">
                      <span className="text-slate-600">Category</span>
                      <span className="font-mono text-slate-900">Product type</span>
                    </div>
                    <div className="flex justify-between bg-white px-3 py-2 rounded">
                      <span className="text-slate-600">Season</span>
                      <span className="font-mono text-slate-900">Season code</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="bg-indigo-50 rounded-xl p-4 border-2 border-indigo-200">
                  <div className="font-bold text-slate-900 mb-3">Key Metrics</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-indigo-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="text-xs font-semibold text-slate-700">Days Since Last GRN</span>
                      </div>
                      <div className="font-mono text-2xl font-bold text-orange-900">{exampleData.last_grn_days_ago}</div>
                      <div className="text-xs text-slate-600 mt-1">PLC days (age of stock)</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-indigo-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-semibold text-slate-700">Net Sales (30d)</span>
                      </div>
                      <div className="font-mono text-2xl font-bold text-red-900">{calculated.net_sales}</div>
                      <div className="text-xs text-slate-600 mt-1">Sales − Returns</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-indigo-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-semibold text-slate-700">Current Stock</span>
                      </div>
                      <div className="font-mono text-2xl font-bold text-blue-900">{exampleData.stock_on_hand}</div>
                      <div className="text-xs text-slate-600 mt-1">Units in store now</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-indigo-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-slate-700">Total Received</span>
                      </div>
                      <div className="font-mono text-2xl font-bold text-emerald-900">{exampleData.total_received}</div>
                      <div className="text-xs text-slate-600 mt-1">All-time receipts</div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-slate-900 rounded-xl p-5">
                  <div className="text-sm text-slate-300 mb-2">In short:</div>
                  <div className="text-lg font-bold text-white leading-relaxed">
                    "Seasonal stock that came in ≥30 days ago, is still lying in store, and hasn't sold in the last 30 days."
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ZeroSalesViz;
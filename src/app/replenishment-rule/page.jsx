"use client"
import React from 'react';
import { Package, TrendingUp, Database, AlertTriangle, CheckCircle2, ArrowRight, Warehouse, Calculator, Layers } from 'lucide-react';

const ReplenishmentRuleViz = () => {
  const exampleData = {
    base_stock: 120,
    stock_on_hand: 45,
    in_transit: 30,
    dip: 15,
    net_sales_60d: 300,
    ros: 5,
    warehouse_free: 500,
  };

  const calculated = {
    gap: Math.max(0, exampleData.base_stock - (exampleData.stock_on_hand + exampleData.in_transit + exampleData.dip)),
    projected_doc: ((exampleData.stock_on_hand + exampleData.in_transit + exampleData.dip) / exampleData.ros).toFixed(1),
    needsReplenishment: (exampleData.base_stock - (exampleData.stock_on_hand + exampleData.in_transit + exampleData.dip)) > 0
  };

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold mb-3">
            CORE REPLENISHMENT RULE
          </div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-3">
            Send stock to stores where current + incoming inventory is below the minimum base stock. If warehouse is low, prioritize stores selling fast and running out soon.
          </h1>
          <p className="text-sm text-slate-600">For core products (SeasonCode 2) only</p>
        </div>

        {/* Decision Card Flow */}
        <div className="space-y-6">
          
          {/* INPUTS */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">INPUTS</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                
                {/* Variant Definition */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-slate-900">Variant</h3>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 text-sm">
                    <div className="font-semibold text-emerald-900 mb-1">What it is:</div>
                    <div className="text-slate-700 mb-3">Core products we always keep in stock (not seasonal items).</div>
                    <div className="font-semibold text-emerald-900 mb-1">In the data:</div>
                    <div className="space-y-1 text-xs text-slate-600 font-mono">
                      <div>• HOAD: <span className="font-bold">AlternateProductCodes</span></div>
                      <div>• SAP: <span className="font-bold">MATNR</span></div>
                      <div>• Must be: <span className="font-bold">SeasonCode = 2</span> and <span className="font-bold">IsActive = 1</span></div>
                    </div>
                  </div>
                </div>

                {/* Store Definition */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Warehouse className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-slate-900">Store</h3>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 text-sm">
                    <div className="font-semibold text-emerald-900 mb-1">What it is:</div>
                    <div className="text-slate-700 mb-3">Any HOAD store that sells products.</div>
                    <div className="font-semibold text-emerald-900 mb-1">In the data:</div>
                    <div className="space-y-1 text-xs text-slate-600 font-mono">
                      <div>• HOAD: <span className="font-bold">StoreCode / AlternateStoreCode</span></div>
                      <div>• SAP: <span className="font-bold">KUNNR (C%)</span></div>
                      <div>• Skip: {'{13,14,235,234,232,29}'}, <span className="font-bold">'HOAD%'</span>, FO {'{15,16}'}</div>
                      <div>• Must be active, Type 1 or 3 (EBO/Franchise)</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Signals Table */}
              <div className="mt-6">
                <h4 className="text-sm font-bold text-slate-900 mb-3">What we measure per store × variant:</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="text-xs font-semibold text-slate-700 mb-1">BaseStock</div>
                    <div className="text-xs text-slate-600">Minimum display level for this core item</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="text-xs font-semibold text-slate-700 mb-1">StockInHand</div>
                    <div className="text-xs text-slate-600">Physical stock in store right now</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="text-xs font-semibold text-slate-700 mb-1">InTransit + DIP</div>
                    <div className="text-xs text-slate-600">Shipped or picked but not delivered</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="text-xs font-semibold text-slate-700 mb-1">ROS</div>
                    <div className="text-xs text-slate-600">Selling speed (units/day over 60 days)</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <div className="text-xs font-semibold text-slate-700 mb-1">Projected_DoC</div>
                    <div className="text-xs text-slate-600">Days until stockout (for priority only)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TRIGGER CONDITION */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">TRIGGER (When to Send Stock)</h2>
              </div>
            </div>
            <div className="p-6">
              
              {/* Business Question */}
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-r-lg">
                <div className="font-bold text-red-900 mb-1">The question:</div>
                <div className="text-red-800 text-sm">"Is the store below its minimum base stock after counting what's there and what's coming?"</div>
              </div>

              {/* Calculation */}
              <div className="space-y-4">
                
                {/* Gap Calculation */}
                <div className="bg-slate-50 rounded-xl p-5 border-2 border-slate-300">
                  <div className="font-bold text-slate-900 mb-3 text-base">Calculate the Gap:</div>
                  
                  <div className="bg-white rounded-lg p-4 mb-4 border border-slate-200">
                    <div className="font-mono text-lg font-bold text-slate-900 mb-3">
                      Gap = BaseStock − (InStore + Shipped + Packed)
                    </div>
                    <div className="font-mono text-base text-slate-700">
                      = {exampleData.base_stock} − ({exampleData.stock_on_hand} + {exampleData.in_transit} + {exampleData.dip})
                    </div>
                    <div className="font-mono text-base text-slate-700 mb-3">
                      = {exampleData.base_stock} − {exampleData.stock_on_hand + exampleData.in_transit + exampleData.dip}
                    </div>
                    <div className="bg-slate-900 rounded-lg px-4 py-3 inline-block">
                      <span className="text-slate-300 text-sm mr-2">Gap =</span>
                      <span className="text-white font-bold text-2xl">{calculated.gap}</span>
                      <span className="text-slate-300 text-sm ml-2">units</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-50 rounded p-3 border border-blue-200">
                      <div className="text-xs text-blue-600 mb-1">Target</div>
                      <div className="font-mono text-xl font-bold text-blue-900">{exampleData.base_stock}</div>
                      <div className="text-xs text-slate-600 mt-1">BaseStock</div>
                    </div>
                    <div className="bg-emerald-50 rounded p-3 border border-emerald-200">
                      <div className="text-xs text-emerald-600 mb-1">Available</div>
                      <div className="font-mono text-xl font-bold text-emerald-900">{exampleData.stock_on_hand + exampleData.in_transit + exampleData.dip}</div>
                      <div className="text-xs text-slate-600 mt-1">Total on hand + coming</div>
                    </div>
                    <div className="bg-orange-50 rounded p-3 border border-orange-200">
                      <div className="text-xs text-orange-600 mb-1">Shortfall</div>
                      <div className="font-mono text-xl font-bold text-orange-900">{calculated.gap}</div>
                      <div className="text-xs text-slate-600 mt-1">Need to send</div>
                    </div>
                  </div>
                </div>

                {/* Trigger Decision */}
                <div className={`border-2 rounded-xl p-4 ${calculated.needsReplenishment ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-slate-900 mb-1">TRIGGER RULE:</div>
                      <div className="text-sm text-slate-700 mb-1">
                        Send stock if Gap &gt; 0
                      </div>
                      <div className="text-xs text-slate-600 italic mt-2">
                        Even if not selling fast, core must stay at base stock levels
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${calculated.needsReplenishment ? 'bg-red-600' : 'bg-green-600'}`}>
                      {calculated.needsReplenishment ? (
                        <>
                          <AlertTriangle className="w-5 h-5 text-white" />
                          <span className="font-bold text-white">SEND {calculated.gap} UNITS</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-white" />
                          <span className="font-bold text-white">BASE STOCK OK</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RECOMMEND QUANTITY */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">RECOMMEND QUANTITY</h2>
              </div>
            </div>
            <div className="p-6">
              
              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-6 rounded-r-lg">
                <div className="font-bold text-indigo-900 mb-1">Simple:</div>
                <div className="text-indigo-800 text-sm">"Send exactly the Gap — enough to reach base stock."</div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="font-mono text-xl font-bold text-slate-900 mb-2">
                  RecommendQty = Gap
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="bg-indigo-600 rounded-lg px-6 py-3">
                    <span className="text-indigo-100 text-sm mr-2">Send:</span>
                    <span className="text-white font-bold text-3xl">{calculated.gap}</span>
                    <span className="text-indigo-100 text-sm ml-2">units</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    (If Gap ≤ 0, send nothing)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PRIORITY */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">PRIORITY (Who Gets First)</h2>
              </div>
            </div>
            <div className="p-6">
              
              <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6 rounded-r-lg">
                <div className="font-bold text-purple-900 mb-1">When warehouse is low:</div>
                <div className="text-purple-800 text-sm">"Prioritize stores selling fast (high ROS) and running out soon (low Projected DoC)."</div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-3">Projected DoC (for ranking only):</div>
                  <div className="font-mono text-sm bg-white px-3 py-2 rounded border border-slate-200 mb-3">
                    Projected_DoC = (InStore + Shipped + Packed) / ROS
                  </div>
                  <div className="font-mono text-sm bg-white px-3 py-2 rounded border border-slate-200 mb-3">
                    = ({exampleData.stock_on_hand} + {exampleData.in_transit} + {exampleData.dip}) / {exampleData.ros} = <span className="font-bold text-purple-700">{calculated.projected_doc} days</span>
                  </div>
                  <div className="text-xs text-slate-600 italic">
                    Note: Projected DoC doesn't trigger replenishment, only ranks urgency
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                  <div className="font-bold text-slate-900 mb-3">Priority Score:</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">High ROS</div>
                        <div className="text-xs text-slate-600">Selling fast = urgent</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Low Projected DoC</div>
                        <div className="text-xs text-slate-600">Running out soon = urgent</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ALLOCATION */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-3">
              <div className="flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-white" />
                <h2 className="text-lg font-bold text-white">ALLOCATION (Warehouse Constraint)</h2>
              </div>
            </div>
            <div className="p-6">
              
              <div className="bg-orange-50 border-l-4 border-orange-600 p-4 mb-6 rounded-r-lg">
                <div className="font-bold text-orange-900 mb-1">If warehouse can't fill all gaps:</div>
                <div className="text-orange-800 text-sm">"Distribute available stock proportionally by priority. High-priority stores get more."</div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-3">Allocation Steps:</div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <div className="text-sm text-slate-700">Calculate Gap for all stores that need stock</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <div className="text-sm text-slate-700">Rank stores by priority (high ROS + low Projected DoC)</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <div className="text-sm text-slate-700">If warehouse stock ≥ total Gap → everyone gets full amount</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <div className="text-sm text-slate-700">If warehouse stock &lt; total Gap → split proportionally by priority</div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-300">
                  <div className="font-bold text-slate-900 mb-3">Warehouse Availability:</div>
                  <div className="space-y-2 text-xs mb-3">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5" />
                      <div><span className="font-semibold">How we calculate it:</span> Warehouse stock minus stock already reserved for dispatch</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5" />
                      <div><span className="font-semibold">Main warehouses:</span> <span className="font-mono">EB01, EB02, EB05</span></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5" />
                      <div><span className="font-semibold">Other warehouses (FG only):</span> <span className="font-mono">E110, E111, E410, E710</span> (only FG01 stock)</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5" />
                      <div><span className="font-semibold">SAP rules:</span> Client = 700, consider only items with stock &gt; 0</div>
                    </div>
                  </div>
                  <div className="bg-orange-600 rounded-lg px-4 py-2 inline-block">
                    <span className="text-orange-100 text-xs mr-2">Available:</span>
                    <span className="text-white font-bold text-xl">{exampleData.warehouse_free}</span>
                    <span className="text-orange-100 text-xs ml-2">units</span>
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

export default ReplenishmentRuleViz;

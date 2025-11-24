"use client"
import { Package, TrendingUp, Database, AlertTriangle, CheckCircle2, Calendar, Warehouse, Calculator, Layers, ShoppingBag } from 'lucide-react';

const SeasonalReplenishmentViz = () => {
  const exampleData = {
    last_receipt_date: '2024-10-15',
    sell_through_since: 85,
    stock_on_hand: 20,
    in_transit: 10,
    dip: 5,
    ros: 4.2,
    warehouse_free: 300,
  };

  const calculated = {
    recommend_qty: Math.max(0, exampleData.sell_through_since - exampleData.stock_on_hand - exampleData.in_transit - exampleData.dip),
    projected_doc: ((exampleData.stock_on_hand + exampleData.in_transit + exampleData.dip) / exampleData.ros).toFixed(1),
    needsReplenishment: exampleData.sell_through_since > 0 && (exampleData.sell_through_since - exampleData.stock_on_hand - exampleData.in_transit - exampleData.dip) > 0
  };

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-semibold mb-3">
            SEASONAL REPLENISHMENT RULE
          </div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-3">
            Send stock to stores that proved they can sell this item — based on actual customer demand since the last time they received inventory.
          </h1>
          <p className="text-sm text-slate-600">For seasonal/fashion products (SeasonCode 49 or 50)</p>
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
                    <div className="text-slate-700 mb-3">Seasonal/fashion items with short lifecycles.</div>
                    <div className="font-semibold text-emerald-900 mb-1">In the data:</div>
                    <div className="space-y-1 text-xs text-slate-600 font-mono">
                      <div>• HOAD: <span className="font-bold">AlternateProductCodes</span></div>
                      <div>• SAP: <span className="font-bold">MATNR</span></div>
                      <div>• Must be: <span className="font-bold">SeasonCode 49 or 50</span> and <span className="font-bold">IsActive = 1</span></div>
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
                    <div className="text-slate-700 mb-3">Real selling stores only.</div>
                    <div className="font-semibold text-emerald-900 mb-1">In the data:</div>
                    <div className="space-y-1 text-xs text-slate-600 font-mono">
                      <div>• Type 1 or 3 (EBO + Franchise)</div>
                      <div>• Exclude FO: <span className="font-bold">StoreCode 15, 16</span></div>
                      <div>• Must be active</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Key Concept: Last Receipt */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-blue-900 mb-2">Last Real Receipt Date</div>
                    <div className="text-sm text-slate-700 mb-3">
                      For each store × variant, find when they last received stock. This is the latest of:
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <div className="text-xs font-semibold text-slate-900 mb-1">Supplier GRN</div>
                        <div className="text-xs text-slate-600">Stock received from warehouse</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <div className="text-xs font-semibold text-slate-900 mb-1">TO-IN Receipt</div>
                        <div className="text-xs text-slate-600">Transfer received from another store</div>
                      </div>
                    </div>
                    <div className="mt-3 bg-blue-600 text-white rounded-lg px-3 py-2 inline-block text-sm font-mono">
                      Example: {exampleData.last_receipt_date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Concept: Real Sell-Through */}
              <div className="mt-4 bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                <div className="flex items-start gap-3">
                  <ShoppingBag className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-purple-900 mb-2">Real Sell-Through Since Last Receipt</div>
                    <div className="text-sm text-slate-700 mb-3">
                      How many pieces customers actually bought and kept, after the last receipt:
                    </div>
                    <div className="space-y-2 text-xs text-slate-700">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                        <div>Sales add units, returns subtract</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                        <div>Only valid bills (ignore cancelled/invalid)</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                        <div>Only real selling stores (ignore FO/warehouse/test)</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                        <div>Count only sales after last receipt date</div>
                      </div>
                    </div>
                    <div className="mt-3 bg-purple-600 text-white rounded-lg px-3 py-2 inline-block">
                      <span className="text-purple-100 text-xs mr-2">Sold since last receipt:</span>
                      <span className="font-bold text-lg">{exampleData.sell_through_since}</span>
                      <span className="text-purple-100 text-xs ml-2">units</span>
                    </div>
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
                <div className="text-red-800 text-sm">"Did customers actually buy this item since the store last received it? If yes, they proved demand."</div>
              </div>

              {/* Trigger Logic */}
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-5 border-2 border-slate-300">
                  <div className="font-bold text-slate-900 mb-3 text-base">Trigger Rule:</div>
                  
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-purple-100 text-purple-700 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">1</div>
                        <div className="text-sm font-semibold text-slate-900">Check if there's sell-through</div>
                      </div>
                      <div className="text-xs text-slate-600 ml-11">Real sell-through since last receipt must be &gt; 0</div>
                      <div className="ml-11 mt-2 bg-purple-50 rounded px-3 py-2 inline-block">
                        <span className="text-xs text-purple-700">Sell-through = </span>
                        <span className="font-mono font-bold text-purple-900">{exampleData.sell_through_since} units</span>
                        <span className="text-xs text-purple-700 ml-2">&gt; 0 ✓</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-purple-100 text-purple-700 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">2</div>
                        <div className="text-sm font-semibold text-slate-900">Check if store needs more</div>
                      </div>
                      <div className="text-xs text-slate-600 ml-11 mb-2">Sell-through should be more than what's already available</div>
                      <div className="ml-11 font-mono text-xs bg-slate-50 px-3 py-2 rounded border border-slate-200 mb-2">
                        Available = InStore + Shipped + Packed
                      </div>
                      <div className="ml-11 font-mono text-xs bg-slate-50 px-3 py-2 rounded border border-slate-200">
                        = {exampleData.stock_on_hand} + {exampleData.in_transit} + {exampleData.dip} = {exampleData.stock_on_hand + exampleData.in_transit + exampleData.dip}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trigger Decision */}
                <div className={`border-2 rounded-xl p-4 ${calculated.needsReplenishment ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-slate-900 mb-1">TRIGGER DECISION:</div>
                      <div className="text-sm text-slate-700">
                        {calculated.needsReplenishment ? 
                          `Sold ${exampleData.sell_through_since} but only have ${exampleData.stock_on_hand + exampleData.in_transit + exampleData.dip} available` :
                          "Store has enough stock for proven demand"
                        }
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${calculated.needsReplenishment ? 'bg-red-600' : 'bg-green-600'}`}>
                      {calculated.needsReplenishment ? (
                        <>
                          <AlertTriangle className="w-5 h-5 text-white" />
                          <span className="font-bold text-white">SEND STOCK</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-white" />
                          <span className="font-bold text-white">ENOUGH STOCK</span>
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
                <div className="font-bold text-indigo-900 mb-1">The logic:</div>
                <div className="text-indigo-800 text-sm">"Bring the store back to what it already proved it can sell, minus what it has or will receive."</div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="font-mono text-lg font-bold text-slate-900 mb-3">
                    RecommendQty = SellThrough − InStore − Shipped − Packed
                  </div>
                  <div className="font-mono text-base text-slate-700 mb-3">
                    = {exampleData.sell_through_since} − {exampleData.stock_on_hand} − {exampleData.in_transit} − {exampleData.dip}
                  </div>
                  <div className="font-mono text-base text-slate-700 mb-4">
                    = {exampleData.sell_through_since} − {exampleData.stock_on_hand + exampleData.in_transit + exampleData.dip}
                  </div>
                  <div className="bg-indigo-600 rounded-lg px-4 py-3 inline-block">
                    <span className="text-indigo-100 text-sm mr-2">Send:</span>
                    <span className="text-white font-bold text-3xl">{calculated.recommend_qty}</span>
                    <span className="text-indigo-100 text-sm ml-2">units</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="text-xs font-semibold text-slate-700 mb-1">Important:</div>
                  <div className="text-xs text-slate-600">If result is negative or no sell-through → send nothing (no proven demand)</div>
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
                <div className="font-bold text-purple-900 mb-1">When warehouse is limited:</div>
                <div className="text-purple-800 text-sm">"Prioritize stores selling fast (high ROS) and likely to stock out soon (low DoC)."</div>
              </div>

              <div className="space-y-4">
                <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                  <div className="font-bold text-slate-900 mb-3">Priority factors:</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        <div className="text-sm font-semibold text-slate-900">High ROS</div>
                      </div>
                      <div className="text-xs text-slate-600 mb-2">Selling fast = more urgent</div>
                      <div className="font-mono text-sm text-purple-700">Current: {exampleData.ros} units/day</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-purple-600" />
                        <div className="text-sm font-semibold text-slate-900">Low DoC</div>
                      </div>
                      <div className="text-xs text-slate-600 mb-2">Running out soon = urgent</div>
                      <div className="font-mono text-sm text-purple-700">Projected: {calculated.projected_doc} days</div>
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
                <div className="font-bold text-orange-900 mb-1">If warehouse can't fill all needs:</div>
                <div className="text-orange-800 text-sm">"Share available stock proportionally by priority. High-priority stores get more."</div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="font-bold text-slate-900 mb-3">Allocation Steps:</div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <div className="text-sm text-slate-700">Calculate RecommendQty for all stores with proven sell-through</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <div className="text-sm text-slate-700">Rank stores by priority (high ROS + low DoC)</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <div className="text-sm text-slate-700">If warehouse stock ≥ total need → everyone gets full amount</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <div className="text-sm text-slate-700">If warehouse stock &lt; total need → split fairly by priority (largest remainder rounding)</div>
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

export default SeasonalReplenishmentViz;
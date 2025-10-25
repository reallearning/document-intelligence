"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const DecisionMarketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDecisions, setSelectedDecisions] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDecision, setEditingDecision] = useState(null);
  const [decisions, setDecisions] = useState([
    // Inventory & Replenishment
    {
      id: 'inv1',
      category: 'Inventory & Replenishment',
      decision: 'What do I reorder today (SKU×Node) and how much?',
      multiVariable: true,
      objectives: 'service level, GMROII, holding cost, MOQ, lead-time risk'
    },
    {
      id: 'inv2',
      category: 'Inventory & Replenishment',
      decision: 'What should safety stock be by SKU×Node?',
      multiVariable: true,
      objectives: 'service level, variability, carrying cost, stockout risk'
    },
    {
      id: 'inv3',
      category: 'Inventory & Replenishment',
      decision: 'Where am I overstocked and what transfers clear risk fastest?',
      multiVariable: true,
      objectives: 'clearance GM, transfer cost, ETA risk, demand uplift'
    },
    {
      id: 'inv4',
      category: 'Inventory & Replenishment',
      decision: 'What\'s the optimal size curve by store cluster for each style?',
      multiVariable: true,
      objectives: 'fill rate, returns risk, sell-through, pack/MOQ constraints'
    },
    {
      id: 'inv5',
      category: 'Inventory & Replenishment',
      decision: 'Which POs must be expedited to avoid DC bottlenecks?',
      multiVariable: true,
      objectives: 'lost sales/GM risk, expediting cost, capacity'
    },
    
    // Allocation & Network Flow
    {
      id: 'alloc1',
      category: 'Allocation & Network Flow',
      decision: 'How should I allocate a new collection across stores at launch?',
      multiVariable: true,
      objectives: 'GM/revenue, fairness, space, MOQ, WOC targets'
    },
    {
      id: 'alloc2',
      category: 'Allocation & Network Flow',
      decision: 'What\'s the optimal in-season reallocation this week?',
      multiVariable: true,
      objectives: 'uplift vs lane cost, OOS risk, cannibalization'
    },
    {
      id: 'alloc3',
      category: 'Allocation & Network Flow',
      decision: 'When should orders be fulfilled from store vs DC?',
      multiVariable: true,
      objectives: 'fulfillment cost, SLA, store OSA protection, split-ship cost'
    },
    {
      id: 'alloc4',
      category: 'Allocation & Network Flow',
      decision: 'Prepack vs piece-pack: what\'s the right split?',
      multiVariable: true,
      objectives: 'labor/handling, size availability, returns risk, fill rate'
    },
    {
      id: 'alloc5',
      category: 'Allocation & Network Flow',
      decision: 'How do I allocate scarce supply across channels fairly?',
      multiVariable: true,
      objectives: 'profit, fairness, service KPIs, policy caps'
    },
    
    // Pricing & Discounting
    {
      id: 'price1',
      category: 'Pricing & Discounting',
      decision: 'What markdown should each SKU take this week to hit sell-through targets?',
      multiVariable: true,
      objectives: 'GM, sell-through, price rules, cannibalization'
    },
    {
      id: 'price2',
      category: 'Pricing & Discounting',
      decision: 'What is the right launch MRP for a new style?',
      multiVariable: true,
      objectives: 'margin, price index, elasticity, brand policy'
    },
    {
      id: 'price3',
      category: 'Pricing & Discounting',
      decision: 'Should I take a geo-selective price cut?',
      multiVariable: true,
      objectives: 'GM vs volume, competitive index, event uplift'
    },
    {
      id: 'price4',
      category: 'Pricing & Discounting',
      decision: 'Promo vs markdown—what\'s better for this SKU?',
      multiVariable: true,
      objectives: 'incremental GM, halo, long-term price perception, returns'
    },
    {
      id: 'price5',
      category: 'Pricing & Discounting',
      decision: 'What clearance calendar meets ageing targets with minimal GM loss?',
      multiVariable: true,
      objectives: 'sell-through, GM, ageing, capacity windows'
    },
    
    // E-commerce & Funnel
    {
      id: 'ecom1',
      category: 'E-commerce & Funnel',
      decision: 'Which PDPs should change hero images or copy next?',
      multiVariable: true,
      objectives: 'conversion uplift, effort/cost, cannibalization, brand rules'
    },
    {
      id: 'ecom2',
      category: 'E-commerce & Funnel',
      decision: 'How should we rank the landing page this week?',
      multiVariable: true,
      objectives: 'CVR, margin, availability, novelty/recency, diversity'
    },
    {
      id: 'ecom3',
      category: 'E-commerce & Funnel',
      decision: 'Which styles need size-guidance nudges?',
      multiVariable: true,
      objectives: 'conversion, returns risk, UX cost, page speed impact'
    },
    
    // Promotions, Marketing & RMN
    {
      id: 'promo1',
      category: 'Promotions, Marketing & RMN',
      decision: 'Next-best-offer by customer segment?',
      multiVariable: true,
      objectives: 'uplift, margin, fatigue, fairness, inventory'
    },
    {
      id: 'promo2',
      category: 'Promotions, Marketing & RMN',
      decision: 'Optimal campaign calendar by brand for the next quarter?',
      multiVariable: true,
      objectives: 'incremental GM, budget, frequency caps, overlap'
    },
    {
      id: 'promo3',
      category: 'Promotions, Marketing & RMN',
      decision: 'Allocate co-op/trade funds by brand/placement to maximize incremental GM',
      multiVariable: true,
      objectives: 'incremental GM, partner rules, saturation'
    },
    {
      id: 'promo4',
      category: 'Promotions, Marketing & RMN',
      decision: 'Optimize ad placement yield and pacing daily',
      multiVariable: true,
      objectives: 'RPM/ROAS, budget pacing, audience overlap, supply limits'
    },
    {
      id: 'promo5',
      category: 'Promotions, Marketing & RMN',
      decision: 'Build/activate audiences with frequency caps and overlap suppression',
      multiVariable: true,
      objectives: 'reach, incrementality, fatigue, privacy rules'
    },
    
    // Customer Experience & Service
    {
      id: 'cx1',
      category: 'Customer Experience & Service',
      decision: 'Auto-offer appeasements for eligible failures',
      multiVariable: true,
      objectives: 'CSAT uplift, cost, abuse risk, policy caps'
    },
    {
      id: 'cx2',
      category: 'Customer Experience & Service',
      decision: 'Route tickets to channels/agents to maximize resolution at lowest cost',
      multiVariable: true,
      objectives: 'AHT/first-contact resolution, cost, backlog SLAs'
    },
    {
      id: 'cx3',
      category: 'Customer Experience & Service',
      decision: 'Approve content fixes (images/copy) for PDPs predicted to lift conversion',
      multiVariable: true,
      objectives: 'uplift, content ops capacity, brand rules'
    },
    
    // Vendor, Marketplace & Supply
    {
      id: 'vendor1',
      category: 'Vendor, Marketplace & Supply',
      decision: 'Vendor performance scorecard—who to grow/shrink?',
      multiVariable: true,
      objectives: 'cost, quality/defect, lead time, compliance, capacity'
    },
    {
      id: 'vendor2',
      category: 'Vendor, Marketplace & Supply',
      decision: 'MOQ aggregation—what bundles hit MOQs at least cost?',
      multiVariable: true,
      objectives: 'MOQ feasibility, GM, working capital, assortment'
    },
    {
      id: 'vendor3',
      category: 'Vendor, Marketplace & Supply',
      decision: 'Should we renegotiate ex-factory for this capsule?',
      multiVariable: true,
      objectives: 'should-cost gap, volume commitments, timing, risk'
    },
    {
      id: 'vendor4',
      category: 'Vendor, Marketplace & Supply',
      decision: 'Allocate scarce supply between 1P/3P to maximize GM with service guardrails',
      multiVariable: true,
      objectives: 'GM, service, partner fairness'
    },
    
    // Omnichannel & Last-Mile
    {
      id: 'omni1',
      category: 'Omnichannel & Last-Mile',
      decision: 'Route BOPIS/ship-from-store orders (DOM policy)',
      multiVariable: true,
      objectives: 'fulfillment cost, SLA hit rate, store OSA, split-ship risk'
    },
    {
      id: 'omni2',
      category: 'Omnichannel & Last-Mile',
      decision: 'Set dynamic slot capacity for pickup/delivery',
      multiVariable: true,
      objectives: 'SLA, labor capacity, forecasted demand, promise accuracy'
    },
    {
      id: 'omni3',
      category: 'Omnichannel & Last-Mile',
      decision: 'Choose carrier mix and re-routing rules per region',
      multiVariable: true,
      objectives: 'cost, SLA reliability, damage/claim risk, carbon'
    },
    
    // Workforce & Labor
    {
      id: 'labor1',
      category: 'Workforce & Labor',
      decision: 'Auto-generate rosters',
      multiVariable: true,
      objectives: 'service level, labor cost, compliance, skills mix'
    },
    {
      id: 'labor2',
      category: 'Workforce & Labor',
      decision: 'Assign cross-training and shift swaps',
      multiVariable: true,
      objectives: 'coverage gaps, compliance, productivity, cost'
    },
    {
      id: 'labor3',
      category: 'Workforce & Labor',
      decision: 'Set incentive plans by category with budget guardrails',
      multiVariable: true,
      objectives: 'lift, cost, fairness, gaming risk'
    },
    
    // Real Estate & Lease
    {
      id: 're1',
      category: 'Real Estate & Lease',
      decision: 'Select new sites and approve/decline',
      multiVariable: true,
      objectives: 'NPV/payback, cannibalization, occupancy cost, risk'
    },
    {
      id: 're2',
      category: 'Real Estate & Lease',
      decision: 'Decide lease renew/renegotiate/exit',
      multiVariable: true,
      objectives: 'sales outlook, occupancy %, capex, relocation risk'
    },
    {
      id: 're3',
      category: 'Real Estate & Lease',
      decision: 'Where should we open the next store?',
      multiVariable: true,
      objectives: 'NPV, coverage, cannibalization, brand lift, risk'
    }
  ]);

  const [formData, setFormData] = useState({
    category: '',
    decision: '',
    objectives: '',
    multiVariable: true
  });

  const categories = [...new Set(decisions.map(d => d.category))].sort();
  
  const filteredDecisions = selectedCategory === 'all' 
    ? decisions 
    : decisions.filter(d => d.category === selectedCategory);

  const toggleDecision = (id) => {
    const newSelected = new Set(selectedDecisions);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedDecisions(newSelected);
  };

  const openAddModal = () => {
    setEditingDecision(null);
    setFormData({
      category: '',
      decision: '',
      objectives: '',
      multiVariable: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (decision) => {
    setEditingDecision(decision);
    setFormData({
      category: decision.category,
      decision: decision.decision,
      objectives: decision.objectives || '',
      multiVariable: decision.multiVariable
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDecision(null);
  };

  const handleSave = () => {
    if (!formData.decision.trim() || !formData.category.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingDecision) {
      setDecisions(decisions.map(d => 
        d.id === editingDecision.id 
          ? { ...d, category: formData.category, decision: formData.decision, objectives: formData.objectives, multiVariable: formData.multiVariable }
          : d
      ));
    } else {
      const newDecision = {
        id: `custom_${Date.now()}`,
        category: formData.category,
        decision: formData.decision,
        objectives: formData.objectives,
        multiVariable: formData.multiVariable
      };
      setDecisions([...decisions, newDecision]);
    }
    
    closeModal();
  };

  return (
    <div className="h-screen overflow-auto bg-gray-100 py-12 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 mb-6">
          <p className="text-sm text-gray-400 mb-3">1/6</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight">
            Which decisions do you want to optimize?
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            Select the key decisions you want the system to optimize for your business. These multi-variable decisions balance competing objectives like profit, service level, cost, and risk to help you make smarter choices.
          </p>

          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">{filteredDecisions.length} Decisions</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={openAddModal}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Add new
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredDecisions.map((d) => (
            <div key={d.id} className="bg-white rounded-2xl shadow-sm p-6 transition-all hover:shadow-md">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedDecisions.has(d.id)}
                  onChange={() => toggleDecision(d.id)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          {d.category}
                        </span>
                        {d.multiVariable && (
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            Multi-variable
                          </span>
                        )}
                      </div>
                      <p className="text-gray-900 font-medium text-lg mb-2">{d.decision}</p>
                      {d.objectives && (
                        <p className="text-gray-500 text-sm">
                          <span className="font-medium">Optimizes for:</span> {d.objectives}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button 
                        onClick={() => openEditModal(d)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      {selectedDecisions.has(d.id) && (
                        <div className="w-6 h-6 bg-purple-700 rounded flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 mt-6">
         <Link href={"/workspace/source-connection"}>
          <button className="w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg">
            Continue
          </button></Link>
          <p className="text-center text-sm text-gray-400 mt-4">
            {selectedDecisions.size} decision{selectedDecisions.size !== 1 ? 's' : ''} selected
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">
                {editingDecision ? 'Edit Decision' : 'Add New Decision'}
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Pricing & Discounting"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Decision <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.decision}
                  onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
                  placeholder="What decision needs to be optimized?"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Optimization Objectives
                </label>
                <input
                  type="text"
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  placeholder="e.g., margin, service level, cost, risk"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">Comma-separated list of variables being optimized</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="multiVariable"
                  checked={formData.multiVariable}
                  onChange={(e) => setFormData({ ...formData, multiVariable: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-purple-700 focus:ring-purple-500"
                />
                <label htmlFor="multiVariable" className="text-sm font-medium text-gray-700">
                  Multi-variable optimization (balances multiple competing objectives)
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors font-medium"
              >
                {editingDecision ? 'Save Changes' : 'Add Decision'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecisionMarketplace;
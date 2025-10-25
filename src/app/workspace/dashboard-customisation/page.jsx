"use client";
import React, { useState } from 'react';
import { Settings, Plus, X } from 'lucide-react';
import Link from 'next/link';

const CustomizableDashboard = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  const questionCards = [
    {
      id: 1,
      category: '🧵 Product / Style Selection',
      text: 'Which new styles are performing above plan in their first two weeks of launch?',
      description: 'Identifies early winners using sell-through, velocity, and GM%.'
    },
    {
      id: 2,
      category: '🧵 Product / Style Selection',
      text: 'Which SKUs should move to markdown this week based on ageing and sell-through?',
      description: 'Flags items with low rotation and high WOC relative to peers.'
    },
    {
      id: 3,
      category: '🏬 Store / Channel Selection',
      text: 'Which stores are underperforming on sell-through despite adequate stock?',
      description: 'Finds stores needing VM or pricing attention.'
    },
    {
      id: 4,
      category: '🏬 Store / Channel Selection',
      text: 'Which cities or clusters delivered the highest uplift during the festive campaign?',
      description: 'Evaluates campaign impact geographically to decide next-phase targeting.'
    },
    {
      id: 5,
      category: '🧾 Pricing & Promotion Selection',
      text: 'Which SKUs are price-sensitive versus margin-sensitive?',
      description: 'Segments SKUs by elasticity to guide future markdown ladders.'
    },
    {
      id: 6,
      category: '🧾 Pricing & Promotion Selection',
      text: 'Which promotions generated the highest incremental GM per ₹ spent?',
      description: 'Ranks past promos by ROI and redemption efficiency.'
    },
    {
      id: 7,
      category: '🧳 Inventory & Replenishment Selection',
      text: 'Which DC-to-store lanes show recurring stock-out risk?',
      description: 'Prioritizes routes for replenishment frequency increases.'
    },
    {
      id: 8,
      category: '🧳 Inventory & Replenishment Selection',
      text: 'Which stores consistently exceed safety stock without higher sales?',
      description: 'Identifies over-stocked nodes for transfer planning.'
    },
    {
      id: 9,
      category: '🧑‍🤝‍🧑 Vendor & Supply Selection',
      text: 'Which vendors deliver fastest and at the lowest defect rate?',
      description: 'Ranks suppliers on lead-time reliability × quality × cost.'
    },
    {
      id: 10,
      category: '📅 Collection & Assortment Selection',
      text: 'Which collections or product lines should be scaled next season?',
      description: 'Compares collections by full-price sell-through, GM, return rate, and contribution to overall sales.'
    }
  ];

  const decisionCards = [
    {
      id: 1,
      category: '1️⃣ Inventory Buy (Seasonal & Core)',
      text: 'Determine how much to buy, when to commit, and how to phase deliveries across vendors and DCs.',
      description: 'Balances: Forecasted demand ↑ | Working capital ↓ | Vendor lead-time reliability ↑ | Sell-through targets ↑ | Obsolescence risk ↓'
    },
    {
      id: 2,
      category: '2️⃣ Inventory Liquidation',
      text: 'Plan what to clear, where, and at what markdown to unlock cash without eroding brand value.',
      description: 'Balances: Sell-through ↑ | Gross margin ₹ ↑ | Ageing ↓ | Transfer/logistics cost ↓ | Price consistency ↔'
    },
    {
      id: 3,
      category: '3️⃣ Pricing Strategy',
      text: 'Define base price architecture, geo/channel pricing, and discount ladders.',
      description: 'Balances: Revenue ↑ | GM % ↑ | Competitor price index ↔ | Elasticity response ↑ | Brand perception ↔'
    },
    {
      id: 4,
      category: '4️⃣ Marketing & Footfall Increase',
      text: 'Decide which campaigns to run, where, and how much to invest to drive store traffic and conversions.',
      description: 'Balances: Incremental footfall ↑ | ROAS ↑ | Customer fatigue ↓ | Promo budget utilization ↑ | Cross-channel uplift ↑'
    },
    {
      id: 5,
      category: '5️⃣ Simultaneous Optimization of Inventory Movement across POS',
      text: 'Coordinate inventory flows across stores, DCs, and e-commerce for real-time efficiency.',
      description: 'Balances: Service level ↑ | Fulfilment cost ↓ | Stock-out risk ↓ | Overstock redistribution ↑ | Freight & carbon footprint ↓'
    }
  ];

  const activeCards = activeTab === 'questions' ? questionCards : decisionCards;

  const EditModal = ({ card, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Customize Card</h3>
            <p className="text-gray-500">Set up scheduled runs and notifications</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-3">{card.category}</h4>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900 mb-2">{card.text}</p>
              <p className="text-xs text-gray-500">{card.description}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h5 className="text-sm font-medium text-gray-900 mb-4">Schedule Settings</h5>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Run Frequency</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Custom</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Notification Time</label>
                <input 
                  type="time" 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="09:00"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" defaultChecked />
                  <span>Send email notifications</span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-700">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span>Send push notifications</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                alert('Settings saved!');
                onClose();
              }}
              className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AddCardModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Add New Card</h3>
            <p className="text-gray-500">Create a new {activeTab === 'questions' ? 'question' : 'decision'} card</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input 
              type="text" 
              placeholder="e.g., 🧵 Product / Style Selection"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {activeTab === 'questions' ? 'Question' : 'Decision'}
            </label>
            <textarea 
              placeholder={activeTab === 'questions' ? 'Enter your question...' : 'Enter your decision statement...'}
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              placeholder={activeTab === 'questions' ? 'Brief description of what this question identifies...' : 'Key factors this decision balances...'}
              rows="2"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                alert('Card added successfully!');
                onClose();
              }}
              className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const QuestionCard = ({ card }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 flex flex-col h-full">
      <div className="mb-3">
        <h3 className="text-xs font-medium text-gray-500 mb-3">{card.category}</h3>
      </div>
      
      <div className="flex-1 space-y-3 mb-6">
        <p className="text-sm font-medium text-gray-900 leading-snug">{card.text}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
      </div>

      <div className="mt-auto">
        <button 
          onClick={() => setSelectedCard(card)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Settings size={16} />
          <span>Edit / Customise</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-auto bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-3">Customise your dashboard</h1>
              <p className="text-gray-500 max-w-3xl">
                Select all the questions that you want to see in regular intervals, and if you want me to send you notifications for it.
              </p>
            </div>
           <Link href={"/workspace/workflow-builder"}> <button 
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <Plus size={18} />
              <span>Add new</span>
            </button></Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mt-8">
            <button
              onClick={() => setActiveTab('questions')}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === 'questions'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Questions
              {activeTab === 'questions' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('decisions')}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === 'decisions'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Decisions
              {activeTab === 'decisions' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {activeCards.map(card => (
            <QuestionCard key={card.id} card={card} />
          ))}
        </div>

        {/* Modals */}
        {selectedCard && <EditModal card={selectedCard} onClose={() => setSelectedCard(null)} />}
        {showAddModal && <AddCardModal onClose={() => setShowAddModal(false)} />}
      </div>
    </div>
  );
};

export default CustomizableDashboard;
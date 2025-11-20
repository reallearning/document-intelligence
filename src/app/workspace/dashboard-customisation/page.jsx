"use client"
import React, { useState } from 'react';
import { Users, ChevronRight, Check, Database, MessageSquare, Zap, Eye, Shield } from 'lucide-react';

const UserRoleConfiguration = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleConfigs, setRoleConfigs] = useState({});

  // Pre-defined user roles/personas
  const userRoles = [
    {
      id: 'store-manager',
      title: 'Store Manager',
      description: 'Front-line retail operations',
      icon: '🏪',
      color: 'blue',
      defaultAccess: {
        questions: ['inventory-stockout', 'sales-performance', 'slow-movers'],
        decisions: [],
        dataDomains: ['store-data', 'inventory', 'sales']
      }
    },
    {
      id: 'regional-manager',
      title: 'Regional Sales Manager',
      description: 'Multi-store oversight and planning',
      icon: '🗺️',
      color: 'purple',
      defaultAccess: {
        questions: ['inventory-stockout', 'sales-performance', 'pricing-analysis', 'regional-trends'],
        decisions: ['inventory-movement'],
        dataDomains: ['store-data', 'inventory', 'sales', 'regional']
      }
    },
    {
      id: 'buyer',
      title: 'Buyer / Planner',
      description: 'Procurement and inventory planning',
      icon: '📦',
      color: 'green',
      defaultAccess: {
        questions: ['inventory-stockout', 'reorder-recommendations', 'vendor-performance', 'sell-through'],
        decisions: ['inventory-buy', 'safety-stock', 'reorder-optimization'],
        dataDomains: ['inventory', 'vendors', 'purchasing', 'forecasting']
      }
    },
    {
      id: 'merchandiser',
      title: 'Merchandiser',
      description: 'Product assortment and pricing',
      icon: '🏷️',
      color: 'pink',
      defaultAccess: {
        questions: ['pricing-analysis', 'product-performance', 'markdown-candidates', 'assortment-gaps'],
        decisions: ['pricing-strategy', 'liquidation', 'markdown-optimization'],
        dataDomains: ['products', 'pricing', 'sales', 'competition']
      }
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain Manager',
      description: 'Logistics and distribution',
      icon: '🚛',
      color: 'orange',
      defaultAccess: {
        questions: ['inventory-movement', 'logistics-costs', 'supplier-leadtime', 'distribution-efficiency'],
        decisions: ['inventory-movement', 'safety-stock', 'reorder-optimization'],
        dataDomains: ['inventory', 'logistics', 'vendors', 'warehouses']
      }
    },
    {
      id: 'finance',
      title: 'Finance / CFO',
      description: 'Financial analytics and reporting',
      icon: '💰',
      color: 'emerald',
      defaultAccess: {
        questions: ['financial-kpis', 'gmroi', 'inventory-carrying-cost', 'markdown-impact'],
        decisions: ['liquidation', 'pricing-strategy'],
        dataDomains: ['financial', 'sales', 'inventory', 'costs']
      }
    },
    {
      id: 'executive',
      title: 'Executive / CEO',
      description: 'Strategic overview and KPIs',
      icon: '👔',
      color: 'gray',
      defaultAccess: {
        questions: ['all'],
        decisions: [],
        dataDomains: ['all']
      }
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      description: 'Deep analytics and custom queries',
      icon: '📊',
      color: 'indigo',
      defaultAccess: {
        questions: ['all'],
        decisions: [],
        dataDomains: ['all']
      }
    }
  ];

  const availableQuestions = [
    { id: 'inventory-stockout', name: 'Stock-out predictions (7/14/30 days)', category: 'Inventory' },
    { id: 'reorder-recommendations', name: 'What to reorder and how much', category: 'Inventory' },
    { id: 'slow-movers', name: 'Slow-moving and aged inventory', category: 'Inventory' },
    { id: 'inventory-movement', name: 'Optimal inventory movement between nodes', category: 'Inventory' },
    { id: 'sales-performance', name: 'Sales performance by SKU/Store/Region', category: 'Sales' },
    { id: 'sell-through', name: 'Sell-through rates and forecasts', category: 'Sales' },
    { id: 'regional-trends', name: 'Regional sales trends and patterns', category: 'Sales' },
    { id: 'pricing-analysis', name: 'Pricing effectiveness and elasticity', category: 'Pricing' },
    { id: 'markdown-candidates', name: 'Markdown candidates and timing', category: 'Pricing' },
    { id: 'product-performance', name: 'Product performance across channels', category: 'Products' },
    { id: 'assortment-gaps', name: 'Assortment gaps and opportunities', category: 'Products' },
    { id: 'vendor-performance', name: 'Vendor performance and lead times', category: 'Supply Chain' },
    { id: 'logistics-costs', name: 'Logistics costs and optimization', category: 'Supply Chain' },
    { id: 'financial-kpis', name: 'Financial KPIs and metrics', category: 'Finance' },
    { id: 'gmroi', name: 'GMROI analysis by category', category: 'Finance' },
  ];

  const availableDecisions = [
    { id: 'inventory-buy', name: 'Inventory Buy Optimization', description: 'What to reorder, how much, when' },
    { id: 'safety-stock', name: 'Safety Stock Levels', description: 'Optimal buffer stock by SKU×Node' },
    { id: 'reorder-optimization', name: 'Reorder Point Optimization', description: 'Dynamic reorder triggers' },
    { id: 'inventory-movement', name: 'Inventory Movement', description: 'Transfer recommendations between stores/DCs' },
    { id: 'pricing-strategy', name: 'Pricing Strategy', description: 'Optimal pricing by SKU×Channel' },
    { id: 'markdown-optimization', name: 'Markdown Optimization', description: 'When and how much to markdown' },
    { id: 'liquidation', name: 'Liquidation Strategy', description: 'Clear aged inventory profitably' },
  ];

  const dataDomains = [
    { id: 'store-data', name: 'Store & Location Data', description: 'Store master, formats, attributes' },
    { id: 'inventory', name: 'Inventory Data', description: 'Stock levels, movements, SKU details' },
    { id: 'sales', name: 'Sales Transactions', description: 'Historical and real-time sales' },
    { id: 'products', name: 'Product & Assortment', description: 'SKU master, collections, brands' },
    { id: 'pricing', name: 'Pricing & Markdowns', description: 'Price history, discount ladders' },
    { id: 'vendors', name: 'Vendor & Procurement', description: 'Supplier data, lead times, orders' },
    { id: 'logistics', name: 'Logistics & Shipping', description: 'Distribution, costs, routes' },
    { id: 'financial', name: 'Financial Data', description: 'P&L, costs, margins' },
    { id: 'regional', name: 'Regional Data', description: 'Region/cluster aggregations' },
    { id: 'warehouses', name: 'Warehouse Data', description: 'DC inventory, capacity' },
    { id: 'competition', name: 'Competitive Data', description: 'Market intelligence, competitor pricing' },
    { id: 'forecasting', name: 'Forecasting Data', description: 'Demand forecasts, predictions' },
  ];

  const RoleCard = ({ role }) => {
    const isSelected = selectedRole?.id === role.id;
    const colorMap = {
      blue: 'border-blue-300 bg-blue-50',
      purple: 'border-purple-300 bg-purple-50',
      green: 'border-green-300 bg-green-50',
      pink: 'border-pink-300 bg-pink-50',
      orange: 'border-orange-300 bg-orange-50',
      emerald: 'border-emerald-300 bg-emerald-50',
      gray: 'border-gray-300 bg-gray-50',
      indigo: 'border-indigo-300 bg-indigo-50',
    };

    return (
      <button
        onClick={() => setSelectedRole(role)}
        className={`
          w-full p-5 rounded-lg border-2 transition-all text-left
          ${isSelected 
            ? `${colorMap[role.color]} shadow-md` 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
          }
        `}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl">{role.icon}</div>
          {isSelected && (
            <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{role.title}</h3>
        <p className="text-sm text-gray-600">{role.description}</p>
      </button>
    );
  };

  const ConfigurationPanel = ({ role }) => {
    const [activeTab, setActiveTab] = useState('questions');

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{role.icon}</div>
            <div>
              <h2 className="text-2xl font-semibold text-white">{role.title}</h2>
              <p className="text-gray-300">{role.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'questions'
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Questions Access
            </button>
            <button
              onClick={() => setActiveTab('decisions')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'decisions'
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Decisions Access
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'data'
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Database className="w-4 h-4 inline mr-2" />
              Data Access
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'questions' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-900 font-medium mb-1">Configure question access</p>
                  <p className="text-blue-800">
                    Select which Cortex questions this role can ask. Users with this role will only see these questions in their interface.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {availableQuestions.map((question) => (
                  <label
                    key={question.id}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input type="checkbox" className="w-5 h-5 text-teal-600 rounded mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{question.name}</div>
                      <div className="text-sm text-gray-500">{question.category}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'decisions' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-amber-900 font-medium mb-1">Configure decision access</p>
                  <p className="text-amber-800">
                    Select which Cortex-X decisions this role can trigger or view. Decisions involve AI-powered recommendations that can affect business operations.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {availableDecisions.map((decision) => (
                  <label
                    key={decision.id}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input type="checkbox" className="w-5 h-5 text-teal-600 rounded mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{decision.name}</div>
                      <div className="text-sm text-gray-500">{decision.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-purple-900 font-medium mb-1">Configure data domain access</p>
                  <p className="text-purple-800">
                    Control which data domains this role can access. This determines what underlying data they can see in reports and analyses.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {dataDomains.map((domain) => (
                  <label
                    key={domain.id}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input type="checkbox" className="w-5 h-5 text-teal-600 rounded mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{domain.name}</div>
                      <div className="text-sm text-gray-500">{domain.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">5/6</div>
          <h1 className="text-3xl font-normal text-gray-900 mb-3">
            Configure user roles and access
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Define what each user type can see and do. Set up role-based access control (RBAC) for questions, decisions, and data domains.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8 border border-blue-200">
          <div className="flex gap-3">
            <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-blue-900 font-medium mb-1">About user roles</p>
              <p className="text-blue-800">
                Each role represents a user persona in your organization. Configure what they can access based on their job function. You can customize these defaults or add new roles later.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left: Role Selection */}
          <div className="col-span-4 space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Select a role to configure</h3>
              <div className="space-y-3">
                {userRoles.map((role) => (
                  <RoleCard key={role.id} role={role} />
                ))}
              </div>
            </div>

            {selectedRole && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions enabled:</span>
                    <span className="font-medium text-gray-900">12/15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Decisions enabled:</span>
                    <span className="font-medium text-gray-900">3/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data domains:</span>
                    <span className="font-medium text-gray-900">4/12</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Configuration Panel */}
          <div className="col-span-8">
            {selectedRole ? (
              <ConfigurationPanel role={selectedRole} />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-16 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Select a role to configure
                </h3>
                <p className="text-gray-600">
                  Choose a user role from the left panel to configure their access to questions, decisions, and data domains.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex items-center justify-between">
          <button className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Back
          </button>
          <div className="flex gap-3">
            <button className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Save as Draft
            </button>
            <button className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
              Continue to Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoleConfiguration;

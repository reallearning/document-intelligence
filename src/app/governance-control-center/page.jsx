"use client"
import React, { useState } from 'react';
import { 
  Shield, Users, Database, MessageSquare, Zap, Settings, 
  Activity, AlertTriangle, CheckCircle, Clock, Eye,
  Download, RefreshCw, Search, Filter, MoreHorizontal,
  TrendingUp, BarChart3, FileText, Circle
} from 'lucide-react';

const GovernanceControlCenter = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const systemStats = {
    totalUsers: 247,
    activeUsers: 189,
    totalQueries: 12847,
    avgResponseTime: '2.3s',
    dataSourcesConnected: 3,
    dataSourcesHealthy: 3,
    questionsEnabled: 7,
    decisionsEnabled: 6,
    totalRoles: 8,
  };

  const recentActivity = [
    { 
      id: 1, 
      user: 'Priya Sharma', 
      role: 'Buyer', 
      action: 'Executed reorder optimization for Winter 2025 collection', 
      timestamp: '2 mins ago',
      status: 'success',
      details: 'Generated reorder recommendations for 247 SKUs across 12 DCs'
    },
    { 
      id: 2, 
      user: 'Rahul Mehta', 
      role: 'Regional Manager', 
      action: 'Ran stockout prediction analysis', 
      timestamp: '8 mins ago',
      status: 'success',
      details: 'Analyzed 89 stores in North region, identified 23 high-risk SKUs'
    },
    { 
      id: 3, 
      user: 'System', 
      role: 'Admin', 
      action: 'Data sync completed - SAP S/4HANA', 
      timestamp: '12 mins ago',
      status: 'success',
      details: 'Synced 1.2M records: inventory, sales, and vendor data'
    },
    { 
      id: 4, 
      user: 'Ananya Gupta', 
      role: 'Store Manager', 
      action: 'Attempted pricing strategy decision', 
      timestamp: '18 mins ago',
      status: 'denied',
      details: 'Access denied - role does not have permission for pricing decisions'
    },
    { 
      id: 5, 
      user: 'Arjun Patel', 
      role: 'Merchandiser', 
      action: 'Modified markdown optimization parameters', 
      timestamp: '25 mins ago',
      status: 'success',
      details: 'Updated discount ladder for clearance category, 15-25% range'
    },
    { 
      id: 6, 
      user: 'Kavya Reddy', 
      role: 'Supply Chain Manager', 
      action: 'Triggered inventory movement analysis', 
      timestamp: '34 mins ago',
      status: 'success',
      details: 'Recommended 342 transfer orders between DCs to optimize stock levels'
    },
    { 
      id: 7, 
      user: 'System', 
      role: 'Admin', 
      action: 'Failed connection retry - Databricks', 
      timestamp: '45 mins ago',
      status: 'error',
      details: 'Network timeout after 30s - check Private Link configuration'
    },
    { 
      id: 8, 
      user: 'Rohan Desai', 
      role: 'Finance', 
      action: 'Exported GMROI analysis report', 
      timestamp: '1 hour ago',
      status: 'success',
      details: 'Generated quarterly GMROI report for all product categories'
    },
    { 
      id: 9, 
      user: 'Neha Kapoor', 
      role: 'Executive', 
      action: 'Viewed enterprise performance dashboard', 
      timestamp: '1 hour ago',
      status: 'success',
      details: 'Accessed consolidated KPIs across all regions and channels'
    },
    { 
      id: 10, 
      user: 'Vikram Singh', 
      role: 'Data Analyst', 
      action: 'Created custom sales analysis query', 
      timestamp: '2 hours ago',
      status: 'success',
      details: 'Built cohort analysis for customer purchase patterns by region'
    },
  ];

  const dataSourceStatus = [
    { 
      name: 'SAP S/4HANA', 
      status: 'healthy', 
      lastSync: '3 mins ago', 
      queries: 4521,
      uptime: '99.8%',
      avgLatency: '1.2s',
      description: 'Enterprise ERP system for inventory, sales, and finance data'
    },
    { 
      name: 'Databricks Lakehouse', 
      status: 'healthy', 
      lastSync: '5 mins ago', 
      queries: 3240,
      uptime: '99.9%',
      avgLatency: '0.8s',
      description: 'Unified data platform for analytics and machine learning workflows'
    },
    { 
      name: 'SQL Server', 
      status: 'healthy', 
      lastSync: '2 mins ago', 
      queries: 2156,
      uptime: '99.7%',
      avgLatency: '1.5s',
      description: 'Data warehouse for historical transactional data and reporting'
    },
  ];

  const questions = [
    { 
      id: 1, 
      name: 'Stock-out predictions (7/14/30 days)', 
      category: 'Inventory', 
      enabled: true,
      usage: 234,
      avgTime: '3.2s',
      roles: ['Store Manager', 'Regional Manager', 'Buyer']
    },
    { 
      id: 2, 
      name: 'What to reorder and how much', 
      category: 'Inventory', 
      enabled: true,
      usage: 189,
      avgTime: '2.8s',
      roles: ['Buyer', 'Supply Chain']
    },
    { 
      id: 3, 
      name: 'Slow-moving and aged inventory', 
      category: 'Inventory', 
      enabled: true,
      usage: 156,
      avgTime: '2.1s',
      roles: ['Merchandiser', 'Finance']
    },
    { 
      id: 4, 
      name: 'Optimal inventory movement between nodes', 
      category: 'Supply Chain', 
      enabled: true,
      usage: 98,
      avgTime: '4.5s',
      roles: ['Supply Chain', 'Regional Manager']
    },
    { 
      id: 5, 
      name: 'Sales performance by SKU/Store/Region', 
      category: 'Sales', 
      enabled: true,
      usage: 412,
      avgTime: '1.9s',
      roles: ['All Roles']
    },
    { 
      id: 6, 
      name: 'Pricing effectiveness and elasticity', 
      category: 'Pricing', 
      enabled: true,
      usage: 87,
      avgTime: '3.7s',
      roles: ['Merchandiser', 'Finance']
    },
    { 
      id: 7, 
      name: 'Markdown candidates and timing', 
      category: 'Pricing', 
      enabled: true,
      usage: 134,
      avgTime: '2.4s',
      roles: ['Merchandiser']
    },
    { 
      id: 8, 
      name: 'GMROI analysis by category', 
      category: 'Finance', 
      enabled: false,
      usage: 23,
      avgTime: '5.1s',
      roles: ['Finance', 'Executive']
    },
  ];

  const decisions = [
    { 
      id: 1, 
      name: 'Inventory Buy Optimization', 
      description: 'AI-powered recommendations for purchase orders: what to buy, how much, and when to optimize inventory levels',
      enabled: true,
      executions: 45,
      roles: ['Buyer']
    },
    { 
      id: 2, 
      name: 'Safety Stock Levels', 
      description: 'Dynamic safety stock calculations by SKU and location to minimize stockouts while reducing excess inventory',
      enabled: true,
      executions: 38,
      roles: ['Buyer', 'Supply Chain']
    },
    { 
      id: 3, 
      name: 'Reorder Point Optimization', 
      description: 'Intelligent reorder triggers based on demand patterns, lead times, and seasonality factors',
      enabled: true,
      executions: 52,
      roles: ['Buyer']
    },
    { 
      id: 4, 
      name: 'Inventory Movement', 
      description: 'Automated transfer recommendations between stores and distribution centers to balance stock levels',
      enabled: true,
      executions: 67,
      roles: ['Supply Chain', 'Regional Manager']
    },
    { 
      id: 5, 
      name: 'Pricing Strategy', 
      description: 'Optimal pricing recommendations by SKU and channel based on demand elasticity and competitive positioning',
      enabled: true,
      executions: 29,
      roles: ['Merchandiser']
    },
    { 
      id: 6, 
      name: 'Markdown Optimization', 
      description: 'Strategic markdown timing and depth recommendations to maximize clearance revenue and minimize waste',
      enabled: true,
      executions: 41,
      roles: ['Merchandiser']
    },
    { 
      id: 7, 
      name: 'Liquidation Strategy', 
      description: 'Channel and pricing strategies for aged inventory to optimize recovery rates',
      enabled: false,
      executions: 12,
      roles: ['Merchandiser', 'Finance']
    },
  ];

  const roleAccessSummary = [
    { role: 'Store Manager', users: 89, questions: 8, decisions: 0, lastActive: '2 mins ago' },
    { role: 'Regional Manager', users: 24, questions: 12, decisions: 2, lastActive: '5 mins ago' },
    { role: 'Buyer/Planner', users: 15, questions: 14, decisions: 5, lastActive: '1 min ago' },
    { role: 'Merchandiser', users: 12, questions: 13, decisions: 4, lastActive: '8 mins ago' },
    { role: 'Supply Chain', users: 8, questions: 11, decisions: 4, lastActive: '15 mins ago' },
    { role: 'Finance/CFO', users: 6, questions: 10, decisions: 3, lastActive: '30 mins ago' },
    { role: 'Executive', users: 4, questions: 43, decisions: 0, lastActive: '1 hour ago' },
    { role: 'Data Analyst', users: 3, questions: 43, decisions: 0, lastActive: '10 mins ago' },
  ];

  const OverviewSection = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp className="w-3.5 h-3.5" />
              12%
            </div>
          </div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{systemStats.activeUsers}</div>
          <div className="text-sm text-gray-600">Active Users</div>
          <div className="text-xs text-gray-500 mt-1">of {systemStats.totalUsers} total users</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-purple-50 rounded-xl">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600">
              <TrendingUp className="w-3.5 h-3.5" />
              8%
            </div>
          </div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{systemStats.totalQueries.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Queries</div>
          <div className="text-xs text-gray-500 mt-1">last 30 days</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-green-50 rounded-xl">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600">
              <CheckCircle className="w-3.5 h-3.5" />
              Good
            </div>
          </div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{systemStats.avgResponseTime}</div>
          <div className="text-sm text-gray-600">Avg Response</div>
          <div className="text-xs text-gray-500 mt-1">target: &lt;3s</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-teal-50 rounded-xl">
              <Database className="w-5 h-5 text-teal-600" />
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-green-600">
              <CheckCircle className="w-3.5 h-3.5" />
              Healthy
            </div>
          </div>
          <div className="text-3xl font-semibold text-gray-900 mb-1">{systemStats.dataSourcesHealthy}/{systemStats.dataSourcesConnected}</div>
          <div className="text-sm text-gray-600">Data Sources</div>
          <div className="text-xs text-gray-500 mt-1">100% uptime</div>
        </div>
      </div>

      {/* System Summary */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Questions</div>
              <div className="text-xs text-gray-500">Cortex Analytics</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-semibold text-gray-900">{questions.filter(q => q.enabled).length}</span>
                <span className="text-sm text-gray-500">/ {questions.length} enabled</span>
              </div>
              <div className="text-xs text-gray-600">412 queries today</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-purple-50 rounded-xl">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Decisions</div>
              <div className="text-xs text-gray-500">Cortex-X Optimization</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-semibold text-gray-900">{decisions.filter(d => d.enabled).length}</span>
                <span className="text-sm text-gray-500">/ {decisions.length} active</span>
              </div>
              <div className="text-xs text-gray-600">67 executions today</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-teal-50 rounded-xl">
              <Users className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">User Roles</div>
              <div className="text-xs text-gray-500">Access Control</div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-semibold text-gray-900">{roleAccessSummary.length}</span>
                <span className="text-sm text-gray-500">configured roles</span>
              </div>
              <div className="text-xs text-gray-600">{systemStats.activeUsers} active users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
              <p className="text-sm text-gray-500 mt-0.5">Live system and user events</p>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              View all →
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.slice(0, 5).map((activity) => (
            <div key={activity.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-green-50' :
                  activity.status === 'denied' ? 'bg-amber-50' : 'bg-red-50'
                }`}>
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-4.5 h-4.5 text-green-600" />
                  ) : activity.status === 'denied' ? (
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
                  ) : (
                    <AlertTriangle className="w-4.5 h-4.5 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{activity.user}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{activity.role}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-1">{activity.action}</div>
                  <div className="text-xs text-gray-500">{activity.details}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DataSourcesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Data Sources</h2>
          <p className="text-sm text-gray-500 mt-1">Monitor and manage connected systems</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Sync All
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#0c2c18] hover:bg-[#0c2c18]/90 rounded-lg transition-colors">
            <Database className="w-4 h-4 inline mr-2" />
            Add Source
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {dataSourceStatus.map((source, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <Database className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold text-gray-900">{source.name}</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                      <Circle className="w-2 h-2 fill-current" />
                      Healthy
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{source.description}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-xs text-gray-600 mb-1">Uptime</div>
                <div className="text-lg font-semibold text-gray-900">{source.uptime}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-xs text-gray-600 mb-1">Latency</div>
                <div className="text-lg font-semibold text-gray-900">{source.avgLatency}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-xs text-gray-600 mb-1">Queries</div>
                <div className="text-lg font-semibold text-gray-900">{source.queries.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-xs text-gray-600 mb-1">Last Sync</div>
                <div className="text-lg font-semibold text-gray-900">{source.lastSync}</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                Configure
              </button>
              <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                View Logs
              </button>
              <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                Test Connection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const QuestionsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
          <p className="text-sm text-gray-500 mt-1">Manage Cortex analytics questions and permissions</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 inline mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#0c2c18] hover:bg-[#0c2c18]/90 rounded-lg transition-colors">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Add Question
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Question</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Category</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Usage</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Performance</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Access</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {questions.map((question) => (
              <tr key={question.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{question.name}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
                    {question.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md ${
                    question.enabled 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Circle className="w-2 h-2 fill-current" />
                    {question.enabled ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{question.usage}</div>
                  <div className="text-xs text-gray-500">last 30d</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{question.avgTime}</td>
                <td className="px-6 py-4">
                  <div className="text-xs text-gray-600">{question.roles.join(', ')}</div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const DecisionsSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Decisions</h2>
          <p className="text-sm text-gray-500 mt-1">Manage Cortex-X decision engines and optimization models</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 inline mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-[#0c2c18] hover:bg-[#0c2c18]/90 rounded-lg transition-colors">
            <Zap className="w-4 h-4 inline mr-2" />
            Add Decision
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {decisions.map((decision) => (
          <div key={decision.id} className={`bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm transition-all ${
            !decision.enabled && 'opacity-60'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-3 rounded-xl ${
                  decision.enabled ? 'bg-purple-50' : 'bg-gray-100'
                }`}>
                  <Zap className={`w-6 h-6 ${decision.enabled ? 'text-purple-600' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold text-gray-900">{decision.name}</h3>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                      decision.enabled 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Circle className="w-2 h-2 fill-current" />
                      {decision.enabled ? 'Active' : 'Disabled'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{decision.description}</p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Activity className="w-4 h-4" />
                      <span>{decision.executions} executions</span>
                    </div>
                    <div className="text-gray-500">
                      {decision.roles.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                  Configure
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RolesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Roles & Access</h2>
          <p className="text-sm text-gray-500 mt-1">Configure user roles and permissions</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-[#0c2c18] hover:bg-[#0c2c18]/90 rounded-lg transition-colors">
          <Users className="w-4 h-4 inline mr-2" />
          Create Role
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Role</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Users</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Questions</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Decisions</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Last Active</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {roleAccessSummary.map((role, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{role.role}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{role.users}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{role.questions}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{role.decisions}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{role.lastActive}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-sm text-gray-700 hover:text-gray-900 font-medium">
                      Edit
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const AuditSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Audit Log</h2>
          <p className="text-sm text-gray-500 mt-1">Complete history of system activities</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-64"
            />
          </div>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 inline mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 inline mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="divide-y divide-gray-100">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-green-50' :
                  activity.status === 'denied' ? 'bg-amber-50' : 'bg-red-50'
                }`}>
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-4.5 h-4.5 text-green-600" />
                  ) : activity.status === 'denied' ? (
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-600" />
                  ) : (
                    <AlertTriangle className="w-4.5 h-4.5 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-medium text-gray-900">{activity.user}</span>
                    <span className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                      {activity.role}
                    </span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                  <div className="text-sm text-gray-700 font-medium mb-2">{activity.action}</div>
                  <div className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{activity.details}</div>
                </div>
                <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[#0c2c18] rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Governance</h1>
                <p className="text-sm text-gray-500">Control center for your Cortex deployment</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-4 h-4 inline mr-2" />
                Export
              </button>
              <button className="p-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'data-sources', label: 'Data Sources', icon: Database },
              { id: 'questions', label: 'Questions', icon: MessageSquare },
              { id: 'decisions', label: 'Decisions', icon: Zap },
              { id: 'roles', label: 'Roles', icon: Users },
              { id: 'audit', label: 'Audit Log', icon: Eye },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeSection === id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'data-sources' && <DataSourcesSection />}
        {activeSection === 'questions' && <QuestionsSection />}
        {activeSection === 'decisions' && <DecisionsSection />}
        {activeSection === 'roles' && <RolesSection />}
        {activeSection === 'audit' && <AuditSection />}
      </div>
    </div>
  );
};

export default GovernanceControlCenter;

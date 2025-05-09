"use client"
import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Activity,
  Users,
  Calendar,
  TrendingUp,
  MousePointer,
  Zap,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  BarChart4,
  Shield,
  FileText,
  Globe,
} from "lucide-react";

export default function InfrastructureInsightsDashboard() {
  const [selectedProject, setSelectedProject] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("financial");

  const [activeInsightDetail, setActiveInsightDetail] = useState(null);
  const [showDetailReport, setShowDetailReport] = useState(false);

  // Sample data for demonstration
  const projects = [
    { id: "p1", name: "Coastal Highway Extension" },
    { id: "p2", name: "Metro Line B Expansion" },
    { id: "p3", name: "Airport Terminal C" },
    { id: "p4", name: "Downtown Bridge Renovation" },
  ];

  // Categories of insights a leader would care about
  const insightCategories = [
    {
      id: "financial",
      name: "Financial Health",
      icon: <DollarSign size={20} />,
    },
    {
      id: "schedule",
      name: "Schedule & Timeline",
      icon: <Calendar size={20} />,
    },
    {
      id: "resources",
      name: "Resource Optimization",
      icon: <Users size={20} />,
    },
    { id: "risk", name: "Risk Management", icon: <Activity size={20} /> },
    {
      id: "compliance",
      name: "Compliance & Governance",
      icon: <Shield size={20} />,
    },
  ];

  // Insights by category
  const insightsByCategory = {
    financial: [
      {
        id: 1,
        type: "critical",
        title: "Budget Risk Detected",
        description:
          "I've analyzed the spending patterns for Metro Line B and noticed a concerning trend. The material costs are accelerating at 18% while schedule completion is only at 12%. Based on my projections, this will lead to a ₹2.4Cr budget overrun by Q3 if we don't take action now.",
        action:
          "I recommend reviewing and renegotiating the supplier contracts with a focus on material pricing variance. The current terms lack sufficient protection against market fluctuations.",
        impact: "₹2.4Cr savings opportunity",
        time: "12 min ago",
      },
      {
        id: 5,
        type: "insight",
        title: "Cash Flow Optimization",
        description:
          "I've identified a misalignment between your payment schedules and project milestone completions. This is creating a significant cash flow gap of approximately ₹6.8Cr that will impact your Q3 financial position. The pattern appears across multiple vendors but is most pronounced with your top 3 suppliers.",
        action:
          "Let me help you restructure the payment milestones with your top 3 vendors to better align with actual delivery timelines. I've drafted templates based on successful negotiations from your previous projects.",
        impact: "Improve quarterly cash position by ₹4.2Cr",
        time: "2 hrs ago",
      },
      {
        id: 9,
        type: "opportunity",
        title: "Cost Efficiency Pattern",
        description:
          "Something interesting caught my attention when comparing your projects: Airport Terminal C is consistently delivering 8% better cost efficiency on similar work packages compared to your other active projects. I've analyzed the procurement approach and identified specific strategies you could replicate.",
        action:
          "I suggest applying the successful procurement strategy from Airport Terminal C across your other active projects. The key differences appear to be in bulk ordering timing and vendor selection criteria.",
        impact: "Potential ₹3.6Cr savings across portfolio",
        time: "3 hrs ago",
      },
    ],
    schedule: [
      {
        id: 3,
        type: "warning",
        title: "Schedule Risk Identified",
        description:
          "I notice that the critical path for the Coastal Highway's 'Foundation Complete' milestone is showing a 14-day variance from baseline. After analyzing the dependencies, I've found that approval delays and subcontractor coordination issues are the primary causes. Without intervention, this will cascade to later milestones.",
        action:
          "I recommend reviewing the subcontractor dependencies and implementing a fast-track approval process. I've identified 3 specific approval bottlenecks that need immediate attention.",
        impact: "Prevent 23-day project delay",
        time: "41 min ago",
      },
      {
        id: 7,
        type: "insight",
        title: "Timeline Optimization",
        description:
          "I've discovered an opportunity to optimize your timeline by adjusting the sequencing of work packages. The Metro Line electrical and mechanical installations currently planned sequentially could be partially overlapped. My analysis of resource availability shows this is feasible without additional staffing.",
        action:
          "Consider revising the sequence of work packages with lead contractors. I've prepared a draft revision that maintains all safety protocols while allowing for concurrent execution of compatible activities.",
        impact: "Potential 18-day acceleration in completion",
        time: "4 hrs ago",
      },
    ],
    resources: [
      {
        id: 2,
        type: "opportunity",
        title: "Resource Optimization",
        description:
          "I've been tracking your heavy equipment utilization at the Airport Terminal site and found it's running at 32% below optimal capacity. This is costing approximately ₹85,000/day in idle equipment charges. Meanwhile, your Downtown Bridge project has a shortage that's causing delays in earthwork.",
        action:
          "I suggest reallocating 3 specific excavators from the Airport Terminal to the Downtown Bridge project, or returning them to the vendor to avoid unnecessary costs. I've mapped out the logistics and timing to minimize transition impact.",
        impact: "₹1.7Cr quarterly savings",
        time: "28 min ago",
      },
      {
        id: 8,
        type: "warning",
        title: "Labor Resource Gap",
        description:
          "I've projected your skilled labor needs across all projects and identified a critical shortage of metalwork specialists for weeks 28-32. This gap affects all projects simultaneously due to overlapping key activities. Your current staffing plan doesn't account for this peak demand period.",
        action:
          "You'll need to either adjust the project scheduling to distribute the demand more evenly or secure 8 additional skilled workers for this period. I've identified three trusted subcontractors with availability during this timeframe.",
        impact: "Prevent 3-week delay in Downtown Bridge",
        time: "1 day ago",
      },
    ],
    risk: [
      {
        id: 10,
        type: "critical",
        title: "Geotechnical Risk Emerging",
        description:
          "I've analyzed the recent soil testing data from Section B of the Coastal Highway and compared it with the initial assessment. There's a significant discrepancy showing unstable conditions that weren't accounted for in the current foundation design. This represents a major risk to structural integrity.",
        action:
          "I recommend immediately convening your engineering team to update the foundation design based on the new soil data. I've highlighted the specific parameters that need revision and estimated the design impact.",
        impact: "Mitigate potential ₹7.2Cr remediation cost",
        time: "30 min ago",
      },
      {
        id: 11,
        type: "warning",
        title: "Weather Impact Pattern",
        description:
          "Based on my analysis of meteorological forecasts and historical weather patterns, I'm seeing indicators that the monsoon season will likely start 2 weeks earlier than the historical average this year. This will impact all outdoor activities across your projects, particularly earthwork and concrete pouring.",
        action:
          "I suggest accelerating critical outdoor activities in Q2 across all projects. I've created a prioritized list of activities that should be rescheduled to avoid weather-related delays and quality issues.",
        impact: "Prevent 4-week cumulative delay",
        time: "5 hrs ago",
      },
    ],
    compliance: [
      {
        id: 4,
        type: "critical",
        title: "Compliance Gap Detected",
        description:
          "In reviewing your regulatory documentation, I found that the environmental impact assessments for the Downtown Bridge are missing 3 required documents needed for the upcoming regulatory review on May 20. Without these, approval will be delayed, impacting your entire timeline and potentially triggering penalties.",
        action:
          "I recommend expediting the missing documentation from your environmental team. I've prepared templates based on previously approved submissions to accelerate the process and highlighted the specific requirements that need to be addressed.",
        impact: "Avoid ₹50L penalty and 2-month delay",
        time: "1 hr ago",
      },
      {
        id: 12,
        type: "warning",
        title: "Permit Expiration Risk",
        description:
          "I noticed that your construction permits for Airport Terminal Section C will expire in 45 days, but the renewal process requires a minimum 30-day processing time. Based on historical processing times in this jurisdiction, waiting until the last minute creates significant risk of work stoppage.",
        action:
          "I strongly recommend initiating the permit renewal process immediately. I've prepared a checklist of required documentation and highlighted changes in submission requirements since your last renewal that you'll need to address.",
        impact: "Prevent work stoppage and ₹40L daily penalties",
        time: "6 hrs ago",
      },
    ],
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case "critical":
        return <AlertTriangle size={20} className="text-rose-500" />;
      case "warning":
        return <AlertCircle size={20} className="text-amber-500" />;
      case "opportunity":
        return <TrendingUp size={20} className="text-emerald-500" />;
      case "insight":
        return <Zap size={20} className="text-blue-500" />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  // Get current insights based on active tab
  const currentInsights = insightsByCategory[activeTab] || [];

  return (
    <div className="bg-white text-gray-900 h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mr-4 p-1 rounded-full hover:bg-gray-100 lg:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-2 rounded-lg mr-3">
              <Zap size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
              Questt AI
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 pr-8 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-3 text-gray-400"
            />
          </div>

          <div className="bg-gray-50 text-indigo-600 border border-gray-200 rounded-full px-3 py-1 text-sm font-medium flex items-center">
            <Clock size={14} className="mr-1" />
            <span>Live insights</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - only visible on larger screens */}
        <aside
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:block w-64 border-r border-gray-100 bg-white h-screen fixed lg:static z-10`}
        >
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Navigation
            </h2>
            <nav>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 text-indigo-600 bg-indigo-50 rounded-lg font-medium"
                  >
                    <Zap size={18} className="mr-3" />
                    <span>AI Insights</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                  >
                    <BarChart4 size={18} className="mr-3" />
                    <span>Portfolio Overview</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                  >
                    <FileText size={18} className="mr-3" />
                    <span>Reports</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                  >
                    <Globe size={18} className="mr-3" />
                    <span>Data Explorer</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 h-[90vh] overflow-y-auto">
          {/* AI Assistant Header */}
          <div className="mb-6 bg-white p-5 rounded-xl border border-gray-100 shadow-md">
            <div className="flex items-start">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-2 rounded-lg">
                <Zap size={24} className="text-white" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  Hello, Vikram
                </h2>
                <p className="text-gray-600">
                  I've analyzed your infrastructure projects and found some
                  critical insights that need your attention. Based on my
                  analysis of your project data, there are{" "}
                  <span className="font-medium text-indigo-600">
                    8 high-priority items
                  </span>{" "}
                  that require decision-making today. Let me walk you through
                  what I've discovered:
                </p>
              </div>
            </div>
          </div>

          {/* Insight Category Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-1 overflow-x-auto">
              {insightCategories.map((category) => (
                <button
                  key={category.id}
                  className={`flex items-center px-4 py-3 whitespace-nowrap font-medium rounded-t-lg ${
                    activeTab === category.id
                      ? "text-indigo-600 border-b-2 border-indigo-500 bg-white"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Insights Feed */}
          <div className="mb-6">
            <div className="space-y-4">
              {currentInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="mt-1">{getInsightIcon(insight.type)}</div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {insight.title}
                        </h3>
                        <span className="text-sm text-gray-400">
                          {insight.time}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">
                        {insight.description}
                      </p>

                      <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center">
                          <MousePointer
                            size={16}
                            className="text-indigo-600 mr-2"
                          />
                          <span className="font-medium text-gray-800">
                            Recommended Action:
                          </span>
                        </div>
                        <p className="mt-1 text-gray-600">{insight.action}</p>
                        <div className="mt-2 flex items-center">
                          <TrendingUp
                            size={16}
                            className="text-emerald-600 mr-2"
                          />
                          <span className="font-medium text-emerald-600">
                            Potential Impact: {insight.impact}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-end">
                        <button
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mr-3"
                          onClick={() => {
                            setActiveInsightDetail(insight);
                            setShowDetailReport(true);
                          }}
                        >
                          View Details
                        </button>
                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center">
                          Take Action
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ask AI Section */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-md">
            <div className="flex">
              <input
                type="text"
                placeholder="Ask me anything about your projects or infrastructure data..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400"
              />
              <button className="ml-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg flex items-center font-medium">
                <Zap size={18} className="mr-2" />
                Ask Me
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Try: "What actions will have the biggest impact on our budget?" or
              "How can we prevent delays in the Metro project?"
            </div>
          </div>

          {/* Detailed Report Modal */}
          {showDetailReport && activeInsightDetail && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    Detailed Analysis: {activeInsightDetail.title}
                  </h2>
                  <button
                    onClick={() => setShowDetailReport(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6">
                  {/* Summary Section */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      {getInsightIcon(activeInsightDetail.type)}
                      <h3 className="text-xl font-semibold ml-2">
                        Executive Summary
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Our AI has detected a significant budget risk on the Metro
                      Line B project. Current spending patterns indicate an 18%
                      acceleration in materials costs against only 12% schedule
                      completion. Without intervention, this will result in a
                      projected ₹2.4Cr overrun by Q3.
                    </p>

                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                      <h4 className="font-medium text-indigo-800 mb-2">
                        Key Findings:
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="mt-1 mr-2 text-indigo-500">
                            <TrendingUp size={16} />
                          </div>
                          <span>
                            Material costs growing at{" "}
                            <span className="font-medium">18%</span> vs. planned{" "}
                            <span className="font-medium">13%</span>
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="mt-1 mr-2 text-indigo-500">
                            <Calendar size={16} />
                          </div>
                          <span>
                            Schedule completion at{" "}
                            <span className="font-medium">12%</span> (6 weeks
                            behind plan)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="mt-1 mr-2 text-indigo-500">
                            <AlertCircle size={16} />
                          </div>
                          <span>
                            Projected overrun:{" "}
                            <span className="font-medium text-rose-600">
                              ₹2.4Cr
                            </span>{" "}
                            by Q3
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Data Visualization */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Spend vs. Schedule Analysis
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                        {/* This would be a chart in a real implementation */}
                        <div className="text-center">
                          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-4 w-64 rounded-full mb-2"></div>
                          <div className="text-sm text-gray-500">
                            Chart: Material Spend vs. Schedule Progress (Last 3
                            Months)
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">
                          Materials Budget
                        </h4>
                        <div className="text-2xl font-bold">₹13.4Cr</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Total Allocation
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">
                          Current Spend
                        </h4>
                        <div className="text-2xl font-bold">₹4.2Cr</div>
                        <div className="text-sm text-rose-500 mt-1">
                          31.3% of budget (18% over plan)
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">
                          Completion Rate
                        </h4>
                        <div className="text-2xl font-bold">12%</div>
                        <div className="text-sm text-amber-500 mt-1">
                          6 weeks behind schedule
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Root Cause Analysis */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">
                      My Analysis of Root Causes
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-600 mb-4">
                        After digging deep into your contract data, procurement
                        records, and construction logs, I've identified three
                        primary factors contributing to the budget variance:
                      </p>

                      <table className="w-full border-collapse mb-4">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                              Factor
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                              Impact
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                              Details
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-3 border-b border-gray-100 font-medium">
                              Steel Price Volatility
                            </td>
                            <td className="px-4 py-3 border-b border-gray-100 text-rose-500">
                              +9.2%
                            </td>
                            <td className="px-4 py-3 border-b border-gray-100 text-gray-600">
                              Steel prices have increased 22% since contract
                              signing without corresponding escalation clauses
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 border-b border-gray-100 font-medium">
                              Procurement Timing
                            </td>
                            <td className="px-4 py-3 border-b border-gray-100 text-rose-500">
                              +5.4%
                            </td>
                            <td className="px-4 py-3 border-b border-gray-100 text-gray-600">
                              Materials ordered ahead of schedule, increasing
                              carrying costs and storage requirements
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 border-b border-gray-100 font-medium">
                              Specification Changes
                            </td>
                            <td className="px-4 py-3 border-b border-gray-100 text-rose-500">
                              +3.4%
                            </td>
                            <td className="px-4 py-3 border-b border-gray-100 text-gray-600">
                              Mid-project changes to material specifications led
                              to wastage and rework
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="flex items-start bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <AlertCircle
                          size={20}
                          className="text-amber-500 mt-0.5 mr-2 flex-shrink-0"
                        />
                        <div>
                          <span className="font-medium text-amber-800">
                            I've spotted a pattern:
                          </span>
                          <span className="text-amber-700">
                            {" "}
                            I noticed similar issues occurred in the Downtown
                            Bridge project last year, resulting in a 15%
                            overrun. We can learn from that experience.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">
                      My Recommendations
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                        <h4 className="font-medium text-emerald-800 flex items-center mb-2">
                          <CheckCircle size={16} className="mr-2" />
                          <span>What I Recommend Most Strongly</span>
                        </h4>
                        <p className="text-gray-700 mb-3">
                          I suggest you review and renegotiate supplier
                          contracts for material pricing variance. Focus
                          specifically on implementing escalation clauses with
                          caps and volume-based discounts. I've seen this
                          approach work well in similar situations with other
                          clients.
                        </p>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200">
                          <div>
                            <span className="font-medium">
                              Potential Impact:
                            </span>
                            <span className="text-emerald-600 font-medium ml-2">
                              ₹2.4Cr savings opportunity
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">
                              Implementation Difficulty:
                            </span>
                            <span className="text-amber-500 font-medium ml-2">
                              Medium
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">
                            Alternative Action 1
                          </h4>
                          <p className="text-gray-600 text-sm mb-3">
                            Optimize procurement timing and storage costs by
                            aligning material deliveries with construction
                            schedule.
                          </p>
                          <div className="text-xs text-gray-500 flex justify-between">
                            <span>
                              Impact:{" "}
                              <span className="text-emerald-600 font-medium">
                                ₹0.9Cr savings
                              </span>
                            </span>
                            <span>
                              Difficulty:{" "}
                              <span className="text-emerald-500 font-medium">
                                Low
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">
                            Alternative Action 2
                          </h4>
                          <p className="text-gray-600 text-sm mb-3">
                            Implement stricter change control process for
                            material specifications to minimize wastage and
                            rework.
                          </p>
                          <div className="text-xs text-gray-500 flex justify-between">
                            <span>
                              Impact:{" "}
                              <span className="text-emerald-600 font-medium">
                                ₹0.8Cr savings
                              </span>
                            </span>
                            <span>
                              Difficulty:{" "}
                              <span className="text-amber-500 font-medium">
                                Medium
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Plan */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Your Action Plan
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-600 mb-4">
                        Here's what I suggest you do next, based on my analysis:
                      </p>
                      <ol className="space-y-4">
                        <li className="flex">
                          <div className="flex-shrink-0 bg-indigo-100 text-indigo-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3">
                            1
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              Schedule contract review meeting with top 3
                              suppliers
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Meet with ABC Steel, XYZ Concrete, and Global
                              Composites to discuss pricing structure
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Suggested Timeline: Within 7 days
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 bg-indigo-100 text-indigo-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3">
                            2
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              Draft revised contract terms with escalation
                              clauses
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Work with legal team to prepare contract
                              amendments with appropriate caps and triggers
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Suggested Timeline: Within 14 days
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="flex-shrink-0 bg-indigo-100 text-indigo-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3">
                            3
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              Analyze inventory and adjust procurement schedule
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              Align deliveries with just-in-time requirements to
                              reduce storage costs
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Suggested Timeline: Within 21 days
                            </p>
                          </div>
                        </li>
                      </ol>

                      <div className="mt-6 flex justify-end">
                        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium mr-3">
                          Download Report
                        </button>
                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                          Implement Recommendations
                          <ChevronRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

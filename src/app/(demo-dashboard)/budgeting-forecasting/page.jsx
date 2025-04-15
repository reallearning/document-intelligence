"use client";
import React, { useState } from "react";
import {
  Calendar,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  PieChart,
  ArrowUp,
  ArrowDown,
  Clock,
  Zap,
  FileText,
  Layers,
  Settings,
  Briefcase,
  Users,
  ChevronRight,
  Upload,
  Check,
  Sliders,
  Database,
  Filter,
  Edit,
  Save,
  Plus,
  Trash,
  Copy,
  FileCheck,
  MessageCircle,
  Paperclip,
  HelpCircle,
  ChevronDown,
  GitMerge,
  Activity,
  Server,
  Target,
  Percent,
  Award,
  CreditCard,
  BarChart2,
  Shuffle,
  Globe,
  Grid,
  RefreshCw,
  HardDrive,
  Truck,
  Package,
} from "lucide-react";

const Badge = ({ children, variant }) => {
  const variants = {
    red: "bg-red-100 text-red-800",
    orange: "bg-orange-100 text-orange-800",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full ${
        variants[variant] || variants.blue
      }`}
    >
      {children}
    </span>
  );
};

const ProgressBar = ({ percent, label, variant = "blue" }) => {
  const variants = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
    blue: "bg-blue-600",
    purple: "bg-purple-500",
    gray: "bg-gray-500",
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${variants[variant]} h-2 rounded-full`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

const DepartmentCard = ({ name, progress, status, deadline, icon }) => {
  const Icon = icon;
  const statusColors = {
    Submitted: "green",
    "In Progress": "blue",
    "Not Started": "gray",
    Review: "orange",
    "Needs Revision": "red",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center mb-3">
        <div className="p-2 rounded-full bg-blue-50 text-blue-500 mr-3">
          <Icon size={18} />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{name}</h3>
          <div className="flex items-center mt-1">
            <Badge variant={statusColors[status]}>{status}</Badge>
            <span className="text-xs text-gray-500 ml-2">Due: {deadline}</span>
          </div>
        </div>
      </div>

      <ProgressBar percent={progress} variant={statusColors[status]} />

      <div className="flex justify-end mt-2">
        <button className="text-xs text-blue-600 font-medium hover:text-blue-800">
          View Details
        </button>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, change, changeType, icon }) => {
  const Icon = icon;
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 rounded-full bg-blue-50 text-blue-500">
          <Icon size={16} />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      {change && (
        <div
          className={`flex items-center mt-2 text-sm ${
            changeType === "positive" ? "text-green-600" : "text-red-600"
          }`}
        >
          {changeType === "positive" ? (
            <ArrowUp size={14} className="mr-1" />
          ) : (
            <ArrowDown size={14} className="mr-1" />
          )}
          <span>{change}</span>
        </div>
      )}
    </div>
  );
};

const SimulationCard = ({ title, description, probability, impact, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = icon;

  return (
    <div className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="p-2 rounded-full bg-blue-50 text-blue-500 mr-3">
            <Icon size={18} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <div className="flex space-x-2">
                <Badge variant="blue">{probability} probability</Badge>
                <Badge
                  variant={
                    impact.includes("+")
                      ? "green"
                      : impact.includes("-")
                      ? "red"
                      : "gray"
                  }
                >
                  {impact}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>

        <button
          className={`mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide Details" : "Show Details"}
          <ChevronDown
            size={16}
            className={`ml-1 transition-transform duration-200 ${
              isExpanded ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">
                  Key Drivers
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Market Growth</span>
                    <span className="font-medium">5.2%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Inflation</span>
                    <span className="font-medium">2.8%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Foreign Exchange</span>
                    <span className="font-medium">±2%</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-medium text-gray-600 mb-2">
                  Departmental Variance
                </h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sales & Marketing</span>
                    <span className="font-medium text-green-600">+7.2%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Operations</span>
                    <span className="font-medium text-green-600">+4.5%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">R&D</span>
                    <span className="font-medium text-red-600">-2.1%</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-medium">AI Insight:</span> This scenario
                shows strong resilience in Sales & Marketing performance, while
                R&D may require additional resources or expectation adjustment.
                Overall company performance remains robust with acceptable
                deviation from base case.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AssumptionCard = ({ category, assumptions }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
      <div
        className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-medium text-gray-800">{category}</h3>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        />
      </div>

      {isExpanded && (
        <div className="p-4 pt-0 border-t border-gray-200">
          <div className="mt-3 space-y-4">
            {assumptions.map((assumption, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {assumption.name}
                  </span>
                  <Badge variant="blue">{assumption.source}</Badge>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  {assumption.description}
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Previous: {assumption.previous}
                  </span>
                  <span className="font-medium">{assumption.current}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ConsolidationIssueCard = ({
  title,
  description,
  severity,
  departments,
  recommendations,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const severityColors = {
    Critical: "red",
    High: "orange",
    Medium: "blue",
    Low: "gray",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm mb-3 overflow-hidden border-l-4 border-l-${severityColors[severity]}-500`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div
            className={`p-2 rounded-full bg-${severityColors[severity]}-50 text-${severityColors[severity]}-500 mr-3`}
          >
            <AlertTriangle size={18} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <Badge variant={severityColors[severity]}>{severity}</Badge>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
            <div className="flex flex-wrap mt-2">
              {departments.map((dept, index) => (
                <Badge key={index} variant="gray" className="mr-1 mb-1">
                  {dept}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <button
          className={`mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide Recommendations" : "Show Recommendations"}
          <ChevronDown
            size={16}
            className={`ml-1 transition-transform duration-200 ${
              isExpanded ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              AI Recommendations:
            </h4>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-5 w-5 rounded-full border border-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const CompanyBudgetDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-gray-50 h-screen overflow-y-auto">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">AvaRetail</h1>
            <p className="text-sm text-gray-500">FY2025 Budget Creation Hub</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Badge variant="blue">CFO First Cut</Badge>
              <Badge variant="green">3,850 Simulations</Badge>
              <Badge variant="orange">45 Days Remaining</Badge>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200">
                Export Budget Book
              </button>
              <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                Executive Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Budget Overview
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "departments"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("departments")}
            >
              Department Submissions
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "consolidation"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("consolidation")}
            >
              Budget Consolidation
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "simulations"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("simulations")}
            >
              Scenario Simulations
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "assumptions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("assumptions")}
            >
              Global Assumptions
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "review"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("review")}
            >
              Review & Approval
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        {/* Budget Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <BarChart3 size={20} className="mr-2 text-gray-700" /> FY2025
                  Budget Status
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 flex items-center">
                    <Clock size={16} className="mr-2" />
                    Timeline
                  </button>
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center">
                    <TrendingUp size={16} className="mr-2" />
                    Financial Summary
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Budget Creation Progress
                  </h3>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Overall Progress</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: "65%" }}
                      ></div>
                    </div>

                    <div className="grid grid-cols-4 mt-3">
                      <div className="text-center">
                        <div className="inline-block w-3 h-3 rounded-full bg-green-500 mb-1"></div>
                        <div className="text-xs">
                          Department
                          <br />
                          Submissions
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="inline-block w-3 h-3 rounded-full bg-blue-500 mb-1"></div>
                        <div className="text-xs">
                          Consolidation
                          <br />& Review
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="inline-block w-3 h-3 rounded-full bg-gray-300 mb-1"></div>
                        <div className="text-xs">
                          Executive
                          <br />
                          Approval
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="inline-block w-3 h-3 rounded-full bg-gray-300 mb-1"></div>
                        <div className="text-xs">
                          Board
                          <br />
                          Review
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <ProgressBar
                      percent={85}
                      label="Department Submissions"
                      variant="green"
                    />
                    <ProgressBar
                      percent={60}
                      label="Budget Consolidation"
                      variant="blue"
                    />
                    <ProgressBar
                      percent={45}
                      label="Financial Review"
                      variant="blue"
                    />
                    <ProgressBar
                      percent={0}
                      label="Executive Approval"
                      variant="gray"
                    />
                    <ProgressBar
                      percent={0}
                      label="Board Presentation"
                      variant="gray"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Key Metrics & Timeline
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs text-blue-500 uppercase font-semibold mb-1">
                        Departments
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-2xl font-bold text-blue-700">
                          9/12
                        </div>
                        <div className="text-xs text-blue-600">Submitted</div>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-xs text-green-500 uppercase font-semibold mb-1">
                        Simulations
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-2xl font-bold text-green-700">
                          3,850
                        </div>
                        <div className="text-xs text-green-600">Completed</div>
                      </div>
                    </div>

                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-xs text-orange-500 uppercase font-semibold mb-1">
                        Issues
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-2xl font-bold text-orange-700">
                          14
                        </div>
                        <div className="text-xs text-orange-600">
                          To Resolve
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-xs text-purple-500 uppercase font-semibold mb-1">
                        Time Left
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-2xl font-bold text-purple-700">
                          45
                        </div>
                        <div className="text-xs text-purple-600">Days</div>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xs font-medium text-gray-600 mb-2">
                    Key Dates
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Department Submissions
                      </span>
                      <span className="font-medium">April 30, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Budget Consolidation
                      </span>
                      <span className="font-medium">May 15, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Executive Review</span>
                      <span className="font-medium">May 25, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Board Presentation</span>
                      <span className="font-medium">June 15, 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Company-wide Budget Summary
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <MetricCard
                    title="Total Revenue"
                    value="AED 1.56B"
                    change="+8.2% vs FY24"
                    changeType="positive"
                    icon={DollarSign}
                  />
                  <MetricCard
                    title="Operating Expenses"
                    value="AED 1.23B"
                    change="+5.4% vs FY24"
                    changeType="positive"
                    icon={CreditCard}
                  />
                  <MetricCard
                    title="Capital Expenditures"
                    value="AED 285M"
                    change="+12.8% vs FY24"
                    changeType="positive"
                    icon={BarChart3}
                  />
                  <MetricCard
                    title="Operating Income"
                    value="AED 330M"
                    change="+18.5% vs FY24"
                    changeType="positive"
                    icon={TrendingUp}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-3">
                      Budget vs Previous Year
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Revenue: +8.2% vs FY24</span>
                          <span>AED 1.56B vs AED 1.44B</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>OPEX: +5.4% vs FY24</span>
                          <span>AED 1.23B vs AED 1.17B</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>CAPEX: +12.8% vs FY24</span>
                          <span>AED 285M vs AED 252M</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Operating Income: +18.5% vs FY24</span>
                          <span>AED 330M vs AED 278M</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-3">
                      Budget vs Strategic Plan
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Revenue: +3.2% vs Plan</span>
                          <span>AED 1.56B vs AED 1.51B</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>OPEX: +1.8% vs Plan</span>
                          <span>AED 1.23B vs AED 1.21B</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>CAPEX: +6.3% vs Plan</span>
                          <span>AED 285M vs AED 268M</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Operating Income: +7.8% vs Plan</span>
                          <span>AED 330M vs AED 306M</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Budget Creation Insights
                  </h3>
                  <Badge variant="blue">AI Generated</Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-green-50 text-green-500 mr-3 flex-shrink-0">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">
                        Revenue Growth Alignment
                      </h4>
                      <p className="text-sm text-gray-600">
                        8.2% consolidated revenue growth is well-aligned with
                        market projections (7.5%) and exceeds strategic plan
                        (5%). Distribution division and tobacco division are
                        primary drivers with growth rates of 12.8% and 9.2%
                        respectively.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-orange-50 text-orange-500 mr-3 flex-shrink-0">
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">
                        OPEX Growth Discrepancies
                      </h4>
                      <p className="text-sm text-gray-600">
                        Operating expense growth varies significantly across
                        departments (3.5% - 8.2%). Three departments exceed
                        corporate guidelines for OPEX growth. Finance team
                        should review justifications for Logistics (+8.2%),
                        Tobacco (+7.4%), and IT (+7.8%) departments.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-blue-50 text-blue-500 mr-3 flex-shrink-0">
                      <Settings size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">
                        Capital Allocation Efficiency
                      </h4>
                      <p className="text-sm text-gray-600">
                        CAPEX increase of 12.8% is primarily driven by warehouse
                        expansion (AED 85M) and technology infrastructure (AED
                        42M). AI analysis suggests potential for 8% efficiency
                        improvement through project consolidation and vendor
                        negotiation. Estimated savings: AED 22.8M.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-purple-50 text-purple-500 mr-3 flex-shrink-0">
                      <Zap size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">
                        Budget Risk Analysis
                      </h4>
                      <p className="text-sm text-gray-600">
                        Simulation models indicate 75% probability of achieving
                        revenue targets and 82% probability of meeting operating
                        income goals. Key risk factors: supply chain disruptions
                        (28% probability) and market growth slowdown (32%
                        probability).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Department Submissions Tab */}
        {activeTab === "departments" && (
          <div>
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Briefcase size={20} className="mr-2 text-gray-700" />{" "}
                  Department Budget Submissions
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 flex items-center">
                    <Sliders size={16} className="mr-2" />
                    Filters
                  </button>
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center">
                    <Plus size={16} className="mr-2" />
                    Add Department
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex space-x-2 mb-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search departments..."
                      className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 flex items-center">
                    <Filter size={16} className="mr-2" />
                    Status
                  </button>
                </div>

                <div className="space-y-1 mb-4">
                  <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 mr-1">
                    Submitted
                  </button>
                  <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 mr-1">
                    In Progress
                  </button>
                  <button className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 mr-1">
                    Review
                  </button>
                  <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 mr-1">
                    Needs Revision
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 mr-1">
                    Not Started
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <DepartmentCard
                  name="BME Distribution"
                  progress={85}
                  status="Submitted"
                  deadline="Apr 30, 2025"
                  icon={Package}
                />
                <DepartmentCard
                  name="Mohebi Logistics"
                  progress={100}
                  status="Submitted"
                  deadline="Apr 30, 2025"
                  icon={Truck}
                />
                <DepartmentCard
                  name="Le Tabac (Tobacco Division)"
                  progress={92}
                  status="Submitted"
                  deadline="Apr 30, 2025"
                  icon={Package}
                />
                <DepartmentCard
                  name="HORECA Division"
                  progress={78}
                  status="In Progress"
                  deadline="Apr 30, 2025"
                  icon={CreditCard}
                />
                <DepartmentCard
                  name="Finance Department"
                  progress={100}
                  status="Submitted"
                  deadline="Apr 30, 2025"
                  icon={DollarSign}
                />
                <DepartmentCard
                  name="Human Resources"
                  progress={100}
                  status="Submitted"
                  deadline="Apr 30, 2025"
                  icon={Users}
                />
                <DepartmentCard
                  name="Information Technology"
                  progress={65}
                  status="In Progress"
                  deadline="Apr 30, 2025"
                  icon={Server}
                />
                <DepartmentCard
                  name="Marketing Department"
                  progress={40}
                  status="In Progress"
                  deadline="Apr 30, 2025"
                  icon={Target}
                />
                <DepartmentCard
                  name="Administration"
                  progress={100}
                  status="Submitted"
                  deadline="Apr 30, 2025"
                  icon={Briefcase}
                />
                <DepartmentCard
                  name="Perishables Division"
                  progress={25}
                  status="In Progress"
                  deadline="Apr 30, 2025"
                  icon={Package}
                />
                <DepartmentCard
                  name="Legal Department"
                  progress={90}
                  status="Submitted"
                  deadline="Apr 30, 2025"
                  icon={Briefcase}
                />
                <DepartmentCard
                  name="Strategy & Business Development"
                  progress={75}
                  status="In Progress"
                  deadline="Apr 30, 2025"
                  icon={TrendingUp}
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Department Submission Issues
                  </h3>
                  <Badge variant="orange">14 Issues</Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-red-50 text-red-500 mr-3 flex-shrink-0">
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">
                        Incomplete IT Budget Justification
                        <Badge variant="red" className="ml-2">
                          Critical
                        </Badge>
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        IT Department's infrastructure investment (AED 42M)
                        lacks detailed breakdown and ROI analysis.
                      </p>
                      <div className="flex space-x-2 mt-1">
                        <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          Request Update
                        </button>
                        <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-orange-50 text-orange-500 mr-3 flex-shrink-0">
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">
                        Growth Assumption Discrepancy
                        <Badge variant="orange" className="ml-2">
                          High
                        </Badge>
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        HORECA Division using 9.3% growth rate vs. corporate
                        standard of 5.2%, without sufficient justification.
                      </p>
                      <div className="flex space-x-2 mt-1">
                        <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          Standardize Assumptions
                        </button>
                        <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-blue-50 text-blue-500 mr-3 flex-shrink-0">
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">
                        Missing Headcount Details
                        <Badge variant="blue" className="ml-2">
                          Medium
                        </Badge>
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        Logistics department shows 15 new positions but only 8
                        have position descriptions and justifications.
                      </p>
                      <div className="flex space-x-2 mt-1">
                        <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          Request Details
                        </button>
                        <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                          View Submission
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2 text-sm text-blue-600 font-medium hover:text-blue-800 border border-blue-200 rounded-lg">
                    View All 14 Issues
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Budget Consolidation Tab */}
        {activeTab === "consolidation" && (
          <div>
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <GitMerge size={20} className="mr-2 text-gray-700" /> Budget
                  Consolidation
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 flex items-center">
                    <RefreshCw size={16} className="mr-2" />
                    Refresh Data
                  </button>
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center">
                    <Zap size={16} className="mr-2" />
                    Run AI Consolidation
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Consolidation Process
                  </h3>
                  <Badge variant="blue">In Progress</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xs text-green-500 uppercase font-semibold mb-1">
                      Data Collection
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold text-green-700">
                        100%
                      </div>
                      <div className="text-xs text-green-600">Complete</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-500 uppercase font-semibold mb-1">
                      Validation
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold text-blue-700">
                        85%
                      </div>
                      <div className="text-xs text-blue-600">Complete</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-500 uppercase font-semibold mb-1">
                      Consolidation
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold text-blue-700">
                        60%
                      </div>
                      <div className="text-xs text-blue-600">Complete</div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Review
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold text-gray-700">
                        10%
                      </div>
                      <div className="text-xs text-gray-600">Complete</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <ProgressBar
                    percent={100}
                    label="Data Collection"
                    variant="green"
                  />
                  <ProgressBar
                    percent={85}
                    label="Validation & Cross-checking"
                    variant="blue"
                  />
                  <ProgressBar
                    percent={60}
                    label="Budget Aggregation"
                    variant="blue"
                  />
                  <ProgressBar
                    percent={45}
                    label="AI-Driven Analysis"
                    variant="blue"
                  />
                  <ProgressBar
                    percent={10}
                    label="Optimization Recommendations"
                    variant="gray"
                  />
                  <ProgressBar
                    percent={0}
                    label="Final Consolidation"
                    variant="gray"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Consolidation Issues
                  </h3>
                  <div className="flex space-x-2">
                    <Badge variant="red">4 Critical</Badge>
                    <Badge variant="orange">6 High</Badge>
                    <Badge variant="blue">8 Medium</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <ConsolidationIssueCard
                    title="Cross-Department Growth Assumption Inconsistency"
                    description="Significant variation in market growth assumptions between departments affects consolidated forecast reliability."
                    severity="Critical"
                    departments={["Distribution", "HORECA", "Finance", "Sales"]}
                    recommendations={[
                      "Implement standard growth assumption of 5.2% across all departments",
                      "Require written justification for any department-specific deviation",
                      "Re-run simulations with standardized assumptions to assess impact",
                    ]}
                  />

                  <ConsolidationIssueCard
                    title="Duplicate Infrastructure Investments"
                    description="Multiple departments budgeting for similar technology infrastructure with potential for consolidation."
                    severity="High"
                    departments={["IT", "Logistics", "Distribution"]}
                    recommendations={[
                      "Consolidate warehouse management system investments (AED 12.5M potential savings)",
                      "Centralize technology procurement through IT department",
                      "Re-evaluate ROI with consolidated approach",
                    ]}
                  />

                  <ConsolidationIssueCard
                    title="Capital Expenditure Timing Conflicts"
                    description="Scheduling conflicts in capital projects may create cash flow pressure in Q3 2025."
                    severity="Medium"
                    departments={["Logistics", "Distribution", "Facilities"]}
                    recommendations={[
                      "Stagger warehouse expansion projects across quarters",
                      "Prioritize projects based on strategic importance and ROI",
                      "Consider lease vs. buy options for peak capacity needs",
                    ]}
                  />

                  <button className="w-full py-2 text-sm text-blue-600 font-medium hover:text-blue-800 border border-blue-200 rounded-lg">
                    View All 18 Issues
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Cross-Department Optimization Opportunities
                  </h3>
                  <Badge variant="green">AI-Identified</Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-green-50 text-green-500 mr-3 flex-shrink-0">
                      <GitMerge size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">
                        Vendor Consolidation Opportunity
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        AI analysis identified 8 vendors being used across
                        multiple departments with different pricing structures.
                        Consolidating vendors could save approximately AED 4.8M.
                      </p>
                      <div className="flex space-x-2 mt-1">
                        <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          View Analysis
                        </button>
                        <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                          Send to Departments
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-green-50 text-green-500 mr-3 flex-shrink-0">
                      <Shuffle size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">
                        Resource Sharing Potential
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        Distribution and Logistics departments have
                        complementary warehouse capacity needs. Optimizing
                        shared use could reduce CAPEX by AED 15.2M and improve
                        utilization by 18%.
                      </p>
                      <div className="flex space-x-2 mt-1">
                        <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          View Details
                        </button>
                        <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                          Send to Departments
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-green-50 text-green-500 mr-3 flex-shrink-0">
                      <DollarSign size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-1">
                        Working Capital Optimization
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        Standardizing payment terms across departments could
                        improve cash flow by AED 28M. Current terms vary from
                        30-90 days across departments and vendors.
                      </p>
                      <div className="flex space-x-2 mt-1">
                        <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                          View Analysis
                        </button>
                        <button className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                          Send to Finance
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2 text-sm text-blue-600 font-medium hover:text-blue-800 border border-blue-200 rounded-lg">
                    View All Optimization Opportunities
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Scenario Simulations Tab */}
        {activeTab === "simulations" && (
          <div>
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <TrendingUp size={20} className="mr-2 text-gray-700" /> Budget
                  Scenario Simulations
                  <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    30 mins ago
                  </span>
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 flex items-center">
                    <Copy size={16} className="mr-2" />
                    Export Results
                  </button>
                  <button className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 flex items-center">
                    <Zap size={16} className="mr-2" />
                    Run New Simulation
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Simulation Overview
                  </h3>
                  <span className="text-xs text-gray-500">
                    Last run: 30 minutes ago
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-500 uppercase font-semibold mb-1">
                      Total Simulations
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold text-blue-700">
                        3,850
                      </div>
                      <div className="text-xs text-blue-600">Scenarios</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-500 uppercase font-semibold mb-1">
                      Variables Tested
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold text-blue-700">28</div>
                      <div className="text-xs text-blue-600">Key Drivers</div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xs text-green-500 uppercase font-semibold mb-1">
                      Base Case Probability
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold text-green-700">
                        78%
                      </div>
                      <div className="text-xs text-green-600">Confidence</div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-xs text-orange-500 uppercase font-semibold mb-1">
                      Risk Scenarios
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-2xl font-bold text-orange-700">
                        32%
                      </div>
                      <div className="text-xs text-orange-600">Probability</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-2">
                      Simulation Categories
                    </h4>
                    <div className="space-y-2">
                      <ProgressBar
                        percent={35}
                        label="Base Case Scenarios"
                        variant="blue"
                      />
                      <ProgressBar
                        percent={25}
                        label="Growth Scenarios"
                        variant="green"
                      />
                      <ProgressBar
                        percent={30}
                        label="Risk Scenarios"
                        variant="orange"
                      />
                      <ProgressBar
                        percent={10}
                        label="Extreme Scenarios"
                        variant="red"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-2">
                      Key Variables Tested
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Market Growth Rate
                        </span>
                        <span className="font-medium">3.0% - 7.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Inflation Rate</span>
                        <span className="font-medium">2.0% - 4.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exchange Rates</span>
                        <span className="font-medium">±8% variance</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Supply Chain Disruption
                        </span>
                        <span className="font-medium">None - Severe</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-2">
                      Most Sensitive Budget Factors
                    </h4>
                    <div className="space-y-2">
                      <ProgressBar
                        percent={85}
                        label="Market Growth Rate"
                        variant="blue"
                      />
                      <ProgressBar
                        percent={72}
                        label="Foreign Exchange Rates"
                        variant="blue"
                      />
                      <ProgressBar
                        percent={68}
                        label="Supply Chain Disruption"
                        variant="blue"
                      />
                      <ProgressBar
                        percent={56}
                        label="Inflation Rate"
                        variant="blue"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <Zap
                      size={20}
                      className="text-blue-600 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-medium text-blue-800 mb-1">
                        AI Simulation Insight
                      </h3>
                      <p className="text-sm text-blue-700">
                        Based on 3,850 simulations, the consolidated budget has
                        a 78% probability of achieving revenue targets and 72%
                        probability of achieving operating income goals. The
                        most sensitive variables are market growth rate and
                        foreign exchange fluctuations. Consider developing
                        detailed contingency plans for scenarios where market
                        growth falls below 4.5% or where major currency
                        fluctuations exceed 5%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Primary Scenario Results
                  </h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                      All Scenarios
                    </button>
                    <button className="px-3 py-1 text-xs text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                      Compare Scenarios
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <SimulationCard
                    title="Scenario A: Base Case"
                    description="Core business scenario based on consensus market forecasts and standard planning assumptions"
                    probability="78%"
                    impact="±0% (Baseline)"
                    icon={BarChart3}
                  />

                  <SimulationCard
                    title="Scenario B: Accelerated Growth"
                    description="Higher market growth and successful expansion into Saudi market ahead of timeline"
                    probability="22%"
                    impact="+12.5% Revenue"
                    icon={TrendingUp}
                  />

                  <SimulationCard
                    title="Scenario C: Supply Chain Disruption"
                    description="Major logistics disruptions affecting inventory availability and increasing costs"
                    probability="28%"
                    impact="-8.2% Revenue"
                    icon={AlertTriangle}
                  />

                  <SimulationCard
                    title="Scenario D: Market Slowdown"
                    description="Economic headwinds resulting in reduced growth across all divisions"
                    probability="32%"
                    impact="-6.8% Revenue"
                    icon={ArrowDown}
                  />

                  <SimulationCard
                    title="Scenario E: FX Volatility"
                    description="Significant currency fluctuations affecting imported goods and international operations"
                    probability="25%"
                    impact="-4.5% EBITDA"
                    icon={RefreshCw}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Scenario Impact Analysis
                  </h3>
                  <Badge variant="blue">Company-Wide</Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Scenario
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Revenue Impact
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          EBITDA Impact
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Cash Flow Impact
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Most Affected Divisions
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Probability
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Base Case
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          ±0%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          ±0%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          ±0%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          All Equal
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          78%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Accelerated Growth
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600">
                          +12.5%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600">
                          +15.2%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                          -8.3% (Short-term)
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          Distribution, HORECA
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                          22%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Supply Chain Disruption
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                          -8.2%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                          -12.8%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                          -15.5%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          Distribution, Logistics
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">
                          28%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Market Slowdown
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                          -6.8%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                          -10.2%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                          -8.5%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          All Divisions
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">
                          32%
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          FX Volatility
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                          -2.2%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                          -4.5%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                          -3.8%
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          Tobacco, Imports
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">
                          25%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">
                      Risk Mitigation Strategies
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="ml-2 text-sm text-blue-700">
                          Implement phased approach for major capital
                          expenditures with stage-gate reviews
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="ml-2 text-sm text-blue-700">
                          Diversify supplier base to reduce supply chain
                          disruption risk
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="ml-2 text-sm text-blue-700">
                          Implement hedging strategy for key foreign exchange
                          exposures
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="text-sm font-medium text-green-800 mb-2">
                      Opportunity Capture Strategies
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-green-600"></div>
                        </div>
                        <span className="ml-2 text-sm text-green-700">
                          Prepare acceleration plan for Saudi market expansion
                          if early indicators are positive
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-green-600"></div>
                        </div>
                        <span className="ml-2 text-sm text-green-700">
                          Establish flexible workforce strategy to quickly scale
                          with growth
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full border border-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-green-600"></div>
                        </div>
                        <span className="ml-2 text-sm text-green-700">
                          Set aside contingency fund (AED 25M) for opportunistic
                          expansion or acquisition
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Global Assumptions Tab */}
        {activeTab === "assumptions" && (
          <div>
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Filter size={20} className="mr-2 text-gray-700" /> Global
                  Budget Assumptions
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 flex items-center">
                    <Copy size={16} className="mr-2" />
                    Export
                  </button>
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center">
                    <Edit size={16} className="mr-2" />
                    Edit Assumptions
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Assumption Status
                  </h3>
                  <Badge variant="green">CFO Approved</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xs text-green-500 uppercase font-semibold mb-1">
                      Status
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-xl font-bold text-green-700">
                        Approved
                      </div>
                      <div className="text-xs text-green-600">Apr 5, 2025</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-500 uppercase font-semibold mb-1">
                      Assumption Sets
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-xl font-bold text-blue-700">4</div>
                      <div className="text-xs text-blue-600">Categories</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-500 uppercase font-semibold mb-1">
                      Last Update
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-xl font-bold text-blue-700">
                        3 days ago
                      </div>
                      <div className="text-xs text-blue-600">Apr 12, 2025</div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-xs text-orange-500 uppercase font-semibold mb-1">
                      Department Variances
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-xl font-bold text-orange-700">4</div>
                      <div className="text-xs text-orange-600">
                        Requiring Review
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <AssumptionCard
                    category="Economic Indicators"
                    assumptions={[
                      {
                        name: "Market Growth Rate",
                        source: "Finance",
                        description:
                          "Annual market growth rate for FY2025 across all business segments",
                        previous: "4.8%",
                        current: "5.2%",
                      },
                      {
                        name: "Inflation Rate",
                        source: "Finance",
                        description:
                          "Annual inflation forecast for UAE and primary markets",
                        previous: "3.2%",
                        current: "2.8%",
                      },
                      {
                        name: "GDP Growth (UAE)",
                        source: "External",
                        description:
                          "UAE GDP growth projection for calendar year 2025",
                        previous: "3.4%",
                        current: "3.6%",
                      },
                      {
                        name: "GDP Growth (Saudi Arabia)",
                        source: "External",
                        description:
                          "Saudi Arabia GDP growth projection for calendar year 2025",
                        previous: "3.1%",
                        current: "3.8%",
                      },
                    ]}
                  />

                  <AssumptionCard
                    category="Foreign Exchange Rates"
                    assumptions={[
                      {
                        name: "USD/AED",
                        source: "Finance",
                        description: "US Dollar to UAE Dirham exchange rate",
                        previous: "Fixed at 3.6725",
                        current: "Fixed at 3.6725",
                      },
                      {
                        name: "EUR/AED",
                        source: "Finance",
                        description: "Euro to UAE Dirham exchange rate",
                        previous: "4.25",
                        current: "4.32",
                      },
                      {
                        name: "GBP/AED",
                        source: "Finance",
                        description:
                          "British Pound to UAE Dirham exchange rate",
                        previous: "4.85",
                        current: "4.92",
                      },
                      {
                        name: "FX Volatility Range",
                        source: "Finance",
                        description:
                          "Expected volatility range for budgeting scenarios",
                        previous: "±5%",
                        current: "±8%",
                      },
                    ]}
                  />

                  <AssumptionCard
                    category="Internal Operating Factors"
                    assumptions={[
                      {
                        name: "Salary Inflation",
                        source: "HR",
                        description:
                          "Average salary increase rate for existing employees",
                        previous: "3.2%",
                        current: "3.5%",
                      },
                      {
                        name: "Staff Turnover Rate",
                        source: "HR",
                        description:
                          "Expected voluntary turnover rate across all departments",
                        previous: "12.5%",
                        current: "11.8%",
                      },
                      {
                        name: "Revenue per FTE",
                        source: "Finance",
                        description:
                          "Average revenue generated per full-time equivalent employee",
                        previous: "AED 1.85M",
                        current: "AED 1.95M",
                      },
                      {
                        name: "Warehouse Utilization",
                        source: "Operations",
                        description: "Average warehouse space utilization rate",
                        previous: "82%",
                        current: "86%",
                      },
                    ]}
                  />

                  <AssumptionCard
                    category="Capital & Financing"
                    assumptions={[
                      {
                        name: "WACC (Weighted Average Cost of Capital)",
                        source: "Finance",
                        description:
                          "Cost of capital for investment decisions and NPV calculations",
                        previous: "8.5%",
                        current: "8.8%",
                      },
                      {
                        name: "Minimum ROI Threshold",
                        source: "Finance",
                        description:
                          "Minimum required return on investment for project approval",
                        previous: "15%",
                        current: "16%",
                      },
                      {
                        name: "Debt Interest Rate",
                        source: "Finance",
                        description:
                          "Average interest rate on new debt facilities",
                        previous: "5.2%",
                        current: "5.8%",
                      },
                      {
                        name: "Capital Allocation",
                        source: "Finance",
                        description:
                          "Total capital budget as percentage of revenue",
                        previous: "17.5%",
                        current: "18.3%",
                      },
                    ]}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Department Assumption Variances
                  </h3>
                  <div className="flex space-x-2">
                    <Badge variant="orange">4 Issues</Badge>
                    <Badge variant="blue">Needs Review</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <div className="flex items-start">
                      <AlertTriangle
                        size={18}
                        className="text-orange-600 mr-3 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-orange-800">
                            HORECA Division Growth Assumption
                          </h4>
                          <Badge variant="orange">Needs Review</Badge>
                        </div>
                        <p className="text-sm text-orange-700 mb-2">
                          HORECA division is using 9.3% growth assumption vs.
                          standard 5.2% corporate assumption.
                        </p>
                        <div className="flex justify-between text-sm text-orange-700 mb-3">
                          <span>Standard Assumption: 5.2%</span>
                          <span>Department Assumption: 9.3%</span>
                          <span>Variance: +4.1%</span>
                        </div>
                        <p className="text-sm text-orange-700 mb-3">
                          Justification provided: "Tourism recovery and new
                          hotel openings support higher growth projection."
                        </p>
                        <div className="flex space-x-3">
                          <button className="px-3 py-1 text-xs bg-orange-200 text-orange-800 rounded hover:bg-orange-300">
                            Request Revision
                          </button>
                          <button className="px-3 py-1 text-xs bg-green-200 text-green-800 rounded hover:bg-green-300">
                            Approve Exception
                          </button>
                          <button className="px-3 py-1 text-xs bg-blue-200 text-blue-800 rounded hover:bg-blue-300">
                            Run Impact Analysis
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <div className="flex items-start">
                      <AlertTriangle
                        size={18}
                        className="text-orange-600 mr-3 mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-orange-800">
                            IT Department Salary Inflation
                          </h4>
                          <Badge variant="orange">Needs Review</Badge>
                        </div>
                        <p className="text-sm text-orange-700 mb-2">
                          IT department is using 5.2% salary inflation vs.
                          standard 3.5% corporate assumption.
                        </p>
                        <div className="flex justify-between text-sm text-orange-700 mb-3">
                          <span>Standard Assumption: 3.5%</span>
                          <span>Department Assumption: 5.2%</span>
                          <span>Variance: +1.7%</span>
                        </div>
                        <p className="text-sm text-orange-700 mb-3">
                          Justification provided: "Specialized IT skills market
                          experiencing higher wage inflation."
                        </p>
                        <div className="flex space-x-3">
                          <button className="px-3 py-1 text-xs bg-orange-200 text-orange-800 rounded hover:bg-orange-300">
                            Request Revision
                          </button>
                          <button className="px-3 py-1 text-xs bg-green-200 text-green-800 rounded hover:bg-green-300">
                            Approve Exception
                          </button>
                          <button className="px-3 py-1 text-xs bg-blue-200 text-blue-800 rounded hover:bg-blue-300">
                            Run Impact Analysis
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2 text-sm text-blue-600 font-medium hover:text-blue-800 border border-blue-200 rounded-lg">
                    View All Assumption Variances
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Review & Approval Tab */}
        {activeTab === "review" && (
          <div>
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FileCheck size={20} className="mr-2 text-gray-700" /> Budget
                  Review & Approval
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 flex items-center">
                    <MessageCircle size={16} className="mr-2" />
                    Comments
                  </button>
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center">
                    <FileCheck size={16} className="mr-2" />
                    Start Review
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Review Process Status
                  </h3>
                  <Badge variant="blue">In Progress</Badge>
                </div>

                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-between">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 font-semibold">
                        <Check size={24} />
                      </div>
                      <div className="text-xs mt-2 text-center">
                        Department
                        <br />
                        Submissions
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-semibold">
                        <span>2</span>
                      </div>
                      <div className="text-xs mt-2 text-center">
                        Finance
                        <br />
                        Review
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-500 font-semibold">
                        <span>3</span>
                      </div>
                      <div className="text-xs mt-2 text-center">
                        Executive
                        <br />
                        Review
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-500 font-semibold">
                        <span>4</span>
                      </div>
                      <div className="text-xs mt-2 text-center">
                        Board
                        <br />
                        Approval
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-500 font-semibold">
                        <span>5</span>
                      </div>
                      <div className="text-xs mt-2 text-center">
                        Final
                        <br />
                        Distribution
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-3">
                      Upcoming Review Milestones
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Finance Review Completion
                        </span>
                        <span className="font-medium">May 15, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Executive Committee Review
                        </span>
                        <span className="font-medium">May 25, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Board Presentation
                        </span>
                        <span className="font-medium">June 15, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Budget Finalization & Distribution
                        </span>
                        <span className="font-medium">June 30, 2025</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-3">
                      Current Reviewers
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                            MA
                          </div>
                          <span className="text-sm">Mohammed Al-Maktoum</span>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="blue">In Progress</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                            SK
                          </div>
                          <span className="text-sm">Sarah Khan</span>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="blue">In Progress</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center mr-2">
                            JT
                          </div>
                          <span className="text-sm">James Thompson</span>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="gray">Waiting</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Review Comments & Action Items
                  </h3>
                  <button className="text-xs text-blue-600 font-medium hover:text-blue-800">
                    Add Comment
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                        MA
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">
                            Mohammed Al-Maktoum
                          </div>
                          <div className="text-xs text-gray-500">
                            2 days ago
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          The capital expenditure for warehouse expansion needs
                          a more detailed breakdown. Please provide additional
                          justification for the AED 85M allocation.
                        </p>
                        <div className="flex space-x-2">
                          <Badge variant="orange">Action Required</Badge>
                          <Badge variant="blue">Logistics Department</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                        SK
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">Sarah Khan</div>
                          <div className="text-xs text-gray-500">
                            3 days ago
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          The growth assumptions for HORECA division seem
                          aggressive compared to market projections. Please
                          provide additional market research to support the 9.3%
                          growth assumption.
                        </p>
                        <div className="flex space-x-2">
                          <Badge variant="orange">Action Required</Badge>
                          <Badge variant="blue">HORECA Division</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 flex-shrink-0">
                        AM
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium">
                            Ahmed Mahmoud
                          </div>
                          <div className="text-xs text-gray-500">
                            4 days ago
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Additional details for warehouse expansion provided.
                          See attached document for breakdown of costs including
                          land acquisition, construction, and equipment.
                        </p>
                        <div className="flex space-x-2">
                          <Badge variant="green">Resolved</Badge>
                          <Badge variant="blue">Logistics Department</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2 text-sm text-blue-600 font-medium hover:text-blue-800 border border-blue-200 rounded-lg">
                    View All Comments
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">
                    Final Approval Checklist
                  </h3>
                  <Badge variant="blue">8/15 Complete</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full border border-green-600 flex items-center justify-center mr-2">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      All department budgets submitted
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full border border-green-600 flex items-center justify-center mr-2">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Budget consolidation complete
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full border border-green-600 flex items-center justify-center mr-2">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">
                      Global assumptions approved by CFO
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full border border-blue-600 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-gray-700">
                      All department assumption variances reviewed
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full border border-blue-600 flex items-center justify-center mr-2">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                    <span className="text-sm text-gray-700">
                      Cross-department optimization opportunities implemented
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2"></div>
                    <span className="text-sm text-gray-700">
                      Executive committee review complete
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2"></div>
                    <span className="text-sm text-gray-700">
                      Final budget presentation prepared for board
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center mr-2"></div>
                    <span className="text-sm text-gray-700">
                      Board approval obtained
                    </span>
                  </div>

                  <div className="mt-4">
                    <button className="w-full py-2 text-sm text-blue-600 font-medium hover:text-blue-800 border border-blue-200 rounded-lg">
                      View Full Approval Checklist
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Budget Intelligence Agent */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Zap size={20} className="mr-2 text-gray-700" /> Budget Intelligence
            Assistant
          </h2>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white p-3 rounded-full mr-4">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    Ask your AI Budget Intelligence Agent
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Get instant insights on budget creation, forecasting, and
                    optimization
                  </p>
                </div>
              </div>

              <button className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center font-medium">
                <Zap size={18} className="mr-2" />
                Open Assistant
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-800 mb-1">
                  Run Budget Simulations
                </h4>
                <p className="text-xs text-gray-600">
                  Generate thousands of simulations with different variables
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-800 mb-1">
                  Find Optimization Opportunities
                </h4>
                <p className="text-xs text-gray-600">
                  Identify cross-department efficiency improvements
                </p>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-800 mb-1">
                  Generate Executive Summary
                </h4>
                <p className="text-xs text-gray-600">
                  Create budget presentation for executive review
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyBudgetDashboard;

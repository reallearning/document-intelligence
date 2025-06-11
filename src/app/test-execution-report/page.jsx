"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Download,
  Filter,
  ArrowLeft,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Info,
  Target,
  Zap,
  Code,
  Globe,
  Eye,
  FileText,
  Settings,
} from "lucide-react";

const TestExecutionReport = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const executionSummary = {
    totalTests: 27, // 4 functional + 3 performance + 20 unit
    executed: 19,
    passed: 14,
    failed: 5,
    skipped: 8,
    aiExecutable: 19,
    humanRequired: 8,
    executionTime: "6m 23s",
    coverage: 85,
  };

  const functionalTestResults = [
    {
      id: "FT001",
      title: "Employee Salary History - Add New Entry",
      status: "skipped",
      aiExecuted: false,
      reason: "Requires visual verification of salary history table display",
      estimatedTime: "3m 15s",
      description:
        "Cannot verify visual elements like table layout and entry appearance",
    },
    {
      id: "FT002",
      title: "Payroll Dashboard - Calculate Total Payroll",
      status: "passed",
      aiExecuted: true,
      time: "1m 45s",
      description:
        "Successfully validated payroll calculations through API responses",
    },
    {
      id: "FT003",
      title: "Employee Form - Salary Field Validation",
      status: "passed",
      aiExecuted: true,
      time: "52s",
      description: "Form validation rules successfully tested programmatically",
    },
    {
      id: "FT004",
      title: "Database Migration - Salary History Table",
      status: "passed",
      aiExecuted: true,
      time: "28s",
      description: "Database schema and migration validated successfully",
    },
  ];

  const performanceTestResults = [
    {
      id: "PT001",
      title: "Payroll Dashboard Load Performance",
      status: "passed",
      aiExecuted: true,
      time: "5m 12s",
      metrics: "Avg response: 1.2s, Throughput: 28 req/sec",
      description: "All JMeter performance thresholds met",
    },
    {
      id: "PT002",
      title: "Employee Search API Performance",
      status: "passed",
      aiExecuted: true,
      time: "10m 5s",
      metrics: "Avg response: 420ms, Throughput: 105 req/sec",
      description: "API performance within acceptable limits",
    },
    {
      id: "PT003",
      title: "Salary History Query Performance",
      status: "failed",
      aiExecuted: true,
      time: "3m 2s",
      error: "Response time exceeded 1s threshold (1.4s avg)",
      description: "Database query optimization needed",
    },
  ];

  const unitTestResults = [
    {
      id: "UT001",
      title: "should render employee form with all fields",
      file: "EmployeeForm.jsx",
      status: "skipped",
      aiExecuted: false,
      reason: "Requires visual DOM verification that AI cannot validate",
      type: "Component Rendering",
    },
    {
      id: "UT002",
      title: "should handle salary state changes correctly",
      file: "EmployeeForm.jsx",
      status: "passed",
      aiExecuted: true,
      time: "0.3s",
      type: "State Management",
    },
    {
      id: "UT003",
      title: "should fetch salary history on employee load",
      file: "EmployeeForm.jsx",
      status: "passed",
      aiExecuted: true,
      time: "0.8s",
      type: "API Integration",
    },
    {
      id: "UT004",
      title: "should validate required fields before submission",
      file: "EmployeeForm.jsx",
      status: "passed",
      aiExecuted: true,
      time: "0.6s",
      type: "Form Validation",
    },
    {
      id: "UT005",
      title: "should display salary history when available",
      file: "EmployeeForm.jsx",
      status: "skipped",
      aiExecuted: false,
      reason: "Requires visual verification of conditional rendering",
      type: "Conditional Rendering",
    },
    {
      id: "UT006",
      title: "should handle API errors gracefully",
      file: "EmployeeForm.jsx",
      status: "passed",
      aiExecuted: true,
      time: "0.4s",
      type: "Error Handling",
    },
    {
      id: "UT007",
      title: "GET /employees should return employees with salary history",
      file: "employee.js",
      status: "passed",
      aiExecuted: true,
      time: "1.2s",
      type: "API Endpoint",
    },
    {
      id: "UT008",
      title: "should join salary_history table correctly",
      file: "employee.js",
      status: "passed",
      aiExecuted: true,
      time: "0.9s",
      type: "Database Query",
    },
    {
      id: "UT009",
      title: "POST /employees/:id/salary should create new salary entry",
      file: "employee.js",
      status: "failed",
      aiExecuted: true,
      time: "0.7s",
      error: "Foreign key constraint violation in test database",
      type: "API Endpoint",
    },
    {
      id: "UT010",
      title: "should validate required salary fields",
      file: "employee.js",
      status: "passed",
      aiExecuted: true,
      time: "0.5s",
      type: "Input Validation",
    },
    {
      id: "UT011",
      title: "should return 400 for invalid salary data",
      file: "employee.js",
      status: "passed",
      aiExecuted: true,
      time: "0.4s",
      type: "Error Response",
    },
    {
      id: "UT012",
      title: "should return 404 for non-existent employee",
      file: "employee.js",
      status: "passed",
      aiExecuted: true,
      time: "0.3s",
      type: "Error Response",
    },
    {
      id: "UT013",
      title: "calculateGrossPay should sum base salary, overtime, and bonuses",
      file: "salaryCalculations.js",
      status: "passed",
      aiExecuted: true,
      time: "0.2s",
      type: "Pure Function",
    },
    {
      id: "UT014",
      title: "calculateTaxes should apply progressive tax rates correctly",
      file: "salaryCalculations.js",
      status: "failed",
      aiExecuted: true,
      time: "0.3s",
      error: "Tax calculation logic error for $75,000 salary bracket",
      type: "Business Logic",
    },
    {
      id: "UT015",
      title: "should calculate 15% tax for salaries <= $50,000",
      file: "salaryCalculations.js",
      status: "passed",
      aiExecuted: true,
      time: "0.2s",
      type: "Tax Calculation",
    },
    {
      id: "UT016",
      title: "should calculate tiered tax for salaries $50,001-$100,000",
      file: "salaryCalculations.js",
      status: "failed",
      aiExecuted: true,
      time: "0.2s",
      error: "Incorrect tier calculation for $85,000 test case",
      type: "Tax Calculation",
    },
    {
      id: "UT017",
      title: "should calculate highest tier for salaries > $100,000",
      file: "salaryCalculations.js",
      status: "passed",
      aiExecuted: true,
      time: "0.2s",
      type: "Tax Calculation",
    },
    {
      id: "UT018",
      title: "calculateDeductions should compute health insurance at 3%",
      file: "salaryCalculations.js",
      status: "passed",
      aiExecuted: true,
      time: "0.1s",
      type: "Deduction Calculation",
    },
    {
      id: "UT019",
      title: "getCurrentPayroll should fetch all employees with salary data",
      file: "payrollController.js",
      status: "skipped",
      aiExecuted: false,
      reason: "Test environment missing database connection configuration",
      type: "Controller Logic",
    },
    {
      id: "UT020",
      title: "should calculate taxes using progressive tax function",
      file: "payrollController.js",
      status: "skipped",
      aiExecuted: false,
      reason: "Depends on UT019 database setup",
      type: "Integration",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "passed":
        return "text-green-700 bg-green-50 border-green-200";
      case "failed":
        return "text-red-700 bg-red-50 border-red-200";
      case "skipped":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "skipped":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const aiLimitationReasons = {
    "Visual Verification": [
      "UT001 - Cannot verify DOM element appearance",
      "UT005 - Cannot validate visual conditional rendering",
      "FT001 - Cannot verify table display layout",
    ],
    "Environment Setup": [
      "UT019 - Missing database connection in test environment",
      "UT020 - Dependent on database setup",
    ],
    "External Dependencies": [
      "Some tests require external email/notification services",
      "Third-party integrations not available in test environment",
    ],
    "Complex UI Workflows": [
      "Multi-step user interactions requiring human judgment",
      "Business workflow validation beyond simple assertions",
    ],
  };

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Test Cases</span>
                </button>
                <div className="border-l border-gray-300 pl-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    AI Test Execution Report
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    PR #341: Salary history tracking and payroll dashboard •
                    Executed at {new Date().toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">
                      {executionSummary.passed} Passed
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">
                      {executionSummary.failed} Failed
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">
                      {executionSummary.skipped} Skipped
                    </span>
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                  <span>Re-run Failed Tests</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("summary")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "summary"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Executive Summary
            </button>
            <button
              onClick={() => setActiveTab("functional")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "functional"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Globe className="w-4 h-4 inline mr-2" />
              Functional Results
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                4
              </span>
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "performance"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Performance Results
              <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                3
              </span>
            </button>
            <button
              onClick={() => setActiveTab("unit")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "unit"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Unit Test Results
              <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                20
              </span>
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Executive Summary Tab */}
        {activeTab === "summary" && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Tests
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {executionSummary.totalTests}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {executionSummary.executed} executed
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      AI Executable
                    </p>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                      {executionSummary.aiExecutable}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round(
                        (executionSummary.aiExecutable /
                          executionSummary.totalTests) *
                          100
                      )}
                      % of total
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Settings className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Success Rate
                    </p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                      {Math.round(
                        (executionSummary.passed / executionSummary.executed) *
                          100
                      )}
                      %
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {executionSummary.passed}/{executionSummary.executed}{" "}
                      tests
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Execution Time
                    </p>
                    <p className="text-3xl font-bold text-purple-600 mt-2">
                      {executionSummary.executionTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Automated execution
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI vs Manual Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                AI Automation vs Manual Testing Breakdown
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-green-700">
                      AI-Executable Tests
                    </h4>
                    <span className="text-2xl font-bold text-green-600">
                      {executionSummary.aiExecutable}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-700">
                        Unit Tests (API, Logic, Calculations)
                      </span>
                      <span className="text-green-600 font-bold">15</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-700">
                        Performance Tests (JMeter)
                      </span>
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-700">
                        Basic Functional Tests
                      </span>
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-yellow-700">
                      Manual Testing Required
                    </h4>
                    <span className="text-2xl font-bold text-yellow-600">
                      {executionSummary.humanRequired}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium text-yellow-700">
                        Visual Verification
                      </span>
                      <span className="text-yellow-600 font-bold">3</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium text-yellow-700">
                        Environment Setup Issues
                      </span>
                      <span className="text-yellow-600 font-bold">2</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium text-yellow-700">
                        Complex UI Workflows
                      </span>
                      <span className="text-yellow-600 font-bold">1</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium text-yellow-700">
                        External Dependencies
                      </span>
                      <span className="text-yellow-600 font-bold">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Limitations Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Why AI Cannot Execute Certain Tests
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Object.entries(aiLimitationReasons).map(
                  ([category, reasons]) => (
                    <div key={category} className="space-y-3">
                      <h4 className="font-semibold text-gray-900">
                        {category}
                      </h4>
                      <div className="space-y-2">
                        {reasons.map((reason, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {reason}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Functional Test Results Tab */}
        {activeTab === "functional" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Functional Test Results
                </h2>
                <p className="text-gray-600 mt-1">
                  4 functional tests executed
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Test
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        AI Executed
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {functionalTestResults.map((test, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mr-3">
                              {test.id}
                            </span>
                            <span className="font-medium text-gray-900">
                              {test.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(test.status)}
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                                test.status
                              )}`}
                            >
                              {test.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                              test.aiExecuted
                                ? "text-green-700 bg-green-50"
                                : "text-red-700 bg-red-50"
                            }`}
                          >
                            {test.aiExecuted ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {test.time || test.estimatedTime || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {test.description}
                          {test.reason && (
                            <div className="text-xs text-yellow-600 mt-1">
                              Reason: {test.reason}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Performance Test Results Tab */}
        {activeTab === "performance" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Performance Test Results
                </h2>
                <p className="text-gray-600 mt-1">
                  3 JMeter performance tests executed
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {performanceTestResults.map((test, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                        {test.id}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {test.title}
                      </h3>
                      {getStatusIcon(test.status)}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium border ${getStatusColor(
                          test.status
                        )}`}
                      >
                        {test.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Duration:</strong> {test.time}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{test.description}</p>

                  {test.metrics && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">
                        Performance Metrics
                      </h4>
                      <p className="text-green-700 text-sm">{test.metrics}</p>
                    </div>
                  )}

                  {test.error && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">
                        Failure Details
                      </h4>
                      <p className="text-red-700 text-sm">{test.error}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unit Test Results Tab */}
        {activeTab === "unit" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Unit Test Results
                </h2>
                <p className="text-gray-600 mt-1">
                  20 unit tests across 4 files
                </p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Filter by File</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Test Case
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        File
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AI Executed
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {unitTestResults.map((test) => (
                      <tr
                        key={test.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <div className="flex items-center space-x-3">
                              <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {test.id}
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {test.title}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700 font-mono bg-gray-100 px-2 py-1 rounded">
                            {test.file}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(test.status)}
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                                test.status
                              )}`}
                            >
                              {test.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                              test.aiExecuted
                                ? "text-green-700 bg-green-50"
                                : "text-red-700 bg-red-50"
                            }`}
                          >
                            {test.aiExecuted ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {test.time || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {test.error && (
                            <div className="text-red-600">{test.error}</div>
                          )}
                          {test.reason && (
                            <div className="text-yellow-600">{test.reason}</div>
                          )}
                          {!test.error &&
                            !test.reason &&
                            test.status === "passed" && (
                              <div className="text-green-600">
                                Test passed successfully
                              </div>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestExecutionReport;

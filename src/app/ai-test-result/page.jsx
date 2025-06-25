"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  FileText,
  Play,
  Download,
  Eye,
  ChevronRight,
  BarChart3,
  Code,
  Globe,
  Zap,
  Target,
  Shield,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const TestCasesResults = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedTest, setExpandedTest] = useState(null);

  const testSummary = {
    functionalTests: 24,
    performanceTests: 8,
    unitTests: 45,
    totalCoverage: 87,
    estimatedRunTime: "12m 34s",
    riskScore: "Medium",
  };

  const functionalTests = [
    {
      id: "FT001",
      title: "Employee Salary History - Add New Entry",
      priority: "High",
      type: "Selenium WebDriver",
      description:
        "Verify that users can successfully add new salary history entries for employees",
      steps: [
        "Navigate to Employee Management page",
        'Search and select employee "Sarah Johnson"',
        'Click on "Salary History" tab',
        'Click "Add Salary Entry" button',
        'Fill in new salary: $98,000, effective date: 2024-07-01, reason: "Performance bonus"',
        'Click "Save" button',
        "Verify new entry appears in salary history table",
        "Verify current salary is updated in employee profile",
      ],
      expectedResult:
        "New salary entry is saved and visible in history with correct values",
      testData:
        "Employee ID: EMP001, Previous Salary: $95,000, New Salary: $98,000",
      automation: "selenium",
    },
    {
      id: "FT002",
      title: "Payroll Dashboard - Calculate Total Payroll",
      priority: "High",
      type: "End-to-End",
      description:
        "Verify payroll dashboard correctly calculates and displays total payroll amounts",
      steps: [
        "Navigate to Payroll Dashboard",
        'Verify "Total Employees" count displays 3',
        'Verify "Total Gross Pay" shows $21,783.34',
        'Verify "Total Net Pay" shows $16,337.50',
        'Verify "Total Taxes" shows $5,445.84',
        "Check individual employee payroll calculations",
        "Verify Sarah Johnson: Gross $9,416.67, Net $7,062.50",
        "Verify payroll status indicators are correct",
      ],
      expectedResult:
        "All payroll calculations are accurate and match expected values",
      testData: "December 2024 payroll data",
      automation: "selenium",
    },
    {
      id: "FT003",
      title: "Employee Form - Salary Field Validation",
      priority: "Medium",
      type: "UI Validation",
      description: "Verify salary input validation in employee form",
      steps: [
        "Navigate to Employee Form",
        "Attempt to enter negative salary value",
        "Verify error message appears",
        "Attempt to enter non-numeric characters",
        "Verify validation prevents submission",
        "Enter valid salary amount",
        "Verify form accepts valid input",
      ],
      expectedResult:
        "Form validates salary input correctly and shows appropriate error messages",
      testData: "Invalid: -1000, abc123; Valid: 75000",
      automation: "selenium",
    },
    {
      id: "FT004",
      title: "Database Migration - Salary History Table",
      priority: "High",
      type: "Database Integration",
      description: "Verify salary history table migration and data integrity",
      steps: [
        "Run database migration script",
        "Verify salary_history table is created",
        "Check table schema matches requirements",
        "Insert test salary history records",
        "Verify foreign key constraints work",
        "Test indexes are created correctly",
      ],
      expectedResult:
        "Salary history table is properly created with correct structure",
      testData: "Migration SQL and test data inserts",
      automation: "database",
    },
  ];

  const performanceTests = [
    {
      id: "PT001",
      title: "Payroll Dashboard Load Performance",
      type: "Load Testing",
      tool: "JMeter",
      scenario: "Concurrent users accessing payroll dashboard",
      users: 50,
      duration: "5 minutes",
      expectedResponse: "< 2 seconds",
      thresholds: {
        responseTime: "2000ms",
        throughput: "25 requests/sec",
        errorRate: "< 1%",
      },
    },
    {
      id: "PT002",
      title: "Employee Search API Performance",
      type: "API Load Testing",
      tool: "JMeter",
      scenario: "Multiple concurrent searches in employee directory",
      users: 100,
      duration: "10 minutes",
      expectedResponse: "< 500ms",
      thresholds: {
        responseTime: "500ms",
        throughput: "100 requests/sec",
        errorRate: "< 0.5%",
      },
    },
    {
      id: "PT003",
      title: "Salary History Query Performance",
      type: "Database Performance",
      tool: "JMeter + SQL",
      scenario: "Heavy salary history queries with joins",
      users: 25,
      duration: "3 minutes",
      expectedResponse: "< 1 second",
      thresholds: {
        responseTime: "1000ms",
        throughput: "50 queries/sec",
        errorRate: "< 0.1%",
      },
    },
  ];

  const unitTests = [
    {
      id: "UT001",
      file: "frontend/src/components/EmployeeForm.jsx",
      testCount: 8,
      coverage: 92,
      tests: [
        "should render employee form with all fields",
        "should handle salary state changes correctly",
        "should fetch salary history on employee load",
        "should validate required fields before submission",
        "should display salary history when available",
        "should handle API errors gracefully",
        "should update baseSalary when props change",
        "should call onSubmit with correct data structure",
      ],
    },
    {
      id: "UT002",
      file: "backend/routes/employee.js",
      testCount: 12,
      coverage: 89,
      tests: [
        "GET /employees should return employees with salary history",
        "should join salary_history table correctly",
        "should filter for most recent salary entries",
        "POST /employees/:id/salary should create new salary entry",
        "should validate required salary fields",
        "should return 400 for invalid salary data",
        "should return 404 for non-existent employee",
        "should update employee current salary reference",
        "should handle database connection errors",
        "should sanitize SQL injection attempts",
        "should require authentication for salary updates",
        "should log salary changes for audit trail",
      ],
    },
    {
      id: "UT003",
      file: "frontend/src/utils/salaryCalculations.js",
      testCount: 15,
      coverage: 95,
      tests: [
        "calculateGrossPay should sum base salary, overtime, and bonuses",
        "calculateTaxes should apply progressive tax rates correctly",
        "should calculate 15% tax for salaries <= $50,000",
        "should calculate tiered tax for salaries $50,001-$100,000",
        "should calculate highest tier for salaries > $100,000",
        "calculateDeductions should compute health insurance at 3%",
        "calculateDeductions should compute 401k at 5%",
        "should handle zero and negative salary inputs",
        "should round calculations to 2 decimal places",
        "should handle undefined/null input parameters",
        "should validate input parameter types",
        "should return correct net pay calculation",
        "should handle edge cases at tax bracket boundaries",
        "should maintain precision for large salary amounts",
        "should export all calculation functions properly",
      ],
    },
    {
      id: "UT004",
      file: "backend/controllers/payrollController.js",
      testCount: 10,
      coverage: 88,
      tests: [
        "getCurrentPayroll should fetch all employees with salary data",
        "should calculate taxes using progressive tax function",
        "should calculate deductions for each employee",
        "should compute net pay correctly (gross - taxes - deductions)",
        "should return proper JSON response structure",
        "should handle empty employee database",
        "should catch and handle database errors",
        "should return 500 status on server errors",
        "should validate employee salary data exists",
        "should format currency values correctly",
      ],
    },
  ];

  const toggleTestExpansion = (testId) => {
    setExpandedTest(expandedTest === testId ? null : testId);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Pull Request</span>
                </button>
                <div className="border-l border-gray-300 pl-4">
                  <h1 className="text-xl font-semibold text-gray-900">
                    AI Generated Test Cases
                  </h1>
                  <p className="text-sm text-gray-600">
                    PR #341: Salary history tracking and payroll dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4 inline mr-2" />
                  Export Tests
                </button>
                <Link href={"/test-execution-report"}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Play className="w-4 h-4 inline mr-2" />
                    Run All Tests
                  </button>
                </Link>
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
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("functional")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "functional"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Globe className="w-4 h-4 inline mr-2" />
              Functional Tests ({functionalTests.length})
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "performance"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Performance Tests ({performanceTests.length})
            </button>
            <button
              onClick={() => setActiveTab("unit")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "unit"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Unit Tests ({testSummary.unitTests})
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Functional Tests</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {testSummary.functionalTests}
                    </p>
                  </div>
                  <Globe className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Performance Tests</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {testSummary.performanceTests}
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Unit Tests</p>
                    <p className="text-2xl font-bold text-green-600">
                      {testSummary.unitTests}
                    </p>
                  </div>
                  <Code className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Coverage</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {testSummary.totalCoverage}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-indigo-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Est. Runtime</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {testSummary.estimatedRunTime}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Risk Score</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {testSummary.riskScore}
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* AI Analysis Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                AI Analysis Summary
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Code Changes Analyzed
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>
                      • 8 files modified across frontend, backend, and database
                    </li>
                    <li>• New salary history tracking functionality</li>
                    <li>• Payroll dashboard with complex calculations</li>
                    <li>• Database schema changes and migrations</li>
                    <li>• Authentication and authorization updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Test Strategy Recommendations
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Focus on salary calculation accuracy testing</li>
                    <li>• Validate database migration integrity</li>
                    <li>• Test performance under concurrent payroll access</li>
                    <li>• Verify security for salary data access</li>
                    <li>• Comprehensive UI testing for new dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Functional Tests Tab */}
        {activeTab === "functional" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Functional Test Cases
              </h2>
              <span className="text-sm text-gray-600">
                End-to-end Selenium automation scripts
              </span>
            </div>

            {functionalTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg border border-gray-200"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleTestExpansion(test.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-sm text-gray-500">
                        {test.id}
                      </span>
                      <h3 className="font-medium text-gray-900">
                        {test.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                          test.priority
                        )}`}
                      >
                        {test.priority}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {test.type}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${
                        expandedTest === test.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {test.description}
                  </p>
                </div>

                {expandedTest === test.id && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Test Steps
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                          {test.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Expected Result
                          </h4>
                          <p className="text-sm text-gray-600">
                            {test.expectedResult}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Test Data
                          </h4>
                          <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                            {test.testData}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Performance Tests Tab */}
        {activeTab === "performance" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Performance Test Scripts
              </h2>
              <span className="text-sm text-gray-600">
                JMeter load testing scenarios
              </span>
            </div>

            {performanceTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-sm text-gray-500">
                        {test.id}
                      </span>
                      <h3 className="font-medium text-gray-900">
                        {test.title}
                      </h3>
                      <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                        {test.tool}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {test.scenario}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Concurrent Users</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {test.users}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {test.duration}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Expected Response</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {test.expectedResponse}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {test.type}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Performance Thresholds
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">
                        Response Time
                      </span>
                      <span className="text-sm font-medium">
                        {test.thresholds.responseTime}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Throughput</span>
                      <span className="text-sm font-medium">
                        {test.thresholds.throughput}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Error Rate</span>
                      <span className="text-sm font-medium">
                        {test.thresholds.errorRate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Unit Tests Tab */}
        {activeTab === "unit" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Unit Test Cases
              </h2>
              <span className="text-sm text-gray-600">
                Code-level testing with coverage analysis
              </span>
            </div>

            {unitTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg border border-gray-200"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleTestExpansion(test.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-sm text-gray-500">
                        {test.id}
                      </span>
                      <h3 className="font-medium text-gray-900">{test.file}</h3>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                        {test.testCount} tests
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          test.coverage >= 90
                            ? "text-green-600 bg-green-100"
                            : test.coverage >= 80
                            ? "text-yellow-600 bg-yellow-100"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {test.coverage}% coverage
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${
                        expandedTest === test.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>

                {expandedTest === test.id && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Generated Test Cases
                      </h4>
                      <ul className="space-y-1">
                        {test.tests.map((testCase, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{testCase}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCasesResults;

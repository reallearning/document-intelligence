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
  ChevronDown,
  BarChart3,
  Code,
  Globe,
  Zap,
  Target,
  Shield,
  AlertTriangle,
  ArrowLeft,
  Settings,
  Filter,
} from "lucide-react";
import { useRouter } from "next/navigation";

const TestCasesResults = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedTest, setExpandedTest] = useState(null);
  const router = useRouter();

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
      estimatedTime: "3m 15s",
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
      estimatedTime: "4m 30s",
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
      estimatedTime: "2m 45s",
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
      estimatedTime: "1m 30s",
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
      title: "should render employee form with all fields",
      file: "frontend/src/components/EmployeeForm.jsx",
      type: "Component Rendering",
      priority: "High",
      description:
        "Verify that the EmployeeForm component renders all required input fields correctly",
      estimatedTime: "30s",
    },
    {
      id: "UT002",
      title: "should handle salary state changes correctly",
      file: "frontend/src/components/EmployeeForm.jsx",
      type: "State Management",
      priority: "High",
      description:
        "Test that salary input updates component state and triggers re-renders appropriately",
      estimatedTime: "45s",
    },
    {
      id: "UT003",
      title: "should fetch salary history on employee load",
      file: "frontend/src/components/EmployeeForm.jsx",
      type: "API Integration",
      priority: "High",
      description:
        "Verify useEffect hook calls salary history API when employee prop changes",
      estimatedTime: "1m",
    },
    {
      id: "UT004",
      title: "should validate required fields before submission",
      file: "frontend/src/components/EmployeeForm.jsx",
      type: "Form Validation",
      priority: "Medium",
      description:
        "Test form validation prevents submission when required fields are empty",
      estimatedTime: "1m 15s",
    },
    {
      id: "UT005",
      title: "should display salary history when available",
      file: "frontend/src/components/EmployeeForm.jsx",
      type: "Conditional Rendering",
      priority: "Medium",
      description: "Verify salary history section appears when data is loaded",
      estimatedTime: "45s",
    },
    {
      id: "UT006",
      title: "should handle API errors gracefully",
      file: "frontend/src/components/EmployeeForm.jsx",
      type: "Error Handling",
      priority: "High",
      description: "Test component behavior when salary history API call fails",
      estimatedTime: "1m",
    },
    {
      id: "UT007",
      title: "GET /employees should return employees with salary history",
      file: "backend/routes/employee.js",
      type: "API Endpoint",
      priority: "High",
      description:
        "Verify the employees endpoint returns correct data structure with salary information",
      estimatedTime: "1m 30s",
    },
    {
      id: "UT008",
      title: "should join salary_history table correctly",
      file: "backend/routes/employee.js",
      type: "Database Query",
      priority: "High",
      description:
        "Test SQL join logic retrieves most recent salary history entries",
      estimatedTime: "2m",
    },
    {
      id: "UT009",
      title: "POST /employees/:id/salary should create new salary entry",
      file: "backend/routes/employee.js",
      type: "API Endpoint",
      priority: "High",
      description:
        "Verify new salary entries are created with correct data validation",
      estimatedTime: "1m 45s",
    },
    {
      id: "UT010",
      title: "should validate required salary fields",
      file: "backend/routes/employee.js",
      type: "Input Validation",
      priority: "Medium",
      description:
        "Test API validates baseSalary, effectiveDate, and other required fields",
      estimatedTime: "1m",
    },
    {
      id: "UT011",
      title: "should return 400 for invalid salary data",
      file: "backend/routes/employee.js",
      type: "Error Response",
      priority: "Medium",
      description:
        "Verify appropriate HTTP status codes for validation failures",
      estimatedTime: "45s",
    },
    {
      id: "UT012",
      title: "should return 404 for non-existent employee",
      file: "backend/routes/employee.js",
      type: "Error Response",
      priority: "Medium",
      description:
        "Test API response when trying to update salary for invalid employee ID",
      estimatedTime: "30s",
    },
    {
      id: "UT013",
      title: "calculateGrossPay should sum base salary, overtime, and bonuses",
      file: "frontend/src/utils/salaryCalculations.js",
      type: "Pure Function",
      priority: "High",
      description: "Test gross pay calculation with various input combinations",
      estimatedTime: "45s",
    },
    {
      id: "UT014",
      title: "calculateTaxes should apply progressive tax rates correctly",
      file: "frontend/src/utils/salaryCalculations.js",
      type: "Business Logic",
      priority: "High",
      description: "Verify tax calculations for different salary brackets",
      estimatedTime: "2m",
    },
    {
      id: "UT015",
      title: "should calculate 15% tax for salaries <= $50,000",
      file: "frontend/src/utils/salaryCalculations.js",
      type: "Tax Calculation",
      priority: "High",
      description: "Test lower tax bracket calculation accuracy",
      estimatedTime: "30s",
    },
    {
      id: "UT016",
      title: "should calculate tiered tax for salaries $50,001-$100,000",
      file: "frontend/src/utils/salaryCalculations.js",
      type: "Tax Calculation",
      priority: "High",
      description: "Test middle tax bracket with progressive rates",
      estimatedTime: "45s",
    },
    {
      id: "UT017",
      title: "should calculate highest tier for salaries > $100,000",
      file: "frontend/src/utils/salaryCalculations.js",
      type: "Tax Calculation",
      priority: "High",
      description: "Test upper tax bracket calculation",
      estimatedTime: "30s",
    },
    {
      id: "UT018",
      title: "calculateDeductions should compute health insurance at 3%",
      file: "frontend/src/utils/salaryCalculations.js",
      type: "Deduction Calculation",
      priority: "Medium",
      description: "Verify health insurance deduction percentage calculation",
      estimatedTime: "30s",
    },
    {
      id: "UT019",
      title: "getCurrentPayroll should fetch all employees with salary data",
      file: "backend/controllers/payrollController.js",
      type: "Controller Logic",
      priority: "High",
      description:
        "Test payroll controller retrieves complete employee dataset",
      estimatedTime: "1m 30s",
    },
    {
      id: "UT020",
      title: "should calculate taxes using progressive tax function",
      file: "backend/controllers/payrollController.js",
      type: "Integration",
      priority: "High",
      description:
        "Verify controller integrates with tax calculation utilities",
      estimatedTime: "1m",
    },
  ];

  const toggleTestExpansion = (testId) => {
    setExpandedTest(expandedTest === testId ? null : testId);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-700 bg-red-50 border-red-200";
      case "Medium":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "Low":
        return "text-green-700 bg-green-50 border-green-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const handleClick = () => {
    router.push("/test-execution-report");
  };

  const getTypeColor = (type) => {
    const colors = {
      "Component Rendering": "text-blue-700 bg-blue-50",
      "State Management": "text-purple-700 bg-purple-50",
      "API Integration": "text-green-700 bg-green-50",
      "Form Validation": "text-orange-700 bg-orange-50",
      "Conditional Rendering": "text-indigo-700 bg-indigo-50",
      "Error Handling": "text-red-700 bg-red-50",
      "API Endpoint": "text-emerald-700 bg-emerald-50",
      "Database Query": "text-cyan-700 bg-cyan-50",
      "Input Validation": "text-orange-700 bg-orange-50",
      "Error Response": "text-red-700 bg-red-50",
      "Pure Function": "text-violet-700 bg-violet-50",
      "Business Logic": "text-pink-700 bg-pink-50",
      "Tax Calculation": "text-amber-700 bg-amber-50",
      "Deduction Calculation": "text-lime-700 bg-lime-50",
      "Controller Logic": "text-teal-700 bg-teal-50",
      Integration: "text-rose-700 bg-rose-50",
    };
    return colors[type] || "text-gray-700 bg-gray-50";
  };

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Pull Request</span>
                </button>
                <div className="border-l border-gray-300 pl-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    AI Generated Test Cases
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    PR #341: Salary history tracking and payroll dashboard •
                    Pre-execution review
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Configure</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export Tests</span>
                </button>
                <button
                  onClick={handleClick}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  <Play className="w-4 h-4" />
                  <span>Execute Test Cases</span>
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
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Overview
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
              Functional Tests
              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                {functionalTests.length}
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
              Performance Tests
              <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                {performanceTests.length}
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
              Unit Tests
              <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                {unitTests.length}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Functional Tests
                    </p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                      {testSummary.functionalTests}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      End-to-end scenarios
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Performance Tests
                    </p>
                    <p className="text-3xl font-bold text-purple-600 mt-2">
                      {testSummary.performanceTests}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Load & stress testing
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Unit Tests
                    </p>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                      {testSummary.unitTests}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Code-level testing
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Code className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Coverage
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">
                      {testSummary.totalCoverage}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Code coverage</p>
                  </div>
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <Target className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Est. Runtime
                    </p>
                    <p className="text-3xl font-bold text-orange-600 mt-2">
                      {testSummary.estimatedRunTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Total execution time
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Risk Score
                    </p>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">
                      {testSummary.riskScore}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Change complexity
                    </p>
                  </div>
                  <div className="p-3 ml-2 bg-yellow-100 rounded-lg">
                    <Shield className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                AI Analysis Summary
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Code Changes Analyzed
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      8 files modified across frontend, backend, and database
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      New salary history tracking functionality
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      Payroll dashboard with complex calculations
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      Database schema changes and migrations
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      Authentication and authorization updates
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-purple-600" />
                    Test Strategy Recommendations
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      Focus on salary calculation accuracy testing
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      Validate database migration integrity
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      Test performance under concurrent payroll access
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      Verify security for salary data access
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      Comprehensive UI testing for new dashboard
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Functional Tests Tab */}
        {activeTab === "functional" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Functional Test Cases
                </h2>
                <p className="text-gray-600 mt-1">
                  End-to-end Selenium automation scripts
                </p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Filter Tests</span>
              </button>
            </div>

            {functionalTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleTestExpansion(test.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
                        {test.id}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {test.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          test.priority
                        )}`}
                      >
                        {test.priority} Priority
                      </span>
                      <span className="text-xs text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                        {test.type}
                      </span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        ⏱️ {test.estimatedTime}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${
                        expandedTest === test.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <p className="text-gray-700 mt-3 leading-relaxed">
                    {test.description}
                  </p>
                </div>

                {expandedTest === test.id && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Test Steps
                        </h4>
                        <ol className="list-decimal list-inside space-y-2">
                          {test.steps.map((step, index) => (
                            <li
                              key={index}
                              className="text-gray-700 leading-relaxed"
                            >
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Expected Result
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            {test.expectedResult}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Test Data
                          </h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <code className="text-sm text-gray-800">
                              {test.testData}
                            </code>
                          </div>
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Performance Test Scripts
                </h2>
                <p className="text-gray-600 mt-1">
                  JMeter load testing scenarios
                </p>
              </div>
            </div>

            {performanceTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="font-mono text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md">
                        {test.id}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {test.title}
                      </h3>
                      <span className="text-xs text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                        {test.tool}
                      </span>
                    </div>
                    <p className="text-gray-700">{test.scenario}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium mb-1">
                      Concurrent Users
                    </p>
                    <p className="text-2xl font-bold text-blue-700">
                      {test.users}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <p className="text-xs text-purple-600 font-medium mb-1">
                      Duration
                    </p>
                    <p className="text-2xl font-bold text-purple-700">
                      {test.duration}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <p className="text-xs text-green-600 font-medium mb-1">
                      Expected Response
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {test.expectedResponse}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                    <p className="text-xs text-orange-600 font-medium mb-1">
                      Type
                    </p>
                    <p className="text-lg font-bold text-orange-700">
                      {test.type}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Performance Thresholds
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">
                        Response Time
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {test.thresholds.responseTime}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">
                        Throughput
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {test.thresholds.throughput}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">
                        Error Rate
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {test.thresholds.errorRate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Unit Tests Tab - Individual test cases as rows */}
        {activeTab === "unit" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Unit Test Cases
                </h2>
                <p className="text-gray-600 mt-1">
                  Individual test cases with code-level coverage analysis
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
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Est. Time
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {unitTests.map((test) => (
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
                              <h4 className="font-medium text-gray-900">
                                {test.title}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {test.description}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700 font-mono bg-gray-100 px-2 py-1 rounded">
                            {test.file.split("/").pop()}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {test.file.split("/").slice(0, -1).join("/")}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                              test.type
                            )}`}
                          >
                            {test.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                              test.priority
                            )}`}
                          >
                            {test.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {test.estimatedTime}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700">
                              <Play className="w-4 h-4" />
                            </button>
                          </div>
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

export default TestCasesResults;

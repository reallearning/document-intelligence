"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Filter,
  Search,
  Download,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  FileText,
  Code,
  Globe,
  Zap,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  User,
  Settings,
} from "lucide-react";

const TestResultsScreen = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedTest, setExpandedTest] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogs, setShowLogs] = useState({});

  // Test execution summary
  const executionSummary = {
    totalTests: 77,
    passed: 65,
    failed: 8,
    skipped: 4,
    duration: "18m 47s",
    startTime: "2024-06-20T14:30:15Z",
    endTime: "2024-06-20T14:49:02Z",
    environment: "staging",
    browser: "Chrome 125.0.6422.60",
    platform: "Ubuntu 22.04",
    executor: "GitHub Actions",
    coverage: 89.3,
  };

  // Functional test results
  const functionalResults = [
    {
      id: "FT001",
      title: "Employee Salary History - Add New Entry",
      status: "passed",
      duration: "12.4s",
      browser: "Chrome",
      timestamp: "2024-06-20T14:31:22Z",
      source: "brd",
      category: "business-workflow",
      steps: [
        {
          step: "Navigate to Employee Management page",
          status: "passed",
          duration: "1.2s",
        },
        {
          step: 'Search and select employee "Sarah Johnson"',
          status: "passed",
          duration: "2.1s",
        },
        {
          step: 'Click on "Salary History" tab',
          status: "passed",
          duration: "0.8s",
        },
        {
          step: 'Click "Add Salary Entry" button',
          status: "passed",
          duration: "0.5s",
        },
        {
          step: "Fill in new salary details",
          status: "passed",
          duration: "3.2s",
        },
        { step: 'Click "Save" button', status: "passed", duration: "1.8s" },
        {
          step: "Verify new entry appears in table",
          status: "passed",
          duration: "2.1s",
        },
        {
          step: "Verify current salary is updated",
          status: "passed",
          duration: "0.7s",
        },
      ],
      screenshots: 3,
      logs: `[14:31:22] INFO: Starting test execution
[14:31:23] INFO: Navigating to http://localhost:3000/employees
[14:31:24] INFO: Page loaded successfully (1.2s)
[14:31:24] INFO: Searching for employee: Sarah Johnson
[14:31:26] INFO: Employee found and selected (2.1s)
[14:31:27] INFO: Clicking Salary History tab
[14:31:27] INFO: Tab activated successfully (0.8s)
[14:31:28] INFO: Clicking Add Salary Entry button
[14:31:28] INFO: Form modal opened (0.5s)
[14:31:32] INFO: Filled salary form with $98,000, 2024-07-01, Performance bonus
[14:31:33] INFO: Clicking Save button
[14:31:35] INFO: Entry saved successfully (1.8s)
[14:31:37] INFO: Verified new entry in table with correct values
[14:31:38] INFO: Verified current salary updated to $98,000
[14:31:38] INFO: Test completed successfully`,
      assertions: [
        { description: "New salary entry visible in table", result: "passed" },
        { description: "Salary amount matches $98,000", result: "passed" },
        { description: "Effective date is 2024-07-01", result: "passed" },
        { description: "Current salary updated in profile", result: "passed" },
      ],
    },
    {
      id: "FT002",
      title: "Payroll Dashboard - Calculate Total Payroll",
      status: "failed",
      duration: "8.7s",
      browser: "Chrome",
      timestamp: "2024-06-20T14:32:15Z",
      source: "brd",
      category: "business-logic",
      error: 'AssertionError: expected "$21,783.34" to equal "$21,783.35"',
      steps: [
        {
          step: "Navigate to Payroll Dashboard",
          status: "passed",
          duration: "1.1s",
        },
        {
          step: 'Verify "Total Employees" count',
          status: "passed",
          duration: "0.3s",
        },
        {
          step: 'Verify "Total Gross Pay"',
          status: "failed",
          duration: "0.5s",
        },
        { step: 'Verify "Total Net Pay"', status: "skipped", duration: "0s" },
        { step: 'Verify "Total Taxes"', status: "skipped", duration: "0s" },
      ],
      screenshots: 2,
      logs: `[14:32:15] INFO: Starting test execution
[14:32:16] INFO: Navigating to http://localhost:3000/payroll
[14:32:17] INFO: Dashboard loaded successfully (1.1s)
[14:32:17] INFO: Verifying total employees count
[14:32:17] INFO: ✓ Total employees: 3 (correct)
[14:32:18] INFO: Verifying total gross pay
[14:32:18] ERROR: Total gross pay mismatch
[14:32:18] ERROR: Expected: $21,783.35
[14:32:18] ERROR: Actual: $21,783.34
[14:32:18] ERROR: Difference: $0.01 (rounding error)
[14:32:18] INFO: Test failed - skipping remaining steps`,
      assertions: [
        { description: "Total employees equals 3", result: "passed" },
        { description: "Total gross pay equals $21,783.34", result: "failed" },
        { description: "Total net pay equals $16,337.50", result: "skipped" },
        { description: "Total taxes equals $5,445.84", result: "skipped" },
      ],
    },
    {
      id: "FT003",
      title: "Employee Form - Salary Field Validation",
      status: "passed",
      duration: "6.2s",
      browser: "Chrome",
      timestamp: "2024-06-20T14:33:45Z",
      source: "brd",
      category: "validation",
      steps: [
        {
          step: "Navigate to Employee Form",
          status: "passed",
          duration: "0.9s",
        },
        {
          step: "Test negative salary validation",
          status: "passed",
          duration: "1.5s",
        },
        {
          step: "Test non-numeric validation",
          status: "passed",
          duration: "1.3s",
        },
        { step: "Test valid salary input", status: "passed", duration: "2.5s" },
      ],
      screenshots: 1,
      logs: `[14:33:45] INFO: Starting validation test
[14:33:46] INFO: Form loaded successfully
[14:33:47] INFO: Testing negative salary (-1000)
[14:33:48] INFO: ✓ Error message displayed correctly
[14:33:49] INFO: Testing non-numeric input (abc123)
[14:33:50] INFO: ✓ Validation prevents submission
[14:33:52] INFO: Testing valid salary (75000)
[14:33:52] INFO: ✓ Form accepts valid input
[14:33:52] INFO: All validations passed`,
      assertions: [
        { description: "Negative salary shows error", result: "passed" },
        { description: "Non-numeric input blocked", result: "passed" },
        { description: "Valid salary accepted", result: "passed" },
        { description: "Submit button state correct", result: "passed" },
      ],
    },
    {
      id: "FT004",
      title: "Database Migration - Salary History Table",
      status: "passed",
      duration: "4.1s",
      browser: "N/A",
      timestamp: "2024-06-20T14:34:30Z",
      source: "code",
      category: "integration",
      steps: [
        { step: "Run migration script", status: "passed", duration: "1.2s" },
        { step: "Verify table creation", status: "passed", duration: "0.5s" },
        { step: "Check schema structure", status: "passed", duration: "0.8s" },
        {
          step: "Test foreign key constraints",
          status: "passed",
          duration: "1.1s",
        },
        { step: "Verify indexes created", status: "passed", duration: "0.5s" },
      ],
      logs: `[14:34:30] INFO: Starting database migration test
[14:34:31] INFO: Executing migration V1.1__Create_Salary_History_Table.sql
[14:34:32] INFO: ✓ Table salary_history created successfully
[14:34:33] INFO: ✓ All required columns present with correct types
[14:34:34] INFO: ✓ Foreign key constraints working
[14:34:34] INFO: ✓ Indexes created on employee_id and effective_date
[14:34:34] INFO: Migration test completed successfully`,
      assertions: [
        { description: "Table created with correct schema", result: "passed" },
        { description: "Foreign keys enforced", result: "passed" },
        { description: "Indexes created correctly", result: "passed" },
      ],
    },
  ];

  // Performance test results
  const performanceResults = [
    {
      id: "PT001",
      title: "Payroll Dashboard Load Performance",
      status: "passed",
      duration: "5m 30s",
      source: "brd",
      category: "load-testing",
      users: 50,
      totalRequests: 2847,
      successRate: 99.7,
      avgResponseTime: 1247,
      maxResponseTime: 3421,
      minResponseTime: 245,
      throughput: 8.6,
      errorCount: 9,
      thresholds: {
        responseTime: { limit: 2000, actual: 1247, status: "passed" },
        throughput: { limit: 25, actual: 8.6, status: "failed" },
        errorRate: { limit: 1, actual: 0.3, status: "passed" },
      },
      timeline: [
        { time: "00:30", users: 10, avgResponse: 892, throughput: 12.4 },
        { time: "01:00", users: 20, avgResponse: 1034, throughput: 11.8 },
        { time: "01:30", users: 30, avgResponse: 1156, throughput: 10.2 },
        { time: "02:00", users: 40, avgResponse: 1298, throughput: 9.1 },
        { time: "02:30", users: 50, avgResponse: 1432, throughput: 8.3 },
        { time: "03:00", users: 50, avgResponse: 1387, throughput: 8.8 },
        { time: "03:30", users: 50, avgResponse: 1205, throughput: 9.4 },
        { time: "04:00", users: 50, avgResponse: 1123, throughput: 9.7 },
        { time: "04:30", users: 50, avgResponse: 1089, throughput: 9.8 },
        { time: "05:00", users: 50, avgResponse: 1067, throughput: 9.9 },
      ],
      errors: [
        { type: "Connection timeout", count: 5, percentage: 0.18 },
        { type: "HTTP 503", count: 3, percentage: 0.11 },
        { type: "HTTP 502", count: 1, percentage: 0.04 },
      ],
    },
    {
      id: "PT002",
      title: "Employee Search API Performance",
      status: "passed",
      duration: "10m 15s",
      source: "code",
      category: "api-performance",
      users: 100,
      totalRequests: 12453,
      successRate: 99.9,
      avgResponseTime: 387,
      maxResponseTime: 1247,
      minResponseTime: 89,
      throughput: 20.3,
      errorCount: 12,
      thresholds: {
        responseTime: { limit: 500, actual: 387, status: "passed" },
        throughput: { limit: 100, actual: 20.3, status: "failed" },
        errorRate: { limit: 0.5, actual: 0.1, status: "passed" },
      },
      timeline: [
        { time: "01:00", users: 20, avgResponse: 298, throughput: 18.4 },
        { time: "02:00", users: 40, avgResponse: 324, throughput: 19.8 },
        { time: "03:00", users: 60, avgResponse: 356, throughput: 20.1 },
        { time: "04:00", users: 80, avgResponse: 389, throughput: 20.5 },
        { time: "05:00", users: 100, avgResponse: 412, throughput: 20.8 },
        { time: "06:00", users: 100, avgResponse: 398, throughput: 20.6 },
        { time: "07:00", users: 100, avgResponse: 385, throughput: 20.4 },
        { time: "08:00", users: 100, avgResponse: 371, throughput: 20.1 },
        { time: "09:00", users: 100, avgResponse: 363, throughput: 19.9 },
        { time: "10:00", users: 100, avgResponse: 358, throughput: 19.7 },
      ],
    },
    {
      id: "PT003",
      title: "Salary History Query Performance",
      status: "failed",
      duration: "3m 45s",
      source: "brd",
      category: "database-performance",
      users: 25,
      totalRequests: 1834,
      successRate: 94.2,
      avgResponseTime: 1847,
      maxResponseTime: 8934,
      minResponseTime: 234,
      throughput: 8.1,
      errorCount: 106,
      thresholds: {
        responseTime: { limit: 1000, actual: 1847, status: "failed" },
        throughput: { limit: 50, actual: 8.1, status: "failed" },
        errorRate: { limit: 0.1, actual: 5.8, status: "failed" },
      },
      errors: [
        { type: "Query timeout", count: 89, percentage: 4.9 },
        { type: "Connection pool exhausted", count: 12, percentage: 0.7 },
        { type: "Deadlock detected", count: 5, percentage: 0.3 },
      ],
      timeline: [
        { time: "00:30", users: 5, avgResponse: 456, throughput: 12.3 },
        { time: "01:00", users: 10, avgResponse: 789, throughput: 11.1 },
        { time: "01:30", users: 15, avgResponse: 1234, throughput: 9.8 },
        { time: "02:00", users: 20, avgResponse: 1876, throughput: 8.4 },
        { time: "02:30", users: 25, avgResponse: 2341, throughput: 7.1 },
        { time: "03:00", users: 25, avgResponse: 2145, throughput: 7.8 },
        { time: "03:30", users: 25, avgResponse: 1987, throughput: 8.2 },
      ],
    },
  ];

  // Unit test results
  const unitResults = [
    {
      file: "EmployeeForm.test.jsx",
      passed: 7,
      failed: 1,
      skipped: 0,
      coverage: 92.3,
      duration: "2.1s",
      tests: [
        {
          name: "should render employee form with all fields",
          status: "passed",
          duration: "245ms",
          source: "code",
          type: "component",
        },
        {
          name: "should handle salary state changes correctly",
          status: "passed",
          duration: "387ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should fetch salary history on employee load",
          status: "failed",
          duration: "156ms",
          error: "Network request failed",
          source: "brd",
          type: "business",
        },
        {
          name: "should validate required fields before submission",
          status: "passed",
          duration: "298ms",
          source: "code",
          type: "validation",
        },
        {
          name: "should display salary history when available",
          status: "passed",
          duration: "176ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should handle API errors gracefully",
          status: "passed",
          duration: "423ms",
          source: "code",
          type: "error",
        },
        {
          name: "should update baseSalary when props change",
          status: "passed",
          duration: "134ms",
          source: "code",
          type: "component",
        },
        {
          name: "should call onSubmit with correct data structure",
          status: "passed",
          duration: "289ms",
          source: "code",
          type: "component",
        },
      ],
    },
    {
      file: "employee.test.js",
      passed: 11,
      failed: 1,
      skipped: 0,
      coverage: 89.1,
      duration: "3.4s",
      tests: [
        {
          name: "should return employees with salary history",
          status: "passed",
          duration: "456ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should join salary_history table correctly",
          status: "passed",
          duration: "234ms",
          source: "code",
          type: "technical",
        },
        {
          name: "should filter for most recent salary entries",
          status: "passed",
          duration: "345ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should create new salary entry",
          status: "passed",
          duration: "567ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should validate required salary fields",
          status: "passed",
          duration: "189ms",
          source: "brd",
          type: "validation",
        },
        {
          name: "should return 400 for invalid salary data",
          status: "passed",
          duration: "123ms",
          source: "brd",
          type: "validation",
        },
        {
          name: "should return 404 for non-existent employee",
          status: "passed",
          duration: "98ms",
          source: "code",
          type: "error",
        },
        {
          name: "should update employee current salary reference",
          status: "failed",
          duration: "287ms",
          error: "Constraint violation",
          source: "brd",
          type: "business",
        },
        {
          name: "should handle database connection errors",
          status: "passed",
          duration: "145ms",
          source: "code",
          type: "error",
        },
        {
          name: "should sanitize SQL injection attempts",
          status: "passed",
          duration: "267ms",
          source: "code",
          type: "security",
        },
        {
          name: "should require authentication for salary updates",
          status: "passed",
          duration: "178ms",
          source: "brd",
          type: "security",
        },
        {
          name: "should log salary changes for audit trail",
          status: "passed",
          duration: "534ms",
          source: "brd",
          type: "compliance",
        },
      ],
    },
    {
      file: "salaryCalculations.test.js",
      passed: 15,
      failed: 0,
      skipped: 0,
      coverage: 98.7,
      duration: "1.8s",
      tests: [
        {
          name: "should sum base salary, overtime, and bonuses",
          status: "passed",
          duration: "67ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should apply progressive tax rates correctly",
          status: "passed",
          duration: "89ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should calculate 15% tax for salaries <= $50,000",
          status: "passed",
          duration: "45ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should calculate tiered tax for salaries $50,001-$100,000",
          status: "passed",
          duration: "78ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should calculate highest tier for salaries > $100,000",
          status: "passed",
          duration: "56ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should compute health insurance at 3%",
          status: "passed",
          duration: "34ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should compute 401k at 5%",
          status: "passed",
          duration: "41ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should handle zero and negative salary inputs",
          status: "passed",
          duration: "123ms",
          source: "code",
          type: "validation",
        },
        {
          name: "should round calculations to 2 decimal places",
          status: "passed",
          duration: "87ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should handle undefined/null input parameters",
          status: "passed",
          duration: "156ms",
          source: "code",
          type: "error",
        },
        {
          name: "should validate input parameter types",
          status: "passed",
          duration: "198ms",
          source: "code",
          type: "validation",
        },
        {
          name: "should return correct net pay calculation",
          status: "passed",
          duration: "145ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should handle edge cases at tax bracket boundaries",
          status: "passed",
          duration: "234ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should maintain precision for large salary amounts",
          status: "passed",
          duration: "167ms",
          source: "code",
          type: "technical",
        },
        {
          name: "should export all calculation functions properly",
          status: "passed",
          duration: "78ms",
          source: "code",
          type: "technical",
        },
      ],
    },
    {
      file: "payrollController.test.js",
      passed: 6,
      failed: 4,
      skipped: 0,
      coverage: 76.4,
      duration: "4.2s",
      tests: [
        {
          name: "should fetch all employees with salary data",
          status: "passed",
          duration: "567ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should calculate taxes using progressive tax function",
          status: "passed",
          duration: "234ms",
          source: "brd",
          type: "business",
        },
        {
          name: "should calculate deductions for each employee",
          status: "failed",
          duration: "345ms",
          error: "Calculation mismatch",
          source: "brd",
          type: "business",
        },
        {
          name: "should compute net pay correctly",
          status: "failed",
          duration: "423ms",
          error: "Rounding error",
          source: "brd",
          type: "business",
        },
        {
          name: "should return proper JSON response structure",
          status: "passed",
          duration: "156ms",
          source: "code",
          type: "technical",
        },
        {
          name: "should handle empty employee database",
          status: "passed",
          duration: "89ms",
          source: "code",
          type: "edge",
        },
        {
          name: "should catch and handle database errors",
          status: "failed",
          duration: "287ms",
          error: "Error not caught",
          source: "code",
          type: "error",
        },
        {
          name: "should return 500 status on server errors",
          status: "passed",
          duration: "134ms",
          source: "code",
          type: "error",
        },
        {
          name: "should validate employee salary data exists",
          status: "failed",
          duration: "198ms",
          error: "Validation bypass",
          source: "brd",
          type: "validation",
        },
        {
          name: "should format currency values correctly",
          status: "passed",
          duration: "245ms",
          source: "brd",
          type: "business",
        },
      ],
    },
  ];

  const toggleTestExpansion = (testId) => {
    setExpandedTest(expandedTest === testId ? null : testId);
  };

  const toggleLogs = (testId) => {
    setShowLogs((prev) => ({
      ...prev,
      [testId]: !prev[testId],
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "skipped":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "passed":
        return "text-green-600 bg-green-100";
      case "failed":
        return "text-red-600 bg-red-100";
      case "skipped":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getSourceIcon = (source) => {
    return source === "brd" ? (
      <FileText className="w-3 h-3" />
    ) : (
      <Code className="w-3 h-3" />
    );
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "business-workflow":
        return "text-blue-600 bg-blue-100";
      case "business-logic":
        return "text-indigo-600 bg-indigo-100";
      case "validation":
        return "text-orange-600 bg-orange-100";
      case "integration":
        return "text-purple-600 bg-purple-100";
      case "load-testing":
        return "text-red-600 bg-red-100";
      case "api-performance":
        return "text-green-600 bg-green-100";
      case "database-performance":
        return "text-yellow-600 bg-yellow-100";
      case "business":
        return "text-blue-600 bg-blue-100";
      case "technical":
        return "text-purple-600 bg-purple-100";
      case "security":
        return "text-red-600 bg-red-100";
      case "error":
        return "text-yellow-600 bg-yellow-100";
      case "compliance":
        return "text-indigo-600 bg-indigo-100";
      case "component":
        return "text-green-600 bg-green-100";
      case "edge":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTestTypeColor = (type) => {
    switch (type) {
      case "business":
        return "text-blue-600 bg-blue-100";
      case "validation":
        return "text-orange-600 bg-orange-100";
      case "security":
        return "text-red-600 bg-red-100";
      case "error":
        return "text-yellow-600 bg-yellow-100";
      case "technical":
        return "text-purple-600 bg-purple-100";
      case "compliance":
        return "text-indigo-600 bg-indigo-100";
      case "component":
        return "text-green-600 bg-green-100";
      case "edge":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const filteredFunctionalResults = functionalResults.filter((test) => {
    const matchesFilter =
      filterStatus === "all" || test.status === filterStatus;
    const matchesSource =
      filterSource === "all" || test.source === filterSource;
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSource && matchesSearch;
  });

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Test Execution Results
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Run #{executionSummary.executor} •{" "}
                  {executionSummary.environment} •{" "}
                  {new Date(executionSummary.startTime).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4 inline mr-2" />
                  Export Report
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Re-run Tests
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tests</p>
                <p className="text-3xl font-bold text-gray-900">
                  {executionSummary.totalTests}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Duration: {executionSummary.duration}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Passed</p>
                <p className="text-3xl font-bold text-green-600">
                  {executionSummary.passed}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {(
                    (executionSummary.passed / executionSummary.totalTests) *
                    100
                  ).toFixed(1)}
                  % success rate
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-3xl font-bold text-red-600">
                  {executionSummary.failed}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {(
                    (executionSummary.failed / executionSummary.totalTests) *
                    100
                  ).toFixed(1)}
                  % failure rate
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Coverage</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {executionSummary.coverage}%
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Code coverage achieved
                </p>
              </div>
              <Target className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
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
                Functional ({functionalResults.length})
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
                Performance ({performanceResults.length})
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
                Unit (
                {unitResults.reduce(
                  (sum, file) => sum + file.passed + file.failed + file.skipped,
                  0
                )}
                )
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Execution Timeline */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Execution Timeline
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Started:</span>
                      <span className="font-mono">
                        {new Date(executionSummary.startTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-mono">
                        {new Date(executionSummary.endTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-mono font-medium">
                        {executionSummary.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Environment:</span>
                      <span className="font-mono">
                        {executionSummary.environment}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Platform:</span>
                      <span className="font-mono">
                        {executionSummary.platform}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Test Distribution */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Source Distribution
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-600 flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          BRD-Based
                        </span>
                        <span className="text-sm font-medium text-blue-700">
                          {functionalResults.filter((t) => t.source === "brd")
                            .length +
                            performanceResults.filter((t) => t.source === "brd")
                              .length +
                            unitResults.reduce(
                              (sum, file) =>
                                sum +
                                file.tests.filter((t) => t.source === "brd")
                                  .length,
                              0
                            )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-600 flex items-center">
                          <Code className="w-4 h-4 mr-1" />
                          Code-Based
                        </span>
                        <span className="text-sm font-medium text-purple-700">
                          {functionalResults.filter((t) => t.source === "code")
                            .length +
                            performanceResults.filter(
                              (t) => t.source === "code"
                            ).length +
                            unitResults.reduce(
                              (sum, file) =>
                                sum +
                                file.tests.filter((t) => t.source === "code")
                                  .length,
                              0
                            )}
                        </span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Business Logic Focus</span>
                          <span>
                            {Math.round(
                              (unitResults.reduce(
                                (sum, file) =>
                                  sum +
                                  file.tests.filter(
                                    (t) => t.type === "business"
                                  ).length,
                                0
                              ) /
                                unitResults.reduce(
                                  (sum, file) => sum + file.tests.length,
                                  0
                                )) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Status Distribution
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-600">Passed</span>
                        <span className="text-sm font-medium text-green-600">
                          {executionSummary.passed}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-red-600">Failed</span>
                        <span className="text-sm font-medium text-red-600">
                          {executionSummary.failed}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-yellow-600">Skipped</span>
                        <span className="text-sm font-medium text-yellow-600">
                          {executionSummary.skipped}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Coverage by File
                    </h4>
                    <div className="space-y-3">
                      {unitResults.map((file, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-gray-600 truncate">
                            {file.file.split("/").pop()}
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              file.coverage >= 90
                                ? "text-green-600"
                                : file.coverage >= 80
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {file.coverage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Functional Tests Tab */}
            {activeTab === "functional" && (
              <div className="space-y-4">
                {/* Filters */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tests..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="passed">Passed</option>
                      <option value="failed">Failed</option>
                      <option value="skipped">Skipped</option>
                    </select>
                    <select
                      value={filterSource}
                      onChange={(e) => setFilterSource(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Sources</option>
                      <option value="brd">BRD-Based</option>
                      <option value="code">Code-Based</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-600">
                    Showing {filteredFunctionalResults.length} of{" "}
                    {functionalResults.length} tests
                  </div>
                </div>

                {/* Test Results */}
                {filteredFunctionalResults.map((test) => (
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
                          {getStatusIcon(test.status)}
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {test.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {test.id} • {test.duration} • {test.browser}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                              test.status
                            )}`}
                          >
                            {test.status.toUpperCase()}
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 text-gray-400 transform transition-transform ${
                            expandedTest === test.id ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                      {test.error && (
                        <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-700">
                          <strong>Error:</strong> {test.error}
                        </div>
                      )}
                    </div>

                    {expandedTest === test.id && (
                      <div className="px-4 pb-4 border-t border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                          {/* Test Steps */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">
                              Test Steps
                            </h4>
                            <div className="space-y-2">
                              {test.steps.map((step, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                                >
                                  {getStatusIcon(step.status)}
                                  <span className="text-sm text-gray-700 flex-1">
                                    {step.step}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {step.duration}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Assertions */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">
                              Assertions
                            </h4>
                            <div className="space-y-2">
                              {test.assertions.map((assertion, index) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
                                >
                                  {getStatusIcon(assertion.result)}
                                  <span className="text-sm text-gray-700">
                                    {assertion.description}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Logs Section */}
                        {test.logs && (
                          <div className="mt-6 border-t border-gray-100 pt-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900">
                                Execution Logs
                              </h4>
                              <button
                                onClick={() => toggleLogs(test.id)}
                                className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200"
                              >
                                {showLogs[test.id] ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                                <span>
                                  {showLogs[test.id]
                                    ? "Hide Logs"
                                    : "Show Logs"}
                                </span>
                              </button>
                            </div>

                            {showLogs[test.id] && (
                              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-64">
                                <pre className="text-xs whitespace-pre-wrap">
                                  {test.logs}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Additional Info */}
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            {test.screenshots > 0 && (
                              <span>📸 {test.screenshots} screenshots</span>
                            )}
                            <span>
                              🕒 {new Date(test.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-800">
                            View Full Report →
                          </button>
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
                {performanceResults.map((test) => (
                  <div
                    key={test.id}
                    className="bg-white rounded-lg border border-gray-200 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(test.status)}
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {test.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {test.id} • {test.duration} • {test.users} users
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                              test.status
                            )}`}
                          >
                            {test.status.toUpperCase()}
                          </span>
                          <span
                            className={`text-xs px-1 py-0.5 rounded flex items-center ${
                              test.source === "brd"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {getSourceIcon(test.source)}
                            <span className="ml-1">
                              {test.source.toUpperCase()}
                            </span>
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${getCategoryColor(
                              test.category
                            )}`}
                          >
                            {test.category
                              .replace("-", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">
                          Avg Response Time
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {test.avgResponseTime}ms
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">Throughput</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {test.throughput} req/s
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">Success Rate</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {test.successRate}%
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded">
                        <p className="text-xs text-gray-500">Total Requests</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {test.totalRequests.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Thresholds */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Performance Thresholds
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(test.thresholds).map(
                          ([key, threshold]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center p-3 bg-gray-50 rounded"
                            >
                              <div>
                                <p className="text-sm text-gray-600 capitalize">
                                  {key.replace(/([A-Z])/g, " $1")}
                                </p>
                                <p className="text-sm font-medium">
                                  {threshold.actual}
                                  {key === "responseTime"
                                    ? "ms"
                                    : key === "throughput"
                                    ? " req/s"
                                    : "%"}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">
                                  Limit: {threshold.limit}
                                  {key === "responseTime"
                                    ? "ms"
                                    : key === "throughput"
                                    ? " req/s"
                                    : "%"}
                                </span>
                                {getStatusIcon(threshold.status)}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Timeline Chart Placeholder */}
                    {test.timeline && (
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Performance Timeline
                        </h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 mb-2">
                            Response Time Over Duration
                          </div>
                          <div className="h-32 flex items-end space-x-1">
                            {test.timeline.map((point, index) => (
                              <div
                                key={index}
                                className="flex-1 bg-blue-500 rounded-t"
                                style={{
                                  height: `${
                                    (point.avgResponse /
                                      Math.max(
                                        ...test.timeline.map(
                                          (p) => p.avgResponse
                                        )
                                      )) *
                                    100
                                  }%`,
                                  minHeight: "4px",
                                }}
                                title={`${point.time}: ${point.avgResponse}ms`}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Start</span>
                            <span>End</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Errors */}
                    {test.errors && test.errors.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Error Breakdown
                        </h4>
                        <div className="space-y-2">
                          {test.errors.map((error, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 bg-red-50 rounded"
                            >
                              <span className="text-sm text-red-700">
                                {error.type}
                              </span>
                              <div className="text-sm text-red-600">
                                {error.count} ({error.percentage}%)
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Unit Tests Tab */}
            {activeTab === "unit" && (
              <div className="space-y-4">
                {unitResults.map((file, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200"
                  >
                    <div
                      className="p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleTestExpansion(file.file)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {file.failed > 0 ? (
                              <XCircle className="w-5 h-5 text-red-500" />
                            ) : (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {file.file}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {file.passed} passed, {file.failed} failed,{" "}
                                {file.skipped} skipped • {file.duration}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              file.coverage >= 90
                                ? "text-green-600 bg-green-100"
                                : file.coverage >= 80
                                ? "text-yellow-600 bg-yellow-100"
                                : "text-red-600 bg-red-100"
                            }`}
                          >
                            {file.coverage}% coverage
                          </span>
                        </div>
                        <ChevronRight
                          className={`w-5 h-5 text-gray-400 transform transition-transform ${
                            expandedTest === file.file ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {expandedTest === file.file && (
                      <div className="px-4 pb-4 border-t border-gray-100">
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900 mb-3">
                            Individual Tests
                          </h4>
                          <div className="space-y-2">
                            {file.tests.map((test, testIndex) => (
                              <div
                                key={testIndex}
                                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                              >
                                <div className="flex items-center space-x-3">
                                  {getStatusIcon(test.status)}
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`text-xs px-1 py-0.5 rounded ${
                                        test.source === "brd"
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-purple-100 text-purple-700"
                                      }`}
                                    >
                                      {getSourceIcon(test.source)}
                                    </span>
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded ${getTestTypeColor(
                                        test.type
                                      )}`}
                                    >
                                      {test.type}
                                    </span>
                                  </div>
                                  <span className="text-sm text-gray-700">
                                    {test.name}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  {test.error && (
                                    <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                                      {test.error}
                                    </span>
                                  )}
                                  <span className="text-xs text-gray-500">
                                    {test.duration}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultsScreen;

"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Download,
  Eye,
  RefreshCw,
  BarChart3,
  PieChart,
} from "lucide-react";

const TestCompletionReport = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Test execution results
  const testResults = {
    "Unit & Component": {
      total: 4,
      passed: 4,
      failed: 0,
      duration: "3.2s",
      tests: [
        {
          id: "U-01",
          name: "Credits math calculation",
          status: "passed",
          duration: "0.8s",
          message:
            'Monthly pool calculation returned expected Decimal "305.43"',
        },
        {
          id: "U-02",
          name: "Dental eligibility cutoff",
          status: "passed",
          duration: "0.7s",
          message: "Correctly returned False for DOJ 2020 employee",
        },
        {
          id: "U-03",
          name: "GTL coverage cap logic",
          status: "passed",
          duration: "0.9s",
          message: "Coverage properly capped at 4,000,000 MYR",
        },
        {
          id: "U-04",
          name: "FTH vacation cost divisor",
          status: "passed",
          duration: "0.8s",
          message: "Divisor 12 correctly applied for FTH employees",
        },
      ],
    },
    "Backend Integration": {
      total: 3,
      passed: 2,
      failed: 1,
      duration: "8.7s",
      tests: [
        {
          id: "B-01",
          name: "Salary freeze batch processing",
          status: "passed",
          duration: "3.2s",
          message:
            "All 1,247 employees successfully processed, frozen_salary3 populated",
        },
        {
          id: "B-02",
          name: "Payroll credits CSV export",
          status: "failed",
          duration: "2.1s",
          message: "Export failed: Database connection timeout after 30s",
        },
        {
          id: "B-03",
          name: "Annual UW sweep",
          status: "passed",
          duration: "3.4s",
          message: "23 employees aged 64+ queued for underwriting review",
        },
      ],
    },
    API: {
      total: 4,
      passed: 4,
      failed: 0,
      duration: "2.8s",
      tests: [
        {
          id: "A-01",
          name: "Vacation 6-day validation",
          status: "passed",
          duration: "0.6s",
          message: 'HTTP 400 returned with correct error "Max 5 days"',
        },
        {
          id: "A-02",
          name: "Valid vacation purchase",
          status: "passed",
          duration: "0.8s",
          message: "HTTP 200, payroll_deduct correctly updated",
        },
        {
          id: "A-03",
          name: "Dental eligibility check",
          status: "passed",
          duration: "0.7s",
          message: 'HTTP 404 "Not Eligible" for DOJ 2020 employee',
        },
        {
          id: "A-04",
          name: "Medical disability event",
          status: "passed",
          duration: "0.7s",
          message: 'MED_DIS entry created with uw_status="PENDING"',
        },
      ],
    },
    Performance: {
      total: 2,
      passed: 1,
      failed: 1,
      duration: "62.4s",
      tests: [
        {
          id: "P-01",
          name: "Vacation API 200 RPS load test",
          status: "failed",
          duration: "60.2s",
          message: "p95: 347ms (exceeds 300ms limit), 0.2% error rate",
        },
        {
          id: "P-02",
          name: "Credits bulk processing 20k",
          status: "passed",
          duration: "1.8s",
          message: "20,000 operations completed in 1.79s, 11,173 ops/sec",
        },
      ],
    },
    Security: {
      total: 1,
      passed: 1,
      failed: 0,
      duration: "1.1s",
      tests: [
        {
          id: "S-01",
          name: "Unauthorized API access",
          status: "passed",
          duration: "1.1s",
          message: "All unauthorized requests correctly returned HTTP 401",
        },
      ],
    },
    Reporting: {
      total: 1,
      passed: 1,
      failed: 0,
      duration: "4.3s",
      tests: [
        {
          id: "R-01",
          name: "Credits utilization report",
          status: "passed",
          duration: "4.3s",
          message: "Cash-out and deduct sums reconciled, variance < 0.01 MYR",
        },
      ],
    },
    "Visual UI": {
      total: 4,
      passed: 3,
      failed: 1,
      duration: "15.2s",
      tests: [
        {
          id: "V-01",
          name: "Login page visual regression",
          status: "passed",
          duration: "3.8s",
          message: "97.2% visual similarity with baseline",
        },
        {
          id: "V-02",
          name: "Benefits dashboard layout",
          status: "passed",
          duration: "4.1s",
          message: "98.7% visual similarity, responsive breakpoints verified",
        },
        {
          id: "V-03",
          name: "Vacation purchase flow",
          status: "failed",
          duration: "3.6s",
          message: "89.3% similarity - button alignment issues detected",
        },
        {
          id: "V-04",
          name: "Employee profile responsiveness",
          status: "passed",
          duration: "3.7s",
          message: "96.1% similarity across all tested viewports",
        },
      ],
    },
    Functional: {
      total: 10,
      passed: 9,
      failed: 1,
      duration: "18.6s",
      tests: [
        {
          id: "F-01",
          name: "Add salary entry (Sarah Johnson)",
          status: "passed",
          duration: "2.1s",
          message: "Salary entry saved, profile updated to 98,000 MYR",
        },
        {
          id: "F-02",
          name: "Valid vacation purchase ≤5 days",
          status: "passed",
          duration: "1.8s",
          message: "Success toast shown, credits reduced by 375 MYR",
        },
        {
          id: "F-03",
          name: "Vacation purchase >5 days blocked",
          status: "passed",
          duration: "1.6s",
          message: 'Error "Max 5 days" displayed, no BenefitCost entry created',
        },
        {
          id: "F-04",
          name: "Working-couple spouse validation",
          status: "passed",
          duration: "1.9s",
          message: "Form error correctly shown for spouse working at MalayComp",
        },
        {
          id: "F-05",
          name: "Working-couple exemption",
          status: "passed",
          duration: "1.7s",
          message: "Exempt employee ZZ037I778 successfully added spouse",
        },
        {
          id: "F-06",
          name: "Medical UW for age 76+",
          status: "passed",
          duration: "2.0s",
          message: 'Badge "Pending Underwriting" shown, cost 0 MYR',
        },
        {
          id: "F-07",
          name: "Dental hidden for DOJ 2020",
          status: "passed",
          duration: "1.5s",
          message: "Dental card correctly hidden for E_NEW2020",
        },
        {
          id: "F-08",
          name: "Vol GTL capped at 4M",
          status: "passed",
          duration: "2.2s",
          message: "Coverage field shows 4,000,000 MYR for 150k salary",
        },
        {
          id: "F-09",
          name: "Beneficiary split validation",
          status: "failed",
          duration: "1.8s",
          message:
            "Error validation failed - 90% total was accepted incorrectly",
        },
        {
          id: "F-10",
          name: "Medical disability request",
          status: "passed",
          duration: "2.0s",
          message: "Toast shown, benefits list updated with MED DIS - Pending",
        },
      ],
    },
  };

  // Calculate overall statistics
  const totalTests = Object.values(testResults).reduce(
    (sum, category) => sum + category.total,
    0
  );
  const totalPassed = Object.values(testResults).reduce(
    (sum, category) => sum + category.passed,
    0
  );
  const totalFailed = Object.values(testResults).reduce(
    (sum, category) => sum + category.failed,
    0
  );
  const overallPassRate = Math.round((totalPassed / totalTests) * 100);

  const executionSummary = {
    startTime: "2025-07-04 14:23:15",
    endTime: "2025-07-04 14:25:31",
    totalDuration: "2m 16s",
    environment: "staging.MalayComp.com",
    testSuite: "MalayComp Employee Benefits - Full Regression Suite",
    executor: "Automated Test Pipeline",
    buildVersion: "v2.1.3-rc.1",
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="text-green-500" size={16} />;
      case "failed":
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-400" size={16} />;
    }
  };

  const getCategoryStatus = (category) => {
    if (category.failed === 0) return "passed";
    if (category.passed === 0) return "failed";
    return "mixed";
  };

  const getCategoryColor = (status) => {
    switch (status) {
      case "passed":
        return "bg-green-50 border-green-200 text-green-800";
      case "failed":
        return "bg-red-50 border-red-200 text-red-800";
      case "mixed":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Test Execution Report
            </h1>
            <p className="text-gray-600">{executionSummary.testSuite}</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Download size={16} />
              Export PDF
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <RefreshCw size={16} />
              Re-run Failed
            </button>
          </div>
        </div>

        {/* Execution Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Start Time</div>
            <div className="font-medium">{executionSummary.startTime}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Duration</div>
            <div className="font-medium">{executionSummary.totalDuration}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Environment</div>
            <div className="font-medium">{executionSummary.environment}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Build Version</div>
            <div className="font-medium">{executionSummary.buildVersion}</div>
          </div>
        </div>

        {/* Overall Results */}
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-1">
              {totalTests}
            </div>
            <div className="text-sm text-gray-600">Total Tests</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-1">
              {totalPassed}
            </div>
            <div className="text-sm text-gray-600">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-1">
              {totalFailed}
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {overallPassRate}%
            </div>
            <div className="text-sm text-gray-600">Pass Rate</div>
          </div>
        </div>
      </div>

      {/* Test Categories Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Test Categories Summary
        </h2>
        <div className="grid gap-4">
          {Object.entries(testResults).map(([categoryName, categoryData]) => {
            const status = getCategoryStatus(categoryData);
            return (
              <div
                key={categoryName}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${getCategoryColor(
                  status
                )} hover:shadow-md`}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === categoryName ? null : categoryName
                  )
                }
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{categoryName}</h3>
                    {status === "passed" && (
                      <CheckCircle className="text-green-600" size={20} />
                    )}
                    {status === "failed" && (
                      <XCircle className="text-red-600" size={20} />
                    )}
                    {status === "mixed" && (
                      <AlertTriangle className="text-yellow-600" size={20} />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span>✓ {categoryData.passed}</span>
                    <span>✗ {categoryData.failed}</span>
                    <span>{categoryData.duration}</span>
                    <Eye size={16} />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${
                          (categoryData.passed / categoryData.total) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {categoryData.passed}/{categoryData.total} tests passed
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Test Results */}
      {selectedCategory && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {selectedCategory} - Detailed Results
          </h2>
          <div className="space-y-3">
            {testResults[selectedCategory].tests.map((test) => (
              <div
                key={test.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <span className="font-medium">{test.id}</span>
                      <span className="text-gray-600 ml-2">{test.name}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{test.duration}</div>
                </div>
                <div
                  className={`text-sm p-3 rounded ${
                    test.status === "passed"
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  {test.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Performance Insights
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Fastest Category</span>
              <span className="font-medium">Security (1.1s)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Slowest Category</span>
              <span className="font-medium">Performance (62.4s)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Test Duration</span>
              <span className="font-medium">3.2s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">API Response Time</span>
              <span className="font-medium text-green-600">0.7s avg</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} />
            Issues & Recommendations
          </h3>
          <div className="space-y-3">
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="font-medium text-red-800">Critical</div>
              <div className="text-sm text-red-700">
                P-01: API response time exceeds SLA (347ms vs 300ms limit)
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="font-medium text-red-800">High</div>
              <div className="text-sm text-red-700">
                B-02: Database timeout in CSV export needs investigation
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="font-medium text-yellow-800">Medium</div>
              <div className="text-sm text-yellow-700">
                V-03: UI button alignment issues in vacation flow
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="font-medium text-yellow-800">Medium</div>
              <div className="text-sm text-yellow-700">
                F-09: Beneficiary validation logic needs review
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Coverage Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 size={20} />
          Test Coverage Analysis
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-600">Categories Covered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">86%</div>
            <div className="text-sm text-gray-600">BRD Validation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">92%</div>
            <div className="text-sm text-gray-600">Code Coverage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">15</div>
            <div className="text-sm text-gray-600">Critical Paths</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-green-600" size={20} />
            <span className="font-medium text-green-800">
              Test Execution Complete
            </span>
          </div>
          <p className="text-sm text-green-700">
            Overall test suite execution completed successfully with{" "}
            {overallPassRate}% pass rate.
            {totalFailed > 0
              ? ` ${totalFailed} issues identified and require attention before production deployment.`
              : " System ready for production deployment."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestCompletionReport;

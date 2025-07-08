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
  FileText,
  Camera,
  Video,
  Bug,
  Shield,
  Zap,
  Layers,
  Database,
  Globe,
  Monitor,
  Settings,
  AlertCircle,
  Info,
} from "lucide-react";

const TestCompletionReport = () => {
  const [activeSection, setActiveSection] = useState("executive");
  const [selectedTestType, setSelectedTestType] = useState(null);
  const [showCoverageDetails, setShowCoverageDetails] = useState(false);

  // Comprehensive test execution data
  const executionMetrics = {
    summary: {
      totalTests: 29,
      passed: 25,
      failed: 4,
      passRate: 86.2,
      startTime: "2025-07-04 14:23:15",
      endTime: "2025-07-04 14:25:31",
      totalDuration: "2m 16s",
      environment: "staging.brightwave.com",
      buildVersion: "v2.1.3-rc.1",
      testSuite: "BrightWave Employee Benefits - Full Regression Suite",
      executor: "Jenkins Pipeline #247",
      commitHash: "a7f3b2c1d8e9f456",
      branch: "release/v2.1.3",
    },
    riskAssessment: {
      critical: 1,
      high: 1,
      medium: 2,
      low: 0,
      overallRisk: "Medium",
    },
  };

  const testTypeResults = {
    "Unit Testing": {
      category: "unit",
      icon: <Layers className="text-blue-600" size={24} />,
      total: 4,
      passed: 4,
      failed: 0,
      duration: "3.2s",
      avgDuration: "0.8s",
      coverage: { statement: 94.2, branch: 87.5, function: 92.8, line: 93.1 },
      description: "Tests individual components and functions in isolation",
      tests: [
        {
          id: "U-01",
          name: "Credits math calculation",
          status: "passed",
          duration: "0.8s",
          message:
            'Monthly pool calculation returned expected Decimal "305.43"',
          coverage: { lines: 15, branches: 3, functions: 2 },
          assertions: 8,
          complexity: "Low",
        },
        {
          id: "U-02",
          name: "Dental eligibility cutoff",
          status: "passed",
          duration: "0.7s",
          message: "Correctly returned False for DOJ 2020 employee",
          coverage: { lines: 12, branches: 4, functions: 1 },
          assertions: 5,
          complexity: "Medium",
        },
        {
          id: "U-03",
          name: "GTL coverage cap logic",
          status: "passed",
          duration: "0.9s",
          message: "Coverage properly capped at 4,000,000 MYR",
          coverage: { lines: 18, branches: 6, functions: 3 },
          assertions: 12,
          complexity: "High",
        },
        {
          id: "U-04",
          name: "FTH vacation cost divisor",
          status: "passed",
          duration: "0.8s",
          message: "Divisor 12 correctly applied for FTH employees",
          coverage: { lines: 10, branches: 2, functions: 1 },
          assertions: 6,
          complexity: "Low",
        },
      ],
    },
    "Integration Testing": {
      category: "integration",
      icon: <Database className="text-green-600" size={24} />,
      total: 7,
      passed: 6,
      failed: 1,
      duration: "27.5s",
      avgDuration: "3.9s",
      coverage: { api: 92.1, database: 88.7, services: 91.3 },
      description: "Tests interaction between different system components",
      tests: [
        {
          id: "B-01",
          name: "Salary freeze batch processing",
          status: "passed",
          duration: "3.2s",
          message:
            "All 1,247 employees successfully processed, frozen_salary3 populated",
          dataProcessed: "1,247 records",
          dbQueries: 5,
          complexity: "High",
        },
        {
          id: "B-02",
          name: "Payroll credits CSV export",
          status: "failed",
          duration: "2.1s",
          message: "Export failed: Database connection timeout after 30s",
          errorCode: "DB_TIMEOUT_001",
          dbQueries: 15,
          complexity: "High",
        },
        {
          id: "B-03",
          name: "Annual UW sweep",
          status: "passed",
          duration: "3.4s",
          message: "23 employees aged 64+ queued for underwriting review",
          dataProcessed: "3,456 records",
          dbQueries: 8,
          complexity: "Medium",
        },
        {
          id: "A-01",
          name: "Vacation 6-day validation",
          status: "passed",
          duration: "0.6s",
          message: 'HTTP 400 returned with correct error "Max 5 days"',
          apiCalls: 1,
          responseTime: "120ms",
          complexity: "Low",
        },
        {
          id: "A-02",
          name: "Valid vacation purchase",
          status: "passed",
          duration: "0.8s",
          message: "HTTP 200, payroll_deduct correctly updated",
          apiCalls: 2,
          responseTime: "145ms",
          complexity: "Medium",
        },
        {
          id: "A-03",
          name: "Dental eligibility check",
          status: "passed",
          duration: "0.7s",
          message: 'HTTP 404 "Not Eligible" for DOJ 2020 employee',
          apiCalls: 1,
          responseTime: "98ms",
          complexity: "Low",
        },
        {
          id: "A-04",
          name: "Medical disability event",
          status: "passed",
          duration: "0.7s",
          message: 'MED_DIS entry created with uw_status="PENDING"',
          apiCalls: 2,
          responseTime: "156ms",
          complexity: "Medium",
        },
      ],
    },
    "Performance Testing": {
      category: "performance",
      icon: <Zap className="text-yellow-600" size={24} />,
      total: 2,
      passed: 1,
      failed: 1,
      duration: "62.4s",
      avgDuration: "31.2s",
      metrics: {
        throughput: "180 RPS",
        latency: "347ms p95",
        errorRate: "0.2%",
      },
      description: "Tests system performance under various load conditions",
      tests: [
        {
          id: "P-01",
          name: "Vacation API 200 RPS load test",
          status: "failed",
          duration: "60.2s",
          message: "p95: 347ms (exceeds 300ms limit), 0.2% error rate",
          metrics: {
            targetRPS: 200,
            actualRPS: 187,
            p50: "145ms",
            p95: "347ms",
            p99: "1.2s",
            errorRate: "0.2%",
            totalRequests: 11220,
            failedRequests: 22,
          },
          sla: "BREACHED",
          complexity: "High",
        },
        {
          id: "P-02",
          name: "Credits bulk processing 20k",
          status: "passed",
          duration: "1.8s",
          message: "20,000 operations completed in 1.79s, 11,173 ops/sec",
          metrics: {
            recordsProcessed: 20000,
            processingRate: "11,173 ops/sec",
            memoryUsage: "245MB peak",
            cpuUsage: "78% peak",
          },
          sla: "MET",
          complexity: "High",
        },
      ],
    },
    "Security Testing": {
      category: "security",
      icon: <Shield className="text-red-600" size={24} />,
      total: 1,
      passed: 1,
      failed: 0,
      duration: "1.1s",
      avgDuration: "1.1s",
      coverage: { authentication: 100, authorization: 95, dataValidation: 92 },
      description:
        "Tests security vulnerabilities and authentication mechanisms",
      tests: [
        {
          id: "S-01",
          name: "Unauthorized API access",
          status: "passed",
          duration: "1.1s",
          message: "All unauthorized requests correctly returned HTTP 401",
          securityChecks: [
            "No authentication header",
            "Invalid JWT token",
            "Expired token",
            "Malformed authorization header",
          ],
          vulnerabilities: 0,
          complexity: "Medium",
        },
      ],
    },
    "Visual UI Testing": {
      category: "visual",
      icon: <Monitor className="text-purple-600" size={24} />,
      total: 4,
      passed: 3,
      failed: 1,
      duration: "15.2s",
      avgDuration: "3.8s",
      coverage: { pages: 12, components: 45, viewports: 6 },
      description:
        "Tests visual appearance and UI consistency across different devices",
      mediaAssets: {
        screenshots: 24,
        recordings: 8,
        comparisons: 16,
      },
      tests: [
        {
          id: "V-01",
          name: "Login page visual regression",
          status: "passed",
          duration: "3.8s",
          message: "97.2% visual similarity with baseline",
          similarity: 97.2,
          screenshots: [
            "login-baseline.png",
            "login-current.png",
            "login-diff.png",
          ],
          recording: "login-flow-test.mp4",
          viewports: ["desktop", "tablet", "mobile"],
          pixelDifference: 1247,
          complexity: "Medium",
        },
        {
          id: "V-02",
          name: "Benefits dashboard layout",
          status: "passed",
          duration: "4.1s",
          message: "98.7% visual similarity, responsive breakpoints verified",
          similarity: 98.7,
          screenshots: ["benefits-baseline.png", "benefits-current.png"],
          recording: "benefits-responsive.mp4",
          viewports: ["desktop", "tablet", "mobile"],
          pixelDifference: 523,
          complexity: "High",
        },
        {
          id: "V-03",
          name: "Vacation purchase flow",
          status: "failed",
          duration: "3.6s",
          message: "89.3% similarity - button alignment issues detected",
          similarity: 89.3,
          screenshots: [
            "vacation-baseline.png",
            "vacation-current.png",
            "vacation-diff.png",
          ],
          recording: "vacation-flow-error.mp4",
          viewports: ["desktop"],
          pixelDifference: 4821,
          issueAreas: ["submit-button", "form-validation"],
          complexity: "Medium",
        },
        {
          id: "V-04",
          name: "Employee profile responsiveness",
          status: "passed",
          duration: "3.7s",
          message: "96.1% similarity across all tested viewports",
          similarity: 96.1,
          screenshots: [
            "profile-desktop.png",
            "profile-tablet.png",
            "profile-mobile.png",
          ],
          recording: "profile-responsive.mp4",
          viewports: ["desktop", "tablet", "mobile"],
          pixelDifference: 1892,
          complexity: "High",
        },
      ],
    },
    "End-to-End Testing": {
      category: "e2e",
      icon: <Globe className="text-indigo-600" size={24} />,
      total: 10,
      passed: 9,
      failed: 1,
      duration: "18.6s",
      avgDuration: "1.9s",
      coverage: { userJourneys: 15, criticalPaths: 8, businessRules: 23 },
      description: "Tests complete user workflows from start to finish",
      tests: [
        {
          id: "F-01",
          name: "Add salary entry (Sarah Johnson)",
          status: "passed",
          duration: "2.1s",
          message: "Salary entry saved, profile updated to 98,000 MYR",
          userSteps: 8,
          dbTransactions: 3,
          complexity: "Medium",
        },
        {
          id: "F-02",
          name: "Valid vacation purchase ≤5 days",
          status: "passed",
          duration: "1.8s",
          message: "Success toast shown, credits reduced by 375 MYR",
          userSteps: 6,
          dbTransactions: 2,
          complexity: "Medium",
        },
        {
          id: "F-03",
          name: "Vacation purchase >5 days blocked",
          status: "passed",
          duration: "1.6s",
          message: 'Error "Max 5 days" displayed, no BenefitCost entry created',
          userSteps: 4,
          dbTransactions: 0,
          complexity: "Low",
        },
        {
          id: "F-04",
          name: "Working-couple spouse validation",
          status: "passed",
          duration: "1.9s",
          message: "Form error correctly shown for spouse working at Sample",
          userSteps: 5,
          dbTransactions: 1,
          complexity: "Medium",
        },
        {
          id: "F-05",
          name: "Working-couple exemption",
          status: "passed",
          duration: "1.7s",
          message: "Exempt employee ZZ037I778 successfully added spouse",
          userSteps: 5,
          dbTransactions: 2,
          complexity: "Medium",
        },
        {
          id: "F-06",
          name: "Medical UW for age 76+",
          status: "passed",
          duration: "2.0s",
          message: 'Badge "Pending Underwriting" shown, cost 0 MYR',
          userSteps: 3,
          dbTransactions: 1,
          complexity: "Low",
        },
        {
          id: "F-07",
          name: "Dental hidden for DOJ 2020",
          status: "passed",
          duration: "1.5s",
          message: "Dental card correctly hidden for E_NEW2020",
          userSteps: 2,
          dbTransactions: 1,
          complexity: "Low",
        },
        {
          id: "F-08",
          name: "Vol GTL capped at 4M",
          status: "passed",
          duration: "2.2s",
          message: "Coverage field shows 4,000,000 MYR for 150k salary",
          userSteps: 4,
          dbTransactions: 2,
          complexity: "Medium",
        },
        {
          id: "F-09",
          name: "Beneficiary split validation",
          status: "failed",
          duration: "1.8s",
          message:
            "Error validation failed - 90% total was accepted incorrectly",
          userSteps: 4,
          dbTransactions: 0,
          errorType: "VALIDATION_LOGIC",
          complexity: "High",
        },
        {
          id: "F-10",
          name: "Medical disability request",
          status: "passed",
          duration: "2.0s",
          message: "Toast shown, benefits list updated with MED DIS - Pending",
          userSteps: 3,
          dbTransactions: 3,
          complexity: "Medium",
        },
      ],
    },
    "Reporting Testing": {
      category: "reporting",
      icon: <FileText className="text-orange-600" size={24} />,
      total: 1,
      passed: 1,
      failed: 0,
      duration: "4.3s",
      avgDuration: "4.3s",
      coverage: { reports: 8, dataAccuracy: 99.7, queries: 15 },
      description: "Tests data accuracy and report generation functionality",
      tests: [
        {
          id: "R-01",
          name: "Credits utilization report",
          status: "passed",
          duration: "4.3s",
          message: "Cash-out and deduct sums reconciled, variance < 0.01 MYR",
          recordsProcessed: 3456,
          accuracy: 99.97,
          complexity: "High",
        },
      ],
    },
  };

  const coverageDefinitions = {
    statement: {
      name: "Statement Coverage",
      description:
        "Percentage of executable statements that have been executed",
      target: ">= 90%",
      current: "94.2%",
      status: "good",
    },
    branch: {
      name: "Branch Coverage",
      description:
        "Percentage of decision branches (if/else) that have been executed",
      target: ">= 85%",
      current: "87.5%",
      status: "good",
    },
    function: {
      name: "Function Coverage",
      description: "Percentage of functions/methods that have been called",
      target: ">= 90%",
      current: "92.8%",
      status: "good",
    },
    line: {
      name: "Line Coverage",
      description: "Percentage of lines of code that have been executed",
      target: ">= 90%",
      current: "93.1%",
      status: "good",
    },
    api: {
      name: "API Coverage",
      description: "Percentage of API endpoints that have been tested",
      target: ">= 90%",
      current: "92.1%",
      status: "good",
    },
    userJourneys: {
      name: "User Journey Coverage",
      description:
        "Percentage of critical user workflows that have been tested",
      target: ">= 95%",
      current: "87.5%",
      status: "warning",
    },
    businessRules: {
      name: "Business Rules Coverage",
      description:
        "Percentage of business logic rules that have been validated",
      target: ">= 95%",
      current: "91.3%",
      status: "warning",
    },
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

  const renderExecutiveSummary = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
          <div className="text-3xl font-bold text-blue-900">
            {executionMetrics.summary.totalTests}
          </div>
          <div className="text-blue-700">Total Tests Executed</div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
          <div className="text-3xl font-bold text-green-900">
            {executionMetrics.summary.passRate}%
          </div>
          <div className="text-green-700">Overall Pass Rate</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
          <div className="text-3xl font-bold text-orange-900">
            {executionMetrics.riskAssessment.overallRisk}
          </div>
          <div className="text-orange-700">Risk Level</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
          <div className="text-3xl font-bold text-purple-900">
            {executionMetrics.summary.totalDuration}
          </div>
          <div className="text-purple-700">Execution Time</div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-orange-600" size={20} />
          Risk Assessment & Critical Issues
        </h3>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 bg-red-50 rounded">
            <div className="text-2xl font-bold text-red-600">
              {executionMetrics.riskAssessment.critical}
            </div>
            <div className="text-sm text-red-700">Critical</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded">
            <div className="text-2xl font-bold text-orange-600">
              {executionMetrics.riskAssessment.high}
            </div>
            <div className="text-sm text-orange-700">High</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded">
            <div className="text-2xl font-bold text-yellow-600">
              {executionMetrics.riskAssessment.medium}
            </div>
            <div className="text-sm text-yellow-700">Medium</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded">
            <div className="text-2xl font-bold text-green-600">
              {executionMetrics.riskAssessment.low}
            </div>
            <div className="text-sm text-green-700">Low</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="text-red-600" size={16} />
              <span className="font-semibold text-red-800">
                CRITICAL - Performance SLA Breach
              </span>
            </div>
            <p className="text-red-700 text-sm">
              P-01: API response time (347ms) exceeds production SLA (300ms).
              Impact: User experience degradation, potential SLA penalties.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-orange-600" size={16} />
              <span className="font-semibold text-orange-800">
                HIGH - Data Export Failure
              </span>
            </div>
            <p className="text-orange-700 text-sm">
              B-02: Payroll CSV export timeout. Impact: Monthly payroll
              processing may be delayed, manual intervention required.
            </p>
          </div>
        </div>
      </div>

      {/* Deployment Recommendation */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-3">
          🚨 Deployment Recommendation
        </h3>
        <p className="text-amber-800 mb-3">
          <strong>NOT RECOMMENDED for production deployment</strong> due to 1
          critical and 1 high-priority issues. Performance degradation and data
          export failures could impact business operations.
        </p>
        <div className="text-sm text-amber-700">
          <strong>Required Actions:</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Optimize API performance to meet 300ms SLA requirement</li>
            <li>Fix database timeout issues in CSV export functionality</li>
            <li>Re-run failed tests to verify fixes</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderTestTypeDetails = () => (
    <div className="space-y-6">
      {Object.entries(testTypeResults).map(([typeName, typeData]) => (
        <div
          key={typeName}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
        >
          <div
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() =>
              setSelectedTestType(
                selectedTestType === typeName ? null : typeName
              )
            }
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {typeData.icon}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {typeName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {typeData.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {typeData.passed}
                  </div>
                  <div className="text-xs text-gray-500">Passed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {typeData.failed}
                  </div>
                  <div className="text-xs text-gray-500">Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-700">
                    {typeData.duration}
                  </div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <Eye size={20} className="text-gray-400" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${(typeData.passed / typeData.total) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {selectedTestType === typeName && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              {/* Test Details */}
              <div className="space-y-4">
                {typeData.tests.map((test) => (
                  <div
                    key={test.id}
                    className="bg-white rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(test.status)}
                        <div>
                          <span className="font-semibold text-gray-900">
                            {test.id}
                          </span>
                          <span className="text-gray-600 ml-2">
                            {test.name}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {test.duration}
                      </div>
                    </div>

                    <div
                      className={`text-sm p-3 rounded mb-3 ${
                        test.status === "passed"
                          ? "bg-green-50 text-green-800"
                          : "bg-red-50 text-red-800"
                      }`}
                    >
                      {test.message}
                    </div>

                    {/* Additional metrics based on test type */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {test.coverage && (
                        <div>
                          <span className="text-gray-600">Coverage:</span>
                          <div className="font-medium">
                            {test.coverage.lines} lines,{" "}
                            {test.coverage.branches} branches
                          </div>
                        </div>
                      )}
                      {test.assertions && (
                        <div>
                          <span className="text-gray-600">Assertions:</span>
                          <div className="font-medium">{test.assertions}</div>
                        </div>
                      )}
                      {test.similarity && (
                        <div>
                          <span className="text-gray-600">
                            Visual Similarity:
                          </span>
                          <div className="font-medium">{test.similarity}%</div>
                        </div>
                      )}
                      {test.metrics?.actualRPS && (
                        <div>
                          <span className="text-gray-600">Throughput:</span>
                          <div className="font-medium">
                            {test.metrics.actualRPS} RPS
                          </div>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-600">Complexity:</span>
                        <div className="font-medium">{test.complexity}</div>
                      </div>
                    </div>

                    {/* Visual testing media */}
                    {test.screenshots && (
                      <div className="mt-4 p-3 bg-purple-50 rounded">
                        <h5 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                          <Camera size={16} />
                          Visual Assets
                        </h5>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {test.screenshots.map((screenshot, idx) => (
                              <span
                                key={idx}
                                className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
                              >
                                📷 {screenshot}
                              </span>
                            ))}
                          </div>
                          {test.recording && (
                            <div className="flex items-center gap-2">
                              <Video size={16} className="text-purple-600" />
                              <span className="text-purple-800 text-sm">
                                {test.recording}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCoverageAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-indigo-900 mb-3">
          What is Test Coverage?
        </h3>
        <p className="text-indigo-800 mb-4">
          Test coverage measures how much of your code, functionality, and
          business requirements are verified by tests. Higher coverage indicates
          better protection against bugs and regressions, but 100% coverage
          doesn't guarantee bug-free code.
        </p>
        <button
          onClick={() => setShowCoverageDetails(!showCoverageDetails)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          {showCoverageDetails ? "Hide" : "Show"} Coverage Definitions
        </button>
      </div>

      {showCoverageDetails && (
        <div className="grid gap-4">
          {Object.entries(coverageDefinitions).map(([key, coverage]) => (
            <div
              key={key}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-900">{coverage.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Target: {coverage.target}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      coverage.status === "good"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {coverage.current}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{coverage.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Coverage Metrics by Test Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">
            Code Coverage (Unit Tests)
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Statement Coverage</span>
              <span className="font-medium">94.2%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "94.2%" }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Branch Coverage</span>
              <span className="font-medium">87.5%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "87.5%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">API Coverage</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Endpoints Tested</span>
              <span className="font-medium">92.1%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "92.1%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-600">
              24 of 26 endpoints covered
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">
            Business Rules Coverage
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Rules Validated</span>
              <span className="font-medium">91.3%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: "91.3%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-600">
              21 of 23 business rules tested
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVisualTestingDetails = () => {
    const visualData = testTypeResults["Visual UI Testing"];

    return (
      <div className="space-y-6">
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-xl font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <Monitor size={24} />
            Visual UI Testing Overview
          </h3>
          <p className="text-purple-800 mb-4">
            Visual testing ensures UI consistency and catches visual regressions
            by comparing screenshots across different devices, browsers, and
            user interactions. Our testing covers {visualData.coverage.pages}{" "}
            pages,
            {visualData.coverage.components} components across{" "}
            {visualData.coverage.viewports} viewport sizes.
          </p>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {visualData.mediaAssets.screenshots}
              </div>
              <div className="text-purple-700 text-sm">
                Screenshots Captured
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {visualData.mediaAssets.recordings}
              </div>
              <div className="text-purple-700 text-sm">Video Recordings</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {visualData.mediaAssets.comparisons}
              </div>
              <div className="text-purple-700 text-sm">Visual Comparisons</div>
            </div>
          </div>
        </div>

        {/* Visual Test Results with Media */}
        <div className="space-y-4">
          {visualData.tests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {test.id} - {test.name}
                      </h4>
                      <p className="text-gray-600 text-sm">{test.message}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">
                      {test.similarity}%
                    </div>
                    <div className="text-xs text-gray-500">Similarity</div>
                  </div>
                </div>

                {/* Visual Assets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Screenshots */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <Camera size={16} />
                      Screenshots & Comparisons
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {test.screenshots.map((screenshot, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-100 rounded-lg p-4 text-center"
                        >
                          <div className="w-full h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded mb-2 flex items-center justify-center">
                            <Camera className="text-gray-500" size={24} />
                          </div>
                          <div className="text-xs text-gray-600 truncate">
                            {screenshot}
                          </div>
                          <button className="text-xs text-blue-600 hover:text-blue-800 mt-1">
                            View Full Size
                          </button>
                        </div>
                      ))}
                    </div>
                    {test.pixelDifference && (
                      <div className="text-xs text-gray-600">
                        Pixel differences detected:{" "}
                        {test.pixelDifference.toLocaleString()} pixels
                      </div>
                    )}
                  </div>

                  {/* Video Recording */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900 flex items-center gap-2">
                      <Video size={16} />
                      Test Recording
                    </h5>
                    <div className="bg-gray-900 rounded-lg p-8 text-center">
                      <Video className="text-white mx-auto mb-3" size={32} />
                      <div className="text-white text-sm mb-2">
                        {test.recording}
                      </div>
                      <div className="text-gray-400 text-xs mb-3">
                        Duration: {test.duration}
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs">
                        ▶ Play Recording
                      </button>
                    </div>
                  </div>
                </div>

                {/* Viewport Testing */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">
                    Viewport Testing
                  </h5>
                  <div className="flex gap-2">
                    {test.viewports.map((viewport) => (
                      <span
                        key={viewport}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                      >
                        📱 {viewport}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Issue Areas (for failed tests) */}
                {test.issueAreas && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <h5 className="font-medium text-red-900 mb-2">
                      ⚠️ Issues Detected
                    </h5>
                    <div className="flex gap-2">
                      {test.issueAreas.map((area) => (
                        <span
                          key={area}
                          className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Media Repository */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">
            📁 Test Media Repository
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-blue-50 rounded text-center">
              <div className="text-lg font-bold text-blue-600">login-flow/</div>
              <div className="text-xs text-blue-700">
                3 screenshots, 1 video
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded text-center">
              <div className="text-lg font-bold text-green-600">
                benefits-dashboard/
              </div>
              <div className="text-xs text-green-700">
                2 screenshots, 1 video
              </div>
            </div>
            <div className="p-3 bg-red-50 rounded text-center">
              <div className="text-lg font-bold text-red-600">
                vacation-purchase/
              </div>
              <div className="text-xs text-red-700">3 screenshots, 1 video</div>
            </div>
            <div className="p-3 bg-purple-50 rounded text-center">
              <div className="text-lg font-bold text-purple-600">
                employee-profile/
              </div>
              <div className="text-xs text-purple-700">
                3 screenshots, 1 video
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            All visual assets are stored in the test artifacts repository and
            available for download with this report.
          </div>
        </div>
      </div>
    );
  };

  const sections = [
    {
      id: "executive",
      name: "Executive Summary",
      icon: <TrendingUp size={20} />,
    },
    { id: "details", name: "Test Type Details", icon: <Layers size={20} /> },
    {
      id: "coverage",
      name: "Coverage Analysis",
      icon: <BarChart3 size={20} />,
    },
    { id: "visual", name: "Visual Testing", icon: <Monitor size={20} /> },
  ];

  return (
    <div className="h-screen overflow-auto bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Test Report</h1>
          <p className="text-sm text-gray-600">v2.1.3-rc.1</p>
        </div>
        <nav className="p-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-left transition-colors ${
                activeSection === section.id
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {section.icon}
              {section.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Comprehensive Test Execution Report
                </h1>
                <p className="text-gray-600">
                  {executionMetrics.summary.testSuite}
                </p>
                <div className="mt-2 text-sm text-gray-500">
                  Executed: {executionMetrics.summary.startTime} | Build:{" "}
                  {executionMetrics.summary.buildVersion} | Commit:{" "}
                  {executionMetrics.summary.commitHash.substring(0, 8)}
                </div>
              </div>
              <div className="flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Download size={16} />
                  Export PDF
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <RefreshCw size={16} />
                  Re-run Failed
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          {activeSection === "executive" && renderExecutiveSummary()}
          {activeSection === "details" && renderTestTypeDetails()}
          {activeSection === "coverage" && renderCoverageAnalysis()}
          {activeSection === "visual" && renderVisualTestingDetails()}
        </div>
      </div>
    </div>
  );
};

export default TestCompletionReport;

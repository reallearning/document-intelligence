"use client";
import { useState } from "react";

export default function TestExecutionReport() {
  const [activeSection, setActiveSection] = useState("summary");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("response-time");

  const reportData = {
    executionId: "BWV-20250701-094722",
    executionDate: "July 1, 2025 09:47:22 IST",
    totalDuration: "42m 18s",
    environment: {
      name: "staging.brightwave.com",
      infrastructure: "AWS EKS 1.24",
      database: "PostgreSQL 14.2",
      redis: "Redis 7.0.5",
      nodeVersion: "18.17.0",
      region: "ap-south-1",
    },
    testFrameworks: [
      "Jest 29.5",
      "Cypress 12.14",
      "JMeter 5.5",
      "OWASP ZAP 2.12",
    ],
    browsers: ["Chrome 91.0", "Firefox 115.0", "Safari 16.5", "Edge 114.0"],

    summary: {
      totalTests: 50,
      passed: 48,
      failed: 0,
      flaky: 2,
      skipped: 0,
      retries: 3,
      successRate: 100,
      flakyRate: 4,
      phases: 11,
      phasesCompleted: 11,
      criticalPathCovered: 100,
      businessRiskMitigation: 98.7,
    },

    riskAnalysis: {
      criticalPaths: [
        {
          path: "Employer Onboarding → Plan Creation",
          coverage: 100,
          businessImpact: "High",
        },
        {
          path: "Employee Enrollment → Benefit Access",
          coverage: 100,
          businessImpact: "High",
        },
        {
          path: "Claims Submission → Processing",
          coverage: 100,
          businessImpact: "Critical",
        },
        {
          path: "Invoice Generation → Payment",
          coverage: 100,
          businessImpact: "High",
        },
        {
          path: "HRIS Sync → Employee Data",
          coverage: 98,
          businessImpact: "Medium",
        },
      ],
      technicalDebt: {
        codeComplexity: "Low",
        maintainabilityIndex: 87.3,
        technicalRiskScore: 12,
      },
    },

    phases: [
      {
        id: "unit",
        name: "Unit & Component Tests",
        tests: 7,
        passed: 7,
        failed: 0,
        flaky: 0,
        duration: "2m 34s",
        coverage: { code: 94.2, requirements: 100 },
        startTime: "09:15:22",
        endTime: "09:17:56",
        environment: "Local/CI",
        parallelization: 4,
        retries: 0,
        testCases: [
          {
            id: "U-CFG-01",
            name: "BrightWave config loads",
            status: "passed",
            duration: "0.12s",
            assertions: 8,
          },
          {
            id: "U-CFG-02",
            name: "SCSS theme resolves",
            status: "passed",
            duration: "0.08s",
            assertions: 4,
          },
          {
            id: "U-ENUM-01",
            name: "New benefit codes present",
            status: "passed",
            duration: "0.05s",
            assertions: 6,
          },
          {
            id: "U-DB-01",
            name: "Catalog migration up/down",
            status: "passed",
            duration: "1.23s",
            assertions: 12,
          },
          {
            id: "U-ELIG-01",
            name: "YAML role→plan mapping",
            status: "passed",
            duration: "0.18s",
            assertions: 15,
          },
          {
            id: "U-API-01",
            name: "INR formatting helper",
            status: "passed",
            duration: "0.03s",
            assertions: 7,
          },
          {
            id: "U-THEME-01",
            name: "Button colour & radius",
            status: "passed",
            duration: "0.07s",
            assertions: 5,
          },
        ],
      },
      {
        id: "backend",
        name: "Backend Integration Tests",
        tests: 7,
        passed: 7,
        failed: 0,
        flaky: 1,
        duration: "4m 12s",
        coverage: { code: 87.5, requirements: 100 },
        startTime: "09:17:56",
        endTime: "09:22:08",
        environment: "Docker Compose",
        parallelization: 2,
        retries: 1,
        dbConnections: 15,
        apiCalls: 247,
        testCases: [
          {
            id: "B-TEN-01",
            name: "Return tenant meta",
            status: "passed",
            duration: "0.45s",
            responseTime: "125ms",
          },
          {
            id: "B-CAT-01",
            name: "Benefits catalog validation",
            status: "passed",
            duration: "0.78s",
            responseTime: "189ms",
          },
          {
            id: "B-ELIG-01",
            name: "L4 → plan pro mapping",
            status: "passed",
            duration: "0.32s",
            responseTime: "98ms",
          },
          {
            id: "B-INV-01",
            name: "Invoice generation",
            status: "passed",
            duration: "1.24s",
            responseTime: "456ms",
          },
          {
            id: "B-HRIS-01",
            name: "Keka webhook sync",
            status: "flaky",
            duration: "0.89s",
            responseTime: "234ms",
            retries: 1,
          },
          {
            id: "B-CLAIM-01",
            name: "Claim submission",
            status: "passed",
            duration: "0.67s",
            responseTime: "278ms",
          },
          {
            id: "B-PDPA-01",
            name: "PDPA consent validation",
            status: "passed",
            duration: "0.34s",
            responseTime: "145ms",
          },
        ],
      },
      {
        id: "frontend",
        name: "Frontend UI Tests",
        tests: 7,
        passed: 7,
        failed: 0,
        flaky: 1,
        duration: "3m 42s",
        coverage: { code: 91.8, requirements: 100 },
        startTime: "09:22:08",
        endTime: "09:25:50",
        environment: "Cypress Cloud",
        browsers: ["Chrome", "Firefox"],
        viewports: ["1920x1080", "375x667"],
        screenshots: 23,
        videos: 7,
        testCases: [
          {
            id: "F-THEME-01",
            name: "Brand colours render",
            status: "passed",
            duration: "12.3s",
            interactions: 8,
          },
          {
            id: "F-LOGIN-01",
            name: "Mobile responsive login",
            status: "flaky",
            duration: "18.7s",
            interactions: 12,
            retries: 1,
          },
          {
            id: "F-DASH-01",
            name: "Dashboard widgets",
            status: "passed",
            duration: "15.2s",
            interactions: 15,
          },
          {
            id: "F-PLAN-01",
            name: "Plan designer drag/drop",
            status: "passed",
            duration: "24.8s",
            interactions: 22,
          },
          {
            id: "F-WAL-01",
            name: "Wallet e-card display",
            status: "passed",
            duration: "11.5s",
            interactions: 7,
          },
          {
            id: "F-CLAIM-01",
            name: "Claims file upload",
            status: "passed",
            duration: "19.4s",
            interactions: 14,
          },
          {
            id: "F-A11Y-01",
            name: "Accessibility compliance",
            status: "passed",
            duration: "16.8s",
            interactions: 18,
          },
        ],
      },
      {
        id: "e2e",
        name: "End-to-End Tests",
        tests: 6,
        passed: 6,
        failed: 0,
        flaky: 0,
        duration: "8m 15s",
        coverage: { workflows: 100, userJourneys: 100 },
        startTime: "09:25:50",
        endTime: "09:34:05",
        environment: "Staging",
        dataVolume: "2.3k records",
        transactions: 156,
        testCases: [
          {
            id: "E2E-ONB-01",
            name: "Employer onboarding flow",
            status: "passed",
            duration: "2m 14s",
            steps: 28,
          },
          {
            id: "E2E-EMP-01",
            name: "Employee day-0 experience",
            status: "passed",
            duration: "1m 38s",
            steps: 19,
          },
          {
            id: "E2E-CLA-CASH",
            name: "Cashless claim approval",
            status: "passed",
            duration: "1m 52s",
            steps: 23,
          },
          {
            id: "E2E-CLA-REM",
            name: "Reimbursement cycle",
            status: "passed",
            duration: "1m 45s",
            steps: 21,
          },
          {
            id: "E2E-INV-01",
            name: "Invoice & payment flow",
            status: "passed",
            duration: "1m 28s",
            steps: 17,
          },
          {
            id: "E2E-THEME-01",
            name: "Theme fallback handling",
            status: "passed",
            duration: "0m 58s",
            steps: 12,
          },
        ],
      },
      {
        id: "performance",
        name: "Performance Tests",
        tests: 4,
        passed: 4,
        failed: 0,
        flaky: 0,
        duration: "12m 25s",
        coverage: { endpoints: 100, loadScenarios: 100 },
        startTime: "09:36:13",
        endTime: "09:48:38",
        environment: "Load Testing Cluster",
        virtualUsers: 100,
        totalRequests: 12547,
        dataTransferred: "156.7 MB",
        testCases: [
          {
            id: "P-API-01",
            name: "100 RPS benefits API",
            status: "passed",
            duration: "5m 12s",
            peakRPS: 103,
            avgResponse: "185ms",
          },
          {
            id: "P-DB-01",
            name: "10k invoice generation",
            status: "passed",
            duration: "3m 45s",
            recordsProcessed: 10000,
            throughput: "44.4/s",
          },
          {
            id: "P-FE-01",
            name: "Wallet mobile load time",
            status: "passed",
            duration: "2m 18s",
            avgLoadTime: "1.8s",
            samples: 50,
          },
          {
            id: "P-UP-01",
            name: "10MB file upload test",
            status: "passed",
            duration: "1m 10s",
            uploadSpeed: "1.2 MB/s",
            successRate: "100%",
          },
        ],
      },
    ],

    performanceMetrics: {
      apiResponseTime: {
        average: "185ms",
        p50: "142ms",
        p95: "247ms",
        p99: "312ms",
        p99_9: "458ms",
        sla: "≤250ms",
        compliance: 98.7,
      },
      pageLoadTime: {
        desktop: { fcp: "1.2s", lcp: "2.1s", cls: 0.05 },
        mobile: { fcp: "1.8s", lcp: "3.2s", cls: 0.08 },
        budgets: { fcp: "≤2s", lcp: "≤4s", cls: "≤0.1" },
      },
      throughput: {
        maxRPS: "103/s",
        sustainedRPS: "98/s",
        errorRate: "0.02%",
        connectionPooling: "95% efficiency",
      },
      resourceUtilization: {
        cpu: { average: "65%", peak: "89%" },
        memory: { average: "72%", peak: "91%" },
        database: { connections: "78%", queryTime: "avg 45ms" },
      },
    },

    security: {
      vulnerabilities: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 1,
        info: 3,
      },
      testCategories: [
        {
          category: "Authentication",
          tests: 12,
          passed: 12,
          coverage: "JWT, OAuth2, Session Management",
        },
        {
          category: "Authorization",
          tests: 8,
          passed: 8,
          coverage: "RBAC, Tenant Isolation, API Permissions",
        },
        {
          category: "Input Validation",
          tests: 15,
          passed: 15,
          coverage: "SQL Injection, XSS, CSRF",
        },
        {
          category: "Data Protection",
          tests: 6,
          passed: 6,
          coverage: "Encryption, PII Handling, PDPA",
        },
        {
          category: "Infrastructure",
          tests: 9,
          passed: 9,
          coverage: "TLS, Headers, CORS",
        },
      ],
      compliance: {
        pdpa: { requirements: 23, validated: 23, compliance: "100%" },
        iso27001: { controls: 17, implemented: 16, compliance: "94.1%" },
        owasp: { top10: 10, covered: 10, compliance: "100%" },
      },
    },

    accessibility: {
      wcagLevel: "AA",
      compliance: 96.8,
      issues: {
        level_a: 0,
        level_aa: 2,
        level_aaa: 5,
      },
      testCategories: [
        { category: "Keyboard Navigation", score: 100, issues: 0 },
        { category: "Screen Reader", score: 98, issues: 1 },
        { category: "Color Contrast", score: 94, issues: 3 },
        { category: "Focus Management", score: 100, issues: 0 },
      ],
    },

    alignment: {
      brdTests: 28,
      codeTests: 21,
      bothTests: 1,
      requirementsCoverage: {
        functional: { total: 47, covered: 47, percentage: 100 },
        nonFunctional: { total: 23, covered: 22, percentage: 95.7 },
        businessRules: { total: 18, covered: 18, percentage: 100 },
      },
    },

    trends: {
      historical: [
        { date: "2025-06-24", passRate: 96, duration: "38m", flaky: 5 },
        { date: "2025-06-27", passRate: 98, duration: "41m", flaky: 3 },
        { date: "2025-06-30", passRate: 97, duration: "39m", flaky: 4 },
        { date: "2025-07-01", passRate: 100, duration: "42m", flaky: 2 },
      ],
      improvements: [
        "Reduced flaky test count from 5 to 2 (-60%)",
        "Improved API response time from 210ms to 185ms (-12%)",
        "Enhanced test stability with better data isolation",
        "Optimized database query performance (+15%)",
      ],
    },
  };

  const navItems = [
    { id: "summary", label: "Executive Summary", icon: "📊" },
    { id: "phases", label: "Phase Details", icon: "🔍" },
    { id: "performance", label: "Performance", icon: "⚡" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "coverage", label: "Coverage", icon: "🎯" },
    { id: "trends", label: "Trends", icon: "📈" },
    { id: "artifacts", label: "Artifacts", icon: "📁" },
  ];

  const renderExecutiveSummary = () => (
    <div className="space-y-6">
      {/* Status Banner with Risk Assessment */}
      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-3xl">✅</span>
              <h2 className="text-2xl font-bold text-green-800">
                Production Ready
              </h2>
            </div>
            <p className="text-green-700 mb-2">
              BrightWave tenant onboarding passed comprehensive validation with
              100% success rate
            </p>
            <div className="text-sm text-green-600">
              • All critical business paths validated • Performance within SLA •
              Zero security vulnerabilities
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-600">100%</div>
            <div className="text-green-700">Success Rate</div>
            <div className="text-sm text-green-600 mt-1">
              Business Risk: Low
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg border text-center">
          <div className="text-3xl font-bold text-blue-600">
            {reportData.summary.totalTests}
          </div>
          <div className="text-gray-600">Total Tests</div>
          <div className="text-xs text-gray-500 mt-1">
            50 test cases executed
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border text-center">
          <div className="text-3xl font-bold text-green-600">
            {reportData.summary.passed}
          </div>
          <div className="text-gray-600">Passed</div>
          <div className="text-xs text-gray-500 mt-1">
            {reportData.summary.flaky} flaky, {reportData.summary.retries}{" "}
            retries
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border text-center">
          <div className="text-3xl font-bold text-purple-600">
            {reportData.totalDuration}
          </div>
          <div className="text-gray-600">Duration</div>
          <div className="text-xs text-gray-500 mt-1">4 phases parallel</div>
        </div>
        <div className="bg-white p-6 rounded-lg border text-center">
          <div className="text-3xl font-bold text-orange-600">
            {reportData.summary.criticalPathCovered}%
          </div>
          <div className="text-gray-600">Critical Paths</div>
          <div className="text-xs text-gray-500 mt-1">All user journeys</div>
        </div>
        <div className="bg-white p-6 rounded-lg border text-center">
          <div className="text-3xl font-bold text-red-600">0</div>
          <div className="text-gray-600">Blockers</div>
          <div className="text-xs text-gray-500 mt-1">Ready for release</div>
        </div>
      </div>

      {/* Risk Assessment Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Critical Path Coverage</h3>
          <div className="space-y-3">
            {reportData.riskAnalysis.criticalPaths.map((path, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div>
                  <div className="font-medium text-sm">{path.path}</div>
                  <div className="text-xs text-gray-600">
                    Impact: {path.businessImpact}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold ${
                      path.coverage === 100
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {path.coverage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Quality Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Code Maintainability Index</span>
              <span className="font-semibold text-green-600">
                {reportData.riskAnalysis.technicalDebt.maintainabilityIndex}/100
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Technical Risk Score</span>
              <span className="font-semibold text-green-600">
                {reportData.riskAnalysis.technicalDebt.technicalRiskScore}/100
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Flaky Test Rate</span>
              <span className="font-semibold text-yellow-600">
                {reportData.summary.flakyRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Business Risk Mitigation</span>
              <span className="font-semibold text-green-600">
                {reportData.summary.businessRiskMitigation}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Environment & Infrastructure */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Test Environment Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Infrastructure:</span>
            <div className="text-gray-900">
              {reportData.environment.infrastructure}
            </div>
            <div className="text-gray-500">{reportData.environment.region}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Database:</span>
            <div className="text-gray-900">
              {reportData.environment.database}
            </div>
            <div className="text-gray-500">
              + {reportData.environment.redis}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Runtime:</span>
            <div className="text-gray-900">
              Node.js {reportData.environment.nodeVersion}
            </div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Test Frameworks:</span>
            <div className="text-gray-900">
              {reportData.testFrameworks.slice(0, 2).join(", ")}
            </div>
            <div className="text-gray-500">
              + {reportData.testFrameworks.length - 2} more
            </div>
          </div>
        </div>
      </div>

      {/* Test Alignment with BRD Requirements */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Requirements Validation</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {reportData.alignment.requirementsCoverage.functional.percentage}%
            </div>
            <div className="text-sm text-blue-800">Functional Requirements</div>
            <div className="text-xs text-gray-600 mt-1">
              {reportData.alignment.requirementsCoverage.functional.covered}/
              {reportData.alignment.requirementsCoverage.functional.total}{" "}
              validated
            </div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {
                reportData.alignment.requirementsCoverage.nonFunctional
                  .percentage
              }
              %
            </div>
            <div className="text-sm text-purple-800">
              Non-Functional Requirements
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {reportData.alignment.requirementsCoverage.nonFunctional.covered}/
              {reportData.alignment.requirementsCoverage.nonFunctional.total}{" "}
              validated
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {
                reportData.alignment.requirementsCoverage.businessRules
                  .percentage
              }
              %
            </div>
            <div className="text-sm text-green-800">Business Rules</div>
            <div className="text-xs text-gray-600 mt-1">
              {reportData.alignment.requirementsCoverage.businessRules.covered}/
              {reportData.alignment.requirementsCoverage.businessRules.total}{" "}
              validated
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPhaseDetails = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Detailed Phase Analysis</h2>
        <div className="text-sm text-gray-600">
          Click phases to expand individual test details
        </div>
      </div>

      {reportData.phases.map((phase) => (
        <div
          key={phase.id}
          className="bg-white border rounded-lg overflow-hidden"
        >
          <div
            className="bg-green-50 px-6 py-4 border-b cursor-pointer hover:bg-green-100 transition-colors"
            onClick={() =>
              setExpandedPhase(expandedPhase === phase.id ? null : phase.id)
            }
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {phase.name}
                </h3>
                <div className="text-sm text-gray-600 flex items-center space-x-4">
                  <span>
                    {phase.tests} tests • {phase.duration}
                  </span>
                  {phase.coverage.code && (
                    <span>Code: {phase.coverage.code}%</span>
                  )}
                  {phase.parallelization && (
                    <span>Parallel: {phase.parallelization}x</span>
                  )}
                  {phase.flaky > 0 && (
                    <span className="text-yellow-600">
                      Flaky: {phase.flaky}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-600 font-bold text-lg">
                  {phase.passed}/{phase.tests} ✓
                </div>
                <div className="text-sm text-gray-500">
                  {phase.startTime} - {phase.endTime}
                </div>
                <div className="text-xs text-gray-400">
                  {expandedPhase === phase.id ? "▼ Collapse" : "▶ Expand"}
                </div>
              </div>
            </div>
          </div>

          {expandedPhase === phase.id && (
            <div className="p-6">
              {/* Phase Overview Stats */}
              <div className="grid grid-cols-5 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {phase.passed}
                  </div>
                  <div className="text-sm text-gray-600">Passed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {phase.failed}
                  </div>
                  <div className="text-sm text-gray-600">Failed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {phase.flaky}
                  </div>
                  <div className="text-sm text-gray-600">Flaky</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {phase.duration}
                  </div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {phase.retries || 0}
                  </div>
                  <div className="text-sm text-gray-600">Retries</div>
                </div>
              </div>

              {/* Individual Test Cases */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 mb-3">
                  Individual Test Results:
                </h4>
                {phase.testCases?.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xs">
                        {test.status === "passed"
                          ? "✅"
                          : test.status === "flaky"
                          ? "⚠️"
                          : "❌"}
                      </span>
                      <div>
                        <span className="font-mono text-sm text-blue-600">
                          {test.id}
                        </span>
                        <div className="text-sm text-gray-900">{test.name}</div>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-gray-900">{test.duration}</div>
                      {test.responseTime && (
                        <div className="text-gray-500">
                          RT: {test.responseTime}
                        </div>
                      )}
                      {test.assertions && (
                        <div className="text-gray-500">
                          {test.assertions} assertions
                        </div>
                      )}
                      {test.interactions && (
                        <div className="text-gray-500">
                          {test.interactions} interactions
                        </div>
                      )}
                      {test.retries && (
                        <div className="text-yellow-600">
                          Retried {test.retries}x
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Phase-specific Metrics */}
              {phase.id === "backend" && (
                <div className="mt-6 p-4 bg-blue-50 rounded">
                  <h5 className="font-medium mb-2">Backend Metrics</h5>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>DB Connections: {phase.dbConnections}</div>
                    <div>API Calls: {phase.apiCalls}</div>
                    <div>Avg Response: 189ms</div>
                  </div>
                </div>
              )}

              {phase.id === "frontend" && (
                <div className="mt-6 p-4 bg-purple-50 rounded">
                  <h5 className="font-medium mb-2">Frontend Metrics</h5>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>Screenshots: {phase.screenshots}</div>
                    <div>Videos: {phase.videos}</div>
                    <div>Viewports: {phase.viewports?.join(", ")}</div>
                  </div>
                </div>
              )}

              {phase.id === "performance" && (
                <div className="mt-6 p-4 bg-orange-50 rounded">
                  <h5 className="font-medium mb-2">Load Test Metrics</h5>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>Virtual Users: {phase.virtualUsers}</div>
                    <div>
                      Total Requests: {phase.totalRequests?.toLocaleString()}
                    </div>
                    <div>Data Transfer: {phase.dataTransferred}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderPerformanceMetrics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Performance Analysis</h2>
        <div className="flex space-x-2">
          {["response-time", "page-load", "throughput", "resources"].map(
            (metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1 text-sm rounded ${
                  selectedMetric === metric
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {metric.replace("-", " ")}
              </button>
            )
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Performance */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">API Response Times</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average (P50)</span>
              <span className="font-semibold text-green-600">
                {reportData.performanceMetrics.apiResponseTime.p50}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">95th Percentile</span>
              <span className="font-semibold text-green-600">
                {reportData.performanceMetrics.apiResponseTime.p95}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">99th Percentile</span>
              <span className="font-semibold text-yellow-600">
                {reportData.performanceMetrics.apiResponseTime.p99}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">99.9th Percentile</span>
              <span className="font-semibold text-red-600">
                {reportData.performanceMetrics.apiResponseTime.p99_9}
              </span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded">
            <div className="text-sm text-green-800">
              ✓ SLA Compliance:{" "}
              {reportData.performanceMetrics.apiResponseTime.compliance}%
              (Target: {reportData.performanceMetrics.apiResponseTime.sla})
            </div>
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Core Web Vitals</h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Desktop Performance
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>First Contentful Paint</span>
                  <span className="text-green-600">
                    {reportData.performanceMetrics.pageLoadTime.desktop.fcp}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Largest Contentful Paint</span>
                  <span className="text-green-600">
                    {reportData.performanceMetrics.pageLoadTime.desktop.lcp}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cumulative Layout Shift</span>
                  <span className="text-green-600">
                    {reportData.performanceMetrics.pageLoadTime.desktop.cls}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-3">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Mobile Performance
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>First Contentful Paint</span>
                  <span className="text-green-600">
                    {reportData.performanceMetrics.pageLoadTime.mobile.fcp}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Largest Contentful Paint</span>
                  <span className="text-green-600">
                    {reportData.performanceMetrics.pageLoadTime.mobile.lcp}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Utilization */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Resource Utilization</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>CPU Usage</span>
                <span>
                  {
                    reportData.performanceMetrics.resourceUtilization.cpu
                      .average
                  }{" "}
                  avg,{" "}
                  {reportData.performanceMetrics.resourceUtilization.cpu.peak}{" "}
                  peak
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width:
                      reportData.performanceMetrics.resourceUtilization.cpu
                        .average,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Memory Usage</span>
                <span>
                  {
                    reportData.performanceMetrics.resourceUtilization.memory
                      .average
                  }{" "}
                  avg,{" "}
                  {
                    reportData.performanceMetrics.resourceUtilization.memory
                      .peak
                  }{" "}
                  peak
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width:
                      reportData.performanceMetrics.resourceUtilization.memory
                        .average,
                  }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Database Connections</span>
                <span>
                  {
                    reportData.performanceMetrics.resourceUtilization.database
                      .connections
                  }
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Query Time:{" "}
                {
                  reportData.performanceMetrics.resourceUtilization.database
                    .queryTime
                }
              </div>
            </div>
          </div>
        </div>

        {/* Load Testing Results */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Load Testing Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Peak RPS</span>
              <span className="font-semibold text-green-600">
                {reportData.performanceMetrics.throughput.maxRPS}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sustained RPS</span>
              <span className="font-semibold text-green-600">
                {reportData.performanceMetrics.throughput.sustainedRPS}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Error Rate</span>
              <span className="font-semibold text-green-600">
                {reportData.performanceMetrics.throughput.errorRate}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Connection Efficiency</span>
              <span className="font-semibold text-green-600">
                {reportData.performanceMetrics.throughput.connectionPooling}
              </span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded">
            <div className="text-sm text-green-800">
              ✓ System stable under expected load (100 RPS target exceeded)
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityAnalysis = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Security & Compliance Assessment
      </h2>

      {/* Vulnerability Overview */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">
          Vulnerability Scan Results
        </h3>
        <div className="grid grid-cols-5 gap-4 text-center mb-6">
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {reportData.security.vulnerabilities.critical}
            </div>
            <div className="text-sm text-red-800">Critical</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {reportData.security.vulnerabilities.high}
            </div>
            <div className="text-sm text-orange-800">High</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {reportData.security.vulnerabilities.medium}
            </div>
            <div className="text-sm text-yellow-800">Medium</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {reportData.security.vulnerabilities.low}
            </div>
            <div className="text-sm text-blue-800">Low</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">
              {reportData.security.vulnerabilities.info}
            </div>
            <div className="text-sm text-gray-800">Info</div>
          </div>
        </div>
        <div className="p-3 bg-green-50 rounded">
          <div className="text-sm text-green-800">
            ✓ No critical or high severity vulnerabilities detected. 1 low
            severity issue flagged for monitoring.
          </div>
        </div>
      </div>

      {/* Security Test Categories */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Security Test Coverage</h3>
        <div className="space-y-4">
          {reportData.security.testCategories.map((category, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <div>
                <div className="font-medium">{category.category}</div>
                <div className="text-sm text-gray-600">{category.coverage}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">
                  {category.passed}/{category.tests} ✓
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">PDPA Compliance</h3>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-green-600">
              {reportData.security.compliance.pdpa.compliance}
            </div>
            <div className="text-gray-600">Compliance Rate</div>
          </div>
          <div className="text-sm text-gray-600">
            {reportData.security.compliance.pdpa.validated}/
            {reportData.security.compliance.pdpa.requirements} requirements
            validated
          </div>
          <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-800">
            ✓ Data collection consent mechanisms validated
            <br />✓ Personal data handling procedures confirmed
            <br />✓ Data subject rights implementation verified
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">ISO 27001</h3>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-green-600">
              {reportData.security.compliance.iso27001.compliance}
            </div>
            <div className="text-gray-600">Controls Implemented</div>
          </div>
          <div className="text-sm text-gray-600">
            {reportData.security.compliance.iso27001.implemented}/
            {reportData.security.compliance.iso27001.controls} controls active
          </div>
          <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
            ⚠️ 1 control pending: Security incident response documentation
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">OWASP Top 10</h3>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-green-600">
              {reportData.security.compliance.owasp.compliance}
            </div>
            <div className="text-gray-600">Coverage</div>
          </div>
          <div className="text-sm text-gray-600">
            {reportData.security.compliance.owasp.covered}/
            {reportData.security.compliance.owasp.top10} categories tested
          </div>
          <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-800">
            ✓ All OWASP Top 10 vulnerabilities tested and mitigated
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Historical Trends & Improvements
      </h2>

      {/* Historical Performance */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">
          Test Execution Trends (Last 7 Days)
        </h3>
        <div className="space-y-4">
          {reportData.trends.historical.map((run, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <div className="flex items-center space-x-4">
                <div className="text-sm font-mono">{run.date}</div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    run.passRate === 100
                      ? "bg-green-500"
                      : run.passRate >= 95
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></div>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-gray-600">
                  Pass Rate:{" "}
                  <span className="font-medium">{run.passRate}%</span>
                </span>
                <span className="text-gray-600">
                  Duration: <span className="font-medium">{run.duration}</span>
                </span>
                <span className="text-gray-600">
                  Flaky: <span className="font-medium">{run.flaky}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Improvements */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">
          Quality Improvements This Sprint
        </h3>
        <div className="space-y-3">
          {reportData.trends.improvements.map((improvement, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 p-3 bg-green-50 rounded"
            >
              <span className="text-green-600 mt-0.5">✅</span>
              <span className="text-green-800">{improvement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility Details */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">
          Accessibility Compliance (WCAG {reportData.accessibility.wcagLevel})
        </h3>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span>Overall Compliance</span>
            <span className="font-bold text-green-600">
              {reportData.accessibility.compliance}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${reportData.accessibility.compliance}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-3">Test Categories</h4>
            {reportData.accessibility.testCategories.map((cat, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-2 text-sm"
              >
                <span>{cat.category}</span>
                <span
                  className={`font-medium ${
                    cat.score === 100 ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {cat.score}% ({cat.issues} issues)
                </span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-medium mb-3">WCAG Level Issues</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Level A</span>
                <span className="text-green-600">
                  {reportData.accessibility.issues.level_a} issues
                </span>
              </div>
              <div className="flex justify-between">
                <span>Level AA</span>
                <span className="text-yellow-600">
                  {reportData.accessibility.issues.level_aa} issues
                </span>
              </div>
              <div className="flex justify-between">
                <span>Level AAA</span>
                <span className="text-gray-600">
                  {reportData.accessibility.issues.level_aaa} issues
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "summary":
        return renderExecutiveSummary();
      case "phases":
        return renderPhaseDetails();
      case "performance":
        return renderPerformanceMetrics();
      case "security":
        return renderSecurityAnalysis();
      case "coverage":
        return renderCoverage();
      case "trends":
        return renderTrends();
      case "artifacts":
        return renderArtifacts();
      default:
        return renderExecutiveSummary();
    }
  };

  const renderCoverage = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Test Coverage Analysis</h2>

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Overall Coverage Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">92.8%</div>
            <div className="text-gray-600">Code Coverage</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "92.8%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Target: ≥90%</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">100%</div>
            <div className="text-gray-600">BRD Requirements</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">88/88 requirements</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">96.4%</div>
            <div className="text-gray-600">Feature Coverage</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: "96.4%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">27/28 features</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">
            BRD Requirements Coverage
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Tenant Onboarding</span>
              <span className="text-green-600 font-semibold">
                ✓ 100% (12/12)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Benefit Management</span>
              <span className="text-green-600 font-semibold">
                ✓ 100% (18/18)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>HRIS Integration</span>
              <span className="text-green-600 font-semibold">✓ 100% (8/8)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Claims Processing</span>
              <span className="text-green-600 font-semibold">
                ✓ 100% (15/15)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Performance Requirements</span>
              <span className="text-green-600 font-semibold">
                ✓ 100% (12/12)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Security & Compliance</span>
              <span className="text-green-600 font-semibold">
                ✓ 100% (23/23)
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">
            Code Coverage by Module
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Tenant Registry</span>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-semibold">94.2%</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "94.2%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>API Layer</span>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600 font-semibold">87.5%</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "87.5%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Frontend Components</span>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-semibold">91.8%</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "91.8%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Database Layer</span>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-semibold">96.1%</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "96.1%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Authentication</span>
              <div className="flex items-center space-x-2">
                <span className="text-green-600 font-semibold">98.7%</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "98.7%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Themes & Styling</span>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600 font-semibold">89.3%</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "89.3%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArtifacts = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Test Artifacts & Downloads</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Reports & Logs</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📊</span>
                <div className="text-left">
                  <div className="font-medium">HTML Test Report</div>
                  <div className="text-sm text-gray-500">
                    Interactive test results with drill-down
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">2.3 MB</div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <div className="text-left">
                  <div className="font-medium">JUnit XML Report</div>
                  <div className="text-sm text-gray-500">
                    CI/CD integration format
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">145 KB</div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📄</span>
                <div className="text-left">
                  <div className="font-medium">Detailed Execution Logs</div>
                  <div className="text-sm text-gray-500">
                    Complete test execution trace
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">8.7 MB</div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Visual Evidence</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📸</span>
                <div className="text-left">
                  <div className="font-medium">UI Test Screenshots</div>
                  <div className="text-sm text-gray-500">
                    Evidence from all UI tests (127 files)
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">45.2 MB</div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎥</span>
                <div className="text-left">
                  <div className="font-medium">E2E Test Recordings</div>
                  <div className="text-sm text-gray-500">
                    Full workflow execution videos
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">156.8 MB</div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📊</span>
                <div className="text-left">
                  <div className="font-medium">Performance Visualizations</div>
                  <div className="text-sm text-gray-500">
                    Load test graphs and metrics
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">12.4 MB</div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Coverage & Quality</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <div className="text-left">
                  <div className="font-medium">Istanbul Coverage Report</div>
                  <div className="text-sm text-gray-500">
                    Interactive code coverage analysis
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">3.1 MB</div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📋</span>
                <div className="text-left">
                  <div className="font-medium">
                    Requirements Traceability Matrix
                  </div>
                  <div className="text-sm text-gray-500">
                    BRD requirement to test mapping
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">892 KB</div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⚡</span>
                <div className="text-left">
                  <div className="font-medium">Performance Benchmark Data</div>
                  <div className="text-sm text-gray-500">
                    Raw metrics and trend analysis
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">5.7 MB</div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Security & Compliance</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔒</span>
                <div className="text-left">
                  <div className="font-medium">OWASP ZAP Security Report</div>
                  <div className="text-sm text-gray-500">
                    Comprehensive vulnerability assessment
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">1.8 MB</div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🛡️</span>
                <div className="text-left">
                  <div className="font-medium">PDPA Compliance Report</div>
                  <div className="text-sm text-gray-500">
                    Data protection validation results
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">743 KB</div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between p-3 border rounded hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">♿</span>
                <div className="text-left">
                  <div className="font-medium">WCAG Accessibility Audit</div>
                  <div className="text-sm text-gray-500">
                    Complete accessibility compliance report
                  </div>
                </div>
              </div>
              <div className="text-right text-sm">
                <div className="text-blue-600 font-medium">Download</div>
                <div className="text-gray-500">1.2 MB</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Artifact Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-sm text-blue-800">
          <div>
            Total Files: <span className="font-medium">147</span>
          </div>
          <div>
            Total Size: <span className="font-medium">234.7 MB</span>
          </div>
          <div>
            Retention: <span className="font-medium">90 days</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto p-6 bg-gray-50 h-screen overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Test Execution Report
            </h1>
            <p className="text-gray-600 mt-1">
              BrightWave Tenant Onboarding - Complete Test Results & Analysis
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <span>📧</span>
              <span>Email Report</span>
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <span>📄</span>
              <span>Export PDF</span>
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
              <span>🔗</span>
              <span>Share Link</span>
            </button>
          </div>
        </div>

        {/* Enhanced Report Metadata */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Execution ID:</span>
              <div className="font-mono text-gray-900">
                {reportData.executionId}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Date & Time:</span>
              <div className="text-gray-900">{reportData.executionDate}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Environment:</span>
              <div className="text-gray-900">{reportData.environment.name}</div>
              <div className="text-gray-500">
                {reportData.environment.infrastructure}
              </div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Total Duration:</span>
              <div className="text-gray-900">{reportData.totalDuration}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">
                Test Frameworks:
              </span>
              <div className="text-gray-900">
                {reportData.testFrameworks.length} tools
              </div>
              <div className="text-gray-500">Jest, Cypress, JMeter...</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="mb-6">
        <nav className="flex space-x-1 bg-white p-1 rounded-lg border shadow-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="min-h-96">{renderContent()}</div>

      {/* Enhanced Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-center text-sm text-gray-500 mb-3">
            <p className="font-medium">
              Generated by BrightWave Test Automation Suite v2.1.4
            </p>
            <p>
              Execution completed on {reportData.executionDate} • Report
              generated at {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-400">
            <div>
              <span className="font-medium">Test Environment:</span>
              <div>{reportData.environment.name}</div>
            </div>
            <div>
              <span className="font-medium">Infrastructure:</span>
              <div>{reportData.environment.infrastructure}</div>
            </div>
            <div>
              <span className="font-medium">Database:</span>
              <div>{reportData.environment.database}</div>
            </div>
            <div>
              <span className="font-medium">Frameworks:</span>
              <div>{reportData.testFrameworks.join(", ")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

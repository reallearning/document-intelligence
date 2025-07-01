"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FrontendTestRunner() {
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState("login");
  const [highlightedElement, setHighlightedElement] = useState(null);
  const [allDone, setAllDone] = useState(false);

  const frontendTests = [
    {
      id: "F-THEME-01",
      name: "Global shell brand colours render",
      page: "shell",
      status: "pending",
      steps: [
        {
          action: "Navigate to application shell",
          target: "body",
          expected: "Page loads",
        },
        {
          action: "Verify primary color #032F62",
          target: ".header",
          expected: "Correct brand color",
        },
        {
          action: "Check secondary color #18D1C8",
          target: ".accent",
          expected: "Accent color matches",
        },
        {
          action: "Validate CSS variables",
          target: ":root",
          expected: "Custom properties set",
        },
      ],
    },
    {
      id: "F-LOGIN-01",
      name: "Login logo & palette mobile",
      page: "login",
      status: "pending",
      steps: [
        {
          action: "Navigate to login page",
          target: "body",
          expected: "Login form visible",
        },
        {
          action: "Verify BrightWave logo presence",
          target: ".logo",
          expected: "Logo displayed",
        },
        {
          action: "Check mobile responsive design",
          target: ".login-container",
          expected: "Mobile layout correct",
        },
        {
          action: "Validate color palette consistency",
          target: ".btn-primary",
          expected: "Brand colors applied",
        },
      ],
    },
    {
      id: "F-DASH-01",
      name: "Employer dashboard tile widgets",
      page: "dashboard",
      status: "pending",
      steps: [
        {
          action: "Navigate to employer dashboard",
          target: "body",
          expected: "Dashboard loads",
        },
        {
          action: "Verify benefits tile widget",
          target: ".widget-benefits",
          expected: "Benefits widget visible",
        },
        {
          action: "Check employees tile widget",
          target: ".widget-employees",
          expected: "Employees widget visible",
        },
        {
          action: "Validate claims tile widget",
          target: ".widget-claims",
          expected: "Claims widget visible",
        },
      ],
    },
    {
      id: "F-PLAN-01",
      name: "Plan Designer drag CI tile → cost update",
      page: "planner",
      status: "pending",
      steps: [
        {
          action: "Navigate to plan designer",
          target: "body",
          expected: "Plan designer loads",
        },
        {
          action: "Locate Critical Illness tile",
          target: ".benefit-tile[data-type='CRIT_ILL']",
          expected: "CI tile found",
        },
        {
          action: "Drag CI tile to plan canvas",
          target: ".plan-canvas",
          expected: "Tile added to plan",
        },
        {
          action: "Verify cost calculation update",
          target: ".cost-summary",
          expected: "Cost increases correctly",
        },
      ],
    },
    {
      id: "F-WAL-01",
      name: "Wallet coverage ring & e-card",
      page: "wallet",
      status: "pending",
      steps: [
        {
          action: "Navigate to employee wallet",
          target: "body",
          expected: "Wallet page loads",
        },
        {
          action: "Verify coverage ring display",
          target: ".coverage-ring",
          expected: "Ring chart visible",
        },
        {
          action: "Check e-card presence",
          target: ".insurance-card",
          expected: "Digital card shown",
        },
        {
          action: "Validate card interactive features",
          target: ".card-flip",
          expected: "Card can be flipped",
        },
      ],
    },
    {
      id: "F-CLAIM-01",
      name: "Claims wizard upload guardrails",
      page: "claims",
      status: "pending",
      steps: [
        {
          action: "Navigate to claims wizard",
          target: "body",
          expected: "Claims form loads",
        },
        {
          action: "Test file upload component",
          target: ".file-upload",
          expected: "Upload area visible",
        },
        {
          action: "Verify file size validation",
          target: ".upload-error",
          expected: "Size limit enforced",
        },
        {
          action: "Check file type restrictions",
          target: ".file-types",
          expected: "Only allowed types accepted",
        },
      ],
    },
    {
      id: "F-A11Y-01",
      name: "Buttons keyboard / aria",
      page: "accessibility",
      status: "pending",
      steps: [
        {
          action: "Test keyboard navigation",
          target: "button",
          expected: "Buttons focusable",
        },
        {
          action: "Verify ARIA labels",
          target: "[aria-label]",
          expected: "Labels present",
        },
        {
          action: "Check tab order",
          target: ".tab-sequence",
          expected: "Logical tab sequence",
        },
        {
          action: "Validate screen reader support",
          target: "[role]",
          expected: "Roles properly defined",
        },
      ],
    },
  ];

  const [tests, setTests] = useState(frontendTests);

  const pages = {
    login: {
      title: "BrightWave Login",
      url: "https://app.brightwave.com/login",
    },
    shell: {
      title: "BrightWave Application",
      url: "https://app.brightwave.com/dashboard",
    },
    dashboard: {
      title: "Employer Dashboard",
      url: "https://app.brightwave.com/employer/dashboard",
    },
    planner: {
      title: "Plan Designer",
      url: "https://app.brightwave.com/employer/plans/designer",
    },
    wallet: {
      title: "Employee Wallet",
      url: "https://app.brightwave.com/employee/wallet",
    },
    claims: {
      title: "Claims Wizard",
      url: "https://app.brightwave.com/employee/claims/new",
    },
    accessibility: {
      title: "Accessibility Test Page",
      url: "https://app.brightwave.com/accessibility-test",
    },
  };

  const addLog = (type, message, details = null) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { type, message, details, timestamp }]);
  };

  const executeCurrentStep = () => {
    if (currentTestIndex >= tests.length) return;

    const currentTest = tests[currentTestIndex];
    const currentStep = currentTest.steps[currentStepIndex];

    if (!currentStep) {
      // Test completed
      setTests((prev) =>
        prev.map((test, idx) =>
          idx === currentTestIndex ? { ...test, status: "passed" } : test
        )
      );

      addLog("success", `✓ Test ${currentTest.id} completed successfully`);

      // Move to next test
      setCurrentTestIndex((prev) => prev + 1);
      setCurrentStepIndex(0);
      return;
    }

    // Update test status to running
    setTests((prev) =>
      prev.map((test, idx) =>
        idx === currentTestIndex ? { ...test, status: "running" } : test
      )
    );

    // Set page for current test
    setCurrentPage(currentTest.page);
    setHighlightedElement(currentStep.target);

    addLog("info", `Executing: ${currentStep.action}`, {
      target: currentStep.target,
      expected: currentStep.expected,
    });

    // Simulate step execution
    setTimeout(() => {
      addLog("success", `✓ Step completed: ${currentStep.expected}`);
      setHighlightedElement(null);
      setCurrentStepIndex((prev) => prev + 1);
    }, Math.random() * 500);
  };

  const startTests = () => {
    setIsRunning(true);
    setCurrentTestIndex(0);
    setCurrentStepIndex(0);
    setLogs([]);
    addLog("info", "🚀 Starting Frontend UI Test Suite...");

    setTests((prev) => prev.map((test) => ({ ...test, status: "pending" })));
  };

  const stopTests = () => {
    setIsRunning(false);
    addLog("warning", "⏹️ Test execution stopped by user");
  };

  useEffect(() => {
    if (isRunning && currentTestIndex < tests.length) {
      const timer = setTimeout(executeCurrentStep, 500);
      return () => clearTimeout(timer);
    } else if (isRunning && currentTestIndex >= tests.length) {
      setIsRunning(false);
      addLog("success", "🎉 All tests completed successfully!");
      setAllDone(true);
    }
  }, [isRunning, currentTestIndex, currentStepIndex]);

  const getLogIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📝";
    }
  };

  const getLogColor = (type) => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const renderMockWebpage = () => {
    const currentPageData = pages[currentPage];

    return (
      <div className="h-full bg-white">
        {/* Browser Chrome */}
        <div className="bg-gray-100 px-4 py-2 border-b flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600">
            {currentPageData.url}
          </div>
          <div className="text-xs text-gray-500">Chrome 91.0</div>
        </div>

        {/* Page Content */}
        <div className="p-6 h-full overflow-auto">
          {currentPage === "login" && (
            <div className="max-w-md mx-auto mt-20">
              <div
                className={`text-center mb-8 ${
                  highlightedElement === ".logo"
                    ? "ring-4 ring-blue-500 ring-opacity-50"
                    : ""
                }`}
              >
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#032F62" }}
                >
                  BrightWave
                </div>
                <div className="text-sm text-gray-600">
                  Fintech Benefits Platform
                </div>
              </div>
              <div
                className={`bg-white p-6 rounded-lg shadow-lg ${
                  highlightedElement === ".login-container"
                    ? "ring-4 ring-blue-500 ring-opacity-50"
                    : ""
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">Sign In</h2>
                <input
                  className="w-full p-3 border rounded mb-3"
                  placeholder="Email"
                />
                <input
                  className="w-full p-3 border rounded mb-4"
                  placeholder="Password"
                  type="password"
                />
                <button
                  className={`w-full p-3 text-white rounded font-medium ${
                    highlightedElement === ".btn-primary"
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                  style={{ backgroundColor: "#032F62" }}
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          {currentPage === "dashboard" && (
            <div>
              <div
                className={`mb-6 ${
                  highlightedElement === ".header"
                    ? "ring-4 ring-blue-500 ring-opacity-50"
                    : ""
                }`}
              >
                <h1 className="text-2xl font-bold" style={{ color: "#032F62" }}>
                  Employer Dashboard
                </h1>
                <p className="text-gray-600">Manage your employee benefits</p>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div
                  className={`bg-white p-6 rounded-lg shadow ${
                    highlightedElement === ".widget-benefits"
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <h3 className="font-semibold mb-2">Benefits</h3>
                  <div
                    className="text-3xl font-bold"
                    style={{ color: "#18D1C8" }}
                  >
                    12
                  </div>
                  <p className="text-sm text-gray-600">Active Plans</p>
                </div>
                <div
                  className={`bg-white p-6 rounded-lg shadow ${
                    highlightedElement === ".widget-employees"
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <h3 className="font-semibold mb-2">Employees</h3>
                  <div
                    className="text-3xl font-bold"
                    style={{ color: "#18D1C8" }}
                  >
                    247
                  </div>
                  <p className="text-sm text-gray-600">Enrolled</p>
                </div>
                <div
                  className={`bg-white p-6 rounded-lg shadow ${
                    highlightedElement === ".widget-claims"
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <h3 className="font-semibold mb-2">Claims</h3>
                  <div
                    className="text-3xl font-bold"
                    style={{ color: "#18D1C8" }}
                  >
                    8
                  </div>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>
          )}

          {currentPage === "planner" && (
            <div>
              <h1
                className="text-2xl font-bold mb-6"
                style={{ color: "#032F62" }}
              >
                Plan Designer
              </h1>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Available Benefits</h3>
                  <div
                    className={`bg-white p-4 rounded-lg border-2 border-dashed cursor-move ${
                      highlightedElement ===
                      ".benefit-tile[data-type='CRIT_ILL']"
                        ? "ring-4 ring-blue-500 ring-opacity-50"
                        : ""
                    }`}
                  >
                    <div className="font-medium">Critical Illness</div>
                    <div className="text-sm text-gray-600">
                      Health Protection
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Plan Canvas</h3>
                  <div
                    className={`bg-gray-50 p-6 rounded-lg border-2 border-dashed min-h-40 ${
                      highlightedElement === ".plan-canvas"
                        ? "ring-4 ring-blue-500 ring-opacity-50"
                        : ""
                    }`}
                  >
                    <div className="text-center text-gray-400">
                      Drop benefits here
                    </div>
                  </div>
                  <div
                    className={`mt-4 p-3 bg-white rounded ${
                      highlightedElement === ".cost-summary"
                        ? "ring-4 ring-blue-500 ring-opacity-50"
                        : ""
                    }`}
                  >
                    <div className="font-semibold">
                      Total Cost: ₹2,450/month
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "wallet" && (
            <div>
              <h1
                className="text-2xl font-bold mb-6"
                style={{ color: "#032F62" }}
              >
                My Wallet
              </h1>
              <div className="grid grid-cols-2 gap-6">
                <div
                  className={`${
                    highlightedElement === ".coverage-ring"
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <h3 className="font-semibold mb-3">Coverage Overview</h3>
                  <div className="w-40 h-40 border-8 border-green-500 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">85%</div>
                      <div className="text-sm">Covered</div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    highlightedElement === ".insurance-card"
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <h3 className="font-semibold mb-3">Insurance Card</h3>
                  <div
                    className={`bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg text-white ${
                      highlightedElement === ".card-flip"
                        ? "ring-4 ring-white ring-opacity-50"
                        : ""
                    }`}
                  >
                    <div className="text-lg font-bold">BrightWave</div>
                    <div className="mt-4">
                      <div className="text-sm opacity-75">Member ID</div>
                      <div className="font-mono">BW-EMP-247891</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "claims" && (
            <div>
              <h1
                className="text-2xl font-bold mb-6"
                style={{ color: "#032F62" }}
              >
                File a Claim
              </h1>
              <div className="max-w-2xl">
                <div
                  className={`border-2 border-dashed border-gray-300 p-8 text-center rounded-lg ${
                    highlightedElement === ".file-upload"
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <div className="text-4xl mb-4">📎</div>
                  <div className="font-medium">
                    Drop files here or click to upload
                  </div>
                  <div
                    className={`text-sm text-gray-500 mt-2 ${
                      highlightedElement === ".file-types"
                        ? "ring-4 ring-blue-500 ring-opacity-50"
                        : ""
                    }`}
                  >
                    Supported: PDF, JPG, PNG (max 10MB)
                  </div>
                </div>
                <div
                  className={`mt-4 text-red-600 text-sm ${
                    highlightedElement === ".upload-error"
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  File size exceeds maximum limit of 10MB
                </div>
              </div>
            </div>
          )}

          {currentPage === "accessibility" && (
            <div>
              <h1
                className="text-2xl font-bold mb-6"
                style={{ color: "#032F62" }}
              >
                Accessibility Test
              </h1>
              <div className="space-y-4">
                <button
                  className={`px-4 py-2 bg-blue-600 text-white rounded ${
                    highlightedElement === "button"
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                  aria-label="Primary action button"
                  role="button"
                >
                  Test Button
                </button>
                <div
                  className={`${
                    highlightedElement === "[aria-label]"
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <input
                    aria-label="Search input field"
                    placeholder="Search..."
                    className="border p-2 rounded"
                  />
                </div>
                <div
                  className={`${
                    highlightedElement === ".tab-sequence"
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <button className="mr-2 px-3 py-1 border rounded">
                    Tab 1
                  </button>
                  <button className="mr-2 px-3 py-1 border rounded">
                    Tab 2
                  </button>
                  <button className="px-3 py-1 border rounded">Tab 3</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-gray-100 flex overflow-auto">
      {/* Left Panel - Test Runner */}
      <div className="w-1/2 bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Cypress Test Runner
            </h2>
            <div className="flex space-x-2">
              {!allDone && (
                <button
                  onClick={startTests}
                  disabled={isRunning}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                >
                  {isRunning ? "Running..." : "Run All"}
                </button>
              )}
              {allDone && (
                <Link href={"/brightview/test-results"}>
                  <button
                    disabled={isRunning}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                  >
                    Go back to test cases
                  </button>
                </Link>
              )}
              <button
                onClick={stopTests}
                disabled={!isRunning}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
              >
                Stop
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Frontend UI Tests •{" "}
            {tests.filter((t) => t.status === "passed").length}/{tests.length}{" "}
            passed
          </div>
        </div>

        {/* Test List */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Test Specs
            </h3>
            {tests.map((test, index) => (
              <div
                key={test.id}
                className={`p-3 mb-2 rounded border-l-4 ${
                  test.status === "running"
                    ? "bg-blue-50 border-blue-500"
                    : test.status === "passed"
                    ? "bg-green-50 border-green-500"
                    : test.status === "failed"
                    ? "bg-red-50 border-red-500"
                    : "bg-white border-gray-300"
                } ${currentTestIndex === index ? "ring-2 ring-blue-500" : ""}`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs">
                    {test.status === "running"
                      ? "🔄"
                      : test.status === "passed"
                      ? "✅"
                      : test.status === "failed"
                      ? "❌"
                      : "⏳"}
                  </span>
                  <span className="font-mono text-xs text-blue-600">
                    {test.id}
                  </span>
                </div>
                <div className="text-sm mt-1 text-gray-900">{test.name}</div>
                {currentTestIndex === index && test.status === "running" && (
                  <div className="mt-2 text-xs text-gray-600">
                    Step {currentStepIndex + 1}/{test.steps.length}:{" "}
                    {test.steps[currentStepIndex]?.action}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Console Logs */}
        <div className="h-1/3 border-t border-gray-700">
          <div className="p-3 bg-gray-800">
            <h3 className="text-sm font-medium">Console</h3>
          </div>
          <div className="p-3 overflow-auto h-full bg-black font-mono text-xs">
            {logs.map((log, index) => (
              <div key={index} className={`mb-1 ${getLogColor(log.type)}`}>
                <span className="text-gray-500">{log.timestamp}</span>
                <span className="ml-2">{getLogIcon(log.type)}</span>
                <span className="ml-2">{log.message}</span>
                {log.details && (
                  <div className="ml-8 text-gray-400">
                    Target: {log.details.target} | Expected:{" "}
                    {log.details.expected}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Browser Simulation */}
      <div className="w-1/2 bg-white">
        <div className="h-full">{renderMockWebpage()}</div>
      </div>
    </div>
  );
}

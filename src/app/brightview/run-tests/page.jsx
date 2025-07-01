"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function TestExecutionDashboard() {
  const [currentPhase, setCurrentPhase] = useState("frontend");
  const [executionStarted, setExecutionStarted] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);

  const testPhases = [
    {
      id: "unit",
      name: "Unit & Component Tests",
      status: "completed",
      duration: "2m 34s",
      passed: 7,
      failed: 0,
      total: 7,
      startTime: "09:15:22",
      endTime: "09:17:56",
    },
    {
      id: "backend",
      name: "Backend Integration Tests",
      status: "completed",
      duration: "4m 12s",
      passed: 7,
      failed: 0,
      total: 7,
      startTime: "09:17:56",
      endTime: "09:22:08",
    },
    {
      id: "frontend",
      name: "Frontend UI Tests",
      status: "ready",
      duration: "~3m 45s",
      passed: 0,
      failed: 0,
      total: 7,
      startTime: null,
      endTime: null,
    },
    {
      id: "e2e",
      name: "End-to-End Tests",
      status: "pending",
      duration: "~8m 20s",
      passed: 0,
      failed: 0,
      total: 6,
      startTime: null,
      endTime: null,
    },
    {
      id: "regression",
      name: "Regression Tests",
      status: "pending",
      duration: "~2m 15s",
      passed: 0,
      failed: 0,
      total: 3,
      startTime: null,
      endTime: null,
    },
    {
      id: "performance",
      name: "Performance Tests",
      status: "pending",
      duration: "~12m 30s",
      passed: 0,
      failed: 0,
      total: 4,
      startTime: null,
      endTime: null,
    },
    {
      id: "security",
      name: "Security Tests",
      status: "pending",
      duration: "~5m 45s",
      passed: 0,
      failed: 0,
      total: 4,
      startTime: null,
      endTime: null,
    },
    {
      id: "negative",
      name: "Edge Cases Tests",
      status: "pending",
      duration: "~3m 10s",
      passed: 0,
      failed: 0,
      total: 4,
      startTime: null,
      endTime: null,
    },
    {
      id: "accessibility",
      name: "Accessibility Tests",
      status: "pending",
      duration: "~2m 30s",
      passed: 0,
      failed: 0,
      total: 3,
      startTime: null,
      endTime: null,
    },
    {
      id: "migration",
      name: "Data Migration Tests",
      status: "pending",
      duration: "~1m 45s",
      passed: 0,
      failed: 0,
      total: 2,
      startTime: null,
      endTime: null,
    },
    {
      id: "observability",
      name: "Observability Tests",
      status: "pending",
      duration: "~2m 55s",
      passed: 0,
      failed: 0,
      total: 3,
      startTime: null,
      endTime: null,
    },
  ];

  const frontendTests = [
    {
      id: "F-THEME-01",
      name: "Global shell brand colours render",
      status: "pending",
    },
    {
      id: "F-LOGIN-01",
      name: "Login logo & palette mobile",
      status: "pending",
    },
    {
      id: "F-DASH-01",
      name: "Employer dashboard tile widgets",
      status: "pending",
    },
    {
      id: "F-PLAN-01",
      name: "Plan Designer drag CI tile → cost update",
      status: "pending",
    },
    {
      id: "F-WAL-01",
      name: "Wallet coverage ring & e-card",
      status: "pending",
    },
    {
      id: "F-CLAIM-01",
      name: "Claims wizard upload guardrails",
      status: "pending",
    },
    { id: "F-A11Y-01", name: "Buttons keyboard / aria", status: "pending" },
  ];

  const [frontendTestStatus, setFrontendTestStatus] = useState(frontendTests);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <span className="text-green-600 text-lg">✅</span>;
      case "running":
        return <span className="text-blue-600 text-lg animate-spin">⚙️</span>;
      case "ready":
        return <span className="text-yellow-600 text-lg">⏯️</span>;
      case "pending":
        return <span className="text-gray-400 text-lg">⏸️</span>;
      case "failed":
        return <span className="text-red-600 text-lg">❌</span>;
      default:
        return <span className="text-gray-400 text-lg">⏸️</span>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "border-green-500 bg-green-50";
      case "running":
        return "border-blue-500 bg-blue-50";
      case "ready":
        return "border-yellow-500 bg-yellow-50";
      case "pending":
        return "border-gray-300 bg-gray-50";
      case "failed":
        return "border-red-500 bg-red-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const startFrontendTests = () => {
    setExecutionStarted(true);
    setCurrentTest(0);

    // Update phase status to running
    const frontendPhase = testPhases.find((p) => p.id === "frontend");
    frontendPhase.status = "running";
    frontendPhase.startTime = new Date().toLocaleTimeString();

    // Simulate test execution
    const executeTest = (index) => {
      if (index >= frontendTests.length) {
        // All tests completed
        frontendPhase.status = "completed";
        frontendPhase.endTime = new Date().toLocaleTimeString();
        frontendPhase.passed = frontendTests.length;
        frontendPhase.duration = "3m 42s";
        setCurrentPhase("e2e");
        return;
      }

      setCurrentTest(index);
      setFrontendTestStatus((prev) =>
        prev.map((test, i) => ({
          ...test,
          status: i === index ? "running" : i < index ? "completed" : "pending",
        }))
      );

      setTimeout(() => {
        setFrontendTestStatus((prev) =>
          prev.map((test, i) => ({
            ...test,
            status: i <= index ? "completed" : "pending",
          }))
        );
        executeTest(index + 1);
      }, Math.random() * 2000 + 1500); // Random delay between 1.5-3.5s
    };

    executeTest(0);
  };

  const calculateProgress = () => {
    const completedPhases = testPhases.filter(
      (p) => p.status === "completed"
    ).length;
    const totalPhases = testPhases.length;
    return Math.round((completedPhases / totalPhases) * 100);
  };

  const getTotalDuration = () => {
    const completed = testPhases.filter((p) => p.status === "completed");
    const totalSeconds = completed.reduce((acc, phase) => {
      const [minutes, seconds] = phase.duration.split("m ");
      return acc + parseInt(minutes) * 60 + parseInt(seconds.replace("s", ""));
    }, 0);

    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="mx-auto p-6 bg-gray-50 h-screen overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Test Execution Pipeline
            </h1>
            <p className="text-gray-600 mt-2">
              BrightWave Tenant Onboarding - Automated Test Suite
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {calculateProgress()}%
            </div>
            <div className="text-sm text-gray-500">Overall Progress</div>
            <div className="text-sm text-gray-500 mt-1">
              Elapsed: {getTotalDuration()}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-green-600">
              {testPhases.reduce((acc, p) => acc + p.passed, 0)}
            </div>
            <div className="text-sm text-gray-500">Tests Passed</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-red-600">
              {testPhases.reduce((acc, p) => acc + p.failed, 0)}
            </div>
            <div className="text-sm text-gray-500">Tests Failed</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-gray-600">
              {testPhases.filter((p) => p.status === "completed").length}
            </div>
            <div className="text-sm text-gray-500">Phases Complete</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl font-bold text-yellow-600">
              {testPhases.filter((p) => p.status === "pending").length}
            </div>
            <div className="text-sm text-gray-500">Phases Pending</div>
          </div>
        </div>
      </div>

      {/* Test Phases Pipeline */}
      <div className="space-y-4">
        {testPhases.map((phase, index) => (
          <div
            key={phase.id}
            className={`border-2 rounded-lg p-6 transition-all duration-300 ${getStatusColor(
              phase.status
            )} ${phase.status === "pending" ? "opacity-50" : "opacity-100"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2">
                  {getStatusIcon(phase.status)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {phase.name}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>
                      {phase.passed}/{phase.total} tests passed
                    </span>
                    <span>Duration: {phase.duration}</span>
                    {phase.startTime && <span>Started: {phase.startTime}</span>}
                    {phase.endTime && <span>Ended: {phase.endTime}</span>}
                  </div>
                </div>
              </div>

              {/* Action Button for Frontend Tests */}
              {phase.id === "frontend" && phase.status === "ready" && (
                <Link href="/brightview/tests-execution">
                  <button
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg animate-pulse"
                    disabled={executionStarted}
                  >
                    {executionStarted
                      ? "Running..."
                      : "Start Frontend UI Tests"}
                  </button>
                </Link>
              )}

              {/* Progress for Current Running Phase */}
              {phase.status === "running" && phase.id === "frontend" && (
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">
                    Test {currentTest + 1} of {frontendTests.length}
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          ((currentTest + 1) / frontendTests.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Frontend Test Status */}
            {phase.id === "frontend" && executionStarted && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  Individual Test Status:
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {frontendTestStatus.map((test) => (
                    <div
                      key={test.id}
                      className={`flex items-center space-x-3 p-2 rounded ${
                        test.status === "running"
                          ? "bg-blue-100"
                          : test.status === "completed"
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <span className="font-mono text-xs">{test.id}</span>
                      <span className="text-sm flex-1">{test.name}</span>
                      <span className="text-xs">
                        {test.status === "running" && "🔄"}
                        {test.status === "completed" && "✅"}
                        {test.status === "pending" && "⏳"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 p-4 bg-white border rounded-lg">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            <strong>Environment:</strong> staging.brightwave.com |{" "}
            <strong>Browser:</strong> Chrome 91+ | <strong>Viewport:</strong>{" "}
            1920x1080, Mobile 375x667
          </div>
          <div>
            <strong>Test Run ID:</strong>{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              BWV-{Date.now().toString().slice(-6)}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

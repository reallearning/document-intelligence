"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function TestExecutionPipeline() {
  const [currentPhase, setCurrentPhase] = useState("e2e");
  const [executionStarted, setExecutionStarted] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);
  const [autoRun, setAutoRun] = useState(false);

  const [testPhases, setTestPhases] = useState([
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
      status: "completed",
      duration: "3m 42s",
      passed: 7,
      failed: 0,
      total: 7,
      startTime: "09:22:08",
      endTime: "09:25:50",
    },
    {
      id: "e2e",
      name: "End-to-End Tests",
      status: "ready",
      duration: "~8m 20s",
      passed: 0,
      failed: 0,
      total: 6,
      startTime: null,
      endTime: null,
      estimatedDuration: 500,
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
      estimatedDuration: 135,
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
      estimatedDuration: 750,
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
      estimatedDuration: 345,
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
      estimatedDuration: 190,
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
      estimatedDuration: 150,
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
      estimatedDuration: 105,
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
      estimatedDuration: 175,
    },
  ]);

  const phaseTests = {
    e2e: [
      "E2E-ONB-01",
      "E2E-EMP-01",
      "E2E-CLA-CASH",
      "E2E-CLA-REM",
      "E2E-INV-01",
      "E2E-THEME-01",
    ],
    regression: ["R-ENUM-01", "R-THEME-01", "R-INV-01"],
    performance: ["P-API-01", "P-DB-01", "P-FE-01", "P-UP-01"],
    security: ["S-AUTH-01", "S-TEN-01", "S-PDPA-01", "S-XSS-01"],
    negative: ["N-FILE-01", "N-CODE-01", "N-ROLE-01", "N-INV-01"],
    accessibility: ["A-COLOR-01", "A-ARIA-01", "A-TAB-01"],
    migration: ["M-UP-01", "M-DOWN-01"],
    observability: ["O-LOG-01", "O-MET-01", "O-ALERT-01"],
  };

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

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const startPhase = (phaseId) => {
    setExecutionStarted(true);
    setCurrentTest(0);
    setCurrentPhase(phaseId);

    // Update phase status to running
    setTestPhases((prev) =>
      prev.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              status: "running",
              startTime: new Date().toLocaleTimeString(),
            }
          : phase
      )
    );

    // Simulate test execution
    const currentPhaseData = testPhases.find((p) => p.id === phaseId);
    const testList = phaseTests[phaseId] || [];
    const testDuration = Math.floor(
      (currentPhaseData?.estimatedDuration || 300) / testList.length
    );

    const executeTest = (index) => {
      if (index >= testList.length) {
        // Phase completed
        const actualDuration = formatDuration(
          currentPhaseData?.estimatedDuration || 300
        );
        setTestPhases((prev) =>
          prev.map((phase) =>
            phase.id === phaseId
              ? {
                  ...phase,
                  status: "completed",
                  endTime: new Date().toLocaleTimeString(),
                  passed: testList.length,
                  duration: actualDuration,
                }
              : phase
          )
        );

        // Move to next phase
        const phaseOrder = [
          "e2e",
          "regression",
          "performance",
          "security",
          "negative",
          "accessibility",
          "migration",
          "observability",
        ];
        const currentIndex = phaseOrder.indexOf(phaseId);
        if (currentIndex < phaseOrder.length - 1) {
          const nextPhase = phaseOrder[currentIndex + 1];
          setTestPhases((prev) =>
            prev.map((phase) =>
              phase.id === nextPhase ? { ...phase, status: "ready" } : phase
            )
          );
          setCurrentPhase(nextPhase);

          // Auto-run next phase if enabled
          if (autoRun) {
            setTimeout(() => startPhase(nextPhase), 500);
          }
        }

        setExecutionStarted(false);
        return;
      }

      setCurrentTest(index);
      setTimeout(() => executeTest(index + 1), 200);
    };

    executeTest(0);
  };

  const startAutoRun = () => {
    setAutoRun(true);
    const readyPhase = testPhases.find((p) => p.status === "ready");
    if (readyPhase) {
      startPhase(readyPhase.id);
    }
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
    const totalTime = completed.reduce((acc, phase) => {
      if (phase.duration.includes("m")) {
        const [minutes, seconds] = phase.duration.split("m ");
        return (
          acc + parseInt(minutes) * 60 + parseInt(seconds.replace("s", ""))
        );
      }
      return acc;
    }, 0);

    return formatDuration(totalTime);
  };

  const getEstimatedTimeRemaining = () => {
    const pending = testPhases.filter(
      (p) => p.status === "pending" || p.status === "ready"
    );
    const totalSeconds = pending.reduce(
      (acc, phase) => acc + (phase.estimatedDuration || 0),
      0
    );
    return formatDuration(totalSeconds);
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
            <div className="text-sm text-gray-500">
              ETA: {getEstimatedTimeRemaining()}
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

        {/* Control Panel */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={startAutoRun}
              disabled={
                autoRun || !testPhases.some((p) => p.status === "ready")
              }
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {autoRun ? "Auto-Run Active" : "Start Auto-Run"}
            </button>
            <div className="text-sm text-gray-600">
              {autoRun
                ? "🤖 Automatically executing remaining phases"
                : "💡 Click to run all remaining phases automatically"}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <strong>Environment:</strong> staging.brightwave.com
          </div>
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
              {
                testPhases.filter(
                  (p) => p.status === "pending" || p.status === "ready"
                ).length
              }
            </div>
            <div className="text-sm text-gray-500">Phases Remaining</div>
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

              {/* Action Button for Ready Phases */}
              {phase.status === "ready" && !autoRun && (
                <button
                  onClick={() => startPhase(phase.id)}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg animate-pulse"
                  disabled={executionStarted}
                >
                  {executionStarted ? "Running..." : `Start ${phase.name}`}
                </button>
              )}

              {/* Progress for Current Running Phase */}
              {phase.status === "running" && (
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">
                    Test {currentTest + 1} of {phase.total}
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${((currentTest + 1) / phase.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {phaseTests[phase.id]?.[currentTest] || "Executing..."}
                  </div>
                </div>
              )}

              {/* Completed Phase Summary */}
              {phase.status === "completed" && (
                <div className="text-right">
                  <div className="text-green-600 font-semibold">
                    ✓ Completed
                  </div>
                  <div className="text-sm text-gray-500">All tests passed</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Completion Banner */}
      {calculateProgress() === 100 && (
        <div className="mt-8 p-6 bg-green-50 border-2 border-green-500 rounded-lg text-center">
          <div className="text-2xl text-green-600 mb-2">
            🎉 Test Suite Completed Successfully!
          </div>
          <div className="text-green-700">
            All {testPhases.reduce((acc, p) => acc + p.total, 0)} tests passed
            in {getTotalDuration()}
          </div>
          <div className="mt-4">
            <Link href="/brightview/test-report">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Generate Test Report
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

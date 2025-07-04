"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

const TestExecutionScreen = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentTest, setCurrentTest] = useState("");
  const [executionResults, setExecutionResults] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const [pauseReason, setPauseReason] = useState("");
  const [progress, setProgress] = useState(0);
  const [totalTests] = useState(25);
  const [completedTests, setCompletedTests] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);

  // Use ref to track if execution should continue
  const executionRef = useRef(null);

  // Test execution sequence
  const testSequence = [
    {
      category: "Unit & Component",
      tests: ["U-01", "U-02", "U-03", "U-04"],
      duration: 2000,
    },
    {
      category: "Backend Integration",
      tests: ["B-01", "B-02", "B-03"],
      duration: 3000,
    },
    {
      category: "API",
      tests: ["A-01", "A-02", "A-03", "A-04"],
      duration: 1500,
    },
    { category: "Performance", tests: ["P-01", "P-02"], duration: 4000 },
    { category: "Security", tests: ["S-01"], duration: 2000 },
    { category: "Reporting", tests: ["R-01"], duration: 2500 },
    {
      category: "Functional",
      tests: [
        "F-01",
        "F-02",
        "F-03",
        "F-04",
        "F-05",
        "F-06",
        "F-07",
        "F-08",
        "F-09",
        "F-10",
      ],
      duration: 2000,
    },
    {
      category: "Visual UI Testing",
      tests: ["V-01", "V-02", "V-03", "V-04"],
      duration: 0,
      requiresManual: true,
    },
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning && startTime && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime, isPaused]);

  // Main execution function
  const executeTestSequence = async () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setCurrentCategoryIndex(0);
    setCurrentTestIndex(0);

    executionRef.current = { shouldContinue: true };

    let testCount = 0;

    for (
      let categoryIdx = 0;
      categoryIdx < testSequence.length;
      categoryIdx++
    ) {
      if (!executionRef.current?.shouldContinue) break;

      const categoryGroup = testSequence[categoryIdx];
      setCurrentCategory(categoryGroup.category);
      setCurrentCategoryIndex(categoryIdx);

      // Pause at Visual UI Testing
      if (categoryGroup.category === "Visual UI Testing") {
        setIsPaused(true);
        setPauseReason("manual_review");
        setCurrentTest("Waiting for manual visual validation...");
        return; // Stop execution here
      }

      // Execute tests in this category
      for (let testIdx = 0; testIdx < categoryGroup.tests.length; testIdx++) {
        if (!executionRef.current?.shouldContinue) break;

        const testId = categoryGroup.tests[testIdx];
        setCurrentTest(testId);
        setCurrentTestIndex(testIdx);

        // Simulate test execution with proper delay
        const testDuration = Math.max(
          500,
          categoryGroup.duration / categoryGroup.tests.length
        );

        await new Promise((resolve) => {
          setTimeout(resolve, testDuration);
        });

        // Check again after delay
        if (!executionRef.current?.shouldContinue) break;

        // Random success/failure for demo (90% success rate)
        const success = Math.random() > 0.1;
        const result = {
          status: success ? "passed" : "failed",
          duration: Math.floor(Math.random() * 1000) + 500,
          message: success
            ? "Test completed successfully"
            : "Test failed - see logs for details",
        };

        setExecutionResults((prev) => ({
          ...prev,
          [testId]: result,
        }));

        testCount++;
        setCompletedTests(testCount);
        setProgress((testCount / totalTests) * 100);
      }
    }

    // Complete execution if we got here
    if (executionRef.current?.shouldContinue) {
      setIsRunning(false);
      setCurrentTest("All tests completed");
    }
  };

  const continueExecution = async () => {
    setIsPaused(false);
    setPauseReason("");
    setIsRunning(true);

    executionRef.current = { shouldContinue: true };

    // Continue with remaining tests (skip Visual UI Testing)
    const remainingSequence = testSequence.slice(7);
    let testCount = completedTests;

    for (
      let categoryIdx = 0;
      categoryIdx < remainingSequence.length;
      categoryIdx++
    ) {
      if (!executionRef.current?.shouldContinue) break;

      const categoryGroup = remainingSequence[categoryIdx];
      setCurrentCategory(categoryGroup.category);

      for (let testIdx = 0; testIdx < categoryGroup.tests.length; testIdx++) {
        if (!executionRef.current?.shouldContinue) break;

        const testId = categoryGroup.tests[testIdx];
        setCurrentTest(testId);

        const testDuration = Math.max(
          500,
          categoryGroup.duration / categoryGroup.tests.length
        );

        await new Promise((resolve) => {
          setTimeout(resolve, testDuration);
        });

        if (!executionRef.current?.shouldContinue) break;

        const success = Math.random() > 0.1;
        const result = {
          status: success ? "passed" : "failed",
          duration: Math.floor(Math.random() * 1000) + 500,
          message: success
            ? "Test completed successfully"
            : "Test failed - see logs for details",
        };

        setExecutionResults((prev) => ({
          ...prev,
          [testId]: result,
        }));

        testCount++;
        setCompletedTests(testCount);
        setProgress((testCount / totalTests) * 100);
      }
    }

    if (executionRef.current?.shouldContinue) {
      setIsRunning(false);
      setCurrentTest("All tests completed");
    }
  };

  const startExecution = () => {
    // Reset all state
    setExecutionResults({});
    setCompletedTests(0);
    setProgress(0);
    setCurrentCategory("");
    setCurrentTest("");
    setIsPaused(false);
    setPauseReason("");
    setCurrentCategoryIndex(0);
    setCurrentTestIndex(0);

    // Start execution
    executeTestSequence();
  };

  const stopExecution = () => {
    // Signal to stop execution
    if (executionRef.current) {
      executionRef.current.shouldContinue = false;
    }

    setIsRunning(false);
    setIsPaused(false);
    setCurrentTest("Execution stopped");
  };

  const resetExecution = () => {
    // Signal to stop execution
    if (executionRef.current) {
      executionRef.current.shouldContinue = false;
    }

    setIsRunning(false);
    setIsPaused(false);
    setExecutionResults({});
    setCompletedTests(0);
    setProgress(0);
    setCurrentCategory("");
    setCurrentTest("");
    setStartTime(null);
    setElapsedTime(0);
    setCurrentCategoryIndex(0);
    setCurrentTestIndex(0);
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
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

  const getStatusColor = (status) => {
    switch (status) {
      case "passed":
        return "bg-green-50 border-green-200";
      case "failed":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Test Execution Console
            </h1>
            <p className="text-gray-600">
              MalayComp Test Suite - Automated Execution
            </p>
          </div>
          <div className="flex gap-3">
            {!isRunning && !isPaused && (
              <button
                onClick={startExecution}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Play size={16} />
                Start Execution
              </button>
            )}
            {(isRunning || isPaused) && (
              <button
                onClick={stopExecution}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Pause size={16} />
                Stop
              </button>
            )}
            <button
              onClick={resetExecution}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Overall Progress
            </span>
            <span className="text-sm text-gray-500">
              {completedTests}/{totalTests} tests completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Status Info */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {
                Object.values(executionResults).filter(
                  (r) => r.status === "passed"
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {
                Object.values(executionResults).filter(
                  (r) => r.status === "failed"
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {elapsedTime ? formatTime(elapsedTime) : "0:00"}
            </div>
            <div className="text-sm text-gray-600">Elapsed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(progress)}%
            </div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      </div>

      {/* Current Execution Status */}
      {(isRunning || isPaused || currentTest) && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Current Execution
            </h2>
            <div className="flex items-center gap-2">
              {isRunning && !isPaused && (
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              )}
              {isPaused && (
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              )}
              <span className="text-sm font-medium text-gray-600">
                {isRunning && !isPaused
                  ? "Running"
                  : isPaused
                  ? "Paused"
                  : "Idle"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-600">
                Category:{" "}
              </span>
              <span className="text-sm text-gray-900">{currentCategory}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">
                Current Test:{" "}
              </span>
              <span className="text-sm text-gray-900">{currentTest}</span>
            </div>
          </div>
        </div>
      )}

      {/* Visual UI Testing Pause CTA */}
      {isPaused && pauseReason === "manual_review" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-yellow-600 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Manual Review Required
              </h3>
              <p className="text-yellow-700 mb-4">
                The test execution has paused at the{" "}
                <strong>Visual UI Testing</strong> category. This requires
                manual verification of visual components and user interface
                elements.
              </p>
              <div className="bg-white rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Visual Tests to Review:
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• V-01: Login page visual regression test</li>
                  <li>• V-02: Benefits dashboard layout validation</li>
                  <li>• V-03: Vacation purchase flow UI states</li>
                  <li>• V-04: Employee profile responsiveness</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <Link href={"/malay-comp/visual-tests"}>
                  <button
                    // onClick={}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Eye size={16} />
                    Run Visual Test Cases
                  </button>
                </Link>
                <button
                  onClick={stopExecution}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  Stop Execution
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Results */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Test Results</h2>
          <p className="text-sm text-gray-600 mt-1">
            Real-time execution results
          </p>
        </div>

        <div className="p-6">
          <div className="grid gap-3">
            {testSequence.map((categoryGroup, categoryIdx) => (
              <div
                key={categoryGroup.category}
                className={`border border-gray-200 rounded-lg p-4 ${
                  categoryIdx === currentCategoryIndex && isRunning
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                <h3 className="font-medium text-gray-900 mb-3">
                  {categoryGroup.category}
                  {categoryGroup.requiresManual && (
                    <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                      Manual Review
                    </span>
                  )}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {categoryGroup.tests.map((testId, testIdx) => {
                    const result = executionResults[testId];
                    const isCurrentTest =
                      categoryIdx === currentCategoryIndex &&
                      testIdx === currentTestIndex &&
                      isRunning &&
                      !isPaused;

                    return (
                      <div
                        key={testId}
                        className={`p-3 rounded-lg border-2 ${
                          result
                            ? getStatusColor(result.status)
                            : isCurrentTest
                            ? "bg-blue-50 border-blue-300 ring-2 ring-blue-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            {testId}
                          </span>
                          {isCurrentTest && !result ? (
                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            getStatusIcon(result?.status)
                          )}
                        </div>
                        {result && (
                          <div className="mt-1">
                            <div className="text-xs text-gray-600">
                              {result.duration}ms
                            </div>
                            {result.status === "failed" && (
                              <div className="text-xs text-red-600 mt-1">
                                {result.message}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestExecutionScreen;

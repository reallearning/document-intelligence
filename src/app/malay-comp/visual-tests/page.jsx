"use client";
import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Camera,
  Eye,
  AlertTriangle,
  RefreshCw,
  Maximize2,
  Settings,
  Download,
} from "lucide-react";
import Link from "next/link";

const VisualUITesting = () => {
  const [currentTest, setCurrentTest] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState({});
  const [currentView, setCurrentView] = useState("login");
  const [screenshotMode, setScreenshotMode] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [testsCompleted, setTestsCompleted] = useState(false);

  const visualTests = [
    {
      id: "V-01",
      name: "Login Page Visual Regression",
      view: "login",
      steps: [
        "Navigate to login page",
        "Capture baseline screenshot",
        "Compare with current UI",
        "Validate form elements positioning",
      ],
      expected: "UI matches baseline with 95% similarity",
      duration: 3000,
    },
    {
      id: "V-02",
      name: "Benefits Dashboard Layout",
      view: "benefits",
      steps: [
        "Login and navigate to benefits",
        "Capture benefits dashboard",
        "Verify card alignment and spacing",
        "Check responsive breakpoints",
      ],
      expected: "All benefit cards properly aligned and responsive",
      duration: 4000,
    },
    {
      id: "V-03",
      name: "Vacation Purchase Flow",
      view: "vacation",
      steps: [
        "Open vacation purchase dialog",
        "Test different day selections",
        "Capture error states",
        "Verify success confirmation",
      ],
      expected: "UI states match design specifications",
      duration: 3500,
    },
    {
      id: "V-04",
      name: "Employee Profile Responsiveness",
      view: "profile",
      steps: [
        "Open employee profile page",
        "Test edit mode transitions",
        "Capture form validations",
        "Check mobile responsiveness",
      ],
      expected: "Profile UI consistent across devices",
      duration: 4500,
    },
  ];

  const executeVisualTest = async (test) => {
    setCurrentTest(test);
    setIsRunning(true);
    setCurrentView(test.view);

    // Simulate test execution with steps
    for (let i = 0; i < test.steps.length; i++) {
      await new Promise((resolve) =>
        setTimeout(resolve, test.duration / test.steps.length)
      );

      // Simulate screenshot capture
      if (i === 1) {
        setScreenshotMode(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setScreenshotMode(false);
      }

      // Simulate comparison
      if (i === 2) {
        setComparisonMode(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setComparisonMode(false);
      }
    }

    // Simulate test result
    const success = Math.random() > 0.2; // 80% success rate
    const similarity = success
      ? 95 + Math.random() * 4
      : 85 + Math.random() * 8;

    setTestResults((prev) => ({
      ...prev,
      [test.id]: {
        status: success ? "passed" : "failed",
        similarity: similarity.toFixed(1),
        message: success
          ? `Visual similarity: ${similarity.toFixed(1)}%`
          : `Visual differences detected: ${similarity.toFixed(1)}% similarity`,
        screenshot: true,
      },
    }));

    setIsRunning(false);
    setCurrentTest(null);
  };

  const executeAllTests = async () => {
    for (const test of visualTests) {
      await executeVisualTest(test);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Brief pause between tests
    }
    setTestsCompleted(true);
  };

  const renderApplicationView = () => {
    switch (currentView) {
      case "login":
        return (
          <div className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">MalayComp</h1>
                <p className="text-gray-600">Employee Benefits Portal</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900">
                    john.doe@company.com
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900">
                    ••••••••
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        );

      case "benefits":
        return (
          <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Benefits Dashboard
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Medical Insurance
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive health coverage
                  </p>
                  <div className="text-2xl font-bold text-green-600">
                    450 MYR/month
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Dental Care
                  </h3>
                  <p className="text-gray-600 mb-4">Complete dental coverage</p>
                  <div className="text-2xl font-bold text-blue-600">
                    125 MYR/month
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Life Insurance
                  </h3>
                  <p className="text-gray-600 mb-4">Term life protection</p>
                  <div className="text-2xl font-bold text-purple-600">
                    200 MYR/month
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "vacation":
        return (
          <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Vacation Purchase
              </h1>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Purchase Additional Vacation Days
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Days
                    </label>
                    <div className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                      3 days
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800">
                      Cost: 3 days × 125 MYR = 375 MYR
                    </p>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    Purchase Vacation Days
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="min-h-full bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Employee Profile
              </h1>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                      John
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                      Doe
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Employee ID
                    </label>
                    <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500">
                      E12345
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                      Engineering
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mr-3">
                    Save Changes
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="min-h-full bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">
              Select a test to view the application
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen overflow-auto bg-gray-100 flex">
      {/* Left Side - Application Under Test */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
          Application Under Test
          {currentTest && (
            <span className="ml-2 font-semibold">- {currentTest.name}</span>
          )}
        </div>

        {/* Screenshot overlay */}
        {screenshotMode && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 z-10 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
              <Camera className="text-blue-600" size={24} />
              <span className="font-medium">Capturing Screenshot...</span>
            </div>
          </div>
        )}

        {/* Comparison overlay */}
        {comparisonMode && (
          <div className="absolute inset-0 bg-purple-500 bg-opacity-20 z-10 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
              <Eye className="text-purple-600" size={24} />
              <span className="font-medium">Comparing with Baseline...</span>
            </div>
          </div>
        )}

        {renderApplicationView()}
      </div>

      {/* Right Side - Test Controls */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Visual UI Testing
          </h2>
          <p className="text-sm text-gray-600">
            Automated visual regression testing
          </p>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2 mb-4">
            {testsCompleted ? (
              <Link href={"/malay-comp/test-results"}>
                <button
                  disabled={isRunning}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                  View Tests Results
                </button>
              </Link>
            ) : (
              <button
                onClick={executeAllTests}
                disabled={isRunning}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
              >
                <Play size={16} />
                Run All Tests
              </button>
            )}
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Settings size={16} />
            </button>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <Maximize2 size={14} />
              Fullscreen
            </button>
            <button className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <Download size={14} />
              Export
            </button>
          </div>
        </div>

        {/* Test List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Test Cases</h3>
            <div className="space-y-3">
              {visualTests.map((test) => {
                const result = testResults[test.id];
                const isCurrent = currentTest?.id === test.id;

                return (
                  <div
                    key={test.id}
                    className={`border rounded-lg p-3 ${
                      isCurrent
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{test.id}</span>
                        {result &&
                          (result.status === "passed" ? (
                            <CheckCircle className="text-green-500" size={16} />
                          ) : (
                            <XCircle className="text-red-500" size={16} />
                          ))}
                        {isCurrent && (
                          <RefreshCw
                            className="text-blue-500 animate-spin"
                            size={16}
                          />
                        )}
                      </div>
                      <button
                        onClick={() => executeVisualTest(test)}
                        disabled={isRunning}
                        className="text-blue-600 hover:text-blue-800 text-sm disabled:text-gray-400"
                      >
                        Run
                      </button>
                    </div>

                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {test.name}
                    </h4>

                    {result && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`font-medium ${
                              result.status === "passed"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {result.status.toUpperCase()}
                          </span>
                          {result.similarity && (
                            <span className="text-gray-600">
                              {result.similarity}% similarity
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700">{result.message}</p>
                      </div>
                    )}

                    {isCurrent && (
                      <div className="mt-2 space-y-1">
                        {test.steps.map((step, index) => (
                          <div
                            key={index}
                            className="text-xs text-gray-600 flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {step}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">Results Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {
                  Object.values(testResults).filter(
                    (r) => r.status === "passed"
                  ).length
                }
              </div>
              <div className="text-xs text-gray-600">Passed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">
                {
                  Object.values(testResults).filter(
                    (r) => r.status === "failed"
                  ).length
                }
              </div>
              <div className="text-xs text-gray-600">Failed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-600">
                {Object.keys(testResults).length}/{visualTests.length}
              </div>
              <div className="text-xs text-gray-600">Complete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualUITesting;

"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Loader2,
  Brain,
  FileText,
  Globe,
  Zap,
  Code,
  CheckCircle,
  Play,
} from "lucide-react";

const TestLoading = () => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const phases = [
    { label: "Analyzing code changes", icon: Brain, color: "text-blue-600" },
    {
      label: "Processing business requirements",
      icon: FileText,
      color: "text-indigo-600",
    },
    {
      label: "Generating functional tests",
      icon: Globe,
      color: "text-green-600",
    },
    {
      label: "Creating performance tests",
      icon: Zap,
      color: "text-purple-600",
    },
    {
      label: "Building unit test suites",
      icon: Code,
      color: "text-orange-600",
    },
  ];

  useEffect(() => {
    const totalDuration = 5000; // 5 seconds
    const phaseInterval = totalDuration / phases.length;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2; // Increment by 2% every 100ms

        // Update current phase based on progress
        const newPhase = Math.floor((newProgress / 100) * phases.length);
        setCurrentPhase(Math.min(newPhase, phases.length - 1));

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);

          // Simulate navigation to /ai-results after completion
          setTimeout(() => {
            // In a real app, this would be: router.push('/ai-results')
            window.location.href = "/test-cases-dashboard";
          }, 1000);
        }

        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  if (isComplete) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Tests Generated Successfully!
          </h2>
          <p className="text-gray-600 mb-4">Redirecting to results...</p>
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            <span className="text-sm text-gray-500">
              Loading results page...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-400 cursor-not-allowed">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Pull Request</span>
                </button>
                <div className="border-l border-gray-300 pl-4">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Generating AI Test Cases
                  </h1>
                  <p className="text-sm text-gray-600">
                    PR #341: Salary history tracking and payroll dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Tests...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI is analyzing your code changes
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Creating comprehensive test suites based on your business
            requirements and code modifications
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Phase Indicators */}
        <div className="space-y-4">
          {phases.map((phase, index) => {
            const PhaseIcon = phase.icon;
            const isCompleted = index < currentPhase;
            const isCurrent = index === currentPhase;
            const isPending = index > currentPhase;

            return (
              <div
                key={index}
                className={`flex items-center p-4 rounded-lg border-2 transition-all duration-500 ${
                  isCompleted
                    ? "bg-green-50 border-green-200"
                    : isCurrent
                    ? "bg-blue-50 border-blue-200 shadow-md"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    isCompleted
                      ? "bg-green-500"
                      : isCurrent
                      ? "bg-blue-500"
                      : "bg-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : isCurrent ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <PhaseIcon className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-medium ${
                      isCompleted
                        ? "text-green-900"
                        : isCurrent
                        ? "text-blue-900"
                        : "text-gray-600"
                    }`}
                  >
                    {phase.label}
                  </h3>
                  <p
                    className={`text-sm ${
                      isCompleted
                        ? "text-green-600"
                        : isCurrent
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {isCompleted
                      ? "Completed ✓"
                      : isCurrent
                      ? "In progress..."
                      : "Pending"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Estimated completion time */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Estimated completion:{" "}
            {Math.max(0, Math.ceil((100 - progress) / 20))} seconds remaining
          </p>
        </div>
      </div>

      {/* Bottom Activity Indicator */}
      <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              AI Test Generation
            </p>
            <p className="text-xs text-gray-500">
              {phases[currentPhase]?.label || "Processing..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLoading;

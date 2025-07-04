"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface TestProgress {
  generated: number;
  total: number;
  files: number;
  coverage: number;
  currentStage: string;
  stageProgress: number;
  eta: number; // seconds
}

interface TestCategory {
  id: string;
  name: string;
  current: number;
  total: number;
  progress: number;
  description: string;
  coverage: "High" | "Medium" | "Low";
  active: boolean;
}

interface TestItem {
  id: string;
  name: string;
  description: string;
  status: "done" | "active" | "waiting";
}

interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: "success" | "info" | "warning";
}

interface PipelineStep {
  id: number;
  title: string;
  description: string;
  status: "completed" | "active" | "pending";
}

const TestGenerationScreen = () => {
  const [testProgress, setTestProgress] = useState<TestProgress>({
    generated: 147,
    total: 245,
    files: 23,
    coverage: 89.2,
    currentStage: "Generating Business Logic Test Suites",
    stageProgress: 72,
    eta: 263,
  });

  const [testCategories, setTestCategories] = useState<TestCategory[]>([
    {
      id: "business-logic",
      name: "Business Logic Tests",
      current: 18,
      total: 25,
      progress: 72,
      description:
        "Credit hierarchy, working couple rules, eligibility validation",
      coverage: "High",
      active: true,
    },
    {
      id: "calculations",
      name: "Calculation Tests",
      current: 12,
      total: 18,
      progress: 67,
      description: "GTL formulas, premium rates, vacation cost calculations",
      coverage: "High",
      active: false,
    },
    {
      id: "validations",
      name: "Validation Tests",
      current: 8,
      total: 15,
      progress: 53,
      description: "Age limits, underwriting triggers, dependent validations",
      coverage: "High",
      active: false,
    },
    {
      id: "integration",
      name: "Integration Tests",
      current: 6,
      total: 12,
      progress: 50,
      description: "Payroll integration, insurer data export, API endpoints",
      coverage: "Medium",
      active: false,
    },
    {
      id: "edge-cases",
      name: "Edge Case Tests",
      current: 3,
      total: 8,
      progress: 38,
      description: "Boundary values, error conditions, exceptional scenarios",
      coverage: "Medium",
      active: false,
    },
    {
      id: "performance",
      name: "Performance Tests",
      current: 0,
      total: 6,
      progress: 0,
      description: "Load testing, batch processing, concurrent user scenarios",
      coverage: "Low",
      active: false,
    },
  ]);

  const [testItems, setTestItems] = useState<TestItem[]>([
    {
      id: "credit-allocation",
      name: "test_credit_allocation_hierarchy.py",
      description:
        "Tests credit allocation order: MED → DEN → GTL_VOL → AD_VOL → VAC_BUY",
      status: "done",
    },
    {
      id: "working-couple",
      name: "test_working_couple_validation.py",
      description:
        "Validates spouse/child coverage restrictions for working couples",
      status: "done",
    },
    {
      id: "gtl-coverage",
      name: "test_gtl_coverage_calculation.py",
      description:
        "Tests 39x vs 36x salary multipliers and 4M MYR cap enforcement",
      status: "done",
    },
    {
      id: "age-eligibility",
      name: "test_age_eligibility_validation.py",
      description: "Testing age calculations as of Sept 1st policy year start",
      status: "active",
    },
    {
      id: "underwriting",
      name: "test_underwriting_triggers.py",
      description:
        "Tests age ≥64 and coverage >4M triggers for evidence of insurability",
      status: "waiting",
    },
    {
      id: "vacation-purchase",
      name: "test_vacation_purchase_limits.py",
      description: "Validates 5-day max and AE window restrictions (Sept 1-15)",
      status: "waiting",
    },
    {
      id: "dental-cutoff",
      name: "test_dental_cutoff_logic.py",
      description: "Tests July 1, 2018 hire date cutoff for dental eligibility",
      status: "waiting",
    },
    {
      id: "credit-overspend",
      name: "test_credit_overspend_payroll.py",
      description:
        "Tests payroll deduction when benefits exceed available credits",
      status: "waiting",
    },
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 7,
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      message:
        "Generated test_credit_allocation_hierarchy.py - 15 test cases covering all hierarchy scenarios",
      type: "success",
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 3000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      message:
        "Generated test_working_couple_validation.py - Including exempt ID edge cases",
      type: "success",
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 6000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      message:
        "Processing age eligibility validation - Creating boundary tests for 18, 64, 75, 90 years",
      type: "info",
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 9000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      message:
        "Generated test_gtl_coverage_calculation.py - Regular vs fixed-term employee scenarios",
      type: "success",
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 12000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      message:
        "Creating test fixtures for Malaysia employee demographics and salary ranges",
      type: "info",
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 15000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      message:
        "Note: Complex cross-line maximum coverage logic requires additional integration tests",
      type: "warning",
    },
    {
      id: 1,
      timestamp: new Date(Date.now() - 18000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      message:
        "Generated test_monthly_credit_pool.py - Testing 46 MYR fixed + dependent calculations",
      type: "success",
    },
  ]);

  const pipelineSteps: PipelineStep[] = [
    {
      id: 1,
      title: "Code Analysis",
      description: "Analyzed 23 generated files and business logic patterns",
      status: "completed",
    },
    {
      id: 2,
      title: "BRD Requirements Mapping",
      description: "Mapped 82-page BRD requirements to testable scenarios",
      status: "completed",
    },
    {
      id: 3,
      title: "Test Case Generation",
      description: "Creating comprehensive test suites for all business rules",
      status: "active",
    },
    {
      id: 4,
      title: "Edge Case Discovery",
      description: "Generating boundary and edge case test scenarios",
      status: "pending",
    },
    {
      id: 5,
      title: "Test Data Generation",
      description: "Creating realistic test data sets for Malaysia scenarios",
      status: "pending",
    },
    {
      id: 6,
      title: "Test Suite Compilation",
      description:
        "Organizing tests into executable suites with coverage reports",
      status: "pending",
    },
  ];

  const logMessages = [
    "Generated test_medical_insurance_rates.py - All plan types and dependent scenarios",
    "Generated test_salary_freeze_logic.py - September 1st freeze date validation",
    "Generated test_loa_status_suppression.py - Credit suppression for unpaid leave",
    "Generated test_cross_line_maximum.py - Combined GTL coverage limit enforcement",
    "Generated test_rounding_rules.py - MYR currency precision validation",
    "Generated test_export_payroll_csv.py - Monthly file generation and format",
    "Generated test_medical_disability_flow.py - UW queue and approval workflow",
  ];

  const addLogEntry = () => {
    const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
    const message = logMessages[Math.floor(Math.random() * logMessages.length)];
    const newLog: LogEntry = {
      id: Date.now(),
      timestamp,
      message,
      type: "success",
    };

    setLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 7)]);
  };

  const updateTestStatus = () => {
    const completedCount = Math.floor(testProgress.generated / 30);

    setTestItems((prevItems) =>
      prevItems.map((item, index) => ({
        ...item,
        status:
          index < completedCount
            ? "done"
            : index === completedCount
            ? "active"
            : "waiting",
      }))
    );
  };

  const updateCategories = () => {
    setTestCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (Math.random() > 0.8 && category.current < category.total) {
          const newCurrent = category.current + 1;
          const newProgress = (newCurrent / category.total) * 100;

          return {
            ...category,
            current: newCurrent,
            progress: newProgress,
            active: newCurrent < category.total,
          };
        }
        return category;
      })
    );
  };

  const [completed, setCompleted] = useState(false);

  const router = useRouter();

  const updateProgress = () => {
    setTestProgress((prevProgress) => {
      const newProgress = { ...prevProgress };

      if (newProgress.generated < newProgress.total) {
        if (Math.random() > 0.6) {
          newProgress.generated += Math.floor(Math.random() * 3) + 1;
          newProgress.coverage = Math.min(
            95,
            newProgress.coverage + Math.random() * 0.5
          );

          addLogEntry();
          updateCategories();
        }

        newProgress.stageProgress = Math.min(
          95,
          newProgress.stageProgress + Math.random() * 1.5
        );
        newProgress.eta = Math.max(
          0,
          newProgress.eta - Math.floor(Math.random() * 8) - 4
        );
      } else {
        newProgress.coverage = 100;
        newProgress.stageProgress = 100;
        newProgress.eta = 0;

        setCompleted(true);
      }

      return newProgress;
    });
  };

  useEffect(() => {
    if (completed) {
      setTimeout(() => {
        router.push("/malay-comp/test-cases");
      }, 500);
    }
  }, [completed]);

  useEffect(() => {
    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateTestStatus();
  }, [testProgress.generated]);

  const formatETA = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs.toString().padStart(2, "0")}s`;
  };

  const getStepIndicatorClasses = (status: string, stepNumber: number) => {
    const baseClasses =
      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm relative z-10";
    switch (status) {
      case "completed":
        return `${baseClasses} bg-green-500 border-2 border-green-500 text-white`;
      case "active":
        return `${baseClasses} bg-orange-600 border-2 border-orange-600 text-white`;
      case "pending":
        return `${baseClasses} bg-slate-100 border-2 border-slate-200 text-slate-500`;
      default:
        return baseClasses;
    }
  };

  const getStepConnectorClasses = (status: string, isLast: boolean) => {
    if (isLast) return "";
    const baseClasses = "absolute left-4 top-8 bottom-0 w-0.5";
    switch (status) {
      case "completed":
        return `${baseClasses} bg-green-500`;
      case "active":
        return `${baseClasses} bg-orange-600`;
      default:
        return `${baseClasses} bg-slate-200`;
    }
  };

  const getTestStatusClasses = (status: string) => {
    const baseClasses = "w-5 h-5 rounded-full flex-shrink-0";
    switch (status) {
      case "done":
        return `${baseClasses} bg-green-500 flex items-center justify-center text-white text-xs font-bold`;
      case "active":
        return `${baseClasses} bg-orange-600 animate-pulse`;
      case "waiting":
        return `${baseClasses} bg-gray-300`;
      default:
        return baseClasses;
    }
  };

  const getLogTypeClasses = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "info":
        return "text-blue-400";
      case "warning":
        return "text-yellow-400";
      default:
        return "text-slate-300";
    }
  };

  const getCoverageBadgeClasses = (coverage: string) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-semibold";
    switch (coverage) {
      case "High":
        return `${baseClasses} bg-green-500 text-white`;
      case "Medium":
        return `${baseClasses} bg-yellow-500 text-white`;
      case "Low":
        return `${baseClasses} bg-red-500 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  return (
    <div className="h-screen overflow-auto bg-slate-50 text-slate-700 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <button className="text-lg text-slate-500 hover:text-slate-700 transition-colors">
            ←
          </button>
          <div className="text-sm text-slate-500">
            / Business Requirements / Malaysia Requirements Document / PR
            #645-lite / Test Generation
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700 text-sm font-medium">
            <div className="w-4 h-4 border-2 border-yellow-200 border-t-orange-600 rounded-full animate-spin"></div>
            Generating Tests
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)] gap-4 p-4">
        {/* Progress Sidebar */}
        <div className="w-96 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-50 border-b border-slate-200 p-6">
            <div className="font-semibold text-lg text-slate-800 mb-2">
              Test Generation Pipeline
            </div>
            <div className="text-slate-500 text-sm">
              Analyzing 23 code files + BRD requirements
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-8">
              {pipelineSteps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-4 relative">
                  {/* Connector Line */}
                  {index < pipelineSteps.length - 1 && (
                    <div
                      className={getStepConnectorClasses(
                        step.status,
                        index === pipelineSteps.length - 1
                      )}
                    ></div>
                  )}

                  {/* Step Indicator */}
                  <div
                    className={getStepIndicatorClasses(step.status, step.id)}
                  >
                    {step.status === "completed" ? "✓" : step.id}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 mt-1">
                    <div className="font-semibold text-slate-800 mb-1">
                      {step.title}
                    </div>
                    <div className="text-slate-500 text-sm leading-relaxed mb-2">
                      {step.description}
                    </div>
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded inline-block ${
                        step.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : step.status === "active"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {step.status === "completed"
                        ? "Completed"
                        : step.status === "active"
                        ? "Processing"
                        : "Pending"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Processing Area */}
        <div className="flex-1 bg-white rounded-lg shadow-sm flex flex-col">
          {/* Processing Header */}
          <div className="bg-slate-50 border-b border-slate-200 p-6 flex justify-between items-center">
            <div className="font-semibold text-lg text-slate-800">
              Test Generation Progress
            </div>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <span>Generated:</span>
                <span className="font-semibold text-slate-800">
                  {testProgress.generated}/{testProgress.total}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>Test Files:</span>
                <span className="font-semibold text-slate-800">
                  {testProgress.files}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>Coverage:</span>
                <span className="font-semibold text-slate-800">
                  {testProgress.coverage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Processing Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Current Stage */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🧪</div>
                <div className="font-semibold text-orange-900 text-lg">
                  {testProgress.currentStage}
                </div>
              </div>
              <div className="bg-orange-200 rounded-lg h-1.5 overflow-hidden mb-4">
                <div
                  className="bg-orange-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${testProgress.stageProgress}%` }}
                ></div>
              </div>
              <div className="text-orange-800 text-sm leading-relaxed">
                Currently generating comprehensive test cases for credit
                allocation hierarchy, working couple validations, and
                underwriting trigger scenarios. Creating both positive and
                negative test paths with Malaysia-specific edge cases.
              </div>
            </div>

            {/* Test Categories */}
            <div className="mb-8">
              <div className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                <span>📋</span>
                <span>Test Category Progress</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {testCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-4 border rounded-lg transition-all duration-200 ${
                      category.active
                        ? "bg-orange-50 border-orange-200"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-semibold text-sm text-slate-800">
                        {category.name}
                      </div>
                      <div
                        className={`px-2 py-1 rounded-xl text-xs font-semibold ${
                          category.active
                            ? "bg-orange-200 text-orange-700"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {category.current}/{category.total}
                      </div>
                    </div>
                    <div className="w-full h-1 bg-slate-200 rounded overflow-hidden mb-2">
                      <div
                        className="h-full bg-orange-600 transition-all duration-300 ease-out"
                        style={{ width: `${category.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-slate-500 text-xs leading-tight mb-2">
                      {category.description}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-xs">
                        BRD Coverage:
                      </span>
                      <span
                        className={getCoverageBadgeClasses(category.coverage)}
                      >
                        {category.coverage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Test Generation */}
            <div className="mb-6">
              <div className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                <span>⚡</span>
                <span>Active Test Generation</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-h-80 overflow-y-auto">
                {testItems.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-b-0"
                  >
                    <div className={getTestStatusClasses(test.status)}>
                      {test.status === "done" && "✓"}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-800 mb-1 text-sm">
                        {test.name}
                      </div>
                      <div className="text-slate-500 text-xs leading-tight">
                        {test.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generation Logs */}
            <div className="mb-6">
              <div className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                <span>📝</span>
                <span>Generation Logs</span>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 text-slate-200 font-mono text-xs max-h-48 overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="mb-2 py-1">
                    <span className="text-slate-500 mr-2">
                      [{log.timestamp}]
                    </span>
                    <span className={getLogTypeClasses(log.type)}>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ETA Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="font-semibold text-blue-800 mb-2">
                Estimated Time Remaining
              </div>
              <div className="text-2xl font-bold text-blue-700">
                {formatETA(testProgress.eta)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestGenerationScreen;

"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ProgressData {
  completed: number;
  total: number;
  files: number;
  linesOfCode: number;
  currentStage: string;
  stageProgress: number;
  eta: number; // seconds
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

interface Requirement {
  id: number;
  title: string;
  type: string;
  priority: "High" | "Medium" | "Low";
  status: "done" | "active" | "waiting";
}

const CodeGenerationScreen = () => {
  const [progressData, setProgressData] = useState<ProgressData>({
    completed: 10,
    total: 19,
    files: 8,
    linesOfCode: 2347,
    currentStage: "Generating Business Logic Components",
    stageProgress: 63,
    eta: 222,
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 6,
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      message:
        "Generated CreditAllocationService.ts - Credit hierarchy implementation",
      type: "success",
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 4000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      message:
        "Generated LifeInsuranceCalculator.ts - Coverage formula and premium calculation",
      type: "success",
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 7000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      message: "Processing age validation rules with date calculations",
      type: "info",
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 11000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      message:
        "Generated AgeValidator.ts - Multi-relationship age eligibility checks",
      type: "success",
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 14000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      message: "Creating cross-line coverage validation logic...",
      type: "info",
    },
    {
      id: 1,
      timestamp: new Date(Date.now() - 18000).toLocaleTimeString("en-US", {
        hour12: false,
      }),
      message: "Generated constants.ts - System-wide configuration values",
      type: "success",
    },
  ]);

  const pipelineSteps: PipelineStep[] = [
    {
      id: 1,
      title: "Requirements Analysis",
      description: "Analyzed and categorized 19 requirements from BRD",
      status: "completed",
    },
    {
      id: 2,
      title: "Architecture Planning",
      description: "Generated system architecture and component structure",
      status: "completed",
    },
    {
      id: 3,
      title: "Code Generation",
      description:
        "Creating business logic, validation rules, and calculation functions",
      status: "active",
    },
    {
      id: 4,
      title: "Test Generation",
      description: "Creating unit tests and integration test suites",
      status: "pending",
    },
    {
      id: 5,
      title: "Documentation",
      description: "Generating API docs, implementation guides, and README",
      status: "pending",
    },
    {
      id: 6,
      title: "PR Creation",
      description: "Creating pull request with all generated artifacts",
      status: "pending",
    },
  ];

  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: 1,
      title: "Credit Allocation Hierarchy System",
      type: "Business Logic",
      priority: "High",
      status: "done",
    },
    {
      id: 2,
      title: "Group Term Life Insurance Coverage Formula",
      type: "Calculations",
      priority: "High",
      status: "done",
    },
    {
      id: 3,
      title: "Age Eligibility Validation Rules",
      type: "Validations",
      priority: "High",
      status: "done",
    },
    {
      id: 4,
      title: "Cross Line Maximum Coverage Logic",
      type: "Business Logic",
      priority: "High",
      status: "active",
    },
    {
      id: 5,
      title: "Medical Insurance Premium Rates",
      type: "Calculations",
      priority: "High",
      status: "waiting",
    },
    {
      id: 6,
      title: "Working Couple Restrictions",
      type: "Business Logic",
      priority: "Medium",
      status: "waiting",
    },
  ]);

  const logMessages = [
    "Generated MedicalInsuranceService.ts - Premium calculation logic",
    "Generated WorkingCoupleValidator.ts - Spouse restriction rules",
    "Generated PayrollIntegration.ts - Monthly deduction processing",
    "Generated UnderwritingService.ts - Evidence of insurability triggers",
    "Generated BenefitElectionValidator.ts - Cross-benefit validation",
    "Generated CurrencyFormatter.ts - MYR formatting utilities",
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

  const updateRequirementStatus = () => {
    setRequirements((prevRequirements) =>
      prevRequirements.map((req, index) => ({
        ...req,
        status:
          index < progressData.completed
            ? "done"
            : index === progressData.completed
            ? "active"
            : "waiting",
      }))
    );
  };

  const router = useRouter();

  const updateProgress = () => {
    setProgressData((prevData) => {
      const newData = { ...prevData };

      if (newData.completed < newData.total) {
        if (Math.random() > 0.7) {
          newData.completed++;
          newData.files += Math.floor(Math.random() * 2);
          newData.linesOfCode += Math.floor(Math.random() * 150) + 50;

          addLogEntry();
        }

        newData.stageProgress = Math.min(
          99,
          newData.stageProgress + Math.random() * 2
        );
        newData.eta = Math.max(
          0,
          newData.eta - Math.floor(Math.random() * 10) - 3
        );
      } else {
        newData.stageProgress = 100;
        newData.eta = Math.max(
          0,
          newData.eta - Math.floor(Math.random() * 10) - 3
        );

        setTimeout(() => {
          router.push("/malay-comp/code-diff");
        }, 500);
      }

      return newData;
    });
  };

  useEffect(() => {
    const interval = setInterval(updateProgress, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateRequirementStatus();
  }, [progressData.completed]);

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
        return `${baseClasses} bg-blue-500 border-2 border-blue-500 text-white`;
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
        return `${baseClasses} bg-blue-500`;
      default:
        return `${baseClasses} bg-slate-200`;
    }
  };

  const getRequirementStatusClasses = (status: string) => {
    const baseClasses = "w-5 h-5 rounded-full flex-shrink-0";
    switch (status) {
      case "done":
        return `${baseClasses} bg-green-500 flex items-center justify-center text-white text-xs font-bold`;
      case "active":
        return `${baseClasses} bg-blue-500 animate-pulse`;
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

  return (
    <div className="h-screen overflow-auto bg-slate-50 text-slate-700 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <button className="text-lg text-slate-500 hover:text-slate-700 transition-colors">
            ←
          </button>
          <div className="text-sm text-slate-500">
            / Business Requirements / Malaysia Requirements Document / Code
            Generation
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm font-medium">
            <div className="w-4 h-4 border-2 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
            Generating Code
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)] gap-4 p-4">
        {/* Progress Sidebar */}
        <div className="w-96 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="bg-slate-50 border-b border-slate-200 p-6">
            <div className="font-semibold text-lg text-slate-800 mb-2">
              Generation Pipeline
            </div>
            <div className="text-slate-500 text-sm">
              Processing {progressData.total} extracted requirements
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
              Code Generation Progress
            </div>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <span>Completed:</span>
                <span className="font-semibold text-slate-800">
                  {progressData.completed}/{progressData.total}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>Files Generated:</span>
                <span className="font-semibold text-slate-800">
                  {progressData.files}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>Lines of Code:</span>
                <span className="font-semibold text-slate-800">
                  {progressData.linesOfCode.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Processing Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Current Stage */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">⚙️</div>
                <div className="font-semibold text-blue-900 text-lg">
                  {progressData.currentStage}
                </div>
              </div>
              <div className="bg-blue-100 rounded-lg h-1.5 overflow-hidden mb-4">
                <div
                  className="bg-blue-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${progressData.stageProgress}%` }}
                ></div>
              </div>
              <div className="text-blue-800 text-sm leading-relaxed">
                Currently processing credit allocation hierarchy system and
                cross-line maximum coverage logic. Implementing complex
                validation rules and calculation engines based on extracted
                requirements.
              </div>
            </div>

            {/* Requirements Processing */}
            <div className="mb-8">
              <div className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
                <span>📋</span>
                <span>Requirements Processing Status</span>
              </div>

              <div className="space-y-3">
                {requirements.map((requirement) => (
                  <div
                    key={requirement.id}
                    className="bg-slate-50 border border-slate-200 rounded-md p-4 flex items-center gap-4"
                  >
                    <div
                      className={getRequirementStatusClasses(
                        requirement.status
                      )}
                    >
                      {requirement.status === "done" && "✓"}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-800 mb-1">
                        {requirement.title}
                      </div>
                      <div className="text-slate-500 text-xs">
                        {requirement.type} • {requirement.priority} Priority
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
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <div className="font-semibold text-yellow-800 mb-2">
                Estimated Time Remaining
              </div>
              <div className="text-2xl font-bold text-yellow-700">
                {formatETA(progressData.eta)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeGenerationScreen;

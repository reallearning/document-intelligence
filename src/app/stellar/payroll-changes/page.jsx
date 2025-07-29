"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  FileText,
  Download,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Target,
  BarChart3,
  Eye,
  Settings,
  ChevronRight,
  Info,
  Shield,
  Zap,
} from "lucide-react";

const PayrollChangesDetailView = () => {
  const [activeSection, setActiveSection] = useState("overview");

  // Detailed data for the 2024-01-24 Payroll Changes report
  const reportData = {
    fileInfo: {
      fileName: "STELLAR_PayrollChanges_012424_143000.csv",
      date: "2024-01-24",
      processingStartTime: "14:30:00",
      processingEndTime: "14:32:45",
      processingTime: "2m 45s",
      fileSize: "12 KB",
      recordCount: 31,
      status: "FAIL",
    },
    scores: {
      specCompliance: 45,
      dataAccuracy: 23,
      overallScore: 34,
      previousScore: 95,
      trend: -61,
    },
    issues: [
      {
        id: 1,
        type: "CRITICAL_ERROR",
        severity: "HIGH",
        priority: "CRITICAL",
        title: "Invalid Benefit Codes",
        description:
          "Multiple benefit codes not found in approved specification list",
        affectedRecords: 12,
        affectedEmployees: [
          {
            id: "EMP445566",
            name: "Amanda Parker",
            benefitCode: "MED-PLUS",
            changeType: "A",
            validCode: "MED (70)",
          },
          {
            id: "EMP778899",
            name: "James Rodriguez",
            benefitCode: "DENT-PRO",
            changeType: "C",
            validCode: "DENT (80)",
          },
          {
            id: "EMP112233",
            name: "Sophie Williams",
            benefitCode: "PEN-AUTO",
            changeType: "A",
            validCode: "GBR-PENHLAES",
          },
          {
            id: "EMP334455",
            name: "Marcus Thompson",
            benefitCode: "LIFE-EXT",
            changeType: "D",
            validCode: "LIFE (20)",
          },
          {
            id: "EMP667788",
            name: "Rachel Green",
            benefitCode: "TRAVEL-INT",
            changeType: "A",
            validCode: "TRAVEL (6000)",
          },
        ],
        fieldName: "Benefit Code",
        detectedAt: "2024-01-24 14:32:15",
        impact:
          "Critical - prevents file processing and payroll deduction updates",
      },
      {
        id: 2,
        type: "DATA_CORRUPTION",
        severity: "HIGH",
        priority: "CRITICAL",
        title: "Invalid Change Identifiers",
        description:
          "Invalid change identifiers found - contains values other than A, D, C",
        affectedRecords: 8,
        affectedEmployees: [
          {
            id: "EMP990011",
            name: "David Chen",
            changeIdentifier: "X",
            expectedValues: "A, D, C",
            benefit: "Medical Insurance",
          },
          {
            id: "EMP223344",
            name: "Lisa Martinez",
            changeIdentifier: "Z",
            expectedValues: "A, D, C",
            benefit: "Dental Insurance",
          },
          {
            id: "EMP556677",
            name: "Kevin Brown",
            changeIdentifier: "1",
            expectedValues: "A, D, C",
            benefit: "Life Assurance",
          },
          {
            id: "EMP889900",
            name: "Emma Wilson",
            changeIdentifier: "Y",
            expectedValues: "A, D, C",
            benefit: "Pension Plan",
          },
        ],
        fieldName: "Change identifier",
        detectedAt: "2024-01-24 14:33:45",
        impact:
          "High - change type cannot be processed, affects payroll calculation logic",
      },
      {
        id: 3,
        type: "BUSINESS_RULE",
        severity: "MEDIUM",
        priority: "HIGH",
        title: "Terminated Employees Included",
        description: "Company leavers incorrectly included in changes file",
        affectedRecords: 3,
        affectedEmployees: [
          {
            id: "EMP123999",
            name: "Robert Davis",
            terminationDate: "2024-01-15",
            changeType: "A",
            benefit: "Medical Insurance",
          },
          {
            id: "EMP456888",
            name: "Jennifer Lee",
            terminationDate: "2024-01-10",
            changeType: "C",
            benefit: "Dental Insurance",
          },
          {
            id: "EMP789777",
            name: "Michael Johnson",
            terminationDate: "2024-01-08",
            changeType: "D",
            benefit: "Life Assurance",
          },
        ],
        fieldName: "Employee Status",
        detectedAt: "2024-01-24 14:34:22",
        impact:
          "Medium - terminated employees should not have benefit changes processed",
      },
    ],
    reconciliation: {
      sourceChanges: 31,
      reportedChanges: 31,
      correctlyClassified: 8,
      misclassified: 23,
      classificationRate: 25.8,
      fieldAccuracy: [
        { field: "Employee Id", accuracy: 100, issues: 0, records: 31 },
        { field: "First Name", accuracy: 100, issues: 0, records: 31 },
        { field: "Last Name", accuracy: 100, issues: 0, records: 31 },
        { field: "Change identifier", accuracy: 74.2, issues: 8, records: 31 },
        { field: "Benefit Code", accuracy: 61.3, issues: 12, records: 31 },
        {
          field: "Monthly Employee Deduction Amount",
          accuracy: 90.3,
          issues: 3,
          records: 31,
        },
        {
          field: "Monthly Employer Deduction Amount",
          accuracy: 87.1,
          issues: 4,
          records: 31,
        },
        { field: "Start Date", accuracy: 96.8, issues: 1, records: 31 },
        { field: "End Date", accuracy: 93.5, issues: 2, records: 31 },
      ],
    },
    changeBreakdown: [
      {
        changeType: "Addition (A)",
        count: 5,
        accuracy: 60,
        issues: 8,
        description: "New benefit elections",
      },
      {
        changeType: "Deletion (D)",
        count: 3,
        accuracy: 33.3,
        issues: 6,
        description: "Benefit terminations",
      },
      {
        changeType: "Modification (C)",
        count: 0,
        accuracy: 0,
        issues: 9,
        description: "Benefit changes",
      },
      {
        changeType: "Invalid",
        count: 23,
        accuracy: 0,
        issues: 23,
        description: "Unrecognized change types",
      },
    ],
    triggerBreakdown: [
      { trigger: "System Error", count: 23, percentage: 74.2, status: "error" },
      { trigger: "Life Events", count: 4, percentage: 12.9, status: "warning" },
      {
        trigger: "Plan Elections",
        count: 2,
        percentage: 6.5,
        status: "success",
      },
      {
        trigger: "Employment Changes",
        count: 2,
        percentage: 6.5,
        status: "warning",
      },
    ],
  };

  const StatusBadge = ({ status, size = "sm" }) => {
    const config = {
      FAIL: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
      WARNING: {
        color: "bg-amber-100 text-amber-700 border-amber-200",
        icon: AlertTriangle,
      },
      PASS: {
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
      },
      success: {
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
      },
      warning: {
        color: "bg-amber-100 text-amber-700 border-amber-200",
        icon: AlertTriangle,
      },
      error: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
    };
    const { color, icon: Icon } = config[status];
    const sizeClass = size === "lg" ? "px-4 py-2 text-sm" : "px-2 py-1 text-xs";

    return (
      <span
        className={`inline-flex items-center ${sizeClass} rounded-full font-semibold border ${color}`}
      >
        <Icon className={`${size === "lg" ? "w-4 h-4" : "w-3 h-3"} mr-1`} />
        {status.toUpperCase()}
      </span>
    );
  };

  const ScoreCard = ({
    title,
    score,
    previousScore,
    description,
    color = "blue",
    icon: Icon,
  }) => {
    const trend = score - (previousScore || score);
    const colorConfig = {
      blue: {
        bg: "from-blue-500 to-blue-600",
        text: "text-blue-600",
        bgLight: "bg-blue-50",
        border: "border-blue-200",
      },
      green: {
        bg: "from-green-500 to-green-600",
        text: "text-green-600",
        bgLight: "bg-green-50",
        border: "border-green-200",
      },
      red: {
        bg: "from-red-500 to-red-600",
        text: "text-red-600",
        bgLight: "bg-red-50",
        border: "border-red-200",
      },
    };

    return (
      <div
        className={`${colorConfig[color].bgLight} rounded-xl shadow-sm border ${colorConfig[color].border} p-6 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-8 -translate-y-8">
          <div
            className={`w-full h-full bg-gradient-to-r ${colorConfig[color].bg} rounded-full opacity-10`}
          ></div>
        </div>
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg bg-gradient-to-r ${colorConfig[color].bg}`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            {trend !== 0 && (
              <div
                className={`flex items-center text-sm px-2 py-1 rounded-full ${
                  trend > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {trend > 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(trend)}%
              </div>
            )}
          </div>
          <div className={`text-4xl font-bold ${colorConfig[color].text} mb-2`}>
            {score}%
          </div>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          {previousScore && (
            <div className="text-xs text-gray-500">
              Previous: {previousScore}%
            </div>
          )}
        </div>
      </div>
    );
  };

  const SeverityBadge = ({ severity }) => {
    const config = {
      HIGH: "bg-red-100 text-red-700 border-red-200",
      MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
      LOW: "bg-blue-100 text-blue-700 border-blue-200",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded border ${config[severity]}`}
      >
        {severity}
      </span>
    );
  };

  const ProgressBar = ({ value, color = "blue" }) => {
    const colorConfig = {
      blue: "bg-blue-600",
      green: "bg-green-600",
      amber: "bg-amber-600",
      red: "bg-red-600",
    };

    const getColor = (value) => {
      if (value >= 95) return "green";
      if (value >= 80) return "amber";
      return "red";
    };

    const barColor = colorConfig[getColor(value)];

    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${barColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Report Validation Details
                </h1>
                <p className="text-lg text-gray-600 mt-1">
                  Payroll Changes - January 24, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <StatusBadge status={reportData.fileInfo.status} size="lg" />
              <button className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all transform hover:scale-105">
                <XCircle className="w-4 h-4 mr-2" />
                File Rejected
              </button>
              <button className="flex items-center px-4 py-2 text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-all">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reprocess
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Alert Banner */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Critical Processing Failure
              </h3>
              <p className="text-red-800 mb-4">
                This payroll changes file contains multiple critical errors that
                prevent processing. The file has been rejected and requires
                immediate attention before payroll deductions can be updated.
              </p>
              <div className="flex items-center space-x-4 text-sm text-red-700">
                <span>
                  <strong>23 of 31 records</strong> contain validation errors
                </span>
                <span>•</span>
                <span>
                  <strong>74.2% failure rate</strong>
                </span>
                <span>•</span>
                <span>
                  <strong>3 critical error types</strong> detected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* File Information Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 mr-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              File Information
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Filename
              </div>
              <div className="text-lg font-mono text-gray-900 bg-gray-50 rounded-lg px-3 py-2 break-words">
                {reportData.fileInfo.fileName}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Processing Time
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {reportData.fileInfo.processingTime}
              </div>
              <div className="text-xs text-gray-600">
                {reportData.fileInfo.processingStartTime} -{" "}
                {reportData.fileInfo.processingEndTime}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">
                File Size
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {reportData.fileInfo.fileSize}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Record Count
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {reportData.fileInfo.recordCount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Validation Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <ScoreCard
            title="Specification Compliance"
            score={reportData.scores.specCompliance}
            previousScore={96}
            description="Adherence to Aon payroll changes specification"
            color="red"
            icon={Shield}
          />
          <ScoreCard
            title="Data Accuracy"
            score={reportData.scores.dataAccuracy}
            previousScore={94}
            description="Field-level validation and data quality"
            color="red"
            icon={Target}
          />
          <ScoreCard
            title="Overall Score"
            score={reportData.scores.overallScore}
            previousScore={reportData.scores.previousScore}
            description="Composite quality score - CRITICAL FAILURE"
            color="red"
            icon={Zap}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-8">
              {[
                { id: "overview", label: "Overview", icon: Eye },
                {
                  id: "issues",
                  label: `Critical Issues (${reportData.issues.length})`,
                  icon: AlertCircle,
                },
                {
                  id: "reconciliation",
                  label: "Change Classification",
                  icon: Target,
                },
                { id: "changes", label: "Change Breakdown", icon: BarChart3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-all ${
                    activeSection === tab.id
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeSection === "overview" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 border border-red-200">
                    <div className="flex items-center mb-6">
                      <XCircle className="w-6 h-6 text-red-600 mr-3" />
                      <h3 className="text-xl font-semibold text-red-900">
                        Processing Failure
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-red-700 font-medium">
                          Total Changes Submitted:
                        </span>
                        <span className="font-bold text-red-900 text-lg">
                          {reportData.fileInfo.recordCount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-red-700 font-medium">
                          Critical Issues:
                        </span>
                        <span className="font-bold text-red-900 text-lg">
                          {reportData.issues.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-red-700 font-medium">
                          Valid Records:
                        </span>
                        <span className="font-bold text-red-900 text-lg">
                          {reportData.reconciliation.correctlyClassified}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-red-700 font-medium">
                          Failure Rate:
                        </span>
                        <span className="font-bold text-red-900 text-lg">
                          74.2%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
                    <div className="flex items-center mb-6">
                      <AlertCircle className="w-6 h-6 text-amber-600 mr-3" />
                      <h3 className="text-xl font-semibold text-amber-900">
                        Critical Findings
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800">
                          12 records contain invalid benefit codes not in
                          specification
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800">
                          8 records have corrupted change identifiers (non A/D/C
                          values)
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800">
                          3 terminated employees incorrectly included in changes
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800">
                          File rejected - cannot process payroll deductions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Required Actions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-red-200">
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <h4 className="font-semibold text-gray-900">
                          Critical - Fix Before Resubmission
                        </h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          Replace invalid benefit codes with approved
                          specification codes
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          Fix corrupted change identifiers (must be A, D, or C
                          only)
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          Remove all terminated employees from changes file
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-amber-200">
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                        <h4 className="font-semibold text-gray-900">
                          System Improvements
                        </h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                          Implement real-time validation at source system
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                          Add benefit code validation lookup during data entry
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                          Exclude terminated employees from change extraction
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Issues Tab */}
            {activeSection === "issues" && (
              <div className="space-y-8">
                {reportData.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 p-8"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-2xl font-bold text-red-900">
                            {issue.title}
                          </h3>
                          <SeverityBadge severity={issue.severity} />
                        </div>
                        <p className="text-red-800 text-lg mb-4">
                          {issue.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-red-700">
                          <span>
                            Field: <strong>{issue.fieldName}</strong>
                          </span>
                          <span>
                            Affected Records:{" "}
                            <strong>{issue.affectedRecords}</strong>
                          </span>
                          <span>
                            Detected: <strong>{issue.detectedAt}</strong>
                          </span>
                        </div>
                      </div>
                      <XCircle className="w-8 h-8 text-red-600" />
                    </div>

                    <div className="mb-6">
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h4 className="font-semibold text-red-900 mb-3">
                          Impact Analysis
                        </h4>
                        <p className="text-sm text-red-800">{issue.impact}</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="font-semibold text-red-900 mb-4">
                        Affected Employees
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b border-red-200">
                              <th className="text-left py-3 px-4 font-medium text-red-900">
                                Employee ID
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-red-900">
                                Name
                              </th>
                              {issue.type === "CRITICAL_ERROR" ? (
                                <>
                                  <th className="text-left py-3 px-4 font-medium text-red-900">
                                    Invalid Code
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-red-900">
                                    Valid Code
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-red-900">
                                    Change Type
                                  </th>
                                </>
                              ) : issue.type === "DATA_CORRUPTION" ? (
                                <>
                                  <th className="text-left py-3 px-4 font-medium text-red-900">
                                    Invalid Value
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-red-900">
                                    Expected Values
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-red-900">
                                    Benefit
                                  </th>
                                </>
                              ) : (
                                <>
                                  <th className="text-left py-3 px-4 font-medium text-red-900">
                                    Termination Date
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-red-900">
                                    Change Type
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-red-900">
                                    Benefit
                                  </th>
                                </>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {issue.affectedEmployees.map((emp, idx) => (
                              <tr
                                key={idx}
                                className="border-b border-red-100 hover:bg-red-50"
                              >
                                <td className="py-3 px-4 font-mono text-sm">
                                  {emp.id}
                                </td>
                                <td className="py-3 px-4">{emp.name}</td>
                                {issue.type === "CRITICAL_ERROR" ? (
                                  <>
                                    <td className="py-3 px-4 font-mono text-red-700 bg-red-50">
                                      {emp.benefitCode}
                                    </td>
                                    <td className="py-3 px-4 font-mono text-green-700">
                                      {emp.validCode}
                                    </td>
                                    <td className="py-3 px-4 font-mono text-center">
                                      {emp.changeType}
                                    </td>
                                  </>
                                ) : issue.type === "DATA_CORRUPTION" ? (
                                  <>
                                    <td className="py-3 px-4 font-mono text-red-700 bg-red-50">
                                      {emp.changeIdentifier}
                                    </td>
                                    <td className="py-3 px-4 font-mono text-green-700">
                                      {emp.expectedValues}
                                    </td>
                                    <td className="py-3 px-4">{emp.benefit}</td>
                                  </>
                                ) : (
                                  <>
                                    <td className="py-3 px-4 font-mono text-red-700">
                                      {emp.terminationDate}
                                    </td>
                                    <td className="py-3 px-4 font-mono text-center">
                                      {emp.changeType}
                                    </td>
                                    <td className="py-3 px-4">{emp.benefit}</td>
                                  </>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reconciliation Tab */}
            {activeSection === "reconciliation" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-red-50 rounded-xl p-8 border border-red-200">
                    <div className="flex items-center mb-6">
                      <Database className="w-6 h-6 text-red-600 mr-3" />
                      <h3 className="text-xl font-semibold text-red-900">
                        Change Classification
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-red-700 font-medium">
                          Source Changes:
                        </span>
                        <span className="font-bold text-red-900 text-lg">
                          {reportData.reconciliation.sourceChanges}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-red-700 font-medium">
                          Reported Changes:
                        </span>
                        <span className="font-bold text-red-900 text-lg">
                          {reportData.reconciliation.reportedChanges}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-red-700 font-medium">
                          Correctly Classified:
                        </span>
                        <span className="font-bold text-green-700 text-lg">
                          {reportData.reconciliation.correctlyClassified}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-red-700 font-medium">
                          Misclassified:
                        </span>
                        <span className="font-bold text-red-700 text-lg">
                          {reportData.reconciliation.misclassified}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Field Validation Results
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Field Name
                            </th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">
                              Records
                            </th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">
                              Accuracy
                            </th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">
                              Issues
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">
                              Progress
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {reportData.reconciliation.fieldAccuracy.map(
                            (field, idx) => (
                              <tr
                                key={idx}
                                className="border-b border-gray-100 hover:bg-gray-50"
                              >
                                <td className="py-4 px-4 font-medium text-gray-900">
                                  {field.field}
                                </td>
                                <td className="py-4 px-4 text-center text-gray-700">
                                  {field.records}
                                </td>
                                <td className="py-4 px-4 text-center">
                                  <span
                                    className={`font-semibold ${
                                      field.accuracy >= 95
                                        ? "text-green-700"
                                        : field.accuracy >= 80
                                        ? "text-amber-700"
                                        : "text-red-700"
                                    }`}
                                  >
                                    {field.accuracy}%
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                  <span
                                    className={`font-semibold ${
                                      field.issues === 0
                                        ? "text-green-700"
                                        : "text-red-700"
                                    }`}
                                  >
                                    {field.issues}
                                  </span>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="flex items-center space-x-3">
                                    <ProgressBar value={field.accuracy} />
                                    <span className="text-sm font-medium text-gray-700 w-12">
                                      {field.accuracy}%
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Changes Tab */}
            {activeSection === "changes" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Change Type Analysis
                    </h3>
                    <div className="space-y-4">
                      {reportData.changeBreakdown.map((change, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border ${
                            change.accuracy === 0
                              ? "bg-red-50 border-red-200"
                              : change.accuracy < 80
                              ? "bg-amber-50 border-amber-200"
                              : "bg-green-50 border-green-200"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {change.changeType}
                            </h4>
                            <span
                              className={`font-bold ${
                                change.accuracy === 0
                                  ? "text-red-700"
                                  : change.accuracy < 80
                                  ? "text-amber-700"
                                  : "text-green-700"
                              }`}
                            >
                              {change.count} records
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {change.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Accuracy: {change.accuracy}%
                            </span>
                            <span className="text-sm font-medium">
                              Issues: {change.issues}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Trigger Source Analysis
                    </h3>
                    <div className="space-y-4">
                      {reportData.triggerBreakdown.map((trigger, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <StatusBadge status={trigger.status} />
                            <span className="font-medium text-gray-900">
                              {trigger.trigger}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              {trigger.count}
                            </div>
                            <div className="text-sm text-gray-600">
                              {trigger.percentage}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollChangesDetailView;

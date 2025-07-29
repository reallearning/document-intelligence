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

const ReportDetailView = () => {
  const [activeSection, setActiveSection] = useState("overview");

  // Detailed data for the 2024-01-23 report
  const reportData = {
    fileInfo: {
      fileName: "STELLAR_PayrollFull_012324_083000.csv",
      date: "2024-01-23",
      processingStartTime: "08:33:00",
      processingEndTime: "08:38:12",
      processingTime: "5m 12s",
      fileSize: "2.3 MB",
      recordCount: 18438,
      status: "WARNING",
    },
    scores: {
      specCompliance: 95,
      dataAccuracy: 91,
      overallScore: 93,
      previousScore: 97,
      trend: -4,
    },
    issues: [
      {
        id: 1,
        type: "DATA_MISMATCH",
        severity: "MEDIUM",
        priority: "HIGH",
        title: "Premium Calculation Variance",
        description:
          "Premium calculations differ from source by >2% for Medical Insurance",
        affectedRecords: 23,
        affectedEmployees: [
          {
            id: "EMP789123",
            name: "Sarah Johnson",
            variance: "£12.45",
            percentage: "3.2%",
          },
          {
            id: "EMP456789",
            name: "Michael Chen",
            variance: "£8.90",
            percentage: "2.8%",
          },
          {
            id: "EMP234567",
            name: "Emma Thompson",
            variance: "£15.67",
            percentage: "4.1%",
          },
          {
            id: "EMP890123",
            name: "David Wilson",
            variance: "£9.23",
            percentage: "2.9%",
          },
          {
            id: "EMP567234",
            name: "Lisa Anderson",
            variance: "£11.78",
            percentage: "3.5%",
          },
        ],
        fieldName: "Monthly Employee Deduction Amount",
        detectedAt: "2024-01-23 08:35:22",
        impact:
          "Medium - affects premium accuracy for medical insurance calculations",
      },
      {
        id: 2,
        type: "BUSINESS_RULE",
        severity: "LOW",
        priority: "MEDIUM",
        title: "Future Effective Dates",
        description:
          "Future effective dates found (scheme year should be current)",
        affectedRecords: 3,
        affectedEmployees: [
          {
            id: "EMP654321",
            name: "Robert Brown",
            date: "2025-03-15",
            expected: "2024-01-01",
          },
          {
            id: "EMP987654",
            name: "Jennifer Davis",
            date: "2025-02-28",
            expected: "2024-01-01",
          },
          {
            id: "EMP321987",
            name: "Mark Taylor",
            date: "2025-04-10",
            expected: "2024-01-01",
          },
        ],
        fieldName: "Start Date",
        detectedAt: "2024-01-23 08:35:22",
        impact: "Low - administrative cleanup required",
      },
    ],
    reconciliation: {
      sourceRecords: 18438,
      reportRecords: 18438,
      matchingRecords: 18415,
      discrepancies: 23,
      matchRate: 99.88,
      fieldAccuracy: [
        { field: "Employee Id", accuracy: 100, issues: 0, records: 18438 },
        { field: "First Name", accuracy: 100, issues: 0, records: 18438 },
        { field: "Last Name", accuracy: 100, issues: 0, records: 18438 },
        { field: "Date of Hire", accuracy: 100, issues: 0, records: 18438 },
        { field: "Benefit Code", accuracy: 99.2, issues: 23, records: 18438 },
        {
          field: "Monthly Employee Deduction Amount",
          accuracy: 98.7,
          issues: 23,
          records: 18438,
        },
        {
          field: "Monthly Employer Deduction Amount",
          accuracy: 99.1,
          issues: 16,
          records: 18438,
        },
        {
          field: "Employee Pension Contribution",
          accuracy: 99.8,
          issues: 4,
          records: 17892,
        },
        {
          field: "Employer Pension Contribution",
          accuracy: 99.6,
          issues: 7,
          records: 17892,
        },
        { field: "Start Date", accuracy: 99.8, issues: 3, records: 18438 },
        { field: "End Date", accuracy: 100, issues: 0, records: 8923 },
      ],
    },
    benefitBreakdown: [
      {
        benefit: "Medical Insurance",
        code: "70",
        count: 18438,
        accuracy: 98.7,
        issues: 23,
        trend: -1.3,
      },
      {
        benefit: "Dental Insurance",
        code: "80",
        count: 15234,
        accuracy: 100,
        issues: 0,
        trend: 0,
      },
      {
        benefit: "Life Assurance",
        code: "20",
        count: 18438,
        accuracy: 100,
        issues: 0,
        trend: 0,
      },
      {
        benefit: "Pension Plans",
        code: "Various",
        count: 17892,
        accuracy: 99.8,
        issues: 0,
        trend: 0.2,
      },
      {
        benefit: "Travel Insurance",
        code: "6000",
        count: 8923,
        accuracy: 100,
        issues: 0,
        trend: 0,
      },
      {
        benefit: "Critical Illness",
        code: "40",
        count: 12456,
        accuracy: 100,
        issues: 0,
        trend: 0,
      },
      {
        benefit: "Health Cash Plan",
        code: "190",
        count: 9876,
        accuracy: 100,
        issues: 0,
        trend: 0,
      },
      {
        benefit: "Gym Membership",
        code: "130",
        count: 4567,
        accuracy: 100,
        issues: 0,
        trend: 0,
      },
    ],
  };

  const StatusBadge = ({ status, size = "sm" }) => {
    const config = {
      WARNING: {
        color: "bg-amber-100 text-amber-700 border-amber-200",
        icon: AlertTriangle,
      },
      RESOLVED: {
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
      },
      PENDING: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: Clock,
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
      amber: {
        bg: "from-amber-500 to-amber-600",
        text: "text-amber-600",
        bgLight: "bg-amber-50",
        border: "border-amber-200",
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
      if (value >= 99) return "green";
      if (value >= 95) return "amber";
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
                  Payroll Benefits Full - January 23, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <StatusBadge status={reportData.fileInfo.status} size="lg" />
              <button className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all transform hover:scale-105">
                <Download className="w-4 h-4 mr-2" />
                Download Report
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
        {/* File Information Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 mr-4">
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
            previousScore={98}
            description="Adherence to Aon specification requirements"
            color="blue"
            icon={Shield}
          />
          <ScoreCard
            title="Data Accuracy"
            score={reportData.scores.dataAccuracy}
            previousScore={96}
            description="Field-level validation and accuracy metrics"
            color="amber"
            icon={Target}
          />
          <ScoreCard
            title="Overall Score"
            score={reportData.scores.overallScore}
            previousScore={reportData.scores.previousScore}
            description="Composite quality score across all dimensions"
            color="green"
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
                  label: `Issues (${reportData.issues.length})`,
                  icon: AlertCircle,
                },
                { id: "reconciliation", label: "Reconciliation", icon: Target },
                { id: "benefits", label: "Benefit Breakdown", icon: BarChart3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-all ${
                    activeSection === tab.id
                      ? "border-blue-500 text-blue-600"
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
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
                    <div className="flex items-center mb-6">
                      <Info className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-blue-900">
                        Processing Summary
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">
                          Total Records Processed:
                        </span>
                        <span className="font-bold text-blue-900 text-lg">
                          {reportData.fileInfo.recordCount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">
                          Issues Detected:
                        </span>
                        <span className="font-bold text-blue-900 text-lg">
                          {reportData.issues.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">
                          Match Rate:
                        </span>
                        <span className="font-bold text-blue-900 text-lg">
                          {reportData.reconciliation.matchRate}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">
                          Data Quality:
                        </span>
                        <span className="font-bold text-amber-700 text-lg">
                          Good
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
                    <div className="flex items-center mb-6">
                      <AlertCircle className="w-6 h-6 text-amber-600 mr-3" />
                      <h3 className="text-xl font-semibold text-amber-900">
                        Key Findings
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800">
                          Premium calculation variance detected in 23 medical
                          insurance records
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800">
                          Minor date validation issues found in 3 employee
                          records
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800">
                          All critical fields validated successfully
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-amber-800">
                          Employee demographics 100% accurate
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Action Items & Recommendations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-red-200">
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                        <h4 className="font-semibold text-gray-900">
                          Immediate Actions
                        </h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          Review medical insurance calculation logic with source
                          system team
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          Validate date entry processes during enrollment period
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          Update tolerance thresholds for premium calculations
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-green-200">
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <h4 className="font-semibold text-gray-900">
                          Preventive Measures
                        </h4>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          Enhance automated validation rules for real-time
                          detection
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          Implement real-time calculation checks with source
                          system
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          Schedule weekly source system reconciliation
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
                    className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-8"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="text-2xl font-bold text-amber-900">
                            {issue.title}
                          </h3>
                          <SeverityBadge severity={issue.severity} />
                        </div>
                        <p className="text-amber-800 text-lg mb-4">
                          {issue.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-amber-700">
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
                      <AlertTriangle className="w-8 h-8 text-amber-600" />
                    </div>

                    <div className="mb-6">
                      <div className="bg-white rounded-lg p-6 shadow-sm">
                        <h4 className="font-semibold text-amber-900 mb-3">
                          Impact Analysis
                        </h4>
                        <p className="text-sm text-amber-800">{issue.impact}</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h4 className="font-semibold text-amber-900 mb-4">
                        Affected Employees
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b border-amber-200">
                              <th className="text-left py-3 px-4 font-medium text-amber-900">
                                Employee ID
                              </th>
                              <th className="text-left py-3 px-4 font-medium text-amber-900">
                                Name
                              </th>
                              {issue.type === "DATA_MISMATCH" ? (
                                <>
                                  <th className="text-left py-3 px-4 font-medium text-amber-900">
                                    Variance
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-amber-900">
                                    Percentage
                                  </th>
                                </>
                              ) : (
                                <>
                                  <th className="text-left py-3 px-4 font-medium text-amber-900">
                                    Incorrect Date
                                  </th>
                                  <th className="text-left py-3 px-4 font-medium text-amber-900">
                                    Expected Date
                                  </th>
                                </>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {issue.affectedEmployees
                              .slice(0, 5)
                              .map((emp, idx) => (
                                <tr
                                  key={idx}
                                  className="border-b border-amber-100 hover:bg-amber-50"
                                >
                                  <td className="py-3 px-4 font-mono text-sm">
                                    {emp.id}
                                  </td>
                                  <td className="py-3 px-4">{emp.name}</td>
                                  {issue.type === "DATA_MISMATCH" ? (
                                    <>
                                      <td className="py-3 px-4 font-mono text-red-700">
                                        {emp.variance}
                                      </td>
                                      <td className="py-3 px-4 font-mono text-red-700">
                                        {emp.percentage}
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td className="py-3 px-4 font-mono text-red-700">
                                        {emp.date}
                                      </td>
                                      <td className="py-3 px-4 font-mono text-green-700">
                                        {emp.expected}
                                      </td>
                                    </>
                                  )}
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        {issue.affectedEmployees.length > 5 && (
                          <div className="mt-4 text-center text-sm text-amber-700">
                            +{issue.affectedEmployees.length - 5} more employees
                            affected
                          </div>
                        )}
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
                  <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
                    <div className="flex items-center mb-6">
                      <Database className="w-6 h-6 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-blue-900">
                        Record Counts
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">
                          Source Records:
                        </span>
                        <span className="font-bold text-blue-900 text-lg">
                          {reportData.reconciliation.sourceRecords.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">
                          Report Records:
                        </span>
                        <span className="font-bold text-blue-900 text-lg">
                          {reportData.reconciliation.reportRecords.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">
                          Matching:
                        </span>
                        <span className="font-bold text-green-700 text-lg">
                          {reportData.reconciliation.matchingRecords.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700 font-medium">
                          Discrepancies:
                        </span>
                        <span className="font-bold text-red-700 text-lg">
                          {reportData.reconciliation.discrepancies}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Field Accuracy Breakdown
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
                                  {field.records.toLocaleString()}
                                </td>
                                <td className="py-4 px-4 text-center">
                                  <span
                                    className={`font-semibold ${
                                      field.accuracy >= 99
                                        ? "text-green-700"
                                        : field.accuracy >= 95
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

            {/* Benefits Tab */}
            {activeSection === "benefits" && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Benefit Type Performance
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-4 px-6 font-medium text-gray-900">
                            Benefit Type
                          </th>
                          <th className="text-center py-4 px-6 font-medium text-gray-900">
                            Code
                          </th>
                          <th className="text-center py-4 px-6 font-medium text-gray-900">
                            Record Count
                          </th>
                          <th className="text-center py-4 px-6 font-medium text-gray-900">
                            Accuracy
                          </th>
                          <th className="text-center py-4 px-6 font-medium text-gray-900">
                            Issues
                          </th>
                          <th className="text-center py-4 px-6 font-medium text-gray-900">
                            Trend
                          </th>
                          <th className="text-left py-4 px-6 font-medium text-gray-900">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.benefitBreakdown.map((benefit, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-gray-100 hover:bg-gray-50 ${
                              benefit.issues > 0 ? "bg-amber-50" : ""
                            }`}
                          >
                            <td className="py-4 px-6 font-medium text-gray-900">
                              {benefit.benefit}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-mono rounded">
                                {benefit.code}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center text-gray-700">
                              {benefit.count.toLocaleString()}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span
                                className={`font-semibold ${
                                  benefit.accuracy >= 99
                                    ? "text-green-700"
                                    : benefit.accuracy >= 95
                                    ? "text-amber-700"
                                    : "text-red-700"
                                }`}
                              >
                                {benefit.accuracy}%
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span
                                className={`font-semibold ${
                                  benefit.issues === 0
                                    ? "text-green-700"
                                    : "text-red-700"
                                }`}
                              >
                                {benefit.issues}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              {benefit.trend !== 0 && (
                                <div
                                  className={`flex items-center justify-center ${
                                    benefit.trend > 0
                                      ? "text-green-600"
                                      : benefit.trend < 0
                                      ? "text-red-600"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {benefit.trend > 0 ? (
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                  ) : benefit.trend < 0 ? (
                                    <TrendingDown className="w-4 h-4 mr-1" />
                                  ) : null}
                                  <span className="text-sm font-medium">
                                    {Math.abs(benefit.trend)}%
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              {benefit.issues === 0 ? (
                                <StatusBadge status="success" />
                              ) : (
                                <StatusBadge status="warning" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default ReportDetailView;

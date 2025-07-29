"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Database,
  FileText,
  Settings,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
  Activity,
  Eye,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";

const StellarClientDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSpecCollapsed, setIsSpecCollapsed] = useState(false);
  const [selectedValidation, setSelectedValidation] = useState(null);

  const router = useRouter();

  // Stellar Manufacturing client data based on Aon specifications
  const clientData = {
    clientInfo: {
      clientId: "STELLAR_CORP",
      clientName: "Stellar Manufacturing Ltd",
      industry: "Manufacturing",
      totalEmployees: 18456,
      contractStart: "2023-01-15",
      location: "Birmingham, UK",
      status: "Active",
    },
    reportSpecs: [
      {
        reportType: "Payroll Benefits Full",
        reportCategory: "scheduled",
        specificationDetails: {
          version: "6.1",
          lastUpdated: "2025-05-22",
          fileFormat: "CSV (comma separated)",
          fileName: "STELLAR_PayrollFull_DateTo_HHMMSS.csv",
          frequency: "Monthly (7th to 9th of each month)",
          deliveryMethod: "MFT: /Clients/Health/EMEA/STELLAR/General/Outbound",
          description:
            "Full file produces a row of data per employee per benefit code. Only employees with active benefit coverage are included.",
          sourceDocument: "Payroll Interface Specification 6.1.pdf",
          requiredFields: [
            "Employee Id",
            "First Name",
            "Last Name",
            "Date of Hire",
            "Change identifier",
            "Benefit Name",
            "Benefit Code",
            "Start Date",
            "End Date",
            "Monthly Employee Deduction Amount",
            "Monthly Employer Deduction Amount",
            "Employee Pension Contribution",
            "Employer Pension Contribution",
            "Pension Benefit Plan",
          ],
          businessRules: [
            "Only employees with active benefit coverage included",
            "Benefit codes where no deductions (Monthly Employee/Employer Deduction Amount = 0 or blank) not reported",
            "Company leavers should not be reported",
            "Only approved elections should be reported",
          ],
          benefitTypes: [
            "GBR - Critical Illness (40)",
            "GBR - Dental Insurance (80)",
            "GBR - Gym Membership (130)",
            "GBR - Health Cash Plan (190)",
            "GBR - Holiday Trading (140)",
            "GBR - Life Assurance (20)",
            "GBR - Medical Insurance (70)",
            "GBR - Pension Plans (Various)",
            "GBR - Travel Insurance (6000)",
          ],
        },
        dataSourceMapping: {
          sourceSystem: "STELLAR HR System (Workday)",
          targetSystem: "Aon Benefits Administration Platform",
          reconciliationPoints: [
            {
              source: "HR Employee Master Data",
              content:
                "Employee demographics (Employee ID, First Name, Last Name, Date of Hire)",
              validation:
                "Employee ID format validation, employment status verification",
              tbs_field:
                "Employee.EmployeeNumberID, Demographic.Employee.First/Last Name, Job.DateOfHire",
            },
            {
              source: "Payroll Deduction System",
              content:
                "Monthly employee and employer deduction amounts for all benefit codes",
              validation:
                "Deduction amounts > 0, calculation accuracy against source system",
              tbs_field:
                "Election.EmployeePayPeriodCost, Election.EmployerPayPeriodCost",
            },
            {
              source: "Benefits Enrollment Database",
              content:
                "Benefit elections, coverage dates, plan selections, benefit codes",
              validation:
                "Valid benefit codes from approved list, coverage period validation",
              tbs_field:
                "EmployeeElection.LineName, EmployeeElection.LineCode, Election.CoverageStartDate",
            },
            {
              source: "Pension Administration System",
              content:
                "Employee/employer pension contributions, pension plan types",
              validation:
                "Contribution percentages, plan eligibility, pension holiday status",
              tbs_field:
                "Employee.Election.Coverage Volume, Election.AddOn(Employer Contribution).Amount",
            },
          ],
        },
        recentValidations: [
          {
            date: "2024-01-25",
            fileName: "STELLAR_PayrollFull_012025_083000.csv",
            status: "PASS",
            recordCount: 18456,
            specCompliance: 98,
            dataAccuracy: 96,
            overallScore: 97,
            processingTime: "4m 32s",
            fileSize: "2.4 MB",
            issues: [
              {
                type: "SPEC_VIOLATION",
                severity: "LOW",
                description:
                  'One record with benefit code "MED-PLUS" not in approved specification list',
                affectedRecords: 1,
                fieldName: "Benefit Code",
                employeeId: "EMP123789",
                resolution: 'Benefit code updated in source system to "MED"',
                detectedAt: "2024-01-25 08:32:15",
              },
            ],
            reconciliationResults: {
              sourceRecords: 18456,
              reportRecords: 18456,
              matchingRecords: 18455,
              discrepancies: 1,
              fieldAccuracy: {
                "Employee Id": 100,
                "Benefit Code": 99.9,
                "Monthly Employee Deduction Amount": 99.2,
                "Monthly Employer Deduction Amount": 99.5,
              },
            },
            benefitBreakdown: {
              "Medical Insurance": 18456,
              "Dental Insurance": 15234,
              "Life Assurance": 18456,
              "Pension Plans": 17892,
              "Travel Insurance": 8923,
            },
          },
          {
            date: "2024-01-24",
            fileName: "STELLAR_PayrollFull_012024_083000.csv",
            status: "PASS",
            recordCount: 18442,
            specCompliance: 100,
            dataAccuracy: 98,
            overallScore: 99,
            processingTime: "4m 18s",
            fileSize: "2.3 MB",
            issues: [],
            reconciliationResults: {
              sourceRecords: 18442,
              reportRecords: 18442,
              matchingRecords: 18442,
              discrepancies: 0,
              fieldAccuracy: {
                "Employee Id": 100,
                "Benefit Code": 100,
                "Monthly Employee Deduction Amount": 98.5,
                "Monthly Employer Deduction Amount": 99.1,
              },
            },
          },
          {
            date: "2024-01-23",
            fileName: "STELLAR_PayrollFull_012324_083000.csv",
            status: "WARNING",
            recordCount: 18438,
            specCompliance: 95,
            dataAccuracy: 91,
            overallScore: 93,
            processingTime: "5m 12s",
            fileSize: "2.3 MB",
            issues: [
              {
                type: "DATA_MISMATCH",
                severity: "MEDIUM",
                description:
                  "Premium calculations differ from source by >2% for Medical Insurance",
                affectedRecords: 23,
                fieldName: "Monthly Employee Deduction Amount",
                resolution:
                  "Source system calculation logic updated, revalidated successfully",
                detectedAt: "2024-01-23 08:35:22",
              },
              {
                type: "BUSINESS_RULE",
                severity: "LOW",
                description:
                  "Future effective dates found (scheme year should be current)",
                affectedRecords: 3,
                fieldName: "Start Date",
                resolution:
                  "Dates corrected to current scheme year (01/01/2025)",
                detectedAt: "2024-01-23 08:35:22",
              },
            ],
            reconciliationResults: {
              sourceRecords: 18438,
              reportRecords: 18438,
              matchingRecords: 18415,
              discrepancies: 23,
            },
          },
        ],
      },
      {
        reportType: "Payroll Changes",
        reportCategory: "triggered",
        specificationDetails: {
          version: "6.1",
          lastUpdated: "2025-05-22",
          fileFormat: "CSV (comma separated)",
          fileName: "STELLAR_PayrollChanges_DateTo_HHMMSS.csv",
          frequency: "Triggered by benefit changes",
          deliveryMethod: "MFT: /Clients/Health/EMEA/STELLAR/Payroll/Outbound",
          description:
            "Changes file contains records for any positive/negative changes in reporting deductions/cost for benefit codes.",
          sourceDocument: "Payroll Interface Specification 6.1.pdf",
          requiredFields: [
            "Employee Id",
            "First Name",
            "Last Name",
            "Date of Hire",
            "Change identifier",
            "Benefit Name",
            "Benefit Code",
            "Start Date",
            "End Date",
            "Monthly Employee Deduction Amount",
            "Monthly Employer Deduction Amount",
          ],
          changeTypes: [
            '"A" = Add/New Election (blank/0 to value >0)',
            '"D" = Delete/Stop Record (value to 0/blank)',
            '"C" = Changed Election/Cost (value X to value Y) - requires 2 rows (D for old, A for new)',
          ],
          businessRules: [
            "Only report records with actual changes in deduction amounts",
            "Company leavers reported for benefit termination only",
            'Exception: Gym benefit - always report as "A" if Monthly Employee Deduction Amount > 0',
            "Renewal changes (January): different reporting rules for pensions vs other benefits",
          ],
          triggers: [
            "Employee life events (marriage, birth, divorce)",
            "Plan elections during enrollment periods",
            "Employment status changes",
            "Benefit terminations",
            "Premium amount modifications",
          ],
        },
        dataSourceMapping: {
          sourceSystem: "STELLAR HR System + Benefits Portal",
          targetSystem: "Aon Benefits Administration Platform",
          reconciliationPoints: [
            {
              source: "HR Change Event System",
              content: "Employee lifecycle events, status changes, life events",
              validation:
                "Change reason codes, effective dates, event classification",
              tbs_field:
                "Derived change identifier based on deduction amount changes",
            },
            {
              source: "Benefits Portal Real-time",
              content:
                "Live benefit elections, plan modifications, enrollment events",
              validation:
                "Election timestamps, plan validity, enrollment windows",
              tbs_field:
                "Election.CoverageStartDate, Election.LineName changes",
            },
            {
              source: "Payroll Change Detection",
              content:
                "Before/after deduction amount comparisons, change calculations",
              validation: "Change type classification (A/D/C), amount accuracy",
              tbs_field:
                "Monthly Employee/Employer Deduction Amount delta analysis",
            },
          ],
        },
        recentValidations: [
          {
            date: "2024-01-25",
            fileName: "STELLAR_PayrollChanges_012025_113000.csv",
            status: "PASS",
            recordCount: 47,
            specCompliance: 96,
            dataAccuracy: 94,
            overallScore: 95,
            processingTime: "1m 23s",
            fileSize: "15 KB",
            issues: [
              {
                type: "CHANGE_LOGIC",
                severity: "LOW",
                description:
                  'One record marked as "C" should be "A" based on change detection rules',
                affectedRecords: 1,
                fieldName: "Change identifier",
                employeeId: "EMP456123",
                resolution:
                  "Change detection logic refined, classification corrected",
                detectedAt: "2024-01-25 11:32:45",
              },
            ],
            reconciliationResults: {
              sourceChanges: 47,
              reportedChanges: 47,
              correctlyClassified: 46,
              misclassified: 1,
            },
            changeBreakdown: {
              additions: 23,
              deletions: 8,
              modifications: 16,
              triggers: {
                "Life Events": 15,
                "Plan Elections": 18,
                "Employment Changes": 8,
                "Premium Updates": 6,
              },
            },
          },
          {
            date: "2024-01-24",
            fileName: "STELLAR_PayrollChanges_012424_143000.csv",
            status: "FAIL",
            recordCount: 31,
            specCompliance: 45,
            dataAccuracy: 23,
            overallScore: 34,
            processingTime: "2m 45s",
            fileSize: "12 KB",
            issues: [
              {
                type: "CRITICAL_ERROR",
                severity: "HIGH",
                description:
                  "Multiple benefit codes not found in approved specification list",
                affectedRecords: 12,
                fieldName: "Benefit Code",
                resolution:
                  "File rejected - requires benefit code mapping update",
                detectedAt: "2024-01-24 14:32:15",
              },
              {
                type: "DATA_CORRUPTION",
                severity: "HIGH",
                description:
                  "Invalid change identifiers found - contains values other than A, D, C",
                affectedRecords: 8,
                fieldName: "Change identifier",
                resolution:
                  "Source system change detection logic requires debugging",
                detectedAt: "2024-01-24 14:33:45",
              },
              {
                type: "BUSINESS_RULE",
                severity: "MEDIUM",
                description:
                  "Company leavers incorrectly included in changes file",
                affectedRecords: 3,
                fieldName: "Employee Status",
                resolution:
                  "Filter logic updated to exclude terminated employees",
                detectedAt: "2024-01-24 14:34:22",
              },
            ],
            reconciliationResults: {
              sourceChanges: 31,
              reportedChanges: 31,
              correctlyClassified: 8,
              misclassified: 23,
            },
            changeBreakdown: {
              additions: 5,
              deletions: 3,
              modifications: 0,
            },
          },
        ],
      },
    ],
  };

  const StatusBadge = ({ status }) => {
    const config = {
      PASS: {
        color: "bg-emerald-100 text-emerald-700 border-emerald-200",
        icon: CheckCircle,
      },
      WARNING: {
        color: "bg-amber-100 text-amber-700 border-amber-200",
        icon: AlertTriangle,
      },
      FAIL: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
    };
    const { color, icon: Icon } = config[status];
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${color}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  const ScoreGauge = ({ score, size = "sm" }) => {
    const radius = size === "lg" ? 40 : 20;
    const strokeWidth = size === "lg" ? 6 : 3;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = `${(score * circumference) / 100} ${circumference}`;

    const getColor = (score) => {
      if (score >= 95) return "#10b981";
      if (score >= 85) return "#f59e0b";
      return "#ef4444";
    };

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={getColor(score)}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center ${
            size === "lg" ? "text-lg" : "text-xs"
          } font-bold text-gray-900`}
        >
          {score}%
        </span>
      </div>
    );
  };

  const currentSpec = clientData.reportSpecs[activeTab];

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">
                Client Report Details
              </h1>
            </div>
            <div className="flex items-center space-x-3 bg-green-600 text-white px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">System Operational</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Client Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🏭</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {clientData.clientInfo.clientName}
                </h1>
                <div className="flex items-center space-x-4 mt-1 text-gray-600">
                  <span>{clientData.clientInfo.industry}</span>
                  <span>•</span>
                  <span>
                    {clientData.clientInfo.totalEmployees.toLocaleString()}{" "}
                    employees
                  </span>
                  <span>•</span>
                  <span>{clientData.clientInfo.location}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Client ID
              </div>
              <div className="font-mono text-xl font-bold text-gray-900">
                {clientData.clientInfo.clientId}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Active since{" "}
                {new Date(
                  clientData.clientInfo.contractStart
                ).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {clientData.reportSpecs.map((spec, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === index
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {spec.reportType}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Report Specification - Collapsible */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <button
              onClick={() => setIsSpecCollapsed(!isSpecCollapsed)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                Report Specification
              </h2>
              {isSpecCollapsed ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          {!isSpecCollapsed && (
            <div className="p-6 space-y-8">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Version
                  </div>
                  <div className="text-lg font-mono">
                    {currentSpec.specificationDetails.version}
                  </div>
                  <div className="text-xs text-gray-600">
                    Updated: {currentSpec.specificationDetails.lastUpdated}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    File Format
                  </div>
                  <div className="text-lg">
                    {currentSpec.specificationDetails.fileFormat}
                  </div>
                  <div className="text-xs text-gray-600 font-mono break-words">
                    {currentSpec.specificationDetails.fileName}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Frequency
                  </div>
                  <div className="text-lg">
                    {currentSpec.specificationDetails.frequency}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Delivery Method
                  </div>
                  <div className="text-sm text-gray-900 font-mono break-words">
                    {currentSpec.specificationDetails.deliveryMethod}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Source Document
                  </div>
                  <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                    {currentSpec.specificationDetails.sourceDocument}
                  </div>
                  <div className="text-xs text-gray-600">Reference file</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700">
                  {currentSpec.specificationDetails.description}
                </p>
              </div>

              {/* Data Source Mapping */}
              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Data Source Mapping
                </h3>
                <div className="text-sm text-gray-600 mb-4">
                  {currentSpec.dataSourceMapping.sourceSystem} →{" "}
                  {currentSpec.dataSourceMapping.targetSystem}
                </div>
                <div className="space-y-4">
                  {currentSpec.dataSourceMapping.reconciliationPoints.map(
                    (point, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {point.source}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                          <div>
                            <div className="font-medium text-gray-600">
                              Content
                            </div>
                            <div className="text-gray-800">{point.content}</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-600">
                              Validation
                            </div>
                            <div className="text-gray-800">
                              {point.validation}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-600">
                              TBS Field
                            </div>
                            <div className="text-xs font-mono text-gray-700 bg-white p-2 rounded">
                              {point.tbs_field}
                            </div>
                          </div>
                        </div>

                        {/* Add calculation logic for HR Change Event System in Payroll Changes */}
                        {currentSpec.reportType === "Payroll Changes" &&
                          point.source === "HR Change Event System" && (
                            <div className="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 border-2 border-purple-300">
                              <h5 className="text-sm font-bold text-purple-800 mb-2 flex items-center">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                🧮 AI Field Calculation Logic - Derived Change
                                Identifier
                              </h5>
                              <p className="text-xs text-gray-700 mb-2">
                                <strong>Natural Language:</strong> The system
                                analyzes deduction amount changes between
                                payroll periods to derive the appropriate change
                                identifier (A/D/C) based on before and after
                                states.
                              </p>
                              <div className="bg-white p-3 rounded text-xs font-mono border border-purple-200">
                                <strong>Mathematical Logic:</strong>
                                <br />
                                <br />
                                PreviousEmpDeduction =
                                GetPreviousPayPeriod(EmployeeID,
                                BenefitCode).MonthlyEmployeeDeductionAmount
                                <br />
                                CurrentEmpDeduction =
                                GetCurrentPayPeriod(EmployeeID,
                                BenefitCode).MonthlyEmployeeDeductionAmount
                                <br />
                                <br />
                                PreviousEmpDeduction =
                                ISNULL(PreviousEmpDeduction, 0)
                                <br />
                                CurrentEmpDeduction =
                                ISNULL(CurrentEmpDeduction, 0)
                                <br />
                                <br />
                                IF (PreviousEmpDeduction = 0 AND
                                CurrentEmpDeduction {">"} 0) THEN
                                <br />
                                &nbsp;&nbsp;DerivedChangeIdentifier = "A" // New
                                Election
                                <br />
                                <br />
                                ELSEIF (PreviousEmpDeduction {">"} 0 AND
                                CurrentEmpDeduction = 0) THEN
                                <br />
                                &nbsp;&nbsp;DerivedChangeIdentifier = "D" //
                                Deletion/Termination
                                <br />
                                <br />
                                ELSEIF (ABS(CurrentEmpDeduction -
                                PreviousEmpDeduction) {">"} 0.01) THEN
                                <br />
                                &nbsp;&nbsp;// Cost Change - requires 2 records
                                <br />
                                &nbsp;&nbsp;CreateRecord(ChangeIdentifier="D",
                                Amount=PreviousEmpDeduction)
                                <br />
                                &nbsp;&nbsp;CreateRecord(ChangeIdentifier="A",
                                Amount=CurrentEmpDeduction)
                                <br />
                                <br />
                                ELSE
                                <br />
                                &nbsp;&nbsp;DerivedChangeIdentifier = "" // No
                                reportable change
                                <br />
                                <br />
                                // Special exception for Gym benefit (code 130)
                                <br />
                                IF (BenefitCode = "130" AND CurrentEmpDeduction
                                {">"} 0) THEN
                                <br />
                                &nbsp;&nbsp;DerivedChangeIdentifier = "A" //
                                Always report as addition
                              </div>
                            </div>
                          )}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Required Fields and Business Rules */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-md font-semibold text-gray-900 mb-3">
                    Required Fields (
                    {currentSpec.specificationDetails.requiredFields.length})
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    {currentSpec.specificationDetails.requiredFields.map(
                      (field, i) => (
                        <div
                          key={i}
                          className="text-sm py-1 border-b border-gray-200 last:border-b-0"
                        >
                          {field}
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-900 mb-3">
                    Business Rules (
                    {currentSpec.specificationDetails.businessRules.length})
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
                    {currentSpec.specificationDetails.businessRules.map(
                      (rule, i) => (
                        <div key={i} className="text-sm flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {rule}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Additional fields for triggered reports */}
              {currentSpec.reportCategory === "triggered" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-3">
                      Change Types
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {currentSpec.specificationDetails.changeTypes.map(
                        (type, i) => (
                          <div key={i} className="text-sm">
                            {type}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-3">
                      Trigger Events
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      {currentSpec.specificationDetails.triggers.map(
                        (trigger, i) => (
                          <div key={i} className="text-sm flex items-center">
                            <Activity className="w-3 h-3 text-orange-500 mr-2" />
                            {trigger}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Generated Reports Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Generated Reports
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Records
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overall Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processing Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issues
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSpec.recentValidations.map((validation, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-mono text-sm text-gray-900">
                        {validation.date}
                      </div>
                      <div className="text-xs text-gray-500">
                        {validation.fileSize}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={validation.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {validation.recordCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {validation.overallScore}%
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          Overall Score
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {validation.processingTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          validation.issues.length === 0
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {validation.issues.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                        <Download className="w-3 h-3 mr-1" />
                        View Report
                      </button>
                      <button
                        onClick={() => {
                          setSelectedValidation(
                            selectedValidation === `${activeTab}-${i}`
                              ? null
                              : `${activeTab}-${i}`
                          );

                          if (validation.date === "2024-01-23") {
                            router.push("/stellar/report-detail");
                          }
                          if (validation.date === "2024-01-24" && activeTab === 1) {
                            router.push("/stellar/payroll-changes");
                          }
                        }}
                        className="inline-flex items-center px-3 py-1 border border-blue-300 shadow-sm text-xs font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed View Modal/Expandable Section */}
        {selectedValidation && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Validation Details
              </h3>
              <button
                onClick={() => setSelectedValidation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {(() => {
                const [tabIndex, validationIndex] = selectedValidation
                  .split("-")
                  .map(Number);
                const validation =
                  clientData.reportSpecs[tabIndex].recentValidations[
                    validationIndex
                  ];

                return (
                  <div className="space-y-6">
                    {/* File Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        File Information
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Filename</div>
                          <div className="font-mono">{validation.fileName}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">File Size</div>
                          <div>{validation.fileSize}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Processing Time</div>
                          <div>{validation.processingTime}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Record Count</div>
                          <div>{validation.recordCount.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Scores */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center bg-blue-50 rounded-lg p-6 border border-blue-200">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {validation.specCompliance}%
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          Spec Compliance
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {validation.specCompliance >= 95
                            ? "Excellent"
                            : validation.specCompliance >= 85
                            ? "Good"
                            : "Needs Attention"}
                        </div>
                      </div>
                      <div className="text-center bg-green-50 rounded-lg p-6 border border-green-200">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {validation.dataAccuracy}%
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          Data Accuracy
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {validation.dataAccuracy >= 95
                            ? "Excellent"
                            : validation.dataAccuracy >= 85
                            ? "Good"
                            : "Needs Attention"}
                        </div>
                      </div>
                      <div className="text-center bg-purple-50 rounded-lg p-6 border border-purple-200">
                        <div className="text-4xl font-bold text-purple-600 mb-2">
                          {validation.overallScore}%
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          Overall Score
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {validation.overallScore >= 95
                            ? "Excellent"
                            : validation.overallScore >= 85
                            ? "Good"
                            : "Needs Attention"}
                        </div>
                      </div>
                    </div>

                    {/* Issues */}
                    {validation.issues && validation.issues.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Issues Detected ({validation.issues.length})
                        </h4>
                        <div className="space-y-3">
                          {validation.issues.map((issue, j) => (
                            <div
                              key={j}
                              className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r"
                            >
                              <div className="flex justify-between items-start">
                                <div className="font-medium text-amber-800">
                                  {issue.type} - {issue.severity}
                                </div>
                                <span className="text-sm text-amber-700">
                                  {issue.affectedRecords} record(s)
                                </span>
                              </div>
                              <div className="mt-1 text-amber-700">
                                {issue.description}
                              </div>
                              {issue.employeeId && (
                                <div className="mt-1 text-sm text-amber-600">
                                  <strong>Employee ID:</strong>{" "}
                                  {issue.employeeId} | <strong>Field:</strong>{" "}
                                  {issue.fieldName}
                                </div>
                              )}
                              <div className="mt-1 text-sm text-amber-600">
                                <strong>Resolution:</strong> {issue.resolution}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional details based on validation data */}
                    {validation.reconciliationResults && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-3">
                            Reconciliation Results
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Source Records:</span>
                              <span className="font-mono">
                                {(
                                  validation.reconciliationResults
                                    .sourceRecords ||
                                  validation.reconciliationResults
                                    .sourceChanges ||
                                  0
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Report Records:</span>
                              <span className="font-mono">
                                {(
                                  validation.reconciliationResults
                                    .reportRecords ||
                                  validation.reconciliationResults
                                    .reportedChanges ||
                                  0
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Discrepancies:</span>
                              <span
                                className={`font-mono ${
                                  validation.reconciliationResults
                                    .discrepancies === 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {validation.reconciliationResults
                                  .discrepancies ||
                                  validation.reconciliationResults
                                    .misclassified ||
                                  0}
                              </span>
                            </div>
                          </div>
                        </div>

                        {validation.changeBreakdown && (
                          <div className="bg-green-50 rounded-lg p-4">
                            <h4 className="font-medium text-green-900 mb-3">
                              Change Breakdown
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Additions:</span>
                                <span className="font-mono text-green-600">
                                  +{validation.changeBreakdown.additions}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Deletions:</span>
                                <span className="font-mono text-red-600">
                                  -{validation.changeBreakdown.deletions}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Modifications:</span>
                                <span className="font-mono text-blue-600">
                                  ~{validation.changeBreakdown.modifications}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StellarClientDashboard;

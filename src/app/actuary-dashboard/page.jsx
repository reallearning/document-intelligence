"use client";
import React, { useState } from "react";
import {
  Plus,
  Edit,
  Eye,
  Check,
  X,
  Clock,
  AlertCircle,
  Save,
  FileText,
  Users,
  Calculator,
  ChevronDown,
  ChevronRight,
  History,
  Play,
  Zap,
  BookOpen,
} from "lucide-react";

const ActuaryDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [expandedLogic, setExpandedLogic] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(null);
  const [useNLInput, setUseNLInput] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [newLogic, setNewLogic] = useState({
    name: "",
    scheme: "",
    scenario: "",
    description: "",
    formula: "",
    naturalLanguage: "",
    factors: [],
    testInputs: {
      age: "",
      serviceYears: "",
      basePension: "",
      finalSalary: "",
    },
  });

  // Sample data with more comprehensive calculation logics
  const [calculationLogics, setCalculationLogics] = useState([
    {
      id: 1,
      name: "401k Early Retirement - Age 55-60",
      scheme: "401(k)",
      scenario: "Early Retirement + Age 55-60",
      version: "1.2",
      status: "pending",
      submittedBy: "John Smith",
      submittedDate: "2024-08-05",
      description:
        "Calculation logic for 401k early retirement between ages 55-60 with reduced benefits",
      formula:
        "Base_Pension * Early_Retirement_Factor * Years_Of_Service_Factor * (1 - Age_Reduction)",
      naturalLanguage:
        "Calculate pension as base pension multiplied by early retirement factor and service factor, reduced by age penalty",
      factors: [
        {
          name: "Early_Retirement_Factor",
          value: "0.85",
          condition: "Age 55-60, minimum 10 years service",
        },
        {
          name: "Years_Of_Service_Factor",
          value: "min(Service_Years / 30, 1.0)",
          condition: "Capped at 30 years",
        },
        {
          name: "Age_Reduction",
          value: "(65 - Current_Age) * 0.005",
          condition: "0.5% per year before 65",
        },
      ],
      rejectionReason: null,
      lastModified: "2024-08-05",
      versions: [
        {
          version: "1.0",
          date: "2024-07-15",
          changes: "Initial version",
          status: "approved",
          createdBy: "John Smith",
          createdDate: "2024-07-15",
          reviewedBy: "Chief Actuary",
          reviewedDate: "2024-07-16",
          approvalComments: "Approved with standard early retirement factors",
        },
        {
          version: "1.1",
          date: "2024-07-28",
          changes: "Updated age reduction factor from 0.006 to 0.005 per year",
          status: "approved",
          createdBy: "John Smith",
          createdDate: "2024-07-28",
          reviewedBy: "Senior Actuary",
          reviewedDate: "2024-07-29",
          approvalComments: "Approved - aligns with industry standards",
        },
        {
          version: "1.2",
          date: "2024-08-05",
          changes: "Added service year cap at 30 years maximum",
          status: "pending",
          createdBy: "John Smith",
          createdDate: "2024-08-05",
          reviewedBy: null,
          reviewedDate: null,
          approvalComments: null,
        },
      ],
    },
    {
      id: 2,
      name: "Traditional DB Normal Retirement",
      scheme: "Traditional DB",
      scenario: "Normal Retirement + Age 65",
      version: "3.1",
      status: "approved",
      submittedBy: "Sarah Johnson",
      submittedDate: "2024-08-03",
      approvedBy: "Chief Actuary",
      approvedDate: "2024-08-04",
      description:
        "Standard defined benefit calculation for normal retirement at age 65",
      formula:
        "Final_Average_Salary * Accrual_Rate * Years_Of_Service + Annual_Increase_Adjustment",
      naturalLanguage:
        "Multiply final average salary by accrual rate and years of service, then add annual increase adjustment",
      factors: [
        {
          name: "Final_Average_Salary",
          value: "Average of highest 3 consecutive years",
          condition: "Last 10 years of service",
        },
        {
          name: "Accrual_Rate",
          value: "0.015",
          condition: "1.5% per year of service",
        },
        {
          name: "Annual_Increase_Adjustment",
          value: "Previous_Year_Pension * 0.03",
          condition: "3% annual increase",
        },
      ],
      rejectionReason: null,
      lastModified: "2024-08-03",
      versions: [
        {
          version: "3.0",
          date: "2024-06-01",
          changes:
            "Updated for 2024 regulations - revised accrual rates and salary averaging",
          status: "approved",
          createdBy: "Sarah Johnson",
          createdDate: "2024-06-01",
          reviewedBy: "Chief Actuary",
          reviewedDate: "2024-06-03",
          approvalComments: "Approved - complies with 2024 regulatory changes",
        },
        {
          version: "3.1",
          date: "2024-08-03",
          changes:
            "Added annual increase adjustment of 3% for inflation protection",
          status: "approved",
          createdBy: "Sarah Johnson",
          createdDate: "2024-08-03",
          reviewedBy: "Chief Actuary",
          reviewedDate: "2024-08-04",
          approvalComments:
            "Approved - necessary for cost of living adjustments",
        },
      ],
    },
    {
      id: 3,
      name: "Cash Commutation Calculation",
      scheme: "All Schemes",
      scenario: "Lump Sum + Remaining Pension",
      version: "2.0",
      status: "approved",
      submittedBy: "Mike Wilson",
      submittedDate: "2024-07-28",
      approvedBy: "Chief Actuary",
      approvedDate: "2024-07-30",
      description: "Calculation for cash commutation of pension benefits",
      formula:
        "Lump_Sum = (Annual_Pension * Commutation_Factor * Commutation_Percentage) ; Remaining_Pension = Annual_Pension * (1 - Commutation_Percentage)",
      naturalLanguage:
        "Calculate lump sum by multiplying annual pension with commutation factor and percentage, remaining pension is reduced proportionally",
      factors: [
        {
          name: "Commutation_Factor",
          value: "12.5",
          condition: "Standard actuarial factor",
        },
        {
          name: "Commutation_Percentage",
          value: "min(Member_Choice, 0.25)",
          condition: "Maximum 25% of pension",
        },
        {
          name: "Tax_Adjustment",
          value: "Lump_Sum * Tax_Rate",
          condition: "Applied if over threshold",
        },
      ],
      rejectionReason: null,
      lastModified: "2024-07-28",
      versions: [
        {
          version: "1.0",
          date: "2024-05-15",
          changes: "Initial commutation logic with standard actuarial factors",
          status: "approved",
          createdBy: "Mike Wilson",
          createdDate: "2024-05-15",
          reviewedBy: "Senior Actuary",
          reviewedDate: "2024-05-17",
          approvalComments:
            "Approved - standard commutation factors applied correctly",
        },
        {
          version: "2.0",
          date: "2024-07-28",
          changes: "Added tax adjustment for large lump sums over $100,000",
          status: "approved",
          createdBy: "Mike Wilson",
          createdDate: "2024-07-28",
          reviewedBy: "Chief Actuary",
          reviewedDate: "2024-07-30",
          approvalComments:
            "Approved - essential for tax compliance on large commutations",
        },
      ],
    },
    {
      id: 4,
      name: "Disability Pension - Total Incapacity",
      scheme: "All Schemes",
      scenario: "Disability + Total Incapacity",
      version: "1.0",
      status: "rejected",
      submittedBy: "Alice Brown",
      submittedDate: "2024-08-02",
      description:
        "Calculation for total incapacity disability pension with medical allowances",
      formula:
        "Base_Pension * Disability_Factor + Medical_Allowance + Dependent_Allowance",
      naturalLanguage:
        "Calculate base pension with disability enhancement plus medical and dependent allowances",
      factors: [
        {
          name: "Disability_Factor",
          value: "1.2",
          condition: "Total incapacity certification",
        },
        {
          name: "Medical_Allowance",
          value: "750",
          condition: "Monthly medical support",
        },
        {
          name: "Dependent_Allowance",
          value: "Number_Of_Dependents * 200",
          condition: "Per dependent under 18",
        },
      ],
      rejectionReason:
        "Disability factor should be 1.15 as per latest medical guidelines, and dependent allowance needs age verification",
      lastModified: "2024-08-02",
      versions: [
        {
          version: "1.0",
          date: "2024-08-02",
          changes: "Initial disability calculation with enhanced factors",
          status: "rejected",
          createdBy: "Alice Brown",
          createdDate: "2024-08-02",
          reviewedBy: "Medical Advisory Board",
          reviewedDate: "2024-08-04",
          approvalComments:
            "Rejected - disability factor should be 1.15 per latest medical guidelines. Dependent allowance needs age verification process.",
        },
      ],
    },
    {
      id: 5,
      name: "Pre-2006 Joiner Benefits",
      scheme: "Traditional DB",
      scenario: "Normal Retirement + Pre-GMP 2006",
      version: "2.3",
      status: "approved",
      submittedBy: "Robert Chen",
      submittedDate: "2024-07-20",
      approvedBy: "Senior Actuary",
      approvedDate: "2024-07-22",
      description:
        "Enhanced benefits calculation for members who joined before 2006 GMP changes",
      formula:
        "Final_Salary * Enhanced_Accrual_Rate * Service_Years + GMP_Top_Up + Inflation_Protection",
      naturalLanguage:
        "Calculate pension using enhanced accrual rate for pre-2006 joiners with GMP top-up and inflation protection",
      factors: [
        {
          name: "Enhanced_Accrual_Rate",
          value: "0.0167",
          condition: "1.67% for pre-2006 joiners",
        },
        {
          name: "GMP_Top_Up",
          value: "Weekly_GMP * 52 * GMP_Factor",
          condition: "Guaranteed minimum pension enhancement",
        },
        {
          name: "Inflation_Protection",
          value: "Annual_Pension * RPI_Increase",
          condition: "Full RPI protection",
        },
      ],
      rejectionReason: null,
      lastModified: "2024-07-20",
      versions: [
        {
          version: "2.0",
          date: "2024-06-10",
          changes: "Updated GMP calculations for post-2016 requirements",
          status: "approved",
          createdBy: "Robert Chen",
          createdDate: "2024-06-10",
          reviewedBy: "Chief Actuary",
          reviewedDate: "2024-06-12",
          approvalComments:
            "Approved - GMP calculations now compliant with latest regulations",
        },
        {
          version: "2.1",
          date: "2024-06-25",
          changes: "Added inflation protection mechanism with RPI indexation",
          status: "approved",
          createdBy: "Robert Chen",
          createdDate: "2024-06-25",
          reviewedBy: "Senior Actuary",
          reviewedDate: "2024-06-27",
          approvalComments:
            "Approved - inflation protection essential for pre-2006 members",
        },
        {
          version: "2.2",
          date: "2024-07-10",
          changes:
            "Revised accrual rate from 1.67% to 1.8% based on scheme review",
          status: "rejected",
          createdBy: "Robert Chen",
          createdDate: "2024-07-10",
          reviewedBy: "Chief Actuary",
          reviewedDate: "2024-07-12",
          approvalComments:
            "Rejected - accrual rate increase not supported by scheme funding level",
        },
        {
          version: "2.3",
          date: "2024-07-20",
          changes:
            "Corrected accrual rate back to 1.67% per original scheme rules",
          status: "approved",
          createdBy: "Robert Chen",
          createdDate: "2024-07-20",
          reviewedBy: "Chief Actuary",
          reviewedDate: "2024-07-22",
          approvalComments:
            "Approved - maintains original scheme design integrity",
        },
      ],
    },
    {
      id: 6,
      name: "Survivor Pension Calculation",
      scheme: "All Schemes",
      scenario: "Death in Service + Spouse Pension",
      version: "1.1",
      status: "pending",
      submittedBy: "Emma Wilson",
      submittedDate: "2024-08-06",
      description:
        "Calculation for spouse pension in case of member death during service",
      formula:
        "Spouse_Pension = (Accrued_Pension + Death_Service_Enhancement) * Spouse_Percentage",
      naturalLanguage:
        "Calculate spouse pension as percentage of enhanced pension including death in service benefits",
      factors: [
        {
          name: "Death_Service_Enhancement",
          value: "Final_Salary * 0.02 * Prospective_Years",
          condition: "Enhancement to normal retirement",
        },
        {
          name: "Spouse_Percentage",
          value: "0.5",
          condition: "50% of member's enhanced pension",
        },
        {
          name: "Minimum_Pension",
          value: "max(Calculated_Pension, 5000)",
          condition: "Annual minimum guarantee",
        },
      ],
      rejectionReason: null,
      lastModified: "2024-08-06",
      versions: [
        {
          version: "1.0",
          date: "2024-07-30",
          changes:
            "Initial survivor benefits logic with death service enhancement",
          status: "approved",
          createdBy: "Emma Wilson",
          createdDate: "2024-07-30",
          reviewedBy: "Senior Actuary",
          reviewedDate: "2024-08-01",
          approvalComments: "Approved - standard survivor benefit calculation",
        },
        {
          version: "1.1",
          date: "2024-08-06",
          changes: "Added minimum pension guarantee of $5,000 annually",
          status: "pending",
          createdBy: "Emma Wilson",
          createdDate: "2024-08-06",
          reviewedBy: null,
          reviewedDate: null,
          approvalComments: null,
        },
      ],
    },
  ]);

  const convertNaturalLanguage = (nlText) => {
    // Simple NL to formula conversion (in real implementation, this would use AI/ML)
    const conversions = {
      multiply: "*",
      "multiplied by": "*",
      times: "*",
      plus: "+",
      add: "+",
      minus: "-",
      subtract: "-",
      divide: "/",
      "divided by": "/",
      percentage: "/ 100",
      percent: "/ 100",
      "age penalty": "Age_Reduction",
      "service factor": "Service_Factor",
      "base pension": "Base_Pension",
      "final salary": "Final_Salary",
      "years of service": "Years_Of_Service",
    };

    let formula = nlText.toLowerCase();
    Object.entries(conversions).forEach(([key, value]) => {
      formula = formula.replace(new RegExp(key, "g"), value);
    });

    return formula.replace(/\s+/g, " ").trim();
  };

  const testLogic = () => {
    const { age, serviceYears, basePension, finalSalary } = newLogic.testInputs;

    // Mock calculation based on formula
    let result = 0;
    if (basePension && serviceYears) {
      result = parseFloat(basePension) * (parseFloat(serviceYears) / 30) * 0.85;
      if (age && age < 65) {
        result *= 1 - (65 - parseFloat(age)) * 0.005;
      }
    }

    setTestResults({
      monthlyPension: result.toFixed(2),
      annualPension: (result * 12).toFixed(2),
      factors: {
        serviceFactor: serviceYears
          ? Math.min(parseFloat(serviceYears) / 30, 1.0).toFixed(3)
          : "N/A",
        earlyRetirementFactor: "0.850",
        ageReduction:
          age && age < 65
            ? ((65 - parseFloat(age)) * 0.005).toFixed(3)
            : "0.000",
      },
    });
  };

  const handleApprove = (id) => {
    const currentDate = new Date().toISOString().split("T")[0];
    setCalculationLogics((prev) =>
      prev.map((logic) => {
        if (logic.id === id) {
          const updatedVersions = logic.versions.map((version) =>
            version.version === logic.version
              ? {
                  ...version,
                  status: "approved",
                  reviewedBy: "Chief Actuary",
                  reviewedDate: currentDate,
                  approvalComments:
                    "Approved - meets all actuarial standards and regulatory requirements",
                }
              : version
          );
          return {
            ...logic,
            status: "approved",
            approvedBy: "Chief Actuary",
            approvedDate: currentDate,
            versions: updatedVersions,
          };
        }
        return logic;
      })
    );
  };

  const handleReject = (id, reason) => {
    const currentDate = new Date().toISOString().split("T")[0];
    setCalculationLogics((prev) =>
      prev.map((logic) => {
        if (logic.id === id) {
          const updatedVersions = logic.versions.map((version) =>
            version.version === logic.version
              ? {
                  ...version,
                  status: "rejected",
                  reviewedBy: "Chief Actuary",
                  reviewedDate: currentDate,
                  approvalComments: reason,
                }
              : version
          );
          return {
            ...logic,
            status: "rejected",
            rejectionReason: reason,
            versions: updatedVersions,
          };
        }
        return logic;
      })
    );
  };

  const handleCreateLogic = () => {
    const newId = Math.max(...calculationLogics.map((l) => l.id)) + 1;
    const logic = {
      ...newLogic,
      id: newId,
      version: "1.0",
      status: "pending",
      submittedBy: "Current User",
      submittedDate: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      versions: [
        {
          version: "1.0",
          date: new Date().toISOString().split("T")[0],
          changes: "Initial version",
          status: "pending",
          createdBy: "Current User",
          createdDate: new Date().toISOString().split("T")[0],
          reviewedBy: null,
          reviewedDate: null,
          approvalComments: null,
        },
      ],
    };
    setCalculationLogics((prev) => [logic, ...prev]);
    setShowCreateModal(false);
    setNewLogic({
      name: "",
      scheme: "",
      scenario: "",
      description: "",
      formula: "",
      naturalLanguage: "",
      factors: [],
      testInputs: {
        age: "",
        serviceYears: "",
        basePension: "",
        finalSalary: "",
      },
    });
    setTestResults(null);
    setUseNLInput(false);
  };

  const filteredLogics = calculationLogics.filter((logic) => {
    if (activeTab === "all") return true;
    return logic.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <Check className="w-4 h-4" />;
      case "rejected":
        return <X className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Actuary Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage pension calculation logic and approval workflows
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Logic</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold">
                  {
                    calculationLogics.filter((l) => l.status === "pending")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold">
                  {
                    calculationLogics.filter((l) => l.status === "approved")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold">
                  {
                    calculationLogics.filter((l) => l.status === "rejected")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Logics</p>
                <p className="text-2xl font-bold">{calculationLogics.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                {
                  id: "pending",
                  label: "Pending Approval",
                  count: calculationLogics.filter((l) => l.status === "pending")
                    .length,
                },
                {
                  id: "approved",
                  label: "Approved",
                  count: calculationLogics.filter(
                    (l) => l.status === "approved"
                  ).length,
                },
                {
                  id: "rejected",
                  label: "Rejected",
                  count: calculationLogics.filter(
                    (l) => l.status === "rejected"
                  ).length,
                },
                {
                  id: "all",
                  label: "All Logics",
                  count: calculationLogics.length,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Logic Cards */}
          <div className="p-6">
            <div className="space-y-4">
              {filteredLogics.map((logic) => (
                <div
                  key={logic.id}
                  className="border border-gray-200 rounded-lg"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              setExpandedLogic(
                                expandedLogic === logic.id ? null : logic.id
                              )
                            }
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {expandedLogic === logic.id ? (
                              <ChevronDown className="w-5 h-5" />
                            ) : (
                              <ChevronRight className="w-5 h-5" />
                            )}
                          </button>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {logic.name}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              logic.status
                            )}`}
                          >
                            {getStatusIcon(logic.status)}
                            <span className="ml-1 capitalize">
                              {logic.status}
                            </span>
                          </span>
                          <button
                            onClick={() => setShowVersionHistory(logic.id)}
                            className="text-gray-400 hover:text-gray-600 flex items-center space-x-1"
                          >
                            <History className="w-4 h-4" />
                            <span className="text-xs">v{logic.version}</span>
                          </button>
                        </div>
                        <div className="mt-2 flex items-center space-x-6 text-sm text-gray-600">
                          <span>
                            <strong>Scheme:</strong> {logic.scheme}
                          </span>
                          <span>
                            <strong>Scenario:</strong> {logic.scenario}
                          </span>
                          <span>
                            <strong>Version:</strong> {logic.version}
                          </span>
                          <span>
                            <strong>Submitted by:</strong> {logic.submittedBy}
                          </span>
                          <span>
                            <strong>Date:</strong> {logic.submittedDate}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700">
                          {logic.description}
                        </p>
                      </div>

                      {logic.status === "pending" && (
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleApprove(logic.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center space-x-1"
                          >
                            <Check className="w-4 h-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() =>
                              handleReject(
                                logic.id,
                                "Needs revision based on latest guidelines"
                              )
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center space-x-1"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {logic.rejectionReason && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="font-medium text-red-800">
                            Rejection Reason:
                          </span>
                        </div>
                        <p className="mt-1 text-red-700">
                          {logic.rejectionReason}
                        </p>
                      </div>
                    )}

                    {expandedLogic === logic.id && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">
                              Formula
                            </h4>
                            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm mb-4">
                              {logic.formula}
                            </div>
                            {logic.naturalLanguage && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                  Natural Language
                                </h4>
                                <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                                  {logic.naturalLanguage}
                                </div>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">
                              Factors
                            </h4>
                            <div className="space-y-2">
                              {logic.factors.map((factor, index) => (
                                <div
                                  key={index}
                                  className="bg-gray-50 p-3 rounded-lg"
                                >
                                  <div className="flex justify-between items-start">
                                    <span className="font-medium">
                                      {factor.name}
                                    </span>
                                    <span className="text-blue-600 font-mono">
                                      {factor.value}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {factor.condition}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Version History Modal */}
      {showVersionHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Version History
                </h2>
                <button
                  onClick={() => setShowVersionHistory(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {(() => {
                const logic = calculationLogics.find(
                  (l) => l.id === showVersionHistory
                );
                return logic?.versions?.map((version, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-full ${getStatusColor(
                            version.status
                          )}`}
                        >
                          {getStatusIcon(version.status)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg">
                              Version {version.version}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                version.status
                              )}`}
                            >
                              {version.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Created on {version.createdDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        {version.reviewedDate && (
                          <p>Reviewed on {version.reviewedDate}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Changes Made
                        </h4>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                          {version.changes}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            Created By
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {version.createdBy}
                              </p>
                              <p className="text-xs text-gray-500">
                                {version.createdDate}
                              </p>
                            </div>
                          </div>
                        </div>

                        {version.reviewedBy && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">
                              Reviewed By
                            </h4>
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {version.reviewedBy}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {version.reviewedDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {version.approvalComments && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            {version.status === "approved"
                              ? "Approval Comments"
                              : "Rejection Reason"}
                          </h4>
                          <div
                            className={`p-3 rounded-lg text-sm ${
                              version.status === "approved"
                                ? "bg-green-50 text-green-800 border border-green-200"
                                : "bg-red-50 text-red-800 border border-red-200"
                            }`}
                          >
                            {version.approvalComments}
                          </div>
                        </div>
                      )}

                      {version.status === "pending" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">
                              Awaiting Review
                            </span>
                          </div>
                          <p className="text-sm text-yellow-700 mt-1">
                            This version is currently under review by the
                            actuarial team.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Create New Logic Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Create New Calculation Logic
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Basic Information
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logic Name
                    </label>
                    <input
                      type="text"
                      value={newLogic.name}
                      onChange={(e) =>
                        setNewLogic({ ...newLogic, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 401k Early Retirement - Age 55-60"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pension Scheme
                      </label>
                      <select
                        value={newLogic.scheme}
                        onChange={(e) =>
                          setNewLogic({ ...newLogic, scheme: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Scheme</option>
                        <option value="401(k)">401(k)</option>
                        <option value="Traditional DB">Traditional DB</option>
                        <option value="Hybrid Plan">Hybrid Plan</option>
                        <option value="Cash Balance">Cash Balance</option>
                        <option value="All Schemes">All Schemes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Scenario
                      </label>
                      <input
                        type="text"
                        value={newLogic.scenario}
                        onChange={(e) =>
                          setNewLogic({ ...newLogic, scenario: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Early Retirement + Disability"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newLogic.description}
                      onChange={(e) =>
                        setNewLogic({
                          ...newLogic,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe the purpose and applicability of this calculation logic"
                    />
                  </div>
                </div>

                {/* Test Calculation */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Test Calculation
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        value={newLogic.testInputs.age}
                        onChange={(e) =>
                          setNewLogic({
                            ...newLogic,
                            testInputs: {
                              ...newLogic.testInputs,
                              age: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="55"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Years
                      </label>
                      <input
                        type="number"
                        value={newLogic.testInputs.serviceYears}
                        onChange={(e) =>
                          setNewLogic({
                            ...newLogic,
                            testInputs: {
                              ...newLogic.testInputs,
                              serviceYears: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Base Pension
                      </label>
                      <input
                        type="number"
                        value={newLogic.testInputs.basePension}
                        onChange={(e) =>
                          setNewLogic({
                            ...newLogic,
                            testInputs: {
                              ...newLogic.testInputs,
                              basePension: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="2000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Final Salary
                      </label>
                      <input
                        type="number"
                        value={newLogic.testInputs.finalSalary}
                        onChange={(e) =>
                          setNewLogic({
                            ...newLogic,
                            testInputs: {
                              ...newLogic.testInputs,
                              finalSalary: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="60000"
                      />
                    </div>
                  </div>
                  <button
                    onClick={testLogic}
                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Test Calculation</span>
                  </button>

                  {testResults && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-medium text-green-800 mb-3">
                        Test Results
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-green-700">
                            Monthly Pension:
                          </span>
                          <span className="ml-2 font-mono font-bold">
                            ${testResults.monthlyPension}
                          </span>
                        </div>
                        <div>
                          <span className="text-green-700">
                            Annual Pension:
                          </span>
                          <span className="ml-2 font-mono font-bold">
                            ${testResults.annualPension}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-green-700">
                            Applied Factors:
                          </span>
                          <div className="mt-1 text-xs space-y-1">
                            <div>
                              Service Factor:{" "}
                              {testResults.factors.serviceFactor}
                            </div>
                            <div>
                              Early Retirement Factor:{" "}
                              {testResults.factors.earlyRetirementFactor}
                            </div>
                            <div>
                              Age Reduction: {testResults.factors.ageReduction}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Formula Input */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Calculation Formula
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setUseNLInput(!useNLInput)}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                        useNLInput
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      <span>Natural Language</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-700">
                      <BookOpen className="w-4 h-4" />
                      <span>Formula Builder</span>
                    </button>
                  </div>
                </div>

                {useNLInput ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Natural Language Description
                      </label>
                      <textarea
                        value={newLogic.naturalLanguage}
                        onChange={(e) => {
                          const nl = e.target.value;
                          setNewLogic({
                            ...newLogic,
                            naturalLanguage: nl,
                            formula: convertNaturalLanguage(nl),
                          });
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Calculate pension as base pension multiplied by early retirement factor and service factor, reduced by age penalty"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Generated Formula
                      </label>
                      <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                        {newLogic.formula ||
                          "Formula will appear here as you type..."}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Formula
                    </label>
                    <textarea
                      value={newLogic.formula}
                      onChange={(e) =>
                        setNewLogic({ ...newLogic, formula: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                      placeholder="e.g., Base_Pension * Early_Retirement_Factor * Years_Of_Service_Factor * (1 - Age_Reduction)"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLogic}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Create Logic</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActuaryDashboard;

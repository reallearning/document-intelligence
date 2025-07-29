"use client";
import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  FileText,
  Activity,
  Calendar,
  ChevronRight,
  AlertCircle,
  Building2,
  Zap,
  TrendingUp,
  PlayCircle,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  // Dashboard data with realistic company names and report differentiation
  const dashboardData = {
    systemHealth: {
      status: "healthy",
      totalClients: 5,
      activeReportTypes: 10,
      reportsGeneratedToday: 18,
      validationPassRate: 94.3,
      lastUpdate: "2024-01-25 14:45:00",
    },
    clients: [
      {
        clientId: "STELLAR_CORP",
        clientName: "Stellar Manufacturing Ltd",
        industry: "Manufacturing",
        status: "active",
        contractStart: "2023-01-15",
        totalEmployees: 18456,
        reportTypes: [
          {
            reportType: "Payroll Benefits Full",
            reportCategory: "scheduled",
            fileInterfaceSpec: "STELLAR_PAYROLL_v6.1",
            schedule: "Daily at 8:00 AM",
            lastGenerated: "2024-01-25 08:15:00",
            nextScheduled: "2024-01-26 08:00:00",
            status: "success",
            recordCount: 18456,
            validationScore: 98,
            issues: 0,
            description:
              "Daily full employee benefits and payroll deductions export",
          },
          {
            reportType: "Payroll Changes",
            reportCategory: "triggered",
            fileInterfaceSpec: "STELLAR_PAYROLL_DELTA_v2.1",
            schedule: "Triggered by benefit changes",
            lastGenerated: "2024-01-25 11:30:00",
            nextScheduled: "On demand",
            status: "success",
            recordCount: 47,
            validationScore: 96,
            issues: 1,
            description:
              "Employee benefit changes: new enrollments, terminations, plan modifications",
            trigger: "HR System Benefit Event",
          },
        ],
      },
      {
        clientId: "NEXUS_TECH",
        clientName: "Nexus Technology Solutions",
        industry: "Technology",
        status: "active",
        contractStart: "2022-08-01",
        totalEmployees: 12934,
        reportTypes: [
          {
            reportType: "Benefits Election Import",
            reportCategory: "scheduled",
            fileInterfaceSpec: "NEXUS_ELECTION_v3.1",
            schedule: "Daily at 9:30 AM",
            lastGenerated: "2024-01-25 09:45:00",
            nextScheduled: "2024-01-26 09:30:00",
            status: "failed",
            recordCount: 12721, // Missing 213 employees
            validationScore: 81,
            issues: 7,
            description:
              "Daily employee benefits election status and deduction amounts",
          },
          {
            reportType: "Health Screening Changes",
            reportCategory: "triggered",
            fileInterfaceSpec: "NEXUS_HEALTH_v3.03",
            schedule: "Triggered by enrollment events",
            lastGenerated: "2024-01-25 14:20:00",
            nextScheduled: "On demand",
            status: "warning",
            recordCount: 23,
            validationScore: 89,
            issues: 3,
            description: "Health screening program enrollments and updates",
            trigger: "Benefits Portal Event",
          },
        ],
      },
      {
        clientId: "MERIDIAN_CORP",
        clientName: "Meridian Financial Group",
        industry: "Financial Services",
        status: "active",
        contractStart: "2023-03-01",
        totalEmployees: 9672,
        reportTypes: [
          {
            reportType: "Employee Benefits Export",
            reportCategory: "scheduled",
            fileInterfaceSpec: "MERIDIAN_BENEFITS_v2.9",
            schedule: "Daily at 7:30 AM",
            lastGenerated: "2024-01-25 07:45:00",
            nextScheduled: "2024-01-26 07:30:00",
            status: "success",
            recordCount: 9672,
            validationScore: 95,
            issues: 2,
            description:
              "Daily comprehensive benefits enrollment and premium data",
          },
          {
            reportType: "Provider File Changes",
            reportCategory: "triggered",
            fileInterfaceSpec: "MERIDIAN_PROVIDER_v1.4",
            schedule: "Triggered by plan changes",
            lastGenerated: "2024-01-25 16:00:00",
            nextScheduled: "On demand",
            status: "success",
            recordCount: 34,
            validationScore: 93,
            issues: 1,
            description:
              "Insurance provider file updates for plan modifications",
            trigger: "Benefits Admin System",
          },
        ],
      },
      {
        clientId: "ALPINE_INDUS",
        clientName: "Alpine Industries",
        industry: "Engineering",
        status: "active",
        contractStart: "2022-11-01",
        totalEmployees: 15843,
        reportTypes: [
          {
            reportType: "Payroll Interface Full",
            reportCategory: "scheduled",
            fileInterfaceSpec: "ALPINE_PAYROLL_v3.7",
            schedule: "Daily at 6:30 AM",
            lastGenerated: "2024-01-25 06:45:00",
            nextScheduled: "2024-01-26 06:30:00",
            status: "success",
            recordCount: 15843,
            validationScore: 99,
            issues: 0,
            description:
              "Daily payroll deductions and benefit contributions file",
          },
          {
            reportType: "Benefit Enrollment Changes",
            reportCategory: "triggered",
            fileInterfaceSpec: "ALPINE_ENROLLMENT_v2.2",
            schedule: "Triggered by enrollment events",
            lastGenerated: "2024-01-25 13:15:00",
            nextScheduled: "On demand",
            status: "success",
            recordCount: 89,
            validationScore: 97,
            issues: 1,
            description: "Employee benefit plan enrollments and terminations",
            trigger: "HR Enrollment System",
          },
        ],
      },
      {
        clientId: "COMPASS_RETAIL",
        clientName: "Compass Retail Group",
        industry: "Retail",
        status: "active",
        contractStart: "2023-09-01",
        totalEmployees: 7245,
        reportTypes: [
          {
            reportType: "Benefits Administration",
            reportCategory: "scheduled",
            fileInterfaceSpec: "COMPASS_ADMIN_v1.6",
            schedule: "Daily at 10:00 AM",
            lastGenerated: "2024-01-25 10:15:00",
            nextScheduled: "2024-01-26 10:00:00",
            status: "warning",
            recordCount: 7245,
            validationScore: 87,
            issues: 4,
            description:
              "Daily benefits administration and employee deduction processing",
          },
          {
            reportType: "Open Enrollment Updates",
            reportCategory: "triggered",
            fileInterfaceSpec: "COMPASS_ENROLLMENT_v1.2",
            schedule: "Triggered during enrollment periods",
            lastGenerated: "2024-01-24 09:30:00",
            nextScheduled: "On demand",
            status: "success",
            recordCount: 0,
            validationScore: 100,
            issues: 0,
            description: "Annual open enrollment period benefit elections",
            trigger: "Open Enrollment System",
          },
        ],
      },
    ],
  };

  const StatusBadge = ({ status }) => {
    const config = {
      success: {
        color:
          "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25",
        icon: CheckCircle,
        label: "Success",
      },
      failed: {
        color:
          "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25",
        icon: XCircle,
        label: "Failed",
      },
      warning: {
        color:
          "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25",
        icon: AlertTriangle,
        label: "Warning",
      },
    };

    const { color, icon: Icon, label } = config[status];

    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${color}`}
      >
        <Icon className="w-3 h-3 mr-1.5" />
        {label}
      </span>
    );
  };

  const ReportCategoryBadge = ({ category }) => {
    const config = {
      scheduled: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: RotateCcw,
        label: "Scheduled",
      },
      triggered: {
        color: "bg-purple-100 text-purple-700 border-purple-200",
        icon: Zap,
        label: "Event-Driven",
      },
    };

    const { color, icon: Icon, label } = config[category];

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${color}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </span>
    );
  };

  const HealthIndicator = ({ score }) => {
    const getColorClass = (score) => {
      if (score >= 95) return "text-emerald-600 bg-emerald-50";
      if (score >= 85) return "text-amber-600 bg-amber-50";
      return "text-red-600 bg-red-50";
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-bold ${getColorClass(
          score
        )}`}
      >
        {score}%
      </span>
    );
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOverallClientStatus = (reportTypes) => {
    const hasFailures = reportTypes.some((r) => r.status === "failed");
    const hasWarnings = reportTypes.some((r) => r.status === "warning");

    if (hasFailures) return "failed";
    if (hasWarnings) return "warning";
    return "success";
  };

  const getIndustryIcon = (industry) => {
    const icons = {
      Manufacturing: "🏭",
      Technology: "💻",
      "Financial Services": "🏦",
      Engineering: "⚙️",
      Retail: "🛍️",
    };
    return icons[industry] || "🏢";
  };

  return (
    <div className="h-screen overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Benefits Report Hub
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Enterprise benefits reporting and validation dashboard
              </p>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-500">
                  Last Updated
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDateTime(dashboardData.systemHealth.lastUpdate)}
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="font-semibold">System Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Consolidated System Health Overview - Single Row */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-12 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">System Overview</h3>
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.systemHealth.totalClients}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    Active Clients
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.systemHealth.activeReportTypes}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    Report Types
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.systemHealth.reportsGeneratedToday}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    Reports Today
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.systemHealth.validationPassRate}%
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    Success Rate
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {dashboardData.clients.reduce(
                      (acc, client) =>
                        acc +
                        client.reportTypes.filter(
                          (r) => r.reportCategory === "triggered"
                        ).length,
                      0
                    )}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    Event-Driven
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Client Reports Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">
              Client Report Status
            </h2>
            <div className="flex items-center space-x-4">
              <ReportCategoryBadge category="scheduled" />
              <ReportCategoryBadge category="triggered" />
            </div>
          </div>

          {dashboardData.clients.map((client) => (
            <Link key={client.clientId} href={"/stellar/client-dashboard"}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer mb-8">
                {/* Enhanced Client Header */}
                <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="text-4xl">
                        {getIndustryIcon(client.industry)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {client.clientName}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-gray-600 font-medium">
                            {client.industry}
                          </p>
                          <span className="text-gray-400">•</span>
                          <p className="text-sm text-gray-600">
                            {client.totalEmployees.toLocaleString()} employees
                          </p>
                          <span className="text-gray-400">•</span>
                          <p className="text-sm text-gray-600">
                            Active since{" "}
                            {new Date(
                              client.contractStart
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <StatusBadge
                        status={getOverallClientStatus(client.reportTypes)}
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Client ID
                      </div>
                      <div className="font-mono text-lg font-bold text-gray-900">
                        {client.clientId}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Report Types with Category Differentiation */}
                <div className="p-8">
                  <div className="space-y-6">
                    {client.reportTypes.map((report, index) => (
                      <div
                        key={index}
                        className="group flex items-center justify-between p-6 border-2 border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
                      >
                        {/* Report Type Info */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <h4 className="text-lg font-bold text-gray-900">
                                {report.reportType}
                              </h4>
                              <ReportCategoryBadge
                                category={report.reportCategory}
                              />
                            </div>
                            <StatusBadge status={report.status} />
                          </div>

                          <p className="text-sm text-gray-600 italic">
                            {report.description}
                          </p>

                          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                {report.reportCategory === "scheduled"
                                  ? "Schedule"
                                  : "Trigger"}
                              </div>
                              <div className="text-sm font-semibold text-gray-900">
                                {report.schedule}
                              </div>
                              {report.trigger && (
                                <div className="text-xs text-purple-600 font-medium mt-1">
                                  Source: {report.trigger}
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Last Generated
                              </div>
                              <div className="text-sm font-semibold text-gray-900">
                                {formatDateTime(report.lastGenerated)}
                              </div>
                            </div>

                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Records / Score
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-bold text-gray-900">
                                  {report.recordCount.toLocaleString()}
                                </span>
                                <HealthIndicator
                                  score={report.validationScore}
                                />
                              </div>
                            </div>

                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                File Interface Spec
                              </div>
                              <div className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded inline-block">
                                {report.fileInterfaceSpec}
                              </div>
                              {report.issues > 0 && (
                                <div className="flex items-center mt-2">
                                  <AlertCircle className="w-4 h-4 text-amber-500 mr-1" />
                                  <span className="text-xs font-semibold text-amber-600">
                                    {report.issues} issue
                                    {report.issues > 1 ? "s" : ""}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Action Button */}
                        <button className="ml-6 p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 group-hover:bg-blue-200">
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Next Scheduled */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                        <span className="font-medium">
                          Next scheduled report:{" "}
                        </span>
                        <span className="font-bold text-gray-900 ml-2">
                          {formatDateTime(
                            Math.min(
                              ...client.reportTypes
                                .filter((r) => r.reportCategory === "scheduled")
                                .map((r) => new Date(r.nextScheduled))
                            )
                          )}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {
                          client.reportTypes.filter(
                            (r) => r.reportCategory === "scheduled"
                          ).length
                        }{" "}
                        scheduled •{" "}
                        {
                          client.reportTypes.filter(
                            (r) => r.reportCategory === "triggered"
                          ).length
                        }{" "}
                        event-driven
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

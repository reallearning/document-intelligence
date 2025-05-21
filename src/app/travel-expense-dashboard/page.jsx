"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  AlertTriangle,
  Search,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Filter,
  Download,
  Eye,
  ChevronsRight,
  ExternalLink,
  Calendar,
  Check,
  X,
} from "lucide-react";
import BookingPatternPopup from "./travel-insight-popup";

// Sample data
const travelExpenseData = [
  {
    id: 1,
    employee: "Rahul Sharma",
    team: "Coverage Team A",
    destination: "Mumbai",
    purpose: "Client Meeting",
    departure: "2025-05-10",
    return: "2025-05-12",
    amount: 45600,
    status: "Approved",
    policyStatus: "Compliant",
  },
  {
    id: 2,
    employee: "Priya Singh",
    team: "Coverage Team A",
    destination: "Delhi",
    purpose: "Conference",
    departure: "2025-05-05",
    return: "2025-05-08",
    amount: 62300,
    status: "Approved",
    policyStatus: "Non-Compliant",
  },
  {
    id: 3,
    employee: "Amit Patel",
    team: "Coverage Team B",
    destination: "Bangalore",
    purpose: "Training",
    departure: "2025-05-15",
    return: "2025-05-18",
    amount: 38900,
    status: "Pending",
    policyStatus: "Compliant",
  },
  {
    id: 4,
    employee: "Sneha Reddy",
    team: "Finance",
    destination: "Chennai",
    purpose: "Audit",
    departure: "2025-05-07",
    return: "2025-05-09",
    amount: 32400,
    status: "Approved",
    policyStatus: "Compliant",
  },
  {
    id: 5,
    employee: "Vikram Malhotra",
    team: "Coverage Team A",
    destination: "Hyderabad",
    purpose: "Client Meeting",
    departure: "2025-05-18",
    return: "2025-05-20",
    amount: 41200,
    status: "Approved",
    policyStatus: "Non-Compliant",
  },
  {
    id: 6,
    employee: "Divya Joshi",
    team: "Operations",
    destination: "Kolkata",
    purpose: "Branch Visit",
    departure: "2025-05-12",
    return: "2025-05-14",
    amount: 37800,
    status: "Approved",
    policyStatus: "Compliant",
  },
  {
    id: 7,
    employee: "Rajesh Kumar",
    team: "Coverage Team B",
    destination: "Pune",
    purpose: "Client Meeting",
    departure: "2025-05-08",
    return: "2025-05-10",
    amount: 29600,
    status: "Rejected",
    policyStatus: "Non-Compliant",
  },
  {
    id: 8,
    employee: "Ananya Gupta",
    team: "Finance",
    destination: "Mumbai",
    purpose: "Training",
    departure: "2025-05-20",
    return: "2025-05-22",
    amount: 36500,
    status: "Pending",
    policyStatus: "Compliant",
  },
];

const policyViolations = [
  { type: "Hotel rate exceeds allowance", count: 12, impact: 124000 },
  { type: "Flight booked <14 days in advance", count: 28, impact: 236000 },
  { type: "Meal expenses over daily limit", count: 8, impact: 32000 },
  { type: "Non-approved travel class", count: 5, impact: 105000 },
];

const ExpenseDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  const [openPopup, setOpenPopup] = useState(false);

  const closePopup = () => {
    setOpenPopup(false);
  };

  const filteredData = travelExpenseData.filter((item) => {
    // Filter by status
    if (activeFilter !== "all" && item.policyStatus !== activeFilter) {
      return false;
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      return (
        item.employee.toLowerCase().includes(term) ||
        item.team.toLowerCase().includes(term) ||
        item.destination.toLowerCase().includes(term) ||
        item.purpose.toLowerCase().includes(term)
      );
    }

    return true;
  });

  const toggleRowExpand = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white border-b">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">Axis Capital</h1>
          <span className="mx-3 text-gray-400">|</span>
          <h2 className="text-lg font-medium text-gray-600">
            Travel Expense Analytics & Policy Compliance
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-4 py-1 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              AC
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {/* AI Insights Section */}
        <div className="mb-8">
          <div className="flex items-center mb-5">
            <Zap className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">
              AI Assistant Insights
            </h2>
          </div>

          <div className="space-y-5">
            {/* Greeting Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100/50 shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                Hello there! I've analyzed your travel expense data and found
                some opportunities worth your attention. Here's what I
                discovered:
              </p>
            </div>

            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center mr-4 border border-red-100">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-red-500 mb-1">
                      High Priority
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      I've noticed a booking pattern issue
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-5 pl-14">
                I found that 28 flights were booked less than 14 days before
                travel dates last month. This late booking has cost you an extra
                ₹236,000 that could have been avoided with earlier planning.
              </p>

              <div className="flex justify-between items-center pl-14">
                <div className="flex items-center text-gray-500">
                  <ArrowUpRight className="h-4 w-4 mr-1 text-red-500" />
                  <span className="text-sm">
                    This affects 68% of all your bookings
                  </span>
                </div>
                <button
                  onClick={() => setOpenPopup(true)}
                  className="text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 flex items-center text-sm font-medium transition-colors duration-150"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center mr-4 border border-orange-100">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-orange-500 mb-1">
                      Medium Priority
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Coverage Team A needs attention
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-5 pl-14">
                I've been tracking Coverage Team A's expenses, and they're
                consistently booking hotels that exceed your policy limits by
                22%. This has resulted in an excess spend of ₹124,000 in Q2
                alone.
              </p>

              <div className="flex justify-between items-center pl-14">
                <div className="flex items-center text-gray-500">
                  <ArrowUpRight className="h-4 w-4 mr-1 text-orange-500" />
                  <span className="text-sm">
                    They account for 42% of your total spend
                  </span>
                </div>
                <button className="text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 flex items-center text-sm font-medium transition-colors duration-150">
                  View Details
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-4 border border-blue-100">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-blue-500 mb-1">
                      Planning Opportunity
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      I've spotted a quarterly spending trend
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-5 pl-14">
                Looking at your historical data, I can see that international
                travel expenses consistently spike in the last month of each
                quarter. These end-of-quarter trips cost about 31% more than
                mid-quarter travel. Maybe we can spread these out better?
              </p>

              <div className="flex justify-between items-center pl-14">
                <div className="flex items-center text-gray-500">
                  <span className="text-sm">
                    This is a consistent pattern worth addressing
                  </span>
                </div>
                <button className="text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 flex items-center text-sm font-medium transition-colors duration-150">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">MTD Spend</h3>
            <p className="text-xl font-bold mt-1">₹1,675,000</p>
            <div className="text-xs text-red-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              12.3% vs Budget
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">YTD Spend</h3>
            <p className="text-xl font-bold mt-1">₹6,984,200</p>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              3.2% vs Budget
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">
              Policy Compliance
            </h3>
            <p className="text-xl font-bold mt-1">86%</p>
            <div className="text-xs text-red-500 flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              2.0% vs Last Month
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">
              Avg. Trip Cost
            </h3>
            <p className="text-xl font-bold mt-1">₹42,380</p>
            <div className="text-xs text-red-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              8.7% vs Last Month
            </div>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="bg-white border rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-700">
              Travel Expense Transactions
            </h3>
            <div className="flex space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeFilter === "all"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                  onClick={() => setActiveFilter("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeFilter === "Compliant"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                  onClick={() => setActiveFilter("Compliant")}
                >
                  Compliant
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeFilter === "Non-Compliant"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                  onClick={() => setActiveFilter("Non-Compliant")}
                >
                  Non-Compliant
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-9 pr-4 py-1 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
              </div>

              <button className="flex items-center text-sm text-gray-600 px-3 py-1 rounded border border-gray-200 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </button>

              <button className="flex items-center text-sm text-gray-600 px-3 py-1 rounded border border-gray-200 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Employee
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Team
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Destination
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Purpose
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Travel Dates
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Policy
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <React.Fragment key={item.id}>
                    <tr
                      className={`${
                        expandedRow === item.id ? "bg-blue-50" : ""
                      } hover:bg-gray-50 cursor-pointer`}
                      onClick={() => toggleRowExpand(item.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.employee}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.team}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.purpose}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                          {new Date(item.departure).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short" }
                          )}{" "}
                          -{" "}
                          {new Date(item.return).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{item.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            item.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`flex items-center text-xs font-medium
                          ${
                            item.policyStatus === "Compliant"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.policyStatus === "Compliant" ? (
                            <Check className="h-4 w-4 mr-1" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 mr-1" />
                          )}
                          {item.policyStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Row Details */}
                    {expandedRow === item.id && (
                      <tr className="bg-blue-50">
                        <td colSpan="9" className="px-6 py-4">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Expense Breakdown
                              </h4>
                              <div className="bg-white p-3 rounded border">
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                      Flight
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">
                                      ₹
                                      {Math.round(
                                        item.amount * 0.45
                                      ).toLocaleString("en-IN")}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                      Hotel
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">
                                      ₹
                                      {Math.round(
                                        item.amount * 0.35
                                      ).toLocaleString("en-IN")}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                      Meals
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">
                                      ₹
                                      {Math.round(
                                        item.amount * 0.12
                                      ).toLocaleString("en-IN")}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                      Transport
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">
                                      ₹
                                      {Math.round(
                                        item.amount * 0.08
                                      ).toLocaleString("en-IN")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {item.policyStatus === "Non-Compliant" ? (
                              <div>
                                <h4 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                                  <AlertTriangle className="h-4 w-4 mr-1" />
                                  Policy Violations
                                </h4>
                                <div className="bg-red-50 p-3 rounded border border-red-100">
                                  <div className="space-y-2">
                                    {item.id === 2 && (
                                      <div className="flex justify-between items-center">
                                        <span className="text-sm text-red-600">
                                          Flight booked 4 days in advance
                                          (policy: 14+ days)
                                        </span>
                                        <span className="text-sm font-medium text-red-700">
                                          +₹12,400
                                        </span>
                                      </div>
                                    )}
                                    {item.id === 5 && (
                                      <div className="flex justify-between items-center">
                                        <span className="text-sm text-red-600">
                                          Hotel rate exceeds policy by 35%
                                        </span>
                                        <span className="text-sm font-medium text-red-700">
                                          +₹8,600
                                        </span>
                                      </div>
                                    )}
                                    {item.id === 7 && (
                                      <div className="flex justify-between items-center">
                                        <span className="text-sm text-red-600">
                                          Business class flight (policy:
                                          Economy)
                                        </span>
                                        <span className="text-sm font-medium text-red-700">
                                          +₹15,200
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="mt-3">
                                    <button className="text-xs text-red-600 bg-white px-2 py-1 rounded border border-red-200 hover:bg-red-50">
                                      View Exception Report
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                                  <Check className="h-4 w-4 mr-1" />
                                  Policy Compliance
                                </h4>
                                <div className="bg-green-50 p-3 rounded border border-green-100">
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <Check className="h-3 w-3 text-green-500 mr-2" />
                                      <span className="text-sm text-green-600">
                                        All expense items comply with company
                                        policy
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <Check className="h-3 w-3 text-green-500 mr-2" />
                                      <span className="text-sm text-green-600">
                                        Booking windows meet advance purchase
                                        requirements
                                      </span>
                                    </div>
                                    <div className="flex items-center">
                                      <Check className="h-3 w-3 text-green-500 mr-2" />
                                      <span className="text-sm text-green-600">
                                        All receipts properly submitted and
                                        verified
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{filteredData.length}</span> of{" "}
                <span className="font-medium">{travelExpenseData.length}</span>{" "}
                transactions
              </span>
              <div className="flex space-x-1">
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                  1
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Violation Summary */}
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Policy Violation Summary
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Violation Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Count
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Financial Impact
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trend
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {policyViolations.map((violation, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-900">
                          {violation.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {violation.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                      ₹{violation.impact.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {index === 0 && (
                        <span className="text-red-500 flex items-center text-sm">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          12% vs Last Month
                        </span>
                      )}
                      {index === 1 && (
                        <span className="text-red-500 flex items-center text-sm">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          8% vs Last Month
                        </span>
                      )}
                      {index === 2 && (
                        <span className="text-green-500 flex items-center text-sm">
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                          3% vs Last Month
                        </span>
                      )}
                      {index === 3 && (
                        <span className="text-gray-500 flex items-center text-sm">
                          No change
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <ChevronsRight className="h-4 w-4 mr-1" />
                        Drill Down
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openPopup && (
        <BookingPatternPopup isOpen={openPopup} onClose={closePopup} />
      )}
    </div>
  );
};

export default ExpenseDashboard;

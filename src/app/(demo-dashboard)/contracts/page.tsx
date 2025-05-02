"use client";
import React, { useState } from "react";
import {
  Bell,
  Search,
  FileText,
  AlertTriangle,
  Clock,
  DollarSign,
  Brain,
  Zap,
  Filter,
  Database,
  GitMerge,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const router = useRouter();

  const handleViewData = () => {
    router.push("contracts/detail");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">
              Questt AI
            </h1>
            <nav className="ml-10">
              <ul className="flex space-x-6">
                <li className="font-medium text-cyan-600 border-b-2 border-cyan-500 pb-1">
                  Contracts
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-600 text-xs text-white flex items-center justify-center">
                5
              </span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center justify-center">
              <span className="font-medium">JD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        {/* Page Title and Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Contract Management
          </h2>
          <div className="flex space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contracts..."
                className="pl-10 pr-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-md w-64 focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* AI Focus Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="flex items-center mb-5">
            <div className="p-3 rounded-full bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-600 mr-3">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-cyan-700">
              Hey there! Here's what I think you should look at today
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-5 rounded-lg border-l-4 border-red-500 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-800">
                    I've found some compliance issues you might want to check
                  </h4>
                  <p className="text-sm text-gray-700 mt-2">
                    I noticed 3 contracts with data protection clauses that
                    don't align with the latest regulatory requirements.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs font-medium bg-white text-red-600 px-2 py-1 rounded shadow-sm flex items-center">
                      <GitMerge className="h-3 w-3 mr-1 opacity-70" /> DataTech
                      Solutions
                    </span>
                    <span className="text-xs font-medium bg-white text-red-600 px-2 py-1 rounded shadow-sm flex items-center">
                      <GitMerge className="h-3 w-3 mr-1 opacity-70" /> GlobeTech
                      Systems
                    </span>
                    <span className="text-xs font-medium bg-white text-red-600 px-2 py-1 rounded shadow-sm flex items-center">
                      <GitMerge className="h-3 w-3 mr-1 opacity-70" /> FirstData
                      Inc.
                    </span>
                  </div>
                  <button className="mt-4 text-sm text-red-600 font-medium flex items-center hover:text-red-700 transition-colors">
                    Review Now <Zap className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-500 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-800">
                    Let's get ahead of these renewals coming up
                  </h4>
                  <p className="text-sm text-gray-700 mt-2">
                    You have 4 contracts expiring within the week. My analysis
                    shows potential for cost savings if renewed early.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs font-medium bg-white text-amber-600 px-2 py-1 rounded shadow-sm flex items-center">
                      <Database className="h-3 w-3 mr-1 opacity-70" /> Office
                      Lease
                    </span>
                    <span className="text-xs font-medium bg-white text-amber-600 px-2 py-1 rounded shadow-sm flex items-center">
                      <Database className="h-3 w-3 mr-1 opacity-70" /> Microsoft
                      SaaS
                    </span>
                    <span className="text-xs font-medium bg-white text-amber-600 px-2 py-1 rounded shadow-sm flex items-center">
                      <Database className="h-3 w-3 mr-1 opacity-70" /> 2 more...
                    </span>
                  </div>
                  <button className="mt-4 text-sm text-amber-600 font-medium flex items-center hover:text-amber-700 transition-colors">
                    Schedule Renewals <Zap className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-cyan-50 p-5 rounded-lg border-l-4 border-cyan-500 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start">
                <DollarSign className="h-5 w-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-cyan-800">
                    Time to recognize some revenue
                  </h4>
                  <p className="text-sm text-gray-700 mt-2">
                    I've identified 7 contracts with revenue triggers this
                    month. That's $1.2M that can be recognized.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs font-medium bg-white text-cyan-600 px-2 py-1 rounded shadow-sm flex items-center">
                      <Database className="h-3 w-3 mr-1 opacity-70" /> CloudSys
                      Tech
                    </span>
                    <span className="text-xs font-medium bg-white text-cyan-600 px-2 py-1 rounded shadow-sm flex items-center">
                      <Database className="h-3 w-3 mr-1 opacity-70" /> Acme Corp
                    </span>
                    <span className="text-xs font-medium bg-white text-cyan-600 px-2 py-1 rounded shadow-sm flex items-center">
                      <Database className="h-3 w-3 mr-1 opacity-70" /> 5 more...
                    </span>
                  </div>
                  <button className="mt-4 text-sm text-cyan-600 font-medium flex items-center hover:text-cyan-700 transition-colors">
                    Generate Recognition Reports{" "}
                    <Zap className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Table */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Contract Database</h3>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeTab === "all"
                        ? "bg-cyan-100 text-cyan-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("all")}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeTab === "active"
                        ? "bg-cyan-100 text-cyan-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("active")}
                  >
                    Active
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      activeTab === "attention"
                        ? "bg-cyan-100 text-cyan-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("attention")}
                  >
                    Needs Attention
                  </button>
                </div>
                <button className="text-sm text-gray-600 flex items-center hover:text-cyan-600 transition-colors">
                  <Filter className="mr-1 h-4 w-4" /> Filter
                </button>
                <button className="text-sm text-gray-600 hover:text-cyan-600 transition-colors">
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Party
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-cyan-500 mr-2" />
                      <span className="text-sm font-medium text-gray-800">
                        Enterprise SaaS Agreement
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    Microsoft Corporation
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Database className="h-3 w-3 text-purple-500 mr-1.5" />
                      <span className="text-xs text-gray-500">DocuSign</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    $245,000
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    Jan 15, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    Jan 14, 2026
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-3/12 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">Low</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={handleViewData}
                      className="text-cyan-600 hover:text-cyan-800 mr-3 transition-colors"
                    >
                      View
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      Edit
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 bg-red-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm font-medium text-red-800">
                        Data Processing Agreement
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    DataTech Solutions
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <GitMerge className="h-3 w-3 text-purple-500 mr-1.5" />
                      <span className="text-xs text-gray-500">Salesforce</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    $87,500
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    Mar 05, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    Mar 04, 2026
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Compliance Risk
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-10/12 bg-gradient-to-r from-red-400 to-red-500 rounded-full"></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">High</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={handleViewData}
                      className="text-cyan-600 hover:text-cyan-800 mr-3 transition-colors"
                    >
                      View
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      Edit
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 bg-amber-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm font-medium text-amber-800">
                        Office Lease Agreement
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    Westpark Properties
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Database className="h-3 w-3 text-purple-500 mr-1.5" />
                      <span className="text-xs text-gray-500">
                        Google Drive
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    $180,000/year
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    Jun 01, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    May 31, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Renewal Due
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-6/12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">Medium</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button  onClick={handleViewData} className="text-cyan-600 hover:text-cyan-800 mr-3 transition-colors">
                      View
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      Edit
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-cyan-500 mr-2" />
                      <span className="text-sm font-medium text-gray-800">
                        Marketing Agency SOW
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    Creative Partners Inc.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <GitMerge className="h-3 w-3 text-purple-500 mr-1.5" />
                      <span className="text-xs text-gray-500">Docusign</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    $125,000
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    May 01, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    Oct 31, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      New
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-1.5 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-2/12 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">Low</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button  onClick={handleViewData} className="text-cyan-600 hover:text-cyan-800 mr-3 transition-colors">
                      View
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium text-cyan-600">1</span>{" "}
                  to <span className="font-medium text-cyan-600">10</span> of{" "}
                  <span className="font-medium text-cyan-600">368</span>{" "}
                  contracts
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    <span className="sr-only">Previous</span>
                    Previous
                  </button>
                  <button className="bg-cyan-50 border-cyan-500 z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium text-cyan-600">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500">
                    ...
                  </span>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    37
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                    <span className="sr-only">Next</span>
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

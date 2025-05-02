"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle,
  X,
  Search,
  ZoomIn,
  ZoomOut,
  Eye,
  Calendar,
  DollarSign,
  Users,
  FileCheck,
  Shield,
  GitMerge,
  Database,
  Info,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ContractDetailView = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [expandedSections, setExpandedSections] = useState({
    keyInfo: true,
    extractedClauses: true,
    validationResults: true,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const increaseZoom = () => {
    if (zoomLevel < 200) setZoomLevel(zoomLevel + 10);
  };

  const decreaseZoom = () => {
    if (zoomLevel > 50) setZoomLevel(zoomLevel - 10);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button className="mr-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            {/* <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">
              Questt AI
            </h1> */}
            <div className="ml-6 flex items-center">
              <span className="text-gray-500">/</span>
              <span className="ml-2 text-gray-600 font-medium">
                Contract Management
              </span>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-800 font-medium">
                Data Processing Agreement - DataTech Solutions
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center">
              <FileCheck className="mr-1.5 h-4 w-4" />
              Update Status
            </button>
            <button className="px-3 py-1.5 bg-cyan-600 text-white rounded-md text-sm hover:bg-cyan-700 transition-colors">
              Edit Contract
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left Panel - Contract Fields & Validation */}
        <div className="w-1/3 overflow-auto border-r border-gray-200 bg-white">
          {/* AI Assistant Section */}
          <div className="p-4 bg-gradient-to-r from-cyan-50 to-purple-50 border-b border-gray-200">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-white shadow-sm mr-3">
                <FileText className="h-5 w-5 text-cyan-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-cyan-700">
                    I've analyzed this contract
                  </span>{" "}
                  and found 3 compliance issues that need attention. The data
                  protection clauses on pages 4, 7, and 12 don't align with
                  current regulations.
                </p>
              </div>
            </div>
          </div>

          {/* Key Contract Information */}
          <div className="border-b border-gray-200">
            <div
              className="px-4 py-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100"
              onClick={() => toggleSection("keyInfo")}
            >
              <h3 className="font-medium text-gray-800">
                Key Contract Information
              </h3>
              {expandedSections.keyInfo ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>

            {expandedSections.keyInfo && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Contract Name</div>
                    <div className="text-sm font-medium text-gray-800">
                      Data Processing Agreement
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Source</div>
                    <div className="text-sm flex items-center">
                      <GitMerge className="h-3 w-3 text-purple-500 mr-1.5" />
                      <span className="text-gray-800">Salesforce</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Counterparty</div>
                    <div className="text-sm font-medium text-gray-800">
                      DataTech Solutions
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Contract Value</div>
                    <div className="text-sm font-medium text-gray-800">
                      $87,500
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Start Date</div>
                    <div className="text-sm font-medium text-gray-800">
                      March 5, 2025
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">End Date</div>
                    <div className="text-sm font-medium text-gray-800">
                      March 4, 2026
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Contract Owner</div>
                    <div className="text-sm font-medium text-gray-800">
                      Sarah Chen (Legal)
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Status</div>
                    <div className="text-sm font-medium">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                        Compliance Risk
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Risk Assessment</div>
                  <div className="flex items-center">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-10/12 bg-gradient-to-r from-red-400 to-red-500 rounded-full"></div>
                    </div>
                    <span className="ml-2 text-xs font-medium text-red-600">
                      High
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Extracted Clauses */}
          <div className="border-b border-gray-200">
            <div
              className="px-4 py-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100"
              onClick={() => toggleSection("extractedClauses")}
            >
              <h3 className="font-medium text-gray-800">Extracted Clauses</h3>
              {expandedSections.extractedClauses ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>

            {expandedSections.extractedClauses && (
              <div className="p-4 space-y-6">
                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium text-gray-800">
                      Data Protection Clause
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-xs text-red-600">High Risk</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200">
                    "5.1 The Processor shall implement appropriate technical and
                    organizational measures to ensure a level of security
                    appropriate to the risk, including, as appropriate: (a) the
                    pseudonymization and encryption of Personal Data; (b) the
                    ability to ensure the ongoing confidentiality, integrity,
                    availability and resilience of processing systems and
                    services; (c) the ability to restore the availability and
                    access to Personal Data in a timely manner in the event of a
                    physical or technical incident; (d) a process for regularly
                    testing, assessing and evaluating the effectiveness of
                    technical and organizational measures for ensuring the
                    security of the processing."
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">Page 4</span>
                    <button className="ml-2 text-xs text-cyan-600 hover:text-cyan-700">
                      View in Document
                    </button>
                  </div>

                  <div className="mt-2 bg-red-50 border border-red-200 rounded-md p-3">
                    <div className="flex">
                      <Shield className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <div className="ml-2">
                        <p className="text-xs font-medium text-red-800">
                          Validation Rule:
                        </p>
                        <p className="text-xs text-red-700">
                          GDPR Article 32 requires specific measures to be
                          listed with detailed implementation plans. This clause
                          uses general language without specifying the actual
                          security controls being implemented.
                        </p>
                        <p className="text-xs text-red-700 mt-1">
                          <span className="font-medium">Recommendation:</span>{" "}
                          Add an appendix detailing specific security measures
                          including encryption standards, access controls, and
                          audit procedures.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium text-gray-800">
                      Breach Notification
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-xs text-red-600">High Risk</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200">
                    "7.2 In case of a Personal Data Breach, the Processor shall
                    notify the Controller without undue delay after becoming
                    aware of a Personal Data Breach. Such notification shall at
                    least: (a) describe the nature of the personal data breach
                    including where possible, the categories and approximate
                    number of data subjects concerned and the categories and
                    approximate number of personal data records concerned; (b)
                    communicate the name and contact details of the data
                    protection officer or other contact point where more
                    information can be obtained; (c) describe the likely
                    consequences of the personal data breach; (d) describe the
                    measures taken or proposed to be taken by the controller to
                    address the personal data breach."
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">Page 7</span>
                    <button className="ml-2 text-xs text-cyan-600 hover:text-cyan-700">
                      View in Document
                    </button>
                  </div>

                  <div className="mt-2 bg-red-50 border border-red-200 rounded-md p-3">
                    <div className="flex">
                      <Shield className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <div className="ml-2">
                        <p className="text-xs font-medium text-red-800">
                          Validation Rule:
                        </p>
                        <p className="text-xs text-red-700">
                          GDPR Article 33 requires notification of personal data
                          breaches to the supervisory authority within 72 hours.
                          The phrase "without undue delay" is insufficient.
                        </p>
                        <p className="text-xs text-red-700 mt-1">
                          <span className="font-medium">Recommendation:</span>{" "}
                          Amend to "The Processor shall notify the Controller
                          within 24 hours of becoming aware of a Personal Data
                          Breach, and in any event no later than 48 hours."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium text-gray-800">
                      International Data Transfer
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-xs text-red-600">High Risk</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200">
                    "9.1 Transfer of personal data to third countries or
                    international organizations shall only take place if the
                    conditions laid down in Chapter V of the GDPR are met. 9.2
                    Any transfer of Personal Data to a third country or an
                    international organization shall take place only if the
                    Controller has provided appropriate documentation of
                    compliance with Chapter V of the GDPR."
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">Page 12</span>
                    <button className="ml-2 text-xs text-cyan-600 hover:text-cyan-700">
                      View in Document
                    </button>
                  </div>

                  <div className="mt-2 bg-red-50 border border-red-200 rounded-md p-3">
                    <div className="flex">
                      <Shield className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <div className="ml-2">
                        <p className="text-xs font-medium text-red-800">
                          Validation Rule:
                        </p>
                        <p className="text-xs text-red-700">
                          Following the Schrems II decision and new Standard
                          Contractual Clauses (SCCs), specific transfer
                          mechanisms must be explicitly identified and
                          supplementary measures documented.
                        </p>
                        <p className="text-xs text-red-700 mt-1">
                          <span className="font-medium">Recommendation:</span>{" "}
                          Add specific reference to the use of 2021 SCCs and
                          include the Transfer Impact Assessment (TIA) as an
                          appendix to the agreement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-gray-200">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium text-gray-800">
                      Termination Clause
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">Valid</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200">
                    "17.1 This Agreement shall commence on the Effective Date
                    and shall continue in force until terminated in accordance
                    with this Section. 17.2 This Agreement may be terminated by
                    either Party with 30 days written notice to the other Party.
                    17.3 Upon termination of this Agreement for any reason, the
                    Processor shall, at the choice of the Controller, delete or
                    return all Personal Data to the Controller, and delete all
                    existing copies unless applicable law requires storage of
                    the Personal Data."
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">Page 15</span>
                    <button className="ml-2 text-xs text-cyan-600 hover:text-cyan-700">
                      View in Document
                    </button>
                  </div>

                  <div className="mt-2 bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="flex">
                      <Shield className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <div className="ml-2">
                        <p className="text-xs font-medium text-green-800">
                          Validation Rule:
                        </p>
                        <p className="text-xs text-green-700">
                          GDPR Article 28(3)(g) requires processors to delete or
                          return all personal data after the end of services.
                          Company policy requires a minimum 30-day notice
                          period.
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                          <span className="font-medium">Assessment:</span> This
                          clause meets both regulatory requirements and company
                          policy standards.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pb-4">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium text-gray-800">
                      Payment Terms
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-xs text-amber-600">Attention</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200">
                    "12.1 All fees and charges payable under the Main Agreement
                    shall remain in full force and effect. 12.2 The Controller
                    shall pay all undisputed invoices in full within thirty (30)
                    days of the date of the invoice. 12.3 All amounts payable
                    under this Agreement are exclusive of VAT or any other
                    applicable tax which shall be payable by the Controller at
                    the rate and in the manner from time to time prescribed by
                    law."
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">Page 8</span>
                    <button className="ml-2 text-xs text-cyan-600 hover:text-cyan-700">
                      View in Document
                    </button>
                  </div>

                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded-md p-3">
                    <div className="flex">
                      <Shield className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      <div className="ml-2">
                        <p className="text-xs font-medium text-amber-800">
                          Validation Rule:
                        </p>
                        <p className="text-xs text-amber-700">
                          Company Policy FIN-2023-06 states that contracts
                          valued over $50,000 should have payment terms of 45
                          days or more to optimize cash flow.
                        </p>
                        <p className="text-xs text-amber-700 mt-1">
                          <span className="font-medium">Recommendation:</span>{" "}
                          Consider negotiating extension of payment terms to 45
                          days for this contract ($87,500).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Validation Results */}
          <div className="border-b border-gray-200">
            <div
              className="px-4 py-3 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100"
              onClick={() => toggleSection("validationResults")}
            >
              <h3 className="font-medium text-gray-800">
                Validation Results Summary
              </h3>
              {expandedSections.validationResults ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>

            {expandedSections.validationResults && (
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-red-100 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        3 Compliance Issues
                      </p>
                      <p className="text-xs text-gray-500">
                        Issues requiring immediate attention
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-red-600">
                    High Risk
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-amber-100 text-amber-600">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        1 Business Rule Flag
                      </p>
                      <p className="text-xs text-gray-500">
                        Clauses that need review for business policy
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-amber-600">
                    Medium Risk
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        11 Valid Clauses
                      </p>
                      <p className="text-xs text-gray-500">
                        Clauses that meet all requirements
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    Validated
                  </span>
                </div>

                <div className="mt-2 flex items-center">
                  <Shield className="h-4 w-4 text-cyan-500 mr-2" />
                  <span className="text-sm text-cyan-700">
                    Validation powered by Questt AI legal compliance engine
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Document Viewer */}
        <div className="flex-1 flex flex-col">
          {/* Document Toolbar */}
          <div className="p-3 border-b border-gray-200 bg-white flex items-center justify-between">
            <div className="flex items-center">
              <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                <Search className="h-4 w-4 text-gray-500" />
              </button>
              <div className="mx-2 h-5 border-l border-gray-300"></div>
              <button
                className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                onClick={decreaseZoom}
              >
                <ZoomOut className="h-4 w-4 text-gray-500" />
              </button>
              <span className="mx-2 text-sm text-gray-600">{zoomLevel}%</span>
              <button
                className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                onClick={increaseZoom}
              >
                <ZoomIn className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            <div className="text-sm text-gray-500">Page 1 of 16</div>

            <div className="flex items-center">
              <button className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
                <FileCheck className="mr-1.5 h-4 w-4" />
                Download
              </button>
            </div>
          </div>

          {/* Document Content */}
          <div className="flex-1 overflow-auto bg-gray-100 p-6 flex justify-center">
            <div
              className="bg-white shadow-md rounded-md p-8 w-[21cm] mx-auto transition-all"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "top center",
              }}
            >
              {/* Mock Document Content - Full Contract */}
              <div className="space-y-8">
                {/* Page 1 */}
                <div className="text-center mb-10">
                  <h1 className="text-2xl font-bold text-gray-800">
                    DATA PROCESSING AGREEMENT
                  </h1>
                  <div className="mt-4 text-sm text-gray-600">Between</div>
                  <div className="mt-2">
                    <p className="font-medium text-gray-800">
                      NEXUS GLOBAL SOLUTIONS, INC.
                    </p>
                    <p className="text-sm text-gray-600">
                      123 Innovation Park, Suite 500
                    </p>
                    <p className="text-sm text-gray-600">
                      San Francisco, CA 94105
                    </p>
                    <p className="text-sm text-gray-600">("Controller")</p>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">And</div>
                  <div className="mt-2">
                    <p className="font-medium text-gray-800">
                      DATATECH SOLUTIONS
                    </p>
                    <p className="text-sm text-gray-600">456 Tech Avenue</p>
                    <p className="text-sm text-gray-600">
                      Tech City, State 67890
                    </p>
                    <p className="text-sm text-gray-600">("Processor")</p>
                  </div>
                  <div className="mt-6 text-sm text-gray-600">
                    EFFECTIVE DATE: March 5, 2025
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    1. DEFINITIONS
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      1.1 "Applicable Law" means all laws, regulations, and
                      other legal requirements applicable to the Processing of
                      Personal Data under this Agreement.
                    </p>
                    <p>
                      1.2 "Personal Data" means any information relating to an
                      identified or identifiable natural person.
                    </p>
                    <p>
                      1.3 "Processing" means any operation performed on Personal
                      Data, such as collection, recording, organization,
                      storage, adaptation or alteration, retrieval,
                      consultation, use, disclosure by transmission,
                      dissemination or otherwise making available, alignment or
                      combination, blocking, erasure or destruction.
                    </p>
                    <p>
                      1.4 "Data Subject" means an identified or identifiable
                      natural person to whom the Personal Data relates.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    2. SCOPE AND PURPOSE
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      2.1 This Data Processing Agreement ("Agreement") governs
                      the Processing of Personal Data by Processor on behalf of
                      Controller in connection with the services provided by
                      Processor to Controller under the Main Agreement dated
                      [Date].
                    </p>
                    <p>
                      2.2 The subject matter, duration, nature, and purpose of
                      the Processing, as well as the types of Personal Data
                      processed and categories of Data Subjects, are set forth
                      in Appendix 1 to this Agreement.
                    </p>
                  </div>
                </div>

                <div className="mt-12 text-sm text-gray-500 text-center">
                  Page 1 of 16
                </div>

                {/* Page 2 */}
                <div className="pt-12 border-t border-gray-300">
                  <h2 className="text-lg font-semibold text-gray-800">
                    3. OBLIGATIONS OF THE CONTROLLER
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      3.1 The Controller shall ensure that its instructions for
                      the Processing of Personal Data comply with Applicable
                      Law.
                    </p>
                    <p>
                      3.2 The Controller shall have sole responsibility for the
                      accuracy, quality, and legality of Personal Data and the
                      means by which the Controller acquired Personal Data.
                    </p>
                    <p>
                      3.3 The Controller warrants that it has obtained all
                      necessary consents, authorizations, and permissions from
                      Data Subjects required under Applicable Law for the
                      Processing of Personal Data by the Processor in accordance
                      with this Agreement.
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6">
                    4. OBLIGATIONS OF THE PROCESSOR
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      4.1 The Processor shall Process Personal Data only on
                      documented instructions from the Controller, including
                      with regard to transfers of Personal Data to a third
                      country or an international organization, unless required
                      to do so by Applicable Law; in such a case, the Processor
                      shall inform the Controller of that legal requirement
                      before Processing, unless that law prohibits such
                      information on important grounds of public interest.
                    </p>
                    <p>
                      4.2 The Processor shall ensure that persons authorized to
                      Process the Personal Data have committed themselves to
                      confidentiality or are under an appropriate statutory
                      obligation of confidentiality.
                    </p>
                    <p>
                      4.3 The Processor shall not subcontract any Processing of
                      Personal Data to a third party without the prior written
                      consent of the Controller. Where the Processor engages a
                      Sub-processor with the Controller's consent, the Processor
                      shall enter into a written agreement with the
                      Sub-processor imposing on the Sub-processor the same
                      obligations imposed on the Processor under this Agreement.
                    </p>
                  </div>

                  <div className="mt-12 text-sm text-gray-500 text-center">
                    Page 2 of 16
                  </div>
                </div>

                {/* Page 3 */}
                <div className="pt-12 border-t border-gray-300">
                  <div className="text-sm text-gray-700 space-y-3">
                    <p>
                      4.4 The Processor shall, taking into account the nature of
                      the Processing, assist the Controller by appropriate
                      technical and organizational measures, insofar as this is
                      possible, for the fulfillment of the Controller's
                      obligation to respond to requests for exercising the Data
                      Subject's rights laid down in Chapter III of the GDPR.
                    </p>
                    <p>
                      4.5 The Processor shall assist the Controller in ensuring
                      compliance with the obligations pursuant to Articles 32 to
                      36 of the GDPR, taking into account the nature of the
                      Processing and the information available to the Processor.
                    </p>
                    <p>
                      4.6 At the choice of the Controller, the Processor shall
                      delete or return all Personal Data to the Controller after
                      the end of the provision of services relating to
                      Processing, and delete existing copies unless Applicable
                      Law requires storage of the Personal Data.
                    </p>
                    <p>
                      4.7 The Processor shall make available to the Controller
                      all information necessary to demonstrate compliance with
                      the obligations laid down in this Agreement and allow for
                      and contribute to audits, including inspections, conducted
                      by the Controller or another auditor mandated by the
                      Controller.
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6">
                    5. SECURITY MEASURES
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      5.1 The Processor shall implement appropriate technical
                      and organizational measures to ensure a level of security
                      appropriate to the risk, including, as appropriate: (a)
                      the pseudonymization and encryption of Personal Data; (b)
                      the ability to ensure the ongoing confidentiality,
                      integrity, availability and resilience of processing
                      systems and services; (c) the ability to restore the
                      availability and access to Personal Data in a timely
                      manner in the event of a physical or technical incident;
                      (d) a process for regularly testing, assessing and
                      evaluating the effectiveness of technical and
                      organizational measures for ensuring the security of the
                      processing.
                    </p>
                    <p>
                      5.2 In assessing the appropriate level of security, the
                      Processor shall take account of the risks that are
                      presented by Processing, in particular from accidental or
                      unlawful destruction, loss, alteration, unauthorized
                      disclosure of, or access to Personal Data transmitted,
                      stored or otherwise Processed.
                    </p>
                  </div>

                  <div className="mt-12 text-sm text-gray-500 text-center">
                    Page 3 of 16
                  </div>
                </div>

                {/* Page 4 */}
                <div className="pt-12 border-t border-gray-300">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-700">
                      <span className="font-medium">
                        Security Vulnerability:
                      </span>{" "}
                      This page contains the Data Protection Clause (Section
                      5.1) that requires more specific security measures to meet
                      compliance requirements.
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6">
                    6. DATA SUBJECT RIGHTS
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      6.1 The Processor shall promptly notify the Controller of
                      any request received from a Data Subject under any
                      Applicable Law with respect to Personal Data, and shall
                      not respond to such request except on the documented
                      instructions of the Controller or as required by
                      Applicable Law.
                    </p>
                    <p>
                      6.2 The Processor shall provide such assistance as the
                      Controller reasonably requests to enable the Controller to
                      comply with its obligations to respond to Data Subjects'
                      requests to exercise their rights under Applicable Law.
                      Such assistance may include implementing appropriate
                      technical and organizational measures, insofar as this is
                      possible, for the fulfillment of the Controller's
                      obligation to respond to requests for exercising the Data
                      Subject's rights.
                    </p>
                    <p>
                      6.3 The Processor shall implement appropriate technical
                      and organizational measures to assist the Controller in
                      meeting its obligations to respond to Data Subject
                      requests within the timeframes specified in Applicable
                      Law.
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6">
                    7. PERSONAL DATA BREACH
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      7.1 The Processor shall implement appropriate technical
                      and organizational measures to ensure the ongoing
                      integrity and confidentiality of Personal Data and to
                      address Personal Data Breaches, including measures to
                      identify, assess, and mitigate the negative effects of any
                      Personal Data Breach.
                    </p>
                  </div>

                  <div className="mt-12 text-sm text-gray-500 text-center">
                    Page 4 of 16
                  </div>
                </div>

                {/* Page 7 - Breach Notification Section */}
                <div className="pt-12 border-t border-gray-300">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-700">
                      <span className="font-medium">Compliance Risk:</span> This
                      page contains the Breach Notification clause (Section 7.2)
                      that requires a specific timeframe instead of "without
                      undue delay."
                    </p>
                  </div>

                  <div className="text-sm text-gray-700 space-y-3 mt-6">
                    <p>
                      7.2 In case of a Personal Data Breach, the Processor shall
                      notify the Controller without undue delay after becoming
                      aware of a Personal Data Breach. Such notification shall
                      at least: (a) describe the nature of the personal data
                      breach including where possible, the categories and
                      approximate number of data subjects concerned and the
                      categories and approximate number of personal data records
                      concerned; (b) communicate the name and contact details of
                      the data protection officer or other contact point where
                      more information can be obtained; (c) describe the likely
                      consequences of the personal data breach; (d) describe the
                      measures taken or proposed to be taken by the controller
                      to address the personal data breach.
                    </p>
                    <p>
                      7.3 The Processor shall provide reasonable assistance to
                      the Controller in relation to any notifications required
                      to be made to a supervisory authority or to Data Subjects
                      in respect of any Personal Data Breach.
                    </p>
                    <p>
                      7.4 The Processor shall document any Personal Data
                      Breaches, comprising the facts relating to the Personal
                      Data Breach, its effects and the remedial action taken,
                      and shall provide such documentation to the Controller on
                      request.
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6">
                    8. AUDIT RIGHTS
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      8.1 The Processor shall make available to the Controller
                      all information necessary to demonstrate compliance with
                      the obligations set forth in this Agreement and shall
                      allow for and contribute to audits, including inspections,
                      conducted by the Controller or an auditor mandated by the
                      Controller.
                    </p>
                    <p>
                      8.2 The Controller shall provide the Processor with
                      reasonable notice of any audit or inspection and shall use
                      reasonable endeavors to avoid causing any damage or
                      disruption to the Processor's premises, equipment,
                      personnel and business while conducting such audit or
                      inspection.
                    </p>
                  </div>

                  <div className="mt-12 text-sm text-gray-500 text-center">
                    Page 7 of 16
                  </div>
                </div>

                {/* Page 8 - Payment Terms */}
                <div className="pt-12 border-t border-gray-300">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-sm text-amber-700">
                      <span className="font-medium">Business Rule Alert:</span>{" "}
                      This page contains the Payment Terms (Section 12) that
                      should be 45 days instead of 30 days per company policy.
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6">
                    12. FEES AND PAYMENT
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      12.1 All fees and charges payable under the Main Agreement
                      shall remain in full force and effect.
                    </p>
                    <p>
                      12.2 The Controller shall pay all undisputed invoices in
                      full within thirty (30) days of the date of the invoice.
                    </p>
                    <p>
                      12.3 All amounts payable under this Agreement are
                      exclusive of VAT or any other applicable tax which shall
                      be payable by the Controller at the rate and in the manner
                      from time to time prescribed by law.
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6">
                    13. LIABILITY
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      13.1 Each Party shall be liable for and shall indemnify
                      the other Party against any losses, damages, costs or
                      expenses incurred or suffered by the indemnified Party as
                      a result of any breach by the indemnifying Party of this
                      Agreement.
                    </p>
                    <p>
                      13.2 Nothing in this Agreement shall limit or exclude
                      either Party's liability for: (a) death or personal injury
                      caused by its negligence; (b) fraud or fraudulent
                      misrepresentation; or (c) any other liability which cannot
                      be limited or excluded by Applicable Law.
                    </p>
                  </div>

                  <div className="mt-12 text-sm text-gray-500 text-center">
                    Page 8 of 16
                  </div>
                </div>

                {/* Page 12 - International Data Transfer */}
                <div className="pt-12 border-t border-gray-300">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-700">
                      <span className="font-medium">Compliance Risk:</span> This
                      page contains the International Data Transfer clause
                      (Section 9) that lacks specific reference to SCCs or other
                      transfer mechanisms.
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6">
                    9. INTERNATIONAL TRANSFERS
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      9.1 Transfer of personal data to third countries or
                      international organizations shall only take place if the
                      conditions laid down in Chapter V of the GDPR are met.
                    </p>
                    <p>
                      9.2 Any transfer of Personal Data to a third country or an
                      international organization shall take place only if the
                      Controller has provided appropriate documentation of
                      compliance with Chapter V of the GDPR.
                    </p>
                    <p>
                      9.3 The Processor shall not transfer Personal Data to a
                      third country or international organization unless the
                      Processor has obtained the Controller's prior written
                      authorization.
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6">
                    10. SUB-PROCESSORS
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      10.1 The Controller hereby authorizes the Processor to
                      engage those Sub-processors listed in Appendix 2 to this
                      Agreement for the Processing activities described in that
                      Appendix.
                    </p>
                    <p>
                      10.2 The Processor shall not engage any additional or
                      replacement Sub-processors without the prior written
                      consent of the Controller.
                    </p>
                    <p>
                      10.3 Where the Processor engages a Sub-processor for
                      carrying out specific Processing activities on behalf of
                      the Controller, the Processor shall ensure that the
                      Sub-processor provides at least the same level of
                      protection for the Personal Data as is required of the
                      Processor under this Agreement.
                    </p>
                  </div>

                  <div className="mt-12 text-sm text-gray-500 text-center">
                    Page 12 of 16
                  </div>
                </div>

                {/* Page 15 - Termination */}
                <div className="pt-12 border-t border-gray-300">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-700">
                      <span className="font-medium">Validated:</span> This page
                      contains the Termination clause (Section 17) that meets
                      all compliance requirements.
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6">
                    17. TERM AND TERMINATION
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      17.1 This Agreement shall commence on the Effective Date
                      and shall continue in force until terminated in accordance
                      with this Section.
                    </p>
                    <p>
                      17.2 This Agreement may be terminated by either Party with
                      30 days written notice to the other Party.
                    </p>
                    <p>
                      17.3 Upon termination of this Agreement for any reason,
                      the Processor shall, at the choice of the Controller,
                      delete or return all Personal Data to the Controller, and
                      delete all existing copies unless applicable law requires
                      storage of the Personal Data.
                    </p>
                    <p>
                      17.4 The provisions of this Agreement relating to
                      confidentiality, liability, indemnity and any other
                      provisions which by their nature are intended to survive
                      termination shall survive any termination or expiration of
                      this Agreement.
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mt-6">
                    18. MISCELLANEOUS
                  </h2>
                  <div className="mt-3 text-sm text-gray-700 space-y-3">
                    <p>
                      18.1 This Agreement and any dispute or claim arising out
                      of or in connection with it or its subject matter or
                      formation shall be governed by and construed in accordance
                      with the laws of [Jurisdiction].
                    </p>
                    <p>
                      18.2 Any amendment to this Agreement shall be in writing
                      and signed by both Parties.
                    </p>
                  </div>

                  <div className="mt-12 text-sm text-gray-500 text-center">
                    Page 15 of 16
                  </div>
                </div>

                {/* Page 16 - Signatures */}
                <div className="pt-12 border-t border-gray-300">
                  <h2 className="text-lg font-semibold text-gray-800">
                    19. SIGNATURES
                  </h2>
                  <div className="mt-6 text-sm text-gray-700">
                    <p>
                      This Agreement has been entered into on the date stated at
                      the beginning of it.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-10">
                      <div>
                        <p className="font-medium">
                          For and on behalf of Controller:
                        </p>
                        <div className="mt-6 border-b border-gray-400 h-10"></div>
                        <p className="mt-2">Name:</p>
                        <p className="mt-2">Title:</p>
                        <p className="mt-2">Date:</p>
                      </div>

                      <div>
                        <p className="font-medium">
                          For and on behalf of Processor:
                        </p>
                        <div className="mt-6 border-b border-gray-400 h-10"></div>
                        <p className="mt-2">Name:</p>
                        <p className="mt-2">Title:</p>
                        <p className="mt-2">Date:</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 text-sm text-gray-500 text-center">
                    Page 16 of 16
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetailView;

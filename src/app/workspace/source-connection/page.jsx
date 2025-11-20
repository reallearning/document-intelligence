"use client";
import React, { useState } from "react";
import { Database, X } from "lucide-react";
import { SiGooglecloud,SiDatabricks, SiOracle } from "react-icons/si";
import { FaRegSnowflake,FaAws,FaSalesforce, FaFileAlt} from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbFileTypeSql, TbBrandGoogleBigQuery } from "react-icons/tb";
import Link from "next/link";



const DataSourceSelector = () => {
  const [selectedSource, setSelectedSource] = useState(null);

  // Logo component for each data source
  const LogoIcon = ({ name }) => {
    const logos = {
      "Databricks Lakehouse": (
         <SiDatabricks className="text-red-500" size={20}/>
      ),
      Snowflake: (
        <FaRegSnowflake className="text-blue-500" size={20}/>
      ),
      "Google BigQuery": <TbBrandGoogleBigQuery className="text-blue-500" size={20}/>,
      "Amazon S3": (
       <FaAws className="text-black" size={20}/>
      ),
      "Azure Data Lake Storage": (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <rect x="6" y="10" width="20" height="3" fill="#0089D6" />
          <rect x="6" y="15" width="20" height="3" fill="#0089D6" />
          <rect x="6" y="20" width="20" height="3" fill="#0089D6" />
        </svg>
      ),
      "Google Cloud Storage": (
       <SiGooglecloud className="text-blue-500" size={20}/>
      ),
      Oracle: (
        <SiOracle className="text-red-500" size={20}/>
      ),
      "SQL Server": (
         <TbFileTypeSql className="text-blue-500" size={20}/>
      ),
      PostgreSQL: (
        <BiLogoPostgresql className="text-indigo-500" size={20}/>
      ),
      MySQL: (
        <TbFileTypeSql className="text-blue-500" size={20}/>
      ),
      Salesforce: (
        <FaSalesforce className="text-blue-500" size={20}/>
      ),
      "Files & SFTP": (
        <FaFileAlt className="text-blue-500" size={20}/>
      ),
      "SAP S/4HANA": (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <rect x="6" y="10" width="20" height="12" rx="1" fill="#0070C0" />
          <text
            x="16"
            y="20"
            fontSize="8"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            SAP
          </text>
        </svg>
      ),
      "SAP ECC": (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <rect x="6" y="10" width="20" height="12" rx="1" fill="#0070C0" />
          <text
            x="16"
            y="20"
            fontSize="8"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            SAP
          </text>
        </svg>
      ),
      "SAP IBP": (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <rect x="6" y="10" width="20" height="12" rx="1" fill="#0070C0" />
          <text
            x="16"
            y="20"
            fontSize="8"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            SAP
          </text>
        </svg>
      ),
      "SAP CAR": (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <rect x="6" y="10" width="20" height="12" rx="1" fill="#0070C0" />
          <text
            x="16"
            y="20"
            fontSize="8"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            SAP
          </text>
        </svg>
      ),
      "SAP Ariba": (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <rect x="6" y="10" width="20" height="12" rx="1" fill="#0070C0" />
          <text
            x="16"
            y="20"
            fontSize="8"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            SAP
          </text>
        </svg>
      ),
      "SAP EWM": (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <rect x="6" y="10" width="20" height="12" rx="1" fill="#0070C0" />
          <text
            x="16"
            y="20"
            fontSize="8"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            SAP
          </text>
        </svg>
      ),
      "Oracle E-Business Suite": (
        <SiOracle className="text-red-500" size={20}/>
      ),
      "Microsoft Dynamics 365 F&O": (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <rect x="6" y="6" width="9" height="9" fill="#F25022" />
          <rect x="17" y="6" width="9" height="9" fill="#7FBA00" />
          <rect x="6" y="17" width="9" height="9" fill="#00A4EF" />
          <rect x="17" y="17" width="9" height="9" fill="#FFB900" />
        </svg>
      ),
      "Manhattan WMS": (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <rect x="4" y="12" width="6" height="12" fill="#2C5F9E" />
          <rect x="12" y="8" width="6" height="16" fill="#2C5F9E" />
          <rect x="20" y="10" width="6" height="14" fill="#2C5F9E" />
        </svg>
      ),
    };

    return logos[name] || <Database className="w-6 h-6 text-gray-500" />;
  };

  const dataSources = [
    // Top row - Data Platforms
    { name: "Databricks Lakehouse", category: "Data Platform & Databases" },
    { name: "Snowflake", category: "Data Platform & Databases" },
    { name: "Google BigQuery", category: "Data Platform & Databases" },

    // Second row - Cloud Storage
    { name: "Amazon S3", category: "Cloud Storage" },
    { name: "Azure Data Lake Storage", category: "Cloud Storage" },
    { name: "Google Cloud Storage", category: "Cloud Storage" },

    // Third row - Traditional Databases
    { name: "Oracle", category: "Databases" },
    { name: "SQL Server", category: "Databases" },
    { name: "PostgreSQL", category: "Databases" },

    // Fourth row
    { name: "MySQL", category: "Databases" },
    { name: "Salesforce", category: "Sales & CRM" },
    { name: "Files & SFTP", category: "File Systems" },

    // SAP Systems
    { name: "SAP S/4HANA", category: "Inventory & Supply Chain" },
    { name: "SAP ECC", category: "Inventory & Supply Chain" },
    { name: "SAP IBP", category: "Inventory & Supply Chain" },

    { name: "SAP CAR", category: "Inventory & Supply Chain" },
    { name: "SAP Ariba", category: "Inventory & Supply Chain" },
    { name: "SAP EWM", category: "Inventory & Supply Chain" },

    // Other ERP
    { name: "Oracle E-Business Suite", category: "Sales & Finance" },
    { name: "Microsoft Dynamics 365 F&O", category: "Sales & Finance" },
    { name: "Manhattan WMS", category: "Inventory & Supply Chain" },
  ];

  const requiredDataSources = [
    "Brand and Collection master data",
    "Style specifications and SKU master (with attributes, colors, sizes)",
    "Inventory levels by location (stores, DCs, warehouses)",
    "Sales transactions (historical and real-time by SKU, store, channel)",
    "Store master (locations, formats, attributes)",
    "Channel information (online, marketplace, retail)",
    "Vendor master and lead time data",
    "Pricing and markdown information",
    "Promotion and campaign data",
    "Customer segment preferences and behavior",
    "KPIs and performance metrics",
    "Returns and quality data",
    "External events (holidays, weather, market conditions)",
  ];

  const DatabricksModal = () => {
    const [showChecklist, setShowChecklist] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});

    const checklistItems = [
      {
        title: "Private connectivity is truly private",
        description:
          "Databricks workspace and SQL Warehouses are reachable only via Private Link/Private Endpoint. Public network access is disabled.",
        details:
          "Your workspace should not have any public IPs or public workspace URLs. Front-end and back-end Private Link must be enabled.",
      },
      {
        title: "Workspace tier & networking mode",
        description:
          "Workspace runs on Premium/Enterprise tier with VNet/VPC injection enabled using customer-managed networking.",
        details:
          "Ensure workspace is not using legacy Databricks-managed networking mode.",
      },
      {
        title: "DNS resolves to private IP",
        description:
          "From your subnet, the Databricks hostname resolves to a private IP via Private Endpoint, not a public IP.",
        details:
          "Private DNS zones or conditional forwarders must be configured for Databricks hostnames.",
      },
      {
        title: "Network route is configured",
        description:
          "Route tables and security groups allow HTTPS (443) from your app subnet to the Databricks Private Endpoint.",
        details: "Access should be tightly scoped, not any-to-any routes.",
      },
      {
        title: "Secure compute configuration",
        description:
          "SQL Warehouses run with no public IPs and use private connectivity to the control plane.",
        details:
          "If using serverless SQL, ensure it's configured with appropriate private connectivity.",
      },
      {
        title: "Least-privilege authentication",
        description:
          "Using a dedicated service principal or PAT with read-only access to specific Unity Catalog objects.",
        details:
          "Secrets should be stored in your cloud secret manager, not hardcoded.",
      },
      {
        title: "Unity Catalog governance",
        description:
          "Datasets are managed in Unity Catalog with a clear list of catalogs/schemas/tables allowed for this integration.",
        details:
          "Avoid connecting directly to large, legacy, all-purpose metastore environments.",
      },
      {
        title: "Logging & audit trail enabled",
        description:
          "SQL query history, audit logs, and network flow logs are enabled and shipped to your central logging platform.",
        details:
          "Both query logs and network logs should be wired into your monitoring process.",
      },
    ];

    const toggleCheck = (index) => {
      setCheckedItems((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center p-3">
                <LogoIcon name="Databricks Lakehouse" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Databricks Lakehouse
                </h2>
                <p className="text-sm text-gray-300">
                  Configure private network connection
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSource(null)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs/Toggle */}
          <div className="border-b border-gray-200 bg-gray-50 px-6">
            <div className="flex gap-1">
              <button
                onClick={() => setShowChecklist(false)}
                className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                  !showChecklist
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Connection Details
              </button>
              <button
                onClick={() => setShowChecklist(true)}
                className={`px-6 py-3 font-medium transition-colors border-b-2 relative ${
                  showChecklist
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Things to Check
                <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                  {Object.values(checkedItems).filter(Boolean).length}/
                  {checklistItems.length}
                </span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {!showChecklist ? (
              /* Configuration Form */
              <div className="p-6 space-y-6">
                {/* Info Banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-sm">
                    <p className="text-blue-900 font-medium mb-1">
                      Before you begin
                    </p>
                    <p className="text-blue-800">
                      Review the{" "}
                      <button
                        onClick={() => setShowChecklist(true)}
                        className="underline font-medium hover:text-blue-900"
                      >
                        Things to Check
                      </button>{" "}
                      tab with your network/security team to ensure your
                      Databricks workspace is configured correctly.
                    </p>
                  </div>
                </div>

                {/* Q1 - Private Link */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Private Link Configuration
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Confirm your workspace uses Private Link/Private
                        Endpoint for all traffic
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="privateLink"
                            className="w-4 h-4 text-teal-600 mt-0.5"
                          />
                          <div>
                            <span className="text-gray-900 font-medium">
                              Yes, fully private
                            </span>
                            <p className="text-sm text-gray-500">
                              Front-end & back-end Private Link implemented
                            </p>
                          </div>
                        </label>
                        <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="privateLink"
                            className="w-4 h-4 text-teal-600 mt-0.5"
                          />
                          <div className="flex-1">
                            <span className="text-gray-900 font-medium">
                              No, using different setup
                            </span>
                            <input
                              type="text"
                              placeholder="Describe your current networking pattern"
                              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Q2 - Workspace Tier */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Workspace Tier & Network Mode
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Verify workspace meets network prerequisites
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Workspace Tier
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
                            <option>Select tier...</option>
                            <option>Premium</option>
                            <option>Enterprise</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Network Configuration
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-teal-600 rounded"
                              />
                              <span className="text-sm text-gray-700">
                                VNet Injection enabled
                              </span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-teal-600 rounded"
                              />
                              <span className="text-sm text-gray-700">
                                Customer-managed VPC
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Q3 - DNS Configuration */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Private DNS Configuration
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Provide internal hostname that resolves to private IP
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Private DNS Hostname
                          </label>
                          <input
                            type="text"
                            placeholder="workspace.privatelink.azuredatabricks.net"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Port (default: 443)
                          </label>
                          <input
                            type="text"
                            placeholder="443"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Q4 - SQL Warehouse */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        SQL Warehouse Connection
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Configure SQL compute endpoint details
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            SQL Warehouse Name
                          </label>
                          <input
                            type="text"
                            placeholder="analytics-warehouse"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            HTTP Path
                          </label>
                          <input
                            type="text"
                            placeholder="/sql/1.0/warehouses/xxxxx"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <label className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-teal-600 rounded mt-0.5"
                          />
                          <span className="text-sm text-gray-700">
                            Compute endpoint is reachable from Questt deployment
                            subnet
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Q5 - Authentication */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Authentication Method
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Select read-only credential type
                      </p>
                      <div className="space-y-2 mb-4">
                        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="auth"
                            className="w-4 h-4 text-teal-600"
                          />
                          <span className="text-gray-900 font-medium">
                            Personal Access Token (PAT)
                          </span>
                        </label>
                        <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="auth"
                            className="w-4 h-4 text-teal-600"
                          />
                          <span className="text-gray-900 font-medium">
                            Service Principal
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secret Reference (from your secret manager)
                        </label>
                        <input
                          type="text"
                          placeholder="azure-kv://vault-name/secret-name"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Q6 - Permissions */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Read-Only Role
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Specify role with SELECT-only permissions
                      </p>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3 text-sm text-amber-900">
                        <strong>Required permissions:</strong> Read-only access
                        on specified schemas/tables. No write/modify/drop.
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role Name
                        </label>
                        <input
                          type="text"
                          placeholder="databricks-read-only-role"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Q7 - Data Scope */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                      7
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Data Access Scope
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        List fully-qualified objects (catalog.schema.table)
                      </p>
                      <div className="space-y-3">
                        {[1, 2, 3].map((num) => (
                          <input
                            key={num}
                            type="text"
                            placeholder={`${num}. catalog.schema.table`}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        ))}
                        <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                          + Add more objects
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Q8 - Logging */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                      8
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Logging & Monitoring
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Configure audit trail and query logging
                      </p>
                      <div className="space-y-3">
                        <label className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-teal-600 rounded mt-0.5"
                          />
                          <span className="text-sm text-gray-700">
                            SQL Warehouse query logs enabled
                          </span>
                        </label>
                        <label className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-teal-600 rounded mt-0.5"
                          />
                          <span className="text-sm text-gray-700">
                            Network access from Questt subnet will be audited
                          </span>
                        </label>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Log Storage Location
                          </label>
                          <input
                            type="text"
                            placeholder="/aws/databricks/workspace-logs"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Checklist View */
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Pre-connection Checklist
                  </h3>
                  <p className="text-sm text-gray-600">
                    Work with your network and security team to verify these
                    requirements before establishing the connection.
                  </p>
                </div>

                <div className="space-y-3">
                  {checklistItems.map((item, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg transition-all ${
                        checkedItems[index]
                          ? "border-teal-300 bg-teal-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="p-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checkedItems[index] || false}
                            onChange={() => toggleCheck(index)}
                            className="w-5 h-5 text-teal-600 rounded mt-0.5 flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-700 mb-2">
                              {item.description}
                            </p>
                            <p className="text-xs text-gray-500 italic">
                              {item.details}
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {Object.values(checkedItems).filter(Boolean).length ===
                  checklistItems.length && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex gap-3">
                      <svg
                        className="w-5 h-5 text-green-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-green-900">
                          All checks completed!
                        </p>
                        <p className="text-sm text-green-800">
                          You're ready to configure the connection details.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedSource(null)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                {showChecklist
                  ? "Continue to Configuration"
                  : "Save Connection"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">4/6</div>
          <h1 className="text-3xl font-normal text-gray-900 mb-3">
            Where does the company's data come from?
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Based on the questions selected, these are the key data sources
            required for analysis and decision-making.
            <br />
            Review the list below and confirm access for each.
          </p>
        </div>

        {/* Required Data Sources List */}
        <div className="bg-white rounded-lg mb-6">
          {requiredDataSources.map((source, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 border-b border-gray-100 last:border-0"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-600 font-medium">
                {index + 1}
              </div>
              <div className="text-gray-700 pt-0.5">{source}</div>
            </div>
          ))}
        </div>

        {/* Help Box */}
        <div className="bg-blue-50 rounded-lg p-4 mb-8">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 16v-4m0-4h.01"
              />
            </svg>
            <div>
              <div className="text-gray-900 text-sm font-medium mb-1">
                Don't see your data source?
              </div>
              <div className="text-gray-700 text-sm">
                Can't find the connector you need?{" "}
                <a
                  href="#"
                  className="text-blue-600 underline hover:text-blue-700"
                >
                  Request a new connector
                </a>{" "}
                and we'll help integrate it.
              </div>
            </div>
          </div>
        </div>

        {/* Data Source Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {dataSources.map((source, index) => (
            <button
              key={index}
              onClick={() => {
                if (source.name === "Databricks Lakehouse") {
                  setSelectedSource("databricks");
                }
              }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors text-left"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 p-2">
                  <LogoIcon name={source.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-base">
                    {source.name}
                  </h3>
                  <p className="text-sm text-gray-500">{source.category}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <Link href={"/workspace/clarification-steps"}>
         <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3.5 px-8 rounded-lg transition-colors text-base">
          Continue
        </button></Link>
       
      </div>

      {/* Databricks Modal */}
      {selectedSource === "databricks" && <DatabricksModal />}
    </div>
  );
};

export default DataSourceSelector;

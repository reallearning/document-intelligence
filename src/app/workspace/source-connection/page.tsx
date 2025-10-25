"use client";
import Link from "next/link";
import React, { useState } from "react";

// Type definitions
interface DataSource {
  id: string;
  name: string;
  category: string;
  description: string;
  dataAvailable: string[];
  authType: string;
}

type SelectedDataTypes = {
  [key: string]: Set<string>;
};

type CustomData = {
  [key: string]: string;
};

const DataSourcesPage = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [connectedSources, setConnectedSources] = useState<Set<string>>(
    new Set()
  );
  const [selectedDataTypes, setSelectedDataTypes] = useState<SelectedDataTypes>(
    {}
  );
  const [customData, setCustomData] = useState<CustomData>({});

  const dataRequirements: string[] = [
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

  const dataSources: DataSource[] = [
    {
      id: "sap-s4hana",
      name: "SAP S/4HANA",
      category: "Inventory & Supply Chain",
      description:
        "Next-generation ERP providing real-time inventory and supply chain management.",
      dataAvailable: [
        "Material master and stock levels",
        "Purchase orders and receipts",
        "Goods movements and transfers",
        "Plant and storage location data",
        "Vendor master records",
        "Supply chain planning data",
      ],
      authType: "OAuth 2.0",
    },
    {
      id: "sap-ecc",
      name: "SAP ECC",
      category: "Inventory & Supply Chain",
      description:
        "Enterprise Central Component for inventory and logistics management.",
      dataAvailable: [
        "Inventory balances by location",
        "Material movements",
        "Purchase requisitions and orders",
        "Warehouse tasks",
        "Vendor information",
        "Stock transfer data",
      ],
      authType: "OAuth 2.0",
    },
    {
      id: "oracle-ebs",
      name: "Oracle E-Business Suite",
      category: "Sales & Finance",
      description:
        "Comprehensive business application suite for sales and financial operations.",
      dataAvailable: [
        "Sales orders and invoices",
        "Customer master data",
        "AR/AP transactions",
        "General ledger entries",
        "Revenue recognition",
        "Financial reporting data",
      ],
      authType: "OAuth 2.0",
    },
    {
      id: "dynamics-365",
      name: "Microsoft Dynamics 365 F&O",
      category: "Sales & Finance",
      description: "Cloud-based ERP for finance and operations management.",
      dataAvailable: [
        "Sales transactions",
        "Financial statements",
        "Customer accounts",
        "Invoice and payment data",
        "Budget and forecasts",
        "Cost accounting",
      ],
      authType: "OAuth 2.0",
    },
    {
      id: "sap-car",
      name: "SAP CAR",
      category: "Inventory & Supply Chain",
      description: "Customer Activity Repository for retail transaction data.",
      dataAvailable: [
        "POS transaction logs",
        "Store inventory snapshots",
        "Sales by SKU and location",
        "Promotion effectiveness",
        "Customer purchase patterns",
      ],
      authType: "OAuth 2.0",
    },
    {
      id: "sap-ibp",
      name: "SAP IBP",
      category: "Inventory & Supply Chain",
      description:
        "Integrated Business Planning for demand and supply planning.",
      dataAvailable: [
        "Demand forecasts",
        "Supply plans",
        "Safety stock levels",
        "Allocation strategies",
        "Planning scenarios",
        "S&OP consensus data",
      ],
      authType: "OAuth 2.0",
    },
    {
      id: "sap-ariba",
      name: "SAP Ariba",
      category: "Inventory & Supply Chain",
      description: "Procurement and supplier relationship management platform.",
      dataAvailable: [
        "Supplier catalogs",
        "Purchase requisitions",
        "RFQs and sourcing events",
        "Contract management",
        "Supplier performance metrics",
        "Spend analytics",
      ],
      authType: "OAuth 2.0",
    },
    {
      id: "manhattan-wms",
      name: "Manhattan WMS",
      category: "Inventory & Supply Chain",
      description:
        "Warehouse management system for inventory control and fulfillment.",
      dataAvailable: [
        "Bin-level inventory",
        "Receiving and putaway",
        "Pick, pack, ship data",
        "Labor productivity",
        "Order fulfillment status",
        "Warehouse capacity",
      ],
      authType: "API Key",
    },
    {
      id: "sap-ewm",
      name: "SAP EWM",
      category: "Inventory & Supply Chain",
      description:
        "Extended Warehouse Management for complex warehouse operations.",
      dataAvailable: [
        "Warehouse stock levels",
        "Inbound and outbound deliveries",
        "Warehouse tasks and resources",
        "Cross-docking operations",
        "Quality inspection data",
        "Slotting optimization",
      ],
      authType: "OAuth 2.0",
    },
    {
      id: "snowflake",
      name: "Snowflake",
      category: "Data Platform & Databases",
      description: "Cloud data warehouse for analytics and data sharing.",
      dataAvailable: [
        "Historical sales data",
        "Aggregated metrics",
        "Data quality scores",
        "Time-series snapshots",
        "Cross-system integrated data",
      ],
      authType: "OAuth 2.0",
    },
    {
      id: "databricks",
      name: "Databricks Lakehouse",
      category: "Data Platform & Databases",
      description:
        "Unified analytics platform combining data lake and warehouse.",
      dataAvailable: [
        "Raw and curated datasets",
        "ML feature stores",
        "Streaming data",
        "Delta Lake tables",
        "Notebook outputs",
      ],
      authType: "OAuth 2.0",
    },
    {
      id: "informatica-iics",
      name: "Informatica IICS",
      category: "Data Platform & Databases",
      description: "Cloud data integration and quality platform.",
      dataAvailable: [
        "Data pipeline status",
        "Data quality metrics",
        "Transformation logs",
        "Master data records",
        "Data profiling results",
      ],
      authType: "OAuth 2.0",
    },
  ];

  const handleConnect = (sourceId: string) => {
    setConnectedSources((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sourceId)) {
        newSet.delete(sourceId);
      } else {
        newSet.add(sourceId);
      }
      return newSet;
    });
  };

  const toggleDataType = (sourceId: string, dataType: string) => {
    setSelectedDataTypes((prev) => {
      const currentSet = prev[sourceId] || new Set<string>();
      const newSet = new Set(currentSet);

      if (newSet.has(dataType)) {
        newSet.delete(dataType);
      } else {
        newSet.add(dataType);
      }

      return {
        ...prev,
        [sourceId]: newSet,
      };
    });
  };

  const handleCustomDataChange = (sourceId: string, value: string) => {
    setCustomData({
      ...customData,
      [sourceId]: value,
    });
  };

  if (selectedSource) {
    const source = dataSources.find((s) => s.id === selectedSource);

    if (!source) {
      return null;
    }

    const isConnected = connectedSources.has(source.id);
    const sourceSelectedData =
      selectedDataTypes[source.id] || new Set<string>();
    const sourceCustomData = customData[source.id] || "";

    return (
      <div className="h-screen overflow-auto bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-sm p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setSelectedSource(null)}
            className="text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1 text-sm"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {source.name}
                </h2>
                <p className="text-sm text-gray-500">{source.category}</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect(source.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                isConnected
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
              type="button"
            >
              {isConnected ? (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Connected
                </>
              ) : (
                <>
                  <span className="text-lg">+</span>
                  Connect
                </>
              )}
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              {source.description}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              What data can I find here?
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Select the data types you need from this source
            </p>
            <div className="bg-white border border-gray-200 rounded-xl p-4 max-h-64 overflow-y-auto">
              <div className="space-y-3">
                {source.dataAvailable.map((item, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={sourceSelectedData.has(item)}
                      onChange={() => toggleDataType(source.id, item)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-teal-700 focus:ring-teal-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs text-gray-500 mb-2">
                Other data available (specify)
              </label>
              <textarea
                value={sourceCustomData}
                onChange={(e) =>
                  handleCustomDataChange(source.id, e.target.value)
                }
                placeholder="Describe any other data you'll get from this source..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-none"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Authentication
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-2">
                  {source.authType}
                </label>
                <input
                  type="text"
                  placeholder={`Enter your ${source.authType}`}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
              {source.authType === "OAuth 2.0" && (
                <button
                  className="text-sm text-teal-700 hover:text-teal-800 font-medium"
                  type="button"
                >
                  Learn more about OAuth setup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-auto bg-gray-50 items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-sm p-12 w-full mx-auto max-w-6xl">
        <p className="text-sm text-gray-400 mb-3">4/6</p>
        <h1 className="text-4xl font-serif text-gray-900 mb-3">
          Where does the company’s data come from?
        </h1>
        <p className="text-gray-500 mb-8">
          Based on the questions selected, these are the key data sources
          required for analysis and decision-making. <br />
          Review the list below and confirm access for each.
        </p>

        <ul className="space-y-3 mb-8">
          {dataRequirements.map((req, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-700">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs font-semibold flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-sm">{req}</span>
            </li>
          ))}
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-sm text-blue-900 font-medium mb-1">
                Don't see your data source?
              </p>
              <p className="text-sm text-blue-800">
                Can't find the connector you need?{" "}
                <button
                  className="underline font-medium hover:text-blue-900"
                  type="button"
                >
                  Request a new connector
                </button>{" "}
                and we'll help integrate it.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {dataSources.map((source) => {
            const isConnected = connectedSources.has(source.id);
            const selectedCount = selectedDataTypes[source.id]?.size || 0;
            const hasCustom = customData[source.id]?.trim().length > 0;

            return (
              <button
                key={source.id}
                onClick={() => setSelectedSource(source.id)}
                className="relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-sm transition-all text-left group"
                type="button"
              >
                {isConnected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {source.name}
                </h3>
                <p className="text-xs text-gray-500">{source.category}</p>
                {(selectedCount > 0 || hasCustom) && (
                  <div className="mt-2 text-xs text-teal-700 font-medium">
                    {selectedCount} data types selected
                    {hasCustom ? " + custom" : ""}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <Link href={"/workspace/clarification-steps"}>
          <button
            className="w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-xl font-semibold text-lg transition-all hover:shadow-lg"
            type="button"
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DataSourcesPage;

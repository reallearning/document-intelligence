"use client";
import React, { useState } from "react";
import Image from "next/image";

// Simple UI components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 pt-0 ${className}`}>{children}</div>
);

const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-500 mt-1">{children}</p>
);

const CardFooter = ({ children, className = "" }) => (
  <div className={`mx-4 border-t text-sm text-gray-500 ${className}`}>
    {children}
  </div>
);

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const variantClasses = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-600 hover:bg-gray-100",
    link: "text-indigo-600 underline-offset-4 hover:underline p-0 h-auto",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-amber-600 text-white hover:bg-amber-700",
    success: "bg-green-600 text-white hover:bg-green-700",
  };

  const sizeClasses = {
    default: "h-9 px-4 py-2 text-sm",
    sm: "h-8 px-3 py-1 text-sm",
    lg: "h-11 px-6 py-3",
  };

  return (
    <button
      className={`font-medium rounded-md inline-flex items-center justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    primary: "bg-indigo-100 text-indigo-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const Progress = ({ value, variant = "default", className = "" }) => {
  const variantClasses = {
    default: "bg-indigo-600",
    success: "bg-[#297250]",
    warning: "bg-amber-600",
    danger: "bg-red-600",
  };

  return (
    <div
      className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
    >
      <div
        className={`h-full ${variantClasses[variant]} rounded-full`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

// Tabs
const TabContext = React.createContext();

const Tabs = ({ children, defaultValue, onValueChange }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    if (onValueChange) onValueChange(tabValue);
  };

  return (
    <TabContext.Provider value={{ activeTab, setTab: handleTabChange }}>
      <div>{children}</div>
    </TabContext.Provider>
  );
};

const TabsList = ({ children, className = "" }) => (
  <div className={`flex space-x-4 border-b ${className}`}>{children}</div>
);

const TabsTrigger = ({ children, value, className = "" }) => {
  const { activeTab, setTab } = React.useContext(TabContext);
  const isActive = activeTab === value;

  return (
    <button
      className={`pb-2 text-sm font-medium border-b-2 ${
        isActive
          ? "border-indigo-600 text-indigo-600"
          : "border-transparent text-gray-500 hover:text-gray-700"
      } ${className}`}
      onClick={() => setTab(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ children, value, className = "" }) => {
  const { activeTab } = React.useContext(TabContext);
  const isActive = activeTab === value;

  if (!isActive) return null;

  return <div className={`mt-4 ${className}`}>{children}</div>;
};

// Icons
const AlertCircle = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const CheckCircle = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const Clock = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const Calendar = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Database = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const FileText = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
);

const ExternalLink = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const Filter = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const ChevronDown = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const Send = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const XCircle = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const DollarSign = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const Download = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

// Thought bubble component
const ThoughtBubble = ({ children, direction = "left", className = "" }) => {
  const directionClasses = {
    left: "rounded-tl-none",
    right: "rounded-tr-none ml-auto",
  };

  return (
    <div
      className={`relative max-w-lg p-4 bg-indigo-50 text-indigo-900 rounded-lg ${directionClasses[direction]} ${className}`}
    >
      {children}
    </div>
  );
};

// Main GST & TDS Compliance Risk Dashboard
const GSTTDSComplianceDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex bg-gray-50">
      {/* SIDEBAR */}
      <div className="flex flex-col gap-y-6 mx-4 my-6 p-4 rounded-xl bg-[#001D5C] ">
        <div className="p-2 rounded-lg hover:bg-[#2154C4]">
          <Image src={"./icons/grid.svg"} height={24} width={24} alt="Grid" />
        </div>
        <div className="p-2 rounded-lg hover:bg-[#2154C4]">
          <Image src={"./icons/shield.svg"} height={24} width={24} alt="Grid" />
        </div>
        <div className="p-2 rounded-lg hover:bg-[#2154C4]">
          <Image src={"./icons/graph.svg"} height={24} width={24} alt="Grid" />
        </div>
        <div className="p-2 rounded-lg hover:bg-[#2154C4]">
          <Image
            src={"./icons/bar-chart.svg"}
            height={24}
            width={24}
            alt="Grid"
          />
        </div>
        <div className="p-2 rounded-lg hover:bg-[#2154C4]">
          <Image
            src={"./icons/network-node.svg"}
            height={24}
            width={24}
            alt="Grid"
          />
        </div>
      </div>

      <div className="flex flex-col w-full h-[98vh]  text-gray-800 mt-6 overflow-y-auto">
        {/* Header with Profile and Date */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">GST & TDS Compliance Monitor</h1>
            <p className="text-sm text-gray-500">
              Last updated: March 17th March, 2025 | 10:45 AM
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="bg-green-500 h-2 w-2 rounded-full mr-2"></span>
              <span className="text-sm font-medium">Agent Active</span>
            </div>
          </div>
        </header>

        {/* Data Sources Section */}
        <div className="flex items-start justify-between">
          <Card className="mb-6 w-full">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Connected Data Sources</CardTitle>
              <Badge variant="success">Primary System: Tally</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Database size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Tally</div>
                    <div className="text-xs text-gray-500">
                      Sales & Purchase Registers
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></div>
                      <span className="text-xs text-green-700">
                        Last sync: Today, 9:15 AM
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border flex items-center gap-3 opacity-60">
                  <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                    <Database size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Zoho</div>
                    <div className="text-xs text-gray-500">Sales Register</div>
                    <div className="flex items-center mt-1">
                      <div className="h-1.5 w-1.5 bg-red-500 rounded-full mr-1"></div>
                      <span className="text-xs text-red-700">
                        Not connected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border flex items-center gap-3 opacity-60">
                  <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                    <Database size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Quickbooks</div>
                    <div className="text-xs text-gray-500">Sales Register</div>
                    <div className="flex items-center mt-1">
                      <div className="h-1.5 w-1.5 bg-red-500 rounded-full mr-1"></div>
                      <span className="text-xs text-red-700">
                        Not connected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <ExternalLink size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">GST Portal</div>
                    <div className="text-xs text-gray-500">
                      GSTR-1, 2B, 3B Filings
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></div>
                      <span className="text-xs text-green-700">
                        Last sync: Today, 8:30 AM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="w-[40%] h-[266px] border rounded-xl shadow-sm bg-white ml-4 flex p-4 items-start">
            <div className="mr-2 self-start">
              <Image
                src={"./icons/agent.svg"}
                height={48}
                width={48}
                alt="Grid"
              />
            </div>
            <div className="w-[70%]">
              <p className="text-sm">
                I'm continuously monitoring data from your accounting systems
                and the GST portal to identify compliance issues before they
                become problems. I've analyzed 375 invoices across all systems
                in the past month.
              </p>
              <div className="mt-4 p-2 rounded-lg bg-[#F8F8F8]">
                <div className="flex items-center justify-between text-xs">
                  <p>Matching invoices cross system</p>
                  <p>97.2%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "97.2%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="mb-6">
          <Tabs
            defaultValue="overview"
            className="w-full mb-6"
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="overview" className="px-4 py-2">
                Overview
              </TabsTrigger>
              <TabsTrigger value="gst" className="px-4 py-2">
                GST Compliance
              </TabsTrigger>
              <TabsTrigger value="tds" className="px-4 py-2">
                TDS Compliance
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      GST Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold">87%</span>
                      <Badge
                        variant={85 > 80 ? "success" : "danger"}
                        className="ml-2"
                      >
                        {85 > 80 ? "Good" : "Needs Attention"}
                      </Badge>
                    </div>
                    <Progress
                      value={87}
                      variant="success"
                      className="h-1 mt-2"
                    />
                  </CardContent>
                  <CardFooter className="py-4 text-xs text-[#F06C00]">
                    <p className="flex">
                      <Image
                        src={"./icons/warning.svg"}
                        height={12}
                        width={12}
                        alt="warning"
                      />{" "}
                      12 issues need attention
                    </p>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      TDS Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold">92%</span>
                      <Badge
                        variant={90 > 80 ? "success" : "danger"}
                        className="ml-2"
                      >
                        {90 > 80 ? "Good" : "Needs Attention"}
                      </Badge>
                    </div>
                    <Progress
                      variant="success"
                      value={90}
                      className="h-1 mt-2"
                    />
                  </CardContent>
                  <CardFooter className="py-4 text-xs text-[#F06C00]">
                    <p className="flex">
                      <Image
                        src={"./icons/warning.svg"}
                        height={12}
                        width={12}
                        alt="warning"
                      />{" "}
                      12 issues need attention
                    </p>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      GSTR Filing Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="spac">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">GSTR-1</span>
                        <Badge variant="success">Filed (Mar 10)</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">GSTR-3B</span>
                        <Badge variant="danger">Due in 3 days</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="py-4 text-xs text-[#2569FD]">
                    <p className="">View filing calendar</p>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Pending Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold">19</span>
                      <Badge
                        variant={18 < 20 ? "warning" : "danger"}
                        className="ml-2"
                      >
                        {18 < 20 ? "Moderate" : "High"}
                      </Badge>
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                      <span className="flex items-center">
                        <Clock size={12} className="mr-1" /> Urgent: 4
                      </span>
                      <span className="flex items-center">
                        <AlertCircle size={12} className="mr-1" /> High: 8
                      </span>
                      <span className="flex items-center">
                        <CheckCircle size={12} className="mr-1" /> Normal: 8
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-gray-500">
                    <Button variant="link" className="p-0 h-auto text-xs">
                      View all actions
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Action Items */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Priority Issues Requiring Attention</CardTitle>
                    <div className="px-6 py-2 rounded-full text-sm border border-gray-300">
                      View All
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* GST Issue 1 */}
                    <div className="bg-[#F8F8F8] rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3 w-2/3">
                          <AlertCircle
                            className="text-amber-500 mt-1"
                            size={20}
                          />
                          <div>
                            <h3 className="font-medium">
                              HSN Code Mismatch - Stitch & Co. Fabrics
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Invoice #SC-2325 for embroidered fabrics is tagged
                              with HSN code 6204, but the items described are
                              more accurately covered under HSN 6211 (still 18%
                              GST). Incorrect HSN codes may prompt questions
                              during a department audit.
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Badge className="text-xs bg-[#E8E8E8] py-1 rounded-md">
                                GST Compliance
                              </Badge>
                              <Badge className="text-xs bg-[#E8E8E8] py-1 rounded-md">
                                HOAD ERP
                              </Badge>
                              <Badge className="text-xs bg-[#E8E8E8] py-1 rounded-md">
                                Invoice: ₹125,000
                              </Badge>
                            </div>
                            <div className="flex mt-4 gap-x-4">
                              <div className="flex items-center px-6 py-1 rounded-full text-sm border border-gray-300 bg-white cursor-pointer">
                                View Invoice
                              </div>
                              <div className="flex items-center px-6 py-1 rounded-full text-sm border bg-[#2154C4] cursor-pointer text-white">
                                View HSN Guide
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* GST Issue 2 */}
                    <div className="bg-[#F8F8F8] border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3 w-2/3">
                          <XCircle className="text-red-500 mt-1" size={20} />
                          <div>
                            <h3 className="font-medium">
                              Invoice Missing in GSTR-2B - Aarohi Textiles
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              I found Invoice #AT-8754 for ₹78,400 in your
                              purchase register, but it's not appearing in your
                              GSTR-2B. The supplier might not have filed GSTR-1
                              or may have filed with an incorrect GSTIN. You
                              risk losing an input credit of ₹14,112 unless
                              resolved.
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              <span className="font-medium">
                                Possible resolutions:
                              </span>{" "}
                              Request the vendor to rectify their GSTR-1 or
                              confirm if the invoice details match on both
                              sides.
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Badge
                                variant="danger"
                                className="text-xs bg-[#FFD3CB] py-1 rounded-md"
                              >
                                Input Tax Credit at Risk
                              </Badge>
                              <Badge className="text-xs bg-[#E8E8E8] py-1 rounded-md">
                                GSTR-2B Mismatch
                              </Badge>
                              <Badge className="text-xs bg-[#E8E8E8] py-1 rounded-md">
                                Tax Amount: ₹14,112
                              </Badge>
                            </div>
                            <div className="flex mt-4 gap-x-4">
                              <div className="flex items-center px-6 py-1 rounded-full text-sm border border-gray-300 bg-white cursor-pointer">
                                View Detail
                              </div>
                              <div className="flex items-center px-6 py-1 rounded-full text-sm border bg-[#2154C4] cursor-pointer text-white">
                                View Impact Analysis
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TDS Issue */}
                    <div className="bg-[#F8F8F8] rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3 w-2/3">
                          <DollarSign className="text-red-500 mt-1" size={20} />
                          <div>
                            <h3 className="font-medium">
                              TDS Not Deducted - Amber Design Consultants
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Invoice #ADC-1042 (₹85,000) for fashion design
                              consulting services was not subject to TDS under
                              section 194J (10%). This can lead to a penalty of
                              ₹8,500 plus interest if not corrected.
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              <span className="font-medium">
                                Required action:
                              </span>{" "}
                              Deduct TDS and deposit promptly. Late deposit
                              triggers 1.5% monthly interest from the due date.
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Badge
                                variant="danger"
                                lassName="text-xs bg-[#FFD3CB] py-1 rounded-md"
                              >
                                TDS Non-compliance
                              </Badge>
                              <Badge lassName="text-xs bg-[#E8E8E8] py-1 rounded-md">
                                Section 194J
                              </Badge>
                              <Badge lassName="text-xs bg-[#E8E8E8] py-1 rounded-md">
                                Amount: ₹8,500
                              </Badge>
                            </div>
                            <div className="flex mt-4 gap-x-4">
                              <div className="flex items-center px-6 py-1 rounded-full text-sm border border-gray-300 bg-white cursor-pointer">
                                View Invoice
                              </div>
                              <div className="flex items-center px-6 py-1 rounded-full text-sm border bg-[#2154C4] cursor-pointer text-white">
                                See Penalty Calculation
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TDS Issue 2 */}
                    <div className="bg-[#F8F8F8] rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3 w-2/3">
                          <AlertCircle
                            className="text-amber-500 mt-1"
                            size={20}
                          />
                          <div>
                            <h3 className="font-medium">
                              Incorrect TDS Section - Ritu Enterprises
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Invoice #RE-478 (₹135,600) was mistakenly deducted
                              under Section 194C (2%) instead of 194J (10%) for
                              creative design services. This results in a TDS
                              shortfall of ₹10,848, which may lead to an IT
                              notice.
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              <span className="font-medium">
                                Classification note:
                              </span>{" "}
                              The invoice states “fashion consultancy,” which
                              qualifies under 194J, not 194C.
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Badge className="text-xs bg-[#E8E8E8] py-1 rounded-md">
                                TDS Section Mismatch
                              </Badge>
                              <Badge className="text-xs bg-[#E8E8E8] py-1 rounded-md">
                                HOAD ERP
                              </Badge>
                              <Badge className="text-xs bg-[#E8E8E8] py-1 rounded-md">
                                Shortfall: ₹10,848
                              </Badge>
                            </div>
                            <div className="flex mt-4 gap-x-4">
                              <div className="flex items-center px-6 py-1 rounded-full text-sm border border-gray-300 bg-white cursor-pointer">
                                View Invoice
                              </div>
                              <div className="flex items-center px-6 py-1 rounded-full text-sm border bg-[#2154C4] cursor-pointer text-white">
                                View TDS Guide
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* GST Compliance Tab */}
            <TabsContent value="gst">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        GSTR-1 vs HOAD ERP (Sales)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">96.8%</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Invoice Matching Rate
                      </div>
                      <div className="mt-3 flex gap-4">
                        <div>
                          <div className="text-sm font-semibold">182</div>
                          <div className="text-xs text-gray-500">
                            Invoices Matched
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-amber-600">
                            4
                          </div>
                          <div className="text-xs text-gray-500">
                            HSN Mismatches
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-red-600">
                            2
                          </div>
                          <div className="text-xs text-gray-500">
                            Missing Invoices
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="py-2">
                      <div className="flex items-start">
                        <div className="mr-2 self-start">
                          <Image
                            src={"./icons/agent.svg"}
                            height={38}
                            width={38}
                            alt="Grid"
                          />
                        </div>
                        <div className="w-[90%]">
                          <p className="text-sm text-[#001D5C]">
                            I found 4 sales invoices with potentially incorrect
                            HSN codes and 2 invoices in Tally that don't appear
                            in your GSTR-1 filing. The most concerning one is
                            Invoice #RS-7752 to RetailStar for ₹142,500 which is
                            in Tally but missing from GSTR-1.
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        GSTR-2B ITC Reconciliation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹ 3,45,870</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Claimable ITC this month
                      </div>
                      <div className="mt-3 flex gap-4">
                        <div>
                          <div className="text-sm font-semibold">142</div>
                          <div className="text-xs text-gray-500">
                            Invoices Matched
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-amber-600">
                            3
                          </div>
                          <div className="text-xs text-gray-500">
                            Amount Mismatches
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-red-600">
                            8
                          </div>
                          <div className="text-xs text-gray-500">
                            Missing in GSTR-2B
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="py-2">
                      <div className="flex items-start">
                        <div className="mr-2 self-start">
                          <Image
                            src={"./icons/agent.svg"}
                            height={38}
                            width={38}
                            alt="Grid"
                          />
                        </div>
                        <div className="w-[90%]">
                          <p className="text-sm text-[#001D5C]">
                            There are 8 purchase invoices totaling ₹42,780 in
                            ITC that don't appear in your GSTR-2B. This means
                            your vendors haven't included these in their GSTR-1
                            filings. The largest is from Global Supplies
                            (₹14,112 ITC at risk)
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        GSTR-3B Preparation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">
                              Output Tax
                            </div>
                            <div className="text-xs text-gray-500">
                              ₹4,32,450
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700">
                            Ready
                          </Badge>
                        </div>
                        <div className="h-px bg-gray-200 my-2"></div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">
                              Input Tax Credit
                            </div>
                            <div className="text-xs text-gray-500">
                              ₹3,45,870
                            </div>
                          </div>
                          <Badge className="bg-amber-100 text-amber-700">
                            Issues Detected
                          </Badge>
                        </div>
                        <div className="h-px bg-gray-200 my-2"></div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">
                              Net Tax Payable
                            </div>
                            <div className="text-xs text-gray-500">₹86,580</div>
                          </div>
                          <Badge className="bg-amber-100 text-amber-700">
                            Pending Review
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="text-sm cursor-pointer text-[#2569FD]">
                        View GSTR-3B Requirements
                      </div>
                    </CardFooter>
                  </Card>
                </div>

                {/* GST Reconciliation Issues */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>GST Reconciliation Issues</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs flex items-center gap-1"
                        >
                          <Filter size={14} /> Filter
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs flex items-center gap-1"
                        >
                          <Download size={14} /> Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">
                              Invoice No.
                            </th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">
                              Vendor/Customer
                            </th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">
                              Issue Type
                            </th>
                            <th className="text-right px-4 py-2 font-medium text-gray-600">
                              Amount
                            </th>
                            <th className="text-right px-4 py-2 font-medium text-gray-600">
                              Tax Impact
                            </th>
                            <th className="text-center px-4 py-2 font-medium text-gray-600">
                              System
                            </th>
                            <th className="text-center px-4 py-2 font-medium text-gray-600">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">SC-2325</td>
                            <td className="px-4 py-3">Stitch & Co. Fabrics</td>
                            <td className="px-4 py-3 text-amber-600">
                              HSN Mismatch
                            </td>
                            <td className="px-4 py-3 text-right">₹1,25,000</td>
                            <td className="px-4 py-3 text-right text-amber-600">
                              Audit Risk
                            </td>
                            <td className="px-4 py-3 text-center">HOAD ERP</td>
                            <td className="px-4 py-3 text-center">
                              <div className="border border-gray-300 rounded-full py-1 cursor-pointer text-[#001D5C] text0sm font-medium">
                                View Details
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">AT-8754</td>
                            <td className="px-4 py-3">Aarohi Textiles</td>
                            <td className="px-4 py-3 text-red-600">
                              Missing in GSTR-2B
                            </td>
                            <td className="px-4 py-3 text-right">₹78,400</td>
                            <td className="px-4 py-3 text-right text-red-600">
                              ₹14,112 ITC
                            </td>
                            <td className="px-4 py-3 text-center">HOAD ERP</td>
                            <td className="px-4 py-3 text-center">
                              <div className="border border-gray-300 rounded-full py-1 cursor-pointer text-[#001D5C] text0sm font-medium">
                                See Impact
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">AF-7752</td>
                            <td className="px-4 py-3">AND Flagship Retail</td>
                            <td className="px-4 py-3 text-red-600">
                              Missing in GSTR-1
                            </td>
                            <td className="px-4 py-3 text-right">₹1,42,500</td>
                            <td className="px-4 py-3 text-right text-red-600">
                              ₹25,650 GST
                            </td>
                            <td className="px-4 py-3 text-center">HOAD ERP</td>
                            <td className="px-4 py-3 text-center">
                              <div className="border border-gray-300 rounded-full py-1 cursor-pointer text-[#001D5C] text0sm font-medium">
                                View Details
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">BD-4421</td>
                            <td className="px-4 py-3">
                              BlueDiamond Accessories
                            </td>
                            <td className="px-4 py-3 text-amber-600">
                              GSTIN Mismatch
                            </td>
                            <td className="px-4 py-3 text-right">₹45,200</td>
                            <td className="px-4 py-3 text-right text-amber-600">
                              ₹8,136 ITC
                            </td>
                            <td className="px-4 py-3 text-center">
                              Retail Partner Sys
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="border border-gray-300 rounded-full py-1 cursor-pointer text-[#001D5C] text0sm font-medium">
                                View Details
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">AS-1109</td>
                            <td className="px-4 py-3">Ace Sewing Machines</td>
                            <td className="px-4 py-3 text-amber-600">
                              Amount Mismatch
                            </td>
                            <td className="px-4 py-3 text-right">
                              ₹32,800 / ₹38,400
                            </td>
                            <td className="px-4 py-3 text-right text-amber-600">
                              ₹1,008 Diff
                            </td>
                            <td className="px-4 py-3 text-center">
                              Export Stores App
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="border border-gray-300 rounded-full py-1 cursor-pointer text-[#001D5C] text0sm font-medium">
                                See Details
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 pb-1 mb-8">
                    <div className="flex items-start">
                      <div className="mr-2 self-start">
                        <Image
                          src={"./icons/agent.svg"}
                          height={38}
                          width={38}
                          alt="Grid"
                        />
                      </div>
                      <div className="w-[90%]">
                        <p className="text-sm text-[#001D5C]">
                          There are 8 purchase invoices totaling ₹42,780 in ITC
                          that don't appear in your GSTR-2B. This means your
                          vendors haven't included these in their GSTR-1
                          filings. The largest is from Global Supplies (₹14,112
                          ITC at risk)
                        </p>
                        <div className="flex mt-4 gap-x-4">
                          <div className="flex items-center px-6 py-1 rounded-full text-sm border border-gray-300 bg-white cursor-pointer">
                            View Invoice
                          </div>
                          <div className="flex items-center px-6 py-1 rounded-full text-sm border bg-[#2154C4] cursor-pointer text-white">
                            View HSN Guide
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* TDS Compliance Tab */}
            <TabsContent value="tds">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        TDS Deducted (Current Month)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹ 2,87,450</div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="font-bold">194C (2%)</div>
                          <div className="text-xs text-gray-500">₹1,24,800</div>
                        </div>
                        <div>
                          <div className="font-bold">194J (10%)</div>
                          <div className="text-xs text-gray-500">₹92,350</div>
                        </div>
                        <div>
                          <div className="font-bold">194I (10%)</div>
                          <div className="text-xs text-gray-500">₹45,300</div>
                        </div>
                        <div>
                          <div className="font-bold">Others</div>
                          <div className="text-xs text-gray-500">₹25,000</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="py-2">
                      <div className="flex items-start">
                        <div className="mr-2 self-start">
                          <Image
                            src={"./icons/agent.svg"}
                            height={38}
                            width={38}
                            alt="Grid"
                          />
                        </div>
                        <div className="w-[90%]">
                          <p className="text-sm text-[#001D5C]">
                            I found 4 sales invoices with potentially incorrect
                            HSN codes and 2 invoices in Tally that don't appear
                            in your GSTR-1 filing. The most concerning one is
                            Invoice #RS-7752 to RetailStar for ₹142,500 which is
                            in Tally but missing from GSTR-1.
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        TDS Filing Compliance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-bold">
                              TDS Deducted
                            </div>
                            <div className="text-xs text-gray-500">
                              In ERP records
                            </div>
                          </div>
                          <div className="text-sm font-bold">₹2,87,450</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-bold">TDS Paid</div>
                            <div className="text-xs text-gray-500">
                              Deposited to Dept
                            </div>
                          </div>
                          <div className="text-sm font-bold">₹2,68,602</div>
                        </div>
                        <div className="h-px bg-gray-200 my-1"></div>
                        <div className="flex items-center justify-between text-red-600">
                          <div className="font-bold text-xs">Shortfall</div>
                          <div className="font-bold text-xs">₹18,848</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="py-2">
                      <div className="flex items-start">
                        <div className="mr-2 self-start">
                          <Image
                            src={"./icons/agent.svg"}
                            height={38}
                            width={38}
                            alt="Grid"
                          />
                        </div>
                        <div className="w-[90%]">
                          <p className="text-sm text-[#001D5C]">
                            I found 4 sales invoices with potentially incorrect
                            HSN codes and 2 invoices in Tally that don't appear
                            in your GSTR-1 filing. The most concerning one is
                            Invoice #RS-7752 to RetailStar for ₹142,500 which is
                            in Tally but missing from GSTR-1.
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">
                        PAN Verification
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">98.2%</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Vendors with valid PAN
                      </div>
                      <div className="mt-3 flex gap-4">
                        <div>
                          <div className="text-sm font-bold">382</div>
                          <div className="text-xs text-gray-500">
                            Total Vendors
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-red-600">
                            7
                          </div>
                          <div className="text-xs text-gray-500">
                            Invalid/Missing PAN
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="py-2">
                      <div className="flex items-start">
                        <div className="mr-2 self-start">
                          <Image
                            src={"./icons/agent.svg"}
                            height={38}
                            width={38}
                            alt="Grid"
                          />
                        </div>
                        <div className="w-[90%]">
                          <p className="text-sm text-[#001D5C]">
                            I found 4 sales invoices with potentially incorrect
                            HSN codes and 2 invoices in Tally that don't appear
                            in your GSTR-1 filing. The most concerning one is
                            Invoice #RS-7752 to RetailStar for ₹142,500 which is
                            in Tally but missing from GSTR-1.
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
                {/* TDS Issues Table */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>TDS Compliance Issues</CardTitle>
                      <div className="border border-gray-300 rounded-full px-6 py-1 cursor-pointer text-[#001D5C] text0sm font-medium">
                        View All
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">
                              Vendor
                            </th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">
                              Invoice #
                            </th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">
                              Issue
                            </th>
                            <th className="text-center px-4 py-2 font-medium text-gray-600">
                              Section
                            </th>
                            <th className="text-right px-4 py-2 font-medium text-gray-600">
                              Amount
                            </th>
                            <th className="text-right px-4 py-2 font-medium text-gray-600">
                              TDS Impact
                            </th>
                            <th className="text-center px-4 py-2 font-medium text-gray-600">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              Amber Design Consultants
                            </td>
                            <td className="px-4 py-3">ADC-1042</td>
                            <td className="px-4 py-3 text-red-600">
                              TDS Not Deducted
                            </td>
                            <td className="px-4 py-3 text-center">
                              194J (10%)
                            </td>
                            <td className="px-4 py-3 text-right">₹85,000</td>
                            <td className="px-4 py-3 text-right text-red-600">
                              ₹8,500
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="border w-[80%] mx-auto border-gray-300 rounded-full py-1 cursor-pointer text-[#001D5C] text0sm font-medium">
                                View Invoice
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">Ritu Enterprises</td>
                            <td className="px-4 py-3">RE-478</td>
                            <td className="px-4 py-3 text-amber-600">
                              Incorrect Section
                            </td>
                            <td className="px-4 py-3 text-center">194C→194J</td>
                            <td className="px-4 py-3 text-right">₹1,35,600</td>
                            <td className="px-4 py-3 text-right text-amber-600">
                              ₹10,848
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="border w-[80%] mx-auto border-gray-300 rounded-full py-1 cursor-pointer text-[#001D5C] text0sm font-medium">
                                See Analysis
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">Global Trim Supplies</td>
                            <td className="px-4 py-3">GTS-221</td>
                            <td className="px-4 py-3 text-amber-600">
                              Threshold Crossed
                            </td>
                            <td className="px-4 py-3 text-center">194C (2%)</td>
                            <td className="px-4 py-3 text-right">₹45,200</td>
                            <td className="px-4 py-3 text-right text-amber-600">
                              ₹904
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="border w-[80%] mx-auto border-gray-300 rounded-full py-1 cursor-pointer text-[#001D5C] text0sm font-medium">
                                View Details
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">Zeta Label Solutions</td>
                            <td className="px-4 py-3">ZLS-875</td>
                            <td className="px-4 py-3 text-red-600">
                              Invalid PAN
                            </td>
                            <td className="px-4 py-3 text-center">
                              194J (20%)
                            </td>
                            <td className="px-4 py-3 text-right">₹64,800</td>
                            <td className="px-4 py-3 text-right text-red-600">
                              ₹12,960
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="border w-[80%] mx-auto border-gray-300 rounded-full py-1 cursor-pointer text-[#001D5C] text0sm font-medium">
                                View Requireents
                              </div>
                            </td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3">Sigma Store Interiors</td>
                            <td className="px-4 py-3">SSI-334</td>
                            <td className="px-4 py-3 text-red-600">
                              Late Payment
                            </td>
                            <td className="px-4 py-3 text-center">194C (2%)</td>
                            <td className="px-4 py-3 text-right">₹72,500</td>
                            <td className="px-4 py-3 text-right text-red-600">
                              ₹1,450 + Interest
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="border w-[80%] mx-auto border-gray-300 rounded-full py-1 cursor-pointer text-[#001D5C] text0sm font-medium">
                                Calculate Interest
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 pb-1 mb-8">
                    <div className="flex items-start">
                      <div className="mr-2 self-start">
                        <Image
                          src={"./icons/agent.svg"}
                          height={38}
                          width={38}
                          alt="Grid"
                        />
                      </div>
                      <div className="w-[90%]">
                        <p className="text-sm text-[#001D5C]">
                          I've detected a potential pattern with Aryan
                          Enterprises - they're providing technical services,
                          but their invoices are often categorized incorrectly
                          under 194C (contracts) instead of 194J (professional
                          services). This has resulted in under-deduction of
                          approximately ₹22,500 in the past quarter. Would you
                          like me to review all their past invoices?
                        </p>
                        <div className="flex mt-4 gap-x-4">
                          <div className="flex items-center px-6 py-1 rounded-full text-sm border border-gray-300 bg-white cursor-pointer">
                            Dismiss
                          </div>
                          <div className="flex items-center px-6 py-1 rounded-full text-sm border bg-[#2154C4] cursor-pointer text-white">
                            View Historical Pattern
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Risk Analysis Tab */}
          </Tabs>
        </div>

        {/* Chat with Agent */}
        {/* <div className="fixed bottom-6 right-6">
          {/* <div className="bg-white p-3 rounded-lg border shadow-md mb-4 max-w-sm ml-auto">
          <p className="text-sm">
            We’ve seen recurring compliance gaps with certain textile suppliers.
            Interested in a pattern analysis to track frequency and potential
            losses?
          </p>
          <div className="flex justify-end gap-2 mt-3">
            <Button size="sm" variant="outline">
              Not Now
            </Button>
            <Button size="sm">Show Analysis</Button>
          </div>
        </div> */}
        {/* <Button className="h-12 w-12 rounded-full shadow-lg flex items-center justify-center">
            <Send size={16} />
          </Button> 
        </div> */}
      </div>
    </div>
  );
};

export default GSTTDSComplianceDashboard;

"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  MessageSquare,
  Info,
  Zap,
  AlertCircle,
  FileText,
  Users,
  RefreshCw,
  Calendar,
  Check,
  BarChart2,
  ArrowRight,
  Filter,
  Download,
  ChevronDown,
  Search,
  Sliders,
  Bell,
  Star,
  CreditCard,
  ArrowUpRight,
  ExternalLink,
  Wallet,
  Menu,
  X,
  PlusCircle,
  Eye,
  EyeOff,
  Settings,
  HelpCircle,
} from "lucide-react";

// Knight Frank brand colors with expanded palette
const COLORS = {
  primary: "#C00000", // Knight Frank red
  primaryLight: "#F5DBDB",
  primaryLighter: "#FADEDE",
  primaryDark: "#900000",
  primaryDarker: "#700000",
  secondary: "#1A1A1A", // Knight Frank dark gray/black
  secondaryLight: "#E0E0E0",
  secondaryLighter: "#F0F0F0",
  accent: "#333333", // Dark gray as accent
  accentLight: "#EEEEEE", // Light gray background
  success: "#00A651", // Professional green
  successLight: "#E7F5EE",
  warning: "#F4C242", // Professional amber
  warningLight: "#FEF7E7",
  danger: "#C00000", // Using Knight Frank red for danger/alerts
  dangerLight: "#FCE8E8",
  caution: "#E87722", // Professional orange
  cautionLight: "#FEF0E8",
  neutral: "#595959", // Mid gray
  neutralLight: "#F9FAFB",
  background: "#FFFFFF",
  lightBg: "#F5F5F5",
  border: "#E5E7EB",
  text: {
    primary: "#000000", // Black for primary text
    secondary: "#333333", // Dark gray for secondary text
    muted: "#595959", // Medium gray for less important text
    light: "#6B7280", // Light gray for tertiary text
  },
};

const CashFlowDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedSite, setSelectedSite] = useState("all");
  const [timeframe, setTimeframe] = useState("30d");
  const [activeTab, setActiveTab] = useState("briefing");
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Handle site selection
  const handleSiteChange = (e) => {
    setSelectedSite(e.target.value);
  };

  // Handle timeframe selection
  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  // Simulated data loading effect
  useEffect(() => {
    setIsLoading(true);

    // Simulate API/data processing delay
    setTimeout(() => {
      setData(sampleData);
      setIsLoading(false);
    }, 1000);
  }, [selectedSite, timeframe]);

  // Sample data structure
  const sampleData = {
    overview: {
      stats: {
        averageDSO: 30.5,
        averageDPO: 60.5,
        totalInvoiced: 43400000,
        totalContribution: 0.21,
        outstandingInvoices: 8620000,
        pendingPayments: 15800000,
      },
    },
    sites: [
      {
        id: "godrej",
        name: "Godrej and Boyce",
        stats: {
          averageDSO: 25,
          averageDPO: 76,
          totalInvoiced: 24800000,
          totalContribution: 0.2,
          outstandingInvoices: 3200000,
          pendingPayments: 6800000,
        },
        briefing: [
          {
            type: "critical",
            message:
              "Express Housekeepers has exceeded 165 days without payment",
            action: "Prioritize immediate payment of at least ₹8.5 Lakhs",
          },
          {
            type: "warning",
            message: "Multiple vendors stretched beyond 90 days on this site",
            action: "Review payment schedule and rebalance vendor priorities",
          },
          {
            type: "info",
            message: "Client payments are on schedule with 25-day average DSO",
            action: "Maintain current collection strategy",
          },
        ],
        vendors: [
          {
            name: "Express Housekeepers",
            dpo: 165,
            exposure: 5600000,
            risk: "Critical",
            paymentVelocity: 45,
            id: "v1",
          },
          {
            name: "FMX PropTech",
            dpo: 106,
            exposure: 2200000,
            risk: "High",
            paymentVelocity: 72,
            id: "v2",
          },
          {
            name: "Sogo Computers",
            dpo: 106,
            exposure: 600000,
            risk: "High",
            paymentVelocity: 85,
            id: "v3",
          },
          {
            name: "Manish Pandey",
            dpo: 34,
            exposure: 800000,
            risk: "Low",
            paymentVelocity: 40,
            id: "v4",
          },
          {
            name: "Applied Enterprise",
            dpo: 11,
            exposure: 1200000,
            risk: "Low",
            paymentVelocity: 15,
            id: "v5",
          },
        ],
        vendorDistribution: [
          { range: "0-30 days", count: 2 },
          { range: "31-60 days", count: 0 },
          { range: "61-90 days", count: 0 },
          { range: "91+ days", count: 3 },
        ],
        invoices: [
          {
            id: "INV-695",
            date: "2025-03-01",
            amount: 552778,
            status: "Overdue",
            daysPending: 49,
          },
          {
            id: "INV-894",
            date: "2025-03-31",
            amount: 552778,
            status: "Overdue",
            daysPending: 19,
          },
          {
            id: "INV-986",
            date: "2025-04-01",
            amount: 552778,
            status: "Pending",
            daysPending: 18,
          },
          {
            id: "INV-987",
            date: "2025-04-08",
            amount: 552778,
            status: "Pending",
            daysPending: 11,
          },
          {
            id: "INV-988",
            date: "2025-04-15",
            amount: 552778,
            status: "Paid",
            daysPending: 0,
          },
        ],
        invoiceDistribution: [
          { status: "Paid", value: 552778 },
          { status: "Pending", value: 1105556 },
          { status: "Overdue", value: 1105556 },
        ],
        invoiceAging: [
          { range: "0-30 days", value: 1658334 },
          { range: "31-60 days", value: 552778 },
          { range: "61-90 days", value: 0 },
          { range: "90+ days", value: 0 },
        ],
        cashFlow: [
          { month: "Jan", income: 1800000, expenses: 1400000 },
          { month: "Feb", income: 2100000, expenses: 1650000 },
          { month: "Mar", income: 1950000, expenses: 1700000 },
          { month: "Apr", income: 2300000, expenses: 1850000 },
        ],
      },
      {
        id: "mahindra",
        name: "Mahindra Tech",
        stats: {
          averageDSO: 28,
          averageDPO: 45,
          totalInvoiced: 18600000,
          totalContribution: 0.22,
          outstandingInvoices: 2800000,
          pendingPayments: 4500000,
        },
        briefing: [
          {
            type: "success",
            message: "DSO decreased from 36 to 28 days in the last 3 months",
            action: "Continue excellent collection practices with this client",
          },
          {
            type: "warning",
            message: "Vendor payment imbalance detected (130-day spread)",
            action: "Review vendor payment allocation for fairness",
          },
        ],
        vendors: [
          {
            name: "Express Housekeepers",
            dpo: 165,
            exposure: 2800000,
            risk: "Critical",
            paymentVelocity: 45,
            id: "v1",
          },
          {
            name: "SecureTech",
            dpo: 55,
            exposure: 3200000,
            risk: "Medium",
            paymentVelocity: 42,
            id: "v6",
          },
          {
            name: "CleanWorks",
            dpo: 48,
            exposure: 2800000,
            risk: "Low",
            paymentVelocity: 38,
            id: "v7",
          },
          {
            name: "FixIt Services",
            dpo: 42,
            exposure: 1200000,
            risk: "Low",
            paymentVelocity: 35,
            id: "v8",
          },
          {
            name: "Power Solutions",
            dpo: 35,
            exposure: 900000,
            risk: "Low",
            paymentVelocity: 30,
            id: "v9",
          },
        ],
        vendorDistribution: [
          { range: "0-30 days", count: 0 },
          { range: "31-60 days", count: 4 },
          { range: "61-90 days", count: 0 },
          { range: "91+ days", count: 1 },
        ],
        invoices: [
          {
            id: "INV-721",
            date: "2025-03-15",
            amount: 650000,
            status: "Overdue",
            daysPending: 35,
          },
          {
            id: "INV-845",
            date: "2025-04-01",
            amount: 650000,
            status: "Pending",
            daysPending: 18,
          },
          {
            id: "INV-902",
            date: "2025-04-15",
            amount: 650000,
            status: "Pending",
            daysPending: 4,
          },
          {
            id: "INV-925",
            date: "2025-04-17",
            amount: 650000,
            status: "Paid",
            daysPending: 0,
          },
        ],
        invoiceDistribution: [
          { status: "Paid", value: 650000 },
          { status: "Pending", value: 1300000 },
          { status: "Overdue", value: 650000 },
        ],
        invoiceAging: [
          { range: "0-30 days", value: 1300000 },
          { range: "31-60 days", value: 650000 },
          { range: "61-90 days", value: 0 },
          { range: "90+ days", value: 0 },
        ],
        cashFlow: [
          { month: "Jan", income: 1500000, expenses: 1200000 },
          { month: "Feb", income: 1800000, expenses: 1350000 },
          { month: "Mar", income: 1650000, expenses: 1500000 },
          { month: "Apr", income: 2000000, expenses: 1600000 },
        ],
      },
      {
        id: "infosys",
        name: "Infosys Campus",
        stats: {
          averageDSO: 47,
          averageDPO: 58,
          totalInvoiced: 15600000,
          totalContribution: 0.19,
          outstandingInvoices: 2620000,
          pendingPayments: 4500000,
        },
        briefing: [
          {
            type: "warning",
            message:
              "Client payment delayed by 15 days compared to contract terms",
            action: "Follow up with client finance department",
          },
          {
            type: "critical",
            message:
              "Express Housekeepers approaching critical payment threshold",
            action: "Allocate ₹5 Lakhs for immediate partial payment",
          },
        ],
        vendors: [
          {
            name: "Express Housekeepers",
            dpo: 102,
            exposure: 2500000,
            risk: "High",
            paymentVelocity: 45,
            id: "v1",
          },
          {
            name: "Building Systems Ltd",
            dpo: 65,
            exposure: 1800000,
            risk: "Medium",
            paymentVelocity: 55,
            id: "v10",
          },
          {
            name: "Safety First Corp",
            dpo: 45,
            exposure: 1200000,
            risk: "Low",
            paymentVelocity: 40,
            id: "v11",
          },
        ],
        vendorDistribution: [
          { range: "0-30 days", count: 0 },
          { range: "31-60 days", count: 1 },
          { range: "61-90 days", count: 1 },
          { range: "91+ days", count: 1 },
        ],
        invoices: [
          {
            id: "INV-632",
            date: "2025-03-01",
            amount: 520000,
            status: "Overdue",
            daysPending: 49,
          },
          {
            id: "INV-745",
            date: "2025-04-01",
            amount: 520000,
            status: "Pending",
            daysPending: 18,
          },
          {
            id: "INV-801",
            date: "2025-04-15",
            amount: 520000,
            status: "Pending",
            daysPending: 4,
          },
        ],
        invoiceDistribution: [
          { status: "Paid", value: 0 },
          { status: "Pending", value: 1040000 },
          { status: "Overdue", value: 520000 },
        ],
        invoiceAging: [
          { range: "0-30 days", value: 1040000 },
          { range: "31-60 days", value: 520000 },
          { range: "61-90 days", value: 0 },
          { range: "90+ days", value: 0 },
        ],
        cashFlow: [
          { month: "Jan", income: 1300000, expenses: 1100000 },
          { month: "Feb", income: 1450000, expenses: 1250000 },
          { month: "Mar", income: 1350000, expenses: 1400000 },
          { month: "Apr", income: 1600000, expenses: 1300000 },
        ],
      },
    ],
    insights: [
      {
        type: "critical",
        message:
          "Express Housekeepers has 3 sites with DPO > 120 days, risking service disruption",
        action: "Review payment priority across affected sites",
      },
      {
        type: "warning",
        message:
          "Average DSO increased by 2.5 days across 4 sites compared to last month",
        action: "Investigate delayed client payments",
      },
      {
        type: "info",
        message:
          "Cash velocity improved for 6 sites, with 12% reduction in average payment time",
        action: "Continue optimizing payment processes",
      },
    ],
    notifications: [
      {
        id: 1,
        type: "critical",
        message: "Urgent: Express Housekeepers payment overdue by 165 days",
        time: "2 hours ago",
      },
      {
        id: 2,
        type: "warning",
        message: "Two invoices from Godrej site require immediate follow-up",
        time: "4 hours ago",
      },
      {
        id: 3,
        type: "info",
        message: "Mahindra Tech payment received, DSO improved to 28 days",
        time: "8 hours ago",
      },
      {
        id: 4,
        type: "success",
        message: "Payment to FixIt Services processed successfully",
        time: "1 day ago",
      },
    ],
  };

  const vendorData = [
    {
      id: "v1",
      name: "Express Housekeepers",
      dpo: 165,
      exposure: 5600000,
      risk: "Critical",
      paymentVelocity: 45,
      invoicesRaised: 12,
      invoicesCleared: 4,
      overdue: 8,
      site: "Godrej and Boyce",
    },
    {
      id: "v2",
      name: "FMX PropTech",
      dpo: 106,
      exposure: 2200000,
      risk: "High",
      paymentVelocity: 72,
      invoicesRaised: 8,
      invoicesCleared: 5,
      overdue: 3,
      site: "Godrej and Boyce",
    },
    {
      id: "v3",
      name: "Sogo Computers",
      dpo: 106,
      exposure: 600000,
      risk: "High",
      paymentVelocity: 85,
      invoicesRaised: 8,
      invoicesCleared: 5,
      overdue: 3,
      site: "Godrej and Boyce",
    },
    {
      id: "v4",
      name: "Manish Pandey",
      dpo: 34,
      exposure: 800000,
      risk: "Low",
      paymentVelocity: 40,
      invoicesRaised: 6,
      invoicesCleared: 5,
      overdue: 1,
      site: "Godrej and Boyce",
    },
    {
      id: "v5",
      name: "Applied Enterprise",
      dpo: 11,
      exposure: 1200000,
      risk: "Low",
      paymentVelocity: 15,
      invoicesRaised: 6,
      invoicesCleared: 5,
      overdue: 1,
      site: "Infosys Campus",
    },
    {
      id: "v6",
      name: "SecureTech",
      dpo: 55,
      exposure: 3200000,
      risk: "Medium",
      paymentVelocity: 42,
      invoicesRaised: 10,
      invoicesCleared: 7,
      overdue: 3,
      site: "Mahindra Tech",
    },
    {
      id: "v7",
      name: "CleanWorks",
      dpo: 48,
      exposure: 2800000,
      risk: "Low",
      paymentVelocity: 38,
      invoicesRaised: 10,
      invoicesCleared: 7,
      overdue: 3,
      site: "Mahindra Tech",
    },
  ];

  // Filter vendors based on selected site
  const filteredVendors =
    selectedSite === "all"
      ? vendorData
      : vendorData.filter((vendor) => vendor.site === "Godrej and Boyce");

  // Get current site data
  const getCurrentSiteData = () => {
    if (!data) return null;

    if (selectedSite === "all") {
      return {
        stats: data.overview.stats,
        briefing: data.sites
          .reduce((acc, site) => {
            return [
              ...acc,
              ...site.briefing.map((item) => ({
                ...item,
                site: site.name,
              })),
            ];
          }, [])
          .sort((a, b) => {
            const typeOrder = { critical: 0, warning: 1, info: 2, success: 3 };
            return typeOrder[a.type] - typeOrder[b.type];
          })
          .slice(0, 5),
        vendors: data.sites.reduce((acc, site) => {
          return [
            ...acc,
            ...site.vendors.map((vendor) => ({
              ...vendor,
              site: site.name,
            })),
          ];
        }, []),
        invoices: data.sites.reduce((acc, site) => {
          return [
            ...acc,
            ...site.invoices.map((invoice) => ({
              ...invoice,
              site: site.name,
            })),
          ];
        }, []),
        cashFlow: data.sites
          .reduce((acc, site) => {
            if (!site.cashFlow) return acc;

            // Sum up the cash flow data from all sites
            site.cashFlow.forEach((monthData) => {
              const existingMonth = acc.find(
                (item) => item.month === monthData.month
              );
              if (existingMonth) {
                existingMonth.income += monthData.income;
                existingMonth.expenses += monthData.expenses;
              } else {
                acc.push({ ...monthData });
              }
            });

            return acc;
          }, [])
          .sort((a, b) => {
            const months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            return months.indexOf(a.month) - months.indexOf(b.month);
          }),
      };
    } else {
      const site = data.sites.find((s) => s.id === selectedSite);
      return {
        stats: site.stats,
        briefing: site.briefing,
        vendors: site.vendors,
        invoices: site.invoices,
        vendorDistribution: site.vendorDistribution,
        invoiceDistribution: site.invoiceDistribution,
        invoiceAging: site.invoiceAging,
        cashFlow: site.cashFlow,
      };
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-secondary">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  const currentData = getCurrentSiteData();

  return (
    <div className="bg-gray-50 h-screen overflow-y-auto flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-primary">
                    Knight Frank FM
                  </h1>
                  <p className="text-xs text-text-secondary">
                    Cash Flow Dashboard
                  </p>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Header Controls */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search vendors or invoices..."
                  className="w-56 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5 text-neutral" />
                  <span className="absolute top-1 right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {data.notifications.length}
                  </span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-medium text-sm text-gray-700">
                        Notifications
                      </h3>
                      <button className="text-xs text-primary font-medium">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {data.notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-3 border-b border-gray-100 hover:bg-gray-50"
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  notification.type === "critical"
                                    ? "bg-red-100"
                                    : notification.type === "warning"
                                    ? "bg-amber-100"
                                    : notification.type === "success"
                                    ? "bg-green-100"
                                    : "bg-blue-100"
                                }`}
                              >
                                {notification.type === "critical" ? (
                                  <AlertCircle className="h-5 w-5 text-primary" />
                                ) : notification.type === "warning" ? (
                                  <AlertTriangle className="h-5 w-5 text-warning" />
                                ) : notification.type === "success" ? (
                                  <Check className="h-5 w-5 text-success" />
                                ) : (
                                  <Info className="h-5 w-5 text-blue-500" />
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-700">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 bg-gray-50 text-center">
                      <button className="text-sm text-primary font-medium flex items-center justify-center w-full">
                        View all notifications
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Settings className="h-5 w-5 text-neutral" />
              </button>

              {/* Help */}
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <HelpCircle className="h-5 w-5 text-neutral" />
              </button>

              {/* User Avatar - simplified for this example */}
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium text-sm">
                AM
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-2 mt-2 space-y-1 border-t border-gray-200">
              <div className="px-2 py-2">
                <input
                  type="text"
                  placeholder="Search vendors or invoices..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
              <button className="flex items-center space-x-2 w-full px-2 py-2 text-left text-text-secondary hover:bg-gray-100 rounded-md">
                <FileText className="h-5 w-5" />
                <span>Reports</span>
              </button>
              <button className="flex items-center space-x-2 w-full px-2 py-2 text-left text-text-secondary hover:bg-gray-100 rounded-md">
                <Users className="h-5 w-5" />
                <span>Vendors</span>
              </button>
              <button className="flex items-center space-x-2 w-full px-2 py-2 text-left text-text-secondary hover:bg-gray-100 rounded-md">
                <Wallet className="h-5 w-5" />
                <span>Payments</span>
              </button>
              <button className="flex items-center space-x-2 w-full px-2 py-2 text-left text-text-secondary hover:bg-gray-100 rounded-md">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Filter Controls - Moved below header */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
            {/* Left side - Site and Timeframe Selectors */}
            <div className="flex flex-wrap items-center space-x-2">
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="relative inline-block">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Site
                    </label>
                    <select
                      value={selectedSite}
                      onChange={handleSiteChange}
                      className="block appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="all">All Sites</option>
                      {data.sites.map((site) => (
                        <option key={site.id} value={site.id}>
                          {site.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="relative inline-block">
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Timeframe
                    </label>
                    <select
                      value={timeframe}
                      onChange={handleTimeframeChange}
                      className="block appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="30d">Last 30 Days</option>
                      <option value="90d">Last 90 Days</option>
                      <option value="12m">Last 12 Months</option>
                      <option value="ytd">Year to Date</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-5">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <Filter className="h-4 w-4 mr-2" />
                <span>Advanced Filters</span>
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <RefreshCw className="h-4 w-4 mr-2" />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-primary">
                Cash Flow Management Dashboard
              </h2>
              <p className="text-gray-500 mt-1">
                Track, analyze, and optimize your facility management cash flow
              </p>
            </div>

            {/* Dashboard Overview */}
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Dashboard Overview
              </h2>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* DSO Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <Clock className="h-5 w-5 text-primary mr-2" />
                          <h3 className="text-sm font-medium text-gray-500">
                            Average DSO
                          </h3>
                          {currentData.stats.averageDSO < 35 ? (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-success">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              Good
                            </span>
                          ) : currentData.stats.averageDSO < 45 ? (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-warning">
                              Neutral
                            </span>
                          ) : (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-primary">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Attention
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-bold text-text-primary">
                            {currentData.stats.averageDSO.toFixed(1)}
                          </p>
                          <span className="ml-1 text-sm text-text-secondary font-normal">
                            days
                          </span>
                        </div>
                      </div>
                      <div className="bg-primaryLight p-2 rounded-lg">
                        <ArrowUpRight
                          className={`h-6 w-6 ${
                            currentData.stats.averageDSO < 35
                              ? "text-success"
                              : "text-primary"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-text-secondary">
                        Days to collect payment
                      </p>
                      <button className="text-xs text-primary font-medium flex items-center">
                        More details
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* DPO Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <Clock className="h-5 w-5 text-accent mr-2" />
                          <h3 className="text-sm font-medium text-gray-500">
                            Average DPO
                          </h3>
                          {currentData.stats.averageDPO < 60 ? (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-success">
                              Balanced
                            </span>
                          ) : currentData.stats.averageDPO < 90 ? (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-warning">
                              Moderate
                            </span>
                          ) : (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-primary">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Extended
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-bold text-text-primary">
                            {currentData.stats.averageDPO.toFixed(1)}
                          </p>
                          <span className="ml-1 text-sm text-text-secondary font-normal">
                            days
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <ArrowUpRight
                          className={`h-6 w-6 ${
                            currentData.stats.averageDPO < 60
                              ? "text-success"
                              : currentData.stats.averageDPO < 90
                              ? "text-warning"
                              : "text-primary"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-text-secondary">
                        Days to pay vendors
                      </p>
                      <button className="text-xs text-primary font-medium flex items-center">
                        More details
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Outstanding Invoices Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <FileText className="h-5 w-5 text-blue-500 mr-2" />
                          <h3 className="text-sm font-medium text-gray-500">
                            Outstanding Invoices
                          </h3>
                          {currentData.stats.outstandingInvoices <
                          currentData.stats.pendingPayments ? (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-warning">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Deficit
                            </span>
                          ) : (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-success">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Positive
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-bold text-text-primary">
                            ₹
                            {(
                              currentData.stats.outstandingInvoices / 100000
                            ).toFixed(2)}
                          </p>
                          <span className="ml-1 text-sm text-text-secondary font-normal">
                            Lakhs
                          </span>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <CreditCard className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                        <span>Receivables vs Payables</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="h-2 flex-1 bg-primary bg-opacity-10 rounded-full overflow-hidden">
                          <div
                            className="bg-primary h-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <div className="h-4 w-0.5 bg-gray-300"></div>
                        <div className="h-2 flex-1 bg-secondary bg-opacity-10 rounded-full overflow-hidden">
                          <div
                            className="bg-secondary h-full"
                            style={{
                              width: `${
                                (currentData.stats.pendingPayments /
                                  currentData.stats.outstandingInvoices) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          ₹
                          {(
                            currentData.stats.outstandingInvoices / 100000
                          ).toFixed(2)}
                          L
                        </span>
                        <span>
                          ₹
                          {(currentData.stats.pendingPayments / 100000).toFixed(
                            2
                          )}
                          L
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-text-secondary">
                        Awaiting payment from clients
                      </p>
                      <button className="text-xs text-primary font-medium flex items-center">
                        More details
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pending Payments Card */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-1">
                          <Users className="h-5 w-5 text-blue-500 mr-2" />
                          <h3 className="text-sm font-medium text-gray-500">
                            Pending Payments
                          </h3>
                          {currentData.stats.pendingPayments /
                            currentData.stats.totalInvoiced <
                          0.1 ? (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-success">
                              Healthy
                            </span>
                          ) : (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-primary">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              High
                            </span>
                          )}
                        </div>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-bold text-text-primary">
                            ₹
                            {(
                              currentData.stats.pendingPayments / 100000
                            ).toFixed(2)}
                          </p>
                          <span className="ml-1 text-sm text-text-secondary font-normal">
                            Lakhs
                          </span>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <Wallet className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                        <span>
                          % of Annual Revenue:{" "}
                          {(
                            (currentData.stats.pendingPayments /
                              currentData.stats.totalInvoiced) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={
                            currentData.stats.pendingPayments /
                              currentData.stats.totalInvoiced <
                            0.1
                              ? "bg-success h-full"
                              : "bg-primary h-full"
                          }
                          style={{
                            width: `${Math.min(
                              100,
                              (currentData.stats.pendingPayments /
                                (currentData.stats.totalInvoiced * 0.2)) *
                                100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>10%</span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-text-secondary">
                        Due to vendors
                      </p>
                      <button className="text-xs text-primary font-medium flex items-center">
                        More details
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cash Flow Chart */}
              {currentData.cashFlow && (
                <div className="mt-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-text-primary">
                      Cash Flow Trend
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
                        <span className="text-xs text-text-secondary">
                          Income
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-secondary mr-1"></div>
                        <span className="text-xs text-text-secondary">
                          Expenses
                        </span>
                      </div>
                      <button className="ml-4 text-xs text-primary font-medium flex items-center">
                        View Details
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={currentData.cashFlow}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          strokeOpacity={0.3}
                        />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: COLORS.text.primary }}
                        />
                        <YAxis
                          tick={{ fill: COLORS.text.primary }}
                          tickFormatter={(value) =>
                            `₹${(value / 100000).toFixed(0)}L`
                          }
                        />
                        <Tooltip
                          formatter={(value) => [
                            `₹${(value / 100000).toFixed(2)} Lakhs`,
                            "",
                          ]}
                          labelFormatter={(label) => `Month: ${label}`}
                          contentStyle={{
                            backgroundColor: COLORS.background,
                            borderColor: COLORS.secondaryLight,
                            borderRadius: "4px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            color: COLORS.text.primary,
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="income"
                          stroke={COLORS.primary}
                          fill={COLORS.primaryLight}
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="expenses"
                          stroke={COLORS.secondary}
                          fill={COLORS.secondaryLight}
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs Container */}
            <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("briefing")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
                    activeTab === "briefing"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text-secondary hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Morning Briefing
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("vendors")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
                    activeTab === "vendors"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text-secondary hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Vendor Management
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("invoices")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
                    activeTab === "invoices"
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text-secondary hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Client Invoices
                  </div>
                </button>
              </div>

              {/* Tab Content - Morning Briefing */}
              {activeTab === "briefing" && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-primary">
                      {selectedSite === "all"
                        ? "Cross-Site Priority Insights"
                        : `Insights for ${
                            data.sites.find((site) => site.id === selectedSite)
                              .name
                          }`}
                    </h3>
                    <div className="text-sm text-text-secondary flex items-center">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      <span>Updated 2 hours ago</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentData.briefing.map((item, idx) => (
                      <div
                        key={idx}
                        className={`rounded-lg p-5 shadow-sm transition-all duration-200 hover:shadow-md border-l-4 ${
                          item.type === "critical"
                            ? "border-primary bg-white"
                            : item.type === "warning"
                            ? "border-warning bg-white"
                            : item.type === "success"
                            ? "border-success bg-white"
                            : "border-blue-400 bg-white"
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5 mr-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                item.type === "critical"
                                  ? "bg-red-100"
                                  : item.type === "warning"
                                  ? "bg-amber-100"
                                  : item.type === "success"
                                  ? "bg-green-100"
                                  : "bg-blue-100"
                              }`}
                            >
                              {item.type === "critical" ? (
                                <AlertCircle className="h-5 w-5 text-primary" />
                              ) : item.type === "warning" ? (
                                <AlertTriangle className="h-5 w-5 text-warning" />
                              ) : item.type === "success" ? (
                                <Check className="h-5 w-5 text-success" />
                              ) : (
                                <Info className="h-5 w-5 text-blue-500" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-medium text-text-primary mb-1">
                              {selectedSite === "all" &&
                                item.site &&
                                `[${item.site}] `}
                              {item.type === "critical"
                                ? "Urgent Action Required"
                                : item.type === "warning"
                                ? "Attention Needed"
                                : item.type === "success"
                                ? "Positive Update"
                                : "For Your Information"}
                            </h4>
                            <p className="text-sm text-text-secondary mb-3">
                              {item.message}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <div
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                    item.type === "critical"
                                      ? "bg-red-50 text-primary"
                                      : item.type === "warning"
                                      ? "bg-amber-50 text-warning"
                                      : item.type === "success"
                                      ? "bg-green-50 text-success"
                                      : "bg-blue-50 text-blue-500"
                                  }`}
                                >
                                  {item.action}
                                </div>
                              </div>
                              <button
                                className="ml-4 text-xs text-primary font-medium flex items-center"
                                onClick={() => {
                                  if (selectedSite === "godrej" && idx === 0) {
                                    setShowDetailModal(true);
                                  } else if (
                                    selectedSite === "all" &&
                                    item.site === "Godrej and Boyce" &&
                                    item.message.includes(
                                      "Express Housekeepers"
                                    )
                                  ) {
                                    setShowDetailModal(true);
                                  } else {
                                    alert(
                                      `View details for insight: ${item.message}`
                                    );
                                  }
                                }}
                              >
                                View Details
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Metric Cards */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-text-primary">
                          Critical Vendors
                        </h4>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-primary">
                          {
                            currentData.vendors.filter(
                              (v) => v.risk === "Critical"
                            ).length
                          }{" "}
                          vendors
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary">
                        Vendors with payment delays exceeding 120 days or high
                        exposure
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-text-primary">
                          Overdue Invoices
                        </h4>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-warning">
                          {
                            currentData.invoices.filter(
                              (i) => i.status === "Overdue"
                            ).length
                          }{" "}
                          invoices
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary">
                        Client invoices that have passed their payment deadline
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-text-primary">
                          Cash Flow Health
                        </h4>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            currentData.stats.outstandingInvoices >
                            currentData.stats.pendingPayments
                              ? "bg-green-100 text-success"
                              : "bg-red-100 text-primary"
                          }`}
                        >
                          {currentData.stats.outstandingInvoices >
                          currentData.stats.pendingPayments
                            ? "Positive"
                            : "Negative"}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary">
                        {currentData.stats.outstandingInvoices >
                        currentData.stats.pendingPayments
                          ? "Receivables exceed payables, indicating positive cash flow"
                          : "Payables exceed receivables, creating cash flow pressure"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content - Vendor Management (abbreviated) */}
              {activeTab === "vendors" && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-primary">
                      {selectedSite === "all"
                        ? "All Vendors"
                        : `Vendors for ${selectedSite}`}
                    </h3>

                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search vendors..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vendor Table with Updated Fields */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Vendor
                            </th>
                            {selectedSite === "all" && (
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Site
                              </th>
                            )}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Invoices Raised
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Invoices Cleared
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Overdue
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              DPO
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Velocity
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Risk Level
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredVendors
                            .sort((a, b) => b.dpo - a.dpo)
                            .map((vendor, idx) => (
                              <tr
                                key={idx}
                                className={`${
                                  vendor.dpo > 120 ? "bg-red-50" : ""
                                } hover:bg-gray-50 transition-colors duration-150`}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                                      {vendor.name.charAt(0)}
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-sm font-medium text-gray-900">
                                        {vendor.name}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                {selectedSite === "all" && (
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {vendor.site}
                                  </td>
                                )}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {vendor.invoicesRaised}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {vendor.invoicesCleared}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <span
                                    className={
                                      vendor.overdue > 5
                                        ? "text-primary"
                                        : vendor.overdue > 2
                                        ? "text-warning"
                                        : "text-gray-500"
                                    }
                                  >
                                    {vendor.overdue}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {vendor.dpo} days
                                  </div>
                                  <div className="mt-1 h-1 w-20 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className={
                                        vendor.dpo > 90
                                          ? "bg-primary h-full"
                                          : vendor.dpo > 60
                                          ? "bg-warning h-full"
                                          : "bg-success h-full"
                                      }
                                      style={{
                                        width: `${Math.min(
                                          100,
                                          (vendor.dpo / 180) * 100
                                        )}%`,
                                      }}
                                    ></div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {vendor.paymentVelocity} days
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${
                                                  vendor.risk === "Critical"
                                                    ? "bg-red-100 text-primary"
                                                    : vendor.risk === "High"
                                                    ? "bg-orange-100 text-caution"
                                                    : vendor.risk === "Medium"
                                                    ? "bg-yellow-100 text-warning"
                                                    : "bg-green-100 text-success"
                                                }`}
                                  >
                                    {vendor.risk}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <button className="text-primary font-medium hover:text-red-800 flex items-center">
                                    View Invoices
                                    <ArrowRight className="h-4 w-4 ml-1" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table Pagination */}
                    <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
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
                          <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to{" "}
                            <span className="font-medium">
                              {filteredVendors.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium">
                              {filteredVendors.length}
                            </span>{" "}
                            vendors
                          </p>
                        </div>
                        <div>
                          <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                          >
                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                              <span className="sr-only">Previous</span>
                              <ChevronDown className="h-5 w-5 transform rotate-90" />
                            </button>
                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-primary bg-gray-50">
                              1
                            </button>
                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                              <span className="sr-only">Next</span>
                              <ChevronDown className="h-5 w-5 transform -rotate-90" />
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vendor Analytics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Vendor Distribution */}
                    <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800 mb-4">
                        Vendor Risk Distribution
                      </h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                {
                                  name: "Critical",
                                  value: filteredVendors.filter(
                                    (v) => v.risk === "Critical"
                                  ).length,
                                },
                                {
                                  name: "High",
                                  value: filteredVendors.filter(
                                    (v) => v.risk === "High"
                                  ).length,
                                },
                                {
                                  name: "Medium",
                                  value: filteredVendors.filter(
                                    (v) => v.risk === "Medium"
                                  ).length,
                                },
                                {
                                  name: "Low",
                                  value: filteredVendors.filter(
                                    (v) => v.risk === "Low"
                                  ).length,
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {[
                                { name: "Critical", color: COLORS.primary },
                                { name: "High", color: COLORS.caution },
                                { name: "Medium", color: COLORS.warning },
                                { name: "Low", color: COLORS.success },
                              ].map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Overdue by Vendor */}
                    <div className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800 mb-4">
                        Overdue Invoices by Vendor
                      </h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={filteredVendors
                              .filter((v) => v.overdue > 0)
                              .sort((a, b) => b.overdue - a.overdue)
                              .slice(0, 5)}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              horizontal={true}
                              vertical={false}
                            />
                            <XAxis type="number" />
                            <YAxis
                              dataKey="name"
                              type="category"
                              width={100}
                              tick={{ fill: "#333333" }}
                            />
                            <Tooltip />
                            <Bar
                              dataKey="overdue"
                              fill={COLORS.primary}
                              name="Overdue Invoices"
                            >
                              {filteredVendors
                                .filter((v) => v.overdue > 0)
                                .sort((a, b) => b.overdue - a.overdue)
                                .slice(0, 5)
                                .map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={
                                      entry.overdue > 5
                                        ? COLORS.primary
                                        : entry.overdue > 3
                                        ? COLORS.caution
                                        : COLORS.warning
                                    }
                                  />
                                ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content - Client Invoices (abbreviated) */}
              {activeTab === "invoices" && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-primary">
                      {selectedSite === "all"
                        ? "All Client Invoices"
                        : `Invoices for ${
                            data.sites.find((site) => site.id === selectedSite)
                              .name
                          }`}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search invoices..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Invoice Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Total Outstanding
                          </h4>
                          <p className="mt-1 text-xl font-semibold text-text-primary">
                            ₹
                            {(
                              currentData.stats.outstandingInvoices / 100000
                            ).toFixed(2)}{" "}
                            Lakhs
                          </p>
                        </div>
                        <div className="bg-primary bg-opacity-10 p-2 rounded-lg">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Overdue Invoices
                          </h4>
                          <p className="mt-1 text-xl font-semibold text-text-primary">
                            {
                              currentData.invoices.filter(
                                (i) => i.status === "Overdue"
                              ).length
                            }{" "}
                            invoices
                          </p>
                        </div>
                        <div className="bg-yellow-50 p-2 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Average Collection Time
                          </h4>
                          <p className="mt-1 text-xl font-semibold text-text-primary">
                            {currentData.stats.averageDSO.toFixed(1)} days
                          </p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <Clock className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invoices Table (abbreviated) */}
                  <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                            Invoice #
                          </th>
                          {selectedSite === "all" && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                              Site
                            </th>
                          )}
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentData.invoices
                          .sort((a, b) => b.daysPending - a.daysPending)
                          .slice(0, 5) // Display only first 5 invoices
                          .map((invoice, idx) => (
                            <tr
                              key={idx}
                              className={`${
                                invoice.status === "Overdue" ? "bg-red-50" : ""
                              } hover:bg-gray-50`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div
                                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white font-medium ${
                                      invoice.status === "Overdue"
                                        ? "bg-primary"
                                        : invoice.status === "Pending"
                                        ? "bg-warning"
                                        : "bg-success"
                                    }`}
                                  >
                                    <FileText className="h-4 w-4" />
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-sm font-medium text-text-primary">
                                      {invoice.id}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              {selectedSite === "all" && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                  {invoice.site}
                                </td>
                              )}
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                {new Date(invoice.date).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                                ₹{(invoice.amount / 1000).toFixed(2)}K
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${
                                    invoice.status === "Overdue"
                                      ? "bg-red-100 text-primary"
                                      : invoice.status === "Pending"
                                      ? "bg-yellow-100 text-warning"
                                      : "bg-green-100 text-success"
                                  }`}
                                >
                                  {invoice.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center space-x-2">
                                  {invoice.status !== "Paid" && (
                                    <button className="text-primary font-medium hover:text-primaryDark flex items-center">
                                      Follow up
                                    </button>
                                  )}
                                  <button className="text-gray-500 hover:text-gray-700">
                                    <Eye className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 text-center">
                    <button className="text-sm text-primary font-medium flex items-center justify-center mx-auto">
                      View all invoices
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="text-sm text-gray-500">
                &copy; 2025 Knight Frank FM. All rights reserved.
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-4">
                <button className="text-sm text-gray-500 hover:text-primary">
                  Privacy Policy
                </button>
                <button className="text-sm text-gray-500 hover:text-primary">
                  Terms of Service
                </button>
                <button className="text-sm text-gray-500 hover:text-primary">
                  Help Center
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Detailed Report Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-primary">
                  Critical Vendor Risk Report
                </h2>
              </div>
              <button
                className="rounded-full p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowDetailModal(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-6 py-4">
              {/* Report Header */}
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-primary mb-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-lg text-primary">
                      Express Housekeepers: Critical Payment Delay
                    </h3>
                    <p className="text-gray-700 mt-1">
                      Payment delay has exceeded 165 days, significantly beyond
                      contract terms and industry standards
                    </p>
                  </div>
                </div>
              </div>

              {/* Report Sections */}
              <div className="space-y-8">
                {/* Executive Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
                    Executive Summary
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Express Housekeepers, a key vendor for the Godrej and Boyce
                    site, has not received payment for 165 days, resulting in a
                    total outstanding amount of ₹56 Lakhs. This critical delay
                    poses significant operational risks, including potential
                    service disruption, deteriorating relationship, and possible
                    legal implications. The situation requires immediate
                    intervention with a recommended immediate partial payment of
                    ₹8.5 Lakhs to mitigate the most urgent risks.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700">
                        Total Outstanding
                      </h4>
                      <p className="text-2xl font-bold text-primary mt-1">
                        ₹56 Lakhs
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Across 4 unpaid invoices
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700">
                        Days Past Due
                      </h4>
                      <p className="text-2xl font-bold text-primary mt-1">
                        165 days
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Beyond 30-day terms (+135 days)
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700">
                        Service Risk Level
                      </h4>
                      <div className="flex items-center mt-2">
                        <span className="px-3 py-1 bg-red-100 text-primary text-sm font-medium rounded-full">
                          Critical
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          Service disruption imminent
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment History Visualization */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
                    Payment History
                  </h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            {
                              month: "Sep 2024",
                              invoiced: 1400000,
                              paid: 1400000,
                              balance: 0,
                            },
                            {
                              month: "Oct 2024",
                              invoiced: 1400000,
                              paid: 1400000,
                              balance: 0,
                            },
                            {
                              month: "Nov 2024",
                              invoiced: 1400000,
                              paid: 1400000,
                              balance: 0,
                            },
                            {
                              month: "Dec 2024",
                              invoiced: 1400000,
                              paid: 1400000,
                              balance: 0,
                            },
                            {
                              month: "Jan 2025",
                              invoiced: 1400000,
                              paid: 0,
                              balance: 1400000,
                            },
                            {
                              month: "Feb 2025",
                              invoiced: 1400000,
                              paid: 0,
                              balance: 2800000,
                            },
                            {
                              month: "Mar 2025",
                              invoiced: 1400000,
                              paid: 0,
                              balance: 4200000,
                            },
                            {
                              month: "Apr 2025",
                              invoiced: 1400000,
                              paid: 0,
                              balance: 5600000,
                            },
                          ]}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            strokeOpacity={0.3}
                          />
                          <XAxis dataKey="month" />
                          <YAxis
                            yAxisId="left"
                            tickFormatter={(value) =>
                              `₹${(value / 100000).toFixed(0)}L`
                            }
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            domain={[0, "dataMax"]}
                            tickFormatter={(value) =>
                              `₹${(value / 100000).toFixed(0)}L`
                            }
                          />
                          <Tooltip
                            formatter={(value) => [
                              `₹${(value / 100000).toFixed(2)} Lakhs`,
                              "",
                            ]}
                            labelFormatter={(label) => `Month: ${label}`}
                          />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="invoiced"
                            stroke="#8884d8"
                            name="Invoiced Amount"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="paid"
                            stroke="#00A651"
                            name="Amount Paid"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="balance"
                            stroke="#C00000"
                            name="Outstanding Balance"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      <span className="font-medium">Analysis:</span> Regular
                      payments were maintained until December 2024. No payments
                      have been made in 2025, leading to a steadily increasing
                      outstanding balance. This abrupt change in payment pattern
                      requires investigation.
                    </p>
                  </div>
                </div>

                {/* Invoice Details Table */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
                    Outstanding Invoices
                  </h3>
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Invoice #
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service Period
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Days Overdue
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="bg-red-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            INV-EH-2501
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            10 Jan 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Dec 2024
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹14.00 Lakhs
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-medium">
                            165 days
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-primary">
                              Critical
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            INV-EH-2502
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            12 Feb 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Jan 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹14.00 Lakhs
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-medium">
                            132 days
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-primary">
                              Critical
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            INV-EH-2503
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            10 Mar 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Feb 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹14.00 Lakhs
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-medium">
                            103 days
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-primary">
                              Critical
                            </span>
                          </td>
                        </tr>
                        <tr className="bg-red-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            INV-EH-2504
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            12 Apr 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Mar 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹14.00 Lakhs
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-medium">
                            73 days
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-primary">
                              Critical
                            </span>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td
                            colSpan="3"
                            className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                          >
                            Total Outstanding:
                          </td>
                          <td className="px-6 py-3 text-sm font-bold text-primary">
                            ₹56.00 Lakhs
                          </td>
                          <td colSpan="2"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
                    Risk Assessment
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 flex items-center">
                        <AlertCircle className="h-5 w-5 text-primary mr-2" />
                        Service Disruption Risk
                      </h4>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Risk Level:
                          </span>
                          <span className="text-sm font-medium text-primary">
                            Very High
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="bg-primary h-full"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Express Housekeepers has already reduced staff at the
                          site by 15%. Their management has verbally indicated
                          possible service suspension if no payment is received
                          within 14 days.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 flex items-center">
                        <AlertCircle className="h-5 w-5 text-warning mr-2" />
                        Financial Impact
                      </h4>
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Risk Level:
                          </span>
                          <span className="text-sm font-medium text-warning">
                            High
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="bg-warning h-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          Replacing the vendor on short notice would likely
                          increase costs by 20-30%. Potential legal proceedings
                          could add additional costs of ₹2-5 Lakhs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
                    <h4 className="font-medium text-gray-800 flex items-center">
                      <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
                      Multi-Site Exposure
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Express Housekeepers also provides services to 2 other
                      sites managed by Knight Frank FM (Mahindra Tech and
                      Infosys Campus), with different payment statuses:
                    </p>
                    <div className="mt-3 overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                              Site
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                              Outstanding Amount
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                              Days Pending
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              Godrej and Boyce
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              ₹56.00 Lakhs
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              165 days
                            </td>
                            <td className="px-4 py-2">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-primary">
                                Critical
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              Mahindra Tech
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              ₹28.00 Lakhs
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              165 days
                            </td>
                            <td className="px-4 py-2">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-primary">
                                Critical
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              Infosys Campus
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              ₹25.00 Lakhs
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500">
                              102 days
                            </td>
                            <td className="px-4 py-2">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-caution">
                                High
                              </span>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td className="px-4 py-2 text-sm font-medium text-gray-500">
                              Total Exposure:
                            </td>
                            <td className="px-4 py-2 text-sm font-bold text-primary">
                              ₹109.00 Lakhs
                            </td>
                            <td colSpan="2"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Actions and Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
                    Recommended Actions
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-primary">
                      <h4 className="font-medium text-gray-800 flex items-center">
                        <AlertTriangle className="h-5 w-5 text-primary mr-2" />
                        Immediate Action Required
                      </h4>
                      <p className="text-sm text-gray-700 mt-2">
                        Prioritize an immediate partial payment of ₹8.5 Lakhs to
                        address the most critical invoice (INV-EH-2501) and
                        demonstrate good faith. This action is required within
                        the next 48 hours to prevent service disruption.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800">
                        Short-term Plan (7-14 days)
                      </h4>
                      <ul className="mt-2 space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-success mr-2 flex-shrink-0" />
                          <span>
                            Schedule a meeting with Express Housekeepers
                            management to negotiate a structured payment plan
                            for the remaining ₹47.5 Lakhs
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-success mr-2 flex-shrink-0" />
                          <span>
                            Conduct internal investigation to identify the root
                            causes of delayed payments (cash flow issues,
                            approval bottlenecks, etc.)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-success mr-2 flex-shrink-0" />
                          <span>
                            Develop a 60-day payment recovery plan with clear
                            milestones and accountability
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800">
                        Medium-term Plan (15-60 days)
                      </h4>
                      <ul className="mt-2 space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-success mr-2 flex-shrink-0" />
                          <span>
                            Implement payment plan with minimum monthly payments
                            of ₹15 Lakhs to clear the backlog within 4 months
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-success mr-2 flex-shrink-0" />
                          <span>
                            Review Express Housekeepers' contracts across all
                            sites to ensure consistent payment terms and improve
                            visibility
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-success mr-2 flex-shrink-0" />
                          <span>
                            Establish monthly vendor relationship review
                            meetings to prevent future payment delays
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <button
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                onClick={() => setShowDetailModal(false)}
              >
                Close Report
              </button>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-red-50 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark flex items-center">
                  <Wallet className="h-4 w-4 mr-2" />
                  Process Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashFlowDashboard;

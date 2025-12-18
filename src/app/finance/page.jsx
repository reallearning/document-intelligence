"use client"
import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, ChevronDown, ChevronRight, LayoutDashboard, Building2, MessageSquare, X, AlertTriangle, CheckCircle2, ChevronLeft, MapPin, Users, IndianRupee, Filter, Search, ArrowUpDown, ArrowUp, ArrowDown, Send } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const FMFinanceDashboard = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInsight, setSelectedInsight] = useState(null);
  
  // Site Analysis State
  const [analysisTab, setAnalysisTab] = useState('sites');
  const [selectedView, setSelectedView] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorViewContext, setVendorViewContext] = useState(null); // 'site' or 'list'
  const [regionFilter, setRegionFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Search State
  const [siteSearch, setSiteSearch] = useState('');
  const [vendorSearch, setVendorSearch] = useState('');
  
  // Sort State
  const [siteSortColumn, setSiteSortColumn] = useState('name');
  const [siteSortDirection, setSiteSortDirection] = useState('asc');
  const [vendorSortColumn, setVendorSortColumn] = useState('name');
  const [vendorSortDirection, setVendorSortDirection] = useState('asc');
  
  // Transaction filters and sort
  const [transactionTab, setTransactionTab] = useState('income'); // 'income' or 'payment'
  const [transactionFilter, setTransactionFilter] = useState('all'); // 'all', 'received', 'pending', 'overdue'
  const [transactionSort, setTransactionSort] = useState('date-desc'); // 'date-asc', 'date-desc', 'amount-asc', 'amount-desc'
  
  // Invoice filters and sort
  const [invoiceFilter, setInvoiceFilter] = useState('all'); // 'all', 'paid', 'overdue', 'pending'
  const [invoiceSort, setInvoiceSort] = useState('date-desc');
  
  // AI Assistant State
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI finance assistant. I can help you with cashflow analysis, vendor payment insights, site performance questions, and financial recommendations. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && activeTab === 'assistant') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  const allSitesData = [
    { id: 'tp-a', name: 'TechPark Tower A', region: 'Mumbai', type: 'Commercial', monthlySpend: 0.45, vendors: 8, outstanding: 0.32, days: 52, riskLevel: 'high' },
    { id: 'mm-1', name: 'Metro Mall - Andheri', region: 'Mumbai', type: 'Retail', monthlySpend: 0.38, vendors: 6, outstanding: 0.28, days: 48, riskLevel: 'medium' },
    { id: 'bc-bkc', name: 'Business Center BKC', region: 'Mumbai', type: 'Commercial', monthlySpend: 0.52, vendors: 9, outstanding: 0.35, days: 56, riskLevel: 'high' },
    { id: 'ip-lower', name: 'Industrial Park - Lower Parel', region: 'Mumbai', type: 'Industrial', monthlySpend: 0.48, vendors: 7, outstanding: 0.29, days: 51, riskLevel: 'medium' },
    { id: 'ch-ggn', name: 'Corporate Hub - Gurgaon', region: 'NCR', type: 'Commercial', monthlySpend: 0.62, vendors: 10, outstanding: 0.48, days: 58, riskLevel: 'high' },
    { id: 'tp-cyber', name: 'Tech Campus - Cyber City', region: 'NCR', type: 'Commercial', monthlySpend: 0.55, vendors: 9, outstanding: 0.42, days: 54, riskLevel: 'high' },
    { id: 'rp-noida', name: 'Retail Plaza - Noida', region: 'NCR', type: 'Retail', monthlySpend: 0.41, vendors: 7, outstanding: 0.31, days: 49, riskLevel: 'medium' },
    { id: 'ph-mall', name: 'Retail Mall - Phoenix', region: 'Bangalore', type: 'Retail', monthlySpend: 0.48, vendors: 8, outstanding: 0.35, days: 52, riskLevel: 'medium' },
    { id: 'it-ww', name: 'IT Park - Whitefield', region: 'Bangalore', type: 'Commercial', monthlySpend: 0.52, vendors: 9, outstanding: 0.38, days: 55, riskLevel: 'high' },
    { id: 'go-park', name: 'Green Office Park', region: 'Bangalore', type: 'Commercial', monthlySpend: 0.38, vendors: 6, outstanding: 0.24, days: 42, riskLevel: 'low' }
  ];

  const allVendorsData = [
    { id: 'sec-1', name: 'Security Services Ltd', category: 'Security', sites: 12, monthlySpend: 1.44, outstanding: 1.08, days: 78, riskLevel: 'critical' },
    { id: 'house-1', name: 'Housekeeping Co', category: 'Housekeeping', sites: 18, monthlySpend: 1.80, outstanding: 1.30, days: 72, riskLevel: 'critical' },
    { id: 'hvac-1', name: 'HVAC Systems Pvt Ltd', category: 'HVAC', sites: 6, monthlySpend: 0.72, outstanding: 0.46, days: 65, riskLevel: 'high' },
    { id: 'elec-1', name: 'Electrical Maintenance', category: 'Electrical', sites: 11, monthlySpend: 0.88, outstanding: 0.59, days: 58, riskLevel: 'medium' },
    { id: 'plumb-1', name: 'Plumbing Services', category: 'Plumbing', sites: 14, monthlySpend: 1.05, outstanding: 0.57, days: 52, riskLevel: 'medium' },
    { id: 'elev-1', name: 'Elevator Services Inc', category: 'Elevators', sites: 9, monthlySpend: 0.63, outstanding: 0.30, days: 48, riskLevel: 'low' },
    { id: 'pest-1', name: 'Pest Control Pro', category: 'Pest Control', sites: 22, monthlySpend: 1.14, outstanding: 0.64, days: 56, riskLevel: 'medium' },
    { id: 'fire-1', name: 'Fire Safety Systems', category: 'Fire Safety', sites: 7, monthlySpend: 0.53, outstanding: 0.27, days: 48, riskLevel: 'low' }
  ];

  const siteDetailData = {
    'tp-a': {
      name: 'TechPark Tower A',
      location: 'Andheri East, Mumbai',
      type: 'Commercial Office Complex',
      area: '2,50,000 sq ft',
      floors: 15,
      monthlySpend: 0.45,
      outstanding: 0.32,
      avgDays: 52,
      // Income/Revenue data
      incomeReceived: 0.48,
      incomePending: 0.17,
      incomeOverdue: 0.08,
      paymentsMade: 0.13,
      paymentsPending: 0.32,
      paymentsOverdue: 0.15,
      // Transactions
      incomeTransactions: [
        { id: 'REC-001', date: '2024-11-15', amount: 0.15, type: 'Received', status: 'Cleared', description: 'Monthly service fee - Nov' },
        { id: 'REC-002', date: '2024-12-01', amount: 0.17, type: 'Pending', status: 'Due', description: 'Monthly service fee - Dec', dueDate: '2024-12-15' },
        { id: 'REC-003', date: '2024-10-15', amount: 0.16, type: 'Received', status: 'Cleared', description: 'Monthly service fee - Oct' },
        { id: 'REC-004', date: '2024-10-01', amount: 0.08, type: 'Overdue', status: 'Overdue', description: 'Additional charges - Sept', dueDate: '2024-10-15' }
      ],
      paymentTransactions: [
        { id: 'PAY-001', date: '2024-11-20', amount: 0.06, vendor: 'Elevator Services Inc', status: 'Paid', description: 'Maintenance - Nov' },
        { id: 'PAY-002', date: '2024-12-05', amount: 0.09, vendor: 'Security Services Ltd', status: 'Pending', description: 'Security - Dec', dueDate: '2024-12-15' },
        { id: 'PAY-003', date: '2024-10-18', amount: 0.07, vendor: 'Housekeeping Co', status: 'Paid', description: 'Housekeeping - Oct' },
        { id: 'PAY-004', date: '2024-09-15', amount: 0.15, vendor: 'Security Services Ltd', status: 'Overdue', description: 'Security - Sept', dueDate: '2024-10-01' }
      ],
      vendors: [
        { id: 'sec-1', name: 'Security Services Ltd', category: 'Security', monthlySpend: 0.12, outstanding: 0.09, days: 78, invoices: 3 },
        { id: 'house-1', name: 'Housekeeping Co', category: 'Housekeeping', monthlySpend: 0.10, outstanding: 0.08, days: 72, invoices: 2 },
        { id: 'hvac-1', name: 'HVAC Systems Pvt Ltd', category: 'HVAC', monthlySpend: 0.08, outstanding: 0.06, days: 65, invoices: 2 },
        { id: 'elec-1', name: 'Electrical Maintenance', category: 'Electrical', monthlySpend: 0.06, outstanding: 0.04, days: 58, invoices: 1 },
        { id: 'plumb-1', name: 'Plumbing Services', category: 'Plumbing', monthlySpend: 0.05, outstanding: 0.03, days: 52, invoices: 1 },
        { id: 'elev-1', name: 'Elevator Services Inc', category: 'Elevators', monthlySpend: 0.04, outstanding: 0.02, days: 48, invoices: 1 }
      ],
      spendByCategory: [
        { category: 'Security', value: 0.12, percent: 26.7 },
        { category: 'Housekeeping', value: 0.10, percent: 22.2 },
        { category: 'HVAC', value: 0.08, percent: 17.8 },
        { category: 'Electrical', value: 0.06, percent: 13.3 },
        { category: 'Plumbing', value: 0.05, percent: 11.1 },
        { category: 'Elevators', value: 0.04, percent: 8.9 }
      ]
    }
  };

  const vendorDetailData = {
    'sec-1': {
      name: 'Security Services Ltd',
      category: 'Security',
      totalSites: 12,
      monthlySpend: 1.44,
      outstanding: 1.08,
      avgDays: 78,
      sites: [
        { name: 'TechPark Tower A', region: 'Mumbai', monthlySpend: 0.12, outstanding: 0.09, days: 78, invoices: 3 },
        { name: 'Business Center BKC', region: 'Mumbai', monthlySpend: 0.15, outstanding: 0.11, days: 82, invoices: 3 },
        { name: 'Corporate Hub - Gurgaon', region: 'NCR', monthlySpend: 0.18, outstanding: 0.14, days: 75, invoices: 4 },
        { name: 'IT Park - Whitefield', region: 'Bangalore', monthlySpend: 0.14, outstanding: 0.10, days: 71, invoices: 2 }
      ],
      invoices: [
        { id: 'INV-001', site: 'TechPark Tower A', date: '2024-10-01', amount: 0.12, dueDate: '2024-10-15', status: 'Overdue', days: 78 },
        { id: 'INV-002', site: 'TechPark Tower A', date: '2024-11-01', amount: 0.12, dueDate: '2024-11-15', status: 'Overdue', days: 48 },
        { id: 'INV-003', site: 'TechPark Tower A', date: '2024-12-01', amount: 0.12, dueDate: '2024-12-15', status: 'Due Soon', days: 18 },
        { id: 'INV-004', site: 'Business Center BKC', date: '2024-10-05', amount: 0.15, dueDate: '2024-10-20', status: 'Overdue', days: 73 },
        { id: 'INV-005', site: 'Corporate Hub - Gurgaon', date: '2024-11-05', amount: 0.18, dueDate: '2024-11-20', status: 'Overdue', days: 43 },
        { id: 'INV-006', site: 'TechPark Tower A', date: '2024-09-01', amount: 0.12, dueDate: '2024-09-15', status: 'Paid', paidDate: '2024-09-20', days: 5 },
        { id: 'INV-007', site: 'Business Center BKC', date: '2024-08-05', amount: 0.15, dueDate: '2024-08-20', status: 'Paid', paidDate: '2024-08-25', days: 5 }
      ],
      paymentTracking: [
        { label: 'Total Due', value: '1.44' },
        { label: 'Paid', value: '0.27', color: '#85A383' },
        { label: 'Pending (Current)', value: '0.09', color: '#1B2A21' },
        { label: 'Overdue', value: '1.08', color: '#DF7649' }
      ],
      paymentHistory: [
        { month: 'Jul', paid: 1.44, days: 45 },
        { month: 'Aug', paid: 1.44, days: 52 },
        { month: 'Sep', paid: 1.44, days: 58 },
        { month: 'Oct', paid: 0, days: 78 },
        { month: 'Nov', paid: 0.72, days: 48 },
        { month: 'Dec', paid: 0, days: 18 }
      ]
    }
  };

  const dpoTrend = [
    { month: 'Jul', value: 45 },
    { month: 'Aug', value: 48 },
    { month: 'Sep', value: 52 },
    { month: 'Oct', value: 58 },
    { month: 'Nov', value: 62 },
    { month: 'Dec', value: 65 }
  ];

  const dsoTrend = [
    { month: 'Jul', value: 38 },
    { month: 'Aug', value: 42 },
    { month: 'Sep', value: 45 },
    { month: 'Oct', value: 41 },
    { month: 'Nov', value: 39 },
    { month: 'Dec', value: 36 }
  ];

  const wcGapTrend = [
    { month: 'Jul', value: -7 },
    { month: 'Aug', value: -6 },
    { month: 'Sep', value: -7 },
    { month: 'Oct', value: -17 },
    { month: 'Nov', value: -23 },
    { month: 'Dec', value: -29 }
  ];

  const insights = [
    {
      id: 'payment-pressure',
      title: 'Your vendor payments are stretching thin',
      description: 'Payment cycles have hit 65 days, climbing 8 days in just one month. Two vendors are past the 70-day mark and showing signs of strain.',
      action: 'View critical vendors',
      detailReport: {
        summary: 'Vendor payment delays have accelerated significantly in December, with DPO increasing from 57 to 65 days. This represents a 14% month-over-month increase and puts 12 critical vendors at risk of service disruption.',
        keyFindings: [
          { label: 'Total Outstanding to Vendors', value: '₹12.8Cr', trend: '+18%' },
          { label: 'Average Payment Delay', value: '65 days', trend: '+8 days' },
          { label: 'Vendors Past 70 Days', value: '2', trend: 'Critical' },
          { label: 'Sites at Risk', value: '30', trend: 'High' }
        ],
        breakdown: [
          { category: 'Security Services', amount: 2.4, days: 78, risk: 'Critical' },
          { category: 'Housekeeping', amount: 1.8, days: 72, risk: 'Critical' },
          { category: 'Technical Services', amount: 1.2, days: 68, risk: 'High' },
          { category: 'Maintenance', amount: 0.95, days: 65, risk: 'High' },
          { category: 'HVAC', amount: 0.82, days: 63, risk: 'Medium' }
        ],
        recommendations: [
          'Prioritize immediate payment of ₹2.4Cr to Security Services Ltd to prevent service disruption across 12 sites',
          'Negotiate 15-day payment plan extension with Housekeeping Co while processing ₹1.8Cr outstanding',
          'Review cash flow forecast for next 30 days to identify payment capacity',
          'Consider partial payments to critical vendors to maintain relationships'
        ]
      }
    },
    {
      id: 'collections-improving',
      title: 'Collections are picking up speed',
      description: 'Great news - client payments are coming in faster at 36 days, down from 39. Still, two major clients are sitting on ₹6Cr that needs attention.',
      action: 'View overdue clients',
      detailReport: {
        summary: 'Receivables collection has improved by 8% this month, with DSO dropping to 36 days. However, concentration risk remains high with top 2 clients accounting for 48% of total outstanding receivables.',
        keyFindings: [
          { label: 'Total Outstanding from Clients', value: '₹18.2Cr', trend: '-5%' },
          { label: 'Average Collection Days', value: '36 days', trend: '-3 days' },
          { label: 'Clients Past 45 Days', value: '3', trend: 'Moderate' },
          { label: 'Collection Efficiency', value: '92%', trend: '+3%' }
        ],
        breakdown: [
          { category: 'TechPark Tower A', amount: 3.2, days: 52, risk: 'High' },
          { category: 'Corporate Hub Gurgaon', amount: 2.8, days: 48, risk: 'High' },
          { category: 'Industrial Complex B', amount: 2.1, days: 45, risk: 'Medium' },
          { category: 'Retail Mall Phoenix', amount: 1.6, days: 42, risk: 'Medium' },
          { category: 'Business Center North', amount: 1.3, days: 38, risk: 'Low' }
        ],
        recommendations: [
          'Deploy senior relationship manager for direct follow-up with TechPark Tower A on ₹3.2Cr outstanding',
          'Send formal payment reminder with escalation notice to Corporate Hub Gurgaon',
          'Review contract terms for Industrial Complex B to ensure no disputes delaying payment',
          'Implement automated reminder system for clients approaching 40-day threshold'
        ]
      }
    },
    {
      id: 'wc-gap-widening',
      title: 'Cash is getting tighter in key regions',
      description: 'The working capital gap has grown to -29 days. Mumbai and NCR are the main culprits - you are paying vendors faster than clients are paying you.',
      action: 'View regional breakdown',
      detailReport: {
        summary: 'Working capital gap has deteriorated to -29 days, driven primarily by regional imbalances in Mumbai and NCR where vendor payment cycles are 15-20 days shorter than client collection cycles.',
        keyFindings: [
          { label: 'Overall WC Gap', value: '-29 days', trend: '-6 days' },
          { label: 'Cash Tied Up', value: '₹8.9Cr', trend: '+22%' },
          { label: 'Regions in Deficit', value: '5 of 10', trend: 'Worsening' },
          { label: 'Days Cash on Hand', value: '18 days', trend: '-4 days' }
        ],
        breakdown: [
          { category: 'Mumbai', amount: 2.4, days: -32, risk: 'Critical' },
          { category: 'NCR', amount: 2.3, days: -35, risk: 'Critical' },
          { category: 'Bangalore', amount: 1.7, days: -28, risk: 'High' },
          { category: 'Pune', amount: 1.1, days: -26, risk: 'Medium' },
          { category: 'Hyderabad', amount: 0.8, days: -22, risk: 'Medium' }
        ],
        recommendations: [
          'Accelerate collections from Mumbai region clients by offering 2% early payment discount',
          'Negotiate staggered vendor payment schedule in NCR to align with client payment patterns',
          'Review contract terms in deficit regions to reduce payment-collection mismatch',
          'Consider invoice discounting facility for ₹5Cr to bridge immediate working capital gap'
        ]
      }
    }
  ];
  
  const recommendedActions = [
    {
      id: 'security-payment',
      title: 'Urgent: Security Services Ltd payment overdue',
      description: 'Outstanding ₹1.08Cr across 12 sites with 78 days average delay. Risk of service disruption at TechPark Tower A, Business Center BKC, and Corporate Hub Gurgaon.',
      linkedInsight: insights[0],
      sites: ['TechPark Tower A', 'Business Center BKC', 'Corporate Hub - Gurgaon'],
      vendor: 'Security Services Ltd'
    },
    {
      id: 'techpark-collection',
      title: 'Follow up: TechPark Tower A payment pending',
      description: 'Client payment of ₹3.2Cr outstanding for 52 days. Immediate follow-up needed to prevent further aging of this receivable.',
      linkedInsight: insights[1],
      sites: ['TechPark Tower A'],
      vendor: null
    },
    {
      id: 'mumbai-wc',
      title: 'Address: Mumbai region working capital strain',
      description: 'Working capital gap of -32 days affecting 28 sites. Consider early payment discounts or negotiate staggered vendor payments for the region.',
      linkedInsight: insights[2],
      sites: ['TechPark Tower A', 'Metro Mall - Andheri', 'Business Center BKC', 'Industrial Park - Lower Parel'],
      vendor: null
    }
  ];

  const kpiData = [
    {
      id: 'dpo',
      title: 'Days Payable Outstanding',
      metric: '65',
      unit: 'days',
      trend: { direction: 'up', value: '+8', isNegative: true },
      trendData: dpoTrend,
      topImpact: [
        { name: 'Security Services Ltd', amount: '₹2.4Cr', days: 78, detail: '12 sites' },
        { name: 'Housekeeping Co', amount: '₹1.8Cr', days: 72, detail: '18 sites' },
        { name: 'Facility Tech Solutions', amount: '₹1.2Cr', days: 68, detail: '8 sites' },
        { name: 'Green Maintenance', amount: '₹950K', days: 65, detail: '15 sites' },
        { name: 'HVAC Systems Pvt Ltd', amount: '₹820K', days: 63, detail: '6 sites' },
        { name: 'Elevator Services Inc', amount: '₹680K', days: 59, detail: '9 sites' },
        { name: 'Pest Control Pro', amount: '₹520K', days: 56, detail: '22 sites' },
        { name: 'Electrical Maintenance', amount: '₹480K', days: 54, detail: '11 sites' },
        { name: 'Plumbing Services', amount: '₹410K', days: 51, detail: '14 sites' },
        { name: 'Fire Safety Systems', amount: '₹380K', days: 48, detail: '7 sites' }
      ]
    },
    {
      id: 'dso',
      title: 'Days Sales Outstanding',
      metric: '36',
      unit: 'days',
      trend: { direction: 'down', value: '-3', isNegative: false },
      trendData: dsoTrend,
      topImpact: [
        { name: 'TechPark Tower A', amount: '₹3.2Cr', days: 52, detail: 'Mumbai' },
        { name: 'Corporate Hub - Gurgaon', amount: '₹2.8Cr', days: 48, detail: 'NCR' },
        { name: 'Industrial Complex B', amount: '₹2.1Cr', days: 45, detail: 'Pune' },
        { name: 'Retail Mall - Phoenix', amount: '₹1.6Cr', days: 42, detail: 'Bangalore' },
        { name: 'Business Center North', amount: '₹1.3Cr', days: 38, detail: 'Hyderabad' },
        { name: 'IT Park Sector 5', amount: '₹980K', days: 35, detail: 'Noida' },
        { name: 'Metro Office Complex', amount: '₹850K', days: 32, detail: 'Chennai' },
        { name: 'Smart City Tower', amount: '₹720K', days: 29, detail: 'Mumbai' },
        { name: 'Heritage Building', amount: '₹620K', days: 26, detail: 'Kolkata' },
        { name: 'Green Office Park', amount: '₹540K', days: 24, detail: 'Bangalore' }
      ]
    },
    {
      id: 'wcgap',
      title: 'Working Capital Gap',
      metric: '-29',
      unit: 'days',
      trend: { direction: 'down', value: '-6', isNegative: true },
      trendData: wcGapTrend,
      topImpact: [
        { name: 'Mumbai Region', amount: '₹2.4Cr', days: '-32', detail: '28 sites' },
        { name: 'NCR Region', amount: '₹2.3Cr', days: '-35', detail: '35 sites' },
        { name: 'Bangalore Region', amount: '₹1.7Cr', days: '-28', detail: '22 sites' },
        { name: 'Pune Region', amount: '₹1.1Cr', days: '-26', detail: '18 sites' },
        { name: 'Hyderabad Region', amount: '₹800K', days: '-22', detail: '16 sites' },
        { name: 'Chennai Region', amount: '₹600K', days: '-21', detail: '14 sites' },
        { name: 'Kolkata Region', amount: '₹300K', days: '-14', detail: '12 sites' },
        { name: 'Ahmedabad Region', amount: '₹300K', days: '-17', detail: '9 sites' },
        { name: 'Jaipur Region', amount: '₹200K', days: '-16', detail: '7 sites' },
        { name: 'Chandigarh Region', amount: '₹130K', days: '-13', detail: '6 sites' }
      ]
    }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'Site & Vendor Analysis', icon: Building2 },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquare }
  ];

  const COLORS = ['#0C2C18', '#1B2A21', '#85A383', '#DF7649', '#E7DDCA', '#878B87'];

  // Filter and sort functions
  const getFilteredAndSortedSites = () => {
    let filtered = allSitesData.filter(site => {
      const matchesRegion = regionFilter === 'all' || site.region === regionFilter;
      const matchesSearch = site.name.toLowerCase().includes(siteSearch.toLowerCase()) || 
                           site.id.toLowerCase().includes(siteSearch.toLowerCase());
      return matchesRegion && matchesSearch;
    });

    return filtered.sort((a, b) => {
      let aVal = a[siteSortColumn];
      let bVal = b[siteSortColumn];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (siteSortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  };

  const getFilteredAndSortedVendors = () => {
    let filtered = allVendorsData.filter(vendor => {
      const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
      const matchesSearch = vendor.name.toLowerCase().includes(vendorSearch.toLowerCase()) || 
                           vendor.id.toLowerCase().includes(vendorSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      let aVal = a[vendorSortColumn];
      let bVal = b[vendorSortColumn];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (vendorSortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  };

  const handleSiteSort = (column) => {
    if (siteSortColumn === column) {
      setSiteSortDirection(siteSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSiteSortColumn(column);
      setSiteSortDirection('asc');
    }
  };

  const handleVendorSort = (column) => {
    if (vendorSortColumn === column) {
      setVendorSortDirection(vendorSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setVendorSortColumn(column);
      setVendorSortDirection('asc');
    }
  };

  const SortIcon = ({ column, currentColumn, direction }) => {
    if (column !== currentColumn) {
      return <ArrowUpDown strokeWidth={1.5} style={{ width: '14px', height: '14px', color: '#85A383' }} />;
    }
    return direction === 'asc' ? 
      <ArrowUp strokeWidth={1.5} style={{ width: '14px', height: '14px', color: '#0C2C18' }} /> :
      <ArrowDown strokeWidth={1.5} style={{ width: '14px', height: '14px', color: '#0C2C18' }} />;
  };

  const filteredSites = getFilteredAndSortedSites();
  const filteredVendors = getFilteredAndSortedVendors();
  
  const suggestedPrompts = [
    "Which vendors are most at risk of service disruption?",
    "Show me sites with the highest outstanding payments",
    "What's the working capital situation in Mumbai?",
    "Recommend actions to improve our DPO",
    "Analyze payment trends for Security Services Ltd"
  ];
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = {
        'vendors': 'Based on current data, Security Services Ltd (78 days, ₹1.08Cr outstanding) and Housekeeping Co (72 days, ₹1.30Cr outstanding) are at critical risk. I recommend prioritizing immediate payment to Security Services Ltd to prevent service disruption across 12 sites.',
        'sites': 'The sites with highest outstanding are: Corporate Hub - Gurgaon (₹0.48Cr), IT Park - Whitefield (₹0.38Cr), and Business Center BKC (₹0.35Cr). These three sites account for 35% of total outstanding payments.',
        'mumbai': 'Mumbai region shows a critical working capital gap of -32 days with ₹2.4Cr tied up. The region is paying vendors 32 days faster than receiving client payments. I recommend accelerating collections with early payment discounts.',
        'dpo': 'To improve DPO: 1) Negotiate staggered payment schedules with critical vendors, 2) Implement partial payment plans, 3) Review cash flow forecasts for the next 30 days, 4) Consider invoice discounting for ₹5Cr to bridge the gap.',
        'security': 'Security Services Ltd operates at 12 sites with ₹2.4Cr monthly spend. Payment history shows declining on-time payments since September. Current overdue: ₹1.08Cr across 78 days average. Immediate action needed to prevent service disruption.'
      };
      
      let responseContent = 'I can help you analyze that. Could you provide more specific details about what you\'d like to know?';
      
      const lowerInput = inputMessage.toLowerCase();
      if (lowerInput.includes('vendor') || lowerInput.includes('risk')) {
        responseContent = responses.vendors;
      } else if (lowerInput.includes('site') || lowerInput.includes('outstanding')) {
        responseContent = responses.sites;
      } else if (lowerInput.includes('mumbai') || lowerInput.includes('working capital')) {
        responseContent = responses.mumbai;
      } else if (lowerInput.includes('dpo') || lowerInput.includes('recommend')) {
        responseContent = responses.dpo;
      } else if (lowerInput.includes('security')) {
        responseContent = responses.security;
      }
      
      const aiMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handlePromptClick = (prompt) => {
    setInputMessage(prompt);
  };

  const SitesTableView = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '32px',
          fontWeight: '300',
          color: '#0C2C18',
          fontFamily: 'Georgia, serif',
          letterSpacing: '-0.01em'
        }}>
          Sites Overview
        </h1>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search strokeWidth={1.5} style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              color: '#85A383'
            }} />
            <input
              type="text"
              placeholder="Search sites..."
              value={siteSearch}
              onChange={(e) => setSiteSearch(e.target.value)}
              style={{
                padding: '8px 16px 8px 36px',
                border: '1px solid #0C2C18',
                backgroundColor: '#fff',
                color: '#0C2C18',
                fontSize: '13px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                width: '220px'
              }}
            />
          </div>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            style={{
              padding: '8px 16px',
              border: '1px solid #0C2C18',
              backgroundColor: '#fff',
              color: '#0C2C18',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Regions</option>
            <option value="Mumbai">Mumbai</option>
            <option value="NCR">NCR</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>TOTAL SITES</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{filteredSites.length}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>MONTHLY SPEND</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>₹{filteredSites.reduce((acc, s) => acc + s.monthlySpend, 0).toFixed(2)}Cr</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>OUTSTANDING</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>₹{filteredSites.reduce((acc, s) => acc + s.outstanding, 0).toFixed(2)}Cr</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>AVG DAYS</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{filteredSites.length > 0 ? Math.round(filteredSites.reduce((acc, s) => acc + s.days, 0) / filteredSites.length) : 0}</div>
        </div>
      </div>

      {/* Sites Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #E7DDCA' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E7DDCA' }}>
              <th onClick={() => handleSiteSort('name')} style={{ padding: '16px 20px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  SITE NAME
                  <SortIcon column="name" currentColumn={siteSortColumn} direction={siteSortDirection} />
                </div>
              </th>
              <th onClick={() => handleSiteSort('region')} style={{ padding: '16px 20px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  REGION
                  <SortIcon column="region" currentColumn={siteSortColumn} direction={siteSortDirection} />
                </div>
              </th>
              <th onClick={() => handleSiteSort('type')} style={{ padding: '16px 20px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  TYPE
                  <SortIcon column="type" currentColumn={siteSortColumn} direction={siteSortDirection} />
                </div>
              </th>
              <th onClick={() => handleSiteSort('monthlySpend')} style={{ padding: '16px 20px', textAlign: 'right', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  MONTHLY SPEND
                  <SortIcon column="monthlySpend" currentColumn={siteSortColumn} direction={siteSortDirection} />
                </div>
              </th>
              <th onClick={() => handleSiteSort('vendors')} style={{ padding: '16px 20px', textAlign: 'center', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  VENDORS
                  <SortIcon column="vendors" currentColumn={siteSortColumn} direction={siteSortDirection} />
                </div>
              </th>
              <th onClick={() => handleSiteSort('outstanding')} style={{ padding: '16px 20px', textAlign: 'right', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  OUTSTANDING
                  <SortIcon column="outstanding" currentColumn={siteSortColumn} direction={siteSortDirection} />
                </div>
              </th>
              <th onClick={() => handleSiteSort('days')} style={{ padding: '16px 20px', textAlign: 'right', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  DAYS
                  <SortIcon column="days" currentColumn={siteSortColumn} direction={siteSortDirection} />
                </div>
              </th>
              <th onClick={() => handleSiteSort('riskLevel')} style={{ padding: '16px 20px', textAlign: 'center', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  STATUS
                  <SortIcon column="riskLevel" currentColumn={siteSortColumn} direction={siteSortDirection} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSites.map((site, idx) => (
              <tr
                key={site.id}
                onClick={() => {
                  setSelectedSite(site);
                  setSelectedView('site-detail');
                }}
                style={{
                  borderBottom: idx < filteredSites.length - 1 ? '1px solid #E7DDCA' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E7DDCA'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '500', color: '#0C2C18', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{site.name}</td>
                <td style={{ padding: '16px 20px', fontSize: '13px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{site.region}</td>
                <td style={{ padding: '16px 20px', fontSize: '13px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{site.type}</td>
                <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '500', color: '#0C2C18', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{site.monthlySpend}Cr</td>
                <td style={{ padding: '16px 20px', fontSize: '13px', color: '#1B2A21', textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{site.vendors}</td>
                <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '500', color: '#DF7649', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{site.outstanding}Cr</td>
                <td style={{ padding: '16px 20px', fontSize: '13px', color: '#1B2A21', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{site.days}</td>
                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <span style={{
                    padding: '4px 10px',
                    border: site.riskLevel === 'high' || site.riskLevel === 'critical' ? '1px solid #DF7649' : site.riskLevel === 'medium' ? '1px solid #85A383' : '1px solid #878B87',
                    color: site.riskLevel === 'high' || site.riskLevel === 'critical' ? '#DF7649' : site.riskLevel === 'medium' ? '#85A383' : '#878B87',
                    fontSize: '10px',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {site.riskLevel.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const VendorsTableView = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '32px',
          fontWeight: '300',
          color: '#0C2C18',
          fontFamily: 'Georgia, serif',
          letterSpacing: '-0.01em'
        }}>
          Vendors Overview
        </h1>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search strokeWidth={1.5} style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              width: '16px',
              height: '16px',
              color: '#85A383'
            }} />
            <input
              type="text"
              placeholder="Search vendors..."
              value={vendorSearch}
              onChange={(e) => setVendorSearch(e.target.value)}
              style={{
                padding: '8px 16px 8px 36px',
                border: '1px solid #0C2C18',
                backgroundColor: '#fff',
                color: '#0C2C18',
                fontSize: '13px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                width: '220px'
              }}
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '8px 16px',
              border: '1px solid #0C2C18',
              backgroundColor: '#fff',
              color: '#0C2C18',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Categories</option>
            <option value="Security">Security</option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="HVAC">HVAC</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>TOTAL VENDORS</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{filteredVendors.length}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>MONTHLY SPEND</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>₹{filteredVendors.reduce((acc, v) => acc + v.monthlySpend, 0).toFixed(2)}Cr</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>OUTSTANDING</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>₹{filteredVendors.reduce((acc, v) => acc + v.outstanding, 0).toFixed(2)}Cr</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>AVG DAYS</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{filteredVendors.length > 0 ? Math.round(filteredVendors.reduce((acc, v) => acc + v.days, 0) / filteredVendors.length) : 0}</div>
        </div>
      </div>

      {/* Vendors Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #E7DDCA' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E7DDCA' }}>
              <th onClick={() => handleVendorSort('name')} style={{ padding: '16px 20px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  VENDOR NAME
                  <SortIcon column="name" currentColumn={vendorSortColumn} direction={vendorSortDirection} />
                </div>
              </th>
              <th onClick={() => handleVendorSort('category')} style={{ padding: '16px 20px', textAlign: 'left', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  CATEGORY
                  <SortIcon column="category" currentColumn={vendorSortColumn} direction={vendorSortDirection} />
                </div>
              </th>
              <th onClick={() => handleVendorSort('sites')} style={{ padding: '16px 20px', textAlign: 'center', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  SITES
                  <SortIcon column="sites" currentColumn={vendorSortColumn} direction={vendorSortDirection} />
                </div>
              </th>
              <th onClick={() => handleVendorSort('monthlySpend')} style={{ padding: '16px 20px', textAlign: 'right', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  MONTHLY SPEND
                  <SortIcon column="monthlySpend" currentColumn={vendorSortColumn} direction={vendorSortDirection} />
                </div>
              </th>
              <th onClick={() => handleVendorSort('outstanding')} style={{ padding: '16px 20px', textAlign: 'right', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  OUTSTANDING
                  <SortIcon column="outstanding" currentColumn={vendorSortColumn} direction={vendorSortDirection} />
                </div>
              </th>
              <th onClick={() => handleVendorSort('days')} style={{ padding: '16px 20px', textAlign: 'right', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  DAYS
                  <SortIcon column="days" currentColumn={vendorSortColumn} direction={vendorSortDirection} />
                </div>
              </th>
              <th onClick={() => handleVendorSort('riskLevel')} style={{ padding: '16px 20px', textAlign: 'center', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                  STATUS
                  <SortIcon column="riskLevel" currentColumn={vendorSortColumn} direction={vendorSortDirection} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor, idx) => (
              <tr
                key={vendor.id}
                onClick={() => {
                  setSelectedVendor(vendor);
                  setVendorViewContext('list');
                  setSelectedView('vendor-detail');
                }}
                style={{
                  borderBottom: idx < filteredVendors.length - 1 ? '1px solid #E7DDCA' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E7DDCA'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '500', color: '#0C2C18', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{vendor.name}</td>
                <td style={{ padding: '16px 20px', fontSize: '13px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{vendor.category}</td>
                <td style={{ padding: '16px 20px', fontSize: '13px', color: '#1B2A21', textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{vendor.sites}</td>
                <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '500', color: '#0C2C18', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{vendor.monthlySpend}Cr</td>
                <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '500', color: '#DF7649', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{vendor.outstanding}Cr</td>
                <td style={{ padding: '16px 20px', fontSize: '13px', color: '#1B2A21', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{vendor.days}</td>
                <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                  <span style={{
                    padding: '4px 10px',
                    border: vendor.riskLevel === 'critical' ? '1px solid #DF7649' : vendor.riskLevel === 'high' ? '1px solid #DF7649' : vendor.riskLevel === 'medium' ? '1px solid #85A383' : '1px solid #878B87',
                    color: vendor.riskLevel === 'critical' ? '#DF7649' : vendor.riskLevel === 'high' ? '#DF7649' : vendor.riskLevel === 'medium' ? '#85A383' : '#878B87',
                    fontSize: '10px',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {vendor.riskLevel.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  const SiteDetailView = () => {
    let siteData = siteDetailData[selectedSite?.id];
    
    // Generate fallback data if not defined
    if (!siteData && selectedSite) {
      siteData = {
        name: selectedSite.name,
        location: `${selectedSite.region}, India`,
        type: selectedSite.type + ' Complex',
        area: '1,80,000 sq ft',
        floors: 12,
        monthlySpend: selectedSite.monthlySpend,
        outstanding: selectedSite.outstanding,
        avgDays: selectedSite.days,
        incomeReceived: (selectedSite.monthlySpend * 1.1).toFixed(2),
        incomePending: (selectedSite.monthlySpend * 0.25).toFixed(2),
        incomeOverdue: (selectedSite.monthlySpend * 0.15).toFixed(2),
        paymentsMade: (selectedSite.monthlySpend * 0.3).toFixed(2),
        paymentsPending: selectedSite.outstanding,
        paymentsOverdue: (selectedSite.outstanding * 0.47).toFixed(2),
        incomeTransactions: [
          { id: 'REC-001', date: '2024-11-15', amount: (selectedSite.monthlySpend * 0.35).toFixed(2), type: 'Received', status: 'Cleared', description: 'Monthly service fee' },
          { id: 'REC-002', date: '2024-12-01', amount: (selectedSite.monthlySpend * 0.25).toFixed(2), type: 'Pending', status: 'Due', description: 'Monthly service fee', dueDate: '2024-12-15' },
          { id: 'REC-003', date: '2024-10-15', amount: (selectedSite.monthlySpend * 0.33).toFixed(2), type: 'Received', status: 'Cleared', description: 'Monthly service fee' }
        ],
        paymentTransactions: [
          { id: 'PAY-001', date: '2024-11-20', amount: (selectedSite.monthlySpend * 0.15).toFixed(2), vendor: 'Elevator Services Inc', status: 'Paid', description: 'Maintenance' },
          { id: 'PAY-002', date: '2024-12-05', amount: (selectedSite.monthlySpend * 0.20).toFixed(2), vendor: 'Security Services Ltd', status: 'Pending', description: 'Security', dueDate: '2024-12-15' },
          { id: 'PAY-003', date: '2024-09-15', amount: (selectedSite.monthlySpend * 0.25).toFixed(2), vendor: 'Security Services Ltd', status: 'Overdue', description: 'Security', dueDate: '2024-10-01' }
        ],
        vendors: [
          { id: 'sec-1', name: 'Security Services Ltd', category: 'Security', monthlySpend: (selectedSite.monthlySpend * 0.27).toFixed(2), outstanding: (selectedSite.outstanding * 0.28).toFixed(2), days: selectedSite.days + 5, invoices: 2 },
          { id: 'house-1', name: 'Housekeeping Co', category: 'Housekeeping', monthlySpend: (selectedSite.monthlySpend * 0.22).toFixed(2), outstanding: (selectedSite.outstanding * 0.25).toFixed(2), days: selectedSite.days + 2, invoices: 2 },
          { id: 'hvac-1', name: 'HVAC Systems Pvt Ltd', category: 'HVAC', monthlySpend: (selectedSite.monthlySpend * 0.18).toFixed(2), outstanding: (selectedSite.outstanding * 0.19).toFixed(2), days: selectedSite.days - 3, invoices: 1 },
          { id: 'elec-1', name: 'Electrical Maintenance', category: 'Electrical', monthlySpend: (selectedSite.monthlySpend * 0.13).toFixed(2), outstanding: (selectedSite.outstanding * 0.13).toFixed(2), days: selectedSite.days - 5, invoices: 1 },
          { id: 'plumb-1', name: 'Plumbing Services', category: 'Plumbing', monthlySpend: (selectedSite.monthlySpend * 0.11).toFixed(2), outstanding: (selectedSite.outstanding * 0.09).toFixed(2), days: selectedSite.days - 8, invoices: 1 },
          { id: 'elev-1', name: 'Elevator Services Inc', category: 'Elevators', monthlySpend: (selectedSite.monthlySpend * 0.09).toFixed(2), outstanding: (selectedSite.outstanding * 0.06).toFixed(2), days: selectedSite.days - 10, invoices: 1 }
        ],
        spendByCategory: [
          { category: 'Security', value: (selectedSite.monthlySpend * 0.27), percent: 27 },
          { category: 'Housekeeping', value: (selectedSite.monthlySpend * 0.22), percent: 22 },
          { category: 'HVAC', value: (selectedSite.monthlySpend * 0.18), percent: 18 },
          { category: 'Electrical', value: (selectedSite.monthlySpend * 0.13), percent: 13 },
          { category: 'Plumbing', value: (selectedSite.monthlySpend * 0.11), percent: 11 },
          { category: 'Elevators', value: (selectedSite.monthlySpend * 0.09), percent: 9 }
        ]
      };
    }
    
    if (!siteData) return null;

    return (
      <>
        <button
          onClick={() => setSelectedView(null)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#85A383',
            fontSize: '13px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            cursor: 'pointer',
            marginBottom: '24px',
            padding: '4px 0'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#0C2C18'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#85A383'}
        >
          <ChevronLeft strokeWidth={1.5} style={{ width: '16px', height: '16px' }} />
          Back to Sites
        </button>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '32px',
            fontWeight: '300',
            color: '#0C2C18',
            fontFamily: 'Georgia, serif',
            letterSpacing: '-0.01em',
            marginBottom: '4px'
          }}>
            {siteData.name}
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#85A383',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            {siteData.location} • {siteData.type} • {siteData.area}
          </p>
        </div>

        {/* Site Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>MONTHLY SPEND</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>₹{typeof siteData.monthlySpend === 'number' ? siteData.monthlySpend.toFixed(2) : siteData.monthlySpend}Cr</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>OUTSTANDING</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>₹{typeof siteData.outstanding === 'number' ? siteData.outstanding.toFixed(2) : siteData.outstanding}Cr</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>AVG DAYS</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{siteData.avgDays}</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>VENDORS</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{siteData.vendors.length}</div>
          </div>
        </div>

        {/* Income & Payments Table */}
        <div style={{ backgroundColor: '#fff', padding: '24px', border: '1px solid #E7DDCA', marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#0C2C18',
            marginBottom: '20px',
            letterSpacing: '0.05em',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            INCOME & PAYMENT TRACKING
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Income Section */}
            <div>
              <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '16px', fontWeight: '500', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif' }}>INCOME (RECEIVABLES)</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E7DDCA' }}>
                    <td style={{ padding: '12px 0', fontSize: '13px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Received</td>
                    <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: '#85A383', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{typeof siteData.incomeReceived === 'number' ? siteData.incomeReceived.toFixed(2) : siteData.incomeReceived}Cr</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E7DDCA' }}>
                    <td style={{ padding: '12px 0', fontSize: '13px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Pending (Current)</td>
                    <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: '#1B2A21', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{(parseFloat(siteData.incomePending) - parseFloat(siteData.incomeOverdue)).toFixed(2)}Cr</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 0', fontSize: '13px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Overdue</td>
                    <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: '#DF7649', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{typeof siteData.incomeOverdue === 'number' ? siteData.incomeOverdue.toFixed(2) : siteData.incomeOverdue}Cr</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payments Section */}
            <div>
              <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '16px', fontWeight: '500', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif' }}>PAYMENTS (PAYABLES)</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E7DDCA' }}>
                    <td style={{ padding: '12px 0', fontSize: '13px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Total Due</td>
                    <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: '#0C2C18', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{typeof siteData.monthlySpend === 'number' ? siteData.monthlySpend.toFixed(2) : siteData.monthlySpend}Cr</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E7DDCA' }}>
                    <td style={{ padding: '12px 0', fontSize: '13px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Paid</td>
                    <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: '#85A383', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{typeof siteData.paymentsMade === 'number' ? siteData.paymentsMade.toFixed(2) : siteData.paymentsMade}Cr</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E7DDCA' }}>
                    <td style={{ padding: '12px 0', fontSize: '13px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Pending (Current)</td>
                    <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: '#1B2A21', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{(parseFloat(siteData.paymentsPending) - parseFloat(siteData.paymentsOverdue)).toFixed(2)}Cr</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 0', fontSize: '13px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Overdue</td>
                    <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: '#DF7649', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{typeof siteData.paymentsOverdue === 'number' ? siteData.paymentsOverdue.toFixed(2) : siteData.paymentsOverdue}Cr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '16px', marginBottom: '24px' }}>
          {/* Spend by Category Chart */}
          <div style={{ backgroundColor: '#fff', padding: '24px', border: '1px solid #E7DDCA' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#0C2C18',
              marginBottom: '20px',
              letterSpacing: '0.05em',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              SPEND BY CATEGORY
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={siteData.spendByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {siteData.spendByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #0C2C18',
                    borderRadius: '0',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: '16px' }}>
              {siteData.spendByCategory.map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: idx < siteData.spendByCategory.length - 1 ? '1px solid #E7DDCA' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', backgroundColor: COLORS[idx % COLORS.length] }}></div>
                    <span style={{ fontSize: '12px', color: '#0C2C18', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{cat.category}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#0C2C18', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{typeof cat.percent === 'number' ? cat.percent.toFixed(1) : parseFloat(cat.percent).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vendor List */}
          <div style={{ backgroundColor: '#fff', padding: '24px', border: '1px solid #E7DDCA' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#0C2C18',
              marginBottom: '16px',
              letterSpacing: '0.05em',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              VENDORS AT THIS SITE
            </h3>
            <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
              {siteData.vendors.map((vendor, idx) => (
                <div
                  key={vendor.id}
                  onClick={() => {
                    setSelectedVendor(allVendorsData.find(v => v.id === vendor.id));
                    setVendorViewContext('site');
                    setSelectedView('vendor-detail');
                  }}
                  style={{
                    padding: '12px 16px',
                    marginBottom: '8px',
                    backgroundColor: '#E7DDCA',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.border = '1px solid #85A383';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#E7DDCA';
                    e.currentTarget.style.border = 'none';
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#0C2C18', marginBottom: '4px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {vendor.name}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#85A383', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      <span>{vendor.category}</span>
                      <span>₹{typeof vendor.outstanding === 'number' ? vendor.outstanding.toFixed(2) : vendor.outstanding}Cr outstanding</span>
                      <span>{vendor.days} days</span>
                    </div>
                  </div>
                  <ChevronRight strokeWidth={1.5} style={{ width: '16px', height: '16px', color: '#85A383' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div style={{ backgroundColor: '#fff', padding: '24px', border: '1px solid #E7DDCA', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#0C2C18',
              letterSpacing: '0.05em',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              ALL TRANSACTIONS
            </h3>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <select
                value={transactionFilter}
                onChange={(e) => setTransactionFilter(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #0C2C18',
                  backgroundColor: '#fff',
                  color: '#0C2C18',
                  fontSize: '12px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Status</option>
                <option value="cleared">Cleared/Paid</option>
                <option value="pending">Pending/Due</option>
                <option value="overdue">Overdue</option>
              </select>
              
              <select
                value={transactionSort}
                onChange={(e) => setTransactionSort(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #0C2C18',
                  backgroundColor: '#fff',
                  color: '#0C2C18',
                  fontSize: '12px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  cursor: 'pointer'
                }}
              >
                <option value="date-desc">Date (Newest)</option>
                <option value="date-asc">Date (Oldest)</option>
                <option value="amount-desc">Amount (High to Low)</option>
                <option value="amount-asc">Amount (Low to High)</option>
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '2px', marginBottom: '20px', borderBottom: '1px solid #E7DDCA' }}>
            <button
              onClick={() => setTransactionTab('income')}
              style={{
                padding: '10px 20px',
                backgroundColor: transactionTab === 'income' ? '#0C2C18' : 'transparent',
                color: transactionTab === 'income' ? '#E7DDCA' : '#85A383',
                border: 'none',
                fontSize: '13px',
                fontWeight: '500',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderBottom: transactionTab === 'income' ? '2px solid #0C2C18' : '2px solid transparent'
              }}
            >
              Income Transactions
            </button>
            <button
              onClick={() => setTransactionTab('payment')}
              style={{
                padding: '10px 20px',
                backgroundColor: transactionTab === 'payment' ? '#0C2C18' : 'transparent',
                color: transactionTab === 'payment' ? '#E7DDCA' : '#85A383',
                border: 'none',
                fontSize: '13px',
                fontWeight: '500',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderBottom: transactionTab === 'payment' ? '2px solid #0C2C18' : '2px solid transparent'
              }}
            >
              Payment Transactions
            </button>
          </div>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {(() => {
              const transactions = transactionTab === 'income' ? (siteData.incomeTransactions || []) : (siteData.paymentTransactions || []);
              
              // Filter
              let filtered = transactions.filter(txn => {
                if (transactionFilter === 'all') return true;
                if (transactionFilter === 'cleared') return txn.status === 'Cleared' || txn.status === 'Paid';
                if (transactionFilter === 'pending') return txn.status === 'Pending' || txn.status === 'Due';
                if (transactionFilter === 'overdue') return txn.status === 'Overdue';
                return true;
              });
              
              // Sort
              filtered = filtered.sort((a, b) => {
                if (transactionSort === 'date-desc') {
                  return new Date(b.date) - new Date(a.date);
                } else if (transactionSort === 'date-asc') {
                  return new Date(a.date) - new Date(b.date);
                } else if (transactionSort === 'amount-desc') {
                  const aAmt = typeof a.amount === 'number' ? a.amount : parseFloat(a.amount);
                  const bAmt = typeof b.amount === 'number' ? b.amount : parseFloat(b.amount);
                  return bAmt - aAmt;
                } else if (transactionSort === 'amount-asc') {
                  const aAmt = typeof a.amount === 'number' ? a.amount : parseFloat(a.amount);
                  const bAmt = typeof b.amount === 'number' ? b.amount : parseFloat(b.amount);
                  return aAmt - bAmt;
                }
                return 0;
              });
              
              return filtered.map((txn, idx) => (
                <div
                  key={txn.id}
                  style={{
                    padding: '12px 16px',
                    marginBottom: '8px',
                    backgroundColor: '#E7DDCA',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: '#0C2C18', marginBottom: '4px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {txn.id}
                    </div>
                    <div style={{ fontSize: '12px', color: '#85A383', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {transactionTab === 'payment' ? `${txn.vendor} • ` : ''}{txn.description} • {txn.date}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#0C2C18', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      ₹{typeof txn.amount === 'number' ? txn.amount.toFixed(2) : txn.amount}Cr
                    </span>
                    <span style={{
                      fontSize: '10px',
                      padding: '4px 10px',
                      border: txn.status === 'Overdue' ? '1px solid #DF7649' : (txn.status === 'Cleared' || txn.status === 'Paid') ? '1px solid #85A383' : '1px solid #1B2A21',
                      color: txn.status === 'Overdue' ? '#DF7649' : (txn.status === 'Cleared' || txn.status === 'Paid') ? '#85A383' : '#1B2A21',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      minWidth: '70px',
                      textAlign: 'center'
                    }}>
                      {txn.status}
                    </span>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </>
    );
  };

  const VendorDetailView = () => {
    if (!selectedVendor) return null;

    // If coming from site, show only site-specific data
    if (vendorViewContext === 'site' && selectedSite) {
      let siteData = siteDetailData[selectedSite.id];
      
      // Generate fallback site data if not defined
      if (!siteData) {
        siteData = {
          name: selectedSite.name,
          vendors: [
            { id: selectedVendor.id, name: selectedVendor.name, category: selectedVendor.category, 
              monthlySpend: (selectedSite.monthlySpend * 0.27).toFixed(2), 
              outstanding: (selectedSite.outstanding * 0.28).toFixed(2), 
              days: selectedSite.days, 
              invoices: 2,
              invoiceList: [
                { id: 'INV-001', date: '2024-10-01', amount: (selectedSite.monthlySpend * 0.14).toFixed(2), dueDate: '2024-10-15', status: 'Overdue', days: selectedSite.days },
                { id: 'INV-002', date: '2024-11-01', amount: (selectedSite.monthlySpend * 0.13).toFixed(2), dueDate: '2024-11-15', status: 'Overdue', days: Math.max(15, selectedSite.days - 30) },
                { id: 'INV-003', date: '2024-09-01', amount: (selectedSite.monthlySpend * 0.14).toFixed(2), dueDate: '2024-09-15', status: 'Paid', paidDate: '2024-09-28', days: 13 }
              ],
              paymentTracking: [
                { label: 'Total Due', value: (selectedSite.monthlySpend * 0.27).toFixed(2) },
                { label: 'Paid', value: (selectedSite.monthlySpend * 0.14).toFixed(2), color: '#85A383' },
                { label: 'Pending (Current)', value: ((selectedSite.monthlySpend * 0.27) - (selectedSite.outstanding * 0.28) - (selectedSite.monthlySpend * 0.14)).toFixed(2), color: '#1B2A21' },
                { label: 'Overdue', value: (selectedSite.outstanding * 0.28).toFixed(2), color: '#DF7649' }
              ]
            }
          ]
        };
      }
      
      let vendorAtSite = siteData?.vendors.find(v => v.id === selectedVendor.id);
      
      // If vendor not in list, generate data
      if (!vendorAtSite) {
        const vendorDetail = allVendorsData.find(v => v.id === selectedVendor.id);
        const monthlySpendCalc = parseFloat((selectedSite.monthlySpend * 0.27).toFixed(2));
        const outstandingCalc = parseFloat((selectedSite.outstanding * 0.28).toFixed(2));
        
        vendorAtSite = {
          id: selectedVendor.id,
          name: selectedVendor.name,
          category: selectedVendor?.category || vendorDetail?.category || 'Services',
          monthlySpend: monthlySpendCalc,
          outstanding: outstandingCalc,
          days: selectedSite.days,
          invoices: 3,
          invoiceList: [
            { id: 'INV-001', date: '2024-10-01', amount: parseFloat((monthlySpendCalc * 0.5).toFixed(2)), dueDate: '2024-10-15', status: 'Overdue', days: selectedSite.days },
            { id: 'INV-002', date: '2024-11-01', amount: parseFloat((monthlySpendCalc * 0.5).toFixed(2)), dueDate: '2024-11-15', status: 'Overdue', days: Math.max(15, selectedSite.days - 30) },
            { id: 'INV-003', date: '2024-09-01', amount: parseFloat((monthlySpendCalc * 0.5).toFixed(2)), dueDate: '2024-09-15', status: 'Paid', paidDate: '2024-09-28', days: 13 }
          ],
          paymentTracking: [
            { label: 'Total Due', value: monthlySpendCalc.toFixed(2) },
            { label: 'Paid', value: parseFloat((monthlySpendCalc * 0.35).toFixed(2)), color: '#85A383' },
            { label: 'Pending (Current)', value: parseFloat((monthlySpendCalc * 0.10).toFixed(2)), color: '#1B2A21' },
            { label: 'Overdue', value: outstandingCalc.toFixed(2), color: '#DF7649' }
          ]
        };
      }
      
      // Ensure vendorAtSite has invoiceList and paymentTracking
      if (!vendorAtSite.invoiceList) {
        const monthlySpendVal = typeof vendorAtSite.monthlySpend === 'number' ? vendorAtSite.monthlySpend : parseFloat(vendorAtSite.monthlySpend);
        const outstandingVal = typeof vendorAtSite.outstanding === 'number' ? vendorAtSite.outstanding : parseFloat(vendorAtSite.outstanding);
        
        vendorAtSite.invoiceList = [
          { id: 'INV-001', date: '2024-10-01', amount: parseFloat((monthlySpendVal * 0.5).toFixed(2)), dueDate: '2024-10-15', status: 'Overdue', days: vendorAtSite.days },
          { id: 'INV-002', date: '2024-11-01', amount: parseFloat((monthlySpendVal * 0.5).toFixed(2)), dueDate: '2024-11-15', status: 'Overdue', days: Math.max(15, vendorAtSite.days - 30) },
          { id: 'INV-003', date: '2024-09-01', amount: parseFloat((monthlySpendVal * 0.5).toFixed(2)), dueDate: '2024-09-15', status: 'Paid', paidDate: '2024-09-28', days: 13 }
        ];
      }
      
      if (!vendorAtSite.paymentTracking) {
        const monthlySpendVal = typeof vendorAtSite.monthlySpend === 'number' ? vendorAtSite.monthlySpend : parseFloat(vendorAtSite.monthlySpend);
        const outstandingVal = typeof vendorAtSite.outstanding === 'number' ? vendorAtSite.outstanding : parseFloat(vendorAtSite.outstanding);
        
        vendorAtSite.paymentTracking = [
          { label: 'Total Due', value: monthlySpendVal.toFixed(2) },
          { label: 'Paid', value: parseFloat((monthlySpendVal * 0.35).toFixed(2)), color: '#85A383' },
          { label: 'Pending (Current)', value: parseFloat((monthlySpendVal * 0.10).toFixed(2)), color: '#1B2A21' },
          { label: 'Overdue', value: outstandingVal.toFixed(2), color: '#DF7649' }
        ];
      }
      
      if (!vendorAtSite) return null;

      return (
        <>
          <button
            onClick={() => setSelectedView('site-detail')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#85A383',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              cursor: 'pointer',
              marginBottom: '24px',
              padding: '4px 0'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#0C2C18'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#85A383'}
          >
            <ChevronLeft strokeWidth={1.5} style={{ width: '16px', height: '16px' }} />
            Back to {siteData.name}
          </button>

          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ 
              fontSize: '32px',
              fontWeight: '300',
              color: '#0C2C18',
              fontFamily: 'Georgia, serif',
              letterSpacing: '-0.01em',
              marginBottom: '4px'
            }}>
              {vendorAtSite.name}
            </h1>
            <p style={{
              fontSize: '13px',
              color: '#85A383',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              {vendorAtSite.category} • At {siteData.name}
            </p>
          </div>

          {/* Site-Specific Vendor Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
              <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>MONTHLY SPEND</div>
              <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>₹{typeof vendorAtSite.monthlySpend === 'number' ? vendorAtSite.monthlySpend.toFixed(2) : vendorAtSite.monthlySpend}Cr</div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
              <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>OUTSTANDING</div>
              <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>₹{typeof vendorAtSite.outstanding === 'number' ? vendorAtSite.outstanding.toFixed(2) : vendorAtSite.outstanding}Cr</div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
              <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>PAYMENT DAYS</div>
              <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>{vendorAtSite.days}</div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
              <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>INVOICES</div>
              <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{vendorAtSite.invoices}</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '24px', border: '1px solid #E7DDCA' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#0C2C18',
              marginBottom: '16px',
              letterSpacing: '0.05em',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              VENDOR PERFORMANCE AT THIS SITE
            </h3>
            <div style={{ padding: '20px', backgroundColor: '#E7DDCA' }}>
              <p style={{ fontSize: '14px', color: '#1B2A21', lineHeight: '1.6', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                This vendor provides <strong>{vendorAtSite.category}</strong> services to {siteData.name}. 
                Current outstanding amount is <strong style={{ color: '#DF7649' }}>₹{typeof vendorAtSite.outstanding === 'number' ? vendorAtSite.outstanding.toFixed(2) : vendorAtSite.outstanding}Cr</strong> with 
                an average payment delay of <strong style={{ color: '#DF7649' }}>{vendorAtSite.days} days</strong>.
              </p>
            </div>
          </div>
        </>
      );
    }

    // Otherwise show full vendor details (from vendor list)
    let vendorData = vendorDetailData[selectedVendor?.id];
    
    // Generate fallback data if not defined
    if (!vendorData && selectedVendor) {
      const monthlySpendVal = typeof selectedVendor.monthlySpend === 'number' ? selectedVendor.monthlySpend : parseFloat(selectedVendor.monthlySpend);
      const outstandingVal = typeof selectedVendor.outstanding === 'number' ? selectedVendor.outstanding : parseFloat(selectedVendor.outstanding);
      
      vendorData = {
        name: selectedVendor.name,
        category: selectedVendor.category,
        totalSites: selectedVendor.sites,
        monthlySpend: monthlySpendVal,
        outstanding: outstandingVal,
        avgDays: selectedVendor.days,
        sites: [
          { name: 'TechPark Tower A', region: 'Mumbai', monthlySpend: (monthlySpendVal * 0.15).toFixed(2), outstanding: (outstandingVal * 0.15).toFixed(2), days: selectedVendor.days, invoices: 2 },
          { name: 'Business Center BKC', region: 'Mumbai', monthlySpend: (monthlySpendVal * 0.12).toFixed(2), outstanding: (outstandingVal * 0.14).toFixed(2), days: selectedVendor.days + 4, invoices: 2 },
          { name: 'Corporate Hub - Gurgaon', region: 'NCR', monthlySpend: (monthlySpendVal * 0.18).toFixed(2), outstanding: (outstandingVal * 0.17).toFixed(2), days: selectedVendor.days - 3, invoices: 3 },
          { name: 'IT Park - Whitefield', region: 'Bangalore', monthlySpend: (monthlySpendVal * 0.14).toFixed(2), outstanding: (outstandingVal * 0.13).toFixed(2), days: selectedVendor.days - 7, invoices: 2 }
        ],
        invoices: [
          { id: 'INV-001', site: 'TechPark Tower A', date: '2024-10-01', amount: (monthlySpendVal * 0.15).toFixed(2), dueDate: '2024-10-15', status: 'Overdue', days: selectedVendor.days },
          { id: 'INV-002', site: 'TechPark Tower A', date: '2024-11-01', amount: (monthlySpendVal * 0.15).toFixed(2), dueDate: '2024-11-15', status: 'Overdue', days: Math.max(20, selectedVendor.days - 30) },
          { id: 'INV-003', site: 'Business Center BKC', date: '2024-10-05', amount: (monthlySpendVal * 0.12).toFixed(2), dueDate: '2024-10-20', status: 'Overdue', days: selectedVendor.days - 5 },
          { id: 'INV-004', site: 'Corporate Hub - Gurgaon', date: '2024-11-05', amount: (monthlySpendVal * 0.18).toFixed(2), dueDate: '2024-11-20', status: 'Overdue', days: Math.max(15, selectedVendor.days - 35) },
          { id: 'INV-005', site: 'IT Park - Whitefield', date: '2024-12-01', amount: (monthlySpendVal * 0.14).toFixed(2), dueDate: '2024-12-15', status: 'Due Soon', days: 18 },
          { id: 'INV-006', site: 'TechPark Tower A', date: '2024-09-01', amount: (monthlySpendVal * 0.15).toFixed(2), dueDate: '2024-09-15', status: 'Paid', paidDate: '2024-09-20', days: 5 },
          { id: 'INV-007', site: 'Business Center BKC', date: '2024-08-05', amount: (monthlySpendVal * 0.12).toFixed(2), dueDate: '2024-08-20', status: 'Paid', paidDate: '2024-08-25', days: 5 }
        ],
        paymentTracking: [
          { label: 'Total Due', value: monthlySpendVal.toFixed(2) },
          { label: 'Paid', value: (monthlySpendVal * 0.27).toFixed(2), color: '#85A383' },
          { label: 'Pending (Current)', value: (monthlySpendVal * 0.15).toFixed(2), color: '#1B2A21' },
          { label: 'Overdue', value: outstandingVal.toFixed(2), color: '#DF7649' }
        ],
        paymentHistory: [
          { month: 'Jul', paid: monthlySpendVal, days: Math.max(30, selectedVendor.days - 33) },
          { month: 'Aug', paid: monthlySpendVal, days: Math.max(35, selectedVendor.days - 26) },
          { month: 'Sep', paid: monthlySpendVal, days: Math.max(40, selectedVendor.days - 18) },
          { month: 'Oct', paid: 0, days: selectedVendor.days },
          { month: 'Nov', paid: monthlySpendVal * 0.5, days: Math.max(25, selectedVendor.days - 30) },
          { month: 'Dec', paid: 0, days: 18 }
        ]
      };
    }
    
    // Ensure vendorData has paymentTracking
    if (vendorData && !vendorData.paymentTracking) {
      const monthlySpendVal = typeof vendorData.monthlySpend === 'number' ? vendorData.monthlySpend : parseFloat(vendorData.monthlySpend);
      const outstandingVal = typeof vendorData.outstanding === 'number' ? vendorData.outstanding : parseFloat(vendorData.outstanding);
      
      vendorData.paymentTracking = [
        { label: 'Total Due', value: monthlySpendVal.toFixed(2) },
        { label: 'Paid', value: (monthlySpendVal * 0.27).toFixed(2), color: '#85A383' },
        { label: 'Pending (Current)', value: (monthlySpendVal * 0.15).toFixed(2), color: '#1B2A21' },
        { label: 'Overdue', value: outstandingVal.toFixed(2), color: '#DF7649' }
      ];
    }
    
    if (!vendorData) return null;

    return (
      <>
        <button
          onClick={() => setSelectedView(null)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#85A383',
            fontSize: '13px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            cursor: 'pointer',
            marginBottom: '24px',
            padding: '4px 0'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#0C2C18'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#85A383'}
        >
          <ChevronLeft strokeWidth={1.5} style={{ width: '16px', height: '16px' }} />
          Back to Vendors
        </button>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '32px',
            fontWeight: '300',
            color: '#0C2C18',
            fontFamily: 'Georgia, serif',
            letterSpacing: '-0.01em',
            marginBottom: '4px'
          }}>
            {vendorData.name}
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#85A383',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            {vendorData.category} • Operating at {vendorData.totalSites} sites
          </p>
        </div>

        {/* Vendor Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>TOTAL SITES</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{vendorData.totalSites}</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>MONTHLY SPEND</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>₹{typeof vendorData.monthlySpend === 'number' ? vendorData.monthlySpend.toFixed(2) : vendorData.monthlySpend}Cr</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>OUTSTANDING</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>₹{typeof vendorData.outstanding === 'number' ? vendorData.outstanding.toFixed(2) : vendorData.outstanding}Cr</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>AVG DAYS</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>{vendorData.avgDays}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '16px', marginBottom: '24px' }}>
          {/* Payment History */}
          <div style={{ backgroundColor: '#fff', padding: '24px', border: '1px solid #E7DDCA' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#0C2C18',
              marginBottom: '20px',
              letterSpacing: '0.05em',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              PAYMENT HISTORY
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={vendorData.paymentHistory}>
                <CartesianGrid strokeDasharray="0" stroke="#E7DDCA" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#85A383', fontSize: 11, fontFamily: 'system-ui, -apple-system, sans-serif' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#85A383', fontSize: 11, fontFamily: 'system-ui, -apple-system, sans-serif' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #0C2C18',
                    borderRadius: '0',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                />
                <Bar dataKey="paid" fill="#0C2C18" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Tracking */}
          <div style={{ backgroundColor: '#fff', padding: '24px', border: '1px solid #E7DDCA' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#0C2C18',
              marginBottom: '20px',
              letterSpacing: '0.05em',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              PAYMENT TRACKING
            </h3>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
              <tbody>
                {(vendorData.paymentTracking || []).map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < vendorData.paymentTracking.length - 1 ? '1px solid #E7DDCA' : 'none' }}>
                    <td style={{ padding: '12px 0', fontSize: '13px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{item.label}</td>
                    <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: '500', color: item.color || '#0C2C18', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      ₹{typeof item.value === 'number' ? item.value.toFixed(2) : item.value}Cr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <h4 style={{
                fontSize: '11px',
                fontWeight: '500',
                color: '#85A383',
                marginBottom: '12px',
                letterSpacing: '0.05em',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                SITES BREAKDOWN
              </h4>
              <div style={{ maxHeight: '140px', overflowY: 'auto' }}>
                {vendorData.sites.slice(0, 3).map((site, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '8px 12px',
                      marginBottom: '6px',
                      backgroundColor: '#E7DDCA',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ fontSize: '12px', color: '#0C2C18', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{site.name}</span>
                    <span style={{ fontSize: '12px', fontWeight: '500', color: '#DF7649', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      ₹{typeof site.outstanding === 'number' ? site.outstanding.toFixed(2) : site.outstanding}Cr
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Invoices */}
        <div style={{ backgroundColor: '#fff', padding: '24px', border: '1px solid #E7DDCA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#0C2C18',
              letterSpacing: '0.05em',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              ALL INVOICES
            </h3>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <select
                value={invoiceFilter}
                onChange={(e) => setInvoiceFilter(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #0C2C18',
                  backgroundColor: '#fff',
                  color: '#0C2C18',
                  fontSize: '12px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="pending">Pending/Due Soon</option>
              </select>
              
              <select
                value={invoiceSort}
                onChange={(e) => setInvoiceSort(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #0C2C18',
                  backgroundColor: '#fff',
                  color: '#0C2C18',
                  fontSize: '12px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  cursor: 'pointer'
                }}
              >
                <option value="date-desc">Date (Newest)</option>
                <option value="date-asc">Date (Oldest)</option>
                <option value="amount-desc">Amount (High to Low)</option>
                <option value="amount-asc">Amount (Low to High)</option>
                <option value="days-desc">Days (High to Low)</option>
                <option value="days-asc">Days (Low to High)</option>
              </select>
            </div>
          </div>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {(() => {
              let invoices = vendorData.invoices || [];
              
              // Filter
              invoices = invoices.filter(invoice => {
                if (invoiceFilter === 'all') return true;
                if (invoiceFilter === 'paid') return invoice.status === 'Paid';
                if (invoiceFilter === 'overdue') return invoice.status === 'Overdue';
                if (invoiceFilter === 'pending') return invoice.status === 'Due Soon' || invoice.status === 'Pending';
                return true;
              });
              
              // Sort
              invoices = invoices.sort((a, b) => {
                if (invoiceSort === 'date-desc') {
                  return new Date(b.date) - new Date(a.date);
                } else if (invoiceSort === 'date-asc') {
                  return new Date(a.date) - new Date(b.date);
                } else if (invoiceSort === 'amount-desc') {
                  const aAmt = typeof a.amount === 'number' ? a.amount : parseFloat(a.amount);
                  const bAmt = typeof b.amount === 'number' ? b.amount : parseFloat(b.amount);
                  return bAmt - aAmt;
                } else if (invoiceSort === 'amount-asc') {
                  const aAmt = typeof a.amount === 'number' ? a.amount : parseFloat(a.amount);
                  const bAmt = typeof b.amount === 'number' ? b.amount : parseFloat(b.amount);
                  return aAmt - bAmt;
                } else if (invoiceSort === 'days-desc') {
                  return b.days - a.days;
                } else if (invoiceSort === 'days-asc') {
                  return a.days - b.days;
                }
                return 0;
              });
              
              return invoices.map((invoice, idx) => (
                <div
                  key={invoice.id}
                  style={{
                    padding: '12px 16px',
                    marginBottom: '8px',
                    backgroundColor: '#E7DDCA',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flex: 1 }}>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#0C2C18', fontFamily: 'system-ui, -apple-system, sans-serif', width: '100px' }}>{invoice.id}</span>
                    <span style={{ fontSize: '12px', color: '#85A383', fontFamily: 'system-ui, -apple-system, sans-serif', width: '180px' }}>{invoice.site}</span>
                    <span style={{ fontSize: '12px', color: '#85A383', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Date: {invoice.date}</span>
                    <span style={{ fontSize: '12px', color: '#85A383', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Due: {invoice.dueDate}</span>
                    {invoice.paidDate && (
                      <span style={{ fontSize: '12px', color: '#85A383', fontFamily: 'system-ui, -apple-system, sans-serif' }}>Paid: {invoice.paidDate}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#0C2C18', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{typeof invoice.amount === 'number' ? invoice.amount.toFixed(2) : invoice.amount}Cr</span>
                    <span style={{
                      fontSize: '10px',
                      padding: '4px 10px',
                      border: invoice.status === 'Overdue' ? '1px solid #DF7649' : invoice.status === 'Paid' ? '1px solid #85A383' : '1px solid #1B2A21',
                      color: invoice.status === 'Overdue' ? '#DF7649' : invoice.status === 'Paid' ? '#85A383' : '#1B2A21',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      minWidth: '80px',
                      textAlign: 'center'
                    }}>
                      {invoice.status}
                    </span>
                    <span style={{ fontSize: '12px', color: '#85A383', fontFamily: 'system-ui, -apple-system, sans-serif', width: '60px', textAlign: 'right' }}>{invoice.days} days</span>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </>
    );
  };

  const DetailedReportModal = ({ insight, onClose }) => {
    const report = insight.detailReport;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(12, 44, 24, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px'
      }}>
        <div style={{
          backgroundColor: '#E7DDCA',
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid #0C2C18'
        }}>
          <div style={{
            padding: '32px 40px',
            borderBottom: '1px solid #0C2C18',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            backgroundColor: '#fff'
          }}>
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '300',
                color: '#0C2C18',
                fontFamily: 'Georgia, serif',
                marginBottom: '8px'
              }}>
                {insight.title}
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#85A383',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                Detailed Analysis Report
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#85A383',
                padding: '4px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0C2C18'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#85A383'}
            >
              <X strokeWidth={1.5} style={{ width: '24px', height: '24px' }} />
            </button>
          </div>

          <div style={{ padding: '32px 40px' }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              marginBottom: '24px',
              border: '1px solid #0C2C18'
            }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#0C2C18',
                marginBottom: '16px',
                letterSpacing: '0.05em',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                EXECUTIVE SUMMARY
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#1B2A21',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '300'
              }}>
                {report.summary}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {report.keyFindings.map((finding, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#fff',
                  padding: '20px',
                  border: '1px solid #0C2C18'
                }}>
                  <div style={{
                    fontSize: '11px',
                    color: '#85A383',
                    marginBottom: '8px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: '500'
                  }}>
                    {finding.label}
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '300',
                    color: '#0C2C18',
                    fontFamily: 'Georgia, serif',
                    marginBottom: '4px'
                  }}>
                    {finding.value}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: finding.trend.includes('+') || finding.trend.includes('Critical') || finding.trend.includes('High') ? '#DF7649' : '#85A383',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {finding.trend}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              marginBottom: '24px',
              border: '1px solid #0C2C18'
            }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#0C2C18',
                marginBottom: '20px',
                letterSpacing: '0.05em',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                BREAKDOWN BY CATEGORY
              </h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={report.breakdown}>
                  <CartesianGrid strokeDasharray="0" stroke="#E7DDCA" vertical={false} />
                  <XAxis 
                    dataKey="category" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#85A383', fontSize: 11, fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#85A383', fontSize: 11, fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #0C2C18',
                      borderRadius: '0',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                  />
                  <Bar dataKey="amount" fill="#0C2C18" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              border: '1px solid #0C2C18'
            }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#0C2C18',
                marginBottom: '16px',
                letterSpacing: '0.05em',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                RECOMMENDED ACTIONS
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {report.recommendations.map((rec, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: '#E7DDCA'
                  }}>
                    <CheckCircle2 strokeWidth={1.5} style={{ 
                      width: '18px', 
                      height: '18px', 
                      color: '#85A383',
                      flexShrink: 0,
                      marginTop: '2px'
                    }} />
                    <span style={{
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#1B2A21',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontWeight: '300'
                    }}>
                      {rec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === 'dashboard') {
      return (
        <>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ 
              fontSize: '32px',
              fontWeight: '300',
              color: '#0C2C18',
              fontFamily: 'Georgia, serif',
              letterSpacing: '-0.01em',
              marginBottom: '4px'
            }}>
              Cashflow Dashboard
            </h1>
            <p style={{
              fontSize: '13px',
              color: '#85A383',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="bg-white rounded-none p-8 mb-10" style={{ 
            border: '1px solid #0C2C18'
          }}>
            <h2 style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#0C2C18',
              marginBottom: '20px',
              letterSpacing: '0.05em',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              MORNING BRIEFING
            </h2>
            
            <div style={{ marginBottom: '24px' }}>
              <p style={{ 
                color: '#1B2A21',
                fontSize: '15px',
                lineHeight: '1.7',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '300',
                marginBottom: '20px'
              }}>
                Your cashflow health shows mixed signals this month. While collections are improving with DSO dropping to 36 days, vendor payments continue to stretch thin at 65 days average. The working capital gap has widened to -29 days, primarily driven by regional imbalances in Mumbai and NCR.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '16px', borderLeft: '2px solid #85A383' }}>
                <div style={{ fontSize: '14px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  <span style={{ fontWeight: '500', color: '#0C2C18' }}>•</span> Outstanding to vendors: ₹12.8Cr across 65 days average
                </div>
                <div style={{ fontSize: '14px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  <span style={{ fontWeight: '500', color: '#0C2C18' }}>•</span> Client receivables: ₹18.2Cr with improving collection at 36 days
                </div>
                <div style={{ fontSize: '14px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  <span style={{ fontWeight: '500', color: '#0C2C18' }}>•</span> Two critical vendors (Security, Housekeeping) require immediate attention
                </div>
                <div style={{ fontSize: '14px', color: '#1B2A21', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  <span style={{ fontWeight: '500', color: '#0C2C18' }}>•</span> Mumbai and NCR regions showing highest working capital strain
                </div>
              </div>
            </div>
              
            <button 
              onClick={() => setSelectedInsight(insights[0])}
              style={{
                padding: '12px 28px',
                backgroundColor: '#0C2C18',
                color: '#E7DDCA',
                border: 'none',
                fontSize: '13px',
                fontWeight: '500',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1B2A21'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0C2C18'}
            >
              Dig deeper
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {kpiData.map((kpi) => (
              <div
                key={kpi.id}
                className="bg-white rounded-none cursor-pointer transition-all"
                style={{ 
                  border: '1px solid #0C2C18',
                  padding: '32px 28px'
                }}
                onClick={() => setExpandedCard(expandedCard === kpi.id ? null : kpi.id)}
              >
                <div style={{ 
                  fontSize: '10px',
                  fontWeight: '500',
                  color: '#85A383',
                  marginBottom: '24px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {kpi.title}
                </div>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span style={{ 
                    fontSize: '56px',
                    fontWeight: '300',
                    color: '#0C2C18',
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '-0.02em'
                  }}>
                    {kpi.metric}
                  </span>
                  <span style={{ 
                    fontSize: '18px',
                    color: '#85A383',
                    fontWeight: '300',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {kpi.unit}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    border: kpi.trend.isNegative ? '1px solid #DF7649' : '1px solid #85A383',
                    fontSize: '12px',
                    fontWeight: '400',
                    color: kpi.trend.isNegative ? '#DF7649' : '#85A383',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    {kpi.trend.direction === 'up' ? (
                      <TrendingUp strokeWidth={1.5} style={{ width: '14px', height: '14px' }} />
                    ) : (
                      <TrendingDown strokeWidth={1.5} style={{ width: '14px', height: '14px' }} />
                    )}
                    <span>{kpi.trend.value} days</span>
                  </div>

                  <button style={{ color: '#85A383' }}>
                    <ChevronDown 
                      strokeWidth={1.5}
                      style={{ 
                        width: '18px', 
                        height: '18px',
                        transform: expandedCard === kpi.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }} 
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {expandedCard && (
            <div className="bg-white rounded-none mb-10" style={{ 
              border: '1px solid #0C2C18',
              padding: '32px 40px'
            }}>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <h3 style={{ 
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#0C2C18',
                    marginBottom: '20px',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    6-MONTH TREND
                  </h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={kpiData.find(k => k.id === expandedCard).trendData}>
                      <CartesianGrid strokeDasharray="0" stroke="#E7DDCA" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#85A383', fontSize: 11, fontFamily: 'system-ui, -apple-system, sans-serif' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#85A383', fontSize: 11, fontFamily: 'system-ui, -apple-system, sans-serif' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff',
                          border: '1px solid #0C2C18',
                          borderRadius: '0',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                        labelStyle={{ color: '#0C2C18', fontWeight: 500 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#0C2C18" 
                        strokeWidth={2}
                        dot={{ fill: '#0C2C18', strokeWidth: 0, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 style={{ 
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#0C2C18',
                    marginBottom: '20px',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    TOP 10 BY OUTSTANDING
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                    {kpiData.find(k => k.id === expandedCard).topImpact.map((item, idx) => (
                      <div 
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          backgroundColor: '#E7DDCA',
                          border: '1px solid transparent',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#85A383';
                          e.currentTarget.style.backgroundColor = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'transparent';
                          e.currentTarget.style.backgroundColor = '#E7DDCA';
                        }}
                        onClick={() => alert(`View details for ${item.name}`)}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                            <span style={{ 
                              fontSize: '10px',
                              fontWeight: '500',
                              color: '#85A383',
                              width: '18px',
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}>
                              {idx + 1}
                            </span>
                            <span style={{ 
                              fontWeight: '400',
                              color: '#0C2C18',
                              fontSize: '13px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}>
                              {item.name}
                            </span>
                          </div>
                          <div style={{ 
                            fontSize: '11px',
                            color: '#85A383',
                            marginLeft: '30px',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}>
                            {item.detail}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', marginLeft: '20px' }}>
                          <div style={{ 
                            fontWeight: '500',
                            color: '#0C2C18',
                            marginBottom: '2px',
                            fontSize: '13px',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}>
                            {item.amount}
                          </div>
                          <div style={{ 
                            fontSize: '11px',
                            color: '#85A383',
                            fontFamily: 'system-ui, -apple-system, sans-serif'
                          }}>
                            {item.days} days
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <h2 style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#0C2C18',
              marginBottom: '16px',
              letterSpacing: '0.05em',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              RECOMMENDED ACTIONS
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recommendedActions.map((action) => (
                <div
                  key={action.id}
                  className="bg-white rounded-none"
                  style={{ 
                    border: '1px solid #0C2C18',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#0C2C18',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      marginBottom: '8px'
                    }}>
                      {action.title}
                    </h3>
                    
                    <p style={{ 
                      color: '#1B2A21',
                      fontSize: '13px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontWeight: '300',
                      lineHeight: '1.5',
                      marginBottom: '10px'
                    }}>
                      {action.description}
                    </p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                      {action.vendor && (
                        <span style={{
                          padding: '4px 10px',
                          backgroundColor: '#E7DDCA',
                          color: '#0C2C18',
                          fontSize: '11px',
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          border: '1px solid #85A383'
                        }}>
                          {action.vendor}
                        </span>
                      )}
                      {action.sites.slice(0, 3).map((site, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: '#fff',
                            color: '#85A383',
                            fontSize: '11px',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            border: '1px solid #E7DDCA'
                          }}
                        >
                          {site}
                        </span>
                      ))}
                      {action.sites.length > 3 && (
                        <span style={{
                          fontSize: '11px',
                          color: '#85A383',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}>
                          +{action.sites.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedInsight(action.linkedInsight)}
                    style={{
                      padding: '10px 24px',
                      backgroundColor: '#0C2C18',
                      color: '#E7DDCA',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: '400',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      marginLeft: '24px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1B2A21'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0C2C18'}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else if (activeTab === 'analysis') {
      if (selectedView === 'site-detail') {
        return <SiteDetailView />;
      } else if (selectedView === 'vendor-detail') {
        return <VendorDetailView />;
      } else {
        return (
          <>
            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '2px', marginBottom: '32px', borderBottom: '1px solid #E7DDCA' }}>
              <button
                onClick={() => setAnalysisTab('sites')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: analysisTab === 'sites' ? '#0C2C18' : 'transparent',
                  color: analysisTab === 'sites' ? '#E7DDCA' : '#85A383',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: analysisTab === 'sites' ? '2px solid #0C2C18' : '2px solid transparent'
                }}
              >
                Sites
              </button>
              <button
                onClick={() => setAnalysisTab('vendors')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: analysisTab === 'vendors' ? '#0C2C18' : 'transparent',
                  color: analysisTab === 'vendors' ? '#E7DDCA' : '#85A383',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: analysisTab === 'vendors' ? '2px solid #0C2C18' : '2px solid transparent'
                }}
              >
                Vendors
              </button>
            </div>

            {analysisTab === 'sites' ? <SitesTableView /> : <VendorsTableView />}
          </>
        );
      }
    } else if (activeTab === 'assistant') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
          {/* Chat Messages Area */}
          {messages.length > 1 ? (
            <div style={{ 
              flex: 1, 
              overflowY: 'auto',
              padding: '40px 80px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {messages.slice(1).map((message) => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  {message.type === 'assistant' && (
                    <div style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: '#0C2C18',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      borderRadius: '50%'
                    }}>
                      <MessageSquare strokeWidth={1.5} style={{ width: '18px', height: '18px', color: '#E7DDCA' }} />
                    </div>
                  )}
                  
                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '16px 20px',
                      backgroundColor: message.type === 'user' ? '#0C2C18' : '#fff',
                      color: message.type === 'user' ? '#E7DDCA' : '#1B2A21',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      border: message.type === 'assistant' ? '1px solid #E7DDCA' : 'none',
                      borderRadius: '12px'
                    }}
                  >
                    {message.content}
                  </div>
                  
                  {message.type === 'user' && (
                    <div style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: '#85A383',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      borderRadius: '50%'
                    }}>
                      <Users strokeWidth={1.5} style={{ width: '18px', height: '18px', color: '#fff' }} />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#0C2C18',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    borderRadius: '50%'
                  }}>
                    <MessageSquare strokeWidth={1.5} style={{ width: '18px', height: '18px', color: '#E7DDCA' }} />
                  </div>
                  
                  <div
                    style={{
                      padding: '16px 20px',
                      backgroundColor: '#fff',
                      fontSize: '14px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      border: '1px solid #E7DDCA',
                      borderRadius: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#85A383', borderRadius: '50%', animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#85A383', borderRadius: '50%', animation: 'pulse 1.5s ease-in-out 0.3s infinite' }}></div>
                      <div style={{ width: '8px', height: '8px', backgroundColor: '#85A383', borderRadius: '50%', animation: 'pulse 1.5s ease-in-out 0.6s infinite' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div style={{
              padding: '40px'
            }}>
              <h1 style={{ 
                fontSize: '40px',
                fontWeight: '400',
                color: '#0C2C18',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                textAlign: 'center'
              }}>
                Hi Nidhi, ready to decode the trends?
              </h1>
            </div>
          )}

          {/* Input Area - Fixed at bottom */}
          <div  style={{ 
            padding: '24px 80px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            backgroundColor: '#E7DDCA'
          }}>
            <div style={{ 
              backgroundColor: '#fff', 
              border: '2px solid #85A383',
              borderRadius: '24px',
              padding: '6px 6px 6px 24px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(12, 44, 24, 0.08)'
            }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="What would you like to know?"
                style={{
                  flex: 1,
                  padding: '12px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#0C2C18',
                  fontSize: '15px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: inputMessage.trim() ? '#85A383' : '#E7DDCA',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (inputMessage.trim()) {
                    e.currentTarget.style.backgroundColor = '#0C2C18';
                  }
                }}
                onMouseLeave={(e) => {
                  if (inputMessage.trim()) {
                    e.currentTarget.style.backgroundColor = '#85A383';
                  }
                }}
              >
                <Send strokeWidth={2} style={{ width: '18px', height: '18px' }} />
              </button>
            </div>

            {/* Suggested Prompts - Below input */}
            {messages.length === 1 && (
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px',
                justifyContent: 'center'
              }}>
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptClick(prompt)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      border: '1px solid #85A383',
                      color: '#0C2C18',
                      fontSize: '13px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      borderRadius: '20px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                      e.currentTarget.style.borderColor = '#0C2C18';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = '#85A383';
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#E7DDCA' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
      <div style={{ 
        width: '240px',
        backgroundColor: '#0C2C18',
        padding: '32px 0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '0 24px', marginBottom: '48px' }}>
          <div style={{ 
            fontSize: '22px',
            fontWeight: '300',
            color: '#E7DDCA',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.05em'
          }}>
            MORRIE
          </div>
        </div>
        
        <nav style={{ flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'analysis') {
                    setAnalysisTab('sites');
                    setSelectedView(null);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  backgroundColor: isActive ? '#1B2A21' : 'transparent',
                  borderLeft: isActive ? '2px solid #85A383' : '2px solid transparent',
                  color: isActive ? '#E7DDCA' : '#85A383',
                  fontSize: '14px',
                  fontWeight: '400',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#1B2A21';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon strokeWidth={1.5} style={{ width: '18px', height: '18px' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className='h-screen overflow-auto' style={{ flex: 1, padding: '32px 48px' }}>
        {renderContent()}
      </div>

      {selectedInsight && (
        <DetailedReportModal 
          insight={selectedInsight} 
          onClose={() => setSelectedInsight(null)} 
        />
      )}
    </div>
  );
};

export default FMFinanceDashboard;
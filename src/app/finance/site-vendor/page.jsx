"use client"
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, LayoutDashboard, Building2, MessageSquare, ChevronLeft, Search, ArrowUpDown, ArrowUp, ArrowDown, Download, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ComposedChart } from 'recharts';

const FMSiteVendorAnalysis = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  
  // Site Analysis State
  const [analysisTab, setAnalysisTab] = useState('sites');
  const [selectedView, setSelectedView] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorViewContext, setVendorViewContext] = useState(null);
  const [regionFilter, setRegionFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Sites filters
  const [clientFilter, setClientFilter] = useState('all');
  const [dsoRangeFilter, setDsoRangeFilter] = useState('all');
  const [dpoRangeFilter, setDpoRangeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Vendors filters
  const [paymentDaysFilter, setPaymentDaysFilter] = useState('all');
  const [vendorStatusFilter, setVendorStatusFilter] = useState('all');
  
  // Timeframe Filter
  const [timeframe, setTimeframe] = useState('last-30-days');
  
  // Search State
  const [siteSearch, setSiteSearch] = useState('');
  const [vendorSearch, setVendorSearch] = useState('');
  
  // Filter panel state
  const [showFilters, setShowFilters] = useState(false);
  const [showVendorFilters, setShowVendorFilters] = useState(false);
  
  // Sort State
  const [siteSortColumn, setSiteSortColumn] = useState('name');
  const [siteSortDirection, setSiteSortDirection] = useState('asc');
  const [vendorSortColumn, setVendorSortColumn] = useState('name');
  const [vendorSortDirection, setVendorSortDirection] = useState('asc');
  
  // Transaction filters
  const [transactionTab, setTransactionTab] = useState('income');
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [transactionSort, setTransactionSort] = useState('date-desc');

  const allSitesData = [
    { id: 'tp-a', name: 'TechPark Tower A', region: 'Mumbai', type: 'Commercial', monthlySpend: 0.45, vendors: 8, outstanding: 0.32, days: 52, dso: 48, dpo: 56, riskLevel: 'high' },
    { id: 'mm-1', name: 'Metro Mall - Andheri', region: 'Mumbai', type: 'Retail', monthlySpend: 0.38, vendors: 6, outstanding: 0.28, days: 48, dso: 45, dpo: 51, riskLevel: 'medium' },
    { id: 'bc-bkc', name: 'Business Center BKC', region: 'Mumbai', type: 'Commercial', monthlySpend: 0.52, vendors: 9, outstanding: 0.35, days: 56, dso: 52, dpo: 60, riskLevel: 'high' },
    { id: 'ip-lower', name: 'Industrial Park - Lower Parel', region: 'Mumbai', type: 'Industrial', monthlySpend: 0.48, vendors: 7, outstanding: 0.29, days: 51, dso: 47, dpo: 55, riskLevel: 'medium' },
    { id: 'ch-ggn', name: 'Corporate Hub - Gurgaon', region: 'NCR', type: 'Commercial', monthlySpend: 0.62, vendors: 10, outstanding: 0.48, days: 58, dso: 54, dpo: 62, riskLevel: 'high' },
    { id: 'tp-cyber', name: 'Tech Campus - Cyber City', region: 'NCR', type: 'Commercial', monthlySpend: 0.55, vendors: 9, outstanding: 0.42, days: 54, dso: 50, dpo: 58, riskLevel: 'high' },
    { id: 'rp-noida', name: 'Retail Plaza - Noida', region: 'NCR', type: 'Retail', monthlySpend: 0.41, vendors: 7, outstanding: 0.31, days: 49, dso: 45, dpo: 53, riskLevel: 'medium' },
    { id: 'ph-mall', name: 'Retail Mall - Phoenix', region: 'Bangalore', type: 'Retail', monthlySpend: 0.48, vendors: 8, outstanding: 0.35, days: 52, dso: 48, dpo: 56, riskLevel: 'medium' },
    { id: 'it-ww', name: 'IT Park - Whitefield', region: 'Bangalore', type: 'Commercial', monthlySpend: 0.52, vendors: 9, outstanding: 0.38, days: 55, dso: 51, dpo: 59, riskLevel: 'high' },
    { id: 'go-park', name: 'Green Office Park', region: 'Bangalore', type: 'Commercial', monthlySpend: 0.38, vendors: 6, outstanding: 0.24, days: 42, dso: 38, dpo: 46, riskLevel: 'low' }
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
      avgDSO: 48,
      avgDPO: 56,
      incomeReceived: 0.48,
      incomePending: 0.17,
      incomeOverdue: 0.08,
      paymentsMade: 0.13,
      paymentsPending: 0.32,
      paymentsOverdue: 0.15,
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

  const incomeExpenseData = [
    { month: 'Jul', income: 18.5, expense: 16.2 },
    { month: 'Aug', income: 19.2, expense: 17.1 },
    { month: 'Sep', income: 18.8, expense: 17.5 },
    { month: 'Oct', income: 19.5, expense: 18.8 },
    { month: 'Nov', income: 20.1, expense: 19.6 },
    { month: 'Dec', income: 19.8, expense: 19.2 }
  ];

  const vendorCategoryAggregations = useMemo(() => {
    const filtered = allVendorsData.filter(vendor => {
      const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
      return matchesCategory;
    });

    const categories = [...new Set(allVendorsData.map(v => v.category))];
    return categories.map(category => {
      const categoryVendors = filtered.filter(v => v.category === category);
      if (categoryVendors.length === 0) return null;
      
      return {
        category,
        vendors: categoryVendors.length,
        avgDays: Math.round(categoryVendors.reduce((acc, v) => acc + v.days, 0) / categoryVendors.length),
        totalSpend: categoryVendors.reduce((acc, v) => acc + v.monthlySpend, 0),
        totalOutstanding: categoryVendors.reduce((acc, v) => acc + v.outstanding, 0)
      };
    }).filter(Boolean);
  }, [categoryFilter]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'Site & Vendor Analysis', icon: Building2 },
    { id: 'invoices', label: 'Client Invoices', icon: FileText },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquare }
  ];

  const COLORS = ['#0C2C18', '#1B2A21', '#85A383', '#DF7649', '#E7DDCA', '#878B87'];

  const regionalAggregations = useMemo(() => {
    const filtered = allSitesData.filter(site => {
      const matchesRegion = regionFilter === 'all' || site.region === regionFilter;
      return matchesRegion;
    });

    const regions = ['Mumbai', 'NCR', 'Bangalore'];
    return regions.map(region => {
      const regionSites = filtered.filter(s => s.region === region);
      if (regionSites.length === 0) return null;
      
      return {
        region,
        sites: regionSites.length,
        avgDSO: Math.round(regionSites.reduce((acc, s) => acc + s.dso, 0) / regionSites.length),
        avgDPO: Math.round(regionSites.reduce((acc, s) => acc + s.dpo, 0) / regionSites.length),
        totalSpend: regionSites.reduce((acc, s) => acc + s.monthlySpend, 0),
        totalOutstanding: regionSites.reduce((acc, s) => acc + s.outstanding, 0)
      };
    }).filter(Boolean);
  }, [regionFilter]);

  const getFilteredAndSortedSites = () => {
    let filtered = allSitesData.filter(site => {
      const matchesRegion = regionFilter === 'all' || site.region === regionFilter;
      const matchesSearch = site.name.toLowerCase().includes(siteSearch.toLowerCase()) || 
                           site.id.toLowerCase().includes(siteSearch.toLowerCase());
      
      // Client filter (for now, we'll use site type as a proxy since we don't have client data in the structure)
      const matchesClient = clientFilter === 'all' || site.type === clientFilter;
      
      // DSO range filter
      let matchesDSO = true;
      if (dsoRangeFilter === '0-30') matchesDSO = site.dso <= 30;
      else if (dsoRangeFilter === '31-45') matchesDSO = site.dso >= 31 && site.dso <= 45;
      else if (dsoRangeFilter === '46-60') matchesDSO = site.dso >= 46 && site.dso <= 60;
      else if (dsoRangeFilter === '60+') matchesDSO = site.dso > 60;
      
      // DPO range filter
      let matchesDPO = true;
      if (dpoRangeFilter === '0-30') matchesDPO = site.dpo <= 30;
      else if (dpoRangeFilter === '31-45') matchesDPO = site.dpo >= 31 && site.dpo <= 45;
      else if (dpoRangeFilter === '46-60') matchesDPO = site.dpo >= 46 && site.dpo <= 60;
      else if (dpoRangeFilter === '60+') matchesDPO = site.dpo > 60;
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || site.riskLevel === statusFilter;
      
      return matchesRegion && matchesSearch && matchesClient && matchesDSO && matchesDPO && matchesStatus;
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
      
      // Payment days range filter
      let matchesDays = true;
      if (paymentDaysFilter === '0-30') matchesDays = vendor.days <= 30;
      else if (paymentDaysFilter === '31-45') matchesDays = vendor.days >= 31 && vendor.days <= 45;
      else if (paymentDaysFilter === '46-60') matchesDays = vendor.days >= 46 && vendor.days <= 60;
      else if (paymentDaysFilter === '60+') matchesDays = vendor.days > 60;
      
      // Status filter
      const matchesStatus = vendorStatusFilter === 'all' || vendor.riskLevel === vendorStatusFilter;
      
      return matchesCategory && matchesSearch && matchesDays && matchesStatus;
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

  const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
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

  const IncomeExpenseChart = ({ data, height = 280 }) => (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data}>
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
        <Bar dataKey="income" fill="#85A383" name="Income" />
        <Bar dataKey="expense" fill="#DF7649" name="Expenses" />
        <Line 
          type="monotone" 
          dataKey="income" 
          stroke="#0C2C18" 
          strokeWidth={2}
          dot={false}
          name="Income Trend"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );

  const clearAllFilters = () => {
    setTimeframe('last-30-days');
    setRegionFilter('all');
    setClientFilter('all');
    setDsoRangeFilter('all');
    setDpoRangeFilter('all');
    setStatusFilter('all');
  };

  const clearVendorFilters = () => {
    setTimeframe('last-30-days');
    setCategoryFilter('all');
    setPaymentDaysFilter('all');
    setVendorStatusFilter('all');
  };

  const activeFiltersCount = [
    timeframe !== 'last-30-days',
    regionFilter !== 'all',
    clientFilter !== 'all',
    dsoRangeFilter !== 'all',
    dpoRangeFilter !== 'all',
    statusFilter !== 'all'
  ].filter(Boolean).length;

  const activeVendorFiltersCount = [
    timeframe !== 'last-30-days',
    categoryFilter !== 'all',
    paymentDaysFilter !== 'all',
    vendorStatusFilter !== 'all'
  ].filter(Boolean).length;

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

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #0C2C18',
                color: '#0C2C18',
                fontSize: '13px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Filters
              {activeFiltersCount > 0 && (
                <span style={{
                  backgroundColor: '#0C2C18',
                  color: '#E7DDCA',
                  borderRadius: '10px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  fontWeight: '500'
                }}>
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown strokeWidth={1.5} style={{ 
                width: '14px', 
                height: '14px',
                transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }} />
            </button>

            {showFilters && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                backgroundColor: '#fff',
                border: '1px solid #0C2C18',
                padding: '20px',
                minWidth: '320px',
                zIndex: 100,
                boxShadow: '0 4px 6px rgba(12, 44, 24, 0.1)'
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    fontSize: '11px', 
                    color: '#85A383', 
                    marginBottom: '8px', 
                    display: 'block',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    TIMEFRAME
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E7DDCA',
                      backgroundColor: '#fff',
                      color: '#0C2C18',
                      fontSize: '13px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="last-7-days">Last 7 Days</option>
                    <option value="last-30-days">Last 30 Days</option>
                    <option value="last-quarter">Last Quarter</option>
                    <option value="last-6-months">Last 6 Months</option>
                    <option value="last-year">Last Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    fontSize: '11px', 
                    color: '#85A383', 
                    marginBottom: '8px', 
                    display: 'block',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    REGION
                  </label>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E7DDCA',
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
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    fontSize: '11px', 
                    color: '#85A383', 
                    marginBottom: '8px', 
                    display: 'block',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    CLIENT
                  </label>
                  <select
                    value={clientFilter}
                    onChange={(e) => setClientFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E7DDCA',
                      backgroundColor: '#fff',
                      color: '#0C2C18',
                      fontSize: '13px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Clients</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Retail">Retail</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    fontSize: '11px', 
                    color: '#85A383', 
                    marginBottom: '8px', 
                    display: 'block',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    DSO RANGE
                  </label>
                  <select
                    value={dsoRangeFilter}
                    onChange={(e) => setDsoRangeFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E7DDCA',
                      backgroundColor: '#fff',
                      color: '#0C2C18',
                      fontSize: '13px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Ranges</option>
                    <option value="0-30">0-30 days</option>
                    <option value="31-45">31-45 days</option>
                    <option value="46-60">46-60 days</option>
                    <option value="60+">60+ days</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    fontSize: '11px', 
                    color: '#85A383', 
                    marginBottom: '8px', 
                    display: 'block',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    DPO RANGE
                  </label>
                  <select
                    value={dpoRangeFilter}
                    onChange={(e) => setDpoRangeFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E7DDCA',
                      backgroundColor: '#fff',
                      color: '#0C2C18',
                      fontSize: '13px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Ranges</option>
                    <option value="0-30">0-30 days</option>
                    <option value="31-45">31-45 days</option>
                    <option value="46-60">46-60 days</option>
                    <option value="60+">60+ days</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    fontSize: '11px', 
                    color: '#85A383', 
                    marginBottom: '8px', 
                    display: 'block',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    STATUS
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E7DDCA',
                      backgroundColor: '#fff',
                      color: '#0C2C18',
                      fontSize: '13px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <button
                  onClick={clearAllFilters}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: '#E7DDCA',
                    border: '1px solid #0C2C18',
                    color: '#0C2C18',
                    fontSize: '12px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => exportToCSV(filteredSites, 'sites-data.csv')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#0C2C18',
              color: '#E7DDCA',
              border: 'none',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download strokeWidth={1.5} style={{ width: '16px', height: '16px' }} />
            Export
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div style={{ marginBottom: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#85A383', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Active filters:
          </span>
          {timeframe !== 'last-30-days' && (
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#fff',
              border: '1px solid #0C2C18',
              fontSize: '12px',
              color: '#0C2C18',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Timeframe: {timeframe.replace(/-/g, ' ')}
            </span>
          )}
          {regionFilter !== 'all' && (
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#fff',
              border: '1px solid #0C2C18',
              fontSize: '12px',
              color: '#0C2C18',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Region: {regionFilter}
            </span>
          )}
          {clientFilter !== 'all' && (
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#fff',
              border: '1px solid #0C2C18',
              fontSize: '12px',
              color: '#0C2C18',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Client: {clientFilter}
            </span>
          )}
          {dsoRangeFilter !== 'all' && (
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#fff',
              border: '1px solid #0C2C18',
              fontSize: '12px',
              color: '#0C2C18',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              DSO: {dsoRangeFilter} days
            </span>
          )}
          {dpoRangeFilter !== 'all' && (
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#fff',
              border: '1px solid #0C2C18',
              fontSize: '12px',
              color: '#0C2C18',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              DPO: {dpoRangeFilter} days
            </span>
          )}
          {statusFilter !== 'all' && (
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#fff',
              border: '1px solid #0C2C18',
              fontSize: '12px',
              color: '#0C2C18',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Status: {statusFilter}
            </span>
          )}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
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
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>AVG DSO</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{filteredSites.length > 0 ? Math.round(filteredSites.reduce((acc, s) => acc + s.dso, 0) / filteredSites.length) : 0}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>AVG DPO</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>{filteredSites.length > 0 ? Math.round(filteredSites.reduce((acc, s) => acc + s.dpo, 0) / filteredSites.length) : 0}</div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '24px', border: '1px solid #E7DDCA', marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '12px',
          fontWeight: '500',
          color: '#0C2C18',
          marginBottom: '20px',
          letterSpacing: '0.05em',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          INCOME VS EXPENSES TREND
        </h3>
        <IncomeExpenseChart data={incomeExpenseData} />
      </div>

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
              <th onClick={() => handleSiteSort('dso')} style={{ padding: '16px 20px', textAlign: 'right', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  DSO
                  <SortIcon column="dso" currentColumn={siteSortColumn} direction={siteSortDirection} />
                </div>
              </th>
              <th onClick={() => handleSiteSort('dpo')} style={{ padding: '16px 20px', textAlign: 'right', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  DPO
                  <SortIcon column="dpo" currentColumn={siteSortColumn} direction={siteSortDirection} />
                </div>
              </th>
              <th onClick={() => handleSiteSort('outstanding')} style={{ padding: '16px 20px', textAlign: 'right', fontSize: '11px', fontWeight: '500', color: '#85A383', letterSpacing: '0.05em', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                  OUTSTANDING
                  <SortIcon column="outstanding" currentColumn={siteSortColumn} direction={siteSortDirection} />
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
                <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '500', color: '#0C2C18', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{site.dso}d</td>
                <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '500', color: '#DF7649', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{site.dpo}d</td>
                <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '500', color: '#DF7649', textAlign: 'right', fontFamily: 'system-ui, -apple-system, sans-serif' }}>₹{site.outstanding}Cr</td>
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

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowVendorFilters(!showVendorFilters)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #0C2C18',
                color: '#0C2C18',
                fontSize: '13px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Filters
              {activeVendorFiltersCount > 0 && (
                <span style={{
                  backgroundColor: '#0C2C18',
                  color: '#E7DDCA',
                  borderRadius: '10px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  fontWeight: '500'
                }}>
                  {activeVendorFiltersCount}
                </span>
              )}
              <ChevronDown strokeWidth={1.5} style={{ 
                width: '14px', 
                height: '14px',
                transform: showVendorFilters ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }} />
            </button>

            {showVendorFilters && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                backgroundColor: '#fff',
                border: '1px solid #0C2C18',
                padding: '20px',
                minWidth: '320px',
                zIndex: 100,
                boxShadow: '0 4px 6px rgba(12, 44, 24, 0.1)'
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    fontSize: '11px', 
                    color: '#85A383', 
                    marginBottom: '8px', 
                    display: 'block',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    TIMEFRAME
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E7DDCA',
                      backgroundColor: '#fff',
                      color: '#0C2C18',
                      fontSize: '13px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="last-7-days">Last 7 Days</option>
                    <option value="last-30-days">Last 30 Days</option>
                    <option value="last-quarter">Last Quarter</option>
                    <option value="last-6-months">Last 6 Months</option>
                    <option value="last-year">Last Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    fontSize: '11px', 
                    color: '#85A383', 
                    marginBottom: '8px', 
                    display: 'block',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    CATEGORY
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E7DDCA',
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

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    fontSize: '11px', 
                    color: '#85A383', 
                    marginBottom: '8px', 
                    display: 'block',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    PAYMENT DAYS RANGE
                  </label>
                  <select
                    value={paymentDaysFilter}
                    onChange={(e) => setPaymentDaysFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E7DDCA',
                      backgroundColor: '#fff',
                      color: '#0C2C18',
                      fontSize: '13px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Ranges</option>
                    <option value="0-30">0-30 days</option>
                    <option value="31-45">31-45 days</option>
                    <option value="46-60">46-60 days</option>
                    <option value="60+">60+ days</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ 
                    fontSize: '11px', 
                    color: '#85A383', 
                    marginBottom: '8px', 
                    display: 'block',
                    fontWeight: '500',
                    letterSpacing: '0.05em',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    STATUS
                  </label>
                  <select
                    value={vendorStatusFilter}
                    onChange={(e) => setVendorStatusFilter(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #E7DDCA',
                      backgroundColor: '#fff',
                      color: '#0C2C18',
                      fontSize: '13px',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Status</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <button
                  onClick={clearVendorFilters}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: '#E7DDCA',
                    border: '1px solid #0C2C18',
                    color: '#0C2C18',
                    fontSize: '12px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => exportToCSV(filteredVendors, 'vendors-data.csv')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#0C2C18',
              color: '#E7DDCA',
              border: 'none',
              fontSize: '13px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download strokeWidth={1.5} style={{ width: '16px', height: '16px' }} />
            Export
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeVendorFiltersCount > 0 && (
        <div style={{ marginBottom: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#85A383', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Active filters:
          </span>
          {timeframe !== 'last-30-days' && (
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#fff',
              border: '1px solid #0C2C18',
              fontSize: '12px',
              color: '#0C2C18',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Timeframe: {timeframe.replace(/-/g, ' ')}
            </span>
          )}
          {categoryFilter !== 'all' && (
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#fff',
              border: '1px solid #0C2C18',
              fontSize: '12px',
              color: '#0C2C18',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Category: {categoryFilter}
            </span>
          )}
          {paymentDaysFilter !== 'all' && (
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#fff',
              border: '1px solid #0C2C18',
              fontSize: '12px',
              color: '#0C2C18',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Payment Days: {paymentDaysFilter} days
            </span>
          )}
          {vendorStatusFilter !== 'all' && (
            <span style={{
              padding: '4px 12px',
              backgroundColor: '#fff',
              border: '1px solid #0C2C18',
              fontSize: '12px',
              color: '#0C2C18',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Status: {vendorStatusFilter}
            </span>
          )}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>TOTAL VENDORS</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{filteredVendors.length}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>TOTAL SPEND</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>₹{filteredVendors.reduce((acc, v) => acc + v.monthlySpend, 0).toFixed(2)}Cr</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>OUTSTANDING</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>₹{filteredVendors.reduce((acc, v) => acc + v.outstanding, 0).toFixed(2)}Cr</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
          <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>AVG DPO</div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>{filteredVendors.length > 0 ? Math.round(filteredVendors.reduce((acc, v) => acc + v.days, 0) / filteredVendors.length) : 0}</div>
        </div>
      </div>

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
        avgDSO: selectedSite.dso,
        avgDPO: selectedSite.dpo,
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

    const siteIncomeExpense = [
      { month: 'Jul', income: 0.45, expense: 0.38 },
      { month: 'Aug', income: 0.48, expense: 0.42 },
      { month: 'Sep', income: 0.46, expense: 0.43 },
      { month: 'Oct', income: 0.50, expense: 0.46 },
      { month: 'Nov', income: 0.52, expense: 0.48 },
      { month: 'Dec', income: 0.51, expense: 0.45 }
    ];

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>MONTHLY SPEND</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>₹{typeof siteData.monthlySpend === 'number' ? siteData.monthlySpend.toFixed(2) : siteData.monthlySpend}Cr</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>OUTSTANDING</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>₹{typeof siteData.outstanding === 'number' ? siteData.outstanding.toFixed(2) : siteData.outstanding}Cr</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>AVG DSO</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{siteData.avgDSO}d</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>AVG DPO</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#DF7649', fontFamily: 'Georgia, serif' }}>{siteData.avgDPO}d</div>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '20px', border: '1px solid #E7DDCA' }}>
            <div style={{ fontSize: '11px', color: '#85A383', marginBottom: '8px', fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '500' }}>VENDORS</div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: '#0C2C18', fontFamily: 'Georgia, serif' }}>{siteData.vendors.length}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '24px', border: '1px solid #E7DDCA', marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#0C2C18',
            marginBottom: '20px',
            letterSpacing: '0.05em',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            INCOME VS EXPENSES TREND
          </h3>
          <IncomeExpenseChart data={siteIncomeExpense} height={240} />
        </div>

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
              
              let filtered = transactions.filter(txn => {
                if (transactionFilter === 'all') return true;
                if (transactionFilter === 'cleared') return txn.status === 'Cleared' || txn.status === 'Paid';
                if (transactionFilter === 'pending') return txn.status === 'Pending' || txn.status === 'Due';
                if (transactionFilter === 'overdue') return txn.status === 'Overdue';
                return true;
              });
              
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

    if (vendorViewContext === 'site' && selectedSite) {
      let siteData = siteDetailData[selectedSite.id];
      
      if (!siteData) {
        siteData = {
          name: selectedSite.name,
          vendors: []
        };
      }
      
      let vendorAtSite = siteData?.vendors.find(v => v.id === selectedVendor.id);
      
      if (!vendorAtSite) {
        const monthlySpendCalc = parseFloat((selectedSite.monthlySpend * 0.27).toFixed(2));
        const outstandingCalc = parseFloat((selectedSite.outstanding * 0.28).toFixed(2));
        
        vendorAtSite = {
          id: selectedVendor.id,
          name: selectedVendor.name,
          category: selectedVendor.category,
          monthlySpend: monthlySpendCalc,
          outstanding: outstandingCalc,
          days: selectedSite.days,
          invoices: 3
        };
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

    let vendorData = vendorDetailData[selectedVendor?.id];
    
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
          { name: 'Corporate Hub - Gurgaon', region: 'NCR', monthlySpend: (monthlySpendVal * 0.18).toFixed(2), outstanding: (outstandingVal * 0.17).toFixed(2), days: selectedVendor.days - 3, invoices: 3 }
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
      </>
    );
  };

  const renderContent = () => {
    if (activeTab === 'analysis') {
      if (selectedView === 'site-detail') {
        return <SiteDetailView />;
      } else if (selectedView === 'vendor-detail') {
        return <VendorDetailView />;
      } else {
        return (
          <>
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
    } else {
      return (
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ 
            fontSize: '32px',
            fontWeight: '300',
            color: '#0C2C18',
            fontFamily: 'Georgia, serif',
            letterSpacing: '-0.01em',
            marginBottom: '4px'
          }}>
            {activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'invoices' ? 'Client Invoices' : 'AI Assistant'}
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#85A383',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Coming soon
          </p>
        </div>
      );
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', backgroundColor: '#E7DDCA' }}>
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

      <div className='overflow-auto' style={{ flex: 1, padding: '32px 48px' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default FMSiteVendorAnalysis;
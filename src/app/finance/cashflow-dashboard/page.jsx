"use client"
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ChevronDown, ChevronRight, LayoutDashboard, Building2, MessageSquare, X, CheckCircle2, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';

const FMFinanceDashboard = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInsight, setSelectedInsight] = useState(null);

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

  const incomeExpenseData = [
    { month: 'Jul', income: 18.5, expense: 16.2 },
    { month: 'Aug', income: 19.2, expense: 17.1 },
    { month: 'Sep', income: 18.8, expense: 17.5 },
    { month: 'Oct', income: 19.5, expense: 18.8 },
    { month: 'Nov', income: 20.1, expense: 19.6 },
    { month: 'Dec', income: 19.8, expense: 19.2 }
  ];

  const insights = [
    {
      id: 'payment-pressure',
      title: 'Security Services Ltd needs immediate attention',
      description: 'Payment cycle at 78 days across 12 sites with ₹1.08Cr outstanding. Risk of service disruption.',
      action: 'View vendor details',
      type: 'vendor',
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
      title: 'TechPark Tower A - Priority collection needed',
      description: 'DSO at 52 days with ₹0.32Cr outstanding. This site is underperforming compared to your 36-day average.',
      action: 'View site details',
      type: 'site',
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
      title: 'Optimize payment timing across Mumbai and NCR regions',
      description: 'Working capital gap of -32 days in Mumbai and -35 days in NCR. Consider negotiating staggered payment schedules with vendors to better align with client receipts.',
      action: 'View regional breakdown',
      type: 'cross-site',
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
        { name: 'HVAC Systems Pvt Ltd', amount: '₹820K', days: 63, detail: '6 sites' }
      ],
      regionalBreakdown: [
        { region: 'Mumbai', avgDays: 53, sites: 4, outstanding: '₹1.24Cr', trend: '+5' },
        { region: 'NCR', avgDays: 58, sites: 3, outstanding: '₹1.58Cr', trend: '+7' },
        { region: 'Bangalore', avgDays: 51, sites: 3, outstanding: '₹1.10Cr', trend: '+4' }
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
        { name: 'Business Center North', amount: '₹1.3Cr', days: 38, detail: 'Hyderabad' }
      ],
      regionalBreakdown: [
        { region: 'Mumbai', avgDays: 48, sites: 4, outstanding: '₹0.96Cr', trend: '-2' },
        { region: 'NCR', avgDays: 50, sites: 3, outstanding: '₹1.21Cr', trend: '-3' },
        { region: 'Bangalore', avgDays: 46, sites: 3, outstanding: '₹0.97Cr', trend: '-4' }
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
        { name: 'Hyderabad Region', amount: '₹800K', days: '-22', detail: '16 sites' }
      ],
      regionalBreakdown: [
        { region: 'Mumbai', avgDays: -32, sites: 4, outstanding: '₹2.4Cr', trend: '-8' },
        { region: 'NCR', avgDays: -35, sites: 3, outstanding: '₹2.3Cr', trend: '-10' },
        { region: 'Bangalore', avgDays: -28, sites: 3, outstanding: '₹1.7Cr', trend: '-6' }
      ]
    }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'Site & Vendor Analysis', icon: Building2 },
    { id: 'invoices', label: 'Client Invoices', icon: FileText },
    { id: 'assistant', label: 'AI Assistant', icon: MessageSquare }
  ];

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

  return (
    <div style={{ height: '100vh', display: 'flex', backgroundColor: '#E7DDCA' }}>
      {/* Sidebar */}
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
                onClick={() => setActiveTab(item.id)}
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

      {/* Main Content */}
      <div className='overflow-auto' style={{ flex: 1, padding: '32px 48px' }}>
        {activeTab === 'dashboard' ? (
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

            {/* Morning Briefing */}
            <div style={{ 
              backgroundColor: '#fff',
              padding: '32px',
              border: '1px solid #0C2C18',
              marginBottom: '24px'
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
              
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#1B2A21',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '300',
                marginBottom: '20px'
              }}>
                Your working capital position requires immediate attention today. Payment delays have accelerated to 65 days while collection efficiency has improved to 36 days, creating a -29 day working capital gap that is straining cash flow across 30 sites.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '4px', 
                    height: '4px', 
                    backgroundColor: '#DF7649', 
                    marginTop: '8px',
                    flexShrink: 0
                  }}></div>
                  <p style={{
                    fontSize: '13px',
                    lineHeight: '1.6',
                    color: '#1B2A21',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: '300'
                  }}>
                    Mumbai and NCR regions show critical pressure with working capital gaps of -32 and -35 days respectively
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '4px', 
                    height: '4px', 
                    backgroundColor: '#DF7649', 
                    marginTop: '8px',
                    flexShrink: 0
                  }}></div>
                  <p style={{
                    fontSize: '13px',
                    lineHeight: '1.6',
                    color: '#1B2A21',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: '300'
                  }}>
                    Priority vendor payments: ₹2.4Cr to Security Services Ltd (78 days) and ₹1.8Cr to Housekeeping Co (72 days) at risk of service disruption
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '4px', 
                    height: '4px', 
                    backgroundColor: '#85A383', 
                    marginTop: '8px',
                    flexShrink: 0
                  }}></div>
                  <p style={{
                    fontSize: '13px',
                    lineHeight: '1.6',
                    color: '#1B2A21',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: '300'
                  }}>
                    Priority collections: TechPark Tower A (₹3.2Cr at 52 days) and Corporate Hub Gurgaon (₹2.8Cr at 48 days) need immediate follow-up
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '4px', 
                    height: '4px', 
                    backgroundColor: '#1B2A21', 
                    marginTop: '8px',
                    flexShrink: 0
                  }}></div>
                  <p style={{
                    fontSize: '13px',
                    lineHeight: '1.6',
                    color: '#1B2A21',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontWeight: '300'
                  }}>
                    With only 18 days of cash on hand, consider invoice discounting facility of ₹5Cr to bridge working capital needs
                  </p>
                </div>
              </div>

              <button
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#0C2C18',
                  color: '#E7DDCA',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '400',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1B2A21'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0C2C18'}
              >
                Discuss more
              </button>
            </div>

            {/* Income vs Expenses Chart */}
            <div style={{ 
              backgroundColor: '#fff',
              padding: '32px',
              border: '1px solid #0C2C18',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#0C2C18',
                marginBottom: '20px',
                letterSpacing: '0.05em',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                INCOME VS EXPENSES - 6 MONTH TREND
              </h3>
              <IncomeExpenseChart data={incomeExpenseData} />
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
              {kpiData.map((kpi) => (
                <div
                  key={kpi.id}
                  onClick={() => setExpandedCard(expandedCard === kpi.id ? null : kpi.id)}
                  style={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #0C2C18',
                    padding: '32px 28px',
                    cursor: 'pointer'
                  }}
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
                  
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
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

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

                    <button style={{ color: '#85A383', background: 'none', border: 'none', cursor: 'pointer' }}>
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

            {/* Expanded Card Details */}
            {expandedCard && (
              <div style={{ 
                backgroundColor: '#fff',
                border: '1px solid #0C2C18',
                padding: '32px 40px',
                marginBottom: '32px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
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
                      marginBottom: '12px',
                      letterSpacing: '0.05em',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                      REGIONAL BREAKDOWN
                    </h3>
                    
                    <div style={{ marginBottom: '20px' }}>
                      {kpiData.find(k => k.id === expandedCard).regionalBreakdown.map((region, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '12px 16px',
                            marginBottom: '8px',
                            backgroundColor: '#E7DDCA',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#0C2C18', marginBottom: '4px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              {region.region}
                            </div>
                            <div style={{ fontSize: '11px', color: '#85A383', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              {region.sites} sites • {region.outstanding}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '18px', fontWeight: '500', color: '#0C2C18', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              {region.avgDays}d
                            </div>
                            <div style={{ fontSize: '11px', color: region.trend.includes('-') ? '#DF7649' : '#85A383', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                              {region.trend}d
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h3 style={{ 
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#0C2C18',
                      marginBottom: '12px',
                      letterSpacing: '0.05em',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                      TOP 5 BY OUTSTANDING
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {kpiData.find(k => k.id === expandedCard).topImpact.slice(0, 5).map((item, idx) => (
                        <div 
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 12px',
                            backgroundColor: '#E7DDCA'
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ 
                              fontWeight: '400',
                              color: '#0C2C18',
                              fontSize: '12px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}>
                              {item.name}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right', marginLeft: '16px' }}>
                            <div style={{ 
                              fontWeight: '500',
                              color: '#0C2C18',
                              fontSize: '12px',
                              fontFamily: 'system-ui, -apple-system, sans-serif'
                            }}>
                              {item.amount}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Decision Suggestions */}
            <div>
              <h2 style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#0C2C18',
                marginBottom: '16px',
                letterSpacing: '0.05em',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                DECISION SUGGESTIONS FOR YOU
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {insights.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    style={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #0C2C18',
                      padding: '24px 28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '15px',
                        fontWeight: '500',
                        color: '#0C2C18',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        marginBottom: '6px'
                      }}>
                        {suggestion.title}
                      </h3>
                      
                      <p style={{ 
                        color: '#1B2A21',
                        fontSize: '13px',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fontWeight: '300',
                        lineHeight: '1.5'
                      }}>
                        {suggestion.description}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedInsight(suggestion)}
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
                        whiteSpace: 'nowrap'
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
        ) : (
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ 
              fontSize: '32px',
              fontWeight: '300',
              color: '#0C2C18',
              fontFamily: 'Georgia, serif',
              letterSpacing: '-0.01em',
              marginBottom: '4px'
            }}>
              {activeTab === 'analysis' ? 'Site & Vendor Analysis' : 
               activeTab === 'invoices' ? 'Client Invoices' : 'AI Assistant'}
            </h1>
            <p style={{
              fontSize: '13px',
              color: '#85A383',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Coming soon
            </p>
          </div>
        )}
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
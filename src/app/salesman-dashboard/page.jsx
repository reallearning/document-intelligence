"use client"
import React, { useState } from 'react';
import { TrendingUp, Target, MapPin, Store, ChevronDown, ChevronRight, DollarSign, Package, Zap, Award, Clock, TrendingDown } from 'lucide-react';

const SalesmanDashboard = () => {
  const [expandedStore, setExpandedStore] = useState(null);
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' or 'timeline'
  const [selectedActivity, setSelectedActivity] = useState(null);

  const colors = {
    darkGreen: '#0C2C18',
    sageGreen: '#85A383',
    cream: '#E7DDCA',
    darkestGreen: '#1B2A21',
    terracotta: '#DF7649',
    lightGrey: '#878B87',
    offWhite: '#FDFCFA'
  };

  // Salesman details and performance
  const salesmanData = {
    name: "Arjun Mehta",
    role: "Territory Sales Representative",
    beat: "Andheri West - Route 3",
    date: "Monday, November 18, 2025",
    performance: {
      monthlyAchievement: 68,
      target: 85000,
      achieved: 57800,
      remaining: 27200,
      daysLeft: 12,
      dailyRequired: 2267,
      
      // Key metrics
      coverage: { current: 72, target: 85 },
      productiveCalls: { current: 14, target: 18, today: 0 },
      focusBrand: {
        name: "Godrej No.1",
        achievement: 65,
        target: 12000,
        achieved: 7800,
        remaining: 4200
      },
      
      // Rankings
      ranking: {
        inTeam: 4,
        teamSize: 6,
        inZone: 28,
        zoneSize: 45
      },
      
      incentiveEarned: 4200,
      incentivePotential: 8500
    }
  };

  // Timeline activities - real-time tracking
  const timelineActivities = [
    {
      id: 1,
      time: "8:15 AM",
      status: "completed",
      store: "Vishal General Store",
      actionType: "recovery",
      action: "Recovered unbilled outlet",
      orderValue: 620,
      products: ["Harpic 500ml x12", "Good Knight x6", "Hit Spray x8"],
      scheme: "Scheme X applied",
      impact: {
        achievement: { before: 68.0, after: 68.7, change: +0.7 },
        coverage: { before: 72, after: 73, change: +1 },
        productiveCalls: { before: 0, after: 1, change: +1 }
      },
      notes: "Store owner was happy to restock. Mentioned he'll need detergents next week."
    },
    {
      id: 2,
      time: "8:42 AM",
      status: "completed",
      store: "Sharma Kirana",
      actionType: "recovery",
      action: "Recovered unbilled outlet + Focus brand push",
      orderValue: 1300,
      products: ["Cinthol Soap x24", "Godrej No.1 x36", "Fair Glow x6"],
      scheme: "8% margin scheme on Godrej No.1",
      impact: {
        achievement: { before: 68.7, after: 70.2, change: +1.5 },
        coverage: { before: 73, after: 74, change: +1 },
        focusBrand: { before: 65, after: 70.2, change: +5.2 },
        productiveCalls: { before: 1, after: 2, change: +1 }
      },
      notes: "Sharma ji agreed to bulk purchase with scheme. Asked about new body wash launch."
    },
    {
      id: 3,
      time: "9:18 AM",
      status: "completed",
      store: "Mumbai Kirana",
      actionType: "focusBrand",
      action: "Focus brand push - Godrej No.1",
      orderValue: 432,
      products: ["Godrej No.1 24-pack combo x2"],
      scheme: "8% margin + Free display rack",
      impact: {
        achievement: { before: 70.2, after: 70.7, change: +0.5 },
        focusBrand: { before: 70.2, after: 73.7, change: +3.5 },
        productiveCalls: { before: 2, after: 3, change: +1 }
      },
      notes: "Display rack installed. Store owner satisfied with margins."
    },
    {
      id: 4,
      time: "10:05 AM",
      status: "completed",
      store: "New Amar General Store",
      actionType: "recovery",
      action: "Recovered unbilled outlet",
      orderValue: 450,
      products: ["Ezee Liquid x8", "Surf Excel x6"],
      scheme: null,
      impact: {
        achievement: { before: 70.7, after: 71.2, change: +0.5 },
        coverage: { before: 74, after: 76, change: +2 },
        productiveCalls: { before: 3, after: 4, change: +1 }
      },
      notes: "Stock was low. Good response to detergent category."
    },
    {
      id: 5,
      time: "10:48 AM",
      status: "completed",
      store: "Patel Brothers",
      actionType: "crossSell",
      action: "Cross-sell - Cinthol Body Wash",
      orderValue: 450,
      products: ["Cinthol Body Wash 200ml x12", "Cinthol Soap x12"],
      scheme: "6% launch offer + 2 testers",
      impact: {
        achievement: { before: 71.2, after: 71.7, change: +0.5 },
        tlsd: { before: 82, after: 87, change: +5 },
        productiveCalls: { before: 4, after: 5, change: +1 }
      },
      notes: "Body wash testers placed at counter. Owner interested in the launch offer."
    },
    {
      id: 6,
      time: "11:30 AM",
      status: "in-progress",
      store: "Gupta Traders",
      actionType: "recovery",
      action: "Currently visiting - recovery + focus brand",
      orderValue: null,
      products: null,
      scheme: null,
      impact: null,
      notes: null
    }
  ];

  // Pending stores (not yet visited)
  const pendingStores = [
    { name: "Reliable Store", actions: 1, potentialValue: 390 },
    { name: "Modern Kirana", actions: 2, potentialValue: 870 }
  ];

  // Today's store-wise plan
  const todayStores = [
    {
      id: 1,
      name: "Vishal General Store",
      type: "General Store",
      location: "SV Road, Lane 1",
      distance: "0.3 km",
      priority: "high",
      lastOrder: {
        date: "Oct 28",
        value: 620,
        products: "Home Care mix"
      },
      actions: [
        {
          type: "recovery",
          title: "Recover Unbilled Outlet",
          description: "This outlet bought last month but hasn't ordered in November yet",
          urgency: "urgent",
          expectedValue: 620,
          talkingPoints: [
            "Remind about last month's order (₹620)",
            "Stock check - what's running low?",
            "Mention he usually orders Home Care products"
          ],
          impact: {
            achievement: "+0.7%",
            coverage: "+1%",
            revenue: "+₹620"
          }
        },
        {
          type: "scheme",
          title: "Push Active Scheme",
          description: "Scheme X: 8% margin + Free display rack on 24-pack",
          urgency: "medium",
          products: ["Harpic 500ml", "Good Knight", "Hit Spray"],
          expectedValue: 450,
          talkingPoints: [
            "Free rack worth ₹400 with combo purchase",
            "8% better margin than usual",
            "Scheme valid only this week"
          ],
          impact: {
            achievement: "+0.5%",
            revenue: "+₹450"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 580,
        orderFrequency: "Monthly",
        topCategories: ["Home Care", "Personal Care"],
        creditDays: 15
      }
    },
    {
      id: 2,
      name: "Sharma Kirana",
      type: "Kirana Store",
      location: "JP Road, Lane 2",
      distance: "0.6 km",
      priority: "high",
      lastOrder: {
        date: "Oct 25",
        value: 580,
        products: "Personal Care"
      },
      actions: [
        {
          type: "recovery",
          title: "Recover Unbilled Outlet",
          description: "Regular customer - hasn't ordered this month",
          urgency: "urgent",
          expectedValue: 580,
          talkingPoints: [
            "Last order was ₹580 worth Personal Care",
            "Ask about Cinthol and Godrej No.1 stock",
            "This is his regular monthly restock time"
          ],
          impact: {
            achievement: "+0.7%",
            coverage: "+1%",
            revenue: "+₹580"
          }
        },
        {
          type: "focusBrand",
          title: "Focus Brand Push - Godrej No.1",
          description: "Your focus brand is lagging - team average is 78%, you're at 65%",
          urgency: "high",
          products: ["Godrej No.1 Soap 24-pack", "Godrej No.1 36-pack combo"],
          expectedValue: 720,
          talkingPoints: [
            "Sharma ji usually stocks Godrej No.1",
            "8% margin scheme on bulk purchase",
            "This will help you catch up to team average"
          ],
          impact: {
            achievement: "+0.8%",
            focusBrand: "+6%",
            revenue: "+₹720"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 550,
        orderFrequency: "Monthly",
        topCategories: ["Personal Care", "Soaps"],
        creditDays: 30
      }
    },
    {
      id: 3,
      name: "Mumbai Kirana",
      type: "Kirana Store",
      location: "Veera Desai Road",
      distance: "0.8 km",
      priority: "medium",
      lastOrder: {
        date: "Nov 2",
        value: 480,
        products: "Mixed"
      },
      actions: [
        {
          type: "focusBrand",
          title: "Focus Brand Push - Godrej No.1",
          description: "Active scheme with great margins",
          urgency: "high",
          products: ["Godrej No.1 24-pack combo"],
          expectedValue: 432,
          scheme: "8% margin scheme + Free display rack",
          talkingPoints: [
            "Free rack worth ₹400",
            "8% better margin",
            "Valid only this week"
          ],
          impact: {
            achievement: "+0.5%",
            focusBrand: "+3.5%",
            revenue: "+₹432"
          }
        },
        {
          type: "crossSell",
          title: "Cross-sell Opportunity",
          description: "Add Cinthol Body Wash to regular order",
          urgency: "medium",
          products: ["Cinthol Body Wash 200ml"],
          expectedValue: 180,
          talkingPoints: [
            "New launch - 6% margin offer",
            "Comes with 2 free testers",
            "Good upsell with Cinthol soap"
          ],
          impact: {
            achievement: "+0.2%",
            tlsd: "+5%",
            revenue: "+₹180"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 420,
        orderFrequency: "Bi-weekly",
        topCategories: ["Mixed range"],
        creditDays: 15
      }
    },
    {
      id: 4,
      name: "Patel Brothers",
      type: "General Store",
      location: "Lokhandwala",
      distance: "1.2 km",
      priority: "medium",
      lastOrder: {
        date: "Nov 5",
        value: 450,
        products: "Soaps"
      },
      actions: [
        {
          type: "crossSell",
          title: "Cross-sell - Body Wash Launch",
          description: "They stock Cinthol soap - perfect for body wash upsell",
          urgency: "medium",
          products: ["Cinthol Body Wash 200ml"],
          expectedValue: 450,
          scheme: "6% launch offer + 2 testers free",
          talkingPoints: [
            "Already stocks Cinthol soap - natural fit",
            "Launch offer: 6% margin + free testers",
            "Testers help drive trial purchases"
          ],
          impact: {
            achievement: "+0.5%",
            tlsd: "+5%",
            revenue: "+₹450"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 420,
        orderFrequency: "Bi-weekly",
        topCategories: ["Personal Care", "Soaps"],
        creditDays: 15
      }
    },
    {
      id: 5,
      name: "New Amar General Store",
      type: "General Store",
      location: "Andheri Station Road",
      distance: "1.5 km",
      priority: "high",
      lastOrder: {
        date: "Oct 22",
        value: 450,
        products: "Detergents"
      },
      actions: [
        {
          type: "recovery",
          title: "Recover Unbilled Outlet",
          description: "Good customer - hasn't ordered in 3 weeks",
          urgency: "urgent",
          expectedValue: 450,
          talkingPoints: [
            "Last order ₹450 - detergents",
            "3 weeks since last order",
            "Check if Ezee Liquid and Surf Excel need restock"
          ],
          impact: {
            achievement: "+0.5%",
            coverage: "+2%",
            revenue: "+₹450"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 440,
        orderFrequency: "Monthly",
        topCategories: ["Detergents", "Home Care"],
        creditDays: 15
      }
    },
    {
      id: 6,
      name: "Gupta Traders",
      type: "General Store",
      location: "Yari Road",
      distance: "1.8 km",
      priority: "high",
      lastOrder: {
        date: "Oct 20",
        value: 710,
        products: "Full range"
      },
      actions: [
        {
          type: "recovery",
          title: "Recover Unbilled Outlet - High Value",
          description: "This is one of your best outlets - almost a month since last order",
          urgency: "urgent",
          expectedValue: 710,
          talkingPoints: [
            "Your highest order last month: ₹710",
            "Almost a month since last order",
            "They stock full range - good opportunity"
          ],
          impact: {
            achievement: "+0.8%",
            coverage: "+2%",
            revenue: "+₹710"
          }
        },
        {
          type: "focusBrand",
          title: "Focus Brand - Add Godrej No.1",
          description: "Large order opportunity - include focus brand",
          urgency: "medium",
          products: ["Godrej No.1 mixed with full range"],
          expectedValue: 240,
          talkingPoints: [
            "Add Godrej No.1 to their regular full range order",
            "8% margin scheme active",
            "Will help both of you hit targets"
          ],
          impact: {
            achievement: "+0.3%",
            focusBrand: "+2%",
            revenue: "+₹240"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 680,
        orderFrequency: "Monthly",
        topCategories: ["Full range"],
        creditDays: 30
      }
    }
  ];

  const getActionIcon = (type) => {
    switch(type) {
      case 'recovery': return <TrendingUp size={14} />;
      case 'scheme': return <Zap size={14} />;
      case 'focusBrand': return <Target size={14} />;
      case 'crossSell': return <Package size={14} />;
      default: return <Store size={14} />;
    }
  };

  const getActionColor = (type) => {
    switch(type) {
      case 'recovery': return colors.terracotta;
      case 'scheme': return '#D4A574';
      case 'focusBrand': return colors.sageGreen;
      case 'crossSell': return '#6B9BD1';
      default: return colors.lightGrey;
    }
  };

  const getUrgencyBadge = (urgency) => {
    if (urgency === 'urgent') {
      return { bg: '#FFF3F0', text: colors.terracotta, label: 'URGENT' };
    } else if (urgency === 'high') {
      return { bg: '#FFF9F0', text: '#D4A574', label: 'HIGH' };
    } else {
      return { bg: '#F5F8F5', text: colors.sageGreen, label: 'MEDIUM' };
    }
  };

  const getPriorityColor = (priority) => {
    if (priority === 'high') return colors.terracotta;
    return colors.sageGreen;
  };

  return (
    <div className='h-screen overflow-auto' style={{ fontFamily: "'Inter', sans-serif", backgroundColor: colors.cream }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: colors.darkGreen,
        padding: '48px 32px',
        borderBottom: `1px solid ${colors.sageGreen}40`
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            fontSize: '11px',
            color: colors.sageGreen,
            marginBottom: '8px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            {salesmanData.date}
          </div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '300',
            color: colors.cream,
            marginBottom: '8px',
            letterSpacing: '-0.02em'
          }}>
            {salesmanData.name}
          </h1>
          <div style={{
            fontSize: '14px',
            color: colors.sageGreen,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <MapPin size={14} strokeWidth={1.5} />
            <span>{salesmanData.beat}</span>
            <span style={{ margin: '0 8px', opacity: 0.4 }}>•</span>
            <span>{salesmanData.role}</span>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div style={{ 
        backgroundColor: colors.offWhite,
        padding: '32px',
        borderBottom: `1px solid ${colors.darkGreen}15`
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '24px'
          }}>
            {/* Achievement */}
            <div>
              <div style={{ 
                fontSize: '11px',
                color: colors.lightGrey,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Monthly Achievement
              </div>
              <div style={{ 
                fontSize: '32px',
                fontWeight: '300',
                color: salesmanData.performance.monthlyAchievement >= 85 ? colors.sageGreen : colors.terracotta,
                marginBottom: '4px'
              }}>
                {salesmanData.performance.monthlyAchievement}%
              </div>
              <div style={{ fontSize: '13px', color: colors.lightGrey }}>
                ₹{(salesmanData.performance.achieved / 1000).toFixed(1)}k / ₹{(salesmanData.performance.target / 1000).toFixed(0)}k
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: colors.terracotta,
                marginTop: '4px'
              }}>
                ₹{(salesmanData.performance.remaining / 1000).toFixed(1)}k to go
              </div>
            </div>

            {/* Coverage */}
            <div>
              <div style={{ 
                fontSize: '11px',
                color: colors.lightGrey,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Coverage
              </div>
              <div style={{ 
                fontSize: '32px',
                fontWeight: '300',
                color: salesmanData.performance.coverage.current >= salesmanData.performance.coverage.target ? colors.sageGreen : colors.terracotta,
                marginBottom: '4px'
              }}>
                {salesmanData.performance.coverage.current}%
              </div>
              <div style={{ fontSize: '13px', color: colors.lightGrey }}>
                Target: {salesmanData.performance.coverage.target}%
              </div>
            </div>

            {/* Productive Calls */}
            <div>
              <div style={{ 
                fontSize: '11px',
                color: colors.lightGrey,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Today's Calls
              </div>
              <div style={{ 
                fontSize: '32px',
                fontWeight: '300',
                color: colors.darkGreen,
                marginBottom: '4px'
              }}>
                {salesmanData.performance.productiveCalls.today}/{salesmanData.performance.productiveCalls.target}
              </div>
              <div style={{ fontSize: '13px', color: colors.lightGrey }}>
                MTD: {salesmanData.performance.productiveCalls.current}
              </div>
            </div>

            {/* Focus Brand */}
            <div>
              <div style={{ 
                fontSize: '11px',
                color: colors.lightGrey,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Focus Brand
              </div>
              <div style={{ 
                fontSize: '32px',
                fontWeight: '300',
                color: salesmanData.performance.focusBrand.achievement >= 78 ? colors.sageGreen : colors.terracotta,
                marginBottom: '4px'
              }}>
                {salesmanData.performance.focusBrand.achievement}%
              </div>
              <div style={{ fontSize: '13px', color: colors.lightGrey }}>
                {salesmanData.performance.focusBrand.name}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: colors.terracotta,
                marginTop: '4px'
              }}>
                Team avg: 78%
              </div>
            </div>

            {/* Ranking */}
            <div>
              <div style={{ 
                fontSize: '11px',
                color: colors.lightGrey,
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Ranking
              </div>
              <div style={{ 
                fontSize: '32px',
                fontWeight: '300',
                color: colors.darkGreen,
                marginBottom: '4px'
              }}>
                #{salesmanData.performance.ranking.inTeam}
              </div>
              <div style={{ fontSize: '13px', color: colors.lightGrey }}>
                In team of {salesmanData.performance.ranking.teamSize}
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: colors.lightGrey,
                marginTop: '4px'
              }}>
                #{salesmanData.performance.ranking.inZone} in zone
              </div>
            </div>
          </div>

          {/* Quick Summary Message */}
          <div style={{
            marginTop: '24px',
            padding: '20px',
            backgroundColor: colors.darkGreen,
            borderRadius: '4px',
            color: colors.cream,
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            <strong>Arjun</strong>, you're {salesmanData.performance.daysLeft} days from month-end and need ₹{(salesmanData.performance.remaining / 1000).toFixed(1)}k more. 
            You have <strong>6 unbilled outlets</strong> who bought last month — recovering just these will add ₹{(3570 / 1000).toFixed(1)}k. 
            Your <strong>focus brand is at 65%</strong> while team average is 78% — priority push needed today.
          </div>
        </div>
      </div>

      {/* Today's Plan - Store-wise */}
      <div style={{ padding: '32px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '32px',
            borderBottom: `1px solid ${colors.darkGreen}15`
          }}>
            <button
              onClick={() => setActiveTab('plan')}
              style={{
                padding: '16px 24px',
                fontSize: '15px',
                fontWeight: activeTab === 'plan' ? '600' : '400',
                color: activeTab === 'plan' ? colors.darkGreen : colors.lightGrey,
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'plan' ? `2px solid ${colors.darkGreen}` : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              style={{
                padding: '16px 24px',
                fontSize: '15px',
                fontWeight: activeTab === 'timeline' ? '600' : '400',
                color: activeTab === 'timeline' ? colors.darkGreen : colors.lightGrey,
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'timeline' ? `2px solid ${colors.darkGreen}` : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Timeline
              {timelineActivities.filter(a => a.status === 'completed').length > 0 && (
                <span style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: colors.sageGreen,
                  backgroundColor: `${colors.sageGreen}20`,
                  padding: '2px 6px',
                  borderRadius: '10px'
                }}>
                  {timelineActivities.filter(a => a.status === 'completed').length} completed
                </span>
              )}
            </button>
          </div>

          {/* Plan View */}
          {activeTab === 'plan' && (
            <>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '300',
              color: colors.darkGreen,
              letterSpacing: '-0.01em'
            }}>
              Today's Outlets ({todayStores.length} stores)
            </h2>
            <div style={{
              fontSize: '13px',
              color: colors.lightGrey,
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.terracotta }}></div>
                <span>High Priority</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.sageGreen }}></div>
                <span>Medium Priority</span>
              </div>
            </div>
          </div>

          {/* Store Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {todayStores.map((store) => (
              <div
                key={store.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  border: `1px solid ${colors.darkGreen}15`,
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}
              >
                {/* Store Header */}
                <div
                  onClick={() => setExpandedStore(expandedStore === store.id ? null : store.id)}
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    backgroundColor: expandedStore === store.id ? colors.offWhite : 'white'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: getPriorityColor(store.priority)
                      }}></div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '500',
                        color: colors.darkGreen,
                        margin: 0
                      }}>
                        {store.name}
                      </h3>
                      <span style={{
                        fontSize: '12px',
                        color: colors.lightGrey,
                        backgroundColor: colors.cream,
                        padding: '4px 8px',
                        borderRadius: '2px'
                      }}>
                        {store.type}
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: colors.lightGrey
                      }}>
                        {store.actions.length} action{store.actions.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '24px',
                      fontSize: '13px',
                      color: colors.lightGrey
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={12} />
                        <span>{store.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={12} />
                        <span>{store.distance}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <DollarSign size={12} />
                        <span>Last order: ₹{store.lastOrder.value} on {store.lastOrder.date}</span>
                      </div>
                    </div>
                  </div>

                  <ChevronDown
                    size={20}
                    style={{
                      color: colors.lightGrey,
                      transform: expandedStore === store.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }}
                  />
                </div>

                {/* Expanded Content */}
                {expandedStore === store.id && (
                  <div style={{
                    padding: '0 24px 24px 24px',
                    borderTop: `1px solid ${colors.darkGreen}10`
                  }}>
                    {/* Actions for this store */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                      {store.actions.map((action, idx) => {
                        const urgencyBadge = getUrgencyBadge(action.urgency);
                        const actionColor = getActionColor(action.type);

                        return (
                          <div
                            key={idx}
                            style={{
                              border: `1px solid ${actionColor}30`,
                              borderRadius: '4px',
                              overflow: 'hidden'
                            }}
                          >
                            {/* Action Header */}
                            <div style={{
                              padding: '16px',
                              backgroundColor: `${actionColor}08`,
                              borderBottom: `1px solid ${actionColor}20`
                            }}>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '8px'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '4px',
                                    backgroundColor: actionColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                  }}>
                                    {getActionIcon(action.type)}
                                  </div>
                                  <div>
                                    <h4 style={{
                                      fontSize: '15px',
                                      fontWeight: '600',
                                      color: colors.darkGreen,
                                      margin: 0
                                    }}>
                                      {action.title}
                                    </h4>
                                  </div>
                                </div>

                                <span style={{
                                  fontSize: '10px',
                                  fontWeight: '600',
                                  letterSpacing: '0.05em',
                                  color: urgencyBadge.text,
                                  backgroundColor: urgencyBadge.bg,
                                  padding: '4px 8px',
                                  borderRadius: '2px'
                                }}>
                                  {urgencyBadge.label}
                                </span>
                              </div>

                              <p style={{
                                fontSize: '13px',
                                color: colors.darkestGreen,
                                margin: 0,
                                lineHeight: '1.5'
                              }}>
                                {action.description}
                              </p>
                            </div>

                            {/* Action Details */}
                            <div style={{ padding: '16px' }}>
                              {/* Expected Value */}
                              <div style={{
                                display: 'inline-block',
                                padding: '8px 12px',
                                backgroundColor: colors.offWhite,
                                borderRadius: '4px',
                                marginBottom: '16px'
                              }}>
                                <span style={{
                                  fontSize: '11px',
                                  color: colors.lightGrey,
                                  marginRight: '8px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em'
                                }}>
                                  Expected Value
                                </span>
                                <span style={{
                                  fontSize: '16px',
                                  fontWeight: '600',
                                  color: colors.darkGreen
                                }}>
                                  ₹{action.expectedValue}
                                </span>
                              </div>

                              {/* Scheme Info */}
                              {action.scheme && (
                                <div style={{
                                  padding: '12px',
                                  backgroundColor: '#FFF9F0',
                                  border: '1px solid #D4A574',
                                  borderRadius: '4px',
                                  marginBottom: '16px'
                                }}>
                                  <div style={{
                                    fontSize: '10px',
                                    color: '#D4A574',
                                    fontWeight: '600',
                                    marginBottom: '4px',
                                    letterSpacing: '0.05em'
                                  }}>
                                    ACTIVE SCHEME
                                  </div>
                                  <div style={{
                                    fontSize: '13px',
                                    color: colors.darkestGreen,
                                    fontWeight: '500'
                                  }}>
                                    {action.scheme}
                                  </div>
                                </div>
                              )}

                              {/* Products */}
                              {action.products && action.products.length > 0 && (
                                <div style={{ marginBottom: '16px' }}>
                                  <div style={{
                                    fontSize: '11px',
                                    color: colors.lightGrey,
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                  }}>
                                    Products
                                  </div>
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {action.products.map((product, pIdx) => (
                                      <span
                                        key={pIdx}
                                        style={{
                                          fontSize: '12px',
                                          color: colors.darkGreen,
                                          backgroundColor: colors.cream,
                                          padding: '6px 10px',
                                          borderRadius: '2px',
                                          border: `1px solid ${colors.darkGreen}20`
                                        }}
                                      >
                                        {product}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Talking Points */}
                              {action.talkingPoints && (
                                <div style={{ marginBottom: '16px' }}>
                                  <div style={{
                                    fontSize: '11px',
                                    color: colors.lightGrey,
                                    marginBottom: '10px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                  }}>
                                    Talking Points
                                  </div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {action.talkingPoints.map((point, pIdx) => (
                                      <div
                                        key={pIdx}
                                        style={{
                                          fontSize: '13px',
                                          color: colors.darkestGreen,
                                          padding: '10px 12px',
                                          backgroundColor: colors.offWhite,
                                          borderRadius: '4px',
                                          borderLeft: `3px solid ${actionColor}`,
                                          lineHeight: '1.5'
                                        }}
                                      >
                                        {point}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Impact Metrics */}
                              <div style={{
                                paddingTop: '16px',
                                borderTop: `1px solid ${colors.darkGreen}10`
                              }}>
                                <div style={{
                                  fontSize: '11px',
                                  color: colors.lightGrey,
                                  marginBottom: '10px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em'
                                }}>
                                  Impact if Completed
                                </div>
                                <div style={{
                                  display: 'flex',
                                  gap: '20px',
                                  fontSize: '13px'
                                }}>
                                  {Object.entries(action.impact).map(([key, value]) => (
                                    <div key={key}>
                                      <span style={{ color: colors.lightGrey, marginRight: '6px' }}>
                                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                                      </span>
                                      <span style={{
                                        color: colors.sageGreen,
                                        fontWeight: '600'
                                      }}>
                                        {value}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Store Insights */}
                    <div style={{
                      marginTop: '20px',
                      padding: '16px',
                      backgroundColor: colors.cream,
                      borderRadius: '4px'
                    }}>
                      <div style={{
                        fontSize: '11px',
                        color: colors.lightGrey,
                        marginBottom: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Store Insights
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '16px',
                        fontSize: '13px'
                      }}>
                        <div>
                          <div style={{ color: colors.lightGrey, marginBottom: '4px' }}>
                            Avg Order Value
                          </div>
                          <div style={{ color: colors.darkGreen, fontWeight: '600' }}>
                            ₹{store.storeInsights.avgOrderValue}
                          </div>
                        </div>
                        <div>
                          <div style={{ color: colors.lightGrey, marginBottom: '4px' }}>
                            Order Frequency
                          </div>
                          <div style={{ color: colors.darkGreen, fontWeight: '600' }}>
                            {store.storeInsights.orderFrequency}
                          </div>
                        </div>
                        <div>
                          <div style={{ color: colors.lightGrey, marginBottom: '4px' }}>
                            Top Categories
                          </div>
                          <div style={{ color: colors.darkGreen, fontWeight: '600' }}>
                            {store.storeInsights.topCategories.join(', ')}
                          </div>
                        </div>
                        <div>
                          <div style={{ color: colors.lightGrey, marginBottom: '4px' }}>
                            Credit Days
                          </div>
                          <div style={{ color: colors.darkGreen, fontWeight: '600' }}>
                            {store.storeInsights.creditDays} days
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Today's Potential Summary */}
          <div style={{
            marginTop: '32px',
            padding: '24px',
            backgroundColor: colors.darkGreen,
            borderRadius: '4px',
            color: colors.cream
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  fontSize: '13px',
                  color: colors.sageGreen,
                  marginBottom: '8px'
                }}>
                  If you complete all actions today
                </div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '300',
                  color: colors.cream
                }}>
                  Potential: ₹4,562 revenue
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '13px',
                  color: colors.sageGreen,
                  marginBottom: '8px'
                }}>
                  Achievement Jump
                </div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '300',
                  color: colors.sageGreen
                }}>
                  68% → 73.4%
                </div>
              </div>
            </div>
          </div>
          </>
          )}

          {/* Timeline View */}
          {activeTab === 'timeline' && (
            <>
              {/* Timeline Header Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                marginBottom: '32px'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '4px',
                  border: `1px solid ${colors.darkGreen}15`
                }}>
                  <div style={{
                    fontSize: '11px',
                    color: colors.lightGrey,
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Current Achievement
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '300',
                    color: colors.sageGreen,
                    marginBottom: '4px'
                  }}>
                    71.7%
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: colors.sageGreen,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <TrendingUp size={14} />
                    <span>+3.7% today</span>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '4px',
                  border: `1px solid ${colors.darkGreen}15`
                }}>
                  <div style={{
                    fontSize: '11px',
                    color: colors.lightGrey,
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Revenue Today
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '300',
                    color: colors.darkGreen,
                    marginBottom: '4px'
                  }}>
                    ₹3,252
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: colors.lightGrey
                  }}>
                    5 stores billed
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '4px',
                  border: `1px solid ${colors.darkGreen}15`
                }}>
                  <div style={{
                    fontSize: '11px',
                    color: colors.lightGrey,
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Focus Brand
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '300',
                    color: colors.sageGreen,
                    marginBottom: '4px'
                  }}>
                    73.7%
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: colors.sageGreen,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <TrendingUp size={14} />
                    <span>+8.7% today</span>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '4px',
                  border: `1px solid ${colors.darkGreen}15`
                }}>
                  <div style={{
                    fontSize: '11px',
                    color: colors.lightGrey,
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Coverage
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '300',
                    color: colors.darkGreen,
                    marginBottom: '4px'
                  }}>
                    76%
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: colors.sageGreen,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <TrendingUp size={14} />
                    <span>+4% today</span>
                  </div>
                </div>
              </div>

              {/* Timeline Activities */}
              <div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '400',
                  color: colors.darkGreen,
                  marginBottom: '24px',
                  letterSpacing: '-0.01em'
                }}>
                  Activity Timeline
                </h2>

                <div style={{ position: 'relative' }}>
                  {/* Vertical timeline line */}
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    bottom: '0',
                    width: '1px',
                    backgroundColor: `${colors.sageGreen}40`
                  }}></div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {timelineActivities.map((activity) => (
                      <div
                        key={activity.id}
                        style={{
                          position: 'relative',
                          paddingLeft: '48px'
                        }}
                      >
                        {/* Timeline dot */}
                        <div style={{
                          position: 'absolute',
                          left: '-5.5px',
                          top: '8px',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: activity.status === 'completed' ? colors.sageGreen : 
                                         activity.status === 'in-progress' ? colors.terracotta : colors.lightGrey,
                          border: `4px solid ${colors.cream}`,
                          zIndex: 1
                        }}></div>

                        {/* Activity Card */}
                        <div
                          onClick={() => activity.status === 'completed' && setSelectedActivity(
                            selectedActivity === activity.id ? null : activity.id
                          )}
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            border: `1px solid ${colors.darkGreen}15`,
                            overflow: 'hidden',
                            cursor: activity.status === 'completed' ? 'pointer' : 'default',
                            opacity: activity.status === 'pending' ? 0.6 : 1
                          }}
                        >
                          {/* Card Header */}
                          <div style={{
                            padding: '20px',
                            backgroundColor: activity.status === 'in-progress' ? `${colors.terracotta}08` : 'white'
                          }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                              marginBottom: '12px'
                            }}>
                              <div style={{ flex: 1 }}>
                                <div style={{
                                  fontSize: '13px',
                                  color: colors.lightGrey,
                                  marginBottom: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px'
                                }}>
                                  <Clock size={12} />
                                  <span>{activity.time}</span>
                                  {activity.status === 'in-progress' && (
                                    <span style={{
                                      fontSize: '10px',
                                      fontWeight: '600',
                                      color: colors.terracotta,
                                      backgroundColor: `${colors.terracotta}20`,
                                      padding: '2px 8px',
                                      borderRadius: '10px',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.05em'
                                    }}>
                                      In Progress
                                    </span>
                                  )}
                                </div>
                                <h3 style={{
                                  fontSize: '16px',
                                  fontWeight: '600',
                                  color: colors.darkGreen,
                                  marginBottom: '4px'
                                }}>
                                  {activity.store}
                                </h3>
                                <p style={{
                                  fontSize: '14px',
                                  color: colors.darkestGreen,
                                  margin: 0
                                }}>
                                  {activity.action}
                                </p>
                              </div>

                              {activity.status === 'completed' && (
                                <div style={{ textAlign: 'right' }}>
                                  <div style={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    color: colors.sageGreen
                                  }}>
                                    ₹{activity.orderValue}
                                  </div>
                                  <div style={{
                                    fontSize: '11px',
                                    color: colors.lightGrey,
                                    marginTop: '2px'
                                  }}>
                                    Order Value
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Quick Impact Summary */}
                            {activity.status === 'completed' && activity.impact && (
                              <div style={{
                                display: 'flex',
                                gap: '20px',
                                fontSize: '13px',
                                paddingTop: '12px',
                                borderTop: `1px solid ${colors.darkGreen}10`
                              }}>
                                {activity.impact.achievement && (
                                  <div>
                                    <span style={{ color: colors.lightGrey }}>Achievement: </span>
                                    <span style={{
                                      color: colors.sageGreen,
                                      fontWeight: '600'
                                    }}>
                                      {activity.impact.achievement.before}% → {activity.impact.achievement.after}%
                                    </span>
                                  </div>
                                )}
                                {activity.impact.coverage && (
                                  <div>
                                    <span style={{ color: colors.lightGrey }}>Coverage: </span>
                                    <span style={{
                                      color: colors.sageGreen,
                                      fontWeight: '600'
                                    }}>
                                      +{activity.impact.coverage.change}%
                                    </span>
                                  </div>
                                )}
                                {activity.impact.focusBrand && (
                                  <div>
                                    <span style={{ color: colors.lightGrey }}>Focus Brand: </span>
                                    <span style={{
                                      color: colors.sageGreen,
                                      fontWeight: '600'
                                    }}>
                                      +{activity.impact.focusBrand.change}%
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Expanded Details */}
                          {selectedActivity === activity.id && activity.status === 'completed' && (
                            <div style={{
                              padding: '20px',
                              borderTop: `1px solid ${colors.darkGreen}10`,
                              backgroundColor: colors.offWhite
                            }}>
                              {/* Products */}
                              {activity.products && (
                                <div style={{ marginBottom: '16px' }}>
                                  <div style={{
                                    fontSize: '11px',
                                    color: colors.lightGrey,
                                    marginBottom: '8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                  }}>
                                    Products Sold
                                  </div>
                                  <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '8px'
                                  }}>
                                    {activity.products.map((product, idx) => (
                                      <span
                                        key={idx}
                                        style={{
                                          fontSize: '12px',
                                          color: colors.darkGreen,
                                          backgroundColor: 'white',
                                          padding: '6px 10px',
                                          borderRadius: '2px',
                                          border: `1px solid ${colors.darkGreen}20`
                                        }}
                                      >
                                        {product}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Scheme */}
                              {activity.scheme && (
                                <div style={{
                                  padding: '12px',
                                  backgroundColor: '#FFF9F0',
                                  border: '1px solid #D4A574',
                                  borderRadius: '4px',
                                  marginBottom: '16px'
                                }}>
                                  <div style={{
                                    fontSize: '10px',
                                    color: '#D4A574',
                                    fontWeight: '600',
                                    marginBottom: '4px',
                                    letterSpacing: '0.05em'
                                  }}>
                                    SCHEME APPLIED
                                  </div>
                                  <div style={{
                                    fontSize: '13px',
                                    color: colors.darkestGreen
                                  }}>
                                    {activity.scheme}
                                  </div>
                                </div>
                              )}

                              {/* Detailed Impact Metrics */}
                              {activity.impact && (
                                <div style={{ marginBottom: '16px' }}>
                                  <div style={{
                                    fontSize: '11px',
                                    color: colors.lightGrey,
                                    marginBottom: '12px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                  }}>
                                    Impact on Metrics
                                  </div>
                                  <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '12px'
                                  }}>
                                    {Object.entries(activity.impact).map(([key, value]) => (
                                      <div
                                        key={key}
                                        style={{
                                          padding: '12px',
                                          backgroundColor: 'white',
                                          borderRadius: '4px',
                                          border: `1px solid ${colors.darkGreen}15`
                                        }}
                                      >
                                        <div style={{
                                          fontSize: '11px',
                                          color: colors.lightGrey,
                                          marginBottom: '6px',
                                          textTransform: 'capitalize'
                                        }}>
                                          {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                        <div style={{
                                          fontSize: '18px',
                                          fontWeight: '600',
                                          color: value.change > 0 ? colors.sageGreen : colors.terracotta
                                        }}>
                                          {value.before}{typeof value.before === 'number' && value.before < 100 ? '%' : ''} 
                                          → {value.after}{typeof value.after === 'number' && value.after < 100 ? '%' : ''}
                                        </div>
                                        <div style={{
                                          fontSize: '12px',
                                          color: value.change > 0 ? colors.sageGreen : colors.terracotta,
                                          marginTop: '2px'
                                        }}>
                                          {value.change > 0 ? '+' : ''}{value.change}
                                          {typeof value.change === 'number' && Math.abs(value.change) < 50 ? '%' : ''}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Notes */}
                              {activity.notes && (
                                <div style={{
                                  padding: '12px',
                                  backgroundColor: `${colors.sageGreen}10`,
                                  borderRadius: '4px',
                                  borderLeft: `3px solid ${colors.sageGreen}`
                                }}>
                                  <div style={{
                                    fontSize: '11px',
                                    color: colors.lightGrey,
                                    marginBottom: '4px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                  }}>
                                    Notes
                                  </div>
                                  <div style={{
                                    fontSize: '13px',
                                    color: colors.darkestGreen,
                                    lineHeight: '1.5'
                                  }}>
                                    {activity.notes}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Stores */}
                {pendingStores.length > 0 && (
                  <div style={{
                    marginTop: '32px',
                    padding: '20px',
                    backgroundColor: `${colors.terracotta}10`,
                    borderRadius: '4px',
                    border: `1px solid ${colors.terracotta}30`
                  }}>
                    <div style={{
                      fontSize: '13px',
                      color: colors.terracotta,
                      fontWeight: '600',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Store size={14} />
                      <span>{pendingStores.length} stores remaining today</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {pendingStores.map((store, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '10px 14px',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            fontSize: '13px',
                            border: `1px solid ${colors.darkGreen}15`
                          }}
                        >
                          <div style={{
                            color: colors.darkGreen,
                            fontWeight: '500',
                            marginBottom: '2px'
                          }}>
                            {store.name}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: colors.lightGrey
                          }}>
                            {store.actions} action{store.actions > 1 ? 's' : ''} • ₹{store.potentialValue} potential
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesmanDashboard;

"use client"
import React, { useState } from 'react';
import { TrendingUp, Target, MapPin, Store, ChevronDown, ChevronRight, DollarSign, Package, Zap, Award, Clock, TrendingDown } from 'lucide-react';

const SalesmanDashboard = () => {
  const [expandedStore, setExpandedStore] = useState(null);
  const [activeTab, setActiveTab] = useState('plan');
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

  const salesmanData = {
    name: "Rajesh Kumar",
    role: "Territory Sales Representative",
    beat: "Malad West - Route 2",
    date: "Monday, November 18, 2025",
    performance: {
      monthlyAchievement: 64,
      target: 95000,
      achieved: 60800,
      remaining: 34200,
      daysLeft: 12,
      dailyRequired: 2850,
      
      coverage: { current: 69, target: 85 },
      productiveCalls: { current: 13, target: 18, today: 0 },
      focusBrand: {
        name: "Campa Cola",
        achievement: 58,
        target: 15000,
        achieved: 8700,
        remaining: 6300
      },
      
      ranking: {
        inTeam: 5,
        teamSize: 7,
        inZone: 32,
        zoneSize: 48
      },
      
      incentiveEarned: 3800,
      incentivePotential: 9200
    }
  };

  const timelineActivities = [
    {
      id: 1,
      time: "8:20 AM",
      status: "completed",
      store: "New Bombay Stores",
      actionType: "recovery",
      action: "Recovered unbilled outlet",
      orderValue: 950,
      products: ["Campa Cola 500ml x36", "Independence Water 1L x48", "Spinner 250ml x24"],
      scheme: "Summer Festival Scheme applied",
      impact: {
        achievement: { before: 64.0, after: 65.0, change: +1.0 },
        coverage: { before: 69, after: 70, change: +1 },
        productiveCalls: { before: 0, after: 1, change: +1 }
      },
      notes: "Store owner mentioned cooler space available. Stocking full RCPL beverage range with good Campa visibility."
    },
    {
      id: 2,
      time: "8:55 AM",
      status: "completed",
      store: "Patil Beverages",
      actionType: "recovery",
      action: "Recovered unbilled outlet + Focus brand push",
      orderValue: 1680,
      products: ["Campa Cola 1L x60", "Campa Cola 2L x24", "Spinner 500ml x36", "Independence Water 1L x24"],
      scheme: "10% margin scheme on Campa Cola bulk purchase",
      impact: {
        achievement: { before: 65.0, after: 66.8, change: +1.8 },
        coverage: { before: 70, after: 71, change: +1 },
        focusBrand: { before: 58, after: 65.2, change: +7.2 },
        productiveCalls: { before: 1, after: 2, change: +1 }
      },
      notes: "Patil ji agreed to prominent Campa display. Also ordered Spinner and Independence Water - full RCPL portfolio push working."
    },
    {
      id: 3,
      time: "9:30 AM",
      status: "completed",
      store: "City General Store",
      actionType: "focusBrand",
      action: "Focus brand push - Campa Cola",
      orderValue: 820,
      products: ["Campa Cola combo pack (250ml x120)", "Raskik Juice 200ml x48"],
      scheme: "10% margin + Free chiller stickers",
      impact: {
        achievement: { before: 66.8, after: 67.7, change: +0.9 },
        focusBrand: { before: 65.2, after: 70.5, change: +5.3 },
        productiveCalls: { before: 2, after: 3, change: +1 }
      },
      notes: "Chiller stickers for Campa installed. Added Raskik juice boxes as counter display item."
    },
    {
      id: 4,
      time: "10:10 AM",
      status: "completed",
      store: "Reliable Beverages",
      actionType: "recovery",
      action: "Recovered unbilled outlet",
      orderValue: 780,
      products: ["Campa Orange 500ml x36", "Campa Lemon 500ml x24", "Independence Water 500ml x60"],
      scheme: null,
      impact: {
        achievement: { before: 67.7, after: 68.5, change: +0.8 },
        coverage: { before: 71, after: 73, change: +2 },
        productiveCalls: { before: 3, after: 4, change: +1 }
      },
      notes: "Stock was low on flavored Campa and Independence water. Good response to Campa Orange especially."
    },
    {
      id: 5,
      time: "10:55 AM",
      status: "completed",
      store: "Modern Kirana",
      actionType: "crossSell",
      action: "Cross-sell - Spinner Sports Drink",
      orderValue: 640,
      products: ["Spinner 500ml x48", "Spinner 1L x12", "Independence Water 1L x36"],
      scheme: "8% launch offer on Spinner 1L + Free shelf talkers",
      impact: {
        achievement: { before: 68.5, after: 69.2, change: +0.7 },
        tlsd: { before: 78, after: 85, change: +7 },
        productiveCalls: { before: 4, after: 5, change: +1 }
      },
      notes: "Spinner 1L doing well for sports enthusiasts. Independence water consistent performer."
    },
    {
      id: 6,
      time: "11:35 AM",
      status: "in-progress",
      store: "Singh Brothers Store",
      actionType: "recovery",
      action: "Currently visiting - recovery + focus brand",
      orderValue: null,
      products: null,
      scheme: null,
      impact: null,
      notes: null
    }
  ];

  const pendingStores = [
    { name: "Quick Mart", actions: 1, potentialValue: 580 },
    { name: "Shree Ganesh Stores", actions: 2, potentialValue: 1230 }
  ];

  const todayStores = [
    {
      id: 1,
      name: "New Bombay Stores",
      type: "General Store",
      location: "Link Road, Lane 3",
      distance: "0.4 km",
      priority: "high",
      lastOrder: {
        date: "Oct 30",
        value: 950,
        products: "RCPL beverages mix"
      },
      actions: [
        {
          type: "recovery",
          title: "Recover Unbilled Outlet",
          description: "This outlet bought last month but hasn't ordered in November yet",
          urgency: "urgent",
          expectedValue: 950,
          talkingPoints: [
            "Remind about last month's order (₹950)",
            "Stock check - Campa Cola, Independence Water, Spinner running low?",
            "Mention he usually orders good Campa volumes with RCPL portfolio"
          ],
          impact: {
            achievement: "+1.0%",
            coverage: "+1%",
            revenue: "+₹950"
          }
        },
        {
          type: "scheme",
          title: "Push Active Scheme",
          description: "Summer Festival Scheme: 10% margin + Free chiller stickers",
          urgency: "medium",
          products: ["Campa Cola 500ml", "Spinner 250ml", "Independence Water 1L"],
          expectedValue: 680,
          talkingPoints: [
            "Free chiller stickers worth ₹300 with combo",
            "10% better margin on Campa Cola",
            "Festival season - push full RCPL beverage range"
          ],
          impact: {
            achievement: "+0.7%",
            revenue: "+₹680"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 880,
        orderFrequency: "Monthly",
        topCategories: ["Campa Cola", "Independence Water"],
        creditDays: 15
      }
    },
    {
      id: 2,
      name: "Patil Beverages",
      type: "Beverage Store",
      location: "Marve Road, Lane 1",
      distance: "0.7 km",
      priority: "high",
      lastOrder: {
        date: "Oct 27",
        value: 1120,
        products: "Campa bulk + Spinner"
      },
      actions: [
        {
          type: "recovery",
          title: "Recover Unbilled Outlet",
          description: "High-volume customer - hasn't ordered this month",
          urgency: "urgent",
          expectedValue: 1120,
          talkingPoints: [
            "Last order was ₹1,120 worth Campa + Spinner",
            "Ask about Campa Cola 1L/2L and Independence Water stock levels",
            "This is his regular monthly restock time"
          ],
          impact: {
            achievement: "+1.2%",
            coverage: "+1%",
            revenue: "+₹1,120"
          }
        },
        {
          type: "focusBrand",
          title: "Focus Brand Push - Campa Cola",
          description: "Your focus brand is lagging - team average is 72%, you're at 58%",
          urgency: "high",
          products: ["Campa Cola 1L x60", "Campa Cola 2L bulk pack", "Campa flavored variants"],
          expectedValue: 1350,
          talkingPoints: [
            "Patil ji usually stocks heavy Campa Cola",
            "10% margin scheme on bulk purchase",
            "Mix with Spinner for complete RCPL portfolio"
          ],
          impact: {
            achievement: "+1.4%",
            focusBrand: "+9%",
            revenue: "+₹1,350"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 1080,
        orderFrequency: "Monthly",
        topCategories: ["Campa Cola", "Spinner"],
        creditDays: 30
      }
    },
    {
      id: 3,
      name: "City General Store",
      type: "General Store",
      location: "SV Road Junction",
      distance: "0.9 km",
      priority: "medium",
      lastOrder: {
        date: "Nov 4",
        value: 720,
        products: "Mixed RCPL beverages"
      },
      actions: [
        {
          type: "focusBrand",
          title: "Focus Brand Push - Campa Cola",
          description: "Active scheme with great margins",
          urgency: "high",
          products: ["Campa Cola 250ml combo pack", "Campa Orange 500ml"],
          expectedValue: 820,
          scheme: "10% margin scheme + Free chiller stickers",
          talkingPoints: [
            "Free chiller branding worth ₹300",
            "10% better margin on Campa",
            "Add Raskik juice for impulse purchases"
          ],
          impact: {
            achievement: "+0.9%",
            focusBrand: "+5.3%",
            revenue: "+₹820"
          }
        },
        {
          type: "crossSell",
          title: "Cross-sell Opportunity",
          description: "Add Spinner and Independence Water to regular Campa order",
          urgency: "medium",
          products: ["Spinner 500ml", "Independence Water 1L"],
          expectedValue: 420,
          talkingPoints: [
            "Spinner - premium sports drink segment",
            "Independence Water - high turnover product",
            "Good combo with Campa for full RCPL portfolio"
          ],
          impact: {
            achievement: "+0.4%",
            tlsd: "+5%",
            revenue: "+₹420"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 740,
        orderFrequency: "Bi-weekly",
        topCategories: ["Beverages mix"],
        creditDays: 15
      }
    },
    {
      id: 4,
      name: "Modern Kirana",
      type: "Kirana Store",
      location: "Infinity Mall Road",
      distance: "1.1 km",
      priority: "medium",
      lastOrder: {
        date: "Nov 6",
        value: 640,
        products: "Campa + Independence Water"
      },
      actions: [
        {
          type: "crossSell",
          title: "Cross-sell - Spinner Sports Drink",
          description: "They stock Campa Cola - perfect for Spinner upsell",
          urgency: "medium",
          products: ["Spinner 500ml", "Spinner 1L", "Raskik Juice 200ml"],
          expectedValue: 640,
          scheme: "8% launch offer on Spinner 1L + Free shelf talkers",
          talkingPoints: [
            "Already stocks Campa - natural fit for Spinner",
            "Launch offer: 8% margin + free branding",
            "Raskik juice boxes for kids segment"
          ],
          impact: {
            achievement: "+0.7%",
            tlsd: "+7%",
            revenue: "+₹640"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 620,
        orderFrequency: "Bi-weekly",
        topCategories: ["Beverages", "Campa Cola"],
        creditDays: 15
      }
    },
    {
      id: 5,
      name: "Reliable Beverages",
      type: "General Store",
      location: "Malad Station Road",
      distance: "1.4 km",
      priority: "high",
      lastOrder: {
        date: "Oct 24",
        value: 780,
        products: "Campa flavored + Independence Water"
      },
      actions: [
        {
          type: "recovery",
          title: "Recover Unbilled Outlet",
          description: "Good customer - hasn't ordered in 3+ weeks",
          urgency: "urgent",
          expectedValue: 780,
          talkingPoints: [
            "Last order ₹780 - Campa Orange/Lemon + Independence Water",
            "3+ weeks since last order",
            "Check if Campa flavored variants and Independence Water need restock"
          ],
          impact: {
            achievement: "+0.8%",
            coverage: "+2%",
            revenue: "+₹780"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 760,
        orderFrequency: "Monthly",
        topCategories: ["Campa Flavored", "Independence Water"],
        creditDays: 15
      }
    },
    {
      id: 6,
      name: "Singh Brothers Store",
      type: "General Store",
      location: "Mindspace Link Road",
      distance: "1.7 km",
      priority: "high",
      lastOrder: {
        date: "Oct 22",
        value: 1150,
        products: "Full RCPL beverage range"
      },
      actions: [
        {
          type: "recovery",
          title: "Recover Unbilled Outlet - High Value",
          description: "This is one of your best outlets - almost a month since last order",
          urgency: "urgent",
          expectedValue: 1150,
          talkingPoints: [
            "Your highest order last month: ₹1,150",
            "Almost a month since last order",
            "They stock full RCPL beverage range - Campa, Spinner, Independence Water"
          ],
          impact: {
            achievement: "+1.2%",
            coverage: "+2%",
            revenue: "+₹1,150"
          }
        },
        {
          type: "focusBrand",
          title: "Focus Brand - Add Campa Cola",
          description: "Large order opportunity - include focus brand",
          urgency: "medium",
          products: ["Campa Cola bulk", "Spinner", "Independence Water"],
          expectedValue: 550,
          talkingPoints: [
            "Add Campa Cola bulk to their regular order",
            "10% margin scheme active",
            "Complete RCPL beverage portfolio push"
          ],
          impact: {
            achievement: "+0.6%",
            focusBrand: "+3.5%",
            revenue: "+₹550"
          }
        }
      ],
      storeInsights: {
        avgOrderValue: 1100,
        orderFrequency: "Monthly",
        topCategories: ["Full RCPL beverage range"],
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
    <div className='overflow-y-auto' style={{ 
      height: '100vh',
      backgroundColor: colors.cream,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
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
                color: salesmanData.performance.focusBrand.achievement >= 72 ? colors.sageGreen : colors.terracotta,
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
                Team avg: 72%
              </div>
            </div>

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

          <div style={{
            marginTop: '24px',
            padding: '20px',
            backgroundColor: colors.darkGreen,
            borderRadius: '4px',
            color: colors.cream,
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            <strong>Rajesh</strong>, you're {salesmanData.performance.daysLeft} days from month-end and need ₹{(salesmanData.performance.remaining / 1000).toFixed(1)}k more. 
            You have <strong>6 unbilled outlets</strong> who bought last month — recovering just these will add ₹{(6020 / 1000).toFixed(1)}k in RCPL beverage sales. 
            Your <strong>Campa Cola focus is at 58%</strong> while team average is 72% — priority push needed on Campa, Spinner, and Independence Water.
          </div>
        </div>
      </div>

      <div style={{ padding: '32px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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

                {expandedStore === store.id && (
                  <div style={{
                    padding: '0 24px 24px 24px',
                    borderTop: `1px solid ${colors.darkGreen}10`
                  }}>
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

                            <div style={{ padding: '16px' }}>
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
                  Potential: ₹6,960 revenue
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
                  64% → 71.3%
                </div>
              </div>
            </div>
          </div>
          </>
          )}

          {activeTab === 'timeline' && (
            <>
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
                    69.2%
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: colors.sageGreen,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <TrendingUp size={14} />
                    <span>+5.2% today</span>
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
                    ₹4,870
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
                    Focus Brand - Campa Cola
                  </div>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: '300',
                    color: colors.sageGreen,
                    marginBottom: '4px'
                  }}>
                    70.5%
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: colors.sageGreen,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <TrendingUp size={14} />
                    <span>+12.5% today</span>
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
                    73%
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
                                    <span style={{ color: colors.lightGrey }}>Campa Cola: </span>
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

                          {selectedActivity === activity.id && activity.status === 'completed' && (
                            <div style={{
                              padding: '20px',
                              borderTop: `1px solid ${colors.darkGreen}10`,
                              backgroundColor: colors.offWhite
                            }}>
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
                                          {key === 'focusBrand' ? 'Campa Cola' : key.replace(/([A-Z])/g, ' $1').trim()}
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
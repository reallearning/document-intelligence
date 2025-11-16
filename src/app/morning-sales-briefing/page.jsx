"use client"
import React, { useState } from 'react';
import { TrendingUp, Target, Users, Package, Star, Trophy, ChevronRight, MapPin, Clock, DollarSign, Zap, Store, ArrowUpRight } from 'lucide-react';

const SalesmanBriefing = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' or 'timeline'

  const briefingData = {
    salesman: {
      name: "Arjun Mehta",
      beat: "Andheri West",
      date: "Monday, November 18, 2025"
    },
    performance: {
      achievement: 68,
      target: 85000,
      achieved: 57800,
      daysLeft: 12,
      growth: -8.5,
      effectiveCoverage: 72,
      productiveCalls: 14,
      productiveCallsTarget: 18,
      tlsd: 82,
      tlsdTarget: 100,
      focusBrand: {
        name: "Godrej No.1 Soap",
        achievement: 65,
        target: 12000,
        achieved: 7800
      },
      ranking: {
        inTeam: 4,
        teamSize: 6,
        inCity: 28,
        citySize: 45
      },
      incentive: 4200
    },
    greeting: "Arjun, you're 12 days away from month-end. Time to push hard - you're ₹27.2k away from target.",
    briefingSummary: "Yesterday was solid with 16 productive calls, but your coverage is slipping. You have 15 unbilled outlets in today's beat who bought last month - getting them billed alone will add ₹8.5k to your numbers. Focus Brand needs attention - you're at 65% while the team average is 78%."
  };

  const todayTimeline = [
    {
      time: "8:15 AM",
      outlet: "Vishal Store",
      action: "Order taken - Home Care mix",
      orderValue: 620,
      category: "Visit & Recover",
      impact: {
        achievement: { before: 68.0, after: 68.7, change: +0.7 },
        coverage: { before: 72, after: 73, change: +1 },
        productiveCalls: { before: 0, after: 1, change: +1 }
      },
      scheme: "Scheme X applied",
      products: ["Harpic 500ml x12", "Good Knight x6", "Hit Spray x8"]
    },
    {
      time: "8:42 AM",
      outlet: "Sharma Kirana",
      action: "Order taken - Personal Care",
      orderValue: 580,
      category: "Visit & Recover",
      impact: {
        achievement: { before: 68.7, after: 69.4, change: +0.7 },
        coverage: { before: 73, after: 74, change: +1 },
        productiveCalls: { before: 1, after: 2, change: +1 }
      },
      scheme: null,
      products: ["Cinthol Soap x24", "Godrej No.1 x12", "Fair Glow x6"]
    },
    {
      time: "9:18 AM",
      outlet: "Mumbai Kirana",
      action: "Focus Brand push - Godrej No.1",
      orderValue: 432,
      category: "Scheme Push",
      impact: {
        achievement: { before: 69.4, after: 69.9, change: +0.5 },
        focusBrand: { before: 65, after: 68.5, change: +3.5 },
        productiveCalls: { before: 2, after: 3, change: +1 }
      },
      scheme: "8% margin scheme + Free rack",
      products: ["Godrej No.1 24-pack combo x2"]
    },
    {
      time: "10:05 AM",
      outlet: "New Amar General",
      action: "Order taken - Detergents",
      orderValue: 450,
      category: "Visit & Recover",
      impact: {
        achievement: { before: 69.9, after: 70.4, change: +0.5 },
        coverage: { before: 74, after: 76, change: +2 },
        productiveCalls: { before: 3, after: 4, change: +1 }
      },
      scheme: null,
      products: ["Ezee Liquid x8", "Surf Excel x6"]
    },
    {
      time: "10:48 AM",
      outlet: "Patel Brothers",
      action: "Cross-sell - Cinthol Body Wash",
      orderValue: 450,
      category: "Cross-Sell",
      impact: {
        achievement: { before: 70.4, after: 70.9, change: +0.5 },
        tlsd: { before: 82, after: 87, change: +5 },
        productiveCalls: { before: 4, after: 5, change: +1 }
      },
      scheme: "6% launch offer + 2 testers",
      products: ["Cinthol Body Wash 200ml x12", "Cinthol Soap x12"]
    },
    {
      time: "11:35 AM",
      outlet: "Sai Store",
      action: "Focus Brand recovery",
      orderValue: 648,
      category: "Scheme Push",
      impact: {
        achievement: { before: 70.9, after: 71.7, change: +0.8 },
        focusBrand: { before: 68.5, after: 73.8, change: +5.3 },
        productiveCalls: { before: 5, after: 6, change: +1 }
      },
      scheme: "8% margin scheme",
      products: ["Godrej No.1 36-pack combo"]
    },
    {
      time: "12:20 PM",
      outlet: "Lunch Break",
      action: "25 min break",
      orderValue: 0,
      category: null,
      impact: null,
      isBreak: true
    },
    {
      time: "1:15 PM",
      outlet: "Gupta Traders",
      action: "Order taken - Full range",
      orderValue: 710,
      category: "Visit & Recover",
      impact: {
        achievement: { before: 71.7, after: 72.5, change: +0.8 },
        coverage: { before: 76, after: 78, change: +2 },
        productiveCalls: { before: 6, after: 7, change: +1 }
      },
      scheme: null,
      products: ["Home Care mix", "Personal Care mix", "Godrej No.1 x12"]
    },
    {
      time: "2:05 PM",
      outlet: "Modern Kirana",
      action: "Cross-sell - Body Wash + Fab Wash",
      orderValue: 870,
      category: "Cross-Sell",
      impact: {
        achievement: { before: 72.5, after: 73.5, change: +1.0 },
        tlsd: { before: 87, after: 94, change: +7 },
        productiveCalls: { before: 7, after: 8, change: +1 }
      },
      scheme: "Multiple schemes applied",
      products: ["Cinthol Body Wash x6", "Fab Wash 12pc", "Regular stock"]
    }
  ];

  const actionCards = [
    {
      id: 1,
      category: "Visit & Recover",
      priority: "urgent",
      title: "Recover 15 Unbilled Outlets",
      subtitle: "These outlets bought last month but haven't ordered yet",
      action: "Go visit these 15 stores today. They bought from you last month but haven't ordered in November yet. Just remind them and take the order.",
      why: "These guys already know you and your products. Last month they gave you ₹8,500. If you get just 10 of them to order today, you'll jump from 68% to 78% achievement. Easy money.",
      impact: {
        kpi: "Sales Achievement",
        value: "+10%",
        amount: "₹8.5k potential"
      },
      details: {
        outlets: [
          { name: "Vishal Store", lastOrder: "₹620", location: "Lane 1, Stop 3", product: "Home Care mix" },
          { name: "Sharma Kirana", lastOrder: "₹580", location: "Lane 1, Stop 5", product: "Personal Care" },
          { name: "New Amar General", lastOrder: "₹450", location: "Lane 2, Stop 2", product: "Detergents" },
          { name: "Gupta Traders", lastOrder: "₹710", location: "Lane 2, Stop 8", product: "Full range" },
          { name: "Reliable Store", lastOrder: "₹390", location: "Lane 3, Stop 4", product: "Soaps" }
        ],
        moreCount: 10,
        scheme: "Scheme X: Buy 10 get 1 free on Home Care range (Valid till Nov 22)",
        tips: [
          "Hit Vishal and Sharma first - they open at 7:30 AM",
          "Just say 'Last month you took ₹600 worth, same again this month?'",
          "Use Scheme X - that's what worked last time"
        ],
        successRate: "85%",
        avgTimePerStore: "12 mins"
      },
      conversationStarters: [
        "Show me the fastest route to cover these 15 outlets",
        "What if they say they still have stock from last month?",
        "Which 5 should I hit first if I'm short on time?",
        "What exactly did each store buy last month?",
        "What if Vishal says the scheme isn't attractive?"
      ],
      time: "Morning priority - 7:30 AM start"
    },
    {
      id: 2,
      category: "Scheme Push",
      priority: "high",
      title: "Push Godrej No.1 Soap - 10 Hot Outlets",
      subtitle: "Focus Brand recovery needed urgently",
      action: "These 10 stores used to buy Godrej No.1 regularly but stopped this month. Go tell them about the 8% margin scheme and get them to reorder. They already know the product sells.",
      why: "Focus Brand is killing you - you're at 65%, team is at 78%. Boss is watching this number. Get these 10 stores and you jump to 83%. Plus it affects your incentive directly.",
      impact: {
        kpi: "Focus Brand Achievement",
        value: "+18%",
        amount: "₹4.2k boost"
      },
      details: {
        outlets: [
          { name: "Mumbai Kirana", lastGN1Order: "Oct 15", typical: "24 pcs", location: "Lane 1, Stop 7" },
          { name: "Sai Store", lastGN1Order: "Oct 8", typical: "36 pcs", location: "Lane 2, Stop 3" },
          { name: "Ganesh Traders", lastGN1Order: "Oct 22", typical: "48 pcs", location: "Lane 2, Stop 6" },
          { name: "Lucky General Store", lastGN1Order: "Oct 12", typical: "24 pcs", location: "Lane 3, Stop 2" }
        ],
        moreCount: 6,
        scheme: "8% margin on 24-pack combo + Free display rack (Ends Nov 20)",
        competitorIntel: "Lifebuoy running 10% scheme - but we give display rack free (worth ₹350)",
        tips: [
          "Talk about the free display rack - worth ₹350, helps them sell more",
          "Scheme ends Nov 20 - only 2 days left, create urgency",
          "If stuck, you can take back unsold stock after 30 days"
        ],
        successRate: "72%",
        avgOrderValue: "₹420"
      },
      conversationStarters: [
        "Why did they stop buying Godrej No.1 suddenly?",
        "What do I say when they compare to Lifebuoy's 10% scheme?",
        "Can I bundle it with something else to make it better?",
        "Which outlets move the most soap - show me rankings",
        "What if they want return policy in writing?"
      ],
      time: "Mid-morning push - 9:00 AM onwards"
    },
    {
      id: 3,
      category: "Cross-Sell",
      priority: "medium",
      title: "Cross-sell Cinthol Body Wash at 8 Stores",
      subtitle: "They're already buying Cinthol Soap - natural upsell",
      action: "8 stores already buy Cinthol Soap from you. Just tell them 'You stock the soap, now stock the body wash too.' Easy add-on sale.",
      why: "These guys trust Cinthol already. Body wash has better margin (18% vs 12% on soap) and avg order is ₹450. You need to push your lines per call up - this helps.",
      impact: {
        kpi: "TLSD (Lines per call)",
        value: "+1.2 lines",
        amount: "₹3.6k new revenue"
      },
      details: {
        outlets: [
          { name: "Vishal Store", cintholSoapFreq: "3x/month", avgValue: "₹280", demographic: "Young professionals" },
          { name: "Modern Kirana", cintholSoapFreq: "2x/month", avgValue: "₹180", demographic: "Families" },
          { name: "Patel Brothers", cintholSoapFreq: "4x/month", avgValue: "₹420", demographic: "Mixed" },
          { name: "Elite General Store", cintholSoapFreq: "3x/month", avgValue: "₹310", demographic: "Young professionals" }
        ],
        moreCount: 4,
        scheme: "6% off on first order + 2 free tester bottles",
        productInfo: {
          packSizes: "200ml (₹165), 400ml (₹295)",
          margin: "18% vs 12% on soap",
          shelfLife: "24 months"
        },
        tips: [
          "Say 'People buying your soap will buy body wash too'",
          "Give 2 free testers for counter - customers try before buying",
          "Start with small 200ml pack - easier for them to say yes",
          "Young professional area? Push harder there - they use body wash"
        ],
        successRate: "68%",
        expectedConversion: "5-6 stores"
      },
      conversationStarters: [
        "Which stores have best customers for body wash?",
        "What if they say body wash doesn't sell here?",
        "Can I do soap + body wash combo deal?",
        "What's competitor pricing - help me position this",
        "If they only want 1-2 bottles, should I still sell?"
      ],
      time: "Throughout the day - opportunity-based"
    },
    {
      id: 4,
      category: "Coverage Target",
      priority: "medium",
      title: "Hit 18 Productive Calls Today",
      subtitle: "You're averaging 14, team is at 16",
      action: "Make 18 stops today that actually result in orders. You've done 16 before, now push for 18. Start earlier, take shorter lunch, don't waste time.",
      why: "Simple math - at 14 calls per day, you can't hit target even if every call is perfect. You need ₹2,267 per day to close the gap. 18 calls gets you there. 14 calls doesn't.",
      impact: {
        kpi: "Daily Revenue",
        value: "+4 calls",
        amount: "₹1,648 daily boost"
      },
      details: {
        currentAverage: "14.2 calls/day",
        teamAverage: "16.4 calls/day",
        topPerformer: "19.8 calls/day (Rohit)",
        yourBest: "16 calls (Oct 24)",
        routeOptimization: {
          currentRoute: "3 lanes, backtracking twice",
          optimizedRoute: "3 lanes, single pass",
          timeSaved: "35 minutes"
        },
        breakdown: {
          plannedStops: 20,
          expectedShutters: 2,
          expectedRejections: 0,
          targetProductive: 18
        },
        tips: [
          "Start at 7:30 AM not 8:00 AM - get 3 stores before 9",
          "Lunch 25 mins not 45 mins - you're losing 2 calls there",
          "Do paperwork at end of day, not after each call",
          "Pack your bag night before - saves 15 mins morning"
        ],
        timePerCall: "22 mins (target: 20 mins)"
      },
      conversationStarters: [
        "Give me best route for 18 calls with no backtracking",
        "What if traffic is bad - what's backup plan?",
        "Which stores can I skip if really pressed for time?",
        "How do I cut time per call from 22 to 20 mins?",
        "Bad weather day - still aim for 18 or adjust?"
      ],
      time: "Full day discipline - 7:30 AM to 5:00 PM"
    },
    {
      id: 5,
      category: "New Product Launch",
      priority: "low",
      title: "Introduce Fab Wash - New Product",
      subtitle: "5% launch scheme running this week only",
      action: "Any store with detergent section - just show them Fab Wash. New product, 5% off, free standee. Say 'Your competitor doesn't have this yet.'",
      why: "New products are easy to pitch - it's not 'buy more old stuff', it's 'here's something new'. NPD gives you bonus points. Plus scheme ends this week, so now or never.",
      impact: {
        kpi: "NPD Penetration",
        value: "+8 outlets",
        amount: "₹2.4k revenue + NPD bonus"
      },
      details: {
        productInfo: {
          mrp: "₹185 per 1kg",
          margin: "15% (₹28/pc)",
          minOrder: "12 pcs for scheme",
          shelfLife: "36 months"
        },
        targetStores: "Any store with Surf/Ariel/Tide on shelf",
        scheme: "5% off on 12 pc + Free standee (worth ₹280)",
        positioning: "Premium detergent with fabric softener built in",
        competitorPricing: {
          surfExcel: "₹195",
          ariel: "₹188",
          tide: "₹175",
          fabWash: "₹185"
        },
        tips: [
          "Only pitch if they stock premium detergents",
          "Say 'New launch, competitor doesn't have it'",
          "Built-in softener means customer saves money",
          "₹28 margin per piece is good for new product"
        ],
        successRate: "45%",
        expectedConversion: "6-8 stores"
      },
      conversationStarters: [
        "Which stores have best detergent section for this?",
        "What if they say too many brands already?",
        "Can I give trial order less than 12 pieces?",
        "How's Fab Wash quality vs Surf Excel actually?",
        "They want to test before committing 12 pcs?"
      ],
      time: "Opportunity-based - when you see good detergent sections"
    }
  ];

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'urgent':
        return { bg: '#FFF5F2', border: '#DF7649', label: 'Urgent', color: '#DF7649' };
      case 'high':
        return { bg: '#FFF9F0', border: '#D4A574', label: 'High Priority', color: '#D4A574' };
      case 'medium':
        return { bg: '#F5F8F5', border: '#85A383', label: 'Good Opportunity', color: '#85A383' };
      default:
        return { bg: '#FDFCFA', border: '#E7DDCA', label: 'Optional', color: '#878B87' };
    }
  };

  return (
    <div className='h-screen overflow-auto' style={{ 
      fontFamily: "'Hanken Grotesk', sans-serif",
      backgroundColor: '#FDFCFA',
      minHeight: '100vh',
      color: '#1B2A21'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#0C2C18',
        padding: '24px 48px'
      }}>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', color: '#85A383', marginBottom: '4px' }}>
            {briefingData.salesman.date}
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#E7DDCA',
            margin: 0
          }}>
            Good morning, {briefingData.salesman.name.split(' ')[0]} 👋
          </h1>
          <div style={{ fontSize: '13px', color: '#85A383', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={12} />
            {briefingData.salesman.beat}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 48px' }}>
        
        {/* Briefing Summary */}
        <div style={{
          backgroundColor: '#0C2C18',
          color: '#E7DDCA',
          padding: '28px',
          borderRadius: '4px',
          marginBottom: '32px',
          borderLeft: '4px solid #85A383'
        }}>
          <div style={{ fontSize: '13px', color: '#85A383', marginBottom: '12px', fontWeight: '600', letterSpacing: '0.05em' }}>
            TODAY'S BRIEFING
          </div>
          <p style={{ fontSize: '17px', lineHeight: '1.6', margin: '0 0 16px 0', color: '#E7DDCA', fontWeight: '500' }}>
            {briefingData.greeting}
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.7', margin: '0 0 20px 0', color: '#85A383' }}>
            {briefingData.briefingSummary}
          </p>

          <div style={{
            backgroundColor: 'rgba(133, 163, 131, 0.1)',
            padding: '16px',
            borderRadius: '4px',
            borderLeft: '2px solid #85A383'
          }}>
            <div style={{ fontSize: '12px', color: '#85A383', fontWeight: '600', marginBottom: '10px' }}>
              KEY PRIORITIES TODAY:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', color: '#E7DDCA', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#85A383', fontWeight: '700' }}>1.</span>
                <span>Hit 18 productive calls - you've been averaging 14, team is at 16. This alone adds ₹2.8k/day.</span>
              </div>
              <div style={{ fontSize: '13px', color: '#E7DDCA', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#85A383', fontWeight: '700' }}>2.</span>
                <span>Recover those 15 unbilled outlets - they bought last month, they're warm leads. Potential ₹8.5k.</span>
              </div>
              <div style={{ fontSize: '13px', color: '#E7DDCA', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#85A383', fontWeight: '700' }}>3.</span>
                <span>Push Godrej No.1 hard - you're 13 points below team average. 10 hot outlets ready to buy.</span>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(133, 163, 131, 0.3)',
            fontSize: '12px',
            color: '#85A383'
          }}>
            <strong>Quick win:</strong> Start with Vishal Store and Sharma Kirana - both bought ₹600+ last month and are early in your route. Get them first, build momentum.
          </div>
        </div>

        {/* KPI Dashboard */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#0C2C18',
            marginBottom: '20px'
          }}>
            Where You Stand
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
            {/* Achievement */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E7DDCA',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Target size={16} color="#0C2C18" />
                <div style={{ fontSize: '11px', color: '#878B87', fontWeight: '600', letterSpacing: '0.05em' }}>
                  MONTH ACHIEVEMENT
                </div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#DF7649', lineHeight: '1', marginBottom: '8px' }}>
                {briefingData.performance.achievement}%
              </div>
              <div style={{ fontSize: '13px', color: '#878B87', marginBottom: '8px' }}>
                ₹{(briefingData.performance.achieved / 1000).toFixed(1)}k / ₹{(briefingData.performance.target / 1000).toFixed(0)}k
              </div>
              <div style={{
                backgroundColor: '#FFF5F2',
                padding: '8px',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#DF7649',
                fontWeight: '600'
              }}>
                ₹{((briefingData.performance.target - briefingData.performance.achieved) / 1000).toFixed(1)}k to go
              </div>
            </div>

            {/* Effective Coverage */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E7DDCA',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Store size={16} color="#0C2C18" />
                <div style={{ fontSize: '11px', color: '#878B87', fontWeight: '600', letterSpacing: '0.05em' }}>
                  EFFECTIVE COVERAGE
                </div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#D4A574', lineHeight: '1', marginBottom: '8px' }}>
                {briefingData.performance.effectiveCoverage}%
              </div>
              <div style={{ fontSize: '13px', color: '#878B87', marginBottom: '8px' }}>
                Target: 85%
              </div>
              <div style={{
                backgroundColor: '#FFF9F0',
                padding: '8px',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#D4A574',
                fontWeight: '600'
              }}>
                15 outlets unbilled
              </div>
            </div>

            {/* Productive Calls */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E7DDCA',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Zap size={16} color="#0C2C18" />
                <div style={{ fontSize: '11px', color: '#878B87', fontWeight: '600', letterSpacing: '0.05em' }}>
                  PRODUCTIVE CALLS/DAY
                </div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#0C2C18', lineHeight: '1', marginBottom: '8px' }}>
                {briefingData.performance.productiveCalls}
              </div>
              <div style={{ fontSize: '13px', color: '#878B87', marginBottom: '8px' }}>
                Target: {briefingData.performance.productiveCallsTarget}
              </div>
              <div style={{
                backgroundColor: '#F5F8F5',
                padding: '8px',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#85A383',
                fontWeight: '600'
              }}>
                +4 calls needed today
              </div>
            </div>

            {/* TLSD */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E7DDCA',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Package size={16} color="#0C2C18" />
                <div style={{ fontSize: '11px', color: '#878B87', fontWeight: '600', letterSpacing: '0.05em' }}>
                  LINES SOLD (TLSD)
                </div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: '700', color: '#0C2C18', lineHeight: '1', marginBottom: '8px' }}>
                {briefingData.performance.tlsd}
              </div>
              <div style={{ fontSize: '13px', color: '#878B87', marginBottom: '8px' }}>
                Target: {briefingData.performance.tlsdTarget}
              </div>
              <div style={{
                backgroundColor: '#F5F8F5',
                padding: '8px',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#878B87',
                fontWeight: '600'
              }}>
                4.6 lines per call
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {/* Focus Brand */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E7DDCA',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Star size={16} color="#0C2C18" />
                <div style={{ fontSize: '11px', color: '#878B87', fontWeight: '600', letterSpacing: '0.05em' }}>
                  FOCUS BRAND
                </div>
              </div>
              <div style={{ fontSize: '13px', color: '#0C2C18', fontWeight: '600', marginBottom: '8px' }}>
                {briefingData.performance.focusBrand.name}
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#DF7649', marginBottom: '4px' }}>
                {briefingData.performance.focusBrand.achievement}%
              </div>
              <div style={{ fontSize: '12px', color: '#878B87' }}>
                ₹{(briefingData.performance.focusBrand.achieved / 1000).toFixed(1)}k / ₹{(briefingData.performance.focusBrand.target / 1000).toFixed(0)}k
              </div>
            </div>

            {/* Ranking */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E7DDCA',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Trophy size={16} color="#0C2C18" />
                <div style={{ fontSize: '11px', color: '#878B87', fontWeight: '600', letterSpacing: '0.05em' }}>
                  YOUR RANKING
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#0C2C18' }}>
                    #{briefingData.performance.ranking.inTeam}
                  </div>
                  <div style={{ fontSize: '11px', color: '#878B87' }}>
                    In Team ({briefingData.performance.ranking.teamSize})
                  </div>
                </div>
                <div style={{ borderLeft: '1px solid #E7DDCA', paddingLeft: '16px' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#0C2C18' }}>
                    #{briefingData.performance.ranking.inCity}
                  </div>
                  <div style={{ fontSize: '11px', color: '#878B87' }}>
                    In City ({briefingData.performance.ranking.citySize})
                  </div>
                </div>
              </div>
            </div>

            {/* Incentive */}
            <div style={{
              backgroundColor: '#F5F8F5',
              border: '1px solid #85A383',
              borderRadius: '4px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <DollarSign size={16} color="#85A383" />
                <div style={{ fontSize: '11px', color: '#85A383', fontWeight: '600', letterSpacing: '0.05em' }}>
                  INCENTIVE EARNED
                </div>
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#85A383', marginBottom: '4px' }}>
                ₹{briefingData.performance.incentive.toLocaleString()}
              </div>
              <div style={{ fontSize: '12px', color: '#85A383' }}>
                This month so far
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#0C2C18',
              margin: 0
            }}>
              Your Action Plan for Today
            </h2>
            <div style={{ fontSize: '13px', color: '#878B87' }}>
              {actionCards.length} actions across {[...new Set(actionCards.map(c => c.category))].length} categories
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            {[...new Set(actionCards.map(c => c.category))].map((category) => {
              const count = actionCards.filter(c => c.category === category).length;
              return (
                <div
                  key={category}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E7DDCA',
                    borderRadius: '4px',
                    fontSize: '13px',
                    color: '#0C2C18',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>{category}</span>
                  <span style={{
                    backgroundColor: '#F5F8F5',
                    color: '#85A383',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {actionCards.map((card, index) => {
              const style = getPriorityStyle(card.priority);
              const isExpanded = expandedCard === card.id;
              const prevCategory = index > 0 ? actionCards[index - 1].category : null;
              const showCategoryHeader = card.category !== prevCategory;

              return (
                <div key={card.id}>
                  {showCategoryHeader && index > 0 && (
                    <div style={{
                      height: '1px',
                      backgroundColor: '#E7DDCA',
                      margin: '8px 0 24px 0'
                    }} />
                  )}
                  
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: `2px solid ${style.border}`,
                      borderLeft: `6px solid ${style.border}`,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      transition: 'all 0.2s'
                    }}
                  >
                  {/* Card Header - Always Visible */}
                  <div
                    style={{
                      padding: '24px',
                      cursor: 'pointer'
                    }}
                    onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <div style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            color: '#0C2C18',
                            backgroundColor: '#E7DDCA',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            letterSpacing: '0.03em'
                          }}>
                            {card.category}
                          </div>
                          <div style={{
                            fontSize: '10px',
                            fontWeight: '700',
                            color: style.color,
                            backgroundColor: style.bg,
                            padding: '6px 10px',
                            borderRadius: '4px',
                            letterSpacing: '0.05em'
                          }}>
                            {style.label}
                          </div>
                          <div style={{ fontSize: '12px', color: '#878B87', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Clock size={12} />
                            {card.time}
                          </div>
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0C2C18', margin: '0 0 6px 0' }}>
                          {card.title}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#878B87', margin: 0, lineHeight: '1.5' }}>
                          {card.subtitle}
                        </p>
                      </div>
                      <ChevronRight 
                        size={24} 
                        color="#85A383"
                        style={{
                          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)',
                          transition: 'transform 0.2s',
                          marginLeft: '16px',
                          flexShrink: 0
                        }}
                      />
                    </div>

                    {/* Impact Badge */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: style.bg,
                      padding: '12px 16px',
                      borderRadius: '4px',
                      border: `1px solid ${style.border}`
                    }}>
                      <ArrowUpRight size={16} color={style.color} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div>
                          <span style={{ fontSize: '16px', fontWeight: '700', color: style.color }}>
                            {card.impact.value}
                          </span>
                          <span style={{ fontSize: '13px', color: style.color, marginLeft: '6px' }}>
                            {card.impact.kpi}
                          </span>
                        </div>
                        <div style={{ 
                          borderLeft: `1px solid ${style.color}40`, 
                          paddingLeft: '12px',
                          fontSize: '13px',
                          color: style.color,
                          fontWeight: '600'
                        }}>
                          {card.impact.amount}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div style={{
                      padding: '0 24px 24px 24px',
                      backgroundColor: '#FDFCFA'
                    }}>
                      <div style={{
                        padding: '20px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '4px',
                        border: '1px solid #E7DDCA',
                        marginBottom: '16px'
                      }}>
                        <div style={{ marginBottom: '20px' }}>
                          <div style={{ fontSize: '11px', color: '#878B87', fontWeight: '600', marginBottom: '10px', letterSpacing: '0.05em' }}>
                            WHAT TO DO
                          </div>
                          <p style={{ fontSize: '14px', color: '#1B2A21', margin: 0, lineHeight: '1.7' }}>
                            {card.action}
                          </p>
                        </div>

                        <div>
                          <div style={{ fontSize: '11px', color: '#878B87', fontWeight: '600', marginBottom: '10px', letterSpacing: '0.05em' }}>
                            WHY THIS MATTERS
                          </div>
                          <p style={{ fontSize: '14px', color: '#1B2A21', margin: 0, lineHeight: '1.7' }}>
                            {card.why}
                          </p>
                        </div>
                      </div>

                      {/* Detailed Information */}
                      <div style={{
                        backgroundColor: '#FFFFFF',
                        padding: '20px',
                        borderRadius: '4px',
                        border: '1px solid #E7DDCA',
                        marginBottom: '16px'
                      }}>
                        <div style={{ fontSize: '11px', color: '#878B87', fontWeight: '600', marginBottom: '16px', letterSpacing: '0.05em' }}>
                          DETAILED BREAKDOWN
                        </div>
                        
                        {card.details.outlets && Array.isArray(card.details.outlets) && card.details.outlets[0].name && (
                          <div style={{ marginBottom: '20px' }}>
                            <div style={{ fontSize: '12px', color: '#0C2C18', fontWeight: '600', marginBottom: '12px' }}>
                              Target Outlets ({card.details.outlets.length} shown, {card.details.moreCount} more in full list):
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {card.details.outlets.map((outlet, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    padding: '12px',
                                    backgroundColor: '#F5F8F5',
                                    borderRadius: '4px',
                                    border: '1px solid #E7DDCA'
                                  }}
                                >
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#0C2C18' }}>
                                      {outlet.name}
                                    </div>
                                    {outlet.lastOrder && (
                                      <div style={{ 
                                        fontSize: '13px', 
                                        fontWeight: '700', 
                                        color: '#85A383',
                                        backgroundColor: '#FFFFFF',
                                        padding: '4px 8px',
                                        borderRadius: '4px'
                                      }}>
                                        {outlet.lastOrder}
                                      </div>
                                    )}
                                  </div>
                                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#878B87' }}>
                                    {outlet.location && (
                                      <span>📍 {outlet.location}</span>
                                    )}
                                    {outlet.product && (
                                      <span>📦 {outlet.product}</span>
                                    )}
                                    {outlet.lastGN1Order && (
                                      <span>🗓️ Last GN1: {outlet.lastGN1Order}</span>
                                    )}
                                    {outlet.typical && (
                                      <span>📊 Typical: {outlet.typical}</span>
                                    )}
                                    {outlet.cintholSoapFreq && (
                                      <span>🔄 {outlet.cintholSoapFreq}</span>
                                    )}
                                    {outlet.demographic && (
                                      <span>👥 {outlet.demographic}</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            {card.details.moreCount > 0 && (
                              <div style={{ 
                                marginTop: '10px', 
                                fontSize: '12px', 
                                color: '#85A383', 
                                fontWeight: '600',
                                textAlign: 'center'
                              }}>
                                + {card.details.moreCount} more outlets in your beat
                              </div>
                            )}
                          </div>
                        )}

                        {card.details.scheme && (
                          <div style={{
                            backgroundColor: '#F5F8F5',
                            padding: '14px',
                            borderRadius: '4px',
                            marginBottom: '16px',
                            border: '1px solid #85A383'
                          }}>
                            <div style={{ fontSize: '11px', color: '#85A383', fontWeight: '600', marginBottom: '6px', letterSpacing: '0.05em' }}>
                              ACTIVE SCHEME
                            </div>
                            <div style={{ fontSize: '14px', color: '#0C2C18', fontWeight: '600' }}>
                              💰 {card.details.scheme}
                            </div>
                          </div>
                        )}

                        {card.details.competitorIntel && (
                          <div style={{
                            backgroundColor: '#FFF9F0',
                            padding: '14px',
                            borderRadius: '4px',
                            marginBottom: '16px',
                            border: '1px solid #D4A574'
                          }}>
                            <div style={{ fontSize: '11px', color: '#D4A574', fontWeight: '600', marginBottom: '6px', letterSpacing: '0.05em' }}>
                              COMPETITIVE INTEL
                            </div>
                            <div style={{ fontSize: '13px', color: '#1B2A21', lineHeight: '1.6' }}>
                              🎯 {card.details.competitorIntel}
                            </div>
                          </div>
                        )}

                        {card.details.productInfo && (
                          <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '12px', color: '#0C2C18', fontWeight: '600', marginBottom: '10px' }}>
                              Product Details:
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                              {Object.entries(card.details.productInfo).map(([key, value]) => (
                                <div key={key} style={{
                                  padding: '10px',
                                  backgroundColor: '#FDFCFA',
                                  borderRadius: '4px',
                                  border: '1px solid #E7DDCA'
                                }}>
                                  <div style={{ fontSize: '10px', color: '#878B87', marginBottom: '4px', textTransform: 'uppercase' }}>
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </div>
                                  <div style={{ fontSize: '13px', color: '#0C2C18', fontWeight: '600' }}>
                                    {value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {card.details.tips && (
                          <div>
                            <div style={{ fontSize: '12px', color: '#0C2C18', fontWeight: '600', marginBottom: '10px' }}>
                              Pro Tips:
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {card.details.tips.map((tip, idx) => (
                                <div key={idx} style={{
                                  fontSize: '13px',
                                  color: '#1B2A21',
                                  padding: '10px 12px',
                                  backgroundColor: '#F5F8F5',
                                  borderRadius: '4px',
                                  borderLeft: '3px solid #85A383',
                                  lineHeight: '1.6'
                                }}>
                                  💡 {tip}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {(card.details.successRate || card.details.avgTimePerStore) && (
                          <div style={{
                            marginTop: '16px',
                            paddingTop: '16px',
                            borderTop: '1px solid #E7DDCA',
                            display: 'flex',
                            gap: '20px'
                          }}>
                            {card.details.successRate && (
                              <div>
                                <div style={{ fontSize: '10px', color: '#878B87', marginBottom: '4px' }}>
                                  Success Rate
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#85A383' }}>
                                  {card.details.successRate}
                                </div>
                              </div>
                            )}
                            {card.details.avgTimePerStore && (
                              <div>
                                <div style={{ fontSize: '10px', color: '#878B87', marginBottom: '4px' }}>
                                  Avg Time
                                </div>
                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#0C2C18' }}>
                                  {card.details.avgTimePerStore}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Conversation Starters */}
                      <div style={{
                        backgroundColor: '#0C2C18',
                        padding: '20px',
                        borderRadius: '4px'
                      }}>
                        <div style={{ 
                          fontSize: '11px', 
                          color: '#85A383', 
                          fontWeight: '600', 
                          marginBottom: '14px', 
                          letterSpacing: '0.05em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <Package size={14} />
                          ASK ME ANYTHING ABOUT THIS ACTION
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {card.conversationStarters.map((question, idx) => (
                            <button
                              key={idx}
                              style={{
                                padding: '12px 16px',
                                backgroundColor: 'rgba(133, 163, 131, 0.1)',
                                border: '1px solid rgba(133, 163, 131, 0.3)',
                                borderRadius: '4px',
                                fontSize: '13px',
                                color: '#E7DDCA',
                                lineHeight: '1.5',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontFamily: "'Hanken Grotesk', sans-serif",
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(133, 163, 131, 0.2)';
                                e.currentTarget.style.borderColor = '#85A383';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(133, 163, 131, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(133, 163, 131, 0.3)';
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                // In real implementation, this would open a chat interface
                                alert(`Starting conversation about: "${question}"`);
                              }}
                            >
                              <Package size={14} style={{ flexShrink: 0 }} />
                              <span style={{ flex: 1 }}>{question}</span>
                              <ChevronRight size={14} color="#85A383" style={{ flexShrink: 0 }} />
                            </button>
                          ))}
                        </div>
                        
                        <div style={{
                          marginTop: '14px',
                          paddingTop: '14px',
                          borderTop: '1px solid rgba(133, 163, 131, 0.3)',
                          fontSize: '12px',
                          color: '#85A383',
                          textAlign: 'center'
                        }}>
                          💬 Click any question to start a conversation with AI
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesmanBriefing;
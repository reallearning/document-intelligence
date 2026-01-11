"use client"
import React, { useState } from 'react';
import { Target, TrendingUp, AlertCircle, BarChart3, ChevronLeft, ChevronRight, ChevronDown, X, Activity, Sparkles, MessageSquare, ArrowRight, Database, Cpu, TrendingDown, Home, Package, Settings, Users } from 'lucide-react';
import Link from 'next/link';

const TradePromoIntelligence = () => {
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 FY25');
  const [expandedScheme, setExpandedScheme] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showTrail, setShowTrail] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [viewMode, setViewMode] = useState('portfolio');
  const [expandedTrailStep, setExpandedTrailStep] = useState(null);
    const [currentView, setCurrentView] = useState('overview');

  const portfolioMetrics = {
    totalSchemes: 23,
    activeSchemes: 18,
    totalInvestment: '₹58.6Cr',
    projectedROI: '18.4%',
    averageLeakage: '12%',
    criticalIssues: 2,
    opportunities: '₹32.4Cr'
  };

  const schemeHealthDistribution = [
    { status: 'Healthy', count: 8, percentage: 44, color: '#85A383' },
    { status: 'Optimize', count: 7, percentage: 39, color: '#D4AF37' },
    { status: 'Critical', count: 3, percentage: 17, color: '#DF7649' }
  ];

  const topIssues = [
    {
      title: 'High leakage schemes requiring immediate restructure',
      schemes: 3,
      impact: '₹14.2Cr',
      severity: 'critical'
    },
    {
      title: 'Coverage gaps preventing monsoon opportunity capture',
      schemes: 2,
      impact: '₹16.8Cr',
      severity: 'high'
    },
    {
      title: 'Conservative targets reducing scheme efficiency',
      schemes: 4,
      impact: '₹5.2Cr',
      severity: 'medium'
    }
  ];

  const decisions = [
    {
      id: 'TD-001',
      scheme: 'Monsoon Shield BMGM',
      product: 'Good Knight Gold Flash Liquid Vaporizer',
      priority: 'high',
      status: 'optimize',
      headline: 'Expand coverage to capture ₹12.4L monsoon opportunity',
      opportunity: '₹12.4L',
      roiImprovement: '+21.2%',
      coverage: { current: 59, target: 78 },
      leakage: { current: 9, benchmark: 12 },
      timeframe: '8 weeks remaining',
      schemeDetails: {
        type: 'Volume-Based Buy-More-Get-More',
        structure: 'Buy 30 → 3 free | Buy 60 → 7 free | Buy 90 → 12 free',
        duration: '3-month monsoon season (Jun-Aug)',
        eligibility: 'SMT (4,200), GT (9,800), Chemists (1,800)',
        currentCoverage: '2,800 SMT (67%) | 5,400 GT (55%) | 1,100 Chemist (61%)'
      },
      metrics: {
        currentCoverage: '9,300 stores (59%)',
        schemeROI: '21.2%',
        leakage: '9%',
        volumeLift: '+34% vs baseline'
      },
      kpis: {
        distribution: { current: '59%', vsLY: '+12pp', vsL3M: '+8pp', target: '78%' },
        volume: { current: '6.2L units', vsLY: '+28%', vsL3M: '+19%', incremental: '+34%' },
        value: { current: '₹52.7L', vsLY: '+31%', vsL3M: '+22%', incremental: '₹12.38L' },
        roi: { result: '21.2%', calculation: '(₹12.38L incremental margin - ₹10.21L scheme cost) / ₹10.21L × 100' }
      },
      channelPerformance: [
        { name: 'SMT', dist: '67%', volume: '3.1L', revenue: '₹26.4L', growth: 38, status: 'strong' },
        { name: 'GT', dist: '55%', volume: '2.6L', revenue: '₹22.1L', growth: 24, status: 'moderate' },
        { name: 'Chemist', dist: '61%', volume: '0.5L', revenue: '₹4.2L', growth: 18, status: 'moderate' }
      ],
      regionalPerformance: [
        { name: 'South', sales: '₹21.1L', growth: 32, share: '31.6%', competitor: 'Mortein: 28.4%', status: 'strong' },
        { name: 'East', sales: '₹15.8L', growth: 18, share: '26.4%', competitor: 'Mortein: 26.2%', status: 'strong' },
        { name: 'West', sales: '₹9.5L', growth: 14, share: '19.8%', competitor: 'All Out: 22.6%', status: 'moderate' },
        { name: 'North', sales: '₹6.3L', growth: -4, share: '14.2%', competitor: 'Mortein: 28.4%', status: 'critical' }
      ],
      insights: {
        opportunity: 'Monsoon season drives 48% of annual sales. 6,500 eligible stores remain uncovered with proven scheme economics (21.2% ROI). Window closes Aug 31.',
        constraints: [
          'TSI bandwidth gaps - North 1:290 vs South 1:150 ratio',
          '72% of non-participating stores cite "not contacted"',
          'Tier slab gaps encourage Tier 1 clustering (68% stuck at lowest tier)',
          'Stock-outs at 16% overall, 22% in North region'
        ],
        recommendation: 'Three-pronged approach: (1) Optimize tier structure to 36-48-72 pieces, (2) Expand to remaining 6,500 stores, (3) Add distributor financing support.'
      },
      rcaFactors: [
        { 
          category: 'People Efficiency',
          factor: 'Sales Force Bandwidth & Coverage Gaps', 
          weight: 38,
          score: 84,
          evidence: 'Field reports show 72% of non-participating stores cite "not contacted" or "unaware". Each TSI covers avg 240 stores vs optimal 160. South region (32% growth) has 1 TSI per 150 stores vs North (-4% growth) with 1 per 290 stores.'
        },
        { 
          category: 'Competition Activity',
          factor: 'Regional Competitive Pressure', 
          weight: 22,
          score: 81,
          evidence: 'North declining at -4% with Mortein commanding 28.4% share. South performing exceptionally (+32%) with stronger Good Knight presence (31.6%).'
        },
        { 
          category: 'Scheme Design',
          factor: 'Tier Slab Optimization Opportunity', 
          weight: 26,
          score: 77,
          evidence: 'Tier analysis shows 68% of retailers at Tier 1 (30 pieces) have capacity to reach Tier 2 (60 pieces). Recommended tier spacing: 36-48-72 instead of 30-60-90.'
        },
        {
          category: 'Stock Outs',
          factor: 'Distributor Stock Availability Issues',
          weight: 14,
          score: 71,
          evidence: '16% of enrolled retailers experienced stock-outs. North region worst at 22% vs South at 11%. Average stock-out duration: 5-7 days during peak weeks.'
        }
      ],
      scenarios: [
        {
          action: 'Optimize tier structure to 36-48-72',
          impact: '₹4.12L gain',
          details: '52% tier migration, ROI improves to 26.8%',
          breakdown: 'Reducing tier gaps encourages 52% of Tier 1 retailers (1,612 stores) to move to Tier 2. Average incremental purchase: 18 units × ₹68 margin × 2.5 months = ₹4.12L gross - ₹2.84L extra scheme cost = ₹1.28L net gain'
        },
        {
          action: 'Expand to 6,500 uncovered stores',
          impact: '₹19.6L gain',
          details: '32pp coverage increase, 33.3% ROI',
          breakdown: '3,900 additional stores (60% uptake) × avg 92 units/month × ₹68 margin × 2 months = ₹38.2L gross - ₹18.6L investment = ₹19.6L net profit'
        },
        {
          action: 'Add distributor financing',
          impact: '₹4.50L gain',
          details: 'Stock-outs 16% → 5%, ROI to 27.6%',
          breakdown: 'Working capital facility (₹540K interest cost) reduces stock-outs from 16% to 5%. Enables 1,240 additional retailers, generating ₹5.04L incremental margin minus ₹540K cost = ₹4.50L net'
        }
      ],
      trail: [
        { 
          time: '08:14:22', 
          agent: 'Orchestrator', 
          agentType: 'coordination',
          action: 'Initiated Monsoon Season Review', 
          database: null,
          query: null,
          thinking: 'Quarterly portfolio review triggered for trade promotions with monsoon season ending. Need comprehensive analysis of active schemes.',
          findings: null,
          nextAction: 'Request market intelligence on seasonal patterns'
        },
        { 
          time: '08:14:35', 
          agent: 'Market Intelligence', 
          agentType: 'analysis',
          action: 'Retrieved Monsoon Sales Patterns',
          database: 'Sales DB',
          query: 'SELECT product_category, SUM(sales_value) as total_sales, AVG(growth_rate) as avg_growth FROM sales WHERE period IN ("monsoon_2024", "monsoon_2023", "monsoon_2022") GROUP BY product_category, month ORDER BY total_sales DESC',
          thinking: 'Historical data shows mosquito repellent category generates 48% of annual revenue during Jun-Aug period. Good Knight brand has 24.3% share.',
          findings: 'Monsoon season critical for repellent category. Jun-Aug accounts for ₹184Cr of ₹382Cr annual sales. Peak demand weeks 3-8 of season.',
          nextAction: 'Analyze current season performance'
        },
        { 
          time: '08:14:52', 
          agent: 'Scheme Performance Analyzer',
          agentType: 'metrics',
          action: 'Evaluated Active Monsoon Schemes',
          database: 'Promo DB',
          query: 'SELECT s.scheme_id, s.scheme_name, s.product, s.start_date, s.end_date, SUM(t.volume) as total_volume, SUM(t.value) as total_value, COUNT(DISTINCT t.retailer_id) as store_count FROM schemes s JOIN transactions t ON s.scheme_id = t.scheme_id WHERE s.season = "monsoon_2024" AND s.status = "active" GROUP BY s.scheme_id',
          thinking: 'Need to assess which monsoon schemes are performing and identify gaps. Focus on coverage, volume lift, and ROI metrics.',
          findings: 'Monsoon Shield BMGM scheme shows strong performance (21.2% ROI, +34% volume lift) but only 59% coverage of eligible stores. 6 weeks remaining.',
          nextAction: 'Deep-dive into coverage gaps'
        },
        { 
          time: '08:15:18', 
          agent: 'Distribution Analyzer',
          agentType: 'analysis',
          action: 'Mapped Coverage Gaps',
          database: 'Master Data',
          query: 'SELECT r.region, r.channel, COUNT(DISTINCT r.retailer_id) as total_eligible, COUNT(DISTINCT p.retailer_id) as participating, (COUNT(DISTINCT p.retailer_id) * 100.0 / COUNT(DISTINCT r.retailer_id)) as coverage_pct FROM retailers r LEFT JOIN scheme_participants p ON r.retailer_id = p.retailer_id AND p.scheme_id = "MS-BMGM-2024" WHERE r.channel IN ("SMT", "GT", "Chemist") AND r.status = "active" GROUP BY r.region, r.channel',
          thinking: 'Coverage analysis reveals significant opportunity. Total eligible base is 15,800 stores but only 9,300 participating. Need to understand why 41% gap exists.',
          findings: '6,500 eligible stores not participating. Coverage varies by channel: SMT 67%, GT 55%, Chemist 61%. Regional variance significant: South 74%, North 48%.',
          nextAction: 'Investigate root causes of non-participation'
        },
        { 
          time: '08:15:44', 
          agent: 'RCA Engine',
          agentType: 'reasoning',
          action: 'Root Cause Analysis - Coverage Gaps',
          database: 'Field Reports',
          query: 'SELECT nc.reason_category, nc.reason_detail, COUNT(*) as store_count, AVG(nc.confidence_score) as avg_confidence FROM non_participating_stores nps JOIN non_contact_reasons nc ON nps.retailer_id = nc.retailer_id WHERE nps.scheme_id = "MS-BMGM-2024" GROUP BY nc.reason_category, nc.reason_detail ORDER BY store_count DESC',
          thinking: 'Multiple factors could explain 41% non-participation: sales force bandwidth, awareness, scheme attractiveness, competitive activity, or stock availability. Need evidence-based diagnosis.',
          findings: 'Primary factor: Sales force bandwidth (38% weight, 84% confidence). 72% of non-participating stores cite "not contacted" or "unaware". TSI-to-store ratio North 1:290 vs South 1:150.',
          nextAction: 'Quantify opportunity value'
        },
        { 
          time: '08:16:12', 
          agent: 'Financial Modeler',
          agentType: 'calculation',
          action: 'Calculated Expansion Opportunity',
          database: null,
          query: null,
          thinking: 'Current participating stores averaging 92 units/month at ₹68 margin with 60% scheme uptake rate. Apply same economics to 6,500 uncovered stores to estimate opportunity.',
          findings: 'Expanding to all 6,500 stores: Expected 3,900 uptake (60%) × 92 units/month × ₹68 margin × 2 months remaining = ₹38.2L incremental gross margin. Scheme cost ₹18.6L. Net opportunity: ₹19.6L.',
          nextAction: 'Evaluate scheme design optimization'
        },
        { 
          time: '08:16:38', 
          agent: 'Scheme Design Analyzer',
          agentType: 'analysis',
          action: 'Tier Structure Analysis',
          database: 'Transaction DB',
          query: 'SELECT tier_achieved, COUNT(DISTINCT retailer_id) as retailer_count, AVG(units_purchased) as avg_units, AVG(units_to_next_tier) as gap_to_next_tier FROM scheme_transactions WHERE scheme_id = "MS-BMGM-2024" AND month IN (1,2) GROUP BY tier_achieved ORDER BY tier_achieved',
          thinking: 'Current tier structure is 30-60-90 pieces. Analyzing purchase patterns to identify if tier gaps are optimally set or creating clustering.',
          findings: 'Tier 1 clustering: 68% of retailers stuck at 30-piece tier. Average purchase 34 units suggests capacity to reach 48-piece tier if gap reduced. Recommendation: Adjust to 36-48-72 structure.',
          nextAction: 'Model tier optimization impact'
        },
        { 
          time: '08:17:02', 
          agent: 'Financial Modeler',
          agentType: 'calculation',
          action: 'Modeled Tier Optimization Scenarios',
          database: null,
          query: null,
          thinking: 'If 52% of Tier 1 retailers (1,612 stores) move to Tier 2 with new 36-48-72 structure, calculate incremental margin vs additional scheme cost.',
          findings: '1,612 stores × 18 incremental units × ₹68 margin × 2.5 months = ₹4.12L gross margin. Extra scheme cost ₹2.84L. Net gain ₹1.28L. ROI improves from 21.2% to 26.8%.',
          nextAction: 'Assess stock-out constraints'
        },
        { 
          time: '08:17:28', 
          agent: 'Supply Chain Analyzer',
          agentType: 'analysis',
          action: 'Stock-out Impact Assessment',
          database: 'Inventory DB',
          query: 'SELECT d.distributor_id, d.region, COUNT(DISTINCT so.date) as stockout_days, AVG(so.duration_hours) as avg_duration, COUNT(DISTINCT r.retailer_id) as affected_retailers FROM stock_outs so JOIN distributors d ON so.distributor_id = d.distributor_id JOIN retailers r ON d.distributor_id = r.distributor_id WHERE so.product_sku = "GK-GOLD-FLASH" AND so.date BETWEEN "2024-06-01" AND "2024-07-31" GROUP BY d.distributor_id, d.region',
          thinking: '16% of participating retailers reporting stock-outs. Need to quantify impact on scheme performance and identify if distributor financing could help.',
          findings: 'Stock-outs affecting 1,488 retailers (16%). North region worst at 22%, South at 11%. Average duration 5-7 days during peak weeks. Estimated lost sales ₹8.2L.',
          nextAction: 'Evaluate financing intervention'
        },
        { 
          time: '08:17:54', 
          agent: 'Financial Modeler',
          agentType: 'calculation',
          action: 'Working Capital Facility Impact',
          database: null,
          query: null,
          thinking: 'Working capital facility (₹12L pool, 4.5% interest) could reduce stock-outs from 16% to 5%. Calculate net benefit after financing cost.',
          findings: 'Working capital facility enables 1,240 additional retailers to maintain stock. Incremental margin ₹5.04L minus ₹540K interest cost = ₹4.50L net gain. ROI improves to 27.6%.',
          nextAction: 'Synthesize recommendations'
        },
        { 
          time: '08:18:22', 
          agent: 'Orchestrator',
          agentType: 'coordination',
          action: 'Synthesized Multi-Dimensional Recommendation',
          database: null,
          query: null,
          thinking: 'Three intervention levers identified with quantified impacts: (1) Tier optimization ₹4.12L, (2) Coverage expansion ₹19.6L, (3) Financing support ₹4.50L. Combined opportunity ₹28.2L vs current trajectory.',
          findings: 'Comprehensive recommendation package: Optimize tier structure to 36-48-72, expand to 6,500 uncovered stores, add distributor working capital support. Combined net opportunity: ₹28.2L incremental profit.',
          nextAction: 'Generate decision brief'
        },
        { 
          time: '08:18:45', 
          agent: 'Decision Intelligence',
          agentType: 'synthesis',
          action: 'Generated Executive Decision Brief',
          database: null,
          query: null,
          thinking: 'Package findings into actionable decision format with headline, quantified opportunity, root causes, recommended actions, and implementation timeline.',
          findings: 'Decision TD-001 created: "Expand coverage to capture ₹12.4L monsoon opportunity" with three-pronged action plan, 8-week execution window, and detailed implementation roadmap.',
          nextAction: null
        }
      ]
    },
    {
      id: 'TD-002',
      scheme: 'Festive Value Pack',
      product: 'Good Knight Advanced Refill 90-Day Pack',
      priority: 'medium',
      status: 'healthy',
      headline: 'Maintain momentum with targeted metro expansion',
      opportunity: '₹6.8L',
      roiImprovement: '+8.4%',
      coverage: { current: 73, target: 82 },
      leakage: { current: 8, benchmark: 12 },
      timeframe: '12 weeks remaining',
      schemeDetails: {
        type: 'Gift-with-Purchase',
        structure: 'Buy 2 × 90-day packs → Free branded mosquito net',
        duration: '4-month festive season (Aug-Nov)',
        eligibility: 'Modern Trade (850), Pharmacy Chains (420)',
        currentCoverage: '620 MT (73%) | 308 Pharmacy (73%)'
      },
      metrics: {
        currentCoverage: '928 stores (73%)',
        schemeROI: '18.6%',
        leakage: '8%',
        volumeLift: '+28% vs baseline'
      },
      kpis: {
        distribution: { current: '73%', vsLY: '+18pp', vsL3M: '+11pp', target: '82%' },
        volume: { current: '4.8L units', vsLY: '+24%', vsL3M: '+16%', incremental: '+28%' },
        value: { current: '₹62.4L', vsLY: '+26%', vsL3M: '+19%', incremental: '₹14.2L' },
        roi: { result: '18.6%', calculation: '(₹14.2L incremental margin - ₹12.1L scheme cost) / ₹12.1L × 100' }
      },
      channelPerformance: [
        { name: 'Modern Trade', dist: '73%', volume: '3.4L', revenue: '₹44.2L', growth: 28, status: 'strong' },
        { name: 'Pharmacy Chain', dist: '73%', volume: '1.4L', revenue: '₹18.2L', growth: 22, status: 'strong' }
      ],
      regionalPerformance: [
        { name: 'Metro', sales: '₹48.2L', growth: 31, share: '35.2%', competitor: 'Mortein: 24.8%', status: 'strong' },
        { name: 'Tier-1', sales: '₹14.2L', growth: 18, share: '28.6%', competitor: 'All Out: 29.4%', status: 'moderate' }
      ],
      insights: {
        opportunity: 'Premium positioning resonating well in metros. Gift proposition driving trial in pharmacy channel. 342 uncovered stores in target metros represent ₹6.8L opportunity.',
        constraints: [
          'Gift inventory bottleneck - 2-week lead time affecting enrollment',
          'Limited brand visibility vs Mortein premium variants',
          'Higher price point creating hesitation in Tier-1 cities'
        ],
        recommendation: 'Focus metro expansion with pre-positioned gift inventory. Consider Tier-1 price-point adjustment or alternate gift for Q4.'
      },
      rcaFactors: [
        { 
          category: 'Scheme Execution',
          factor: 'Gift Inventory Management', 
          weight: 42,
          score: 79,
          evidence: '2-week lead time for branded nets causing enrollment delays. 18% of interested stores waiting for inventory. Metro regions most affected due to higher concentration.'
        },
        { 
          category: 'Competition Activity',
          factor: 'Premium Segment Pressure', 
          weight: 28,
          score: 74,
          evidence: 'Mortein premium variants gaining share in pharmacy channel (24.8% vs our 35.2%). Their 3-pack combo pricing creating consideration pressure.'
        },
        { 
          category: 'Price Point',
          factor: 'Tier-1 Affordability Gap', 
          weight: 30,
          score: 71,
          evidence: 'Tier-1 cities showing 18% growth vs Metro 31%. Price elasticity study shows ₹40-50 premium acceptable in metros, ₹25-30 in Tier-1.'
        }
      ],
      scenarios: [
        {
          action: 'Pre-position gift inventory in top 6 metros',
          impact: '₹4.2L gain',
          details: 'Reduce lead time, enable 280 store expansion',
          breakdown: '280 stores × 52 units/month × ₹82 margin × 3 months = ₹11.8L gross - ₹7.6L investment = ₹4.2L net'
        },
        {
          action: 'Tier-1 adjusted pricing strategy',
          impact: '₹2.6L gain',
          details: 'Lower premium positioning for secondary cities',
          breakdown: '62 additional Tier-1 stores × 38 units/month × ₹74 margin × 3 months = ₹5.2L gross - ₹2.6L cost = ₹2.6L net'
        }
      ],
      trail: []
    },
    {
      id: 'TD-003',
      scheme: 'Diwali Distributor Sprint',
      product: 'Good Knight Portfolio (Multi-SKU)',
      priority: 'critical',
      status: 'critical',
      headline: 'Urgent restructure needed - 24% leakage eroding profitability',
      opportunity: '₹0',
      roiImprovement: '-8.2%',
      coverage: { current: 82, target: 82 },
      leakage: { current: 24, benchmark: 12 },
      timeframe: '4 weeks remaining',
      schemeDetails: {
        type: 'Volume Incentive for Distributors',
        structure: 'Tiered growth targets: 15% → 2% extra margin | 25% → 3.5% | 40% → 5%',
        duration: '6-week Diwali build-up (Oct-Nov)',
        eligibility: 'All distributors (128 across India)',
        currentCoverage: '105 distributors (82%)'
      },
      metrics: {
        currentCoverage: '105 distributors (82%)',
        schemeROI: '-8.2%',
        leakage: '24%',
        volumeLift: '+18% vs baseline'
      },
      kpis: {
        distribution: { current: '82%', vsLY: '+6pp', vsL3M: '+4pp', target: '82%' },
        volume: { current: '18.4L units', vsLY: '+15%', vsL3M: '+12%', incremental: '+18%' },
        value: { current: '₹124.8L', vsLY: '+16%', vsL3M: '+14%', incremental: '₹18.2L' },
        roi: { result: '-8.2%', calculation: '(₹18.2L incremental margin - ₹19.8L scheme cost) / ₹19.8L × 100' }
      },
      channelPerformance: [
        { name: 'SMT Distributors', dist: '86%', volume: '8.2L', revenue: '₹54.8L', growth: 22, status: 'moderate' },
        { name: 'GT Distributors', dist: '78%', volume: '7.8L', revenue: '₹52.2L', growth: 14, status: 'weak' },
        { name: 'Modern Trade', dist: '89%', volume: '2.4L', revenue: '₹17.8L', growth: 18, status: 'moderate' }
      ],
      regionalPerformance: [
        { name: 'West', sales: '₹42.4L', growth: 24, share: '26.8%', competitor: 'All Out: 28.2%', status: 'moderate' },
        { name: 'South', sales: '₹38.2L', growth: 18, share: '28.4%', competitor: 'Mortein: 26.8%', status: 'moderate' },
        { name: 'North', sales: '₹28.4L', growth: 8, share: '22.6%', competitor: 'Mortein: 32.4%', status: 'weak' },
        { name: 'East', sales: '₹15.8L', growth: 12, share: '24.2%', competitor: 'All Out: 24.8%', status: 'moderate' }
      ],
      insights: {
        opportunity: 'No expansion opportunity - scheme fundamentally unprofitable. Negative ROI driven by excessive leakage and loose target validation.',
        constraints: [
          'No baseline controls - distributors booking routine purchases as "incremental"',
          '78% of payouts for growth <10% (non-incremental)',
          'Backdating invoices to inflate growth rates',
          'Secondary sales validation gaps enabling gaming'
        ],
        recommendation: 'Immediate restructure required: (1) Implement strict baseline controls, (2) Require secondary sales proof, (3) Increase minimum threshold to 20%, (4) Add clawback provisions for non-movement.'
      },
      rcaFactors: [
        { 
          category: 'Scheme Design',
          factor: 'Weak Baseline Controls & Validation', 
          weight: 58,
          score: 92,
          evidence: '78% of payouts going to distributors with <10% growth. Audit shows 62% of "incremental" volume was routine purchases. No secondary sales validation enabling invoice backdating and warehouse stuffing.'
        },
        { 
          category: 'Scheme Design',
          factor: 'Low Entry Threshold Encouraging Gaming', 
          weight: 26,
          score: 86,
          evidence: '15% growth threshold too low. Historical seasonality delivers 12-14% baseline growth during Diwali period. Effective incremental threshold should be 20-25%.'
        },
        { 
          category: 'Process Gaps',
          factor: 'Insufficient Audit & Clawback Mechanisms', 
          weight: 16,
          score: 81,
          evidence: 'Post-scheme audits identify issues but no clawback provisions in contracts. Sales teams reluctant to enforce due to distributor relationships. Estimated ₹4.7L in unrecovered improper payouts.'
        }
      ],
      scenarios: [
        {
          action: 'Terminate scheme early with stringent audit',
          impact: '₹6.4L saved',
          details: 'Cut losses, recover improper payouts',
          breakdown: 'Stop remaining 4 weeks = ₹4.8L cost avoided. Clawback 40% of questionable payouts = ₹1.6L recovered. Net savings ₹6.4L'
        },
        {
          action: 'Restructure with 20% minimum, secondary sales proof',
          impact: '₹8.2L improved',
          details: 'Convert to 12.4% ROI with proper controls',
          breakdown: 'New thresholds eliminate 78% of current leakage (₹15.4L). True incremental volume generates ₹12.8L margin - ₹4.6L proper scheme cost = ₹8.2L profit, 12.4% ROI'
        }
      ],
      trail: []
    }
  ];

      const navItems = [
        { icon: Home, label: 'Overview', href: "/sales" },
        { icon: BarChart3, label: 'Trade Intelligence', href: "/sales/trade-intelligence" },
        { icon: Package, label: 'New Product Analysis', href: "/sales/new-product-analysis" },
        { icon: Settings, label: 'Settings' }
      ];

  const getAgentIcon = (type) => {
    switch(type) {
      case 'coordination': return Target;
      case 'analysis': return BarChart3;
      case 'metrics': return Activity;
      case 'calculation': return Cpu;
      case 'reasoning': return Sparkles;
      case 'synthesis': return Database;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'healthy': return '#85A383';
      case 'optimize': return '#D4AF37';
      case 'critical': return '#DF7649';
      default: return '#878B87';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return '#DF7649';
      case 'high': return '#D4AF37';
      case 'medium': return '#85A383';
      default: return '#878B87';
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: 'user', text: input }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        text: 'I can help analyze scheme performance, explain recommendations, or dive deeper into specific metrics. What would you like to explore?' 
      }]);
    }, 800);
    setInput('');
  };

  return (
    <div className="overflow-auto h-screen" style={{ backgroundColor: '#FAFAF8' }}>
      {/* Top Navigation */}
      <div className="border-b" style={{ backgroundColor: '#0C2C18', borderColor: '#1B2A21' }}>
        <div className="px-8 py-4">
          <div className="flex items-center justify-end">
            
            <div className="flex items-center gap-6">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-transparent border text-sm focus:outline-none focus:border-gray-400"
                style={{ color: '#E7DDCA', borderColor: '#1B2A21' }}
              >
                <option value="Q4 FY25">Q4 FY25</option>
                <option value="Q3 FY25">Q3 FY25</option>
                <option value="Q2 FY25">Q2 FY25</option>
              </select>
              
              <button 
                onClick={() => setChatOpen(!chatOpen)}
                className="p-2 hover:opacity-80 transition-opacity"
                style={{ color: '#85A383' }}
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar */}
         <div 
        className={`transition-all duration-300 ${navCollapsed ? 'w-20' : 'w-64'} flex flex-col`}
        style={{ backgroundColor: '#0C2C18' }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'rgba(133, 163, 131, 0.3)' }}>
          {navCollapsed ? (
            <div className="text-2xl font-light text-center" style={{ fontFamily: 'Georgia, serif', color: '#85A383' }}>
              M
            </div>
          ) : (
            <div className="text-3xl font-light tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#85A383' }}>
              MORRiE
            </div>
          )}
        </div>

        <nav className="flex-1 pt-8 px-2">
          {navItems.map((item, index) => (
            <Link href={item.href ?? ""} key={index}>
            <div
              className={`cursor-pointer w-full hover:bg-[#85a383] flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                item.active ? 'border-l-2' : ''
              }`}
            >
              <item.icon size={20} strokeWidth={1} />
              {!navCollapsed && (
                <span className="text-sm tracking-wide" style={{ fontFamily: 'sans-serif' }}>
                  {item.label}
                </span>
              )}
            </div></Link>
          ))}
        </nav>

        <button
          onClick={() => setNavCollapsed(!navCollapsed)}
          className="p-6 flex items-center justify-center border-t"
          style={{ color: '#878B87', borderColor: 'rgba(133, 163, 131, 0.3)' }}
        >
          {navCollapsed ? <ChevronRight size={20} strokeWidth={1} /> : <ChevronLeft size={20} strokeWidth={1} />}
        </button>
      </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl mb-2" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
              Trade Promotion Intelligence
            </h1>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Active Schemes', value: portfolioMetrics.activeSchemes, total: portfolioMetrics.totalSchemes, icon: Activity },
              { label: 'Total Investment', value: portfolioMetrics.totalInvestment, subtitle: 'Projected ROI', subtitleValue: portfolioMetrics.projectedROI, icon: TrendingUp },
              { label: 'Avg Leakage', value: portfolioMetrics.averageLeakage, status: 'warning', icon: AlertCircle },
              { label: 'Opportunities', value: portfolioMetrics.opportunities, subtitle: 'Potential Uplift', icon: Target }
            ].map((metric, idx) => (
              <div key={idx} className="p-6 border" style={{ backgroundColor: 'white', borderColor: '#E7DDCA' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wide" style={{ color: '#878B87' }}>{metric.label}</span>
                  <metric.icon className="w-4 h-4" style={{ color: '#85A383' }} />
                </div>
                <div className="text-2xl font-light mb-1" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                  {metric.value}
                  {metric.total && <span className="text-base ml-1" style={{ color: '#878B87' }}>/ {metric.total}</span>}
                </div>
                {metric.subtitle && (
                  <div className="flex items-center gap-2 text-xs" style={{ color: '#878B87' }}>
                    <span>{metric.subtitle}</span>
                    <span style={{ color: '#85A383' }}>{metric.subtitleValue}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scheme Health Distribution */}
          <div className="mb-8 p-6 border" style={{ backgroundColor: 'white', borderColor: '#E7DDCA' }}>
            <h3 className="text-lg mb-4" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
              Portfolio Health Distribution
            </h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="h-12 flex">
                  {schemeHealthDistribution.map((segment, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center text-xs text-white"
                      style={{
                        width: `${segment.percentage}%`,
                        backgroundColor: segment.color
                      }}
                    >
                      {segment.percentage}%
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-6">
                {schemeHealthDistribution.map((segment, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-3 h-3" style={{ backgroundColor: segment.color }} />
                    <div className="text-xs">
                      <div style={{ color: '#0C2C18' }}>{segment.status}</div>
                      <div style={{ color: '#878B87' }}>{segment.count} schemes</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Issues */}
          <div className="mb-8 p-6 border" style={{ backgroundColor: 'white', borderColor: '#E7DDCA' }}>
            <h3 className="text-lg mb-4" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
              Critical Attention Required
            </h3>
            <div className="space-y-3">
              {topIssues.map((issue, idx) => (
                <div key={idx} className="p-4 border-l-4" style={{ 
                  backgroundColor: '#FAFAF8',
                  borderColor: issue.severity === 'critical' ? '#DF7649' : issue.severity === 'high' ? '#D4AF37' : '#85A383'
                }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: '#0C2C18' }}>{issue.title}</span>
                    <span className="text-sm" style={{ color: '#DF7649' }}>{issue.impact}</span>
                  </div>
                  <div className="text-xs" style={{ color: '#878B87' }}>
                    {issue.schemes} schemes affected
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decisions List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                AI-Generated Recommendations
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('portfolio')}
                  className={`px-4 py-2 text-sm transition-colors ${viewMode === 'portfolio' ? '' : 'hover:opacity-70'}`}
                  style={{
                    backgroundColor: viewMode === 'portfolio' ? '#85A383' : 'transparent',
                    color: viewMode === 'portfolio' ? 'white' : '#878B87',
                    border: viewMode === 'portfolio' ? 'none' : '1px solid #E7DDCA'
                  }}
                >
                  Portfolio View
                </button>
                <button
                  onClick={() => setViewMode('scheme')}
                  className={`px-4 py-2 text-sm transition-colors ${viewMode === 'scheme' ? '' : 'hover:opacity-70'}`}
                  style={{
                    backgroundColor: viewMode === 'scheme' ? '#85A383' : 'transparent',
                    color: viewMode === 'scheme' ? 'white' : '#878B87',
                    border: viewMode === 'scheme' ? 'none' : '1px solid #E7DDCA'
                  }}
                >
                  By Scheme
                </button>
              </div>
            </div>

            {decisions.map((decision) => (
              <div key={decision.id} className="border" style={{ backgroundColor: 'white', borderColor: '#E7DDCA' }}>
                {/* Decision Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-opacity-50 transition-colors"
                  onClick={() => setExpandedScheme(expandedScheme === decision.id ? null : decision.id)}
                  style={{ backgroundColor: expandedScheme === decision.id ? '#F5F1E8' : 'white' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs px-2 py-1" style={{ 
                          backgroundColor: getPriorityColor(decision.priority),
                          color: 'white'
                        }}>
                          {decision.priority.toUpperCase()}
                        </span>
                        <span className="text-xs" style={{ color: '#878B87' }}>{decision.id}</span>
                        <span className="text-xs px-2 py-1 rounded" style={{ 
                          backgroundColor: getStatusColor(decision.status),
                          color: 'white'
                        }}>
                          {decision.status}
                        </span>
                      </div>
                      <h4 className="text-xl mb-2" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                        {decision.headline}
                      </h4>
                      <div className="flex items-center gap-4 text-sm" style={{ color: '#878B87' }}>
                        <span>{decision.scheme}</span>
                        <span>•</span>
                        <span>{decision.product}</span>
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform ${expandedScheme === decision.id ? 'rotate-180' : ''}`}
                      style={{ color: '#878B87' }}
                    />
                  </div>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-3" style={{ backgroundColor: '#FAFAF8' }}>
                      <div className="text-xs mb-1" style={{ color: '#878B87' }}>Opportunity</div>
                      <div className="text-lg font-light" style={{ color: decision.status === 'critical' ? '#DF7649' : '#0C2C18' }}>
                        {decision.opportunity}
                      </div>
                    </div>
                    <div className="p-3" style={{ backgroundColor: '#FAFAF8' }}>
                      <div className="text-xs mb-1" style={{ color: '#878B87' }}>ROI Impact</div>
                      <div className="text-lg font-light" style={{ color: decision.roiImprovement.startsWith('-') ? '#DF7649' : '#85A383' }}>
                        {decision.roiImprovement}
                      </div>
                    </div>
                    <div className="p-3" style={{ backgroundColor: '#FAFAF8' }}>
                      <div className="text-xs mb-1" style={{ color: '#878B87' }}>Coverage</div>
                      <div className="text-lg font-light" style={{ color: '#0C2C18' }}>
                        {decision.coverage.current}% → {decision.coverage.target}%
                      </div>
                    </div>
                    <div className="p-3" style={{ backgroundColor: '#FAFAF8' }}>
                      <div className="text-xs mb-1" style={{ color: '#878B87' }}>Timeline</div>
                      <div className="text-sm" style={{ color: '#0C2C18' }}>
                        {decision.timeframe}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedScheme === decision.id && (
                  <div className="border-t" style={{ borderColor: '#E7DDCA' }}>
                    {/* Tabs */}
                    <div className="flex gap-1 px-6 pt-6" style={{ borderBottom: '1px solid #E7DDCA' }}>
                      {['overview', 'analysis', 'scenarios'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-2 text-sm transition-colors ${activeTab === tab ? 'border-b-2' : ''}`}
                          style={{
                            color: activeTab === tab ? '#0C2C18' : '#878B87',
                            borderColor: activeTab === tab ? '#85A383' : 'transparent'
                          }}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>

                    <div className="p-6">
                      {/* Overview Tab */}
                      {activeTab === 'overview' && (
                        <div className="space-y-6">
                          {/* Scheme Details */}
                          <div>
                            <h5 className="text-sm font-medium mb-3" style={{ color: '#0C2C18' }}>Scheme Structure</h5>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4" style={{ backgroundColor: '#FAFAF8' }}>
                                <div className="text-xs mb-1" style={{ color: '#878B87' }}>Type</div>
                                <div className="text-sm" style={{ color: '#0C2C18' }}>{decision.schemeDetails.type}</div>
                              </div>
                              <div className="p-4" style={{ backgroundColor: '#FAFAF8' }}>
                                <div className="text-xs mb-1" style={{ color: '#878B87' }}>Duration</div>
                                <div className="text-sm" style={{ color: '#0C2C18' }}>{decision.schemeDetails.duration}</div>
                              </div>
                              <div className="p-4 col-span-2" style={{ backgroundColor: '#FAFAF8' }}>
                                <div className="text-xs mb-1" style={{ color: '#878B87' }}>Structure</div>
                                <div className="text-sm" style={{ color: '#0C2C18' }}>{decision.schemeDetails.structure}</div>
                              </div>
                              <div className="p-4" style={{ backgroundColor: '#FAFAF8' }}>
                                <div className="text-xs mb-1" style={{ color: '#878B87' }}>Eligible Stores</div>
                                <div className="text-sm" style={{ color: '#0C2C18' }}>{decision.schemeDetails.eligibility}</div>
                              </div>
                              <div className="p-4" style={{ backgroundColor: '#FAFAF8' }}>
                                <div className="text-xs mb-1" style={{ color: '#878B87' }}>Current Coverage</div>
                                <div className="text-sm" style={{ color: '#0C2C18' }}>{decision.schemeDetails.currentCoverage}</div>
                              </div>
                            </div>
                          </div>

                          {/* Key Performance Indicators */}
                          <div>
                            <h5 className="text-sm font-medium mb-3" style={{ color: '#0C2C18' }}>Performance Metrics</h5>
                            <div className="grid grid-cols-4 gap-4">
                              {Object.entries(decision.kpis).map(([key, data]) => (
                                <div key={key} className="p-4" style={{ backgroundColor: '#FAFAF8' }}>
                                  <div className="text-xs mb-2 uppercase" style={{ color: '#878B87' }}>{key}</div>
                                  <div className="text-lg font-light mb-1" style={{ color: '#0C2C18' }}>{data.current}</div>
                                  {data.vsLY && (
                                    <div className="flex gap-2 text-xs">
                                      <span style={{ color: '#85A383' }}>vs LY: {data.vsLY}</span>
                                      {data.vsL3M && <span style={{ color: '#878B87' }}>L3M: {data.vsL3M}</span>}
                                    </div>
                                  )}
                                  {data.calculation && (
                                    <div className="text-xs mt-2 p-2 rounded" style={{ backgroundColor: 'white', color: '#878B87' }}>
                                      {data.calculation}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Channel Performance */}
                          {decision.channelPerformance && (
                            <div>
                              <h5 className="text-sm font-medium mb-3" style={{ color: '#0C2C18' }}>Channel Performance</h5>
                              <div className="space-y-2">
                                {decision.channelPerformance.map((channel, idx) => (
                                  <div key={idx} className="p-4 flex items-center justify-between" style={{ backgroundColor: '#FAFAF8' }}>
                                    <div className="flex items-center gap-6 flex-1">
                                      <div className="w-24">
                                        <div className="text-sm font-medium" style={{ color: '#0C2C18' }}>{channel.name}</div>
                                        <div className="text-xs" style={{ color: '#878B87' }}>Distribution: {channel.dist}</div>
                                      </div>
                                      <div className="flex-1 grid grid-cols-3 gap-4">
                                        <div>
                                          <div className="text-xs" style={{ color: '#878B87' }}>Volume</div>
                                          <div className="text-sm" style={{ color: '#0C2C18' }}>{channel.volume}</div>
                                        </div>
                                        <div>
                                          <div className="text-xs" style={{ color: '#878B87' }}>Revenue</div>
                                          <div className="text-sm" style={{ color: '#0C2C18' }}>{channel.revenue}</div>
                                        </div>
                                        <div>
                                          <div className="text-xs" style={{ color: '#878B87' }}>Growth</div>
                                          <div className="text-sm flex items-center gap-1" style={{ 
                                            color: channel.growth > 0 ? '#85A383' : '#DF7649' 
                                          }}>
                                            {channel.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                            {channel.growth > 0 ? '+' : ''}{channel.growth}%
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full" style={{ 
                                      backgroundColor: channel.status === 'strong' ? '#85A383' : channel.status === 'moderate' ? '#D4AF37' : '#DF7649'
                                    }} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Regional Performance */}
                          {decision.regionalPerformance && (
                            <div>
                              <h5 className="text-sm font-medium mb-3" style={{ color: '#0C2C18' }}>Regional Performance</h5>
                              <div className="space-y-2">
                                {decision.regionalPerformance.map((region, idx) => (
                                  <div key={idx} className="p-4" style={{ backgroundColor: '#FAFAF8' }}>
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-4">
                                        <div className="text-sm font-medium" style={{ color: '#0C2C18' }}>{region.name}</div>
                                        <div className="text-xs" style={{ color: '#878B87' }}>{region.sales}</div>
                                        <div className="text-xs flex items-center gap-1" style={{ 
                                          color: region.growth > 0 ? '#85A383' : '#DF7649' 
                                        }}>
                                          {region.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                          {region.growth > 0 ? '+' : ''}{region.growth}%
                                        </div>
                                      </div>
                                      <div className="w-2 h-2 rounded-full" style={{ 
                                        backgroundColor: region.status === 'strong' ? '#85A383' : region.status === 'moderate' ? '#D4AF37' : '#DF7649'
                                      }} />
                                    </div>
                                    <div className="flex items-center gap-4 text-xs" style={{ color: '#878B87' }}>
                                      <span>Market Share: {region.share}</span>
                                      <span>•</span>
                                      <span>Top Competitor: {region.competitor}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Strategic Insights */}
                          <div>
                            <h5 className="text-sm font-medium mb-3" style={{ color: '#0C2C18' }}>Strategic Insights</h5>
                            <div className="space-y-4">
                              <div className="p-4" style={{ backgroundColor: '#F5F1E8' }}>
                                <div className="text-xs mb-2 uppercase" style={{ color: '#878B87' }}>Opportunity</div>
                                <p className="text-sm leading-relaxed" style={{ color: '#0C2C18' }}>
                                  {decision.insights.opportunity}
                                </p>
                              </div>
                              <div className="p-4" style={{ backgroundColor: '#FAFAF8' }}>
                                <div className="text-xs mb-2 uppercase" style={{ color: '#878B87' }}>Key Constraints</div>
                                <ul className="space-y-1">
                                  {decision.insights.constraints.map((constraint, idx) => (
                                    <li key={idx} className="text-sm flex items-start gap-2" style={{ color: '#0C2C18' }}>
                                      <span style={{ color: '#DF7649' }}>•</span>
                                      {constraint}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="p-4" style={{ backgroundColor: '#F5F1E8' }}>
                                <div className="text-xs mb-2 uppercase" style={{ color: '#878B87' }}>Recommendation</div>
                                <p className="text-sm leading-relaxed" style={{ color: '#0C2C18' }}>
                                  {decision.insights.recommendation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Analysis Tab */}
                      {activeTab === 'analysis' && (
                        <div className="space-y-6">
                          {/* Root Cause Analysis */}
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h5 className="text-sm font-medium" style={{ color: '#0C2C18' }}>Root Cause Analysis</h5>
                              <button
                                onClick={() => setShowTrail(decision.id)}
                                className="flex items-center gap-2 px-3 py-1 text-xs hover:opacity-70 transition-opacity"
                                style={{ backgroundColor: '#0C2C18', color: '#85A383' }}
                              >
                                <Activity className="w-3 h-3" />
                                View AI Decision Trail
                              </button>
                            </div>
                            <div className="space-y-3">
                              {decision.rcaFactors.map((factor, idx) => (
                                <div key={idx} className="p-4 border-l-4" style={{ 
                                  backgroundColor: '#FAFAF8',
                                  borderColor: factor.score >= 85 ? '#DF7649' : factor.score >= 75 ? '#D4AF37' : '#85A383'
                                }}>
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#E7DDCA', color: '#0C2C18' }}>
                                          {factor.category}
                                        </span>
                                        <span className="text-xs" style={{ color: '#878B87' }}>Weight: {factor.weight}%</span>
                                      </div>
                                      <div className="text-sm font-medium mb-2" style={{ color: '#0C2C18' }}>
                                        {factor.factor}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-lg font-light" style={{ 
                                        color: factor.score >= 85 ? '#DF7649' : factor.score >= 75 ? '#D4AF37' : '#85A383'
                                      }}>
                                        {factor.score}
                                      </div>
                                      <div className="text-xs" style={{ color: '#878B87' }}>Confidence</div>
                                    </div>
                                  </div>
                                  <p className="text-sm leading-relaxed" style={{ color: '#1B2A21' }}>
                                    {factor.evidence}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Scenarios Tab */}
                      {activeTab === 'scenarios' && (
                        <div className="space-y-4">
                          <h5 className="text-sm font-medium" style={{ color: '#0C2C18' }}>
                            What-If Scenarios & Impact Analysis
                          </h5>
                          {decision.scenarios.map((scenario, idx) => (
                            <div key={idx} className="p-5 border-l-4" style={{ 
                              backgroundColor: '#FAFAF8',
                              borderColor: '#85A383'
                            }}>
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="text-sm font-medium mb-2" style={{ color: '#0C2C18' }}>
                                    {scenario.action}
                                  </div>
                                  <div className="text-xs" style={{ color: '#878B87' }}>
                                    {scenario.details}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xl font-light" style={{ 
                                    color: scenario.impact.includes('saved') || scenario.impact.includes('gain') ? '#85A383' : 
                                           scenario.impact.includes('loss') ? '#DF7649' : '#0C2C18'
                                  }}>
                                    {scenario.impact}
                                  </div>
                                </div>
                              </div>
                              <div className="p-3 mt-3 rounded text-sm leading-relaxed" style={{ 
                                backgroundColor: 'white',
                                color: '#1B2A21'
                              }}>
                                {scenario.breakdown}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Decision Trail Modal */}
      {showTrail && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-8 z-50">
          <div className="bg-white max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl mb-2" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                    AI Decision Trail
                  </h3>
                  <p className="text-sm" style={{ color: '#878B87' }}>
                    Multi-agent system analysis with database queries and reasoning
                  </p>
                </div>
                <button onClick={() => setShowTrail(null)} className="p-2 hover:opacity-70" style={{ color: '#878B87' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              <div className="space-y-1">
                {decisions.find(d => d.id === showTrail)?.trail.map((step, idx) => {
                  const AgentIcon = getAgentIcon(step.agentType);
                  const isExpanded = expandedTrailStep === idx;
                  
                  return (
                    <div key={idx}>
                      <div 
                        className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setExpandedTrailStep(isExpanded ? null : idx)}
                        style={{ backgroundColor: isExpanded ? '#F5F1E8' : 'white', border: '1px solid #E7DDCA' }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0C2C18' }}>
                              <AgentIcon size={18} strokeWidth={1.5} style={{ color: '#85A383' }} />
                            </div>
                            {idx < decisions.find(d => d.id === showTrail).trail.length - 1 && (
                              <div className="w-px h-full mt-2" style={{ backgroundColor: '#E7DDCA', minHeight: '20px' }} />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xs" style={{ fontFamily: 'monospace', color: '#878B87' }}>{step.time}</span>
                              <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#0C2C18', color: '#85A383' }}>
                                {step.agent}
                              </span>
                              {step.database && (
                                <span className="text-xs px-2 py-1 rounded flex items-center gap-1" style={{ backgroundColor: '#E0F2FE', color: '#075985' }}>
                                  <Database size={12} />
                                  {step.database}
                                </span>
                              )}
                            </div>
                            
                            <div className="text-sm font-medium mb-2" style={{ color: '#0C2C18' }}>
                              {step.action}
                            </div>
                            
                            <p className="text-sm leading-relaxed" style={{ color: '#1B2A21' }}>
                              {step.thinking}
                            </p>

                            {isExpanded && (
                              <div className="mt-4 space-y-3">
                                {step.query && (
                                  <div className="p-3 rounded" style={{ backgroundColor: '#0C2C18' }}>
                                    <div className="text-xs mb-2" style={{ color: '#85A383' }}>Database Query</div>
                                    <pre className="text-xs overflow-x-auto" style={{ fontFamily: 'monospace', color: '#E7DDCA' }}>
                                      {step.query}
                                    </pre>
                                  </div>
                                )}
                                
                                {step.findings && (
                                  <div className="p-3 rounded border border-gray-200">
                                    <div className="text-xs mb-2" style={{ color: '#878B87' }}>Key Findings</div>
                                    <p className="text-sm leading-relaxed" style={{ color: '#0C2C18' }}>{step.findings}</p>
                                  </div>
                                )}

                                {step.nextAction && (
                                  <div className="flex items-center gap-2 text-xs" style={{ color: '#85A383' }}>
                                    <ArrowRight size={14} />
                                    <span>Next: {step.nextAction}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <ChevronDown 
                            className={`w-4 h-4 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} 
                            style={{ color: '#878B87' }} 
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {chatOpen && (
        <div className="fixed bottom-0 right-8 w-96 bg-white border-l border-t border-gray-200 shadow-2xl flex flex-col" style={{ height: '600px' }}>
          <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#0C2C18' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" style={{ color: '#85A383' }} />
                <span className="text-sm font-medium" style={{ color: '#E7DDCA' }}>Intelligence Assistant</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-1 hover:opacity-70" style={{ color: '#878B87' }}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ backgroundColor: '#FAFAF8' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-4 ${msg.type === 'user' ? 'bg-white' : ''}`}
                  style={msg.type === 'assistant' ? { backgroundColor: '#F3F4F1' } : { border: '1px solid #E7DDCA' }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: '#1B2A21' }}>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2 text-sm border border-gray-200 focus:outline-none focus:border-gray-400"
                style={{ color: '#0C2C18' }}
              />
              <button 
                onClick={handleSend}
                className="px-4 py-2 hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#85A383', color: 'white' }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradePromoIntelligence;

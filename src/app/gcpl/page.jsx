"use client";
import React, { useState } from 'react';
import { Target, ShoppingBag, Activity, Sparkles, ChevronRight, Send, X, Info, Camera } from 'lucide-react';
import Link from 'next/link';

const MorriePlatform = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showTrail, setShowTrail] = useState(null);
  const [chatOpen, setChatOpen] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showFormula, setShowFormula] = useState(null);
  const [selectedTab, setSelectedTab] = useState('tsd');
  const decisions = [
    {
      id: 'DEC-001',
      schemeId: 'SCH-001',
      name: 'Monsoon Shield Buy-More-Get-More',
      product: 'Good Knight Gold Flash Liquid Vaporizer 45ml, 60ml',
      priority: 'HIGH OPPORTUNITY',
      recommendation: 'Optimize Tier Slabs & Extend to Remaining SMT/GT Stores',
      schemeDetails: {
        type: 'Volume-Based Buy-More-Get-More Scheme',
        structure: 'Buy 30 pieces → Get 3 free | Buy 60 pieces → Get 7 free | Buy 90 pieces → Get 12 free',
        duration: '3-month monsoon season (Jun-Aug)',
        eligibility: 'SMT stores (4,200 eligible), GT stores (9,800 eligible), Chemists (1,800 eligible)',
        currentCoverage: '2,800 SMT stores active (67%) | 5,400 GT stores active (55%) | 1,100 Chemists active (61%)'
      },
      impact: '₹12.4L incremental net profit opportunity over 3-month monsoon season',
      confidence: '89%',
      metrics: {
        'Current Coverage': '9,300 stores (59%)',
        'Scheme ROI': '21.2%',
        'Leakage': '9%',
        'Avg Volume Lift': '+34% vs baseline'
      },
      kpis: {
        distribution: { current: '59%', vsLY: '+12pp', vsL3M: '+8pp', target: '78%' },
        volume: { current: '6.2L units', vsLY: '+28%', vsL3M: '+19%', incremental: '+34%' },
        value: { current: '₹52.7L', vsLY: '+31%', vsL3M: '+22%', incremental: '₹12.38L' },
        roi: { calculation: '(₹12.38L incremental margin - ₹10.21L scheme cost) / ₹10.21L × 100', result: '21.2%' }
      },
      channels: {
        smt: { dist: '67%', volume: '3.1L units', revenue: '₹26.4L', growth: '+38%', status: 'healthy' },
        gt: { dist: '55%', volume: '2.6L units', revenue: '₹22.1L', growth: '+24%', status: 'warning' },
        chemist: { dist: '61%', volume: '0.5L units', revenue: '₹4.2L', growth: '+18%', status: 'warning' }
      },
      regions: {
        north: { sales: '₹6.3L', growth: '-4%', share: '14.2%', competitor: 'Mortein: 28.4% (Nielsen, Oct 2024)', status: 'critical' },
        south: { sales: '₹21.1L', growth: '+32%', share: '31.6%', competitor: 'Mortein: 24.8% (Nielsen, Oct 2024)', status: 'healthy' },
        east: { sales: '₹15.8L', growth: '+18%', share: '26.4%', competitor: 'Mortein: 26.2% (Nielsen, Oct 2024)', status: 'healthy' },
        west: { sales: '₹9.5L', growth: '+14%', share: '19.8%', competitor: 'All Out: 22.6% (Nielsen, Oct 2024)', status: 'warning' }
      },
      merchandising: {
        total_stores: 9300,
        planogram_uploaded: 6800,
        compliance_verified: 5600,
        pending_verification: 3700,
        compliance_rate: '82%'
      },
      why: 'Monsoon season (Jun-Aug) drives 48% of annual mosquito repellent liquid vaporizer sales. Current scheme covers only 59% of eligible universe with strong 21.2% ROI. Analysis shows 1,400 SMT stores, 4,400 GT stores, and 700 chemists remain untapped despite proven scheme economics. Field data indicates 72% of non-participating stores cite "not contacted" or "unaware of scheme" as primary reason. Tier slab analysis reveals 68% of retailers purchasing at Tier 1 (Buy 30) could economically move to Tier 2 (Buy 60) with minor inventory financing support. Window closes Aug 31 - expanding coverage now captures ₹12.4L net incremental profit over remaining season.',
      rcaFactors: [
        { 
          category: 'People Efficiency',
          factor: 'Sales Force Bandwidth & Coverage Gaps', 
          weight: 38,
          score: 84,
          evidence: 'Field reports show 72% of non-participating stores cite "not contacted" or "unaware". Each TSI covers avg 240 stores vs optimal 160. Scheme activation requires 35-min retailer meeting for enrollment. South region (32% growth) has 1 TSI per 150 stores vs North (-4% growth) with 1 per 290 stores.'
        },
        { 
          category: 'Competition Activity',
          factor: 'Regional Competitive Pressure (Nielsen Data)', 
          weight: 22,
          score: 81,
          evidence: 'North declining at -4% with Mortein commanding 28.4% share (Nielsen Oct 2024). South performing exceptionally (+32%) with stronger Good Knight presence (31.6%). West faces All Out pressure (22.6%). Note: Nielsen data is 2-3 months lagged, actual competitive activity may have evolved. Scheme intensity critical during peak monsoon.'
        },
        { 
          category: 'Scheme Design',
          factor: 'Tier Slab Optimization Opportunity', 
          weight: 26,
          score: 77,
          evidence: 'Tier analysis shows 68% of retailers purchasing at Tier 1 (30 pieces, 10% discount) have inventory capacity and sales velocity to reach Tier 2 (60 pieces, 11.7% discount). Current gap between tiers suboptimal - recommended tier spacing should be 36-48-72 pieces instead of 30-60-90 for better progression and reduced jump.'
        },
        {
          category: 'Stock Outs',
          factor: 'Distributor Stock Availability Issues',
          weight: 14,
          score: 71,
          evidence: 'DMS data shows 16% of enrolled retailers experienced stock-outs during scheme period, preventing full tier achievement. North region worst at 22% stock-out rate vs South at 11%. Distributor inventory planning not aligned with monsoon demand spike. Average stock-out duration: 5-7 days during peak weeks of July.'
        }
      ],
      whatIfs: [
        {
          question: 'What if we optimize tier slabs to 36-48-72 pieces?',
          projections: { tierMigration: '52% move up', extraValue: '₹4.12L', investment: '₹2.84L', roi: '21.2%→26.8%', timeline: 'Immediate' },
          breakdown: 'Reducing tier gaps encourages 52% of Tier 1 retailers (1,612 stores) to move to Tier 2. Average incremental purchase: 18 units × ₹68 margin × 2.5 months = ₹4.12L gross - ₹2.84L extra scheme cost = ₹1.28L net gain'
        },
        {
          question: 'What if we extend to remaining 6,500 uncovered stores immediately?',
          projections: { extraCoverage: '59%→91%', extraValue: '₹24.8L', investment: '₹18.6L', roi: '33.3%', timeline: '4 weeks' },
          breakdown: '3,900 additional stores (assumed 60% uptake rate) × avg 92 units/month × ₹68 margin × 2 months remaining = ₹38.2L gross - ₹18.6L investment = ₹19.6L net profit over remaining season'
        },
        {
          question: 'What if we add distributor stock financing support?',
          projections: { stockOutReduction: '16%→5%', uptake: '+14pp', roi: '21.2%→27.6%', cost: '₹540K interest', timeline: '2 weeks' },
          breakdown: 'Working capital loan facility for distributors (₹540K interest cost over 3 months) reduces stock-outs from 16% to 5%. Enables 1,240 additional retailers to participate fully, generating ₹5.04L incremental margin minus ₹540K cost = ₹4.50L net gain'
        }
      ],
      trail: [
        { time: '08:14:22', agent: 'Orchestrator', action: 'Initiated Monsoon Season Review', thinking: 'Q2 scheme performance analysis triggered. Monsoon season (Jun-Aug) contributes 48% of annual liquid vaporizer sales. Reviewing all active Good Knight schemes for optimization opportunities.' },
        { time: '08:14:26', agent: 'Performance Agent', action: 'Query Sales & Coverage Data', thinking: 'Retrieved 9-week sales data for 9,300 scheme-enrolled stores vs 6,500 non-enrolled stores. Calculating coverage rates, volume lifts, and channel-wise performance metrics for Good Knight Gold Flash.' },
        { time: '08:14:33', agent: 'Performance Agent', action: 'Analyze Scheme Impact', thinking: 'Enrolled stores: avg 168 units/month (stddev: 32). Non-enrolled: avg 112 units/month (stddev: 24). Lift: +34.1% (p<0.01). Current ROI: 21.2%. Field data shows 72% of non-enrolled cite "not contacted".' },
        { time: '08:14:42', agent: 'Merchandising Analytics', action: 'Review Planogram Compliance', thinking: 'Image analytics on 6,800 uploaded photos. Compliance verified: 5,600 stores (82%). Pending verification: 3,700 stores missing photo uploads. Non-compliance patterns: wrong shelf position (14%), incomplete display (10%), damaged materials (6%).' },
        { time: '08:14:54', agent: 'Financial Modeling', action: 'Calculate Tier Economics', thinking: 'Tier 1 (Buy 30): 68% of retailers, 10% effective discount. Tier 2 (Buy 60): 24% of retailers, 11.7% discount. Tier 3 (Buy 90): 8% of retailers, 13.3% discount. Gap between T1-T2 could be optimized - modeling 36-48-72 tier structure shows 52% migration potential.' },
        { time: '08:15:08', agent: 'RCA Engine', action: 'Root Cause Analysis', thinking: 'Primary constraints: (1) TSI bandwidth - North has 1:290 ratio vs South 1:150. (2) Stock-outs at 16% overall, 22% in North. (3) Tier slab gaps could be better optimized. (4) Nielsen data (Oct 2024) shows Mortein at 28.4% in North vs 24.8% in South where we lead.' },
        { time: '08:15:22', agent: 'Recommendation Agent', action: 'Synthesize Opportunities', thinking: 'Three opportunities identified: (1) Optimize tier slabs for better progression (₹4.12L gain), (2) Expand to 6,500 uncovered stores (₹19.6L gain), (3) Add distributor financing (₹4.50L gain). Total potential: ₹28.2L. Confidence: 89% given monsoon seasonality and proven economics.' }
      ]
    },
    {
      id: 'DEC-002',
      schemeId: 'SCH-002',
      name: 'Volume Accelerator Tier Scheme',
      product: 'Cinthol Original Soap 100g, 125g',
      priority: 'CRITICAL',
      recommendation: 'Restructure Tier Slabs & Implement Leakage Controls',
      schemeDetails: {
        type: 'Retailer Volume-Based Tier Discount Scheme',
        structure: 'Buy 48 pieces → 2.5% off | Buy 80 pieces → 4.5% off | Buy 120 pieces → 6.5% off',
        duration: 'Monthly rolling (evaluated monthly)',
        eligibility: 'All retail channels (SMT, GT, Chemist) with 3-month purchase history. Distributors act as conduit.',
        currentIssue: '28% leakage rate | 980 retailers (21% of scheme participants) gaming Tier 3 with forward buying | Stock buildup 2.8 months'
      },
      impact: '₹5.24L monthly savings from reduced leakage',
      confidence: '93%',
      metrics: {
        'Current Leakage': '28%',
        'Scheme ROI': '3.8%',
        'Forward Buying': '980 retailers (21%)',
        'Stock Buildup': '2.8 months avg'
      },
      kpis: {
        distribution: { current: '71%', vsLY: '+8pp', target: '78%' },
        volume: { current: '7.8L units', vsLY: '+11%', incremental: '+12%' },
        value: { current: '₹46.8L', vsLY: '+13%', incremental: '₹5.42L' },
        roi: { calculation: '(₹5.42L incremental margin - ₹5.22L scheme cost) / ₹5.22L × 100', result: '3.8% current | Target: 18-22%' }
      },
      channels: {
        smt: { dist: '74%', volume: '4.7L units', revenue: '₹28.2L', growth: '+14%', status: 'healthy' },
        gt: { dist: '69%', volume: '2.6L units', revenue: '₹15.6L', growth: '+9%', status: 'warning' },
        chemist: { dist: '68%', volume: '0.5L units', revenue: '₹3.0L', growth: '+6%', status: 'warning' }
      },
      regions: {
        north: { sales: '₹7.0L', growth: '-6%', share: '16.8%', competitor: 'Lifebuoy: 34.2% (Nielsen, Oct 2024)', status: 'critical' },
        south: { sales: '₹16.4L', growth: '+18%', share: '28.4%', competitor: 'Lifebuoy: 26.4% (Nielsen, Oct 2024)', status: 'healthy' },
        east: { sales: '₹11.7L', growth: '+8%', share: '21.6%', competitor: 'Lifebuoy: 30.8% (Nielsen, Oct 2024)', status: 'warning' },
        west: { sales: '₹11.7L', growth: '+12%', share: '24.2%', competitor: 'Dettol: 28.2% (Nielsen, Oct 2024)', status: 'healthy' }
      },
      pricePoints: {
        mrp_100g: '₹32',
        mrp_125g: '₹38',
        retailer_landing_100g: '₹25.60 (Tier 0) → ₹23.94 (Tier 3, 6.5% off)',
        retailer_landing_125g: '₹30.40 (Tier 0) → ₹28.42 (Tier 3, 6.5% off)',
        market_selling_price: '₹29-31 (100g) in high-competition zones vs ₹32 MRP'
      },
      why: 'This tiered volume scheme is bleeding value through excessive leakage (28%) and forward buying abuse. Analysis shows 980 large retailers (21% of participants) purchasing 3.4× their normal monthly volume at Tier 3 (120 pieces, 6.5% off) purely to capture maximum discount, then either reselling at heavily discounted rates (₹29-31 vs ₹32 MRP) in competitive zones or stockpiling for 2.8 months. Current ROI of 3.8% is far below healthy 18-22% benchmark. DMS tracking shows these 980 retailers order heavily in week 1 of scheme month, then orders drop 72% for next 6-8 weeks = classic forward buying pattern. Root cause: (1) Tier gaps too wide (48→80→120), encouraging jump to Tier 3, (2) No purchase frequency caps, (3) Inadequate sell-out verification, (4) Pricing pressure in North region where Lifebuoy dominates at 34.2% share (Nielsen Oct 2024 data) driving some retailers to sell Cinthol below MRP to compete.',
      rcaFactors: [
        { 
          category: 'Scheme Design',
          factor: 'Excessive Tier Gap Encouraging Tier 3 Gaming', 
          weight: 42,
          score: 96,
          evidence: 'Current tier structure (48-80-120 pieces) has 50% jump from T2 to T3, making it economically attractive for large retailers to stockpile. 980 retailers (21% of participants) ordered avg 408 pieces in scheme month vs their 120-piece baseline. Post-scheme, orders dropped 72% for 6-8 weeks = pure inventory digestion, not genuine demand.'
        },
        { 
          category: 'Distributor Issues',
          factor: 'Inadequate Sell-Out Verification at Retailer Level', 
          weight: 28,
          score: 91,
          evidence: 'Scheme design lacks sell-out proof requirement. Retailers receive tier discount on invoice regardless of actual retail sales. DMS shows 2.8 months avg stock buildup at retail level for Tier 3 participants vs 1.1 months for Tier 1. No mechanism to verify that purchased stock reached end consumers vs sitting in back room or being resold to other retailers.'
        },
        { 
          category: 'Stock Outs',
          factor: 'Stock-Out Rate Higher for Non-Gaming Retailers', 
          weight: 16,
          score: 74,
          evidence: 'Paradoxically, the 980 gaming retailers maintain 96% in-stock (due to overstocking) while regular Tier 1-2 retailers face 24% stock-out rate. Gaming retailers corner distributor inventory during scheme week 1, leaving others under-served. Distributor prioritizes large orders over balanced distribution.'
        },
        {
          category: 'Competition Activity',
          factor: 'Competitive Pricing Pressure Enabling Reselling (Nielsen Data)',
          weight: 14,
          score: 86,
          evidence: 'Mystery shopping in North region shows some gaming retailers selling Cinthol 100g at ₹29-31 vs ₹32 MRP to match Lifebuoy pricing (Lifebuoy 34.2% share per Nielsen Oct 2024). These retailers using Tier 3 discount (6.5% off = ₹1.66 per unit) to fund price cuts, cannibalizing brand value. Note: Nielsen data 2-3 months lagged - actual competitive landscape may have evolved.'
        }
      ],
      whatIfs: [
        {
          question: 'What if we restructure tiers to 52-68-88 pieces with 3%/4.5%/6% discounts?',
          projections: { leakageReduction: '28%→9%', savings: '₹8.86L monthly', roiImprovement: '3.8%→20.4%', volumeImpact: '-14%', timeline: 'Next month' },
          breakdown: 'Narrower tier gaps + adjusted discount gradient discourages extreme forward buying while maintaining progression incentive. 720 of 980 gaming retailers revert to normal purchasing (68-88 piece range). Lost volume: -14% acceptable trade-off. Net savings: ₹8.86L from reduced leakage. ROI improves to healthy 20.4%.'
        },
        {
          question: 'What if we add sell-out verification (80% retail sale proof via DMS)?',
          projections: { leakageReduction: '28%→6%', savings: '₹10.26L monthly', roiImprovement: '3.8%→24.8%', complexity: 'High', timeline: '5 weeks DMS integration' },
          breakdown: 'Retailers must prove 80% of purchased stock sold to end consumers via DMS-tracked invoices before tier discount paid. Eliminates forward buying incentive entirely. Requires DMS upgrade to track retail-level sell-out. Best-in-class leakage performance. Implementation cost: ₹280K one-time + ₹95K/month ongoing.'
        },
        {
          question: 'What if we cap Tier 3 at 2 orders per retailer per quarter?',
          projections: { leakageReduction: '28%→13%', savings: '₹7.00L monthly', roiImprovement: '3.8%→18.6%', volumeImpact: '-10%', timeline: 'Immediate' },
          breakdown: 'Frequency cap prevents continuous gaming while allowing genuine high-velocity retailers 2 Tier 3 orders per quarter. Reduces forward buying by 54%. Quick implementation via DMS flag. Moderate savings with minimal volume loss. Market-standard control mechanism.'
        }
      ],
      trail: [
        { time: '10:28:41', agent: 'Orchestrator', action: 'Initiated Monthly Scheme Audit', thinking: 'SCH-002 flagged for ROI deterioration (3.8% vs 18-22% healthy range). Leakage alert at 28%. DMS showing abnormal purchase patterns for 21% of participating retailers in Cinthol soap scheme.' },
        { time: '10:28:45', agent: 'Scheme Analytics', action: 'Query DMS Purchase Patterns', thinking: 'Analyzed 3-month purchase history for 4,667 participating retailers across 3 tiers. Identified 980 outliers: 320-340% volume spike in scheme week 1, then 72% drop in weeks 2-8. Classic forward buying signature. Tier 3 concentration: 81% of scheme volume vs expected 38-42%.' },
        { time: '10:28:53', agent: 'Pricing Intelligence', action: 'Retrieve Market Price Points', thinking: 'Collected MRP data (₹32 for 100g, ₹38 for 125g) and scheme tier landing costs. Mystery shopping data shows 26% of retailers selling below MRP (₹29-31 range) in high-competition zones, particularly North region. Using scheme discount to fund price wars with Lifebuoy.' },
        { time: '10:29:02', agent: 'RCA Engine', action: 'Root Cause Diagnosis', thinking: 'Primary issue: Tier structure (48-80-120) creates 50% jump T2→T3, incentivizing stockpiling. Secondary: No sell-out verification allows scheme abuse. Tertiary: Stock-outs for normal retailers (24%) while gaming retailers oversupply. Regional data (Nielsen Oct 2024) shows North at -6% growth with Lifebuoy 34.2% share driving pricing pressure.' },
        { time: '10:29:14', agent: 'Financial Modeling', action: 'Model Restructure Scenarios', thinking: 'Scenario 1: Tier optimization (52-68-88) saves ₹8.86L, ROI→20.4%. Scenario 2: Sell-out verification saves ₹10.26L, ROI→24.8% but requires DMS upgrade (₹280K + ₹95K/month). Scenario 3: Frequency cap saves ₹7.00L, ROI→18.6%, quick implementation. Recommendation: Combination of Scenario 1 + 3 for immediate impact.' }
      ]
    },
    {
      id: 'DEC-003',
      schemeId: 'SCH-003',
      name: 'Retailer Excellence Target Bonus',
      product: 'All Godrej Personal Care SKUs',
      priority: 'MEDIUM PRIORITY',
      recommendation: 'Recalibrate Targets +16% & Introduce Progressive Tiers',
      schemeDetails: {
        type: 'Performance-Based Target Achievement Scheme',
        structure: 'Retailers get quarterly bonus: 100-109% = ₹1,000 | 110-119% = ₹2,200 | 120%+ = ₹4,200',
        duration: 'Quarterly (Oct-Dec evaluation)',
        eligibility: '2,800 retailers across SMT (1,400), GT (1,100), Chemist (300) with 6-month baseline',
        currentPerformance: '62% uptake | 124% average achievement | 74% exceeding targets by 16%+'
      },
      impact: '₹1.68L quarterly efficiency gain',
      confidence: '88%',
      metrics: {
        'Scheme ROI': '30.2%',
        'Uptake': '62%',
        'Leakage': '5%',
        'Avg Achievement': '124% of target'
      },
      kpis: {
        distribution: { current: '84%', vsLY: '+18pp', target: '90%' },
        volume: { current: '11.2L units', vsLY: '+36%', incremental: '+38%' },
        value: { current: '₹89.6L', vsLY: '+39%', incremental: '₹25.48L' },
        roi: { calculation: '(₹25.48L incremental margin - ₹19.56L scheme cost) / ₹19.56L × 100', result: '30.2% current | 36.8% post-optimization' }
      },
      channels: {
        smt: { dist: '88%', volume: '7.3L units', revenue: '₹58.4L', growth: '+42%', status: 'healthy' },
        gt: { dist: '82%', volume: '3.4L units', revenue: '₹27.2L', growth: '+32%', status: 'healthy' },
        chemist: { dist: '76%', volume: '0.5L units', revenue: '₹4.0L', growth: '+24%', status: 'healthy' }
      },
      regions: {
        north: { sales: '₹5.4L', growth: '+2%', share: '14.8%', competitor: 'HUL: 42.6% (Nielsen, Oct 2024)', status: 'warning' },
        south: { sales: '₹26.9L', growth: '+34%', share: '32.4%', competitor: 'HUL: 36.8% (Nielsen, Oct 2024)', status: 'healthy' },
        east: { sales: '₹17.9L', growth: '+16%', share: '22.6%', competitor: 'HUL: 38.4% (Nielsen, Oct 2024)', status: 'healthy' },
        west: { sales: '₹22.4L', growth: '+22%', share: '26.2%', competitor: 'HUL: 35.2% (Nielsen, Oct 2024)', status: 'healthy' }
      },
      why: 'Strong performing scheme with 30.2% ROI and healthy 38% incremental volume lift across Godrej Personal Care portfolio. However, 74% of participating retailers are exceeding their targets by 16%+, with average achievement at 124% - this indicates targets set too conservatively. Current target-setting methodology uses 2023 baselines without adjusting for 2024 market growth, making bonuses easily achievable rather than aspirational. Recalibrating targets upward by 16% will focus payouts on genuinely exceptional performance while maintaining retailer motivation. Additionally, introducing progressive tiers (Bronze/Silver/Gold/Platinum) creates aspiration ladder and gamification, improving engagement by estimated 26% based on behavioral economics research.',
      rcaFactors: [
        { 
          category: 'People Efficiency',
          factor: 'Field Team Using Outdated Baseline Methodology', 
          weight: 44,
          score: 88,
          evidence: '74% of retailers exceeding targets by 16%+ signals systematic under-targeting. Investigation shows TSIs still using 2023 baselines for target-setting, not adjusted for 2024 market growth (+36% YoY). Field teams lack dynamic target calibration tools. Average achievement 124% vs optimal 106-113% range for aspirational but achievable targets.'
        },
        { 
          category: 'Distributor Issues',
          factor: 'Strong Distributor Support Enabling High Achievement', 
          weight: 19,
          score: 94,
          evidence: 'Distributors providing excellent stock availability (96% on-time delivery) + flexible credit terms (avg 20-day credit vs 14-day industry standard) enabling retailers to achieve targets easily. Strong distributor-retailer relationships reduce friction. While positive for business, contributes to high achievement rates that suggest room for target increase.'
        },
        { 
          category: 'Stock Outs',
          factor: 'Scheme Motivation Driving Better Inventory Discipline', 
          weight: 16,
          score: 93,
          evidence: 'Retailers enrolled in scheme maintain 93% in-stock rate vs 76% for non-scheme retailers. Target bonus creates strong motivation for inventory discipline and reorder planning. Stock-outs not limiting achievement - in fact, scheme retailers proactively managing inventory better than non-participants.'
        },
        {
          category: 'Competition Activity',
          factor: 'Regional Variations in Achievement Based on Competition (Nielsen Data)',
          weight: 21,
          score: 81,
          evidence: 'South region shows 96% average achievement (+34% growth) with competitive HUL at 36.8% (Nielsen Oct 2024). North shows 78% achievement (+2% growth) with dominant HUL (42.6%). Scheme effectiveness varies by competitive intensity. Note: Nielsen data 2-3 months lagged - using as directional hypothesis rather than current state.'
        }
      ],
      whatIfs: [
        {
          question: 'What if we increase baseline targets by 16% across all tiers?',
          projections: { achievers: '62%→51%', savings: '₹1.68L quarterly', roi: '30.2%→36.8%', motivation: 'Maintained', timeline: 'Q1 2026' },
          breakdown: 'Raising target baseline by 16% reduces qualifiers from 62% to 51% (still healthy participation), focusing payouts on true over-performers. Estimated 308 retailers drop out but remain motivated as target still within reach. Net quarterly savings: ₹1.68L. ROI improvement: +6.6pp to 36.8%.'
        },
        {
          question: 'What if we add Bronze/Silver/Gold/Platinum tier structure with progressive rewards?',
          projections: { engagement: '+26%', uptake: '69%', roi: '30.2%→41.4%', complexity: 'Medium', timeline: '7 weeks design' },
          breakdown: 'Bronze (100-110% = ₹800-1,200), Silver (110-120% = ₹1,800-2,600), Gold (120-130% = ₹3,200-4,600), Platinum (130%+ = ₹5,000-6,500) creates aspiration ladder. Behavioral economics research shows tiered gamification increases engagement 26%. Uptake rises to 69% as more retailers see achievable first tier. Design + communication: 7 weeks.'
        },
        {
          question: 'What if we regionalize targets based on competitive intensity?',
          projections: { fairness: '+High', north_participation: '+16pp', roi: '30.2%→34.6%', complexity: 'High', timeline: '5 weeks' },
          breakdown: 'North region (HUL 42.6% per Nielsen Oct 2024) gets 14% lower targets vs South (HUL 36.8%). Accounts for competitive pressure differences. Estimated 280 additional North retailers qualify, improving regional morale and engagement. Requires zone-wise target calibration and TSI training. Nielsen data directional given 2-3 month lag.'
        }
      ],
      trail: [
        { time: '13:42:18', agent: 'Orchestrator', action: 'Quarterly Scheme Review', thinking: 'Q4 scheme performance review for SCH-003. Scheme performing well (30.2% ROI, 38% incremental lift) but achievement rates unusually high (124% avg, 74% exceeding by 16%+). Investigating if targets optimally calibrated or if efficiency gains possible.' },
        { time: '13:42:22', agent: 'Performance Analytics', action: 'Analyze Achievement Distribution', thinking: 'Retrieved performance data for 2,800 enrolled retailers. Distribution analysis shows right-skew with 74% over-achievers. Median achievement: 121%. 90th percentile: 146%. Pattern suggests targets set too conservatively. Comparing to industry benchmarks (optimal 106-113% avg) indicates 14-18% recalibration opportunity.' },
        { time: '13:42:30', agent: 'Field Intelligence', action: 'Query Target-Setting Process', thinking: 'Interviewed 28 TSIs on target methodology. Finding: 89% still using 2023 baselines without 2024 growth adjustment. Market grew +36% YoY but targets only increased 10-14%. No dynamic quarterly recalibration. Field teams lack analytical tools for data-driven target setting. Systemic process issue identified.' },
        { time: '13:42:41', agent: 'Behavioral Analytics', action: 'Model Gamification Impact', thinking: 'Reviewed behavioral economics literature on tiered reward structures. Progressive tiers (Bronze/Silver/Gold/Platinum) with visible progression shown to increase engagement 20-32% (avg 26%). Creates aspiration ladder while maintaining accessibility. Modeling suggests uptake increase from 62% to 69% with proper tier design.' },
        { time: '13:42:52', agent: 'Regional Analysis', action: 'Compare Regional Performance', thinking: 'South: 96% achievement, +34% growth, HUL 36.8% (Nielsen Oct 2024). North: 78% achievement, +2% growth, HUL 42.6%. East: 88% achievement, +16% growth, HUL 38.4%. West: 91% achievement, +22% growth, HUL 35.2%. Clear correlation between competitive pressure and achievement. Note: Nielsen data 2-3 months lagged - treating as directional hypothesis.' }
      ]
    }
  ];

  const handleWhatIfClick = (decisionId, question) => {
    setMessages([
      { type: 'user', text: question },
      { type: 'ai', text: 'I can help you explore this scenario in depth. The analysis shows clear financial impact and implementation considerations. What specific aspect would you like to dive deeper into?' }
    ]);
    setChatOpen(decisionId);
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, 
        { type: 'user', text: input },
        { type: 'ai', text: 'Based on the data, this scenario requires careful consideration of timing, resources, and expected returns. Would you like me to run a detailed sensitivity analysis?' }
      ]);
      setInput('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r border-gray-300 flex flex-col">
        <div className="p-6 border-b border-gray-300">
          <h1 className="text-2xl font-light tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
            MORRIE
          </h1>
          <p className="text-xs mt-1 text-gray-500">Decision Intelligence</p>
        </div>

        <nav className="flex-1 p-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded mb-2 text-white" style={{ backgroundColor: '#0C2C18' }}>
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Trade Promotions</span>
          </button>
           <Link href={"/gcpl/product-launch"}>
           <button className="w-full flex items-center gap-3 px-4 py-3 rounded mb-2 text-gray-700" >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-medium">New Product Launch</span>
          </button></Link>
        </nav>


        <div className="p-4 text-xs border-t border-gray-300 text-gray-500">
          <div className="mb-1">GCPL Portfolio • Multi-Channel</div>
          <div>December 2025</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white sticky top-0 z-10 border-b border-gray-300">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-light mb-1" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                  Trade Scheme Decisions
                </h2>
                <p className="text-sm text-gray-600">AI-powered multivariate analysis of scheme performance, leakage, and ROI</p>
              </div>
              <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 space-y-6">
          {decisions.map((decision) => (
            <div key={decision.id} className="bg-white shadow-sm border-l-4" style={{ borderLeftColor: decision.priority === 'CRITICAL' ? '#F09674' : '#85A383' }}>
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 text-xs font-medium rounded" style={{ 
                        backgroundColor: '#F3F4F1',
                        color: decision.priority === 'CRITICAL' ? '#991b1b' : '#0C2C18',
                        border: `1px solid ${decision.priority === 'CRITICAL' ? '#F09674' : '#0C2C18'}`
                      }}>
                        {decision.priority}
                      </span>
                      <span className="text-xs text-gray-400">{decision.schemeId}</span>
                    </div>
                    <h3 className="text-xl mb-1 font-normal" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                      {decision.name}
                    </h3>
                    <p className="text-sm text-gray-500">{decision.product}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowTrail(decision.id)}
                      className="px-4 py-2 text-sm border border-gray-300 rounded flex items-center gap-2 hover:bg-gray-50"
                    >
                      <Activity className="w-4 h-4" />
                      Decision Trail
                    </button>
                    <button 
                      onClick={() => setChatOpen(decision.id)}
                      className="px-4 py-2 text-white text-sm rounded flex items-center gap-2 hover:opacity-90" 
                      style={{ backgroundColor: '#85A383' }}
                    >
                      <Sparkles className="w-4 h-4" />
                      Ask Morrie
                    </button>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {Object.entries(decision.metrics).map(([key, value]) => (
                    <div key={key} className="p-3 rounded" style={{ backgroundColor: '#FAFAF8' }}>
                      <div className="text-xs mb-1 uppercase tracking-wide text-gray-500">
                        {key}
                      </div>
                      <div className="text-sm font-medium" style={{ color: '#0C2C18' }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => setExpandedCard(expandedCard === decision.id ? null : decision.id)}
                  className="w-full py-2 text-sm flex items-center justify-center gap-2 border-t border-gray-200 text-gray-700 hover:text-gray-900"
                >
                  {expandedCard === decision.id ? 'Hide Full Analysis' : 'View Full Analysis & Recommendation'}
                  <ChevronRight className={`w-4 h-4 transition-transform ${expandedCard === decision.id ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Expanded Content */}
              {expandedCard === decision.id && (
                <div className="border-t border-gray-200">
                  {/* Recommendation Box */}
                  <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#FAFAF8' }}>
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#85A383' }} />
                      <div>
                        <h4 className="font-medium mb-1" style={{ color: '#0C2C18' }}>{decision.recommendation}</h4>
                        <p className="text-sm text-gray-700">
                          Total Impact: <span className="font-semibold" style={{ color: '#85A383' }}>{decision.impact}</span> • 
                          AI Confidence: <span className="font-semibold" style={{ color: '#0C2C18' }}>{decision.confidence}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scheme Details */}
                  {decision.schemeDetails && (
                    <div className="p-6 border-b border-gray-200">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Scheme Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Type</div>
                          <div className="text-sm font-medium" style={{ color: '#0C2C18' }}>{decision.schemeDetails.type}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Duration</div>
                          <div className="text-sm font-medium" style={{ color: '#0C2C18' }}>{decision.schemeDetails.duration}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs text-gray-500 mb-1">Structure</div>
                          <div className="text-sm font-medium" style={{ color: '#0C2C18' }}>{decision.schemeDetails.structure}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs text-gray-500 mb-1">Eligibility</div>
                          <div className="text-sm font-medium" style={{ color: '#0C2C18' }}>{decision.schemeDetails.eligibility}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs text-gray-500 mb-1">{decision.schemeDetails.currentCoverage ? 'Current Coverage' : decision.schemeDetails.currentIssue ? 'Current Issue' : 'Current Performance'}</div>
                          <div className="text-sm font-medium" style={{ color: '#0C2C18' }}>{decision.schemeDetails.currentCoverage || decision.schemeDetails.currentIssue || decision.schemeDetails.currentPerformance}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Merchandising Analytics */}
                  {decision.merchandising && (
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Camera className="w-4 h-4" style={{ color: '#85A383' }} />
                        <h4 className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#0C2C18' }}>Merchandising Compliance (Image Analytics)</h4>
                      </div>
                      <div className="grid grid-cols-5 gap-3">
                        <div className="p-3 bg-white border border-gray-200 rounded">
                          <div className="text-xs text-gray-500 mb-1">Total Enrolled</div>
                          <div className="text-lg font-semibold" style={{ color: '#0C2C18' }}>{decision.merchandising.total_stores}</div>
                        </div>
                        <div className="p-3 bg-white border border-gray-200 rounded">
                          <div className="text-xs text-gray-500 mb-1">Photos Uploaded</div>
                          <div className="text-lg font-semibold" style={{ color: '#0C2C18' }}>{decision.merchandising.planogram_uploaded}</div>
                        </div>
                        <div className="p-3 bg-white border border-gray-200 rounded">
                          <div className="text-xs text-gray-500 mb-1">AI Verified</div>
                          <div className="text-lg font-semibold" style={{ color: '#85A383' }}>{decision.merchandising.compliance_verified}</div>
                        </div>
                        <div className="p-3 bg-white border border-gray-200 rounded">
                          <div className="text-xs text-gray-500 mb-1">Pending Check</div>
                          <div className="text-lg font-semibold" style={{ color: '#D4A574' }}>{decision.merchandising.pending_verification}</div>
                        </div>
                        <div className="p-3 bg-white border border-gray-200 rounded">
                          <div className="text-xs text-gray-500 mb-1">Compliance Rate</div>
                          <div className="text-lg font-semibold" style={{ color: '#0C2C18' }}>{decision.merchandising.compliance_rate}</div>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                        <p className="text-xs text-blue-900"><span className="font-semibold">AI Capability:</span> Image analytics checks shelf position compliance, display completeness, and material condition. Non-compliance patterns: wrong position (14%), incomplete display (10%), damaged materials (6%).</p>
                      </div>
                    </div>
                  )}

                  {/* Price Points */}
                  {decision.pricePoints && (
                    <div className="p-6 border-b border-gray-200">
                      <h4 className="text-xs font-semibold mb-4 uppercase tracking-wide" style={{ color: '#0C2C18' }}>Price Point Tracking</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white border border-gray-200 rounded">
                          <div className="text-xs text-gray-500 mb-2">MRP & Landed Cost (100g)</div>
                          <div className="text-sm mb-1"><span className="font-semibold">MRP:</span> {decision.pricePoints.mrp_100g}</div>
                          <div className="text-sm"><span className="font-semibold">Retailer Landing:</span> {decision.pricePoints.retailer_landing_100g}</div>
                        </div>
                        <div className="p-3 bg-white border border-gray-200 rounded">
                          <div className="text-xs text-gray-500 mb-2">MRP & Landed Cost (125g)</div>
                          <div className="text-sm mb-1"><span className="font-semibold">MRP:</span> {decision.pricePoints.mrp_125g}</div>
                          <div className="text-sm"><span className="font-semibold">Retailer Landing:</span> {decision.pricePoints.retailer_landing_125g}</div>
                        </div>
                        <div className="col-span-2 p-3 bg-amber-50 border border-amber-200 rounded">
                          <div className="text-xs text-gray-500 mb-1">Market Selling Observation</div>
                          <div className="text-sm font-medium text-amber-900">{decision.pricePoints.market_selling_price}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Baseline KPIs */}
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="text-xs font-semibold mb-4 uppercase tracking-wide" style={{ color: '#0C2C18' }}>Baseline KPIs</h4>
                    <div className="grid grid-cols-4 gap-4">
                      {Object.entries(decision.kpis).map(([key, data]) => (
                        <div key={key} className="p-4 bg-white border border-gray-200 rounded relative">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-xs uppercase text-gray-500">{key}</div>
                            {key === 'roi' && (
                              <button 
                                onClick={() => setShowFormula(showFormula === key ? null : key)}
                                className="hover:opacity-70"
                              >
                                <Info className="w-3 h-3 text-gray-400" />
                              </button>
                            )}
                          </div>
                          {showFormula === key && (
                            <div className="absolute z-10 left-0 top-full mt-2 p-3 rounded shadow-lg bg-green-900 text-white" style={{ minWidth: '250px' }}>
                              <div className="text-xs font-semibold mb-1">Formula</div>
                              <div className="text-xs">{data.calculation}</div>
                            </div>
                          )}
                          <div className="text-2xl font-bold mb-1" style={{ color: '#0C2C18' }}>
                            {data.current || data.result}
                          </div>
                          {data.vsLY && (
                            <>
                              <div className="text-xs mb-1 text-gray-700">
                                vs LY: <span className="font-semibold text-green-600">{data.vsLY}</span>
                              </div>
                              <div className="text-xs text-gray-700">
                                vs L3M: <span className="font-semibold text-gray-600">{data.vsL3M}</span>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Channel Breakdown */}
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="text-xs font-semibold mb-4 uppercase tracking-wide" style={{ color: '#0C2C18' }}>Channel Performance</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(decision.channels).map(([channel, data]) => (
                        <div key={channel} className="p-3 bg-white border border-gray-200 rounded relative overflow-hidden">
                          <div 
                            className="absolute top-0 right-0 w-1 h-full"
                            style={{ 
                              backgroundColor: data.status === 'critical' ? '#F09674' : 
                                             data.status === 'warning' ? '#D4A574' : '#85A383'
                            }}
                          />
                          <div className="text-xs font-semibold uppercase mb-2" style={{ color: '#0C2C18' }}>
                            {channel}
                          </div>
                          <div className="text-sm mb-1 text-gray-700">
                            Dist: <span className="font-semibold">{data.dist}</span>
                          </div>
                          <div className="text-sm mb-1 text-gray-700">
                            Volume: <span className="font-semibold">{data.volume}</span>
                          </div>
                          <div className="text-sm mb-1 text-gray-700">
                            Revenue: <span className="font-semibold">{data.revenue}</span>
                          </div>
                          <div className="text-sm font-semibold" style={{ 
                            color: data.growth.startsWith('-') ? '#991b1b' : '#166534'
                          }}>
                            {data.growth}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regional Performance */}
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="text-xs font-semibold mb-4 uppercase tracking-wide" style={{ color: '#0C2C18' }}>Regional Performance vs Competition (Nielsen Data - Directional)</h4>
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      {Object.entries(decision.regions).map(([region, data]) => (
                        <div key={region} className="p-3 bg-white border border-gray-200 rounded relative overflow-hidden">
                          <div 
                            className="absolute top-0 right-0 w-1 h-full"
                            style={{ 
                              backgroundColor: data.status === 'critical' ? '#F09674' : 
                                             data.status === 'warning' ? '#D4A574' : '#85A383'
                            }}
                          />
                          <div className="text-xs font-semibold uppercase mb-2" style={{ color: '#0C2C18' }}>
                            {region}
                          </div>
                          <div className="text-sm mb-1 text-gray-700">
                            Sales: <span className="font-semibold">{data.sales}</span>
                          </div>
                          <div className="text-sm mb-1 font-semibold" style={{ 
                            color: data.growth.startsWith('-') ? '#991b1b' : '#166534'
                          }}>
                            {data.growth}
                          </div>
                          <div className="text-xs mb-1 text-gray-600">
                            Our Share: {data.share}
                          </div>
                          <div className="text-xs pt-2 mt-2 border-t border-gray-200 text-gray-600">
                            {data.competitor}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-blue-900"><span className="font-semibold">Data Note:</span> Nielsen data is 2-3 months lagged (Oct 2024). Treating competitive share figures as directional hypotheses rather than current state. Actual competitive landscape may have evolved.</p>
                    </div>
                  </div>

                  {/* Why Analysis */}
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: '#0C2C18' }}>Why This Recommendation</h4>
                    <p className="text-sm leading-relaxed text-gray-700">{decision.why}</p>
                  </div>

                  {/* RCA Factors */}
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="text-xs font-semibold mb-4 uppercase tracking-wide" style={{ color: '#0C2C18' }}>Root Cause Analysis</h4>
                    <div className="space-y-6">
                      {decision.rcaFactors.map((factor, idx) => (
                        <div key={idx}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-1 text-xs font-semibold rounded" style={{ 
                                  backgroundColor: factor.category === 'Distributor Issues' ? '#FEE2E2' :
                                                   factor.category === 'Stock Outs' ? '#FEF3C7' :
                                                   factor.category === 'Scheme Design' ? '#E0F2FE' :
                                                   factor.category === 'People Efficiency' ? '#DBEAFE' : '#E0E7FF',
                                  color: factor.category === 'Distributor Issues' ? '#991B1B' :
                                         factor.category === 'Stock Outs' ? '#92400E' :
                                         factor.category === 'Scheme Design' ? '#075985' :
                                         factor.category === 'People Efficiency' ? '#1E40AF' : '#3730A3'
                                }}>
                                  {factor.category}
                                </span>
                                <span className="text-base font-semibold" style={{ color: '#0C2C18' }}>{factor.factor}</span>
                                <span className="px-2 py-0.5 text-xs font-medium rounded" style={{ backgroundColor: '#FAFAF8', color: '#85A383' }}>
                                  {factor.weight}% weight
                                </span>
                              </div>
                              <p className="text-sm leading-relaxed mb-3 text-gray-700">{factor.evidence}</p>
                            </div>
                          </div>
                          
                          <div className="relative h-3 rounded-full overflow-hidden bg-gray-200">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{ 
                                width: `${factor.weight}%`, 
                                backgroundColor: '#0C2C18'
                              }}
                            />
                            <div
                              className="absolute inset-y-0 left-0 rounded-full opacity-30"
                              style={{ 
                                width: `${factor.score}%`, 
                                backgroundColor: '#85A383'
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What-If Scenarios */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4" style={{ color: '#85A383' }} />
                      <h4 className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#0C2C18' }}>
                        What-If Scenarios
                      </h4>
                    </div>
                    <div className="space-y-4">
                      {decision.whatIfs.map((whatif, idx) => (
                        <div key={idx} className="border-2 rounded overflow-hidden" style={{ borderColor: '#0C2C18' }}>
                          <div className="p-4" style={{ backgroundColor: '#0C2C18' }}>
                            <button
                              onClick={() => handleWhatIfClick(decision.id, whatif.question)}
                              className="text-sm font-semibold text-white text-left w-full hover:opacity-90"
                            >
                              {whatif.question}
                            </button>
                          </div>
                          <div className="p-4" style={{ backgroundColor: '#F3F4F1' }}>
                            <div className="grid grid-cols-5 gap-3 mb-3">
                              {Object.entries(whatif.projections).map(([key, value]) => (
                                <div key={key}>
                                  <div className="text-xs mb-1 text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                  <div className="text-sm font-bold" style={{ color: '#0C2C18' }}>{value}</div>
                                </div>
                              ))}
                            </div>
                            <div className="text-xs p-2 rounded bg-white text-gray-700 border border-gray-300">
                              <span className="font-semibold">Calculation:</span> {whatif.breakdown}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chat Panel */}
                  {chatOpen === decision.id && (
                    <div className="border-t border-gray-200 p-6" style={{ backgroundColor: '#FAFAF8' }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5" style={{ color: '#85A383' }} />
                          <h4 className="text-sm font-semibold" style={{ color: '#0C2C18' }}>Analysis with Morrie</h4>
                        </div>
                        <button onClick={() => setChatOpen(null)} className="p-1 text-gray-400 hover:text-gray-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-4 mb-4">
                        {messages.map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div 
                              className={`max-w-[85%] p-4 ${msg.type === 'user' ? 'bg-white border border-gray-300' : 'bg-white border-l-4'}`}
                              style={msg.type === 'ai' ? { borderLeftColor: '#85A383' } : {}}
                            >
                              <p className="text-sm text-gray-700">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                          placeholder="Ask a follow-up question..."
                          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-900"
                        />
                        <button 
                          onClick={handleSend}
                          className="px-4 py-2 text-white rounded flex items-center gap-2 hover:opacity-90"
                          style={{ backgroundColor: '#85A383' }}
                        >
                          <Send className="w-4 h-4" />
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Decision Trail Modal */}
              {showTrail === decision.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50">
                  <div className="bg-white max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col rounded-lg shadow-xl">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-light mb-1" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                            Decision Trail
                          </h3>
                          <p className="text-sm text-gray-600">Multi-agent system analysis and database queries</p>
                        </div>
                        <button onClick={() => setShowTrail(null)} className="text-xl font-light text-gray-400 hover:text-gray-600">
                          ✕
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6">
                      <table className="w-full">
                        <thead className="border-b border-gray-200">
                          <tr>
                            <th className="text-left text-xs font-semibold uppercase pb-3 pr-4 text-gray-500">Time</th>
                            <th className="text-left text-xs font-semibold uppercase pb-3 pr-4 text-gray-500">Agent</th>
                            <th className="text-left text-xs font-semibold uppercase pb-3 pr-4 text-gray-500">Action</th>
                            <th className="text-left text-xs font-semibold uppercase pb-3 text-gray-500">Agent Thinking</th>
                          </tr>
                        </thead>
                        <tbody>
                          {decision.trail.map((step, idx) => (
                            <tr key={idx} className="border-b border-gray-100">
                              <td className="py-4 pr-4 text-xs align-top text-gray-500">{step.time}</td>
                              <td className="py-4 pr-4 align-top">
                                <span className="inline-block px-2 py-1 text-xs rounded" style={{ backgroundColor: '#FAFAF8', color: '#1B2A21' }}>
                                  {step.agent}
                                </span>
                              </td>
                              <td className="py-4 pr-4 text-sm align-top font-medium" style={{ color: '#0C2C18' }}>{step.action}</td>
                              <td className="py-4 text-sm align-top leading-relaxed text-gray-700">{step.thinking}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MorriePlatform;
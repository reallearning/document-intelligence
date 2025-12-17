"use client"
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, MapPin, MessageSquare, Zap, Target, AlertCircle, Send, X, ChevronDown, ChevronRight, BarChart3, Activity, Users, Package } from 'lucide-react';

export default function RSMDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [conversationOpen, setConversationOpen] = useState(false);
  const [conversationContext, setConversationContext] = useState(null);
  const [expandedASM, setExpandedASM] = useState(null);
  const [expandedDist, setExpandedDist] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [decisionTrailOpen, setDecisionTrailOpen] = useState(false);
  const [selectedDecisionTrail, setSelectedDecisionTrail] = useState(null);
  const chatMessagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const C = {
    darkGreen: '#0C2C18', sage: '#85A383', cream: '#E7DDCA',
    darkest: '#1B2A21', terra: '#DF7649', grey: '#878B87',
    off: '#FDFCFA', warn: '#D4A574'
  };

  const data = {
    rsmName: "Sanjay Mehta", region: "Mumbai & Thane Region",
    achievement: 87, gm: 24.3, targetGM: 26.0, wc: 8.2, team: 4,
    
    issues: [
      {
        id: 'I1', title: 'Mumbai Metro Revenue Shortfall', sev: 'critical',
        impact: { metric: 'Revenue', val: '-₹1.8Cr', pct: -22 },
        dims: {
          execution: { issue: '2 vacant beats, coverage 72% (from 85%)', impact: '40% of shortfall', sev: 'critical' },
          finance: { issue: 'Shah 95% credit, ₹45k blocked', impact: '20% of shortfall', sev: 'high' },
          supply: { issue: 'Independence/R-Clean stockout 6d, ₹65k backlog', impact: '15% of shortfall', sev: 'high' },
          forecast: { issue: 'Nov forecast +15% vs flat', impact: '10% of shortfall', sev: 'medium' }
        },
        bizImpact: { revenue: '-₹1.8Cr', gm: -2.1, wc: '₹2.4Cr locked' },
        actions: [
          { act: 'Deploy 2 TSRs to Andheri (5d)', impact: '+₹85k', cost: '₹15k' },
          { act: 'Extend Shah credit ₹3L', impact: 'Unblock ₹45k', cost: '₹3L WC' },
          { act: 'Move stock from Thane WH', impact: 'Fulfill ₹65k', cost: '₹8k' }
        ],
        outcome: { revenue: '+₹195k', ach: '+5.8%', gm: '+0.8%' },
        owner: 'Rajesh Kumar'
      },
      {
        id: 'I2', title: 'Margin Erosion Across Territory', sev: 'high',
        impact: { metric: 'Gross Margin', val: '-1.7%', pct: -6.5 },
        dims: {
          margin: { issue: 'GM% 26.0% → 24.3%', impact: 'Primary issue', sev: 'critical' },
          execution: { issue: 'High-margin SKU 35% vs 45% target', impact: '40% of GM loss', sev: 'high' },
          finance: { issue: 'Cash discounting to clear receivables', impact: '₹2.8L monthly', sev: 'medium' },
          forecast: { issue: 'Scheme costs 2.1% over plan', impact: 'Budget overrun', sev: 'medium' }
        },
        bizImpact: { gm: -1.7, absMargin: '-₹2.1Cr' },
        actions: [
          { act: 'Push high-margin SKU focus', impact: 'Recover 0.8% GM', cost: 'None' },
          { act: 'Tighten discount approval', impact: 'Save ₹2.8L/mo', cost: 'None' }
        ],
        outcome: { gm: '+1.2%', absMargin: '+₹1.5Cr/mo' },
        owner: 'Multiple'
      },
      {
        id: 'I3', title: 'Working Capital Stress', sev: 'high',
        impact: { metric: 'Working Capital', val: '₹5.2Cr locked', pct: null },
        dims: {
          finance: { issue: '₹5.2Cr in receivables >45d', impact: 'Primary', sev: 'critical' },
          execution: { issue: '3 distributors near limit', impact: '₹1.2Cr blocking', sev: 'high' }
        },
        bizImpact: { revenue: '₹1.2Cr at risk', wc: '₹5.2Cr locked', dso: '42d vs 30' },
        actions: [
          { act: 'Collection drive >45d', impact: 'Free ₹5.2Cr', cost: 'None' },
          { act: 'Extend credit 3 distributors', impact: 'Protect ₹1.2Cr', cost: '₹8L WC' }
        ],
        outcome: { wc: 'Free ₹5.2Cr', dso: '→ 35d' },
        owner: 'Multiple + Finance'
      }
    ],

    asms: [
      {
        id: 'A1', name: 'Rajesh Kumar', territory: 'Mumbai Metro', health: 'critical',
        m: { ach: 78, gm: 23.1, credit: 'At Risk', stock: 3, wc: '₹2.4Cr' },
        trend: [72, 75, 76, 78], // Last 4 months
        alerts: 3,
        insight: 'Multi-dimensional crisis: Manpower (2 vacant beats) → credit stress (Shah 95%) → margin pressure (18% discount vs 15%). Stockouts add ₹65k backlog.',
        dists: [
          {
            id: 'D1', name: 'Shah Enterprises', health: 'critical',
            m: { ach: 72, gm: 22.5, creditUtil: 95, dso: 42, fulfill: 87 },
            trend: [68, 70, 71, 72],
            gap: 2, 
            insight: 'Severe stress. 2 vacant beats → Arjun covers 1.5x, lost 8 outlets. 95% credit blocks ₹45k. Key SKU stockouts = ₹65k backlog.',
            rootCauseBreakdown: { execution: 40, credit: 25, supply: 20, margin: 10, forecast: 5 },
            sales: [
              { id: 'S1', name: 'Arjun Mehta', beat: 'Andheri W', ach: 68, health: 'critical', 
                rc: { dist: -25, days: -40, drop: -8 }, 
                outlets: { active: 45, lost: 8, target: 60 },
                productivity: { calls: 12, orders: 6, lines: 18 }
              },
              { id: 'S2', name: 'Priya Nair', beat: 'Andheri E', ach: 75, health: 'warning', 
                rc: { dist: -5, days: -15, drop: -12 },
                outlets: { active: 52, lost: 2, target: 60 },
                productivity: { calls: 15, orders: 9, lines: 22 }
              }
            ]
          },
          {
            id: 'D2', name: 'Metro Traders', health: 'warning',
            m: { ach: 82, gm: 23.8, creditUtil: 78, dso: 38, fulfill: 92 },
            trend: [80, 81, 82, 82],
            gap: 1,
            insight: 'Moderate underperformance. 1 vacant beat affecting Bandra coverage. Credit stable but DSO slightly elevated.',
            rootCauseBreakdown: { execution: 60, credit: 15, supply: 10, margin: 10, forecast: 5 },
            sales: [
              { id: 'S3', name: 'Vikram Shah', beat: 'Bandra', ach: 82, health: 'warning',
                rc: { dist: -10, days: -20, drop: -5 },
                outlets: { active: 55, lost: 3, target: 65 },
                productivity: { calls: 14, orders: 8, lines: 20 }
              }
            ]
          }
        ]
      },
      {
        id: 'A2', name: 'Priya Desai', territory: 'Thane', health: 'warning',
        m: { ach: 89, gm: 25.2, credit: 'Stable', stock: 1, wc: '₹1.2Cr' },
        trend: [87, 88, 89, 89],
        alerts: 1,
        insight: 'Mixed. Thane good but Navi Mumbai wholesale -15%. Focus SKU 23pts below target.',
        dists: []
      },
      {
        id: 'A3', name: 'Amit Patel', territory: 'Kalyan', health: 'healthy',
        m: { ach: 103, gm: 26.8, credit: 'Healthy', stock: 0, wc: 'Optimal' },
        trend: [98, 101, 102, 103],
        alerts: 0,
        insight: 'Outstanding. 103% via full staffing + NPD excellence (78% vs 55% avg). Benchmark territory.',
        dists: []
      },
      {
        id: 'A4', name: 'Sneha Joshi', territory: 'Vasai', health: 'warning',
        m: { ach: 91, gm: 24.5, credit: 'Stable', stock: 0, wc: '₹0.8Cr' },
        trend: [90, 91, 91, 91],
        alerts: 1,
        insight: 'Chemist channel -8.2% while GT/Wholesale stable. Competitive schemes aggressive.',
        dists: []
      }
    ]
  };

  const hColor = h => ({ critical: C.terra, warning: C.warn, healthy: C.sage }[h] || C.grey);
  const hLabel = h => ({ critical: 'CRITICAL', warning: 'NEEDS ATTENTION', healthy: 'HEALTHY' }[h] || 'UNKNOWN');
  const sColor = s => ({ critical: C.terra, high: C.warn, medium: C.sage, low: C.grey }[s] || C.grey);

  const decisionTrails = {
    pricing: [
      { time: '14:23:12', agent: 'Orchestrator', action: 'Initiated Analysis', database: '—', query: '—', thinking: 'Detected pricing opportunity for Independence Premium 200g in premium outlets. Triggering multi-agent analysis to generate pricing recommendation.', next: 'Pricing Agent' },
      { time: '14:23:15', agent: 'Pricing Agent', action: 'Query Competitor Prices', database: 'Market Intelligence', query: '▸ View Query & Data', thinking: 'Premium outlets (S Mumbai, Bandra) show competition priced 8-12% higher. Current ₹45 MRP appears undervalued relative to competitive set.', next: 'Pricing Agent' },
      { time: '14:23:18', agent: 'Pricing Agent', action: 'Query Historical Elasticity', database: 'Analytics DB', query: '▸ View Query & Data', thinking: 'Historical price increases in premium segment show -3% to -4% elasticity. Last increase 18 months ago had minimal volume impact. Price sensitivity is low in this channel.', next: 'Pricing Agent' },
      { time: '14:23:22', agent: 'Pricing Agent', action: 'Calculate Revenue Impact', database: 'Analytics DB', query: '▸ View Query & Data', thinking: '₹5 increase across 600 outlets with 18% revenue contribution yields +₹45L incremental. At -3% elasticity, net impact remains strongly positive at +₹42L.', next: 'Finance Agent' },
      { time: '14:23:28', agent: 'Finance Agent', action: 'Query Margin Structure', database: 'Finance System', query: '▸ View Query & Data', thinking: 'Current 8% distributor margin can absorb ₹0.40. Retailer needs +₹2 incentive for display compliance. Net GM improvement: +1.2% after trade investments.', next: 'Marketing Agent' },
      { time: '14:23:35', agent: 'Marketing Agent', action: 'Query Campaign Calendar', database: 'Marketing Calendar', query: '▸ View Query & Data', thinking: 'Q4 starts Jan 1 - optimal timing for price change. No major campaigns planned for Independence Premium in premium outlets. Clear window for implementation.', next: 'Supply Chain Agent' },
      { time: '14:23:41', agent: 'Supply Chain Agent', action: 'Check Inventory Position', database: 'Warehouse Management', query: '▸ View Query & Data', thinking: 'Current stock sufficient for 2-week transition. No supply constraints. Price change can be implemented without stock availability issues.', next: 'Orchestrator' },
      { time: '14:23:48', agent: 'Orchestrator', action: 'Generate Recommendation', database: '—', query: '—', thinking: 'Synthesizing inputs: Strong competitive headroom, low elasticity, positive margin impact, clear timing window. High confidence (94%) pricing recommendation generated with implementation roadmap.', next: '—' }
    ],
    promotion: [
      { time: '15:12:05', agent: 'Orchestrator', action: 'Initiated Analysis', database: '—', query: '—', thinking: 'Detected low pack conversion (40% single packs) and competitive 2+1 offer in Thane/Kalyan. Triggering promotion analysis for Jio Hair Care.', next: 'Marketing Agent' },
      { time: '15:12:09', agent: 'Marketing Agent', action: 'Query Competitive Activity', database: 'Market Intelligence', query: '▸ View Query & Data', thinking: 'Competitor running 2+1 in same geography. Our single pack sales declining 8% MoM. Need aggressive response to recapture shelf share and mind share.', next: 'Inventory Agent' },
      { time: '15:12:14', agent: 'Inventory Agent', action: 'Check Stock Availability', database: 'Warehouse Management', query: '▸ View Query & Data', thinking: 'Sufficient inventory to support 3+1 offer. 16,000 bundles feasible with current stock levels. No supply constraints for 4-week promotion window.', next: 'Pricing Agent' },
      { time: '15:12:19', agent: 'Pricing Agent', action: 'Calculate Promotion ROI', database: 'Analytics DB', query: '▸ View Query & Data', thinking: 'Scheme cost: ₹23/bundle for 16,000 units = ₹9.2L. Expected uplift based on historical 3+1 performance: +₹38L revenue. ROI: 4.1x. Break-even: 4,200 bundles (26% of target).', next: 'Marketing Agent' },
      { time: '15:12:26', agent: 'Marketing Agent', action: 'Query Campaign Performance', database: 'Analytics DB', query: '▸ View Query & Data', thinking: 'Historical 3+1 bundles drive 35-40% uplift in target outlets. POS materials critical - counter displays boost conversion by 22%. Allocate ₹2k per outlet for visibility.', next: 'Finance Agent' },
      { time: '15:12:33', agent: 'Finance Agent', action: 'Validate Budget Availability', database: 'Finance System', query: '▸ View Query & Data', thinking: 'Q4 promotion budget has ₹12L unallocated. ₹9.2L scheme cost within approval limits. No additional clearance needed for execution.', next: 'Orchestrator' },
      { time: '15:12:40', agent: 'Orchestrator', action: 'Generate Recommendation', database: '—', query: '—', thinking: 'All inputs positive: Competitive threat clear, stock available, strong ROI (4.1x), budget approved. High confidence (91%) promotion recommendation for 4-week execution.', next: '—' }
    ],
    trade: [
      { time: '16:45:22', agent: 'Orchestrator', action: 'Initiated Analysis', database: '—', query: '—', thinking: 'Detected Shah distributor at 95% credit utilization blocking ₹45k orders. Triggering trade scheme analysis to address credit stress and velocity.', next: 'Finance Agent' },
      { time: '16:45:26', agent: 'Finance Agent', action: 'Query Credit Status', database: 'Finance System', query: '▸ View Query & Data', thinking: 'Shah: 95% utilization, DSO 42 days (vs 35 target). Metro: 78% utilization, DSO 38 days. Both need velocity boost to generate cash for collections.', next: 'Finance Agent' },
      { time: '16:45:31', agent: 'Finance Agent', action: 'Calculate DSO Impact', database: 'Analytics DB', query: '▸ View Query & Data', thinking: 'Volume rebate incentivizes higher billing. Target ₹40L billing (vs ₹28L current) generates ₹12L additional. Faster turnover improves DSO by 5 days, freeing working capital.', next: 'Pricing Agent' },
      { time: '16:45:37', agent: 'Pricing Agent', action: 'Design Rebate Tiers', database: 'Analytics DB', query: '▸ View Query & Data', thinking: 'Tier 1: ₹30L → 1.5% rebate (₹45k). Tier 2: ₹40L → 2.5% rebate (₹1L). Conditional on DSO <38 days aligns incentive with collection discipline.', next: 'Marketing Agent' },
      { time: '16:45:44', agent: 'Marketing Agent', action: 'Assess Market Response', database: 'Market Intelligence', query: '▸ View Query & Data', thinking: 'Distributors respond positively to volume rebates (historical uptake 85%). Jan-Feb timing avoids major festival conflicts. 8-week window provides realistic ramp period.', next: 'Supply Chain Agent' },
      { time: '16:45:51', agent: 'Supply Chain Agent', action: 'Validate Supply Capacity', database: 'Warehouse Management', query: '▸ View Query & Data', thinking: 'Can support ₹65L incremental billing from current inventory levels. No capacity constraints for executing volume push across Shah and Metro territories.', next: 'Orchestrator' },
      { time: '16:45:58', agent: 'Orchestrator', action: 'Generate Recommendation', database: '—', query: '—', thinking: 'Trade scheme addresses root cause: Incentivizes velocity, improves cash generation, conditional on DSO improvement. Moderate confidence (88%) - success depends on distributor execution discipline.', next: '—' }
    ],
    pack: [
      { time: '17:22:15', agent: 'Orchestrator', action: 'Initiated Analysis', database: '—', query: '—', thinking: 'Detected economy shift (62%→67%) and price gap between 200g (₹45) and 500g (₹105). Triggering pack architecture analysis for Independence.', next: 'Marketing Agent' },
      { time: '17:22:19', agent: 'Marketing Agent', action: 'Query Consumer Trends', database: 'Market Research', query: '▸ View Query & Data', thinking: 'Price-conscious consumers migrating to competition due to pack size gap. 400g at ₹75 (₹18.75/100g) addresses sweet spot. Matches consumption pattern for economy segment.', next: 'Pricing Agent' },
      { time: '17:22:25', agent: 'Pricing Agent', action: 'Calculate Cannibalization', database: 'Analytics DB', query: '▸ View Query & Data', thinking: 'New 400g will cannibalize ~34% from 200g (₹28L). But incremental gain from competitive conquest: ₹82L. Net impact: +₹54L with acceptable margin profile.', next: 'Finance Agent' },
      { time: '17:22:32', agent: 'Finance Agent', action: 'Assess Margin Impact', database: 'Finance System', query: '▸ View Query & Data', thinking: 'Introductory ₹5 off (₹75→₹70) for first month costs ₹12L but drives trial. Post-intro, 10% trade margin on ₹75 MRP maintains healthy gross margin of 26%.', next: 'Supply Chain Agent' },
      { time: '17:22:39', agent: 'Supply Chain Agent', action: 'Check Production Feasibility', database: 'Manufacturing', query: '▸ View Query & Data', thinking: 'Manufacturing can produce 400g pack with 3-week lead time. Feb 1 launch feasible. Initial production: 40,000 units to cover 1,200 mass market outlets with 2-month inventory.', next: 'Marketing Agent' },
      { time: '17:22:46', agent: 'Marketing Agent', action: 'Plan Distribution Strategy', database: 'Sales System', query: '▸ View Query & Data', thinking: 'Focus on GT channel and mass market outlets first. 1,200 outlets identified with highest economy segment concentration. 10% trade margin (vs 8% for 200g) ensures distributor push.', next: 'Orchestrator' },
      { time: '17:22:53', agent: 'Orchestrator', action: 'Generate Recommendation', database: '—', query: '—', thinking: 'Strong strategic fit: Closes pack gap, captures economy shift, net positive after cannibalization. High confidence (92%) with phased rollout to manage execution risk.', next: '—' }
    ]
  };

  const openDecisionTrail = (trailType) => {
    setSelectedDecisionTrail(trailType);
    setDecisionTrailOpen(true);
  };

  const openConv = ctx => {
    setConversationContext(ctx);
    if (activeTab !== 'askmorrie') {
      setConversationOpen(true);
    }
    
    let msg = { type: 'ai', text: '', ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), sugg: [] };

    if (ctx.type === 'issue') {
      const i = ctx.data;
      msg.text = `**${i.title} Root Cause**\n\n**Situation:** ₹1.8Cr monthly revenue gap across 5 dimensions\n\n**Core issue:** Negative feedback loop, not separate problems\n• Manpower gap → ₹60k weekly loss\n• Revenue pressure → panic discounting → +₹11k weekly margin loss  \n• Cash generation slows → DSO +7 days → credit hits 95%\n• Orders blocked → stockouts → +₹16k weekly backlog\n• Now at ₹87k weekly total loss (accelerating 3% monthly)\n\n**Key insight:** Fixing execution breaks entire loop\n• Direct recovery: ₹85k/week\n• Indirect recovery: ₹110k/week (credit eases, margin improves, supply stabilizes)\n• Total impact: ₹195k/week, not ₹85k\n\n**Recommendation:** Deploy 2 TSRs (₹105k) → ₹1.11Cr return over 3 months (10.6x ROI)`;
      msg.sugg = ['Why does loop accelerate vs stabilize?', 'Tipping point for unrecoverable damage?', 'What if I break loop at credit vs execution?', 'Calculate hidden costs in other metrics'];
    } else if (ctx.type === 'asm') {
      msg.text = `**${ctx.name} Performance Analysis**\n\n**Headline:** ${ctx.data.m.ach}% achievement, but ceiling is 88% with current infrastructure\n\n**Distributor capability gaps:**\n• Hiring speed: 45 days vs 21 days (Amit's distributor) → 8-week delay = ₹480k lost\n• TSR training: Basic only → 75% productivity vs 90% potential = ₹360k lost annually\n• Inventory planning: Reactive, 12% OOS vs 5% achievable = ₹840k lost annually\n• Credit tracking: Manual → DSO 42d vs 35d = ₹2.4Cr WC locked\n\n**Performance attribution:**\n• ${ctx.name} at 89% of achievable ceiling (${ctx.data.m.ach}% ÷ 88%)\n• Problem isn't execution, it's distributor capability\n• Amit's advantage: 40% market + 35% distributor infrastructure + 25% execution\n\n**Interventions:**\n• Short-term (3mo): Fill beats with temps → 83% achievable\n• Medium-term (6-12mo): Distributor capability program → raise ceiling to 95%\n• Long-term: Distributor consolidation`;
      msg.sugg = ['Distributor capability scores across region?', 'ROI on infrastructure investment?', 'Mandate minimum distributor standards?', 'Replace Shah with better distributor?'];
    } else if (ctx.type === 'distributor') {
      const d = ctx.data;
      msg.text = `**${ctx.name} Diagnostic**\n\n**Achievement:** ${d.m.ach}% (target 85%)\n\n**Productivity paradox:** 25% capacity loss → 28% revenue drop\n• Arjun's overload: 8 → 12 outlets/day, 45min → 30min/outlet\n• Quality degradation: Merchandising 100% → 40%, prospecting 100% → 0%\n• Result: 8 outlet churn + 3% "overload tax" = ₹360k annually hidden\n\n**Credit mechanics:**\n• DSO 35d → 42d coincides exactly with manpower drop\n• Visit frequency 3x/week → 1.8x/week = collection conversations every 12d vs 7d\n• 95% credit utilization is symptom of visit frequency, not payment behavior\n\n**Outlet loss amplifier:**\n• Lost 8 small outlets (₹8k/month each = ₹64k)\n• But high frequency: 3x/week vs 1.5x avg = 576 order lines/month\n• Shelf presence impact on other outlets: Real loss ₹120k/month\n\n**Total hidden costs:** ₹416k annually beyond dashboard metrics\n\n**Recommendation:** Fix manpower first. Credit will self-correct in 6-8 weeks without extending limits.`;
      msg.sugg = ['Measure overload tax across all territories?', 'Should DSO targets adjust for visit frequency?', 'Quantify outlet loss amplifier effect?', 'Dashboard metric for quality degradation?'];
    } else if (ctx.type === 'cascade') {
      msg.text = `**Manpower-Credit Cascade Analysis**\n\n**Timeline:**\n• Week 0: 2 TSRs leave\n• Week 2: 8 high-frequency outlets churn (₹1.44L/month)\n• Week 4: Panic discounting 15% → 18% (-₹45k monthly margin)\n• Week 6: DSO 35d → 42d, credit 85% → 95%\n• Week 8: ₹45k orders blocked\n• Week 10: Stockouts create ₹65k backlog\n\n**Amplification:** Initial ₹60k/week loss → ₹87k/week total (accelerating 3%/month)\n\n**Why Shah, not Metro Traders:**\n• Beat structure: 8 beats (60 outlets each) vs 5 beats (65 outlets each)\n• Credit buffer: 85% pre-crisis (zero buffer) vs 65% (₹2Cr buffer)\n• Customer mix: 75% small retail (churns in 2 weeks) vs 60% wholesale (sticky 6-8 weeks)\n• Revenue drop front-loaded: 60% in first 4 weeks vs 40%\n\n**Strategic implication:** Shah needs immediate credit relief, Metro can wait for organic recovery`;
      msg.sugg = ['Why doesn\'t Metro have same cascade?', 'Week-by-week recovery if I deploy temp TSRs?', 'If Shah owner won\'t hire, can I break cascade?', 'Point of no return calculation?'];
    } else if (ctx.type === 'margin') {
      msg.text = `**₹2.1Cr Margin Opportunity**\n\n**Gap:** High-margin SKU mix 35% vs 45% target\n\n**Amit's 48% mix drivers:**\n• In-stock: 98% vs 87% regional avg → Fixes ₹800k/month in lost high-margin sales\n• Pack conversion: 65% premium packs vs 40% avg → 8 margin points (₹600k/month)\n• TSR training: Margin-aware selling, not volume-only → ₹600k/month\n• Distributor incentives: Variable pay includes margin component\n\n**Reality check:**\n• Can't replicate without fixing distributor capability\n• 3 of 4 distributors have weak inventory planning, zero margin incentives\n• This is 6-month capability build, not 1-month sales push\n\n**Phased approach:**\n• Fix in-stock first → ₹800k/month, fastest return\n• Implement margin incentives → ₹700k/month, contractual change\n• Build training program → ₹600k/month, 3-month ramp\n\n**Total opportunity:** ₹2.1Cr, 6-month timeline`;
      msg.sugg = ['West Supply daily operations breakdown?', 'In-stock fix: timeline and margin recovery?', 'Change incentives without contract renegotiation?', 'Transfer Amit\'s TSR to train Mumbai team?'];
    } else if (ctx.type === 'wc') {
      msg.text = `**₹5.2Cr Working Capital Analysis**\n\n**Breakdown:**\n\n**Shah (₹2.4Cr, DSO 42d):** Credit policy failure\n• Revenue dropped 28%, credit limit flat at ₹5Cr\n• Old coverage: 10 days. New coverage: 13.9 days (39% effective squeeze)\n• Not a collections issue - payment behavior unchanged\n\n**Metro (₹1.8Cr, DSO 38d):** Collections discipline issue\n• 60% of delay from 3 large GT accounts paying slow\n• ASM lacks account-level DSO visibility\n• GT problem hidden in distributor aggregate\n\n**Reliable (₹1.0Cr, DSO 47d):** Credit policy abuse\n• Cash-strapped from new territory expansion\n• Using your credit as working capital for their growth\n\n**Recommended actions:**\n• Shah: Extend to ₹6.5Cr for 90 days (protects revenue while manpower recovers)\n• Metro: Separate GT accounts to 45-day terms\n• Reliable: Reduce to ₹3Cr (force rightsizing)\n\n**Impact:** Free ₹3.8Cr in 60 days while protecting revenue\n\n**₹45k/mo cash discount:** Unclaimable under current structure (distributors can't pay in 7 days due to issues above)`;
      msg.sugg = ['Why does extending Shah credit improve WC?', 'GT account restructuring mechanics?', 'Should I cut Reliable entirely?', 'WC optimization calculation across all three?'];
    } else if (ctx.type === 'supply') {
      msg.text = `**₹2.8Cr Stock Mismatch**\n\n**Issue:** Thane 480 units excess (3mo cover), Mumbai ₹2.8Cr backlog, same SKUs\n\n**Root causes:**\n• Forecasting: Allocates on historical sales, not demand potential\n• Mumbai sales down 22% (manpower) → system says "needs less stock"\n• Confusing "sold" with "could have sold"\n\n**Structural problems:**\n• Branch incentives: Thane measured on inventory turns (no incentive to help Mumbai)\n• Information gap: Mumbai doesn't see Thane inventory, Thane doesn't see Mumbai stockouts\n• Nobody has cross-branch visibility\n\n**Why this recurs:** Fixed 3x in 6 months because treating symptom (stock move) not disease (information flow)\n\n**Fixes:**\n• Immediate: Move 480 units (₹35k cost, ₹2.8Cr impact, 80x ROI)\n• This month: Give ASMs cross-branch inventory visibility + direct transfer authority\n• This quarter: Fix forecasting (separate demand from realized sales) + change branch incentives to regional fill rate\n\n**True problem:** ₹1.2Cr excess inventory + ₹350k/month lost revenue = worst of both worlds (high WC + stockouts)`;
      msg.sugg = ['All regional stock mismatches right now?', 'Risk of cross-branch visibility for ASMs?', 'Change branch incentives without corporate?', 'Total WC locked in regional inefficiency?'];
    } else if (ctx.type === 'business') {
      if (ctx.subtype === 'growth') {
        msg.text = `**Where is growth coming from?**\n\n**MTD Mumbai + Thane: +7.5% vs LY**\n\n**Growth breakdown:**\n• +3.0% from more active outlets (~4% more outlets buying)\n• +3.8% from higher drop size per bill\n• +0.7% from bulk/one-time deals in Thane\n\n**Insight:** ~90% of growth is steady (outlets + order size), not one-off\n\n**Quality check:**\n• Drop size driven by pack size shift (larger packs) not price inflation\n• Outlet growth concentrated in GT channel\n• Traditional retail flat at +1.2%`;
        msg.sugg = ['Which outlets drive drop size increase?', 'Is GT growth sustainable or promotion-driven?', 'Traditional retail: why flat despite more coverage?', 'Break down by ASM territory'];
      } else if (ctx.subtype === 'risk') {
        msg.text = `**Business health: Last 4 weeks**\n\n**Status:** Growing but risk increasing\n\n**3 risk signals:**\n\n**1. Distributor concentration:**\n• Top 10: 56% of sales (was 51% Q3)\n• Shah + Metro: 38% of regional sales\n• Any disruption has outsized impact\n\n**2. Economy vs Premium shift:**\n• Economy soaps: 62% → 67% (+5 pts)\n• Independence Premium: Down ~5 pts\n• Avg realization/kg: -2.3%\n\n**3. Key outlet weakness:**\n• 6-7% of top outlets down >20% vs 3mo back\n• South Mumbai + Bandra premium zones\n• Competitor schemes aggressive\n\n**Recommendation:** Topline fine, but diversify distributors + arrest premium erosion`;
        msg.sugg = ['Which distributors to add?', 'Why premium losing in South Mumbai?', 'Economy shift: can I reverse it?', 'Top outlet retention plan?'];
      } else if (ctx.subtype === 'outlets') {
        msg.text = `**Old vs New Outlets**\n\n**Repeat outlets (billed last 3mo):**\n• 88% of sales\n• +5.8% vs LY\n• ~70% flat or growing\n\n**New outlets (started last 90d):**\n• 12% of sales\n• +30%+ growth\n• But 60% drop after 1-2 orders\n\n**Insight:** Growth from existing outlets. New outlets good but high churn.\n\n**Churn analysis:**\n• Highest in traditional retail (small chemists, kirana)\n• GT/wholesale: 8 in 10 stick\n• Primary reason: Credit terms (60% cite payment flexibility)`;
        msg.sugg = ['Why 60% drop off?', 'Change onboarding for better retention?', 'Quality vs quantity new outlets?', 'Cost of churn?'];
      } else if (ctx.subtype === 'efficiency') {
        msg.text = `**High effort, low output**\n\n**3 areas: calls good, productivity weak**\n\n**1. Andheri-Goregaon:**\n• Calls: 108% of plan\n• Lines/bill: 5.1 → 4.3 (-16%)\n• Drop size: -7%\n• Issue: Push Independence only, Jio Hair/hair colour under-pushed\n\n**2. Dadar-Sion:**\n• Good call numbers\n• Hair colour lines/bill: -12%\n• Issue: Competitor offer active, our scheme late\n\n**3. Thane city:**\n• Coverage above plan\n• New SKUs barely move\n• Issue: TSRs focus on old SKUs for easy targets\n\n**Root:** Visiting outlets, but product mix + counter story weak`;
        msg.sugg = ['Fix Andheri-Goregaon: specific plan?', 'Why scheme reach late Dadar-Sion?', 'Incentivize new SKU push Thane?', 'Revenue loss from weak mix?'];
      } else if (ctx.subtype === 'opportunity') {
        msg.text = `**₹1 Cr without margin hit**\n\n**3 opportunities:**\n\n**1. Independence Premium in premium outlets:**\n• 600 outlets (S Mumbai, Bandra-Khar, Powai, Thane W)\n• Extra facing + display, link Independence soap\n• Uplift: ₹45-50L\n\n**2. Jio Hair Care refill bundles:**\n• ~400 outlets (Thane/Kalyan/Mira Road)\n• Move single → 2-3 pack bundles\n• Uplift: ₹35-40L\n\n**3. Independence Hair Colour cosmetics/salons:**\n• ~150 outlets, competitor strong\n• Better visibility + simple scheme\n• Uplift: ₹20-25L\n\n**Total: ₹1.0-1.1 Cr**\n**Margin impact: ~10 bps**`;
        msg.sugg = ['Which 600 outlets for Independence Premium?', 'Jio Hair Care bundle: will retailers agree?', 'Salon activation execution?', 'Timeline for ₹1 Cr?'];
      } else if (ctx.subtype === 'levers') {
        msg.text = `**95% → 102% with 3 actions**\n\n**Current:** 95% of target\n\n**3 levers:**\n\n**1. Fix 25 weakest beats:**\n• Thane, Kalyan-Dombivli, Kurla\n• Coverage to 95%+\n• Uplift: ₹1.2-1.4 Cr\n\n**2. Premium in 700 outlets:**\n• Independence Premium + hair colour focus\n• Uplift: ₹1.0-1.2 Cr\n\n**3. Fix 3 key distributors:**\n• Credit + inventory on top 15 SKUs\n• Uplift: ₹0.8-1.0 Cr\n\n**Total: ₹3.0-3.6 Cr**\n**Result: 95% → 101.5-102.5%**\n**Execute: Next 3 weeks**`;
        msg.sugg = ['Which 25 beats?', '700 outlets: how prioritize?', 'Which 3 distributors?', 'Week-by-week plan?'];
      } else {
        msg.text = `**Business Intelligence**\n\nI can answer:\n• Growth drivers and quality\n• Risk and concentration\n• Outlet dynamics\n• Efficiency gaps\n• Revenue opportunities\n• Action planning`;
        msg.sugg = ['Where is growth from?', 'Risk signals?', 'Best opportunities?', 'Efficiency problems?'];
      }
    } else {
      msg.text = `**Analysis Capabilities**\n\n**Root cause forensics:** Causal chains, correlation vs causation, symptoms vs diseases\n\n**Intervention design:** ROI with second-order effects, recovery timelines, risk scenarios\n\n**Comparative intelligence:** Why similar inputs yield different outputs, capability gaps, replicability\n\nWhat do you need?`;
      msg.sugg = ['Biggest risk not visible in dashboard?', 'Success pattern worth replicating?', 'Which problem to solve first?', 'Highest ROI intervention across dimensions?'];
    }
    
    setChatMessages([msg]);
  };

  const sendMsg = msg => {
    if (!msg.trim()) return;

    const uMsg = { type: 'user', text: msg, ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    let aMsg = { type: 'ai', text: '', ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), sugg: [] };

    const lowerMsg = msg.toLowerCase();

    // Specific pattern matching
    if (lowerMsg.includes('why') && lowerMsg.includes('shah')) {
      aMsg.text = `**Why Shah specifically:**\n\n**Structural vulnerabilities:**\n• Beat density: 8 beats, 60 outlets each (urban retail)\n• Credit buffer: 85% pre-crisis (zero buffer) vs Metro 65% (₹2Cr buffer)\n• Customer mix: 75% small retail (churns in 2 weeks) vs Metro 60% wholesale (sticky 6-8 weeks)\n\n**Cascade mechanics:**\n• 25% capacity loss → immediate churn due to urban retail dependency\n• Revenue drop front-loaded: 60% hits first 4 weeks vs Metro 40%\n• Zero credit buffer → immediate order blocking\n\n**Metro Traders comparison:**\n• 5 beats, 65 outlets each (suburban/wholesale)\n• 65% credit utilization (₹2Cr buffer)\n• Revenue drop gradual (40% first 4 weeks)\n• Result: Same manpower gap, 35% less damage\n\n**Implication:** One-size-fits-all solutions won't work. Shah needs immediate credit relief, Metro can wait.`;
      aMsg.sugg = ['Restructure Shah to fewer, larger beats?', 'Am I enabling poor management by extending credit?', 'Change customer mix toward wholesale?', 'Calculate credit buffer needed per distributor type'];
    } else if ((lowerMsg.includes('what if') || lowerMsg.includes('simulate')) && (lowerMsg.includes('implement') || lowerMsg.includes('actions'))) {
      aMsg.text = `**3-Action Integrated Simulation**\n\n**Month 1:**\n• Investment: ₹15k + ₹3L + ₹35k = ₹3.5L\n• Returns: ₹45k (unblocked) + ₹65k (fulfilled) + ₹84k (partial execution) = ₹194k\n• Net: -₹3.31L (in the hole)\n\n**Month 2:**\n• TSRs hit productivity, coverage 83%\n• Returns: +₹340k\n• Credit utilization 95% → 89%, ₹1.5L freed\n• Net: +₹190k\n\n**Month 3:**\n• Full execution recovery, coverage 85%\n• Returns: +₹510k\n• Credit fully freed (₹3L back)\n• Cumulative ROI: 4.2x\n\n**Alternative: Execution + Supply only (₹50k)**\n• Month 1: ₹149k return\n• Month 2: ₹340k + credit eases naturally\n• Month 3: ₹510k + ₹3L freed for other uses\n• ROI: 12x vs 4.2x\n\n**Recommendation:** Do execution + supply, skip credit extension. Credit self-corrects in 6-8 weeks. Deploy saved ₹3L elsewhere (2-5x ROI vs 0.15x on credit).`;
      aMsg.sugg = ['Phased approach: execution → supply → credit if needed?', 'Downside if TSRs underperform?', 'Model doing nothing for 3 months', 'Revolving credit buffer vs permanent increase?'];
    } else if (lowerMsg.includes('compare') && (lowerMsg.includes('rajesh') || lowerMsg.includes('amit'))) {
      aMsg.text = `**Rajesh vs Amit Attribution**\n\n**Amit's 103%:**\n• Market advantage: 40 points (Kalyan 15% less competition)\n• Distributor infrastructure: 35 points (West Supply 3x maturity vs Shah)\n• TSR execution: 20 points (full staffing, zero gaps)\n• Management: 8 points (coaching, escalation)\n\n**Rajesh's 78%:**\n• Market: -10 points (Mumbai hyper-competitive)\n• Distributor: -18 points (Shah weak training, reactive inventory, hiring failures)\n• Execution: -20 points (2 vacant beats, coverage collapse)\n• Management: -2 points (slow escalation)\n\n**Replicability analysis:**\n• Market: Not replicable (structural)\n• Distributor: 60% replicable (6-month program, ₹20 of 35 points)\n• Execution: 100% replicable (8 weeks, 20 points)\n• Management: 100% replicable (4 weeks, 8 points)\n\n**Rajesh's realistic ceiling:** 93% (not 103%)\n• Current: 78%\n• Add execution fix: +20 → 98%\n• Add management: +8 → 106%\n• Add partial distributor: +20 → 126%\n• Minus structural market: -10 → **93% ceiling**\n\n**Reality check:** Rajesh at 89% of achievable ceiling. Problem is distributor capability, not his execution.`;
      aMsg.sugg = ['Swap distributors across territories?', 'Cost-benefit of 6-month capability program?', 'Adjust targets for market competitiveness?', 'Who else has distributor capability gaps?'];
    } else if (lowerMsg.includes('calculate') || lowerMsg.includes('roi')) {
      aMsg.text = `**ROI Comparison**\n\n**Option 1: Execution only (₹105k)**\n• Direct: ₹934k over 3 months\n• Indirect: ₹180k (credit eases, margin improves)\n• Total: ₹1.11Cr, **10.6x ROI**, 5-week payback\n• Risk: 30% TSR underperformance → 6.2x downside\n\n**Option 2: Credit only (₹3L)**\n• Unblock ₹45k orders\n• But Shah keeps underperforming without execution fix\n• Credit stays at 93% (can't get ₹3L back)\n• **ROI: 0.15x** (value-destroying)\n\n**Option 3: Supply only (₹35k)**\n• Clear ₹65k backlog immediately\n• New backlog builds in 4 weeks without execution fix\n• **ROI: -0.5x** (loses money)\n\n**Option 4: Execution + Supply (₹140k) - RECOMMENDED**\n• Direct: ₹999k\n• Indirect: ₹165k (credit + margin)\n• Total: ₹1.16Cr, **8.3x ROI**, 4-week payback\n• Credit improves organically without locking ₹3L\n\n**Option 5: All three (₹3.5L)**\n• Return: ₹1.19Cr (only ₹30k more than Option 4)\n• **ROI: 3.4x** (capital inefficient)\n\n**Winner: Execution + Supply**\n• Best capital efficiency (₹140k vs ₹3.5L)\n• Solves root cause\n• Frees ₹3L for 2-5x ROI elsewhere`;
      aMsg.sugg = ['Credit trigger: extend only if execution fails by week 6?', 'Where to deploy saved ₹3L for better ROI?', 'Breakeven: when does credit extension make sense?', 'Pilot 1 month, then decide?'];
    } else if (lowerMsg.includes('recovery') || lowerMsg.includes('timeline') || lowerMsg.includes('week')) {
      aMsg.text = `**8-Week Recovery Timeline (Execution + Supply)**\n\n**Week 1-2: Setup (no visible progress)**\n• Actions: Recruit TSRs (5d), move stock (2d), onboard (3d)\n• Results: ₹65k from backlog fulfillment, still 72% coverage, 95% credit\n\n**Week 3-4: Ramp (slow)**\n• TSRs at 40% productivity\n• Results: +₹21k/week, 72% → 75% coverage, 2 outlets recovered, 94% credit\n\n**Week 5-6: Inflection**\n• TSRs 70% productive, Arjun's productivity improves 15%\n• Results: +₹75k/week, 75% → 80% coverage, 4 outlets total, 91% credit\n\n**Week 7-8: Stabilization**\n• TSRs 85% productive\n• Results: +₹85k/week stable, 80% → 83% coverage, 7 of 8 outlets (1 lost to competitor), 87% credit, **80% achievement**\n\n**Final state:**\n• 85% of gap recovered (₹1.02Cr of ₹1.2Cr)\n• Coverage: 83% (vs 85% target) - 2% permanent loss\n• Achievement: 80% (5 points short of 85% target)\n\n**To close final 15%:**\n• Convert temps to permanent (removes 15% productivity gap)\n• OR accept 83% as new baseline\n• OR add 1 more TSR (9 beats vs 8)\n\n**Expectation setting:** Full recovery is 8 weeks to 80%, not 85%. Set stakeholder expectations now.`;
      aMsg.sugg = ['Risk points where recovery could stall?', 'Accelerate with more investment?', 'Contingency if temps don\'t convert?', 'Adjust Shah target to 83% permanently?'];
    } else {
      // General fallback for open-ended questions
      aMsg.text = `I can help analyze this question. Based on your query, I can provide insights on:\n\n**Available analysis:**\n• Root cause diagnostics across all dimensions\n• Performance comparisons (ASMs, distributors, territories)\n• ROI calculations for interventions\n• Recovery timelines and action plans\n• Risk assessment and opportunity identification\n• Growth driver analysis\n• Efficiency and productivity gaps\n\nCould you rephrase or ask about a specific aspect you'd like me to analyze?`;
      aMsg.sugg = ['Where is growth coming from?', 'What are my biggest risks?', 'Which problems to solve first?', 'Calculate ROI for top interventions'];
    }

    setChatMessages([...chatMessages, uMsg, aMsg]);
    setInputMessage('');
  };

  const fmt = txt => {
    return txt.split('\n').map((line, i) => {
      const num = line.match(/^(\d+)\.\s*\*\*(.+?)\*\*\s*(.*)$/);
      if (num) {
        return (
          <div key={i} style={{ marginBottom: '12px', display: 'flex', gap: '12px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: C.sage, color: 'white', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{num[1]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: C.darkGreen, marginBottom: '4px' }}>{num[2]}</div>
              <div style={{ color: C.darkest }}>{num[3]}</div>
            </div>
          </div>
        );
      }
      
      if (line.includes('**')) {
        const parts = [];
        let t = line, j = 0;
        while (t.includes('**')) {
          const s = t.indexOf('**'), e = t.indexOf('**', s + 2);
          if (e === -1) break;
          if (s > 0) parts.push(<span key={`t${j++}`}>{t.substring(0, s)}</span>);
          parts.push(<strong key={`b${j++}`} style={{ fontWeight: '600', color: C.darkGreen }}>{t.substring(s + 2, e)}</strong>);
          t = t.substring(e + 2);
        }
        if (t) parts.push(<span key={`t${j++}`}>{t}</span>);
        return <div key={i} style={{ marginBottom: line.trim() ? '8px' : '4px' }}>{parts}</div>;
      }
      
      return line.trim() ? <div key={i} style={{ marginBottom: '8px' }}>{line}</div> : <div key={i} style={{ height: '8px' }}></div>;
    });
  };

  const Sparkline = ({ data, color, height = 40 }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width="100" height={height} style={{ display: 'block' }}>
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div className='overflow-y-auto' style={{ height: '100vh', backgroundColor: C.cream, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Decision Trail Modal */}
      {decisionTrailOpen && selectedDecisionTrail && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }} onClick={() => setDecisionTrailOpen(false)}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', maxWidth: '1400px', width: '100%', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px', borderBottom: `1px solid ${C.darkGreen}15`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, margin: 0, marginBottom: '4px' }}>Decision Trail</h2>
                <p style={{ fontSize: '13px', color: C.grey, margin: 0 }}>Multi-agent system analysis and database queries</p>
              </div>
              <button onClick={() => setDecisionTrailOpen(false)} style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = C.off} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <X size={20} color={C.grey} />
              </button>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '4px', border: `1px solid ${C.darkGreen}15`, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: C.off }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: C.grey, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.darkGreen}15` }}>TIME</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: C.grey, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.darkGreen}15` }}>AGENT</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: C.grey, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.darkGreen}15` }}>ACTION</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: C.grey, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.darkGreen}15` }}>DATABASE</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: C.grey, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.darkGreen}15` }}>QUERY / DATA</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: C.grey, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.darkGreen}15`, width: '30%' }}>AGENT THINKING</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: C.grey, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.darkGreen}15` }}>NEXT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {decisionTrails[selectedDecisionTrail].map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: idx < decisionTrails[selectedDecisionTrail].length - 1 ? `1px solid ${C.darkGreen}10` : 'none' }}>
                        <td style={{ padding: '16px', fontSize: '12px', color: C.grey, fontFamily: 'monospace' }}>{row.time}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '500', color: C.darkGreen, backgroundColor: row.agent === 'Orchestrator' ? `${C.sage}15` : `${C.warn}15`, padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
                            {row.agent}
                          </span>
                        </td>
                        <td style={{ padding: '16px', fontSize: '12px', color: C.darkest }}>{row.action}</td>
                        <td style={{ padding: '16px' }}>
                          {row.database !== '—' ? (
                            <span style={{ fontSize: '11px', color: C.grey, backgroundColor: C.off, padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
                              {row.database}
                            </span>
                          ) : (
                            <span style={{ fontSize: '12px', color: C.grey }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: '16px' }}>
                          {row.query !== '—' ? (
                            <span style={{ fontSize: '11px', color: C.sage, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              ▸ {row.query}
                            </span>
                          ) : (
                            <span style={{ fontSize: '12px', color: C.grey }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: '16px', fontSize: '12px', color: C.darkest, lineHeight: '1.5' }}>{row.thinking}</td>
                        <td style={{ padding: '16px' }}>
                          {row.next !== '—' ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: C.grey }}>
                              <span>→</span>
                              <span style={{ fontWeight: '500', color: C.darkGreen }}>{row.next}</span>
                            </div>
                          ) : (
                            <span style={{ fontSize: '12px', color: C.grey }}>—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div style={{ backgroundColor: C.darkGreen, padding: '32px', borderBottom: `1px solid ${C.sage}40` }}>
        <div style={{ maxWidth: conversationOpen ? 'none' : '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '11px', color: C.sage, marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Regional Sales Manager • Integrated Dashboard</div>
              <h1 style={{ fontSize: '32px', fontWeight: '300', color: C.cream, marginBottom: '8px', letterSpacing: '-0.02em' }}>{data.rsmName}</h1>
              <div style={{ fontSize: '14px', color: C.sage, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} strokeWidth={1.5} />
                <span>{data.region}</span>
                <span style={{ margin: '0 8px', opacity: 0.4 }}>•</span>
                <span>{data.team} ASMs</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              {[
                ['Achievement', `${data.achievement}%`],
                ['Gross Margin', `${data.gm}%`],
                ['Working Capital', `₹${data.wc}Cr`]
              ].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: '11px', color: C.sage, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
                  <div style={{ fontSize: '28px', fontWeight: '300', color: C.cream }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: C.off, borderBottom: `1px solid ${C.darkGreen}15`, padding: '0 32px' }}>
        <div style={{ maxWidth: conversationOpen ? 'none' : '1400px', margin: '0 auto', display: 'flex', gap: '8px' }}>
          {['dashboard', 'decisions', 'deepdive', 'askmorrie'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '16px 24px',
                fontSize: '14px',
                fontWeight: activeTab === tab ? '600' : '400',
                color: activeTab === tab ? C.darkGreen : C.grey,
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? `2px solid ${C.darkGreen}` : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                textTransform: 'capitalize'
              }}
            >
              {tab === 'deepdive' ? 'TSM Performance' : tab === 'askmorrie' ? 'Ask Morrie' : tab === 'decisions' ? 'Pricing & Promotions' : 'Dashboard'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', overflow: 'hidden', minHeight: 'calc(100vh - 190px)' }}>
        <div style={{ flex: conversationOpen ? '1 1 60%' : '1 1 100%', overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: conversationOpen ? 'none' : '1400px', margin: '0 auto' }}>
            
            {activeTab === 'dashboard' && (
              <>
                {/* Critical Issues */}
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${C.terra}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AlertCircle size={20} color={C.terra} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '22px', fontWeight: '500', color: C.darkGreen, margin: 0 }}>Critical Business Issues</h2>
                      <p style={{ fontSize: '13px', color: C.grey, margin: 0 }}>{data.issues.length} multi-dimensional issues requiring immediate action</p>
                    </div>
                  </div>

                  {data.issues.map(i => (
                    <div key={i.id} style={{ backgroundColor: 'white', borderRadius: '4px', border: `2px solid ${sColor(i.sev)}40`, overflow: 'hidden', marginBottom: '16px' }}>
                      <div style={{ padding: '24px', borderBottom: `1px solid ${C.darkGreen}10` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em', color: sColor(i.sev), backgroundColor: `${sColor(i.sev)}20`, padding: '4px 8px', borderRadius: '2px', textTransform: 'uppercase' }}>{i.sev}</span>
                          <span style={{ fontSize: '12px', color: C.grey }}>Owner: {i.owner}</span>
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, marginBottom: '8px' }}>{i.title}</h3>
                        <div style={{ fontSize: '14px' }}>
                          <span style={{ color: C.grey }}>Primary Impact: </span>
                          <strong style={{ color: C.terra, fontSize: '16px' }}>{i.impact.val}</strong>
                          {i.impact.pct && <span style={{ color: C.terra, marginLeft: '6px' }}>({i.impact.pct}%)</span>}
                        </div>

                        <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '4px', marginTop: '16px', marginBottom: '16px' }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: C.grey, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Integrated Diagnosis Across Dimensions</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {Object.entries(i.dims).map(([d, dt]) => (
                              <div key={d} style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', borderLeft: `3px solid ${sColor(dt.sev)}` }}>
                                <div style={{ fontSize: '10px', fontWeight: '600', color: sColor(dt.sev), marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                  {d === 'execution' && '🎯 '}{d === 'finance' && '💰 '}{d === 'supply' && '📦 '}{d === 'margin' && '💹 '}{d === 'forecast' && '📊 '}{d}
                                </div>
                                <div style={{ fontSize: '12px', color: C.darkest, marginBottom: '4px', lineHeight: '1.4' }}>{dt.issue}</div>
                                <div style={{ fontSize: '11px', color: C.grey }}>{dt.impact}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                          {Object.entries(i.bizImpact).map(([k, v]) => (
                            <div key={k} style={{ padding: '12px', backgroundColor: `${C.terra}08`, borderRadius: '4px' }}>
                              <div style={{ fontSize: '10px', color: C.grey, marginBottom: '4px', textTransform: 'uppercase' }}>
                                {k === 'gm' ? 'GM Impact' : k === 'wc' ? 'Working Capital' : k}
                              </div>
                              <div style={{ fontSize: '16px', fontWeight: '600', color: C.terra }}>
                                {typeof v === 'number' ? (v > 0 ? '+' : '') + v + (k === 'gm' ? '%' : '') : v}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div style={{ padding: '16px', backgroundColor: `${C.sage}10`, borderRadius: '4px' }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>⚡ Recommended Actions</div>
                          {i.actions.map((a, j) => (
                            <div key={j} style={{ padding: '10px 12px', backgroundColor: 'white', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: j < i.actions.length - 1 ? '8px' : 0 }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', fontWeight: '500', color: C.darkGreen, marginBottom: '2px' }}>{j + 1}. {a.act}</div>
                                <div style={{ fontSize: '11px', color: C.grey }}>Cost: {a.cost}</div>
                              </div>
                              <div style={{ fontSize: '12px', fontWeight: '600', color: C.sage }}>{a.impact}</div>
                            </div>
                          ))}
                          {i.outcome && (
                            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${C.sage}30`, fontSize: '13px' }}>
                              <strong style={{ color: C.darkGreen }}>Expected Outcome: </strong>
                              <span style={{ color: C.darkest }}>
                                {Object.entries(i.outcome).map(([k, v], idx) => `${k}: ${v}${idx < Object.entries(i.outcome).length - 1 ? ', ' : ''}`)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ padding: '16px 24px', backgroundColor: C.off, display: 'flex', gap: '12px' }}>
                        <button onClick={() => openConv({ type: 'issue', name: i.title, data: i })} style={{ flex: 1, padding: '12px', backgroundColor: C.darkGreen, color: 'white', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <MessageSquare size={14} />Analyze with AI
                        </button>
                        <button style={{ flex: 1, padding: '12px', backgroundColor: C.sage, color: 'white', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <Zap size={14} />Build Plan
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insights */}
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${C.sage}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Target size={20} color={C.sage} />
                      </div>
                      <div>
                        <h2 style={{ fontSize: '22px', fontWeight: '500', color: C.darkGreen, margin: 0 }}>AI Insights & Cross-Dimensional Patterns</h2>
                        <p style={{ fontSize: '13px', color: C.grey, margin: 0 }}>Patterns detected across all dimensions</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {[
                      { type: 'cascade', c: C.terra, lbl: '🔍 Root Cause Cascade', ttl: 'Manpower shortages triggering credit stress', dsc: 'Execution gaps → Lower revenue → Slower collections → Credit rises → Orders blocked. Affecting 60% of underperforming.' },
                      { type: 'margin', c: C.sage, lbl: '💡 Margin Opportunity', ttl: '₹2.1Cr margin recovery through SKU mix', dsc: 'High-margin SKU 35% vs 45% target. Amit achieves 48%. Replicating recovers ₹2.1Cr in absolute margin.' },
                      { type: 'wc', c: C.warn, lbl: '⚠️ Cash Flow Risk', ttl: '₹5.2Cr locked in aged receivables', dsc: 'WC stress from >45d receivables. 3 distributors near limits risking ₹1.2Cr blocks.' },
                      { type: 'supply', c: C.sage, lbl: '📈 Quick Win', ttl: 'Fulfill ₹2.8Cr backlog via stock movement', dsc: 'Thane WH excess (480 units) while Mumbai has ₹2.8Cr backlog. Inter-branch movement (₹35k) fulfills immediately. 80x ROI.' }
                    ].map((ins, idx) => (
                      <div key={idx} onClick={() => openConv({ type: ins.type, name: ins.ttl })} style={{ padding: '20px', backgroundColor: `${ins.c}08`, borderRadius: '4px', border: `1.5px solid ${ins.c}30`, cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: ins.c, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{ins.lbl}</div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', color: C.darkGreen, marginBottom: '10px', lineHeight: '1.3' }}>{ins.ttl}</h3>
                        <p style={{ fontSize: '13px', color: C.darkest, lineHeight: '1.6', margin: 0 }}>{ins.dsc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Snapshot */}
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: '500', color: C.darkGreen, marginBottom: '20px' }}>Team Performance Snapshot</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                    {data.asms.map(a => (
                      <div key={a.id} style={{ backgroundColor: 'white', borderRadius: '4px', border: `2px solid ${hColor(a.health)}40`, padding: '20px', cursor: 'pointer', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }} onClick={() => openConv({ type: 'asm', name: a.name, data: a })} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: hColor(a.health) }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: hColor(a.health) }}></div>
                          <span style={{ fontSize: '10px', fontWeight: '600', color: hColor(a.health), letterSpacing: '0.05em', textTransform: 'uppercase' }}>{hLabel(a.health)}</span>
                        </div>
                        <h3 style={{ fontSize: '15px', fontWeight: '600', color: C.darkGreen, marginBottom: '4px' }}>{a.name}</h3>
                        <div style={{ fontSize: '12px', color: C.grey, marginBottom: '16px' }}>{a.territory}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                          {[
                            ['Achievement', a.m.ach + '%', a.m.ach >= 85],
                            ['GM%', a.m.gm + '%', a.m.gm >= data.targetGM],
                            ['Credit', a.m.credit, a.m.credit !== 'At Risk'],
                            ['Stock Issues', a.m.stock + ' SKUs', a.m.stock === 0]
                          ].map(([l, v, ok]) => (
                            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                              <span style={{ color: C.grey }}>{l}:</span>
                              <strong style={{ color: ok ? C.sage : C.terra }}>{v}</strong>
                            </div>
                          ))}
                        </div>
                        {a.alerts > 0 && <div style={{ padding: '8px', backgroundColor: `${C.terra}15`, borderRadius: '4px', fontSize: '11px', fontWeight: '600', color: C.terra, textAlign: 'center' }}>{a.alerts} alert{a.alerts > 1 ? 's' : ''}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'decisions' && (
              <>
                {/* Pricing & Promotion Decision Cards */}
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${C.sage}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUp size={20} color={C.sage} />
                      </div>
                      <div>
                        <h2 style={{ fontSize: '22px', fontWeight: '500', color: C.darkGreen, margin: 0 }}>Pricing & Promotion Decisions</h2>
                        <p style={{ fontSize: '13px', color: C.grey, margin: 0 }}>AI-recommended actions for immediate revenue and margin impact</p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Pricing Decisions */}
                    <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px', border: `2px solid ${C.sage}30`, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: C.sage }}></div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>💰 PRICING DECISION</div>
                          <h3 style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, marginBottom: '8px', lineHeight: '1.3' }}>Increase Independence Premium 200g MRP by ₹5</h3>
                          <div style={{ fontSize: '13px', color: C.grey, marginBottom: '16px' }}>Premium outlets (S Mumbai, Bandra) show low price sensitivity. Competition priced 8-12% higher. Current ₹45 MRP undervalued.</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '24px' }}>
                          <button onClick={() => openDecisionTrail('pricing')} style={{ padding: '10px 20px', backgroundColor: 'transparent', color: C.darkGreen, border: `1px solid ${C.darkGreen}30`, borderRadius: '4px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Activity size={14} />Decision Trail
                          </button>
                          <button style={{ padding: '10px 20px', backgroundColor: C.sage, color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MessageSquare size={14} />Ask Morrie
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Coverage</div>
                          <div style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, marginBottom: '2px' }}>600</div>
                          <div style={{ fontSize: '11px', color: C.grey }}>premium outlets</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.sage}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Revenue Impact</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.sage }}>+₹45L</div>
                          <div style={{ fontSize: '11px', color: C.sage }}>18% of total</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.sage}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>GM Impact</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.sage }}>+1.2%</div>
                          <div style={{ fontSize: '11px', color: C.sage }}>margin lift</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.warn}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Volume Risk</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.warn }}>-3%</div>
                          <div style={{ fontSize: '11px', color: C.warn }}>elasticity</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>AI Confidence</div>
                          <div style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen }}>94%</div>
                          <div style={{ fontSize: '11px', color: C.grey }}>high</div>
                        </div>
                      </div>

                      <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: C.grey, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>IMPLEMENTATION PLAN</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div>
                            <div style={{ fontSize: '12px', color: C.darkest, marginBottom: '8px' }}><strong>Timeline:</strong> Jan 1, 2025 (Q4 start) • 2 weeks transition</div>
                            <div style={{ fontSize: '12px', color: C.darkest }}><strong>Distributor margin:</strong> Hold at 8% (absorb ₹0.40)</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', color: C.darkest, marginBottom: '8px' }}><strong>Retailer margin:</strong> +₹2 per unit incentive for display</div>
                            <div style={{ fontSize: '12px', color: C.darkest }}><strong>Monitoring:</strong> Weekly price elasticity tracking</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ padding: '16px', backgroundColor: `${C.sage}08`, borderRadius: '6px', marginBottom: '20px', borderLeft: `3px solid ${C.sage}` }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Zap size={14} />START A WHAT-IF ANALYSIS
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                          {[
                            'What if volume drops by 5% instead of 3%?',
                            'What if we only increase by ₹3 instead of ₹5?',
                            'What if competitors match our price increase?',
                            'What if we extend this to 500 more outlets?'
                          ].map((q, idx) => (
                            <button key={idx} style={{ padding: '10px 12px', backgroundColor: 'white', border: `1px solid ${C.sage}30`, borderRadius: '4px', fontSize: '12px', color: C.darkGreen, textAlign: 'left', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${C.sage}10`; e.currentTarget.style.borderColor = C.sage; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = `${C.sage}30`; }}>
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px', border: `2px solid ${C.terra}30`, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: C.terra }}></div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: C.terra, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>🎯 PROMOTION DECISION</div>
                          <h3 style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, marginBottom: '8px', lineHeight: '1.3' }}>Jio Hair Care 3+1 Bundle in Thane/Kalyan</h3>
                          <div style={{ fontSize: '13px', color: C.grey, marginBottom: '16px' }}>Low pack conversion (40% single packs). Competitor running 2+1. Inventory available. Q4 volume push needed.</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '24px' }}>
                          <button onClick={() => openDecisionTrail('promotion')} style={{ padding: '10px 20px', backgroundColor: 'transparent', color: C.darkGreen, border: `1px solid ${C.darkGreen}30`, borderRadius: '4px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Activity size={14} />Decision Trail
                          </button>
                          <button style={{ padding: '10px 20px', backgroundColor: C.terra, color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MessageSquare size={14} />Ask Morrie
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Coverage</div>
                          <div style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, marginBottom: '2px' }}>400</div>
                          <div style={{ fontSize: '11px', color: C.grey }}>outlets</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.sage}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Revenue Uplift</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.sage }}>+₹38L</div>
                          <div style={{ fontSize: '11px', color: C.sage }}>12% of total</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.terra}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Cost</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.terra }}>₹9.2L</div>
                          <div style={{ fontSize: '11px', color: C.terra }}>scheme cost</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.sage}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>ROI</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.sage }}>4.1x</div>
                          <div style={{ fontSize: '11px', color: C.sage }}>return</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>AI Confidence</div>
                          <div style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen }}>91%</div>
                          <div style={{ fontSize: '11px', color: C.grey }}>high</div>
                        </div>
                      </div>

                      <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: C.grey, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>IMPLEMENTATION PLAN</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div>
                            <div style={{ fontSize: '12px', color: C.darkest, marginBottom: '8px' }}><strong>Duration:</strong> 4 weeks (Dec 15 - Jan 12)</div>
                            <div style={{ fontSize: '12px', color: C.darkest }}><strong>Scheme:</strong> Buy 3 packs, get 1 free (₹23 cost/bundle)</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', color: C.darkest, marginBottom: '8px' }}><strong>POS:</strong> Counter display + shelf talker (₹2k/outlet)</div>
                            <div style={{ fontSize: '12px', color: C.darkest }}><strong>Target:</strong> 16,000 bundles • Break-even: 4,200</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ padding: '16px', backgroundColor: `${C.terra}08`, borderRadius: '6px', marginBottom: '20px', borderLeft: `3px solid ${C.terra}` }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: C.terra, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Zap size={14} />START A WHAT-IF ANALYSIS
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                          {[
                            'What if we only order 50% now and wait for campaign results?',
                            'What if we increase the order by 20% given campaign uncertainty?',
                            'What if the campaign gets delayed by 2 weeks?',
                            'What if competitor matches our 3+1 offer?'
                          ].map((q, idx) => (
                            <button key={idx} style={{ padding: '10px 12px', backgroundColor: 'white', border: `1px solid ${C.terra}30`, borderRadius: '4px', fontSize: '12px', color: C.darkGreen, textAlign: 'left', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${C.terra}10`; e.currentTarget.style.borderColor = C.terra; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = `${C.terra}30`; }}>
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px', border: `2px solid ${C.warn}30`, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: C.warn }}></div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: C.warn, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>🎁 TRADE SCHEME</div>
                          <h3 style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, marginBottom: '8px', lineHeight: '1.3' }}>Shah Distributor: Volume Rebate to Clear Credit</h3>
                          <div style={{ fontSize: '13px', color: C.grey, marginBottom: '16px' }}>Shah at 95% credit utilization blocking orders. Needs incentive to push higher velocity and generate cash for collections.</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '24px' }}>
                          <button onClick={() => openDecisionTrail('trade')} style={{ padding: '10px 20px', backgroundColor: 'transparent', color: C.darkGreen, border: `1px solid ${C.darkGreen}30`, borderRadius: '4px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Activity size={14} />Decision Trail
                          </button>
                          <button style={{ padding: '10px 20px', backgroundColor: C.warn, color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MessageSquare size={14} />Ask Morrie
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Coverage</div>
                          <div style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, marginBottom: '2px' }}>2</div>
                          <div style={{ fontSize: '11px', color: C.grey }}>distributors</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.sage}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Revenue Push</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.sage }}>+₹65L</div>
                          <div style={{ fontSize: '11px', color: C.sage }}>incremental</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.warn}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Scheme Cost</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.warn }}>₹18L</div>
                          <div style={{ fontSize: '11px', color: C.warn }}>total rebate</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.sage}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>DSO Impact</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.sage }}>-5 days</div>
                          <div style={{ fontSize: '11px', color: C.sage }}>improvement</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>AI Confidence</div>
                          <div style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen }}>88%</div>
                          <div style={{ fontSize: '11px', color: C.grey }}>high</div>
                        </div>
                      </div>

                      <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: C.grey, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>IMPLEMENTATION PLAN</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div>
                            <div style={{ fontSize: '12px', color: C.darkest, marginBottom: '8px' }}><strong>Tier 1:</strong> ₹30L billing → 1.5% rebate (₹45k)</div>
                            <div style={{ fontSize: '12px', color: C.darkest }}><strong>Tier 2:</strong> ₹40L billing → 2.5% rebate (₹1L)</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', color: C.darkest, marginBottom: '8px' }}><strong>Condition:</strong> DSO below 38 days to claim</div>
                            <div style={{ fontSize: '12px', color: C.darkest }}><strong>Duration:</strong> Jan-Feb (8 weeks)</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ padding: '16px', backgroundColor: `${C.warn}08`, borderRadius: '6px', marginBottom: '20px', borderLeft: `3px solid ${C.warn}` }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: C.warn, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Zap size={14} />START A WHAT-IF ANALYSIS
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                          {[
                            'What if Shah doesn\'t improve collections despite rebate?',
                            'What if we structure it as upfront discount vs rebate?',
                            'What if other distributors demand similar terms?',
                            'What if we add a margin improvement condition?'
                          ].map((q, idx) => (
                            <button key={idx} style={{ padding: '10px 12px', backgroundColor: 'white', border: `1px solid ${C.warn}30`, borderRadius: '4px', fontSize: '12px', color: C.darkGreen, textAlign: 'left', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${C.warn}10`; e.currentTarget.style.borderColor = C.warn; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = `${C.warn}30`; }}>
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px', border: `2px solid ${C.sage}30`, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: C.sage }}></div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>📦 PACK ARCHITECTURE</div>
                          <h3 style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, marginBottom: '8px', lineHeight: '1.3' }}>Launch Independence 400g Economy Pack</h3>
                          <div style={{ fontSize: '13px', color: C.grey, marginBottom: '16px' }}>Economy shift (62%→67%). Gap between 200g (₹45) and 500g (₹105). Price-conscious consumers dropping to competition.</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '24px' }}>
                          <button onClick={() => openDecisionTrail('pack')} style={{ padding: '10px 20px', backgroundColor: 'transparent', color: C.darkGreen, border: `1px solid ${C.darkGreen}30`, borderRadius: '4px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Activity size={14} />Decision Trail
                          </button>
                          <button style={{ padding: '10px 20px', backgroundColor: C.sage, color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MessageSquare size={14} />Ask Morrie
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Coverage</div>
                          <div style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, marginBottom: '2px' }}>1,200</div>
                          <div style={{ fontSize: '11px', color: C.grey }}>mass outlets</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.sage}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Incremental</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.sage }}>+₹82L</div>
                          <div style={{ fontSize: '11px', color: C.sage }}>new revenue</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.terra}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Cannibalization</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.terra }}>-₹28L</div>
                          <div style={{ fontSize: '11px', color: C.terra }}>from 200g</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: `${C.sage}10`, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>Net Impact</div>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: C.sage }}>+₹54L</div>
                          <div style={{ fontSize: '11px', color: C.sage }}>total gain</div>
                        </div>
                        <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px' }}>
                          <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase', fontWeight: '600' }}>AI Confidence</div>
                          <div style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen }}>92%</div>
                          <div style={{ fontSize: '11px', color: C.grey }}>high</div>
                        </div>
                      </div>

                      <div style={{ padding: '16px', backgroundColor: C.off, borderRadius: '6px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: C.grey, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>IMPLEMENTATION PLAN</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div>
                            <div style={{ fontSize: '12px', color: C.darkest, marginBottom: '8px' }}><strong>MRP:</strong> ₹75 (₹18.75/100g vs ₹22.5 for 200g)</div>
                            <div style={{ fontSize: '12px', color: C.darkest }}><strong>Launch:</strong> Feb 1 with introductory ₹5 off</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', color: C.darkest, marginBottom: '8px' }}><strong>Distribution:</strong> 1,200 mass outlets first</div>
                            <div style={{ fontSize: '12px', color: C.darkest }}><strong>Trade margin:</strong> 10% (vs 8% for 200g)</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ padding: '16px', backgroundColor: `${C.sage}08`, borderRadius: '6px', marginBottom: '20px', borderLeft: `3px solid ${C.sage}` }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Zap size={14} />START A WHAT-IF ANALYSIS
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                          {[
                            'What if cannibalization is 40% instead of 34%?',
                            'What if we price at ₹70 instead of ₹75?',
                            'What if we skip the intro offer and go full price?',
                            'What if premium pack sales drop by 5%?'
                          ].map((q, idx) => (
                            <button key={idx} style={{ padding: '10px 12px', backgroundColor: 'white', border: `1px solid ${C.sage}30`, borderRadius: '4px', fontSize: '12px', color: C.darkGreen, textAlign: 'left', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${C.sage}10`; e.currentTarget.style.borderColor = C.sage; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = `${C.sage}30`; }}>
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'deepdive' && (
              <div>
                {data.asms.map(asm => (
                  <div key={asm.id} style={{ marginBottom: '24px', backgroundColor: 'white', borderRadius: '8px', border: `2px solid ${hColor(asm.health)}40`, overflow: 'hidden' }}>
                    {/* Rich ASM Header */}
                    <div onClick={() => setExpandedASM(expandedASM === asm.id ? null : asm.id)} style={{ padding: '24px', cursor: 'pointer', backgroundColor: C.off }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: hColor(asm.health) }}></div>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', color: C.darkGreen, margin: 0 }}>{asm.name}</h3>
                            <span style={{ fontSize: '12px', color: C.grey }}>{asm.territory}</span>
                            <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em', color: hColor(asm.health), backgroundColor: `${hColor(asm.health)}20`, padding: '4px 8px', borderRadius: '12px', textTransform: 'uppercase' }}>{hLabel(asm.health)}</span>
                          </div>
                          <p style={{ fontSize: '13px', color: C.darkest, lineHeight: '1.6', margin: 0 }}>{asm.insight}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '24px' }}>
                          <button onClick={(e) => { e.stopPropagation(); openConv({ type: 'asm', name: asm.name, data: asm }); }} style={{ padding: '10px 16px', backgroundColor: C.darkGreen, color: 'white', border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MessageSquare size={14} />Analyze
                          </button>
                          {expandedASM === asm.id ? <ChevronDown size={20} color={C.darkGreen} /> : <ChevronRight size={20} color={C.darkGreen} />}
                        </div>
                      </div>

                      {/* Mini Performance Dashboard */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                        {[
                          { label: 'Achievement', value: asm.m.ach + '%', ok: asm.m.ach >= 85, icon: Target },
                          { label: 'GM%', value: asm.m.gm + '%', ok: asm.m.gm >= data.targetGM, icon: TrendingUp },
                          { label: 'Credit Health', value: asm.m.credit, ok: asm.m.credit !== 'At Risk', icon: Activity },
                          { label: 'Distributors', value: asm.dists.length + ' active', ok: true, icon: Users }
                        ].map((metric, i) => (
                          <div key={i} style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px', border: `1px solid ${C.darkGreen}15` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <div style={{ fontSize: '11px', color: C.grey, textTransform: 'uppercase' }}>{metric.label}</div>
                              <metric.icon size={14} color={C.grey} />
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: '600', color: metric.ok ? C.sage : C.terra, marginBottom: '8px' }}>{metric.value}</div>
                            <Sparkline data={asm.trend} color={metric.ok ? C.sage : C.terra} height={30} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Distributors */}
                    {expandedASM === asm.id && asm.dists.length > 0 && (
                      <div style={{ padding: '24px', borderTop: `2px solid ${C.darkGreen}15` }}>
                        {asm.dists.map(dist => (
                          <div key={dist.id} style={{ marginBottom: '24px', padding: '20px', backgroundColor: C.off, borderRadius: '8px', border: `2px solid ${hColor(dist.health)}40` }}>
                            {/* Rich Distributor Header */}
                            <div onClick={() => setExpandedDist(expandedDist === dist.id ? null : dist.id)} style={{ cursor: 'pointer' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: C.darkGreen, margin: 0 }}>{dist.name}</h4>
                                    <span style={{ fontSize: '10px', fontWeight: '600', color: hColor(dist.health), backgroundColor: `${hColor(dist.health)}20`, padding: '3px 8px', borderRadius: '8px', textTransform: 'uppercase' }}>{hLabel(dist.health)}</span>
                                    {dist.gap > 0 && <span style={{ fontSize: '11px', color: C.terra, backgroundColor: `${C.terra}15`, padding: '3px 8px', borderRadius: '8px' }}>{dist.gap} vacant beat{dist.gap > 1 ? 's' : ''}</span>}
                                  </div>
                                  <p style={{ fontSize: '13px', color: C.darkest, lineHeight: '1.5', margin: 0 }}>{dist.insight}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}>
                                  <button onClick={(e) => { e.stopPropagation(); openConv({ type: 'distributor', name: dist.name, data: dist }); }} style={{ padding: '8px 14px', backgroundColor: C.sage, color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <MessageSquare size={12} />Analyze
                                  </button>
                                  {expandedDist === dist.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                </div>
                              </div>

                              {/* Distributor Performance Cards */}
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                {[
                                  { label: 'Achievement', value: dist.m.ach + '%', ok: dist.m.ach >= 85 },
                                  { label: 'GM%', value: dist.m.gm + '%', ok: dist.m.gm >= 25 },
                                  { label: 'Credit Util', value: dist.m.creditUtil + '%', ok: dist.m.creditUtil < 90 },
                                  { label: 'DSO', value: dist.m.dso + 'd', ok: dist.m.dso <= 35 },
                                  { label: 'Fulfillment', value: dist.m.fulfill + '%', ok: dist.m.fulfill >= 95 }
                                ].map((m, i) => (
                                  <div key={i} style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px' }}>
                                    <div style={{ fontSize: '10px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase' }}>{m.label}</div>
                                    <div style={{ fontSize: '20px', fontWeight: '600', color: m.ok ? C.sage : C.terra }}>{m.value}</div>
                                  </div>
                                ))}
                              </div>

                              {/* Root Cause Breakdown Chart */}
                              <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px' }}>
                                <div style={{ fontSize: '11px', fontWeight: '600', color: C.grey, marginBottom: '12px', textTransform: 'uppercase' }}>Root Cause Breakdown</div>
                                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', height: '24px' }}>
                                  {Object.entries(dist.rootCauseBreakdown).map(([cause, pct]) => (
                                    <div key={cause} style={{ width: `${pct}%`, backgroundColor: { execution: C.terra, credit: C.warn, supply: C.sage, margin: '#9CA3AF', forecast: '#D1D5DB' }[cause], borderRadius: '2px' }} title={`${cause}: ${pct}%`}></div>
                                  ))}
                                </div>
                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                  {Object.entries(dist.rootCauseBreakdown).map(([cause, pct]) => (
                                    <div key={cause} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: { execution: C.terra, credit: C.warn, supply: C.sage, margin: '#9CA3AF', forecast: '#D1D5DB' }[cause] }}></div>
                                      <span style={{ fontSize: '12px', color: C.darkest, textTransform: 'capitalize' }}>{cause}: {pct}%</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Expanded TSR Details */}
                            {expandedDist === dist.id && dist.sales && dist.sales.length > 0 && (
                              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${C.darkGreen}15` }}>
                                <h5 style={{ fontSize: '16px', fontWeight: '600', color: C.darkGreen, marginBottom: '16px' }}>TSR Performance Details</h5>
                                
                                {/* TSR Comparison Bars */}
                                <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: 'white', borderRadius: '4px' }}>
                                  {dist.sales.map((tsr, i) => (
                                    <div key={tsr.id} style={{ marginBottom: i < dist.sales.length - 1 ? '16px' : 0 }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <div>
                                          <span style={{ fontSize: '14px', fontWeight: '600', color: C.darkGreen }}>{tsr.name}</span>
                                          <span style={{ fontSize: '12px', color: C.grey, marginLeft: '8px' }}>• {tsr.beat}</span>
                                        </div>
                                        <span style={{ fontSize: '18px', fontWeight: '600', color: tsr.ach >= 85 ? C.sage : C.terra }}>{tsr.ach}%</span>
                                      </div>
                                      <div style={{ height: '32px', backgroundColor: C.cream, borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                                        <div style={{ height: '100%', width: `${tsr.ach}%`, backgroundColor: tsr.ach >= 85 ? C.sage : C.terra, transition: 'width 0.3s' }}></div>
                                        <div style={{ position: 'absolute', left: '85%', top: 0, bottom: 0, width: '2px', backgroundColor: C.darkGreen, opacity: 0.3 }}></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Detailed TSR Cards */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                                  {dist.sales.map(tsr => (
                                    <div key={tsr.id} style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px', border: `1px solid ${hColor(tsr.health)}40` }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <div>
                                          <div style={{ fontSize: '15px', fontWeight: '600', color: C.darkGreen, marginBottom: '2px' }}>{tsr.name}</div>
                                          <div style={{ fontSize: '12px', color: C.grey }}>{tsr.beat}</div>
                                        </div>
                                        <div style={{ fontSize: '24px', fontWeight: '600', color: tsr.ach >= 85 ? C.sage : C.terra }}>{tsr.ach}%</div>
                                      </div>

                                      {/* Outlet Coverage */}
                                      <div style={{ padding: '12px', backgroundColor: C.off, borderRadius: '4px', marginBottom: '12px' }}>
                                        <div style={{ fontSize: '11px', color: C.grey, marginBottom: '6px', textTransform: 'uppercase' }}>Outlet Coverage</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                                          <span>Active: {tsr.outlets.active}</span>
                                          <span>Target: {tsr.outlets.target}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                          <span style={{ color: C.terra }}>Lost: {tsr.outlets.lost}</span>
                                          <span>{Math.round((tsr.outlets.active / tsr.outlets.target) * 100)}% coverage</span>
                                        </div>
                                      </div>

                                      {/* Productivity Metrics */}
                                      <div style={{ padding: '12px', backgroundColor: C.off, borderRadius: '4px', marginBottom: '12px' }}>
                                        <div style={{ fontSize: '11px', color: C.grey, marginBottom: '8px', textTransform: 'uppercase' }}>Productivity</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                          {[
                                            ['Calls/Day', tsr.productivity.calls],
                                            ['Orders/Day', tsr.productivity.orders],
                                            ['Lines/Order', tsr.productivity.lines]
                                          ].map(([l, v]) => (
                                            <div key={l}>
                                              <div style={{ fontSize: '9px', color: C.grey }}>{l}</div>
                                              <div style={{ fontSize: '16px', fontWeight: '600', color: C.darkGreen }}>{v}</div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Root Causes */}
                                      <div style={{ fontSize: '11px', color: C.grey, marginBottom: '8px', textTransform: 'uppercase' }}>Performance Drivers</div>
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                        {Object.entries(tsr.rc).map(([k, v]) => (
                                          <div key={k} style={{ padding: '8px', backgroundColor: v < -10 ? `${C.terra}10` : C.off, borderRadius: '4px' }}>
                                            <div style={{ fontSize: '9px', color: C.grey, fontWeight: '600', marginBottom: '4px', textTransform: 'uppercase' }}>{k === 'dist' ? 'Distribution' : k === 'days' ? 'Mandays' : 'Drop Size'}</div>
                                            <div style={{ fontSize: '16px', fontWeight: '700', color: v < 0 ? C.terra : C.sage }}>{v > 0 ? '+' : ''}{v}%</div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'askmorrie' && (
              <div style={{ height: 'calc(100vh - 240px)', display: 'flex', flexDirection: 'column' }}>
                {/* Chat Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '32px', backgroundColor: C.cream }}>
                  {chatMessages.length === 0 ? (
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: '600', color: C.darkGreen, marginBottom: '12px' }}>Popular questions:</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                          {[
                            'Where is growth really coming from?',
                            'Is the business getting stronger or more risky?',
                            'Old outlets vs new outlets - who drives growth?',
                            'Where are we working hard but not getting results?',
                            'Get extra ₹1 Cr without hurting margin?',
                            'Minimum levers to go from 95% → 102%?'
                          ].map((q, idx) => (
                            <button 
                              key={idx}
                              onClick={() => {
                                const typeMap = {
                                  'Where is growth really coming from?': 'growth',
                                  'Is the business getting stronger or more risky?': 'risk',
                                  'Old outlets vs new outlets - who drives growth?': 'outlets',
                                  'Where are we working hard but not getting results?': 'efficiency',
                                  'Get extra ₹1 Cr without hurting margin?': 'opportunity',
                                  'Minimum levers to go from 95% → 102%?': 'levers'
                                };
                                openConv({ type: 'business', subtype: typeMap[q], name: q });
                              }}
                              style={{ 
                                padding: '12px 14px', 
                                backgroundColor: 'white', 
                                border: `1.5px solid ${C.darkGreen}20`, 
                                borderRadius: '6px', 
                                fontSize: '13px', 
                                color: C.darkGreen, 
                                textAlign: 'left', 
                                cursor: 'pointer', 
                                fontFamily: "'Inter', sans-serif", 
                                transition: 'all 0.2s',
                                fontWeight: '500',
                                lineHeight: '1.3'
                              }}
                              onMouseEnter={e => { 
                                e.currentTarget.style.backgroundColor = `${C.sage}08`; 
                                e.currentTarget.style.borderColor = C.sage;
                                e.currentTarget.style.transform = 'translateX(4px)';
                              }}
                              onMouseLeave={e => { 
                                e.currentTarget.style.backgroundColor = 'white'; 
                                e.currentTarget.style.borderColor = `${C.darkGreen}20`;
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                      {chatMessages.map((m, i) => (
                        <div key={i} style={{ marginBottom: '24px' }}>
                          <div style={{ padding: '16px 20px', backgroundColor: m.type === 'user' ? C.darkGreen : 'white', color: m.type === 'user' ? C.cream : C.darkest, borderRadius: m.type === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', fontSize: '14px', lineHeight: '1.6', boxShadow: m.type === 'user' ? '0 2px 8px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.08)', border: m.type === 'user' ? 'none' : `1px solid ${C.darkGreen}10` }}>
                            {m.type === 'user' ? m.text : fmt(m.text)}
                          </div>
                          <div style={{ fontSize: '11px', color: C.grey, marginTop: '6px', paddingLeft: m.type === 'user' ? '0' : '4px', textAlign: m.type === 'user' ? 'right' : 'left' }}>{m.ts}</div>
                          {m.sugg && (
                            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ fontSize: '11px', color: C.grey, fontWeight: '500', paddingLeft: '4px' }}>Suggested follow-ups:</div>
                              {m.sugg.map((s, j) => (
                                <button key={j} onClick={() => sendMsg(s)} style={{ padding: '12px 16px', backgroundColor: 'white', border: `1.5px solid ${C.darkGreen}25`, borderRadius: '8px', fontSize: '13px', color: C.darkGreen, textAlign: 'left', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s', fontWeight: '500' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${C.sage}10`; e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.transform = 'translateX(4px)'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = `${C.darkGreen}25`; e.currentTarget.style.transform = 'translateX(0)'; }}>
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={chatMessagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div style={{ padding: '20px 32px', borderTop: `1px solid ${C.darkGreen}15`, backgroundColor: 'white' }}>
                  <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '12px' }}>
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={e => setInputMessage(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && sendMsg(inputMessage)}
                      placeholder="Ask anything about your territory..."
                      style={{
                        flex: 1,
                        padding: '14px 18px',
                        fontSize: '14px',
                        border: `1.5px solid ${C.darkGreen}30`,
                        borderRadius: '8px',
                        fontFamily: "'Inter', sans-serif",
                        outline: 'none',
                        backgroundColor: C.cream
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = C.sage}
                      onBlur={e => e.currentTarget.style.borderColor = `${C.darkGreen}30`}
                    />
                    <button
                      onClick={() => sendMsg(inputMessage)}
                      disabled={!inputMessage.trim()}
                      style={{
                        padding: '14px 28px',
                        backgroundColor: inputMessage.trim() ? C.darkGreen : C.grey,
                        color: C.cream,
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                        fontFamily: "'Inter', sans-serif",
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { if (inputMessage.trim()) e.currentTarget.style.backgroundColor = C.sage; }}
                      onMouseLeave={e => { if (inputMessage.trim()) e.currentTarget.style.backgroundColor = C.darkGreen; }}
                    >
                      Ask
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Conversation Panel */}
        {conversationOpen && activeTab !== 'askmorrie' && (
          <div style={{ flex: '0 0 40%', borderLeft: `1px solid ${C.darkGreen}15`, backgroundColor: 'white', display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
            <div style={{ padding: '20px', borderBottom: `1px solid ${C.darkGreen}15`, backgroundColor: C.off }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: C.sage, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '600', color: 'white' }}>M</div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: C.darkGreen, margin: 0 }}>Chat with Morrie</h3>
                  </div>
                  <p style={{ fontSize: '12px', color: C.grey, margin: 0, paddingLeft: '48px' }}>{conversationContext?.name}</p>
                </div>
                <button onClick={() => setConversationOpen(false)} style={{ padding: '6px', backgroundColor: 'transparent', color: C.grey, border: 'none', borderRadius: '4px', cursor: 'pointer' }}><X size={20} /></button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {chatMessages.map((m, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ padding: '16px 18px', backgroundColor: m.type === 'user' ? C.darkGreen : C.off, color: m.type === 'user' ? C.cream : C.darkest, borderRadius: m.type === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', fontSize: '14px', lineHeight: '1.6', boxShadow: m.type === 'user' ? '0 2px 4px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.05)' }}>
                    {m.type === 'user' ? m.text : fmt(m.text)}
                  </div>
                  <div style={{ fontSize: '11px', color: C.grey, marginTop: '6px', paddingLeft: m.type === 'user' ? '0' : '4px', textAlign: m.type === 'user' ? 'right' : 'left' }}>{m.ts}</div>
                  {m.sugg && (
                    <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ fontSize: '11px', color: C.grey, fontWeight: '500', paddingLeft: '4px' }}>Suggested questions:</div>
                      {m.sugg.map((s, j) => (
                        <button key={j} onClick={() => sendMsg(s)} style={{ padding: '12px 16px', backgroundColor: 'white', border: `1.5px solid ${C.darkGreen}25`, borderRadius: '8px', fontSize: '13px', color: C.darkGreen, textAlign: 'left', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s', fontWeight: '500' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${C.sage}10`; e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.transform = 'translateX(4px)'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = `${C.darkGreen}25`; e.currentTarget.style.transform = 'translateX(0)'; }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatMessagesEndRef} />
            </div>

            <div style={{ padding: '16px', borderTop: `1px solid ${C.darkGreen}15`, backgroundColor: C.off }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => { if (e.key === 'Enter') sendMsg(inputMessage); }} placeholder="Ask about any dimension..." style={{ flex: 1, padding: '12px 16px', border: `1px solid ${C.darkGreen}20`, borderRadius: '8px', fontSize: '13px', fontFamily: "'Inter', sans-serif", outline: 'none' }} />
                <button onClick={() => sendMsg(inputMessage)} style={{ padding: '12px 18px', backgroundColor: C.darkGreen, color: C.cream, border: 'none', borderRadius: '8px', cursor: 'pointer' }}><Send size={16} /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
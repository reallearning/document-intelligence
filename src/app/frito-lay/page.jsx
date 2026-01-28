"use client";
import React, { useState, useRef, useEffect, act } from 'react';
import { MessageSquare, TrendingUp, TrendingDown, AlertCircle, ChevronRight, Users, Package, MapPin, Activity, Send, X, Target, Sparkles, Clock, ChevronDown, BarChart3, Eye, Layers, Database, Brain } from 'lucide-react';

export default function RSMDashboard() {
  const [activeTab, setActiveTab] = useState('briefing');
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [expandedTerritory, setExpandedTerritory] = useState(null);
  const [trailOpen, setTrailOpen] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const chatMessagesEndRef = useRef(null);

    const territories = [
    {
      name: 'Rahul Verma',
      territory: 'Mumbai GT',
      achievement: 76,
      outlets: { total: 890, active: 605, productive: 485 },
      coverage: 68,
      premiumMix: 28,
      status: 'critical',
      trend: [82, 79, 73, 68],
      topIssue: 'Distribution gap and premium mix below potential',
      distributors: [
        {
          name: 'Sagar Distributors',
          territory: 'Andheri West & Bandra',
          monthlyVolume: '₹1.4Cr',
          outlets: { total: 285, active: 178, productive: 142 },
          orderFrequency: '2.2x weekly',
          achievement: 62,
          status: 'critical',
          metrics: {
            onTimeDelivery: '72%',
            stockRotation: '19 days',
            returns: '3.1%',
            creditDays: 22
          }
        },
        {
          name: 'Metro Distributors',
          territory: 'Borivali & Kandivali',
          monthlyVolume: '₹1.4Cr',
          outlets: { total: 320, active: 245, productive: 198 },
          orderFrequency: '2.6x weekly',
          achievement: 74,
          status: 'warning',
          metrics: {
            onTimeDelivery: '81%',
            stockRotation: '16 days',
            returns: '2.2%',
            creditDays: 20
          }
        },
        {
          name: 'Reliable Traders',
          territory: 'Malad & Goregaon',
          monthlyVolume: '₹1.0Cr',
          outlets: { total: 285, active: 182, productive: 145 },
          orderFrequency: '2.5x weekly',
          achievement: 68,
          status: 'warning',
          metrics: {
            onTimeDelivery: '78%',
            stockRotation: '18 days',
            returns: '2.6%',
            creditDays: 21
          }
        }
      ]
    },
    {
      name: 'Anjali Deshmukh',
      territory: 'Pune GT',
      achievement: 88,
      outlets: { total: 950, active: 865, productive: 720 },
      coverage: 91,
      premiumMix: 35,
      status: 'warning',
      trend: [92, 91, 89, 88],
      topIssue: 'Hadapsar wholesale cluster down 12%',
      distributors: [
        {
          name: 'Apex Trading Co',
          territory: 'Pune Central & Deccan',
          monthlyVolume: '₹1.8Cr',
          outlets: { total: 380, active: 342, productive: 298 },
          orderFrequency: '3.2x weekly',
          achievement: 92,
          status: 'healthy',
          metrics: {
            onTimeDelivery: '91%',
            stockRotation: '11 days',
            returns: '1.3%',
            creditDays: 17
          }
        },
        {
          name: 'Shivaji Distributors',
          territory: 'Hadapsar & Kharadi',
          monthlyVolume: '₹1.4Cr',
          outlets: { total: 295, active: 268, productive: 218 },
          orderFrequency: '2.8x weekly',
          achievement: 78,
          status: 'warning',
          metrics: {
            onTimeDelivery: '86%',
            stockRotation: '14 days',
            returns: '1.8%',
            creditDays: 19
          }
        },
        {
          name: 'Ganesh Enterprises',
          territory: 'Wakad & Hinjewadi',
          monthlyVolume: '₹1.0Cr',
          outlets: { total: 275, active: 255, productive: 204 },
          orderFrequency: '3.1x weekly',
          achievement: 89,
          status: 'healthy',
          metrics: {
            onTimeDelivery: '89%',
            stockRotation: '12 days',
            returns: '1.4%',
            creditDays: 18
          }
        }
      ]
    },
    {
      name: 'Sandeep Kumar',
      territory: 'Thane GT',
      achievement: 105,
      outlets: { total: 780, active: 780, productive: 685 },
      coverage: 100,
      premiumMix: 52,
      status: 'healthy',
      trend: [99, 102, 104, 105],
      topIssue: 'Benchmark performance - replicate practices',
      distributors: [
        {
          name: 'Premier Supplies',
          territory: 'Thane West',
          monthlyVolume: '₹1.5Cr',
          outlets: { total: 410, active: 410, productive: 362 },
          orderFrequency: '3.5x weekly',
          achievement: 108,
          status: 'healthy',
          metrics: {
            onTimeDelivery: '97%',
            stockRotation: '9 days',
            returns: '0.7%',
            creditDays: 15
          }
        },
        {
          name: 'Lokhandwala Trading',
          territory: 'Thane East',
          monthlyVolume: '₹1.1Cr',
          outlets: { total: 370, active: 370, productive: 323 },
          orderFrequency: '3.3x weekly',
          achievement: 102,
          status: 'healthy',
          metrics: {
            onTimeDelivery: '95%',
            stockRotation: '10 days',
            returns: '0.9%',
            creditDays: 16
          }
        }
      ]
    },
    {
      name: 'Meera Iyer',
      territory: 'Navi Mumbai GT',
      achievement: 90,
      outlets: { total: 620, active: 595, productive: 510 },
      coverage: 96,
      premiumMix: 33,
      status: 'healthy',
      trend: [89, 90, 90, 90],
      topIssue: 'Stable performance, no critical issues',
      distributors: [
        {
          name: 'Coastal Distributors',
          territory: 'Vashi & Nerul',
          monthlyVolume: '₹1.3Cr',
          outlets: { total: 345, active: 332, productive: 285 },
          orderFrequency: '3.1x weekly',
          achievement: 91,
          status: 'healthy',
          metrics: {
            onTimeDelivery: '90%',
            stockRotation: '11 days',
            returns: '1.1%',
            creditDays: 17
          }
        },
        {
          name: 'Panvel Trading Co',
          territory: 'Panvel & Kharghar',
          monthlyVolume: '₹0.8Cr',
          outlets: { total: 275, active: 263, productive: 225 },
          orderFrequency: '3.3x weekly',
          achievement: 89,
          status: 'healthy',
          metrics: {
            onTimeDelivery: '92%',
            stockRotation: '10 days',
            returns: '1.3%',
            creditDays: 16
          }
        }
      ]
    }
  ];

  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

 const C = {
    green: '#0C2C18',
    sage: '#85A383',
    cream: '#E7DDCA',
    darkGrey: '#1B2A21',
    lightGrey: '#878B87',
    white: '#FFFFFF',
    offWhite: '#FDFCFA',
    lightSage: '#C8D5C7'
  };

  const briefingPoints = [
    {
      type: 'critical',
      title: 'Mumbai Central premium portfolio underperforming',
      detail: 'ASM Rajesh\'s territory at 76% achievement on premium SKUs. Distributor stockout pattern identified - 4 distributors showing recurring gaps in Doritos & Cheetos. Immediate intervention required.',
      action: 'Review distributor capability with Rajesh today'
    },
    {
      type: 'opportunity',
      title: 'Thane West replication blueprint ready',
      detail: 'ASM Meera\'s territory at 112% - TSM network executing 94% numeric distribution vs 78% region average. Distribution strategy document ready for rollout to other ASMs.',
      action: 'Territory deep dive meeting scheduled 11 AM'
    },
    {
      type: 'alert',
      title: 'Festival pre-positioning behind schedule',
      detail: '18 days to Holi. Only 62% of target outlets have festival SKU displays vs 85% target. Western suburbs lagging at 54%. ASM Pradeep needs merchandising support.',
      action: 'Deploy additional merchandisers to Western territory'
    },
    {
      type: 'performance',
      title: 'Monthly run-rate tracking to 89% achievement',
      detail: 'Need Rs 2.4Cr in next 18 days to hit target. Eastern suburbs momentum strong at 96%. Central & Western need Rs 1.8Cr recovery between them.',
      action: 'Focus ASM meetings on Central/Western acceleration'
    },
    {
      type: 'highlight',
      title: 'New distributor onboarding impacting Malad',
      detail: 'Transition from Gupta Distributors to Shah Enterprises causing 12% dip in Malad pocket. TSM team reporting teething issues with order systems.',
      action: 'Direct intervention on distributor systems & TSM training'
    }
  ];

  const insights = [
    {
      id: 1,
      priority: 'critical',
      title: 'Premium SKU distribution gap costing Rs 2.2Cr quarterly across Mumbai region',
      summary: 'Doritos & Cheetos achieving only 68% numeric distribution vs 92% for core Lays portfolio',
      keyNumbers: {
        revenueLoss: 'Rs 2.2Cr quarterly',
        distributionGap: '68% vs 92% target',
        affectedOutlets: '1,240 of 3,850 outlets',
        topASMgap: 'Central territory 24 pts below'
      },
      narrative: "Internal DMS data shows premium portfolio (Doritos, Cheetos, Kurkure premium variants) achieving 68% numeric distribution vs 92% for core Lays across Mumbai region's 3,850 outlets. Gap acute in Central territory (ASM Rajesh) at 61% vs Eastern at 79% (ASM Meera). Secondary sales analysis reveals 4 of 18 distributors consistently failing to stock premium SKUs.",
      deepDive: {
        asmLevel: [
          { asm: 'Rajesh Kumar', territory: 'Central Mumbai', achievement: '76%', premiumDist: '61%', distributors: 6, gap: 'Rs 85L quarterly', issue: '2 distributors with WC constraints, TSM training gap' },
          { asm: 'Meera Patil', territory: 'Eastern Suburbs', achievement: '112%', premiumDist: '79%', distributors: 5, gap: 'Rs 42L opportunity', issue: 'Minor - outlet coverage in new areas' },
          { asm: 'Pradeep Shah', territory: 'Western Suburbs', achievement: '88%', premiumDist: '64%', distributors: 4, gap: 'Rs 68L quarterly', issue: '1 distributor transition, TSM prioritization' },
          { asm: 'Amit Desai', territory: 'Thane', achievement: '103%', premiumDist: '74%', distributors: 3, gap: 'Rs 27L opportunity', issue: 'Outlet expansion catching up' }
        ],
        distributorLevel: [
          { distributor: 'Gupta Enterprises', asm: 'Rajesh Kumar', coverage: '420 outlets', premiumDist: '48%', issue: 'Working capital constraints - taking only fast movers', monthlyPotential: 'Rs 18L', action: 'WC support discussion' },
          { distributor: 'Shah Trading Co', asm: 'Pradeep Shah', coverage: '380 outlets', premiumDist: '52%', issue: 'New distributor - system issues', monthlyPotential: 'Rs 16L', action: 'Intensive onboarding' },
          { distributor: 'Mumbai Suppliers', asm: 'Rajesh Kumar', coverage: '285 outlets', premiumDist: '58%', issue: 'TSM preferring core SKUs', monthlyPotential: 'Rs 12L', action: 'TSM incentive restructure' },
          { distributor: 'Sai Distributors', asm: 'Pradeep Shah', coverage: '155 outlets', premiumDist: '61%', issue: 'Limited van capacity', monthlyPotential: 'Rs 8L', action: 'Route optimization' }
        ],
        tsmLevel: [
          { tsm: 'Vikram Joshi', distributor: 'Gupta Enterprises', outlets: 142, premiumCall: '41%', coreCall: '89%', issue: 'Avoiding premium SKUs due to returns history', solution: 'Premium SKU training' },
          { tsm: 'Rahul Patil', distributor: 'Shah Trading Co', outlets: 128, premiumCall: '38%', coreCall: '86%', issue: 'New distributor - unfamiliar with premium', solution: 'Premium familiarization' },
          { tsm: 'Suresh Kamble', distributor: 'Mumbai Suppliers', outlets: 96, premiumCall: '52%', coreCall: '91%', issue: 'Margin pressure on premium', solution: 'Incentive restructure' },
          { tsm: 'Anil Sharma', distributor: 'Gupta Enterprises', outlets: 86, premiumCall: '45%', coreCall: '87%', issue: 'Limited beat time', solution: 'Beat restructuring' }
        ]
      },
      recommendation: {
        action: "Phase 1 (Week 1-2): WC support to 2 distributors, intensive TSM training. Phase 2 (Week 3-4): Incentive restructure, beat optimization.",
        cost: "WC support: Rs 8L, TSM training: Rs 2L, incentive adjustment: Rs 3L monthly",
        return: "Distribution improvement to 84% unlocks Rs 1.6Cr quarterly",
        roi: "4-week payback"
      },
      agentTrail: [
        { 
          time: '08:23:14',
          agent: 'Orchestrator',
          action: 'Initiated Analysis',
          database: null,
          query: null,
          thinking: 'Detected SKU-level achievement variance alert for Mumbai region. Premium SKUs showing 24-point distribution gap vs core portfolio. Triggering multi-agent analysis.',
          nextAgent: 'Distribution Agent'
        },
        { 
          time: '08:23:18',
          agent: 'Distribution Agent',
          action: 'Query Numeric Distribution',
          database: 'DMS System',
          query: "SELECT sku_category, territory, numeric_distribution FROM distribution_data WHERE region='Mumbai' AND period='L90D'",
          thinking: 'Premium SKUs at 68% vs 92% for core. Gap in Central (61%) and Western (64%) territories. Need distributor-level drill.',
          nextAgent: 'Distribution Agent'
        },
        { 
          time: '08:23:24',
          agent: 'Distribution Agent',
          action: 'Query Distributor Performance',
          database: 'DMS System',
          query: "SELECT distributor_name, premium_sku_distribution FROM distributor_metrics WHERE premium_sku_distribution < 70",
          thinking: '4 distributors with sub-70% premium distribution. Covering 1,240 outlets. Selective stocking behavior detected.',
          nextAgent: 'Sales Agent'
        },
        { 
          time: '08:23:31',
          agent: 'Sales Agent',
          action: 'Query Secondary Sales',
          database: 'Sales Analytics DB',
          query: "SELECT distributor, sku_category, order_frequency FROM secondary_sales WHERE period='L90D'",
          thinking: 'Premium SKUs have 18% lower order frequency at these 4 distributors. Points to working capital or portfolio management issues.',
          nextAgent: 'Finance Agent'
        },
        { 
          time: '08:23:37',
          agent: 'Finance Agent',
          action: 'Query Distributor Credit',
          database: 'Finance System',
          query: "SELECT distributor_name, credit_utilized_pct FROM distributor_financials",
          thinking: 'Gupta at 94% credit utilization, Mumbai Suppliers at 89%. Working capital stress confirmed. Premium SKUs need higher upfront investment.',
          nextAgent: 'Field Intelligence Agent'
        },
        { 
          time: '08:23:44',
          agent: 'Field Intelligence Agent',
          action: 'Query TSM Beat Patterns',
          database: 'Field Activity System',
          query: "SELECT tsm_name, premium_sku_calls_pct FROM beat_tracking WHERE period='L30D'",
          thinking: 'TSM network showing 41-52% premium call rate vs 86-91% core rate. Combined with distributor WC constraints creates compound effect.',
          nextAgent: 'Recommendation Engine'
        },
        { 
          time: '08:23:51',
          agent: 'Recommendation Engine',
          action: 'Generate Action Plan',
          database: 'Analytics DB',
          query: "CALCULATE revenue_opportunity FROM distribution_gap_analysis WHERE region='Mumbai'",
          thinking: '1,240 outlets at Rs 5,800/month = Rs 2.2Cr quarterly opportunity. Root causes: WC constraints + TSM behavior. Multi-pronged intervention needed.',
          nextAgent: null
        }
      ]
    },
    {
      id: 2,
      priority: 'high',
      title: 'Eastern suburbs outperformance - Thane West model worth Rs 1.4Cr if replicated',
      summary: 'ASM Meera Patil achieving 112% through superior TSM network execution and distributor management',
      keyNumbers: {
        achievement: '112% vs 89% region',
        numericDist: '94% vs 78% average',
        potentialValue: 'Rs 1.4Cr if replicated',
        tsmProductivity: '38% higher than region'
      },
      narrative: "Thane West (ASM Meera Patil) consistently outperforming at 112% achievement vs 89% regional average. Deep dive reveals systematic approach: 94% numeric distribution vs 78% region, TSM productivity 38% higher, distributor loading patterns optimal. Her management practices include weekly distributor meets with SKU-level planning, TSM daily briefings on priority outlets, and real-time issue escalation system.",
      deepDive: {
        asmLevel: [
          { asm: 'Meera Patil', territory: 'Thane West', achievement: '112%', numericDist: '94%', distributors: 5, practices: 'Weekly distributor reviews, daily TSM briefings', replicability: 'High - documented' },
          { asm: 'Rajesh Kumar', territory: 'Central Mumbai', achievement: '76%', numericDist: '78%', distributors: 6, gap: 'Reactive management', opportunity: 'Rs 52L if Thane model applied' },
          { asm: 'Pradeep Shah', territory: 'Western Suburbs', achievement: '88%', numericDist: '81%', distributors: 4, gap: 'Good execution but distributor issues', opportunity: 'Rs 38L' },
          { asm: 'Amit Desai', territory: 'Thane East', achievement: '103%', numericDist: '88%', distributors: 3, gap: 'Strong but not systematic', opportunity: 'Rs 18L' }
        ],
        distributorLevel: [
          { distributor: 'Thane Suppliers (Meera)', coverage: '485 outlets', numericDist: '96%', vanMix: '63-27-10', practice: 'Daily loading discipline', benchmark: 'Best in region' },
          { distributor: 'Excel Distributors (Meera)', coverage: '420 outlets', numericDist: '94%', vanMix: '66-24-10', practice: 'Strong TSM coordination', benchmark: 'Top quartile' },
          { distributor: 'Gupta Enterprises (Rajesh)', coverage: '420 outlets', numericDist: '73%', vanMix: '82-9-9', practice: 'Opportunistic loading', gap: 'Needs Thane model' },
          { distributor: 'Shah Trading (Pradeep)', coverage: '380 outlets', numericDist: '68%', vanMix: '79-11-10', practice: 'New distributor', gap: 'Apply Meera onboarding playbook' }
        ],
        tsmLevel: [
          { tsm: 'Ravi Naik (Meera)', distributor: 'Thane Suppliers', outlets: 163, callRate: '96%', premiumCalls: '84%', practice: 'Structured beat, daily ASM sync', benchmark: 'Regional best practice' },
          { tsm: 'Kavita Jadhav (Meera)', distributor: 'Excel Distributors', outlets: 142, callRate: '94%', premiumCalls: '81%', practice: 'Systematic coverage', benchmark: 'Strong execution' },
          { tsm: 'Vikram Joshi (Rajesh)', distributor: 'Gupta Enterprises', outlets: 142, callRate: '78%', premiumCalls: '41%', gap: 'Reactive approach', opportunity: 'Training on Meera methodology' },
          { tsm: 'Rahul Patil (Pradeep)', distributor: 'Shah Trading', outlets: 128, callRate: '72%', premiumCalls: '38%', gap: 'New distributor', opportunity: 'Shadow Meera TSM for 2 weeks' }
        ]
      },
      recommendation: {
        action: "Week 1-2: Document Meera's playbook. Week 3-4: Rajesh and Pradeep shadow Meera. Week 5-8: Implement with weekly check-ins.",
        cost: "Training time: Rs 1.2L, documentation: Rs 0.8L",
        return: "Central territory gap closure: Rs 52L quarterly, Western recovery: Rs 28L. Total Rs 1.08Cr annually.",
        roi: "5.4x return, practices become permanent capability"
      },
      owner: 'RSM Mumbai - ASM capability building',
      agentTrail: [
        { 
          time: '09:15:22',
          agent: 'Orchestrator',
          action: 'Initiated Performance Analysis',
          database: null,
          query: null,
          thinking: 'Detected significant positive variance in Thane West territory. ASM Meera Patil at 112% achievement vs 89% regional average for 3 consecutive months. High-confidence pattern suggests replicable practices.',
          nextAgent: 'Sales Agent'
        },
        { 
          time: '09:15:28',
          agent: 'Sales Agent',
          action: 'Query Territory Performance',
          database: 'Sales Analytics DB',
          query: "SELECT asm_name, territory, monthly_achievement_pct FROM territory_performance WHERE region='Mumbai' ORDER BY achievement DESC",
          thinking: 'Meera territory consistently top performer: 112% achievement, 94% numeric distribution (16 pts above region), premium mix at 27% vs 19% region. Sustained over quarter.',
          nextAgent: 'Distribution Agent'
        },
        { 
          time: '09:15:35',
          agent: 'Distribution Agent',
          action: 'Query Distributor Practices',
          database: 'DMS System',
          query: "SELECT distributor_name, loading_mix, fill_rate FROM distributor_operations WHERE asm IN ('Meera Patil', 'Rajesh Kumar') AND period='L30D'",
          thinking: 'Meera distributors show consistent 65-25-10 core-premium-seasonal mix vs others at 78-12-10. Fill rates at 96% vs 84% regional average. This is systematic.',
          nextAgent: 'Field Intelligence Agent'
        },
        { 
          time: '09:15:42',
          agent: 'Field Intelligence Agent',
          action: 'Query TSM Activity Patterns',
          database: 'Field Activity System',
          query: "SELECT tsm_name, call_success_rate, premium_calls_pct FROM tsm_performance WHERE asm IN ('Meera Patil', 'Rajesh Kumar') AND period='L30D'",
          thinking: 'Meera TSM network: 96% call rate vs 78% region, 84% premium calls vs 52% region. TSM productivity 38% higher. Management system creating consistent high performance.',
          nextAgent: 'Recommendation Engine'
        },
        { 
          time: '09:15:56',
          agent: 'Recommendation Engine',
          action: 'Calculate Replication Opportunity',
          database: 'Analytics DB',
          query: "CALCULATE revenue_uplift WHERE apply_best_practices FROM territory='Thane West'",
          thinking: 'Central Mumbai gap closure: Rs 52L quarterly. Western: Rs 38L. Thane East: Rs 18L. Total opportunity Rs 1.08Cr annually. Meera practices are documented - high replicability.',
          nextAgent: null
        }
      ]
    },
    {
      id: 3,
      priority: 'high',
      title: 'Festival pre-positioning 18 days to Holi - execution behind target by 23 points',
      summary: 'Only 62% of outlets have festival displays vs 85% target. Western suburbs most critical at 54%.',
      keyNumbers: {
        currentCoverage: '62% of 3,850 outlets',
        targetCoverage: '85% by Mar 8',
        gap: '885 outlets pending',
        westernLag: '54% vs 62% region'
      },
      narrative: "Holi festival on March 14 (18 days away). Internal merchandising tracker shows only 2,385 of 3,850 outlets (62%) have festival SKU displays vs 85% target. Western suburbs (ASM Pradeep) most critical at 54%. Historical data shows festival displays drive 34% volume uplift. At current pace, missing Rs 88L festival opportunity. Root cause: merchandising team capacity stretched, ASM Pradeep territory got lower priority due to distributor transition focus.",
      deepDive: {
        asmLevel: [
          { asm: 'Pradeep Shah', territory: 'Western Suburbs', outlets: 800, festivalReady: '432 (54%)', pending: 368, issue: 'Lowest coverage - merchandiser shortage', urgency: 'Critical - highest festival potential' },
          { asm: 'Rajesh Kumar', territory: 'Central Mumbai', outlets: 1100, festivalReady: '704 (64%)', pending: 336, issue: 'Moderate pace, merchandiser allocation okay', urgency: 'High - need acceleration' },
          { asm: 'Amit Desai', territory: 'Thane', outlets: 950, festivalReady: '646 (68%)', pending: 304, issue: 'Steady progress but below target', urgency: 'Medium - on track with push' },
          { asm: 'Meera Patil', territory: 'Eastern Suburbs', outlets: 1000, festivalReady: '720 (72%)', pending: 280, issue: 'Best progress, systematic execution', urgency: 'Low - likely to hit target' }
        ],
        distributorLevel: [
          { distributor: 'Shah Trading (Pradeep)', outlets: 380, festivalReady: '186 (49%)', pending: 194, issue: 'New distributor - TSM network not aligned on festival priority', action: 'Urgent distributor meet' },
          { distributor: 'Sai Distributors (Pradeep)', outlets: 155, festivalReady: '78 (50%)', pending: 77, issue: 'Small distributor, lower priority in queue', action: 'Fast-track merchandising' },
          { distributor: 'Gupta Enterprises (Rajesh)', outlets: 420, festivalReady: '252 (60%)', pending: 168, issue: 'Decent progress but needs push', action: 'Weekend merchandising blitz' },
          { distributor: 'Thane Suppliers (Meera)', outlets: 485, festivalReady: '359 (74%)', pending: 126, issue: 'Systematic rollout, on track', action: 'Continue current pace' }
        ],
        tsmLevel: [
          { tsm: 'Rahul Patil (Pradeep)', distributor: 'Shah Trading', outlets: 128, festivalReady: 58, pending: 70, issue: 'New to distributor, learning festival process', action: 'Pair with experienced TSM' },
          { tsm: 'Sunil Yadav (Pradeep)', distributor: 'Sai Distributors', outlets: 52, festivalReady: 24, pending: 28, issue: 'Small beat, got deprioritized', action: 'Fast-track with merchandiser' },
          { tsm: 'Vikram Joshi (Rajesh)', distributor: 'Gupta Enterprises', outlets: 142, festivalReady: 82, pending: 60, issue: 'Moderate pace, can accelerate', action: 'Weekend support' },
          { tsm: 'Ravi Naik (Meera)', distributor: 'Thane Suppliers', outlets: 163, festivalReady: 124, pending: 39, issue: 'Excellent execution', action: 'Continue + share learnings' }
        ]
      },
      recommendation: {
        action: "Emergency action: Deploy 8 additional merchandisers to Western suburbs for 10 days. Pradeep and merchandising lead to personally oversee Shah Trading. Weekend blitz across all territories. Daily ASM check-ins till March 8.",
        cost: "Additional merchandiser deployment: Rs 3.2L for 10 days, weekend overtime: Rs 1.8L",
        return: "Festival window protection: Rs 88L potential revenue. Display completion drives 34% uplift vs non-display outlets.",
        roi: "17.6x return on merchandising investment"
      },
      owner: 'RSM Mumbai - Direct oversight with Trade Marketing',
      agentTrail: [
        { 
          time: '10:42:15',
          agent: 'Orchestrator',
          action: 'Initiated Festival Readiness Check',
          database: null,
          query: null,
          thinking: 'Calendar trigger: 18 days to Holi festival. Target: 85% outlet coverage with festival displays by March 8. Need current status and gap analysis.',
          nextAgent: 'Merchandising Agent'
        },
        { 
          time: '10:42:21',
          agent: 'Merchandising Agent',
          action: 'Query Display Installation Status',
          database: 'Merchandising System',
          query: "SELECT asm_territory, total_outlets, festival_displays_installed FROM festival_merchandising WHERE festival='Holi_2026' AND region='Mumbai'",
          thinking: 'Current status: 2,385 of 3,850 outlets (62%) have displays vs 85% target. Gap of 885 outlets with 18 days. Western suburbs at only 54%. Need to identify constraints.',
          nextAgent: 'Field Intelligence Agent'
        },
        { 
          time: '10:42:28',
          agent: 'Field Intelligence Agent',
          action: 'Query Merchandiser Capacity',
          database: 'Field Activity System',
          query: "SELECT territory, merchandiser_count, avg_installations_per_day FROM merchandising_capacity WHERE region='Mumbai'",
          thinking: '18 merchandisers covering 3,850 outlets. Current capacity: 48 installations/day at 92% utilization. Western suburbs allocated 4 merchandisers but has 800 outlets - lowest ratio.',
          nextAgent: 'Sales Agent'
        },
        { 
          time: '10:42:34',
          agent: 'Sales Agent',
          action: 'Query Festival Impact History',
          database: 'Sales Analytics DB',
          query: "SELECT display_status, sales_uplift_pct FROM festival_performance_history WHERE region='Mumbai' AND period='L3Y'",
          thinking: 'Historical data: Outlets with festival displays show 34% sales uplift during 2-week festival window. Last Holi: outlets without displays lost Rs 92L potential revenue.',
          nextAgent: 'Recommendation Engine'
        },
        { 
          time: '10:42:48',
          agent: 'Recommendation Engine',
          action: 'Generate Recovery Plan',
          database: 'Analytics DB',
          query: "CALCULATE resource_reallocation WHERE gap=885_outlets AND days_remaining=18",
          thinking: 'Need 885 displays in 18 days = 49/day. Requires 8 additional merchandisers for 10 days, focused on Western suburbs. Cost Rs 5L vs Rs 88L revenue protection = 17.6x ROI.',
          nextAgent: null
        }
      ]
    }
  ];

  const getBriefingIcon = (type) => {
    switch(type) {
      case 'critical': return <AlertCircle size={18} />;
      case 'opportunity': return <TrendingUp size={18} />;
      case 'alert': return <Clock size={18} />;
      case 'performance': return <BarChart3 size={18} />;
      case 'highlight': return <Sparkles size={18} />;
      default: return <Activity size={18} />;
    }
  };

  const getBriefingColor = (type) => {
    switch(type) {
      case 'critical': return '#DC2626';
      case 'opportunity': return '#059669';
      case 'alert': return '#D97706';
      case 'performance': return C.sage;
      case 'highlight': return '#6366F1';
      default: return C.lightGrey;
    }
  };

  const getPriorityColor = (priority) => {
    if (priority === 'critical') return '#DC2626';
    if (priority === 'high') return '#EA580C';
    return C.sage;
  };

  const getPriorityLabel = (priority) => {
    if (priority === 'critical') return 'CRITICAL';
    if (priority === 'high') return 'HIGH PRIORITY';
    return 'MONITOR';
  };

  const handleInsightClick = (insight) => {
    setSelectedInsight(insight);
    setChatOpen(false);
    setTrailOpen(false);
  };

  const openTrail = (insight) => {
    setSelectedTrail(insight);
    setTrailOpen(true);
  };

  const StatusBadge = ({ status }) => {
    const config = {
      critical: { bg: `${C.sage}20`, text: C.sage, label: 'Critical' },
      warning: { bg: `${C.sage}15`, text: C.sage, label: 'Needs Attention' },
      healthy: { bg: C.lightSage, text: C.sage, label: 'Healthy' },
      high: { bg: `${C.sage}20`, text: C.sage, label: 'High Priority' },
      opportunity: { bg: C.lightSage, text: C.sage, label: 'Opportunity' },
      medium: { bg: C.cream, text: C.darkGrey, label: 'Monitor' }
    }[status];
    
    return (
      <span style={{ 
        fontSize: '10px', 
        fontWeight: '600', 
        letterSpacing: '0.05em', 
        color: config.text, 
        backgroundColor: config.bg, 
        padding: '4px 10px', 
        borderRadius: '12px', 
        textTransform: 'uppercase' 
      }}>
        {config.label}
      </span>
    );
  };

    const Sparkline = ({ data, color }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 30;
    
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <svg width={width} height={height} style={{ display: 'block' }}>
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" />
      </svg>
    );
  };

  const openChat = (insight) => {
    setSelectedInsight(insight);
    setChatOpen(true);
    setTrailOpen(false);
    setChatMessages([{
      type: 'ai',
      text: `I can help you explore this insight about ${insight.title.toLowerCase()}. What would you like to know?`,
      suggestions: ['What are the root causes?', 'Show me detailed numbers', 'What actions should I take first?', 'How confident are we in this analysis?']
    }]);
  };

  const sendMessage = (message) => {
    if (!message.trim()) return;
    setChatMessages(prev => [...prev, { type: 'user', text: message }]);
    setInputMessage('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: 'ai',
        text: `Based on the analysis, I can provide specific insights about ${message.toLowerCase()}. The data shows clear patterns we can explore further.`,
        suggestions: ['Tell me more', 'Show me the numbers', 'What should I do?']
      }]);
    }, 800);
  };

  return (
    <div className='overflow-auto' style={{ height: '100vh', backgroundColor: C.offWhite, fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.cream}`, padding: '20px 40px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '600', color: C.green }}>Mumbai RSM Dashboard</div>
            <div style={{ fontSize: '13px', color: C.lightGrey }}>Regional Sales Manager - Priya Sharma</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', color: C.lightGrey }}>Wednesday, January 28, 2026</div>
            <div style={{ fontSize: '12px', color: C.sage }}>Monthly Achievement: 89%</div>
          </div>
        </div>
      </div>

        <div style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.cream}`, padding: '0 48px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '8px' }}>
          {['briefing', 'deepdive'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '20px 28px',
                fontSize: '13px',
                fontWeight: activeTab === tab ? '600' : '400',
                color: activeTab === tab ? C.green : C.lightGrey,
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? `2px solid ${C.green}` : '2px solid transparent',
                cursor: 'pointer',
                textTransform: 'capitalize',
                letterSpacing: '0.03em'
              }}
            >
              {tab === 'deepdive' ? 'Territory Deep Dive' : 'Morning Briefing'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 40px' }}>
       {activeTab === 'briefing' && <>   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
                      {[
                        { label: 'Mumbai Achievement', value: '89%', change: '-11%', trend: 'down', icon: Target, color: C.sage },
                        { label: 'Mumbai Active Outlets', value: '1,850', sub: 'of 2,055 total', icon: MapPin, color: C.sage },
                        { label: 'Mumbai Avg Coverage', value: '88%', change: '-6%', trend: 'down', icon: Activity, color: C.lightGrey },
                        { label: 'Mumbai Premium Mix', value: '32%', sub: 'vs 52% Thane', icon: Package, color: C.sage }
                      ].map((metric, i) => (
                        <div key={i} style={{ padding: '20px', border: `1px solid ${C.cream}`, borderRadius: '4px', backgroundColor: C.white }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div style={{ fontSize: '11px', fontWeight: '500', color: C.lightGrey, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              {metric.label}
                            </div>
                            <metric.icon size={16} strokeWidth={1.5} color={metric.color} />
                          </div>
                          <div style={{ fontSize: '28px', fontWeight: '300', color: C.green, marginBottom: '4px' }}>
                            {metric.value}
                          </div>
                          {metric.change && (
                            <div style={{ fontSize: '12px', color: metric.trend === 'down' ? C.sage : C.sage, fontWeight: '500' }}>
                              {metric.change}
                            </div>
                          )}
                          {metric.sub && (
                            <div style={{ fontSize: '12px', color: C.lightGrey }}>{metric.sub}</div>
                          )}
                        </div>
                      ))}
                    </div>
        
        {/* Morning Briefing */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: C.green, margin: '0 0 24px 0' }}>Morning Briefing</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {briefingPoints.map((point, i) => (
              <div key={i} style={{ backgroundColor: C.white, border: `1px solid ${C.cream}`, borderRadius: '8px', padding: '20px 24px', display: 'flex', gap: '16px' }}>
                <div style={{ color: getBriefingColor(point.type), marginTop: '2px', flexShrink: 0 }}>
                  {getBriefingIcon(point.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: C.green, marginBottom: '6px' }}>{point.title}</div>
                  <div style={{ fontSize: '13px', color: C.darkGrey, lineHeight: '1.6', marginBottom: '8px' }}>{point.detail}</div>
                  <div style={{ fontSize: '12px', color: getBriefingColor(point.type), fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Target size={14} />
                    {point.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: C.cream, margin: '40px 0' }} />

        {/* Key Insights */}
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: C.green, margin: '0 0 20px 0' }}>Key Insights</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {insights.map(insight => (
              <div key={insight.id} style={{ backgroundColor: C.white, border: `1px solid ${C.cream}`, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => handleInsightClick(insight)}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', fontWeight: '600', color: getPriorityColor(insight.priority), marginBottom: '8px', letterSpacing: '0.05em' }}>
                        {getPriorityLabel(insight.priority)}
                      </div>
                      <h3 style={{ fontSize: '15px', fontWeight: '600', color: C.green, margin: '0 0 8px 0', lineHeight: '1.4' }}>{insight.title}</h3>
                      <p style={{ fontSize: '13px', color: C.lightGrey, margin: 0 }}>{insight.summary}</p>
                    </div>
                    <ChevronRight size={20} color={C.sage} style={{ flexShrink: 0, marginLeft: '16px' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${C.cream}` }}>
                    {Object.entries(insight.keyNumbers).map(([key, value]) => (
                      <div key={key}>
                        <div style={{ fontSize: '11px', color: C.lightGrey, marginBottom: '4px', textTransform: 'uppercase' }}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: C.green }}>{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div></>}

        {activeTab === 'deepdive' && (<>
         {activeTab === 'deepdive' && (
                  <div>
                    <div style={{ marginBottom: '32px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '500', color: C.green, marginBottom: '8px' }}>
                        Mumbai ASM Territory Performance
                      </h3>
                      <p style={{ fontSize: '14px', color: C.lightGrey, margin: 0 }}>
                        Deep dive into Mumbai region ASM territories and their distributor networks
                      </p>
                    </div>
        
                    {territories.map((territory) => (
                      <div key={territory.name} style={{ marginBottom: '24px', border: `1px solid ${C.cream}`, borderRadius: '6px', overflow: 'hidden', backgroundColor: C.white }}>
                        <div 
                          onClick={() => setExpandedTerritory(expandedTerritory === territory.name ? null : territory.name)}
                          style={{ padding: '24px', cursor: 'pointer', backgroundColor: C.offWhite }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <h4 style={{ fontSize: '18px', fontWeight: '600', color: C.green, margin: 0 }}>
                                  {territory.name}
                                </h4>
                                <span style={{ fontSize: '13px', color: C.lightGrey }}>{territory.territory}</span>
                                <StatusBadge status={territory.status} />
                              </div>
                              <p style={{ fontSize: '13px', color: C.darkGrey, margin: 0, fontStyle: 'italic' }}>
                                {territory.topIssue}
                              </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                              <Sparkline data={territory.trend} color={territory.status === 'critical' ? C.sage : territory.status === 'warning' ? C.sage : C.sage} />
                              {expandedTerritory === territory.name ? <ChevronDown size={20} color={C.green} /> : <ChevronRight size={20} color={C.green} />}
                            </div>
                          </div>
        
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '20px' }}>
                            {[
                              { label: 'Achievement', value: `${territory.achievement}%`, good: territory.achievement >= 85 },
                              { label: 'Coverage', value: `${territory.coverage}%`, good: territory.coverage >= 90 },
                              { label: 'Premium Mix', value: `${territory.premiumMix}%`, good: territory.premiumMix >= 42 },
                              { label: 'Active Outlets', value: `${territory.outlets.active} of ${territory.outlets.total}`, good: true }
                            ].map((metric, i) => (
                              <div key={i} style={{ padding: '12px', backgroundColor: C.white, borderRadius: '4px' }}>
                                <div style={{ fontSize: '10px', fontWeight: '500', color: C.lightGrey, marginBottom: '6px', textTransform: 'uppercase' }}>
                                  {metric.label}
                                </div>
                                <div style={{ fontSize: '20px', fontWeight: '600', color: metric.good ? C.sage : C.sage }}>
                                  {metric.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
        
                        {expandedTerritory === territory.name && (
                          <div style={{ padding: '24px', backgroundColor: C.white, borderTop: `1px solid ${C.cream}` }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: C.darkGrey, marginBottom: '20px', letterSpacing: '0.02em' }}>
                              Distributor Network ({territory.distributors.length})
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                              {territory.distributors.map((distributor, idx) => (
                                <div key={idx} style={{ padding: '20px', backgroundColor: C.offWhite, border: `1px solid ${C.cream}`, borderRadius: '4px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div style={{ flex: 1 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                        <h5 style={{ fontSize: '15px', fontWeight: '600', color: C.green, margin: 0 }}>
                                          {distributor.name}
                                        </h5>
                                        <StatusBadge status={distributor.status} />
                                      </div>
                                      <div style={{ fontSize: '12px', color: C.lightGrey, marginBottom: '4px' }}>
                                        {distributor.territory}
                                      </div>
                                      <div style={{ fontSize: '13px', fontWeight: '600', color: C.sage }}>
                                        {distributor.monthlyVolume} monthly volume
                                      </div>
                                    </div>
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: distributor.achievement >= 85 ? C.sage : C.sage }}>
                                      {distributor.achievement}%
                                    </div>
                                  </div>
        
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                                    {[
                                      { label: 'Order Frequency', value: distributor.orderFrequency },
                                      { label: 'Active Outlets', value: `${distributor.outlets.active} of ${distributor.outlets.total}` },
                                      { label: 'Productive', value: `${distributor.outlets.productive} outlets` }
                                    ].map((metric, i) => (
                                      <div key={i} style={{ padding: '12px', backgroundColor: C.white, borderRadius: '4px', border: `1px solid ${C.cream}` }}>
                                        <div style={{ fontSize: '10px', fontWeight: '500', color: C.lightGrey, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                          {metric.label}
                                        </div>
                                        <div style={{ fontSize: '14px', fontWeight: '600', color: C.darkGrey }}>
                                          {metric.value}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
        
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                                    {[
                                      { label: 'On-time Delivery', value: distributor.metrics.onTimeDelivery },
                                      { label: 'Stock Rotation', value: distributor.metrics.stockRotation },
                                      { label: 'Returns', value: distributor.metrics.returns },
                                      { label: 'Credit Days', value: `${distributor.metrics.creditDays} days` }
                                    ].map((metric, i) => (
                                      <div key={i} style={{ padding: '10px', backgroundColor: `${C.sage}08`, borderRadius: '4px' }}>
                                        <div style={{ fontSize: '9px', fontWeight: '500', color: C.lightGrey, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                          {metric.label}
                                        </div>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: C.green }}>
                                          {metric.value}
                                        </div>
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
                )}</>)}
      </div>

      {/* Insight Detail Panel */}
      {selectedInsight && !chatOpen && !trailOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '65%', backgroundColor: C.white, borderLeft: `1px solid ${C.cream}`, overflowY: 'auto', zIndex: 999, boxShadow: '-4px 0 24px rgba(0,0,0,0.12)' }}>
          <div style={{ position: 'sticky', top: 0, backgroundColor: C.offWhite, borderBottom: `1px solid ${C.cream}`, padding: '24px 32px', zIndex: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color: getPriorityColor(selectedInsight.priority), marginBottom: '8px' }}>
                  {getPriorityLabel(selectedInsight.priority)}
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: C.green, margin: '0 0 8px 0' }}>{selectedInsight.title}</h2>
                <p style={{ fontSize: '13px', color: C.lightGrey, margin: 0 }}>{selectedInsight.summary}</p>
              </div>
              <button onClick={() => setSelectedInsight(null)} style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginLeft: '16px' }}>
                <X size={20} color={C.lightGrey} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button onClick={() => openChat(selectedInsight)} style={{ padding: '10px 16px', backgroundColor: C.green, color: C.white, border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={16} />
                Discuss with Morrie
              </button>
              <button onClick={() => openTrail(selectedInsight)} style={{ padding: '10px 16px', backgroundColor: C.white, color: C.green, border: `1px solid ${C.cream}`, borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={16} />
                View Insight Trace
              </button>
            </div>
          </div>

          <div style={{ padding: '32px' }}>
            {/* Key Numbers */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: C.green, marginBottom: '16px' }}>Key Numbers</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {Object.entries(selectedInsight.keyNumbers).map(([key, value]) => (
                  <div key={key} style={{ padding: '16px', backgroundColor: C.offWhite, border: `1px solid ${C.cream}`, borderRadius: '6px' }}>
                    <div style={{ fontSize: '11px', color: C.lightGrey, marginBottom: '6px', textTransform: 'uppercase' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: C.green }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Narrative */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: C.green, marginBottom: '12px' }}>Situation Analysis</h3>
              <p style={{ fontSize: '13px', color: C.darkGrey, lineHeight: '1.7', margin: 0 }}>{selectedInsight.narrative}</p>
            </div>

            {/* Deep Dive */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: C.green, marginBottom: '16px' }}>Deep Dive: ASM → Distributor → TSM</h3>
              
              {/* ASM Level */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: C.sage, marginBottom: '12px', textTransform: 'uppercase' }}>ASM Level Performance</div>
                <div style={{ backgroundColor: C.offWhite, border: `1px solid ${C.cream}`, borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.5fr', gap: '12px', padding: '12px 16px', backgroundColor: C.cream, fontSize: '11px', fontWeight: '600', color: C.green, textTransform: 'uppercase' }}>
                    <div>ASM Name</div>
                    <div>Territory</div>
                    <div>Achievement</div>
                    <div>Distributors</div>
                    <div>Key Issue</div>
                  </div>
                  {selectedInsight.deepDive.asmLevel.map((asm, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.5fr', gap: '12px', padding: '14px 16px', borderBottom: i < selectedInsight.deepDive.asmLevel.length - 1 ? `1px solid ${C.cream}` : 'none', fontSize: '13px', cursor: 'pointer' }}
                      onClick={() => setExpandedTerritory(expandedTerritory === asm.asm ? null : asm.asm)}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = `${C.sage}08`}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <div style={{ fontWeight: '600', color: C.green }}>{asm.asm}</div>
                      <div>{asm.territory}</div>
                      <div style={{ fontWeight: '600', color: parseFloat(asm.achievement) >= 100 ? '#059669' : parseFloat(asm.achievement) >= 90 ? C.sage : '#DC2626' }}>{asm.achievement}</div>
                      <div>{asm.distributors}</div>
                      <div style={{ fontSize: '12px', color: C.lightGrey }}>{asm.issue}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distributor & TSM Levels when expanded */}
              {expandedTerritory && (
                <>
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: C.sage, marginBottom: '12px', textTransform: 'uppercase' }}>Distributor Level - {expandedTerritory}</div>
                    <div style={{ backgroundColor: C.offWhite, border: `1px solid ${C.cream}`, borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr 1.5fr', gap: '12px', padding: '12px 16px', backgroundColor: C.cream, fontSize: '11px', fontWeight: '600', color: C.green, textTransform: 'uppercase' }}>
                        <div>Distributor</div>
                        <div>Coverage</div>
                        <div>Premium Dist</div>
                        <div>Issue</div>
                      </div>
                      {selectedInsight.deepDive.distributorLevel.filter(d => d.asm === expandedTerritory).map((dist, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr 1.5fr', gap: '12px', padding: '14px 16px', borderBottom: `1px solid ${C.cream}`, fontSize: '13px' }}>
                          <div style={{ fontWeight: '600', color: C.green }}>{dist.distributor}</div>
                          <div>{dist.coverage}</div>
                          <div>{dist.premiumDist}</div>
                          <div style={{ fontSize: '12px', color: C.lightGrey }}>{dist.issue}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: C.sage, marginBottom: '12px', textTransform: 'uppercase' }}>TSM Level - {expandedTerritory}</div>
                    <div style={{ backgroundColor: C.offWhite, border: `1px solid ${C.cream}`, borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.7fr 1.5fr', gap: '12px', padding: '12px 16px', backgroundColor: C.cream, fontSize: '11px', fontWeight: '600', color: C.green, textTransform: 'uppercase' }}>
                        <div>TSM Name</div>
                        <div>Distributor</div>
                        <div>Outlets</div>
                        <div>Issue</div>
                      </div>
                      {selectedInsight.deepDive.tsmLevel.filter(t => t.distributor.includes(expandedTerritory.split(' ')[0])).map((tsm, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.7fr 1.5fr', gap: '12px', padding: '14px 16px', fontSize: '13px' }}>
                          <div style={{ fontWeight: '600', color: C.green }}>{tsm.tsm}</div>
                          <div>{tsm.distributor}</div>
                          <div>{tsm.outlets}</div>
                          <div style={{ fontSize: '12px', color: C.lightGrey }}>{tsm.issue}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Recommendation */}
            <div style={{ padding: '20px', backgroundColor: `${C.sage}12`, borderRadius: '6px', borderLeft: `4px solid ${C.sage}` }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: C.green, marginBottom: '12px' }}>Recommended Action</h3>
              <p style={{ fontSize: '13px', color: C.darkGrey, lineHeight: '1.7', marginBottom: '16px' }}>{selectedInsight.recommendation.action}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontSize: '12px' }}>
                <div>
                  <div style={{ color: C.lightGrey, marginBottom: '4px' }}>Investment</div>
                  <div style={{ fontWeight: '600', color: C.green }}>{selectedInsight.recommendation.cost}</div>
                </div>
                <div>
                  <div style={{ color: C.lightGrey, marginBottom: '4px' }}>Expected Return</div>
                  <div style={{ fontWeight: '600', color: C.green }}>{selectedInsight.recommendation.return}</div>
                </div>
                <div>
                  <div style={{ color: C.lightGrey, marginBottom: '4px' }}>ROI</div>
                  <div style={{ fontWeight: '600', color: C.sage }}>{selectedInsight.recommendation.roi}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agent Trail Modal */}
      {trailOpen && selectedTrail && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
          <div style={{ backgroundColor: C.white, borderRadius: '8px', width: '100%', maxWidth: '1200px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ padding: '24px 32px', borderBottom: `1px solid ${C.cream}`, backgroundColor: C.offWhite }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '8px', textTransform: 'uppercase' }}>Insight Trace</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: C.green, margin: 0 }}>Multi-agent analysis: {selectedTrail.title}</h3>
                </div>
                <button onClick={() => setTrailOpen(false)} style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color={C.lightGrey} />
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {selectedTrail.agentTrail.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                    {i < selectedTrail.agentTrail.length - 1 && (
                      <div style={{ position: 'absolute', left: '19px', top: '48px', bottom: '-24px', width: '2px', backgroundColor: C.cream }} />
                    )}
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: C.sage, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600', flexShrink: 0, zIndex: 1 }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1, backgroundColor: C.offWhite, border: `1px solid ${C.cream}`, borderRadius: '8px', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div>
                          <div style={{ display: 'inline-block', padding: '4px 10px', backgroundColor: `${C.sage}20`, borderRadius: '4px', fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '8px' }}>
                            {step.agent}
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: C.green }}>{step.action}</div>
                        </div>
                        <div style={{ fontSize: '11px', color: C.lightGrey, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={12} />
                          {step.time}
                        </div>
                      </div>
                      {step.database && (
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', fontSize: '12px', color: C.lightGrey }}>
                          <Database size={14} />
                          <span><strong>Database:</strong> {step.database}</span>
                        </div>
                      )}
                      {step.query && (
                        <div style={{ backgroundColor: `${C.green}08`, border: `1px solid ${C.cream}`, borderRadius: '4px', padding: '12px', marginBottom: '12px', fontSize: '11px', fontFamily: 'monospace', color: C.darkGrey, overflowX: 'auto' }}>
                          {step.query}
                        </div>
                      )}
                      <div style={{ padding: '14px', backgroundColor: `${C.sage}12`, borderRadius: '4px', borderLeft: `3px solid ${C.sage}`, marginBottom: step.nextAgent ? '12px' : 0 }}>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                          <Brain size={16} color={C.sage} style={{ marginTop: '2px' }} />
                          <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, textTransform: 'uppercase' }}>Agent Thinking</div>
                        </div>
                        <div style={{ fontSize: '13px', color: C.darkGrey, lineHeight: '1.6', fontStyle: 'italic' }}>{step.thinking}</div>
                      </div>
                      {step.nextAgent && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: C.sage, fontWeight: '500' }}>
                          <ChevronRight size={16} />
                          Routing to: {step.nextAgent}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      {chatOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '450px', backgroundColor: C.white, borderLeft: `1px solid ${C.cream}`, display: 'flex', flexDirection: 'column', zIndex: 999, boxShadow: '-4px 0 12px rgba(0,0,0,0.08)' }}>
          <div style={{ padding: '24px', borderBottom: `1px solid ${C.cream}`, backgroundColor: C.offWhite }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '8px', textTransform: 'uppercase' }}>Conversation with Morrie</div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: C.green, margin: 0 }}>{selectedInsight?.title}</h3>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} color={C.lightGrey} />
              </button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ padding: '14px 16px', backgroundColor: msg.type === 'user' ? `${C.green}15` : C.offWhite, border: msg.type === 'ai' ? `1px solid ${C.cream}` : 'none', borderRadius: '6px', marginBottom: '8px' }}>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', color: C.darkGrey }}>{msg.text}</div>
                </div>
                {msg.suggestions && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    {msg.suggestions.map((sug, j) => (
                      <button key={j} onClick={() => sendMessage(sug)} style={{ padding: '10px 14px', backgroundColor: C.white, border: `1px solid ${C.cream}`, borderRadius: '4px', fontSize: '13px', color: C.green, textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.backgroundColor = `${C.sage}10`; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.cream; e.currentTarget.style.backgroundColor = C.white; }}>
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatMessagesEndRef} />
          </div>
          <div style={{ padding: '20px', borderTop: `1px solid ${C.cream}`, backgroundColor: C.offWhite }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage(inputMessage)} placeholder="Ask anything..." style={{ flex: 1, padding: '12px 16px', border: `1px solid ${C.cream}`, borderRadius: '4px', fontSize: '14px', outline: 'none', backgroundColor: C.white }} />
              <button onClick={() => sendMessage(inputMessage)} style={{ padding: '12px 20px', backgroundColor: C.green, color: C.white, border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
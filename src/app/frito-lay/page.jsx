"use client";
import React, { useState } from 'react';
import { MessageSquare, TrendingUp, TrendingDown, AlertCircle, ChevronRight, Users, Package, MapPin, Activity, Send, X, Target, Sparkles, Clock, ChevronDown, BarChart3, Eye, Layers } from 'lucide-react';

export default function MorrieGTDashboard() {
  const [activeTab, setActiveTab] = useState('briefing');
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [expandedTerritory, setExpandedTerritory] = useState(null);
  const [trailOpen, setTrailOpen] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const chatMessagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const C = {
    green: '#0C2C18',
    darkGreen: '#02220E',
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
      title: 'Central territory beat coverage dropped to 72% yesterday',
      detail: '4 TSRs in Rajesh\'s Central territory missed 28% of planned calls yesterday. DMS shows 156 outlets uncovered. Coverage gap identified in Malad and Goregaon beats.'
    },
    {
      type: 'alert',
      title: 'Gupta Distributors showing stockouts on 3 core SKUs',
      detail: 'DMS alert: Lays Classic 52g, Kurkure Masala 85g, and Cheetos 90g out of stock at Gupta Distributors as of last night. 420 outlets affected. Replenishment truck scheduled for delivery today.'
    },
    {
      type: 'alert',
      title: 'Western suburbs order shortfall - 18% below plan yesterday',
      detail: 'Pradeep\'s Western territory billed Rs 12.4L vs Rs 15.2L target yesterday. 3 distributors showing lower secondary offtake. DMS flags Metro and Reliable Traders below 80% daily plan.'
    },
    {
      type: 'performance',
      title: 'Weekly run-rate tracking at 87% vs 92% target',
      detail: 'Monday-Wednesday achievement at 87%. Need Rs 42L additional billing by Friday EOD to hit weekly target. Eastern suburbs at 96%, Central & Western territories need acceleration.'
    },
    {
      type: 'highlight',
      title: 'Meera\'s team at 98% call compliance this week',
      detail: 'Eastern suburbs (Meera) TSM network at 98% call compliance Mon-Wed vs 84% region average. All 12 TSRs maintaining beat discipline. Field Activity System shows consistent execution patterns.'
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
      narrative: "Internal DMS data shows premium portfolio (Doritos, Cheetos, Kurkure premium variants) achieving 68% numeric distribution vs 92% for core Lays across Mumbai region's 3,850 outlets. Gap acute in Central territory (ASM Rajesh) at 61% vs Eastern at 79% (ASM Meera). Secondary sales analysis reveals 4 of 18 distributors consistently failing to stock premium SKUs - these distributors serve 1,240 outlets representing Rs 2.2Cr quarterly opportunity. Root cause analysis shows working capital constraints at mid-size distributors and TSM reluctance to push higher-margin SKUs. Van loading patterns confirm premium SKUs getting deprioritized.",
      dataTable: {
        headers: ['Territory', 'Premium Distribution', 'Core Distribution', 'Gap', 'Quarterly Opportunity'],
        rows: [
          ['Central Mumbai (Rajesh)', '61%', '92%', '-31 pts', 'Rs 85L'],
          ['Eastern Suburbs (Meera)', '79%', '94%', '-15 pts', 'Rs 42L'],
          ['Western Suburbs (Pradeep)', '64%', '90%', '-26 pts', 'Rs 68L'],
          ['Thane (Amit)', '74%', '93%', '-19 pts', 'Rs 27L']
        ]
      },
      recommendation: {
        action: "Phase 1 (Week 1-2): WC support to 2 distributors, intensive TSM training on premium portfolio. Phase 2 (Week 3-4): Incentive restructure, beat optimization. Review Shah Trading transition.",
        cost: "WC support: Rs 8L (recoverable), TSM training: Rs 2L, incentive adjustment: Rs 3L monthly",
        return: "Distribution improvement to 84% unlocks Rs 1.6Cr quarterly, 6.2x ROI",
        roi: "4-week payback on training investment"
      },
      owner: 'RSM Mumbai - Direct ASM coordination',
      color: C.sage,
      trail: [
        {
          timestamp: '09:14 AM',
          agent: 'Orchestrator Agent',
          action: 'Analyzing weekly performance dashboard',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, sku_category, numeric_distribution, outlet_count FROM weekly_distribution WHERE region = "Mumbai" AND week = CURRENT_WEEK',
          thinking: 'Premium SKU distribution significantly lower than core portfolio across all territories. Central territory showing worst performance at 61%. This is unusual - need to investigate distributor-level patterns.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '09:15 AM',
          agent: 'Distribution Agent',
          action: 'Deep dive into distributor-level stocking patterns',
          database: 'DMS System',
          query: 'SELECT distributor_id, distributor_name, premium_sku_numeric_dist, core_sku_numeric_dist, outlet_count FROM distributor_performance WHERE territory IN ("Central", "Western", "Eastern", "Thane") AND premium_sku_numeric_dist < 70',
          thinking: '4 distributors showing selective behavior - they maintain 85%+ core distribution but only 60-65% premium. This isn\'t a capability issue, it\'s selective portfolio management. Need to understand why.',
          nextAgent: 'Sales Agent'
        },
        {
          timestamp: '09:17 AM',
          agent: 'Sales Agent',
          action: 'Examining secondary sales order patterns',
          database: 'Sales Analytics DB',
          query: 'SELECT distributor_id, sku_category, avg_order_frequency, avg_order_value FROM secondary_sales WHERE distributor_id IN (102, 105, 108, 112) AND month = CURRENT_MONTH',
          thinking: 'Premium SKU order frequency 18% lower than core at these 4 distributors. Despite premium having higher margins, they\'re ordering less frequently. Could be working capital constraints - premium requires more upfront investment.',
          nextAgent: 'Finance Agent'
        },
        {
          timestamp: '09:19 AM',
          agent: 'Finance Agent',
          action: 'Checking distributor credit utilization',
          database: 'Sales System',
          query: 'SELECT distributor_id, distributor_name, credit_limit, credit_utilized, utilization_percentage FROM distributor_financials WHERE distributor_id IN (102, 105, 108, 112)',
          thinking: 'Gupta Enterprises at 94% credit utilization, Mumbai Suppliers at 89%. Both are WC-stretched. Premium SKUs require higher upfront investment but turn slower than core. These distributors are managing cash flow by limiting premium orders.',
          nextAgent: 'Field Intelligence Agent'
        },
        {
          timestamp: '09:21 AM',
          agent: 'Field Intelligence Agent',
          action: 'Analyzing TSM beat execution patterns',
          database: 'Field Activity System',
          query: 'SELECT tsr_id, tsr_name, distributor_id, premium_calls_percentage, core_calls_percentage, beat_compliance FROM tsr_activity WHERE distributor_id IN (102, 105, 108, 112) AND date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)',
          thinking: 'TSMs at these distributors making only 41-52% of calls with premium SKU focus vs 86-91% for core. Even when distributor has stock, TSMs aren\'t pushing it. Behavior issue - TSMs find premium harder to sell or lack confidence.',
          nextAgent: 'Recommendation Engine'
        },
        {
          timestamp: '09:23 AM',
          agent: 'Recommendation Engine',
          action: 'Synthesizing root causes and building action plan',
          database: 'Analytics DB',
          query: 'SELECT opportunity_value, recommended_actions, investment_required, expected_roi FROM opportunity_calculator WHERE issue_type = "distribution_gap" AND root_causes IN ("wc_constraint", "tsm_behavior")',
          thinking: 'Two-pronged issue: (1) WC-constrained distributors need temporary support to break the cycle (2) TSM network needs training and incentive restructure. Address WC first in Phase 1, then fix TSM behavior in Phase 2. Combined approach can move distribution from 68% to 84%, unlocking Rs 1.6Cr quarterly.',
          nextAgent: null
        }
      ],
      whatIfScenarios: [
        'What if we provide temporary credit extension to top 2 distributors?',
        'Should we restructure TSM incentives to favor premium mix?',
        'Can we pilot simplified premium ordering for smaller distributors?',
        'What if we focus only on Central territory first?'
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
      narrative: "Thane West (ASM Meera Patil) consistently outperforming at 112% achievement vs 89% regional average. Deep dive reveals systematic approach: 94% numeric distribution vs 78% region, TSM productivity 38% higher, distributor loading patterns optimal. Field observations show Meera's 5 distributors maintain discipline on van loading (mix of 65% core, 25% premium, 10% seasonal vs regional 78-12-10), TSM network has structured beat plans with premium SKU inclusion, outlet service frequency at 92% vs 76% regional. Her management practices include weekly distributor meets with SKU-level planning, TSM daily briefings on priority outlets, and real-time issue escalation system.",
      dataTable: {
        headers: ['Territory', 'Achievement', 'Numeric Dist', 'TSM Productivity', 'Replication Potential'],
        rows: [
          ['Thane West (Meera)', '112%', '94%', '38 calls/day', 'Benchmark model'],
          ['Central Mumbai (Rajesh)', '76%', '78%', '24 calls/day', 'Rs 52L opportunity'],
          ['Western Suburbs (Pradeep)', '88%', '81%', '28 calls/day', 'Rs 38L opportunity'],
          ['Thane East (Amit)', '103%', '88%', '32 calls/day', 'Rs 18L opportunity']
        ]
      },
      recommendation: {
        action: "Week 1-2: Document Meera's complete playbook. Week 3-4: Rajesh and Pradeep ASMs shadow Meera for distributor meets and TSM management. Week 5-8: Implement with weekly check-ins.",
        cost: "Training time: Rs 1.2L, process documentation: Rs 0.8L",
        return: "Central territory gap closure: Rs 52L quarterly, Western partial recovery: Rs 28L. Total Rs 1.08Cr annually.",
        roi: "5.4x return, practices become permanent capability"
      },
      owner: 'RSM Mumbai - ASM capability building',
      color: C.sage,
      trail: [
        {
          timestamp: '10:05 AM',
          agent: 'Orchestrator Agent',
          action: 'Detecting performance variance patterns',
          database: 'Sales Analytics DB',
          query: 'SELECT asm_name, territory, achievement_percentage, numeric_distribution, trend_90_days FROM asm_performance WHERE region = "Mumbai" ORDER BY achievement_percentage DESC',
          thinking: 'Thane West (ASM Meera) at 112% achievement for 3 consecutive months vs 89% regional average. This isn\'t luck - consistent over-performance suggests systematic approach. Need to understand her management practices.',
          nextAgent: 'Sales Agent'
        },
        {
          timestamp: '10:07 AM',
          agent: 'Sales Agent',
          action: 'Analyzing distributor management patterns under high-performing ASM',
          database: 'DMS System',
          query: 'SELECT asm_name, distributor_id, distributor_name, core_mix_percentage, premium_mix_percentage, seasonal_mix_percentage FROM distributor_loading_patterns WHERE asm_name = "Meera Patil" AND date >= DATE_SUB(CURRENT_DATE, INTERVAL 60 DAY)',
          thinking: 'Meera\'s 5 distributors maintain 65-25-10 (core-premium-seasonal) mix vs regional 78-12-10. This is optimal - higher premium mix drives better margins while maintaining core coverage. She\'s managing her distributor network systematically.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '10:09 AM',
          agent: 'Distribution Agent',
          action: 'Examining TSM network performance metrics',
          database: 'Field Activity System',
          query: 'SELECT asm_name, COUNT(tsr_id) as tsr_count, AVG(call_rate) as avg_call_rate, AVG(premium_call_percentage) as premium_focus, AVG(beat_adherence) as beat_compliance FROM tsr_performance WHERE asm_name IN ("Meera Patil", "Rajesh Sharma", "Pradeep Iyer", "Amit Kumar") GROUP BY asm_name',
          thinking: 'Meera\'s 12 TSMs: 96% call rate vs 78% region, 84% premium focus vs 52%, 98% beat adherence. This is management excellence - she\'s created a system that makes her entire TSM network perform consistently at high levels.',
          nextAgent: 'Field Intelligence Agent'
        },
        {
          timestamp: '10:11 AM',
          agent: 'Field Intelligence Agent',
          action: 'Documenting ASM management practices and routines',
          database: 'Field Activity System',
          query: 'SELECT asm_name, management_practice_type, frequency, last_conducted, participants FROM asm_management_activities WHERE asm_name = "Meera Patil" AND date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)',
          thinking: 'Found it! Meera conducts weekly distributor business reviews (every Monday), daily morning TSM briefings (7:30 AM sharp), maintains documented beat plans with SKU priorities. She\'s built a management operating system, not just managing on instinct.',
          nextAgent: 'Recommendation Engine'
        },
        {
          timestamp: '10:13 AM',
          agent: 'Recommendation Engine',
          action: 'Calculating replication opportunity across underperforming territories',
          database: 'Analytics DB',
          query: 'SELECT territory, current_achievement, meera_benchmark, gap_percentage, gap_value_quarterly FROM replication_opportunity WHERE asm_name != "Meera Patil" AND region = "Mumbai"',
          thinking: 'If Central (Rajesh) closes gap from 76% to 100%: Rs 52L quarterly. Western (Pradeep) partial closure: Rs 28L. Thane East minor gains: Rs 18L. Total Rs 1.08Cr annually. High-confidence opportunity because Meera\'s practices are documented and teachable, not talent-dependent.',
          nextAgent: null
        }
      ],
      whatIfScenarios: [
        'What if other ASMs resist adopting Meera\'s practices?',
        'Should we incentivize ASMs for adopting best practices?',
        'Can we scale this model beyond Mumbai region?',
        'What if Meera gets promoted - how do we preserve her system?'
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
      narrative: "Holi festival on March 14 (18 days away). Internal merchandising tracker shows only 2,385 of 3,850 outlets (62%) have festival SKU displays vs 85% target, requiring 885 additional installations. Western suburbs (ASM Pradeep) most critical at 54% (432 of 800 outlets). Central at 64%, Eastern at 72%, Thane at 68%. Historical data shows festival displays drive 34% volume uplift during 2-week festival window. At current pace, missing Rs 88L festival opportunity. Root cause: merchandising team capacity stretched (18 merchandisers for 3,850 outlets), ASM Pradeep's territory got lower priority due to distributor transition focus.",
      dataTable: {
        headers: ['Territory', 'Target Outlets', 'Festival Ready', 'Coverage %', 'Gap to Target'],
        rows: [
          ['Western Suburbs', '800', '432', '54%', '-31 pts vs target'],
          ['Central Mumbai', '1,100', '704', '64%', '-21 pts vs target'],
          ['Thane', '950', '646', '68%', '-17 pts vs target'],
          ['Eastern Suburbs', '1,000', '720', '72%', '-13 pts vs target']
        ]
      },
      supplyChainBacking: "Festival SKU inventory at 142% of normal levels across all warehouses. Sufficient stock for complete rollout. Merchandising materials (displays, standees, POSMs) available.",
      recommendation: {
        action: "Emergency action: Deploy 8 additional merchandisers to Western suburbs (Pradeep) for 10 days. Pradeep and merchandising lead to personally oversee Shah Trading & Sai Distributors. Weekend blitz across all territories. Daily ASM check-ins till March 8.",
        cost: "Additional merchandiser deployment: Rs 3.2L for 10 days, weekend overtime: Rs 1.8L",
        return: "Festival window protection: Rs 88L potential revenue. Display completion drives 34% uplift vs non-display outlets during 2-week festival period.",
        roi: "17.6x return on merchandising investment"
      },
      owner: 'RSM Mumbai - Direct oversight with Trade Marketing',
      color: C.sage,
      trail: [
        {
          timestamp: '11:20 AM',
          agent: 'Orchestrator Agent',
          action: 'Running festival readiness check',
          database: 'Merchandising System',
          query: 'SELECT festival_name, festival_date, DATEDIFF(festival_date, CURRENT_DATE) as days_remaining, target_coverage_percentage FROM festival_calendar WHERE region = "Mumbai" AND festival_date > CURRENT_DATE ORDER BY festival_date LIMIT 1',
          thinking: 'Holi festival in 18 days (March 14). Target: 85% outlet coverage with festival displays by March 8. Need to check current installation status immediately - this is a hard deadline.',
          nextAgent: 'Merchandising Agent'
        },
        {
          timestamp: '11:22 AM',
          agent: 'Merchandising Agent',
          action: 'Assessing current festival display installation status',
          database: 'Merchandising System',
          query: 'SELECT territory, COUNT(*) as total_outlets, SUM(CASE WHEN festival_display_installed = 1 THEN 1 ELSE 0 END) as installed_outlets, ROUND(SUM(CASE WHEN festival_display_installed = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 0) as coverage_percentage FROM outlet_merchandising WHERE region = "Mumbai" GROUP BY territory',
          thinking: 'Only 2,385 of 3,850 outlets (62%) have displays installed vs 85% target. Gap of 885 outlets with 18 days remaining. Western suburbs at 54% - most critical. Central at 64%, Eastern at 72%, Thane at 68%. Need to understand resource constraints.',
          nextAgent: 'Field Intelligence Agent'
        },
        {
          timestamp: '11:24 AM',
          agent: 'Field Intelligence Agent',
          action: 'Analyzing merchandiser team capacity and utilization',
          database: 'Field Activity System',
          query: 'SELECT territory, merchandiser_count, AVG(daily_installations) as avg_installations_per_day, AVG(utilization_percentage) as utilization FROM merchandiser_activity WHERE region = "Mumbai" AND date >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) GROUP BY territory',
          thinking: '18 merchandisers covering 3,850 outlets. Current capacity: 48 installations/day at 92% utilization. Already stretched thin. To install 885 displays in 18 days, need 49 installs/day - above current capacity. Western suburbs has lowest merchandiser-to-outlet ratio.',
          nextAgent: 'Sales Agent'
        },
        {
          timestamp: '11:26 AM',
          agent: 'Sales Agent',
          action: 'Quantifying festival revenue impact from historical data',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, AVG(sales_with_display) as avg_sales_with_display, AVG(sales_without_display) as avg_sales_without, ROUND((AVG(sales_with_display) - AVG(sales_without_display)) * 100.0 / AVG(sales_without_display), 0) as uplift_percentage FROM festival_performance_history WHERE festival = "Holi" AND year >= YEAR(CURRENT_DATE) - 2 GROUP BY territory',
          thinking: 'Historical data shows outlets with festival displays have 34% sales uplift during 2-week festival window. Last Holi: outlets without displays lost Rs 92L potential revenue across Mumbai. At current 62% coverage, we\'re leaving Rs 88L on the table.',
          nextAgent: 'Recommendation Engine'
        },
        {
          timestamp: '11:28 AM',
          agent: 'Recommendation Engine',
          action: 'Building emergency action plan with resource allocation',
          database: 'Analytics DB',
          query: 'SELECT territory, gap_outlets, recommended_additional_merchandisers, deployment_duration_days, deployment_cost, potential_revenue_protection FROM festival_acceleration_plan WHERE region = "Mumbai" AND festival = "Holi 2026"',
          thinking: 'Western suburbs (Pradeep) most critical - needs immediate attention. Root cause: Shah Trading distributor onboarding consumed ASM bandwidth, festival prep got deprioritized. Emergency action: Deploy 8 additional merchandisers to Western suburbs for 10 days. Weekend blitz across all territories. Cost Rs 5L, protects Rs 88L revenue. 17.6x ROI.',
          nextAgent: null
        }
      ],
      whatIfScenarios: [
        'What if we focus only on top 500 high-volume outlets?',
        'Should we extend deadline and accept lower coverage?',
        'Can we borrow merchandisers from Pune for 1 week?',
        'What if we incentivize distributors to do self-installation?'
      ]
    }
  ];

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
            stockOnHand: '1,850 cases',
            returns: '3.1%'
          },
          tsrs: [
            { 
              name: 'Ramesh Patil', 
              location: 'Andheri West',
              achievement: 58,
              outlets: { active: 78, target: 95, lost: 17, coverage: '82%' },
              productivity: { callsPerDay: 11, ordersPerDay: 5, linesPerOrder: 14 },
              performanceDrivers: { distribution: -28, mandays: -35, dropSize: -12 }
            },
            { 
              name: 'Sunil Kumar', 
              location: 'Bandra West',
              achievement: 64,
              outlets: { active: 71, target: 83, lost: 12, coverage: '86%' },
              productivity: { callsPerDay: 13, ordersPerDay: 6, linesPerOrder: 16 },
              performanceDrivers: { distribution: -22, mandays: -28, dropSize: -8 }
            },
            { 
              name: 'Deepak Rane', 
              location: 'Andheri East',
              achievement: 63,
              outlets: { active: 89, target: 107, lost: 18, coverage: '83%' },
              productivity: { callsPerDay: 12, ordersPerDay: 6, linesPerOrder: 15 },
              performanceDrivers: { distribution: -25, mandays: -32, dropSize: -10 }
            }
          ]
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
            stockOnHand: '2,100 cases',
            returns: '2.2%'
          },
          tsrs: [
            { 
              name: 'Prakash Mane', 
              location: 'Borivali West',
              achievement: 76,
              outlets: { active: 96, target: 108, lost: 12, coverage: '89%' },
              productivity: { callsPerDay: 15, ordersPerDay: 8, linesPerOrder: 19 },
              performanceDrivers: { distribution: -12, mandays: -18, dropSize: -6 }
            },
            { 
              name: 'Vijay Shinde', 
              location: 'Kandivali East',
              achievement: 73,
              outlets: { active: 91, target: 105, lost: 14, coverage: '87%' },
              productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 18 },
              performanceDrivers: { distribution: -15, mandays: -22, dropSize: -7 }
            },
            { 
              name: 'Rajesh More', 
              location: 'Borivali East',
              achievement: 73,
              outlets: { active: 93, target: 107, lost: 14, coverage: '87%' },
              productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 17 },
              performanceDrivers: { distribution: -14, mandays: -20, dropSize: -8 }
            }
          ]
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
            stockOnHand: '1,650 cases',
            returns: '2.6%'
          },
          tsrs: [
            { 
              name: 'Anil Pawar', 
              location: 'Malad West',
              achievement: 70,
              outlets: { active: 82, target: 96, lost: 14, coverage: '85%' },
              productivity: { callsPerDay: 13, ordersPerDay: 6, linesPerOrder: 16 },
              performanceDrivers: { distribution: -18, mandays: -25, dropSize: -9 }
            },
            { 
              name: 'Santosh Jadhav', 
              location: 'Goregaon West',
              achievement: 66,
              outlets: { active: 75, target: 89, lost: 14, coverage: '84%' },
              productivity: { callsPerDay: 12, ordersPerDay: 5, linesPerOrder: 15 },
              performanceDrivers: { distribution: -20, mandays: -28, dropSize: -11 }
            }
          ]
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
            stockOnHand: '2,850 cases',
            returns: '1.3%'
          },
          tsrs: [
            { 
              name: 'Manoj Deshmukh', 
              location: 'Deccan',
              achievement: 94,
              outlets: { active: 119, target: 125, lost: 6, coverage: '95%' },
              productivity: { callsPerDay: 17, ordersPerDay: 10, linesPerOrder: 21 },
              performanceDrivers: { distribution: -3, mandays: -5, dropSize: -2 }
            },
            { 
              name: 'Sachin Bhosale', 
              location: 'Pune Central',
              achievement: 91,
              outlets: { active: 112, target: 118, lost: 6, coverage: '95%' },
              productivity: { callsPerDay: 16, ordersPerDay: 9, linesPerOrder: 20 },
              performanceDrivers: { distribution: -4, mandays: -6, dropSize: -3 }
            },
            { 
              name: 'Vaibhav Kulkarni', 
              location: 'Shivaji Nagar',
              achievement: 92,
              outlets: { active: 130, target: 137, lost: 7, coverage: '95%' },
              productivity: { callsPerDay: 18, ordersPerDay: 10, linesPerOrder: 22 },
              performanceDrivers: { distribution: -4, mandays: -6, dropSize: -2 }
            }
          ]
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
            stockOnHand: '2,200 cases',
            returns: '1.8%'
          },
          tsrs: [
            { 
              name: 'Ganesh Pawar', 
              location: 'Hadapsar',
              achievement: 75,
              outlets: { active: 78, target: 92, lost: 14, coverage: '85%' },
              productivity: { callsPerDay: 13, ordersPerDay: 7, linesPerOrder: 17 },
              performanceDrivers: { distribution: -16, mandays: -22, dropSize: -9 }
            },
            { 
              name: 'Kiran Shinde', 
              location: 'Kharadi',
              achievement: 80,
              outlets: { active: 82, target: 88, lost: 6, coverage: '93%' },
              productivity: { callsPerDay: 15, ordersPerDay: 8, linesPerOrder: 18 },
              performanceDrivers: { distribution: -10, mandays: -14, dropSize: -6 }
            },
            { 
              name: 'Nitin Jagtap', 
              location: 'Hadapsar East',
              achievement: 79,
              outlets: { active: 81, target: 88, lost: 7, coverage: '92%' },
              productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 18 },
              performanceDrivers: { distribution: -12, mandays: -16, dropSize: -7 }
            }
          ]
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
            stockOnHand: '1,950 cases',
            returns: '1.4%'
          },
          tsrs: [
            { 
              name: 'Sanjay Gaikwad', 
              location: 'Wakad',
              achievement: 90,
              outlets: { active: 130, target: 138, lost: 8, coverage: '94%' },
              productivity: { callsPerDay: 16, ordersPerDay: 9, linesPerOrder: 20 },
              performanceDrivers: { distribution: -6, mandays: -10, dropSize: -4 }
            },
            { 
              name: 'Amit Shirke', 
              location: 'Hinjewadi',
              achievement: 88,
              outlets: { active: 109, target: 117, lost: 8, coverage: '93%' },
              productivity: { callsPerDay: 15, ordersPerDay: 8, linesPerOrder: 19 },
              performanceDrivers: { distribution: -8, mandays: -12, dropSize: -5 }
            }
          ]
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
            stockOnHand: '1,450 cases',
            returns: '0.7%'
          },
          tsrs: [
            { name: 'Ashok Thakur', outlets: 105, achievement: 110, callCompliance: '98%' },
            { name: 'Rohit Salvi', outlets: 102, achievement: 108, callCompliance: '96%' },
            { name: 'Prashant Naik', outlets: 103, achievement: 106, callCompliance: '98%' }
          ]
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
            stockOnHand: '1,680 cases',
            returns: '0.9%'
          },
          tsrs: [
            { name: 'Dinesh Sawant', outlets: 125, achievement: 104, callCompliance: '95%' },
            { name: 'Mahesh Kamble', outlets: 122, achievement: 101, callCompliance: '96%' },
            { name: 'Vishal Mhatre', outlets: 123, achievement: 101, callCompliance: '94%' }
          ]
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
            stockOnHand: '2,100 cases',
            returns: '1.1%'
          },
          tsrs: [
            { name: 'Tushar Rane', outlets: 115, achievement: 92, callCompliance: '90%' },
            { name: 'Ajay Patil', outlets: 110, achievement: 90, callCompliance: '92%' },
            { name: 'Sandeep Wagh', outlets: 107, achievement: 91, callCompliance: '88%' }
          ]
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
            stockOnHand: '1,550 cases',
            returns: '1.3%'
          },
          tsrs: [
            { name: 'Sachin Patil', outlets: 135, achievement: 90, callCompliance: '92%' },
            { name: 'Nikhil Deshpande', outlets: 128, achievement: 88, callCompliance: '90%' }
          ]
        }
      ]
    }
  ];

  const openChat = (insight, scenario) => {
    setSelectedInsight(insight);
    setChatOpen(true);
    
    let initialText = '';
    if (scenario) {
      initialText = `Let's explore: ${scenario}`;
    } else {
      initialText = `Let's discuss ${insight.title.toLowerCase()}. What would you like to understand better?`;
    }
    
    const initialMsg = {
      type: 'ai',
      text: initialText,
      suggestions: scenario ? [] : [
        'Why is this happening?',
        'What is the risk if we do not act?',
        'Show me the action plan',
        'How do we prevent recurrence?'
      ]
    };
    
    setChatMessages([initialMsg]);
  };

  const openTrail = (trail) => {
    setSelectedTrail(trail);
    setTrailOpen(true);
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    
    const userMsg = { type: 'user', text };
    let aiResponse = { type: 'ai', text: '', suggestions: [] };
    
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('why') || lowerText.includes('happening')) {
      aiResponse.text = "The root cause is a cascading effect: merchandiser shortage leads to reduced coverage leads to empty shelves leads to distributors see no demand signal leads to they reduce orders. It is a negative feedback loop accelerating at 4% weekly.";
      aiResponse.suggestions = ['How fast can we recover?', 'What is the cost of inaction?', 'Compare to similar situations'];
    } else if (lowerText.includes('action') || lowerText.includes('plan')) {
      aiResponse.text = "Week 1: Deploy 3 merchandisers (recruitment agency ready). Week 2-3: New team shadows existing, reactivates dropped outlets. Week 4: Coverage back to 82%, Rs 125k weekly recovery begins. Total investment: Rs 66k monthly. Return: Rs 500k monthly.";
      aiResponse.suggestions = ['What are the risks?', 'Can we do this faster?', 'What if it does not work?'];
    } else {
      aiResponse.text = "I can help you understand the situation better, explore what-if scenarios, or build an action plan. What would be most useful?";
      aiResponse.suggestions = ['Explain root cause', 'Build action plan', 'Explore what-if scenarios'];
    }
    
    setChatMessages([...chatMessages, userMsg, aiResponse]);
    setInputMessage('');
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

  return (
    <div className='overflow-auto' style={{ height: '100vh', backgroundColor: C.offWhite, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Page Header */}
      <div style={{ backgroundColor: C.darkGreen, padding: '24px 48px', borderBottom: `1px solid ${C.darkGreen}` }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '300', color: C.white, margin: 0, letterSpacing: '-0.02em' }}>
            Questt Sales Watchtower
          </h1>
        </div>
      </div>

      {/* Tab Navigation */}
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
                color: activeTab === tab ? C.darkGreen : C.lightGrey,
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? `2px solid ${C.darkGreen}` : '2px solid transparent',
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

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 48px' }}>
        
        {activeTab === 'briefing' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
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
                  <div style={{ fontSize: '28px', fontWeight: '300', color: C.darkGreen, marginBottom: '4px' }}>
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

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: C.green, margin: '0 0 24px 0' }}>Morning Briefing</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {briefingPoints.map((point, i) => {
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
                      case 'highlight': return C.darkGreen;
                      default: return C.lightGrey;
                    }
                  };
                  return (
                    <div key={i} style={{ backgroundColor: C.white, border: `1px solid ${C.cream}`, borderRadius: '8px', padding: '20px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ color: getBriefingColor(point.type), marginTop: '2px', flexShrink: 0 }}>
                        {getBriefingIcon(point.type)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: C.green, marginBottom: '6px' }}>{point.title}</div>
                        <div style={{ fontSize: '13px', color: C.darkGrey, lineHeight: '1.6' }}>{point.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: C.cream, margin: '40px 0' }} />

            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: C.green, margin: '0 0 20px 0' }}>
                Key Insights
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {insights.map((insight) => (
                  <div 
                    key={insight.id} 
                    style={{ 
                      border: `1px solid ${C.cream}`, 
                      borderRadius: '6px',
                      overflow: 'hidden',
                      backgroundColor: C.white
                    }}
                  >
                    <div style={{ padding: '28px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                            <StatusBadge status={insight.priority} />
                            <span style={{ fontSize: '11px', color: C.lightGrey, fontWeight: '500' }}>{insight.owner}</span>
                          </div>
                          <h4 style={{ fontSize: '18px', fontWeight: '600', color: C.green, marginBottom: '6px', lineHeight: '1.3' }}>
                            {insight.title}
                          </h4>
                          <p style={{ fontSize: '14px', color: C.lightGrey, margin: 0 }}>
                            {insight.summary}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px', padding: '16px', backgroundColor: `${C.sage}08`, borderRadius: '4px' }}>
                        {Object.entries(insight.keyNumbers).map(([key, value]) => (
                          <div key={key}>
                            <div style={{ fontSize: '10px', fontWeight: '500', color: C.lightGrey, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div style={{ fontSize: '18px', fontWeight: '600', color: C.darkGreen }}>
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ padding: '20px', backgroundColor: C.offWhite, borderRadius: '4px', marginBottom: '20px' }}>
                        <p style={{ fontSize: '14px', lineHeight: '1.7', color: C.darkGrey, margin: 0 }}>
                          {insight.narrative}
                        </p>
                      </div>

                      <div style={{ marginBottom: '20px', border: `1px solid ${C.cream}`, borderRadius: '4px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ backgroundColor: C.offWhite }}>
                              {insight.dataTable.headers.map((header, i) => (
                                <th key={i} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: C.lightGrey, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.cream}` }}>
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {insight.dataTable.rows.map((row, i) => (
                              <tr key={i} style={{ borderBottom: i < insight.dataTable.rows.length - 1 ? `1px solid ${C.cream}` : 'none' }}>
                                {row.map((cell, j) => (
                                  <td key={j} style={{ padding: '12px 16px', fontSize: '13px', color: C.darkGrey }}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {insight.supplyChainBacking && (
                        <div style={{ padding: '16px', backgroundColor: `${C.sage}10`, borderRadius: '4px', marginBottom: '20px', borderLeft: `3px solid ${C.sage}` }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            Supply Chain Context
                          </div>
                          <p style={{ fontSize: '13px', lineHeight: '1.6', color: C.darkGrey, margin: 0 }}>
                            {insight.supplyChainBacking}
                          </p>
                        </div>
                      )}

                      <div style={{ padding: '20px', backgroundColor: C.offWhite, border: `1px solid ${C.sage}30`, borderRadius: '4px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          Recommended Action
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: C.green, marginBottom: '12px' }}>
                          {insight.recommendation.action}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '12px' }}>
                          <div>
                            <div style={{ fontSize: '10px', color: C.lightGrey, marginBottom: '4px' }}>Cost</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: C.darkGrey }}>{insight.recommendation.cost}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '10px', color: C.lightGrey, marginBottom: '4px' }}>Return</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: C.sage }}>{insight.recommendation.return}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '10px', color: C.lightGrey, marginBottom: '4px' }}>ROI</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: C.sage }}>{insight.recommendation.roi}</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button 
                          onClick={() => openTrail(insight.trail)}
                          style={{ 
                            flex: 1,
                            padding: '12px 20px', 
                            backgroundColor: 'transparent',
                            color: C.green,
                            border: `1px solid ${C.green}`,
                            borderRadius: '4px', 
                            fontSize: '13px', 
                            fontWeight: '500', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          <Layers size={14} strokeWidth={2} />
                          View Insight Trail
                        </button>
                        <button 
                          onClick={() => openChat(insight)}
                          style={{ 
                            flex: 1,
                            padding: '12px 20px', 
                            backgroundColor: C.darkGreen, 
                            color: C.white, 
                            border: 'none', 
                            borderRadius: '4px', 
                            fontSize: '13px', 
                            fontWeight: '500', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                        >
                          <MessageSquare size={14} strokeWidth={2} />
                          Discuss with Morrie
                        </button>
                      </div>

                      {insight.whatIfScenarios && (
                        <div style={{ marginTop: '16px', padding: '16px', backgroundColor: `${C.sage}05`, borderRadius: '4px' }}>
                          <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '12px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            What-If Scenarios
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                            {insight.whatIfScenarios.map((scenario, i) => (
                              <button
                                key={i}
                                onClick={() => openChat(insight, scenario)}
                                style={{
                                  padding: '10px 12px',
                                  backgroundColor: C.white,
                                  border: `1px solid ${C.cream}`,
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  color: C.darkGrey,
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.backgroundColor = `${C.sage}10`; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = C.cream; e.currentTarget.style.backgroundColor = C.white; }}
                              >
                                {scenario}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

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
                        <div style={{ fontSize: '20px', fontWeight: '600', color: metric.good ? C.darkGreen : C.sage }}>
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
                            <div style={{ fontSize: '24px', fontWeight: '600', color: distributor.achievement >= 85 ? C.darkGreen : C.sage }}>
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

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                            {[
                              { label: 'On-time Delivery', value: distributor.metrics.onTimeDelivery },
                              { label: 'Stock On Hand', value: distributor.metrics.stockOnHand },
                              { label: 'Returns', value: distributor.metrics.returns }
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

                          {/* TSR Layer */}
                          {distributor.tsrs && distributor.tsrs.length > 0 && (
                            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${C.cream}` }}>
                              <div style={{ fontSize: '12px', fontWeight: '600', color: C.darkGrey, marginBottom: '14px', letterSpacing: '0.02em' }}>
                                Territory Sales Representatives ({distributor.tsrs.length})
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                {distributor.tsrs.map((tsr, tsrIdx) => (
                                  <div key={tsrIdx} style={{ padding: '18px', backgroundColor: C.white, border: `1px solid ${C.cream}`, borderRadius: '6px' }}>
                                    {/* Header with name and achievement */}
                                    <div style={{ marginBottom: '14px' }}>
                                      <div style={{ fontSize: '15px', fontWeight: '600', color: C.green, marginBottom: '2px' }}>
                                        {tsr.name}
                                      </div>
                                      <div style={{ fontSize: '11px', color: C.lightGrey }}>
                                        {tsr.location}
                                      </div>
                                      <div style={{ fontSize: '32px', fontWeight: '300', color: tsr.achievement >= 85 ? C.darkGreen : tsr.achievement >= 70 ? '#D97706' : '#DC2626', marginTop: '8px' }}>
                                        {tsr.achievement}%
                                      </div>
                                    </div>

                                    {/* Outlet Coverage */}
                                    <div style={{ marginBottom: '14px' }}>
                                      <div style={{ fontSize: '10px', fontWeight: '600', color: C.lightGrey, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Outlet Coverage
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <div>
                                          <div style={{ fontSize: '10px', color: C.lightGrey }}>Active: {tsr.outlets.active}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                          <div style={{ fontSize: '10px', color: C.lightGrey }}>Target: {tsr.outlets.target}</div>
                                        </div>
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '11px', color: '#DC2626' }}>Lost: {tsr.outlets.lost}</div>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: C.darkGreen }}>{tsr.outlets.coverage} coverage</div>
                                      </div>
                                    </div>

                                    {/* Productivity */}
                                    <div style={{ marginBottom: '14px' }}>
                                      <div style={{ fontSize: '10px', fontWeight: '600', color: C.lightGrey, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Productivity
                                      </div>
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                        <div>
                                          <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px' }}>Calls/Day</div>
                                          <div style={{ fontSize: '16px', fontWeight: '600', color: C.darkGrey }}>{tsr.productivity.callsPerDay}</div>
                                        </div>
                                        <div>
                                          <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px' }}>Orders/Day</div>
                                          <div style={{ fontSize: '16px', fontWeight: '600', color: C.darkGrey }}>{tsr.productivity.ordersPerDay}</div>
                                        </div>
                                        <div>
                                          <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px' }}>Lines/Order</div>
                                          <div style={{ fontSize: '16px', fontWeight: '600', color: C.darkGrey }}>{tsr.productivity.linesPerOrder}</div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Performance Drivers */}
                                    <div>
                                      <div style={{ fontSize: '10px', fontWeight: '600', color: C.lightGrey, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Performance Drivers
                                      </div>
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                        <div style={{ padding: '8px', backgroundColor: `${C.sage}08`, borderRadius: '4px' }}>
                                          <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px', textTransform: 'uppercase' }}>Distribution</div>
                                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#DC2626' }}>{tsr.performanceDrivers.distribution}%</div>
                                        </div>
                                        <div style={{ padding: '8px', backgroundColor: `${C.sage}08`, borderRadius: '4px' }}>
                                          <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px', textTransform: 'uppercase' }}>Mandays</div>
                                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#DC2626' }}>{tsr.performanceDrivers.mandays}%</div>
                                        </div>
                                        <div style={{ padding: '8px', backgroundColor: `${C.sage}08`, borderRadius: '4px' }}>
                                          <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px', textTransform: 'uppercase' }}>Drop Size</div>
                                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#DC2626' }}>{tsr.performanceDrivers.dropSize}%</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
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

      {trailOpen && selectedTrail && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }} onClick={() => setTrailOpen(false)}>
          <div style={{ backgroundColor: C.white, borderRadius: '8px', maxWidth: '900px', width: '100%', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px', borderBottom: `1px solid ${C.cream}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: C.green, margin: 0, marginBottom: '4px' }}>
                    Insight Trail
                  </h3>
                  <p style={{ fontSize: '13px', color: C.lightGrey, margin: 0 }}>
                    How we arrived at this insight through data analysis
                  </p>
                </div>
                <button onClick={() => setTrailOpen(false)} style={{ padding: '8px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color={C.lightGrey} />
                </button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              {selectedTrail.map((step, i) => (
                <div key={i} style={{ marginBottom: i < selectedTrail.length - 1 ? '28px' : 0, position: 'relative', paddingLeft: '40px' }}>
                  {i < selectedTrail.length - 1 && (
                    <div style={{ position: 'absolute', left: '15px', top: '40px', bottom: '-28px', width: '2px', backgroundColor: C.cream }}></div>
                  )}
                  <div style={{ position: 'absolute', left: 0, top: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: C.sage, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600' }}>
                    {i + 1}
                  </div>
                  <div style={{ padding: '18px', backgroundColor: C.offWhite, borderRadius: '6px', border: `1px solid ${C.cream}` }}>
                    {/* Header with timestamp and agent */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: C.green }}>
                        {step.agent}
                      </div>
                      <div style={{ fontSize: '11px', color: C.lightGrey, fontFamily: 'monospace' }}>
                        {step.timestamp}
                      </div>
                    </div>
                    
                    {/* Action */}
                    <div style={{ fontSize: '13px', color: C.darkGrey, marginBottom: '12px', lineHeight: '1.5' }}>
                      {step.action}
                    </div>
                    
                    {/* Database with icon */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 10px', backgroundColor: C.white, borderRadius: '4px', fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '10px', border: `1px solid ${C.cream}` }}>
                      <Layers size={14} />
                      {step.database}
                    </div>
                    
                    {/* SQL Query */}
                    <div style={{ padding: '12px', backgroundColor: C.darkGrey, borderRadius: '4px', marginBottom: '12px', fontFamily: 'monospace', fontSize: '11px', color: '#E7DDCA', overflowX: 'auto', lineHeight: '1.6' }}>
                      {step.query}
                    </div>
                    
                    {/* Agent Thinking */}
                    <div style={{ display: 'flex', gap: '10px', padding: '12px', backgroundColor: `${C.sage}10`, borderRadius: '4px', marginBottom: step.nextAgent ? '12px' : 0, borderLeft: `3px solid ${C.sage}` }}>
                      <div style={{ fontSize: '12px', color: C.sage, flexShrink: 0, marginTop: '2px' }}>
                        💭
                      </div>
                      <div style={{ fontSize: '12px', color: C.darkGrey, fontStyle: 'italic', lineHeight: '1.6' }}>
                        {step.thinking}
                      </div>
                    </div>
                    
                    {/* Route to Next Agent */}
                    {step.nextAgent && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: C.lightGrey }}>
                        <ChevronRight size={14} />
                        <span>Routing to <span style={{ fontWeight: '600', color: C.sage }}>{step.nextAgent}</span></span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {chatOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '450px', backgroundColor: C.white, borderLeft: `1px solid ${C.cream}`, display: 'flex', flexDirection: 'column', zIndex: 999, boxShadow: '-4px 0 12px rgba(0,0,0,0.08)' }}>
          <div style={{ padding: '24px', borderBottom: `1px solid ${C.cream}`, backgroundColor: C.offWhite }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Conversation with Morrie
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: C.green, margin: 0 }}>
                  {selectedInsight?.title}
                </h3>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ padding: '4px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} strokeWidth={1.5} color={C.lightGrey} />
              </button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ 
                  padding: '14px 16px', 
                  backgroundColor: msg.type === 'user' ? `${C.green}15` : C.offWhite,
                  border: msg.type === 'ai' ? `1px solid ${C.cream}` : 'none',
                  borderRadius: '6px',
                  marginBottom: '8px'
                }}>
                  <div style={{ fontSize: '14px', lineHeight: '1.6', color: C.darkGrey, whiteSpace: 'pre-line' }}>
                    {msg.text}
                  </div>
                </div>
                
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    {msg.suggestions.map((sug, j) => (
                      <button 
                        key={j}
                        onClick={() => sendMessage(sug)}
                        style={{ 
                          padding: '10px 14px', 
                          backgroundColor: C.white, 
                          border: `1px solid ${C.cream}`,
                          borderRadius: '4px',
                          fontSize: '13px', 
                          color: C.green, 
                          textAlign: 'left', 
                          cursor: 'pointer',
                          fontFamily: 'system-ui, sans-serif',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.sage; e.currentTarget.style.backgroundColor = `${C.sage}10`; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.cream; e.currentTarget.style.backgroundColor = C.white; }}
                      >
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
              <input 
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage(inputMessage)}
                placeholder="Ask anything..."
                style={{ 
                  flex: 1, 
                  padding: '12px 16px', 
                  border: `1px solid ${C.cream}`,
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: 'system-ui, sans-serif',
                  outline: 'none',
                  backgroundColor: C.white
                }}
              />
              <button 
                onClick={() => sendMessage(inputMessage)}
                style={{ 
                  padding: '12px 20px', 
                  backgroundColor: C.darkGreen, 
                  color: C.white, 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                <Send size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
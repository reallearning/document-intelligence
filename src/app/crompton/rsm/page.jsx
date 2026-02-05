"use client"
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
      title: 'Western territory - projected stockout in 2 days across 3 distributors',
      detail: 'Stock alert: SilentPro BLDC Ceiling Fan and Energion BLDC Fan inventory at 1.2 days cover across Sagar, Gupta, and Metro Distributors. 685 dealers at risk of stockout by Jan 31. Estimated sales loss of Rs 8.2L/day if stockout occurs. Immediate reorder required - peak summer pre-stocking window closing.'
    },
    {
      type: 'alert',
      title: 'Central territory - must-sell SKU inventory running low at 2 distributors',
      detail: 'Inventory alert: Mini Marvel Self-Priming Pump and AquaGold Submersible Pump at 2.5 days cover in Andheri & Malad distributors. 420 dealers at risk. Projected stockout by Feb 1 if current offtake continues. Need expedited secondary sales push of Rs 4.8L.'
    },
    {
      type: 'alert',
      title: 'Western territory - order frequency dropped across 4 distributors this week',
      detail: 'Metro, Reliable, Shah Trading, and Sai Distributors placed 32% fewer orders this week (38 orders vs 56 typical). Covering 1,140 dealers. DMS flags irregular ordering pattern across Western territory for last 10 days. BLDC fan category most impacted.'
    },
    {
      type: 'performance',
      title: 'Region-wide weekly achievement at 87% vs 92% target',
      detail: 'Current weekly run-rate at 87%. Need Rs 42L additional billing to hit weekly target. Eastern territory at 96%, Central & Western territories need acceleration to close Rs 42L gap. Fans and Pumps categories driving the shortfall.'
    },
    {
      type: 'highlight',
      title: 'Central territory - 3 distributors restored to 92%+ distribution from 68% slump',
      detail: 'Reliable, Sagar, and Ganesh Distributors (Malad & Goregaon areas) recovered from 2-week distribution slump. Now averaging 92% numeric distribution vs 68% two weeks ago. Covering 825 dealers. Ameo Mixer Grinder and LED Tube Light secondary sales back to Rs 52L weekly.'
    }
  ];

  const insights = [
    {
      id: 1,
      priority: 'critical',
      title: 'BLDC Fan distribution gap of 24 points vs core ceiling fan portfolio - 1,240 unbilled dealers',
      summary: 'SilentPro & Energion at 68% numeric distribution vs 92% for standard fans - Rs 2.2Cr quarterly gap',
      keyNumbers: {
        distributionGap: '68% vs 92% (24 pts)',
        unbilledOutlets: '1,240 dealers',
        revenueOpportunity: 'Rs 2.2Cr quarterly',
        gapVsLYSM: '-8 pts vs Jan 2025'
      },
      narrative: "BLDC fan numeric distribution has declined 8 points vs last year same month, now at 68% compared to 92% for core ceiling fan portfolio (Super Briz, Hill Briz). Central Mumbai shows steepest drop at 61% distribution (down from 74% LYSM). Analysis reveals systematic pattern: 4 of 18 distributors consistently under-stock SilentPro and Energion BLDC fans despite maintaining 85%+ distribution for standard ceiling fans. These distributors collectively serve 1,240 dealers - all currently unbilled for BLDC portfolio. Distributor order frequency data shows BLDC SKUs ordered 18% less frequently than standard fans, suggesting systematic deprioritization in secondary sales cycle. With summer peak approaching, BLDC fan availability is critical for premium segment capture.",
      dataTable: {
        headers: ['Territory', 'BLDC Dist', 'vs LYSM', 'Unbilled Dealers', 'Quarterly Gap'],
        rows: [
          ['Central Mumbai', '61%', '-13 pts', '485 dealers', 'Rs 85L'],
          ['Western Suburbs', '64%', '-10 pts', '358 dealers', 'Rs 68L'],
          ['Thane', '74%', '-4 pts', '195 dealers', 'Rs 27L'],
          ['Eastern Suburbs', '79%', '-3 pts', '202 dealers', 'Rs 42L']
        ]
      },
      recommendation: {
        action: "Systematic distributor engagement required to restore BLDC fan order frequency. Focus on 4 distributors serving 1,240 unbilled dealers. Address root causes: order size constraints and beat coverage gaps for SilentPro and Energion portfolio.",
        return: "Closing gap to 84% distribution unlocks Rs 1.6Cr quarterly recurring revenue",
        roi: "Represents 0.73% improvement in overall Mumbai numeric distribution"
      },
      owner: 'Distribution Planning - Mumbai Region',
      color: C.sage,
      trail: [
        {
          timestamp: '09:14 AM',
          agent: 'Orchestrator Agent',
          action: 'Analyzing weekly distribution performance for BLDC fan portfolio',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, sku_category, numeric_distribution, dealer_count, trend_vs_lysm FROM weekly_distribution WHERE region = "Mumbai" AND week = CURRENT_WEEK AND category IN ("BLDC_fans", "standard_fans")',
          thinking: 'BLDC fan (SilentPro, Energion) distribution at 68% vs 92% for standard ceiling fans - 24 point gap. Central territory showing steepest decline at 61% (down 13 points vs LYSM). This gap is widening month-over-month, concerning with summer peak approaching.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '09:15 AM',
          agent: 'Distribution Agent',
          action: 'Identifying distributor-level BLDC fan stocking patterns',
          database: 'DMS System',
          query: 'SELECT distributor_id, distributor_name, bldc_sku_numeric_dist, standard_fan_numeric_dist, dealer_count, unbilled_dealers FROM distributor_performance WHERE territory IN ("Central", "Western", "Eastern", "Thane") AND bldc_sku_numeric_dist < 70',
          thinking: '4 distributors maintain 85%+ standard fan distribution but only 60-65% for SilentPro and Energion BLDC fans. Collectively serving 1,240 dealers unbilled for BLDC portfolio. This is a systematic stocking selectivity pattern - dealers may perceive lower demand for premium BLDC segment.',
          nextAgent: 'Sales Agent'
        },
        {
          timestamp: '09:17 AM',
          agent: 'Sales Agent',
          action: 'Examining BLDC fan secondary sales order frequency patterns',
          database: 'Sales Analytics DB',
          query: 'SELECT distributor_id, sku_category, avg_order_frequency, orders_per_month, trend_3_months FROM secondary_sales WHERE distributor_id IN (102, 105, 108, 112) AND month = CURRENT_MONTH AND category = "BLDC_fans"',
          thinking: 'BLDC fan order frequency 18% lower than standard fans at these 4 distributors. Ordering pattern shows 2 times per month for SilentPro/Energion vs 4 times per month for standard fans. Gap indicates systematic deprioritization - dealers may need demo units and consumer awareness push.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '09:19 AM',
          agent: 'Distribution Agent',
          action: 'Analyzing unbilled dealer coverage for BLDC fan SKUs',
          database: 'DMS System',
          query: 'SELECT territory, COUNT(dealer_id) as unbilled_dealers, SUM(potential_monthly_value) as opportunity FROM dealer_billing_patterns WHERE bldc_sku_billed = 0 AND standard_fan_billed = 1 GROUP BY territory',
          thinking: '1,240 dealers currently unbilled for BLDC fans despite ordering standard ceiling fans regularly. Central Mumbai accounts for 485 of these dealers (Rs 85L quarterly opportunity). This is a coverage execution gap compounded by lack of BLDC product push.',
          nextAgent: 'Analytics Engine'
        },
        {
          timestamp: '09:21 AM',
          agent: 'Analytics Engine',
          action: 'Quantifying BLDC distribution gap impact and summer readiness',
          database: 'Analytics DB',
          query: 'SELECT sku_category, current_distribution, lysm_distribution, gap_value_quarterly, trend_direction FROM distribution_gap_analysis WHERE region = "Mumbai" AND category = "BLDC_fans"',
          thinking: 'BLDC fan portfolio gap widened from 18 points (LYSM) to 24 points currently. With summer peak in 8-10 weeks, if gap continues expanding, quarterly opportunity loss reaches Rs 2.8Cr. Distribution recovery to 84% unlocks Rs 1.6Cr recurring quarterly revenue. SilentPro and Energion are margin-accretive SKUs critical for premiumization strategy.',
          nextAgent: null
        }
      ],
      whatIfScenarios: [
        'What if BLDC fan distribution gap continues widening into summer peak?',
        'How would closing gap in Central territory alone impact overall distribution?',
        'What is the correlation between demo unit availability and BLDC dealer activation?',
        'Would focusing on top 4 distributors yield proportional improvement?'
      ]
    },
    {
      id: 2,
      priority: 'high',
      title: 'Territory-level distribution variance - 16 point gap between best and worst performing areas',
      summary: 'Thane West at 94% numeric distribution vs Central Mumbai at 78% - systematic coverage pattern',
      keyNumbers: {
        distributionRange: '78% to 94% (16 pts)',
        topTerritory: 'Thane West 94%',
        bottomTerritory: 'Central Mumbai 78%',
        gapVsLYSM: 'Variance up from 11 pts'
      },
      narrative: "Territory-level distribution analysis reveals widening performance gap - variance increased from 11 points (LYSM) to 16 points currently. Thane West maintains 94% numeric distribution through consistent 92% dealer service frequency, while Central Mumbai at 78% distribution has only 76% dealer service frequency. Pattern analysis shows top-performing territories have 3 times per week order frequency per distributor vs 2 times in lower-performing areas. Distribution depth (dealers per distributor) is comparable across territories, indicating gap is execution-driven rather than structural. Dealer-level data shows 615 dealers in Central territory are sporadically serviced (visited but not billed regularly) for Crompton's core portfolio (ceiling fans, LED lights, pumps), compared to only 145 such dealers in Thane West.",
      dataTable: {
        headers: ['Territory', 'Numeric Dist', 'vs LYSM', 'Dealer Service Freq', 'Sporadic Dealers'],
        rows: [
          ['Thane West', '94%', '+1 pt', '92%', '145 dealers'],
          ['Eastern Suburbs', '88%', '-2 pts', '86%', '238 dealers'],
          ['Western Suburbs', '81%', '-4 pts', '82%', '412 dealers'],
          ['Central Mumbai', '78%', '-6 pts', '76%', '615 dealers']
        ]
      },
      recommendation: {
        action: "Address sporadic billing pattern in Central and Western territories. Focus on 1,027 dealers with irregular service. Distributor order frequency optimization required to match Thane West benchmark of 3 times per week. Prioritize Fans and Lighting categories for dealer activation.",
        return: "Closing distribution gap to 88% across all territories unlocks Rs 1.08Cr annually",
        roi: "Represents sustained improvement in outlet coverage depth"
      },
      owner: 'Distribution Planning - Mumbai Region',
      color: C.sage,
      trail: [
        {
          timestamp: '10:05 AM',
          agent: 'Orchestrator Agent',
          action: 'Detecting territory-level distribution variance across Crompton portfolio',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, numeric_distribution, lysm_distribution, dealer_service_frequency, distributor_count FROM territory_performance WHERE region = "Mumbai" AND category IN ("fans", "lighting", "pumps") ORDER BY numeric_distribution DESC',
          thinking: 'Wide distribution gap across territories: Thane West at 94% vs Central Mumbai at 78% (16 point spread). This variance has increased from 11 points LYSM. Need to identify structural vs execution-driven factors across Crompton\'s core categories.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '10:07 AM',
          agent: 'Distribution Agent',
          action: 'Analyzing dealer service frequency patterns by territory',
          database: 'DMS System',
          query: 'SELECT territory, AVG(service_frequency_weekly) as avg_service_freq, COUNT(CASE WHEN service_pattern = "sporadic" THEN 1 END) as sporadic_dealers FROM dealer_service_patterns WHERE region = "Mumbai" GROUP BY territory',
          thinking: 'Thane West maintains 92% dealer service frequency with only 145 sporadic dealers. Central Mumbai at 76% frequency with 615 sporadic dealers. Pattern shows execution consistency gap, not structural difference. Sporadic dealers are missing Crompton fan and lighting restocking cycles.',
          nextAgent: 'Sales Agent'
        },
        {
          timestamp: '10:09 AM',
          agent: 'Sales Agent',
          action: 'Examining distributor order frequency patterns for core Crompton SKUs',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, distributor_id, AVG(weekly_order_frequency) as order_freq, trend_3_months FROM distributor_ordering_patterns WHERE region = "Mumbai" AND category IN ("fans", "lighting", "pumps") GROUP BY territory',
          thinking: 'Top territories have 3 times per week distributor order frequency vs 2 times in lower-performing areas. Despite comparable distributor density, ordering rhythm differs significantly. This drives the distribution gap across all Crompton categories.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '10:11 AM',
          agent: 'Distribution Agent',
          action: 'Mapping sporadic billing patterns across territories',
          database: 'DMS System',
          query: 'SELECT territory, dealer_id, COUNT(billing_events) as billing_count, service_pattern FROM dealer_billing_history WHERE date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY) AND service_pattern = "sporadic" GROUP BY territory',
          thinking: 'Identified 1,027 dealers with sporadic billing (visited but not billed regularly). 615 in Central, 412 in Western suburbs. These dealers represent systematic coverage depth issue - inconsistent conversion from visit to billing for Crompton products.',
          nextAgent: 'Analytics Engine'
        },
        {
          timestamp: '10:13 AM',
          agent: 'Analytics Engine',
          action: 'Quantifying distribution gap closure opportunity across Crompton portfolio',
          database: 'Analytics DB',
          query: 'SELECT territory, current_distribution, target_distribution, gap_value_annually, dealer_count FROM distribution_opportunity WHERE region = "Mumbai" ORDER BY gap_value_annually DESC',
          thinking: 'Closing distribution gap to 88% across all territories unlocks Rs 1.08Cr annually. Primary driver: converting 1,027 sporadically serviced dealers to regular billing pattern matching Thane West benchmark. Fans category contributes 55% of the opportunity.',
          nextAgent: null
        }
      ],
      whatIfScenarios: [
        'What drives the 16-point distribution variance between territories?',
        'How does dealer service frequency correlate with distribution percentage?',
        'What if sporadic dealers were converted to regular billing patterns?',
        'Would matching Thane West order frequency close the entire gap?'
      ]
    },
    {
      id: 3,
      priority: 'high',
      title: 'Summer-push SKU numeric distribution at 72% vs 88% target - 18 days to peak summer demand',
      summary: 'Summer portfolio stocking rate 16 points below target across 3,850 dealers',
      keyNumbers: {
        currentDistribution: '72% of dealers',
        targetDistribution: '88% by Mar 8',
        unbilledOutlets: '615 dealers',
        gapVsLYSM: '-6 pts vs Summer 2025'
      },
      narrative: "Summer-push SKU portfolio (SilentPro BLDC fans, Energion BLDC fans, Aura pedestal fans, Hill Briz desert coolers) currently at 72% numeric distribution vs 88% target for peak summer window (Mar 14 - May 31). This represents a 6-point decline vs last year's summer pre-positioning. Distribution gap concentrated in Western suburbs (64%) and Central Mumbai (68%), while Eastern suburbs and Thane track closer to target at 78-82%. Secondary sales data shows 615 dealers have not been billed for summer-push SKUs despite having regular orders for core lighting and pump portfolio. Summer SKU order frequency from distributors is 2 times per week vs target of 2-3 times - indicating insufficient push in secondary sales cycle. Historical correlation shows 88%+ distribution during summer window drives 34% volume uplift in Fans category.",
      dataTable: {
        headers: ['Territory', 'Summer SKU Dist', 'vs LYSM', 'Unbilled Dealers', 'Gap to Target'],
        rows: [
          ['Western Suburbs', '64%', '-8 pts', '288 dealers', '-24 pts'],
          ['Central Mumbai', '68%', '-7 pts', '352 dealers', '-20 pts'],
          ['Thane', '78%', '-4 pts', '114 dealers', '-10 pts'],
          ['Eastern Suburbs', '82%', '-3 pts', '96 dealers', '-6 pts']
        ]
      },
      supplyChainBacking: "Summer-push SKU inventory at 142% of normal levels. SilentPro and Energion production lines running at full capacity. No supply constraints.",
      recommendation: {
        action: "Accelerate summer-push SKU secondary sales across 615 unbilled dealers. Focus distributor engagement in Western and Central territories to increase order frequency from 2 times to 2-3 times per week. Priority on dealers in high-footfall electrical markets and residential catchments.",
        return: "Achieving 88% distribution protects Rs 88L summer window revenue opportunity",
        roi: "Summer peak contributes 35-40% of annual Fans category revenue in Mumbai region"
      },
      owner: 'Distribution Planning - Seasonal Category',
      color: C.sage,
      trail: [
        {
          timestamp: '11:20 AM',
          agent: 'Orchestrator Agent',
          action: 'Analyzing summer-push SKU distribution readiness for Crompton Fans',
          database: 'Sales Analytics DB',
          query: 'SELECT season, sku_category, current_distribution, target_distribution, days_to_peak FROM seasonal_distribution_tracking WHERE region = "Mumbai" AND peak_date > CURRENT_DATE AND category = "fans" ORDER BY peak_date LIMIT 1',
          thinking: 'Summer peak in 18 days. Summer-push fan portfolio (SilentPro, Energion, Aura, Hill Briz) at 72% numeric distribution vs 88% target (16 point gap). This is 6 points below LYSM positioning for same period. Distribution lag concentrated in certain territories.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '11:22 AM',
          agent: 'Distribution Agent',
          action: 'Mapping summer-push fan stocking patterns by territory',
          database: 'DMS System',
          query: 'SELECT territory, COUNT(dealer_id) as total_dealers, SUM(CASE WHEN summer_sku_billed = 1 THEN 1 ELSE 0 END) as stocked_dealers, SUM(CASE WHEN summer_sku_billed = 0 AND core_sku_billed = 1 THEN 1 ELSE 0 END) as unbilled_dealers FROM dealer_billing_patterns WHERE region = "Mumbai" AND category = "fans" GROUP BY territory',
          thinking: '615 dealers unbilled for summer-push fan SKUs despite regular orders for lighting and pump portfolio. Western suburbs accounts for 288 unbilled dealers (64% distribution), Central 352 dealers (68% distribution). Gap vs Eastern suburbs (82%) and Thane (78%) indicates execution variance.',
          nextAgent: 'Sales Agent'
        },
        {
          timestamp: '11:24 AM',
          agent: 'Sales Agent',
          action: 'Examining summer-push fan secondary sales velocity',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, distributor_id, AVG(summer_sku_order_frequency) as order_freq, trend_vs_lysm FROM distributor_ordering_patterns WHERE sku_category = "summer_fans" AND region = "Mumbai" GROUP BY territory',
          thinking: 'Summer fan order frequency from distributors at 2 times per week vs target of 2-3 times. This ordering rhythm gap drives the distribution shortfall. Top territories maintain 2.3-2.5 times frequency, lagging territories at 1.5-2 times. SilentPro BLDC is the most underpenetrated SKU.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '11:26 AM',
          agent: 'Distribution Agent',
          action: 'Analyzing historical summer season performance correlation',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, summer_distribution_percentage, sales_uplift_percentage, revenue_impact FROM seasonal_performance_history WHERE season = "summer" AND year >= YEAR(CURRENT_DATE) - 2 GROUP BY territory',
          thinking: 'Historical correlation shows 88%+ summer-push fan distribution drives 34% volume uplift during peak summer window. Last summer: territories below 75% distribution lost Rs 92L across Mumbai region. Current 72% distribution projects Rs 88L opportunity gap. Fans category is 55% of Crompton Mumbai revenue.',
          nextAgent: 'Analytics Engine'
        },
        {
          timestamp: '11:28 AM',
          agent: 'Analytics Engine',
          action: 'Quantifying summer distribution acceleration requirement',
          database: 'Analytics DB',
          query: 'SELECT territory, current_distribution, target_distribution, unbilled_dealers, required_order_frequency_increase, revenue_protection FROM seasonal_gap_analysis WHERE region = "Mumbai" AND season = "Summer 2026"',
          thinking: 'Achieving 88% distribution requires converting 615 unbilled dealers and increasing distributor order frequency from 2 times to 2-3 times per week in Western and Central territories. This protects Rs 88L summer window revenue opportunity. SilentPro and Energion availability is critical.',
          nextAgent: null
        }
      ],
      whatIfScenarios: [
        'What if summer-push fan distribution remains at 72% through peak season?',
        'How does distributor order frequency impact summer fan reach?',
        'What is the revenue correlation between distribution % and summer uplift?',
        'Would prioritizing Western and Central territories yield optimal ROI?'
      ]
    }
  ];

  const territories = [
    {
      name: 'Rahul Verma',
      territory: 'Mumbai GT',
      achievement: 76,
      outlets: { total: 890, active: 825, productive: 685 },
      coverage: 68,
      mustSellMix: 28,
      status: 'critical',
      trend: [82, 79, 73, 68],
      topIssue: 'BLDC fan distribution gap and premium mix below potential',
      distributors: [
        {
          name: 'Sagar Distributors',
          territory: 'Andheri West & Bandra',
          monthlyVolume: '₹1.4Cr',
          outlets: { total: 285, active: 265, productive: 218 },
          orderFrequency: '2 times per week',
          achievement: 62,
          status: 'critical',
          metrics: {
            mandateCompliance: '78%',
            stockOnHand: '1,850 units',
            returns: '3.1%'
          },
          tsrs: [
            { 
              name: 'Ramesh Patil', 
              location: 'Andheri West',
              salesActual: '₹6.8L',
              salesTarget: '₹11.2L',
              volumeActual: '1,840 units',
              volumeTarget: '3,150 units',
              achievement: 61,
              outlets: { active: 78, target: 95, notBilledLast30Days: 17, coverage: '82%' },
              productivity: { callsPerDay: 11, ordersPerDay: 5, linesPerOrder: 5 },
              performanceDrivers: { distribution: -28, mandays: -35, avgOrderValue: -12 }
            },
            { 
              name: 'Sunil Kumar', 
              location: 'Bandra West',
              salesActual: '₹8.2L',
              salesTarget: '₹12.4L',
              volumeActual: '2,280 units',
              volumeTarget: '3,420 units',
              achievement: 66,
              outlets: { active: 71, target: 83, notBilledLast30Days: 12, coverage: '86%' },
              productivity: { callsPerDay: 13, ordersPerDay: 6, linesPerOrder: 6 },
              performanceDrivers: { distribution: -22, mandays: -28, avgOrderValue: -8 }
            },
            { 
              name: 'Deepak Rane', 
              location: 'Andheri East',
              salesActual: '₹7.6L',
              salesTarget: '₹12.8L',
              volumeActual: '2,050 units',
              volumeTarget: '3,480 units',
              achievement: 59,
              outlets: { active: 89, target: 107, notBilledLast30Days: 18, coverage: '83%' },
              productivity: { callsPerDay: 12, ordersPerDay: 6, linesPerOrder: 5 },
              performanceDrivers: { distribution: -25, mandays: -32, avgOrderValue: -10 }
            }
          ]
        },
        {
          name: 'Metro Distributors',
          territory: 'Borivali & Kandivali',
          monthlyVolume: '₹1.4Cr',
          outlets: { total: 320, active: 245, productive: 198 },
          orderFrequency: '3 times per week',
          achievement: 74,
          status: 'warning',
          metrics: {
            mandateCompliance: '92%',
            stockOnHand: '2,100 units',
            returns: '2.2%'
          },
          tsrs: [
            { 
              name: 'Prakash Mane', 
 
              location: 'Borivali West',
 
              salesActual: '₹9.1L',
 
              salesTarget: '₹12.0L',
 
              volumeActual: '2,527 units',
 
              volumeTarget: '3,333 units',
 
              achievement: 76,
              outlets: { active: 96, target: 108, notBilledLast30Days: 12, coverage: '89%' },
              productivity: { callsPerDay: 15, ordersPerDay: 8, linesPerOrder: 7 },
              performanceDrivers: { distribution: -12, mandays: -18, avgOrderValue: -6 }
            },
            { 
              name: 'Vijay Shinde', 
 
              location: 'Kandivali East',
 
              salesActual: '₹10.2L',
 
              salesTarget: '₹14.0L',
 
              volumeActual: '2,833 units',
 
              volumeTarget: '3,888 units',
 
              achievement: 73,
              outlets: { active: 91, target: 105, notBilledLast30Days: 14, coverage: '87%' },
              productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 7 },
              performanceDrivers: { distribution: -15, mandays: -22, avgOrderValue: -7 }
            },
            { 
              name: 'Rajesh More', 
 
              location: 'Borivali East',
 
              salesActual: '₹9.5L',
 
              salesTarget: '₹13.0L',
 
              volumeActual: '2,638 units',
 
              volumeTarget: '3,611 units',
 
              achievement: 73,
              outlets: { active: 93, target: 107, notBilledLast30Days: 14, coverage: '87%' },
              productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 6 },
              performanceDrivers: { distribution: -14, mandays: -20, avgOrderValue: -8 }
            }
          ]
        },
        {
          name: 'Reliable Traders',
          territory: 'Malad & Goregaon',
          monthlyVolume: '₹1.0Cr',
          outlets: { total: 285, active: 268, productive: 225 },
          orderFrequency: '2-3 times per week',
          achievement: 68,
          status: 'warning',
          metrics: {
            mandateCompliance: '85%',
            stockOnHand: '1,650 units',
            returns: '2.6%'
          },
          tsrs: [
            { 
              name: 'Anil Pawar', 
 
              location: 'Malad West',
 
              salesActual: '₹9.1L',
 
              salesTarget: '₹13.0L',
 
              volumeActual: '2,527 units',
 
              volumeTarget: '3,611 units',
 
              achievement: 70,
              outlets: { active: 82, target: 96, notBilledLast30Days: 14, coverage: '85%' },
              productivity: { callsPerDay: 13, ordersPerDay: 6, linesPerOrder: 6 },
              performanceDrivers: { distribution: -18, mandays: -25, avgOrderValue: -9 }
            },
            { 
              name: 'Santosh Jadhav', 
 
              location: 'Goregaon West',
 
              salesActual: '₹7.9L',
 
              salesTarget: '₹12.0L',
 
              volumeActual: '2,194 units',
 
              volumeTarget: '3,333 units',
 
              achievement: 66,
              outlets: { active: 75, target: 89, notBilledLast30Days: 14, coverage: '84%' },
              productivity: { callsPerDay: 12, ordersPerDay: 5, linesPerOrder: 5 },
              performanceDrivers: { distribution: -20, mandays: -28, avgOrderValue: -11 }
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
      mustSellMix: 35,
      status: 'warning',
      trend: [92, 91, 89, 88],
      topIssue: 'Hadapsar wholesale cluster down 12% vs LM - Pump category underperforming',
      distributors: [
        {
          name: 'Apex Trading Co',
          territory: 'Pune Central & Deccan',
          monthlyVolume: '₹1.8Cr',
          outlets: { total: 380, active: 342, productive: 298 },
          orderFrequency: '3 times per week',
          achievement: 92,
          status: 'healthy',
          metrics: {
            mandateCompliance: '94%',
            stockOnHand: '2,850 units',
            returns: '1.3%'
          },
          tsrs: [
            { 
              name: 'Manoj Deshmukh', 
 
              location: 'Deccan',
 
              salesActual: '₹11.3L',
 
              salesTarget: '₹12.0L',
 
              volumeActual: '3,138 units',
 
              volumeTarget: '3,333 units',
 
              achievement: 94,
              outlets: { active: 119, target: 125, notBilledLast30Days: 6, coverage: '95%' },
              productivity: { callsPerDay: 17, ordersPerDay: 10, linesPerOrder: 7 },
              performanceDrivers: { distribution: -3, mandays: -5, avgOrderValue: -2 }
            },
            { 
              name: 'Sachin Bhosale', 
 
              location: 'Pune Central',
 
              salesActual: '₹12.7L',
 
              salesTarget: '₹14.0L',
 
              volumeActual: '3,527 units',
 
              volumeTarget: '3,888 units',
 
              achievement: 91,
              outlets: { active: 112, target: 118, notBilledLast30Days: 6, coverage: '95%' },
              productivity: { callsPerDay: 16, ordersPerDay: 9, linesPerOrder: 7 },
              performanceDrivers: { distribution: -4, mandays: -6, avgOrderValue: -3 }
            },
            { 
              name: 'Vaibhav Kulkarni', 
 
              location: 'Shivaji Nagar',
 
              salesActual: '₹12.9L',
 
              salesTarget: '₹14.0L',
 
              volumeActual: '3,583 units',
 
              volumeTarget: '3,888 units',
 
              achievement: 92,
              outlets: { active: 130, target: 137, notBilledLast30Days: 7, coverage: '95%' },
              productivity: { callsPerDay: 18, ordersPerDay: 10, linesPerOrder: 7 },
              performanceDrivers: { distribution: -4, mandays: -6, avgOrderValue: -2 }
            }
          ]
        },
        {
          name: 'Shivaji Distributors',
          territory: 'Hadapsar & Kharadi',
          monthlyVolume: '₹1.4Cr',
          outlets: { total: 295, active: 268, productive: 218 },
          orderFrequency: '3 times per week',
          achievement: 78,
          status: 'warning',
          metrics: {
            mandateCompliance: '88%',
            stockOnHand: '2,200 units',
            returns: '1.8%'
          },
          tsrs: [
            { 
              name: 'Ganesh Pawar', 
 
              location: 'Hadapsar',
 
              salesActual: '₹10.5L',
 
              salesTarget: '₹14.0L',
 
              volumeActual: '2,916 units',
 
              volumeTarget: '3,888 units',
 
              achievement: 75,
              outlets: { active: 78, target: 92, notBilledLast30Days: 14, coverage: '85%' },
              productivity: { callsPerDay: 13, ordersPerDay: 7, linesPerOrder: 6 },
              performanceDrivers: { distribution: -16, mandays: -22, avgOrderValue: -9 }
            },
            { 
              name: 'Kiran Shinde', 
 
              location: 'Kharadi',
 
              salesActual: '₹10.4L',
 
              salesTarget: '₹13.0L',
 
              volumeActual: '2,888 units',
 
              volumeTarget: '3,611 units',
 
              achievement: 80,
              outlets: { active: 82, target: 88, notBilledLast30Days: 6, coverage: '93%' },
              productivity: { callsPerDay: 15, ordersPerDay: 8, linesPerOrder: 7 },
              performanceDrivers: { distribution: -10, mandays: -14, avgOrderValue: -6 }
            },
            { 
              name: 'Nitin Jagtap', 
 
              location: 'Hadapsar East',
 
              salesActual: '₹11.1L',
 
              salesTarget: '₹14.0L',
 
              volumeActual: '3,083 units',
 
              volumeTarget: '3,888 units',
 
              achievement: 79,
              outlets: { active: 81, target: 88, notBilledLast30Days: 7, coverage: '92%' },
              productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 7 },
              performanceDrivers: { distribution: -12, mandays: -16, avgOrderValue: -7 }
            }
          ]
        },
        {
          name: 'Ganesh Enterprises',
          territory: 'Wakad & Hinjewadi',
          monthlyVolume: '₹1.0Cr',
          outlets: { total: 275, active: 255, productive: 204 },
          orderFrequency: '3 times per week',
          achievement: 89,
          status: 'healthy',
          metrics: {
            mandateCompliance: '76%',
            stockOnHand: '1,950 units',
            returns: '1.4%'
          },
          tsrs: [
            { 
              name: 'Sanjay Gaikwad', 
 
              location: 'Wakad',
 
              salesActual: '₹12.6L',
 
              salesTarget: '₹14.0L',
 
              volumeActual: '3,500 units',
 
              volumeTarget: '3,888 units',
 
              achievement: 90,
              outlets: { active: 130, target: 138, notBilledLast30Days: 8, coverage: '94%' },
              productivity: { callsPerDay: 16, ordersPerDay: 9, linesPerOrder: 7 },
              performanceDrivers: { distribution: -6, mandays: -10, avgOrderValue: -4 }
            },
            { 
              name: 'Amit Shirke', 
 
              location: 'Hinjewadi',
 
              salesActual: '₹12.3L',
 
              salesTarget: '₹14.0L',
 
              volumeActual: '3,416 units',
 
              volumeTarget: '3,888 units',
 
              achievement: 88,
              outlets: { active: 109, target: 117, notBilledLast30Days: 8, coverage: '93%' },
              productivity: { callsPerDay: 15, ordersPerDay: 8, linesPerOrder: 7 },
              performanceDrivers: { distribution: -8, mandays: -12, avgOrderValue: -5 }
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
      mustSellMix: 52,
      status: 'healthy',
      trend: [99, 102, 104, 105],
      topIssue: 'Benchmark performance - replicate BLDC fan push practices',
      distributors: [
        {
          name: 'Premier Supplies',
          territory: 'Thane West',
          monthlyVolume: '₹1.5Cr',
          outlets: { total: 410, active: 410, productive: 362 },
          orderFrequency: '4 times per week',
          achievement: 108,
          status: 'healthy',
          metrics: {
            mandateCompliance: '91%',
            stockOnHand: '1,450 units',
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
          orderFrequency: '3 times per week',
          achievement: 102,
          status: 'healthy',
          metrics: {
            mandateCompliance: '83%',
            stockOnHand: '1,680 units',
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
      mustSellMix: 33,
      status: 'healthy',
      trend: [89, 90, 90, 90],
      topIssue: 'Stable performance, no critical issues',
      distributors: [
        {
          name: 'Coastal Distributors',
          territory: 'Vashi & Nerul',
          monthlyVolume: '₹1.3Cr',
          outlets: { total: 345, active: 332, productive: 285 },
          orderFrequency: '3 times per week',
          achievement: 91,
          status: 'healthy',
          metrics: {
            mandateCompliance: '96%',
            stockOnHand: '2,100 units',
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
          orderFrequency: '3 times per week',
          achievement: 89,
          status: 'healthy',
          metrics: {
            mandateCompliance: '87%',
            stockOnHand: '1,550 units',
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
      aiResponse.text = "The root cause is a cascading effect: field team shortage leads to reduced dealer coverage leads to empty display shelves leads to distributors see no demand signal leads to they reduce BLDC fan and pump orders. It is a negative feedback loop accelerating at 4% weekly. SilentPro and Energion BLDC fans are most impacted.";
      aiResponse.suggestions = ['How fast can we recover?', 'What is the cost of inaction?', 'Compare to similar situations'];
    } else if (lowerText.includes('action') || lowerText.includes('plan')) {
      aiResponse.text = "Week 1: Deploy 3 field executives (recruitment agency ready). Week 2-3: New team shadows existing, reactivates dropped dealers with SilentPro demo units. Week 4: Coverage back to 82%, Rs 125k weekly recovery begins across Fans and Pumps categories. Total investment: Rs 66k monthly. Return: Rs 500k monthly.";
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
            Crompton Sales Watchtower
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
                { label: 'Mumbai Achievement', value: '89%', change: '-11% vs LYSM', trend: 'down', icon: Target, color: C.sage },
                { label: 'Active Dealers (L90D)', value: '1,850', sub: 'of 2,055 total', icon: MapPin, color: C.sage },
                { label: 'Mumbai Avg Coverage', value: '88%', change: '-6% vs LYSM', trend: 'down', icon: Activity, color: C.lightGrey },
                { label: 'BLDC Fan Mix', value: '32%', sub: 'vs 52% Thane', icon: Package, color: C.sage }
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
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '12px' }}>
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
                      { label: 'Must-sell Mix', value: `${territory.mustSellMix}%`, good: territory.mustSellMix >= 42 },
                      { label: 'Active (billed L90D)', value: `${territory.outlets.active} of ${territory.outlets.total}`, good: true }
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
                              { label: 'Active (billed L90D)', value: `${distributor.outlets.active} of ${distributor.outlets.total}` },
                              { label: 'Productive (MTD)', value: `${distributor.outlets.productive} outlets` }
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
                              { label: 'Mandate Compliance', value: distributor.metrics.mandateCompliance },
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
                                  <div key={tsrIdx} style={{ padding: '20px', backgroundColor: C.white, border: `1px solid ${C.cream}`, borderRadius: '6px' }}>
                                    
                                    {/* Header: Name and Location */}
                                    <div style={{ marginBottom: '12px' }}>
                                      <div style={{ fontSize: '15px', fontWeight: '600', color: C.darkGreen, marginBottom: '2px' }}>
                                        {tsr.name}
                                      </div>
                                      <div style={{ fontSize: '11px', color: C.lightGrey }}>
                                        {tsr.location}
                                      </div>
                                    </div>

                                    {/* Sales Achievement - Primary Metric */}
                                    <div style={{ marginBottom: '16px', padding: '14px', backgroundColor: C.offWhite, borderRadius: '6px', border: `1px solid ${C.cream}` }}>
                                      <div style={{ fontSize: '10px', fontWeight: '600', color: C.lightGrey, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Sales Achievement
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <div>
                                          <div style={{ fontSize: '22px', fontWeight: '600', color: tsr.achievement >= 85 ? C.darkGreen : tsr.achievement >= 70 ? '#D97706' : '#DC2626' }}>
                                            {tsr.salesActual}
                                          </div>
                                          <div style={{ fontSize: '11px', color: C.lightGrey }}>of {tsr.salesTarget} target</div>
                                        </div>
                                        <div style={{ fontSize: '28px', fontWeight: '300', color: tsr.achievement >= 85 ? C.darkGreen : tsr.achievement >= 70 ? '#D97706' : '#DC2626' }}>
                                          {tsr.achievement}%
                                        </div>
                                      </div>
                                      <div style={{ fontSize: '11px', color: C.darkGrey, paddingTop: '8px', borderTop: `1px solid ${C.cream}` }}>
                                        Volume: {tsr.volumeActual} / {tsr.volumeTarget}
                                      </div>
                                    </div>

                                    {/* Performance Drivers - What's affecting achievement */}
                                    <div style={{ marginBottom: '14px' }}>
                                      <div style={{ fontSize: '10px', fontWeight: '600', color: C.lightGrey, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Performance Drivers (vs Last Month)
                                      </div>
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                        <div style={{ padding: '8px', backgroundColor: `${C.sage}08`, borderRadius: '4px' }}>
                                          <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px', textTransform: 'uppercase' }}>Distribution</div>
                                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#DC2626' }}>{tsr.performanceDrivers.distribution}%</div>
                                          <div style={{ fontSize: '8px', color: C.lightGrey, marginTop: '2px' }}>vs LM</div>
                                        </div>
                                        <div style={{ padding: '8px', backgroundColor: `${C.sage}08`, borderRadius: '4px' }}>
                                          <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px', textTransform: 'uppercase' }}>Mandays</div>
                                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#DC2626' }}>{tsr.performanceDrivers.mandays}%</div>
                                          <div style={{ fontSize: '8px', color: C.lightGrey, marginTop: '2px' }}>vs LM</div>
                                        </div>
                                        <div style={{ padding: '8px', backgroundColor: `${C.sage}08`, borderRadius: '4px' }}>
                                          <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px', textTransform: 'uppercase' }}>Avg Order Value</div>
                                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#DC2626' }}>{tsr.performanceDrivers.avgOrderValue}%</div>
                                          <div style={{ fontSize: '8px', color: C.lightGrey, marginTop: '2px' }}>vs LM</div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Outlet Coverage */}
                                    <div style={{ marginBottom: '14px' }}>
                                      <div style={{ fontSize: '10px', fontWeight: '600', color: C.lightGrey, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Outlet Coverage
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <div>
                                          <div style={{ fontSize: '10px', color: C.lightGrey }}>Billed this month: {tsr.outlets.active}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                          <div style={{ fontSize: '10px', color: C.lightGrey }}>Target: {tsr.outlets.target}</div>
                                        </div>
                                      </div>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '11px', color: '#DC2626' }}>Not billed in 30 days: {tsr.outlets.notBilledLast30Days}</div>
                                        <div style={{ fontSize: '13px', fontWeight: '600', color: C.darkGreen }}>{tsr.outlets.coverage} coverage</div>
                                      </div>
                                    </div>

                                    {/* Productivity */}
                                    <div>
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
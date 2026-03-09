"use client"
import React, { useState } from 'react';
import { MessageSquare, TrendingUp, TrendingDown, AlertCircle, ChevronRight, Users, Package, MapPin, Activity, Send, X, Target, Sparkles, Clock, ChevronDown, BarChart3, Eye, Layers, Bell, Settings, LogOut, Search, Home, Compass, FileText, HelpCircle, ChevronLeft, User, Shield, Database, Zap, Menu } from 'lucide-react';

export default function QuesttSalesWatchtower() {
  const [activeTab, setActiveTab] = useState('briefing');
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [expandedTerritory, setExpandedTerritory] = useState(null);
  const [trailOpen, setTrailOpen] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [morrieChatOpen, setMorrieChatOpen] = useState(null); // index of open briefing chat
  const [morrieChatMessages, setMorrieChatMessages] = useState({});
  const [morrieInput, setMorrieInput] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const chatMessagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Close dropdowns on outside click
  React.useEffect(() => {
    const handleClick = () => {
      setProfileDropdownOpen(false);
      setNotificationsOpen(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const C = {
    green: '#1C1C1C',
    darkGreen: '#111A15',
    sage: '#2D5A3D',
    cream: '#E5E2DB',
    darkGrey: '#555555',
    lightGrey: '#999999',
    white: '#FFFFFF',
    offWhite: '#FAFAF8',
    lightSage: '#EAF2EF',
    border: '#E5E2DB',
    borderLight: '#F0EDE7',
    bgAlt: '#F3F0EA',
    sageSoft: '#EAF2EF',
    sageBorder: 'rgba(45,90,61,0.2)',
    terra: '#B33A3A',
    terraSoft: '#FDF3F3',
    amber: '#946B1A',
    amberSoft: '#FDFAF0'
  };
  const font = "'IBM Plex Sans', -apple-system, sans-serif";
  const serif = "Georgia, 'DM Serif Display', serif";

  const sidebarWidth = 64;

  const notifications = [
    { id: 1, text: 'Western territory stockout alert escalated', time: '12 min ago', unread: true },
    { id: 2, text: 'Weekly achievement report generated', time: '1 hr ago', unread: true },
    { id: 3, text: 'Central territory recovery confirmed', time: '3 hrs ago', unread: false },
  ];

  const briefingPoints = [
    {
      type: 'critical',
      title: 'Western territory - projected stockout in 2 days across 3 distributors',
      detail: 'Stock alert: Classic Crunch 52g and Spice Twist 85g inventory at 1.2 days cover across Alpha, Gamma, and Beta Distributors. 685 outlets at risk of stockout by Jan 31. Estimated sales loss of Rs 8.2L/day if stockout occurs. Immediate reorder required.'
    },
    {
      type: 'alert',
      title: 'Central territory - must-sell SKU inventory running low at 2 distributors',
      detail: 'Inventory alert: Triangle Chips 90g and Hot Puffs at 2.5 days cover in Area North & Area East distributors. 420 outlets at risk. Projected stockout by Feb 1 if current offtake continues. Need expedited secondary sales push of Rs 4.8L.'
    },
    {
      type: 'alert',
      title: 'Western territory - order frequency dropped across 4 distributors this week',
      detail: 'Beta, Delta, Epsilon Trading, and Zeta Distributors placed 32% fewer orders this week (38 orders vs 56 typical). Covering 1,140 outlets. DMS flags irregular ordering pattern across Western territory for last 10 days.'
    },
    {
      type: 'performance',
      title: 'Region-wide weekly achievement at 87% vs 92% target',
      detail: 'Current weekly run-rate at 87%. Need Rs 42L additional billing to hit weekly target. Eastern territory at 96%, Central & Western territories need acceleration to close Rs 42L gap.'
    },
    {
      type: 'highlight',
      title: 'Central territory - 3 distributors restored to 92%+ distribution from 68% slump',
      detail: 'Delta, Alpha, and Eta Distributors (Area East & Area Northeast areas) recovered from 2-week distribution slump. Now averaging 92% numeric distribution vs 68% two weeks ago. Covering 825 outlets. Secondary sales back to Rs 52L weekly.'
    }
  ];

  const insights = [
    {
      id: 1,
      priority: 'critical',
      title: 'Must-sell SKU distribution gap of 24 points vs core portfolio - 1,240 unbilled outlets',
      summary: 'Triangle Chips & Hot Puffs at 68% numeric distribution vs 92% for Classic Crunch - Rs 2.2Cr quarterly gap',
      keyNumbers: {
        distributionGap: '68% vs 92% (24 pts)',
        unbilledOutlets: '1,240 outlets',
        revenueOpportunity: 'Rs 2.2Cr quarterly',
        gapVsLYSM: '-8 pts vs Jan 2025'
      },
      narrative: "Must-sell SKU numeric distribution has declined 8 points vs last year same month, now at 68% compared to 92% for core Classic Crunch portfolio. Central District shows steepest drop at 61% distribution (down from 74% LYSM). Analysis reveals systematic pattern: 4 of 18 distributors consistently under-stock must-sell SKUs despite maintaining 85%+ core distribution. These distributors collectively serve 1,240 outlets - all currently unbilled for must-sell portfolio. Distributor order frequency data shows must-sell SKUs ordered 18% less frequently than core SKUs, suggesting systematic deprioritization in secondary sales cycle.",
      dataTable: {
        headers: ['Territory', 'Premium Dist', 'vs LYSM', 'Unbilled Outlets', 'Quarterly Gap'],
        rows: [
          ['Central District', '61%', '-13 pts', '485 outlets', 'Rs 85L'],
          ['Western District', '64%', '-10 pts', '358 outlets', 'Rs 68L'],
          ['East Zone', '74%', '-4 pts', '195 outlets', 'Rs 27L'],
          ['Eastern District', '79%', '-3 pts', '202 outlets', 'Rs 42L']
        ]
      },
      recommendation: {
        action: "Systematic distributor engagement required to restore must-sell SKU order frequency. Focus on 4 distributors serving 1,240 unbilled outlets. Address root causes: order size constraints and beat coverage gaps for must-sell portfolio.",
        return: "Closing gap to 84% distribution unlocks Rs 1.6Cr quarterly recurring revenue",
        roi: "Represents 0.73% improvement in overall Metro numeric distribution"
      },
      owner: 'Distribution Planning - Metro Region',
      color: C.sage,
      trail: [
        {
          timestamp: '09:14 AM',
          agent: 'Orchestrator Agent',
          action: 'Analyzing weekly distribution performance',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, sku_category, numeric_distribution, outlet_count, trend_vs_lysm FROM weekly_distribution WHERE region = "Metro" AND week = CURRENT_WEEK',
          thinking: 'Must-sell SKU distribution at 68% vs 92% for core portfolio - 24 point gap. Central territory showing steepest decline at 61% (down 13 points vs LYSM). This gap is widening month-over-month.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '09:15 AM',
          agent: 'Distribution Agent',
          action: 'Identifying distributor-level stocking patterns',
          database: 'DMS System',
          query: 'SELECT distributor_id, distributor_name, premium_sku_numeric_dist, core_sku_numeric_dist, outlet_count, unbilled_outlets FROM distributor_performance WHERE territory IN ("Central", "Western", "Eastern", "East Zone") AND premium_sku_numeric_dist < 70',
          thinking: '4 distributors maintain 85%+ core distribution but only 60-65% premium. Collectively serving 1,240 outlets that are unbilled for must-sell portfolio. This is a systematic stocking selectivity pattern.',
          nextAgent: 'Sales Agent'
        },
        {
          timestamp: '09:17 AM',
          agent: 'Sales Agent',
          action: 'Examining secondary sales order frequency patterns',
          database: 'Sales Analytics DB',
          query: 'SELECT distributor_id, sku_category, avg_order_frequency, orders_per_month, trend_3_months FROM secondary_sales WHERE distributor_id IN (102, 105, 108, 112) AND month = CURRENT_MONTH',
          thinking: 'Must-sell SKU order frequency 18% lower than core at these 4 distributors. Ordering pattern shows 2 times per month for must-sell vs 4 times per month for core. Gap indicates systematic deprioritization in secondary sales cycle.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '09:19 AM',
          agent: 'Distribution Agent',
          action: 'Analyzing unbilled outlet coverage for must-sell SKUs',
          database: 'DMS System',
          query: 'SELECT territory, COUNT(outlet_id) as unbilled_outlets, SUM(potential_monthly_value) as opportunity FROM outlet_billing_patterns WHERE premium_sku_billed = 0 AND core_sku_billed = 1 GROUP BY territory',
          thinking: '1,240 outlets currently unbilled for must-sell SKUs despite ordering core portfolio regularly. Central District accounts for 485 of these outlets (Rs 85L quarterly opportunity). This is a coverage execution gap.',
          nextAgent: 'Analytics Engine'
        },
        {
          timestamp: '09:21 AM',
          agent: 'Analytics Engine',
          action: 'Quantifying distribution gap impact and trend',
          database: 'Analytics DB',
          query: 'SELECT sku_category, current_distribution, lysm_distribution, gap_value_quarterly, trend_direction FROM distribution_gap_analysis WHERE region = "Metro" AND category = "premium"',
          thinking: 'Must-sell portfolio gap widened from 18 points (LYSM) to 24 points currently. If gap continues expanding at current rate, quarterly opportunity loss reaches Rs 2.8Cr by next quarter. Distribution recovery to 84% unlocks Rs 1.6Cr recurring quarterly revenue.',
          nextAgent: null
        }
      ],
      whatIfScenarios: [
        'What if must-sell SKU gap continues widening at current rate?',
        'How would closing gap in Central territory alone impact overall distribution?',
        'What is the correlation between order frequency and distribution gaps?',
        'Would focusing on top 4 distributors yield proportional improvement?'
      ]
    },
    {
      id: 2,
      priority: 'high',
      title: 'Territory-level distribution variance - 16 point gap between best and worst performing areas',
      summary: 'East Zone West at 94% numeric distribution vs Central District at 78% - systematic coverage pattern',
      keyNumbers: {
        distributionRange: '78% to 94% (16 pts)',
        topTerritory: 'East Zone West 94%',
        bottomTerritory: 'Central District 78%',
        gapVsLYSM: 'Variance up from 11 pts'
      },
      narrative: "Territory-level distribution analysis reveals widening performance gap - variance increased from 11 points (LYSM) to 16 points currently. East Zone West maintains 94% numeric distribution through consistent 92% outlet service frequency, while Central District at 78% distribution has only 76% outlet service frequency. Pattern analysis shows top-performing territories have 3 times per week order frequency per distributor vs 2 times in lower-performing areas. Distribution depth (outlets per distributor) is comparable across territories, indicating gap is execution-driven rather than structural. Outlet-level data shows 615 outlets in Central territory are sporadically serviced (visited but not billed regularly), compared to only 145 such outlets in East Zone West.",
      dataTable: {
        headers: ['Territory', 'Numeric Dist', 'vs LYSM', 'Outlet Service Freq', 'Sporadic Outlets'],
        rows: [
          ['East Zone West', '94%', '+1 pt', '92%', '145 outlets'],
          ['Eastern District', '88%', '-2 pts', '86%', '238 outlets'],
          ['Western District', '81%', '-4 pts', '82%', '412 outlets'],
          ['Central District', '78%', '-6 pts', '76%', '615 outlets']
        ]
      },
      recommendation: {
        action: "Address sporadic billing pattern in Central and Western territories. Focus on 1,027 outlets with irregular service. Distributor order frequency optimization required to match East Zone West benchmark of 3 times per week.",
        return: "Closing distribution gap to 88% across all territories unlocks Rs 1.08Cr annually",
        roi: "Represents sustained improvement in outlet coverage depth"
      },
      owner: 'Distribution Planning - Metro Region',
      color: C.sage,
      trail: [
        {
          timestamp: '10:05 AM',
          agent: 'Orchestrator Agent',
          action: 'Detecting territory-level distribution variance',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, numeric_distribution, lysm_distribution, outlet_service_frequency, distributor_count FROM territory_performance WHERE region = "Metro" ORDER BY numeric_distribution DESC',
          thinking: 'Wide distribution gap across territories: East Zone West at 94% vs Central District at 78% (16 point spread). This variance has increased from 11 points LYSM. Need to identify structural vs execution-driven factors.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '10:07 AM',
          agent: 'Distribution Agent',
          action: 'Analyzing outlet service frequency patterns by territory',
          database: 'DMS System',
          query: 'SELECT territory, AVG(service_frequency_weekly) as avg_service_freq, COUNT(CASE WHEN service_pattern = "sporadic" THEN 1 END) as sporadic_outlets FROM outlet_service_patterns WHERE region = "Metro" GROUP BY territory',
          thinking: 'East Zone West maintains 92% outlet service frequency with only 145 sporadic outlets. Central District at 76% frequency with 615 sporadic outlets. Pattern shows execution consistency gap, not structural difference.',
          nextAgent: 'Sales Agent'
        },
        {
          timestamp: '10:09 AM',
          agent: 'Sales Agent',
          action: 'Examining distributor order frequency patterns',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, distributor_id, AVG(weekly_order_frequency) as order_freq, trend_3_months FROM distributor_ordering_patterns WHERE region = "Metro" GROUP BY territory',
          thinking: 'Top territories have 3 times per week distributor order frequency vs 2 times in lower-performing areas. Despite comparable distributor density, ordering rhythm differs significantly. This drives the distribution gap.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '10:11 AM',
          agent: 'Distribution Agent',
          action: 'Mapping sporadic billing patterns across territories',
          database: 'DMS System',
          query: 'SELECT territory, outlet_id, COUNT(billing_events) as billing_count, service_pattern FROM outlet_billing_history WHERE date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY) AND service_pattern = "sporadic" GROUP BY territory',
          thinking: 'Identified 1,027 outlets with sporadic billing (visited but not billed regularly). 615 in Central, 412 in Western District. These outlets represent systematic coverage depth issue - inconsistent conversion from visit to billing.',
          nextAgent: 'Analytics Engine'
        },
        {
          timestamp: '10:13 AM',
          agent: 'Analytics Engine',
          action: 'Quantifying distribution gap closure opportunity',
          database: 'Analytics DB',
          query: 'SELECT territory, current_distribution, target_distribution, gap_value_annually, outlet_count FROM distribution_opportunity WHERE region = "Metro" ORDER BY gap_value_annually DESC',
          thinking: 'Closing distribution gap to 88% across all territories unlocks Rs 1.08Cr annually. Primary driver: converting 1,027 sporadically serviced outlets to regular billing pattern matching East Zone West benchmark.',
          nextAgent: null
        }
      ],
      whatIfScenarios: [
        'What drives the 16-point distribution variance between territories?',
        'How does outlet service frequency correlate with distribution percentage?',
        'What if sporadic outlets were converted to regular billing patterns?',
        'Would matching East Zone West order frequency close the entire gap?'
      ]
    },
    {
      id: 3,
      priority: 'high',
      title: 'Festival SKU numeric distribution at 72% vs 88% target - 18 days to seasonal peak demand',
      summary: 'Festival portfolio stocking rate 16 points below target across 3,850 outlets',
      keyNumbers: {
        currentDistribution: '72% of outlets',
        targetDistribution: '88% by peak prep deadline',
        unbilledOutlets: '615 outlets',
        gapVsLYSM: '-6 pts vs Season 2025'
      },
      narrative: "Festival SKU portfolio (party packs, combo offers, festival variants) currently at 72% numeric distribution vs 88% target for seasonal peak window (peak window). This represents a 6-point decline vs last year's seasonal pre-positioning. Distribution gap concentrated in Western District (64%) and Central District (68%), while Eastern District and East Zone track closer to target at 78-82%. Secondary sales data shows 615 outlets have not been billed for festival SKUs despite having regular orders for core portfolio. Festival SKU order frequency from distributors is 2 times per week vs target of 2-3 times - indicating insufficient push in secondary sales cycle. Historical correlation shows 88%+ distribution during festival window drives 34% volume uplift.",
      dataTable: {
        headers: ['Territory', 'Festival SKU Dist', 'vs LYSM', 'Unbilled Outlets', 'Gap to Target'],
        rows: [
          ['Western District', '64%', '-8 pts', '288 outlets', '-24 pts'],
          ['Central District', '68%', '-7 pts', '352 outlets', '-20 pts'],
          ['East Zone', '78%', '-4 pts', '114 outlets', '-10 pts'],
          ['Eastern District', '82%', '-3 pts', '96 outlets', '-6 pts']
        ]
      },
      supplyChainBacking: "Festival SKU inventory at 142% of normal levels. No supply constraints.",
      recommendation: {
        action: "Accelerate festival SKU secondary sales push across 615 unbilled outlets. Focus distributor engagement in Western and Central territories to increase order frequency from 2 times to 2-3 times per week. Priority on outlets with high footfall during festival period.",
        return: "Achieving 88% distribution protects Rs 88L festival window revenue opportunity",
        roi: "Festival periods contribute 12-15% of quarterly revenue in Metro region"
      },
      owner: 'Distribution Planning - Festival Category',
      color: C.sage,
      trail: [
        {
          timestamp: '11:20 AM',
          agent: 'Orchestrator Agent',
          action: 'Analyzing festival SKU distribution readiness',
          database: 'Sales Analytics DB',
          query: 'SELECT festival_name, sku_category, current_distribution, target_distribution, days_to_festival FROM festival_distribution_tracking WHERE region = "Metro" AND festival_date > CURRENT_DATE ORDER BY festival_date LIMIT 1',
          thinking: 'seasonal peak in 18 days. Festival SKU portfolio at 72% numeric distribution vs 88% target (16 point gap). This is 6 points below LYSM positioning for same period. Distribution lag concentrated in certain territories.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '11:22 AM',
          agent: 'Distribution Agent',
          action: 'Mapping festival SKU stocking patterns by territory',
          database: 'DMS System',
          query: 'SELECT territory, COUNT(outlet_id) as total_outlets, SUM(CASE WHEN festival_sku_billed = 1 THEN 1 ELSE 0 END) as stocked_outlets, SUM(CASE WHEN festival_sku_billed = 0 AND core_sku_billed = 1 THEN 1 ELSE 0 END) as unbilled_outlets FROM outlet_billing_patterns WHERE region = "Metro" GROUP BY territory',
          thinking: '615 outlets unbilled for festival SKUs despite regular core portfolio orders. Western District accounts for 288 unbilled outlets (64% distribution), Central 352 outlets (68% distribution). Gap vs Eastern District (82%) and East Zone (78%) indicates execution variance.',
          nextAgent: 'Sales Agent'
        },
        {
          timestamp: '11:24 AM',
          agent: 'Sales Agent',
          action: 'Examining festival SKU secondary sales velocity',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, distributor_id, AVG(festival_sku_order_frequency) as order_freq, trend_vs_lysm FROM distributor_ordering_patterns WHERE sku_category = "festival" AND region = "Metro" GROUP BY territory',
          thinking: 'Festival SKU order frequency from distributors at 2 times per week vs target of 2-3 times. This ordering rhythm gap drives the distribution shortfall. Top territories maintain 2.3-2-3 times frequency, lagging territories at 1.5-2 times.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '11:26 AM',
          agent: 'Distribution Agent',
          action: 'Analyzing historical festival period performance correlation',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, festival_distribution_percentage, sales_uplift_percentage, revenue_impact FROM festival_performance_history WHERE festival = "Season Peak" AND year >= YEAR(CURRENT_DATE) - 2 GROUP BY territory',
          thinking: 'Historical correlation shows 88%+ festival SKU distribution drives 34% volume uplift during 2-week festival window. Last Season Peak: territories below 75% distribution lost Rs 92L across Metro region. Current 72% distribution projects Rs 88L opportunity gap.',
          nextAgent: 'Analytics Engine'
        },
        {
          timestamp: '11:28 AM',
          agent: 'Analytics Engine',
          action: 'Quantifying distribution acceleration requirement',
          database: 'Analytics DB',
          query: 'SELECT territory, current_distribution, target_distribution, unbilled_outlets, required_order_frequency_increase, revenue_protection FROM festival_gap_analysis WHERE region = "Metro" AND festival = "Season 2026"',
          thinking: 'Achieving 88% distribution requires converting 615 unbilled outlets and increasing distributor order frequency from 2 times to 2-3 times per week in Western and Central territories. This protects Rs 88L festival window revenue opportunity.',
          nextAgent: null
        }
      ],
      whatIfScenarios: [
        'What if festival SKU distribution remains at 72% through festival period?',
        'How does distributor order frequency impact festival SKU reach?',
        'What is the revenue correlation between distribution % and festival uplift?',
        'Would prioritizing Western and Central territories yield optimal ROI?'
      ]
    }
  ];

  const territories = [
    {
      name: 'ASM One',
      territory: 'North Zone GT',
      achievement: 76,
      outlets: { total: 890, active: 825, productive: 685 },
      coverage: 68,
      mustSellMix: 28,
      status: 'critical',
      trend: [82, 79, 73, 68],
      topIssue: 'Distribution gap and must-sell mix below potential',
      distributors: [
        {
          name: 'Alpha Distributors',
          territory: 'Area North & Area Central',
          monthlyVolume: '₹1.4Cr',
          outlets: { total: 285, active: 265, productive: 218 },
          orderFrequency: '2 times per week',
          achievement: 62,
          status: 'critical',
          metrics: {
            mandateCompliance: '78%',
            stockOnHand: '1,850 cases',
            returns: '3.1%'
          },
          tsrs: [
            { 
              name: 'TSR A1', 
              location: 'Area North',
              salesActual: '₹6.8L',
              salesTarget: '₹11.2L',
              volumeActual: '1,840 cases',
              volumeTarget: '3,150 cases',
              achievement: 61,
              outlets: { active: 78, target: 95, notBilledLast30Days: 17, coverage: '82%' },
              productivity: { callsPerDay: 11, ordersPerDay: 5, linesPerOrder: 5 },
              performanceDrivers: { distribution: -28, mandays: -35, avgOrderValue: -12 }
            },
            { 
              name: 'TSR A2', 
              location: 'Area Central',
              salesActual: '₹8.2L',
              salesTarget: '₹12.4L',
              volumeActual: '2,280 cases',
              volumeTarget: '3,420 cases',
              achievement: 66,
              outlets: { active: 71, target: 83, notBilledLast30Days: 12, coverage: '86%' },
              productivity: { callsPerDay: 13, ordersPerDay: 6, linesPerOrder: 6 },
              performanceDrivers: { distribution: -22, mandays: -28, avgOrderValue: -8 }
            },
            { 
              name: 'TSR A3', 
              location: 'Area North East',
              salesActual: '₹7.6L',
              salesTarget: '₹12.8L',
              volumeActual: '2,050 cases',
              volumeTarget: '3,480 cases',
              achievement: 59,
              outlets: { active: 89, target: 107, notBilledLast30Days: 18, coverage: '83%' },
              productivity: { callsPerDay: 12, ordersPerDay: 6, linesPerOrder: 5 },
              performanceDrivers: { distribution: -25, mandays: -32, avgOrderValue: -10 }
            }
          ]
        },
        {
          name: 'Beta Distributors',
          territory: 'Area West & Area Northwest',
          monthlyVolume: '₹1.4Cr',
          outlets: { total: 320, active: 245, productive: 198 },
          orderFrequency: '3 times per week',
          achievement: 74,
          status: 'warning',
          metrics: {
            mandateCompliance: '92%',
            stockOnHand: '2,100 cases',
            returns: '2.2%'
          },
          tsrs: [
            { 
              name: 'TSR B1', 
              location: 'Area West',
              salesActual: '₹9.1L',
              salesTarget: '₹12.0L',
              volumeActual: '2,527 cases',
              volumeTarget: '3,333 cases',
              achievement: 76,
              outlets: { active: 96, target: 108, notBilledLast30Days: 12, coverage: '89%' },
              productivity: { callsPerDay: 15, ordersPerDay: 8, linesPerOrder: 7 },
              performanceDrivers: { distribution: -12, mandays: -18, avgOrderValue: -6 }
            },
            { 
              name: 'TSR B2', 
              location: 'Area Northwest',
              salesActual: '₹10.2L',
              salesTarget: '₹14.0L',
              volumeActual: '2,833 cases',
              volumeTarget: '3,888 cases',
              achievement: 73,
              outlets: { active: 91, target: 105, notBilledLast30Days: 14, coverage: '87%' },
              productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 7 },
              performanceDrivers: { distribution: -15, mandays: -22, avgOrderValue: -7 }
            },
            { 
              name: 'TSR B3', 
              location: 'Area West East',
              salesActual: '₹9.5L',
              salesTarget: '₹13.0L',
              volumeActual: '2,638 cases',
              volumeTarget: '3,611 cases',
              achievement: 73,
              outlets: { active: 93, target: 107, notBilledLast30Days: 14, coverage: '87%' },
              productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 6 },
              performanceDrivers: { distribution: -14, mandays: -20, avgOrderValue: -8 }
            }
          ]
        },
        {
          name: 'Delta Trading',
          territory: 'Area East & Area Northeast',
          monthlyVolume: '₹1.0Cr',
          outlets: { total: 285, active: 268, productive: 225 },
          orderFrequency: '2-3 times per week',
          achievement: 68,
          status: 'warning',
          metrics: {
            mandateCompliance: '85%',
            stockOnHand: '1,650 cases',
            returns: '2.6%'
          },
          tsrs: [
            { 
              name: 'TSR C1', 
              location: 'Area East',
              salesActual: '₹9.1L',
              salesTarget: '₹13.0L',
              volumeActual: '2,527 cases',
              volumeTarget: '3,611 cases',
              achievement: 70,
              outlets: { active: 82, target: 96, notBilledLast30Days: 14, coverage: '85%' },
              productivity: { callsPerDay: 13, ordersPerDay: 6, linesPerOrder: 6 },
              performanceDrivers: { distribution: -18, mandays: -25, avgOrderValue: -9 }
            },
            { 
              name: 'TSR C2', 
              location: 'Area Northeast',
              salesActual: '₹7.9L',
              salesTarget: '₹12.0L',
              volumeActual: '2,194 cases',
              volumeTarget: '3,333 cases',
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
      name: 'ASM Two',
      territory: 'South Zone GT',
      achievement: 88,
      outlets: { total: 950, active: 865, productive: 720 },
      coverage: 91,
      mustSellMix: 35,
      status: 'warning',
      trend: [92, 91, 89, 88],
      topIssue: 'Sector South wholesale cluster down 12% vs LM',
      distributors: [
        {
          name: 'Sigma Trading Co',
          territory: 'Zone Central & Main Street',
          monthlyVolume: '₹1.8Cr',
          outlets: { total: 380, active: 342, productive: 298 },
          orderFrequency: '3 times per week',
          achievement: 92,
          status: 'healthy',
          metrics: {
            mandateCompliance: '94%',
            stockOnHand: '2,850 cases',
            returns: '1.3%'
          },
          tsrs: [
            { 
              name: 'TSR D1', 
              location: 'Main Street',
              salesActual: '₹11.3L',
              salesTarget: '₹12.0L',
              volumeActual: '3,138 cases',
              volumeTarget: '3,333 cases',
              achievement: 94,
              outlets: { active: 119, target: 125, notBilledLast30Days: 6, coverage: '95%' },
              productivity: { callsPerDay: 17, ordersPerDay: 10, linesPerOrder: 7 },
              performanceDrivers: { distribution: -3, mandays: -5, avgOrderValue: -2 }
            },
            { 
              name: 'TSR D2', 
              location: 'Zone Central',
              salesActual: '₹12.7L',
              salesTarget: '₹14.0L',
              volumeActual: '3,527 cases',
              volumeTarget: '3,888 cases',
              achievement: 91,
              outlets: { active: 112, target: 118, notBilledLast30Days: 6, coverage: '95%' },
              productivity: { callsPerDay: 16, ordersPerDay: 9, linesPerOrder: 7 },
              performanceDrivers: { distribution: -4, mandays: -6, avgOrderValue: -3 }
            },
            { 
              name: 'TSR D3', 
              location: 'Market Square',
              salesActual: '₹12.9L',
              salesTarget: '₹14.0L',
              volumeActual: '3,583 cases',
              volumeTarget: '3,888 cases',
              achievement: 92,
              outlets: { active: 130, target: 137, notBilledLast30Days: 7, coverage: '95%' },
              productivity: { callsPerDay: 18, ordersPerDay: 10, linesPerOrder: 7 },
              performanceDrivers: { distribution: -4, mandays: -6, avgOrderValue: -2 }
            }
          ]
        },
        {
          name: 'Theta Distributors',
          territory: 'Sector South & Tech Park',
          monthlyVolume: '₹1.4Cr',
          outlets: { total: 295, active: 268, productive: 218 },
          orderFrequency: '3 times per week',
          achievement: 78,
          status: 'warning',
          metrics: {
            mandateCompliance: '88%',
            stockOnHand: '2,200 cases',
            returns: '1.8%'
          },
          tsrs: [
            { 
              name: 'TSR E1', 
              location: 'Sector South',
              salesActual: '₹10.5L',
              salesTarget: '₹14.0L',
              volumeActual: '2,916 cases',
              volumeTarget: '3,888 cases',
              achievement: 75,
              outlets: { active: 78, target: 92, notBilledLast30Days: 14, coverage: '85%' },
              productivity: { callsPerDay: 13, ordersPerDay: 7, linesPerOrder: 6 },
              performanceDrivers: { distribution: -16, mandays: -22, avgOrderValue: -9 }
            },
            { 
              name: 'TSR E2', 
              location: 'Tech Park',
              salesActual: '₹10.4L',
              salesTarget: '₹13.0L',
              volumeActual: '2,888 cases',
              volumeTarget: '3,611 cases',
              achievement: 80,
              outlets: { active: 82, target: 88, notBilledLast30Days: 6, coverage: '93%' },
              productivity: { callsPerDay: 15, ordersPerDay: 8, linesPerOrder: 7 },
              performanceDrivers: { distribution: -10, mandays: -14, avgOrderValue: -6 }
            },
            { 
              name: 'TSR E3', 
              location: 'Sector South East',
              salesActual: '₹11.1L',
              salesTarget: '₹14.0L',
              volumeActual: '3,083 cases',
              volumeTarget: '3,888 cases',
              achievement: 79,
              outlets: { active: 81, target: 88, notBilledLast30Days: 7, coverage: '92%' },
              productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 7 },
              performanceDrivers: { distribution: -12, mandays: -16, avgOrderValue: -7 }
            }
          ]
        },
        {
          name: 'Kappa Enterprises',
          territory: 'Sector West & Business Hub',
          monthlyVolume: '₹1.0Cr',
          outlets: { total: 275, active: 255, productive: 204 },
          orderFrequency: '3 times per week',
          achievement: 89,
          status: 'healthy',
          metrics: {
            mandateCompliance: '76%',
            stockOnHand: '1,950 cases',
            returns: '1.4%'
          },
          tsrs: [
            { 
              name: 'TSR F1', 
              location: 'Sector West',
              salesActual: '₹12.6L',
              salesTarget: '₹14.0L',
              volumeActual: '3,500 cases',
              volumeTarget: '3,888 cases',
              achievement: 90,
              outlets: { active: 130, target: 138, notBilledLast30Days: 8, coverage: '94%' },
              productivity: { callsPerDay: 16, ordersPerDay: 9, linesPerOrder: 7 },
              performanceDrivers: { distribution: -6, mandays: -10, avgOrderValue: -4 }
            },
            { 
              name: 'TSR F2', 
              location: 'Business Hub',
              salesActual: '₹12.3L',
              salesTarget: '₹14.0L',
              volumeActual: '3,416 cases',
              volumeTarget: '3,888 cases',
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
      name: 'ASM Three',
      territory: 'East Zone GT',
      achievement: 105,
      outlets: { total: 780, active: 780, productive: 685 },
      coverage: 100,
      mustSellMix: 52,
      status: 'healthy',
      trend: [99, 102, 104, 105],
      topIssue: 'Benchmark performance - replicate practices',
      distributors: [
        {
          name: 'Lambda Supplies',
          territory: 'East Zone West',
          monthlyVolume: '₹1.5Cr',
          outlets: { total: 410, active: 410, productive: 362 },
          orderFrequency: '4 times per week',
          achievement: 108,
          status: 'healthy',
          metrics: {
            mandateCompliance: '91%',
            stockOnHand: '1,450 cases',
            returns: '0.7%'
          },
          tsrs: [
            { name: 'TSR G1', outlets: 105, achievement: 110, callCompliance: '98%' },
            { name: 'TSR G2', outlets: 102, achievement: 108, callCompliance: '96%' },
            { name: 'TSR G3', outlets: 103, achievement: 106, callCompliance: '98%' }
          ]
        },
        {
          name: 'Mu Trading',
          territory: 'East Zone East',
          monthlyVolume: '₹1.1Cr',
          outlets: { total: 370, active: 370, productive: 323 },
          orderFrequency: '3 times per week',
          achievement: 102,
          status: 'healthy',
          metrics: {
            mandateCompliance: '83%',
            stockOnHand: '1,680 cases',
            returns: '0.9%'
          },
          tsrs: [
            { name: 'TSR H1', outlets: 125, achievement: 104, callCompliance: '95%' },
            { name: 'TSR H2', outlets: 122, achievement: 101, callCompliance: '96%' },
            { name: 'TSR H3', outlets: 123, achievement: 101, callCompliance: '94%' }
          ]
        }
      ]
    },
    {
      name: 'ASM Four',
      territory: 'Navi North Zone GT',
      achievement: 90,
      outlets: { total: 620, active: 595, productive: 510 },
      coverage: 96,
      mustSellMix: 33,
      status: 'healthy',
      trend: [89, 90, 90, 90],
      topIssue: 'Stable performance, no critical issues',
      distributors: [
        {
          name: 'Nu Distributors',
          territory: 'Hub South & Hub Central',
          monthlyVolume: '₹1.3Cr',
          outlets: { total: 345, active: 332, productive: 285 },
          orderFrequency: '3 times per week',
          achievement: 91,
          status: 'healthy',
          metrics: {
            mandateCompliance: '96%',
            stockOnHand: '2,100 cases',
            returns: '1.1%'
          },
          tsrs: [
            { name: 'TSR J1', outlets: 115, achievement: 92, callCompliance: '90%' },
            { name: 'TSR J2', outlets: 110, achievement: 90, callCompliance: '92%' },
            { name: 'TSR J3', outlets: 107, achievement: 91, callCompliance: '88%' }
          ]
        },
        {
          name: 'Xi Trading Co',
          territory: 'Hub West & Hub North',
          monthlyVolume: '₹0.8Cr',
          outlets: { total: 275, active: 263, productive: 225 },
          orderFrequency: '3 times per week',
          achievement: 89,
          status: 'healthy',
          metrics: {
            mandateCompliance: '87%',
            stockOnHand: '1,550 cases',
            returns: '1.3%'
          },
          tsrs: [
            { name: 'TSR K1', outlets: 135, achievement: 90, callCompliance: '92%' },
            { name: 'TSR K2', outlets: 128, achievement: 88, callCompliance: '90%' }
          ]
        }
      ]
    }
  ];

  const whatIfResponses = {
    1: {
      'What if must-sell SKU gap continues widening at current rate?': {
        text: "Projecting the current trajectory forward:\n\n• Month 1 (now → +4 weeks): Gap widens from 24 to 28 points. 1,620 unbilled outlets (up from 1,240). Quarterly revenue loss: ₹2.8Cr (up from ₹2.2Cr).\n\n• Month 2: Gap reaches 31 points. Retailer delistings begin at outlets unbilled for 60+ days. Estimated 340 permanent delistings requiring full re-onboarding.\n\n• Month 3: Competitor substitution accelerates. Based on Central District patterns, competitor brand X captures 8-12% incremental shelf share in must-sell category. This share becomes structurally sticky.\n\nCumulative impact over 1 quarter: ₹3.4Cr revenue loss + ₹45L recovery cost (re-onboarding + trade schemes). The gap becomes self-reinforcing — distributors see declining demand signals and further reduce must-sell ordering.",
        suggestions: ['What\'s the break-even point for intervention?', 'Show me the action plan', 'Which territory deteriorates fastest?']
      },
      'How would closing gap in Central territory alone impact overall distribution?': {
        text: "Central District is the highest-leverage territory for must-sell recovery:\n\n• Central accounts for 485 of 1,240 unbilled outlets (39% of total gap)\n• Closing Central from 61% to 84% distribution lifts Metro-wide must-sell distribution from 68% to 75% — a 7-point improvement from a single territory\n• Revenue unlock: ₹85L quarterly (39% of total ₹2.2Cr opportunity)\n\nHowever, Central alone won't reach the 84% Metro target. You'd still need Western (358 outlets, ₹68L) to get to 81%, and East Zone + Eastern to close the remaining gap.\n\nRecommendation: Start with Central as the pilot — it has the largest outlet concentration per distributor, making execution more efficient. Use Central as proof-of-concept before rolling to Western.",
        suggestions: ['What resources does the Central pilot need?', 'How long to close Central gap?', 'Compare Central vs Western ROI']
      },
      'What is the correlation between order frequency and distribution gaps?': {
        text: "Strong inverse correlation (r = -0.87) between distributor order frequency and must-sell distribution gaps:\n\n• Distributors ordering 3x+/week: Average 82% must-sell distribution, 4.2% gap vs core\n• Distributors ordering 2x/week: Average 68% distribution, 18% gap vs core\n• Distributors ordering <2x/week: Average 58% distribution, 28% gap vs core\n\nThe mechanism: Must-sell SKUs have lower per-outlet velocity than core. At 2x/week ordering, distributors batch their orders around high-velocity core SKUs. Must-sell gets \"squeezed out\" of the order cycle. At 3x+/week, order sizes are smaller but more frequent, and must-sell SKUs maintain their place in each cycle.\n\nKey insight: Increasing order frequency from 2x to 3x/week at the 4 underperforming distributors is projected to close 60-70% of the distribution gap without any additional trade investment.",
        suggestions: ['How do we increase order frequency?', 'What\'s the cost of more frequent deliveries?', 'Show me the action plan']
      },
      'Would focusing on top 4 distributors yield proportional improvement?': {
        text: "Yes — the top 4 underperforming distributors represent disproportionate impact:\n\n• These 4 serve 1,240 outlets (68% of total unbilled must-sell outlets)\n• Fixing just these 4 closes ₹1.6Cr of the ₹2.2Cr quarterly gap (73% of opportunity)\n• Per-distributor ROI: ₹40L quarterly revenue per distributor, vs ~₹15L for the remaining 14 distributors\n\nThe concentration effect means you get 73% of the revenue unlock by focusing on 22% of the distributor base. This is the recommended sequencing:\n\n1. Alpha Distributors (485 outlets, ₹85L) — highest volume\n2. Beta Distributors (358 outlets, ₹68L) — fastest recovery potential\n3. Gamma Trading (195 outlets, ₹27L)\n4. Delta Supplies (202 outlets, ₹42L)\n\nThe remaining 14 distributors can be addressed in Phase 2 through systemic process changes (combined order mandates).",
        suggestions: ['Start the Alpha engagement plan', 'What\'s the timeline for all 4?', 'Show me Phase 2 approach']
      }
    },
    2: {
      'What drives the 16-point distribution variance between territories?': {
        text: "The variance is execution-driven, not structural. Three differentiators:\n\n1. Outlet service frequency: East Zone West at 92% (visits converting to billing) vs Central District at 76%. The gap isn't in total visits — it's in conversion.\n\n2. Distributor ordering rhythm: Top territories average 3x/week. Central and Western average 2x/week. Fewer orders means less restocking, more empty shelves, lower retailer confidence.\n\n3. Sporadic outlet management: East Zone West runs a \"Friday sweep\" — every unbilled outlet gets follow-up. Central has 615 sporadically serviced outlets vs 145 in East Zone West.\n\nThe structural inputs (distributor density, outlet universe, SKU availability) are comparable. This is pure execution gap.",
        suggestions: ['How do we close the execution gap?', 'What would the Friday sweep cost to implement?', 'Which TSRs in Central need intervention?']
      },
      'How does outlet service frequency correlate with distribution percentage?': {
        text: "Near-linear correlation (r = 0.93) between outlet service frequency and numeric distribution:\n\n• 90%+ service frequency → 92-94% distribution (East Zone West)\n• 85-90% frequency → 86-88% distribution (Eastern District)\n• 80-85% frequency → 80-82% distribution (Western District)\n• <80% frequency → 76-78% distribution (Central District)\n\nEach 5-point improvement in service frequency translates to approximately 4-5 points of distribution gain. The relationship is stronger at lower frequencies — meaning Central District would see the biggest per-point improvement.\n\nThe key metric isn't visits, it's \"productive visits\" (visits that result in an order). Central's TSRs make 13 calls/day on average (comparable to East Zone's 16), but convert only 46% to orders vs 63% in East Zone. The conversion gap, not visit volume, is the primary driver.",
        suggestions: ['What drives the conversion gap?', 'How do we improve productive visits?', 'What training does East Zone TSRs get?']
      },
      'What if sporadic outlets were converted to regular billing patterns?': {
        text: "Converting sporadic outlets to regular billing would be the single highest-impact intervention:\n\n• 1,027 sporadic outlets across Central (615) and Western (412)\n• Average monthly value per outlet once regularized: ₹8,200\n• Full conversion = ₹84L monthly additional billing (₹1.01Cr quarterly)\n• Realistic conversion rate (based on East Zone benchmarks): 65-70%\n• Expected outcome: ₹67-71L monthly (₹80-85L quarterly)\n\nDistribution impact: Converting sporadic outlets lifts Central from 78% to 88% and Western from 81% to 89%. This nearly eliminates the territory variance.\n\nThe conversion requires 3 things: (1) weekly TSR sweep cadence targeting sporadic outlets, (2) distributor stock availability guarantees for these outlet visits, (3) outlet-level scheme for first 2 reorders to rebuild retailer habit. Estimated implementation cost: ₹4.2L for scheme + ₹1.8L for incremental logistics = ₹6L total vs ₹80L+ quarterly return.",
        suggestions: ['Build the conversion implementation plan', 'Which sporadic outlets should we prioritize?', 'What\'s the timeline to see results?']
      },
      'Would matching East Zone West order frequency close the entire gap?': {
        text: "Matching order frequency closes approximately 70% of the gap — but not all of it.\n\nModeling the impact of moving Central and Western to 3x/week distributor ordering:\n\n• Central District: 78% → 87% distribution (+9 points, vs East Zone's 94%)\n• Western District: 81% → 89% distribution (+8 points)\n• Residual gap: 5-7 points still remaining\n\nThe remaining gap comes from two factors that order frequency alone doesn't address:\n\n1. TSR visit conversion rate: Even at 3x/week ordering, Central TSRs convert 46% of visits vs East Zone's 63%. This is a skills/training gap.\n\n2. Beat plan coverage: Central's beat plans have 12% of outlets visited less than weekly. East Zone has near-100% weekly coverage.\n\nTo fully close the gap, you need order frequency increase (70% of gap) + TSR training on conversion (20%) + beat plan optimization (10%). The good news: the frequency change is the fastest to implement (2-3 weeks) and delivers the majority of impact.",
        suggestions: ['How do we improve TSR conversion rates?', 'What does beat plan optimization look like?', 'Start with the frequency intervention']
      }
    },
    3: {
      'What if festival SKU distribution remains at 72% through festival period?': {
        text: "Historical modeling based on last 3 festival cycles:\n\n• At 72% distribution: Expected volume uplift of 18-20% vs normal period\n• At 88% distribution (target): Expected volume uplift of 34%\n• Revenue delta: ₹88L over the 2-week festival window\n\nBut the bigger risk is competitive shelf capture. During Season Peak 2025, territories below 75% distribution saw competitor festival packs gain 12% incremental shelf share — and 40% of those placements were still active 6 weeks post-festival.\n\nTotal exposure: ₹88L direct loss + ₹30-40L trailing competitive impact = ~₹1.2Cr if we stay at 72%.\n\nWith only 18 days to peak, every day of inaction costs approximately ₹1.5-2 points of achievable distribution. The window for full recovery to 88% closes in about 10 days.",
        suggestions: ['What\'s the fastest path to 82%?', 'Which outlets matter most for festival?', 'Prioritize Western vs Central — which first?']
      },
      'How does distributor order frequency impact festival SKU reach?': {
        text: "Festival SKUs have a unique order frequency dynamic:\n\n• Distributors at 2-3x/week ordering: 78-82% festival distribution (meeting target pace)\n• Distributors at 2x/week: 64-68% festival distribution (current laggards)\n• Distributors at <2x/week: 52-58% festival distribution\n\nThe amplification effect is stronger for festival SKUs than core because:\n\n1. Festival SKUs are time-sensitive — each missed order cycle is more costly given the 18-day window\n2. Retailers are actively seeking to stock festival inventory right now — high pull-through if product is available\n3. Festival combos have higher per-order value (₹1,200 avg vs ₹800 for core), so distributors see better economics per delivery\n\nIncreasing order frequency from 2x to 2-3x/week at Western and Central distributors is projected to move festival distribution from 64-68% to 76-80% within 10 days. Combined with outlet-level activation, 85%+ is achievable.",
        suggestions: ['What outlet activation should we run?', 'Show me the 10-day acceleration plan', 'What\'s the distributor incentive structure?']
      },
      'What is the revenue correlation between distribution % and festival uplift?': {
        text: "Based on 3 years of Metro festival data, the distribution-to-uplift relationship is non-linear:\n\n• 60-70% distribution: 12-15% volume uplift (below threshold for meaningful impact)\n• 70-80% distribution: 18-24% uplift (moderate, but leaves significant money on table)\n• 80-88% distribution: 28-34% uplift (sweet spot — exponential returns)\n• 88%+ distribution: 34-38% uplift (diminishing marginal returns above 88%)\n\nThe critical threshold is 80%. Below it, you're essentially running festival period at near-normal velocity. Above it, the network effect kicks in — more outlets stocking = more visibility = more consumer trial = more repeat purchases across the festival window.\n\nAt current 72%, we're firmly in the \"moderate\" zone. Every point of distribution gain between 72-85% delivers approximately ₹6.2L in incremental festival revenue. The economics strongly favor aggressive push to at least 82% (₹62L revenue gain from 10-point improvement, vs approximately ₹8-10L total push cost).",
        suggestions: ['What does the 82% push plan look like?', 'How did top territories achieve 88% last year?', 'Is 85% realistic in 18 days?']
      },
      'Would prioritizing Western and Central territories yield optimal ROI?': {
        text: "Yes — Western and Central represent 84% of the festival distribution gap:\n\n• Western: 64% → target 88% (24-point gap, 288 unbilled outlets)\n• Central: 68% → target 88% (20-point gap, 352 outlets)\n• Combined: 640 of 850 total unbilled festival outlets (75%)\n\nROI comparison:\n• Western + Central focus: ₹74L revenue protection, ₹6.8L investment = 10.9x ROI\n• East Zone + Eastern focus: ₹14L revenue protection, ₹2.1L investment = 6.7x ROI\n\nWestern + Central yields 1.6x better ROI because:\n1. Larger outlet universe = more leverage per intervention\n2. Festival SKU supply already at depot (no logistics constraint)\n3. Existing distributor relationships — these aren't new partners, they're underperforming on this specific category\n\nRecommend: 80% of resources to Western + Central, 20% to maintain East Zone + Eastern trajectory. This maximizes the probability of hitting 82%+ Metro-wide within the 18-day window.",
        suggestions: ['Build the resource allocation plan', 'What\'s Day 1 action for Western?', 'How do we track daily progress?']
      }
    }
  };

  const openChat = (insight, scenario) => {
    setSelectedInsight(insight);
    setChatOpen(true);
    
    if (scenario) {
      // Show user question + typing, then reveal answer
      const userMsg = { type: 'user', text: scenario };
      const typingMsg = { type: 'typing' };
      setChatMessages([userMsg, typingMsg]);
      
      const scenarioResponses = whatIfResponses[insight.id] || {};
      const match = scenarioResponses[scenario];
      const aiResponse = match 
        ? { type: 'ai', text: match.text, suggestions: match.suggestions }
        : { type: 'ai', text: `Analyzing: ${scenario}\n\nBased on the data, this is a complex scenario. Let me walk you through the key variables and projected outcomes. What specific dimension would you like to explore first?`, suggestions: ['Revenue impact', 'Timeline implications', 'Resource requirements'] };
      
      setTimeout(() => {
        setChatMessages([userMsg, aiResponse]);
      }, 900 + Math.random() * 600);
    } else {
      const initialMsg = {
        type: 'ai',
        text: `Let's discuss ${insight.title.toLowerCase()}. What would you like to understand better?`,
        suggestions: [
          'Why is this happening?',
          'What is the risk if we do not act?',
          'Show me the action plan',
          'How do we prevent recurrence?'
        ]
      };
      setChatMessages([initialMsg]);
    }
  };

  const openTrail = (trail) => {
    setSelectedTrail(trail);
    setTrailOpen(true);
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    
    const userMsg = { type: 'user', text };
    const typingMsg = { type: 'typing' };
    setChatMessages(prev => [...prev, userMsg, typingMsg]);
    setInputMessage('');
    
    const insightId = selectedInsight?.id;
    const lowerText = text.toLowerCase();
    
    // Contextual responses per insight
    const insightResponses = {
      1: { // Must-sell SKU distribution gap
        'why is this happening?': {
          text: "Three converging factors are driving the 24-point must-sell distribution gap:\n\n1. Distributor economics: Must-sell SKUs (Triangle Chips, Hot Puffs) carry 2-3% lower margin than core SKUs, so distributors systematically deprioritize them in order cycles.\n\n2. Beat coverage gap: TSRs in Central and Western territories are spending 70% of visit time on core portfolio, leaving insufficient push for must-sell. Beat plans don't mandate must-sell billing targets.\n\n3. Order size constraints: 4 key distributors have minimum order thresholds that must-sell SKUs struggle to meet individually, causing them to be dropped from smaller replenishment cycles.\n\nThe pattern has been building since Oct 2025 — must-sell order frequency dropped from 3.2x/month to 2.1x/month at the 4 underperforming distributors.",
          suggestions: ['Which distributors should we prioritize?', 'What would a combined order mandate look like?', 'How fast can we close this gap?']
        },
        'what is the risk if we do not act?': {
          text: "The gap is compounding. At current trajectory:\n\n• By end of Feb: Distribution gap widens to 28 points (from 24), adding 380 more unbilled outlets\n• Quarterly revenue loss: Escalates from ₹2.2Cr to ₹2.8Cr\n• Retailer delistings: Once an outlet goes 45+ days unbilled for a SKU, reactivation takes 3x the effort — 285 of the 1,240 outlets are already past 30 days\n• Competitive substitution: Competitor brand X has launched a Triangle Chips equivalent in Central District at 5% lower price point. Every week of gap gives them shelf space that becomes harder to reclaim.\n\nThe tipping point is approximately 3 weeks out — after that, recovery cost doubles.",
          suggestions: ['Show me the action plan', 'What\'s the competitor threat in detail?', 'How do we prevent recurrence?']
        },
        'show me the action plan': {
          text: "Recommended 4-week recovery plan:\n\nWeek 1 (Immediate):\n• Issue combined order mandate — must-sell SKUs bundled with core portfolio orders at all 4 distributors\n• TSR beat plan revision: Mandate minimum 3 must-sell SKU lines per outlet visit\n• Target: 200 outlet reactivations\n\nWeek 2-3 (Acceleration):\n• Outlet-level scheme: ₹40/case incentive for Triangle Chips + Hot Puffs to drive pull-through\n• Dedicated must-sell TSR sweep in Central District (485 unbilled outlets)\n• Daily tracking dashboard shared with distributor principals\n• Target: 600 additional outlet reactivations\n\nWeek 4 (Sustain):\n• Review and lock in permanent combined order threshold\n• Shift TSR incentive structure to include must-sell billing %\n• Target: 84% must-sell distribution (from 68%)\n\nInvestment: ₹6.2L (scheme + incremental logistics)\nReturn: ₹1.6Cr quarterly recurring revenue unlock",
          suggestions: ['What are the risks to this plan?', 'Can we accelerate this?', 'Who owns execution?']
        },
        'how do we prevent recurrence?': {
          text: "Three structural changes needed:\n\n1. Combined order mandate (permanent): Must-sell SKUs included as default line items in every distributor order. System-level enforcement in DMS — orders below must-sell threshold flagged automatically.\n\n2. TSR scorecard revision: Add must-sell billing % as a weighted metric (suggest 20% weight). Currently TSR incentives are 100% volume-based, which naturally favors high-velocity core SKUs.\n\n3. Early warning system: Automated alert when must-sell distribution drops below 80% at any distributor for 2 consecutive weeks. Currently the gap built over 8 weeks before surfacing in the morning briefing.\n\nThe East Zone model already implements #1 and #2 — their must-sell distribution is at 79% vs 68% region average. Replicating their approach is the lowest-risk path.",
          suggestions: ['What does East Zone do differently?', 'How long to implement these changes?', 'What\'s the cost of the structural changes?']
        },
        default: {
          text: "Looking at the must-sell SKU distribution data, I can help with root cause analysis, action planning, risk quantification, or benchmarking against top-performing territories. What angle would be most useful?",
          suggestions: ['Why is this happening?', 'Show me the action plan', 'What is the risk if we do not act?']
        }
      },
      2: { // Territory distribution variance
        'what drives the 16-point distribution variance between territories?': {
          text: "The variance is execution-driven, not structural. Three key differentiators:\n\n1. Outlet service frequency: East Zone West maintains 92% outlet service frequency (visits that convert to billing). Central District is at 76%. The gap isn't in total visits — it's in conversion from visit to order.\n\n2. Distributor ordering rhythm: Top territories average 3x/week order frequency per distributor. Central and Western average 2x/week. This rhythm difference compounds — fewer orders means less frequent restocking, which means more empty shelves, which means lower retailer confidence.\n\n3. Sporadic outlet management: East Zone West has a systematic \"Friday sweep\" — every unbilled outlet from the week gets a dedicated follow-up. Central District has 615 sporadically serviced outlets (visited but not billed regularly) vs only 145 in East Zone West.\n\nThe structural inputs (distributor density, outlet universe, SKU availability) are comparable across territories. This is a pure execution gap.",
          suggestions: ['How do we close the execution gap?', 'What would it cost to implement the Friday sweep?', 'Which TSRs in Central need intervention?']
        },
        'why is this happening?': {
          text: "The 16-point variance traces to a divergence that started 4 months ago. East Zone West's ASM implemented three process changes in Sep 2025:\n\n1. Daily 9 AM order dashboards shared directly with distributor principals (not just salespersons)\n2. Weekly TSR incentive tied to billing consistency rather than monthly volume targets\n3. The Friday sweep protocol for unbilled outlets\n\nCentral and Western territories didn't adopt these practices. Over 4 months, the compounding effect created the 16-point gap (up from 11 points LYSM). The variance is accelerating — it was 14 points last month.\n\nKey insight: It's not that Central is getting worse in absolute terms. East Zone West is pulling away through consistent micro-improvements in execution cadence.",
          suggestions: ['Can we replicate East Zone practices?', 'What is the risk if we do not act?', 'Show me the territory-level TSR data']
        },
        default: {
          text: "I can walk you through the territory variance analysis, the execution gap drivers, or help build a convergence plan. What would you like to explore?",
          suggestions: ['What drives the 16-point distribution variance between territories?', 'How do we close the execution gap?']
        }
      },
      3: { // Festival SKU distribution
        'what if festival sku distribution remains at 72% through festival period?': {
          text: "Historical modeling based on last 3 festival cycles shows:\n\n• At 72% distribution: Expected volume uplift of 18-20% vs normal period\n• At 88% distribution (target): Expected volume uplift of 34%\n• Revenue delta: ₹88L over the 2-week festival window\n\nBut the bigger risk is competitive shelf capture. During Season Peak 2025, territories below 75% distribution saw competitor festival packs gain 12% incremental shelf share — and that share proved sticky. 40% of those competitor placements were still active 6 weeks after the festival.\n\nBottom line: The ₹88L is the direct loss. The trailing competitive impact adds another ₹30-40L over the following quarter. Total exposure is closer to ₹1.2Cr if we stay at 72%.",
          suggestions: ['What\'s the fastest path to 82%?', 'Which outlets matter most for festival?', 'How did we hit 88% last year?']
        },
        'why is this happening?': {
          text: "The festival SKU distribution lag has two root causes:\n\n1. Late pipeline activation: Festival SKU secondary sales push started 2 weeks later than last year. In 2025, distributor stocking began 30 days before peak. This year, it started at 18 days. The 12-day delay directly translates to the 6-point gap vs LYSM.\n\n2. Western & Central distributor deprioritization: These territories are dealing with the must-sell SKU gap simultaneously. Distributors are capacity-constrained on order processing — they're managing core + must-sell catch-up, and festival SKUs are getting squeezed out of the order cycle.\n\nThe good news: Supply is not a constraint. Depot inventory is at 142% of requirement. This is purely a distribution execution problem with a known solution — accelerated secondary push and outlet-level activation.",
          suggestions: ['Show me the action plan', 'Can we prioritize festival over must-sell for 2 weeks?', 'What is the daily distribution gain needed?']
        },
        default: {
          text: "I can help analyze the festival distribution gap, model scenarios for different distribution levels, or build an acceleration plan. The clock is ticking — 18 days to peak. What's most urgent?",
          suggestions: ['What if festival SKU distribution remains at 72% through festival period?', 'Show me the action plan']
        }
      }
    };
    
    let aiResponse = { type: 'ai', text: '', suggestions: [] };
    const insightData = insightResponses[insightId] || {};
    
    // Try exact match first, then keyword match
    const exactMatch = insightData[lowerText];
    if (exactMatch) {
      aiResponse = { type: 'ai', ...exactMatch };
    } else if (lowerText.includes('why') || lowerText.includes('happening') || lowerText.includes('cause')) {
      const whyResp = insightData['why is this happening?'] || insightData.default;
      aiResponse = { type: 'ai', ...(whyResp || {}) };
    } else if (lowerText.includes('risk') || lowerText.includes('do not act') || lowerText.includes('don\'t act')) {
      const riskResp = insightData['what is the risk if we do not act?'] || insightData.default;
      aiResponse = { type: 'ai', ...(riskResp || {}) };
    } else if (lowerText.includes('action') || lowerText.includes('plan')) {
      const actionResp = insightData['show me the action plan'] || insightData.default;
      aiResponse = { type: 'ai', ...(actionResp || {}) };
    } else if (lowerText.includes('prevent') || lowerText.includes('recurrence') || lowerText.includes('recur')) {
      const preventResp = insightData['how do we prevent recurrence?'] || insightData.default;
      aiResponse = { type: 'ai', ...(preventResp || {}) };
    } else {
      const def = insightData.default || { text: "I can help you explore this insight further — root causes, risk scenarios, or action planning. What angle would be most useful?", suggestions: ['Why is this happening?', 'Show me the action plan'] };
      aiResponse = { type: 'ai', ...def };
    }
    
    // Simulate typing delay
    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      setChatMessages(prev => {
        const withoutTyping = prev.filter(m => m.type !== 'typing');
        return [...withoutTyping, aiResponse];
      });
    }, delay);
  };

  // Morrie briefing chat responses keyed by briefing index
  const morrieResponses = {
    0: [
      { q: 'Which specific outlets are most at risk?', a: 'The 685 at-risk outlets break down as: 312 outlets served by Alpha Distributors (Area North), 198 by Gamma (Area West), and 175 by Beta (Area Northwest). Alpha\'s outlets are most critical — their Classic Crunch 52g stock is at 0.8 days cover vs 1.2 days average. These 312 outlets account for ₹3.4L/day of the ₹8.2L daily exposure.' },
      { q: 'What\'s the fastest reorder path?', a: 'Emergency reorder through the regional depot can fulfill in 36 hours vs 72 hours for standard cycle. The depot currently holds 4,200 cases of Classic Crunch 52g and 2,800 cases of Spice Twist 85g — sufficient for 8 days cover. Recommend triggering emergency secondary dispatch to Alpha and Gamma distributors by EOD today. Cost delta: ₹12K additional logistics vs ₹8.2L/day sales loss.' },
      { q: 'Has this happened before with these distributors?', a: 'Yes — Alpha Distributors had a similar stockout event in Oct 2025 (lasted 4 days, ₹28L revenue loss). Root cause was the same: ordering rhythm dropped from 3x/week to 1x/week without early detection. Post-incident, a reorder trigger was set at 2.5 days cover but was later relaxed to 1.5 days. Recommend resetting threshold to 2.5 days permanently.' }
    ],
    1: [
      { q: 'What\'s the risk timeline if we don\'t act?', a: 'At current depletion rate, Area North distributor hits zero stock in 48 hours, Area East in 72 hours. Once stockout occurs, outlet reactivation takes 5-7 days on average (retailers switch to competitor SKUs). Projected cascade: 420 outlets unbilled → ₹4.8L immediate loss → ₹18L over recovery period. The secondary sales push needs to start within 24 hours to avoid the stockout.' },
      { q: 'Can we redirect stock from other territories?', a: 'East Zone currently holds 142% of requirement for Triangle Chips 90g — Lambda Supplies has 680 excess cases. Inter-distributor transfer to Area North is feasible within 24 hours at ₹8K logistics cost. This buys 3.5 days additional cover while the standard reorder cycle catches up. Recommend authorizing the transfer and expediting secondary push simultaneously.' }
    ],
    2: [
      { q: 'What changed in the last 10 days?', a: 'DMS data shows the drop started Jan 19 — coinciding with a beat restructuring in Western territory. 3 of the 4 distributors (Beta, Delta, Epsilon) had their TSR routes reorganized. Order pattern analysis shows TSRs are spending 40% more time on new routes (learning curve) and placing smaller, less frequent orders. Zeta\'s drop is unrelated — their primary salesperson has been on leave since Jan 18.' },
      { q: 'What\'s the revenue impact so far?', a: 'The 32% order frequency drop translates to ₹14.2L in missed secondary billing this week across 1,140 outlets. At current trajectory, this becomes ₹28.4L over two weeks. The beat restructuring should normalize in 7-10 days based on historical patterns, but Zeta needs immediate TSR coverage intervention — their single-point-of-failure staffing model is the structural risk here.' }
    ],
    3: [
      { q: 'Where exactly is the ₹42L gap coming from?', a: 'Breaking down by territory: Western accounts for ₹18L of the gap (at 78% achievement), Central for ₹14L (at 82%), and the remaining ₹10L is spread across smaller pockets in East Zone. Eastern territory is actually over-indexing at 96% — without their performance, the gap would be ₹58L. The Western gap is almost entirely distributor-execution driven (order frequency and outlet coverage), not demand-side.' },
      { q: 'Can Eastern territory\'s approach be replicated?', a: 'Eastern\'s outperformance is driven by 3 specific practices: (1) daily order tracking dashboards shared with distributors at 9 AM, (2) TSR incentive structure tied to weekly billing consistency rather than monthly volume, and (3) a "no outlet left behind" sweep every Friday for unbilled outlets. Practice #2 is the highest-leverage change — it shifts TSR behavior from end-of-month loading to steady weekly execution. Implementable in other territories within 1 week.' }
    ],
    4: [
      { q: 'What drove the recovery?', a: 'Three factors converged: (1) A focused "Operation Restock" initiative by the ASM — dedicated 3 TSR man-days per distributor over 2 weeks to reactivate dropped outlets. (2) Delta Distributors increased their order frequency from 1.5x to 3x per week after a stock guarantee commitment from the depot. (3) Outlet-level scheme (₹50 per case incentive for Triangle Chips) drove pull-through demand. The scheme cost ₹1.2L but generated ₹8.4L in incremental billing.' },
      { q: 'Is this recovery sustainable?', a: 'Partially. The scheme-driven lift will taper in 2-3 weeks as incentives expire. But the structural improvements — restored order frequency and TSR coverage — should sustain at 85-88% distribution (vs current 92%). To hold 92%+, recommend converting the outlet scheme to a permanent trade program and maintaining the weekly TSR sweep cadence. Risk flag: Delta\'s stock guarantee expires Feb 15 — needs renewal before then.' }
    ]
  };

  const openMorrieChat = (briefingIndex) => {
    if (morrieChatOpen === briefingIndex) {
      setMorrieChatOpen(null);
      return;
    }
    setMorrieChatOpen(briefingIndex);
    if (!morrieChatMessages[briefingIndex]) {
      const responses = morrieResponses[briefingIndex] || [];
      setMorrieChatMessages(prev => ({
        ...prev,
        [briefingIndex]: {
          messages: [
            { type: 'ai', text: 'I can help you dig deeper into this. What would you like to explore?' }
          ],
          suggestions: responses.map(r => r.q)
        }
      }));
    }
  };

  const sendMorrieMessage = (briefingIndex, text) => {
    if (!text.trim()) return;
    const responses = morrieResponses[briefingIndex] || [];
    const match = responses.find(r => r.q === text);
    const aiText = match ? match.a : "Let me look into that. Based on the data, I'd recommend reviewing the territory-level breakdown and distributor order patterns for a clearer picture. Could you be more specific about what aspect you'd like to explore?";
    
    const prev = morrieChatMessages[briefingIndex] || { messages: [], suggestions: [] };
    const remainingSuggestions = prev.suggestions.filter(s => s !== text);
    
    // Add user message + typing indicator immediately
    setMorrieChatMessages(p => ({
      ...p,
      [briefingIndex]: {
        messages: [...prev.messages, { type: 'user', text }, { type: 'typing' }],
        suggestions: []
      }
    }));
    setMorrieInput('');
    
    // Reveal actual response after delay
    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      setMorrieChatMessages(p => {
        const current = p[briefingIndex];
        if (!current) return p;
        const withoutTyping = current.messages.filter(m => m.type !== 'typing');
        return {
          ...p,
          [briefingIndex]: {
            messages: [...withoutTyping, { type: 'ai', text: aiText }],
            suggestions: remainingSuggestions
          }
        };
      });
    }, delay);
  };

  // Questt brand mark — matches questt.com wordmark: "q" + teal dot on dark
  const QuesttMark = ({ size = 22 }) => (
    <div style={{ 
      width: size, height: size, borderRadius: size / 2, 
      background: C.darkGreen, 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      flexShrink: 0, marginTop: '2px',
      position: 'relative'
    }}>
      <span style={{ color: '#fff', fontSize: size * 0.42, fontWeight: 600, fontFamily: font, letterSpacing: '-0.02em', lineHeight: 1 }}>q</span>
      <span style={{ color: '#1B6B5A', fontSize: size * 0.42, fontWeight: 700, lineHeight: 1 }}>.</span>
    </div>
  );

  // Typing indicator component
  const TypingIndicator = () => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
      <QuesttMark size={22} />
      <div style={{ padding: '12px 16px', backgroundColor: C.white, border: `1px solid ${C.cream}`, borderRadius: '6px', display: 'flex', gap: '4px', alignItems: 'center' }}>
        <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.sage, opacity: 0.4, animation: 'typingBounce 1.2s ease-in-out infinite' }} />
        <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.sage, opacity: 0.4, animation: 'typingBounce 1.2s ease-in-out 0.2s infinite' }} />
        <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.sage, opacity: 0.4, animation: 'typingBounce 1.2s ease-in-out 0.4s infinite' }} />
      </div>
    </div>
  );

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
    <div style={{ height: '100vh', backgroundColor: C.offWhite, fontFamily: font, display: 'flex' }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30% { transform: translateY(-4px); opacity: 0.9; }
        }
      `}</style>
      
      {/* ═══════════════════ SIDEBAR ═══════════════════ */}
      <div style={{
        width: sidebarWidth,
        minHeight: '100vh',
        backgroundColor: C.darkGreen,
        borderRight: `1px solid rgba(255,255,255,0.06)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100
      }}>
        {/* Drawer handle */}
        <div style={{ 
          marginTop: '16px',
          width: 36, 
          height: 36, 
          borderRadius: '8px', 
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          cursor: 'pointer',
          transition: 'all 0.15s'
        }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        >
          <Menu size={16} color="rgba(255,255,255,0.5)" strokeWidth={1.5} />
        </div>
        <div style={{ flex: 1 }} />
      </div>

      {/* ═══════════════════ MAIN CONTENT AREA ═══════════════════ */}
      <div className='overflow-auto' style={{ flex: 1, marginLeft: sidebarWidth, transition: 'margin-left 0.2s ease', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* ═══════════════════ TOP BAR ═══════════════════ */}
        <div style={{ 
          backgroundColor: C.white, 
          borderBottom: `1px solid ${C.cream}`, 
          padding: '0 32px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          {/* Left: questt x PwC + Sales Watchtower */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* questt wordmark — from questt.com */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
              <span style={{ fontSize: '17px', fontWeight: '600', color: C.darkGreen, letterSpacing: '-0.02em', fontFamily: font }}>questt</span>
              <span style={{ color: '#1B6B5A', fontSize: '20px', fontWeight: '700', lineHeight: 1 }}>.</span>
            </div>
            
            <span style={{ fontSize: '11px', color: C.cream, fontWeight: '400' }}>|</span>
            
            {/* PwC logo */}
            <img src="/images/pwcLogo.jpg" alt="PwC" style={{ height: 28, display: 'block' }} />

            <div style={{ width: '1px', height: '20px', backgroundColor: C.cream, margin: '0 2px' }} />

            <span style={{ fontSize: '12px', fontWeight: '500', color: C.darkGrey, letterSpacing: '0.02em' }}>Sales Watchtower</span>
          </div>

          {/* Right: Search, Notifications, Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Search */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '7px 14px',
              backgroundColor: searchFocused ? C.white : C.offWhite,
              border: `1px solid ${searchFocused ? C.sage : C.cream}`,
              borderRadius: '6px',
              transition: 'all 0.2s',
              width: searchFocused ? 280 : 200
            }}>
              <Search size={14} color={C.lightGrey} strokeWidth={1.5} />
              <input 
                placeholder="Search insights, territories..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                style={{ 
                  border: 'none', 
                  outline: 'none', 
                  backgroundColor: 'transparent', 
                  fontSize: '12px', 
                  fontFamily: font, 
                  color: C.green, 
                  width: '100%'
                }}
              />
              {!searchFocused && (
                <span style={{ fontSize: '10px', color: C.lightGrey, backgroundColor: C.white, padding: '1px 6px', borderRadius: '3px', border: `1px solid ${C.cream}`, fontFamily: "'JetBrains Mono', monospace", whiteSpace: 'nowrap' }}>/</span>
              )}
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '24px', backgroundColor: C.cream, margin: '0 4px' }} />

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={(e) => { e.stopPropagation(); setNotificationsOpen(!notificationsOpen); setProfileDropdownOpen(false); }}
                style={{ 
                  padding: '8px', 
                  backgroundColor: notificationsOpen ? C.offWhite : 'transparent', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: 'pointer', 
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Bell size={18} strokeWidth={1.5} color={C.darkGrey} />
                <div style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', backgroundColor: '#DC2626', border: `1.5px solid ${C.white}` }} />
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '340px', backgroundColor: C.white, border: `1px solid ${C.cream}`, borderRadius: '8px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', overflow: 'hidden', zIndex: 200 }}>
                  <div style={{ padding: '14px 16px', borderBottom: `1px solid ${C.cream}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: C.green }}>Notifications</span>
                    <span style={{ fontSize: '11px', color: C.sage, cursor: 'pointer', fontWeight: '500' }}>Mark all read</span>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} style={{ padding: '12px 16px', borderBottom: `1px solid ${C.borderLight}`, backgroundColor: n.unread ? `${C.sage}06` : 'transparent', cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'flex-start' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.offWhite; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = n.unread ? `${C.sage}06` : 'transparent'; }}
                    >
                      {n.unread && <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.sage, marginTop: '6px', flexShrink: 0 }} />}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', color: C.darkGrey, lineHeight: '1.5' }}>{n.text}</div>
                        <div style={{ fontSize: '10px', color: C.lightGrey, marginTop: '4px' }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: '10px', textAlign: 'center', borderTop: `1px solid ${C.cream}` }}>
                    <span style={{ fontSize: '12px', color: C.sage, fontWeight: '500', cursor: 'pointer' }}>View all notifications</span>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={(e) => { e.stopPropagation(); setProfileDropdownOpen(!profileDropdownOpen); setNotificationsOpen(false); }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '4px 8px 4px 4px', 
                  backgroundColor: profileDropdownOpen ? C.offWhite : 'transparent', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #3BB896 0%, #2D5A3D 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: '#fff' }}>
                  RS
                </div>
                <ChevronDown size={14} color={C.lightGrey} />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', width: '220px', backgroundColor: C.white, border: `1px solid ${C.cream}`, borderRadius: '8px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', overflow: 'hidden', zIndex: 200 }}>
                  <div style={{ padding: '14px 16px', borderBottom: `1px solid ${C.cream}` }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: C.green }}>RSM Metro</div>
                    <div style={{ fontSize: '11px', color: C.lightGrey, marginTop: '2px' }}>rsm.metro@foodco.in</div>
                  </div>
                  {[
                    { label: 'My Profile', icon: User },
                    { label: 'Preferences', icon: Settings },
                    { label: 'Access & Roles', icon: Shield },
                  ].map((item, i) => (
                    <button key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', width: '100%', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '12px', color: C.darkGrey, textAlign: 'left' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.offWhite; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <item.icon size={14} color={C.lightGrey} strokeWidth={1.5} />
                      {item.label}
                    </button>
                  ))}
                  <div style={{ borderTop: `1px solid ${C.cream}` }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', width: '100%', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#B33A3A', textAlign: 'left' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#FDF3F3'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <LogOut size={14} color="#B33A3A" strokeWidth={1.5} />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════════ TAB NAVIGATION ═══════════════════ */}
        <div style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.cream}`, padding: '0 32px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['briefing', 'deepdive'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '16px 24px',
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

        {/* ═══════════════════ DASHBOARD CONTENT ═══════════════════ */}
        <div style={{ padding: '32px 32px', maxWidth: '1400px' }}>
          
          {activeTab === 'briefing' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {[
                  { label: 'Metro Achievement', value: '89%', change: '-11% vs LYSM', trend: 'down', icon: Target, color: C.sage },
                  { label: 'Active Outlets (L90D)', value: '1,850', sub: 'of 2,055 total', icon: MapPin, color: C.sage },
                  { label: 'Metro Avg Coverage', value: '88%', change: '-6% vs LYSM', trend: 'down', icon: Activity, color: C.lightGrey },
                  { label: 'Metro Must-sell Mix', value: '32%', sub: 'vs 52% East Zone', icon: Package, color: C.sage }
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
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: C.green, margin: '0 0 24px 0', fontFamily: serif }}>Morning Briefing</h2>
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
                      <div key={i} style={{ backgroundColor: C.white, border: `1px solid ${C.cream}`, borderRadius: '8px', overflow: 'hidden' }}>
                        <div style={{ padding: '20px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                          <div style={{ color: getBriefingColor(point.type), marginTop: '2px', flexShrink: 0 }}>
                            {getBriefingIcon(point.type)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: C.green, marginBottom: '6px' }}>{point.title}</div>
                            <div style={{ fontSize: '13px', color: C.darkGrey, lineHeight: '1.6', marginBottom: '12px' }}>{point.detail}</div>
                            <button
                              onClick={() => openMorrieChat(i)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 14px',
                                backgroundColor: morrieChatOpen === i ? C.darkGreen : 'transparent',
                                color: morrieChatOpen === i ? C.white : C.sage,
                                border: `1px solid ${morrieChatOpen === i ? C.darkGreen : C.sageBorder}`,
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontFamily: font,
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={e => { if (morrieChatOpen !== i) { e.currentTarget.style.backgroundColor = `${C.sage}10`; e.currentTarget.style.borderColor = C.sage; } }}
                              onMouseLeave={e => { if (morrieChatOpen !== i) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = C.sageBorder; } }}
                            >
                              <div style={{ width: 16, height: 16, borderRadius: 8, background: C.darkGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <span style={{ color: '#fff', fontSize: 7, fontWeight: 600, fontFamily: font, letterSpacing: '-0.02em', lineHeight: 1 }}>q</span><span style={{ color: '#1B6B5A', fontSize: 7, fontWeight: 700, lineHeight: 1 }}>.</span>
                              </div>
                              Dig deeper
                            </button>
                          </div>
                        </div>

                        {/* Morrie Chat Panel */}
                        {morrieChatOpen === i && morrieChatMessages[i] && (
                          <div style={{ borderTop: `1px solid ${C.cream}`, backgroundColor: C.offWhite }}>
                            <div style={{ padding: '16px 24px', maxHeight: '360px', overflowY: 'auto' }}>
                              {morrieChatMessages[i].messages.map((msg, mi) => (
                                <div key={mi} style={{ marginBottom: '14px' }}>
                                  {msg.type === 'typing' ? (
                                    <TypingIndicator />
                                  ) : msg.type === 'ai' ? (
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                      <QuesttMark size={22} />
                                      <div style={{ padding: '10px 14px', backgroundColor: C.white, border: `1px solid ${C.cream}`, borderRadius: '6px', fontSize: '13px', lineHeight: '1.65', color: C.darkGrey, flex: 1, whiteSpace: 'pre-line' }}>
                                        {msg.text}
                                      </div>
                                    </div>
                                  ) : (
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                      <div style={{ padding: '10px 14px', backgroundColor: `${C.darkGreen}`, color: C.white, borderRadius: '6px', fontSize: '13px', lineHeight: '1.5', maxWidth: '80%' }}>
                                        {msg.text}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}

                              {/* Suggestion chips */}
                              {morrieChatMessages[i].suggestions.length > 0 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                  {morrieChatMessages[i].suggestions.map((sug, si) => (
                                    <button
                                      key={si}
                                      onClick={() => sendMorrieMessage(i, sug)}
                                      style={{
                                        padding: '7px 14px',
                                        backgroundColor: C.white,
                                        border: `1px solid ${C.cream}`,
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        color: C.darkGrey,
                                        cursor: 'pointer',
                                        fontFamily: font,
                                        transition: 'all 0.15s',
                                        lineHeight: '1.3'
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

                            {/* Input bar */}
                            <div style={{ padding: '12px 24px', borderTop: `1px solid ${C.cream}`, display: 'flex', gap: '10px' }}>
                              <input
                                type="text"
                                value={morrieChatOpen === i ? morrieInput : ''}
                                onChange={e => setMorrieInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && sendMorrieMessage(i, morrieInput)}
                                placeholder="Ask anything about this..."
                                style={{
                                  flex: 1,
                                  padding: '10px 14px',
                                  border: `1px solid ${C.cream}`,
                                  borderRadius: '6px',
                                  fontSize: '13px',
                                  fontFamily: font,
                                  outline: 'none',
                                  backgroundColor: C.white
                                }}
                              />
                              <button
                                onClick={() => sendMorrieMessage(i, morrieInput)}
                                style={{
                                  padding: '10px 16px',
                                  backgroundColor: C.darkGreen,
                                  color: C.white,
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Send size={14} strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: C.cream, margin: '40px 0' }} />

              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: C.green, margin: '0 0 20px 0', fontFamily: serif }}>
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
                            <h4 style={{ fontSize: '18px', fontWeight: '600', color: C.green, marginBottom: '6px', lineHeight: '1.3', fontFamily: serif }}>
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
                            Discuss with questt<span style={{ color: '#1B6B5A', fontWeight: '700' }}>.</span>
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
                <h3 style={{ fontSize: '18px', fontWeight: '500', color: C.green, fontFamily: serif, marginBottom: '8px' }}>
                  Metro ASM Territory Performance
                </h3>
                <p style={{ fontSize: '14px', color: C.lightGrey, margin: 0 }}>
                  Deep dive into Metro region ASM territories and their distributor networks
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
                          <h4 style={{ fontSize: '18px', fontWeight: '600', color: C.green, margin: 0, fontFamily: serif }}>
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
                                      {tsr.salesActual ? (
                                        <>
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

                                          {/* Performance Drivers */}
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
                                        </>
                                      ) : (
                                        /* Simplified TSR card for healthy territories */
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                          <div>
                                            <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px', textTransform: 'uppercase' }}>Outlets</div>
                                            <div style={{ fontSize: '16px', fontWeight: '600', color: C.darkGrey }}>{tsr.outlets}</div>
                                          </div>
                                          <div>
                                            <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px', textTransform: 'uppercase' }}>Achievement</div>
                                            <div style={{ fontSize: '16px', fontWeight: '600', color: C.darkGreen }}>{tsr.achievement}%</div>
                                          </div>
                                          <div>
                                            <div style={{ fontSize: '9px', color: C.lightGrey, marginBottom: '2px', textTransform: 'uppercase' }}>Call Compliance</div>
                                            <div style={{ fontSize: '16px', fontWeight: '600', color: C.darkGrey }}>{tsr.callCompliance}</div>
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
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══════════════════ FOOTER ═══════════════════ */}
        <div style={{ marginTop: 'auto', borderTop: `1px solid ${C.cream}`, padding: '12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: C.white }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: '500', color: C.darkGrey }}>questt</span>
            <span style={{ color: '#1B6B5A', fontSize: '12px', fontWeight: '700' }}>.</span>
            <span style={{ fontSize: '10px', color: C.cream, margin: '0 2px' }}>|</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: C.darkGrey, fontFamily: serif }}>pwc</span>
            <span style={{ fontSize: '10px', color: C.lightGrey, marginLeft: '10px' }}>Sales Watchtower v2.4</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#3BB896' }} />
              <span style={{ fontSize: '10px', color: C.lightGrey }}>Synced 2 min ago</span>
            </div>
            <span style={{ fontSize: '10px', color: C.lightGrey }}>Region: Metro</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════ MODALS & OVERLAYS (unchanged) ═══════════════════ */}
      
      {trailOpen && selectedTrail && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }} onClick={() => setTrailOpen(false)}>
          <div style={{ backgroundColor: C.white, borderRadius: '8px', maxWidth: '900px', width: '100%', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px', borderBottom: `1px solid ${C.cream}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: C.green, margin: 0, marginBottom: '4px', fontFamily: serif }}>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: C.green }}>
                        {step.agent}
                      </div>
                      <div style={{ fontSize: '11px', color: C.lightGrey, fontFamily: "'JetBrains Mono', monospace" }}>
                        {step.timestamp}
                      </div>
                    </div>
                    
                    <div style={{ fontSize: '13px', color: C.darkGrey, marginBottom: '12px', lineHeight: '1.5' }}>
                      {step.action}
                    </div>
                    
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 10px', backgroundColor: C.white, borderRadius: '4px', fontSize: '11px', fontWeight: '600', color: C.sage, marginBottom: '10px', border: `1px solid ${C.cream}` }}>
                      <Layers size={14} />
                      {step.database}
                    </div>
                    
                    <div style={{ padding: '12px', backgroundColor: C.darkGreen, borderRadius: '4px', marginBottom: '12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#E5E2DB', overflowX: 'auto', lineHeight: '1.6' }}>
                      {step.query}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', padding: '12px', backgroundColor: `${C.sage}10`, borderRadius: '4px', marginBottom: step.nextAgent ? '12px' : 0, borderLeft: `3px solid ${C.sage}` }}>
                      <div style={{ fontSize: '12px', color: C.sage, flexShrink: 0, marginTop: '2px' }}>
                        💭
                      </div>
                      <div style={{ fontSize: '12px', color: C.darkGrey, fontStyle: 'italic', lineHeight: '1.6' }}>
                        {step.thinking}
                      </div>
                    </div>
                    
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <div style={{ width: 18, height: 18, borderRadius: 9, background: C.darkGreen, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#fff', fontSize: 8, fontWeight: 600, fontFamily: font, letterSpacing: '-0.02em', lineHeight: 1 }}>q</span><span style={{ color: '#1B6B5A', fontSize: 8, fontWeight: 700, lineHeight: 1 }}>.</span></div>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: C.green, fontFamily: font }}>questt</span>
                  <span style={{ color: '#1B6B5A', fontSize: '13px', fontWeight: '700' }}>.</span>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: C.green, margin: 0, fontFamily: serif }}>
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
                {msg.type === 'typing' ? (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <QuesttMark size={24} />
                    <div style={{ padding: '14px 16px', backgroundColor: C.offWhite, border: `1px solid ${C.cream}`, borderRadius: '6px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.sage, opacity: 0.4, animation: 'typingBounce 1.2s ease-in-out infinite' }} />
                      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.sage, opacity: 0.4, animation: 'typingBounce 1.2s ease-in-out 0.2s infinite' }} />
                      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.sage, opacity: 0.4, animation: 'typingBounce 1.2s ease-in-out 0.4s infinite' }} />
                    </div>
                  </div>
                ) : (
                  <>
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
                              fontFamily: font,
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
                  </>
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
                  fontFamily: font,
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

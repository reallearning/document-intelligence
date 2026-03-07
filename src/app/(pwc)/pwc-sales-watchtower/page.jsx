"use client";
import React, { useState } from 'react';
import { MessageSquare, AlertCircle, ChevronRight, Package, MapPin, Activity, Send, X, Target, Sparkles, Clock, ChevronDown, BarChart3, Layers, TrendingUp } from 'lucide-react';

/* ─── Sub-components ─────────────────────────────────── */

const StatusBadge = ({ status }) => {
  const config = {
    critical:    { cls: 'bg-pwc-terra-soft text-pwc-terra',  label: 'Critical' },
    warning:     { cls: 'bg-pwc-amber-soft text-pwc-amber',  label: 'Needs Attention' },
    healthy:     { cls: 'bg-pwc-sage-soft text-pwc-sage',    label: 'Healthy' },
    high:        { cls: 'bg-pwc-amber-soft text-pwc-amber',  label: 'High Priority' },
    opportunity: { cls: 'bg-pwc-sage-soft text-pwc-sage',    label: 'Opportunity' },
    medium:      { cls: 'bg-pwc-bg-alt text-pwc-dim',        label: 'Monitor' },
  }[status] || { cls: 'bg-pwc-bg-alt text-pwc-dim', label: status };
  return (
    <span className={`text-[10px] font-bold tracking-[0.05em] uppercase px-2.5 py-1 rounded ${config.cls}`}>
      {config.label}
    </span>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-1">
      <div className="w-[3px] h-4 bg-pwc-sage rounded-full flex-shrink-0" />
      <h2 className="text-[15px] font-bold text-pwc-text tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-[13px] text-pwc-dimmer pl-[18px]">{subtitle}</p>}
  </div>
);

const Sparkline = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 30;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(' ');
  return (
    <svg width={w} height={h} className="block flex-shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/* ─── Main Component ─────────────────────────────────── */

export default function QuesttSalesWatchtower() {
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
    if (chatMessagesEndRef.current) chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  /* ─── Data ───────────────────────────────────────────── */

  const briefingPoints = [
    {
      type: 'critical',
      title: 'Western territory — projected stockout in 2 days across 3 distributors',
      detail: 'Stock alert: Classic Crunch 52g and Spice Twist 85g inventory at 1.2 days cover across Alpha, Gamma, and Beta Distributors. 685 outlets at risk of stockout by Jan 31. Estimated sales loss of Rs 8.2L/day if stockout occurs. Immediate reorder required.'
    },
    {
      type: 'alert',
      title: 'Central territory — must-sell SKU inventory running low at 2 distributors',
      detail: 'Inventory alert: Triangle Chips 90g and Hot Puffs at 2.5 days cover in Area North & Area East distributors. 420 outlets at risk. Projected stockout by Feb 1 if current offtake continues. Need expedited secondary sales push of Rs 4.8L.'
    },
    {
      type: 'alert',
      title: 'Western territory — order frequency dropped across 4 distributors this week',
      detail: 'Beta, Delta, Epsilon Trading, and Zeta Distributors placed 32% fewer orders this week (38 orders vs 56 typical). Covering 1,140 outlets. DMS flags irregular ordering pattern across Western territory for last 10 days.'
    },
    {
      type: 'performance',
      title: 'Region-wide weekly achievement at 87% vs 92% target',
      detail: 'Current weekly run-rate at 87%. Need Rs 42L additional billing to hit weekly target. Eastern territory at 96%, Central & Western territories need acceleration to close Rs 42L gap.'
    },
    {
      type: 'highlight',
      title: 'Central territory — 3 distributors restored to 92%+ distribution from 68% slump',
      detail: 'Delta, Alpha, and Eta Distributors (Area East & Area Northeast areas) recovered from 2-week distribution slump. Now averaging 92% numeric distribution vs 68% two weeks ago. Covering 825 outlets. Secondary sales back to Rs 52L weekly.'
    }
  ];

  const insights = [
    {
      id: 1,
      priority: 'critical',
      title: 'Must-sell SKU distribution gap of 24 points vs core portfolio — 1,240 unbilled outlets',
      summary: 'Triangle Chips & Hot Puffs at 68% numeric distribution vs 92% for Classic Crunch — Rs 2.2Cr quarterly gap',
      keyNumbers: {
        distributionGap: '68% vs 92% (24 pts)',
        unbilledOutlets: '1,240 outlets',
        revenueOpportunity: 'Rs 2.2Cr quarterly',
        gapVsLYSM: '-8 pts vs Jan 2025'
      },
      narrative: "Must-sell SKU numeric distribution has declined 8 points vs last year same month, now at 68% compared to 92% for core Classic Crunch portfolio. Central District shows steepest drop at 61% distribution (down from 74% LYSM). Analysis reveals systematic pattern: 4 of 18 distributors consistently under-stock must-sell SKUs despite maintaining 85%+ core distribution. These distributors collectively serve 1,240 outlets — all currently unbilled for must-sell portfolio. Distributor order frequency data shows must-sell SKUs ordered 18% less frequently than core SKUs, suggesting systematic deprioritization in secondary sales cycle.",
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
      owner: 'Distribution Planning — Metro Region',
      trail: [
        {
          timestamp: '09:14 AM',
          agent: 'Orchestrator Agent',
          action: 'Analyzing weekly distribution performance',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, sku_category, numeric_distribution, outlet_count, trend_vs_lysm FROM weekly_distribution WHERE region = "Metro" AND week = CURRENT_WEEK',
          thinking: 'Must-sell SKU distribution at 68% vs 92% for core portfolio — 24 point gap. Central territory showing steepest decline at 61% (down 13 points vs LYSM). This gap is widening month-over-month.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '09:15 AM',
          agent: 'Distribution Agent',
          action: 'Identifying distributor-level stocking patterns',
          database: 'DMS System',
          query: 'SELECT distributor_id, distributor_name, premium_sku_numeric_dist, core_sku_numeric_dist, outlet_count, unbilled_outlets FROM distributor_performance WHERE territory IN ("Central", "Western", "Eastern", "East Zone") AND premium_sku_numeric_dist < 70',
          thinking: '4 distributors maintain 85%+ core distribution but only 60–65% premium. Collectively serving 1,240 outlets that are unbilled for must-sell portfolio. This is a systematic stocking selectivity pattern.',
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
      title: 'Territory-level distribution variance — 16 point gap between best and worst performing areas',
      summary: 'East Zone West at 94% numeric distribution vs Central District at 78% — systematic coverage pattern',
      keyNumbers: {
        distributionRange: '78% to 94% (16 pts)',
        topTerritory: 'East Zone West 94%',
        bottomTerritory: 'Central District 78%',
        gapVsLYSM: 'Variance up from 11 pts'
      },
      narrative: "Territory-level distribution analysis reveals widening performance gap — variance increased from 11 points (LYSM) to 16 points currently. East Zone West maintains 94% numeric distribution through consistent 92% outlet service frequency, while Central District at 78% distribution has only 76% outlet service frequency. Pattern analysis shows top-performing territories have 3 times per week order frequency per distributor vs 2 times in lower-performing areas. Distribution depth (outlets per distributor) is comparable across territories, indicating gap is execution-driven rather than structural. Outlet-level data shows 615 outlets in Central territory are sporadically serviced (visited but not billed regularly), compared to only 145 such outlets in East Zone West.",
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
      owner: 'Distribution Planning — Metro Region',
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
          thinking: 'Identified 1,027 outlets with sporadic billing (visited but not billed regularly). 615 in Central, 412 in Western District. These outlets represent systematic coverage depth issue — inconsistent conversion from visit to billing.',
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
      title: 'Festival SKU numeric distribution at 72% vs 88% target — 18 days to seasonal peak demand',
      summary: 'Festival portfolio stocking rate 16 points below target across 3,850 outlets',
      keyNumbers: {
        currentDistribution: '72% of outlets',
        targetDistribution: '88% by peak prep deadline',
        unbilledOutlets: '615 outlets',
        gapVsLYSM: '-6 pts vs Season 2025'
      },
      narrative: "Festival SKU portfolio (party packs, combo offers, festival variants) currently at 72% numeric distribution vs 88% target for seasonal peak window. This represents a 6-point decline vs last year's seasonal pre-positioning. Distribution gap concentrated in Western District (64%) and Central District (68%), while Eastern District and East Zone track closer to target at 78–82%. Secondary sales data shows 615 outlets have not been billed for festival SKUs despite having regular orders for core portfolio. Festival SKU order frequency from distributors is 2 times per week vs target of 2–3 times — indicating insufficient push in secondary sales cycle. Historical correlation shows 88%+ distribution during festival window drives 34% volume uplift.",
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
        action: "Accelerate festival SKU secondary sales push across 615 unbilled outlets. Focus distributor engagement in Western and Central territories to increase order frequency from 2 times to 2–3 times per week. Priority on outlets with high footfall during festival period.",
        return: "Achieving 88% distribution protects Rs 88L festival window revenue opportunity",
        roi: "Festival periods contribute 12–15% of quarterly revenue in Metro region"
      },
      owner: 'Distribution Planning — Festival Category',
      trail: [
        {
          timestamp: '11:20 AM',
          agent: 'Orchestrator Agent',
          action: 'Analyzing festival SKU distribution readiness',
          database: 'Sales Analytics DB',
          query: 'SELECT festival_name, sku_category, current_distribution, target_distribution, days_to_festival FROM festival_distribution_tracking WHERE region = "Metro" AND festival_date > CURRENT_DATE ORDER BY festival_date LIMIT 1',
          thinking: 'Seasonal peak in 18 days. Festival SKU portfolio at 72% numeric distribution vs 88% target (16 point gap). This is 6 points below LYSM positioning for same period. Distribution lag concentrated in certain territories.',
          nextAgent: 'Distribution Agent'
        },
        {
          timestamp: '11:22 AM',
          agent: 'Distribution Agent',
          action: 'Mapping festival SKU stocking patterns by territory',
          database: 'DMS System',
          query: 'SELECT territory, COUNT(outlet_id) as total_outlets, SUM(CASE WHEN festival_sku_billed = 1 THEN 1 ELSE 0 END) as stocked_outlets FROM outlet_billing_patterns WHERE region = "Metro" GROUP BY territory',
          thinking: '615 outlets unbilled for festival SKUs despite regular core portfolio orders. Western District accounts for 288 unbilled outlets (64% distribution), Central 352 outlets (68% distribution). Gap vs Eastern District (82%) and East Zone (78%) indicates execution variance.',
          nextAgent: 'Sales Agent'
        },
        {
          timestamp: '11:24 AM',
          agent: 'Sales Agent',
          action: 'Examining festival SKU secondary sales velocity',
          database: 'Sales Analytics DB',
          query: 'SELECT territory, distributor_id, AVG(festival_sku_order_frequency) as order_freq, trend_vs_lysm FROM distributor_ordering_patterns WHERE sku_category = "festival" AND region = "Metro" GROUP BY territory',
          thinking: 'Festival SKU order frequency from distributors at 2 times per week vs target of 2–3 times. This ordering rhythm gap drives the distribution shortfall. Top territories maintain 2.3–2.5 times frequency, lagging territories at 1.5–2 times.',
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
          thinking: 'Achieving 88% distribution requires converting 615 unbilled outlets and increasing distributor order frequency from 2 times to 2–3 times per week in Western and Central territories. This protects Rs 88L festival window revenue opportunity.',
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
          metrics: { mandateCompliance: '78%', stockOnHand: '1,850 cases', returns: '3.1%' },
          tsrs: [
            { name: 'TSR A1', location: 'Area North', salesActual: '₹6.8L', salesTarget: '₹11.2L', volumeActual: '1,840 cases', volumeTarget: '3,150 cases', achievement: 61, outlets: { active: 78, target: 95, notBilledLast30Days: 17, coverage: '82%' }, productivity: { callsPerDay: 11, ordersPerDay: 5, linesPerOrder: 5 }, performanceDrivers: { distribution: -28, mandays: -35, avgOrderValue: -12 } },
            { name: 'TSR A2', location: 'Area Central', salesActual: '₹8.2L', salesTarget: '₹12.4L', volumeActual: '2,280 cases', volumeTarget: '3,420 cases', achievement: 66, outlets: { active: 71, target: 83, notBilledLast30Days: 12, coverage: '86%' }, productivity: { callsPerDay: 13, ordersPerDay: 6, linesPerOrder: 6 }, performanceDrivers: { distribution: -22, mandays: -28, avgOrderValue: -8 } },
            { name: 'TSR A3', location: 'Area North East', salesActual: '₹7.6L', salesTarget: '₹12.8L', volumeActual: '2,050 cases', volumeTarget: '3,480 cases', achievement: 59, outlets: { active: 89, target: 107, notBilledLast30Days: 18, coverage: '83%' }, productivity: { callsPerDay: 12, ordersPerDay: 6, linesPerOrder: 5 }, performanceDrivers: { distribution: -25, mandays: -32, avgOrderValue: -10 } }
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
          metrics: { mandateCompliance: '92%', stockOnHand: '2,100 cases', returns: '2.2%' },
          tsrs: [
            { name: 'TSR B1', location: 'Area West', salesActual: '₹9.1L', salesTarget: '₹12.0L', volumeActual: '2,527 cases', volumeTarget: '3,333 cases', achievement: 76, outlets: { active: 96, target: 108, notBilledLast30Days: 12, coverage: '89%' }, productivity: { callsPerDay: 15, ordersPerDay: 8, linesPerOrder: 7 }, performanceDrivers: { distribution: -12, mandays: -18, avgOrderValue: -6 } },
            { name: 'TSR B2', location: 'Area Northwest', salesActual: '₹10.2L', salesTarget: '₹14.0L', volumeActual: '2,833 cases', volumeTarget: '3,888 cases', achievement: 73, outlets: { active: 91, target: 105, notBilledLast30Days: 14, coverage: '87%' }, productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 7 }, performanceDrivers: { distribution: -15, mandays: -22, avgOrderValue: -7 } },
            { name: 'TSR B3', location: 'Area West East', salesActual: '₹9.5L', salesTarget: '₹13.0L', volumeActual: '2,638 cases', volumeTarget: '3,611 cases', achievement: 73, outlets: { active: 93, target: 107, notBilledLast30Days: 14, coverage: '87%' }, productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 6 }, performanceDrivers: { distribution: -14, mandays: -20, avgOrderValue: -8 } }
          ]
        },
        {
          name: 'Delta Trading',
          territory: 'Area East & Area Northeast',
          monthlyVolume: '₹1.0Cr',
          outlets: { total: 285, active: 268, productive: 225 },
          orderFrequency: '2–3 times per week',
          achievement: 68,
          status: 'warning',
          metrics: { mandateCompliance: '85%', stockOnHand: '1,650 cases', returns: '2.6%' },
          tsrs: [
            { name: 'TSR C1', location: 'Area East', salesActual: '₹9.1L', salesTarget: '₹13.0L', volumeActual: '2,527 cases', volumeTarget: '3,611 cases', achievement: 70, outlets: { active: 82, target: 96, notBilledLast30Days: 14, coverage: '85%' }, productivity: { callsPerDay: 13, ordersPerDay: 6, linesPerOrder: 6 }, performanceDrivers: { distribution: -18, mandays: -25, avgOrderValue: -9 } },
            { name: 'TSR C2', location: 'Area Northeast', salesActual: '₹7.9L', salesTarget: '₹12.0L', volumeActual: '2,194 cases', volumeTarget: '3,333 cases', achievement: 66, outlets: { active: 75, target: 89, notBilledLast30Days: 14, coverage: '84%' }, productivity: { callsPerDay: 12, ordersPerDay: 5, linesPerOrder: 5 }, performanceDrivers: { distribution: -20, mandays: -28, avgOrderValue: -11 } }
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
          metrics: { mandateCompliance: '94%', stockOnHand: '2,850 cases', returns: '1.3%' },
          tsrs: [
            { name: 'TSR D1', location: 'Main Street', salesActual: '₹11.3L', salesTarget: '₹12.0L', volumeActual: '3,138 cases', volumeTarget: '3,333 cases', achievement: 94, outlets: { active: 119, target: 125, notBilledLast30Days: 6, coverage: '95%' }, productivity: { callsPerDay: 17, ordersPerDay: 10, linesPerOrder: 7 }, performanceDrivers: { distribution: -3, mandays: -5, avgOrderValue: -2 } },
            { name: 'TSR D2', location: 'Zone Central', salesActual: '₹12.7L', salesTarget: '₹14.0L', volumeActual: '3,527 cases', volumeTarget: '3,888 cases', achievement: 91, outlets: { active: 112, target: 118, notBilledLast30Days: 6, coverage: '95%' }, productivity: { callsPerDay: 16, ordersPerDay: 9, linesPerOrder: 7 }, performanceDrivers: { distribution: -4, mandays: -6, avgOrderValue: -3 } },
            { name: 'TSR D3', location: 'Market Square', salesActual: '₹12.9L', salesTarget: '₹14.0L', volumeActual: '3,583 cases', volumeTarget: '3,888 cases', achievement: 92, outlets: { active: 130, target: 137, notBilledLast30Days: 7, coverage: '95%' }, productivity: { callsPerDay: 18, ordersPerDay: 10, linesPerOrder: 7 }, performanceDrivers: { distribution: -4, mandays: -6, avgOrderValue: -2 } }
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
          metrics: { mandateCompliance: '88%', stockOnHand: '2,200 cases', returns: '1.8%' },
          tsrs: [
            { name: 'TSR E1', location: 'Sector South', salesActual: '₹10.5L', salesTarget: '₹14.0L', volumeActual: '2,916 cases', volumeTarget: '3,888 cases', achievement: 75, outlets: { active: 78, target: 92, notBilledLast30Days: 14, coverage: '85%' }, productivity: { callsPerDay: 13, ordersPerDay: 7, linesPerOrder: 6 }, performanceDrivers: { distribution: -16, mandays: -22, avgOrderValue: -9 } },
            { name: 'TSR E2', location: 'Tech Park', salesActual: '₹10.4L', salesTarget: '₹13.0L', volumeActual: '2,888 cases', volumeTarget: '3,611 cases', achievement: 80, outlets: { active: 82, target: 88, notBilledLast30Days: 6, coverage: '93%' }, productivity: { callsPerDay: 15, ordersPerDay: 8, linesPerOrder: 7 }, performanceDrivers: { distribution: -10, mandays: -14, avgOrderValue: -6 } },
            { name: 'TSR E3', location: 'Sector South East', salesActual: '₹11.1L', salesTarget: '₹14.0L', volumeActual: '3,083 cases', volumeTarget: '3,888 cases', achievement: 79, outlets: { active: 81, target: 88, notBilledLast30Days: 7, coverage: '92%' }, productivity: { callsPerDay: 14, ordersPerDay: 7, linesPerOrder: 7 }, performanceDrivers: { distribution: -12, mandays: -16, avgOrderValue: -7 } }
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
          metrics: { mandateCompliance: '76%', stockOnHand: '1,950 cases', returns: '1.4%' },
          tsrs: [
            { name: 'TSR F1', location: 'Sector West', salesActual: '₹12.6L', salesTarget: '₹14.0L', volumeActual: '3,500 cases', volumeTarget: '3,888 cases', achievement: 90, outlets: { active: 130, target: 138, notBilledLast30Days: 8, coverage: '94%' }, productivity: { callsPerDay: 16, ordersPerDay: 9, linesPerOrder: 7 }, performanceDrivers: { distribution: -6, mandays: -10, avgOrderValue: -4 } },
            { name: 'TSR F2', location: 'Business Hub', salesActual: '₹12.3L', salesTarget: '₹14.0L', volumeActual: '3,416 cases', volumeTarget: '3,888 cases', achievement: 88, outlets: { active: 109, target: 117, notBilledLast30Days: 8, coverage: '93%' }, productivity: { callsPerDay: 15, ordersPerDay: 8, linesPerOrder: 7 }, performanceDrivers: { distribution: -8, mandays: -12, avgOrderValue: -5 } }
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
      topIssue: 'Benchmark performance — replicate practices',
      distributors: [
        {
          name: 'Lambda Supplies',
          territory: 'East Zone West',
          monthlyVolume: '₹1.5Cr',
          outlets: { total: 410, active: 410, productive: 362 },
          orderFrequency: '4 times per week',
          achievement: 108,
          status: 'healthy',
          metrics: { mandateCompliance: '91%', stockOnHand: '1,450 cases', returns: '0.7%' },
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
          metrics: { mandateCompliance: '83%', stockOnHand: '1,680 cases', returns: '0.9%' },
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
          metrics: { mandateCompliance: '96%', stockOnHand: '2,100 cases', returns: '1.1%' },
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
          metrics: { mandateCompliance: '87%', stockOnHand: '1,550 cases', returns: '1.3%' },
          tsrs: [
            { name: 'TSR K1', outlets: 135, achievement: 90, callCompliance: '92%' },
            { name: 'TSR K2', outlets: 128, achievement: 88, callCompliance: '90%' }
          ]
        }
      ]
    }
  ];

  /* ─── Handlers ───────────────────────────────────────── */

  const openChat = (insight, scenario) => {
    setSelectedInsight(insight);
    setChatOpen(true);
    const initialText = scenario
      ? `Let's explore: ${scenario}`
      : `Let's discuss ${insight.title.toLowerCase()}. What would you like to understand better?`;
    setChatMessages([{
      type: 'ai',
      text: initialText,
      suggestions: scenario ? [] : ['Why is this happening?', 'What is the risk if we do not act?', 'Show me the action plan', 'How do we prevent recurrence?']
    }]);
  };

  const openTrail = (trail) => { setSelectedTrail(trail); setTrailOpen(true); };

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const lowerText = text.toLowerCase();
    let aiResponse = { type: 'ai', text: '', suggestions: [] };
    if (lowerText.includes('why') || lowerText.includes('happening')) {
      aiResponse.text = "The root cause is a cascading effect: merchandiser shortage leads to reduced coverage leads to empty shelves leads to distributors seeing no demand signal leads to them reducing orders. It is a negative feedback loop accelerating at 4% weekly.";
      aiResponse.suggestions = ['How fast can we recover?', 'What is the cost of inaction?', 'Compare to similar situations'];
    } else if (lowerText.includes('action') || lowerText.includes('plan')) {
      aiResponse.text = "Week 1: Deploy 3 merchandisers (recruitment agency ready). Week 2–3: New team shadows existing, reactivates dropped outlets. Week 4: Coverage back to 82%, Rs 125k weekly recovery begins. Total investment: Rs 66k monthly. Return: Rs 500k monthly.";
      aiResponse.suggestions = ['What are the risks?', 'Can we do this faster?', 'What if it does not work?'];
    } else {
      aiResponse.text = "I can help you understand the situation better, explore what-if scenarios, or build an action plan. What would be most useful?";
      aiResponse.suggestions = ['Explain root cause', 'Build action plan', 'Explore what-if scenarios'];
    }
    setChatMessages(prev => [...prev, { type: 'user', text }, aiResponse]);
    setInputMessage('');
  };

  /* ─── Render ─────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-pwc-bg-sub font-inter overflow-auto">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-pwc-green flex items-center justify-between px-8 h-14 border-b border-white/[0.08] flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-white tracking-tight">questt</span>
            <span className="text-white/20 text-[9px] select-none leading-none">×</span>
            <span className="text-[10px] font-bold tracking-[0.12em] text-white/50">PwC</span>
          </div>
          <span className="w-px h-4 bg-white/10 block" />
          <span className="text-[13px] text-white/55 font-normal">Sales Watchtower</span>
        </div>
        <span className="text-[11px] text-white/35 font-medium">Metro Region · Week ending Feb 2, 2026</span>
      </div>

      {/* Tab Nav */}
      <div className="bg-white border-b border-pwc-border px-8">
        <div className="flex max-w-[1400px] mx-auto">
          {['briefing', 'deepdive'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-7 py-5 text-[13px] border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-pwc-green text-pwc-green font-semibold'
                  : 'border-transparent text-pwc-dimmer font-medium hover:text-pwc-text'
              }`}
            >
              {tab === 'deepdive' ? 'Territory Deep Dive' : 'Morning Briefing'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-10">

        {/* ── Briefing Tab ── */}
        {activeTab === 'briefing' && (
          <>
            {/* KPI Strip */}
            <div className="grid grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Metro Achievement',   value: '89%',   delta: '−11% vs LYSM',    negative: true,  icon: Target  },
                { label: 'Active Outlets (L90D)', value: '1,850', delta: 'of 2,055 total', negative: false, icon: MapPin  },
                { label: 'Metro Avg Coverage',  value: '88%',   delta: '−6% vs LYSM',     negative: true,  icon: Activity },
                { label: 'Must-sell Mix',        value: '32%',   delta: 'vs 52% East Zone', negative: false, icon: Package },
              ].map((kpi, i) => (
                <div key={i} className="bg-white rounded-[10px] border border-pwc-border-light overflow-hidden shadow-sm">
                  <div className={`h-[2.5px] ${kpi.negative ? 'bg-pwc-amber' : 'bg-pwc-sage'}`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-[10px] font-bold text-pwc-dimmer tracking-[0.09em] uppercase">{kpi.label}</div>
                      <kpi.icon size={14} strokeWidth={1.5} className="text-pwc-dimmer flex-shrink-0 mt-0.5" />
                    </div>
                    <div className="text-[28px] font-bold text-pwc-text leading-none mb-1.5">{kpi.value}</div>
                    <div className={`text-[11px] leading-snug ${kpi.negative ? 'text-pwc-amber' : 'text-pwc-dimmer'}`}>{kpi.delta}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Morning Briefing */}
            <SectionHeader title="Morning Briefing" subtitle="Today's critical alerts and operational highlights" />
            <div className="flex flex-col gap-3 mb-10">
              {briefingPoints.map((point, i) => {
                const cfg = {
                  critical:    { Icon: AlertCircle, cls: 'text-pwc-terra', accent: 'bg-pwc-terra' },
                  alert:       { Icon: Clock,       cls: 'text-pwc-amber', accent: 'bg-pwc-amber' },
                  performance: { Icon: BarChart3,   cls: 'text-pwc-sage',  accent: 'bg-pwc-sage'  },
                  highlight:   { Icon: Sparkles,    cls: 'text-pwc-sage',  accent: 'bg-pwc-sage'  },
                  opportunity: { Icon: TrendingUp,  cls: 'text-pwc-sage',  accent: 'bg-pwc-sage'  },
                }[point.type] || { Icon: Activity, cls: 'text-pwc-dimmer', accent: 'bg-pwc-border' };
                return (
                  <div key={i} className="flex bg-white rounded-lg overflow-hidden border border-pwc-border-light shadow-sm">
                    <div className={`w-[3px] flex-shrink-0 ${cfg.accent}`} />
                    <div className="flex-1 p-5 flex gap-4 items-start">
                      <cfg.Icon size={16} strokeWidth={2} className={`flex-shrink-0 mt-0.5 ${cfg.cls}`} />
                      <div>
                        <div className="text-[14px] font-semibold text-pwc-text mb-1">{point.title}</div>
                        <div className="text-[13px] text-pwc-dim leading-relaxed">{point.detail}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <hr className="border-pwc-border mb-10" />

            {/* Key Insights */}
            <SectionHeader title="Key Insights" subtitle="Data-backed analysis with full agent provenance" />
            <div className="flex flex-col gap-6">
              {insights.map((insight) => {
                const isCrit = insight.priority === 'critical';
                return (
                  <div key={insight.id} className="bg-white rounded-[10px] border border-pwc-border-light overflow-hidden shadow-sm">
                    <div className={`h-[2.5px] ${isCrit ? 'bg-pwc-terra' : 'bg-pwc-amber'}`} />
                    <div className="p-7">

                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <StatusBadge status={insight.priority} />
                        <span className="text-[11px] text-pwc-dimmer font-medium">{insight.owner}</span>
                      </div>
                      <h4 className="text-[18px] font-bold text-pwc-text mb-1.5 leading-snug">{insight.title}</h4>
                      <p className="text-[13px] text-pwc-dimmer mb-6">{insight.summary}</p>

                      {/* Key Numbers */}
                      <div className="grid grid-cols-4 gap-3 bg-pwc-bg-sub rounded-lg p-4 mb-6">
                        {Object.entries(insight.keyNumbers).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-[10px] font-bold text-pwc-dimmer tracking-[0.06em] uppercase mb-1">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-[17px] font-bold text-pwc-text">{value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Narrative */}
                      <div className="bg-pwc-bg-sub rounded-lg p-5 mb-6">
                        <p className="text-[13px] text-pwc-dim leading-relaxed">{insight.narrative}</p>
                      </div>

                      {/* Data Table */}
                      <div className="border border-pwc-border-light rounded-lg overflow-hidden mb-6">
                        <table className="w-full border-collapse text-[13px]">
                          <thead>
                            <tr className="bg-pwc-bg-sub">
                              {insight.dataTable.headers.map((h, i) => (
                                <th key={i} className="text-left text-[10px] font-bold text-pwc-dimmer tracking-[0.08em] uppercase px-4 py-3 border-b border-pwc-border">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {insight.dataTable.rows.map((row, i) => (
                              <tr key={i} className={i < insight.dataTable.rows.length - 1 ? 'border-b border-pwc-border-light' : ''}>
                                {row.map((cell, j) => (
                                  <td key={j} className="px-4 py-3 text-pwc-text">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Supply Chain Context */}
                      {insight.supplyChainBacking && (
                        <div className="flex bg-pwc-sage-soft rounded-lg overflow-hidden mb-6">
                          <div className="w-[3px] flex-shrink-0 bg-pwc-sage" />
                          <div className="flex-1 px-4 py-3">
                            <div className="text-[10px] font-bold text-pwc-sage tracking-[0.06em] uppercase mb-1">Supply Chain Context</div>
                            <p className="text-[13px] text-pwc-dim leading-relaxed">{insight.supplyChainBacking}</p>
                          </div>
                        </div>
                      )}

                      {/* Recommendation */}
                      <div className="bg-pwc-bg-sub border border-pwc-border rounded-lg p-5 mb-6">
                        <div className="text-[10px] font-bold text-pwc-sage tracking-[0.06em] uppercase mb-3">Recommended Action</div>
                        <p className="text-[14px] font-semibold text-pwc-text mb-4 leading-snug">{insight.recommendation.action}</p>
                        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-pwc-border-light">
                          <div>
                            <div className="text-[10px] text-pwc-dimmer uppercase tracking-wide mb-1">Return</div>
                            <div className="text-[13px] font-semibold text-pwc-sage">{insight.recommendation.return}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-pwc-dimmer uppercase tracking-wide mb-1">ROI</div>
                            <div className="text-[13px] font-semibold text-pwc-sage">{insight.recommendation.roi}</div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <button
                          onClick={() => openTrail(insight.trail)}
                          className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-pwc-border text-pwc-text text-[13px] font-semibold bg-white hover:bg-pwc-bg-sub transition-colors"
                        >
                          <Layers size={14} strokeWidth={2} />
                          View Insight Trail
                        </button>
                        <button
                          onClick={() => openChat(insight)}
                          className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-pwc-green text-white text-[13px] font-semibold hover:bg-pwc-green-mid transition-colors"
                        >
                          <MessageSquare size={14} strokeWidth={2} />
                          Discuss with questt
                        </button>
                      </div>

                      {/* What-If Scenarios */}
                      {insight.whatIfScenarios && (
                        <div className="bg-pwc-bg-sub rounded-lg p-4">
                          <div className="text-[10px] font-bold text-pwc-sage tracking-[0.06em] uppercase mb-3">What-If Scenarios</div>
                          <div className="grid grid-cols-2 gap-2">
                            {insight.whatIfScenarios.map((scenario, i) => (
                              <button
                                key={i}
                                onClick={() => openChat(insight, scenario)}
                                className="text-left text-[12px] text-pwc-dim px-3 py-2.5 bg-white border border-pwc-border-light rounded-lg hover:border-pwc-sage hover:text-pwc-text transition-colors"
                              >
                                {scenario}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── Deep Dive Tab ── */}
        {activeTab === 'deepdive' && (
          <div>
            <SectionHeader
              title="Metro ASM Territory Performance"
              subtitle="Deep dive into Metro region ASM territories and their distributor networks"
            />
            <div className="flex flex-col gap-5">
              {territories.map((territory) => {
                const isExpanded = expandedTerritory === territory.name;
                const sparkColor = { healthy: '#1B6B5A', warning: '#946B1A', critical: '#B33A3A' }[territory.status] || '#A09D98';
                return (
                  <div key={territory.name} className="bg-white rounded-[10px] border border-pwc-border-light overflow-hidden shadow-sm">

                    {/* Territory Header */}
                    <div
                      className="p-6 cursor-pointer bg-pwc-bg-sub hover:bg-pwc-bg-alt transition-colors"
                      onClick={() => setExpandedTerritory(isExpanded ? null : territory.name)}
                    >
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-[18px] font-bold text-pwc-text">{territory.name}</h4>
                            <span className="text-[13px] text-pwc-dimmer">{territory.territory}</span>
                            <StatusBadge status={territory.status} />
                          </div>
                          <p className="text-[13px] text-pwc-dim italic">{territory.topIssue}</p>
                        </div>
                        <div className="flex items-center gap-4 ml-6">
                          <Sparkline data={territory.trend} color={sparkColor} />
                          {isExpanded
                            ? <ChevronDown size={18} className="text-pwc-dimmer flex-shrink-0" />
                            : <ChevronRight size={18} className="text-pwc-dimmer flex-shrink-0" />}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { label: 'Achievement',        value: `${territory.achievement}%`,                            good: territory.achievement >= 85 },
                          { label: 'Coverage',           value: `${territory.coverage}%`,                               good: territory.coverage >= 90    },
                          { label: 'Must-sell Mix',      value: `${territory.mustSellMix}%`,                            good: territory.mustSellMix >= 42  },
                          { label: 'Active (billed L90D)', value: `${territory.outlets.active} of ${territory.outlets.total}`, good: true },
                        ].map((m, i) => (
                          <div key={i} className="bg-white rounded-lg p-3 border border-pwc-border-light">
                            <div className="text-[10px] font-bold text-pwc-dimmer tracking-[0.06em] uppercase mb-1.5">{m.label}</div>
                            <div className={`text-[20px] font-bold ${m.good ? 'text-pwc-text' : 'text-pwc-terra'}`}>{m.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expanded: Distributor Network */}
                    {isExpanded && (
                      <div className="p-6 border-t border-pwc-border">
                        <div className="text-[11px] font-bold text-pwc-dimmer tracking-[0.08em] uppercase mb-5">
                          Distributor Network ({territory.distributors.length})
                        </div>
                        <div className="flex flex-col gap-4">
                          {territory.distributors.map((dist, idx) => (
                            <div key={idx} className="bg-pwc-bg-sub border border-pwc-border-light rounded-lg p-5">

                              {/* Distributor header */}
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2.5 mb-1">
                                    <h5 className="text-[15px] font-bold text-pwc-text">{dist.name}</h5>
                                    <StatusBadge status={dist.status} />
                                  </div>
                                  <div className="text-[12px] text-pwc-dimmer mb-1">{dist.territory}</div>
                                  <div className="text-[13px] font-semibold text-pwc-sage">{dist.monthlyVolume} monthly volume</div>
                                </div>
                                <div className={`text-[26px] font-bold flex-shrink-0 ${dist.achievement >= 85 ? 'text-pwc-text' : 'text-pwc-terra'}`}>
                                  {dist.achievement}%
                                </div>
                              </div>

                              {/* Primary metrics */}
                              <div className="grid grid-cols-3 gap-3 mb-3">
                                {[
                                  { label: 'Order Frequency',     value: dist.orderFrequency },
                                  { label: 'Active (billed L90D)', value: `${dist.outlets.active} of ${dist.outlets.total}` },
                                  { label: 'Productive (MTD)',    value: `${dist.outlets.productive} outlets` },
                                ].map((m, i) => (
                                  <div key={i} className="bg-white rounded-lg p-3 border border-pwc-border-light">
                                    <div className="text-[10px] font-bold text-pwc-dimmer tracking-[0.06em] uppercase mb-1">{m.label}</div>
                                    <div className="text-[13px] font-semibold text-pwc-text">{m.value}</div>
                                  </div>
                                ))}
                              </div>

                              {/* Operational metrics */}
                              <div className="grid grid-cols-3 gap-2.5 mb-5">
                                {[
                                  { label: 'Mandate Compliance', value: dist.metrics.mandateCompliance },
                                  { label: 'Stock On Hand',      value: dist.metrics.stockOnHand      },
                                  { label: 'Returns',            value: dist.metrics.returns           },
                                ].map((m, i) => (
                                  <div key={i} className="bg-pwc-bg-alt rounded-lg p-2.5">
                                    <div className="text-[9px] font-bold text-pwc-dimmer tracking-[0.06em] uppercase mb-1">{m.label}</div>
                                    <div className="text-[13px] font-semibold text-pwc-text">{m.value}</div>
                                  </div>
                                ))}
                              </div>

                              {/* TSRs — detailed (for underperforming distributors) */}
                              {dist.tsrs && dist.tsrs[0]?.salesActual && (
                                <div className="pt-5 border-t border-pwc-border">
                                  <div className="text-[11px] font-bold text-pwc-dimmer tracking-[0.08em] uppercase mb-4">
                                    Territory Sales Representatives ({dist.tsrs.length})
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    {dist.tsrs.map((tsr, ti) => (
                                      <div key={ti} className="bg-white rounded-lg border border-pwc-border-light p-5">
                                        <div className="mb-4">
                                          <div className="text-[15px] font-bold text-pwc-text mb-0.5">{tsr.name}</div>
                                          <div className="text-[11px] text-pwc-dimmer">{tsr.location}</div>
                                        </div>

                                        {/* Sales Achievement */}
                                        <div className="bg-pwc-bg-sub rounded-lg p-4 border border-pwc-border-light mb-4">
                                          <div className="text-[10px] font-bold text-pwc-dimmer tracking-[0.06em] uppercase mb-2">Sales Achievement</div>
                                          <div className="flex items-end justify-between mb-2">
                                            <div>
                                              <div className={`text-[22px] font-bold ${tsr.achievement >= 85 ? 'text-pwc-text' : tsr.achievement >= 70 ? 'text-pwc-amber' : 'text-pwc-terra'}`}>
                                                {tsr.salesActual}
                                              </div>
                                              <div className="text-[11px] text-pwc-dimmer">of {tsr.salesTarget} target</div>
                                            </div>
                                            <div className={`text-[26px] font-bold leading-none ${tsr.achievement >= 85 ? 'text-pwc-text' : tsr.achievement >= 70 ? 'text-pwc-amber' : 'text-pwc-terra'}`}>
                                              {tsr.achievement}%
                                            </div>
                                          </div>
                                          <div className="text-[11px] text-pwc-dim pt-2 border-t border-pwc-border-light">
                                            Volume: {tsr.volumeActual} / {tsr.volumeTarget}
                                          </div>
                                        </div>

                                        {/* Performance Drivers */}
                                        <div className="mb-4">
                                          <div className="text-[10px] font-bold text-pwc-dimmer tracking-[0.06em] uppercase mb-2">Performance Drivers (vs Last Month)</div>
                                          <div className="grid grid-cols-3 gap-2">
                                            {[
                                              { label: 'Distribution',    val: tsr.performanceDrivers.distribution    },
                                              { label: 'Mandays',        val: tsr.performanceDrivers.mandays         },
                                              { label: 'Avg Order Value', val: tsr.performanceDrivers.avgOrderValue   },
                                            ].map((d, di) => (
                                              <div key={di} className="bg-pwc-bg-sub rounded-lg p-2.5">
                                                <div className="text-[9px] text-pwc-dimmer uppercase mb-1">{d.label}</div>
                                                <div className="text-[14px] font-bold text-pwc-terra">{d.val}%</div>
                                                <div className="text-[8px] text-pwc-dimmer mt-0.5">vs LM</div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>

                                        {/* Outlet Coverage */}
                                        <div className="mb-4">
                                          <div className="text-[10px] font-bold text-pwc-dimmer tracking-[0.06em] uppercase mb-2">Outlet Coverage</div>
                                          <div className="flex justify-between text-[11px] text-pwc-dim mb-1.5">
                                            <span>Billed this month: <span className="font-semibold text-pwc-text">{tsr.outlets.active}</span></span>
                                            <span>Target: <span className="font-semibold text-pwc-text">{tsr.outlets.target}</span></span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-[11px] text-pwc-terra">Not billed in 30 days: {tsr.outlets.notBilledLast30Days}</span>
                                            <span className="text-[12px] font-semibold text-pwc-text">{tsr.outlets.coverage} coverage</span>
                                          </div>
                                        </div>

                                        {/* Productivity */}
                                        <div>
                                          <div className="text-[10px] font-bold text-pwc-dimmer tracking-[0.06em] uppercase mb-2">Productivity</div>
                                          <div className="grid grid-cols-3 gap-2">
                                            {[
                                              { label: 'Calls/Day',   val: tsr.productivity.callsPerDay  },
                                              { label: 'Orders/Day',  val: tsr.productivity.ordersPerDay },
                                              { label: 'Lines/Order', val: tsr.productivity.linesPerOrder },
                                            ].map((p, pi) => (
                                              <div key={pi}>
                                                <div className="text-[9px] text-pwc-dimmer mb-1">{p.label}</div>
                                                <div className="text-[16px] font-bold text-pwc-text">{p.val}</div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* TSRs — compact (healthy territories) */}
                              {dist.tsrs && !dist.tsrs[0]?.salesActual && (
                                <div className="pt-5 border-t border-pwc-border">
                                  <div className="text-[11px] font-bold text-pwc-dimmer tracking-[0.08em] uppercase mb-3">
                                    Territory Sales Representatives ({dist.tsrs.length})
                                  </div>
                                  <div className="grid grid-cols-3 gap-2">
                                    {dist.tsrs.map((tsr, ti) => (
                                      <div key={ti} className="bg-white rounded-lg border border-pwc-border-light p-3">
                                        <div className="text-[13px] font-bold text-pwc-text mb-1.5">{tsr.name}</div>
                                        <div className="flex justify-between text-[11px] mb-1">
                                          <span className="text-pwc-dimmer">{tsr.outlets} outlets</span>
                                          <span className="font-bold text-pwc-sage">{tsr.achievement}%</span>
                                        </div>
                                        {tsr.callCompliance && (
                                          <div className="text-[10px] text-pwc-dimmer">Call compliance: {tsr.callCompliance}</div>
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
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Trail Modal ── */}
      {trailOpen && selectedTrail && (
        <div
          className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-8"
          onClick={() => setTrailOpen(false)}
        >
          <div
            className="bg-white rounded-[12px] max-w-[900px] w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-7 py-5 border-b border-pwc-border flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-[16px] font-bold text-pwc-text mb-0.5">Insight Trail</h3>
                <p className="text-[12px] text-pwc-dimmer">How we arrived at this insight through data analysis</p>
              </div>
              <button onClick={() => setTrailOpen(false)} className="p-2 hover:bg-pwc-bg-sub rounded-lg transition-colors">
                <X size={18} className="text-pwc-dimmer" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-7 py-6">
              {selectedTrail.map((step, i) => (
                <div key={i} className={`relative pl-10 ${i < selectedTrail.length - 1 ? 'mb-7' : ''}`}>
                  {i < selectedTrail.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-[-28px] w-px bg-pwc-border" />
                  )}
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-pwc-sage text-white flex items-center justify-center text-[13px] font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="bg-pwc-bg-sub rounded-lg border border-pwc-border-light p-5">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="text-[14px] font-bold text-pwc-text">{step.agent}</div>
                      <div className="text-[10px] text-pwc-dimmer font-fira">{step.timestamp}</div>
                    </div>
                    <div className="text-[13px] text-pwc-dim mb-3 leading-relaxed">{step.action}</div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-white border border-pwc-border-light rounded text-[11px] font-semibold text-pwc-sage mb-3">
                      <Layers size={12} />
                      {step.database}
                    </div>
                    <div className="bg-pwc-green rounded-lg px-4 py-3 mb-3 font-fira text-[11px] text-pwc-border leading-relaxed overflow-x-auto">
                      {step.query}
                    </div>
                    <div className="border-l-[3px] border-pwc-sage bg-pwc-sage-soft rounded-r-lg px-4 py-3">
                      <div className="text-[12px] text-pwc-dim italic leading-relaxed">{step.thinking}</div>
                    </div>
                    {step.nextAgent && (
                      <div className="flex items-center gap-2 mt-3 text-[12px] text-pwc-dimmer">
                        <ChevronRight size={13} />
                        <span>Routing to <span className="font-semibold text-pwc-sage">{step.nextAgent}</span></span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Chat Drawer ── */}
      {chatOpen && (
        <div className="fixed top-0 right-0 bottom-0 w-[450px] bg-white border-l border-pwc-border flex flex-col z-[999] shadow-[-4px_0_16px_rgba(0,0,0,0.08)]">
          <div className="px-6 py-5 border-b border-pwc-border bg-pwc-bg-sub flex items-start justify-between flex-shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-pwc-sage flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[9px] font-bold">q</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-pwc-text">questt</span>
                  <span className="text-pwc-dimmer text-[9px]">×</span>
                  <span className="text-[10px] font-bold tracking-[0.12em] text-pwc-dimmer uppercase">PwC</span>
                </div>
              </div>
              <h3 className="text-[14px] font-semibold text-pwc-text leading-snug pr-4">{selectedInsight?.title}</h3>
            </div>
            <button onClick={() => setChatOpen(false)} className="p-1.5 hover:bg-pwc-bg-alt rounded-lg transition-colors flex-shrink-0">
              <X size={18} className="text-pwc-dimmer" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            {chatMessages.map((msg, i) => (
              <div key={i} className="mb-5">
                <div className={`px-4 py-3.5 rounded-lg mb-2 text-[14px] leading-relaxed text-pwc-dim whitespace-pre-line ${
                  msg.type === 'user' ? 'bg-pwc-sage-soft' : 'bg-pwc-bg-sub border border-pwc-border-light'
                }`}>
                  {msg.text}
                </div>
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-col gap-2 mt-3">
                    {msg.suggestions.map((sug, j) => (
                      <button
                        key={j}
                        onClick={() => sendMessage(sug)}
                        className="text-left text-[13px] text-pwc-text px-4 py-2.5 bg-white border border-pwc-border-light rounded-lg hover:border-pwc-sage hover:bg-pwc-sage-soft transition-colors"
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

          <div className="px-5 py-4 border-t border-pwc-border bg-pwc-bg-sub flex-shrink-0">
            <div className="flex gap-2.5">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage(inputMessage)}
                placeholder="Ask anything..."
                className="flex-1 px-4 py-3 border border-pwc-border-light rounded-lg text-[14px] font-inter outline-none bg-white text-pwc-text placeholder:text-pwc-dimmer focus:border-pwc-sage transition-colors"
              />
              <button
                onClick={() => sendMessage(inputMessage)}
                className="px-5 py-3 bg-pwc-green text-white rounded-lg hover:bg-pwc-green-mid transition-colors"
              >
                <Send size={15} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

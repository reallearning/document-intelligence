"use client"
import React, { useState } from 'react';
import { 
  TrendingUp, Package, MessageSquare, Send, Activity, X, Sparkles, 
  Check, ArrowRight, Eye, AlertTriangle, Target, Calendar, ChevronDown, ChevronUp
} from 'lucide-react';

export default function EmamiDecisionDashboard() {
  const [currentSection, setCurrentSection] = useState('marketpulse');
  const [selectedItems, setSelectedItems] = useState([]);
  const [decisionTrailModal, setDecisionTrailModal] = useState(null);
  const [chatOpen, setChatOpen] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState('');
  const [expandedRows, setExpandedRows] = useState([]);

  const sendMessage = (itemId) => {
    if (!currentMessage.trim()) return;
    setChatMessages(prev => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), 
        { type: 'user', text: currentMessage },
        { type: 'ai', text: 'Based on the market dynamics and execution patterns, let me analyze this scenario.' }
      ]
    }));
    setCurrentMessage('');
  };

  const toggleRow = (idx) => {
    setExpandedRows(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const marketPulseDecisions = [
    {
      id: 'MP-01',
      title: 'Intensify Navratna Distribution in Mumbai-Pune Cooling Theme Clusters',
      decisionQuestion: 'Where do we intensify distribution + activation because a need-state is spiking?',
      trigger: 'Sudden rise in demand signals for "cooling" theme in Mumbai-Pune clusters where Navratna is under-indexed',
      urgency: 'CRITICAL',
      location: 'Mumbai-Pune-Thane Belt',
      product: 'Navratna Cool Oil',
      impact: '₹8.9Cr incremental revenue',
      confidence: 89,
      metrics: {
        'Our Distribution': '28%',
        'Competitor Dist': '54%',
        'OOS Proxy': '18%',
        'Share of Shelf': '3.2 facings'
      },
      what: [
        'Theme spike detected in Mumbai-Pune-Thane clusters (by city-pocket + channel)',
        'Growth sustained over 14 days (not one-day spike) and correlates with early off-take lift in Parachute Advansed'
      ],
      why: [
        'High opportunity clusters show: Navratna at 28% numeric distribution vs Parachute 54% + weak availability (18% OOS proxies) + low share-of-shelf (avg 3.2 facings vs Parachute 6.8)',
        'Parachute is strong in same pockets (high availability + summer cooling campaign presence)'
      ],
      whatNext: [
        { rank: 1, owner: 'Sales', action: 'Push outlet activation list for top 1,200–2,500 outlets (cluster-weighted: Mumbai 850, Thane 620, Pune 580)' },
        { rank: 2, owner: 'Supply', action: 'Reallocate 18,000 units to Turbhe (Mumbai), Chakan (Pune) depots; increase replenishment to daily for top 300 outlets' },
        { rank: 3, owner: 'Trade', action: 'Enable light "cooling defense" scheme only in these clusters (₹3/unit margin support, first 3 orders, guardrails, budget cap ₹5.4L)' },
        { rank: 4, owner: 'Marketing', action: 'Localize creatives to "Mumbai heat" theme - use Marathi language, reference local heat wave in regional cable TV + chemist posters' }
      ],
      whatIf: [
        'What if Parachute increases promo spend by 50% to counter our push?',
        'What if the cooling theme is temporary (weather-driven, ends in 3 weeks)?',
        'What if we can only activate 1,500 outlets instead of 2,500?'
      ],
      reasoning: {
        summary: 'Theme spike ("cooling") up 185% sustained 14+ days in Mumbai-Pune-Thane. Parachute responding with +15% off-take. Our distribution: 28% vs competitor 54%, 18% OOS. Opportunity window: intensify NOW. Distribution +12pts, OOS -8pts, velocity +28% in 2–3 weeks.',
        factors: [
          { name: 'Need-State Momentum', weight: 35, score: 92, reasoning: 'Theme queries up 185% over 14 days. Sustained trend, not spike. Weather-driven (heat wave). Competitors responding. Time-sensitive opportunity window.' },
          { name: 'Distribution Gap vs Competition', weight: 30, score: 88, reasoning: 'Our weighted distribution: 28% vs competitor 54% (26-point gap). Numeric: 850 outlets vs competitor 2,100+. Gap directly causes lost sales.' },
          { name: 'Execution Readiness', weight: 20, score: 85, reasoning: 'Stock available at depots. Distributor capacity confirmed for 2,500-outlet activation over 10 days. Field team has outlet lists.' },
          { name: 'Timing & Opportunity Cost', weight: 15, score: 90, reasoning: 'Window is NOW. Competitors ramping visibility. If we wait 2-3 weeks, shelf space locks for season. Early mover advantage critical.' }
        ]
      },
      decisionTrail: [
        { 
          time: '09:15:22', 
          agent: 'Orchestrator', 
          action: 'Weekly Market Pulse Review Triggered', 
          database: null,
          query: null,
          data: null,
          thinking: 'Initiating weekly market pulse scan across all product categories. Analyzing social listening data, search trends, sales velocity changes, and competitor activity signals. Detecting anomalous pattern in cooling oil category for West region. Theme spike exceeds 150% threshold. Routing to Theme Analytics Agent for deep dive.',
          next: 'Theme Analytics Agent'
        },
        { 
          time: '09:15:48', 
          agent: 'Theme Analytics Agent', 
          action: 'Query Search Trends & Social Listening Signals by Cluster', 
          database: 'market_intelligence',
          query: `SELECT 
  cluster_id,
  cluster_name,
  theme,
  query_volume_14d_avg,
  query_volume_prev_14d_avg,
  pct_change,
  sentiment_score,
  spike_duration_days
FROM theme_tracker 
WHERE brand_category = "cooling_oil" 
  AND region = "West"
  AND date >= DATE_SUB(NOW(), INTERVAL 28 DAY)
  AND pct_change > 100
ORDER BY pct_change DESC`,
          data: { 
            mumbai: { 
              clusterName: 'Mumbai-Thane', 
              volume14d: 14200, 
              volumePrev14d: 5100, 
              change: '+185%', 
              sentiment: 0.78,
              duration: 14
            },
            thane: { 
              clusterName: 'Thane-Navi Mumbai',
              volume14d: 8900, 
              volumePrev14d: 3200, 
              change: '+192%',
              sentiment: 0.81,
              duration: 15
            },
            pune: {
              clusterName: 'Pune East',
              volume14d: 11400,
              volumePrev14d: 4600,
              change: '+178%',
              sentiment: 0.75,
              duration: 13
            }
          },
          thinking: 'Strong sustained spike across 3 major West region clusters. Mumbai +185%, Thane +192%, Pune +178%. Not a one-day anomaly - sustained for 14-15 days. Sentiment scores high (0.75-0.81) indicating genuine need-state, not negative buzz. Weather data confirms heat wave in region (temp 35-38°C). Correlation hypothesis: heat wave driving cooling oil demand. Need to check competitor response and our current positioning.',
          next: 'Competitor Activity Agent'
        },
        { 
          time: '09:16:24', 
          agent: 'Competitor Activity Agent', 
          action: 'Analyze Competitor Promotions & Off-Take in Hot Clusters', 
          database: 'market_intelligence',
          query: `SELECT 
  brand,
  cluster_id,
  promo_intensity_score,
  promo_type,
  offtake_growth_14d,
  shelf_visibility_score,
  price_change_pct
FROM competitor_tracker 
WHERE cluster_id IN ('MUM_THANE', 'PUNE_EAST', 'THANE_NAVI')
  AND brand IN ('Parachute_Advansed', 'Bajaj_Almond', 'Dabur_Amla')
  AND date >= DATE_SUB(NOW(), INTERVAL 14 DAY)`,
          data: {
            parachute: { 
              promoIntensity: 82, 
              promoType: 'Summer Cooling Campaign + 15% extra',
              offtakeGrowth: '+18%', 
              shelfVisibility: 88,
              priceChange: '0%'
            },
            bajaj: { 
              promoIntensity: 45,
              promoType: 'Standard scheme',
              offtakeGrowth: '+12%',
              shelfVisibility: 72,
              priceChange: '0%'
            },
            dabur: {
              promoIntensity: 38,
              promoType: 'No active promo',
              offtakeGrowth: '+8%',
              shelfVisibility: 65,
              priceChange: '0%'
            }
          },
          thinking: 'Parachute Advansed capitalizing on theme spike with coordinated response: High promo intensity (82/100), summer cooling campaign active, shelf visibility ramped to 88/100. Their off-take up 18% (outpacing theme spike). They detected opportunity early and are executing. Bajaj and Dabur showing organic lift (+12%, +8%) but not actively pushing. Competitive threat: Parachute locking shelf space NOW. If we delay, window closes.',
          next: 'Distribution Analytics Agent'
        },
        { 
          time: '09:16:58', 
          agent: 'Distribution Analytics Agent', 
          action: 'Compare Navratna Distribution vs Competitor in Hot Clusters', 
          database: 'sales_ops',
          query: `SELECT 
  cluster_id,
  navratna_numeric_dist_pct,
  navratna_weighted_dist_pct,
  navratna_active_outlets,
  competitor_avg_numeric_dist,
  competitor_active_outlets,
  oos_proxy_pct,
  avg_facings_navratna,
  avg_facings_competitor
FROM cluster_distribution 
WHERE cluster_id IN ('MUM_THANE', 'PUNE_EAST', 'THANE_NAVI')
  AND product_category = 'cooling_oil'`,
          data: {
            mumbai: { 
              ourNumericDist: 28, 
              ourWeightedDist: 32,
              ourOutlets: 850, 
              compAvgNumericDist: 54, 
              compOutlets: 2100, 
              oosProxy: 18,
              ourFacings: 3.2,
              compFacings: 6.8
            },
            pune: { 
              ourNumericDist: 26, 
              ourWeightedDist: 29,
              ourOutlets: 620,
              compAvgNumericDist: 58,
              compOutlets: 1850,
              oosProxy: 22,
              ourFacings: 2.9,
              compFacings: 7.2
            },
            thane: {
              ourNumericDist: 31,
              ourWeightedDist: 34,
              ourOutlets: 580,
              compAvgNumericDist: 52,
              compOutlets: 1680,
              oosProxy: 15,
              ourFacings: 3.5,
              compFacings: 6.5
            }
          },
          thinking: 'Massive distribution gap identified. Mumbai: We have 28% numeric distribution vs competitor average 54% (26-point gap). Our 850 outlets vs competitor 2,100+ outlets. OOS proxy at 18% indicates availability issues. Share of shelf weak: 3.2 facings vs competitor 6.8. Similar pattern across Pune and Thane. This is not a demand problem - this is a DISTRIBUTION problem. Theme spike + competitor strength + our weakness = huge lost opportunity if we don\'t act. Need execution feasibility check.',
          next: 'Supply Chain Agent'
        },
        { 
          time: '09:17:42', 
          agent: 'Supply Chain Agent', 
          action: 'Check Stock Availability & Distribution Capacity', 
          database: 'supply_chain',
          query: `SELECT 
  depot_name,
  cluster_served,
  navratna_current_stock_units,
  navratna_monthly_avg_demand,
  days_of_cover,
  distributor_capacity_outlets_per_week,
  warehouse_space_utilization_pct
FROM depot_inventory 
WHERE cluster_served IN ('MUM_THANE', 'PUNE_EAST', 'THANE_NAVI')
  AND product_line = 'navratna_cool_oil'`,
          data: {
            turbhe: {
              cluster: 'Mumbai-Thane',
              currentStock: 12400,
              monthlyDemand: 8200,
              daysOfCover: 45,
              distributorCapacity: 320,
              warehouseUtil: 68
            },
            chakan: {
              cluster: 'Pune East',
              currentStock: 8900,
              monthlyDemand: 5800,
              daysOfCover: 46,
              distributorCapacity: 240,
              warehouseUtil: 62
            },
            bhiwandi: {
              cluster: 'Thane-Navi Mumbai',
              currentStock: 7200,
              monthlyDemand: 4900,
              daysOfCover: 44,
              distributorCapacity: 180,
              warehouseUtil: 58
            }
          },
          thinking: 'Execution feasibility confirmed. Stock available at all 3 depots (12.4K, 8.9K, 7.2K units). Days of cover: 44-46 days (healthy). Distributor capacity: Turbhe can handle 320 outlets/week, Chakan 240/week, Bhiwandi 180/week. Total capacity: 740 outlets/week. For 2,500-outlet activation, needs ~3.5 weeks at current capacity. Can accelerate with temp field force. Warehouse utilization 58-68% (space available for increased throughput). Green light on supply and distribution capacity. Moving to outlet selection.',
          next: 'Outlet Prioritization Agent'
        },
        { 
          time: '09:18:28', 
          agent: 'Outlet Prioritization Agent', 
          action: 'Generate Target Outlet List for Activation', 
          database: 'sales_ops',
          query: `SELECT 
  outlet_id,
  outlet_type,
  cluster,
  monthly_footfall_score,
  cooling_oil_category_index,
  current_navratna_presence,
  competitor_presence_score,
  route_accessibility_score
FROM outlet_master 
WHERE cluster IN ('MUM_THANE', 'PUNE_EAST', 'THANE_NAVI')
  AND cooling_oil_category_index > 100
  AND current_navratna_presence = 0
  AND outlet_active_status = 'Active'
ORDER BY (monthly_footfall_score * cooling_oil_category_index * route_accessibility_score) DESC
LIMIT 2500`,
          data: {
            summary: {
              totalOutlets: 2480,
              mumbai: 850,
              pune: 620,
              thane: 580,
              chemists: 1488,
              cosmetics: 496,
              kirana: 372,
              modernTrade: 124
            },
            topOutlet: {
              id: 'MUM_CH_08472',
              type: 'Chemist',
              footfall: 94,
              categoryIndex: 168,
              competitorPresence: 88,
              accessibility: 92
            }
          },
          thinking: 'Generated prioritized list of 2,480 outlets (close to 2,500 target). Mumbai: 850 outlets (Chemists 510, Cosmetics 170, Kirana 150, MT 20). Pune: 620 outlets. Thane: 580 outlets. Chemist-heavy (60%) due to cooling oil category index. All outlets: (1) Zero current Navratna presence (greenfield), (2) High cooling oil category index >100, (3) High footfall, (4) Route accessible. Competitor presence high (average 82/100) which validates opportunity. Outlet list ready for field activation. Need financial validation.',
          next: 'Financial Impact Agent'
        },
        { 
          time: '09:19:15', 
          agent: 'Financial Impact Agent', 
          action: 'Calculate ROI & Revenue Impact of Distribution Push', 
          database: 'financial_planning',
          query: `SELECT 
  scenario_name,
  outlets_activated,
  avg_monthly_sale_per_outlet_units,
  avg_selling_price,
  monthly_revenue_incremental,
  annual_revenue_incremental,
  activation_cost,
  stock_allocation_cost,
  scheme_cost,
  marketing_cost,
  total_investment,
  payback_period_months,
  roi_12months
FROM scenario_planner 
WHERE scenario_type = 'distribution_intensification'
  AND region = 'West'`,
          data: {
            conservative: {
              outletsActivated: 2500,
              avgMonthlyUnits: 18,
              asp: 138,
              monthlyRevenue: '₹62.1L',
              annualRevenue: '₹7.45Cr',
              activationCost: '₹12.5L',
              stockCost: '₹18.2L',
              schemeCost: '₹5.4L',
              marketingCost: '₹8.8L',
              totalInvestment: '₹44.9L',
              payback: 7.2,
              roi12m: '2.0x'
            },
            moderate: {
              outletsActivated: 2500,
              avgMonthlyUnits: 24,
              asp: 138,
              monthlyRevenue: '₹82.8L',
              annualRevenue: '₹9.94Cr',
              totalInvestment: '₹44.9L',
              payback: 5.4,
              roi12m: '2.7x'
            },
            optimistic: {
              outletsActivated: 2500,
              avgMonthlyUnits: 32,
              asp: 138,
              monthlyRevenue: '₹110.4L',
              annualRevenue: '₹13.25Cr',
              totalInvestment: '₹44.9L',
              payback: 4.1,
              roi12m: '3.6x'
            }
          },
          thinking: 'Financial case strong across all scenarios. Conservative (18 units/outlet/month): ₹7.45Cr annual revenue, 7.2-month payback, 2.0x ROI. Moderate (24 units): ₹9.94Cr revenue, 5.4-month payback, 2.7x ROI. Optimistic (32 units): ₹13.25Cr revenue, 4.1-month payback, 3.6x ROI. Investment: ₹44.9L (activation + stock + scheme + marketing). Even conservative scenario delivers strong ROI. Upside: If theme spike sustains beyond 3 months (likely given summer season), ROI improves to 4-6x. Risk: Theme collapses in 4 weeks = 1.2x ROI (still positive). Recommendation: Execute.',
          next: 'Decision Engine'
        },
        { 
          time: '09:20:08', 
          agent: 'Decision Engine', 
          action: 'Final Recommendation Synthesis & Confidence Scoring', 
          database: null,
          query: null,
          data: {
            recommendation: 'EXECUTE: Intensify Navratna distribution in Mumbai-Pune-Thane clusters',
            confidence: 89,
            rationale: 'All signals converge positive',
            riskFactors: ['Theme spike duration uncertainty', 'Competitor counter-response'],
            mitigations: ['Phase activation over 3 weeks to monitor performance', 'Budget guardrails on scheme spend']
          },
          thinking: 'Synthesizing all agent inputs for final decision. POSITIVE SIGNALS: (1) Sustained theme spike 14+ days (+185%), (2) Competitor validation (Parachute +18% off-take), (3) Massive distribution gap (28% vs 54%), (4) Stock/capacity available, (5) 2,500 outlets identified, (6) Strong ROI (2.0-3.6x). RISK FACTORS: (1) Theme spike could be weather-driven temporary, (2) Parachute may counter-attack with deeper schemes. CONFIDENCE: 89% - Very high. Recommendation: EXECUTE distribution intensification. Action plan: Activate 2,500 outlets over 3 weeks, reallocate 18K units, light scheme (₹5.4L cap), localized marketing. Expected impact: +12pts distribution, -8pts OOS, +28% velocity in 2-3 weeks. Financial: ₹7.45-13.25Cr incremental revenue depending on scenario.',
          next: null
        }
      ]
    },
    {
      id: 'MP-02',
      title: 'Launch Fast Relief 25g Defense Pack in Bengal-Odisha GT Channel',
      decisionQuestion: 'Do we counter Fast Relief with price-pack, promo, or focus shift?',
      trigger: 'Iodex launches "attack pack" 20g @ ₹65 (vs our 50g @ ₹138) in Bengal-Odisha',
      urgency: 'HIGH',
      location: 'Bengal-Odisha Markets',
      product: 'Fast Relief Pain Ointment',
      impact: 'Stabilize ₹12.4Cr revenue at risk',
      confidence: 87,
      metrics: {
        'Velocity Drop': '-24%',
        'Price Gap': '₹73',
        'Our Price': '₹138',
        'Competitor': '₹65'
      },
      what: [
        'Iodex effective price drops to ₹65 for 20g pack in Bengal-Odisha for pain relief segment',
        'Fast Relief velocity drops 24% in same clusters over 3 weeks (channel-specific: GT impacted most)'
      ],
      why: [
        'Price gap ₹73 (₹138 vs ₹65) exceeds cluster willingness-to-pay. Research shows ₹40-55 acceptable range for trial',
        'Our scheme structure (% off) not competitive for GT channel where absolute rupee savings matter more'
      ],
      whatNext: [
        { rank: 1, owner: 'Trade', action: 'Shift scheme mechanic from % off to "extra grams" - Fast Relief 50g → 65g at same ₹138 price (GT-focused). Brings effective price to ₹2.12/g vs Iodex ₹3.25/g' },
        { rank: 2, owner: 'Category/Brand', action: 'Introduce Fast Relief 25g defense pack @ ₹72 only for attack clusters (avoid nationwide margin burn). Production: 100K units/month' },
        { rank: 3, owner: 'Sales', action: 'Prioritize high-visibility GT outlets (top 800 kirana + chemists) to protect shelf dominance. Ensure 5+ facings minimum' },
        { rank: 4, owner: 'Marketing', action: 'Reinforce Ayurvedic claim differentiation (Fast Relief natural vs Iodex petroleum) via chemist detailing + local language posters' }
      ],
      whatIf: [
        'What if Iodex drops price further to ₹55 after our counter?',
        'What if 25g defense pack cannibalizes our profitable 50g pack?',
        'What if we need to expand defense to 5 more states?'
      ],
      reasoning: {
        summary: 'Competitor attack ₹65 vs our ₹138 (₹73 gap). Velocity -24%. WTP: ₹55 OK, ₹73 breaks decision. Defense: 25g @ ₹72 for GT, extra grams scheme. Stabilizes share, preserves 70% margin.',
        factors: [
          { name: 'Price Psychology', weight: 35, score: 91, reasoning: '₹73 gap (112% premium) vs ₹35 acceptable threshold. Defense pack at ₹72 closes gap without full margin surrender.' },
          { name: 'Channel Dynamics', weight: 30, score: 88, reasoning: 'GT retailers respond to absolute margin/unit. Extra grams maintains margin. One-size-fits-all scheme fails.' },
          { name: 'Geographic Containment', weight: 20, score: 85, reasoning: 'Attack localized to Bengal-Odisha. Containing response prevents nationwide margin burn (₹18Cr vs ₹4.2Cr in attack zone).' },
          { name: 'Competitive Intent', weight: 15, score: 82, reasoning: 'Attack pack economics: Competitors losing ₹8-12/unit at ₹65. This is market share grab, not sustainable. Defense needs 6-9 months hold.' }
        ]
      },
      decisionTrail: []
    }
  ];

  const launchDecisions = [
    {
      id: 'LT-01',
      title: 'Fix Fast Relief 15g Activation List - Shift to Semi-Urban Cohort',
      decisionQuestion: 'Which clusters/outlet cohorts should we push this week for Fast Relief 15g?',
      trigger: 'Distribution at 32% vs 58% plan by week 2 in high-potential UP districts',
      urgency: 'CRITICAL',
      location: 'UP (Gorakhpur, Varanasi, Bareilly, Lucknow)',
      product: 'Fast Relief 15g Sachet @ ₹45',
      impact: 'Catch up to 52% distribution',
      confidence: 91,
      metrics: {
        'Current Dist': '32%',
        'Plan': '58%',
        'Gap': '-26pts',
        'Activated': '1,800 / 2,400'
      },
      what: [
        'Launch live since 2 weeks, but numeric distribution at 32% vs 58% plan in priority UP districts',
        'Same districts show high potential: pain relief category growing 22% annually, competitor Iodex at 48% distribution'
      ],
      why: [
        'Activation list mismatch: Used Pareto approach (top revenue outlets), but Fast Relief 15g targets semi-urban value segment. Wrong outlet types activated',
        'Stock exists at depot (8,200 units at Lucknow depot) but not placed in right chemist/kirana outlets. Distributor service frequency only 1x/week insufficient for launch'
      ],
      whatNext: [
        { rank: 1, owner: 'Sales', action: 'Regenerate outlet activation list: Shift from large chemists to semi-urban chemist + kirana mix (60-40 split). Target 2,400 outlets (not current 1,800). Cohort-based: High pain relief category sale + semi-urban location' },
        { rank: 2, owner: 'Distributor Ops', action: 'Fix placement plan: Each route must carry 15g sachet (minimum 50 units). Set route completion metric = % outlets with stock. Daily SMS alerts to sales team' },
        { rank: 3, owner: 'Supply', action: 'Rebalance stock: Move 3,500 units from Lucknow depot to Gorakhpur (850), Varanasi (920), Bareilly (780) depots. Match stock to outlet density. Complete in 48 hours' }
      ],
      whatIf: [
        'What if regenerated outlet list also fails (product issue, not distribution)?',
        'What if 48-hour stock rebalancing delayed (logistics issues)?',
        'What if competitor Iodex increases distribution in same pockets?'
      ],
      reasoning: {
        summary: 'Distribution 32% vs 58% plan. Causes: Pareto outlet selection (not target cohort), stock at wrong depot, 1x/week service insufficient. Fix: 2,400 better-fit outlets, depot rebalancing, route discipline. Reaches 52% in 7-10 days.',
        factors: [
          { name: 'Outlet Selection Error', weight: 40, score: 89, reasoning: 'Pareto list = top revenue outlets (wrong). Target = semi-urban value segment. 2,400 right-fit outlets identified through cohort analysis.' },
          { name: 'Supply Chain Mismatch', weight: 35, score: 90, reasoning: 'Stock at Lucknow depot but outlets in Gorakhpur, Varanasi, Bareilly. Geography mismatch causes placement delays. Rebalancing fixes in 48 hours.' },
          { name: 'Execution Discipline', weight: 25, score: 85, reasoning: 'No route completion tracking. Distributors prioritize fast-movers. Need minimum stock norms + daily monitoring to ensure launch reaches shelves.' }
        ]
      },
      decisionTrail: []
    }
  ];

  const sections = [
    { id: 'marketpulse', label: 'Market Pulse', icon: TrendingUp, decisions: marketPulseDecisions },
    { id: 'launch', label: 'Launch Tracking', icon: Package, decisions: launchDecisions }
  ];

  const getCurrentDecisions = () => {
    const section = sections.find(s => s.id === currentSection);
    return section?.decisions || [];
  };

  const decisions = getCurrentDecisions();

  const DecisionTrailModal = ({ item }) => {
    if (!item) return null;
    const trails = item.decisionTrail || [];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={() => setDecisionTrailModal(null)}>
        <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[85vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Decision Trail</h3>
              <p className="text-sm text-gray-500 mt-0.5">{item.title}</p>
            </div>
            <button onClick={() => setDecisionTrailModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            {trails.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Decision trail available for select cards.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0" style={{ backgroundColor: '#F5F0E8' }}>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Database</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Query</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thinking</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Next</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {trails.map((entry, idx) => {
                      const isExpanded = expandedRows.includes(idx);
                      const hasData = entry.query || entry.data;
                      
                      return (
                        <React.Fragment key={idx}>
                          <tr className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-xs font-mono text-gray-500">{entry.time}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#85A38320', color: '#85A383' }}>
                                {entry.agent}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm max-w-xs">{entry.action}</td>
                            <td className="px-4 py-3">
                              {entry.database ? (
                                <span className="px-2 py-1 rounded text-xs font-mono bg-gray-100">{entry.database}</span>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {hasData ? (
                                <button onClick={() => toggleRow(idx)} className="text-xs hover:underline flex items-center gap-1" style={{ color: '#85A383' }}>
                                  <Eye className="w-3 h-3" />
                                  View
                                </button>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-600 max-w-lg leading-relaxed">{entry.thinking}</td>
                            <td className="px-4 py-3 text-xs">
                              {entry.next ? (
                                <span className="flex items-center gap-1" style={{ color: '#85A383' }}>
                                  <ArrowRight className="w-3 h-3" />
                                  {entry.next}
                                </span>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                          </tr>
                          {isExpanded && hasData && (
                            <tr>
                              <td colSpan={7} className="px-4 py-4" style={{ backgroundColor: '#F5F0E8' }}>
                                {entry.query && (
                                  <div className="mb-3">
                                    <div className="text-xs font-medium mb-2 text-gray-700">SQL Query:</div>
                                    <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded overflow-x-auto font-mono leading-relaxed">{entry.query}</pre>
                                  </div>
                                )}
                                {entry.data && (
                                  <div>
                                    <div className="text-xs font-medium mb-2 text-gray-700">Data Results:</div>
                                    <pre className="text-xs bg-white border p-4 rounded overflow-x-auto font-mono leading-relaxed">{JSON.stringify(entry.data, null, 2)}</pre>
                                  </div>
                                )}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#85A383' }}>
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Emami</h1>
                <p className="text-xs text-gray-500">Decision Intelligence</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 border-b" style={{ backgroundColor: '#F5F0E8' }}>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>Week of Dec 16-22, 2024</span>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      currentSection === section.id 
                        ? 'text-gray-900' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    style={currentSection === section.id ? { backgroundColor: '#85A38315' } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="flex-1 text-left">{section.label}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: '#85A383' }}>
                      {section.decisions.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {sections.find(s => s.id === currentSection)?.label}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  AI-powered decision cards for GTM execution
                </p>
              </div>
              {selectedItems.length > 0 && (
                <button className="px-4 py-2 text-sm font-medium rounded-lg text-white hover:opacity-90" style={{ backgroundColor: '#85A383' }}>
                  <Check className="w-4 h-4 inline mr-2" />
                  Execute ({selectedItems.length})
                </button>
              )}
            </div>
          </div>

          {/* Decisions */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto space-y-4">
              {decisions.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm" style={{ border: '1px solid #E7DDCA' }}>
                  {/* Top Header - Decision First */}
                  <div className="p-6 border-b" style={{ borderColor: '#E7DDCA' }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => {
                            setSelectedItems(prev =>
                              prev.includes(item.id)
                                ? prev.filter(id => id !== item.id)
                                : [...prev, item.id]
                            );
                          }}
                          className="mt-1.5 w-5 h-5 rounded border-2"
                          style={{ borderColor: '#85A383' }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-mono font-semibold px-2 py-1 rounded-md" style={{ backgroundColor: '#E7DDCA', color: '#666' }}>{item.id}</span>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.urgency === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                              ⚠ {item.urgency}
                            </span>
                            <span className="text-xs text-gray-500">📍 AND {item.location}</span>
                            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#F5F0E8', color: '#666' }}>Week 2</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                          <div className="text-xs text-gray-600 mb-4">
                            Total Impact: <span className="font-semibold text-gray-900">{item.impact}</span>
                            <span className="mx-2">•</span>
                            AI Confidence: <span className="font-semibold" style={{ color: '#85A383' }}>{item.confidence}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => setDecisionTrailModal(item)}
                          className="px-4 py-2 text-sm font-medium rounded-lg border hover:bg-gray-50"
                          style={{ borderColor: '#E7DDCA', color: '#666' }}
                        >
                          <Activity className="w-4 h-4 inline mr-1.5" />
                          Decision Trail
                        </button>
                        <button
                          onClick={() => setChatOpen(chatOpen === item.id ? null : item.id)}
                          className="px-4 py-2 text-sm font-medium rounded-lg text-white hover:opacity-90"
                          style={{ backgroundColor: '#85A383' }}
                        >
                          <MessageSquare className="w-4 h-4 inline mr-1.5" />
                          Ask Morrie
                        </button>
                      </div>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-4 gap-4">
                      {Object.entries(item.metrics).map(([key, value]) => (
                        <div key={key} className="p-3 rounded-lg" style={{ backgroundColor: '#F5F0E8' }}>
                          <div className="text-xs text-gray-500 uppercase mb-1">{key}</div>
                          <div className="text-xl font-semibold text-gray-900">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What/Why/What Next Sections */}
                  <div className="p-6 space-y-4">
                    {/* What - White with Blue Border */}
                    <div className="rounded-2xl p-6 bg-white" style={{ border: '2px solid #3B82F6' }}>
                      <h4 className="text-sm font-bold mb-3" style={{ color: '#1E40AF' }}>WHAT (OBSERVATION)</h4>
                      <ul className="space-y-3">
                        {item.what.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base leading-relaxed text-gray-900">
                            <span className="mt-1.5" style={{ color: '#3B82F6' }}>•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Why - White with Pink Border */}
                    <div className="rounded-2xl p-6 bg-white" style={{ border: '2px solid #EC4899' }}>
                      <h4 className="text-sm font-bold mb-3" style={{ color: '#BE185D' }}>WHY (DIAGNOSIS)</h4>
                      <ul className="space-y-3">
                        {item.why.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-base leading-relaxed text-gray-900">
                            <span className="mt-1.5" style={{ color: '#EC4899' }}>•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What Next - White with Teal Border */}
                    <div className="rounded-2xl p-6 bg-white" style={{ border: '2px solid #14B8A6' }}>
                      <h4 className="text-sm font-bold mb-4" style={{ color: '#0F766E' }}>WHAT NEXT (ACTIONS RANKED)</h4>
                      <div className="space-y-3">
                        {item.whatNext.map((action, idx) => (
                          <div key={idx} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #E7DDCA' }}>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: '#14B8A6' }}>
                              {action.rank}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm text-gray-900 leading-relaxed">
                                <span className="font-semibold text-gray-600">{action.owner}:</span> {action.action}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* What-If Analysis Section */}
                  <div className="px-6 pb-6">
                    <div className="rounded-xl p-5 bg-white" style={{ border: '2px solid #F59E0B' }}>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4" style={{ color: '#D97706' }} />
                        <h4 className="text-sm font-bold uppercase" style={{ color: '#78350F' }}>Start a What-If Analysis</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {item.whatIf.map((scenario, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setChatOpen(item.id);
                              setCurrentMessage(scenario);
                            }}
                            className="text-left text-sm p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-900"
                            style={{ border: '1px solid #FDE68A' }}
                          >
                            "{scenario}"
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Chat */}
                  {chatOpen === item.id && (
                    <div className="px-6 pb-6 border-t pt-6" style={{ borderColor: '#E7DDCA' }}>
                      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                        {(chatMessages[item.id] || []).map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-md px-4 py-2.5 rounded-xl text-sm ${
                              msg.type === 'user' ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                            }`} style={msg.type === 'ai' ? { backgroundColor: '#E7DDCA' } : {}}>
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage(item.id)}
                          placeholder="Ask about scenarios, trade-offs..."
                          className="flex-1 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2"
                          style={{ border: '2px solid #E7DDCA', focusRingColor: '#85A383' }}
                        />
                        <button 
                          onClick={() => sendMessage(item.id)} 
                          className="px-4 py-2.5 rounded-lg text-white hover:opacity-90"
                          style={{ backgroundColor: '#85A383' }}
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Reasoning Breakdown at Bottom */}
                  <div className="border-t" style={{ borderColor: '#E7DDCA' }}>
                    <div className="p-6" style={{ backgroundColor: '#FAFAF8' }}>
                      <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Why This Recommendation</h4>
                      <p className="text-sm text-gray-700 leading-relaxed mb-6 pb-6 border-b" style={{ borderColor: '#E7DDCA' }}>
                        {item.reasoning.summary}
                      </p>
                      
                      <div className="space-y-4">
                        {item.reasoning.factors.map((factor, idx) => (
                          <div key={idx} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 text-right">
                              <div className="text-xs text-gray-500 mb-1">{factor.weight}% weight</div>
                              <div className="text-lg font-bold px-2 py-1 rounded" style={{ backgroundColor: '#85A38320', color: '#85A383' }}>{factor.score}</div>
                            </div>
                            <div className="flex-1 border-l-4 pl-4" style={{ borderColor: '#85A383' }}>
                              <div className="text-sm font-semibold text-gray-900 mb-1.5">{factor.name}</div>
                              <p className="text-xs text-gray-600 leading-relaxed">{factor.reasoning}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {decisionTrailModal && <DecisionTrailModal item={decisionTrailModal} />}
    </>
  );
}
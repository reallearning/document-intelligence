"use client"
import React, { useState } from 'react';
import { 
  Users, Download, Search, MessageSquare, Send, 
  Activity, Settings, Filter, X, Sparkles,
  Check, LayoutDashboard, Target, MapPin, 
  TrendingUp, AlertTriangle, BarChart3, Store,
  Zap, Award, TrendingDown, Calendar, Package
} from 'lucide-react';

export default function CromaBusinessMarketingDashboard() {
  const [currentSection, setCurrentSection] = useState('store-health');
  const [selectedItems, setSelectedItems] = useState([]);
  const [decisionTrailModal, setDecisionTrailModal] = useState(null);
  const [chatOpen, setChatOpen] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState('');

  const sendMessage = (itemId) => {
    if (!currentMessage.trim()) return;
    setChatMessages(prev => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), 
        { type: 'user', text: currentMessage },
        { type: 'ai', text: 'Based on store performance data, I can model scenarios and expected outcomes.' }
      ]
    }));
    setCurrentMessage('');
  };

  // PLACEHOLDER: Full data structures will be populated
  const storeHealthDecisions = [
    {
      id: 'SH001',
      storeName: 'Croma Select City Walk Delhi',
      storeCode: 'DEL_SCW',
      healthStatus: 'RED',
      issue: 'Poor Smartphone Conversion + Excessive Markdowns',
      urgency: 'HIGH',
      rootCause: 'Red due to Staff/Experience + Pricing',
      
      storeKPIs: {
        footfall: '24,500',
        conversion: '8.2%',
        avgTicket: '₹18,400',
        margin: '11.2%',
        markdown: '18%',
        returns: '6.8%'
      },
      
      benchmarks: {
        clusterConv: '14.5%',
        clusterMargin: '15.8%',
        clusterMarkdown: '8.2%'
      },
      
      recommendation: {
        action: '4-Pillar Intervention: Display + Training + Pricing + Vendor Quality',
        reasoning: 'Store has 24.5K footfall but 8.2% conversion (vs 14.5% cluster). Smartphones critical: 4.2% conversion, 24% markdown, 12.4% returns. Root causes: locked displays (8+ min wait), undertrained staff (8mo tenure vs 14mo cluster), excessive discounting (manager discretion), OnePlus/Realme quality issues (18%/15% DOA vs Samsung 2%). 4-pillar intervention targets 12%+ conversion, 12% markdown, 5% returns.',
        confidence: 87,
        impact: '₹2.4Cr revenue recovery, ₹38L margin improvement'
      },
      
      reasoningBreakdown: {
        summary: 'Strong footfall but poor conversion. Root causes: locked displays, undertrained staff, excessive discounting, vendor quality issues.',
        factors: [
          {
            name: 'Display & Experience',
            weight: 30,
            score: 68,
            reasoning: 'Phones locked in cabinets, 8+ min wait time. Customers wait for staff to unlock. Competitors (Apple Store, Samsung Store nearby) have open demos. Need live demo units, charging stations, comparison displays.'
          },
          {
            name: 'Staff Training',
            weight: 30,
            score: 72,
            reasoning: 'Staff 8mo tenure, 4hr training/month vs 14mo, 8hr cluster avg. Default to discount pitches instead of value selling. Flagships require consultative approach. Need product certification program.'
          },
          {
            name: 'Pricing Discipline',
            weight: 25,
            score: 58,
            reasoning: '24% markdown vs 8% cluster. Manager overusing discounts to compensate for poor conversion. Training customers to wait for deals. Need guardrails: max 8% without approval.'
          },
          {
            name: 'Vendor Quality',
            weight: 15,
            score: 65,
            reasoning: 'OnePlus 18% DOA, Realme 15% DOA vs Samsung 2%, Apple 1%. High returns damage store NPS (42 vs cluster 58) and drive warranty costs. Escalate to vendors.'
          }
        ]
      },
      
      interventionPlan: [
        { pillar: 'Display Redesign', timeline: '2 weeks', cost: '₹1.2L', impact: 'Conv: 4.2% → 8.5%' },
        { pillar: 'Staff Training', timeline: '4 weeks', cost: '₹80K', impact: 'Conv: 8.5% → 11%, MD: 24% → 15%' },
        { pillar: 'Pricing Controls', timeline: 'Immediate', cost: '₹0', impact: 'MD: 15% → 12%, Margin +₹28L' },
        { pillar: 'Vendor Quality', timeline: '8 weeks', cost: '₹0', impact: 'Returns: 12.4% → 6%, NPS +12pts' }
      ],
      
      whatIfScenarios: [
        'What if we only fix displays but not staff training?',
        'What if vendors refuse quality escalation?',
        'What if we implement chain-wide (100 stores)?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'SH002',
      storeName: 'Croma Phoenix Pune',
      storeCode: 'PNQ_PHX',
      healthStatus: 'AMBER',
      issue: 'Declining Footfall + Assortment Mismatch',
      urgency: 'MEDIUM',
      rootCause: 'Amber due to Assortment',
      
      storeKPIs: {
        footfall: '18,200',
        footfallTrend: '-15% YoY',
        conversion: '13.8%',
        avgTicket: '₹22,100',
        margin: '14.8%',
        revPerSqFt: '₹10,800'
      },
      
      benchmarks: {
        clusterFootfall: '21,500',
        clusterConv: '14.2%'
      },
      
      recommendation: {
        action: 'Assortment Realignment: Gaming & WFH Focus + Experience Zone',
        reasoning: '15% YoY footfall decline despite healthy 13.8% conversion. Catchment is 40% IT professionals, gaming demand surging (+220% searches), yet store allocates only 8% space to gaming vs 35% to appliances. Reallocate 400 sq ft to Gaming Zone with live demos. Expected: +4,500 monthly visitors, ₹1.8Cr revenue.',
        confidence: 82,
        impact: '₹1.8Cr revenue, +4,500 monthly footfall'
      },
      
      reasoningBreakdown: {
        summary: 'Footfall declining 15% YoY. Catchment: 40% IT professionals, gaming searches +220%, but store allocates 35% to appliances (22% sales) vs 8% gaming (18% sales). Reallocate to Gaming Zone.',
        factors: [
          {
            name: 'Catchment Mismatch',
            weight: 35,
            score: 74,
            reasoning: '5km radius: 40% IT professionals, ₹12.4L median income, 60% aged 25-40. High gaming/WFH demand but current assortment skews to family appliances. Need to match store to audience.'
          },
          {
            name: 'Category Performance Gap',
            weight: 30,
            score: 88,
            reasoning: 'Large appliances: 35% space, 22% sales (-13pt gap). Gaming & WFH: 8% space, 18% sales (+10pt gap). Every 1% space shift from appliances to gaming improves revenue per sq ft.'
          },
          {
            name: 'App Search Intent',
            weight: 20,
            score: 81,
            reasoning: 'Gaming monitors +220% YoY, chairs +180%, keyboards +145%. But search-to-store conversion only 12% (vs 28% TVs). Gap = unmet demand. Need better in-store offering.'
          },
          {
            name: 'Competitive White Space',
            weight: 15,
            score: 85,
            reasoning: 'Mall has gaming arcade (15K visitors/month), co-working spaces (400+ members). No major retailer has gaming zones. First-mover advantage available.'
          }
        ]
      },
      
      interventionPlan: [
        { pillar: 'Space Reallocation', timeline: '3 weeks', cost: '₹8L', impact: 'Gaming: ₹40L → ₹1.2Cr annually' },
        { pillar: 'Experience Zone', timeline: '4 weeks', cost: '₹12L', impact: '+4,500 footfall, dwell +35min' },
        { pillar: 'Community Events', timeline: '6 weeks', cost: '₹2.5L/qtr', impact: '+2,000 visitors, brand building' },
        { pillar: 'Staff Training', timeline: '2 weeks', cost: '₹1.8L', impact: 'Gaming Expert hire, expertise signal' }
      ],
      
      whatIfScenarios: [
        'What if gaming trend is short-term?',
        'What if we can\'t shift appliance allocation?',
        'What if we roll to 5 other IT-hub stores?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'SH003',
      storeName: 'Croma Inorbit Bangalore',
      storeCode: 'BLR_INO',
      healthStatus: 'AMBER',
      issue: 'Strong Conversion but Low Ticket Size',
      urgency: 'MEDIUM',
      rootCause: 'Amber due to Assortment',
      
      storeKPIs: {
        footfall: '28,200',
        conversion: '16.8%',
        avgTicket: '₹12,400',
        margin: '16.2%',
        markdown: '7.8%',
        returns: '2.8%'
      },
      
      benchmarks: {
        clusterConv: '14.5%',
        clusterTicket: '₹18,200'
      },
      
      recommendation: {
        action: 'Premium Assortment Upgrade: Flagships + Audio + Smart Home',
        reasoning: 'Excellent 16.8% conversion but low ₹12.4K ticket (vs ₹18.2K cluster). Catchment affluent: ₹14.2L income, 58% IT professionals. Current mix: 28% budget, 52% mid-range, only 20% premium. Missing: flagship phones, premium audio, smart home. Add 40 premium SKUs, create listening zone. Expected: ₹12.4K → ₹16.8K ticket, +₹2.8Cr revenue.',
        confidence: 84,
        impact: '₹2.8Cr revenue, ticket +35%'
      },
      
      reasoningBreakdown: {
        summary: 'Excellent conversion but low ticket. Catchment affluent but assortment skews mid-range. Add premium categories to leverage existing conversion strength.',
        factors: [
          {
            name: 'Catchment Affluence',
            weight: 35,
            score: 92,
            reasoning: '5km radius: ₹14.2L median income (top 15% Bangalore), 58% IT professionals (Google, Microsoft, Amazon within 5km). Mall has Apple Store, Samsung Flagship. Purchasing power exists but not matched by inventory.'
          },
          {
            name: 'Assortment Gap',
            weight: 30,
            score: 74,
            reasoning: 'Current: Budget 28%, Mid-range 52%, Premium 20%. But catchment suggests: Budget 10%, Mid 35%, Premium 55%. Missing flagship phones, premium audio (Bose, Sony), smart home (Nest, Philips Hue).'
          },
          {
            name: 'Conversion Strength',
            weight: 20,
            score: 88,
            reasoning: '16.8% vs 14.5% cluster (+16% better). Staff can close deals. Problem is basket size not ability to sell. Adding premium assortment leverages existing strength. Historical: strong conversion + premium = 30-40% ticket lift.'
          },
          {
            name: 'Competitive Context',
            weight: 15,
            score: 81,
            reasoning: 'Apple Store in mall does ₹2.2Cr/month vs our ₹1.4Cr despite smaller space. 32% abandon to "check Apple/Samsung first". Need to become one-stop premium destination.'
          }
        ]
      },
      
      interventionPlan: [
        { pillar: 'Premium Assortment', timeline: '2 weeks', cost: '₹18L', impact: 'Ticket: ₹12.4K → ₹16.8K (+35%)' },
        { pillar: 'Audio Listening Zone', timeline: '2 weeks', cost: '₹8L', impact: 'Audio: ₹4L → ₹18L/month (4.5x)' },
        { pillar: 'Smart Home Corner', timeline: '3 weeks', cost: '₹6L', impact: 'New category: ₹0 → ₹12L/month' },
        { pillar: 'Premium Training', timeline: '1 week', cost: '₹1.2L', impact: 'Premium Specialists, white-glove service' }
      ],
      
      whatIfScenarios: [
        'What if premium products don\'t sell?',
        'What if customers still prefer Apple Store?',
        'What if we roll to all 8 Metro A+ stores?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'SH004',
      storeName: 'Croma Forum Mall Bangalore',
      storeCode: 'BLR_FOR',
      healthStatus: 'GREEN',
      issue: 'Healthy Performance - Maintain & Optimize',
      urgency: 'LOW',
      rootCause: 'Green - Benchmark Performance',
      
      storeKPIs: {
        footfall: '26,800',
        conversion: '15.2%',
        avgTicket: '₹19,400',
        margin: '17.1%',
        markdown: '7.2%',
        returns: '2.4%'
      },
      
      benchmarks: {
        clusterConv: '14.5%',
        clusterTicket: '₹18,200',
        clusterMargin: '15.8%'
      },
      
      recommendation: {
        action: 'Maintain Excellence + Test New Concepts',
        reasoning: 'Store performing at/above cluster benchmarks across all metrics. Conversion 15.2% (vs 14.5%), ticket ₹19.4K (vs ₹18.2K), margin 17.1% (vs 15.8%). Use as test bed for new concepts: (1) Self-checkout kiosks, (2) AR try-before-buy for appliances, (3) Same-day delivery promise. Maintain staffing levels, continue quarterly training refreshers.',
        confidence: 88,
        impact: 'Maintain ₹18.2Cr annual, test concepts for chain rollout'
      },
      
      reasoningBreakdown: {
        summary: 'All metrics at or above cluster benchmarks. Healthy store performance. Use as innovation test bed for chain-wide rollout.',
        factors: [
          {
            name: 'Balanced Performance',
            weight: 30,
            score: 92,
            reasoning: 'Conversion 15.2% (vs 14.5% cluster, +0.7pts). Ticket ₹19.4K (vs ₹18.2K, +₹1.2K). Margin 17.1% (vs 15.8%, +1.3pts). No red flags across categories. Balanced, healthy operation.'
          },
          {
            name: 'Staff Quality',
            weight: 25,
            score: 88,
            reasoning: 'Avg staff tenure 18 months (vs 14 cluster), training 10hrs/month (vs 8). Low turnover 22% (vs 35%). Staff engagement scores 82/100. Maintain investment in people.'
          },
          {
            name: 'Assortment Match',
            weight: 25,
            score: 86,
            reasoning: 'Category mix aligns with catchment. Smartphone 32%, TVs 24%, appliances 28%, accessories 16%. Space allocation matches sales contribution. No major gaps identified.'
          },
          {
            name: 'Innovation Readiness',
            weight: 20,
            score: 90,
            reasoning: 'Stable performance = low execution risk. Can test new concepts without disrupting baseline. Tech-savvy catchment (Koramangala) = ideal for AR, self-checkout pilots.'
          }
        ]
      },
      
      interventionPlan: [
        { pillar: 'Self-Checkout Pilot', timeline: '6 weeks', cost: '₹4L', impact: 'Reduce checkout wait 35%, learn for chain' },
        { pillar: 'AR Try-Before-Buy', timeline: '8 weeks', cost: '₹6L', impact: 'Appliance visualization, conversion lift test' },
        { pillar: 'Same-Day Delivery', timeline: '4 weeks', cost: '₹2L setup', impact: 'Compete with Amazon, measure uptake' },
        { pillar: 'Staff Recognition', timeline: 'Ongoing', cost: '₹80K/qtr', impact: 'Maintain morale, reduce turnover' }
      ],
      
      whatIfScenarios: [
        'What if self-checkout cannibalizes staff-assisted sales?',
        'What if AR tech confuses customers?',
        'What if same-day delivery economics don\'t work?'
      ],
      
      decisionTrail: []
    }
  ];

  const regionalAssortmentDecisions = [
    {
      id: 'RA001',
      decision: 'Regional Cooling Strategy: North vs South India',
      region: 'Pan-India',
      category: 'Cooling (AC, Air Coolers, Air Purifiers)',
      urgency: 'HIGH',
      season: 'Pre-Summer (Feb-Mar for Apr-Jun)',
      
      currentState: {
        totalNSV: '₹284Cr',
        northShare: '68%',
        southShare: '22%',
        uniformMix: 'AC 75%, Coolers 20%, Purifiers 5%'
      },
      
      recommendation: {
        action: 'Differentiated Strategy: North 55-40-5, South 90-3-7, West 80-15-5',
        reasoning: 'Current uniform 75-20-5 mix ignores climate/economic differences. North: 45-48°C dry heat + ₹2.8L income + ₹8-9/unit power → coolers economically rational (42% app searches). South: 35-40°C humid + ₹4.2L income + ₹5-6/unit → AC preferred (89% searches). North allocates only 20% to coolers = stockouts. South forces 20% coolers = deadstock. Differentiate: North 55-40-5, South 90-3-7. Expected: ₹18Cr incremental revenue, +24pts sell-through, ₹4.2Cr working capital release.',
        confidence: 91,
        impact: '₹18Cr revenue, +24pts sell-through, ₹4.2Cr capital release'
      },
      
      reasoningBreakdown: {
        summary: 'Uniform mix ignores regional differences. North needs coolers (42% searches, 45-48°C dry, low income). South needs AC (89% searches, 35-40°C humid, higher income). Differentiate regionally.',
        factors: [
          {
            name: 'Climate & Product Effectiveness',
            weight: 30,
            score: 94,
            reasoning: 'North: 45-48°C dry heat (20-30% humidity) perfect for evaporative coolers - can drop temp 8-12°C. South: 35-40°C with 60-80% humidity makes coolers ineffective, can increase perceived heat. Climate fundamentally drives fit.'
          },
          {
            name: 'Economics & Power Cost',
            weight: 30,
            score: 89,
            reasoning: 'North: ₹2.8L income, power ₹8-9/unit. AC costs ₹4,200/month (1.8% income) vs cooler ₹600 (0.26% income) - 7x difference. South: ₹4.2L income, power ₹5-6/unit. AC ₹2,800/month (0.67% income) - easily affordable.'
          },
          {
            name: 'Customer Search Intent',
            weight: 25,
            score: 92,
            reasoning: 'App data (12 months, geo-tagged): North 42% search "air cooler", 38% "AC". South: 89% "AC", 4% "cooler". Search intent = purchase intent. Can\'t inventory against customer preference.'
          },
          {
            name: 'Competitive Dynamics',
            weight: 15,
            score: 87,
            reasoning: 'North: Bajaj/Symphony dominate coolers (60% share), positioned everywhere. Need cooler breadth to compete. South: LG/Samsung/Voltas dominate AC (70% share). Coolers niche/irrelevant.'
          }
        ]
      },
      
      regionalStrategy: [
        { region: 'North (42 stores)', current: 'AC 75%, Cooler 20%', target: 'AC 55%, Cooler 40%', impact: '+₹8.4Cr, cooler ST 68% → 82%' },
        { region: 'South (28 stores)', current: 'AC 75%, Cooler 20%', target: 'AC 90%, Cooler 3%', impact: '+₹9.2Cr, AC ST 78% → 88%, ₹4.2Cr capital freed' },
        { region: 'West (24 stores)', current: 'AC 75%, Cooler 20%', target: 'AC 80%, Cooler 15%', impact: '+₹1.8Cr, balanced approach' }
      ],
      
      whatIfScenarios: [
        'What if North summer is cooler than expected (early monsoon)?',
        'What if power costs drop 30% (government subsidy)?',
        'What if we apply this to heaters for winter?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'RA002',
      decision: 'Gaming Boom in IT Hubs: App Insights → Store Allocation',
      region: 'Bangalore, Pune, Hyderabad IT Clusters',
      category: 'Gaming & WFH Equipment',
      urgency: 'HIGH',
      trend: 'Gaming Surge',
      
      currentState: {
        gamingNSV: '₹2.8Cr (current)',
        appSearches: 'Monitors +220%, Chairs +180%, Keyboards +145%',
        searchToStoreConv: '12% (vs 28% TVs)',
        currentSKUs: '8-10 gaming SKUs vs 60 TV SKUs'
      },
      
      recommendation: {
        action: 'Launch Gaming Zones in 8 IT-Hub Stores with 3x Inventory',
        reasoning: 'App shows gaming explosion: monitors +220%, chairs +180%, keyboards +145%. But only 12% search-to-store conversion (vs 28% TVs) and stores stock 8-10 SKUs. 68% cart abandoners want "see before buy" - experience category. Create Gaming Experience Zones in 8 stores (3 Bangalore, 2 Pune, 2 Hyderabad, 1 Chennai), 3x inventory (8→25 SKUs), live demo setups. Target stores in IT clusters: Whitefield, Koramangala, Hinjewadi, Gachibowli. Expected: 22K incremental monthly visitors, ₹14.2Cr annual gaming revenue (5x current ₹2.8Cr).',
        confidence: 88,
        impact: '₹14.2Cr revenue (5x current), +22K monthly visitors'
      },
      
      reasoningBreakdown: {
        summary: 'Gaming searches exploding but search-to-store only 12%, stores stock 8-10 SKUs. 68% want "see before buy". Launch Gaming Zones in 8 IT-hub stores, 3x inventory, live demos.',
        factors: [
          {
            name: 'App Search Intent',
            weight: 35,
            score: 93,
            reasoning: 'Gaming searches surging: monitors +220%, chairs +180%, keyboards +145%. But search-to-store 12% vs 28% TVs. Gap = unmet demand. Wishlists show 6,440 gaming items across 3 cities. Need better in-store offering.'
          },
          {
            name: 'Experience-Driven Category',
            weight: 30,
            score: 91,
            reasoning: '68% cart abandoners cite "want to see in store" vs 22% phones, 18% TVs. Gaming is high-touch: test chair comfort, see monitor clarity, feel keyboard response. Experience zones convert browsers at 2.5x rate.'
          },
          {
            name: 'Catchment Demographics',
            weight: 20,
            score: 89,
            reasoning: 'Target stores in IT clusters: Bangalore (Whitefield, Koramangala), Pune (Hinjewadi, Kharadi), Hyderabad (Gachibowli, HITEC City). 45% aged 22-35, 60% IT professionals, median income ₹8L+. Perfect gaming demographic.'
          },
          {
            name: 'Competitive White Space',
            weight: 15,
            score: 87,
            reasoning: 'No major retailer has dedicated gaming zones in these clusters. Amazon/Flipkart dominant online but can\'t offer try-before-buy. Gaming cafes exist but don\'t sell hardware. White space opportunity.'
          }
        ]
      },
      
      implementationPhases: [
        { phase: 'Phase 1: Pilot (3 stores)', timeline: '3 months', investment: '₹24L', target: '₹4.2Cr revenue, test & learn' },
        { phase: 'Phase 2: Rollout (5 stores)', timeline: 'Month 4-6', investment: '₹40L', target: '₹10Cr revenue, full network impact' }
      ],
      
      whatIfScenarios: [
        'What if gaming trend is COVID-driven and normalizes?',
        'What if tournaments attract non-buyers?',
        'What if we expand to laptops, consoles, VR?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'RA003',
      decision: 'Washing Machine Regional Preferences: Front-Load vs Semi-Auto',
      region: 'Pan-India',
      category: 'Washing Machines',
      urgency: 'MEDIUM',
      insight: 'Regional Usage Patterns',
      
      currentState: {
        totalWMNSV: '₹186Cr',
        currentMix: 'Front-load 50%, Top-load 35%, Semi-auto 15%',
        issueIdentified: 'Uniform mix ignores regional water availability, income, housing type'
      },
      
      recommendation: {
        action: 'Differentiated WM Strategy by Region: South Front-Load, North Semi-Auto, West Balanced',
        reasoning: 'Current 50-35-15 mix (Front-Top-Semi) doesn\'t match regional usage patterns. South India: Apartments (78% urban), stable water supply, higher income (₹4.2L) → front-load preferred (water efficient, space-saving, better wash). North India: Water scarcity (monsoon-dependent), lower income (₹2.8L), larger homes → semi-auto practical (separate wash/spin, water reuse, lower cost). East: Price-sensitive (₹2.4L income), frequent power cuts → semi-auto dominates (manual operation possible). Recommendation: South 70-25-5 (front-top-semi), North 30-35-35, East 20-30-50. Expected: ₹8.4Cr incremental revenue, WM ST 72% → 84%.',
        confidence: 86,
        impact: '₹8.4Cr revenue, WM ST +12pts'
      },
      
      reasoningBreakdown: {
        summary: 'Uniform mix ignores regional water, income, housing differences. South: apartments + water → front-load. North: water scarcity → semi-auto. East: price-sensitive → semi-auto dominates.',
        factors: [
          {
            name: 'Water Availability & Usage',
            weight: 35,
            score: 91,
            reasoning: 'South: Stable municipal water, Cauvery/Krishna rivers. Front-load uses 50L/cycle vs semi-auto 120L - conservation matters. North: Yamuna depleted, monsoon-dependent, frequent water cuts. Semi-auto allows reuse of wash water for rinse - practical for scarcity.'
          },
          {
            name: 'Housing Type & Space',
            weight: 30,
            score: 88,
            reasoning: 'South: 78% urban live in apartments (vs 52% North). Apartments = space constraints, balcony placement. Front-load compact, stackable, quiet (important for apartments). North: Larger homes, terrace/outdoor space. Semi-auto can sit outside, size not constraint.'
          },
          {
            name: 'Income & Affordability',
            weight: 20,
            score: 84,
            reasoning: 'South median income ₹4.2L, front-load ₹25-35K affordable. North ₹2.8L, semi-auto ₹8-12K fits budget (₹25K is 0.9% income). East ₹2.4L (lowest), semi-auto dominates (0.5% income). Price sensitivity drives down-market in lower-income regions.'
          },
          {
            name: 'Customer Purchase Behavior',
            weight: 15,
            score: 87,
            reasoning: 'In-store observation: South customers ask "Is it water efficient?", "Will it fit in my 2BHK?". North customers ask "Can I reuse rinse water for garden?", "How much does it cost to run?". East customers ask "What if power goes off during cycle?". Different concerns = different products.'
          }
        ]
      },
      
      regionalStrategy: [
        { region: 'South (28 stores)', current: 'Front 50%, Top 35%, Semi 15%', target: 'Front 70%, Top 25%, Semi 5%', rationale: 'Apartments, water, income favor front-load', impact: '+₹4.2Cr' },
        { region: 'North (42 stores)', current: 'Front 50%, Top 35%, Semi 15%', target: 'Front 30%, Top 35%, Semi 35%', rationale: 'Water scarcity, larger homes, price → semi-auto', impact: '+₹3.2Cr' },
        { region: 'East (12 stores)', current: 'Front 50%, Top 35%, Semi 15%', target: 'Front 20%, Top 30%, Semi 50%', rationale: 'Price-sensitive, power cuts → semi-auto dominates', impact: '+₹1.0Cr' }
      ],
      
      whatIfScenarios: [
        'What if South water crisis worsens (Cauvery disputes)?',
        'What if government subsidizes front-load for water conservation?',
        'What if we apply this to refrigerators (single-door vs double-door)?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'RA004',
      decision: 'Diwali Gifting: TVs (North) vs Gold Appliances (South) vs Gadgets (West)',
      region: 'Pan-India',
      category: 'Diwali Festive Season Strategy',
      urgency: 'HIGH',
      season: 'Diwali (Oct 25 - Nov 5)',
      
      currentState: {
        diwaliNSV: '₹420Cr (28% of annual)',
        uniformPromo: 'Same campaign/offers across all regions',
        opportunityCost: 'Regional gifting preferences not capitalized'
      },
      
      recommendation: {
        action: 'Differentiated Diwali Strategy: North TV-First, South Gold Appliances, West Gadget Bundles',
        reasoning: 'Diwali drives 28% annual sales but current uniform campaign misses regional gifting preferences. North India: Diwali = Lakshmi Puja, home upgrades → TVs are #1 Diwali purchase (42% of festive electronics, 2.8x baseline). South India: Gold appliances (mixer-grinders, pressure cookers in gold/copper) are auspicious → 38% of Diwali kitchen purchases. West India: Tech-savvy youth gifting → smartphone + accessories bundles, smartwatches (32% of festive gadgets). Recommendation: North campaign spotlight 55"+ TVs, South spotlight gold/copper appliances, West spotlight gadget bundles. Expected: ₹18Cr incremental Diwali revenue, +15% festive basket size.',
        confidence: 89,
        impact: '₹18Cr Diwali revenue, festive basket +15%'
      },
      
      reasoningBreakdown: {
        summary: 'Uniform Diwali campaign misses regional gifting preferences. North: TVs for home upgrade. South: Gold appliances for auspicious kitchens. West: Gadgets for youth gifting. Differentiate regionally.',
        factors: [
          {
            name: 'Cultural Gifting Traditions',
            weight: 35,
            score: 93,
            reasoning: 'North: Diwali = Lakshmi Puja (wealth goddess) + home upgrades. New TVs considered auspicious, entire families gather to watch. South: Gold/copper associated with prosperity. Gold mixer-grinders, copper-bottom pressure cookers gifted to newlyweds, new homes. West: More secular, youth-oriented. Gadgets (phones, watches, earbuds) popular for cousins, colleagues.'
          },
          {
            name: 'Historical Sales Data',
            weight: 30,
            score: 91,
            reasoning: 'Last 3 Diwalis: North TV sales spike 2.8x baseline (55"+ TVs), 42% of festive electronics. South mixer-grinder/pressure cooker spike 3.2x, 38% of kitchen. West smartphones spike 2.1x, smartwatch/earbuds 2.6x, 32% of gadgets. Regional patterns consistent year-over-year.'
          },
          {
            name: 'App Search & Wishlist Behavior',
            weight: 20,
            score: 88,
            reasoning: 'Diwali season app searches (Sep 15 - Oct 25): North 48% search "TV Diwali offer", 32% "AC". South 42% "mixer grinder gold", 28% "pressure cooker copper". West 38% "smartphone gift", 34% "smartwatch under 10K". Search intent validates purchase behavior.'
          },
          {
            name: 'Basket Composition Analysis',
            weight: 15,
            score: 85,
            reasoning: 'Diwali transactions: North avg basket ₹52K (TV + soundbar/streaming), South ₹28K (3-4 kitchen appliances bundled), West ₹34K (phone + watch + earbuds). Different basket types need different merchandising, bundling, EMI structures.'
          }
        ]
      },
      
      regionalCampaigns: [
        { 
          region: 'North (42 stores)', 
          focus: 'TV-First: "Big Screen Diwali"', 
          creative: 'Family watching together, Lakshmi imagery', 
          offers: '55"+ TVs ₹10K instant discount + soundbar free, 0% EMI',
          expectedLift: '+₹8.2Cr vs uniform campaign'
        },
        { 
          region: 'South (28 stores)', 
          focus: 'Gold Appliances: "Auspicious Kitchen"', 
          creative: 'Gold mixer-grinder, copper pressure cookers, puja thali',
          offers: 'Buy 2 kitchen appliances get 3rd at 50%, gold-finish SKUs highlighted',
          expectedLift: '+₹6.8Cr vs uniform'
        },
        { 
          region: 'West (24 stores)', 
          focus: 'Gadget Bundles: "Gift Tech, Gift Joy"', 
          creative: 'Youth-oriented, sleek product shots, gifting scenarios',
          offers: 'Phone + Watch ₹5K off, Phone + Earbuds + Powerbank ₹3.5K off',
          expectedLift: '+₹3.4Cr vs uniform'
        }
      ],
      
      whatIfScenarios: [
        'What if we unify message for brand consistency (trade-off)?',
        'What if South customers also want TVs (don\'t want to miss)?',
        'What if we apply this to other festivals (Pongal, Holi, Eid)?'
      ],
      
      decisionTrail: []
    }
  ];

  const campaignDecisions = [
    {
      id: 'CT001',
      campaign: 'WFH Pro: Laptops + Monitors + Accessories Bundle',
      audience: 'IT Professionals, Freelancers, Remote Workers',
      urgency: 'HIGH',
      budget: '₹2.8Cr',
      channels: 'App Push, Email, Instagram, LinkedIn',
      
      segmentAnalysis: {
        totalAddressable: '840K users',
        targetSegment: '280K (33%)',
        segmentCriteria: 'Viewed laptops/monitors 3+ times (6 months), 25-45 age, ₹6L+ income, metro cities',
        historicalResponse: 'Tech bundles: 8.2% CTR, 4.1% conversion (vs 3.2% baseline)'
      },
      
      recommendation: {
        action: '3-Tier Bundle Campaign: Essential (₹45K), Pro (₹85K), Premium (₹1.4L)',
        reasoning: 'WFH normalized post-COVID but 62% still hybrid/remote. Target segment: 280K users who viewed laptops/monitors 3+ times but haven\'t purchased. Offer barrier = fragmented shopping (laptop from us, monitor from Amazon, desk from Urban Ladder). Solution: curated bundles with instant savings. Essential: ₹45K laptop + 24" monitor + wireless KB/mouse. Pro: ₹85K laptop + 27" monitor + webcam + noise-canceling headphones. Premium: ₹1.4L laptop + 32" 4K monitor + ergonomic chair + desk lamp. Expected: 4.8% conversion on 280K = 13,440 orders, ₹68Cr revenue, 18% margin = ₹12.2Cr contribution.',
        confidence: 86,
        impact: '₹68Cr revenue, 13.4K orders, ₹12.2Cr contribution'
      },
      
      reasoningBreakdown: {
        summary: '280K users viewed laptops/monitors 3+ times but didn\'t buy. Barrier = fragmented shopping. Offer curated bundles with instant savings. Target conversion 4.8%.',
        factors: [
          {
            name: 'Segment Behavior & Intent',
            weight: 35,
            score: 89,
            reasoning: '280K users viewed laptops (avg 4.2 views) + monitors (avg 3.8 views) but didn\'t convert. 68% also searched "best monitor for laptop", "keyboard mouse combo", "webcam for meetings". High intent, fragmented research = purchase barrier. Bundle simplifies decision.'
          },
          {
            name: 'Historical Bundle Performance',
            weight: 30,
            score: 88,
            reasoning: 'Past tech bundles (Diwali Gaming, Back-to-School) achieved 8.2% CTR (vs 4.1% standalone), 4.1% conversion (vs 3.2%), 22% higher AOV. Bundles work because: simplified choice, perceived savings, convenience. WFH bundles expected similar lift.'
          },
          {
            name: 'Competitive Landscape',
            weight: 20,
            score: 84,
            reasoning: 'Amazon/Flipkart offer bundles but generic ("Frequently bought together"). We can curate based on expertise + offer white-glove setup (Premium tier). Also 0% EMI for 6 months (vs Amazon 3 months). Competitive edge in service + financing.'
          },
          {
            name: 'Cross-Sell Opportunity',
            weight: 15,
            score: 87,
            reasoning: 'WFH customers high-value: avg LTV ₹2.8L (vs ₹1.2L baseline). After setup, they return for printers (42% within 6 months), smart lights (28%), routers (38%). Bundle is entry point to long-term relationship.'
          }
        ]
      },
      
      whatIfScenarios: [
        'What if we add furniture to bundles (desks, chairs)?',
        'What if conversion is 3% instead of 4.8%?',
        'What if we extend to "Gaming Pro" bundles?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'CT002',
      campaign: 'Exchange Fest: Trade Old for New with ₹15K Extra',
      audience: 'Upgraders - Purchased 3-5 Years Ago',
      urgency: 'MEDIUM',
      budget: '₹1.8Cr',
      channels: 'SMS, Email, Retargeting Ads',
      
      segmentAnalysis: {
        totalAddressable: '1.2M past customers',
        targetSegment: '340K (28%)',
        segmentCriteria: 'Purchased TV/fridge/WM 3-5 years ago, no recent purchase, ₹4L+ income',
        averageOldPurchase: '₹32K (2019-2021)',
        expectedUpgrade: '₹58K new purchase'
      },
      
      recommendation: {
        action: 'Exchange Fest with ₹15K Extra Value + Free Pickup + Installation',
        reasoning: '340K customers bought big-ticket items 3-5 years ago (typical upgrade cycle). Currently 0% have exchanged with us = opportunity loss. Barrier: hassle of selling old appliance, unclear value, installation logistics. Solution: Exchange Fest - bring old appliance, get market value + ₹15K extra Croma credit, free pickup/installation. Target categories: TVs (55" 2019 models → 65" 4K/OLED), refrigerators (single-door → frost-free double-door), washing machines (semi-auto → front-load). Expected: 6.2% response on 340K = 21,080 exchanges, ₹122Cr revenue (₹58K avg), ₹15.8Cr margin (12.9% after exchange costs).',
        confidence: 84,
        impact: '₹122Cr revenue, 21K exchanges, ₹15.8Cr contribution'
      },
      
      reasoningBreakdown: {
        summary: '340K customers in 3-5 year upgrade window. Current exchange rate 0% = opportunity loss. Offer ₹15K extra value + convenience. Target 6.2% response = 21K exchanges.',
        factors: [
          {
            name: 'Upgrade Cycle Timing',
            weight: 35,
            score: 91,
            reasoning: '3-5 year window is peak upgrade intent for electronics. TVs: 4K → OLED/8K. Fridges: single-door → inverter double-door. WMs: semi-auto → front-load. Technology improvements create genuine upgrade desire. Historical data: 3-year customers 2.8x more likely to upgrade than 1-year customers.'
          },
          {
            name: 'Exchange Friction Reduction',
            weight: 30,
            score: 86,
            reasoning: 'Current exchange rate 0% vs OLX/Quikr/Facebook Marketplace 18%. Why low? Hassle: find buyer, negotiate, coordinate pickup, installation. Our offer: instant value (market + ₹15K), single visit (pickup old + deliver new), zero hassle. Convenience worth premium.'
          },
          {
            name: 'Margin Economics',
            weight: 20,
            score: 78,
            reasoning: 'Exchange ₹15K subsidy looks expensive but: (1) Old appliance resale value ₹8-12K (refurbish + sell), net cost ₹3-7K. (2) Higher AOV: ₹58K vs ₹42K non-exchange (+38%). (3) Margin on premium products 14-16% vs 11-12% mid-range. Economics work at scale.'
          },
          {
            name: 'Competitive Moat',
            weight: 15,
            score: 82,
            reasoning: 'Amazon/Flipkart offer exchange but logistics weak (partner-dependent, delayed pickups, disputes over valuation). We control entire chain: own logistics, refurbishment unit, resale channel. Better experience = competitive advantage. NPS for exchange customers 68 vs 52 baseline.'
          }
        ]
      },
      
      whatIfScenarios: [
        'What if old appliance resale value drops (refurbishment costs)?',
        'What if response is 4% instead of 6.2%?',
        'What if we extend to smartphones (2-year cycle)?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'CT003',
      campaign: 'First-Time Buyer: Smart TVs Under ₹25K with 0% EMI',
      audience: 'New to Category - Never Purchased TVs',
      urgency: 'MEDIUM',
      budget: '₹1.2Cr',
      channels: 'YouTube Pre-Roll, Facebook Video, App Banners',
      
      segmentAnalysis: {
        totalAddressable: '2.8M app users',
        targetSegment: '680K (24%)',
        segmentCriteria: 'Browsed TVs 2+ times, never purchased electronics from us, 22-35 age, ₹3-5L income',
        intentSignals: 'Searched "best TV under 25K", "smart TV WiFi", viewed 32-43" models'
      },
      
      recommendation: {
        action: 'First-Timer Campaign: Smart TVs ₹15-25K with 6-Month 0% EMI + Free Demo at Home',
        reasoning: '680K users browsed TVs but never purchased electronics from us. Profile: young (22-35), first apartment/home, price-conscious (₹15-25K budget), digital-native (want smart/streaming). Barriers: uncertainty about quality, no brand loyalty, price sensitivity, "can I afford?". Solution: curated selection of 12 best-selling smart TVs ₹15-25K, highlight streaming apps (Netflix, Prime, Disney+), 6-month 0% EMI (₹2.5K/month feels affordable vs ₹25K upfront), free home demo (reduce purchase anxiety). Expected: 3.8% conversion on 680K = 25,840 first-time buyers, ₹52Cr revenue, ₹6.2Cr contribution (12% margin). More importantly: 25K new customers with LTV ₹2.4L = ₹600Cr lifetime potential.',
        confidence: 81,
        impact: '₹52Cr revenue, 25.8K first-timers, ₹600Cr LTV potential'
      },
      
      reasoningBreakdown: {
        summary: '680K browsed TVs but never bought from us. Young, first apartment, price-conscious. Offer curated ₹15-25K smart TVs, 6-month 0% EMI, free home demo. Target 3.8% conversion.',
        factors: [
          {
            name: 'First-Time Buyer Psychology',
            weight: 35,
            score: 86,
            reasoning: 'First electronics purchase = high anxiety. Questions: "Am I overpaying?", "Will it break?", "Do I need 4K?". Need education + reassurance. Our approach: curated selection (remove choice paralysis), clear feature comparison, free demo (try before commit), easy returns. Historical: first-timer campaigns convert at 3.2-4.5% with education focus.'
          },
          {
            name: 'EMI as Affordability Tool',
            weight: 30,
            score: 89,
            reasoning: '₹25K upfront is barrier for ₹3-5L income (0.5-0.8% annual income). But ₹2.5K/month for 6 months feels manageable (0.06% monthly income). EMI unlocks purchase. Historical: 0% EMI campaigns have 2.2x higher conversion than upfront-payment campaigns for this cohort.'
          },
          {
            name: 'Content & Streaming Hook',
            weight: 20,
            score: 88,
            reasoning: 'Target cohort consumes streaming content heavily (4.2 hrs/day avg). Smart TV = gateway to cord-cutting lifestyle. Messaging: "Your Netflix/Prime theater at home" resonates better than "Full HD resolution, 178° viewing angle". Feature-focused = boring. Lifestyle-focused = compelling.'
          },
          {
            name: 'Lifetime Value Play',
            weight: 15,
            score: 84,
            reasoning: 'First electronics purchase = gateway to category expansion. Customers who buy TV return within 18 months for: soundbar (48%), streaming device (32%), gaming console (22%), then laptop (38% in 24 months). First-timer LTV ₹2.4L vs one-time buyer ₹42K. Acquisition cost justified by LTV.'
          }
        ]
      },
      
      whatIfScenarios: [
        'What if EMI default rate is higher than expected?',
        'What if free demo is exploited (no-show buyers)?',
        'What if we extend to refrigerators, washing machines?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'CT004',
      campaign: 'VIP Loyalty: Exclusive Early Access to iPhone 17 Launch',
      audience: 'High-Value Customers - ₹3L+ Spend (2 Years)',
      urgency: 'HIGH',
      budget: '₹80L',
      channels: 'Email, SMS, App Notification, WhatsApp',
      
      segmentAnalysis: {
        totalAddressable: '42K VIP customers',
        targetSegment: '42K (100%)',
        segmentCriteria: '₹3L+ spend (24 months), 3+ purchases, 85+ NPS, avg ₹8.2K/month engagement',
        historicalLTV: '₹8.4L per customer',
        churnRisk: 'Low (12% annual)'
      },
      
      recommendation: {
        action: 'VIP iPhone 17 Launch: 24-Hour Early Access + ₹8K Accessories Credit + Concierge Setup',
        reasoning: '42K VIP customers (₹3L+ spend) drive 28% of revenue but feel under-appreciated (NPS 72 vs 85 potential). iPhone 17 launch (Sep 15) = opportunity to delight. Offer: 24-hour early access (Sep 14 pre-launch), guaranteed stock allocation, ₹8K accessories credit (cases, AirPods, AppleCare), white-glove concierge setup at home/office. VIPs love exclusivity + convenience more than discounts. Expected: 18% take-rate on 42K = 7,560 iPhone sales, ₹75Cr revenue (₹99K avg), but more importantly: NPS boost to 88, churn reduction 12% → 6%, LTV extension ₹8.4L → ₹10.2L per customer = ₹75Cr incremental LTV across cohort.',
        confidence: 88,
        impact: '₹75Cr revenue, NPS +16pts, churn -50%, ₹75Cr LTV gain'
      },
      
      reasoningBreakdown: {
        summary: '42K VIPs drive 28% revenue but NPS 72 (under-realized). iPhone launch = exclusivity opportunity. Offer early access, guaranteed stock, ₹8K accessories, concierge. Target 18% take-rate = 7,560 sales.',
        factors: [
          {
            name: 'VIP Psychology & Exclusivity',
            weight: 35,
            score: 92,
            reasoning: 'VIPs don\'t need discounts (₹3L+ spend = affluent). They value: early access, guarantee (no sold-out frustration), recognition, convenience. Apple Store limits stock, creates FOMO. We can guarantee stock for VIPs = powerful value prop. Historical: exclusive launches have 2.5x higher NPS than discount campaigns for this cohort.'
          },
          {
            name: 'Churn Risk Mitigation',
            weight: 30,
            score: 89,
            reasoning: 'VIP churn 12% annually = ₹42Cr revenue loss. Exit interviews: "didn\'t feel valued", "Amazon faster", "Apple Store better experience". This campaign addresses all three: feel valued (exclusive access), faster (pre-launch), better experience (concierge). Expected churn reduction 12% → 6% = ₹21Cr retained revenue annually.'
          },
          {
            name: 'Halo Effect on Category',
            weight: 20,
            score: 87,
            reasoning: 'iPhone buyers purchase ₹28K accessories within 6 months (cases, AirPods, chargers, AppleCare). Our ₹8K credit ensures we capture accessory spend vs Amazon/Apple. Also, iPhone buyers return for Apple Watch (42%), iPad (28%), MacBook (18%) within 18 months. Gateway product.'
          },
          {
            name: 'Word-of-Mouth Amplification',
            weight: 15,
            score: 91,
            reasoning: 'VIPs are influencers in social circles. "I got iPhone 17 a day early through Croma VIP" = powerful social proof. Referral rate from VIPs 3.8x higher than baseline. Expected: 2,200 referrals from 7,560 buyers = ₹18Cr incremental revenue. WOM ROI often exceeds campaign ROI.'
          }
        ]
      },
      
      whatIfScenarios: [
        'What if Apple limits our stock allocation?',
        'What if take-rate is 12% instead of 18%?',
        'What if we extend VIP perks year-round (quarterly exclusives)?'
      ],
      
      decisionTrail: []
    }
  ];
  const portfolioDecisions = [
    {
      id: 'PS001',
      decision: 'OnePlus Portfolio Rationalization: Cut Underperforming Models',
      category: 'Smartphones - OnePlus Brand',
      urgency: 'HIGH',
      status: 'Rationalize',
      
      currentState: {
        totalSKUs: '18 OnePlus models',
        totalNSV: '₹142Cr annually',
        margin: '8.2% (vs 12.8% Samsung, 14.2% Apple)',
        returns: '18% DOA (vs 2.4% Samsung)',
        inventoryDays: '68 days (vs 42 cluster avg)'
      },
      
      recommendation: {
        action: 'Cut 12 SKUs to 6 Core Models: Nord 4, 12, 12 Pro, Open, Pad (Kill 67% of portfolio)',
        reasoning: 'OnePlus 18 SKUs drive ₹142Cr but only 8.2% margin (vs 12.8% Samsung). Problem: too many models cannibalize each other, confuse customers, tie up inventory. Top 6 SKUs drive 78% of revenue but only 33% of SKUs. Long tail (12 SKUs) drives 22% revenue but 58% of service costs (high DOA, warranty claims). Recommendation: Kill 12 models, focus on 6 core (Nord 4 budget, 12/12 Pro mid-range, Open flagship, Pad tablet). Free up ₹28Cr working capital (68→42 inventory days), reduce service costs ₹4.2Cr, improve margin 8.2%→11.8%. Accept ₹8Cr revenue loss (long tail) for ₹18Cr contribution gain.',
        confidence: 88,
        impact: '₹28Cr capital freed, margin +3.6pts, -₹8Cr revenue (accept)'
      },
      
      reasoningBreakdown: {
        summary: 'OnePlus 18 SKUs, top 6 drive 78% revenue. Long tail (12 SKUs) = 22% revenue, 58% service costs. Cut to 6 core models, free capital, improve margin.',
        factors: [
          {
            name: 'SKU Proliferation & Cannibalization',
            weight: 35,
            score: 82,
            reasoning: '18 SKUs create choice paralysis for customers + cannibalization. Example: Nord CE 3, Nord CE 3 Lite, Nord 3 all priced ₹22-28K, nearly identical specs. Customers confused, delay purchase. Staff spend 18 mins explaining differences (vs 8 mins Samsung). Rationalize to Nord 4 only = clearer positioning.'
          },
          {
            name: 'Quality & Returns Issue',
            weight: 30,
            score: 74,
            reasoning: '18% DOA rate (vs 2.4% Samsung) driven by mid-tier models (Nord CE series, older flagships). High returns = warranty costs ₹6.8Cr, NPS damage (38 vs 58 cluster). Top 6 models have 8% DOA (better but still high). Kill worst offenders, improve quality focus.'
          },
          {
            name: 'Working Capital Efficiency',
            weight: 20,
            score: 86,
            reasoning: '18 SKUs across 100 stores = 1,800 inventory positions. 68 days inventory (vs 42 cluster) = ₹28Cr tied up. Rationalize to 6 SKUs = 600 positions, 42 days inventory. Free ₹28Cr to redeploy to Samsung/Apple (higher margin).'
          },
          {
            name: 'Vendor Negotiation Leverage',
            weight: 15,
            score: 79,
            reasoning: 'OnePlus knows we stock 18 models = committed partner. But commitment hasn\'t earned better terms. Threat of rationalization = negotiation leverage. "We cut to 6 unless you improve: (1) margin to 11.5%+, (2) DOA to <10%, (3) marketing co-op ₹2Cr." Credible threat improves terms.'
          }
        ]
      },
      
      portfolioAction: [
        { action: 'KEEP (6 SKUs)', models: 'Nord 4, 12, 12 Pro, Open, Pad, Buds Pro 2', revenue: '₹110Cr (78%)', rationale: 'Clear positioning, lower DOA, brand halo' },
        { action: 'KILL (12 SKUs)', models: 'Nord CE 3, CE 3 Lite, Nord 3, 11, 11R, 10 Pro, 10T, 10R, 9, 9RT, Nord Watch, Buds Z2', revenue: '₹32Cr (22%)', rationale: 'Cannibalization, high DOA, inventory drag' }
      ],
      
      whatIfScenarios: [
        'What if OnePlus refuses to improve terms?',
        'What if rationalization costs customer loyalty?',
        'What if we apply this to other brands (Realme, Vivo)?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'PS002',
      decision: 'Premium Audio Expansion: Bose, Sony, Sennheiser Growth',
      category: 'Audio - Premium Segment',
      urgency: 'HIGH',
      status: 'Grow',
      
      currentState: {
        premiumAudioNSV: '₹18Cr (current)',
        totalAudioNSV: '₹124Cr',
        premiumShare: '14.5% (vs 38% market avg)',
        skuCount: '22 premium SKUs (vs 180 budget SKUs)',
        margin: '22% premium vs 8% budget'
      },
      
      recommendation: {
        action: 'Triple Premium Audio Investment: ₹18Cr → ₹58Cr with Listening Zones + Expert Staff',
        reasoning: 'Premium audio only 14.5% of our ₹124Cr audio business (vs 38% market). Why underindexed? (1) Limited SKUs: 22 premium vs 180 budget = selection gap. (2) No experience zones: premium audio needs trial (sound quality subjective). (3) Untrained staff: can\'t articulate Bose QuietComfort vs Sony WH-1000XM5 differences. (4) Prime catchment untapped: our stores in affluent areas (median income ₹8.2L) but selling budget ₹2-4K earbuds. Recommendation: Expand SKUs 22→65, create listening zones in 12 flagship stores, hire 24 Audio Specialists, stock Bose 700, Sony XM5, Sennheiser Momentum, B&O. Expected: ₹18Cr → ₹58Cr revenue (+222%), 22% margin = ₹12.8Cr contribution (vs ₹4Cr current), NPS 82 (vs 58 budget audio).',
        confidence: 91,
        impact: '₹40Cr incremental revenue, ₹8.8Cr margin gain, NPS +24pts'
      },
      
      reasoningBreakdown: {
        summary: 'Premium audio 14.5% vs 38% market = underpenetrated. Barriers: limited SKUs, no experience zones, untrained staff. Expand 3x with listening zones + experts. Target ₹58Cr (+222%).',
        factors: [
          {
            name: 'Catchment-Assortment Mismatch',
            weight: 35,
            score: 93,
            reasoning: 'Flagship stores (Whitefield, Koramangala, Inorbit, Select City Walk) in affluent areas: ₹8.2L median income, 58% IT professionals, 42% own Apple products. But we stock 180 budget SKUs (₹2-4K) vs 22 premium (₹15-40K). Catchment wants Bose/Sony, we push boAt/Noise. Gap = ₹40Cr opportunity.'
          },
          {
            name: 'Experience-Driven Category',
            weight: 30,
            score: 89,
            reasoning: 'Audio is subjective - sound signature, noise cancellation effectiveness, comfort vary by ear shape. Can\'t buy ₹28K headphones without trying. Apple Store has listening bar, Sony has sound rooms, we have locked cabinets. Create 12 listening zones with sound isolation, A/B comparison setups. Expected: 3.2x conversion vs non-experience stores.'
          },
          {
            name: 'Margin Opportunity',
            weight: 20,
            score: 88,
            reasoning: 'Premium audio 22% margin (vs 8% budget). Why? Brand strength (Bose, Sony), lower price sensitivity (₹28K buyer doesn\'t haggle like ₹2K buyer), vendor support (40% co-op marketing). ₹40Cr revenue at 22% = ₹8.8Cr margin vs ₹40Cr budget audio at 8% = ₹3.2Cr. 2.75x margin for same revenue.'
          },
          {
            name: 'Halo Effect on Brand',
            weight: 15,
            score: 87,
            reasoning: 'Premium audio customers are brand ambassadors. Word-of-mouth: "I tried 5 headphones at Croma listening zone" = powerful referral. Also, premium audio buyers return for speakers (52%), soundbars (38%), turntables (18%). Gateway to broader premium electronics relationship.'
          }
        ]
      },
      
      expansionPlan: [
        { phase: 'SKU Expansion', timeline: '2 months', investment: '₹8Cr', action: 'Add 43 SKUs: Bose 700, Sony XM5, Sennheiser Momentum 4, B&O H95, Master & Dynamic MW75' },
        { phase: 'Listening Zones', timeline: '3 months', investment: '₹18Cr', action: '12 flagship stores, sound-isolated rooms, A/B comparison setups, acoustic treatment' },
        { phase: 'Expert Hiring', timeline: '1 month', investment: '₹2.4Cr/yr', action: '24 Audio Specialists (2 per store), Bose/Sony certification, 40hrs training' },
        { phase: 'Marketing Co-Op', timeline: 'Ongoing', investment: '₹4Cr/yr', action: 'Vendor-funded demos, listening events, audiophile community building' }
      ],
      
      whatIfScenarios: [
        'What if premium audio trend is COVID-driven and normalizes?',
        'What if listening zones are underutilized?',
        'What if we expand to turntables, vinyl (audiophile ecosystem)?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'PS003',
      decision: 'Large Appliances: Maintain Leadership, Optimize Mix',
      category: 'Refrigerators, Washing Machines, ACs',
      urgency: 'MEDIUM',
      status: 'Maintain',
      
      currentState: {
        appliancesNSV: '₹680Cr (38% of total)',
        margin: '14.2%',
        marketShare: '#2 (18.4% vs Reliance Digital 22%, Vijay Sales 12%)',
        customerSat: 'NPS 68'
      },
      
      recommendation: {
        action: 'Maintain Category Leadership: Optimize Mix (Inverter/Smart), Service Excellence, Prevent Margin Erosion',
        reasoning: 'Appliances drive ₹680Cr (38% of business), healthy 14.2% margin, strong NPS 68. Don\'t break what\'s working. But maintain requires active defense: (1) Mix shift to inverter/smart (currently 42% inverter vs 65% market, margin drag). (2) Installation excellence (12% installation complaints = NPS killer). (3) Prevent Amazon encroachment (delivering refrigerators in 24hrs now). Actions: Shift mix 42%→60% inverter (₹4.8Cr margin gain), reduce installation time 72hrs→24hrs (match Amazon), create Smart Home bundles (fridge + AC + WM with unified app control). Expected: maintain ₹680Cr, margin 14.2%→15.8% (+1.6pts), NPS 68→74.',
        confidence: 86,
        impact: 'Maintain ₹680Cr, margin +1.6pts, NPS +6pts, defend share'
      },
      
      reasoningBreakdown: {
        summary: 'Appliances ₹680Cr, 14.2% margin, NPS 68 = healthy. Maintain = active defense. Shift to inverter, improve installation, counter Amazon. Maintain revenue, improve margin 1.6pts.',
        factors: [
          {
            name: 'Category Health & Scale',
            weight: 30,
            score: 88,
            reasoning: 'Appliances are core: 38% of revenue, 32% of margin dollars. Market share #2 (18.4%), growing +8% YoY vs market +6%. Healthy business doesn\'t need disruption. Focus on optimization not transformation.'
          },
          {
            name: 'Inverter/Smart Mix Shift',
            weight: 30,
            score: 82,
            reasoning: 'Currently 42% inverter (vs 65% market) = lagging. Inverter margin 16.2% vs non-inverter 12.8% = +3.4pts. Customer preference shifted: 78% search "inverter refrigerator", 68% "inverter AC". We\'re under-allocating to customer demand + leaving margin on table. Shift 42%→60% = ₹4.8Cr margin gain.'
          },
          {
            name: 'Installation as Differentiation',
            weight: 25,
            score: 76,
            reasoning: 'Amazon now delivers refrigerators in 24hrs (warehouse expansion). Our avg: 72hrs. Installation complaints 12% of NPS detractors. Appliances aren\'t appliances until installed. Match Amazon speed (24hrs), improve quality (certified installers, 95% first-time-right vs 82%). Installation = competitive moat if done right.'
          },
          {
            name: 'Margin Erosion Risk',
            weight: 15,
            score: 84,
            reasoning: 'Margin 14.2% stable but pressured: Amazon discounting, vendor demands (rebate reductions), EMI costs rising. Without active defense, margin drifts to 12.8% = ₹9.5Cr loss. Actions: shift to higher-margin inverter, reduce EMI subsidy (tighten credit), negotiate better vendor terms. Maintain requires fighting entropy.'
          }
        ]
      },
      
      maintenanceActions: [
        { action: 'Inverter Mix Shift', target: '42% → 60% inverter allocation', timeline: '6 months', impact: '+₹4.8Cr margin' },
        { action: 'Installation Excellence', target: '24hr delivery, 95% FTR', timeline: '3 months', impact: 'NPS +6pts, reduce complaints' },
        { action: 'Smart Home Bundles', target: 'Fridge + AC + WM unified control', timeline: '4 months', impact: '+₹12Cr cross-sell, differentiation' },
        { action: 'Vendor Renegotiation', target: 'Rebate +1.2pts, co-op +₹2.8Cr', timeline: '2 months', impact: 'Margin +1.2pts' }
      ],
      
      whatIfScenarios: [
        'What if Amazon subsidizes appliance delivery aggressively?',
        'What if inverter premium erodes (commoditization)?',
        'What if we lose market share to Reliance Digital?'
      ],
      
      decisionTrail: []
    },
    {
      id: 'PS004',
      decision: 'Budget Smartwatch Rationalization: Cut boAt, Noise, Fire-Boltt',
      category: 'Wearables - Budget Segment',
      urgency: 'MEDIUM',
      status: 'Rationalize',
      
      currentState: {
        budgetWatchNSV: '₹24Cr',
        skuCount: '68 SKUs (boAt, Noise, Fire-Boltt, Fastrack)',
        margin: '6.2% (vs 18% Apple Watch)',
        returns: '22% (vs 4% Apple Watch)',
        inventoryDays: '82 days (vs 28 Apple Watch)'
      },
      
      recommendation: {
        action: 'Rationalize Budget Watches: Cut 68→20 SKUs, Focus on Apple Watch + Samsung Galaxy',
        reasoning: 'Budget smartwatches (boAt, Noise, Fire-Boltt) drive ₹24Cr but destroy value: 6.2% margin (vs 18% Apple), 22% returns (quality issues), 82 days inventory (slow-moving). Staff spend disproportionate time on ₹2K watches vs ₹35K Apple Watches. Problem: commodity category, 68 SKUs with minimal differentiation (all have heart rate, step counter, cheap displays). Recommendation: Cut 68→20 SKUs (keep top 5 boAt, top 3 each Noise/Fire-Boltt/Fastrack), reallocate space/capital to Apple Watch + Samsung Galaxy (18% margin, 4% returns, 28 days inventory). Accept ₹6Cr revenue loss (budget watches) for ₹8.4Cr contribution gain (premium watches). Free ₹12Cr working capital.',
        confidence: 84,
        impact: '-₹6Cr revenue (accept), +₹8.4Cr margin, ₹12Cr capital freed'
      },
      
      reasoningBreakdown: {
        summary: 'Budget watches 68 SKUs, ₹24Cr revenue but 6.2% margin, 22% returns, 82 days inventory = value destruction. Cut to 20 SKUs, reallocate to Apple/Samsung. Accept ₹6Cr loss for ₹8.4Cr gain.',
        factors: [
          {
            name: 'Margin Destruction',
            weight: 35,
            score: 78,
            reasoning: 'Budget watches 6.2% margin (vs 18% Apple, 14% Samsung). Why so low? (1) Price wars: boAt ₹2K → Noise ₹1.8K → Fire-Boltt ₹1.5K. (2) No brand loyalty: customers switch for ₹200 discount. (3) Vendor squeeze: "match Amazon price or we pull". Economics don\'t work. ₹24Cr × 6.2% = ₹1.5Cr vs ₹18Cr × 18% = ₹3.2Cr. Premium is 2.1x more profitable per rupee.'
          },
          {
            name: 'Quality & Returns Crisis',
            weight: 30,
            score: 72,
            reasoning: '22% returns (vs 4% Apple) driven by: touch screen failures, battery drain, strap breakage, software bugs. Returns cost ₹5.2Cr (processing, shipping, refurbishment, disposal). Net margin 6.2% - 21.7% returns cost = -15.5% = losing money on every unit after returns. Unsustainable.'
          },
          {
            name: 'Staff Time Misallocation',
            weight: 20,
            score: 81,
            reasoning: 'Staff spend 40% of time on wearables but they drive only 12% of revenue. Why? 68 SKUs = explaining differences, comparing specs, handling returns. Time is zero-sum: 40% on wearables = not helping ₹1.2L laptop buyer or ₹85K fridge buyer. Rationalize = free staff for high-value customers.'
          },
          {
            name: 'Working Capital Trap',
            weight: 15,
            score: 86,
            reasoning: '68 SKUs × 100 stores = 6,800 inventory positions. Many don\'t move: 82 days inventory vs 42 cluster avg. ₹12Cr tied up in slow-moving watches that earn 6.2%. Could redeploy ₹12Cr to Apple Watch (18% margin, 28 days inventory). Opportunity cost of capital.'
          }
        ]
      },
      
      rationalizationPlan: [
        { action: 'CUT (48 SKUs)', brands: 'boAt (32 SKUs → 5), Noise (18 → 3), Fire-Boltt (14 → 3), Fastrack (4 → 1)', impact: '-₹14Cr revenue, -₹12Cr inventory capital' },
        { action: 'KEEP (20 SKUs)', brands: 'Top 5 boAt, top 3 each Noise/Fire-Boltt, Fastrack 1', impact: '₹10Cr revenue, focused assortment' },
        { action: 'REALLOCATE', opportunity: 'Freed capital → Apple Watch Series 9, SE, Ultra + Samsung Galaxy Watch 6', impact: '+₹20Cr revenue, 18% margin, ₹12Cr capital redeployed' }
      ],
      
      whatIfScenarios: [
        'What if budget watch buyers don\'t trade up to Apple/Samsung?',
        'What if vendors retaliate (pull other categories)?',
        'What if we apply this to budget earbuds (similar dynamics)?'
      ],
      
      decisionTrail: []
    }
  ];

  const navigationTabs = [
    { id: 'store-health', label: 'Store Health', icon: AlertTriangle, count: storeHealthDecisions.length },
    { id: 'regional-assortment', label: 'Regional Assortment', icon: MapPin, count: regionalAssortmentDecisions.length },
    { id: 'campaign-targeting', label: 'Campaigns', icon: Target, count: campaignDecisions.length },
    { id: 'portfolio-strategy', label: 'Portfolio', icon: TrendingUp, count: portfolioDecisions.length }
  ];

  const getCurrentDecisions = () => {
    if (currentSection === 'store-health') return storeHealthDecisions;
    if (currentSection === 'regional-assortment') return regionalAssortmentDecisions;
    if (currentSection === 'campaign-targeting') return campaignDecisions;
    if (currentSection === 'portfolio-strategy') return portfolioDecisions;
    return [];
  };

  const decisions = getCurrentDecisions();

  const DecisionTrailModal = ({ item }) => {
    if (!item) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[80vh] overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-medium">Decision Trail</h3>
            <button onClick={() => setDecisionTrailModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-center py-12">
              <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Decision trail available once analysis complete.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-auto bg-gray-50">
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#85A383' }}>
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">CROMA</h1>
              <p className="text-xs text-gray-500">Business & Marketing</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navigationTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentSection(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                  currentSection === tab.id ? 'text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={currentSection === tab.id ? { backgroundColor: '#85A38315' } : {}}
              >
                <tab.icon className="w-4 h-4" />
                <span className="flex-1 text-left text-xs">{tab.label}</span>
                {tab.count > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: '#85A383' }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">
                {navigationTabs.find(t => t.id === currentSection)?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                System-level decisions on stores, regions, audiences, and campaigns
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 inline mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            {decisions.length === 0 ? (
              <div className="bg-white rounded-xl border p-12 text-center" style={{ borderColor: '#E7DDCA' }}>
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No Decisions Yet</h3>
                <p className="text-sm text-gray-500">Decisions will appear once analysis is complete.</p>
              </div>
            ) : (
              decisions.map(item => (
                <div key={item.id} className="bg-white rounded-xl border" style={{ borderColor: '#E7DDCA' }}>
                  <div className="p-6 border-b" style={{ borderColor: '#E7DDCA' }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium">{item.storeName || item.decision || item.campaign}</h3>
                          {item.healthStatus && (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.healthStatus === 'RED' ? 'bg-red-100 text-red-700' :
                              item.healthStatus === 'AMBER' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {item.healthStatus}
                            </span>
                          )}
                          {item.urgency && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                              ⚠ {item.urgency}
                            </span>
                          )}
                        </div>
                        {item.issue && <div className="text-sm text-gray-700 font-medium mb-2">{item.issue}</div>}
                        {item.audience && <div className="text-sm text-gray-700 font-medium mb-2">Target: {item.audience}</div>}
                        {item.category && !item.issue && <div className="text-sm text-gray-700 font-medium mb-2">{item.category}</div>}
                        {item.rootCause && (
                          <div className="text-xs px-2 py-1 rounded inline-block" style={{ backgroundColor: '#E7DDCA' }}>
                            {item.rootCause}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setDecisionTrailModal(item)}
                          className="px-4 py-2 text-sm font-medium border-2 rounded-lg"
                          style={{ borderColor: '#85A383', color: '#85A383' }}
                        >
                          <Activity className="w-4 h-4 inline mr-2" />
                          Trail
                        </button>
                        <button
                          onClick={() => setChatOpen(chatOpen === item.id ? null : item.id)}
                          className="px-4 py-2 text-sm font-medium rounded-lg text-white"
                          style={{ backgroundColor: '#85A383' }}
                        >
                          <MessageSquare className="w-4 h-4 inline mr-2" />
                          Ask Morrie
                        </button>
                      </div>
                    </div>
                  </div>

                  {item.storeKPIs && (
                    <div className="px-6 py-4 grid grid-cols-6 gap-4" style={{ backgroundColor: '#F5F0E8' }}>
                      {Object.entries(item.storeKPIs).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-xs text-gray-500 mb-1 uppercase">{key}</div>
                          <div className="text-lg font-medium">{value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.benchmarks && (
                    <div className="px-6 py-3 border-b flex gap-6 text-sm" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                      {Object.entries(item.benchmarks).map(([key, value]) => (
                        <span key={key} className="text-gray-600">
                          {key}: <span className="font-medium">{value}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Campaign-specific fields */}
                  {item.audience && (
                    <div className="px-6 py-3 border-b" style={{ borderColor: '#E7DDCA', backgroundColor: '#F5F0E8' }}>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Target Audience: </span>
                          <span className="font-medium">{item.audience}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Budget: </span>
                          <span className="font-medium">{item.budget}</span>
                        </div>
                        {item.channels && (
                          <div className="col-span-2">
                            <span className="text-gray-600">Channels: </span>
                            <span className="font-medium">{item.channels}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {item.segmentAnalysis && (
                    <div className="px-6 py-4 border-b" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                      <h4 className="text-xs font-medium text-gray-900 mb-3 uppercase">Segment Analysis</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {Object.entries(item.segmentAnalysis).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-xs text-gray-500 mb-1">{key}</div>
                            <div className="font-medium">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Portfolio-specific fields */}
                  {item.status && (
                    <div className="px-6 py-3 border-b flex gap-6 text-sm" style={{ borderColor: '#E7DDCA', backgroundColor: '#F5F0E8' }}>
                      <div>
                        <span className="text-gray-600">Category: </span>
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Strategy: </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Grow' ? 'bg-green-100 text-green-700' :
                          item.status === 'Maintain' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  )}

                  {item.currentState && !item.segmentAnalysis && (
                    <div className="px-6 py-4 border-b" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                      <h4 className="text-xs font-medium text-gray-900 mb-3 uppercase">Current State</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {Object.entries(item.currentState).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-xs text-gray-500 mb-1">{key}</div>
                            <div className="font-medium">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="px-6 py-3 border-b flex justify-between" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                    <div className="text-sm text-gray-600">
                      Impact: <span className="font-medium">{item.recommendation.impact}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      Confidence: <span className="font-medium" style={{ color: '#85A383' }}>{item.recommendation.confidence}%</span>
                    </span>
                  </div>

                  {/* Recommended Action */}
                  {item.recommendation && (
                    <div className="px-6 py-4" style={{ backgroundColor: '#E7DDCA' }}>
                      <h4 className="text-xs font-medium text-gray-900 mb-2 uppercase">Recommended Action</h4>
                      <p className="text-sm font-medium text-gray-900">{item.recommendation.action}</p>
                    </div>
                  )}

                  {item.reasoningBreakdown && (
                    <div className="p-6 border-b" style={{ borderColor: '#E7DDCA' }}>
                      <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase">Why This Recommendation</h4>
                      <p className="text-sm text-gray-600 leading-relaxed mb-6">{item.reasoningBreakdown.summary}</p>
                      
                      <div className="space-y-4">
                        {item.reasoningBreakdown.factors.map((factor, idx) => (
                          <div key={idx} className="border-l-4 pl-4" style={{ borderColor: '#85A383' }}>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">{factor.name}</span>
                              <div className="flex gap-3">
                                <span className="text-xs text-gray-500">{factor.weight}%</span>
                                <span className="text-sm font-medium" style={{ color: '#85A383' }}>{factor.score}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">{factor.reasoning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {chatOpen === item.id && (
                    <div className="px-6 py-4 border-b" style={{ borderColor: '#E7DDCA', backgroundColor: '#F5F0E8' }}>
                      <div className="space-y-3 mb-4">
                        {(chatMessages[item.id] || []).map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`px-4 py-2 rounded-lg text-sm ${msg.type === 'user' ? 'bg-gray-200' : ''}`}
                                 style={msg.type === 'ai' ? { backgroundColor: '#E7DDCA' } : {}}>
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
                          placeholder="Ask about scenarios..."
                          className="flex-1 px-4 py-2 border-2 rounded-lg text-sm"
                          style={{ borderColor: '#E7DDCA' }}
                        />
                        <button onClick={() => sendMessage(item.id)} className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#85A383' }}>
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {item.whatIfScenarios && (
                    <div className="px-6 py-5" style={{ borderColor: '#E7DDCA' }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4" style={{ color: '#85A383' }} />
                        <span className="text-sm font-medium uppercase">What-If Analysis</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {item.whatIfScenarios.map((scenario, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setChatOpen(item.id);
                              setCurrentMessage(scenario);
                            }}
                            className="px-4 py-3 text-left text-sm border-2 rounded-lg hover:bg-gray-50"
                            style={{ borderColor: '#E7DDCA' }}
                          >
                            "{scenario}"
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <DecisionTrailModal item={decisionTrailModal} />
    </div>
  );
}

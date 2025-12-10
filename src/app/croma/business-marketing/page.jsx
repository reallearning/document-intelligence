"use client"
import React, { useState } from 'react';
import { 
  Package, Download, Search, MessageSquare, Truck, Send, Bell, 
  Activity, Clock, Building2, Settings, Filter, X, Sparkles,
  Check, ShoppingCart, LayoutDashboard, Move, RotateCcw, 
  TrendingDown, ArrowRight, Store, MapPin, Target
} from 'lucide-react';

export default function CromaSupplyChainDashboard() {
  const [currentSection, setCurrentSection] = useState('inventory');
  const [inventorySubTab, setInventorySubTab] = useState('buy-planning');
  const [selectedItems, setSelectedItems] = useState([]);
  const [decisionTrailModal, setDecisionTrailModal] = useState(null);
  const [chatOpen, setChatOpen] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  const sendMessage = (itemId) => {
    if (!currentMessage.trim()) return;
    setChatMessages(prev => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), 
        { type: 'user', text: currentMessage },
        { type: 'ai', text: 'Based on current trends and supplier lead times, I can model different scenarios for you. The recommendation balances stockout risk against inventory holding costs.' }
      ]
    }));
    setCurrentMessage('');
  };

  const toggleSection = (itemId, section) => {
    setExpandedSections(prev => ({
      ...prev,
      [`${itemId}-${section}`]: !prev[`${itemId}-${section}`]
    }));
  };

  // Buy Planning Decisions (3 cards)
  const buyPlanningDecisions = [
    {
      id: 'BP001',
      sku: 'Samsung Neo QLED 65" QN90D',
      skuCode: 'TV065SAM',
      category: 'Large Screen TVs',
      brand: 'Samsung',
      urgency: 'HIGH',
      event: 'Diwali Peak (Oct 20 - Nov 15)',
      currentState: {
        networkStock: 50,
        warehouseStock: 15,
        avgROS: '2.8/d',
        lastYearST: '87%'
      },
      recommendation: {
        action: 'Order 200 Units via 3 Phased Deliveries (Week 1: 80u | Week 3: 70u | Week 5: 50u)',
        reasoning: 'Current 65 units will exhaust in 23 days at baseline but only 10 days once Diwali lift begins. Event spans 4 weeks with phased intensity: pre-build (1.5x), peak (2.8x for 10 days), tail (1.5x). Samsung weekly supply + 2-week lead time enables phased approach. Order 200 units across 3 deliveries to match demand curve while avoiding over-inventory post-event. Total coverage: 2 weeks lead time + 4 weeks event + 1 week buffer = 7 weeks.',
        qty: 200,
        investment: '₹2.9Cr',
        confidence: 87
      },
      reasoningBreakdown: {
        summary: 'Current 65 units inadequate for 4-week Diwali window with phased demand lift. Event pattern: gradual 10-day build (1.5x), sharp 10-day peak (2.8x), quick 10-day tail (1.5x). Samsung\'s weekly supply flexibility allows phased orders matching demand curve. 200 units sized for total event demand (~185 units) plus safety stock, avoiding post-event surplus.',
        factors: [
          {
            name: 'Inventory Gap Analysis',
            weight: 35,
            score: 91,
            reasoning: 'Current: 65 units (50 network + 15 warehouse) = 23 days at baseline 2.8/d. Event demand over 4 weeks: Pre-build 10d (4.2/d) = 42u, Peak 10d (7.8/d) = 78u, Tail 10d (4.2/d) = 42u. Total need: ~162 units for event. Current + Order (65 + 200 = 265) provides coverage with 30% buffer for variability.'
          },
          {
            name: 'Event Demand Pattern',
            weight: 30,
            score: 89,
            reasoning: 'Diwali lift follows predictable 3-phase curve: (1) Pre-build starts post-Shraddh with 1.5x lift building over 10 days, (2) Core peak (Dhanteras through Bhai Dooj) hits 2.8x for 10 days, (3) Quick 1.5x tail over final 10 days before returning to baseline. Total effective window: 30 days, not uniform lift.'
          },
          {
            name: 'Supply Chain Flexibility',
            weight: 20,
            score: 93,
            reasoning: 'Samsung offers weekly deliveries with 2-week lead time and 94% OTD reliability. Phased ordering (80u Week 1, 70u Week 3, 50u Week 5) matches demand curve, reduces cash lock-up, and minimizes post-event inventory surplus. MOQ 50 units easily met per delivery.'
          },
          {
            name: 'Allocation Strategy',
            weight: 15,
            score: 86,
            reasoning: 'Samsung limits premium TV allocation nationally during Diwali. Early commitment for 200 units secures our priority in allocation queue. Competitor retailers ordering 4-6 weeks out. Our 2-week lead order timing + volume commitment increases allocation reliability. 87% historical ST gives Samsung confidence.'
          }
        ]
      },
      storeAllocation: [
        { cluster: 'Flagship (5 stores)', qty: 75, perStore: 15, reasoning: 'Premium locations with highest Diwali gifting traffic' },
        { cluster: 'Metro A+ (15 stores)', qty: 75, perStore: 5, reasoning: 'Strong event performance, balanced coverage' },
        { cluster: 'Metro A (28 stores)', qty: 30, perStore: 1, reasoning: 'Maintain presence, focus on high performers' },
        { cluster: 'Experience Centers (8 stores)', qty: 20, perStore: 2, reasoning: 'Demo-driven sales for feature-rich premium segment' }
      ],
      demandCurve: [
        { phase: 'Pre-Build (10 days)', lift: '1.5x', velocity: '4.2/d', units: 42, timing: 'Oct 20-29' },
        { phase: 'Core Peak (10 days)', lift: '2.8x', velocity: '7.8/d', units: 78, timing: 'Oct 30-Nov 8' },
        { phase: 'Tail (10 days)', lift: '1.5x', velocity: '4.2/d', units: 42, timing: 'Nov 9-18' }
      ],
      phasedDelivery: [
        { delivery: 1, week: 'Week 1 (Oct 15)', units: 80, arrival: 'Oct 29', reasoning: 'Arrives as pre-build accelerates, covers initial surge' },
        { delivery: 2, week: 'Week 3 (Oct 29)', units: 70, arrival: 'Nov 12', reasoning: 'Timed for peak period replenishment' },
        { delivery: 3, week: 'Week 5 (Nov 12)', units: 50, arrival: 'Nov 26', reasoning: 'Tail coverage + safety stock for extended demand' }
      ],
      whatIfScenarios: [
        'What if peak intensity reaches 3.2x instead of 2.8x?',
        'What if we front-load with 120 units in first delivery?',
        'What if Samsung can only deliver 150 units total?',
        'What if post-Diwali demand sustains at 1.3x baseline?'
      ],
      decisionTrail: [
        { time: '09:15:22', agent: 'Inventory Agent', action: 'Diwali planning trigger: Current stock at 65 units', thinking: 'Network shows 50 units, warehouse 15. At baseline 2.8/d = 23 days coverage. Insufficient for 4-week Diwali event. Need demand modeling and supplier options.' },
        { time: '09:18:45', agent: 'Demand Forecasting Agent', action: 'Built 3-phase demand curve from historical patterns', thinking: 'Last 3 Diwalis show consistent pattern: gradual 10d pre-build (1.5x avg), sharp 10d peak (2.8x centered on Dhanteras-Bhai Dooj), quick 10d tail (1.5x). Total window: 30 days effective, not 60. Demand: Pre-build 42u, Peak 78u, Tail 42u = 162 units total event need.' },
        { time: '09:23:10', agent: 'Supply Chain Agent', action: 'Confirmed Samsung weekly supply capability', thinking: 'Samsung offers weekly deliveries, 2-week lead time, 94% OTD. Current date Oct 1 means first delivery arrives Oct 15. Can do phased: 80u (arrives Oct 29 for pre-build end), 70u (arrives Nov 12 for peak), 50u (arrives Nov 26 for tail). Phased approach matches demand curve better than single bulk order.' },
        { time: '09:28:35', agent: 'Inventory Optimization Agent', action: 'Sized order at 200 units across 3 phases', thinking: 'Event needs 162 units. Current stock 65 units. Gap: 97 units minimum. But need buffer for: (a) demand variability ±15%, (b) allocation flexibility across stores, (c) Samsung allocation competition. 200 units = 162 event + 38 buffer (23%). Avoids over-inventory vs single 300-unit order.' },
        { time: '09:33:50', agent: 'Allocation Strategy Agent', action: 'Checked Samsung national allocation constraints', thinking: 'Samsung limits premium Neo QLED allocation during Diwali - high demand, constrained supply. Competitors ordering 4-6 weeks out. Our early commitment for 200 units signals serious demand, increases priority. If we wait or order small, risk being deprioritized. Volume + timing = allocation leverage.' },
        { time: '09:38:15', agent: 'Financial Risk Agent', action: 'Validated investment and margin protection', thinking: '200 units @ ₹14.5L each = ₹2.9Cr investment. Base margin 14% + incentive 3.5% at 90% ST = 17.5% blended. With 87% historical ST, risk is low. 60-day price protection covers entire event window. Phased delivery spreads cash outflow: ₹1.16Cr, ₹1.02Cr, ₹725L across 6 weeks vs ₹2.9Cr upfront.' },
        { time: '09:42:40', agent: 'Orchestrator', action: 'Finalized recommendation: 200 units, 3-phase delivery', thinking: 'All signals align: (1) Current 65 units inadequate, (2) Event needs ~162 units over phased curve, (3) Samsung weekly supply enables phased approach, (4) 200 units balances demand + buffer without over-inventory, (5) Allocation strategy requires early volume commitment. Confidence: 87%. Execute phased order: 80-70-50 units.' }
      ]
    },
    {
      id: 'BP002',
      sku: 'Sony PlayStation 5 + Top 3 Game Bundle',
      skuCode: 'GAMEPS5B',
      category: 'Gaming Consoles',
      brand: 'Sony',
      urgency: 'CRITICAL',
      event: 'Holiday Gaming Season',
      currentState: {
        networkStock: 24,
        warehouseStock: 0,
        avgROS: '4.2/d',
        lastYearST: '98%'
      },
      recommendation: {
        action: 'Emergency Order: 850 Units with Express Delivery',
        reasoning: 'Critical stockout risk. Current 24 units = only 6 days coverage at baseline 4.2/d velocity. Holiday season (Nov-Dec) drives 380% lift based on last year. Major game launches add urgency. Competitors Amazon and Flipkart out of stock - rare market capture opportunity. Despite thin 8% margin, 98% historical sell-through and ₹4.67Cr revenue justifies immediate action.',
        qty: 850,
        investment: '₹4.67Cr',
        confidence: 96
      },
      reasoningBreakdown: {
        summary: 'Critically low stock of 24 units with high velocity (4.2/d) creates immediate stockout risk. Holiday gaming season historically drives 380% demand surge. Competitor stockouts create rare market share opportunity. 98% historical sell-through gives high confidence despite thin margins.',
        factors: [
          {
            name: 'Inventory',
            weight: 40,
            score: 95,
            reasoning: 'Only 24 units with 4.2/d velocity = 6 days stock at baseline. Holiday season needs 8-week coverage. Warehouse empty. 98% last year sell-through confirms sustained demand.'
          },
          {
            name: 'Marketing',
            weight: 35,
            score: 94,
            reasoning: 'Holiday gifting drives 65% of annual console sales (380% lift vs baseline). New game releases create additional momentum. Gaming zones in 12 stores planned for tournaments.'
          },
          {
            name: 'Supply Chain',
            weight: 15,
            score: 88,
            reasoning: 'Sony standard lead time 10-12 days. Express delivery available (+₹45K). Limited India allocation - large order signals commitment and may increase our priority.'
          },
          {
            name: 'Competition',
            weight: 10,
            score: 96,
            reasoning: 'Amazon and Flipkart out of stock for 2+ weeks. Reliance Digital low inventory. Customers will buy from whoever has stock - first-mover advantage critical.'
          }
        ]
      },
      storeAllocation: [
        { cluster: 'Gaming Zones (12 stores)', qty: 360, perStore: 30, reasoning: 'Dedicated gaming sections with expert staff and demo stations' },
        { cluster: 'Metro A++ (8 stores)', qty: 240, perStore: 30, reasoning: 'Young affluent demographic, strong pre-order pipeline' },
        { cluster: 'Experience Centers (6 stores)', qty: 180, perStore: 30, reasoning: 'Demo stations drive 42% higher conversion rates' }
      ],
      whatIfScenarios: [
        'What if major game launch gets delayed to Q1 2026?',
        'What if we bundle with 2 games instead of 3 to reduce price point?',
        'What if Sony announces PS5 Pro during our holiday window?',
        'What if we allocate 60% online vs 40% stores?'
      ],
      decisionTrail: [
        { time: '10:05:18', agent: 'Inventory Agent', action: 'CRITICAL ALERT: PS5 stock at 24 units', thinking: 'At 4.2/d velocity, stockout imminent in 6 days. Holiday season starting - this is emergency territory.' },
        { time: '10:07:32', agent: 'Demand Forecasting Agent', action: 'Holiday surge forecast: 380% lift', thinking: 'Last year data: Nov-Dec accounted for 65% of annual console sales. Need 850+ units for 8-week holiday period.' },
        { time: '10:09:45', agent: 'Competition Agent', action: 'Competitor analysis: Amazon, Flipkart out of stock', thinking: 'Major competitors showing 2+ week stockouts. This is rare market capture window - customers desperate for stock.' },
        { time: '10:12:20', agent: 'Category Economics Agent', action: 'Margin check: 8% thin but 98% ST justifies', thinking: 'Low margin offset by near-guaranteed sellthrough. ₹4.67Cr revenue at stake. Risk of not ordering >> risk of margin pressure.' },
        { time: '10:15:05', agent: 'Orchestrator', action: 'EMERGENCY ORDER APPROVED: 850 units express', thinking: 'All signals point to critical need. Confidence 96% - highest priority order. Express delivery essential.' }
      ]
    },
    {
      id: 'BP003',
      sku: 'Voltas 1.5 Ton 5-Star Inverter AC',
      skuCode: 'AC15VOL',
      category: 'Air Conditioners',
      brand: 'Voltas',
      urgency: 'MEDIUM',
      event: 'Summer Pre-Season Build',
      currentState: {
        networkStock: 420,
        warehouseStock: 180,
        avgROS: '1.8/d',
        lastYearST: '76%'
      },
      recommendation: {
        action: 'Strategic Pre-Season Build: 2,400 Units over 8 Weeks',
        reasoning: 'Pre-season positioning for April-June summer peak. Current stock sufficient for now but early order captures consumer research phase and secures favorable Voltas allocation. 3-4 week lead time means February order for March availability. 2,400 units based on regional demand patterns (North 60%, West 22%, South 14%) and 85% pre-season demand lift.',
        qty: 2400,
        investment: '₹9.36Cr',
        confidence: 84
      },
      reasoningBreakdown: {
        summary: 'Summer AC sales concentrate in April-June but pre-season buying starts in February. Early inventory build captures research phase customers and secures priority in Voltas allocation system. Regional split based on temperature patterns and historical sales distribution.',
        factors: [
          {
            name: 'Inventory',
            weight: 30,
            score: 82,
            reasoning: 'Current 600 units adequate for now. Pre-season strategy focused on March-April positioning. 2,400 units sized for summer peak based on last year 76% ST - targeting 85% with better allocation.'
          },
          {
            name: 'Demand Seasonality',
            weight: 35,
            score: 88,
            reasoning: 'Pre-season (Feb-Mar) shows 85% demand increase as consumers research. Summer peak (Apr-Jun) shows 300% lift. Early positioning captures entire buying cycle.'
          },
          {
            name: 'Supply Chain',
            weight: 20,
            score: 85,
            reasoning: 'Voltas 3-4 week lead time means February order for March delivery. Pre-season orders get priority allocation. 15% RTV available provides downside protection.'
          },
          {
            name: 'Regional Strategy',
            weight: 15,
            score: 86,
            reasoning: 'North accounts for 68% of AC sales (extreme summer heat). West 22% (urban metros). South 14% (year-round but lower peak). Allocation reflects this pattern.'
          }
        ]
      },
      storeAllocation: [
        { cluster: 'North & Central (85 stores)', qty: 1440, perStore: 17, reasoning: 'Highest summer temperatures, 68% of AC sales volume' },
        { cluster: 'West (42 stores)', qty: 528, perStore: 13, reasoning: 'Mumbai, Pune metro heat island effect' },
        { cluster: 'South (28 stores)', qty: 336, perStore: 12, reasoning: 'Year-round demand but lower peak seasonality' }
      ],
      whatIfScenarios: [
        'What if summer temperatures are below normal (El Niño effect)?',
        'What if we order 30% more and push aggressive pre-season discounts?',
        'What if competitor launches inverter AC at ₹32,990 undercutting us?',
        'What if we focus 80% allocation on North region only?'
      ],
      decisionTrail: [
        { time: '11:20:45', agent: 'Seasonal Planning Agent', action: 'Pre-season window opening: Feb-Mar critical', thinking: 'AC sales follow predictable seasonal pattern. Early positioning captures research phase and secures allocation.' },
        { time: '11:23:10', agent: 'Demand Forecasting Agent', action: 'Summer forecast: 2,400 units for peak season', thinking: 'Based on regional temperature patterns and 76% historical ST. North allocation 60% reflects extreme summer heat zones.' },
        { time: '11:25:35', agent: 'Supply Chain Agent', action: 'Voltas lead time check: 3-4 weeks', thinking: 'February order ensures March delivery. Pre-season orders get priority. 15% RTV provides safety net if demand disappoints.' },
        { time: '11:28:20', agent: 'Orchestrator', action: 'Recommendation: 2,400 units phased build', thinking: 'Strategic vs emergency. Pre-season positioning with downside protection via RTV. Confidence 84% based on seasonal patterns.' }
      ]
    }
  ];

  // Store Allocation Decisions (3 cards)
  const allocationDecisions = [
    {
      id: 'AL001',
      sku: 'iPhone 15 Pro 256GB Natural Titanium',
      skuCode: 'PH256APP',
      category: 'Premium Smartphones',
      brand: 'Apple',
      urgency: 'CRITICAL',
      issue: 'Flagship Stores Approaching Stockout - Immediate Transfer Needed',
      currentDistribution: {
        total: 142,
        mumbai: { qty: 45, highVel: 18, lowVel: 27, avgROS: '8.4/d' },
        delhi: { qty: 52, highVel: 22, lowVel: 30, avgROS: '7.8/d' },
        bangalore: { qty: 28, highVel: 12, lowVel: 16, avgROS: '6.2/d' },
        other: { qty: 17, ros: '2.1/d' }
      },
      recommendation: {
        action: 'Tier 1 Transfers: 18 Units via Intra-City Moves (Mumbai: 8u, Delhi: 7u, Bangalore: 3u)',
        reasoning: 'High-velocity flagship stores in metro cities stockout in 4-5 days while low-velocity stores in same cities have 8-10 days coverage. Execute intra-city transfers within Mumbai, Delhi, and Bangalore networks. 24-hour logistics, zero GST complications, minimal cost (₹400-600/unit). Prevents ₹21.6L revenue loss. Next Apple allocation in 8 days - these transfers bridge the critical gap.',
        confidence: 96,
        impact: '₹21.6L revenue protection'
      },
      reasoningBreakdown: {
        summary: 'Velocity mismatch exists within each city network, not across cities. Mumbai flagships selling 15/d while suburban stores sell 2/d. Same pattern in Delhi and Bangalore. Intra-city transfers are operationally simple, GST-neutral, and fast (24hrs). This is the default IST strategy Croma uses daily.',
        factors: [
          {
            name: 'Within-City Velocity Gaps',
            weight: 40,
            score: 96,
            reasoning: 'Mumbai: BKC/Inorbit (flagship) 15/d vs Hiranandani/Lower Parel 2.5/d = 6x gap. Delhi: Pacific Mall/DLF Promenade 13/d vs Ambience/Select City 3/d = 4x gap. Bangalore: Forum/Phoenix 11/d vs Whitefield/Koramangala 2.8/d = 4x gap. Clear intra-city rebalancing opportunity.'
          },
          {
            name: 'Operational Feasibility',
            weight: 30,
            score: 98,
            reasoning: 'Intra-city transfers are Croma\'s workhorse IST method. 24-hour delivery via local courier. Zero GST issues (same state, same tax). Cost ₹400-600/unit (negligible vs ₹1.8L ASP). Store managers coordinate directly. This is business-as-usual, not exception.'
          },
          {
            name: 'Revenue Protection',
            weight: 20,
            score: 94,
            reasoning: 'Flagships generate 72% of metro iPhone revenue. Each stockout day in flagship = ₹3.8L loss. Low-velocity stores contribute 15%. Moving 18 units prevents ₹21.6L stockout losses. Transfer cost ₹9K total. ROI: 240x.'
          },
          {
            name: 'Alternative Options',
            weight: 10,
            score: 82,
            reasoning: 'Warehouse empty, next allocation 8 days away. Cross-state transfers avoided due to GST complexity, high cost (₹2K/unit), and 3-day timelines. Intra-city is only viable immediate solution.'
          }
        ]
      },
      transferTiers: [
        {
          tier: 'TIER 1: Intra-City (Recommended)',
          description: 'Within same city network - fast, simple, GST-neutral',
          transfers: [
            {
              type: 'transfer',
              city: 'Mumbai',
              from: 'Croma Hiranandani Powai',
              fromStock: 9,
              fromROS: '2.2/d',
              to: 'Croma BKC (Flagship)',
              toStock: 4,
              toROS: '15.8/d',
              units: 4,
              cost: '₹1,600 (₹400/unit)',
              eta: '24 hours',
              revenueImpact: '₹7.2L protected',
              gstImpact: 'None (same state)',
              feasibility: 'HIGH'
            },
            {
              type: 'transfer',
              city: 'Mumbai',
              from: 'Croma Lower Parel',
              fromStock: 8,
              fromROS: '2.5/d',
              to: 'Croma Inorbit Malad (Flagship)',
              toStock: 5,
              toROS: '14.2/d',
              units: 4,
              cost: '₹1,600 (₹400/unit)',
              eta: '24 hours',
              revenueImpact: '₹7.2L protected',
              gstImpact: 'None (same state)',
              feasibility: 'HIGH'
            },
            {
              type: 'transfer',
              city: 'Delhi NCR',
              from: 'Croma Ambience Gurgaon',
              fromStock: 11,
              fromROS: '3.2/d',
              to: 'Croma Pacific Mall (Flagship)',
              toStock: 6,
              toROS: '13.4/d',
              units: 4,
              cost: '₹2,000 (₹500/unit)',
              eta: '24 hours',
              revenueImpact: '₹7.2L protected',
              gstImpact: 'None (within NCR)',
              feasibility: 'HIGH'
            },
            {
              type: 'transfer',
              city: 'Delhi NCR',
              from: 'Croma Select City Walk',
              fromStock: 10,
              fromROS: '2.8/d',
              to: 'Croma DLF Promenade (Flagship)',
              toStock: 4,
              toROS: '12.8/d',
              units: 3,
              cost: '₹1,500 (₹500/unit)',
              eta: '24 hours',
              revenueImpact: '₹5.4L protected',
              gstImpact: 'None (within NCR)',
              feasibility: 'HIGH'
            },
            {
              type: 'transfer',
              city: 'Bangalore',
              from: 'Croma Whitefield',
              fromStock: 7,
              fromROS: '2.6/d',
              to: 'Croma Forum Mall (Flagship)',
              toStock: 3,
              toROS: '11.2/d',
              units: 3,
              cost: '₹1,800 (₹600/unit)',
              eta: '24 hours',
              revenueImpact: '₹5.4L protected',
              gstImpact: 'None (same city)',
              feasibility: 'HIGH'
            }
          ]
        },
        {
          tier: 'TIER 2: Intra-State (Lower Priority)',
          description: 'Within state but different cities - moderate complexity, some logistics cost',
          note: 'Currently no Tier 2 recommendations. All transfers optimally handled within city networks. Intra-state would only be considered if within-city options exhausted.',
          transfers: []
        }
      ],
      whatIfScenarios: [
        'What if we transfer 25 units instead of 18?',
        'What if iPhone 16 announcement happens next week?',
        'What if we also consider Tier 2 intra-state moves?',
        'What would justify a Tier 3 inter-state transfer?'
      ],
      decisionTrail: [
        { time: '14:10:05', agent: 'Inventory Agent', action: 'Detected velocity gaps within metro networks', thinking: 'Mumbai: Flagships 15/d vs suburban 2.5/d. Delhi: Flagships 13/d vs outer 3/d. Bangalore: Flagships 11/d vs peripheral 2.8/d. Velocity mismatch is intra-city, not inter-city.' },
        { time: '14:13:20', agent: 'Logistics Agent', action: 'Evaluated transfer feasibility by tier', thinking: 'Tier 1 (intra-city): 24hr, ₹400-600/unit, zero GST issues. Tier 2 (intra-state): 48hr, ₹1,200/unit, manageable. Cross-state avoided: 72hr, ₹2,000+/unit, GST paperwork, operationally messy. Clear winner: Tier 1.' },
        { time: '14:17:45', agent: 'Network Optimization Agent', action: 'Built 5 intra-city transfer recommendations', thinking: 'Mumbai: 8 units (BKC + Inorbit). Delhi: 7 units (Pacific + DLF Promenade). Bangalore: 3 units (Forum). All 24-hour execution. Total cost ₹9K. Revenue protected ₹21.6L. This is standard IST playbook.' },
        { time: '14:21:30', agent: 'GST Compliance Agent', action: 'Verified all transfers are GST-neutral', thinking: 'All recommended transfers within same state. Mumbai (MH), Delhi NCR (same GST zone), Bangalore (KA). Zero interstate complications. Store managers can execute immediately without tax team involvement.' },
        { time: '14:25:10', agent: 'Orchestrator', action: 'Approved Tier 1 strategy: 18 units across 3 cities', thinking: 'Velocity gaps are city-specific. Intra-city transfers operationally simple, fast, cheap, GST-clean. This is Croma\'s daily IST method. High confidence (96%). Execute immediately.' }
      ]
    },
    {
      id: 'AL002',
      sku: 'Samsung 43" Crystal 4K Smart TV',
      skuCode: 'TV043SAM',
      category: 'Mid-Range TVs',
      brand: 'Samsung',
      urgency: 'HIGH',
      issue: 'Maharashtra Network Imbalance - Mumbai Overstocked, Pune/Nagpur Understocked',
      currentDistribution: {
        total: 285,
        mumbai: { qty: 180, ros: '1.8/d', stockDays: 100 },
        pune: { qty: 65, ros: '4.2/d', stockDays: 15 },
        nagpur: { qty: 28, ros: '3.1/d', stockDays: 9 },
        nasik: { qty: 12, ros: '2.2/d', stockDays: 5 }
      },
      recommendation: {
        action: 'Tier 2 Transfer: 75 Units Mumbai → Pune/Nagpur/Nasik (Intra-State Maharashtra)',
        reasoning: 'Mumbai overstocked with 100 days coverage at slow 1.8/d velocity while Pune/Nagpur/Nasik face stockouts in 5-15 days with faster velocities (3-4/d). All stores within Maharashtra - intra-state transfers avoid inter-state GST but involve 6-12 hour logistics. Cost ₹800-1,000/unit justified by preventing ₹32L stockout losses. This is Tier 2 strategy: within-state but cross-city, used when within-city options exhausted.',
        confidence: 89,
        impact: '₹32L revenue protection'
      },
      reasoningBreakdown: {
        summary: 'Regional velocity mismatch within Maharashtra network. Mumbai slow-moving (1.8/d, 100 days stock) vs Pune/Nagpur fast-moving (3-4/d, 5-15 days stock). Intra-state transfers manageable: 6-12 hour logistics, same GST zone, moderate cost. Tier 2 strategy justified when city-level rebalancing insufficient.',
        factors: [
          {
            name: 'Regional Velocity Imbalance',
            weight: 40,
            score: 91,
            reasoning: 'Mumbai: 180 units, 1.8/d = 100 days stock (massive overstock). Pune: 65 units, 4.2/d = 15 days. Nagpur: 28 units, 3.1/d = 9 days. Nasik: 12 units, 2.2/d = 5 days (critical). Clear regional imbalance within Maharashtra.'
          },
          {
            name: 'Intra-State Feasibility',
            weight: 30,
            score: 88,
            reasoning: 'All Maharashtra stores = same GST zone, no inter-state complications. Mumbai→Pune 3hrs, Mumbai→Nagpur 12hrs, Mumbai→Nasik 4hrs. Cost ₹800-1,000/unit. Acceptable for Tier 2 strategy when preventing major stockouts.'
          },
          {
            name: 'Revenue Impact',
            weight: 20,
            score: 92,
            reasoning: 'Pune/Nagpur/Nasik combined: 4,200 units/month revenue vs Mumbai 3,240. Transfer 75 units unlocks ₹32L over 60 days. Mumbai loses minimal velocity. Net network gain: ₹28L. Transfer cost: ₹60K-75K (negligible).'
          },
          {
            name: 'Alternative Options',
            weight: 10,
            score: 84,
            reasoning: 'Within Mumbai transfers inadequate - entire city overstocked. Cross-state moves to Karnataka/Gujarat would be operationally complex with GST issues and high logistics cost. Intra-state Maharashtra is optimal solution - manageable logistics without complications.'
          }
        ]
      },
      transferTiers: [
        {
          tier: 'TIER 1: Intra-City',
          description: 'Within same city - not applicable here',
          note: 'Mumbai city-level already analyzed - entire Mumbai network is slow-moving (1.8/d avg). Intra-Mumbai transfers don\'t solve the regional imbalance. Need to look at Tier 2.',
          transfers: []
        },
        {
          tier: 'TIER 2: Intra-State (Recommended)',
          description: 'Within Maharashtra - manageable logistics, same GST zone',
          transfers: [
            {
              type: 'transfer',
              city: 'Maharashtra',
              from: 'Croma Phoenix Mumbai',
              fromStock: 45,
              fromROS: '1.6/d',
              to: 'Croma Phoenix Pune',
              toStock: 18,
              toROS: '4.8/d',
              units: 35,
              cost: '₹28,000 (₹800/unit)',
              eta: '6 hours (3hr drive)',
              revenueImpact: '₹14L protected',
              gstImpact: 'None (intra-state)',
              feasibility: 'MEDIUM-HIGH'
            },
            {
              type: 'transfer',
              city: 'Maharashtra',
              from: 'Croma R-City Mumbai',
              fromStock: 38,
              fromROS: '1.9/d',
              to: 'Croma Eternity Mall Nagpur',
              toStock: 8,
              toROS: '3.6/d',
              units: 25,
              cost: '₹25,000 (₹1,000/unit)',
              eta: '12 hours (via logistics)',
              revenueImpact: '₹10L protected',
              gstImpact: 'None (intra-state)',
              feasibility: 'MEDIUM'
            },
            {
              type: 'transfer',
              city: 'Maharashtra',
              from: 'Croma Infiniti Mumbai',
              fromStock: 42,
              fromROS: '2.0/d',
              to: 'Croma City Center Nasik',
              toStock: 4,
              toROS: '2.6/d',
              units: 15,
              cost: '₹12,000 (₹800/unit)',
              eta: '8 hours (4hr drive)',
              revenueImpact: '₹6L protected',
              gstImpact: 'None (intra-state)',
              feasibility: 'MEDIUM-HIGH'
            }
          ]
        }
      ],
      whatIfScenarios: [
        'What if Mumbai velocity drops further to 1.5/d?',
        'What if we transfer 100 units instead of 75?',
        'What would justify a Tier 3 Mumbai→Bangalore transfer?',
        'What if intra-state logistics cost doubles to ₹2,000/unit?'
      ],
      decisionTrail: [
        { time: '15:30:20', agent: 'Regional Analysis Agent', action: 'Detected Maharashtra network imbalance', thinking: 'Mumbai 180 units at 1.8/d = 100 days. Pune 65 units at 4.2/d = 15 days. Nagpur 28 units at 3.1/d = 9 days. Clear regional mismatch within state.' },
        { time: '15:34:45', agent: 'Inventory Agent', action: 'Analyzed Mumbai city-level transfers', thinking: 'All Mumbai stores slow (1.6-2.0/d range). Intra-Mumbai moves don\'t solve problem. Need to look outside city but stay within state.' },
        { time: '15:38:10', agent: 'Logistics Agent', action: 'Evaluated Tier 2 intra-state feasibility', thinking: 'Mumbai→Pune 3hrs, Mumbai→Nagpur 12hrs, Mumbai→Nasik 4hrs. All Maharashtra = same GST. Cost ₹800-1,000/unit. Tier 2 acceptable for preventing stockouts.' },
        { time: '15:42:35', agent: 'GST Compliance Agent', action: 'Confirmed intra-Maharashtra transfers GST-neutral', thinking: 'All stores in Maharashtra tax zone. No E-way bill complications. Standard intra-state logistics. Store managers familiar with this process.' },
        { time: '15:47:00', agent: 'Orchestrator', action: 'Approved Tier 2: 75 units Mumbai → Pune/Nagpur/Nasik', thinking: 'City-level inadequate. Intra-state manageable. Prevents ₹32L losses. Cost ₹60K-75K negligible vs revenue. Execute Tier 2 strategy.' }
      ]
    },
    {
      id: 'AL003',
      sku: 'LG 55" OLED C3 4K TV',
      skuCode: 'TV055LGO',
      category: 'Premium TVs',
      brand: 'LG',
      urgency: 'HIGH',
      issue: 'Event-Driven Demand Spike - Sports Finals Weekend (Mumbai Network)',
      currentDistribution: {
        total: 86,
        mumbai: { 
          sportsZones: { stores: 3, qty: 12, ros: '2.8/d' },
          flagships: { stores: 4, qty: 22, ros: '1.8/d' },
          suburban: { stores: 8, qty: 38, ros: '0.6/d' },
          peripheral: { stores: 5, qty: 14, ros: '0.4/d' }
        }
      },
      recommendation: {
        action: 'Tier 1 Emergency Transfer: 16 Units Within Mumbai (Suburban/Peripheral → Sports Zones)',
        reasoning: 'UEFA Champions League Final + IPL Finals this weekend drive concentrated premium TV demand at 3 Mumbai sports zone stores (BKC, Phoenix Lower Parel, Palladium). These stores will stockout in 4 days at current 12 units (2.8/d velocity) while suburban/peripheral stores have excess at 0.4-0.6/d velocity. Transfer 16 units via intra-city Mumbai logistics (4-6 hours). Zero GST, minimal cost (₹500-700/unit), captures time-sensitive event window. Standard Tier 1 IST strategy.',
        confidence: 95,
        impact: '₹24L revenue protection'
      },
      reasoningBreakdown: {
        summary: 'Sports finals create concentrated premium TV demand at specific sports-oriented stores within Mumbai. Sports zones will stockout in 4 days while suburban stores have 60+ days stock. Pure intra-city Mumbai transfer opportunity - operationally simple, fast execution (4-6 hours), zero GST complications. This is textbook Tier 1 IST.',
        factors: [
          {
            name: 'Event-Driven Concentration',
            weight: 40,
            score: 96,
            reasoning: 'UEFA Final + IPL Finals drive sports viewing demand. Sports zone stores (BKC, Phoenix, Palladium) curate premium TV sections for sports enthusiasts. These 3 stores show 2.8/d velocity vs suburban 0.6/d = 4.7x gap. Event window: 4-5 days. Time-critical transfer.'
          },
          {
            name: 'Intra-City Execution',
            weight: 30,
            score: 98,
            reasoning: 'All stores within Mumbai city limits. Transfers via local courier/driver: 4-6 hours max. Cost ₹500-700/unit (negligible vs ₹1.5L ASP). Zero GST issues. Store managers coordinate directly. This is daily BAU for Croma Mumbai network.'
          },
          {
            name: 'Revenue Timing',
            weight: 20,
            score: 93,
            reasoning: 'Sports finals weekend = concentrated 4-5 day purchase window. Sports zones sell 2.8/d during event vs 1.2/d baseline. Missing stock = lost revenue (customers won\'t wait). 16 units transferred protects ₹24L event revenue. Suburban stores unaffected (low velocity).'
          },
          {
            name: 'Alternative Options',
            weight: 10,
            score: 91,
            reasoning: 'Warehouse empty (OLED allocation tight). Cross-state transfers from Delhi/Bangalore would take 24-48 hours - by the time units arrive, 4-day event window would be over. Intra-city is only viable option for time-critical event capture.'
          }
        ]
      },
      transferTiers: [
        {
          tier: 'TIER 1: Intra-City Mumbai (Recommended)',
          description: 'Within Mumbai network - fast, simple, zero GST',
          transfers: [
            {
              type: 'transfer',
              city: 'Mumbai',
              from: 'Croma Thane',
              fromStock: 9,
              fromROS: '0.5/d',
              to: 'Croma BKC Sports Zone',
              toStock: 3,
              toROS: '3.2/d',
              units: 5,
              cost: '₹2,500 (₹500/unit)',
              eta: '4 hours',
              revenueImpact: '₹7.5L protected',
              gstImpact: 'None (same city)',
              feasibility: 'HIGH'
            },
            {
              type: 'transfer',
              city: 'Mumbai',
              from: 'Croma Ghatkopar',
              fromStock: 8,
              fromROS: '0.6/d',
              to: 'Croma Phoenix Lower Parel (Sports)',
              toStock: 4,
              toROS: '2.9/d',
              units: 6,
              cost: '₹3,000 (₹500/unit)',
              eta: '4 hours',
              revenueImpact: '₹9.0L protected',
              gstImpact: 'None (same city)',
              feasibility: 'HIGH'
            },
            {
              type: 'transfer',
              city: 'Mumbai',
              from: 'Croma Mulund',
              fromStock: 7,
              fromROS: '0.4/d',
              to: 'Croma Palladium Sports Section',
              toStock: 5,
              toROS: '2.4/d',
              units: 5,
              cost: '₹3,500 (₹700/unit)',
              eta: '6 hours',
              revenueImpact: '₹7.5L protected',
              gstImpact: 'None (same city)',
              feasibility: 'HIGH'
            }
          ]
        },
        {
          tier: 'TIER 2: Intra-State',
          description: 'Not applicable - all relevant stores within Mumbai',
          note: 'Event demand concentrated in Mumbai sports zones. No need for Tier 2 intra-state transfers from Pune/Nagpur - insufficient inventory and event timing too tight. Tier 1 intra-Mumbai fully addresses need.',
          transfers: []
        }
      ],
      whatIfScenarios: [
        'What if finals viewership disappoints and demand doesn\'t spike?',
        'What if we transfer 20 units instead of 16?',
        'What if sports zones also need Samsung QLEDs (different SKU)?',
        'What would justify pulling from Pune (Tier 2) instead of Mumbai suburbs?'
      ],
      decisionTrail: [
        { time: '16:05:10', agent: 'Event Calendar Agent', action: 'Flagged major sports events: Finals this weekend', thinking: 'UEFA Final Saturday + IPL Finals Sunday create premium TV demand spike. Sports enthusiasts research/purchase in 4-5 day window. Check sports zone store inventory.' },
        { time: '16:08:25', agent: 'Inventory Agent', action: 'Mumbai sports zones critical: 4 days stock', thinking: 'BKC, Phoenix, Palladium sports sections at 3-5 units each. Event velocity 2.8/d = 4-day stockout. Suburban stores (Thane, Ghatkopar, Mulund) have 9-15 units each at 0.4-0.6/d = 60+ days. Clear intra-Mumbai opportunity.' },
        { time: '16:11:40', agent: 'Logistics Agent', action: 'Intra-Mumbai transfers: 4-6hr execution', thinking: 'All stores within city limits. Local courier can complete in single day. Cost ₹500-700/unit negligible. Zero GST. This is standard Tier 1 playbook for Mumbai network.' },
        { time: '16:14:55', agent: 'Revenue Impact Agent', action: 'Event window revenue: ₹24L at stake', thinking: 'Sports zones sell 2.8/d during event (vs 1.2/d baseline). 16 units over 4 days = ₹24L. Suburban stores unaffected (0.5/d velocity barely changes). Pure network gain.' },
        { time: '16:18:20', agent: 'Orchestrator', action: 'Emergency transfer: 16 units within Mumbai', thinking: 'Time-critical event demand. Intra-city execution simple and fast. ₹24L revenue at stake vs ₹9K transfer cost. Textbook Tier 1 IST. High confidence (95%). Execute immediately.' }
      ]
    }
  ];

  // Ageing Inventory Decisions (3 cards)
  const ageingDecisions = [
    {
      id: 'AG001',
      sku: 'iPhone 14 Pro 128GB (All Colors)',
      skuCode: 'PH128I14',
      category: 'Smartphones',
      brand: 'Apple',
      urgency: 'CRITICAL',
      issue: '10-Day Runway Before iPhone 16 Launch - Immediate Liquidation Required',
      ageingProfile: {
        totalUnits: 234,
        totalValue: '₹2.81Cr',
        avgAge: '45 days',
        currentSellThrough: '68%',
        timeWindow: '10 days until iPhone 16 launch'
      },
      recommendation: {
        action: '3-Pronged Clearance: Enhanced Trade-In (140u) + Flash Sale (70u) + Flagship Consolidation (24u)',
        reasoning: 'iPhone 16 launches in 10 days - historical data shows 60-75% demand crash for previous gen within days of announcement. 234 units at risk. Strategy ranked by impact: (1) Enhanced trade-in (₹8K boost) converts early upgraders, clears 140 units (60%), builds iPhone 16 pipeline. (2) 48hr flash sale (₹79,900) matches Amazon/Flipkart, moves 70 units (30%). (3) Consolidate final 24 units to top 5 flagships for 7-day final push. Net ₹8.2L margin hit acceptable vs deeper post-launch write-offs.',
        confidence: 91,
        netMarginImpact: '-₹8.2L',
        cashRecovery: '₹2.68Cr'
      },
      reasoningBreakdown: {
        summary: 'iPhone 16 announcement in 10 days will crash iPhone 14 Pro demand by 60-75% based on every past launch cycle. Current 68% ST leaves 234 units at risk. At 1.2/d velocity would take 195 days to clear naturally, but post-launch velocity drops to 0.3/d = 780 days. Competitors already cutting ₹7-10K - we must match to move units.',
        factors: [
          {
            name: 'Product Lifecycle',
            weight: 35,
            score: 92,
            reasoning: 'iPhone 16 launches in 10 days with better camera, A18 chip, USB-C. Every past launch shows 60-75% demand drop for previous gen within 10 days. Pattern repeats annually - high confidence in forecast.'
          },
          {
            name: 'Inventory Risk',
            weight: 30,
            score: 88,
            reasoning: '234 units at 45 days age, 68% sold. Current 1.2/d velocity = 195 days to clear. Post-launch velocity historically drops to 0.3/d = 780 days. Immediate action critical in 10-day window.'
          },
          {
            name: 'Competitive Pricing',
            weight: 20,
            score: 85,
            reasoning: 'Amazon ₹84,900 vs our ₹89,900. Flipkart ₹82,900 with exchange. Reliance running enhanced trade-in. Flash sale at ₹79,900 matches floor, trade-in boost makes upgrade compelling.'
          },
          {
            name: 'Strategy Sequencing',
            weight: 15,
            score: 90,
            reasoning: 'Trade-in (Priority 1) targets early adopters (60% volume). Flash sale (Priority 2) captures price-sensitive (30%). Flagship consolidation (Priority 3) maximizes final 10%. Ranked by unit volume impact.'
          }
        ]
      },
      specificActions: [
        {
          type: 'tradeInBoost',
          action: 'PRIORITY 1: Enhanced Trade-In (₹8K Boost): ₹42K → ₹50K',
          currentTradeIn: '₹42,000',
          enhancedTradeIn: '₹50,000',
          targetUnits: 140,
          totalCost: '₹11.2L',
          reasoning: 'Highest impact - converts early upgraders (60% of clearance). Clears pre-launch, builds iPhone 16 pipeline. Cost ₹11.2L offset by avoided post-launch write-downs.'
        },
        {
          type: 'flashSale',
          action: 'PRIORITY 2: 48-Hour Flash Sale: ₹89,900 → ₹79,900',
          discount: '₹10,000 off',
          targetUnits: 70,
          reasoning: 'Matches Amazon ₹84,900 and Flipkart ₹82,900 pricing floor. Creates urgency + competitive parity. Targets 30% of remaining inventory in 48-hour window.'
        },
        {
          type: 'consolidation',
          action: 'PRIORITY 3: Consolidate 24 Units → Top 5 Flagships',
          units: 24,
          reasoning: 'Days 3-10 final push. Concentrates remaining inventory in highest-traffic stores with best iPhone expertise. Targets final 10% clearance.'
        }
      ],
      whatIfScenarios: [
        'What if iPhone 16 launch delays by 3 weeks?',
        'What if we skip flash sale and only do trade-in?',
        'What if Apple prices iPhone 16 ₹20K higher making iPhone 14 Pro competitive?'
      ],
      decisionTrail: [
        { time: '08:15:30', agent: 'Product Lifecycle Agent', action: 'ALERT: iPhone 16 launch in 10 days', thinking: 'Historical pattern: 60-75% demand crash for previous gen within days. 234 units at immediate risk.' },
        { time: '08:18:45', agent: 'Inventory Agent', action: 'Current ST 68%, 234 units aging at 45 days', thinking: 'At current 1.2/d velocity = 195 days to clear. Post-launch drops to 0.3/d = 780 days. Window closing fast.' },
        { time: '08:22:10', agent: 'Competition Agent', action: 'Competitors already discounting ₹7-10K', thinking: 'Amazon ₹84,900, Flipkart ₹82,900. Market racing to clear before launch. We must match or exceed to move units.' },
        { time: '08:26:35', agent: 'Strategy Agent', action: 'Built 3-tier clearance plan', thinking: 'Trade-in converts upgraders (60%), flash sale matches competition (30%), consolidation final push (10%). Sequenced by volume impact.' },
        { time: '08:30:50', agent: 'Orchestrator', action: 'URGENT APPROVAL: Execute 3-pronged clearance', thinking: 'High confidence (91%) based on historical launch patterns. ₹8.2L margin hit acceptable vs post-launch write-offs. Execute immediately.' }
      ]
    },
    {
      id: 'AG002',
      sku: 'LG 1.5 Ton 3-Star Window AC',
      skuCode: 'AC15LGW',
      category: 'Air Conditioners',
      brand: 'LG',
      urgency: 'HIGH',
      issue: 'Off-Season Inventory Build-Up',
      ageingProfile: {
        totalUnits: 186,
        totalValue: '₹55.8L',
        avgAge: '68 days',
        currentSellThrough: '48%',
        timeWindow: '4 months until next season (Feb 2026)'
      },
      recommendation: {
        action: 'Off-Season Campaign (112u) + RTV South/East (46u) + Warehouse for Pre-Season (28u)',
        reasoning: 'Window ACs face 4-month off-season trough (Oct-Jan). Strategy splits inventory: (1) Clear 60% through off-season value campaign at ₹25,990 (13% discount) targeting new home buyers and offices - volume clears holding cost. (2) RTV 25% (46 units) from South/East showing structural shift to split ACs - 15% RTV clause protects downside. (3) Warehouse 15% (28 units) for Feb pre-season to capture early demand without store holding cost.',
        confidence: 83,
        netMarginImpact: '-₹2.8L',
        cashRecovery: '₹49.2L'
      },
      reasoningBreakdown: {
        summary: 'Off-season (Oct-Jan) sees 70% demand drop for window ACs. 186 units at 68 days age with only 48% ST creates holding cost burden. Split strategy: campaign clears majority, RTV protects against South/East preference shift, warehouse lean stock for pre-season without retail floor cost.',
        factors: [
          {
            name: 'Seasonal Pattern',
            weight: 35,
            score: 82,
            reasoning: 'Window AC demand drops 70% Oct-Jan (0.8 units/d vs 2.7 peak). Natural off-season trough. Pre-season (Feb) revives to 1.5/d. Campaign timing captures winter new-home and office buyers.'
          },
          {
            name: 'Regional Shift',
            weight: 30,
            score: 80,
            reasoning: 'South/East showing structural preference shift from window to split ACs (better aesthetics, efficiency). 46 units in these regions slow-moving. RTV recovers ₹11.7L cash.'
          },
          {
            name: 'Campaign Strategy',
            weight: 25,
            score: 85,
            reasoning: '₹4K discount (13%) creates competitive value prop for off-season buyers. New homes, office fit-outs, industrial use less seasonal. 112 units (60%) clears majority stock, recovers ₹31L.'
          },
          {
            name: 'Pre-Season Positioning',
            weight: 10,
            score: 84,
            reasoning: '28 units warehoused for Feb pre-season. Avoids retail floor holding cost. Captures early Feb-Mar buyers without risk of deeper discounts. Strategic lean inventory.'
          }
        ]
      },
      specificActions: [
        {
          type: 'offSeasonCampaign',
          action: 'Off-Season Value Campaign: ₹29,990 → ₹25,990 (13% off)',
          discount: '₹4,000',
          targetUnits: 112,
          targetSegment: 'New home buyers, office fit-outs, industrial facilities, budget-conscious'
        },
        {
          type: 'rtv',
          action: 'RTV 46 Slowest Units from South & East Regions',
          totalUnits: 46,
          recoveryValue: '₹11.7L (85% of cost)',
          reasoning: 'South/East structural shift to split ACs. 15% RTV clause allows 46 units return. Protects against regional preference mismatch.'
        },
        {
          type: 'warehouseConsolidation',
          action: 'Warehouse 28 Units for Feb Pre-Season',
          totalUnits: 28,
          reasoning: 'Strategic lean inventory for pre-season. Avoids retail floor cost. Captures Feb-Mar early buyers without discount pressure.'
        }
      ],
      whatIfScenarios: [
        'What if we warehouse 100% and wait for summer peak demand?',
        'What if El Niño brings warmer winter and Dec-Jan demand spikes?',
        'What if we pivot all 186 units to commercial/office channel exclusively?'
      ],
      decisionTrail: [
        { time: '09:45:15', agent: 'Seasonal Analysis Agent', action: 'Off-season trough identified: 4 months low demand', thinking: '186 units with 48% ST face 4-month trough. Need multi-pronged approach: clear, RTV, warehouse.' },
        { time: '09:48:40', agent: 'Regional Analysis Agent', action: 'South/East showing split AC preference shift', thinking: '46 units in South/East slow-moving. Structural preference change. RTV protects against continued sluggishness.' },
        { time: '09:52:05', agent: 'Campaign Strategy Agent', action: 'Designed off-season value campaign at ₹25,990', thinking: '₹4K discount targets new homes, offices. Less seasonal sensitivity. 112 units (60%) clearance target reasonable.' },
        { time: '09:55:30', agent: 'Orchestrator', action: 'Approved 3-way split: Campaign + RTV + Warehouse', thinking: 'Balanced approach. Campaign clears majority (60%), RTV protects downside (25%), warehouse positions for pre-season (15%). Execute.' }
      ]
    },
    {
      id: 'AG003',
      sku: 'Whirlpool 260L Frost-Free Refrigerator',
      skuCode: 'RF260WHP',
      category: 'Refrigerators',
      brand: 'Whirlpool',
      urgency: 'MEDIUM',
      issue: 'Discontinued Model - New Series in Stores',
      ageingProfile: {
        totalUnits: 94,
        totalValue: '₹23.5L',
        avgAge: '52 days',
        currentSellThrough: '61%',
        timeWindow: 'Model discontinued, new series launched'
      },
      recommendation: {
        action: 'Liquidation Sale (68u) + Kitchen Bundle (18u) + Employee/Floor Clearance (8u)',
        reasoning: 'Model discontinued - new Whirlpool series launched with better specs at same ₹24,990 price. Must clear completely. Strategy: (1) Clearance sale at ₹19,990 (20% off) creates ₹5K gap vs new series, moves 68 units (72%). (2) Kitchen bundle (fridge + microwave ₹27,990) adds value perception, clears both categories, targets 18 units (19%). (3) Convert 8 display units to employee/bulk sales at ₹16,990, frees floor space for new series.',
        confidence: 88,
        netMarginImpact: '-₹1.8L',
        cashRecovery: '₹21.2L'
      },
      reasoningBreakdown: {
        summary: 'Discontinued model competing with superior new series at same retail price creates impossible sell-through. Must clear completely to free floor space and inventory capital. 20% discount creates clear value gap vs new model. Bundling and floor model sales maximize recovery.',
        factors: [
          {
            name: 'Product Obsolescence',
            weight: 40,
            score: 90,
            reasoning: 'New Whirlpool series launched with better energy rating, features at same ₹24,990 price. Old model at ₹24,990 has zero competitive advantage. Clearance at ₹19,990 creates clear "deal" positioning.'
          },
          {
            name: 'Floor Space Value',
            weight: 30,
            score: 86,
            reasoning: 'Premium refrigerator floor space limited. New series needs visibility. Old model occupying space = opportunity cost. Complete clearance unlocks ₹45L annual revenue potential on that footage.'
          },
          {
            name: 'Bundle Strategy',
            weight: 20,
            score: 85,
            reasoning: 'Kitchen bundle (fridge + microwave ₹27,990) perceived as deal vs ₹19,990 + ₹12,990 separate. Clears microwave inventory simultaneously. Targets 18 units (19%) as complementary sale.'
          },
          {
            name: 'Asset Recovery',
            weight: 10,
            score: 88,
            reasoning: 'Floor models aged, minor cosmetic wear. Employee pricing at ₹16,990 (₹8K below wholesale) recovers cash, frees floor space. 8 units = ₹1.4L recovery vs write-off.'
          }
        ]
      },
      specificActions: [
        {
          type: 'liquidationSale',
          action: 'Clearance Sale: ₹24,990 → ₹19,990 (20% discount)',
          discount: '₹5,000',
          targetUnits: 68,
          reasoning: 'New series at ₹24,990 has better specs. ₹5K gap creates clear "deal" positioning for discontinued model. Targets 72% clearance.'
        },
        {
          type: 'bundleStrategy',
          action: 'Kitchen Bundle: Fridge + Microwave = ₹27,990 (vs ₹32,980 separate)',
          targetUnits: 18,
          reasoning: 'Bundle value perception. Saves ₹4,990 vs buying separate. Clears microwave inventory simultaneously. Targets 19% as complementary sale.'
        },
        {
          type: 'floorModelClearance',
          action: 'Convert 8 Display Units → Employee/Bulk Sales at ₹16,990',
          displayUnits: 8,
          employeePrice: '₹16,990',
          reasoning: 'Floor models with minor wear. Employee pricing recovers cash (₹1.4L), frees premium floor space. Better than write-off.'
        }
      ],
      whatIfScenarios: [
        'What if we keep 10 units as permanent "budget option" at ₹18,990?',
        'What if Whirlpool offers buy-back program for old inventory?',
        'What if we donate remaining units for CSR tax benefit vs liquidation?'
      ],
      decisionTrail: [
        { time: '13:20:25', agent: 'Product Lifecycle Agent', action: 'Flagged: Discontinued model competing with new series', thinking: 'New Whirlpool series at same price but better specs. Old model has zero competitive advantage. Must clear completely.' },
        { time: '13:23:50', agent: 'Pricing Strategy Agent', action: 'Recommended ₹5K discount to ₹19,990', thinking: 'Creates clear value gap vs new ₹24,990 model. Positions as "deal" rather than inferior product. 20% discount reasonable for clearance.' },
        { time: '13:27:15', agent: 'Merchandising Agent', action: 'Designed kitchen bundle strategy', thinking: 'Fridge + microwave bundle adds value perception. Clears both categories. Targets 18 units as complementary clearance.' },
        { time: '13:30:40', agent: 'Orchestrator', action: 'Approved: Complete clearance via 3-tier strategy', thinking: 'Liquidation (72%) + Bundle (19%) + Floor models (9%) = 100% clearance. Frees space for new series. Execute clearance.' }
      ]
    }
  ];

  // Vendor/Supply Chain Management Decisions (3 cards)
  const vendorDecisions = [
    {
      id: 'VEN001',
      vendor: 'Samsung India Electronics',
      category: 'TVs, Appliances, Phones',
      contractStatus: 'Renewal Due in 42 Days',
      urgency: 'HIGH',
      metrics: {
        annualNSV: '₹248Cr',
        marginContribution: '₹29.8Cr',
        sellThrough: '84%',
        returnRate: '2.8%',
        otd: '92%',
        fillRate: '88%'
      },
      currentTerms: {
        baseMargin: 13,
        sellOutIncentive: '2% at 80%, 3% at 90%',
        rtvAllowed: true,
        rtvPercentage: 12,
        priceProtection: '60 days',
        paymentTerms: '45 days',
        coMarketing: 1.2
      },
      recommendation: {
        action: 'Negotiate 4-Point Package: Base Margin +1.5% | New 95% ST Tier | Co-Marketing +1% | Price Protection 90d',
        reasoning: 'We are Samsung\'s #2 partner nationally by volume (₹248Cr NSV, 84% ST vs network 72%). Our premium TV ST outperforms national by 12 points. Samsung margins structurally lower than LG/Sony but our performance justifies targeted 1.5% margin lift to 14.5%, new 3.5% incentive tier at 95% ST, co-marketing boost to 2.2% (event windows drive 40% volume), and 90-day price protection (competitive parity with LG/Sony). 4-point package targets ₹4.2Cr annual value.',
        confidence: 86,
        annualImpact: '₹4.2Cr incremental'
      },
      reasoningBreakdown: {
        summary: 'We outperform other Samsung retailers significantly (84% ST vs Vijay Sales 68%, Reliance 71%). Premium TV ST beats national by 12 points. ₹248Cr makes us strategic partner. Contract renewal in 42 days creates negotiation window. Samsung margins lower than competitors but our exceptional execution justifies targeted improvements.',
        factors: [
          {
            name: 'Performance Leverage',
            weight: 40,
            score: 89,
            reasoning: 'Premium TV ST 87% beats Samsung national 75% by 12 points. Overall 84% ST vs network 72% (+12pts). Crucially outperform Vijay Sales (68%) and Reliance (71%). Strategic partner Samsung wants to retain.'
          },
          {
            name: 'Volume Significance',
            weight: 30,
            score: 88,
            reasoning: '₹248Cr annual NSV = #2 Samsung partner. ₹142Cr TVs = 4.2% national Samsung TV sales. Premium placement, zero quality issues. Reallocating floor space low-risk for us, high-risk for Samsung.'
          },
          {
            name: 'Contract Timing',
            weight: 20,
            score: 82,
            reasoning: 'Renewal in 42 days. Samsung values continuity, wants no disruption with top performer. Alternative retailers have lower ST. Our renewal strategically important to Samsung.'
          },
          {
            name: 'Competitive Context',
            weight: 10,
            score: 85,
            reasoning: 'LG 15% margin, Sony 17% vs Samsung 13% gives leverage. Can credibly threaten space reallocation. But Samsung structurally lower margin, so target realistic 1.5% lift to 14.5%, not full parity.'
          }
        ]
      },
      negotiationPackage: [
        {
          priority: 1,
          ask: 'Increase base margin 13% → 14.5% on premium TVs',
          reasoning: 'Premium TV ST outperforms Samsung national by 12 points. We move ₹142Cr TV NSV with premium placement. Target 1.5% improvement within Samsung pricing structure.',
          leverage: '87% premium TV ST vs 75% national + premium placement + competitor underperformance',
          likelihood: 'Medium',
          impact: '₹1.5Cr annually',
          dataPoints: [
            'Croma premium TV ST: 87% vs Samsung network 75% (+12pts)',
            'Croma represents 4.2% of national Samsung TV sales',
            'Competitors: Vijay Sales 68% ST, Reliance 71% ST',
            'Premium in-store placement, zero quality complaints'
          ]
        },
        {
          priority: 2,
          ask: 'New incentive tier: 3.5% at 95% sell-through',
          reasoning: 'We consistently hit 90%+ on flagships. Current max at 90% leaves upside unrewarded. Reliance gets 2.5% max - room to negotiate higher tier.',
          leverage: '14 of 24 flagship SKUs exceeded 95% ST last year',
          likelihood: 'High',
          impact: '₹1.0Cr on high-velocity SKUs',
          dataPoints: [
            'FY24: 14 SKUs exceeded 95% ST',
            'Neo QLED 65": 97% ST, 240 units',
            'Frame TV 55": 96% ST, 180 units',
            'Competitor max: Reliance 86%, Vijay 82%'
          ]
        },
        {
          priority: 3,
          ask: 'Increase co-marketing 1.2% → 2.2%',
          reasoning: 'Event windows drive 40% annual volume but need heavy promo investment. LG/Sony offer higher co-marketing, giving leverage.',
          leverage: 'Event performance data + Croma strategic value as top partner',
          likelihood: 'Medium',
          impact: '₹2.5Cr incremental marketing',
          dataPoints: [
            'Diwali 2024: 28% of annual Samsung TV sales in 4 weeks',
            'Joint campaign ROI: 4.2x average',
            'Croma footfall: 2.4M/month vs Reliance 1.8M',
            'LG 2.0% co-marketing, Sony 1.8%'
          ]
        },
        {
          priority: 4,
          ask: 'Extend price protection 60 → 90 days',
          reasoning: 'Electronics pricing volatile. 60-day insufficient for premium SKUs (85-day lifecycle). Competitors offer 75-90 days.',
          leverage: 'LG/Sony both 75-90 day protection. Space reallocation more attractive without parity',
          likelihood: 'Medium',
          impact: '₹1.2Cr risk mitigation',
          dataPoints: [
            'Last year: ₹2.2Cr unprotected markdowns',
            'Avg premium SKU lifecycle: 85 days',
            'Competitor terms: LG 90d, Sony 75d',
            'Can credibly threaten space reallocation'
          ]
        }
      ],
      competitiveContext: {
        lgTerms: { margin: 15, incentive: '3% at 85%', rtv: 15, coMarketing: 2.0 },
        sonyTerms: { margin: 17, incentive: '2% at 80%', rtv: 10, coMarketing: 1.8 },
        note: 'LG/Sony higher margin structures due to positioning. Samsung aggressive volume strategy = lower margins. Our leverage: exceptional performance vs other Samsung retailers. Premium TV ST +12pts national average. Competitors underperform making us strategic.'
      },
      whatIfScenarios: [
        'What if Samsung rejects margin but offers 5% incentive at 95% ST instead?',
        'What if we threaten 15% Samsung floor space reduction?',
        'What if we get all 4 asks approved - total P&L impact?',
        'What if Samsung offers exclusive 2025 flagship launch rights?'
      ],
      decisionTrail: [
        { time: '10:30:15', agent: 'Contract Management Agent', action: 'Triggered quarterly vendor review', thinking: 'Samsung contract renewal in 42 days. Analyzing performance metrics to build negotiation leverage case.' },
        { time: '10:31:08', agent: 'Vendor Performance Agent', action: 'Performance aggregation: 84% ST strong', thinking: 'We hit 84% ST vs network 72%. Clear outperformance. Premium TV 87% vs national 75% (+12pts). Strong leverage position.' },
        { time: '10:32:22', agent: 'Category Economics Agent', action: 'Category breakdown: TVs are hero', thinking: 'TVs ₹142Cr NSV, 87% ST, 12pts above brand avg. This is our primary negotiation lever. Focus margin improvement here.' },
        { time: '10:34:45', agent: 'Competitive Analysis Agent', action: 'Competitor benchmarking complete', thinking: 'We outperform Vijay Sales 68% ST and Reliance 71% ST significantly. LG/Sony offer higher margins (15%/17% vs Samsung 13%). Multiple leverage points.' },
        { time: '10:37:30', agent: 'Strategy Agent', action: 'Built 4-point negotiation package', thinking: 'Margin +1.5% (realistic given Samsung structure), new 95% tier, co-marketing boost, price protection extension. Prioritized by financial impact.' },
        { time: '10:40:50', agent: 'Orchestrator', action: 'Finalized negotiation strategy: ₹4.2Cr target', thinking: 'Strong performance leverage + contract timing + competitive context = solid negotiation position. 4-point package balanced and achievable. Confidence 86%.' }
      ]
    },
    {
      id: 'VEN002',
      vendor: 'Apple India Private Limited',
      category: 'iPhones, iPads, MacBooks, Accessories',
      contractStatus: 'Active - Performance Review',
      urgency: 'CRITICAL',
      metrics: {
        annualNSV: '₹312Cr',
        marginContribution: '₹15.6Cr',
        sellThrough: '94%',
        returnRate: '0.9%',
        otd: '96%',
        fillRate: '72%'
      },
      currentTerms: {
        baseMargin: 4.5,
        sellOutIncentive: 'None',
        rtvAllowed: false,
        rtvPercentage: 0,
        priceProtection: 'None',
        paymentTerms: '30 days',
        coMarketing: 0.5
      },
      recommendation: {
        action: 'Focus on Allocation Priority (4.5% Guaranteed) + Co-Marketing 1.5% + Launch Velocity Bonus',
        reasoning: 'Apple margins industry-fixed, non-negotiable. Real value in allocation priority and marketing support. We are #3 Apple partner nationally by volume (₹312Cr NSV, 96% iPhone ST vs 87% network). Frequent stockouts during launches cost ₹8Cr+ annually. Request: (1) Guaranteed 4.5% national iPhone allocation for all launches - prevents costly stockouts. (2) Co-marketing 0.5% → 1.5% - our activations drive 23% higher accessory attach. (3) 1% launch velocity bonus - we lead first-month sales. Total impact: ₹12.4Cr annually.',
        confidence: 78,
        annualImpact: '₹12.4Cr incremental'
      },
      reasoningBreakdown: {
        summary: 'Apple maintains fixed margins across resellers - differentiation comes from allocation priority and marketing support, not margin points. We are #3 partner with exceptional 96% ST. Stockouts during launch windows our biggest pain point costing ₹8Cr+ annually. Focus negotiation on guaranteed allocation, marketing support, and launch bonuses.',
        factors: [
          {
            name: 'Launch Allocation Gap',
            weight: 40,
            score: 92,
            reasoning: '#3 partner by volume but frequent launch stockouts. iPhone 15 stockout in 4 days = ₹3.2Cr lost. 96% ST vs 87% network proves demand. Guaranteed 4.5% allocation prevents ₹8Cr+ annual stockout losses.'
          },
          {
            name: 'Ecosystem Development',
            weight: 30,
            score: 88,
            reasoning: 'Our activations drive 42% accessory attach vs 19% network (+23pts). AppleCare 31% vs 18% network. Trade-in 28% of sales. Ecosystem strength justifies higher co-marketing investment from Apple.'
          },
          {
            name: 'Launch Velocity Leadership',
            weight: 20,
            score: 86,
            reasoning: 'iPhone 15: 840 units in first 30 days (32% of annual). Launch velocity 28/d vs 12/d baseline. We lead on launch impact but incentives reward sustained, not launch performance. Velocity bonus aligns with our strength.'
          },
          {
            name: 'Premium Variant Mix',
            weight: 10,
            score: 84,
            reasoning: '512GB iPhones stockout in 11 days vs 2 days for 256GB. Customer asks: 32% want 512GB+. Priority allocation for premium variants improves margin realization by ₹1.2Cr (5.2% vs 4.5% margin).'
          }
        ]
      },
      negotiationPackage: [
        {
          priority: 1,
          ask: 'Guaranteed 4.5% of national iPhone allocation for all launches',
          reasoning: '#3 partner nationally, 96% ST exceeds network 87%. Frequent launch stockouts cost ₹8Cr+ annually. Guaranteed allocation prevents losses.',
          leverage: 'Historical launch performance + threat to reduce iPhone floor space',
          likelihood: 'High',
          impact: '₹8.2Cr prevented stockouts',
          dataPoints: [
            'iPhone 15 launch: Stockout in 4 days, lost ₹3.2Cr revenue',
            'Croma iPhone ST: 96% vs network avg 87%',
            'We sell 240 iPhones/day during launch vs 180 network avg',
            '#3 Apple partner nationally by volume (₹312Cr NSV)'
          ]
        },
        {
          priority: 2,
          ask: 'Increase co-marketing fund 0.5% → 1.5%',
          reasoning: 'Our in-store activations, trade-in program drive Apple ecosystem adoption. 23% higher accessory attach rate vs network.',
          leverage: 'Data showing activations drive superior ecosystem metrics',
          likelihood: 'Medium',
          impact: '₹3.1Cr incremental marketing',
          dataPoints: [
            'Accessory attach: 42% vs network 19% (+23pts)',
            'AppleCare adoption: 31% vs network 18%',
            'Trade-in program drives 28% of iPhone sales',
            'In-store activations create ecosystem stickiness'
          ]
        },
        {
          priority: 3,
          ask: 'Launch velocity bonus: 1% margin on units sold in first 30 days',
          reasoning: 'We consistently lead launch velocity. Current incentives reward sustained not launch performance. Velocity bonus aligns with strength.',
          leverage: 'Historical first-month performance data shows leadership',
          likelihood: 'Medium',
          impact: '₹1.8Cr on major launches',
          dataPoints: [
            'iPhone 15: 840 units in first 30 days (32% of annual)',
            'Launch velocity: 28 units/day vs 12 units/day baseline',
            'First month gross margin: ₹11.2Cr',
            'Launch leadership not rewarded in current structure'
          ]
        },
        {
          priority: 4,
          ask: 'Priority allocation for high-demand variants (512GB, 1TB)',
          reasoning: 'Premium variants stockout in 3-5 days, 256GB has longer tail. Better variant mix improves margin realization.',
          leverage: 'Variant velocity data shows faster premium SKU sellthrough',
          likelihood: 'High',
          impact: '₹1.2Cr improved mix',
          dataPoints: [
            '512GB stockout avg: 11 days vs 2 days for 256GB',
            'Premium variant margin: 5.2% vs 4.5% base',
            'Customer preference: 32% ask for 512GB+',
            'Current allocation skews to 256GB despite demand'
          ]
        }
      ],
      competitiveContext: {
        note: 'Apple maintains consistent terms across authorized resellers. Differentiation comes from allocation priority, marketing support, launch exclusives rather than margin variation. Focus negotiation on non-margin levers.'
      },
      whatIfScenarios: [
        'What if Apple offers exclusive 48-hour launch window for iPhone 16?',
        'What if we reduce iPhone floor space by 20% - impact on allocation?',
        'What if Samsung aggressive switcher program during iPhone launch?',
        'What if we get priority allocation but fill rate drops to 60%?'
      ],
      decisionTrail: [
        { time: '11:15:40', agent: 'Vendor Performance Agent', action: 'Apple review: ₹312Cr NSV, 96% ST exceptional', thinking: 'Top-tier performance but margins non-negotiable with Apple. Must focus on allocation and marketing support instead.' },
        { time: '11:18:25', agent: 'Inventory Agent', action: 'Identified chronic launch stockout pattern', thinking: 'iPhone 15 stockout in 4 days = ₹3.2Cr lost. Happens every launch. Allocation priority our #1 issue, not margin.' },
        { time: '11:21:50', agent: 'Marketing Agent', action: 'Ecosystem metrics analysis complete', thinking: 'We drive 42% accessory attach vs 19% network. AppleCare 31% vs 18%. Strong ecosystem justifies co-marketing increase.' },
        { time: '11:25:15', agent: 'Strategy Agent', action: 'Built allocation-focused negotiation package', thinking: 'Apple margins fixed. Real value in guaranteed allocation (prevents ₹8Cr losses), marketing support, launch bonuses. 4-point package targets ₹12.4Cr.' },
        { time: '11:28:45', agent: 'Orchestrator', action: 'Approved: Allocation-focused strategy', thinking: 'Can\'t negotiate margins with Apple. Allocation priority prevents massive stockout losses. Co-marketing and bonuses align with our strengths. Confidence 78%.' }
      ]
    },
    {
      id: 'VEN003',
      vendor: 'Xiaomi India',
      category: 'Smart TVs, Phones, IoT',
      contractStatus: 'Active - Operational Issues',
      urgency: 'MEDIUM',
      metrics: {
        annualNSV: '₹86Cr',
        marginContribution: '₹8.2Cr',
        sellThrough: '68%',
        returnRate: '4.2%',
        otd: '78%',
        fillRate: '82%'
      },
      currentTerms: {
        baseMargin: 8,
        sellOutIncentive: '1.5% at 75%, 2.5% at 85%',
        rtvAllowed: true,
        rtvPercentage: 20,
        priceProtection: '45 days',
        paymentTerms: '60 days',
        coMarketing: 2.8
      },
      recommendation: {
        action: 'Operational Improvements Over Margin: OTD 90%+ SLA | Reduce Phone Exposure | Joint Quality Program',
        reasoning: 'Terms already generous (8% margin, 2.8% co-marketing, 20% RTV). Real problem is execution: poor OTD 78% (vs Samsung 92%, LG 89%) causing stockouts, high returns 4.2% (vs Samsung 2.8%) increasing costs, low phone ST 58% dragging blended performance. Strategy: (1) Make 90%+ OTD mandatory SLA tied to incentive eligibility - prevents ₹4Cr stockout losses. (2) Reduce smartphone SKU count, increase TV focus (72% ST vs 58% phones). (3) Joint quality program reduces returns from 4.2% to <3%, saves ₹1.8Cr handling costs.',
        confidence: 82,
        annualImpact: '₹4Cr operational savings'
      },
      reasoningBreakdown: {
        summary: 'Xiaomi offers competitive commercial terms. Performance issues are operational not commercial. Poor 78% OTD creates chronic stockouts. High 4.2% return rate increases handling costs. Phone 58% ST drags blended performance. Focus negotiation on operational improvements (OTD SLA, quality program) and category mix optimization (TV focus) rather than margin requests.',
        factors: [
          {
            name: 'Delivery Performance',
            weight: 40,
            score: 72,
            reasoning: '78% OTD vs Samsung 92%, LG 89% unacceptable. Last quarter: 18 stockouts due to late delivery = ₹4Cr lost sales. Make 90%+ OTD mandatory SLA tied to incentive eligibility.'
          },
          {
            name: 'Category Mix Optimization',
            weight: 30,
            score: 78,
            reasoning: 'TVs performing well (72% ST, 9% margin) but phones underperforming (58% ST, 6% margin). Reduce phone exposure, increase TV floor space. Focus on winning category.'
          },
          {
            name: 'Quality Issues',
            weight: 20,
            score: 70,
            reasoning: 'Returns 4.2% vs Samsung 2.8%, Sony 2.1% significantly higher. Top reasons: DOA 38%, quality 29%. Each return costs ₹1.2K handling. Joint quality program targets <3% saves ₹1.8Cr.'
          },
          {
            name: 'Commercial Terms',
            weight: 10,
            score: 85,
            reasoning: 'Terms already competitive: 8% margin, 2.8% co-marketing, 20% RTV. No need to negotiate margins. Focus on operational execution improvements instead.'
          }
        ]
      },
      negotiationPackage: [
        {
          priority: 1,
          ask: 'Improve OTD to 90%+ (currently 78%) with mandatory SLA',
          reasoning: 'Poor delivery creates chronic stockouts and lost sales. Make SLA compliance mandatory for incentive eligibility.',
          leverage: 'Threaten to reduce SKU count if OTD doesn\'t improve',
          likelihood: 'High',
          impact: '₹4Cr prevented stockouts',
          dataPoints: [
            'Last quarter: 18 stockouts due to late Xiaomi delivery',
            'Samsung OTD: 92%, LG: 89%, Xiaomi: 78%',
            'Each stockout costs avg ₹22K lost revenue',
            'OTD below 90% unacceptable for partner of this scale'
          ]
        },
        {
          priority: 2,
          ask: 'Reduce smartphone exposure, increase TV category focus',
          reasoning: 'Xiaomi phones underperforming (58% ST, 6% margin). TVs performing well (72% ST, 9% margin). Reallocate floor space to winning category.',
          leverage: 'Performance data showing TV vs phone gap',
          likelihood: 'High',
          impact: 'Mix optimization improves blended margin',
          dataPoints: [
            'TV ST: 72% vs Phone ST: 58% (14pt gap)',
            'TV margin: 9% vs Phone margin: 6% (3pt gap)',
            'Customer preference shifting to premium brands for phones',
            'Xiaomi TV value proposition stronger than phones'
          ]
        },
        {
          priority: 3,
          ask: 'Joint quality program: Reduce returns from 4.2% to <3%',
          reasoning: 'High return rate increases handling costs and damages brand perception. Joint program targets root causes.',
          leverage: 'Comparison with Samsung (2.8%) and Sony (2.1%) benchmarks',
          likelihood: 'Medium',
          impact: '₹1.8Cr cost reduction',
          dataPoints: [
            'Xiaomi returns: 4.2% vs Samsung: 2.8%, Sony: 2.1%',
            'Top return reasons: DOA (38%), quality issues (29%)',
            'Each return costs ₹1,200 in handling + reverse logistics',
            'Joint pre-shipment quality checks could reduce DOA 38% → 15%'
          ]
        }
      ],
      whatIfScenarios: [
        'What if Xiaomi can\'t improve OTD to 90%+ - should we exit phones entirely?',
        'What if we shift 80% of phone space to Realme/OnePlus?',
        'What if quality issues persist - impact on Croma brand perception?'
      ],
      decisionTrail: [
        { time: '12:40:30', agent: 'Vendor Performance Agent', action: 'Xiaomi review: Terms good, execution poor', thinking: '8% margin, 2.8% co-marketing generous. But 78% OTD, 4.2% returns, 58% phone ST are operational problems not commercial.' },
        { time: '12:43:55', agent: 'Operations Agent', action: 'OTD analysis: 18 stockouts last quarter', thinking: '78% OTD vs 92% Samsung, 89% LG unacceptable. Make 90%+ mandatory SLA tied to incentives. This is leverage point.' },
        { time: '12:47:20', agent: 'Category Analysis Agent', action: 'Category performance: TVs strong, phones weak', thinking: 'TVs 72% ST vs phones 58%. TVs 9% margin vs phones 6%. Clear winner. Shift floor space to TVs, reduce phone exposure.' },
        { time: '12:50:45', agent: 'Quality Agent', action: 'Return rate 4.2% significantly above benchmark', thinking: 'Samsung 2.8%, Sony 2.1% vs Xiaomi 4.2%. DOA 38% suggests pre-shipment quality issues. Joint program could save ₹1.8Cr.' },
        { time: '12:54:10', agent: 'Orchestrator', action: 'Finalized operational-focused strategy', thinking: 'Don\'t need margin negotiation - terms already good. Focus on execution: OTD SLA, category mix, quality program. ₹4Cr operational savings target. Execute.' }
      ]
    }
  ];

  const inventorySubTabs = [
    { id: 'buy-planning', label: 'Buy Planning', icon: ShoppingCart, count: buyPlanningDecisions.length },
    { id: 'allocation', label: 'Store Allocation', icon: Building2, count: allocationDecisions.length },
    { id: 'ageing', label: 'Ageing Inventory', icon: Clock, count: ageingDecisions.length }
  ];

  const getCurrentDecisions = () => {
    if (currentSection === 'supply-chain') return vendorDecisions;
    if (currentSection === 'inventory') {
      if (inventorySubTab === 'buy-planning') return buyPlanningDecisions;
      if (inventorySubTab === 'allocation') return allocationDecisions;
      if (inventorySubTab === 'ageing') return ageingDecisions;
    }
    return [];
  };

  const decisions = getCurrentDecisions();

  const DecisionTrailModal = ({ item }) => {
    if (!item) return null;
    const trails = item.decisionTrail || [];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[80vh] overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Decision Trail</h3>
              <p className="text-sm text-gray-500">{item.sku || item.vendor}</p>
            </div>
            <button onClick={() => setDecisionTrailModal(null)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {trails.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Decision trail will be available once analysis is complete.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {trails.map((entry, idx) => (
                  <div key={idx} className="border rounded-lg p-4" style={{ borderColor: '#E7DDCA' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-gray-500">{entry.time}</span>
                      <span className="text-sm font-medium" style={{ color: '#85A383' }}>{entry.agent}</span>
                    </div>
                    <div className="text-sm text-gray-900 mb-1">{entry.action}</div>
                    <div className="text-xs text-gray-600">{entry.thinking}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-auto bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#85A383' }}>
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">CROMA</h1>
              <p className="text-xs text-gray-500">Supply Chain AI</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {/* <button
              onClick={() => setCurrentSection('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                currentSection === 'dashboard' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button> */}

            <button
              onClick={() => setCurrentSection('inventory')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                currentSection === 'inventory' ? 'text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={currentSection === 'inventory' ? { backgroundColor: '#85A38315' } : {}}
            >
              <Package className="w-4 h-4" />
              <span className="flex-1 text-left">Inventory Decisions</span>
              <span className="px-2 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: '#85A383' }}>
                9
              </span>
            </button>

            <button
              onClick={() => setCurrentSection('supply-chain')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                currentSection === 'supply-chain' ? 'text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={currentSection === 'supply-chain' ? { backgroundColor: '#85A38315' } : {}}
            >
              <Truck className="w-4 h-4" />
              <span className="flex-1 text-left">Supply Chain Mgmt</span>
              <span className="px-2 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: '#85A383' }}>
                3
              </span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {currentSection === 'inventory' && 'Inventory Decisions'}
                {currentSection === 'supply-chain' && 'Supply Chain Management'}
                {currentSection === 'dashboard' && 'Dashboard Overview'}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {currentSection === 'inventory' && 'Multivariate analysis considering inventory, marketing, supply chain, and pricing'}
                {currentSection === 'supply-chain' && 'Vendor performance analysis and contract negotiation strategies'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search SKU, Store..."
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:border-gray-400"
                />
              </div>
              {selectedItems.length > 0 && (
                <button className="px-4 py-2 text-sm font-medium rounded-lg text-white" style={{ backgroundColor: '#85A383' }}>
                  <Check className="w-4 h-4 inline mr-2" />
                  Execute ({selectedItems.length})
                </button>
              )}
              <button className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 inline mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Tabs for Inventory */}
        {currentSection === 'inventory' && (
          <div className="bg-white border-b px-6">
            <div className="flex gap-1">
              {inventorySubTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setInventorySubTab(tab.id)}
                  className={`px-5 py-3 text-sm relative ${
                    inventorySubTab === tab.id ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      inventorySubTab === tab.id ? 'text-white' : 'bg-gray-200'
                    }`} style={inventorySubTab === tab.id ? { backgroundColor: '#85A383' } : {}}>
                      {tab.count}
                    </span>
                  </div>
                  {inventorySubTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: '#85A383' }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            {decisions.map(item => (
              <div key={item.id} className="bg-white rounded-xl border" style={{ borderColor: '#E7DDCA' }}>
                {/* Header */}
                <div className="p-6 border-b" style={{ borderColor: '#E7DDCA' }}>
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => {
                          if (selectedItems.includes(item.id)) {
                            setSelectedItems(selectedItems.filter(id => id !== item.id));
                          } else {
                            setSelectedItems([...selectedItems, item.id]);
                          }
                        }}
                        className="mt-1.5 w-5 h-5 rounded border-2"
                        style={{ accentColor: '#85A383' }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{item.sku || item.vendor}</h3>
                          {item.skuCode && (
                            <span className="px-2 py-1 rounded text-xs font-mono bg-gray-100 text-gray-600">
                              {item.skuCode}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          {item.category && <span className="font-medium">{item.category}</span>}
                          {item.brand && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span>{item.brand}</span>
                            </>
                          )}
                          {item.urgency && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                item.urgency === 'CRITICAL' ? 'bg-red-100 text-red-700' : 
                                item.urgency === 'HIGH' ? 'bg-orange-100 text-orange-700' : 
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {item.urgency}
                              </span>
                            </>
                          )}
                        </div>

                        {item.event && (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm" style={{ backgroundColor: '#E7DDCA' }}>
                            <Clock className="w-3.5 h-3.5" style={{ color: '#85A383' }} />
                            <span className="font-medium text-gray-900">{item.event}</span>
                          </div>
                        )}
                        
                        {item.issue && (
                          <div className="mt-3 text-sm font-medium text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                            {item.issue}
                          </div>
                        )}
                        
                        {item.contractStatus && (
                          <div className="mt-3 text-sm text-gray-700 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                            {item.contractStatus}
                          </div>
                        )}
                        
                        {/* RECOMMENDATION - PROMINENT */}
                        <div className="mt-5 p-5 rounded-xl" style={{ backgroundColor: '#F0F4F0', border: '2px solid #85A383' }}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#85A383' }} />
                              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#85A383' }}>
                                Recommended Action
                              </span>
                            </div>
                            <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#85A383', color: 'white' }}>
                              {item.recommendation.confidence}% Confidence
                            </div>
                          </div>
                          <div className="text-base font-semibold text-gray-900 mb-3">
                            {item.recommendation.action}
                          </div>
                          <div className="text-sm text-gray-700 leading-relaxed">
                            {item.recommendation.reasoning}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <button
                        onClick={() => setDecisionTrailModal(item)}
                        className="px-4 py-2 text-sm font-medium border-2 rounded-lg hover:bg-gray-50"
                        style={{ borderColor: '#85A383', color: '#85A383' }}
                      >
                        <Activity className="w-4 h-4 inline mr-2" />
                        Decision Trail
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

                {/* Metrics - Inventory */}
                {item.currentState && (
                  <div className="px-6 py-4" style={{ backgroundColor: '#FAFAF8' }}>
                    <div className="grid grid-cols-4 gap-6">
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Network Stock</div>
                        <div className="text-3xl font-light text-gray-900">{item.currentState.networkStock}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Warehouse</div>
                        <div className="text-3xl font-light text-gray-900">{item.currentState.warehouseStock}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Avg ROS</div>
                        <div className="text-3xl font-light text-gray-900">{item.currentState.avgROS}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Last Year ST</div>
                        <div className="text-3xl font-light" style={{ color: '#85A383' }}>{item.currentState.lastYearST}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Metrics - Ageing */}
                {item.ageingProfile && (
                  <div className="px-6 py-4 grid grid-cols-5 gap-4" style={{ backgroundColor: '#F5F0E8' }}>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Total Units</div>
                      <div className="text-2xl font-light">{item.ageingProfile.totalUnits}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Value</div>
                      <div className="text-2xl font-light">{item.ageingProfile.totalValue}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Avg Age</div>
                      <div className="text-2xl font-light">{item.ageingProfile.avgAge}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Sell-Through</div>
                      <div className="text-2xl font-light text-red-600">{item.ageingProfile.currentSellThrough}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Time Window</div>
                      <div className="text-sm font-light">{item.ageingProfile.timeWindow}</div>
                    </div>
                  </div>
                )}

                {/* Metrics - Vendor */}
                {item.metrics && (
                  <div className="px-6 py-4 grid grid-cols-6 gap-4" style={{ backgroundColor: '#F5F0E8' }}>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">Annual NSV</div>
                      <div className="text-lg font-medium">{item.metrics.annualNSV}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">Margin</div>
                      <div className="text-lg font-medium">{item.metrics.marginContribution}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">Sell-Through</div>
                      <div className="text-lg font-medium" style={{ color: '#85A383' }}>{item.metrics.sellThrough}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">Return Rate</div>
                      <div className="text-lg font-light">{item.metrics.returnRate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">OTD</div>
                      <div className="text-lg font-light">{item.metrics.otd}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">Fill Rate</div>
                      <div className="text-lg font-light">{item.metrics.fillRate}</div>
                    </div>
                  </div>
                )}

                {/* Impact Bar */}
                <div className="px-6 py-3 flex items-center gap-8 text-sm" style={{ backgroundColor: '#FAFAF8', borderTop: '1px solid #E7DDCA', borderBottom: '1px solid #E7DDCA' }}>
                  {item.recommendation.qty && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Quantity</span>
                      <span className="font-semibold text-gray-900">{item.recommendation.qty} units</span>
                    </div>
                  )}
                  {item.recommendation.investment && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Investment</span>
                      <span className="font-semibold text-gray-900">{item.recommendation.investment}</span>
                    </div>
                  )}
                  {item.recommendation.annualImpact && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Annual Impact</span>
                      <span className="font-semibold" style={{ color: '#85A383' }}>{item.recommendation.annualImpact}</span>
                    </div>
                  )}
                  {item.recommendation.impact && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Impact</span>
                      <span className="font-semibold" style={{ color: '#85A383' }}>{item.recommendation.impact}</span>
                    </div>
                  )}
                  {item.recommendation.netMarginImpact && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Net Margin</span>
                      <span className="font-semibold text-gray-900">{item.recommendation.netMarginImpact}</span>
                    </div>
                  )}
                  {item.recommendation.cashRecovery && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Cash Recovery</span>
                      <span className="font-semibold" style={{ color: '#85A383' }}>{item.recommendation.cashRecovery}</span>
                    </div>
                  )}
                </div>

                {/* Demand Curve - Only for Buy Planning with demandCurve */}
                {item.demandCurve && (
                  <div className="p-6 border-b" style={{ borderColor: '#E7DDCA' }}>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4" style={{ color: '#85A383' }} />
                      EVENT DEMAND CURVE
                    </h4>
                    <div className="space-y-3">
                      {item.demandCurve.map((phase, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 rounded-lg" style={{ backgroundColor: '#FAFAF8' }}>
                          <div className="w-32">
                            <div className="text-xs font-medium text-gray-900">{phase.phase}</div>
                            <div className="text-xs text-gray-500">{phase.timing}</div>
                          </div>
                          <div className="flex-1 flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <TrendingDown className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">Lift:</span>
                              <span className="text-sm font-semibold" style={{ color: '#85A383' }}>{phase.lift}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Activity className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">Velocity:</span>
                              <span className="text-sm font-medium text-gray-900">{phase.velocity}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">Units Needed:</span>
                              <span className="text-sm font-medium text-gray-900">{phase.units}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Phased Delivery Plan - Only for Buy Planning with phasedDelivery */}
                {item.phasedDelivery && (
                  <div className="p-6 border-b" style={{ borderColor: '#E7DDCA' }}>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Truck className="w-4 h-4" style={{ color: '#85A383' }} />
                      PHASED DELIVERY SCHEDULE
                    </h4>
                    <div className="space-y-3">
                      {item.phasedDelivery.map((delivery, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 rounded-lg border" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: '#85A383' }}>
                            {delivery.delivery}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-1">
                              <span className="text-sm font-medium text-gray-900">{delivery.week}</span>
                              <span className="text-xs text-gray-500">→ Arrives {delivery.arrival}</span>
                              <span className="text-sm font-semibold" style={{ color: '#85A383' }}>{delivery.units} units</span>
                            </div>
                            <div className="text-xs text-gray-600">{delivery.reasoning}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reasoning Breakdown */}
                {item.reasoningBreakdown && (
                  <div className="border-b" style={{ borderColor: '#E7DDCA' }}>
                    <button
                      onClick={() => toggleSection(item.id, 'reasoning')}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                        <Sparkles className="w-4 h-4" style={{ color: '#85A383' }} />
                        WHY THIS RECOMMENDATION
                      </h4>
                      <X className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections[`${item.id}-reasoning`] ? 'rotate-45' : 'rotate-0'}`} />
                    </button>
                    
                    {expandedSections[`${item.id}-reasoning`] && (
                      <div className="px-6 pb-6">
                        <p className="text-sm text-gray-700 leading-relaxed mb-6 p-4 rounded-lg" style={{ backgroundColor: '#FAFAF8' }}>
                          {item.reasoningBreakdown.summary}
                        </p>
                        
                        <div className="space-y-4">
                          {item.reasoningBreakdown.factors.map((factor, idx) => (
                            <div key={idx} className="relative pl-6">
                              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ backgroundColor: '#85A383' }} />
                              <div className="flex items-start justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-900">{factor.name}</span>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-gray-500">{factor.weight}% weight</span>
                                  <span className="px-2 py-1 rounded text-xs font-bold text-white" style={{ backgroundColor: '#85A383' }}>
                                    {factor.score}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{factor.reasoning}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Chat */}
                {chatOpen === item.id && (
                  <div className="px-6 py-4 border-b" style={{ borderColor: '#E7DDCA', backgroundColor: '#F5F0E8' }}>
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                      {(chatMessages[item.id] || []).map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-md px-4 py-2 rounded-lg text-sm ${
                            msg.type === 'user' ? 'bg-gray-200' : ''
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
                        placeholder="Ask about scenarios, risks, alternatives..."
                        className="flex-1 px-4 py-2 border-2 rounded-lg text-sm"
                        style={{ borderColor: '#E7DDCA' }}
                      />
                      <button onClick={() => sendMessage(item.id)} className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#85A383' }}>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* What-If */}
                {item.whatIfScenarios && (
                  <div className="px-6 py-5 border-b" style={{ borderColor: '#E7DDCA' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4" style={{ color: '#85A383' }} />
                      <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">WHAT-IF SCENARIOS</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {item.whatIfScenarios.map((scenario, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setChatOpen(item.id);
                            setCurrentMessage(scenario);
                          }}
                          className="px-4 py-3 text-left text-sm text-gray-700 border rounded-lg hover:border-gray-400 transition-colors"
                          style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}
                        >
                          <MessageSquare className="w-3 h-3 inline mr-2 text-gray-400" />
                          {scenario}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Store Allocation Details */}
                {item.storeAllocation && (
                  <div className="border-b" style={{ borderColor: '#E7DDCA' }}>
                    <button
                      onClick={() => toggleSection(item.id, 'allocation')}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                        <Building2 className="w-4 h-4" style={{ color: '#85A383' }} />
                        STORE ALLOCATION PLAN
                      </h4>
                      <X className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections[`${item.id}-allocation`] ? 'rotate-45' : 'rotate-0'}`} />
                    </button>
                    
                    {expandedSections[`${item.id}-allocation`] && (
                      <div className="px-6 pb-6 space-y-3">
                        {item.storeAllocation.map((allocation, idx) => (
                          <div key={idx} className="p-4 rounded-lg border" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-gray-900">{allocation.cluster}</span>
                              <span className="text-sm font-bold" style={{ color: '#85A383' }}>
                                {allocation.qty} units <span className="text-xs font-normal text-gray-500">({allocation.perStore}/store)</span>
                              </span>
                            </div>
                            <div className="text-xs text-gray-600">{allocation.reasoning}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Transfer Tiers - For Allocation Decisions */}
                {item.transferTiers && (
                  <div className="border-b" style={{ borderColor: '#E7DDCA' }}>
                    <button
                      onClick={() => toggleSection(item.id, 'transfers')}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                        <Move className="w-4 h-4" style={{ color: '#85A383' }} />
                        INTER-STORE TRANSFER PLAN
                      </h4>
                      <X className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections[`${item.id}-transfers`] ? 'rotate-45' : 'rotate-0'}`} />
                    </button>
                    
                    {expandedSections[`${item.id}-transfers`] && (
                      <div className="px-6 pb-6 space-y-6">
                        {item.transferTiers.map((tier, tierIdx) => (
                          <div key={tierIdx}>
                            <div className="mb-3">
                              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                                tier.tier.includes('TIER 1') ? 'text-white' :
                                tier.tier.includes('TIER 2') ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-600'
                              }`} style={tier.tier.includes('TIER 1') ? { backgroundColor: '#85A383' } : {}}>
                                {tier.tier}
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{tier.description}</p>
                              {tier.note && (
                                <p className="text-xs text-gray-500 italic mt-1">{tier.note}</p>
                              )}
                            </div>

                            {tier.transfers && tier.transfers.length > 0 && (
                              <div className="space-y-3">
                                {tier.transfers.map((transfer, idx) => (
                                  <div key={idx} className="p-4 rounded-lg border-2" style={{ 
                                    borderColor: tier.tier.includes('TIER 1') ? '#85A383' : '#E7DDCA',
                                    backgroundColor: '#FAFAF8' 
                                  }}>
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                          tier.tier.includes('TIER 1') ? 'text-white' : 'bg-gray-200 text-gray-700'
                                        }`} style={tier.tier.includes('TIER 1') ? { backgroundColor: '#85A383' } : {}}>
                                          {idx + 1}
                                        </div>
                                        <div>
                                          <div className="text-xs font-medium text-gray-500 mb-1">{transfer.city}</div>
                                          <div className="flex items-center gap-2 text-sm">
                                            <span className="text-gray-700">{transfer.from}</span>
                                            <ArrowRight className="w-4 h-4 text-gray-400" />
                                            <span className="font-semibold" style={{ color: '#85A383' }}>{transfer.to}</span>
                                          </div>
                                        </div>
                                      </div>
                                      {transfer.revenueImpact && (
                                        <div className="text-right">
                                          <div className="text-xs text-gray-500">Revenue Impact</div>
                                          <div className="text-sm font-bold" style={{ color: '#2D9CDB' }}>{transfer.revenueImpact}</div>
                                        </div>
                                      )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                      <div className="space-y-1">
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">Units:</span>
                                          <span className="font-semibold text-gray-900">{transfer.units}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">Cost:</span>
                                          <span className="font-medium text-gray-900">{transfer.cost}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">ETA:</span>
                                          <span className="font-medium text-gray-900">{transfer.eta}</span>
                                        </div>
                                      </div>
                                      <div className="space-y-1">
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">From Stock:</span>
                                          <span className="text-gray-700">{transfer.fromStock} @ {transfer.fromROS}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">To Stock:</span>
                                          <span className="text-gray-700">{transfer.toStock} @ {transfer.toROS}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-500">GST:</span>
                                          <span className="font-medium" style={{ color: transfer.gstImpact === 'None (same city)' || transfer.gstImpact === 'None (same state)' || transfer.gstImpact === 'None (intra-state)' || transfer.gstImpact === 'None (within NCR)' ? '#85A383' : '#D97706' }}>
                                            {transfer.gstImpact}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {transfer.feasibility && (
                                      <div className="mt-3 pt-3 border-t" style={{ borderColor: '#E7DDCA' }}>
                                        <div className="flex items-center justify-between">
                                          <span className="text-xs text-gray-500">Operational Feasibility:</span>
                                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                            transfer.feasibility === 'HIGH' ? 'bg-green-100 text-green-700' :
                                            transfer.feasibility === 'MEDIUM-HIGH' ? 'bg-green-100 text-green-700' :
                                            transfer.feasibility === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                          }`}>
                                            {transfer.feasibility}
                                          </span>
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
                  </div>
                )}

                {/* Specific Actions - For Ageing Inventory */}
                {item.specificActions && (
                  <div className="p-6 border-b" style={{ borderColor: '#E7DDCA' }}>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" style={{ color: '#85A383' }} />
                      CLEARANCE ACTIONS
                    </h4>
                    <div className="space-y-3">
                      {item.specificActions.map((action, idx) => (
                        <div key={idx} className="p-4 rounded-lg border-2" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                          <div className="text-sm font-semibold text-gray-900 mb-2">{action.action}</div>
                          <div className="text-xs text-gray-600 leading-relaxed">{action.reasoning}</div>
                          {action.targetUnits && (
                            <div className="mt-2 pt-2 border-t" style={{ borderColor: '#E7DDCA' }}>
                              <span className="text-xs text-gray-500">Target: <span className="font-semibold text-gray-900">{action.targetUnits} units</span></span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Negotiation Package for Vendors */}
                {item.negotiationPackage && (
                  <div className="p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Prioritized Negotiation Package</h4>
                    <div className="space-y-3">
                      {item.negotiationPackage.map((pkg, idx) => (
                        <div key={idx} className="p-4 rounded-lg border-2" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: '#85A383' }}>
                                {pkg.priority}
                              </div>
                              <div className="text-sm font-medium text-gray-900">{pkg.ask}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                pkg.likelihood === 'High' ? 'bg-green-100 text-green-700' :
                                pkg.likelihood === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {pkg.likelihood}
                              </span>
                              <span className="text-sm font-medium" style={{ color: '#2D9CDB' }}>{pkg.impact}</span>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm mb-3">
                            <div><span className="text-gray-500">Reasoning: </span><span className="text-gray-700">{pkg.reasoning}</span></div>
                            <div><span className="text-gray-500">Leverage: </span><span className="text-gray-700">{pkg.leverage}</span></div>
                          </div>
                          {pkg.dataPoints && (
                            <div className="pt-3 border-t" style={{ borderColor: '#E7DDCA' }}>
                              <div className="text-xs font-medium text-gray-500 mb-2">Supporting Data:</div>
                              <div className="space-y-1">
                                {pkg.dataPoints.map((point, pidx) => (
                                  <div key={pidx} className="text-xs text-gray-600 flex items-start gap-2">
                                    <span className="text-gray-400">•</span>
                                    <span>{point}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Current Terms */}
                    {item.currentTerms && (
                      <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#F5F0E8' }}>
                        <h5 className="text-xs font-medium text-gray-500 mb-3 uppercase">Current Contract Terms</h5>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <div className="text-xs text-gray-500">Base Margin</div>
                            <div className="text-sm font-medium">{item.currentTerms.baseMargin}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Incentive</div>
                            <div className="text-sm font-medium">{item.currentTerms.sellOutIncentive}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">RTV</div>
                            <div className="text-sm font-medium">{item.currentTerms.rtvAllowed ? `✓ ${item.currentTerms.rtvPercentage}%` : '✗'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Payment</div>
                            <div className="text-sm font-medium">{item.currentTerms.paymentTerms}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <DecisionTrailModal item={decisionTrailModal} />
    </div>
  );
}
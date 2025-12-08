"use client"
import React, { useEffect, useState } from 'react';
import { 
  Package, Download, Search, MessageSquare, Truck, Send, Bell, 
  Activity, Clock, Building2, Settings, Filter, X, Sparkles,
  Check, ShoppingCart, LayoutDashboard, Move, RotateCcw, 
  TrendingDown, ArrowRight, Store, MapPin
} from 'lucide-react';

export default function CromaSupplyChainDashboard() {
  const [currentSection, setCurrentSection] = useState('inventory');
  const [inventorySubTab, setInventorySubTab] = useState('buy-planning');
  const [selectedItems, setSelectedItems] = useState([]);
  const [decisionTrailModal, setDecisionTrailModal] = useState(null);
  const [chatOpen, setChatOpen] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    console.log(currentSection)
  }, [currentSection])

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

  // Buy Planning Decisions (3 cards)
  const buyPlanningDecisions = [
    {
      id: 'BP001',
      sku: 'Samsung Neo QLED 65" QN90D',
      skuCode: 'TV065SAM',
      category: 'Large Screen TVs',
      brand: 'Samsung',
      urgency: 'HIGH',
      event: 'Cricket World Cup + Diwali',
      currentState: {
        networkStock: 180,
        warehouseStock: 45,
        avgROS: '2.8/d',
        lastYearST: '87%'
      },
      recommendation: {
        action: 'Place Order: 1,015 Units with Phased Delivery',
        reasoning: 'This buy is urgent because Cricket World Cup (Sep 20-Nov 10) overlaps with Diwali creating a once-a-year convergence that historically drives 3.2x demand spike. Current network stock of 180 units will last only 21 days at baseline, but event demand will exhaust it in 6-7 days. Samsung can deliver in 2 weeks with 94% reliability, perfectly timed for pre-event positioning. The 18% margin with 3.5% incentive at 90% ST protects profitability. Vendor capacity is limited to 1,000 units nationally - early commitment secures allocation.',
        qty: 1015,
        investment: '₹16.5Cr',
        confidence: 91
      },
      reasoningBreakdown: {
        summary: 'This buy is urgent because Cricket World Cup (Sep 20-Nov 10) overlaps with Diwali creating a once-a-year convergence. Current stock of 180 units will exhaust in 6-7 days under event demand (vs 21 days baseline). Samsung can deliver in 2 weeks with 94% reliability, perfectly timed. The 18% margin with sell-out incentive protects ROI. Vendor capacity limited to 1,000 units nationally - early commitment critical.',
        factors: [
          {
            name: 'Inventory',
            weight: 35,
            score: 92,
            reasoning: 'Current 180 units + 45 warehouse = 225 total. At event velocity (2.8 × 3.2 = 8.96/d), stock lasts only 25 days. Need 1,015 units to cover 8-week event window with safety buffer. Historical 87% ST gives high confidence.'
          },
          {
            name: 'Marketing',
            weight: 30,
            score: 88,
            reasoning: 'Cricket World Cup (240M viewers/match) starts Sep 20. Diwali peak Oct 25-Nov 5. Dual events drive 185% cricket lift + 78% Diwali lift. Joint ₹2.8Cr campaign planned with Samsung creates urgency for stock availability.'
          },
          {
            name: 'Supply Chain',
            weight: 20,
            score: 95,
            reasoning: 'Samsung has 2-week lead time with 94% on-time delivery. Raw materials in stock, MOQ is 50 units (easily met). Critical constraint: only 1,000 units available nationally. We need 1,015 (entire allocation). Must commit now.'
          },
          {
            name: 'Pricing',
            weight: 15,
            score: 90,
            reasoning: 'Full-price strategy at ₹1,62,500 holds through events (no markdown until Dec 20). Strong 18% base margin + 3.5% incentive at 90% ST = 21.5% total margin. Price protection for 60 days covers event window.'
          }
        ]
      },
      storeAllocation: [
        { cluster: 'Flagship (5 stores)', qty: 195, perStore: 39, reasoning: 'Premium locations with highest event traffic' },
        { cluster: 'Metro A+ (15 stores)', qty: 420, perStore: 28, reasoning: '2.1 ROS average, strong cricket viewership demographic' },
        { cluster: 'Metro A (28 stores)', qty: 280, perStore: 10, reasoning: 'Maintain presence, focus on entry-tier models' },
        { cluster: 'Experience Centers (8 stores)', qty: 120, perStore: 15, reasoning: 'Demo-driven sales, extended dwell time' }
      ],
      demandDrivers: [
        { factor: 'Cricket World Cup viewership', impact: '+185%', confidence: 94 },
        { factor: 'Diwali gifting & home upgrades', impact: '+78%', confidence: 97 },
        { factor: 'Competitive pricing vs online', impact: '+24%', confidence: 82 }
      ],
      vendorTerms: {
        supplier: 'Samsung India',
        baseMargin: 18,
        sellOutIncentive: '2.5% at 80%, 3.5% at 90%',
        rtvPercentage: 5,
        leadTime: '2 weeks'
      },
      whatIfScenarios: [
        'What if we only secure 800 units instead of 1,015?',
        'What if cricket finals viewership is 30% lower than forecasted?',
        'What if we split 70-30 between this model and cheaper 55" variant?',
        'What if Diwali shopping starts 2 weeks earlier than projected?'
      ],
      decisionTrail: [
        { 
          time: '08:15:22', 
          agent: 'Orchestrator', 
          action: 'Event-Based Buy Planning Triggered', 
          thinking: 'Detected two major sales events converging: Cricket World Cup (Sep 20-Nov 10) + Diwali (Oct 25-Nov 5). High-impact category: Large screen TVs 55"+. Routing to multi-agent analysis pipeline.' 
        },
        { 
          time: '08:15:28', 
          agent: 'Inventory Agent', 
          action: 'Query Current Stock Levels',
          database: 'inventory_management',
          query: 'SELECT SUM(current_stock) as network_stock FROM inventory WHERE sku="TV065SAM" AND status="available"',
          data: { networkStock: 180, warehouseStock: 45, totalAvailable: 225 },
          thinking: 'Current stock: 180 in stores + 45 in warehouse = 225 total. At baseline velocity (2.8/d), this covers 80 days. But event demand will be 3-4x higher. Need to calculate event-specific requirements.' 
        },
        { 
          time: '08:15:45', 
          agent: 'Demand Forecast Agent', 
          action: 'Historical Event Analysis - Cricket World Cup',
          database: 'sales_history',
          query: 'SELECT event_type, year, category, SUM(units_sold) as units, AVG(sell_through) as st FROM event_sales WHERE category="TV" AND screen_size>=55 AND event_type="cricket_worldcup" GROUP BY year',
          data: { 
            cricket2019: { units: 2840, st: 91, baselineLift: 3.4 },
            cricket2023: { units: 2640, st: 87, baselineLift: 3.1 },
            avgLift: 3.2
          },
          thinking: 'Cricket World Cup consistently drives 3x+ demand for large screen TVs. 2019 saw 3.4x lift, 2023 saw 3.1x lift. Conservative estimate: 3.2x baseline = 2.8 × 3.2 = 8.96 units/day event velocity.' 
        },
        { 
          time: '08:16:12', 
          agent: 'Demand Forecast Agent', 
          action: 'Historical Event Analysis - Diwali Overlap',
          database: 'sales_history',
          query: 'SELECT MONTH(sale_date) as month, SUM(units_sold) as units FROM sales WHERE category="TV_Premium" AND YEAR(sale_date) IN (2022,2023,2024) GROUP BY month',
          data: { 
            oct: { units: 4820, percentOfAnnual: 28 },
            nov: { units: 3240, percentOfAnnual: 19 },
            diwaliLift: 1.78
          },
          thinking: 'Diwali drives 78% lift independently. When combined with Cricket (rare overlap), effects multiply rather than add. Total expected lift: 185% (cricket) + 78% (diwali) but with synergy. Event window: 8 weeks (Sep 20 - Nov 15).' 
        },
        { 
          time: '08:16:48', 
          agent: 'Demand Forecast Agent', 
          action: 'Calculate Required Inventory',
          thinking: 'Event window: 56 days. Event velocity: 8.96/d. Base requirement: 56 × 8.96 = 502 units. Add 15% safety buffer for velocity variance: 502 × 1.15 = 577 units. Add flagship store pre-positioning (30 stores × 15 units): 450 units. Total need: 1,027 units. Current stock: 225. Net order: 802 units minimum. Recommendation: Round to 1,015 for allocation efficiency (Samsung prefers multiples of 5).' 
        },
        { 
          time: '08:17:24', 
          agent: 'Marketing Agent', 
          action: 'Query Active Campaign Calendar',
          database: 'marketing_calendar',
          query: 'SELECT campaign_name, start_date, end_date, budget, expected_traffic_lift FROM campaigns WHERE status="approved" AND category IN ("TVs","Electronics") AND start_date BETWEEN "2025-09-01" AND "2025-11-30"',
          data: { 
            campaign: 'Cricket + Diwali Mega Sale',
            budget: '₹2.8Cr',
            expectedLift: '25-30% traffic',
            cricketSponsorship: 'Official partner - 15 stores with viewing zones'
          },
          thinking: 'Approved ₹2.8Cr joint campaign with Samsung for Cricket + Diwali. This drives urgency - we MUST have stock before campaign launch Sep 20. Samsung co-funding 40% (₹1.12Cr). 15 flagship stores will have cricket viewing zones - these need heavy inventory (30-40 units each).' 
        },
        { 
          time: '08:18:05', 
          agent: 'Supply Chain Agent', 
          action: 'Check Samsung Lead Time & Capacity',
          database: 'supplier_contracts',
          query: 'SELECT supplier_name, lead_time_days, on_time_delivery_rate, current_capacity, national_allocation FROM suppliers WHERE sku="TV065SAM"',
          data: { 
            supplier: 'Samsung India',
            leadTime: '14 days',
            otd: 94,
            nationalCapacity: 1000,
            cromaCurrentAllocation: 0
          },
          thinking: 'Samsung lead time: 14 days (2 weeks). OTD rate: 94% (excellent). CRITICAL CONSTRAINT: Only 1,000 units available for entire India across all retailers. We are requesting 1,015 units - essentially asking for full allocation. This requires strong relationship leverage and immediate commitment. First-come-first-served basis.' 
        },
        { 
          time: '08:18:42', 
          agent: 'Vendor Economics Agent', 
          action: 'Analyze Samsung Terms & ROI',
          database: 'vendor_contracts',
          query: 'SELECT base_margin, incentive_tiers, rtv_percentage, price_protection_days FROM vendor_terms WHERE vendor="Samsung" AND category="Premium_TVs"',
          data: {
            baseMargin: 18,
            incentive: '2.5% at 80% ST, 3.5% at 90% ST',
            rtv: 5,
            priceProtection: 60
          },
          thinking: 'Terms are favorable: 18% base margin + 3.5% incentive at 90% ST (we historically hit 87%, very achievable) = 21.5% total margin. Price protection for 60 days covers entire event window. Low RTV (5%) but historical 87% ST means low risk. Investment: 1,015 × ₹1.45L cost = ₹14.72Cr. Expected revenue at 90% ST: ₹14.9Cr. Gross margin: ₹3.2Cr.' 
        },
        { 
          time: '08:19:28', 
          agent: 'Pricing Agent', 
          action: 'Verify Pricing Strategy',
          database: 'pricing_rules',
          query: 'SELECT current_mrp, competitive_price_avg, markdown_calendar FROM pricing WHERE sku="TV065SAM"',
          data: {
            mrp: '₹1,62,500',
            competitorAvg: '₹1,58,900',
            nextMarkdown: 'Dec 20, 2025',
            marginSafety: '52% gross margin'
          },
          thinking: 'Current pricing holds through entire event (no markdown until Dec 20 - 45 days post-event). We are positioned ₹3,600 above market avg but premium placement and Samsung brand justify it. Strong 52% gross margin provides buffer. No pricing risk during event window.' 
        },
        { 
          time: '08:20:15', 
          agent: 'Store Network Agent', 
          action: 'Optimal Store Allocation by Cluster',
          database: 'store_performance',
          query: 'SELECT store_cluster, AVG(ros) as avg_ros, event_performance_multiplier, cricket_viewership_index FROM store_metrics WHERE category="TVs" AND screen_size="65+" GROUP BY store_cluster',
          data: {
            flagship: { ros: 2.8, eventMult: 4.2, cricketIndex: 0.95, allocation: 195 },
            metroAPlus: { ros: 2.1, eventMult: 3.8, cricketIndex: 0.88, allocation: 420 },
            metroA: { ros: 0.9, eventMult: 2.4, cricketIndex: 0.62, allocation: 280 },
            experienceCenters: { ros: 2.2, eventMult: 4.0, cricketIndex: 0.91, allocation: 120 }
          },
          thinking: 'Flagship and Experience Centers show strongest event response (4x+ multiplier) and highest cricket viewership index (0.9+). Recommend 60% allocation to these high-impact clusters. Metro A+ important for volume (15 stores). Metro A gets maintenance presence only.' 
        },
        { 
          time: '08:21:30', 
          agent: 'Risk Assessment Agent', 
          action: 'Evaluate Downside Scenarios',
          thinking: 'Risk 1: Event underperforms - Mitigation: 5% RTV + historical 87% ST provides safety net. Risk 2: Can\'t secure full 1,015 allocation - Mitigation: Accept minimum 800 units, prioritize flagship stores. Risk 3: Samsung delivery delays - Mitigation: 94% OTD is excellent, build 1 week buffer into planning. Risk 4: Competitor undercutting - Mitigation: Samsung co-marketing creates differentiation, installation bundling adds value. Overall risk: LOW-MEDIUM.' 
        },
        { 
          time: '08:22:45', 
          agent: 'Decision Engine', 
          action: 'Final Recommendation Synthesis',
          thinking: 'All signals strongly support IMMEDIATE ORDER of 1,015 units: (1) Demand forecast shows 3.2x event lift - need 1,027 units, (2) Marketing campaign approved with ₹2.8Cr budget launching Sep 20, (3) Samsung capacity constrained to 1,000 national - first-come-first-served, (4) Financial terms excellent: 21.5% margin, ₹3.2Cr gross profit, (5) Lead time 2 weeks aligns perfectly with event start. CRITICAL ACTION: Contact Samsung TODAY to secure allocation. Every day of delay risks losing units to competitors. Confidence: 91% (high). Recommendation: APPROVE ORDER IMMEDIATELY.' 
        }
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
        reasoning: 'This order is critical because current stock of 24 units provides only 5.7 days coverage at 4.2/d velocity. Holiday gaming season (Nov-Dec) drives 65% of annual console sales with major game releases (GTA VI, FC25) creating additional 145% lift. Amazon and Flipkart showing "out of stock" for 2 weeks - massive market share opportunity. Sony can deliver in 10-12 days with express option. Despite thin 8% margin, 98% historical ST and ₹4.67Cr revenue at stake justify immediate action.',
        qty: 850,
        investment: '₹4.67Cr',
        confidence: 96
      },
      reasoningBreakdown: {
        summary: 'This order is critical because current stock of 24 units will last only 5.7 days at baseline 4.2/d velocity. Holiday gaming season drives 65% of annual console sales. New game releases (GTA VI, FC25) add 145% demand lift. Competitors Amazon and Flipkart out of stock for 2 weeks - huge market opportunity. Despite thin 8% margin, 98% historical ST provides confidence.',
        factors: [
          {
            name: 'Inventory',
            weight: 40,
            score: 95,
            reasoning: 'Critically low: 24 units with 4.2/d velocity = 5.7 days stock. Holiday season needs 8-week coverage. Warehouse empty. Last year 98% sell-through shows demand is real and sustained.'
          },
          {
            name: 'Marketing',
            weight: 35,
            score: 94,
            reasoning: 'Holiday gifting drives 65% annual console sales. GTA VI launch expected Nov 15 (+145% lift). FC25 already launched creating momentum. Gaming zones in 12 stores will run tournaments and demos - need stock.'
          },
          {
            name: 'Supply Chain',
            weight: 15,
            score: 88,
            reasoning: 'Sony standard lead time 10-12 days. Express delivery available for +₹45K. India allocation limited. Competitors out of stock creates urgency - Sony may prioritize us if we order large quantity now.'
          },
          {
            name: 'Competition',
            weight: 10,
            score: 96,
            reasoning: 'Amazon and Flipkart showing "out of stock" for 2 weeks. Reliance Digital low inventory. This is rare market share opportunity - customers will buy from whoever has stock. First-mover advantage critical.'
          }
        ]
      },
      storeAllocation: [
        { cluster: 'Gaming Zones (12 stores)', qty: 360, perStore: 30, reasoning: 'Dedicated gaming sections with expert staff' },
        { cluster: 'Metro A++ (8 stores)', qty: 240, perStore: 30, reasoning: 'Young affluent demographic, strong pre-order pipeline' },
        { cluster: 'Experience Centers (6 stores)', qty: 180, perStore: 30, reasoning: 'Demo stations drive 42% higher conversion' }
      ],
      demandDrivers: [
        { factor: 'Holiday gifting season', impact: '+380%', confidence: 98 },
        { factor: 'New game releases (GTA VI, FC25)', impact: '+145%', confidence: 92 },
        { factor: 'Competitor stockouts', impact: '+62%', confidence: 85 }
      ],
      vendorTerms: {
        supplier: 'Sony India',
        baseMargin: 8,
        sellOutIncentive: '2% at 95%',
        rtvPercentage: 0,
        leadTime: '10-12 days express'
      },
      whatIfScenarios: [
        'What if GTA VI launch gets delayed to Q1 2026?',
        'What if we bundle with 2 games instead of 3 to reduce price?',
        'What if Sony announces PS5 Pro during our sales window?',
        'What if we allocate 60% to online vs 40% stores?'
      ],
      decisionTrail: []
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
        action: 'Strategic Build: 2,400 Units over 8 Weeks',
        reasoning: 'Pre-season inventory build for peak summer demand (Apr-Jun). Early positioning captures consumer research phase. Supplier lead time 3-4 weeks requires Feb order for Mar availability.',
        qty: 2400,
        investment: '₹9.36Cr',
        confidence: 84
      },
      storeAllocation: [
        { cluster: 'North & Central (85 stores)', qty: 1440, perStore: 17, reasoning: 'Highest summer temperatures, 68% of AC sales volume' },
        { cluster: 'West (42 stores)', qty: 528, perStore: 13, reasoning: 'Urban heat island effect in metros' },
        { cluster: 'South (28 stores)', qty: 336, perStore: 12, reasoning: 'Year-round demand but lower peak seasonality' }
      ],
      demandDrivers: [
        { factor: 'Pre-season research & purchase', impact: '+85%', confidence: 88 },
        { factor: 'IMD summer forecast: Above normal temps', impact: '+42%', confidence: 79 },
        { factor: 'EMI schemes during pre-season', impact: '+28%', confidence: 91 }
      ],
      vendorTerms: {
        supplier: 'Voltas (Tata)',
        baseMargin: 14,
        sellOutIncentive: '2% at 75%, 3% at 85%',
        rtvPercentage: 15,
        leadTime: '3-4 weeks'
      },
      whatIfScenarios: [
        'What if summer temperatures are below normal (El Niño effect)?',
        'What if we order 30% more and push aggressive pre-season discounts?',
        'What if competitor launches inverter AC at ₹32,990?',
        'What if we focus 80% allocation on North region only?'
      ],
      decisionTrail: []
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
        flagship: { qty: 58, ros: '12.4/d', stockDays: 4.7 },
        metroAPlus: { qty: 52, ros: '8.2/d', stockDays: 6.3 },
        metroA: { qty: 28, ros: '3.1/d', stockDays: 9.0 },
        tier1: { qty: 4, ros: '0.8/d', stockDays: 5.0 }
      },
      recommendation: {
        action: 'Emergency Transfer: 15 Units from Metro A to Flagship Stores',
        reasoning: 'Flagship stores will stock out in 4.7 days while Metro A has 9 days coverage. Transfer prevents revenue loss during high-demand period.',
        confidence: 94,
        impact: '₹18.2L revenue protection'
      },
      reasoningBreakdown: {
        summary: 'This transfer is critical because flagship stores (Croma BKC, Inorbit) will stock out in under 5 days with 12.4 units/day velocity, while Metro A stores have excess inventory with 9 day coverage at only 3.1 units/day. The 15.5x velocity gap creates immediate opportunity. Apple has no warehouse stock, making inter-store transfers the only solution. Transfer protects ₹18.2L in high-margin revenue.',
        factors: [
          {
            name: 'Inventory',
            weight: 40,
            score: 96,
            reasoning: 'Flagship stores critically low at 4.7 days stock with 12.4/d velocity. Metro A overstocked at 9 days with 3.1/d velocity. Velocity gap of 4x justifies immediate rebalancing.'
          },
          {
            name: 'Revenue Impact',
            weight: 35,
            score: 93,
            reasoning: 'Flagship stores drive 68% of iPhone revenue. Each stockout day costs ₹4.2L. Metro A contributes only 12% of revenue. Transfer maximizes revenue capture.'
          },
          {
            name: 'Supply Chain',
            weight: 15,
            score: 88,
            reasoning: 'Apple warehouse has zero stock. Next allocation in 8 days. Inter-store transfer (24-hour logistics) is only option to prevent stockout.'
          },
          {
            name: 'Customer Experience',
            weight: 10,
            score: 91,
            reasoning: 'Flagship stores serve premium customers expecting immediate availability. Stockout creates brand damage and drives customers to competition.'
          }
        ]
      },
      specificActions: [
        {
          type: 'transfer',
          from: 'Croma Select City Delhi',
          fromStock: 8,
          fromROS: '2.8/d',
          to: 'Croma BKC Mumbai',
          toStock: 12,
          toROS: '14.2/d',
          units: 6,
          cost: '₹2,400',
          eta: '24 hours',
          revenueImpact: '₹10.8L'
        },
        {
          type: 'transfer',
          from: 'Croma Pacific Mall Delhi',
          fromStock: 12,
          fromROS: '3.4/d',
          to: 'Croma Inorbit Mumbai',
          toStock: 18,
          toROS: '11.8/d',
          units: 5,
          cost: '₹2,000',
          eta: '24 hours',
          revenueImpact: '₹8.5L'
        },
        {
          type: 'transfer',
          from: 'Croma Ambience Gurgaon',
          fromStock: 8,
          fromROS: '2.9/d',
          to: 'Croma Forum Bangalore',
          toStock: 10,
          toROS: '10.2/d',
          units: 4,
          cost: '₹2,800',
          eta: '36 hours',
          revenueImpact: '₹6.4L'
        }
      ],
      whatIfScenarios: [
        'What if we transfer 20 units instead of 15?',
        'What if iPhone 16 announcement happens next week?',
        'What if Apple suddenly allocates 50 units to us tomorrow?',
        'What if we increase prices by 3% to slow flagship demand?'
      ],
      decisionTrail: []
    },
    {
      id: 'AL002',
      sku: 'Samsung Front-Load Washer 9kg',
      skuCode: 'WM09SAM',
      category: 'Washing Machines',
      brand: 'Samsung',
      urgency: 'HIGH',
      issue: 'Regional Preference Mismatch',
      currentDistribution: {
        total: 380,
        north: { qty: 152, ros: '1.2/d', preference: 'Top-load 68%' },
        south: { qty: 95, ros: '2.8/d', preference: 'Front-load 71%' },
        west: { qty: 95, ros: '2.1/d', preference: 'Front-load 58%' }
      },
      recommendation: {
        action: 'Rebalance 65 Units: North → South/West',
        reasoning: 'This rebalancing is necessary because current allocation mismatches regional preferences. North India has 152 units (40% of inventory) but prefers top-load washers (68% of sales), resulting in slow 1.2/d velocity. South India prefers front-load (71% of category) but has only 95 units (25% of inventory), creating 2.8/d velocity - 2.3x faster than North. The 65-unit transfer from low-velocity North stores to high-velocity South/West stores will improve overall network sell-through by 18 percentage points and generate ₹8.4L incremental revenue.',
        confidence: 89,
        impact: '₹8.4L revenue uplift'
      },
      reasoningBreakdown: {
        summary: 'Current allocation mismatches regional preferences. North has 152 units (40%) but prefers top-load (68% of sales), velocity only 1.2/d. South prefers front-load (71%) but has just 95 units (25%), velocity 2.8/d. Transfer 65 units from North to South/West improves network ST by 18pts, generates ₹8.4L revenue.',
        factors: [
          {
            name: 'Regional Preferences',
            weight: 40,
            score: 94,
            reasoning: 'South: 71% prefer front-load (water availability, apartments). North: 68% prefer top-load (water scarcity, space). West: 58% front-load (mixed). Structural preference differences drive velocity gap.'
          },
          {
            name: 'Velocity Mismatch',
            weight: 35,
            score: 91,
            reasoning: 'South velocity 2.8/d vs North 1.2/d = 2.3x gap. South will stock out in 34 days while North has 127 days coverage. Immediate rebalancing prevents South stockouts and unlocks stranded North inventory.'
          },
          {
            name: 'Revenue Impact',
            weight: 15,
            score: 87,
            reasoning: 'Each unit transferred generates ₹1.3L revenue in South (2.8/d velocity) vs ₹46K in North (1.2/d). 65 units × ₹84K incremental = ₹54.6L incremental revenue over 90 days. Margin: ₹8.4L.'
          },
          {
            name: 'Logistics',
            weight: 10,
            score: 88,
            reasoning: 'Delhi→Bangalore 36-48hrs, Delhi→Chennai 48hrs via road freight. Cost: ₹480-600/unit. Total transfer cost ₹31K-39K. ROI on transfer: 21x (₹8.4L revenue / ₹35K cost).'
          }
        ]
      },
      specificActions: [
        {
          type: 'transfer',
          from: 'Croma Pacific Mall Delhi',
          fromStock: 14,
          fromROS: '0.8/d',
          to: 'Croma Forum Bangalore',
          toStock: 6,
          toROS: '3.2/d',
          units: 8,
          cost: '₹3,840',
          eta: '36 hours',
          revenueImpact: '₹4.8L'
        },
        {
          type: 'transfer',
          from: 'Croma Select City Delhi',
          fromStock: 18,
          fromROS: '1.1/d',
          to: 'Croma Phoenix Chennai',
          toStock: 4,
          toROS: '2.9/d',
          units: 10,
          cost: '₹5,200',
          eta: '48 hours',
          revenueImpact: '₹5.8L'
        }
      ],
      whatIfScenarios: [
        'What if we replace North front-load with top-load instead of transfer?',
        'What if water crisis in Bangalore reduces front-load preference?',
        'What if we run a North-focused campaign to shift preferences?'
      ],
      decisionTrail: []
    },
    {
      id: 'AL003',
      sku: 'LG 55" OLED C3 4K TV',
      skuCode: 'TV055LGO',
      category: 'Premium TVs',
      brand: 'LG',
      urgency: 'HIGH',
      issue: 'Emergency Transfer for Event-Driven Demand',
      currentDistribution: {
        total: 86,
        highVelocity: { stores: 8, qty: 34, ros: '2.8/d' },
        mediumVelocity: { stores: 18, qty: 42, ros: '1.2/d' },
        lowVelocity: { stores: 12, qty: 10, ros: '0.3/d' }
      },
      recommendation: {
        action: 'Emergency Transfer: 18 Units to High-Velocity Stores',
        reasoning: 'UEFA Champions League Finals + Cricket T20 World Cup next week. High-velocity stores (premium sports zones) will stock out in 3 days.',
        confidence: 94,
        impact: '₹21.6L revenue protection'
      },
      specificActions: [
        {
          type: 'transfer',
          from: 'Croma Hiranandani Mumbai',
          fromStock: 8,
          to: 'Croma Phoenix Mumbai (Sports Zone)',
          toStock: 3,
          units: 5,
          eta: '4 hours',
          revenueImpact: '₹7.5L'
        },
        {
          type: 'transfer',
          from: 'Croma Amanora Pune',
          fromStock: 6,
          to: 'Croma BKC Mumbai (Premium Sports)',
          toStock: 2,
          units: 4,
          eta: '18 hours',
          revenueImpact: '₹6.0L'
        }
      ],
      whatIfScenarios: [
        'What if we execute transfers but finals viewership disappoints?',
        'What if we pull from warehouse instead of store transfers?',
        'What if we offer pre-booking with 48hr delivery promise?'
      ],
      decisionTrail: []
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
      issue: 'Pre-Launch Clearance - iPhone 16 Announcement in 10 Days',
      ageingProfile: {
        totalUnits: 234,
        totalValue: '₹2.81Cr',
        avgAge: '45 days',
        currentSellThrough: '68%',
        timeWindow: '10 days until iPhone 16 launch'
      },
      recommendation: {
        action: 'Aggressive 3-Pronged Clearance: Trade-In Boost + Flash Sale + Consolidation',
        reasoning: 'This clearance is urgent because iPhone 16 announcement in 10 days will crash iPhone 14 demand by 80%+ based on historical launch patterns. Current 68% sell-through leaves 234 units at risk. The 3-pronged strategy maximizes clearance: Enhanced ₹50K trade-in (vs ₹42K) converts upgraders early and builds iPhone 16 pipeline. 48-hour flash sale at ₹79,900 (vs ₹89,900) creates urgency and matches online pricing. Consolidation to flagship stores concentrates sales force on final push. Net margin hit of ₹8.2L is acceptable to recover ₹2.68Cr cash and avoid deeper write-offs post-launch.',
        confidence: 91,
        netMarginImpact: '-₹8.2L',
        cashRecovery: '₹2.68Cr'
      },
      reasoningBreakdown: {
        summary: 'iPhone 16 announcement in 10 days will crash iPhone 14 demand by 80%+. Current velocity won\'t clear 234 units. Strategy: Enhanced trade-in (₹50K vs ₹42K) converts 140 units, flash sale (₹79,900) moves 70 units, consolidation to flagships maximizes final 7-day push. Accept ₹8.2L margin hit to recover ₹2.68Cr cash.',
        factors: [
          {
            name: 'Inventory',
            weight: 35,
            score: 88,
            reasoning: '234 units aged 45 days, only 68% sold. At current velocity (1.2/d), 195 days to clear. Post-iPhone 16, demand drops 80% = 975 days to clear. Immediate action critical.'
          },
          {
            name: 'Product Lifecycle',
            weight: 30,
            score: 92,
            reasoning: 'iPhone 16 launches in 10 days with better camera, A18 chip, new design. Historical pattern: iPhone 14 demand dropped 82% within 1 week of iPhone 15 launch. Same will happen again. Window closing fast.'
          },
          {
            name: 'Pricing',
            weight: 20,
            score: 85,
            reasoning: 'Current price ₹89,900 vs Amazon ₹84,900. Need aggressive action. Flash sale at ₹79,900 creates competitive advantage. Enhanced trade-in (₹50K) makes upgrade compelling. Margin hit acceptable vs inventory risk.'
          },
          {
            name: 'Competition',
            weight: 15,
            score: 90,
            reasoning: 'Amazon, Flipkart already clearing iPhone 14 aggressively (₹12K discounts). Reliance running ₹15K exchange offers. We need to match or beat to move units. Market is racing to clear before iPhone 16.'
          }
        ]
      },
      specificActions: [
        {
          type: 'tradeInBoost',
          action: 'Enhanced Trade-In: ₹8,000 Extra for iPhone 14 → iPhone 16',
          currentTradeIn: '₹42,000',
          enhancedTradeIn: '₹50,000',
          targetUnits: 140,
          totalCost: '₹11.2L',
          reasoning: 'Converts upgraders early, clears stock pre-launch, builds iPhone 16 pipeline'
        },
        {
          type: 'flashSale',
          action: '48-Hour Flash Sale: ₹89,900 → ₹79,900',
          discount: '₹10,000 (11%)',
          targetUnits: 70,
          reasoning: 'Price competitive with online, creates urgency, clears mid-tier stock'
        },
        {
          type: 'consolidation',
          action: 'Consolidate to Top 5 Flagship Stores',
          units: 34,
          reasoning: 'Concentrate remaining inventory in highest-traffic stores for final 7-day push'
        }
      ],
      whatIfScenarios: [
        'What if iPhone 16 launch gets delayed by 3 weeks?',
        'What if we skip flash sale and only focus on trade-in program?',
        'What if Apple announces iPhone 16 price ₹20K higher than iPhone 14 launch?'
      ],
      decisionTrail: []
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
        timeWindow: 'Off-season until Feb 2026 (4 months)'
      },
      recommendation: {
        action: 'Strategic Off-Season Campaign + Partial RTV + Warehouse Consolidation',
        reasoning: 'Window ACs have 4-month off-season trough. Strategy: Clear 60% through campaign, RTV 25%, warehouse 15% for pre-season.',
        confidence: 83,
        netMarginImpact: '-₹2.8L',
        cashRecovery: '₹49.2L'
      },
      specificActions: [
        {
          type: 'offSeasonCampaign',
          action: 'Off-Season Value Campaign: ₹29,990 → ₹25,990',
          discount: '₹4,000 (13%)',
          targetUnits: 112,
          targetSegment: 'New home buyers, office fit-outs, industrial use'
        },
        {
          type: 'rtv',
          action: 'RTV 46 Slowest Units (South & East)',
          totalUnits: 46,
          recoveryValue: '₹11.7L',
          reasoning: 'South/East show structural preference shift to split ACs'
        },
        {
          type: 'warehouseConsolidation',
          action: 'Warehouse 28 Units for Pre-Season',
          totalUnits: 28,
          reasoning: 'Position for Feb demand, avoid holding cost in stores'
        }
      ],
      whatIfScenarios: [
        'What if we warehouse 100% and wait for summer peak?',
        'What if El Niño brings warmer winter and demand spikes in Dec?',
        'What if we convert all to commercial/office sales channel?'
      ],
      decisionTrail: []
    },
    {
      id: 'AG003',
      sku: 'Whirlpool 260L Frost-Free Refrigerator',
      skuCode: 'RF260WHP',
      category: 'Refrigerators',
      brand: 'Whirlpool',
      urgency: 'MEDIUM',
      issue: 'Discontinued Model - New Series Launched',
      ageingProfile: {
        totalUnits: 94,
        totalValue: '₹23.5L',
        avgAge: '52 days',
        currentSellThrough: '61%',
        timeWindow: 'Model discontinued, new series in stores'
      },
      recommendation: {
        action: 'Liquidation Sale + Bundle Strategy + Floor Model Clearance',
        reasoning: 'Model discontinued, new series superior specs at same price. Must clear completely.',
        confidence: 88,
        netMarginImpact: '-₹1.8L',
        cashRecovery: '₹21.2L'
      },
      specificActions: [
        {
          type: 'liquidationSale',
          action: 'Clearance Sale: ₹24,990 → ₹19,990',
          discount: '₹5,000 (20%)',
          targetUnits: 68,
          reasoning: 'New series at ₹24,990 has better features. Need ₹5K gap to move old stock'
        },
        {
          type: 'bundleStrategy',
          action: 'Kitchen Bundle: Fridge + Microwave at ₹27,990',
          targetUnits: 18,
          reasoning: 'Creates value perception, clears microwave inventory simultaneously'
        },
        {
          type: 'floorModelClearance',
          action: 'Convert 8 Display Units to Employee/Bulk Sales',
          displayUnits: 8,
          employeePrice: '₹16,990',
          reasoning: 'Free up floor space for new series'
        }
      ],
      whatIfScenarios: [
        'What if we keep 10 units as "budget option" at ₹18,990 permanently?',
        'What if Whirlpool offers buy-back program for old inventory?',
        'What if we donate remaining units for CSR tax benefit?'
      ],
      decisionTrail: []
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
        marginContribution: '₹38.4Cr',
        sellThrough: '84%',
        returnRate: '2.8%',
        otd: '92%',
        fillRate: '88%'
      },
      currentTerms: {
        baseMargin: 14,
        sellOutIncentive: '2.5% at 80%, 3.5% at 90%',
        rtvAllowed: true,
        rtvPercentage: 12,
        priceProtection: '60 days',
        paymentTerms: '45 days',
        coMarketing: 1.2
      },
      performance: {
        tvs: { nsv: '₹142Cr', margin: 16, st: 87, vsBrandAvg: '+12pts' },
        refrigerators: { nsv: '₹68Cr', margin: 12, st: 79, vsBrandAvg: '+7pts' },
        washers: { nsv: '₹28Cr', margin: 11, st: 81, vsBrandAvg: '+5pts' }
      },
      recommendation: {
        action: 'Negotiate 3-Tier Improvement Package',
        reasoning: 'This negotiation opportunity is strong because our Samsung performance significantly exceeds brand averages across all categories. Our 84% sell-through beats Samsung network average of 72% by 12 percentage points. We represent ₹248Cr in annual NSV (4.2% of Samsung India sales) with ₹142Cr from TVs alone where we achieve 87% ST - 12 points above brand average. Contract renewal in 42 days creates negotiation window. The 4-priority package targets ₹6.1Cr in annual value: margin increase on TVs (₹2.1Cr), new incentive tier at 95% (₹1.4Cr), enhanced co-marketing (₹3.2Cr), and extended price protection (₹1.5Cr risk mitigation).',
        confidence: 86,
        annualImpact: '₹6.1Cr'
      },
      reasoningBreakdown: {
        summary: 'We significantly outperform Samsung brand averages: 84% ST vs 72% network average, ₹248Cr NSV (4.2% national share). Contract renewal in 42 days creates negotiation leverage. Package targets ₹6.1Cr annual value through margin increase, new incentive tier, co-marketing, and price protection.',
        factors: [
          {
            name: 'Performance Leverage',
            weight: 40,
            score: 89,
            reasoning: 'Our Samsung ST: 84% vs network 72% (+12pts). TVs: 87% vs 75% (+12pts). Refrigerators: 79% vs 72% (+7pts). Washers: 81% vs 76% (+5pts). Consistent outperformance across all categories gives strong negotiating position.'
          },
          {
            name: 'Volume Significance',
            weight: 30,
            score: 88,
            reasoning: '₹248Cr annual NSV makes us #3 Samsung partner nationally. ₹142Cr in TVs (4.2% national Samsung TV sales). Zero quality complaints. Premium in-store placement. We are strategic partner, not commodity retailer.'
          },
          {
            name: 'Contract Timing',
            weight: 20,
            score: 82,
            reasoning: 'Renewal due in 42 days. Samsung values continuity and doesn\'t want disruption. Alternative retailers (Reliance, Vijay Sales) have lower ST. Our renewal is low-risk for Samsung - good time to negotiate improvements.'
          },
          {
            name: 'Competitive Context',
            weight: 10,
            score: 85,
            reasoning: 'LG offers 15% margin vs our Samsung 14%. Sony 17% vs 14%. OnePlus 12% but with 20% RTV. We can credibly threaten floor space reallocation to competitors if Samsung doesn\'t improve terms.'
          }
        ]
      },
      negotiationPackage: [
        {
          priority: 1,
          ask: 'Increase base margin to 15.5% on TVs (from 14%)',
          reasoning: 'Our TV sell-through of 87% beats Samsung network average by 12 percentage points. We move ₹142Cr in TV NSV with premium in-store placement.',
          leverage: 'Performance data showing consistent 85%+ ST over 3 years',
          likelihood: 'Medium',
          impact: '₹2.1Cr annually',
          dataPoints: [
            'Croma TV ST: 87% vs Samsung network avg: 75%',
            'Croma represents 4.2% of Samsung TV sales nationally',
            'Zero quality complaints on flagship models'
          ]
        },
        {
          priority: 2,
          ask: 'New incentive tier: 4.5% at 95% sell-through',
          reasoning: 'We consistently hit 90%+ on flagship models. Current max incentive at 90% leaves performance upside unrewarded.',
          leverage: 'Historical data: 14 out of 24 flagship SKUs exceeded 95% ST last year',
          likelihood: 'High',
          impact: '₹1.4Cr on high-velocity SKUs',
          dataPoints: [
            'FY24: 14 SKUs exceeded 95% ST',
            'Neo QLED 65": 97% ST, 240 units sold',
            'Frame TV 55": 96% ST, 180 units sold'
          ]
        },
        {
          priority: 3,
          ask: 'Increase co-marketing fund from 1.2% to 2.5%',
          reasoning: 'Event windows (Diwali, Cricket, Republic Day) drive 40% of annual volume but require heavy promotional investment.',
          leverage: 'Event performance data + competitive pressure from LG/Sony',
          likelihood: 'Medium',
          impact: '₹3.2Cr incremental marketing support',
          dataPoints: [
            'Diwali 2024: 28% of annual Samsung TV sales',
            'Cricket WC: ₹42Cr in 6 weeks',
            'ROI on joint campaigns: 4.2x average'
          ]
        },
        {
          priority: 4,
          ask: 'Extend price protection from 60 to 90 days',
          reasoning: 'Electronics pricing highly volatile. Current 60-day window insufficient for slower-moving premium SKUs.',
          leverage: 'LG and Sony both offer 90-day price protection',
          likelihood: 'Low',
          impact: '₹1.5Cr risk mitigation',
          dataPoints: [
            'Last year: ₹2.8Cr in unprotected markdowns',
            'Average premium SKU lifecycle: 85 days',
            'Competitor terms: LG 90d, Sony 75d'
          ]
        }
      ],
      competitiveContext: {
        lgTerms: { margin: 15, incentive: '3% at 85%', rtv: 15, coMarketing: 2.0 },
        sonyTerms: { margin: 17, incentive: '2% at 80%', rtv: 10, coMarketing: 1.8 }
      },
      whatIfScenarios: [
        'What if Samsung rejects margin increase but offers 5% incentive at 95% ST?',
        'What if we threaten to reduce Samsung floor space by 15%?',
        'What if we get all asks approved - impact on annual P&L?',
        'What if Samsung offers exclusive launch rights for 2025 flagship?'
      ],
      decisionTrail: [
        { time: '10:30:15', agent: 'Orchestrator', action: 'Quarterly vendor review triggered', thinking: 'Samsung contract renewal approaching. Analyzing performance for negotiation leverage.' },
        { time: '10:31:08', agent: 'Vendor Performance Agent', action: 'Aggregated Samsung performance', thinking: '84% sell-through is strong. We have leverage for better terms.' },
        { time: '10:32:22', agent: 'Category Economics Agent', action: 'Category breakdown analysis', thinking: 'TVs are hero category - 87% ST, 12pts above brand avg. This is our primary leverage point.' }
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
      performance: {
        iphones: { nsv: '₹248Cr', margin: 4.5, st: 96, vsBrandAvg: '+9pts' },
        ipads: { nsv: '₹38Cr', margin: 5.2, st: 88, vsBrandAvg: '+5pts' },
        macbooks: { nsv: '₹18Cr', margin: 6.8, st: 91, vsBrandAvg: '+7pts' }
      },
      recommendation: {
        action: 'Focus on Allocation Priority + Marketing Support (Margins Non-Negotiable)',
        reasoning: 'Apple margins are industry-fixed, non-negotiable. Real value is in allocation priority for launches and enhanced marketing support. We are #3 Apple partner by volume with 96% iPhone ST.',
        confidence: 78,
        annualImpact: '₹12.4Cr'
      },
      negotiationPackage: [
        {
          priority: 1,
          ask: 'Guaranteed 4.5% of national iPhone allocation for all launches',
          reasoning: 'We are #3 partner nationally by volume. 96% sell-through significantly exceeds network average of 87%. Frequent stockouts during launch windows cost us ₹8Cr+ annually.',
          leverage: 'Historical launch performance + threat to reduce iPhone floor space',
          likelihood: 'High',
          impact: '₹8.2Cr prevented stockouts',
          dataPoints: [
            'iPhone 15 launch: Stockout in 4 days, lost ₹3.2Cr',
            'Croma iPhone ST: 96% vs network avg: 87%',
            'We sell 240 iPhones/day during launch vs 180 network avg'
          ]
        },
        {
          priority: 2,
          ask: 'Increase co-marketing fund from 0.5% to 1.5%',
          reasoning: 'Our in-store activations, trade-in program, and customer education drive significant Apple ecosystem adoption. Need better joint investment.',
          leverage: 'Data showing our activations drive 23% higher attach rate for accessories',
          likelihood: 'Medium',
          impact: '₹3.1Cr incremental marketing support',
          dataPoints: [
            'Croma accessory attach rate: 42% vs network: 19%',
            'AppleCare adoption: 31% vs network: 18%',
            'Trade-in program drives 28% of sales'
          ]
        },
        {
          priority: 3,
          ask: 'Launch velocity bonus: 1% margin on units sold in first 30 days',
          reasoning: 'We consistently lead on launch velocity but ongoing incentive structure rewards sustained performance, not launch impact.',
          leverage: 'Historical first-month performance data',
          likelihood: 'Medium',
          impact: '₹1.8Cr on major launches',
          dataPoints: [
            'iPhone 15: 840 units in first 30 days (32% of annual)',
            'Launch velocity: 28 units/day vs 12 units/day baseline',
            'First month gross margin: ₹11.2Cr'
          ]
        },
        {
          priority: 4,
          ask: 'Priority allocation for high-demand variants (512GB, 1TB iPhones)',
          reasoning: 'We consistently sell out of premium variants in 3-5 days while 256GB has longer tail. Better variant mix improves our margin realization.',
          leverage: 'Variant mix data showing faster velocity on premium SKUs',
          likelihood: 'High',
          impact: '₹1.2Cr improved mix',
          dataPoints: [
            '512GB iPhone: 11 day stockout avg vs 2 day for 256GB',
            'Premium variant margin: 5.2% vs 4.5% base',
            'Customer preference: 32% ask for 512GB+'
          ]
        }
      ],
      competitiveContext: {
        note: 'Apple maintains consistent terms across authorized resellers. Differentiation comes from allocation priority, marketing support, and launch exclusives rather than margin variation.'
      },
      whatIfScenarios: [
        'What if Apple offers exclusive 48-hour launch window for iPhone 16?',
        'What if we reduce iPhone floor space by 20% - impact on allocation?',
        'What if Samsung offers aggressive switcher program during iPhone launch?',
        'What if we get priority allocation but fillrate drops to 60%?'
      ],
      decisionTrail: []
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
      performance: {
        tvs: { nsv: '₹54Cr', margin: 9, st: 72, velocity: 'Medium' },
        phones: { nsv: '₹24Cr', margin: 6, st: 58, velocity: 'Low' },
        iot: { nsv: '₹8Cr', margin: 12, st: 74, velocity: 'Medium' }
      },
      recommendation: {
        action: 'Push for Operational Improvements Over Margin',
        reasoning: 'Terms are generous. Real problem is execution: poor OTD (78%), high returns (4.2%), low phone ST (58%). Strategy: Make OTD mandatory, shift focus to TVs, joint quality program.',
        confidence: 82,
        annualImpact: '₹4Cr operational savings'
      },
      negotiationPackage: [
        {
          priority: 1,
          ask: 'Improve OTD to 90%+ (currently 78%)',
          reasoning: 'Poor delivery creates stockouts and lost sales. Make SLA compliance mandatory for incentive eligibility.',
          leverage: 'Threaten to reduce SKU count if OTD doesn\'t improve',
          likelihood: 'High',
          impact: '₹4Cr prevented stockouts',
          dataPoints: [
            'Last quarter: 18 stockouts due to late delivery',
            'Samsung OTD: 92%, LG: 89%, Xiaomi: 78%',
            'Each stockout costs avg ₹22K in lost revenue'
          ]
        },
        {
          priority: 2,
          ask: 'Reduce smartphone exposure, increase TV focus',
          reasoning: 'Xiaomi phones underperforming (58% ST). TVs performing well (72% ST). Reallocate floor space.',
          leverage: 'Sales data showing TV vs phone performance gap',
          likelihood: 'High',
          impact: 'Mix optimization improves blended margin',
          dataPoints: [
            'TV ST: 72% vs Phone ST: 58%',
            'TV margin: 9% vs Phone margin: 6%',
            'Customer preference shifting to premium brands for phones'
          ]
        },
        {
          priority: 3,
          ask: 'Joint quality program - reduce returns from 4.2% to <3%',
          reasoning: 'High return rate increases handling costs and damages brand perception.',
          leverage: 'Comparison with Samsung (2.8%) and Sony (2.1%)',
          likelihood: 'Medium',
          impact: '₹1.8Cr cost reduction',
          dataPoints: [
            'Xiaomi returns: 4.2% vs Samsung: 2.8%',
            'Top return reasons: DOA (38%), quality issues (29%)',
            'Each return costs ₹1,200 in handling + reverse logistics'
          ]
        }
      ],
      whatIfScenarios: [
        'What if Xiaomi can\'t improve OTD - should we exit smartphones entirely?',
        'What if we shift 80% of phone space to Realme/OnePlus?',
        'What if quality issues continue - impact on Croma brand?'
      ],
      decisionTrail: []
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
            <button
              onClick={() => {setCurrentSection('dashboard');}}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                currentSection === 'dashboard' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>

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
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
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
                        className="mt-1 w-5 h-5 rounded border-2"
                      />
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{item.sku || item.vendor}</h3>
                          {item.skuCode && <span className="text-sm font-mono text-gray-500">{item.skuCode}</span>}
                          {item.urgency && (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.urgency === 'CRITICAL' ? 'bg-red-100 text-red-700' : 
                              item.urgency === 'HIGH' ? 'bg-orange-100 text-orange-700' : 
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              ⚠ {item.urgency}
                            </span>
                          )}
                        </div>
                        {item.category && (
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>{item.category}</span>
                            {item.brand && <><span>•</span><span>{item.brand}</span></>}
                            {item.event && (
                              <>
                                <span>•</span>
                                <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: '#E7DDCA' }}>
                                  {item.event}
                                </span>
                              </>
                            )}
                          </div>
                        )}
                        {item.issue && (
                          <div className="mt-2 text-sm text-gray-700 font-medium">{item.issue}</div>
                        )}
                        {item.contractStatus && (
                          <div className="mt-2 text-sm text-gray-600">{item.contractStatus}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
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
                  <div className="px-6 py-4 grid grid-cols-4 gap-4" style={{ backgroundColor: '#F5F0E8' }}>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">Network Stock</div>
                      <div className="text-2xl font-light">{item.currentState.networkStock}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">Warehouse</div>
                      <div className="text-2xl font-light">{item.currentState.warehouseStock}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">Avg ROS</div>
                      <div className="text-2xl font-light">{item.currentState.avgROS}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">Last Year ST</div>
                      <div className="text-2xl font-light">{item.currentState.lastYearST}</div>
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
                      <div className="text-2xl font-light text-red-600">{item.ageingProfile.currentSellThrough}%</div>
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
                      <div className="text-lg font-medium" style={{ color: '#85A383' }}>{item.metrics.sellThrough}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">Return Rate</div>
                      <div className="text-lg font-light">{item.metrics.returnRate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">OTD</div>
                      <div className="text-lg font-light">{item.metrics.otd}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1 uppercase">Fill Rate</div>
                      <div className="text-lg font-light">{item.metrics.fillRate}%</div>
                    </div>
                  </div>
                )}

                {/* Impact Bar */}
                <div className="px-6 py-3 border-b flex items-center justify-between" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                  <div className="flex items-center gap-6 text-sm">
                    {item.recommendation.qty && (
                      <span className="text-gray-600">Qty: <span className="font-medium">{item.recommendation.qty}</span></span>
                    )}
                    {item.recommendation.investment && (
                      <span className="text-gray-600">Investment: <span className="font-medium">{item.recommendation.investment}</span></span>
                    )}
                    {item.recommendation.annualImpact && (
                      <span className="text-gray-600">Annual Impact: <span className="font-medium">{item.recommendation.annualImpact}</span></span>
                    )}
                    {item.recommendation.impact && (
                      <span className="text-gray-600">Impact: <span className="font-medium">{item.recommendation.impact}</span></span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">Confidence: <span className="font-medium" style={{ color: '#85A383' }}>{item.recommendation.confidence}%</span></span>
                </div>

                {/* Reasoning Breakdown */}
                {item.reasoningBreakdown && (
                  <div className="p-6 border-b" style={{ borderColor: '#E7DDCA' }}>
                    <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Why This Recommendation</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{item.reasoningBreakdown.summary}</p>
                    
                    <div className="space-y-4">
                      {item.reasoningBreakdown.factors.map((factor, idx) => (
                        <div key={idx} className="border-l-4 pl-4" style={{ borderColor: '#85A383' }}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">{factor.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500">{factor.weight}% weight</span>
                              <span className="text-sm font-medium" style={{ color: '#85A383' }}>{factor.score}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{factor.reasoning}</p>
                        </div>
                      ))}
                    </div>
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
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4" style={{ color: '#85A383' }} />
                      <span className="text-sm font-medium text-gray-700 uppercase tracking-wide">What-If Analysis</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {item.whatIfScenarios.map((scenario, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setChatOpen(item.id);
                            setCurrentMessage(scenario);
                          }}
                          className="px-4 py-3 text-left text-sm text-gray-700 border-2 rounded-lg hover:bg-gray-50"
                          style={{ borderColor: '#E7DDCA' }}
                        >
                          "{scenario}"
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Store Allocation Details */}
                {item.storeAllocation && (
                  <div className="p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Store Allocation Plan</h4>
                    <div className="space-y-3">
                      {item.storeAllocation.map((allocation, idx) => (
                        <div key={idx} className="p-4 rounded-lg border" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">{allocation.cluster}</span>
                            <span className="text-sm" style={{ color: '#85A383' }}>{allocation.qty} units ({allocation.perStore}/store)</span>
                          </div>
                          <div className="text-xs text-gray-600">{allocation.reasoning}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specific Actions for Allocation/Ageing */}
                {item.specificActions && (
                  <div className="p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Recommended Actions</h4>
                    <div className="space-y-3">
                      {item.specificActions.map((action, idx) => (
                        <div key={idx} className="p-4 rounded-lg border-2" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                          {action.type === 'transfer' ? (
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <Move className="w-4 h-4" style={{ color: '#85A383' }} />
                                  <span className="text-sm font-medium">Inter-Store Transfer</span>
                                </div>
                                {action.revenueImpact && (
                                  <span className="text-sm font-medium" style={{ color: '#2D9CDB' }}>{action.revenueImpact}</span>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm mb-3">
                                <span className="text-gray-700">{action.from}</span>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                <span className="font-medium" style={{ color: '#85A383' }}>{action.to}</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                {action.units} units • ETA: {action.eta} • Cost: {action.cost}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="text-sm font-medium text-gray-900 mb-2">{action.action}</div>
                              <div className="text-xs text-gray-600">{action.reasoning}</div>
                              {action.targetUnits && (
                                <div className="mt-2 text-xs text-gray-500">Target: {action.targetUnits} units</div>
                              )}
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

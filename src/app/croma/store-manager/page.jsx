"use client"
import React, { useState } from 'react';
import { 
  Store, Download, Search, MessageSquare, Users, Send, Bell, 
  Activity, Clock, Settings, Filter, X, Sparkles, TrendingUp,
  Check, Percent, Package, Eye, ShoppingCart, DollarSign,
  LayoutGrid, Zap, Gift, UserCheck, MapPin, Calendar, ArrowRight
} from 'lucide-react';

export default function CromaStoreManagerDashboard() {
  const [currentSection, setCurrentSection] = useState('merchandising');
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
        { type: 'ai', text: 'Based on your store\'s traffic patterns and current inventory, I can simulate different scenarios. Let me model the impact for you.' }
      ]
    }));
    setCurrentMessage('');
  };

  const toggleRow = (idx) => {
    if (expandedRows.includes(idx)) {
      setExpandedRows(expandedRows.filter(i => i !== idx));
    } else {
      setExpandedRows([...expandedRows, idx]);
    }
  };

  // Merchandising & Markdown Decisions
  const merchandisingDecisions = [
    {
      id: 'MERCH001',
      title: 'Expand Gaming Zone from 180→215 sq ft + Triple Facings on ROG/Legion',
      category: 'Shelf Management',
      urgency: 'HIGH',
      area: 'Gaming & Computing Section',
      storeMetrics: {
        currentFacings: 28,
        currentSqFt: 180,
        conversion: '14.2%',
        unitsPerSqFt: 2.8,
        dwellTime: '8.4 min'
      },
      recommendation: {
        action: 'Expand Gaming Zone by 35 sq ft + Increase Top 3 SKUs to 12 Facings Each',
        reasoning: 'Gaming section shows 14.2% conversion (store avg: 9.8%) with 8.4 min dwell time (2nd highest after premium TVs). Top 3 gaming laptops generate ₹42L monthly but face frequent stockouts due to limited facings. Customer feedback shows 23% ask for models not visible on shelf.',
        confidence: 89,
        impact: '₹8.2L monthly revenue'
      },
      reasoningBreakdown: {
        summary: 'Gaming section massively outperforms: 14.2% conversion vs store 9.8%, 2.8 units/sq ft vs store 1.4. Top 3 gaming SKUs account for ₹42L monthly but face stockouts. Customer surveys show 23% can\'t find desired models on display. Taking 35 sq ft from printer section (4.1% conversion, declining category) to expand gaming will unlock ₹8.2L monthly.',
        factors: [
          {
            name: 'Conversion Performance',
            weight: 35,
            score: 92,
            reasoning: 'Gaming: 14.2% conversion vs store average 9.8% (+45% relative). Customer dwell time 8.4 min (2nd highest after premium TVs at 9.2 min). Clear indicator of purchase intent but constrained by limited display and stock visibility.'
          },
          {
            name: 'Space Productivity',
            weight: 30,
            score: 88,
            reasoning: 'Gaming generates 2.8 units/sq ft vs store avg 1.4 units/sq ft (2x). Current 180 sq ft yields ₹42L/month. Printer section (adjacent, 85 sq ft) yields only 0.6 units/sq ft with declining demand.'
          }
        ]
      },
      specificActions: [
        {
          action: 'Reallocate 35 sq ft from Printer Section to Gaming Zone',
          reasoning: 'Gaming: 2.8 units/sq ft. Printers: 0.6 units/sq ft. Move low-performing space to high-performing category.'
        }
      ],
      whatIfScenarios: [
        'What if we expand to 250 sq ft instead of 215 sq ft?',
        'What if gaming laptop demand drops 20% after festival season?'
      ],
      decisionTrail: [
        { 
          time: '09:15:42', 
          agent: 'Orchestrator', 
          action: 'Weekly Store Merchandising Review Triggered', 
          database: null,
          query: null,
          data: null,
          thinking: 'Analyzing store heatmaps and conversion by section. Gaming showing strong signals - high dwell time and conversion. Routing to Space Analytics Agent.',
          next: 'Space Analytics Agent'
        },
        { 
          time: '09:15:58', 
          agent: 'Space Analytics Agent', 
          action: 'Query Category Performance by Section', 
          database: 'store_analytics',
          query: 'SELECT section, sq_ft, conversion_rate, units_per_sqft, monthly_revenue FROM phoenix_mumbai_sections WHERE active=1 ORDER BY conversion_rate DESC',
          data: { 
            gaming: { sqFt: 180, conversion: 14.2, unitsPerSqFt: 2.8, revenue: '₹42L' },
            printers: { sqFt: 85, conversion: 4.1, unitsPerSqFt: 0.6, revenue: '₹8.2L' }
          },
          thinking: 'Gaming: 14.2% conversion, 2.8 units/sq ft (2x store avg). Printers: 4.1% conversion, 0.6 units/sq ft (declining category). Clear space reallocation opportunity.',
          next: 'Customer Behavior Agent'
        },
        { 
          time: '09:16:24', 
          agent: 'Customer Behavior Agent', 
          action: 'Analyze Dwell Time & Exit Survey Feedback', 
          database: 'customer_feedback',
          query: 'SELECT section, AVG(dwell_time_minutes) as avg_dwell, exit_survey_comments FROM phoenix_mumbai_traffic WHERE date >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY section',
          data: {
            gaming: { dwellTime: 8.4, topComments: ['Couldn\'t find ROG model', 'Limited selection', 'Great staff help'] },
            printer: { dwellTime: 2.1, topComments: ['Looking for specific model', 'Checking prices'] }
          },
          thinking: 'Gaming dwell time 8.4 min (2nd highest) indicates strong intent. Exit surveys: 23% mention "couldn\'t find desired model on display." This is visibility issue, not demand issue.',
          next: 'SKU Performance Agent'
        },
        { 
          time: '09:16:52', 
          agent: 'SKU Performance Agent', 
          action: 'Identify Top Gaming SKUs & Stockout Frequency', 
          database: 'inventory_management',
          query: 'SELECT sku_name, current_facings, monthly_units, monthly_revenue, stockout_days FROM phoenix_mumbai_skus WHERE category="gaming" ORDER BY monthly_revenue DESC LIMIT 10',
          data: {
            top3: [
              { sku: 'ROG Zephyrus G14', facings: 4, revenue: '₹18.2L', stockoutDays: 8 },
              { sku: 'Legion 5 Pro', facings: 3, revenue: '₹14.8L', stockoutDays: 6 },
              { sku: 'PS5 Bundle', facings: 6, revenue: '₹9.2L', stockoutDays: 4 }
            ]
          },
          thinking: 'Top 3 gaming SKUs drive 72% of section revenue but have limited facings (3-6 each) and frequent stockouts (4-8 days/month). Tripling facings will reduce stockouts.',
          next: 'Financial Impact Agent'
        },
        { 
          time: '09:17:28', 
          agent: 'Financial Impact Agent', 
          action: 'Calculate ROI of Space Reallocation', 
          database: 'financial_planning',
          query: null,
          data: {
            printerLoss: '₹1.2L/month (giving up 35 sq ft @ ₹3.4K/sq ft)',
            gamingGain: '₹9.4L/month (35 sq ft @ ₹26.9K/sq ft)',
            netImpact: '₹8.2L/month incremental'
          },
          thinking: 'Printer section generates ₹3.4K per sq ft. Gaming generates ₹23.3K per sq ft. Reallocating 35 sq ft: Lose ₹1.2L, Gain ₹9.4L. Net: ₹8.2L monthly. ROI immediate.',
          next: 'Decision Engine'
        },
        { 
          time: '09:18:05', 
          agent: 'Decision Engine', 
          action: 'Final Recommendation Synthesis', 
          database: null,
          query: null,
          data: null,
          thinking: 'All signals converge: (1) Gaming has 2x store average productivity, (2) Top SKUs face stockouts, (3) Customer surveys show visibility issue, (4) Financial impact strongly positive (₹8.2L monthly). RECOMMENDATION: Expand gaming 180→215 sq ft, triple top SKU facings. Confidence: 89%.',
          next: null
        }
      ]
    },
    {
      id: 'MERCH002',
      title: 'Clear Aging Stock: Galaxy Watch 4 (18 units), LG 43" LED (12 units), Philips Air Fryer (22 units) - 48 SKUs Total',
      category: 'Markdown Management',
      urgency: 'CRITICAL',
      timeline: 'Execute This Weekend (Sat-Sun)',
      agingInventory: {
        totalSKUs: 48,
        totalValue: '₹38.4L',
        avgAge: '68 days',
        currentVelocity: '1.2 units/day',
        spaceOccupied: '142 sq ft'
      },
      recommendation: {
        action: '3-Tier Weekend Clearance: Galaxy Watch 4 @ ₹19,990 (20% off), LG 43" @ ₹26,490 (20% off), Philips Air Fryer @ ₹9,990 (23% off)',
        reasoning: 'These 48 SKUs are aging because: (1) Galaxy Watch 4: Superseded by Watch 5 launched 2 months ago, losing 40% velocity, (2) LG 43" LED: Older panel technology, customers prefer 4K at similar price, (3) Philips Air Fryer 4.1L: Newer 4.5L model launched, this size losing relevance. Diwali inventory needs this exact 142 sq ft in 12 days. Weekend clearance recovers ₹31.2L (81% of book value), frees critical space.',
        confidence: 87,
        cashRecovery: '₹31.2L',
        marginImpact: '-₹4.2L'
      },
      reasoningBreakdown: {
        summary: 'Critical space constraint: Diwali inventory (₹2.4Cr) arrives in 12 days, needs 142 sq ft currently held by slow-movers. Specific aging reasons: Watch 4 superseded by Watch 5, LG 43" old panel vs 4K demand, Philips 4.1L wrong size vs market shift to 4.5L+. Current pace = 40 days to clear. Weekend 3-tier strategy clears 80%+ in 3 days.',
        factors: [
          {
            name: 'Product Lifecycle',
            weight: 35,
            score: 94,
            reasoning: 'Galaxy Watch 4: Watch 5 launched Aug 2024, old model velocity dropped 40%. LG 43" LED: HD panel when customers want 4K. Philips 4.1L: Market shifted to 4.5L+ (competitor analysis shows 72% demand). Not slow-movers by chance - superseded/wrong spec.'
          },
          {
            name: 'Space Urgency',
            weight: 40,
            score: 94,
            reasoning: 'Diwali inventory (highest revenue period, 28% of annual) requires exact same 142 sq ft in premium display areas. No alternative placement. Slow-movers must clear NOW or miss Diwali window. Opportunity cost: ₹18L+.'
          },
          {
            name: 'Pricing Strategy',
            weight: 25,
            score: 88,
            reasoning: 'Watch 4: ₹24,990→₹19,990 matches online competition. LG 43": ₹32,990→₹26,490 creates value gap vs 4K models. Air Fryer: ₹12,990→₹9,990 undercuts 4.5L entry price. Markdowns create competitive value vs waiting.'
          }
        ]
      },
      specificActions: [
        {
          action: 'Tier 1 - Superseded Electronics (32 SKUs): 15-20% markdown',
          details: 'Galaxy Watch 4 (18): ₹24,990→₹19,990 | LG 43" LED (12): ₹32,990→₹26,490 | Boat Smartwatch (2): ₹8,990→₹7,490',
          reasoning: 'Newer models available. Create value proposition vs current-gen pricing. Target 75% weekend clearance.'
        },
        {
          action: 'Tier 2 - Demo/Display Units (12 SKUs): 30% markdown',
          details: 'Sony WH-1000XM4 Demo (4): ₹29,990→₹20,990 | iPad Air Display (2): ₹54,900→₹38,430 | Premium Soundbar Demo (6): ₹45,990→₹32,193',
          reasoning: 'Floor models occupying premium display space. Deep discount acceptable, full warranty valid. Free up space for Diwali hero products.'
        },
        {
          action: 'Tier 3 - Wrong Assortment (4 SKUs): 25% off + ₹500 staff bonus',
          details: 'Philips Air Fryer 4.1L (22): ₹12,990→₹9,742 | DSLR Camera Kit (2): ₹98,900→₹74,175',
          reasoning: 'Wrong spec for market (size/features). Need consultative selling. Staff incentive drives active push vs passive display.'
        }
      ],
      whatIfScenarios: [
        'What if we hold Watch 4 for post-Diwali sale instead?',
        'What if LG offers buy-back program for old LED inventory?',
        'What if Air Fryer 4.1L finds niche demand from small households?'
      ],
      decisionTrail: [
        { 
          time: '10:22:15', 
          agent: 'Orchestrator', 
          action: 'Weekly Aging Inventory Review + Diwali Planning Triggered', 
          database: null,
          query: null,
          data: null,
          thinking: 'Diwali inventory shipment arriving in 12 days requires 142 sq ft space currently occupied by slow-movers. Urgent clearance needed. Routing to Inventory Analytics Agent.',
          next: 'Inventory Analytics Agent'
        },
        { 
          time: '10:22:38', 
          agent: 'Inventory Analytics Agent', 
          action: 'Query Aging Inventory by Days, Value & Category', 
          database: 'inventory_management',
          query: 'SELECT sku, sku_name, category, brand, current_stock, days_in_inventory, book_value, cost_price, mrp, avg_velocity_30d, avg_velocity_90d FROM phoenix_mumbai_inventory WHERE days_in_inventory > 50 AND status="active" ORDER BY book_value DESC',
          data: { 
            totalSKUs: 48,
            totalValue: '₹38.4L',
            avgAge: 68,
            topAgers: [
              { sku: 'TV043LG001', name: 'LG 43" LED TV', qty: 12, age: 72, value: '₹3.96L', velocity: '0.4/d', velocityDrop: '62%' },
              { sku: 'WATCH04SAM', name: 'Galaxy Watch 4', qty: 18, age: 68, value: '₹4.5L', velocity: '0.5/d', velocityDrop: '40%' },
              { sku: 'AIRFRY41PHI', name: 'Philips Air Fryer 4.1L', qty: 22, age: 64, value: '₹2.86L', velocity: '0.6/d', velocityDrop: '45%' }
            ]
          },
          thinking: '48 SKUs aged 68 days avg with sharp velocity drops (40-62%). Top 3 items (52 units, ₹11.32L) show clear pattern: superseded models or wrong specifications. Need root cause analysis.',
          next: 'Product Lifecycle Agent'
        },
        { 
          time: '10:23:18', 
          agent: 'Product Lifecycle Agent', 
          action: 'Analyze Why These SKUs Are Aging', 
          database: 'product_catalog',
          query: 'SELECT p.sku, p.sku_name, p.launch_date, n.sku as newer_sku, n.sku_name as newer_name, n.launch_date as newer_launch, c.competitor_price FROM products p LEFT JOIN products n ON p.category=n.category AND n.launch_date > p.launch_date LEFT JOIN competitor_pricing c ON p.sku=c.sku WHERE p.sku IN ("TV043LG001", "WATCH04SAM", "AIRFRY41PHI")',
          data: {
            watch4: { 
              launched: '2022-08-20', 
              supersededBy: 'Galaxy Watch 5 (Aug 2024)', 
              velocityDrop: '40% post-Watch 5 launch',
              competitorPrice: 'Amazon: ₹19,490'
            },
            lgTV: { 
              launched: '2021-03-15', 
              issue: 'HD panel, market shifted to 4K', 
              competitorEquivalent: '43" 4K models at ₹28,990',
              velocityDrop: '62% since 4K became standard'
            },
            airFryer: { 
              launched: '2023-01-10', 
              supersededBy: 'Philips 4.5L (May 2024)', 
              marketShift: '72% buyers now prefer 4.5L+ capacity',
              velocityDrop: '45% post-4.5L launch'
            }
          },
          thinking: 'Root causes identified: Watch 4 superseded (Watch 5 launched 2 months ago), LG LED outdated tech (HD vs 4K), Air Fryer wrong size (market wants 4.5L+). These aren\'t slow-movers by accident - product lifecycle/spec mismatch.',
          next: 'Space Planning Agent'
        },
        { 
          time: '10:24:05', 
          agent: 'Space Planning Agent', 
          action: 'Verify Diwali Inventory Space Requirements', 
          database: 'supply_chain',
          query: 'SELECT shipment_id, arrival_date, category, total_skus, space_required_sqft, display_location FROM incoming_shipments WHERE store="phoenix_mumbai" AND category="diwali_2024" AND arrival_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 15 DAY)',
          data: {
            shipment: 'DIW-PHX-2024-001',
            arrivalDate: '2024-10-24',
            daysUntil: 12,
            totalValue: '₹2.4Cr',
            spaceRequired: '142 sq ft',
            exactLocation: 'Premium display area near entrance (currently watches/small appliances)',
            priorityCategories: ['Premium TVs 55"+', 'Home Theater Systems', 'Smart Home Bundles']
          },
          thinking: 'Diwali shipment needs exactly 142 sq ft in premium display area - same space where aging watches and small appliances currently sit. No alternative high-visibility placement. Clearance mandatory for Diwali positioning.',
          next: 'Pricing Strategy Agent'
        },
        { 
          time: '10:24:52', 
          agent: 'Pricing Strategy Agent', 
          action: 'Calculate Optimal Markdown by SKU & Check Competition', 
          database: 'pricing_engine',
          query: 'SELECT i.sku, i.sku_name, i.mrp, i.cost, (i.mrp - i.cost) as current_margin, c.amazon_price, c.flipkart_price, e.markdown_elasticity FROM inventory i LEFT JOIN competitor_pricing c ON i.sku=c.sku LEFT JOIN elasticity_model e ON i.sku=e.sku WHERE i.sku IN (SELECT sku FROM phoenix_mumbai_inventory WHERE days_in_inventory > 50)',
          data: {
            watch4: { 
              mrp: 24990, 
              cost: 20825, 
              margin: 4165,
              amazonPrice: 19490,
              recommendedPrice: 19990,
              markdown: '20%',
              elasticity: 2.8
            },
            lgTV: { 
              mrp: 32990, 
              cost: 27491, 
              margin: 5499,
              competitorEquiv4K: 28990,
              recommendedPrice: 26490,
              markdown: '20%',
              elasticity: 2.4
            },
            airFryer: { 
              mrp: 12990, 
              cost: 10141, 
              margin: 2849,
              competitor45L: 13990,
              recommendedPrice: 9990,
              markdown: '23%',
              elasticity: 3.1
            }
          },
          thinking: 'Markdown strategy: Watch 4 @ ₹19,990 matches Amazon (creates parity). LG @ ₹26,490 undercuts 4K entry (creates value despite HD). Air Fryer @ ₹9,990 sits below 4.5L entry (overcomes size objection). High elasticity (2.4-3.1) means markdowns drive volume.',
          next: 'Traffic Timing Agent'
        },
        { 
          time: '10:25:38', 
          agent: 'Traffic Timing Agent', 
          action: 'Analyze Weekend Traffic & Festival Shopping Mindset', 
          database: 'store_analytics',
          query: 'SELECT day_type, AVG(daily_traffic) as avg_traffic, AVG(conversion_rate) as conversion, festival_proximity_days FROM phoenix_mumbai_traffic WHERE date >= DATE_SUB(NOW(), INTERVAL 90 DAY) GROUP BY day_type, festival_proximity_days',
          data: {
            weekday: { avgTraffic: 320, conversion: 9.2 },
            weekend: { avgTraffic: 780, conversion: 10.4 },
            weekendMultiplier: 2.8,
            preDiwali14Days: { trafficLift: 3.2, dealReceptivity: 'High - customers in shopping mode' }
          },
          thinking: 'Weekend traffic 2.8x weekday (780 vs 320). This weekend is 12 days before Diwali - customers already in "shopping mode" for festivals, highly receptive to deals. Optimal timing for clearance velocity.',
          next: 'Financial Impact Agent'
        },
        { 
          time: '10:26:24', 
          agent: 'Financial Impact Agent', 
          action: 'Calculate Cash Recovery vs Margin Hit vs Opportunity Cost', 
          database: 'financial_planning',
          query: null,
          data: {
            bookValue: '₹38.4L',
            tier1Recovery: '₹24.2L (85% of ₹28.4L at 15-20% markdown)',
            tier2Recovery: '₹4.8L (70% of ₹6.8L at 30% markdown)',
            tier3Recovery: '₹2.2L (70% of ₹3.2L at 25% markdown + staff cost)',
            totalRecovery: '₹31.2L (81% recovery rate)',
            marginHit: '₹4.2L',
            opportunityCostIfNoAction: '₹18L+ (missed Diwali placement revenue)',
            netDecision: 'Accept ₹4.2L hit now to unlock ₹18L opportunity'
          },
          thinking: 'Book value ₹38.4L. Expected recovery ₹31.2L (81%). Margin hit ₹4.2L acceptable because: (1) Without clearance, aging continues = deeper markdowns later (35-40% vs 15-30% now), (2) Missing Diwali placement costs ₹18L+. Net positive decision.',
          next: 'Decision Engine'
        },
        { 
          time: '10:27:15', 
          agent: 'Decision Engine', 
          action: 'Final Recommendation: 3-Tier Weekend Clearance', 
          database: null,
          query: null,
          data: null,
          thinking: 'All factors converge on urgent weekend action: (1) Specific root causes (superseded models, wrong specs), (2) Space constraint (Diwali needs 142 sq ft in 12 days), (3) Competitive pricing (matches/beats online), (4) Timing optimal (weekend + pre-Diwali mindset), (5) Financial case positive (₹4.2L hit unlocks ₹18L opportunity). RECOMMENDATION: Execute 3-tier clearance. Confidence: 87%.',
          next: null
        }
      ]
    }
  ];

  // Offers & Payments Decisions
  const offersDecisions = [
    {
      id: 'OFFER001',
      title: '₹70K+ Phones: Push 18-Month Zero-Fee EMI | ₹40-70K: Enhanced ₹2K Exchange Bonus',
      category: 'Payment Structure',
      urgency: 'HIGH',
      segment: 'Smartphones ₹40K+',
      currentPerformance: {
        straightDiscount: { conversion: '8.2%', margin: '4.1%' },
        emi: { conversion: '18.4%', margin: '3.8%' },
        exchangeOffer: { conversion: '24.6%', margin: '3.2%' },
        bankCashback: { conversion: '14.2%', margin: '4.3%' }
      },
      recommendation: {
        action: 'Tiered Approach: 18-Month EMI for ₹70K+, Enhanced Exchange for ₹40-70K',
        reasoning: 'Premium smartphone buyers (₹40K+) want affordability structure, not deep discounts. Exchange offers show highest conversion (24.6%) because they solve disposal + reduce upfront cost psychological barrier. For ₹70K+ flagships (iPhone 15 Pro, S24 Ultra), push 18-month EMI with ZERO processing fee funded 50-50 by bank + brand.',
        confidence: 91,
        impact: '+28% conversion, -0.3% margin'
      },
      reasoningBreakdown: {
        summary: 'Premium phone buyers want affordability, not discounts. Exchange leads conversion (24.6%). For ₹70K+: 18-month zero-fee EMI (feels like ₹4.4K/month vs ₹80K). For ₹40-70K: ₹2K exchange bonus. Lifts conversion +28%, margin impact only -0.3%.',
        factors: [
          {
            name: 'Customer Psychology',
            weight: 35,
            score: 92,
            reasoning: 'Premium buyers research extensively but balk at single ₹70K-80K payment. Framing as "₹4.4K/month" transforms decision. Exchange solves "what do I do with old phone" problem.'
          },
          {
            name: 'Conversion Data',
            weight: 30,
            score: 89,
            reasoning: 'Current data: Exchange 24.6% conversion (highest), EMI 18.4%, Cashback 14.2%, Straight discount 8.2% (lowest). Clear hierarchy.'
          }
        ]
      },
      whatIfScenarios: [
        'What if banks reduce EMI tenure from 18 to 12 months?',
        'What if exchange trade-in values crash due to oversupply?'
      ],
      decisionTrail: [
        { time: '11:05:12', agent: 'Orchestrator', action: 'Weekly Payment Strategy Review', database: null, query: null, data: null, thinking: 'Analyzing smartphone conversion by payment type. Exchange and EMI showing strong signals vs straight discounts.', next: 'Conversion Analytics Agent' },
        { time: '11:05:38', agent: 'Conversion Analytics Agent', action: 'Query Conversion by Payment Type', database: 'sales_analytics', query: 'SELECT payment_type, COUNT(*) as transactions, AVG(conversion_rate) as conv_rate, AVG(margin_pct) as margin FROM phoenix_mumbai_sales WHERE category="smartphones" AND price_range="40K+" AND date >= DATE_SUB(NOW(), INTERVAL 90 DAY) GROUP BY payment_type', data: { exchange: { conv: 24.6, margin: 3.2 }, emi: { conv: 18.4, margin: 3.8 }, discount: { conv: 8.2, margin: 4.1 } }, thinking: 'Exchange crushes other payment types: 24.6% conversion vs 8.2% for straight discount (3x difference). Margin hit (3.2% vs 4.1%) acceptable for conversion uplift.', next: 'Customer Psychology Agent' }
      ]
    },
    {
      id: 'OFFER002',
      title: 'AC Season Pre-Book: 0% EMI + Free Installation + Price Lock until March 2025',
      category: 'Seasonal Pre-Booking',
      urgency: 'MEDIUM',
      segment: 'Air Conditioners',
      seasonalContext: {
        currentMonth: 'October',
        peakSeason: 'April-June',
        monthsUntilPeak: 6,
        currentDemand: 'Low (18 units/month)',
        peakDemand: '240 units/month'
      },
      recommendation: {
        action: 'Launch "Winter Pre-Book Special": 0% EMI for 6 months + Free Installation (₹2,500 value) + Price Protection until March 31',
        reasoning: 'AC sales are dead in Oct-Dec (18 units/month vs 240 in summer). But customers researching now will buy in March-April when heat starts. Pre-booking with 0% EMI (₹5K-7K/month feels manageable vs ₹40K lump sum), free installation (saves ₹2.5K), and price lock (protects against Feb-Mar price hikes) creates no-brainer value. Captures 60-80 pre-bookings now = guaranteed revenue + working capital in slow season.',
        confidence: 84,
        impact: '60-80 pre-bookings, ₹24-32L advance revenue'
      },
      reasoningBreakdown: {
        summary: 'AC demand dead now (18/month) but peaks in Apr-Jun (240/month). Pre-booking with 0% EMI + free install + price lock captures customers researching now, guarantees Mar-Apr inventory moves, generates ₹24-32L working capital in slow season.',
        factors: [
          {
            name: 'Seasonal Planning',
            weight: 40,
            score: 88,
            reasoning: 'Customers research ACs 3-4 months before purchase. Oct-Dec researchers will buy in Mar-Apr. Pre-booking converts research intent into commitment, locks them before competition heats up in Feb-Mar.'
          },
          {
            name: 'Value Proposition',
            weight: 35,
            score: 90,
            reasoning: '0% EMI removes payment barrier. Free installation (₹2.5K value) is high-perceived-value, low-cost-to-us (bulk rate ₹800). Price lock protects against 8-12% Feb-Mar hikes. Triple value stack creates urgency.'
          }
        ]
      },
      whatIfScenarios: [
        'What if summer temperatures are below normal (El Niño)?',
        'What if pre-booked customers cancel in March?'
      ],
      decisionTrail: []
    },
    {
      id: 'OFFER003',
      title: 'TV + Soundbar Bundle: Save ₹8K vs Individual + Free Calibration (₹1,500 value)',
      category: 'Bundling & Cross-Sell',
      urgency: 'HIGH',
      segment: 'Premium TVs 55"+',
      currentPerformance: {
        tvAlone: { avgTicket: '₹82,400', soundbarAttach: '18%' },
        manualBundle: { frequency: '6% of TV sales', avgTicket: '₹1.12L' }
      },
      recommendation: {
        action: 'Create Pre-Packaged Bundles: 55" TV + Mid Soundbar Save ₹8K | 65" TV + Premium Soundbar Save ₹12K',
        reasoning: 'Only 18% of TV buyers add soundbars despite 78% saying "TV speakers are inadequate" in surveys. Problem: Customers don\'t realize value at point of sale, see it as separate purchase. Pre-packaged bundles with visible savings (₹8-12K) + free calibration (₹1.5K value, costs us ₹200) make it feel like "complete entertainment system" vs separate items. Projected lift: 18%→45% attach rate.',
        confidence: 86,
        impact: '+27pts soundbar attach, ₹12.4L monthly'
      },
      reasoningBreakdown: {
        summary: 'Current soundbar attach only 18% despite 78% customers saying TV speakers inadequate. Pre-packaged bundles with ₹8-12K savings + free calibration (high perceived value) lifts attach 18%→45%. Generates ₹12.4L monthly incremental.',
        factors: [
          {
            name: 'Purchase Psychology',
            weight: 40,
            score: 89,
            reasoning: 'TV purchase is "complete" in customer mind. Soundbar feels like "extra expense" vs "part of system". Pre-packaging changes mental framing: not TV + addon, but "entertainment system". Bundle discount reinforces "better deal".'
          },
          {
            name: 'Margin Math',
            weight: 35,
            score: 88,
            reasoning: 'TV alone: 12% margin. Soundbar: 22% margin. Bundle discount comes from TV margin (reduce to 10%), but soundbar attach drives blended margin up (10% + 22% / 2 = 16% blended vs 12% TV alone). Win-win.'
          }
        ]
      },
      whatIfScenarios: [
        'What if customers want TV but different soundbar brand?',
        'What if we test 3 soundbar tiers instead of 2?'
      ],
      decisionTrail: []
    }
  ];

  // Staff Deployment Decisions
  const staffDecisions = [
    {
      id: 'STAFF001',
      title: 'Weekend Staffing: Add 3 Part-Time (2-8pm Sat, 12-6pm Sun) + Move Rajesh & Priya to Gaming',
      category: 'Staff Deployment',
      urgency: 'HIGH',
      timeline: 'This Weekend (Oct 12-13)',
      currentSetup: {
        weekdayAdvisors: 12,
        weekendAdvisors: 14,
        saturdayTraffic: '840 customers',
        sundayTraffic: '720 customers',
        conversionRate: '9.8%',
        advisorUtilization: '87%'
      },
      recommendation: {
        action: 'Add 3 Part-Time Advisors (Peak Hours) + Shift 2 Specialists to Gaming',
        reasoning: 'Weekend traffic peaks at 2.8x weekday but staffing only +17%. Saturday 2-8pm sees 180 customers/hour with 14 advisors = 12.8:1 ratio (optimal is 8:1). Customer surveys: 28% mention "waited too long". Add 3 part-timers → 8.4:1 ratio. Also shift Rajesh (gaming expert) and Priya (appliances) from general to specialists for weekend tournaments and bundling push.',
        confidence: 89,
        cost: '₹18K weekend',
        impact: '₹2.8L revenue, +1.4pts conversion'
      },
      reasoningBreakdown: {
        summary: 'Weekend traffic 2.8x weekday but staffing only +17%. Peak hours hit 12.8:1 customer-advisor ratio vs optimal 8:1. Add 3 part-timers (₹6K each) for peak hours. Shift 2 specialists to gaming/appliances for strategic priorities. ROI: 15.6x (₹2.8L / ₹18K).',
        factors: [
          {
            name: 'Traffic Mismatch',
            weight: 40,
            score: 92,
            reasoning: 'Saturday traffic 840 vs weekday 300 (2.8x). Staff 14 vs 12 (1.17x). Peak hour 2-8pm: 180 customers/hour ÷ 14 advisors = 12.8 each. Queues build, customers leave. Math clear.'
          },
          {
            name: 'Customer Experience',
            weight: 30,
            score: 88,
            reasoning: 'Exit surveys: 28% weekend shoppers cite wait times. CSAT: 7.8/10 weekend vs 8.6/10 weekday. Mystery shopper: waited 12 minutes. Lost customers = lost revenue.'
          }
        ]
      },
      whatIfScenarios: [
        'What if traffic is 40% higher due to Diwali proximity?',
        'What if we cross-train general staff to cover gaming/appliances?'
      ],
      decisionTrail: [
        { time: '11:10:30', agent: 'Orchestrator', action: 'Weekly Staff Planning & Weekend Forecast', database: null, query: null, data: null, thinking: 'Analyzing traffic patterns vs staffing levels. Detecting capacity constraints during peak hours.', next: 'Traffic Analytics Agent' },
        { time: '11:10:52', agent: 'Traffic Analytics Agent', action: 'Query Hourly Traffic: Weekday vs Weekend', database: 'store_analytics', query: 'SELECT hour_of_day, day_type, AVG(customer_count) as avg_customers, AVG(conversion_rate) as conversion FROM phoenix_mumbai_hourly_traffic WHERE date >= DATE_SUB(NOW(), INTERVAL 60 DAY) GROUP BY hour_of_day, day_type', data: { weekdayAvg: 300, saturdayTotal: 840, saturdayPeak: { hours: '2-8pm', customers: 180, staff: 14, ratio: 12.8 } }, thinking: 'Saturday 2-8pm: 180 customers/hour with 14 advisors = 12.8:1 ratio. Industry best practice: 8-10:1. We\'re 28% over capacity. Creates queues.', next: 'Customer Experience Agent' }
      ]
    },
    {
      id: 'STAFF002',
      title: 'Diwali Week Staffing: Add 8 Temporary Staff (Oct 25-Nov 5) + Extend Hours to 11pm',
      category: 'Event Staffing',
      urgency: 'CRITICAL',
      timeline: 'Diwali Week: Oct 25 - Nov 5 (12 days)',
      festivalMetrics: {
        baselineTraffic: '320/day',
        diwaliTraffic: '1,450/day (4.5x)',
        peakHours: '6pm-10pm (680 customers)',
        currentStaffing: 14,
        recommendedStaffing: 22
      },
      recommendation: {
        action: 'Hire 8 Temporary Staff for 12-Day Diwali Period + Extend Store Hours 10am-11pm (vs usual 10am-10pm)',
        reasoning: 'Diwali is THE event: 28% of annual revenue in 12 days. Traffic spikes 4.5x (1,450/day vs 320 baseline). Evening peak 6-10pm sees 680 customers (currently 14 staff = 48:1 ratio - disaster). Need 22 total staff (31:1 ratio, manageable with queues). Extra hour (10-11pm) captures late shoppers (festival shopping mentality). Cost: ₹2.16L (8 staff × 12 days × ₹2.25K/day). Expected lift: ₹42L incremental revenue from serving capacity vs turning customers away.',
        confidence: 93,
        cost: '₹2.16L for 12 days',
        impact: '₹42L incremental revenue, prevent 800+ lost customers'
      },
      reasoningBreakdown: {
        summary: 'Diwali = 28% annual revenue in 12 days. Traffic 4.5x baseline (1,450/day). Evening peak: 680 customers with 14 staff = 48:1 disaster ratio. Hire 8 temps (₹2.16L) → 22 staff (31:1 manageable). Extend hours to 11pm. Prevents 800+ turned-away customers, captures ₹42L.',
        factors: [
          {
            name: 'Capacity Crisis',
            weight: 45,
            score: 96,
            reasoning: 'Diwali peak 680 customers in 4 hours (6-10pm). Current 14 staff = 48 customers each. Physically impossible. Last Diwali: security had to limit entry, ~850 customers turned away (tracked by queue counter). Each lost customer = ₹49K avg ticket = ₹41.6L lost revenue.'
          },
          {
            name: 'ROI Calculation',
            weight: 35,
            score: 94,
            reasoning: 'Cost: ₹2.16L (8 temps × 12 days × ₹2.25K). Value: Serve 800 turned-away customers @ 9.8% conversion = 78 sales × ₹49K avg = ₹38.2L. ROI: 17.7x. Even at 50% conversion, ROI is 9x. No-brainer.'
          }
        ]
      },
      whatIfScenarios: [
        'What if Diwali traffic is only 3x instead of 4.5x?',
        'What if we can only hire 5 temps instead of 8?'
      ],
      decisionTrail: []
    },
    {
      id: 'STAFF003',
      title: 'Skill Gap: Train Amit, Neha, Karan on Premium TVs (Expert Certification by Nov 15)',
      category: 'Training & Development',
      urgency: 'MEDIUM',
      timeline: '4-Week Training Program',
      skillGap: {
        category: 'Premium TVs 55"+ & Home Theater',
        currentExperts: 2,
        optimalExperts: 5,
        peakDemand: 'Diwali + World Cup (Oct-Nov)',
        avgTicket: '₹1.24L',
        conversionWithExpert: '22.4%',
        conversionWithGeneral: '9.2%'
      },
      recommendation: {
        action: 'Fast-Track Premium TV Training for Amit, Neha, Karan - Vendor Certification + Hands-On by Nov 15',
        reasoning: 'Premium TV/Home Theater is highest-ticket category (₹1.24L avg) but expert conversion is 2.4x general staff (22.4% vs 9.2%). Currently only 2 experts (Suresh, Deepak) for peak Diwali+Cricket season. Weekend peak sees 12-15 premium TV prospects but only 2 experts = 6-7 prospects each (too many, quality suffers). Training Amit, Neha, Karan (strong general performers) to expert level by Nov 15 gives us 5 experts for peak season. Training cost: ₹45K (vendor certification + demos). Expected value: 35 additional high-quality consultations/month × 22.4% conversion × ₹1.24L = ₹9.7L incremental monthly.',
        confidence: 82,
        cost: '₹45K training',
        impact: '₹9.7L monthly during peak, long-term capability'
      },
      reasoningBreakdown: {
        summary: 'Premium TV expert conversion 2.4x general (22.4% vs 9.2%). Only 2 experts for peak Diwali+Cricket season. Weekend sees 12-15 prospects, 2 experts can\'t handle quality. Train Amit/Neha/Karan by Nov 15 → 5 experts. Cost ₹45K, lifts monthly by ₹9.7L during Oct-Jan peak (4 months = ₹38.8L).',
        factors: [
          {
            name: 'Conversion Differential',
            weight: 40,
            score: 90,
            reasoning: 'Expert staff (Suresh, Deepak) convert 22.4% on premium TVs. General staff convert 9.2%. Difference: 13.2 percentage points on ₹1.24L ticket = ₹16.4K per prospect. High-value skill gap.'
          },
          {
            name: 'Peak Capacity',
            weight: 35,
            score: 85,
            reasoning: 'Weekend premium TV section: 12-15 serious prospects. 2 experts = 6-7 prospects each. Quality deteriorates above 4-5. Need 3 more experts to maintain 4-5 prospects each. Timing critical: Diwali starts Oct 25.'
          }
        ]
      },
      whatIfScenarios: [
        'What if training takes 6 weeks instead of 4?',
        'What if Amit/Neha/Karan don\'t pass certification?'
      ],
      decisionTrail: []
    }
  ];

  const sections = [
    { id: 'merchandising', label: 'Merchandising & Markdowns', icon: LayoutGrid, decisions: merchandisingDecisions },
    { id: 'offers', label: 'Offers & Payments', icon: Percent, decisions: offersDecisions },
    { id: 'staff', label: 'Staff Deployment', icon: Users, decisions: staffDecisions }
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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[85vh] overflow-hidden flex flex-col">
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
                <p className="text-gray-500">Decision trail will be available once analysis is complete.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
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
                            <td className="px-4 py-3 text-sm">{entry.action}</td>
                            <td className="px-4 py-3">
                              {entry.database ? (
                                <span className="px-2 py-1 rounded text-xs font-mono bg-gray-100">{entry.database}</span>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {hasData ? (
                                <button onClick={() => toggleRow(idx)} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  View
                                </button>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-600 max-w-md">{entry.thinking}</td>
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
                              <td colSpan={7} className="px-4 py-4 bg-gray-50">
                                {entry.query && (
                                  <div className="mb-3">
                                    <div className="text-xs font-medium mb-1">SQL Query:</div>
                                    <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">{entry.query}</pre>
                                  </div>
                                )}
                                {entry.data && (
                                  <div>
                                    <div className="text-xs font-medium mb-1">Data:</div>
                                    <pre className="text-xs bg-white border p-3 rounded overflow-x-auto">{JSON.stringify(entry.data, null, 2)}</pre>
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
      <div className="flex h-screen overflow-auto bg-gray-50">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#85A383' }}>
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Phoenix Mumbai</h1>
                <p className="text-xs text-gray-500">Store Manager View</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 border-b">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="w-3 h-3" />
              <span>Lower Parel, Mumbai</span>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                    currentSection === section.id ? 'text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  style={currentSection === section.id ? { backgroundColor: '#85A38315' } : {}}
                >
                  <section.icon className="w-4 h-4" />
                  <span className="flex-1 text-left">{section.label}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: '#85A383' }}>
                    {section.decisions.length}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {sections.find(s => s.id === currentSection)?.label}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">AI-powered recommendations for daily store operations</p>
              </div>
              <div className="flex items-center gap-3">
                {selectedItems.length > 0 && (
                  <button className="px-4 py-2 text-sm font-medium rounded-lg text-white" style={{ backgroundColor: '#85A383' }}>
                    <Check className="w-4 h-4 inline mr-2" />
                    Execute ({selectedItems.length})
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto space-y-4">
              {decisions.map(item => (
                <div key={item.id} className="bg-white rounded-xl border" style={{ borderColor: '#E7DDCA' }}>
                  {/* Header */}
                  <div className="p-6 border-b" style={{ borderColor: '#E7DDCA' }}>
                    <div className="flex items-start justify-between mb-4">
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
                          <div className="flex items-start gap-3 mb-2">
                            <h3 className="text-lg font-medium text-gray-900 max-w-2/4">{item.title}</h3>
                            {item.urgency && (
                              <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium ${
                                item.urgency === 'CRITICAL' ? 'bg-red-100 text-red-700' : 
                                item.urgency === 'HIGH' ? 'bg-orange-100 text-orange-700' : 
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                ⚠ {item.urgency}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>{item.category}</span>
                            {item.area && <><span>•</span><span>{item.area}</span></>}
                            {item.timeline && <><span>•</span><span>{item.timeline}</span></>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <button
                          onClick={() => setDecisionTrailModal(item)}
                          className="px-4 py-2  text-sm font-medium border-2 rounded-lg hover:bg-gray-50"
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

                    {/* Recommendation Card - Featured */}
                    <div className="rounded-xl p-6" style={{ backgroundColor: '#85A38308', border: '2px solid #85A383' }}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5" style={{ color: '#85A383' }} />
                          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#85A383' }}>Recommended Action</span>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <div className="text-xs text-gray-500 mb-1">Confidence</div>
                            <div className="text-2xl font-semibold" style={{ color: '#85A383' }}>{item.recommendation.confidence}%</div>
                          </div>
                          {item.recommendation.impact && (
                            <div className="text-right">
                              <div className="text-xs text-gray-500 mb-1">Impact</div>
                              <div className="text-lg font-semibold text-gray-900">{item.recommendation.impact}</div>
                            </div>
                          )}
                          {item.recommendation.cost && (
                            <div className="text-right">
                              <div className="text-xs text-gray-500 mb-1">Cost</div>
                              <div className="text-lg font-semibold text-gray-900">{item.recommendation.cost}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.recommendation.action}</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.recommendation.reasoning}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  {item.storeMetrics && (
                    <div className="px-6 py-4 grid grid-cols-5 gap-4" style={{ backgroundColor: '#F5F0E8' }}>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase">Conversion</div>
                        <div className="text-2xl font-light">{item.storeMetrics.conversion}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase">Units/Sq Ft</div>
                        <div className="text-2xl font-light">{item.storeMetrics.unitsPerSqFt}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase">Dwell Time</div>
                        <div className="text-2xl font-light">{item.storeMetrics.dwellTime}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase">Current Size</div>
                        <div className="text-2xl font-light">{item.storeMetrics.currentSqFt} sq ft</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase">Facings</div>
                        <div className="text-2xl font-light">{item.storeMetrics.currentFacings}</div>
                      </div>
                    </div>
                  )}

                  {item.agingInventory && (
                    <div className="px-6 py-4 grid grid-cols-5 gap-4" style={{ backgroundColor: '#F5F0E8' }}>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Total SKUs</div>
                        <div className="text-2xl font-light">{item.agingInventory.totalSKUs}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Value</div>
                        <div className="text-2xl font-light">{item.agingInventory.totalValue}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Avg Age</div>
                        <div className="text-2xl font-light">{item.agingInventory.avgAge}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Velocity</div>
                        <div className="text-2xl font-light text-red-600">{item.agingInventory.currentVelocity}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Space</div>
                        <div className="text-2xl font-light">{item.agingInventory.spaceOccupied}</div>
                      </div>
                    </div>
                  )}

                  {item.currentSetup && (
                    <div className="px-6 py-4 grid grid-cols-6 gap-4" style={{ backgroundColor: '#F5F0E8' }}>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Weekday</div>
                        <div className="text-2xl font-light">{item.currentSetup.weekdayAdvisors}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Weekend</div>
                        <div className="text-2xl font-light">{item.currentSetup.weekendAdvisors}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Sat Traffic</div>
                        <div className="text-2xl font-light">{item.currentSetup.saturdayTraffic}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Sun Traffic</div>
                        <div className="text-2xl font-light">{item.currentSetup.sundayTraffic}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Conversion</div>
                        <div className="text-2xl font-light">{item.currentSetup.conversionRate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Utilization</div>
                        <div className="text-2xl font-light text-orange-600">{item.currentSetup.advisorUtilization}</div>
                      </div>
                    </div>
                  )}

                  {/* Reasoning */}
                  {item.reasoningBreakdown && (
                    <div className="p-6 border-b" style={{ borderColor: '#E7DDCA' }}>
                      <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Why This Recommendation</h4>
                      <p className="text-sm text-gray-600 leading-relaxed mb-6">{item.reasoningBreakdown.summary}</p>
                      
                      <div className="space-y-4">
                        {item.reasoningBreakdown.factors && item.reasoningBreakdown.factors.map((factor, idx) => (
                          <div key={idx} className="border-l-4 pl-4" style={{ borderColor: '#85A383' }}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-900">{factor.name}</span>
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
                          placeholder="Ask about scenarios, implementation..."
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
                  {item.whatIfScenarios && item.whatIfScenarios.length > 0 && (
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

                  {/* Specific Actions */}
                  {item.specificActions && item.specificActions.length > 0 && (
                    <div className="p-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4 uppercase tracking-wide">Recommended Actions</h4>
                      <div className="space-y-3">
                        {item.specificActions.map((action, idx) => (
                          <div key={idx} className="p-4 rounded-lg border-2" style={{ borderColor: '#E7DDCA', backgroundColor: '#FAFAF8' }}>
                            <div className="text-sm font-medium text-gray-900 mb-2">{action.action}</div>
                            {action.details && <div className="text-xs text-gray-700 mb-2 font-mono">{action.details}</div>}
                            <div className="text-xs text-gray-600">{action.reasoning}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DecisionTrailModal item={decisionTrailModal} />
    </>
  );
}
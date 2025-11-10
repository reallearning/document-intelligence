"use client"
import React, { useState } from 'react';
import { 
  LayoutDashboard, TrendingUp, ArrowRight, Package, Download, 
  Filter, X, ChevronDown, ChevronRight, Check, AlertCircle,
  MapPin, Tag, Calendar, Search, RefreshCw, BarChart3, Layers,
  MessageSquare, Sparkles, TrendingDown, Store, Percent, Eye,
  ArrowUpRight, ArrowDownRight, Minus, Ruler, Move, Archive, Activity,
  Clock, Shirt, Palette, Truck, ShoppingBag, DollarSign,
  Users, Zap, Send, RotateCcw, Bell, Target
} from 'lucide-react';
import Image from 'next/image';

const MorrieDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReplenishment, setSelectedReplenishment] = useState([]);
  const [selectedMovement, setSelectedMovement] = useState([]);
  const [expandedSKU, setExpandedSKU] = useState(null);
  const [expandedSizes, setExpandedSizes] = useState(null);
  const [aiChatOpen, setAiChatOpen] = useState(null);
  const [lifecycleModal, setLifecycleModal] = useState(null);
  const [whatIfMode, setWhatIfMode] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [currentMessage, setCurrentMessage] = useState('');
  const [decisionTrailModal, setDecisionTrailModal] = useState(null);
  const [trailView, setTrailView] = useState('table'); // 'table' or 'graph'

  // Helper functions for selection
  const toggleReplenishmentSelection = (id) => {
    setSelectedReplenishment(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleMovementSelection = (id) => {
    setSelectedMovement(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAllReplenishment = () => {
    if (selectedReplenishment.length === replenishmentItems.length) {
      setSelectedReplenishment([]);
    } else {
      setSelectedReplenishment(replenishmentItems.map(item => item.id));
    }
  };

  const selectAllMovement = () => {
    if (selectedMovement.length === movementItems.length) {
      setSelectedMovement([]);
    } else {
      setSelectedMovement(movementItems.map(item => item.id));
    }
  };

  const sendMessage = (itemId) => {
    if (!currentMessage.trim()) return;
    
    setChatMessages(prev => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), {
        type: 'user',
        text: currentMessage
      }, {
        type: 'ai',
        text: generateAIResponse(currentMessage, itemId)
      }]
    }));
    setCurrentMessage('');
  };

  const generateAIResponse = (message, itemId) => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('what if') && lowerMsg.includes('delay')) {
      return "If we delay this by a week, the potential stockout risk increases by 42%. Based on current ROS trends and the upcoming marketing campaign starting in 5 days, we'd likely miss ₹45K in revenue. However, if supplier lead time is genuinely constrained, I recommend a partial order now (60% of recommendation) with remainder next week.";
    } else if (lowerMsg.includes('what if') && lowerMsg.includes('half')) {
      return "Ordering only 50% would reduce stockout risk from critical to moderate for approximately 4 days. However, with the planned Instagram campaign driving 30% traffic increase, you'd hit stockout mid-campaign. I'd suggest ordering 70% now and keeping 30% as buffer, considering the campaign's uncertain conversion rate.";
    } else if (lowerMsg.includes('campaign') || lowerMsg.includes('marketing')) {
      return "The marketing team has a social media campaign planned for this SKU starting in 5 days, expecting 25-30% traffic lift. Historical campaign data shows 18% conversion rate. This is factored into the recommendation, driving urgency for immediate replenishment.";
    } else if (lowerMsg.includes('supplier') || lowerMsg.includes('lead time')) {
      return "Current supplier lead time is 2-3 days with 94% on-time delivery rate. They have sufficient raw material stock. Alternative supplier available with 4-day lead time if needed. No supply chain constraints blocking this order.";
    } else if (lowerMsg.includes('transfer') && lowerMsg.includes('cost')) {
      return "Inter-store transfer cost is ₹150 per unit via our regular logistics partner. For this quantity, total transfer cost would be ₹2,700. Given the potential revenue uplift of ₹28,000 at target stores, ROI is 940%. Transfer is economically sound.";
    } else if (lowerMsg.includes('why not') || lowerMsg.includes('warehouse')) {
      return "Consolidating to warehouse vs transferring to stores: Warehouse consolidation saves immediate transfer costs but delays revenue realization by 2-3 weeks. Current warehouse utilization is at 76%, so we have space. However, target stores show active demand for this category right now, making immediate transfer the better play for cash flow and inventory turn.";
    }
    
    return "I've analyzed your question across inventory, marketing, supply chain, and pricing dimensions. Could you be more specific about what scenario you'd like me to model? For example, you could ask: 'What if we delay by 2 weeks?' or 'What's the impact of canceling the marketing campaign?'";
  };
  
  // Filter state
  const [filters, setFilters] = useState({
    seasons: [],
    zones: [],
    storeTypes: [],
    lifecycles: [],
    ageingBuckets: [],
    categories: [],
    priceBands: [],
    promotionState: []
  });

  // Fashion retail SKUs with comprehensive data
  const fashionSKUs = [
    {
      id: 'F25P28DRCEY',
      name: 'Indigo V-Neck Dress',
      mrp: '₹2,990',
      launchDate: '2025-01-15',
      daysSinceLaunch: 21,
      season: 'SS25',
      collection: 'Pret',
      category: 'Dresses',
      subCategory: 'Midi Dresses',
      fabric: 'Cotton Blend',
      print: 'Solid',
      color: 'Indigo',
      priceBand: '₹2,500-3,000',
      ageingBucket: '0-30 days',
      lifecycle: 'Growth',
      initialAllocation: 850,
      eboInventory: 456,
      ecomInventory: 124,
      lfsInventory: 87,
      rtvInventory: 12,
      avgROS: 3.2,
      sellThrough: 68,
      margin: 52,
      stockCover: 42,
      markdownStatus: 'Full Price',
      velocityTrend: 'up',
      anomaly: {
        type: 'positive',
        message: 'Outperforming SS25 category average by 23%. Size M showing exceptional velocity (1.4 ROS vs 0.8 category avg).'
      },
      sizeBreakdown: [
        { size: 'XS', total: 85, ebo: 42, ecom: 18, lfs: 12, rtv: 2, warehouse: 45, ros: 0.6, sellThrough: 52 },
        { size: 'S', total: 142, ebo: 88, ecom: 28, lfs: 16, rtv: 3, warehouse: 52, ros: 1.2, sellThrough: 68 },
        { size: 'M', total: 198, ebo: 124, ecom: 36, lfs: 22, rtv: 4, warehouse: 64, ros: 1.4, sellThrough: 74 },
        { size: 'L', total: 176, ebo: 106, ecom: 26, lfs: 20, rtv: 2, warehouse: 48, ros: 1.0, sellThrough: 65 },
        { size: 'XL', total: 121, ebo: 96, ecom: 16, lfs: 17, rtv: 1, warehouse: 25, ros: 0.6, sellThrough: 58 }
      ],
      storeBreakdown: [
        { store: 'AND Mumbai Central', zone: 'West', grade: 'A+', dispatch: 12, avgPLC: 28, transferOut: 2, value: 59.8 },
        { store: 'AND Delhi Connaught', zone: 'North', grade: 'A++', dispatch: 14, avgPLC: 31, transferOut: 1, value: 89.7 },
        { store: 'AND Bangalore MG Road', zone: 'South', grade: 'A+', dispatch: 11, avgPLC: 29, transferOut: 0, value: 65.8 },
        { store: 'AND Pune Aundh', zone: 'West', grade: 'A', dispatch: 8, avgPLC: 31, transferOut: 3, value: 47.8 }
      ]
    },
    {
      id: 'F25C42TPWHT',
      name: 'Classic White Cotton Top',
      mrp: '₹1,790',
      launchDate: '2025-01-08',
      daysSinceLaunch: 28,
      season: 'SS25',
      collection: 'Core',
      category: 'Tops',
      subCategory: 'Casual Tops',
      fabric: '100% Cotton',
      print: 'Solid',
      color: 'White',
      priceBand: '₹1,500-2,000',
      ageingBucket: '0-30 days',
      lifecycle: 'Peak',
      initialAllocation: 1240,
      eboInventory: 682,
      ecomInventory: 186,
      lfsInventory: 124,
      rtvInventory: 8,
      avgROS: 4.8,
      sellThrough: 78,
      margin: 58,
      stockCover: 35,
      markdownStatus: 'Full Price',
      velocityTrend: 'stable',
      sizeBreakdown: [
        { size: 'XS', total: 142, ebo: 88, ecom: 24, lfs: 18, rtv: 1, warehouse: 56, ros: 0.9, sellThrough: 76 },
        { size: 'S', total: 256, ebo: 158, ecom: 42, lfs: 28, rtv: 2, warehouse: 88, ros: 1.6, sellThrough: 82 },
        { size: 'M', total: 312, ebo: 186, ecom: 58, lfs: 38, rtv: 3, warehouse: 102, ros: 1.8, sellThrough: 80 },
        { size: 'L', total: 268, ebo: 156, ecom: 42, lfs: 28, rtv: 2, warehouse: 78, ros: 1.2, sellThrough: 74 },
        { size: 'XL', total: 186, ebo: 94, ecom: 20, lfs: 12, rtv: 0, warehouse: 42, ros: 0.3, sellThrough: 68 }
      ]
    },
    {
      id: 'F24W18DNMBL',
      name: 'High-Rise Denim Jeans',
      mrp: '₹2,490',
      launchDate: '2024-08-20',
      daysSinceLaunch: 138,
      season: 'AW24',
      collection: 'Denim Edit',
      category: 'Bottoms',
      subCategory: 'Jeans',
      fabric: 'Stretch Denim',
      print: 'Solid',
      color: 'Dark Blue',
      priceBand: '₹2,000-2,500',
      ageingBucket: '120+ days',
      lifecycle: 'Decline',
      initialAllocation: 980,
      eboInventory: 156,
      ecomInventory: 42,
      lfsInventory: 28,
      rtvInventory: 18,
      avgROS: 0.8,
      sellThrough: 88,
      margin: 42,
      stockCover: 68,
      markdownStatus: '30% Off',
      velocityTrend: 'down',
      anomaly: {
        type: 'negative',
        message: 'Aging inventory risk. 30% markdown not accelerating velocity. Consider deeper discount or bundle promotion.'
      },
      sizeBreakdown: [
        { size: '26', total: 18, ebo: 12, ecom: 3, lfs: 2, rtv: 1, warehouse: 8, ros: 0.1, sellThrough: 92 },
        { size: '28', total: 38, ebo: 24, ecom: 8, lfs: 4, rtv: 2, warehouse: 14, ros: 0.2, sellThrough: 90 },
        { size: '30', total: 62, ebo: 38, ecom: 12, lfs: 8, rtv: 4, warehouse: 22, ros: 0.3, sellThrough: 88 },
        { size: '32', total: 58, ebo: 36, ecom: 10, lfs: 8, rtv: 4, warehouse: 18, ros: 0.2, sellThrough: 86 },
        { size: '34', total: 42, ebo: 28, ecom: 6, lfs: 4, rtv: 4, warehouse: 12, ros: 0.1, sellThrough: 84 }
      ]
    },
    {
      id: 'F25P35BLZPK',
      name: 'Pastel Pink Linen Blazer',
      mrp: '₹4,990',
      launchDate: '2025-01-22',
      daysSinceLaunch: 14,
      season: 'SS25',
      collection: 'Premium',
      category: 'Outerwear',
      subCategory: 'Blazers',
      fabric: 'Linen Blend',
      print: 'Solid',
      color: 'Pastel Pink',
      priceBand: '₹4,500-5,000',
      ageingBucket: '0-30 days',
      lifecycle: 'Launch',
      initialAllocation: 420,
      eboInventory: 324,
      ecomInventory: 58,
      lfsInventory: 22,
      rtvInventory: 0,
      avgROS: 1.2,
      sellThrough: 42,
      margin: 62,
      stockCover: 58,
      markdownStatus: 'Full Price',
      velocityTrend: 'up',
      sizeBreakdown: [
        { size: 'XS', total: 52, ebo: 42, ecom: 6, lfs: 2, rtv: 0, warehouse: 18, ros: 0.2, sellThrough: 38 },
        { size: 'S', total: 88, ebo: 68, ecom: 12, lfs: 4, rtv: 0, warehouse: 28, ros: 0.3, sellThrough: 44 },
        { size: 'M', total: 112, ebo: 86, ecom: 16, lfs: 6, rtv: 0, warehouse: 38, ros: 0.4, sellThrough: 46 },
        { size: 'L', total: 94, ebo: 72, ecom: 14, lfs: 6, rtv: 0, warehouse: 32, ros: 0.2, sellThrough: 40 },
        { size: 'XL', total: 58, ebo: 56, ecom: 10, lfs: 4, rtv: 0, warehouse: 22, ros: 0.1, sellThrough: 36 }
      ]
    }
  ];

  // Enhanced Replenishment items with multivariate decision factors
  const replenishmentItems = [
    {
      id: 'SKU001',
      name: 'Floral Summer Dress',
      store: 'AND Mumbai Central',
      storeId: 'STR023',
      zone: 'West',
      category: 'Dresses',
      season: 'SS25',
      fabric: 'Rayon',
      currentStock: 12,
      warehouseStock: 45,
      inTransit: 18,
      rateOfSale: 4.5,
      daysToStockout: 2.7,
      aiConfidence: 94,
      priority: 'Critical',
      totalImpact: '₹89,964',
      sizes: [
        { size: 'S', stock: 2, recommendation: 8, impact: '₹19,992' },
        { size: 'M', stock: 4, recommendation: 12, impact: '₹29,988' },
        { size: 'L', stock: 4, recommendation: 10, impact: '₹24,990' },
        { size: 'XL', stock: 2, recommendation: 6, impact: '₹14,994' }
      ],
      decisionContext: "This replenishment is urgent because you're 2.7 days away from stockout, and there's a major Instagram campaign starting in 5 days that's expected to drive 25-30% more traffic. Your supplier can deliver in 2-3 days with 94% reliability, so timing works perfectly. The full-price strategy is holding (no markdown planned for 45 days), protecting your 52% margin. The recommendation balances getting stock before the campaign hits while not over-ordering given the warehouse has 45 units available.",
      whatIfStarters: [
        "What if we only order 50% now and wait to see campaign performance?",
        "What if the campaign gets delayed by 2 weeks?",
        "What if we increase the order by 20% given campaign uncertainty?",
        "What if supplier lead time extends to 5 days?"
      ],
      decisionFactors: {
        inventory: {
          weight: 35,
          score: 92,
          narrative: "You're critically low with just 2.7 days of stock left at current velocity. The 4.5 ROS is 38% above store average, indicating strong, consistent demand."
        },
        marketing: {
          weight: 30,
          score: 88,
          narrative: "Instagram campaign 'Summer Collection Launch' starts Nov 11 with ₹85K budget. Historical similar campaigns drove 25-30% traffic lift with 18% conversion. This is driving the urgency."
        },
        supplyChain: {
          weight: 20,
          score: 95,
          narrative: "Supplier has 2-3 day lead time with excellent 94% on-time record. They have raw material in stock, MOQ is 20 units (well below our need). No constraints here."
        },
        pricing: {
          weight: 15,
          score: 90,
          narrative: "Currently full price with strong 52% margin. No markdown planned until Dec 20 (45 days out), so we can maintain pricing power through the campaign."
        }
      },
      decisionTrail: [
        {
          timestamp: '2025-11-06 08:23:14',
          agent: 'Orchestrator',
          action: 'Initiated Analysis',
          database: null,
          query: null,
          dataRetrieved: null,
          thinking: 'Detected low stock alert for SKU001 at Mumbai Central. Triggering multi-agent analysis to generate replenishment recommendation.',
          nextAgent: 'Inventory Agent'
        },
        {
          timestamp: '2025-11-06 08:23:18',
          agent: 'Inventory Agent',
          action: 'Query Current Stock',
          database: 'POS System',
          query: 'SELECT stock_level, sales_7d FROM inventory WHERE sku_id = "SKU001" AND store_id = "STR023"',
          dataRetrieved: { currentStock: 12, sales7d: [5, 4, 5, 4, 5, 4, 4] },
          thinking: 'Current stock is critically low at 12 units. 7-day sales show consistent demand averaging 4.5 units/day. At this velocity, stockout in 2.7 days. This is urgent.',
          nextAgent: 'Inventory Agent'
        },
        {
          timestamp: '2025-11-06 08:23:21',
          agent: 'Inventory Agent',
          action: 'Query Warehouse Stock',
          database: 'Warehouse Management',
          query: 'SELECT available_stock, reserved_stock FROM warehouse_inventory WHERE sku_id = "SKU001"',
          dataRetrieved: { availableStock: 45, reservedStock: 12, inTransit: 18 },
          thinking: 'Warehouse has 45 units available. Sufficient supply to fulfill replenishment. 18 units already in transit to other stores.',
          nextAgent: 'Inventory Agent'
        },
        {
          timestamp: '2025-11-06 08:23:24',
          agent: 'Inventory Agent',
          action: 'Calculate ROS vs Store Average',
          database: 'Analytics DB',
          query: 'SELECT AVG(rate_of_sale) FROM store_performance WHERE store_id = "STR023" AND category = "Dresses"',
          dataRetrieved: { storeAvgROS: 3.26, skuROS: 4.5, variance: 38 },
          thinking: 'This SKU is performing 38% above store average for dresses. Strong indicator of consistent demand, not a temporary spike. Confidence in replenishment is high.',
          nextAgent: 'Marketing Agent'
        },
        {
          timestamp: '2025-11-06 08:23:45',
          agent: 'Marketing Agent',
          action: 'Query Active Campaigns',
          database: 'Marketing Calendar',
          query: 'SELECT * FROM campaigns WHERE sku_id = "SKU001" AND start_date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 14 DAY)',
          dataRetrieved: { campaignName: 'Summer Collection Launch', startDate: '2025-11-11', budget: 85000, channel: 'Instagram' },
          thinking: 'Found active campaign starting in 5 days! This drives extreme urgency - we need stock BEFORE campaign launch to capture demand lift.',
          nextAgent: 'Marketing Agent'
        },
        {
          timestamp: '2025-11-06 08:23:48',
          agent: 'Marketing Agent',
          action: 'Analyze Historical Campaign Performance',
          database: 'Analytics DB',
          query: 'SELECT AVG(traffic_lift), AVG(conversion_rate) FROM campaign_history WHERE campaign_type = "Social_Launch" AND category = "Dresses"',
          dataRetrieved: { avgTrafficLift: 27.5, avgConversionRate: 18.2, campaignCount: 12 },
          thinking: 'Historical data shows 25-30% traffic lift with 18% conversion for similar campaigns. Expected additional demand: ~15-20 units during campaign period.',
          nextAgent: 'Supply Chain Agent'
        },
        {
          timestamp: '2025-11-06 08:23:52',
          agent: 'Supply Chain Agent',
          action: 'Query Supplier Lead Time',
          database: 'Supplier Portal',
          query: 'SELECT lead_time_days, on_time_delivery_pct FROM suppliers WHERE supplier_id = "SUP_042" AND sku_category = "Dresses"',
          dataRetrieved: { leadTimeDays: 2.5, onTimeDeliveryPct: 94, lastDelivery: '2025-11-04' },
          thinking: 'Supplier can deliver in 2-3 days with 94% reliability. If we order today, stock arrives Nov 8-9, giving 2-3 days buffer before campaign. Timing is perfect.',
          nextAgent: 'Supply Chain Agent'
        },
        {
          timestamp: '2025-11-06 08:23:56',
          agent: 'Supply Chain Agent',
          action: 'Check Raw Material Availability',
          database: 'Supplier Portal',
          query: 'SELECT raw_material_status, moq FROM supplier_catalog WHERE supplier_id = "SUP_042" AND sku_id = "SKU001"',
          dataRetrieved: { rawMaterialStatus: 'In Stock', moq: 20, currentCapacity: 200 },
          thinking: 'Supplier has raw materials in stock. MOQ is 20 units, well below our anticipated order quantity. No supply constraints.',
          nextAgent: 'Pricing Agent'
        },
        {
          timestamp: '2025-11-06 08:24:01',
          agent: 'Pricing Agent',
          action: 'Query Current Pricing Strategy',
          database: 'Pricing Engine',
          query: 'SELECT current_price, base_cost, margin_pct, next_markdown_date FROM pricing WHERE sku_id = "SKU001"',
          dataRetrieved: { currentPrice: 2499, baseCost: 1199, marginPct: 52, nextMarkdownDate: '2025-12-20' },
          thinking: 'SKU is at full price with strong 52% margin. No markdown planned for 45 days. We can maintain pricing power through the campaign period.',
          nextAgent: 'Pricing Agent'
        },
        {
          timestamp: '2025-11-06 08:24:05',
          agent: 'Pricing Agent',
          action: 'Analyze Price Elasticity',
          database: 'Analytics DB',
          query: 'SELECT price_elasticity, demand_sensitivity FROM pricing_models WHERE sku_id = "SKU001"',
          dataRetrieved: { priceElasticity: -0.42, demandSensitivity: 'Low' },
          thinking: 'Low price elasticity (-0.42) means demand is relatively insensitive to price. Full-price strategy is optimal for maximizing revenue during campaign.',
          nextAgent: 'Decision Engine'
        },
        {
          timestamp: '2025-11-06 08:24:15',
          agent: 'Decision Engine',
          action: 'Synthesize Multi-Agent Inputs',
          database: null,
          query: null,
          dataRetrieved: {
            inventoryScore: 92,
            marketingScore: 88,
            supplyChainScore: 95,
            pricingScore: 90,
            weightedScore: 91.3
          },
          thinking: 'All agents align on urgency. Inventory critically low (2.7d), campaign in 5d drives demand spike, supplier can deliver in time, pricing is optimal. Clear recommendation: order 36 units immediately.',
          nextAgent: 'Size Distribution Model'
        },
        {
          timestamp: '2025-11-06 08:24:18',
          agent: 'Size Distribution Model',
          action: 'Calculate Optimal Size Mix',
          database: 'Analytics DB',
          query: 'SELECT size, sales_mix_pct, current_stock FROM size_performance WHERE sku_id = "SKU001" AND store_id = "STR023"',
          dataRetrieved: {
            sizes: [
              { size: 'S', mixPct: 22, currentStock: 2, recommended: 8 },
              { size: 'M', mixPct: 34, currentStock: 4, recommended: 12 },
              { size: 'L', mixPct: 28, currentStock: 4, recommended: 10 },
              { size: 'XL', mixPct: 16, currentStock: 2, recommended: 6 }
            ]
          },
          thinking: 'Size distribution based on historical sales mix and current stock levels. M is highest velocity, followed by L, S, then XL. Total recommendation: 36 units.',
          nextAgent: 'Orchestrator'
        },
        {
          timestamp: '2025-11-06 08:24:22',
          agent: 'Orchestrator',
          action: 'Generate Final Recommendation',
          database: 'Recommendations DB',
          query: 'INSERT INTO recommendations (sku_id, store_id, action, quantity, confidence, priority) VALUES (...)',
          dataRetrieved: {
            recommendationId: 'REC_20251106_001',
            action: 'REPLENISH',
            quantity: 36,
            confidence: 94,
            priority: 'CRITICAL',
            expectedRevenue: 89964
          },
          thinking: 'Final recommendation generated with 94% confidence. Order 36 units (S:8, M:12, L:10, XL:6) immediately. Expected revenue impact: ₹89,964. Queued for user approval.',
          nextAgent: null
        }
      ]
    },
    {
      id: 'SKU002',
      name: 'Classic White Shirt',
      store: 'AND Delhi Saket',
      storeId: 'STR045',
      zone: 'North',
      category: 'Tops',
      season: 'SS25',
      fabric: 'Cotton',
      currentStock: 8,
      warehouseStock: 32,
      inTransit: 12,
      rateOfSale: 3.8,
      daysToStockout: 2.1,
      aiConfidence: 91,
      priority: 'Critical',
      totalImpact: '₹69,982',
      sizes: [
        { size: 'S', stock: 1, recommendation: 6, impact: '₹14,994' },
        { size: 'M', stock: 3, recommendation: 10, impact: '₹24,990' },
        { size: 'L', stock: 3, recommendation: 8, impact: '₹19,992' },
        { size: 'XL', stock: 1, recommendation: 4, impact: '₹9,996' }
      ],
      decisionContext: "This is a core wardrobe staple with consistent 3.8 ROS. You're 2.1 days from stockout, but unlike the dress above, there's no active campaign driving this - it's just steady baseline demand. The supplier maintains buffer stock for fast-movers like this and can deliver in 2 days with 96% reliability. There are already 12 units in transit, so the recommendation accounts for that. The steady pricing strategy (no end-of-season markdown planned) means we can confidently restock without markdown risk.",
      whatIfStarters: [
        "What if we wait for the 12 in-transit units to arrive first?",
        "What if we order 30% less since there's no campaign pressure?",
        "What if demand suddenly drops after restocking?",
        "Can we split this order between two suppliers for speed?"
      ],
      decisionFactors: {
        inventory: {
          weight: 30,
          score: 95,
          narrative: "Critically low at 2.1 days. High velocity at 3.8 ROS. This is a consistent performer with predictable demand patterns, making the recommendation low-risk."
        },
        marketing: {
          weight: 20,
          score: 75,
          narrative: "No active campaigns planned, but this is a core item with steady demand. The 'work from office' trend is supporting ongoing baseline sales without needing promotion."
        },
        supplyChain: {
          weight: 30,
          score: 92,
          narrative: "Fast-moving supplier relationship with 2-day lead time and 96% reliability. They maintain buffer stock specifically for core items. 12 units already in transit arriving in 2 days."
        },
        pricing: {
          weight: 20,
          score: 88,
          narrative: "Stable full-price positioning. Core items like this maintain pricing integrity. No markdown until end-of-season clearance, which means we can restock confidently."
        }
      }
    }
  ];

  // Enhanced Movement items with multivariate decision factors
  const movementItems = [
    {
      id: 'SKU101',
      name: 'Wool Blend Coat',
      store: 'AND Chennai T-Nagar',
      storeId: 'STR112',
      zone: 'South',
      season: 'FW24',
      category: 'Outerwear',
      fabric: 'Wool Blend',
      currentStock: 28,
      warehouseStock: 12,
      daysInStore: 42,
      rateOfSale: 0,
      aiConfidence: 92,
      recommendation: 'Consolidate to Warehouse',
      targetAction: 'Pull Back',
      impact: '-₹54,000',
      severity: 'High',
      reason: 'Zero sales in 42 days with no prospect of movement.',
      dataPoints: [
        'Category avg sell-through: South 12% vs North 68%',
        'Similar SKUs: 0.1 ROS in South, 3.2 ROS in North',
        'Store profile: Low performance on FW outerwear'
      ],
      sizes: [
        { size: 'S', stock: 5, recommendation: 'Pull back', targetLocation: 'Warehouse' },
        { size: 'M', stock: 8, recommendation: 'Pull back', targetLocation: 'Warehouse' },
        { size: 'L', stock: 10, recommendation: 'Pull back', targetLocation: 'Warehouse' },
        { size: 'XL', stock: 5, recommendation: 'Pull back', targetLocation: 'Warehouse' }
      ],
      decisionContext: "This is a clear location mismatch. You've had zero sales in 42 days in Chennai where average temperature is 28°C. Meanwhile, similar wool coats in North zone stores are selling at 3.2 ROS. Rather than transferring to North (which would cost ₹180/unit and take 4-5 days), pulling back to warehouse makes sense because: (1) warehouse has capacity at 68% utilization, (2) this SKU is already on 20% markdown, suggesting a broader issue, and (3) you can bundle it for a coordinated clearance promotion later rather than chasing individual store performance. The ₹54K 'negative impact' is actually tied-up capital you're freeing up.",
      whatIfStarters: [
        "What if we transfer to North stores instead of warehouse?",
        "What if we deepen the markdown to 40% and keep it in Chennai?",
        "What if we wait another 30 days to see if any sales materialize?",
        "Can we bundle this with better-selling items for a promotion?"
      ],
      decisionFactors: {
        inventory: {
          weight: 25,
          score: 85,
          narrative: "42 days of zero movement despite adequate floor visibility. This is a strong signal of fundamental mismatch between product and location, not just a temporary slowdown."
        },
        marketing: {
          weight: 20,
          score: 40,
          narrative: "No winter wear campaigns planned for South region - all promotional budget is directed to North/NCR where climate is appropriate. Marketing won't fix this location issue."
        },
        supplyChain: {
          weight: 30,
          score: 95,
          narrative: "Reverse logistics ready. Transfer to warehouse costs ₹180/unit with 4-5 day transit. Warehouse is at 68% utilization with plenty of space. Can consolidate for later clearance campaign."
        },
        pricing: {
          weight: 25,
          score: 70,
          narrative: "Already at 20% markdown but not moving. Deeper discounts would erode margin significantly. Better to consolidate and create a coordinated clearance strategy later with bundles."
        }
      },
      decisionTrail: [
        {
          timestamp: '2025-11-06 08:25:32',
          agent: 'Orchestrator',
          action: 'Initiated Analysis',
          database: null,
          query: null,
          dataRetrieved: null,
          thinking: 'Detected stagnant inventory for SKU101 at Chennai T-Nagar. Zero sales for 42 days. Triggering multi-agent analysis for movement recommendation.',
          nextAgent: 'Inventory Agent'
        },
        {
          timestamp: '2025-11-06 08:25:41',
          agent: 'Inventory Agent',
          action: 'Query Stagnation Metrics',
          database: 'POS System',
          query: 'SELECT days_in_store, total_sales, last_sale_date FROM inventory WHERE sku_id = "SKU101" AND store_id = "STR112"',
          dataRetrieved: { daysInStore: 42, totalSales: 0, lastSaleDate: null, currentStock: 28 },
          thinking: 'Complete stagnation for 42 days. Zero sales despite being in store. This is not a temporary dip - fundamental issue with product-location fit.',
          nextAgent: 'Inventory Agent'
        },
        {
          timestamp: '2025-11-06 08:25:48',
          agent: 'Inventory Agent',
          action: 'Analyze Regional Performance',
          database: 'Analytics DB',
          query: 'SELECT zone, AVG(rate_of_sale) FROM inventory WHERE product_category = "Wool_Outerwear" AND season = "FW24" GROUP BY zone',
          dataRetrieved: {
            South: 0.1,
            North: 3.2,
            East: 1.8,
            West: 2.1
          },
          thinking: 'Massive regional disparity. South zone ROS is 0.1 while North is 3.2 - a 32x difference! This is a climate-driven mismatch, not a product issue.',
          nextAgent: 'Inventory Agent'
        },
        {
          timestamp: '2025-11-06 08:25:52',
          agent: 'Inventory Agent',
          action: 'Check Weather Context',
          database: 'Weather API',
          query: 'SELECT city, avg_temp_30d FROM weather WHERE city IN ("Chennai", "Delhi", "Mumbai", "Kolkata")',
          dataRetrieved: {
            Chennai: 28,
            Delhi: 14,
            Mumbai: 26,
            Kolkata: 22
          },
          thinking: 'Chennai average temp is 28°C - completely inappropriate for wool outerwear. Delhi at 14°C is ideal. Climate confirms the location mismatch hypothesis.',
          nextAgent: 'Marketing Agent'
        },
        {
          timestamp: '2025-11-06 08:26:28',
          agent: 'Marketing Agent',
          action: 'Query Regional Campaign Plans',
          database: 'Marketing Calendar',
          query: 'SELECT region, campaign_name, budget FROM campaigns WHERE category = "Winter_Wear" AND start_date >= NOW()',
          dataRetrieved: {
            North: [{ name: 'Winter Essentials', budget: 250000 }, { name: 'Cozy Season', budget: 180000 }],
            South: []
          },
          thinking: 'Zero winter wear campaigns planned for South region. All marketing budget focused on North where there is climate fit. Marketing cannot solve this.',
          nextAgent: 'Marketing Agent'
        },
        {
          timestamp: '2025-11-06 08:26:32',
          agent: 'Marketing Agent',
          action: 'Analyze Category Fit Score',
          database: 'Analytics DB',
          query: 'SELECT category_affinity_score FROM store_profiles WHERE store_id = "STR112" AND category = "Wool_Outerwear"',
          dataRetrieved: { categoryAffinityScore: 2.1, maxScore: 10, percentile: 5 },
          thinking: 'Store has extremely low affinity (2.1/10) for winter outerwear. Bottom 5th percentile. Store profile mismatch in addition to climate.',
          nextAgent: 'Supply Chain Agent'
        },
        {
          timestamp: '2025-11-06 08:26:45',
          agent: 'Supply Chain Agent',
          action: 'Evaluate Transfer Options',
          database: 'Logistics Portal',
          query: 'SELECT destination, cost_per_unit, transit_days FROM logistics_routes WHERE origin_store = "STR112" AND sku_category = "Outerwear"',
          dataRetrieved: {
            toWarehouse: { cost: 180, transitDays: 4.5 },
            toNorthStores: { cost: 180, transitDays: 4.5 }
          },
          thinking: 'Transfer cost is same whether to warehouse or North stores (₹180/unit). Transit time also similar (4-5 days). Need to evaluate which option is better strategically.',
          nextAgent: 'Supply Chain Agent'
        },
        {
          timestamp: '2025-11-06 08:26:48',
          agent: 'Supply Chain Agent',
          action: 'Check Warehouse Capacity',
          database: 'Warehouse Management',
          query: 'SELECT current_utilization, available_space_units FROM warehouse_status WHERE warehouse_id = "WH_001"',
          dataRetrieved: { currentUtilization: 68, availableSpaceUnits: 3200, category: 'All' },
          thinking: 'Warehouse is at 68% utilization - plenty of space. We can consolidate this inventory for a coordinated clearance campaign rather than chasing individual store transfers.',
          nextAgent: 'Supply Chain Agent'
        },
        {
          timestamp: '2025-11-06 08:26:55',
          agent: 'Supply Chain Agent',
          action: 'Analyze North Store Demand',
          database: 'Analytics DB',
          query: 'SELECT store_id, available_space, current_ros FROM store_inventory WHERE zone = "North" AND category = "Wool_Outerwear"',
          dataRetrieved: {
            stores: [
              { storeId: 'STR045', space: 15, ros: 3.4 },
              { storeId: 'STR046', space: 8, ros: 2.9 }
            ]
          },
          thinking: 'North stores have limited space and are already performing well. Transferring would create overcrowding. Warehouse consolidation is cleaner.',
          nextAgent: 'Pricing Agent'
        },
        {
          timestamp: '2025-11-06 08:27:03',
          agent: 'Pricing Agent',
          action: 'Query Current Markdown',
          database: 'Pricing Engine',
          query: 'SELECT current_discount_pct, markdown_start_date, sales_lift_pct FROM pricing WHERE sku_id = "SKU101"',
          dataRetrieved: { discountPct: 20, markdownStartDate: '2025-10-23', salesLiftPct: 0, daysAtMarkdown: 14 },
          thinking: 'Already at 20% markdown for 14 days with ZERO sales lift. Markdown is ineffective because the root cause is location, not price. Deeper discount would just erode margin.',
          nextAgent: 'Pricing Agent'
        },
        {
          timestamp: '2025-11-06 08:27:08',
          agent: 'Pricing Agent',
          action: 'Evaluate Bundle Opportunities',
          database: 'Analytics DB',
          query: 'SELECT bundle_affinity_score FROM product_relationships WHERE sku_id = "SKU101" ORDER BY score DESC LIMIT 5',
          dataRetrieved: {
            bundles: [
              { withSKU: 'SKU105', score: 78, type: 'Scarf' },
              { withSKU: 'SKU112', score: 72, type: 'Boots' }
            ]
          },
          thinking: 'High bundle affinity with scarves and boots. Better to consolidate and create a "Winter Essentials Bundle" campaign later than deepen individual discounts.',
          nextAgent: 'Decision Engine'
        },
        {
          timestamp: '2025-11-06 08:27:22',
          agent: 'Decision Engine',
          action: 'Synthesize Multi-Agent Inputs',
          database: null,
          query: null,
          dataRetrieved: {
            inventoryScore: 85,
            marketingScore: 40,
            supplyChainScore: 95,
            pricingScore: 70,
            weightedScore: 77.5
          },
          thinking: 'Clear consensus: location mismatch driven by climate. Marketing cannot fix this. Warehouse consolidation better than store transfer. Prepare for bundle strategy. Recommendation: Pull back to warehouse.',
          nextAgent: 'Orchestrator'
        },
        {
          timestamp: '2025-11-06 08:27:28',
          agent: 'Orchestrator',
          action: 'Generate Final Recommendation',
          database: 'Recommendations DB',
          query: 'INSERT INTO recommendations (sku_id, store_id, action, destination, confidence, priority) VALUES (...)',
          dataRetrieved: {
            recommendationId: 'REC_20251106_002',
            action: 'CONSOLIDATE',
            destination: 'Warehouse',
            quantity: 28,
            confidence: 92,
            priority: 'HIGH',
            capitalFreed: 54000
          },
          thinking: 'Final recommendation: Consolidate 28 units to warehouse. Free up ₹54K tied-up capital. Prepare for Q1 bundle clearance campaign. Queued for user approval.',
          nextAgent: null
        }
      ]
    },
    {
      id: 'SKU102',
      name: 'Leather Ankle Boots',
      store: 'AND Mumbai Powai',
      storeId: 'STR034',
      zone: 'West',
      season: 'FW24',
      category: 'Footwear',
      fabric: 'Genuine Leather',
      currentStock: 18,
      warehouseStock: 8,
      daysInStore: 38,
      rateOfSale: 0.2,
      aiConfidence: 88,
      recommendation: 'Move to High-Performing Stores',
      targetAction: 'Transfer',
      targetStores: [
        { store: 'AND Delhi Connaught Place', storeId: 'STR045', reason: 'Boots category ROS: 4.2/d, Size 7-8 deficit of 12 units' },
        { store: 'AND Delhi Select City Walk', storeId: 'STR046', reason: 'Boots category ROS: 3.8/d, Premium customer base matches price point' }
      ],
      impact: '+₹28,000',
      severity: 'Medium',
      reason: 'Minimal movement in current location with strong demand in target stores.',
      dataPoints: [
        'Target stores avg boots ROS: 3.8/d vs current 0.2/d',
        'Size 7-8 high demand at Delhi Connaught (deficit of 12 units)',
        'Price band ₹3-4K: 68% sell-through in North vs 22% in West Powai'
      ],
      sizes: [
        { size: '6', stock: 3, recommendation: 'Move', targetLocation: 'STR045 (2), STR046 (1)' },
        { size: '7', stock: 5, recommendation: 'Move', targetLocation: 'STR045 (3), STR051 (2)' },
        { size: '8', stock: 6, recommendation: 'Move', targetLocation: 'STR045 (3), STR046 (2), STR051 (1)' },
        { size: '9', stock: 4, recommendation: 'Move', targetLocation: 'STR046 (2), STR051 (2)' }
      ],
      decisionContext: "This is a transfer opportunity with strong ROI. While you have minimal sales (0.2 ROS) at Mumbai Powai, Delhi stores are showing 3.8-4.2 ROS for boots and specifically have stockout risk in sizes 7-8. Transfer cost is ₹150/unit (₹2,700 total) with 3-day transit. The 'Winter Essentials' campaign launches in Delhi on Nov 15, which would hit right as these boots arrive. At ₹3-4K price point, Delhi stores show 68% sell-through vs 22% at Powai. The expected revenue uplift of ₹28K gives us a 940% ROI even after transfer costs. Target stores specifically requested these sizes in their last allocation meeting.",
      whatIfStarters: [
        "What if we transfer only to the top-performing store?",
        "What if the campaign gets delayed and boots arrive before demand peaks?",
        "What if we discount 20% at Powai instead of transferring?",
        "Can we do a phased transfer - send 50% now and decide on rest later?"
      ],
      decisionFactors: {
        inventory: {
          weight: 20,
          score: 75,
          narrative: "Low velocity at 0.2 ROS but not stagnant - indicates location mismatch rather than product failure. Size distribution matches target store needs, particularly 7-8."
        },
        marketing: {
          weight: 30,
          score: 85,
          narrative: "'Winter Essentials' campaign launches Nov 15 in Delhi with focus on footwear. Expected 40% lift. Transfer timing (3 days) puts arrival perfectly aligned with campaign start."
        },
        supplyChain: {
          weight: 25,
          score: 90,
          narrative: "Inter-store transfer costs ₹150/unit via regular logistics. Total cost ₹2,700. Transit time is 3 days with 96% on-time record. ROI is 940% based on expected revenue at target stores."
        },
        pricing: {
          weight: 25,
          score: 92,
          narrative: "Premium ₹3-4K price point maintained in target stores with high acceptance. Delhi market shows 68% sell-through at this price vs 22% in Powai. No markdown needed - it's a location issue, not a pricing issue."
        }
      }
    }
  ];

  return (
    <div className="flex h-screen bg-[#E7DDCA]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
<div className='h-10 w-26 relative'>
  <Image src={"/morrie.svg"} fill className='absolute object-contain' alt='Logo'/>
</div>
        </div>
        
        <nav className="flex-1 p-4">
          {[
            { id: 'dashboard', icon: Sparkles, label: 'Dashboard' },
            { id: 'overview', icon: LayoutDashboard, label: 'SKU Overview' },
            { id: 'replenishment', icon: TrendingUp, label: 'Replenishment', badge: 2 },
            { id: 'movement', icon: ArrowRight, label: 'Movement', badge: 2 }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all font-light text-black`}
            >
              <item.icon className="w-5 h-5" strokeWidth={1} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-[#DF7649] text-white text-xs px-2 py-0.5 rounded-full font-light">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {currentView !== 'dashboard' && (
                <>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-[#ffffff] rounded text-sm text-[#000000] flex items-center gap-2 transition-all font-medium"
                  >
                    <Filter className="w-4 h-4" strokeWidth={1.5} />
                    Filters
                    {showFilters && <X className="w-3 h-3 ml-1" strokeWidth={2} />}
                  </button>
                  
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#878B87]" strokeWidth={1.5} />
                    <input
                      type="text"
                      placeholder="Search SKU, Store..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#85A383] w-96 font-light"
                    />
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {(currentView === 'replenishment' || currentView === 'movement') && (
                <button 
                  className="px-6 py-2.5 rounded text-sm flex items-center gap-2 transition-all font-medium shadow-lg"
                  style={{ 
                    backgroundColor: currentView === 'replenishment' 
                      ? (selectedReplenishment.length > 0 ? '#85A383' : '#878B87')
                      : (selectedMovement.length > 0 ? '#85A383' : '#878B87'),
                    color: 'white',
                    cursor: (currentView === 'replenishment' ? selectedReplenishment.length : selectedMovement.length) > 0 ? 'pointer' : 'not-allowed'
                  }}
                  disabled={currentView === 'replenishment' ? selectedReplenishment.length === 0 : selectedMovement.length === 0}
                  onMouseEnter={(e) => {
                    const count = currentView === 'replenishment' ? selectedReplenishment.length : selectedMovement.length;
                    if (count > 0) e.currentTarget.style.backgroundColor = '#6B8A6A';
                  }}
                  onMouseLeave={(e) => {
                    const count = currentView === 'replenishment' ? selectedReplenishment.length : selectedMovement.length;
                    if (count > 0) e.currentTarget.style.backgroundColor = '#85A383';
                  }}
                >
                  <Check className="w-4 h-4" strokeWidth={1.5} />
                  Execute Selected ({currentView === 'replenishment' ? selectedReplenishment.length : selectedMovement.length})
                </button>
              )}
              
              {currentView !== 'dashboard' && (
                <button className="px-5 py-2.5 bg-white border-2 border-gray-300 text-[#000000] rounded text-sm flex items-center gap-2 transition-all font-medium">
                  <Download className="w-4 h-4" strokeWidth={1.5} />
                  Export
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="mt-5 p-6 rounded-lg border border-gray-200" style={{ backgroundColor: '#E7DDCA30' }}>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Season</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Seasons</option>
                    <option>SS25</option>
                    <option>FW24</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Zone</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Zones</option>
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All Categories</option>
                    <option>Dresses</option>
                    <option>Tops</option>
                    <option>Bottoms</option>
                    <option>Outerwear</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-2 block">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#85A383]">
                    <option>All</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-300">
                <button className="px-5 py-2 rounded text-sm font-medium transition-all" style={{ backgroundColor: '#85A383', color: 'white' }}>
                  Apply Filters
                </button>
                <button className="px-5 py-2 bg-white border border-gray-300 rounded text-sm text-[#878B87] font-medium hover:bg-gray-50 transition-all">
                  Reset All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 bg-[#ffffff]">
          {currentView === 'dashboard' && (
            <div>
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#85A383' }}>
                    <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-3xl text-[#0C2C18] font-light">Good morning! Let's talk about your inventory</h2>
                    <p className="text-[#878B87] font-light">Thursday, November 06, 2025 • Your multivariate intelligence briefing</p>
                  </div>
                </div>
              </div>

              {/* Critical Actions Banner */}
              <div className="mb-8 p-6 rounded-xl border-l-4" style={{ backgroundColor: '#DF764915', borderLeftColor: '#DF7649' }}>
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#DF7649' }} strokeWidth={1.5} />
                  <div className="flex-1">
                    <h3 className="text-xl text-[#0C2C18] font-medium mb-2">4 decisions need your input today</h3>
                    <p className="text-[#878B87] font-light mb-4 leading-relaxed">
                      I've identified 2 critical stockouts (both with campaigns starting in 5 days) and 2 location mismatches tying up ₹82K. 
                      Each recommendation considers your inventory position, active marketing campaigns, supplier reliability, and pricing strategy. 
                      Let's start with the most urgent: the <span className="font-medium text-[#0C2C18]">Floral Summer Dress</span> at Mumbai Central will stockout in 2.7 days, right before your Instagram campaign.
                    </p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setCurrentView('replenishment')} className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md" style={{ backgroundColor: '#85A383', color: 'white' }}>
                        View Replenishment (2)
                      </button>
                      <button onClick={() => setCurrentView('movement')} className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md border-2" style={{ borderColor: '#DF7649', color: '#DF7649', backgroundColor: 'white' }}>
                        View Movement (2)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversational Insights Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Marketing Conversation */}
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4" style={{ borderLeftColor: '#85A383' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <ShoppingBag className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                    <h3 className="text-lg text-[#0C2C18] font-medium">Campaign spend locks in Nov 1-14 demand window</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-[#878B87] font-light leading-relaxed">
                      Your marketing team has the <span className="font-medium text-[#0C2C18]">'Summer Collection Launch'</span> campaign 
                      starting Nov 11 with an ₹85K budget. Historical data shows this campaign type typically drives 25-30% traffic lift 
                      with 18% conversion.
                    </p>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#85A38315' }}>
                      <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-1">Campaign Impact</div>
                      <div className="text-sm text-[#878B87] font-light">
                        2 SKUs in replenishment queue are featured in this campaign. Both need stock before campaign start to capture the lift.
                      </div>
                    </div>
                    <button onClick={() => setCurrentView('replenishment')} className="text-sm font-medium hover:underline" style={{ color: '#85A383' }}>
                      Which SKUs are affected? →
                    </button>
                  </div>
                </div>

                {/* Supply Chain Conversation */}
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4" style={{ borderLeftColor: '#85A383' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Truck className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                    <h3 className="text-lg text-[#0C2C18] font-medium">Warehouse stock covers only 4 days at campaign velocity</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-[#878B87] font-light leading-relaxed">
                      Your Mumbai DC currently holds 340 units of RS-2407 and 180 units of RS-2412—the two hero SKUs in the Diwali campaign. At normal velocity, this is 18 days of cover. But when the campaign launches Nov 1, these SKUs typically accelerate to 4.2x baseline velocity based on last year's festive campaign data, which drops your coverage to just 4.3 days.
                    </p>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#85A38315' }}>
                      <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-1">ALLOCATION DECISION</div>
                      <div className="text-sm text-[#878B87] font-light">
          Delhi and Bangalore flagships are forecasting 65% of the campaign traffic but currently allocated only 42% of available stock. Reallocating 140 units from slower stores to these high-traffic locations could capture an additional ₹2.8L in GMV during the peak campaign window, but it leaves tier-2 stores understocked if the campaign performs differently than expected.
                      </div>
                    </div>
                    <button className="text-sm font-medium hover:underline" style={{ color: '#85A383' }}>
                      Compare allocation scenarios →
                    </button>
                  </div>
                </div>

                {/* Location Mismatch Conversation */}
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4" style={{ borderLeftColor: '#DF7649' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5" style={{ color: '#DF7649' }} strokeWidth={1.5} />
                    <h3 className="text-lg text-[#0C2C18] font-medium">₹9.2L stuck in weather-wrong locations"</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-[#878B87] font-light leading-relaxed">
                      I found a <span className="font-medium text-[#0C2C18]">wool coat in Chennai</span> with zero sales in 42 days 
                      (avg temp: 28°C), while similar styles in North zone show 3.2 ROS. There's also leather boots underperforming 
                      in Mumbai but showing 4.2 ROS in Delhi.
                    </p>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#DF764920' }}>
                      <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-1">Tied Up Capital</div>
                      <div className="text-sm text-[#878B87] font-light">
                        ₹82K is sitting stagnant. Movement or consolidation can free this up for better opportunities.
                      </div>
                    </div>
                    <button onClick={() => setCurrentView('movement')} className="text-sm font-medium hover:underline" style={{ color: '#85A383' }}>
                      Show me the options →
                    </button>
                  </div>
                </div>

                {/* Pricing Strategy Conversation */}
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4" style={{ borderLeftColor: '#85A383' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-5 h-5" style={{ color: '#85A383' }} strokeWidth={1.5} />
                    <h3 className="text-lg text-[#0C2C18] font-medium">Full-price velocity protects 54% margins</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-[#878B87] font-light leading-relaxed">
                      All replenishment recommendations are full-price items with no markdown planned for 45+ days. Your margins 
                      are protected at 52-58%. The only markdown item (AW24 jeans at 30% off) isn't accelerating velocity, 
                      suggesting it needs a different approach.
                    </p>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#85A38315' }}>
                      <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-1">Recommendation</div>
                      <div className="text-sm text-[#878B87] font-light">
                        Consider bundling the AW24 jeans with higher-velocity items rather than deepening the discount further.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What-If Scenarios Section */}
              <div className="mb-8">
                <h3 className="text-2xl text-[#0C2C18] font-light mb-5">Explore scenarios with me</h3>
                <div className="bg-white rounded-xl p-6 shadow-md border-2" style={{ borderColor: '#85A383' }}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#85A383' }}>
                      <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg text-[#0C2C18] font-medium mb-2">I can help you think through alternatives</h4>
                      <p className="text-sm text-[#878B87] font-light mb-4 leading-relaxed">
                        Not sure about a recommendation? Want to explore what happens if plans change? I can model scenarios across 
                        inventory, marketing, supply chain, and pricing. Here are some questions I can answer:
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#85A383] transition-all cursor-pointer">
                          <div className="text-sm font-medium text-[#0C2C18] mb-1">"What if the campaign gets delayed by 2 weeks?"</div>
                          <div className="text-xs text-[#878B87]">Impact on replenishment timing and quantities</div>
                        </div>
                        <div className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#85A383] transition-all cursor-pointer">
                          <div className="text-sm font-medium text-[#0C2C18] mb-1">"What if we order only 50% now?"</div>
                          <div className="text-xs text-[#878B87]">Risk analysis and phased approach</div>
                        </div>
                        <div className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#85A383] transition-all cursor-pointer">
                          <div className="text-sm font-medium text-[#0C2C18] mb-1">"What if we transfer to only one store?"</div>
                          <div className="text-xs text-[#878B87]">Cost-benefit on partial transfers</div>
                        </div>
                        <div className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#85A383] transition-all cursor-pointer">
                          <div className="text-sm font-medium text-[#0C2C18] mb-1">"What if supplier lead time extends to 5 days?"</div>
                          <div className="text-xs text-[#878B87]">Stockout risk and mitigation options</div>
                        </div>
                      </div>
                      <div className="mt-5 pt-5 border-t border-gray-200">
                        <p className="text-sm text-[#878B87] font-light mb-3">
                          Head to any recommendation and click "Ask Morrie" to start exploring scenarios specific to that decision.
                        </p>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setCurrentView('replenishment')} className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md" style={{ backgroundColor: '#85A383', color: 'white' }}>
                            Start with Replenishment
                          </button>
                          <button onClick={() => setCurrentView('movement')} className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md border-2" style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: 'white' }}>
                            Or explore Movement
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Snapshot */}
              <div className="mb-8">
                <h3 className="text-2xl text-[#0C2C18] font-light mb-5">Quick performance snapshot</h3>
                <div className="grid grid-cols-4 gap-5">
                  <div className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Avg Sell-Through</div>
                    <div className="text-3xl font-light mb-1" style={{ color: '#85A383' }}>64%</div>
                    <div className="flex items-center gap-2 text-sm text-[#878B87]">
                      <TrendingUp className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />
                      <span className="font-light">+8% vs last week</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Stockout Risk</div>
                    <div className="text-3xl font-light mb-1" style={{ color: '#DF7649' }}>2 SKUs</div>
                    <div className="flex items-center gap-2 text-sm text-[#878B87]">
                      <AlertCircle className="w-4 h-4" style={{ color: '#DF7649' }} strokeWidth={1.5} />
                      <span className="font-light">&lt;3 days cover</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Stagnant Stock</div>
                    <div className="text-3xl font-light mb-1" style={{ color: '#DF7649' }}>2 SKUs</div>
                    <div className="flex items-center gap-2 text-sm text-[#878B87]">
                      <Clock className="w-4 h-4" style={{ color: '#DF7649' }} strokeWidth={1.5} />
                      <span className="font-light">&gt;38 days no sale</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-xs uppercase tracking-wider font-medium text-[#878B87] mb-2">Active Campaigns</div>
                    <div className="text-3xl text-[#0C2C18] font-light mb-1">2</div>
                    <div className="flex items-center gap-2 text-sm text-[#878B87]">
                      <Target className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />
                      <span className="font-light">Launching in 5 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'overview' && (
            <div>
              <div className="mb-10">
                <h2 className="text-3xl text-[#0C2C18] mb-3 font-light">SKU Lifecycle Overview</h2>
                <p className="text-[#878B87] font-light">Complete product performance tracking</p>
              </div>

              <div className="grid grid-cols-5 gap-5 mb-10">
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="text-xs text-[#878B87] uppercase tracking-wider font-light mb-2">Total SKUs</div>
                  <div className="text-3xl text-[#0C2C18] font-light">24</div>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="text-xs text-[#878B87] uppercase tracking-wider font-light mb-2">Total Stock</div>
                  <div className="text-3xl text-[#0C2C18] font-light">1,854</div>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="text-xs text-[#878B87] uppercase tracking-wider font-light mb-2">Avg ROS</div>
                  <div className="text-3xl text-[#0C2C18] font-light">2.8/d</div>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="text-xs text-[#878B87] uppercase tracking-wider font-light mb-2">Sell Through</div>
                  <div className="text-3xl font-light" style={{ color: '#85A383' }}>64%</div>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <div className="text-xs text-[#878B87] uppercase tracking-wider font-light mb-2">Avg Margin</div>
                  <div className="text-3xl text-[#0C2C18] font-light">48%</div>
                </div>
              </div>

              <div className="space-y-5">
                {fashionSKUs.map((sku) => (
                  <div key={sku.id} className="bg-white rounded-xl border-l-4 overflow-hidden shadow-md hover:shadow-2xl transition-all" style={{ borderLeftColor: '#85A383' }}>
                    <div className="p-7">
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-2xl text-[#0C2C18] font-light">{sku.name}</h3>
                                <span className="text-xs text-[#878B87] font-mono font-light px-2 py-1 bg-gray-100 rounded">{sku.id}</span>
                              </div>
                              
                              {sku.anomaly && (
                                <div className="mb-3 p-3 rounded-lg border-l-4" style={{ 
                                  backgroundColor: sku.anomaly.type === 'positive' ? '#85A38315' : '#DF764915',
                                  borderLeftColor: sku.anomaly.type === 'positive' ? '#85A383' : '#DF7649'
                                }}>
                                  <div className="flex items-start gap-2">
                                    <Bell className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: sku.anomaly.type === 'positive' ? '#85A383' : '#DF7649' }} strokeWidth={1.5} />
                                    <div>
                                      <div className="text-xs uppercase tracking-wider font-medium mb-1" style={{ color: sku.anomaly.type === 'positive' ? '#85A383' : '#DF7649' }}>
                                        {sku.anomaly.type === 'positive' ? 'Positive Signal' : 'Attention Needed'}
                                      </div>
                                      <p className="text-sm text-[#878B87] font-light">{sku.anomaly.message}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="grid grid-cols-3 gap-x-6 gap-y-2 mb-3">
                                <div className="flex items-center gap-2 text-sm">
                                  <Tag className="w-4 h-4" strokeWidth={1.5} style={{ color: '#85A383' }} />
                                  <span className="text-[#0C2C18] font-medium">{sku.mrp}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="w-4 h-4" strokeWidth={1.5} style={{ color: '#85A383' }} />
                                  <span className="text-[#878B87] font-light">{sku.season} • {sku.collection}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="w-4 h-4" strokeWidth={1.5} style={{ color: '#85A383' }} />
                                  <span className="text-[#878B87] font-light">Launched {sku.daysSinceLaunch}d ago</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium" style={{ backgroundColor: '#85A38320', color: '#85A383' }}>
                                  {sku.lifecycle}
                                </span>
                                <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium" style={{ backgroundColor: sku.markdownStatus === 'Full Price' ? '#E7DDCA' : '#DF764920', color: sku.markdownStatus === 'Full Price' ? '#0C2C18' : '#DF7649' }}>
                                  {sku.markdownStatus}
                                </span>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => setLifecycleModal(lifecycleModal === sku.id ? null : sku.id)}
                              className="px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all font-medium shadow-md hover:shadow-lg ml-4"
                              style={{ backgroundColor: '#85A383', color: 'white' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B8A6A'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#85A383'}
                            >
                              <BarChart3 className="w-4 h-4" strokeWidth={1.5} />
                              View Lifecycle
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-7 gap-3 mb-4">
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1" style={{ color: '#878B87' }}>EBO</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.eboInventory}</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1" style={{ color: '#878B87' }}>E-com</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.ecomInventory}</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1" style={{ color: '#878B87' }}>LFS</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.lfsInventory}</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1" style={{ color: '#878B87' }}>ROS</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.avgROS}/d</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#85A38315' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1" style={{ color: '#878B87' }}>Sell-Thru</div>
                              <div className="text-lg font-medium" style={{ color: '#85A383' }}>{sku.sellThrough}%</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1" style={{ color: '#878B87' }}>Cover</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.stockCover}d</div>
                            </div>
                            <div className="p-3 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1" style={{ color: '#878B87' }}>Margin</div>
                              <div className="text-lg text-[#0C2C18] font-light">{sku.margin}%</div>
                            </div>
                          </div>

                          <button onClick={() => setExpandedSKU(expandedSKU === sku.id ? null : sku.id)} className="text-sm font-medium flex items-center gap-2 transition-all" style={{ color: '#85A383' }}>
                            {expandedSKU === sku.id ? (
                              <><ChevronDown className="w-4 h-4" strokeWidth={2} />Hide Size Breakdown</>
                            ) : (
                              <><ChevronRight className="w-4 h-4" strokeWidth={2} />View Size Breakdown</>
                            )}
                          </button>

                          {expandedSKU === sku.id && (
                            <div className="mt-5 pt-5 border-t border-gray-200">
                              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-gray-200" style={{ backgroundColor: '#E7DDCA30' }}>
                                      <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Size</th>
                                      <th className="py-3 px-3 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Total</th>
                                      <th className="py-3 px-3 text-right text-[#878B87] font-medium uppercase tracking-wider text-xs">EBO</th>
                                      <th className="py-3 px-3 text-right text-[#878B87] font-medium uppercase tracking-wider text-xs">E-com</th>
                                      <th className="py-3 px-3 text-right text-[#878B87] font-medium uppercase tracking-wider text-xs">LFS</th>
                                      <th className="py-3 px-3 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">ROS</th>
                                      <th className="py-3 px-3 text-right font-medium uppercase tracking-wider text-xs" style={{ color: '#85A383' }}>Sell-Thru</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {sku.sizeBreakdown.map((size, idx) => (
                                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 text-[#0C2C18] font-medium">{size.size}</td>
                                        <td className="py-3 px-3 text-right text-[#0C2C18] font-medium">{size.total}</td>
                                        <td className="py-3 px-3 text-right text-[#878B87] font-light">{size.ebo}</td>
                                        <td className="py-3 px-3 text-right text-[#878B87] font-light">{size.ecom}</td>
                                        <td className="py-3 px-3 text-right text-[#878B87] font-light">{size.lfs}</td>
                                        <td className="py-3 px-3 text-right text-[#0C2C18] font-light">{size.ros}/d</td>
                                        <td className="py-3 px-3 text-right font-medium" style={{ color: '#85A383' }}>{size.sellThrough}%</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lifecycle Modal */}
              {lifecycleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
                  <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between" style={{ backgroundColor: '#E7DDCA' }}>
                      <div>
                        <h3 className="text-2xl text-[#0C2C18] font-light">Product Lifecycle Report</h3>
                        <p className="text-sm text-[#878B87] mt-1 font-light">
                          {fashionSKUs.find(s => s.id === lifecycleModal)?.name} • {lifecycleModal}
                        </p>
                      </div>
                      <button onClick={() => setLifecycleModal(null)} className="text-[#878B87] hover:text-[#0C2C18]">
                        <X className="w-6 h-6" strokeWidth={1} />
                      </button>
                    </div>

                    <div className="p-8">
                      {(() => {
                        const sku = fashionSKUs.find(s => s.id === lifecycleModal);
                        if (!sku) return null;
                        
                        return (
                          <>
                            <div className="flex gap-6 mb-8 p-6 rounded-xl" style={{ backgroundColor: '#E7DDCA30' }}>
                              <div className="flex-1">
                                <h4 className="text-2xl text-[#0C2C18] mb-3 font-light">{sku.name}</h4>
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                  <div>
                                    <div className="text-xs uppercase tracking-wider font-light" style={{ color: '#878B87' }}>MRP</div>
                                    <div className="text-xl text-[#0C2C18] font-medium">{sku.mrp}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs uppercase tracking-wider font-light" style={{ color: '#878B87' }}>Launch Date</div>
                                    <div className="text-xl text-[#0C2C18] font-light">{sku.launchDate}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs uppercase tracking-wider font-light" style={{ color: '#878B87' }}>Days Since Launch</div>
                                    <div className="text-xl font-medium" style={{ color: '#85A383' }}>{sku.daysSinceLaunch} days</div>
                                  </div>
                                  <div>
                                    <div className="text-xs uppercase tracking-wider font-light" style={{ color: '#878B87' }}>Lifecycle Stage</div>
                                    <div className="text-xl text-[#0C2C18] font-light">{sku.lifecycle}</div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-5 gap-4">
                                  <div>
                                    <div className="text-xs uppercase tracking-wider font-light" style={{ color: '#878B87' }}>EBO Inventory</div>
                                    <div className="text-lg text-[#0C2C18] font-light">{sku.eboInventory}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs uppercase tracking-wider font-light" style={{ color: '#878B87' }}>Ecom Inventory</div>
                                    <div className="text-lg text-[#0C2C18] font-light">{sku.ecomInventory}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs uppercase tracking-wider font-light" style={{ color: '#878B87' }}>LFS Inventory</div>
                                    <div className="text-lg text-[#0C2C18] font-light">{sku.lfsInventory}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs uppercase tracking-wider font-light" style={{ color: '#878B87' }}>RTV Inventory</div>
                                    <div className="text-lg text-[#0C2C18] font-light">{sku.rtvInventory}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs uppercase tracking-wider font-light" style={{ color: '#878B87' }}>Initial Allocation</div>
                                    <div className="text-lg text-[#0C2C18] font-light">{sku.initialAllocation}</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {sku.storeBreakdown && (
                              <div>
                                <h5 className="text-lg text-[#0C2C18] mb-4 font-medium">Store-Level Performance</h5>
                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#E7DDCA50' }}>
                                        <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Store Name</th>
                                        <th className="py-3 px-3 text-center text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Zone</th>
                                        <th className="py-3 px-3 text-center text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Grade</th>
                                        <th className="py-3 px-3 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Dispatch Qty</th>
                                        <th className="py-3 px-3 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Avg PLC Days</th>
                                        <th className="py-3 px-3 text-right text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Transfer Out</th>
                                        <th className="py-3 px-3 text-right font-medium uppercase tracking-wider text-xs" style={{ color: '#85A383' }}>Value (₹K)</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {sku.storeBreakdown.map((store, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                          <td className="py-3 px-4 text-[#0C2C18] font-medium">{store.store}</td>
                                          <td className="py-3 px-3 text-center">
                                            <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#E7DDCA', color: '#0C2C18' }}>
                                              {store.zone}
                                            </span>
                                          </td>
                                          <td className="py-3 px-3 text-center">
                                            <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: store.grade.includes('++') ? '#85A38330' : '#E7DDCA50', color: store.grade.includes('++') ? '#85A383' : '#0C2C18' }}>
                                              {store.grade}
                                            </span>
                                          </td>
                                          <td className="py-3 px-3 text-right text-[#0C2C18] font-light">{store.dispatch}</td>
                                          <td className="py-3 px-3 text-right text-[#878B87] font-light">{store.avgPLC}</td>
                                          <td className="py-3 px-3 text-right text-[#878B87] font-light">{store.transferOut}</td>
                                          <td className="py-3 px-3 text-right font-medium" style={{ color: '#85A383' }}>{store.value}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
                              <button onClick={() => setLifecycleModal(null)} className="px-6 py-2.5 bg-white border-2 border-gray-300 hover:bg-gray-50 text-[#0C2C18] rounded text-sm font-medium transition-all">
                                Close
                              </button>
                              <button className="px-6 py-2.5 rounded text-sm font-medium transition-all shadow-lg flex items-center gap-2" style={{ backgroundColor: '#85A383', color: 'white' }}>
                                <Download className="w-4 h-4" strokeWidth={1.5} />
                                Export Report
                              </button>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentView === 'replenishment' && (
            <div>
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl text-[#0C2C18] mb-3 font-light">Replenishment Recommendations</h2>
                  <p className="text-[#878B87] font-light">Multivariate analysis considering inventory, marketing, supply chain, and pricing</p>
                </div>
                <button onClick={selectAllReplenishment} className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all border-2 flex items-center gap-2" style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: selectedReplenishment.length === replenishmentItems.length ? '#85A38320' : 'white' }}>
                  {selectedReplenishment.length === replenishmentItems.length ? (
                    <><Check className="w-4 h-4" strokeWidth={2} />Deselect All</>
                  ) : (
                    <><Check className="w-4 h-4" strokeWidth={2} />Select All ({replenishmentItems.length})</>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                {replenishmentItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border-l-4 overflow-hidden shadow-md hover:shadow-2xl transition-all" style={{ borderLeftColor: item.priority === 'Critical' ? '#DF7649' : '#85A383' }}>
                    <div className="p-7">
                      <div className="flex gap-6">
                        <div className="flex items-start pt-2">
                          <input type="checkbox" checked={selectedReplenishment.includes(item.id)} onChange={() => toggleReplenishmentSelection(item.id)} className="w-5 h-5 rounded border-2 cursor-pointer" style={{ accentColor: '#85A383' }} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-2xl text-[#0C2C18] font-light">{item.name}</h3>
                                <span className="text-xs text-[#878B87] font-mono font-light px-2 py-1 bg-gray-100 rounded">{item.id}</span>
                                <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium" style={{ backgroundColor: item.priority === 'Critical' ? '#DF764920' : '#85A38320', color: item.priority === 'Critical' ? '#DF7649' : '#85A383' }}>
                                  <AlertCircle className="w-3 h-3 inline mr-1" strokeWidth={2} />
                                  {item.priority}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm mb-3">
                                <span className="flex items-center gap-1.5 text-[#878B87] font-light">
                                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                                  {item.store}
                                </span>
                                <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#E7DDCA', color: '#0C2C18' }}>{item.zone}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-sm">
                                  <span className="text-[#878B87] font-light">Total Impact: </span>
                                  <span className="font-medium" style={{ color: '#85A383' }}>{item.totalImpact}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-[#878B87] font-light">AI Confidence: </span>
                                  <span className="font-medium" style={{ color: '#85A383' }}>{item.aiConfidence}%</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 ml-4">
                              <button 
                                onClick={() => setDecisionTrailModal(decisionTrailModal === item.id ? null : item.id)} 
                                className="px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all font-medium border-2 hover:bg-gray-50"
                                style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: 'white' }}
                              >
                                <Activity className="w-4 h-4" strokeWidth={2} />
                                Decision Trail
                              </button>
                              <button onClick={() => setAiChatOpen(aiChatOpen === item.id ? null : item.id)} className="px-6 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all font-medium shadow-md hover:shadow-lg" style={{ backgroundColor: '#85A383', color: 'white' }}>
                                <MessageSquare className="w-4 h-4" strokeWidth={2} />
                                Ask Morrie
                              </button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-5 gap-4 mb-5">
                            <div className="p-4 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Current Stock</div>
                              <div className="text-xl text-[#0C2C18] font-light">{item.currentStock}</div>
                            </div>
                            <div className="p-4 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Warehouse</div>
                              <div className="text-xl text-[#0C2C18] font-light">{item.warehouseStock}</div>
                            </div>
                            <div className="p-4 rounded-lg" style={{ backgroundColor: '#E7DDCA50' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>ROS</div>
                              <div className="text-xl text-[#0C2C18] font-light">{item.rateOfSale}/d</div>
                            </div>
                            <div className="p-4 rounded-lg" style={{ backgroundColor: '#DF764920' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Stockout</div>
                              <div className="text-xl font-medium" style={{ color: '#DF7649' }}>{item.daysToStockout}d</div>
                            </div>
                            <div className="p-4 rounded-lg" style={{ backgroundColor: '#85A38315' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Supply Lead</div>
                              <div className="text-xl font-medium" style={{ color: '#85A383' }}>2-3d</div>
                            </div>
                          </div>

                          {/* What-If Starters */}
                          <div className="mb-5 p-4 rounded-lg" style={{ backgroundColor: '#E7DDCA30' }}>
                            <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-3 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />
                              Start a What-If Analysis
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {item.whatIfStarters.map((starter, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setAiChatOpen(item.id);
                                    setCurrentMessage(starter);
                                  }}
                                  className="px-3 py-2 rounded text-xs text-left hover:bg-white transition-all border border-gray-200 text-[#878B87] hover:text-[#0C2C18]"
                                >
                                  "{starter}"
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4">
                            {item.sizes.map((size, idx) => (
                              <div key={idx} className="p-4 rounded-lg border-2" style={{ backgroundColor: '#85A38310', borderColor: '#85A38330' }}>
                                <div className="text-xs uppercase tracking-wider font-light mb-2" style={{ color: '#878B87' }}>Size {size.size}</div>
                                <div className="text-sm text-[#878B87] mb-1 font-light">Stock: {size.stock}</div>
                                <div className="text-lg text-[#0C2C18] font-medium mb-1">Order: {size.recommendation}</div>
                                <div className="text-sm font-medium" style={{ color: '#85A383' }}>{size.impact}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Conversational AI Panel */}
                      {aiChatOpen === item.id && (
                        <div className="mt-6 border-t border-gray-200 pt-6">
                          {/* Conversational Decision Context */}
                          <div className="mb-5 p-5 rounded-lg border-2" style={{ backgroundColor: '#85A38308', borderColor: '#85A38320' }}>
                            <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-3">Why This Recommendation</div>
                            <p className="text-sm text-[#878B87] mb-5 font-light leading-relaxed">{item.decisionContext}</p>
                            
                            <div className="space-y-3">
                              {Object.entries(item.decisionFactors).map(([key, factor]) => (
                                <div key={key}>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      {key === 'inventory' && <Package className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />}
                                      {key === 'marketing' && <ShoppingBag className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />}
                                      {key === 'supplyChain' && <Truck className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />}
                                      {key === 'pricing' && <DollarSign className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />}
                                      <span className="text-sm text-[#0C2C18] font-medium capitalize">{key === 'supplyChain' ? 'Supply Chain' : key}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-[#878B87]">{factor.weight}% weight</span>
                                      <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: factor.score >= 85 ? '#85A38320' : '#F4A26120', color: factor.score >= 85 ? '#85A383' : '#F4A261' }}>
                                        {factor.score}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-xs text-[#878B87] font-light ml-6 leading-relaxed">{factor.narrative}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-lg p-6 border-2" style={{ backgroundColor: '#85A38308', borderColor: '#85A38320' }}>
                            <div className="flex items-start gap-4 mb-5">
                              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#85A383' }}>
                                <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm text-[#0C2C18] mb-3 uppercase tracking-wider font-medium">Explore Scenarios</h4>

                                {chatMessages[item.id] && chatMessages[item.id].length > 0 && (
                                  <div className="mb-4 space-y-3 max-h-64 overflow-y-auto">
                                    {chatMessages[item.id].map((msg, idx) => (
                                      <div key={idx} className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-white border border-gray-200 ml-8' : 'bg-[#85A38315] mr-8'}`}>
                                        <div className="text-xs uppercase tracking-wider font-medium mb-1" style={{ color: msg.type === 'user' ? '#0C2C18' : '#85A383' }}>
                                          {msg.type === 'user' ? 'You' : 'Morrie'}
                                        </div>
                                        <p className="text-sm text-[#0C2C18] font-light">{msg.text}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(item.id)}
                                    placeholder="Ask about scenarios, timing, alternatives..."
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#85A383] font-light"
                                  />
                                  <button onClick={() => sendMessage(item.id)} className="px-5 py-3 rounded-lg text-sm font-medium transition-all" style={{ backgroundColor: '#85A383', color: 'white' }}>
                                    <Send className="w-4 h-4" strokeWidth={2} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'movement' && (
            <div>
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl text-[#0C2C18] mb-3 font-light">Movement & Consolidation</h2>
                  <p className="text-[#878B87] font-light">Data-driven transfer recommendations across inventory, marketing, supply chain, and pricing</p>
                </div>
                <button onClick={selectAllMovement} className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all border-2 flex items-center gap-2" style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: selectedMovement.length === movementItems.length ? '#85A38320' : 'white' }}>
                  {selectedMovement.length === movementItems.length ? (
                    <><Check className="w-4 h-4" strokeWidth={2} />Deselect All</>
                  ) : (
                    <><Check className="w-4 h-4" strokeWidth={2} />Select All ({movementItems.length})</>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                {movementItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border-l-4 overflow-hidden shadow-md hover:shadow-2xl transition-all" style={{ borderLeftColor: item.severity === 'High' ? '#DF7649' : '#F4A261' }}>
                    <div className="p-7">
                      <div className="flex gap-6">
                        <div className="flex items-start pt-2">
                          <input type="checkbox" checked={selectedMovement.includes(item.id)} onChange={() => toggleMovementSelection(item.id)} className="w-5 h-5 rounded border-2 cursor-pointer" style={{ accentColor: '#85A383' }} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-2xl text-[#0C2C18] font-light">{item.name}</h3>
                                <span className="text-xs text-[#878B87] font-mono font-light px-2 py-1 bg-gray-100 rounded">{item.id}</span>
                                <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium" style={{ backgroundColor: '#DF764920', color: '#DF7649' }}>{item.season}</span>
                                <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium" style={{ backgroundColor: item.severity === 'High' ? '#DF764920' : '#F4A26120', color: item.severity === 'High' ? '#DF7649' : '#F4A261' }}>
                                  {item.severity} Priority
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm mb-3">
                                <span className="flex items-center gap-1.5 text-[#878B87] font-light">
                                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                                  {item.store}
                                </span>
                                <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: '#E7DDCA', color: '#0C2C18' }}>{item.zone}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-[#878B87] font-light">AI Confidence: </span>
                                <span className="font-medium" style={{ color: '#85A383' }}>{item.aiConfidence}%</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 ml-4">
                              <button 
                                onClick={() => setDecisionTrailModal(decisionTrailModal === item.id ? null : item.id)} 
                                className="px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all font-medium border-2 hover:bg-gray-50"
                                style={{ borderColor: '#85A383', color: '#85A383', backgroundColor: 'white' }}
                              >
                                <Activity className="w-4 h-4" strokeWidth={2} />
                                Decision Trail
                              </button>
                              <button onClick={() => setAiChatOpen(aiChatOpen === item.id ? null : item.id)} className="px-6 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all font-medium shadow-md hover:shadow-lg" style={{ backgroundColor: '#85A383', color: 'white' }}>
                                <MessageSquare className="w-4 h-4" strokeWidth={2} />
                                Ask Morrie
                              </button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-5 gap-4 mb-5">
                            <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFEEE0' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Current Stock</div>
                              <div className="text-xl text-[#0C2C18] font-light">{item.currentStock}</div>
                            </div>
                            <div className="p-4 rounded-lg" style={{ backgroundColor: '#DF764920' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Days Stagnant</div>
                              <div className="text-xl font-medium" style={{ color: '#DF7649' }}>{item.daysInStore}d</div>
                            </div>
                            <div className="p-4 rounded-lg" style={{ backgroundColor: '#DF764920' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>ROS</div>
                              <div className="text-xl font-medium" style={{ color: '#DF7649' }}>{item.rateOfSale}/d</div>
                            </div>
                            <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFEEE0' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Transfer Cost</div>
                              <div className="text-xl text-[#0C2C18] font-light">₹150/u</div>
                            </div>
                            <div className="p-4 rounded-lg" style={{ backgroundColor: '#85A38315' }}>
                              <div className="text-xs uppercase tracking-wider font-light mb-1.5" style={{ color: '#878B87' }}>Impact</div>
                              <div className="text-xl font-medium" style={{ color: '#85A383' }}>{item.impact}</div>
                            </div>
                          </div>

                          <div className="p-5 rounded-lg border-2 mb-5" style={{ backgroundColor: '#85A38310', borderColor: '#85A38330' }}>
                            <div className="flex items-center gap-3 mb-3">
                              {item.targetAction === 'Pull Back' ? (
                                <Archive className="w-5 h-5" strokeWidth={1.5} style={{ color: '#85A383' }} />
                              ) : (
                                <Move className="w-5 h-5" strokeWidth={1.5} style={{ color: '#85A383' }} />
                              )}
                              <span className="text-lg text-[#0C2C18] font-medium">{item.recommendation}</span>
                            </div>
                            {item.targetStores && (
                              <div className="space-y-2 mb-3">
                                {item.targetStores.map((target, idx) => (
                                  <div key={idx} className="bg-white rounded p-3 border border-gray-200">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium text-[#0C2C18]">{target.store} ({target.storeId})</span>
                                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#85A38320', color: '#85A383' }}>Target</span>
                                    </div>
                                    <p className="text-xs text-[#878B87] font-light">{target.reason}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* What-If Starters */}
                          <div className="mb-5 p-4 rounded-lg" style={{ backgroundColor: '#E7DDCA30' }}>
                            <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-3 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />
                              Start a What-If Analysis
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {item.whatIfStarters.map((starter, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setAiChatOpen(item.id);
                                    setCurrentMessage(starter);
                                  }}
                                  className="px-3 py-2 rounded text-xs text-left hover:bg-white transition-all border border-gray-200 text-[#878B87] hover:text-[#0C2C18]"
                                >
                                  "{starter}"
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4">
                            {item.sizes.map((size, idx) => (
                              <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                <div className="text-xs uppercase tracking-wider font-light mb-2" style={{ color: '#878B87' }}>Size {size.size}</div>
                                <div className="text-sm text-[#0C2C18] mb-2 font-light">Stock: {size.stock}</div>
                                <div className="text-xs font-medium mb-1" style={{ color: '#85A383' }}>{size.recommendation}</div>
                                <div className="text-xs text-[#878B87] font-light">{size.targetLocation}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {aiChatOpen === item.id && (
                        <div className="mt-6 border-t border-gray-200 pt-6">
                          {/* Conversational Decision Context */}
                          <div className="mb-5 p-5 rounded-lg border-2" style={{ backgroundColor: '#85A38308', borderColor: '#85A38320' }}>
                            <div className="text-xs uppercase tracking-wider font-medium text-[#0C2C18] mb-3">Why This Recommendation</div>
                            <p className="text-sm text-[#878B87] mb-5 font-light leading-relaxed">{item.decisionContext}</p>
                            
                            <div className="space-y-3">
                              {Object.entries(item.decisionFactors).map(([key, factor]) => (
                                <div key={key}>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      {key === 'inventory' && <Package className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />}
                                      {key === 'marketing' && <ShoppingBag className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />}
                                      {key === 'supplyChain' && <Truck className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />}
                                      {key === 'pricing' && <DollarSign className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={1.5} />}
                                      <span className="text-sm text-[#0C2C18] font-medium capitalize">{key === 'supplyChain' ? 'Supply Chain' : key}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-[#878B87]">{factor.weight}% weight</span>
                                      <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: factor.score >= 70 ? '#85A38320' : '#DF764920', color: factor.score >= 70 ? '#85A383' : '#DF7649' }}>
                                        {factor.score}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-xs text-[#878B87] font-light ml-6 leading-relaxed">{factor.narrative}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-lg p-6 border-2" style={{ backgroundColor: '#85A38308', borderColor: '#85A38320' }}>
                            <div className="flex items-start gap-4 mb-5">
                              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#85A383' }}>
                                <Sparkles className="w-6 h-6 text-white" strokeWidth={1.5} />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm text-[#0C2C18] mb-3 uppercase tracking-wider font-medium">Explore Scenarios</h4>

                                {chatMessages[item.id] && chatMessages[item.id].length > 0 && (
                                  <div className="mb-4 space-y-3 max-h-64 overflow-y-auto">
                                    {chatMessages[item.id].map((msg, idx) => (
                                      <div key={idx} className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-white border border-gray-200 ml-8' : 'bg-[#85A38315] mr-8'}`}>
                                        <div className="text-xs uppercase tracking-wider font-medium mb-1" style={{ color: msg.type === 'user' ? '#0C2C18' : '#85A383' }}>
                                          {msg.type === 'user' ? 'You' : 'Morrie'}
                                        </div>
                                        <p className="text-sm text-[#0C2C18] font-light">{msg.text}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(item.id)}
                                    placeholder="Ask about alternatives, costs, timing..."
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#85A383] font-light"
                                  />
                                  <button onClick={() => sendMessage(item.id)} className="px-5 py-3 rounded-lg text-sm font-medium transition-all" style={{ backgroundColor: '#85A383', color: 'white' }}>
                                    <Send className="w-4 h-4" strokeWidth={2} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decision Trail Modal */}
      {decisionTrailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
          <div className="bg-white rounded-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-20" style={{ backgroundColor: '#ffffff' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl text-[#0C2C18] font-light">Decision Trail</h3>
                  <p className="text-sm text-[#878B87] mt-1 font-light">Multi-agent system analysis and database queries</p>
                </div>
                <button onClick={() => setDecisionTrailModal(null)} className="text-[#878B87] hover:text-[#0C2C18]">
                  <X className="w-6 h-6" strokeWidth={1} />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTrailView('table')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    trailView === 'table'
                      ? 'bg-[#85A383] text-white'
                      : 'bg-white text-[#878B87] border border-gray-300 hover:border-[#85A383]'
                  }`}
                >
                  <Layers className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                  Table View
                </button>
                <button
                  onClick={() => setTrailView('graph')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    trailView === 'graph'
                      ? 'bg-[#85A383] text-white'
                      : 'bg-white text-[#878B87] border border-gray-300 hover:border-[#85A383]'
                  }`}
                >
                  <Activity className="w-4 h-4 inline mr-2" strokeWidth={1.5} />
                  Graph View
                </button>
              </div>
            </div>

            <div className="p-8">
              {(() => {
                const item = [...replenishmentItems, ...movementItems].find(i => i.id === decisionTrailModal);
                if (!item || !item.decisionTrail) {
                  return (
                    <div className="text-center py-12">
                      <Activity className="w-12 h-12 mx-auto mb-4 text-[#878B87]" strokeWidth={1} />
                      <p className="text-[#878B87] font-light">Decision trail data not available for this item</p>
                    </div>
                  );
                }
                
                if (trailView === 'table') {
                  return (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-200" style={{ backgroundColor: '#E7DDCA50' }}>
                            <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Time</th>
                            <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Agent</th>
                            <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Action</th>
                            <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Database</th>
                            <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Query / Data</th>
                            <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Agent Thinking</th>
                            <th className="py-3 px-4 text-left text-[#0C2C18] font-medium uppercase tracking-wider text-xs">Next</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.decisionTrail.map((entry, idx) => (
                            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4 text-[#878B87] font-mono text-xs whitespace-nowrap">{entry.timestamp.split(' ')[1]}</td>
                              <td className="py-4 px-4">
                                <span 
                                  className="px-2 py-1 rounded text-xs font-medium" 
                                  style={{ 
                                    backgroundColor: entry.agent === 'Orchestrator' ? '#85A38320' : 
                                                    entry.agent === 'Inventory Agent' ? '#DF764920' :
                                                    entry.agent === 'Marketing Agent' ? '#E7DDCA' :
                                                    entry.agent === 'Supply Chain Agent' ? '#85A38315' :
                                                    entry.agent === 'Pricing Agent' ? '#F4A26120' :
                                                    entry.agent === 'Decision Engine' ? '#85A38330' :
                                                    '#E7DDCA50',
                                    color: '#0C2C18'
                                  }}
                                >
                                  {entry.agent}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-[#0C2C18] font-medium">{entry.action}</td>
                              <td className="py-4 px-4">
                                {entry.database ? (
                                  <span className="text-xs text-[#878B87] bg-gray-100 px-2 py-1 rounded font-mono">
                                    {entry.database}
                                  </span>
                                ) : (
                                  <span className="text-xs text-[#878B87]">—</span>
                                )}
                              </td>
                              <td className="py-4 px-4 max-w-xs">
                                {entry.query ? (
                                  <details className="cursor-pointer">
                                    <summary className="text-xs text-[#878B87] hover:text-[#0C2C18] font-medium">View Query & Data</summary>
                                    <div className="mt-2 p-2 rounded" style={{ backgroundColor: '#E7DDCA30' }}>
                                      <div className="text-xs text-[#0C2C18] font-mono mb-2 whitespace-pre-wrap">{entry.query}</div>
                                      {entry.dataRetrieved && (
                                        <div className="text-xs text-[#878B87] mt-2 pt-2 border-t border-gray-300">
                                          <div className="font-medium text-[#0C2C18] mb-1">Data Retrieved:</div>
                                          <pre className="font-mono text-xs overflow-x-auto">{JSON.stringify(entry.dataRetrieved, null, 2)}</pre>
                                        </div>
                                      )}
                                    </div>
                                  </details>
                                ) : (
                                  <span className="text-xs text-[#878B87]">—</span>
                                )}
                              </td>
                              <td className="py-4 px-4 max-w-md">
                                <p className="text-xs text-[#878B87] font-light leading-relaxed">{entry.thinking}</p>
                              </td>
                              <td className="py-4 px-4">
                                {entry.nextAgent ? (
                                  <div className="flex items-center gap-1">
                                    <ArrowRight className="w-3 h-3" style={{ color: '#85A383' }} strokeWidth={2} />
                                    <span className="text-xs font-medium" style={{ color: '#85A383' }}>{entry.nextAgent}</span>
                                  </div>
                                ) : (
                                  <Check className="w-4 h-4" style={{ color: '#85A383' }} strokeWidth={2} />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                
                // Graph View
                return (
                  <div className="space-y-6">
                    <div className="flex gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#85A38320' }}></div>
                        <span className="text-xs text-[#878B87]">Orchestrator</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#DF764920' }}></div>
                        <span className="text-xs text-[#878B87]">Inventory Agent</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#E7DDCA' }}></div>
                        <span className="text-xs text-[#878B87]">Marketing Agent</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#85A38315' }}></div>
                        <span className="text-xs text-[#878B87]">Supply Chain</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F4A26120' }}></div>
                        <span className="text-xs text-[#878B87]">Pricing Agent</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: '#85A38330' }}></div>
                        <span className="text-xs text-[#878B87]">Decision Engine</span>
                      </div>
                    </div>

                    <div className="relative">
                      {item.decisionTrail.map((entry, idx) => (
                        <div key={idx} className="relative mb-6">
                          <div className="flex gap-6">
                            {/* Agent Node */}
                            <div className="flex-shrink-0">
                              <div 
                                className="w-32 h-32 rounded-xl flex items-center justify-center text-center p-3 border-2 shadow-md"
                                style={{ 
                                  backgroundColor: entry.agent === 'Orchestrator' ? '#85A38320' : 
                                                  entry.agent === 'Inventory Agent' ? '#DF764920' :
                                                  entry.agent === 'Marketing Agent' ? '#E7DDCA' :
                                                  entry.agent === 'Supply Chain Agent' ? '#85A38315' :
                                                  entry.agent === 'Pricing Agent' ? '#F4A26120' :
                                                  entry.agent === 'Decision Engine' ? '#85A38330' :
                                                  entry.agent === 'Size Distribution Model' ? '#E7DDCA50' :
                                                  '#E7DDCA50',
                                  borderColor: '#85A383'
                                }}
                              >
                                <div>
                                  <div className="text-xs font-medium text-[#0C2C18] mb-1">{entry.agent}</div>
                                  <div className="text-xs text-[#878B87] font-light">{entry.timestamp.split(' ')[1]}</div>
                                </div>
                              </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex items-center flex-shrink-0">
                              <ArrowRight className="w-8 h-8" style={{ color: '#85A383' }} strokeWidth={1.5} />
                            </div>

                            {/* Action & Database Card */}
                            <div className="flex-1 min-w-0">
                              <div className="bg-white rounded-lg p-4 border-2 border-gray-200 shadow-sm">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <div className="text-sm font-medium text-[#0C2C18] mb-1">{entry.action}</div>
                                    {entry.database && (
                                      <div className="flex items-center gap-2 mt-1">
                                        <Package className="w-3 h-3" style={{ color: '#85A383' }} strokeWidth={1.5} />
                                        <span className="text-xs font-mono text-[#878B87]">{entry.database}</span>
                                      </div>
                                    )}
                                  </div>
                                  {entry.nextAgent && (
                                    <div className="text-xs text-[#878B87] flex items-center gap-1">
                                      Next: <span className="font-medium" style={{ color: '#85A383' }}>{entry.nextAgent}</span>
                                    </div>
                                  )}
                                </div>

                                {entry.query && (
                                  <div className="mb-3 p-2 rounded" style={{ backgroundColor: '#E7DDCA30' }}>
                                    <div className="text-xs text-[#878B87] font-medium mb-1">SQL Query:</div>
                                    <code className="text-xs text-[#0C2C18] font-mono block overflow-x-auto">{entry.query}</code>
                                  </div>
                                )}

                                {entry.dataRetrieved && (
                                  <div className="mb-3 p-2 rounded bg-gray-50">
                                    <div className="text-xs text-[#878B87] font-medium mb-1">Data Retrieved:</div>
                                    <pre className="text-xs text-[#0C2C18] font-mono overflow-x-auto max-h-32">{JSON.stringify(entry.dataRetrieved, null, 2)}</pre>
                                  </div>
                                )}

                                <div className="pt-3 border-t border-gray-200">
                                  <div className="text-xs text-[#878B87] font-medium mb-1">Agent Thinking:</div>
                                  <p className="text-xs text-[#0C2C18] font-light leading-relaxed">{entry.thinking}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Connection Line to Next */}
                          {idx < item.decisionTrail.length - 1 && (
                            <div className="absolute left-16 top-32 bottom-0 w-0.5 h-6 bg-gray-300"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MorrieDashboard;